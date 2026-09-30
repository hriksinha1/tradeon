import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { ArrowRight, Check, ChevronRight, TrendingUp } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openBuySell, products, wallet } = useTrading();
  const product = products[0];
  const explore = () => { setCurrentView('app-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <section className="overflow-hidden border-b border-border-subtle bg-surface-soft">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
      <div className="max-w-xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-brand">Listed products, clearly presented</p>
        <h1 className="max-w-[12ch] text-balance text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-7xl">Trade with more context.</h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-secondary-foreground sm:text-xl">Discover products, understand the numbers, review the impact, and place orders from one clear workspace.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" variant="primary" onClick={explore} className="flex items-center justify-center gap-2">Get started <ArrowRight className="size-4" /></Button><Button size="lg" variant="outline" onClick={() => setCurrentView('how-it-works')}>See how it works</Button></div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-positive" />Illustrative listings</span><span className="flex items-center gap-2"><Check className="size-4 text-positive" />Visible order review</span><span className="flex items-center gap-2"><Check className="size-4 text-positive" />Clear records</span></div>
      </div>
      <div className="relative mx-auto w-full max-w-2xl">
        <div className="absolute -inset-8 rounded-full bg-brand-subtle blur-3xl" aria-hidden="true" />
        <div className="relative rounded-3xl border border-border bg-white p-5 shadow-[0_24px_70px_rgba(0,48,135,0.12)] sm:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-5"><div><p className="text-sm text-muted-foreground">Selected listing</p><h2 className="mt-1 text-2xl font-bold text-foreground">{product.name}</h2><p className="mt-1 text-sm text-muted-foreground">{product.id} · Indicative value</p></div><div className="text-right"><p className="text-2xl font-bold tabular-nums text-foreground">{formatINR(product.currentValue)}</p><p className="mt-1 flex items-center justify-end gap-1 text-sm font-semibold text-positive"><TrendingUp className="size-4" />+{product.changePercent}% movement</p></div></div>
          <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-surface-soft p-4"><p className="text-sm text-muted-foreground">Available supply</p><p className="mt-2 text-lg font-semibold tabular-nums text-foreground">{product.availableUnits.toLocaleString()} units</p><p className="mt-1 text-xs text-muted-foreground">Illustrative quantity</p></div><div className="rounded-2xl bg-surface-soft p-4"><p className="text-sm text-muted-foreground">Market value</p><p className="mt-2 text-lg font-semibold tabular-nums text-foreground">{formatINR(product.currentValue)}</p><p className="mt-1 text-xs text-muted-foreground">Reference value only</p></div><div className="rounded-2xl bg-surface-soft p-4"><p className="text-sm text-muted-foreground">Wallet balance</p><p className="mt-2 text-lg font-semibold tabular-nums text-foreground">{formatINR(wallet.availableBalance)}</p><p className="mt-1 text-xs text-muted-foreground">Demo account</p></div></div>
          <button onClick={() => openBuySell('buy', product)} className="mt-5 flex w-full items-center justify-between rounded-xl bg-brand px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-brand-hover">Review an order <ChevronRight className="size-4" /></button>
          <p className="mt-4 text-center text-xs text-muted-foreground">Illustrative data · final product terms will be confirmed</p>
        </div>
      </div>
    </div>
  </section>;
};
