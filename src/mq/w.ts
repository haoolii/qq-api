import { Worker } from "bullmq";
import { connection, QueueName } from "./config";
import db from "../db";
import { STATUS } from "../constant";
import { CookeQueue, TQueue } from "./q";

new Worker(
  QueueName.COOK_QUEUE,
  async (job) => {
    if (job.name === "NEW_REQUEST") {
      const record = await db.request.create({
        data: {
          status: STATUS.INIT,
          content: job.data.content,
        },
      });

      TQueue.add(
        "CHECK_THIRD_PARTY_REQUEST",
        { trackingId: "abc123" },
        {
          attempts: 5, // 最多重試 5 次（總共會執行 6 次）
          backoff: {
            type: "fixed",
            delay: 5000,
          },
          removeOnComplete: true,
          removeOnFail: true,
        }
      );
    }
    return true;
  },
  { connection }
);

const delay = (ts: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ts);
  });
};

new Worker(
  QueueName.T_QUEUE,
  async (job) => {
    if (job.name === "CHECK_THIRD_PARTY_REQUEST") {
      await delay(1000);
      console.log('job name', job.name);
      console.log('job data', job.data);
      throw new Error("還沒好");
    }
    return true;
  },
  { connection }
);
