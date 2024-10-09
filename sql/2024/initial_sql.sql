-- Enable the citext extension for case-insensitive text handling
CREATE EXTENSION IF NOT EXISTS citext;

-- Create a sequence for user_id
CREATE SEQUENCE users_id_seq
    INCREMENT BY 1
    START WITH 1;

-- Create the users table
CREATE TABLE users (
    id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    name varchar(255) NOT NULL,
    email citext NOT NULL,
    password varchar(255) NOT NULL,
    date_of_birth date,
    gender varchar(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    phone_number varchar(15),
    health_score integer,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
-- Step 1: Add a temporary column with varchar type
ALTER TABLE users ADD COLUMN temp_date_of_birth varchar(255);

-- Step 2: Copy and convert the data from the old column to the new column
UPDATE users SET temp_date_of_birth = date_of_birth::text;

-- Step 3: Drop the old column
ALTER TABLE users DROP COLUMN date_of_birth;

-- Step 4: Rename the temporary column to the original column name
ALTER TABLE users RENAME COLUMN temp_date_of_birth TO date_of_birth;
