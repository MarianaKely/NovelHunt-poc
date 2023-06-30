
import { BookInfo , Book, Books } from "protocols/novelHuntProtocols";
import novelHuntBookRepositiry from "repositories/novelHuntBookRepositiry";
import novelHuntErrors from "errors/novelHuntErrors";
import novelHuntRegisterRepository from "repositories/novelHuntRegisterRepository";
import novelHuntWriterRepository from "repositories/novelHuntWriterRepository";

  
async function allBook (allmyBooks: Books): Promise<Book[]> {

    const boooks: Book[] = await novelHuntBookRepositiry.allBook(allmyBooks);
    return boooks;

  }

async function createBook (createit: BookInfo, author_id: Number) {

    const theBooks: Book[] = await novelHuntBookRepositiry.findByTitle(createit.title, {repet: true,});

    if (theBooks.length > 0)
    throw novelHuntErrors.InternalError("chose other title");
    await novelHuntBookRepositiry.createBook(createit, author_id);

  }


  async function fetchList({ userID, bookId, writerId }): Promise<void> {
    
    const listBook = await novelHuntBookRepositiry.allBook({ id: bookId });
    if (listBook.length < 1) throw novelHuntErrors.notFoundError(`invalid, try another`);

    const oneBook = listBook[0];
    if (oneBook.writer.id !== userID) {

      throw novelHuntErrors.ErrorInformations(`Only ${oneBook.writer.name} can make changes on ${oneBook.title}!` );

    }


    const singleWriter = await novelHuntRegisterRepository.findMember(writerId);
    if (!singleWriter) throw novelHuntErrors.notFoundError(`invalid, try another`);
    if (oneBook.related.map((param) => param.id).includes(writerId))

      throw novelHuntErrors.InternalError(`${singleWriter.name} is already in ${oneBook.title}`);
  
    const fetchs = await novelHuntWriterRepository.allSearchs(writerId);


    const invited = fetchs.find((param) => param.id === bookId);
    if (invited) {throw novelHuntErrors.InternalError(`${singleWriter.name} is already linked in ${oneBook.title} at ${invited.fetched_at}`);}
    await novelHuntBookRepositiry.fetch({ bookId, writerId });

  }


  export default {fetchList , allBook , createBook}


  