# CRUX STATION

A full-Stack multi-user Blogging platform to share blogs with the community.

### 🛠 Tech Stack - (MERN)

- 💻 JavaScript | ES6
- 🌐 NextJS | Node.js | Express.js | MongoDB
- 🔧 Git | Markdown
- 📦 [Material-UI](https://github.com/mui-org/material-ui), [bcrypt.js](https://www.npmjs.com/package/bcryptjs), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose), [redux](https://github.com/reduxjs/redux), [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper), [react-router-dom](https://www.npmjs.com/package/react-router-dom), [nprogress](https://www.npmjs.com/package/nprogress), [validator](https://www.npmjs.com/package/validator), [axios](https://www.npmjs.com/package/axios), [Formik](https://github.com/formium/formik), [redux-thunk](https://github.com/reduxjs/redux-thunk), [yup](https://github.com/jquense/yup), [redux-persist](https://github.com/rt2zz/redux-persist), [React-Quill](https://www.npmjs.com/package/react-quill), [react-render-html](https://www.npmjs.com/package/react-render-html), [slugify](https://www.npmjs.com/package/slugify), [express-validator](https://express-validator.github.io/), [formidable](https://www.npmjs.com/package/formidable), [shortid](https://www.npmjs.com/package/shortid), [string-strip-html](https://www.npmjs.com/package/string-strip-html), [lodash](https://lodash.com/), [morgan](https://www.npmjs.com/package/morgan), [moment.js](https://momentjs.com/) .

---

### DEMO

Open the [LIVE DEMO](https://crux-station.onrender.com) to try Crux Station yourself.

![cruxstation](https://user-images.githubusercontent.com/65958268/88467138-5cf19d80-cef1-11ea-8ccd-e36e8cc8c92d.gif)

---

### Features

- Authentication.
  - User must signup and signin to verify their identity to use the application.
  - Bcryptjs and JWT used for authentication.
  - Role management is implemented.
  - Route guarding is implemented for private routes.
  - Maximum allowed login per user is implemented.
- SEO Friendly
  - Content is rendered server side on first load to help web crawler bots index site.
  - NextJS server side rendering utilized.
- Categories
  - Blogs are associated with categories.
  - List of all categories on home page to for easier access.
  - List all blogs related to single category.
  - Admin users can perform CRUD on categories.
- Tags
  - Blogs are associated with tags.
  - List all blogs related to single tag.
  - Admin users can perform CRUD on tags.
- Blogs
  - Non authenticated can view the blogs.
  - Authenticated users can perform CRUD on blogs written by them.
  - Each blog can is indexed to be searched easily.
  - Rich content text editor is provided for creating new blog.
  - Blogs list sorted to show latest posts first.
- User Profile
  - Users have access to moderate their public profile
- Blogs Search
  - search bar is available in all pages.
  - search key words are searched against blog body and titles to narrow to relevant results
- Commenting
  - Disqus commenting system implemented.
  - Autheticated users can comment on the individual blogs.
- Likes
  - Autheticated users can like and unlike posts.
  - Non-Authenticated users will be greeted with dialog to signup.
- Content Moderation
  - Privelaged admin users can moderate the content quality of blogs over time.
  - Admin users can take down blogs based on voilation of rules.
- Dark Mode
  - Dark Mode implemented using the materialUI theming.
- Infinite Scroll
  - Infinite scroll implemented on blogs list.

### Contributors

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/MSanjaySharma"><img src="https://avatars3.githubusercontent.com/u/65958268?s=40" alt="M Sanjay Sharma" /></a></br>
[M Sanjay Sharma](https://github.com/MSanjaySharma)

### License

[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/MSanjaySharma/CRUX-STATION/blob/master/LICENSE)

