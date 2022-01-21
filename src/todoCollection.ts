import TodoItem from "./todoItem";

type ItemCounts = {
  total: number;
  incomplete: number;
};

export default class TodoCollection {
  private _nextId: number = 1;
  protected _itemMap: Map<number, TodoItem>;
  public userName: string;

  constructor(userName: string, todoItems: TodoItem[] = []) {
    this.userName = userName;
    this._itemMap = new Map<number, TodoItem>();
    todoItems.forEach((item) => this._itemMap.set(item.id, item));
  }

  public addTodo(task: string): number {
    while (this.getTodoById(this._nextId)) {
      this._nextId++;
    }

    this._itemMap.set(this._nextId, new TodoItem(this._nextId, task));
    return this._nextId;
  }

  public getTodoById(id: number): TodoItem | undefined {
    return this._itemMap.get(id);
  }

  public getTodoItems(includeComeplete: boolean): TodoItem[] {
    return [...this._itemMap.values()].filter(
      (item) => includeComeplete || !item.complete
    );
  }

  public markComplete(id: number, complete: boolean): void {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  public removeComplete(): void {
    this._itemMap.forEach((item) => {
      if (item.complete) {
        this._itemMap.delete(item.id);
      }
    });
  }

  public getItemCounts(): ItemCounts {
    return {
      total: this._itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
