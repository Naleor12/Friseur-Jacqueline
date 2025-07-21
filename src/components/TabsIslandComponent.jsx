import { useState } from 'react';

const data = {
  damen: [
    {
      icon: <path d="M15 9H9v6h6V9z" />,
      title: 'Haarschnitt',
      text: 'Individuell, typgerecht und stilvoll – Damen.',
      bg: 'bg-pink-50',
    },
    {
      icon: <path d="M12 20l9-5-9-5-9 5 9 5z" />,
      title: 'Coloration',
      text: 'Strahlende Farben, Highlights & Farbveredelung.',
      bg: 'bg-rose-50',
    },
    {
      icon: <path d="M5 13l4 4L19 7" />,
      title: 'Styling',
      text: 'Glamourös, glatt oder lockig für besondere Anlässe.',
      bg: 'bg-amber-50',
    },
    {
      icon: <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />,
      title: 'Pflege & Kur',
      text: 'Regeneration und Glanz mit hochwertigen Produkten.',
      bg: 'bg-teal-50',
    },
    {
      icon: <path d="M16 12A4 4 0 1 0 8 12a4 4 0 0 0 8 0z" />,
      title: 'Make-up',
      text: 'Natürlich bis glamourös – für besondere Momente.',
      bg: 'bg-green-50',
    },
    {
      icon: <path d="M12 4v16m8-8H4" />,
      title: 'Beratung',
      text: 'Typberatung und individuelle Empfehlungen.',
      bg: 'bg-indigo-50',
    },
  ],
  herren: [
    {
      icon: <path d="M12 4v16m8-8H4" />,
      title: 'Maschinenschnitt',
      text: 'Präzise Konturen, Bartpflege & moderne Looks.',
      bg: 'bg-indigo-50',
    },
    {
      icon: <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />,
      title: 'Pflege',
      text: 'Kopfhaut- & Haarpflege abgestimmt auf Männer.',
      bg: 'bg-teal-50',
    },
    {
      icon: <path d="M16 12A4 4 0 1 0 8 12a4 4 0 0 0 8 0z" />,
      title: 'Styling',
      text: 'Wachs, Gel & Finish für dein Signature-Style.',
      bg: 'bg-green-50',
    },
    {
      icon: <path d="M15 9H9v6h6V9z" />,
      title: 'Bartpflege',
      text: 'Trimmen, formen & pflegen mit Stil.',
      bg: 'bg-pink-50',
    },
    {
      icon: <path d="M12 20l9-5-9-5-9 5 9 5z" />,
      title: 'Klassischer Schnitt',
      text: 'Modern oder retro – du entscheidest.',
      bg: 'bg-rose-50',
    },
    {
      icon: <path d="M5 13l4 4L19 7" />,
      title: 'Augenbrauen',
      text: 'Formen & Konturieren für den Feinschliff.',
      bg: 'bg-amber-50',
    },
  ],
  kids: [
    {
      icon: <path d="M5 13l4 4L19 7" />,
      title: 'Süße Schnitte',
      text: 'Geduldig & kreativ – auch bei Zappelmäusen.',
      bg: 'bg-yellow-50',
    },
    {
      icon: <path d="M15 9H9v6h6V9z" />,
      title: 'Flechten & Zöpfe',
      text: 'Liebevolle Frisuren für besondere Anlässe.',
      bg: 'bg-purple-50',
    },
    {
      icon: <path d="M12 4v16m8-8H4" />,
      title: 'Pflegeleicht',
      text: 'Alltagstauglich & kindgerecht gestylt.',
      bg: 'bg-blue-50',
    },
    {
      icon: <path d="M12 20l9-5-9-5-9 5 9 5z" />,
      title: 'Waschen & Föhnen',
      text: 'Behutsam & stressfrei.',
      bg: 'bg-rose-50',
    },
    {
      icon: <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />,
      title: 'Glitzer & Accessoires',
      text: 'Extras, die Kinder lieben.',
      bg: 'bg-teal-50',
    },
    {
      icon: <path d="M16 12A4 4 0 1 0 8 12a4 4 0 0 0 8 0z" />,
      title: 'Styling für Events',
      text: 'Geburtstag, Einschulung & mehr.',
      bg: 'bg-green-50',
    },
  ],
};

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('damen');

  return (
    <div className="mt-20 font-josefin">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow border transition-all
              ${activeTab === tab
                ? 'bg-[#d3b5b7] text-white border-[#d3b5b7]'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-[#f8f3f4]'}
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Karten */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {data[activeTab].map(({ icon, title, text, bg }, index) => (
          <div
            key={index}
            className={`group ${bg} p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1`}
          >
            <svg className="mx-auto h-10 w-10 text-[#d3b5b7] mb-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {icon}
            </svg>
            <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
            <p className="text-gray-700 text-center text-sm">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
