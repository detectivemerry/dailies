const Message = {
  Error: {
    General : "Something unexpected has occured. Please try again later.",
    InvalidCredentials: "Incorrect username or password. Please try again.",
    RequiredField : "Please fill in this field.",
    LettersOnly: "Please enter letters only.",
    NumbersOnly : "Please enter numbers only",
    Min6Characters : "Please enter a value with more than 6 characters",
    Min8Characters : "Please enter a value with more than 8 characters",
    Max50Characters : "Please enter a value with fewer than 50 characters.",
    Max250Characters : "The maximum number of characters allow for this field is 250.",
    Max366Value : "Please enter a value that is lesser than 366.",
    AlphaNumericAndSpecialOnly : "Please enter only alphanumeric or special characters.",
    AlphaNumericOnly : "Please enter only letters and numbers.",
    EmailOnly : "Please enter a valid email.",
    InvalidPassword : "Please ensure that you have at least one lower and upper case character, one numeric character and one special character.",
    EndDateBeforeStartDate : "Please ensure that the end date is after the start date",
    UnsuccessfulImageUpload : "Image upload has failed, please try again later.",
    UnsuccessfulPostCreation : "Failed to create post, please try again later.",
    UnsuccessfulPostEdit : "Failed to edit post, please try again later.",
  },
};

export default Message;
