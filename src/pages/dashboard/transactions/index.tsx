import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import TanStackTable from '@/components/react-table/TanStackTable';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import data from '@/components/react-table/data';

export default function Page() {
  const { t } = useTranslation();

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  // Hooks
  const columns = useMemo(
    () => [
      {
        accessorKey: 'fullName',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'شماره تراکنش',
        meta: {
          filterVariant: 'text',
          filterName: 'filter1',
        },
      },
      {
        accessorKey: 'email',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'مبلغ(ریال)',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'start_date',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'نوع تراکنش',
        meta: {
          filterVariant: 'select',
          filterName: 'filter2',
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
      },
      {
        accessorKey: 'experience',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'کد سفارش',
        meta: {
          filterVariant: 'text',
          filterName: 'filter3',
        },
      },
      {
        accessorKey: 'age',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'زمان تراکنش',
        enableColumnFilter: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.transactions')}</title>
      </Helmet>
      <TanStackTable
        columns={columns as any}
        pagination={pagination}
        setPagination={setPagination}
        data={{
          data: data.slice(0, 10),
          PageIndex: 1,
          PageSize: 10,
          pageCount: 10,
        }}
        isLoading={false}
      />
    </>
  );
}
