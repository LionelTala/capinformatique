// resources/js/pages/Admin/Formations/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    AcademicCapIcon ,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
    slug: string;
    description: string;
    debouches: string;
    duration: string;
    diplome: string;
    frais: number;
    frais_formatted: string;
    image: string | null;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    is_active: boolean;
    order: number;
}

interface Props {
    formations: Formation[];
}

export default function Index({ formations }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    // Vérifier si formations existe
    console.log('Formations data:', formations);

    const handleToggleActive = (formation: Formation) => {
        if (confirm(`Confirmer la ${formation.is_active ? 'désactivation' : 'activation'} de ${formation.name} ?`)) {
            router.post(`/admin/formations/${formation.id}/toggle-active`);
        }
    };

    const handleDelete = (formation: Formation) => {
        if (confirm(`Confirmer la suppression de ${formation.name} ? Cette action est irréversible.`)) {
            router.delete(`/admin/formations/${formation.id}`);
        }
    };

    return (
        <>
            <Head title="Gestion des formations - Admin" />

            <AdminLayout title="Gestion des formations">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {formations?.length ?? 0} formation{formations?.length !== 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/formations/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouvelle formation
                    </Link>
                </div>

                {/* Liste */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {!formations || formations.length === 0 ? (
                        <div className="text-center py-12">
                            <AcademicCapIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune formation trouvée</p>
                            <Link
                                href="/admin/formations/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre première formation →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto" key={formations.map(f => f.id).join('-')}>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Abréviation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Durée
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Frais
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
                                    {formations.map((formation) => (
                                        <tr key={formation.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={formation.image_url || '/assets/images/placeholder.jpg'}
                                                        alt={formation.name || 'Formation'}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{formation.name || 'Sans nom'}</p>
                                                        <p className="text-xs text-gray-500">{formation.diplome || 'Non défini'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">
                                                    {formation.abbreviation || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {formation.duration || '-'}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-900">
                                                {formation.frais_formatted || '0 FCFA'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    formation.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {formation.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {formation.lien_externe && formation.lien_label && (
                                                        <a
                                                            href={formation.lien_externe}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors"
                                                            title={formation.lien_label}
                                                        >
                                                            <EyeIcon className="w-5 h-5" />
                                                        </a>
                                                    )}

                                                    <button
                                                        onClick={() => handleToggleActive(formation)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            formation.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={formation.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {formation.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/formations/${formation.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(formation)}
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
            </AdminLayout>
        </>
    );
}
