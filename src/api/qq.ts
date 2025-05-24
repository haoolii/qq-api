import express, { Request } from "express";
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

// 回傳型別
type QQResponse = {
  id: string;
};

// POST 請求 body 的型別
interface QQRequestBody {
  message: string;
  userId: number;
}

// POST 指定 req.body 型別
router.post<{}, MessageResponse<QQResponse>, QQRequestBody>("/", (req, res) => {
  const { message, userId } = req.body;
  return res.json({
    data: {
      id: "",
    },
    code: "0",
    message: "",
  });
});

export default router;
