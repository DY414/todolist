'use client';
import { atom } from "recoil";

export type todoItemType = {
    id: number;
    text: string;
    done: boolean;
};

export const todoListState = atom<todoItemType[]>({
    key: 'todoListState',
    default: [
        { id: 1, text: '출근하고 비타민 먹기', done: false },
        { id: 2, text: 'Daily Scrum 작성하기', done: false },
        { id: 3, text: '주간회의 참여하기', done: true },
    ],
});