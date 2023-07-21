import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useAddTechMutation } from '../redux/api';

export default function AddTechModal() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [addTech] = useAddTechMutation();

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      addTech({
        firstName,
        lastName,
      });

      M.toast({ html: `${firstName} ${lastName} was added as a tech` });

      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div id='add-tech-modal' className='modal' style={{ width: '30%', height: '50%' }}>
      <div className='modal-content'>
        <h4>New Tech</h4>
        <div className='row'>
          <div className='input-field'>
            <input type='text' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input type='text' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <div
          onClick={onSubmit}
          className='modal-close waves-effect blue darken-4 btn'
          style={{ marginRight: '20px', marginTop: '0' }}
        >
          Add
        </div>
      </div>
    </div>
  );
}
