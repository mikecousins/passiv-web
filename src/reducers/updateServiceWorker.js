const updateServiceWorker = (state = false, action) => {
  if (action.type === 'UPDATE_SERVICE_WORKER') {
    return true;
  }
  return state;
};

export default updateServiceWorker;
