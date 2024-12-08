'use client'
import React from "react";

import TodoUserListPage from "../components/pages/TodoUserListPage";
import { useRecoilValue } from "recoil";
import { todoListState } from "../atom/todoAtom";

import '../components/styles/Global.css';

const Page = () => {
  return <TodoUserListPage />;
};

export default Page;
