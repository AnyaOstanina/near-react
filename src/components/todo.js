import React from "react";
import { TodoList } from "./todo-list";
import { TodoForm } from "./add-form";
import { Spinner } from "./spinner";

export const TodoApp = () => {
  const [todoItems, setTodoItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        setIsLoading(true);
        // window.contract is set by initContract in index.js
        window.contract.getItems().then((items) => {
          setIsLoading(false);
          setTodoItems(items);
        });

        //   window.contract.getItems()
        //   .then(items => {
        //     setIsLoading(false);
        //     setTodoItems(items)
        //   })
      }

      // window.contract is set by initContract in index.js
      // window.contract.getGreeting({ accountId: window.accountId })
      //   .then(greetingFromContract => {
      //     setGreeting(greetingFromContract)
      //   })
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );
  const addItem = async (todoItem) => {
    setIsLoading(true);
    try {
      await window.contract
        .addItem({ text: todoItem, isDone: false })
        .then((item) => {
          setIsLoading(false);
          setTodoItems([...todoItems, item]);
        });
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const removeItem = async (id) => {
    setIsLoading(true);
    try {
      await window.contract.removeItem({ id: id }).then((items) => {
        setIsLoading(false);
        setTodoItems(items);
      });
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const markTodoDone = async (id) => {
    setIsLoading(true);
    try {
      await window.contract.markItem({ id: id, isDone: true }).then((items) => {
        setIsLoading(false);
        setTodoItems(items);
      });
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <div id="main">
      <h1>TODO List</h1>
      {isLoading ? <Spinner /> : ""}
      <TodoForm addItem={addItem} />
      <TodoList
        items={todoItems}
        removeItem={removeItem}
        markTodoDone={markTodoDone}
      />
    </div>
  );
};
