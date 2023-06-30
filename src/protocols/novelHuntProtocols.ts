
export type Writer = {

    id: number;
    name: string;
    email: string;
    password: string;
    birth: Date;
    bio: string[];

  };


  export type Book = {

    id: number;
    title: string;
    writer: Writer;
    genre: string;
    publisher: string;
    publication: Date;
    related: Writer[];

  };


  export type Books = {

    id?: string | Number;
    title?: string;
    confirmTitle?: string;
    genre?: string;
    publisher?: string;

  };
  

  export type Writers = {

    id?: string | Number;
    name?: string;
    bio?: string;

  };


  export type WriterInfo = Omit< Writer,"id" | "name" | "birth" | "bio">;

  export type BookInfo = Omit<Book, "id" | "writer" | "related">;

  export type WInfo = Omit<Writer, "id">;