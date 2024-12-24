import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Image, Link, Tags, X } from 'lucide-react';
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
    const navigate = useNavigate();

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

    const handleSubmit = async () => {
        const blog = {
            title, description : content
        };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                blog,
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(response.data);    
            navigate(`/blog/${response.data.post.id}`);
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        {/* Cover Image Input */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <Image className="w-5 h-5" />
                                <span>Cover Image URL</span>
                            </label>
                            <input
                                type="text"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                placeholder="Enter image URL..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {coverImage && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Title Input */}
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your title..."
                                className="w-full px-4 py-3 text-2xl font-bold border-0 focus:ring-0 focus:outline-none"
                            />
                        </div>

                        {/* Tags Input */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <Tags className="w-5 h-5" />
                                <span>Tags</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Add tags..."
                                    className="flex-grow px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Markdown Editor */}
                        <div data-color-mode="light" className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <Link className="w-5 h-5" />
                                <span>Content</span>
                            </label>
                            <MDEditor
                                value={content}
                                onChange={(val) => setContent(val || '')}
                                preview="edit"
                                height={400}
                                className="w-full"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                Save Draft
                            </button>
                            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" onClick={handleSubmit}>
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}