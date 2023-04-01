// import { Button, Flex, Image, Text } from "@chakra-ui/react";
// import { User } from "firebase/auth";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import React, { useEffect } from "react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../../firebase/clientApp";


// type OAuthButtonsProps = {};

// const OAuthButtons: React.FC = () => {
//   const[signInWithGoogle, user , loading , error] =useSignInWithGoogle(auth);

//   const createuserDocument = async( user : User) =>{
//     const userDocRef = doc(firestore, "users" , user.uid)
//     await setDoc(userDocRef,JSON.parse(JSON.stringify(user)) )
//   } 

//   useEffect(() => {
//     if (user) {
//       createuserDocument(user.user)
//     }
  
//   }, [user])
  

//   return (
//     <Flex direction="column" mb={4} width="100%">
//       <Button
//         variant="oauth"
//         mb={2}
//         onClick={() => signInWithGoogle()}
//         isLoading={loading}
//       >
//         <Image src="/images/googlelogo.png" height="20px" mr={4} />
//         Continue with Google
//       </Button>
//       <Button variant="oauth">Some Other Provider</Button>
//       {error && (
//         <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
//           {error.message}
//         </Text>
//       )}
//     </Flex>
//   );
// };
// export default OAuthButtons;
