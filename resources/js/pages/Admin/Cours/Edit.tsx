// resources/js/pages/Admin/Cours/Edit.tsx
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    XMarkIcon,
    DocumentIcon,
    VideoCameraIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';

import { useState, useEffect } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';


interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Vague {
    id: number;
    name: string;
    date_debut: string;
}

interface Certification {
    id: number;
    titre: string;
}

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    video_url: string | null;
    video_title: string | null;
    formation_id: number;
    type: string;
    vague_id: number | null;
    certification_id: number | null;
    is_active: boolean;
    order: number;
}

interface Props {
    cours: Cours;
    formations: Formation[];
}

export default function Edit({ cours, formations }: Props) {
    const [vagues, setVagues] = useState<Vague[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [loadingVagues, setLoadingVagues] = useState(false);
    const [loadingCertifications, setLoadingCertifications] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        titre: cours.titre,
        description: cours.description || '',
        formation_id: cours.formation_id.toString(),
        type: cours.type,
        vague_id: cours.vague_id?.toString() || '',
        certification_id: cours.certification_id?.toString() || '',
        video_url: cours.video_url || '',
        video_title: cours.video_title || '',
        is_active: cours.is_active,
        order: cours.order,
        send_notification: false,
        files: [] as File[],
    });

    // Charger les vagues
    useEffect(() => {
        if (data.formation_id && data.type === 'vague') {
            setLoadingVagues(true);
            fetch(`/admin/cours/vagues/${data.formation_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setVagues(data);
                    setLoadingVagues(false);
                })
                .catch(() => setLoadingVagues(false));
        }
    }, [data.formation_id, data.type]);

    // Charger les certifications
    useEffect(() => {
        if (data.formation_id && data.type === 'certification') {
            setLoadingCertifications(true);
            fetch(`/admin/cours/certifications/${data.formation_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCertifications(data);
                    setLoadingCertifications(false);
                })
                .catch(() => setLoadingCertifications(false));
        }
    }, [data.formation_id, data.type]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles([...files, ...selectedFiles]);
        setData('files', [...files, ...selectedFiles]);

        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setFilePreviews([...filePreviews, ...newPreviews]);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = filePreviews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setFilePreviews(newPreviews);
        setData('files', newFiles);
        URL.revokeObjectURL(filePreviews[index]);
    };

    const removeExistingFile = (index: number) => {
        const newContenu = cours.contenu.filter((_, i) => i !== index);
        // On ne peut pas supprimer directement les fichiers existants via useForm
        // On va les gérer via un champ caché
        // Pour simplifier, on utilisera une approche différente
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/cours/${cours.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Modifier le cours - Admin" />

            <AdminLayout title="Modifier le cours">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Titre */}
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre du cours <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="titre"
                                    type="text"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Formation */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => setData('formation_id', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une formation --</option>
                                    {formations.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                {errors.formation_id && <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Destinataires
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="vague"
                                            checked={data.type === 'vague'}
                                            onChange={(e) => setData('type', e.target.value as 'vague' | 'certification')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700">Vague</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="certification"
                                            checked={data.type === 'certification'}
                                            onChange={(e) => setData('type', e.target.value as 'vague' | 'certification')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700">Certification</span>
                                    </label>
                                </div>
                            </div>

                            {/* Vague */}
                            {data.type === 'vague' && (
                                <div>
                                    <label htmlFor="vague_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Vague <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="vague_id"
                                        value={data.vague_id}
                                        onChange={(e) => setData('vague_id', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                        required={data.type === 'vague'}
                                    >
                                        <option value="">-- Sélectionnez une vague --</option>
                                        {loadingVagues ? (
                                            <option value="" disabled>Chargement...</option>
                                        ) : (
                                            vagues.map((v) => (
                                                <option key={v.id} value={v.id}>
                                                    {v.name} ({v.date_debut})
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {errors.vague_id && <p className="mt-1 text-sm text-red-600">{errors.vague_id}</p>}
                                </div>
                            )}

                            {/* Certification */}
                            {data.type === 'certification' && (
                                <div>
                                    <label htmlFor="certification_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Certification <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="certification_id"
                                        value={data.certification_id}
                                        onChange={(e) => setData('certification_id', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                        required={data.type === 'certification'}
                                    >
                                        <option value="">-- Sélectionnez une certification --</option>
                                        {loadingCertifications ? (
                                            <option value="" disabled>Chargement...</option>
                                        ) : (
                                            certifications.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.titre}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {errors.certification_id && <p className="mt-1 text-sm text-red-600">{errors.certification_id}</p>}
                                </div>
                            )}

                            {/* Vidéo */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                    Vidéo (optionnel)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="video_title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Titre de la vidéo
                                        </label>
                                        <input
                                            id="video_title"
                                            type="text"
                                            value={data.video_title}
                                            onChange={(e) => setData('video_title', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Ex: Tutoriel réseau"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-1">
                                            URL de la vidéo (YouTube/Vimeo)
                                        </label>
                                        <input
                                            id="video_url"
                                            type="url"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Fichiers existants */}
                            {cours.contenu && cours.contenu.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers existants</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {cours.contenu.map((file, index) => (
                                            <div key={index} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500" />
                                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cab-blue hover:text-cab-dark text-xs"
                                                >
                                                    Voir
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nouveaux fichiers */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ajouter des fichiers</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                        <PlusIcon className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Ajouter des fichiers</span>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {filePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500" />
                                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Cours actif
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre d'affichage
                                    </label>
                                    <input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Notification */}
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="send_notification"
                                        type="checkbox"
                                        checked={data.send_notification}
                                        onChange={(e) => setData('send_notification', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="send_notification" className="text-sm text-blue-700 font-medium">
                                        🔔 Renvoyer une notification aux étudiants (si non déjà envoyé)
                                    </label>
                                </div>
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mise à jour en cours...
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="w-5 h-5" />
                                        Mettre à jour
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
