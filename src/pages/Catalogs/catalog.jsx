import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Text,
    Button,
    Flex,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import food from '../../food.png';
import { useParams } from 'react-router-dom';

const Catalog = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams()
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    console.log(userInfo?.Token['token'], "userinfo")
    const keys = ["name", "description"];
    const initialCatalogItems = [
        { id: 1, name: 'Groceries', price: 20.0, description: "dummy1", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 2, name: 'Pharmacy', price: 15.0, description: "dummy2", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 3, name: 'Favorite Dishes', price: 25.0, description: "dummy3", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 4, name: 'Groceries', price: 20.0, description: "dummy4", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 5, name: 'Pharmacy', price: 15.0, description: "dummy5", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 6, name: 'Favorite Dishes', price: 25.0, description: "dummy6", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 7, name: 'Groceries', price: 20.0, description: "dummy7", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 8, name: 'Pharmacy', price: 15.0, description: "dummy8", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { id: 9, name: 'Favorite Dishes', price: 25.0, description: "dummy9", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
    ];


    useEffect(() => {
        if (hotelid != params.id || hotelid == null)
            localStorage.setItem("hotelid", JSON.stringify(params.id));
    }, [])

    const fetchallitems = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // const { data } = await axios.post(
            //     "http://localhost:5000/api/allitems",
            //     {
            //         // "emailId": id, 
            //     },
            //     config
            // );

            console.log("fetch")


        } catch (error) {

            console.log("Error")
        }
    }

    useEffect(() => {
        fetchallitems();
    }, [])


    const AddtoCart = async (item) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/add",
                {
                    "hotelID": hotelid,
                    "item": item,
                },
                config
            );

            console.log(data, "fetch")


        } catch (error) {

            console.log("Error")
        }
    }

    const [catalogItems, setCatalogItems] = useState(initialCatalogItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);


    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            >
                <Box p={20}>
                    <Heading as="h2" size="xl" mb={5} align={'center'} color={"green.300"} >
                        Catalogs
                    </Heading>


                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            width="1200px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}
                        />
                    </InputGroup>


                    {
                        catalogItems.length ? <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width={"100%"}>
                            {catalogItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                <GridItem key={item.id}>
                                    <Box
                                        _hover={{
                                            bg: 'green.200',
                                            cursor: 'pointer',
                                        }}
                                        border="1px"
                                        p={4}
                                        borderRadius="md"
                                        boxShadow="md">
                                        <Flex height="350px" overflowY="auto" >
                                            <Box

                                                width="350px"
                                            // maxH="350px"
                                            >
                                                <Box
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        onOpen();
                                                    }}
                                                    direction="column" alignItems="center" textAlign="center"
                                                >

                                                    <Heading as="h3" size="lg" mb={2}>
                                                        {item.name}
                                                    </Heading>
                                                    <Image src={food} alt={item?.name} mb={4} boxSize={'150px'} />
                                                    <Text fontSize="xl" color="black">
                                                        Price: {item?.price.toFixed(2)} Rs
                                                    </Text>
                                                    <Text fontSize="xl" color="black" mb={4} >
                                                        Description: {item?.description}
                                                    </Text>
                                                </Box>

                                                <Button
                                                    mt={6}
                                                    colorScheme="blue"
                                                    onClick={(e) => { AddtoCart(item) }}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </GridItem>
                            ))}
                        </Grid> :
                            <Box align={'center'} color={"red"}  >
                                -- No Items --
                            </Box>
                    }
                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader align={"center"} fontSize={40} fontWeight="bold" >{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" alignItems="center" textAlign="center">
                            <Image src={food} alt={selectedItem?.name} mb={4} />
                            <Text fontSize="xl" color="black">
                                Price: {selectedItem?.price.toFixed(2)} Rs
                            </Text>
                            <Text fontSize="xl" color="black" mb={4} width="500px" overflowY="auto">
                                Description: {selectedItem?.description}
                            </Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {/* <Button
                            colorScheme="green"
                            onClick={() => console.log(`Added ${selectedItem?.name} to cart`)}
                        >
                            Add to Cart
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default Catalog;



