import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const PublicLayout = () => {
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

export default PublicLayout