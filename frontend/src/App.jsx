import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Main from './pages/Main';
import Wallet from './pages/Wallet';
import Referrals from './pages/Referrals';
import News from './pages/News';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { ComplexNavbar } from './components/Header';
import SignIn from './pages/SignIn';
import Token from './pages/Token';
import SignUp from './pages/SignUp';
import EmailChecker from './pages/EmailChecker';
import ProfileDetail from './pages/ProfileDetail';
import AllReferrals from './components/AllReferrals';
import UpdateProfile from './components/UpdateProfile';

function NavbarControl() {
    const location = useLocation();
    const isProtectedRoute = !['/signin', '/signup', '/login', '/check', '/details'].includes(location.pathname);
    return isProtectedRoute && <ComplexNavbar />;
}

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarControl />
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                    <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                    <Route path="/ref" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
                    <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/all-referrals" element={<ProtectedRoute><AllReferrals /></ProtectedRoute>} />
                    <Route path="/token" element={<ProtectedRoute><Token /></ProtectedRoute>} />
                    <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                    
                    <Route element={<GuestRoute />}>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<ProfileDetail />} />
                    </Route>
                    
                    <Route path="/check" element={<EmailChecker />} />
                    <Route path="/details" element={<ProfileDetail />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
