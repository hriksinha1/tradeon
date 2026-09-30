import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Search, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';
import { formatINR, formatUnits } from '../../constants/designTokens';
import { Product } from '../../types';

const tabs = ['all', 'popular', 'trending', 'new'] as const;

type Tab = (typeof tabs)[number];

export const MarketsView: React.FC = () => {
  const { products, watchlist, toggleWatchlist, setCurrentView, setSelectedProductId } = useTrading();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'value' | 'change' | 'volume'>('value');

  const visibleProducts = useMemo(() => products.filter((product) => {
    const text = `${product.name} ${product.id} ${product.category}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesTab = tab === 'all' || (tab === 'popular' && product.volume24h > 1500000) || (tab === 'trending' && Math.abs(product.changePercent) >= 1) || (tab === 'new' && ['PRISM-11', 'ZENITH-05'].includes(product.id));
    return matchesQuery && matchesCategory && matchesTab;
  }).sort((a, b) => sort === 'change' ? b.changePercent - a.changePercent : sort === 'volume' ? b.volume24h - a.volume24h : b.currentValue - a.currentValue), [products, query, tab, category, sort]);

  const openProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-8 lg:py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">Explore the market</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Products worth knowing</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Compare verified products, understand movement, then open one product page to decide what to do.</p>
        </div>
        <span className="w-fit rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-secondary-foreground">{products.length} active listings</span>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm" aria-label="Market filters">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-md">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or codes" className="h-10 w-full rounded-xl border border-border bg-surface-soft pl-10 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15" />
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowUpDown className="size-4" />
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="h-10 rounded-xl border border-border bg-surface px-3 font-semibold text-foreground outline-none focus:border-brand">
              <option value="value">Current value</option><option value="change">Biggest movement</option><option value="volume">Most traded</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 border-t border-divider pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-soft p-1">
            {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-9 rounded-lg px-3 text-xs font-semibold capitalize transition ${tab === item ? 'bg-surface text-brand shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{item}</button>)}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'Category A', 'Category B', 'Category C'].map((item) => <button key={item} onClick={() => setCategory(item)} className={`min-h-9 whitespace-nowrap rounded-lg border px-3 text-xs font-semibold ${category === item ? 'border-brand bg-brand-subtle text-brand-hover' : 'border-border text-muted-foreground hover:border-brand'}`}>{item === 'all' ? 'All categories' : item}</button>)}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:hidden" aria-label="Market products">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} isWatched={watchlist.includes(product.id)} onOpen={() => openProduct(product)} onWatch={() => toggleWatchlist(product.id)} />)}
      </section>

      <section className="hidden overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm md:block" aria-label="Market products table">
        <div className="grid grid-cols-[1.6fr_.8fr_1fr_1fr_1fr_auto] gap-4 border-b border-divider bg-surface-soft px-5 py-3 text-xs font-bold text-muted-foreground"><span>Product</span><span>Category</span><span>Current value</span><span>24h movement</span><span>Supply</span><span>Action</span></div>
        {visibleProducts.map((product) => <button key={product.id} onClick={() => openProduct(product)} className="grid w-full grid-cols-[1.6fr_.8fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-divider px-5 py-4 text-left transition last:border-0 hover:bg-brand-subtle/40"><ProductName product={product} isWatched={watchlist.includes(product.id)} onWatch={(event) => { event.stopPropagation(); toggleWatchlist(product.id); }} /><span className="text-sm text-secondary-foreground">{product.category}</span><span className="tabular-nums text-sm font-bold">{formatINR(product.currentValue)}</span><Movement product={product} /><span className="text-sm text-secondary-foreground">{formatUnits(product.availableUnits)}</span><span className="rounded-lg border border-brand/30 px-3 py-2 text-xs font-bold text-brand">View details</span></button>)}
      </section>
      {visibleProducts.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">No products match those filters.</div>}
    </div>
  );
};

const ProductName = ({ product, isWatched, onWatch }: { product: Product; isWatched: boolean; onWatch: (event: React.MouseEvent) => void }) => <div className="flex min-w-0 items-center gap-3"><span onClick={onWatch} role="button" aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'} className="rounded-md p-1 text-amber-600"><Star className="size-4" fill={isWatched ? 'currentColor' : 'none'} /></span><span className="min-w-0"><span className="block truncate font-bold text-foreground">{product.name}</span><span className="block text-xs text-muted-foreground">{product.id}</span></span></div>;

const Movement = ({ product }: { product: Product }) => <div className={`flex items-center gap-1 text-sm font-bold tabular-nums ${product.changePercent >= 0 ? 'text-positive' : 'text-negative'}`}>{product.changePercent >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}{product.changePercent >= 0 ? '+' : ''}{product.changePercent}%</div>;

const ProductCard = ({ product, isWatched, onOpen, onWatch }: { product: Product; isWatched: boolean; onOpen: () => void; onWatch: () => void }) => <article className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><button onClick={onOpen} className="min-w-0 text-left"><span className="block truncate font-bold">{product.name}</span><span className="text-xs text-muted-foreground">{product.id} · {product.category}</span></button><button onClick={onWatch} aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'} className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-amber-600"><Star className="size-4" fill={isWatched ? 'currentColor' : 'none'} /></button></div><div className="mt-5 flex items-end justify-between"><div><span className="block text-xs text-muted-foreground">Current value</span><span className="tabular-nums text-xl font-bold">{formatINR(product.currentValue)}</span></div><Movement product={product} /></div><div className="mt-4 flex items-center justify-between border-t border-divider pt-3 text-xs text-muted-foreground"><span>{formatUnits(product.availableUnits)} available</span><button onClick={onOpen} className="min-h-11 rounded-xl bg-brand px-4 font-bold text-white">Review product</button></div></article>;

export default MarketsView;
