import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
}

interface HoldingState {
  holdings: Holding[];
}

const initialState: HoldingState = {
  holdings: [],
};

const holdingSlice = createSlice({
  name: 'holdings',
  initialState,
  reducers: {
    buyStock: (state, action: PayloadAction<Holding>) => {
      const { symbol, quantity, avgPrice, name } = action.payload;
      const existing = state.holdings.find(h => h.symbol === symbol);
      if (existing) {
        const totalQty = existing.quantity + quantity;
        const totalValue = existing.avgPrice * existing.quantity + avgPrice * quantity;
        existing.quantity = totalQty;
        existing.avgPrice = totalValue / totalQty;
      } else {
        state.holdings.push({ symbol, name, quantity, avgPrice });
      }
    },
    sellStock: (state, action: PayloadAction<{ symbol: string; quantity: number }>) => {
      const { symbol, quantity } = action.payload;
      const existing = state.holdings.find(h => h.symbol === symbol);
      if (existing) {
        existing.quantity -= quantity;
        if (existing.quantity <= 0) {
          state.holdings = state.holdings.filter(h => h.symbol !== symbol);
        }
      }
    },
  },
});

export const { buyStock, sellStock } = holdingSlice.actions;
export default holdingSlice.reducer;
