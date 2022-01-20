import TodoItem from "./todoItem";
import TodoCollection from "./todoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "By Flowers"),
  new TodoItem(2, "Get Shoews"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection = new TodoCollection("Adam", todos);

console.clear();
console.log(
  `${collection.userName}'s Todo List`,
  `(${collection.getItemCounts().incomplete} items to do)`
);
collection.getTodoItems(true).forEach((item) => item.printDetails());
