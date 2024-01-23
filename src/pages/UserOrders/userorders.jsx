import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Badge
} from '@chakra-ui/react';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import FoodBackgroundImage from '../../foodbackgroundimage.jpg';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {



    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    // const orders = [
    //     { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    //     { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    //     { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    // ];


    const GetUserOrders = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByUser`,
                {
                    userId: user._id
                },
                config
            );


            if (status == 201) {
                setOrders(data.userOrders)
            }



        } catch (error) {
            console.log(error)

        }
    };


    useEffect(() => {
        GetUserOrders()
    }, [])


    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
    };



    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders?.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    return (
        <>

            <Header />
            <Flex
                p={20}
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            // minH={'80vh'}
            // align={'center'}
            // justify={'center'}
            // bg="gray"
            // p={20}

            >
                {orders.length > 0 ? (
                    <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                        <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                            Orders
                        </Text>
                        <Table variant="striped">
                            <Thead >
                                <Tr >
                                    <Th>ID</Th>
                                    {/* <Th>Name</Th> */}
                                    <Th>Items</Th>
                                    <Th>Hotel Name</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td color="black">{order?._id.slice(0, 10)}...</Td>
                                        {/* <Td color="black">{user.userName}</Td> */}
                                        <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                        <Td color="black">{order.hotelName}</Td>
                                        {/* <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td> */}
                                        <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"59%"} p={3} color="white" bg="green.500">{order.orderStatus}</Box></Td>
                                        <Td>
                                            <Flex justify={"space-between"}>
                                                <Button ml={2} colorScheme="red" onClick={() => handleReject(order._id)} isDisabled={(order.orderStatus == "Rejected") || (order.orderStatus == "Accepted") || (order.orderStatus == "Processed") ? true : false}>
                                                    Reject
                                                </Button>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {orders.length > 6 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </Box>
                ) : (
                    <Text p={8} fontSize="2xl" color="white" align="center">
                        -- There are no orders from you. --
                    </Text>
                )}
            </Flex >

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="gray">
                    <ModalHeader align={"center"} fontSize={"40px"} color="white" fontWeight="bold" >{selectedOrder?.hotelName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Table variant="striped">
                                <Thead >
                                    <Tr >

                                        <Th color="black">Item Name</Th>
                                        <Th color="black">Price</Th>
                                        <Th color="black">Quantity</Th>

                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {selectedOrder.map((item) => (
                                        <Tr key={item._id}>
                                            <Td color="black">{item.name}</Td>
                                            <Td color="black">{item.price}</Td>
                                            <Td color="black">{item.quantity}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedOrder([]) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>







            <Footer />
            {/* ======================================================================================================================================================================= */}
            {/* <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                {orders.length > 0 ?
                    <Box width={"100%"} padding={30} align={'center'} justify={'center'}>

                        <Table variant="striped">
                            <Thead >
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Hotel Name</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td >{order.hotelName}</Td>
                                        <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td>
                                        <Td>
                                            <Flex justify={"space-between"}>
                                                <Button ml={2} colorScheme="red" onClick={() => handleReject(order.id)} isDisabled={(order.status == "Rejected") || (order.status == "Accepted") ? true : false}>
                                                    Reject
                                                </Button>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {(orders.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }

                    </Box> :
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>

                        -- No Orders --
                    </Box>

                }
            </Flex>
            <Footer /> */}
            {/* ================================================================================================================================================================ */}
        </>
    );
};

export default UserOrders;



