# Mock Test Binar - Todo App

## Answer The Questions

1. Apakah Kegunaan JSON pada REST API?
   JSON atau JavaScript Object Notation merupakan format data untuk transaksi data yang mudah di baca dan di uraikan oleh mesin. Sementara REST API merupakan arsitektur client-server yang menggunakan protokol HTTP (Dell Technologies)
2. Jelaskan bagaimana REST API bekerja
   REST API bekerja menggunakan metode HTTP seperti GET, POST, PUT, DELETE yang browser dapat gunakan untuk mengakses sebuah website. Komunikasi antara client dan server terjadi melalui request dan response dari HTTP. Setiap request harus stateless, dimana server tidak menyimpan state informasi dari applikasi. Namun, request dari client yang mengandung seluruh informasi yang di butuh kan oleh server. (Dell Technologies)

## API Features

### `User Route`

#### Get All User

`get` &nbsp; http://localhost:9002/api/user

#### Login

`post` &nbsp; http://localhost:9002/api/login

### `Todo Route`

#### Create todo for a user

`post` &nbsp; http://localhost:9002/api/todo/:userId

#### Delete todo for a user

`delete` &nbsp; http://localhost:9002/api/todo/:userId

## Link

-   Client
    https://mock-test-client-ramdan.vercel.app
-   Server
    https://mock-test-server-ramdan.vercel.app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode in http://localhost:9002.

### `npm run build`

Builds the app for production to the `dist` folder.
