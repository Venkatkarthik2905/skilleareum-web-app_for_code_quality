const jwt = require('jsonwebtoken');
const { executeQuery } = require('./Db');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = 'nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7'; // Use the same key used to sign the token

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    // Fetch the latest status from the database to ensure JWT value isn't stale
    const userId = decoded.userId || decoded.id; // Support both common payload formats
    if (userId) {
      try {
        const [userData] = await executeQuery(
          'SELECT current_program, apprentice_completed, genesis_completed FROM users_data WHERE id = ?',
          [userId]
        );

        if (userData && userData.current_program) {
          let effectiveProgram = userData.current_program;

          // Progression-based Gating:
          // If the database says Genesis but the Apprentice program is not marked as completed,
          // we force the user back into the Apprentice context for the 7-day foundation.
          if (effectiveProgram === 'genesis' && !userData.apprentice_completed) {
            effectiveProgram = 'apprentice';
          }

          req.user.program_type = effectiveProgram;
          req.user.apprentice_completed = userData.apprentice_completed;
          req.user.genesis_completed = userData.genesis_completed;
        } else {
          // If no user found or program set, default to apprentice for safety
          req.user.program_type = 'apprentice';
        }
      } catch (dbError) {
        console.error('Error fetching live program_type/status in middleware:', dbError);
        // On error, we retain the value from decoded token as fallback
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;