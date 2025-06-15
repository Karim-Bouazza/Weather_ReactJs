import "./ToDo.css";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ToDo({ list, handleCheck, handleDelete, handleUpdate }) {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [info, setInfo] = useState({title: list.title, body: list.body});

    function handleCheckClick() {
      handleCheck(list.id);
    }

    function handleClickConfirm() {
      setOpen(true)
    }
    
    function handleClose() {
      setOpen(false);
    }
    
    function handleConfirm() {
      handleDelete(list.id); 
    }

    function handleOpenUpdate() {
        setOpenUpdate(true);
    }
    
    function handleCloseUpdate() {
        setOpenUpdate(false);
    }

    function handleToDoUpdate() {
       handleUpdate(list.id, info);
       setOpenUpdate(false);
    }


  return (
    <>
      {/* Delete Modal */}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
           Are You Sure ?
        </DialogTitle>
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
      <Dialog
        open={openUpdate}
      >
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
            onChange={(e) => {setInfo({...info, title: e.target.value})}}
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
            onChange={(e) => {setInfo({...info, body: e.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button type="submit" onClick={handleToDoUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* Update Modal */}


        <div className="containerTask" key={list.id} style={{ marginBottom: "15px" }}>
        <div>
            <h2>{list.title}</h2>
            <h3 style={{ color: "rgba(255, 255, 255, 0.9)" }}>{list.body}</h3>
        </div>
        <Stack spacing={1} direction="row">
            <IconButton aria-label="check" className="icon check" onClick={handleCheckClick} style={{ background: list.isCompleted ? "green" : "white", color: list.isCompleted ? "white" : "green",}}>
            <CheckOutlinedIcon />
            </IconButton>
            <IconButton aria-label="create" className="icon create" onClick={handleOpenUpdate} style={{ background: "white", color: "blue" }}>
            <CreateOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete" className="icon delete" onClick={handleClickConfirm} style={{ background: "white", color: "red" }}>
            <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Stack>
        </div>
    </>
  );
}
