export type Lang = "en" | "ru";

export type Game = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  genre: string; // short "A / B" label above the title
  status: string; // corner badge text
  year: string; // corner year
  steamUrl: string;
  image: string;
  accent: string; // tailwind gradient classes for image overlay
  glow: string; // "r,g,b" — hover light color for the block
  badge: string; // hex color for the status dot
};

export type Dict = {
  nav: {
    about: string;
    games: string;
    team: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Lead: string;
    titleLine2Key: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  about: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    body2: string;
    pillars: { title: string; body: string }[];
  };
  games: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewOnSteam: string;
    items: Game[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      bio: string;
      image: string;
      telegram: string;
    }[];
  };
  contact: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    listTitle: string;
    listItems: { title: string; tags: string; hot: boolean }[];
    listFooter: string;
    wanted: string;
    formHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    roleLabel: string;
    rolePlaceholder: string;
    linkLabel: string;
    linkPlaceholder: string;
    discordLabel: string;
    discordPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    responseNote: string;
    directLine: string;
  };
  follow: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    rights: string;
    madeIn: string;
    nav: string;
    contact: string;
    privacy: string;
    terms: string;
  };
};

const games = {
  en: [
    {
      title: "Economic Miracle",
      tagline: "The most ambitious geopolitical simulator of the modern era.",
      description:
        "Take charge of any nation and lead it to greatness. Manage economy, laws, military, and diplomacy across 1,423 world regions and 33,700 provinces, a deep, data-driven grand strategy built for players who love systems.",
      tags: ["Grand Strategy", "Simulation", "Political Sim", "4X"],
      genre: "Grand Strategy / Simulation",
      status: "In Progress",
      year: "2026",
      steamUrl: "https://store.steampowered.com/app/3738130/Economic_Miracle/",
      image: "/games/economic-miracle.jpg",
      accent: "from-sky-500/30 via-blue-500/20 to-transparent",
      glow: "56,132,255",
      badge: "#fbbf24",
    },
    {
      title: "Money Garden Simulator",
      tagline: "Grow a little economy, one seed at a time.",
      description:
        "A cozy management sim where every plant is an asset and every harvest is a market. Cultivate your garden, balance supply and demand, and watch a calm world of numbers quietly bloom, designed for players who want strategy without stress.",
      tags: ["Cozy", "Simulation", "Management", "Relaxing"],
      genre: "Cozy / Management Sim",
      status: "Launch · 15 October",
      year: "2026",
      steamUrl:
        "https://store.steampowered.com/app/4202100/Money_Garden_Simulator/",
      image: "/games/money-garden.jpg",
      accent: "from-emerald-500/30 via-lime-400/20 to-transparent",
      glow: "16,185,129",
      badge: "#34d399",
    },
  ] as Game[],
  ru: [
    {
      title: "Economic Miracle",
      tagline: "Самый амбициозный геополитический симулятор современности.",
      description:
        "Возьмите под контроль любую нацию и приведите её к величию. Управляйте экономикой, законами, армией и дипломатией в 1 423 регионах и 33 700 провинциях, глубокая стратегия, построенная на данных, для тех, кто любит сложные системы.",
      tags: ["Гранд-стратегия", "Симулятор", "Политика", "4X"],
      genre: "Гранд-стратегия / Симулятор",
      status: "В разработке",
      year: "2026",
      steamUrl: "https://store.steampowered.com/app/3738130/Economic_Miracle/",
      image: "/games/economic-miracle.jpg",
      accent: "from-sky-500/30 via-blue-500/20 to-transparent",
      glow: "56,132,255",
      badge: "#fbbf24",
    },
    {
      title: "Money Garden Simulator",
      tagline: "Выращивайте маленькую экономику — семя за семенем.",
      description:
        "Уютный симулятор управления, где каждое растение это актив, а каждый урожай это рынок. Развивайте сад, балансируйте спрос и предложение и наблюдайте, как тихо расцветает спокойный мир цифр, для тех, кому нужна стратегия без стресса.",
      tags: ["Уютная", "Симулятор", "Менеджмент", "Расслабляющая"],
      genre: "Уютный / Симулятор менеджмента",
      status: "Выход · 15 октября",
      year: "2026",
      steamUrl:
        "https://store.steampowered.com/app/4202100/Money_Garden_Simulator/",
      image: "/games/money-garden.jpg",
      accent: "from-emerald-500/30 via-lime-400/20 to-transparent",
      glow: "16,185,129",
      badge: "#34d399",
    },
  ] as Game[],
};

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      about: "Studio",
      games: "Games",
      team: "Team",
      contact: "Submit",
      cta: "Join us",
    },
    hero: {
      eyebrow: "PC Game Publisher · Steam",
      titleLine1: "We don't just publish games.",
      titleLine2Lead: "We publish ",
      titleLine2Key: "market position.",
      subtitle:
        "Sector Games creates PC games for Steam, specializing in simulator, strategy, and cozy experiences designed for specific player audiences.",
      ctaPrimary: "Our games",
      ctaSecondary: "About studio",
      stat1Value: "3",
      stat1Label: "Core genres",
      stat2Value: "Steam",
      stat2Label: "Native platform",
      stat3Value: "100%",
      stat3Label: "Audience-first",
    },
    about: {
      eyebrow: "About the company",
      titleLead: "We are",
      titleAccent: "Sector Games",
      body: "An independent PC games company built around one idea: a great game deserves the exact audience that will love it. We craft simulator, strategy, and cozy titles for players who want depth, not noise.",
      body2: "Most studios chase downloads. We engineer market position, aligning every title with its audience and carrying it from first announcement to launch and beyond.",
      pillars: [
        {
          title: "Simulator",
          body: "Deep, systems-driven worlds where every number means something and mastery is its own reward.",
        },
        {
          title: "Strategy",
          body: "Games of decisions and consequence, built for players who think three moves ahead.",
        },
        {
          title: "Cozy",
          body: "Calm, welcoming experiences designed to relax, strategy without the stress.",
        },
      ],
    },
    games: {
      eyebrow: "Our Projects",
      title: "Games with a place in the market.",
      subtitle:
        "Every release is aimed at a specific player. Here's what we're building.",
      viewOnSteam: "View on Steam",
      items: games.en,
    },
    team: {
      eyebrow: "The Team",
      title: "Co-Founders",
      subtitle: "A small team with a sharp focus on positioning and reach.",
      members: [
        {
          name: "Nichita Barsanu",
          role: "Co-Founder · Publishing & Positioning",
          bio: "Sets publishing strategy and market positioning across the company, aligning every title with its target audience.",
          image: "/team/nichita-barsanu.jpg",
          telegram: "https://t.me/nbyrsanu9",
        },
        {
          name: "Nichita Gancear",
          role: "Co-Founder · Community & Channels",
          bio: "Leads community and channel strategy, building the audiences and partnerships that carry a title from wishlist to launch and beyond.",
          image: "/team/nichita-gancear.png",
          telegram: "https://t.me/MrEngine01",
        },
      ],
    },
    contact: {
      eyebrow: "Careers",
      titleLead: "Become part of",
      titleAccent: "Sector Games",
      subtitle:
        "We're looking for people who love simulator, strategy, and cozy games and want to build titles that find their audience. Indie spirit, real ownership, and work that ships.",
      listTitle: "Open Positions",
      listItems: [
        { title: "Unity Developer", tags: "C# · Gameplay · Tools", hot: true },
        {
          title: "3D Artist",
          tags: "Modeling · Texturing · Props",
          hot: false,
        },
        {
          title: "Game Designer",
          tags: "Systems · Balance · Levels",
          hot: true,
        },
      ],
      listFooter:
        "Working on your own game? Send us your project, pick a role or write to us in free form below.",
      wanted: "Hot",
      formHeading: "Apply now",
      nameLabel: "Name",
      namePlaceholder: "Alexander",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      roleLabel: "Role",
      rolePlaceholder: "Unity Developer, 3D Artist…",
      linkLabel: "Portfolio / Link",
      linkPlaceholder: "https://artstation.com/…",
      discordLabel: "Discord (for contact)",
      discordPlaceholder: "username#0000",
      messageLabel: "About you",
      messagePlaceholder:
        "Tell us who you are, what you do well, and why you want to make games with us…",
      submit: "Send application",
      submitting: "Sending…",
      successTitle: "Application received.",
      successBody:
        "Thanks for reaching out. We review every application and respond within 3-5 business days.",
      sendAnother: "Send another",
      responseNote:
        "We review every application and respond within 3-5 business days.",
      directLine: "Prefer email? Reach us directly at",
    },
    follow: {
      title: "Follow us",
      subtitle:
        "Release news, announcements, and behind-the-scenes on our games, all in our social channels.",
    },
    footer: {
      tagline: "We don't just publish games. We publish market position.",
      rights: "All rights reserved.",
      madeIn: "PC games for Steam · Simulator · Strategy · Cozy",
      nav: "Navigate",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  ru: {
    nav: {
      about: "Студия",
      games: "Игры",
      team: "Команда",
      contact: "Заявка",
      cta: "В команду",
    },
    hero: {
      eyebrow: "Издатель PC-игр · Steam",
      titleLine1: "Мы издаём не просто игры.",
      titleLine2Lead: "Мы издаём ",
      titleLine2Key: "позицию на рынке.",
      subtitle:
        "Sector Games создаёт PC-игры для Steam, специализируясь на симуляторах, стратегиях и уютных играх, созданных для конкретной аудитории игроков.",
      ctaPrimary: "Наши игры",
      ctaSecondary: "О студии",
      stat1Value: "3",
      stat1Label: "Ключевых жанра",
      stat2Value: "Steam",
      stat2Label: "Основная платформа",
      stat3Value: "100%",
      stat3Label: "Аудитория прежде всего",
    },
    about: {
      eyebrow: "О компании",
      titleLead: "Мы —",
      titleAccent: "Sector Games",
      body: "Независимая компания-издатель PC-игр, построенная вокруг одной идеи: хорошая игра заслуживает именно ту аудиторию, которая её полюбит. Мы создаём симуляторы, стратегии и уютные игры для тех, кому нужна глубина, а не шум.",
      body2: "Большинство студий гонятся за загрузками. Мы выстраиваем позицию на рынке, согласуя каждую игру с её аудиторией и ведя её от первого анонса до релиза и дальше.",
      pillars: [
        {
          title: "Симулятор",
          body: "Глубокие, системные миры, где каждая цифра важна, а мастерство само по себе награда.",
        },
        {
          title: "Стратегия",
          body: "Игры решений и последствий, для тех, кто думает на три хода вперёд.",
        },
        {
          title: "Уют",
          body: "Спокойные, тёплые игры, созданные для отдыха, стратегия без стресса.",
        },
      ],
    },
    games: {
      eyebrow: "Наши проекты",
      title: "Игры со своим местом на рынке.",
      subtitle:
        "Каждый релиз нацелен на конкретного игрока. Вот что мы создаём.",
      viewOnSteam: "Открыть в Steam",
      items: games.ru,
    },
    team: {
      eyebrow: "Команда",
      title: "Со-основатели",
      subtitle: "Небольшая команда с чётким фокусом на позиционировании и охвате.",
      members: [
        {
          name: "Никита Барсану",
          role: "Со-основатель · Издание и позиционирование",
          bio: "Определяет издательскую стратегию и позиционирование на рынке для всей компании, согласуя каждую игру с её целевой аудиторией.",
          image: "/team/nichita-barsanu.jpg",
          telegram: "https://t.me/nbyrsanu9",
        },
        {
          name: "Никита Ганчар",
          role: "Со-основатель · Сообщество и каналы",
          bio: "Руководит стратегией сообщества и каналов, выстраивая аудитории и партнёрства, которые ведут игру от списка желаемого к релизу и дальше.",
          image: "/team/nichita-gancear.png",
          telegram: "https://t.me/MrEngine01",
        },
      ],
    },
    contact: {
      eyebrow: "Вакансии",
      titleLead: "Стань частью",
      titleAccent: "Sector Games",
      subtitle:
        "Мы ищем людей, которые любят симуляторы, стратегии и уютные игры и хотят создавать проекты, находящие свою аудиторию. Инди-дух, реальная ответственность и работа, которая выходит в релиз.",
      listTitle: "Открытые вакансии",
      listItems: [
        {
          title: "Unity-разработчик",
          tags: "C# · Геймплей · Инструменты",
          hot: true,
        },
        {
          title: "3D-художник",
          tags: "Моделинг · Текстуры · Пропсы",
          hot: false,
        },
        {
          title: "Гейм-дизайнер",
          tags: "Системы · Баланс · Уровни",
          hot: true,
        },
      ],
      listFooter:
        "Делаете свою игру? Отправьте нам проект, выберите роль или напишите в свободной форме ниже.",
      wanted: "Ищем",
      formHeading: "Откликнуться",
      nameLabel: "Имя",
      namePlaceholder: "Александр",
      emailLabel: "Эл. почта",
      emailPlaceholder: "you@example.com",
      roleLabel: "Роль",
      rolePlaceholder: "Unity-разработчик, 3D-художник…",
      linkLabel: "Портфолио / Ссылка",
      linkPlaceholder: "https://artstation.com/…",
      discordLabel: "Discord (для связи)",
      discordPlaceholder: "username#0000",
      messageLabel: "О себе",
      messagePlaceholder:
        "Расскажите, кто вы, что умеете и почему хотите делать игры с нами…",
      submit: "Отправить заявку",
      submitting: "Отправка…",
      successTitle: "Заявка получена.",
      successBody:
        "Спасибо, что написали. Мы рассматриваем каждую заявку и отвечаем в течение 3-5 рабочих дней.",
      sendAnother: "Отправить ещё",
      responseNote:
        "Мы рассматриваем каждую заявку и отвечаем в течение 3-5 рабочих дней.",
      directLine: "Предпочитаете почту? Пишите напрямую:",
    },
    follow: {
      title: "Мы в соцсетях",
      subtitle:
        "Новости релизов, анонсы и закулисье наших игр, всё в наших социальных каналах.",
    },
    footer: {
      tagline: "Мы издаём не просто игры. Мы издаём позицию на рынке.",
      rights: "Все права защищены.",
      madeIn: "PC-игры для Steam · Симулятор · Стратегия · Уют",
      nav: "Навигация",
      contact: "Контакты",
      privacy: "Конфиденциальность",
      terms: "Условия",
    },
  },
};
