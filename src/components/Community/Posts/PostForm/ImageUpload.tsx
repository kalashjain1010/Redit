import React, { useRef } from "react";
import { Flex, Stack, Button, Image, Input } from "@chakra-ui/react";

type ImageUploadProps = {
    selectedFile?: string;
    setSelectedFile: (value: string) => void;
    setSelectedTab: (value: string) => void;
    // selectFileRef: React.RefObject<HTMLInputElement>;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile , onSelectImage , setSelectedTab , setSelectedFile}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
        <Image src={selectedFile} maxWidth={"400px"} maxHeight={"400px"} />
        <Stack direction={"row"} mt={4}>
            <Button height={"28px"} onClick={() => setSelectedTab("Post")}>Back to post</Button>
            <Button variant={"outline"} height={"28px"} onClick={()=> setSelectedFile("")}>remove</Button>
        </Stack>
        </>
      ):(
        <Flex
        justify={"center"}
        align={"center"}
        p={20}
        border={"1px dashed"}
        borderColor={"gray.200"}
        width={"100%"}
        borderRadius={4}
      >
        <Button variant={"outline"} height={"28px"} onClick={() => selectedFileRef.current?.click()}>
          Upload
        </Button>
        <Input ref={selectedFileRef} type="file" hidden 
        onChange={onSelectImage} 
        />
       
      </Flex>
      
      )}
        
    </Flex>
  );
};
export default ImageUpload;
