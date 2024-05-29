const pool = require('../database');

const getRedemptionHistory = async (userId) => {
  try {
    const query = 'SELECT * FROM redemption_history WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error getting redemption history:', error.message);
    throw error;
  }
};

module.exports = { getRedemptionHistory };
