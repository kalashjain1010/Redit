// import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";

const Communities: React.FC = () => {
    const [open, setOpen]= useState(false); 
  return (
    <>
      <div>
        <CreateCommunityModal open={open} handleClose={() => setOpen(false )}/>
      </div>

      <MenuItem>
        <Flex
          align={"center"}
          width="100%"
          fontSize={"10pt"}
           onClick={()=> setOpen(true)}
        >
          <Icon fontSize={20} mr="2" as={GrAdd} />
          CreateCommunity
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
