import React from "react";
import { Menu, MenuButton, MenuList, Flex, Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
// import Communities from "./Communities";

const Directory: React.FC = () => {
  return (
    <>
      <Menu>
        <MenuButton
          cursor={"pointer"}
          padding="0px 6px "
          borderRadius={4}
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          mr={2}
          ml={{ base: 1, md: 2 }}
        >
          <Flex
            align={"center"}
            justify={"space-between"}
            width={{ base: "auto", lg: "200px" }}
          >
            <Flex align={"center"}>
              <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
              <Flex fontWeight={600} fontSize="10pt">
                Home
              </Flex>
            </Flex>
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList><Communities/></MenuList>
      </Menu>
    </>
  );
};

export default Directory;
