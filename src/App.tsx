import { Route, Routes } from 'react-router-dom';
import './globals.css';
import SignInForm from './_auth/authForm/SignInForm';
import SignUpForm from './_auth/authForm/SignUpForm';
import { Home } from './_root/pages/pageExport';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

function App() {

  return (
    <main className='d-flex h-screen'>
      <Routes>
        {/* Public routes which will everyone like: signin or signup */}
        <Route element={ <AuthLayout /> }>
          <Route path="/sign-in" element={ <SignInForm /> }/>
          <Route path="/sign-up" element={ <SignUpForm /> }/>
        </Route>

        {/* private route: specific to user's login */}
        <Route element={ <RootLayout /> }>
          <Route index element={ <Home /> } />
        </Route>
      </Routes>
    </main>
  )
}

export default App
