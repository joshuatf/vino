import express from 'express';
import { AgeValidator } from '../services/AgeValidator';
import { BusinessHours } from '../services/BusinessHours';

const router = express.Router();

router.get('/age_validator', (req, res) => {
  if ( ! req.query.dob ) {
    res.json({ message: 'Please provide a DOB' });
  }

  const dob = req.query.dob!.toString();
  try {
    const valid = AgeValidator.validateDrinkingAge( dob );
    res.json({ message: valid ? 'Bottoms up' : 'No drinks for you' });
  } catch (error:any) {
    res.json({ message: error.message });
  }
});

router.get('/business_hours', (req, res) => {
  if ( ! req.query.start || ! req.query.end ) {
    res.json({ message: 'Please provide a start and end date' });
  }

  try {
    const hours = BusinessHours.getNumberOfBusinessHours( req.query.start!.toString(), req.query.end!.toString() );
    res.json({ data: hours });
  } catch (error:any) {
    res.json({ message: error.message });
  }
});

export default router;
