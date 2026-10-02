import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR, formatVolume, formatPercent } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { PercentageChange } from '../common/PercentageChange';
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  Layers,
  Info,
  Maximize2,
  ChevronDown,
  BarChart2,
  Sliders,
  Wallet,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Product } from '../../types';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    positions,
    orders,
    watchlist,
    toggleWatchlist,
    setCurrentView,
    openBuySell,
    wallet,
    executeOrder,
  } = useTrading();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isWatchlisted = watchlist.includes(product.id);

  // Terminal Controls
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [timeframe, setTimeframe] = useState<'15m' | '1h' | '4h' | '1D' | '1W'>('1D');
  const [activeTab, setActiveTab] = useState<'orderbook' | 'trades'>('orderbook');
  const [bottomTab, setBottomTab] = useState<'open' | 'history' | 'positions'>('open');

  // Order Entry State
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [orderPrice, setOrderPrice] = useState<number>(product.currentValue);
  const [orderQty, setOrderQty] = useState<number>(10);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  // Position in this product
  const holding = positions.find((p) => p.productId === product.id);
  const holdingQty = holding ? holding.quantity : 0;

  // Orders for this product
  const productOrders = orders.filter((o) => o.productId === product.id);
  const openOrders = productOrders.filter((o) => o.status === 'open' || o.status === 'pending');

  // Synthesize realistic candlestick data for the selected product and timeframe
  const candles = useMemo(() => {
    const base = product.currentValue;
    const history = product.history['1D'] || [base * 0.98, base * 1.02];
    const count = 24;
    const result = [];
    let currentOpen = history[0] || base * 0.96;

    for (let i = 0; i < count; i++) {
      const volatility = (base * 0.015);
      const direction = (Math.sin(i * 0.8) + (i / count) * (product.changePercent > 0 ? 1 : -1)) * volatility;
      const close = Math.round(currentOpen + direction + (Math.random() - 0.48) * volatility);
      const high = Math.round(Math.max(currentOpen, close) + Math.random() * volatility * 0.8);
      const low = Math.round(Math.min(currentOpen, close) - Math.random() * volatility * 0.8);
      const volume = Math.round(50000 + Math.random() * 80000);

      result.push({
        idx: i,
        time: `${i < 10 ? '0' : ''}${i}:00`,
        open: currentOpen,
        high,
        low,
        close,
        volume,
        isBullish: close >= currentOpen,
      });

      currentOpen = close;
    }
    // Ensure last candle closes near current value
    result[result.length - 1].close = product.currentValue;
    return result;
  }, [product, timeframe]);

  // Order Book Synthesis (8 Bids & 8 Asks around current price)
  const orderBook = useMemo(() => {
    const mid = product.currentValue;
    const spread = Math.max(1, Math.round(mid * 0.0015));
    const asks = [];
    const bids = [];

    let askTotal = 0;
    for (let i = 8; i >= 1; i--) {
      const price = mid + spread * i;
      const size = Math.round(15 + Math.random() * 45);
      askTotal += size;
      asks.push({ price, size, total: askTotal });
    }

    let bidTotal = 0;
    for (let i = 1; i <= 8; i++) {
      const price = mid - spread * i;
      const size = Math.round(20 + Math.random() * 55);
      bidTotal += size;
      bids.push({ price, size, total: bidTotal });
    }

    return { asks, bids, spread };
  }, [product.currentValue]);

  // Calculations for Order Entry
  const effectivePrice = orderType === 'market' ? product.currentValue : orderPrice;
  const notional = effectivePrice * orderQty;
  const estFee = notional * 0.001; // 0.10% maker/taker fee
  const totalCost = orderSide === 'buy' ? notional + estFee : notional - estFee;
  const canSubmit = orderSide === 'buy' ? wallet.availableBalance >= totalCost : holdingQty >= orderQty;

  const setPercentQuantity = (pct: number) => {
    if (orderSide === 'buy') {
      const maxAffordable = Math.floor(wallet.availableBalance / (effectivePrice * 1.001));
      setOrderQty(Math.max(1, Math.floor(maxAffordable * pct)));
    } else {
      setOrderQty(Math.max(1, Math.floor(holdingQty * pct)));
    }
  };

  const handlePlaceOrder = () => {
    if (!canSubmit || orderQty <= 0) return;
    executeOrder({
      productId: product.id,
      productName: product.name,
      type: orderType,
      side: orderSide,
      price: effectivePrice,
      quantity: orderQty,
      status: 'executed',
    });
  };

  // SVG Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 280;
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVol = Math.max(...candles.map((c) => c.volume)) || 1;

  const getY = (price: number) => {
    return chartHeight - 50 - ((price - minPrice) / priceRange) * (chartHeight - 80);
  };

  const activeCandle = hoveredCandle !== null ? candles[hoveredCandle] : candles[candles.length - 1];

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-4 space-y-3 select-none bg-white text-[#181A20]">
      {/* 1. Header Ticker & Statistics Strip */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        {/* Left: Product Selector & Current Price */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('app-markets')}
            className="p-1.5 hover:bg-[#F5F6F8] rounded text-[#707A8A] hover:text-[#181A20] transition-colors cursor-pointer"
            title="Back to Markets"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Product Selector Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-2 text-left cursor-pointer">
                <div>
                  <span className="font-bold text-[18px] text-[#181A20] hover:text-[#946800] block leading-none">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-[#707A8A] font-mono">{product.id} · {product.category}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#707A8A]" />
              </button>
              <div className="invisible group-hover:visible absolute top-full left-0 mt-1 w-64 bg-white border border-[#DFE2E6] rounded-[6px] shadow-2xl z-50 p-1 opacity-0 group-hover:opacity-100 transition-all">
                <div className="text-[11px] text-[#707A8A] font-semibold px-2 py-1 uppercase">Switch Contract</div>
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setOrderPrice(p.currentValue);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-[4px] text-[13px] hover:bg-[#F5F6F8] cursor-pointer ${
                      p.id === product.id ? 'bg-[#FEF6D8] text-[#946800] font-bold' : 'text-[#181A20]'
                    }`}
                  >
                    <span>{p.name} ({p.id})</span>
                    <span className="tabular-nums font-semibold font-mono">{formatINR(p.currentValue)}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => toggleWatchlist(product.id)}
              className="p-1.5 text-[#707A8A] hover:text-[#F0B90B] transition-colors cursor-pointer"
            >
              <Star
                className="w-4 h-4"
                fill={isWatchlisted ? '#F0B90B' : 'none'}
                color={isWatchlisted ? '#F0B90B' : 'currentColor'}
              />
            </button>
          </div>

          {/* Current Live Price */}
          <div className="flex items-baseline gap-2.5 border-l border-[#EAECEF] pl-4">
            <span className="text-[22px] font-bold tracking-tight text-[#02A063] tabular-nums font-mono">
              {formatINR(product.currentValue)}
            </span>
            <PercentageChange value={product.changePercent} />
          </div>
        </div>

        {/* Right: 24h Stats Strip (High, Low, Volume) */}
        <div className="flex items-center gap-6 text-[12px] tabular-nums">
          <div>
            <span className="text-[#707A8A] block text-[11px]">24h High</span>
            <span className="font-semibold text-[#181A20] font-mono">{formatINR(product.high24h)}</span>
          </div>
          <div>
            <span className="text-[#707A8A] block text-[11px]">24h Low</span>
            <span className="font-semibold text-[#181A20] font-mono">{formatINR(product.low24h)}</span>
          </div>
          <div>
            <span className="text-[#707A8A] block text-[11px]">24h Volume (INR)</span>
            <span className="font-semibold text-[#181A20] font-mono">{formatVolume(product.volume24h)}</span>
          </div>
          <div>
            <span className="text-[#707A8A] block text-[11px]">24h Supply</span>
            <span className="font-semibold text-[#181A20]">{product.availableUnits} units</span>
          </div>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* LEFT COLUMN: Chart + Indicators (7 cols) */}
        <div className="lg:col-span-6 xl:col-span-7 bg-white border border-[#DFE2E6] rounded-[6px] p-3 flex flex-col justify-between space-y-3 shadow-xs">
          {/* Chart Header Bar: Timeframes & Type */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#EAECEF]">
            <div className="flex items-center gap-1 text-[12px]">
              <span className="text-[#707A8A] text-[11px] font-bold mr-1">Time</span>
              {(['15m', '1h', '4h', '1D', '1W'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 rounded-[3px] font-semibold transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#F5F6F8] text-[#181A20] border border-[#DFE2E6] font-bold'
                      : 'text-[#707A8A] hover:text-[#181A20]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Type Switcher */}
              <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded border border-[#DFE2E6]">
                <button
                  onClick={() => setChartType('candle')}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                    chartType === 'candle' ? 'bg-white text-[#181A20] font-bold shadow-xs' : 'text-[#707A8A]'
                  }`}
                >
                  Candles
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                    chartType === 'line' ? 'bg-white text-[#181A20] font-bold shadow-xs' : 'text-[#707A8A]'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
          </div>

          {/* Interactive OHLC Readout */}
          <div className="flex items-center gap-4 text-[11px] text-[#707A8A] tabular-nums font-mono py-1">
            <span>Time: <strong className="text-[#181A20]">{activeCandle.time}</strong></span>
            <span>O: <strong className="text-[#181A20]">{activeCandle.open}</strong></span>
            <span>H: <strong className="text-[#02A063]">{activeCandle.high}</strong></span>
            <span>L: <strong className="text-[#CF304A]">{activeCandle.low}</strong></span>
            <span>C: <strong className={activeCandle.isBullish ? 'text-[#02A063]' : 'text-[#CF304A]'}>{activeCandle.close}</strong></span>
            <span>Vol: <strong className="text-[#B78103]">{formatVolume(activeCandle.volume)}</strong></span>
          </div>

          {/* SVG Canvas Area: Candlestick & Volume Subgraph */}
          <div className="w-full h-72 relative bg-[#FAFAFA] rounded-[4px] border border-[#EAECEF] p-2 overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full preserve-3d"
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Background Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={chartHeight * ratio}
                  x2={chartWidth}
                  y2={chartHeight * ratio}
                  stroke="#EAECEF"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Volume Bars at Bottom (0 - 45px height) */}
              {candles.map((c, i) => {
                const x = (i / (candles.length - 1)) * (chartWidth - 40) + 15;
                const barH = (c.volume / maxVol) * 45;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x - 4}
                    y={chartHeight - barH}
                    width={8}
                    height={barH}
                    fill={c.isBullish ? '#02A063' : '#CF304A'}
                    opacity={0.3}
                  />
                );
              })}

              {/* Chart Mode: Candlestick vs Line */}
              {chartType === 'candle' ? (
                candles.map((c, i) => {
                  const x = (i / (candles.length - 1)) * (chartWidth - 40) + 15;
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);
                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const candleTop = Math.min(yOpen, yClose);
                  const candleHeight = Math.max(2, Math.abs(yClose - yOpen));
                  const color = c.isBullish ? '#02A063' : '#CF304A';

                  return (
                    <g
                      key={`candle-${i}`}
                      onMouseEnter={() => setHoveredCandle(i)}
                      className="cursor-crosshair"
                    >
                      {/* Wick Line */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Body Rect */}
                      <rect
                        x={x - 6}
                        y={candleTop}
                        width={12}
                        height={candleHeight}
                        fill={color}
                        rx={1}
                      />
                    </g>
                  );
                })
              ) : (
                /* Line / Area Mode */
                <g>
                  <path
                    d={
                      candles
                        .map((c, i) => {
                          const x = (i / (candles.length - 1)) * (chartWidth - 40) + 15;
                          const y = getY(c.close);
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ')
                    }
                    fill="none"
                    stroke="#B78103"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Crosshair indicator if active */}
              {hoveredCandle !== null && (
                <g>
                  <line
                    x1={(hoveredCandle / (candles.length - 1)) * (chartWidth - 40) + 15}
                    y1={0}
                    x2={(hoveredCandle / (candles.length - 1)) * (chartWidth - 40) + 15}
                    y2={chartHeight}
                    stroke="#181A20"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#707A8A]">
            <span>Tradeon Matching Depth</span>
            <span className="text-[#02A063] font-semibold">● Connected (0.8ms latency)</span>
          </div>
        </div>

        {/* CENTER COLUMN: Order Book & Trades (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#DFE2E6] rounded-[6px] p-3 space-y-2 shadow-xs">
          {/* Order Book vs Recent Trades Tabs */}
          <div className="flex items-center gap-1 pb-2 border-b border-[#EAECEF]">
            <button
              onClick={() => setActiveTab('orderbook')}
              className={`flex-1 py-1 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeTab === 'orderbook' ? 'bg-[#F5F6F8] text-[#181A20] font-bold border border-[#DFE2E6]' : 'text-[#707A8A]'
              }`}
            >
              Order Book
            </button>
            <button
              onClick={() => setActiveTab('trades')}
              className={`flex-1 py-1 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeTab === 'trades' ? 'bg-[#F5F6F8] text-[#181A20] font-bold border border-[#DFE2E6]' : 'text-[#707A8A]'
              }`}
            >
              Market Trades
            </button>
          </div>

          {activeTab === 'orderbook' ? (
            <div className="text-[12px] tabular-nums font-mono space-y-1">
              <div className="flex justify-between text-[10px] text-[#707A8A] uppercase font-sans font-bold">
                <span>Price (INR)</span>
                <span>Size</span>
                <span>Total</span>
              </div>

              {/* Asks (Sell Orders) in RED */}
              <div className="space-y-0.5">
                {orderBook.asks.map((a, idx) => {
                  const depthPercent = Math.min(100, (a.total / 600) * 100);
                  return (
                    <div
                      key={`ask-${idx}`}
                      onClick={() => setOrderPrice(a.price)}
                      className="relative flex justify-between py-0.5 px-1 hover:bg-[#FDF0F2] cursor-pointer"
                    >
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-[#CF304A]/10 pointer-events-none"
                        style={{ width: `${depthPercent}%` }}
                      />
                      <span className="text-[#CF304A] font-semibold">{a.price}</span>
                      <span className="text-[#474D57]">{a.size}</span>
                      <span className="text-[#707A8A]">{a.total}</span>
                    </div>
                  );
                })}
              </div>

              {/* Center Spread Ticker */}
              <div className="py-2 my-1 px-2 bg-[#F5F6F8] border-y border-[#DFE2E6] flex items-center justify-between font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold text-[#02A063] font-mono">{formatINR(product.currentValue)}</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#02A063]" />
                </div>
                <span className="text-[11px] text-[#707A8A]">Spread: ₹{orderBook.spread}</span>
              </div>

              {/* Bids (Buy Orders) in GREEN */}
              <div className="space-y-0.5">
                {orderBook.bids.map((b, idx) => {
                  const depthPercent = Math.min(100, (b.total / 600) * 100);
                  return (
                    <div
                      key={`bid-${idx}`}
                      onClick={() => setOrderPrice(b.price)}
                      className="relative flex justify-between py-0.5 px-1 hover:bg-[#EBFBF3] cursor-pointer"
                    >
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-[#02A063]/10 pointer-events-none"
                        style={{ width: `${depthPercent}%` }}
                      />
                      <span className="text-[#02A063] font-semibold">{b.price}</span>
                      <span className="text-[#474D57]">{b.size}</span>
                      <span className="text-[#707A8A]">{b.total}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Recent Market Trades */
            <div className="text-[12px] font-mono tabular-nums space-y-1">
              <div className="flex justify-between text-[10px] text-[#707A8A] uppercase font-sans font-bold">
                <span>Price (INR)</span>
                <span>Size</span>
                <span>Time</span>
              </div>
              {[
                { p: product.currentValue, s: 24, t: '14:28:12', up: true },
                { p: product.currentValue, s: 80, t: '14:28:09', up: true },
                { p: product.currentValue - 2, s: 15, t: '14:27:54', up: false },
                { p: product.currentValue - 1, s: 42, t: '14:27:42', up: true },
                { p: product.currentValue - 4, s: 60, t: '14:27:21', up: false },
                { p: product.currentValue - 3, s: 120, t: '14:26:50', up: true },
                { p: product.currentValue, s: 10, t: '14:26:15', up: true },
              ].map((trade, i) => (
                <div key={i} className="flex justify-between py-1 px-1 hover:bg-[#F5F6F8]">
                  <span className={trade.up ? 'text-[#02A063]' : 'text-[#CF304A]'}>{trade.p}</span>
                  <span className="text-[#181A20]">{trade.s}</span>
                  <span className="text-[#707A8A] font-sans text-[11px]">{trade.t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Professional Order Entry Form (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-2 bg-white border border-[#DFE2E6] rounded-[6px] p-3 space-y-3 shadow-xs">
          {/* BUY / SELL Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6]">
            <button
              onClick={() => setOrderSide('buy')}
              className={`py-1.5 text-[12px] font-bold rounded-[3px] transition-colors cursor-pointer ${
                orderSide === 'buy' ? 'bg-[#02A063] text-white shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`py-1.5 text-[12px] font-bold rounded-[3px] transition-colors cursor-pointer ${
                orderSide === 'sell' ? 'bg-[#CF304A] text-white shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Limit vs Market */}
          <div className="flex items-center gap-1 text-[11px]">
            {(['limit', 'market'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`flex-1 py-1 font-semibold uppercase rounded-[3px] transition-colors cursor-pointer ${
                  orderType === t ? 'bg-[#F5F6F8] text-[#181A20] border border-[#DFE2E6] font-bold' : 'text-[#707A8A]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Available Balance */}
          <div className="flex items-center justify-between text-[11px] text-[#707A8A]">
            <span className="flex items-center gap-1">
              <Wallet className="w-3 h-3 text-[#B78103]" />
              {orderSide === 'buy' ? 'Avail Balance' : 'Holding Quantity'}
            </span>
            <span className="font-semibold text-[#181A20] tabular-nums font-mono">
              {orderSide === 'buy' ? formatINR(wallet.availableBalance) : `${holdingQty} units`}
            </span>
          </div>

          {/* Order Price */}
          <div>
            <label className="text-[11px] text-[#707A8A] block mb-1">Price (INR)</label>
            <input
              type="number"
              disabled={orderType === 'market'}
              value={orderType === 'market' ? product.currentValue : orderPrice}
              onChange={(e) => setOrderPrice(Number(e.target.value))}
              className="w-full h-8 px-2.5 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] font-semibold text-[13px] tabular-nums font-mono focus:border-[#F0B90B] focus:bg-white focus:outline-none disabled:opacity-60"
            />
          </div>

          {/* Order Quantity */}
          <div>
            <label className="text-[11px] text-[#707A8A] block mb-1">Amount (Units)</label>
            <input
              type="number"
              min="1"
              value={orderQty}
              onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full h-8 px-2.5 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] font-semibold text-[13px] tabular-nums font-mono focus:border-[#F0B90B] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Percentage Presets */}
          <div className="grid grid-cols-4 gap-1">
            {[0.25, 0.5, 0.75, 1.0].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setPercentQuantity(pct)}
                className="py-1 text-[10px] font-semibold rounded-[3px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#707A8A] hover:text-[#181A20] hover:border-[#CFD3D8] cursor-pointer"
              >
                {pct * 100}%
              </button>
            ))}
          </div>

          {/* Order Notional Details */}
          <div className="p-2 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6] text-[11px] space-y-1">
            <div className="flex justify-between text-[#707A8A]">
              <span>Order Value:</span>
              <span className="font-semibold text-[#181A20] tabular-nums font-mono">{formatINR(notional)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Trading Fee (0.10%):</span>
              <span className="font-semibold text-[#707A8A] tabular-nums font-mono">{formatINR(estFee, { decimals: 2 })}</span>
            </div>
            <div className="pt-1 border-t border-[#DFE2E6] flex justify-between font-bold">
              <span className="text-[#181A20]">{orderSide === 'buy' ? 'Total Required' : 'Net Proceeds'}</span>
              <span className="text-[#946800] tabular-nums font-mono">{formatINR(totalCost)}</span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <Button
            variant={orderSide === 'buy' ? 'buy' : 'sell'}
            fullWidth
            size="sm"
            disabled={!canSubmit || orderQty <= 0}
            onClick={handlePlaceOrder}
            className="font-bold text-[13px] h-9 cursor-pointer"
          >
            {orderSide === 'buy' ? `Buy ${product.id}` : `Sell ${product.id}`}
          </Button>

          {!canSubmit && (
            <p className="text-[11px] text-[#CF304A] text-center">
              {orderSide === 'buy' ? 'Insufficient trading balance' : 'Insufficient holding units'}
            </p>
          )}
        </div>
      </div>

      {/* 3. Bottom Tabs: Open Orders, Order History, Position Details */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-4 space-y-3 shadow-xs">
        <div className="flex items-center gap-4 pb-2 border-b border-[#EAECEF] text-[13px]">
          <button
            onClick={() => setBottomTab('open')}
            className={`font-semibold pb-1 cursor-pointer transition-colors ${
              bottomTab === 'open' ? 'text-[#181A20] border-b-2 border-[#F0B90B] font-bold' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Open Orders ({openOrders.length})
          </button>
          <button
            onClick={() => setBottomTab('history')}
            className={`font-semibold pb-1 cursor-pointer transition-colors ${
              bottomTab === 'history' ? 'text-[#181A20] border-b-2 border-[#F0B90B] font-bold' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Order History ({productOrders.length})
          </button>
          <button
            onClick={() => setBottomTab('positions')}
            className={`font-semibold pb-1 cursor-pointer transition-colors ${
              bottomTab === 'positions' ? 'text-[#181A20] border-b-2 border-[#F0B90B] font-bold' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Current Position
          </button>
        </div>

        {bottomTab === 'open' && (
          <div className="overflow-x-auto">
            {openOrders.length > 0 ? (
              <table className="w-full text-left text-[12px] tabular-nums font-mono">
                <thead className="text-[#707A8A] border-b border-[#DFE2E6] text-[11px] font-sans uppercase">
                  <tr>
                    <th className="py-2">Time</th>
                    <th className="py-2">Side</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Filled</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECEF]">
                  {openOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F5F6F8]">
                      <td className="py-2 text-[#707A8A]">{o.createdAt}</td>
                      <td className={`py-2 font-bold ${o.side === 'buy' ? 'text-[#02A063]' : 'text-[#CF304A]'}`}>
                        {o.side.toUpperCase()}
                      </td>
                      <td className="py-2 capitalize text-[#181A20] font-sans">{o.type}</td>
                      <td className="py-2 font-semibold text-[#181A20]">{formatINR(o.price)}</td>
                      <td className="py-2 text-[#181A20]">{o.quantity} units</td>
                      <td className="py-2 text-[#707A8A]">0%</td>
                      <td className="py-2 text-right">
                        <button className="text-[#CF304A] hover:underline font-semibold text-[11px] cursor-pointer">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-[#707A8A] text-[12px]">
                No open limit orders for {product.name}.
              </div>
            )}
          </div>
        )}

        {bottomTab === 'history' && (
          <div className="overflow-x-auto">
            {productOrders.length > 0 ? (
              <table className="w-full text-left text-[12px] tabular-nums font-mono">
                <thead className="text-[#707A8A] border-b border-[#DFE2E6] text-[11px] font-sans uppercase">
                  <tr>
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Side</th>
                    <th className="py-2">Executed Price</th>
                    <th className="py-2">Executed Qty</th>
                    <th className="py-2">Fee</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECEF]">
                  {productOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F5F6F8]">
                      <td className="py-2 font-mono text-[#946800]">{o.id}</td>
                      <td className={`py-2 font-bold ${o.side === 'buy' ? 'text-[#02A063]' : 'text-[#CF304A]'}`}>
                        {o.side.toUpperCase()}
                      </td>
                      <td className="py-2 font-semibold text-[#181A20]">{formatINR(o.price)}</td>
                      <td className="py-2 text-[#181A20]">{o.quantity} units</td>
                      <td className="py-2 text-[#707A8A]">{formatINR(o.fee, { decimals: 2 })}</td>
                      <td className="py-2 font-sans">
                        <span className="text-[#02A063] font-semibold text-[11px]">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-[#707A8A] text-[12px]">
                No trade history recorded yet for this contract.
              </div>
            )}
          </div>
        )}

        {bottomTab === 'positions' && (
          <div className="text-[12px] tabular-nums">
            {holding ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6]">
                <div>
                  <span className="text-[#707A8A] block text-[11px]">Quantity Held</span>
                  <span className="font-bold text-[#181A20] text-[14px]">{holding.quantity} units</span>
                </div>
                <div>
                  <span className="text-[#707A8A] block text-[11px]">Average Cost</span>
                  <span className="font-bold text-[#181A20] text-[14px] font-mono">{formatINR(holding.averageValue)}</span>
                </div>
                <div>
                  <span className="text-[#707A8A] block text-[11px]">Current Value</span>
                  <span className="font-bold text-[#181A20] text-[14px] font-mono">{formatINR(holding.totalCurrent)}</span>
                </div>
                <div>
                  <span className="text-[#707A8A] block text-[11px]">Unrealized P&L</span>
                  <span className={`font-bold text-[14px] font-mono ${holding.pnl >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'}`}>
                    {holding.pnl >= 0 ? '+' : ''}{formatINR(holding.pnl)} ({holding.pnlPercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    size="xs"
                    variant="sell"
                    onClick={() => openBuySell('sell', product)}
                    className="cursor-pointer"
                  >
                    Close Position
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-[#707A8A]">
                You currently hold 0 units of {product.name}. Use the Order Entry panel to enter a position.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailView;
