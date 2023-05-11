import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
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
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category' element={<PostCategory />} />
      </Routes>
    </>
  )
}

export default App
