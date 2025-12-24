import { createMemo, createSignal, For, render, Show } from "@luna_ui/luna";

function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  const isEven = createMemo(() => count() % 2 === 0);

  return (
    <div>
      <h1>Luna Counter Example</h1>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <p>{() => isEven() ? "Even" : "Odd"}</p>
      <div class="buttons">
        <button onClick={() => setCount((c) => c - 1)}>-</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos] = createSignal<
    { id: number; text: string; done: boolean }[]
  >([]);
  const [input, setInput] = createSignal("");
  let nextId = 1;

  const addTodo = () => {
    const text = input();
    if (text.trim()) {
      setTodos((t) => [...t, { id: nextId++, text, done: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((t) =>
      t.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
    );
  };

  const removeTodo = (id: number) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="Add a todo..."
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        <For each={todos}>
          {(todo) => (
            <li style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ cursor: "pointer" }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
              >
                x
              </button>
            </li>
          )}
        </For>
      </ul>
      <Show when={() => todos().length === 0}>
        <p>No todos yet!</p>
      </Show>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Counter />
      <hr />
      <TodoApp />
    </div>
  );
}

const app = document.getElementById("app");
if (app) {
  render(app, <App />);
}
