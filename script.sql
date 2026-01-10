CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Aseguramos que existan todas las columnas de control de tiempo
-- Usamos comillas dobles porque Sequelize busca nombres Case Sensitive (CamelCase)
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL;

ALTER TABLE ventas ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL;

---

-- 2. Inserción en GASTOS (Incluyendo timestamps)
INSERT INTO gastos (id, fecha, categoria, monto, descripcion, "createdAt", "updatedAt", "deletedAt") VALUES
('0f6ec394-bd25-4700-ba35-37ae5c541997', CURRENT_DATE + (random() * interval '24 hours'), 'Oficina', 1500.50, 'Alquiler oficina central', NOW(), NOW(), NULL),
('fc17ba23-a683-4aad-80b0-af23b86d6eb3', CURRENT_DATE - (random() * interval '6 days'), 'Servicios', 450.00, 'Luz y Agua', NOW(), NOW(), NULL),
('d6a153cf-2737-4b6f-a5dc-8b4b78a6c2d6', CURRENT_DATE - (interval '7 days' + random() * interval '18 days'), 'Marketing', 1200.00, 'Publicidad en Meta', NOW(), NOW(), NULL),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', CURRENT_DATE - (interval '30 days' + random() * interval '60 days'), 'Suministros', 300.25, 'Papelería y tintas', NOW(), NOW(), NULL),
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', '2025-01-01'::timestamp + (random() * interval '300 days'), 'Hardware', 8500.00, 'Compra de Monitor 4K', NOW(), NOW(), NULL)
ON CONFLICT (id) DO NOTHING;

---

-- 3. Inserción en VENTAS (Incluyendo timestamps)
INSERT INTO ventas (id, fecha, categoria, monto, descripcion, "createdAt", "updatedAt", "deletedAt") VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', CURRENT_DATE + (random() * interval '23 hours'), 'Servicios', 5000.00, 'Consultoría IT', NOW(), NOW(), NULL),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', CURRENT_DATE - (random() * interval '7 days'), 'Productos', 1200.50, 'Venta de Licencia Software', NOW(), NOW(), NULL),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', CURRENT_DATE - (random() * interval '7 days'), 'Servicios', 3500.00, 'Mantenimiento preventivo', NOW(), NOW(), NULL),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', CURRENT_DATE - (random() * interval '30 days'), 'Consultoría', 2800.00, 'Análisis de procesos', NOW(), NOW(), NULL),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', CURRENT_DATE - (random() * interval '30 days'), 'Productos', 950.00, 'Venta periféricos', NOW(), NOW(), NULL)
ON CONFLICT (id) DO NOTHING;
