# REST API Manajemen Event - Study Case MBKM Polije

Ini adalah REST API yang dibangun sebagai bagian dari proses seleksi Mini Study Case untuk program Magang Berdampak TEFA Batch 5 di Politeknik Negeri Jember. API ini digunakan untuk mengelola event dan memiliki sistem autentikasi serta otorisasi berbasis RBAC.

---

## Fitur Utama

Berikut adalah daftar fitur utama yang telah diimplementasikan dalam proyek ini:

*   **Autentikasi & Keamanan:**
    *   Registrasi dan Login pengguna menggunakan JSON Web Token (JWT).
    *   Password di-hash menggunakan `bcrypt` untuk keamanan.
    *   Endpoint yang dilindungi untuk memastikan hanya pengguna terotentikasi yang dapat mengaksesnya.
*   **Manajemen Peran (RBAC - Role-Based Access Control):**
    *   Dua peran pengguna: `admin` dan `organizer`.
    *   `admin` memiliki akses penuh ke semua data event.
    *   `organizer` hanya dapat mengelola event yang mereka buat sendiri.
*   **Manajemen Event (CRUD):**
    *   Membuat, Membaca, Memperbarui, dan Menghapus (CRUD) data event.

---

## Teknologi yang Digunakan

*   **Backend:** Node.js
*   **Framework:** Express.js
*   **Database:** MySQL
*   **Driver Database:** `mysql2`
*   **Manajemen Environment:** `dotenv`
*   **Development Tool:** `nodemon`

---

## Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/[username-anda]/[nama-repo-anda].git
    cd [nama-repo-anda]
    ```

2.  **Instal Dependencies**
    Pastikan Anda memiliki Node.js dan npm terinstal.
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    *   Salin file `.env.example` dan ubah namanya menjadi `.env`.
    *   Buka file `.env` dan isi semua variabel yang diperlukan.

4.  **Setup Database**
    *   Pastikan server MySQL Anda berjalan.
    *   Buat sebuah database baru dengan nama yang sama seperti yang Anda tulis di `DB_NAME`.
    *   Impor file `mbkm_backend_db.sql` yang ada di repositori ini ke dalam database yang baru saja Anda buat.

5.  **Jalankan Server**
    ```bash
    npm start
    ```
---

## Dokumentasi Endpoint API

Berikut adalah daftar semua endpoint yang tersedia.

### Auth

| Method | Endpoint | Deskripsi | Membutuhkan Token? | Contoh Body Request |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Mendaftarkan user baru. | Tidak | `{ "name": "User Baru", "email": "user@example.com", "password": "password123", "role": "organizer" }` |
| `POST` | `/auth/login` | Login untuk mendapatkan JWT. | Tidak | `{ "email": "user@example.com", "password": "password123" }` |
| `GET` | `/auth/me` | Mendapatkan profil user yang sedang login. | Ya | - |
| `POST` | `/auth/logout` | Logout. | Ya | - |

### Events

| Method | Endpoint | Deskripsi | Membutuhkan Token? | Contoh Body Request |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/events` | Membuat event baru (hanya admin/organizer). | Ya | `{ "title": "Judul Event", "description": "Deskripsi...", "venue": "Lokasi...", "start_datetime": "2025-09-01T10:00:00", "end_datetime": "2025-09-01T15:00:00" }` |
| `GET` | `/events` | Mendapatkan daftar semua event. | Tidak | - |
| `GET` | `/events/:id` | Mendapatkan detail satu event. | Tidak | - |
| `PUT` | `/events/:id` | Memperbarui event (hanya admin/organizer yang memiliki event tersebut). | Ya | `{ "title": "Judul Baru", "description": "...", "venue": "...", "start_datetime": "...", "end_datetime": "..." }` |
| `DELETE`| `/events/:id` | Menghapus event (hanya admin/organizer yang memiliki event tersebut). | Ya | - |