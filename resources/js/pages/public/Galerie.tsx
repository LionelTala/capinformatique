import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Components/PublicLayout';
import {
    PhotoIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

interface Media {
    id: number;
    titre: string;
    description: string | null;
    url: string;
    type: string;
    type_label: string;
    is_image: boolean;
    is_video: boolean;
    taille_formatted: string;
}

interface Props {
    medias: Media[];
}

export default function Galerie({ medias }: Props) {
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    // ✅ Bloquer le scroll du body lors de l'ouverture de la Lightbox
    useEffect(() => {
        if (selectedMedia) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedMedia]);

    const openLightbox = (media: Media, index: number) => {
        setSelectedMedia(media);
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
        setSelectedIndex(-1);
    };

    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (selectedIndex === -1 || medias.length === 0) return;
        const newIndex = direction === 'prev'
            ? (selectedIndex - 1 + medias.length) % medias.length
            : (selectedIndex + 1) % medias.length;
        setSelectedMedia(medias[newIndex]);
        setSelectedIndex(newIndex);
    };

    // ✅ Gestion des touches clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedMedia) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMedia, selectedIndex, medias]);

    const getTypeIcon = (media: Media) => {
        if (media.is_image) return <PhotoIcon className="w-6 h-6 text-blue-500" />;
        if (media.is_video) return <VideoCameraIcon className="w-6 h-6 text-red-500" />;
        return <DocumentTextIcon className="w-6 h-6 text-gray-500" />;
    };

    const getTypeEmoji = (media: Media) => {
        if (media.is_image) return '📷';
        if (media.is_video) return '🎬';
        return '📄';
    };

    // ✅ JSON-LD Schema.org pour ImageGallery
    const mediaList = (medias || []).map((m, idx) => ({
        "@type": m.is_video ? "VideoObject" : "ImageObject",
        "position": idx + 1,
        "name": m.titre,
        "description": m.description || `Photo de la galerie CAB Informatique - ${m.titre}`,
        "contentUrl": m.url,
        "thumbnailUrl": m.url
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Galerie Média CAB Informatique Cameroun",
        "description": "Découvrez en images et vidéos la vie de nos campus de formation professionnelle à Douala (Yassa), Yaoundé (Nlongkak) et Bafoussam.",
        "url": "https://cab-informatique.com/galerie",
        "publisher": {
            "@type": "EducationalOrganization",
            "name": "CAB Informatique",
            "sameAs": "https://cab-informatique.com"
        },
        "image": mediaList
    };

    return (
        <>
            <Head>
                {/* Title optimisé SEO */}
                <title>Galerie Photos & Vidéos — Campus CAB Informatique Douala, Yaoundé, Bafoussam</title>

                {/* Meta Description */}
                <meta
                    name="description"
                    content="Découvrez la galerie photos et vidéos de CAB Informatique : ateliers pratiques en informatique, remises de diplômes DQP, équipements de nos campus de Douala, Yaoundé et Bafoussam."
                />
                <meta
                    name="keywords"
                    content="galerie CAB Informatique, photos campus Douala Yassa, campus Yaoundé Nlongkak, centre de formation Bafoussam, atelier pratique informatique Cameroun, remise diplome DQP"
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://cab-informatique.com/galerie" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Galerie Photos & Vidéos — CAB Informatique Cameroun" />
                <meta property="og:description" content="Explorez la vie étudiante et les infrastructures modernes de CAB Informatique à Douala, Yaoundé et Bafoussam." />
                <meta property="og:image" content="https://cab-informatique.com/assets/images/og-cab-informatique.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://cab-informatique.com/galerie" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:creator" content="@cabinfo" />
                <meta name="twitter:title" content="Galerie Photos & Vidéos — CAB Informatique Cameroun" />
                <meta name="twitter:description" content="Découvrez nos campus et nos événements de formation professionnelle en images." />
                <meta name="twitter:image" content="https://cab-informatique.com/assets/images/og-cab-informatique.jpg" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <PublicLayout>
                {/* Header */}
                <section
    className="relative pt-32 pb-16 text-white"
    style={{ background: 'linear-gradient(to right, #0a1f4d, #1a56db)' }}
>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Notre <span className="text-[#d21f2f]">Galerie Médias</span>
            </h1>
            <p
                className="mt-4 text-xl max-w-2xl mx-auto"
                style={{ color: 'rgba(255,255,255,0.85)' }}
            >
                Plongez au cœur de nos campus et découvrez la pratique en images et vidéos
            </p>
        </div>
    </div>
</section>

                {/* Galerie */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="sr-only">Photos et vidéos des événements CAB Informatique</h2>
                        {medias.length === 0 ? (
                            <div className="text-center py-16">
                                <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun média disponible pour le moment.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {medias.map((media, index) => (
                                    <article
                                        key={media.id}
                                        onClick={() => openLightbox(media, index)}
                                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                                    >
                                        {media.is_image ? (
                                            <img
                                                src={media.url}
                                                alt={`${media.titre} - Galerie CAB Informatique Douala Yaoundé Bafoussam`}
                                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        ) : media.is_video ? (
                                            <video
                                                src={media.url}
                                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                                muted
                                            />
                                        ) : (
                                            <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                                                {getTypeIcon(media)}
                                            </div>
                                        )}

                                        {/* Overlay au survol */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-semibold text-sm line-clamp-1">{media.titre}</h3>
                                            {media.description && (
                                                <p className="text-white/80 text-xs line-clamp-1">{media.description}</p>
                                            )}
                                            <span className="text-white/60 text-xs mt-1">{media.type_label}</span>
                                        </div>

                                        {/* Badge de type de média */}
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <span className="text-white text-xs flex items-center gap-1">
                                                {getTypeEmoji(media)}
                                                {media.type_label}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Lightbox Modal */}
                {selectedMedia && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-10"
                            aria-label="Fermer la vue agrandie"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                            aria-label="Média précédent"
                        >
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                            aria-label="Média suivant"
                        >
                            <ChevronRightIcon className="w-8 h-8" />
                        </button>

                        <div
                            className="max-w-5xl max-h-[90vh] p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.is_image ? (
                                <img
                                    src={selectedMedia.url}
                                    alt={`${selectedMedia.titre} - CAB Informatique`}
                                    className="max-w-full max-h-[80vh] object-contain rounded-xl"
                                    loading="lazy"
                                />
                            ) : selectedMedia.is_video ? (
                                <video
                                    src={selectedMedia.url}
                                    controls
                                    className="max-w-full max-h-[80vh] rounded-xl"
                                    autoPlay
                                    muted
                                />
                            ) : (
                                <div className="bg-white rounded-2xl p-12 text-center max-w-md">
                                    <DocumentTextIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900">{selectedMedia.titre}</h3>
                                    {selectedMedia.description && (
                                        <p className="text-gray-600 mt-2">{selectedMedia.description}</p>
                                    )}
                                    <p className="text-sm text-gray-400 mt-2">{selectedMedia.type_label}</p>
                                    <a
                                        href={selectedMedia.url}
                                        download
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-cab-blue text-white rounded-xl hover:bg-cab-dark transition-colors"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Télécharger le document
                                    </a>
                                </div>
                            )}

                            <div className="text-center text-white/60 text-sm mt-4">
                                {selectedMedia.titre} • {selectedMedia.type_label} • {selectedMedia.taille_formatted}
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}
