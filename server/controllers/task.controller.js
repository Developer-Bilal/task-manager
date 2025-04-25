import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET Single Task
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// POST Task
export const createTask = async (req, res) => {
  try {
    const { text, status, priority, dueDate, ownerId } = req.body;
    const task = await prisma.task.create({
      data: {
        text,
        status,
        priority,
        dueDate,
        owner: {
          connect: {
            id: Number(ownerId),
          },
        },
      },
    });
    res.status(200).json({ message: "Created Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, status, priority, dueDate } = req.body;
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        text,
        status,
        priority,
        dueDate,
      },
    });
    res.status(200).json({ message: "Updated Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
