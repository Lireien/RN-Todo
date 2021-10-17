import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

async function loadApplication() {
  await Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const deleteTodo = (id) => {
    const todo = todos.find((e) => e.id === id);
    Alert.alert(
      'Delete Todo',
      `Are you really want remove "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'negative',
        },
        {
          text: 'Delete',
          onPress: () => {
            setTodoId(null);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onDelete={deleteTodo}
        onSave={updateTodo}
      />
    );
  }
  return (
    <View>
      <Navbar title="TodoApp" />
      <View style={styles.content}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal:THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
