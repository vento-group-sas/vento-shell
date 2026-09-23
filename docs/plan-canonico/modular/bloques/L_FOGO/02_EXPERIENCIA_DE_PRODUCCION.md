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

### [ ] FOGO-UX-003 — Diseñar inicio por área productiva
### [ ] FOGO-UX-004 — Mostrar producción pendiente del turno
### [ ] FOGO-UX-005 — Diseñar inicio de lote
### [ ] FOGO-UX-006 — Diseñar producción parcial
### [ ] FOGO-UX-007 — Diseñar finalización de lote
### [ ] FOGO-UX-008 — Mostrar receta resumida para operación
### [ ] FOGO-UX-009 — Separar recetario operativo y administración de recetas
### [ ] FOGO-UX-010 — Registrar cantidades, desperdicio y resultado
### [ ] FOGO-UX-011 — Diseñar correcciones sin alterar historial
### [ ] FOGO-UX-012 — Conectar consumo de insumos con NEXO
### [ ] FOGO-UX-013 — Conectar producto terminado con NEXO
### [ ] FOGO-UX-014 — Diseñar pantalla para supervisor de producción
### [ ] FOGO-UX-015 — Validar el prototipo por área productiva
