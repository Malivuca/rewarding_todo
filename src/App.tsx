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
  TextField,
  IconButton,
  Checkbox,
  InputAdornment
} from '@material-ui/core'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

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
    color: 'black',
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => (
  <Checkbox
    color="default"
    icon={<RadioButtonUncheckedRoundedIcon />}
    checkedIcon={<CheckCircleOutlineRoundedIcon />}
    {...props}
  />
))

const createTask = (taskName: string, id: number) => {
  console.log(taskName, id)

  const newTask = { taskName, id }

  return newTask
}

function App () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const [taskName, setTaskName] = React.useState('')
  const [tasks, setTasks] = React.useState<TaskProps[]>([])

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
        <h5>Today</h5>
        <br />
        <ul className="TasksList">
          <form onSubmit={(e) => handleSubmit(e)}>
            <li>
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
            </li>
          </form>
          {tasks.map((task, index) => (
            <>
              <li key={index} className="Task">
                <ListItemIcon>
                  <CustomColorCheckbox />
                </ListItemIcon>
                <div>{task.taskName}</div>
                <ListItemIcon>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </ListItemIcon>
              </li>
              <hr />
            </>
          ))}
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Aprender Japones" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Descricao longa lalalallalal" />
              </ListItem>
            </List>
          </Collapse>
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
