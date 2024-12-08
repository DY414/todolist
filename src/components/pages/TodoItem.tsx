import styled from "@emotion/styled";
import { css } from "@emotion/react";

import CloseSVG from '../../../public/icons/Close.svg';
import CheckSVG from '../../../public/icons/Check.svg';

import { TodoItemType } from "../../atom/todoAtom";

interface Props {
  todoItem: TodoItemType,
  onCheck: () => void,
  onDelete: () => void,
}

const ItemText = styled.div`
  flex: 1;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`
const Item = styled.div`
  padding: 32px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`
const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`
const LargeButton = styled.button`
  width: 32px; height: 32px;
  border: 1px solid #B9B9B9;
  border-radius: 50%;
  background-color: #FFFFFF;
  ${commonButtonStyle}

  &.Selected {
    background-color: #2182F3;
    border-color: #2182F3;
  }
    
  path {
    fill: #FFFFFF
  }
`
const SmallButton = styled.button`
  width: 24px; width: 24px;
  border: 0;
  background-color: #FFFFFF;
  ${commonButtonStyle}

  path {
    width: 14px; height: 14px;
    fill: #B9B9B9;
  }
`

const TodoItem = ({todoItem, onCheck, onDelete}: Props) => {
  const { id, text } = todoItem;

  return (<Item key={id}>
    <LargeButton className={`${todoItem.done ? "Selected" : ""}`} onClick={onCheck} >
      <CheckSVG />
    </LargeButton>
    <ItemText>
      {text}
    </ItemText>
    <SmallButton onClick={onDelete} >
      <CloseSVG />
    </SmallButton>
  </Item>)
}

export default TodoItem;