const Tag = require("../models/Tag");
const Blog = require("../models/Blog");
const slugify = require("slugify");
const { errorHandler } = require("../../utils/dbErrorHandler");

const tagsController = {};

tagsController.create = (req, res) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();
  const tag = new Tag({ name, slug });
  tag
    .save()
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

tagsController.list = (req, res) => {
  Tag.find({})
    .exec()
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

tagsController.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug })
    .exec()
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

tagsController.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug })
    .exec()
    .then(() => {
      res.json({ message: "Category deleted succesfully" });
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

//get single category and its associated blogs
tagsController.readAssociatedBlogs = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Tag.findOne({ slug })
    .exec()
    .then((tag) => {
      //res.json(category);
      Blog.find({ tags: tag })
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "_id title slug excerpt categories postedBy tags createdAt updatedAt"
        )
        .exec()
        .then((blogs) => res.json({ tag, blogs, size: blogs.length }))
        .catch((err) => res.status(400).json({ error: errorHandler(err) }));
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

module.exports = tagsController;
