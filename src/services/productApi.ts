import { apiClient } from '@services/apiClient';
export interface Product {id: string; title: string; price: number; description: string; image: string;}
export function normalizeProduct(value: unknown): Product {
  if (typeof value !== 'object' || value === null) throw new Error('Dữ liệu món không hợp lệ.');
  const item = value as Record<string, unknown>;
  const id = item.id;
  if (!((typeof id === 'string' && id.length > 0) || (typeof id === 'number' && Number.isFinite(id))) ||
    typeof item.title !== 'string' || typeof item.price !== 'number' ||
    !Number.isFinite(item.price) || item.price < 0 || typeof item.image !== 'string' ||
    typeof item.description !== 'string') throw new Error('Dữ liệu món không hợp lệ.');
  return {id: String(id), title: item.title, price: item.price,
    description: item.description, image: item.image};
}
export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const {data} = await apiClient.get<unknown>('/products', {params: {limit: 12}, signal});
  if (!Array.isArray(data)) throw new Error('Danh sách món không hợp lệ.');
  return data.map(normalizeProduct);
}

