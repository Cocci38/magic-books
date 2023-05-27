import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'

const AdminLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )
}

export default AdminLayout