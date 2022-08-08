import { createMocks } from "node-mocks-http";
import handler from "../../../../pages/api/history/[deleteId]";
import prisma from "../../../../prisma/prisma";

beforeEach(() => {
  jest.restoreAllMocks(); // clears spyOn
  jest.resetAllMocks();
});

describe("/api/history/[deleteId]", () => {
  test("Other HTTP methods besides DELETE gets 405", async () => {
    expect.hasAssertions();
    const mockGet = createMocks({
      method: "GET",
    });
    await handler(mockGet.req, mockGet.res);
    expect(mockGet.res._getStatusCode()).toBe(405);

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
  });

  test("No id in query gets 400", async () => {
    expect.hasAssertions();
    const { res, req } = createMocks({
      method: "DELETE",
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test("DELETE returns 200", async () => {
    expect.hasAssertions();
    jest.spyOn(prisma.Record, "delete").mockImplementation(() => {
      return { count: 1 };
    });
    const { res, req } = createMocks({
      method: "DELETE",
      query: {
        deleteId: "1",
      },
    });

    await handler(req, res);
    expect(prisma.Record.delete).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
  });

  test("Exception gets 500", async () => {
    expect.hasAssertions();
    jest.spyOn(prisma.Record, "delete").mockImplementation(() => {
      throw new Error("Error");
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const { res, req } = createMocks({
      method: "DELETE",
      query: {
        deleteId: "1",
      },
    });

    await handler(req, res);
    expect(console.error).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(500);
  });
});
