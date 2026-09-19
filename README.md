# MIKADO — Sushi Bar & Asian Restaurant, Aurich

Website tĩnh (static site), tiếng Đức. Không cần build, không cần npm.

## Chạy thử

Mở trực tiếp `index.html`, hoặc chạy server để ảnh và iframe hoạt động đúng:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Rồi vào http://127.0.0.1:8000.

## Cấu trúc

| File | Nội dung |
| --- | --- |
| `index.html` | Khung trang: hero, giới thiệu, Spezialitäten, Buffet, Speisekarte, Sushi-Kunde, Galerie, Kontakt, Footer. Có JSON-LD `Restaurant` cho SEO. |
| | **Hero**: 2 cột — chữ bên trái, cụm 2 ảnh xếp chồng + vòng tròn "mặt trời" bên phải, kết bằng dải chữ chạy (marquee). |
| `assets/menu-data.js` | **Toàn bộ thực đơn**: 27 nhóm, 189 mục. Đây là file duy nhất cần sửa khi đổi giá/món. |
| `assets/menu.js` | Dựng thực đơn, tab danh mục, bộ lọc, tìm kiếm, bảng chú thích allergen. |
| `assets/app.js` | Nav mobile, sticky nav, hiệu ứng reveal, năm ở footer. |
| `assets/site.css` | Toàn bộ giao diện + responsive + bản in. |
| `public/images/` | Ảnh gốc chị gửi (tên tiếng Việt, giữ nguyên, không dùng trên web). |
| `public/images/web/` | Ảnh dùng trên web, định dạng **.png**. **Trang web chỉ dùng thư mục này.** 30 ảnh món (~42,9 MB) + 5 logo thanh toán + 1 QR (~98 KB). |
| `MIKADO_Menu .pdf` | Menu gốc, là nguồn của toàn bộ dữ liệu. Không được trang web tải (33 MB). |

## Sửa thực đơn

Mỗi món trong `assets/menu-data.js` có dạng:

```js
{
  n: '20',                        // số món trên menu
  name: 'Shabby Chick',
  allerg: 'L,F,1',                // mã allergen theo trang 27 của menu
  price: '13,90',                 // giá đơn; renderer tự thêm " €"
  tags: 'veg',                    // veg | spicy | raw, cách nhau bằng dấu phẩy
  de: 'Mô tả tiếng Đức…',
  en: 'English description…',
  img: IMG + 'd20-shabby-chick.png'
}
```

Món có nhiều lựa chọn dùng `opts` thay cho `price`:

```js
opts: [
  ['A. Tofu', 'Tofu', '11,90', 'veg'],   // [tên DE, tên EN, giá, tag tùy chọn]
  ['B. Gegrillte Hähnchenbrust', 'Grilled chicken', '13,90']
]
```

Khi đó giá hiển thị là `ab <giá thấp nhất> €`.

Bộ 10 lựa chọn lặp lại ở các món wok/curry/mì (30, 31, 32, 33, 36, 37, 38, 39) dùng
chung hằng số `WOK` ở đầu file — sửa một chỗ là đổi cho cả tám món.

### Badge vegetarisch

- `tags: 'veg'` → badge **Vegetarisch** (cả món chay).
- Chỉ có một `opts` gắn `'veg'` → badge **Vegetarisch wählbar** (chỉ biến thể đó chay).

Phân biệt này là cố ý: Mikado Bowl có lựa chọn Tofu nhưng cũng có cá hồi, nên không
được gắn nhãn là món chay.

## Bảng màu & giao diện

Toàn bộ màu nằm trong `:root` của `assets/site.css`:

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `--brand` / `--gold` | `#f1b40e` | Vàng thương hiệu (logo, nút, tiêu đề nhỏ, viền nhấn) |
| `--gold-soft` | `#f8d46a` | Giá tiền, chữ nghiêng nhấn, trạng thái hover |
| `--ink` → `--ink-4` | `#070b12` → `#1c2b3e` | 4 bậc nền tối, cách nhau đủ để thẻ nổi lên khỏi nền |
| `--card` | gradient trắng 5,5% → 1,2% | Lớp "kính" phủ lên thẻ, thay cho nền phẳng |
| `--muted` / `--muted-2` | `#a3aebd` / `#7d8898` | Chữ phụ (2 cấp) |
| `--paper` / `--paper-ink` | `#efe6d6` / `#21160e` | Khối sáng (Sushi-Kunde) |

Đổi màu thương hiệu chỉ cần sửa `--brand` và `--gold` — logo, nút, viền, giá tiền
đổi theo cùng lúc.

Vài quy ước giao diện:

- Thẻ món và thẻ Spezialitäten dùng `var(--card)` chồng lên `--ink-2`; hover thì
  viền chuyển vàng và có vạch vàng chạy dọc mép trái (`.dish::before`).
- Chú thích allergen là lưới **chip** (chữ cái trong vòng tròn vàng), không phải
  danh sách dọc — gọn hơn nhiều.
- Giá tiền cỡ lớn dùng `font-variant-numeric: lining-nums` vì font serif mặc định
  dùng chữ số kiểu cổ (số 9 thò xuống), đọc giá bị rối.
- Thanh cuộn được tô màu vàng nhạt cho khớp tổng thể.

## Ảnh: quy tắc hiển thị

Trang web **không cắt (crop) ảnh** ở bất kỳ đâu. Vì mỗi ảnh có tỉ lệ khác nhau
(từ 0,51 đến 1,36), mỗi khu vực dùng một cách riêng để ảnh luôn hiện trọn vẹn:

| Khu vực | Cách làm | Kết quả |
| --- | --- | --- |
| Galerie | `columns` (masonry) | Ảnh giữ đúng tỉ lệ gốc, không viền thừa |
| Hero (2 ảnh xếp chồng) | `height: auto` | Ảnh giữ tỉ lệ gốc, xếp lệch nhau |
| Thẻ Spezialitäten | khung vuông + `object-fit: contain` | Tiêu đề thẳng hàng, ảnh trọn vẹn, viền nền hòa vào thẻ |
| Sushi-Kunde | ô vuông nhỏ 116px + `object-fit: contain` | Bố cục ngang, gọn |
| Ảnh nhỏ trong thực đơn | khung vuông + `object-fit: contain` | Danh sách thẳng hàng |

Không còn chỗ nào dùng `object-fit: cover` — đã kiểm tra lại trong trình duyệt.

Thẻ `<img>` trong `index.html` có `width`/`height` đúng theo kích thước thật của
từng file, để trình duyệt chừa sẵn đúng chỗ và trang không bị giật khi ảnh tải xong.
**Nếu chị thay ảnh khác kích thước, nhớ cập nhật lại hai thuộc tính này** (hoặc bảo
em chạy lại script cập nhật).

> **Lưu ý khi viết CSS cho ảnh:** thuộc tính `width`/`height` trên thẻ `<img>` là
> *presentational hint* — nó đặt luôn `height` cho ảnh. Vì vậy quy tắc CSS nào chỉ
> đặt `aspect-ratio` mà **không** đặt `height` sẽ bị vô hiệu, ảnh giãn ra cao bằng
> kích thước thật. Muốn ép ảnh vào khung cố định thì phải ghi rõ cả `height`
> (xem `.guide img` và `.dish__thumb img`); muốn ảnh theo tỉ lệ gốc thì dùng
> `height: auto` (xem `.gallery-grid img` và `.hero__card img`).

### Hero

- Vòng tròn `.hero__ring` phải có `aspect-ratio: 1/1`; nếu dùng `inset` theo phần
  trăm trên khung không vuông thì nó ra hình elip.
- `.hero__badge` (giá buffet) nằm trong `.hero__stack` cùng với ảnh lớn, nhờ vậy
  nó luôn bám đúng góc dưới-trái của ảnh ở mọi khổ màn hình.
- Marquee lặp mượt nhờ **2 nhóm chữ giống hệt nhau** + `translateX(-50%)`.
  Nếu sửa danh sách món, phải sửa **cả hai nhóm** cho giống nhau.

## Thêm ảnh mới

Đặt ảnh vào `public/images/web/` với đuôi `.png`, rồi trỏ `img: IMG + 'ten-moi.png'`
trong `menu-data.js`.

## Zahlungsarten (logo thanh toán + QR)

Logo VISA / girocard / MasterCard / electronic cash / Maestro và mã QR được
**trích trực tiếp từ trang 1 của `MIKADO_Menu .pdf`** (không vẽ lại), kèm kênh alpha:
`pay-visa.png`, `pay-girocard.png`, `pay-mastercard.png`, `pay-ec.png`,
`pay-maestro.png`, `qr-mikado.png`.

Logo đặt trên ô trắng bo góc, giới hạn bằng biến `--tile-w` / `--tile-h` / `--tile-p`
trên `.paylogos li` — đổi kích thước ô chỉ cần sửa ba biến này.

**Mã QR** giải ra `https://q.me-qr.com/hyibmhwi`, chuyển hướng (302) về
`http://www.mikado-aurich.de/`. Đã kiểm tra lại sau khi trích: vẫn quét được.
Lưu ý QR đi qua dịch vụ rút gọn me-qr.com — nếu dịch vụ đó ngừng thì mã sẽ hỏng.

## Thông tin nhà hàng (đang dùng trong trang)

- Leerer Landstraße 1, 26603 Aurich
- Tel. 04941 990 1764
- Mo., Mi., Do., Fr. 11:00–15:00 và 17:00–22:00 · Sa., So. 12:00–22:00 · Di. Ruhetag
- Buffet + Sushi 18,90 € — Fr. & Sa. 17:30–21:00, So. 12:00–14:00 & 17:30–21:00
- Trẻ em 4–12 tuổi: 1,20 €/tuổi

Giờ mở cửa **không hiển thị ở đầu trang** (theo yêu cầu) — chỉ có ở mục Kontakt và
footer. Badge "Jetzt geöffnet" đã gỡ khỏi hero; hàm tính giờ trong `assets/app.js`
vẫn còn và tự bỏ qua khi không tìm thấy phần tử, nên có thể bật lại bất cứ lúc nào.

Footer ghi `© <năm> Hoangcaster`; năm do `assets/app.js` tự cập nhật hằng năm.

## Ghi chú về nguồn dữ liệu

Trang 11 của PDF in **hai mục cùng đánh số 40 "Bangkok Suppe"**. Một mục có mô tả
trùng hoàn toàn với món 36 (Bangkok Rotes Curry) kèm danh sách 10 lựa chọn — đây gần
như chắc chắn là lỗi copy trong file PDF. Trang web chỉ dùng mục còn lại, là món súp
thật (mì gạo + hải sản, 16,90 €). Menu cũng không có món số 41, và bỏ trống các khoảng
43–49, 75–79, 84–89 — đúng như bản in.

Các số khác giữ nguyên theo menu, kể cả cách đánh số của sushi (510, 610–612).
#   M I K A D O  
 