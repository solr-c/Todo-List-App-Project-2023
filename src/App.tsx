import { useState } from "react"
import { FaCheckCircle } from 'react-icons/fa'
import { FaTimesCircle } from 'react-icons/fa'
// import { Task } from "./types";

interface Task {
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (): void => {
    if (newTask.length > 32) {
      alert('Cannot add task greater than 32 characters.')
      return
    }


    if (newTask.trim() !== '') {
      setTasks([...tasks, {content: newTask, completed: false}]);
      setNewTask('');
    } else {
      alert('Please enter a task!')
    }
  }

  const toggleTask = (index: number) => {
    const newTasks = tasks.map((task, taskIndex) => {
      task.completed
      if (taskIndex === index) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(newTasks);
  }

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((task, taskIndex) => taskIndex !== index))
  }


  return (
    <>
      <body className="font-sans leading-normal tracking-normal">
        <main className="container mx-auto max-w-md mt-10 p-8 bg-white dark:bg-slate-800 shadow-lg rounded">
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          <section className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Task'
              onKeyDown={(e) => e.key === 'Enter' && addTask()} />
            <button
              onClick={addTask}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Task</button>
            <ul id='task-list' className="list-reset list-none m-5">
              {tasks.length <= 0 && 'No Tasks found.'}
              {tasks.map((task, index) => (
                <>
                  <li
                    key={index}
                    className={`cursor-pointer ${task.completed ? 'line-through text-green-300 bg-green-600' : ''}
                    flex justify-between bg-slate-100 my-2 p-3 rounded-lg`}
                    >
                    {task.content}

                    <section className="flex justify-end">
                      <button className="mr-2"
                              onClick={() => toggleTask(index)}>
                          <FaCheckCircle style={task.completed ? {color:'green'} : {color: 'grey'}}/>
                      </button>
                      <button className="justify-end"
                              onClick={() => deleteTask(index)}>
                          <FaTimesCircle style={{color: 'red'}}/>
                      </button>
                    </section>
                  </li>
                </>
              ))}
            </ul>
          </section>
        </main>
      </body>
    </>
  )
}

export default App
