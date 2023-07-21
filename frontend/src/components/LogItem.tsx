import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { setCurrent } from '../redux/slices/log';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useDeleteLogMutation } from '../redux/api';
import { Log } from '../redux/api';

type Props = {
  log: Log;
};

const LogItem = ({ log }: Props) => {
  const dispatch = useDispatch();
  const [deleteLog] = useDeleteLogMutation();

  const onDelete = () => {
    deleteLog(log.id);
    M.toast({ html: 'Log Deleted' });
  };

  return (
    <li className='collection-item' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}
          onClick={() => dispatch(setCurrent(log))}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log.id}</span> last updated by
          <span className='black-text'> {log.tech}</span> on <Moment format='Do MMMM YYYY, H:mm'>{log.date}</Moment>
        </span>
      </div>
      <div onClick={onDelete} className='secondary-content' style={{ cursor: 'pointer' }}>
        <i className='material-icons grey-text'>delete</i>
      </div>
    </li>
  );
};

export default LogItem;
