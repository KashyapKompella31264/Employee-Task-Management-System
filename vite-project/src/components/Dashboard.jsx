import React from 'react'

const Dashboard = ({tasks}) => {
    const totalTasks=tasks.length;
    const pendingTasks=tasks.filter((task)=>{return task.status==="pending"}).length;
    const inProgressTasks=tasks.filter((task)=>{return task.status==="inprogress"}).length;
    const completedTasks=tasks.filter((task)=>{return task.status==="completed"}).length;
  return (
    <div>
        <h2>Dashboard</h2>
        <p>Total Tasks: {totalTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
        <p>in-Progress Tasks: {inProgressTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
    </div>
  )
}

export default Dashboard
