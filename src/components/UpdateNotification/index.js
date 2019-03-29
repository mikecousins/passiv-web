import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { selectIsUpdateServiceWorker } from '../../selectors';

const UpdateNotification = props => {
  if (props.update) {
    toast.success('There is an update available. Please refresh the page');
  }
  return null;
};

const select = state => ({
  update: selectIsUpdateServiceWorker(state),
});

export default connect(select)(UpdateNotification);
