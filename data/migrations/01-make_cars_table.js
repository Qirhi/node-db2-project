// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema.createTable("cars", table=>{
        table.increments() // this method creates primary key column.  By default it calls it "id".  Can do table.increments("nameGoesHere")
        table.text("vin", 128).unique().notNullable() // max 128 characters
        table.text("make", 128).notNullable()
        table.text("model", 128).notNullable()
        table.integer("mileage").notNullable()
        table.text("title", 128)
        table.text("transmission", 128)
    })
};

exports.down = function(knex) {
    // if the cars table exists, delete it
    return knex.schema.dropTableIfExists("cars")
};

// npx knex migrate:up

