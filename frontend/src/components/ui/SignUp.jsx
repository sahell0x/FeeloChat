import Modal from "@/util/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import feeloChatLogo from "../../assets/FeeloChatLogo.png";

import { Button } from "./button";

function SignUp() {
  return (
    <Modal>
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center mb-5">

            <img className="w-[60%] h-[60%] sm:w-[35%] h-[35%]" src={feeloChatLogo} alt="feeloChat Logo" />
          </div>
          <Tabs defaultValue="signup" className="w-[50vw] flex justify-center flex-col items-center">
            <TabsList className="w-[300px] flex justify-around">
              <TabsTrigger value="signup" className="w-[50%]">sign up</TabsTrigger>
              <TabsTrigger value="signin" className="w-[50%]">sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="w-[300px]">
                <Input  placeholder="Username" className="mb-2"></Input>
                <Input  placeholder="Password" className="mb-2"></Input>
                <Input  placeholder="Confirm Password" className="mb-2"></Input>
                <Button style={{backgroundColor:"#1e2864"}} className="w-[100%] mb-2">sign up</Button>
                <Button style={{backgroundColor:"#e5b238"}} className="w-[100%]">Try as Guest
                </Button>
              
            </TabsContent >
            <TabsContent value="signin" className="w-[300px]">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
}

export default SignUp;
