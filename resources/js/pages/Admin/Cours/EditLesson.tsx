// resources/js/pages/Admin/Cours/EditLesson.tsx
// Version simplifiée (même que le modal mais en page)
import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    PlusIcon,
    XMarkIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_title: string | null;
    files: any[];
    order: number;
    is_active: boolean;
    cours: {
        id: number;
        titre: string;
        tranche_requise: {
            numero: number;
            montant: number;
        } | null;
    };
}

interface Props {
    lesson: Lesson;
    cours: {
        id: number;
        titre: string;
        tranche_requise: {
            numero: number;
            montant: number;
        } | null;
    };
}

export default function EditLesson({ lesson, cours }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, put, errors } = useForm({
        titre: lesson.titre,
        description: lesson.description || '',
        contenu: lesson.contenu || '',
        video_url: lesson.video_url || '',
        video_title: lesson.video_title || '',
        order: lesson.order,
        is_active: lesson.is_active,
        files: [] as File[],
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('titre', data.titre);
        formData.append('description', data.description || '');
        formData.append('contenu', data.contenu || '');
        formData.append('video_url', data.video_url || '');
        formData.append('video_title', data.video_title || '');
        formData.append('order', String(data.order));
        formData.append('is_active', data.is_active ? '1' : '0');

        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        router.post(`/admin/cours/lesson/${lesson.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <Head title={`Modifier ${lesson.titre}`} />

            <AdminLayout title="Modifier la leçon">
                <div className="max-w-4xl">
                    <Link
                        href={`/admin/cours/${cours.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour au cours
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-sm text-blue-700">
                                <span className="font-semibold">ℹ️ Accès hérité du cours</span>
                                <br />
                                {cours.tranche_requise ? (
                                    <>Cette leçon est accessible aux étudiants ayant payé la <strong>Tranche {cours.tranche_requise.numero}</strong></>
                                ) : (
                                    <>Cette leçon est accessible à <strong>tous les étudiants</strong> (aucune tranche requise)</>
                                )}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Titre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                            </div>

                            {/* Contenu */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contenu
                                </label>
                                <textarea
                                    value={data.contenu}
                                    onChange={(e) => setData('contenu', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                            </div>

                            {/* Vidéo */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                    Vidéo (optionnel)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            value={data.video_title}
                                            onChange={(e) => setData('video_title', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Fichiers */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                        <PlusIcon className="w-6 h-6 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Ajouter des fichiers</span>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                            ref={fileInputRef}
                                        />
                                    </label>
                                </div>

                                {filePreviews.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-lg p-2 border border-gray-200 flex items-center gap-2">
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

                                {/* Fichiers existants */}
                                {lesson.files && lesson.files.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-500 mb-2">Fichiers existants :</p>
                                        <div className="flex flex-wrap gap-2">
                                            {lesson.files.map((file, index) => (
                                                <a
                                                    key={index}
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-cab-blue hover:underline flex items-center gap-1"
                                                >
                                                    <DocumentIcon className="w-3 h-3" />
                                                    {file.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label className="text-sm text-gray-700">Leçon active</label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre
                                    </label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/cours/${cours.id}`}
                                    className="flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                                            Enregistrement...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PencilSquareIcon className="w-5 h-5" />
                                                            Mettre à jour
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </AdminLayout>
                        </>
                    );
                }
