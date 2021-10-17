import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from '../components/ui/AppText'
export const Todo = ({ todo, onDelete, onOpen }) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.5}
    onPress={() => onOpen(todo.id)}
    onLongPress={() => onDelete(todo.id)}>

  <View style ={styles.todo}>
        <AppText style={styles.text}>{todo.title}</AppText>
  </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  todo: {
    flexDirection:'row',
    alignItems:'center',
    padding:15,
    borderWidth:1,
    borderColor:'lightgrey',
    borderRadius:5,
    marginBottom:5,
  }, 
  text: {
    fontSize: 16,
    padding: 5
  }

})