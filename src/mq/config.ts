import "dotenv/config";

export const connection = {
  host: process.env.REDIS_URL,
  port: 6379
};

export enum QueueName {
    COOK_QUEUE = 'COOK_QUEUE',
    T_QUEUE = 'T_QUEUE'
}
