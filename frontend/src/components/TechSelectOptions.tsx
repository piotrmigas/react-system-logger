import React from 'react';
import { useGetTechsQuery } from '../redux/api';

export default function TechSelectOptions() {
  const { data: techs } = useGetTechsQuery();

  return techs
    ? techs.map(({ id, firstName, lastName }) => (
        <option key={id} value={`${firstName} ${lastName}`}>
          {firstName} {lastName}
        </option>
      ))
    : null;
}
