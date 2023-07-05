import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [email, setEmail] = useState();
    const [pic, setPic] = useState();
    const [show,setShow] = useState(false);

    const handleClick = () => setShow(!show);

    const postDetails=(pic)=>{
    }

    const submitHandler = () =>{ }
  return (<VStack spacing = '5px' color='black'>
    <FormControl id='first-name' isRequired>
        <FormLabel>Name
        </FormLabel>
           <Input
            placeholder="enter name"
            onChange={(e)=>setName(e.target.value)}/>
    </FormControl>
    <FormControl id='email' isRequired>
        <FormLabel>Email
        </FormLabel>
           <Input
            placeholder="enter your mail id"
            onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>
    <FormControl id='password' isRequired>
        <FormLabel>Password
        </FormLabel>
        <InputGroup>
          <Input
           type={show?'text':'password'}
            placeholder="enter your password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement width="4.5rem">
            <Button h='1.75rem' size="sm" onClick={handleClick}>
                {show ? "hide" : "show"}
            </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>
    
    <FormControl id='password' isRequired>
        <FormLabel>Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
           type={show?'text':'password'}
            placeholder="enter your password"
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <InputRightElement width="4.5rem">
            <Button h='1.75rem' size="sm" onClick={handleClick}>
                {show ? "hide" : "show"}
            </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>
    
     <FormControl id='pic' isRequired>
        <FormLabel>Upload Display Picture
        </FormLabel>
           <Input
           type="file" p={1.5} accept="image/*"
            placeholder="enter name"
            onChange={(e)=>postDetails(e.target.files[0])}/>
    </FormControl>
    <Button backgroundColor={'blue.500'} width='100%' style={{marginTop:15}} color='black' onClick={submitHandler}
    >Sign Up</Button>
  </VStack>)
}

export default SignUp