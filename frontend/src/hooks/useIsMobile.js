import isMobileAtom from "@/stores/isMobileAtom";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useIsMobile = () => {
  const setIsMobile  =  useSetRecoilState(isMobileAtom);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    checkMobile(); 
    window.addEventListener("resize", checkMobile); 

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

};

export default useIsMobile;
