DROP TABLE IF EXISTS bills;

DROP TABLE IF EXISTS budgets;

DROP TABLE IF EXISTS subscriptions;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS users;

DROP FUNCTION if EXISTS update_updated_at_column;

DROP FUNCTION if EXISTS generate_category_slug;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	password CHAR(60) NOT NULL,
	currency VARCHAR(3) DEFAULT 'GBP',
	income DECIMAL(12, 2) CHECK (income >= 0),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE
OR REPLACE FUNCTION update_updated_at_column () RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at BEFORE
UPDATE
	ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();

ALTER TABLE
	users
ADD
	COLUMN slug VARCHAR(255) UNIQUE;

CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
	categories
ADD
	COLUMN slug VARCHAR(255) UNIQUE;

CREATE
OR REPLACE FUNCTION generate_category_slug() RETURNS TRIGGER AS $ $ DECLARE base_slug TEXT;

new_slug TEXT;

counter INT := 1;

BEGIN -- Generate base slug (lowercase, replace spaces with hyphens)
base_slug := lower(new.name);

base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');

base_slug := trim(
	both '-'
	from
		base_slug
);

new_slug := base_slug;

-- Ensure uniqueness by appending a number if necessary
WHILE EXISTS (
	SELECT
		1
	FROM
		categories
	WHERE
		name = new_slug
) LOOP new_slug := base_slug || '-' || counter;

counter := counter + 1;

END LOOP;

-- Assign the generated slug
NEW.slug := new_slug;

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

-- Create trigger to run the function before insert
CREATE TRIGGER category_slug_trigger BEFORE
INSERT
	ON categories FOR EACH ROW EXECUTE FUNCTION generate_category_slug();

INSERT INTO
	categories (name)
VALUES
	-- Essentials
	('Housing'),
	('Food'),
	('Transport'),
	-- Lifestyle
	('Shopping'),
	('Entertainment'),
	('Bills'),
	-- Income
	('Salary'),
	('Side Hustle'),
	('Other Income'),
	-- Financial Goals
	('Emergency Fund'),
	('Investments'),
	('Utilities'),
	('Education');

CREATE TABLE IF NOT EXISTS subscriptions (
	id SERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id VARCHAR(50) NOT NULL,
	name VARCHAR(100) NOT NULL,
	cost DECIMAL(12, 2) NOT NULL CHECK (cost >= 0),
	billing_cycle VARCHAR(20) NOT NULL,
	-- 'monthly', 'yearly', 'weekly'
	renewal_date DATE NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bills (
	id SERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id BIGINT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
	due_date DATE NOT NULL,
	is_paid BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budgets (
	id SERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id BIGINT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);

CREATE INDEX idx_subscriptions_renewal_date ON subscriptions (renewal_date);

CREATE INDEX idx_bills_user_id ON bills (user_id);

CREATE INDEX idx_bills_due_date ON bills (due_date);

CREATE INDEX idx_budgets_user_id ON budgets (user_id);

CREATE INDEX idx_categories_id_name ON categories (id, name);

CREATE INDEX idx_budgets_category_id ON budgets (category_id);

CREATE INDEX idx_bills_category_id ON bills (category_id);

CREATE INDEX idx_subscriptions_category_id ON subscriptions (category_id);

ALTER TABLE
	subscriptions
ADD
	COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE
	bills
ADD
	COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE
	budgets
ADD
	COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE
	users
ALTER COLUMN
	income
SET
	DEFAULT 0.00;

ALTER TABLE
	subscriptions
ALTER COLUMN
	cost
SET
	DEFAULT 0.00;

ALTER TABLE
	budgets
ALTER COLUMN
	amount
SET
	DEFAULT 0.00;