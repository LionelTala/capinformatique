// resources/js/pages/public/Home.tsx
import {
    AcademicCapIcon,
    ClockIcon,
    ComputerDesktopIcon,
    BriefcaseIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    SparklesIcon,
    UserGroupIcon,
    CheckBadgeIcon,
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    BadgeCheck,
    Users,
    GraduationCap,
} from 'lucide-react';

import { useState, useEffect, useCallback, useRef } from 'react';

import RevealSection from '@/Components/Home/RevealSection';
import Loader from '@/Components/Loader';
import PublicLayout from '@/Components/PublicLayout';

import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// ✅ Interface des props
interface Activite {
    id: number;
    title: string;
    date: string;
    excerpt: string | null;
    image_url: string;
    tag: string | null;
}

interface HomeProps {
    activites: Activite[];
}

// Données des slides Hero (statiques)
const heroSlides = [
    {
        id: 1,
        image: '/assets/images/img1.jpeg',
        badge: 'Rentrée académique 2026-2027',
        title: 'CAB Informatique',
        subtitle: 'Centre de Référence de la Formation Professionnelle au Cameroun',
        description: 'Depuis 22 ans, CAB Informatique forme des professionnels compétents, opérationnels, prêts pour le monde du travail — à Douala, Yaoundé, Bafoussam et en ligne.'
    },
    {
        id: 2,
        image: '/assets/images/certif.jpg',
        badge: 'Certifications en ligne',
        title: 'Faites certifier vos compétences',
        subtitle: 'Où que vous soyez, à votre rythme',
        description: 'Nos certifications en ligne vous permettent de valider vos compétences à distance.'
    },
    {
        id: 3,
        image: '/assets/images/img3.jpeg',
        badge: 'Formations pratiques',
        title: '100% pratique',
        subtitle: 'Dès la première semaine',
        description: 'On vous met devant le vrai matériel — pas seulement des slides. C\'est ça, la différence CAB.'
    }
];

const HERO_SLIDE_DURATION = 6500;

const avantages = [
    { icon: AcademicCapIcon, title: '100% Pratique', desc: 'On vous met devant le vrai matériel, dès la première semaine.' },
    { icon: ShieldCheckIcon, title: 'Formateurs qui exercent', desc: 'Pas des théoriciens : des professionnels qui forment sur ce qu\'ils pratiquent.' },
    { icon: ComputerDesktopIcon, title: 'Salles équipées', desc: 'Ordinateurs, logiciels sous licence, matériel réseau et vidéosurveillance réels.' },
    { icon: ClockIcon, title: 'Cours du jour ou du soir', desc: 'Étudiant, salarié ou en reconversion : un créneau existe pour vous.' },
];

const campus = [
    {
        ville: 'Douala',
        nom: 'Campus de Yassa',
        adresse: 'ELF, à 100 m de l\'Échangeur en allant vers l\'Aéroport',
        tel: '+237 675 64 77 39',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Yassa+Douala'
    },
    {
        ville: 'Yaoundé',
        nom: 'Campus de Nlongkak',
        adresse: 'À 100 m du rond-point Nlongkak, en face de MINDEVEL',
        tel: '+237 656 83 13 88',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Nlongkak+Yaounde'
    },
    {
        ville: 'Bafoussam',
        nom: 'Campus de Casablanca',
        adresse: 'Marché Casablanca, Immeuble Pharmacie de l\'Espérance',
        tel: '+237 659 02 74 16',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Casablanca+Bafoussam'
    }
];

export default function Home({ activites }: HomeProps) {
    const { ref: statsRef, isRevealed: statsVisible } = useScrollReveal<HTMLDivElement>(0.4);
    const annees = useCountUp(22, statsVisible);
    const diplomes = useCountUp(5000, statsVisible);
    const tauxReussite = useCountUp(85, statsVisible);

    // ✅ Utiliser les activités dynamiques
    const staticActivities = activites || [];

    // ============================================
    // Hero Carousel
    // ============================================
    const [currentSlide, setCurrentSlide] = useState(0);
    const [heroPaused, setHeroPaused] = useState(false);
    const [progressKey, setProgressKey] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const heroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const current = heroSlides[currentSlide];

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
        setProgressKey((k) => k + 1);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((i) => (i + 1) % heroSlides.length);
        setProgressKey((k) => k + 1);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((i) => (i - 1 + heroSlides.length) % heroSlides.length);
        setProgressKey((k) => k + 1);
    }, []);

    useEffect(() => {
        if (heroPaused || reducedMotion) return;
        heroTimeoutRef.current = setTimeout(nextSlide, HERO_SLIDE_DURATION);
        return () => {
            if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
        };
    }, [currentSlide, heroPaused, reducedMotion, progressKey, nextSlide]);

    // ============================================
    // Activités Carousel
    // ============================================
    const activityTrackRef = useRef<HTMLDivElement>(null);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const totalActivities = staticActivities.length;
    const isScrollingProgrammatically = useRef(false);

    const getSlotWidth = () => {
        const track = activityTrackRef.current;
        const slot = track?.querySelector<HTMLElement>('[data-activity-slot]');
        if (!track || !slot) return 0;
        const gap = 16;
        return slot.offsetWidth + gap;
    };

    const goToActivity = (index: number) => {
        const track = activityTrackRef.current;
        if (!track) return;
        const clamped = ((index % totalActivities) + totalActivities) % totalActivities;
        const slotWidth = getSlotWidth();

        isScrollingProgrammatically.current = true;
        track.scrollTo({ left: clamped * slotWidth, behavior: 'smooth' });
        setCurrentActivityIndex(clamped);

        setTimeout(() => {
            isScrollingProgrammatically.current = false;
        }, 500);
    };

    const nextActivity = () => goToActivity(currentActivityIndex + 1);
    const prevActivity = () => goToActivity(currentActivityIndex - 1);

    const handleActivityScroll = () => {
        if (isScrollingProgrammatically.current) return;
        const track = activityTrackRef.current;
        if (!track) return;
        const slotWidth = getSlotWidth();
        if (!slotWidth) return;
        const index = Math.round(track.scrollLeft / slotWidth);
        const clamped = ((index % totalActivities) + totalActivities) % totalActivities;
        setCurrentActivityIndex(clamped);
    };

    useEffect(() => {
        if (window.innerWidth < 1024) return;
        const interval = setInterval(nextActivity, 5000);
        return () => clearInterval(interval);
    }, [currentActivityIndex]);

    // ============================================
    // JSON-LD SEO
    // ============================================
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "CAB Informatique",
        "alternateName": "CAB Informatique - Centre de Formation Professionnelle",
        "description": "Centre de formation professionnelle en informatique, gestion, secrétariat et sécurité. Présent à Douala, Yaoundé et Bafoussam depuis 22 ans.",
        "url": "https://cab-informatique.com",
        "logo": "https://cab-informatique.com/assets/images/logo.jpeg",
        "image": "https://cab-informatique.com/assets/images/og-cab-informatique.jpg",
        "foundingDate": "2004",
        "telephone": "+237690666245",
        "email": "cabinfo2@gmail.com",
        "sameAs": [
            "https://facebook.com/cabinfo",
            "https://wa.me/237677835228",
            "https://tiktok.com/@cabinfo"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ELF, à 100 m de l'Échangeur",
            "addressLocality": "Douala",
            "addressRegion": "Littoral",
            "addressCountry": "CM"
        },
        "department": [
            {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique Douala",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "ELF, à 100 m de l'Échangeur",
                    "addressLocality": "Douala",
                    "addressCountry": "CM"
                },
                "telephone": "+237675647739"
            },
            {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique Yaoundé",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "À 100 m du rond-point Nlongkak",
                    "addressLocality": "Yaoundé",
                    "addressCountry": "CM"
                },
                "telephone": "+237656831388"
            },
            {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique Bafoussam",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Marché Casablanca",
                    "addressLocality": "Bafoussam",
                    "addressCountry": "CM"
                },
                "telephone": "+237659027416"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Formations CAB Informatique",
            "itemListElement": [
                {
                    "@type": "Course",
                    "name": "Secrétariat Bureautique",
                    "description": "Formation aux métiers du secrétariat et de l'assistanat",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                },
                {
                    "@type": "Course",
                    "name": "Secrétariat Comptable",
                    "description": "Formation en comptabilité et secrétariat",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                },
                {
                    "@type": "Course",
                    "name": "Logistique et Transit",
                    "description": "Formation en logistique et transport international",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                },
                {
                    "@type": "Course",
                    "name": "Infographie 2D & Multimédia",
                    "description": "Formation en graphisme et multimédia",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                },
                {
                    "@type": "Course",
                    "name": "Réseaux & Maintenance Informatique",
                    "description": "Formation en administration réseaux et maintenance",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                },
                {
                    "@type": "Course",
                    "name": "Vidéosurveillance",
                    "description": "Formation en installation et maintenance de systèmes de vidéosurveillance",
                    "provider": { "@type": "EducationalOrganization", "name": "CAB Informatique" }
                }
            ]
        }
    };

    return (
        <>
            <Head>
                <title>CAB Informatique — Formation Professionnelle en Présentiel et en Ligne au Cameroun</title>
                <meta
                    name="description"
                    content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques à Douala, Yaoundé et Bafoussam. Formations en présentiel et en ligne, DQP reconnu. Inscriptions ouvertes."
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CAB Informatique — Centre de Référence de la Formation Professionnelle au Cameroun" />
                <meta property="og:description" content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques. Formations en présentiel et en ligne. DQP reconnu." />
                <meta property="og:image" content="/assets/images/og-cab-informatique.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://cab-informatique.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:creator" content="@cabinfo" />
                <meta name="twitter:title" content="CAB Informatique — Formation Professionnelle au Cameroun" />
                <meta name="twitter:description" content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques. Formations en présentiel et en ligne. DQP reconnu." />
                <meta name="twitter:image" content="/assets/images/og-cab-informatique.jpg" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <Loader />

            <PublicLayout>

                {/* ============================================ */}
                {/* 1. HERO CAROUSEL */}
                {/* ============================================ */}
                <section
                    className="relative h-screen min-h-[640px] max-h-[940px] overflow-hidden bg-[#081428] text-white"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    onMouseEnter={() => setHeroPaused(true)}
                    onMouseLeave={() => setHeroPaused(false)}
                >
                    <style>{`
                        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
                        .hc-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
                        .hc-mono { font-family: 'IBM Plex Mono', monospace; }

                        @keyframes hcFadeUp {
                            from { opacity: 0; transform: translateY(14px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .hc-anim { animation: hcFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
                        @media (prefers-reduced-motion: reduce) {
                            .hc-anim { animation: none; }
                        }

                        @keyframes hcProgress {
                            from { transform: scaleX(0); }
                            to { transform: scaleX(1); }
                        }
                        .hc-progress { animation: hcProgress ${HERO_SLIDE_DURATION}ms linear forwards; }
                        .hc-progress-paused { animation-play-state: paused; }
                    `}</style>

                    <div className="absolute inset-0 z-0">
                        {heroSlides.map((slide, i) => (
                            <img
                                key={slide.id}
                                src={slide.image}
                                alt=""
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1100ms] ease-out ${
                                    i === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                fetchPriority={i === 0 ? 'high' : 'auto'}
                            />
                        ))}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(115deg, rgba(8,20,40,0.94) 0%, rgba(15,43,99,0.86) 42%, rgba(15,43,99,0.35) 78%)',
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.35), transparent 60%)',
                            }}
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full py-16">
                            <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-end lg:items-center">
                                <div key={current.id} className="max-w-2xl">
                                    <div
                                        className="hc-anim hc-mono inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase text-white/90 rounded-full border border-white/25 bg-white/[0.06] mb-7"
                                        style={{ animationDelay: '0ms' }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#f2b705]" />
                                        {current.badge}
                                    </div>

                                    <h1
                                        className="hc-anim hc-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] font-medium tracking-tight"
                                        style={{ animationDelay: '80ms' }}
                                    >
                                        {current.title}
                                        <br />
                                        <span className="text-[#f2b705]">{current.subtitle}</span>
                                    </h1>

                                    <p
                                        className="hc-anim mt-6 text-lg text-white/75 max-w-lg leading-relaxed"
                                        style={{ animationDelay: '160ms' }}
                                    >
                                        {current.description}
                                    </p>

                                    <div
                                        className="hc-anim flex flex-wrap items-center gap-5 mt-10"
                                        style={{ animationDelay: '240ms' }}
                                    >
                                        <Link
                                            href="/formations"
                                            className="group inline-flex items-center gap-2 px-7 py-4 bg-[#f2b705] text-[#0f2b63] rounded-full font-semibold hover:bg-white transition-colors duration-300"
                                        >
                                            Découvrir nos formations
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                        <a
                                            href="#activites"
                                            className="inline-flex items-center gap-2 px-7 py-4 text-white/90 font-medium hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white"
                                        >
                                            Voir nos activités
                                        </a>
                                    </div>
                                </div>

                                <div className="hidden lg:flex flex-col w-[19rem] shrink-0">
                                    <span className="hc-mono text-[11px] tracking-[0.16em] uppercase text-white/45 mb-3 pl-1">
                                        Programme — {String(currentSlide + 1).padStart(2, '0')} /{' '}
                                        {String(heroSlides.length).padStart(2, '0')}
                                    </span>
                                    <div className="border-t border-white/15">
                                        {heroSlides.map((slide, index) => {
                                            const active = index === currentSlide;
                                            return (
                                                <button
                                                    key={slide.id}
                                                    onClick={() => goToSlide(index)}
                                                    className="relative w-full text-left py-4 border-b border-white/15 group focus:outline-none"
                                                    aria-current={active}
                                                >
                                                    <span
                                                        className={`hc-mono text-xs mr-3 transition-colors duration-300 ${
                                                            active ? 'text-[#f2b705]' : 'text-white/35'
                                                        }`}
                                                    >
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <span
                                                        className={`text-sm transition-colors duration-300 ${
                                                            active
                                                                ? 'text-white font-medium'
                                                                : 'text-white/50 group-hover:text-white/80'
                                                        }`}
                                                    >
                                                        {slide.badge}
                                                    </span>

                                                    <span className="absolute left-0 right-0 -bottom-px h-px bg-white/0 overflow-hidden">
                                                        {active && (
                                                            <span
                                                                key={progressKey}
                                                                className={`block h-full origin-left bg-[#f2b705] hc-progress ${
                                                                    heroPaused || reducedMotion ? 'hc-progress-paused' : ''
                                                                }`}
                                                            />
                                                        )}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        aria-label="Diapositive précédente"
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Diapositive suivante"
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="lg:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                aria-label={`Aller à la diapositive ${index + 1}`}
                                className={`transition-all duration-300 rounded-full ${
                                    index === currentSlide
                                        ? 'w-8 h-2 bg-[#f2b705]'
                                        : 'w-2 h-2 bg-white/35 hover:bg-white/60'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#081428]/70 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-2 text-white/70 text-sm">
                                <span className="flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-[#f2b705]" />
                                    22 ans d'expérience
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#f2b705]" />
                                    Milliers de diplômés
                                </span>
                                <span className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-[#f2b705]" />
                                    DQP reconnu
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 2. CHIFFRES CLÉS */}
                {/* ============================================ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4">
                                POURQUOI NOUS CHOISIR
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Des chiffres qui parlent d'eux-mêmes
                            </h2>
                        </RevealSection>

                        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-4xl font-extrabold text-[#1a56db]">{annees}+</div>
                                <div className="text-sm font-medium text-gray-700 mt-1">Ans d'expérience</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-4xl font-extrabold text-[#1a56db]">{diplomes}+</div>
                                <div className="text-sm font-medium text-gray-700 mt-1">Apprenants formés</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-4xl font-extrabold text-[#1a56db]">100%</div>
                                <div className="text-sm font-medium text-gray-700 mt-1">Pratique</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-4xl font-extrabold text-[#1a56db]">{tauxReussite}%</div>
                                <div className="text-sm font-medium text-gray-700 mt-1">Taux de réussite</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 3. AVANTAGES */}
                {/* ============================================ */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#d21f2f] rounded-full text-xs font-semibold tracking-wider mb-4">
                                CE QUI FAIT LA DIFFÉRENCE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Pourquoi CAB Informatique ?
                            </h2>
                        </RevealSection>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {avantages.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <RevealSection key={item.title} delay={i * 80}>
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full text-center">
                                            <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#1a56db] flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </RevealSection>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 4. NOS FORMATIONS */}
                {/* ============================================ */}
                <RevealSection as="section" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4">
                                NOS FORMATIONS
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Deux façons de vous former, un seul objectif : <span className="text-[#1a56db]">votre réussite</span>
                            </h2>
                            <p className="text-gray-500 mt-3 leading-relaxed">
                                Choisissez le format qui vous correspond : en présentiel dans nos centres ou en ligne à votre rythme.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                                <div className="relative h-48 overflow-hidden">
                                    <img src="/assets/images/img3.jpeg" alt="Présentiel" className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#1a56db] text-white rounded-full text-xs font-semibold">Présentiel</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">Cours du jour ou du soir</h3>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" />
                                            Enseignement dans nos 3 centres
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" />
                                            Pédagogie 100% pratique
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" />
                                            Encadrement direct par des professionnels
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                                <div className="relative h-48 overflow-hidden">
                                    <img src="/assets/images/online.webp" alt="En ligne" className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#d21f2f] text-white rounded-full text-xs font-semibold">En ligne</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">À votre rythme, où que vous soyez</h3>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" />
                                            Formation entièrement à distance
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" />
                                            Apprenez à votre rythme
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckBadgeIcon className="w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" />
                                            Même encadrement de qualité
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/formations"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a56db] text-white rounded-full font-semibold hover:bg-[#0d2a63] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                            >
                                Voir toutes nos formations
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </RevealSection>

                {/* ============================================ */}
                {/* 5. CERTIFICATIONS */}
                {/* ============================================ */}
                <RevealSection as="section" className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d2a63, #1a56db)' }} />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold tracking-wider mb-4">
                                    CERTIFICATION EN LIGNE
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                                    Faites certifier vos compétences, où que vous soyez
                                </h2>
                                <p className="text-white/80 mt-4 leading-relaxed">
                                    Vous maîtrisez déjà un métier mais n'avez pas de diplôme reconnu ?
                                    Nos certifications en ligne vous permettent de valider vos compétences
                                    à distance, à votre rythme.
                                </p>
                                <Link
                                    href="/certification"
                                    className="inline-flex items-center gap-2 mt-6 px-8 py-4 bg-white text-[#1a56db] rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                                >
                                    En savoir plus
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-sm aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                                            <CheckBadgeIcon className="w-16 h-16 text-white" />
                                        </div>
                                        <p className="text-white/70 text-sm mt-4">
                                            Certifications reconnues
                                            <br />
                                            <span className="font-bold text-white">DQP</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealSection>

                {/* ============================================ */}
                {/* 6. ACTIVITÉS - CARROUSEL DYNAMIQUE */}
                {/* ============================================ */}
                <section id="activites" className="py-20 bg-white scroll-mt-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="flex items-end justify-between mb-10 flex-wrap gap-4">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4">
                                    CE QUI BOUGE CHEZ CAB
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    Nos prochains événements
                                </h2>
                            </div>
                        </RevealSection>

                        <div className="relative">
                            {staticActivities.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Aucune activité à venir</p>
                                </div>
                            ) : (
                                <>
                                    <div
                                        ref={activityTrackRef}
                                        onScroll={handleActivityScroll}
                                        className="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar lg:overflow-x-hidden"
                                    >
                                        {staticActivities.map((activity, index) => {
                                            const isCenter = index === currentActivityIndex;

                                            return (
                                                <div
                                                    key={activity.id}
                                                    data-activity-slot
                                                    className="flex-shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] snap-center transition-all duration-500 ease-in-out"
                                                    style={{
                                                        transform: isCenter ? 'scale(1)' : 'scale(0.82)',
                                                        opacity: isCenter ? 1 : 0.55,
                                                    }}
                                                >
                                                    <div
                                                        className="bg-white rounded-2xl overflow-hidden border transition-all duration-500"
                                                        style={{
                                                            borderColor: isCenter ? '#1a56db' : '#f3f4f6',
                                                            boxShadow: isCenter
                                                                ? '0 20px 25px -5px rgba(0,0,0,0.15)'
                                                                : '0 1px 2px rgba(0,0,0,0.05)',
                                                        }}
                                                    >
                                                        <img
                                                            src={activity.image_url}
                                                            alt={activity.title}
                                                            className="w-full h-48 object-cover"
                                                            loading="lazy"
                                                        />
                                                        <div className={`p-5 transition-all duration-500 ${isCenter ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <span className="text-xs font-semibold text-[#1a56db] bg-blue-50 px-2 py-1 rounded-full">
                                                                {activity.tag}
                                                            </span>
                                                            <h3 className={`font-bold text-base mt-2 transition-colors duration-500 ${isCenter ? 'text-gray-900' : 'text-gray-600'}`}>
                                                                {activity.title}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                                                            <p className={`text-sm mt-2 line-clamp-2 transition-colors duration-500 ${isCenter ? 'text-gray-700' : 'text-gray-500'}`}>
                                                                {activity.excerpt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={prevActivity}
                                        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]"
                                        aria-label="Événement précédent"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={nextActivity}
                                        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]"
                                        aria-label="Événement suivant"
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <div className="flex justify-center gap-2 mt-6">
                                        {staticActivities.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToActivity(index)}
                                                className="rounded-full transition-all duration-300"
                                                style={{
                                                    width: index === currentActivityIndex ? '2rem' : '0.625rem',
                                                    height: '0.625rem',
                                                    backgroundColor: index === currentActivityIndex ? '#1a56db' : '#d1d5db',
                                                }}
                                                aria-label={`Aller à l'événement ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>

                {/* ============================================ */}
                {/* 7. TEMOIGNAGES */}
                {/* ============================================ */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#d21f2f] rounded-full text-xs font-semibold tracking-wider mb-4">
                                ILS PARLENT DE CAB
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Ce que disent nos apprenants
                            </h2>
                        </RevealSection>

                        <div className="grid md:grid-cols-3 gap-6">
                            <RevealSection delay={0}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1a56db] flex items-center justify-center font-bold text-lg">
                                            MN
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Marie Ngo</p>
                                            <p className="text-xs text-gray-500">Secrétariat Comptable (2025)</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        "J'ai découvert CAB grâce à une ancienne collègue qui y avait fait sa formation.
                                        Aujourd'hui, je suis assistante comptable dans une PME."
                                    </p>
                                    <div className="flex gap-0.5 mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 text-[#f2b705] fill-[#f2b705]" />
                                        ))}
                                    </div>
                                </div>
                            </RevealSection>

                            <RevealSection delay={100}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-red-100 text-[#d21f2f] flex items-center justify-center font-bold text-lg">
                                            KE
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Kevin Ebogo</p>
                                            <p className="text-xs text-gray-500">Réseaux & Maintenance (2024)</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        "Un ami m'a parlé de CAB. J'ai été convaincu par le côté pratique.
                                        Après 8 mois, j'ai ouvert mon propre atelier de maintenance."
                                    </p>
                                    <div className="flex gap-0.5 mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 text-[#f2b705] fill-[#f2b705]" />
                                        ))}
                                    </div>
                                </div>
                            </RevealSection>

                            <RevealSection delay={200}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                                            AM
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Aïcha Moumouni</p>
                                            <p className="text-xs text-gray-500">Infographie 2D (2025)</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        "J'ai vu la formation en ligne sur le site et j'ai postulé.
                                        L'encadrement était top. Aujourd'hui je suis graphiste à Douala."
                                    </p>
                                    <div className="flex gap-0.5 mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 text-[#f2b705] fill-[#f2b705]" />
                                        ))}
                                    </div>
                                </div>
                            </RevealSection>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 8. CAMPUS */}
                {/* ============================================ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4">
                                NOS CAMPUS
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Trois villes, une même exigence
                            </h2>
                            <p className="text-gray-500 mt-3">
                                Des centres équipés, accessibles, avec une équipe pédagogique présente sur place.
                            </p>
                        </RevealSection>

                        <div className="grid md:grid-cols-3 gap-6">
                            {campus.map((c, i) => (
                                <RevealSection key={c.ville} delay={i * 100}>
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-blue-100 text-[#1a56db] rounded-full text-xs font-bold">
                                                {c.ville}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700">{c.nom}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">📍 {c.adresse}</p>
                                        <a
                                            href={`tel:${c.tel.replace(/\s/g, '')}`}
                                            className="block text-sm text-gray-500 hover:text-[#1a56db] transition-colors"
                                        >
                                            📞 {c.tel}
                                        </a>
                                        <a
                                            href={c.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-3 text-xs font-medium text-[#1a56db] hover:underline"
                                        >
                                            🗺️ Voir sur Google Maps
                                        </a>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 9. CTA FINAL */}
                {/* ============================================ */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #d21f2f, #b01a26)' }} />
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Votre avenir commence ici
                        </h2>
                        <p className="text-white/80 mt-3 max-w-xl mx-auto">
                            Rejoignez des milliers de professionnels formés par CAB Informatique.
                        </p>
                        <Link
                            href="/formations"
                            className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-[#d21f2f] rounded-full font-bold text-lg hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                        >
                            Découvrir nos formations
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

            </PublicLayout>
        </>
    );
}