import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/51f4efe0-93b9-4995-b57f-775c3dbde70c.jpg';
const BEFORE_IMG = 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/f49b364a-5ea1-490d-b05d-8c663e1b9a7c.jpg';
const AFTER_IMG = 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/63e1c469-b533-403c-95cc-cb2a770b3af3.jpg';

const hydroPhotos = [
  { url: 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/3cce8aca-f2f9-4908-87d4-2383f71aac83.jpg', title: 'Промывка внутри трубы', desc: 'Струя воды под давлением 200 бар разрушает отложения' },
  { url: 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/ea2f5436-65e3-48f7-8e31-b7aa8ae24a50.jpg', title: 'Работа на объекте', desc: 'Мастер подключает гидродинамическую установку к колодцу' },
  { url: 'https://cdn.poehali.dev/projects/faeede83-1619-4dcf-96bf-a71e66dabfc2/files/48b5e7fe-ca08-4510-b522-c833588eb555.jpg', title: 'Форсунка в трубе', desc: 'Роторная насадка очищает стенки трубы по всей длине' },
];

const methods = [
  { icon: 'Waves', title: 'Гидродинамика', desc: 'Промывка под высоким давлением водой до 200 бар. Удаляет жир, ил и отложения без вреда трубам.' },
  { icon: 'Cable', title: 'Механический трос', desc: 'Стальной трос с насадками пробивает плотные засоры, корни и инородные предметы в трубах.' },
  { icon: 'Video', title: 'Видеодиагностика', desc: 'Камера обследует трубу изнутри. Точно находим место и причину засора без вскрытия стен.' },
  { icon: 'Zap', title: 'Термическая промывка', desc: 'Горячая вода растворяет жировые пробки в кухонных и ресторанных коммуникациях.' },
];

const services = [
  { icon: 'Siren', title: 'Аварийный вызов 24/7', price: 'от 1 500 ₽' },
  { icon: 'Building2', title: 'Прочистка стояков', price: 'от 3 000 ₽' },
  { icon: 'Home', title: 'Засор в квартире', price: 'от 1 500 ₽' },
  { icon: 'Factory', title: 'Промышленные сети', price: 'договорная' },
  { icon: 'TreePine', title: 'Удаление корней', price: 'от 4 000 ₽' },
  { icon: 'Search', title: 'Видеодиагностика', price: 'от 2 500 ₽' },
];

const reviews = [
  { name: 'Андрей М.', text: 'Приехали через 40 минут после звонка ночью. Засор в стояке устранили за час. Спасибо!', rating: 5 },
  { name: 'Ольга К.', text: 'Кафе стояло из-за жировой пробки. Промыли гидродинамикой — всё работает идеально.', rating: 5 },
  { name: 'Сергей В.', text: 'Долго мучились с засором, другие не справились. Эти нашли корни через камеру и убрали.', rating: 5 },
];

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-primary/30 select-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      <img src={AFTER_IMG} alt="После" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute bottom-4 right-4 z-10 rounded-full bg-primary px-4 py-1 font-display text-sm font-semibold text-primary-foreground">ПОСЛЕ</div>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={BEFORE_IMG} alt="До" className="absolute inset-0 h-full max-w-none object-cover" style={{ width: ref.current?.offsetWidth || '100%' }} />
        <div className="absolute bottom-4 left-4 rounded-full bg-accent px-4 py-1 font-display text-sm font-semibold text-accent-foreground">ДО</div>
      </div>

      <div className="absolute top-0 bottom-0 z-20 w-1 bg-primary" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Icon name="MoveHorizontal" size={20} />
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const nav = ['Услуги', 'Методы', 'Портфолио', 'Отзывы', 'Контакты'];
  const navIds = ['services', 'methods', 'portfolio', 'reviews', 'contacts'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full glass border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <Icon name="Droplets" className="text-primary" size={26} />
            ЗАСОР <span className="text-primary">27</span>
          </div>
          <nav className="hidden gap-7 md:flex">
            {nav.map((n, i) => (
              <a key={n} href={`#${navIds[i]}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{n}</a>
            ))}
          </nav>
          <a href="tel:+79294132727">
            <Button className="font-display font-semibold">
              <Icon name="Phone" size={16} /> Вызвать
            </Button>
          </a>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden pt-16 grid-bg">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary/20 blur-[100px] animate-glow" />

        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Работаем круглосуточно 24/7
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] md:text-7xl">
              Аварийное<br />устранение<br /><span className="text-primary text-glow">засоров</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Профессиональная прочистка и промывка канализации. Приезжаем за 40 минут, работаем без грязи и вскрытия стен.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contacts">
                <Button size="lg" className="h-12 px-7 font-display text-base font-semibold">
                  <Icon name="Phone" size={18} /> Вызвать мастера
                </Button>
              </a>
              <a href="#methods">
                <Button size="lg" variant="outline" className="h-12 border-primary/40 px-7 font-display text-base font-semibold hover:bg-primary/10">
                  Методы прочистки
                </Button>
              </a>
            </div>
            <div className="mt-10 flex gap-8">
              {[['12 лет', 'на рынке'], ['40 мин', 'выезд'], ['5000+', 'заказов']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-primary">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Услуги</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">Что мы прочищаем</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/50 hover:-translate-y-1">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 font-display text-lg font-semibold text-primary">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="methods" className="border-y border-border bg-secondary/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Технологии</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">Методы прочистки</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {methods.map((m, i) => (
              <div key={m.title} className="flex gap-5 rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/50">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon name={m.icon} size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm text-primary">0{i + 1}</span>
                    <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Портфолио</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">До и после</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Перетащите ползунок, чтобы увидеть результат нашей работы</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <BeforeAfter />
            <div className="mt-10 mb-4">
              <h3 className="font-display text-2xl font-bold uppercase">Гидродинамическая промывка</h3>
              <p className="mt-1 text-muted-foreground">Фотографии с наших объектов</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 mb-10">
              {hydroPhotos.map((p) => (
                <div key={p.title} className="group relative overflow-hidden rounded-2xl border border-border">
                  <img src={p.url} alt={p.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h4 className="font-display font-semibold text-foreground">{p.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ['MapPin', 'Жилой дом', 'Промывка стояка гидродинамикой, устранён засор на 5 этажах'],
                ['UtensilsCrossed', 'Ресторан', 'Удаление жировой пробки термической промывкой'],
                ['Trees', 'Частный дом', 'Прорезка корней дерева в наружной канализации'],
              ].map(([icon, t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-card p-5">
                  <Icon name={icon} className="mb-3 text-primary" size={22} />
                  <h4 className="font-display font-semibold">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="border-y border-border bg-secondary/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Отзывы</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">Нам доверяют</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl border border-border bg-card p-7">
                <div className="mb-3 flex gap-0.5 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => <Icon key={i} name="Star" size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted-foreground">«{r.text}»</p>
                <p className="mt-4 font-display font-semibold">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 md:p-16 grid-bg">
            <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-primary/20 blur-[80px] animate-glow" />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-5xl">
                  Засор?<br /><span className="text-primary text-glow">Звоните сейчас</span>
                </h2>
                <p className="mt-4 text-muted-foreground">Дежурная бригада на связи круглосуточно. Выезд в течение 40 минут по городу.</p>
                <div className="mt-8 space-y-4">
                  {[['Phone', '+7 (929) 413-27-27'], ['Mail', 'info@akvaprochist.ru'], ['MapPin', 'Москва и область, выезд 24/7']].map(([icon, txt]) => (
                    <div key={txt} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon name={icon} size={18} />
                      </div>
                      <span className="font-medium">{txt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-7">
                <h3 className="font-display text-xl font-semibold">Оставить заявку</h3>
                <div className="mt-5 space-y-4">
                  <input placeholder="Ваше имя" className="h-12 w-full rounded-lg border border-input bg-secondary/50 px-4 outline-none focus:border-primary" />
                  <input placeholder="Телефон" className="h-12 w-full rounded-lg border border-input bg-secondary/50 px-4 outline-none focus:border-primary" />
                  <textarea placeholder="Опишите проблему" rows={3} className="w-full rounded-lg border border-input bg-secondary/50 px-4 py-3 outline-none focus:border-primary" />
                  <Button className="h-12 w-full font-display text-base font-semibold">Вызвать мастера</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="Droplets" className="text-primary" size={22} />
            ЗАСОР <span className="text-primary">27</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Засор 27. Аварийная прочистка канализации 24/7</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;