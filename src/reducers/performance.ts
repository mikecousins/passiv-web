import {
  formattedLastQuarter,
  formattedToday,
  formattedYearAgo,
} from '../components/Performance/DatePickers';

export const selectedTimeframe = (state = '1Y', action: any) => {
  if (action.type === 'SET_SELECTED_TIMEFRAME') {
    return action.timeframe;
  } else {
    return state;
  }
};

export const selectedAccounts = (state = [], action: any) => {
  if (action.type === 'SET_SELECTED_ACCOUNTS') {
    return action.accounts;
  } else {
    return state;
  }
};

export const reportingStartDate = (state = formattedYearAgo(), action: any) => {
  if (action.type === 'SET_REPORTING_START_DATE') {
    return action.startDate;
  } else {
    return state;
  }
};

export const reportingEndDate = (state = formattedToday(), action: any) => {
  if (action.type === 'SET_REPORTING_END_DATE') {
    return action.endDate;
  } else {
    return state;
  }
};

export const activitiesStartDate = (
  state = formattedLastQuarter(),
  action: any,
) => {
  if (action.type === 'SET_ACTIVITIES_START_DATE') {
    return action.startDate;
  } else {
    return state;
  }
};

export const activitiesEndDate = (state = formattedToday(), action: any) => {
  if (action.type === 'SET_ACTIVITIES_END_DATE') {
    return action.endDate;
  } else {
    return state;
  }
};
