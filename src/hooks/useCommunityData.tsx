import React from "react";
import { useRecoilState } from "recoil";
import { communityState } from "../atoms/communitiesAtom";

const useCommunityData = () => {
  const [communityStateValue, setCommunitySetValue] =
    useRecoilState(communityState);

    const joinCommunity= ()=>{}
    const leaveCommunity= ()=>{}

  return {
    communityStateValue,
    leaveCommunity,
    joinCommunity,
  };
};

export default useCommunityData;
