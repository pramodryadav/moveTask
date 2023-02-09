import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { textTransform } from '@mui/system';

export default function FormDialog({open , setOpen}) {
  
const [tasksName,setTaskName] = useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTask = (e) =>{
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')):[];
    let newTask = {name:e.target.value, step:1, id: Math.floor(new Date().valueOf() * Math.random())}
    let modifiedtask = [...tasks, newTask];
    setTaskName(modifiedtask)

  }
  const submit = () =>{
    localStorage.setItem('tasks',JSON.stringify(tasksName));
    setOpen(false);

  }

  return (
    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            style={{width:'400px'}}
            id="name"
            type="text"
            onChange={(e)=>addTask(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#E8E8E8', color: 'black' ,textTransform:'none' }} onClick={handleClose}>Cancel</Button>
          <Button style={{ backgroundColor: '#E8E8E8', color: 'black', textTransform:'none' }} onClick={submit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}