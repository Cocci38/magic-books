import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRouter from './views/Admin/AdminRouter';
import PublicRouter from './views/Public/PublicRouter';

function App() {

  return (
    <>
      {/* Quand on fait des routes enfants, il faut préciser au router qu'il y a des routes après, donc on met une astérisque (*) */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PublicRouter />} />
          <Route path="/admin/*" element={<AdminRouter /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
