import React from 'react';
import LogItem from './LogItem';
import Preloader from './Preloader';
import { useGetLogsQuery } from '../redux/api';

export default function Logs() {
  const { data: logs, isLoading } = useGetLogsQuery();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {logs?.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs?.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
}
