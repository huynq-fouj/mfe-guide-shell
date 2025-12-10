## Shell
- Các bước tạo app shell (root) trong cấp trúc MicroFrontend với dự án angular 18 được tạo trước khi thêm @angular-architects/native-federation.
### Bước 1: Cài đặt angular
- Tải `@angular/cli` bản 18.
```powershell
npm install -g @angular/cli@18.0.0
```
- Yêu cầu bản node.js thuộc chu kỳ LTS tối thiểu là `v18.13.0` trở lên.
### Bước 2: Tạo shell
- Tạo dự án shell (hoặc root).
```powershell
ng new shell
```
- Chọn các options tạo dự án và đợi hoàn tất install các phụ thuộc.
### Bước 3: Cấu hình native federation cho shell
- Cài đặt `@angular-architects/native-federation`.
```powershell
ng add @angular-architects/native-federation --save-dev
```
- Sử dụng lệnh ng add để tự động thay đổi cấu hình file [package.json](./package.json), [angular.json](./angular.json), [main.ts](./src/main.ts) và tự động tạo file [federation.config.js](./federation.config.js).
### Bước 4: Tạo các remote app
- Tạo remote mfe1: *Sắp được thêm*
### Bước 5: Import các remote
- Tạo thư mục assets và thêm vào angular.json (nếu chưa có):
```
...
    "builder": "@angular/build:application",
    "options": {
        "browser": "src/main.ts",
        "polyfills": [
            "zone.js",
            "es-module-shims"
        ],
        "tsConfig": "tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
            {
                "glob": "**/*",
                "input": "public"
            },
            "src/assets" //Đường dẫn tới thư mục assets
        ],
        "styles": [
            "src/styles.scss"
        ]
    }
...
```
- Thêm file `federation.manifest.json` vào thư mục assets (không thêm vào assets cũng được, nếu không thêm thì trong angular.json thêm đường dẫn tới file này).
```
{
    "mfe1": "http://localhost:3001/remoteEntry.json"
    ... //Các remote khác
}
```
- Cập nhật [main.ts](./src/main.ts).
```ts
import { initFederation } from '@angular-architects/native-federation';

initFederation('/assets/federation.manifest.json') // Thêm đường dẫn tới file federation.manifest.json
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
```
### Import module từ remote
 - Sử dụng hàm `loadRemoteModule` để tải module được expose từ các remote.
 ```ts
 import { loadRemoteModule } from '@angular-architects/native-federation';

 ...

loadRemoteModule({
    remoteName: 'mfe1', //Tên remote app
    exposedModule: './Component', // Tên expose của component hoặc module.
}).then((m) => {
    return m.App; // Ví dụ ./Component của mfe1 expose component có class là App
})

 ...
 ```
### Chạy dự án.
```powershell
npm start
```
---
- Dự án tham khảo: [remote-host.vercel.app](https://remote-host.vercel.app/).
- Remote host: [github](https://github.com/huynq-fouj/remote-host).
- Remote products: [github](https://github.com/huynq-fouj/remote-products).
- Remote cart: [github](https://github.com/huynq-fouj/remote-cart).
- Remote shared-ui: [github](https://github.com/huynq-fouj/remote-shared-ui). 