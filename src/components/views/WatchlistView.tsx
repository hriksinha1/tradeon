import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { PercentageChange } from '../common/PercentageChange';
import { Star, TrendingUp, TrendingDown, ArrowDownLeft, ArrowUpRight, Compass } from 'lucide-react';

export const WatchlistView: React.FC = () => {
  const { products, watchlist, toggleWatchlist, setCurrentView, setSelectedProductId, openBuySell } = useTrading();

  const watchlistedProducts = products.filter((p) => watchlist.includes(p.id));

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EAECEF]">
        <div>
          <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Favorite Watchlist</h1>
          <p className="text-[12px] text-[#707A8A]">
            Priority contracts, real-time bid movements, and quick-trade routing.
          </p>
        </div>
        <Button
          size="xs"
          variant="secondary"
          onClick={() => setCurrentView('app-markets')}
          className="flex items-center gap-1.5 h-8 font-semibold cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#B78103]" />
          <span>Browse All Markets</span>
        </Button>
      </div>

      {watchlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {watchlistedProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-4 bg-white border border-[#DFE2E6] hover:border-[#CFD3D8] rounded-[6px] transition-all flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#946800] uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setCurrentView('app-product-detail');
                      }}
                      className="text-[16px] font-bold text-[#181A20] hover:text-[#946800] text-left block mt-0.5 cursor-pointer"
                    >
                      {prod.name}
                    </button>
                    <span className="text-[11px] text-[#707A8A] font-mono">{prod.id}</span>
                  </div>
                  <button
                    onClick={() => toggleWatchlist(prod.id)}
                    className="p-1.5 text-[#F0B90B] hover:bg-[#F5F6F8] rounded transition-colors cursor-pointer"
                    title="Remove from Watchlist"
                  >
                    <Star className="w-4 h-4 fill-[#F0B90B]" />
                  </button>
                </div>

                <div className="mt-3 flex items-baseline justify-between tabular-nums font-mono">
                  <span className="text-[20px] font-bold text-[#181A20]">
                    {formatINR(prod.currentValue)}
                  </span>
                  <PercentageChange value={prod.changePercent} pill />
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAECEF] grid grid-cols-2 gap-2">
                <Button
                  size="xs"
                  variant="buy"
                  fullWidth
                  onClick={() => openBuySell('buy', prod)}
                  className="flex items-center justify-center gap-1 font-bold h-8 cursor-pointer"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </Button>
                <Button
                  size="xs"
                  variant="sell"
                  fullWidth
                  onClick={() => openBuySell('sell', prod)}
                  className="flex items-center justify-center gap-1 font-bold h-8 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Sell</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-[#DFE2E6] rounded-[6px] text-[#707A8A] space-y-3 shadow-xs">
          <p className="text-[14px]">Your watchlist is currently empty.</p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setCurrentView('app-markets')}
            className="font-bold cursor-pointer"
          >
            Star Markets from Catalog
          </Button>
        </div>
      )}
    </div>
  );
};

export default WatchlistView;
