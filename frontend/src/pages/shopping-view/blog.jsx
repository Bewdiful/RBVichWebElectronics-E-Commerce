import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'The Future of Smart Home Technology',
    excerpt: 'Explore how smart home technology is evolving and what to expect in the coming years.',
    image: 'https://images.unsplash.com/photo-1558002038-2f2273646319',
    date: '2025-03-15',
    author: 'Sarah Johnson',
    category: 'Smart Home',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Top Gaming Peripherals for Competitive Gamers',
    excerpt: 'Discover the best gaming keyboards, mice, and headsets that can give you an edge in competitive gaming.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    date: '2025-03-10',
    author: 'Mike Chen',
    category: 'Gaming',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Understanding 4K vs 8K: Do You Really Need to Upgrade?',
    excerpt: 'A detailed analysis of the differences between 4K and 8K displays and whether upgrading makes sense for you.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575',
    date: '2025-03-05',
    author: 'Jessica Lee',
    category: 'TVs',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'How to Set Up the Perfect Home Office',
    excerpt: 'Learn how to create a productive and comfortable home office with the right tech and ergonomics.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    date: '2025-02-28',
    author: 'David Wilson',
    category: 'Productivity',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'The Ultimate Guide to Wireless Headphones',
    excerpt: 'Everything you need to know before buying your next pair of wireless headphones.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    date: '2025-02-20',
    author: 'Emily Roberts',
    category: 'Audio',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Tech Trends to Watch in 2025',
    excerpt: 'From AI to biotechnology, these are the technological innovations that will shape our future.',
    image: 'https://images.unsplash.com/photo-1496065187959-7f07b8353c55',
    date: '2025-02-15',
    author: 'Robert Zhang',
    category: 'Technology',
    readTime: '9 min read'
  }
];

const categories = [
  'All',
  'Technology',
  'Gaming',
  'Audio',
  'Smart Home',
  'Productivity',
  'TVs'
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="bg-gradient-to-b from-[#3f2a8f] to-[#431865] min-h-screen">
      <div className="bg-gradient-to-r from-[#3f2a8f]/90 to-[#431865]/90 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-gray-300 text-xl">
            Stay updated with the latest tech news, guides, and reviews
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-12 bg-gradient-to-b from-[#3f2a8f] to-[#431865] py-4 rounded-md shadow-md">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={selectedCategory === category
                ? 'bg-[#a78bfa] text-white hover:bg-[#8b5cf6]'
                : 'border-[#a78bfa]/40 text-gray-300 hover:bg-[#3f2a8f]/50 hover:text-white'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-[#3f2a8f]/50 rounded-xl overflow-hidden shadow-lg group border border-[#431865]/50">
              <Link to={`/blog/${post.id}`} className="block">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-[#a78bfa]/20 text-[#a78bfa] text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-300 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <Link to={`/blog/${post.id}`} className="block">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>

                  <Link to={`/blog/${post.id}`} className="text-[#a78bfa] hover:text-[#8b5cf6] text-sm font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-[#3f2a8f] to-[#431865] rounded-xl p-8 shadow-xl border border-[#431865]/50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Subscribe to Our Blog
            </h3>
            <p className="text-[#a78bfa] mb-8">
              Stay updated with our latest tech articles, guides, and product reviews.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-[#3f2a8f]/70 border-[#431865]/50 text-white placeholder:text-[#a78bfa]/70"
                required
              />
              <Button className="bg-[#a78bfa] text-[#3f2a8f] hover:bg-[#8b5cf6] hover:text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;