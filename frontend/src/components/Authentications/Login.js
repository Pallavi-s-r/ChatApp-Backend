import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import {useHistory} from 'react-router';
import axios from 'axios';

const Login = () => {
 
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [show,setShow] = useState(false);
    const [loading,setLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

 const submitHandler = async () => {
        setLoading(true);
        if ( !email || !password ) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }

        //store in db
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("api/user/login", { email, password }, config);
            toast({
                title: "Login successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
          
        }
    }

  return (
  <VStack spacing = '5px' color='black'>
 
    <FormControl id='email' isRequired>
        <FormLabel>Email
        </FormLabel>
           <Input
           value={email}
            placeholder="enter your mail id"
            
            onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>

    <FormControl id='password' isRequired>
        <FormLabel>Password
        </FormLabel>
        <InputGroup size = "md">
          <Input
           value={password}
            onChange={(e)=>setPassword(e.target.value)}
           type={show?'text':'password'}
            placeholder="enter your password"
           />
            <InputRightElement width="4.5rem">
            <Button h='1.75rem' size="sm" onClick={handleClick}>
                {show ? "hide" : "show"}
            </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>

    <Button backgroundColor={'blue.500'} width='100%' style={{marginTop:15}} color='black' onClick={submitHandler} isLoading={loading}
    >Login</Button>

    <Button variant="solid" backgroundColor={'red.500'} width='100%' style={{marginTop:15}} color='black' onClick={()=>{
      setEmail("guest@example.com");
      setPassword("123456");
    }}
    >Get Guest User Credentials</Button>
  </VStack>)
}

export default Login