LUONG ANH KHOI | MSSV 23715191 | URL clone HTTPS: https://github.com/LuongAnhKhoi/23715191_TH2.git | stamp 353533 | so cuoi 1 | VARIANT: watermarkAtTop=false, authField=phone, tabOrder=shopFirst, hapticOnAdd=selection, shipFormula=B, detailPresentation=card

# KTXGo

Project React Native CLI + TypeScript của LUONG ANH KHOI. Mốc tích lũy theo đề 23715191_LUONGANHKHOI_TH2.docx.

| Câu | Nội dung | Trạng thái triển khai |
|---|---|---|
| Câu 1a | Định danh, RN CLI TypeScript, alias và Auth/Main | Đã triển khai |
| Câu 1b | Tabs, badge, watermark, SafeArea và Detail card | Đã triển khai |
| Câu 2a | ProductCard, FlashList 2 cột và debounce | Đã triển khai |
| Câu 2b | Axios, useProductsQuery, trạng thái mạng và Detail | Đã triển khai |
| Câu 3a | Giỏ chung, persist AsyncStorage và Haptic selection | Đã triển khai |
| Câu 3b | Location, quyền hệ thống, phí ship, đăng xuất và screenshot | Đã triển khai |

## Chạy Android

Node >=20.19.4, JDK 17, Android SDK API 36, Build Tools 36.0.0, NDK 27.1.12297006.

Mở terminal trong thư mục project, cài dependencies:

```powershell
npm ci
```

Cấu hình ANDROID_HOME hoặc android/local.properties theo máy và mở emulator.

Terminal 1 — chạy Metro và giữ cửa sổ này mở:

```powershell
npm start
```

Terminal 2 — mở trong cùng thư mục project, cài và chạy ứng dụng Android:

```powershell
npm run android
```

Nếu Metro của chính project đã chạy trên cổng 8081, dùng cửa sổ đó và chạy `npm run android` ở terminal khác; không cần mở thêm Metro.

Kiểm tra: npm run typecheck; npm test; npm run lint.

FlashList 1.8.3 hỗ trợ numColumns={2} và estimatedItemSize. React Navigation v7. Haptic: react-native-haptic-feedback 3.0.0. Location: PermissionsAndroid + @react-native-community/geolocation.

Token giả chỉ nằm trong bộ nhớ. Khởi động lại app cần đăng nhập lại. Giỏ persist AsyncStorage với key ktxgo-cart-23715191.
Login chỉ kiểm tra ô nhập không rỗng sau khi trim, theo đề. Bấm ảnh, tên, giá hoặc khoảng trống trong card mở Detail; nút + chỉ thêm vào giỏ.
Dữ liệu chính: GET https://fakestoreapi.com/products?limit=12 qua Axios và useProductsQuery; X-Student-Id=23715191; staleTime lấy từ student.ts.

Điểm KTX giả lập cố định: 10.8221, 106.6879. Haversine tính khoảng cách; công thức B: BASE_SHIP_FEE + Math.round(km * 1500) + 2000. Phí trên Tôi và Giỏ dùng chung store.

Bấm Lấy vị trí để xin quyền bằng hộp thoại của Android. Android ghi nhớ lựa chọn đã cấp quyền; app không thể ép hiện hộp thoại lại mỗi lần. Denied có hướng dẫn xin lại và Mở Cài đặt; blocked mở cài đặt ứng dụng qua Linking.openSettings(). Chưa có vị trí thì Giỏ hiện Chưa ước tính phí — mở tab Tôi.

Ảnh emulator: docs/screenshot-th2-home.png và docs/screenshot-th2-cart.png.

## Nộp bài

Repo công khai: https://github.com/LuongAnhKhoi/23715191_TH2. URL clone HTTPS đã điền trong đề. Mỗi mốc một commit/push riêng với MSSV và TH2, dùng thời gian thật; không force-push.

## Kiểm chứng trong giờ thi

Đã kiểm tra trực tiếp project K:/LTNMB/KTXGo_23715191 trong phiên thi ngày 09/10/2026, giờ Asia/Saigon; dùng thời gian thực của máy.

- TypeScript: đạt; 13 kiểm thử/5 bộ: đạt; lint: 0 lỗi, 7 cảnh báo (phép XOR của stamp và các lời gọi async dùng void).
- Build Android debug x86_64: BUILD SUCCESSFUL; APK được cài và chạy trên Pixel_6 Android API 37. Native và dependencies dùng chung giữa các câu; mỗi câu được kiểm tra bằng source JavaScript tương ứng.
- Câu 1a/1b: Login phone, token giả/rút gọn, Auth/Main, tabs Cửa hàng → Giỏ → Tôi, Detail/Back, watermark 5 màn và SafeArea.
- Câu 2a/2b: lưới 2 cột, tìm kiếm/debounce, API thật, tắt mạng → lỗi có MSSV, bật mạng/Thử lại, Detail khớp món và kéo refresh.
- Câu 3a: Home + Detail thêm cùng món (SL=2), Alert có MSSV, tăng/giảm, badge/tổng tiền, kill/relaunch còn giỏ và xóa món. Haptic selection được unit test và gọi khi thao tác thêm trên emulator; không đo rung trên điện thoại thật.
- Câu 3b: hộp thoại Location của Android, denied, blocked, mở đúng trang cài đặt KTXGo, granted, Haversine/ship B đồng bộ Tôi–Giỏ và đăng xuất.
- GPS emulator dùng 10.8230, 106.6884: khoảng cách khoảng 0,114 km; phí ship 11.171 đ. Hai screenshot Home/Cart chụp lại trong phiên này, thấy TH2 · 23715191 · LUONG ANH KHOI · #353533.

- Câu 3b: typecheck, unit tests và lint đã chạy thành công lúc 18:07:51 9/10/2026.
- Rà soát Câu 1a/2a lúc 18:59 ngày 09/10/2026: typecheck đạt, 13 test đạt, lint 0 lỗi/7 cảnh báo cũ. Kiểm tra Pixel_6: ô Login trống bị chặn, nhập 123 vào Main; bấm giá/khoảng trống card mở Detail đúng món; nút + giữ Home và tăng giỏ đúng 1. Giỏ được trả về số lượng trước kiểm tra.
- Android emulator: Hộp thoại Location của Android; denied → xin lại/Mở Cài đặt; denied lần hai → blocked → cài đặt đúng KTXGo; granted → GPS giả lập/Haversine 0,114 km/phí B 11.171 đ đồng bộ Tôi/Giỏ; đăng xuất. Chụp mới 2 ảnh Home/Cart từ project thi..
