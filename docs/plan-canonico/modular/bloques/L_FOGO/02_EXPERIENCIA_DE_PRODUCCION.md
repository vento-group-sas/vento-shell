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

### [ ] FOGO-UX-002 — Separar cocina, panadería y repostería
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
