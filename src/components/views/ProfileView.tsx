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
      updated ? 'Authenticator app enabled for logins.' : 'Two-factor protection turned off.',
      updated ? 'success' : 'warning'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Account & Security</h1>
        <p className="text-[14px] text-[#6B6B6B] mt-0.5">
          Manage your personal credentials, multi-factor authentication, and verified identity documents.
        </p>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F0FAFF] border border-[#DFF6FF] text-[#005EA8] flex items-center justify-center font-bold text-[22px]">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[20px] font-bold text-[#171717]">{user.name}</h3>
                <Badge status="positive" label="KYC VERIFIED" />
              </div>
              <span className="text-[12px] text-[#78716C] font-mono mt-0.5 block">
                Account ID: {user.accountNumber} · Joined {user.joinedDate}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[12px] text-[#78716C] block uppercase font-bold">Trading Level</span>
            <span className="text-[14px] font-bold text-[#005EA8] block mt-0.5">{user.tier}</span>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 text-[13px]">
          <div className="p-3 bg-[#FAFAF9] rounded-[12px] flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#78716C]" />
            <div>
              <span className="text-[#78716C] text-[11px] block uppercase font-semibold">Email Address</span>
              <span className="font-semibold text-[#171717]">{user.email}</span>
            </div>
          </div>
          <div className="p-3 bg-[#FAFAF9] rounded-[12px] flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#78716C]" />
            <div>
              <span className="text-[#78716C] text-[11px] block uppercase font-semibold">Registered Phone</span>
              <span className="font-semibold text-[#171717]">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Authentication */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-6 shadow-xs space-y-4">
        <h3 className="text-[17px] font-bold text-[#171717]">Security & Verification</h3>

        <div className="divide-y divide-[#E7E5E4] text-[13px]">
          {/* 2FA */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#005EA8]" />
              <div>
                <span className="font-bold text-[14px] text-[#171717] block">
                  Two-Factor Authentication (2FA)
                </span>
                <span className="text-[12px] text-[#6B6B6B]">
                  Require a TOTP verification code for login and major transfers.
                </span>
              </div>
            </div>
            <button
              onClick={toggle2FA}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                twoFa ? 'bg-[#0070BA]' : 'bg-[#D6D3D1]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white block transition-transform shadow-xs ${
                  twoFa ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Password */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-[#78716C]" />
              <div>
                <span className="font-bold text-[14px] text-[#171717] block">Account Password</span>
                <span className="text-[12px] text-[#6B6B6B]">Last updated 45 days ago</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => showToast('Password Link Sent', 'Password reset instructions sent to your email.', 'info')}
            >
              Change
            </Button>
          </div>

          {/* KYC Document */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck2 className="w-5 h-5 text-[#16803C]" />
              <div>
                <span className="font-bold text-[14px] text-[#171717] block">Identity Documents (KYC)</span>
                <span className="text-[12px] text-[#6B6B6B]">Government Aadhaar & PAN verified</span>
              </div>
            </div>
            <Badge status="positive" label="VERIFIED" />
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-6 shadow-xs space-y-4">
        <h3 className="text-[17px] font-bold text-[#171717]">Active Sessions</h3>
        <div className="space-y-3">
          <div className="p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-[#005EA8]" />
              <div>
                <span className="font-bold text-[#171717] block">Chrome on macOS · Current Session</span>
                <span className="text-[11px] text-[#78716C]">Bengaluru, India · IP 103.21.201.8</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] px-2 py-0.5 rounded">
              Online
            </span>
          </div>

          <div className="p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-[#78716C]" />
              <div>
                <span className="font-bold text-[#171717] block">Tradeon Mobile App · iOS 18</span>
                <span className="text-[11px] text-[#78716C]">Active yesterday at 08:42 PM</span>
              </div>
            </div>
            <button
              onClick={() => showToast('Session Revoked', 'Mobile session logged out successfully.', 'info')}
              className="text-[12px] text-[#C62828] font-semibold hover:underline"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-2 flex justify-start">
        <Button
          variant="outline"
          onClick={() => {
            showToast('Logged Out', 'Mock session reset. Redirecting to landing.', 'info');
            setCurrentView('landing');
          }}
          className="flex items-center gap-2 text-[#C62828] border-[#FECDCA] hover:bg-[#FEF2F2]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Platform</span>
        </Button>
      </div>
    </div>
  );
};
