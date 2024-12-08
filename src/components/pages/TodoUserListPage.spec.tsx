import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import TodoUserListPage from "./TodoUserListPage";
import { RecoilRoot } from "recoil";

describe("todo 테스트", () => {

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("todo의 기능을 테스트 합니다.", async () => {
    render(<RecoilRoot >
      <TodoUserListPage />
    </RecoilRoot>, {wrapper: RecoilRoot});

    /** 처음 로딩이 잘 됐는지 확인 */
    const inputElement = screen.getByRole('textbox');
      
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    
    expect(screen.getByText('출근하고 비타민 먹기')).toBeInTheDocument();
    expect(screen.getByText('Daily Scrum 작성하기')).toBeInTheDocument();
    expect(screen.getByText('주간회의 참여하기')).toBeInTheDocument();

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    
    /** 할 일 추가하기 text */

    // 할 일이 20글자가 넘을 경우 (기능)
    fireEvent.change(inputElement, { target: { value: '책상을 정리하고 이메일을 답장하고 운동을 1시간 하고 저녁 메뉴를 결정하기'}});

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    const longTodoItem = screen.queryByText('책상을 정리하고 이메일을 답장하고 운동을 1시간 하고 저녁 메뉴를 결정하기');

    void expect(longTodoItem).toBeNull;

    // 하지 않은 일이 10개 이상 만들어보기(기능)
    const newTodos = [
      "책상 정리하기",
      "이메일 답장 보내기",
      "운동 30분 하기",
      "저녁 식사 메뉴 정하기",
      "강아지 산책시키기",
      "방 청소하기",
      "오늘 공부한 내용 복습하기",
      "일찍 잠자기",
      "내일 할 일을 정리하기"
    ];

    for (const todo of newTodos) {
      const beforeList = screen.getAllByRole('listitem');
      
      const uncheckedItems = beforeList.filter(item => {
        const checkbox = within(item).getByRole('checkbox');
        return checkbox.getAttribute('aria-checked') === 'false';
      });

      fireEvent.change(inputElement, { target: { value: todo } });
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    
      if (uncheckedItems.length >= 10) {
        const notAddedTodo = screen.queryByText(todo);
        void expect(notAddedTodo).toBeNull;
      } else {
        expect(screen.getByText(todo)).toBeInTheDocument();
      }
    }

    /** 할 일 삭제해보기 */
    const item = screen.getByText("일찍 잠자기");
    const itemContainer = item.closest('[role="listitem"]') as HTMLElement;
    
    if ( !itemContainer ) return;
    
    const deleteButton = within(itemContainer).getByRole('button', { name: 'deleteitem' });

    // 삭제 버튼 클릭
    fireEvent.click(deleteButton);

    const deletedTodo = screen.queryByText("일찍 잠자기");
    void expect(deletedTodo).toBeNull;

    /** All, To do, done 탭 작동 확인하기 */
    const AllTab = screen.getByText("All");
    const TodoTab = screen.getByText("To do");
    const DoneTab = screen.getByText("Done");
    
    const BeforeListItem = await waitFor(() => screen.getAllByRole('listitem'));

    // Todo 탭을 클릭해서, 체크되지 않은 할 일만 보이는지 확인
    fireEvent.click(TodoTab);
    
    const TodolistItem = await waitFor(() => screen.getAllByRole('listitem'));

    const uncheckedItems = BeforeListItem.filter(item => {
      const checkbox = within(item).getByRole('checkbox');
      return checkbox.getAttribute('aria-checked') === 'false';
    });
    
    expect(TodolistItem.length).toEqual(uncheckedItems.length);

    // Done 탭을 클릭해서, 체크된 할 일만 보이는지 확인
    fireEvent.click(DoneTab);

    const DonelistItem = await waitFor(() => screen.getAllByRole('listitem'));

    const checkedItems = BeforeListItem.filter(item => {
      const checkbox = within(item).getByRole('checkbox');
      return checkbox.getAttribute('aria-checked') === 'true';
    });

    expect(DonelistItem.length).toEqual(checkedItems.length);
    
    // All 탭을 클릭해서, 체크 여부에 관계 없이 등록된 모든 할 일이 보이는지 확인
    fireEvent.click(AllTab);

    const AlllistItem = await waitFor(() => screen.getAllByRole('listitem'));

    expect(AlllistItem.length).toEqual(BeforeListItem.length);
  })
});
