/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { items, ToDoItem } from './model'

export function addItem(text: string, isDone: boolean): ToDoItem {
  const id = items.length.toString()
  const message = new ToDoItem(id, text, isDone);
  items.set(id, message);
  return message;
}

export function removeItem(id: string): ToDoItem[] {
    items.delete(id.toString());
    const res = getItems();
    return res; 
}

export function markItem(id: string, isDone: boolean): ToDoItem[] {
  const item = items.getSome(id);
  item.isDone = isDone;
  items.set(id, item);
  const res = getItems();
  return res;
}

export function clearItems(): ToDoItem[] {
    items.clear();
    const res = getItems();
    return res; 
}

export function getItems(): ToDoItem[] {
  const result = [] as ToDoItem[];
  const keys = items.keys();
  for (let i = 0; i < keys.length; i++) {
    result[i] = items.getSome(keys[i]);
  }
  return result;
}
