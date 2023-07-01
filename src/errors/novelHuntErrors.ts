
//my errors list

 function loginError(): Error {

    return {

      name: "LoginError",
      message: "Create a account",

    };

  }


   function invalidEmail (email: string): Error {

    return {

      name: "invalidEmail",
      message: `invalid Emaill: ${email}`,

    };

  }


  function ErrorInformations(message?: string): Error {

    return {

      name: "ErrorInformations",
      message: message || "Invalid email or password  ",

    };

  }


   function InternalError(message: string): Error {

    return {

      name: "InternalError",
      message,

    };

  }



   function dateError(message: string): Error {

    return {

      name: "DateError",
      message,

    };

  }
 
   function notFoundError(message: string): Error {

    return {

      name: "NotFound",
      message,

    };

  }


export default { notFoundError , dateError, loginError, invalidEmail, InternalError, ErrorInformations}
