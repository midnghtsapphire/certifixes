import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const titleMap: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/certificates': 'Certificates',
  '/dashboard/renewals': 'Renewal Queue',
  '/dashboard/alerts': 'Alerts',
  '/dashboard/settings': 'Settings',
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = pathname.includes('/certificates/') ? 'Certificate Detail' : (titleMap[pathname] ?? 'certifixes');

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
