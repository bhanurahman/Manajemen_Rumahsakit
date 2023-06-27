const appointment = require("../../database/appointment");
const {
  posts,
} = require('../../../test/fixtures/appointment');
const {
    fetchPosts,
    createPost,
} = require('../domain/post.domain.appointment');

describe('src/application/domain/post.domain.appointment.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchPosts()', () => {
    it('sholud return all Appointment', async () => {
      jest.spyOn(appointment, 'find').mockResolvedValue(posts);
      const response = await fetchPosts();
      expect(response.data).toBe(posts);
    });
  });
  describe("createPost()", () => {
    it("should return inserted appointment", async () => {
      jest.spyOn(appointment, "create").mockResolvedValue(posts[0]);
      const response = await createPost(posts[0]);
      expect(response.status).toBe(200);
      expect(response.data).toBe(posts[0]);
    });
  });
});