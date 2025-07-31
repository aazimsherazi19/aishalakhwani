import React, { use } from 'react'
import { useAuth } from '../contexts/AuthContext';
const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>   
      <h1>Admin Dashboard</h1>
      <button className='bg-slate-500 rounded-lg text-white' onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
