import "./ToDo.css";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function ToDo({ list, handleCheck, handleDelete, handleUpdate }) {

    function handleCheckClick() {
      handleCheck(list.id);
    }

    function deleteSendId() {
      handleDelete(list.id)
    }

    function updateSendId () {
      handleUpdate(list.id);
    }

  return (
    <>
        <div className="containerTask" key={list.id} style={{ marginBottom: "15px" }}>
        <div>
            <h2>{list.title}</h2>
            <h3 style={{ color: "rgba(255, 255, 255, 0.9)" }}>{list.body}</h3>
        </div>
        <Stack spacing={1} direction="row">
            <IconButton aria-label="check" className="icon check" onClick={handleCheckClick} style={{ background: list.isCompleted ? "green" : "white", color: list.isCompleted ? "white" : "green",}}>
            <CheckOutlinedIcon />
            </IconButton>
            <IconButton aria-label="create" className="icon create" onClick={updateSendId} style={{ background: "white", color: "blue" }}>
            <CreateOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete" className="icon delete" onClick={deleteSendId} style={{ background: "white", color: "red" }}>
            <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Stack>
        </div>
    </>
  );
}
