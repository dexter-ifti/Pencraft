import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Users, Sparkles, ArrowRight, Quote, Star, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Landing() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: PenTool,
            title: "Rich Writing Experience",
            description: "Write with our powerful markdown editor featuring live preview and syntax highlighting."
        },
        {
            icon: Users,
            title: "Vibrant Community",
            description: "Connect with fellow writers and readers who share your passion for storytelling."
        },
        {
            icon: TrendingUp,
            title: "Grow Your Audience",
            description: "Built-in analytics and discovery features help your content reach the right readers."
        },
        {
            icon: Sparkles,
            title: "Beautiful Design",
            description: "Your stories deserve a beautiful home. Our clean, distraction-free design lets your words shine."
        }
    ];

    const testimonials = [
        {
            quote: "Pencraft has transformed how I share my ideas. The writing experience is simply magical.",
            author: "Sarah Chen",
            role: "Tech Writer"
        },
        {
            quote: "The community here is incredible. I've found my tribe of fellow storytellers.",
            author: "Marcus Johnson",
            role: "Fiction Author"
        },
        {
            quote: "Clean, fast, and beautiful. Everything a writer needs to focus on what matters most.",
            author: "Elena Rodriguez",
            role: "Journalist"
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Writers" },
        { number: "50K+", label: "Stories Published" },
        { number: "1M+", label: "Monthly Readers" },
        { number: "95%", label: "Writer Satisfaction" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Navigation */}
            <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <BookOpen className="h-8 w-8 text-indigo-600" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Pencraft
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/login" 
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700 mb-8 animate-bounce">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Where stories come to life
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                            Your Words,
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                                Beautifully Crafted
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of writers who trust Pencraft to share their stories, ideas, and expertise with the world. 
                            Create, publish, and grow your audience with our powerful yet simple platform.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/signup" 
                                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center"
                            >
                                Start Writing Today
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                to="/blogs" 
                                className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                            >
                                Explore Stories
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-float-delayed"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-float"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            >
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Everything you need to
                            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                tell your story
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful tools and features designed to help you create, share, and grow your writing.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className={`group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-indigo-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-16">
                        Loved by writers worldwide
                    </h2>
                    
                    <div className="relative h-48 overflow-hidden">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ${
                                    index === currentTestimonial 
                                        ? 'opacity-100 translate-x-0' 
                                        : index < currentTestimonial 
                                            ? 'opacity-0 -translate-x-full' 
                                            : 'opacity-0 translate-x-full'
                                }`}
                            >
                                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
                                    <Quote className="w-8 h-8 text-indigo-400 mx-auto mb-6" />
                                    <p className="text-xl text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                            {testimonial.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{testimonial.author}</div>
                                            <div className="text-gray-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center space-x-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial 
                                        ? 'bg-indigo-600 scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to share your story?
                    </h2>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                        Join our community of passionate writers and start creating content that matters.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/signup" 
                            className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                        >
                            Start Writing for Free
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            to="/blogs" 
                            className="text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
                        >
                            Read Stories
                        </Link>
                    </div>
                </div>
                
                {/* Animated background elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <BookOpen className="h-8 w-8 text-indigo-400" />
                                <span className="text-2xl font-bold">Pencraft</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Empowering writers to share their stories and connect with readers around the world.
                            </p>
                            <div className="flex space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                                        <Star className="w-5 h-5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Platform</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Write</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Read</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Discover</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Pencraft. All rights reserved. Made with ❤️ for writers everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}