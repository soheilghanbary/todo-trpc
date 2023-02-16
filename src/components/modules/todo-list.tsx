import { trpc } from "~/utils/trpc/client";
import styles from "~/lib/sass/todos.module.scss";
import Icon from "../atoms/icon";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  published: string;
  updatedAt: string;
  index: string | number;
}

export default function TodoList() {
  const { data, isLoading } = trpc.todos.getTodos.useQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {data?.map((todo: any, i) => (
        <TodoItem key={todo.id} {...todo} index={i + 1} />
      ))}
    </ul>
  );
}

const TodoItem = ({
  text,
  id,
  completed,
  published,
  updatedAt,
  index,
}: any) => {
  const completeMutation = trpc.todos.done.useMutation();
  const deleteMutation = trpc.todos.delete.useMutation();
  const utils = trpc.useContext();
  function onCompleted() {
    completeMutation.mutate({ id });
  }

  function onDelete() {
    deleteMutation.mutate({ id });
  }

  if (completeMutation.isSuccess || deleteMutation.isSuccess) {
    utils.todos.invalidate();
  }

  return (
    <li className="border border-line bg-secondary p-4 rounded-xl flex items-center justify-between">
      <span className={completed ? "line-through" : ""}>
        {index}. {text}
      </span>
      <div className={styles["todo-actions"]}>
        <button className={styles["check-button"]} onClick={onCompleted}>
          <Icon name="check" />
        </button>
        <button className={styles["delete-button"]} onClick={onDelete}>
          <Icon name="trash" />
        </button>
      </div>
    </li>
  );
};
