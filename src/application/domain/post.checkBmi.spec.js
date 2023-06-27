const Post = require("../../database/post-checkBmi");
const { posts } = require("../../../test/fixtures/checkBmi");
const { createPost } = require("./post.checkBmi");

describe("createPost()", () => {
  it("should return inserted checkBmi", async () => {
    jest.spyOn(Post, "create").mockResolvedValue(posts[0]);
    const response = await createPost(posts[0]);
    expect(response.status).toBe(200);
    expect(response.data).toBe(posts[0]);
  });
});