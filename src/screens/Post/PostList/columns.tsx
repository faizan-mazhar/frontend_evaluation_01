import React from 'react';

export const columns = (navigate: any) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => (
      <button
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          color: '#1677ff',
        }}
        onClick={() => navigate(`/posts/${id}`)}
      >
        {id}
      </button>
    ),
  },
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Body', dataIndex: 'body', key: 'body' },
];
