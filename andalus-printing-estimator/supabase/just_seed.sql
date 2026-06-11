-- ============================================================
-- AL ANDALUS PRINTING ESTIMATOR - SEED DATA ONLY
-- Run AFTER just_tables.sql
-- ============================================================

-- Products
INSERT INTO public.products (name, category, base_price, description) VALUES
('Business Cards', 'Commercial Printing', 0.35, 'Standard business cards 90x50mm 4/4 colors'),
('Flyers', 'Commercial Printing', 0.50, 'A5/A4 flyers full color single/double side'),
('Brochures', 'Commercial Printing', 1.20, 'Tri-fold/A4 brochures with multi pages'),
('Posters', 'Commercial Printing', 3.00, 'Large posters A3 to A0 size'),
('Catalogues', 'Commercial Printing', 5.00, 'Multi-page catalogues with binding'),
('Stickers', 'Commercial Printing', 0.25, 'Custom shape/rectangle stickers'),
('Labels', 'Commercial Printing', 0.15, 'Roll labels or sheet labels'),
('Envelopes', 'Commercial Printing', 0.40, 'Standard/custom size envelopes'),
('Letterheads', 'Commercial Printing', 0.20, 'A4 letterhead stationery'),
('NCR Books', 'Commercial Printing', 3.00, 'NCR books 2-part to 5-part'),
('Invoice Books', 'Commercial Printing', 4.00, 'Numbered invoice books'),
('Receipt Books', 'Commercial Printing', 3.50, 'Numbered receipt books'),
('Notebooks', 'Commercial Printing', 8.00, 'Spiral/perfect bound notebooks'),
('Packaging Boxes', 'Packaging', 2.50, 'Custom printed packaging boxes'),
('Paper Bags', 'Packaging', 1.80, 'Gift/shopping paper bags'),
('Hang Tags', 'Commercial Printing', 0.20, 'Custom hang tags with string'),
('Invitation Cards', 'Commercial Printing', 0.80, 'Wedding/event invitation cards'),
('Menu Cards', 'Commercial Printing', 2.00, 'Restaurant menu cards'),
('Files/Folders', 'Commercial Printing', 3.50, 'Custom printed files and folders'),
('ID Cards', 'Commercial Printing', 5.00, 'PVC/Paper ID cards'),
('Certificates', 'Commercial Printing', 2.50, 'Certificate printing'),
('Food Boxes', 'Packaging', 3.00, 'Food grade packaging boxes'),
('Medicine Boxes', 'Packaging', 2.80, 'Pharmaceutical packaging'),
('Cosmetic Boxes', 'Packaging', 3.50, 'Premium cosmetic packaging'),
('Corrugated Boxes', 'Packaging', 5.00, 'Heavy duty corrugated boxes'),
('Burger Boxes', 'Packaging', 1.50, 'Burger/fast food boxes'),
('Cake Boxes', 'Packaging', 2.00, 'Cake/pastry boxes'),
('Flex Banners', 'Large Format', 8.00, 'Large flex banner printing'),
('Rollup Stands', 'Large Format', 45.00, 'Rollup banner stands'),
('Vinyl Stickers', 'Large Format', 3.00, 'Vinyl sticker printing'),
('Foam Board', 'Large Format', 15.00, 'Foam board mounting'),
('Acrylic Signage', 'Large Format', 60.00, 'Acrylic sign boards');

-- Materials (Paper types)
INSERT INTO public.materials (name, type, supplier, cost_per_unit, unit_type, gsm, sheet_size, waste_percentage) VALUES
('Art Paper Gloss 100gsm', 'Paper', 'Qatar Paper Trading', 0.85, 'sheet', 100, '70x100', 5),
('Art Paper Gloss 130gsm', 'Paper', 'Qatar Paper Trading', 1.10, 'sheet', 130, '70x100', 5),
('Art Paper Gloss 150gsm', 'Paper', 'Qatar Paper Trading', 1.35, 'sheet', 150, '70x100', 5),
('Art Paper Gloss 200gsm', 'Paper', 'Qatar Paper Trading', 1.75, 'sheet', 200, '70x100', 5),
('Art Paper Gloss 250gsm', 'Paper', 'Qatar Paper Trading', 2.10, 'sheet', 250, '70x100', 5),
('Art Paper Gloss 300gsm', 'Paper', 'Qatar Paper Trading', 2.50, 'sheet', 300, '70x100', 5),
('Art Paper Gloss 350gsm', 'Paper', 'Qatar Paper Trading', 2.90, 'sheet', 350, '70x100', 5),
('Art Paper Matte 100gsm', 'Paper', 'Qatar Paper Trading', 0.90, 'sheet', 100, '70x100', 5),
('Art Paper Matte 130gsm', 'Paper', 'Qatar Paper Trading', 1.15, 'sheet', 130, '70x100', 5),
('Art Paper Matte 150gsm', 'Paper', 'Qatar Paper Trading', 1.40, 'sheet', 150, '70x100', 5),
('Art Paper Matte 200gsm', 'Paper', 'Qatar Paper Trading', 1.80, 'sheet', 200, '70x100', 5),
('Art Paper Matte 250gsm', 'Paper', 'Qatar Paper Trading', 2.20, 'sheet', 250, '70x100', 5),
('Art Paper Matte 300gsm', 'Paper', 'Qatar Paper Trading', 2.60, 'sheet', 300, '70x100', 5),
('Woodfree Paper 80gsm', 'Paper', 'Al Jaber Paper', 0.55, 'sheet', 80, '70x100', 6),
('Woodfree Paper 70gsm', 'Paper', 'Al Jaber Paper', 0.50, 'sheet', 70, '70x100', 6),
('Kraft Paper 150gsm', 'Paper', 'Gulf Paper', 0.65, 'sheet', 150, '70x100', 7),
('Kraft Paper 200gsm', 'Paper', 'Gulf Paper', 0.80, 'sheet', 200, '70x100', 7),
('Duplex Board 250gsm', 'Paper', 'Qatar Board', 1.50, 'sheet', 250, '70x100', 5),
('Duplex Board 300gsm', 'Paper', 'Qatar Board', 1.80, 'sheet', 300, '70x100', 5),
('Duplex Board 350gsm', 'Paper', 'Qatar Board', 2.10, 'sheet', 350, '70x100', 5),
('Duplex Board 400gsm', 'Paper', 'Qatar Board', 2.40, 'sheet', 400, '70x100', 5),
('Ivory Board 250gsm', 'Paper', 'Premium Paper LLC', 2.00, 'sheet', 250, '70x100', 4),
('Ivory Board 300gsm', 'Paper', 'Premium Paper LLC', 2.40, 'sheet', 300, '70x100', 4),
('Ivory Board 350gsm', 'Paper', 'Premium Paper LLC', 2.80, 'sheet', 350, '70x100', 4),
('Bristol 250gsm', 'Paper', 'Qatar Paper Trading', 1.60, 'sheet', 250, '64x90', 5),
('Chromo Paper 100gsm', 'Paper', 'Gulf Paper', 0.75, 'sheet', 100, '70x100', 6),
('Sticker Paper Gloss', 'Paper', 'Premier Supplies', 2.00, 'sheet', 100, 'A4', 3),
('Sticker Paper Matte', 'Paper', 'Premier Supplies', 2.20, 'sheet', 100, 'A4', 3),
('Thermal Paper 80mm', 'Paper', 'POS Supplies', 12.00, 'roll', 80, '80mm', 2),
('NCR Paper White 60gsm', 'Paper', 'NCR Gulf', 0.40, 'sheet', 60, 'A4', 4),
('NCR Paper Yellow 60gsm', 'Paper', 'NCR Gulf', 0.40, 'sheet', 60, 'A4', 4),
('NCR Paper Pink 60gsm', 'Paper', 'NCR Gulf', 0.40, 'sheet', 60, 'A4', 4),
('NCR Paper Blue 60gsm', 'Paper', 'NCR Gulf', 0.40, 'sheet', 60, 'A4', 4),
('NCR Paper Green 60gsm', 'Paper', 'NCR Gulf', 0.40, 'sheet', 60, 'A4', 4),
('Corrugated Board Small', 'Paper', 'Packaging Co', 3.50, 'sheet', 400, '70x100', 8),
('Corrugated Board Medium', 'Paper', 'Packaging Co', 5.00, 'sheet', 400, '100x120', 8),
('Corrugated Board Large', 'Paper', 'Packaging Co', 7.00, 'sheet', 400, '120x160', 8);

-- Labour
INSERT INTO public.labour (name, charge_type, cost_per_unit) VALUES
('Cutting', 'per_hour', 25.00),
('Lamination', 'per_hour', 30.00),
('Die Cutting', 'per_hour', 35.00),
('Foil Stamping', 'per_hour', 40.00),
('Embossing', 'per_hour', 35.00),
('Packing', 'per_hour', 15.00),
('Folding', 'per_sheet', 0.05),
('Pasting', 'per_piece', 0.10),
('Eyelet Fixing', 'per_piece', 0.15),
('Glue Work', 'per_hour', 20.00),
('Delivery', 'fixed_job', 50.00);

-- Machines
INSERT INTO public.machines (name, running_cost_per_hour, speed_per_hour, electricity_cost, setup_waste, operator_charge_per_hour) VALUES
('Heidelberg SM52 4-Color', 150.00, 10000, 25.00, 100, 35.00),
('Heidelberg GTO 52 2-Color', 100.00, 8000, 20.00, 80, 30.00),
('Heidelberg XL75 5-Color', 200.00, 12000, 30.00, 120, 40.00),
('Digital Printer Konica Minolta', 80.00, 3000, 15.00, 20, 25.00),
('Digital Printer Xerox Versant', 90.00, 4000, 15.00, 25, 25.00),
('Cutting Machine Polar 115', 40.00, 500, 10.00, 10, 20.00),
('Lamination Machine', 35.00, 800, 8.00, 15, 18.00),
('Die Cutting Machine Bobst', 60.00, 5000, 12.00, 50, 25.00),
('Foil Stamping Machine', 55.00, 3000, 10.00, 30, 25.00),
('Folding Machine', 30.00, 8000, 5.00, 20, 15.00);

-- Finishing Options
INSERT INTO public.finishing_options (name, material_cost, labour_charge, machine_setup_charge, minimum_charge, unit_type) VALUES
('Gloss Lamination', 0.15, 0.05, 25.00, 50.00, 'per_sheet'),
('Matte Lamination', 0.15, 0.05, 25.00, 50.00, 'per_sheet'),
('Soft Touch Lamination', 0.25, 0.08, 30.00, 75.00, 'per_sheet'),
('UV Spot Coating', 0.20, 0.10, 50.00, 100.00, 'per_sheet'),
('Embossing', 0.30, 0.15, 75.00, 100.00, 'per_piece'),
('Debossing', 0.30, 0.15, 75.00, 100.00, 'per_piece'),
('Foil Stamping - Gold', 0.40, 0.20, 80.00, 150.00, 'per_piece'),
('Foil Stamping - Silver', 0.40, 0.20, 80.00, 150.00, 'per_piece'),
('Foil Stamping - Custom', 0.50, 0.25, 80.00, 175.00, 'per_piece'),
('Die Cutting', 0.20, 0.10, 60.00, 100.00, 'per_sheet'),
('Creasing', 0.10, 0.05, 30.00, 50.00, 'per_sheet'),
('Folding', 0.03, 0.02, 15.00, 25.00, 'per_piece'),
('Perfect Binding', 1.00, 0.50, 100.00, 200.00, 'per_book'),
('Saddle Stitching', 0.30, 0.15, 40.00, 75.00, 'per_book'),
('Spiral Binding', 1.50, 0.50, 30.00, 100.00, 'per_book'),
('Eyelets', 0.10, 0.15, 20.00, 30.00, 'per_piece'),
('Punching', 0.05, 0.05, 15.00, 25.00, 'per_sheet'),
('Round Corner', 0.10, 0.08, 25.00, 30.00, 'per_piece'),
('Velcro Tape', 0.50, 0.25, 10.00, 20.00, 'per_piece'),
('Magnet', 0.75, 0.25, 10.00, 25.00, 'per_piece');

-- Settings
INSERT INTO public.settings (profit_margin, vat_rate, default_currency) VALUES
(20.00, 10.00, 'QAR');

-- Sample Customers
INSERT INTO public.customers (company_name, contact_person, mobile, email, address, vat_number, notes) VALUES
('Al Rayyan Trading', 'Ahmed Al Mansouri', '+974 5555 1234', 'ahmed@alrayyan.qa', 'Building 12, Street 45, Doha', 'QA-1234567', 'Premium customer - net 30 days'),
('Doha Business Center', 'Khalid Al Thani', '+974 5555 5678', 'khalid@dohabc.com', 'Zone 61, Al Sadd, Doha', 'QA-7654321', 'Quick payment'),
('Qatar Marketing Group', 'Sara Al Qahtani', '+974 5555 9012', 'sara@qmg.qa', 'Tornado Tower, Floor 15, Doha', 'QA-2345678', 'Large format specialist');

-- Sample Quotation
INSERT INTO public.quotations (quotation_number, customer_id, status, total_amount, vat_amount, profit_margin_percentage, notes, terms_and_conditions)
VALUES ('QTN-2024-0001', (SELECT id FROM public.customers LIMIT 1), 'Pending', 525.00, 52.50, 20.00, 'Delivery within 5 working days', 'Payment: 50% advance, 50% on delivery. Validity: 15 days.');

-- Sample Quotation Items
INSERT INTO public.quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT 
  (SELECT id FROM public.quotations LIMIT 1),
  (SELECT id FROM public.products WHERE name = 'Business Cards' LIMIT 1),
  'Business Cards 4/4 Colors',
  500,
  0.35,
  175.00,
  '{"size": "90x50mm", "paper": "Art Paper 300gsm", "printing": "4/4 Colors", "finishing": "Gloss Lamination", "quantity": 500}';

INSERT INTO public.quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT 
  (SELECT id FROM public.quotations LIMIT 1),
  (SELECT id FROM public.products WHERE name = 'Flyers' LIMIT 1),
  'A5 Flyers Full Color',
  1000,
  0.35,
  350.00,
  '{"size": "A5", "paper": "Art Paper 150gsm", "printing": "4/4 Colors", "finishing": "None", "quantity": 1000}';