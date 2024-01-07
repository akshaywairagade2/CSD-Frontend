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
    NumberInputField,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    ChakraProvider
} from '@chakra-ui/react';

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import food from '../../food.png';
import { useParams } from 'react-router-dom';


const NewOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    ];

    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
    };

    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            >

                {orders.length > 0 ?
                    <Box p={20} width="70%">

                        <Table variant="striped">
                            <Thead>
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td>{order.status}</Td>
                                        <Td>
                                            <Flex justify={"space-between"}>
                                                <Button colorScheme="green" onClick={() => handleAccept(order.id)}>
                                                    Accept
                                                </Button>
                                                <Button ml={2} colorScheme="red" onClick={() => handleReject(order.id)}>
                                                    Reject
                                                </Button>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                    </Box> :
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>

                        -- No Orders --
                    </Box>

                }
            </Flex >
            <Footer />
        </>
    );
};

export default NewOrders;



