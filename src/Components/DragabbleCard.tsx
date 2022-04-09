import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background-color: ${(props) =>
      props.isDragging ? "#e4f2ff" : props.theme.cardColor};
    };
  }
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClickDelete = () => {
    
    setToDos((allBoards) => {
        const boardCopy = [...allBoards[boardId]]
        const newToDos = [
            ...boardCopy.slice(0, index),
            ...boardCopy.slice(index+1),
        ];
        return {
          ...allBoards,
          [boardId]: newToDos,
        };
    });
  };
  console.log(toDoId, index)
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        <button onClick={onClickDelete}> 
          <FontAwesomeIcon icon={faXmark} />
        </button>
          
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);