import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Brand Identity Design",
      excerpt: "Exploring emerging trends and technologies shaping the future of brand identity design in 2024 and beyond.",
      author: "Samuel Paul",
      date: "March 15, 2024",
      image: "/api/placeholder/400/250",
      category: "Design Trends"
    },
    {
      id: 2,
      title: "Color Psychology in Digital Marketing",
      excerpt: "How color choices impact consumer behavior and conversion rates in digital marketing campaigns.",
      author: "Samuel Paul", 
      date: "March 10, 2024",
      image: "/api/placeholder/400/250",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Minimalism vs. Maximalism in Design",
      excerpt: "Understanding when to use minimalist or maximalist approaches in your design projects for maximum impact.",
      author: "Samuel Paul",
      date: "March 5, 2024", 
      image: "/api/placeholder/400/250",
      category: "Design Theory"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest design trends, tips, and industry insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <span className="text-gray-500">Blog Image</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaUser className="text-xs" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaCalendar className="text-xs" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  className="flex items-center space-x-2 text-accent hover:text-accent/80 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>Read More</span>
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;