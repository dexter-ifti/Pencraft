import { TrendingUp, Users, Star, BookOpen, Award, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Recommendations() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const trending = [
        {
            id: 1,
            title: "Why React Hooks are Revolutionary",
            author: "Emma Wilson",
            views: "12.5K",
            category: "Technology",
            readTime: "5 min"
        },
        {
            id: 2,
            title: "Building Scalable APIs with Node.js",
            author: "David Park",
            views: "8.2K",
            category: "Development",
            readTime: "8 min"
        },
        {
            id: 3,
            title: "CSS Grid: A Complete Guide",
            author: "Lisa Chen",
            views: "6.7K",
            category: "Design",
            readTime: "12 min"
        },
    ];

    const suggestedAuthors = [
        {
            id: 1,
            name: "Alex Morgan",
            role: "Senior Developer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
            followers: "15.2K",
            posts: 42,
            verified: true
        },
        {
            id: 2,
            name: "Rachel Kim",
            role: "UX Designer",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
            followers: "8.9K",
            posts: 28,
            verified: false
        },
    ];

    const topics = [
        { name: "JavaScript", count: 1234, color: "bg-yellow-100 text-yellow-800" },
        { name: "React", count: 987, color: "bg-blue-100 text-blue-800" },
        { name: "Design", count: 756, color: "bg-purple-100 text-purple-800" },
        { name: "AI/ML", count: 543, color: "bg-green-100 text-green-800" },
        { name: "Career", count: 432, color: "bg-pink-100 text-pink-800" },
    ];

    return (
        <div className="space-y-8">
            {/* Trending Section */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                
                <div className="space-y-4">
                    {trending.map((item, index) => (
                        <div 
                            key={item.id} 
                            className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold rounded-full group-hover:scale-110 transition-transform duration-300">
                                    {index + 1}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 mb-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <span className="font-medium">{item.author}</span>
                                    <span>•</span>
                                    <span>{item.views} views</span>
                                    <span>•</span>
                                    <span>{item.readTime}</span>
                                </div>
                                <div className="mt-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        item.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                                        item.category === 'Development' ? 'bg-green-100 text-green-800' :
                                        'bg-purple-100 text-purple-800'
                                    }`}>
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Authors Section */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Suggested Authors</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                
                <div className="space-y-4">
                    {suggestedAuthors.map((author, index) => (
                        <div 
                            key={author.id} 
                            className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                            style={{ animationDelay: `${(index + 3) * 100}ms` }}
                        >
                            <div className="relative">
                                <img 
                                    src={author.image} 
                                    alt={author.name} 
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300" 
                                />
                                {author.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <Star className="w-2.5 h-2.5 text-white fill-current" />
                                    </div>
                                )}
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {author.name}
                                    </h3>
                                    {author.verified && (
                                        <Award className="w-4 h-4 text-blue-500" />
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{author.role}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                    <span>{author.followers} followers</span>
                                    <span>•</span>
                                    <span>{author.posts} posts</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 border border-indigo-200 hover:border-transparent rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Topics */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Popular Topics</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                
                <div className="space-y-3">
                    {topics.map((topic, index) => (
                        <div 
                            key={topic.name}
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 cursor-pointer"
                            style={{ animationDelay: `${(index + 6) * 100}ms` }}
                        >
                            <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${topic.color} group-hover:scale-105 transition-transform duration-300`}>
                                    {topic.name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{topic.count.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Coffee Break */}
            <div className={`bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-sm p-6 border border-amber-200 hover:shadow-lg transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4">
                        <Coffee className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Take a Break</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Enjoying the stories? Support writers by buying them a coffee!
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Support Writers ☕
                    </button>
                </div>
            </div>
        </div>
    );
}