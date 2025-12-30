import React from 'react';
import { Table } from 'antd';

const CommonTable = ({ columns, data }) => {
  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default CommonTable;
