export interface Developer {
  slug: string;
  name: string;
  role: string;
  focus: string;
  blurb: string;
}

export const developers: Developer[] = [
  {
    slug: "abdullah",
    name: "Abdullah",
    role: "Founding Engineer",
    focus: "Developer workflow and tooling",
    blurb:
      "Builds the developer-facing surface of Oktant: the CLI, project structure, and the workflow engineers will interact with every day.",
  },
  {
    slug: "harris",
    name: "Harris",
    role: "Founding Engineer",
    focus: "Execution engine and runtime",
    blurb:
      "Owns how Oktant executes work: the pipeline, scheduling, and the guarantees programs get when they run on the platform.",
  },
  {
    slug: "moiz",
    name: "Moiz",
    role: "Founding Engineer",
    focus: "Runtime infrastructure",
    blurb:
      "Builds the substrate Oktant runs on: processes, isolation, networking, and the infrastructure that keeps execution reliable.",
  },
];

export function getDeveloper(slug: string): Developer | undefined {
  return developers.find((dev) => dev.slug === slug);
}