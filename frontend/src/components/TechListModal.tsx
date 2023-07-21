import React from 'react';
import TechItem from './TechItem';
import { useGetTechsQuery } from '../redux/api';

export default function TechListModal() {
  const { data: techs } = useGetTechsQuery();

  return (
    <div id='tech-list-modal' className='modal' style={{ width: '30%', height: '55%' }}>
      <div className='modal-content'>
        <h4>Tech List</h4>
        <ul className='collection'>
          {techs?.map((tech) => (
            <TechItem tech={tech} key={tech.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
