import { BounceLoader } from "react-spinners";


const Loader = ()=>{
    return <div className=" h-[100vh] bg-[#1b1c24] flex items-center justify-center flex-col">
      <BounceLoader color="#9333ea" />    
      </div>
}

export default Loader;

