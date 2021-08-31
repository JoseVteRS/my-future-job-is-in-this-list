import React from 'react'

const DeleteButton = ({textButton, onClick}) => {
    return (
        <button onClick={onClick}>
            {textButton}
        </button>
    )
}

export default DeleteButton