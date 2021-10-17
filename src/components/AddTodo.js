import React, {useState}from "react";
import {View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { THEME } from "../theme";

export const AddTodo = ({ onSumbit }) => {
const [value, setValue] = useState('')

const pressHandler = () => {
  if (value.trim()) {
    onSumbit(value)
    setValue('')
    Keyboard.dismiss()
  } else {
    Alert.alert('You didn`t write anything')
  }
    
}
  return (
    <View style={styles.block}>
      <TextInput 
      style={styles.input}
      onChangeText={text => setValue(text)}
      value={value}
      placeholder='What should you do?'
      autoCorrect={false}
        
      />
      <AntDesign.Button onPress={pressHandler} name="plussquareo">
        Add todo
      </AntDesign.Button>
      </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.NAV_COLOR,
  }
})