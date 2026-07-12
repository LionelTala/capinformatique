// resources/js/pages/Admin/Cours/Show.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';


interface ViewedStudent {
    id: number;
    name: string;
    matricule: string;
    viewed_at: string;
}

interface NotViewedStudent {
    id: number;
    name: string;
    matricule: string;
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
    type: string;
    viewed_count: number;
    total_students: number;
    has_notification_sent: boolean;
    notification_sent_at: string | null;
    formation: {
        id: number;
        name: string;
    } | null;
    vague: {
        id: number;
        name: string;
    } | null;
    certification: {
        id: number;
        titre: string;
    } | null;
}

interface Props {
    cours: Cours;
    viewedStudents: ViewedStudent[];
    notViewedStudents: NotViewedStudent[];
}

export default function Show({ cours, viewedStudents, notViewedStudents }: Props) {
    const percentage = cours.total_students > 0
        ? Math.round((cours.viewed_count / cours.total_students) * 100)
        : 0;

    const handleResendNotification = () => {
        if (confirm(`Renvoyer les notifications pour le cours "${cours.titre}" ?`)) {
            router.post(`/admin/cours/${cours.id}/resend-notifications`);
        }
    };

    return (
        <>
            <Head title={`${cours.titre} - Détails du cours`} />

            <AdminLayout title={`Détails du cours`}>
                <div className="max-w-4xl">
                    <Link
                        href="/admin/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{cours.titre}</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    {cours.formation?.name} •
                                    {cours.type === 'vague'
                                        ? ` Vague ${cours.vague?.name}`
                                        : ` Certification ${cours.certification?.titre}`}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {!cours.has_notification_sent && (
                                    <button
                                        onClick={handleResendNotification}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        📤 Envoyer notification
                                    </button>
                                )}
                                <Link
                                    href={`/admin/cours/${cours.id}/edit`}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                >
                                    Modifier
                                </Link>
                            </div>
                        </div>
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
                                            ▶️ Voir la vidéo sur {cours.video_url.includes('youtube') ? 'YouTube' : 'Vimeo'}
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
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
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

                    {/* Statistiques de visionnage */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <EyeIcon className="w-5 h-5 text-cab-blue" />
                            Statistiques de visionnage
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{cours.viewed_count}</p>
                                <p className="text-xs text-gray-500">Vues</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{cours.total_students}</p>
                                <p className="text-xs text-gray-500">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{percentage}%</p>
                                <p className="text-xs text-gray-500">Taux de visionnage</p>
                            </div>
                        </div>

                        {/* Barre de progression */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cab-blue rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Liste des étudiants */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Ont vu */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                Ont vu ({viewedStudents.length})
                            </h3>
                            {viewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Aucun étudiant n'a encore vu ce cours</p>
                            ) : (
                                <ul className="space-y-2">
                                    {viewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                            <span className="text-xs text-gray-400">{student.viewed_at}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* N'ont pas vu */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-yellow-500" />
                                N'ont pas vu ({notViewedStudents.length})
                            </h3>
                            {notViewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Tous les étudiants ont vu ce cours</p>
                            ) : (
                                <ul className="space-y-2">
                                    {notViewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                            <span className="text-xs text-gray-400">{student.matricule}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
