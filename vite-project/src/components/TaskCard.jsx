import React from 'react'

const TaskCard = ({task,onDelete,onEdit,onStatusChange}) => {
  return (
    <div>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>due Date: {task.dueDate}</p>
      <select onChange={(e)=>onStatusChange(task.id,e.target.value)}>
        <option value="pending">pending</option>
        <option value="inprogress">inProgress</option>
        <option value="completed">completed</option>
      </select>
      <button onClick={()=>onEdit(task)}>Edit</button>
      <button onClick={()=>onDelete(task.id)}>Delete</button>
    </div>
  )
}

export default TaskCard
