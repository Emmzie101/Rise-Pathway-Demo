import React, { useState, useEffect } from 'react';
import { PageView, SupportRequest } from '../types';
import {
  ShieldAlert,
  Lock,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Clock,
  User,
  Eye,
  FileText,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { fetchSupportRequests, fetchSafeguardingRecords, updateSupportRequestStatus } from '../services/api';

interface SafeguardingDeskPageProps {
  onNavigate: (view: PageView) => void;
}

export const SafeguardingDeskPage: React.FC<SafeguardingDeskPageProps> = ({ onNavigate }) => {
  const [safeguardingRequests, setSafeguardingRequests] = useState<SupportRequest[]>([]);
  const [confidentialDossiers, setConfidentialDossiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<SupportRequest | null>(null);
  const [staffNote, setStaffNote] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const reqs = await fetchSupportRequests();
      setSafeguardingRequests(reqs.filter((r) => r.isSafeguarding));
      const dossiers = await fetchSafeguardingRecords();
      setConfidentialDossiers(dossiers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'In Review' | 'Resolved') => {
    await updateSupportRequestStatus(id, status, staffNote);
    setSafeguardingRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, staffNotes: staffNote || r.staffNotes } : r))
    );
    setSelectedItem(null);
    setStaffNote('');
    triggerToast(`Safeguarding intake status updated to ${status}.`);
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#FDF8F7] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {toastMsg && (
          <div className="fixed top-20 right-6 z-50 bg-[#881337] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Restricted Safeguarding Access · Focal Person Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Safeguarding Intake & Confidential Dossiers
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-normal leading-relaxed">
              Strictly segregated workspace for designated focal personnel. Information logged here is never exposed to cohort peers, ordinary facilitators, or general administrative exports.
            </p>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1 shrink-0">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="w-4 h-4 text-rose-700" />
              <span>Duty of Care Protocol</span>
            </div>
            <p className="text-[11px] text-rose-800">
              Emergency contacts & local referral hotlines active.
            </p>
          </div>
        </div>

        {/* Confidential Requests Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-950 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Confidential Human Support Queue ({safeguardingRequests.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {safeguardingRequests.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-rose-100 text-gray-500 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#0B6B3A] mx-auto" />
                <p className="font-semibold text-gray-800">No active safeguarding flags.</p>
                <p className="text-gray-500">All student cases are currently resolved or clear.</p>
              </div>
            ) : (
              safeguardingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                        {req.userName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-950">{req.userName}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                            {req.urgency} Urgency
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-mono">{req.userEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          req.status === 'Resolved'
                            ? 'bg-emerald-100 text-[#074626]'
                            : req.status === 'In Review'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs text-gray-900 leading-relaxed">
                    <span className="font-bold text-rose-950 uppercase tracking-wider text-[10px] block mb-1">
                      Fellow Disclosure Statement:
                    </span>
                    <p className="whitespace-pre-wrap">{req.message}</p>
                  </div>

                  {req.staffNotes && (
                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-gray-200 text-xs text-gray-700">
                      <span className="font-bold text-gray-900 text-[10px] uppercase block">
                        Focal Person Response Notes:
                      </span>
                      <p>{req.staffNotes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-gray-400">
                      Logged: {new Date(req.createdAt).toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(req)}
                        className="px-3 py-1.5 rounded-xl border border-rose-300 text-xs font-bold text-rose-800 hover:bg-rose-50 cursor-pointer"
                      >
                        Add Case Note
                      </button>
                      {req.status !== 'Resolved' && (
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'Resolved')}
                          className="px-4 py-1.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MODAL: ADD CASE NOTE */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-950">
                  Update Safeguarding Case: {selectedItem.userName}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Confidential Focal Person Notes & Action Taken:
                </label>
                <textarea
                  rows={4}
                  value={staffNote}
                  onChange={(e) => setStaffNote(e.target.value)}
                  placeholder="Record confidential follow-up steps, referrals made, or wellbeing check details..."
                  className="w-full p-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden resize-none"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedItem.id, 'In Review')}
                    className="px-4 py-2 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800"
                  >
                    Save Case Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
