import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useSelector } from 'react-redux';
import TechSelectOptions from './TechSelectOptions';
import { selectCurrent } from '../redux/slices/log';
import { useUpdateLogMutation } from '../redux/api';

export default function EditLogModal() {
  const [message, setMessage] = React.useState('');
  const [attention, setAttention] = React.useState(false);
  const [tech, setTech] = React.useState('');

  const [updateLog] = useUpdateLogMutation();

  const current = useSelector(selectCurrent);

  React.useEffect(() => {
    if (current) {
      setMessage(current.message);
      setTech(current.tech);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const updatedLog = {
        id: current?.id as number,
        message,
        attention,
        tech,
        date: new Date(),
      };
      updateLog(updatedLog);
      M.toast({ html: `Log updated by ${tech}` });

      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={{ width: '30%', height: '55%' }}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input type='text' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select name='tech' value={tech} className='browser-default' onChange={(e) => setTech(e.target.value)}>
              <option value='' disabled>
                Select Tech
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue darken-4 btn'
          style={{ marginRight: '20px' }}
        >
          Update
        </a>
      </div>
    </div>
  );
}
