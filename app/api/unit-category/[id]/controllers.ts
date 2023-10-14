import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { UnitCategory } from '@prisma/client';

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    const { name } = req.body;

    try {
        const updatedCategory = await prisma.unitCategory.update({
            where: { id },
            data: { name },
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update unit category' });
    }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    try {
        const deletedCategory: UnitCategory = await prisma.unitCategory.delete({
            where: { id },
        });

        res.status(200).json(deletedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete unit category' });
    }
}
