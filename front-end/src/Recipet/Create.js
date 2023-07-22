import React, { useState } from 'react'
import axios from 'axios'
// import * as mindee from "mindee";

import { Container, Center, Text, Box, Button, Image, VStack, Link } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons'

export default function Create(){
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [recipet, setRecipet] = useState({
      PlaceName: "",
      Amount: 0,
      Categoty: "",
      Image:""
  });

    const handleUploadFile = (evt) => {
        setFile(
          evt.target.files[0],
        )
    }
    const submitPhoto = async () => {
        if (!file) { return; }
        setIsUploading(true)
        const data = new FormData()
    
        data.append('file', file)
    
        let url = "https://api.taggun.io/api/receipt/v1/verbose/file";
    
        try {
          const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'apikey': "7bdc551026fe11ee8c1b2d7f43bc2713"
            } 
          })
          console.log(res)
          setIsUploading(false);
          recipet['PlaceName']=res.data.merchantName.data
          recipet['Amount']= ("Amount",res.data.totalAmount.data)
          recipet['Categoty']=("Categoty","uncategorized" )
          recipet['Image']=file
          // recipet.append('Image',file,file.name)
          // recipet.append("PlaceName",res.data.merchantName.data)
          // recipet.append("Amount",res.data.totalAmount.data)
          // recipet.append("Categoty","uncategorized")
          console.log('recipt',recipet);

          axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
          headers: {
            "Content-Type": "multipart/form-data",
        },
        })
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } catch (e) {
          console.error(e);
        }
    }

    return (
        <Container>
      <Box height="100vh" mt="30vh">
        <Box textAlign="center">
          <VStack mt={16}>
            <VStack spacing={6}>
              <Box>
                <label htmlFor="file-upload">
                  <AttachmentIcon /> Click to select receipt
                </label>
                <input id="file-upload" type="file" onChange={handleUploadFile}/>
              </Box>
          </VStack>
            
        <Button size="md" colorScheme="primary" onClick={submitPhoto}>
                    Upload photo
        </Button>
</VStack>
        </Box>
      </Box>
    </Container>
    )
}