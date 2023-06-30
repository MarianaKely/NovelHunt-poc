
import db from "database/database";
import { Writer, WInfo } from "protocols/novelHuntProtocols";


async function register (writer: WInfo) {

    const user = await db.query(`INSERT INTO writer (name, email, password, birth)
     VALUES ($1, $2, $3, $4) returning id;`,[writer.name, writer.email, writer.password, writer.birth] );

    const { id } = user.rows[0];
    for (const bio of writer.bio) {await db.query(`INSERT INTO publisher (name, author_id ) VALUES ($1, $2)`,
    [bio, id]);

    }

  }



  async function findMember (id: Number): Promise < Writer | null> {
    
    const infos = await db.query(

      ` SELECT  json_build_object('id', writer.id,'name', name, 'email', email, 
       'birth',birth,'password', password,'bio', json_agg(publisher.bio))
        FROM writer
        LEFT JOIN publisher ON publisher.author_id = writer.id
        WHERE musician.id = $1
        GROUP BY name, email, birth, password, writer.id`, [id]  );
        
    if (infos.rowCount === 0) return null;
    return infos.rows[0].json_build_object;

  }


  export async function findRegister (email: string): Promise<Writer | null> {

    const infos = await db.query(` SELECT  json_build_object(
        
          'id', writer.id,
          'name', name, 
          'email', email, 
          'birth', birth,
          'password', password,
          'bio', json_agg(publisher.bio))
           FROM writer
           LEFT JOIN publisher ON publisher.author_id = writer.id
           WHERE email = $1
           GROUP BY name, email,birth, password, writer.id`,
            [email]);

    if (infos.rowCount === 0) return null;
    return infos.rows[0].json_build_object;

  }


  export default {register , findMember ,  findRegister}