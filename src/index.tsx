import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

type FormElem = React.FormEvent<HTMLFormElement>;
type InputElem = React.ChangeEvent<HTMLInputElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [newTodo, setNewTodo] = useState<String>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const changeTodoInput = (e: InputElem): void => {
    setNewTodo(e.target.value);
    // console.log("e.target.value : ", e.target.value)
  };

  const addTodo = (e: FormElem): void => {
    e.preventDefault();
    const newTodos: ITodo[] = [...todos, { text: newTodo, complete: false }];
    setTodos(newTodos);
    setNewTodo("");
  };

  // const addTodo = (text: string): void => {
  //   const newTodos: ITodo[] = [...todos, { text, complete: false }];
  //   setTodos(newTodos);
  // };

  console.log("todos : ", todos);

  function completeTodoHandler(index: number): void {
    completeTodo(index);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        {/* <input type="text" value={value} onChange={e => setValue(e.target.value)} required /> */}
        <input
          type="text"
          value={newTodo}
          onChange={changeTodoInput}
          required
        />

        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: Itodo, index: number) => {
          return (
            <Fragment key={index}>
              <div>
                <span
                  style={{
                    textDecoration: todo.complete ? "line-through" : "",
                  }}
                >
                  {todo.text}
                </span>
                <button type="button" onClick={(): void => completeTodo(index)}>
                  {todo.complete ? "Incomplete" : "Complete"}
                </button>
                <button type="button" onClick={(): void => removeTodo(index)}>
                  &times;
                </button>
              </div>
            </Fragment>
          );

          // console.log("todo : ", todo);
          // return <div key={index}>{todo.text}</div>
        })}
      </section>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
