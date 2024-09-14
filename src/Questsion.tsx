import React, { useState } from 'react';
import { Input } from './styles';

export const Question = () => {
  const [question, setQuestion] = useState('What is your question?');
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(true);
  };

  const handleFocus = () => {
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
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h1 onClick={handleClick}>{question}</h1>
      )}
    </div>
  );
};
