import { TEST_SECTIONS, TRAIT_META } from "./questions.js";

const TRAIT_ORDER = Object.keys(TRAIT_META);

const ARCHETYPES = [
  {
    id: "explorador-magnetico",
    match: ({ extraversion, openness, emotionalStability }) =>
      extraversion.level === "high" && openness.level === "high" && emotionalStability.level === "high",
    name: "Explorador magnético",
    title: "Perfil expansivo y curioso",
    tagline:
      "Combinas apertura, iniciativa social y una base emocional suficientemente estable para convertir ideas en experiencias.",
    description:
      "Sueles moverte con soltura en entornos cambiantes. Te estimula conectar, descubrir y transformar lo nuevo en oportunidades concretas.",
  },
  {
    id: "arquitecto-sereno",
    match: ({ conscientiousness, emotionalStability }) =>
      conscientiousness.level === "high" && emotionalStability.level === "high",
    name: "Arquitecto sereno",
    title: "Perfil estructurado y estable",
    tagline:
      "Tiendes a responder con método, autocontrol y claridad incluso cuando el entorno exige mucho.",
    description:
      "Tu fortaleza principal está en organizar, sostener compromisos y mantener el foco sin desbordarte con facilidad.",
  },
  {
    id: "cuidador-sensible",
    match: ({ agreeableness, emotionalStability }) =>
      agreeableness.level === "high" && emotionalStability.level === "low",
    name: "Cuidador sensible",
    title: "Perfil empático e intenso",
    tagline:
      "Percibes bien lo que viven los demás y te implicas emocionalmente, aunque eso a veces eleva tu carga interna.",
    description:
      "Tienes una gran sensibilidad interpersonal. Cuando añades límites claros y más autorregulación, tu impacto positivo crece mucho.",
  },
  {
    id: "observador-creativo",
    match: ({ extraversion, openness }) =>
      extraversion.level === "low" && openness.level === "high",
    name: "Observador creativo",
    title: "Perfil reflexivo e imaginativo",
    tagline:
      "Necesitas espacio mental para procesar, imaginar y conectar ideas con profundidad.",
    description:
      "Tu mundo interno suele ser rico y matizado. Prefieres profundidad antes que ruido, y originalidad antes que repetición.",
  },
  {
    id: "constructor-confiable",
    match: ({ conscientiousness, agreeableness }) =>
      conscientiousness.level === "high" && agreeableness.level === "high",
    name: "Constructor confiable",
    title: "Perfil cooperativo y consistente",
    tagline:
      "Tiendes a crear estabilidad en los grupos mediante compromiso, empatía y sentido de responsabilidad.",
    description:
      "Sueles ser una persona en quien otros pueden apoyarse. Tu reto está en no cargar con más de lo que realmente te corresponde.",
  },
];

const DEFAULT_ARCHETYPE_BY_TRAIT = {
  extraversion: {
    name: "Catalizador social",
    title: "Perfil expresivo y movilizador",
    tagline: "Tu energía principal aparece en la interacción, la iniciativa y la capacidad de activar a otras personas.",
    description:
      "Sueles poner movimiento donde hay quietud. Cuando canalizas bien tu impulso, generas dinamismo y conexión.",
  },
  conscientiousness: {
    name: "Estratega constante",
    title: "Perfil disciplinado y orientado a objetivos",
    tagline: "Tu tendencia natural es ordenar, priorizar y sostener el esfuerzo con criterio.",
    description:
      "Tu sentido de estructura favorece resultados fiables. Bien equilibrado, te permite avanzar sin perder flexibilidad.",
  },
  agreeableness: {
    name: "Vínculo empático",
    title: "Perfil cercano y conciliador",
    tagline: "Tu fuerza aparece en la escucha, la cooperación y el cuidado de la relación.",
    description:
      "Tiendes a humanizar los contextos y a captar matices emocionales. Eso te vuelve una presencia valiosa para el grupo.",
  },
  emotionalStability: {
    name: "Centro sereno",
    title: "Perfil equilibrado y regulado",
    tagline: "Tiendes a mantener perspectiva y calma incluso cuando hay presión o incertidumbre.",
    description:
      "Tu estabilidad emocional puede convertirse en una base muy sólida para decidir, sostener a otros y cuidar tu propio ritmo.",
  },
  openness: {
    name: "Explorador mental",
    title: "Perfil curioso e innovador",
    tagline: "Tu impulso principal aparece en la curiosidad, la imaginación y la búsqueda de nuevas perspectivas.",
    description:
      "Sueles detectar conexiones poco obvias y abrir caminos nuevos. Bien encauzada, esa apertura enriquece todo lo que tocas.",
  },
};

export function scoreAnswer(value, reverse = false) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 1 || numericValue > 5) {
    throw new Error(`Respuesta inválida: ${value}`);
  }

  return reverse ? 6 - numericValue : numericValue;
}

export function getAnsweredCount(answers) {
  return Object.values(answers).filter((value) => Number.isFinite(Number(value))).length;
}

export function isSectionComplete(section, answers) {
  return section.questions.every((question) => Number.isFinite(Number(answers[question.id])));
}

export function getFirstIncompleteSectionIndex(sections, answers) {
  const index = sections.findIndex((section) => !isSectionComplete(section, answers));
  return index === -1 ? sections.length - 1 : index;
}

export function calculateTraitScores(sections = TEST_SECTIONS, answers = {}) {
  return sections.reduce((accumulator, section) => {
    const rawScore = section.questions.reduce((sum, question) => {
      const answer = answers[question.id];
      return sum + scoreAnswer(answer, question.reverse);
    }, 0);

    const maxScore = section.questions.length * 5;
    const percentage = Math.round((rawScore / maxScore) * 100);
    const level = getLevelFromPercentage(percentage);

    accumulator[section.id] = {
      id: section.id,
      label: TRAIT_META[section.id].label,
      shortLabel: TRAIT_META[section.id].shortLabel,
      score: percentage,
      rawScore,
      maxScore,
      level,
      levelLabel: getLevelLabel(level),
      description: TRAIT_META[section.id].levels[level],
      color: TRAIT_META[section.id].color,
    };

    return accumulator;
  }, {});
}

export function getLevelFromPercentage(score) {
  if (score >= 70) {
    return "high";
  }

  if (score >= 45) {
    return "medium";
  }

  return "low";
}

export function getLevelLabel(level) {
  if (level === "high") {
    return "Alto";
  }

  if (level === "medium") {
    return "Medio";
  }

  return "Bajo";
}

export function getDominantTrait(traitScores) {
  return TRAIT_ORDER.map((traitId) => traitScores[traitId]).sort((left, right) => right.score - left.score)[0];
}

function getTopTraits(traitScores, count = 2) {
  return TRAIT_ORDER.map((traitId) => traitScores[traitId]).sort((left, right) => right.score - left.score).slice(0, count);
}

function getLowTraits(traitScores, count = 2) {
  return TRAIT_ORDER.map((traitId) => traitScores[traitId]).sort((left, right) => left.score - right.score).slice(0, count);
}

function pickArchetype(traitScores) {
  const matched = ARCHETYPES.find((archetype) => archetype.match(traitScores));

  if (matched) {
    return matched;
  }

  const dominantTrait = getDominantTrait(traitScores);
  return DEFAULT_ARCHETYPE_BY_TRAIT[dominantTrait.id];
}

function buildHighlights(traitScores) {
  const topTraits = getTopTraits(traitScores, 3);

  return topTraits.map((trait) => {
    if (trait.level === "high") {
      return `${trait.label}: ${trait.description}`;
    }

    return `${trait.label}: muestras un equilibrio flexible que te permite adaptarte según el contexto.`;
  });
}

function buildGrowthAreas(traitScores) {
  const lowTraits = getLowTraits(traitScores, 2);

  return lowTraits.map((trait) => {
    if (trait.id === "emotionalStability") {
      return "Reserva momentos de descarga mental y estrategias de regulación para evitar acumular tensión innecesaria.";
    }

    if (trait.id === "conscientiousness") {
      return "Prueba sistemas simples de planificación para transformar intención en constancia sin sentir rigidez.";
    }

    if (trait.id === "extraversion") {
      return "Cuida tus espacios de energía, pero practica pequeñas iniciativas sociales cuando necesites visibilidad o conexión.";
    }

    if (trait.id === "agreeableness") {
      return "Combina honestidad con escucha activa para sostener vínculos sin dejar de expresar lo que necesitas.";
    }

    return "Introduce novedades de forma gradual: explorar un poco más puede ampliar tus recursos y tu perspectiva.";
  });
}

function buildNarrative(traitScores) {
  return TRAIT_ORDER.map((traitId) => {
    const trait = traitScores[traitId];

    return {
      id: trait.id,
      title: trait.label,
      text: `${trait.levelLabel} (${trait.score}%). ${trait.description}`,
    };
  });
}

export function getProfileResult(traitScores) {
  const archetype = pickArchetype(traitScores);
  const dominantTrait = getDominantTrait(traitScores);
  const topTraits = getTopTraits(traitScores);

  return {
    archetypeId: archetype.id ?? dominantTrait.id,
    title: archetype.title,
    tagline: archetype.tagline,
    archetypeName: archetype.name,
    archetypeDescription: archetype.description,
    primaryTrait: dominantTrait.label,
    highlights: buildHighlights(traitScores),
    growthAreas: buildGrowthAreas(traitScores),
    narrative: buildNarrative(traitScores),
    summary: `Tus rasgos más marcados ahora mismo son ${topTraits[0].label.toLowerCase()} y ${topTraits[1].label.toLowerCase()}.`,
  };
}

export function evaluateProfile(answers, sections = TEST_SECTIONS) {
  const traitScores = calculateTraitScores(sections, answers);
  const profile = getProfileResult(traitScores);

  return {
    traitScores,
    profile,
  };
}

