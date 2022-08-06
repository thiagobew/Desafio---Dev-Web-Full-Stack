import { createMocks } from "node-mocks-http";
import handler from "../../../pages/api/[kValue]";

beforeEach(() => {
  jest.restoreAllMocks(); // clears spyOn
  jest.resetAllMocks(); // clears createSession
});

describe("/api/[kValue]", () => {
  test("Other HTTP methods besides GET gets 405", async () => {
    expect.hasAssertions();
    const mockPost = createMocks({
      method: "POST",
    });
    await handler(mockPost.req, mockPost.res);
    expect(mockPost.res._getStatusCode()).toBe(405);

    const mockPut = createMocks({
      method: "PUT",
    });
    await handler(mockPut.req, mockPut.res);

    expect(mockPut.res._getStatusCode()).toBe(405);

    const mockDelete = createMocks({
      method: "DELETE",
    });
    await handler(mockDelete.req, mockDelete.res);

    expect(mockDelete.res._getStatusCode()).toBe(405);
  });

  test("Undefined kValue gets 400", async () => {
    expect.hasAssertions();
    const { res, req } = createMocks({
      method: "GET",
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test("Empty string gets 400", async () => {
    expect.hasAssertions();
    const { res, req } = createMocks({
      method: "GET",
      query: {
        kValue: "",
      },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test("Non-number kValue gets 400", async () => {
    expect.hasAssertions();
    const { res, req } = createMocks({
      method: "GET",
      query: {
        kValue: "*a",
      },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  // response must send "time" variable for all status 200 cases
  test("kValue less than 3 gets 200 and result is 0", async () => {
    expect.hasAssertions();
    for (let i = 2; i >= -1; i--) {
      const { res, req } = createMocks({
        method: "GET",
        query: {
          kValue: String(i),
        },
      });
      await handler(req, res);
      expect(res._getStatusCode()).toBe(200);
      expect(res._getJSONData().result).toBe(0);
      expect(res._getJSONData().time).toBeDefined();
      jest.resetAllMocks();
    }
  });

  test("kValue 5 gets 200 and result is 1", async () => {
    expect.hasAssertions();
    const { res, req } = createMocks({
      method: "GET",
      query: {
        kValue: "5",
      },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().result).toBe(1);
    expect(res._getJSONData().time).toBeDefined();
  });
});
