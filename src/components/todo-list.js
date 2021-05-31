import React from "react";
import { TodoListItem } from "./todo-item";
import "./todo-styles.module.css";

export const TodoList = ({ items, removeItem, markTodoDone }) => {
  return (
    <div className="columns">
      <ul className="list-group">
          <li>New</li>
        {items.filter((el)=> !el.isDone).map((item, index) => {
          return (
            <TodoListItem
              key={index}
              item={item}
              index={index}
              removeItem={() => removeItem(item.id)}
              markTodoDone={markTodoDone}
            />
          );
        })}
      </ul>
      <ul className="list-group">
      <li>Done</li>
        {items.filter((el)=> el.isDone).map((item, index) => {
          return (
            <TodoListItem
              key={index}
              item={item}
              index={index}
              removeItem={() => removeItem(item.id)}
              markTodoDone={markTodoDone}
            />
          );
        })}
      </ul>
    </div>
  );
};
