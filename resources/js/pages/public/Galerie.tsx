// resources/js/pages/Public/Galerie.tsx
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

    // ✅ Bloquer le scroll du body
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

    return (
        <>
            <Head title="Galerie - CAB Informatique" />

            <PublicLayout>
                {/* ✅ Header sans dégradé (compatible iPhone 7) */}
                <section className="relative pt-32 pb-16" style={{ backgroundColor: '#0A1F4D' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                Notre <span className="text-cab-red">Galerie</span>
                            </h1>
                            <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
                                Découvrez nos moments forts en images et vidéos
                            </p>
                        </div>
                    </div>
                </section>

                {/* Galerie */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {medias.length === 0 ? (
                            <div className="text-center py-16">
                                <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun média disponible pour le moment</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {medias.map((media, index) => (
                                    <div
                                        key={media.id}
                                        onClick={() => openLightbox(media, index)}
                                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                                    >
                                        {media.is_image ? (
                                            <img
                                                src={media.url}
                                                alt={media.titre}
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
                                        
                                        {/* ✅ Overlay sans dégradé */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-semibold text-sm line-clamp-1">{media.titre}</h3>
                                            {media.description && (
                                                <p className="text-white/80 text-xs line-clamp-1">{media.description}</p>
                                            )}
                                            <span className="text-white/60 text-xs mt-1">{media.type_label}</span>
                                        </div>

                                        {/* Badge type */}
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <span className="text-white text-xs flex items-center gap-1">
                                                {getTypeEmoji(media)}
                                                {media.type_label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Lightbox */}
                {selectedMedia && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-10"
                            aria-label="Fermer"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                            aria-label="Précédent"
                        >
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                            aria-label="Suivant"
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
                                    alt={selectedMedia.titre}
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
                                        Télécharger
                                    </a>
                                </div>
                            )}

                            <div className="text-center text-white/50 text-sm mt-4">
                                {selectedMedia.titre} • {selectedMedia.type_label} • {selectedMedia.taille_formatted}
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}