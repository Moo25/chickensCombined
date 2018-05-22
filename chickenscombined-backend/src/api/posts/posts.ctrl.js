let postId = 1;

const posts = [
  {
    id: 1,
    title: "치킨이름",
    body: "치킨설명"
  }
];

// 치킨 포스트 write POST /api/posts
exports.write = ctx => {
  console.log("hihihihihihih");
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post); //
  ctx.body = post;
};

// 치킨 포스트 list 조회 GET /api/posts */
exports.list = ctx => {
  ctx.body = posts;
};

// 특정 치킨 포스트 조회 GET /api/posts/:id
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨이 존재하지 않습니다"
    };
    return;
  }
  ctx.body = post;
};

exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨이 존재하지 않습니다"
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

// 포스트 수정,교체 PUT /api/posts/:id
exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨이 존재하지 않습니다"
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.requestbody
  };
  ctx.body = posts[index];
};

// 포스트 수정 PATCH /api/posts/:id
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨이 존재하지 않습니다"
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body
  };
  ctx.body = posts[index];
};
