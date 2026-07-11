import { useState, useEffect } from 'react';

// Fallback-Daten (unverändert)
const fallbackData = {
  damen: [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: 'Haarschnitt',
      text: 'Waschen, Schneiden und Föhnen — individuell auf deinen Typ abgestimmt.',
      duration: '45 Min',
      price: 'ab 46€',
      highlight: true,
    },
    {
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z",
      title: 'Balayage',
      text: 'Natürliche Strähnentechnik für einen sonnenverwöhnten Look je nach Haarlänge.',
      duration: '90 Min',
      price: 'ab 150€',
      highlight: false,
    },
    {
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z",
      title: 'Ansatzfärbung',
      text: 'Professionelle Nachfärbung des Haaransatzes für gleichmäßige Farbe.',
      duration: '45 Min',
      price: 'ab 45€',
      highlight: false,
    },
    {
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
      title: 'Hochsteckfrisur',
      text: 'Elegante Hochsteckfrisur inklusive Probe für besondere Anlässe.',
      duration: '150 Min',
      price: '240€',
      highlight: false,
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: 'Intensivkur',
      text: 'Intensive Haarpflege für Regeneration und Glanz je nach Haarlänge.',
      duration: '15 Min',
      price: '10€',
      highlight: false,
    },
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: 'Make-up',
      text: 'Professionelles Make-up für Tages- oder Abendlook.',
      duration: '45-60 Min',
      price: 'ab 35€',
      highlight: false,
    },
  ],
  herren: [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: 'Maschinenschnitt',
      text: 'Präzise Konturen, moderne Fades und professionelle Bartpflege.',
      duration: 'ca. 30-45 Min',
      price: 'ab 32€',
      highlight: true,
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: 'Pflege',
      text: 'Spezialisierte Kopfhaut- und Haarpflege abgestimmt auf Männer.',
      duration: 'ca. 20-30 Min',
      price: 'ab 18€',
      highlight: false,
    },
    {
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
      title: 'Styling',
      text: 'Professionelles Finish mit Wachs, Gel und Pomade für deinen Style.',
      duration: 'ca. 15 Min',
      price: 'ab 12€',
      highlight: false,
    },
    {
      icon: "M4.5 12.75l6 6 9-13.5",
      title: 'Bartpflege',
      text: 'Trimmen, formen und pflegen — für den perfekt gepflegten Bart.',
      duration: 'ca. 20-30 Min',
      price: 'ab 22€',
      highlight: false,
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: 'Klassischer Schnitt',
      text: 'Zeitlose Eleganz oder moderne Interpretation — du entscheidest.',
      duration: 'ca. 45 Min',
      price: 'ab 38€',
      highlight: false,
    },
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: 'Augenbrauen',
      text: 'Präzises Formen und Konturieren für den perfekten Feinschliff.',
      duration: 'ca. 15 Min',
      price: 'ab 15€',
      highlight: false,
    },
  ],
  kids: [
    {
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: 'Süße Schnitte',
      text: 'Geduldig & kreativ — auch bei Zappelmäusen.',
      duration: '30 Min',
      price: 'ab 15€',
      highlight: true,
    },
    {
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
      title: 'Flechten & Zöpfe',
      text: 'Liebevolle Frisuren für besondere Anlässe.',
      duration: '45 Min',
      price: 'ab 35€',
      highlight: false,
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: 'Pflegeleicht',
      text: 'Alltagstauglich & kindgerecht gestylt.',
      duration: '15 Min',
      price: '10€',
      highlight: false,
    },
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: 'Waschen & Föhnen',
      text: 'Behutsam & stressfrei.',
      duration: '30 Min',
      price: '15€',
      highlight: false,
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: 'Glitzer & Accessoires',
      text: 'Extras, die Kinder lieben.',
      duration: '30 Min',
      price: 'ab 30€',
      highlight: false,
    },
    {
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
      title: 'Styling für Events',
      text: 'Geburtstag, Einschulung & mehr.',
      duration: '45 Min',
      price: 'ab 50€',
      highlight: false,
    },
  ],
};

export default function ModernTabs() {
  const [activeTab, setActiveTab] = useState('damen');
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  // Daten aus Browser-Speicher laden
  useEffect(() => {
    const loadServicesData = () => {
      try {
        const savedData = window.localStorage?.getItem('friseur-services-data');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setData(parsedData);
          console.log('✅ Gespeicherte Daten geladen');
        } else {
          console.log('ℹ️ Keine gespeicherten Daten gefunden, verwende Standard-Daten');
        }
      } catch (error) {
        console.warn('⚠️ Fehler beim Laden der gespeicherten Daten:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServicesData();

    // Event Listener für Datenänderungen von der Admin-Seite
    const handleDataUpdate = (event) => {
      if (event.detail && event.detail.servicesData) {
        setData(event.detail.servicesData);
        console.log('🔄 Daten von Admin-Seite aktualisiert');
      }
    };

    window.addEventListener('servicesDataUpdated', handleDataUpdate);
    
    return () => {
      window.removeEventListener('servicesDataUpdated', handleDataUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-branding"></div>
      </div>
    );
  }

  return (
    <div className="mt-16 font-josefin">
      {/* Enhanced Tab Navigation */}
      <div className="flex justify-center gap-2 mb-16">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 
              ${activeTab === tab
                ? 'bg-branding text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-branding-50 hover:border-branding/30 hover:shadow-md'
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {data[activeTab]?.map((service, index) => (
          <div
            key={index}
            className={`
              group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 
              transform hover:-translate-y-2 overflow-hidden border border-gray-100
              ${service.highlight ? 'ring-2 ring-branding/20' : ''}
            `}
          >
            {/* Highlight Badge */}
            {service.highlight && (
              <div className="absolute top-4 right-4 bg-branding text-white px-3 py-1 rounded-full text-xs font-medium">
                Beliebt
              </div>
            )}
            
            {/* Content */}
            <div className="p-8">
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-branding/10 rounded-xl flex items-center justify-center group-hover:bg-branding/20 transition-colors duration-300">
                    <svg 
                      className="w-6 h-6 text-branding transition-transform duration-300 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-branding transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.text}
                  </p>
                </div>
              </div>
              
              {/* Service Details */}
              <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-lg font-bold text-branding">
                    {service.price}
                  </div>
                </div>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                <a
                  href="tel:+4928421219526"
                  className="group flex-1 inline-flex items-center justify-center bg-branding text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:bg-branding-600 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Anrufen</span>
                </a>
                <a
                  href="https://www.instagram.com/friseur_jacqueline_dickhaus?igsh=MWF4OWJua3hmdTBhaw=="
                  target="_blank"
                  className="group flex-1 inline-flex items-center justify-center bg-branding text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:bg-branding-600 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a .75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-branding/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA Section */}
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Nicht sicher, was du brauchst?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Ruf uns an unter <a href="tel:+4928421219526" className="text-branding hover:underline">02842 1219526</a> oder folge uns auf <a href="https://www.instagram.com/friseur_jacqueline_dickhaus?igsh=MWF4OWJua3hmdTBhaw==" target="_blank" className="text-branding hover:underline">@friseur_jacqueline</a> für eine kostenlose Beratung!
        </p>
      </div>
    </div>
  );
}