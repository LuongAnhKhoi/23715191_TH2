import { apiClient,networkMessage } from '@services/apiClient';
import { getProducts,normalizeProduct } from '@services/productApi';
import { AxiosError } from 'axios';
test('API normalizes numeric ids and sends the student header and limit', async () => {
  const oldAdapter = apiClient.defaults.adapter;
  const adapter = jest.fn(async config => ({config, status: 200, statusText: 'OK', headers: {},
    data: [{id: 9, title: 'Món', price: 1.25, description: 'Mô tả', image: 'https://example.com/a.png'}]}));
  apiClient.defaults.adapter = adapter;
  try {
    const products = await getProducts();
    expect(products[0].id).toBe('9');
    expect(adapter.mock.calls[0][0].headers.get('X-Student-Id')).toBe('23715191');
    expect(adapter.mock.calls[0][0].params).toEqual({limit: 12});
  } finally {apiClient.defaults.adapter = oldAdapter;}
});
test('malformed or invalid-price responses fail instead of being rendered', () => {
  expect(() => normalizeProduct({id: 1, title: 'Món', price: -1, image: '', description: ''})).toThrow();
  expect(() => normalizeProduct(null)).toThrow();
});
test('timeout and connection failures have usable messages', () => {
  expect(networkMessage(new AxiosError('timeout','ECONNABORTED'))).toContain('quá lâu');
  expect(networkMessage(new AxiosError('Network Error','ERR_NETWORK'))).toContain('kết nối');
});

