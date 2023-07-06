import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useHistory } from 'react-router';

const SignUp = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [email, setEmail] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const handleClick = () => setShow(!show);

    //uploading images on cloudinary
    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "TalkSpace");
            data.append("cloud_name", "Pallavi-sr");
            fetch("https://api.cloudinary.com/v1_1/pallavi-sr/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setPicLoading(false);
            return;
        }
    };

    //uploading to db
    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Password Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setPicLoading(false);
            return;
        }

        //store in db
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("api/user", { name, email, password, pic }, config);
            toast({
                title: "Registration successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));

            setPicLoading(false);
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
            setPicLoading(false);

        }
    }


    return (
    <VStack spacing='5px' color='black'>

        <FormControl id='first-name' isRequired>
            <FormLabel>Name
            </FormLabel>
            <Input
                placeholder="enter name"
                onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email
            </FormLabel>
            <Input
                placeholder="enter your mail id"
                onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password
            </FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder="enter your password"
                    onChange={(e) => setPassword(e.target.value)} />
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
                    type={show ? 'text' : 'password'}
                    placeholder="enter your password"
                    onChange={(e) => setConfirmPassword(e.target.value)} />
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
                onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl>

        <Button backgroundColor={'blue.500'} width='100%' style={{ marginTop: 15 }} color='black' onClick={submitHandler} isLoading={picLoading}
        >Sign Up</Button>
    </VStack>)
}

export default SignUp;