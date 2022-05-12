import {  Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  AnimatePresence, motion
} from 'framer-motion';
  import {lazy, Suspense} from "react"
import './App.css';
import Login from './components/views/login/login';
import Task from './components/views/task/task';

const Error404 = lazy(()=> import("./components/views/error404/error404"))

export const RequiredAuth = ({children}) => {
  if (!localStorage.getItem('logged')) {
    return <Navigate to="/login" replace={true} />
  } else {
    return children
  }
}

const pageTransition= {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
}

export function App() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={
            <RequiredAuth>
              <motion.div className='page' initial="out" animate="in" exit="out"variants={pageTransition}><Task /></motion.div>
            </RequiredAuth>} />
          <Route path='/login' element= { <motion.div className='page' initial="out" animate="in" exit="out"variants={pageTransition}> <Login /> </motion.div>} />
          <Route path='*' element={
            <motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}>
              <Suspense fallback={<>...</>}>
                <Error404 />
              </Suspense>
          </motion.div>} />
        
        </Routes>
          </AnimatePresence>
    </>
  );      
}

