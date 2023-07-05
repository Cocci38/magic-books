import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { Footer } from '../../components/Footer'

const AdminLayout = () => {
    return (
        <div>
            <div className='divContent'>
                <Menu />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout