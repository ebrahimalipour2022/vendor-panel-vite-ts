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
import { Pagination } from '@mui/material';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './table.module.css';
// Data Imports

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'number' | 'select' | 'date';
    filterOptions?: StateOption[];
    filterName?: string;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [option, setOption] = useState({
    label: '',
    value: '',
  });

  // console.log('column :', column);
  const columnFilterValue = column.getFilterValue();
  const filterOptions = column?.columnDef?.meta?.filterOptions;
  const filterName = column?.columnDef?.meta?.filterName;
  const { filterVariant } = column.columnDef.meta ?? {};

  useEffect(() => {
    if (filterName && searchParams) {
      const value = searchParams.get(filterName);
      if (value) {
        const index =
          filterOptions?.length &&
          filterOptions.findIndex((item) => item.value === value.toLowerCase());
        if (index) {
          setOption(filterOptions[index]);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchParams.set(filterName!, option.value);
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  return filterVariant === 'number' ? (
    <div />
  ) : filterVariant === 'select' ? (
    <RHFReactSelectField
      value={option}
      // allOptionText={t('address.allBranches')}
      // placeholder={t('address.selectBranch')}
      handleChange={(item) => {
        if ('value' in item) {
          setOption(item);
        }
      }}
      name={'branches-field'}
      isMulti={false}
      options={filterOptions || []}
      isLoading={false}
      isDisable={false}
      size={'small'}
      outlinedSx={{
        bgcolor: 'white',
      }}
    />
  ) : (
    <DebouncedInput className="w-36 border rounded" type="text" name={filterName!} />
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
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log('page', page);
    if (setPagination) {
      setPagination({ pageIndex: page, pageSize: 10 });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className={'flex flex-col gap-2'}>
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
          <div className={'flex flex-row justify-center align-center '}>
            <div className={'p-1 bg-[var(--mui-palette-action-disabledBackground)] rounded-2xl'}>
              <Pagination
                count={11}
                defaultPage={1}
                siblingCount={0}
                shape="rounded"
                color={'primary'}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TanStackTable;
