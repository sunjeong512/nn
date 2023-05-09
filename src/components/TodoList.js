/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/

import React, { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

import { db } from "@/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

const todoCollection = collection(db,"todos");


// TodoList 컴포넌트를 정의합니다.
const TodoList = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const getTodos = async () => {
    const q = query(todoCollection, orderBy("datetime", "desc"));

    const results = await getDocs(q);
    const newTodos = [];

    results.docs.forEach((doc) => {
      newTodos.push({ id: doc.id, ...doc.data() });
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);


  // addTodo 함수는 입력값을 이용하여 새로운 할 일을 목록에 추가하는 함수입니다.
  const addTodo = async () => {
    // 입력값이 비어있는 경우 함수를 종료합니다.
    if (input.trim() === "") return;
    // 기존 할 일 목록에 새로운 할 일을 추가하고, 입력값을 초기화합니다.
    // {
    //   id: 할일의 고유 id,
    //   text: 할일의 내용,
    //   completed: 완료 여부,
    // }
    // ...todos => {id: 1, text: "할일1", completed: false}, {id: 2, text: "할일2", completed: false}}, ..
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0];
    const daytime = date + " " + time


    const docRef = await addDoc(todoCollection, {
      text: input,
      completed: false,
      datetime: daytime
    });


    setTodos([{ id: docRef.id, text: input, completed: false, datetime: daytime }, ...todos ]);
    setInput("");
    
  };

  // toggleTodo 함수는 체크박스를 눌러 할 일의 완료 상태를 변경하는 함수입니다.
  const toggleTodo = (id) => {
    // 할 일 목록에서 해당 id를 가진 할 일의 완료 상태를 반전시킵니다.
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const todoDoc = doc(todoCollection, id);
        updateDoc(todoDoc, { completed:!todo.completed });
        return { ...todo, completed:!todo.completed }; 
      } else { 
        return todo;
      }
    });

    setTodos(newTodos);
  };

  // deleteTodo 함수는 할 일을 목록에서 삭제하는 함수입니다.
  const deleteTodo = (id) => {
    const todoDoc = doc(todoCollection, id);
    deleteDoc(todoDoc);

    // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
    // setTodos(todos.filter((todo) => todo.id !== id));
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  // 컴포넌트를 렌더링합니다.
  return (
    <div className={styles.container}>
      <h1 className="animate-bounce text-xl mb-4 font-bold underline underline-offset-4 decoration-wavy">
        Todo List
      </h1>
      {/* 할 일을 입력받는 텍스트 필드입니다. */}
      <input
        type="text"
        // className={styles.itemInput}
        // -- itemInput CSS code --
        // input[type="text"].itemInput {
        //   width: 100%;
        //   padding: 5px;
        //   margin-bottom: 10px;
        // }
        className="shadow-lg shadow-[#8b5cf6]/20 w-full p-1 mb-4 border border-[#8b5cf6] rounded-2xl"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* 할 일을 추가하는 버튼입니다. */}
      <div class="grid">
        <button
          // className={styles.addButton}
          // -- addButton CSS code --
          // button.addButton {
          //   padding: 5px;
          //   background-color: #0070f3;
          //   color: white;
          //   border: 1px solid #0070f3;
          //   border-radius: 5px;
          //   cursor: pointer;
          // }
          //
          // button.addButton:hover {
          //   background-color: #fff;
          //   color: #0070f3;
          // }
          className="w-40 justify-self-end p-1 mb-4 bg-[#8b5cf6] text-white border border-[#8b5cf6] rounded-2xl hover:bg-[#ddd6fe] hover:border-[#ddd6fe] hover:text-[#8b5cf6]"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      {/* 할 일 목록을 렌더링합니다. */}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

