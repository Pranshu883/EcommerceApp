import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const ReadMoreText = ({ initialText, expandedText }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={expanded ? undefined : 2} style={styles.description}>
        {expanded ? expandedText : initialText}
      </Text>
      {initialText.length > 100 && (
        <Pressable onPress={toggleExpanded}>
          <Text style={styles.readMore}>{expanded ? 'Read Less' : 'Read More'}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  description: {
    color:'black',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 5,
  },
  readMore: {
    color: 'black',
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});

export default ReadMoreText;
