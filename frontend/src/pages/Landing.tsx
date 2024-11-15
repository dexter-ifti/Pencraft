// import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';


export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <BookOpen className="h-8 w-8 text-indigo-600"/>
                                <span className="text-2xl font-bold text-gray-900">
                                    Pencraft</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Link to={'/login'} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Login
                            </Link>
                            <Link to={'/signup'} className="ml-4 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </Link>
                            
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Welcome to Pencraft</span>
                            <span className="block text-indigo-600">Where ideas grow</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Join our community of writers and readers. Share your stories, ideas, and expertise with the world.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                    Get started
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Discover amazing stories
                                </h2>
                                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                                    From technology to lifestyle, from science to art - find stories that matter to you. Our platform hosts a diverse range of topics written by passionate individuals from around the globe.
                                </p>
                                <div className="mt-8 sm:flex">
                                    <div className="rounded-md shadow">
                                        <Link to="/explore" className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                            Explore stories
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                                    <img className="max-h-12" src="/placeholder.svg?height=48&width=48" alt="Tech" />
                                </div>
                                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                                    <img className="max-h-12" src="/placeholder.svg?height=48&width=48" alt="Science" />
                                </div>
                                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                                    <img className="max-h-12" src="/placeholder.svg?height=48&width=48" alt="Art" />
                                </div>
                                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                                    <img className="max-h-12" src="/placeholder.svg?height=48&width=48" alt="Lifestyle" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2023 Meadium, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}