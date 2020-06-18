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
        .integer("userID")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.enu("role", ["ADMIN", "STUDENT", "HELPER"]).notNullable();
      tbl.primary(["userID", "role"]);
    })
    .createTable("tickets", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("postedBy")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("postedAt").notNullable();
      tbl
        .integer("claimedBy")
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
    })
    .createTable("categories", (tbl) => {
      tbl
        .integer("ticketID")
        .unsigned()
        .notNullable()
        .references("tickets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("category").notNullable();
      tbl.primary(["ticketID", "category"]);
    })
    .createTable("comments", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("postedBy")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("postedAt").notNullable();
      tbl
        .integer("ticketID")
        .unsigned()
        .notNullable()
        .references("tickets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("content").notNullable();
      tbl.boolean("isSolution").notNullable().defaultTo(false);
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
