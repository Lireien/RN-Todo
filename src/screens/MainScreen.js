import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';

export const MainScreen = ({ addTodo, todos, deleteTodo, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  );
  useEffect(() => {
    let mounted = true;
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      if (mounted) {
        setDeviceWidth(width);
      }
    };

    const subscription = Dimensions.addEventListener('change', update);

    return function cleanUp() {
      mounted = false;
      subscription?.remove();
    };
  });

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onDelete={deleteTodo} onOpen={openTodo} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imageDiv}>
        <Image
          source={require('../../assets/empty.png')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
    );
  }
  return (
    <View>
      <AddTodo onSumbit={addTodo} />
      {content}
    </View>
  );
};
const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
