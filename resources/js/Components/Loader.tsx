// resources/js/Components/Loader.tsx
import { useState, useEffect } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let value = 0;
        const interval = setInterval(() => {
            value += Math.random() * 18;
            if (value >= 100) {
                value = 100;
                clearInterval(interval);
                setTimeout(() => setIsVisible(false), 350);
            }
            setProgress(Math.min(value, 100));
        }, 180);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500"
            style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}
        >
            <div className="text-center max-w-md px-8">
                <img
                    src="/assets/images/logo.jpeg"
                    alt="CAB Informatique"
                    className="w-20 h-20 mx-auto mb-6 object-contain rounded-full"
                />
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(135deg, #0d2a63, #1a56db)',
                        }}
                    />
                </div>
                <p className="text-sm text-gray-500 font-medium tracking-wider">
                    Notre désir, Votre Professionnalisme
                </p>
            </div>
        </div>
    );
};

export default Loader;
