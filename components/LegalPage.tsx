import { EVENT } from "./event";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <section className="relative px-4 pb-20 pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl border-[6px] border-saigon bg-white px-6 py-9 shadow-[inset_0_0_0_5px_#c9d7ee,0_10px_0_#01337f] md:px-12 md:py-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-saigon/70">{eyebrow}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
          <p className="mt-5 text-lg font-medium leading-8 text-ink/75 md:text-xl">{intro}</p>
          <p className="mt-5 text-sm font-bold text-saigon">Last updated: {updated}</p>
        </div>

        <div className="mt-14 space-y-7">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-2xl border-[3px] border-saigon bg-white px-6 py-6 shadow-[0_6px_0_#cbd8ee] md:px-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold text-saigon/40" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-semibold leading-tight">{section.title}</h2>
              </div>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="font-medium leading-7 text-ink/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-semibold text-ink/50">
          Questions about these terms can be sent to saigonkidshackathonoffical@gmail.com.
        </p>
      </div>
    </section>
  );
}

export const legalUpdated = "September 29, 2026";

export const eventLegalName = `${EVENT.name} 2027`;
