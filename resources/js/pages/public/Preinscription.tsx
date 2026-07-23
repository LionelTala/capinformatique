// resources/js/pages/public/Preinscription.tsx
import { ArrowLeftIcon, UserIcon, EnvelopeIcon, PhoneIcon, AcademicCapIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import PublicLayout from '@/Components/PublicLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Certification {
    id: number;
    titre: string;
    formation: string;
}

interface Props {
    type: 'formation' | 'certification';
    formation: Formation | null;
    certification: Certification | null;
}

export default function Preinscription({ type, formation, certification }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        type: type,
        formation_id: formation?.id || '',
        certification_id: certification?.id || '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        niveau_scolaire: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/candidatures');
    };

    useEffect(() => {
        // Réinitialiser le scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Forcer le scroll
        window.scrollTo(0, 0);

        // Cleanup
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, []);

    const title = type === 'formation'
        ? `Pré-inscription - ${formation?.name || 'Formation'}`
        : `Pré-inscription - ${certification?.titre || 'Certification'}`;

    return (
        <>
            <Head title={title} />

            <PublicLayout>
                {/* Header */}
                <section className="relative pt-32 pb-16 bg-gradient-to-r from-cab-dark to-cab-blue">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                Pré-inscription <span className="text-cab-red">en ligne</span>
                            </h1>
                            <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
                                {type === 'formation'
                                    ? `Rejoignez la formation ${formation?.name || ''}`
                                    : `Préparez-vous pour la certification ${certification?.titre || ''}`}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Formulaire */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Lien retour */}
                        <Link
                            href={type === 'formation' ? '/formations' : '/certification'}
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-6"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            {type === 'formation' ? 'Retour aux formations' : 'Retour aux certifications'}
                        </Link>

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Vos informations</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Remplissez ce formulaire pour être contacté par notre équipe.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Infos formation/certification */}
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-sm font-medium text-cab-blue">
                                        {type === 'formation'
                                            ? `📚 Formation : ${formation?.name || 'Non spécifiée'}`
                                            : `🎓 Certification : ${certification?.titre || 'Non spécifiée'}`}
                                    </p>
                                    {type === 'certification' && certification?.formation && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            Formation associée : {certification.formation}
                                        </p>
                                    )}
                                </div>

                                {/* Nom + Prénom */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="nom"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) => setData('nom', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Votre nom"
                                            required
                                        />
                                        {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prénom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="prenom"
                                            type="text"
                                            value={data.prenom}
                                            onChange={(e) => setData('prenom', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Votre prénom"
                                            required
                                        />
                                        {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                                    </div>
                                </div>

                                {/* Email (Optionnel) */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-gray-400 text-xs">(optionnel)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="exemple@email.com"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Téléphone WhatsApp */}
                                <div>
                                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Téléphone (WhatsApp) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="telephone"
                                            type="tel"
                                            value={data.telephone}
                                            onChange={(e) => setData('telephone', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Ex: 690 66 62 45"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">📱 Numéro WhatsApp pour recevoir vos identifiants</p>
                                    {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                                </div>

                                {/* Niveau scolaire */}
                                <div>
                                    <label htmlFor="niveau_scolaire" className="block text-sm font-medium text-gray-700 mb-1">
                                        Niveau scolaire
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <select
                                            id="niveau_scolaire"
                                            value={data.niveau_scolaire}
                                            onChange={(e) => setData('niveau_scolaire', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="CEP">CEP</option>
                                            <option value="BEPC">BEPC</option>
                                            <option value="PROBATOIRE">Probatoire</option>
                                            <option value="BAC">Baccalauréat</option>
                                            <option value="BAC+2">BAC+2</option>
                                            <option value="LICENCE">Licence</option>
                                            <option value="MASTER">Master ou plus</option>
                                        </select>
                                    </div>
                                    {errors.niveau_scolaire && <p className="mt-1 text-sm text-red-600">{errors.niveau_scolaire}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message (optionnel)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                            <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={4}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                            placeholder="Votre message..."
                                        />
                                    </div>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                {/* Bouton */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-cab-blue to-cab-blue/80 text-white rounded-xl text-sm font-semibold hover:from-cab-dark hover:to-cab-blue transition-all duration-300 shadow-lg shadow-cab-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <UserIcon className="w-5 h-5" />
                                            Envoyer ma candidature
                                        </>
                                    )}
                                </button>

                                {/* Note de bas de page */}
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    * Champs obligatoires. En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour le traitement de votre candidature.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
