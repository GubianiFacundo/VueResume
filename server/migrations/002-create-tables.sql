DROP TABLE IF EXISTS skills CASCADE;

DO $$ BEGIN
  CREATE TYPE skill_type AS ENUM (
    'Frontend Skills',
    'Backend Skills',
    'Databases',
    'Programming Languages',
    'DevOps & Tools',
    'Testing',
    'Miscellaneous'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE category_type AS ENUM (
    'Job',
    'Education',
    'Course'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    image BYTEA,
    link VARCHAR(255),
    type skill_type NOT NULL
);

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description JSONB NOT NULL DEFAULT '{}'::jsonb,
  data JSONB NOT NULL DEFAULT '{}'::jsonb
);

DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, 
  category category_type NOT NULL,
  description VARCHAR(255),
  link VARCHAR(255),
  fromdate DATE,
  todate DATE
);