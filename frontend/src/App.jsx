import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRouter from './views/Admin/AdminRouter';
import PublicRouter from './views/Public/PublicRouter';
// import AuthGuard from './helpers/AuthGuard';
import { accountService } from './services/account.service';
import ReaderRouter from './views/Reader/ReaderRouter';

function App() {

  return (
    <>
      {/* Quand on fait des routes enfants, il faut préciser au router qu'il y a des routes après, donc on met une astérisque (*) */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PublicRouter />} />
          {/* <Route path="/admin/*" element={accountService.isLogged() ? <AdminRouter /> : <Navigate to="/authentification"/>} /> */}
          <Route path="/admin/*" element={accountService.isLogged() ? <AdminRouter /> : <PublicRouter />} />
          {/* <Route path="/admin/*" element={<AdminRouter />} /> */}
          <Route path="/mon-compte/*" element={<ReaderRouter/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
