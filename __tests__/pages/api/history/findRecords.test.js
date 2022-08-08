import { createMocks } from "node-mocks-http";
import handler from "../../../../pages/api/history/findRecords";
import prisma from "../../../../prisma/prisma";

beforeEach(() => {
  jest.restoreAllMocks(); // clears spyOn
  jest.resetAllMocks();
});

describe("/api/findRecords", () => {
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

  test("GET returns 200", async () => {
    expect.hasAssertions();
    jest
      .spyOn(prisma.Record, "findMany")
      .mockImplementation(() => "Objeto retornado");
    const { res, req } = createMocks({
      method: "GET",
    });

    await handler(req, res);
    expect(prisma.Record.findMany).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
  });

  test("Exception gets 500", async () => {
    expect.hasAssertions();
    jest.spyOn(prisma.Record, "findMany").mockImplementation(() => {
      throw new Error("Error");
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const { res, req } = createMocks({
      method: "GET",
    });

    await handler(req, res);
    expect(console.error).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(500);
  });
});
