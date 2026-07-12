// resources/js/pages/Student/Cours/Show.tsx
import {
    ArrowLeftIcon,
    VideoCameraIcon,
    DocumentIcon,
    CheckCircleIcon,
    DownloadIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import StudentLayout from '@/Components/Layouts/StudentLayout';


interface Cours {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    video_url: string | null;
    video_title: string | null;
    video_embed_url: string | null;
    video_thumbnail: string | null;
    viewed: boolean;
    viewed_at: string | null;
    created_at: string;
    formation: {
        id: number;
        name: string;
    };
}

interface Props {
    cours: Cours;
}

export default function Show({ cours }: Props) {
    const [loading, setLoading] = useState(false);

    const handleMarkAsViewed = () => {
        setLoading(true);
        router.post(`/student/cours/${cours.id}/view`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                router.reload();
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    return (
        <>
            <Head title={`${cours.titre} - Détails du cours`} />

            <StudentLayout title={cours.titre}>
                <div className="max-w-4xl">
                    <Link
                        href="/student/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à mes cours
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{cours.titre}</h1>
                                <p className="text-sm text-gray-500 mt-1">{cours.formation?.name}</p>
                            </div>
                            {cours.viewed ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <CheckCircleIcon className="w-5 h-5" />
                                    Vu
                                </span>
                            ) : (
                                <button
                                    onClick={handleMarkAsViewed}
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : '👁️'}
                                    Marquer comme vu
                                </button>
                            )}
                        </div>
                        {cours.viewed_at && (
                            <p className="text-xs text-gray-400 mt-2">Vu le {cours.viewed_at}</p>
                        )}
                    </div>

                    {/* Description */}
                    {cours.description && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Description</h2>
                            <p className="text-gray-600 leading-relaxed">{cours.description}</p>
                        </div>
                    )}

                    {/* Vidéo */}
                    {cours.video_url && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <VideoCameraIcon className="w-5 h-5 text-red-500" />
                                {cours.video_title || 'Vidéo'}
                            </h2>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                                {cours.video_embed_url ? (
                                    <iframe
                                        src={cours.video_embed_url}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <a
                                            href={cours.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-blue-400 transition-colors"
                                        >
                                            ▶️ Voir la vidéo
                                        </a>
                                    </div>
                                )}
                            </div>
                            <a
                                href={cours.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-sm text-cab-blue hover:underline"
                            >
                                Ouvrir dans un nouvel onglet
                            </a>
                        </div>
                    )}

                    {/* Fichiers */}
                    {cours.contenu && cours.contenu.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {cours.contenu.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <DocumentIcon className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </StudentLayout>
        </>
    );
}
