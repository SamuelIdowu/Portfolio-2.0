const express = require("express");
const router = express.Router();
const { login, createAdmin } = require("../controllers/supabase/authController");

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/create-admin (for initial setup)
router.post("/create-admin", createAdmin);

module.exports = router;
