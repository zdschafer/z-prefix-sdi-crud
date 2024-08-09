/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', table => {
      table.increments();
      table.string('name', 250);
      table.string('description', 1000);
      table.bigInteger('quantity');

      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable("users").onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('items');
};
