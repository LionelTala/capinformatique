// resources/js/components/UI/Toast.tsx


import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import { usePage } from '@inertiajs/react';

import { useEffect } from 'react';


interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const configs = {
        success: {
            icon: <CheckCircleIcon className="w-5 h-5" />,
            bg: 'bg-green-50',
            border: 'border-green-500',
            text: 'text-green-800',
            iconColor: 'text-green-500',
        },
        error: {
            icon: <XCircleIcon className="w-5 h-5" />,
            bg: 'bg-red-50',
            border: 'border-red-500',
            text: 'text-red-800',
            iconColor: 'text-red-500',
        },
        warning: {
            icon: <ExclamationTriangleIcon className="w-5 h-5" />,
            bg: 'bg-yellow-50',
            border: 'border-yellow-500',
            text: 'text-yellow-800',
            iconColor: 'text-yellow-500',
        },
        info: {
            icon: <InformationCircleIcon className="w-5 h-5" />,
            bg: 'bg-blue-50',
            border: 'border-blue-500',
            text: 'text-blue-800',
            iconColor: 'text-blue-500',
        },
    };

    const config = configs[type] || configs.info;

    return (
        <div className={`fixed top-20 right-4 z-50 max-w-md w-full ${config.bg} border-l-4 ${config.border} rounded-lg shadow-lg p-4 animate-slide-in-right`}>
            <div className="flex items-start gap-3">
                <div className={`${config.iconColor} shrink-0 mt-0.5`}>
                    {config.icon}
                </div>
                <div className={`flex-1 text-sm ${config.text}`}>
                    {message}
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XCircleIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
