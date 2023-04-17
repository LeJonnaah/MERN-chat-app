import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Register() {

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [Error, setError] = useState('')
  const [Loading, setLoading] = useState(false)
  const [picture, setPicture] = useState()
  const [show, setShow] = useState(false)

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

  const submitHandler = async (e) => {
    e.preventDefault()

    if (Password !== ConfirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      const data = new FormData()
      data.append('file', picture)
      data.append('upload_preset', 'mern-chat-app')
      data.append('cloud_name', 'mern-chat-app')
      setLoading(true)
      const res = await fetch('https://api.cloudinary.com/v1_1/mern-chat-app/image/upload', {
        method: 'post',
        body: data
      })
      const file = await res.json()
      const { url } = file
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VStack spacing={5} color='white'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          placeholder='Enter your username'
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          placeholder='Enter your email'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <InputGroup>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={show ? "text" : 'password'}
            placeholder='Enter your password'
            value={Password}
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
          value={ConfirmPassword}
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
