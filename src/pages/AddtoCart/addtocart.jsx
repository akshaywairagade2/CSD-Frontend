import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue,
    Text,
    Button,
    Image,
    Center
} from '@chakra-ui/react';
import Footer from "../../Footer/footer";
import Header from "../../Header/Header";
import food from "../../food.png"

const AddToCart = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const amount = 300;

    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            price: 39.99,
            currency: 'GBP',
            name: 'Ferragamo bag',
            description: 'Tan, 40mm',
            quantity: 3,
            imageUrl:
                'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
        },
        {
            id: '2',
            price: 39.99,
            currency: 'GBP',
            name: 'Bamboo Tan',
            description: 'Tan, 40mm',
            quantity: 3,
            imageUrl:
                'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
        },
        {
            id: '3',
            price: 39.99,
            currency: 'GBP',
            name: 'Yeezy Sneakers',
            description: 'Tan, 40mm',
            quantity: 3,
            imageUrl:
                'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        },
    ]);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);

    const increaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };



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
                                            <Button onClick={() => decreaseQuantity(item.id)} size="sm" variant="outline">
                                                -
                                            </Button>
                                            <Text mx={2}>{item.quantity}</Text>
                                            <Button onClick={() => increaseQuantity(item.id)} size="sm" variant="outline">
                                                +
                                            </Button>
                                            <Button onClick={() => removeItem(item.id)} colorScheme="red" size="sm" m={1}>
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
                                            <Text fontSize="lg">$300</Text>
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
