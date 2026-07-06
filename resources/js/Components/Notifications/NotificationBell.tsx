// resources/js/Components/Notifications/NotificationBell.tsx
import { BellIcon } from '@heroicons/react/24/outline';
import { usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import NotificationDropdown from './NotificationDropdown';

interface NotificationItem {
    id: number;
    type: string;
    title: string;
    message: string;
    link: string | null;
    created_at: string;
    read_at: string | null;
}

const NotificationBell = () => {
    const { props } = usePage<{ unreadNotificationsCount: number }>();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Source unique de vérité : la prop partagée par Inertia (mise à jour par le serveur)
    const unreadCount = props.unreadNotificationsCount ?? 0;

    // Écoute Pusher en temps réel — UN SEUL useEffect
    useEffect(() => {
        const channel = window.Echo.private('admin-notifications');

        channel.listen('.notification.new', (data: NotificationItem) => {
            // Ajoute à la liste locale du dropdown (avec dédup)
            setNotifications((prev) => {
                if (prev.some((n) => n.id === data.id)) {
                    return prev;
                }
                return [data, ...prev];
            });

            // Redemande uniquement le compteur au serveur (source de vérité unique)
            // Met à jour AUSSI le badge sidebar dans AdminLayout, sans refresh complet
            router.reload({ only: ['unreadNotificationsCount'] });
        });

        return () => {
            window.Echo.leave('admin-notifications');
        };
    }, []);

    // Ferme le dropdown au clic extérieur
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        const res = await fetch('/admin/notifications', {
            headers: { Accept: 'application/json' },
        });
        const data = await res.json();
        setNotifications(data.notifications);
    };

    const toggleDropdown = () => {
        if (!isOpen) fetchNotifications();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <BellIcon className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cab-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <NotificationDropdown
                    notifications={notifications}
                    onMarkAsRead={(id) => {
                        setNotifications((prev) =>
                            prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
                        );
                        // Redemande le vrai compteur au serveur après marquage
                        router.reload({ only: ['unreadNotificationsCount'] });
                    }}
                    onMarkAllAsRead={() => {
                        setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
                        router.reload({ only: ['unreadNotificationsCount'] });
                    }}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default NotificationBell;
