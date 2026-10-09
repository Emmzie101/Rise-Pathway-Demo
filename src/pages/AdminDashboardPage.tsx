import React, { useState, useEffect } from 'react';
import { PageView, UserAccount, UserRole } from '../types';
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Lock,
  ArrowRight,
  UserCheck,
  UserX,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import { fetchAdminUsers, approveUserAccess, changeUserRole } from '../services/api';

interface AdminDashboardPageProps {
  onNavigate: (view: PageView) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [approvalFilter, setApprovalFilter] = useState<'All' | 'Pending' | 'Approved'>('All');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (id: string, name: string) => {
    await approveUserAccess(id);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isApproved: true } : u)));
    triggerFeedback(`Approved access for ${name}`);
  };

  const handleChangeRole = async (id: string, newRole: UserRole) => {
    await changeUserRole(id, newRole);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    triggerFeedback(`Updated role to ${newRole.toUpperCase()}`);
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Cohort', 'Created At'];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.role,
      u.isApproved ? 'Approved' : 'Pending Review',
      u.cohort || 'GBG Cohort 2',
      u.createdAt || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RISE_GBG_Users_Export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerFeedback('Authorized user report downloaded as CSV.');
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesApproval =
      approvalFilter === 'All' ||
      (approvalFilter === 'Pending' && !u.isApproved) ||
      (approvalFilter === 'Approved' && u.isApproved);
    return matchesSearch && matchesRole && matchesApproval;
  });

  const pendingCount = users.filter((u) => !u.isApproved).length;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {actionFeedback && (
          <div className="fixed top-20 right-6 z-50 bg-[#074626] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-[#0B6B3A]">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Platform Administration & Access Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Administrator Console
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-normal leading-relaxed">
              Verify staff credentials, approve elevated access requests, configure cohort access schedules, and export authorized audit reports.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold shadow-2xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#0B6B3A]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onNavigate('staff')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#F3C623]" />
              <span>Open Staff Desk</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold text-gray-500 uppercase">Total Accounts</div>
            <div className="text-2xl font-black text-gray-950">{users.length}</div>
            <div className="text-[11px] text-gray-400">Enrolled across all roles</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-amber-200 bg-amber-50/20 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold text-amber-800 uppercase">Pending Approvals</div>
            <div className="text-2xl font-black text-amber-900">{pendingCount}</div>
            <div className="text-[11px] text-amber-700 font-medium">Require admin review</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Fellows</div>
            <div className="text-2xl font-black text-[#0B6B3A]">
              {users.filter((u) => u.role === 'fellow').length}
            </div>
            <div className="text-[11px] text-emerald-700">Active fellows in pilot</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-blue-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold text-blue-800 uppercase">Staff & Facilitators</div>
            <div className="text-2xl font-black text-blue-900">
              {users.filter((u) => u.role === 'staff' || u.role === 'safeguarding').length}
            </div>
            <div className="text-[11px] text-blue-700">Coaching & focal leads</div>
          </div>
        </div>

        {/* Users Management Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-hidden"
              >
                <option value="All">All Roles</option>
                <option value="fellow">Fellow</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="safeguarding">Safeguarding</option>
              </select>

              <select
                value={approvalFilter}
                onChange={(e) => setApprovalFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-hidden"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending Review</option>
              </select>

              <button
                onClick={loadUsers}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Refresh user list"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Current Role</th>
                  <th className="py-3.5 px-6">Access Status</th>
                  <th className="py-3.5 px-6">Enrolled</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-emerald-50/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-950">{user.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{user.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user.id, e.target.value as UserRole)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                          user.role === 'fellow'
                            ? 'bg-emerald-50 text-[#0B6B3A] border-emerald-200'
                            : user.role === 'staff'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : user.role === 'admin'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="fellow">Fellow</option>
                        <option value="staff">Programme Staff</option>
                        <option value="admin">Administrator</option>
                        <option value="safeguarding">Safeguarding Focal</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      {user.isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#074626] font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-[#0B6B3A]" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-[11px] text-gray-500">
                      {user.createdAt ? user.createdAt.split('T')[0] : 'Pilot'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {!user.isApproved ? (
                        <button
                          onClick={() => handleApprove(user.id, user.name)}
                          className="px-3 py-1.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-xs hover:bg-[#074626] shadow-2xs transition-colors cursor-pointer"
                        >
                          Approve Access
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-medium">Verified Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
