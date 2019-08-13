import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectIsUpdateServiceWorker } from '../../selectors';

const UpdateNotification = () => {
  const update = useSelector(selectIsUpdateServiceWorker);
  if (update) {
    toast.success('There is an update available. Please refresh the page');
  }
  return null;
};

export default UpdateNotification;
