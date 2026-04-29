import assert from "node:assert/strict";
import { TEST_SECTIONS } from "../js/questions.js";
import {
  calculateTraitScores,
  evaluateProfile,
  getAnsweredCount,
  getFirstIncompleteSectionIndex,
  getLevelFromPercentage,
  isSectionComplete,
  scoreAnswer,
} from "../js/scoring.js";

function buildAnswers(valueBySection) {
  return TEST_SECTIONS.reduce((answers, section) => {
    const fallback = valueBySection[section.id] ?? 3;

    section.questions.forEach((question) => {
      answers[question.id] = fallback;
    });

    return answers;
  }, {});
}

function buildDirectScoreAnswers(targetScores) {
  return TEST_SECTIONS.reduce((answers, section) => {
    const targetScore = targetScores[section.id] ?? 3;

    section.questions.forEach((question) => {
      answers[question.id] = question.reverse ? 6 - targetScore : targetScore;
    });

    return answers;
  }, {});
}

assert.equal(scoreAnswer(5), 5);
assert.equal(scoreAnswer(5, true), 1);
assert.equal(scoreAnswer(2, true), 4);
assert.throws(() => scoreAnswer(0), /Respuesta inválida/);

assert.equal(getLevelFromPercentage(85), "high");
assert.equal(getLevelFromPercentage(55), "medium");
assert.equal(getLevelFromPercentage(20), "low");

const partialAnswers = {
  [TEST_SECTIONS[0].questions[0].id]: 4,
  [TEST_SECTIONS[0].questions[1].id]: 2,
};

assert.equal(getAnsweredCount(partialAnswers), 2);
assert.equal(isSectionComplete(TEST_SECTIONS[0], partialAnswers), false);
assert.equal(getFirstIncompleteSectionIndex(TEST_SECTIONS, partialAnswers), 0);

const completeFirstSection = {
  ...partialAnswers,
  [TEST_SECTIONS[0].questions[2].id]: 4,
  [TEST_SECTIONS[0].questions[3].id]: 2,
};

assert.equal(isSectionComplete(TEST_SECTIONS[0], completeFirstSection), true);
assert.equal(getFirstIncompleteSectionIndex(TEST_SECTIONS, completeFirstSection), 1);

const balancedAnswers = buildAnswers({
  extraversion: 3,
  conscientiousness: 3,
  agreeableness: 3,
  emotionalStability: 3,
  openness: 3,
});

const balancedScores = calculateTraitScores(TEST_SECTIONS, balancedAnswers);
assert.equal(balancedScores.extraversion.score, 60);
assert.equal(balancedScores.extraversion.level, "medium");

const architectAnswers = buildDirectScoreAnswers({
  extraversion: 3,
  conscientiousness: 5,
  agreeableness: 3,
  emotionalStability: 5,
  openness: 3,
});
const architectProfile = evaluateProfile(architectAnswers, TEST_SECTIONS);
assert.equal(architectProfile.traitScores.conscientiousness.score, 100);
assert.equal(architectProfile.traitScores.emotionalStability.score, 100);
assert.equal(architectProfile.profile.archetypeName, "Arquitecto sereno");
assert.equal(architectProfile.profile.primaryTrait, "Organización");

const creativeObserverAnswers = buildDirectScoreAnswers({
  extraversion: 1,
  conscientiousness: 3,
  agreeableness: 3,
  emotionalStability: 3,
  openness: 5,
});
const creativeObserverProfile = evaluateProfile(creativeObserverAnswers, TEST_SECTIONS);
assert.equal(creativeObserverProfile.profile.archetypeName, "Observador creativo");
assert.equal(creativeObserverProfile.traitScores.extraversion.level, "low");
assert.equal(creativeObserverProfile.traitScores.openness.level, "high");

const connectorAnswers = buildDirectScoreAnswers({
  extraversion: 5,
  conscientiousness: 3,
  agreeableness: 3,
  emotionalStability: 3,
  openness: 3,
});
const connectorProfile = evaluateProfile(connectorAnswers, TEST_SECTIONS);
assert.equal(connectorProfile.profile.archetypeName, "Catalizador social");
assert.equal(connectorProfile.profile.primaryTrait, "Energía social");

console.log("Todas las pruebas de scoring han pasado correctamente.");

