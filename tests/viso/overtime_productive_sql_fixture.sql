-- Contrato minimo de public.employee_shifts para QA SQL EFIMERA.
-- NUNCA ejecutar en proyectos Supabase reales.
CREATE TABLE public.employee_shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL,
  site_id uuid NOT NULL,
  shift_date date NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  break_minutes integer DEFAULT 0,
  shift_kind text NOT NULL DEFAULT 'laboral',
  status text NOT NULL DEFAULT 'scheduled',
  published_at timestamp with time zone,
  published_by uuid
);

-- Se crea DESPUES de aplicar el SQL candidato.
