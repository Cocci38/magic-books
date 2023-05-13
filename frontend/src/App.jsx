import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
import { AuthorById } from './views/AuthorById';
import { Home } from './views/Home';
import { Routes, Route } from 'react-router-dom';
import { PostCategory } from './views/admin/PostCategory';
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
      </Routes>
    </>
  )
}

export default App
