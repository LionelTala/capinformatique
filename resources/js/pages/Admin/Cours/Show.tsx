import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    UserGroupIcon,
    UsersIcon,
    ShieldCheckIcon,
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

interface TrancheRequise {
    id: number;
    numero: number;
    montant: number;
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
    mode_envoi: 'groupe' | 'individuel';
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
    student: {
        id: number;
        name: string;
        matricule: string;
    } | null;
    tranche_requise: TrancheRequise | null;
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

            <AdminLayout title="Détails du cours">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    {/* En-tête */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">{cours.titre}</h1>

                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-sm text-gray-600">
                                        {cours.formation?.name}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">
                                        {cours.type === 'vague'
                                            ? `Vague ${cours.vague?.name || '-'}`
                                            : `Certification ${cours.certification?.titre || '-'}`}
                                    </span>
                                </div>

                                {/* Mode d'envoi et Tranche */}
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                        cours.mode_envoi === 'individuel'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {cours.mode_envoi === 'individuel' ? (
                                            <UserIcon className="w-4 h-4" />
                                        ) : (
                                            <UserGroupIcon className="w-4 h-4" />
                                        )}
                                        {cours.mode_envoi === 'individuel' ? 'Envoi individuel' : 'Envoi groupe'}
                                    </span>

                                    {/* Infos de l'étudiant ciblé */}
                                    {cours.mode_envoi === 'individuel' && cours.student && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                                            <UsersIcon className="w-4 h-4" />
                                            {cours.student.name} ({cours.student.matricule})
                                        </span>
                                    )}

                                    {cours.tranche_requise ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            Tranche {cours.tranche_requise.numero} requise
                                            <span className="ml-1 text-[10px] opacity-75">
                                                ({cours.tranche_requise.montant.toLocaleString()} FCFA)
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Accessible à tous
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
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
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{cours.description}</p>
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
                                        title={cours.video_title || cours.titre}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <a
                                            href={cours.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                                        >
                                            ▶️ Voir la vidéo sur {cours.video_url.includes('youtube') ? 'YouTube' : 'Vimeo'}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Fichiers */}
                    {cours.contenu && cours.contenu.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints ({cours.contenu.length})
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {cours.contenu.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                    >
                                        <DocumentIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            📎
                                        </span>
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

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cab-blue rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>

                        <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
                            {cours.mode_envoi === 'individuel' ? (
                                <span>👤 Envoi individuel à un seul étudiant</span>
                            ) : (
                                <span>👥 Envoi groupé à {cours.total_students} étudiant{cours.total_students > 1 ? 's' : ''}</span>
                            )}
                            {cours.tranche_requise && (
                                <span className="ml-3">
                                    • 🔒 Tranche {cours.tranche_requise.numero} requise
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Visionnages étudiants */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                Ont vu ({viewedStudents.length})
                            </h3>
                            {viewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Aucun étudiant n'a encore vu ce cours</p>
                            ) : (
                                <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                    {viewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg">
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                            <span className="text-xs text-gray-400">{student.viewed_at}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-yellow-500" />
                                N'ont pas vu ({notViewedStudents.length})
                            </h3>
                            {notViewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Tous les étudiants ont vu ce cours</p>
                            ) : (
                                <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                    {notViewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm p-2 bg-yellow-50 rounded-lg">
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
