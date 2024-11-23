import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
function SignInTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" 
        className="mb-2"
      ></Input>
      <PasswordInput
        
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2"
      ></PasswordInput>
      <Button
        
        className="w-[100%] mb-2 rounded-full"
      >
        Sign in
      </Button>
      
    </div>
  );
}

export default SignInTabContent;
