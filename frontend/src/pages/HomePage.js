import React from 'react'
import { Container, Box, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export default function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent={'center'}
        p={4}
        bg='teal.500'
        w='100%'
        borderRadius='md'
        m={'40px 0 15px 0'}
        borderWidth='1px'
      >
        <Text
          fontSize='xl'
          fontWeight='bold'
          color='white'
          textAlign={'center'}
        >
          MERN Chat App
        </Text>
      </Box>
      <Box
        bg={'teal.500'}
        w='100%'
        p={4}
        borderRadius='md'
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded'>
          <TabList mb={'1em'}>
            <Tab w={'50%'}>Login</Tab>
            <Tab w={'50%'}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Register/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}
