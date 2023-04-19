import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/misc/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {

  const { user } = ChatState();

  return (
    <div style={{ width:"100%" }}>
      {user && <SideDrawer/>}
      <Box
        d="flex"
        justifyContent="space-between"
        w='100%'
        h='100vh'
        p='10'
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}