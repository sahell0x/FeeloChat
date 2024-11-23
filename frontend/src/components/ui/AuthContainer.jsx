import Modal from "@/components/ui/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import feeloChatLogo from "../../assets/FeeloChatLogo.png";
import SignUpTabContent from "./SignUpTabContent";
import SignInTabContent from "./SignInTabContent";

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
              <TabsTrigger value="signup" className="w-[50%]">Sign up</TabsTrigger>
              <TabsTrigger value="signin" className="w-[50%]">Sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="w-[300px]">
                <SignUpTabContent></SignUpTabContent>
            </TabsContent >
            <TabsContent value="signin" className="w-[300px]">
              <SignInTabContent></SignInTabContent>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
}

export default SignUp;
