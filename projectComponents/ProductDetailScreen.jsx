import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions, Modal, TouchableOpacity, TextInput, Alert, ToastAndroid, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReadMoreText from "../common/ReadMore";
import RenderHTML from "react-native-render-html";
import { Badge, Button, FAB, IconButton } from "react-native-paper";
import ImageViewer from 'react-native-image-zoom-viewer';
import { CUSTOMERID, FIRST_NAME, getSession } from "../common/LocalStorage";
import { ADD_TO_CART, MAIN_URL, PRODUCT_DETAIL, REVIEW } from "../common/webutils";
import { decode } from "html-entities";
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { addProducts, addWishListProducts, createTable, deleteWishListProduct, getDBConnection, getProducts } from "../db/db";
import { useIsFocused } from "@react-navigation/native";
import { APP_NAME } from "../common/string";
import { getRegularFont1 } from "../common/utils";





// Define HTML content for the list
const list = {
    html:
        `<ul>
            <li style="color:#555"> <b>Care Instructions:</b> Dry clean only</li>
            <li style="color:#555">  <b>Size Guide:</b> Refer to chart for fit.</li>
            <li style="color:#555">  <b>Material:</b> Durable synthetic blend.</li>
            <li style="color:#555">  <b>Warranty:</b> Covers manufacturing defects.</li>
            <li style="color:#555">  <b>Usage Tips:</b> Perfect for running, training, and daily wear; avoid extreme heat or moisture.</li>
        </ul>`
};

// Initial and expanded descriptions for the product
const initialDescription = "The black sports shoe is designed for athletes and fitness enthusiasts seeking performance and style. Its sleek design and lightweight construction provide optimal comfort and support during workouts, runs, and other physical activities. With a breathable mesh upper and cushioned midsole, this shoe offers excellent ventilation and shock absorption. Whether you're hitting the gym or pounding the pavement, the black sports shoe delivers on both performance and aesthetics.";
const expandedDescription = "Engineered with cutting-edge technology and premium materials, this shoe offers unrivaled comfort, support, and durability. Its lightweight design and flexible construction allow for natural movement and agility, enhancing your performance during intense workouts and training sessions. Whether you're sprinting on the track, lifting weights in the gym, or tackling rugged terrain, the black sports shoe provides the confidence and support you need to reach your fitness goals.";


// enablePromise (true);


// Component for the product detail screen
const ProductDetailScreen = ({navigation, route }) => {


    // useEffect(() => {
    //     // var db = openDatabase({ name: 'local_db.db', location: "default" });

    //     // db.executeSql(
    //     //     'CREATE TABLE IF NOT EXISTS check_level_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, lastlevel INT(20))',
    //     //     []
    //     // );

    //     // });
    //     // console.log("created table");
    //     getdta()

    // }, []);






    // State variables
    const [selectedSize, setSelectedSize] = useState(8);
    const [selectedColor, setSelectedColor] = useState(null);
    const [currentRating, setCurrentRating] = useState(null);
    const [qty, setQty] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [customerId, setCustomerId] = useState('');


    const [productDetail, setProductDetail] = useState([]);
    const [productName, setProductName] = useState('');
    const [productRating, setProductRating] = useState('');
    const [productReview, setProductReview] = useState('');
    const [productStock, setProductStock] = useState('');
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState(false);
    const [ isAdded, setIsAdded] = useState(false);
    const [cartLength, setCartLength] = useState();


    const { productId } = route.params || {}; // Destructure with default value
    // console.log('product ID is ', productId);


    // Fetch data function to get user's name
    const fetchData = async () => {
        const fetchedName = await getSession(FIRST_NAME);
        const fetchedCustomerId = await getSession(CUSTOMERID);


        setName(fetchedName);
        setCustomerId(fetchedCustomerId);
    }


    useEffect(() => {
        ProductDetailAPI();
        fetchData();
        getCartLength();
    }, []);

    

    const ProductDetailAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "OCSESSID=2f51f8de55c2702c773c8795c7; currency=USD; language=en-gb");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`https://flutterapp.alakmalak.ca/index.php?route=extension/mstore/product_detail&product_id=${productId}`, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setProductName(json.data[0].name);
                setProductRating(json.data[0].rating);
                setProductReview(json.data[0].reviews);
                setProductDetail(json.data[0]);
            })
            .catch((error) => console.error(error));
    }
   // Function to add product to cart via API call
    const addToCartAPI = () => {
        // Define headers and request options for the API call
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=26e5b31814199421eaffdcf0e0; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "cart": [
                {
                    "product_id": productId,
                    "quantity": qty,
                    "option": []
                }
            ],
            "customer_id": customerId,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Perform the fetch operation
        fetch("https://flutterapp.alakmalak.ca/index.php?route=extension/mstore/cart/add", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    //Function to handle adding the product to the cart

    const loadDataCallBack = useCallback(async () => {
        try {
            
            const db = await getDBConnection();
            await createTable(db);

            const storedProducts = await getProducts(db, customerId);
            storedProducts.forEach((product)=>{
                if(product.product_id == productId){
                    setIsAdded(true);
                }else{
                    setIsAdded(false);
                }
            })
            if (storedProducts.length) {
                setProducts(storedProducts);
            } 
        } catch (error) {
            console.error(error);
        }
    }, []);

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            loadDataCallBack();
        }
        
    }, [isFocused]);


    const addToCart = async () => {
        const db = await getDBConnection();
        const productInfo = [{

            "product_id": productId,
            "product_name": productDetail.name,
            "product_img": productDetail.image,
            "product_price": productDetail.price,
            "product_qty": qty,
            "customer_id": customerId,
        }];
        try {
            await addProducts(db, productInfo);
            ToastAndroid.showWithGravity('Added to the Cart !', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } catch (error) {
            console.error(error);
        }

    }

    const removeItem=async()=>{
        try{
            const db =await getDBConnection();
            await deleteWishListProduct(db, productId);
        }catch(error){
            console.log(error);
        }
        
    }

    const addToList = async () => {
        console.log("Add to tabe Called ");
        const db = await getDBConnection();

        const productInfo = [{

            "product_id": productId,
            "product_name": productDetail.name,
            "product_img": productDetail.image,
            "product_price": productDetail.price,
            "customer_id": customerId,
        }];
        try {
            await addWishListProducts(db, productInfo);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToWishList = () => {

        setLikedProducts(!likedProducts);

        likedProducts ? removeItem(productId) :addToList() ;

    }



    const handleAddToCart = () => {

        if(isAdded){
            Alert.alert(APP_NAME,'Item already added !');
            loadDataCallBack();
        }else{
        addToCart();
        addToCartAPI();
        setIsAdded(true);
        getCartLength();
    }
    }

    // Function to increment the quantity
    const qtyIncrement = () => {
        setQty(qty => qty + 1)
    };

    // Function to decrement the quantity
    const qtyDecrement = () => {
        qty <= 1 ? setQty(1) :
            setQty(qty => qty - 1)
    };

    // Function to handle selecting a size
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Function to handle selecting a color
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    // Function to handle rating selection
    const handleRating = (star) => {
        setCurrentRating(star);
    }

    // Function to submit the product review via API call
    const productReviewAPI = () => {
        // Define headers and request options for the API call
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=4b648f831c6e3bf7f47e2bb38c; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "product_id": productId,
            "name": "test12",
            "text": review,
            "rating": currentRating,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Perform the fetch operation
        fetch(REVIEW, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                if(json.success == 1){
                    Alert.alert(APP_NAME,'Review submitted');
                    setCurrentRating(null);
                    setReview('');
                }
            })
            .catch((error) => console.error(error));
    }

    // Function to handle review submission
    const handleReviewSubmit = () => {
        // Check if rating and review are provided
        if (currentRating == null || currentRating < 1) {
            Alert.alert(APP_NAME,'You have to Select a rating to submit the review');
        } else if (review == '') {
            Alert.alert(APP_NAME,'Please write a review to submit');
        } else {
            productReviewAPI();
        }
    }



    const handleZoom = () => {

        setModalVisible(true)
    };
    // Define an array of images with URLs
    const images = [
        {
            url: productDetail.image
        }
    ];
    const descriptionStyle = {
        body: {
            fontFamily: 'Arial',
            padding: 10,
            lineHeight: 20, // Adjusted line height
            color: '#555',
            marginVertical: 10,
        },
        p: {
            marginBottom: 10, fontSize: 12, // Decreased font size
        },
        span: {
            fontSize: 12,
        },
        b: {
            fontWeight: 'bold',
        },
    };



    const getCartLength=async () => {
        try {
    
          const db = await getDBConnection();
            const fetchedCustomerId = await getSession(CUSTOMERID);
    
          const storedProducts = await getProducts(db, fetchedCustomerId);
          const currentLength = storedProducts.length;
          console.log('items in cart : ',currentLength);
            setCartLength(currentLength);

    
        } catch (error) {
          console.error(error);
        }
      };



    return (
        <SafeAreaView><View style={styles.header}>
                
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon name="cart" size={24} color="#E70038" />
                        <Badge style={styles.badge} size={16}  >{cartLength}</Badge>
                    </TouchableOpacity>
              
            </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Image slider */}
            {/* <ImageSlider images={{uri: productDetail.images}} /> */}
           
            <View style={[styles.imageView, { width: windowWidth }]}>

            

                <Pressable onPress={() => handleZoom()}>
                    <Image source={{ uri: productDetail.image }} style={[styles.bgImage, { width: windowWidth }]} />
                </Pressable>
            </View>
            <Modal visible={modalVisible} transparent={false} animationType="slide" presentationStyle="pageSheet">
                <View style={styles.modalContent}>
                    <IconButton
                        onPress={() => setModalVisible(false)}
                        icon="close"
                        mode="outlined"
                        style={styles.closeButton}
                        size={20}
                        iconColor="white"
                    />
                    <ImageViewer
                        imageUrls={images}
                        enableSwipeDown={true}
                        renderIndicator={(currentIndex, allSize) => (
                            <Text style={styles.imageIndicator}>{`${currentIndex} / ${allSize}`}</Text>
                        )}
                        index={0} // Start viewing from the first image
                        style={styles.imageViewer}
                    />
                </View>
            </Modal>
            {/* Product title and information */}
            <View style={styles.titleView}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}> {productDetail.name} </Text>
                    <TouchableOpacity style={styles.likeIcon} >
                        <Icon
                            name={likedProducts ? "heart" : "heart-outline"}
                            size={26}
                            color={likedProducts ? "#E70038": "#333"}
                            onPress={() => { handleAddToWishList() }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.titleText2}> {productDetail.stock_status} </Text>
                    <Text style={styles.titleText2}> <Icon name="star" size={19} color='#E74C3C' /> {productDetail.rating} ({productDetail.reviews} reviews) </Text>
                </View>
            </View>

            <View style={styles.titleView}>
                <Text style={styles.descriptionText}> Description </Text>

                <RenderHTML
                    contentWidth={100}
                    tagsStyles={descriptionStyle}
                    ignoreUnknownTags={true}
                    source={{ html: decode(productDetail.description) }}
                />
                {/* <ReadMoreText initialText={initialDescription} expandedText={expandedDescription} /> */}
            </View>


            {/* Review section */}
            <View style={styles.reviewView}>
                <Text style={styles.reviewTitle}> Leave a Review </Text>
                <View style={styles.ratingView}>
                    <Text style={styles.ratingTitle}> Rate the product: </Text>
                    <View style={styles.ratings}>
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleRating(star)}
                                style={{ marginHorizontal: 5 }}
                            >
                                <Icon
                                    name="star"
                                    size={28}
                                    color={star <= currentRating ? '#E74C3C' : '#C0C0C0'}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {/* Review input */}
                <View style={styles.reviewInputView}>
                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Write your review here..."
                        placeholderTextColor="#A9A9A9"
                        textAlignVertical="top"
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={setReview}
                        value={review}
                    />
                    {/* Submit button */}
                    <FAB
                        style={styles.submitReview}
                        mode="flat"
                        color="white"
                        label="submit"
                        onPress={() => handleReviewSubmit()}
                    />
                </View>
            </View>
            <View style={{height: 0.25 * windowHeight}} />
            </ScrollView>
            {/* Cart section */}{ (productDetail.stock_status == "In Stock") &&
            <View style={styles.cartView}>
                
                
                {/* Price and quantity */}
                <View style={styles.priceView}>
                    <Text style={styles.descriptionText}>Price: {productDetail.price}  </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                        {/* Quantity decrement button */}
                        <IconButton
                            mode='outlined'
                            icon="minus"
                            size={12}
                            style={{ borderRadius: 0 }}
                            onPress={qtyDecrement}
                        />
                        <Text style={{ color: "black" }}> {qty} </Text>
                        {/* Quantity increment button */}
                        <IconButton
                            mode='outlined'
                            icon="plus"
                            size={12}
                            style={{ borderRadius: 0 }}
                            onPress={qtyIncrement}
                        />
                    </View>
                </View>
                {/* Add to cart button */}
                <View>
                    {isAdded ? 
                        <FAB
                        style={styles.cartButton}
                        disabled={true}
                        color="white"
                        icon="cart"
                        label="Added"
                        onPress={() => handleAddToCart()}
                    /> :  <FAB
                            style={styles.cartButton}
                            color="white"
                            icon="cart"
                            label="Add To Cart"
                            onPress={() => handleAddToCart()}
                        />
                       
                    }
                    
                </View>
            </View>}

        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBEDEF',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#2E4053',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 12,
        position: 'absolute',
        width: "100%",
        zIndex: 1,
        top: 0,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    imageView: {
        justifyContent: 'center',
        height: 450,
    },
    bgImage: {
        height: "100%",
        width: '100%',
        resizeMode: 'stretch'
    },
    productImage: {

    },
    titleView: {
        marginHorizontal: 10,
        marginTop: 5,
        padding: 8,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: 'silver',
    },
    titleText: {
        color: 'black',
        fontWeight: "400",
        fontSize: 20,
        marginBottom: 4,
        fontFamily: getRegularFont1(),
    },
    titleText2: {
        color: "black",
        fontSize: 13,
        padding: 5,
        marginHorizontal: 8,
        borderRadius: 12,
        backgroundColor: '#D0D3D4',
        fontFamily: getRegularFont1(),
    },
    descriptionText: {
        color: "black",
        fontSize: 18,
        fontWeight: "400",
        fontFamily: getRegularFont1(),
    },
    optionView: {
        padding: 8,
        paddingBottom: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 5,
    },
    optionItemView: {
        display: 'flex',
        flexDirection: "row",
        paddingTop: 10,
    },
    optionButtons1: {
        color: 'black',
        opacity: 0.9,
        borderColor: 'black',
        borderWidth: 1,
        height: 45,
        width: 45,
        borderRadius: 40,
        padding: 10,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartView: {
        backgroundColor: "white",
        position: 'sticky',
        bottom: 0,
        marginTop: 5,
        padding: 15,
        paddingBottom: 15,
        width: '100%',
        // height: '20%',
        position: 'absolute',
    },
    priceView: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    cartButton: {
        position: 'relative',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#E70038',
        opacity: 0.8,
        borderRadius: 20,
    },
    slider: {
        height: 350,
    },
    navigation: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 0,
        top: "45%",
    },
    navButton: {
        padding: 10,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    paginationActiveText: {
        color: "black",
        margin: 3,
    },
    paginationInactiveText: {
        color: "grey",
        margin: 3,
    },
    reviewView: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
        paddingTop: 25,
        paddingBottom: 15,
        borderColor: 'silver',
        borderRadius: 9,
    },
    reviewTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: getRegularFont1(),
    },
    ratingView: {
        alignItems: 'center',
        marginVertical: 10,
    },
    ratingTitle: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: getRegularFont1(),
    },
    ratings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewInputView: {
        width: '100%',
        alignItems: 'center',
    },
    reviewInput: {
        height: 140,
        width: '100%',
        marginVertical: 10,
        padding: 12,
        color: 'black',
        backgroundColor: '#EBEDEF',
        borderColor: '#C0C0C0',
        borderRadius: 3,
        fontSize: 16,
        fontFamily: getRegularFont1(),
    },
    submitReview: {
        position: 'relative',
        margin: 10,
        backgroundColor: '#5499C7',
        borderRadius: 5,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    imageViewer: {
        width: '100%', // Set width to 100% to fill the container
        height: '100%', // Set height to 100% to fill the container
    },
    imageIndicator: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: 'white',
        fontSize: 16,
        fontFamily: getRegularFont1(),
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    likeIcon: {
        position: "relative",
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7,
        marginVertical: 2,
    },
    badge: {
        position: 'absolute',
        top: -7,
        right: -8,
        backgroundColor: '#E70038',
    }

});

const htmlStyle = {
    li: {
        fontSize: '16',
        fontWeight: '400',
        fontFamily: getRegularFont1(),
    },
};




// // Component for the image slider
// const ImageSlider = ({ images }) => {
//     // State variables and ref

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const flatListRef = useRef();

//     // Function to handle moving to the previous image
//     const handlePrev = () => {
//         const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//         setCurrentIndex(newIndex);
//         flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
//     };

//     // Function to handle moving to the next image
//     const handleNext = () => {
//         const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
//         setCurrentIndex(newIndex);
//         flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
//     };

//     // Function to handle zooming an image
//     const handleZoom = (item) => {
//         setCurrentIndex(images.findIndex(img => img.id === item.id));
//         setModalVisible(true)
//     };

//     // Function to render each item in the image slider
//     const renderItem = ({ item }) => (
//         <View style={[styles.imageView, { width: windowWidth }]}>
//             <Pressable onPress={() => handleZoom()}>
//                 <Image source={{uri: productDetail.image}} style={[styles.bgImage, { width: windowWidth }]} />
//             </Pressable>
//         </View>
//     );

//     return (
//         <View style={{ position: "relative" }}>
//             <FlatList
//                 data={images}
//                 style={styles.slider}
//                 horizontal={true}
//                 pagingEnabled
//                 ref={flatListRef}
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//                 onScroll={(event) => {
//                     const slideSize = event.nativeEvent.layoutMeasurement.width;
//                     const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
//                     setCurrentIndex(index);
//                 }}
//             />
//             {/* Navigation buttons */}
//             <View style={styles.navigation}>
//                 <Pressable style={styles.navButton} onPress={handlePrev}>
//                     <Icon name="chevron-left" size={38} color="grey" />
//                 </Pressable>
//                 <Pressable style={styles.navButton} onPress={handleNext}>
//                     <Icon name="chevron-right" size={38} color="grey" />
//                 </Pressable>
//             </View>
//             {/* Pagination indicators */}
//             <View style={styles.pagination}>
//                 {productDetail.images.map((_, index) => (
//                     <Text key={index} style={index === currentIndex ? styles.paginationActiveText : styles.paginationInactiveText}>
//                         ⬤
//                     </Text>
//                 ))}
//             </View>
//             {/* Modal for image zoom */}
//             <Modal visible={modalVisible} transparent={true}>
//                 <IconButton onPress={() => setModalVisible(false)}
//                     icon="close"
//                     mode="outlined"
//                     style={{ borderColor: 'white', position: 'absolute', zIndex: 3, right: "5%", top: '10%' }}
//                     size={20}
//                     iconColor="white" />
//                 <ImageViewer
//                     imageUrls={images}
//                     index={currentIndex}
//                     enableSwipeDown={true}
//                 />
//             </Modal>
//         </View>
//     );
// };



{/* <View style={styles.titleView}>
                    <Text style={styles.descriptionText}> Additional Info:  </Text>
                    <RenderHTML
                        source={list}
                        contentWidth={300}
                        tagsStyles={htmlStyle}
                    />
                </View> */}
{/* Size and color options */ }
{/* <View style={[styles.titleView, { display: "flex", flexDirection: "column", borderBottomWidth: 0 }]} >
                    <View style={styles.optionView}>
                        <Text style={styles.descriptionText}>Size</Text>
                        <View style={styles.optionItemView}>
                            {[8, 9, 10, 11].map((size, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleSizeSelect(size)}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? 'black'
                                                : selectedSize === size
                                                    ? 'black'
                                                    : 'white',
                                        },
                                        styles.optionButtons1,
                                    ]}>
                                    <Text
                                        style={[
                                            {
                                                color: selectedSize === size ? 'white' : 'black',
                                                fontWeight: '300',
                                                fontSize: 14,
                                            },
                                        ]}>
                                        {size}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={styles.descriptionText}>Color</Text>
                        <View style={styles.optionItemView}>
                            {['maroon', 'black', 'lightblue', 'green'].map((color, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleColorSelect(color)}
                                    style={({ pressed }) => [styles.optionButtons1,
                                    {
                                        backgroundColor: color,
                                        borderRadius: 40,
                                        padding: 8,
                                        borderWidth: 0,
                                        borderColor: 'black',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },

                                    ]}>
                                    {selectedColor === color && <Icon name="check" size={20} color="white" />}
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View> */}