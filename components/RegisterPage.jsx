import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import { useState } from 'react';


const RegisterPage = ({navigation}) =>{


    const [text, onChangeText] = useState('');
    const [email, onChangeEmail] = useState('Email');
    const [number, onChangeNumber] = useState();
    const [password, onChangepPassword] = useState('');

    function submit(){
        alert("Submitted");
    }

    const handleEmailValidation = () => {
        const emailRegex = /\S+@\S+\.\S+/; 
    
        if (emailRegex.test(email)) {
            navigation.navigate('Home', {nameInput:text,
            emailInput: email,
            numberInput: number,
            passwordInput:password,
            });
        } else {
          alert('Error', 'Please enter a valid email address');
        }
      };

    return(
        <SafeAreaView >
            
                <View style={styles.container}>
                    <Text style = {{color:"black", fontSize:15, fontWeight:"700"}}>Register Here!</Text>

                    <TextInput 
                        style ={styles.input}
                        onChangeText={onChangeText} 
                        value={text}
                        placeholder='Name'
                        placeholderTextColor='grey'
                    /> 
                    <TextInput 
                        style ={styles.input}
                        onChangeText={onChangeEmail} 
                        value={email}
                        keyboardType='email-address'
                        placeholder='Email'
                        placeholderTextColor='grey'
                    /> 
                     <TextInput 
                        style ={styles.input}
                        onChangeNumber={onChangeNumber} 
                        value={number}
                        keyboardType='numeric'
                        placeholder='Mobile'
                        placeholderTextColor='grey'
                    /> 

                    <TextInput
                        style ={styles.input}
                        onChangeText={onChangepPassword}
                        value={password}
                        secureTextEntry = {true}
                        placeholder='Password'
                        placeholderTextColor='grey'
                    />
                    <Button
                        style={styles.button}
                        title="Register"
                        onPress={handleEmailValidation}
                    />
                </View>
        </SafeAreaView>
    );
}

 const styles = StyleSheet.create({
    container:{
        
        display: "flex",
        height: 300,
        padding: 10,
        marginLeft:90,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        width: '50%',
        heigth: '50%',
        color: 'black',
        backgroundColor: 'lightblue',
    },
    input:{
        height: 40,
        margin: 7,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10, 
        color: 'black', 
        backgroundColor: 'white',
    },
    button:{
        height: 25,
        width: 150,
        borderRadius: 4,
        right: 2,
    },

 })

 

export default RegisterPage;