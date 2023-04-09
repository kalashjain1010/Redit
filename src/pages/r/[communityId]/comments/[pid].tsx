import React from "react";
import PageContent from "../../../../components/Layout/PageContent";
import usePosts from "../../../../hooks/usePosts";
import PostItem from "../../../../components/Community/Posts/PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";

const postPage: React.FC = () => {
    const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  return (
    <PageContent>
      <>
       {postStateValue.selectedPost && <PostItem
          post={postStateValue.selectedPost}
          
          onVote={onVote}
          onDeletePost={onDeletePost}
          userVoteValue={
            postStateValue.postVotes.find(
              (item) => item.postId === postStateValue.selectedPost!.id
            )?.voteValue
          }
          userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
        />}
      </>
      <></>
    </PageContent>
  );
};
export default postPage;
