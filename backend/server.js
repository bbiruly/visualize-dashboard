import app from "./app.js";
// PORT 
const PORT = process.env.PORT || 5000;
// LISTENING 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
