import React, { useState } from 'react';
import { Input, EditableWrapper, EditIcon } from './styles';
import { FiEdit } from 'react-icons/fi'; // Edit icon from react-icons

export const Question = () => {
  const [question, setQuestion] = useState('What is your question?');
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(true);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setEditable(false);
    }
  };

  return (
    <div>
      {editable ? (
        <Input
          ref={(input) => input && input.focus()}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <EditableWrapper onClick={handleClick}>
          <h1>{question}</h1>
          <EditIcon>
            <FiEdit />
          </EditIcon>
        </EditableWrapper>
      )}
    </div>
  );
};
