import React from 'react';
import { Search, ShieldCheck, User } from 'lucide-react';

export const AdminUsersTab = ({
  usersList,
  searchTerm,
  setSearchTerm,
  handleToggleUserRole
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          User Database
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Registered customer accounts, phone numbers and administrator roles
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-2 rounded-xl text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#C28E58]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              {usersList
                .filter(u => {
                  const s = searchTerm.toLowerCase();
                  return (u.name || '').toLowerCase().includes(s) ||
                         (u.email || '').toLowerCase().includes(s) ||
                         (u.phone || '').includes(s);
                })
                .map(u => {
                  const uId = u._id || u.id;
                  const isAdmin = u.role === 'admin';
                  return (
                    <tr key={uId} className="hover:bg-stone-800/40 transition-all">
                      <td className="p-4 flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-xl bg-stone-800 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-stone-700">
                          {u.name?.charAt(0) || 'U'}
                        </div>
                        <p className="font-bold text-white">{u.name || 'User'}</p>
                      </td>
                      <td className="p-4 text-stone-300 font-mono text-[11px]">{u.email}</td>
                      <td className="p-4 text-stone-400 font-mono">{u.phone || 'N/A'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isAdmin
                            ? 'bg-[#C28E58]/20 text-[#C28E58] border border-[#C28E58]/40'
                            : 'bg-stone-800 text-stone-300 border border-stone-700'
                        }`}>
                          {isAdmin ? 'ADMINISTRATOR' : 'CUSTOMER'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleUserRole(uId, isAdmin ? 'user' : 'admin')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                            isAdmin
                              ? 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                              : 'bg-[#C28E58] hover:bg-[#b07e4a] text-stone-950'
                          }`}
                        >
                          {isAdmin ? 'Make Customer' : 'Promote to Admin'}
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {usersList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-500">
                    No users found matching search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
