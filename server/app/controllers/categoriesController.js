const Category = require("../models/Category");
const Blog = require("../models/Blog");
const slugify = require("slugify");
const { errorHandler } = require("../../utils/dbErrorHandler");

const categoriesController = {};

//create a new category
categoriesController.create = (req, res) => {
  const { name } = req.body;
  console.log("req.body", req.body);
  const slug = slugify(name).toLowerCase();
  const category = new Category({ name, slug });
  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

//list all categories
categoriesController.list = (req, res) => {
  Category.find({})
    .exec()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

//get a single category
categoriesController.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOne({ slug })
    .exec()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

//get single category and its associated blogs
categoriesController.readAssociatedBlogs = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Category.findOne({ slug })
    .exec()
    .then((category) => {
      //res.json(category);
      Blog.find({ categories: category })
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
        .then((blogs) => res.json({ category, blogs, size: blogs.length }))
        .catch((err) => res.status(400).json({ error: errorHandler(err) }));
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

//remove a category
categoriesController.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({ slug })
    .exec()
    .then(() => {
      res.json({ message: "Category deleted succesfully" });
    })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) });
    });
};

module.exports = categoriesController;
