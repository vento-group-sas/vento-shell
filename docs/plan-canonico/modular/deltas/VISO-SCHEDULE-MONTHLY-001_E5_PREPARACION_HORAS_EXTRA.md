# VISO-SCHEDULE-MONTHLY-001 — preparación E5 de jornada y horas extra

> **Estado:** `DRAFT_PRE_E5 / BLOQUEADO`. Propuesta del 2026-11-02, sin aprobación `VISO-SCH-008` ni `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001`. **No implementa código, no autoriza migraciones y no cambia producción.**

## 1. Autoridad, alcance y fronteras

- **Paquete reservado:** `VISO-SCHEDULE-MONTHLY-001`; **proceso propietario:** `VPROC-0007`, `PROC-CAT-005`; propietaria de la programación: **VISO**; consumidora de turnos publicados: **ANIMA**.
- **Dependencias vigentes:** `CODE-AUD-021` → `AUTH-UI-061` → `VISO-SCH-001..008` → familias funcionales, AUTH y SUPA aplicables → `DELIV-PKG-001..025` → `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001` → `SHELL-CI-020..024`. El orden normativo se conserva sin declarar tareas completadas.
- **Fuentes rectoras:** `90_ORDEN_DE_IMPLEMENTACION.md`, `G_VISO/01A_PROGRAMACION_LABORAL.md`, `04A_08_VISO.md`, `04B_RECONCILIACION_DELTA_VISO_PROGRAMACION.md`, `I_NAVEGACION_Y_PANTALLAS/07_RECONCILIACION_DE_DERIVA_POSTERIOR.md`, `DELTA-VISO-SCHEDULE-20260731-001.md`.
- **Alcance:** planificar, revisar, autorizar suplementarias, publicar, corregir y auditar turnos semanales y mensuales, con totalización por trabajador entre sedes; no desarrollar nómina, liquidación, POS, calendarios comerciales, ni habilitar nuevas excepciones o permisos de forma tácita.
- **Seguimiento:** [VISO #20](https://github.com/vento-group-sas/vento-viso/issues/20), [Shell #1038](https://github.com/vento-group-sas/vento-shell/issues/1038). Alta de Unicentro: **frente independiente** `VPROC-0002`/[VISO #21](https://github.com/vento-group-sas/vento-viso/issues/21), no se computa como E5 de programación.

## 2. Incidente y norma aplicable

**AS-IS verificado por código y metadatos de DB (2026-11-02):**
- `vento-viso/src/app/staff/schedule/month/constants.ts`: `MONTHLY_SCHEDULE_LIMIT_HOURS=186`, advertencia `174`. `month/page.tsx` bloquea botón; `month/actions.ts::publishMonthAction` rechaza publicación si suma del mes es mayor a 186 h.
- `public.trg_viso_monthly_schedule_publish_limit` habilitado en STAGING persistente `rcrxixmqhrndcervbllp` y producción heredada `clzdpinthhtknkmefsxx`; función `public.viso_enforce_monthly_schedule_publish_limit` con `11160` minutos y `SECURITY DEFINER`; suma borradores además de publicados, lo que puede impedir publicar una selección legítima.
- `publishWeekAction` no usa la misma evaluación TypeScript que mes; SQL sigue bloqueando. `public.employees` no registra la jornada pactada; `public.shift_policy` no aporta las horas ordinarias o extras por contrato. La migración histórica nombrada en el delta de julio no está en Shell `main` actual: **conciliar, no reescribir ni ejecutar SQL manual para eludir historial**.

**TO-BE sujeto a validación jurídica y contractual:**
1. Desde el **15-07-2026**, jornada ordinaria máxima general **42 horas semanales**, distribuible entre 5 y 6 días con descanso; jornada ordinaria pactada menor y regímenes especiales prevalecen cuando correspondan. Regla general diaria 8 horas salvo distribución legal diferente; modalidad flexible pactada permite entre 4 y 9 horas diarias dentro de 42 semanales sin que 9 por sí sola sea hora extra.
2. Trabajo suplementario general: **máximo 2 horas extra/día y 12 horas extra/semana** (Ley 2466 de 2025, art. 13), excepto regímenes expresamente exceptuados por la ley. Cada autorización empresarial debe ser trazable; no confundir autorización empresarial con licencia del Ministerio.
3. `186`, `188` y el **divisor salarial 210 de 2026** no constituyen límites mensuales generales para publicar turnos. El mes muestra **ordinarias previstas + extras previstas autorizadas + total proyectado**; el cumplimiento se evalúa por **día/semana, contrato y régimen**. Cruces de meses y años requieren sumar todas las sedes.
4. Las horas **programadas** no son horas **laboradas**. Marcaciones, ausencias, cambios, trabajo nocturno, dominical/festivo y cálculo de pago requieren registros efectivos y su propia transición a nómina. El registro legal de extras laboradas incluye actividad, horas y carácter diurno/nocturno.
5. Cuando falte la jornada pactada, se admite preparar **borrador**, pero no se asignan extras aprobadas ni se publica con una política supuesta. Política horaria fechada, versionada, aprobada y revisable; no aplicar retroactivamente reglas nuevas a publicaciones históricas.

**Fuentes oficiales:** [Ley 2466/2025, artículos 11 a 13](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=260676) y [Circular 0101/2025, Ministerio del Trabajo](https://cancilleria.gov.co/normograma/compilacion/docs/circular_mintra_0101_2025.htm). Antes de habilitar producción confirmar acuerdos individuales, descansos y categorías efectivas mediante responsable laboral.

## 3. Modelo funcional y de datos candidato (NO materializado)

| Concepto | Campo / invariant propuesto | Propietario |
| --- | --- | --- |
| Contrato laboral | Trabajador, jornada semanal pactada en minutos, régimen, días de distribución, vigencia inicio/fin, origen de aprobación y versión | RR. HH. / autoridad contractual |
| Política legal | Región, fecha de vigencia, máximo semanal ordinario, máximos extra día/semana, regla diaria y excepciones con fundamento | Política central versionada |
| Turno | `employee_id`, `site_id`, día/hora local, pausa no negativa, rol/área, borrador/publicado, `published_at`/`published_by`, versión | `employee_shifts` canónica |
| Proyección laboral | Día y semana local `America/Bogota`, minutos ordinarios + suplementarios, fuentes de todas las sedes, conflictos y razones legibles | Validador privado del servidor |
| Autorización de extras | Solicitante, aprobador competente, turno/intervalo/semana, minutos autorizados, política/vigencia, decisión, actor real/efectivo y auditoría | Acción privada con control territorial |
| Publicación | Operación idempotente, versión y lock por empleado/semana, revalidación servidor transaccional, snapshot y reversa | VISO + SQL forward gobernado |
| Evento a ANIMA | `schedule_version`, destinatario, idempotency key, outbox/reintento, resultado de entrega; sin duplicar turnos | VISO publica; ANIMA consume |
| Horas efectivas | Registros de asistencia ANIMA, actividad real y clasificación diurna/nocturna; jamás rellenar desde turnos planificados | ANIMA / nómina (fuera del incremento) |

**Decisiones aún sin cerrar:** fuente autorizada de contrato y acuerdo flexible; quién aprueba extras y bajo qué permiso existente o nuevo (no concedido); reglas de pausas, nocturnidad, festivos y descanso; partición de semanas y cruces de medianoche; si la publicación debe ser transacción única por trabajador/semana o lote con compensación; conservación/reversión por historial.

## 4. Estados, acciones, UX y seguridad

Flujo TO-BE: `BORRADOR` → `REVISION` → (`AUTORIZACION_EXTRAS` cuando aplique) → `PUBLICADO` → `CORREGIDO/ANULADO` bajo acción autorizada. **Estados conceptuales, no se crean columnas ni tablas en esta propuesta.**

Vista mensual prevista:
```text
NOVIEMBRE 2026 · Todas las sedes del trabajador
Jornada ordinaria aplicable: 42 h/semana (o contrato válido)
Horas ordinarias programadas: 168 h
Horas extra previstas y autorizadas: 8 h
Total programado: 176 h
Semana del 2 al 8: 42 h ordinarias + 2 h extra · conforme
[Guardar borrador]   [Solicitar autorización]   [Publicar horario]
```
*Los valores son ilustrativos: nunca se calculará 168 h como máximo mensual universal.*

- Mostrar advertencia por violación diaria/semanal o falta de autorización; **no** bloquear por 186 h mensuales.
- Las vistas Semana/Mes usan la misma fuente, validador y autorización; el alcance visible del supervisor sigue restringido a sedes concedidas, aunque el motor privado compute turnos de todas las sedes.
- Las acciones de autorización, publicación, corrección y eliminación de borradores tienen permisos y auditoría distintos. No usar service-role para saltar autorizaciones de negocio. `SECURITY DEFINER` actual: auditar owner/grants/search_path; las funciones privadas nuevas no deben quedar ejecutables libremente por `anon/authenticated`.
- Concurrencia: un único cálculo efectivo por trabajador/semana y versión; fallo de cualquier turno impide publicación parcial; duplicación de reintentos o ANIMA no duplica el evento.

## 5. TREQ vigentes y criterios E2E de aceptación

**04A:** conservar las **14 columnas**, IDs y relaciones; reconciliar `TREQ-VISO-032..044`, más `024..031` y `045` según alcance. En particular `035` debe permitir **horas extra legales aprobadas**; el bloqueo se reserva para infracción o falta de autorización. `CODE-AUD-021` y `AUTH-UI-061` conservan estado PENDING hasta la auditoría formal.

| Caso mínimo | Resultado esperado | TREQ / proceso |
| --- | --- | --- |
| Jornada semanal exactamente 42 h, sin extras | PUBLICABLE bajo contrato general | 032, 034, 036 |
| Semana con 42 ordinarias + 2 extras legalmente autorizadas | PUBLICABLE sin falso bloqueo mensual | 032, 035, 036 |
| Acumulado mensual 190 h con semanas legales | PUBLICABLE; desglose fiel | 032, 033, 035 |
| 3 extras en un día sin excepción | BLOQUEADO y motivo preciso | 034, 035 |
| 13 extras en una semana sin excepción | BLOQUEADO y motivo preciso | 034, 035, 039 |
| Horas extra sin aprobación empresarial | Borrador permitido; publicación denegada | 035, 037, 043 |
| Distribución flexible 9 h pactada y 42 semanales | No clasificar automáticamente la novena hora como extra | 032, 034 |
| Contrato pactado de jornada menor | Contabilizar extras desde el contrato aplicable | 032, 034 |
| Turnos multisedes en la misma semana | Control total agregado, sin filtrar sedes ajenas en UI | 033, 042 |
| Semana que atraviesa mes/año y febrero bisiesto | Mismo resultado desde Semana y Mes | 024, 025, 036 |
| Borrador adicional no seleccionado | No dispara falso rechazo de publicación | 035, 039 |
| Solapes, doble turno y pausas inválidas | Denegación validada en servidor | 030, 031, 038 |
| Dos publicaciones competidoras | Una decisión coherente; sin parcial ni doble extras | 038, 039 |
| Rol/sede/actor manipulado | Denegación, sin fuga de otras sedes | 033, 042, 045 |
| Corrección o anulación publicada | Versionado, permisos y compensación auditables | 037, 040, 041, 043 |
| Notificación ANIMA fallida/reintentada | Entrega recuperable e idempotente | 044 |
| Registros reales de asistencia | No inferir extras pagadas desde turnos futuros | 032, 043 |

**12 gates `PROC-COVER-007` para VPROC-0007:** resultado, alcance, inicio-fin, camino normal, excepción, corrección/reversa, autorización, datos, auditoría, integración, continuidad/idempotencia y prueba/aceptación: **todos PENDING** de evidencia E2E, no `COMPLETE`.

## 6. Paquete E5: planificación sin ejecución

**DELIV-PKG-001..025** deben generar por instancia: identidad/alineación VPROC, alcance y no alcance, objetivos de operación, responsables, consumidores, mapeo TREQ, contratos de datos, interfaces y acciones, topología y repositorios exactos, dependencias físicas, riesgos, orden por migración, escenarios y archivos de pruebas, comandos autorizados, método de validación, seguridad, matriz de permisos, observabilidad, compatibilidad, cutover, rollback, operación, criterios de aceptación y vínculo `implementation_unit_id`. **Hoy: faltan instancias aprobadas y los expedientes no se consideran completados.**

- **Alcance físico previsto POST_E5:** VISO `src/app/staff/schedule/month/{constants.ts,page.tsx,actions.ts,block-actions.ts}`, `src/app/staff/schedule/actions.ts`, helpers/componentes relacionados; VENTO Shell **nueva migración forward creada con Supabase CLI** para política/trigger/proyecciones necesarias, pruebas pgTAP y registro de migraciones. El inventario es candidato y sujeto a `DELIV-PKG-025`, no permiso para escribir esos archivos ahora.
- **READY-GATE-001..015 (plan):** demostrar versión/ambiente exactos, migración+datos, permisos/RLS, estado de ANIMA, cobertura E2E, estabilidad de turnos, respaldos/restauración, monitoreo y responsable; no usar fixtures de producción.
- **CUTOVER-OPS-001..010 (plan):** confirmar fuente vigente, foto pre-cambio y backup verificable; ventana autorizada; aplicar forward en **STAGING persistente primero** con secuencia de migraciones válida; ejecutar tests de semana/mes y ANIMA; observar; habilitar producción solo por autorización separada; registrar rollback compatible con histórico y horas programadas.
- **HYPERCARE-OPS-001..010 (plan):** seguimiento de publicaciones denegadas, extras autorizadas, duplicados, trabajos ANIMA, desvíos de minutos, incidencias, compensaciones y aceptación laboral; rollback ante anomalía de protección o integridad.
- **Precondiciones físicas:** `SHELL-CI-001..019` y fundaciones SQL aplicables certificadas en su SHA/entorno; salida AUTH segura, RLS, drift y migración histórica reconciliados; `CODE-AUD-021`, `AUTH-UI-061` y `VISO-SCH-001..008` aprobados; `04A` actualizado y validado; criterios E5 exactos PASS y autorización de fase.

## 7. Evidencia realmente obtenida y bloqueos

- `vento-viso/fix/gap-pkg-004-viso-qa@94d3b8fd`: `npm run typecheck` **PASS**; `npm run test` **FAIL: 46/47 PASS** por `QA_DOCKER_DATABASE_CONTAINER_MISSING_OR_AMBIGUOUS` en test SSR de GAP-PKG-004. No asociar ese fallo al cálculo de horas extra ni declarar suite PASS.
- `vento-shell/infra/package-gate-gap-pkg-004@f9bc2263`: checks `docs:implementation:status`, `docs:treq:check`, `docs:package:execution:check` **PASS**, 7.066 TREQ sin error de relaciones. Coordinador indica `PRIMARY_PACKAGE=GAP-PKG-004`, `HUMAN_PACKAGE_SELECTION=FALSE`; **no atribuir frontier a este paquete especial**.
- El gate `scripts/docs/package-gate-lifecycle.mjs` admite `GAP-PKG-###`; `VISO-SCHEDULE-MONTHLY-001` está reservado en `implementation-capability-index.json` y `implementation-package-registry.json`. No falsificar `E5-GATE-008` ni alterar la frontera del coordinador.
- **BLOCKED:** contrato laboral individual/vigencia; autorización de extras; periodos y descansos; datos y privacidad; drift/historial SQL; pruebas E2E/rollback; análisis AUTH y aprobación de paquete. **Cero cambios remotos a STAGING/producción; cero implementación física certificada.**

## 8. Ruta de cierre

1. Gobernar estas reglas como cambio de requisitos `04A`, conservando IDs y 14 columnas; completar auditoría `CODE-AUD-021` sobre SHA estable y ruta `AUTH-UI-061`.
2. Someter `VISO-SCH-001..008` y el modelo laboral/seguridad a aprobación funcional y jurídica; definir escenarios y propietario de permisos.
3. Formalizar `DELIV-PKG-001..025`, readiness, cutover e hypercare sin anticipar pruebas o migraciones.
4. Evaluar dependencias y mecanismo exacto para paquete especial; aprobar `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001` **solo si los gates son reales y el responsable lo autoriza**.
5. Autorizar por separado el desarrollo `SHELL-CI-020`, migraciones STAGING/producción, PR, merge y despliegue, con aceptación `VPROC-0007` por 12 gates y evidencia vigente.

`CURRENT_STATE=DRAFT_PRE_E5` · `E5_GATE_APPROVED=false` · `STAGING_MUTATED=false` · `PRODUCTION_MUTATED=false` · `E2E_CERTIFIED=false`
