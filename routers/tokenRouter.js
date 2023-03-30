const Router = require("express");
const tokenController = require("../controllers/tokenController");

const router = new Router();

router.delete("/:id", tokenController.deleteOne);

module.exports = router;

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQG1haWwucnUiLCJpZCI6MzUsImlzQWN0aXZhdGVkIjpudWxsLCJpYXQiOjE2ODAwMDQ1OTAsImV4cCI6MTY4MDAwNjM5MH0.RMxKSWZroQ2vl3bLyCPIC2XGn4haWK9nanKIWJEa0Jk",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQG1haWwucnUiLCJpZCI6MzUsImlzQWN0aXZhdGVkIjpudWxsLCJpYXQiOjE2ODAwMDQ1OTAsImV4cCI6MTY4MDE3NzM5MH0.WqKjnKCcahODUQgYp_Mh6ydvQY5KUJRxgScepZp-buw",
// "user": {
//     "email": "super@mail.ru",
//     "id": 35,
//     "isActivated": null
// }
// }
