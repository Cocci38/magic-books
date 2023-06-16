import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const ReaderLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ReaderLayout