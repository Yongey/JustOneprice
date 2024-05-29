const express = require('express');

const router = express.Router();
const giftModel = require('../models/giftModel');


router.get('/', async (req, res) => {
  const gifts = await giftModel.getAllGifts();
  res.json(gifts);
});


router.post('/:gift_id/purchase', async (req, res) => {
  const { gift_id } = req.params;
  const { userid, score } = req.body;


  const newScore = score - await giftModel.getGiftScoreCost(gift_id);


  await giftModel.updateUserScore(userid, newScore);

  res.status(200).json({ success: true });
});

module.exports = router;