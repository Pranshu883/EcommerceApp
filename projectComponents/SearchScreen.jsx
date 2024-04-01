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
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { decode } from 'html-entities';
import RenderHTML from 'react-native-render-html';
import { CATEGORY } from '../common/webutils';

const SearchScreen = ({navigation}) => {
    const [categoryData, setCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);


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
                setCategoryData(json.data)})
            .catch(error => console.log('error', error));
    }

    const renderCategoryItem = ({ item }) => {

        const description = {
            html: decode(item.description)
        }
        const htmlStyle={
            body:{
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
                <View style={{ padding: 10 }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDescription}> 
                        <RenderHTML 
                            source={description}
                            contentWidth={100}
                            tagsStyles={htmlStyle}
                        />  
                    </Text>
                </View>
            </Pressable>
        </Card>);

    };
    const filteredCategories = categoryData.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Products..."
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>
            <FlatList
                data={filteredCategories}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEDEF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
    },
    listContent: {
        marginTop: 10,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    categoryCard: {
        borderColor: '#ccc',
        backgroundColor: 'white',
        marginHorizontal: 4,
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
        width: "48%",
        height: 250,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
        textAlign: 'left',
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
});

export default SearchScreen;
