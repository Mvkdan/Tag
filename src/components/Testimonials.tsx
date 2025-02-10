
import React from 'react';

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Voyageuse",
    content: "Grâce à l'AirTag, j'ai retrouvé ma valise égarée à l'aéroport en quelques minutes. Un véritable gain de temps et de tranquillité !",
    image: "/placeholder.svg"
  },
  {
    name: "Thomas Dubois",
    role: "Photographe",
    content: "Je garde maintenant l'esprit tranquille en attachant un AirTag à mon matériel photo. La précision de localisation est impressionnante.",
    image: "/placeholder.svg"
  },
  {
    name: "Marie Leroux",
    role: "Mère de famille",
    content: "Plus de stress pour les clés perdues ! L'AirTag nous a sauvé tant de fois que c'est devenu un indispensable de la maison.",
    image: "/placeholder.svg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Ils ne peuvent plus s'en passer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
