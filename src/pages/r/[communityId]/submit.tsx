import React from "react";
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Community/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";

const submitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log("community", communityStateValue);
  
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};

export default submitPostPage;
