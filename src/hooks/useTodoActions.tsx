import { useRecoilState } from 'recoil';
import { idCounterState, TodoItemType, todoListState } from '../atom/todoAtom';

export const useTodoActions = () => {
  const [todoList, setTodoList] = useRecoilState<TodoItemType[]>(todoListState);
  const [idCounter, setIdCounter] = useRecoilState(idCounterState);

  const undoneTodos = todoList.filter( todoItem => !todoItem.done )

  const addHandler = (text: string) => {
    if ( !text  ) return;

    if ( text.length > 20 ) {
      alert(`'할 일'은 20글자를 넘길 수 없습니다.\n(현재: ${text.length}글자 입니다.)`);
      return;
    }

    if ( undoneTodos.length >= 10 ) {
      alert(`처리가 안된 '할 일'은 10개를 넘을 수 없습니다.\n(현재: ${undoneTodos.length}개 입니다.)`);
      return;
    }

    setTodoList( prev => prev.concat({id: idCounter + 1, text, done: false}));
    setIdCounter( prev => prev + 1);
  } 

  const deleteHandler = (item: TodoItemType) => {
    setTodoList( prev => prev.filter( todoItem => todoItem.id !== item.id ))
  };

  const checkHandler = (item: TodoItemType) => {
    if ( item.done && undoneTodos.length >= 10 ) {
      alert(`처리가 안된 '할 일'은 10개를 넘을 수 없습니다.\n(현재: ${undoneTodos.length}개 입니다.)`);
      return;
    }
    
    setTodoList( prev => prev.map( todoItem => 
      todoItem.id === item.id 
        ? {...todoItem, done: !todoItem.done} 
        : todoItem ) )
  };

  return {
    todoList,
    addHandler,
    deleteHandler,
    checkHandler,
  };
};
