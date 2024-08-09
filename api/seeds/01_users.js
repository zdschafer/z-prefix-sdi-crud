/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first: "Steve", last: "Rogers", username: "steverogers", password: "$2a$10$eA4S.0EQQp7aNu1me8bFv.E88q1YhvT3p8RxhlJ32oG7/ofIFBusi"},
    {first: "Tony", last: "Stark", username: "tonystark", password: "$2a$10$199zFy7/dHW7tK3ojk7Vd.hNKFQVtpm2BUyID9nq2DVMCLsHIa3XW"},
    {first: "Thor", last: "Odinson", username: "thorodinson", password: "$2a$10$0s5JmT9biA.amWXLH7xC7.U6uMJCi4ZLMLJ7kRuq/RqcIbp.hwAm6"},
    {first: "Bruce", last: "Banner", username: "brucebanner", password: "$2a$10$ODsSMsDxUlvkZdqBk4cF6O2V0rKfMEIU26JxBErKVeaAwI5TJzlxi"},
  ]);
};
