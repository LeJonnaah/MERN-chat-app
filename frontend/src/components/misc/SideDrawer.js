import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from '../../Context/ChatProvider';
import { MenuDivider, MenuItem } from '@chakra-ui/menu';
import ProfileModal from './ProfileModal';

export default function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user } = ChatState();

    return (
        <>
            <Box
                display={{ base: "none", md: "flex" }}
                justifyContent="space-between"
                alignItems="center"
                bg="teal.400"
                w="100%"
                p="5px 10px 5px 10px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" >
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Talk-A-Tive
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList>  </MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton 
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar 
                                size="sm" 
                                cursor="pointer"
                                name={user.name}
                                src={user.picture}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal>
                                {/* <MenuItem>My Profile</MenuItem> */}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    )
}