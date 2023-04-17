import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [Error, setError] = useState('')
  const [Loading, setLoading] = useState(false)
  const [picture, setPicture] = useState()
  const [pic, setPic] = useState()
  const [picLoading, setPicLoading] = useState(false)
  const [show, setShow] = useState(false)
  const history = useHistory()
  const toast = useToast()

  const handleClick = () => setShow(!show)

  const postDetails = (picture) => {
    if (!picture) {
      return setError('Please select an image')
    }

    if (picture.type === 'image/jpeg' || picture.type === 'image/png') {
      setPicture(picture)
      setError('')
    } else {
      return setError('Please select an image file (png or jpg)')
    }
  }

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing={5} color='white'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          placeholder='Enter your username'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <InputGroup>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={show ? "text" : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <FormControl id='picture'>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type='file'
          accept='.png, .jpg, .jpeg'
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme='teal'
        variant='outline'
        type='submit'
        onClick={submitHandler}
        isLoading={Loading}
        loadingText='Loading...'
      >
        Register
      </Button>
      </VStack>
  )
}
