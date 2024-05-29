const pool = require('../database');


const updatePoints = async (userid, newPoints) => {
  try {
    const result = await pool.query(
      'UPDATE users SET points = $1 WHERE userid = $2 RETURNING *',
      [newPoints, userid]
    );
    
    return result.rows[0]; 
  } catch (error) {
    console.error('Error updating points:', error.message);
    throw error;
  }
};

module.exports = { updatePoints };
