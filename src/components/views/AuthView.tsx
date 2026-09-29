import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { ShieldCheck, Mail, Lock, Smartphone, ArrowRight } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { setCurrentView, showToast } = useTrading();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('d.sharma@enterprise.org');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed In', `Welcome back, Devraj Sharma.`, 'success');
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E7E5E4] rounded-[20px] shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#1FC777] text-[#0C0F0C] font-bold flex items-center justify-center font-extrabold text-lg mx-auto mb-2 shadow-xs">
            T
          </div>
          <h2 className="text-[22px] font-bold text-[#171717]">
            {isSignUp ? 'Create Trading Account' : 'Sign in to Tradeon'}
          </h2>
          <p className="text-[13px] text-[#6B6B6B]">
            {isSignUp ? 'Access verified product listings and ledger tools.' : 'Enter your credentials to manage your portfolio.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#78716C] mb-1">Email or Phone</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#E7E5E4] rounded-[10px] text-[14px] focus:outline-[#087A4A]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[12px] font-semibold text-[#78716C]">Password</label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => showToast('Password Link Sent', 'Check your email inbox.', 'info')}
                  className="text-[11px] font-semibold text-[#087A4A] hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#E7E5E4] rounded-[10px] text-[14px] focus:outline-[#087A4A]"
              />
            </div>
          </div>

          <Button fullWidth size="lg" type="submit" className="flex items-center justify-center gap-2">
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#E7E5E4]"></div>
          <span className="flex-shrink mx-3 text-[#78716C] text-[11px] uppercase font-semibold">Or continue with</span>
          <div className="flex-grow border-t border-[#E7E5E4]"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            showToast('Google Authenticated', 'Logged in via OAuth.', 'success');
            setCurrentView('dashboard');
          }}
          className="w-full py-2 px-4 border border-[#E7E5E4] rounded-[10px] text-[13px] font-semibold text-[#171717] hover:bg-[#F5F5F4] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center text-[12px] text-[#6B6B6B]">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-[#087A4A] hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div className="pt-2 text-center text-[11px] text-[#78716C] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
          <span>256-bit SSL encrypted credential verification</span>
        </div>
      </div>
    </div>
  );
};
