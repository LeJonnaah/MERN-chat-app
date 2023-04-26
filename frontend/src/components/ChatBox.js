import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

export default function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState()
  
  return (
    <Box
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};