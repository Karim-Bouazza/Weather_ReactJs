import { v4 as uuidv4 } from "uuid";

export default function ListReducer (currentList, action) {
    switch(action.type) {
        case "added" : {
            const newTask = {
            id: uuidv4(),
            title: action.payload.title,
            body: "Task To Do",
            isCompleted: false,
            };
            const storage = [...currentList, newTask];
            localStorage.setItem("list", JSON.stringify(storage));
            return storage;
        }
        case "check" : {
            const checkTask = currentList.map((e) => {
              if (e.id == action.payload.id) {
                return { ...e, isCompleted: !e.isCompleted }
              }
              return e;
            });
            localStorage.setItem("list", JSON.stringify(checkTask));
            return checkTask;
        }
        case "deleted": {
            const deleteTask = currentList.filter((e) => {
            if (action.payload.id != e.id) {
                return true;
            }
            });
            localStorage.setItem("list", JSON.stringify(deleteTask));
            return deleteTask;
        }
        case "updated": {
            const updateTask = currentList.map((e) => {
                if (action.payload.id == e.id) {
                 return { ...e, title: action.payload.info.title, body: action.payload.info.body };
                } else {
                 return e;
                }
            });
            localStorage.setItem("list", JSON.stringify(updateTask));
            return updateTask;
        }
        case "get": {
            return JSON.parse(localStorage.getItem("list")) ?? [];
        }
        default: {
            throw Error("Unknown Action " + action.type)
        }
    }
}