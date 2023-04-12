import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import { FaReddit } from "react-icons/fa";
import { MenuItem } from "@chakra-ui/react";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);

    const onSelectMenuItem = (MenuItem: DirectoryMenuItem) => {
       setDirectoryState((prev)=> ({
        ...prev,
        selectedMenuItem: MenuItem,
       }));
       router.push(MenuItem.link);

       if (directoryState.isOpen) {
        toggleMenuOpen();
       }
    }

    const toggleMenuOpen =() => {
        setDirectoryState((prev) => ({
            ...prev,
            isOpen: !directoryState.isOpen,
        }))
    }
    
    useEffect(() => {
        const { currentCommunity } = communityStateValue;

        if(currentCommunity){
            setDirectoryState((prev)=> ({
                ...prev,
                selectedMenuItem:{
                    displayText: `r/${currentCommunity.id}`,
                    link: `r/${currentCommunity.id}`,
                    imageURL: currentCommunity.imageURL,
                    icon: FaReddit,
                    iconColor: 'blue.500',  
                }
            }))
        }

    },[communityStateValue.currentCommunity])

    return { directoryState, toggleMenuOpen , onSelectMenuItem };

};

export default useDirectory;
