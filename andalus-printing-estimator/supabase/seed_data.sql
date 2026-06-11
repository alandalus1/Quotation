-- ============================================================
-- Comprehensive Seed Data for Al Andalus Printing Estimator
-- Qatar Market Prices & Products
-- ============================================================

-- ============================================================
-- PRODUCTS (Commercial Printing, Packaging, Large Format)
-- ============================================================
INSERT INTO products (name, category, base_price, description) VALUES

-- Commercial Printing
('Business Cards (Standard 9×5cm)', 'Commercial Printing', 0.35, 'Standard 9x5cm business cards on 350gsm art card, 1 box = 100 pcs'),
('Flyers A5', 'Commercial Printing', 0.15, 'A5 size flyers on 150gsm gloss art paper'),
('Flyers A4', 'Commercial Printing', 0.25, 'A4 size flyers on 150gsm gloss art paper'),
('Brochures A4 (2 Fold)', 'Commercial Printing', 0.85, 'A4 tri-fold brochures on 150gsm gloss art paper'),
('Brochures A4 (3 Fold)', 'Commercial Printing', 1.20, 'A4 4-panel brochures on 150gsm gloss art paper'),
('Posters A3', 'Commercial Printing', 2.50, 'A3 posters on 200gsm gloss art paper'),
('Posters A2', 'Commercial Printing', 5.00, 'A2 posters on 200gsm gloss art paper'),
('Catalogues A4 Spiral Bound', 'Commercial Printing', 15.00, 'A4 full colour catalogues, 20 pages, spiral bound'),
('Stickers (Custom Shape)', 'Commercial Printing', 0.75, 'Custom die-cut stickers on vinyl, per sheet A5'),
('Labels (Roll/Rectangle)', 'Commercial Printing', 0.50, 'Rectangle labels on sticker paper, per sheet A4'),
('Envelopes DL', 'Commercial Printing', 0.40, 'DL size envelopes with window, printed 1 side'),
('Envelopes C5', 'Commercial Printing', 0.65, 'C5 size envelopes, printed 1 side'),
('Letterheads A4', 'Commercial Printing', 0.30, 'A4 letterhead on 100gsm woodfree paper'),
('NCR Books A5 (Duplicate)', 'Commercial Printing', 18.00, 'A5 NCR books, white + yellow, 50 sets, numbered'),
('NCR Books A5 (Triplicate)', 'Commercial Printing', 22.00, 'A5 NCR books, white + yellow + pink, 50 sets, numbered'),
('NCR Books A4 (Duplicate)', 'Commercial Printing', 28.00, 'A4 NCR books, white + yellow, 50 sets, numbered'),
('NCR Books A4 (Triplicate)', 'Commercial Printing', 35.00, 'A4 NCR books, white + yellow + pink, 50 sets, numbered'),
('Invoice Books A5', 'Commercial Printing', 20.00, 'A5 invoice books, 50 sets, numbered, duplicate'),
('Invoice Books A4', 'Commercial Printing', 32.00, 'A4 invoice books, 50 sets, numbered, duplicate'),
('Receipt Books A6', 'Commercial Printing', 12.00, 'A6 receipt books, 50 sets, numbered, duplicate'),
('Notebooks A5 Spiral', 'Commercial Printing', 8.00, 'A5 100 page notebooks, spiral bound, lined pages'),
('Notebooks A4 Spiral', 'Commercial Printing', 15.00, 'A4 100 page notebooks, spiral bound, lined pages'),
('Notebooks A5 Hard Cover', 'Commercial Printing', 25.00, 'A5 200 page hard cover notebooks, sewn binding'),
('Paper Bags (Small)', 'Commercial Printing', 2.50, 'Small paper bags with handles, 32x22x10cm, 200gsm kraft'),
('Paper Bags (Medium)', 'Commercial Printing', 3.50, 'Medium paper bags with handles, 40x30x12cm, 200gsm kraft'),
('Paper Bags (Large)', 'Commercial Printing', 5.00, 'Large paper bags with handles, 50x35x15cm, 200gsm kraft'),
('Hang Tags', 'Commercial Printing', 0.50, 'Custom die-cut hang tags, 300gsm art card, per piece'),
('Invitation Cards', 'Commercial Printing', 2.00, 'Premium invitation cards, 350gsm, foil stamped'),
('Menu Cards', 'Commercial Printing', 3.50, 'A5 menu cards laminated, 300gsm art card'),
('Files/Folders', 'Commercial Printing', 4.00, 'A4 presentation folders with pocket, 300gsm art card'),
('ID Cards (PVC)', 'Commercial Printing', 15.00, 'PVC ID cards, 85.6x53.98mm, full colour, per 10 pcs'),
('Certificates', 'Commercial Printing', 3.00, 'A4 certificates on 300gsm art card, with border design'),

-- Packaging
('Food Box (Standard)', 'Packaging', 3.00, 'Standard food packaging box, 300gsm art board, custom print'),
('Medicine Box (Small)', 'Packaging', 1.50, 'Small medicine box, 350gsm art board, coated'),
('Medicine Box (Large)', 'Packaging', 3.50, 'Large medicine box, 400gsm art board, coated'),
('Cosmetic Box (Premium)', 'Packaging', 8.00, 'Premium cosmetic box with lamination, 400gsm art board'),
('Corrugated Box (Small)', 'Packaging', 5.00, 'Small corrugated box, 3 ply, for shipping'),
('Corrugated Box (Medium)', 'Packaging', 8.00, 'Medium corrugated box, 3 ply, for shipping'),
('Corrugated Box (Large)', 'Packaging', 12.00, 'Large corrugated box, 5 ply, for shipping'),
('Burger Box', 'Packaging', 1.20, 'Burger takeaway box, 300gsm art board, grease resistant'),
('Cake Box', 'Packaging', 4.50, 'Cake box with window, 400gsm art board, ribbon handle'),

-- Large Format
('Flex Banner (Standard)', 'Large Format', 25.00, 'Standard flex banner 1x1m, frontlit, hemmed'),
('Flex Banner (Premium)', 'Large Format', 35.00, 'Premium flex banner 1x1m, backlit, hemmed with eyelets'),
('Rollup Stand (Standard)', 'Large Format', 150.00, 'Standard rollup stand 80x200cm, includes mechanism'),
('Rollup Stand (Premium)', 'Large Format', 250.00, 'Premium rollup stand 100x220cm, double sided'),
('Vinyl Stickers (Cut to Shape)', 'Large Format', 45.00, 'Vinyl cut to shape stickers, per square meter'),
('Vinyl Stickers (Rectangle)', 'Large Format', 35.00, 'Rectangle vinyl stickers, per square meter'),
('Foam Board', 'Large Format', 40.00, 'Foam board 5mm, A1 size, printed, mounted'),
('Acrylic Signage (Small)', 'Large Format', 120.00, 'Small acrylic sign 30x20cm, 3mm, UV printed'),
('Acrylic Signage (Medium)', 'Large Format', 250.00, 'Medium acrylic sign 50x35cm, 5mm, UV printed'),
('Acrylic Signage (Large)', 'Large Format', 500.00, 'Large acrylic sign 100x50cm, 5mm, UV printed');

-- ============================================================
-- MATERIALS (Paper, Die, Foil, etc.) - Qatar Market Prices
-- ============================================================
INSERT INTO materials (name, type, supplier, cost_per_unit, unit_type, gsm, sheet_size, waste_percentage, available_stock) VALUES

-- Art Paper Gloss (various GSM and sizes)
('Art Paper Gloss 70gsm 70×100', 'Paper', 'Gulf Paper Trading', 2.80, 'Sheet', 70, '70x100 cm', 5, 50000),
('Art Paper Gloss 80gsm 70×100', 'Paper', 'Gulf Paper Trading', 3.00, 'Sheet', 80, '70x100 cm', 5, 50000),
('Art Paper Gloss 100gsm 70×100', 'Paper', 'Gulf Paper Trading', 3.50, 'Sheet', 100, '70x100 cm', 5, 40000),
('Art Paper Gloss 115gsm 70×100', 'Paper', 'Gulf Paper Trading', 3.80, 'Sheet', 115, '70x100 cm', 5, 30000),
('Art Paper Gloss 130gsm 70×100', 'Paper', 'Gulf Paper Trading', 4.00, 'Sheet', 130, '70x100 cm', 5, 25000),
('Art Paper Gloss 150gsm 70×100', 'Paper', 'Gulf Paper Trading', 4.50, 'Sheet', 150, '70x100 cm', 5, 20000),
('Art Paper Gloss 170gsm 70×100', 'Paper', 'Gulf Paper Trading', 5.00, 'Sheet', 170, '70x100 cm', 5, 15000),
('Art Paper Gloss 200gsm 70×100', 'Paper', 'Gulf Paper Trading', 5.80, 'Sheet', 200, '70x100 cm', 5, 12000),
('Art Paper Gloss 250gsm 70×100', 'Paper', 'Gulf Paper Trading', 7.00, 'Sheet', 250, '70x100 cm', 5, 10000),
('Art Paper Gloss 300gsm 70×100', 'Paper', 'Gulf Paper Trading', 8.50, 'Sheet', 300, '70x100 cm', 5, 8000),
('Art Paper Gloss 350gsm 70×100', 'Paper', 'Gulf Paper Trading', 10.00, 'Sheet', 350, '70x100 cm', 5, 5000),
('Art Paper Gloss 400gsm 70×100', 'Paper', 'Gulf Paper Trading', 12.00, 'Sheet', 400, '70x100 cm', 5, 3000),

-- Art Paper Matte
('Art Paper Matte 80gsm 70×100', 'Paper', 'Gulf Paper Trading', 3.20, 'Sheet', 80, '70x100 cm', 5, 30000),
('Art Paper Matte 100gsm 70×100', 'Paper', 'Gulf Paper Trading', 3.60, 'Sheet', 100, '70x100 cm', 5, 25000),
('Art Paper Matte 130gsm 70×100', 'Paper', 'Gulf Paper Trading', 4.20, 'Sheet', 130, '70x100 cm', 5, 20000),
('Art Paper Matte 150gsm 70×100', 'Paper', 'Gulf Paper Trading', 4.80, 'Sheet', 150, '70x100 cm', 5, 15000),
('Art Paper Matte 200gsm 70×100', 'Paper', 'Gulf Paper Trading', 6.00, 'Sheet', 200, '70x100 cm', 5, 10000),
('Art Paper Matte 250gsm 70×100', 'Paper', 'Gulf Paper Trading', 7.50, 'Sheet', 250, '70x100 cm', 5, 8000),
('Art Paper Matte 300gsm 70×100', 'Paper', 'Gulf Paper Trading', 9.00, 'Sheet', 300, '70x100 cm', 5, 5000),

-- Woodfree Paper
('Woodfree 70gsm 70×100', 'Paper', 'Qatar Paper Supply', 1.80, 'Sheet', 70, '70x100 cm', 3, 80000),
('Woodfree 80gsm 70×100', 'Paper', 'Qatar Paper Supply', 2.00, 'Sheet', 80, '70x100 cm', 3, 70000),
('Woodfree 100gsm 70×100', 'Paper', 'Qatar Paper Supply', 2.50, 'Sheet', 100, '70x100 cm', 3, 50000),
('Woodfree 120gsm 70×100', 'Paper', 'Qatar Paper Supply', 2.80, 'Sheet', 120, '70x100 cm', 3, 40000),

-- Kraft Paper
('Kraft 80gsm 70×100', 'Paper', 'Al Khalij Paper', 1.50, 'Sheet', 80, '70x100 cm', 5, 30000),
('Kraft 100gsm 70×100', 'Paper', 'Al Khalij Paper', 1.80, 'Sheet', 100, '70x100 cm', 5, 25000),
('Kraft 120gsm 70×100', 'Paper', 'Al Khalij Paper', 2.20, 'Sheet', 120, '70x100 cm', 5, 20000),
('Kraft 150gsm 70×100', 'Paper', 'Al Khalij Paper', 2.80, 'Sheet', 150, '70x100 cm', 5, 15000),
('Kraft 200gsm 70×100', 'Paper', 'Al Khalij Paper', 3.50, 'Sheet', 200, '70x100 cm', 5, 10000),

-- Duplex Board
('Duplex 250gsm 70×100', 'Paper', 'Doha Board Trading', 5.00, 'Sheet', 250, '70x100 cm', 6, 15000),
('Duplex 300gsm 70×100', 'Paper', 'Doha Board Trading', 6.00, 'Sheet', 300, '70x100 cm', 6, 12000),
('Duplex 350gsm 70×100', 'Paper', 'Doha Board Trading', 7.00, 'Sheet', 350, '70x100 cm', 6, 10000),
('Duplex 400gsm 70×100', 'Paper', 'Doha Board Trading', 8.50, 'Sheet', 400, '70x100 cm', 6, 8000),

-- Ivory Board
('Ivory Board 250gsm 70×100', 'Paper', 'Premium Board Co', 6.00, 'Sheet', 250, '70x100 cm', 5, 10000),
('Ivory Board 300gsm 70×100', 'Paper', 'Premium Board Co', 7.20, 'Sheet', 300, '70x100 cm', 5, 8000),
('Ivory Board 350gsm 70×100', 'Paper', 'Premium Board Co', 8.50, 'Sheet', 350, '70x100 cm', 5, 6000),

-- Bristol Board
('Bristol 200gsm 70×100', 'Paper', 'Gulf Paper Trading', 4.50, 'Sheet', 200, '70x100 cm', 4, 10000),
('Bristol 250gsm 70×100', 'Paper', 'Gulf Paper Trading', 5.50, 'Sheet', 250, '70x100 cm', 4, 8000),

-- Chromo Paper
('Chromo 90gsm 70×100', 'Paper', 'Al Khalij Paper', 2.50, 'Sheet', 90, '70x100 cm', 5, 20000),
('Chromo 110gsm 70×100', 'Paper', 'Al Khalij Paper', 3.00, 'Sheet', 110, '70x100 cm', 5, 15000),

-- Sticker Paper
('Sticker Paper Gloss A4', 'Paper', 'Label Tech Qatar', 0.80, 'Sheet', 80, 'A4', 2, 50000),
('Sticker Paper Matte A4', 'Paper', 'Label Tech Qatar', 0.90, 'Sheet', 80, 'A4', 2, 40000),
('Sticker Paper Gloss 70×100', 'Paper', 'Label Tech Qatar', 12.00, 'Sheet', 80, '70x100 cm', 3, 5000),
('Sticker Paper Matte 70×100', 'Paper', 'Label Tech Qatar', 13.00, 'Sheet', 80, '70x100 cm', 3, 4000),

-- Thermal Paper
('Thermal Paper 80mm (50m roll)', 'Paper', 'POS Qatar', 8.00, 'Roll', 55, '80mm x 50m', 1, 1000),
('Thermal Paper 57mm (50m roll)', 'Paper', 'POS Qatar', 5.00, 'Roll', 55, '57mm x 50m', 1, 1000),

-- NCR Paper (Carbonless)
('NCR White Top 60gsm 70×100', 'NCR', 'NCR Paper Qatar', 3.00, 'Sheet', 60, '70x100 cm', 2, 30000),
('NCR Yellow Middle 60gsm 70×100', 'NCR', 'NCR Paper Qatar', 3.00, 'Sheet', 60, '70x100 cm', 2, 30000),
('NCR Pink Bottom 60gsm 70×100', 'NCR', 'NCR Paper Qatar', 3.00, 'Sheet', 60, '70x100 cm', 2, 30000),
('NCR White Top 60gsm A4', 'NCR', 'NCR Paper Qatar', 0.30, 'Sheet', 60, 'A4', 2, 100000),
('NCR Yellow Middle 60gsm A4', 'NCR', 'NCR Paper Qatar', 0.30, 'Sheet', 60, 'A4', 2, 100000),
('NCR Pink Bottom 60gsm A4', 'NCR', 'NCR Paper Qatar', 0.30, 'Sheet', 60, 'A4', 2, 100000),

-- Corrugated Board
('Corrugated Board 3ply', 'Paper', 'Packaging Qatar', 15.00, 'Sheet', 500, '100x70 cm', 5, 5000),
('Corrugated Board 5ply', 'Paper', 'Packaging Qatar', 22.00, 'Sheet', 800, '100x70 cm', 5, 3000),

-- Die Materials
('Die Plywood 18mm', 'Die', 'Die Cutting Supply', 80.00, 'Sheet', 0, '150x100 cm', 10, 100),
('Die Blade (per meter)', 'Die', 'Die Cutting Supply', 15.00, 'Meter', 0, 'N/A', 0, 1000),
('Ejection Rubber (per meter)', 'Die', 'Die Cutting Supply', 5.00, 'Meter', 0, 'N/A', 0, 500),

-- Foil Materials
('Foil Stamp Plate (per sq cm)', 'Foil', 'Foil Tech Qatar', 0.50, 'Area', 0, 'N/A', 0, 0),
('Gold Foil Roll 640mm', 'Foil', 'Foil Tech Qatar', 250.00, 'Roll', 0, '640mm x 120m', 5, 50),
('Silver Foil Roll 640mm', 'Foil', 'Foil Tech Qatar', 220.00, 'Roll', 0, '640mm x 120m', 5, 50),
('Copper Foil Roll 640mm', 'Foil', 'Foil Tech Qatar', 280.00, 'Roll', 0, '640mm x 120m', 5, 30),
('Holographic Foil Roll 640mm', 'Foil', 'Foil Tech Qatar', 350.00, 'Roll', 0, '640mm x 120m', 5, 20),

-- Emboss/Deboss Materials
('Emboss Block (per sq cm)', 'Emboss', 'Emboss Tech Qatar', 0.80, 'Area', 0, 'N/A', 0, 0),
('Deboss Block (per sq cm)', 'Emboss', 'Emboss Tech Qatar', 0.80, 'Area', 0, 'N/A', 0, 0),
('Copper Block (per sq cm)', 'Emboss', 'Emboss Tech Qatar', 1.20, 'Area', 0, 'N/A', 0, 0),
('Zinc Plate (per sq cm)', 'Emboss', 'Emboss Tech Qatar', 0.60, 'Area', 0, 'N/A', 0, 0),

-- Printing Plates
('CTP Plate (Heat Set)', 'Plate', 'Plate Tech Qatar', 18.00, 'Piece', 0, '1030x800mm', 0, 500),
('CTP Plate (Standard)', 'Plate', 'Plate Tech Qatar', 15.00, 'Piece', 0, '1030x800mm', 0, 500);

-- ============================================================
-- LABOUR CHARGES - Qatar Market Rates
-- ============================================================
INSERT INTO labour (name, charge_type, cost_per_unit) VALUES
('Cutting (Paper)', 'per_hour', 75.00),
('Cutting (Board)', 'per_hour', 100.00),
('Lamination (A3+)', 'per_hour', 80.00),
('Lamination (A4)', 'per_hour', 60.00),
('Die Cutting', 'per_hour', 120.00),
('Foil Stamping', 'per_hour', 150.00),
('Embossing', 'per_hour', 150.00),
('Debossing', 'per_hour', 150.00),
('Packing (Standard)', 'per_hour', 35.00),
('Packing (Premium)', 'per_hour', 50.00),
('Folding (Hand)', 'per_1000', 40.00),
('Folding (Machine)', 'per_hour', 80.00),
('Pasting (Hand)', 'per_hour', 40.00),
('Pasting (Machine)', 'per_hour', 80.00),
('Eyelet Fixing', 'per_100', 25.00),
('Eyelet Fixing (Manual)', 'per_hour', 45.00),
('Glue Work (Hand)', 'per_hour', 35.00),
('Glue Work (Machine)', 'per_hour', 70.00),
('Delivery (Doha City)', 'fixed_job', 50.00),
('Delivery (Outside Doha)', 'fixed_job', 100.00),
('Delivery (Rush)', 'fixed_job', 150.00),
('Binding - Perfect (per book)', 'per_piece', 0.50),
('Binding - Saddle Stitch (per book)', 'per_piece', 0.15),
('Binding - Spiral (per book)', 'per_piece', 1.00),
('Binding - Staple (per book)', 'per_piece', 0.10),
('Numbering (per 1000)', 'per_mille', 50.00),
('Perforation (per 1000)', 'per_mille', 40.00),
('Padding (per pad)', 'per_piece', 2.00);

-- ============================================================
-- MACHINES - Qatar Market
-- ============================================================
INSERT INTO machines (name, running_cost_per_hour, speed_per_hour, electricity_cost, setup_waste, operator_charge_per_hour) VALUES
('Heidelberg SM-52', 350.00, 10000, 25.00, 100, 60.00),
('Heidelberg GTO-52', 250.00, 8000, 20.00, 80, 50.00),
('Heidelberg XL-75', 500.00, 15000, 35.00, 150, 75.00),
('Heidelberg SM-102', 750.00, 12000, 50.00, 200, 100.00),
('Digital Printer Xerox Iridesse', 200.00, 2400, 15.00, 20, 45.00),
('Digital Printer Konica Minolta', 150.00, 3600, 12.00, 15, 40.00),
('Polar Cutting Machine 78', 100.00, 5000, 10.00, 0, 35.00),
('Polar Cutting Machine 115', 150.00, 7000, 15.00, 0, 45.00),
('Lamination Machine (A3)', 80.00, 600, 8.00, 10, 30.00),
('Lamination Machine (A2)', 120.00, 400, 12.00, 15, 35.00),
('Die Cutting Machine (Auto)', 200.00, 4000, 20.00, 50, 50.00),
('Die Cutting Machine (Manual)', 100.00, 500, 10.00, 20, 35.00),
('Foil Stamping Machine', 180.00, 2000, 15.00, 30, 55.00),
('Folding Machine', 80.00, 8000, 8.00, 20, 30.00),
('Perfect Binder', 150.00, 300, 12.00, 10, 40.00),
('Saddle Stitcher', 100.00, 4000, 8.00, 20, 35.00),
('Spiral Binding Machine', 60.00, 200, 5.00, 5, 25.00),
('Numbering Machine', 50.00, 3000, 3.00, 10, 25.00);

-- ============================================================
-- FINISHING OPTIONS - Qatar Market Prices
-- ============================================================
INSERT INTO finishing_options (name, material_cost, labour_charge, machine_setup_charge, minimum_charge, unit_type) VALUES
('Gloss Lamination (A4)', 0.15, 0.05, 30.00, 75.00, 'per_sheet'),
('Gloss Lamination (A3)', 0.25, 0.08, 40.00, 100.00, 'per_sheet'),
('Gloss Lamination (A2+)', 0.50, 0.15, 60.00, 150.00, 'per_sheet'),
('Matte Lamination (A4)', 0.18, 0.05, 30.00, 75.00, 'per_sheet'),
('Matte Lamination (A3)', 0.30, 0.08, 40.00, 100.00, 'per_sheet'),
('Matte Lamination (A2+)', 0.60, 0.15, 60.00, 150.00, 'per_sheet'),
('Soft Touch Lamination (A4)', 0.30, 0.05, 30.00, 100.00, 'per_sheet'),
('Soft Touch Lamination (A3)', 0.50, 0.08, 40.00, 150.00, 'per_sheet'),
('UV Spot (A4)', 0.35, 0.10, 100.00, 200.00, 'per_sheet'),
('UV Spot (A3)', 0.60, 0.15, 120.00, 250.00, 'per_sheet'),
('UV Full Coating (A4)', 0.20, 0.08, 80.00, 150.00, 'per_sheet'),
('UV Full Coating (A3)', 0.40, 0.12, 100.00, 200.00, 'per_sheet'),
('Embossing (Per Area)', 0.00, 0.50, 150.00, 250.00, 'per_sq_cm'),
('Debossing (Per Area)', 0.00, 0.50, 150.00, 250.00, 'per_sq_cm'),
('Foil Stamping (Per Area)', 0.20, 0.40, 200.00, 300.00, 'per_sq_cm'),
('Foil Stamping (Full Cover)', 0.00, 0.00, 300.00, 500.00, 'per_job'),
('Die Cutting (Simple)', 0.00, 0.00, 120.00, 200.00, 'per_job'),
('Die Cutting (Complex)', 0.00, 0.00, 200.00, 350.00, 'per_job'),
('Creasing', 0.00, 0.05, 50.00, 100.00, 'per_100'),
('Folding (Machine)', 0.00, 0.02, 50.00, 75.00, 'per_100'),
('Perfect Binding', 0.50, 0.50, 200.00, 300.00, 'per_book'),
('Saddle Stitching', 0.10, 0.10, 100.00, 150.00, 'per_book'),
('Spiral Binding (Wire-o)', 1.50, 0.50, 50.00, 100.00, 'per_book'),
('Spiral Binding (Plastic)', 1.00, 0.30, 50.00, 80.00, 'per_book'),
('Staple Binding', 0.05, 0.05, 30.00, 50.00, 'per_book'),
('Eyelets (Brass)', 0.30, 0.10, 50.00, 75.00, 'per_piece'),
('Eyelets (Nickel)', 0.25, 0.10, 50.00, 75.00, 'per_piece'),
('Punching (Hole)', 0.00, 0.05, 30.00, 50.00, 'per_100'),
('Round Corner', 0.00, 0.10, 50.00, 80.00, 'per_100'),
('Velcro (Adhesive Backed)', 1.50, 0.50, 0.00, 50.00, 'per_pair'),
('Velcro (Sewn)', 2.00, 1.00, 0.00, 75.00, 'per_pair'),
('Magnet Strip (Adhesive)', 2.50, 0.50, 0.00, 50.00, 'per_meter'),
('Numbering (Per Digit)', 0.05, 0.05, 80.00, 120.00, 'per_1000'),
('Perforation', 0.00, 0.03, 50.00, 80.00, 'per_100'),
('Padding (Glue)', 0.50, 1.00, 30.00, 50.00, 'per_pad');

-- ============================================================
-- SETTINGS - Default Qatar Market
-- ============================================================
INSERT INTO settings (profit_margin, vat_rate, default_currency) VALUES
(25.00, 5.00, 'QAR');

-- ============================================================
-- CUSTOMERS - Sample Qatar Companies
-- ============================================================
INSERT INTO customers (company_name, contact_person, mobile, email, address, vat_number, notes) VALUES
('Qatar Trading & Contracting Co.', 'Ahmed Al Mansouri', '+974 5555 1234', 'ahmed@qtc.com.qa', 'West Bay, Tornado Tower, Floor 15, Doha', 'VAT123456789', 'Large corporate client - net 30 terms'),
('Doha Marketing Services WLL', 'Sara Al Thani', '+974 6666 5678', 'sara@dohamarketing.qa', 'Al Sadd, Al Nasr Tower, Doha', 'VAT987654321', 'Regular client - monthly orders'),
('Al Faisal Holding Group', 'Khalid Al Faisal', '+974 7777 9012', 'khalid@alfaisal.qa', 'The Pearl, Porto Arabia, Doha', 'VAT456789123', 'VIP client - annual agreement'),
('Msheireb Properties', 'Noor Al Obaidly', '+974 3333 4567', 'noor@msheireb.com', 'Msheireb Downtown, Doha', 'VAT789123456', 'Real estate developer - bulk orders'),
('Qatar National Bank (QNB)', 'Fahad Al Kuwari', '+974 4444 7890', 'fahad@qnb.com.qa', 'Grand Hamad Street, Doha', 'VAT321654987', 'Bank - large annual contract'),
('Al Meera Consumer Goods', 'Hassan Al Mohannadi', '+974 5500 2345', 'hassan@almeera.com.qa', 'Industrial Area, Doha', 'VAT654987321', 'Supermarket chain - packaging requirements'),
('Education City Foundation', 'Dr. Layla Al Derham', '+974 4411 3456', 'lalderham@qf.org.qa', 'Education City, Al Rayyan', 'VAT147258369', 'University - academic year bulk orders'),
('Hamad Medical Corporation', 'Mohammed Al Jaidah', '+974 4439 4567', 'haljaidah@hmc.qa', 'Hamad General Hospital, Doha', 'VAT963852741', 'Hospital - medical printing needs'),
('Ooredoo Qatar', 'Ali Al Kuwari', '+974 4400 5678', 'ali.alquwari@ooredoo.qa', 'Ooredoo Tower, West Bay, Doha', 'VAT112233445', 'Telecom - event materials'),
('Katara Hospitality', 'Salem Al Mohannadi', '+974 5501 6789', 'salem@katara.qa', 'Katara Cultural Village, Doha', 'VAT556677889', 'Hospitality - menus and branding');

-- ============================================================
-- SAMPLE QUOTATION (For dashboard demo)
-- ============================================================
-- This inserts a sample quotation using subqueries to reference actual UUIDs.
-- Run this after the inserts above have populated the customers and products tables.
INSERT INTO quotations (quotation_number, customer_id, status, total_amount, vat_amount, profit_margin_percentage, notes, terms_and_conditions)
SELECT 'QTN-2026-0001', id, 'Approved', 2625.00, 125.00, 25.00, 'Q1 2026 Marketing Materials - Business Cards, Flyers & Brochures', 'Payment due within 15 days. Prices valid for 7 days.'
FROM customers WHERE company_name = 'Qatar Trading & Contracting Co.';

INSERT INTO quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT
  (SELECT id FROM quotations WHERE quotation_number = 'QTN-2026-0001'),
  (SELECT id FROM products WHERE name = 'Business Cards (Standard 9×5cm)' LIMIT 1),
  'Business Cards (Standard 9×5cm)', 5000, 0.312, 1560.00,
  '{"colorMode":"4+0","printingMethod":"offset","material":"Art Paper Gloss 350gsm 70×100","finishing":["Gloss Lamination (A4)"],"labour":["Cutting (Paper)","Packing (Standard)"]}';

INSERT INTO quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT
  (SELECT id FROM quotations WHERE quotation_number = 'QTN-2026-0001'),
  (SELECT id FROM products WHERE name = 'Flyers A5' LIMIT 1),
  'Flyers A5', 10000, 0.065, 650.00,
  '{"colorMode":"4+0","printingMethod":"offset","material":"Art Paper Gloss 150gsm 70×100","finishing":[],"labour":["Cutting (Paper)"]}';

-- Second sample quotation - Pending
INSERT INTO quotations (quotation_number, customer_id, status, total_amount, vat_amount, profit_margin_percentage, notes, terms_and_conditions)
SELECT 'QTN-2026-0002', id, 'Pending', 3780.00, 180.00, 30.00, 'Corporate Stationery - Letterheads, Envelopes & NCR Books', 'Payment due within 15 days. Prices valid for 7 days.'
FROM customers WHERE company_name = 'Msheireb Properties';

INSERT INTO quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT
  (SELECT id FROM quotations WHERE quotation_number = 'QTN-2026-0002'),
  (SELECT id FROM products WHERE name = 'Letterheads A4' LIMIT 1),
  'Letterheads A4', 5000, 0.280, 1400.00,
  '{"colorMode":"1+0","printingMethod":"offset","material":"Woodfree 100gsm 70×100"}';

INSERT INTO quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT
  (SELECT id FROM quotations WHERE quotation_number = 'QTN-2026-0002'),
  (SELECT id FROM products WHERE name = 'Envelopes DL' LIMIT 1),
  'Envelopes DL', 3000, 0.380, 1140.00,
  '{"colorMode":"1+0","printingMethod":"offset","material":"Woodfree 100gsm 70×100"}';

-- Third sample quotation
INSERT INTO quotations (quotation_number, customer_id, status, total_amount, vat_amount, profit_margin_percentage, notes, terms_and_conditions)
SELECT 'QTN-2026-0003', id, 'Pending', 1500.00, 71.43, 20.00, 'Annual Report Printing - 100 copies A4 Perfect Bound', 'Payment due within 15 days. Prices valid for 7 days.'
FROM customers WHERE company_name = 'Education City Foundation';

INSERT INTO quotation_items (quotation_id, product_id, product_name, quantity, unit_price, total_price, details)
SELECT
  (SELECT id FROM quotations WHERE quotation_number = 'QTN-2026-0003'),
  (SELECT id FROM products WHERE name = 'Catalogues A4 Spiral Bound' LIMIT 1),
  'Catalogues A4 Spiral Bound', 100, 15.00, 1500.00,
  '{"colorMode":"4+4","printingMethod":"offset","material":"Art Paper Gloss 150gsm 70×100","finishing":["Perfect Binding"],"labour":["Packing (Standard)"]}';
