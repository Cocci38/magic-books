import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import { Home } from './Home'
import { Log } from './Log'
import { BookById } from './BookById'
import { AuthorById } from './AuthorById'
import Error from '../../utils/Error'
const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path='authentification' element={<Log />} />
                <Route path='livre/:id' element={<BookById />} />
                <Route path='auteur/:id' element={<AuthorById />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default PublicRouter