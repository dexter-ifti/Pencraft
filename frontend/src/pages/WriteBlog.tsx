import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Image, Link, Tags, X, Save, Send, Eye, Sparkles, BookOpen, PenTool, Clock, Target } from 'lucide-react';
import { Navbar } from '../components';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function WriteBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [readTime, setReadTime] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Calculate word count and read time
        const words = content.replace(/[^\w\s]/gi, '').split(/\s+/).filter(word => word.length > 0).length;
        setWordCount(words);
        setReadTime(Math.ceil(words / 200)); // Average reading speed: 200 words per minute
    }, [content]);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentTag.trim() !== '') {
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSaveDraft = async () => {
        setIsSaving(true);
        // Simulate save draft functionality
        setTimeout(() => {
            setIsSaving(false);
            // Show success message
        }, 1000);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both title and content before publishing.');
            return;
        }

        setIsPublishing(true);
        const blog = {
            title, 
            description: content
        };
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                blog,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(response.data);    
            navigate(`/blog/${response.data.post.id}`);
        } catch (error) {
            console.log(error);
            alert('Failed to publish your story. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    };

    const suggestedTags = ['Technology', 'Programming', 'Design', 'Career', 'Startup', 'AI', 'Web Development', 'Tutorial'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-10 animate-float-delayed"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-5 animate-pulse"></div>
                
                {/* Floating writing elements */}
                <div className="absolute top-20 left-20 text-4xl opacity-5 animate-float">✍️</div>
                <div className="absolute bottom-20 right-20 text-3xl opacity-5 animate-float-delayed">📝</div>
                <div className="absolute top-1/2 left-10 text-2xl opacity-5 animate-pulse">💡</div>
            </div>

            <div className="relative z-10">
                <Navbar />
                
                {/* Hero Section */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700 mb-6 animate-bounce">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Share Your Story
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Craft Your
                                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                    Masterpiece
                                </span>
                            </h1>
                            
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                Transform your ideas into compelling stories that inspire and engage readers worldwide.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Writing Stats */}
                <section className="px-4 pb-8">
                    <div className="container mx-auto max-w-4xl">
                        <div className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20 p-4 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <PenTool className="w-4 h-4 text-indigo-500" />
                                    <span className="font-medium">{wordCount}</span>
                                    <span>words</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-green-500" />
                                    <span className="font-medium">{readTime}</span>
                                    <span>min read</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Target className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium">{tags.length}</span>
                                    <span>tags</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <BookOpen className="w-4 h-4 text-orange-500" />
                                    <span className="font-medium">{title.length > 0 ? 'Ready' : 'Draft'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Editor */}
                <div className="container mx-auto px-4 pb-16 max-w-4xl">
                    <div className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-8 space-y-8">
                            {/* Cover Image Section */}
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800">
                                    <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                                        <Image className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Cover Image</span>
                                </label>
                                <input
                                    type="text"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    placeholder="Paste your image URL here to make your story stand out..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-700 placeholder-gray-500"
                                />
                                {coverImage && (
                                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
                                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )}
                            </div>

                            {/* Title Section */}
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800">
                                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Write a compelling title that captures your story..."
                                    className="w-full px-4 py-4 text-2xl font-bold border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-900 placeholder-gray-400"
                                />
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                            </div>

                            {/* Tags Section */}
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800">
                                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                                        <Tags className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Tags</span>
                                </label>
                                
                                {/* Current Tags */}
                                <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200 hover:shadow-md transition-all duration-200"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="ml-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder={tags.length === 0 ? "Add tags to help readers find your story..." : "Add more tags..."}
                                        className="flex-grow min-w-[200px] px-2 py-1 border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                
                                {/* Suggested Tags */}
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Suggested tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedTags.filter(tag => !tags.includes(tag)).slice(0, 6).map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => setTags([...tags, tag])}
                                                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 rounded-full transition-all duration-200 hover:scale-105"
                                            >
                                                + {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Editor */}
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800">
                                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <PenTool className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Content</span>
                                </label>
                                <div data-color-mode="light" className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    <MDEditor
                                        value={content}
                                        onChange={(val) => setContent(val || '')}
                                        preview="edit"
                                        height={500}
                                        className="w-full"
                                        data-color-mode="light"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 text-center">
                                    💡 Tip: Use markdown formatting to make your content more engaging. Add headers, lists, links, and more!
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-gray-50/80 backdrop-blur-sm px-8 py-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={handleSaveDraft}
                                        disabled={isSaving}
                                        className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Save Draft</span>
                                            </>
                                        )}
                                    </button>
                                    
                                    <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 hover:scale-105">
                                        <Eye className="w-4 h-4" />
                                        <span>Preview</span>
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isPublishing || !title.trim() || !content.trim()}
                                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isPublishing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Publishing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Publish Story</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    By publishing, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-700">Community Guidelines</a> and <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}