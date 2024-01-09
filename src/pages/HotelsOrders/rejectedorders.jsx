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


const RejectedOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 31, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 32, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 33, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 34, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
        { id: 35, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
        { id: 36, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    ];

    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
    };

    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td color="red">{order.status}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        {orders.length > 6 &&
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
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>

                        -- No Order Rejected --
                    </Box>

                }
            </Flex>
            <Footer />
        </>
    );
};

export default RejectedOrders;



