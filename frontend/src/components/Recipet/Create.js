import React, { useState } from 'react'
import axios from 'axios'
// import * as mindee from "mindee";

// import { Container, Center, Text, Box, Button, Image, VStack, Link } from '@chakra-ui/react';
// import { AttachmentIcon } from '@chakra-ui/icons'

export default function Create(){
    const [file, setFile] = useState();
    let [category, setCatogery] = useState([])
    const [newCatogery, setnewCatogery] = useState({});
    const [newExpanse, setnewExpanse] = useState({});
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
          }).then(res => {


          console.log(res)
          setIsUploading(false);
          recipet['PlaceName']=res.data.merchantName.data
          recipet['Amount']= ("Amount",res.data.totalAmount.data)
          recipet['Categoty']=("Categoty","uncategorized" )
          recipet['Image']=file
          console.log('recipt',recipet);
          const token = localStorage.getItem("token")

          const list = axios.get('http://127.0.0.1:8000/api/category/list/',{
                headers: {
                  'Authorization': `Token ${token}`
                } 
              }).then(res => {
                console.log("returned categories",res.data)
                setCatogery(res.data)
                console.log("categories",category);
                if(category!=null)
                {
    
                  let cat = category.filter(function (el) {
                    return el.Category_name == 'uncategorized'})

                    console.log("categoryyy",cat);
                  if(cat.length==0)
                  {
                    newCatogery.Category_name="uncategorized"
                    newCatogery.Emojis="uncategorized"
                    newCatogery.Description= "This is uncategorized category"
                    console.log("cateee",category);
                    axios.post('http://127.0.0.1:8000/api/category/create/', newCatogery ,{
                      headers: {
                        'Authorization': `Token ${token}`
                      } 
                    })
                  .then(res => {
                    console.log('category response: ', res)
                    let catid= res.data.id
                    recipet.Categoty=catid
                axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Token ${token}`
                },
                })
                  .then(res => {
                    console.log('recipt response: ', res)

                    // axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
                    //   headers: {
                    //     "Content-Type": "multipart/form-data",
                    //     'Authorization': `Token ${token}`
                    // },
                    // })
                  }).catch(err => {
                    console.log(err)
                  })
                  }).catch(err => {
                    console.log(err)
                  })
                  }
                  else
                  {
                    let cat = category.filter(function (el) {
                      return el.Category_name == 'uncategorized'})  
                      console.log("fonud",cat);
                    let catid= cat[0].id
                    recipet.Categoty=catid
                    axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Token ${token}`
                },
                })
                  .then(res => {
                    console.log(res)
                    // axios.post('http://127.0.0.1:8000/api/Expenses/Create/', recipet , {
                    //   headers: {
                    //     "Content-Type": "multipart/form-data",
                    //     'Authorization': `Token ${token}`
                    // },
                    // })

                  }).catch(err => {
                    console.log(err)
                  })
                }
                  }
              }).catch(err => {
                console.log(err)
              })
            }).catch(err => {
              console.log(err)
            })
        } catch (e) {
          console.error(e);
        }
    }

    return (
        <>
      {/* <Box height="100vh" mt="30vh">
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
      </Box> */}
    </>
    )
}