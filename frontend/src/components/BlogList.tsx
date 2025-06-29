import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Bookmark, Clock, User, Eye, ArrowRight } from 'lucide-react';
import { BACKEND_URL } from '../config';

export default function BlogList() {
    interface Blog {
        id: number;
        title: string;
        description: string;
        coverImage?: string;
        author: {
            firstName: string;
        };
        createdAt: string;
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredBlog, setHoveredBlog] = useState<number | null>(null);
    
    const authorImage: string = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150";
    const coverImages = [
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800"
    ];

    const getBlogs = async () => {
        try {
            const posts = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return posts.data.posts;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (err) {
                if(err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getReadTime = (description: string) => {
        const wordsPerMinute = 200;
        const wordCount = description.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                    <div className="animate-pulse flex space-x-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                        <div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden animate-pulse">
                            <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                                    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-red-500 text-6xl mb-4">😞</div>
                <div className="text-red-600 font-semibold text-lg mb-2">Oops! Something went wrong</div>
                <div className="text-gray-600 text-center">
                    We couldn't load the articles. Please try refreshing the page.
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Latest Articles
                </h2>
                <div className="flex items-center space-x-2 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{blogs.length} stories</span>
                </div>
            </div>
            
            <div className="space-y-8">
                {blogs.map((blog, index) => (
                    <article 
                        key={blog.id} 
                        className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20 hover:border-indigo-200"
                        onMouseEnter={() => setHoveredBlog(blog.id)}
                        onMouseLeave={() => setHoveredBlog(null)}
                        style={{ 
                            animationDelay: `${index * 150}ms`,
                            animation: 'slideInUp 0.6s ease-out forwards'
                        }}
                    >
                        <div className="relative overflow-hidden">
                            <img 
                                src={coverImages[index % coverImages.length]} 
                                alt={blog.title} 
                                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                                    <Bookmark className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img 
                                        src={authorImage} 
                                        alt={blog.author.firstName} 
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {blog.author.firstName}
                                        </h3>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{getReadTime(blog.description)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <User className="w-3 h-3" />
                                            <span>Writer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed line-clamp-3">
                                    {blog.description}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group/btn">
                                        <Heart className={`w-5 h-5 transition-all duration-300 ${hoveredBlog === blog.id ? 'scale-110' : ''}`} />
                                        <span className="text-sm font-medium">24</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group/btn">
                                        <MessageCircle className={`w-5 h-5 transition-all duration-300 ${hoveredBlog === blog.id ? 'scale-110' : ''}`} />
                                        <span className="text-sm font-medium">8</span>
                                    </button>
                                </div>
                                
                                <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-all duration-300 hover:scale-105 group/read">
                                    <span className="text-sm">Read More</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/read:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            
            {blogs.length === 0 && (
                <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to share your story with the community!</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                        Write Your First Story
                    </button>
                </div>
            )}
        </div>
    );
}