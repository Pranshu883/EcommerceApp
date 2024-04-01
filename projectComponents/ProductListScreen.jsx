import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Pressable,
    RefreshControl,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { Button, Card, Chip, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { decode } from 'html-entities';
import RenderHTML from 'react-native-render-html';
import { PRODUCT_LIST } from '../common/webutils';
import { addWishListProducts, creatWishListTable, deleteWishListProduct, getDBConnection, getWishListProducts } from '../db/db';
import { CUSTOMERID, USER_ID, getSession } from '../common/LocalStorage';
import { getRegularFont1 } from '../common/utils';

const ProductListScreen = ({ navigation, route }) => {

    const [productListData, setProductListData] = useState([]);
    const [likedProducts, setLikedProducts] = useState({});
    const [customerId, setCustomerId] = useState('');
    const [checked, setChecked] = useState('');
    const [sortedData, setSortedData] = useState(productListData);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(sortedData);


    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    // const [productId, setProductId] = useState('');
    // console.log("Product ID ",productId);
    const { categoryId } = route.params || {}
    const { categoryName } = route.params || {}

    //     const [products , setProducts] = useState([]);

    //     const loadDataCallBack = useCallback(async()=>{
    //         try{
    //             const sampleData = [
    //                 { product_id: '1', product_name: 'Product 1', product_img: 'null', product_price: '10.00', customer_id: 1 },
    //             ];


    //             const storedProducts = await getWishListProducts(db);
    //             if(storedProducts.length){
    //                 setProducts(storedProducts);
    //             }else{
    //                 await addWishListProducts(db, sampleData);
    //                 setProducts(sampleData);
    //             }
    //         }catch(error){
    //             console.error(error);
    //         }
    //    },[]);

    //    useEffect(()=>{
    //         loadDataCallBack();
    //    },[loadDataCallBack]);





    console.log("category ID ", categoryId);
    useEffect(() => {
        ProductListAPI();
        fetchData();
    }, []);

    const ProductListAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "OCSESSID=2f51f8de55c2702c773c8795c7; currency=USD; language=en-gb");

        const raw = "";

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`https://flutterapp.alakmalak.ca/index.php?route=extension/mstore/product&category=${categoryId}`, requestOptions)
            .then((response) => response.json())
            .then((json) => {

                setProductListData(json.data);
                setLoading(false)
            })
            .catch((error) => console.error(error));
    }


    const fetchData = async () => {
        const fetchedCustomerId = await getSession(CUSTOMERID);
        setCustomerId(fetchedCustomerId);
    }


    useEffect(() => {
        const fetchLikedProducts = async () => {
            try {
                const db = await getDBConnection();
                const products = await getWishListProducts(db, customerId);
                const likedProductIds = {};
                products.forEach((product) => {
                    likedProductIds[product.product_id] = true;
                });
                setLikedProducts(likedProductIds);
            } catch (error) {
                console.error('Error fetching liked products:', error);
            }
        };
        fetchLikedProducts();
    }, [customerId]); // Fetch when customer ID changes


    useEffect(() => {

        if (checked) {
            setSortedData(prevProductListData => getSortedData([...prevProductListData], checked));
        } else {
            setSortedData(productListData);
        }


    }, [checked, productListData])

    // useEffect(() => {
    //     getFilteredProducts();
    // }, [sortedData,selectedPriceRanges,  checked])


    // const ApplyFilter = () => {
    //     getFilteredProducts();
    // };

    const priceRanges = [
        { label: '0 to 500', min: 0, max: 500 },
        { label: '501 to 1000', min: 501, max: 1000 },
        { label: '1001 to 1500', min: 1001, max: 1500 },
        // Add more price ranges as needed
    ];
    console.log("selected ranges", selectedPriceRanges);
    const togglePriceRange = (min, max) => {


        const isRangeSelected = selectedPriceRanges.some(range => range.min === min && range.max === max);
        if (isRangeSelected) {
            setSelectedPriceRanges(selectedPriceRanges.filter(range => !(range.min === min && range.max === max)));
        } else {
            setSelectedPriceRanges([...selectedPriceRanges, { min, max }]);
        }
    };

    const isInRange = (price, range) => {
        return price >= range.min && price <= range.max;
    };

    useEffect(() => {
        applyFilter()
    }, [applyFilter, sortedData])

    const applyFilter = () => {
        if (selectedPriceRanges.length === 0) {
            setFilteredProducts(sortedData); // No filter applied
        }
        setFilteredProducts(sortedData.filter(product => (
            selectedPriceRanges.some(range => isInRange(product.price.replace(/[$,]/g, ''), range))
        )));
        
    }

    const removeItem = async (productId) => {
        try {
            const db = await getDBConnection();
            await deleteWishListProduct(db, productId);
        } catch (error) {
            console.log(error);
        }

    }

    const getSortedData = (prodArr, sortBy) => {
        console.log("checked Status", sortBy);

        switch (sortBy) {
            case "Lowest_first":
                return prodArr.sort((a, b) => parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, '')));

            case "Highest_first":
                return prodArr.sort((a, b) => parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, '')));
            default:
                return prodArr;
        }

    };




    const addToList = async (product) => {
        console.log("Add to tabe Called ");
        const db = await getDBConnection();
        await creatWishListTable(db);

        const productInfo = [{

            "product_id": product.product_id,
            "product_name": product.name,
            "product_img": product.image,
            "product_price": product.price,
            "customer_id": customerId,
        }];
        try {
            await addWishListProducts(db, productInfo);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToWishList = (product) => {
        const productId = product.product_id;
        setLikedProducts((prevLikedProducts) => ({
            ...prevLikedProducts,
            [productId]: !prevLikedProducts[productId]
        }))
        likedProducts[productId] ? removeItem(productId) : addToList(product);

    }



    const renderProductList = ({ item }) => {


        const product = item;
        const productID = item.product_id;
        const isLiked = likedProducts[productID];
        return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProductDetail', {
                productId: productID
            })} >
                <View style={styles.cardImageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <TouchableOpacity style={styles.likeIcon} >
                        <Icon
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "#E70038" : "#333"}
                            onPress={() => { handleAddToWishList(product) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardDescription}>{item.name}</Text>

                    <Text style={styles.cardDescription}>{item.price}</Text>
                </View>
            </Pressable>);
    };

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{categoryName}</Text>
                <Text></Text>
            </View>

            <View style={styles.filterContainer}>
                <View style={styles.sortButtonView}>
                    <Pressable style={styles.buttonWrapper} onPress={() => { setSortModalVisible(true) }} >
                        <Icon name="sort" size={24} color="white" style={{ opacity: 0.9 }} />
                        <Text style={styles.filterText}> Sort </Text>
                    </Pressable>
                </View>
                <View style={styles.filterButtonView}>
                    <Pressable style={styles.buttonWrapper} onPress={() => { setFilterModalVisible(true) }} >
                        <Icon name="filter-variant" size={24} color="white" style={{ opacity: 0.9 }} />
                        <Text style={styles.filterText}> Filter </Text>
                    </Pressable>
                </View>
            </View>

            {loading ? <View style={styles.pageLoadView} >
                <ActivityIndicator size="large" color="#2E4053" style={styles.activityIndicator} />
            </View>
                :
                <SafeAreaView style={{ marginBottom: 100 }} >


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={sortModalVisible}
                        onRequestClose={() => {
                            setSortModalVisible(!sortModalVisible);
                        }}>
                        <View style={styles.modalView}>


                            <Text style={styles.SortTitle}>Sort By:</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setSortModalVisible(!sortModalVisible)}>
                                <Icon name="close" size={24} color="black" />
                            </Pressable>
                            <View style={styles.sortView}>
                                <View style={styles.radioButton}>
                                    <RadioButton
                                        value="Highest_first"
                                        color="#2E4053"
                                        status={checked === 'Highest_first' ? 'checked' : 'unchecked'}
                                        onPress={() => { setChecked('Highest_first'), setSortModalVisible(false) }}
                                    /><Text style={styles.radioButtonText}> Price (Highest first) </Text>
                                </View>
                                <View style={styles.radioButton}>
                                    <RadioButton
                                        value="Lowest_first"
                                        color="#2E4053"
                                        status={checked === 'Lowest_first' ? 'checked' : 'unchecked'}
                                        onPress={() => { setChecked('Lowest_first'), setSortModalVisible(false) }}
                                    /><Text style={styles.radioButtonText}> Price (Lowest first) </Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* filter Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={filterModalVisible}
                        onRequestClose={() => {
                            setFilterModalVisible(!filterModalVisible);
                        }}>
                        <View style={styles.modalView}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalTitle}>Filter by Price</Text>
                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => setFilterModalVisible(!filterModalVisible)}>
                                    <Icon name="close" size={24} color="black" />
                                </Pressable>
                                <View style={styles.priceRangeView}>
                                    {priceRanges.map((range, index) => (
                                        <Chip
                                            key={index}
                                            textStyle={{
                                                color: selectedPriceRanges.some(selectedRange => selectedRange.min === range.min && selectedRange.max === range.max) ?
                                                    "white" : "#444"
                                            }}
                                            onPress={() => togglePriceRange(range.min, range.max)}
                                            style={[styles.chip, {
                                                backgroundColor:
                                                    selectedPriceRanges.some(selectedRange => selectedRange.min === range.min && selectedRange.max === range.max) ?
                                                        '#2E4053' : '#E0E0E0'
                                            }]}
                                        >
                                            {range.label}
                                        </Chip>
                                    ))}
                                </View>
                                <View style={{flexDirection:"row", alignItems: "center", justifyContent:"space-around"}} >
                                    <Button
                                        mode="outlined"
                                        textColor='#2E4053'
                                        onPress={() => {setSelectedPriceRanges([]), applyFilter()}}
                                        style={[styles.applyButton,{backgroundColor:"white"} ]}>
                                        Reset
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        textColor='white'
                                        onPress={() => {applyFilter(), setFilterModalVisible(false);  }}
                                        style={styles.applyButton}>
                                        Apply
                                    </Button>
                                </View>

                            </View>
                        </View>
                    </Modal>


                    <View>

                    </View>

                    <FlatList
                        data={filteredProducts.length ? filteredProducts : sortedData}
                        numColumns={2}
                        keyExtractor={filteredProducts.length ? filteredProducts.id : sortedData.id}
                        renderItem={renderProductList}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                </SafeAreaView>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEDEF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2E4053',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
        right: 10,
    },
    listContent: {
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginTop: 12,
    },
    card: {
        width: "45%",
        borderRadius: 8,
        margin: 10,
        marginTop: 6,
        overflow: 'hidden',
    },
    cardImageWrapper: {
        overflow: 'hidden',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 200,
        width: "100%",
    },
    cardImage: {
        height: "100%",
        width: "100%",
        borderRadius: 8,
        resizeMode: 'stretch',
        marginBottom: 10,
    },
    likeIcon: {
        position: 'absolute',
        right: "4%",
        top: "2%"
    },
    cardContent: {
        padding: 5,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
        fontFamily: getRegularFont1(),
    },
    cardDescription: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontFamily: getRegularFont1(),
    },
    pageLoadView: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    activityIndicator: {
        marginBottom: 50,
    },
    SortTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: '#333',
        fontFamily: getRegularFont1(),
    },
    sortView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonText: {
        color: '#555',
        fontWeight: '500',
        fontFamily: getRegularFont1(),
    },
    filterContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: '98%',
        bottom: 0,
        zIndex: 3,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2E4053',
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: 4,
        marginBottom: 2,
        borderRadius: 50,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '300',
        fontFamily: getRegularFont1(),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        position: 'absolute',
        bottom: 4,
        width: '100%',
        height: "40%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'flex-start',
        // Add shadow properties
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonClose: {
        position: 'absolute',
        top: 6,
        right: 6,
        padding: 5,
        borderWidth: 0.5,
        borderRadius: 30,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: getRegularFont1(),
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: getRegularFont1(),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: getRegularFont1(),
    },
    priceRangeView: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: "flex-start",
        alignSelf: "flex-start",
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    chip: {
        margin: 5,
    },
    applyButton: {
        alignSelf: 'center',
        height: 50,
        width: 100,
        paddingVertical: 5,
        borderColor: '#2E4053',
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
});

export default ProductListScreen;
// const ProductListData = {
//     "data": [
//         {
//             "id": "73",
//             "description": "Yellow traditional dress",
//             "count": "5",
//             "price": "500",
//             "image": require('../assets/EcomImages/dress4.jpeg'),
//             "parent": "0"
//         },
//         {
//             "id": "102",
//             "description": "White lace blouse",
//             "count": "4",
//             "price": "350",
//             "image": require('../assets/EcomImages/dress2.jpeg'),
//             "parent": "73"
//         },
//         {
//             "id": "104",
//             "description": "Black leather jacket",
//             "count": "3",
//             "price": "200",
//             "image": require('../assets/EcomImages/dress3.jpeg'),
//             "parent": "0"
//         },
//         {
//             "id": "105",
//             "description": "Blue floral patterned skirt",
//             "count": "8",
//             "price": "700",
//             "image": require('../assets/EcomImages/dress4.jpeg'),
//             "parent": "0"
//         },
//         {
//             "id": "106",
//             "description": "Red high-heeled shoes",
//             "count": "6",
//             "price": "450",
//             "image": require('../assets/EcomImages/dress5.jpeg'),
//             "parent": "0"
//         }
//     ]
// };