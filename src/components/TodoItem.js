/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React from "react";
import styles from "@/styles/TodoList.module.css";
import { useSession } from "next-auth/react";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete, userinfo }) => {
  const { data } = useSession();
  const admin_arr = ["김선정", "한승오", "김명원", "김남희"];
  const isAdmin = data && admin_arr.includes(data?.user?.name);

  // 각 할 일 항목을 렌더링합니다.
  return (
    <li className={styles.todoItem}>
      {/* 체크박스를 렌더링하고, 체크박스의 상태를 할 일의 완료 상태와 동기화합니다.
          체크박스의 상태가 변경되면 onToggle 함수를 호출하여 완료 상태를 업데이트합니다. */}
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />

      {/* 할 일의 텍스트를 렌더링하고, 완료 상태에 따라 텍스트에 취소선을 적용합니다. */}
      <span
        className={styles.todoText}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>

      <span>
        {todo.datetime}
      </span>

      {isAdmin && (<button className="bg-[#e0f2fe] text-[#0ea5e9] font-normal mb-0.5 py-0.1 px-2 ml-3 rounded-2xl border border-[#e0f2fe] hover:border-[#0ea5e9]" 
      onClick={onDelete}>
        Delete
        </button>
      )}
    </li>
  );
};

// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;

