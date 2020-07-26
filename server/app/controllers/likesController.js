const Blog = require("../models/Blog");
const User = require("../models/User");

const likesController = {};

likesController.likeUnlike = (req, res) => {
  blogId = req.params.blogId;
  userId = req.user._id;
  Blog.findById(blogId, function (err, blog) {
    if (err || !blog) {
      res.status(400).json({ error: "can't like the post No such blog" });
    } else {
      if (req.user.likedPosts.includes(blogId)) {
        blog.likes -= 1;
        blog
          .save()
          .then((blog) => {
            User.updateOne({ _id: userId }, { $pull: { likedPosts: blog._id } })
              .then((user) => {
                User.findById(userId).then((user) => {
                  user.photo = undefined;
                  user.password = undefined;
                  user.loginCount = undefined;
                  res.json(user); /* res.json({ message: "liked post" }) */
                });
              })
              .catch((err) => res.status(400).json({ error: err }));
          })
          .catch((err) => res.status(400).json({ error: "cant unlike post" }));
      } else {
        blog.likes += 1;
        blog
          .save()
          .then((blog) => {
            User.updateOne(
              { _id: userId },
              { $addToSet: { likedPosts: blog._id } }
            )
              .then((user) => {
                User.findById(userId).then((user) => {
                  user.photo = undefined;
                  user.password = undefined;
                  user.loginCount = undefined;
                  res.json(user); /* res.json({ message: "liked post" }) */
                });
              })
              .catch((err) => res.status(400).json({ error: err }));
          })
          .catch((err) => res.status(400).json({ error: "cant like post" }));
      }
    }
  });
};

module.exports = likesController;

/* likesController.unlike = (req, res) => {
  blogId = req.params.blogId;
  userId = req.user._id;
  Blog.findById(blogId, function (err, blog) {
    if (err || !blog) {
      res.status(400).json({ error: "can't unlike the post No such blog" });
    } else {
      blog.photo = undefined;
      if (!req.user.likedPosts.includes(blogId)) {
        //res.json({ message: "unliked post already" });
        res.json(blog);
      } else {
        blog.likes -= 1;
        blog
          .save()
          .then((blog) => {
            User.updateOne({ _id: userId }, { $pull: { likedPosts: blog._id } })
              .then(
                (user) =>
                  res.json(blog)
              )
              .catch((err) => res.status(400).json({ error: err }));
          })
          .catch((err) => res.status(400).json({ error: "cant unlike post" }));
      }
    }
  });
}; */
