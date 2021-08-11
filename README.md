# B_LUCID_express

The backend for the B-LUCID web app.

  Models:
    User:
      username
      email
      password
    Post:
      title
      file
      fileType
      user
      likes
      comments
    Comment:
      author
      body
      postRef
    
Routes:
  Users:
    GET /users/logout
    POST /users/register
    POST /users/login
    GET /users/userID
  Posts:
    DELETE /posts/comment/commentID
    GET /posts/user/userUD
    DELETE /posts/delete/PostID
    PUT /posts/edit/postID
    POST /posts/decrement-like/postID
    POST /posts/increment-like/postID
    POST /posts/upload
    GET /posts/firstPostIndex/lastPostIndex
