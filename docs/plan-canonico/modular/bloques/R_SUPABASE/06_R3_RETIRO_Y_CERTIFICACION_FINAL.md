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
### ✅ AUTH-DB-031 — Certificar paridad entre documento, vento-shell, Supabase y aplicaciones

**Estado:** APROBADA
**Tarea anterior:** AUTH-DB-030 — Retirar objetos legacy únicamente después de adopción comprobada
**Tarea siguiente:** NINGUNA — CIERRE SIN HANDOFF DECLARADO
**Tipo de tarea:** Documental — definición canónica de la certificación global final de paridad documental, técnica y operativa, con futura materialización física única de evidencia y sin mutaciones correctivas dentro de la instancia de certificación
**Bloque:** BLOQUE R3 — Retiro legacy y certificación final
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/R_SUPABASE/06_R3_RETIRO_Y_CERTIFICACION_FINAL.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`; la futura instancia física es `AUTH-DB-031::GLOBAL-FINAL`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; la futura instancia podrá capturar evidencia, ejecutar comprobaciones y emitir la certificación, pero no corregir documentación, código, datos, configuración, aplicaciones ni Supabase para alcanzar paridad
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cuándo VENTO OS puede afirmar que existe paridad final entre:

```text
DOCUMENTO CANÓNICO
+
VENTO-SHELL
+
SUPABASE
+
APLICACIONES Y CONSUMIDORES
```

La certificación protege tres afirmaciones distintas y acumulativas:

```text
PARIDAD DOCUMENTAL
→ lo implementado corresponde a decisiones, contratos, catálogos y requisitos aprobados

PARIDAD TÉCNICA
→ repositorio, artefactos desplegados, contratos, migraciones y ambientes corresponden al mismo corte gobernado

PARIDAD OPERATIVA
→ las aplicaciones y procesos ejecutan el comportamiento aprobado sin depender de legacy retirado, bypasses o combinaciones incompatibles
```

No basta con que cada capa sea internamente válida. La certificación exige que todas describan y ejecuten el mismo sistema gobernado.

---

#### 2. Reconciliación topológica

La topología vinculante es:

```text
mode = GLOBAL_FINAL
execution_gate = POST_E5_PACKAGE
instance_id = AUTH-DB-031::GLOBAL-FINAL
```

Consecuencias:

1. existe una sola certificación global final;
2. no se materializa una instancia por `package_id` ni por `implementation_unit_id`;
3. la evidencia de packages e implementation units se consume como entrada, no se sustituye;
4. la aprobación documental de este marcador no ejecuta la certificación física;
5. la instancia global solo puede evaluarse después de la precedencia de ruta `AUTH-DB-030` y de los cierres físicos aplicables;
6. `NOT_EXECUTED`, evidencia `STALE`, identidad ambigua o ambiente no atribuible bloquean la certificación.

---

#### 3. Precedencia obligatoria

La secuencia final permanece:

```text
AUTH-QA-001..030
+
UX-QA-001..030
+
SHELL-AUTH-005
+
R2 Y DEMÁS MATERIALIZACIONES APLICABLES
        ↓
AUTH-DB-030
        ↓
AUTH-DB-031
```

`AUTH-DB-031` no reemplaza ninguna prueba, piloto, migración, retiro, restore, rollback o validación propietaria anterior.

---

#### 4. Separación entre definición documental y certificación física

Este marcador define:

- el universo que debe reconciliarse;
- el corte de certificación;
- las relaciones de paridad;
- los gates de entrada y salida;
- el modelo de evidencia;
- el tratamiento de divergencias;
- la condición exacta para emitir o negar la certificación.

No ejecuta:

- queries remotas de certificación;
- builds de consumidores;
- pruebas E2E;
- restore o rollback;
- cambios de datos;
- DDL o DML;
- despliegues;
- actualización de aplicaciones;
- corrección de drift.

---

#### 5. Regla raíz de certificación

La certificación global solo puede ser positiva cuando:

```text
MISMO CORTE GOBERNADO
+
PARIDAD DOCUMENTAL
+
PARIDAD TÉCNICA
+
PARIDAD OPERATIVA
+
CERO DRIFT BLOQUEANTE
+
CERO CONSUMIDORES LEGACY RESIDUALES
+
SEGURIDAD Y REGRESIÓN APROBADAS
+
RESTORE Y ROLLBACK VIGENTES
+
EVIDENCIA COMPLETA Y ATRIBUIBLE
=
CERTIFICACIÓN GLOBAL POSITIVA
```

Nunca:

```text
BUILD VERDE AISLADO
→ CERTIFICACIÓN GLOBAL
```

ni:

```text
LOCAL = STAGING
→ PRODUCCIÓN CERTIFICADA
```

ni:

```text
DOCUMENTO APROBADO
→ IMPLEMENTACIÓN CONFORME
```

---

#### 6. Corte único de certificación

La futura instancia deberá fijar un `certification_cut` inmutable.

El corte conserva como mínimo:

```text
instance_id
certification_cut_timestamp
vento_shell_commit
canonical_documentation_digest
migration_manifest_digest
contract_bundle_versions
package_and_lockfile_digests
application_commits_or_release_ids
environment_identities
supabase_schema_and_object_fingerprints
migration_history_identity
auth005_evidence_reference
auth_db_030_evidence_reference
qa_global_evidence_references
recovery_evidence_reference
certification_bundle_digest
```

Cambiar cualquiera de las identidades gobernadas invalida el corte y exige una nueva captura; no se mezclan resultados de cortes distintos.

---

#### 7. Fuente documental autoritativa

La capa documental de la certificación se compone exclusivamente de fuentes canónicas vigentes para el corte:

- plan canónico modular;
- ADR y decisiones aprobadas aplicables;
- contratos y catálogos canónicos;
- Registro 04A vigente;
- contratos E3/E4/E5 aplicables;
- definición de packages y gates;
- contratos de `SHELL-*`, `AUTH-*`, `SUPA-*`, `DATA-*`, integración y aplicaciones aplicables;
- manifiestos y evidencias canónicas aprobadas que sean entrada del cierre.

Archivos generados o resúmenes no sustituyen sus fuentes propietarias.

---

#### 8. Fuente técnica autoritativa en `vento-shell`

La capa `vento-shell` deberá reconciliar, según aplicabilidad:

- commits y tags/release identities;
- manifests y lockfiles;
- packages compartidos;
- contratos y schemas versionados;
- migraciones Supabase versionadas;
- migration manifest;
- tipos generados;
- configuración gobernada;
- scripts y gates de CI;
- fingerprints y evidence bundles producidos por tareas propietarias.

Una definición presente únicamente en documentación y ausente del repositorio cuando debería estar materializada es drift bloqueante.

---

#### 9. Fuente técnica autoritativa en Supabase

La capa Supabase deberá capturar, sin secretos y por ambiente aplicable:

- versión e historia de migraciones;
- schemas gobernados;
- relaciones y vistas;
- funciones y RPC;
- triggers;
- constraints e índices gobernados;
- RLS y grants;
- Storage gobernado;
- Realtime gobernado;
- Edge Functions gobernadas;
- cron, colas o automatizaciones gobernadas cuando apliquen;
- configuración técnica cuya identidad forme parte del contrato;
- fingerprints exigidos por los owners correspondientes.

La captura se compara con las identidades versionadas en `vento-shell` y con el contrato documental, no con una expectativa memorizada.

---

#### 10. Fuente operativa en aplicaciones y consumidores

La capa de aplicaciones se resuelve desde el registro canónico de consumidores, packages materializados, repositorios y aplicaciones efectivamente desplegadas en el corte.

Por cada consumidor aplicable deberá existir identidad suficiente para reconstruir:

```text
repository
commit_or_release
runtime
manifest_and_lockfile
shared_package_versions
contract_versions
backend_identity
registered_consumer_identity
environment
build_and_test_evidence
operational_or_pilot_evidence
```

No se congela un número permanente de aplicaciones en esta tarea. Todo consumidor nuevo legítimamente materializado después de baselines anteriores deberá estar registrado y entrar en la certificación.

---

#### 11. Universo mínimo de paridad

El universo global incluye, cuando resulten aplicables al corte:

1. contratos y catálogos documentales;
2. paquetes compartidos;
3. migraciones y objetos Supabase;
4. autorización, contexto y decisiones;
5. datos y reconciliaciones;
6. interfaces RPC/RLS y server boundaries;
7. clientes web y nativos;
8. aplicaciones internas y de cliente materializadas;
9. integraciones y automatizaciones;
10. Storage, Realtime, Edge y cron gobernados;
11. observabilidad y auditoría;
12. evidencia de pruebas, piloto, rollback y retiro legacy.

Una superficie materializada que no tenga owner o contrato no se excluye: bloquea.

---

#### 12. Seis relaciones obligatorias de paridad

La certificación evalúa explícitamente las seis relaciones entre las cuatro capas:

| Relación | Pregunta de certificación |
| --- | --- |
| Documento ↔ `vento-shell` | ¿El repositorio materializa exactamente los contratos, catálogos, versiones y reglas aprobados? |
| Documento ↔ Supabase | ¿Los objetos y políticas desplegados corresponden a la arquitectura y contratos documentados? |
| Documento ↔ aplicaciones | ¿Los consumidores ejecutan las fronteras, capacidades y restricciones documentadas? |
| `vento-shell` ↔ Supabase | ¿Migraciones, tipos, objetos, firmas y configuración desplegada corresponden al mismo corte versionado? |
| `vento-shell` ↔ aplicaciones | ¿Cada consumidor usa versiones, exports, contratos y adapters compatibles con el corte certificado? |
| Supabase ↔ aplicaciones | ¿Cada aplicación consume objetos, RPC, políticas y datos compatibles con el ambiente y contrato desplegados? |

Una relación bloqueada impide certificar el conjunto.

---

#### 13. Paridad no significa igualdad byte a byte entre ambientes

Las diferencias de ambiente solo son admisibles cuando sean explícitamente esperadas y gobernadas.

Clasificación permitida por identidad comparada:

```text
SAME_REQUIRED
ENVIRONMENT_SPECIFIC_APPROVED
NOT_APPLICABLE_WITH_EVIDENCE
BLOCKING_DRIFT
UNKNOWN_BLOCKING
```

Ejemplos de diferencias que pueden ser específicas del ambiente, sin convertirlas automáticamente en PASS:

- identificadores de proyecto;
- secretos y referencias de secretos;
- dominios y endpoints propios del ambiente;
- volúmenes o fixtures no productivos;
- escalado o capacidad aprobados por ambiente.

Schemas, contratos, migraciones aplicables, firmas, RLS/RPC, permisos, owners funcionales y versiones no pueden divergir silenciosamente.

---

#### 14. Paridad documental

`PARIDAD_DOCUMENTAL = PASS` exige que:

- toda identidad materializada tenga owner documental;
- las versiones desplegadas correspondan a versiones aprobadas;
- el Registro 04A conserve requisitos y estados coherentes con el corte;
- no exista contrato físico activo que contradiga la decisión canónica vigente;
- las excepciones y compatibilidades temporales estén registradas;
- las superficies retiradas no continúen documentadas como arquitectura activa;
- ningún derivado generado sea usado para ocultar una contradicción de fuente.

---

#### 15. Paridad de contratos, catálogos y tipos

La certificación deberá demostrar, según aplicabilidad:

```text
contract_version(document)
=
contract_version(package)
=
contract_version(consumer)
=
contract_expected_by_backend
```

También deberá reconciliar:

- schemas de validación;
- catálogos de permisos y roles;
- códigos empresariales canónicos;
- DTO públicos;
- firmas RPC;
- tipos generados;
- aliases o compatibilidades todavía permitidos.

Un cast, alias local o string duplicado no constituye paridad contractual.

---

#### 16. Paridad de migraciones

La historia de migraciones deberá ser atribuible al mismo corte de `vento-shell`.

Se verifica como mínimo:

- archivos gobernados presentes;
- nombres y orden válidos;
- contenido/digest esperado cuando el owner lo exija;
- historia aplicada por ambiente;
- ausencia de migraciones manuales no representadas;
- ausencia de migraciones versionadas omitidas en un ambiente aplicable;
- baseline y upgrade compatibles.

Una migración aplicada fuera de `vento-shell` o no reconciliada es bloqueo.

---

#### 17. Paridad de schema y objetos

Para cada identidad gobernada se compara:

```text
existence
owner schema
class
definition/signature
constraints
indexes relevantes
security posture
relationships
disposition
lifecycle state
```

Un objeto con el mismo nombre pero definición distinta no es paridad.

---

#### 18. Paridad de RLS, grants y RPC

La certificación no acepta inferencia desde TypeScript.

RLS, grants y RPC solo pueden quedar `PASS` con:

- objeto real;
- ambiente real;
- identidad y firma observadas;
- pruebas aplicables ejecutadas;
- resultados de seguridad y denegación;
- correspondencia con contrato y consumidor.

`NOT_EXECUTED` no equivale a ausencia de problema.

---

#### 19. Paridad de Storage, Realtime, Edge y automatizaciones

Cuando sean aplicables, deberán reconciliarse contra `vento-shell`:

- buckets y políticas;
- publicaciones/suscripciones gobernadas;
- Edge Functions y su versión desplegada;
- cron/jobs/colas;
- triggers de automatización;
- autenticación y principal técnico;
- retry/idempotencia;
- observabilidad y owner.

Un recurso solo remoto o solo local debe estar clasificado; no puede quedar activo indefinidamente sin representación canónica.

---

#### 20. Paridad de datos y reconciliación

La certificación global no se reduce a schema.

Toda migración o backfill que cambie estado empresarial deberá aportar evidencia propietaria de:

- conteos y claves;
- integridad referencial;
- nulos y dominios;
- dinero, tiempo y unidades;
- duplicados y huérfanos;
- historia y auditoría;
- crosswalks;
- cuarentena o excepciones;
- checkpoints;
- idempotencia y replay cuando apliquen.

Un conteo total idéntico no demuestra equivalencia semántica.

---

#### 21. Paridad de autorización y contexto

La certificación deberá consumir la evidencia material de las fundaciones de autorización/contexto y de sus consumidores.

Debe quedar demostrado que:

- las decisiones canónicas gobiernan;
- no existe autoridad local residual fuera de excepciones expresamente permitidas;
- los consumidores no fabrican actor, rol, sede, área, turno, check-in o bypass como hechos autoritativos;
- cliente no autoriza mutaciones desde una proyección;
- `DENY` y fallo técnico no hacen fallback permisivo;
- la evidencia corresponde al mismo corte.

---

#### 22. Paridad por consumidor

Cada consumidor registrado deberá cerrar una fila de certificación con:

```text
consumer_identity
repository
commit_or_release
runtime
shared_versions
backend_versions
registered_target
build_result
test_result
security_result
parity_result
legacy_residual_result
rollback_or_recovery_reference
status
```

Estados finales permitidos:

```text
PASS
NOT_APPLICABLE_WITH_EVIDENCE
BLOCKED
STALE
```

Solo `PASS` y `NOT_APPLICABLE_WITH_EVIDENCE` son compatibles con certificación positiva.

---

#### 23. Paridad de experiencia y operación

La capa operativa reutiliza la evidencia física aplicable de `AUTH-QA-*`, `UX-QA-*`, pilotos y validaciones por aplicación.

La certificación final exige que:

- escenarios críticos tengan resultado atribuible;
- los defectos bloqueantes estén resueltos o explícitamente clasificados fuera del corte;
- ninguna aplicación dependa de una superficie retirada;
- navegación, permisos, transiciones y side effects correspondan al contrato vigente;
- errores técnicos no se disfracen como decisiones de negocio;
- idempotencia, concurrencia y recuperación se hayan probado donde corresponda.

---

#### 24. Relación con `AUTH-DB-028`

`AUTH-DB-028` aporta el baseline y control de drift entre ambientes.

`AUTH-DB-031` consume evidencia fresca del corte final y no reutiliza una comparación histórica como si representara el estado actual.

La paridad ambiental deberá incluir exactamente los ambientes requeridos por el owner aplicable, incluyendo local, staging y producción cuando formen parte de la superficie certificada.

---

#### 25. Relación con `AUTH-DB-029`

`AUTH-DB-029` conserva propiedad de respaldo, restauración y rollback.

La certificación exige evidencia vigente de que:

- el respaldo aplicable existe;
- el restore requerido fue validado conforme al contrato propietario;
- el rollback o mecanismo de recuperación permitido permanece reproducible;
- recuperar no reintroduce bypasses, deuda legacy histórica ni una combinación incompatible.

`AUTH-DB-031` no vuelve a implementar recovery.

---

#### 26. Relación con `AUTH-DB-027`

El harness de esquema, integridad, RLS, RPC y migraciones sigue perteneciendo a `AUTH-DB-027`.

La certificación consume sus resultados atribuibles al corte y exige reejecución cuando un cambio posterior invalide su evidencia.

---

#### 27. Relación con `AUTH-DB-030`

`AUTH-DB-030` entrega el estado material del retiro legacy.

La certificación deberá poder reconstruir desde ese handoff:

- objetos evaluados;
- objetos retirados;
- objetos históricos no ejecutables;
- objetos no aplicables;
- consumidores y ambientes comprobados;
- migraciones/commits del retiro;
- evidencia de cero dependencia legacy;
- recovery/rollback aplicable;
- discrepancias que impidan paridad total.

La mera aprobación documental de `AUTH-DB-030` no certifica retiro físico.

---

#### 28. Relación con `SHELL-AUTH-005`

La certificación consume el evidence matrix de consumidores y el handoff de retiro.

Debe permanecer reconciliado:

```text
consumidores directos legacy = 0
findings estáticos legacy = 0
directos cliente legacy = 0
consumidores no registrados = 0
allowlist activa de deuda migrada = 0
telemetría legacy = 0, solo con cobertura demostrada
```

Una métrica ausente no se interpreta como cero.

---

#### 29. Relación con packages y lineage

Toda evidencia proveniente de packages deberá conservar:

- `package_id`;
- `implementation_unit_id` cuando aplique;
- owner;
- commit/candidate;
- manifest y lockfile;
- versions;
- ambiente;
- evidence digest;
- gates asociados.

Resultados de otra combinación son `STALE`.

---

#### 30. Gate de ausencia de drift bloqueante

Antes de certificar deberán quedar en cero:

```text
unapproved_documentation_drift
unapproved_repository_drift
unapproved_database_drift
unapproved_contract_drift
unapproved_consumer_drift
unapproved_environment_drift
unowned_runtime_surface
```

Una diferencia aprobada por ambiente no cuenta como drift bloqueante únicamente cuando tenga owner, motivo, contrato y evidencia.

---

#### 31. Gate de ausencia de legacy residual

No podrá emitirse certificación positiva si persiste una dependencia legacy que la arquitectura declare retirada.

Se deberá cubrir:

- imports y llamadas directas;
- wrappers y aliases;
- rutas dinámicas;
- SQL/RLS/RPC;
- configuraciones;
- jobs/Edge/Realtime;
- consumidores externos registrados;
- telemetría aplicable;
- writers residuales;
- compatibilidad temporal vencida.

---

#### 32. Gate de seguridad

La certificación deberá consumir evidencia de:

- denegaciones;
- RLS y grants;
- SECURITY DEFINER aplicables;
- secretos y principales técnicos;
- fronteras cliente/servidor;
- manipulación de actor/contexto/recurso;
- replay/idempotencia cuando aplique;
- aislamiento entre organizaciones/sedes/áreas/actores cuando corresponda.

Un PASS funcional con fallo de seguridad no es certificable.

---

#### 33. Gate de builds y pruebas por consumidor

Cada repositorio/consumidor materializado ejecutará su perfil real aplicable.

La matriz deberá distinguir explícitamente:

```text
PASS
FAIL
NOT_APPLICABLE_WITH_EVIDENCE
NOT_EXECUTED
STALE
```

`NOT_EXECUTED` y `STALE` bloquean cuando el check sea obligatorio.

Un build de otro repositorio no sustituye al consumidor actual.

---

#### 34. Gate de pruebas integrales

La certificación global consume las materializaciones aplicables de `AUTH-QA-001..030` y `UX-QA-001..030`.

Para la certificación final:

- la evidencia por package debe pertenecer al package correspondiente;
- la evidencia global final debe pertenecer al corte global;
- un resultado documental no sustituye una ejecución física requerida;
- defectos críticos abiertos bloquean;
- una prueba no aplicable exige justificación contractual.

---

#### 35. Gate de pilotos y observación

Cuando un package o aplicación tenga piloto/hypercare obligatorio, su cierre deberá estar disponible antes de certificar.

Se exige que:

- el piloto corresponda a la versión certificada;
- observaciones bloqueantes estén resueltas;
- no exista rollback pendiente por incidente no cerrado;
- no se mezcle evidencia de una versión anterior con un deploy posterior.

---

#### 36. Gate de recovery

La certificación requiere evidencia vigente de restore/rollback para el conjunto aplicable.

Un mecanismo teórico, no ensayado cuando el contrato exige ensayo, no satisface el gate.

La certificación tampoco puede depender de restaurar una arquitectura legacy ya prohibida como solución ordinaria.

---

#### 37. Gate de auditoría y observabilidad

Deberá existir evidencia suficiente para reconstruir:

- quién o qué produjo cada resultado;
- versión y ambiente;
- actor/principal cuando corresponda;
- operación y outcome;
- correlación sin fuga sensible;
- errores y denegaciones;
- transición de legacy a canónico;
- resultados de gates.

La ausencia de telemetría no se convierte en valor cero.

---

#### 38. Tratamiento de discrepancias

Toda discrepancia queda en una de estas clases:

```text
DOCUMENTATION_DRIFT
REPOSITORY_DRIFT
CONTRACT_DRIFT
DATABASE_DRIFT
ENVIRONMENT_DRIFT
CONSUMER_DRIFT
DATA_DRIFT
SECURITY_DRIFT
LEGACY_RESIDUAL
EVIDENCE_STALE
EVIDENCE_MISSING
UNKNOWN
```

Cada finding conserva:

```text
surface_identity
class
observed_value
expected_value
owner
source_evidence
blocking
resolution_owner
exit_condition
```

`UNKNOWN` es bloqueante hasta resolver la evidencia.

---

#### 39. AUTH-DB-031 no corrige findings

La instancia global final es de certificación.

Ante una discrepancia:

```text
DETECTAR
→ ATRIBUIR
→ BLOQUEAR CERTIFICACIÓN
→ DEVOLVER AL OWNER CANÓNICO
→ CORREGIR FUERA DE AUTH-DB-031
→ GENERAR NUEVO CORTE
→ RECERTIFICAR
```

Queda prohibido modificar directamente documentación, código, migraciones, datos, configuración, aplicaciones o recursos remotos dentro de la certificación para convertir un FAIL en PASS.

---

#### 40. No se permite waiver silencioso

Una excepción solo puede ser compatible con certificación cuando:

- existe contrato propietario que la permita;
- tiene owner;
- alcance exacto;
- riesgo y motivo;
- fecha/versión o condición de expiración cuando aplique;
- evidencia;
- no contradice una prohibición crítica de seguridad, autoridad o integridad.

Una nota libre, comentario o aceptación implícita no cambia un drift bloqueante.

---

#### 41. Manifiesto de certificación global

La futura instancia deberá producir un manifiesto reproducible con, como mínimo:

```text
certification_instance_id
certification_cut
route_id
sequence_id
vento_shell_commit
documentation_digest
registry_04a_digest
migration_manifest_digest
contract_versions
environment_matrix
supabase_fingerprints
consumer_matrix
package_lineage
qa_evidence_refs
retirement_evidence_ref
recovery_evidence_ref
drift_findings
legacy_residuals
security_result
data_reconciliation_result
operational_result
global_result
artifact_digest
```

El manifiesto no contiene secretos ni datos personales innecesarios.

---

#### 42. Doce gates de futura materialización

La instancia `AUTH-DB-031::GLOBAL-FINAL` deberá superar los siguientes gates:

| # | Gate | Condición de PASS |
| ---: | --- | --- |
| 1 | `IDENTITY_CUT` | un único corte con commits, versiones, ambientes y digests atribuibles |
| 2 | `DOCUMENTATION_PARITY` | fuentes canónicas vigentes corresponden a las identidades materializadas |
| 3 | `REPOSITORY_PARITY` | `vento-shell` y repositorios consumidores corresponden al corte certificado |
| 4 | `SUPABASE_PARITY` | objetos, migraciones, seguridad y automatizaciones corresponden al corte por ambiente |
| 5 | `CONSUMER_PARITY` | todos los consumidores registrados usan targets y versiones compatibles |
| 6 | `DATA_RECONCILIATION` | backfills/migraciones aplicables tienen reconciliación atribuible y sin bloqueo |
| 7 | `NO_BLOCKING_DRIFT` | cero drift no aprobado y cero superficies runtime sin owner |
| 8 | `NO_LEGACY_RESIDUAL` | retiro/handoff demuestra cero dependencias legacy prohibidas aplicables |
| 9 | `SECURITY_AND_REGRESSION` | seguridad, denegaciones, builds y regresión aplicables están en PASS |
| 10 | `QA_AND_OPERATION` | certificaciones integrales, pilotos y evidencia operativa requerida están cerrados |
| 11 | `RECOVERY` | restore/rollback requerido es vigente, reproducible y compatible |
| 12 | `EVIDENCE_INTEGRITY` | evidence bundle completo, mismo corte, sin resultados missing/stale obligatorios |

Todos los gates aplicables deben estar `PASS`.

---

#### 43. Resultado global permitido

La instancia emite exactamente uno de estos resultados:

```text
CERTIFIED
BLOCKED
```

`CERTIFIED` exige los doce gates aplicables en PASS.

`BLOCKED` conserva findings, owner, evidencia disponible y condición de salida. No implica rollback automático ni autoriza corrección física.

---

#### 44. Evidencia histórica y reproducibilidad

La certificación conservará:

- manifiesto final;
- digests;
- resultados de checks;
- referencias a packages/commits/releases;
- fingerprints de ambientes;
- matriz de consumidores;
- resultados QA;
- handoff de retiro;
- referencia de recovery;
- findings y su resolución previa al corte final.

No se reescriben evidencias históricas para hacer coincidir un estado posterior.

---

#### 45. Condición de cierre de la ruta normal

`AUTH-DB-031` es la última tarea de `PHASE-13-R3-LEGACY-RETIREMENT` y la última etapa de `NORMAL-CANONICAL-FLOW-001`.

Su cierre documental no activa tareas diferidas por inferencia.

En particular:

- `EXT-GOV-001` permanece condicional y `DEFERRED` hasta que su regla propietaria se active;
- `PHASE-02-VISO-SCHEDULE-DELTA` permanece diferida hasta su activación propietaria;
- trabajo físico pendiente conserva su lifecycle independiente;
- completar la ruta documental normal no autoriza implementar packages o instancias físicas.

---

#### 46. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: esta tarea consolida y certifica obligaciones ya existentes de paridad, drift, migración, compatibilidad, seguridad, pruebas integrales, retiro legacy, recovery y evidencia. No introduce una nueva regla funcional ni de seguridad que requiera una fila adicional del Registro 04A.

---

#### 47. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, la certificación consume especialmente:

- `TREQ-SUPABASE-008`, para reconstrucción, upgrade, datos, constraints, RLS, RPC, tipos, rendimiento, backup, restore, rollback y drift de ambientes;
- `TREQ-SUPABASE-010`, para Edge Functions, webhooks, cron, triggers y automatizaciones versionadas y reconciliadas con remoto;
- `TREQ-SUPABASE-1763`, para bloquear compatibilidad con gates incompletos;
- `TREQ-SUPABASE-1769` y `TREQ-SUPABASE-1770`, para handoff y evidence bundle integral de transición;
- `TREQ-SHELL-004`, `TREQ-SHELL-006` a `TREQ-SHELL-009`, para retiro seguro, compatibilidad, rollback, trazabilidad y ambiente verificable;
- `TREQ-SHELL-038`, `TREQ-SHELL-039` y `TREQ-SHELL-065`, para deprecación, uso residual y cinco familias legacy;
- `TREQ-SHELL-083` a `TREQ-SHELL-090`, para registry/freeze/gates/métricas/seguridad/rollback de consumidores legacy;
- `TREQ-SHELL-091` a `TREQ-SHELL-098`, para migración, paridad, evidencia por consumidor, handoff de retiro y lineage.

Estas referencias son cobertura heredada, no cambios del registro.

---

#### 48. Perfil mínimo de pruebas de la futura instancia

La materialización deberá ejecutar o consumir evidencia vigente de, según aplicabilidad:

1. validación del plan y contratos;
2. Registro 04A íntegro;
3. migration manifest;
4. drift local/staging/producción;
5. schema/integridad;
6. RLS/grants;
7. RPC/functions/triggers;
8. Storage/Realtime/Edge/cron;
9. contracts/types/packages;
10. builds y tests por consumidor;
11. seguridad y denegaciones;
12. reconciliación de datos;
13. QA integral de autorización;
14. QA integral de experiencia;
15. pilotos/hypercare aplicables;
16. retiro legacy;
17. restore/rollback;
18. evidencia y lineage.

Un perfil obligatorio sin ejecución o con evidencia de otro corte bloquea.

---

#### 49. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | Este marcador documental no ejecuta builds ni materializa la futura certificación global. |
| LOCAL | `PASS` | El artefacto documental fue verificado como una única tarea, con metadata obligatoria, continuidad terminal, secciones sustantivas, cero placeholders y cero cambios de requisitos de prueba. |
| REMOTA | `PASS` | Lectura read-only de `vento-shell/main` confirmó owner R3, topología `GLOBAL_FINAL / POST_E5_PACKAGE`, `AUTH-DB-031` como última tarea de la ruta normal, fuentes de drift/recovery/paridad y requisitos vigentes consumidos. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó la certificación contra aplicaciones, pilotos o procesos desplegados. |
| FÍSICA | `NOT_APPLICABLE` | Este marcador no materializa `AUTH-DB-031::GLOBAL-FINAL`; la ejecución física permanece condicionada a su gate y autorización propia. |

---

#### 50. Criterios de aceptación

`AUTH-DB-031` queda documentalmente completa cuando:

1. conserva el título y owner canónicos;
2. fija `GLOBAL_FINAL` y `POST_E5_PACKAGE`;
3. define una sola instancia futura `AUTH-DB-031::GLOBAL-FINAL`;
4. separa definición documental de certificación física;
5. define documento, `vento-shell`, Supabase y aplicaciones como cuatro capas reconciliadas;
6. materializa las seis relaciones de paridad entre esas capas;
7. exige un único corte inmutable y atribuible;
8. distingue paridad documental, técnica y operativa;
9. no confunde paridad con igualdad byte a byte entre ambientes;
10. clasifica diferencias de ambiente de forma fail-closed;
11. exige paridad de contratos, catálogos y tipos;
12. exige paridad de migraciones y objetos;
13. exige RLS/RPC reales, no inferidos;
14. cubre Storage, Realtime, Edge y automatizaciones cuando apliquen;
15. exige reconciliación de datos además de schema;
16. exige paridad de autorización y contexto;
17. exige una decisión por consumidor registrado;
18. consume evidencia de `AUTH-QA-*` y `UX-QA-*` aplicable;
19. consume baseline/drift de `AUTH-DB-028`;
20. consume restore/rollback de `AUTH-DB-029`;
21. consume harness de `AUTH-DB-027`;
22. consume el handoff material de `AUTH-DB-030`;
23. consume la convergencia de `SHELL-AUTH-005`;
24. preserva package/implementation lineage;
25. exige cero drift bloqueante;
26. exige cero legacy residual prohibido;
27. exige seguridad y regresión;
28. exige builds/tests por consumidor;
29. exige pilotos/observación cuando sean obligatorios;
30. exige recovery vigente;
31. exige observabilidad y auditoría suficientes;
32. clasifica discrepancias con owner y condición de salida;
33. prohíbe corregir findings dentro de la certificación;
34. prohíbe waivers silenciosos;
35. define un manifiesto global reproducible;
36. define doce gates de materialización;
37. limita el resultado físico a `CERTIFIED` o `BLOCKED`;
38. conserva evidencia histórica;
39. no activa tareas diferidas por cerrar la ruta normal;
40. genera cero requisitos de prueba nuevos o modificados;
41. no ejecuta ninguna mutación física desde el marcador documental.

---

#### 51. Límites

Esta tarea no:

- modifica `vento-shell`;
- modifica repositorios consumidores;
- modifica aplicaciones;
- modifica Supabase;
- crea SQL;
- crea migraciones;
- ejecuta DDL o DML;
- repara drift;
- cambia packages;
- cambia manifests o lockfiles;
- publica versiones;
- genera tipos;
- ejecuta builds físicos;
- ejecuta pilotos;
- ejecuta restore o rollback;
- retira objetos legacy;
- reabre una compatibilidad retirada;
- crea excepciones para alcanzar PASS;
- actualiza el Registro 04A;
- activa `EXT-GOV-001`;
- activa el delta VISO diferido;
- autoriza packages o instancias físicas pendientes.

Toda corrección material detectada por la futura certificación vuelve a su owner canónico y requiere un nuevo corte antes de recertificar.

---

#### 52. Handoff de cierre

Una certificación física positiva deberá dejar un bundle suficiente para demostrar:

```text
qué corte fue certificado
qué fuentes documentales gobernaron
qué commits/releases fueron evaluados
qué ambientes fueron observados
qué objetos Supabase fueron reconciliados
qué consumidores/aplicaciones fueron evaluados
qué packages y implementation units aportaron evidencia
qué QA/pilotos fueron consumidos
qué legacy fue retirado o quedó históricamente no ejecutable
qué recovery quedó vigente
qué drift fue cero o aprobado explícitamente
qué digest identifica el bundle final
```

Si el resultado es `BLOCKED`, el bundle conserva findings y owners sin afirmar cierre de VENTO OS.

---

#### 53. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DB-030 — Retirar objetos legacy únicamente después de adopción comprobada`

**TAREA ACTUAL APROBADA**
`AUTH-DB-031 — Certificar paridad entre documento, vento-shell, Supabase y aplicaciones`

**SIGUIENTE TAREA RESERVADA**
`NINGUNA — CIERRE SIN HANDOFF DECLARADO`
