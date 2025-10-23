"use client";

import React, { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [inWatchlist, setInWatchlist] = useState<boolean>(Boolean(isInWatchlist));

  const label = useMemo(
    () => (inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"),
    [inWatchlist]
  );

  const icon = useMemo(() => {

    if (type === "icon") return inWatchlist ? "★" : "☆";
    if (showTrashIcon && inWatchlist) return "🗑️";
    return inWatchlist ? "−" : "+";
  }, [inWatchlist, type, showTrashIcon]);

  const handleClick = useCallback(() => {
    setInWatchlist((prev) => {
      const next = !prev;
      try {
        onWatchlistChange?.(symbol, next);
        if (next) {
          toast.success(`${symbol} added to watchlist`, {
            description: company ? `${company} has been added to your watchlist.` : undefined,
          });
        } else {
          toast(`${symbol} removed from watchlist`);
        }
      } catch (e) {
        // no-op: keep UI responsive even if callback throws
        console.error("onWatchlistChange error", e);
      }
      return next;
    });
  }, [onWatchlistChange, symbol, company]);

  if (type === "icon") {
    return (
      <button
        type="button"
        aria-pressed={inWatchlist}
        aria-label={`${label} for ${company || symbol}`}
        title={`${label} (${symbol})`}
        onClick={handleClick}
        className="inline-flex items-center justify-center rounded-md border border-gray-600 text-base px-3 py-2 hover:bg-gray-700 transition-colors"
      >
        <span className={`${inWatchlist ? "text-blue-600" : "text-yellow-500"} text-xl leading-none`}>{icon}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${inWatchlist ? "blue-btn" : "yellow-btn"} px-4 flex items-center gap-2`}
    >
      <span className="text-lg">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
};

export default WatchlistButton;
