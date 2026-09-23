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
