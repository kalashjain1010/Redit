// import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import { Transaction, doc, getDoc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";

type CreateCommunityModalProp = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProp> = ({
  open,
  handleClose,
}) => {
  const [user] =useAuthState(auth)
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);

    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if(error) setError("")
  //validating our community
    const format = /[~@|$^<>\*+=;?`')[\]]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be between 3-21 characters, and only contains letters,numbers, or underscores"
      );
      return;
    }
    setLoading(true)

    
    try {
        //creating community
            //checking if name is not taken
            //if valid, create
        
        const communityDocRef = doc(firestore, 'communities' , communityName);
        
        await runTransaction(firestore, async(transaction)=>{

          const communityDoc = await transaction.get(communityDocRef);
  
          if (communityDoc.exists()) {
              throw new Error(`sorry,r/${communityName} is already take. Try another `);
             
          }
          //Create community
          transaction.set(communityDocRef, {
              creatorId: user?.uid,
              createdAt: serverTimestamp(), 
              numberOfMembers: 1,
              privacyType : communityType,
          })
          //create communitySnippets
          transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),{
            communityId: communityName,
            isModerator: true,
          })
        })
        
    
    } catch (error:any) {
        console.log("create community eror", error)
        setError(error.message);
    }
    setLoading(false);
  }
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDirection="column"
            fontSize={15}
            padding="3"
          >
            Create a community
          </ModalHeader>

          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection="column"
              padding={"10px 0"}
            >
              <Box fontWeight={600} fontSize={15}>
                Name
              </Box>
              <Box fontSize={11} color="gray.500">
                Community name including capatalization cannot be changed
              </Box>
              <Box
                position={"relative"}
                top="28px"
                left={"10px"}
                width="20px"
                color={"gray"}
              >
                r/
              </Box>
              <Input
                value={communityName}
                size={"sm"}
                position="relative"
                pl="22px"
                onChange={handleChange}
              />
              <Box
                fontSize={"9pt"}
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining{" "}
              </Box>
              <Box fontSize={"9pt"} color="red" pt="1">
                {error}
              </Box>
              <Box mt={4} mb={4}>
                <Box fontWeight={600} fontSize={"15"}>
                  Community type
                </Box>
                <Stack>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillPersonFill} color="gray.500" mr={1} />
                      public
                      <Box fontSize={10} color="gray.500" pl="1" pt="1">
                        Anyone can view,post and comment in the community
                      </Box>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} color="gray.500" mr={1} />
                      restricted
                      <Box fontSize={10} color="gray.500" pl="1" pt="1">
                        Anyone can view,but only approved members can post
                      </Box>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} color="gray.500" mr={1} />
                      private
                      <Box fontSize={10} color="gray.500" pl="1" pt="1">
                        Only approved user can view and submit to this community
                      </Box>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg={"gray.100"} border-radius="0px 0px 10px 10px">
            <Button
              variant={"outline"}
              height={"30px"}
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              height={"30px"}
              mr={3}
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
