import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
// create prisma client and add configuration if necessary
const prisma = new PrismaClient();

// GET Users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// GET User
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
      include: {
        tasks: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id:${id} does not exists` });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// POST User
export const createUser = async (req, res) => {
  try {
    // get data from request object
    const { name, email, password, avatar } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
      },
      omit: {
        password: true,
      },
    });
    // send response
    return res.status(200).json({ message: "Created Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// PATCH User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, newPassword, avatar } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    // // initial hashed password
    let hashedPassword = user.password;

    if (newPassword) {
      // update hashed password if new password exists
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
      },
      omit: {
        password: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// DElETE User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    return res.status(200).json({ message: "Deleted Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// Register User
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
    return res.status(200).json({ message: "Registered", user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const isPass = await bcrypt.compare(password, user.password);
    if (user && isPass) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ message: "Logged In", email: user.email, token: token });
    } else return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
