LUONG ANH KHOI | MSSV 23715191 | URL clone HTTPS: https://github.com/LuongAnhKhoi/23715191_TH2.git | stamp 353533 | so cuoi 1 | VARIANT: watermarkAtTop=false, authField=phone, tabOrder=shopFirst, hapticOnAdd=selection, shipFormula=B, detailPresentation=card

# KTXGo — Câu 2b

Project React Native CLI + TypeScript của LUONG ANH KHOI. Mốc tích lũy theo đề 23715191_LUONGANHKHOI_TH2.docx.

| Mốc | Nội dung | Trạng thái triển khai |
|---|---|---|
| Câu 1a | Định danh, RN CLI TypeScript, alias và Auth/Main | Đã triển khai |
| Câu 1b | Tabs, badge, watermark, SafeArea và Detail card | Đã triển khai |
| Câu 2a | ProductCard, FlashList 2 cột và debounce | Đã triển khai |
| Câu 2b | Axios, useProductsQuery, trạng thái mạng và Detail | Đã triển khai |
| Câu 3a | Giỏ chung, persist AsyncStorage và Haptic selection | Mốc tiếp theo |
| Câu 3b | Location, quyền hệ thống, phí ship, đăng xuất và screenshot | Mốc tiếp theo |

## Chạy Android

Node >=20.19.4, JDK 17, Android SDK API 36, Build Tools 36.0.0, NDK 27.1.12297006.

1. npm ci
2. Cấu hình ANDROID_HOME hoặc android/local.properties theo máy.
3. Mở emulator.
4. npm start
5. Trong terminal khác: npm run android.

Kiểm tra: npm run typecheck; npm test; npm run lint.

FlashList 1.8.3 hỗ trợ numColumns={2} và estimatedItemSize. React Navigation v7. Haptic: react-native-haptic-feedback 3.0.0. Location: PermissionsAndroid + @react-native-community/geolocation.

Token giả chỉ nằm trong bộ nhớ. Khởi động lại app cần đăng nhập lại. Persist giỏ được triển khai tại Câu 3a.
Dữ liệu chính: GET https://fakestoreapi.com/products?limit=12 qua Axios và useProductsQuery; X-Student-Id=23715191; staleTime lấy từ student.ts.

## Nộp bài

Repo công khai: https://github.com/LuongAnhKhoi/23715191_TH2. URL clone HTTPS đã điền trong đề. Mỗi mốc một commit/push riêng với MSSV và TH2, dùng thời gian thật; không force-push.

## Kiểm chứng trong giờ thi

Kết quả kiểm chứng thực tế của mốc này được bổ sung trước khi commit. Không tính kiểm tra bản chuẩn bị là kiểm tra project thi.

- Câu 2b: typecheck, unit tests và lint đã chạy thành công lúc 17:58:53 9/10/2026.
- Android emulator: API thật: tắt mạng hiện lỗi có MSSV, bật mạng/Thử lại có list, Detail khớp sản phẩm và kéo refresh; interceptor/normalize/staleTime được kiểm tra bằng test và source..
