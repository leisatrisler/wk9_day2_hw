import React from 'react';

interface FlashMessageProps {
  title: string;
  description: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ title, description }) => {
  return (
    <div className="flash-message">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default FlashMessage;
