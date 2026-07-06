export type * from './auth';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'admin_centre' | 'admin' | 'student_online' | 'student_certif';
    is_active: boolean;
    last_login_at: string | null;
}

export interface Auth {
    user: User | null;
}

export interface Flash {
    success: string | null;
    error: string | null;
    warning: string | null;
    info: string | null;
}

export interface PageProps {
    auth: Auth;
    flash: Flash;
}
