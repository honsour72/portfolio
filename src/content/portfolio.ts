import type { PortfolioContent } from '../lib/types';

export const externalLinks = {
  email: 'mailto:m@rogozin-pro.ru',
  linkedin: 'https://www.linkedin.com/in/michael-rogozin/',
  telegram: 'https://t.me/honsour72',
  telegramChannel: 'https://t.me/it_helper_s',
  habr: 'https://habr.com/ru/users/honsour72/',
  github: 'https://github.com/honsour72',
  youtube: 'https://www.youtube.com/@ITHelpers170',
  profi: 'https://profi.ru/profile/RogozinMU/',
  evgeniKoifman: 'https://www.linkedin.com/in/evgeni-koifman-8a76141/',
  avivShemesh: 'https://www.linkedin.com/in/aviv-shemesh/',
  avitoCompany: 'https://www.avito.ru/company',
  alarStudios: 'https://www.linkedin.com/company/alar-studios',
  groupIb: 'https://www.group-ib.com/',
  lumos: 'https://lumoss.ru/',
  codeClass: 'https://code-class.ru/',
  itmoFitp: 'https://fitp.itmo.ru/',
} as const;

export const portfolioByLocale: Record<'en' | 'ru', PortfolioContent> = {
  en: {
    locale: 'en',
    seo: {
      title: 'Mikhail Rogozin | Senior Backend Engineer',
      description:
        'Senior Backend Engineer working with Go, Python and PostgreSQL. Experience in workforce budgeting, on-premise observability and security products. Based in Saint Petersburg and open to relocation.',
    },
    navigation: [
      { id: 'work', label: 'Work' },
      { id: 'experience', label: 'Experience' },
      { id: 'teaching', label: 'Teaching' },
      { id: 'writing', label: 'Writing' },
      { id: 'awards', label: 'Awards' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    cvMenu: {
      label: 'Download CV',
      compact: 'Compact CV, 1 page',
      extended: 'Extended CV, 2 pages',
    },
    hero: {
      eyebrow: 'Backend engineering',
      name: 'Mikhail Rogozin',
      role: 'Senior Backend Engineer · Python & Go',
      summary:
        'I build backend systems in Go and Python. My experience covers workforce budgeting, on-premise observability and security products.',
      location: 'Based in Saint Petersburg, Russia. Open to relocation.',
      primaryAction: 'View case studies',
      secondaryAction: 'Download CV',
    },
    evidenceStrip: [
      { label: 'Currently', value: 'Avito', href: externalLinks.avitoCompany },
      { label: 'Experience', value: '6+ years in software development' },
      { label: 'Core', value: 'Python and Go' },
      { label: 'Writing', value: '3 articles, 325K+ combined views' },
    ],
    selectedWorkTitle: 'Featured engineering case studies',
    experienceTitle: 'Experience',
    experience: [
      {
        company: 'Avito',
        companyUrl: externalLinks.avitoCompany,
        role: 'Backend Engineer, L4',
        period: 'November 2024 to present',
        paragraphs: [
          'I work on an internal workforce budgeting platform used by C&B, FP&A and HR administration teams. My scope covers backend architecture, implementation, reviews, releases and production reliability across several Go services.',
          'Since summer 2025, I have acted as technical lead in a group of four backend engineers, including myself. I break down work, review designs and code, and remain an individual contributor.',
        ],
        stack: ['Go', 'PostgreSQL', 'Kafka', 'REST', 'internal RPC', 'CI/CD', 'Kubernetes', 'Helm'],
      },
      {
        company: 'Alar Studios',
        companyUrl: externalLinks.alarStudios,
        role: 'Senior Software Engineer (Python)',
        period: 'August 2023 to September 2024',
        paragraphs: [
          'I worked on SCAILIUM and owned the backend and automated tests for its customer diagnostics project. I proposed the solution, built the Python service and Docker Compose distribution, prepared dashboards and documentation, and continued supporting the project after its first release.',
          'I also expanded the automated test suite and helped engineers who were new to the codebase.',
        ],
        stack: [
          'Python',
          'Flask',
          'PostgreSQL',
          'SCAILIUM',
          'MongoDB',
          'Grafana',
          'Loki',
          'Prometheus',
          'Tempo',
          'Docker Compose',
        ],
      },
      {
        company: 'Group-IB',
        companyUrl: externalLinks.groupIb,
        role: 'Middle Python Backend Developer',
        period: 'August 2022 to June 2023',
        paragraphs: [
          'I developed the backend flow for analysing PDF attachments in Managed XDR. The service opened documents in an isolated virtual machine, simulated user actions, collected the resulting data and passed it to analyst-defined detection rules.',
          'During a two-month pilot across three companies, the system processed about 80 GB of PDF files, including customer test environments. Analysts confirmed malicious files in 37% of the pilot sample, with false positives below 1% of detections. The feature was released for all customers.',
        ],
        stack: ['Python 2.7', 'MySQL', 'MongoDB', 'Docker', 'Ubuntu'],
      },
      {
        company: 'Lumos',
        companyUrl: externalLinks.lumos,
        role: 'Python Backend Developer',
        period: 'January 2021 to May 2022',
        paragraphs: [
          "I was the only developer on a small excursion booking website. I implemented a location-first recommendation ranking based on the user's city, interests, history, age and ratings, then released it in about one month.",
          'I also maintained the backend and made small frontend changes when needed.',
        ],
        stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'Docker Compose'],
      },
      {
        company: 'CodeClass',
        companyUrl: externalLinks.codeClass,
        role: 'Instructor, later Junior Developer',
        period: 'January 2019 to December 2020',
        paragraphs: [
          "I taught Python, JavaScript, Unity and introductory C# to two small groups. During the last months of the project, I also made small Python and frontend changes to the company's website. A senior developer handled production releases.",
        ],
        compact: true,
      },
      {
        company: 'Independent work',
        role: 'Independent Python Developer',
        period: '2018 to 2020',
        paragraphs: [
          'For a private client, I built a Python pipeline that found and downloaded thousands of public real-estate declarations from dom.rf, extracted text from the PDF files, normalised the data and exported it to Excel.',
          'I also developed a calculation tool for a large basketball dataset containing teams, matches and scores by round.',
        ],
        compact: true,
      },
    ],
    technical: {
      title: 'Technical profile',
      groups: [
        { title: 'Backend', items: ['Go', 'Python', 'REST', 'internal RPC', 'microservices'] },
        { title: 'Data and messaging', items: ['PostgreSQL', 'Kafka', 'Redis', 'MySQL', 'MongoDB'] },
        {
          title: 'Architecture',
          items: ['Domain modelling', 'Clean Architecture', 'Domain-Driven Design', 'service boundaries', 'API design'],
        },
        {
          title: 'Production',
          items: ['CI/CD', 'metrics', 'dashboards', 'alerts', 'SLI/SLO', 'Docker', 'working knowledge of Kubernetes and Helm'],
        },
        { title: 'Testing', items: ['Unit tests', 'integration tests', 'automated scenarios', 'code review'] },
      ],
    },
    teaching: {
      title: 'Teaching and mentoring',
      entries: [
        {
          heading: 'Lecturer · ITMO University',
          headingUrl: externalLinks.itmoFitp,
          period: 'February 2025 to present',
          paragraphs: [
            "I teach Go Programming and Software Architecture/System Design to 80 third-year bachelor's students in the Avito Start programme at the Faculty of Information Technologies and Programming.",
            'I have delivered 10 lectures and 13 practical sessions, authored 20 learning materials, and assessed laboratory work, projects and exams.',
          ],
        },
        {
          heading: 'Independent Python Mentor',
          period: '2018 to present',
          paragraphs: [
            'I work one to one with students and developers on Python, backend development and interview preparation. My independent practice has included more than 50 students and clients.',
          ],
          proof: '4.67/5 · 27 client reviews on Profi.ru',
          link: { label: 'View Profi.ru profile', href: externalLinks.profi },
        },
      ],
    },
    publicWork: {
      title: 'Articles and public work',
      featured: {
        label: 'PostgreSQL and SQL',
        title: 'SQL and PostgreSQL notes for backend interviews',
        copy: 'A practical Russian-language guide to transactions, isolation levels, indexes and query planning.',
        metric: '275K+ views',
        link: { label: 'Read on Habr', href: 'https://habr.com/ru/articles/745948/' },
      },
      channels: [
        { name: 'Habr', metric: '3 technical articles, 325K+ combined views', href: externalLinks.habr },
        { name: 'YouTube', metric: '1K+ subscribers', href: externalLinks.youtube },
        { name: 'Telegram', metric: '180+ subscribers', href: externalLinks.telegramChannel },
      ],
    },
    awardsTitle: 'Hackathons',
    awards: [
      {
        id: 'startup-hackathon-2021',
        event: 'Startup Hackathon 2021',
        title: '1st place in the Group-IB track',
        copy: [
          'I built the Python and Tkinter application layer, integrated the team\'s recognition model and presented the result. The win led to a technical interview and an offer from Group-IB.',
        ],
        team: 'Three people · Team bbyby',
        certificatePdf: '/files/certificates/startup-hackathon-2021.pdf',
        certificateImage: '/images/certificates/startup-hackathon-2021.png',
      },
      {
        id: 'leaders-digital-transformation-2023',
        event: 'Leaders of Digital Transformation 2023',
        title: '1st place in the Aeroflot challenge',
        copy: [
          'Our three-person team built a recommendation service for forecasting flight demand. I developed and deployed the Streamlit application, prepared the data visualisations and file-upload flow, and represented the team at the final presentation.',
          'The team received a total prize of ₽1 million before tax.',
        ],
        team: 'Three people · Team Antigradient',
        certificatePdf: '/files/certificates/leaders-of-digital-transformation-2023.pdf',
        certificateImage: '/images/certificates/leaders-of-digital-transformation-2023.png',
      },
    ],
    recommendationsTitle: 'Recommendations',
    recommendations: [
      {
        initials: 'EK',
        name: 'Evgeni Koifman',
        relationship: 'Direct manager at Alar Studios',
        quote: 'Michael showed a high level of professionalism, responsiveness and an impressive ability for fast learning.',
        profileUrl: externalLinks.evgeniKoifman,
        translated: false,
      },
      {
        initials: 'AS',
        name: 'Aviv Shemesh',
        relationship: 'Engineer in an adjacent SCAILIUM team',
        quote: 'He was great at finding difficult bugs and developing automation to fix them.',
        profileUrl: externalLinks.avivShemesh,
        translated: false,
      },
    ],
    education: {
      title: 'Education',
      institution: 'A.F. Mozhaisky Military Space Academy',
      period: 'September 2016 to June 2021',
      degree: 'Five-year Engineering Specialist Degree in Aircraft Control Systems',
      details: 'Graduated with honours · GPA 5.0/5.0 · Gold medal',
      thesis: 'Spacecraft Attitude Determination Using Triangulation',
    },
    about: {
      title: 'About',
      paragraphs: [
        'I started working with Python, then moved into production Go, architecture and technical leadership. I still write code and prefer roles where I can stay close to implementation while taking responsibility for design and delivery.',
        'Teaching helps me test whether I understand a subject well enough to explain it. At ITMO, I teach Go and system design. Outside the university, I mentor developers preparing for their next role.',
        'I am looking for a senior backend position with room to grow into broader technical or people leadership over time.',
      ],
    },
    contact: {
      title: 'Contact',
      copy: 'I am open to senior backend roles that combine hands-on engineering with architecture and technical leadership.',
      location: 'Saint Petersburg, Russia · Open to relocation',
      links: [
        { label: 'Email', href: externalLinks.email },
        { label: 'LinkedIn', href: externalLinks.linkedin },
        { label: 'Telegram', href: externalLinks.telegram },
        { label: 'Telegram channel', href: externalLinks.telegramChannel },
        { label: 'Habr', href: externalLinks.habr },
        { label: 'Profi.ru', href: externalLinks.profi },
      ],
    },
    footer: 'Codex built this site and drove me mad while we filled it with content.',
  },
  ru: {
    locale: 'ru',
    seo: {
      title: 'Михаил Рогозин | Senior Backend Engineer',
      description:
        'Senior Backend Engineer. Разрабатываю системы на Go, Python и PostgreSQL. Работал с бюджетированием персонала, on-premise observability и продуктами информационной безопасности. Живу в Санкт-Петербурге и готов к релокации.',
    },
    navigation: [
      { id: 'work', label: 'Проекты' },
      { id: 'experience', label: 'Опыт' },
      { id: 'teaching', label: 'Преподавание' },
      { id: 'writing', label: 'Статьи' },
      { id: 'awards', label: 'Награды' },
      { id: 'about', label: 'Обо мне' },
      { id: 'contact', label: 'Контакты' },
    ],
    cvMenu: {
      label: 'Скачать резюме',
      compact: 'Краткое резюме, 1 страница',
      extended: 'Расширенное резюме, 2 страницы',
    },
    hero: {
      eyebrow: 'Backend-разработка',
      name: 'Михаил Рогозин',
      role: 'Senior Backend Engineer · Python & Go',
      summary:
        'Разрабатываю бэкенд-системы на Go и Python. Работал с бюджетированием персонала, on-premise observability и продуктами информационной безопасности.',
      location: 'Санкт-Петербург, Россия. Готов к релокации.',
      primaryAction: 'Посмотреть кейсы',
      secondaryAction: 'Скачать резюме',
    },
    evidenceStrip: [
      { label: 'Сейчас', value: 'Avito', href: externalLinks.avitoCompany },
      { label: 'Опыт', value: 'Более 6 лет в разработке' },
      { label: 'Основной стек', value: 'Python и Go' },
      { label: 'Статьи', value: '3 статьи, более 325 тысяч просмотров' },
    ],
    selectedWorkTitle: 'Ключевые инженерные кейсы',
    experienceTitle: 'Опыт',
    experience: [
      {
        company: 'Avito',
        companyUrl: externalLinks.avitoCompany,
        role: 'Backend Engineer, L4',
        period: 'Ноябрь 2024 по настоящее время',
        paragraphs: [
          'Работаю над внутренней системой бюджетирования персонала для C&B, FP&A и HR Admin. Отвечаю за архитектуру бэкенда, реализацию, ревью, релизы и стабильность нескольких Go-сервисов.',
          'С лета 2025 года выполняю роль технического лида в группе из четырёх бэкенд-разработчиков, включая меня. Декомпозирую задачи, проверяю технические решения и код, при этом продолжаю работать как individual contributor.',
        ],
        stack: ['Go', 'PostgreSQL', 'Kafka', 'REST', 'internal RPC', 'CI/CD', 'Kubernetes', 'Helm'],
      },
      {
        company: 'Alar Studios',
        companyUrl: externalLinks.alarStudios,
        role: 'Senior Software Engineer (Python)',
        period: 'Август 2023 по сентябрь 2024',
        paragraphs: [
          'Работал над SCAILIUM и отвечал за бэкенд и автоматические тесты проекта клиентской диагностики. Предложил решение, разработал Python-сервис и поставку через Docker Compose, подготовил дашборды и документацию, продолжил сопровождать проект после первого релиза.',
          'Также расширил набор автоматических тестов и помогал инженерам, которые только начинали работать с кодовой базой.',
        ],
        stack: [
          'Python',
          'Flask',
          'PostgreSQL',
          'SCAILIUM',
          'MongoDB',
          'Grafana',
          'Loki',
          'Prometheus',
          'Tempo',
          'Docker Compose',
        ],
      },
      {
        company: 'Group-IB',
        companyUrl: externalLinks.groupIb,
        role: 'Middle Python Backend Developer',
        period: 'Август 2022 по июнь 2023',
        paragraphs: [
          'Разработал бэкенд-процесс для анализа PDF-вложений в Managed XDR. Сервис открывал документы в изолированной виртуальной машине, имитировал действия пользователя, собирал результаты и передавал их правилам обнаружения, которые писали аналитики.',
          'Во время двухмесячного пилота в трёх компаниях система обработала около 80 ГБ PDF-файлов, включая клиентские тестовые стенды. Аналитики подтвердили вредоносный код в 37% пилотной выборки. Доля ложных срабатываний была меньше 1% от всех детектов. После пилота функция стала доступна всем клиентам.',
        ],
        stack: ['Python 2.7', 'MySQL', 'MongoDB', 'Docker', 'Ubuntu'],
      },
      {
        company: 'Lumos',
        companyUrl: externalLinks.lumos,
        role: 'Python Backend Developer',
        period: 'Январь 2021 по май 2022',
        paragraphs: [
          'Был единственным разработчиком небольшого сайта с экскурсиями. Реализовал ранжирование рекомендаций, которое в первую очередь учитывало город пользователя, а затем интересы, историю, возраст и оценки. Выпустил функцию примерно за месяц.',
          'Также поддерживал бэкенд и при необходимости делал небольшие изменения во фронтенде.',
        ],
        stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'Docker Compose'],
      },
      {
        company: 'CodeClass',
        companyUrl: externalLinks.codeClass,
        role: 'Преподаватель, затем Junior Developer',
        period: 'Январь 2019 по декабрь 2020',
        paragraphs: [
          'Преподавал Python, JavaScript, Unity и основы C# двум небольшим группам. В последние месяцы проекта также вносил небольшие изменения в Python-код и фронтенд сайта компании. Релизы в продакшен выполнял старший разработчик.',
        ],
        compact: true,
      },
      {
        company: 'Самостоятельные проекты',
        role: 'Независимый Python-разработчик',
        period: '2018 по 2020',
        paragraphs: [
          'Для частного клиента разработал Python-пайплайн, который находил и скачивал тысячи публичных деклараций о строительстве с дом.рф, извлекал текст из PDF-файлов, нормализовал данные и выгружал их в Excel.',
          'Также разработал инструмент для расчётов по большой таблице с баскетбольными командами, матчами и очками по раундам.',
        ],
        compact: true,
      },
    ],
    technical: {
      title: 'Технический профиль',
      groups: [
        { title: 'Бэкенд', items: ['Go', 'Python', 'REST', 'internal RPC', 'микросервисы'] },
        { title: 'Данные и сообщения', items: ['PostgreSQL', 'Kafka', 'Redis', 'MySQL', 'MongoDB'] },
        {
          title: 'Архитектура',
          items: ['Доменное моделирование', 'Clean Architecture', 'Domain-Driven Design', 'границы сервисов', 'проектирование API'],
        },
        {
          title: 'Продакшен',
          items: ['CI/CD', 'метрики', 'дашборды', 'алерты', 'SLI/SLO', 'Docker', 'рабочее знание Kubernetes и Helm'],
        },
        { title: 'Тестирование', items: ['Unit-тесты', 'интеграционные тесты', 'автоматические сценарии', 'code review'] },
      ],
    },
    teaching: {
      title: 'Преподавание и менторство',
      entries: [
        {
          heading: 'Преподаватель · Университет ИТМО',
          headingUrl: externalLinks.itmoFitp,
          period: 'Февраль 2025 по настоящее время',
          paragraphs: [
            'Преподаю программирование на Go и проектирование архитектуры ПО 80 студентам третьего курса бакалавриата на программе Avito Start факультета информационных технологий и программирования.',
            'Провёл 10 лекций и 13 практических занятий, подготовил 20 учебных материалов, принимал лабораторные работы, проекты и экзамены.',
          ],
        },
        {
          heading: 'Независимый Python-ментор',
          period: '2018 по настоящее время',
          paragraphs: [
            'Индивидуально занимаюсь со студентами и разработчиками: Python, бэкенд-разработка и подготовка к собеседованиям. За всё время в самостоятельной практике у меня было более 50 учеников и клиентов.',
          ],
          proof: '4,67 из 5 · 27 отзывов на Profi.ru',
          link: { label: 'Открыть профиль на Profi.ru', href: externalLinks.profi },
        },
      ],
    },
    publicWork: {
      title: 'Статьи и публичные материалы',
      featured: {
        label: 'PostgreSQL и SQL',
        title: 'Шпаргалка по SQL и PostgreSQL для собеседований',
        copy: 'Практический материал о транзакциях, уровнях изоляции, индексах и планах выполнения запросов.',
        metric: 'Более 275 тысяч просмотров',
        link: { label: 'Читать на Habr', href: 'https://habr.com/ru/articles/745948/' },
      },
      channels: [
        { name: 'Habr', metric: '3 технические статьи, более 325 тысяч просмотров', href: externalLinks.habr },
        { name: 'YouTube', metric: 'более 1 тысячи подписчиков', href: externalLinks.youtube },
        { name: 'Telegram', metric: 'более 180 подписчиков', href: externalLinks.telegramChannel },
      ],
    },
    awardsTitle: 'Хакатоны',
    awards: [
      {
        id: 'startup-hackathon-2021',
        event: 'Startup Hackathon 2021',
        title: 'Первое место в треке Group-IB',
        copy: [
          'Я разработал прикладную часть на Python и Tkinter, интегрировал модель распознавания команды и презентовал результат. После победы прошёл техническое собеседование и получил оффер в Group-IB.',
        ],
        team: 'Три человека · Команда bbyby',
        certificatePdf: '/files/certificates/startup-hackathon-2021.pdf',
        certificateImage: '/images/certificates/startup-hackathon-2021.png',
      },
      {
        id: 'leaders-digital-transformation-2023',
        event: 'Лидеры цифровой трансформации 2023',
        title: 'Первое место в задаче Аэрофлота',
        copy: [
          'Команда из трёх человек разработала рекомендательный сервис для прогнозирования спроса на авиарейсы. Я разработал и развернул приложение на Streamlit, подготовил визуализации и загрузку файлов, а также представлял команду на финальной защите.',
          'Общий приз команды составил 1 миллион рублей до уплаты НДФЛ.',
        ],
        team: 'Три человека · Команда «Антиградиент»',
        certificatePdf: '/files/certificates/leaders-of-digital-transformation-2023.pdf',
        certificateImage: '/images/certificates/leaders-of-digital-transformation-2023.png',
      },
    ],
    recommendationsTitle: 'Рекомендации',
    recommendations: [
      {
        initials: 'EK',
        name: 'Евгений Койфман',
        relationship: 'Непосредственный руководитель в Alar Studios',
        quote: 'Михаил показал высокий уровень профессионализма, отзывчивость и впечатляющую способность быстро учиться.',
        profileUrl: externalLinks.evgeniKoifman,
        translated: true,
      },
      {
        initials: 'AS',
        name: 'Авив Шемеш',
        relationship: 'Инженер из соседней команды SCAILIUM',
        quote: 'Он отлично находил сложные ошибки и разрабатывал автоматизацию для их исправления.',
        profileUrl: externalLinks.avivShemesh,
        translated: true,
      },
    ],
    recommendationNote: 'Русские цитаты являются переводом. По ссылке в LinkedIn доступен английский оригинал.',
    education: {
      title: 'Образование',
      institution: 'Военно-космическая академия имени А.Ф. Можайского',
      period: 'Сентябрь 2016 по июнь 2021',
      degree: 'Пятилетний специалитет · Системы управления летательными аппаратами · Инженер',
      details: 'Диплом с отличием · Средний балл 5,0 из 5,0 · Золотая медаль',
      thesis: 'Ориентация космического аппарата в пространстве методом триангуляции',
    },
    about: {
      title: 'Обо мне',
      paragraphs: [
        'Начал с Python, затем перешёл к production-разработке на Go, архитектуре и техническому лидерству. Продолжаю писать код и предпочитаю роли, где можно оставаться близко к реализации и одновременно отвечать за проектирование и выпуск функций.',
        'Преподавание помогает мне проверять, насколько хорошо я сам понимаю тему. В ИТМО веду Go и системный дизайн, а вне университета занимаюсь с разработчиками, которые готовятся к следующему этапу карьеры.',
        'Ищу senior backend позицию с возможностью со временем перейти к более широкому техническому или управленческому лидерству.',
      ],
    },
    contact: {
      title: 'Контакты',
      copy: 'Рассматриваю senior backend позиции, в которых можно совмещать разработку, архитектуру и техническое лидерство.',
      location: 'Санкт-Петербург, Россия · Готов к релокации',
      links: [
        { label: 'Email', href: externalLinks.email },
        { label: 'LinkedIn', href: externalLinks.linkedin },
        { label: 'Telegram', href: externalLinks.telegram },
        { label: 'Telegram-канал', href: externalLinks.telegramChannel },
        { label: 'Habr', href: externalLinks.habr },
        { label: 'Profi.ru', href: externalLinks.profi },
      ],
    },
    footer: 'Этот сайт создал Codex — и заставил меня перепроверить каждую строчку.',
  },
};
