import type { Product } from '@services/productApi';
// Local fixtures are used ONLY by M03. M04+ reads the exam's live API.
export const sampleProducts: Product[] = [
  {id: '1', title: 'Cơm nắm rong biển', price: 1, description: 'Món nhanh giao tận phòng.', image: 'https://picsum.photos/id/292/400/300'},
  {id: '2', title: 'Trà sữa', price: 1.2, description: 'Đồ uống mát giao nội khu.', image: 'https://picsum.photos/id/225/400/300'},
  {id: '3', title: 'Bút bi', price: 0.4, description: 'Văn phòng phẩm tiện lợi.', image: 'https://picsum.photos/id/24/400/300'},
  {id: '4', title: 'Mì ly', price: 0.6, description: 'Món ăn tiện lợi.', image: 'https://picsum.photos/id/431/400/300'},
];

