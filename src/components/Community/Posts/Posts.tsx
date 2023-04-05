import React, { useEffect, useState } from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import usePosts from "../../../hooks/usePosts";
import { Post } from "../../../atoms/postsAtom";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
    const {postStateValue, setPostStateValue} = usePosts();
  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts =  postDocs.docs.map((doc)=> ({ id: doc.id, ...doc.data()}));
        setPostStateValue(prev => ({
            ...prev,
            posts: posts as Post[],
        }))
      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
};

export default Posts;
