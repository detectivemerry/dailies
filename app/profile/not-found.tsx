import PrimaryButton from "@/components/buttons/PrimaryButton";
import { PsychologyAltOutlined } from "@mui/icons-material";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-64">
      <div>
        <PsychologyAltOutlined sx={{ color: "#838383", fontSize: "4rem" }} />
      </div>
      <div className = "flex flex-col items-center text-center">
        <div className="text-secondaryText font-bold">Not found</div>
        <div className="text-secondaryText">This user does not exist</div>
      </div>
      <div>
        <Link href = "/" className = "no-underline">
            <PrimaryButton text = "Back to home"/>
        </Link>
      </div>
    </div>
  );
}
