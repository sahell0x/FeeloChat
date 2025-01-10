import FeeloChat from "@/components/logo/FeeloChat"
import { SiLivechat } from "react-icons/si";






function ContactContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#f9fafb] border-r-2 border border-gray-200 " >
      <div className="flex items-center flex-row gap-2 mt-2 ml-2"><FeeloChat/>
      <SiLivechat className="relative w-8 h-8 text-purple-500 transform hover:scale-105 transition-transform" />
      </div>
    </div>
  )
}

export default ContactContainer
