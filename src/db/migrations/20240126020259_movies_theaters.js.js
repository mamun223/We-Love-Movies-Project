/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    // Sets supplier_id as the primary key
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.integer("theater_id").unsigned().notNullable();
    table.foreign("theater_id").references("theater_id").inTable("theaters");
    table.boolean("is_showing").defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
