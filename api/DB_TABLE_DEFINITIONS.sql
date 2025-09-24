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