// resources/js/pages/public/Home.tsx
import { useState, useEffect } from 'react';
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
import RevealSection from '@/Components/Home/RevealSection';
import Loader from '@/Components/Loader';
import PublicLayout from '@/Components/PublicLayout';

import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Données des slides Hero
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
        image: '/assets/images/img2.jpeg',
        badge: 'Certifications en ligne',
        title: 'Faites certifier vos compétences',
        subtitle: 'Où que vous soyez, à votre rythme',
        description: 'Nos certifications en ligne vous permettent de valider vos compétences à distance et d\'obtenir un DQP reconnu.'
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

const staticActivities = [
    {
        id: 1,
        title: 'Rentrée académique 2026-2027',
        date: '05/10/2026',
        excerpt: 'CEP, BEPC, Probatoire, Bac, étudiants et professionnels — toutes filières ouvertes.',
        image_url: '/assets/images/img1.jpeg',
        tag: 'Rentrée',
    },
    {
        id: 2,
        title: 'Journées portes ouvertes',
        date: '20/09/2026',
        excerpt: 'Visitez nos ateliers, testez le matériel, échangez avec nos formateurs.',
        image_url: '/assets/images/img2.jpeg',
        tag: 'Événement',
    },
    {
        id: 3,
        title: 'Session d\'information certification',
        date: '12/09/2026',
        excerpt: 'Tout savoir sur le processus de certification en ligne et le DQP, en 30 minutes.',
        image_url: '/assets/images/img3.jpeg',
        tag: 'Atelier',
    },
    {
        id: 4,
        title: 'Remise des diplômes — Promotion 2025',
        date: '15/07/2026',
        excerpt: 'Ils sont passés par CAB. Aujourd\'hui, ils travaillent.',
        image_url: '/assets/images/img4.jpeg',
        tag: 'Diplômes',
    },
];

const avantages = [
    { icon: AcademicCapIcon, title: '100% Pratique', desc: 'On vous met devant le vrai matériel, dès la première semaine.' },
    { icon: ShieldCheckIcon, title: 'Formateurs qui exercent', desc: 'Pas des théoriciens : des professionnels qui forment sur ce qu\'ils pratiquent.' },
    { icon: ComputerDesktopIcon, title: 'Salles équipées', desc: 'Ordinateurs, logiciels sous licence, matériel réseau et vidéosurveillance réels.' },
    { icon: ClockIcon, title: 'Cours du jour ou du soir', desc: 'Étudiant, salarié ou en reconversion : un créneau existe pour vous.' },
];

const temoignages = [
    {
        nom: 'Marie Ngo',
        formation: 'Secrétariat Comptable (2025)',
        message: 'J\'ai découvert CAB grâce à une ancienne collègue qui y avait fait sa formation. Aujourd\'hui, je suis assistante comptable dans une PME.',
        initiales: 'MN',
        color: 'bg-blue-100 text-[#1a56db]'
    },
    {
        nom: 'Kevin Ebogo',
        formation: 'Réseaux & Maintenance (2024)',
        message: 'J\'ai cherché longtemps une formation en informatique qui ne soit pas trop théorique. Un ami m\'a parlé de CAB. Après 8 mois, j\'ai ouvert mon propre atelier.',
        initiales: 'KE',
        color: 'bg-red-100 text-[#d21f2f]'
    },
    {
        nom: 'Aïcha Moumouni',
        formation: 'Infographie 2D (2025)',
        message: 'Je cherchais une formation en graphisme qui me permette de travailler à mon rythme. J\'ai vu la formation en ligne sur le site et j\'ai postulé. Aujourd\'hui je suis graphiste à Douala.',
        initiales: 'AM',
        color: 'bg-green-100 text-green-700'
    }
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

export default function Home() {
    const { ref: statsRef, isRevealed: statsVisible } = useScrollReveal<HTMLDivElement>(0.4);
    const annees = useCountUp(22, statsVisible);
    const diplomes = useCountUp(5000, statsVisible);
    const tauxReussite = useCountUp(85, statsVisible);

    // Hero Carousel
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, []);

    const current = heroSlides[currentSlide];

    // Activités Carousel
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const totalActivities = staticActivities.length;

    const nextActivity = () => {
        setCurrentActivityIndex((prev) => (prev + 1) % totalActivities);
    };

    const prevActivity = () => {
        setCurrentActivityIndex((prev) => (prev - 1 + totalActivities) % totalActivities);
    };

    useEffect(() => {
        if (window.innerWidth < 1024) return;
        const interval = setInterval(nextActivity, 5000);
        return () => clearInterval(interval);
    }, []);

    // ✅ JSON-LD pour le SEO
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
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                },
                {
                    "@type": "Course",
                    "name": "Secrétariat Comptable",
                    "description": "Formation en comptabilité et secrétariat",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                },
                {
                    "@type": "Course",
                    "name": "Logistique et Transit",
                    "description": "Formation en logistique et transport international",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                },
                {
                    "@type": "Course",
                    "name": "Infographie 2D & Multimédia",
                    "description": "Formation en graphisme et multimédia",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                },
                {
                    "@type": "Course",
                    "name": "Réseaux & Maintenance Informatique",
                    "description": "Formation en administration réseaux et maintenance",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                },
                {
                    "@type": "Course",
                    "name": "Vidéosurveillance",
                    "description": "Formation en installation et maintenance de systèmes de vidéosurveillance",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "CAB Informatique"
                    }
                }
            ]
        }
    };

    return (
        <>
            {/* ============================================ */}
            {/* ✅ SEO COMPLET AVEC <Head> D'INERTIA */}
            {/* ============================================ */}
            <Head>
                <title>CAB Informatique — Formation Professionnelle en Présentiel et en Ligne au Cameroun</title>

                {/* Meta Description */}
                <meta
                    name="description"
                    content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques à Douala, Yaoundé et Bafoussam. Formations en présentiel et en ligne, DQP reconnu. Inscriptions ouvertes."
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CAB Informatique — Centre de Référence de la Formation Professionnelle au Cameroun" />
                <meta property="og:description" content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques. Formations en présentiel et en ligne. DQP reconnu." />
                <meta property="og:image" content="/assets/images/og-cab-informatique.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://cab-informatique.com" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:creator" content="@cabinfo" />
                <meta name="twitter:title" content="CAB Informatique — Formation Professionnelle au Cameroun" />
                <meta name="twitter:description" content="Depuis 22 ans, CAB Informatique forme aux métiers de l'informatique, de la gestion et des métiers techniques. Formations en présentiel et en ligne. DQP reconnu." />
                <meta name="twitter:image" content="/assets/images/og-cab-informatique.jpg" />

                {/* JSON-LD Schema.org */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <Loader />

            <PublicLayout>

                {/* ============================================ */}
                {/* 1. HERO CAROUSEL AVEC MINIATURES */}
                {/* ============================================ */}
                <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
                    <div className="absolute inset-0 z-0 transition-opacity duration-700">
                        <img
                            src={current.image}
                            alt={current.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                            fetchPriority="high"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(125deg, rgba(10,31,77,0.92) 0%, rgba(18,58,133,0.80) 50%, rgba(18,58,133,0.30) 100%)',
                            }}
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/10 mb-6">
                                        <span className="w-2 h-2 rounded-full bg-[#f2b705] animate-pulse" />
                                        {current.badge}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white">
                                        {current.title}
                                        <br />
                                        <span className="text-white/90">
                                            {current.subtitle}
                                        </span>
                                    </h1>

                                    <p className="mt-4 text-lg text-white/80 max-w-lg leading-relaxed">
                                        {current.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <Link
                                            href="/formations"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1a56db] rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                                        >
                                            Découvrir nos formations
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </Link>
                                        <a
                                            href="#activites"
                                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white transition-all duration-300"
                                        >
                                            Voir nos activités
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                                {/* Miniatures */}
                                <div className="hidden lg:flex flex-col gap-3 items-end">
                                    {heroSlides.map((slide, index) => (
                                        <button
                                            key={slide.id}
                                            onClick={() => goToSlide(index)}
                                            className={`relative w-48 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                                                index === currentSlide
                                                    ? 'ring-2 ring-[#f2b705] scale-105 shadow-lg'
                                                    : 'opacity-60 hover:opacity-90 hover:scale-105'
                                            }`}
                                        >
                                            <img
                                                src={slide.image}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <span className="text-white text-xs font-medium px-2 text-center line-clamp-2">
                                                    {slide.badge}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    index === currentSlide
                                        ? 'w-10 h-2.5 bg-white'
                                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-sm border-t border-white/10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white/80 text-sm">
                                <span className="flex items-center gap-2">
                                    <CheckBadgeIcon className="w-5 h-5 text-[#f2b705]" />
                                    22 ans d'expérience
                                </span>
                                <span className="flex items-center gap-2">
                                    <UserGroupIcon className="w-5 h-5 text-[#f2b705]" />
                                    Milliers de diplômés
                                </span>
                                <span className="flex items-center gap-2">
                                    <AcademicCapIcon className="w-5 h-5 text-[#f2b705]" />
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
                                    <img src="/assets/images/img4.jpeg" alt="Présentiel" className="w-full h-full object-cover" loading="lazy" />
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
                                    <img src="/assets/images/img2.jpeg" alt="En ligne" className="w-full h-full object-cover" loading="lazy" />
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
                {/* 6. ACTIVITÉS - CARROUSEL AVEC FOCUS */}
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
                            {/* Carrousel avec défilement tactile */}
                            <div
                                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar lg:overflow-visible lg:justify-center"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {staticActivities.map((activity, index) => {
                                    const total = staticActivities.length;
                                    const mid = Math.floor(total / 2);
                                    const isMiddle = index === mid;

                                    return (
                                        <div
                                            key={activity.id}
                                            className={`
                                                flex-shrink-0 w-[85%] sm:w-[70%] lg:w-[30%] snap-center
                                                transition-all duration-500 ease-in-out
                                                ${isMiddle ? 'lg:scale-110 lg:z-20' : 'lg:scale-90 lg:z-10'}
                                                ${!isMiddle ? 'lg:opacity-60' : ''}
                                            `}
                                        >
                                            <div className={`
                                                bg-white rounded-2xl overflow-hidden border transition-all duration-500
                                                ${isMiddle ? 'border-[#1a56db] shadow-2xl' : 'border-gray-100 shadow-sm'}
                                            `}>
                                                <img
                                                    src={activity.image_url}
                                                    alt={activity.title}
                                                    className="w-full h-48 object-cover"
                                                    loading="lazy"
                                                />
                                                <div className={`
                                                    p-5 transition-all duration-500
                                                    ${isMiddle ? 'bg-white' : 'bg-gray-50'}
                                                `}>
                                                    <span className="text-xs font-semibold text-[#1a56db] bg-blue-50 px-2 py-1 rounded-full">
                                                        {activity.tag}
                                                    </span>
                                                    <h3 className={`
                                                        font-bold text-base mt-2 transition-all duration-500
                                                        ${isMiddle ? 'text-gray-900' : 'text-gray-600'}
                                                    `}>
                                                        {activity.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                                                    <p className={`
                                                        text-sm mt-2 line-clamp-2 transition-all duration-500
                                                        ${isMiddle ? 'text-gray-700' : 'text-gray-500'}
                                                    `}>
                                                        {activity.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Flèches - UNIQUEMENT sur desktop */}
                            <button
                                onClick={() => {
                                    const container = document.querySelector('.hide-scrollbar');
                                    if (container) {
                                        container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }
                                }}
                                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]"
                                aria-label="Précédent"
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => {
                                    const container = document.querySelector('.hide-scrollbar');
                                    if (container) {
                                        container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }
                                }}
                                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]"
                                aria-label="Suivant"
                            >
                                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Dots */}
                            <div className="flex justify-center gap-2 mt-6">
                                {staticActivities.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const container = document.querySelector('.hide-scrollbar');
                                            if (container) {
                                                const cards = container.querySelectorAll('.snap-center');
                                                if (cards[index]) {
                                                    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                                                }
                                            }
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                            index === Math.floor(staticActivities.length / 2)
                                                ? 'w-8 bg-[#1a56db]'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Aller à l'activité ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CSS pour cacher la scrollbar */}
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
                {/* 7. TEMOIGNAGES - NOMS CAMEROUNAIS */}
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
                            {campus.map((campus, i) => (
                                <RevealSection key={campus.ville} delay={i * 100}>
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-blue-100 text-[#1a56db] rounded-full text-xs font-bold">
                                                {campus.ville}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700">{campus.nom}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">📍 {campus.adresse}</p>
                                        <a
                                            href={`tel:${campus.tel.replace(/\s/g, '')}`}
                                            className="block text-sm text-gray-500 hover:text-[#1a56db] transition-colors"
                                        >
                                            📞 {campus.tel}
                                        </a>
                                        <a
                                            href={campus.mapsUrl}
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
