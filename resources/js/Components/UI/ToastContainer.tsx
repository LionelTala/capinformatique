// resources/js/Components/UI/ToastContainer.tsx
import { usePage } from '@inertiajs/react';

import { useEffect, useState } from 'react';

const ToastContainer = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error'>('success');

    // usePage doit être utilisé dans un composant enfant d'Inertia
    const { props } = usePage();

    const flash = props.flash as { success?: string; error?: string };

    useEffect(() => {
        console.log('Flash dans ToastContainer:', flash);

        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
        }
    }, [flash]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full">
            <div className={`rounded-lg shadow-lg p-4 border-l-4 ${
                type === 'success'
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : 'bg-red-50 border-red-500 text-red-800'
            }`}>
                <div className="flex items-start gap-3">
                    <span className="text-xl">
                        {type === 'success' ? '✅' : '❌'}
                    </span>
                    <div className="flex-1 text-sm">{message}</div>
                    <button
                        onClick={() => setMessage(null)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToastContainer;
