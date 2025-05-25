import express, { Request } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import { upload } from "../upload";
import { parseChatContent } from "../utils/parse";
import db from "../db";
import { STATUS } from "../constant";
import { CookeQueue } from "../mq/q";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// 回傳型別
type QQResponse = {
  id: string;
};

interface QQRequestBody {
  message: string;
  userId: number;
}

router.post<{}, MessageResponse<QQResponse>, QQRequestBody>(
  "/",
  upload.single("content"),
  async (req, res) => {
    if (req.file) {
      const content = req.file.buffer.toString("utf-8");
      const newContent = parseChatContent(content, 500);

      const id = uuidv4();

      CookeQueue.add(
        "NEW_REQUEST",
        {
          id,
          content: newContent.formattedText,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        }
      );

      return res.json({
        data: {
          id,
        },
        code: "0",
        message: "Success",
      });
    }

    return res.json({
      code: "1",
      message: "Error",
    });
  }
);

export default router;
