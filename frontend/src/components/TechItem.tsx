import React from 'react';
import { useDeleteTechMutation } from '../redux/api';
import M from 'materialize-css/dist/js/materialize.min.js';

type Props = { tech: Tech };

export default function TechItem({ tech }: Props) {
  const [deleteTech] = useDeleteTechMutation();

  const onDelete = () => {
    deleteTech(tech.id);
    M.toast({ html: 'Technician deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
}
