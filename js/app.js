import { SCALE_OPTIONS, TEST_SECTIONS, TOTAL_QUESTIONS } from "./questions.js";
import {
  evaluateProfile,
  getAnsweredCount,
  getFirstIncompleteSectionIndex,
  isSectionComplete,
} from "./scoring.js";

const STORAGE_KEY = "mapa-interior-respuestas";

const state = {
  currentSectionIndex: 0,
  answers: loadAnswers(),
};

const elements = {
  alertBox: document.querySelector("#alert-box"),
  welcomeScreen: document.querySelector("#welcome-screen"),
  testForm: document.querySelector("#test-form"),
  resultScreen: document.querySelector("#result-screen"),
  resumeCounter: document.querySelector("#resume-counter"),
  startButton: document.querySelector("#start-button"),
  prevButton: document.querySelector("#prev-button"),
  nextButton: document.querySelector("#next-button"),
  sectionTitle: document.querySelector("#section-title"),
  sectionDescription: document.querySelector("#section-description"),
  sectionCounter: document.querySelector("#section-counter"),
  questionCounter: document.querySelector("#question-counter"),
  progressFill: document.querySelector("#progress-fill"),
  sectionTabs: document.querySelector("#section-tabs"),
  questionList: document.querySelector("#question-list"),
  resultTitle: document.querySelector("#result-title"),
  resultTagline: document.querySelector("#result-tagline"),
  archetypeName: document.querySelector("#archetype-name"),
  archetypeDescription: document.querySelector("#archetype-description"),
  primaryTrait: document.querySelector("#primary-trait"),
  traitsContainer: document.querySelector("#traits-container"),
  highlightList: document.querySelector("#highlight-list"),
  growthList: document.querySelector("#growth-list"),
  narrativeList: document.querySelector("#narrative-list"),
  reviewButton: document.querySelector("#review-button"),
  restartButton: document.querySelector("#restart-button"),
};

initialize();

function initialize() {
  updateResumeCounter();
  bindEvents();
}

function bindEvents() {
  elements.startButton.addEventListener("click", handleStart);
  elements.prevButton.addEventListener("click", goToPreviousSection);
  elements.nextButton.addEventListener("click", handleNext);
  elements.reviewButton.addEventListener("click", handleReview);
  elements.restartButton.addEventListener("click", handleRestart);
  elements.questionList.addEventListener("change", handleAnswerChange);
}

function handleStart() {
  hideAlert();

  if (getAnsweredCount(state.answers) === TOTAL_QUESTIONS) {
    renderResults();
    return;
  }

  state.currentSectionIndex = getFirstIncompleteSectionIndex(TEST_SECTIONS, state.answers);
  showTest();
  renderCurrentSection();
}

function handleReview() {
  hideAlert();
  state.currentSectionIndex = 0;
  showTest();
  renderCurrentSection();
}

function handleRestart() {
  state.answers = {};
  state.currentSectionIndex = 0;
  window.localStorage.removeItem(STORAGE_KEY);
  updateResumeCounter();
  hideAlert();
  showWelcome();
}

function handleAnswerChange(event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement) || target.type !== "radio") {
    return;
  }

  state.answers[target.name] = Number(target.value);
  persistAnswers();
  updateResumeCounter();
  hideAlert();
  renderCurrentSection();
}

function handleNext() {
  const currentSection = TEST_SECTIONS[state.currentSectionIndex];

  if (!isSectionComplete(currentSection, state.answers)) {
    showAlert("Antes de continuar, responde todas las preguntas de esta sección.");
    highlightMissingAnswers(currentSection);
    return;
  }

  hideAlert();

  if (state.currentSectionIndex < TEST_SECTIONS.length - 1) {
    state.currentSectionIndex += 1;
    renderCurrentSection();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  renderResults();
}

function goToPreviousSection() {
  hideAlert();

  if (state.currentSectionIndex === 0) {
    showWelcome();
    updateResumeCounter();
    return;
  }

  state.currentSectionIndex -= 1;
  renderCurrentSection();
}

function showWelcome() {
  elements.welcomeScreen.hidden = false;
  elements.testForm.hidden = true;
  elements.resultScreen.hidden = true;
}

function showTest() {
  elements.welcomeScreen.hidden = true;
  elements.testForm.hidden = false;
  elements.resultScreen.hidden = true;
}

function showResults() {
  elements.welcomeScreen.hidden = true;
  elements.testForm.hidden = true;
  elements.resultScreen.hidden = false;
}

function renderCurrentSection() {
  const section = TEST_SECTIONS[state.currentSectionIndex];
  const answeredCount = getAnsweredCount(state.answers);
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  elements.sectionTitle.textContent = section.title;
  elements.sectionDescription.textContent = section.description;
  elements.sectionCounter.textContent = `Sección ${state.currentSectionIndex + 1} de ${TEST_SECTIONS.length}`;
  elements.questionCounter.textContent = `${answeredCount} / ${TOTAL_QUESTIONS} respondidas`;
  elements.progressFill.style.width = `${progress}%`;
  elements.prevButton.textContent = state.currentSectionIndex === 0 ? "Volver al inicio" : "Anterior";
  elements.nextButton.textContent =
    state.currentSectionIndex === TEST_SECTIONS.length - 1 ? "Ver mi perfil" : "Siguiente sección";

  renderSectionTabs();
  renderQuestions(section);
}

function renderSectionTabs() {
  elements.sectionTabs.innerHTML = TEST_SECTIONS.map((section, index) => {
    const classes = ["section-tab"];

    if (index === state.currentSectionIndex) {
      classes.push("is-active");
    }

    if (isSectionComplete(section, state.answers)) {
      classes.push("is-complete");
    }

    return `<span class="${classes.join(" ")}">${index + 1}. ${section.title.replace(/^Sección\s\d+\s·\s/, "")}</span>`;
  }).join("");
}

function renderQuestions(section) {
  elements.questionList.innerHTML = section.questions
    .map((question, index) => {
      const selectedValue = Number(state.answers[question.id]);
      const isMissing = !Number.isFinite(selectedValue);

      return `
        <article class="question-card ${isMissing ? "" : "is-complete"}" data-question-id="${question.id}">
          <h3 class="question-card__title">${index + 1}. ${question.text}</h3>
          <div class="answer-grid" role="radiogroup" aria-label="${escapeHtml(question.text)}">
            ${SCALE_OPTIONS.map((option) => {
              const inputId = `${question.id}_${option.value}`;
              const checked = selectedValue === option.value ? "checked" : "";

              return `
                <div class="answer-option">
                  <input
                    id="${inputId}"
                    type="radio"
                    name="${question.id}"
                    value="${option.value}"
                    ${checked}
                  />
                  <label for="${inputId}">
                    <span class="answer-option__value">${option.shortLabel}</span>
                    <span class="answer-option__text">${option.label}</span>
                  </label>
                </div>
              `;
            }).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderResults() {
  const { traitScores, profile } = evaluateProfile(state.answers, TEST_SECTIONS);

  elements.resultTitle.textContent = profile.title;
  elements.resultTagline.textContent = `${profile.tagline} ${profile.summary}`;
  elements.archetypeName.textContent = profile.archetypeName;
  elements.archetypeDescription.textContent = profile.archetypeDescription;
  elements.primaryTrait.textContent = profile.primaryTrait;

  elements.traitsContainer.innerHTML = Object.values(traitScores)
    .map(
      (trait) => `
        <article class="trait-card trait-card--${trait.id}">
          <div class="trait-card__head">
            <h4>${trait.label}</h4>
            <span class="trait-card__score">${trait.score}%</span>
          </div>
          <div class="trait-card__bar">
            <div class="trait-card__bar-fill" style="width: ${trait.score}%; background: ${trait.color};"></div>
          </div>
          <span class="trait-card__level">Nivel ${trait.levelLabel}</span>
          <p>${trait.description}</p>
        </article>
      `,
    )
    .join("");

  elements.highlightList.innerHTML = profile.highlights.map((item) => `<li>${item}</li>`).join("");
  elements.growthList.innerHTML = profile.growthAreas.map((item) => `<li>${item}</li>`).join("");
  elements.narrativeList.innerHTML = profile.narrative
    .map(
      (item) => `
        <article class="narrative-item">
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");

  showResults();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateResumeCounter() {
  const answeredCount = getAnsweredCount(state.answers);
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
  elements.resumeCounter.textContent = `${progress}%`;
  elements.startButton.textContent = progress === 100 ? "Ver resultado guardado" : "Comenzar test";
}

function highlightMissingAnswers(section) {
  section.questions.forEach((question) => {
    const card = elements.questionList.querySelector(`[data-question-id="${question.id}"]`);
    const isAnswered = Number.isFinite(Number(state.answers[question.id]));

    if (card) {
      card.classList.toggle("is-missing", !isAnswered);
    }
  });
}

function showAlert(message) {
  elements.alertBox.hidden = false;
  elements.alertBox.textContent = message;
}

function hideAlert() {
  elements.alertBox.hidden = true;
  elements.alertBox.textContent = "";
}

function persistAnswers() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
}

function loadAnswers() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return {};
    }

    const parsed = JSON.parse(rawValue);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (error) {
    console.warn("No se pudieron recuperar las respuestas guardadas.", error);
    return {};
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

