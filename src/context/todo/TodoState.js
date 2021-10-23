import React, { useReducer, useContext } from 'react';
import { ScreenContext } from '../screen/screenContext';
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [{ id: '1', title: 'Выучить React Native' }],
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title });

  const deleteTodo = (id) => {
    changeScreen(null);
    dispatch({ type: DELETE_TODO, id });
  };
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
