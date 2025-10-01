CREATE TYPE user_sex_enum AS ENUM('male','female','other');

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_handle VARCHAR(40) UNIQUE NOT NULL,
    user_email TEXT UNIQUE NOT NULL,
    user_sex USER_SEX_ENUM NOT NULL,
    profile_pic TEXT DEFAULT '',
    pw_hash TEXT NOT NULL,
    pw_salt TEXT NOT NULL,
    user_status VARCHAR(20) DEFAULT '',
    forgot_pw_token TEXT DEFAULT NULL,
    forgot_pw_expires_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY, -- gen by server
    title VARCHAR(60) NOT NULL,
    user_id UUID NOT NULL, --FK
    description TEXT NOT NULL,
    minutes_needed SMALLINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    rating SMALLINT DEFAULT NULL,
    favorited_count INT DEFAULT NULL,
    cooked_count INT DEFAULT NULL,
    execution_step_count SMALLINT DEFAULT NULL
);

CREATE INDEX recipe_search_idx ON recipes USING GIN (to_tsvector('english', title || ' ' || description));
/*
SELECT *, ts_rank(to_tsvector(title || ' ' || description), websearch_to_tsquery('beef')) as rank 
  FROM recipes WHERE to_tsvector(title || ' ' || description) @@ websearch_to_tsquery('beef') 
  ORDER BY rank DESC, created_at DESC;
*/

CREATE TABLE IF NOT EXISTS execution_steps (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    recipe_id TEXT REFERENCES recipes (id), --FK
    step_num SMALLINT NOT NULL,
    description TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS ingredients ( --SEED THIS TABLE!
    id TEXT PRIMARY KEY,
    name VARCHAR(40) NOT NULL, --UNIQUE,
    unit VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL
);
ALTER TABLE "ingredients"
ADD CONSTRAINT "ingredients_name_key" UNIQUE ("name");