import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { token, user } = useSelector(state => state.auth);
    const isLoggedIn = !!token && !!user;
    const navigate = useNavigate();

    const handleDashboardClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            navigate('/login');
        }
    }

    return (
        <div className='flex items-center justify-between py-3'>
            <Link to={"/"} className='text-3xl font-bold font-mono'>
                Quizzy
            </Link>
            <div className='flex gap-5 items-center'>
                <NavLink to={"/home"} className={({ isActive }) => isActive === true ? "text-green-600" : "text-white"}>
                    Home
                </NavLink>
                <NavLink 
                    to={isLoggedIn ? "/dashboard" : "/login"} 
                    className={({ isActive }) => isActive === true ? "text-green-600" : "text-white"}
                >
                    Dashboard
                </NavLink>
                
                {!isLoggedIn ? (
                    <NavLink to={"/login"} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                        Log In
                    </NavLink>
                ) : (
                    <div className="relative group">
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer shadow-lg">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-medium">
                                {user.username}
                            </span>
                            {user.role === 'admin' && (
                                <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                                    ADMIN
                                </span>
                            )}
                            <svg className="w-4 h-4 text-white transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="p-3 border-b border-slate-700">
                                <p className="text-white font-medium">{user.username}</p>
                                <p className="text-slate-400 text-sm">{user.email}</p>
                                {user.role && (
                                    <p className="text-indigo-400 text-xs uppercase tracking-wide mt-1">
                                        {user.role}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <Link 
                                    to="/dashboard" 
                                    className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                                <button 
                                    onClick={() => {
                                        // Add logout functionality here
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }}
                                    className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar