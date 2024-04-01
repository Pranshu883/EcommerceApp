import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Pressable,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Card, Chip, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { decode } from 'html-entities';
import RenderHTML from 'react-native-render-html';
import { CATEGORY } from '../common/webutils';
import { getRegularFont1 } from '../common/utils';

const CategoryScreen = ({ navigation }) => {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredCategoryList, setFilteredCategoryList] = useState([]);


    
    useEffect(() => {
        categoryAPI();
    }, []);

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
                // console.log(json.data);
                setCategoryData(json.data)
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }

    const renderCategoryItem = ({ item }) => {

        const description = {
            html: decode(item.description)
        }
        const htmlStyle = {
            body: {
                color: 'black',
            }
        };
        let categoryId = item.id;
        let categoryName = item.name;
        return (<Card style={styles.categoryCard}>
            <Pressable onPress={() => navigation.navigate('ProductList', {
                categoryId: categoryId,
                categoryName: categoryName
            })}>
                <View style={styles.categoryImageWrapper}>
                    <Image
                        source={item.image !== '' ? { uri: item.image } : require('../assets/EcomImages/SliderImages/dressdefault.jpeg')}
                        style={styles.categoryImage}
                    />
                </View>
                <View style={{ }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
            </Pressable>
        </Card>);

    };

    // adding category name to the selected category state 
   
    const addCategory = (category)=>{
        if(!selectedCategories.includes(category)){
            setSelectedCategories(prev=>([...prev, category]));
        }
    };

    const removeCategory = (category)=>{
        if(selectedCategories.includes(category)){
            const removedList = selectedCategories.filter((item)=>(item !== category));
            setSelectedCategories(removedList);
        }
    }

    const resetCategory = () =>{
        setSelectedCategories([]);
    }

    //filtering categories based on the selected categories 

    useEffect(()=>{
        if(selectedCategories.length === 0){
            setFilteredCategoryList(categoryData);
        }else{
            setFilteredCategoryList(categoryData.filter((category)=>(selectedCategories.includes(category.name))));
        }
    },[selectedCategories, categoryData])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Categories</Text>
            </View>
            {loading ?
                <View style={styles.pageLoadView} >
                    <ActivityIndicator size="large" color="#2E4053" style={styles.activityIndicator} />
                </View>
                :
                <>
                    <ScrollView style={styles.filterView} horizontal={true}>
                        {categoryData.map((category) => (
                            <Chip key={category.id} style={[styles.chip,{backgroundColor: selectedCategories.includes(category.name) ? "#2E4053": "#E0E0E0"}]} 
                            textStyle={{color : selectedCategories.includes(category.name) ? "white" : "#444"}}
                            onPress={() => { 
                                    if(selectedCategories.includes(category.name)){
                                        removeCategory(category.name);
                                    }else{
                                        addCategory(category.name);
                                    }
                                }}>
                                {category.name}
                            </Chip>
                        ))}
                    </ScrollView>
                    <FlatList
                        data={filteredCategoryList.length ? filteredCategoryList : categoryData}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCategoryItem}
                        contentContainerStyle={styles.listContent}
                    />
                </>}
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
      paddingHorizontal: 12,
      paddingTop: 15,
      paddingBottom: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      right: "450%",
      fontFamily: getRegularFont1(),
    },
    filterView: {
      flexDirection: 'row',
      position: 'absolute',
      top: 45,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 5,
      zIndex: 3,
    },
    chip: {
      marginHorizontal: 5,
      backgroundColor: '#E0E0E0', // Change the background color as needed
    },
    listContent: {
      marginTop: 40,
      flexGrow: 1,
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    card: {
      flex: 1,
      margin: 4,
      padding: 2,
      borderRadius: 8,
      backgroundColor: '#fff',
      overflow: 'hidden',
    },
    cardImage: {
      height: 150,
      width: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      resizeMode: 'cover',
    },
    cardContent: {
      padding: 10,
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
      color: '#555',
      textAlign: 'left',
      fontFamily: getRegularFont1(),
    },
    categoryCard: {
      borderColor: '#ccc',
      backgroundColor: 'white',
      marginHorizontal: 4,
      marginBottom: 10,
      borderRadius: 8,
      overflow: 'hidden',
      width: "48%",
      marginTop: 3,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
      fontFamily: getRegularFont1(),
    },
    categoryImageWrapper: {
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: 150,
    },
    categoryImage: {
      height: "75%",
      width: '100%',
      resizeMode: 'contain',
    },
    pageLoadView: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    activityIndicator: {
      marginBottom: 50,
    }
  });
  

export default CategoryScreen;
