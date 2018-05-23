let postId = 1;

const posts = [
  {
    id: 1,
    title: "제목",
    body: "내용"
  }
];
/*----------------------------------------------------------- */
/* 1. 포스트 작성
   POST /api/posts
   { title, body } */
exports.write = ctx => {
  const { title, body } = ctx.request.body;

  postId += 1;

  const post = { id: postId, title, body };
  posts.push(post); // 업데이트
  ctx.body = post;
};

/*----------------------------------------------------------- */
/* 2. 포스트 목록 조회
   GET /api/posts */
exports.list = ctx => {
  ctx.body = posts;
};

/*----------------------------------------------------------- */
/* 3. 특정 포스트 조회
   GET /api/posts/:id */
exports.read = ctx => {
  const { id } = ctx.params;

  const post = posts.find(p => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨 포스트가 존재하지 않습니다."
    };
    return;
  }
  ctx.body = post;
};

/*----------------------------------------------------------- */
/* 4. 특정 포스트 제거
   DELETE /api/posts/:id */
exports.remove = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨 포스트가 존재하지 않습니다."
    };
    return;
  }

  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/*----------------------------------------------------------- */
/* 5.포스트 수정 (교체)
  PUT /api/posts/:id
  { title, body } */
exports.replace = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨 포스트가 존재하지 않습니다."
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body
  };
  ctx.body = posts[index];
};

/*----------------------------------------------------------- */
/* 6. 포스트 수정 (특정 필드 변경)
   PATCH /api/posts/:id
   { title, body } */
exports.update = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "치킨 포스트가 존재하지 않습니다."
    };
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body
  };
  ctx.body = posts[index];
};
/*----------------------------------------------------------- */
