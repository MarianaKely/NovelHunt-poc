
import { Writer, WInfo , WriterInfo } from "protocols/novelHuntProtocols";
import novelHuntRegisterRepository from "repositories/novelHuntRegisterRepository"
import novelHuntErrors from "errors/novelHuntErrors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const { JWT_SECRET } = process.env;


 async function register (writer: WInfo) {

    const exists = await novelHuntRegisterRepository.findRegister(writer.email);
    if (exists)  throw novelHuntErrors.InternalError("please, try again");
  
    const hashedPassword = bcrypt.hashSync(writer.password, 16);
    writer.password = hashedPassword;
    await novelHuntRegisterRepository.register(writer);

  }
  


   async function login (writer: WriterInfo) {

    const invalidd = await novelHuntRegisterRepository.findRegister(writer.email);
    if (!invalidd) throw novelHuntErrors.loginError();

    const hashedPassword = invalidd.password;

    const valid = bcrypt.compareSync(writer.password, hashedPassword);
    if (!valid)throw novelHuntErrors.loginError();
    delete invalidd.password;

    const token = jwt.sign(invalidd, JWT_SECRET);
    return { token };

  }


   async function findMember (id: number): Promise<Writer | null> {

    const writer = await novelHuntRegisterRepository.findMember(id);

    if (writer) delete writer.password;

    return writer;

  }


  export default { findMember , login, register}