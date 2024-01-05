import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    Image
} from '@chakra-ui/react'

import ProfileModal from "./Profile/profilemodal"
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../logo.png"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState()
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;

    const email = user?.emailId;
    const isAdmin = user?.isAdmin;


    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };


    useEffect(() => {
        if (path == "verifymail") localStorage.removeItem("userInfo");
    }, [])

    return (

        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            // position={"auto"}
            position={"fixed"}
            top={0}
            width="100%"
            zIndex={5}
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>

                    <Image
                        boxSize='60px'
                        src={logo}
                        alt='Logo'
                        borderRadius="50px"
                    />

                    <Stack direction={'row'} spacing={6}>
                        <Box as="a" href={'/'}
                            color={path == "/" ? "green" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            Home
                        </Box>
                        {
                            user &&
                            <Box as="a" href={'/sender'}
                                color={path == "/sender" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Sender
                            </Box>
                        }
                        {
                            user &&
                            <Box as="a" href={'/buyer'}
                                color={path == "/buyer" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Buyer
                            </Box>
                        }
                    </Stack>
                </HStack>



                {/* -- Serach Bar -- */}
                {/* {
                        user ? (
                            <InputGroup borderRadius={20} width={600} backgroundColor="white" boxShadow="1px 1px black"   >
                                <InputLeftElement pointerEvents='none'>
                                    <SearchIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Search By User' borderRadius={20} />
                            </InputGroup>
                        ) : null
                    } */}
                {/* -- Serach Bar -- */}



                <HStack alignItems={'end'}>
                    {
                        (user && path != "verifymail") ?
                            <Button colorScheme='blue' size='sm' variant='outline' onClick={logoutHandler}>
                                Logout
                            </Button>
                            :
                            (
                                path == '/login' || path == '/signup' ?
                                    null
                                    :

                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => navigate('/login')}>
                                        Login
                                    </Button>

                            )
                    }
                </HStack>

            </Flex >
        </Box >

    )
}

export default Header;

