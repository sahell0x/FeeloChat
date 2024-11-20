import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useState } from "react";

function SignUpTabContent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <Input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        className="mb-2"
      ></Input>

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2"
      ></Input>
      <Input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="mb-5"
      ></Input>

      <Button
        style={{ backgroundColor: "#1e2864" }}
        className="w-[100%] mb-2 rounded-full"
      >
        Sign up
      </Button>
      <Button
        style={{ backgroundColor: "#e5b238" }}
        className="w-[100%] rounded-full"
      >
        Try as Guest
      </Button>
    </div>
  );
}

export default SignUpTabContent;
