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

### [ ] OPS-PRD-001 — Diseñar el Centro de Pesaje, Premezclas y Porcionamiento

**Dependencias:** `OPS-PLAN-001`, `OPS-REC-001` y diseño productivo de FOGO.  
**Propósito:** definir ubicación, actor, equipos, capacidad, kits, reservas, inventario, urgencias, alérgenos, contaminación cruzada, almacenamiento, devoluciones y protección de fórmulas.  
**Continuidad:** NEXO conserva existencias y movimientos; FOGO conserva planificación y ejecución; NUMERA consume costos; E5 define piloto e implementación.  
**Límite:** permanece como capacidad futura hasta validar demanda, recetas, espacio, personal y viabilidad.

### [ ] OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva

**Dependencias:** `OPS-REC-001`, `OPS-PRD-001` y diseño de lotes de FOGO.  
**Propósito:** definir identidad de lote, producto, receta y versión, fechas, vencimiento, área, actor, cantidad, conservación, relación con insumos y producto terminado, corrección y reetiquetado.  
**Continuidad:** FOGO origina el lote productivo; NEXO conserva existencias, ubicaciones y trazabilidad logística; BLOQUE E4 define plantillas, colas, enrutamiento, reimpresión y contingencia de impresión.  
**Límite:** esta tarea no duplica `PRINT-ARC-001` a `PRINT-ARC-020`.
