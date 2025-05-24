import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import QQ from './qq';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/qq', QQ);

export default router;
