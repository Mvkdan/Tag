
import React from 'react';

const images = [
  {
    src: "/photo-1487887235947-a955ef187fcc",
    alt: "AirTag Lifestyle 1"
  },
  {
    src: "/photo-1434494878577-86c23bcb06b9",
    alt: "AirTag Lifestyle 2"
  },
  {
    src: "/photo-1486312338219-ce68d2c6f44d",
    alt: "AirTag Lifestyle 3"
  }
];

const StyleProtection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">
          Style & Protection
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleProtection;
