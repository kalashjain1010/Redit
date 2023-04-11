import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatotId: string;
  creatorDisplayText: string;
  communityId: string;
  postTitle: string;
  postId: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  // const [loading, setLoading] = useState(false);

  // const handleDelete = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const success = await onDeleteComment(comment);

  //     if (!success) {
  //       throw new Error("Error deleting comment");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     // setError
  //     setLoading(false);
  //   }
  // }, [setLoading]);

  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color={"gray.300"} />
      </Box>
      <Stack spacing={1}>
        <Stack direction={"row"} align={"center"} fontSize={"8pt"}>
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color={"gray.600"}>
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size={"sm"} />}
        </Stack>
        <Text fontSize={"10pt"}>{comment.text}</Text>
        <Stack
          direction={"row"}
          align={"center"}
          cursor={"pointer"}
          color={"gray.500"}
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatotId && (
            <>
              <Text fontSize={"9pt"} _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize={"9pt"}
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
