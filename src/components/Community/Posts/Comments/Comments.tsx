import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Post } from "../../../../atoms/postsAtom";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import CommentInput from "./CommentInput";
import { writeBatch } from "firebase/firestore";
import { firestore } from "../../../../firebase/clientApp";

type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const onCreateComment = async (commentText: string) => {
    //create a comment document
    //update post numberOfComment +1
try {
  const batch = writeBatch(firestore);
} catch (error) {
  console.log("onCreateComment error", error);
  
}

    //update client recoil state
  };

  const onDeleteComment = async (comment: any) => {
    //delete a comment document
    //update post numberOfComment -1

    
    //update client recoil state
  };
  
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg={"white"} borderRadius={"0px 0px 4px 4px"} p={2}>
      <Flex
        direction={"column"}
        pl={10}
        pr={4}
        mb={6}
        fontSize={"10pt"}
        width={"100%"}
      >
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};

export default Comments;
