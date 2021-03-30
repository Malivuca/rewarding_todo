import React from 'react'

import {
  makeStyles,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  taskName: string
  id: number
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

const createTask = (taskName: string, id: number) => {
  console.log(taskName, id)

  const newTask = { taskName, id }

  return newTask
}

function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const [taskName, setTaskName] = React.useState('')
  const [tasks, setTasks] = React.useState<TaskProps[]>([])

  const handleEdit = (e: React.MouseEvent, id: number, newTaskName: string) => {
    e.stopPropagation()
    const newTasks = [...tasks]

    newTasks[id].taskName = newTaskName
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
      alert('You didnt type a task!')

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
              <div className="taskBody">
                <div className="taskCheck">
                  <button>
                    <RadioButtonUncheckedRoundedIcon
                      fontSize="small"
                      style={{ color: 'grey' }}
                    />
                  </button>
                  {/* <CustomColorCheckbox /> */}
                </div>
                <div className="mainText">{task.taskName}</div>
                <div className="taskActions">
                  <button onClick={(e) => handleEdit(e, task.id, 'novo Nome')}>
                    <EditRoundedIcon fontSize="small" />
                  </button>
                  <button onClick={(e) => handleDelete(task.id)}>
                    <DeleteRoundedIcon fontSize="small" />
                  </button>
                  <button>
                    <MoreHorizRoundedIcon />
                  </button>
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <div>Descricao longa lalala</div>
                </Collapse>
              </div>
            </li>
          ))}
          <li>
            <div className="editTask">
              <div className="mainArea">
                <textarea rows={4} />
              </div>
              <div>
                <button className="primaryButton">Save</button>
                <button className="secondaryButton">Cancel</button>
              </div>
              {/* <TextField
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              /> */}
            </div>
          </li>
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
