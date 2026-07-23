// resources/js/pages/Auth/Login.tsx
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const getInputPlaceholder = () => {
        return loginType === 'email' ? 'exemple@email.com' : '6XX XXX XXX';
    };

    const getInputType = () => {
        return loginType === 'email' ? 'email' : 'tel';
    };

    return (
        <>
            <Head title="Connexion - CAB Informatique" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">

                    {/* Logo */}
                    <div className="text-center">
                        <Link href="/" className="inline-block">
                            <img
                                src="/assets/images/logo.jpeg"
                                alt="CAB Informatique"
                                className="h-16 w-auto mx-auto"
                            />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Connexion
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Connectez-vous avec votre email ou votre numéro de téléphone
                        </p>
                    </div>

                    {/* ✅ Message de sécurité */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                            <ShieldCheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700">
                                Après <strong>5 tentatives échouées</strong>, votre accès sera bloqué pendant <strong>5 minutes</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {/* ✅ Sélection du type de connexion */}
                        <div className="flex rounded-xl bg-gray-100 p-1">
                            <button
                                type="button"
                                onClick={() => setLoginType('email')}
                                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                                    loginType === 'email'
                                        ? 'bg-white text-cab-blue shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                                Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginType('phone')}
                                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                                    loginType === 'phone'
                                        ? 'bg-white text-cab-blue shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <PhoneIcon className="w-4 h-4 inline mr-2" />
                                Téléphone
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* ✅ Login (Email ou Téléphone) */}
                            <div>
                                <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                                    {loginType === 'email' ? 'Adresse email' : 'Numéro de téléphone'}
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {loginType === 'email' ? (
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </div>
                                    <input
                                        id="login"
                                        type={getInputType()}
                                        value={data.login}
                                        onChange={(e) => setData('login', e.target.value)}
                                        className={`appearance-none block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors ${
                                            errors.login ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder={getInputPlaceholder()}
                                        required
                                    />
                                </div>
                                {errors.login && (
                                    <p className="mt-1 text-sm text-red-600">{errors.login}</p>
                                )}
                            </div>

                            {/* Mot de passe */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mot de passe <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`appearance-none block w-full pl-10 pr-12 py-3 border rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-cab-blue hover:text-cab-dark transition-colors"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        {/* Bouton */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-cab-blue hover:bg-cab-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cab-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion en cours...
                                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Lien retour accueil */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-sm text-gray-500 hover:text-cab-blue transition-colors"
                        >
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
