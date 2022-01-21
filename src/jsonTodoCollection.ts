import TodoItem from "./todoItem";
import TodoCollection from "./todoCollection";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  tasks: { id: number; task: string; complete: boolean }[];
};

export class JsonTodoCollection extends TodoCollection {
  private _database: lowdb.LowdbSync<schemaType>;

  constructor(username: string, todoItems: TodoItem[] = []) {
    super(username, []);

    this._database = lowdb(new FileSync("Todos.json"));
    if(this._database){
        
    }
  }
}
