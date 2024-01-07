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
    InputLeftElement,
    SimpleGrid,
    Badge
} from '@chakra-ui/react'



const HomePageHotelOwner = () => {

    const hotelName = 'Tech cafe';
    const hotelDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const hotelRating = 4.5;

    const hotelImages = [
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg"
    ];


    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            >
                <Box p={20}>
                    <Box bg="green.500" p={4} color="white">
                        <Heading as="h1" size="xl" align="center">
                            {hotelName}
                        </Heading>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="xl">{hotelDescription}</Text>
                        <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
                            Rating: {hotelRating}
                        </Badge>
                    </Box>
                    <Box>
                        <SimpleGrid columns={[1, 2, 3]} gap={4} p={4}>
                            {hotelImages.map((image, index) => (
                                <Image key={index} src={image} alt={`Hotel Image ${index + 1}`} />
                            ))}
                        </SimpleGrid>
                    </Box>

                </Box>
            </Flex>
        </>
    )
}

export default HomePageHotelOwner;

