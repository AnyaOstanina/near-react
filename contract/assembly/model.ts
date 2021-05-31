import { PersistentUnorderedMap } from "near-sdk-as";
@nearBindgen
export class ToDoItem {
  id: string;
  text: string;
  isDone: boolean;
  constructor(id: string, text: string, isDone: boolean) {
    this.text = text;
    this.id = id;
    this.isDone = isDone;
  }
}

export const items = new PersistentUnorderedMap<string, ToDoItem>("t");