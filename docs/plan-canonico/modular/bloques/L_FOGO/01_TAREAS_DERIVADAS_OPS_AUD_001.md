### TAREAS PRODUCTIVAS DERIVADAS DE OPS-AUD-001

Estas tareas concretan necesidades productivas detectadas en E1. Sus salidas se
integran con las tareas FOGO existentes; no las sustituyen ni autorizan
implementación anticipada.

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:OPS-PRODUCTION-DESIGN -->
### Reconciliación topológica de OPS-REC-001, OPS-PRD-001 y OPS-TRZ-001

Las tres tareas derivadas definen contratos o diseño operativo y entregan entradas a FOGO, NEXO, NUMERA y E5. No autorizan ni representan implementación física anticipada.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap
**Tarea siguiente:** OPS-PRD-001 — Diseñar el Centro de Pesaje, Premezclas y Porcionamiento
**Tipo de tarea:** contrato documental integral de identidad, versionado, publicación, vigencia, composición y acceso contextual de recetas
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_TAREAS_DERIVADAS_OPS_AUD_001.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, datos, Supabase, permisos, migraciones, RLS, RPC, rutas, despliegues ni recetas reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Cerrar el contrato canónico de receta que FOGO utilizará para desarrollar, probar, revisar, aprobar, publicar y consumir conocimiento productivo sin perder identidad, versión, vigencia, contexto, trazabilidad ni separación de responsabilidades.

El contrato debe permitir distinguir de forma inequívoca:

```text
DEFINICIÓN DE RECETA
≠
VERSIÓN PUBLICADA
≠
PROYECCIÓN OPERATIVA
≠
LOTE O EJECUCIÓN
≠
PRODUCTO O INGREDIENTE MAESTRO
≠
DISPONIBILIDAD FÍSICA
≠
COSTO REALIZADO
```

La receta permanece gobernada por FOGO. NEXO conserva la identidad maestra y la verdad física de productos, ingredientes, unidades, conversiones, disponibilidad y movimientos; NUMERA consume los hechos necesarios para costo; E3 gobierna la persistencia física y la arquitectura de datos.

---

#### 2. Autoridades canónicas consumidas

Este contrato reutiliza sin redefinir:

- `VPROC-0016` — Gestionar desarrollo, prueba, aprobación, publicación y versión de recetas;
- `RECIPE_DEFINITION` — recurso administrativo de definición de receta;
- `RECIPE_PUBLICATION` — recurso de versión publicada aplicable;
- `recipe_definition_id` — localizador de la definición administrativa;
- `published_recipe_version_id` — localizador de la versión publicada;
- `recipe_version_ref` — referencia exacta de versión utilizada por integraciones y ejecuciones;
- `fogo.production.recipes.view` — consulta administrativa de definiciones y versiones;
- `fogo.production.recipe_book.view` — consulta del recetario operativo;
- la identidad canónica de productos, preparaciones, ingredientes y unidades gobernada por NEXO;
- la cobertura vigente de `TREQ-FOGO-002` y sus relaciones.

La tarea no crea un identificador físico adicional para versiones no publicadas. La representación física exacta de claves, tablas y relaciones queda reservada a E3 y a los paquetes propietarios.

---

#### 3. Propiedad y fronteras de responsabilidad

| Materia | Propietario canónico | Regla |
| --- | --- | --- |
| definición, método y conocimiento de receta | FOGO | FOGO desarrolla, prueba, revisa, aprueba y publica la receta |
| versión publicada y vigencia productiva | FOGO | solo una versión publicada y aplicable puede originar nuevos usos productivos |
| producto, preparación e ingrediente maestro | NEXO | la receta referencia identidades maestras; no crea copias competidoras |
| unidades y conversiones físicas | NEXO | la receta consume unidades y factores canónicos; no inventa conversiones locales |
| disponibilidad, reserva, consumo y movimiento físico | NEXO | una receta no demuestra disponibilidad ni altera inventario por sí sola |
| lote, ejecución, rendimiento real, merma y desviación | FOGO | el resultado real se registra sobre la ejecución sin sobrescribir el conocimiento esperado |
| costo y análisis económico | NUMERA | consume versión, cantidades y hechos autorizados; la publicación de receta no demuestra costo realizado |
| persistencia, esquema y controles de datos | E3 | esta tarea no define tablas, RLS, RPC, triggers ni migraciones |
| autorización de acciones sobre recetas y lotes | FOGO-AUTH | esta tarea define el recurso y la aplicabilidad, no concede permisos |
| experiencia administrativa y operativa | FOGO-UX | consume este contrato sin fusionar administración con recetario operativo |

Regla transversal:

```text
UNA FUENTE DE VERDAD POR HECHO
+
REFERENCIAS CANÓNICAS ENTRE DOMINIOS
+
CERO CATÁLOGOS EDITABLES COMPETIDORES
```

---

#### 4. Identidad de la receta

`RECIPE_DEFINITION` representa la definición gobernada de una receta y se localiza mediante `recipe_definition_id`.

La identidad de la receta no cambia por:

- una nueva prueba;
- una nueva cantidad objetivo;
- una nueva versión publicada;
- un cambio de vigencia;
- un cambio de sede o área aplicable;
- una modificación de presentación;
- la ejecución de un lote;
- un cambio de costo;
- una sustitución puntual autorizada en una ejecución.

La identidad sí debe permanecer separada de la identidad de producto, preparación, presentación, lote y publicación.

Una receta referencia productos, ingredientes o preparaciones intermedias mediante identidades canónicas; no utiliza nombres libres como sustituto de esas identidades cuando existe un maestro aprobado.

---

#### 5. Versión publicada

`RECIPE_PUBLICATION` representa una versión publicada, inmutable y aplicable de una receta.

Su localizador canónico es:

```text
published_recipe_version_id
```

y las integraciones conservan la referencia exacta mediante:

```text
recipe_version_ref
```

Reglas obligatorias:

1. una versión publicada no se edita en sitio;
2. un cambio material produce una nueva versión;
3. una versión retirada no origina nuevos lotes;
4. una versión retirada permanece consultable cuando sea necesaria para historia, auditoría, trazabilidad, costo o reproducción de una ejecución previa;
5. cada lote o ejecución conserva la versión exacta utilizada;
6. la ejecución conserva un snapshot suficiente para reproducir las condiciones relevantes aunque la versión vigente cambie después;
7. publicación y disponibilidad de ingredientes son hechos distintos;
8. aprobación y publicación son estados distintos;
9. una versión publicada solo es utilizable dentro de su vigencia y aplicabilidad.

---

#### 6. Ciclo de vida de `VPROC-0016`

Se adopta sin alteración el ciclo canónico ya materializado para `VPROC-0016`:

| Estado | Significado contractual |
| --- | --- |
| `RECIPE_DRAFT` | existe resultado objetivo, autor y composición o método preliminar; todavía no está aprobada, publicada ni autorizada para nuevos lotes |
| `IN_DEVELOPMENT` | se construyen o ajustan formulación, método, rendimiento y controles |
| `IN_TESTING` | se ejecuta una prueba controlada y se registran resultados reales |
| `UNDER_TECHNICAL_REVIEW` | se revisan ingredientes, unidades, rendimiento, inocuidad, alérgenos y factibilidad |
| `PENDING_APPROVAL` | la versión candidata espera aprobación autorizada |
| `APPROVED` | la versión fue aprobada pero todavía no puede originar nuevos lotes |
| `PUBLISHED` | la versión está habilitada para uso productivo dentro de su vigencia y alcance |
| `RECIPE_VERSION_RELEASED` | la versión aprobada y publicada quedó liberada con rendimiento, ingredientes, pasos, controles y restricciones completos y aceptados por sus consumidores autorizados |

`RECIPE_VERSION_RELEASED` no demuestra por sí solo:

- producción ejecutada;
- calidad real de un lote;
- costo realizado;
- disponibilidad de ingredientes;
- inventario suficiente;
- liberación de producto terminado.

---

#### 7. Contenido mínimo de una versión utilizable

Una versión publicada debe permitir reconstruir como mínimo:

| Dimensión | Obligación |
| --- | --- |
| identidad | referencia inequívoca a la definición de receta y a la versión publicada |
| resultado objetivo | producto o preparación resultante mediante identidad canónica |
| rendimiento esperado | cantidad objetivo y unidad canónica |
| porciones | cantidad o medida de porción cuando sea aplicable |
| ingredientes | referencias canónicas a producto, ingrediente o preparación intermedia |
| cantidades | cantidad base por ingrediente en unidad compatible |
| unidades | unidades canónicas y conversiones gobernadas, sin equivalencias locales silenciosas |
| orden | secuencia de pasos suficientemente determinada para ejecución reproducible |
| método | instrucciones y condiciones necesarias para producir el resultado esperado |
| controles | puntos de control, tolerancias y verificaciones aplicables |
| escalamiento | regla determinista de escala, redondeo y tolerancia |
| alérgenos | declaración aplicable con fuente o condición de verificación |
| conservación | condiciones de conservación, manipulación y vigencia del resultado cuando correspondan |
| calidad | especificaciones o criterios de aceptación aplicables |
| vigencia | intervalo durante el cual la versión puede utilizarse para nuevos usos |
| aplicabilidad | producto/proceso y contexto organizacional u operativo al que la publicación aplica |
| sensibilidad | tratamiento de fórmula y campos que requieren exposición mínima |
| evidencia | referencias de prueba, revisión y aprobación necesarias para la publicación |

La ausencia de una dimensión que sea material para la receta impide tratar la versión como completa por simple existencia de un registro.

---

#### 8. Ingredientes, unidades y preparaciones intermedias

Los ingredientes y preparaciones intermedias se consumen como referencias canónicas.

Está prohibido resolver el contrato mediante:

```text
NOMBRE LIBRE
+
UNIDAD LIBRE
+
FACTOR LOCAL
```

cuando existe una identidad o unidad canónica.

Cada línea debe conservar suficiente información para:

- identificar el elemento utilizado;
- conocer cantidad y unidad base;
- aplicar una conversión gobernada cuando corresponda;
- distinguir ingrediente maestro de preparación intermedia;
- impedir que dos consumidores interpreten de forma diferente la misma cantidad;
- detectar que una unidad o conversión ya no es válida.

NEXO permanece propietario de las identidades, unidades y conversiones físicas. FOGO permanece propietario de cómo esas referencias componen una receta.

---

#### 9. Escalamiento, rendimiento y tolerancias

El escalamiento de una versión debe ser determinista.

La cantidad objetivo se deriva del rendimiento esperado y no altera la versión publicada.

Reglas:

1. la escala parte del rendimiento base declarado;
2. las cantidades resultantes conservan unidades compatibles;
3. toda conversión utiliza factores canónicos;
4. redondeo y tolerancia deben estar definidos cuando el resultado pueda cambiar por precisión;
5. un componente o paso no escalable debe quedar explícitamente identificado y no puede escalarse por inferencia;
6. el rendimiento esperado permanece separado del rendimiento real;
7. merma, sustituciones y desviaciones reales pertenecen a la ejecución y no reescriben la receta publicada.

Una desviación repetida puede motivar una nueva versión, pero nunca modifica retrospectivamente la versión usada por lotes históricos.

---

#### 10. Alérgenos, inocuidad, conservación y calidad

La existencia de un campo de alérgenos no equivale a información verificada.

El contrato exige:

- preservar la fuente o condición de verificación de la información material;
- revisar alérgenos durante `UNDER_TECHNICAL_REVIEW`;
- impedir que una nueva versión elimine silenciosamente una advertencia material;
- asociar conservación y restricciones de uso a la versión que las originó;
- mantener separadas receta publicada, resultado real del lote y disposición de calidad;
- conservar especificaciones y controles necesarios para la preparación;
- no presentar una versión como técnicamente validada solo porque fue guardada.

La validación profesional o regulatoria que corresponda no se sustituye por esta tarea documental.

---

#### 11. Aplicabilidad contextual

La publicación define a qué producto, proceso y contexto puede aplicarse.

El acceso operativo se resuelve con la intersección de:

```text
VERSIÓN PUBLICADA Y VIGENTE
+
PRODUCTO / PROCESO COMPATIBLE
+
SEDE COMPATIBLE CUANDO APLIQUE
+
ÁREA PRODUCTIVA ACTIVA
+
FUNCIÓN ACTIVA
+
ACTOR HUMANO EFECTIVO
+
DISPOSITIVO / ESTACIÓN COMPATIBLE CUANDO APLIQUE
+
AUTORIZACIÓN EFECTIVA
```

Reglas:

- una sede no autoriza por sí sola todas las recetas;
- un área reduce el universo aplicable, no crea autoridad;
- una estación es contexto técnico, no actor empresarial;
- una función operativa delimita trabajo autorizado, pero no sustituye permisos;
- un rol describe elegibilidad y nunca concede la receta por nombre;
- el tipo de preparación actúa como dimensión de aplicabilidad y no como permiso;
- cambiar de actor en dispositivo compartido obliga a recalcular el contexto;
- una preferencia de interfaz no amplía vínculos server-side.

---

#### 12. Separación entre administración y recetario operativo

##### 12.1. Administración

`fogo.production.recipes.view` permanece en carril `BASE_ONLY`.

Permite consultar `RECIPE_DEFINITION` dentro del alcance organizacional autorizado, incluyendo borradores o versiones que correspondan, con campos sensibles protegidos.

La edición administrativa:

- no se realiza desde una estación compartida salvo contrato expreso posterior;
- no se deriva del permiso de lectura;
- no se deriva de autoría;
- no se deriva del rol;
- no se deriva de abrir la pantalla.

El identificador histórico `fogo.production.recipes.manage` permanece `DECOMPOSE_REQUIRED`. Esta tarea no lo convierte en permiso atómico definitivo ni define aquí sus sustitutos. La protección de las acciones de receta y lote corresponde a `FOGO-AUTH-013` y a las tareas de autorización propietarias.

##### 12.2. Recetario operativo

`fogo.production.recipe_book.view` permanece en carril `OPERATIONAL_ONLY`.

Permite consultar `RECIPE_PUBLICATION` únicamente cuando:

- la versión está publicada y vigente;
- la función activa corresponde al trabajo productivo;
- el área productiva es compatible;
- el contexto efectivo lo permite;
- la publicación es aplicable al producto o proceso;
- la autorización efectiva permite la consulta.

El recetario operativo es una proyección mínima para ejecutar trabajo. No expone por defecto:

- borradores;
- versiones no publicadas;
- historial administrativo completo;
- decisiones de aprobación;
- campos de fórmula no necesarios para la tarea;
- permisos de edición;
- catálogo organizacional completo.

---

#### 13. Sensibilidad y exposición mínima

Las recetas y el recetario operativo se consideran información sensible.

La exposición debe seguir necesidad de trabajo:

```text
OPERACIÓN
→ SOLO INFORMACIÓN NECESARIA PARA PREPARAR Y CONTROLAR

ADMINISTRACIÓN AUTORIZADA
→ INFORMACIÓN NECESARIA PARA DEFINIR, REVISAR O APROBAR

OTROS CONSUMIDORES
→ PROYECCIÓN CONTRACTUAL MÍNIMA
```

La sensibilidad no autoriza esconder alérgenos, controles de inocuidad o información necesaria para ejecutar con seguridad.

La autoría de una receta no concede acceso posterior ni propiedad autorizante.

La exportación, PDF u otra salida secundaria debe conservar autorización server-side propia; esta tarea no amplía las capacidades de exportación existentes.

---

#### 14. Prueba, revisión y segregación

`VPROC-0016` conserva segregación entre desarrollo, prueba, evaluación técnica y aprobación final.

Responsabilidades ya aprobadas:

- responsable primario de desarrollo: `RESPONSABLE_PRODUCTIVO`;
- participación técnica: `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD`;
- apoyos autorizados: equipo productivo, responsable de catálogo y responsable analítico cuando corresponda;
- aprobación final crítica: `GERENCIA_GENERAL`.

Regla:

```text
INICIAR O PREPARAR
+
EJECUTAR PRUEBA
≠
APROBAR EN SOLITARIO LA MISMA DECISIÓN CRÍTICA
```

La prueba de receta conserva resultado real y evidencia. Un resultado de prueba no se convierte automáticamente en nueva versión publicada.

---

#### 15. Consumo por lote y ejecución

Al iniciar una ejecución productiva debe quedar determinada la versión exacta que gobierna el trabajo.

El vínculo de ejecución conserva como mínimo:

- referencia de versión;
- producto o preparación objetivo;
- sede y área productiva;
- cantidad objetivo;
- escala aplicada;
- snapshot suficiente de ingredientes, unidades, pasos, controles y restricciones;
- actor y contexto según los contratos propietarios;
- orden o necesidad origen cuando corresponda.

La ejecución puede registrar:

- rendimiento real;
- merma;
- sustitución;
- desviación;
- cantidad consumida;
- resultado producido;
- evidencias y controles.

Estos hechos pertenecen al lote o ejecución y no modifican retrospectivamente la publicación.

---

#### 16. Interoperabilidad

| Consumidor | Qué recibe | Qué no puede inferir |
| --- | --- | --- |
| FOGO operación | versión publicada aplicable, escala, pasos, controles y restricciones | permiso administrativo, disponibilidad física o aprobación de cambio |
| NEXO | referencias necesarias para ingredientes, unidades y efectos físicos posteriores | propiedad de la receta o derecho a modificarla |
| NUMERA | versión y cantidades necesarias para reproducir el fundamento de costo | que la receta publicada equivale a costo realizado |
| PULSO u otros canales | proyección publicada necesaria para una preparación u oferta autorizada | copia editable de receta o fuente de verdad paralela |
| E3 | requisitos de persistencia, versionado, integridad y acceso que debe materializar físicamente | libertad para cambiar propiedad funcional o semántica |
| integraciones productivas | `recipe_version_ref` exacta y hechos correlacionados | sustitución silenciosa de versión o escritura cruzada directa |

Los consumidores no pueden convertir una proyección en fuente maestra.

---

#### 17. Handoff a tareas posteriores

| Tarea / dominio | Handoff de OPS-REC-001 |
| --- | --- |
| `OPS-PRD-001` | versión, escala, sensibilidad, alérgenos, conservación y restricciones que condicionan pesaje, premezcla, porcionamiento y protección de fórmula |
| `FOGO-UX-008` | contrato para mostrar una receta resumida y aplicable durante operación |
| `FOGO-UX-009` | frontera exacta entre recetario operativo y administración de recetas |
| `FOGO-AUTH-013` | tipos de recurso, aplicabilidad y sensibilidad que deben protegerse en recetas y lotes |
| NEXO | referencias maestras de ingrediente/unidad y fronteras con disponibilidad/movimiento |
| NUMERA | referencia de versión y cantidades para consumo económico posterior |
| E3 | invariantes que deben preservarse al diseñar persistencia, integridad, RLS y transición |
| E5 | contrato documental que deberá consumirse dentro de paquetes propietarios sin reabrir la definición |

---

#### 18. Pendientes legítimos y propietario

OPS-REC-001 no deja decisiones propias sin propietario.

| Materia todavía no materializada por esta tarea | Por qué no pertenece aquí | Propietario / salida |
| --- | --- | --- |
| permisos atómicos de mutación de recetas | autorización no se define desde el contrato funcional | `FOGO-AUTH-013` y familia FOGO-AUTH |
| UI administrativa y operativa | la experiencia consume el contrato, no lo redefine | `FOGO-UX-008` y `FOGO-UX-009` |
| tablas, claves físicas, RLS, RPC y migraciones | arquitectura física reservada | E3 y paquete propietario |
| disponibilidad, reserva y movimiento de ingredientes | verdad física de inventario | NEXO |
| costo realizado | requiere hechos de ejecución y reglas económicas | NUMERA |
| pesaje, premezcla y porcionamiento | capacidad productiva derivada | `OPS-PRD-001` |
| lote, etiqueta y trazabilidad ampliada | contrato productivo posterior | `OPS-TRZ-001` |
| implementación y piloto | requiere package y lifecycle físico | E5 y tareas físicas propietarias |

---

#### 19. Requisitos de prueba derivados

**NO GENERA NI MODIFICA REQUISITOS DE PRUEBA.**

Justificación: el comportamiento verificable de receta, versión, publicación, snapshot, rendimiento, ingredientes, unidades, pasos, controles, alérgenos, conservación, sensibilidad y autorización contextual ya está cubierto por requisitos vigentes cuyo origen y tareas responsables incluyen expresamente este contrato. La presente tarea concreta ese contrato sin introducir una obligación observable adicional.

---

#### 20. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-FOGO-002` como cobertura directa del contrato de receta publicada, versionado, snapshot, escalamiento, alérgenos, conservación y fórmula sensible;
- `TREQ-FOGO-001` para el ciclo del lote y sus efectos de ejecución;
- `TREQ-NEXO-010` para unidad, conversión y semántica coherente entre consumidores;
- `TREQ-SUPABASE-012` para integridad y persistencia física del conocimiento gobernado;
- `TREQ-AUTH-015` para protección de información y acciones sensibles;
- `TREQ-INTEGRATION-006` para fuente empresarial única y ausencia de maestros competidores.

Esta trazabilidad no modifica 04A.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar este artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron continuidad vigente, owner, topología `DEFINE_ONCE`, gate `NO_PHYSICAL_INSTANCE`, ciclo `VPROC-0016`, recursos `RECIPE_DEFINITION` y `RECIPE_PUBLICATION`, contratos de acceso, consumidores, cobertura 04A vigente y scripts de validación aplicables. |
| OPERATIVA | NOT_EXECUTED | No se crean ni prueban recetas reales; la evidencia productiva pertenece a implementación y pruebas posteriores. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea instancia física propia ni modifica producto, inventario, datos o infraestructura. |

---

#### 22. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `RECIPE_DEFINITION` y `RECIPE_PUBLICATION` permanecen conceptos distintos;
- [ ] se conservan `recipe_definition_id`, `published_recipe_version_id` y `recipe_version_ref` con sus responsabilidades existentes;
- [ ] el ciclo de `VPROC-0016` se conserva sin estados inventados;
- [ ] `APPROVED` no se confunde con `PUBLISHED`;
- [ ] una versión publicada es inmutable y un cambio material produce nueva versión;
- [ ] una versión retirada no puede originar nuevos lotes y permanece trazable históricamente;
- [ ] cada ejecución conserva la versión exacta y snapshot suficiente;
- [ ] ingredientes y unidades usan referencias canónicas y conversiones gobernadas;
- [ ] escalamiento, redondeo y tolerancias no dependen de defaults silenciosos;
- [ ] rendimiento esperado permanece separado de rendimiento real, merma y desviación;
- [ ] alérgenos, conservación, inocuidad y calidad permanecen ligados a la versión aplicable;
- [ ] el recetario operativo usa solo versión publicada, vigente y contextual;
- [ ] `fogo.production.recipe_book.view` permanece operativo y `fogo.production.recipes.view` administrativo;
- [ ] `fogo.production.recipes.manage` no se presenta como permiso atómico definitivo;
- [ ] sede, área, estación, rol, función y tipo de preparación reducen aplicabilidad sin convertirse en autorización por sí solos;
- [ ] FOGO, NEXO, NUMERA y E3 conservan fronteras de propiedad explícitas;
- [ ] ningún consumidor crea un maestro editable competidor;
- [ ] todos los pendientes materiales tienen propietario y condición de salida;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 23. Límites

Este contrato no:

- crea, modifica, publica o retira recetas reales;
- define IDs físicos adicionales a los ya aprobados;
- crea tablas, columnas, funciones, RPC, triggers, RLS o migraciones;
- implementa permisos;
- corrige el permiso histórico `fogo.production.recipes.manage`;
- modifica productos, ingredientes, unidades o conversiones de NEXO;
- reserva ni consume inventario;
- calcula costo realizado;
- implementa pantallas;
- autoriza dispositivos;
- ejecuta producción;
- implementa el Centro de Pesaje, Premezclas y Porcionamiento;
- define el contrato completo de lotes y etiquetas;
- autoriza implementación física o piloto.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap`

**TAREA ACTUAL APROBADA**
`OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual`

**SIGUIENTE TAREA RESERVADA**
`OPS-PRD-001 — Diseñar el Centro de Pesaje, Premezclas y Porcionamiento`

### ✅ OPS-PRD-001 — Diseñar el Centro de Pesaje, Premezclas y Porcionamiento

**Estado:** APROBADA
**Tarea anterior:** OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual
**Tarea siguiente:** OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva
**Tipo de tarea:** diseño documental de capacidad productiva futura y contrato operativo de preparación de materiales
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_TAREAS_DERIVADAS_OPS_AUD_001.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea áreas, equipos, puestos, inventario, reservas, movimientos, datos, Supabase, permisos, migraciones ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el Centro de Pesaje, Premezclas y Porcionamiento como capacidad futura del Centro de Producción y Distribución, definiendo su posición funcional, actores, flujo, equipos por capacidad, modelo de dimensionamiento, preparación de kits, relación con reservas e inventario, atención de urgencias, controles de alérgenos y contaminación cruzada, almacenamiento temporal, devoluciones y protección de fórmulas.

El diseño debe permitir:

- pesar ingredientes contra una versión de receta aprobada;
- preparar mezclas secas cuando corresponda;
- porcionar insumos;
- formar kits de preparación por receta, versión, cantidad objetivo y destino productivo;
- reducir errores de preparación;
- controlar consumo sin convertir preparación en movimiento de inventario implícito;
- mejorar trazabilidad;
- reducir exposición innecesaria de fórmulas sensibles;
- responder a demanda planificada y a cambios operativos tardíos sin perder control.

La tarea diseña el contrato de la capacidad. No demuestra viabilidad física, no selecciona equipos concretos, no asigna espacio definitivo y no activa operación.

---

#### 2. Condiciones heredadas

El diseño consume como condiciones obligatorias:

1. `OPS-PLAN-001` separa demanda observada, capacidad disponible y decisión futura de producción.
2. Los productos pueden ser previsibles, estacionales, bajo pedido, críticos o de producción limitada.
3. Capacidad, equipos, personal, ventana horaria, logística e insumos son restricciones explícitas de planificación.
4. El Centro de Pesaje es una capacidad futura, no implementada.
5. Su ubicación física exacta continúa condicionada a espacio, personal y viabilidad.
6. La operación actual presenta una ventana crítica:
   - producción termina alrededor de las 14:00;
   - el centro puede quedar sin personal hacia las 17:00;
   - remisiones pueden llegar durante la noche;
   - producción reinicia alrededor de las 06:00.
7. Por esa condición, el modelo no puede depender exclusivamente de preparar kits durante la tarde anterior.
8. `OPS-REC-001` entrega versión, escala, sensibilidad, alérgenos, conservación y restricciones para pesaje, premezcla, porcionamiento y protección de fórmula.
9. NEXO conserva identidades maestras, unidades, conversiones, disponibilidad, reservas y movimientos físicos.
10. FOGO conserva planificación y ejecución productiva.
11. NUMERA consume hechos económicos y costos, sin convertirse en fuente de movimiento físico.
12. E5 conserva el piloto y cualquier implementación real.

---

#### 3. Decisión de ubicación funcional

La ubicación funcional objetivo es el **Centro de Producción y Distribución**, dentro de la instalación integrada ya reconocida canónicamente.

El Centro de Pesaje no se diseña como:

- sede independiente;
- inventario independiente;
- bodega paralela;
- aplicación independiente;
- fuente de verdad de existencias;
- área comercial;
- sustituto de las áreas productivas.

Su posición funcional es una frontera controlada entre:

```text
NEXO
CUSTODIA / DISPONIBILIDAD / RESERVA / MOVIMIENTO
        ↓
CENTRO DE PESAJE
PREPARACIÓN CONTROLADA DE MATERIALES
        ↓
FOGO
EJECUCIÓN PRODUCTIVA
```

La ubicación física definitiva dentro de la instalación no queda fijada por coordenada, sala o metraje en esta tarea.

La decisión física posterior deberá demostrar:

- cercanía operativa suficiente a los puntos de abastecimiento;
- separación compatible con inocuidad y contaminación cruzada;
- circulación segura de personas y materiales;
- capacidad de limpieza;
- acceso controlable;
- espacio de staging;
- espacio de devoluciones o cuarentena operativa;
- compatibilidad con frío cuando aplique;
- factibilidad de equipos;
- viabilidad de operación en la ventana requerida.

---

#### 4. Naturaleza del centro

El Centro de Pesaje se define como una **capacidad productiva de preparación previa de materiales**.

Puede ejecutar cuatro familias de trabajo:

| Familia | Resultado |
| --- | --- |
| `PESAJE` | cantidad medida de un ingrediente o preparación, vinculada a necesidad productiva |
| `PORCIONAMIENTO` | cantidad separada para una ejecución, sin cambiar por sí sola la identidad del material |
| `KIT_DE_PREPARACION` | agrupación operativa de componentes destinados a una receta, versión y cantidad objetivo |
| `PREMEZCLA` | preparación intermedia obtenida por combinación controlada cuando la receta lo exige |

Una simple agrupación o porcionamiento no crea automáticamente un producto nuevo.

Una premezcla que transforma o combina materiales de forma que deba conservar composición, versión, lote o rendimiento se trata como resultado productivo y debe conservar las reglas de FOGO y la trazabilidad posterior correspondiente.

El término `KIT_DE_PREPARACION` es una descripción operativa de esta capacidad y no redefine el contrato de kits y conjuntos patrimoniales de NEXO.

---

#### 5. Fronteras de propiedad

| Materia | Propietario | Regla |
| --- | --- | --- |
| plan productivo y prioridad | FOGO | determina qué trabajo productivo debe prepararse |
| receta y versión | FOGO | define composición, escala, restricciones y sensibilidad |
| producto e ingrediente maestro | NEXO | identifica el material físico |
| unidad y conversión | NEXO | gobierna interpretación física de cantidades |
| disponibilidad | NEXO | ninguna proyección local sustituye la disponibilidad canónica |
| reserva | NEXO | una reserva reduce disponibilidad según contrato, pero no equivale a consumo |
| movimiento físico | NEXO | entrada, traslado, retiro, devolución y consumo conservan movimiento correlacionado |
| preparación de materiales | FOGO | ejecuta el trabajo contra plan y receta aprobados |
| calidad e inocuidad | contratos de calidad vigentes | alérgenos, restricciones y liberación no se infieren desde la preparación |
| costo | NUMERA | consume hechos trazables; no origina movimientos |
| lotes y etiquetado ampliado | `OPS-TRZ-001` | recibe el handoff de identidad y trazabilidad de materiales preparados |
| implementación física | E5 | valida espacio, personal, equipos, piloto y viabilidad |

---

#### 6. Modelo de actores

El centro reutiliza responsabilidades canónicas; no crea un rol nuevo por el nombre de la capacidad.

| Responsabilidad | Actor o familia canónica |
| --- | --- |
| accountable del trabajo de preparación | `RESPONSABLE_PRODUCTIVO` |
| ejecución ordinaria | `EQUIPO_PRODUCTIVO` dentro de variante y área habilitadas |
| soporte de disponibilidad, retiro, ubicación y devolución | `BODEGA_Y_ABASTECIMIENTO` |
| control de alérgenos, inocuidad y desviaciones | `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD` |
| excepción operativa y priorización material | `GERENCIA_O_SUPERVISION_DE_SEDE` / `COORDINACION_DE_OPERACIONES` según contrato aplicable |
| preparación del plan que origina necesidad | responsabilidades de `VPROC-0033` |
| ejecución de materiales y producción | responsabilidades de `VPROC-0034` |

Reglas:

- el equipo productivo no obtiene autoridad de inventario por trabajar en el centro;
- bodega no obtiene autoridad sobre receta por entregar materiales;
- calidad no se convierte en ejecutor ordinario por revisar una excepción;
- una urgencia no elimina segregaciones;
- el dispositivo o estación no es actor empresarial.

---

#### 7. Flujo operativo objetivo

El flujo conceptual es:

```text
NECESIDAD PRODUCTIVA ACEPTADA
→ VERSION DE RECETA Y CANTIDAD OBJETIVO
→ DISPONIBILIDAD Y RESERVA NEXO
→ COLA DE PREPARACION
→ PICK / ENTREGA DE MATERIAL
→ VERIFICACION DE IDENTIDAD Y CONDICION
→ PESAJE / PORCIONAMIENTO / PREMEZCLA
→ CONTROLES APLICABLES
→ KIT O RESULTADO PREPARADO
→ STAGING CONTROLADO
→ ENTREGA A AREA PRODUCTIVA
→ CONSUMO / DEVOLUCION / DIFERENCIA
→ CONCILIACION
```

No se permite:

```text
RESERVA = CONSUMO
```

ni:

```text
MATERIAL PREPARADO = LOTE LIBERADO
```

ni:

```text
KIT ARMADO = PRODUCCION TERMINADA
```

---

#### 8. Entrada mínima de una orden de preparación

Una necesidad de preparación debe poder resolver, cuando aplique:

- referencia a plan u orden productiva;
- producto o preparación objetivo;
- `recipe_version_ref` exacta;
- sede;
- área productiva destino;
- tipo de preparación requerida;
- cantidad objetivo;
- escala calculada;
- fecha y ventana requerida;
- prioridad;
- ingredientes o componentes;
- cantidades y unidades canónicas;
- restricciones de sustitución;
- alérgenos;
- conservación;
- controles de calidad o inocuidad;
- sensibilidad de fórmula;
- estado de disponibilidad;
- referencias de reserva;
- responsable operativo;
- condición de urgencia o excepción.

La cola del centro no debe reconstruir estos hechos mediante nombres libres o defaults locales.

---

#### 9. Modelo de demanda y dos carriles de preparación

El diseño adopta dos carriles complementarios.

##### 9.1. Carril planificado

Para necesidades suficientemente previsibles:

```text
PLAN APROBADO
→ RESERVA
→ PREPARACION ANTICIPADA
→ STAGING
→ ENTREGA EN VENTANA
```

Aplica solo cuando:

- existe una necesidad productiva aprobada;
- la receta está vigente;
- la conservación permite preparación anticipada;
- la vida útil o condición del material no se deteriora;
- el riesgo de alérgenos y contaminación cruzada es controlable;
- el espacio de staging es suficiente;
- la preparación anticipada no crea sobrante injustificado.

##### 9.2. Carril de ajuste tardío

Para remisiones nocturnas, cambios posteriores al cierre de la jornada o demanda no previsible:

```text
NUEVA NECESIDAD
→ REVALIDAR PRIORIDAD
→ REVALIDAR DISPONIBILIDAD
→ ASIGNAR CAPACIDAD
→ PREPARAR EN VENTANA TEMPRANA O DISPONIBLE
→ ENTREGAR SIN BYPASS
```

Este carril evita que el centro dependa únicamente del trabajo de la tarde anterior.

No autoriza:

- stock negativo;
- reserva ficticia;
- sustitución silenciosa;
- omitir control de alérgenos;
- exponer fórmula completa sin necesidad;
- consumir inventario antes del hecho físico;
- desplazar una necesidad crítica sin registrar la decisión.

---

#### 10. Modelo de capacidad

La tarea no inventa una capacidad numérica sin evidencia de demanda, tiempos, equipos, espacio y personal.

La capacidad se define mediante:

```text
CAPACIDAD UTIL
=
VENTANA DISPONIBLE
×
RECURSOS HABILITADOS
×
RENDIMIENTO DE ESTACION
-
CAMBIOS / LIMPIEZA
-
CONTROLES OBLIGATORIOS
-
CONTINGENCIA
```

El dimensionamiento posterior debe medir por tipo de trabajo:

| Variable | Uso |
| --- | --- |
| líneas o kits requeridos | volumen de trabajo |
| peso o cantidad por línea | esfuerzo de manipulación |
| tiempo de preparación | carga directa |
| tiempo de cambio | impacto por familia o alérgeno |
| limpieza requerida | capacidad no productiva obligatoria |
| equipo requerido | cuello de botella |
| personal habilitado | capacidad humana |
| ventana requerida | capacidad temporal |
| staging disponible | límite de acumulación |
| conservación | límite temporal |
| prioridad | secuenciación |
| tasa de urgencias | colchón de capacidad |
| reproceso o devolución | carga de excepción |

La capacidad se evalúa por ventana y escenario, no mediante un único número permanente.

---

#### 11. Política de carga

El centro no acepta trabajo ilimitado.

Cada necesidad debe clasificarse al menos como:

- planificada;
- ajuste operativo;
- urgente;
- bloqueada;
- diferida.

La priorización debe considerar:

1. compromiso productivo aprobado;
2. hora requerida;
3. disponibilidad real;
4. criticidad;
5. capacidad disponible;
6. dependencia de equipos;
7. alérgenos y secuencia sanitaria;
8. conservación;
9. impacto sobre otros lotes;
10. posibilidad de preparación parcial segura.

Urgencia no significa prioridad infinita.

Una urgencia debe conservar:

- motivo;
- actor que la eleva;
- impacto;
- trabajo desplazado cuando exista;
- decisión de excepción cuando corresponda.

---

#### 12. Equipos por capacidad

Esta tarea define clases funcionales de equipo, no marcas, modelos ni cantidades.

| Capacidad | Clase funcional |
| --- | --- |
| pesar | balanza o equipo de medición con rango y precisión compatibles |
| porcionar | utensilios, recipientes o medios de separación compatibles con material y cantidad |
| contener | envase temporal compatible con alimento, condición y trazabilidad |
| identificar | medio de identificación legible del trabajo preparado |
| verificar | recursos para confirmar identidad, cantidad, unidad y condición |
| manipular | superficie y herramienta compatibles con inocuidad y ergonomía |
| conservar | recurso de conservación cuando la receta o ingrediente lo exija |
| limpiar | recursos que permitan limpieza y cambio controlado |
| contingencia | medio alterno aprobado cuando el equipo principal quede indisponible |

Cada equipo que afecte una medición crítica debe tener:

- identidad;
- capacidad o rango;
- precisión necesaria;
- condición;
- control de calibración o verificación cuando aplique;
- disponibilidad;
- restricciones de uso;
- tratamiento de falla.

La selección física y validación metrológica se realizan posteriormente.

---

#### 13. Pesaje y porcionamiento

El pesaje debe ocurrir contra:

- ingrediente identificado;
- cantidad objetivo;
- unidad canónica;
- versión de receta;
- orden o necesidad;
- destino productivo.

Reglas:

1. el operador no redefine unidades;
2. la balanza no se convierte en fuente de identidad;
3. tolerancia y redondeo provienen del contrato de receta o especificación aplicable;
4. una cantidad fuera de tolerancia no se corrige silenciosamente;
5. el sobrante de un envase no se considera automáticamente devolución utilizable;
6. cada porción preparada mantiene vínculo con la necesidad que la originó;
7. una porción no crea consumo de inventario antes del movimiento o evento correspondiente.

---

#### 14. Premezclas

Una premezcla debe clasificarse antes de ejecutarse.

##### 14.1. Agrupación sin transformación

Si los ingredientes permanecen separados y solo se agrupan:

- no nace una preparación intermedia nueva;
- cada componente conserva identidad, lote y condición;
- la agrupación funciona como kit operativo.

##### 14.2. Combinación o transformación

Si los ingredientes se mezclan de forma que ya no puedan tratarse como componentes separados:

- se considera preparación productiva;
- conserva versión de receta;
- conserva cantidades realmente usadas;
- requiere trazabilidad compatible con el contrato posterior de lotes;
- no puede devolverse a stock como si cada ingrediente permaneciera intacto;
- debe respetar conservación, alérgenos y controles aplicables.

`OPS-TRZ-001` recibe la definición de identidad, lote y etiquetado necesaria para estas preparaciones.

---

#### 15. Kit de preparación

Un kit operativo se forma para una necesidad concreta y debe poder identificar:

- destino productivo;
- receta y versión;
- cantidad objetivo;
- componentes esperados;
- componentes preparados;
- faltantes;
- sustituciones autorizadas;
- alérgenos o restricciones relevantes;
- condición de conservación;
- ventana de uso;
- estado de completitud;
- actor que preparó;
- actor o área que recibió.

Estados conceptuales mínimos:

```text
PENDIENTE
EN_PREPARACION
PARCIAL
COMPLETO
BLOQUEADO
ENTREGADO
CANCELADO
CON_DIFERENCIA
```

Estos estados son semántica del diseño, no una autorización para crear enums o tablas.

Un kit `PARCIAL` no puede mostrarse como completo por conveniencia operacional.

---

#### 16. Reservas y disponibilidad

El centro consume el contrato de reservas de NEXO.

Reglas:

- reservar no cambia la identidad del material;
- reservar no equivale a retirar;
- reservar no equivale a consumir;
- la cantidad reservada debe mantenerse separada de física y disponible;
- el centro no mantiene un saldo paralelo;
- un faltante debe reflejarse contra la necesidad, no ocultarse modificando la receta;
- la liberación de reserva debe estar correlacionada con cancelación, ajuste o consumo;
- concurrencia y reintentos no pueden sobreasignar stock.

El diseño debe tolerar que una necesidad quede parcialmente reservada.

Una reserva parcial debe producir una decisión explícita:

- esperar;
- replanificar;
- sustituir mediante autoridad aplicable;
- producir parcialmente cuando sea válido;
- cancelar;
- escalar.

---

#### 17. Consumo y movimientos

El Centro de Pesaje no escribe inventario por inferencia.

Los efectos físicos conservan el contrato de NEXO.

Eventos o movimientos relevantes incluyen, según corresponda:

- retiro desde ubicación;
- traslado a staging;
- consumo;
- devolución;
- diferencia;
- merma;
- cuarentena;
- disposición.

Todo efecto debe:

- conservar origen;
- conservar destino cuando aplique;
- conservar cantidad y unidad;
- conservar lote o condición cuando aplique;
- ser atómico o idempotente/compensable;
- evitar doble contabilización.

Una hoja de pesaje no sustituye un movimiento físico.

---

#### 18. Alérgenos y contaminación cruzada

El centro debe organizar trabajo de forma compatible con los contratos vigentes de alérgenos, especificaciones e inocuidad.

Reglas:

1. el perfil de alérgenos relevante debe estar visible antes de preparar;
2. información de seguridad no se oculta por protección de fórmula;
3. las necesidades incompatibles no comparten secuencia o recursos sin cambio y limpieza validados;
4. un cambio de familia de alérgeno puede consumir capacidad;
5. utensilios, recipientes y superficies deben ser compatibles con el riesgo aplicable;
6. una duda sobre contaminación no se resuelve marcando el kit como completo;
7. la contaminación sospechada produce bloqueo o excepción controlada;
8. la condición de una premezcla no puede inferirse solo de la condición de sus ingredientes por separado.

La definición exacta de segregación física se valida posteriormente contra espacio, equipos y procedimiento.

---

#### 19. Limpieza y cambio de trabajo

El diseño reconoce la limpieza y el cambio como consumo real de capacidad.

Un cambio puede depender de:

- producto;
- familia;
- alérgeno;
- colorante o ingrediente sensible;
- condición de higiene;
- herramienta;
- equipo;
- recipiente;
- temperatura;
- contaminación observada.

No se permite planificar al 100 % de utilización ignorando cambios y limpieza.

La evidencia física de limpieza, frecuencia y criterio pertenece al contrato de inocuidad y a su implementación posterior.

---

#### 20. Almacenamiento temporal y staging

El centro puede requerir staging temporal, pero no crea una bodega paralela.

Todo material en staging conserva:

- propietario funcional;
- identidad;
- cantidad;
- condición;
- lote cuando aplique;
- necesidad o kit destino;
- ubicación reconocible;
- tiempo de permanencia;
- conservación requerida;
- estado de disponibilidad.

El staging debe distinguir:

```text
POR PREPARAR
EN PREPARACION
PREPARADO
BLOQUEADO
PENDIENTE DE DEVOLUCION
PENDIENTE DE DISPOSICION
```

La permanencia máxima depende de conservación, inocuidad, receta, material y política aplicable; no se inventa un tiempo universal.

---

#### 21. Devoluciones y material no utilizado

El tratamiento depende del estado físico.

##### 21.1. Material íntegro y utilizable

Puede volver a disponibilidad solo mediante:

- verificación de identidad;
- verificación de condición;
- lote o vencimiento cuando aplique;
- cantidad real;
- movimiento de devolución;
- liberación de reserva correspondiente.

##### 21.2. Material abierto, pesado o manipulado

No vuelve automáticamente al stock ordinario.

Debe evaluarse:

- integridad;
- contaminación;
- trazabilidad;
- conservación;
- posibilidad de reutilización;
- disposición.

##### 21.3. Premezcla o componente transformado

No se descompone contablemente en ingredientes originales como si la transformación no hubiese ocurrido.

Su reproceso, aprovechamiento, merma o disposición pertenece a los contratos productivos correspondientes.

---

#### 22. Urgencias y excepciones

Una urgencia puede originarse por:

- remisión tardía;
- cambio de prioridad;
- faltante;
- sustitución;
- falla de equipo;
- diferencia de inventario;
- pérdida de kit;
- contaminación;
- nueva necesidad crítica.

La urgencia no autoriza:

- saltarse la versión de receta;
- omitir reserva o disponibilidad;
- usar una unidad no compatible;
- exponer más fórmula de la necesaria;
- ignorar alérgenos;
- omitir limpieza;
- consumir material no liberado;
- ocultar trabajo desplazado.

La decisión de excepción debe registrar:

- causa;
- impacto;
- actor;
- momento;
- necesidad afectada;
- resolución.

---

#### 23. Protección de fórmulas

El centro recibe la **proyección operativa mínima** necesaria para preparar el trabajo asignado.

Puede incluir:

- ingrediente;
- cantidad;
- unidad;
- orden de preparación;
- controles necesarios;
- alérgenos;
- restricciones;
- conservación.

No necesita por defecto:

- catálogo completo de recetas;
- otras fórmulas;
- historial administrativo;
- autores;
- revisiones no publicadas;
- notas de desarrollo no operativas;
- costos;
- márgenes;
- información comercial.

La protección de fórmula nunca oculta información de seguridad necesaria.

El acceso debe resolverse por actor, contexto, función, área y trabajo asignado; no por pertenecer físicamente a la estación.

---

#### 24. Fórmula y visibilidad por separación de trabajo

Cuando el trabajo pueda dividirse sin afectar seguridad ni control, la preparación puede mostrarse por subtrabajo o componente para reducir exposición.

La segmentación es válida solo si:

- conserva identidad de receta y versión;
- no rompe controles de alérgenos;
- no impide verificar completitud;
- no oculta incompatibilidades;
- no crea una receta paralela;
- permite reconciliar el kit final.

La segmentación de fórmula es una medida de minimización, no un mecanismo para degradar trazabilidad.

---

#### 25. Fallo de equipo

Ante falla de balanza, recurso de conservación o equipo crítico:

```text
FALLA
→ BLOQUEAR TRABAJO AFECTADO
→ IDENTIFICAR EQUIPO ALTERNO AUTORIZADO
→ REVALIDAR CAPACIDAD / PRECISION / CONDICION
→ CONTINUAR O REPLANIFICAR
```

No se sustituye equipo mediante:

- estimación visual cuando la medición sea obligatoria;
- otro equipo sin rango suficiente;
- unidad improvisada;
- omisión del control.

La falla y su impacto deben conservarse como evidencia operativa cuando afecten una necesidad.

---

#### 26. Modelo de métricas para validar viabilidad

El piloto posterior debe poder medir, al menos:

- necesidades recibidas;
- necesidades planificadas vs urgentes;
- kits completos;
- kits parciales;
- kits bloqueados;
- tiempo de espera;
- tiempo de preparación;
- tiempo de cambio y limpieza;
- cumplimiento de ventana;
- errores de ingrediente;
- errores de cantidad;
- diferencias de inventario;
- devoluciones;
- merma asociada;
- urgencias;
- trabajo desplazado;
- incidencias de alérgenos o contaminación;
- utilización de equipo;
- utilización de staging;
- capacidad efectiva por ventana.

Estas métricas validan la viabilidad. No se fijan objetivos numéricos sin línea base.

---

#### 27. Criterios para decidir si se implementa

La capacidad permanece futura hasta demostrar simultáneamente:

1. demanda suficiente y repetible;
2. recetas suficientemente estandarizadas;
3. ventana operativa viable;
4. espacio compatible;
5. personal disponible;
6. equipos compatibles;
7. control de alérgenos y contaminación;
8. reservas e inventario integrables con NEXO;
9. staging suficiente;
10. manejo de urgencias viable;
11. retorno o disposición controlables;
12. protección de fórmulas compatible con operación;
13. trazabilidad compatible con `OPS-TRZ-001`;
14. costo/beneficio y viabilidad económica evaluables por NUMERA;
15. piloto E5 autorizado.

No cumplir una condición no elimina el diseño; impide declarar la capacidad lista para implementación.

---

#### 28. Handoff a `OPS-TRZ-001`

`OPS-TRZ-001` recibe:

- la necesidad de correlacionar material preparado con receta y versión;
- el vínculo entre kit/premezcla, destino productivo y ejecución;
- el tratamiento diferenciado entre agrupación y transformación;
- las condiciones que requieren identidad de lote;
- la necesidad de conservar cantidad, unidad, origen y condición;
- los puntos donde una etiqueta puede ser necesaria;
- los estados de entrega, devolución, diferencia, bloqueo y disposición;
- las fronteras entre preparación, inventario y producción.

`OPS-TRZ-001` define el contrato empresarial de lotes, etiquetas y trazabilidad; no se anticipa en esta tarea.

---

#### 29. Handoffs adicionales

| Destino | Entrega |
| --- | --- |
| FOGO UX | cola de preparación, estados, urgencia, kit, staging, diferencia y entrega |
| FOGO AUTH | recursos y acciones que requieren protección por actor, área y contexto |
| NEXO | reservas, disponibilidad, movimientos, ubicación, devolución y condición |
| NUMERA | hechos necesarios para evaluar costo productivo, merma y viabilidad |
| E3 | invariantes que deben soportarse en persistencia e integración física |
| E5 | criterios de espacio, equipo, capacidad, personal, seguridad y piloto |

---

#### 30. Requisitos de prueba derivados

**NO GENERA NI MODIFICA REQUISITOS DE PRUEBA.**

Justificación: las obligaciones observables de planificación y capacidad, preparación y ejecución contra receta, reservas y movimientos, trazabilidad física, calidad, costo y conciliación ya cuentan con cobertura vigente. Esta tarea concreta el diseño especializado del Centro de Pesaje sin introducir una obligación nueva fuera de esos contratos.

---

#### 31. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-FOGO-002` para receta/versionado, cantidades, unidades, alérgenos, conservación y sensibilidad;
- `TREQ-FOGO-003` para plan productivo, capacidad, restricciones, prioridad y fuentes;
- `TREQ-FOGO-004` como cobertura directa de ejecución productiva y porque su origen y tareas responsables incluyen expresamente `OPS-PRD-001`;
- `TREQ-NEXO-010` para unidades y conversiones;
- `TREQ-NEXO-011` para reservas, disponibilidad, movimientos, concurrencia e idempotencia;
- `TREQ-NEXO-012` para lote, condición, vencimiento, ubicación, frío, cuarentena y trazabilidad;
- `TREQ-NUMERA-004` para costo productivo, merma y análisis económico posterior.

Esta trazabilidad no modifica 04A.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron identidad, marcador, dependencias, línea base futura del Centro de Pesaje, `OPS-PLAN-001`, topología `DEFINE_ONCE`, gate `NO_PHYSICAL_INSTANCE`, procesos `VPROC-0033`/`VPROC-0034`, responsabilidades, contratos de inventario y cobertura 04A vigente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó pesaje, porcionamiento, premezcla, preparación de kits, reserva, consumo, devolución ni piloto. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea instancia física propia; ubicación final, equipos, espacio, personal y piloto pertenecen a validación posterior. |

---

#### 33. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] el Centro de Pesaje se mantiene como capacidad futura dentro del Centro de Producción y Distribución;
- [ ] la ubicación funcional queda definida sin inventar ubicación física final;
- [ ] FOGO, NEXO y NUMERA conservan ownership separado;
- [ ] no se crea un rol nuevo solo por el nombre del centro;
- [ ] el flujo distingue reserva, preparación, movimiento, consumo y producción;
- [ ] existe un carril planificado y un carril de ajuste tardío;
- [ ] el diseño responde a remisiones nocturnas sin depender solo de preparación vespertina;
- [ ] la capacidad se define mediante variables medibles y no mediante un número inventado;
- [ ] limpieza y cambio consumen capacidad;
- [ ] las clases de equipo quedan definidas sin inventar marcas, modelos o cantidades;
- [ ] pesaje y porcionamiento conservan ingrediente, cantidad, unidad y versión;
- [ ] agrupación y transformación permanecen conceptos distintos;
- [ ] una premezcla transformada no puede volver a stock como ingredientes intactos;
- [ ] un kit parcial no puede presentarse como completo;
- [ ] reserva no se confunde con consumo;
- [ ] staging no se convierte en bodega paralela;
- [ ] las devoluciones distinguen material íntegro, manipulado y transformado;
- [ ] urgencia no crea bypass de receta, inventario, alérgenos o limpieza;
- [ ] la protección de fórmula conserva información de seguridad;
- [ ] toda responsabilidad diferida tiene propietario;
- [ ] `OPS-TRZ-001` recibe un handoff suficiente sin ser anticipada;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecuta implementación física.

---

#### 34. Límites

Esta tarea no:

- crea un Centro de Pesaje físico;
- elige sala, coordenadas, metraje o layout final;
- compra, instala o calibra equipos;
- fija cantidades de balanzas o estaciones;
- contrata personal;
- crea turnos;
- modifica recetas;
- crea inventario;
- crea reservas;
- mueve o consume existencias;
- crea LOC;
- crea lotes;
- imprime etiquetas;
- crea un nuevo maestro de kits;
- define IDs técnicos nuevos;
- crea tablas, columnas, vistas, RLS, RPC, triggers o migraciones;
- implementa UI;
- concede permisos;
- calcula costo realizado;
- define el detalle final de trazabilidad reservado a `OPS-TRZ-001`;
- autoriza piloto;
- autoriza E5.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`OPS-REC-001 — Definir el contrato canónico de recetas y acceso contextual`

**TAREA ACTUAL APROBADA**
`OPS-PRD-001 — Diseñar el Centro de Pesaje, Premezclas y Porcionamiento`

**SIGUIENTE TAREA RESERVADA**
`OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva`

### [ ] OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva

**Dependencias:** `OPS-REC-001`, `OPS-PRD-001` y diseño de lotes de FOGO.  
**Propósito:** definir identidad de lote, producto, receta y versión, fechas, vencimiento, área, actor, cantidad, conservación, relación con insumos y producto terminado, corrección y reetiquetado.  
**Continuidad:** FOGO origina el lote productivo; NEXO conserva existencias, ubicaciones y trazabilidad logística; BLOQUE E4 define plantillas, colas, enrutamiento, reimpresión y contingencia de impresión.  
**Límite:** esta tarea no duplica `PRINT-ARC-001` a `PRINT-ARC-020`.
