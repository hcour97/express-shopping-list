process.env.NODE_ENV = "test";
const { restart } = require("nodemon");
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let item = { name: "apples", price: 5 }

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});

describe("GET /items", async function () {
    test("gets a list of items", async function() {
        const resp = await request.app.get(`/items`);
        const {items} = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", async function() {
    test("gets a single name", async function() {
        const resp = await request.app.get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });
    test("If item not found, respond with 404", async function() {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /items", async function() {
    test("Creates a new item", async function () {
        const response = await request(app)
            .post(`/items`)
            .send({
                name: "Banana",
                price: 1,
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).toEqual("Banana");
        expect(response.body.item.price).toEqual(1);
    });
})

describe("PATCH /items/:name", async function () {
    test("Updates a single item", async function () {
        const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: Orange
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({
            name: "Orange"
        });
    });
    test("If item not found, respond with 404", async function() {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
})

describe("DELETE /items/:name", async function () {
    test("Deletes a single item", async function () {
        const response = await request(app)
        .delete(`items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Item Deleted." })
    })
})