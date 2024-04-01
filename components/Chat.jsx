import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const Chat = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if(title.trim() !== "" && body.trim() !== ""){
      fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 5,
          id: 101,
          title: title,
          body: body,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    }
    else{
        Alert.alert("The input feilds are empty !!")
    }
    
  }, [submit]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chat page</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />

      <TextInput
        label="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        style={styles.input}
      />
        
      <Button
        mode="contained"
        onPress={() => {setSubmit(!submit)}}
        style={styles.postButton}
      >
        Post
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    color: "black",
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  postButton: {
    width: "50%",
  },
});

export default Chat;
