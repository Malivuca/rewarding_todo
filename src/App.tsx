import React from 'react'

import {
  makeStyles,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core/styles'
import {
  Collapse,
  IconButton,
  Checkbox,
  InputAdornment,
  TextField
} from '@material-ui/core'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

import { green } from '@material-ui/core/colors'

// import logo from './logo.svg'
import './App.scss'
import { CustomInput } from './components/filled-input.component'

interface TaskProps {
  id: number
  taskName: string
  taskDescription: string
  completed: boolean
  editing: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 700,
      backgroundColor: theme.palette.background.default
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    button: {
      color: 'black'
    }
  })
)

const CustomColorCheckbox = withStyles({
  root: {
    color: 'grey',
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => (
  <Checkbox
    color="default"
    icon={<RadioButtonUncheckedRoundedIcon fontSize="small" />}
    checkedIcon={<CheckCircleOutlineRoundedIcon fontSize="small" />}
    {...props}
  />
))

const createTask = (taskName: string, id: number, taskDescription = '') => {
  console.log(taskName, id)

  const newTask = {
    taskName,
    id,
    taskDescription,
    completed: false,
    editing: false
  }

  return newTask
}

function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const [taskName, setTaskName] = React.useState('')
  const [newTaskName, setNewTaskName] = React.useState('')
  const [tasks, setTasks] = React.useState<TaskProps[]>([])

  const handleComplete = (id: number) => {
    const newTasks = [...tasks]

    newTasks[id].completed = !newTasks[id].completed

    setTasks(newTasks)
  }

  const setEdit = (id: number) => {
    const newTasks = [...tasks]

    let i

    for (i = 0; i < newTasks.length; i++) {
      if (newTasks[i].editing === true) {
        newTasks[i].editing = false

        break
      }
    }

    newTasks[id].editing = true

    setTasks(newTasks)
  }

  const unsetEdit = (id: number) => {
    const newTasks = [...tasks]

    newTasks[id].editing = false

    setTasks(newTasks)
  }

  const handleEdit = (id: number, newTaskName: string) => {
    if (!newTaskName) {
      alert('You need to type a task name!')

      return
    }

    const newTasks = [...tasks]

    newTasks[id].taskName = newTaskName

    setTasks(newTasks)

    unsetEdit(id)
  }
  const handleDelete = (id: number) => {
    console.log('Deleting task', id)

    // let newTasks = [...tasks].filter((tesk, index) => tesk.props.id !== id)

    const newTasks = [...tasks].filter((task, index) => task.id !== id)

    // Guarantees that the tasks IDs wont be equal after deleting one of them
    for (let i = id; i < newTasks.length; i++) {
      newTasks[i].id -= 1
    }

    console.log(newTasks)

    setTasks(newTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskName) {
      alert('You didnt type a task name!')

      return
    }

    const cloneTasks = [...tasks]

    cloneTasks.push(createTask(taskName, tasks.length))

    setTasks(cloneTasks)

    setTaskName('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Today</h1>
        <br />
        <ul className="taskList">
          <form onSubmit={(e) => handleSubmit(e)}>
            <li className="createTask">
              <CustomInput
                variant="filled"
                label="Create task"
                value={taskName}
                onChange={(el) => setTaskName(el.target.value)}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <AddRoundedIcon />
                //     </InputAdornment>
                //   )
                // }}
                fullWidth
              />
              <div className="addAction">
                <IconButton type="submit">
                  <AddCircleRoundedIcon
                    style={{ color: 'var(--secondary)' }}
                    fontSize="large"
                  />
                </IconButton>
              </div>
            </li>
          </form>
          {tasks.map((task, index) => (
            <li key={index} className="task" onClick={handleClick}>
              {task.editing ? (
                <div className="editTask">
                  <div className="mainArea">
                    <textarea
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <button
                      className="primaryButton"
                      onClick={() => handleEdit(task.id, newTaskName)}
                    >
                      Save
                    </button>
                    <button
                      className="secondaryButton"
                      onClick={() => unsetEdit(task.id)}
                    >
                      Cancel
                    </button>
                  </div>
                  {/* <TextField
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              /> */}
                </div>
              ) : (
                <>
                  <div className="taskBody">
                    <div className="taskCheck">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleComplete(index)
                        }}
                      >
                        <RadioButtonUncheckedRoundedIcon
                          fontSize="small"
                          style={
                            tasks[index].completed
                              ? { color: 'var(--secondary)' }
                              : { color: 'grey' }
                          }
                        />
                      </button>
                      {/* <CustomColorCheckbox /> */}
                    </div>
                    <div className="mainText">{task.taskName}</div>
                    <div className="taskActions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setNewTaskName(task.taskName)
                          setEdit(index)
                        }}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </button>
                      <button onClick={(e) => handleDelete(task.id)}>
                        <DeleteRoundedIcon fontSize="small" />
                      </button>
                      <button>
                        <MoreHorizRoundedIcon />
                      </button>
                    </div>
                  </div>
                  {task.taskDescription ? (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <div
                        style={{
                          backgroundColor: 'var(--primary)',
                          paddingLeft: '20px',
                          paddingBottom: '10px',
                          textAlign: 'left'
                        }}
                      >
                        Note: {task.taskDescription}
                      </div>
                    </Collapse>
                  ) : null}
                </>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
    // <div className="App">
    //  <header className="App-header">
    //    <div className="TaskRow">
    //      Sou uma task
    //      <div className="TaskCheck">
    //        <button>Check</button>
    //      </div>
    //    </div>
    //  </header>
    // </div>
  )
}

export default App
