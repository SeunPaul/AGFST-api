CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
  id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(), 
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20),
  created_at DATE
);

CREATE TABLE orders(
  id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  customer_name TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  address TEXT,
  phone_number TEXT,
  email TEXT,
  brand TEXT,
  production_manager TEXT,
  sm_manager TEXT,
  items JSONB[],
  uploader TEXT,
  created_at DATE
);