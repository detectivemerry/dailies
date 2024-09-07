
const ApiMessage = {
  Success : {
    General : "Action successfully executed.",
    Registered : "Successfully registered."
  },
  Error: {
    General : "Something unexpected has occured. Please try again later.",
    InvalidCredentials : "Credentials provided were invalid. Please ensure that the username and password are correct.",
    Unauthenticated : "Session has expired. Please log in again.",
    UserAlreadyInDB : "Username already exists in database. Please enter a different username.",
    EmailAlreadyExist : "Email already exists in database. Please enter a different email.",
  } 
};

export default ApiMessage;