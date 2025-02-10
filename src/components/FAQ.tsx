
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quelle est l'autonomie de l'AirTag ?",
    answer: "L'AirTag dispose d'une autonomie d'environ un an. La batterie est facilement remplaçable lorsque nécessaire."
  },
  {
    question: "L'AirTag est-il étanche ?",
    answer: "Oui, l'AirTag est certifié IP67, ce qui signifie qu'il est résistant à l'eau jusqu'à 1 mètre pendant 30 minutes."
  },
  {
    question: "Combien d'AirTags puis-je utiliser ?",
    answer: "Vous pouvez associer jusqu'à 16 AirTags à un seul identifiant Apple."
  },
  {
    question: "L'AirTag fonctionne-t-il avec Android ?",
    answer: "L'AirTag est conçu pour fonctionner avec les appareils iOS. Les utilisateurs Android peuvent cependant scanner un AirTag trouvé pour identifier son propriétaire."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Questions fréquentes
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
