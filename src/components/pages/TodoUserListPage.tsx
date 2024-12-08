"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";

import { todoItemType, todoListState } from "../../atom/todoAtom";
import TodoItem from "./TodoItem";
import TextInput from "./TextInput";

const Container = styled.div`
  width: 100%;
  max-width: 737px;
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F6F6F6;
`;

const Title = styled.div`
  color: #333333;
  font-size: 56px;
  font-weight: 700;
  margin: 128px 0 64px 0;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

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
  todoList: todoItemType[]
}
type TextType = "All" | "To do" | "Done";

const TodoUserListPage = ({todoList}: Props) => {
  console.log("TodoUserListPage");
  
  const setTodoList = useSetRecoilState(todoListState);
  const [ type, setType ] = useState<TextType>("All");
  
  const unDoneList = todoList.filter( item => !item.done );
  const doneList = todoList.filter( item => item.done);

  const filteredTodoList = type === "To do" ? unDoneList
                            :type === "Done" ? doneList
                              :todoList

  const CreateTodoHandler = (text: string) => {
    if ( !text  ) return;

    if ( text.length > 20 ) {
      alert(`'할 일'은 20글자를 넘길 수 없습니다.\n(현재: ${text.length}글자입니다.)`);
      return;
    }
    
    setTodoList( prev => prev.concat({id: 4, text, done: false}));
  } 

  const CheckHandler = (item: todoItemType) => {
    setTodoList( prev => prev.map( todoItem => 
      todoItem.id === item.id 
        ? {...todoItem, done: !todoItem.done} 
        : todoItem ) )
  };

  const DeleteHandler = (item: todoItemType) => setTodoList( prev => prev.filter( todoItem => todoItem.id !== item.id ))

  return (
    <Container>
      <Title>
        {'To do List'}
      </Title>
      <Content>
        <TextInput onCreateTodo={CreateTodoHandler} />
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
            <TodoTitle>{`총 ${todoList.length}개`}</TodoTitle>
            {filteredTodoList.map( item => 
              <TodoItem 
                todoItem={item} 
                onCheck={ () => CheckHandler(item) }
                onDelete={ () => DeleteHandler(item) }
                key={item.id} 
              /> 
            )}
          </TodoBox>
        </Dashboard>
      </Content>
    </Container>
  );
};

export default TodoUserListPage;
