export const SCALE_OPTIONS = [
  { value: 1, shortLabel: "1", label: "Muy en desacuerdo" },
  { value: 2, shortLabel: "2", label: "En desacuerdo" },
  { value: 3, shortLabel: "3", label: "Neutral" },
  { value: 4, shortLabel: "4", label: "De acuerdo" },
  { value: 5, shortLabel: "5", label: "Muy de acuerdo" },
];

export const TRAIT_META = {
  extraversion: {
    id: "extraversion",
    label: "Energía social",
    shortLabel: "Social",
    color: "var(--trait-extraversion)",
    levels: {
      high: "Tiendes a expresarte con facilidad y a activarte en contacto con otras personas.",
      medium: "Alternas bien entre momentos de interacción y espacios más reservados.",
      low: "Sueles recargar energía en entornos tranquilos y con menos estímulo social.",
    },
  },
  conscientiousness: {
    id: "conscientiousness",
    label: "Organización",
    shortLabel: "Orden",
    color: "var(--trait-conscientiousness)",
    levels: {
      high: "Te orientas a la planificación, el compromiso y la constancia.",
      medium: "Combinas estructura con flexibilidad según la situación.",
      low: "Prefieres moverte con espontaneidad y adaptarte sobre la marcha.",
    },
  },
  agreeableness: {
    id: "agreeableness",
    label: "Empatía",
    shortLabel: "Empatía",
    color: "var(--trait-agreeableness)",
    levels: {
      high: "Das mucho valor a la cooperación, la sensibilidad y el cuidado del vínculo.",
      medium: "Puedes equilibrar cercanía emocional con firmeza cuando hace falta.",
      low: "Sueles priorizar la franqueza, la autonomía y la objetividad directa.",
    },
  },
  emotionalStability: {
    id: "emotionalStability",
    label: "Estabilidad emocional",
    shortLabel: "Estabilidad",
    color: "var(--trait-emotionalStability)",
    levels: {
      high: "Normalmente mantienes la calma y recuperas el equilibrio con rapidez.",
      medium: "Tu nivel de autorregulación depende bastante del contexto y de la carga acumulada.",
      low: "Puedes sentir los cambios de presión con intensidad y necesitar más tiempo para reequilibrarte.",
    },
  },
  openness: {
    id: "openness",
    label: "Apertura mental",
    shortLabel: "Apertura",
    color: "var(--trait-openness)",
    levels: {
      high: "Te mueven la curiosidad, la imaginación y el deseo de explorar perspectivas nuevas.",
      medium: "Te abres a lo nuevo cuando percibes sentido o utilidad en ello.",
      low: "Prefieres lo conocido, lo práctico y los marcos claros antes que experimentar demasiado.",
    },
  },
};

export const TEST_SECTIONS = [
  {
    id: "extraversion",
    title: "Sección 1 · Energía social",
    description: "Explora cómo conectas con otras personas y de dónde sueles recargar energía.",
    questions: [
      {
        id: "extraversion_1",
        text: "Me siento con más energía después de compartir tiempo con otras personas.",
      },
      {
        id: "extraversion_2",
        text: "Prefiero pensar mis ideas en silencio antes que hablarlas con alguien.",
        reverse: true,
      },
      {
        id: "extraversion_3",
        text: "Suelo tomar la iniciativa cuando conozco gente nueva o entro en un grupo.",
      },
      {
        id: "extraversion_4",
        text: "Las reuniones largas me dejan agotado/a con rapidez.",
        reverse: true,
      },
    ],
  },
  {
    id: "conscientiousness",
    title: "Sección 2 · Organización",
    description: "Mide tu tendencia a planificar, ordenar prioridades y sostener hábitos.",
    questions: [
      {
        id: "conscientiousness_1",
        text: "Me resulta natural planificar antes de actuar.",
      },
      {
        id: "conscientiousness_2",
        text: "A menudo dejo tareas importantes para el último momento.",
        reverse: true,
      },
      {
        id: "conscientiousness_3",
        text: "Cumplir compromisos me importa incluso cuando nadie me supervisa.",
      },
      {
        id: "conscientiousness_4",
        text: "Me cuesta mantener rutinas si no tengo presión externa.",
        reverse: true,
      },
    ],
  },
  {
    id: "agreeableness",
    title: "Sección 3 · Empatía y vínculo",
    description: "Observa cómo sueles relacionarte emocionalmente y gestionar la cooperación.",
    questions: [
      {
        id: "agreeableness_1",
        text: "Intento comprender cómo se siente la otra persona antes de responder.",
      },
      {
        id: "agreeableness_2",
        text: "Cuando hay tensión, suelo adoptar una postura dura para que no se aprovechen.",
        reverse: true,
      },
      {
        id: "agreeableness_3",
        text: "Me siento cómodo/a colaborando para llegar a acuerdos.",
      },
      {
        id: "agreeableness_4",
        text: "Si alguien se equivoca, me cuesta ser paciente con esa persona.",
        reverse: true,
      },
    ],
  },
  {
    id: "emotionalStability",
    title: "Sección 4 · Estabilidad emocional",
    description: "Describe tu forma de reaccionar frente a la incertidumbre, la presión y los cambios.",
    questions: [
      {
        id: "emotionalStability_1",
        text: "Puedo recuperar la calma con relativa rapidez después de un mal día.",
      },
      {
        id: "emotionalStability_2",
        text: "Pequeños problemas me desbordan más de lo que me gustaría.",
        reverse: true,
      },
      {
        id: "emotionalStability_3",
        text: "Cuando algo sale distinto a lo esperado, suelo adaptarme sin bloquearme demasiado.",
      },
      {
        id: "emotionalStability_4",
        text: "Paso demasiado tiempo dándole vueltas a preocupaciones menores.",
        reverse: true,
      },
    ],
  },
  {
    id: "openness",
    title: "Sección 5 · Apertura mental",
    description: "Mide tu curiosidad, tu flexibilidad cognitiva y tu disposición a explorar.",
    questions: [
      {
        id: "openness_1",
        text: "Disfruto explorar ideas nuevas aunque no tengan una utilidad inmediata.",
      },
      {
        id: "openness_2",
        text: "Prefiero métodos conocidos antes que experimentar caminos distintos.",
        reverse: true,
      },
      {
        id: "openness_3",
        text: "Me atraen las conversaciones profundas, creativas o poco habituales.",
      },
      {
        id: "openness_4",
        text: "Los cambios inesperados suelen parecerme una molestia más que una oportunidad.",
        reverse: true,
      },
    ],
  },
];

export const TOTAL_QUESTIONS = TEST_SECTIONS.reduce(
  (total, section) => total + section.questions.length,
  0,
);

