import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Sliders, Bell, Globe, Sun, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useTrading();
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [currency, setCurrency] = useState('INR');

  const handleSave = () => {
    showToast('Settings Saved', 'Platform preferences updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Platform Settings</h1>
        <p className="text-[14px] text-[#6B6B6B] mt-0.5">
          Configure currency formatting, notification delivery channels, and display options.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-6 shadow-xs space-y-4">
        <h3 className="text-[17px] font-bold text-[#171717] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#005EA8]" />
          <span>Regional & Currency Formatting</span>
        </h3>

        <div className="divide-y divide-[#E7E5E4] text-[13px]">
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[14px] text-[#171717] block">Base Display Currency</span>
              <span className="text-[12px] text-[#6B6B6B]">Default formatting for order entries and wallet balances.</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1.5 border border-[#E7E5E4] rounded-[8px] font-semibold text-[#171717] bg-[#FAFAF9]"
            >
              <option value="INR">Indian Rupee (₹ · Lakhs & Crores)</option>
              <option value="USD">US Dollar ($ · Standard)</option>
            </select>
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[14px] text-[#171717] block">Appearance Mode</span>
              <span className="text-[12px] text-[#6B6B6B]">Optimized for financial clarity and contrast standards.</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FAFF] border border-[#DFF6FF] rounded-[8px] text-[12px] font-bold text-[#005EA8]">
              <Sun className="w-4 h-4" />
              <span>Clean Light Theme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Delivery */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-6 shadow-xs space-y-4">
        <h3 className="text-[17px] font-bold text-[#171717] flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#005EA8]" />
          <span>Notification Preferences</span>
        </h3>

        <div className="divide-y divide-[#E7E5E4] text-[13px]">
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[14px] text-[#171717] block">Instant Order Executions</span>
              <span className="text-[12px] text-[#6B6B6B]">Notify immediately when a limit or market order fills.</span>
            </div>
            <input
              type="checkbox"
              checked={orderNotifs}
              onChange={(e) => setOrderNotifs(e.target.checked)}
              className="w-4 h-4 accent-[#005EA8] cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[14px] text-[#171717] block">Weekly Portfolio Summary</span>
              <span className="text-[12px] text-[#6B6B6B]">Receive a weekly PDF ledger statement by email.</span>
            </div>
            <input
              type="checkbox"
              checked={emailDigest}
              onChange={(e) => setEmailDigest(e.target.checked)}
              className="w-4 h-4 accent-[#005EA8] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};
