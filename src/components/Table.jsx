import React from 'react'
import { Table as AntTable } from 'antd'
import moment from "moment";

export const dateSort = (dateA, dateB) => moment(dateA).diff(moment(dateB));

export const defaultSort = (a, b) => {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};

export const Sorter = {
  DEFAULT: defaultSort,
  DATE: dateSort
};

export const Table = (props) => {
  const { columns, ...otherTableProps } = props;

  const sortableColumns = columns.map((column) => {
    const { sorter, dataIndex, ...otherColumnProps } = column;

    if (sorter) {
      const { compare } = sorter;

      return {
        ...otherColumnProps,
        sortDirections: ['descend', 'ascend'],
        dataIndex,
        sorter: { compare: (rowA, rowB) => compare(rowA[dataIndex], rowB[dataIndex])}
      };
    }

    return { ...otherColumnProps, dataIndex };
  });

  return <AntTable columns={sortableColumns} {...otherTableProps} />;
}
