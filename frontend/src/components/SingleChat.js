import { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './misc/UpdateGroupChatModal';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import { io } from 'socket.io-client';


const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const toast = useToast();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    const sendMessage = async (e) => {
        if (e.key === "Enter" && !e.shiftKey && newMessage) {
            socket.emit('stop typing', selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                };

                setNewMessage("");
                
                const { data } = await axios.post(
                    "/api/message", {
                    content: newMessage,
                    chatId: selectedChat
                }, config
                );
                
                
                socket.emit("new message", data);
                setMessages([...messages, data]);

            } catch (error) {
                toast({
                    title: "An error occurred.",
                    description: "Unable to send message.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('setup', user);

        socket.on('connected', () => {
            setSocketConnected(true);
        });

        socket.on('typing', () => {
            setIsTyping(true);
        });
        socket.on('stop typing', () => {
            setIsTyping(false);
        });

    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);


    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);

                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        } 

        let lastTypingTime = new Date().getTime();

        setTimeout(() => {
            let typingTimer = new Date().getTime();
            let timeDiff = typingTimer - lastTypingTime;

            if (timeDiff >= 3000 && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, 3000);
    }

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
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                            </>
                        )}
                    </Text>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        p={3}
                        h="100%"
                        w="100%"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="gray.200"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl
                            onKeyDown={sendMessage}
                            isRequired
                            mt={3}
                        >
                            {isTyping ? <div>Loading</div> : <></>}
                            <Input
                                variant="filled"
                                placeholder="Type a message"
                                bg="white"
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="2xl" fontWeight="semibold" color="gray.500" pb={3}>Select a chat to start messaging</Text>
                </Box>
            )}
        </>
    )
}
