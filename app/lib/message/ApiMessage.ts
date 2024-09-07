
const ApiMessage = {
  Success : {
    General : "Action successfully executed.",
  },
  Error: {
    General : "Something unexpected has occured. Please try again later.",
    InvalidCredentials : "Credentials provided were invalid. Please ensure that the username and password are correct.",
    Unauthenticated : "Session has expired. Please log in again.",
  } 
};

export default ApiMessage;