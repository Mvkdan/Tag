
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Comment protéger votre AirTag",
    content: `
      <p>Les AirTags d'Apple sont devenus un accessoire indispensable pour garder une trace de vos objets importants. Voici quelques conseils essentiels pour protéger votre AirTag :</p>
      
      <h2>1. Utilisez une protection adaptée</h2>
      <p>La première étape consiste à choisir une protection adaptée à votre utilisation. Notre gamme propose différentes options selon vos besoins.</p>
      
      <h2>2. Évitez l'exposition aux éléments</h2>
      <p>Même si l'AirTag est résistant à l'eau, il est préférable de le protéger des éléments extérieurs pour prolonger sa durée de vie.</p>
      
      <h2>3. Maintenance régulière</h2>
      <p>Nettoyez régulièrement votre protection et vérifiez l'état de votre AirTag pour prévenir toute détérioration.</p>
    `,
    author: "Admin",
    date: "20 Février 2024",
    readTime: "5 min",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Les nouveautés de notre gamme",
    content: `
      <p>Découvrez les dernières innovations de notre collection de protections pour AirTag. Nous avons le plaisir de vous présenter nos nouveaux produits.</p>
      
      <h2>Nouvelle collection Premium</h2>
      <p>Notre nouvelle collection Premium allie style et protection maximale pour votre AirTag.</p>
      
      <h2>Protection renforcée</h2>
      <p>Nous avons amélioré la résistance de nos protections tout en conservant leur esthétique unique.</p>
    `,
    author: "Admin",
    date: "19 Février 2024",
    readTime: "3 min",
    image: "/placeholder.svg"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Button>
        </Link>

        <article className="max-w-3xl mx-auto">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />

          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

          <div className="flex items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost;
