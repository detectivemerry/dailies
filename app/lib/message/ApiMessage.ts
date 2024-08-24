const ApiMessage = {
    Success: {
        registerUser : "Successful registration",
        updateUser: "Successful update"
    },
    Error: {
        duplicateUsername: "Username already exists in database",
        duplicateEmail: "Email already exists in database",
        noUser: "No user found",
        noGoalType: "No goal type found",
        default: "An unexpected error occured"
    }
}
  
export default ApiMessage;
  