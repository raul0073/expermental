import { Metadata } from "next";
import { SECTIONS_TEXT } from "./sections";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Mental Score Platform Documentation | Football Analytics",
    description:
      "Learn how the Mental Score platform calculates player mental traits like resilience, composure, and creativity, and why it matters for performance analysis.",
    keywords: [
      "football analytics",
      "mental score",
      "player evaluation",
      "resilience",
      "composure",
      "creativity",
      "sports data",
    ],
    openGraph: {
      title: "Mental Score Platform Documentation",
      description:
        "Understand how we calculate Mental Scores for football players and what traits we evaluate.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mental Score Platform Documentation",
      description:
        "Understand how we calculate Mental Scores for football players and what traits we evaluate.",
    },
  };
};


function page() {
  const sections = [
    { id: "what-is-mental-score", title: "What is the Mental Score?", content: SECTIONS_TEXT.whatIsMentalScore },
    { id: "why-calculate", title: "Why do we calculate a Mental Score?", content: SECTIONS_TEXT.whyCalculate },
    { id: "how-calculated", title: "How the Mental Score is Calculated", content: SECTIONS_TEXT.howCalculatedIntro },
    { id: "output-use-cases", title: "Output and Use Cases", content: SECTIONS_TEXT.outputUseCases },
    { id: "summary", title: "Summary", content: SECTIONS_TEXT.summary },
  ];

  return (
    <div className="flex max-w-7xl px-6 py-10 gap-10 relative">
      {/* Aside / Index */}
      <aside className="hidden md:block sticky top-20 w-64 self-start">
        <nav className="space-y-2">
          <h3 className="font-bold text-lg mb-2">Contents</h3>
          <ul className="space-y-1">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="text-blue-600 hover:underline scroll-smooth"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-bold relative pl-4 leading-tight tracking-tight before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
          Experimental Documentation
        </h1>

        {/* Sections */}
        <section id="what-is-mental-score" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">What is the Mental Score?</h2>
          <p className="text-sm">{SECTIONS_TEXT.whatIsMentalScore}</p>
        </section>

        <section id="why-calculate" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">Why do we calculate a Mental Score?</h2>
          <p className="text-sm">{SECTIONS_TEXT.whyCalculate}</p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            {SECTIONS_TEXT.whyCalculateList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="how-calculated" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">How the Mental Score is Calculated</h2>
          <p className="text-sm">{SECTIONS_TEXT.howCalculatedIntro}</p>

          <h3 className="text-xl font-semibold">Step 1: Role Classification</h3>
          <p className="text-sm">{SECTIONS_TEXT.step1RoleClassification}</p>

          <h3 className="text-xl font-semibold">Step 2: Trait Mapping</h3>
          <p className="text-sm">{SECTIONS_TEXT.step2TraitMapping}</p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            {SECTIONS_TEXT.step2TraitMappingList.map((item, idx) => (
              <li key={idx}><strong>{item.role}:</strong> {item.traits}</li>
            ))}
          </ul>
          <p className="text-sm">{SECTIONS_TEXT.step2TraitMappingNote}</p>

          <h3 className="text-xl font-semibold">Step 3: Normalization & Aggregation</h3>
          <p className="text-sm">{SECTIONS_TEXT.step3Normalization}</p>

          <h3 className="text-xl font-semibold">Step 4: Filtering and Quality Control</h3>
          <p className="text-sm">{SECTIONS_TEXT.step4Filtering}</p>
        </section>

        <section id="output-use-cases" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">Output and Use Cases</h2>
          <p className="text-sm">{SECTIONS_TEXT.outputUseCases}</p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            {SECTIONS_TEXT.outputUseCasesList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="summary" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">Summary</h2>
          <p className="text-sm">{SECTIONS_TEXT.summary}</p>
        </section>
      </div>
    </div>
  );
}

export default page;
