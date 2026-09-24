### MINI-BLOQUE — EXPERIENCIA DE PRODUCCION

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia de produccion** dentro de **L FOGO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `FOGO-UX-001` a `FOGO-UX-015` — 15 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar procesos reales de producción” y concluye con “Validar el prototipo por área productiva”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:FOGO-UX -->
### Reconciliación topológica de FOGO-UX-001 a FOGO-UX-015

Estas tareas inventarían, diseñan y validan la experiencia productiva objetivo. Son contratos UX consumidos por E5; la implementación física pertenece al package_id y a los propietarios técnicos correspondientes.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ FOGO-UX-001 — Inventariar procesos reales de producción

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-016 — Ejecutar pruebas integrales
**Tarea siguiente:** FOGO-UX-002 — Separar cocina, panadería y repostería
**Tipo de tarea:** documental; inventario integral AS-IS/canónico de procesos, pantallas, rutas, acciones, estados y handoffs de producción FOGO, con clasificación de brechas y responsabilidades posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable cuáles procesos productivos de FOGO existen hoy como comportamiento real, cuáles existen únicamente como contratos canónicos, cuáles están materializados de forma parcial o colapsada dentro de otra acción y cuáles todavía no tienen una superficie dedicada observada.

El resultado debe permitir que `FOGO-UX-002..015` diseñen la experiencia objetivo sin confundir:

```text
URL / PÁGINA EXISTENTE
!=
PROCESO COMPLETO
!=
PANTALLA CANÓNICA
!=
ESTADO EMPRESARIAL
!=
TRANSICIÓN ALCANZABLE
!=
AUTORIZACIÓN
```

La tarea no diseña todavía la UX final. Su responsabilidad es fijar el universo, el AS-IS, las brechas, los handoffs y los propietarios de salida.

---

#### 2. Frontera recibida de FOGO-AUTH-016

El mini-bloque anterior entrega cuatro restricciones que esta tarea conserva sin reinterpretación:

1. la UX puede inventariar y diseñar procesos sobre permisos, carriles y oracles ya definidos;
2. visibilidad, selección, botón, ruta, dispositivo o estado local no crean autorización;
3. la UX no redefine roles productivos, `supervisor`, `gerencia_operativa`, scopes, recursos ni permisos;
4. la UX consume resultados autorizados y estados de deny/bloqueo sin fabricar autoridad nueva.

Por tanto, este inventario clasifica experiencia y proceso, no concede ni corrige autorización.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque FOGO-UX establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- existe un único contrato documental `FOGO-UX-001`;
- no existe identidad física `FOGO-UX-001::<implementation_unit_id>`;
- la tarea no modifica `vento-fogo`;
- la tarea no modifica `vento-shell` físicamente;
- no crea datos, migraciones, RLS, RPC, Server Actions ni despliegues;
- la implementación posterior pertenece a E5 y a los propietarios técnicos correspondientes.

---

#### 4. Snapshot de evidencia utilizado

El inventario se ancla a:

```text
vento-shell/main = 3d8e0aec9368070bf4c95ea1161937a46c5a7ca1
vento-fogo/main  = a40683b2413d621fb3f54f2eebb8743a42bad3d7
```

En `vento-fogo` se observaron como línea base de consumidor:

- 9 archivos de página;
- 1 route handler;
- 12 superficies técnicas de baseline;
- 42 pruebas contractuales declaradas por el gate de consumidor;
- integración con `@vento/contracts`, `@vento/os-context`, `@vento/supabase` y `@vento/ui-web` en la baseline de compatibilidad.

Estas cifras identifican el snapshot inspeccionado. No demuestran por sí mismas que los procesos productivos objetivo estén completos.

---

#### 5. Universo canónico de procesos FOGO

El ownership compartido identifica exactamente seis procesos cuyo propietario funcional es `fogo`:

| Proceso | Propósito canónico | Papel dentro de la experiencia productiva |
| --- | --- | --- |
| `VPROC-0016` | Gestionar desarrollo, prueba, aprobación, publicación y versión de recetas | conocimiento productivo, receta administrativa, prueba y publicación |
| `VPROC-0033` | Planear producción desde demanda, inventario, capacidad, prioridad y fecha requerida | planificación y cola de trabajo productiva |
| `VPROC-0034` | Preparar materiales y ejecutar producción contra una versión aprobada | preparación, inicio, ejecución y avance del lote |
| `VPROC-0035` | Inspeccionar y decidir liberación, retención, rechazo o corrección de producto | calidad y disposición independiente |
| `VPROC-0036` | Empacar, etiquetar y almacenar producto terminado con trazabilidad preservada | empaque, identificación y transferencia del terminado |
| `VPROC-0037` | Cerrar la ejecución productiva explicando rendimiento, merma, aprovechamiento y reproceso sin ocultar desviaciones | resultado, merma, reproceso y cierre productivo |

No se crea un séptimo proceso FOGO para explicar una brecha del runtime. Las brechas se asignan a estos procesos o a tareas ya existentes.

---

#### 6. Universo canónico de pantallas FOGO

El catálogo UX vigente asigna exactamente quince identidades canónicas a FOGO:

| Pantalla | Nombre | Proceso principal |
| --- | --- | --- |
| `VSCREEN-0055` | Inicio y cola de producción | `VPROC-0033` |
| `VSCREEN-0056` | Planeación de producción | `VPROC-0033` |
| `VSCREEN-0057` | Preparación e inicio de lote | `VPROC-0034` |
| `VSCREEN-0058` | Ejecución de lote | `VPROC-0034` |
| `VSCREEN-0059` | Registro parcial de producción | `VPROC-0034` |
| `VSCREEN-0060` | Finalización y cierre de lote | `VPROC-0037` |
| `VSCREEN-0061` | Receta operativa | `VPROC-0016` |
| `VSCREEN-0062` | Catálogo y editor de recetas | `VPROC-0016` |
| `VSCREEN-0063` | Revisión, aprobación y publicación de receta | `VPROC-0016` |
| `VSCREEN-0064` | Prueba de receta y rendimiento | `VPROC-0016` |
| `VSCREEN-0065` | Control de calidad y liberación | `VPROC-0035` |
| `VSCREEN-0066` | Empaque, etiquetado y almacenamiento de terminado | `VPROC-0036` |
| `VSCREEN-0067` | Reproceso, aprovechamiento, merma y cierre productivo | `VPROC-0037` |
| `VSCREEN-0173` | Trazabilidad e investigación de lote | `VPROC-0035` |
| `VSCREEN-0174` | Controles operativos de inocuidad | `VPROC-0014` con integración FOGO |

La existencia canónica de una pantalla no implica que exista hoy una ruta equivalente en `vento-fogo`.

---

#### 7. Inventario de rutas AS-IS de `vento-fogo`

La baseline vigente reconoce exactamente los siguientes nueve archivos de página:

| Ruta contractual | Archivo | Clasificación primaria |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | entrada/navegación FOGO; no representa por sí sola un proceso productivo |
| `/login` | `src/app/login/page.tsx` | puente de acceso; fuera del proceso productivo |
| `/no-access` | `src/app/no-access/page.tsx` | denegación; fuera del proceso productivo |
| `/production-batches` | `src/app/production-batches/page.tsx` | lectura de lotes y métricas de ejecución ya registradas |
| `/production-batches/new` | `src/app/production-batches/new/page.tsx` | captura y creación real de lote en una acción final |
| `/recipe-book` | `src/app/recipe-book/page.tsx` | recetario operativo |
| `/recipes` | `src/app/recipes/page.tsx` | catálogo administrativo de recetas |
| `/recipes/[id]/edit` | `src/app/recipes/[id]/edit/page.tsx` | edición administrativa de receta |
| `/recipes/new` | `src/app/recipes/new/page.tsx` | creación administrativa de receta |

Además existe el route handler:

```text
/recipes/pdf
src/app/recipes/pdf/route.tsx
```

La ruta técnica de PDF no se contabiliza como pantalla productiva.

---

#### 8. Acciones server-side AS-IS observadas

El inventario técnico aprobado mantiene tres acciones server-side relevantes en las superficies principales:

| Identidad por fuente | Acción | Hecho material |
| --- | --- | --- |
| `src/app/recipes/new/page.tsx` | `saveRecipe` | crea receta y sus relaciones/configuración |
| `src/app/recipes/[id]/edit/page.tsx` | `saveRecipe` | actualiza receta y sus relaciones/configuración |
| `src/app/production-batches/new/page.tsx` | `createBatch` | crea lote real mediante `fogo_create_real_production_batch` |

Las dos funciones `saveRecipe` son identidades distintas por su archivo fuente aunque compartan nombre.

---

#### 9. Vocabulario de clasificación del inventario

Para esta tarea se usa únicamente el siguiente vocabulario documental:

| Estado de inventario | Significado |
| --- | --- |
| `AS_IS_REAL` | existe una interacción alcanzable que produce o consulta el hecho empresarial esperado dentro de su alcance observado |
| `AS_IS_PARTIAL` | existe una parte del proceso, pero faltan etapas, decisiones, estados, actores o handoffs necesarios para representar el proceso completo |
| `AS_IS_COLLAPSED` | varias etapas canónicas se ejecutan o registran dentro de una sola acción sin quedar representadas como workflow independiente |
| `NO_DEDICATED_SURFACE_OBSERVED` | el snapshot de rutas inspeccionado no contiene una superficie dedicada que materialice la pantalla/proceso canónico |
| `CONTRACT_ONLY` | existe contrato canónico, pero la evidencia observada no demuestra una experiencia runtime equivalente |

Estas etiquetas describen el inventario de esta tarea. No son estados empresariales, no se persistirán como enums y no sustituyen los estados de `VPROC-*`.

---

#### 10. Matriz consolidada de procesos reales

| Proceso | Evidencia AS-IS | Clasificación | Conclusión |
| --- | --- | --- | --- |
| `VPROC-0016` | `/recipes`, `/recipes/new`, `/recipes/[id]/edit`, `/recipe-book`, estados `draft/published/archived` y salida PDF | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | receta y recetario existen, pero el runtime observado no representa por separado todo el ciclo canónico de prueba, revisión técnica, aprobación, publicación versionada y liberación |
| `VPROC-0033` | `/production-batches` ofrece lectura de lotes ya existentes; no se observó una pantalla dedicada de plan productivo | `CONTRACT_ONLY` para planeación + `AS_IS_PARTIAL` para cola observada | no se demuestra todavía un workflow alcanzable de consolidación de demanda, capacidad, revisión, aprobación, publicación y revisión de plan |
| `VPROC-0034` | `/production-batches/new` captura receta, cantidades, insumos, empaques, coproductos/subproductos, destino y ejecuta `fogo_create_real_production_batch` | `AS_IS_REAL` para la mutación final + `AS_IS_COLLAPSED` para el ciclo | existe producción real, pero inicio, ejecución durante turno, avance parcial, pausa/reanudación y cierre no aparecen como transiciones independientes |
| `VPROC-0035` | la lista muestra datos derivados y estados, pero no se observó una superficie dedicada de decisión de calidad/liberación | `NO_DEDICATED_SURFACE_OBSERVED` | no se demuestra el workflow de liberar, retener, rechazar o corregir como decisión independiente |
| `VPROC-0036` | la creación de lote captura empaques y la lista muestra `packaging_status` | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | existe evidencia de empaque dentro de creación/lectura, no una experiencia dedicada de empacar, etiquetar, almacenar y transferir terminado |
| `VPROC-0037` | la lista calcula rendimiento/delta y expone estados; no se observó una superficie dedicada de merma, reproceso o cierre | `AS_IS_PARTIAL` | existen métricas/resultados visibles, pero no un workflow completo de cierre, reproceso, aprovechamiento y merma |

Resultado global:

```text
PRODUCCION REAL EXISTE
+
REGISTRO REAL DE LOTE EXISTE
+
RECETA Y RECETARIO EXISTEN

PERO

CICLO PRODUCTIVO DURANTE EL TURNO NO ESTA REPRESENTADO COMO WORKFLOW COMPLETO
```

---

#### 11. Realidad actual de creación de lote

La superficie `/production-batches/new` demuestra capacidad material real para:

- seleccionar una receta publicada;
- resolver ruta productiva;
- capturar rendimiento real;
- capturar consumo real;
- capturar empaques;
- capturar coproductos y subproductos;
- exigir LOC destino cuando corresponde;
- exigir firma de actor en estación compartida cuando aplica;
- revalidar `production.batches.create` antes del efecto observado;
- invocar `fogo_create_real_production_batch`;
- redirigir hacia el lote creado.

La operación física vigente asociada puede producir efectos reales sobre:

- lote;
- consumos;
- proyecciones de inventario;
- movimientos `production_consume`;
- destino de salida.

Por tanto, no se clasifica FOGO como prototipo sin efecto real.

---

#### 12. Flujo colapsado de producción

La evidencia E1 vigente determina que el flujo actual registra el lote real mediante una acción final y no demuestra un recorrido alcanzable para:

- iniciar un lote como transición independiente;
- marcarlo `IN_PRODUCTION` mediante una acción observable separada;
- registrar producción parcial durante el turno;
- pausar;
- reanudar;
- cambiar responsable con trazabilidad de handoff;
- registrar desperdicio durante la ejecución;
- bloquear por control de calidad;
- finalizar mediante una transición dedicada;
- cancelar mediante una transición dedicada;
- corregir mediante evento compensatorio.

Esto significa:

```text
CAPTURA INTEGRAL EN UN FORMULARIO
!=
GESTION OPERATIVA DEL LOTE DURANTE EL TURNO
```

---

#### 13. Etiquetas de estado AS-IS

La vista de lotes conoce etiquetas como:

```text
draft
posted
completed
cancelled
```

El inventario no toma esas etiquetas como evidencia suficiente de un lifecycle alcanzable.

Regla:

```text
STATUS LABEL
!=
SERVER TRANSITION
!=
USER ACTION
!=
AUDITED PROCESS STEP
```

Una futura pantalla puede mostrar un estado solo cuando exista una fuente empresarial que lo sostenga. No se diseñarán botones a partir de strings observados sin contrato de transición.

---

#### 14. Realidad AS-IS de recetas

El runtime demuestra:

- catálogo de recetas;
- creación de receta;
- edición de receta;
- ingredientes;
- pasos;
- salidas/coproductos;
- rendimiento;
- sitio y área;
- usos por sede;
- estado simplificado `draft/published/archived`;
- activación/desactivación;
- recetario operativo;
- exportación PDF.

Sin embargo, el proceso canónico `VPROC-0016` contiene más semántica que esa tríada de estados.

No se observan como superficies separadas equivalentes y completas:

- `IN_DEVELOPMENT`;
- `IN_TESTING`;
- `UNDER_TECHNICAL_REVIEW`;
- `PENDING_APPROVAL`;
- `APPROVED` antes de publicación;
- publicación inmutable/versionada como transición independiente;
- prueba de receta y rendimiento como experiencia propia;
- comparación explícita entre versiones antes de aprobar/publicar.

Por tanto:

```text
CRUD DE RECETA + STATUS SIMPLIFICADO
!=
VPROC-0016 COMPLETO
```

---

#### 15. Realidad AS-IS de planificación y cola

`VPROC-0033` exige transformar demanda y necesidad operativa en un plan factible, priorizado, revisable y publicable.

En el snapshot actual:

- `/production-batches` lista lotes existentes;
- la home enlaza a lotes y recetario;
- no se observó un archivo de página dedicado equivalente a `VSCREEN-0056 — Planeación de producción`;
- no se demuestra un ciclo de `PRODUCTION_PLAN_DRAFT -> validación de capacidad -> revisión -> aprobación -> publicación -> revisión`;
- listar lotes creados no demuestra una cola derivada de un plan publicado.

Por tanto, `FOGO-UX-003`, `FOGO-UX-004`, `FOGO-UX-014` y las tareas `OPS-PLAN-*` permanecen propietarias de la experiencia y reglas posteriores aplicables.

---

#### 16. Realidad AS-IS de calidad, liberación e inocuidad

El inventario de nueve páginas no demuestra una superficie dedicada equivalente a:

- `VSCREEN-0065 — Control de calidad y liberación`;
- `VSCREEN-0174 — Controles operativos de inocuidad`.

Esto no prueba inexistencia absoluta de validaciones técnicas fuera de las rutas inspeccionadas.

Sí demuestra que el runtime observado no ofrece hoy una experiencia canónica separada para:

```text
FINALIZACION PRODUCTIVA
!=
DECISION DE CALIDAD
!=
LIBERACION
```

La UX posterior deberá conservar esa separación y nunca presentar `completed` como sinónimo automático de producto liberado.

---

#### 17. Realidad AS-IS de empaque y producto terminado

La creación real de lote captura empaques y la vista de lotes expone `packaging_status`.

Eso demuestra datos y efecto parcial, pero no una superficie dedicada equivalente a:

`VSCREEN-0066 — Empaque, etiquetado y almacenamiento de terminado`.

La UX objetivo debe conservar:

```text
PRODUCIDO
!=
EMPACADO
!=
ETIQUETADO
!=
LIBERADO
!=
INGRESADO A INVENTARIO
```

`FOGO-UX-013` conserva el handoff del producto terminado hacia NEXO sin transferir a FOGO la autoridad sobre stock físico.

---

#### 18. Realidad AS-IS de merma, reproceso y cierre

La vista actual puede calcular diferencias entre rendimiento esperado y producido y mostrar consumos/costos asociados.

No se observó una superficie dedicada equivalente a:

`VSCREEN-0067 — Reproceso, aprovechamiento, merma y cierre productivo`.

Por tanto, una diferencia numérica no se interpreta automáticamente como:

- merma confirmada;
- desperdicio autorizado;
- reproceso;
- aprovechamiento;
- ajuste de inventario;
- causa de cierre.

`FOGO-UX-010` y `FOGO-UX-011` reciben la obligación de representar cantidades, desperdicio, resultado y corrección sin reescribir historia.

---

#### 19. Realidad AS-IS de trazabilidad de lote

El inventario canónico exige `VSCREEN-0173 — Trazabilidad e investigación de lote` para reconstruir materiales, receta, ejecución, calidad, empaque, destinos y evidencia.

El runtime observado lista lote, consumo, costos, empaque y destino, pero no se observó una superficie dedicada de investigación integral.

Clasificación:

`AS_IS_PARTIAL`.

La existencia de datos consultables no equivale a un proceso de investigación con genealogía y evidencia completa.

---

#### 20. Matriz pantalla canónica ↔ AS-IS ↔ propietario posterior

| Pantalla | Estado observado | Evidencia / brecha | Propietario posterior principal | Condición de salida |
| --- | --- | --- | --- | --- |
| `VSCREEN-0055` | `AS_IS_PARTIAL` | `/production-batches` lista lotes; no demuestra cola de trabajo derivada de plan/turno | `FOGO-UX-004` / `FOGO-UX-014` | mostrar únicamente trabajo pendiente autorizado y priorizado por contexto |
| `VSCREEN-0056` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe página dedicada de planeación en el snapshot de 9 páginas | `OPS-PLAN-002..004` / `FOGO-UX-014` | plan revisable y publicable visible sin fusionarlo con ejecución |
| `VSCREEN-0057` | `AS_IS_REAL` + `AS_IS_COLLAPSED` | `/production-batches/new` prepara y registra lote real en una sola acción | `FOGO-UX-005` | separar preparación e inicio de la ejecución posterior |
| `VSCREEN-0058` | `AS_IS_COLLAPSED` | no se observó pantalla de lote en curso; ejecución queda embebida en creación | `FOGO-UX-006` | workflow de ejecución identifica lote activo, pasos, actor y contexto |
| `VSCREEN-0059` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe captura parcial dedicada observada | `FOGO-UX-006` | registrar avances parciales sin cerrar el lote |
| `VSCREEN-0060` | `NO_DEDICATED_SURFACE_OBSERVED` | `completed` visible no equivale a acción de cierre | `FOGO-UX-007` / `FOGO-UX-010` | cierre dedicado concilia resultado, consumos, desperdicio y pendientes |
| `VSCREEN-0061` | `AS_IS_REAL` | `/recipe-book` existe | `FOGO-UX-008` | proyección operativa mínima separada de administración |
| `VSCREEN-0062` | `AS_IS_REAL` | `/recipes`, `/recipes/new`, `/recipes/[id]/edit` existen | `FOGO-UX-009` | administración de receta permanece separada del recetario operativo |
| `VSCREEN-0063` | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | el editor puede cambiar status; no se observa proceso dedicado de revisión/aprobación/publicación | `FOGO-UX-009` / `OPS-REC-001` | revisión, aprobación y publicación se representan como decisiones independientes |
| `VSCREEN-0064` | `NO_DEDICATED_SURFACE_OBSERVED` | no hay página dedicada observada de prueba/rendimiento | `OPS-REC-001` / `FOGO-UX-015` | prototipo contempla prueba controlada sin publicar automáticamente |
| `VSCREEN-0065` | `NO_DEDICATED_SURFACE_OBSERVED` | no hay superficie dedicada de calidad/liberación | `FOGO-UX-015` con contrato `VPROC-0035` | prototipo representa decisión independiente de liberar/retener/rechazar/corregir |
| `VSCREEN-0066` | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | empaque se captura dentro de creación; status se lista después | `FOGO-UX-013` / `FOGO-UX-015` | experiencia separa empaque, etiqueta, almacenamiento y handoff a NEXO |
| `VSCREEN-0067` | `AS_IS_PARTIAL` | rendimiento visible; no hay workflow dedicado de reproceso/merma/cierre | `FOGO-UX-010` / `FOGO-UX-011` / `FOGO-UX-015` | resultado, merma, reproceso y cierre quedan explícitos y no destructivos |
| `VSCREEN-0173` | `AS_IS_PARTIAL` | datos dispersos de lote existen sin superficie de investigación dedicada | `FOGO-UX-015` con contrato `VPROC-0035` | prototipo permite reconstruir genealogía y evidencia relevante |
| `VSCREEN-0174` | `NO_DEDICATED_SURFACE_OBSERVED` | no hay página dedicada observada de controles operativos de inocuidad | `FOGO-UX-015` con contrato `VPROC-0014` | prototipo incorpora controles necesarios sin fusionar gobierno SST/calidad |

No se crea una tarea adicional. Toda brecha conserva un propietario existente.

---

#### 21. Inventario de las tres áreas productivas

La experiencia productiva ordinaria distingue exactamente:

| Rol operativo | Área productiva ordinaria |
| --- | --- |
| `produccion_cocina` | Cocina Caliente |
| `produccion_panaderia` | Galletería y Panadería |
| `produccion_reposteria` | Repostería |

Este inventario no diseña todavía la separación visual de las áreas.

Sí fija que `FOGO-UX-002` recibe un universo de procesos común con contexto por área y debe impedir que una sola experiencia mezcle recursos, cola, receta o acciones de otra área por conveniencia de UI.

---

#### 22. Inventario de fronteras con NEXO

La experiencia FOGO consume hechos físicos de NEXO sin convertirse en sistema de inventario.

Fronteras mínimas observadas o canónicas:

| Hecho | Owner |
| --- | --- |
| orden productiva, receta, lote y ejecución | FOGO |
| requerimiento de materiales derivado | FOGO |
| stock físico, LOC, lote físico, LPN, condición y disponibilidad | NEXO |
| reserva física | NEXO |
| consumo/movimiento físico | NEXO mediante su contrato propietario |
| producto terminado disponible físicamente | NEXO después del handoff aplicable |
| rendimiento, merma y desviación productiva | FOGO |

La UX no puede representar una lectura local o una respuesta técnica como verdad física confirmada si NEXO no produjo ese hecho.

---

#### 23. Inventario de fronteras con receta

Para cualquier experiencia de producción:

```text
RECIPE_DEFINITION
!=
RECIPE_PUBLICATION
!=
RECETA OPERATIVA
!=
LOTE
```

El lote debe conservar la versión exacta aplicada.

La UX no puede sustituir `recipe_version_ref` con:

- nombre visible de receta;
- receta actualmente publicada;
- último editor;
- producto de salida;
- estado visual actual.

Una receta retirada permanece histórica pero no origina nuevos lotes.

---

#### 24. Inventario de handoffs de la secuencia FOGO-UX

| Tarea | Entrada exacta proveniente de FOGO-UX-001 |
| --- | --- |
| `FOGO-UX-002` | tres áreas productivas ordinarias y obligación de separarlas sin duplicar procesos canónicos |
| `FOGO-UX-003` | ausencia de una experiencia canónica de inicio por área derivada de plan/contexto |
| `FOGO-UX-004` | la lista de lotes actual no equivale a producción pendiente del turno |
| `FOGO-UX-005` | `/production-batches/new` demuestra creación real, pero preparación e inicio están colapsados con el registro final |
| `FOGO-UX-006` | no existe captura parcial dedicada observada y el ciclo durante turno está incompleto |
| `FOGO-UX-007` | `completed` no equivale a finalización canónica ni a liberación de calidad/inventario |
| `FOGO-UX-008` | `/recipe-book` es la base AS-IS para la receta operativa |
| `FOGO-UX-009` | las rutas `/recipes*` administran recetas, pero revisión/aprobación/publicación permanecen colapsadas |
| `FOGO-UX-010` | rendimiento, consumos y empaque ya aparecen como datos, pero desperdicio/resultado no tienen lifecycle completo |
| `FOGO-UX-011` | no se observó una experiencia dedicada de corrección compensatoria del lote |
| `FOGO-UX-012` | el consumo real ya puede afectar inventario, pero la UX debe preservar ownership NEXO y estados de integración |
| `FOGO-UX-013` | empaque/destino existen parcialmente; producto terminado no puede presentarse como stock disponible sin handoff NEXO |
| `FOGO-UX-014` | no se observó una experiencia canónica completa de planeación/supervisión multiárea |
| `FOGO-UX-015` | recibe las quince pantallas canónicas y esta matriz para validar cobertura del prototipo por área |

---

#### 25. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| el lote real se registra en una acción final y no mediante un workflow durante el turno | impide considerar completo `VPROC-0034` | `FOGO-UX-005..007` y materializaciones propietarias | inicio, avance parcial y finalización quedan alcanzables, diferenciados y trazables |
| etiquetas `draft/posted/completed/cancelled` no demuestran transiciones de usuario | riesgo de diseñar UX sobre estados nominales | `FOGO-UX-005..007` | cada estado visible se vincula a transición/estado canónico y fuente autoritativa |
| no se observa pantalla dedicada de planeación | el runtime no demuestra `VPROC-0033` completo | `OPS-PLAN-002..004` / `FOGO-UX-014` | plan revisable/publicable y cola derivada quedan representados |
| administración de recetas usa un ciclo simplificado | `VPROC-0016` aparece colapsado | `OPS-REC-001` / `FOGO-UX-009` / `FOGO-UX-015` | prueba, revisión, aprobación y publicación quedan diferenciadas en el prototipo |
| calidad/liberación no tiene superficie dedicada observada | riesgo de equiparar finalizar con liberar | `FOGO-UX-015` con `VPROC-0035` | prototipo contiene una decisión independiente de calidad |
| empaque aparece embebido en creación | riesgo de confundir producción con handoff de terminado | `FOGO-UX-013` / `FOGO-UX-015` | empaque y transferencia quedan separados de la creación del lote |
| merma/reproceso/cierre no tienen workflow dedicado observado | desviaciones pueden quedar solo como números | `FOGO-UX-010` / `FOGO-UX-011` / `FOGO-UX-015` | resultado, merma, reproceso y corrección quedan explícitos y no destructivos |
| trazabilidad existe como datos dispersos, no como investigación integral observada | genealogía puede quedar difícil de reconstruir | `FOGO-UX-015` con `VSCREEN-0173` | prototipo permite reconstruir receta, materiales, ejecución, calidad, empaque y destino |
| el runtime observado no expone una superficie dedicada de inocuidad | controles pueden quedar invisibles o mezclados | `FOGO-UX-015` con `VSCREEN-0174` | prototipo representa controles aplicables sin inventar owner de cumplimiento |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el ciclo productivo, recetas/versiones, planeación, ejecución, calidad, empaque, trazabilidad, autorización, integración y cobertura de rutas ya están representados por requisitos canónicos vigentes. Esta tarea reconcilia el AS-IS con procesos y pantallas existentes sin introducir una obligación empresarial nueva.

---

#### 27. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-FOGO-001` para el ciclo del lote desde inicio hasta finalización, cancelación o corrección;
- `TREQ-FOGO-002` para receta publicada, versión, snapshot, rendimiento y sensibilidad;
- `TREQ-FOGO-003` para planificación productiva, capacidad, prioridad, aprobación y revisión;
- `TREQ-FOGO-004` para ejecución, calidad, empaque, trazabilidad, reproceso y cierre;
- `TREQ-FOGO-005` a `TREQ-FOGO-024` para inventario, identidad, protección y vigencia de las rutas FOGO observadas;
- `TREQ-AUTH-001`, `TREQ-AUTH-004`, `TREQ-AUTH-013`, `TREQ-AUTH-014` y `TREQ-AUTH-015` para autorización canónica, equivalencia, enforcement server-side, frescura y evidencia;
- `TREQ-INTEGRATION-006`, `TREQ-INTEGRATION-008` y `TREQ-INTEGRATION-011` para fuentes de verdad y fronteras FOGO/NEXO;
- `TREQ-UX-001`, `TREQ-UX-004`, `TREQ-UX-005`, `TREQ-UX-006` y `TREQ-UX-014` como cobertura transversal de experiencia ya relacionada por los requisitos propietarios.

Estas referencias son trazabilidad existente y no modifican 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@3d8e0aec9368070bf4c95ea1161937a46c5a7ca1`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, owner FOGO-UX, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, seis procesos FOGO, quince pantallas canónicas, 9 páginas + 1 route handler AS-IS, acciones `saveRecipe`/`createBatch`, contratos E1/E2, OPS-REC/PRD/TRZ y cobertura 04A vigente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron lotes, recetas, planeación, parciales, finalizaciones, calidad, empaque, reproceso, desperdicio ni investigación reales. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-001` define un inventario documental `DEFINE_ONCE`; no crea instancia física propia. |

---

#### 29. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] se conservan exactamente seis procesos FOGO propietarios;
- [ ] se conservan exactamente quince pantallas canónicas FOGO;
- [ ] se conservan exactamente 9 páginas y 1 route handler del snapshot AS-IS inspeccionado;
- [ ] ruta existente no se trata como proceso completo por inferencia;
- [ ] etiqueta de estado no se trata como transición alcanzable por inferencia;
- [ ] `VPROC-0016` queda clasificado como parcialmente materializado y colapsado en el runtime observado;
- [ ] `VPROC-0033` no se declara materializado solo por existir una lista de lotes;
- [ ] `VPROC-0034` reconoce la mutación productiva real y a la vez la brecha del ciclo durante turno;
- [ ] `VPROC-0035` no se da por cumplido mediante un status de lote;
- [ ] `VPROC-0036` no se da por completo solo porque la creación capture empaques;
- [ ] `VPROC-0037` no se da por completo solo por mostrar rendimiento o diferencias;
- [ ] `draft/posted/completed/cancelled` permanecen como evidencia AS-IS, no como lifecycle canónico demostrado;
- [ ] las tres áreas productivas ordinarias quedan identificadas para `FOGO-UX-002`;
- [ ] `/recipe-book` queda separado de `/recipes*` como base para recetario operativo versus administración;
- [ ] la creación real de lote queda reconocida sin convertirla en prueba de parciales/finalización;
- [ ] calidad y liberación permanecen separadas de finalización productiva;
- [ ] empaque y producto terminado permanecen separados de disponibilidad física en NEXO;
- [ ] datos de merma o rendimiento no crean una decisión de reproceso por inferencia;
- [ ] cada pantalla canónica tiene clasificación AS-IS y propietario posterior;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] la UX no redefine permisos, scopes, roles ni autoridad;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 30. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- modifica físicamente `vento-shell`;
- crea páginas, layouts, componentes o Server Actions;
- crea procesos `VPROC-*` nuevos;
- crea pantallas `VSCREEN-*` nuevas;
- elimina rutas existentes;
- cambia estados empresariales;
- crea permisos, roles, grants o scopes;
- modifica matrices RBAC;
- cambia recetas reales;
- crea planes reales de producción;
- inicia o finaliza lotes reales;
- ejecuta consumos o movimientos de inventario;
- crea tablas, columnas, vistas, funciones, RPC, triggers, RLS o migraciones;
- modifica Supabase remoto;
- define la separación visual final de Cocina, Panadería y Repostería;
- diseña todavía inicio por área;
- diseña todavía producción parcial o finalización;
- diseña todavía las pantallas finales de calidad, empaque o supervisor;
- modifica el Registro 04A;
- desarrolla `FOGO-UX-002`.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-016 — Ejecutar pruebas integrales`

**TAREA ACTUAL APROBADA**
`FOGO-UX-001 — Inventariar procesos reales de producción`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-002 — Separar cocina, panadería y repostería`

### ✅ FOGO-UX-002 — Separar cocina, panadería y repostería

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-001 — Inventariar procesos reales de producción
**Tarea siguiente:** FOGO-UX-003 — Diseñar inicio por área productiva
**Tipo de tarea:** documental; contrato UX de partición operativa por área productiva para FOGO, reutilizando procesos, pantallas y permisos canónicos sin duplicarlos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, permisos, roles, dispositivos, datos, Supabase, migraciones, RLS, RPC ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo la experiencia operativa FOGO separa las tres áreas productivas ordinarias del Centro de Producción sin crear tres aplicaciones, tres familias de procesos, tres catálogos de pantallas ni tres vocabularios de permisos.

La separación se expresa mediante contexto y territorio efectivos:

```text
MISMO FOGO
+
MISMOS PROCESOS CANÓNICOS
+
MISMAS PANTALLAS CANÓNICAS
+
MISMOS PERMISOS CANÓNICOS
+
ÁREA PRODUCTIVA ACTIVA EXACTA
=
EXPERIENCIA OPERATIVA ACOTADA AL ÁREA
```

La tarea transforma el inventario recibido de `FOGO-UX-001` en un contrato UX reutilizable para las tareas `FOGO-UX-003..015`.

---

#### 2. Entrada aprobada de FOGO-UX-001

La tarea recibe como base inmediata el artefacto aprobado:

```text
FOGO-UX-001 — Inventariar procesos reales de producción
SHA-256 = 9ccaa6aece08fd93e5b9277dfe072a52904e449b19dbf548b040272b7f8d26ad
```

Ese inventario dejó fijados:

- seis procesos FOGO propietarios: `VPROC-0016`, `VPROC-0033`, `VPROC-0034`, `VPROC-0035`, `VPROC-0036` y `VPROC-0037`;
- quince pantallas canónicas FOGO: `VSCREEN-0055..VSCREEN-0067` y `VSCREEN-0173..VSCREEN-0174`;
- nueve páginas AS-IS y un route handler en `vento-fogo`;
- una mutación productiva real mediante `fogo_create_real_production_batch`;
- ausencia de un ciclo de lote completamente alcanzable durante el turno;
- tres áreas productivas ordinarias que esta tarea debe separar sin duplicar procesos canónicos.

Esta tarea no reabre ese inventario.

---

#### 3. Naturaleza y topología

La reconciliación vigente de `FOGO-UX-001..015` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `FOGO-UX-002` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se modifica `vento-fogo` desde este marcador;
4. no se implementan rutas, componentes, guards, Server Actions ni consultas;
5. el contrato será consumido posteriormente por E5 y por los propietarios físicos correspondientes;
6. la separación por área aquí definida no autoriza por sí sola ningún cambio de Supabase.

---

#### 4. Fuentes verificadas

La definición consume y conserva:

- `FOGO-UX-001` como inventario inmediato aprobado;
- `FOGO-AUTH-002 — Definir permisos por área productiva`;
- `FOGO-AUTH-003..008` como contratos territoriales y de supervisión ya aprobados;
- matrices `AUTH-RBAC-014`, `AUTH-RBAC-015` y `AUTH-RBAC-016`;
- contrato de dispositivos `AUTH-RBAC-023`;
- contratos de receta, producción y trazabilidad `OPS-REC-001`, `OPS-PRD-001` y `OPS-TRZ-001`;
- catálogo canónico de procesos y pantallas FOGO;
- runtime `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`;
- `vento-group-sas/vento-shell@5de1732334d77b55515e9a5c00ef0e4e005582e0` como estado remoto observado de las fuentes canónicas ya publicadas.

La base `FOGO-UX-001` se consume mediante el modo documental adelantado aprobado; su ausencia temporal del remoto no altera su contenido aprobado ni autoriza a incorporarla fuera del lifecycle documental.

---

#### 5. Las tres áreas productivas canónicas

La experiencia productiva ordinaria reconoce exactamente tres combinaciones operativas:

| Rol operativo efectivo | Sede requerida | Área activa exacta | Plantilla operativa |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | `production_kitchen` |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | `production_bakery` |
| `produccion_reposteria` | Centro de Producción | Repostería | `production_pastry` |

Reconciliación:

```text
PERFILES_ESPERADOS = 3
PERFILES_MATERIALIZADOS_EN_CONTRATO = 3
FALTANTES = 0
DUPLICADOS = 0
```

No se crea una cuarta área productiva FOGO para bodega, insumos, recepción, despacho, compras o administración de recetas.

---

#### 6. Decisión principal de separación

La experiencia se separa por **territorio operativo**, no por duplicación de funcionalidad.

```text
COCINA CALIENTE
GALLETERÍA Y PANADERÍA
REPOSTERÍA
```

consumen los mismos procesos canónicos cuando les resulten aplicables, pero cada ejecución conserva:

- actor efectivo;
- turno vigente;
- rol operativo efectivo;
- sede efectiva;
- área activa exacta;
- permiso exacto;
- recurso dentro del territorio autorizado;
- estado y restricciones aplicables.

Por tanto:

```text
MISMO PROCESO != MISMO TERRITORIO
MISMA PANTALLA != MISMO DATASET
MISMO PERMISO != MISMO RECURSO AUTORIZADO
MISMA SEDE != TODAS LAS ÁREAS
```

---

#### 7. Regla de no duplicación de procesos y pantallas

La separación no crea variantes como:

```text
VPROC-0034-COCINA
VPROC-0034-PANADERIA
VPROC-0034-REPOSTERIA
```

ni pantallas equivalentes duplicadas por área.

Los identificadores canónicos permanecen compartidos. Por ejemplo:

- `VSCREEN-0055` sigue siendo Inicio y cola de producción;
- `VSCREEN-0057` sigue siendo Preparación e inicio de lote;
- `VSCREEN-0058` sigue siendo Ejecución de lote;
- `VSCREEN-0059` sigue siendo Registro parcial de producción;
- `VSCREEN-0060` sigue siendo Finalización y cierre de lote;
- `VSCREEN-0061` sigue siendo Receta operativa;
- `VSCREEN-0065` sigue siendo Control de calidad y liberación;
- `VSCREEN-0066` sigue siendo Empaque, etiquetado y almacenamiento de terminado;
- `VSCREEN-0067` sigue siendo Reproceso, aprovechamiento, merma y cierre productivo.

Lo que cambia por área es el contexto efectivo y el conjunto de recursos visibles o accionables.

---

#### 8. Vocabulario de permisos compartido

Las tres áreas reutilizan el mismo vocabulario canónico FOGO aprobado:

| Permiso | Cocina Caliente | Galletería y Panadería | Repostería | Regla UX |
| --- | --- | --- | --- | --- |
| `fogo.access` | operativo | operativo | operativo | habilita entrada a FOGO; no define dataset interno |
| `fogo.production.batches.view` | operativo | operativo | operativo | muestra únicamente lotes del territorio efectivo |
| `fogo.production.batches.create` | operativo | operativo | operativo | permite intentar creación sobre un destino exacto autorizado |
| `fogo.production.orders.view` | operativo | operativo | operativo | muestra únicamente órdenes relacionadas con el área efectiva |
| `fogo.production.recipe_book.view` | operativo | operativo | operativo | muestra publicaciones aplicables al área y proceso efectivos |
| `fogo.production.recipes.view` | no operativo | no operativo | no operativo | permanece en carril administrativo |

La UX no crea permisos `*.kitchen`, `*.bakery` o `*.pastry`. El área forma parte del contexto y del territorio del recurso.

---

#### 9. Contexto UX efectivo

Toda superficie operativa FOGO debe consumir un contexto ya resuelto y no fabricarlo a partir de filtros visuales.

Para un productor ordinario, la experiencia se interpreta como:

```text
ACTOR EFECTIVO
+
TURNO PUBLICADO Y VIGENTE
+
ROL OPERATIVO PRODUCTIVO
+
CENTRO DE PRODUCCIÓN
+
ÁREA ACTIVA EXACTA
+
PERMISO Y RECURSO COMPATIBLES
=
CARRIL UX DEL ÁREA
```

El área activa:

- no se deduce del nombre del producto;
- no se deduce de la receta;
- no se deduce del dispositivo;
- no se deduce de una query string;
- no se deduce del último filtro usado;
- no se deduce de compartir sede;
- no puede ser reemplazada por una selección cliente-side.

---

#### 10. Encabezado contextual obligatorio de la experiencia

Las tareas posteriores podrán definir la composición visual exacta, pero toda superficie operativa resultante deberá mantener visible el contexto suficiente para que el actor pueda reconocer dónde está trabajando.

Como mínimo deberá ser distinguible:

- sede operativa;
- área productiva activa;
- actor o sesión efectiva cuando corresponda al patrón de dispositivo;
- estado de turno o bloqueo cuando sea material para la acción.

Esta obligación no prescribe un componente, layout, color, icono ni ubicación específica. `FOGO-UX-003` definirá el inicio por área y las tareas posteriores resolverán sus composiciones concretas.

---

#### 11. Matriz funcional común por área

La partición de experiencia se aplica de forma simétrica a las capacidades ordinarias:

| Capacidad UX | Cocina Caliente | Galletería y Panadería | Repostería | Regla común |
| --- | --- | --- | --- | --- |
| entrar a producción | contexto cocina | contexto panadería | contexto repostería | misma aplicación, distinta área efectiva |
| consultar órdenes | solo órdenes relacionadas | solo órdenes relacionadas | solo órdenes relacionadas | la relación empresarial precede al filtro visual |
| consultar cola | solo trabajo del área | solo trabajo del área | solo trabajo del área | no mezclar pendientes de otras áreas |
| consultar recetario operativo | publicaciones aplicables | publicaciones aplicables | publicaciones aplicables | misma receta puede aparecer en más de un área solo si su aplicabilidad lo permite |
| consultar lotes | lotes autorizados del área | lotes autorizados del área | lotes autorizados del área | misma sede no amplía territorio |
| iniciar lote | destino exacto cocina | destino exacto panadería | destino exacto repostería | un lote nace con un único contexto productivo efectivo |
| registrar avance | lote del área | lote del área | lote del área | la acción no puede saltar de área |
| finalizar | lote del área | lote del área | lote del área | conserva el área original de ejecución |
| consultar insumos relacionados | proyección mínima cocina | proyección mínima panadería | proyección mínima repostería | NEXO conserva verdad física y bodega no se vuelve cuarta área FOGO |

---

#### 12. Aislamiento entre áreas

La experiencia falla cerrada ante cruces territoriales.

Reglas obligatorias:

1. `produccion_cocina` no ve ni acciona recursos de Galletería y Panadería o Repostería por compartir Centro de Producción;
2. `produccion_panaderia` no ve ni acciona recursos de Cocina Caliente o Repostería;
3. `produccion_reposteria` no ve ni acciona recursos de Cocina Caliente o Galletería y Panadería;
4. una receta, producto, ingrediente o tipo de lote compartido no fusiona territorios;
5. un identificador conocido de otro recurso no habilita navegación directa;
6. un filtro enviado por URL no amplía el dataset autorizado;
7. una respuesta server-side no debe serializar filas de otra área para ocultarlas después en cliente;
8. una operación que mezcla recursos de áreas incompatibles se bloquea antes del efecto empresarial;
9. un cambio de turno o rotación de área obliga a recalcular el contexto;
10. una pantalla cacheada bajo el área anterior no conserva autoridad para la siguiente acción.

---

#### 13. Navegación ordinaria y cambio de área

Un productor ordinario no recibe un selector que convierta tres áreas en territorios intercambiables.

Para el carril operativo productivo:

```text
CAMBIAR FILTRO
!=
CAMBIAR ÁREA EFECTIVA
```

Si un trabajador rota legítimamente entre áreas, la transición requiere un nuevo contexto efectivo conforme al contrato laboral/operativo aplicable. La UX podrá reflejar el nuevo contexto después de resolverlo, pero no originarlo.

No se conserva una pestaña, cookie, query string o preferencia visual como autoridad para volver a un área anterior.

---

#### 14. Frontera de supervisión y administración

La separación ordinaria por área no limita ni redefine contratos administrativos o de supervisión ya aprobados.

En particular:

- `supervisor` y `gerencia_operativa` conservan sus carriles de autorización separados;
- una futura vista de supervisor puede presentar más de un área únicamente si el conjunto fue autorizado por su carril completo;
- esa experiencia pertenece a `FOGO-UX-014`;
- administración de recetas permanece separada del recetario operativo;
- `/recipes`, `/recipes/new` y `/recipes/[id]/edit` no se convierten en superficies ordinarias de producción por pertenecer a una sede o área;
- una lectura multiárea autorizada no concede mutaciones productivas multiárea.

Esta tarea no diseña la pantalla del supervisor.

---

#### 15. Recetario operativo por área

`fogo.production.recipe_book.view` se proyecta dentro del área efectiva.

Una publicación operativa puede mostrarse cuando:

- está publicada y vigente;
- aplica al producto o proceso correspondiente;
- aplica a la sede y área efectivas;
- el actor posee el carril operativo completo requerido;
- no existe una denegación o restricción superior.

Una misma versión publicada puede ser aplicable a más de un área sin duplicar la definición de receta. Cada aparición sigue siendo una proyección del mismo conocimiento publicado dentro de un contexto distinto.

La experiencia operativa no expone por esta tarea:

- borradores;
- edición de receta;
- aprobación o publicación;
- catálogo administrativo completo;
- fórmulas de otro territorio no requeridas para trabajar;
- permisos administrativos por inferencia.

---

#### 16. Cola y órdenes por área

La cola productiva y las órdenes visibles deben partir del conjunto server-side autorizado del área.

La partición se realiza por relaciones empresariales y contexto real, no por etiquetas visuales. Una orden puede aparecer en un área cuando su destino, asignación, participación o relación canónica la hacen ejecutable o consultable en ese territorio.

No se admite:

```text
DESCARGAR TODA LA SEDE
→ FILTRAR POR ÁREA EN EL NAVEGADOR
```

ni:

```text
USUARIO ELIGE ÁREA EN URL
→ SERVIDOR ACEPTA EL ÁREA COMO AUTORIDAD
```

`FOGO-UX-003` diseñará el inicio por área y `FOGO-UX-004` diseñará la producción pendiente del turno consumiendo esta frontera.

---

#### 17. Lote y ejecución conservan un área exacta

Toda ejecución productiva ordinaria queda vinculada a un único contexto territorial efectivo.

La experiencia no permite utilizar una misma mutación para mezclar:

- orden de Cocina con lote de Panadería;
- receta aplicable solo a Repostería con ejecución de Cocina;
- insumos o ubicación cuyo contrato territorial no sea compatible;
- lote existente de un área como base editable de otra.

Si una producción requiere coordinación entre áreas, cada hecho mantiene su proceso, lote, actor, territorio y handoff correspondiente. La coordinación no se modela como un lote sin área o multiárea por conveniencia de UI.

---

#### 18. Dispositivos compartidos

El contrato de dispositivo ya separa las tres estaciones objetivo:

| Plantilla | Rol operativo compatible | Territorio máximo |
| --- | --- | --- |
| `production_kitchen` | `produccion_cocina` | Centro de Producción + Cocina Caliente exacta |
| `production_bakery` | `produccion_panaderia` | Centro de Producción + Galletería y Panadería exacta |
| `production_pastry` | `produccion_reposteria` | Centro de Producción + Repostería exacta |

La plantilla legacy `production_center` no se utiliza como autoridad de UX objetivo.

El dispositivo:

- puede restringir aplicaciones o acciones;
- puede aportar un techo de contexto técnico;
- no concede rol;
- no concede permiso;
- no crea área efectiva;
- no sustituye turno ni check-in;
- no convierte `navigation_role` en autoridad;
- no permite consultar otra área por compartir la sede física.

---

#### 19. Insumos, NEXO y frontera de bodega

La experiencia de cada área puede consumir proyecciones NEXO necesarias para ejecutar producción, pero la separación de FOGO no crea una zona productiva adicional denominada Insumos.

Reglas:

- FOGO conserva receta, plan, orden, lote, ejecución, rendimiento y calidad;
- NEXO conserva producto maestro, stock, ubicación, LPN, reserva, retiro, consumo y movimiento físico conforme a sus contratos;
- la proyección visible a Cocina se limita al trabajo de Cocina;
- la proyección visible a Panadería se limita al trabajo de Panadería;
- la proyección visible a Repostería se limita al trabajo de Repostería;
- `bodeguero` y bodega mantienen autoridad separada;
- visualizar stock relacionado no concede ajustes, entradas, traslados, conteos, remisiones ni administración de inventario.

---

#### 20. Contraste AS-IS del recetario

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `src/app/recipe-book/page.tsx` ya conserva `site_id`, `area_id` y relación con `areas`, pero el recorrido operativo observado no demuestra todavía la separación objetivo.

Se observó:

- `production.recipe_book.view` se comprueba con `siteId`, pero la llamada observada deja `areaId` sin resolver;
- para actores no clasificados por la heurística local de management, `selectedAreaId` queda vacío;
- la presentación puede mostrar el contexto como `Toda la sede`;
- el filtro de área se comporta como facilidad de management, no como proyección del área operativa efectiva;
- la habilitación visual de creación desde el recetario también consulta `production.batches.create` con `areaId` sin resolver en esa comprobación previa.

Clasificación:

```text
AS-IS = SOPORTE PARCIAL DE ÁREA
OBJETIVO = CONTEXTO OPERATIVO DE ÁREA AUTORITATIVO Y SERVER-SIDE
```

Esta brecha pertenece a adopción/implementación posterior. No se corrige físicamente en `FOGO-UX-002`.

---

#### 21. Contraste AS-IS de lotes y creación

En la vista `src/app/production-batches/page.tsx` observada:

- el parámetro de filtro disponible es `site_id`;
- la consulta principal selecciona `site_id`;
- el filtrado explícito observado se realiza por sede;
- no se demuestra una partición UX ordinaria por `area_id` en la lista.

En `src/app/production-batches/new/page.tsx`, en cambio, existe una primitiva positiva que debe conservarse:

- la receta seleccionada debe tener `site_id` y `area_id`;
- la receta debe estar publicada;
- `production.batches.create` se revalida con `siteId: recipe.site_id` y `areaId: recipe.area_id` antes de presentar la creación como permitida.

Esto demuestra que la creación conoce un área exacta, pero no demuestra que toda la navegación, cola, lista y recetario ya estén separados de forma coherente.

---

#### 22. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El recetario operativo observado resuelve permiso principalmente a nivel de sede y deja `areaId` sin resolver en comprobaciones relevantes. | Puede mezclar experiencia visual de varias áreas aunque la mutación final revalide después. | `FOGO-UX-003`, `FOGO-UX-008`, adopción física propietaria | El dataset operativo se resuelve server-side con el área efectiva antes de serializar y la UI muestra solo el conjunto autorizado. |
| La lista de lotes observada filtra explícitamente por sede y no demuestra partición por área. | Una cola/lista de sede no satisface aislamiento UX ordinario entre los tres roles productivos. | `FOGO-UX-004`, materialización propietaria | La producción pendiente y los lotes visibles se derivan del área efectiva y conservan pruebas cruzadas de deny. |
| La creación de lote sí comprueba `recipe.area_id` en la superficie observada. | Es una primitiva reutilizable, pero no cierra por sí sola todo el flujo. | `FOGO-UX-005` y materialización propietaria | El inicio de lote conserva esa revalidación y la integra con orden, actor, turno, estado e idempotencia. |
| `production_center` legacy no distingue los tres territorios. | Puede inducir una experiencia genérica de sede incompatible con el contrato actual. | adopción de dispositivo propietaria | Las instancias productivas usan `production_kitchen`, `production_bakery` o `production_pastry` según el área exacta. |
| Administración de recetas y recetario operativo existen en superficies distintas, pero la separación de área no debe fusionarlas. | Riesgo de conceder administración por pertenecer al área. | `FOGO-UX-009` | La experiencia separa claramente consulta operativa de administración y conserva permisos distintos. |

No queda un hallazgo narrativo sin propietario ni condición de salida.

---

#### 23. Handoff inmediato a FOGO-UX-003

`FOGO-UX-003 — Diseñar inicio por área productiva` recibe este contrato cerrado:

```text
3 ÁREAS PRODUCTIVAS EXACTAS
3 ROLES OPERATIVOS EXACTOS
3 PLANTILLAS DE DISPOSITIVO ESPECIALIZADAS
1 CATÁLOGO COMPARTIDO DE PROCESOS
1 CATÁLOGO COMPARTIDO DE PANTALLAS
1 VOCABULARIO COMPARTIDO DE PERMISOS
AISLAMIENTO SERVER-SIDE POR ÁREA
SIN SELECTOR QUE CONCEDA TERRITORIO
```

Su responsabilidad será diseñar cómo entra el productor a su experiencia de área ya autorizada, no volver a definir las áreas ni los permisos.

---

#### 24. Handoff al resto de FOGO-UX

| Tarea | Entrada exacta proveniente de esta separación |
| --- | --- |
| `FOGO-UX-003` | inicio dentro de un área efectiva ya resuelta; no selector de autoridad |
| `FOGO-UX-004` | producción pendiente del turno limitada al área efectiva |
| `FOGO-UX-005` | inicio de lote con orden, receta y área compatibles |
| `FOGO-UX-006` | parciales sobre un lote que conserva el área de ejecución |
| `FOGO-UX-007` | finalización dentro del mismo territorio y sin salto de área |
| `FOGO-UX-008` | receta resumida publicada y aplicable al área activa |
| `FOGO-UX-009` | separación entre recetario operativo y administración de recetas |
| `FOGO-UX-010` | cantidades, desperdicio y resultado ligados al lote y área correctos |
| `FOGO-UX-011` | correcciones compensatorias sin mover retrospectivamente el lote a otra área |
| `FOGO-UX-012` | consumo NEXO relacionado con el área y lote autorizados |
| `FOGO-UX-013` | producto terminado entregado a NEXO sin perder el área de origen productivo |
| `FOGO-UX-014` | experiencia de supervisor que puede agregar áreas solo por autorización propia |
| `FOGO-UX-015` | validación del prototipo contra los tres contextos y denegaciones cruzadas |

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: aislamiento por sede/área, separación de carriles, autorización contextual, planificación productiva, lote, receta, calidad y experiencia ya cuentan con obligaciones verificables registradas. Esta tarea especializa la composición UX de esas obligaciones para las tres áreas productivas sin introducir una obligación observable nueva ni cambiar el registro.

---

#### 26. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-AUTH-004` para equivalencia de decisiones por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para separación entre carril base y operativo y sus prerrequisitos;
- `TREQ-AUTH-009` para resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-010` para segregación de funciones entre producción e inventario/logística/administración;
- `TREQ-AUTH-014` para frescura del contexto antes de efectos sensibles;
- `TREQ-AUTH-015` para trazabilidad de decisiones;
- `TREQ-FOGO-001` para el ciclo del lote y sus hechos auditables;
- `TREQ-FOGO-002` para receta publicada, versión, aplicabilidad y ejecución reproducible;
- `TREQ-FOGO-003` para planificación productiva con sede, área, prioridad, capacidad y restricciones;
- `TREQ-FOGO-004` para ejecución, calidad, empaque, reproceso y cierre productivo;
- `TREQ-FOGO-023` para impedir que abrir la superficie de creación autorice por sí solo crear un lote.

La enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@5de1732334d77b55515e9a5c00ef0e4e005582e0`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, matrices de los tres roles productivos, permisos por área, plantillas de dispositivo y el AS-IS de recetario, lista y creación de lotes. La entrada inmediata `FOGO-UX-001` se consume desde su artefacto aprobado SHA-256 `9ccaa6aece08fd93e5b9277dfe072a52904e449b19dbf548b040272b7f8d26ad` conforme al modo de trabajo adelantado. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos reales, cambios de área, recetas, órdenes, lotes, dispositivos ni pruebas cruzadas de Cocina/Panadería/Repostería. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-002` no crea instancia física propia ni autoriza materialización. |

---

#### 28. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] existen exactamente tres áreas productivas ordinarias objetivo;
- [ ] `produccion_cocina` corresponde a Cocina Caliente;
- [ ] `produccion_panaderia` corresponde a Galletería y Panadería;
- [ ] `produccion_reposteria` corresponde a Repostería;
- [ ] `production_kitchen`, `production_bakery` y `production_pastry` conservan sus territorios exactos;
- [ ] la plantilla legacy `production_center` no se usa como autoridad de la experiencia objetivo;
- [ ] no se duplican procesos `VPROC-*` por área;
- [ ] no se duplican pantallas `VSCREEN-*` por área;
- [ ] no se crean permisos específicos por nombre de área;
- [ ] las tres áreas reutilizan el mismo vocabulario canónico FOGO bajo contextos diferentes;
- [ ] `fogo.production.recipes.view` permanece fuera del carril productivo ordinario;
- [ ] recetario operativo y administración de recetas permanecen separados;
- [ ] un productor ordinario no obtiene selector de área que amplíe territorio;
- [ ] cambiar un filtro no equivale a cambiar el área efectiva;
- [ ] una rotación legítima exige recalcular el contexto;
- [ ] una misma sede no une las tres áreas;
- [ ] producto, receta o tipo de lote compartidos no fusionan territorios;
- [ ] cola, órdenes, recetario y lotes parten de conjuntos server-side autorizados;
- [ ] la UI no recibe filas no autorizadas para ocultarlas después;
- [ ] un lote conserva un área de ejecución exacta;
- [ ] el AS-IS del recetario queda clasificado como soporte parcial de área;
- [ ] el AS-IS de la lista de lotes no se trata como separación completa por área;
- [ ] la comprobación exacta de área de la receta en creación de lote se conserva como primitiva positiva;
- [ ] bodega e insumos no se convierten en una cuarta área FOGO;
- [ ] la supervisión multiárea permanece reservada a su carril y a `FOGO-UX-014`;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `FOGO-UX-003` recibe una frontera suficiente para diseñar el inicio por área sin reabrir esta decisión;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 29. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- modifica físicamente `vento-shell` fuera del reemplazo documental del marcador;
- crea rutas, layouts, tabs, componentes o botones;
- prescribe colores, iconos, disposición visual o responsive final;
- crea procesos `VPROC-*`;
- crea pantallas `VSCREEN-*`;
- crea permisos nuevos;
- crea roles nuevos;
- cambia matrices RBAC;
- modifica plantillas de dispositivo;
- concede multiárea a productores ordinarios;
- diseña la pantalla final de supervisor;
- implementa filtros server-side;
- modifica recetas, órdenes, lotes, stock o ubicaciones;
- crea o modifica tablas, columnas, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase remoto;
- implementa el ciclo de lote;
- desarrolla el inicio por área de `FOGO-UX-003`;
- desarrolla la cola de `FOGO-UX-004`;
- modifica el Registro 04A;
- desarrolla `FOGO-UX-003`.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-001 — Inventariar procesos reales de producción`

**TAREA ACTUAL APROBADA**
`FOGO-UX-002 — Separar cocina, panadería y repostería`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-003 — Diseñar inicio por área productiva`

### ✅ FOGO-UX-003 — Diseñar inicio por área productiva

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-002 — Separar cocina, panadería y repostería
**Tarea siguiente:** FOGO-UX-004 — Mostrar producción pendiente del turno
**Tipo de tarea:** diseño documental integral de la experiencia de inicio productivo contextual por área efectiva, con separación entre entrada operativa, planificación, cola, ejecución y supervisión
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, componentes, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para la entrada de un trabajador a FOGO cuando su contexto productivo ya fue resuelto y autorizado, de forma que la primera superficie operativa:

- identifique con claridad la sede y el área efectiva;
- muestre la siguiente acción útil sin convertir la interfaz en fuente de autoridad;
- conduzca a la producción pendiente del turno sin fabricar trabajo ejecutable desde señales brutas;
- separe el inicio operativo de la planeación, del inicio de lote, del recetario administrativo y de la supervisión;
- falle de forma cerrada cuando el contexto sea ausente, inválido, vencido, denegado o no verificable;
- minimice la exposición de información de otras áreas y de datos no necesarios para comenzar la jornada.

La tarea define la identidad y composición de `VSCREEN-0055 — Inicio y cola de producción` como superficie inicial del contexto productivo autorizado. No desarrolla todavía el contenido exhaustivo de la cola, el inicio de lote ni la pantalla de supervisor.

---

#### 2. Entrada aprobada de FOGO-UX-002

`FOGO-UX-002` entrega una separación ya cerrada:

| Rol operativo efectivo | Sede | Área exacta | Plantilla de dispositivo especializada |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | `production_kitchen` |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | `production_bakery` |
| `produccion_reposteria` | Centro de Producción | Repostería | `production_pastry` |

La entrada contractual recibida es:

```text
3 ÁREAS PRODUCTIVAS EXACTAS
3 ROLES OPERATIVOS EXACTOS
3 PLANTILLAS DE DISPOSITIVO ESPECIALIZADAS
1 CATÁLOGO COMPARTIDO DE PROCESOS
1 CATÁLOGO COMPARTIDO DE PANTALLAS
1 VOCABULARIO COMPARTIDO DE PERMISOS
AISLAMIENTO SERVER-SIDE POR ÁREA
SIN SELECTOR QUE CONCEDA TERRITORIO
```

Por tanto, esta tarea no vuelve a decidir el área del trabajador. Diseña el inicio **dentro de un área efectiva ya resuelta**.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato de experiencia se define una sola vez;
2. no existe una instancia física propia de `FOGO-UX-003`;
3. esta tarea no implementa una ruta, componente o consulta;
4. la materialización posterior pertenece al paquete E5 y a los propietarios técnicos aplicables;
5. la ausencia de una implementación AS-IS equivalente no reduce ni altera el contrato objetivo.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-001 — Inventariar procesos reales de producción`;
- `FOGO-UX-002 — Separar cocina, panadería y repostería`;
- `FOGO-AUTH-002 — Definir permisos por área productiva`;
- `FOGO-AUTH-003 — Filtrar cola por sede y área`;
- `FOGO-AUTH-008 — Definir permisos de supervisor`;
- `FOGO-AUTH-014 — Registrar actor y turno`;
- catálogo canónico de procesos `VPROC-*`;
- catálogo canónico de pantallas `VSCREEN-*`;
- contrato de estados de `VPROC-0033` y `VPROC-0034`;
- contratos de estaciones compartidas y dispositivos de producción;
- hallazgos de planificación productiva del BLOQUE E1;
- registro 04A vigente del dominio FOGO;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

---

#### 5. Identidad canónica del inicio

La superficie inicial se identifica por contrato, no por una URL física concreta:

| Identidad | Nombre | Proceso | Paso | Clase de interacción | Momento |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0055` | Inicio y cola de producción | `VPROC-0033` | `VPROC-0033::STEP-TRIAGE_PRODUCTION_QUEUE` — Priorizar cola de producción | `TRIAGE` | `INITIAL` |

La pantalla relacionada de planeación permanece separada:

| Identidad | Nombre | Proceso | Paso | Clase de interacción | Momento |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0056` | Planeación de producción | `VPROC-0033` | `VPROC-0033::STEP-PLAN_PRODUCTION` — Planear producción | `PLAN` | `IN_PROGRESS` |

Y el inicio físico de un lote pertenece a otra pantalla y otra tarea:

| Identidad | Nombre | Proceso | Paso | Propietario documental inmediato |
| --- | --- | --- | --- | --- |
| `VSCREEN-0057` | Preparación e inicio de lote | `VPROC-0034` | `VPROC-0034::STEP-PREPARE_AND_START_BATCH` | `FOGO-UX-005` |

Regla:

```text
VSCREEN-0055 INICIO DEL ÁREA
!=
VSCREEN-0056 PLANEACIÓN
!=
VSCREEN-0057 INICIO DE LOTE
```

Esta tarea no congela la URL física futura de `VSCREEN-0055`. La ruta raíz `/` se usa únicamente como evidencia AS-IS de la aplicación actual.

---

#### 6. Decisión principal

Al entrar a FOGO como productor ordinario, la experiencia debe resolver primero un **contexto operativo efectivo** y luego presentar un único inicio contextual para esa área.

```text
ACTOR HUMANO EFECTIVO
+
TURNO PUBLICADO Y VIGENTE
+
ROL OPERATIVO PRODUCTIVO
+
SEDE ACTIVA COMPATIBLE
+
ÁREA ACTIVA EXACTA
+
PERMISOS APLICABLES
+
FRESCURA DEL CONTEXTO
=
INICIO FOGO DEL ÁREA AUTORIZADA
```

La pantalla no solicita al productor que elija qué autoridad desea usar. Cuando existe un único contexto productivo válido, ese contexto gobierna la superficie. Si el contexto no puede resolverse de forma determinista, la experiencia queda bloqueada o deriva al flujo propietario de resolución de contexto; nunca presenta una selección que amplíe territorio.

---

#### 7. Fuente canónica del trabajo visible

`FOGO-UX-003` cierra la frontera de experiencia frente al hallazgo de que todavía no existe una única fuente física comprobada para plan y programación.

La experiencia objetivo de `VSCREEN-0055` tratará a FOGO como la proyección propietaria de planificación y ejecución productiva. El inicio operativo no construye trabajo ejecutable leyendo independientemente ventas, pedidos, remisiones, mínimos, stock, recomendaciones o señales externas.

Para un productor ordinario, un elemento puede aparecer como **trabajo ejecutable** únicamente cuando FOGO pueda demostrar una cadena suficiente, como mínimo:

```text
SEÑAL O NECESIDAD NORMALIZADA
→ PLAN FOGO APROBADO / PUBLICADO SEGÚN CONTRATO
→ VERSIÓN LIBERADA PARA EJECUCIÓN
→ ORDEN O COMPROMISO PRODUCTIVO EJECUTABLE
→ ÁREA EFECTIVA COMPATIBLE
```

La verdad terminal de planificación que habilita el handoff a ejecución es:

`VPROC-0033.PRODUCTION_PLAN_RELEASED`.

La entrada inicial del proceso de ejecución es:

`VPROC-0034.PRODUCTION_ORDER_READY`.

La experiencia puede informar que existen señales o planificación en curso cuando el actor tenga autoridad para ello, pero no las presenta al productor como una orden lista para ejecutar.

---

#### 8. Frontera entre señal, plan, orden y lote

El inicio conserva identidades distintas:

| Concepto | Puede aparecer en el inicio | Puede presentarse como ejecutable | Regla |
| --- | --- | --- | --- |
| señal de demanda | solo como estado agregado autorizado | no | inicia evaluación, no producción |
| plan en borrador/revisión | solo a actor de planificación autorizado | no | no crea órdenes ni compromisos ejecutables |
| plan publicado | según autoridad de planificación | no necesariamente | publicación no demuestra todavía ejecución iniciada |
| plan liberado | sí, cuando tenga salida ejecutable para el área | sí, mediante su orden/compromiso derivado | conserva versión y restricciones |
| orden productiva lista | sí | sí | debe pertenecer al área efectiva |
| lote activo | sí, si el actor puede continuar o consultar | no crea otro lote | se presenta como continuidad, no como nueva orden |
| lote cerrado/histórico | no como prioridad ordinaria del inicio | no | queda en consulta/historia propietaria |

Queda prohibido:

```text
VENTA = ORDEN DE PRODUCCIÓN
REMISIÓN = ORDEN DE PRODUCCIÓN
STOCK BAJO = ORDEN DE PRODUCCIÓN
RECOMENDACIÓN = ORDEN DE PRODUCCIÓN
PLAN EN BORRADOR = TRABAJO EJECUTABLE
PLAN PUBLICADO = LOTE YA INICIADO
```

---

#### 9. Contexto efectivo al entrar

El inicio consume un contexto server-side con, como mínimo, las siguientes decisiones resueltas o denegadas:

| Dimensión | Tratamiento en la experiencia |
| --- | --- |
| actor efectivo | visible de forma suficiente para atribución; nunca sustituido por usuario técnico del dispositivo |
| turno | vigente para el rol operativo aplicado |
| sede | Centro de Producción para los tres perfiles definidos en `FOGO-UX-002` |
| área | exactamente Cocina Caliente, Galletería y Panadería o Repostería según contexto efectivo |
| rol operativo | uno de los tres roles productivos cuando el inicio sea productor ordinario |
| dispositivo | restricción adicional; nunca fuente de autoridad |
| permisos | evaluados por acción o lectura; `fogo.access` no funciona como wildcard |
| frescura | la pantalla no reutiliza silenciosamente un contexto vencido después de cambio de actor, turno, sede o área |

La interfaz muestra la identidad del área como **contexto vigente**, no como selector de permisos.

---

#### 10. Estados de entrada de la experiencia

La experiencia debe distinguir al menos estos estados semánticos:

| Estado UX | Qué significa | Acción permitida |
| --- | --- | --- |
| `CONTEXTO_VALIDO_CON_TRABAJO` | actor y área válidos; existen elementos autorizados | entrar a la cola contextual y continuar |
| `CONTEXTO_VALIDO_SIN_TRABAJO` | actor y área válidos; no existe trabajo ejecutable visible | mostrar estado vacío real; no sugerir otra área |
| `SIN_CONTEXTO_OPERATIVO` | no existe turno/área productiva resoluble | bloquear superficie productiva y dirigir a resolución propietaria |
| `CONTEXTO_CAMBIO_O_VENCIDO` | la sesión ya no coincide con actor, turno, sede o área actuales | revalidar antes de mostrar datos o acciones |
| `SIN_PERMISO` | el contexto existe pero no autoriza la superficie/acción | denegar sin exponer datos protegidos |
| `DATOS_DESACTUALIZADOS` | no puede demostrarse frescura suficiente | no declarar cola actual como vigente |
| `FALLO_TECNICO` | la fuente requerida no pudo resolverse | mostrar fallo recuperable sin convertirlo en lista vacía |

Reglas de no equivalencia:

```text
SIN TRABAJO != SIN PERMISO
SIN PERMISO != SIN CONTEXTO
SIN CONTEXTO != FALLO TÉCNICO
DATOS DESACTUALIZADOS != COLA VACÍA
```

---

#### 11. Cabecera contextual mínima

`VSCREEN-0055` debe mantener visible, sin exigir navegación secundaria:

- nombre de FOGO o identidad equivalente de la superficie;
- área productiva efectiva;
- sede efectiva cuando sea útil para evitar ambigüedad;
- estado del contexto/turno cuando afecte la posibilidad de operar;
- actor efectivo de forma suficiente en estaciones compartidas;
- indicación clara cuando la información no esté actualizada;
- siguiente acción operativa principal.

No necesita mostrar en la cabecera:

- UUID técnicos;
- scopes internos;
- nombres de políticas de autorización;
- detalles de RLS;
- hashes, logs o razón técnica completa;
- catálogo completo de permisos.

La explicación técnica solo aparece en una superficie de soporte o diagnóstico autorizada.

---

#### 12. Composición general del inicio

La superficie se compone por prioridad operativa, no por módulos administrativos.

| Zona lógica | Contenido | Acción primaria | Propietario detallado |
| --- | --- | --- | --- |
| contexto | área, actor/turno aplicable y frescura | resolver/revalidar si existe bloqueo | contratos transversales + `FOGO-UX-003` |
| trabajo ahora | resumen de producción pendiente autorizada | abrir cola contextual | `FOGO-UX-004` |
| continuidad | lote o ejecución activa recuperable | continuar el trabajo válido | `FOGO-UX-005` a `FOGO-UX-007` |
| recetario operativo | acceso a receta publicada aplicable | abrir receta operativa | `FOGO-UX-008` |
| planificación | acceso solo para actor con autoridad separada | abrir `VSCREEN-0056` | planificación + `FOGO-UX-014` cuando corresponda |
| incidencias/bloqueos | razón operativa resumida y siguiente paso permitido | resolver por flujo propietario | tarea propietaria de la excepción |

La superficie no se convierte en dashboard exhaustivo de producción, inventario, compras, calidad, costos o administración.

---

#### 13. Producción pendiente en el inicio

El inicio reserva un espacio prioritario para la producción pendiente del área, pero `FOGO-UX-003` define solo su contrato de entrada.

Debe poder comunicar como mínimo:

- si existe o no trabajo ejecutable para el área;
- cantidad agregada de elementos pendientes cuando sea fiable;
- existencia de prioridad o bloqueo relevante sin inventar su regla;
- acceso directo a la cola contextual.

No define todavía:

- las columnas o tarjetas de cada elemento;
- el algoritmo de ordenamiento;
- la semántica completa de prioridad;
- el tratamiento de urgencias y overrides;
- la composición de señales de capacidad, personal, equipos o materiales.

Esas decisiones pertenecen a `FOGO-UX-004` y `FOGO-UX-014` según el actor.

---

#### 14. Continuidad de una ejecución ya iniciada

Cuando exista un lote o ejecución activa que el actor esté autorizado a continuar, el inicio puede elevar una acción de continuidad por encima de crear otra ejecución.

La superficie deberá distinguir:

```text
CONTINUAR LOTE EXISTENTE
!=
INICIAR LOTE NUEVO
```

El inicio no decide por sí mismo que el actor puede continuar. La acción se presenta solo después de validar el recurso y el estado aplicables.

Los detalles del flujo pertenecen a:

- `FOGO-UX-005` — inicio de lote;
- `FOGO-UX-006` — producción parcial;
- `FOGO-UX-007` — finalización;
- `FOGO-UX-011` — correcciones posteriores sin alterar historia.

---

#### 15. Acceso al recetario operativo

El inicio puede ofrecer acceso al recetario operativo cuando exista `fogo.production.recipe_book.view` efectivo y aplicable.

Reglas:

1. el acceso no expone el maestro administrativo completo;
2. no muestra borradores ni versiones no aplicables al productor ordinario;
3. el área efectiva no se cambia mediante el recetario;
4. abrir el recetario no equivale a poder crear lote;
5. una receta aplicable puede conducir posteriormente a una acción de producción únicamente si la mutación vuelve a validar área, permiso, recurso y estado.

El diseño detallado del recetario corresponde a `FOGO-UX-008` y su separación administrativa a `FOGO-UX-009`.

---

#### 16. Acceso a planeación

`VSCREEN-0056 — Planeación de producción` no forma parte de la autoridad ordinaria implícita de los tres roles productivos por el solo hecho de poder entrar a FOGO.

El inicio puede mostrar una entrada a planeación únicamente cuando el actor tenga autoridad exacta proveniente de su contrato propietario.

No se admite:

```text
produccion_cocina → puede planear por defecto
produccion_panaderia → puede planear por defecto
produccion_reposteria → puede planear por defecto
fogo.access → puede planear
ver cola → puede publicar plan
usar terminal de producción → puede aprobar plan
```

La ausencia de una clave de mutación específica demostrada por esta tarea se interpreta de forma cerrada: `FOGO-UX-003` no inventa un permiso de planeación, aprobación, publicación o override.

---

#### 17. Frontera con supervisión y administración

El inicio del productor ordinario no absorbe las superficies de supervisión o administración.

| Capacidad | Productor ordinario | Propietario |
| --- | --- | --- |
| ver trabajo autorizado de su área | sí | `FOGO-UX-003/004` |
| continuar ejecución propia/autorizada | según recurso y permiso | `FOGO-UX-005..007` |
| consultar recetario operativo aplicable | según permiso | `FOGO-UX-008` |
| editar o administrar receta maestra | no por rol productivo | `FOGO-UX-009` |
| observar varias áreas | no por rol productivo | `FOGO-UX-014` + autorización aplicable |
| aprobar/publicar plan | no se infiere | contrato de planeación/autoridad propietario |
| cambiar prioridad/override | no se infiere | `FOGO-UX-014` + autorización propietaria |

El hecho de que una persona posea además un rol administrativo o de supervisión no mezcla ambos carriles. Cada acción se resuelve con su autoridad propia.

---

#### 18. Variantes por área

La composición es la misma para las tres áreas. Cambian únicamente el contexto y los recursos visibles.

| Área | Inicio esperado | No debe aparecer por pertenecer a la sede |
| --- | --- | --- |
| Cocina Caliente | cola, continuidad y recetario de Cocina Caliente | órdenes, recetas o lotes exclusivos de Panadería/Repostería |
| Galletería y Panadería | cola, continuidad y recetario de Galletería y Panadería | órdenes, recetas o lotes exclusivos de Cocina/Repostería |
| Repostería | cola, continuidad y recetario de Repostería | órdenes, recetas o lotes exclusivos de Cocina/Panadería |

No se crean tres catálogos de pantallas ni tres variantes del proceso `VPROC-0033`.

---

#### 19. Dispositivos compartidos

Las plantillas especializadas entregadas por `FOGO-UX-002` restringen la experiencia:

```text
production_kitchen  → Cocina Caliente
production_bakery   → Galletería y Panadería
production_pastry   → Repostería
```

El inicio debe:

- identificar al actor humano efectivo;
- limpiar contexto al cambiar actor;
- volver a resolver turno y área;
- aplicar el techo del dispositivo;
- bloquear una discrepancia entre área del actor, área del dispositivo y recurso cuando el contrato lo exija;
- evitar mostrar como trabajo vigente datos cacheados de otro actor.

El dispositivo no selecciona rol ni concede permisos.

---

#### 20. Parámetros, filtros y navegación

Los parámetros de URL o filtros de interfaz pueden conservar comodidad y estado visual, pero solo reducen un conjunto ya autorizado.

Por tanto:

```text
?area_id=OTRA_AREA
?site_id=OTRA_SEDE
?role=OTRO_ROL
```

no cambian el contexto efectivo.

Un enlace profundo hacia cola, recetario, planeación o lote debe revalidar el contexto y recurso en servidor. La navegación no constituye evidencia de autorización.

---

#### 21. Minimización de datos en el inicio

La superficie inicial no necesita cargar por defecto:

- fórmulas completas de recetas;
- costos unitarios o totales de producción;
- ledger completo de inventario;
- stock general de la sede;
- órdenes de otras áreas;
- lotes históricos de otras áreas;
- información de compras o proveedores;
- datos de personal no necesarios para el contexto;
- detalles completos de calidad o trazabilidad de lotes no activos.

Debe preferir resúmenes mínimos y referencias que conduzcan a la superficie propietaria cuando el actor esté autorizado.

---

#### 22. Vacío, carga, error, stale y operación degradada

La experiencia no puede representar todos los problemas como una pantalla vacía.

| Situación | Tratamiento UX |
| --- | --- |
| consulta en curso | estado de carga sin confirmar que no existe trabajo |
| cero trabajo autorizado | estado vacío explícito del área efectiva |
| permiso denegado | estado de denegación; sin datos protegidos |
| contexto no resuelto | estado de contexto; sin cola |
| datos stale | advertencia y revalidación antes de acciones sensibles |
| error de fuente | error recuperable; no equivale a cero pendientes |
| conectividad degradada | mostrar antigüedad y limitar acciones según contrato de continuidad |

Ninguna caché antigua habilita iniciar una producción sensible cuando el estado requerido no puede revalidarse.

---

#### 23. Tactilidad, legibilidad y foco operativo

El inicio se diseña para estaciones productivas compartidas y uso táctil.

Debe priorizar:

- una acción principal evidente;
- blancos táctiles suficientes;
- área y contexto visibles;
- texto operacional breve;
- estados diferenciables sin depender solo del color;
- foco y navegación accesibles;
- progresividad: detalle técnico bajo demanda, no en la vista primaria;
- ausencia de tablas administrativas densas como interfaz inicial del productor.

Esta tarea no fija tamaños físicos, hardware final, breakpoints o tokens visuales específicos.

---

#### 24. Contraste con el AS-IS observado

El runtime actual demuestra una aplicación funcional parcial, pero no materializa todavía el inicio contractual definido aquí.

| Superficie AS-IS | Evidencia observada | Brecha frente al inicio objetivo |
| --- | --- | --- |
| `/` | entrada genérica FOGO con enlaces a Recetario y Lotes | no muestra actor/turno/área efectiva, cola priorizada, continuidad ni estados contextuales |
| `/recipe-book` | puede filtrar por sede y área; para productores la comprobación observada utiliza sede con `areaId` no resuelta | no demuestra aislamiento completo del inicio por área |
| `/production-batches` | lista lotes con filtro opcional de sede | no demuestra cola contextual por área ni fuente de plan/orden |
| `/production-batches/new` | receta publicada con sede/área y validación de creación contra ambos valores antes de mostrar creación | primitiva útil de revalidación exacta; pertenece al flujo posterior de lote |

El AS-IS no se eleva a contrato solo porque exista una ruta o enlace.

---

#### 25. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| La raíz FOGO es genérica y no materializa `VSCREEN-0055` como inicio contextual. | bloquea conformidad UX, no esta definición documental | materialización E5 FOGO consumiendo `FOGO-UX-003` | la entrada FOGO resuelve contexto efectivo y presenta el inicio del área sin autoridad fabricada |
| No existe una única fuente física comprobada para plan y programación. | riesgo de mostrar señales como trabajo ejecutable | `FOGO-UX-003`, `FOGO-UX-004`, `FOGO-UX-014`, `PROC-CAT-009..018` y materialización aplicable | la UX consume una proyección FOGO que distingue señal, plan, versión liberada y orden ejecutable |
| `/production-batches` no demuestra filtrado por área. | puede mezclar evidencia de lotes de la misma sede | `FOGO-UX-004` + autorización/materialización aplicable | la cola y consultas de trabajo se resuelven server-side por área efectiva antes de serializar |
| El recetario AS-IS puede evaluar permiso sin `areaId` efectiva para la consulta observada. | puede presentar recetas con alcance mayor al área operativa | `FOGO-UX-008`, `FOGO-AUTH-015` y materialización aplicable | recetario operativo consume contexto/área efectivos y solo devuelve publicaciones aplicables |
| El inicio AS-IS no distingue vacío, falta de contexto, deny, stale y fallo técnico. | operador puede interpretar un fallo como ausencia de trabajo | `FOGO-UX-003` + sistema de mensajes/estados aplicable | los estados quedan diferenciados y ninguna condición incierta concede acción |
| La planificación requiere autoridad distinta del acceso productivo ordinario. | riesgo de convertir un acceso de producción en mutación de plan | `FOGO-UX-014` + contratos de autorización propietarios | la entrada a planeación y sus mutaciones se muestran solo con autoridad exacta demostrable |

No queda un hallazgo narrativo sin propietario ni condición de salida.

---

#### 26. Handoff inmediato a FOGO-UX-004

`FOGO-UX-004 — Mostrar producción pendiente del turno` recibe:

```text
VSCREEN-0055 COMO INICIO CANÓNICO DEL ÁREA
ÁREA EFECTIVA YA RESUELTA SERVER-SIDE
ACTOR Y TURNO REVALIDABLES
FUENTE UX = PROYECCIÓN FOGO, NO SEÑALES CRUDAS
VPROC-0033.PRODUCTION_PLAN_RELEASED COMO FRONTERA DE PLAN LIBERADO
VPROC-0034.PRODUCTION_ORDER_READY COMO ENTRADA DE EJECUCIÓN
SIN SELECTOR DE ÁREA QUE CONCEDA AUTORIDAD
ESTADOS VACÍO / CONTEXTO / DENY / STALE / ERROR DIFERENCIADOS
ESPACIO PRIORITARIO PARA TRABAJO PENDIENTE
```

Su responsabilidad será definir qué información de cada pendiente se presenta, cómo se ordena, qué prioridades/bloqueos se muestran y cómo se representa el turno sin reabrir la definición del inicio o del área.

---

#### 27. Handoff al resto de FOGO-UX

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-UX-004` | cola dentro del inicio y del área efectiva; no señales externas crudas |
| `FOGO-UX-005` | acción de iniciar lote separada del triage y sujeta a orden/receta/área revalidadas |
| `FOGO-UX-006` | continuidad de ejecución desde un lote válido, no desde el home genérico |
| `FOGO-UX-007` | finalización separada del inicio y de la planeación |
| `FOGO-UX-008` | recetario operativo accesible desde inicio solo con publicación y alcance aplicables |
| `FOGO-UX-009` | administración de recetas fuera del inicio ordinario del productor |
| `FOGO-UX-010` | métricas de cantidades/desperdicio no saturan el inicio; pertenecen a ejecución/resultado |
| `FOGO-UX-011` | correcciones se tratan como flujo específico y no como edición desde home |
| `FOGO-UX-012` | insumos NEXO se consumen como estado/condición propietaria, no como ledger embebido en inicio |
| `FOGO-UX-013` | terminado NEXO no se confunde con la acción de entrar o priorizar trabajo |
| `FOGO-UX-014` | supervisor puede agregar áreas únicamente por su propia autoridad y conserva una experiencia distinta |
| `FOGO-UX-015` | prototipo valida los tres contextos de área, estados adversariales y separación de superficies |

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas de planificación productiva, contexto/territorio, separación de superficies, autorización, proceso y experiencia. No introduce una obligación observable fuera de la cobertura existente ni cambia texto, estado, relaciones, secuencia o propietario del registro.

---

#### 29. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-003` — planificación productiva, señales normalizadas/deduplicadas, plan/versiones, sede, área, prioridad, capacidad, restricciones, aprobaciones y prohibición de convertir una señal aislada en producción aprobada;
- `TREQ-FOGO-001` — ciclo productivo con actor, turno, cantidades y efectos auditables;
- `TREQ-AUTH-001` — autorización por permiso, contexto y alcance, no por nombre de rol;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-UX-001` — tarea actual, acción principal y estado identificables en superficies operativas;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad;
- `TREQ-PROC-028` — iniciador y condición de inicio definidos para cada proceso;
- `TREQ-PROC-029` — conservación de origen iniciador, función, canal, territorio, correlación y actor cuando aplique.

Esta enumeración es trazabilidad reutilizada y no constituye una modificación del Registro 04A.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@63bb9e9b4d867c9d8985f7b93932b5893289d738`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VSCREEN-0055..0057`, `VPROC-0033`, sus estados canónicos, la frontera de iniciación señal→producción, autorización por área y el AS-IS de `/`, recetario y lotes. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, áreas, colas, planes, órdenes, lotes, dispositivos, filtros ni pruebas con trabajadores. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-003` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 31. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0055` queda definida como inicio y triage del área efectiva;
- [ ] `VSCREEN-0055`, `VSCREEN-0056` y `VSCREEN-0057` conservan responsabilidades distintas;
- [ ] el inicio no vuelve a decidir Cocina, Panadería o Repostería;
- [ ] los tres perfiles productivos reutilizan la misma composición y cambian únicamente contexto/recursos autorizados;
- [ ] no existe selector cliente-side capaz de crear territorio o rol;
- [ ] actor, turno, sede, área, permiso y frescura gobiernan el inicio;
- [ ] el dispositivo restringe pero nunca concede;
- [ ] una señal de demanda, venta, remisión, stock o recomendación no aparece como orden ejecutable por sí sola;
- [ ] `VPROC-0033.PRODUCTION_PLAN_RELEASED` y `VPROC-0034.PRODUCTION_ORDER_READY` quedan distinguidos;
- [ ] plan, orden y lote no se presentan como la misma entidad;
- [ ] el inicio reserva un espacio prioritario para trabajo pendiente sin definir todavía la cola detallada;
- [ ] la continuidad de un lote activo no crea un lote nuevo;
- [ ] recetario operativo y administración de recetas permanecen separados;
- [ ] planeación no se concede por `fogo.access` ni por rol productivo ordinario;
- [ ] supervisión multiárea permanece fuera de la experiencia ordinaria del productor;
- [ ] vacío, falta de contexto, deny, stale y fallo técnico no se confunden;
- [ ] datos de otras áreas no se serializan para ocultarse después en cliente;
- [ ] el inicio minimiza datos y evita un dashboard administrativo denso;
- [ ] los hallazgos físicos tienen propietario y condición de salida;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 32. Límites

Esta tarea no:

- implementa el home de FOGO;
- crea rutas, componentes o endpoints;
- define una URL final nueva para `VSCREEN-0055`;
- modifica permisos o roles;
- crea un permiso de planeación, aprobación, publicación u override;
- diseña las filas/tarjetas completas de la cola pendiente;
- decide algoritmos de prioridad;
- modela disponibilidad integral de personas o equipos;
- diseña el flujo de inicio de lote;
- diseña producción parcial o finalización;
- administra recetas maestras;
- diseña la pantalla final de supervisor;
- modifica `vento-fogo`;
- modifica Supabase, migraciones, RLS, RPC, grants o datos;
- cambia plantillas físicas de dispositivo;
- modifica contratos generados;
- ejecuta E5;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-002 — Separar cocina, panadería y repostería`

**TAREA ACTUAL APROBADA**
`FOGO-UX-003 — Diseñar inicio por área productiva`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-004 — Mostrar producción pendiente del turno`

### ✅ FOGO-UX-004 — Mostrar producción pendiente del turno

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-003 — Diseñar inicio por área productiva
**Tarea siguiente:** FOGO-UX-005 — Diseñar inicio de lote
**Tipo de tarea:** diseño documental integral de la cola operativa de producción pendiente del turno por área efectiva, con elegibilidad, temporalidad, prioridad visible, bloqueos, continuidad, minimización y handoff al inicio de lote
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, componentes, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato de experiencia de la producción pendiente que un trabajador puede ver durante su turno dentro de `VSCREEN-0055 — Inicio y cola de producción`, de forma que la cola:

- muestre únicamente trabajo autorizado para el área y contexto efectivos;
- distinga trabajo listo, bloqueado, en curso, arrastrado y temporalmente no clasificable sin inventar disponibilidad;
- conserve la prioridad, fecha requerida, restricciones y versión provenientes de la planificación autoritativa;
- no convierta señales brutas, filtros cliente-side, `created_at`, orden visual o acciones de supervisión en prioridad empresarial;
- permita reconocer qué debe atenderse ahora sin mezclar planeación, inicio de lote, ejecución parcial, cierre, calidad o administración de recetas;
- muestre bloqueos y siguiente propietario sin afirmar que una condición está satisfecha cuando todavía es desconocida;
- prepare un handoff determinista a `FOGO-UX-005` sin iniciar por sí sola un lote.

La tarea concreta la zona `trabajo ahora` reservada por `FOGO-UX-003`. No redefine el inicio de FOGO, el área efectiva, el catálogo de permisos ni la UX de supervisión multiárea.

---

#### 2. Entrada aprobada de FOGO-UX-003

`FOGO-UX-003` entrega el siguiente contrato de entrada:

```text
VSCREEN-0055 COMO INICIO CANÓNICO DEL ÁREA
ÁREA EFECTIVA YA RESUELTA SERVER-SIDE
ACTOR Y TURNO REVALIDABLES
FUENTE UX = PROYECCIÓN FOGO, NO SEÑALES CRUDAS
VPROC-0033.PRODUCTION_PLAN_RELEASED COMO FRONTERA DE PLAN LIBERADO
VPROC-0034.PRODUCTION_ORDER_READY COMO ENTRADA DE EJECUCIÓN
SIN SELECTOR DE ÁREA QUE CONCEDA AUTORIDAD
ESTADOS VACÍO / CONTEXTO / DENY / STALE / ERROR DIFERENCIADOS
ESPACIO PRIORITARIO PARA TRABAJO PENDIENTE
```

Por tanto, `FOGO-UX-004` no vuelve a decidir:

- quién es el actor efectivo;
- cuál es la sede efectiva;
- cuál es el área efectiva;
- qué rol operativo aplica;
- qué permiso concede lectura;
- si un selector visual puede ampliar territorio.

La tarea recibe esos hechos ya resueltos y define únicamente la experiencia de la cola de trabajo autorizada.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato de cola se define una sola vez;
2. no existe una instancia física propia de `FOGO-UX-004`;
3. la tarea no implementa consultas, RPC, vistas, componentes, endpoints ni almacenamiento;
4. las materializaciones posteriores deberán consumir este contrato sin reinterpretar prioridad, turno, territorio o elegibilidad;
5. cualquier modificación futura de Supabase perteneciente a VENTO continuará bajo `vento-group-sas/vento-shell`.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-001 — Inventariar procesos reales de producción`;
- `FOGO-UX-002 — Separar cocina, panadería y repostería`;
- `FOGO-UX-003 — Diseñar inicio por área productiva`;
- `FOGO-AUTH-003 — Filtrar cola por sede y área`;
- `FOGO-AUTH-008 — Definir permisos de supervisor`;
- `FOGO-AUTH-009 — Proteger inicio de producción`;
- `FOGO-AUTH-014 — Registrar actor y turno`;
- `VSCREEN-0055 — Inicio y cola de producción`;
- `VSCREEN-0056 — Planeación de producción`;
- `VSCREEN-0057 — Preparación e inicio de lote`;
- `VPROC-0033 — Planear producción desde demanda, inventario, capacidad, prioridad y fecha requerida`;
- `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada`;
- estados canónicos de `VPROC-0033` y `VPROC-0034`;
- hallazgos `H-CAP-SCOPE-008-002`, `H-CAP-SCOPE-008-005` y `H-CAP-SCOPE-008-009`;
- Registro 04A vigente del dominio FOGO;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

---

#### 5. Identidad canónica de la cola

La producción pendiente del turno vive dentro de:

| Identidad | Nombre | Proceso | Paso | Interacción | Momento |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0055` | Inicio y cola de producción | `VPROC-0033` | `VPROC-0033::STEP-TRIAGE_PRODUCTION_QUEUE` — Priorizar cola de producción | `TRIAGE` | `INITIAL` |

Su propósito canónico permanece:

> presentar la producción pendiente, priorizada y disponible para el área y contexto efectivos.

La cola no es equivalente a:

- la pantalla de planeación `VSCREEN-0056`;
- la preparación/inicio de lote `VSCREEN-0057`;
- la lista histórica de lotes;
- un tablero de todas las áreas;
- un listado de señales de demanda sin formalizar.

---

#### 6. Definición de «producción pendiente del turno»

Para esta experiencia, un elemento puede considerarse **pendiente del turno** únicamente cuando satisface simultáneamente:

```text
RECURSO AUTORIZADO PARA EL ÁREA EFECTIVA
+
ESTADO PRODUCTIVO ELEGIBLE
+
PLAN / ORDEN CON TRAZABILIDAD SUFICIENTE
+
VENTANA TEMPORAL APLICABLE AL TURNO O ARRASTRE VÁLIDO
+
NO TERMINAL
+
NO CANCELADO
+
NO SUSTITUIDO POR UNA VERSIÓN POSTERIOR
=
CANDIDATO A LA COLA DEL TURNO
```

La cola no transforma en producción pendiente:

```text
SEÑAL BRUTA
VENTA
PEDIDO
REMISIÓN
MÍNIMO DE INVENTARIO
RECOMENDACIÓN
PLAN EN BORRADOR
PLAN EN REVISIÓN
PLAN PENDIENTE DE APROBACIÓN
REGISTRO HISTÓRICO DE LOTE
```

Esos hechos pueden originar o informar planificación, pero no son trabajo ejecutable por sí solos.

---

#### 7. Frontera plan → orden → trabajo visible

La cadena mínima de autoridad UX queda:

```text
VPROC-0033.PRODUCTION_PLAN_RELEASED
→ ORDEN / COMPROMISO PRODUCTIVO DERIVADO Y TRAZABLE
→ VPROC-0034.PRODUCTION_ORDER_READY O ESTADO POSTERIOR ELEGIBLE
→ TERRITORIO Y PERMISO REVALIDADOS
→ COLA DEL ÁREA / TURNO
```

Reglas:

1. un plan liberado demuestra planificación aprobada, no ejecución realizada;
2. una orden productiva lista puede ingresar a la cola si su territorio y ventana son compatibles;
3. un lote ya iniciado no vuelve a aparecer como orden nueva;
4. un elemento terminal o cancelado sale de la cola operativa ordinaria;
5. una revisión del plan no sobrescribe silenciosamente la versión que originó una orden ya trazable.

---

#### 8. Ventana temporal del turno

La experiencia usa el **turno efectivo** del actor cuando el carril operativo exige turno.

El turno debe provenir del contexto autoritativo y no de:

- la hora local del navegador;
- un parámetro libre;
- una preferencia guardada;
- la última sesión del dispositivo;
- el `created_at` de la orden o del lote.

Para cada candidato autorizado, la cola compara la ventana efectiva del turno con la temporalidad productiva que la fuente autoritativa pueda demostrar.

No se inventa un campo físico nuevo. El contrato semántico exige distinguir cuando exista información suficiente sobre:

- fecha/hora requerida;
- horizonte o ventana de ejecución;
- secuencia liberada;
- vigencia de la orden;
- vencimiento o arrastre.

Si esa temporalidad no puede demostrarse, el elemento no se descarta silenciosamente: se clasifica como trabajo ejecutable **sin ventana temporal explícita** y queda visible con esa advertencia cuando pertenezca al área y al conjunto autorizado.

---

#### 9. Clases temporales de la cola

La cola ordinaria distingue al menos:

| Clase UX | Regla semántica | Tratamiento |
| --- | --- | --- |
| `EN_CURSO` | existe ejecución no terminal que el actor puede continuar | se eleva como continuidad; no ofrece crear otro lote para la misma ejecución |
| `DEL_TURNO` | trabajo ejecutable cuya ventana autoritativa corresponde al turno efectivo | aparece en la cola primaria |
| `ARRASTRE` | trabajo que debía haberse atendido antes del inicio del turno actual y sigue válido/no terminal | permanece visible y marcado; no se refecha silenciosamente |
| `BLOQUEADO_DEL_TURNO` | pertenece al turno/área, pero una condición autoritativa impide iniciar o continuar | visible con bloqueo y propietario; sin acción indebida |
| `SIN_VENTANA_EXPLICITA` | es ejecutable y autorizado, pero no existe temporalidad suficiente para asignarlo con certeza a una ventana | visible de forma diferenciada; exige decisión propietaria, no heurística local |
| `FUERA_DEL_TURNO` | la fuente autoritativa lo ubica en una ventana futura incompatible con el turno actual | no integra la cola primaria del productor ordinario |

La clasificación temporal no concede autoridad adicional.

---

#### 10. Estados productivos elegibles

La cola consume los estados canónicos sin renombrar su verdad empresarial.

| Proceso | Estado | Tratamiento UX |
| --- | --- | --- |
| `VPROC-0033` | `PRODUCTION_PLAN_RELEASED` | habilita derivación trazable de trabajo, pero no se muestra como lote ya iniciado |
| `VPROC-0034` | `PRODUCTION_ORDER_READY` | trabajo listo para preparación cuando el resto de condiciones aplica |
| `VPROC-0034` | `MATERIALS_RESERVING` | visible como preparación/bloqueo cuando el actor necesite conocer su estado |
| `VPROC-0034` | `MATERIALS_READY` | puede mostrarse como listo para continuar al inicio, sujeto a revalidación de `FOGO-UX-005` |
| `VPROC-0034` | `IN_PRODUCTION` | aparece como continuidad, no como orden nueva |
| `VPROC-0034` | `OUTPUT_REPORTED` | deja de tratarse como nueva producción pendiente; se deriva al flujo posterior que corresponda |
| `VPROC-0034` | `CONSUMPTION_RECONCILIATION_PENDING` | se trata como seguimiento/conciliación, no como nueva orden |
| `VPROC-0034` | `READY_FOR_QUALITY` | sale de la cola ordinaria de inicio de producción y pasa a la responsabilidad de calidad aplicable |
| `VPROC-0034` | `PRODUCTION_EXECUTION_COMPLETED` | no permanece como trabajo pendiente del turno |

La UI no crea estados paralelos en base de datos. Las clases UX son proyecciones de presentación sobre estados canónicos.

---

#### 11. Secciones visibles para el productor ordinario

Dentro del área efectiva, la composición prioritaria es:

1. **Continuar trabajo en curso**, cuando exista una ejecución recuperable y autorizada.
2. **Listo para este turno**, con órdenes ejecutables no bloqueadas.
3. **Bloqueado en este turno**, con explicación resumida y siguiente propietario.
4. **Arrastre pendiente**, sin ocultar que corresponde a una ventana anterior.
5. **Sin ventana temporal explícita**, únicamente cuando el trabajo sea real y autorizado pero la planificación no permita asignarlo con certeza al turno.

La experiencia no mezcla en estas secciones:

- tareas de otra área;
- próximos turnos del productor ordinario;
- planes no liberados;
- órdenes canceladas;
- lotes históricos cerrados;
- trabajo de supervisión multiárea.

---

#### 12. Información mínima de cada pendiente

Cada fila, tarjeta o representación equivalente debe permitir responder sin abrir otra pantalla:

1. **qué producto o salida debe producirse**;
2. **cuánto se espera producir**, con unidad compatible;
3. **cuándo se requiere**, cuando la fuente autoritativa lo defina;
4. **qué prioridad vigente tiene**, sin recalcularla localmente;
5. **qué estado operativo tiene ahora**;
6. **si está listo o bloqueado**;
7. **qué condición o propietario explica el bloqueo**, cuando aplique;
8. **qué acción siguiente está permitida**;
9. **si existe una ejecución ya iniciada que debe continuarse**;
10. **qué referencia de plan/orden permite trazabilidad** sin exponer identificadores técnicos innecesarios.

Cuando una receta publicada ya esté vinculada y el actor esté autorizado, puede mostrarse una referencia resumida suficiente para reconocer la preparación. La fórmula completa no forma parte de la tarjeta de cola.

---

#### 13. Información que no debe saturar la cola

La vista primaria no necesita mostrar por defecto:

- UUID internos;
- SQL/RPC o nombres de tablas;
- scopes técnicos;
- costos detallados;
- fórmula completa de receta;
- ledger de inventario;
- historial completo de cambios;
- auditoría completa de actor/turno;
- logs;
- detalles de RLS;
- cantidades de otras áreas;
- planes futuros no ejecutables;
- todas las métricas del turno.

La cola debe ser una superficie operativa, no un dashboard administrativo exhaustivo.

---

#### 14. Semántica de prioridad

La prioridad visible proviene de la planificación autoritativa.

La UI no puede fabricar prioridad a partir de:

```text
created_at
posición previa en pantalla
orden alfabético
cantidad mayor
producto más popular
usuario que creó el registro
área seleccionada
color de una tarjeta
regla local hardcodeada
```

Si la planificación entrega prioridad explícita, la cola la conserva sin reinterpretarla.

Si no existe prioridad explícita demostrable, la UX muestra `SIN PRIORIDAD EXPLÍCITA` o equivalente y no inventa un nivel.

---

#### 15. Ordenamiento de la cola

El orden visual se determina únicamente después de autorizar y clasificar el conjunto.

Orden lógico:

```text
1. CONTINUIDAD DE EJECUCIÓN YA INICIADA
2. CLASE TEMPORAL / OPERATIVA
3. PRIORIDAD AUTORITATIVA, SI EXISTE
4. FECHA / HORA REQUERIDA, SI EXISTE
5. SECUENCIA CANÓNICA EXPLÍCITA, SI EXISTE
6. DESEMPATE TÉCNICO ESTABLE SIN SIGNIFICADO EMPRESARIAL
```

El desempate técnico solo evita una UI inestable. No se presenta al usuario como prioridad ni altera la semántica del plan.

No se admite:

```text
TOP N GLOBAL
→ OCULTAR POR ÁREA
```

El conjunto debe estar autorizado y territorialmente filtrado antes de priorizarse.

---

#### 16. Arrastre, atraso y trabajo desplazado

La cola no oculta demanda ejecutable solo porque su fecha requerida ya pasó.

Cuando un trabajo válido no fue completado en la ventana anterior:

- se identifica como `ARRASTRE` o equivalente;
- conserva su fecha requerida original;
- conserva la prioridad autoritativa vigente;
- no se modifica automáticamente su fecha para hacerlo parecer trabajo normal del turno;
- no se duplica creando una orden nueva solo por cambio de turno;
- cualquier repriorización o reprogramación real pertenece al contrato propietario de planificación/supervisión y debe ser auditable.

Esto protege la obligación de no ocultar demanda desplazada, faltantes ni excedentes.

---

#### 17. Bloqueos y condiciones no verificadas

La cola distingue:

```text
LISTO
!= BLOQUEADO
!= NO VERIFICADO
!= ERROR TÉCNICO
```

Un elemento puede mostrar un bloqueo únicamente cuando existe evidencia autoritativa suficiente.

Categorías de presentación permitidas, sin inventar su fuente física:

- materiales no listos;
- capacidad/equipo no confirmado;
- condición laboral o cobertura no confirmada;
- receta o versión no aplicable;
- dependencia operativa pendiente;
- conflicto de estado;
- restricción de calidad o seguridad cuando el proceso aplicable la exponga.

Si una integración todavía no existe o no está fresca, el estado correcto es `NO VERIFICADO`, no `DISPONIBLE`.

---

#### 18. Propietario del bloqueo y siguiente paso

La cola debe mostrar, en lenguaje operativo, quién o qué dominio debe resolver el bloqueo cuando esa propiedad sea conocida.

Ejemplos semánticos:

| Bloqueo | Propietario esperado |
| --- | --- |
| reserva/material faltante | contrato NEXO correspondiente |
| receta no vigente/aplicable | FOGO receta/planificación |
| orden no liberada | FOGO planificación |
| contexto laboral inválido | contrato de contexto/turno aplicable |
| equipo no disponible | propietario de disponibilidad/mantenimiento aplicable |
| autorización insuficiente | contrato de autorización exacto |

La UI no concede a un productor acciones para resolver una excepción que pertenece a otro dominio.

---

#### 19. Disponibilidad laboral y limitación actual

El hallazgo canónico `H-CAP-SCOPE-008-005` establece que la disponibilidad laboral de VISO todavía no está integrada con planificación productiva.

Por tanto, `FOGO-UX-004` no puede afirmar que:

```text
TRABAJADOR EN TURNO
=
CAPACIDAD PRODUCTIVA SUFICIENTE PARA TODA LA COLA
```

La tarea sí exige:

1. usar el turno efectivo para determinar el contexto del actor;
2. no inferir capacidad total solo porque existe un trabajador conectado;
3. diferenciar capacidad confirmada de capacidad desconocida;
4. no ocultar una orden válida porque la integración de disponibilidad laboral todavía no esté materializada;
5. asignar la resolución integral de capacidad a sus propietarios canónicos posteriores.

---

#### 20. Equipos, materiales y capacidad

La cola puede mostrar señales resumidas de disponibilidad solo cuando provengan de una fuente autorizada y fresca.

No embebe ni duplica:

- inventario NEXO;
- mantenimiento de equipos;
- compras ORIGO;
- programación laboral VISO;
- capacidad analítica completa.

La cola consume el resultado necesario para decidir `LISTO`, `BLOQUEADO` o `NO_VERIFICADO`, conservando fuente y fecha de corte cuando sean materiales para la decisión.

---

#### 21. Continuidad de un lote ya iniciado

Si una orden ya produjo una ejecución no terminal y el actor puede continuarla, la cola debe evitar que el mismo trabajo parezca nuevamente disponible para «iniciar».

Regla:

```text
ORDEN CON LOTE ACTIVO AUTORIZADO
→ CONTINUAR LOTE
!=
CREAR OTRO LOTE
```

La cola puede mostrar producto, cantidad objetivo, progreso resumido y estado suficiente para reconocer la continuidad, pero el detalle de ejecución pertenece a `FOGO-UX-006` y la acción inicial/revalidación a `FOGO-UX-005`.

---

#### 22. Acción primaria de cada elemento

La acción mostrada depende del estado y del permiso actual.

| Situación | Acción UX posible | Propietario del flujo posterior |
| --- | --- | --- |
| orden lista y autorizada | `Preparar / iniciar` o equivalente | `FOGO-UX-005` |
| lote activo autorizado | `Continuar` | `FOGO-UX-006` |
| bloqueado | `Ver bloqueo` / siguiente propietario | tarea propietaria de la excepción |
| arrastre listo | `Preparar / iniciar`, conservando marca de arrastre | `FOGO-UX-005` |
| sin ventana explícita | `Ver detalle` y, si está permitido, continuar por el flujo propietario sin inventar prioridad | planificación / `FOGO-UX-005` según estado |
| no autorizado | ninguna acción ni revelación del recurso | autorización propietaria |

La acción `Preparar / iniciar` nunca ejecuta el efecto dentro de `VSCREEN-0055`; abre el handoff y `FOGO-UX-005` vuelve a revalidar.

---

#### 23. Receta resumida dentro de la cola

La cola puede mostrar una referencia resumida a receta cuando sea necesaria para reconocer correctamente el trabajo.

Reglas:

- debe ser una publicación aplicable y autorizada;
- la versión exacta permanece trazable;
- el resumen no revela fórmula completa por defecto;
- abrir receta requiere la capacidad propietaria correspondiente;
- la receta no se usa para inferir área si el recurso no tiene territorio demostrable;
- cambiar de receta no es una acción de la cola ordinaria.

El diseño detallado de receta operativa permanece en `FOGO-UX-008`.

---

#### 24. Filtros y búsqueda

Los filtros sirven únicamente para reducir o reorganizar el conjunto ya autorizado.

Se permiten criterios de presentación como:

- estado visible;
- producto;
- prioridad autoritativa;
- bloqueo;
- arrastre;
- búsqueda textual sobre campos ya autorizados.

Para un productor ordinario, la UI no ofrece un filtro capaz de seleccionar otra área y ampliar territorio.

Parámetros como `site_id`, `area_id`, `status`, `priority`, `product_id` o `recipe_id` no son autoridad y nunca amplían el resultado server-side.

---

#### 25. Frontera con supervisión y repriorización

`FOGO-AUTH-008` permite supervisión multiárea únicamente por carriles completos y explícitos. También establece:

```text
COORDINAR PRIORIDAD != REESCRIBIR PRIORIDAD
```

Por tanto, esta tarea:

- define la cola ordinaria de un área/turno;
- puede mostrar prioridad y urgencia existentes;
- no crea permiso de override;
- no autoriza drag-and-drop que persista nueva prioridad;
- no concede multiárea al productor;
- no define la UX final del supervisor.

La experiencia multiárea, coordinación, excepciones y controles de supervisor permanecen en `FOGO-UX-014` y contratos de autorización propietarios.

---

#### 26. Frescura, concurrencia y revalidación

Una fila mostrada no conserva autoridad indefinidamente.

La cola debe considerarse stale cuando cambie materialmente:

- actor efectivo;
- turno;
- rol operativo;
- sede;
- área;
- permiso;
- cobertura;
- versión del plan;
- estado de la orden;
- prioridad o fecha requerida;
- cancelación o sustitución;
- disponibilidad material que gobierne el bloqueo;
- lote activo asociado.

Antes de una mutación, `FOGO-UX-005` y la autorización propietaria revalidan nuevamente actor, turno, área, permiso, recurso, estado y versión.

---

#### 27. Estados vacío, stale, deny y error

La cola diferencia al menos:

| Estado UX | Significado |
| --- | --- |
| `COLA_VACIA` | contexto válido y fuente resuelta; no existe trabajo visible autorizado |
| `SIN_CONTEXTO` | no puede resolverse el turno/área requeridos |
| `SIN_PERMISO` | existe contexto pero no autoriza la lectura |
| `STALE` | la cola fue válida, pero su contexto o fuente dejó de ser demostrablemente fresca |
| `ERROR_TECNICO` | no pudo resolverse la fuente requerida |
| `SIN_TRABAJO_DEL_TURNO_CON_OTRO_TRABAJO_VALIDO` | existe trabajo ejecutable fuera de la ventana ordinaria o sin ventana explícita; no debe presentarse como cola vacía absoluta |

Reglas:

```text
COLA VACÍA != ERROR
SIN PERMISO != COLA VACÍA
STALE != COLA VACÍA
SIN VENTANA EXPLÍCITA != NO EXISTE TRABAJO
```

---

#### 28. Tactilidad, legibilidad y densidad

En una estación productiva compartida, la cola debe priorizar lectura rápida y acción inequívoca.

Criterios:

- una tarjeta/fila debe poder reconocerse por producto, cantidad, estado y siguiente acción;
- prioridad y bloqueo no dependen únicamente de color;
- el área efectiva permanece visible en el contexto general;
- los targets de acción no se superponen;
- no existe una acción destructiva primaria desde la cola;
- información secundaria puede expandirse progresivamente;
- la cola evita tablas horizontales densas como requisito único de operación táctil;
- el estado de carga no permite tocar una acción con contexto todavía no resuelto.

La definición no impone un framework, componente o tamaño físico concreto.

---

#### 29. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7` se observó:

| Superficie AS-IS | Qué demuestra | Qué no demuestra |
| --- | --- | --- |
| `/` | acceso general a recetario y lotes | `VSCREEN-0055` contextual, cola de turno o prioridad autoritativa |
| `/production-batches` | lista de lotes registrados, métricas recientes, estado y filtro opcional por sede | trabajo pendiente derivado de plan, aislamiento por área, ventana de turno, prioridad de planificación o bloqueos autoritativos |
| `/production-batches` usando `created_at` para métricas de 7 días | historia operativa reciente | fecha requerida, secuencia de plan o prioridad empresarial |
| `/production-batches/new` | creación real y revalidación posterior de receta/área en el flujo auditado | cola de pendientes ni clasificación temporal del turno |

La lista histórica de lotes no se reutiliza como sustituto de la cola solo porque contenga producción real.

---

#### 30. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| No existe una única fuente física comprobada para plan y programación. | la UX no puede derivar una cola autoritativa directamente desde señales sueltas | `FOGO-UX-004`, `FOGO-UX-014`, `PROC-CAT-009..018` y materialización aplicable | la implementación consume una proyección FOGO que distingue plan liberado, orden ejecutable, estado, prioridad, fecha requerida y versión |
| `/production-batches` no demuestra aislamiento por área. | riesgo de mezclar lotes de la misma sede | materializaciones de `FOGO-AUTH-003` + implementación FOGO propietaria | el servidor filtra por contexto/territorio antes de serializar |
| `created_at` está disponible en la lista histórica. | riesgo de convertir orden de registro en prioridad del turno | implementación propietaria de `VSCREEN-0055` | la cola usa prioridad/fecha/secuencia autoritativas y trata el desempate técnico como no empresarial |
| La disponibilidad laboral VISO no está integrada con planificación productiva. | no puede declararse capacidad humana completa solo por sesión/turno | `CAP-SCOPE-002`, `INT-PROD-001..005` y consumidores aplicables | la planificación consume disponibilidad autoritativa y la cola diferencia confirmado de desconocido |
| Prioridades, urgencias y overrides carecen todavía de reglas/evidencia uniformes en implementación. | riesgo de reordenamiento opaco o override desde UI | `FOGO-UX-004`, `FOGO-UX-014`, `FOGO-AUTH-008`, `FOGO-AUTH-012` | la cola muestra prioridad autoritativa; cualquier cambio usa acción/permiso/motivo/evidencia propietarios |
| Un trabajo puede cambiar de estado después de mostrarse. | riesgo de iniciar con autorización o estado stale | `FOGO-AUTH-009`, `FOGO-AUTH-014`, `FOGO-UX-005` | el inicio vuelve a revalidar actor, turno, área, permiso, orden, receta, estado y versión |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 31. Handoff inmediato a FOGO-UX-005

`FOGO-UX-005 — Diseñar inicio de lote` recibe de esta tarea un elemento seleccionado con, como mínimo, semántica suficiente para revalidar:

```text
ÁREA EFECTIVA
ACTOR / TURNO ACTUALES
REFERENCIA ESTABLE A PLAN / ORDEN
VPROC-0034.PRODUCTION_ORDER_READY O ESTADO ELEGIBLE
PRODUCTO / SALIDA
CANTIDAD OBJETIVO + UNIDAD
RECETA / VERSIÓN CUANDO APLIQUE
PRIORIDAD AUTORITATIVA SIN MUTARLA
FECHA / VENTANA REQUERIDA CUANDO EXISTA
ESTADO DE BLOQUEO / DISPONIBILIDAD
INDICADOR DE ARRASTRE CUANDO APLIQUE
REFERENCIA A LOTE ACTIVO SI YA EXISTE
SNAPSHOT DE FRESCURA SUFICIENTE PARA SABER QUE DEBE REVALIDARSE
```

`FOGO-UX-005` no confía en el snapshot de la cola como autorización final. Revalida el recurso inmediatamente antes del inicio.

---

#### 32. Handoff al resto de FOGO-UX

| Tarea | Entrada exacta proveniente de FOGO-UX-004 |
| --- | --- |
| `FOGO-UX-005` | orden seleccionada, contexto, temporalidad, prioridad visible y bloqueos sin autoridad final heredada |
| `FOGO-UX-006` | lotes `IN_PRODUCTION` aparecen como continuidad y no como órdenes nuevas |
| `FOGO-UX-007` | estados posteriores a ejecución dejan de ser nueva producción pendiente y pasan al cierre correspondiente |
| `FOGO-UX-008` | referencia resumida de receta puede abrir recetario operativo autorizado sin exponer fórmula completa |
| `FOGO-UX-010` | cantidades reales, merma y rendimiento no se resuelven dentro de la cola inicial |
| `FOGO-UX-012` | materiales/bloqueos se consumen como estado propietario, sin duplicar inventario NEXO |
| `FOGO-UX-014` | supervisor agrega múltiples áreas únicamente por autoridad propia y conserva prioridad/override como decisiones auditables |
| `FOGO-UX-015` | prototipo debe validar lectura rápida, bloqueos, arrastre, continuidad, vacío, stale y ausencia de autoridad fabricada |

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas de planificación productiva, territorio, prioridad, turno, autorización, frescura, iniciación de procesos y experiencia. No introduce una obligación observable fuera de la cobertura existente ni cambia texto, estado, relaciones, secuencia o propietario del registro.

---

#### 34. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-003` — planificación productiva con señales normalizadas/deduplicadas, plan/versiones, horizonte, sede, área, producto, receta, cantidades, fechas, prioridad, capacidad, restricciones, aprobaciones, overrides y órdenes derivadas trazables;
- `TREQ-FOGO-001` — ciclo productivo con actor, turno, cantidades y efectos auditables;
- `TREQ-FOGO-004` — ejecución productiva con orden, lote, receta/versión, materiales, cantidades, pasos, desviaciones y estados independientes;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-013` — autorización server-side y revalidación de territorio/recurso;
- `TREQ-AUTH-014` — invalidación de decisiones stale ante cambios materiales de contexto;
- `TREQ-AUTH-015` — evidencia correlacionable de actor, contexto, permiso, recurso, decisión y tiempo;
- `TREQ-UX-001` — tarea actual, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye una modificación del Registro 04A.

---

#### 35. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@947d7eb3acb65ea589febf82d6b9196350ca3d66`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `FOGO-AUTH-003`, `FOGO-AUTH-008`, `FOGO-AUTH-014`, `VSCREEN-0055`, estados de `VPROC-0033`/`VPROC-0034`, cobertura `TREQ-FOGO-003`, hallazgos de capacidad/prioridad y el AS-IS de `/production-batches`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, colas, prioridades, bloqueos, órdenes, lotes, filtros, arrastres ni pruebas con trabajadores. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-004` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 36. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0055` conserva identidad de inicio y triage de producción;
- [ ] la cola consume área efectiva ya resuelta y no ofrece un selector que conceda territorio;
- [ ] solo trabajo derivado de planificación/orden ejecutable puede presentarse como producción pendiente;
- [ ] `VPROC-0033.PRODUCTION_PLAN_RELEASED` y `VPROC-0034.PRODUCTION_ORDER_READY` permanecen diferenciados;
- [ ] plan, orden, lote y registro histórico no se presentan como la misma entidad;
- [ ] el turno efectivo proviene del contexto autoritativo y no de parámetros o `created_at`;
- [ ] `EN_CURSO`, `DEL_TURNO`, `ARRASTRE`, `BLOQUEADO_DEL_TURNO`, `SIN_VENTANA_EXPLICITA` y `FUERA_DEL_TURNO` no se confunden;
- [ ] una orden sin temporalidad suficiente no se oculta ni recibe una ventana inventada;
- [ ] prioridad visible proviene de planificación autoritativa;
- [ ] la UI no calcula prioridad desde tiempo de creación, posición visual, cantidad, producto o reglas locales;
- [ ] el orden visual separa continuidad, clase temporal, prioridad, fecha requerida, secuencia y desempate técnico;
- [ ] el desempate técnico no adquiere significado empresarial;
- [ ] trabajo arrastrado conserva fecha requerida original y no se reprograma silenciosamente;
- [ ] bloqueado, no verificado y error técnico permanecen distintos;
- [ ] disponibilidad laboral no se infiere solo desde la existencia de un trabajador en turno;
- [ ] señales de materiales/equipos/capacidad solo se muestran cuando tienen fuente/frescura suficientes;
- [ ] un lote activo aparece como continuidad y no vuelve a ofrecer crear otro lote para la misma ejecución;
- [ ] cada pendiente permite reconocer producto, cantidad, fecha cuando exista, prioridad, estado, bloqueo y siguiente acción;
- [ ] la cola minimiza fórmula, costos, UUID, logs y detalles técnicos;
- [ ] filtros solo reducen el conjunto ya autorizado;
- [ ] productores ordinarios no obtienen multiárea ni repriorización persistente;
- [ ] coordinación de prioridad no se convierte en override;
- [ ] cambios de actor, turno, área, permiso, plan, orden o estado invalidan decisiones stale;
- [ ] vacío, deny, stale, error y trabajo sin ventana explícita se distinguen;
- [ ] `FOGO-UX-005` recibe una referencia trazable y vuelve a revalidar antes de iniciar;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 37. Límites

Esta tarea no:

- implementa `VSCREEN-0055`;
- crea una tabla, vista, RPC o endpoint de cola;
- define nombres físicos de columnas;
- modifica Supabase, RLS, grants, migraciones o datos;
- crea permisos FOGO nuevos;
- crea un permiso de override o repriorización;
- diseña la planeación completa de `VSCREEN-0056`;
- define el algoritmo empresarial completo de planificación;
- decide disponibilidad laboral en VISO;
- decide disponibilidad de equipos en NEXO;
- duplica stock o reservas NEXO;
- diseña la pantalla multiárea final del supervisor;
- inicia un lote;
- registra producción parcial;
- finaliza un lote;
- libera calidad;
- administra recetas maestras;
- registra consumos o inventario;
- convierte una señal externa en orden de producción;
- usa `created_at` como prioridad empresarial;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 38. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-003 — Diseñar inicio por área productiva`

**TAREA ACTUAL APROBADA**
`FOGO-UX-004 — Mostrar producción pendiente del turno`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-005 — Diseñar inicio de lote`

### ✅ FOGO-UX-005 — Diseñar inicio de lote

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-004 — Mostrar producción pendiente del turno
**Tarea siguiente:** FOGO-UX-006 — Diseñar producción parcial
**Tipo de tarea:** diseño documental integral de `VSCREEN-0057` para preparar e iniciar un lote desde una orden productiva autorizada, separando preparación, readiness e inicio real, con receta/version exactas, materiales y recursos verificados, autorización fresca, idempotencia, concurrencia y handoff a ejecución parcial
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato de experiencia de `VSCREEN-0057 — Preparación e inicio de lote` para que una orden seleccionada desde la cola autorizada pueda convertirse en una ejecución productiva únicamente cuando se demuestren todas las precondiciones materiales, territoriales, contractuales y de autorización aplicables.

La regla raíz queda:

```text
ORDEN PRODUCTIVA AUTORIZADA Y VIGENTE
+
RECETA / VERSION PUBLICADA Y APLICABLE
+
ACTOR + TURNO + SEDE + AREA FRESCOS
+
PERMISO EXACTO DE CREACION
+
MATERIALES Y RECURSOS PREPARADOS
+
ESTADO DE ORIGEN COMPATIBLE
+
IDENTIDAD IDEMPOTENTE
=
INICIO PRODUCTIVO AUTORIZABLE
```

La experiencia debe dejar inequívoco que **preparar un lote no significa que la producción haya comenzado** y que **iniciar producción no equivale a registrar consumo real, resultado, empaque, calidad o cierre**.

---

#### 2. Entrada aprobada de FOGO-UX-004

`FOGO-UX-004` entrega un elemento seleccionado de la cola con semántica suficiente para revalidar, como mínimo:

```text
AREA EFECTIVA
ACTOR / TURNO ACTUALES
REFERENCIA ESTABLE A PLAN / ORDEN
VPROC-0034.PRODUCTION_ORDER_READY O ESTADO ELEGIBLE
PRODUCTO / SALIDA
CANTIDAD OBJETIVO + UNIDAD
RECETA / VERSION CUANDO APLIQUE
PRIORIDAD AUTORITATIVA SIN MUTARLA
FECHA / VENTANA REQUERIDA CUANDO EXISTA
ESTADO DE BLOQUEO / DISPONIBILIDAD
INDICADOR DE ARRASTRE CUANDO APLIQUE
REFERENCIA A LOTE ACTIVO SI YA EXISTE
SNAPSHOT DE FRESCURA SUFICIENTE PARA SABER QUE DEBE REVALIDARSE
```

`FOGO-UX-005` no acepta ese snapshot como autorización final. Lo utiliza para identificar la intención del trabajador y vuelve a resolver la verdad autoritativa antes de cualquier transición o efecto.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el diseño se define una sola vez;
2. no existe instancia física propia de `FOGO-UX-005`;
3. esta tarea no implementa componentes, consultas, RPC, transiciones ni almacenamiento;
4. las materializaciones posteriores consumen el contrato sin reinterpretar inicio, readiness, permiso o estado;
5. cualquier modificación de Supabase perteneciente a VENTO continúa bajo `vento-group-sas/vento-shell` y su trabajo físico propietario.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-001 — Inventariar procesos reales de producción`;
- `FOGO-UX-002 — Separar cocina, panadería y repostería`;
- `FOGO-UX-003 — Diseñar inicio por área productiva`;
- `FOGO-UX-004 — Mostrar producción pendiente del turno`;
- `FOGO-AUTH-009 — Proteger inicio de producción`;
- `FOGO-AUTH-013 — Proteger lotes y recetas`;
- `FOGO-AUTH-014 — Registrar actor y turno`;
- `VSCREEN-0057 — Preparación e inicio de lote`;
- `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada`;
- `VPROC-0034::STEP-PREPARE_AND_START_BATCH — Preparar e iniciar lote`;
- estados y eventos canónicos de `VPROC-0034`;
- contrato FOGO ↔ NEXO de materiales y reservas;
- Registro 04A vigente de FOGO y autorización;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

---

#### 5. Identidad canónica de la superficie

| Dimensión | Identidad |
| --- | --- |
| Pantalla | `VSCREEN-0057 — Preparación e inicio de lote` |
| Aplicación | `fogo` |
| Proceso | `VPROC-0034` |
| Paso primario | `VPROC-0034::STEP-PREPARE_AND_START_BATCH — Preparar e iniciar lote` |
| Interacción | `EXECUTE` |
| Momento | `INITIAL` |
| Acción funcional primaria | `VSCREEN-0057::PRIMARY` |
| Permiso de mutación | `fogo.production.batches.create` |

La superficie prepara y ejecuta la transición inicial del lote. No sustituye la cola `VSCREEN-0055`, la ejecución continua `VSCREEN-0058`, la captura parcial `VSCREEN-0059` ni el cierre `VSCREEN-0060`.

---

#### 6. Máquina de estados que gobierna el inicio

`VPROC-0034` conserva la siguiente progresión relevante:

```text
VPROC-0034.PRODUCTION_ORDER_READY
→ VPROC-0034.MATERIALS_RESERVING
→ VPROC-0034.MATERIALS_READY
→ VPROC-0034.IN_PRODUCTION
```

Semántica obligatoria:

| Estado | Verdad mínima | Lo que todavía NO demuestra |
| --- | --- | --- |
| `PRODUCTION_ORDER_READY` | existe orden autorizada con producto, cantidad, receta/version, sede, área y fecha requerida | reserva, readiness o producción iniciada |
| `MATERIALS_RESERVING` | FOGO está verificando y obteniendo materiales contra la orden | reserva completa, readiness o producción iniciada |
| `MATERIALS_READY` | materiales y demás recursos requeridos están preparados y validados | que la ejecución haya comenzado |
| `IN_PRODUCTION` | comenzó la ejecución productiva y pueden registrarse pasos, consumos, tiempos y desviaciones | resultado final, liberación de calidad o cierre |

La UX no usa un único estado visual `listo` para representar simultáneamente estas cuatro verdades.

---

#### 7. Preparación e inicio son decisiones distintas

El paso `PREPARE_AND_START_BATCH` contiene dos fronteras que deben ser visibles y auditables:

```text
FRONTERA A — PREPARAR
PRODUCTION_ORDER_READY
→ MATERIALS_RESERVING
→ MATERIALS_READY

FRONTERA B — INICIAR PRODUCCION
MATERIALS_READY
→ IN_PRODUCTION
```

Reglas:

1. entrar en preparación no inicia producción;
2. solicitar o validar materiales no inicia producción;
3. una reserva NEXO no equivale por sí sola a `MATERIALS_READY`;
4. `MATERIALS_READY` no equivale por sí solo a `IN_PRODUCTION`;
5. la confirmación que inicia producción se ejecuta únicamente desde un estado fresco compatible;
6. ninguna fase adelanta consumos, resultado, empaque o cierre.

---

#### 8. Condición de entrada desde la cola

La pantalla solo acepta como intención inicial una orden o ejecución referenciable que continúe siendo compatible con el área y contexto efectivos.

La entrada debe permitir resolver:

- identidad estable de la orden productiva;
- versión vigente de la orden;
- referencia al plan que la originó cuando aplique;
- producto o salida planificada;
- cantidad objetivo y unidad;
- sede y área productivas;
- receta publicada y versión exacta;
- fecha o ventana requerida cuando exista;
- prioridad vigente sin convertirla en permiso;
- estado actual de la instancia `VPROC-0034`;
- existencia de un lote activo relacionado cuando corresponda.

Si ya existe una ejecución activa incompatible con crear otro lote, el flujo no ofrece un segundo inicio y deriva a continuidad.

---

#### 9. Revalidación al abrir la preparación

Al abrir `VSCREEN-0057`, la experiencia vuelve a comprobar, sin confiar en parámetros del cliente:

```text
ACTOR EFECTIVO
TURNO Y CHECK-IN CUANDO APLIQUEN
ROL OPERATIVO
SEDE
AREA
PERMISO fogo.production.batches.create
ORDEN Y VERSION
RECETA Y VERSION
ESTADO DE LA INSTANCIA
TERRITORIO DEL RECURSO
EXISTENCIA DE EJECUCION ACTIVA
FRESCURA DEL SNAPSHOT
```

La selección realizada en la cola expresa intención; no funciona como token de autoridad.

---

#### 10. Resumen operativo previo a preparar

Antes de cualquier acción, el trabajador debe poder verificar de forma compacta:

1. producto o salida a producir;
2. cantidad objetivo y unidad;
3. área productiva efectiva;
4. fecha requerida cuando exista;
5. prioridad vigente cuando exista;
6. receta publicada aplicable y versión identificable;
7. estado actual de preparación;
8. materiales o recursos aún pendientes;
9. bloqueos que impiden continuar;
10. acción siguiente realmente disponible.

El resumen no expone por defecto fórmula completa, costos detallados, UUID técnicos, SQL, scopes ni información de otras áreas.

---

#### 11. Orden productiva como autoridad de la intención

La preparación nace de una orden autorizada.

La UX no permite convertir directamente en inicio:

```text
RECETA PUBLICADA AISLADA
VENTA
PEDIDO
REMISION
MINIMO
RECOMENDACION
PLAN EN BORRADOR
PLAN LIBERADO SIN ORDEN EJECUTABLE
```

La orden conserva vínculo con su versión de plan, producto, cantidad, sede, área, receta/version y temporalidad aplicable.

Si el AS-IS transitorio permite crear lote desde receta sin orden canónica, esa posibilidad se presenta como brecha de adopción y no redefine el diseño objetivo.

---

#### 12. Receta y versión exactas

El inicio usa una publicación vigente y aplicable de receta, no una definición mutable sin versión.

Antes de continuar:

- la publicación debe seguir vigente;
- la versión debe ser identificable de forma estable;
- producto, sede y área deben ser compatibles con la orden;
- una versión retirada no origina un nuevo lote;
- el escalamiento debe partir de la versión que gobierna la orden;
- una lectura previa del recetario no prueba que la publicación siga vigente al confirmar;
- `fogo.production.recipe_book.view` no sustituye `fogo.production.batches.create`.

La experiencia muestra la versión suficiente para que el trabajador sepa qué formulación aplicará sin convertir esta pantalla en administración de recetas.

---

#### 13. Cantidad objetivo y escalamiento

La cantidad objetivo procede de la orden productiva vigente y se expresa en una unidad compatible con la receta/version.

La UI no permite que un campo libre cambie silenciosamente el alcance empresarial de la orden.

Si una ejecución futura necesita dividir, reducir, ampliar o reprogramar la cantidad, esa decisión debe estar gobernada por el contrato propietario y quedar trazada como una revisión o excepción; `FOGO-UX-005` no inventa una capacidad local de modificación de plan.

El escalamiento de ingredientes para preparación debe ser determinista y reproducible desde:

```text
ORDEN / CANTIDAD OBJETIVO
+
RECETA / VERSION
+
UNIDADES Y CONVERSIONES CANONICAS
+
REDONDEO Y TOLERANCIAS APLICABLES
```

---

#### 14. Materiales: estados visibles sin fabricar readiness

La experiencia distingue al menos:

| Estado UX | Verdad empresarial |
| --- | --- |
| `PENDIENTE_DE_RESERVA` | existen requerimientos todavía no solicitados o no resueltos |
| `RESERVANDO` | FOGO está en `MATERIALS_RESERVING`; NEXO procesa requerimientos aplicables |
| `RESERVA_PARCIAL` | no toda la cantidad requerida está reservada y no existe todavía decisión que la convierta en readiness completo |
| `MATERIALES_LISTOS` | FOGO puede demostrar `MATERIALS_READY` con evidencia vigente |
| `BLOQUEADO` | una condición concluyente impide continuar |
| `NO_VERIFICADO` | la fuente necesaria no está disponible o no tiene frescura suficiente |

No se admite una bandera genérica que trate solicitud, reserva, preparación y consumo como el mismo hecho.

---

#### 15. Frontera FOGO ↔ NEXO durante preparación

FOGO conserva la intención productiva; NEXO conserva inventario, reservas y movimientos.

La preparación consume evidencia NEXO sin copiar su ledger como fuente editable FOGO.

```text
FOGO: ORDEN + RECETA/VERSION + REQUERIMIENTO MATERIAL
→ NEXO: VALIDAR / RESERVAR
→ FOGO: EVALUAR READINESS
```

Reglas:

1. stock visible no equivale a reserva;
2. reserva completa es necesaria cuando el material la exige, pero no demuestra por sí sola readiness de todos los recursos;
3. reserva parcial conserva faltante y excepción explícita cuando pueda continuar;
4. FOGO no fabrica stock inexistente;
5. NEXO no modifica receta para cubrir faltantes;
6. el inicio no consume materiales por el mero hecho de confirmar que están listos.

---

#### 16. Recursos adicionales y condiciones de preparación

`MATERIALS_READY` exige que los materiales **y los demás recursos aplicables** estén preparados y validados.

La UX puede mostrar, cuando exista fuente autoritativa:

- equipo o estación requerida;
- condición operativa o de seguridad aplicable;
- preparación física necesaria;
- dependencias previas;
- restricciones de lote o material;
- condición temporal relevante.

Cuando una fuente todavía no esté integrada o no sea fresca, la UX usa `NO_VERIFICADO`; nunca convierte desconocimiento en readiness.

---

#### 17. Área, actor y turno

Para los productores ordinarios, la preparación conserva exactamente el área efectiva recibida del contexto operativo.

No se permite:

- cambiar de área desde la pantalla para ampliar territorio;
- iniciar con un turno finalizado o incompatible;
- usar un check-in aislado como sustituto de turno;
- prestar el área de la receta al actor;
- usar el área del dispositivo como autoridad humana;
- iniciar porque el trabajador puede ver la receta o la orden.

Un cambio de actor, turno, rol, sede o área invalida cualquier decisión previa de preparación.

---

#### 18. Permiso exacto y acción primaria

La acción primaria de inicio exige:

```text
fogo.production.batches.create
```

La UX puede mostrar la superficie bajo contratos de lectura aplicables, pero la mutación se habilita solo cuando la autorización exacta de creación queda demostrada de forma fresca.

No autorizan el inicio:

- `fogo.access` por sí solo;
- `fogo.production.recipe_book.view`;
- `fogo.production.batches.view`;
- ser supervisor;
- ser `gerencia_operativa`;
- haber creado previamente la receta;
- conocer el identificador de la orden;
- haber abierto la pantalla antes de un cambio de contexto.

---

#### 19. Dispositivo compartido

En estación compartida, la experiencia puede requerir identificación o firma del actor según la política aplicable.

La firma:

- identifica al humano cuando corresponde;
- no concede el permiso;
- no sustituye turno, área, orden, receta/version ni estado;
- no convierte al dispositivo en trabajador;
- no autoriza si el actor dejó de ser elegible;
- queda correlacionada con el efecto cuando el contrato físico la exige.

Una terminal de Cocina, Panadería o Repostería funciona como restricción adicional, nunca como ampliación de territorio.

---

#### 20. Preflight visible antes de iniciar producción

Cuando la instancia alcance `MATERIALS_READY`, la interfaz presenta una comprobación final comprensible antes de ejecutar la transición a `IN_PRODUCTION`.

El preflight debe poder expresar:

| Dimensión | Estado visible |
| --- | --- |
| orden/version | vigente / cambió / inválida |
| receta/version | aplicable / retirada / incompatible |
| actor/turno/área | válido / stale / no autorizado |
| materiales | listos / parciales / bloqueados / no verificados |
| recursos adicionales | listos / bloqueados / no verificados |
| estado de ejecución | preparado / ya iniciado / cancelado / conflicto |
| dispositivo cuando aplique | válido / firma requerida / bloqueado |

El preflight es una proyección de evidencia; no sustituye la revalidación server-side de la acción primaria.

---

#### 21. Confirmación de inicio

La confirmación que representa el inicio real solo está disponible cuando la instancia continúa en `MATERIALS_READY` y no existe un bloqueo conocido.

La intención visible puede expresarse como `Iniciar producción` o equivalente inequívoco.

Al confirmar:

```text
REVALIDAR TODO
→ TRANSICIONAR MATERIALS_READY -> IN_PRODUCTION
→ PERSISTIR RESULTADO DURABLE
→ EMITIR / REGISTRAR HECHO DE PRODUCCION EN CURSO
→ ABRIR EJECUCION DEL LOTE
```

La confirmación no debe ocultar efectos adicionales ajenos al inicio.

---

#### 22. Efectos que NO pertenecen al inicio

La transición inicial no equivale a:

- registrar consumos reales completos;
- descontar definitivamente todos los materiales por conveniencia de interfaz;
- reportar rendimiento real;
- registrar salida final;
- crear stock terminado disponible;
- cerrar empaques;
- liberar calidad;
- publicar producto a inventario;
- finalizar el lote;
- conciliar consumos;
- corregir o anular hechos históricos.

Esos efectos permanecen en sus tareas y contratos propietarios posteriores.

---

#### 23. Idempotencia

La experiencia protege contra doble acción y reintentos inciertos.

Invariantes:

1. doble clic no crea dos lotes ni dos transiciones a `IN_PRODUCTION`;
2. retry después de timeout recupera el resultado durable antes de intentar de nuevo;
3. misma identidad idempotente y misma huella devuelven el mismo resultado empresarial;
4. misma identidad con payload incompatible produce conflicto;
5. una respuesta perdida no permite asumir que el inicio falló;
6. no se generan claves idempotentes nuevas automáticamente para esconder un resultado desconocido.

La implementación concreta de la clave pertenece al trabajo físico propietario; la UX conserva el comportamiento observable.

---

#### 24. Concurrencia y estado stale

Dos actores o dos pestañas no pueden iniciar la misma ejecución desde el mismo estado de origen.

Antes del efecto se compara el estado/version vigente.

Si otro actor ya inició, canceló, sustituyó o modificó materialmente la ejecución:

- el intento posterior no reinicia;
- no retrocede estado;
- no crea un lote paralelo por fallback;
- muestra conflicto recuperable;
- ofrece actualizar y continuar el recurso válido cuando el actor conserve autoridad.

Una pantalla abierta antes de un cambio no mantiene un `ALLOW` histórico.

---

#### 25. Resultado exitoso del inicio

Un inicio exitoso deja al menos una referencia durable y recuperable a la ejecución/lote y una verdad equivalente a:

```text
VPROC-0034.IN_PRODUCTION
```

El hecho canónico asociado es `VPROC-0034.EVT-003 — producción en curso`.

La experiencia posterior abre `VSCREEN-0058 — Ejecución de lote` con la identidad de ejecución ya existente.

No vuelve a la cola presentando la misma orden como si todavía estuviera pendiente de iniciar.

---

#### 26. Resultado de preparación sin inicio

La pantalla puede quedar válidamente en preparación sin iniciar cuando:

- materiales siguen reservándose;
- existe reserva parcial no autorizada para continuar;
- faltan recursos;
- una fuente está `NO_VERIFICADO`;
- el trabajador sale voluntariamente antes de iniciar;
- el turno cambia;
- el permiso deja de estar vigente;
- la orden o receta/version cambian y deben revisarse.

Salir durante preparación no debe crear consumos, salida, terminado o un falso estado `IN_PRODUCTION`.

---

#### 27. Estados de bloqueo y recuperación

La experiencia diferencia al menos:

| Estado | Tratamiento |
| --- | --- |
| `DENY` | no ejecuta efectos; muestra recuperación segura sin revelar información protegida |
| `STALE` | exige refrescar contexto y recurso antes de continuar |
| `CONFLICT` | otro efecto o versión hizo incompatible el intento; recupera verdad actual |
| `MATERIALS_NOT_READY` | permanece en preparación y muestra condición/propietario |
| `NO_VERIFICADO` | no asume readiness; permite reintentar lectura segura cuando corresponda |
| `ERROR_TECNICO` | no se presenta como deny ni como materiales faltantes |
| `RESULTADO_DESCONOCIDO` | recupera resultado durable por correlación/idempotencia antes de repetir |

Todos los estados preservan cero efectos adicionales cuando el inicio no quedó confirmado.

---

#### 28. Continuidad cuando ya existe lote activo

Si al entrar o revalidar se detecta una ejecución no terminal ya iniciada para el trabajo seleccionado:

```text
LOTE ACTIVO AUTORIZADO
→ CONTINUAR EJECUCION
!=
INICIAR OTRO LOTE
```

La experiencia deriva a `FOGO-UX-006` / `VSCREEN-0058` cuando el actor puede continuar.

Si el actor no puede continuar, no crea un lote alternativo para rodear la denegación.

---

#### 29. Tactilidad y prevención de errores

En estación productiva compartida:

- la acción de iniciar se distingue visual y semánticamente de `Atrás`, `Actualizar`, `Ver receta` o `Revisar bloqueo`;
- iniciar no comparte target táctil con acciones secundarias;
- el botón permanece inactivo mientras el preflight no esté resuelto;
- el estado de carga evita doble envío;
- prioridad o readiness no dependen solo de color;
- la confirmación identifica producto, cantidad y área;
- una acción irreversible posterior no se anticipa desde esta pantalla.

No se impone un componente, framework, color o dimensión física concreta.

---

#### 30. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7` se observó una capacidad real pero colapsada:

1. `/production-batches/new` parte de una `recipe_id`, no de una referencia canónica de orden productiva;
2. exige receta `published` con `site_id` y `area_id`;
3. la página comprueba `production.batches.create` usando sede y área de la receta;
4. la Server Action `createBatch` vuelve a entrar con `production.recipe_book.view`;
5. desde dispositivo compartido solicita firma para `production.batches.create`;
6. la llamada a `fogo_create_real_production_batch` no transporta en la superficie observada una referencia canónica de orden ni una identidad empresarial explícita de idempotencia;
7. el formulario captura **consumo real de ingredientes**, **outputs reales** y **empaques** antes de una única confirmación;
8. la misma operación transitoria puede producir efectos de inventario y registrar producción real;
9. el flujo observado no materializa la separación canónica `PRODUCTION_ORDER_READY → MATERIALS_RESERVING → MATERIALS_READY → IN_PRODUCTION`.

Por tanto:

```text
AS-IS: CONFIRMAR PRODUCCION REAL COLAPSADA
!=
TO-BE: PREPARAR -> VALIDAR READINESS -> INICIAR -> EJECUTAR -> REPORTAR / CERRAR
```

La existencia de producción real AS-IS se conserva como evidencia de capacidad, no como contrato objetivo.

---

#### 31. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El inicio AS-IS nace desde receta y no demuestra orden productiva canónica. | riesgo de producción espontánea sin plan/orden trazable | materialización aplicable de `FOGO-AUTH-009` + implementación de `VSCREEN-0057` | todo inicio resuelve orden/version y su vínculo con plan cuando aplica |
| `createBatch` entra con permiso de recetario y el check exacto de creación observado ocurre antes en la página. | un check previo puede quedar stale o ser saltado por llamada directa | `FOGO-AUTH-009::<implementation_unit_id>` | la mutación revalida `fogo.production.batches.create`, actor, contexto, recurso y estado inmediatamente antes del efecto |
| El formulario actual captura consumo, salida y empaque en la misma confirmación. | colapsa inicio, ejecución, resultado y empaque | `FOGO-UX-005..007`, `FOGO-UX-010`, `FOGO-UX-012`, `FOGO-UX-013` + implementaciones propietarias | iniciar solo abre ejecución; efectos posteriores se registran en sus transiciones y superficies propias |
| El RPC actual acopla efectos productivos e inventario. | impide demostrar separación FOGO/NEXO e idempotencia distribuida completa | `INT-PROD-001..005`, materializaciones FOGO/NEXO y paquetes E5 propietarios | reservas, consumos, salidas y reconciliación usan contratos propietarios correlacionados y exactamente una vez |
| No se observa identidad explícita de idempotencia empresarial en la llamada de creación. | retry o respuesta perdida puede duplicar efecto si capas inferiores no lo resuelven | `FOGO-AUTH-009::<implementation_unit_id>` | replay seguro, conflicto de huella y recuperación de resultado quedan demostrados |
| La asociación de firma compartida con el lote puede ser posterior al efecto. | riesgo de evidencia incompleta si falla la asociación | `FOGO-AUTH-014` + contrato de dispositivo aplicable | actor, dispositivo, firma y recurso quedan correlacionados de forma durable y recuperable |

No queda hallazgo narrativo sin propietario y condición de salida.

---

#### 32. Handoff inmediato a FOGO-UX-006

`FOGO-UX-006 — Diseñar producción parcial` recibe una ejecución ya iniciada con:

```text
PROCESS_INSTANCE / LOTE DURABLE
ESTADO = VPROC-0034.IN_PRODUCTION
ORDEN + VERSION
RECETA + VERSION EXACTA
PRODUCTO / SALIDA OBJETIVO
CANTIDAD OBJETIVO + UNIDAD
ACTOR / TURNO / SEDE / AREA DEL INICIO
REFERENCIAS DE MATERIALES PREPARADOS
CORRELACION / IDEMPOTENCIA DEL INICIO
TIMESTAMP / VERSION DE ESTADO
DISPOSITIVO / FIRMA CUANDO APLIQUE
```

La 006 registra progreso y hechos parciales sobre esa ejecución existente; no vuelve a crear el lote ni repite la transición de inicio.

---

#### 33. Handoff al resto de FOGO-UX

| Tarea | Entrada exacta proveniente de FOGO-UX-005 |
| --- | --- |
| `FOGO-UX-006` | lote en `IN_PRODUCTION`, contexto y versión iniciales para capturas parciales |
| `FOGO-UX-007` | inicio y ejecución permanecen separados del cierre terminal |
| `FOGO-UX-008` | la receta operativa consumida por el lote conserva publicación/version exactas |
| `FOGO-UX-010` | rendimiento, desperdicio y resultado reales no se fabrican al iniciar |
| `FOGO-UX-011` | correcciones posteriores preservan el hecho original de inicio |
| `FOGO-UX-012` | materiales y consumos posteriores se correlacionan sin convertir readiness en consumo |
| `FOGO-UX-013` | empaque y salida terminada no se crean por la transición de inicio |
| `FOGO-UX-014` | supervisión no concede `batches.create` ni override de inicio |
| `FOGO-UX-015` | prototipo debe demostrar preparación, bloqueo, readiness, inicio, conflicto y recuperación por separado |

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea desarrolla de forma UX obligaciones ya registradas para ciclo de lote, receta/version exacta, planificación/orden, ejecución productiva, autorización server-side, actor/turno, territorio, concurrencia, idempotencia, integración FOGO/NEXO y experiencia. No introduce una obligación observable nueva fuera de esa cobertura ni modifica texto, estado, relación, secuencia o propietario del registro.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-001` — ciclo productivo de inicio, parciales, consumo, desperdicio, resultado, finalización, cancelación/corrección, actor, turno, cantidades y efectos auditables;
- `TREQ-FOGO-002` — receta publicada inmutable, versión exacta, unidades, escalamiento, tolerancias y snapshot reproducible;
- `TREQ-FOGO-003` — plan y orden derivados con sede, área, cantidad, fechas, prioridad, capacidad, restricciones y materiales trazables;
- `TREQ-FOGO-004` — ejecución con orden, lote, receta/version, materiales, pasos, desviaciones y estados posteriores separados;
- `TREQ-AUTH-008` — carril operativo y dependencia de turno/check-in cuando corresponde;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-011` — identidad efectiva en dispositivo compartido;
- `TREQ-AUTH-013` — autorización server-side sin bypass por UI/API/RPC;
- `TREQ-AUTH-014` — invalidación de autoridad stale;
- `TREQ-AUTH-015` — evidencia correlacionable de actor, contexto, permiso, recurso, decisión, estado y tiempo;
- `TREQ-UX-001` — tarea actual, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye una modificación del Registro 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@58de85c3aa6d65276a16450903a5d6fc1578c9f7`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `FOGO-AUTH-009`, `FOGO-AUTH-013`, `FOGO-AUTH-014`, `VSCREEN-0057`, estados/eventos de `VPROC-0034`, contrato FOGO ↔ NEXO, cobertura 04A vigente y el AS-IS de `/production-batches/new`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron órdenes, reservas, materiales, turnos, firmas, lotes, concurrencia, retries ni pruebas con trabajadores reales. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-005` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 37. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0057` conserva identidad `fogo` y `VPROC-0034::STEP-PREPARE_AND_START_BATCH`;
- [ ] la entrada proviene de orden productiva referenciable y no de una receta aislada;
- [ ] `PRODUCTION_ORDER_READY`, `MATERIALS_RESERVING`, `MATERIALS_READY` e `IN_PRODUCTION` permanecen distintos;
- [ ] preparar no se presenta como producción iniciada;
- [ ] reserva NEXO no se presenta automáticamente como `MATERIALS_READY`;
- [ ] `MATERIALS_READY -> IN_PRODUCTION` representa el inicio productivo;
- [ ] la pantalla revalida actor, turno, rol, sede, área y permiso antes de preparar/iniciar según corresponda;
- [ ] la mutación exige `fogo.production.batches.create` y no hereda autoridad de lectura;
- [ ] orden y versión se revalidan antes del efecto;
- [ ] receta publicada y versión exacta se revalidan antes del efecto;
- [ ] una versión retirada o incompatible no puede originar nuevo lote;
- [ ] cantidad objetivo procede de la orden y no se amplía mediante campo cliente sin contrato propietario;
- [ ] escalamiento de materiales es determinista y reproducible;
- [ ] pendiente, reservando, reserva parcial, materiales listos, bloqueado y no verificado permanecen distintos;
- [ ] desconocimiento de materiales/recursos no se presenta como readiness;
- [ ] FOGO conserva orden/receta/ejecución y NEXO conserva inventario/reserva/movimiento;
- [ ] readiness no se convierte en consumo;
- [ ] firma de dispositivo no concede permiso;
- [ ] preflight visible no sustituye autorización server-side;
- [ ] doble clic no duplica lote ni transición;
- [ ] retry recupera resultado antes de repetir;
- [ ] concurrencia no permite dos inicios sobre el mismo estado de origen;
- [ ] un estado stale obliga a refrescar y reautorizar;
- [ ] un lote ya activo deriva a continuidad y no ofrece segundo inicio;
- [ ] el inicio exitoso deja una ejecución durable en `IN_PRODUCTION`;
- [ ] `VPROC-0034.EVT-003` representa producción en curso sin afirmar cierre ni calidad;
- [ ] iniciar no registra por sí solo consumo completo, resultado final, empaque, calidad, inventario disponible o cierre;
- [ ] la UX diferencia deny, stale, conflicto, materiales no listos, no verificado, error técnico y resultado desconocido;
- [ ] `FOGO-UX-006` recibe una ejecución existente y no repite creación/inicio;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 38. Límites

Esta tarea no:

- implementa `VSCREEN-0057`;
- crea o modifica RPC, tablas, vistas, RLS, grants, migraciones o datos;
- crea permisos nuevos;
- redefine la cola de `FOGO-UX-004`;
- redefine planificación de `VPROC-0033`;
- administra recetas maestras;
- publica recetas;
- modifica prioridades u órdenes;
- crea una regla nueva de parcialidad o sustitución de materiales;
- redefine reservas NEXO;
- registra consumo real completo;
- registra producción parcial;
- reporta resultado final;
- crea empaque terminado;
- libera calidad;
- publica stock terminado;
- finaliza el lote;
- corrige o anula hechos históricos;
- inventa nombres físicos de campos o esquemas;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-004 — Mostrar producción pendiente del turno`

**TAREA ACTUAL APROBADA**
`FOGO-UX-005 — Diseñar inicio de lote`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-006 — Diseñar producción parcial`

### ✅ FOGO-UX-006 — Diseñar producción parcial

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-005 — Diseñar inicio de lote
**Tarea siguiente:** FOGO-UX-007 — Diseñar finalización de lote
**Tipo de tarea:** diseño documental integral de la experiencia de ejecución activa y captura incremental de producción sobre `VSCREEN-0058` y `VSCREEN-0059`, preservando lote, orden, receta/version, actor/turno, deltas, acumulados, consumos correlacionados, pausas, incidencias, concurrencia, idempotencia e historia sin cerrar prematuramente la ejecución
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la experiencia canónica de una ejecución productiva ya iniciada para que el trabajador pueda continuar un lote real, seguir su receta/version aplicable y registrar hechos parciales sin convertir cada captura en cierre, sin sobrescribir historia y sin confundir un dato productivo FOGO con un movimiento físico de inventario NEXO.

La regla raíz queda:

```text
LOTE DURABLE YA INICIADO
+
VPROC-0034.IN_PRODUCTION VIGENTE
+
ORDEN + RECETA/VERSION EXACTAS
+
ACTOR + TURNO + SEDE + AREA FRESCOS
+
CAPACIDAD CANONICA CONCRETA DE LA ACCION
+
DELTA PRODUCTIVO VALIDO
+
VERSION ESPERADA + IDENTIDAD IDEMPOTENTE
=
CAPTURA PARCIAL AUTORIZABLE
```

La experiencia separa dos responsabilidades coordinadas:

```text
VSCREEN-0058
EJECUCION DE LOTE / WORKSPACE ACTIVO

!=

VSCREEN-0059
REGISTRO PARCIAL / CAPTURA INCREMENTAL
```

Ninguna de las dos superficies equivale por sí sola a finalización, calidad liberada, stock terminado disponible o cierre productivo.

---

#### 2. Entrada aprobada de FOGO-UX-005

`FOGO-UX-005` entrega a esta tarea una ejecución ya iniciada con, como mínimo:

```text
PROCESS_INSTANCE / LOTE DURABLE
ESTADO = VPROC-0034.IN_PRODUCTION
ORDEN + VERSION
RECETA + VERSION EXACTA
PRODUCTO / SALIDA OBJETIVO
CANTIDAD OBJETIVO + UNIDAD
ACTOR / TURNO / SEDE / AREA DEL INICIO
REFERENCIAS DE MATERIALES PREPARADOS
CORRELACION / IDEMPOTENCIA DEL INICIO
TIMESTAMP / VERSION DE ESTADO
DISPOSITIVO / FIRMA CUANDO APLIQUE
```

`FOGO-UX-006` no vuelve a crear el lote ni repite `MATERIALS_READY -> IN_PRODUCTION`.

La continuidad del lote tampoco significa continuidad automática de la autoridad personal. Cada captura vuelve a resolver el contexto aplicable.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato UX de ejecución parcial se define una sola vez;
2. no existe instancia física propia de `FOGO-UX-006`;
3. esta tarea no implementa rutas, componentes, RPC, persistencia, permisos ni efectos NEXO;
4. las materializaciones posteriores consumen el contrato sin reinterpretar qué constituye un parcial, un acumulado, un consumo o un cierre;
5. cualquier modificación de Supabase perteneciente a VENTO continúa bajo `vento-group-sas/vento-shell` y el trabajo físico propietario correspondiente.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-001 — Inventariar procesos reales de producción`;
- `FOGO-UX-002 — Separar cocina, panadería y repostería`;
- `FOGO-UX-003 — Diseñar inicio por área productiva`;
- `FOGO-UX-004 — Mostrar producción pendiente del turno`;
- `FOGO-UX-005 — Diseñar inicio de lote`;
- `FOGO-AUTH-010 — Proteger producción parcial`;
- `FOGO-AUTH-014 — Registrar actor y turno`;
- `VSCREEN-0058 — Ejecución de lote`;
- `VSCREEN-0059 — Registro parcial de producción`;
- `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada`;
- `VPROC-0034::STEP-EXECUTE_BATCH — Ejecutar lote`;
- `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS — Registrar avance parcial`;
- estados y eventos canónicos de `VPROC-0034`;
- `INT-PROD-002 — Definir contrato para que NEXO registre el consumo`;
- Registro 04A vigente de FOGO y autorización;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

---

#### 5. Identidades canónicas de las superficies

La tarea gobierna dos superficies diferentes pero contiguas:

| Dimensión | Ejecución activa | Captura parcial |
| --- | --- | --- |
| Pantalla | `VSCREEN-0058 — Ejecución de lote` | `VSCREEN-0059 — Registro parcial de producción` |
| Aplicación | `fogo` | `fogo` |
| Proceso | `VPROC-0034` | `VPROC-0034` |
| Paso | `VPROC-0034::STEP-EXECUTE_BATCH — Ejecutar lote` | `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS — Registrar avance parcial` |
| Interacción | `EXECUTE` | `CAPTURE` |
| Momento | `IN_PROGRESS` | `IN_PROGRESS` |
| Acción funcional primaria | `VSCREEN-0058::PRIMARY` | `VSCREEN-0059::PRIMARY` |
| Estado ordinario | `VPROC-0034.IN_PRODUCTION` | `VPROC-0034.IN_PRODUCTION` |

Regla de separación:

```text
WORKSPACE DE EJECUCION
!=
COMANDO DE CAPTURA PARCIAL
!=
ACCION DE FINALIZACION
```

---

#### 6. Rol de VSCREEN-0058

`VSCREEN-0058` es el workspace operativo del lote activo.

Debe permitir reconocer inmediatamente:

- qué lote y ejecución están activos;
- qué producto/salida se está produciendo;
- qué cantidad objetivo y unidad gobiernan la ejecución;
- qué receta/version exacta aplica;
- qué área productiva es propietaria del trabajo;
- qué actor/turno están operando en el momento actual;
- qué estado real conserva `VPROC-0034`;
- qué progreso confirmado existe;
- qué bloqueos, incidencias o handoffs pendientes existen;
- qué acción siguiente está permitida.

No convierte ese workspace en editor de orden, receta, planificación o inventario.

---

#### 7. Rol de VSCREEN-0059

`VSCREEN-0059` captura un hecho incremental de una ejecución activa.

Su contrato mínimo es:

```text
ACUMULADO ANTERIOR VERIFICADO
+
DELTA ACTUAL PROPUESTO
+
CONTEXTO FRESCO
+
VERSION ESPERADA
→ VALIDACION AUTORITATIVA
→ CAPTURA DURABLE
→ ACUMULADO RESULTANTE VERIFICADO
```

El usuario no edita el acumulado histórico directamente.

Cada captura produce una nueva evidencia vinculada al lote existente y no sustituye capturas anteriores.

---

#### 8. Condición de entrada a la ejecución parcial

El workspace y la captura ordinaria solo operan cuando la instancia de `VPROC-0034` continúa realmente en:

```text
VPROC-0034.IN_PRODUCTION
```

No son equivalentes para registrar un parcial ordinario:

```text
PRODUCTION_ORDER_READY
MATERIALS_RESERVING
MATERIALS_READY
OUTPUT_REPORTED
CONSUMPTION_RECONCILIATION_PENDING
READY_FOR_QUALITY
PRODUCTION_EXECUTION_COMPLETED
```

Si el recurso ya avanzó a un estado posterior, la UX no lo hace retroceder para aceptar otro parcial.

---

#### 9. Encabezado operativo persistente del lote

Durante la ejecución debe mantenerse visible, con densidad operativa y sin sobrecargar la pantalla:

1. lote / referencia operativa reconocible;
2. producto o salida principal;
3. cantidad objetivo y unidad;
4. área productiva;
5. estado actual;
6. receta/version aplicada;
7. actor/turno efectivos de la sesión de trabajo actual;
8. progreso confirmado cuando pueda demostrarse;
9. existencia de bloqueos o diferencias pendientes;
10. estado de sincronización/confirmación de la última captura cuando sea material.

El encabezado no expone UUID, scopes, SQL, RLS, secretos, logs o datos de otras áreas como requisito operativo ordinario.

---

#### 10. Receta operativa durante la ejecución

El lote conserva la versión exacta de receta fijada para su ejecución.

`VSCREEN-0058` puede enlazar o presentar instrucciones operativas necesarias para ejecutar esa versión, pero:

- no edita la definición maestra;
- no cambia de versión silenciosamente;
- no sustituye `VSCREEN-0061 — Receta operativa` cuando se requiera el detalle completo;
- no adopta una versión nueva publicada después del inicio;
- no reinterpreta una desviación como cambio de receta;
- conserva el snapshot/version que explica el lote histórico.

Una versión retirada después del inicio no reescribe el lote ya iniciado; cualquier restricción sobre continuar deberá resolverse por el contrato propietario, no mediante reemplazo silencioso.

---

#### 11. Semántica exacta de una captura parcial

Una captura parcial representa un hecho incremental real ocurrido durante la ejecución.

Puede conservar, según aplique:

- paso o etapa ejecutada;
- cantidad observada durante el intervalo;
- tiempo o duración real;
- material utilizado declarado por FOGO;
- salida parcial observada;
- merma, desperdicio o desviación observados;
- medición o control operacional asociado;
- pausa;
- incidencia;
- comentario estructurado o motivo cuando corresponda;
- evidencia autorizada;
- referencias NEXO correlacionadas cuando exista efecto físico.

No significa por sí sola:

```text
LOTE TERMINADO
SALIDA FINAL
RENDIMIENTO FINAL
CONSUMO NEXO CONCILIADO
CALIDAD LIBERADA
PRODUCTO DISPONIBLE
INVENTARIO TERMINADO PUBLICADO
CIERRE PRODUCTIVO APROBADO
```

---

#### 12. Delta actual y acumulado

La UX diferencia siempre:

```text
DELTA ACTUAL
!=
ACUMULADO CONFIRMADO
```

Contrato conceptual:

```text
ACUMULADO_ANTERIOR_VERIFICADO
+
DELTA_ACTUAL_ACEPTADO
=
ACUMULADO_RESULTANTE_VERIFICADO
```

Reglas:

1. el cliente no envía un acumulado autoritativo que reemplace la historia;
2. cada delta conserva unidad, precisión y conversión aplicables;
3. un delta negativo no funciona como corrección genérica;
4. el acumulado se calcula o valida contra la versión vigente;
5. una diferencia frente al plan permanece visible;
6. la identidad del lote no cambia por cada captura;
7. las capturas confirmadas anteriores permanecen inmutables.

---

#### 13. Cantidad objetivo, progreso y saldo

Cuando las cantidades sean comparables bajo una unidad canónica compatible, la experiencia puede proyectar:

```text
CANTIDAD OBJETIVO
ACUMULADO CONFIRMADO
DELTA ACTUAL
SALDO PRODUCTIVO PROYECTADO
```

La proyección del saldo sirve para orientar al trabajador y no modifica la orden.

La UX conserva estas reglas:

- producir menos hasta el momento no reduce la cantidad planificada;
- producir más no amplía retroactivamente la orden;
- diferencia y sobreproducción quedan explícitas;
- cualquier aceptación final con diferencia pertenece al cierre o decisión propietaria;
- la pantalla no convierte una proyección local en verdad empresarial persistida.

---

#### 14. Pasos y operaciones principales del lote

`VSCREEN-0058` guía la ejecución principal de la receta/version aplicada.

Cuando el contrato de receta exponga pasos u operaciones:

- se identifica el paso actual o el contexto operacional pertinente;
- una captura puede asociarse al paso ejecutado;
- los pasos ya confirmados no se borran para “volver atrás”;
- repetir un paso físico se registra como un nuevo hecho cuando el contrato lo permita;
- una desviación del procedimiento no reescribe la receta esperada;
- la secuencia mostrada debe corresponder a la versión exacta del lote.

La tarea no inventa un motor de workflow físico nuevo ni congela nombres de columnas para pasos.

---

#### 15. Pausas e interrupciones ordinarias

Una pausa operativa no equivale automáticamente a cancelación, cierre ni finalización.

La UX debe permitir distinguir, cuando aplique:

```text
PAUSA TEMPORAL
INTERRUPCION CON BLOQUEO
INCIDENCIA
CANCELACION / DETENCION PROPIETARIA
```

Una pausa confirmada conserva contexto suficiente para explicar discontinuidad temporal sin borrar el progreso previo.

Al reanudar:

- se vuelve a resolver actor/contexto;
- se verifica que el lote continúe en estado compatible;
- no se reutiliza una autorización stale;
- las capturas previas permanecen intactas.

---

#### 16. Incidencias y desviaciones

Durante `IN_PRODUCTION` puede aparecer una incidencia o desviación.

La experiencia debe permitir registrar su existencia y contexto sin convertirla automáticamente en:

- corrección de historia;
- cambio de receta;
- anulación del lote;
- disposición de calidad;
- desperdicio final;
- override de planificación.

Cuando la incidencia exija otra acción empresarial, la UX muestra el bloqueo o handoff hacia la tarea propietaria y conserva la ejecución en su verdad actual.

---

#### 17. Salida parcial, rendimiento y merma observados

Una captura puede conservar salida parcial, rendimiento observado, merma o desperdicio observado cuando aplique.

Esos hechos son incrementales y no equivalen a resultado final.

Reglas:

1. una salida parcial no fuerza `VPROC-0034.OUTPUT_REPORTED`;
2. el rendimiento parcial no se presenta como rendimiento final;
3. la merma parcial no reemplaza la conciliación final;
4. una diferencia real no modifica la receta esperada;
5. los valores confirmados sirven como evidencia para `FOGO-UX-007` y tareas posteriores;
6. una corrección de una captura ya aceptada usa el contrato correctivo propietario, no edición in-place.

---

#### 18. Materiales y consumo: separación FOGO / NEXO

Durante la ejecución parcial:

```text
CAPTURA FOGO DE USO / AVANCE
!=
MOVIMIENTO NEXO CONFIRMADO
!=
CONSUMO NEXO RECONCILIADO
```

FOGO conserva:

- ejecución;
- orden;
- receta/version;
- material esperado;
- cantidad real observada o declarada como utilizada;
- clasificación productiva de consumo, devolución, desperdicio o desviación.

NEXO conserva:

- existencia física;
- reserva;
- fuente física;
- retiro/consumo físico;
- movimiento canónico;
- proyecciones de stock;
- posting y conciliación.

La UX no presenta una captura FOGO como stock descontado hasta que el contrato NEXO produzca evidencia autoritativa suficiente.

---

#### 19. Consumo parcial y efectos pendientes

`INT-PROD-002` admite consumo total, parcial y distribuido entre varias fuentes físicas.

La experiencia debe distinguir, cuando exista el handoff:

- uso productivo capturado;
- efecto NEXO solicitado;
- efecto NEXO pendiente;
- efecto físico aplicado;
- confirmación pendiente del consumidor;
- reconciliación completada;
- diferencia abierta.

Un efecto pendiente no bloquea necesariamente toda captura productiva futura, pero nunca se presenta como reconciliado por conveniencia de interfaz.

La política concreta para continuar ante diferencias pertenece al contrato propietario y debe fallar cerrado cuando la seguridad del efecto no pueda demostrarse.

---

#### 20. Datos mínimos de una captura

Sin imponer nombres físicos, cada parcial durable debe poder reconstruir al menos:

- lote / ejecución;
- instancia de `VPROC-0034`;
- orden y versión;
- receta y versión exacta;
- producto/salida aplicable;
- sede y área persistidas;
- estado y versión del agregado;
- cantidad planificada y unidad;
- delta actual;
- acumulado anterior verificable;
- acumulado resultante verificable;
- materiales y deltas productivos cuando apliquen;
- salida parcial, merma o desviación cuando apliquen;
- paso, tiempo, pausa, incidencia o control pertinente;
- actor efectivo;
- rol operativo;
- turno/check-in cuando correspondan;
- dispositivo cuando aplique;
- momento de ocurrencia y registro;
- correlación, causalidad, request e idempotencia cuando apliquen;
- referencia de resultado y auditoría.

---

#### 21. Actor, turno y área en cada captura

Cada captura pertenece al humano que efectivamente realiza la acción.

El actor puede cambiar legítimamente entre parciales del mismo lote.

Ese cambio:

- no cambia la identidad del lote;
- no transfiere autoridad previa;
- exige resolución fresca de actor/turno/rol/sede/área;
- conserva quién hizo cada parcial;
- no permite editar hechos del actor anterior;
- invalida drafts o decisiones sensibles que dependan del actor anterior cuando el contrato aplicable así lo exija.

Compartir Centro de Producción no une Cocina Caliente, Galletería y Panadería y Repostería en un mismo territorio.

---

#### 22. Capacidad exacta de mutación

El catálogo FOGO vigente no demuestra una clave dedicada ya materializada para la captura parcial.

Por tanto, la experiencia adopta fail-closed:

```text
fogo.production.batches.view
!=
AUTORIDAD PARA REGISTRAR PARCIAL

fogo.production.batches.create
!=
AUTORIDAD AUTOMATICA PARA REGISTRAR PARCIAL
```

`VSCREEN-0059::PRIMARY` solo puede quedar ejecutable cuando la materialización propietaria vincule la captura a una capacidad canónica concreta y registrada que cubra exactamente esa mutación.

La UX no inventa una clave nueva, wildcard, alias `production.*`, permiso derivado del rol ni compatibilidad temporal basada en ausencia de check.

Mientras ese binding no exista, la experiencia puede presentar el estado y explicar el bloqueo, pero no fabricar autoridad para guardar el parcial.

---

#### 23. Dispositivo compartido

En estación compartida, cada captura aplica la intersección:

```text
LIMITES DEL DISPOSITIVO
∩
AUTORIDAD DEL ACTOR EFECTIVO
∩
TERRITORIO DEL LOTE
∩
ESTADO ACTUAL
```

Cuando corresponda identificación o firma del actor:

- se resuelve para la captura actual;
- identifica al humano;
- no concede la capacidad;
- no amplía sede/área;
- no autoriza un lote en estado incompatible;
- no permite reutilizar indefinidamente la firma de otro parcial o actor.

---

#### 24. Flujo de captura parcial

El flujo UX mínimo queda:

```text
LOTE ACTIVO
→ ABRIR WORKSPACE VSCREEN-0058
→ RESOLVER ESTADO + CONTEXTO FRESCOS
→ ABRIR CAPTURA VSCREEN-0059
→ MOSTRAR ACUMULADO CONFIRMADO
→ INGRESAR DELTA / HECHO ACTUAL
→ VALIDAR UNIDAD + CAMPOS + REGLAS
→ REVALIDAR CAPACIDAD + VERSION + TERRITORIO
→ CONFIRMAR UNA VEZ
→ RECUPERAR RESULTADO DURABLE
→ ACTUALIZAR ACUMULADO Y TIMELINE
→ CONTINUAR EN IN_PRODUCTION
```

Guardar un parcial no ejecuta automáticamente la finalización.

---

#### 25. Idempotencia

Cada captura con efecto usa una identidad idempotente estable dentro de su alcance.

Huella conceptual mínima:

```text
TIPO_DE_ACCION
+
LOTE / INSTANCIA
+
VERSION ESPERADA
+
ACTOR EFECTIVO
+
DELTA NORMALIZADO
+
UNIDADES
+
PASO / CONTEXTO OPERACIONAL
+
REFERENCIAS DE EFECTO
```

Resultados obligatorios:

| Caso | Resultado |
| --- | --- |
| misma identidad + misma huella | retorna resultado durable previo; no duplica captura |
| misma identidad + huella incompatible | conflicto; cero segundo efecto |
| respuesta perdida | recupera resultado antes de repetir |
| operación aún en curso | estado recuperable; no crea una captura paralela para “asegurar” |

Un retry técnico no representa nueva producción física.

---

#### 26. Concurrencia y control de versión

Dos capturas concurrentes no pueden perder actualizaciones ni contabilizar dos veces el mismo hecho.

La materialización usará versión esperada, compare-and-swap, lock, claim o mecanismo equivalente.

Invariantes UX:

1. una captura aceptada se aplica una sola vez;
2. un acumulado nuevo incorpora todos los deltas confirmados;
3. un submit stale no sobrescribe progreso posterior;
4. si otro actor avanzó el recurso, se recupera el estado actual;
5. el proceso no retrocede a una versión anterior;
6. si cambia actor, turno, área o estado, se reautoriza antes del efecto;
7. la pantalla no oculta un conflicto como “guardado correctamente”.

---

#### 27. Timeline e historia de capturas

El lote debe poder presentar una historia operacional resumida que permita entender qué ocurrió sin editar hechos confirmados.

Cada entrada relevante puede mostrar, según aplique:

- momento;
- actor;
- delta o hecho registrado;
- acumulado resultante;
- paso o contexto;
- pausa/incidencia/desviación;
- estado de efecto NEXO relacionado;
- resultado confirmado o pendiente.

La timeline es una proyección de hechos durables, no una lista editable de formularios previos.

---

#### 28. Frescura y revalidación

Una pantalla abierta puede quedar stale por cambios de:

- actor;
- turno/check-in;
- rol;
- sede/área;
- dispositivo;
- capacidad;
- estado/version del lote;
- orden/version;
- receta/version vinculada;
- captura concurrente;
- efecto NEXO material para la operación actual.

Antes de cada mutación se revalida el conjunto requerido.

Un `ALLOW` obtenido al cargar el workspace no autoriza indefinidamente capturas posteriores.

---

#### 29. Relación con VPROC-0034.EVT-003

`VPROC-0034.EVT-003 — producción en curso` conserva la semántica de ejecución activa con captura de consumos, tiempos y desviaciones.

Una captura parcial:

- puede producir o actualizar evidencia que sustenta producción en curso;
- no crea un catálogo paralelo de eventos;
- no convierte cada delta en un cierre empresarial;
- conserva el mismo proceso/lote cuando corresponde;
- mantiene correlación con su comando/captura.

No se inventa `EVT-*` adicional en esta tarea.

---

#### 30. Frontera con OUTPUT_REPORTED

`VPROC-0034.OUTPUT_REPORTED` significa que se registraron salidas, rendimiento y merma como un resultado productivo reportado sin liberación de calidad.

Por tanto:

```text
PARCIAL CONFIRMADO
!=
OUTPUT_REPORTED AUTOMATICO
```

Reglas:

1. `produced_qty > 0` no obliga a cambiar estado;
2. una salida parcial puede permanecer como evidencia incremental;
3. la transición a `OUTPUT_REPORTED` requiere su propio contrato;
4. `OUTPUT_REPORTED` no implica consumo reconciliado;
5. `OUTPUT_REPORTED` no implica finalización, calidad liberada o stock disponible.

---

#### 31. Frontera con finalización

`FOGO-UX-007 — Diseñar finalización de lote` recibe una ejecución con todos sus parciales confirmados y pendientes visibles.

La acción de finalizar no está embebida dentro de `Guardar parcial`.

Antes del handoff a cierre, la experiencia puede mostrar que existen:

- cantidad objetivo;
- acumulado productivo;
- diferencias;
- consumos/efectos NEXO confirmados o pendientes;
- merma/desperdicio observado;
- incidencias;
- controles pendientes;
- estado/version actual.

La 006 no decide si esos hechos son suficientes para finalizar; entrega evidencia fiel a la 007.

---

#### 32. Interrupción, abandono y recuperación

Si la sesión termina, el dispositivo cambia o el trabajador abandona el workspace:

- los parciales confirmados permanecen;
- un draft no confirmado no se presenta como hecho productivo;
- un submit con resultado incierto se reconcilia antes de repetir;
- el lote no se marca como finalizado por cierre de pestaña;
- reingresar vuelve a resolver contexto, estado y versión;
- una captura en curso recuperable se consulta antes de crear otra.

La continuidad del proceso no depende de mantener una página web abierta.

---

#### 33. Estados de experiencia

La UX distingue al menos:

| Estado | Significado |
| --- | --- |
| `ACTIVO` | lote en `IN_PRODUCTION`, contexto válido y acciones disponibles según capacidad |
| `SIN_CAPACIDAD_DE_CAPTURA` | el actor puede ver el lote, pero no existe autoridad concreta para registrar parcial |
| `STALE` | contexto, estado o versión dejaron de ser frescos |
| `CONFLICT` | otra captura/acción avanzó el recurso o la versión esperada ya no coincide |
| `PENDIENTE_DE_EFECTO` | la captura productiva existe pero un handoff material relacionado no está conciliado |
| `RESULTADO_DESCONOCIDO` | el submit pudo producir efecto y debe recuperarse antes de reintentar |
| `DENY` | no existe autoridad vigente sobre el recurso/acción |
| `ERROR_TECNICO` | una dependencia técnica impide resolver la operación con seguridad |
| `ESTADO_NO_COMPATIBLE` | el lote ya no está en `IN_PRODUCTION` para parcial ordinario |

Ninguno de estos estados se presenta falsamente como “sin cambios pendientes” si existe evidencia contradictoria.

---

#### 34. Tactilidad y densidad operativa

En una estación productiva compartida:

- el lote y producto permanecen reconocibles;
- el delta actual se diferencia visualmente del acumulado;
- la acción `Guardar parcial` o equivalente tiene un único significado;
- `Guardar parcial` se separa de `Finalizar lote`;
- targets táctiles principales no se superponen;
- bloqueo, pendiente y éxito no dependen solo de color;
- el estado de envío bloquea doble submit;
- la última captura confirmada queda visible sin obligar a navegar a auditoría técnica;
- acciones secundarias no esconden la acción primaria ni la cambian de semántica.

No se impone framework, color, tamaño físico o componente específico.

---

#### 35. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7` se observa:

| Superficie / evidencia AS-IS | Qué demuestra | Qué no demuestra |
| --- | --- | --- |
| `/production-batches/new` | existe captura de cantidades reales, consumos, outputs y empaques dentro de la creación | ejecución incremental separada después del inicio |
| `fogo_create_real_production_batch` | capacidad transitoria para producir efectos productivos/físicos | lifecycle `VSCREEN-0058` / `VSCREEN-0059`, parciales versionados o separación FOGO/NEXO completa |
| `/production-batches` | consulta lotes y `production_batch_consumptions` | mutación parcial protegida ni timeline de deltas |
| ausencia de ruta/superficie dedicada observada | el snapshot no contiene workspace canónico de lote activo ni captura parcial separada | que la necesidad canónica no exista |

La implementación actual permanece clasificada como:

```text
VSCREEN-0058 = AS_IS_COLLAPSED
VSCREEN-0059 = NO_DEDICATED_SURFACE_OBSERVED
```

La tarea no interpreta el flujo colapsado como contrato objetivo.

---

#### 36. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| No existe una superficie física separada que materialice `VSCREEN-0058`. | el lote en curso no tiene workspace canónico verificable | implementación propietaria FOGO consumiendo `FOGO-UX-006` | existe workspace de lote activo con estado, receta/version, contexto, progreso y handoffs sin recrear el lote |
| No existe una superficie física separada que materialice `VSCREEN-0059::PRIMARY`. | no puede demostrarse captura incremental protegida | `FOGO-AUTH-010::<implementation_unit_id>` + implementación propietaria | una acción parcial concreta registra deltas versionados, idempotentes y auditables sobre lote `IN_PRODUCTION` |
| El catálogo FOGO no demuestra una capacidad dedicada a captura parcial. | una mutación podría inferirse indebidamente desde lectura o creación | `FOGO-AUTH-010::<implementation_unit_id>` con normalización/migración propietaria | la acción queda ligada a una capacidad canónica concreta registrada y los permisos no equivalentes fallan cerrado |
| El AS-IS captura consumos/outputs/empaques durante creación. | inicio y ejecución parcial están colapsados | `FOGO-UX-005..007`, `FOGO-AUTH-009..011` y consumidor físico propietario | creación/inicio, ejecución parcial y cierre son operaciones separadas con estados y efectos propios |
| Los consumos actuales están acoplados al RPC FOGO. | FOGO puede aparentar propiedad del efecto físico | `INT-PROD-002` + implementaciones FOGO/NEXO | FOGO captura uso productivo y NEXO produce/conciliа el movimiento físico exactamente una vez |
| No se observan parciales versionados acumulables en runtime. | retry/concurrencia podrían sobrescribir o duplicar progreso | `FOGO-AUTH-010::<implementation_unit_id>` | múltiples deltas conservan versión esperada, acumulado server-side, idempotencia y orden reconstruible |
| Pausa/incidencia no tiene superficie canónica materializada observada. | interrupciones pueden perder contexto o confundirse con cierre | implementación propietaria de `VSCREEN-0058/0059` | pausa/incidencia quedan registradas sin cerrar ni borrar progreso y con handoff al propietario cuando corresponda |

No queda hallazgo narrativo sin propietario y condición de salida.

---

#### 37. Handoff inmediato a FOGO-UX-007

`FOGO-UX-007 — Diseñar finalización de lote` recibe una ejecución existente con:

```text
LOTE / PROCESS_INSTANCE DURABLE
ESTADO Y VERSION ACTUALES
ORDEN + VERSION
RECETA + VERSION EXACTA
CANTIDAD OBJETIVO + UNIDAD
CAPTURAS PARCIALES INMUTABLES
ACUMULADO PRODUCTIVO VERIFICADO
PASOS / TIEMPOS / PAUSAS / INCIDENCIAS CUANDO APLIQUEN
MATERIALES Y CONSUMOS PRODUCTIVOS CAPTURADOS
REFERENCIAS NEXO Y SU ESTADO DE CONCILIACION
SALIDAS PARCIALES / RENDIMIENTO / MERMA OBSERVADOS
DIFERENCIAS ABIERTAS
ACTORES / TURNOS DE CADA CAPTURA
CORRELACION / IDEMPOTENCIA / VERSIONES
PENDIENTES Y BLOQUEOS NO OCULTOS
```

La 007 decide la experiencia de finalización. La 006 no adelanta su transición terminal ni marca automáticamente `OUTPUT_REPORTED`, `READY_FOR_QUALITY` o `PRODUCTION_EXECUTION_COMPLETED`.

---

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas para producción parcial, ejecución productiva, receta/version, consumos, desperdicio, actor/turno, autorización de mutaciones, territorio, idempotencia, concurrencia, integración FOGO/NEXO e historia no destructiva. No introduce una obligación verificable nueva fuera de esa cobertura ni modifica texto, estado, relación, secuencia o propietario del registro.

---

#### 39. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-001` — ciclo productivo completo con producción parcial, consumo, desperdicio, resultado, actor, turno, cantidades y efectos auditables;
- `TREQ-FOGO-002` — receta publicada inmutable, versión exacta, materiales, unidades, rendimiento, merma, sustituciones y desviaciones sin sobrescritura;
- `TREQ-FOGO-004` — ejecución con orden, lote, receta/version, cantidades, materiales, pasos, desviaciones, rendimiento, merma y estados posteriores separados;
- `TREQ-NEXO-011` — fuente canónica de movimientos/proyecciones, reservas diferenciadas, consumo atómico o idempotente y prevención de doble movimiento;
- `TREQ-INTEGRATION-003` — identidad idempotente, huella lógica, resultado durable, reintento, resultado desconocido y conciliación;
- `TREQ-INTEGRATION-011` — consumo FOGO hacia NEXO exactamente una vez y correlacionado;
- `TREQ-AUTH-008` — carril operativo y contexto laboral aplicable;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-011` — identidad efectiva en dispositivo compartido;
- `TREQ-AUTH-013` — autorización server-side sin bypass por UI/API/RPC;
- `TREQ-AUTH-014` — invalidación de autoridad stale;
- `TREQ-AUTH-015` — evidencia correlacionable de actor, contexto, permiso, recurso, decisión, estado y tiempo;
- `TREQ-UX-001` — tarea actual, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 40. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@6299d0e89ca47f0185fcb1f640b545908e6a6a84`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, owner FOGO, `FOGO-AUTH-010`, `VSCREEN-0058`, `VSCREEN-0059`, estados/eventos de `VPROC-0034`, `INT-PROD-002`, cobertura 04A vigente y el AS-IS de creación/lista de lotes. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron lotes, parciales, consumos, pausas, incidencias, cambios de turno, concurrencia, retries ni pruebas con trabajadores reales. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-006` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 41. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0058` y `VSCREEN-0059` permanecen como superficies distintas;
- [ ] `VSCREEN-0058` gobierna el workspace de ejecución activa y `VSCREEN-0059` la captura incremental;
- [ ] ambas superficies operan ordinariamente sobre `VPROC-0034.IN_PRODUCTION`;
- [ ] un lote en estado anterior no recibe parciales ordinarios;
- [ ] un lote en estado posterior no retrocede para aceptar un parcial;
- [ ] la receta/version exacta del lote permanece visible y no se sustituye silenciosamente;
- [ ] la UX no edita plan, orden, receta, territorio o identidad del lote desde una captura parcial;
- [ ] delta actual y acumulado histórico permanecen diferenciados;
- [ ] el cliente no puede reemplazar el acumulado autoritativo;
- [ ] un delta negativo no funciona como corrección genérica;
- [ ] cantidad objetivo y progreso no modifican silenciosamente la orden;
- [ ] pasos/operaciones se vinculan a la receta/version vigente sin reescribirla;
- [ ] pausas e incidencias no equivalen a cierre;
- [ ] una salida parcial no equivale a resultado final;
- [ ] merma/desperdicio parcial no cierra conciliación;
- [ ] captura FOGO, movimiento NEXO y consumo reconciliado permanecen distintos;
- [ ] FOGO no fabrica movimientos de inventario;
- [ ] NEXO no reinterpreta receta, orden o clasificación productiva;
- [ ] cada captura conserva actor efectivo y contexto aplicable;
- [ ] cambio de trabajador/turno no transfiere autoridad histórica;
- [ ] los tres territorios productivos permanecen aislados;
- [ ] la captura no obtiene autoridad desde `batches.view` o `batches.create` por inferencia;
- [ ] ausencia de capacidad canónica concreta mantiene la mutación fail-closed;
- [ ] dispositivo compartido identifica al actor sin ampliar autoridad;
- [ ] cada captura con efecto es idempotente;
- [ ] respuesta perdida recupera resultado antes de repetir;
- [ ] concurrencia no pierde ni duplica deltas;
- [ ] una versión stale no sobrescribe progreso posterior;
- [ ] la timeline conserva hechos confirmados sin edición destructiva;
- [ ] `VPROC-0034.EVT-003` se reutiliza sin catálogo paralelo;
- [ ] un parcial no fuerza `OUTPUT_REPORTED`;
- [ ] la finalización queda reservada a `FOGO-UX-007`;
- [ ] salir de la pantalla no finaliza el lote;
- [ ] deny, stale, conflict, pendiente de efecto, resultado desconocido y error técnico permanecen distintos;
- [ ] el AS-IS colapsado no se trata como contrato objetivo;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 42. Límites

Esta tarea no:

- implementa `VSCREEN-0058` ni `VSCREEN-0059`;
- crea rutas físicas;
- crea o modifica RPC, tablas, vistas, RLS, grants, migraciones o datos;
- inventa una capacidad de autorización para parciales;
- redefine el inicio de lote de `FOGO-UX-005`;
- vuelve a crear el lote;
- cambia la orden productiva;
- cambia la receta/version histórica;
- redefine inventario, reservas o movimientos NEXO;
- presenta uso productivo como consumo físico reconciliado;
- diseña el algoritmo de costo;
- finaliza el lote;
- libera calidad;
- crea stock terminado disponible;
- decide empaque final;
- corrige historia mediante edición destructiva;
- convierte un parcial en anulación o cancelación;
- crea un evento empresarial nuevo;
- inventa nombres físicos de columnas, tablas o enums;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-005 — Diseñar inicio de lote`

**TAREA ACTUAL APROBADA**
`FOGO-UX-006 — Diseñar producción parcial`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-007 — Diseñar finalización de lote`

### ✅ FOGO-UX-007 — Diseñar finalización de lote

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-006 — Diseñar producción parcial
**Tarea siguiente:** FOGO-UX-008 — Mostrar receta resumida para operación
**Tipo de tarea:** diseño documental integral de `VSCREEN-0060` para finalizar una ejecución productiva y conducir su cierre productivo conciliado sin fusionar resultado, consumos, calidad, empaque, inventario, reproceso ni correcciones, preservando actor/turno, territorio, estados/versiones, idempotencia, concurrencia, evidencia y handoffs propietarios
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la experiencia canónica de finalización de un lote para que FOGO pueda distinguir de forma inequívoca **terminar la ejecución productiva** de **aprobar el cierre productivo conciliado**, sin convertir ninguno de esos hitos en liberación de calidad, ingreso a inventario, disponibilidad comercial, corrección histórica o movimiento físico de NEXO.

La regla raíz queda:

```text
EJECUCION PRODUCTIVA EXISTENTE
+
RESULTADO PRODUCTIVO REGISTRADO
+
CONSUMOS Y DIFERENCIAS EN ESTADO EXIGIBLE
+
ACTOR + TURNO + SEDE + AREA FRESCOS
+
AUTORIDAD EXACTA DE LA ACCION
+
ESTADO + VERSION VIGENTES
+
EVIDENCIA SUFICIENTE DEL HITO
+
IDENTIDAD IDEMPOTENTE + CONTROL DE CONCURRENCIA
=
TRANSICION DE FINALIZACION AUTORIZABLE
```

La experiencia conserva dos verdades distintas:

```text
FINALIZACION OPERATIVA
=
VPROC-0034.PRODUCTION_EXECUTION_COMPLETED

!=

CIERRE PRODUCTIVO CONCILIADO
=
VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED
```

---

#### 2. Entrada aprobada de FOGO-UX-006

`FOGO-UX-006` entrega una ejecución real y reconstruible con, como mínimo:

```text
LOTE / PROCESS_INSTANCE DURABLE
ESTADO Y VERSION ACTUALES
ORDEN + VERSION
RECETA + VERSION EXACTA
CANTIDAD OBJETIVO + UNIDAD
CAPTURAS PARCIALES INMUTABLES
ACUMULADO PRODUCTIVO VERIFICADO
PASOS / TIEMPOS / PAUSAS / INCIDENCIAS CUANDO APLIQUEN
MATERIALES Y CONSUMOS PRODUCTIVOS CAPTURADOS
REFERENCIAS NEXO Y SU ESTADO DE CONCILIACION
SALIDAS PARCIALES / RENDIMIENTO / MERMA OBSERVADOS
DIFERENCIAS ABIERTAS
ACTORES / TURNOS DE CADA CAPTURA
CORRELACION / IDEMPOTENCIA / VERSIONES
PENDIENTES Y BLOQUEOS NO OCULTOS
```

`FOGO-UX-007` no reescribe esos parciales ni usa el último registro como sustituto del expediente completo.

Si la ejecución todavía carece de hechos requeridos para finalizar, la experiencia mantiene el lote abierto y conduce al propietario funcional correspondiente en vez de fabricar datos de cierre.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato UX de finalización se define una sola vez;
2. no existe instancia física propia de `FOGO-UX-007`;
3. esta tarea no implementa componentes, RPC, estados, permisos, almacenamiento ni movimientos;
4. la materialización posterior consume este contrato sin reinterpretar qué significa finalizar, cerrar, liberar, conciliar o publicar inventario;
5. cualquier modificación de Supabase perteneciente a VENTO continúa bajo `vento-group-sas/vento-shell` y la unidad física propietaria aplicable.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-005 — Diseñar inicio de lote`;
- `FOGO-UX-006 — Diseñar producción parcial`;
- `FOGO-AUTH-011 — Proteger finalización`;
- `FOGO-AUTH-012 — Proteger correcciones y anulaciones` como frontera posterior;
- `FOGO-AUTH-014 — Registrar actor y turno`;
- `VSCREEN-0060 — Finalización y cierre de lote`;
- `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada`;
- `VPROC-0037 — Gestionar reproceso, aprovechamiento, rendimiento, merma y cierre productivo`;
- `VPROC-0037::STEP-CLOSE_BATCH — Finalizar y cerrar lote`;
- estados y eventos canónicos de `VPROC-0034`, `VPROC-0035`, `VPROC-0036` y `VPROC-0037`;
- `INT-PROD-002 — Definir contrato para que NEXO registre el consumo`;
- `INT-PROD-003 — Definir contrato para que FOGO finalice el lote`;
- fronteras de `INT-PROD-004` para ingreso físico de producto terminado;
- Registro 04A vigente de FOGO, autorización e integración;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`;
- versión completa aprobada de `FOGO-UX-006 — Diseñar producción parcial` como dependencia inmediata mientras su incorporación remota permanece pendiente durante esta preparación anticipada.

---

#### 5. Identidad canónica de la superficie

| Dimensión | Identidad |
| --- | --- |
| Pantalla | `VSCREEN-0060 — Finalización y cierre de lote` |
| Aplicación | `fogo` |
| Proceso propietario de la pantalla | `VPROC-0037` |
| Paso primario | `VPROC-0037::STEP-CLOSE_BATCH — Finalizar y cerrar lote` |
| Interacción | `CLOSE` |
| Momento | `TERMINAL` |
| Acción funcional primaria | `VSCREEN-0060::PRIMARY` |
| Recurso empresarial | `PRODUCTION_BATCH` |
| Proceso precedente | `VPROC-0034` |
| Procesos relacionados | `VPROC-0035`, `VPROC-0036` y NEXO mediante contratos de inventario |

`VSCREEN-0060` pertenece a `VPROC-0037`. La superficie puede mostrar la preparación y elegibilidad de la finalización operativa precedente, pero no reasigna la propiedad de `VPROC-0034` ni fusiona ambos procesos en un único estado local.

---

#### 6. Dos hitos que la experiencia no puede fusionar

La UX presenta explícitamente dos hitos:

| Hito | Estado canónico | Verdad que demuestra | Lo que NO demuestra |
| --- | --- | --- | --- |
| finalización operativa | `VPROC-0034.PRODUCTION_EXECUTION_COMPLETED` | materiales, pasos, cantidades, desviaciones, rendimiento y salida quedaron registrados y el expediente fue entregado a calidad | calidad liberada, empaque conciliado, ingreso NEXO, disponibilidad o cierre productivo definitivo |
| cierre productivo conciliado | `VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED` | consumos, salida, merma, reproceso, rendimiento, movimientos y pendientes quedaron conciliados y el cierre fue aprobado | permiso para reescribir historia, modificar calidad retroactivamente o recrear movimientos |

Queda prohibido usar una sola etiqueta como:

```text
completed
posted
closed
finished
ready
```

para representar simultáneamente ambos hitos y sus dependencias.

---

#### 7. Condición de entrada al flujo de finalización

La experiencia puede abrirse desde una ejecución activa o desde una ejecución ya terminada/interrumpida que requiera cierre productivo, pero cada acción disponible depende del estado real.

La UX debe poder resolver:

- lote y `process_instance`;
- estado/version de `VPROC-0034`;
- estado/version de `VPROC-0037` cuando ya exista;
- orden y versión;
- receta y versión exacta;
- área y sede persistidas;
- cantidades objetivo y reales confirmadas;
- parciales y acumulados;
- materiales, consumos, retornos y diferencias;
- salida, rendimiento, merma y desviaciones registradas;
- estado de calidad cuando aplique;
- estado de empaque cuando aplique;
- efectos NEXO exigibles y su resultado;
- actor, turno, dispositivo y autoridad actuales;
- pendientes que impidan cada hito.

Abrir la pantalla no ejecuta ninguna transición terminal.

---

#### 8. Secuencia de finalización operativa de VPROC-0034

La progresión relevante se conserva exactamente:

```text
VPROC-0034.IN_PRODUCTION
→ VPROC-0034.OUTPUT_REPORTED
→ VPROC-0034.CONSUMPTION_RECONCILIATION_PENDING
→ VPROC-0034.READY_FOR_QUALITY
→ VPROC-0034.PRODUCTION_EXECUTION_COMPLETED
```

La UX no permite saltar una condición requerida porque visualmente “parezca terminado”.

En particular:

```text
OUTPUT_REPORTED
!= PRODUCTION_EXECUTION_COMPLETED

CONSUMPTION_RECONCILIATION_PENDING
!= PRODUCTION_EXECUTION_COMPLETED

READY_FOR_QUALITY
!= QUALITY_RELEASED
```

---

#### 9. Resultado productivo reportado

`VPROC-0034.OUTPUT_REPORTED` representa que las salidas, rendimiento y merma requeridos para el hito fueron registrados como resultado productivo, todavía sin liberación de calidad.

La 007 no redefine el formulario detallado de cantidades, desperdicio y resultado.

Si esos datos están incompletos o requieren captura/rectificación, la experiencia remite a la responsabilidad de `FOGO-UX-010 — Registrar cantidades, desperdicio y resultado` y mantiene el hito bloqueado.

Por tanto:

```text
FOGO-UX-007
CONSUME / VERIFICA RESULTADO CONFIRMADO

FOGO-UX-010
DISEÑA EL REGISTRO DETALLADO DEL RESULTADO
```

La finalización no inventa cantidades para lograr que el cierre pase.

---

#### 10. Conciliación de consumos antes de completar ejecución

`VPROC-0034.CONSUMPTION_RECONCILIATION_PENDING` distingue el resultado productivo de la verdad física de inventario.

Antes de afirmar una finalización operativa normal, FOGO debe conocer el estado exigible de cada material relevante, incluyendo cuando aplique:

- cantidad requerida;
- cantidad reservada;
- cantidad emitida físicamente;
- cantidad clasificada como consumida;
- cantidad devuelta;
- cantidad desperdiciada;
- diferencia;
- operación NEXO relacionada;
- estado de conciliación;
- resultado pendiente, incierto o conflictivo.

Una captura FOGO de uso no sustituye la conciliación NEXO.

---

#### 11. Handoff `READY_FOR_QUALITY`

`VPROC-0034.READY_FOR_QUALITY` representa que el lote y su expediente están disponibles para inspección y decisión de calidad.

La experiencia muestra esta verdad sin presentarla como:

- liberación;
- conformidad;
- ingreso a inventario;
- empaque terminado;
- disponibilidad comercial;
- cierre productivo.

La disposición de calidad permanece en `VPROC-0035`.

---

#### 12. Finalización operativa

`VPROC-0034.PRODUCTION_EXECUTION_COMPLETED` se ejecuta únicamente cuando el expediente puede demostrar, como mínimo:

- materiales aplicables tratados conforme al expediente;
- pasos y controles aplicables registrados;
- cantidades reales de salida registradas;
- desviaciones y rendimiento registrados;
- resultado productivo identificado;
- consumos en el estado de conciliación exigible;
- handoff a calidad disponible;
- versión vigente del recurso;
- ausencia de transición concurrente incompatible;
- actor/contexto y autoridad exacta válidos en el punto de efecto.

La acción produce el hecho durable asociado a:

```text
VPROC-0034.EVT-006
=
EJECUCION PRODUCTIVA COMPLETADA
```

No se emite por abrir la pantalla, registrar un parcial, obtener HTTP 200, seleccionar un status cliente o iniciar calidad.

---

#### 13. Qué ocurre después de la finalización operativa

Una ejecución operativamente completada:

- no vuelve a aceptar parciales ordinarios;
- no aparece como producción pendiente de iniciar;
- conserva todos sus hechos históricos;
- queda disponible para los procesos de calidad y cierre que correspondan;
- no se convierte automáticamente en producto liberado;
- no crea stock disponible;
- no confirma empaque;
- no aprueba cierre productivo.

La UX debe mostrar claramente que “ejecución terminada” todavía puede conservar trabajo posterior.

---

#### 14. Apertura del cierre productivo

Una ejecución terminada o interrumpida con hechos suficientes para reconciliar puede abrir:

```text
VPROC-0037.PRODUCTION_CLOSEOUT_OPENED
```

Abrir el cierre demuestra únicamente que existe un caso productivo que debe conciliarse.

No demuestra:

- rendimiento final aceptado;
- merma final aceptada;
- reproceso aprobado;
- efectos NEXO confirmados;
- inventario conciliado;
- cierre definitivo.

La apertura puede producir `VPROC-0037.EVT-001` únicamente cuando el proceso quedó creado de forma durable.

---

#### 15. Máquina de cierre productivo preservada

La experiencia conserva la máquina canónica:

```text
VPROC-0037.PRODUCTION_CLOSEOUT_OPENED
→ VPROC-0037.DATA_COLLECTING
→ VPROC-0037.YIELD_RECONCILIATION_IN_PROGRESS
→ VPROC-0037.VARIANCE_UNDER_REVIEW
→ VPROC-0037.REWORK_PLAN_PENDING
→ VPROC-0037.REWORK_IN_PROGRESS
→ VPROC-0037.INVENTORY_EFFECTS_PENDING
→ VPROC-0037.CLOSURE_REVIEW_PENDING
→ VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED
```

No todos los lotes deben materializar cada estado cuando el contrato propietario permita no aplicabilidad o una ruta válida, pero la UI nunca salta o fabrica estados para esconder una obligación real.

---

#### 16. Recopilación de datos de cierre

En `VPROC-0037.DATA_COLLECTING`, la UX consolida referencias verificables sin crear copias editables que compitan con sus propietarias.

Puede reunir:

- orden y receta/version;
- parciales productivos;
- resultado confirmado;
- consumos NEXO;
- devoluciones y diferencias;
- rendimiento esperado y real;
- merma, desperdicio, coproducto o subproducto;
- incidencias y desviaciones;
- calidad y disposición cuando ya existan;
- empaque cuando aplique;
- movimientos NEXO confirmados;
- actores, tiempos y evidencia.

La recopilación no “normaliza” una diferencia alterando el hecho fuente.

---

#### 17. Conciliación de rendimiento

`VPROC-0037.YIELD_RECONCILIATION_IN_PROGRESS` compara el estándar de la receta/version con el resultado real.

La UX distingue:

```text
RENDIMIENTO ESPERADO
!=
SALIDA REAL PRODUCTIVA
!=
SALIDA FISICAMENTE INGRESADA A NEXO
```

La comparación utiliza identidades, unidades, conversiones, redondeos y tolerancias compatibles.

Una diferencia no desaparece porque el resultado sea “aceptable visualmente”.

---

#### 18. Variaciones bajo revisión

Una diferencia material que requiera investigación entra en:

```text
VPROC-0037.VARIANCE_UNDER_REVIEW
```

La experiencia puede mostrar, cuando aplique:

- magnitud de la diferencia;
- dimensión afectada;
- referencia esperada y real;
- causa conocida o investigación pendiente;
- responsable/propietario de resolución;
- impacto en calidad, inventario, reproceso o costo;
- estado de resolución.

No se permite aprobar el cierre introduciendo una causa vacía cuando el proceso exige explicación.

---

#### 19. Reproceso y aprovechamiento

Si una variación exige reproceso, `VPROC-0037` utiliza su ruta propietaria:

```text
REWORK_PLAN_PENDING
→ REWORK_IN_PROGRESS
```

La 007 no diseña el detalle funcional del reproceso ni reemplaza `VSCREEN-0067`.

La experiencia sí debe impedir un cierre definitivo mientras un reproceso aplicable que afecta el resultado permanezca abierto.

El reproceso conserva genealogía y no agrega consumos retroactivamente al hecho original.

---

#### 20. Efectos de inventario pendientes

`VPROC-0037.INVENTORY_EFFECTS_PENDING` significa:

```text
RESULTADO PRODUCTIVO SUFICIENTEMENTE VALIDADO
+
EFECTOS FISICOS EXIGIBLES TODAVIA PENDIENTES O EN VERIFICACION
```

No significa que el inventario ya fue actualizado.

La UX distingue:

- efecto requerido;
- solicitud o handoff emitido;
- resultado NEXO pendiente;
- resultado incierto;
- movimiento aplicado;
- posting/reconciliación según contrato;
- diferencia abierta.

`FOGO-UX-013` conserva el diseño específico del vínculo de producto terminado con NEXO.

---

#### 21. Revisión previa al cierre definitivo

`VPROC-0037.CLOSURE_REVIEW_PENDING` presenta una revisión de coherencia, no un formulario para modificar hechos hasta que “cuadren”.

Debe verificar, según aplicabilidad:

- ejecución y resultado productivos;
- materiales y consumos conciliados;
- devoluciones, mermas y ajustes resueltos;
- rendimiento conciliado;
- variaciones explicadas o tratadas;
- reproceso resuelto;
- disposición de calidad coherente;
- empaque y presentación aplicables;
- efectos físicos NEXO confirmados/correlacionados;
- pendientes explícitos;
- actor/contexto y autoridad vigentes para aprobar.

Un pendiente obligatorio mantiene el cierre abierto.

---

#### 22. Cierre productivo aprobado

`VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED` solo se afirma cuando los hechos exigibles quedaron conciliados y la revisión terminó con autoridad válida.

La verdad final es:

```text
CIERRE PRODUCTIVO APROBADO
=
CONCILIACION ACEPTADA
+
AUTORIDAD DE CIERRE VALIDA
+
EVIDENCIA DURABLE
```

La transición produce el hecho durable:

```text
VPROC-0037.EVT-006
=
PRODUCTION_CLOSEOUT_APPROVED
=
PROCESS_COMPLETED DE VPROC-0037
```

El cierre conserva las divergencias resueltas y su explicación; no las borra.

---

#### 23. Frontera con FOGO-UX-010

`FOGO-UX-010 — Registrar cantidades, desperdicio y resultado` conserva la propiedad del diseño detallado de captura de:

- cantidades finales;
- desperdicio/merma;
- resultado productivo;
- rendimiento observable;
- motivos y diferencias aplicables.

La 007:

- consume esos hechos confirmados;
- presenta su completitud;
- bloquea o deriva cuando faltan;
- los usa como evidencia para progresar estados;
- no redefine su formulario ni su autoridad de captura.

Así se evita que “Finalizar” se convierta en un formulario monolítico que además invente el resultado.

---

#### 24. Frontera con calidad

`VPROC-0035` conserva la decisión de calidad.

La experiencia mantiene:

```text
PRODUCTION_EXECUTION_COMPLETED
!=
QUALITY_DISPOSITION_VERIFIED
```

Y no supone una secuencia artificial en la que la verificación final de calidad deba existir siempre antes de cualquier efecto NEXO: cuando la disposición requiere comprobar su aplicación física, un resultado NEXO reconciliado puede formar parte de la evidencia usada durante `VPROC-0035.EXECUTION_VERIFICATION_PENDING` para alcanzar después `QUALITY_DISPOSITION_VERIFIED`.

Por tanto, la 007 muestra dependencias reales y no fabrica un orden circular imposible.

---

#### 25. Frontera con empaque y etiquetado

`VPROC-0036` conserva su propio ciclo.

La finalización puede correlacionar:

- lote;
- salida autorizada;
- presentación;
- cantidad empacada;
- etiqueta;
- LPN cuando exista;
- diferencias;
- estado de conciliación del empaque.

Pero:

```text
PACKAGED_OUTPUT_RECORDED
!=
PRODUCTION_CLOSEOUT_APPROVED
```

El cierre tampoco crea etiqueta, LPN ni identidad logística nueva.

---

#### 26. Frontera con NEXO e inventario

FOGO conserva la verdad productiva; NEXO conserva la verdad física.

La 007 no puede afirmar por sí sola:

- saldo disponible;
- LOC final;
- LPN final;
- movimiento aplicado;
- posting reconciliado;
- existencia vendible;
- producto despachable.

Un estado final FOGO no fabrica un movimiento NEXO inexistente.

Un movimiento NEXO tampoco finaliza por sí solo `VPROC-0034` ni aprueba `VPROC-0037`.

---

#### 27. Ejecución interrumpida

Una ejecución interrumpida antes del terminal normal de `VPROC-0034` conserva el último estado real alcanzado.

No se emite:

```text
VPROC-0034.PRODUCTION_EXECUTION_COMPLETED
```

como si hubiese terminado normalmente.

Cuando existan hechos suficientes, puede abrirse `VPROC-0037.PRODUCTION_CLOSEOUT_OPENED` para conciliar el resultado residual, conservando:

- materiales utilizados;
- salida parcial;
- merma/desperdicio;
- parciales confirmados;
- movimientos físicos ya ocurridos;
- incidencias;
- razón de interrupción;
- pendientes.

Interrumpido no significa vacío ni borrado.

---

#### 28. Autoridad exacta de finalización

El inventario canónico FOGO no demuestra todavía una capacidad materializada y asignada específicamente para finalización/cierre.

El literal:

```text
fogo.production.batches.close
```

aparece como ejemplo de naming empresarial válido en contratos previos, pero no se convierte por sí solo en permiso concedido ni binding materializado.

La UX adopta fail-closed:

```text
fogo.production.batches.view
!= AUTORIDAD PARA FINALIZAR

fogo.production.batches.create
!= AUTORIDAD PARA FINALIZAR

SUPERVISAR
!= AUTORIDAD PARA FINALIZAR
```

La acción primaria solo podrá ejecutarse cuando la materialización propietaria disponga de una capacidad canónica concreta, registrada y evaluable para el hito correspondiente.

---

#### 29. Actor, turno, territorio y contexto

Cada transición terminal revalida inmediatamente antes del efecto:

```text
PRINCIPAL TECNICO
+
ACTOR EFECTIVO
+
TURNO / CHECK-IN CUANDO APLIQUEN
+
ROL OPERATIVO
+
SEDE
+
AREA
+
CAPACIDAD EXACTA
+
LOTE Y TERRITORIO PERSISTIDOS
+
ESTADO + VERSION
+
EVIDENCIA DEL HITO
=
ACCION AUTORIZABLE
```

La persona que inició el lote puede ser distinta de quien registró parciales, terminó la ejecución o aprobó el cierre.

Cada acción conserva su actor real.

---

#### 30. Dispositivo compartido

En una estación compartida:

- el dispositivo no se convierte en actor;
- una firma identifica al humano cuando corresponda;
- la firma no concede capacidad;
- una firma previa no autoriza indefinidamente otro hito;
- cambiar de actor invalida una finalización preparada pero no confirmada cuando dependía de ese actor;
- área/dispositivo funcionan como límites adicionales, no como ampliación de territorio;
- un cierre confirmado conserva al actor que realmente lo ejecutó.

---

#### 31. Idempotencia por hito

La finalización operativa y el cierre productivo son operaciones idempotentes distintas.

Cada una conserva una identidad estable y una huella lógica propia.

Invariantes:

1. misma identidad + misma huella retorna resultado durable previo;
2. misma identidad + payload incompatible produce conflicto;
3. doble clic no crea dos transiciones terminales;
4. refresh no crea otra finalización;
5. timeout obliga a recuperar resultado antes de repetir;
6. `VPROC-0034.EVT-006` no se duplica por retry;
7. `VPROC-0037.EVT-006` no se duplica por retry;
8. una identidad de finalización operativa no se reutiliza como identidad del cierre productivo.

---

#### 32. Concurrencia y versión

Dos actores, sesiones o workers no pueden completar de forma incompatible la misma revisión del lote.

La experiencia espera control de versión, claim, compare-and-swap, lock o mecanismo equivalente en la materialización.

Si el recurso avanzó:

- el intento stale no sobrescribe;
- se recupera estado/version actuales;
- no se hace rollback silencioso;
- no se presentan dos cierres exitosos;
- no se fuerza `last-write-wins`;
- el actor debe revisar el nuevo estado antes de otra acción.

---

#### 33. Respuesta perdida y resultado desconocido

Una respuesta perdida después de solicitar finalización no autoriza otro submit ciego.

La UX conserva:

```text
IDEMPOTENCY_ID ORIGINAL
CORRELACION ORIGINAL
VERSION ESPERADA
```

Y consulta el resultado durable para distinguir:

- aplicado;
- resultado duplicado recuperado;
- en progreso;
- conflicto;
- stale;
- resultado desconocido;
- reconciliación requerida.

No se genera una clave nueva para “probar otra vez”.

---

#### 34. Estados de experiencia

La superficie distingue, como mínimo:

| Estado UX | Significado |
| --- | --- |
| `EJECUCION_EN_CURSO` | todavía existen parciales o trabajo productivo ordinario |
| `RESULTADO_INCOMPLETO` | faltan hechos de cantidad/resultado que pertenecen a su captura propietaria |
| `CONSUMOS_PENDIENTES` | el resultado existe, pero la conciliación material exigible no está resuelta |
| `LISTO_PARA_CALIDAD` | expediente disponible para inspección; no liberado |
| `EJECUCION_COMPLETADA` | terminal operativo de `VPROC-0034` alcanzado |
| `CIERRE_ABIERTO` | existe `VPROC-0037` sin cierre aprobado |
| `VARIACION_EN_REVISION` | diferencia material exige investigación |
| `REPROCESO_PENDIENTE_O_ACTIVO` | cierre bloqueado por ruta de reproceso aplicable |
| `EFECTOS_INVENTARIO_PENDIENTES` | FOGO espera resultados físicos autoritativos |
| `REVISION_CIERRE_PENDIENTE` | expediente listo para verificación final, todavía no aprobado |
| `CIERRE_APROBADO` | `PRODUCTION_CLOSEOUT_APPROVED` durable |
| `SIN_CAPACIDAD_DE_CIERRE` | actor puede consultar pero no mutar el hito |
| `STALE` | estado/contexto/version cambiaron |
| `CONFLICT` | otra operación produjo un estado incompatible |
| `RESULTADO_DESCONOCIDO` | debe recuperarse el resultado durable |
| `DENY` | autoridad/territorio/contexto no permiten la acción |
| `ERROR_TECNICO` | una dependencia impide decidir con seguridad |

Los estados no se reducen a `completed = true/false`.

---

#### 35. Confirmaciones y prevención de cierre accidental

Las acciones terminales deben ser inequívocas.

La UX separa claramente:

```text
Guardar / registrar dato
Finalizar ejecucion
Abrir cierre
Aprobar cierre productivo
```

Reglas:

- una captura parcial no comparte semántica con finalizar;
- “Finalizar ejecución” identifica el lote y el efecto;
- “Aprobar cierre” se muestra únicamente cuando la revisión lo permite;
- no se habilita por color o status cliente solamente;
- el estado de envío evita doble submit;
- una acción terminal no queda adyacente de forma ambigua a `Atrás`, `Actualizar` o `Ver receta`;
- la confirmación no afirma calidad o inventario que todavía no existen.

No se impone componente, framework o estilo visual concreto.

---

#### 36. Historia y auditoría visible

La experiencia debe poder reconstruir de forma resumida:

- inicio del lote;
- actores/turnos relevantes;
- parciales confirmados;
- resultado reportado;
- conciliación de consumos;
- finalización operativa;
- apertura de cierre;
- variaciones;
- reproceso cuando aplique;
- efectos de calidad;
- efectos de empaque;
- efectos NEXO;
- revisión de cierre;
- aprobación final.

La timeline es una proyección de hechos durables; no permite editar historia para hacer coincidir el cierre.

---

#### 37. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7` se observa:

1. `/production-batches/new` crea producción mediante `fogo_create_real_production_batch`;
2. el flujo actual captura consumos y outputs dentro de la operación de creación;
3. `/production-batches` lee `production_batches` y `production_batch_consumptions`;
4. la proyección runtime presenta estados locales como `posted`, `draft`, `cancelled` y `completed`;
5. no se observa una acción separada que materialice `VSCREEN-0060::PRIMARY`;
6. no se observa una máquina física separada que materialice el lifecycle completo de `VPROC-0037`;
7. no se observa una acción runtime canónica `production.batches.close` ya materializada.

Conclusión:

```text
STATUS LOCAL "completed"
!=
VPROC-0034.PRODUCTION_EXECUTION_COMPLETED
!=
VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED
```

La UX objetivo no adopta el status legacy como alias de ambos hitos.

---

#### 38. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| No existe una superficie física separada que materialice `VSCREEN-0060::PRIMARY`. | no puede demostrarse finalización/cierre canónicos | implementación propietaria FOGO consumiendo `FOGO-UX-007` + `FOGO-AUTH-011::<implementation_unit_id>` | existe acción de cierre protegida con estados, autoridad, versionado, idempotencia y auditoría |
| El runtime usa `completed` como status local. | puede fusionar finalización operativa y cierre productivo | `FOGO-UX-007` + materialización propietaria | UI/backend distinguen `PRODUCTION_EXECUTION_COMPLETED` y `PRODUCTION_CLOSEOUT_APPROVED` sin alias ambiguo |
| No existe capacidad FOGO materializada y asignada específicamente para cierre. | bloquea mutación terminal conforme | `FOGO-AUTH-011::<implementation_unit_id>` con normalización en `FOGO-AUTH-013` / `FOGO-AUTH-015` cuando aplique | cada hito queda ligado a capacidad canónica concreta y evaluable |
| El literal `fogo.production.batches.close` es naming, no concesión vigente. | riesgo de fabricar permiso por convención | `FOGO-AUTH-013` / `FOGO-AUTH-015` | la clave, si se adopta, queda en catálogo, contratos, asignaciones y pruebas antes de usarla |
| Creación AS-IS acopla consumos y outputs. | impide demostrar lifecycle separado | unidades físicas FOGO/NEXO propietarias | inicio, parciales, resultado, conciliación y cierre son operaciones separadas y correlacionadas |
| Resultado detallado pertenece a `FOGO-UX-010`. | riesgo de duplicar formularios y autoridad | `FOGO-UX-010` | la 007 consume hechos confirmados y deriva a la 010 cuando faltan; no duplica su captura |
| Calidad, empaque e inventario aportan hechos independientes. | un cierre puede afirmarse prematuramente | procesos `VPROC-0035`, `VPROC-0036`, NEXO e integración | cada dependencia aplicable aporta resultado durable o tratamiento canónico antes del hito que la exige |
| Correcciones posteriores no pueden editar el cierre original. | pérdida de historia | `FOGO-AUTH-012` / `FOGO-UX-011` | corrección/anulación crea acción vinculada, motivo, autoridad y evidencia sin sobrescritura destructiva |

No queda hallazgo narrativo sin propietario y condición de salida.

---

#### 39. Continuidad funcional con FOGO-UX-008..015

| Tarea | Frontera preservada desde FOGO-UX-007 |
| --- | --- |
| `FOGO-UX-008` | conserva la receta/version operativa aplicable; la 007 no redefine cómo se presenta su resumen |
| `FOGO-UX-009` | administración de recetas permanece separada del cierre de lotes |
| `FOGO-UX-010` | captura cantidades, desperdicio y resultado; la 007 los consume como evidencia |
| `FOGO-UX-011` | corrige sin alterar historial; un cierre aprobado no se edita in-place |
| `FOGO-UX-012` | conecta consumo con NEXO; la 007 consume su estado de conciliación |
| `FOGO-UX-013` | conecta producto terminado con NEXO; la 007 no fabrica ingreso físico |
| `FOGO-UX-014` | supervisión no concede autoridad terminal por implicación |
| `FOGO-UX-015` | prototipo debe demostrar estados, bloqueos y separación entre ejecución, calidad, inventario y cierre |

La sucesora canónica inmediata es `FOGO-UX-008`; esta tarea no adelanta su diseño detallado.

---

#### 40. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas para finalización operativa, cierre productivo, cantidades, consumos, desperdicio, rendimiento, actor/turno, territorio, autorización exacta, idempotencia, concurrencia, calidad, empaque, inventario, integración y trazabilidad. No introduce una obligación verificable nueva fuera de esa cobertura ni modifica texto, estado, relación, secuencia o propietario del registro.

---

#### 41. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-001` — ciclo del lote con producción parcial, consumo, desperdicio, resultado, finalización, cancelación/corrección, actor, turno y efectos auditables;
- `TREQ-FOGO-002` — receta/version exactas, unidades, rendimiento real, merma, sustituciones y desviaciones sin sobrescritura;
- `TREQ-FOGO-004` — ejecución productiva, independencia entre finalización, calidad e inventario, reproceso con genealogía y cierre conciliado;
- `TREQ-NEXO-010` — unidades, conversión, tolerancia y política de operación coherentes;
- `TREQ-NEXO-011` — movimientos/proyecciones canónicos, atomicidad o idempotencia, compensación y prevención de doble efecto;
- `TREQ-INTEGRATION-003` — identidad idempotente, resultado durable, reintento, concurrencia, resultado desconocido y conciliación;
- `TREQ-INTEGRATION-011` — efectos de inventario por contrato NEXO correlacionado e idempotente;
- `TREQ-INTEGRATION-013` — cadena materiales, ejecución, calidad, inventario y costo correlacionada y reconciliable;
- `TREQ-AUTH-008` — contexto operativo completo de capacidades operativas;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación territorial;
- `TREQ-AUTH-010` — segregación de funciones entre producción, inventario, logística y administración;
- `TREQ-AUTH-011` — actor efectivo en dispositivo compartido;
- `TREQ-AUTH-013` — autorización server-side sin bypass por UI/API/RPC;
- `TREQ-AUTH-014` — invalidación de autoridad stale;
- `TREQ-AUTH-015` — evidencia correlacionable de actor, contexto, permiso, recurso, decisión, estado y tiempo;
- `TREQ-UX-001` — tarea, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La construcción documental local corresponde al checkout posterior a la incorporación del artefacto. |
| LOCAL | NOT_EXECUTED | Formato y validaciones locales, de topología, EOL, requisitos y plan global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@6299d0e89ca47f0185fcb1f640b545908e6a6a84`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, owner FOGO, topología `DEFINE_ONCE`, `FOGO-AUTH-011`, `VSCREEN-0060`, `VPROC-0034`, `VPROC-0037`, eventos de cierre, `INT-PROD-002`, `INT-PROD-003`, cobertura 04A y el AS-IS de lotes; `FOGO-UX-006` se consume desde su versión completa aprobada mientras su incorporación remota permanece pendiente durante esta preparación anticipada. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron finalizaciones, cierres, conciliaciones, calidad, empaque, handoffs NEXO, cambios de turno, dispositivos, reintentos ni concurrencia sobre lotes reales. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-007` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 43. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0060` conserva ownership de `VPROC-0037` y `VPROC-0037::STEP-CLOSE_BATCH`;
- [ ] la acción primaria conserva clase `CLOSE` y fase `TERMINAL`;
- [ ] finalización operativa y cierre productivo conciliado permanecen como hitos distintos;
- [ ] `VPROC-0034.PRODUCTION_EXECUTION_COMPLETED` no se presenta como calidad liberada ni inventario disponible;
- [ ] `VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED` no se presenta como simple alias de `completed`;
- [ ] la progresión `IN_PRODUCTION → OUTPUT_REPORTED → CONSUMPTION_RECONCILIATION_PENDING → READY_FOR_QUALITY → PRODUCTION_EXECUTION_COMPLETED` permanece distinguible;
- [ ] resultado incompleto no se fabrica desde la pantalla de cierre;
- [ ] la captura detallada de cantidades/desperdicio/resultado permanece en `FOGO-UX-010`;
- [ ] consumos pendientes o inciertos no se presentan como conciliados;
- [ ] `READY_FOR_QUALITY` no se presenta como liberación de calidad;
- [ ] `VPROC-0034.EVT-006` solo representa finalización operativa durable;
- [ ] `VPROC-0037.PRODUCTION_CLOSEOUT_OPENED` no equivale a cierre aprobado;
- [ ] los estados de `VPROC-0037` se conservan sin saltos usados para ocultar obligaciones;
- [ ] rendimiento esperado, salida real e ingreso físico NEXO permanecen distintos;
- [ ] una variación material permanece abierta hasta resolución/tratamiento válido;
- [ ] reproceso abierto que afecte resultado bloquea cierre definitivo;
- [ ] `INVENTORY_EFFECTS_PENDING` no se interpreta como inventario actualizado;
- [ ] revisión de cierre verifica hechos sin modificarlos para obtener coherencia;
- [ ] `VPROC-0037.EVT-006` solo se emite por cierre productivo durable;
- [ ] calidad permanece bajo `VPROC-0035`;
- [ ] empaque permanece bajo `VPROC-0036`;
- [ ] NEXO conserva la verdad física de inventario;
- [ ] una ejecución interrumpida no emite finalización normal falsa;
- [ ] no se inventa una capacidad de cierre desde `batches.view`, `batches.create`, rol o naming;
- [ ] `fogo.production.batches.close` no se concede por aparecer como convención de nombre;
- [ ] actor, turno, sede, área, capacidad, lote, estado y versión se revalidan en cada transición terminal;
- [ ] dispositivo compartido identifica al actor sin ampliar autoridad;
- [ ] finalización operativa y cierre productivo usan identidades idempotentes separadas;
- [ ] doble clic, retry o timeout no duplican cierre ni eventos;
- [ ] concurrencia no produce dos terminales incompatibles;
- [ ] un estado stale no se sobrescribe por last-write-wins;
- [ ] respuesta perdida se recupera antes de repetir;
- [ ] estados UX distinguen resultado incompleto, consumos pendientes, calidad, cierre, deny, stale, conflicto y error técnico;
- [ ] la timeline conserva historia y no permite edición destructiva;
- [ ] el AS-IS `completed` no se convierte en alias canónico;
- [ ] hallazgos tienen propietario y condición de salida;
- [ ] `FOGO-UX-008` queda reservada sin adelantar su diseño;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 44. Límites

Esta tarea no:

- implementa `VSCREEN-0060`;
- crea rutas, componentes, RPC, tablas, vistas, RLS, grants, migraciones o datos;
- crea una capacidad de cierre;
- concede `fogo.production.batches.close`;
- redefine `FOGO-UX-006` ni sus parciales;
- diseña el formulario detallado de cantidades/desperdicio/resultado de `FOGO-UX-010`;
- modifica la receta/version histórica;
- edita orden o planificación;
- ejecuta inspección o disposición de calidad;
- ejecuta empaque;
- crea etiquetas o LPN;
- crea movimientos NEXO;
- publica stock terminado;
- decide disponibilidad comercial;
- calcula costo final;
- borra diferencias para cerrar;
- ejecuta reproceso;
- corrige historia mediante edición in-place;
- reabre un cierre aprobado por mutación ordinaria;
- crea eventos empresariales nuevos;
- inventa nombres físicos de tablas, columnas o enums;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-006 — Diseñar producción parcial`

**TAREA ACTUAL APROBADA**
`FOGO-UX-007 — Diseñar finalización de lote`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-008 — Mostrar receta resumida para operación`

### ✅ FOGO-UX-008 — Mostrar receta resumida para operación

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-007 — Diseñar finalización de lote
**Tarea siguiente:** FOGO-UX-009 — Separar recetario operativo y administración de recetas
**Tipo de tarea:** diseño documental integral de `VSCREEN-0061` como proyección operativa mínima, publicada, versionada, contextual y sensible de la receta aplicable al trabajo productivo, preservando identidad, versión, escala, ingredientes, unidades, pasos, controles, alérgenos, conservación, área, lote y autorización sin convertir consulta operativa en administración, edición, aprobación, publicación, exportación ni autoridad para iniciar producción
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la experiencia canónica de `VSCREEN-0061 — Receta operativa` para que un trabajador de producción consulte únicamente la **versión publicada, vigente y aplicable** que necesita para preparar y controlar su trabajo, con suficiente información para ejecutar con seguridad y reproducibilidad, sin exponer por conveniencia administrativa, financiera o técnica información que no pertenece al carril operativo.

La regla raíz queda:

```text
ACTOR + TURNO + SEDE + AREA EFECTIVOS
+
TRABAJO / PRODUCTO / PROCESO COMPATIBLES
+
RECIPE_PUBLICATION PUBLICADA Y APLICABLE
+
VERSION EXACTA CUANDO EXISTE LOTE
+
AUTORIZACION fogo.production.recipe_book.view
+
PROYECCION MINIMA NECESARIA PARA EJECUTAR
=
RECETA OPERATIVA CONSULTABLE
```

Y se conserva la separación:

```text
RECIPE_DEFINITION
!=
RECIPE_PUBLICATION
!=
RECETA OPERATIVA
!=
LOTE / EJECUCION
!=
INVENTARIO DISPONIBLE
!=
COSTO REALIZADO
```

---

#### 2. Entrada aprobada de FOGO-UX-007

`FOGO-UX-007` entrega una ejecución productiva y un cierre que conservan la versión exacta de receta utilizada por el lote y que nunca deben reinterpretar una versión posterior como si hubiera gobernado la ejecución histórica.

La entrada relevante para esta tarea es:

```text
LOTE / PROCESS_INSTANCE CUANDO EXISTA
ORDEN + VERSION
RECETA / PUBLICACION + VERSION EXACTA
PRODUCTO / SALIDA OBJETIVO
CANTIDAD OBJETIVO + UNIDAD
SEDE + AREA PRODUCTIVA
ACTOR / TURNO / CONTEXTO
ESTADO DE EJECUCION
REFERENCIA DE VERSION Y SNAPSHOT SUFICIENTE
```

`FOGO-UX-008` no altera ninguno de esos hechos. Su responsabilidad es presentar una proyección operativa coherente con ellos.

Cuando no existe todavía un lote, la consulta del recetario operativo se resuelve contra publicaciones vigentes y aplicables al contexto actual; cuando existe lote, la experiencia prioriza la versión exacta fijada por ese lote.

---

#### 3. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato UX de receta operativa se define una sola vez;
2. `FOGO-UX-008` no crea una instancia física propia;
3. esta tarea no implementa consultas, rutas, componentes, persistencia, permisos, caché ni integraciones;
4. las materializaciones posteriores deben consumir este contrato sin ampliar la exposición operativa por conveniencia de UI;
5. cualquier modificación de Supabase perteneciente a VENTO continúa bajo `vento-group-sas/vento-shell` y el trabajo físico propietario correspondiente.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-002 — Separar cocina, panadería y repostería`;
- `FOGO-UX-003 — Diseñar inicio por área productiva`;
- `FOGO-UX-005 — Diseñar inicio de lote`;
- `FOGO-UX-006 — Diseñar producción parcial`;
- `FOGO-UX-007 — Diseñar finalización de lote`;
- `OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual`;
- `FOGO-AUTH-002 — Definir permisos por área productiva`;
- `FOGO-AUTH-004..006` para aislamiento de Panadería, Repostería y Cocina Caliente;
- `FOGO-AUTH-013` y `FOGO-AUTH-015` como fronteras de normalización/protección física posteriores;
- `VSCREEN-0061 — Receta operativa`;
- `VPROC-0016 — Gestionar desarrollo, prueba, aprobación, publicación y versión de recetas`;
- `VPROC-0016::STEP-CONSULT_APPLICABLE_RECIPE — Consultar receta aplicable`;
- `RECIPE_DEFINITION`, `RECIPE_PUBLICATION`, `recipe_definition_id`, `published_recipe_version_id` y `recipe_version_ref`;
- ciclo de estados y eventos de `VPROC-0016`;
- `TREQ-FOGO-002` y cobertura relacionada;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`;
- versión completa aprobada de `FOGO-UX-007 — Diseñar finalización de lote` mientras su incorporación remota permanece pendiente durante esta preparación anticipada.

---

#### 5. Identidad canónica de la superficie

| Dimensión | Identidad canónica |
| --- | --- |
| Pantalla | `VSCREEN-0061 — Receta operativa` |
| Aplicación | `fogo` |
| Proceso propietario | `VPROC-0016` |
| Paso | `VPROC-0016::STEP-CONSULT_APPLICABLE_RECIPE — Consultar receta aplicable` |
| Interacción | `MONITOR` |
| Momento | `IN_PROGRESS` |
| Acción funcional primaria | `VSCREEN-0061::PRIMARY` |
| Rol de superficie | `OWNER_WORKSPACE` |
| Recurso consultado | `RECIPE_PUBLICATION` |
| Consumidor productivo principal | `VPROC-0034` |

La pantalla presenta la versión aprobada/publicada utilizada por el lote o aplicable al trabajo. No convierte el recetario operativo en editor de `VPROC-0016`.

---

#### 6. Recurso operativo y recurso administrativo

La experiencia distingue de forma obligatoria:

```text
RECIPE_PUBLICATION
=
VERSION PUBLICADA APLICABLE A OPERACION

RECIPE_DEFINITION
=
DEFINICION ADMINISTRATIVA DE RECETA
```

`fogo.production.recipe_book.view` consulta `RECIPE_PUBLICATION`.

`fogo.production.recipes.view` consulta `RECIPE_DEFINITION` dentro de un carril administrativo autorizado.

Por tanto:

```text
fogo.production.recipe_book.view
!=
fogo.production.recipes.view
```

La pertenencia a Cocina Caliente, Galletería y Panadería o Repostería concede únicamente el carril operativo definido por autorización; no concede el maestro administrativo.

---

#### 7. Condición de disponibilidad de una receta operativa

Una receta puede aparecer como utilizable para nuevo trabajo únicamente cuando pueda demostrarse la intersección:

```text
PUBLICACION EXISTENTE
+
ESTADO PUBLICADO / UTILIZABLE
+
VIGENCIA ACTUAL
+
PRODUCTO O PROCESO COMPATIBLE
+
SEDE COMPATIBLE CUANDO APLIQUE
+
AREA PRODUCTIVA ACTIVA
+
FUNCION PRODUCTIVA ACTIVA
+
ACTOR HUMANO EFECTIVO
+
DISPOSITIVO / ESTACION COMPATIBLE CUANDO APLIQUE
+
PERMISO fogo.production.recipe_book.view
+
SIN DENEGACION PREVALENTE
=
PUBLICACION OPERATIVA CONSULTABLE
```

La búsqueda textual, una selección visual, compartir sede o que el producto tenga el mismo nombre no sustituyen la aplicabilidad server-side.

---

#### 8. Versión exacta del lote y consulta libre del recetario

La experiencia tiene dos modos de lectura que no pueden mezclarse silenciosamente.

##### 8.1. Consulta desde un lote o ejecución

Cuando existe lote:

```text
LOTE
→ recipe_version_ref EXACTA
→ published_recipe_version_id CORRESPONDIENTE
→ PROYECCION OPERATIVA DE ESA VERSION
```

La pantalla no cambia a la publicación vigente más reciente si el lote fue iniciado con otra versión.

##### 8.2. Consulta sin lote

Cuando el trabajador abre el recetario antes de un lote, la UX muestra publicaciones que sean actualmente vigentes y aplicables al contexto.

Seleccionar o previsualizar una receta no crea lote, no fija una versión empresarial y no concede capacidad de producción.

---

#### 9. Ciclo de `VPROC-0016` y elegibilidad operativa

El ciclo canónico permanece:

```text
VPROC-0016.RECIPE_DRAFT
→ VPROC-0016.IN_DEVELOPMENT
→ VPROC-0016.IN_TESTING
→ VPROC-0016.UNDER_TECHNICAL_REVIEW
→ VPROC-0016.PENDING_APPROVAL
→ VPROC-0016.APPROVED
→ VPROC-0016.PUBLISHED
→ VPROC-0016.RECIPE_VERSION_RELEASED
```

Reglas UX:

1. `VPROC-0016.APPROVED` no equivale a publicación operativa;
2. un borrador no aparece al trabajador ordinario como receta ejecutable;
3. `VPROC-0016.PUBLISHED` representa habilitación productiva dentro de vigencia y alcance;
4. `VPROC-0016.RECIPE_VERSION_RELEASED` conserva el hito final de versión liberada con contenido completo aceptado por sus consumidores autorizados;
5. una versión retirada no origina nuevos lotes;
6. una versión retirada puede seguir siendo consultable cuando un lote histórico la referencia;
7. ninguna etiqueta local `published` autoriza por sí sola a ignorar aplicabilidad, versión o contexto.

---

#### 10. Proyección operativa mínima

`VSCREEN-0061` presenta únicamente la información necesaria para preparar, ejecutar y controlar de forma segura el trabajo autorizado.

La proyección mínima puede incluir, según aplicabilidad:

- producto o preparación resultante;
- referencia/version visible suficiente para evitar ambigüedad;
- rendimiento base;
- cantidad objetivo o escala operativa;
- porciones;
- ingredientes o preparaciones intermedias necesarias;
- cantidades y unidades;
- pasos en orden;
- tiempos operativos cuando existan;
- método e instrucciones;
- puntos de control;
- tolerancias;
- alérgenos y advertencias materiales;
- conservación y manipulación;
- restricciones de uso;
- especificaciones necesarias para ejecutar;
- evidencia visual estrictamente necesaria cuando esté autorizada.

No se presume que todas las recetas usen todas las dimensiones; sí se exige que ninguna dimensión material requerida para ejecutar quede omitida por simplificación de UI.

---

#### 11. Encabezado operativo de receta

La ficha debe permitir reconocer sin ambigüedad:

1. qué producto o preparación se ejecuta;
2. qué versión gobierna la lectura;
3. qué sede/área o lote contextualizan la receta cuando aplique;
4. qué rendimiento base tiene la publicación;
5. qué cantidad o escala se está mostrando;
6. si la lectura corresponde a un lote histórico fijado o a una publicación vigente para nuevo trabajo;
7. si existe una advertencia material que requiera atención antes de continuar.

El identificador técnico interno puede permanecer oculto al operador cuando una referencia humana inequívoca sea suficiente, pero la identidad exacta debe conservarse en el contrato y en la navegación/consulta subyacente.

---

#### 12. Escala, rendimiento y porciones

El escalamiento es una proyección determinista y no una edición de la publicación.

Contrato:

```text
RENDIMIENTO BASE DE LA VERSION
+
CANTIDAD OBJETIVO VALIDA
+
UNIDADES / CONVERSIONES CANONICAS
+
REGLA DE REDONDEO Y TOLERANCIA
=
CANTIDADES OPERATIVAS ESCALADAS
```

Reglas:

- la cantidad objetivo no cambia la versión publicada;
- un preview libre no modifica orden ni lote;
- cuando la receta se abre desde un lote, la escala principal corresponde a la cantidad del lote;
- unidades incompatibles no se fuerzan mediante equivalencias locales;
- componentes no escalables deben declararse explícitamente;
- rendimiento esperado permanece separado de rendimiento real;
- merma real o desviación no reescribe la fórmula esperada.

---

#### 13. Ingredientes y preparaciones intermedias

La proyección de ingredientes conserva referencias canónicas y evita identidades libres competidoras.

Para cada línea operacionalmente necesaria se debe poder interpretar:

- ingrediente o preparación intermedia;
- cantidad requerida para la escala mostrada;
- unidad compatible;
- relación con la versión exacta;
- advertencia/restricción aplicable cuando sea material.

La receta no demuestra disponibilidad física.

Por tanto:

```text
INGREDIENTE EN RECETA
!=
STOCK DISPONIBLE
!=
RESERVA
!=
CONSUMO NEXO
```

La disponibilidad y los movimientos físicos permanecen bajo NEXO.

---

#### 14. Pasos, método e instrucciones

La secuencia mostrada corresponde exactamente a la versión consultada.

La UX debe:

- ordenar los pasos de forma inequívoca;
- conservar instrucciones y condiciones necesarias;
- mostrar tiempo o evidencia visual cuando formen parte material de la versión;
- diferenciar instrucción obligatoria de tip o ayuda cuando esa diferencia exista;
- evitar sustituir un paso por la versión de otra publicación;
- impedir que un cambio administrativo posterior modifique retrospectivamente el lote histórico.

Una fotografía, tip o ayuda visual no se convierte en fuente de verdad separada de la versión publicada.

---

#### 15. Controles, alérgenos, inocuidad, conservación y calidad

La simplificación operativa nunca puede ocultar información necesaria para ejecutar con seguridad.

Cuando sea aplicable, la receta resumida presenta de forma suficientemente visible:

- alérgenos;
- puntos de control;
- tolerancias;
- restricciones de manipulación;
- conservación;
- temperatura/tiempo u otra condición material definida por la versión;
- criterios operativos de calidad necesarios para la ejecución;
- advertencias que condicionen la continuidad del trabajo.

La existencia de un campo no prueba que su contenido esté verificado. La UX consume el estado y evidencia que el contrato de receta declare; no presenta “validado” únicamente porque el registro exista.

---

#### 16. Sensibilidad de fórmula y exposición mínima

Las recetas son información sensible.

La regla de exposición es:

```text
OPERACION
→ INFORMACION NECESARIA PARA PREPARAR Y CONTROLAR

ADMINISTRACION AUTORIZADA
→ INFORMACION NECESARIA PARA DEFINIR / REVISAR / APROBAR
```

El recetario operativo no expone por defecto:

- borradores;
- versiones no publicadas;
- historial administrativo completo;
- decisiones de aprobación;
- campos de fórmula no necesarios para la tarea;
- costos o márgenes administrativos;
- permisos de edición;
- catálogo organizacional completo;
- secretos de otro dominio;
- exportación masiva.

La sensibilidad tampoco justifica ocultar alérgenos, inocuidad o controles necesarios para la seguridad de la operación.

---

#### 17. Aplicabilidad por sede y área

El acceso operativo se resuelve antes de serializar la proyección.

Regla:

```text
AUTORIZAR PUBLICACION
→ RESOLVER SEDE / AREA / PRODUCTO / PROCESO
→ OBTENER CONJUNTO PERMITIDO
→ SERIALIZAR PROYECCION OPERATIVA
```

Nunca:

```text
CARGAR RECETAS DE TODA LA SEDE
→ ENVIARLAS AL CLIENTE
→ FILTRAR VISUALMENTE POR AREA
```

Los query parameters pueden reducir una colección ya autorizada, pero no ampliar el territorio.

Un `area_id` enviado por cliente es una solicitud de filtro, no una concesión de autoridad.

---

#### 18. Tres áreas productivas

La misma composición UX se reutiliza para:

| Rol operativo | Área efectiva | Perfil de recetario |
| --- | --- | --- |
| `produccion_cocina` | Cocina Caliente | `CTX-PROD-KITCHEN-RECIPE-BOOK` |
| `produccion_panaderia` | Galletería y Panadería | `CTX-PROD-BAKERY-RECIPE-BOOK` |
| `produccion_reposteria` | Repostería | `CTX-PROD-PASTRY-RECIPE-BOOK` |

Los tres roles comparten `fogo.production.recipe_book.view`, pero no comparten territorio.

Una receta de otra área no se vuelve operativa porque:

- comparte Centro de Producción;
- usa el mismo ingrediente;
- produce un producto parecido;
- fue creada por la misma persona;
- aparece en una búsqueda;
- existe en el mismo catálogo físico.

---

#### 19. Relación con lote y `VPROC-0034`

`VSCREEN-0061` es propietaria de la consulta de receta, pero `VPROC-0034` consume la versión durante la ejecución.

Cuando la superficie se abre desde `FOGO-UX-005`, `FOGO-UX-006` o `FOGO-UX-007`, debe mantener el vínculo con:

- lote;
- orden/version;
- `recipe_version_ref`;
- cantidad objetivo y escala;
- producto/salida;
- área productiva;
- estado de ejecución.

La receta puede abrirse sin alterar el lote y volver al contexto de ejecución correspondiente.

Consultar no inicia, avanza, pausa, finaliza ni corrige la producción.

---

#### 20. Semántica de solo lectura operativa

La acción primaria de `VSCREEN-0061` es consulta/monitorización del conocimiento operativo aplicable.

Por tanto, el trabajador ordinario no puede desde esta superficie:

- editar ingredientes;
- editar cantidades base;
- reordenar pasos;
- cambiar rendimiento base;
- cambiar alérgenos;
- cambiar estado de publicación;
- archivar;
- aprobar;
- publicar;
- retirar una versión;
- crear una nueva versión;
- modificar la publicación que gobierna un lote.

Una interacción local de recalcular escala no constituye mutación de receta.

---

#### 21. Frontera con administración de recetas

La sucesora `FOGO-UX-009` conserva la separación detallada entre:

```text
VSCREEN-0061
RECETARIO OPERATIVO

VSCREEN-0062 / VSCREEN-0063
ADMINISTRACION + REVISION + APROBACION + PUBLICACION
```

La 008 fija la frontera que la 009 debe preservar:

- operación consume publicación aplicable;
- administración gestiona definición/versionado bajo permisos propios;
- un rol productivo no recibe administración por pertenecer al área;
- un actor administrativo no se convierte en trabajador productivo por consultar definición;
- la autoría no concede acceso operativo ni administrativo posterior por sí sola.

---

#### 22. Acciones secundarias, PDF y exportación

La existencia de `VSCREEN-0061::SECONDARY:01..04` no autoriza a inventar semántica empresarial individual ni permisos atómicos que la fuente todavía no declara.

La receta operativa no obtiene exportación por implicación.

`/recipes/pdf` conserva protección server-side propia y pertenece a la superficie técnica/administrativa observada; el permiso de recetario operativo no se transforma en permiso para exportar el catálogo o la fórmula.

Copiar, imprimir o exportar información sensible requiere contrato propietario cuando exista.

---

#### 23. Frontera con creación e inicio de lote

Poder consultar una receta no equivale a poder producirla.

```text
fogo.production.recipe_book.view
!=
fogo.production.batches.create
```

La acción `Producir lote` o equivalente solo puede aparecer como ejecutable cuando la materialización demuestre además la autoridad exacta de creación y todas las precondiciones de `FOGO-UX-005`.

La vista de receta no hereda autoridad de mutación por proximidad visual.

---

#### 24. Versiones retiradas e historia

Una publicación retirada:

- no aparece como opción para nuevos lotes;
- no desaparece de la historia si un lote la utilizó;
- puede seguir siendo consultable desde un lote histórico autorizado;
- se presenta claramente como versión histórica/no utilizable para nuevo trabajo;
- conserva snapshot suficiente para explicar la ejecución;
- no se “actualiza” a la nueva versión al abrirla.

La historia no se reconstruye desde la receta actualmente vigente cuando existe referencia exacta de versión previa.

---

#### 25. Frescura, cambio de contexto y recarga

La pantalla puede quedar stale por cambios de:

- actor;
- turno/check-in;
- rol;
- sede/área;
- permiso;
- publicación/vigencia;
- aplicabilidad;
- lote/version;
- receta/version;
- producto/proceso asociado.

Antes de mostrar una publicación después de un cambio material de contexto, la experiencia vuelve a resolver autorización y aplicabilidad.

Una receta previamente visible no queda autorizada indefinidamente por haber estado abierta.

Cuando el lote fija una versión histórica, la pérdida de vigencia para **nuevos lotes** no sustituye la versión histórica; la UX diferencia historia autorizada de elegibilidad para nuevo trabajo.

---

#### 26. Estados de experiencia

La UX distingue como mínimo:

| Estado | Significado |
| --- | --- |
| `PUBLICACION_APLICABLE` | publicación vigente y autorizada para consulta operativa |
| `VERSION_FIJADA_POR_LOTE` | el lote exige una versión exacta, aunque exista otra publicación más nueva |
| `VERSION_HISTORICA` | versión retirada/no vigente consultable únicamente por historia autorizada |
| `NO_APLICABLE_AL_AREA` | existe publicación, pero no corresponde al territorio operativo efectivo |
| `NO_APLICABLE_AL_PRODUCTO_PROCESO` | la publicación no corresponde al trabajo solicitado |
| `SIN_PERMISO` | falta `fogo.production.recipe_book.view` o existe denegación prevalente |
| `CONTEXTO_INCOMPLETO` | no puede resolverse actor/turno/sede/área requerido |
| `STALE` | cambió publicación, contexto o vínculo de lote y debe recuperarse el estado actual |
| `DATOS_INCOMPLETOS` | falta información material de la versión para ejecutar con seguridad |
| `ERROR_TECNICO` | no puede resolverse la proyección de forma confiable |
| `SIN_RECETAS_APLICABLES` | consulta válida sin publicaciones elegibles para ese contexto |

`SIN_RECETAS_APLICABLES` no se usa para esconder un `DENY`, un contexto roto o un fallo técnico.

---

#### 27. Densidad y uso en estación productiva

La receta resumida prioriza lectura rápida y seguridad operacional.

Debe favorecer:

- producto y versión reconocibles;
- rendimiento/escala visibles;
- cantidades legibles;
- pasos secuenciales claros;
- advertencias materiales no escondidas;
- alérgenos y controles distinguibles;
- navegación simple entre receta y lote cuando exista;
- lectura táctil sin confundir consulta con acciones de edición;
- confirmación visual de qué versión está siendo utilizada.

No se impone framework, color, tamaño exacto ni componente específico.

---

#### 28. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `/recipe-book` demuestra una base funcional real:

- exige un permiso local `production.recipe_book.view`;
- fuerza `status = published` para el conjunto visible;
- consulta `recipe_cards` con sede, área, rendimiento, porción, tiempo, vida útil, dificultad y descripción;
- permite escalar una cantidad de producción;
- carga ingredientes y cantidades;
- carga pasos, tiempos, tips e imágenes;
- presenta rendimiento, porciones, tiempo, conservación, ingredientes y paso a paso;
- oculta el costo estimado salvo cuando `isManagement` es verdadero;
- enlaza hacia creación de lote cuando la comprobación local lo permite.

Sin embargo, el código observado también demuestra brechas frente al contrato objetivo:

1. la comprobación de `production.recipe_book.view` utiliza `areaId: undefined`;
2. para actores no management, la selección de área visible no demuestra un filtro server-side por área antes de obtener el dataset;
3. la consulta observada filtra explícitamente por sede para actor ordinario, no demuestra por sí sola aislamiento completo por área;
4. la superficie inspeccionada no muestra `published_recipe_version_id` ni `recipe_version_ref` canónicos como vínculo explícito;
5. el runtime usa un modelo `recipe_cards/status=published` que no demuestra el ciclo completo de `VPROC-0016`;
6. los datos mostrados no demuestran alérgenos, tolerancias, controles o restricciones completos exigidos cuando son materiales;
7. la consulta de ingredientes selecciona también `cost` y calcula `totalCost` aunque solo se renderice para management; el contrato objetivo exige minimizar el dataset operativo y no depender solo de ocultamiento visual;
8. `canCreateBatchInSite` se resuelve con `areaId: undefined`, por lo que la proximidad del enlace de producción no puede usarse como prueba de autorización exacta por área;
9. la navegación administrativa existe en superficies `/recipes*` separadas, pero la separación contractual completa pertenece a `FOGO-UX-009`.

Conclusión:

```text
/recipe-book AS-IS
=
BASE REAL Y REUTILIZABLE

!=
VSCREEN-0061 COMPLETAMENTE CONFORME
```

---

#### 29. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| La consulta AS-IS no demuestra aislamiento server-side por área para el trabajador ordinario. | Puede exponer publicaciones de otra área dentro de la misma sede. | `FOGO-UX-008`, `FOGO-AUTH-015` y materialización propietaria | la consulta resuelve área efectiva y serializa únicamente publicaciones autorizadas/aplicables antes de llegar a UI |
| El permiso runtime observado es `production.recipe_book.view`, no la clave canónica completa. | Riesgo de alias ampliatorio o migración incompleta. | `FOGO-AUTH-013` / `FOGO-AUTH-015` | consumidor usa `fogo.production.recipe_book.view` o binding normalizado explícito sin wildcard |
| `recipe_cards/status=published` no demuestra identidad/versionado canónico completo. | Un lote podría consultar contenido distinto al que lo originó. | materialización de `OPS-REC-001`, `FOGO-UX-008`, E3/paquete propietario | consulta por `published_recipe_version_id` / `recipe_version_ref` o mecanismo canónico equivalente preserva versión exacta y snapshot |
| No se observan alérgenos/controles/restricciones completos en la ficha AS-IS. | Ejecución puede carecer de información material de seguridad o reproducibilidad. | materialización propietaria de `OPS-REC-001` + `FOGO-UX-008` | la proyección incluye toda dimensión material aplicable o bloquea la receta incompleta |
| El código de la vista obtiene costo de ingrediente aunque solo management lo renderice. | La proyección operativa puede traer datos sensibles innecesarios al servidor de esa superficie. | implementación propietaria FOGO | el dataset operativo selecciona solo campos necesarios y costos/márgenes permanecen fuera salvo contrato autorizado |
| La acción de producir aparece adyacente al recetario. | Riesgo de confundir lectura con autoridad de creación. | `FOGO-UX-005` + autorización propietaria | enlace/acción de lote solo queda ejecutable tras comprobar creación exacta para receta, sede y área |
| La administración de recetas ya existe físicamente en `/recipes*`. | Riesgo de mezclar navegación y permisos operativos/administrativos. | `FOGO-UX-009` | superficies, permisos y acciones quedan separadas sin administración heredada por rol productivo |

No queda hallazgo narrativo sin propietario y condición de salida.

---

#### 30. Handoff inmediato a FOGO-UX-009

`FOGO-UX-009 — Separar recetario operativo y administración de recetas` recibe una frontera cerrada:

```text
VSCREEN-0061
→ RECIPE_PUBLICATION
→ OPERACION
→ SOLO LECTURA OPERATIVA
→ VERSION PUBLICADA / VIGENTE / APLICABLE
→ EXPOSICION MINIMA NECESARIA

VSCREEN-0062 / VSCREEN-0063
→ RECIPE_DEFINITION + VERSIONADO ADMINISTRATIVO
→ ADMINISTRACION
→ ACCIONES DE CREAR / EDITAR / REVISAR / APROBAR / PUBLICAR SEGUN AUTORIDAD
```

La 009 no necesita reabrir qué información corresponde a la proyección operativa; debe impedir que las superficies administrativas la contaminen o hereden autoridad incorrecta.

---

#### 31. Handoff al resto de FOGO-UX

| Tarea | Frontera recibida desde FOGO-UX-008 |
| --- | --- |
| `FOGO-UX-009` | separar administración y publicación de la proyección operativa definida aquí |
| `FOGO-UX-010` | resultado real permanece separado del rendimiento esperado de la receta |
| `FOGO-UX-011` | correcciones del lote no reescriben la versión de receta usada |
| `FOGO-UX-012` | consumo NEXO se correlaciona con ingredientes de la versión exacta, sin convertir receta en ledger |
| `FOGO-UX-013` | producto terminado conserva genealogía hacia la versión exacta sin fabricar stock desde la receta |
| `FOGO-UX-014` | supervisión multiárea no amplía el recetario sin autoridad contextual específica |
| `FOGO-UX-015` | prototipo debe demostrar aislamiento de área, versión exacta, contenido operativo suficiente y ausencia de administración accidental |

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas para receta publicada, identidad/versionado, snapshot, escalamiento, ingredientes, unidades, pasos, controles, alérgenos, conservación, sensibilidad, autorización contextual, aislamiento territorial y uso productivo. No introduce una obligación verificable nueva fuera de esa cobertura ni modifica texto, estado, relación, secuencia o propietario del registro.

---

#### 33. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-002` — receta publicada inmutable y versionada, versión exacta por lote, snapshot, escala, ingredientes, unidades, pasos, controles, rendimiento, porciones, conservación, alérgenos, especificaciones y autorización contextual;
- `TREQ-FOGO-004` — ejecución conserva receta/version, materiales, pasos, desviaciones, rendimiento, merma y controles aplicables;
- `TREQ-FOGO-013` — páginas protegidas fallan cerrado ante ausencia de sesión, acceso, contexto o permiso exigido;
- `TREQ-FOGO-019` — filtros/query parameters permanecen dentro de la vista y no crean autoridad nueva;
- `TREQ-FOGO-020` — ruta, guard, permiso local o enlace no demuestran autorización completa;
- `TREQ-FOGO-022` — solo se atribuye permiso exacto cuando la evidencia inspeccionada lo declara;
- `TREQ-AUTH-009` — resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-013` — autorización server-side sin bypass por UI/API/RPC;
- `TREQ-AUTH-014` — invalidación de autoridad stale;
- `TREQ-AUTH-015` — protección y evidencia correlacionable de recursos/acciones sensibles;
- `TREQ-UX-001` — tarea, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local posterior a la incorporación del artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@d7c834aa8b74b7019810e9370995ee15537d8bed`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, owner FOGO, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VSCREEN-0061`, `VPROC-0016`, `OPS-REC-001`, autorización por área, cobertura 04A y el AS-IS de `/recipe-book`; `FOGO-UX-007` se consume desde su versión completa aprobada SHA-256 `433d62544471760495290854818f1109b251723ec0b35a9e38064a8ea3b9e58e` mientras su incorporación remota permanece pendiente durante esta preparación anticipada. |
| OPERATIVA | NOT_EXECUTED | No se consultaron recetas con trabajadores reales, cambios de turno, aislamiento cruzado de áreas, lotes históricos, versiones retiradas, alérgenos, escalamiento ni pruebas de dispositivo compartido. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-008` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 35. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0061` conserva ownership de `VPROC-0016` y el paso `VPROC-0016::STEP-CONSULT_APPLICABLE_RECIPE`;
- [ ] la interacción permanece `MONITOR / IN_PROGRESS`;
- [ ] `RECIPE_PUBLICATION` y `RECIPE_DEFINITION` permanecen separados;
- [ ] `published_recipe_version_id` y `recipe_version_ref` conservan responsabilidades inequívocas;
- [ ] un lote consulta la versión exacta fijada por su ejecución;
- [ ] una consulta sin lote muestra únicamente publicaciones vigentes y aplicables;
- [ ] `APPROVED` no se interpreta como publicación utilizable;
- [ ] una versión retirada no origina nuevos lotes;
- [ ] una versión retirada sigue disponible para historia autorizada cuando un lote la referencia;
- [ ] la proyección incluye toda información material necesaria para ejecutar con seguridad;
- [ ] rendimiento base y cantidad objetivo/escala permanecen diferenciados;
- [ ] escalar la vista no modifica la publicación;
- [ ] ingredientes usan identidades y unidades canónicas;
- [ ] receta no se interpreta como disponibilidad, reserva o consumo NEXO;
- [ ] pasos e instrucciones corresponden exactamente a la versión consultada;
- [ ] alérgenos, inocuidad, controles y conservación no se ocultan por sensibilidad;
- [ ] fórmula sensible, costos, márgenes y datos administrativos innecesarios permanecen fuera de la proyección operativa;
- [ ] `fogo.production.recipe_book.view` permanece distinto de `fogo.production.recipes.view`;
- [ ] Cocina, Panadería y Repostería comparten vocabulario de permiso pero no territorio;
- [ ] la consulta se filtra/autorizada server-side por área antes de serializar datos;
- [ ] query params no amplían autoridad;
- [ ] cambiar actor/turno/área fuerza revalidación;
- [ ] abrir la receta desde lote no cambia estado del lote;
- [ ] lectura de receta no concede `fogo.production.batches.create`;
- [ ] recalcular escala no equivale a edición administrativa;
- [ ] `VSCREEN-0061::SECONDARY:01..04` conservan identidad sin semántica inventada;
- [ ] exportación/PDF no se concede desde permiso operativo por implicación;
- [ ] estados `SIN_RECETAS_APLICABLES`, `SIN_PERMISO`, `CONTEXTO_INCOMPLETO`, `STALE` y `ERROR_TECNICO` permanecen distintos;
- [ ] el AS-IS `/recipe-book` se trata como base parcial y no como contrato completo;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `FOGO-UX-009` recibe una frontera suficiente sin adelantar su diseño detallado;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 36. Límites

Esta tarea no:

- implementa `VSCREEN-0061`;
- modifica `/recipe-book`;
- crea rutas, componentes, RPC, tablas, vistas, RLS, grants, migraciones o datos;
- crea permisos;
- normaliza físicamente `production.recipe_book.view`;
- implementa `fogo.production.recipe_book.view`;
- edita recetas;
- diseña el editor administrativo de `FOGO-UX-009`;
- aprueba o publica recetas;
- retira versiones;
- crea versiones nuevas;
- corrige el lifecycle AS-IS de `recipe_cards`;
- cambia producto/ingrediente/unidad maestra de NEXO;
- demuestra disponibilidad de inventario;
- calcula costo realizado;
- concede exportación/PDF;
- crea lote ni inicia producción;
- altera orden, lote o receta histórica;
- registra resultado real de `FOGO-UX-010`;
- define correcciones de `FOGO-UX-011`;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-007 — Diseñar finalización de lote`

**TAREA ACTUAL APROBADA**
`FOGO-UX-008 — Mostrar receta resumida para operación`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-009 — Separar recetario operativo y administración de recetas`

### ✅ FOGO-UX-009 — Separar recetario operativo y administración de recetas

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-008 — Mostrar receta resumida para operación
**Tarea siguiente:** FOGO-UX-010 — Registrar cantidades, desperdicio y resultado
**Tipo de tarea:** diseño documental integral de la separación entre `VSCREEN-0061` como recetario operativo de solo lectura sobre `RECIPE_PUBLICATION` y `VSCREEN-0062` / `VSCREEN-0063` como carril administrativo de autoría, revisión, aprobación, publicación, versionado, retiro y exposición sensible sobre `RECIPE_DEFINITION`, preservando `VSCREEN-0064` como prueba técnica independiente, ciclo `VPROC-0016`, inmutabilidad histórica, segregación de funciones, capacidades atómicas, concurrencia y fail-closed sin convertir el permiso legacy `recipes.manage` en autoridad canónica
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/02_EXPERIENCIA_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas, permisos, datos, Supabase, migraciones, RLS, RPC, dispositivos, contratos generados, recetas reales ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Separar de forma inequívoca la experiencia de **consultar una receta para ejecutar producción** de la experiencia de **definir, cambiar, revisar, aprobar, publicar, retirar o exportar conocimiento de receta**.

La regla raíz queda:

```text
RECETARIO OPERATIVO
=
RECIPE_PUBLICATION
+
VERSION PUBLICADA / VIGENTE / APLICABLE
+
EXPOSICION MINIMA NECESARIA
+
fogo.production.recipe_book.view

!=

ADMINISTRACION DE RECETAS
=
RECIPE_DEFINITION
+
BORRADORES / CANDIDATOS / VERSIONADO
+
REVISION / APROBACION / PUBLICACION
+
AUTORIDAD ATOMICA POR ACCION
```

La experiencia no permite que una ruta, un rol productivo, la autoría, la visibilidad de una pantalla o un permiso amplio legacy conviertan lectura en mutación.

---

#### 2. Entrada aprobada de FOGO-UX-008

`FOGO-UX-008` entrega una frontera cerrada:

```text
VSCREEN-0061
→ RECIPE_PUBLICATION
→ OPERACION
→ SOLO LECTURA OPERATIVA
→ VERSION PUBLICADA / VIGENTE / APLICABLE
→ EXPOSICION MINIMA NECESARIA

VSCREEN-0062 / VSCREEN-0063
→ RECIPE_DEFINITION + VERSIONADO ADMINISTRATIVO
→ ADMINISTRACION
→ CREAR / EDITAR / REVISAR / APROBAR / PUBLICAR SEGUN AUTORIDAD
```

También entrega estas invariantes:

- `fogo.production.recipe_book.view` no equivale a `fogo.production.recipes.view`;
- consulta operativa no concede `fogo.production.batches.create`;
- una publicación usada por un lote conserva versión exacta e historia;
- una versión retirada no origina nuevos lotes, pero puede seguir consultable para historia autorizada;
- el recetario operativo minimiza fórmula y datos sensibles;
- costos, márgenes, borradores, historial administrativo y decisiones de aprobación no pertenecen por defecto a la proyección operacional;
- las áreas productivas comparten vocabulario de lectura operativa sin compartir territorio.

`FOGO-UX-009` no reabre esas decisiones. Diseña el carril administrativo que debe permanecer separado de ellas.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. el contrato UX de separación administrativo/operativo se define una sola vez;
2. no existe instancia física propia `FOGO-UX-009::<implementation_unit_id>`;
3. esta tarea no materializa permisos, rutas, estados, storage, RLS, RPC ni mutaciones;
4. las materializaciones posteriores consumen este contrato dentro de sus packages e instancias propietarias;
5. cualquier modificación de Supabase perteneciente a VENTO continúa bajo `vento-group-sas/vento-shell` y la unidad física autorizada correspondiente.

---

#### 4. Fuentes verificadas

El diseño consume y conserva, como mínimo:

- `FOGO-UX-008 — Mostrar receta resumida para operación`;
- `OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual`;
- `FOGO-AUTH-002 — Definir permisos por área productiva`;
- `FOGO-AUTH-013 — Proteger lotes y recetas`;
- `FOGO-AUTH-014 — Registrar actor y turno` como frontera de atribución;
- `FOGO-AUTH-015 — Migrar a paquetes de vento-shell` como frontera de normalización física;
- `VSCREEN-0061 — Receta operativa`;
- `VSCREEN-0062 — Catálogo y editor de recetas`;
- `VSCREEN-0063 — Revisión, aprobación y publicación de receta`;
- `VSCREEN-0064 — Prueba de receta y rendimiento` como superficie relacionada que no debe colapsarse dentro del editor;
- `VPROC-0016 — Gestionar desarrollo, prueba, aprobación, publicación y versión de recetas`;
- `RECIPE_DEFINITION`, `RECIPE_PUBLICATION`, `recipe_definition_id`, `published_recipe_version_id` y `recipe_version_ref`;
- ciclo de estados de `VPROC-0016`;
- Registro 04A vigente de FOGO y autorización;
- runtime observado `vento-group-sas/vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7`;
- versión completa aprobada de `FOGO-UX-008` SHA-256 `895249968a7f4a4c0d11b20afe0c4a6074d82031dbc41516281c0a2d8b43b649` mientras su incorporación remota permanece pendiente durante esta preparación anticipada.

---

#### 5. Universo canónico de superficies de receta

| Pantalla | Propietario | Paso canónico | Interacción | Momento | Responsabilidad en esta tarea |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0061 — Receta operativa` | `VPROC-0016` | `VPROC-0016::STEP-CONSULT_APPLICABLE_RECIPE` | `MONITOR` | `IN_PROGRESS` | consulta operativa de publicación aplicable; no administra |
| `VSCREEN-0062 — Catálogo y editor de recetas` | `VPROC-0016` | `VPROC-0016::STEP-AUTHOR_RECIPE` | `CONFIGURE` | `IN_PROGRESS` | catálogo administrativo, definición, candidato y edición autorizada |
| `VSCREEN-0063 — Revisión, aprobación y publicación de receta` | `VPROC-0016` | `VPROC-0016::STEP-APPROVE_AND_PUBLISH_RECIPE` | `APPROVE` | `DECISION` | revisión y decisiones diferenciadas de aprobación/publicación |
| `VSCREEN-0064 — Prueba de receta y rendimiento` | `VPROC-0016` | `VPROC-0016::STEP-TEST_RECIPE_AND_YIELD` | `VALIDATE` | `IN_PROGRESS` | prueba técnica y rendimiento; no se absorbe en el editor |

Las cuatro pantallas pueden compartir navegación o referencias, pero no comparten automáticamente permiso, efecto ni estado empresarial.

---

#### 6. Separación principal de carriles

La experiencia mantiene dos carriles con propósitos distintos:

```text
CARRIL OPERATIVO
VSCREEN-0061
RECIPE_PUBLICATION
OPERATIONAL_ONLY
SOLO LECTURA NECESARIA PARA PRODUCIR

CARRIL ADMINISTRATIVO
VSCREEN-0062 + VSCREEN-0063
RECIPE_DEFINITION + VERSIONADO GOBERNADO
BASE_ONLY / AUTORIDAD ADMINISTRATIVA
CREACION + CAMBIO + REVISION + DECISION
```

Reglas obligatorias:

1. un actor productivo ordinario no recibe administración por pertenecer a Cocina, Panadería o Repostería;
2. un actor administrativo no se convierte en trabajador productivo por poder leer o editar una definición;
3. el permiso de una superficie no se hereda por navegación a la otra;
4. una publicación operacional no es una copia editable de la definición;
5. la administración no puede usar el recetario operativo como atajo para publicar o corregir;
6. una acción administrativa no se autoriza por el hecho de que su resultado pueda terminar visible en operación.

---

#### 7. Separación de recursos

La frontera de recurso permanece:

```text
RECIPE_DEFINITION
=
IDENTIDAD ADMINISTRATIVA Y CONOCIMIENTO VERSIONADO

RECIPE_PUBLICATION
=
VERSION PUBLICADA, INMUTABLE Y APLICABLE
```

Localizadores canónicos:

```text
recipe_definition_id
published_recipe_version_id
recipe_version_ref
```

`RECIPE_DEFINITION` puede tener candidatos, borradores, revisión y cambios.

`RECIPE_PUBLICATION` representa una versión ya publicada que no se edita destructivamente.

Una referencia de producto, un nombre de receta o un `recipe_card` local no sustituyen estas identidades contractuales.

---

#### 8. Vocabulario de permisos y autoridad

La UX consume la separación ya aprobada por autorización:

| Acción | Recurso | Capacidad contractual |
| --- | --- | --- |
| consultar definición administrativa | `RECIPE_DEFINITION` | `fogo.production.recipes.view` |
| crear definición o candidato | `RECIPE_DEFINITION` | `fogo.production.recipes.create` cuando exista materialización canónica consumible |
| actualizar borrador/candidato autorizado | `RECIPE_DEFINITION` | `fogo.production.recipes.update` cuando exista materialización canónica consumible |
| archivar/desactivar definición | `RECIPE_DEFINITION` | `fogo.production.recipes.archive` cuando exista materialización canónica consumible |
| consultar publicación operativa | `RECIPE_PUBLICATION` | `fogo.production.recipe_book.view` |
| aprobar versión candidata | transición `VPROC-0016` | capacidad atómica propietaria con `CAPABILITY_BINDING_REQUIRED` |
| publicar versión aprobada | transición `VPROC-0016` | capacidad atómica propietaria con `CAPABILITY_BINDING_REQUIRED` |
| exportar proyección sensible | proyección de receta | capacidad atómica propietaria o contrato server-side específico con `CAPABILITY_BINDING_REQUIRED` |

La experiencia no inventa nombres para capacidades que todavía no tienen binding canónico materializado.

Mientras falte una capacidad requerida:

```text
NO BINDING ATOMICO
→ NO ACCION
→ DENY / SOLO LECTURA SEGUN CORRESPONDA
```

---

#### 9. `recipes.manage` permanece legacy y descompuesto

La normalización vigente conserva:

```text
fogo.production.recipes.manage
→ DECOMPOSE_REQUIRED
```

Y nombra como objetivos separados:

```text
fogo.production.recipes.view
fogo.production.recipes.create
fogo.production.recipes.update
fogo.production.recipes.archive
```

Reglas UX:

1. `manage` no aparece como permiso canónico atómico final;
2. no se crean nuevas experiencias que dependan de `manage` como wildcard;
3. `view` no concede `create`, `update` ni `archive`;
4. `create` no concede `update` ni `archive`;
5. `update` no concede `archive`, aprobación ni publicación;
6. un literal runtime `production.recipes.manage` no se considera equivalente automático a `fogo.production.recipes.manage` ni a toda la familia canónica;
7. la UI no habilita acciones sensibles porque un helper legacy haya permitido abrir la página.

---

#### 10. Entrada al catálogo administrativo

`VSCREEN-0062` presenta un catálogo administrativo únicamente a actores con lectura administrativa autorizada.

El catálogo puede organizar, según alcance autorizado:

- definiciones de receta;
- estado de desarrollo/versionado;
- producto o preparación objetivo;
- sede/área de aplicabilidad cuando corresponda;
- vigencia/publicación relacionada;
- responsable o procedencia de trabajo cuando sea necesario;
- advertencias de bloqueo;
- última evidencia o revisión relevante.

La lista administrativa puede incluir borradores, candidatos o versiones que el recetario operativo no puede mostrar.

Abrir el catálogo no concede capacidad para modificar ninguna fila.

---

#### 11. Creación de una definición o candidato

Crear una receta administrativa requiere una capacidad de creación materializada y evaluable.

La creación inicia conocimiento gobernado; no publica por sí sola.

La experiencia debe distinguir:

```text
CREAR DEFINICION / CANDIDATO
!=
APROBAR
!=
PUBLICAR
!=
HABILITAR PARA PRODUCCION
```

Una creación válida conserva identidad estable de definición y los metadatos mínimos exigibles por `VPROC-0016`, pero la tarea no prescribe tablas, columnas o payload físico.

Si `fogo.production.recipes.create` todavía no es consumible en la materialización propietaria, la UX falla cerrado y no reutiliza `recipes.view`, `recipes.update` o un permiso legacy para crear.

---

#### 12. Edición de borrador o candidato

La edición administrativa ordinaria se limita a estados y versiones que permitan cambio conforme al lifecycle propietario.

Antes del efecto, la materialización deberá revalidar:

```text
ACTOR EFECTIVO
+
CAPACIDAD DE UPDATE
+
RECIPE_DEFINITION EXACTA
+
VERSION / ESTADO DE ORIGEN
+
ALCANCE ORGANIZACIONAL
+
FRESCURA
+
SIN CONFLICTO CONCURRENTE
```

Un actor con lectura administrativa puede abrir una definición sin poder editarla.

Una receta cuyo estado ya exige revisión, aprobación o publicación no retrocede silenciosamente por una edición ordinaria.

---

#### 13. Publicación inmutable y nueva versión

Una publicación ya utilizada o vigente no se modifica in-place para representar un cambio material.

La regla contractual es:

```text
CAMBIO MATERIAL SOBRE VERSION PUBLICADA
→ NUEVA VERSION CANDIDATA
→ NUEVA REVISION / APROBACION / PUBLICACION

NO
→ SOBREESCRIBIR PUBLICACION HISTORICA
```

La UX debe diferenciar claramente:

- definición estable;
- versión candidata editable cuando corresponda;
- publicación vigente;
- publicación histórica/retirada;
- versión exacta utilizada por lotes previos.

Los lotes históricos conservan `recipe_version_ref` y no se actualizan a una receta posterior.

---

#### 14. Ciclo de vida de `VPROC-0016`

La administración conserva exactamente el ciclo:

```text
VPROC-0016.RECIPE_DRAFT
→ VPROC-0016.IN_DEVELOPMENT
→ VPROC-0016.IN_TESTING
→ VPROC-0016.UNDER_TECHNICAL_REVIEW
→ VPROC-0016.PENDING_APPROVAL
→ VPROC-0016.APPROVED
→ VPROC-0016.PUBLISHED
→ VPROC-0016.RECIPE_VERSION_RELEASED
```

La UI no sustituye este lifecycle por un selector genérico de `status`.

Invariantes:

```text
GUARDAR != APROBAR
APROBAR != PUBLICAR
PUBLICAR != EJECUTAR
PROBAR != PUBLICAR
PUBLISHED != RECIPE_VERSION_RELEASED
```

Cada transición conserva estado de origen compatible y autoridad exacta.

---

#### 15. Frontera con `VSCREEN-0064` — prueba de receta y rendimiento

`VSCREEN-0064` conserva la prueba técnica como experiencia separada.

La administración puede derivar hacia la prueba cuando una versión candidata la requiera, pero `VSCREEN-0062` no absorbe:

- ejecución controlada de prueba;
- captura del rendimiento real de prueba;
- evidencia técnica;
- comparación entre esperado y observado;
- decisión técnica derivada de la prueba.

La prueba puede aportar evidencia a `UNDER_TECHNICAL_REVIEW`, pero no publica automáticamente la receta.

`FOGO-UX-009` preserva esta frontera y deja la materialización/prototipo detallado de `VSCREEN-0064` a sus propietarios ya existentes.

---

#### 16. Revisión técnica

`VPROC-0016.UNDER_TECHNICAL_REVIEW` representa revisión de una candidata, no publicación.

La experiencia de `VSCREEN-0063` debe permitir revisar, según materialidad:

- identidad y versión candidata;
- cambio frente a publicación anterior;
- ingredientes y preparaciones intermedias;
- cantidades y unidades;
- rendimiento y porciones;
- pasos/método;
- escalamiento, redondeo y tolerancias;
- alérgenos e inocuidad;
- conservación;
- criterios de calidad;
- aplicabilidad y vigencia propuesta;
- evidencia de prueba;
- impactos relevantes a consumidores.

La revisión no modifica hechos hasta obtener coherencia visual; cualquier corrección vuelve al carril de edición/versionado que corresponda.

---

#### 17. Pendiente de aprobación

`VPROC-0016.PENDING_APPROVAL` significa que la candidata espera una decisión autorizada.

La UX diferencia:

- preparada para aprobación;
- bloqueada por evidencia faltante;
- bloqueada por conflicto/version stale;
- actor sin capacidad de aprobación;
- decisión pendiente de otro responsable.

No se habilita aprobación por haber creado, editado, probado o revisado la candidata.

---

#### 18. Aprobación

`VPROC-0016.APPROVED` es una decisión independiente.

La aprobación crítica conserva la segregación aprobada por `OPS-REC-001`:

- desarrollo primario: `RESPONSABLE_PRODUCTIVO`;
- participación técnica: `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD`;
- aprobación final crítica: `GERENCIA_GENERAL`;
- iniciar/preparar o ejecutar la prueba no concede por sí solo autoridad para aprobar la misma decisión crítica.

Estas responsabilidades funcionales no se convierten automáticamente en nombres de rol de autenticación ni en permisos por texto.

La UX exige la capacidad atómica propietaria materializada; si no existe, la acción queda `DENY`.

---

#### 19. Publicación

Publicar es una decisión posterior y distinta de aprobar.

Antes de publicar, la experiencia debe poder demostrar, según aplicabilidad:

- versión candidata exacta;
- estado aprobado compatible;
- contenido mínimo completo;
- vigencia definida;
- aplicabilidad definida;
- revisión técnica suficiente;
- evidencia exigible;
- capacidad de publicación materializada;
- ausencia de cambio concurrente;
- ausencia de una condición que obligue a revisar de nuevo.

La publicación genera una versión operativamente utilizable dentro de vigencia y alcance, pero no demuestra disponibilidad de ingredientes, producción ejecutada, costo realizado ni calidad de un lote.

---

#### 20. `RECIPE_VERSION_RELEASED`

`VPROC-0016.RECIPE_VERSION_RELEASED` conserva el terminal normal del proceso de versión.

Demuestra que la versión aprobada y publicada quedó liberada con rendimiento, ingredientes, pasos, controles y restricciones completos y aceptados por sus consumidores autorizados.

No demuestra:

- que un lote haya sido creado;
- que exista stock;
- que la receta haya sido ejecutada;
- que la calidad real de un lote sea conforme;
- que el costo realizado sea el esperado;
- que los ingredientes estén disponibles.

La experiencia no usa `released` como alias genérico de cualquier `published` local.

---

#### 21. Comparación entre versiones

Cuando existe publicación anterior, la revisión administrativa debe permitir comprender el delta sin depender de comparar manualmente dos formularios completos.

La comparación puede incluir:

- ingrediente agregado, retirado o sustituido;
- cantidad/unidad modificada;
- rendimiento o porción;
- paso agregado, retirado o modificado;
- tiempo o condición operativa;
- control/tolerancia;
- alérgeno, inocuidad o conservación;
- aplicabilidad;
- vigencia;
- evidencia de prueba.

La comparación es informativa y no crea una mutación por sí misma.

No se imponen componentes visuales concretos.

---

#### 22. Aplicabilidad y vigencia no son autoridad

El carril administrativo puede definir o revisar a qué contexto se propone aplicar una publicación.

Eso puede incluir, cuando corresponda:

- producto o proceso;
- sede;
- área productiva;
- función productiva;
- tipo de preparación;
- vigencia temporal.

Pero seleccionar una sede o área en el editor:

```text
NO
=
AUTORIZACION DEL ACTOR SOBRE ESA SEDE O AREA
```

La materialización valida por separado la autoridad del actor para modificar la definición/publicación y la validez empresarial del alcance propuesto.

---

#### 23. Sensibilidad y exposición administrativa

La administración puede requerir más información que el recetario operativo, pero tampoco es un wildcard de datos.

La experiencia aplica necesidad de trabajo:

```text
LECTURA ADMINISTRATIVA
→ INFORMACION NECESARIA PARA CONSULTAR DEFINICION

EDICION / REVISION
→ INFORMACION NECESARIA PARA CAMBIO Y ANALISIS

APROBACION
→ INFORMACION NECESARIA PARA DECISION

OPERACION
→ SOLO INFORMACION NECESARIA PARA PREPARAR Y CONTROLAR
```

La autoría no concede acceso posterior.

La UI y sus errores no deben filtrar fórmula sensible, costos, aprobaciones o evidencia a quien solo tiene carril operativo.

Alérgenos, inocuidad y controles necesarios para ejecutar no se ocultan en operación por tratarse de información sensible.

---

#### 24. Segregación de funciones

La experiencia refleja la segregación de responsabilidades, sin inferirla únicamente del rol visual.

Reglas:

1. crear no autoriza aprobar;
2. editar no autoriza publicar;
3. ejecutar una prueba no autoriza aprobar automáticamente;
4. revisar técnicamente no sustituye la aprobación final crítica;
5. aprobar no concede capacidad administrativa general sobre todas las recetas;
6. publicar no concede capacidad de archivo o exportación;
7. una capacidad materializada puede conservar restricciones adicionales por actor, alcance, estado o separación de funciones.

Si una combinación está prohibida por el contrato de autorización, la UI debe mostrar el estado correspondiente sin ofrecer un bypass alternativo.

---

#### 25. Concurrencia, versión y estado stale

Las acciones administrativas sensibles operan sobre estado/version esperados.

Si otra sesión o actor avanzó el recurso:

- el intento stale no sobrescribe;
- la UX recupera estado vigente;
- muestra el conflicto material;
- conserva el trabajo local cuando sea seguro sin presentarlo como aplicado;
- exige revisar el nuevo delta antes de reintentar;
- no usa `last-write-wins` silencioso;
- no retrocede una publicación o aprobación posterior.

Editar una candidata y aprobar/publicar esa misma versión requieren control de concurrencia independiente del componente visual utilizado.

---

#### 26. Idempotencia y respuesta incierta

Crear definición, archivar y ejecutar transiciones sensibles deben tolerar reintentos conforme a la materialización propietaria.

Invariantes UX:

1. doble clic no crea dos definiciones ni dos versiones;
2. repetir una aprobación confirmada no produce otra decisión;
3. repetir publicación no crea dos publicaciones equivalentes;
4. una respuesta perdida obliga a recuperar resultado durable antes de generar otra identidad de operación;
5. misma identidad + payload incompatible produce conflicto;
6. un timeout no se presenta como fracaso definitivo si el resultado empresarial todavía es desconocido.

Esta tarea no prescribe el mecanismo físico de idempotencia.

---

#### 27. Evidencia y auditoría administrativa

Las acciones sensibles deben poder reconstruir:

- actor efectivo;
- contexto y alcance;
- recurso y versión;
- acción intentada;
- capacidad evaluada;
- estado de origen;
- decisión de autorización;
- cambio propuesto;
- evidencia/revisión aplicable;
- resultado;
- estado posterior;
- correlación y tiempo.

La timeline o historial que muestre la UX es una proyección de hechos durables; no constituye el ledger por sí misma.

---

#### 28. Archivo, retiro y desactivación

Archivar una definición y retirar una publicación no se tratan como borrado histórico.

Reglas:

- una publicación retirada no origina nuevos lotes;
- los lotes históricos conservan acceso a la versión exacta cuando estén autorizados;
- archivar/desactivar requiere capacidad propia cuando corresponda;
- `recipes.update` no se usa como alias de `recipes.archive`;
- retirar no reescribe la receta usada por lotes anteriores;
- la UI distingue “no utilizable para nuevo trabajo” de “inexistente”.

No se define aquí la persistencia física exacta del retiro.

---

#### 29. Frontera con el recetario operativo

La administración nunca empuja un borrador directamente a `VSCREEN-0061` por proximidad de navegación.

La progresión válida es:

```text
DEFINICION / CANDIDATO
→ PRUEBA CUANDO APLIQUE
→ REVISION
→ APROBACION
→ PUBLICACION
→ RECIPE_PUBLICATION APLICABLE
→ VSCREEN-0061
```

El recetario operativo recibe únicamente la publicación que satisface su contrato contextual.

Un actor administrativo puede utilizar una vista previa segura cuando el diseño lo requiera, pero esa preview:

- no se confunde con la receta operativa autorizada;
- no habilita producción;
- no modifica la publicación;
- no se entrega a un rol operativo como si estuviera publicada.

---

#### 30. PDF y exportación

`/recipes/pdf` es una superficie técnica y sensible separada.

La experiencia conserva:

```text
VER DEFINICION
!=
EXPORTAR

EDITAR
!=
EXPORTAR

PUBLICAR
!=
EXPORTAR
```

La exportación requiere binding propietario o contrato server-side específico.

Mientras no exista una capacidad canónica atómica consumible para exportación, la UX no la infiere desde `recipes.view`, `recipes.update`, `recipes.manage`, rol, autoría o acceso a `/recipes`.

El permiso operativo `fogo.production.recipe_book.view` tampoco concede PDF administrativo.

---

#### 31. Contraste con el AS-IS observado

En `vento-fogo@a40683b2413d621fb3f54f2eebb8743a42bad3d7` se observa:

1. `/recipes` funciona como catálogo administrativo y se protege con el literal legacy `production.recipes.manage`;
2. `/recipes/new` contiene `saveRecipe`, usa el mismo literal legacy y permite seleccionar directamente `draft`, `published` o `archived`;
3. la creación puede insertar `recipe_cards`, outputs, relaciones de uso, ingredientes y pasos dentro del mismo flujo;
4. `/recipes/[id]/edit` usa también `production.recipes.manage` y permite cambiar `draft`, `published` o `archived`;
5. la edición observada actualiza `recipe_cards` in-place;
6. outputs, relaciones de uso, ingredientes y pasos pueden eliminarse y recrearse durante edición;
7. no se observa una superficie física independiente que materialice completamente `VSCREEN-0063`;
8. no se observa una superficie física dedicada de `VSCREEN-0064`;
9. el modelo visible `draft/published/archived` no representa todo `VPROC-0016`;
10. `/recipes/pdf` usa `production.recipes.manage` aunque exportación requiere frontera propia;
11. `/recipe-book` ya existe como superficie operativa separada, pero su separación contractual completa fue definida en `FOGO-UX-008`.

Conclusión:

```text
RUTAS /recipes* AS-IS
=
BASE ADMINISTRATIVA REAL
+
LIFECYCLE COLAPSADO
+
PERMISO LEGACY AMPLIO

!=
VSCREEN-0062 + VSCREEN-0063 COMPLETAMENTE CONFORMES
```

---

#### 32. Hallazgos, propietario y condición de salida

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `production.recipes.manage` agrupa lectura, creación, edición, archivo y exportación. | Puede convertir visibilidad en autoridad amplia. | `FOGO-AUTH-013::<implementation_unit_id>` + `FOGO-AUTH-015::<implementation_unit_id>` | consumidores usan capacidades atómicas; no existen asignaciones nuevas ni fallback wildcard |
| `fogo.production.recipes.create/update/archive` están nombrados pero no son asignables por inferencia. | La UX no puede habilitarlos solo por existir en documentación. | `FOGO-AUTH-013::<implementation_unit_id>` | catálogo/binding canónico materializado y evaluable para cada capacidad antes de habilitar acción |
| aprobación, publicación y exportación no tienen binding atómico materializado observado. | Riesgo de reutilizar `update` o `manage` para decisiones críticas. | `FOGO-AUTH-013::<implementation_unit_id>` | cada efecto consume capacidad propietaria registrada; hasta entonces `DENY` |
| `saveRecipe` permite seleccionar `published` dentro del mismo formulario de creación/edición. | Colapsa autoría, aprobación y publicación. | materialización propietaria FOGO consumiendo `FOGO-UX-009` + `FOGO-AUTH-013` | guardar, revisar, aprobar y publicar quedan como efectos y gates diferenciados |
| una publicación puede actualizarse in-place en el AS-IS. | Riesgo de perder inmutabilidad e historia. | persistencia E3 + materialización FOGO | cambio material crea nueva versión candidata y la publicación previa permanece inmutable |
| ingredientes, outputs y pasos pueden reemplazarse por delete+insert durante edición. | Puede destruir la composición histórica si la versión ya fue utilizada. | persistencia E3 + materialización FOGO | edición opera sobre candidato/version nueva y conserva publicaciones históricas |
| `draft/published/archived` no representa el lifecycle completo. | Estados críticos de prueba, revisión y aprobación quedan invisibles o colapsados. | `FOGO-UX-009`, `OPS-REC-001`, materialización propietaria | UX representa `VPROC-0016` sin saltos ni alias locales que oculten decisiones |
| `VSCREEN-0063` no tiene superficie dedicada observada. | Revisión/aprobación/publicación pueden quedar embebidas en editor. | implementación propietaria FOGO | existe experiencia separada o claramente segregada que materializa la decisión sin mezclar edición |
| `VSCREEN-0064` no tiene superficie dedicada observada. | Prueba técnica puede confundirse con guardar/publicar. | `OPS-REC-001` / `FOGO-UX-015` + materialización propietaria | prueba y rendimiento quedan demostrables sin publicación automática |
| `/recipes/pdf` usa el mismo permiso legacy. | Exportación sensible puede heredar autoridad excesiva. | `FOGO-AUTH-013::<implementation_unit_id>` / `FOGO-AUTH-015::<implementation_unit_id>` | exportación consume binding propio y no depende de wildcard legacy |
| el recetario operativo y administración ya están en rutas distintas, pero comparten datos/fuentes legacy. | Separación visual podría ocultar acoplamiento de autoridad o exposición. | `FOGO-UX-008`, `FOGO-UX-009` y materializaciones propietarias | recursos, permisos, datasets y acciones quedan separados por contrato server-side, no solo navegación |

No queda hallazgo narrativo sin propietario y condición de salida.

---

#### 33. Handoff a FOGO-UX-010..015

| Tarea | Frontera preservada desde FOGO-UX-009 |
| --- | --- |
| `FOGO-UX-010` | rendimiento esperado/publicado permanece separado de cantidad real, desperdicio y resultado del lote |
| `FOGO-UX-011` | corregir un lote no modifica la publicación histórica ni la definición administrativa usada |
| `FOGO-UX-012` | consumo NEXO referencia ingredientes/version aplicables sin convertir administración de receta en movimiento físico |
| `FOGO-UX-013` | producto terminado conserva genealogía hacia receta/version sin que publicar receta cree stock |
| `FOGO-UX-014` | supervisión no obtiene edición/aprobación/publicación por observar varias áreas |
| `FOGO-UX-015` | prototipo deberá demostrar separación efectiva entre consulta operativa, autoría, prueba, revisión, aprobación y publicación |

La sucesora inmediata `FOGO-UX-010` recibe como base que el conocimiento esperado de receta/version queda gobernado y no debe sobrescribirse con resultados reales del lote.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones ya registradas para receta publicada inmutable, versionado, fórmula sensible, segregación entre operación y administración, autorización atómica, revisión/aprobación/publicación por acción, concurrencia, trazabilidad y ausencia de maestros competidores. La cobertura vigente ya asigna explícitamente esta responsabilidad a la tarea; no se introduce una obligación verificable nueva ni se modifica texto, estado, relación, secuencia o propietario del Registro 04A.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otra cobertura vigente:

- `TREQ-FOGO-002` — receta publicada inmutable/versionada, versión exacta, snapshot, ingredientes, unidades, pasos, controles, rendimiento, conservación, alérgenos, fórmula sensible y revisión/aprobación/publicación validadas por acción, contexto y actor;
- `TREQ-FOGO-004` — ejecución conserva receta/version y no sobrescribe conocimiento esperado con resultado real;
- `TREQ-FOGO-015` — exportación `/recipes/pdf` permanece protegida server-side durante el estado legacy observado;
- `TREQ-FOGO-020` — ruta, guard, permiso local o enlace no demuestran autorización completa;
- `TREQ-FOGO-022` — solo se atribuye un permiso exacto desde evidencia real y no por inferencia;
- `TREQ-AUTH-010` — segregación de funciones entre carriles y responsabilidades sensibles;
- `TREQ-AUTH-013` — mutaciones revalidan server-side actor, permiso exacto, territorio, contexto, recurso, estado y columnas aplicables;
- `TREQ-AUTH-014` — contexto y decisiones stale se invalidan antes de efectos sensibles;
- `TREQ-AUTH-015` — evidencia correlacionable de contexto, permiso, decisión y resultado;
- `TREQ-AUTH-017` — autoridad explícita para operaciones sensibles cuando corresponda;
- `TREQ-UX-001` — tarea, acción principal y estado identificables;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización;
- `TREQ-UX-009` — contexto operativo real sin autoridad fabricada desde cliente;
- `TREQ-INTEGRATION-006` — una única fuente empresarial y ausencia de maestros editables competidores.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local posterior a la incorporación del artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@03cc52e0f7fe2562d4fdaac15f2cb7fd5dcecd28`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, owner FOGO-UX, reconciliación `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `OPS-REC-001`, `FOGO-AUTH-013`, `FOGO-AUTH-015`, `VSCREEN-0061..0064`, ciclo `VPROC-0016`, cobertura 04A y las superficies AS-IS `/recipes*` y `/recipe-book`; `FOGO-UX-008` se consume desde su versión completa aprobada SHA-256 `895249968a7f4a4c0d11b20afe0c4a6074d82031dbc41516281c0a2d8b43b649` mientras su incorporación remota permanece pendiente durante esta preparación anticipada. |
| OPERATIVA | NOT_EXECUTED | No se crearon, editaron, probaron, revisaron, aprobaron, publicaron, archivaron, retiraron ni exportaron recetas reales y no se probó segregación con actores reales. |
| FÍSICA | NOT_APPLICABLE | `FOGO-UX-009` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 37. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0061` permanece operativo sobre `RECIPE_PUBLICATION` y no administra recetas;
- [ ] `VSCREEN-0062` conserva `VPROC-0016::STEP-AUTHOR_RECIPE`, `CONFIGURE / IN_PROGRESS`;
- [ ] `VSCREEN-0063` conserva `VPROC-0016::STEP-APPROVE_AND_PUBLISH_RECIPE`, `APPROVE / DECISION`;
- [ ] `VSCREEN-0064` conserva `VPROC-0016::STEP-TEST_RECIPE_AND_YIELD`, `VALIDATE / IN_PROGRESS` y no se absorbe dentro del editor;
- [ ] `RECIPE_DEFINITION` y `RECIPE_PUBLICATION` permanecen separados;
- [ ] `recipe_definition_id`, `published_recipe_version_id` y `recipe_version_ref` conservan responsabilidades distintas;
- [ ] `fogo.production.recipe_book.view` no concede administración;
- [ ] `fogo.production.recipes.view` no concede mutaciones;
- [ ] `fogo.production.recipes.manage` permanece `DECOMPOSE_REQUIRED`;
- [ ] el literal runtime `production.recipes.manage` no se trata como equivalencia canónica automática;
- [ ] `fogo.production.recipes.create`, `update` y `archive` no se habilitan hasta ser materializaciones canónicas consumibles;
- [ ] aprobación, publicación y exportación permanecen `CAPABILITY_BINDING_REQUIRED` hasta disponer de capacidad propietaria real;
- [ ] crear, guardar, probar, revisar, aprobar y publicar permanecen efectos distintos;
- [ ] el lifecycle completo de `VPROC-0016` no se reemplaza por `draft/published/archived`;
- [ ] `APPROVED` no se presenta como `PUBLISHED`;
- [ ] `PUBLISHED` no se presenta como `RECIPE_VERSION_RELEASED`;
- [ ] una versión publicada no se edita destructivamente;
- [ ] un cambio material sobre publicación genera nueva candidata/version;
- [ ] lotes históricos conservan `recipe_version_ref` y publicación previa;
- [ ] una publicación retirada no origina nuevos lotes y no desaparece de historia autorizada;
- [ ] revisión técnica permite comprender ingredientes, unidades, rendimiento, pasos, controles, alérgenos, conservación y aplicabilidad relevantes;
- [ ] la prueba técnica no publica automáticamente;
- [ ] aprobación crítica conserva segregación de funciones;
- [ ] responsabilidades `RESPONSABLE_PRODUCTIVO`, `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD` y `GERENCIA_GENERAL` no se transforman por texto en permisos runtime;
- [ ] seleccionar sede/área de aplicabilidad no crea autoridad sobre ese territorio;
- [ ] un actor de solo lectura puede consultar sin editar;
- [ ] un estado/version stale no se sobrescribe mediante last-write-wins;
- [ ] retries o doble submit no duplican creación/aprobación/publicación;
- [ ] una respuesta incierta se reconcilia antes de repetir la operación con nueva identidad;
- [ ] la UX puede reconstruir actor, recurso, versión, acción, decisión y resultado de mutaciones sensibles;
- [ ] archivar/retirar no borra historia;
- [ ] PDF/exportación no se deriva de lectura, update, rol ni wildcard legacy;
- [ ] el AS-IS se clasifica como base real con lifecycle colapsado, no como contrato objetivo completo;
- [ ] cada hallazgo conserva propietario y condición exacta de salida;
- [ ] `FOGO-UX-010` recibe conocimiento esperado de receta/version sin reabrir administración;
- [ ] la topología permanece `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 38. Límites

Esta tarea no:

- implementa `VSCREEN-0062`, `VSCREEN-0063` ni `VSCREEN-0064`;
- modifica `/recipes`, `/recipes/new`, `/recipes/[id]/edit`, `/recipes/pdf` ni `/recipe-book`;
- crea rutas, componentes, RPC, tablas, vistas, RLS, grants, migraciones o datos;
- crea o asigna permisos;
- materializa `fogo.production.recipes.create`, `update` o `archive`;
- inventa nombres de capacidad para aprobar, publicar o exportar;
- convierte `recipes.manage` en alias;
- migra físicamente `production.*` a `fogo.production.*`;
- crea, edita, publica, retira, archiva o exporta recetas reales;
- define el esquema físico de versiones;
- ejecuta una prueba de receta;
- registra rendimiento real de lote;
- modifica productos, ingredientes, unidades o conversiones maestras de NEXO;
- crea lotes ni modifica producción;
- cambia calidad, inventario, costos o disponibilidad;
- desarrolla el detalle de `FOGO-UX-010`;
- crea una instancia física;
- modifica el Registro 04A.

---

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-008 — Mostrar receta resumida para operación`

**TAREA ACTUAL APROBADA**
`FOGO-UX-009 — Separar recetario operativo y administración de recetas`

**SIGUIENTE TAREA RESERVADA**
`FOGO-UX-010 — Registrar cantidades, desperdicio y resultado`

### [ ] FOGO-UX-010 — Registrar cantidades, desperdicio y resultado
### [ ] FOGO-UX-011 — Diseñar correcciones sin alterar historial
### [ ] FOGO-UX-012 — Conectar consumo de insumos con NEXO
### [ ] FOGO-UX-013 — Conectar producto terminado con NEXO
### [ ] FOGO-UX-014 — Diseñar pantalla para supervisor de producción
### [ ] FOGO-UX-015 — Validar el prototipo por área productiva
