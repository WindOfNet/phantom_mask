# Response

## 啟動 DB 與 APP

`docker-compose up`

## 執行 ETL

於環境變數設定(或建立 .env)變數:

```
# docker-compose 預設
DB_HOST=localhost
DB_USER=root
DB_PWD=123
DB_DATABASE=test
```

於 /etl 執行 npm install && node .

## API docs

app 啟動後於瀏覽器網址: http://localhost:3000/api-docs (以 docker-compose 預設)
