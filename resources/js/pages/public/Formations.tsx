// resources/js/pages/Public/Formations.tsx
import {
    AcademicCapIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    SparklesIcon,
    UserPlusIcon,
    ArrowRightIcon,
    XMarkIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import PublicLayout from '@/Components/PublicLayout';
import { formationsPresentiel } from '@/data/formationsPresentiel';

interface FormationEnLigne {
    id: number;
    name: string;
    abbreviation: string;
    description: string;
    debouches: string;
    duration: string;
    diplome: string;
    frais: number;
    frais_formatted: string;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
}

interface Props {
    formationsEnLigne: FormationEnLigne[];
}

export default function Formations({ formationsEnLigne }: Props) {
    const [activeTab, setActiveTab] = useState<'presentiel' | 'enligne'>('presentiel');
    const [selectedFormation, setSelectedFormation] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [inscriptionModalOpen, setInscriptionModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Formulaire d'inscription
    const [formData, setFormData] = useState({
        nom_complet: '',
        email: '',
        telephone: '',
        ville: '',
        formation_id: '',
        formation_nom: '',
    });

    const openModal = (formation: any) => {
        const scrollY = window.scrollY;

        const formationData = {
            ...formation,
            debouches: formation.debouches || [],
            programme: formation.programme || [],
        };

        setSelectedFormation(formationData);
        setModalOpen(true);

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    };

    const closeModal = () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;

        setModalOpen(false);
        setSelectedFormation(null);

        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        if (scrollY > 0) {
            window.scrollTo(0, scrollY);
        }
    };

    const closeInscriptionModal = () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;

        setInscriptionModalOpen(false);
        setSubmitSuccess(false);
        setSubmitError(null);

        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        if (scrollY > 0) {
            window.scrollTo(0, scrollY);
        }
    };

    const openInscriptionModal = (formation: any) => {
        closeModal();

        setFormData({
            nom_complet: '',
            email: '',
            telephone: '',
            ville: '',
            formation_id: formation.id?.toString() || '',
            formation_nom: formation.title || formation.name || '',
        });
        setSubmitSuccess(false);
        setSubmitError(null);

        setInscriptionModalOpen(true);

        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    };

    const handleInscriptionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (!formData.nom_complet.trim()) {
            setSubmitError('Veuillez entrer votre nom complet');
            setIsSubmitting(false);
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setSubmitError('Veuillez entrer un email valide');
            setIsSubmitting(false);
            return;
        }
        if (!formData.telephone.trim()) {
            setSubmitError('Veuillez entrer votre numéro de téléphone');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/pre-inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    nom_complet: formData.nom_complet,
                    email: formData.email,
                    telephone: formData.telephone,
                    ville: formData.ville,
                    formation: formData.formation_nom,
                    formation_id: formData.formation_id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitting(false);
                setSubmitSuccess(true);
                setTimeout(() => {
                    closeInscriptionModal();
                }, 3000);
            } else {
                setIsSubmitting(false);
                setSubmitError(data.message || 'Une erreur est survenue');
            }
        } catch (error) {
            setIsSubmitting(false);
            setSubmitError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    // ✅ Récupérer les noms des formations pour les meta keywords
    const formationNames = formationsEnLigne.map(f => f.name).join(', ');
    const presentielNames = formationsPresentiel.map(f => f.title).join(', ');

    // ✅ JSON-LD pour les formations (Course schema)
    const jsonLdCourses = [
        ...formationsPresentiel.map((f) => ({
            "@type": "Course",
            "name": f.title,
            "description": f.description,
            "provider": {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique"
            },
            "offers": {
                "@type": "Offer",
                "price": f.price.replace(/\s/g, ''),
                "priceCurrency": "XAF"
            }
        })),
        ...formationsEnLigne.map((f) => ({
            "@type": "Course",
            "name": f.name,
            "description": f.description,
            "provider": {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique"
            },
            "offers": {
                "@type": "Offer",
                "price": f.frais.toString(),
                "priceCurrency": "XAF"
            }
        }))
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Formations professionnelles CAB Informatique",
        "description": "Découvrez toutes nos formations professionnelles en présentiel à Douala, Yaoundé, Bafoussam et en ligne. Infographie, réseaux, maintenance, vidéosurveillance, secrétariat, logistique.",
        "url": "https://cab-informatique.com/formations",
        "about": {
            "@type": "Thing",
            "name": "Formation professionnelle Cameroun"
        },
        "hasPart": jsonLdCourses
    };

    return (
        <>
            <Head>
                <title>Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique</title>
                <meta
                    name="description"
                    content="Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam. Infographie, réseaux, maintenance, vidéosurveillance, secrétariat, logistique. DQP reconnu."
                />
                <meta
                    name="keywords"
                    content={`formation professionnelle Cameroun, formation Douala, formation Yaoundé, formation Bafoussam, ${formationNames}, ${presentielNames}, CAB Informatique, DQP`}
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique" />
                <meta property="og:description" content="Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam." />
                <meta property="og:image" content="/assets/images/og-cab-informatique.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://cab-informatique.com/formations" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:creator" content="@cabinfo" />
                <meta name="twitter:title" content="Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique" />
                <meta name="twitter:description" content="Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam." />
                <meta name="twitter:image" content="/assets/images/og-cab-informatique.jpg" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <PublicLayout>
                {/* Header */}
                <section
                    className="relative pt-32 pb-16"
                    style={{ background: 'linear-gradient(to right, #0a1f4d, #1a56db)' }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                Nos <span className="text-[#d21f2f]">Formations</span>
                            </h1>
                            <p
                                className="mt-4 text-xl max-w-2xl mx-auto"
                                style={{ color: 'rgba(255,255,255,0.8)' }}
                            >
                                Découvrez nos formations professionnelles en présentiel ou en ligne
                            </p>

                            <div
                                className="mt-8 inline-flex rounded-xl p-1"
                                style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                            >
                                <button
                                    onClick={() => setActiveTab('presentiel')}
                                    className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                                    style={
                                        activeTab === 'presentiel'
                                            ? { backgroundColor: '#ffffff', color: '#1a56db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }
                                            : { color: 'rgba(255,255,255,0.7)' }
                                    }
                                >
                                    📍 Présentiel
                                </button>
                                <button
                                    onClick={() => setActiveTab('enligne')}
                                    className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                                    style={
                                        activeTab === 'enligne'
                                            ? { backgroundColor: '#ffffff', color: '#1a56db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }
                                            : { color: 'rgba(255,255,255,0.7)' }
                                    }
                                >
                                    💻 En ligne
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contenu */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {activeTab === 'presentiel' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {formationsPresentiel.map((formation) => (
                                    <div
                                        key={formation.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={formation.image}
                                                alt={formation.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue">
                                                {formation.price}
                                            </div>
                                            <div className="absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                                                <span>{formation.icon}</span>
                                                {formation.abbreviation}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {formation.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">{formation.duration}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                {formation.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {formation.tags.map((tag) => (
                                                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => openModal({ ...formation, type: 'presentiel' })}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group"
                                            >
                                                Voir les détails
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            formationsEnLigne && formationsEnLigne.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {formationsEnLigne.map((formation) => (
                                        <div
                                            key={formation.id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={formation.image_url || '/assets/images/placeholder.jpg'}
                                                    alt={formation.name || 'Formation'}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                    }}
                                                />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue">
                                                    {formation.frais_formatted || '0 FCFA'}
                                                </div>
                                                <div className="absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                                                    {formation.abbreviation || 'N/A'}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    {formation.name || 'Formation sans nom'}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-3">{formation.duration || 'Durée non définie'}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                    {formation.description || 'Description non disponible'}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                                        {formation.diplome || 'Non défini'}
                                                    </span>
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                                        En ligne
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => openModal({ ...formation, type: 'enligne' })}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group"
                                                >
                                                    Voir les détails
                                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">Aucune formation en ligne disponible pour le moment</p>
                                    <p className="text-gray-400 text-sm mt-2">Revenez plus tard pour découvrir nos nouvelles formations</p>
                                </div>
                            )
                        )}
                    </div>
                </section>

                {/* ============================================================
                    MODAL DÉTAILS
                    ============================================================ */}
                {modalOpen && selectedFormation && (
                    <div
                        key={`modal-${selectedFormation.id || selectedFormation.title || Date.now()}`}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center text-2xl">
                                        {selectedFormation.icon || '📚'}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 notranslate">
                                        {selectedFormation.title || selectedFormation.name}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Image */}
                                <div className="rounded-xl overflow-hidden">
                                    <img
                                        src={selectedFormation.image || selectedFormation.image_url || '/assets/images/placeholder.jpg'}
                                        alt={selectedFormation.title || selectedFormation.name || 'Formation'}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                        }}
                                    />
                                </div>

                                {/* Infos clés */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <ClockIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Durée</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedFormation.duration || 'Non définie'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <AcademicCapIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Diplôme</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedFormation.diplome || 'Non défini'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <CurrencyDollarIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Frais</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedFormation.price || selectedFormation.frais_formatted || '0 FCFA'}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="notranslate">
                                    <h3 className="font-semibold text-gray-900 mb-2">📌 Description</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {selectedFormation.description || 'Description non disponible'}
                                    </p>
                                </div>

                                {/* Programme */}
                                {selectedFormation.programme && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gray-900 mb-2">📋 Programme</h3>
                                        {Array.isArray(selectedFormation.programme) ? (
                                            <ul className="grid grid-cols-1 gap-1.5">
                                                {selectedFormation.programme.map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <span className="text-cab-blue mt-0.5">▸</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {selectedFormation.programme}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Débouchés */}
                                {selectedFormation.debouches && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gray-900 mb-2">🎯 Débouchés</h3>
                                        {Array.isArray(selectedFormation.debouches) ? (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedFormation.debouches.map((item: string, index: number) => (
                                                    <span key={index} className="px-3 py-1.5 bg-blue-50 text-cab-blue rounded-full text-sm font-medium">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {selectedFormation.debouches}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Boutons d'action */}
                                {/* Boutons d'action */}
<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
    {selectedFormation.lien_externe && selectedFormation.lien_label && (
        <a
            href={selectedFormation.lien_externe}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors notranslate"
        >
            {selectedFormation.lien_label}
        </a>
    )}

    {selectedFormation.type === 'presentiel' ? (
        <button
            onClick={() => openInscriptionModal(selectedFormation)}
            className="flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2"
            style={{
                background: 'linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))',
                boxShadow: '0 10px 15px -3px rgba(26,86,219,0.25)',
            }}
        >
            <UserPlusIcon className="w-5 h-5" />
            📝 Je m'inscris
        </button>
    ) : (
        <Link
            href={`/preinscription?formation=${selectedFormation.id}&type=formation`}
            className="flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2"
            style={{
                background: 'linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))',
                boxShadow: '0 10px 15px -3px rgba(26,86,219,0.25)',
            }}
        >
            <UserPlusIcon className="w-5 h-5" />
            📝 Me pré-inscrire
        </Link>
    )}

    <button
        onClick={closeModal}
        className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors notranslate"
    >
        Fermer
    </button>
</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================
                    MODAL D'INSCRIPTION PRÉSENTIEL
                    ============================================================ */}
                {inscriptionModalOpen && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeInscriptionModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                        <UserPlusIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Inscription présentiel
                                    </h2>
                                </div>
                                <button
                                    onClick={closeInscriptionModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                {submitSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircleIcon className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Inscription envoyée ! ✅</h3>
                                        <p className="text-gray-600 text-sm">
                                            Votre demande d'inscription pour <strong>{formData.formation_nom}</strong> a été enregistrée.
                                            Nous vous contacterons dans les plus brefs délais.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-4">Fermeture automatique dans quelques secondes...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleInscriptionSubmit} className="space-y-4">
                                        <p className="text-sm text-gray-600">
                                            Inscription en présentiel pour <strong>{formData.formation_nom}</strong>
                                        </p>

                                        <input type="hidden" value={formData.formation_id} />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nom complet <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <UserIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.nom_complet}
                                                    onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                    placeholder="Votre nom et prénom"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                    placeholder="votre@email.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Téléphone <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={formData.telephone}
                                                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                    placeholder="6XX XXX XXX"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ville
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.ville}
                                                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                    placeholder="Douala, Yaoundé, Bafoussam..."
                                                />
                                            </div>
                                        </div>

                                        {submitError && (
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                                <p className="text-sm text-red-600">{submitError}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{
                                                background: 'linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))',
                                                boxShadow: '0 10px 15px -3px rgba(26,86,219,0.25)',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlusIcon className="w-5 h-5" />
                                                    M'inscrire
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}
