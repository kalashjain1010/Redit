import React, { useEffect, useState } from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import usePosts from "../../../hooks/usePosts";
import { Post } from "../../../atoms/postsAtom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const [user] = useAuthState(auth);
  const getPosts = async () => {
    try {
      //get posts for this community
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log("possts", posts);
    } catch (error: any) {
      console.log("getPosts Error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item) => (
        <PostItem
          post={item}
          userIsCreator={user?.uid === item.creatorId}
          userVoteValue={undefined}
          onSelectPost={onSelectPost}
          onVote={onVote}
          onDeletePost={onDeletePost}
        />
      ))}
    </Stack>
  );
};

export default Posts;
