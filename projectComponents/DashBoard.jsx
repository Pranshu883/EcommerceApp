import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  FlatList, ScrollView, Image, TouchableOpacity, Pressable, Alert, BackHandler, ActivityIndicator
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { decode } from 'html-entities';
import RenderHTML from 'react-native-render-html';
import { CATEGORY } from '../common/webutils';
import { APP_NAME } from '../common/string';
import MyDrawer from './MyDrawer';
import { getRegularFont1 } from '../common/utils';




const images = [
  { id: '1', img: require('../assets/EcomImages/headerSlide1.jpeg') },
  { id: '2', img: require('../assets/EcomImages/headerSlide2.jpeg') },
  { id: '3', img: require('../assets/EcomImages/headerSlide3.jpeg') },
  { id: '4', img: require('../assets/EcomImages/headerSlide4.jpeg') },
];

const shoesImages = [
  { id: '1', img: require('../assets/EcomImages/shoeSlide1.jpeg') },
  { id: '2', img: require('../assets/EcomImages/shoeSlide2.jpeg') },
  { id: '3', img: require('../assets/EcomImages/shoeSlide3.jpeg') },
  { id: '4', img: require('../assets/EcomImages/shoeSlide4.jpeg') },
];

const accessories = [
  { id: '1', img: require('../assets/EcomImages/accessories1.jpeg') },
  { id: '2', img: require('../assets/EcomImages/accessories2.jpeg') },
  { id: '3', img: require('../assets/EcomImages/accessories3.jpeg') },
  { id: '4', img: require('../assets/EcomImages/accessories4.jpeg') },
]

const DashBoard = ({ navigation }) => {

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const flatListRef = useRef(null);



  useEffect(() => {
    categoryAPI();

  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (Math.round(scrollX._value / windowWidth) + 1) % images.length;
      scrollToIndex(newIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= images.length) {
      return;
    }
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  // category list api call
  const categoryAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "OCSESSID=e90d035ba70c2968afce0e5a4a; currency=INR; language=en-gb");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CATEGORY, requestOptions)
      .then(response => response.json())
      .then(json => {
        setCategoryData(json.data);
        setLoading(false);

      })
      .catch(error => console.log('error', error));
  }

  const CategorySlide = ({ data, navigation, parentId }) => {


    const renderItem = ({ item }) => {
      let categoryId = item.id
      let categoryName = item.name
      // console.log(categoryId);
      return (
        <>
        {
          (item.parent === parentId) &&
          (
              <Card style={[styles.categoryCard, { width: windowWidth / 2, }]}>
                <Pressable onPress={() => navigation.navigate('ProductList', {
                  categoryId: categoryId,
                  categoryName: categoryName,
                })}>
                  <View style={styles.categoryImageWrapper}>
                    <Image
                      source={item.image !== '' ? { uri: item.image } : require('../assets/EcomImages/SliderImages/dressdefault.jpeg')}
                      style={styles.categoryImage}
                    />
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>

                  </View>
                </Pressable>
              </Card>

          )
        }
        </>)
    };
    return (
      <FlatList
        style={styles.listView}
        data={data}
        horizontal
          
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    );
  };

  // const CardSlide = ({ data }) => {
  //   const renderItem = ({ item }) => (
  //     <Card style={styles.card}>
  //       <Pressable onPress={() => { navigation.navigate('ProductDetail') }} >
  //         <Image source={item.img} style={styles.cardImage} />
  //       </Pressable>
  //     </Card>
  //   );
  //   return (
  //     <FlatList
  //       style={styles.listView}
  //       data={data}
  //       horizontal={true}
  //       showsHorizontalScrollIndicator={false}
  //       keyExtractor={(item) => item.id}
  //       renderItem={renderItem}
  //     />
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="view-headline" size={28} color="white" style={{ left: 0 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Store</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="magnify" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* end of header */}


      {/* { loading ? 
            <View style={styles.pageLoadView} > 
                <ActivityIndicator size="large" color="#2E4053" style={styles.activityIndicator} />
            </View>
               : <> */}
      {/* banner */}
      <View style={{}}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={[styles.bannerWrapper, { width: windowWidth, }]}>
              <Image source={item.img} style={styles.imageBackground} />
            </View>
          )}
          onScroll={(!loading) && Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ], { useNativeDriver: false })}
          scrollEventThrottle={1}
        />
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
          })}
        </View>
      </View>
      {/* end of banner */}
      <View style={styles.menuView}>
        <View style={styles.menuItems}>
          <Pressable style={styles.itemTitle} onPress={() => {}} >
            <Text style={styles.titletext} icon=""> For Men</Text>
            {/* <Icon name='chevron-right' size={28} color="black" /> */}
          </Pressable>

          <CategorySlide data={categoryData} navigation={navigation} parentId={"81"} />
        </View>

        <View style={styles.menuItems}>
          <Pressable style={styles.itemTitle} onPress={() => {}} >
            <Text style={styles.titletext} icon=""> For Women</Text>
            {/* <Icon name='chevron-right' size={28} color="black" /> */}
          </Pressable>

          <CategorySlide data={categoryData} navigation={navigation} parentId={"82"} />
        </View>

        <View style={styles.menuItems}>
          <Pressable style={styles.itemTitle} onPress={() => {}} >
            <Text style={styles.titletext} icon=""> For Girls</Text>
            {/* <Icon name='chevron-right' size={28} color="black" /> */}
          </Pressable>

          <CategorySlide data={categoryData} navigation={navigation} parentId={"83"} />
        </View>

        {/* <View style={styles.menuItems}>
          <Pressable style={styles.itemTitle} onPress={() => {}} >
            <Text style={styles.titletext} icon=""> Boys</Text>
          
          </Pressable>

          <CategorySlide data={categoryData} navigation={navigation} parentId={"84"}  />
        </View> */}
        
        {/* <View style={styles.menuItems}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titletext}> Shoes </Text>
                    </View>
                    <CardSlide data={shoesImages} />
                </View>
                <View style={styles.menuItems}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titletext}> Accessories </Text>
                    </View>
                    <CardSlide data={accessories} />
                </View> */}
      </View>
      {/* </>} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E4053',
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: getRegularFont1(),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E8E8',
    marginBottom: 40,
    fontFamily: getRegularFont1(),
  },
  bannerWrapper: {
    height: 200,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    aspectRatio: 1.3,
    backgroundColor: '#2E4053',
  },
  imageBackground: {
    resizeMode: 'contain',
    height: "100%",
    width: '100%',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: getRegularFont1(),
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuView: {
    borderWidth: 0,
    paddingVertical: 10,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 2,
    marginHorizontal: 13,
  },
  menuItems: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#E5E8E8',
  },
  titletext: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: getRegularFont1(),
  },
  listView: {
    flex: 1,
    flexGrow: 0,
    margin: 5,
    padding: 5,
  },
  card: {
    flex: 1,
    margin: 7,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    width: 200,
    resizeMode: 'cover',
  },

  categoryCard: {
    borderColor: '#ccc',
    backgroundColor: "white",
    marginHorizontal: 8,
    marginBottom: 5,
    borderRadius: 8,
    overflow: 'hidden',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    fontFamily: getRegularFont1(),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
   
    color: 'black',
    textAlign: 'center',
    fontFamily: getRegularFont1(),
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    fontFamily: getRegularFont1(),
  },
  categoryImageWrapper: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#F4F6F7',
  },
  categoryImage: {
    height: "75%",
    width: '50%',
    resizeMode: 'contain',
  },
  pageLoadView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 700
  },
  activityIndicator: {
    marginBottom: 50,
  }
});

export default DashBoard;
