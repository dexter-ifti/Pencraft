import { TrendingUp, Users } from 'lucide-react';

export default function Recommendations() {
    const trending = [
        {
            id: 1,
            title: "Why React Hooks are Revolutionary",
            author: "Emma Wilson",
            views: "12.5K",
        },
        {
            id: 2,
            title: "Building Scalable APIs with Node.js",
            author: "David Park",
            views: "8.2K",
        },
        {
            id: 3,
            title: "CSS Grid: A Complete Guide",
            author: "Lisa Chen",
            views: "6.7K",
        },
    ];

    const suggestedAuthors = [
        {
            id: 1,
            name: "Alex Morgan",
            role: "Senior Developer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
            followers: "15.2K",
        },
        {
            id: 2,
            name: "Rachel Kim",
            role: "UX Designer",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
            followers: "8.9K",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
                </div>
                <div className="space-y-4">
                    {trending.map((item, index) => (
                        <div key={item.id} className="flex items-start space-x-4">
                            <span className="text-2xl font-bold text-gray-300">0{index + 1}</span>
                            <div>
                                <h3 className="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">{item.author} · {item.views} views</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-bold text-gray-900">Suggested Authors</h2>
                </div>
                <div className="space-y-4">
                    {suggestedAuthors.map((author) => (
                        <div key={author.id} className="flex items-center space-x-4">
                            <img src={author.image} alt={author.name} className="w-12 h-12 rounded-full" />
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{author.name}</h3>
                                <p className="text-sm text-gray-500">{author.role}</p>
                            </div>
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}