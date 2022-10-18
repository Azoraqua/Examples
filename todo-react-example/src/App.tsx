import { FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<
    { id: number; label: string; done: boolean }[]
  >([]);

  function addTodo(name: string, done: boolean = false) {
    setTodos((prev) => [
      ...prev,

      {
        id: (Math.random() + 1) * 10_000,
        label: name,
        done: done,
      },
    ]);
  }

  function toggleTodo(todoId: number): void {
    setTodos((prev) => {
      return prev.map((todo) => {
        return { ...todo, done: todo.id === todoId ? !todo.done : todo.done };
      });
    });
  }

  function deleteTodo(todoId: number): void {
    setTodos((prev) => {
      return prev.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    addTodo(data.get("name") as string);
  }

  return (
    <div className="todo-container">
      <table className="todo-list">
        <thead>
          <tr>
            <th>Task</th>
            <th>Done</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {todos.length > 0 ? (
            todos.map(({ id, label, done }) => (
              <tr className="todo-item" key={id}>
                <td>{label}</td>
                <td>{done ? "✅" : "❌"}</td>
                <td>
                  <button type="button" onClick={() => toggleTodo(id)}>
                    Toggle
                  </button>

                  <button type="button" onClick={() => deleteTodo(id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No tasks yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input name="name" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
