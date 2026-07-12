// resources/js/Components/Layouts/AdminLayout.tsx
import {
    HomeIcon,
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClipboardDocumentListIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    ChartBarIcon,
    PhotoIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import NotificationBell from '@/Components/Notifications/NotificationBell';
import ToastContainer from '@/Components/UI/ToastContainer';
import type { SharedPageProps } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}


const AdminLayout = ({ children, title = 'Tableau de bord' }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { props, url } = usePage<SharedPageProps>();
    const user = props.auth?.user ?? null;
    const unreadCount = props.unreadNotificationsCount ?? 0;
    const devoirCount = props.unreadCountsByType?.['devoir'] ?? 0;
    const candidatureCount = props.unreadCountsByType?.['candidature'] ?? 0;
    const evaluationCount = props.unreadCountsByType?.['evaluation'] ?? 0;


    const canManageUsers = user?.role === 'super_admin' || user?.role === 'admin_centre';

    const menuItems: {
        label: string;
        href: string;
        icon: React.ReactNode;
        badge?: number;
    }[] = [
        { label: 'Tableau de bord', href: '/admin/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    ];

    if (canManageUsers) {
        menuItems.push({
            label: 'Utilisateurs',
            href: '/admin/users',
            icon: <UserGroupIcon className="w-5 h-5" />,
        });
    }

    menuItems.push(
        { label: 'Galerie', href: '/admin/galerie', icon: <PhotoIcon className="w-5 h-5" /> },
        { label: 'Activités', href: '/admin/activites', icon: <CalendarIcon className="w-5 h-5" /> },
        { label: 'Formations', href: '/admin/formations', icon: <AcademicCapIcon className="w-5 h-5" /> },
        { label: 'Vagues', href: '/admin/vagues', icon: <CalendarIcon className="w-5 h-5" /> },
        { label: 'Certifications', href: '/admin/certifications', icon: <AcademicCapIcon className="w-5 h-5" /> },
        { label: 'Candidatures', href: '/admin/candidatures', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, badge: candidatureCount },

        { label: 'Étudiants', href: '/admin/students', icon: <UserGroupIcon className="w-5 h-5" /> },
        { label: 'Cours', href: '/admin/cours', icon: <BookOpenIcon className="w-5 h-5" /> },
        { label: 'Devoirs', href: '/admin/devoirs', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, badge: devoirCount },
        { label: 'Évaluations', href: '/admin/evaluations', icon: <ChartBarIcon className="w-5 h-5" />, badge: evaluationCount },
        { label: 'Mon Profil', href: '/profil', icon: <UserIcon className="w-5 h-5" />},


    );

    const getUserInitials = (user: typeof props.auth.user) => {
        if (!user) return '?';
        return user.name.charAt(0).toUpperCase();
    };

    const getRoleLabel = (role?: string) => {
        const labels: Record<string, string> = {
            super_admin: 'Super Administrateur',
            admin_centre: 'Admin Centre',
            admin: 'Administrateur',
            student_online: 'Étudiant en ligne',
            student_certif: 'Étudiant certification',
        };
        return role ? labels[role] || role : '';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer />

            {/* Navbar Admin */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isSidebarOpen ? (
                                <XMarkIcon className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Bars3Icon className="w-6 h-6 text-gray-600" />
                            )}
                        </button>

                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <img
                                src="/assets/images/logo.jpeg"
                                alt="CAB"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="text-lg font-bold text-gray-900 hidden sm:block">
                                CAB <span className="text-cab-red">Admin</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <NotificationBell />

                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-cab-blue text-white flex items-center justify-center text-sm font-semibold">
                                    {getUserInitials(user)}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {user?.name || 'Utilisateur'}
                                </span>
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                            </button>

                            {isUserMenuOpen && user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-cab-blue rounded-full text-xs font-medium">
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </div>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                                        Déconnexion
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200
                    transition-transform duration-300 ease-in-out overflow-hidden
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <nav className="h-full overflow-y-auto p-4 space-y-1 pb-24">
                    {menuItems.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                    transition-colors duration-200
                                    ${isActive
                                        ? 'bg-cab-blue text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-cab-blue'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="flex-1">{item.label}</span>
                                {!!item.badge && item.badge > 0 && (
                                    <span
                                        className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                                            isActive ? 'bg-white text-cab-blue' : 'bg-cab-red text-white'
                                        }`}
                                    >
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-gray-200">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Déconnexion
                        </Link>
                    </div>
                </nav>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="lg:ml-64 pt-16">
                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500">Bienvenue sur votre espace d'administration</p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
