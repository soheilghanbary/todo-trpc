import { FormEvent, useRef } from "react";
import { trpc } from "~/utils/trpc/client";
import Icon from "../atoms/icon";

export default function AddTodo() {
  const textRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const addMutation = trpc.todos.add.useMutation();
  const utils = trpc.useContext();

  function onAddTodo(e: FormEvent) {
    e.preventDefault();
    if (!textRef.current?.value.length) {
      return;
    }
    addMutation.mutate(textRef.current?.value);
    formRef.current?.reset();
  }

  if (addMutation.isSuccess) {
    utils.todos.invalidate();
  }

  return (
    <form
      ref={formRef}
      onSubmit={onAddTodo}
      className="flex items-center gap-2"
    >
      <input
        type={"text"}
        className="border border-line px-4 py-2 leading-7 focus:ring-2 ring-indigo-400 duration-200 rounded-lg bg-secondary w-full hover:bg-primary"
        placeholder="enter Todo"
        ref={textRef}
      />
      <button
        type="submit"
        disabled={addMutation.isLoading}
        className="flex items-center justify-center px-4 py-2 leading-7 rounded-lg w-11 h-11 active:scale-90 duration-150 border border-line bg-indigo-500 border-indigo-400 text-white"
      >
        <Icon name="message" />
      </button>
    </form>
  );
}
