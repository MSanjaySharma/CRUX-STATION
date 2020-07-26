const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");

const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const { errorHandler } = require("../../utils/dbErrorHandler");
const { blogExcerpt } = require("../../utils/blogExcerpt");

blogsController = {};

//create a new blog
blogsController.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Minimum 200 characters required..content too short",
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required",
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = blogExcerpt(body, 500, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title}|${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;
    let pushCategories = categories && categories.split(",");
    let pushTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog
      .save()
      .then((dbBlog) => {
        Blog.findByIdAndUpdate(
          dbBlog._id,
          { $push: { categories: pushCategories } },
          { new: true }
        )
          .exec()
          .then(() => {
            Blog.findByIdAndUpdate(
              dbBlog._id,
              { $push: { tags: pushTags } },
              { new: true }
            )
              .exec()
              .then((updatedBlog) => res.json(updatedBlog))
              .catch((err) =>
                res.status(400).json({ error: "errorHandler(err)1" })
              );
          })
          .catch((err) =>
            res.status(400).json({ error: "errorHandler(err)2 " })
          );
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: "errorHandler(err)3" });
      });
  });
};

//list all blogs only
blogsController.list = (req, res) => {

  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt likes"
    )
    .exec()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//get all blogs, all categories, all tags
blogsController.listAllBlogsCategoriesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs, categories, tags;
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt likes"
    )
    .exec()
    .then((data) => {
      blogs = data;
      Category.find({})
        .exec()
        .then((data) => {
          categories = data;
          Tag.find({})
            .exec()
            .then((data) => {
              tags = data;
              res.json({ blogs, categories, tags, size: blogs.length });
            })
            .catch((err) => res.status(400).json({ error: errorHandler(err) }));
        })
        .catch((err) => res.status(400).json({ error: errorHandler(err) }));
    })
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//get a single blog
blogsController.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug body mtitle mdesc categories tags postedBy createdAt updatedAt likes"
    )
    .exec()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//delete blogs
blogsController.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndDelete({ slug })
    .exec()
    .then((data) => res.json({ message: "Blog deletion succesfull" }))
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//update a blog
blogsController.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .exec()
    .then((oldBlog) => {
      //console.log(oldBlog);
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;

      form.parse(req, (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            error: "Image could not be uploaded",
          });
        }

        let slugBeforeMerge = oldBlog.slug;
        oldBlog = _.merge(oldBlog, fields);
        oldBlog.slug = slugBeforeMerge;

        const { body, desc, categories, tags } = fields;

        if (body) {
          oldBlog.excerpt = blogExcerpt(body, 500, " ", "...");
          oldBlog.mdesc = stripHtml(body.substring(0, 160));
        }

        if (categories) {
          oldBlog.categories = categories.split(",");
        }

        if (tags) {
          oldBlog.tags = tags.split(",");
        }

        if (files.photo) {
          //console.log(files.photo.size);
          if (files.photo.size > 1000000) {
            return res.status(400).json({
              error: "Image should be less than 1MB in size",
            });
          }
          oldBlog.photo.data = fs.readFileSync(files.photo.path);
          oldBlog.photo.contentType = files.photo.type;
        }

        oldBlog
          .save()
          .then((dbBlog) => {
            Blog.find({ _id: dbBlog._id })
              .populate("categories", "_id name slug")
              .populate("tags", "_id name slug")
              .populate("postedBy", "_id name username")
              .select(
                "_id title slug excerpt categories tags postedBy createdAt updatedAt likes"
              )
              .exec()
              .then((data) => res.json(data))
              .catch((err) =>
                res.status(400).json({ error: errorHandler(err) })
              );
          })
          .catch((err) => {
            //console.log(err);
            res.status(400).json({ error: errorHandler(err) });
          });
      });
    })
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//get the photo for individual blog
blogsController.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .select("photo")
    .then((blogData) => {
      if (!blogData) {
        return res.status(400).json({ error: "blog Doesnt exist" });
      }
      if (!blogData.photo.data) {
        return res.status(400).json({ error: "photo doesnt exist" });
      }
      res.set("Content-Type", blogData.photo.contentType);
      return res.send(blogData.photo.data);
    })
    .catch((err) => res.status(400).json({ error: errorHandler(err) }));
};

//list all related blogs based on categories of a particular blog*********
blogsController.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, categories } = req.body;
  //console.log(req.body._id);
  //$ne- not including $in- including
  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate("postedBy", "_id name profile username")
    .select("title slug excerpt postedBy createdAt updatedAt likes")
    .exec()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json({ error: "Blogs not found" }));
};

//search blogs
blogsController.searchBlogs = (req, res) => {
  const { search } = req.query;
  if (search) {
    Blog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
      //title: { $regex: search, $options: "i" },
    })
      .select("-photo -body")
      .then((blogs) => {
        return res.json(blogs);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: errorHandler(err) });
      });
  }
};

module.exports = blogsController;
