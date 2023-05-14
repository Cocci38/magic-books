import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
import { AuthorById } from './views/AuthorById';
import { Home } from './views/Home';
import { Routes, Route } from 'react-router-dom';
import { PostBook } from './views/admin/PostBook';
import { PostCategory } from './views/admin/PostCategory';
import { PostAuthor } from './views/admin/PostAuthor';
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
        <Route path='/category' element={<PostCategory />} />
        <Route path='/category/:id' element={<PostCategory />} />
        <Route path='/author' element={<PostAuthor />} />
        <Route path='/book' element={<PostBook />} />
      </Routes>
    </>
  )
}

export default App
