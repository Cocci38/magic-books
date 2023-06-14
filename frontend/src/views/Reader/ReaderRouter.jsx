import { Routes, Route } from 'react-router-dom'
import { ReaderDashboard } from "./ReaderDashboard"
import ReaderLayout from "./ReaderLayout"
import Error from '../../utils/Error'

const ReaderRouter = () => {

    return (
        <Routes>
            <Route element={ <ReaderLayout/> } >
                <Route index element={ <ReaderDashboard /> } />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default ReaderRouter