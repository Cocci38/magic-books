import { Menu } from './components/Menu';
import { BookById } from './views/BookById';
import { Home } from './views/Home';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<BookById/>}/>
      </Routes>
    </>
  )
}

export default App
