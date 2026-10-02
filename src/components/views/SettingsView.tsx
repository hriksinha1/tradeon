import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Sliders, Bell, Globe, Moon, Check, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useTrading();
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [orderConfirmPrompt, setOrderConfirmPrompt] = useState(true);
  const [currency, setCurrency] = useState('INR');

  const handleSave = () => {
    showToast('Preferences Saved', 'Trading terminal settings updated successfully.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-4 select-none">
      {/* Header */}
      <div className="pb-3 border-b border-[#2B3139]">
        <h1 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">Platform Settings</h1>
        <p className="text-[12px] text-[#848E9C]">
          Configure currency formatting, execution confirmation prompts, and display preferences.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] p-5 space-y-3">
        <h3 className="text-[15px] font-bold text-[#F5F5F5] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#F0B90B]" />
          <span>Regional & Currency Formatting</span>
        </h3>

        <div className="divide-y divide-[#1E2329] text-[12px]">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#F5F5F5] block">Base Display Currency</span>
              <span className="text-[#848E9C]">Default formatting for order entries, charts, and ledger balances.</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1.5 border border-[#363C45] rounded-[4px] font-semibold text-[#F5F5F5] bg-[#161A1E] focus:border-[#F0B90B] focus:outline-none cursor-pointer"
            >
              <option value="INR">Indian Rupee (₹ · Lakhs & Crores)</option>
              <option value="USD">US Dollar ($ · International)</option>
            </select>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#F5F5F5] block">Visual Environment</span>
              <span className="text-[#848E9C]">High-density dark trading environment with yellow (#F0B90B) accents.</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1E2329] border border-[#363C45] rounded-[4px] text-[11px] font-bold text-[#F0B90B]">
              <Moon className="w-3.5 h-3.5" />
              <span>Dark Trading Mode (Default)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Engine Preferences */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] p-5 space-y-3">
        <h3 className="text-[15px] font-bold text-[#F5F5F5] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#F0B90B]" />
          <span>Execution & Order Protection</span>
        </h3>

        <div className="divide-y divide-[#1E2329] text-[12px]">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-[13px] text-[#F5F5F5] block">Order Confirmation Dialog</span>
              <span className="text-[#848E9C]">Require a confirmation review step prior to submitting market orders.</span>
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
              <span className="font-bold text-[13px] text-[#F5F5F5] block">Instant Order Execution Alerts</span>
              <span className="text-[#848E9C]">Notify immediately in terminal when a limit or market order fills.</span>
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
        <Button variant="primary" size="sm" onClick={handleSave} className="font-bold">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;
