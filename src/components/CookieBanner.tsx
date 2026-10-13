import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getConsent, loadMetrika, setConsent } from '@/lib/metrika';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === 'accepted') loadMetrika();
    if (consent === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: 'accepted' | 'declined') => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="container">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xl md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Мы используем файлы cookie и сервис Яндекс.Метрика для анализа посещаемости и улучшения сайта. Продолжая пользоваться сайтом, вы можете принять или отклонить их. Подробнее — в{' '}
            <Link to="/privacy" className="text-primary underline">Политике конфиденциальности</Link>.
          </p>
          <div className="flex shrink-0 gap-3">
            <Button variant="outline" onClick={() => choose('declined')}>Отклонить</Button>
            <Button onClick={() => choose('accepted')}>Принять</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
