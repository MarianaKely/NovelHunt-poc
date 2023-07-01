
// put the parts together to show complete information books:authors

import db from "database/database";
import { Writers , Writer, Book, Books } from "protocols/novelHuntProtocols";
import { MainRules , Construction } from "protocols/novelHuntConfigProtocols";
import { ConstctBody } from "config/novelHUntConfigs";

export function constructWtrProfile (query: Writers): MainRules {

    const doIt: Construction[] = [];
    if (query.id) { doIt.push({

        backing: "book.id",
        pts: "=",
        shifter: query.id,

      });

    }

    if (query.name) { doIt.push({

        backing: "lower(writer.name)",
        pts: "LIKE",
        shifter: `%${query.name.toLowerCase()}%`,

      });

    }

    if (query.bio) {doIt.push({

        backing: "",
        pts: "",
        shifter: `%${query.bio.toLowerCase()}%`,
        sequence:"EXISTS (SELECT 1 FROM publisher WHERE publisher.author_id = writer.id AND publisher.bio like __VAR__)",
        retrograde: true,

      });

    }

    return ConstctBody(doIt);

  }




  export function theBook (query: Books): MainRules {

    const doIt: Construction[] = [];

    if (query.id) { doIt.push({

        backing: "book.id",
        pts: "=",
        shifter: query.id,});

    }

    if (query.title) {doIt.push({

        backing: "lower(book.title)",
        pts: "LIKE",
        shifter: `%${query.title.toLowerCase()}%`,

      });

    }

    if (query.confirmTitle) {doIt.push({

        backing: "book.title",
        pts: "LIKE",
        shifter: query.confirmTitle,});

    }

    if (query.genre) {doIt.push({

        backing: "lower(book.genre)",
        pts: "LIKE",
        shifter: `%${query.genre.toLowerCase()}%`,}
      );

    }

    if (query.publisher) {doIt.push({

        backing: "lower(book.publisher)",
        pts: "LIKE",
        shifter: `%${query.publisher.toLowerCase()}%`, });

    }

    return ConstctBody(doIt);

  }
  



  export async function inSequence (organization: MainRules): Promise<Writer[]> {

    const result = (await db.query(

        ` SELECT  json_build_object(

          'id', writer.id,
          'name', name, 
          'email', email, 
          'birth', birth,
          'password', password,
          'bio', json_agg(publisher.bio))
           FROM musician
           LEFT JOIN publisher ON publisher.author_id = writer.id
           ${organization.rules}
           GROUP BY name, email, birth, password, writer.id`,
           organization.mainArray)).rows.map((param) => param.json_build_object);
  
    return result;

  }


  export async function subSequence (organization: MainRules): Promise<Book[]> {

    const bookList = (
      await db.query(`SELECT json_build_object (

              'id', book.id,
              'bookwriter', json_build_object(
                  'id', bookwriter.id, book
                  'name', bookwriter.name,
                  'dateOfBirth', bookwriter.birth,
                  'email', bookwriter.email,
                  'bio', (
                      (select array_agg(publisher.bio)
                      from publisher
                      where publisher.author_id = bookwriter.id))),
              'title', book.title,
              'publication', book.date_of_publication,
              'publisher', book.publisher,
              'genre', book.genre
          
          )
          FROM book
          JOIN writer as bookwriter on bookwriter.id = book.bookwriter_id
          ${organization.rules}
          GROUP BY book.id, bookwriter.id, book.title`, organization.mainArray)

    ).rows.map((param) => param.json_build_object);

    for (const book of bookList) {

        book.related = await bookbook (book.id);

    }

    return bookList;

  }


  async function bookbook (bookId: number) {

    const results = await db.query(`SELECT  json_build_object(

                  'id', writer.id,
                  'name', name, 
                  'email', email, 
                  'birth', birth,
                  'bio', json_agg(publisher.bio))
                  FROM writer
                  JOIN writer_per_book on writer_per_book.author_id = writer.id
                  LEFT JOIN publisher ON publisher.author_id = writer.id
                  WHERE writer_per_book.band_id = $1 AND publish_at IS NOT NULL
                  GROUP BY name, email, birth, writer.id`, [bookId]);

    return results.rows.map((param) => param.json_build_object);
  }