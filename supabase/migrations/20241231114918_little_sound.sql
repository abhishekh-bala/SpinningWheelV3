/*
  # Initial Schema Setup for Fortune Wheel

  1. Tables
    - `names`: Stores the names for the wheel
      - `id` (serial primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `selected` (boolean)
    
    - `admin`: Stores admin user information
      - `id` (uuid primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admin access
*/

-- Names table
CREATE TABLE IF NOT EXISTS names (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  selected boolean DEFAULT false
);

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE names ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Policies for names table
CREATE POLICY "Anyone can view names"
  ON names
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admin can insert names"
  ON names
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only admin can update names"
  ON names
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only admin can delete names"
  ON names
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE id = auth.uid()
    )
  );

-- Policies for admin table
CREATE POLICY "Admin can view own data"
  ON admin
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());