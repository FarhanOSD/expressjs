const errorHandler = (err, req, res) => {
  if (err.status) {
    res.status(err.status).json({msg: err.message});
  }else
  {res.status(500).json({ msg: err.massage });}
};

export default errorHandler