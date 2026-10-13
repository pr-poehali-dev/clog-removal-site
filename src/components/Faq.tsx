import { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faq = [
  { q: 'Сколько стоит прочистка канализации в Хабаровске?', a: 'Электромеханическая прочистка и гибкий вал — от 1 500 ₽, пневматическая — от 2 000 ₽, гидродинамическая и телеинспекция — от 2 500 ₽. Точная стоимость зависит от сложности засора и называется мастером до начала работ.' },
  { q: 'Как быстро приедет мастер?', a: 'Выезжаем в течение 40 минут по Хабаровску. Дежурная бригада работает круглосуточно, включая выходные и праздники.' },
  { q: 'Работаете ли вы ночью и в выходные?', a: 'Да, мы работаем 24/7. Ночной выезд и работа в выходные не требуют доплаты за срочность.' },
  { q: 'Как определить, какой метод прочистки нужен?', a: 'Для бытовых засоров в раковине, ванне и унитазе обычно хватает троса или гибкого вала. Жировые пробки и отложения в стояках убирает гидродинамика. Если причина неясна, проводим видеодиагностику трубы.' },
  { q: 'Можно ли прочистить канализацию без вскрытия труб и стен?', a: 'Да. Все наши методы работают изнутри трубы через ревизии, сифоны и колодцы, поэтому ломать стены и полы не нужно.' },
  { q: 'Выезжаете ли вы за пределы Хабаровска?', a: 'Да, обслуживаем Хабаровск и пригород. Стоимость выезда за город уточняйте по телефону +7 (929) 413-27-27.' },
  { q: 'Даёте ли вы гарантию на работы?', a: 'Да. Если засор вернулся по причине некачественной работы, повторно устраняем его бесплатно.' },
];

const Faq = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="faq" className="py-24">
      <div className="container max-w-3xl">
        <div className="mb-12 text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">Частые вопросы</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6">
              <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
