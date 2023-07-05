import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

const Login = () => {
  const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
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

    <Button backgroundColor={'blue.500'} width='100%' style={{marginTop:15}} color='black' onClick={submitHandler}
    >Login</Button>

    <Button variant="solid" backgroundColor={'red.500'} width='100%' style={{marginTop:15}} color='black' onClick={()=>{
      setEmail("guest@example.com");
      setPassword("123456");
    }}
    >Get Guest User Credentials</Button>
  </VStack>)
}

export default Login