const pool = require('../database');

exports.getAllGifts = async () => {
  const result = await pool.query('SELECT * FROM giftcatalog');
  return result.rows;
}

exports.getGiftScoreCost = async (gift_id) => {
  const result = await pool.query('SELECT score_cost FROM giftcatalog WHERE gift_id = $1', [gift_id]);
  return result.rows[0].score_cost;
}

exports.updateUserScore = async (userid, newScore) => {
  await pool.query('UPDATE users SET score = $1 WHERE user_id = $2', [newScore, userid]);
}