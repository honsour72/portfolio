import type { CvContent } from '../lib/types';

import { externalLinks } from './portfolio';

export const cvByLocale: Record<'en' | 'ru', CvContent> = {
  en: {
    locale: 'en',
    name: 'Mikhail Rogozin',
    role: 'Senior Backend Engineer · Python & Go',
    email: 'm@rogozin-pro.ru',
    location: 'Saint Petersburg, Russia · Open to relocation',
    summary:
      'Backend engineer with 6+ years in software development. I build services in Go and Python and take responsibility for architecture, implementation, reviews and delivery.',
    links: [
      { label: 'LinkedIn', href: externalLinks.linkedin },
      { label: 'Telegram', href: externalLinks.telegram },
      { label: 'Habr', href: externalLinks.habr },
      { label: 'Portfolio', href: 'https://m-rogozin.ru/en/' },
    ],
    skills: [
      { title: 'Backend', items: ['Go', 'Python', 'REST', 'internal RPC', 'microservices'] },
      { title: 'Data and messaging', items: ['PostgreSQL', 'Kafka', 'Redis', 'MySQL', 'MongoDB'] },
      {
        title: 'Architecture',
        items: ['Domain modelling', 'Clean Architecture', 'Domain-Driven Design', 'API design'],
      },
      {
        title: 'Production',
        items: ['CI/CD', 'metrics', 'dashboards', 'alerts', 'SLI/SLO', 'Docker'],
      },
    ],
  },
  ru: {
    locale: 'ru',
    name: 'Михаил Рогозин',
    role: 'Senior Backend Engineer · Python & Go',
    email: 'm@rogozin-pro.ru',
    location: 'Санкт-Петербург, Россия · Готов к релокации',
    summary:
      'Backend-инженер с опытом разработки более шести лет. Создаю сервисы на Go и Python, отвечаю за архитектуру, реализацию, ревью и выпуск.',
    links: [
      { label: 'LinkedIn', href: externalLinks.linkedin },
      { label: 'Telegram', href: externalLinks.telegram },
      { label: 'Habr', href: externalLinks.habr },
      { label: 'Портфолио', href: 'https://m-rogozin.ru/ru/' },
    ],
    skills: [
      { title: 'Backend', items: ['Go', 'Python', 'REST', 'внутренний RPC', 'микросервисы'] },
      { title: 'Данные и очереди', items: ['PostgreSQL', 'Kafka', 'Redis', 'MySQL', 'MongoDB'] },
      {
        title: 'Архитектура',
        items: ['Доменное моделирование', 'Clean Architecture', 'Domain-Driven Design', 'API design'],
      },
      {
        title: 'Production',
        items: ['CI/CD', 'метрики', 'дашборды', 'алерты', 'SLI/SLO', 'Docker'],
      },
    ],
  },
};
