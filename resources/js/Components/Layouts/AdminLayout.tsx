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
    EyeIcon,
    BanknotesIcon,
    CreditCardIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import NotificationBell from '@/Components/Notifications/NotificationBell';
import ToastContainer from '@/Components/UI/ToastContainer';
import type { SharedPageProps } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

interface MenuGroup {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
    badgeCount?: number;
}

const AdminLayout = ({ children, title = 'Tableau de bord' }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { props, url } = usePage<SharedPageProps>();
    const user = props.auth?.user ?? null;
    const devoirCount = props.unreadCountsByType?.['devoir'] ?? 0;
    const candidatureCount = props.unreadCountsByType?.['candidature'] ?? 0;
    const evaluationCount = props.unreadCountsByType?.['evaluation'] ?? 0;

    const canManageUsers = user?.role === 'super_admin' || user?.role === 'admin_centre';

    // Structure des groupes de menus
    const menuGroups: MenuGroup[] = [
        {
            title: 'Gestion du Site',
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            items: [
                { label: 'Statistiques visites', href: '/admin/stats-visites', icon: <EyeIcon className="w-4 h-4" /> },
                { label: 'Galerie', href: '/admin/galerie', icon: <PhotoIcon className="w-4 h-4" /> },
                { label: 'Activités', href: '/admin/activites', icon: <CalendarIcon className="w-4 h-4" /> },
                { label: 'Bibliothèque', href: '/admin/bibliotheque', icon: <BookOpenIcon className="w-4 h-4" /> },
            ],
        },
        {
            title: 'Inscriptions',
            icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
            badgeCount: candidatureCount,
            items: [
                { label: 'Pré-inscriptions', href: '/admin/pre-inscriptions', icon: <ClipboardDocumentListIcon className="w-4 h-4" /> },
                { label: 'Candidatures', href: '/admin/candidatures', icon: <ClipboardDocumentListIcon className="w-4 h-4" />, badge: candidatureCount },
            ],
        },
        {
            title: 'Gestion Académique',
            icon: <AcademicCapIcon className="w-5 h-5" />,
            badgeCount: devoirCount + evaluationCount,
            items: [
                { label: 'Formations', href: '/admin/formations', icon: <AcademicCapIcon className="w-4 h-4" /> },
                { label: 'Certifications', href: '/admin/certifications', icon: <AcademicCapIcon className="w-4 h-4" /> },
                { label: 'Vagues', href: '/admin/vagues', icon: <CalendarIcon className="w-4 h-4" /> },
                { label: 'Étudiants', href: '/admin/students', icon: <UserGroupIcon className="w-4 h-4" /> },
                { label: 'Cours', href: '/admin/cours', icon: <BookOpenIcon className="w-4 h-4" /> },
                { label: 'Devoirs', href: '/admin/devoirs', icon: <ClipboardDocumentListIcon className="w-4 h-4" />, badge: devoirCount },
                { label: 'Évaluations', href: '/admin/evaluations', icon: <ChartBarIcon className="w-4 h-4" />, badge: evaluationCount },
            ],
        },
        {
            title: 'Finance',
            icon: <BanknotesIcon className="w-5 h-5" />,
            items: [
                { label: 'Tranches', href: '/admin/tranches', icon: <BanknotesIcon className="w-4 h-4" /> },
                { label: 'Paiements', href: '/admin/paiements', icon: <CreditCardIcon className="w-4 h-4" /> },
            ],
        },
    ];

    // État pour savoir quels sous-menus sont ouverts
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    // Ouvrir automatiquement le groupe correspondant à l'URL actuelle lors du chargement
    useEffect(() => {
        const activeState: Record<string, boolean> = {};
        menuGroups.forEach((group) => {
            const hasActiveChild = group.items.some((item) => url === item.href || url.startsWith(item.href + '/'));
            if (hasActiveChild) {
                activeState[group.title] = true;
            }
        });
        setOpenGroups((prev) => ({ ...prev, ...activeState }));
    }, [url]);

    const toggleGroup = (title: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

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
                <nav className="h-full overflow-y-auto p-4 space-y-1.5 pb-24">
                    {/* Lien Direct : Tableau de bord */}
                    <Link
                        href="/admin/dashboard"
                        className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url === '/admin/dashboard'
                                ? 'bg-cab-blue text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-cab-blue'
                            }
                        `}
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span className="flex-1">Tableau de bord</span>
                    </Link>

                    {/* Lien Direct : Utilisateurs (si droits suffisants) */}
                    {canManageUsers && (
                        <Link
                            href="/admin/users"
                            className={`
                                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                transition-colors duration-200
                                ${url.startsWith('/admin/users')
                                    ? 'bg-cab-blue text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-cab-blue'
                                }
                            `}
                        >
                            <UserGroupIcon className="w-5 h-5" />
                            <span className="flex-1">Utilisateurs</span>
                        </Link>
                    )}

                    {/* Menus Déroulants (Groupes) */}
                    {menuGroups.map((group) => {
                        const isOpen = !!openGroups[group.title];
                        const hasActiveChild = group.items.some(
                            (item) => url === item.href || url.startsWith(item.href + '/')
                        );

                        return (
                            <div key={group.title} className="space-y-1 pt-1">
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(group.title)}
                                    className={`
                                        flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium
                                        transition-colors duration-200
                                        ${hasActiveChild
                                            ? 'text-cab-blue font-semibold bg-blue-50/50'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        {group.icon}
                                        <span>{group.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!isOpen && !!group.badgeCount && group.badgeCount > 0 && (
                                            <span className="text-xs font-bold rounded-full px-2 py-0.5 bg-cab-red text-white">
                                                {group.badgeCount > 9 ? '9+' : group.badgeCount}
                                            </span>
                                        )}
                                        <ChevronDownIcon
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </button>

                                {/* Sous-liens */}
                                {isOpen && (
                                    <div className="pl-6 space-y-1 border-l-2 border-gray-100 ml-4">
                                        {group.items.map((item) => {
                                            const isActive = url === item.href || url.startsWith(item.href + '/');

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`
                                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
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
                                                                isActive
                                                                    ? 'bg-white text-cab-blue'
                                                                    : 'bg-cab-red text-white'
                                                                }`}
                                                        >
                                                            {item.badge > 9 ? '9+' : item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Lien Direct : Mon Profil */}
                    <Link
                        href="/profil"
                        className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url.startsWith('/profil')
                                ? 'bg-cab-blue text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-cab-blue'
                            }
                        `}
                    >
                        <UserIcon className="w-5 h-5" />
                        <span className="flex-1">Mon Profil</span>
                    </Link>

                    {/* Déconnexion */}
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