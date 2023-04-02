import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContentLayout from "../../../components/Layout/PageContent";
import PageContent from "../../../components/Layout/PageContent";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    console.log("here is the data", communityData)
    
    if(!communityData){

        return <CommunityNotFound/>;
    }
    
    return(
        <>
        <Header communityData={communityData}/>
        <PageContent>
          <><div>Lhs</div></>
          <><div>rhs</div></>
        </PageContent>
        </>
    )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()? JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ):"",
      },
    };
  } catch (error) {
    //could add error page here
    console.log("getServerSideProps eoor", error);
  }
}

export default CommunityPage;
