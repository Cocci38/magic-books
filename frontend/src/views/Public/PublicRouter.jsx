import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import { Home } from './Home'
import { BookById } from './BookById'
import { AuthorById } from './AuthorById'
import Error from '../../utils/Error'
import { SignIn } from '../../components/Log/SignIn'
import { SignUp } from '../../components/Log/SignUp'

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path='connexion' element={<SignIn />} />
                <Route path='inscription' element={<SignUp />} />
                <Route path='livre/:id' element={<BookById />} />
                <Route path='auteur/:id' element={<AuthorById />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default PublicRouter