import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductList } from "./productListSlice";
import { Text, View } from "react-native";

export const AddProductList = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        productListAPI();
    }, []);

    const productListAPI = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Cookie", "OCSESSID=e2b8aae0fcf80a31092d3e969e; currency=USD; language=en-gb");
    
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
    
            const response = await fetch("https://flutterapp.alakmalak.ca/index.php?route=extension/mstore/product&category=81", requestOptions);
            const json = await response.json();
    
            if (json) {
                dispatch(addProductList(json.data));
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    return(
        <View>
            <Text style={{color: "black"}}>
                Adding ProductList
            </Text>
        </View>
    )
}