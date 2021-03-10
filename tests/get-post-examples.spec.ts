import { it, describe, afterAll, expect } from "@playwright/test";
import { ororo } from "../lib/helpers/credentials";

import { getRequest, postRequest } from "../lib/helpers/helpers";

describe("GET and POST requests example", () => {
  it("Test ability to get request", async ({}) => {
    const response = await getRequest(ororo.URL);
    expect(response.status).toBe(200);
  });

  it("Test ability to post request", async ({}) => {
    const response = await postRequest(
      `${ororo.URL}/en/users/sign_in.json`,
      `utf8=✓&&user[email]=${ororo.EMAIL}&user[password]=${ororo.PASSWORD}`
    );
    expect(response.status).toBe(200);
  });
});
