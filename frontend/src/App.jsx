import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
import { AuthorById } from './views/AuthorById';
import { Home } from './views/Home';
import { Routes, Route } from 'react-router-dom';
import { BookForm } from './views/Admin/BookForm';
import { CategoryForm } from './views/Admin/CategoryForm';
import { AuthorForm } from './views/Admin/AuthorForm';
import { Dashboard } from './views/Admin/Dashboard';
import AdminLayout from './views/Admin/AdminLayout';



function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/category' element={<CategoryForm />} />
          <Route path='/category/:id' element={<CategoryForm />} />
          <Route path='/author' element={<AuthorForm />} />
          <Route path='/author/update/:id' element={<AuthorForm />} />
          <Route path='/book' element={<BookForm />} />
          <Route path='/book/update/:id' element={<BookForm />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<BookById />} />
        <Route path='/author/:id' element={<AuthorById />} />

      </Routes>
    </>
  )
}

export default App
