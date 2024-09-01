import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingTask, setEditingTask] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleAdd = () => {
        axios.post('http://localhost:3000/add', { task }) //sending to backend
            .then(result => {
                setTodos([...todos, result.data]); // Add the new task to the list
                setTask(""); 
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.put(`http://localhost:3000/edit/${id}`, { task: editingTask }) // sending to backend
            .then(result => {
                const updatedTodos = todos.map(todo => 
                    todo._id === id ? { ...todo, task: result.data.task } : todo
                );
                setTodos(updatedTodos);
                setEditingId(null); //Exits edit mode
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`) // sending to backend
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id)); // Remove the task from the list
            })
            .catch(err => console.log(err));
    };

    const startEditing = (id, task) => {
        setEditingId(id);
        setEditingTask(task);
    };

    return (
        <div className='flex justify-center bg-black items-center flex-col h-[100vh] '>
            <h1 className='text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-400 mt-[110px] mb-[30px]'>
                To Do List
            </h1>
            <div className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        id="default-search"
                        className="block w-[500px] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter a Task"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="text-white absolute end-2.5 bottom-2.5 mr-[-50px] bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </div>
            </div>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <div key={todo._id}>
                        <div className='bg-gray-300 w-[500px] justify-between mt-5 py-4 rounded-md ml-12'>
                            <div className='ml-2 checkbox'><BsCircleFill /></div>

                            <div className='flex flex-row justify-between'>
                                {editingId === todo._id ? (
                                    <div className='flex items-center'>
                                        <input 
                                            type="text" 
                                            value={editingTask} 
                                            onChange={(e) => setEditingTask(e.target.value)} 
                                            className='text center ml-8  mt-[-25px] bg-gray-200 border border-gray-300 rounded-md px-2'
                                        />
                                        <button 
                                            onClick={() => handleEdit(todo._id)}
                                            className=' bg-black mt-[-20px] ml-3 text-white py-1 px-3 rounded-lg'
                                        >
                                            Update
                                        </button>
                                    </div>
                                ) : (
                                    <div className='text center ml-8 mt-[-18px]'>{todo.task}</div>
                                )}
                                <div className='flex space-x-9'>
                                    <a onClick={() => startEditing(todo._id, todo.task)} className='mt-[-10px]'>
                                        <FaEdit />
                                    </a>
                                    <a onClick={() => handleDelete(todo._id)} className='mr-[10px] mt-[-10px]' style={{marginRight:'10px'}}>
                                        <FaTrash />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                "No Items Added"
            )}
        </div>
    );
}

export default Home;
