import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)


  // const deleteTodo = (id) => {
  //   const todo = todos.find((e) => e.id === id);
  //   Alert.alert(
  //     'Delete Todo',
  //     `Are you really want remove "${todo.title}"?`,
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'negative',
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: () => {
  //           setTodoId(null);
  //           setTodos((prev) => prev.filter((todo) => todo.id !== id));
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View>
      <Navbar title="TodoApp" />
      <View style={styles.content}>{ todoId ? <TodoScreen/> : <MainScreen/>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
