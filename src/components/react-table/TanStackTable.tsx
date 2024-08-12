// React Imports
import type { Dispatch, SetStateAction } from 'react';

// MUI Imports

// Third-party Imports
import type { Column, ColumnDef, PaginationState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';

// Style Imports
import { StateOption } from '@/types';
import { DebouncedInput } from '@/components/react-table/filter-inputs';
import RHFReactSelectField from '@/components/hook-form-fields/RHFSelectField/ReactSelectField';
import { LoadingScreen } from '@/components/loading-screen';
import { useMemo } from 'react';
import styles from './table.module.css';
// Data Imports

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'number' | 'select' | 'date';
    filterOptions?: StateOption[];
  }
}

export interface UseGetTableResponseType<TData> {
  PageIndex: number;
  PageSize: number;
  pageCount: number;
  // total: number;
  // total_filtered: number;
  data: TData[];
}
export interface TableProps<TData, TValue> {
  isLoading: boolean;
  data?: UseGetTableResponseType<TData>;
  // columns: ColumnDef<TData, TValue>[];
  columns: ColumnDef<TData, TValue>[];
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  // sorting?: SortingState;
  // setSorting?: Dispatch<SetStateAction<SortingState>>;
  // columnFilters?: ColumnFiltersState;
  // setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
}

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
    <DebouncedInput
      className="w-36 border rounded"
      onChange={(value) => column.setFilterValue(value)}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

const TanStackTable = <TData, TValue>({
  data,
  columns,
  pagination,
  setPagination,
  isLoading,
}: TableProps<TData, TValue>) => {
  // States
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
                            // className={classnames({
                            //   'flex items-center': header.column.getIsSorted(),
                            //   'cursor-pointer select-none': header.column.getCanSort(),
                            // })}
                            // onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {/*{{*/}
                              {/*  asc: <ChevronRight fontSize="1.25rem" className="-rotate-90" />,*/}
                              {/*  desc: <ChevronRight fontSize="1.25rem" className="rotate-90" />,*/}
                              {/*}[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}*/}
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
      )}

      {/*<TablePagination*/}
      {/*  rowsPerPageOptions={[7, 10, 25, { label: 'All', value: data.length }]}*/}
      {/*  component="div"*/}
      {/*  className="border-bs"*/}
      {/*  count={table.getFilteredRowModel().rows.length}*/}
      {/*  rowsPerPage={table.getState().pagination.pageSize}*/}
      {/*  page={table.getState().pagination.pageIndex}*/}
      {/*  onPageChange={(_, page) => {*/}
      {/*    table.setPageIndex(page);*/}
      {/*  }}*/}
      {/*  onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}*/}
      {/*/>*/}
    </>
  );
};

export default TanStackTable;
