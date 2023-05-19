import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
import { AuthorById } from './views/AuthorById';
import { Home } from './views/Home';
import { Routes, Route } from 'react-router-dom';
import { PostBook } from './views/admin/PostBook';
import { CategoryForm } from './views/admin/CategoryForm';
import { AuthorForm } from './views/admin/AuthorForm';
import { Dashboard } from './views/admin/Dashboard';


function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<BookById />} />
        <Route path='/author/:id' element={<AuthorById />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category' element={<CategoryForm />} />
        <Route path='/category/:id' element={<CategoryForm />} />
        <Route path='/author' element={<AuthorForm />} />
        <Route path='/author/update/:id' element={<AuthorForm />} />
        <Route path='/book' element={<PostBook />} />
        <Route path='/book/update/:id' element={<PostBook />} />
      </Routes>
    </>
  )
}

export default App
