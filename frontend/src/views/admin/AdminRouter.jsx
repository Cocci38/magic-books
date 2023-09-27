import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CategoryForm } from './CategoryForm'
import { AuthorForm } from './AuthorForm'
import { BookForm } from './BookForm'
import AdminLayout from './AdminLayout'
import Error from '../../utils/Error'
import { Dashboard } from './Dashboard'
import { accountService } from '../../services/account.service';

const AdminRouter = () => {
    let isAdmin = "";
    let admin = accountService.isAdmin();
    console.log("admin " + admin);
    if (admin) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {isAdmin && <Route index element={<Dashboard />} />}
                {isAdmin && <Route path='livre'>
                    <Route path='ajout' element={<BookForm />} />
                    <Route path='editer/:id' element={<BookForm />} />
                </Route>}
                {isAdmin && <Route path='categorie'>
                    <Route path='ajout' element={<CategoryForm />} />
                    <Route path='editer/:id' element={<CategoryForm />} />
                </Route>}
                {isAdmin &&
                    <Route path='auteur'>
                        <Route path='ajout' element={<AuthorForm />} />
                        <Route path='editer/:id' element={<AuthorForm />} />
                    </Route>}
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AdminRouter