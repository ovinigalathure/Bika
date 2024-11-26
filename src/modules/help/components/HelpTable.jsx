// profile/components/HelpTable.jsx
import React from 'react';

const HelpTable = () => {
  // Sample data; replace with your actual data source as needed
  const helpData = [
    { name: 'John Doe', address: '123 Main St', email: 'john@example.com', subject: 'Issue 1' },
    { name: 'Jane Smith', address: '456 Elm St', email: 'jane@example.com', subject: 'Issue 2' },
    { name: 'Alice Johnson', address: '789 Oak St', email: 'alice@example.com', subject: 'Issue 3' },
  ];

  return (
    <table className="help-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {helpData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.email}</td>
            <td>{item.subject}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HelpTable;
