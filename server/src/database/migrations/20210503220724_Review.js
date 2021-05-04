
exports.up = function(knex) {
    return knex.schema.createTable("Review", (table) => {
        table.increments("id");
        table.integer('stars');
        table
            .integer("medicID")
            .references("medics.id")
            .notNullable()
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Review');
};
