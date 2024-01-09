import React, { useState } from 'react';
import {
    Box,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
} from '@chakra-ui/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';

const NewOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
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
            <Flex minH={'80vh'} align={'left'} justify={'center'}>
                {orders.length > 0 ? (
                    <Box p={20} width="70%">
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td>{order.status}</Td>
                                        <Td>
                                            <Flex justify={'space-between'}>
                                                <Button
                                                    colorScheme="green"
                                                    onClick={() => handleAccept(order.id)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    ml={2}
                                                    colorScheme="red"
                                                    onClick={() => handleReject(order.id)}
                                                >
                                                    Reject
                                                </Button>
                                            </Flex>
                                        </Td>
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

                    </Box>
                ) : (
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>
                        -- No Orders --
                    </Box>
                )}
            </Flex>
            <Footer />
        </>
    );
};

export default NewOrders;



