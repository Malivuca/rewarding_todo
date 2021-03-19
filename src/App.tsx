import React from 'react'

import {
	makeStyles,
	Theme,
	createStyles,
	withStyles,
} from '@material-ui/core/styles'
import {
	ListSubheader,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	TextField,
	IconButton,
	Checkbox,
} from '@material-ui/core'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

import { green, blue } from '@material-ui/core/colors'

import logo from './logo.svg'
import './App.css'

interface TaskProps {
	taskName: string
	id: number
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
)

const CustomColorCheckbox = withStyles({
	root: {
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})((props) => (
	<Checkbox
		color="default"
		icon={<RadioButtonUncheckedRoundedIcon />}
		checkedIcon={<CheckCircleOutlineRoundedIcon />}
		{...props}
	/>
))

function App() {
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

		let newTasks = [...tasks].filter((task, index) => task.id !== id)

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

		let cloneTasks = [...tasks]

		cloneTasks.push(createTask(taskName, tasks.length))

		setTasks(cloneTasks)

		setTaskName('')
	}

	return (
		<div className="App">
			<header className="App-header">
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							Rewarding To-do
						</ListSubheader>
					}
					className={classes.root}
				>
					<form onSubmit={(e) => handleSubmit(e)}>
						<ListItem>
							<ListItemIcon>
								<IconButton type="submit">
									<AddCircleOutlineIcon />
								</IconButton>
							</ListItemIcon>
							<TextField
								value={taskName}
								onChange={(el) => setTaskName(el.target.value)}
								fullWidth
							/>
						</ListItem>
					</form>
					{tasks.map((task, index) => (
						<ListItem key={index}>
							<ListItemIcon>
								<CustomColorCheckbox />
							</ListItemIcon>
							<ListItemText primary={task.taskName} />
							<ListItemIcon>
								<IconButton onClick={() => handleDelete(task.id)}>
									<DeleteRoundedIcon />
								</IconButton>
							</ListItemIcon>
						</ListItem>
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
				</List>
			</header>
		</div>
		// <div className="App">
		// 	<header className="App-header">
		// 		<div className="TaskRow">
		// 			Sou uma task
		// 			<div className="TaskCheck">
		// 				<button>Check</button>
		// 			</div>
		// 		</div>
		// 	</header>
		// </div>
	)
}

const createTask = (taskName: string, id: number) => {
	console.log(taskName, id)

	let newTask = { taskName, id }

	return newTask
}

export default App
