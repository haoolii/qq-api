import { Queue } from "bullmq";
import { connection, QueueName } from "./config";

export const CookeQueue = new Queue(QueueName.COOK_QUEUE, { connection });
export const TQueue = new Queue(QueueName.T_QUEUE, { connection });
