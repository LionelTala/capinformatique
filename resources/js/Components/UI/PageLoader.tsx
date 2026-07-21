import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const PageLoader = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleStart = () => {
            // Petit délai de 150ms pour éviter de faire clignoter l'écran sur les requêtes instantanées
            timer = setTimeout(() => {
                setLoading(true);
                // Permet le déclenchement de la transition CSS
                requestAnimationFrame(() => setVisible(true));
            }, 150);
        };

        const handleFinish = () => {
            clearTimeout(timer);
            setVisible(false);
            // Laisser la transition de sortie se terminer avant de démonter le loader
            setTimeout(() => setLoading(false), 300);
        };

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);
        const removeError = router.on('error', handleFinish);

        return () => {
            clearTimeout(timer);
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="relative flex flex-col items-center justify-center p-8 bg-white/90 rounded-3xl shadow-2xl border border-white/20 transform transition-transform duration-300 scale-100">

                {/* Spinner animé avec double anneau */}
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-cab-blue/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-cab-blue border-t-transparent animate-spin"></div>
                </div>

                {/* Texte de chargement */}
                <p className="text-sm font-semibold text-gray-800 tracking-wide animate-pulse">
                    Chargement en cours...
                </p>
            </div>
        </div>
    );
};

export default PageLoader;
