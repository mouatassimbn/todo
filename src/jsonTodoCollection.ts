import TodoItem from "./todoItem";
import TodoCollection from "./todoCollection";
import { LowSync, JSONFileSync } from "lowdb";

type schemaType = {
  tasks: { id: number; task: string; complete: boolean }[];
};

export default class JsonTodoCollection extends TodoCollection {
  private _database: LowSync<schemaType>;

  constructor(username: string, todoItems: TodoItem[] = []) {
    super(username, []);

    this._database = new LowSync<schemaType>(
      new JSONFileSync<schemaType>("Todos.json")
    );

    this._database.read();

    this._database.data ||= { tasks: [] };

    let { tasks } = this._database.data;

    if (tasks !== []) {
      tasks.forEach((item) =>
        this._itemMap.set(
          item.id,
          new TodoItem(item.id, item.task, item.complete)
        )
      );
    } else {
      this._database.data.tasks = todoItems;
      this._database.write();
      todoItems.forEach((item) => this._itemMap.set(item.id, item));
    }
  }

  public addTodo(task: string): number {
    let result = super.addTodo(task);
    this.storeTasks();
    return result;
  }

  public markComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);
    this.storeTasks();
  }

  public removeComplete(): void {
    super.removeComplete();
    this.storeTasks();
  }

  private storeTasks(): void {
    this._database.read();
    this._database.data ||= { tasks: [] };
    this._database.data.tasks = [...this._itemMap.values()];
    this._database.write();
  }
}
