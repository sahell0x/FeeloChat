import { Input } from "@/components/ui/input";
import { Button } from "./button";

function SignUpTabContent() {
  return (
    <div>
      <Input placeholder="Username" className="mb-2"></Input>
      <Input placeholder="Password" className="mb-2"></Input>
      <Input placeholder="Confirm Password" className="mb-5"></Input>
      <Button style={{ backgroundColor: "#1e2864" }} className="w-[100%] mb-2 rounded-full">
        Sign up
      </Button>
      <Button style={{ backgroundColor: "#e5b238" }} className="w-[100%] rounded-full">
        Try as Guest
      </Button>
    </div>
  );
}

export default SignUpTabContent;
