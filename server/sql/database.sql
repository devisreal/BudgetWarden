DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS generate_category_slug();

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	password CHAR(60) NOT NULL,
	currency VARCHAR(3) DEFAULT 'GBP',
	income DECIMAL(12, 2) DEFAULT 0.00 CHECK (income >= 0),
	slug VARCHAR(255) UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $update_updated_at$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$update_updated_at$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	slug VARCHAR(255) UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION generate_category_slug()
RETURNS TRIGGER AS $generate_category_slug$
DECLARE
	base_slug TEXT;
	new_slug TEXT;
	counter INT := 1;
BEGIN
	base_slug := lower(NEW.name);
	base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');
	base_slug := trim(both '-' from base_slug);

	new_slug := base_slug;

	WHILE EXISTS (
		SELECT 1
		FROM categories
		WHERE slug = new_slug
	) LOOP
		new_slug := base_slug || '-' || counter;
		counter := counter + 1;
	END LOOP;

	NEW.slug := new_slug;
	RETURN NEW;
END;
$generate_category_slug$ LANGUAGE plpgsql;

CREATE TRIGGER category_slug_trigger
BEFORE INSERT ON categories
FOR EACH ROW
EXECUTE FUNCTION generate_category_slug();

INSERT INTO categories (name)
VALUES
	('Housing'),
	('Food'),
	('Transport'),
	('Shopping'),
	('Entertainment'),
	('Bills'),
	('Salary'),
	('Side Hustle'),
	('Other Income'),
	('Emergency Fund'),
	('Investments'),
	('Utilities'),
	('Education');

CREATE TABLE subscriptions (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id INTEGER NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	cost DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (cost >= 0),
	billing_cycle VARCHAR(20) NOT NULL,
	renewal_date DATE NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	slug VARCHAR(255) UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bills (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id INTEGER NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (amount >= 0),
	due_date DATE NOT NULL,
	is_paid BOOLEAN DEFAULT FALSE,
	slug VARCHAR(255) UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budgets (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id INTEGER NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (amount >= 0),
	slug VARCHAR(255) UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX idx_subscriptions_renewal_date ON subscriptions (renewal_date);
CREATE INDEX idx_subscriptions_category_id ON subscriptions (category_id);

CREATE INDEX idx_bills_user_id ON bills (user_id);
CREATE INDEX idx_bills_due_date ON bills (due_date);
CREATE INDEX idx_bills_category_id ON bills (category_id);

CREATE INDEX idx_budgets_user_id ON budgets (user_id);
CREATE INDEX idx_budgets_category_id ON budgets (category_id);

CREATE INDEX idx_categories_id_name ON categories (id, name);