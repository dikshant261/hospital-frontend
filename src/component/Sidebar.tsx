import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Stethoscope,
    Shield,
    User,
    LogOut,
    ChevronDown
} from 'lucide-react';

// Map backend icon string to Lucide component
const iconMap: { [key: string]: React.ComponentType<any> } = {
    LayoutDashboard,
    Users,
    Calendar,
    Stethoscope,
    Shield,
};

interface MenuItem {
    id: number;
    title: string;
    path: string;
    icon: string;
}

export default function Sidebar() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Retrieve user data from local storage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userName = user?.name || 'User Profile';
    const userEmail = user?.email || '';
    const userRoles = user?.roles?.map((r: any) => r.name).join(', ') || 'Staff';

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axiosInstance.get('/user/menus');
                if (response.data && response.data.menus) {
                    setMenus(response.data.menus);
                    console.log(response.data.menus);
                }
            } catch (err) {
                console.error('Failed to fetch sidebar menus:', err);
            }
        };

        fetchMenus();
    }, []);

    // Close profile menu if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">

            {/* Brand Header */}
            <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-slate-50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900">
                        <Stethoscope className="h-5 w-5" />
                    </div>
                    <span className="tracking-tight text-lg">CareConnect</span>
                </div>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {menus.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-sm text-slate-400">
                        Loading navigation...
                    </div>
                ) : (
                    menus.map((menu) => {
                        const IconComponent = iconMap[menu.icon] || User;
                        return (
                            <NavLink
                                key={menu.id}
                                to={menu.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-50'
                                    }`
                                }
                            >
                                <IconComponent className="h-4 w-4 shrink-0" />
                                <span>{menu.title}</span>
                            </NavLink>
                        );
                    })
                )}
            </div>

            {/* Profile/Footer Area */}
            <div className="relative border-t border-slate-100 dark:border-slate-800 p-4" ref={profileMenuRef}>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                    <div className="absolute bottom-full left-4 right-4 z-50 mb-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-950 animate-fade-in-up">
                        <div className="flex flex-col pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate mt-1">{userName}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</span>
                            <div className="mt-1.5 inline-flex w-max items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {userRoles}
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                )}

                {/* Profile Trigger Button */}
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-slate-50 font-bold text-sm border border-slate-200 dark:border-slate-700">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{userName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userRoles}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                </button>

            </div>
        </div>
    );
}
