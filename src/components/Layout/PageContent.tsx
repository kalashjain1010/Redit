import React ,{PropsWithChildren} from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  // maxWidth?: string;
  // children?: any
}

// Assumes array of two children are passed
const PageContent: React.FC<PropsWithChildren>= ({children}) => {
  console.log("here is children and unki moomy", children)
  return (
    <Flex justify="center" p="16px 0px">
    <Flex width="95%" justify="center" maxWidth={ "860px"}>
      {/* LHS */}
      <Flex
        direction="column"
        width={{ base: "100%", md: "65%" }}
        mr={{ base: 0, md: 6 }}
      >
        {children && children[0 as keyof typeof children]}
      </Flex>
      {/* Right Content */}
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        flexGrow={1}
      >
        {children && children[1 as keyof typeof children]}
      </Box>
    </Flex>
  </Flex>
  );
};

export default PageContent;
