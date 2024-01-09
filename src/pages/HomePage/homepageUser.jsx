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
import { SearchIcon } from "@chakra-ui/icons";


const HomePageUser = () => {


    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const keys = ["name", "description"]
    const initialHotels = [
        { id: 1, name: 'Tech Cafe', description: "dummy1" },
        { id: 2, name: 'D-Mark', description: "dummy2" },
        { id: 3, name: 'Galav', description: "dummy3" },
        { id: 4, name: 'Sai', description: "dummy4" },
        { id: 5, name: 'amrutulya ', description: "dummy5" },
        { id: 6, name: 'kumar', description: "dummy6" },
        { id: 7, name: 'Tech Cafe', description: "dummy7" },
        { id: 8, name: 'D-Mark', description: "dummy8" },
        { id: 9, name: 'Galav', description: "dummy9" },
        { id: 10, name: 'Sai', description: "dummy10" },
        { id: 11, name: 'amrutulya ', description: "dummy11" },
        { id: 12, name: 'kumar', description: "dummy12" },
        { id: 13, name: 'Tech Cafe', description: "dummy13" },
        { id: 14, name: 'D-Mark', description: "dummy14" },
        { id: 15, name: 'Galav', description: "dummy15" },
        { id: 16, name: 'Sai', description: "dummy16" },
        { id: 17, name: 'amrutulya ', description: "dummy17" },
        { id: 18, name: 'kumar', description: "dummy18" },
    ];

    const [hotels, setHotels] = useState(initialHotels);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (hotelid) {
            localStorage.removeItem("hotelid");
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const HotelsPerPage = 6;
    const totalPages = Math.ceil(hotels.length / HotelsPerPage)

    const indexOfLastHotel = (currentPage + 1) * HotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - HotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
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
                        hotels.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                    {currentHotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
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
                                </Grid>
                                {
                                    hotels.length > 6 &&
                                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <Button
                                            style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
                                            onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
                                            disabled={currentPage === 0}
                                        >
                                            Previous
                                        </Button>

                                        {[...Array(totalPages)].map((_, index) => (
                                            <Button
                                                key={index + 1}
                                                style={{
                                                    padding: '10px',
                                                    margin: '0 5px',
                                                    cursor: 'pointer',
                                                    backgroundColor: currentPage === index ? 'lightblue' : 'lightgray',
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() => handlePageChange(index)}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}

                                        <Button
                                            style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
                                            disabled={currentPage === totalPages - 1}
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                }
                            </Box> :
                            <Box align={'center'} color={"red"}  >
                                -- No Hotels Listed --
                            </Box>
                    }
                </Box>
            </Flex>
        </>
    )
}

export default HomePageUser;

