import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Button,
    Image,
    Center
} from '@chakra-ui/react';
import Footer from "../../Footer/footer";
import Header from "../../Header/Header";
import food from "../../food.png"
import axios from "axios";


const AddToCart = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const user = userInfo ? userInfo.User : null;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


    const GetAllItems = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.get(
                `http://localhost:5000/api/v1/cart/1`,
                config
            );

            var amount1 = 0;
            for (let i = 0; i < data.items.length; i++) {
                amount1 += (data.items[i].price) * (data.items[i].quantity)
            }
            setAmount(amount1)
            setCartItems(data.items);

        } catch (error) {
            console.log(error)

        }
    };


    const increaseQuantity = async (item) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/add`,
                {
                    "hotelID": hotelid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const decreaseQuantity = async (item) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/remove`,
                {
                    "hotelID": hotelid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const removeItem = async (item) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            // const { data, status } = await axios.post(
            //     `http://localhost:5000/api/v1/remove`, {
            //     "hotelID": hotelid,
            //     "item": item
            // },
            //     config
            // );

            // if (status == 200) {
            //     GetAllItems();
            // }

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        GetAllItems()
    }, []);


    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                p={20}
            >

                <Box width={"100%"} padding={30} align={'center'}
                    justify={'center'}>
                    {
                        cartItems.length > 0 &&
                        <Heading as="h2" size="xl" align={'center'} color={"green.300"} mb={3}>
                            Catalogs Added
                        </Heading>
                    }
                    {cartItems.length > 0 ? (
                        <Flex>
                            <Box w="50%">
                                {cartItems.map((item) => (
                                    <Flex
                                        key={item.id}
                                        justify="space-between"
                                        mb={4}
                                        p={4}
                                        bg="white"
                                        boxShadow="md"
                                        borderRadius="md"
                                    >
                                        <Text fontSize="xl" color="black">{item.name}</Text>
                                        <Image
                                            rounded="lg"
                                            width="120px"
                                            height="120px"
                                            fit="cover"
                                            src={food}
                                            alt={item.name}
                                            draggable="false"
                                            loading="lazy"
                                        />
                                        <Flex alignItems="center">
                                            <Button onClick={() => decreaseQuantity(item)} size="sm" variant="outline">
                                                -
                                            </Button>
                                            <Text mx={2}>{item.quantity}</Text>
                                            <Button onClick={() => increaseQuantity(item)} size="sm" variant="outline">
                                                +
                                            </Button>
                                            <Button onClick={() => removeItem(item)} colorScheme="red" size="sm" m={1}>
                                                Remove
                                            </Button>
                                        </Flex>
                                    </Flex>
                                ))}
                            </Box>
                            <Box w="30%" pl={10} >
                                <Flex
                                    direction="column"
                                    justify="space-between"
                                    mb={4}
                                    p={4}
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="md"
                                    height="350px"

                                >
                                    <Stack spacing="4" align="left">
                                        <Text fontSize="xl" color="black" fontWeight="semibold">Order Summary</Text>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold">Subtotal:</Text>
                                            <Text fontSize="lg">$300</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold">Shipping + Tax:</Text>
                                            <Text fontSize="lg" align="right">Calculate shipping</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold">Coupon Code:</Text>
                                            <Text fontSize="lg">Add coupon code</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold">Total:</Text>
                                            <Text fontSize="lg">{amount}Rs</Text>
                                        </HStack>
                                        <Center >
                                            <Button colorScheme="green" size="lg" fontSize="md" mt="4" width={500} onClick={() => { navigate(`/payment/${amount}`) }}>
                                                Payment
                                            </Button>
                                        </Center>
                                    </Stack>
                                </Flex>
                            </Box>
                        </Flex>
                    ) : (
                        <Text fontSize="xl" color="red" align={"center"}>-- Nothing is Added to the Cart --</Text>
                    )}
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default AddToCart;
