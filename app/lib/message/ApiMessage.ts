
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
    NoPostFound : "Post was not found, please try again later.",
    NoUserGoalFound : "Goal was not found from user. Please try again later",
    UserAlreadySubscribed : "User is already subscribed to this community.",
    UnsuccessfulSubscription : "Something went wrong with subscription to community",
    UnsuccessfulNotficationSent : "Something went wrong with sending notification",
    UnsuccessfulPostDelete : "Failed to delete post. Please try again later.",
    MissingNotificationList : "Missing notification list and no new notifications were added.",
  } 
};

export default ApiMessage;