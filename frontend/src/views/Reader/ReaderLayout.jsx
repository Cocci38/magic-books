import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'

const ReaderLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )
}

export default ReaderLayout