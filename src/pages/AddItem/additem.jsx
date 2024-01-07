import react, { useState, useEffect } from "react"
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Flex, Box, Heading, Input, Textarea, NumberInput, NumberInputField, Button, VStack, FormControl, FormLabel, InputGroup, InputRightElement, useColorModeValue, Stack, Text, Link
} from '@chakra-ui/react'
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";

const AddItem = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const [pic, setPic] = useState();
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: 0,
        photo: null,
    });

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const handleAddItem = () => {
        console.log('Added Item:', item);
    };



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
                    setItem({ ...item, photo: data.url.toString() })
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

    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
                padding={9}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} width="100%">
                    <Stack align={'center'}>
                        <Heading fontSize={'5xl'}>Add New Item </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}>
                        <Stack spacing={4}>

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Name of Item"
                                    value={item.name}
                                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    mb={4}
                                    value={item.description}
                                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                                />
                                {/* <NumberInput mb={4} value={item.price} onChange={(value) => setItem({ ...item, price: value })}>
                                    <NumberInputField placeholder="Price" />
                                </NumberInput> */}
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
                                    onClick={handleAddItem}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Add Item
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            {/* <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                        marginTop={6}
                    >
                        <Box p={5}>
                            <Heading as="h2" size="xl" mb={4} align={"center"}>
                                Add Item
                            </Heading>
                            <Input
                                placeholder="Name of the Item"
                                mb={4}
                                value={item.name}
                                onChange={(e) => setItem({ ...item, name: e.target.value })}
                            />
                            <Textarea
                                placeholder="Description"
                                mb={4}
                                value={item.description}
                                onChange={(e) => setItem({ ...item, description: e.target.value })}
                            />

                            <NumberInput mb={4} value={item.price} onChange={(value) => setItem({ ...item, price: value })}>
                                <NumberInputField placeholder="Price" />
                            </NumberInput>

                            <Button colorScheme="green" onClick={handleAddItem} align={"center"}>
                                Add Item
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Flex> */}
            <Footer />
        </>
    )
};

export default AddItem;

