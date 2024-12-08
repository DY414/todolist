import styled from "@emotion/styled";
import { useState } from "react";

interface Props {
  onAddTodo: (text: string) => void
}

const InputWrapper = styled.label<{ inputLength: number }>`
  width: 100%;
  padding: 32px;

  display: flex;
  align-items: center;

  background-color: #E5E5E5;
  border-radius: 24px;
  box-sizing: border-box;

  input{
    width: 100%;
    border: 0;

    box-sizing: border-box;
    background-color: transparent;

    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    &:focus{
      outline: 0;
    }
    &::placeholder{
      color: #B9B9B9;
    }
  }
`


const TodoInput = ({onAddTodo: onCreateTodo}: Props) => {
  
  const [ text, setText ] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( !!e.target.value ){
      setText(e.target.value);
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ( event.key === "Enter" && !!text ) {
      onCreateTodo(text);
      setText("");
      event.currentTarget.blur();
    }
  }

  return (<InputWrapper inputLength={text.length} >
    <input
      value={text}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
      placeholder={"할 일을 입력해 주세요"}
    />
  </InputWrapper>);
}

export default TodoInput;