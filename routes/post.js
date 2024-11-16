import express from 'express';

const routes = express.Router();


let posts = [
  { id: 1, title: 'post One' },
  { id: 2, title: 'post Two' },
  { id: 3, title: 'post Three' },
  { id: 4, title: 'post Four' },
];



routes.get('/', (req, res) => {
  // Corrected: Use req.query instead of res.qurey
  const limit = parseInt(req.query.limit, 10); // Added radix 10 for parseInt

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

routes.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Added radix 10 for parseInt

  const post = posts.find(post => post.id === id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post not found ${id}` });
  }
});

routes.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) { 
    return res.status(400).json({ message: 'plz include a title' })
  }
  posts.push(newPost);
  res.status(201).json(posts)
});
 
routes.put('/:id', (req, res) => { 
  const id = parseInt(req.params.id, 10); // Added radix 10 for parseInt
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ message: `Post not found ${id}` });
  }
  post.title = res.body.title;
  res.status(200).json(posts);
});
routes.delete('/:id', (req, res) => { 
  const id = parseInt(req.params.id, 10); // Added radix 10 for parseInt
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post not found ${id}`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id)
  res.status(200).json(posts);
});

export default  routes;

