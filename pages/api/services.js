import { getServices } from '@/data/services';
import { careerYears } from '@/data/experience';

export default function handler(req, res) {
  res.status(200).json(getServices(careerYears(new Date())));
}
