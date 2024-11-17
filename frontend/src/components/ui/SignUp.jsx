import Modal from "@/util/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import feeloChatLogo from "../../assets/IMG-20240813-WA0001-removebg.png";
import { Button } from "./button";

function SignUp() {
  return (
    <Modal>
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center mb-5">
            {/* <h1 className="text-5xl font-bold md:text-6xl">FeeloChat</h1> */}

            <img className="w-[35%] h-[35%] pl-2" src={feeloChatLogo} alt="" />
            <p className="font-semibold">Let your expressions speak for you !!</p>
          </div>
          <Tabs defaultValue="account" className="w-[50vw] flex justify-center flex-col items-center">
            <TabsList className="w-[300px] flex justify-around">
              <TabsTrigger value="signup" className="w-[50%]">signup</TabsTrigger>
              <TabsTrigger value="signin" className="w-[50%]">signin</TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="w-[300px]">
                <Input  placeholder="Username" className="mb-2"></Input>
                <Input  placeholder="Password" className="mb-2"></Input>
                <Input  placeholder="Confirm Password" className="mb-2"></Input>
                <Button className="w-[100%]">signup</Button>
              
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
