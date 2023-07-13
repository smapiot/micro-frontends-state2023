export interface BasicQuestion {
  id: string;
  question: string;
  section: string;
}

export interface LinearQuestion extends BasicQuestion {
  type: "linear";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface TextQuestion extends BasicQuestion {
  type: "text";
  hint: string;
  minLength: number;
  maxLength: number;
}

export interface ChoicesQuestion extends BasicQuestion {
  type: "choices";
  min: number;
  max: number;
  options: Array<string>;
}

export type Question = LinearQuestion | TextQuestion | ChoicesQuestion;

const basicsQuestions: Array<Question> = [
  {
    id: "q0000-knowledge" as const,
    question: "How would you rate your knowledge regarding micro frontends?",
    type: "linear" as const,
    min: 1,
    minLabel: "Beginner",
    max: 5,
    maxLabel: "Expert",
    section: "basics",
  },
  {
    id: "q0010-frameworks" as const,
    question:
      "What frameworks, libraries, or patterns for micro frontends do you know?",
    hint: "List as many as you want. Separate by comma.",
    type: "text" as const,
    section: "basics",
    minLength: 0,
    maxLength: 1024,
  },
  {
    id: "q0020-articles" as const,
    question: "How often do you read articles about micro frontends?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["Never", "Yearly", "Monthly", "Weekly", "Daily"],
    section: "basics",
  },
];

const experienceQuestions: Array<Question> = [
  {
    id: "q0100-solutions" as const,
    question: "How would you rate the currently available solutions?",
    type: "linear" as const,
    min: 1,
    minLabel: "Poor",
    max: 5,
    maxLabel: "Great",
    section: "experience",
  },
  {
    id: "q0110-advantage" as const,
    question: "What advantage do you like the most?",
    hint: "Give as much detail as you can based on what you've seen so far.",
    type: "text" as const,
    section: "experience",
    minLength: 0,
    maxLength: 2048,
  },
  {
    id: "q0120-disadvantages" as const,
    question: "What disadvantage(s) are you seeing?",
    hint: "Don't hold back. We can take it!",
    type: "text" as const,
    section: "experience",
    minLength: 0,
    maxLength: 2048,
  },
];

const ecosystemQuestions: Array<Question> = [
  {
    id: "q0200-mfframeworks" as const,
    question: "Which of the following micro frontend frameworks do you know?",
    type: "choices" as const,
    min: 0,
    max: 13,
    options: [
      "Piral",
      "single-spa",
      "FrintJS",
      "Fronts",
      "Mosaic",
      "Podium",
      "Open Components",
      "One App",
      "PuzzleJS",
      "NUT",
      "Luigi",
      "Micromono",
      "qiankun",
    ],
    section: "ecosystem",
  },
  {
    id: "q0210-frameworkuser" as const,
    question: "Have you used a micro frontend framework yet?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["Yes, one of the previous list", "Yes, a different one", "No"],
    section: "ecosystem",
  },
  {
    id: "q0220-mftools" as const,
    question: "Which of the following tools for micro frontends do you know?",
    type: "choices" as const,
    min: 1,
    max: 3,
    options: ["Module Federation", "Native Federation", "SystemJS"],
    section: "ecosystem",
  },
  {
    id: "q0230-tooluser" as const,
    question: "Have you used a micro frontend tool yet?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["Yes, one of the previous list", "Yes, a different one", "No"],
    section: "ecosystem",
  },
  {
    id: "q0240-mfdiscovery" as const,
    question: "What micro frontend discovery services do you know?",
    type: "choices" as const,
    min: 0,
    max: 4,
    options: [
      "Piral Feed Service",
      "OpenComponents Registry",
      "AWS Frontend Service Discovery",
      "Module Federation Medusa",
    ],
    section: "ecosystem",
  },
  {
    id: "q0250-discoveryuser" as const,
    question: "Are you using a micro frontend discovery service?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["Yes, one of the previous list", "Yes, a different one", "No"],
    section: "ecosystem",
  },
];

const techQuestions: Array<Question> = [
  {
    id: "q0300-target" as const,
    question: "For what target have you been developing micro frontends?",
    type: "choices" as const,
    min: 1,
    max: 4,
    options: ["Web", "Mobile", "Desktop", "Other"],
    section: "tech",
  },
  {
    id: "q0310-approach" as const,
    question: "Which of the following approaches do you prefer?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: [
      "Server-Side Composition",
      "Client-Side Composition",
      "Build-Time Composition",
    ],
    section: "tech",
  },
  {
    id: "q0320-technology" as const,
    question:
      "If using a single technology makes sense, which one(s) would you prefer?",
    type: "choices" as const,
    min: 1,
    max: 4,
    options: [
      "React",
      "Angular",
      "Vue",
      "Svelte",
      "Qwik",
      "Ember",
      "Elm",
      "Solid",
      "Blazor",
      "Other",
    ],
    section: "tech",
  },
  {
    id: "q0330-metaframework" as const,
    question: "Which meta framework would you prefer?",
    type: "choices" as const,
    min: 1,
    max: 4,
    options: [
      "Next",
      "Remix",
      "Nuxt",
      "Nest",
      "SvelteKit",
      "solid-start",
      "QwikCity",
      "Astro",
      "Other",
    ],
    section: "tech",
  },
];

const backgroundQuestions: Array<Question> = [
  {
    id: "q0400-employees" as const,
    question: "How many employees are at the company?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: [
      "1 - 10",
      "11 - 100",
      "101 - 1,000",
      "1,001 - 10,000",
      "more than 10,000",
    ],
    section: "background",
  },
  {
    id: "q0410-developers" as const,
    question: "How many (frontend) developers are in the project?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: [
      "1 - 5",
      "6 - 10",
      "11 - 20",
      "21 - 50",
      "51 - 100",
      "more than 100",
    ],
    section: "background",
  },
  {
    id: "q0420-team" as const,
    question: "How many people work on your / a single micro frontend?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: [
      "1 - 5",
      "6 - 10",
      "11 - 20",
      "21 - 50",
      "51 - 100",
      "more than 100",
    ],
    section: "background",
  },
  {
    id: "q0430-framework" as const,
    question:
      "Is there a single technology framework (e.g., React) or multiple?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["Single", "Multiple", "Not sure yet"],
    section: "background",
  },
  {
    id: "q0440-year" as const,
    question: "Which year did you start using micro frontends in your company?",
    type: "choices" as const,
    min: 1,
    max: 1,
    options: ["2023", "2022", "2021", "2020", "2019", "2018 or earlier"],
    section: "background",
  },
];

export const questions = [
  ...basicsQuestions,
  ...experienceQuestions,
  ...ecosystemQuestions,
  ...techQuestions,
  ...backgroundQuestions,
];
