# VENTO QA Kernel — runbook de operación y recuperación

**Propietario:** VENTO QA Kernel (#1049). **Entorno permitido:** PostgreSQL/Supabase QA **LOCAL AISLADO** sobre una copia descartable acreditada por repositorio, rama, SHA, huellas y propietario Docker. **Modo del contrato Shell:** `PLAN_ONLY`. El ejecutor físico es VENTO MCP, con consentimiento modal de VS Code.

Este runbook no concede autorización para despliegue, SQL remoto, modificación de datos reales, `db reset`, borrado de volúmenes ni reinicio de servicios ajenos. Los tests de migración y pgTAP ya aprobados no deben repetirse sin cambio relevante de SHA, escenario o gate.

## 1. Preflight: nunca asumir READY

1. Consultar #1020, #1038 y #1049, plan canónico, propietario de la fase y autorizaciones vigentes.
2. Leer `workspace_overview`, `git_status` y `local_qa_catalog`. Exigir Git limpio, rama y SHA exactos, inventario/huella del origen, CLI verificada y ausencia de sesiones activas incompatibles. Un catálogo vacío no acredita ausencia de recursos Docker.
3. Corroborar `scripts/quality/qa-kernel-capabilities.json`: solo `QA_LOCAL_ISOLATED`; ninguna ejecución de plan por sí sola certifica SQL.
4. Confirmar identidad del stack: registro CLI, etiquetas Docker, `Mounts`, `HostConfig.Mounts`, namespace propio `VolumeOptions.Subpath`, auxiliares administrados y consumidores **activos y detenidos**. Cualquier dato contradictorio o symlink/montaje kernel no verificable obliga a `BLOCKED`.
5. Autorizar la nueva copia mediante `local_qa_begin` **solo después del modal** de alcance exacto. Registrar el `session_id`, SHA, huellas, cantidad de migraciones/tests y clasificación `DIRECT_PARITY` o `COMPAT_QA`. Los resultados nunca se transfieren entre esas clasificaciones.

**STOP:** no ejecutar `local_qa_run` cuando falla el preflight, no hay propietario, el inventario deriva, el puerto se superpone, el CLI no es verificable o el ambiente no es el aislado local. No crear un bootstrap alternativo informal.

## 2. Ejecución y trazabilidad

1. Utilizar `local_qa_run` únicamente con el `session_id` autorizado, acción y archivos de la allowlist. `RUNNING` y `PENDING` no significan PASS.
2. Consultar `local_qa_status` y `local_qa_artifact`; conservar SHA, tipo de escenario, etapas, conteo de archivos y aserciones, códigos de error sanitizados y pruebas no ejecutadas. Nunca registrar stdout crudo, HBA, tokens, contraseñas, rutas privadas ni cadenas de conexión.
3. Distinguir `CLI_BOOTSTRAP_TIMEOUT` / `PROCESS_INTERRUPTED` de fallo SQL/MIGRATION. Un `QA_TEST_FAILED` en etapa `TEST` es un fallo de prueba (`TEST_FAILURE`), aunque haya una limpieza correcta; jamás reclasificar como PASS o infraestructura por un campo diagnóstico conflictivo.
4. Exigir pgTAP realmente ejecutado con `files_completed = files_requested`, `files_fail = 0`, `files_blocked = 0` y sin pendientes. Los oráculos, concurrencia, transacciones y ROLLBACK del SQL original deben preservarse en la copia QA SHA-verificada.
5. Registrar `FAIL`/ `BLOCKED` con causa y siguiente acción. No alterar historiales ni atribuir certificación a un SHA distinto.

## 3. Finalización, seguridad y recuperación

1. Invocar `local_qa_end(cleanup_files=false)` con identidad de sesión y consentimiento vigente. El finalizador solo puede detener recursos **propios**, preservar archivos para auditoría y no borrar volúmenes Docker.
2. Si se utilizaron reglas SCRAM, passfile, observabilidad o mappings temporales, exigir restauración de HBA y ajustes originales con SHA/CAS y procedencia; comprobar ausencia de privilegios u objetos residuales. Ante divergencia: `BLOCKED`, no afirmar limpieza.
3. Ejecutar `local_qa_postflight` de forma independiente con origen, SHA, huella y voucher cerrados. Verificar owner, procesos Windows, Docker, consumidores y ausencia de modificaciones del stack persistente.
4. Tras timeout, aborto, caída de VS Code o voucher huérfano: `local_qa_recover(diagnose)` primero; `attest` solo lectura después; `end` solo con propiedad/consentimiento comprobados. Si únicamente se acredita ausencia de recursos, conservar `RECOVERED_RESOURCE_ONLY` / `ATTESTED_RECOVERY_ONLY`, con `cleanup_attested=false` y `pg_tap_certified=false`. No revivir un FAIL histórico como PASS.
5. Volver a verificar dos veces el estado de recursos y Git; nunca reiniciar Docker o Windows para forzar un recibo, ni modificar a mano los vouchers.

## 4. Matriz mínima de permisos

| Operación | Evidencia y autorización requeridas | Prohibido |
| --- | --- | --- |
| Catálogo, Git, diagnósticos | Fuente exacta, solo lectura | Suponer que ausencia en RAM significa ausencia Docker |
| Crear copia QA | Modal y propietario, entorno LOCAL, SHA, CLI y Docker validados | Usar hosted o reutilizar stack ajeno |
| Ejecutar pgTAP | Sesión autorizada, tests allowlisted, invariantes y rollback | SQL libre, credenciales incrustadas |
| Preparar SCRAM/BIND | Autorización limitada; HBA CAS, autenticación positiva/negativa | `GRANT` FDW global, credenciales en logs |
| Terminar/recuperar | Voucher y owner comprobados, postflight independiente | Reset, `docker volume rm`, force o STOP ajeno |
| Merge o despliegue | Gates técnicos, CI y autorización **separada** | Inferir permiso por QA PASS |

## 5. Dos arranques en frío: gate físico pendiente hasta ejecutar

Cada ciclo requiere consentimiento previo del operador y **reinicio real** de Windows/Docker Desktop, no simulación ni reinicio forzado desde una herramienta. En **dos ciclos independientes** registrar: fecha, versión MCP/CLI/Docker/PostgreSQL, Git SHA y huellas, arranque del túnel, Docker ready, stack QA propio con DB/Auth/Storage READY, puertos loopback e identidad, tests de salud autorizados y cierre/postflight. Cualquier `NOT_VERIFIED`, cambio de SHA o identidad, proceso residual o servicio faltante = `FAIL`/`BLOCKED`. No contar una relectura del mismo ciclo como segunda prueba.

## 6. Compatibilidad y métricas

**Referencias observadas, no garantía universal:** Docker 26 admite `VolumeOptions.Subpath`; el contrato local contrastó Supabase CLI 2.121.0 y PostgreSQL 17; el MCP de la fuente contrastada es v0.13.144. Antes de operar, verificar las versiones **instaladas efectivas** y compatibilidad por SHA, no solo por documentación.

Consolidar por sesión y por SHA: tasa `READY` (sesiones listas / sesiones iniciadas), duración de startup y recuperación, conteos de FAIL por clase (`PROCESS`, `DOCKER`, `MIGRATION`, `PGTAP`, `AUTH`), pruebas completadas/pendientes, recursos creados/terminados, reversas y postflights atestados, antigüedad del SHA y drift de identidades. **PENDIENTE:** instrumentar y verificar extracción automática y alertas sobre esas métricas. Esta lista no acredita telemetría activa.

## 7. Condiciones de cierre

Cierre F0–F6 **solo** con artefactos inspeccionables del SHA y ambiente exactos, pruebas positivas/negativas y casos de fallo, restauración de seguridad, dos cold boots físicos, CI de integración final y consumidores adoptantes aceptados en su ámbito. La aceptación empresarial E2E se gobierna separadamente. No marcar `COMPLETE` por un runbook, código, CI parcial o simulaciones.
