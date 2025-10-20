import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaBullhorn, FaCamera, FaPrint, FaVideo, FaMobile } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaPalette,
      title: 'Branding',
      description: 'Complete brand identity design including logos, color schemes, and brand guidelines.'
    },
    {
      icon: FaBullhorn,
      title: 'Digital Campaigns',
      description: 'Creative digital marketing materials for online campaigns and social media.'
    },
    {
      icon: FaMobile,
      title: 'Social Media Design',
      description: 'Eye-catching social media posts, stories, and promotional graphics.'
    },
    {
      icon: FaPrint,
      title: 'Print Design',
      description: 'Professional print materials including brochures, flyers, and business cards.'
    },
    {
      icon: FaCamera,
      title: 'Photography',
      description: 'Creative photography services for products, events, and portraits.'
    },
    {
      icon: FaVideo,
      title: 'Video Editing',
      description: 'Professional video editing and motion graphics for various media.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive design solutions to elevate your brand and engage your audience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <service.icon className="text-2xl text-accent" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;