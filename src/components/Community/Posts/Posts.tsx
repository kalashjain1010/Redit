import React, { useEffect, useState } from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { collection,  getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);

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
        id: doc.id , ...doc.data() 
      }))
      console.log("possts", posts);
    } catch (error: any) {
      console.log("getPosts Error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>hello from posts</div>;
};

export default Posts;
