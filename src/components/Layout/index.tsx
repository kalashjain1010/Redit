import React, { FC, PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import AuthModal from "../Modal/Auth";
import { Box } from "@chakra-ui/react";


const Layout: React.FC <PropsWithChildren> = ({children}) => {
  

  return (
    <>
      
      <Navbar/>
      <Box paddingTop={"50px"}>

      {children}
      </Box>
    </>
  );
};

export default Layout;
