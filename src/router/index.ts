import express from 'express';

const router = express.Router();

router.get('/age_validator', (req, res) => {
  res.json({ message: 'No drinks for you' });
});

router.get('business_hours', (req, res) => {
  res.json({ message: 'Open for business' });
});

export default router;
