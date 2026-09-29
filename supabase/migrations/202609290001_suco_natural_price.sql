-- Update the existing catalog entry without changing other products.
update public.products set price = 5.00, updated_at = now() where id = 'p-suco-natural';
