export interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  rowsPerPageOptions: number[];
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}
