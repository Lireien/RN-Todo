import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { ScreenContext } from '../screen/screenContext';
import {
  ADD_TODO,
  CLEAR_ERROR,
  DELETE_TODO,
  FETCH_TODOS,
  HIDE_LOADER,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        'https://rn-apptodo-default-rtdb.firebaseio.com/todos.json',
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('Something get wrong :(');
    }
  };
  const deleteTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
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
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-apptodo-default-rtdb.firebaseio.com/todos/${id}.json`
            );
            dispatch({ type: DELETE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();

    try {
      const data = await Http.get(
        'https://rn-apptodo-default-rtdb.firebaseio.com/todos.json'
      );
      const todos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (err) {
      showError('Something get wrong :(');
      console.log('Error is', err);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-apptodo-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title }
      );
      await fetch(
        `https://rn-apptodo-default-rtdb.firebaseio.com/todos/${id}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch {
      showError('Something get wrong :(');
      console.log('Error is', err);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        deleteTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
