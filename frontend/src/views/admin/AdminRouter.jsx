import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { CategoryForm } from './CategoryForm'
import { AuthorForm } from './AuthorForm'
import { BookForm } from './BookForm'
import AdminLayout from './AdminLayout'
import Error from '../../utils/Error'

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path='livre'>
                    <Route path='ajout' element={<BookForm />} />
                    <Route path='editer/:id' element={<BookForm />} /> 
                </Route>
                <Route path='categorie'>
                    <Route path='ajout' element={<CategoryForm />} />
                    <Route path='editer/:id' element={<CategoryForm />} /> 
                </Route>
                <Route path='auteur'>
                    <Route path='ajout' element={<AuthorForm />} />
                    <Route path='editer/:id' element={<AuthorForm />} /> 
                </Route>
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AdminRouter