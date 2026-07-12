// resources/js/pages/Student/Dashboard.tsx
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Components/Layouts/StudentLayout';
import {
    AcademicCapIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    UserIcon,
    ArrowRightIcon,
    EyeIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';

interface StudentInfo {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    matricule: string;
    phone: string;
    student_type: string;
    vague: {
        id: number;
        name: string;
        formation: string;
    } | null;
    certification: {
        id: number;
        titre: string;
        formation: string;
    } | null;
}

interface Stats {
    total_cours: number;
    cours_vus: number;
    total_devoirs: number;
    devoirs_soumis: number;
    devoirs_corriges: number;
    moyenne: number | null;
    progression: number;
}

interface DernierCours {
    id: number;
    titre: string;
    description: string | null;
    has_video: boolean;
    has_files: boolean;
    vu: boolean;
    created_at: string;
    link: string;
}

interface DevoirARendre {
    id: number;
    titre: string;
    date_limite: string | null;
    est_depasse: boolean;
    jours_restants: number | null;
    has_files: boolean;
    link: string;
}

interface DerniereNote {
    id: number;
    devoir_titre: string;
    note: number | null;
    commentaire: string | null;
    corrected_at: string | null;
    link: string;
}

interface DashboardProps {
    student: StudentInfo;
    stats: Stats;
    derniersCours: DernierCours[];
    devoirsARendre: DevoirARendre[];
    dernieresNotes: DerniereNote[];
}

export default function Dashboard({
    student,
    stats,
    derniersCours,
    devoirsARendre,
    dernieresNotes,
}: DashboardProps) {
    const statsCards = [
        {
            label: 'Cours',
            value: `${stats.cours_vus} / ${stats.total_cours}`,
            icon: <BookOpenIcon className="w-5 h-5" />,
            color: 'bg-blue-500',
            subtitle: `${stats.progression}% terminés`,
        },
        {
            label: 'Devoirs',
            value: `${stats.devoirs_soumis} / ${stats.total_devoirs}`,
            icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
            color: 'bg-orange-500',
            subtitle: `${stats.devoirs_corriges} corrigés`,
        },
        {
            label: 'Moyenne',
            value: stats.moyenne ? `${stats.moyenne}/20` : '--',
            icon: <ChartBarIcon className="w-5 h-5" />,
            color: 'bg-green-500',
            subtitle: 'Moyenne générale',
        },
        {
            label: 'Progression',
            value: `${stats.progression}%`,
            icon: <ChartBarIcon className="w-5 h-5" />,
            color: 'bg-purple-500',
            subtitle: 'Avancement global',
        },
    ];

    return (
        <>
            <Head title="Tableau de bord - Étudiant" />

            <StudentLayout title="Tableau de bord">
                {/* Informations étudiant */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-cab-blue text-white flex items-center justify-center text-2xl font-bold">
                                {student.full_name?.charAt(0)?.toUpperCase() || 'E'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{student.full_name}</h2>
                                <p className="text-sm text-gray-500">
                                    Matricule: <span className="font-mono font-semibold">{student.matricule}</span>
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                                    <span className="text-gray-500">{student.student_type}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    {student.vague && (
                                        <span className="text-gray-500">
                                            {student.vague.formation} • Vague: {student.vague.name}
                                        </span>
                                    )}
                                    {student.certification && (
                                        <span className="text-gray-500">
                                            {student.certification.formation} • Certification: {student.certification.titre}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/profil"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <UserIcon className="w-4 h-4" />
                            Modifier mon profil
                        </Link>
                    </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {statsCards.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">{stat.label}</p>
                                <div className={`${stat.color} w-8 h-8 rounded-xl flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Progression */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-700">Progression globale</h3>
                        <span className="text-sm font-medium text-cab-blue">{stats.progression}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cab-blue to-cab-blue/80 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(stats.progression, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Derniers cours + Devoirs à rendre */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Derniers cours */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                Derniers cours
                            </h3>
                            <Link
                                href="/student/cours"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        {derniersCours.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">Aucun cours disponible</p>
                        ) : (
                            <div className="space-y-3">
                                {derniersCours.map((cours) => (
                                    <Link
                                        key={cours.id}
                                        href={cours.link}
                                        className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-gray-900">{cours.titre}</p>
                                                    {cours.vu ? (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                            Vu
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                                            Non vu
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {cours.has_video && (
                                                        <span className="flex items-center gap-1 text-xs text-red-500">
                                                            <VideoCameraIcon className="w-3 h-3" />
                                                            Vidéo
                                                        </span>
                                                    )}
                                                    {cours.has_files && (
                                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                                            <DocumentTextIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-400">{cours.created_at}</span>
                                                </div>
                                            </div>
                                            <EyeIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Devoirs à rendre */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-5 h-5 text-orange-500" />
                                Devoirs à rendre
                            </h3>
                            <Link
                                href="/student/devoirs"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        {devoirsARendre.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">Aucun devoir en attente</p>
                        ) : (
                            <div className="space-y-3">
                                {devoirsARendre.map((devoir) => (
                                    <Link
                                        key={devoir.id}
                                        href={devoir.link}
                                        className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{devoir.titre}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {devoir.date_limite && (
                                                        <span className={`text-xs flex items-center gap-1 ${
                                                            devoir.est_depasse ? 'text-red-500' : 'text-gray-400'
                                                        }`}>
                                                            <CalendarIcon className="w-3 h-3" />
                                                            {devoir.est_depasse ? 'Dépassé' : `${devoir.jours_restants}j restants`}
                                                        </span>
                                                    )}
                                                    {devoir.has_files && (
                                                        <span className="text-xs text-blue-500 flex items-center gap-1">
                                                            <DocumentTextIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ClockIcon className={`w-4 h-4 shrink-0 ${
                                                devoir.est_depasse ? 'text-red-500' : 'text-gray-400'
                                            }`} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dernières notes */}
                {dernieresNotes.length > 0 && (
                    <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-green-500" />
                                Dernières notes
                            </h3>
                            <Link
                                href="/student/devoirs"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {dernieresNotes.map((note) => (
                                <Link
                                    key={note.id}
                                    href={note.link}
                                    className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{note.devoir_titre}</p>
                                            {note.commentaire && (
                                                <p className="text-xs text-gray-500 line-clamp-1">{note.commentaire}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">{note.corrected_at}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-bold text-green-600">{note.note}/20</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </StudentLayout>
        </>
    );
}
