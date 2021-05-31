import React from "react";
import "./todo-styles.module.css";

export const TodoListItem = ({ removeItem, markTodoDone, item }) => {
  const onClickClose = () => {
    var index = item.id;
    removeItem(index);
  };
  const onClickDone = () => {
    var index = item.id;
    markTodoDone(index);
  };
  return (
    <li className="list-group-item ">
      <div className={item.done ? "done" : "undone"}>
        {item.text}
        {!item.isDone ? (
          <button type="button" className={"check"} onClick={onClickDone}>
            &#10003;
          </button>
        ) : (
          ""
        )}

        <button type="button" className={"close"} onClick={onClickClose}>
          &times;
        </button>
      </div>
    </li>
  );
};
