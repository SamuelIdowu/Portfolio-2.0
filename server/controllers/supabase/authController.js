const supabase = require("../../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if user exists in Supabase
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      console.error('Supabase error fetching user:', error);
      return res.status(500).json({ error: "Server error" });
    }

    if (!users) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, users.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: users.id, 
        username: users.username, 
        role: users.role 
      },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Create admin user (for initial setup)
exports.createAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if admin already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const { data, error } = await supabase
      .from('users')
      .insert([{
        username,
        email,
        password_hash: hashedPassword,
        role: 'admin'
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating admin:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ 
      message: "Admin user created successfully",
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      }
    });
  } catch (err) {
    console.error('Create admin error:', err);
    res.status(500).json({ error: "Server error" });
  }
};
