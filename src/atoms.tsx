import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

let storage = JSON.parse(localStorage.getItem("toDo")+"");
if (storage === null) {
  storage = {
    to_do: [],
    doing: [],
    done: [],
  }
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: storage
});