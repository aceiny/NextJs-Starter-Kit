import {
  useSearchParams,
  useSetQueryParams,
} from "@/hooks/shared/use-query-params";
import { Params } from "@/shared/constants/params";
import { PaginationProps } from "@/types/pagination/pagination-props.interface";

interface UsePaginationProps {
  /**
   * For server-side pagination: pass current values from searchParams
   * For client-side pagination: omit these to read from URL automatically
   */
  currentPageIndex?: number;
  currentPageSize?: number;
  initialPageSize?: number;
  rowsPerPageOptions?: number[];
}

interface UsePaginationReturn {
  pageIndex: number;
  pageSize: number;
  pagination: (totalCount: number) => PaginationProps;
}

/**
 * Universal pagination hook that works for both server-side and client-side pagination
 *
 * Server-side usage: Pass currentPageIndex and currentPageSize from searchParams
 * Client-side usage: Omit current values to read from URL automatically
 *
 * @param options - Configuration options for pagination
 * @returns Object containing pageIndex, pageSize, and pagination function
 */
export const usePagination = ({
  currentPageIndex,
  currentPageSize,
  initialPageSize = 10,
  rowsPerPageOptions = [5, 10, 20, 50],
}: UsePaginationProps = {}): UsePaginationReturn => {
  const pageParam = useSearchParams(Params.PAGE_INDEX);
  const pageSizeParam = useSearchParams(Params.PAGE_SIZE);
  const { setParam } = useSetQueryParams();

  // Determine if this is server-side (values provided) or client-side (read from URL)
  const isServerSide =
    currentPageIndex !== undefined && currentPageSize !== undefined;

  let pageIndex: number;
  let pageSize: number;

  if (isServerSide) {
    // Server-side: use provided values (already 1-based from server)
    pageIndex = currentPageIndex!;
    pageSize = currentPageSize!;
  } else {
    // Client-side: read from URL and convert to 0-based for UI
    pageIndex = pageParam ? Number(pageParam) - 1 : 0; // Convert from 1-based URL to 0-based UI
    pageSize = pageSizeParam ? Number(pageSizeParam) : initialPageSize;
  }

  const handlePageChange = (newPage: number) => {
    const urlPageValue = isServerSide
      ? newPage.toString()
      : (newPage + 1).toString();
    setParam({
      name: Params.PAGE_INDEX,
      value: urlPageValue,
      replace: true,
    });
  };

  const handlePageSizeChange = (newSize: number) => {
    setParam({
      name: Params.PAGE_SIZE,
      value: newSize.toString(),
      replace: true,
    });
    setParam({ name: Params.PAGE_INDEX, value: "1", replace: true }); // Always reset to page 1
  };

  const pagination = (totalCount: number): PaginationProps => ({
    pageIndex,
    pageSize,
    totalCount,
    rowsPerPageOptions,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  });

  return {
    pageIndex,
    pageSize,
    pagination,
  };
};
