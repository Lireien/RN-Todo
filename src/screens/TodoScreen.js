import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/Card';
import { THEME } from '../theme';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
  const { todos, updateTodo, deleteTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find((t) => t.id === todoId);

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title)
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.cardTitle}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttonCont}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.RED_COLOR} onPress={() => deleteTodo(todo.id)}>
            <AntDesign name="delete" size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  cardTitle: {
    fontSize: 22,
  },
  card: {
    marginBottom: 30,
    padding: 15
  },
});
