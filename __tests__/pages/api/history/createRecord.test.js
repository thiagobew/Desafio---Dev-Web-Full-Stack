import { createMocks } from "node-mocks-http";
import handler from "../../../../pages/api/history/createRecord";
import prisma from "../../../../prisma/prisma";

beforeEach(() => {
  jest.restoreAllMocks(); // clears spyOn
  jest.resetAllMocks();
});

describe("/api/history/createRecord", () => {
  test("Other HTTP methods besides POST gets 405", async () => {
    expect.hasAssertions();
    const mockGet = createMocks({
      method: "GET",
    });
    await handler(mockGet.req, mockGet.res);
    expect(mockGet.res._getStatusCode()).toBe(405);

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

  test("POST returns 200", async () => {
    expect.hasAssertions();
    jest
      .spyOn(prisma.Record, "create")
      .mockImplementation(() => "Objeto retornado");
    const { res, req } = createMocks({
      method: "POST",
    });

    await handler(req, res);
    expect(prisma.Record.create).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
  });

  test("Exception gets 500", async () => {
    expect.hasAssertions();
    jest.spyOn(prisma.Record, "create").mockImplementation(() => {
      throw new Error("Error");
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const { res, req } = createMocks({
      method: "POST",
    });

    await handler(req, res);
    expect(console.error).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(500);
  });
});
