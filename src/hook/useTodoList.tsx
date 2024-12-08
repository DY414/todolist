import { useState } from 'react';
import { TodoItemType, todoListState } from '../atom/todoAtom';
import { useRecoilState } from 'recoil';

export const useTodoActions = () => {
  const [todoList, setTodoList] = useRecoilState<TodoItemType[]>(todoListState);

  const addHandler = (text: string) => {
    if ( !text  ) return;

    if ( text.length > 20 ) {
      alert(`'할 일'은 20글자를 넘길 수 없습니다.\n(현재: ${text.length}글자 입니다.)`);
      return;
    }

    const unDoneTodoCount = todoList.filter( todoItem => !todoItem.done ).length;
    if ( unDoneTodoCount >= 10 ) {
      alert(`처리가 안된 '할 일'은 10개를 넘을 수 없습니다.\n(현재: ${unDoneTodoCount}개 입니다.)`);
      return;
    }

    setTodoList( prev => prev.concat({id: 4, text, done: false}));
  } 

  const deleteHandler = (item: TodoItemType) => {
    setTodoList( prev => prev.filter( todoItem => todoItem.id !== item.id ))
  };

  const checkHandler = (item: TodoItemType) => {
    setTodoList( prev => prev.map( todoItem => 
      todoItem.id === item.id 
        ? {...todoItem, done: !todoItem.done} 
        : todoItem ) )
  };

  return {
    addHandler,
    deleteHandler,
    checkHandler,
  };
};
