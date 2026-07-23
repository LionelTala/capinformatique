// resources/js/pages/Student/Cours/Show.tsx
import {
    ArrowLeftIcon,
    VideoCameraIcon,
    DocumentIcon,
    CheckCircleIcon,
    LockClosedIcon,
    LockOpenIcon,
    ExclamationTriangleIcon,
    BookOpenIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import StudentLayout from '@/Components/Layouts/StudentLayout';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_title: string | null;
    video_embed_url: string | null;
    has_video: boolean;
    has_files: boolean;
    files: any[];
    order: number;
    vu: boolean;
    viewed_at: string | null;
    created_at: string;
}

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
    est_accessible: boolean;
    tranche_requise: {
        numero: number;
        montant: number;
        lien: string;
    } | null;
    est_verrouille: boolean;
    lessons: Lesson[]; // ✅ Nouveau champ
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

    // ✅ Si le cours est verrouillé
    if (cours.est_verrouille) {
        return (
            <>
                <Head title={`${cours.titre} - Verrouillé`} />

                <StudentLayout title={cours.titre}>
                    <div className="max-w-4xl">
                        <Link
                            href="/student/cours"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à mes cours
                        </Link>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-red-200/50 bg-red-50/30 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                    <LockClosedIcon className="w-10 h-10 text-red-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{cours.titre}</h1>
                                <div className="flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                                    <span className="text-lg font-medium text-yellow-700">
                                        🔒 Tranche {cours.tranche_requise?.numero} requise
                                    </span>
                                </div>
                                {cours.tranche_requise?.montant && (
                                    <p className="text-gray-600">
                                        Payez la tranche {cours.tranche_requise.numero} de{' '}
                                        <span className="font-semibold">{cours.tranche_requise.montant.toLocaleString()} FCFA</span>{' '}
                                        pour accéder à ce cours.
                                    </p>
                                )}
                                <p className="text-sm text-gray-500 max-w-md">
                                    Une fois la tranche payée et validée, vous aurez automatiquement accès à ce contenu.
                                </p>
                                {cours?.tranche_requise?.lien ? (
                                    <a
                                        href={cours.tranche_requise.lien}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                    >
                                        <LockOpenIcon className="w-5 h-5" />
                                        Débloquer
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed">
                                        <LockOpenIcon className="w-4 h-4" />
                                        Lien indisponible
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </StudentLayout>
            </>
        );
    }

    // ✅ Cours accessible (normal)
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

                    {/* En-tête du cours */}
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

                    {/* ✅ LEÇONS DU COURS */}
                    {cours.lessons && cours.lessons.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                    Leçons du cours ({cours.lessons.length})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {cours.lessons.map((lesson, index) => (
                                    <div key={lesson.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-400 w-6">
                                                        {String(lesson.order || index + 1).padStart(2, '0')}.
                                                    </span>
                                                    <Link
                                                        href={`/student/cours/lesson/${lesson.id}`}
                                                        className="text-sm font-medium text-gray-900 hover:text-cab-blue transition-colors"
                                                    >
                                                        {lesson.titre}
                                                    </Link>
                                                    {lesson.vu ? (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                            ✅ Vu
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                                            Non vu
                                                        </span>
                                                    )}
                                                </div>
                                                {lesson.description && (
                                                    <p className="text-xs text-gray-500 ml-8 mt-0.5 line-clamp-1">
                                                        {lesson.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3 ml-8 mt-1">
                                                    {lesson.has_video && (
                                                        <span className="flex items-center gap-1 text-xs text-red-500">
                                                            <VideoCameraIcon className="w-3 h-3" />
                                                            Vidéo
                                                        </span>
                                                    )}
                                                    {lesson.has_files && (
                                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                                            <DocumentIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                    {lesson.viewed_at && (
                                                        <span className="text-xs text-gray-400">
                                                            Vu le {lesson.viewed_at}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/student/cours/lesson/${lesson.id}`}
                                                className="px-3 py-1.5 text-sm text-cab-blue hover:bg-blue-50 rounded-lg transition-colors font-medium flex items-center gap-1"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                                Voir
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Vidéo du cours */}
                    {cours.video_url && cours.video_embed_url && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-red-500" />
                                    {cours.video_title || 'Vidéo du cours'}
                                </h2>
                            </div>

                            <div className="p-4">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                                    <iframe
                                        src={cours.video_embed_url}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={cours.video_title || cours.titre}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ⚠️ Si la vidéo n'a pas d'embed URL */}
                    {cours.video_url && !cours.video_embed_url && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <div className="flex items-center gap-3 text-yellow-600 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                <ExclamationTriangleIcon className="w-5 h-5" />
                                <p className="text-sm">Le lien vidéo n'est pas valide.</p>
                            </div>
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
