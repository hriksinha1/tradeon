import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Sliders, Bell, Globe, Sun, Check, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useTrading();
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [orderConfirmPrompt, setOrderConfirmPrompt] = useState(true);
  const [currency, setCurrency] = useState('INR');

  const handleSave = () => {
    showToast('Preferences Saved', 'Trading terminal settings updated successfully.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="pb-3 border-b border-[#EAECEF]">
        <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Platform Settings</h1>
        <p className="text-[12px] text-[#707A8A]">
          Configure currency formatting, execution confirmation prompts, and display preferences.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-3 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#181A20] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#B78103]" />
          <span>Regional & Currency Formatting</span>
        </h3>

        <div className="divide-y divide-[#EAECEF] text-[12px]">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#181A20] block">Base Display Currency</span>
              <span className="text-[#707A8A]">Default formatting for order entries, charts, and ledger balances.</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1.5 border border-[#DFE2E6] rounded-[4px] font-semibold text-[#181A20] bg-[#F5F6F8] focus:border-[#F0B90B] focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="INR">Indian Rupee (₹ · Lakhs & Crores)</option>
              <option value="USD">US Dollar ($ · International)</option>
            </select>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#181A20] block">Visual Environment</span>
              <span className="text-[#707A8A]">High-density white trading environment with yellow (#F0B90B) accents.</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FEF6D8] border border-[#FCDD80] rounded-[4px] text-[11px] font-bold text-[#946800]">
              <Sun className="w-3.5 h-3.5" />
              <span>White Theme (Active)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Engine Preferences */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-3 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#181A20] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#B78103]" />
          <span>Execution & Order Protection</span>
        </h3>

        <div className="divide-y divide-[#EAECEF] text-[12px]">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#181A20] block">Order Confirmation Dialog</span>
              <span className="text-[#707A8A]">Require a confirmation review step prior to submitting market orders.</span>
            </div>
            <input
              type="checkbox"
              checked={orderConfirmPrompt}
              onChange={(e) => setOrderConfirmPrompt(e.target.checked)}
              className="w-4 h-4 accent-[#F0B90B] cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#181A20] block">Instant Order Execution Alerts</span>
              <span className="text-[#707A8A]">Notify immediately in terminal when a limit or market order fills.</span>
            </div>
            <input
              type="checkbox"
              checked={orderNotifs}
              onChange={(e) => setOrderNotifs(e.target.checked)}
              className="w-4 h-4 accent-[#F0B90B] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="primary" size="sm" onClick={handleSave} className="font-bold cursor-pointer">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;
