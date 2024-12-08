"use client";

import React from "react";
import styled from "@emotion/styled";

import { TodoItemType } from "../../atom/todoAtom";

import TodoInput from "./TodoInput";
import TodoDashboard from "./TodoDashboard";

import { useTodoActions } from "../../hooks/useTodoActions";


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


interface Props {
  todoList: TodoItemType[]
}

export type TextType = "All" | "To do" | "Done";

const TodoUserListPage = ({todoList}: Props) => {
  const { addHandler, checkHandler, deleteHandler } = useTodoActions();

  return (
    <Container>
      <Title>
        {'To do List'}
      </Title>
      <Content>
        <TodoInput onAddTodo={addHandler} />
        <TodoDashboard 
          todoList={todoList}
          onCheck={checkHandler}
          onDelete={deleteHandler}
        />
      </Content>
    </Container>
  );
};

export default TodoUserListPage;
