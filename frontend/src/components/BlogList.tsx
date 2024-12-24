import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
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
    const authorImage: string =  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150";
    const coverImage : string = "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800";

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <div className="space-y-8">
                {blogs.map((blog) => (
                    <article key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                        {coverImage && (
                            <img src={coverImage} alt={blog.title} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img src={authorImage} alt={blog.author.firstName} className="w-10 h-10 rounded-full" />
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {blog.author.firstName}
                                    </h3>
                                    <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4">{blog.description}</p>
                            <div className="flex items-center justify-between text-gray-500">
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 hover:text-red-500">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                    <button className="flex items-center space-x-1 hover:text-blue-500">
                                        <MessageCircle className="h-5 w-5" />
                                    </button>
                                </div>
                                <button className="hover:text-indigo-600">
                                    <Bookmark className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}










/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import axios from 'axios';
// import { Heart, MessageCircle, Bookmark } from 'lucide-react';
// import { BACKEND_URL } from '../config';


// export default function BlogList() {

//     // const blogs = [
//     //     {
//     //         id: 1,
//     //         title: "The Future of Web Development: What's Next in 2024",
//     //         excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
//     //         author: "Sarah Johnson",
//     //         authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
//     //         coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
//     //         readTime: "5 min read",
//     //         likes: 234,
//     //         comments: 45,
//     //     },
//     //     {
//     //         id: 2,
//     //         title: "Mastering TypeScript: A Comprehensive Guide",
//     //         excerpt: "Learn how to leverage TypeScript's powerful features to write better code...",
//     //         author: "Michael Chen",
//     //         authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
//     //         coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
//     //         readTime: "8 min read",
//     //         likes: 156,
//     //         comments: 23,
//     //     },
//     // ];

//     return (
//         <div className="space-y-8">
//             <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
//             <div className="space-y-8">
//                 { blogs.map((blog) => (
//                     <article key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
//                         <img src={blog.coverImage} alt={blog.title} className="w-full h-64 object-cover" />
//                         <div className="p-6">
//                             <div className="flex items-center space-x-4 mb-4">
//                                 {/* <img src={blog.authorImage} alt={blog.author} className="w-10 h-10 rounded-full" /> */}
//                                 <div>
//                                     <h3 className="text-sm font-medium text-gray-900">{blog.author}</h3>
//                                     {/* <p className="text-sm text-gray-500">{blog.readTime}</p> */}
//                                 </div>
//                             </div>
//                             <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
//                             {/* <p className="text-gray-600 mb-4">{blog.excerpt}</p> */}
//                             <div className="flex items-center justify-between text-gray-500">
//                                 <div className="flex items-center space-x-4">
//                                     <button className="flex items-center space-x-1 hover:text-red-500">
//                                         <Heart className="h-5 w-5" />
//                                         {/* <span>{blog.likes}</span> */}
//                                     </button>
//                                     <button className="flex items-center space-x-1 hover:text-blue-500">
//                                         <MessageCircle className="h-5 w-5" />
//                                         {/* <span>{blog.comments}</span> */}
//                                     </button>
//                                 </div>
//                                 <button className="hover:text-indigo-600">
//                                     <Bookmark className="h-5 w-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     </article>
//                 ))}
//             </div>
//         </div>
//     );
// }