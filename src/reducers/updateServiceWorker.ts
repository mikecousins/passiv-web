const updateServiceWorker = (state = false, action: any) => {
  if (action.type === 'UPDATE_SERVICE_WORKER') {
    return true;
  }
  return state;
};

export default updateServiceWorker;
