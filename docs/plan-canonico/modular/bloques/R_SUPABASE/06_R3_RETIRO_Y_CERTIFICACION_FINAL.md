### R3 — Retiro y certificación final

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AUTH-DB-030-031 -->
### Reconciliación topológica de AUTH-DB-030 y AUTH-DB-031

El retiro legacy y la certificación de paridad ocurren una sola vez al cierre, únicamente después de adopción, pilotos, reconciliación, seguridad, restauración y paridad de ambientes.

| modalidad | `GLOBAL_FINAL` |
| gate temporal | `POST_E5_PACKAGE` |
| identidad | `<task_id>::GLOBAL-FINAL` |

### ✅ AUTH-DB-030 — Retirar objetos legacy únicamente después de adopción comprobada

**Estado:** APROBADA
**Tarea anterior:** UX-QA-030 — Probar AURA únicamente después de aprobar su continuidad
**Tarea siguiente:** AUTH-DB-031 — Certificar paridad entre documento, vento-shell, Supabase y aplicaciones
**Tipo de tarea:** Documental — definición canónica del cierre global final de retiro legacy, con futura materialización física única y condicionada por adopción, convergencia a cero, compatibilidad, seguridad, restauración, rollback y paridad de ambientes
**Bloque:** BLOQUE R3 — Retiro legacy y certificación final
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/R_SUPABASE/06_R3_RETIRO_Y_CERTIFICACION_FINAL.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`; la futura instancia física es `AUTH-DB-030::GLOBAL-FINAL`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; la futura materialización física permanece reservada a la instancia `AUTH-DB-030::GLOBAL-FINAL` después de superar `POST_E5_PACKAGE` y todos los gates definidos en esta tarea
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cuándo y con qué evidencia puede retirarse una superficie u objeto legacy después de que la arquitectura canónica haya sido adoptada por sus consumidores.

La tarea existe para impedir el patrón:

```text
EXISTE REEMPLAZO
→ RETIRAR LEGACY
```

La regla correcta es:

```text
REEMPLAZO MATERIALIZADO
+ CONSUMIDO POR TODOS LOS ACTORES APLICABLES
+ PARIDAD RESUELTA
+ CERO USO RESIDUAL DEMOSTRADO
+ SEGURIDAD APROBADA
+ RECONCILIACION APROBADA
+ RESTAURACION Y ROLLBACK DEMOSTRADOS
+ PARIDAD DE AMBIENTES
= OBJETO ELEGIBLE PARA RETIRO
```

La elegibilidad no ejecuta por sí sola el retiro.

---

#### 2. Reconciliación topológica

La topología canónica aplicable es:

```text
mode = GLOBAL_FINAL
execution_gate = POST_E5_PACKAGE
physical_instance = AUTH-DB-030::GLOBAL-FINAL
```

Consecuencias:

- existe una sola instancia física final para toda la tarea;
- no existe una instancia por package;
- no existe una instancia por `implementation_unit_id`;
- la definición documental puede cerrarse antes de la materialización física;
- la instancia física no puede abrirse como atajo para completar migraciones pendientes;
- cualquier package, consumidor o unidad que conserve dependencia legacy bloquea el retiro de la superficie afectada;
- `AUTH-DB-031` permanece separado y certifica la paridad final después del retiro controlado.

---

#### 3. Fuentes vinculantes consumidas

Esta tarea consume sin reabrir:

- `SHELL-PKG-005`, para deprecación, ventana ordinaria, inventario de consumidores, compatibilidad, evidencia y gate de retiro;
- `SHELL-AUTH-003`, para el registro canónico de consumidores y su identidad estable;
- `SHELL-AUTH-004`, para freeze, scanner, allowlist temporal, métricas, cinco familias legacy y prohibición de nueva deuda;
- `SHELL-AUTH-005`, para migración de consumidores, paridad, cutover, observación, commit de migración y handoff de retiro;
- `AUTH-DB-020`, para migración de objetos por dominio con compatibilidad temporal;
- `AUTH-DB-006 — Incorporar contexto canónico en RPC sensibles`, para que el reemplazo consuma contexto canónico;
- `AUTH-DB-007 — Validar sede dentro de RPC sensibles`, para que la sede requerida sea validada en la frontera propietaria;
- `AUTH-DB-008 — Validar área dentro de RPC sensibles`, para que el área requerida sea validada en la frontera propietaria;
- `AUTH-DB-009 — Validar permiso exacto dentro de RPC sensibles`, para conservar autorización por permiso exacto;
- `AUTH-DB-010 — Validar principal y actor efectivo dentro de RPC sensibles`, para conservar identidad de principal y actor efectivo;
- `AUTH-DB-021`, para políticas RLS y grants canónicos por esquema;
- `AUTH-DB-027`, para pruebas de esquema, integridad, RLS, RPC y migraciones;
- `AUTH-DB-028`, para baseline y drift entre local, staging y producción;
- `AUTH-DB-029`, para respaldo, restauración y rollback;
- `AUTH-QA-001..030` y `UX-QA-001..030`, como certificación transversal previa cuando sea aplicable;
- el Registro 04A vigente y la cobertura de retiro, compatibilidad, legacy, rollback y evidencia ya existente.

La tarea no convierte documentación previa en evidencia física ejecutada.

---

#### 4. Separación entre cierre documental y retiro físico

El marcador documental fija el contrato de retiro.

La futura instancia `AUTH-DB-030::GLOBAL-FINAL` deberá demostrar el estado material contra repositorios, paquetes, consumidores, base de datos y ambientes reales.

Por tanto:

```text
TAREA DOCUMENTAL APROBADA
!=
OBJETO RETIRADO
```

```text
GATE DOCUMENTAL COMPLETO
!=
GATE FISICO SUPERADO
```

```text
CERO EN UNA TABLA DOCUMENTAL
!=
CERO USO RUNTIME
```

---

#### 5. Regla raíz de retiro

Ningún objeto legacy se retirará únicamente porque:

- exista un objeto canónico equivalente;
- exista una migración nueva;
- una aplicación compile;
- una búsqueda textual no encuentre referencias;
- una métrica puntual sea cero;
- un ambiente no tenga tráfico observado;
- haya transcurrido tiempo;
- una fila de inventario diga `MIGRATED` sin evidencia vigente;
- una deprecación haya sido anunciada;
- un package nuevo esté publicado;
- un consumidor haya migrado mientras otro siga pendiente.

El retiro exige evidencia convergente y atribuible al mismo corte.

---

#### 6. Universo de retiro gobernado

`AUTH-DB-030` gobierna únicamente objetos o superficies que lleguen identificados por una fuente propietaria con:

1. identidad exacta;
2. clase de objeto o superficie;
3. repositorio, schema o ambiente propietario cuando aplique;
4. consumidor o consumidores conocidos;
5. reemplazo canónico o decisión explícita de eliminación sin reemplazo;
6. owner;
7. evidencia de migración;
8. evidencia de uso residual;
9. evidencia de seguridad;
10. evidencia de rollback;
11. condición de retiro;
12. estado por ambiente.

Un objeto descubierto durante la instancia sin esas propiedades no se retira por inferencia. Se clasifica como bloqueo hasta que su propietaria lo reconcilie.

---

#### 7. Cinco familias legacy explícitamente congeladas

Se preserva exactamente el universo de cinco familias definido por `SHELL-AUTH-004`:

```text
has_permission
has_operational_permission
has_effective_permission_v1
get_operational_context
get_effective_context_v1
```

Estas identidades son familias de compatibilidad legacy y no equivalen automáticamente a cinco objetos físicos únicos.

La futura instancia deberá resolver para cada familia:

- wrappers;
- exports;
- llamadas directas;
- alias o reexports;
- implementaciones RPC o funciones reales aplicables;
- referencias SQL/RLS aplicables;
- superficies de compatibilidad en `@vento/os-context/legacy`;
- consumidores residuales.

Solo se retiran objetos físicos efectivamente reconciliados.

---

#### 8. Prohibición de ampliar el universo por similitud

No se clasifica como objeto de `AUTH-DB-030` una función, policy, helper, script o endpoint únicamente porque:

- tenga un nombre parecido;
- use permisos;
- pertenezca a Supabase;
- haya sido llamado legacy en una auditoría distinta;
- sea antiguo;
- no tenga consumidor visible en una búsqueda parcial.

Una superficie adicional requiere identidad y owner provenientes de su tarea propietaria, del handoff de `SHELL-AUTH-005` o de un inventario físico reconciliado durante la instancia.

---

#### 9. Registro de consumidores como frontera obligatoria

El baseline documental de `SHELL-AUTH-003` contiene 32 identidades de consumidor con la identidad estable:

```text
(repository, path, surface_type, consumer_name)
```

`AUTH-DB-030` no vuelve a migrar esas filas.

Antes del retiro físico deberá comprobar que las filas aplicables a la superficie que se retira:

- tienen destino canónico materializado;
- tienen evidencia física atribuible;
- no conservan llamada directa legacy;
- no conservan autoridad local legacy;
- no están `PENDIENTE_DE_EVIDENCIA` para el retiro evaluado;
- no dependen de una excepción temporal activa incompatible con el retiro.

---

#### 10. Handoff obligatorio de `SHELL-AUTH-005`

La instancia física no podrá comenzar el retiro de una superficie de autorización/contexto sin un handoff de `SHELL-AUTH-005` que demuestre, para el alcance asignado:

```text
consumidores directos legacy = 0
findings estaticos legacy = 0
consumidores no registrados = 0
client direct authorization = 0
allowlist activa de filas migradas = 0
telemetria legacy = 0 cuando existe cobertura obligatoria demostrada
paridad = resuelta
rollback window = cerrada o transferida conforme al contrato
```

Además, el handoff deberá identificar los objetos backend que siguen existiendo exclusivamente para el retiro final.

Una métrica sin cobertura no se convierte en cero.

---

#### 11. Convergencia de adopción

La adopción comprobada exige que cada consumidor aplicable use el camino canónico aprobado.

Se preserva:

```text
CONSUMIDOR COMPILA
!=
CONSUMIDOR ADOPTADO
```

```text
CONSUMIDOR MIGRADO
!=
TODOS LOS CONSUMIDORES MIGRADOS
```

```text
SHADOW PARITY
!=
CUTOVER COMPLETO
```

Un consumidor solo deja de bloquear cuando su evidencia demuestra la combinación exacta de código, dependencias, backend y ambiente que se declara adoptada.

---

#### 12. Gate de cero lecturas legacy

Antes de retirar una superficie que pueda ser leída, la evidencia deberá demostrar ausencia de lecturas legacy conocidas mediante una combinación suficiente de:

- inventario estático reconciliado;
- registry de consumidores;
- scanner AUTH004;
- pruebas de integración;
- telemetría cuando existe instrumentación obligatoria;
- inspección de superficies backend aplicables;
- evidencia de los consumidores externos registrados.

La falta de instrumentación no equivale a cero lecturas.

---

#### 13. Gate de cero escrituras legacy

Antes de retirar una superficie que pueda producir efectos, la evidencia deberá demostrar que ninguna escritura, mutación o side effect depende del camino legacy.

Se preserva:

```text
CERO LECTURAS
!=
CERO ESCRITURAS
```

La prueba deberá cubrir los consumidores y objetos con capacidad de mutación, incluyendo Server Actions, Route Handlers, RPC, RLS, jobs, Edge Functions u otras superficies solo cuando existan físicamente y estén registradas.

---

#### 14. Gate de scanner y findings

El scanner y gate de `SHELL-AUTH-004` deberán demostrar para el alcance evaluado:

- cero findings nuevos;
- cero findings estáticos legacy asignados que sigan activos;
- cero consumidores directos no registrados;
- cero wildcard;
- cero allowlist stale;
- cero allowlist orphan;
- cero reaparición de una deuda ya migrada;
- ausencia de evasión por alias, wrapper, reexport o traslado de path.

Un scanner parcial, con error, timeout o evidencia de otro commit bloquea el retiro.

---

#### 15. Gate de frontera cliente

PULSO y ANIMA conservan la regla de migración definida por `SHELL-AUTH-005`.

Antes de retirar las superficies legacy de las que dependían sus clientes deberá demostrarse:

- cero RPC internas de autorización invocadas directamente desde cliente;
- proyecciones seguras emitidas por servidor;
- parseo mediante la frontera `/client` aplicable;
- reautorización server-side para toda mutación;
- ausencia de replay usado como autoridad;
- validación con el runtime propio de cada consumidor.

Un PASS de otro runtime no certifica estas superficies.

---

#### 16. Gate de autoridad local

El retiro no se considera completo si el consumidor dejó de llamar una RPC legacy pero conserva localmente el mismo modelo de autoridad.

Deberá demostrarse ausencia aplicable de:

- role fallback como autoridad final;
- allowlist local de roles;
- bypass local;
- `can_operate` como decisión autoritativa;
- booleanos legacy usados como contrato de autorización;
- `EffectiveContext` promovido como autoridad canónica;
- sede, área, actor, turno o check-in suministrados por caller como hechos efectivos;
- copia local de helpers de autorización/contexto.

Migrar el nombre sin migrar la autoridad no habilita retiro.

---

#### 17. Gate de allowlist temporal

Una entrada temporal de `SHELL-AUTH-LEGACY-BASELINE-001` no puede sobrevivir como permiso permanente.

Para el alcance retirado deberán cumplirse simultáneamente:

- owner presente;
- tarea de migración cerrada;
- removal gate satisfecho;
- cero wildcard;
- cero cuota transferible;
- cero stale;
- cero orphan;
- conteo máximo reducido de forma monotónica;
- ninguna firma migrada reaparece.

Una entrada histórica puede conservarse como evidencia, no como autorización de ejecución.

---

#### 18. Gate de paridad por consumidor

Cada consumidor aplicable deberá haber resuelto la comparación legacy/canónica usando la clasificación cerrada de `SHELL-AUTH-005`:

```text
IGUAL
CORRECCION_INTENCIONAL
BRECHA_DE_DATOS
BUG_LEGACY
BUG_CANONICO
CONTRATO_PENDIENTE
```

Solo los resultados compatibles con el oracle canónico y con el cutover aprobado permiten continuar.

`BUG_CANONICO`, `BRECHA_DE_DATOS` o `CONTRATO_PENDIENTE` bloquean el retiro mientras sigan abiertos.

Un `BUG_LEGACY` no se conserva artificialmente para obtener igualdad.

---

#### 19. Gate de pilotos y observación

El cierre R3 exige finalización de los pilotos aplicables.

La evidencia deberá demostrar que el camino canónico operó durante la ventana de observación definida por sus packages y que:

- no se necesitó fallback legacy ordinario;
- no aparecieron consumidores ocultos;
- no hubo divergencia de autorización, contexto o efectos;
- los incidentes fueron reconciliados;
- el rollback o forward-fix propietario permaneció disponible durante la ventana aplicable.

La tarea no inventa una duración universal de observación.

---

#### 20. Gate de deprecación de superficies públicas

Cuando el objeto retirado haya sido una superficie pública estable de un package, se aplican las condiciones de `SHELL-PKG-005`.

La elegibilidad exige, cuando corresponda:

- expediente de deprecación completo;
- anuncio en release estable;
- mínimo de 90 días desde el anuncio;
- al menos una release estable intermedia que conserve la superficie;
- reemplazo soportado o eliminación sin reemplazo explícitamente justificada;
- guía de migración;
- consumidores evaluados;
- ausencia de uso residual conocido;
- compatibilidad aprobada;
- pruebas de package y consumidores;
- rollback operativo;
- aprobaciones de cierre;
- nueva versión MAJOR cuando el retiro de una API estable lo exija.

Estas reglas no se aplican por analogía a una identidad que nunca perteneció a una release estable.

---

#### 21. Conservación de las 28 relaciones package–consumidor

Para deprecaciones de las cuatro familias compartidas se conserva el universo de 28 relaciones de `SHELL-PKG-005`.

El retiro no puede usar una relación omitida como `NO_APLICA` implícito.

Cada relación requerida deberá estar:

- migrada con evidencia;
- declarada `NO_APLICA` con evidencia;
- o cubierta por una excepción temporal válida que, por definición, bloquea el retiro final mientras siga activa cuando afecte la superficie evaluada.

---

#### 22. Compatibilidad de versiones y lineage

Toda evidencia usada por la instancia deberá conservar la misma identidad de:

- repositorio;
- commit;
- manifest;
- lockfile;
- runtime/framework;
- versión de `@vento/contracts`;
- versión de `@vento/os-context`;
- backend y migraciones aplicables;
- registry snapshot;
- scanner/allowlist snapshot;
- package y `implementation_unit_id` de origen cuando corresponda;
- ambiente.

Evidencia de otra combinación es `STALE` para la decisión evaluada.

---

#### 23. Reconciliación de objetos backend

Los objetos backend elegibles deberán provenir de las migraciones y tareas propietarias que hayan materializado el reemplazo.

Para cada objeto residual se deberá demostrar:

1. identidad física exacta;
2. schema y firma cuando corresponda;
3. objeto canónico que asume la responsabilidad o decisión explícita de eliminación;
4. dependencias internas y externas;
5. consumidores directos e indirectos;
6. grants, policies o llamadas asociadas cuando apliquen;
7. estado por ambiente;
8. evidencia de que el objeto no es requerido para rollback ordinario ya cerrado.

No se retira un objeto por coincidencia de nombre con una familia legacy.

---

#### 24. Relación con `AUTH-DB-020`

`AUTH-DB-020` gobierna la migración de objetos por dominio con compatibilidad temporal.

`AUTH-DB-030` solo puede retirar la parte legacy cuando la compatibilidad temporal dejó de ser necesaria de acuerdo con evidencia de adopción.

Por tanto:

```text
COEXISTENCIA TEMPORAL
→ permite migracion
```

pero:

```text
COEXISTENCIA TEMPORAL ABIERTA
→ bloquea retiro final
```

---

#### 25. Relación con `AUTH-DB-006..010`

Las RPC sensibles migradas deberán conservar, sin colapsarlas, las responsabilidades exactas de:

- `AUTH-DB-006 — Incorporar contexto canónico en RPC sensibles`: contexto canónico;
- `AUTH-DB-007 — Validar sede dentro de RPC sensibles`: sede aplicable;
- `AUTH-DB-008 — Validar área dentro de RPC sensibles`: área aplicable;
- `AUTH-DB-009 — Validar permiso exacto dentro de RPC sensibles`: permiso exacto;
- `AUTH-DB-010 — Validar principal y actor efectivo dentro de RPC sensibles`: principal y actor efectivo.

El retiro no puede eliminar una frontera legacy si el reemplazo canónico todavía depende de una validación no materializada, no probada o divergente.

---

#### 26. Relación con `AUTH-DB-021`

Las políticas RLS y grants canónicos deberán estar materializados y certificados antes de retirar una política, grant o función legacy de la que dependan.

La ausencia de un consumidor TypeScript no demuestra que un objeto SQL carezca de dependencia.

La evidencia deberá incluir las relaciones SQL/RLS/RPC físicamente aplicables.

---

#### 27. Reconciliación de datos

Cuando la migración haya cambiado representación, identificadores, relaciones, estados o fuentes, el retiro exige reconciliación de datos completada.

La reconciliación deberá demostrar, según aplique:

- ausencia de filas huérfanas atribuibles al cambio;
- ausencia de valores que solo el camino legacy pueda interpretar;
- consistencia de claves y relaciones;
- ausencia de dual-write pendiente;
- cierre de backfill aplicable;
- coherencia entre proyección canónica y fuente propietaria;
- evidencia de las excepciones restantes.

Un objeto no se retira para ocultar una discrepancia de datos.

---

#### 28. Seguridad previa al retiro

Antes del retiro deberán estar resueltas las pruebas negativas aplicables a la superficie:

- denegación;
- principal incorrecto;
- actor incorrecto;
- permiso incorrecto;
- recurso fuera de alcance;
- sede/área inválidas cuando correspondan;
- bypass;
- role fallback;
- manipulación de inputs;
- error técnico;
- concurrencia;
- replay cuando aplique;
- acceso cliente directo prohibido;
- RLS/RPC reales cuando existan.

Un retiro que elimina un control compensatorio antes de que el reemplazo sea seguro queda bloqueado.

---

#### 29. Respaldo, restauración y rollback

`AUTH-DB-029` permanece como propietaria de la capacidad de respaldo, restauración y rollback.

Antes del retiro físico se deberá demostrar que existe una recuperación reproducible para la combinación exacta evaluada.

El rollback no podrá:

- convertir una superficie legacy en arquitectura final;
- reabrir cuotas AUTH004 ya eliminadas como deuda ordinaria;
- restaurar un bypass conocido como estado aceptado;
- mezclar commits o schemas incompatibles;
- perder datos o auditoría producidos después del corte;
- usar evidencia de otro ambiente como sustituto.

Si la única recuperación disponible requiere una combinación insegura o incompatible, el objeto no es elegible para retiro.

---

#### 30. Restauración de emergencia y monotonicidad

La preservación de rollback no implica permiso para reintroducir legacy como camino ordinario.

Si un mecanismo de recuperación extraordinaria recrea temporalmente un objeto retirado, deberá:

- estar gobernado por el procedimiento propietario de recuperación;
- conservar evidencia y motivo;
- no reabrir adopciones nuevas;
- no restaurar allowlists o cuotas migradas como baseline vigente;
- no convertir el objeto restaurado en arquitectura final;
- volver a una combinación canónica soportada mediante el procedimiento aprobado.

La deuda migrada no recupera legitimidad por un incidente.

---

#### 31. Paridad entre ambientes

El retiro final exige paridad verificable entre los ambientes aplicables.

Como mínimo, la decisión deberá reconciliar:

```text
local
staging
produccion
```

para:

- migraciones aplicadas;
- objetos y firmas relevantes;
- grants y RLS aplicables;
- versiones de contratos/SDK;
- consumidores desplegados;
- configuración material;
- evidencia de pruebas;
- estado del reemplazo;
- estado del objeto legacy.

Una diferencia no explicada bloquea el retiro.

---

#### 32. Orden de ambientes

La tarea no autoriza saltar directamente al ambiente productivo para probar elegibilidad.

La futura instancia deberá usar la secuencia de ambientes y gates ya aprobada por los contratos de despliegue y Supabase.

Cada avance deberá conservar evidencia del mismo candidato y no reinterpretar un resultado de local como paridad de staging o producción.

---

#### 33. Manifiesto de retiro de la instancia

Antes de cualquier mutación física, `AUTH-DB-030::GLOBAL-FINAL` deberá materializar un manifiesto reproducible con una fila por objeto o superficie candidata.

Cada fila deberá contener como mínimo:

| Campo | Regla |
| --- | --- |
| identidad | objeto, superficie, export, función, policy, grant, wrapper o contrato exacto |
| clase | naturaleza física o contractual de la identidad |
| propietaria | tarea y repositorio/schema propietarios |
| ambiente | ambiente evaluado |
| legacy_family | una de las cinco familias cuando aplique; de lo contrario, fuente propietaria explícita |
| reemplazo | identidad canónica o eliminación sin reemplazo aprobada |
| consumidores | conjunto exacto reconciliado |
| adopción | evidencia de cutover y commit de migración |
| uso_residual | resultado y cobertura que permiten afirmar cero o bloqueo |
| seguridad | referencia a pruebas negativas aplicables |
| reconciliación | evidencia de datos/estado cuando aplique |
| rollback | referencia de recuperación compatible |
| deprecación | expediente y ventana cuando aplique |
| local | estado del objeto y reemplazo |
| staging | estado del objeto y reemplazo |
| producción | estado del objeto y reemplazo |
| decisión | elegible para retiro o bloqueado, con causa |
| evidencia | digest o referencias atribuibles al mismo corte |

No se permiten filas genéricas como “legacy auth” sin identidad resoluble.

---

#### 34. Una decisión por objeto

Cada objeto candidato recibe una decisión independiente.

La instancia no usa una declaración global del tipo:

```text
LEGACY = 0
```

sin el inventario que la soporta.

Un objeto bloqueado no obliga a mantener otros objetos independientes que sí hayan demostrado su gate, siempre que el retiro parcial no rompa compatibilidad, rollback ni dependencias y que el cierre global continúe abierto hasta resolver todos los objetos obligatorios.

---

#### 35. Retiro parcial controlado

Un retiro parcial solo es válido cuando:

- los objetos elegibles son independientes de los bloqueados;
- no se rompe una firma compartida;
- no se rompe una versión soportada;
- no se impide rollback de otra superficie;
- no se crea un estado imposible de reconciliar entre ambientes;
- la matriz de consumidores continúa completa;
- los objetos restantes conservan owner y condición de salida.

La instancia global final no se considera cerrada mientras quede un objeto obligatorio bloqueado.

---

#### 36. Dependencias indirectas

La búsqueda de uso residual deberá cubrir, según la naturaleza del objeto:

- imports estáticos y dinámicos;
- exports y reexports;
- wrappers;
- convenciones de framework;
- Server Actions;
- Route Handlers;
- cliente web y nativo;
- SQL;
- RLS;
- RPC;
- funciones;
- triggers;
- jobs;
- Edge Functions;
- Realtime;
- scripts;
- CI;
- pruebas;
- configuración;
- consumidores externos registrados;
- ambientes desplegados.

Un consumidor indirecto conocido bloquea igual que un consumidor directo.

---

#### 37. Policies, grants y cadenas legacy

La tarea conserva el hallazgo canónico de que policies y migraciones pueden contener cadenas manuales o variantes legacy.

Una cadena histórica en una migración inmutable no se elimina por reescritura del historial.

La instancia deberá distinguir:

- referencia histórica preservada;
- policy/grant runtime todavía activo;
- definición vigente en schema;
- fixture o test;
- documentación;
- código ejecutable.

Solo los elementos runtime o distribuibles que correspondan al retiro se mutan. La historia se conserva.

---

#### 38. Migraciones históricas

Las migraciones ya aplicadas permanecen como evidencia histórica.

`AUTH-DB-030` no autoriza:

- editar una migración histórica para borrar el pasado;
- renombrar una migración aplicada para aparentar limpieza;
- borrar un archivo histórico porque el objeto ya no existe;
- alterar checksums históricos;
- ocultar una transición legacy del manifest.

El retiro físico se expresa mediante cambios nuevos y trazables gobernados por el sistema de migraciones vigente.

---

#### 39. Versiones, tags y releases históricas

Cuando una superficie legacy pertenezca a un package publicado, el retiro no autoriza:

- sobrescribir una versión;
- mover un tag histórico;
- reescribir un release;
- despublicar como mecanismo ordinario;
- borrar changelog o guía de migración;
- reutilizar una identidad retirada.

La historia debe seguir siendo reproducible.

---

#### 40. Fail-closed ante evidencia insuficiente

Se bloquea el retiro de un objeto cuando ocurra cualquiera de estos estados:

- consumidor sin inventario;
- owner ausente;
- reemplazo no materializado;
- paridad abierta;
- resultado de seguridad incompleto;
- scanner parcial o fallido;
- telemetría declarada cero sin cobertura;
- drift de ambientes no explicado;
- rollback no ensayable;
- dependencia SQL/RLS/RPC no resuelta;
- build, lint, typecheck o tests obligatorios faltantes;
- evidencia `STALE`;
- ambiente no atribuible;
- deprecación no elegible cuando aplica;
- dato o backfill no reconciliado;
- resultado físico desconocido.

`UNKNOWN` operativo no se transforma en permiso de retiro.

---

#### 41. Cambios físicos permitidos por la futura instancia

Cuando todos los gates de un objeto estén satisfechos, la futura instancia podrá materializar exclusivamente el retiro aprobado de ese objeto y los ajustes indispensables para mantener coherencia del contrato retirado.

La identidad concreta de las mutaciones deberá salir del manifiesto físico validado.

Este marcador documental no prescribe SQL, comandos de despliegue, `DROP`, `REVOKE`, edición de package ni orden técnico específico que no haya sido resuelto por la evidencia de la instancia.

---

#### 42. Prohibición de expansión de alcance durante retiro

La instancia de retiro no es una ventana para:

- rediseñar autorización;
- crear nuevas capacidades;
- cambiar ownership;
- introducir nuevas RPC;
- migrar consumidores pendientes;
- corregir datos no reconciliados mediante lógica ad hoc;
- cambiar contratos ajenos;
- modificar una familia de package no relacionada;
- resolver una brecha funcional que pertenece a otra tarea.

Un hallazgo nuevo se asigna a su propietaria y bloquea el objeto afectado cuando sea material.

---

#### 43. Evidencia posterior al retiro

Después de cada retiro material deberán repetirse, según aplicabilidad:

- inventario del objeto;
- búsqueda de consumidores;
- scanner AUTH004;
- validaciones del repositorio propietario;
- validaciones de consumidores afectados;
- pruebas de autorización/contexto;
- pruebas RLS/RPC;
- comprobación de migraciones;
- drift de ambientes;
- observabilidad sin datos sensibles;
- rollback/recovery gate cuando corresponda.

El resultado debe demostrar que el objeto ya no existe donde debía retirarse y que el camino canónico continúa operativo.

---

#### 44. Preservación de evidencia

El cierre deberá conservar como mínimo:

- inventario previo;
- manifiesto de decisión;
- commits y digests;
- resultados de scanner;
- resultados de consumidores;
- resultados de seguridad;
- evidencias de ambiente;
- evidencia de restauración/rollback;
- cambio físico aplicado;
- inventario posterior;
- anomalías y decisiones de bloqueo;
- referencias a deprecación cuando aplique.

No se elimina evidencia para hacer que el estado parezca limpio.

---

#### 45. Relación con `AUTH-DB-031`

`AUTH-DB-030` termina cuando el retiro permitido quedó aplicado y verificado o cuando todos los objetos obligatorios están explícitamente clasificados con su resultado final admisible para el cierre.

`AUTH-DB-031` recibe:

- manifiesto de retiro;
- evidencia pre y post;
- objetos retirados;
- objetos históricos conservados;
- objetos no aplicables;
- cualquier bloqueo que impida afirmar paridad final;
- identidad de ambientes, commits, migraciones y consumidores.

`AUTH-DB-030` no certifica por sí misma la paridad total documento ↔ SHELL ↔ Supabase ↔ aplicaciones.

---

#### 46. Condición de salida global

La instancia `AUTH-DB-030::GLOBAL-FINAL` solo puede declararse cerrada cuando:

```text
TODOS LOS OBJETOS OBLIGATORIOS
→ retirados con evidencia
O
→ demostrados no aplicables con evidencia
```

Y simultáneamente:

```text
0 consumidores legacy requeridos
0 findings legacy activos requeridos
0 directos cliente requeridos
0 consumidores no registrados
0 allowlists activas de deuda migrada
0 dependencias backend sin owner
0 drift de retiro no explicado entre ambientes
```

Los ceros requieren cobertura demostrada.

---

#### 47. Resultado físico esperado

La futura instancia produce un cierre global de retiro, no una nueva arquitectura.

El resultado válido conserva:

- camino canónico operativo;
- historia deprecada reproducible;
- migraciones históricas intactas;
- consumidores migrados;
- objetos legacy retirados solo donde corresponda;
- cero nueva deuda legacy;
- recuperación gobernada;
- evidencia suficiente para `AUTH-DB-031`.

---

#### 48. Resultado bloqueado

Si un objeto no satisface el gate, el resultado correcto es conservarlo temporalmente con:

- identidad exacta;
- causa de bloqueo;
- owner;
- tarea propietaria de cierre;
- evidencia faltante;
- condición exacta de salida;
- prohibición de nuevas adopciones cuando siga siendo legacy.

Conservar temporalmente un objeto bloqueado no lo convierte en arquitectura aprobada.

---

#### 49. Responsabilidad sobre Supabase

Toda futura mutación Supabase derivada de `AUTH-DB-030` se versionará y ejecutará desde `vento-group-sas/vento-shell` conforme a los contratos canónicos de migraciones, pruebas, drift y recuperación.

Este marcador documental no ejecuta DDL, DML, RLS, RPC, grants, Storage, Realtime, Edge Functions, jobs ni secretos.

---

#### 50. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

**Justificación:** el retiro seguro, deprecación, compatibilidad, zero-residual-use, freeze legacy, migración de consumidores, rollback y evidencia ya están cubiertos por requisitos vigentes. La tarea materializa el contrato de cierre de esa cobertura sin crear una regla empresarial nueva.

---

#### 51. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación, la cobertura vigente que gobierna como mínimo:

- `TREQ-SHELL-004`, para no retirar rutas, funciones, scripts o endpoints sin inventario reproducible de consumo y pruebas;
- `TREQ-SHELL-006`, para compatibilidad por consumidor;
- `TREQ-SHELL-007`, para rollback independiente sin restaurar bypasses ni perder datos/auditoría;
- `TREQ-SHELL-008`, para trazabilidad de requisitos y evidencia reproducible;
- `TREQ-SHELL-009`, para identidad verificable de ambientes;
- `TREQ-SHELL-038`, para deprecación gobernada, ventana, reemplazo, guía y consumidores;
- `TREQ-SHELL-039`, para bloquear retiro con uso residual o consumidor sin resolver;
- `TREQ-SHELL-065`, para las cinco familias de compatibilidad legacy y su puerta de retiro;
- `TREQ-SHELL-083` a `TREQ-SHELL-090`, para registry, freeze, cliente, autoridad local, métricas, allowlist, integración y rollback de AUTH004;
- `TREQ-SHELL-091` a `TREQ-SHELL-098`, para reconciliación 32/32, target canónico, olas, paridad, clientes PULSO/ANIMA, evidence matrix, handoff de retiro y rollback de AUTH005.

Esta enumeración es trazabilidad de cobertura existente y no modifica el Registro 04A.

---

#### 52. Perfil mínimo de pruebas de la futura instancia

La futura instancia deberá cubrir, según aplicabilidad del objeto:

1. inventario pre-retiro;
2. consumidor directo e indirecto;
3. scanner legacy;
4. allowlist y registry;
5. paridad de consumidor;
6. denegaciones y seguridad;
7. cliente web/nativo;
8. RLS/RPC reales;
9. datos y reconciliación;
10. migraciones;
11. build/typecheck/lint/tests de repositorios afectados;
12. compatibilidad de packages;
13. local;
14. staging;
15. producción;
16. respaldo/restauración;
17. rollback;
18. inventario post-retiro;
19. no reaparición de deuda;
20. handoff a certificación final.

La evidencia de cada prueba deberá corresponder a la misma identidad física evaluada.

---

#### 53. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | El artefacto documental no ha sido incorporado todavía al checkout del usuario ni compilado mediante la batería canónica del repositorio. |
| LOCAL | `PASS` | El artefacto fue revisado como una única tarea UTF-8/LF, con metadata obligatoria, secciones sustantivas, continuidad exacta, cero placeholders y cero cambios `TREQ-*`. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` el owner R3, topología `GLOBAL_FINAL / POST_E5_PACKAGE`, `SHELL-PKG-005`, `SHELL-AUTH-003..005`, Registro 04A SHELL, estado de `AUTH-DB-029`, tareas R2 relevantes, continuidad y scripts documentales vigentes. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron pilotos, cutover, observación, scanner runtime, paridad de consumidores ni comprobaciones de uso residual desde este marcador documental. |
| FÍSICA | `NOT_APPLICABLE` | La aprobación documental no materializa `AUTH-DB-030::GLOBAL-FINAL` ni ejecuta retiros, migraciones o cambios Supabase. |

---

#### 54. Criterios de aceptación

`AUTH-DB-030` queda documentalmente completa cuando se cumple simultáneamente:

1. conserva `UX-QA-030` como tarea anterior;
2. conserva `AUTH-DB-031` como única tarea siguiente;
3. fija `GLOBAL_FINAL` y `POST_E5_PACKAGE`;
4. identifica `AUTH-DB-030::GLOBAL-FINAL` como única instancia física futura;
5. separa aprobación documental de retiro físico;
6. prohíbe retirar únicamente porque existe reemplazo;
7. preserva exactamente las cinco familias legacy congeladas por AUTH004;
8. no convierte esas cinco familias en cinco objetos físicos por inferencia;
9. consume las 32 identidades baseline del registro sin volver a migrarlas;
10. exige handoff de AUTH005 antes del retiro aplicable;
11. exige cero directos legacy con cobertura demostrada;
12. exige cero findings estáticos legacy con cobertura demostrada;
13. exige cero directos cliente aplicables;
14. exige cero consumidores no registrados;
15. exige cero allowlists activas de deuda migrada;
16. impide interpretar falta de telemetría como cero uso;
17. exige paridad por consumidor y bloquea bug canónico, brecha de datos o contrato pendiente;
18. exige cierre de pilotos y observación aplicables;
19. respeta deprecación y ventanas de SHELL-PKG-005 cuando corresponden;
20. conserva las 28 relaciones package–consumidor aplicables;
21. exige lineage de repositorio, commit, manifest, lockfile, runtime, SDK, backend, snapshot y ambiente;
22. exige identidad exacta para cada objeto backend;
23. consume AUTH-DB-020 como migración con coexistencia temporal, no como autorización de retiro;
24. exige que `AUTH-DB-006`, `AUTH-DB-007`, `AUTH-DB-008`, `AUTH-DB-009` y `AUTH-DB-010` estén materializados donde gobiernen el reemplazo;
25. exige RLS/grants canónicos aplicables antes de retirar equivalentes legacy;
26. exige reconciliación de datos;
27. exige pruebas negativas y de seguridad;
28. exige respaldo, restauración y rollback compatibles;
29. no permite que rollback convierta legacy en arquitectura final;
30. exige paridad local/staging/producción;
31. exige manifiesto de retiro con una fila por identidad;
32. produce decisión independiente por objeto;
33. permite retiro parcial solo con independencia demostrada;
34. cubre dependencias indirectas y consumidores externos registrados;
35. distingue cadenas históricas de policies/grants runtime;
36. conserva migraciones históricas;
37. conserva versiones, tags y releases históricos;
38. falla cerrado ante evidencia insuficiente o stale;
39. impide expansión de alcance durante el retiro;
40. repite validaciones post-retiro;
41. preserva evidencia pre y post;
42. entrega a AUTH-DB-031 un manifiesto atribuible para certificación final;
43. declara cero requisitos de prueba creados o modificados;
44. no modifica Registro 04A;
45. no ejecuta cambios físicos desde el marcador documental.

---

#### 55. Límites

Esta tarea documental no:

- crea una migración;
- ejecuta una migración;
- modifica Supabase;
- elimina funciones;
- elimina RPC;
- elimina policies;
- elimina grants;
- elimina tablas, vistas, triggers, índices o constraints;
- modifica RLS;
- modifica Storage;
- modifica Realtime;
- modifica Edge Functions;
- modifica cron o colas;
- modifica secretos;
- modifica paquetes compartidos;
- despublica versiones;
- mueve tags;
- reescribe releases;
- edita migraciones históricas;
- migra consumidores pendientes;
- ejecuta scanner físico;
- ejecuta pilotos;
- declara cero uso runtime sin evidencia;
- abre una instancia física;
- ejecuta `AUTH-DB-030::GLOBAL-FINAL`;
- certifica la paridad final reservada a `AUTH-DB-031`;
- desarrolla `AUTH-DB-031`.

---

#### 56. Handoff a `AUTH-DB-031`

`AUTH-DB-031` recibe exclusivamente el estado material resultante del retiro y su evidencia.

El handoff deberá permitir reconstruir:

- qué objetos fueron evaluados;
- cuáles se retiraron;
- cuáles quedaron como historia no ejecutable;
- cuáles resultaron no aplicables;
- qué consumidores y ambientes fueron comprobados;
- qué migraciones y commits materializaron el corte;
- qué evidencia demuestra ausencia de dependencia legacy;
- qué rollback/recovery quedó certificado;
- qué discrepancias, si existen, impiden afirmar paridad total.

`AUTH-DB-031` no deberá deducir retiro a partir de la mera aprobación documental de esta tarea.

---

#### 57. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-030 — Probar AURA únicamente después de aprobar su continuidad`

**TAREA ACTUAL APROBADA**
`AUTH-DB-030 — Retirar objetos legacy únicamente después de adopción comprobada`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DB-031 — Certificar paridad entre documento, vento-shell, Supabase y aplicaciones`
### [ ] AUTH-DB-031 — Certificar paridad entre documento, vento-shell, Supabase y aplicaciones

Regla de cierre

AUTH-DB-030 y AUTH-DB-031 no se ejecutarán completamente durante
la fundación inicial.

Se ejecutarán en la FASE 12 después de comprobar:

- adaptación de todos los consumidores;
- finalización de los pilotos aplicables;
- ausencia de lecturas legacy;
- ausencia de escrituras legacy;
- reconciliación de datos;
- pruebas de seguridad;
- pruebas de restauración;
- rollback todavía disponible;
- paridad local, staging y producción.

Ningún objeto legacy se retirará únicamente porque exista su reemplazo.
