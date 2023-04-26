import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './misc/ProfileModal';

export default function SingleChat({ fetchAgain, setFetchAgain }) {

    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName}
                                {/* <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
                            </>
                        )}
                    </Text>
                </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="2xl" fontWeight="semibold" color="gray.500" pb={3}>Select a chat to start messaging</Text>
                </Box>
            )}
        </>
    )
}
