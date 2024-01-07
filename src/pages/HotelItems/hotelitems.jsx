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
    InputLeftElement,
    Textarea,
    Stack,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import food from '../../food.png';
import { useParams } from 'react-router-dom';

const HotelItems = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams()
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const toast = useToast();
    const [picLoading, setPicLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

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

    const [catalogItems, setCatalogItems] = useState(initialCatalogItems);



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


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");

            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedItem({ ...selectedItem, pic: data.url.toString() })
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };



    const handleUpdateItem = () => {
        toast({
            title: "Updated Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

        console.log(selectedItem, "selected")
    }

    useEffect(() => {
        fetchallitems();
    }, [])


    const removeItem = (itemId) => {
        const answer = window.confirm('Do you want to proceed?');
        if (answer) {
            const updatedItems = catalogItems.filter(item => item.id !== itemId);
            setCatalogItems(updatedItems);
        }
    };

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
                        Items
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
                                            <Box width="350px" >
                                                <Box direction="column" alignItems="center" textAlign="center" >

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
                                                    <Flex justify={"space-between"}>

                                                        <Button
                                                            mt={6}
                                                            colorScheme="red"
                                                            onClick={() => removeItem(item?.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            mt={6}
                                                            colorScheme="green"
                                                            onClick={() => {
                                                                setSelectedItem(item);
                                                                onOpen();
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Flex>
                                                </Box>
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
                        <Stack spacing={4}>

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Name of Item"
                                    value={selectedItem?.name}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    mb={4}
                                    value={selectedItem?.description}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={selectedItem?.price}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="pic" isRequired>
                                <FormLabel>Upload your Picture</FormLabel>
                                <Input
                                    type="file"
                                    p={1.5}
                                    accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={handleUpdateItem}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Update Item
                                </Button>
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default HotelItems;



