const Blog = require("../models/Blog");

const authorization = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({ slug })
      .populate("postedBy", "_id")
      .then((blog) => {
        if (!blog) {
          return res.status(400).json({ error: "Not authorized" });
        } else if (blog.postedBy._id.toString() === req.user._id.toString()) {
          next();
        } else {
          return res.status(400).json({ error: "Not authorized" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: "Not authorized" });
      });
  }
};

module.exports = {
  authorization,
};
