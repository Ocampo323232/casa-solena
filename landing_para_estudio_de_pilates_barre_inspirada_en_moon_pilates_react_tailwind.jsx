import React, { useMemo, useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Leaf,
  MapPin,
  Phone,
  Clock3,
  ChevronRight,
  Quote,
  Star,
  ShieldCheck,
  Instagram,
  Facebook,
  Mail,
  Languages,
  MessageCircle
} from "lucide-react";

// —— CONFIGURABLE BRAND TOKENS ——
const BRAND = {
  name: "Casa Solena",
  primary: "#8B5E3C", // Terracotta inspirado en la paleta
  accent: "#B3907A", // Rust / Brandy Rose
  light: "#F5F5EB", // Cream
  whatsapp: "https://wa.me/526642952887?text=Hola%20quiero%20reservar%20una%20clase",
  booking: "https://www.myfitune.io/embed/casa-solena/activities",
  address: "Av. División del Nte. 1044, Narvarte Poniente, Benito Juárez, 03020 Ciudad de México, CDMX",
  maps: "https://maps.google.com/?q=Av.+División+del+Nte.+1044,+CDMX"
};

// —— COPY: ES / EN ——
const COPY = {
  es: {
    nav: ["Clases", "Horarios", "Precios", "Instructores", "Ubicación", "Preguntas"],
    heroTitle: (
      <>Pilates y Barre <span className="text-[var(--accent)]">para sentirte increíble</span></>
    ),
    heroSubtitle:
      "Sesiones boutique con atención personalizada. Fuerza, postura y bienestar en un mismo lugar.",
    ctaBook: "Reservar clase",
    ctaWhats: "WhatsApp",
    trust: [
      "Clases de máximo 12 personas",
      "Instructores certificados",
      "Horarios flexibles mañana y tarde"
    ],
    classesTitle: "Nuestras clases",
    classes: [
      { title: "Reformer Pilates", desc: "Entrenamiento integral en cama Reformer para fuerza y control.", icon: Dumbbell },
      { title: "Mat Pilates", desc: "Rutinas en tapete para fortalecer core y mejorar postura.", icon: Leaf },
      { title: "Barre", desc: "Cardio de bajo impacto con enfoque en glúteos, piernas y abdomen.", icon: HeartPulse },
      { title: "Prenatal / Postnatal", desc: "Clases seguras y adaptadas en embarazo y postparto.", icon: ShieldCheck }
    ],
    scheduleTitle: "Horarios",
    pricesTitle: "Precios y membresías",
    instructorsTitle: "Instructores",
    testimonialsTitle: "Lo que dicen nuestras alumnas",
    faqTitle: "Preguntas frecuentes",
    locationTitle: "Ubicación",
    contactTitle: "Contacto",
    footer: "© " + new Date().getFullYear() + " Casa Solena. Todos los derechos reservados.",
    faq: [
      { q: "¿Necesito experiencia previa?", a: "No. Tenemos clases introductorias y te guiamos paso a paso." },
      { q: "¿Qué debo llevar?", a: "Ropa cómoda, calcetines antiderrapantes (opcional) y ganas de moverte." },
      { q: "¿Cómo reservo o cancelo?", a: "Reserva desde la web o WhatsApp. Cancelaciones hasta 8h antes sin penalidad." }
    ],
    pricePlans: [
      { name: "Clase suelta", price: "$250", features: ["1 clase", "Vigencia 7 días"], highlight: false },
      { name: "Paquete 8 clases", price: "$1,600", features: ["8 accesos", "Vigencia 30 días", "Reserva flexible"], highlight: true },
      { name: "Ilimitadas Mensual", price: "$2,900", features: ["Clases ilimitadas", "Prioridad en reservas"], highlight: false }
    ],
    instructors: [
      { name: "Melissa A.", role: "Lead Instructor – Reformer / Barre", bio: "10+ años enseñando movimiento consciente.", img: "https://images.unsplash.com/photo-1544716278-e513176f20b5" },
      { name: "Aranza R.", role: "Mat / Prenatal", bio: "Especialista en embarazo y postparto.", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1" }
    ],
    testimonials: [
      { name: "Mariana", text: "En 3 semanas mejoró mi postura y cero dolor lumbar. Amo que las clases sean pequeñas.", stars: 5 },
      { name: "Sofía", text: "El ambiente es súper amable y las rutinas cambian siempre. Me motiva muchísimo.", stars: 5 }
    ]
  }
};

function Section({ id, children }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {children}
    </section>
  );
}

function StickyWhatsApp({ label }) {
  return (
    <a href={BRAND.whatsapp} target="_blank" className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-5 py-3 shadow-lg hover:bg-green-600">
      <MessageCircle className="w-5 h-5"/> {label}
    </a>
  );
}

export default function StudioLanding() {
  const [lang] = useState('es');
  const t = useMemo(() => COPY[lang], [lang]);

  // Auto-altura del iframe de Fitune
  useEffect(() => {
    const id = 'fitune-iframe-height';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = 'https://dev-my.fitune.io/iframeHeightSetter.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Horarios detallados
  const makeBlocks = (start,end) => Array.from({length:end-start},(_,i)=>`${start+i}:00`);
  const morning = makeBlocks(6,10);
  const nightMonThu = makeBlocks(18,22);
  const nightFri = makeBlocks(18,21);
  const sat = makeBlocks(8,12);
  const sun = makeBlocks(9,12);
  const schedule = [
    { day: "Lun", blocks: [...morning, ...nightMonThu] },
    { day: "Mar", blocks: [...morning, ...nightMonThu] },
    { day: "Mié", blocks: [...morning, ...nightMonThu] },
    { day: "Jue", blocks: [...morning, ...nightMonThu] },
    { day: "Vie", blocks: [...morning, ...nightFri] },
    { day: "Sáb", blocks: sat },
    { day: "Dom", blocks: sun }
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-gray-900 bg-gradient-to-b from-[var(--light)] via-white to-white" style={{"--accent": BRAND.accent}}>
        {/* —— HERO —— */}
        <Section id="hero">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{t.heroTitle}</h1>
              <p className="mt-4 text-lg text-gray-600">{t.heroSubtitle}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={BRAND.booking} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] text-white px-5 py-3 font-semibold hover:opacity-90">
                  <Clock3 className="w-5 h-5"/> {t.ctaBook}
                </a>
                <a href={BRAND.whatsapp} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50">
                  <Phone className="w-5 h-5"/> {t.ctaWhats}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.trust.map((v, i) => (
                  <span key={i} className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white/70 backdrop-blur border-gray-200">{v}</span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[var(--accent)]"/> 4.9/5 rating</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--accent)]"/> {BRAND.address}</div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-[var(--light)]">
                <iframe src="https://www.myfitune.io/embed/casa-solena/activities" width="100%" height="500" frameBorder="0" title="Reserva Casa Solena"></iframe>
              </div>
            </div>
          </div>
        </Section>

        {/* —— HORARIOS —— */}
        <Section id="sec-1">
          <h2 className="text-3xl font-bold mb-8">{t.scheduleTitle}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4">
            {schedule.map((col,idx)=>(
              <div key={idx} className="rounded-2xl border bg-white p-4">
                <div className="font-semibold mb-3">{col.day}</div>
                <div className="space-y-2">
                  {col.blocks.map((b,i)=>(
                    <div key={i} className="text-sm rounded-xl bg-[var(--light)] border border-gray-200 px-3 py-2">{b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        <p className="mt-4 text-sm text-gray-500">Clases de 1 hora · Máx. 12 alumnas/os por clase</p>
        </Section>

        {/* —— RESERVAS —— */}
        <Section id="reservas">
          <h2 className="text-3xl font-bold mb-8">Reserva tu clase</h2>
          <div className="rounded-2xl overflow-hidden border bg-white">
            <iframe id="fituneWebsiteIframeEmbed" src="https://www.myfitune.io/embed/casa-solena/activities" height="900" width="100%" frameBorder="0"/>
          </div>
          <p className="mt-4 text-sm text-gray-500">Capacidad por clase: 12 personas · Duración: 60 minutos</p>
        </Section>

        {/* —— PRECIOS (EMBED) —— */}
        <Section id="sec-2">
          <h2 className="text-3xl font-bold mb-8">{t.pricesTitle}</h2>
          <iframe src="https://www.myfitune.io/embed/casa-solena/pricing" width="100%" height="600" frameBorder="0"></iframe>
        </Section>

        {/* —— UBICACIÓN —— */}
        <Section id="sec-4">
          <h2 className="text-3xl font-bold mb-6">{t.locationTitle}</h2>
          <div className="rounded-2xl overflow-hidden border bg-white">
            <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.446076!2d-99.154!3d19.387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ0RNWA!5e0!3m2!1ses!2smx!4v1700000000000" width="100%" height="400" loading="lazy"></iframe>
          </div>
        </Section>

        {/* —— FOOTER —— */}
        <footer className="border-t py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>{t.footer}</div>
            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-[var(--accent)]">Inicio</a>
              <a href={BRAND.booking} target="_blank" className="hover:text-[var(--accent)]">{t.ctaBook}</a>
              <a href={BRAND.whatsapp} target="_blank" className="hover:text-[var(--accent)]">{t.ctaWhats}</a>
            </div>
          </div>
        </footer>

        <StickyWhatsApp label={t.ctaWhats}/>
      </div>
    </MotionConfig>
  );
}
