import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaBrain, FaTrophy, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';
import { MdQuiz, MdDashboard, MdCreate } from 'react-icons/md';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <MdQuiz className="h-8 w-8 text-indigo-400 mr-2" />
                            <span className="text-2xl font-bold text-white">Quizzy</span>
                        </div>
                        <div className="flex space-x-4">
                            <Link 
                                to="/login" 
                                className="text-slate-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Welcome to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
                                Quizzy
                            </span>
                        </h1>
                        <div className="absolute -top-4 -right-4 text-6xl animate-bounce">
                            🧠
                        </div>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        The ultimate online quiz platform where knowledge meets excitement! 
                        Create, share, and challenge yourself with interactive quizzes.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link 
                            to="/home" 
                            className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
                        >
                            <FaRocket className="mr-2 group-hover:animate-pulse" />
                            Get Started
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
                        </Link>
                        
                        <Link 
                            to="/home" 
                            className="border-2 border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center"
                        >
                            Explore Quizzes
                        </Link>
                    </div>

                    {/* Floating Icons Animation */}
                    <div className="relative">
                        <div className="absolute -top-20 left-1/4 animate-float">
                            <FaBrain className="text-4xl text-indigo-400 opacity-60" />
                        </div>
                        <div className="absolute -top-16 right-1/4 animate-float-delayed">
                            <FaTrophy className="text-4xl text-yellow-400 opacity-60" />
                        </div>
                        <div className="absolute -top-12 left-1/6 animate-float-slow">
                            <MdQuiz className="text-4xl text-purple-400 opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-indigo-400 mb-2">1000+</div>
                            <div className="text-slate-300">Active Quizzes</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
                            <div className="text-slate-300">Happy Users</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-green-400 mb-2">100K+</div>
                            <div className="text-slate-300">Quiz Attempts</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Why Choose <span className="text-indigo-400">Quizzy?</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Experience the future of online learning with our cutting-edge features
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-indigo-500/25">
                                <MdCreate className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Create Custom Quizzes</h3>
                            <p className="text-slate-300">Design your own quizzes with our intuitive quiz builder. Add multiple choice questions and set time limits.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25">
                                <FaClock className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Real-time Results</h3>
                            <p className="text-slate-300">Get instant feedback and detailed analytics on your quiz performance with real-time scoring.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-yellow-500/25">
                                <FaTrophy className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Compete & Win</h3>
                            <p className="text-slate-300">Challenge friends and compete on leaderboards to showcase your knowledge and earn achievements.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/25">
                                <FaUsers className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Community Driven</h3>
                            <p className="text-slate-300">Join a thriving community of learners and quiz creators from around the world.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                                <MdDashboard className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Smart Dashboard</h3>
                            <p className="text-slate-300">Track your progress, view detailed statistics, and manage your quizzes from one central dashboard.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group bg-slate-800/50 hover:bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                                <FaChartLine className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Advanced Analytics</h3>
                            <p className="text-slate-300">Gain insights into your learning patterns with comprehensive analytics and performance tracking.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Test Your Knowledge?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of learners who are already improving their skills with Quizzy
                    </p>
                    <Link 
                        to="/signup" 
                        className="inline-flex items-center bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        <FaRocket className="mr-2" />
                        Start Your Journey Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <MdQuiz className="h-8 w-8 text-indigo-400 mr-2" />
                            <span className="text-2xl font-bold text-white">Quizzy</span>
                        </div>
                        <p className="text-slate-400 mb-6">
                            Empowering minds through interactive learning experiences
                        </p>
                        <div className="flex justify-center space-x-6">
                            <Link to="/home" className="text-slate-400 hover:text-white transition-colors">
                                Explore Quizzes
                            </Link>
                            <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="text-slate-400 hover:text-white transition-colors">
                                Sign Up
                            </Link>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-700">
                            <p className="text-slate-500">
                                © 2025 Quizzy. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 3s ease-in-out infinite 1s;
                }
                .animate-float-slow {
                    animation: float-slow 4s ease-in-out infinite 0.5s;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;