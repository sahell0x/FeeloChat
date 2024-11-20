import { Input } from './input';
import { Button } from './button';
function SignInTabContent() {
  return (
    <div>
      <Input placeholder="Username" className="mb-2"></Input>
      <Input placeholder="Password" className="mb-2"></Input>
      <Button style={{ backgroundColor: "#1e2864" }} className="w-[100%] mb-2">
        sign in
      </Button>
      </div>
  )
}

export default SignInTabContent
