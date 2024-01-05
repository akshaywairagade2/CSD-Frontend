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
    useQuery,
} from '@chakra-ui/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';


const Catalog = () => {

    const keys = ["name", "description"]
    const initialCatalogItems = [
        { id: 1, name: 'Groceries', price: 20.0, description: "dummy1" },
        { id: 2, name: 'Pharmacy', price: 15.0, description: "dummy2" },
        { id: 3, name: 'Favorite Dishes', price: 25.0, description: "dummy3" },
        { id: 4, name: 'Groceries', price: 20.0, description: "dummy4" },
        { id: 5, name: 'Pharmacy', price: 15.0, description: "dummy5" },
        { id: 6, name: 'Favorite Dishes', price: 25.0, description: "dummy6" },
        { id: 7, name: 'Groceries', price: 20.0, description: "dummy7" },
        { id: 8, name: 'Pharmacy', price: 15.0, description: "dummy8" },
        { id: 9, name: 'Favorite Dishes', price: 25.0, description: "dummy9" },

    ];

    const [catalogItems, setCatalogItems] = useState(initialCatalogItems);
    const [searchQuery, setSearchQuery] = useState('');


    // console.log(catalogItems1.filter(item => item.name.includes("Pharmacy")))

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

                    <Input
                        width={1000}
                        placeholder="Search items..."
                        mb={4}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {
                        catalogItems.length ? <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4}>
                            {catalogItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                <GridItem key={item.id}>
                                    <Box border="1px" p={4} borderRadius="md" boxShadow="md">
                                        <Heading as="h3" size="lg" mb={2}>
                                            {item.name}
                                        </Heading>
                                        <Text color="gray.600">Price: {item.price.toFixed(2)} Rs</Text>
                                        <Text color="gray.600">Description: {item.description}</Text>
                                        <Button
                                            mt={4}
                                            colorScheme="blue"
                                            onClick={() => console.log(`Added ${item.name} to cart`)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </GridItem>
                            ))}
                        </Grid> :
                            <Box align={'center'} color={"red"}  >
                                --No Items --
                            </Box>
                    }

                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default Catalog;