import { experience, careerMonths } from '@/data/experience';

export default function handler(req, res) {
  res.status(200).json({ totalMonths: careerMonths(new Date()), experience });
}
