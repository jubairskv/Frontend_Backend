// App.js

import React from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import CSVDownloadButton from './CSVDownloadButton';

function App() {
  return (
    <div>
      <EmployeeForm />
      <EmployeeList />
      <CSVDownloadButton />
    </div>
  );
}

export default App;

