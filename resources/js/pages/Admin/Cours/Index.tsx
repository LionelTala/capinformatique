// resources/js/pages/Admin/Cours/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    BookOpenIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    type: string;
    viewed_count: number;
    is_active: boolean;
    has_video: boolean;
    has_files: boolean;
    total_students: number;
    mode_envoi: 'groupe' | 'individuel'; // ✅ Ajouté
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
    } | null; // ✅ Ajouté
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
    created_at: string;
    notification_sent: boolean;
}

interface Props {
    cours: {
        data: Cours[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
}

export default function Index({ cours }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (c: Cours) => {
        if (confirm(`Confirmer la ${c.is_active ? 'désactivation' : 'activation'} du cours "${c.titre}" ?`)) {
            router.post(`/admin/cours/${c.id}/toggle-active`);
        }
    };

    const handleDelete = (c: Cours) => {
        if (confirm(`Confirmer la suppression du cours "${c.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/cours/${c.id}`);
        }
    };

    const handleResendNotification = (c: Cours) => {
        if (confirm(`Renvoyer les notifications pour le cours "${c.titre}" ?`)) {
            router.post(`/admin/cours/${c.id}/resend-notifications`);
        }
    };

    return (
        <>
            <Head title="Gestion des cours - Admin" />

            <AdminLayout title="Gestion des cours">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {cours.total} cours au total
                    </p>
                    <Link
                        href="/admin/cours/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouveau cours
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {cours.data.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun cours trouvé</p>
                            <Link
                                href="/admin/cours/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre premier cours →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cours
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Envoi
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tranche requise
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vues
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contenu
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Notif.
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cours.data.map((c) => (
                                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 line-clamp-1">
                                                            {c.titre}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {c.description || 'Aucune description'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                {c.formation?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    c.mode_envoi === 'individuel'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {c.mode_envoi === 'individuel' ? (
                                                        <UserIcon className="w-3 h-3" />
                                                    ) : (
                                                        <UserGroupIcon className="w-3 h-3" />
                                                    )}
                                                    {c.mode_envoi === 'individuel' ? 'Individuel' : 'Groupe'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {c.tranche_requise ? (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                                                        T{c.tranche_requise.numero}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">Tous</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {c.viewed_count} / {c.total_students}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    {c.has_video && (
                                                        <VideoCameraIcon className="w-4 h-4 text-red-500" title="Vidéo" />
                                                    )}
                                                    {c.has_files && (
                                                        <DocumentTextIcon className="w-4 h-4 text-blue-500" title="Fichiers" />
                                                    )}
                                                    {!c.has_video && !c.has_files && (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {c.notification_sent ? (
                                                    <span className="text-xs text-green-600">✅ Envoyée</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleResendNotification(c)}
                                                        className="text-xs text-yellow-600 hover:text-yellow-800"
                                                    >
                                                        📤 Envoyer
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    c.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {c.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(c)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            c.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={c.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {c.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/cours/${c.id}`}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                        title="Voir"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/cours/${c.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(c)}
                                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <Pagination
                    links={cours.links}
                    from={cours.from}
                    to={cours.to}
                    total={cours.total}
                />
            </AdminLayout>
        </>
    );
}
