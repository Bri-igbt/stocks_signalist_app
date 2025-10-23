import TradingViewWidget from "@/components/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import WatchlistButton from "@/components/WatchlistButton";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;

  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left column */}
      <section className="flex flex-col gap-8">
        <div>
          <TradingViewWidget
            title="Symbol Info"
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
        </div>
        <div>
          <TradingViewWidget
            title="Candlestick Chart"
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={600}
            className="custom-chart"
          />
        </div>
        <div>
          <TradingViewWidget
            title="Baseline Chart"
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            height={600}
            className="custom-chart"
          />
        </div>
      </section>

      {/* Right column */}
      <section className="flex flex-col gap-8">
        <div>
          <WatchlistButton
            symbol={symbol.toUpperCase()}
            company={symbol.toUpperCase()}
            isInWatchlist={false}
            type="button"
          />
        </div>
        <div>
          <TradingViewWidget
            title="Technical Analysis"
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
        </div>
        <div>
          <TradingViewWidget
            title="Company Profile"
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />
        </div>
        <div>
          <TradingViewWidget
            title="Company Financials"
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}
