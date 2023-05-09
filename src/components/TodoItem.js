/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React, { useState } from "react";
import styles from "@/styles/TodoList.module.css";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete }) => {
  // 각 할 일 항목을 렌더링합니다.
  let [isEditing, setIsEditing] = useState(false);
  let [editText, setEditText] = useState(todo.text);
  let [blankAlert, setBlankAlert] = useState(false);

  const emojiList = ["😃", "😐", "😔"];

  const [selectedEmoji, setSelectedEmoji] = useState(null); // 선택된 이모지를 상태로 관리

  const handleEmojiToggle = (emoji) => {
    // 이모지를 선택하면 선택된 이모지를 상태로 업데이트
    setSelectedEmoji(emoji);
  };

  const editTodo = () => {
    setIsEditing(true);
  };

  const editComplete = () => {
    if (editText.trim() == "") {
      setBlankAlert(true);
      return;
    }
    setIsEditing(false);
  };

  return (
    <ul>
      <li className={styles.todoItem}>
        <li className="mt-9 ml-3"></li>
        {/* 체크박스를 렌더링하고, 체크박스의 상태를 할 일의 완료 상태와 동기화합니다.
            체크박스의 상태가 변경되면 onToggle 함수를 호출하여 완료 상태를 업데이트합니다. 
            수정 버튼을 누르면 기존의 할일 텍스트가 수정창으로 변합니다.    
        */}

        {isEditing ? null : (
          <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        )}

        {/* 할 일의 텍스트를 렌더링하고, 완료 상태에 따라 텍스트에 취소선을 적용합니다. */}
        {isEditing ? (
          <input
            className={styles.editInput}
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
          />
        ) : (
          <span
            className="mt-0 mb-0.5 ml-4 mr-auto"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {editText}
          </span>
        )}

        {/* 수정 버튼을 렌더링 하고, 클릭 시 수정 창을 활성화하고, 수정 버튼은 완료 버튼이 됩니다. */}
      {isEditing ? (
        <button className="bg-white text-[#8b5cf6] font-normal mb-0.5 py-0.5 px-3 mr-2 rounded-2xl border border-white hover:border-[#8b5cf6]" onClick={editComplete}>Complete</button>
      ) : (
        <button className="bg-white text-[#8b5cf6] font-normal mb-0.5 py-0.5 px-3 mr-2 rounded-2xl border border-white hover:border-[#8b5cf6]" onClick={editTodo}>Edit</button>
      )}

        {/* 삭제 버튼을 렌더링하고, 클릭 시 onDelete 함수를 호출하여 해당 할 일을 삭제합니다. */}
    
        <button className="bg-[#ede9fe] text-[#8b5cf6] font-normal mb-0.5 py-0.5 px-3 rounded-2xl border border-[#ede9fe] hover:border-[#8b5cf6]" onClick={onDelete}>Delete</button>

        {blankAlert ? (
          <div className="fixed inset-0 w-full rounded-3xl bg-white border-10 flex flex-col justify-center items-center">
            <h2 className="mb-8 text-xl font-bold">빈칸을 채워주세요!</h2>
            <div className="flex">
              <button
                className="mr-5 w-40 justify-self-end p-1 mb-4 bg-[#8b5cf6] text-white border border-[#8b5cf6] rounded hover:bg-white hover:text-[#8b5cf6]"
                onClick={() => {
                  setBlankAlert(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        ) : null}
      </li>
      <li className={styles.todoItem}>
        <li className="bg-[#f5f3ff] flex items-center justify-between px-4 pt-1 pb-0 pr-5 rounded-2xl">
          <p className="whitespace-normal text-[#8b5cf6] text-sm mb-2 font-normal mr-52 mt-1">
            위 할 일을 만족스럽게 수행하셨나요? </p>
        {/* 선택된 이모지에 따라 배경 색을 보라색으로 변경 */}
        <div
          className="ml-0.5 mb-1.5"
          style={{
            backgroundColor:
              selectedEmoji === emojiList[0] ? "#8b5cf6" : "transparent",
          }}
          onClick={() => handleEmojiToggle(emojiList[0])}
        >
          {emojiList[0]}
        </div>
        <div
          className="ml-2 mb-1.5"
          style={{
            backgroundColor:
              selectedEmoji === emojiList[1] ? "#8b5cf6" : "transparent",
          }}
          onClick={() => handleEmojiToggle(emojiList[1])}
        >
          {emojiList[1]}
        </div>
        <div
          className="ml-2 mb-1.5"
          style={{
            backgroundColor:
              selectedEmoji === emojiList[2] ? "#8b5cf6" : "transparent",
          }}
          onClick={() => handleEmojiToggle(emojiList[2])}
        >
          {emojiList[2]}
        </div>
        </li>
      </li>
    </ul>
  );
};

// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;

