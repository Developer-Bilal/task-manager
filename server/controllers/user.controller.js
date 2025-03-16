import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET Users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// POST User
export const createUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
      },
    });
    res.status(200).json({ message: "Created Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, avatar } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        password,
        avatar,
      },
    });
    res.status(200).json({ message: "Updated Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Deleted Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
