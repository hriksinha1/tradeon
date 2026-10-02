import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  User,
  Shield,
  Smartphone,
  Key,
  Laptop,
  CheckCircle2,
  FileCheck2,
  LogOut,
  Mail,
  Phone,
  Lock,
  Globe,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateUserProfile, showToast, setCurrentView } = useTrading();
  const [twoFa, setTwoFa] = useState(user.twoFactorEnabled);

  const toggle2FA = () => {
    const updated = !twoFa;
    setTwoFa(updated);
    updateUserProfile({ twoFactorEnabled: updated });
    showToast(
      updated ? '2FA Enabled' : '2FA Disabled',
      updated ? 'Authenticator app enabled for logins and withdrawals.' : 'Two-factor protection turned off.',
      updated ? 'success' : 'warning'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="pb-3 border-b border-[#EAECEF]">
        <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Account & Security</h1>
        <p className="text-[12px] text-[#707A8A]">
          Identity verification, 2FA protection, device sessions, and trading preferences.
        </p>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAECEF]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[4px] bg-[#FEF6D8] border border-[#FCDD80] text-[#946800] flex items-center justify-center font-bold text-[18px]">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-[#181A20]">{user.name}</h3>
                <Badge status="positive" label="VERIFIED (VIP 1)" dot />
              </div>
              <span className="text-[11px] text-[#707A8A] font-mono mt-0.5 block">
                UID: {user.accountNumber} · Joined {user.joinedDate}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#707A8A] block uppercase font-bold">Tier Level</span>
            <span className="text-[13px] font-bold text-[#946800] block mt-0.5">{user.tier}</span>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
          <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#707A8A]" />
            <div>
              <span className="text-[#707A8A] text-[10px] block uppercase font-semibold">Registered Email</span>
              <span className="font-semibold text-[#181A20]">{user.email}</span>
            </div>
          </div>
          <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#707A8A]" />
            <div>
              <span className="text-[#707A8A] text-[10px] block uppercase font-semibold">Linked Mobile</span>
              <span className="font-semibold text-[#181A20]">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Authentication */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-3 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#181A20]">Security & Verification Features</h3>

        <div className="divide-y divide-[#EAECEF] text-[12px]">
          {/* 2FA */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#B78103]" />
              <div>
                <span className="font-bold text-[13px] text-[#181A20] block">
                  Two-Factor Authentication (2FA)
                </span>
                <span className="text-[#707A8A]">
                  Require a time-based OTP code for logins and withdrawal routing.
                </span>
              </div>
            </div>
            <button
              onClick={toggle2FA}
              className={`px-3 py-1 rounded-[4px] text-[11px] font-bold transition-colors cursor-pointer ${
                twoFa
                  ? 'bg-[#EBFBF3] text-[#02A063] border border-[#02A063]/30 hover:bg-[#D5F5E4]'
                  : 'bg-[#F5F6F8] text-[#707A8A] border border-[#DFE2E6] hover:text-[#181A20]'
              }`}
            >
              {twoFa ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* KYC Status */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck2 className="w-4 h-4 text-[#02A063]" />
              <div>
                <span className="font-bold text-[13px] text-[#181A20] block">
                  Identity Verification (KYC Level 2)
                </span>
                <span className="text-[#707A8A]">
                  Government ID verified. Maximum 24h withdrawal limit: ₹50,00,000.
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#02A063] bg-[#EBFBF3] px-2 py-0.5 rounded border border-[#02A063]/30">
              Verified
            </span>
          </div>

          {/* Active Devices */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="w-4 h-4 text-[#707A8A]" />
              <div>
                <span className="font-bold text-[13px] text-[#181A20] block">
                  Active Sessions & Devices
                </span>
                <span className="text-[#707A8A]">
                  Chrome on macOS · IP: 103.21.24.89 (Current session)
                </span>
              </div>
            </div>
            <Button size="xs" variant="secondary" onClick={() => showToast('Sessions Validated', 'No suspicious devices detected.', 'info')} className="cursor-pointer">
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Preferences & Quick Actions */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-4 flex items-center justify-between shadow-xs">
        <div className="text-[12px]">
          <span className="font-semibold text-[#181A20] block">Terminal Settings & Trading Preferences</span>
          <span className="text-[#707A8A]">Order confirmation prompts, fee deduction via tokens, and visual themes.</span>
        </div>
        <Button size="xs" variant="primary" onClick={() => setCurrentView('settings')} className="font-bold cursor-pointer">
          Open Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
