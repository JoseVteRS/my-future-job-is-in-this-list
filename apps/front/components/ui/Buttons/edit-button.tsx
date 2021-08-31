import React from 'react';

const EditButton = ({ textButton, onClick }) => {
  return <button onClick={onClick}>{textButton}</button>;
};

export default EditButton;
