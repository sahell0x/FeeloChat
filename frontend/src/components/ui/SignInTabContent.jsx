import { Input } from './input';
import { Button } from './button';
function SignInTabContent() {
  return (
    <div>
      <Input placeholder="Username" className="mb-2"></Input>
      <Input placeholder="Password" className="mb-5"></Input>
      <Button style={{ backgroundColor: "#1e2864" }} className="w-[100%] mb-2 rounded-full">
        Sign in
      </Button>
      </div>
  )
}

export default SignInTabContent
