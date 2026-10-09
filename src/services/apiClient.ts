import { STUDENT } from '@constants/student';
import axios from 'axios';
export const apiClient = axios.create({baseURL: 'https://fakestoreapi.com', timeout: 15000});
apiClient.interceptors.request.use(config => {
  config.headers.set('X-Student-Id', STUDENT.mssv);
  return config;
});
export function networkMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return 'Kết nối quá lâu. Hãy thử lại.';
    if (error.response) return 'Máy chủ trả lỗi ' + error.response.status + '. Hãy thử lại.';
    return 'Không tải được dữ liệu món. Kiểm tra kết nối mạng.';
  }
  return error instanceof Error ? error.message : 'Không tải được dữ liệu món.';
}

