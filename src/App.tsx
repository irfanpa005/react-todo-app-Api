
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from './components/Header/header';
import {Home} from './components/HomePage/home';
import {Register} from './components/Register/Regsiter';
import {Tasks} from './components/TaskPage/TaskPage';
import TokenProtectedRoute from './components/Protected Route/ProtectedRoute';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
              <Route path="todo-tasks/:username" 
                element={ <TokenProtectedRoute> <Tasks /> </TokenProtectedRoute>} />
              </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
