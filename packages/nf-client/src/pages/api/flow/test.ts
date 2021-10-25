import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(404).end();
  }
  res.status(200).json({ name: 'Guy' });
};
