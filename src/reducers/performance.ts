const selectedTimeframe = (state = '1Y', action: any) => {
  if (action.type === 'SET_SELECTED_TIMEFRAME') {
    return action.timeframe;
  } else {
    return state;
  }
};

export default selectedTimeframe;

// Old reducer methods from index.ts from before switched to one api call
// // totalEquityTimeframe: simple<PastValueSeries>({
// //   baseType: 'FETCH_TOTAL_EQUITY_TIMEFRAME_1Y',
// //   userData: true,
// // }),
// totalEquityTimeframe1Y: simple<PastValue[]>({
//   baseType: 'FETCH_TOTAL_EQUITY_TIMEFRAME_1Y',
//   userData: true,
// }),
// totalEquityTimeframeYTD: simple<PastValue[]>({
//   baseType: 'FETCH_TOTAL_EQUITY_TIMEFRAME_YTD',
//   userData: true,
// }),
// totalEquityTimeframe30D: simple<PastValue[]>({
//   baseType: 'FETCH_TOTAL_EQUITY_TIMEFRAME_30D',
//   userData: true,
// }),
// // contributionTimeframe: simple<PastValueSeries>({
// //   baseType: 'FETCH_CONTRIBUTION_TIMEFRAME_1Y',
// //   userData: true,
// // }),
// contributionTimeframe1Y: simple<PastValue[]>({
//   baseType: 'FETCH_CONTRIBUTION_TIMEFRAME_1Y',
//   userData: true,
// }),
// contributionTimeframeYTD: simple<PastValue[]>({
//   baseType: 'FETCH_CONTRIBUTION_TIMEFRAME_YTD',
//   userData: true,
// }),
// contributionTimeframe30D: simple<PastValue[]>({
//   baseType: 'FETCH_CONTRIBUTION_TIMEFRAME_30D',
//   userData: true,
// }),
// // contributions: simple<Contributions>({
// //   baseType: 'FETCH_CONTRIBUTIONS',
// //   userData: true,
// // }),
// contributions1Y: simple<Contributions>({
//   baseType: 'FETCH_CONTRIBUTIONS_1Y',
//   userData: true,
// }),
// contributionsYTD: simple<Contributions>({
//   baseType: 'FETCH_CONTRIBUTIONS_YTD',
//   userData: true,
// }),
// contributions30D: simple<Contributions>({
//   baseType: 'FETCH_CONTRIBUTIONS_30D',
//   userData: true,
// }),
