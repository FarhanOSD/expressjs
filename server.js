import express from 'express';
import path from 'path';
import posts from './routes/post.js';
import logger from './Middleware/logger.js';
import errorHandler from './Middleware/error.js';
const app = express();

const port = process.env.PORT || 3000;


// Uncomment and configure if you need to serve static files
// app.use(express.static(path.join(__dirname, "public")));

// Uncomment and configure if you need to serve HTML files
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// app.get('/bye', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "name.html"));
// });

app.use(logger); // Add this middleware to log requests

// Middleware to parse JSON (if needed for other routes)
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

app.use('/api/posts', posts)

app.use(errorHandler); // Add this middleware to handle errors

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
