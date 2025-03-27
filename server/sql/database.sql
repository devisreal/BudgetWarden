DROP TABLE IF EXISTS bills;

DROP TABLE IF EXISTS budgets;

DROP TABLE IF EXISTS subscriptions;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS users;

DROP FUNCTION if EXISTS update_updated_at_column;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	password CHAR(60) NOT NULL, -- Assuming bcrypt hash
	currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE
OR REPLACE FUNCTION update_updated_at_column () RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at BEFORE
UPDATE ON users FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS subscriptions (
	id SERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id VARCHAR(50) NOT NULL,
	name VARCHAR(100) NOT NULL,
	cost BIGINT NOT NULL CHECK (cost >= 0),
	billing_cycle VARCHAR(20) NOT NULL, -- 'monthly', 'yearly', 'weekly'
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
	amount BIGINT NOT NULL CHECK (amount >= 0),
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
	amount BIGINT NOT NULL CHECK (amount >= 0),
	period VARCHAR(20) NOT NULL, -- 'weekly', 'monthly', 'yearly'
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

ALTER TABLE users
ADD COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE categories
ADD COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE subscriptions
ADD COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE bills
ADD COLUMN slug VARCHAR(255) UNIQUE;

ALTER TABLE budgets
ADD COLUMN slug VARCHAR(255) UNIQUE;