import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET_USER_FUNDING_TRANSACTION } from 'graphql/queries';
import { InvestmentPerformance, Transaction } from 'models/dashboard';
import { query } from 'utils/http';

interface DashboardState {
  transactions: Transaction[];
  userInvestmentPerformance: InvestmentPerformance[];
}

interface DashboardReduxState {
  dashboard: DashboardState;
}

export const fetchTransactions = createAsyncThunk('dashboard/fetchTransactions', async () => {
  const { data } = await query<{
    data: { getUserFundingTransaction: Transaction[] };
  }>(GET_USER_FUNDING_TRANSACTION, null, true);
  console.log(data);
  return data.getUserFundingTransaction;
});

const dashboard = createSlice({
  name: 'dashboard',
  initialState: {
    transactions: [],
    userInvestmentPerformance: [
      {
        date: '',
        cash: 0,
        deposits: 0,
        cumRealizedPL: 0,
        equity: 0,
        fees: 0,
        unrealizedDayPL: 0,
        realizedDayPL: 0,
        withdrawals: 0,
      },
    ],
  } as DashboardState,
  reducers: {
    setInvestmentPerformance: (state, action: PayloadAction<InvestmentPerformance[]>) => {
      state.userInvestmentPerformance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
    });
  },
});

export const { setInvestmentPerformance } = dashboard.actions;
export default dashboard.reducer;

const dashboardStateSelector = (state: DashboardReduxState) => state.dashboard;

export const transactionsSelector = createSelector(
  dashboardStateSelector,
  (state: DashboardState) => state.transactions,
);

export const investmentPerformanceSelector = createSelector(
  dashboardStateSelector,
  (state: DashboardState) => state.userInvestmentPerformance,
);
