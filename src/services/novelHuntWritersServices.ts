
import { Writer , Writers } from "protocols/novelHuntProtocols";
import novelHuntWriterRepository from "repositories/novelHuntWriterRepository";
import novelHuntErrors from "errors/novelHuntErrors";


 async function writerList (list: Writers): Promise<Writer[]> {

    const listW: Writer[] =await novelHuntWriterRepository.findWriter(list);
    return listW;

  }


  async function allSearchs (writerId: Number) {

    const result = await novelHuntWriterRepository.allSearchs(writerId);
    return result;

  }



 async function search ({ writerId, bookId }) {

    const analysis = await allSearchs(writerId);
    if (!analysis.find((param) => param.id === bookId))
    throw novelHuntErrors.InternalError(`You have not access`);
    await novelHuntWriterRepository.search({writerId,bookId,});

  }
  

  export default { search , allSearchs, writerList}