
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
    NoUserFound : "Current user was not found. Please try again later.",
    NoPostFound : "Post was not found, please try again later."
  } 
};

export default ApiMessage;