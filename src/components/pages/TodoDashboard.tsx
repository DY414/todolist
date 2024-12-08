'use client';

import styled from "@emotion/styled";
import { TodoItemType } from "../../atom/todoAtom";
import { useState } from "react";
import { TextType } from "./TodoUserListPage";
import TodoItem from "./TodoItem";


const Dashboard = styled.div`
  width: 100%;
  background: #FFFFFF;
  padding: 32px;
  gap: 32px;
  border-radius: 24px;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`

const TypeBox = styled.div`
  display: flex;
  justify-content: center;
`

const TypeButton = styled.button<{ isSelected: boolean }>`
  height: 40px;
  padding: 8px 32px 8px 32px;
  border-radius: 12px;
  border: 0;
  background-color: ${(props) => (props.isSelected ? '#EBF4FF' : '#FFFFFF')};
  cursor: pointer;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => (props.isSelected ? '#2182F3' : '#454545')};
`

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
`

const TodoTitle = styled.div`
  padding: 16px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`

interface Props {
  todoList: TodoItemType[],
  onCheck: (item: TodoItemType) => void,
  onDelete: (item: TodoItemType) => void
}

const TodoDashboard = ({todoList, onCheck, onDelete}: Props) => {

    const [ type, setType ] = useState<TextType>("All");
    
    const unDoneList = todoList.filter( item => !item.done );
    const doneList = todoList.filter( item => item.done);
  
    const filteredTodoList = type === "To do" ? unDoneList
                              :type === "Done" ? doneList
                                :todoList

    return(
        <Dashboard>
          <TypeBox>
            {(["All", "To do", "Done"] as const).map( (text) => 
              <TypeButton 
                isSelected={type === text} key={text}
                onClick={(e) => {
                  setType(text);
                }} 
              >
                  {text}
              </TypeButton>
            )}
          </TypeBox>
          <TodoBox>
            <TodoTitle>{`총 ${filteredTodoList.length}개`}</TodoTitle>
            {filteredTodoList.map( item => 
              <TodoItem 
                todoItem={item} 
                onCheck={() => onCheck(item)}
                onDelete={() => onDelete(item)}
                key={item.id} 
              /> 
            )}
          </TodoBox>
        </Dashboard>
    );
}

export default TodoDashboard