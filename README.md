# nestjs-rabbitmq-example

This repository is a example of use RabbitMQ with request/reply pattern by nestjs framework

## Prerequest

```shell
pnpm i @nestjs/microservices -S
pnpm i @nestjs/config -S
pnpm i -S amqplib  amqp-connection-manager
pnpm i -S joi
```

## Message Pattern vs Event Pattern

Event Pattern is asynchronized 

Message Pattern is synchronized

![](./messag-pattern.png)

當使用 Event Pattern 時， Consumer Service 如果不在線不影響整個服務

當使用 Message Pattern 時，接收訊息的那方必須在線，否則會被 block 至 timeout

## 啟動 rabbitmq

```shell
export RABBITMQ_DEFAULT_USER=user
export RABBITMQ_DEFAULT_PASS=rabbitmq
export RABBITMQ_ERLANG_COOKIE=cookie
docker compose up -d
```

這樣就會設定 rabbitmq 預設的 admin 帳密

## service 設置

### 啟動 producer
設定 .env
```shell
RABBITMQ_URI=amqp://user:rabbitmq@localhost:5672
QUEUE_NAME=orders-queue
```

```shell
pnpm start:dev producer
```

### 啟動 consumer
設定 .env
```shell
RABBITMQ_URI=amqp://user:rabbitmq@localhost:5672
QUEUE_NAME=orders-queue
```

```shell
pnpm start:dev producer
```

## 觀察

可以透過 進入 rabbitmq 後台 觀察 connection 與各種狀況


## end points

producer 一共兩個 endpoints

| Method | URI | Request 參數 | Request 參數位置 |
|--------|-----|-------------|-----------------|
| POST   | /orders/place-orders | order 物件 | request body |
| GET    | /orders/fetch-orders | 無         |              |