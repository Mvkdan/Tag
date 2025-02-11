
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Comment protéger votre AirTag",
    excerpt: "Découvrez nos conseils pour protéger efficacement votre AirTag et prolonger sa durée de vie.",
    author: "Admin",
    date: "20 Février 2024",
    readTime: "5 min",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Les nouveautés de notre gamme",
    excerpt: "Explorez les dernières innovations de notre collection de protections pour AirTag.",
    author: "Admin",
    date: "19 Février 2024",
    readTime: "3 min",
    image: "/placeholder.svg"
  }
];

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Notre Blog</h1>
          <p className="text-gray-600">Découvrez nos derniers articles et actualités</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link to={`/blog/${article.id}`}>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Lire l'article
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
