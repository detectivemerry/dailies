import { Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className = "flex flex-col items-center">
      <div className = "text-3xl font-semibold text-main my-20">
        Profile Info
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
}
