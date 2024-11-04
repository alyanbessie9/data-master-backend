import express from "express";
import db from "../config/config.js"; // Pastikan ini mengimpor instance Firestore yang benar
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Impor fungsi yang diperlukan dari Firestore

const router = express.Router();

// Create User (Add Mahasiswa with npm, nama, kelas, and password)
router.post("/", async (req, res) => {
  try {
    const { npm, nama, kelas, password } = req.body;
    const user = { npm, nama, kelas, password };
    const docRef = await addDoc(collection(db, "mahasiswa"), user);
    res.status(201).send({ id: docRef.id, ...user });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).send({ message: "Error adding user", error });
  }
});

// Read Users (Get All Mahasiswa)
router.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "mahasiswa"));
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(400).send({ message: "Error fetching users", error });
  }
});

// Update User (Update Mahasiswa by ID)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = doc(db, "mahasiswa", id);

    // Update the user with the new data
    await updateDoc(userRef, req.body);
    res.status(200).send({ id, ...req.body }); // Return the updated user
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send({ message: "Error updating user", error });
  }
});

// Delete User (Delete Mahasiswa by ID)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = doc(db, "mahasiswa", id);

    // Check if the user exists before trying to delete
    const docSnap = await getDocs(collection(db, "mahasiswa"));
    const userExists = docSnap.docs.some((doc) => doc.id === id);

    if (!userExists) {
      return res.status(404).send({ message: "User not found" });
    }

    await deleteDoc(userRef);
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send({ message: "Error deleting user", error });
  }
});

// Login User (Authenticate Mahasiswa by npm and password)
router.post("/login", async (req, res) => {
  try {
    const { npm, password } = req.body;
    const snapshot = await getDocs(collection(db, "mahasiswa"));
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const user = users.find((u) => u.npm === npm && u.password === password);

    if (user) {
      res.status(200).send({ id: user.id, ...user });
    } else {
      res.status(401).send({ message: "Invalid npm or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(400).send({ message: "Error logging in user", error });
  }
});

export default router;
