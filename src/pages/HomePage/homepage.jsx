import react, { useState, useEffect } from "react"

import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Image,
    Grid,
    GridItem,
    InputLeftElement
} from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";

const Homepage = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;

    const keys = ["name", "description"]
    const initialHotels = [
        { id: 1, name: 'Tech Cafe', description: "dummy1" },
        { id: 2, name: 'At Mark', description: "dummy2" },
        { id: 3, name: 'Galav', description: "dummy3" },
        { id: 4, name: 'Sai', description: "dummy4" },
        { id: 5, name: 'amrutulya ', description: "dummy5" },
        { id: 6, name: 'kumar', description: "dummy6" },
    ];

    const [hotels, setHotels] = useState(initialHotels);
    const [searchQuery, setSearchQuery] = useState('');


    return (
        <>
            <>
                <Header />
                <Flex
                    minH={'80vh'}
                    align={'left'}
                    justify={'center'}
                >
                    <Box p={20}>
                        <Heading as="h2" size="xl" mb={5} align={'center'} color={"green.300"} >
                            Hotels
                        </Heading>

                        <InputGroup   >
                            <InputLeftElement pointerEvents='none'>
                                <SearchIcon color='gray.300' />
                            </InputLeftElement>
                            <Input
                                width="1250px"
                                placeholder="Search items..."
                                mb={4}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                borderColor={"black"}
                            />

                        </InputGroup>

                        {
                            hotels.length ? <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                {hotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                    <GridItem key={item.id} onClick={() => { navigate(`/catalog/${item.id}`) }}>
                                        <Box
                                            _hover={{
                                                bg: 'green.200',
                                                cursor: 'pointer',
                                            }}
                                            border="1px"
                                            p={4}
                                            borderRadius="md"
                                            boxShadow="md">
                                            <Flex height="100px" overflowY="auto" >
                                                <Box

                                                    width="350px"
                                                // maxH="350px"
                                                >
                                                    <Box direction="column" alignItems="center" textAlign="center" >
                                                        <Heading as="h3" size="lg" mb={2}>
                                                            {item.name}
                                                        </Heading>
                                                        <Text fontSize="xl" color="blue" mb={4} >
                                                            {item?.description}
                                                        </Text>
                                                    </Box>

                                                </Box>
                                            </Flex>
                                        </Box>
                                    </GridItem>

                                ))}
                            </Grid> :
                                <Box align={'center'} color={"red"}  >
                                    -- No Hotels Listed --
                                </Box>
                        }

                    </Box>
                </Flex>
                <Footer />
            </>
        </>
    )
}

export default Homepage;

