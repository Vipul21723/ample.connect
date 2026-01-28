require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("API working 🚀");
});


app.post("/user-post-to-db", async (req,res) => {

  const { user_name, amp_tag_name, post_content } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.user_post_data (user_name, amp_tag_name, post_content) VALUES ($1, $2, $3) RETURNING *`,[user_name, amp_tag_name, post_content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("DB Error")
  }
})


app.get("/post", async (req,res) => {
  try {
    // const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    const result = await pool.query(
      `SELECT id, user_name, amp_tag_name, post_content, TO_CHAR(created_at, 'HH:MI AM') AS time, TO_CHAR(created_at, 'DD Mon YYYY') AS date FROM public.user_post_data ORDER BY id DESC`
    )
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DataBase Error"})
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

