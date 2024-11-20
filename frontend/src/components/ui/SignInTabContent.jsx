import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

function SignInTabContent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
        className="mb-5"
      ></Input>
      <Button
        style={{ backgroundColor: "#1e2864" }}
        className="w-[100%] mb-2 rounded-full"
      >
        Sign in
      </Button>
    </div>
  );
}

export default SignInTabContent;
