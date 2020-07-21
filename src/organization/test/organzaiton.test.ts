const initDB = require("../db/db").initDB;
const request = require("supertest");
const { app, startApp } = require("../app");

describe("Organization", () => {
  beforeEach(async () => {
    //@ts-ignore
    global.testing = true;
    //@ts-ignore
    global.staging = false;
  });

  it("should return an array of orgs", async (done) => {
    await initDB();

    const res = await request(app)
      .get("/organization/")
      .set("Accept", "application/json");
    expect(res.body).toEqual(true);
    done();
  });
});
