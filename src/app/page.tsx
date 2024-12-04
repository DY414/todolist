'use client'
import React from "react";

import TodoUserListPage from "../components/pages/TodoUserListPage";
import { useRecoilValue } from "recoil";
import { todoListState } from "../atom/todoAtom";


const Page = () => {
  const todoList = useRecoilValue(todoListState);

  return <TodoUserListPage todoList={todoList} />;
};

export default Page;
