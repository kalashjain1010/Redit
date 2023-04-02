import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunitySetValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is the user signed in
    //if not = open auth modal and sign in

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get user snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map(doc => ({ ...doc.data()}));
       setCommunitySetValue((prev)=>({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
       }))

      console.log("here is kalash k snippets", snippets)
    } catch (error) {}
  };

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  useEffect(()=>{
    if(!user) return;
    getMySnippets();
  },[user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};

export default useCommunityData;
