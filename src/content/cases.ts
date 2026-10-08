import type { CaseSlug, CaseStudy, Locale } from '../lib/types';

export const evidence = {
  experienceYears: 6,
  articleCount: 3,
  combinedArticleViews: 325_000,
  featuredArticleViews: 275_000,
  scailiumEngineers: 500,
  scailiumCompanies: 20,
  scailiumRating: 8.7,
  scailiumInvestigationMinutes: 60,
  scailiumAutomatedScenarios: 300,
  scailiumCoveragePercent: 69,
  profiRating: 4.67,
  profiReviewCount: 27,
  itmoStudents: 80,
} as const;

export const caseSlugs = [
  'workforce-attrition',
  'scailium-observability',
] as const satisfies readonly CaseSlug[];

export const caseRoutes = (['en', 'ru'] as const).flatMap((locale) =>
  caseSlugs.map((slug) => `/${locale}/work/${slug}/`),
);

export const casesByLocale: Record<Locale, Record<CaseSlug, CaseStudy>> = {
  en: {
    'workforce-attrition': {
      locale: 'en',
      slug: 'workforce-attrition',
      seo: {
        title: 'Attrition forecasting for workforce budgeting | Mikhail Rogozin',
        description:
          'How Mikhail Rogozin designed and delivered the backend for an attrition forecasting feature at Avito, from stakeholder interviews to production in under four months.',
      },
      label: 'Selected work / Workforce budgeting',
      title: 'Attrition forecasting for an internal workforce budgeting platform',
      intro:
        'I took the backend work from the first stakeholder interviews to production in under four months. The released feature calculates monthly attrition and headcount restoration, includes the resulting workforce costs in budgeting scenarios, and sends the data to IBM Cognos Analytics.',
      details: [
        { label: 'Company', value: 'Avito' },
        { label: 'Role', value: 'Backend Engineer, L4' },
        { label: 'Contribution', value: 'Architecture, core backend, reviews and delivery' },
        { label: 'Stack', value: 'Go, PostgreSQL, IBM Cognos Analytics' },
        { label: 'Status', value: 'Released and in regular use' },
      ],
      diagram: {
        variant: 'attrition',
        labels: [
          'Budgeting campaigns',
          'Attrition model',
          'Workforce cost calculations',
          'Campaign comparison and reporting',
          'IBM Cognos Analytics',
        ],
        caption:
          'The diagram uses public names only. Internal services and repositories are intentionally omitted.',
      },
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'The budgeting platform already modelled workforce positions and their monthly cost. It did not account for people leaving during a campaign or for the time and cost required to restore headcount.',
            'C&B, FP&A and HR administration needed attrition to affect the same campaign calculations, comparisons and reports they already used. A separate spreadsheet or reporting-only calculation would have created another version of the budget.',
          ],
        },
        {
          id: 'context',
          title: 'Context',
          paragraphs: [
            'Attrition changes several monthly values at once. A person leaves, the position remains vacant for a period, and the company may later restore the headcount. Each step changes workforce cost and must remain consistent across calculations, campaign comparison and reporting.',
            'The feature also had to work automatically across budgeting campaigns. Users should not have to maintain a parallel attrition model for every scenario.',
          ],
        },
        {
          id: 'constraints',
          title: 'Constraints',
          bullets: [
            'The new model had to fit the existing campaign and position domains.',
            'Monthly calculations had to remain deterministic and testable.',
            'Campaign comparison and reporting needed the same values as the main budgeting workflow.',
            'The release had to preserve existing budgeting scenarios.',
          ],
        },
        {
          id: 'decision',
          title: 'Decision',
          paragraphs: [
            'I kept attrition inside the existing budgeting domain. The core model calculates the monthly reduction in active headcount and the later restoration step, then exposes those values to the services that calculate workforce costs.',
            'This kept one calculation path for budgeting, campaign comparison and reporting. IBM Cognos Analytics receives the same result that users see in the budgeting workflow.',
          ],
        },
        {
          id: 'role',
          title: 'My role',
          paragraphs: [
            'I started with stakeholder interviews and domain modelling, then wrote the technical design and implemented most of the backend. My work covered the core monthly model, integration with budgeting calculations, campaign comparison, reporting and delivery to IBM Cognos Analytics.',
            'Two engineers handled bounded parts of the implementation. I defined the architecture, reviewed their changes and remained responsible for the final integration and release.',
          ],
        },
        {
          id: 'delivery',
          title: 'Delivery',
          paragraphs: [
            'The first tracked work began in May 2026. The feature reached production in September 2026. Most active backend implementation took place over roughly six to seven weeks within that period.',
            'The release applied the new calculations automatically across campaigns. C&B, FP&A and HR administration began using the feature without material changes to the model after launch.',
          ],
        },
        {
          id: 'outcome',
          title: 'Outcome',
          paragraphs: [
            'Attrition became part of the normal budgeting workflow. Users can include monthly staff outflow and headcount restoration in workforce-cost projections, compare campaigns with the same calculation rules and use the resulting data in IBM Cognos Analytics.',
          ],
        },
        {
          id: 'lessons',
          title: 'Lessons',
          subsections: [
            {
              title: 'Keep one calculation path',
              paragraphs: [
                'Budgeting, comparison and reporting should use the same domain result. Reimplementing the model in each consumer would make discrepancies difficult to diagnose.',
              ],
            },
            {
              title: 'Validate the model with monthly examples',
              paragraphs: [
                'Month-by-month examples made stakeholder discussions and engineering reviews more precise. The same examples were useful when testing boundary conditions.',
              ],
            },
            {
              title: 'Delegate after the model is stable',
              paragraphs: [
                'The work could be split between engineers once the domain model and interfaces were stable. Architecture and final integration still needed one owner.',
              ],
            },
          ],
        },
      ],
      backLabel: 'Back to selected work',
      adjacent: {
        label: 'Next case',
        title: 'On-premise customer diagnostics for SCAILIUM',
        href: '/en/work/scailium-observability/',
      },
    },
    'scailium-observability': {
      locale: 'en',
      slug: 'scailium-observability',
      seo: {
        title: 'On-premise customer diagnostics for SCAILIUM | Mikhail Rogozin',
        description:
          'How Mikhail Rogozin proposed and built an on-premise diagnostics stack for SCAILIUM using Python, Grafana, Loki, Prometheus and Tempo.',
      },
      label: 'Selected work / Customer diagnostics',
      title: 'On-premise customer diagnostics for SCAILIUM',
      intro:
        'I proposed and built a diagnostics stack for SCAILIUM customer installations in under two months. It collected logs, metrics and query traces, and replaced the previous ELK workflow across customer environments.',
      metrics: [
        { label: 'Delivery', value: 'Built in under two months' },
        { label: 'Users', value: 'Approximately 500 engineers' },
        { label: 'Customers', value: 'Around 20 companies' },
        { label: 'Feedback', value: '8.7/10 average rating' },
        { label: 'Investigation', value: 'About one hour' },
      ],
      details: [
        { label: 'Company', value: 'Alar Studios' },
        { label: 'Product', value: 'SCAILIUM' },
        { label: 'Role', value: 'Senior Software Engineer (Python)' },
        {
          label: 'Contribution',
          value: 'Proposal, Python service, APIs, tests, Docker Compose, dashboards and documentation',
        },
        { label: 'Stack', value: 'Python, Flask, Grafana, Loki, Prometheus, Tempo, Docker Compose' },
      ],
      diagram: {
        variant: 'observability',
        labels: [
          'SCAILIUM nodes',
          'Logs, metrics and query traces',
          'Python service',
          'Loki, Prometheus and Tempo',
          'Grafana dashboards',
        ],
        caption: "All components run inside the customer's on-premise environment.",
      },
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'SCAILIUM runs on customer infrastructure. Customer engineers need diagnostic data from their own installations, and customers need a package they can deploy without giving an external team access to their systems.',
            'The existing ELK setup exposed logs, but it did not provide one path through node metrics, application logs and query traces. Investigations could take hours and sometimes longer.',
          ],
        },
        {
          id: 'previous-workflow',
          title: 'Previous workflow',
          paragraphs: [
            'Engineers inspected host metrics and searched logs in the customer environment. When a critical bug, a large query or a performance bottleneck involved several signals, they had to reconstruct the sequence manually.',
            'The diagnostics package also needed to work across different customer installations. SCAILIUM supplied the release, while customers deployed it on their own infrastructure.',
          ],
        },
        {
          id: 'constraints',
          title: 'Constraints',
          bullets: [
            'The entire stack had to run on premises.',
            'Customers needed a repeatable Docker Compose distribution.',
            'The solution had to collect node metrics and telemetry from the SCAILIUM binary.',
            'Logs ranged from critical messages to debug output.',
            'The package could not depend on Alar Studios operating customer infrastructure.',
          ],
        },
        {
          id: 'decision',
          title: 'Decision',
          paragraphs: [
            'I proposed a small Flask service around Grafana, Loki, Prometheus and Tempo. The service prepared and exposed the diagnostic data, while the observability components stored and visualised logs, metrics and query traces.',
            'C++ engineers added the required telemetry hooks to the SCAILIUM binary. I wrote the Python service and most of the surrounding solution, including tests, packaging, dashboards and documentation.',
          ],
        },
        {
          id: 'role',
          title: 'My role',
          paragraphs: [
            'I proposed the project and worked through the product, architecture and implementation questions with the relevant teams. I then built the Flask service, backend APIs, Docker Compose distribution, dashboards and technical documentation.',
            'I added automated tests, supported the shared release repository and explained the system to engineers joining the codebase. C++ engineers handled the changes required inside the SCAILIUM binary.',
          ],
        },
        {
          id: 'testing',
          title: 'Testing',
          paragraphs: [
            'The project reached approximately 300 automated scenarios and 69% code coverage. The tests covered the backend and automated database operations, including checks that logs and telemetry arrived in the expected form.',
          ],
        },
        {
          id: 'outcome',
          title: 'Outcome',
          paragraphs: [
            'All customer installations moved from the previous ELK workflow to the new diagnostics package. Approximately 500 engineers across around 20 companies used it.',
            'Customer developers rated the solution 8.7 out of 10 on average. An investigation that had previously taken hours or longer could usually be completed in about one hour.',
          ],
        },
        {
          id: 'lessons',
          title: 'Lessons',
          subsections: [
            {
              title: 'Start with the investigation path',
              paragraphs: [
                "The useful unit was the engineer's full investigation, not a single log or metric. That led to a stack that connected node state, application events and query traces.",
              ],
            },
            {
              title: 'Package the operating assumptions',
              paragraphs: [
                'Customers deployed the solution themselves, so configuration and documentation were part of the product. Docker Compose gave each installation the same starting point.',
              ],
            },
            {
              title: 'Ask for feedback after engineers have used the release',
              paragraphs: [
                'The 8.7/10 score came from customer developers who had worked with the released solution. They rated the complete investigation workflow, not an isolated dashboard.',
              ],
            },
          ],
        },
      ],
      backLabel: 'Back to selected work',
      adjacent: {
        label: 'Previous case',
        title: 'Attrition forecasting for an internal workforce budgeting platform',
        href: '/en/work/workforce-attrition/',
      },
    },
  },
  ru: {
    'workforce-attrition': {
      locale: 'ru',
      slug: 'workforce-attrition',
      seo: {
        title: 'Расчёт оттока в системе бюджетирования персонала | Михаил Рогозин',
        description:
          'Как Михаил Рогозин спроектировал и выпустил бэкенд для расчёта оттока в Avito: от первых встреч с заказчиками до продакшена меньше чем за четыре месяца.',
      },
      label: 'Избранные проекты / Бюджетирование персонала',
      title: 'Расчёт оттока в системе бюджетирования персонала',
      intro:
        'Я довёл бэкенд от первых встреч с заказчиками до продакшена меньше чем за четыре месяца. Выпущенная функция рассчитывает помесячный отток и восстановление численности, учитывает стоимость персонала в бюджетных сценариях и передаёт результат в IBM Cognos Analytics.',
      details: [
        { label: 'Компания', value: 'Avito' },
        { label: 'Роль', value: 'Backend Engineer, L4' },
        { label: 'Мой вклад', value: 'Архитектура, основная часть бэкенда, ревью и выпуск' },
        { label: 'Стек', value: 'Go, PostgreSQL, IBM Cognos Analytics' },
        { label: 'Статус', value: 'Выпущено и регулярно используется' },
      ],
      diagram: {
        variant: 'attrition',
        labels: [
          'Бюджетные кампании',
          'Модель оттока',
          'Расчёт стоимости персонала',
          'Сравнение кампаний и отчётность',
          'IBM Cognos Analytics',
        ],
        caption:
          'На схеме используются только публичные названия. Внутренние сервисы и репозитории не указаны.',
      },
      sections: [
        {
          id: 'overview',
          title: 'Обзор',
          paragraphs: [
            'Система бюджетирования уже моделировала штатные позиции и их помесячную стоимость. В расчётах не учитывались увольнение сотрудника во время кампании и период, необходимый для восстановления численности.',
            'C&B, FP&A и HR Admin нужно было учитывать отток в тех же расчётах, сравнениях кампаний и отчётах, которыми они уже пользовались. Отдельная таблица или расчёт только на стороне отчётности создали бы ещё одну версию бюджета.',
          ],
        },
        {
          id: 'context',
          title: 'Контекст',
          paragraphs: [
            'Отток одновременно меняет несколько помесячных значений. Сотрудник уходит, позиция некоторое время остаётся вакантной, затем компания может восстановить численность. Каждый этап влияет на стоимость персонала и должен одинаково работать в расчётах, сравнении кампаний и отчётности.',
            'Функция должна была автоматически применяться ко всем бюджетным кампаниям. Пользователям не требовалось вручную вести отдельную модель оттока для каждого сценария.',
          ],
        },
        {
          id: 'constraints',
          title: 'Ограничения',
          bullets: [
            'Новая модель должна была встроиться в существующие домены кампаний и позиций.',
            'Помесячные расчёты должны были оставаться детерминированными и проверяемыми тестами.',
            'Сравнение кампаний и отчётность должны были получать те же значения, что и основной процесс бюджетирования.',
            'Релиз не должен был нарушить существующие сценарии бюджетирования.',
          ],
        },
        {
          id: 'decision',
          title: 'Решение',
          paragraphs: [
            'Я оставил расчёт оттока внутри существующего домена бюджетирования. Основная модель вычисляет помесячное снижение активной численности и последующий шаг восстановления, после чего передаёт эти значения сервисам, которые рассчитывают стоимость персонала.',
            'Бюджетирование, сравнение кампаний и отчётность используют один результат. В IBM Cognos Analytics передаются те же значения, которые пользователи видят в системе бюджетирования.',
          ],
        },
        {
          id: 'role',
          title: 'Моя роль',
          paragraphs: [
            'Я начал с интервью с заказчиками и моделирования домена, затем написал технический дизайн и реализовал основную часть бэкенда. В мою зону ответственности входили помесячная модель, интеграция с бюджетными расчётами, сравнение кампаний, отчётность и передача данных в IBM Cognos Analytics.',
            'Два инженера реализовали отдельные ограниченные части. Я определил архитектуру, провёл ревью их изменений и отвечал за итоговую интеграцию и выпуск.',
          ],
        },
        {
          id: 'delivery',
          title: 'Разработка и выпуск',
          paragraphs: [
            'Первые зафиксированные работы начались в мае 2026 года. Функция вышла в продакшен в сентябре 2026 года. Основная активная разработка бэкенда заняла примерно шесть-семь недель внутри этого периода.',
            'После выпуска расчёты стали автоматически применяться к кампаниям. C&B, FP&A и HR Admin начали пользоваться функцией без существенных изменений модели после запуска.',
          ],
        },
        {
          id: 'outcome',
          title: 'Результат',
          paragraphs: [
            'Отток стал частью обычного процесса бюджетирования. Пользователи могут учитывать помесячное сокращение численности и её восстановление в прогнозе стоимости персонала, сравнивать кампании по единым правилам и использовать результат в IBM Cognos Analytics.',
          ],
        },
        {
          id: 'lessons',
          title: 'Выводы',
          subsections: [
            {
              title: 'Один путь расчёта',
              paragraphs: [
                'Бюджетирование, сравнение и отчётность должны получать результат из одной доменной модели. Независимая реализация в каждом потребителе усложнила бы поиск расхождений.',
              ],
            },
            {
              title: 'Проверка модели на помесячных примерах',
              paragraphs: [
                'Помесячные примеры сделали обсуждения с заказчиками и инженерные ревью точнее. Эти же примеры пригодились для проверки граничных случаев.',
              ],
            },
            {
              title: 'Делегирование после фиксации модели',
              paragraphs: [
                'Работу получилось распределить между инженерами после того, как доменная модель и интерфейсы стабилизировались. За архитектуру и итоговую интеграцию по-прежнему отвечал один человек.',
              ],
            },
          ],
        },
      ],
      backLabel: 'Назад к проектам',
      adjacent: {
        label: 'Следующий кейс',
        title: 'On-premise диагностика SCAILIUM',
        href: '/ru/work/scailium-observability/',
      },
    },
    'scailium-observability': {
      locale: 'ru',
      slug: 'scailium-observability',
      seo: {
        title: 'On-premise диагностика SCAILIUM | Михаил Рогозин',
        description:
          'Как Михаил Рогозин предложил и разработал on-premise решение для диагностики SCAILIUM на Python, Grafana, Loki, Prometheus и Tempo.',
      },
      label: 'Избранные проекты / Диагностика у клиентов',
      title: 'On-premise диагностика SCAILIUM',
      intro:
        'Я предложил и меньше чем за два месяца разработал решение для диагностики клиентских установок SCAILIUM. Оно собирало логи, метрики и трейсы запросов и заменило прежний процесс на базе ELK.',
      metrics: [
        { label: 'Разработка', value: 'Меньше двух месяцев' },
        { label: 'Пользователи', value: 'Около 500 инженеров' },
        { label: 'Клиенты', value: 'Около 20 компаний' },
        { label: 'Оценка', value: '8,7 из 10' },
        { label: 'Расследование', value: 'Около часа' },
      ],
      details: [
        { label: 'Компания', value: 'Alar Studios' },
        { label: 'Продукт', value: 'SCAILIUM' },
        { label: 'Роль', value: 'Senior Software Engineer (Python)' },
        {
          label: 'Мой вклад',
          value: 'Идея, Python-сервис, API, тесты, Docker Compose, дашборды и документация',
        },
        { label: 'Стек', value: 'Python, Flask, Grafana, Loki, Prometheus, Tempo, Docker Compose' },
      ],
      diagram: {
        variant: 'observability',
        labels: [
          'Ноды SCAILIUM',
          'Логи, метрики и трейсы запросов',
          'Python-сервис',
          'Loki, Prometheus и Tempo',
          'Дашборды Grafana',
        ],
        caption: 'Все компоненты работают внутри on-premise окружения клиента.',
      },
      sections: [
        {
          id: 'overview',
          title: 'Обзор',
          paragraphs: [
            'SCAILIUM работает на инфраструктуре клиентов. Инженерам клиентов нужны диагностические данные из собственных установок, а компаниям нужен пакет, который можно развернуть без предоставления внешней команде доступа к своим системам.',
            'Предыдущее решение на базе ELK показывало логи, но не давало единого пути от метрик нод к событиям приложения и трейсам запросов. Расследования занимали несколько часов, а иногда и больше.',
          ],
        },
        {
          id: 'previous-workflow',
          title: 'Предыдущий процесс',
          paragraphs: [
            'Инженеры проверяли метрики хостов и искали события в логах внутри клиентского окружения. Если критическая ошибка, тяжёлый запрос или узкое место затрагивали несколько источников данных, последовательность событий приходилось восстанавливать вручную.',
            'Решение также должно было одинаково работать в разных клиентских установках. SCAILIUM передавал готовый релиз, а клиенты самостоятельно разворачивали его в своей инфраструктуре.',
          ],
        },
        {
          id: 'constraints',
          title: 'Ограничения',
          bullets: [
            'Весь стек должен был работать on-premise.',
            'Клиентам требовалась воспроизводимая поставка через Docker Compose.',
            'Нужно было собирать метрики нод и телеметрию из бинарного файла SCAILIUM.',
            'Уровни логов варьировались от critical до debug.',
            'Решение не могло зависеть от управления клиентской инфраструктурой со стороны Alar Studios.',
          ],
        },
        {
          id: 'decision',
          title: 'Решение',
          paragraphs: [
            'Я предложил небольшой Flask-сервис вокруг Grafana, Loki, Prometheus и Tempo. Сервис подготавливал и передавал диагностические данные, а компоненты observability хранили и отображали логи, метрики и трейсы запросов.',
            'C++-разработчики добавили необходимые точки сбора телеметрии в бинарный файл SCAILIUM. Я написал Python-сервис и большую часть окружающего решения, включая тесты, сборку, дашборды и документацию.',
          ],
        },
        {
          id: 'role',
          title: 'Моя роль',
          paragraphs: [
            'Я предложил проект и проработал продуктовые, архитектурные и технические вопросы с заинтересованными командами. Затем разработал Flask-сервис, API, поставку через Docker Compose, дашборды и техническую документацию.',
            'Добавил автоматические тесты, сопровождал общий релизный репозиторий и объяснял устройство решения новым инженерам. C++-разработчики отвечали за необходимые изменения внутри бинарного файла SCAILIUM.',
          ],
        },
        {
          id: 'testing',
          title: 'Тестирование',
          paragraphs: [
            'В проекте было около 300 автоматических сценариев и 69% покрытия кода. Тесты проверяли бэкенд и автоматизировали операции с базой, включая контроль того, что логи и телеметрия поступили в ожидаемом виде.',
          ],
        },
        {
          id: 'outcome',
          title: 'Результат',
          paragraphs: [
            'Все клиентские установки перешли с прежнего процесса на базе ELK на новый диагностический пакет. Им пользовались около 500 инженеров примерно в 20 компаниях.',
            'Разработчики клиентов оценили решение в среднем на 8,7 из 10. Расследование, которое раньше занимало несколько часов или больше, обычно удавалось завершить примерно за час.',
          ],
        },
        {
          id: 'lessons',
          title: 'Выводы',
          subsections: [
            {
              title: 'Проектирование от сценария расследования',
              paragraphs: [
                'Работу нужно было строить вокруг полного расследования, а не отдельного лога или метрики. Поэтому решение объединило состояние нод, события приложения и трейсы запросов.',
              ],
            },
            {
              title: 'Поставка вместе с настройками',
              paragraphs: [
                'Клиенты разворачивали решение самостоятельно, поэтому конфигурация и документация были частью поставки. Docker Compose давал всем установкам одинаковую отправную точку.',
              ],
            },
            {
              title: 'Обратная связь после реального использования',
              paragraphs: [
                'Оценку 8,7 из 10 дали разработчики клиентов после работы с выпущенным решением. Они оценивали весь процесс расследования, а не отдельный дашборд.',
              ],
            },
          ],
        },
      ],
      backLabel: 'Назад к проектам',
      adjacent: {
        label: 'Предыдущий кейс',
        title: 'Расчёт оттока в системе бюджетирования персонала',
        href: '/ru/work/workforce-attrition/',
      },
    },
  },
};
