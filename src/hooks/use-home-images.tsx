
import { useState, useEffect } from "react";

export interface HomeImage {
  id: string;
  title: string;
  url: string;
  category: 'hero' | 'features' | 'career-paths' | 'testimonials' | 'cta';
  description?: string;
  alt?: string;
}

const defaultImages: HomeImage[] = [
  {
    id: '1',
    title: 'Software Development Career',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=600',
    category: 'career-paths',
    description: 'Professional working on software development',
    alt: 'Software developer at work'
  },
  {
    id: '2',
    title: 'Data Science Analytics',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=600',
    category: 'career-paths',
    description: 'Data visualization and analytics workspace',
    alt: 'Data science workspace'
  },
  {
    id: '3',
    title: 'Product Management Strategy',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=600',
    category: 'career-paths',
    description: 'Strategic planning and product development',
    alt: 'Product management workspace'
  },
  {
    id: '4',
    title: 'Maria Rodriguez Testimonial',
    url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&h=400',
    category: 'testimonials',
    description: 'Professional headshot for testimonial',
    alt: 'Maria Rodriguez'
  },
  {
    id: '5',
    title: 'James Wilson Testimonial',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400',
    category: 'testimonials',
    description: 'Professional headshot for testimonial',
    alt: 'James Wilson'
  },
  {
    id: '6',
    title: 'Sarah Johnson Testimonial',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400',
    category: 'testimonials',
    description: 'Professional headshot for testimonial',
    alt: 'Sarah Johnson'
  }
];

export const useHomeImages = () => {
  const [homeImages, setHomeImages] = useState<HomeImage[]>(defaultImages);

  const addImage = (image: Omit<HomeImage, 'id'>) => {
    const newImage: HomeImage = {
      ...image,
      id: Math.random().toString(36).substr(2, 9)
    };
    setHomeImages(prev => [...prev, newImage]);
  };

  const updateImage = (id: string, updates: Partial<HomeImage>) => {
    setHomeImages(prev => 
      prev.map(img => img.id === id ? { ...img, ...updates } : img)
    );
  };

  const deleteImage = (id: string) => {
    setHomeImages(prev => prev.filter(img => img.id !== id));
  };

  const getImagesByCategory = (category: HomeImage['category']) => {
    return homeImages.filter(img => img.category === category);
  };

  return {
    homeImages,
    addImage,
    updateImage,
    deleteImage,
    getImagesByCategory
  };
};
