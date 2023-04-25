/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React, {useState} from "react";
import styles from "@/styles/TodoList.module.css";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete }) => {
  // 각 할 일 항목을 렌더링합니다.
  let [isEditing, setIsEditing] = useState(false);
  let [editText, setEditText] = useState(todo.text)

  const editTodo = () => {
    setIsEditing(true)
  }

  const editComplete = () => {
    if (editText.trim() == "") {
      alert("빈 칸을 채워주세요!")
      return
    }
    setIsEditing(false)
  }


  return (
    <li className={styles.todoItem}>
      {/* 체크박스를 렌더링하고, 체크박스의 상태를 할 일의 완료 상태와 동기화합니다.
          체크박스의 상태가 변경되면 onToggle 함수를 호출하여 완료 상태를 업데이트합니다. 
          수정 버튼을 누르면 기존의 할일 텍스트가 수정창으로 변합니다.    
      */}

      {
        isEditing
          ? null
          : <input
            type="checkbox" checked={todo.completed} onChange={onToggle} />
      }

      

      {/* 할 일의 텍스트를 렌더링하고, 완료 상태에 따라 텍스트에 취소선을 적용합니다. */}
      {
        isEditing
          ? (<input
              className={styles.editInput}
              type="text"
              value={editText}
              onChange={(e) => {setEditText(e.target.value)}}
          />)
          
          : (<span
              className={styles.todoText}
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {editText}
            </span>
            )
      }
      

      

      {/* 수정 버튼을 렌더링 하고, 클릭 시 수정 창을 활성화하고, 수정 버튼은 완료 버튼이 됩니다. */}
      {
        isEditing
          ? <button onClick={editComplete}>Complete</button>
          : <button onClick={editTodo}>Edit</button>}

      {/* 삭제 버튼을 렌더링하고, 클릭 시 onDelete 함수를 호출하여 해당 할 일을 삭제합니다. */}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;
