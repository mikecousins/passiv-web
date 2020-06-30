export const setVersion = (payload: any) => ({
  type: 'SET_VERSION',
  payload: payload,
});

export const reloadApp = () => ({
  type: 'RELOAD_APP',
});
