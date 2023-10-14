import { NextApiRequest, NextApiResponse } from 'next';
import { PUT, DELETE } from './controllers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        await PUT(req, res);
    } else if (req.method === 'DELETE') {
        await DELETE(req, res);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
