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

import { context, logging, storage } from 'near-sdk-as'
import { items, ToDoItem } from './model'


const DEFAULT_MESSAGE = 'Hello'

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}

export function addItem(text: string, isDone: boolean): ToDoItem {
  // Creating a new message and populating fields with our data
  const id = items.length.toString()
  const message = new ToDoItem(id, text, isDone);
  // Adding the message to end of the the persistent collection
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

// /**
//  * Returns an array of last N messages.\
//  * NOTE: This is a view method. Which means it should NOT modify the state.
//  */
export function getItems(): ToDoItem[] {
  const result = [] as ToDoItem[];
  const keys = items.keys();
  for (let i = 0; i < keys.length; i++) {
    result[i] = items.getSome(keys[i]);
  }
  return result;
}
