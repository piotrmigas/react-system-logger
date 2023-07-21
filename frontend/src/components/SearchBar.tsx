import React from 'react';
import { useSearchLogsMutation } from '../redux/api';

export default function SearchBar() {
  const [searchLogs] = useSearchLogsMutation();
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchLogs(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchLogs]);

  return (
    <nav style={{ marginBottom: '30px' }} className='blue darken-4'>
      <div className='nav-wrapper'>
        <div className='input-field'>
          <input
            id='search'
            type='search'
            placeholder='Search Logs..'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className='label-icon' htmlFor='search'>
            <i className='material-icons'>search</i>
          </label>
          <i className='material-icons'>close</i>
        </div>
      </div>
    </nav>
  );
}
