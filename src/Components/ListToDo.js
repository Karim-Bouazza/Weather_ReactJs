import "./ListToDo.css";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToDolist = [
  {
    id: uuidv4(),
    title: "Frontend",
    body: "html css javascript",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Backend",
    body: "nodejs expressjs mysql",
    isCompleted: false,
  },
];

const ListToDo = () => {
  const [valueInput, setValueInput] = useState("");
  const [list, setList] = useState(ToDolist);
  const [type, setType] = useState("All");

  useEffect(() => {
    const todo =JSON.parse(localStorage.getItem("list"));
    setList(todo);
  }, [])

  function handleClickCheck(id) {
    const checkTask = list.map((e) => {
      if (e.id == id) {
        e.isCompleted = !e.isCompleted;
      }
      return e;
    });
    setList(checkTask);
    localStorage.setItem("list", JSON.stringify(checkTask));
    
  }

  function handleClickDelete(id) {
    const deleteTask = list.filter((e) => {
      if(id != e.id) {
        return true;
      }
    })
    setList(deleteTask);
    localStorage.setItem("list", JSON.stringify(deleteTask));
  }

  function handleValue() {
    const newTask = {
      id: uuidv4(),
      title: valueInput,
      body: "Task To Do",
      isCompleted: false,
    };
    const storage = [...list, newTask];
    setList(storage);
    localStorage.setItem("list", JSON.stringify(storage));
    setValueInput("");
  }

  function handleClickUpdate (id, info) {
    const updateTask = list.map((e) => {
      if(id == e.id) {
        return {...e, title: info.title, body: info.body};
      } else {
        return e;
      }
    })
    setList(updateTask);
    localStorage.setItem("list", JSON.stringify(updateTask));
  }

  const completed = list.filter((e) => {
    return e.isCompleted;
  }) 

  const notCompleted = list.filter((e) => {
    return !e.isCompleted;
  })

  let listToBeRender = list;

  if(type == "NotCompleted") {
    listToBeRender = notCompleted;
  } else if(type == "Completed") {
    listToBeRender = completed;
  }

  let listToDo = listToBeRender.map((e) => {
    return <ToDo key={e.id} list={e} handleCheck={handleClickCheck} handleDelete={handleClickDelete} handleUpdate={handleClickUpdate} />;
  });

  return (
    <Container maxWidth="sm" className="center">
      <div className="containerBox">
        <div className="centerFlex">
          <h1 className="title">My List ToDo</h1>
          <div style={{ paddingTop: "20px" }}>
                  <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(e) => {setType(e.target.value)}}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="NotCompleted">Not Completed</ToggleButton>
                    <ToggleButton value="Completed">Completed</ToggleButton>
                    <ToggleButton value="All">All</ToggleButton>
                  </ToggleButtonGroup>
          </div>
          <div style={{ padding: "15px 0", width: "100%" }}>
            <div style={{ padding: "15px 0" }}>{listToDo}</div>

            <Box sx={{ width: 500, maxWidth: "100%" }}>
              <Stack spacing={1} direction="row">
                <Button
                  onClick={handleValue}
                  variant="contained"
                  color="secondary"
                  style={{ padding: "0 40px" }}
                >
                  Create
                </Button>
                <TextField
                  fullWidth
                  id="fullWidth"
                  placeholder="Add new Task"
                  value={valueInput}
                  onChange={(e) => {
                    setValueInput(e.target.value);
                  }}
                />
              </Stack>
            </Box>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListToDo;
