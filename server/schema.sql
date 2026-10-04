-- schema.sql for dnd_local;

DROP SCHEMA dnd_local CASCADE;
CREATE SCHEMA IF NOT EXISTS dnd_local;

CREATE TABLE dnd_local.els (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    innerText TEXT NOT NULL,
    color TEXT NOT NULL,
    bgColor TEXT NOT NULL
);