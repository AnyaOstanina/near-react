import { u128, PersistentUnorderedMap } from "near-sdk-as";

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
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
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */

export const items = new PersistentUnorderedMap<string, ToDoItem>("t");