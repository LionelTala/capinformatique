// resources/js/pages/Admin/Dashboard.tsx
import { Head } from '@inertiajs/react';

import AdminLayout from '@/Components/Layouts/AdminLayout';

import type { User } from '@/types';

interface DashboardProps {
    stats: {
        total_users: number;
        total_admins: number;
        total_students: number;
    };
    user: User;
}
export default function Dashboard({ stats, user }: DashboardProps) {
  const statsCards = [
    {
      label: 'Total utilisateurs',
      value: stats.total_users,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      label: 'Administrateurs',
      value: stats.total_admins,
      icon: '🛡️',
      color: 'bg-purple-500',
    },
    {
      label: 'Étudiants',
      value: stats.total_students,
      icon: '🎓',
      color: 'bg-green-500',
    },
  ];

  return (
    <>
      <Head title="Tableau de bord - Admin" />

      <AdminLayout title="Tableau de bord">
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {statsCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Information utilisateur */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de connexion</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Nom :</span>{' '}
              <span className="font-medium text-gray-900">{user.name}</span>
            </p>
            <p>
              <span className="text-gray-500">Email :</span>{' '}
              <span className="font-medium text-gray-900">{user.email}</span>
            </p>
            <p>
              <span className="text-gray-500">Rôle :</span>{' '}
              <span className="px-2 py-0.5 bg-blue-100 text-cab-blue rounded-full text-xs font-medium">
                {user.role}
              </span>
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
