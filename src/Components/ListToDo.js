import "./ListToDo.css";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useMemo, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SnackContext } from "../Context/SnackContext";
import { useList } from "../Context/ReduceContext";

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
  const {list, dispatch} = useList();
  const [type, setType] = useState("All");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [info, setInfo] = useState({ title: list.title, body: list.body });
  const { showHideToast, setMessage } = useContext(SnackContext);

  useEffect(() => {
    dispatch({type: "get"})
  }, []);

  // Add New Task
  function handleValue() {
    dispatch({type: "added", payload: { title: valueInput}})
    setValueInput("");
    showHideToast();
    setMessage("Task Add Successfully");
  }
  // Add New Task ===

  // Check Task
  function handleClickCheck(id) {
    dispatch({type: "check", payload: {id: id}})
    setMessage("Checked Successfully");
    showHideToast();  
  }
  // Check Task ===

  // For Delete Modal
  function handleClickDelete(id) {
    dispatch({type: "deleted", payload: {id: id}})
    showHideToast();
    setMessage("Task Deleted Successfully");
  }

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    handleClickDelete(id);
    setOpen(false);
  }

  function dialogDelete(id) {
    setId(id);
    setOpen(true);
  }
  // For Delete Modal =====

  // For Update Modal
  function dialogUpdate(id) {
    setId(id);
    setOpenUpdate(true);
  }

  function handleCloseUpdate() {
    setOpenUpdate(false);
  }

  function handleToDoUpdate() {
    handleClickUpdate(id, info);
    setOpenUpdate(false);
    setMessage("Task Updated Successfully");
  }

  function handleClickUpdate(id, info) {
    dispatch({type: "updated", payload: {id: id, info: info}});
    showHideToast();
  }
  // For Update Modal =====

  const completed = useMemo(() => {
    return list.filter((e) => {
      return e.isCompleted;
    });
  }, [list]);

  const notCompleted = useMemo(() => {
    return list.filter((e) => {
      return !e.isCompleted;
    });
  }, [list]);

  let listToBeRender = list;

  if (type == "NotCompleted") {
    listToBeRender = notCompleted;
  } else if (type == "Completed") {
    listToBeRender = completed;
  }

  let listToDo = listToBeRender.map((e) => {
    return (
      <ToDo
        key={e.id}
        list={e}
        handleCheck={handleClickCheck}
        handleDelete={dialogDelete}
        handleUpdate={dialogUpdate}
      />
    );
  });

  return (
    <>
      {/* Delete Modal */}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are You Sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't reset the task again if you delete it
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal */}

      {/* Update Modal */}
      <Dialog open={openUpdate}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Enter the title"
            type="text"
            fullWidth
            variant="standard"
            value={info.title}
            onChange={(e) => {
              setInfo({ ...info, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            name="body"
            label="Enter the Description"
            type="text"
            fullWidth
            variant="standard"
            value={info.body}
            onChange={(e) => {
              setInfo({ ...info, body: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button type="submit" onClick={handleToDoUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Modal */}

      <Container maxWidth="sm" className="center">
        <div className="containerBox">
          <div className="centerFlex">
            <h1 className="title">My List ToDo</h1>
            <div style={{ paddingTop: "20px" }}>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(e) => {
                  setType(e.target.value);
                }}
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
    </>
  );
};

export default ListToDo;
