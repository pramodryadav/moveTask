import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddTask from '../Component/AddTask'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DeleteTask  from '../Component/DeleteTask'

export default function MoveTask() {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToDelete,setTaskToDelete] = useState({});
    const [searchTerm, setSearchTerm] = useState('')
    const [openDeleteDialog,setDeleteDialog] = useState(false)
    useEffect(() => {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        if (tasks) {
            setTasks(tasks)
        }
    }, [open,openDeleteDialog])

    const changeStep = (task, arrow) => {
        let modifiedtasks = tasks.map((eachTtask) => {
            if(eachTtask.id === task.id){
                if (task.step === 1) {
                    eachTtask.step = 2;
                    return eachTtask
                } else if (task.step === 2) {
                    if (arrow === 'right') {
                        eachTtask.step = 3;
                    } else {
                        eachTtask.step = 1;
                    }
    
                } else if (task.step === 3) {
                    if (arrow === 'right') {
                        eachTtask.step = 4;
                    } else {
                        eachTtask.step = 2;
                    }
                }else if(task.step === 4){
                    eachTtask.step = 3;
                }
                return eachTtask
            }
            return eachTtask
           
        })
        setTasks(modifiedtasks)
        localStorage.setItem('tasks',JSON.stringify(modifiedtasks));
        console.log(modifiedtasks);

    }
    const deleteTask = (task) =>{
        setDeleteDialog(true);
        setTaskToDelete(task);
    }

    const filteredTask = tasks.filter((eachTask)=>{
        if(searchTerm){
            return eachTask.name.toLowerCase().includes(searchTerm)
       
        }
        return eachTask
            
    })

    

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField  style={{ backgroundColor: '#E8E8E8' }}
                    size='small'
                    sx={{width:'23%'}}
                    placeholder='Search'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                    }}
                />
                <Button onClick={() => setOpen(true)} startIcon={<AddIcon />} style={{ backgroundColor: '#E8E8E8', color: 'black', textTransform: 'none' }}>  Add Task</Button>
            </div>
            <Box  sx={{ marginTop: '20px' }}>
                <Grid  container spacing={4}>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            minHeight: '100vh',
                            backgroundColor: '#E8E8E8',
                            textAlign: 'left',
                            padding: '20px'
                        }}><span>STEP 1</span>

                            {filteredTask && filteredTask.length > 0 && filteredTask.map((task) => {
                                return task.step === 1 && <Card sx={{ maxWidth: 345, margin: '20px 0' }}>
                                    <CardContent style={{ minHeight: '100px' }}>
                                        <div style={{ display: 'flex', justifyContent: "space-between", }}>
                                            <p>{task.name}</p>
                                            <Button onClick={()=>deleteTask(task)} startIcon={<DeleteIcon />} style={{ color: 'red', textTransform: 'none', border: 'none' }} variant="outlined">Delete</Button>
                                        </div>

                                    </CardContent>
                                    <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                                        <ArrowCircleRightOutlinedIcon onClick={() => changeStep(task, 'right')} className='rightIcon' />
                                    </CardActions>
                                </Card>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            minHeight: '100vh',
                            backgroundColor: '#E8E8E8',
                            textAlign: 'left',
                            padding: '20px'
                        }}>
                            <span>STEP 2</span>
                            {filteredTask && filteredTask.length > 0 && filteredTask.map((task) => {
                                return task.step === 2 && <Card sx={{ maxWidth: 345, margin: '20px 0' }}>
                                    <CardContent style={{ minHeight: '100px' }}>
                                        <div style={{ display: 'flex', justifyContent: "space-between", }}>
                                            <p>{task.name}</p>
                                            <Button onClick={()=>deleteTask(task)} startIcon={<DeleteIcon />} style={{ color: 'red', textTransform: 'none', border: 'none' }} variant="outlined">Delete</Button>
                                        </div>

                                    </CardContent>
                                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ArrowCircleLeftOutlinedIcon onClick={() => changeStep(task, 'left')} className='leftIcon' />
                                        <ArrowCircleRightOutlinedIcon onClick={() => changeStep(task, 'right')} className='rightIcon' />
                                    </CardActions>
                                </Card>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ minHeight: '100vh', backgroundColor: '#E8E8E8', textAlign: 'left', padding: '20px' }}>
                            <span>STEP 3</span>
                            {filteredTask && filteredTask.length > 0 && filteredTask.map((task) => {
                                return task.step === 3 && <Card sx={{ maxWidth: 345, margin: '20px 0' }}>
                                    <CardContent style={{ minHeight: '100px' }}>
                                        <div style={{ display: 'flex', justifyContent: "space-between", }}>
                                            <p>{task.name}</p>
                                            <Button onClick={()=>deleteTask(task)} startIcon={<DeleteIcon />} style={{ color: 'red', textTransform: 'none', border: 'none' }} variant="outlined">Delete</Button>
                                        </div>

                                    </CardContent>
                                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ArrowCircleLeftOutlinedIcon onClick={() => changeStep(task, 'left')} className='leftIcon' />
                                        <ArrowCircleRightOutlinedIcon onClick={() => changeStep(task, 'right')} className='rightIcon' />
                                    </CardActions>
                                </Card>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ minHeight: '100vh', backgroundColor: '#E8E8E8', textAlign: 'left', padding: '20px' }}>
                            <span>STEP 4</span>
                            {filteredTask && filteredTask.length > 0 && filteredTask.map((task) => {
                                return task.step === 4 && <Card sx={{ maxWidth: 345, margin: '20px 0' }}>
                                    <CardContent style={{ minHeight: '100px' }}>
                                        <div style={{ display: 'flex', justifyContent: "space-between", }}>
                                            <p>{task.name}</p>
                                            <Button onClick={()=>deleteTask(task)} startIcon={<DeleteIcon />} style={{ color: 'red', textTransform: 'none', border: 'none' }} variant="outlined">Delete</Button>
                                        </div>

                                    </CardContent>
                                    <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                                        <ArrowCircleLeftOutlinedIcon onClick={() => changeStep(task, 'left')} className='leftIcon' />
                                    </CardActions>
                                </Card>
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <AddTask open={open} setOpen={setOpen} />
            <DeleteTask task={taskToDelete} open = {openDeleteDialog} setDeleteDialog={setDeleteDialog}/>

        </div>
    )
}
