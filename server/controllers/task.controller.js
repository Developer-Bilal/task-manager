import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// POST Task
export const createTask = async (req, res) => {
  try {
    const { text, status, ownerId } = req.body;
    const task = await prisma.task.create({
      data: {
        text,
        status,
        ownerId,
      },
    });
    res.status(200).json({ message: "Created Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, status, ownerId } = req.body;
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        text,
        status,
        ownerId,
      },
    });
    res.status(200).json({ message: "Updated Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Deleted Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
