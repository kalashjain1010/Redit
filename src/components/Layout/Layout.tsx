import React, { FC, PropsWithChildren } from "react";
import Navbar from '../Navbar/Navbar1';

const Layout: React.FC <PropsWithChildren> = ({children}) => {
    return(
        <>
        <Navbar/>
        <main>{children}</main>
        
        </>
    )
}

export default Layout  ;