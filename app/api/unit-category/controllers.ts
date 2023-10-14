import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const unitCategoryModel = prisma.unitCategory;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdUnitCategory = await unitCategoryModel.create({
      data: req.body,
    });
    res.status(201).json(createdUnitCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const unitCategories = await unitCategoryModel.findMany({
      include: {
        units: true,
      },
    });
    res.status(200).json(unitCategories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  } finally {
    await prisma.$disconnect();
  }
}
