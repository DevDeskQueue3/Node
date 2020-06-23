exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl.string("email").unique().notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("roles", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.enu("role", ["ADMIN", "STUDENT", "HELPER"]).notNullable();
      tbl.primary(["user_id", "role"]);
    })
    .createTable("tickets", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("posted_by")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("posted_at").defaultTo(knex.fn.now());
      tbl
        .integer("claimed_by")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .enu("status", ["OPEN", "CLOSED", "RESOLVED"])
        .notNullable()
        .defaultTo("OPEN");
      tbl.string("title").notNullable();
      tbl.text("description").notNullable();
      tbl.text("what_ive_tried").notNullable();
    })
    .createTable("categories", (tbl) => {
      tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("tickets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("category").notNullable();
      tbl.primary(["ticket_id", "category"]);
    })
    .createTable("comments", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("posted_by")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("posted_at").defaultTo(knex.fn.now());
      tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("tickets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("content").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("categories")
    .dropTableIfExists("tickets")
    .dropTableIfExists("roles")
    .dropTableIfExists("users");
};
