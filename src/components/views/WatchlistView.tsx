import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { Star, TrendingUp, TrendingDown, ArrowDownLeft, ArrowUpRight, Compass } from 'lucide-react';

export const WatchlistView: React.FC = () => {
  const { products, watchlist, toggleWatchlist, setCurrentView, setSelectedProductId, openBuySell } = useTrading();

  const watchlistedProducts = products.filter((p) => watchlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Starred Watchlist</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Monitor priority listings, live movements, and quick-trade your starred product contracts.
          </p>
        </div>
        <Button size="sm" onClick={() => setCurrentView('markets')} className="flex items-center gap-1.5">
          <Compass className="w-4 h-4" />
          <span>Browse All Markets</span>
        </Button>
      </div>

      {watchlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistedProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs hover:border-[#ECD6E9] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#6A2E62] uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setCurrentView('product-detail');
                      }}
                      className="text-[18px] font-bold text-[#171717] hover:text-[#6A2E62] text-left block mt-0.5"
                    >
                      {prod.name}
                    </button>
                    <span className="text-[11px] text-[#78716C] font-mono">{prod.id}</span>
                  </div>
                  <button
                    onClick={() => toggleWatchlist(prod.id)}
                    className="p-1.5 text-[#B7791F] hover:bg-[#FFFBEB] rounded-lg transition-colors"
                    title="Remove from Watchlist"
                  >
                    <Star className="w-4 h-4 fill-[#B7791F]" />
                  </button>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-[24px] font-bold text-[#171717] tabular-nums">
                    {formatINR(prod.currentValue)}
                  </span>
                  <span
                    className={`text-[13px] font-bold tabular-nums flex items-center ${
                      prod.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                    }`}
                  >
                    {prod.changePercent >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                    )}
                    {prod.changePercent >= 0 ? '+' : ''}
                    {prod.changePercent}%
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E5E4] flex items-center gap-2">
                <Button
                  size="sm"
                  variant="positive"
                  fullWidth
                  onClick={() => openBuySell('buy', prod)}
                  className="flex items-center justify-center gap-1"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </Button>
                <Button
                  size="sm"
                  variant="negative"
                  fullWidth
                  onClick={() => openBuySell('sell', prod)}
                  className="flex items-center justify-center gap-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Sell</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-[#E7E5E4] rounded-[18px] p-6 space-y-3">
          <Star className="w-10 h-10 text-[#D6D3D1] mx-auto" />
          <h3 className="text-[17px] font-bold text-[#171717]">Your watchlist is empty</h3>
          <p className="text-[13px] text-[#6B6B6B] max-w-sm mx-auto">
            Star items from the Marketplace to quickly monitor price variations and place rapid orders.
          </p>
          <Button size="sm" onClick={() => setCurrentView('markets')}>
            Explore Marketplace
          </Button>
        </div>
      )}
    </div>
  );
};
