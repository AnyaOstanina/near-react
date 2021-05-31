import React from 'react'

export const TodoForm = ({addItem}) => {
  const [text, setText] = React.useState('')
  const onSubmit = (e) => {
      e.preventDefault();
      addItem(text);
      setText('');
  };

  return (
    <form className="form-inline">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        className="form-control"
        placeholder="add a new todo..."
      />
      <button type="submit" className="btn btn-default" onClick={onSubmit} disabled={text === ''}>
        Add
      </button>
    </form>
  );
};
