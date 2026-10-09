import { STALE_TIME_MS } from '@constants/student';
import { getProducts } from '@services/productApi';
import { productsKey } from '@services/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useProductsQuery() {
  return useQuery({
    queryKey: productsKey,
    queryFn: ({signal}) => getProducts(signal),
    staleTime: STALE_TIME_MS,
    retry: false,
  });
}
