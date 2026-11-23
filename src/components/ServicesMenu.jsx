import { useState, useEffect } from 'react';

const TAB_LABELS = {
  damen: 'Damen',
  herren: 'Herren',
  kids: 'Kinder',
};

export default function ServicesMenu({ initialData }) {
  const [activeTab, setActiveTab] = useState('damen');

  useEffect(() => {
    const handleTabSelect = (event) => {
      if (event.detail?.tab && initialData[event.detail.tab]) {
        setActiveTab(event.detail.tab);
      }
    };
    window.addEventListener('selectServiceTab', handleTabSelect);
    return () => window.removeEventListener('selectServiceTab', handleTabSelect);
  }, [initialData]);

  const tabs = Object.keys(initialData);
  const activeServices = initialData[activeTab] || [];

  return (
    <div>
      {/* Minimalist Editorial Category Switcher */}
      <div
        role="tablist"
        aria-label="Leistungskategorien"
        className="flex justify-center items-center gap-2 sm:gap-4 mb-14 border-b border-linen pb-4"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const label = TAB_LABELS[tab] || tab.charAt(0).toUpperCase() + tab.slice(1);
          return (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 sm:px-9 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-espresso text-cream shadow-sm'
                  : 'text-ink hover:text-espresso hover:bg-cream'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Fine Boutique Price List */}
      <div
        role="tabpanel"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2"
      >
        {activeServices.map((service, index) => (
          <article
            key={`${activeTab}-${index}`}
            className="group py-6 border-b border-linen flex flex-col justify-between transition-colors duration-300"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-center flex-wrap gap-2.5">
                  <h3 className="font-serif text-2xl text-espresso group-hover:text-branding-700 transition-colors">
                    {service.title}
                  </h3>
                  {service.highlight && (
                    <span className="text-[10px] uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full bg-branding-100 text-branding-800 font-medium">
                      Beliebt
                    </span>
                  )}
                </div>
                <span className="font-sans text-base sm:text-lg font-medium text-espresso whitespace-nowrap">
                  {service.price}
                </span>
              </div>

              <p className="text-sm text-ink font-light leading-relaxed mt-2.5 pr-4">
                {service.text}
              </p>
            </div>

            {service.duration && (
              <div className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-taupe">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Dauer: {service.duration}</span>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Single High-Contrast Consultation Callout */}
      <div className="mt-16 rounded-[1.75rem] bg-espresso text-cream px-7 py-10 sm:px-12 sm:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <p className="text-[11px] uppercase tracking-editorial text-branding">
            Persönliche Beratung
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-cream">
            Unsicher, welcher Look zu dir passt?
          </h3>
          <p className="text-sm text-cream/75 font-light leading-relaxed">
            Ruf uns einfach kurz an oder lass dich auf Instagram inspirieren – wir beraten
            dich ehrlich zu Schnitt, Farbtechnik und Pflegeaufwand.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 flex-shrink-0">
          <a
            href="tel:+4928421219526"
            className="inline-flex items-center gap-2.5 bg-branding text-espresso px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-branding-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>02842 1219526</span>
          </a>
          <a
            href="https://www.instagram.com/friseur_jacqueline_dickhaus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/25 text-cream px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:border-branding hover:text-branding transition-colors"
          >
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
