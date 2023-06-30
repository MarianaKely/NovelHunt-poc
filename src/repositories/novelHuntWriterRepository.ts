
import db from "database/database";
import {Writer, Writers } from "protocols/novelHuntProtocols"
import { MainRules , Construction } from "protocols/novelHuntConfigProtocols";
import { inSequence , constructWtrProfile } from "./novelHuntConstructionRepository";



async function findWriter (query: Writers): Promise<Writer[]> {

    const createProfile: MainRules = constructWtrProfile(query);
    const theProfile = await inSequence(createProfile);

    return theProfile;

  }

  


  async function allSearchs (writerId: Number) {

    const results = await db.query(`SELECT book.id, book.name, publish_at
        FROM writer_per_book JOIN book on book.id = writer_per_book.book_id
        WHERE writer_per_book.author_id = $1 
        AND writer_per_book.publish_at IS NULL `, [writerId]);

    return results.rows;

  }


  
  
  async function search ({ writerId, bookId }) {

    await db.query(`UPDATE writer_per_book SET fetched_at = now()
        WHERE (writer_per_book.author_id = $1 AND writer_per_book.book_id = $2)`,
         [writerId, bookId]

    );

}

export default{ allSearchs, search , findWriter}