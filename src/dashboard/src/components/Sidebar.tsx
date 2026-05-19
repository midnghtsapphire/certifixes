import { NavLink, useLocation } from 'react-router-dom';
import { fleetStats } from '../lib/mockData';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: '◉', exact: true },
  { to: '/dashboard/certificates', label: 'Certificates', icon: '🔒', exact: false },
  { to: '/dashboard/renewals', label: 'Renewal Queue', icon: '↻', exact: false },
  { to: '/dashboard/alerts', label: 'Alerts', icon: '⚠', exact: false },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙', exact: false },
];

const hasIssues = fleetStats.expired > 0 || fleetStats.errors > 0;
const hasWarnings = fleetStats.expiringSoon > 0;

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xl">🔐</span>
          <span className="font-bold text-white text-lg">certifixes</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className={`h-2 w-2 rounded-full ${
              hasIssues ? 'bg-red-400' : hasWarnings ? 'bg-yellow-400' : 'bg-green-400'
            }`}
          />
          <span className="text-xs text-gray-400">
            {hasIssues ? 'Fleet has issues' : hasWarnings ? 'Warnings active' : 'All healthy'}
          </span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <div className="text-xs text-gray-500">v0.1.0 · MIT License</div>
      </div>
    </aside>
  );
}
