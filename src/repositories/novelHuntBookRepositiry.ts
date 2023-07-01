
import db from "database/database";
import { MainRules } from "protocols/novelHuntConfigProtocols";
import { Books  , BookInfo ,Book } from "protocols/novelHuntProtocols";
import { theBook , subSequence } from "./novelHuntConstructionRepository";


 async function createBook (createit: BookInfo, author_id: Number): Promise <void> {

    const info = await db.query(` INSERT INTO band(name, author_id, date_of_publication , publisher, genre)
              VALUES ($1, $2, $3, $4, $5) returning id `,
      [
        createit.title,
        author_id,
        createit.publication,
        createit.publisher,
        createit.genre,

      ]

    );

    const profile = info.rows[0].id;

    await db.query(` INSERT INTO writer_per_book (author_id, book_id, publish_at) VALUES ($1, $2, now())`,[author_id, profile] );

  }


  async function fetch ({ bookId, writerId }): Promise<void> {

    await db.query(`INSERT INTO writer_per_book (author_id, book_id)VALUES ($1, $2)`, [bookId, writerId]);

}

 async function allBook(query: Books): Promise<Book[]> {

    const clause: MainRules = theBook(query);
    const results = await subSequence (clause);

    return results;
 // build here

  }



  async function findByTitle (title: string, { repet = false }): Promise<Book[]> {

    const booksTitles: Books = repet ? { confirmTitle : title } : { title: title };
    const result = await allBook(booksTitles);
    return result;

  } 

  export default { findByTitle , allBook, fetch, createBook}