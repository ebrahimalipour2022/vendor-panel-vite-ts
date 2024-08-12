// React Imports
import { useEffect, useMemo, useState } from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import type { TextFieldProps } from '@mui/material/TextField';

// Third-party Imports
import classnames from 'classnames';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  RowData,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import type { Column, Table, ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table';
import type { RankingInfo } from '@tanstack/match-sorter-utils';

// Type Imports

// Icon Imports
import { ChevronRight } from '@/assets/icons';

// Style Imports
import { StateOption } from '@/types';
import { DebouncedInput } from '@/components/react-table/filter-inputs';
import RHFReactSelectField from '@/components/hook-form-fields/RHFSelectField/ReactSelectField';
import styles from './table.module.css';
import type { DataType } from './data';

// Data Imports
import defaultData from './data';

// Column Definitions
const columnHelper = createColumnHelper<DataType>();

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'number' | 'select' | 'date';
    filterOptions?: StateOption[];
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// A debounced input react component

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const filterOptions = column?.columnDef?.meta?.filterOptions;
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'number' ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <RHFReactSelectField
      value={{ value: columnFilterValue?.toString()!, label: '' }}
      // allOptionText={t('address.allBranches')}
      // placeholder={t('address.selectBranch')}
      handleChange={(item) => {
        console.log('item', item);
        // if (item?.value) {
        if ('value' in item) {
          column.setFilterValue(item?.value);
        }
        // }
      }}
      name={'branches-field'}
      isMulti={false}
      options={filterOptions || []}
      isLoading={false}
      isDisable={false}
      size={'small'}
    />
  ) : (
    // <select
    //   onChange={(e) => column.setFilterValue(e.target.value)}
    //   value={columnFilterValue?.toString()}
    // >
    //   {filterOptions?.length &&
    //     filterOptions?.map((item, index) => <option value={item.value}>{item.label}</option>)}
    // </select>
    <DebouncedInput
      className="w-36 border rounded"
      onChange={(value) => column.setFilterValue(value)}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

const KitchenSink = () => {
  // States
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<DataType[]>(() => defaultData);

  // Hooks
  const columns = useMemo<ColumnDef<DataType, any>[]>(
    () => [
      columnHelper.accessor('fullName', {
        cell: (info) => info.getValue(),
        header: 'شماره تراکنش',
        meta: {
          filterVariant: 'text',
        },
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: 'مبلغ(ریال)',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('start_date', {
        cell: (info) => info.getValue(),
        header: 'نوع تراکنش',
        meta: {
          filterVariant: 'select',
          filterOptions: [
            {
              value: 'all',
              label: 'همه',
            },
            {
              value: 'value2',
              label: 'شارژ کیف پول',
            },
          ],
        },
      }),
      columnHelper.accessor('experience', {
        cell: (info) => info.getValue(),
        header: 'کد سفارش',
        meta: {
          filterVariant: 'text',
        },
      }),
      columnHelper.accessor('age', {
        cell: (info) => info.getValue(),
        header: 'زمان تراکنش',
        enableColumnFilter: false,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize="1.25rem" className="-rotate-90" />,
                              desc: <ChevronRight fontSize="1.25rem" className="rotate-90" />,
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                          {header.column.getCanFilter() && (
                            <>
                              {/*@ts-ignore*/}
                              <Filter column={header.column} table={table} />
                            </>
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className="text-center">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[7, 10, 25, { label: 'All', value: data.length }]}
        component="div"
        className="border-bs"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      />
    </>
  );
};

export default KitchenSink;
