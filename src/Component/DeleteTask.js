import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { textTransform } from '@mui/system'
export default function FormDialog({open ,task, setDeleteDialog}) {
  const handleClose = () => {
    setDeleteDialog(false);
  };


  const deleteTask = () => {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')):[];
    let modifiedtask = tasks.filter((eachTtask)=>{
         return eachTtask.id != task.id
     })
     localStorage.setItem('tasks',JSON.stringify(modifiedtask));
     setDeleteDialog(false)

 }

  return (
    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this task</p>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#E8E8E8', color: 'black' ,textTransform:'none' }} onClick={handleClose}>Cancel</Button>
          <Button style={{ backgroundColor: '#E8E8E8', color: 'black', textTransform:'none' }} onClick={deleteTask}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}