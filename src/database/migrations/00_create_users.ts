import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.integer('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.integer('level').defaultTo(0);
    table.integer('xp').defaultTo(0);
    table.integer('money').defaultTo(7500);
    table.string('job').defaultTo('none');
    table.string('dad').defaultTo('none');
    table.string('mom').defaultTo('none');
    table.string('children').defaultTo('none');
    table.string('married').defaultTo("none");
    table.integer('money_bank').notNullable().defaultTo(2500);
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}