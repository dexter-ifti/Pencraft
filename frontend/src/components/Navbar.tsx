import React from 'react';
import { Bell, PenSquare, User, BookOpen } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-indigo-600" />
                        <span className="text-xl font-bold text-gray-900">Pencraft</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                            <PenSquare className="h-5 w-5" />
                            <span>Write</span>
                        </button>

                        <button className="relative text-gray-600 hover:text-gray-900">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <div className="relative">
                                <User className="h-6 w-6" />
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}