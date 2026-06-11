-- Enable RLS for all tables (if not already enabled)
alter table if exists customers enable row level security;
alter table if exists products enable row level security;
alter table if exists materials enable row level security;
alter table if exists labour enable row level security;
alter table if exists machines enable row level security;
alter table if exists finishing_options enable row level security;
alter table if exists settings enable row level security;
alter table if exists quotations enable row level security;
alter table if exists quotation_items enable row level security;

-- Drop existing policies if any (to avoid duplicate errors)
drop policy if exists "Public customers are viewable by everyone." on customers;
drop policy if exists "Authenticated users can insert customers." on customers;
drop policy if exists "Authenticated users can update customers." on customers;
drop policy if exists "Authenticated users can delete customers." on customers;

drop policy if exists "Public products are viewable by everyone." on products;
drop policy if exists "Authenticated users can insert products." on products;
drop policy if exists "Authenticated users can update products." on products;
drop policy if exists "Authenticated users can delete products." on products;

drop policy if exists "Public materials are viewable by everyone." on materials;
drop policy if exists "Authenticated users can insert materials." on materials;
drop policy if exists "Public labour is viewable by everyone." on labour;
drop policy if exists "Authenticated users can insert labour." on labour;
drop policy if exists "Public machines are viewable by everyone." on machines;
drop policy if exists "Authenticated users can insert machines." on machines;
drop policy if exists "Public finishing options are viewable by everyone." on finishing_options;
drop policy if exists "Authenticated users can insert finishing options." on finishing_options;
drop policy if exists "Public settings are viewable by everyone." on settings;
drop policy if exists "Authenticated users can insert settings." on settings;
drop policy if exists "Public quotations are viewable by everyone." on quotations;
drop policy if exists "Authenticated users can manage quotations." on quotations;
drop policy if exists "Public quotation items are viewable by everyone." on quotation_items;
drop policy if exists "Authenticated users can manage quotation items." on quotation_items;

-- Recreate all policies
-- SELECT policies - allow everyone to read
create policy "Public customers are viewable by everyone." on customers for select using (true);
create policy "Public products are viewable by everyone." on products for select using (true);
create policy "Public materials are viewable by everyone." on materials for select using (true);
create policy "Public labour is viewable by everyone." on labour for select using (true);
create policy "Public machines are viewable by everyone." on machines for select using (true);
create policy "Public finishing options are viewable by everyone." on finishing_options for select using (true);
create policy "Public settings are viewable by everyone." on settings for select using (true);
create policy "Public quotations are viewable by everyone." on quotations for select using (true);
create policy "Public quotation items are viewable by everyone." on quotation_items for select using (true);

-- INSERT policies - only authenticated users can insert
create policy "Authenticated users can insert customers." on customers for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert products." on products for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert materials." on materials for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert labour." on labour for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert machines." on machines for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert finishing options." on finishing_options for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can insert settings." on settings for insert with check (auth.role() = 'authenticated');

-- UPDATE/DELETE policies
create policy "Authenticated users can update customers." on customers for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete customers." on customers for delete using (auth.role() = 'authenticated');
create policy "Authenticated users can update products." on products for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete products." on products for delete using (auth.role() = 'authenticated');

-- Full management for quotations and items
create policy "Authenticated users can manage quotations." on quotations for all using (auth.role() = 'authenticated');
create policy "Authenticated users can manage quotation items." on quotation_items for all using (auth.role() = 'authenticated');