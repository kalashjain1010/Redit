// import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

const Communities: React.FC = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
   
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          Moderating
        </Text>

        
        {mySnippets.filter((snippet)=> snippet.isModerator).map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor='brand.100'
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>


      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MY COMMUNITIES
        </Text>

        <MenuItem>
          <Flex
            align={"center"}
            width="100%"
            fontSize={"10pt"}
            onClick={() => setOpen(true)}
          >
            <Icon fontSize={20} mr="2" as={GrAdd} />
            CreateCommunity
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
