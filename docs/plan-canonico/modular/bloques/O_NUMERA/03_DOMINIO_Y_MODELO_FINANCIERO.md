### MINI-BLOQUE — DOMINIO Y MODELO FINANCIERO

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **dominio y modelo financiero** dentro de **O NUMERA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `NUMERA-DOM-001` a `NUMERA-DOM-018` — 18 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Definir alcance ejecutivo, analítico y contable de NUMERA” y concluye con “Definir motor de escenarios, versiones de precios, costos, supuestos y publicación”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:NUMERA-DOM -->
### Reconciliación topológica de NUMERA-DOM-001 a NUMERA-DOM-018

Las tareas de dominio NUMERA definen alcance, hechos, costos, rentabilidad, cierres, conciliación, fronteras, cartera y arquitectura financiera objetivo. Son contratos de dominio consumidos por E5 y no unidades físicas independientes.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA

**Estado:** APROBADA
**Tarea anterior:** OPS-CST-001 — Definir el caso de centro de costo y transferencias internas de Producción y Distribución
**Tarea siguiente:** NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas
**Tipo de tarea:** definición documental del alcance objetivo de NUMERA como dominio económico, financiero, analítico y preparado para integración contable, delimitando propiedad de hechos, capacidades CAP-12, fronteras operativas, contables y fiscales, responsabilidades posteriores y criterios de trazabilidad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, datos, Supabase, contratos runtime, permisos, navegación, integraciones, sistemas externos, centros de costo, presupuestos, cálculos, cierres, documentos fiscales, movimientos bancarios ni hechos económicos reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el alcance objetivo de NUMERA después de la auditoría funcional y técnica del módulo financiero y del cierre del caso empresarial de Producción y Distribución.

La tarea establece qué significa que NUMERA sea el dominio económico y financiero de VENTO OS, qué decisiones gerenciales debe soportar, qué hechos recibe de otros dominios, qué capacidades administra directamente, qué información solo reconcilia o proyecta y qué responsabilidades permanecen fuera de su autoridad.

El resultado debe permitir que las tareas `NUMERA-DOM-002` a `NUMERA-DOM-018` desarrollen el modelo financiero sin:

- reconstruir hechos operativos que pertenecen a otras aplicaciones;
- convertir prototipos existentes en capacidades completas por inferencia;
- duplicar ventas, compras, producción, inventario, caja o documentos de origen;
- asumir que análisis económico equivale a contabilidad formal;
- asumir que una referencia fiscal equivale a autoridad tributaria;
- convertir transferencias internas en ingresos o gastos legales por defecto;
- mezclar realidad, presupuesto, forecast, simulación o escenario;
- sobrescribir historia para corregir diferencias.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-001` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define un contrato de dominio una sola vez;
- no crea una instancia física propia;
- no autoriza implementación de producto;
- no autoriza migraciones ni cambios de Supabase;
- no modifica datos financieros reales;
- no materializa integraciones bancarias, contables o fiscales;
- no crea centros de costo ni reglas de cálculo;
- sus decisiones serán consumidas por las tareas NUMERA posteriores y por los paquetes de implementación que correspondan.

---

#### 3. Entradas canónicas obligatorias

Esta definición consume y reconcilia:

1. la auditoría `NUMERA-AUD-001` a `NUMERA-AUD-012`;
2. la matriz final de capacidades financieras `CAP-12.01` a `CAP-12.15`;
3. el alcance operativo aprobado de `CAP-SCOPE-012`;
4. las fronteras entre PULSO, ORIGO, FOGO, NEXO y NUMERA;
5. los procesos económicos objetivo `VPROC-0051`, `VPROC-0052`, `VPROC-0053`, `VPROC-0054` y `VPROC-0069`;
6. el caso aprobado `OPS-CST-001` sobre Producción, Distribución, centros de costo, costos compartidos y transferencias internas;
7. el Registro 04A vigente;
8. la ruta canónica que reserva `NUMERA-DOM-002` como siguiente tarea.

Ninguna de estas entradas convierte por sí sola una capacidad ausente o prototipo en implementación existente.

---

#### 4. Handoff recibido de NUMERA-AUD-012

La auditoría final establece para las quince capacidades financieras:

```text
COMPLETE_MODULES = 0
PARTIAL_MODULES = 2
PROTOTYPE_MODULES = 3
ABSENT_MODULES = 10
```

Clasificación vigente dentro de NUMERA:

| Capacidad | Estado AS-IS auditado |
| --- | --- |
| `CAP-12.01` Registrar hechos económicos | PARCIAL |
| `CAP-12.02` Gestionar caja | AUSENTE |
| `CAP-12.03` Gestionar bancos y pagos | AUSENTE |
| `CAP-12.04` Gestionar cuentas por cobrar | AUSENTE |
| `CAP-12.05` Gestionar cuentas por pagar | AUSENTE |
| `CAP-12.06` Facturar y controlar documentos | AUSENTE |
| `CAP-12.07` Conciliar ventas, pagos y entregas | AUSENTE |
| `CAP-12.08` Conciliar compras y recepciones | AUSENTE |
| `CAP-12.09` Calcular costos | PROTOTIPO |
| `CAP-12.10` Distribuir costos compartidos | AUSENTE |
| `CAP-12.11` Gestionar presupuestos | PARCIAL |
| `CAP-12.12` Gestionar tesorería | AUSENTE |
| `CAP-12.13` Gestionar impuestos y obligaciones | AUSENTE |
| `CAP-12.14` Cerrar períodos y emitir reportes | PROTOTIPO |
| `CAP-12.15` Analizar rentabilidad | PROTOTIPO |

Además, la auditoría demuestra que el estado actual no contiene un cálculo integral de margen real ni de rentabilidad materializado. Esta tarea define el alcance objetivo; no altera esas clasificaciones AS-IS.

---

#### 5. Handoff recibido de OPS-CST-001

El alcance general de NUMERA deberá respetar estas invariantes ya aprobadas:

```text
PHYSICAL_INSTALLATION_COUNT_DOES_NOT_DEFINE_COST_CENTER_COUNT
PRODUCTION_AND_DISTRIBUTION_ECONOMIC_RESPONSIBILITIES = DISTINGUISHABLE
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
INTERNAL_PRODUCT_TRANSFER_IS_SALE_BY_DEFAULT = NO
INTERNAL_PRODUCT_TRANSFER_IS_LEGAL_REVENUE_OR_EXPENSE_BY_DEFAULT = NO
INVENTORY_MOVEMENT_OWNER = NEXO
PRODUCTIVE_FACT_OWNER = FOGO
ECONOMIC_VALUATION_OWNER = NUMERA
DIRECT_ATTRIBUTION_PRECEDES_SHARED_ALLOCATION = YES
SHARED_ALLOCATION_REQUIRES_VERSIONED_DRIVER = YES
STANDARD_REFERENCE_AND_ACTUAL_COST_MUST_COEXIST = YES
HISTORICAL_REVALUATION_BY_SILENT_OVERWRITE = FORBIDDEN
CONSOLIDATED_REVENUE_MUST_EXCLUDE_INTERNAL_DUPLICATION = YES
EXTERNAL_PRODUCTION_SALE_REQUIRES_EXTERNAL_COMMERCIAL_CASE = YES
```

`NUMERA-DOM-001` incorpora estas reglas como frontera del dominio financiero y no las redefine.

---

#### 6. Definición canónica de NUMERA

NUMERA queda definido como el dominio de VENTO OS responsable de convertir hechos operativos trazables en información económica y financiera gobernada para registro, conciliación, planificación, control, análisis y decisión.

Su autoridad se organiza alrededor de cinco funciones:

1. **registrar y clasificar efecto económico**, conservando vínculo inequívoco con el hecho y documento fuente;
2. **gestionar obligaciones, derechos financieros, pagos y saldos** cuando la capacidad corresponda a NUMERA;
3. **conciliar** hechos y resultados entre dominios y fuentes externas sin alterar el hecho operativo para forzar un cuadre;
4. **calcular y planificar** costos, distribuciones, presupuestos, forecast, escenarios, cierres y rentabilidad mediante reglas versionadas;
5. **publicar información económica autorizada** con trazabilidad de método, fuente, periodo, versión, estado y evidencia.

NUMERA no se convierte por esta definición en propietario universal de cada operación empresarial ni en sistema contable o fiscal oficial por defecto.

---

#### 7. Capas de verdad que el dominio debe separar

NUMERA deberá mantener explícitamente separadas estas capas:

| Capa | Naturaleza | Autoridad principal |
| --- | --- | --- |
| hecho operativo | venta, compra, recepción, producción, consumo, movimiento, entrega, marcación u otro evento ejecutado | aplicación operativa propietaria |
| soporte o documento fuente | evidencia comercial, bancaria, productiva, logística o fiscal asociada al hecho | sistema o actor propietario del documento |
| hecho económico | representación económica correlacionada del efecto que debe registrarse, conciliarse o analizarse | NUMERA |
| obligación o derecho financiero | importe pendiente, vencimiento, pago, recaudo, aplicación, saldo o diferencia | NUMERA dentro del alcance aprobado |
| cálculo analítico | costo, margen, rentabilidad, variación, distribución, indicador o escenario derivado | NUMERA |
| planificación | presupuesto, revisión, forecast, escenario y supuestos | NUMERA |
| hecho contable formal | reconocimiento sujeto a plan de cuentas, comprobantes, asientos y reglas contables formales | se define posteriormente en `NUMERA-DOM-017` y fronteras aplicables |
| autoridad fiscal oficial | determinación, emisión, presentación o aceptación oficial exigida por autoridad o proveedor autorizado | autoridad o sistema autorizado según `NUMERA-DOM-013` |

Una capa puede referenciar otra, pero su existencia no prueba automáticamente la existencia ni validez de la siguiente.

---

#### 8. Regla de propiedad del hecho de origen

NUMERA no recreará una segunda versión operativa del hecho que consume.

Queda establecido:

- PULSO conserva la operación de venta y caja que le corresponda;
- ORIGO conserva compra y recepción comercial;
- FOGO conserva producción, lotes, consumos, rendimiento, merma y resultados productivos;
- NEXO conserva inventario, ubicación, movimiento, custodia, despacho y recepción logística;
- PASS conserva identidad y experiencia de cliente dentro de su alcance;
- VISO y los dominios organizacionales conservan identidades maestras y estructuras que NUMERA deba referenciar;
- proveedores bancarios, fiscales o externos conservan los hechos que ejecuten bajo su propia autoridad;
- NUMERA recibe referencias estables, clasifica el efecto económico, concilia y deriva información financiera sin modificar la realidad operativa para cuadrar sus resultados.

---

#### 9. Contrato mínimo del hecho económico

Todo hecho económico objetivo deberá poder conservar, como mínimo y cuando aplique:

- identidad estable;
- entidad legal;
- marca o unidad relacionada sin confundirla con la entidad legal;
- sede;
- centro de costo;
- contraparte o tercero;
- moneda;
- fecha de ocurrencia;
- fecha de reconocimiento económico;
- fuente propietaria;
- identificador o correlación del hecho origen;
- documento o evidencia asociada;
- importe y componentes aplicables;
- estado;
- versión cuando exista cálculo o regla versionada;
- evidencia de creación, aprobación, corrección o conciliación.

Los agregados, dashboards y reportes son proyecciones; no se convierten en fuente editable de los hechos que resumen.

---

#### 10. Alcance ejecutivo

El alcance ejecutivo de NUMERA comprende producir una lectura gobernada de la situación económica y financiera para responsables autorizados.

Debe permitir responder, con trazabilidad hacia fuentes y fórmulas, preguntas como:

- cuánto se vendió y cuánto se realizó económicamente por periodo y dimensión autorizada;
- qué obligaciones, derechos financieros y saldos permanecen pendientes;
- qué efectivo, bancos y compromisos forman la posición financiera operativa disponible para gestión;
- cuánto cuestan productos, producción, logística y operación bajo métodos definidos;
- dónde se originan las principales variaciones contra estándar, presupuesto o periodo comparable;
- qué centros, sedes, productos, canales o periodos generan margen o pérdida bajo información reconciliada;
- qué presupuesto está aprobado, qué forecast está vigente y qué desviaciones deben revisarse;
- qué cierres, diferencias, conciliaciones o evidencias permanecen pendientes;
- qué indicadores son reales, presupuestados, proyectados o simulados.

La vista ejecutiva no adquiere autoridad para editar el hecho fuente ni para convertir una estimación en realidad publicada.

---

#### 11. Alcance analítico

El alcance analítico de NUMERA incluye:

1. costos de adquisición y componentes asociados cuando sean trazables;
2. costos productivos recibidos y derivados de FOGO y fuentes relacionadas;
3. costos logísticos separados de transformación productiva;
4. costos directos por entidad, sede, centro, producto, canal o periodo cuando exista atribución válida;
5. distribución de costos compartidos mediante reglas y drivers versionados;
6. costo estándar o referencia previa separado de costo real reconciliado;
7. variaciones y causas entre bases comparables;
8. margen y punto de equilibrio cuando entradas, fórmula y fuentes estén definidas;
9. rentabilidad con ingreso realizado y costo trazable;
10. presupuestos, revisiones, forecast y escenarios como objetos diferenciados;
11. análisis de desviaciones sin reescribir hechos reales;
12. publicación controlada de resultados y metodología.

Cada cálculo deberá conservar método, entradas, versión, vigencia, entidad, centro, periodo y fuente.

---

#### 12. Alcance financiero operativo

NUMERA queda como propietario económico de los procesos objetivo `VPROC-0051`, `VPROC-0052`, `VPROC-0053` y `VPROC-0054`, respetando sus fronteras con los dominios fuente.

Esto incluye como alcance objetivo:

- registro de hechos económicos;
- obligaciones financieras derivadas de compras y otros compromisos válidos;
- cuentas por cobrar y cartera;
- aplicación de pagos y recaudos;
- programación y control de pagos;
- conciliación bancaria;
- conciliación entre ventas, pagos y entregas;
- conciliación entre compras y recepciones;
- diferencias financieras y sus resoluciones controladas;
- costos y distribuciones;
- periodos y cierres económicos;
- indicadores y reportes;
- tesorería y proyección de liquidez;
- rentabilidad.

La ejecución física de una compra, venta, recepción, entrega, producción o movimiento permanece fuera de NUMERA.

---

#### 13. Matriz objetivo de las quince capacidades CAP-12

| Capacidad | Alcance objetivo aprobado | Propiedad o frontera principal |
| --- | --- | --- |
| `CAP-12.01` Registrar hechos económicos | dentro del alcance de NUMERA | NUMERA registra efecto económico correlacionado; no recrea el hecho operativo |
| `CAP-12.02` Gestionar caja | frontera compartida | PULSO conserva operación de caja; NUMERA consume, consolida y concilia su efecto económico |
| `CAP-12.03` Gestionar bancos y pagos | dentro de NUMERA con ejecución externa cuando corresponda | NUMERA gobierna registro, programación, autorización y conciliación; banco o proveedor ejecuta bajo su autoridad |
| `CAP-12.04` Gestionar cuentas por cobrar | dentro del alcance de NUMERA | NUMERA gobierna cartera, recaudo, aplicación, saldo y diferencia; venta origen permanece en su propietaria |
| `CAP-12.05` Gestionar cuentas por pagar | dentro del alcance de NUMERA | NUMERA gobierna obligación, aprobación financiera, pago y conciliación; compra y recepción permanecen en ORIGO |
| `CAP-12.06` Facturar y controlar documentos | frontera con autoridad externa | emisión fiscal oficial permanece en sistema autorizado; NUMERA conserva referencia, estado y efecto económico requerido |
| `CAP-12.07` Conciliar ventas, pagos y entregas | conciliación dentro de NUMERA | PULSO, NEXO y proveedores conservan hechos fuente; NUMERA concilia sin duplicarlos |
| `CAP-12.08` Conciliar compras y recepciones | conciliación dentro de NUMERA | ORIGO y NEXO conservan compra/recepción/movimiento; NUMERA concilia efecto y diferencias |
| `CAP-12.09` Calcular costos | dentro del alcance de NUMERA | NUMERA calcula bajo método, entradas, versión y fuente trazables |
| `CAP-12.10` Distribuir costos compartidos | dentro del alcance de NUMERA | NUMERA aplica pools y drivers versionados con aprobación y reversión |
| `CAP-12.11` Gestionar presupuestos | dentro del alcance de NUMERA | NUMERA gobierna presupuesto, revisión, forecast, escenario, vigencia, aprobación y desviación |
| `CAP-12.12` Gestionar tesorería | dentro de NUMERA con ejecución bancaria externa | NUMERA proyecta liquidez, compromisos y pagos; ejecución bancaria mantiene autoridad externa |
| `CAP-12.13` Gestionar impuestos y obligaciones | control e integración con autoridad externa | NUMERA puede gestionar calendario, base, soporte, vencimiento, estado y evidencia; determinación o presentación oficial permanece en autoridad/sistema autorizado |
| `CAP-12.14` Cerrar períodos y emitir reportes | cierre económico dentro de NUMERA | NUMERA gobierna cierre económico, conciliación, bloqueo y reapertura; no se declara por esta tarea cierre contable/fiscal oficial |
| `CAP-12.15` Analizar rentabilidad | dentro del alcance de NUMERA | NUMERA calcula rentabilidad desde ingreso realizado, costos trazables, dimensiones y periodo definidos |

Esta matriz define destino funcional, no estado de implementación.

---

#### 14. Caja, bancos y tesorería

La palabra `caja` no tendrá un significado único en todo VENTO OS.

Se separan:

- **caja operativa:** sesión, apertura, cobro, arqueo y cierre operativo del punto de venta; permanece en PULSO cuando le corresponda;
- **posición de caja consolidada:** proyección económica de saldos y movimientos válidos consumidos por NUMERA;
- **banco:** fuente externa de movimientos y saldos que no se reescribe desde NUMERA;
- **tesorería:** planificación y control de liquidez, vencimientos, compromisos, lotes de pago, autorizaciones, ejecución externa y conciliación.

NUMERA no deberá inventar un movimiento bancario para explicar una diferencia ni convertir un presupuesto en disponibilidad de efectivo.

---

#### 15. Cartera, obligaciones y pagos

NUMERA distinguirá como objetos económicos diferentes:

- venta o compra origen;
- documento asociado;
- cuenta por cobrar o por pagar;
- cuota o vencimiento;
- saldo;
- pago o recaudo observado;
- aplicación del pago;
- diferencia;
- anticipo o saldo a favor cuando corresponda;
- disputa;
- acuerdo o promesa;
- castigo autorizado cuando corresponda;
- conciliación.

Un pago no elimina ni modifica el hecho comercial de origen. Una recepción no prueba pago. Una factura no prueba recepción física. La conciliación enlaza evidencias; no sustituye hechos.

El detalle de cartera se desarrolla en `NUMERA-DOM-016` y el detalle de cuentas por pagar en `NUMERA-DOM-010`.

---

#### 16. Costos, transferencias internas y rentabilidad

NUMERA conserva la propiedad de la valorización económica y deberá consumir el caso aprobado de `OPS-CST-001`.

Reglas de alcance:

- el movimiento físico de inventario no es una venta;
- la transferencia interna puede servir para medición gerencial sin convertirse automáticamente en ingreso o gasto legal;
- el costo productivo no absorbe silenciosamente el costo logístico;
- costo estándar o referencia y costo real reconciliado coexisten;
- una variación se explica y versiona, no se corrige sobrescribiendo historia;
- la atribución directa precede la distribución compartida;
- una distribución compartida requiere pool, base, driver, destinos, versión, aprobación y reversión;
- la rentabilidad consolidada elimina duplicaciones internas;
- una venta externa originada desde Producción requiere el caso comercial externo correspondiente.

El detalle se desarrolla en `NUMERA-DOM-004`, `NUMERA-DOM-006`, `NUMERA-DOM-007` y `NUMERA-DOM-008`.

---

#### 17. Presupuesto, forecast y escenarios

El proceso presupuestal objetivo se conserva separado de los hechos reales.

Objetos distintos:

- hecho real;
- presupuesto aprobado;
- revisión presupuestal;
- forecast;
- escenario;
- propuesta;
- resultado publicado.

Reglas:

1. un presupuesto aprobado no se convierte en gasto real;
2. una revisión no sobrescribe la versión base aprobada;
3. un forecast no sustituye el presupuesto ni el hecho real;
4. un escenario puede modificar supuestos sin alterar información real;
5. cada versión conserva supuestos, periodo, vigencia, autoría, aprobación y estado;
6. el consumo presupuestal se compara contra hechos válidos sin reescribirlos;
7. las desviaciones conservan explicación y evidencia.

El contrato detallado del motor de escenarios queda reservado a `NUMERA-DOM-018`.

---

#### 18. Periodos y cierres

NUMERA no asumirá equivalentes estos conceptos:

```text
PERIODO_OPERATIVO
PERIODO_ECONOMICO
PERIODO_CONTABLE
PERIODO_FISCAL
```

El alcance objetivo incluye un cierre económico gobernado, con:

- periodo identificado;
- fuentes esperadas;
- conciliaciones requeridas;
- diferencias pendientes;
- checklist o condiciones de cierre;
- aprobación cuando corresponda;
- bloqueo de escritura según el contrato posterior;
- correcciones o restatements versionados;
- reapertura controlada;
- evidencia del resultado.

`NUMERA-DOM-011` definirá el contrato detallado. Esta tarea no declara que un cierre económico sea automáticamente cierre contable o fiscal oficial.

---

#### 19. Alcance contable de NUMERA

El término `contable` del título de esta tarea se interpreta como **preparación, trazabilidad y frontera hacia contabilidad formal**, no como declaración de que NUMERA ya sea un libro contable oficial.

Queda aprobado:

1. los hechos económicos deben conservar suficiente identidad y evidencia para ser mapeables posteriormente a tratamiento contable;
2. las aplicaciones operativas no escribirán libros contables directamente;
3. NUMERA debe poder reconciliar el efecto económico con su fuente antes de cualquier proyección contable posterior;
4. periodo económico, contable y fiscal permanecen diferenciados;
5. una corrección económica no autoriza a reescribir historia contable o fiscal;
6. la eventual arquitectura de plan de cuentas, comprobantes y asientos se define en `NUMERA-DOM-017`;
7. la frontera frente al sistema contable o fiscal externo se define en `NUMERA-DOM-013`.

Hasta esas decisiones, NUMERA es fuente de verdad económica y analítica dentro de su alcance aprobado, no autoridad contable legal universal por inferencia.

---

#### 20. Frontera fiscal

NUMERA puede conservar y gestionar información necesaria para control financiero y cumplimiento, incluyendo cuando corresponda:

- referencia de documento fiscal;
- tipo y estado;
- contraparte;
- fechas;
- importe y componentes recibidos;
- vencimiento;
- soporte;
- obligación asociada;
- evidencia de presentación, aceptación, pago o resultado recibido de una fuente autorizada.

Sin embargo, esta tarea no asigna a NUMERA autoridad para:

- determinar por sí solo una obligación tributaria oficial;
- emitir documentos fiscales sin el sistema autorizado;
- presentar declaraciones ante una autoridad;
- sustituir al proveedor fiscal o sistema contable autorizado;
- definir tratamiento tributario profesional no aprobado.

La decisión detallada pertenece a `NUMERA-DOM-013`.

---

#### 21. Correcciones, reversión y no destrucción de historia

Todo modelo posterior deberá conservar la diferencia entre:

- error de captura;
- corrección;
- reclasificación;
- anulación;
- reversión;
- ajuste;
- diferencia conciliatoria;
- reapertura;
- restatement o recálculo versionado.

Principio obligatorio: una corrección no elimina silenciosamente la verdad original.

Cuando el dato original deba corregirse, la historia y la evidencia se conservan mediante la acción compensatoria o versión que corresponda. Los agregados derivados deben poder reconstruirse desde la secuencia válida.

---

#### 22. Conciliación como capacidad transversal del dominio

La conciliación en NUMERA deberá responder, al menos:

1. qué dos o más fuentes se comparan;
2. cuál es la identidad o correlación común;
3. qué importe, cantidad, documento, fecha o estado se esperaba;
4. qué se observó realmente;
5. si existe match completo, parcial, duplicado, ausente o ambiguo;
6. qué diferencia resulta;
7. quién puede resolverla;
8. qué evidencia soporta la resolución;
9. si la resolución modifica un objeto económico o requiere acción en la aplicación fuente;
10. qué estado final queda y cómo se evita reprocesamiento duplicado.

NUMERA no modificará cantidades operativas de inventario, producción, entrega, compra o venta únicamente para hacer coincidir un cálculo financiero.

---

#### 23. Dimensiones económicas y organizacionales

NUMERA debe analizar y registrar utilizando identidades canónicas compartidas, sin crear catálogos paralelos por conveniencia.

Las dimensiones potenciales incluyen, cuando aplique y exista identidad autorizada:

- entidad legal;
- marca o unidad;
- sede;
- centro de costo;
- canal;
- producto o presentación;
- proveedor;
- cliente o deudor;
- pedido, compra, lote u otra correlación fuente;
- moneda;
- periodo.

Una dimensión no se inferirá de otra. En particular:

```text
LEGAL_ENTITY != BRAND
LEGAL_ENTITY != SITE
SITE != COST_CENTER
BRAND != COST_CENTER
PHYSICAL_INSTALLATION != COST_CENTER
```

La identidad y gobierno detallado de centros de costo continúa en `NUMERA-DOM-006`.

---

#### 24. Matriz de propiedad por dominio fuente

| Dominio o sistema | Conserva como autoridad | NUMERA consume o deriva |
| --- | --- | --- |
| PULSO | venta, operación POS, caja operativa y hechos comerciales que le correspondan | efecto económico, cartera, conciliación, ingreso realizado y dimensiones autorizadas |
| ORIGO | solicitud, compra, orden, recepción comercial y documentos de abastecimiento | obligación, costo recibido, vencimiento, pago y conciliación financiera |
| FOGO | producción, lote, consumo, rendimiento, merma y cierre productivo | valorización económica, costo productivo y variaciones |
| NEXO | inventario, ubicación, movimiento, custodia, despacho y recepción logística | valorización de movimientos, costo logístico, conciliación y transferencias internas económicas |
| PASS | identidad/experiencia del cliente dentro de su contrato | referencia autorizada de cliente o cuenta sin redefinir identidad |
| VISO / dominio organizacional | identidades organizacionales maestras autorizadas | dimensiones económicas referenciadas |
| bancos/proveedores financieros | movimiento, saldo o resultado ejecutado bajo su autoridad | matching, conciliación, programación, estado y evidencia |
| proveedor/sistema fiscal o contable | documento, asiento, presentación o resultado oficial que realmente le pertenezca | referencia, estado, correlación, conciliación y proyección autorizada |
| NUMERA | hecho económico, obligación/derecho financiero, reglas de costo, presupuesto, conciliación, cierre económico y análisis | resultados ejecutivos y analíticos derivados |

---

#### 25. Estado objetivo frente al estado auditado

Esta tarea no modifica el estado AS-IS auditado.

Se establece la siguiente relación:

```text
AUDIT_STATE != TARGET_SCOPE
TARGET_SCOPE != IMPLEMENTED_CAPABILITY
DOCUMENTED_DECISION != PHYSICAL_IMPLEMENTATION
```

Por tanto:

- una capacidad `AUSENTE` puede quedar dentro del alcance objetivo sin considerarse implementada;
- una capacidad `PROTOTIPO` requiere completar contratos, fuentes, cálculo, autorización y evidencia antes de elevarse;
- una capacidad `PARCIAL` conserva sus piezas válidas, pero no justifica declarar el flujo completo;
- ninguna de las quince capacidades puede presentarse como completa por efecto de esta definición documental.

---

#### 26. Responsabilidades reservadas a tareas posteriores

| Tema | Tarea propietaria posterior | Resultado esperado |
| --- | --- | --- |
| hechos desde ventas | `NUMERA-DOM-002` | contrato de ingestión y efecto económico de ventas |
| hechos desde compras y recepción | `NUMERA-DOM-003` | contrato de hechos económicos de abastecimiento |
| producción e inventario | `NUMERA-DOM-004` | contrato económico de producción, inventario y transferencias |
| gastos | `NUMERA-DOM-005` | gasto, soporte, aprobación, corrección y anulación |
| centros de costo | `NUMERA-DOM-006` | identidad, propiedad y gobierno de catálogo |
| costos | `NUMERA-DOM-007` | estándar, real, métodos y variaciones |
| rentabilidad | `NUMERA-DOM-008` | dimensiones, fórmula, fuentes y publicación |
| caja y bancos | `NUMERA-DOM-009` | alcance aprobado de caja, bancos y conciliaciones |
| cuentas por pagar | `NUMERA-DOM-010` | obligación, vencimiento, aprobación, pago y disputa |
| cierres | `NUMERA-DOM-011` | periodos, bloqueo, cierre y reapertura |
| reportes | `NUMERA-DOM-012` | indicadores y exportaciones oficiales |
| frontera contable/fiscal | `NUMERA-DOM-013` | autoridad, integración y límites externos |
| diferencias | `NUMERA-DOM-014` | conciliación, resolución y evidencia |
| aprobación final del dominio | `NUMERA-DOM-015` | capacidades objetivo y diferidas aprobadas |
| cartera | `NUMERA-DOM-016` | cuentas por cobrar, cobranza y exposición |
| contabilidad formal extensible | `NUMERA-DOM-017` | arquitectura de plan de cuentas y comprobantes |
| escenarios | `NUMERA-DOM-018` | motor versionado de precios, costos, supuestos y publicación |

`NUMERA-DOM-001` fija la frontera común; no absorbe el detalle reservado a esas tareas.

---

#### 27. Invariantes globales del dominio

Quedan aprobadas estas invariantes:

1. NUMERA es autoridad de la verdad económica dentro del alcance aprobado, no propietario de todo hecho operativo.
2. Los hechos operativos permanecen en su dominio fuente y deben conservar correlación hacia NUMERA.
3. Está prohibido duplicar manualmente un hecho económico que pueda obtenerse de una fuente canónica correlacionada.
4. Todo resultado económico debe conservar trazabilidad suficiente hacia origen, método, periodo y evidencia.
5. Un agregado o reporte no se usa como fuente editable para reescribir sus hechos base.
6. No se asume equivalencia entre periodos operativos, económicos, contables y fiscales.
7. Presupuesto, forecast, escenario y hecho real permanecen separados.
8. Una transferencia interna no constituye ingreso externo por defecto.
9. NUMERA no modifica cantidades operativas para cuadrar un costo o una conciliación.
10. Está prohibida la sobrescritura histórica silenciosa para ocultar correcciones o variaciones.
11. NUMERA no adquiere autoridad contable formal por inferencia.
12. NUMERA no adquiere autoridad fiscal oficial por inferencia.

---

#### 28. Excepciones y condiciones de bloqueo

| Excepción | Tratamiento | Propietario de salida |
| --- | --- | --- |
| hecho fuente sin identidad estable | no registrar como hecho económico definitivo; conservar pendiente de correlación | tarea de integración/dominio del origen + NUMERA aplicable |
| dos fuentes reclaman el mismo hecho | bloquear duplicación y abrir diferencia de conciliación | `NUMERA-DOM-014` |
| entidad, sede o centro ambiguos | no inferir dimensión financiera | `NUMERA-DOM-006` y dominio organizacional |
| documento fiscal sin autoridad verificable | conservar referencia como no confirmada; no elevar a estado oficial | `NUMERA-DOM-013` |
| movimiento bancario ambiguo | no aplicar automáticamente a obligación o cartera | `NUMERA-DOM-009`, `NUMERA-DOM-014` |
| costo sin método o fuente | no publicar como costo definitivo | `NUMERA-DOM-007` |
| rentabilidad sin ingreso realizado o costo trazable | no publicar como rentabilidad real | `NUMERA-DOM-008` |
| presupuesto sin versión/aprobación | no presentar como presupuesto vigente | `NUMERA-DOM-018` y tareas presupuestales aplicables |
| transferencia interna entre entidades con posible efecto legal | no tratar como simple movimiento gerencial por inferencia | `NUMERA-DOM-013` y tratamiento profesional aplicable |
| diferencia que requiere corregir el hecho operativo | NUMERA registra la diferencia y solicita corrección al propietario; no altera el origen | propietario operativo + `NUMERA-DOM-014` |

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

La razón es que el Registro 04A vigente ya protege las reglas de reconciliación, identidad del hecho económico, cartera/obligaciones/bancos/tesorería, costos, presupuestos, distribución y rentabilidad que esta tarea organiza como alcance de dominio.

---

#### 30. Cobertura de prueba vigente reutilizada

Esta sección es trazabilidad de cobertura existente y no constituye una actualización del registro.

La cobertura vigente reutilizada incluye:

- `TREQ-NUMERA-001` para reconciliación con hechos y documentos fuente, no duplicación manual, historial y trazabilidad;
- `TREQ-NUMERA-002` para identidad estable del hecho económico, dimensiones, fechas, fuente, correlación, evidencia y preparación hacia contabilidad formal;
- `TREQ-NUMERA-003` para cartera, cuentas por pagar, bancos, caja consolidada, tesorería y separación de autorizaciones;
- `TREQ-NUMERA-004` para costos, distribuciones, presupuesto, forecast, escenarios, rentabilidad y separación de transferencias internas frente a ingreso/gasto legal.

No se entrega una actualización 04A porque ninguna regla protegida cambia de contenido o estado en esta tarea.

---

#### 31. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | esta definición no ejecuta build de producto; la evidencia técnica del estado AS-IS permanece en el minibloque de auditoría NUMERA |
| LOCAL | NOT_EXECUTED | la incorporación, formateo, quality, delivery, topología y batería global deberán ejecutarse en el checkout del usuario después del cierre de `OPS-CST-001` |
| REMOTA | PASS | se verificaron en `vento-shell/main` la continuidad vigente, topología `DEFINE_ONCE`, archivo propietario, lista `NUMERA-DOM-001..018`, matriz final de auditoría, CAP-12, procesos económicos objetivo, fuentes E1/E2, Registro 04A y validadores documentales vigentes; `OPS-CST-001` se consume desde su versión completa aprobada por el usuario mientras termina su publicación |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron ventas, compras, pagos, conciliaciones, costeo, presupuestos, cierres, tesorería, cartera, documentos fiscales ni procesos financieros reales |
| FÍSICA | NOT_APPLICABLE | `NUMERA-DOM-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia |

---

#### 32. Criterios de aceptación

La tarea queda aceptable cuando:

1. NUMERA queda definido como dominio económico, financiero y analítico sin apropiarse de todos los hechos operativos;
2. se separan hecho operativo, documento fuente, hecho económico, obligación/derecho, cálculo analítico, planificación, hecho contable formal y autoridad fiscal;
3. las quince capacidades `CAP-12` reciben una frontera objetivo explícita;
4. el estado AS-IS de la auditoría permanece separado del alcance TO-BE;
5. PULSO conserva operación de venta y caja operativa que le corresponde;
6. ORIGO conserva compra y recepción comercial;
7. FOGO conserva producción y resultados productivos;
8. NEXO conserva inventario y movimientos físicos;
9. NUMERA no modifica hechos fuente para cuadrar resultados;
10. todo hecho económico conserva identidad, fuente, correlación y evidencia suficientes;
11. caja operativa, caja consolidada, bancos y tesorería quedan diferenciados;
12. cartera, obligación, pago, aplicación, saldo y conciliación no se confunden;
13. costos, distribuciones y rentabilidad respetan el handoff de `OPS-CST-001`;
14. presupuesto, revisión, forecast, escenario y real quedan separados;
15. periodos operativo, económico, contable y fiscal no se asumen equivalentes;
16. NUMERA queda preparado para contabilidad formal sin declararse libro contable oficial por inferencia;
17. la autoridad fiscal externa queda preservada;
18. correcciones y reaperturas conservan historia;
19. las responsabilidades detalladas se asignan a `NUMERA-DOM-002..018` sin absorberlas en esta tarea;
20. no se crean ni modifican requisitos de prueba;
21. no se realizan cambios físicos;
22. la continuidad reserva `NUMERA-DOM-002`.

---

#### 33. Límites

Esta tarea no:

- implementa una capacidad financiera;
- modifica `vento-numera` ni otra aplicación;
- crea o modifica tablas, vistas, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase local o remoto;
- crea un ledger contable formal, plan de cuentas, comprobantes o asientos;
- decide normas contables o tributarias profesionales;
- sustituye un sistema bancario, contable o fiscal externo;
- crea facturación fiscal propia;
- modifica caja operativa de PULSO;
- modifica compras o recepciones de ORIGO;
- modifica producción de FOGO;
- modifica inventario o logística de NEXO;
- crea centros de costo;
- define fórmulas definitivas de costo o rentabilidad;
- aprueba drivers concretos de distribución;
- crea presupuestos, forecasts o escenarios reales;
- ejecuta cierres o reaperturas;
- registra cartera u obligaciones reales;
- crea permisos;
- modifica 04A;
- desarrolla todavía `NUMERA-DOM-002`.

---

#### 34. Handoff a NUMERA-DOM-002

`NUMERA-DOM-002` recibe estas reglas para definir hechos económicos provenientes de ventas:

1. la operación de venta permanece en el dominio fuente que la ejecuta;
2. el efecto económico de la venta pertenece a NUMERA dentro del alcance aprobado;
3. la venta fuente no se duplica para crear el hecho económico;
4. todo hecho económico recibido desde ventas requiere correlación estable con su fuente;
5. ingreso esperado e ingreso realizado no se tratan como equivalentes;
6. pago y venta son hechos distintos;
7. entrega y pago son hechos distintos;
8. documento fiscal y pago son hechos distintos;
9. un reporte agregado no se convierte en hecho fuente;
10. las correcciones conservan la historia original y su acción compensatoria;
11. los periodos operativo, económico, contable y fiscal permanecen diferenciados.

La siguiente tarea deberá concretar qué eventos de venta recibe NUMERA, qué identidad y evidencia conservan, cuándo existe efecto económico y cómo evitar duplicación o reconocimiento prematuro, sin invadir caja operativa, entrega, pago o facturación oficial.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`OPS-CST-001 — Definir el caso de centro de costo y transferencias internas de Producción y Distribución`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas`
### ✅ NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA
**Tarea siguiente:** NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción
**Tipo de tarea:** definición documental del contrato económico de entrada desde ventas hacia NUMERA, delimitando fuentes propietarias, condiciones de recepción y reconocimiento, correlación, idempotencia, importes, ajustes, evidencia y fronteras frente a pago, caja, entrega, documento fiscal, cartera y contabilidad formal; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica PULSO, NUMERA, PASS, NEXO, Supabase, eventos runtime, contratos TypeScript, pagos, caja, pedidos, ventas reales, documentos fiscales, inventario, cartera, conciliaciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué información comercial proveniente de ventas puede ingresar a NUMERA como candidato de hecho económico, qué evidencia debe conservar, cuándo puede reconocerse dentro del dominio económico, cómo se evita duplicación y qué efectos posteriores deben representarse mediante ajustes o compensaciones sin reescribir la venta de origen.

La tarea desarrolla exclusivamente la frontera de entrada desde ventas aprobada por `NUMERA-DOM-001` y debe permitir que NUMERA:

- consuma la verdad comercial sin convertirse en POS;
- conserve correlación estable con PULSO y con el origen externo cuando exista;
- distinga venta, pago, caja, entrega, documento fiscal, cartera y hecho económico;
- diferencie compromiso comercial, venta económicamente reconocible y evidencia de conciliación;
- preserve importes, líneas y condiciones históricas sin reconstruirlas desde agregados;
- procese anulaciones, devoluciones y otros cambios mediante efectos trazables y no destructivos;
- soporte posteriormente cartera, conciliación, costos y rentabilidad sin doble registro.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-002` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define un contrato documental reutilizable;
- no crea una instancia física propia;
- no publica eventos;
- no implementa consumidores;
- no crea tablas, vistas, RPC, RLS, triggers ni migraciones;
- no ejecuta ventas, pagos, reembolsos ni conciliaciones;
- no cambia propiedad funcional entre PULSO y NUMERA;
- no define todavía cartera detallada, caja/bancos, conciliación general ni contabilidad formal.

---

#### 3. Handoff recibido de NUMERA-DOM-001

`NUMERA-DOM-001` entrega estas invariantes:

```text
PULSO_CONSERVA_HECHO_COMERCIAL = SI
NUMERA_CONSERVA_EFECTO_ECONOMICO = SI
VENTA != PAGO
VENTA != CAJA
VENTA != ENTREGA
VENTA != DOCUMENTO_FISCAL
VENTA != HECHO_ECONOMICO
HECHO_ECONOMICO != ASIENTO_CONTABLE
INGRESO_ESPERADO != INGRESO_REALIZADO
AGREGADO_O_REPORTE != FUENTE_EDITABLE
CORRECCION_DESTRUCTIVA = PROHIBIDA
```

También establece que todo hecho económico objetivo debe conservar identidad estable, entidad legal, dimensiones autorizadas, moneda, fechas, fuente, correlación, documento o evidencia, importe, estado e historia suficiente para conciliación y trazabilidad.

---

#### 4. Fuentes comerciales propietarias

Los procesos comerciales fuente permanecen bajo propiedad de PULSO:

| Proceso | Hecho comercial principal | Regla para NUMERA |
| --- | --- | --- |
| `VPROC-0038` | servicio en mesa de apertura a cierre | NUMERA consume únicamente referencias y resultados económicos confirmables; no administra mesa, pedido, preparación ni servicio |
| `VPROC-0039` | venta de mostrador o para llevar | NUMERA consume el resultado comercial correlacionado; no recrea pedido, entrega ni cobro |
| `VPROC-0040` | normalización de pedidos de canales externos | el tercero no escribe un hecho económico interno directamente; PULSO valida, normaliza y conserva la autoridad interna |
| `VPROC-0041` | catering o venta B2B | NUMERA consume efectos económicos y referencias de cartera cuando el compromiso comercial tenga el estado y evidencia aplicables |
| `VPROC-0042` | modificación, sustitución, cancelación, anulación y devolución | NUMERA consume efectos económicos autorizados y correlacionados; no interpreta toda modificación como reversión financiera |
| `VPROC-0043` | cobro, confirmación de pago y soporte fiscal | pago y documento son evidencias separadas; no crean por sí solos una segunda venta |
| `VPROC-0044` | cierre y conciliación de caja | el cierre puede aportar evidencia y diferencias; no sustituye las ventas fuente ni autoriza reescribirlas |

PULSO emite los hechos de sus procesos. NUMERA emite únicamente los registros, obligaciones, conciliaciones y resultados económicos de sus propios procesos.

---

#### 5. Frontera de identidades

Se conserva obligatoriamente:

```text
PEDIDO
!= VENTA
!= PAGO
!= MOVIMIENTO_DE_CAJA
!= ENTREGA
!= DOCUMENTO_FISCAL
!= DEVOLUCION
!= REEMBOLSO
!= CUENTA_POR_COBRAR
!= HECHO_ECONOMICO
!= ASIENTO_CONTABLE
```

Una relación entre dos identidades no las fusiona.

Ejemplos:

- un pago puede liquidar una cuenta sin crear la venta;
- una entrega puede completar una obligación comercial sin confirmar un pago;
- un documento fiscal puede respaldar una venta sin ser la venta;
- una devolución física puede existir sin implicar automáticamente reembolso total;
- un reembolso puede devolver dinero sin borrar el hecho comercial original;
- un hecho económico puede estar validado sin constituir todavía un asiento contable formal.

---

#### 6. Regla de entrada a NUMERA

NUMERA recibirá únicamente una afirmación comercial canónica o un soporte correlacionable que permita demostrar, como mínimo:

1. aplicación o sistema fuente;
2. proceso comercial fuente;
3. identidad estable del pedido, venta o compromiso aplicable;
4. identidad estable del evento o versión recibida;
5. entidad legal aplicable;
6. sede;
7. canal;
8. moneda;
9. fecha de ocurrencia;
10. importe comercial y sus componentes disponibles;
11. estado comercial fuente;
12. referencias a líneas o snapshot comercial cuando apliquen;
13. referencias de pago, entrega o documento únicamente como correlaciones separadas;
14. evidencia de autorización cuando el hecho sea correctivo o compensatorio;
15. relación con el hecho original cuando exista anulación, devolución, corrección o compensación.

Una entrada incompleta puede quedar pendiente de validación, pero no puede elevarse silenciosamente a hecho económico definitivo.

---

#### 7. Sobre económico mínimo recibido desde ventas

El contrato lógico de entrada deberá poder representar, cuando aplique:

| Grupo | Campos o referencias mínimas |
| --- | --- |
| identidad | fuente propietaria, proceso, identidad de venta o compromiso, identidad del evento, versión |
| organización | entidad legal, marca o unidad referenciada, sede, centro de costo cuando exista asignación autorizada |
| comercial | canal, modalidad, cliente opcional, contraparte cuando corresponda, pedido o compromiso fuente |
| temporal | ocurrencia, emisión/recepción y fecha económica propuesta |
| monetario | moneda, subtotal, descuentos, impuestos, propinas/servicio cuando existan, total comercial y efecto neto propuesto |
| líneas | producto/presentación o referencia canónica, cantidad, precio histórico, descuento/impuesto y versión o snapshot aplicable |
| evidencia | referencias de pago, entrega, soporte fiscal, aprobación o canal externo sin fusionar sus estados |
| corrección | identidad original, tipo de cambio, motivo, actor/autoridad y efecto monetario cuando exista |
| control | estado de validación, huella o clave lógica de deduplicación, estado de conciliación y evidencia |

La implementación física posterior podrá materializar estos conceptos mediante contratos compartidos, pero esta tarea no crea nombres de columnas, tablas ni endpoints.

---

#### 8. Integridad del snapshot comercial

NUMERA no recalculará una venta histórica usando el precio o la oferta vigente al momento de consulta.

Debe conservar o poder referenciar el snapshot comercial que originó el compromiso, incluyendo cuando aplique:

- producto o presentación;
- cantidad;
- precio unitario aplicado;
- descuentos;
- impuestos;
- recargos o servicio;
- moneda;
- canal;
- sede;
- versión o revisión comercial.

Un cambio posterior de catálogo, precio, impuesto, promoción o receta no modifica retrospectivamente la venta ya recibida.

---

#### 9. Estados fuente que no reconocen por sí solos ingreso realizado

Los estados previos al cierre comercial constituyen intención, ejecución o evidencia parcial y no se convierten automáticamente en ingreso realizado.

Ejemplos explícitos:

| Fuente | Estado o condición | Tratamiento económico |
| --- | --- | --- |
| `VPROC-0038` | `TABLE_SERVICE_OPENED`, `ORDERING`, `PREPARATION_IN_PROGRESS`, `PARTIALLY_SERVED`, `SERVED`, `PAYMENT_PENDING` | referencia operativa; no ingreso realizado por sí sola |
| `VPROC-0039` | `COUNTER_SALE_OPENED`, `ITEMS_SELECTED`, `PREPARATION_IN_PROGRESS`, `READY_FOR_HANDOFF`, `PAYMENT_PENDING`, `HANDOFF_PENDING` | referencia operativa; no ingreso realizado por sí sola |
| `VPROC-0040` | pedido externo recibido, validado, mapeado o aceptado | el canal externo aún no crea un hecho económico interno definitivo por sí solo |
| `VPROC-0041` | solicitud, cotización, aprobación, aceptación o capacidad reservada | compromiso comercial; no ingreso realizado por sí solo |
| `VPROC-0043` | pago pendiente, medio seleccionado, autorización o captura | evidencia financiera separada; no crea la venta |
| `VPROC-0044` | cierre de caja abierto o conciliación en curso | evidencia de cierre; no crea ventas ausentes |

NUMERA puede conservar estos estados para conciliación o expectativa, pero no publicarlos como ingreso realizado.

---

#### 10. Evento comercial apto para reconocimiento económico

Un candidato de venta podrá avanzar hacia reconocimiento económico únicamente cuando el dominio comercial propietario haya emitido un resultado canónico que demuestre que el compromiso comercial aplicable quedó efectivamente cumplido o cerrado bajo sus propias reglas.

Referencias fuertes ya definidas por los procesos fuente:

- `VPROC-0038.TABLE_SERVICE_CLOSED` confirma que pedido, preparación, entregas, consumos, pagos, diferencias y liberación fueron conciliados;
- `VPROC-0039.COUNTER_SALE_CLOSED` confirma que pedido, preparación, entrega, cobro y comprobante corresponden al mismo compromiso;
- `VPROC-0041.COMMERCIAL_COMMITMENT_CLOSED` confirma que condiciones, producción, entrega, aceptación, facturación y cobro o cartera quedaron vinculados, con destino para pendientes residuales.

El cierre comercial es una condición de fuente, no reconocimiento automático de NUMERA. NUMERA todavía debe validar origen, soporte, entidad, fecha, valor, moneda, duplicidad y tratamiento antes de reconocer el hecho económico.

---

#### 11. Regla de reconocimiento dentro de VPROC-0051

El flujo económico conserva los estados aprobados de `VPROC-0051`:

```text
ECONOMIC_EVENT_RECEIVED
→ VALIDATION_IN_PROGRESS
→ CLASSIFICATION_PENDING
→ CLASSIFIED
→ POSTING_PENDING
→ POSTED
→ RECONCILIATION_PENDING / ALLOCATION_PENDING cuando aplique
→ ECONOMIC_EVENT_RECONCILED
```

Reglas:

1. `ECONOMIC_EVENT_RECEIVED` solo confirma recepción; no reconoce, contabiliza, distribuye ni cierra;
2. validación comprueba origen, soporte, entidad, fecha, valor, moneda y duplicidad;
3. clasificación define tratamiento y dimensiones sin alterar PULSO;
4. `POSTED` significa reconocimiento dentro del dominio económico, conservando vínculo con la venta fuente;
5. `ECONOMIC_EVENT_RECONCILED` exige que el hecho haya quedado reconocido una sola vez y conciliado con sus referencias;
6. `POSTED` no se interpreta por esta tarea como asiento contable formal.

---

#### 12. Ingreso esperado frente a ingreso realizado

NUMERA mantendrá la diferencia entre:

- expectativa comercial o proyección;
- compromiso comercial aceptado;
- venta fuente en ejecución;
- hecho económico reconocido;
- ingreso utilizado en análisis de rentabilidad.

Una cotización, pedido aceptado, preparación, pago autorizado o documento pendiente no se publicará como ingreso realizado.

Para análisis de rentabilidad, el ingreso realizado deberá derivarse de hechos económicos reconocidos y conciliables, no de pedidos abiertos, totales estimados ni sumas de reportes operativos.

Esta regla es económica y analítica; no define por sí sola criterios contables o tributarios legales.

---

#### 13. Pago y recaudo permanecen separados

Un pago confirmado o conciliado no crea ni reemplaza la venta.

Queda establecido:

- `VPROC-0043.PAYMENT_RECONCILED` confirma el pago dentro de su alcance, pero no cierra por sí solo venta, caja, entrega o devolución;
- un pago parcial no convierte en parcial una venta fuente por inferencia;
- un pago combinado conserva sus componentes sin duplicar la venta;
- un pago recibido puede alimentar cartera o aplicación financiera mediante `VPROC-0053`, pero la cuenta por cobrar y su liquidación permanecen objetos separados;
- un timeout o estado desconocido de proveedor no se considera pago fallido ni éxito económico sin conciliación;
- un reembolso financiero no elimina el hecho económico de venta original.

El detalle de caja y bancos pertenece a `NUMERA-DOM-009`; el detalle de cartera pertenece a `NUMERA-DOM-016`.

---

#### 14. Entrega y cumplimiento permanecen separados

La entrega es evidencia del cumplimiento comercial, no un hecho económico independiente que NUMERA pueda inventar.

Reglas:

1. una entrega parcial no crea automáticamente ingreso total;
2. una entrega completa puede ser condición del cierre comercial según el proceso fuente;
3. un PIN, prueba de entrega o estado logístico no prueba por sí solo pago ni documento fiscal;
4. una devolución física posterior no borra la entrega original;
5. NEXO conserva los efectos físicos de inventario que le correspondan;
6. PULSO conserva el resultado de cumplimiento al cliente;
7. NUMERA usa referencias de entrega únicamente para validar o conciliar el efecto económico.

---

#### 15. Documento fiscal permanece separado

El documento fiscal no constituye por sí solo venta, pago ni hecho económico reconocido.

NUMERA podrá conservar:

- referencia;
- tipo;
- estado;
- fecha;
- importe recibido;
- proveedor autorizado;
- correlación con venta y pago;
- evidencia de emisión, aceptación, rechazo, anulación o resultado cuando exista.

La autoridad de emisión fiscal permanece con el proveedor o sistema autorizado. El tratamiento detallado se reserva a `NUMERA-DOM-013`.

---

#### 16. Caja y cierre de jornada permanecen separados

`VPROC-0044` concilia ventas, pagos, efectivo, devoluciones, anulaciones, documentos y diferencias.

Para NUMERA:

- el cierre de caja es evidencia de conciliación, no una fuente sustituta de las ventas individuales;
- un total de cierre no puede materializar ventas faltantes;
- una diferencia de caja no autoriza a modificar importes de venta;
- un cierre posterior puede abrir una diferencia económica, pero conserva la identidad de cada venta y pago;
- los agregados de jornada son proyecciones reconciliables y no hechos editables de origen.

---

#### 17. Cartera y venta a crédito

Una venta puede producir un derecho de cobro cuando el contrato comercial aplicable y la evidencia validada así lo determinen.

La creación del hecho económico de venta y la creación o actualización de la cuenta por cobrar permanecen relacionadas pero separadas.

`VPROC-0053.RECEIVABLE_REGISTERED` exige contraparte, origen, monto, fecha y condición de cobro o recaudo. Su ciclo posterior administra validación, cobro, pago recibido, aplicación, diferencias y liquidación sin eliminar la venta, cliente, factura, acuerdos o evidencia.

El detalle de cliente/deudor, cuotas, vencimientos, aging, promesas, disputas, exposición y castigo permanece reservado a `NUMERA-DOM-016`.

---

#### 18. Canales externos

Un canal externo no se registra como productor interno de un hecho económico NUMERA.

Flujo obligatorio:

```text
AFIRMACION_EXTERNA
→ ADAPTADOR_CONSERVA_PAYLOAD_FIRMA_IDENTIDAD_Y_MOMENTO
→ PULSO_VALIDA_Y_NORMALIZA
→ HECHO_COMERCIAL_INTERNO
→ EVENTO_CANONICO_DE_PULSO
→ CONSUMO_ECONOMICO_POR_NUMERA
```

Consecuencias:

- Rappi, Shopify, ManyChat u otro tercero futuro no escribe NUMERA directamente por ser fuente externa;
- PULSO conserva identidad externa y mapeo interno;
- la misma venta visible en canal, PASS y PULSO no se cuenta varias veces;
- comisiones, liquidaciones o diferencias del canal se concilian como componentes o hechos financieros separados, no alterando el total comercial original sin contrato explícito;
- payloads duplicados, reintentos y webhooks fuera de orden no multiplican efectos económicos.

---

#### 19. Venta B2B y catering

`VPROC-0041` separa solicitud, cotización, aprobación, aceptación, capacidad, cumplimiento, entrega, facturación y cobro o cartera.

Reglas para NUMERA:

1. solicitud y cotización no crean ingreso realizado;
2. aceptación del cliente y reserva de capacidad constituyen compromiso comercial, no realización automática;
3. anticipos o pagos parciales se registran como hechos financieros separados de la venta;
4. el cierre comercial puede vincular cobro o cartera sin exigir que ambos sean lo mismo;
5. una venta B2B cerrada puede originar cuenta por cobrar según condiciones comerciales válidas;
6. el tratamiento fiscal y contable formal permanece reservado a sus tareas propietarias.

---

#### 20. Cancelación, anulación, devolución, reembolso y compensación

Estas acciones conservan semánticas diferentes.

| Acción | Efecto económico permitido en NUMERA |
| --- | --- |
| cancelación antes de un hecho económico reconocido | cancela expectativa o compromiso aplicable; no crea reverso de ingreso inexistente |
| anulación de una venta reconocida | puede generar efecto inverso autorizado y correlacionado; nunca borra el original |
| devolución | requiere determinar el efecto comercial y monetario; la devolución física por sí sola no define el importe económico |
| reembolso | registra salida o reverso financiero según su fuente; no prueba por sí solo anulación total de la venta |
| compensación | crea efecto adicional explícito cuando el original no puede simplemente deshacerse |
| corrección | conserva antes, después, motivo, autoridad y versión; no reemplaza silenciosamente el registro previo |

Toda acción posterior deberá referenciar la identidad original y conservar el motivo y la autoridad que produjo el efecto.

---

#### 21. Idempotencia, duplicados y replay

La entrega de una misma afirmación puede repetirse; su efecto económico no.

NUMERA deberá poder distinguir como mínimo:

- repetición exacta del mismo evento;
- nueva versión válida del mismo compromiso;
- corrección autorizada;
- evento tardío;
- replay o backfill;
- duplicado entre canal externo y PULSO;
- duplicado entre PULSO y una proyección consumidora;
- conflicto real entre dos fuentes.

Reglas:

1. la identidad económica conserva la productora histórica;
2. replay y backfill no convierten a quien ejecuta el replay en propietario del hecho;
3. un evento tardío no sobrescribe una versión posterior;
4. una consumidora no vuelve a publicar la venta como si fuera propietaria;
5. una respuesta perdida no autoriza crear una venta nueva;
6. los conflictos no se resuelven seleccionando silenciosamente el valor que haga cuadrar el reporte.

La clave física exacta y almacenamiento de idempotencia permanecen en los contratos de integración y materialización correspondientes.

---

#### 22. Correlación obligatoria

Cada hecho económico de venta deberá poder navegar hacia sus referencias sin exigir búsqueda manual ambigua.

Como mínimo, cuando existan:

```text
HECHO_ECONOMICO
↔ EVENTO_COMERCIAL_PULSO
↔ VENTA_O_COMPROMISO
↔ PEDIDO
↔ LINEAS_Y_SNAPSHOT
↔ PAGO_O_RECAUDO
↔ ENTREGA
↔ DOCUMENTO_FISCAL
↔ AJUSTE_O_COMPENSACION
```

La ausencia de una referencia no se rellena inventando otra. Se conserva como pendiente o diferencia con propietario de salida.

---

#### 23. Fechas y periodos

NUMERA conservará separadas:

- fecha/hora del evento comercial;
- fecha/hora de cierre comercial;
- fecha/hora de recepción en NUMERA;
- fecha económica propuesta y validada;
- fecha de pago o recaudo;
- fecha de entrega;
- fecha del documento fiscal;
- fecha de corrección o compensación;
- periodo económico aplicable.

No se derivará automáticamente el periodo económico desde la fecha de pago, factura, entrega o cierre de caja si el contrato de reconocimiento aplicable exige otra condición.

Periodo operativo, económico, contable y fiscal permanecen no equivalentes.

---

#### 24. Importes y componentes monetarios

NUMERA no reducirá la venta a un único total opaco.

Cuando la fuente disponga de componentes válidos, deberá poder preservar o correlacionar:

- subtotal o valor base;
- descuentos;
- impuestos;
- propinas o servicio;
- otros recargos autorizados;
- total comercial;
- moneda;
- importe pagado;
- importe pendiente;
- importe devuelto, anulado o compensado;
- diferencias de conciliación.

La existencia de un componente no define por sí sola su tratamiento contable o tributario. Ese tratamiento permanece fuera de esta tarea.

---

#### 25. Cliente, contraparte y venta anónima

La venta a consumidor final puede existir sin crear un cliente artificial.

Reglas:

- cliente opcional no significa identidad inventada;
- cliente, deudor y cuenta PASS permanecen identidades diferentes;
- una venta B2B o a crédito requiere contraparte suficiente para el derecho de cobro correspondiente;
- NUMERA reutiliza identidades canónicas autorizadas y no crea un maestro de clientes paralelo;
- la ausencia de cliente nominal en una venta de consumidor final no bloquea por sí sola el hecho económico si las demás condiciones son válidas.

---

#### 26. Casos que deben quedar pendientes o en diferencia

NUMERA no reconocerá silenciosamente como hecho definitivo una entrada con:

- identidad de venta ausente o ambigua;
- productor no autorizado;
- entidad legal no resoluble;
- moneda ausente cuando el importe la requiere;
- importe total incompatible con sus componentes sin explicación;
- evento duplicado con mismo origen y efecto;
- versión anterior recibida después de una versión posterior sin tratamiento explícito;
- referencia externa no normalizada por PULSO;
- ajuste sin hecho original;
- anulación, devolución o compensación sin motivo o autoridad cuando la acción los requiere;
- pago o documento usado como sustituto de una venta inexistente;
- agregado de cierre usado para fabricar ventas individuales;
- conflicto de periodos que no pueda resolverse con la evidencia disponible.

Estos casos deberán conservarse para validación o conciliación según la tarea propietaria correspondiente.

---

#### 27. Matriz de propiedad y escritura

| Información o acción | Propietaria | Regla de frontera |
| --- | --- | --- |
| pedido, líneas, precio comercial y revisión | PULSO | NUMERA referencia; no modifica |
| venta y cierre comercial | PULSO | NUMERA consume el resultado canónico |
| pago asociado a venta | PULSO/proveedor de pago según contrato | NUMERA concilia y aplica financieramente sin recrearlo |
| caja operativa | PULSO | NUMERA consume totales y diferencias autorizadas; no opera la sesión |
| entrega al cliente | PULSO con fronteras logísticas aprobadas | NUMERA usa evidencia; no gobierna fulfillment |
| movimiento físico de inventario | NEXO | NUMERA no crea salidas físicas por recibir una venta |
| documento fiscal | proveedor/sistema autorizado con referencia en PULSO | NUMERA conserva referencia/estado; no emite por inferencia |
| hecho económico | NUMERA | se reconoce una sola vez con vínculo al origen |
| cuenta por cobrar | NUMERA | se relaciona con la venta sin sustituirla |
| ajuste económico | NUMERA a partir de fuente/decisión autorizada | crea efecto correlacionado; no edita la venta original |
| asiento contable formal | frontera posterior | no queda creado por esta tarea |

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

La cobertura vigente ya protege no duplicación, identidad del hecho económico, cartera/pagos, separación de hechos PULSO y fronteras de integración que esta tarea concreta.

---

#### 29. Cobertura de prueba vigente reutilizada

Esta sección documenta cobertura existente y no constituye una actualización del Registro 04A.

Cobertura principal reutilizada:

- `TREQ-NUMERA-001` — conciliación con PULSO/ORIGO/FOGO/NEXO, no duplicación manual, historia y trazabilidad;
- `TREQ-NUMERA-002` — identidad estable del hecho económico, entidad, dimensiones, fechas, fuente, correlación, documento, monto, impuestos, estado y correcciones no destructivas;
- `TREQ-NUMERA-003` — cartera, cuentas por cobrar, pagos recibidos, aplicación, saldos y conciliación;
- `TREQ-PULSO-005` — separación de pedido, preparación, cumplimiento, pago, fiscal, inventario y fidelización;
- `TREQ-PULSO-006` — venta, pago, caja y factura como hechos distintos, con anulación, devolución, reembolso y cierre auditables;
- `TREQ-INTEGRATION-006` — una sola captura y fuente propietaria por dato empresarial, sin doble digitación o fuente competidora;
- requisitos de integración vigentes que preservan propiedad de PULSO sobre la venta y prohíben que NUMERA la recree mediante escritura cruzada.

No se entrega una actualización 04A porque ninguna regla protegida cambia de contenido ni de estado.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | esta tarea es documental y no ejecuta build de producto; la incorporación deberá validarse con el tooling documental vigente |
| LOCAL | NOT_EXECUTED | el reemplazo, formato, quality, delivery, topología, plan y TREQ deberán ejecutarse en el checkout del usuario cuando `NUMERA-DOM-001` haya cerrado y habilitado continuidad |
| REMOTA | PASS | se verificaron `vento-shell/main`, el marcador `NUMERA-DOM-002`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, procesos PULSO `VPROC-0038..0044`, procesos NUMERA `VPROC-0051` y `VPROC-0053`, contratos de eventos entre aplicaciones, `CAP-SCOPE-009`, Registro 04A y validadores documentales vigentes; `NUMERA-DOM-001` se consume desde su versión completa aprobada |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron ventas, pagos, devoluciones, reembolsos, cierres de caja, cartera ni conciliaciones reales |
| FÍSICA | NOT_APPLICABLE | `NUMERA-DOM-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia |

---

#### 31. Criterios de aceptación

La tarea queda aceptable cuando:

1. PULSO permanece propietario de la venta y NUMERA del efecto económico;
2. venta, pago, caja, entrega, documento fiscal, cartera, hecho económico y asiento permanecen identidades distintas;
3. se identifica el conjunto de procesos comerciales fuente `VPROC-0038..0044` aplicable;
4. canales externos pasan por PULSO antes de producir un hecho interno consumible por NUMERA;
5. una entrada recibida no se considera automáticamente reconocida;
6. el reconocimiento económico usa `VPROC-0051` y valida origen, soporte, entidad, fecha, valor, moneda y duplicidad;
7. estados comerciales intermedios no se publican como ingreso realizado;
8. cierres comerciales canónicos pueden originar candidatos reconocibles sin saltarse la validación de NUMERA;
9. pago confirmado no crea venta;
10. entrega no crea pago;
11. documento fiscal no crea venta ni pago;
12. cierre de caja no fabrica ventas individuales;
13. venta a crédito puede relacionarse con cartera sin fusionar ambos objetos;
14. cliente, deudor y cuenta PASS permanecen diferenciados;
15. la venta histórica conserva snapshot de precios, impuestos, descuentos y líneas aplicables;
16. una acción correctiva referencia el hecho original y no lo borra;
17. cancelación, anulación, devolución, reembolso y compensación conservan semánticas separadas;
18. replay, reintento o doble visibilidad en canales no duplica efecto económico;
19. fechas de venta, recepción, reconocimiento, pago, entrega y documento permanecen separadas;
20. los agregados y reportes no se usan como fuente editable;
21. los casos ambiguos quedan pendientes o en diferencia con propietario de salida;
22. no se crean ni modifican requisitos de prueba;
23. no se realizan cambios físicos;
24. la continuidad reserva `NUMERA-DOM-003`.

---

#### 32. Límites

Esta tarea no:

- implementa eventos, consumidores, colas, topics, outbox o inbox;
- crea tablas, columnas, índices, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase;
- modifica PULSO o NUMERA;
- define permisos de cajero, supervisor, finanzas o contabilidad;
- ejecuta ventas ni altera ventas existentes;
- define el flujo detallado de caja o bancos;
- define el flujo completo de cartera y cobranza;
- define el sistema fiscal externo;
- define plan de cuentas, comprobantes o asientos;
- fija reglas profesionales de reconocimiento contable o tributario;
- crea clientes, deudores o cuentas PASS;
- crea movimientos físicos de inventario;
- define costos o rentabilidad;
- resuelve todavía la conciliación general de diferencias;
- modifica el Registro 04A;
- desarrolla `NUMERA-DOM-003`.

---

#### 33. Handoff a NUMERA-DOM-003

`NUMERA-DOM-003` recibe una frontera ya cerrada para aplicar el mismo principio de propiedad a compras y recepción:

1. el dominio operativo de origen conserva compra y recepción;
2. NUMERA recibe únicamente efectos económicos correlacionados;
3. recepción de una afirmación no equivale a reconocimiento definitivo;
4. soportes, pagos, documentos y movimiento físico permanecen identidades separadas;
5. todo hecho económico debe conservar fuente, identidad, entidad, moneda, fechas, importe, evidencia y no duplicidad;
6. correcciones no sobrescriben historia;
7. agregados no sustituyen hechos fuente;
8. idempotencia y conciliación deben impedir doble efecto.

La siguiente tarea deberá concretar estas reglas para compras y recepción sin invadir ORIGO, NEXO, cuentas por pagar ni tratamiento fiscal/contable formal.

---

#### 34. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción`
### ✅ NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas
**Tarea siguiente:** NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario
**Tipo de tarea:** definición documental del contrato económico de entrada desde compras y recepción hacia NUMERA, delimitando autoridad de ORIGO y NEXO, condiciones de recepción y reconocimiento, obligación por pagar, correlación orden–recepción–soporte, parcialidad, diferencias, devoluciones, servicios, idempotencia, evidencia y fronteras frente a inventario, gasto, pago y contabilidad formal; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica ORIGO, NEXO, NUMERA, FOGO, Supabase, eventos runtime, contratos TypeScript, órdenes, recepciones reales, movimientos de inventario, obligaciones, pagos, documentos de proveedor, costos, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué hechos provenientes del ciclo de compra y recepción pueden ingresar a NUMERA como candidatos de efecto económico, qué evidencias deben conservar, cuándo pueden reconocerse, cómo se separan de la recepción física y de la obligación por pagar, y cómo deben tratarse parcialidades, diferencias, servicios, devoluciones y reintentos sin duplicar costo, inventario ni obligación.

La tarea desarrolla la frontera de abastecimiento aprobada por `NUMERA-DOM-001` y consume el principio de ingestión definido por `NUMERA-DOM-002` para que NUMERA:

- consuma la verdad de compra sin convertirse en ORIGO;
- consuma la verdad física sin convertirse en NEXO;
- diferencie orden, compromiso, recepción comercial, entrada física, documento de proveedor, hecho económico, obligación y pago;
- conserve correlación estable desde la compra hasta el efecto económico;
- reconozca únicamente efectos suficientemente sustentados y no agregados manuales competidores;
- procese recepciones parciales y diferencias sin cerrar prematuramente órdenes u obligaciones;
- represente devoluciones, notas, correcciones y compensaciones sin borrar el hecho original;
- soporte posteriormente costos, cuentas por pagar y conciliación sin doble registro.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-003` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define un contrato documental reutilizable;
- no crea una instancia física propia;
- no publica eventos;
- no implementa consumidores;
- no crea tablas, vistas, funciones, RPC, RLS, triggers ni migraciones;
- no ejecuta compras, recepciones, movimientos de inventario, obligaciones ni pagos;
- no cambia la propiedad funcional entre ORIGO, NEXO y NUMERA;
- no define todavía costos detallados, gastos generales, cuentas por pagar completas ni contabilidad formal.

---

#### 3. Handoff recibido de NUMERA-DOM-002

`NUMERA-DOM-002` entrega estas reglas reutilizables para toda entrada económica interaplicación:

```text
FUENTE_OPERATIVA_CONSERVA_PROPIEDAD = SI
NUMERA_CONSUME_EFECTO_ECONOMICO = SI
RECIBIR != RECONOCER
SOPORTE != HECHO_ORIGEN
PAGO != HECHO_ORIGEN
AGREGADO != FUENTE_EDITABLE
CORRECCION_DESTRUCTIVA = PROHIBIDA
REINTENTO_NO_DUPLICA_EFECTO = SI
```

Además, todo hecho económico deberá conservar identidad estable, entidad legal, dimensiones autorizadas, contraparte cuando aplique, moneda, fechas diferenciadas, fuente, correlación, documento o evidencia, importe, estado, versión y trazabilidad suficiente para conciliación.

Estas reglas se aplican ahora al ciclo de abastecimiento sin reutilizar semánticas de venta que no correspondan.

---

#### 4. Dominios y procesos fuente

La propiedad funcional se conserva así:

| Proceso o dominio | Propietario | Verdad que conserva | Regla para NUMERA |
| --- | --- | --- | --- |
| `VPROC-0019` | ORIGO | necesidad de compra | puede aportar referencia y contexto; no crea obligación por sí sola |
| `VPROC-0020` | ORIGO | evaluación y selección de proveedor | aporta decisión y condiciones; no constituye recepción ni obligación |
| `VPROC-0021` | ORIGO | aprobación, emisión y formalización del compromiso de compra | aporta compromiso contractual; no demuestra entrega, recepción conforme, obligación reconocida ni pago |
| `VPROC-0022` | ORIGO | llegada, verificación, aceptación comercial y resolución de diferencias | aporta la evidencia principal de recepción comercial aceptada |
| `VPROC-0024` | NEXO | ingreso, ubicación y movimiento físico | confirma el efecto físico exactamente una vez; no sustituye aceptación comercial o económica |
| `VPROC-0051` | NUMERA | recepción, validación, clasificación, reconocimiento y conciliación del hecho económico | gobierna el hecho económico derivado |
| `VPROC-0052` | NUMERA | obligación, aprobación, programación, pago y conciliación bancaria | gobierna la cuenta por pagar cuando corresponda |

ORIGO conserva compra y recepción comercial. NEXO conserva inventario y movimiento físico. NUMERA conserva hecho económico, obligación y conciliación financiera.

---

#### 5. Frontera de identidades

Se conserva obligatoriamente:

```text
NECESIDAD_DE_COMPRA
!= CASO_DE_ABASTECIMIENTO
!= ORDEN_DE_COMPRA
!= COMPROMISO_DE_COMPRA
!= LLEGADA
!= RECEPCION_COMERCIAL
!= MOVIMIENTO_DE_INVENTARIO
!= DOCUMENTO_DE_PROVEEDOR
!= HECHO_ECONOMICO
!= OBLIGACION_POR_PAGAR
!= PAGO
!= CONCILIACION_BANCARIA
!= ASIENTO_CONTABLE
```

Consecuencias:

- una orden aprobada no prueba recepción;
- una recepción comercial no prueba ingreso físico si el bien debe ingresar a inventario;
- un ingreso físico no crea por sí solo una obligación financiera;
- una factura o documento no prueba por sí solo conformidad de bienes o servicios;
- una obligación puede existir sin estar pagada;
- un pago no borra la compra, recepción, documento ni obligación;
- un hecho económico puede quedar reconocido sin convertirse todavía en asiento contable formal.

---

#### 6. Compromiso de compra frente a hecho económico

`VPROC-0021.PURCHASE_COMMITMENT_FORMALIZED` confirma que la compra autorizada fue emitida y reconocida por el proveedor con alcance, precio, condiciones, fechas y referencias estables.

Su límite canónico se conserva:

```text
COMPROMISO_FORMALIZADO
!= ENTREGA_CONFIRMADA
!= RECEPCION_CONFORME
!= OBLIGACION_RECONOCIDA
!= PAGO
```

NUMERA puede consumir el compromiso para:

- proyección de compromisos;
- presupuesto o disponibilidad financiera cuando otra tarea lo autorice;
- comparación posterior contra recepción, soporte y obligación;
- trazabilidad de condiciones históricas.

No puede convertirlo automáticamente en costo realizado, gasto realizado, inventario recibido u obligación definitiva.

---

#### 7. Semántica de recepción comercial

`VPROC-0022` inicia en `RECEIPT_EXPECTED` y conserva etapas separadas para llegada, revisión física, revisión documental, diferencia, aceptación, ubicación y conciliación económica.

Los estados relevantes significan:

| Estado | Verdad mínima | Límite económico |
| --- | --- | --- |
| `RECEIPT_EXPECTED` | existe una entrega o soporte que justifica recibir | nada ha sido aceptado, ubicado, reconocido ni conciliado |
| `ARRIVAL_REGISTERED` | se identificó llegada, proveedor, documento y momento | llegada no equivale a recepción aceptada |
| `PHYSICAL_CHECK_IN_PROGRESS` | se revisan cantidades, presentación, lote, condición o temperatura | revisión no equivale a aceptación |
| `DOCUMENT_CHECK_IN_PROGRESS` | se comparan orden, factura, remisión, certificados y condiciones | documento revisado no equivale a obligación aprobada |
| `DIFFERENCE_UNDER_REVIEW` | existe discrepancia pendiente | no se fuerza coincidencia ni reconocimiento completo |
| `ACCEPTANCE_PENDING` | la recepción fue verificada y espera decisión | no existe aceptación final todavía |
| `PUTAWAY_PENDING` | los bienes aceptados esperan ingreso y ubicación física en NEXO | confirma aceptación comercial del alcance aplicable, no movimiento físico final |
| `ECONOMIC_RECONCILIATION_PENDING` | se correlacionan recepción, factura, obligación y diferencias | el expediente económico sigue abierto |
| `RECEIPT_RECONCILED` | compra, cantidad, condición, documentos, inventario y efecto económico fueron comparados | cierre comercial de recepción; no equivale a pago |

---

#### 8. Frontera con la recepción física de NEXO

Cuando la compra produzca un efecto de inventario, NEXO conserva `VPROC-0024` como autoridad de ingreso y ubicación.

`VPROC-0024.INBOUND_MOVEMENT_RECONCILED` demuestra que:

- la recepción física ocurrió;
- la ubicación y el movimiento canónico quedaron confirmados;
- el efecto de existencia se aplicó una sola vez o sus diferencias fueron resueltas.

No demuestra por sí solo:

- que ORIGO haya aceptado comercialmente toda la compra;
- que el documento del proveedor sea correcto;
- que NUMERA haya reconocido la obligación;
- que el costo definitivo esté calculado;
- que el proveedor haya sido pagado.

NUMERA utilizará la referencia física cuando aplique, pero nunca fabricará un movimiento de inventario para cuadrar un hecho económico.

---

#### 9. Regla de entrada a NUMERA

NUMERA podrá recibir como candidato económico una afirmación canónica de ORIGO o un conjunto de soportes correlacionados que permita demostrar, como mínimo:

1. sistema y proceso fuente;
2. identidad estable de compra u orden;
3. identidad estable de recepción, aceptación o documento aplicable;
4. proveedor o contraparte;
5. entidad legal;
6. sede y dimensiones autorizadas;
7. moneda;
8. fecha del compromiso y fecha de recepción cuando correspondan;
9. líneas, cantidades y unidades aplicables;
10. importes y componentes conocidos;
11. estado de aceptación comercial;
12. referencia física NEXO cuando el bien produzca inventario;
13. documento o soporte del proveedor cuando exista;
14. evidencia de diferencias, devoluciones o aceptación condicionada;
15. relación con el hecho original cuando sea corrección o compensación.

Una entrada incompleta puede permanecer pendiente de validación, pero no elevarse silenciosamente a hecho económico definitivo.

---

#### 10. Sobre económico mínimo de abastecimiento

El contrato lógico deberá poder representar, cuando aplique:

| Grupo | Campos o referencias mínimas |
| --- | --- |
| identidad | fuente, proceso, orden/compromiso, recepción, evento o versión |
| organización | entidad legal, sede, centro de costo u otras dimensiones autorizadas |
| contraparte | proveedor canónico y referencias aplicables |
| temporal | fecha de orden, ocurrencia/recepción, documento, reconocimiento económico y vencimiento cuando exista |
| monetario | moneda, subtotal, descuentos, impuestos, flete/recargos identificados, total y efecto neto propuesto |
| líneas | producto, presentación o servicio, unidad, cantidad ordenada, aceptada, rechazada y devuelta cuando aplique |
| físico | referencia NEXO, lote, condición o ubicación solo cuando corresponda al hecho físico |
| documental | factura, remisión, nota, certificado, contrato u otra evidencia sin convertirla en fuente única universal |
| diferencias | tipo, cantidad o importe, motivo, estado, responsable y resolución |
| control | estado de validación, clave lógica de deduplicación, conciliación y evidencia |

La implementación física posterior definirá columnas y esquemas. Esta tarea no los inventa.

---

#### 11. Estados que no reconocen por sí solos costo, gasto u obligación

No constituyen reconocimiento económico definitivo por sí solos:

- `VPROC-0021.APPROVED`;
- `VPROC-0021.ORDER_ISSUED`;
- `VPROC-0021.PURCHASE_COMMITMENT_FORMALIZED`;
- `VPROC-0022.RECEIPT_EXPECTED`;
- `VPROC-0022.ARRIVAL_REGISTERED`;
- `VPROC-0022.PHYSICAL_CHECK_IN_PROGRESS`;
- `VPROC-0022.DOCUMENT_CHECK_IN_PROGRESS`;
- `VPROC-0022.ACCEPTANCE_PENDING`;
- `VPROC-0024.INBOUND_MOVEMENT_REQUESTED`;
- `VPROC-0024.IN_EXECUTION`;
- una factura recibida sin validación;
- una coincidencia manual de proveedor e importe;
- una captura visual o archivo agregado.

Pueden servir como evidencia o compromiso, pero el reconocimiento requiere validación dentro de NUMERA.

---

#### 12. Recepción aceptada como candidato económico

Para bienes, `VPROC-0022.PUTAWAY_PENDING` demuestra que el alcance aceptado comercialmente puede continuar hacia ingreso físico en NEXO.

Ese estado puede originar un candidato económico únicamente si:

- la identidad de la orden y recepción es estable;
- las líneas aceptadas están determinadas;
- las cantidades rechazadas o pendientes permanecen separadas;
- el proveedor y entidad son válidos;
- existe soporte suficiente para el tratamiento económico propuesto;
- no existe un candidato equivalente ya reconocido;
- las diferencias materiales tienen destino explícito.

El candidato todavía atraviesa `VPROC-0051`; aceptación comercial no equivale a `POSTED` en NUMERA.

`VPROC-0022.RECEIPT_RECONCILED` constituye evidencia más fuerte de cierre de recepción, pero tampoco representa pago al proveedor.

---

#### 13. Reconocimiento dentro de VPROC-0051

El flujo económico conserva:

```text
ECONOMIC_EVENT_RECEIVED
→ VALIDATION_IN_PROGRESS
→ CLASSIFICATION_PENDING
→ CLASSIFIED
→ POSTING_PENDING
→ POSTED
→ ALLOCATION_PENDING / RECONCILIATION_PENDING cuando aplique
→ ECONOMIC_EVENT_RECONCILED
```

Reglas:

1. `ECONOMIC_EVENT_RECEIVED` confirma recepción del candidato, no reconocimiento;
2. la validación comprueba origen, soporte, entidad, fecha, valor, moneda y duplicidad;
3. la clasificación determina tratamiento y dimensiones sin cambiar ORIGO o NEXO;
4. `POSTED` representa reconocimiento dentro del dominio económico, conservando vínculo con la compra y recepción;
5. una distribución posterior no modifica el hecho fuente;
6. `ECONOMIC_EVENT_RECONCILED` exige correspondencia con soporte, contraparte y proceso de origen;
7. el hecho reconciliado se reconoce una sola vez y no reconstruye la compra ni el movimiento físico.

---

#### 14. Obligación por pagar dentro de VPROC-0052

La obligación por pagar es un objeto financiero independiente del hecho económico y de la recepción.

`VPROC-0052.PAYABLE_REGISTERED` exige como mínimo:

- contraparte;
- soporte;
- concepto;
- importe;
- vencimiento;
- origen verificable.

Después, `DOCUMENT_VALIDATING` verifica factura, recepción, proveedor, obligación, impuestos y duplicidad.

Se preserva:

```text
HECHO_ECONOMICO != OBLIGACION
OBLIGACION != APROBACION_DE_PAGO
APROBACION_DE_PAGO != PROGRAMACION
PROGRAMACION != PAGO
PAGO != CONCILIACION_BANCARIA
```

La definición detallada de cuentas por pagar continúa en `NUMERA-DOM-010`. Esta tarea solo fija qué entradas desde compra y recepción pueden originar o sustentar la obligación.

---

#### 15. Conciliación orden–recepción–soporte

La cadena económica deberá conservar referencias separadas a:

```text
ORDEN / COMPROMISO
        ↕
RECEPCION COMERCIAL
        ↕
MOVIMIENTO FISICO CUANDO APLIQUE
        ↕
DOCUMENTO / SOPORTE DE PROVEEDOR
        ↕
HECHO ECONOMICO
        ↕
OBLIGACION
```

La conciliación compara, no fusiona.

Como mínimo debe permitir detectar:

- orden sin recepción;
- recepción sin orden cuando exista excepción autorizada;
- factura o soporte sin recepción o aceptación aplicable;
- recepción sin documento cuando el documento deba llegar después;
- cantidades distintas;
- precios o condiciones diferentes;
- impuestos o recargos diferentes;
- recepción física sin aceptación comercial;
- aceptación comercial sin movimiento físico cuando el bien lo requiera;
- obligación sin origen;
- doble hecho económico para una misma recepción.

No se inventan tolerancias automáticas en esta tarea.

---

#### 16. Recepciones parciales

Una orden puede producir múltiples recepciones legítimas.

Reglas:

1. cada recepción conserva identidad propia;
2. cada línea conserva cantidad ordenada, recibida acumulada, aceptada, rechazada, devuelta y pendiente cuando aplique;
3. una recepción parcial no cierra automáticamente la orden;
4. NUMERA reconoce únicamente el alcance económico sustentado por cada recepción o soporte aplicable;
5. el acumulado económico no puede exceder silenciosamente el alcance autorizado sin diferencia o revisión;
6. reintentar una recepción parcial no vuelve a sumar cantidades, costo ni obligación;
7. las líneas pendientes conservan destino explícito;
8. el pago parcial o anticipo no convierte la parte pendiente en recibida.

---

#### 17. Diferencias de recepción

`VPROC-0022.DIFFERENCE_UNDER_REVIEW` conserva toda discrepancia antes de una decisión final.

La diferencia puede involucrar:

- faltante;
- sobrante;
- producto o presentación distinta;
- cantidad o unidad inconsistente;
- calidad o condición;
- lote o vencimiento;
- temperatura cuando aplique;
- precio;
- impuesto;
- flete o cargo;
- documento ausente o inconsistente;
- servicio incompleto;
- aceptación condicionada.

NUMERA no ajustará importes para forzar coincidencia. El tratamiento económico deberá usar la resolución autorizada y conservar el valor original, la diferencia y su destino.

---

#### 18. Servicios y compras no inventariables

Una compra de servicio no crea stock ni un movimiento físico ficticio.

Para servicios, el candidato económico puede sustentarse mediante:

- orden o acuerdo aplicable;
- proveedor;
- alcance;
- aceptación del servicio;
- periodo o fecha de prestación;
- documento o soporte;
- evidencia de conformidad;
- importe y moneda;
- diferencias o retenciones cuando correspondan.

La ausencia de `VPROC-0024` es válida cuando el objeto comprado no genera inventario. No se sustituye con un movimiento artificial para satisfacer una conciliación genérica.

---

#### 19. Anticipos y pagos previos a la recepción

Un anticipo o pago previo no implica que el bien o servicio haya sido recibido ni que el costo final deba reconocerse como si la recepción estuviera completa.

Se conserva:

```text
ANTICIPO
!= RECEPCION
!= COSTO_REALIZADO
!= OBLIGACION_LIQUIDADA
```

Cuando exista anticipo:

- se relaciona con la compra o contrato correspondiente;
- conserva importe, moneda, proveedor, fecha y soporte;
- no incrementa inventario;
- no completa recepción;
- debe poder aplicarse posteriormente contra la obligación o tratamiento financiero aplicable;
- cualquier saldo o devolución conserva identidad propia.

El diseño completo de pagos y tesorería se reserva a tareas posteriores de NUMERA.

---

#### 20. Componentes monetarios de adquisición

NUMERA deberá conservar separados, cuando existan y estén sustentados:

- precio de línea;
- descuentos;
- impuestos;
- flete;
- seguros;
- recargos;
- retenciones;
- anticipos aplicados;
- notas o ajustes;
- otros componentes identificados por soporte válido.

Esta tarea no decide qué componente capitaliza, distribuye, se reconoce como gasto, integra landed cost o recibe otro tratamiento contable/fiscal.

La metodología de costo y sus distribuciones pertenece principalmente a `NUMERA-DOM-007` y las fronteras contables/fiscales a `NUMERA-DOM-013` y `NUMERA-DOM-017`.

---

#### 21. Proveedor y contraparte

ORIGO conserva la identidad operativa/comercial del proveedor dentro de su dominio.

NUMERA consume una referencia canónica de contraparte suficiente para:

- hecho económico;
- obligación;
- vencimiento;
- pago;
- conciliación;
- reportes autorizados.

No se crea un proveedor paralelo por descripción libre.

Si la identidad de proveedor es ambigua, duplicada, inactiva o incompatible con el soporte, el caso permanece pendiente de resolución y no se reconoce por coincidencia nominal.

---

#### 22. Fechas y periodos

Se conservan por separado cuando apliquen:

```text
FECHA_DE_NECESIDAD
FECHA_DE_APROBACION
FECHA_DE_ORDEN
FECHA_DE_COMPROMISO
FECHA_DE_LLEGADA
FECHA_DE_RECEPCION
FECHA_DE_ACEPTACION
FECHA_DE_DOCUMENTO
FECHA_DE_RECONOCIMIENTO_ECONOMICO
FECHA_DE_VENCIMIENTO
FECHA_DE_PAGO
FECHA_DE_CONCILIACION
```

Ninguna se deriva silenciosamente de otra.

El periodo operativo, económico, contable y fiscal no se asumen equivalentes. La política detallada de cierres y reapertura continúa en `NUMERA-DOM-011`.

---

#### 23. Moneda y valoración

Toda entrada conserva la moneda de la transacción y los importes originales del compromiso y soporte aplicables.

Si se requiere una equivalencia en otra moneda:

- la conversión debe conservar fuente, fecha y versión del criterio utilizado;
- el importe original no se sobrescribe;
- una diferencia cambiaria no se mezcla con diferencia de cantidad o precio;
- esta tarea no inventa proveedor de tasa, momento de conversión ni política contable.

El tratamiento detallado queda para reglas financieras y contables posteriores.

---

#### 24. Devoluciones, notas y compensaciones

Una devolución posterior a una recepción aceptada no elimina la recepción original.

Debe conservarse:

```text
HECHO_ORIGINAL
        ↓
ACCION_CORRECTIVA_AUTORIZADA
        ↓
EFECTO_FISICO_INVERSO CUANDO APLIQUE
        ↓
NOTA / CREDITO / AJUSTE CUANDO APLIQUE
        ↓
EFECTO_ECONOMICO_COMPENSATORIO
        ↓
RECONCILIACION
```

Reglas:

- NEXO conserva el retorno físico;
- ORIGO conserva la decisión comercial de devolución/reclamación;
- NUMERA conserva el efecto económico compensatorio;
- un documento de crédito no borra la factura o recepción original;
- una compensación siempre referencia el hecho original;
- reintentos no duplican devolución, costo inverso ni ajuste de obligación.

---

#### 25. Idempotencia, duplicados y replay

La clave económica lógica deberá impedir que una misma operación de abastecimiento produzca varias veces:

- recepción económica;
- costo;
- gasto;
- obligación;
- ajuste;
- devolución;
- conciliación equivalente.

La identidad deberá considerar las referencias canónicas disponibles, como fuente, proceso, evento, orden, recepción, línea, documento y versión según corresponda.

Reglas:

1. replay conserva la identidad histórica;
2. respuesta perdida no autoriza crear otra recepción;
3. reimpresión de documento no crea otro hecho;
4. una recepción visible en ORIGO y NEXO no son dos recepciones económicas;
5. una factura reenviada no crea otra obligación;
6. un evento fuera de orden puede quedar pendiente, no aplicarse ciegamente;
7. un duplicado demostrado conserva evidencia de detección y no genera efecto adicional.

---

#### 26. Prohibición de gasto manual competidor

Una compra o recepción ya correlacionada desde ORIGO no debe duplicarse en NUMERA mediante un gasto manual creado solo por descripción, proveedor e importe.

Antes de aceptar un registro manual económicamente equivalente, el sistema objetivo deberá poder verificar si existe:

- orden relacionada;
- recepción ORIGO;
- entrada NEXO cuando aplique;
- documento de proveedor;
- hecho económico previo;
- obligación previa.

Si existe posible coincidencia, el registro queda pendiente de matching o excepción autorizada.

El flujo general de gastos y soportes se define en `NUMERA-DOM-005`; esta tarea fija la incompatibilidad con una fuente ORIGO ya existente.

---

#### 27. Casos que permanecen pendientes o en diferencia

No se reconocerán automáticamente como hechos definitivos los casos con:

- proveedor no resoluble;
- orden inexistente cuando debería existir;
- recepción no aceptada;
- cantidades incompatibles sin resolución;
- servicio sin evidencia de aceptación;
- documento duplicado;
- documento sin origen correlacionable;
- importe o moneda incompatibles;
- impuesto o cargo material sin resolución;
- recepción física duplicada o ambigua;
- devolución pendiente de efecto físico o documental;
- obligación potencialmente duplicada;
- eventos fuera de orden que puedan cambiar el resultado;
- conflicto entre ORIGO, NEXO y soporte económico.

Cada pendiente conserva causa, propietario de resolución, evidencia y relación con el origen.

---

#### 28. Matriz de propiedad y escritura

| Objeto o decisión | Propietario | Consumidores | Escritura cruzada prohibida |
| --- | --- | --- | --- |
| necesidad de compra | ORIGO | NUMERA/otros según contrato | sí |
| evaluación/proveedor seleccionado | ORIGO | NUMERA cuando requiera referencia | sí |
| orden y compromiso de compra | ORIGO | NEXO, NUMERA, FOGO cuando corresponda | sí |
| recepción y aceptación comercial | ORIGO | NEXO, NUMERA | sí |
| movimiento, ubicación y existencia | NEXO | ORIGO, NUMERA, FOGO | sí |
| documento externo | autoridad/proveedor aplicable con referencia interna | ORIGO, NUMERA | sí |
| hecho económico | NUMERA | VISO/reportes/consumidores autorizados | sí |
| obligación por pagar | NUMERA | tesorería/reportes autorizados | sí |
| pago y conciliación bancaria | NUMERA con proveedor financiero externo según la ejecución | ORIGO/gerencia según proyección | sí |

Una consumidora puede solicitar, correlacionar o reaccionar; no modifica directamente el hecho propietario ajeno.

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

La cobertura vigente ya protege identidad y trazabilidad económica, recepción idempotente, propiedad ORIGO/NEXO/NUMERA, obligaciones separadas, servicios sin stock ficticio y conciliación de compra–recepción–obligación.

---

#### 30. Cobertura de prueba vigente reutilizada

Esta sección documenta cobertura existente y no constituye una actualización del Registro 04A.

Cobertura principal reutilizada:

- `TREQ-NUMERA-001` — reconciliación con hechos y documentos fuente, no duplicación manual, historia y trazabilidad;
- `TREQ-NUMERA-002` — identidad estable, entidad, dimensiones, contraparte, moneda, fechas, fuente, correlación, documento, importe, impuesto, estado y correcciones no destructivas;
- `TREQ-NUMERA-003` — separación de obligación, aprobación, pago, bancos, tesorería y conciliación;
- `TREQ-ORIGO-001` — modalidad de recepción visible y auditable sin duplicar cantidades, costos u orden recibida;
- `TREQ-ORIGO-003` — recepción empresarial atómica/idempotente, durable y reconciliable, sin volver a sumar inventario, costo o cantidades;
- `TREQ-ORIGO-004` — separación de necesidad, selección, aprobación, orden y revisión con segregación y cambios no destructivos;
- `TREQ-ORIGO-005` — identidad estable de proveedor, condiciones comerciales versionadas y evidencia histórica;
- `TREQ-INTEGRATION-010` — correlación única ORIGO → recepción → NEXO → NUMERA, incluyendo parcialidad, servicios, devoluciones e idempotencia;
- `TREQ-INTEGRATION-011` — efecto físico exactamente una vez hacia NEXO y conciliación de eventos sin efecto o efectos sin evento;
- `TREQ-INTEGRATION-003` y `TREQ-INTEGRATION-006` — identidad/idempotencia transversal y fuente empresarial única sin doble digitación competidora.

No se entrega una actualización 04A porque ninguna regla protegida cambia de contenido ni de estado.

---

#### 31. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | esta tarea es documental y no ejecuta build de producto; la incorporación deberá validarse con el tooling documental vigente |
| LOCAL | NOT_EXECUTED | el reemplazo, formato, quality, delivery, topología, plan y TREQ deberán ejecutarse en el checkout del usuario cuando `NUMERA-DOM-002` haya cerrado y habilitado continuidad |
| REMOTA | PASS | se verificaron `vento-shell/main`, `NUMERA-DOM-001` publicado, el marcador `NUMERA-DOM-003`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0021`, `VPROC-0022`, `VPROC-0024`, `VPROC-0051`, `VPROC-0052`, contratos `INT-PROC-001..005`, Registro 04A y validadores documentales vigentes; `NUMERA-DOM-002` se consume desde su versión completa aprobada |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron compras, recepciones, entradas de inventario, obligaciones, pagos, devoluciones ni conciliaciones reales |
| FÍSICA | NOT_APPLICABLE | `NUMERA-DOM-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia |

---

#### 32. Criterios de aceptación

La tarea queda aceptable cuando:

1. ORIGO permanece propietario de compra y recepción comercial;
2. NEXO permanece propietario de ingreso, ubicación, custodia y existencia física;
3. NUMERA permanece propietario del hecho económico y obligación financiera;
4. necesidad, orden, recepción, inventario, documento, hecho, obligación y pago permanecen identidades distintas;
5. `PURCHASE_COMMITMENT_FORMALIZED` no se interpreta como recepción u obligación definitiva;
6. llegada o revisión documental no se interpretan como recepción aceptada;
7. `PUTAWAY_PENDING` se usa solo como evidencia de bienes aceptados que esperan ingreso físico;
8. `INBOUND_MOVEMENT_RECONCILED` confirma efecto físico, no aceptación comercial o económica ajena;
9. todo candidato económico atraviesa validación de `VPROC-0051` antes de reconocimiento;
10. la obligación usa `VPROC-0052` y conserva soporte, contraparte, concepto, importe, vencimiento y origen;
11. orden, recepción, soporte, movimiento físico, hecho y obligación son conciliables entre sí;
12. recepciones parciales no cierran automáticamente orden u obligación;
13. servicios pueden reconocerse con aceptación/evidencia sin inventario ficticio;
14. anticipos no se tratan como recepción o costo realizado;
15. diferencias no se corrigen alterando cantidades o importes de origen;
16. proveedor se referencia desde identidad canónica y no por descripción paralela;
17. fechas de orden, recepción, documento, reconocimiento, vencimiento y pago permanecen separadas;
18. moneda e importes originales no se sobrescriben por conversiones posteriores;
19. devoluciones y notas generan efectos correlacionados sin borrar originales;
20. replay, reintento, reimpresión o doble visibilidad ORIGO/NEXO no duplican efecto económico;
21. un gasto manual no compite silenciosamente con una compra/recepción ORIGO ya correlacionada;
22. casos ambiguos permanecen pendientes o en diferencia con propietario de salida;
23. no se crean ni modifican requisitos de prueba;
24. no se realizan cambios físicos;
25. la continuidad reserva `NUMERA-DOM-004`.

---

#### 33. Límites

Esta tarea no:

- implementa eventos, consumidoras, colas, outbox, inbox o adaptadores;
- crea tablas, columnas, índices, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase;
- modifica ORIGO, NEXO o NUMERA;
- define umbrales de aprobación, tolerancias de matching o materialidad;
- ejecuta compras, recepciones, movimientos de inventario, devoluciones, obligaciones o pagos;
- define el maestro de proveedores completo;
- define costos estándar, reales, landed cost o reglas de distribución;
- define el flujo general de gastos;
- define las cuentas por pagar completas;
- define bancos o tesorería;
- define política tributaria o contable profesional;
- define plan de cuentas, comprobantes ni asientos formales;
- fuerza una recepción física para servicios;
- modifica el Registro 04A;
- desarrolla `NUMERA-DOM-004`.

---

#### 34. Handoff a NUMERA-DOM-004

`NUMERA-DOM-004` recibe estas fronteras cerradas:

1. la fuente operativa conserva propiedad y NUMERA consume efectos económicos;
2. reconocimiento económico nunca fabrica un hecho físico;
3. ORIGO gobierna compra y recepción comercial;
4. NEXO gobierna ingreso, ubicación, movimiento y existencia;
5. una referencia física puede sustentar un hecho económico sin fusionarse con él;
6. recepción, documento, costo, obligación y pago permanecen separados;
7. toda entrada económica conserva identidad, fuente, correlación, moneda, fechas, importe, evidencia e idempotencia;
8. correcciones, devoluciones y compensaciones preservan el original;
9. un registro manual no debe competir con una fuente propietaria existente;
10. las diferencias permanecen explícitas hasta conciliación.

La siguiente tarea deberá aplicar estas reglas a producción e inventario, preservando a FOGO como propietario del hecho productivo y a NEXO como propietario del movimiento físico.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario`
### ✅ NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción
**Tarea siguiente:** NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación
**Tipo de tarea:** definición documental del contrato económico de entrada desde producción e inventario hacia NUMERA, delimitando autoridad de FOGO y NEXO, hechos elegibles, consumo, salida, rendimiento, merma, reproceso, calidad, movimientos, ajustes, transferencias internas, correlación, idempotencia, conciliación y fronteras frente a costeo, gasto, venta, contabilidad formal y fiscalidad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica FOGO, NEXO, NUMERA, Supabase, contratos runtime, recetas, planes, lotes, inventario, movimientos, costos, gastos, transferencias, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué hechos provenientes de producción e inventario pueden ingresar a NUMERA como candidatos de efecto económico, qué fuentes deben conservarse, cuándo esos hechos pueden reconocerse, cómo se evita duplicar valor entre FOGO y NEXO y cómo deben tratarse consumo, producto terminado, rendimiento, merma, reproceso, calidad, movimientos, ajustes y transferencias internas sin reconstruir ni modificar la verdad operativa.

La tarea desarrolla la frontera aprobada por `NUMERA-DOM-001` y consume los handoffs de `NUMERA-DOM-002` y `NUMERA-DOM-003` para que NUMERA:

- consuma la verdad productiva sin convertirse en FOGO;
- consuma la verdad física sin convertirse en NEXO;
- diferencie plan, orden, consumo, salida, calidad, movimiento, hecho económico, costo calculado y asiento contable;
- reconcilie FOGO y NEXO sin sumar dos veces el mismo efecto;
- preserve genealogía de lote, cantidades, unidades, fuentes, ubicaciones y evidencia;
- represente merma, reproceso, pérdida, ajuste y transferencia interna mediante efectos trazables y no mediante ediciones destructivas;
- entregue entradas confiables al ciclo de costos sin definir todavía el método numérico de costeo.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-004` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define un contrato documental reutilizable;
- no crea una instancia física propia;
- no publica eventos;
- no ejecuta movimientos ni cierres productivos;
- no crea tablas, vistas, funciones, RPC, RLS, triggers ni migraciones;
- no modifica cantidades, lotes, costos o saldos reales;
- no cambia la propiedad entre FOGO, NEXO y NUMERA;
- no define las fórmulas numéricas de costo, distribución o rentabilidad reservadas a tareas posteriores.

---

#### 3. Handoff recibido de NUMERA-DOM-003

`NUMERA-DOM-003` entrega estas fronteras para toda entrada económica proveniente de hechos operativos:

```text
FUENTE_OPERATIVA_CONSERVA_PROPIEDAD = SI
RECONOCIMIENTO_ECONOMICO_NO_FABRICA_HECHO_FISICO = SI
HECHO_FISICO != HECHO_ECONOMICO
DOCUMENTO_O_SOPORTE != HECHO_ORIGEN
REINTENTO_NO_DUPLICA_EFECTO = SI
CORRECCION_DESTRUCTIVA = PROHIBIDA
DIFERENCIA_PERSISTE_HASTA_CONCILIACION = SI
REGISTRO_MANUAL_COMPETIDOR = PROHIBIDO
```

Además, todo hecho económico conserva identidad, fuente, correlación, entidad, dimensiones autorizadas, fechas, moneda cuando aplique, importe o base de valoración cuando exista, evidencia, estado e historia suficiente para conciliación.

La presente tarea aplica esas reglas a producción e inventario sin reutilizar semánticas de compra o venta que no correspondan.

---

#### 4. Dominios y procesos fuente

La propiedad funcional se conserva así:

| Proceso o dominio | Propietario | Verdad que conserva | Regla para NUMERA |
| --- | --- | --- | --- |
| `VPROC-0033` | FOGO | plan productivo, versión, demanda, capacidad, restricciones y publicación | aporta contexto y compromiso productivo; no demuestra producción realizada |
| `VPROC-0034` | FOGO | ejecución, materiales, cantidades, salida, rendimiento, merma y desviaciones | aporta verdad productiva de ejecución; no produce por sí sola movimiento de inventario |
| `VPROC-0035` | FOGO | inspección y disposición de calidad | determina liberación, retención, rechazo o reproceso; no crea por sí sola valor físico en inventario |
| `VPROC-0036` | FOGO | empaque, etiqueta, presentación y salida empacada | aporta trazabilidad de terminado; no sustituye ingreso físico NEXO |
| `VPROC-0037` | FOGO | cierre productivo, rendimiento, merma, reproceso y pendientes | aporta conciliación final del lote y sus resultados productivos |
| `VPROC-0024` | NEXO | ingreso, ubicación y reubicación física | confirma entrada y ubicación mediante movimiento canónico |
| `VPROC-0025` | NEXO | retiro, consumo o traslado de existencias | confirma el efecto físico de salida, consumo o traslado exactamente una vez |
| `VPROC-0026` | NEXO | conteo, diferencia, investigación y ajuste autorizado | separa observación de ajuste económico/físico posterior |
| `VPROC-0027` | NEXO | condición, cuarentena, pérdida, merma física y disposición | aporta efecto físico solo después de decisión y ejecución autorizadas |
| `VPROC-0028` | NEXO | abastecimiento interno entre origen y destino | conserva cantidades y custodia sin convertir el flujo en compra o venta |
| `VPROC-0051` | NUMERA | recepción, validación, clasificación, reconocimiento y conciliación del hecho económico | gobierna el hecho económico derivado |
| `VPROC-0054` | NUMERA | ciclo de costos, distribución, presupuesto, cierre y rentabilidad | consume entradas reconciliadas; el método detallado se define en tareas posteriores |

FOGO conserva la verdad productiva. NEXO conserva la verdad física. NUMERA conserva el efecto económico y las derivaciones financieras autorizadas.

---

#### 5. Separación de identidades

Se conserva obligatoriamente:

```text
PLAN_PRODUCTIVO
!= ORDEN_PRODUCTIVA
!= RESERVA_DE_MATERIAL
!= CONSUMO_PRODUCTIVO
!= MOVIMIENTO_DE_INVENTARIO
!= SALIDA_PRODUCTIVA
!= DISPOSICION_DE_CALIDAD
!= PRODUCTO_EMPACADO
!= INGRESO_DE_PRODUCTO_TERMINADO
!= CIERRE_PRODUCTIVO
!= HECHO_ECONOMICO
!= COSTO_CALCULADO
!= TRANSFERENCIA_INTERNA
!= GASTO
!= VENTA
!= ASIENTO_CONTABLE
```

Consecuencias:

- un plan liberado no demuestra producción ejecutada;
- una reserva no demuestra consumo;
- una cantidad usada en FOGO no sustituye el movimiento NEXO;
- un movimiento NEXO no sustituye el cierre productivo FOGO;
- una salida reportada no prueba liberación de calidad;
- una liberación de calidad no prueba ingreso físico;
- un ingreso de producto terminado no constituye una venta;
- un cierre productivo no define por sí solo el método de costo;
- una transferencia interna no es automáticamente ingreso ni gasto legal.

---

#### 6. Planificación productiva y efecto económico

`VPROC-0033.PRODUCTION_PLAN_RELEASED` confirma una versión aprobada y publicada del plan con restricciones, prioridades y pendientes visibles.

Su límite canónico permanece:

```text
PLAN_LIBERADO
!= PRODUCCION_REALIZADA
!= CONSUMO_REAL
!= PRODUCTO_TERMINADO
!= COSTO_REALIZADO
```

NUMERA puede consumir el plan como referencia para presupuesto, forecast, capacidad o comparación cuando otras tareas lo autoricen, pero no reconocerá consumo, costo real, inventario terminado o merma a partir del plan por sí solo.

Las cantidades planeadas se conservan como expectativa y nunca sustituyen cantidades reales reconciliadas.

---

#### 7. Ejecución productiva y consumo

`VPROC-0034` conserva la ejecución productiva contra una orden y versión aprobadas.

Durante `IN_PRODUCTION`, FOGO captura pasos, consumos, tiempos y desviaciones. Sin embargo:

```text
USO_CAPTURADO_EN_FOGO
!= MOVIMIENTO_FISICO_NEXO
```

El efecto económico de consumo solo puede quedar reconocido de forma definitiva cuando la evidencia productiva y el efecto físico autoritativo sean correlacionables y no competidores.

Para materiales inventariables, NUMERA debe poder vincular al menos:

- orden y lote productivo;
- receta y versión aplicadas;
- material y unidad;
- cantidad productiva observada;
- reserva o referencia previa cuando exista;
- movimiento NEXO que produjo el efecto físico;
- fuente física, lote, LPN o ubicación cuando apliquen;
- fecha de ocurrencia y fecha económica;
- diferencia o excepción pendiente cuando exista.

Una misma unidad consumida no podrá originar un costo por el registro FOGO y otro costo independiente por el movimiento NEXO.

---

#### 8. Regla de una sola identidad económica para consumo

Cuando FOGO y NEXO describan dos perspectivas del mismo consumo:

```text
FOGO = VERDAD_PRODUCTIVA_DEL_USO
NEXO = VERDAD_FISICA_DEL_MOVIMIENTO
NUMERA = UN_SOLO_EFECTO_ECONOMICO_CORRELACIONADO
```

NUMERA no sumará ambos orígenes como dos consumos.

La identidad económica deberá permitir demostrar:

- qué ejecución productiva utilizó el material;
- qué movimiento físico confirmó la salida o consumo;
- qué cantidad y unidad quedaron reconciliadas;
- qué diferencia permanece abierta;
- qué valor o regla de valoración se aplicará cuando el método de costo correspondiente exista.

---

#### 9. Salida productiva y producto terminado

`VPROC-0034.OUTPUT_REPORTED` registra salida, rendimiento y merma sin liberación de calidad.

Por tanto:

```text
OUTPUT_REPORTED
!= PRODUCTO_LIBERADO
!= INVENTARIO_INGRESADO
!= COSTO_TERMINADO_DEFINITIVO
```

`VPROC-0034.PRODUCTION_EXECUTION_COMPLETED` confirma que la ejecución terminó operativamente y fue entregada a calidad. Tampoco crea por sí sola una existencia terminada disponible.

NUMERA puede recibir un candidato o una referencia pendiente para conciliación, pero el reconocimiento de un efecto de producto terminado deberá respetar calidad, movimiento físico y cierre aplicables.

---

#### 10. Calidad y clasificación económica

`VPROC-0035` mantiene separados:

- inspección;
- resultados;
- revisión técnica;
- decisión de disposición;
- ejecución de la disposición;
- verificación final.

La decisión de liberar, retener, rechazar o reprocesar afecta la interpretación económica del resultado, pero no permite a NUMERA modificar el lote o inventario.

Reglas:

1. producto todavía en inspección no se clasifica como terminado disponible;
2. producto retenido no se trata como disponible por cierre administrativo;
3. rechazo no borra consumo o producción ya ocurridos;
4. reproceso conserva genealogía y efectos previos;
5. el efecto económico de una disposición se apoya en movimientos y evidencias ejecutadas, no solo en una intención de calidad.

---

#### 11. Empaque y almacenamiento

`VPROC-0036.PACKAGED_OUTPUT_RECORDED` identifica salida empacada, pero todavía espera transferencia a almacenamiento.

`VPROC-0036.STORAGE_TRANSFER_PENDING` demuestra precisamente que el producto aún requiere ubicación, custodia y movimiento de inventario.

NUMERA conservará la separación entre:

```text
PRODUCTO_EMPACADO
!= MOVIMIENTO_DE_ENTRADA
!= EXISTENCIA_RECONCILIADA
```

Materiales de empaque consumidos mantienen su propio efecto físico y económico correlacionado; no se vuelven a consumir por el mero hecho de cerrar el ciclo de empaque.

---

#### 12. Ingreso físico de producto terminado

El ingreso físico corresponde a NEXO mediante `VPROC-0024` u otro proceso propietario aplicable.

El estado final `INBOUND_MOVEMENT_RECONCILED` confirma que recepción física, ubicación, movimiento canónico y proyecciones coinciden o tienen diferencias resueltas.

Su límite se conserva:

```text
INGRESO_FISICO_RECONCILIADO
!= CIERRE_PRODUCTIVO_FOGO
!= METODO_DE_COSTO_NUMERA
```

Para un producto terminado, NUMERA deberá correlacionar el ingreso físico con lote, salida productiva, disposición de calidad y contexto productivo suficientes antes de tratarlo como entrada económica de inventario terminado.

---

#### 13. Cierre productivo

`VPROC-0037.PRODUCTION_CLOSEOUT_APPROVED` exige que consumos, salida, merma, reproceso, rendimiento, movimientos y pendientes hayan sido conciliados antes del cierre.

El cierre productivo funciona como evidencia fuerte para reconciliar la visión económica del lote, pero no reemplaza:

- movimientos NEXO;
- reglas de valoración;
- distribuciones de costo;
- cierre contable;
- publicación financiera.

NUMERA utilizará el cierre para verificar que el conjunto económico del lote explica, como mínimo, sus entradas, consumos, salidas, merma, reproceso y movimientos relacionados.

---

#### 14. Rendimiento y merma

Rendimiento y merma deben conservar por separado:

- cantidad esperada;
- cantidad real;
- unidad;
- lote;
- versión de receta;
- motivo o clasificación cuando corresponda;
- actor y momento;
- movimiento físico asociado si produce efecto sobre inventario;
- tratamiento económico posterior.

La merma no se duplicará como:

```text
CONSUMO_TOTAL
+
SEGUNDO_CONSUMO_POR_MERMA
```

si la cantidad ya forma parte del mismo movimiento físico.

La clasificación de merma puede afectar análisis económico posterior, pero el método de valoración y su fórmula quedan reservados a `NUMERA-DOM-007`.

---

#### 15. Reproceso y aprovechamiento

Un reproceso conserva genealogía con el lote o resultado que lo originó.

Reglas económicas:

1. no se elimina el costo o efecto original por iniciar reproceso;
2. nuevos consumos producen efectos adicionales solo cuando existan hechos físicos nuevos;
3. cantidades recuperadas o aprovechadas conservan referencia al origen;
4. una reclasificación no duplica cantidades ni valor por cambiar de estado;
5. el cierre debe explicar qué valor permanece en proceso, qué pasó a terminado, qué fue aprovechado y qué quedó como pérdida o pendiente.

La distribución numérica entre esas categorías queda reservada al modelo de costo posterior.

---

#### 16. Conteos y ajustes de inventario

`VPROC-0026` separa observación, diferencia, investigación, decisión y movimiento compensatorio.

Por tanto:

```text
DIFERENCIA_DE_CONTEO
!= AJUSTE_APROBADO
!= EFECTO_ECONOMICO_RECONOCIDO
```

NUMERA no reconocerá ganancia, pérdida o ajuste económico por la sola existencia de una diferencia capturada.

Un candidato económico de ajuste requiere, como mínimo cuando aplique:

- conteo y corte identificables;
- diferencia investigada;
- decisión autorizada;
- movimiento compensatorio correlacionado;
- cantidad y unidad finales explicables;
- causa y evidencia;
- ausencia de otro efecto económico para la misma corrección.

---

#### 17. Condición, cuarentena, pérdida y disposición

`VPROC-0027.CONDITION_EVENT_DETECTED` no libera, descarta ni ajusta automáticamente una existencia.

Por tanto:

- una alerta no es una pérdida económica definitiva;
- una cuarentena no equivale a baja;
- una recomendación no equivale a disposición ejecutada;
- un producto vencido o no conforme requiere el tratamiento propietario aplicable;
- una pérdida o disposición económica se reconoce únicamente desde hechos suficientemente autorizados y ejecutados.

El cierre `CONDITION_CASE_RESOLVED` conserva lote, costo, condición y evidencia, y no elimina la historia.

---

#### 18. Abastecimiento y transferencias internas

`VPROC-0028.REPLENISHMENT_RECONCILED` cierra un abastecimiento interno entre origen y destino y declara expresamente que el flujo no se convierte por ello en venta o compra.

NUMERA deberá conservar:

```text
TRANSFERENCIA_INTERNA
!= VENTA_EXTERNA
!= COMPRA_EXTERNA
!= INGRESO_LEGAL_AUTOMATICO
!= GASTO_LEGAL_AUTOMATICO
```

La transferencia podrá producir una representación económica interna para gestión, responsabilidad, costeo o conciliación, siempre vinculada al movimiento físico y a las dimensiones de origen y destino.

Una misma transferencia no genera costo nuevo por cada pierna documental del flujo. La base y método de valoración se definen en `NUMERA-DOM-007` y las reglas de centros en `NUMERA-DOM-006`.

---

#### 19. Traslados físicos sin cambio económico externo

Un traslado de existencias entre ubicaciones puede cambiar:

- sede;
- LOC;
- custodio;
- centro o dimensión económica aplicable cuando exista una regla autorizada;
- responsabilidad de gestión.

No implica por sí solo:

- compra;
- venta;
- ingreso externo;
- gasto externo;
- creación de una nueva cantidad física.

NUMERA reconocerá únicamente el efecto económico que corresponda al contrato vigente, sin duplicar el valor por salida y entrada de la misma unidad dentro de la misma transferencia.

---

#### 20. Hechos elegibles para NUMERA

Pueden originar o completar un candidato económico, según contexto y evidencia:

| Familia | Evidencia operativa principal | Tratamiento económico objetivo |
| --- | --- | --- |
| consumo productivo | ejecución FOGO + movimiento NEXO reconciliado | consumo económico correlacionado una sola vez |
| producto terminado | salida productiva + calidad + ingreso físico aplicables | entrada económica de terminado sin convertirla en venta |
| merma o desperdicio | clasificación FOGO + efecto físico aplicable | pérdida, variación o componente de costo según regla posterior |
| reproceso | genealogía FOGO + nuevos movimientos aplicables | efecto incremental o reclasificación correlacionada |
| ajuste de inventario | decisión de ajuste + movimiento compensatorio NEXO | ajuste económico sin editar el saldo histórico |
| pérdida o disposición | caso de condición + acción física autorizada | efecto económico de pérdida/disposición cuando corresponda |
| transferencia interna | movimiento origen→destino conciliado | efecto interno de gestión/valoración sin venta o compra automática |
| costo logístico o de mantenimiento asociado | proceso propietario y soporte aplicable | entrada separada; no se incrusta por inferencia en consumo productivo |

La tabla no define fórmulas ni importes definitivos; define la elegibilidad y la identidad de las fuentes.

---

#### 21. Señales que no bastan para reconocimiento

No constituyen por sí solas un hecho económico reconocido:

- plan productivo;
- necesidad de producir;
- reserva de material;
- cantidad teórica de receta;
- inicio de producción;
- salida reportada antes de calidad;
- recomendación de disposición;
- producto empacado antes de movimiento físico aplicable;
- diferencia de conteo sin decisión;
- cuarentena sin disposición;
- solicitud de traslado;
- movimiento pendiente de posting;
- dashboard o agregado;
- cálculo provisional no publicado.

Pueden conservarse como evidencia, expectativa o candidato pendiente, pero no como realidad económica definitiva.

---

#### 22. Contrato de entrada a VPROC-0051

Todo candidato proveniente de producción o inventario entra por `VPROC-0051.ECONOMIC_EVENT_RECEIVED` únicamente cuando exista un evento canónico o soporte correlacionable con origen, entidad, fecha y dimensión económica mínima.

Recibir el candidato mantiene la invariante:

```text
RECIBIR
!= RECONOCER
!= CONTABILIZAR
!= DISTRIBUIR
!= CERRAR
```

`VALIDATION_IN_PROGRESS` deberá poder verificar, según aplique:

- proceso y aplicación propietaria;
- identificador de ejecución, lote o movimiento;
- entidad legal;
- sede y dimensiones autorizadas;
- producto o material;
- cantidad y unidad;
- fecha operativa;
- fecha económica;
- fuente y correlación;
- evidencia física/productiva;
- moneda y valor cuando ya existan legítimamente;
- duplicidad;
- estado de diferencias o conciliación.

---

#### 23. Reconocimiento económico sin cálculo prematuro

Esta tarea define **cuándo existe un hecho económico elegible**, no cuánto vale finalmente bajo cada método.

Por tanto:

- NUMERA puede registrar la identidad y relación del hecho aunque el cálculo de costo definitivo esté pendiente;
- el estado económico podrá conservar una condición pendiente de valoración, clasificación o conciliación;
- no se fabricará un costo numérico usando precio de lista, estándar, promedio, último o supuesto sin la regla correspondiente;
- no se sobrescribirá un valor histórico cuando una regla posterior calcule una nueva versión;
- el método, entradas, versión y vigencia del costo quedan gobernados por `NUMERA-DOM-007` y `VPROC-0054`.

---

#### 24. Relación con VPROC-0054

`VPROC-0054.INPUTS_COLLECTING` reúne movimientos, compras, producción, ventas, inventario y reglas del periodo.

`NUMERA-DOM-004` define las entradas productivas y físicas que pueden llegar a esa recopilación sin duplicación.

No define todavía:

- costo estándar;
- promedio;
- último costo;
- costo real;
- landed cost;
- drivers de distribución;
- pools;
- fórmulas de margen;
- punto de equilibrio;
- reglas de publicación.

Esas decisiones permanecen en `NUMERA-DOM-006` a `NUMERA-DOM-008`, con desarrollo principal del cálculo en `NUMERA-DOM-007`.

---

#### 25. Idempotencia y correlación

Cada efecto económico debe derivarse de identidades estables y permitir replay sin doble reconocimiento.

Como mínimo debe distinguir:

```text
source_application
source_process
source_instance
source_event_or_operation
line_or_component_when_applicable
version_or_revision
business_correlation
```

Reglas:

1. misma identidad y misma huella recuperan el resultado previo;
2. misma identidad con contenido incompatible produce conflicto;
3. respuesta perdida no autoriza repetir el efecto a ciegas;
4. eventos fuera de orden no adelantan reconocimiento;
5. FOGO y NEXO pueden aportar evidencia al mismo efecto sin convertirse en dos hechos económicos;
6. backfill o replay conservan el origen histórico;
7. una corrección genera una acción vinculada, no una reescritura silenciosa.

---

#### 26. Cantidades, unidades y conversiones

NUMERA no recalcula la verdad física por conveniencia financiera.

Las cantidades económicas deberán poder reconciliarse con:

- cantidad productiva;
- cantidad física;
- unidad canónica;
- factor de conversión vigente cuando aplique;
- lote o fuente física;
- presentación;
- diferencia explícita si FOGO y NEXO todavía no coinciden.

Una conversión financiera no modifica el movimiento de inventario ni la captura productiva original.

---

#### 27. Dimensiones económicas

El hecho económico deberá referenciar identidades canónicas cuando apliquen:

- entidad legal;
- marca o unidad;
- sede;
- centro de costo;
- área productiva;
- producto o presentación;
- orden productiva;
- lote;
- ubicación origen y destino;
- periodo;
- moneda cuando exista importe;
- contraparte únicamente cuando realmente corresponda.

No se infiere entidad legal desde sede, sede desde centro de costo ni centro de costo desde instalación física.

---

#### 28. Fechas y periodos

Se conservan separadas, cuando apliquen:

```text
FECHA_PLAN
FECHA_EJECUCION
FECHA_MOVIMIENTO_FISICO
FECHA_CALIDAD
FECHA_CIERRE_PRODUCTIVO
FECHA_RECONOCIMIENTO_ECONOMICO
FECHA_CONTABLE
```

La fecha de cierre productivo no reemplaza automáticamente la fecha real del consumo o movimiento físico.

El periodo económico se determina por reglas posteriores sin alterar timestamps operativos históricos.

---

#### 29. Correcciones, reversos y compensaciones

Una corrección posterior conserva el original.

Casos típicos:

- consumo registrado con cantidad equivocada;
- movimiento físico compensatorio;
- reclasificación de merma;
- retorno de material;
- ajuste por conteo;
- disposición de calidad posterior;
- reproceso;
- reversión de transferencia interna.

NUMERA deberá vincular el nuevo efecto al anterior y conservar antes, después, motivo, autoridad, fecha y evidencia.

No se permite editar retrospectivamente la producción, el movimiento o el hecho económico para simular que el evento original nunca existió.

---

#### 30. Diferencias y pendientes

Cuando FOGO, NEXO y NUMERA no concilien, el caso permanece explícitamente pendiente.

Ejemplos:

- FOGO declara consumo sin movimiento NEXO correlacionado;
- NEXO registra movimiento sin ejecución productiva válida;
- salida productiva sin calidad resuelta;
- terminado liberado sin ingreso físico;
- movimiento físico con cantidad distinta a la productiva;
- merma sin causa o disposición suficiente;
- transferencia con recepción destino pendiente;
- ajuste económico sin movimiento compensatorio.

Ninguna diferencia se resuelve inventando un valor, copiando el saldo del otro sistema o editando el hecho fuente.

---

#### 31. Responsabilidades reservadas a tareas posteriores

| Decisión | Tarea propietaria |
| --- | --- |
| gastos, soportes y aprobación de gasto | `NUMERA-DOM-005` |
| catálogo y gobierno de centros de costo | `NUMERA-DOM-006` |
| métodos de costo, componentes, estándar, real, variaciones, transferencias y distribuciones | `NUMERA-DOM-007` |
| rentabilidad por producto, sede, canal y periodo | `NUMERA-DOM-008` |
| bancos, caja y tesorería | `NUMERA-DOM-009` |
| cuentas por pagar | `NUMERA-DOM-010` |
| presupuesto, forecast y escenarios | `NUMERA-DOM-011` y `NUMERA-DOM-018` |
| periodos y cierre financiero | `NUMERA-DOM-012` |
| documentos e integración fiscal | `NUMERA-DOM-013` |
| conciliaciones transversales completas | `NUMERA-DOM-014` |
| contabilidad formal y mapeo a asientos | `NUMERA-DOM-017` |

Esta tarea no absorbe ninguna de esas decisiones.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

**Justificación:** la obligación verificable de conservar propiedad de FOGO y NEXO, correlacionar producción–calidad–inventario–costo, impedir doble movimiento o doble costo, preservar lote, cantidades, unidades, merma, genealogía, idempotencia, transferencias internas y trazabilidad económica ya está cubierta por requisitos canónicos vigentes. Esta tarea especializa esa cobertura para la ingestión económica en NUMERA sin introducir una obligación materialmente nueva.

---

#### 33. Cobertura de prueba vigente reutilizada

Esta sección documenta cobertura existente y no constituye una actualización del Registro 04A.

Cobertura principal reutilizada:

- `TREQ-NUMERA-001` — reconciliación de costos, reportes y resultados con hechos y documentos fuente de FOGO y NEXO sin doble registro manual;
- `TREQ-NUMERA-002` — identidad estable del hecho económico, dimensiones, fechas, fuente, correlación, evidencia y correcciones compensatorias no destructivas;
- `TREQ-NUMERA-004` — separación de tipos de costo, método, entradas, versión, vigencia, transferencias internas, distribución y rentabilidad;
- `TREQ-FOGO-001` — ciclo del lote con consumo, desperdicio, resultado, cierre y efectos de inventario auditables;
- `TREQ-FOGO-002` — receta/versionado, cantidades, unidades, rendimiento, merma, sustituciones y desviaciones sin sobrescritura;
- `TREQ-FOGO-004` — ejecución productiva, calidad, terminado, merma, genealogía y cierre conciliado;
- `TREQ-NEXO-011` — movimientos y proyecciones de inventario atómicos/idempotentes, cantidades físicas y reservadas diferenciadas y ausencia de doble contabilización;
- `TREQ-NEXO-012` — lote, origen, liberación, vencimiento, ubicación, condición, cuarentena y trazabilidad física;
- `TREQ-INTEGRATION-013` — cadena demanda→plan→materiales→ejecución→calidad→inventario→costo correlacionada e idempotente;
- `TREQ-INTEGRATION-016` y `TREQ-INTEGRATION-017` — continuidad logística y llegada gobernada de hechos operativos hacia NUMERA.

No se entrega una actualización 04A porque ninguna regla protegida cambia de contenido ni de estado.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | esta tarea es documental y no ejecuta build de producto; la incorporación deberá validarse con el tooling documental vigente |
| LOCAL | NOT_EXECUTED | reemplazo, formato, quality, delivery, topología, plan y TREQ deberán ejecutarse en el checkout del usuario cuando `NUMERA-DOM-003` haya cerrado y habilitado continuidad |
| REMOTA | PASS | se verificaron `vento-shell/main`, `NUMERA-DOM-002` publicado, el marcador `NUMERA-DOM-004`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0024..0028`, `VPROC-0033..0037`, `VPROC-0051`, `VPROC-0054`, contratos `INT-PROD-001..005`, cobertura 04A NUMERA/FOGO/NEXO/INTEGRATION y validadores documentales vigentes; `NUMERA-DOM-003` se consume desde su versión completa aprobada |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron producciones, consumos, movimientos, ajustes, disposiciones, transferencias, costeo ni conciliaciones reales |
| FÍSICA | NOT_APPLICABLE | `NUMERA-DOM-004` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia |

---

#### 35. Criterios de aceptación

La tarea queda aceptable cuando:

1. FOGO permanece propietario de plan, ejecución, lote, rendimiento, merma, calidad, empaque y cierre productivo;
2. NEXO permanece propietario de reservas, movimientos, existencia, ubicación, conteo, condición y transferencias físicas;
3. NUMERA permanece propietario del hecho económico y de las derivaciones financieras autorizadas;
4. plan, reserva, consumo, movimiento, salida, calidad, terminado, cierre, hecho económico y costo calculado permanecen identidades distintas;
5. un plan liberado no se interpreta como producción realizada;
6. una reserva no se interpreta como consumo;
7. el uso capturado por FOGO no duplica el movimiento NEXO;
8. un movimiento NEXO no reemplaza el cierre FOGO;
9. `OUTPUT_REPORTED` no se interpreta como terminado liberado;
10. calidad, empaque e ingreso físico permanecen estados independientes;
11. el consumo produce un solo efecto económico correlacionado aunque FOGO y NEXO aporten evidencia;
12. producto terminado requiere evidencia productiva, calidad y movimiento físico aplicables antes del reconocimiento definitivo;
13. rendimiento y merma conservan esperado, real, unidad, lote y causa sin doble descuento;
14. reproceso conserva genealogía y solo agrega efectos cuando existen hechos nuevos;
15. una diferencia de conteo no se convierte en ajuste hasta existir decisión y movimiento compensatorio;
16. cuarentena o alerta no se convierten automáticamente en pérdida económica;
17. transferencias internas no se tratan como venta, compra, ingreso o gasto legal por defecto;
18. salida y entrada de una transferencia no duplican el valor de la misma unidad;
19. `VPROC-0051` valida origen, evidencia y duplicidad antes de reconocimiento;
20. `VPROC-0054` consume entradas reconciliadas sin que esta tarea defina fórmulas de costo;
21. cantidades y unidades económicas se reconcilian con las fuentes físicas y productivas;
22. fechas operativas, físicas, productivas, económicas y contables permanecen separadas;
23. correcciones y compensaciones preservan el hecho original;
24. diferencias permanecen explícitas hasta conciliación;
25. no se crean ni modifican requisitos de prueba;
26. no se realizan cambios físicos;
27. la continuidad reserva `NUMERA-DOM-005`.

---

#### 36. Límites

Esta tarea no:

- implementa eventos, consumidoras, colas, outbox, inbox o adaptadores;
- crea tablas, columnas, índices, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase;
- modifica FOGO, NEXO o NUMERA;
- ejecuta producción, movimientos, conteos, ajustes, disposiciones o transferencias;
- define receta, planificación, calidad o inventario en lugar de sus dominios propietarios;
- calcula costo estándar, promedio, último, real, landed, productivo o logístico;
- define pools, drivers o distribuciones;
- define centros de costo;
- define flujo general de gastos;
- define cuentas por pagar, bancos o tesorería;
- define política tributaria o contable profesional;
- crea ventas o compras a partir de movimientos internos;
- modifica el Registro 04A;
- desarrolla `NUMERA-DOM-005`.

---

#### 37. Handoff a NUMERA-DOM-005

`NUMERA-DOM-005` recibe estas fronteras cerradas:

1. un gasto no puede sustituir un hecho económico ya originado por una fuente propietaria;
2. producción e inventario ya tienen contrato de entrada económica propio;
3. el mismo consumo no puede duplicarse como gasto manual;
4. una merma, pérdida, mantenimiento o servicio solo se convierte en gasto cuando su naturaleza y soporte correspondan al flujo de gasto;
5. ajustes y compensaciones preservan el hecho original;
6. documento o soporte no equivale por sí solo a hecho económico;
7. FOGO y NEXO conservan la verdad operativa que NUMERA consume;
8. costos calculados y gastos son conceptos distintos;
9. la trazabilidad hasta entidad, sede, centro, fuente, actor y evidencia permanece obligatoria;
10. el Registro 04A no cambia por esta tarea.

---

#### 38. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación`
### ✅ NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario
**Tarea siguiente:** NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo
**Tipo de tarea:** definición documental del contrato de gasto dentro de NUMERA, incluyendo origen, soporte, captura manual legítima, validación, aprobación, reconocimiento, prevención de duplicidad, corrección, anulación, actor, periodo, centro de costo, relación con obligaciones y pagos y fronteras frente a compras, inventario, producción, nómina, contabilidad formal y fiscalidad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica NUMERA, ORIGO, NEXO, FOGO, PULSO, ANIMA, Supabase, permisos, tablas, gastos, periodos, soportes, obligaciones, pagos, documentos, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cuándo un desembolso, consumo económico, servicio, obligación o soporte externo puede representarse como gasto en NUMERA, qué evidencia mínima debe acompañarlo, cuándo una captura manual es legítima, qué decisión separa registro de aprobación, cómo se reconoce el efecto económico y cómo se corrige o anula sin borrar historia ni duplicar hechos que ya pertenecen a otros dominios.

La tarea desarrolla las brechas confirmadas por `NUMERA-AUD-007`, `NUMERA-AUD-009` y `NUMERA-AUD-010` y consume los contratos de `NUMERA-DOM-002` a `NUMERA-DOM-004` para que NUMERA:

- no convierta un formulario manual en fuente universal de gastos;
- no duplique ventas, compras, recepciones, inventario, producción, caja, nómina u obligaciones ya originadas en otra fuente;
- diferencie captura, validación, aprobación, reconocimiento, conciliación, corrección y anulación;
- exija origen y soporte suficientes para explicar el gasto;
- conserve actor, fechas, moneda, importe, periodo, centro, documento y correlación cuando apliquen;
- mantenga una vía manual gobernada para hechos cuyo origen legítimo no disponga todavía de integración;
- preserve el original cuando una corrección o anulación ocurra después del reconocimiento.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-005` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define un contrato documental reutilizable;
- no crea una instancia física propia;
- no modifica `numera_expenses` ni su RLS actual;
- no crea nuevos permisos ni decide sus códigos runtime;
- no ejecuta gastos, aprobaciones, anulaciones, pagos ni cierres;
- no modifica documentos ni archivos de soporte;
- no define todavía la propiedad del catálogo de centros de costo;
- no define el workflow integral de periodos, cuentas por pagar, caja, bancos, impuestos o contabilidad formal.

---

#### 3. Handoff recibido de NUMERA-DOM-004

`NUMERA-DOM-004` deja congeladas estas reglas que también gobiernan gastos:

```text
FUENTE_OPERATIVA_CONSERVA_PROPIEDAD = SI
HECHO_OPERATIVO != HECHO_ECONOMICO
HECHO_FISICO != HECHO_ECONOMICO
REINTENTO_NO_DUPLICA_EFECTO = SI
CORRECCION_DESTRUCTIVA = PROHIBIDA
REGISTRO_MANUAL_COMPETIDOR = PROHIBIDO
TRANSFERENCIA_INTERNA != GASTO_LEGAL_AUTOMATICO
```

La presente tarea aplica esas reglas a la captura y gobierno de gastos sin reabrir los contratos de ventas, compras, producción o inventario.

---

#### 4. Estado AS-IS que debe superarse

La auditoría vigente demuestra que el flujo actual de `/expenses`:

- utiliza una única Server Action `createExpense`;
- exige `numera.expenses.manage`;
- recibe periodo, categoría, centro, fecha, descripción y monto;
- inserta directamente en `numera_expenses`;
- fija `currency = COP` y `source_app = numera` desde servidor;
- no exige soporte documental;
- no persiste `source_table` ni `source_id` desde la acción observada;
- no materializa workflow de aprobación;
- no persiste explícitamente `created_by` desde la acción observada;
- no revalida el estado del periodo antes del insert;
- usa una capacidad `manage` que no separa registrar, aprobar, corregir o retirar.

Este comportamiento es evidencia AS-IS y no se adopta como contrato objetivo.

---

#### 5. Definición canónica de gasto

Dentro de NUMERA, un gasto es un hecho económico que representa consumo, servicio, cargo, pérdida, obligación o aplicación de recursos atribuible a la operación y sustentado por una causa verificable.

Un gasto no se define únicamente por:

- una categoría;
- una descripción;
- un monto;
- una salida de caja;
- una factura aislada;
- una compra;
- un movimiento de inventario;
- un consumo productivo;
- una transferencia interna.

La causa empresarial y su fuente deben poder explicarse y reconciliarse.

---

#### 6. Separación obligatoria de identidades

Se conserva:

```text
GASTO
!= COMPRA
!= RECEPCION
!= OBLIGACION_POR_PAGAR
!= PAGO
!= MOVIMIENTO_DE_CAJA
!= MOVIMIENTO_DE_INVENTARIO
!= CONSUMO_PRODUCTIVO
!= MERMA
!= TRANSFERENCIA_INTERNA
!= DOCUMENTO_FISCAL
!= ASIENTO_CONTABLE
```

Una identidad puede originar o correlacionarse con otra, pero ninguna sustituye automáticamente a las demás.

---

#### 7. Orígenes legítimos de un gasto

NUMERA podrá representar un gasto cuando exista al menos una causa empresarial trazable dentro de una de estas familias:

1. hecho recibido desde un dominio propietario y convertido en efecto económico mediante el contrato correspondiente;
2. servicio o consumo no inventariable cuya aceptación y soporte sean suficientes sin crear una recepción física ficticia;
3. documento o soporte externo legítimo cuyo sistema fuente todavía no disponga de integración;
4. captura manual primaria para un hecho que no posea otra fuente empresarial propietaria;
5. ajuste o reclasificación gobernada sobre un hecho económico existente;
6. excepción manual explícitamente autorizada y auditable.

La existencia de una categoría de gasto no constituye por sí sola un origen legítimo.

---

#### 8. Regla para captura manual legítima

La captura manual se conserva como capacidad válida, pero queda subordinada a una comprobación de origen.

Antes de reconocer un gasto manual deberá demostrarse al menos una de estas condiciones:

- no existe otro dominio o sistema con el hecho propietario;
- el soporte proviene de una fuente externa aún no integrada;
- la captura representa una corrección, reclasificación o excepción gobernada;
- existe una referencia explícita a la fuente y la identidad permite comprobar que no habrá doble reconocimiento.

Si ya existe un evento canónico de la misma causa, el formulario manual no podrá crear una segunda copia económica independiente.

---

#### 9. Propiedad de origen y prevención de competencia

Queda establecido:

- una compra o recepción gobernada por ORIGO no se convierte en un gasto manual paralelo por coincidencia de proveedor, descripción o monto;
- un movimiento o ajuste de inventario gobernado por NEXO no se replica como gasto independiente sin correlación;
- un consumo, merma o resultado productivo gobernado por FOGO no se vuelve un segundo costo por digitación manual;
- una venta, devolución, pago o caja gobernada por PULSO no se reinterpreta como gasto por simple movimiento monetario;
- un hecho laboral proveniente de ANIMA o de un futuro paquete laboral autorizado no podrá coexistir silenciosamente con una captura manual de la misma causa.

NUMERA conserva un único efecto económico por causa empresarial correlacionada.

---

#### 10. Contrato mínimo de origen

Todo gasto deberá conservar un origen explícito suficiente para responder:

- qué causa empresarial lo produjo;
- qué sistema, documento, actor o soporte lo respalda;
- si el origen es integrado, manual, externo o compensatorio;
- qué identidad o correlación permite detectar replay o duplicidad;
- qué dominio conserva el hecho propietario cuando exista;
- qué evidencia justificó una excepción manual cuando no exista integración.

Para eventos integrados deberán conservarse las referencias técnicas de origen aplicables. Para captura manual legítima deberá existir soporte o justificación equivalente que impida que `source_app = numera` se convierta en una fuente sin explicación.

---

#### 11. Soporte y evidencia

Un gasto que requiera soporte no podrá considerarse completamente gobernado solo porque exista una fila económica.

El soporte puede provenir, según la causa, de:

- documento comercial o contractual;
- evidencia de prestación o aceptación de servicio;
- documento fiscal o referencia al documento oficial correspondiente;
- evidencia bancaria o de pago cuando sea relevante para la conciliación;
- documento operativo emitido por otro dominio;
- archivo, registro o evidencia externa autorizada;
- justificación formal de ajuste o excepción.

Esta tarea exige la referencia y trazabilidad del soporte; la taxonomía documental, almacenamiento, retención y controles de información permanecen en sus dominios propietarios.

---

#### 12. Servicios y gastos no inventariables

Los servicios y gastos no inventariables no deberán fabricar movimientos de inventario para demostrar que ocurrieron.

Cuando una compra o contratación de servicio haya sido gestionada por ORIGO, NUMERA deberá consumir la aceptación y soporte comercial correspondiente sin inventar una recepción NEXO inexistente.

Cuando no exista una compra ORIGO porque la causa sea legítimamente externa o manual, NUMERA deberá conservar soporte, actor, contraparte cuando aplique y justificación suficientes para explicar el reconocimiento.

---

#### 13. Categorías de gasto

La categoría clasifica el gasto; no demuestra su origen, autorización ni documento.

Por tanto:

```text
CATEGORIA
!= FUENTE
!= SOPORTE
!= OWNER
!= APROBACION
```

Categorías amplias, incluida cualquier categoría equivalente a “otros”, no podrán omitir origen, soporte o explicación de excepción.

Las categorías existentes del AS-IS no se reinterpretan aquí como catálogo definitivo ni como permiso para registrar hechos de otros dominios.

---

#### 14. Registro, aprobación y reconocimiento

La tarea separa obligatoriamente tres decisiones:

1. **registro o captura:** existe una propuesta o candidato de gasto con datos y soporte inicial;
2. **aprobación:** una autoridad competente acepta la causa, importe, dimensiones, soporte y tratamiento dentro de su alcance;
3. **reconocimiento:** NUMERA incorpora el efecto económico mediante el lifecycle de hechos económicos y lo deja disponible para conciliación y análisis.

Consecuencia:

```text
CAPTURADO != APROBADO != RECONOCIDO
```

Una fila creada por una acción técnica no podrá equivaler automáticamente a las tres decisiones.

---

#### 15. Regla de aprobación

Todo gasto que por política requiera aprobación deberá demostrar antes del reconocimiento:

- actor que decidió;
- autoridad aplicable;
- fecha y contexto de la decisión;
- alcance aprobado;
- importe y moneda aprobados;
- centro y dimensiones aplicables;
- soporte revisado;
- resultado de la decisión;
- motivo cuando exista rechazo, excepción o corrección.

La matriz exacta de capacidades, segregación y permisos corresponde a `NUMERA-AUTH-003` a `NUMERA-AUTH-009`; esta tarea define la obligación de separar decisiones, no inventa códigos de permiso.

---

#### 16. Aprobación de eventos integrados

La recepción de un evento desde otro dominio no obliga a duplicar una aprobación que ya haya ocurrido bajo una autoridad propietaria válida.

NUMERA deberá distinguir:

- aprobación o aceptación empresarial ya demostrada en la fuente;
- validación económica propia de NUMERA;
- aprobación financiera adicional exigida por política.

Cuando una fuente ya entregue una decisión válida y la política no exija otra, NUMERA reutilizará esa evidencia en lugar de crear un segundo workflow equivalente.

---

#### 17. Integración con VPROC-0051

Los gastos reconocidos utilizan `VPROC-0051` como lifecycle económico general.

La semántica aplicable es:

- `ECONOMIC_EVENT_RECEIVED`: NUMERA recibió el candidato o soporte correlacionable;
- `VALIDATION_IN_PROGRESS`: se validan origen, soporte, entidad, fecha, valor, moneda, periodo, duplicidad y autoridad;
- `CLASSIFICATION_PENDING` / `CLASSIFIED`: se define el tratamiento económico y las dimensiones aplicables;
- `POSTING_PENDING`: el hecho validado espera el reconocimiento correspondiente;
- `POSTED`: el efecto económico fue reconocido y conserva vínculo con su origen;
- `RECONCILIATION_PENDING` / `ECONOMIC_EVENT_RECONCILED`: se comprueba coherencia con soporte, contraparte y proceso fuente.

Esta tarea no crea estados adicionales de proceso ni modifica `VPROC-0051`.

---

#### 18. Prevención de duplicidad

Antes de reconocer un gasto, NUMERA deberá verificar que la misma causa no haya sido reconocida ya mediante:

- evento integrado;
- documento fuente correlacionado;
- compra o recepción;
- consumo o movimiento de inventario;
- producción o merma;
- gasto manual anterior;
- ajuste o reversión vinculados.

La detección no se basará únicamente en coincidencia de descripción y monto. La identidad de fuente, correlación, documento, tercero, fecha, importe y contexto se utilizarán según disponibilidad y naturaleza del hecho.

Un reintento con la misma identidad no podrá crear otro gasto.

---

#### 19. Actor y trazabilidad

Todo registro o decisión de gasto deberá poder reconstruir como mínimo:

- actor que capturó o produjo el hecho;
- actor que aprobó cuando aplique;
- actor que corrigió o anuló cuando aplique;
- autoridad utilizada;
- fecha y motivo de cada decisión;
- valor original y efecto compensatorio cuando corresponda;
- origen y soporte;
- correlación con el hecho previo.

El uso del actor para autorizar una acción sin persistirlo en la historia financiera no satisface esta obligación.

---

#### 20. Moneda e importe

La moneda debe conservarse explícitamente en el hecho económico.

Un valor predeterminado de interfaz puede existir, pero:

```text
DEFAULT_DE_UI
!= MONEDA_CONFIRMADA_DEL_HECHO
```

NUMERA deberá validar y persistir la moneda aplicable y conservar los componentes de importe e impuestos cuando correspondan, sin inferir que todo gasto empresarial pertenece siempre a una sola moneda.

---

#### 21. Periodo económico

El gasto deberá referenciar un periodo compatible con su fecha y reglas de reconocimiento.

La selección del periodo más reciente por fecha no demuestra que sea un periodo abierto.

Queda establecido:

- un gasto ordinario nuevo no debe reconocerse silenciosamente contra un periodo cerrado o bloqueado;
- un hecho tardío deberá usar la política de ajuste, periodo posterior o reapertura que corresponda;
- la definición completa de periodos, cierre y reapertura permanece en `NUMERA-DOM-011` y `NUMERA-DOM-014`.

Esta tarea no crea el workflow de cierre, pero prohíbe ignorar el estado del periodo al reconocer el gasto.

---

#### 22. Centro de costo

Un gasto puede referenciar un centro de costo únicamente cuando esa dimensión sea válida para la causa y el periodo correspondiente.

La existencia de una fila activa en el catálogo no demuestra por sí sola elegibilidad financiera para cualquier gasto.

La propiedad, identidad, vigencia y gobierno del catálogo se definen en `NUMERA-DOM-006`. La presente tarea solo exige que el gasto conserve una referencia válida y no cree centros alternos dentro del flujo de captura.

---

#### 23. Corrección antes del reconocimiento

Si el gasto todavía no ha sido reconocido, una corrección podrá actualizar o sustituir la propuesta únicamente conservando trazabilidad suficiente de la revisión cuando ya haya existido una decisión, soporte o envío a aprobación.

Una corrección no podrá:

- borrar evidencia de una aprobación o rechazo previo;
- cambiar silenciosamente el origen;
- reutilizar una identidad para otra causa;
- convertir un gasto rechazado en reconocido sin una nueva decisión válida.

---

#### 24. Corrección después del reconocimiento

Después de `POSTED`, el hecho original permanece inmutable como evidencia económica.

Cualquier cambio material deberá representarse mediante acción vinculada, por ejemplo:

```text
HECHO_ORIGINAL
+
EFECTO_COMPENSATORIO_O_REVERSION
+
NUEVO_HECHO_CORREGIDO_CUANDO_APLIQUE
```

La corrección conservará motivo, actor, relación con el original, valores afectados y evidencia suficiente para reconstruir el antes y el después.

---

#### 25. Anulación

La anulación tiene semántica distinta según el momento:

- una propuesta todavía no reconocida puede quedar cancelada mediante decisión y motivo trazables;
- un gasto reconocido no se elimina ni se convierte en inexistente;
- la anulación de un hecho reconocido produce el efecto compensatorio necesario y conserva el original;
- una anulación no elimina obligaciones, pagos, documentos o movimientos externos que requieran su propia reversa o conciliación.

Por tanto:

```text
ANULACION != DELETE
ANULACION != BORRADO_DE_HISTORIA
```

---

#### 26. Relación con obligaciones y pagos

Reconocer un gasto no significa que haya sido pagado.

También:

```text
GASTO != OBLIGACION
OBLIGACION != PAGO
PAGO != CONCILIACION_BANCARIA
```

Cuando el gasto origine o esté asociado a una cuenta por pagar, deberá correlacionarse con el objeto financiero correspondiente en lugar de duplicarlo. El modelo completo de cuentas por pagar permanece en `NUMERA-DOM-010`.

Caja, bancos y conciliaciones permanecen en `NUMERA-DOM-009`.

---

#### 27. Nómina y hechos laborales

Una categoría de nómina o gasto laboral puede funcionar temporalmente como puente manual únicamente cuando no exista todavía un hecho laboral/económico integrado y autorizado que represente la misma causa.

Cuando exista una fuente laboral propietaria aprobada:

- el gasto deberá correlacionarse con esa fuente;
- la captura manual competidora deberá bloquearse o convertirse en excepción gobernada;
- una marcación de asistencia no se transforma por sí sola en gasto de nómina;
- el cálculo laboral y sus reglas permanecen en sus dominios propietarios.

---

#### 28. Campos económicos mínimos

Todo gasto objetivo deberá poder conservar, cuando aplique:

- identidad estable;
- entidad legal;
- marca o unidad sin confundirla con entidad legal;
- sede;
- centro de costo;
- categoría o clasificación;
- tercero o contraparte;
- moneda;
- fecha de ocurrencia;
- fecha de reconocimiento;
- periodo;
- importe y componentes aplicables;
- impuestos cuando correspondan;
- origen;
- correlación con fuente;
- documento o soporte;
- actor de captura;
- evidencia de aprobación cuando aplique;
- estado económico;
- motivo y relación de corrección o anulación cuando existan.

Los nombres físicos de columnas y el modelo de almacenamiento se materializan posteriormente; esta tarea define la información empresarial que debe poder preservarse.

---

#### 29. Fronteras con tareas posteriores

Esta tarea no absorbe:

- propiedad y gobierno del catálogo de centros de costo, `NUMERA-DOM-006`;
- metodología de costo y variaciones, `NUMERA-DOM-007`;
- caja, bancos y conciliaciones, `NUMERA-DOM-009`;
- cuentas por pagar, `NUMERA-DOM-010`;
- periodos y gobierno temporal, `NUMERA-DOM-011` y `NUMERA-DOM-014`;
- fronteras fiscales y documentos oficiales, `NUMERA-DOM-013`;
- contabilidad formal y mapeo a asientos, `NUMERA-DOM-017`.

La tarea tampoco define la experiencia final de `/expenses` ni el catálogo detallado de permisos; esos alcances permanecen en `NUMERA-UX-*` y `NUMERA-AUTH-*` correspondientes.

---

#### 30. Decisiones congeladas

Quedan congeladas para continuidad:

1. la captura manual permanece permitida, pero deja de ser una fuente universal sin origen;
2. un hecho propietario de otro dominio no puede duplicarse como gasto manual independiente;
3. categoría no sustituye origen, soporte, owner ni aprobación;
4. `Otros gastos` o una categoría equivalente no constituye excepción a trazabilidad;
5. un servicio no inventariable requiere aceptación y soporte sin inventario ficticio;
6. registro, aprobación y reconocimiento son decisiones separadas;
7. una aprobación previa válida en la fuente puede reutilizarse cuando la política no exija otra;
8. actor y autoridad deben quedar trazables en decisiones financieras;
9. la moneda debe persistirse explícitamente y no asumirse solo por default de interfaz;
10. el estado del periodo no puede ignorarse al reconocer gasto;
11. correcciones y anulaciones posteriores al reconocimiento son compensatorias y no destructivas;
12. gasto, obligación y pago permanecen separados;
13. una categoría de nómina manual es puente condicionado y no owner permanente del hecho laboral;
14. la tarea no crea permisos, tablas, documentos, estados runtime ni requisitos de prueba nuevos.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

La razón es que el Registro 04A vigente ya protege reconciliación con fuentes, identidad del hecho económico, separación de decisiones financieras, lectura/registro de gastos, validación server-side, moneda, origen, correcciones no destructivas e idempotencia.

---

#### 32. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar texto, estado, relaciones ni secuencia:

- `TREQ-NUMERA-001` para reconciliación de gastos con hechos y documentos fuente, no duplicación manual, historia, actor y origen;
- `TREQ-NUMERA-002` para identidad estable, entidad, dimensiones, moneda, fechas, fuente, correlación, documento, monto, impuestos, estado, evidencia y correcciones compensatorias;
- `TREQ-NUMERA-003` para separación de registrar, aprobar, pagar, conciliar, cerrar y reabrir dentro de las capacidades financieras;
- `TREQ-NUMERA-017` para separar lectura de gastos de la capacidad de registro;
- `TREQ-NUMERA-018` para revalidación server-side, campos económicos, moneda y origen explícitos al crear gastos;
- `TREQ-INTEGRATION-006` para captura única en la fuente propietaria y prohibición de fuentes competidoras.

Esta sección es trazabilidad de cobertura existente y no constituye una actualización del Registro 04A.

---

#### 33. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El trabajo es documental y no se ejecutaron build, lint, tipos ni pruebas de producto durante esta preparación. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo, quality, delivery, topología y batería global deberán ejecutarse en el checkout del usuario después del cierre de `NUMERA-DOM-004`. |
| REMOTA | PASS | Se verificaron en `vento-shell/main` la continuidad vigente, topología `DEFINE_ONCE`, archivo propietario, auditorías `NUMERA-AUD-007`/`009`/`010`, `VPROC-0051`, Registro 04A NUMERA, permisos observados, contrato de entrega y validadores documentales vigentes; `NUMERA-DOM-004` se consume desde su versión completa aprobada por el usuario mientras termina su publicación. |
| OPERATIVA | NOT_EXECUTED | No se creó, aprobó, corrigió, anuló, pagó ni concilió ningún gasto real. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-DOM-005` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia. |

---

#### 34. Criterios de aceptación

`NUMERA-DOM-005` queda aceptable cuando:

- define qué es y qué no es un gasto;
- conserva una vía manual legítima sin permitir duplicidad frente a fuentes propietarias;
- exige origen y soporte suficientes;
- separa captura, aprobación y reconocimiento;
- define la reutilización de aceptación upstream sin duplicar workflows;
- integra el gasto con `VPROC-0051` sin crear estados nuevos;
- exige actor y autoridad trazables;
- trata moneda y periodo como datos gobernados;
- reserva el catálogo de centros a `NUMERA-DOM-006`;
- define corrección y anulación no destructivas;
- mantiene separados gasto, obligación y pago;
- asigna nómina manual como puente condicionado, no como owner definitivo;
- conserva cobertura TREQ existente sin modificar 04A;
- deja `NUMERA-DOM-006` como única continuidad inmediata.

---

#### 35. Límites

Esta tarea no demuestra ni autoriza:

- que todo gasto requiera exactamente el mismo nivel de aprobación;
- un umbral monetario específico de aprobación;
- nombres nuevos de permisos;
- una tabla, columna, enum o máquina de estados runtime nueva;
- que toda compra deba convertirse en gasto inmediato;
- que todo pago constituya gasto;
- que una factura sea suficiente por sí sola para reconocimiento;
- que una marcación ANIMA sea nómina;
- que una categoría determine la fuente propietaria;
- que todo soporte sea fiscal;
- que un periodo cerrado pueda reabrirse sin el workflow posterior correspondiente;
- que un gasto aprobado esté pagado o conciliado;
- cambios de código, datos, Supabase, permisos, RLS, documentos o integraciones.

---

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo`
### ✅ NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación
**Tarea siguiente:** NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones
**Tipo de tarea:** definición documental del catálogo canónico compartido de centros de costo, su propiedad funcional dentro de NUMERA, identidad estable, alcance, relaciones organizacionales, jerarquía analítica, vigencia, elegibilidad, lifecycle, transición desde el AS-IS y fronteras de consumo por otras aplicaciones, sin crear un catálogo paralelo ni modificar físicamente datos, permisos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea, renombra, activa, desactiva, fusiona, retira ni elimina centros de costo, no modifica NUMERA, NEXO, ORIGO, FOGO, PULSO, VISO, Supabase, permisos, RLS, tablas, presupuestos, gastos, hechos económicos, integraciones ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir una sola fuente canónica de centros de costo para VENTO OS, establecer quién gobierna funcionalmente ese catálogo, qué representa una identidad de centro de costo, cómo se relaciona sin confundirse con empresa, marca, sede, área, instalación, canal o aplicación y qué reglas de vigencia, elegibilidad, jerarquía, historia y consumo deben cumplirse antes de usar un centro en gastos, presupuestos, costos, transferencias internas, cierres o análisis.

La tarea resuelve la brecha dejada por `OPS-CST-001` y `NUMERA-AUD-009`:

- existe un catálogo físico compartido `cost_centers`;
- NUMERA lo consume actualmente, pero no gobierna físicamente sus filas desde las superficies auditadas;
- la policy AS-IS observada usa una capacidad NEXO o autoridad global para administrar el recurso;
- existe un centro demo activo que puede alcanzar superficies financieras;
- Producción y Distribución comparten instalación física, pero requieren responsabilidades económicas distinguibles;
- el catálogo objetivo no puede duplicarse por aplicación ni deducirse de la estructura física.

---

#### 2. Naturaleza y topología

La topología canónica de `NUMERA-DOM-006` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define el contrato de dominio una sola vez;
- no crea una instancia física propia;
- no modifica `cost_centers` ni sus relaciones actuales;
- no crea migraciones, funciones, triggers o policies;
- no publica códigos nuevos;
- no crea permisos ni fija sus nombres atómicos;
- no implementa todavía presupuestos, costos, cierres ni rentabilidad;
- no convierte la configuración histórica de NEXO en propiedad objetivo por inferencia.

---

#### 3. Handoff recibido de NUMERA-DOM-005

`NUMERA-DOM-005` deja congelado que:

- un gasto solo puede referenciar un centro de costo válido para su causa, periodo y contexto;
- una fila activa no basta para probar elegibilidad;
- la captura manual no puede crear un catálogo paralelo ni inventar centros;
- centro de costo, sede, entidad legal y fuente del gasto permanecen dimensiones distintas;
- una ambigüedad de centro no se resuelve mediante fallback silencioso;
- el catálogo y su gobierno se reservan expresamente a esta tarea.

La presente tarea desarrolla esa reserva sin reabrir el contrato de gastos.

---

#### 4. Handoff recibido de OPS-CST-001

Se conservan como invariantes:

```text
PHYSICAL_INSTALLATION_COUNT_DOES_NOT_DEFINE_COST_CENTER_COUNT
PRODUCTION_AND_DISTRIBUTION_ECONOMIC_RESPONSIBILITIES = DISTINGUISHABLE
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
INTERNAL_PRODUCT_TRANSFER_IS_SALE_BY_DEFAULT = NO
INTERNAL_PRODUCT_TRANSFER_IS_LEGAL_REVENUE_OR_EXPENSE_BY_DEFAULT = NO
INVENTORY_MOVEMENT_OWNER = NEXO
PRODUCTIVE_FACT_OWNER = FOGO
ECONOMIC_VALUATION_OWNER = NUMERA
DIRECT_ATTRIBUTION_PRECEDES_SHARED_ALLOCATION = YES
```

Además:

- no se crea un catálogo NUMERA paralelo;
- no se duplica un centro por aplicación;
- marca, sede, entidad legal y centro de costo no son sinónimos;
- una fila demo no es destino de operación real;
- un centro no se crea únicamente para resolver una fórmula o un reporte;
- la identidad, código, lifecycle, jerarquía, vigencia, elegibilidad y ownership definitivos del catálogo corresponden a esta tarea.

---

#### 5. Decisión de propiedad funcional

El catálogo canónico compartido de centros de costo queda bajo **propiedad funcional y gobierno económico de NUMERA**.

Esta decisión significa:

- NUMERA define qué constituye un centro de costo válido como dimensión económica;
- NUMERA gobierna las reglas de identidad, alta, vigencia, retiro, elegibilidad, jerarquía y uso económico;
- NUMERA valida el uso del centro dentro de hechos económicos, gastos, presupuestos, costos, distribuciones, cierres y análisis;
- otras aplicaciones pueden consumir la identidad canónica y proponer contexto, pero no crean una segunda fuente de verdad;
- una capacidad histórica de NEXO sobre `cost_centers` no transfiere el ownership objetivo del catálogo a NEXO;
- la persistencia técnica compartida continúa perteneciendo a la infraestructura común gobernada desde `vento-shell`, no a una tabla privada de `vento-numera`.

La propiedad funcional no concede por sí sola permiso de mutación a ningún actor.

---

#### 6. Separación entre owner funcional, persistencia y consumidores

Se distinguen tres responsabilidades:

| Capa | Responsabilidad |
| --- | --- |
| gobierno funcional | NUMERA define significado económico, lifecycle, elegibilidad y reglas de uso |
| persistencia compartida | `vento-shell` y la infraestructura de datos materializan el catálogo canónico cuando el paquete correspondiente lo autorice |
| consumo | NEXO, ORIGO, FOGO, PULSO, VISO, NUMERA y otros dominios referencian centros autorizados según su proceso y alcance |

Ningún consumidor adquiere propiedad del catálogo por consultar una fila o incluir `cost_center_id` en su propio objeto.

---

#### 7. Definición canónica de centro de costo

Un centro de costo es una identidad económica estable utilizada para atribuir, agrupar, presupuestar, distribuir y analizar efectos económicos bajo una responsabilidad empresarial identificable.

No es automáticamente:

- una empresa;
- una marca;
- una sede;
- una instalación;
- un área;
- una zona;
- una estación;
- un canal;
- una aplicación;
- un almacén;
- una cuenta contable;
- un emisor fiscal.

Puede relacionarse con esas dimensiones cuando exista una relación explícita y vigente, pero no las sustituye.

---

#### 8. Regla de catálogo único

VENTO OS conserva un solo catálogo canónico compartido de centros de costo.

Queda prohibido:

- crear `cost_centers` paralelos por aplicación;
- copiar identidades para que cada módulo administre su propia versión;
- usar texto libre como sustituto de una identidad canónica;
- duplicar un centro para representar la misma responsabilidad económica;
- crear aliases funcionales que se comporten como centros independientes;
- resolver una incompatibilidad de integración creando una segunda fuente;
- usar dashboards, presupuestos o reportes como fuente editable del catálogo.

Los consumidores deberán referenciar la identidad canónica.

---

#### 9. Identidad estable

Cada centro deberá conservar una identidad estable que sobreviva a cambios de nombre visible, relaciones organizacionales y lifecycle.

Reglas:

1. la identidad canónica no se deduce del nombre;
2. el código empresarial visible no sustituye la identidad estable;
3. un código históricamente usado no se reasignará silenciosamente a otra responsabilidad económica;
4. un cambio de nombre no crea un centro nuevo por sí solo;
5. una fusión, división o sustitución no reescribe hechos históricos;
6. las referencias económicas conservan el identificador del centro vigente al momento reconocido;
7. la implementación física futura deberá conservar historia suficiente para reconstruir la identidad usada.

Esta tarea no cambia las columnas físicas existentes.

---

#### 10. Gobierno del código empresarial

El código de centro de costo es una referencia empresarial gobernada y no una cadena libre.

El diseño objetivo deberá garantizar que:

- sea único dentro del ámbito canónico definido;
- no se reutilice para una responsabilidad distinta después de haber sido referenciado;
- un cambio de código conserve trazabilidad hacia la identidad estable;
- los consumidores no construyan lógica empresarial a partir de prefijos no contractuales;
- ningún código nuevo se invente desde una aplicación consumidora;
- el alta de una nueva identidad publique su código mediante la autoridad del catálogo.

No se asigna en esta tarea un código nuevo al Centro de Distribución porque ninguna fuente canónica vigente declara uno.

---

#### 11. Relaciones con empresa, marca, sede y área

Toda relación entre un centro y otras dimensiones deberá ser explícita.

Se conserva:

```text
ENTIDAD_LEGAL != MARCA != SEDE != AREA != CENTRO_DE_COSTO
```

Reglas:

- compartir sede no obliga a compartir centro;
- compartir centro no convierte dos sedes en una sola sede;
- una marca no crea automáticamente un centro;
- una entidad legal no se deduce del código o nombre del centro;
- un centro podrá tener alcance organizacional, de negocio, sede o área cuando el contrato aplicable lo declare;
- una relación territorial deberá conservar vigencia;
- si la entidad legal, sede o relación organizacional requerida es ambigua, no se inferirá la dimensión financiera.

---

#### 12. Cardinalidad frente a la instalación física

La cantidad de instalaciones físicas no define la cantidad de centros de costo.

Por tanto:

- una instalación puede alojar varias responsabilidades económicas;
- una responsabilidad económica puede consumir hechos de más de un espacio físico cuando la relación esté autorizada;
- no se crea una sede adicional solo para justificar un centro;
- no se elimina una responsabilidad económica porque comparta inmueble con otra;
- el análisis económico debe poder distinguir responsabilidades sin deformar el modelo territorial.

---

#### 13. Producción y Distribución

Producción y Distribución quedan definidas como **responsabilidades económicas distintas** aunque funcionen dentro de la misma instalación física.

Decisiones:

- `CP-CENTRO-PROD` permanece como la identidad observada asociada a Producción; esta tarea no la renombra;
- Distribución deberá disponer de una identidad canónica de centro de costo propia antes de recibir atribución directa, presupuesto o análisis independiente como responsabilidad económica;
- el código definitivo de esa identidad no se inventa en esta tarea;
- la creación física posterior deberá seguir el lifecycle y la autorización del catálogo;
- compartir instalación no autoriza cargar costos logísticos a Producción por defecto;
- Producción y Distribución podrán agregarse conjuntamente en análisis superiores sin perder sus identidades de base.

---

#### 14. Tratamiento de identidades observadas

El snapshot auditado conserva estas identidades activas:

| Código observado | Tratamiento canónico definido |
| --- | --- |
| `ADM-APP-REVIEW` | identidad demo; conservar para trazabilidad de prueba, excluir de operación y finanzas reales |
| `ADM-VENTO-GROUP` | identidad existente; conservar sin inferir por su nombre entidad legal, sede o alcance definitivo |
| `CP-CENTRO-PROD` | identidad productiva existente; conservar como referencia de Producción |
| `SAT-MOLKA-PRINCIPAL` | identidad satélite existente; conservar, con relación explícita a las dimensiones organizacionales aplicables |
| `SAT-SAUDO` | identidad satélite existente; conservar, con relación explícita a las dimensiones organizacionales aplicables |
| `SAT-VENTO-CAFE` | identidad satélite existente; conservar, con relación explícita a las dimensiones organizacionales aplicables |

La tabla documenta tratamiento de continuidad; no crea ni modifica filas.

---

#### 15. Datos demo y de prueba

Un centro de prueba, demo, APP-REVIEW o equivalente nunca será elegible para un hecho económico real por el solo hecho de tener estado activo.

Reglas:

- se preserva su identidad mientras sea necesaria para prueba o historia;
- se excluye de selectores de operación real;
- se excluye de presupuestos y costos reales;
- no recibe gastos reales;
- no participa en cierres financieros ordinarios;
- no se agrega a indicadores reales;
- su clasificación de prueba debe poder verificarse sin depender únicamente del texto visible;
- una transición desde demo hacia uso real requiere una identidad y decisión empresarial gobernadas, no un simple cambio de etiqueta.

---

#### 16. Lifecycle semántico

El catálogo deberá soportar, como mínimo, las decisiones empresariales de:

1. propuesta de una nueva identidad;
2. revisión de duplicidad y alcance;
3. aprobación para alta;
4. vigencia para nuevos usos;
5. suspensión o inactivación de nuevas asignaciones;
6. retiro definitivo para nuevas operaciones;
7. consulta histórica posterior al retiro.

Los nombres físicos de estados, tablas o permisos se definirán en la materialización correspondiente.

Una identidad retirada continúa resolviendo hechos históricos.

---

#### 17. Vigencia

La elegibilidad de un centro deberá evaluarse con vigencia temporal.

Un consumidor no podrá asumir:

```text
FILA_EXISTE
=
CENTRO_ELEGIBLE_AHORA
```

La evaluación deberá considerar, según aplique:

- inicio de vigencia;
- fin de vigencia;
- estado empresarial;
- clasificación real o demo;
- ámbito organizacional autorizado;
- relación vigente con sede, área o responsabilidad;
- restricciones del proceso consumidor.

Un hecho histórico conserva la dimensión válida en su fecha reconocida aunque el centro deje de admitir nuevas operaciones después.

---

#### 18. Elegibilidad para nuevas operaciones

Antes de asignar un centro a un nuevo hecho económico, gasto, presupuesto o cálculo deberá verificarse:

1. identidad canónica resoluble;
2. vigencia compatible con la fecha relevante;
3. clasificación productiva, administrativa o económica aplicable;
4. ausencia de condición demo o de prueba;
5. ámbito organizacional compatible;
6. relación válida con el contexto del hecho;
7. autorización del actor para el recurso y la acción;
8. ausencia de una sustitución o retiro que bloquee nuevos usos.

Un centro inválido no se sustituirá automáticamente por otro centro "parecido".

---

#### 19. Alta de una nueva identidad

La creación de un centro nuevo solo estará justificada cuando exista una responsabilidad económica estable que no pueda representarse correctamente mediante una identidad vigente.

La solicitud deberá explicar, como mínimo:

- responsabilidad económica;
- propósito;
- ámbito organizacional;
- relación con empresa, sede o área cuando aplique;
- necesidad de atribución, presupuesto, costo o análisis;
- fecha de vigencia pretendida;
- evidencia de que no duplica un centro existente;
- responsable empresarial;
- consumidores conocidos.

Una necesidad temporal de reporte no basta para crear un centro.

---

#### 20. Detección de duplicados y solapamientos

Antes de aprobar una nueva identidad deberá comprobarse si ya existe un centro que represente la misma responsabilidad.

Se deberá detectar, como mínimo:

- código repetido;
- misma responsabilidad con nombre distinto;
- centro nuevo que solo replica una sede;
- centro creado por una aplicación para evitar consumir el catálogo;
- centro que solapa completamente otro sin propósito económico diferenciable;
- identidad de prueba reutilizada como real.

La coincidencia de nombre no es prueba suficiente de duplicidad y la diferencia de nombre no prueba que sean centros distintos.

---

#### 21. Jerarquía y agrupación

La jerarquía de centros se utilizará para análisis y consolidación, no para alterar la identidad de los hechos de base.

Reglas:

- toda relación de agregación deberá ser explícita;
- la jerarquía no podrá contener ciclos;
- cambiar una agrupación no reescribirá hechos históricos;
- una agrupación analítica no crea automáticamente un nuevo centro imputable;
- si se requieren varias perspectivas analíticas, no se duplicarán centros para simular jerarquías distintas;
- los reportes deberán declarar la versión o vigencia de la estructura usada cuando el resultado dependa de ella;
- el nivel superior no absorbe la responsabilidad de los centros hijos.

La materialización física exacta de jerarquías queda para el paquete de datos aplicable.

---

#### 22. Contrato de consumo por aplicaciones

Los dominios consumidores deberán usar el centro como referencia canónica.

| Consumidor | Uso permitido |
| --- | --- |
| NUMERA | hechos económicos, gastos, presupuestos, costos, distribuciones, cierres y análisis |
| NEXO | atribución y contexto económico de activos, movimientos, variaciones o logística cuando aplique |
| ORIGO | contexto económico de solicitudes, compras, recepciones, obligaciones o servicios cuando aplique |
| FOGO | contexto económico correlacionado de producción, consumo, merma y resultados cuando aplique |
| PULSO | dimensión económica de venta, caja u operación comercial cuando el contrato lo requiera |
| VISO y dominios organizacionales | referencia para estructuras, responsables o procesos administrativos cuando corresponda |

Consumir una referencia no autoriza modificar el catálogo.

---

#### 23. Fuente de verdad y cachés

`cost_centers` y su contrato canónico constituyen la fuente compartida de identidad económica del centro de costo.

Se prohíbe que un consumidor:

- mantenga una lista autoritativa congelada;
- convierta una copia local en catálogo propietario;
- acepte un código desconocido sin resolver la identidad;
- actualice únicamente su caché y trate ese cambio como publicación canónica;
- interprete la ausencia temporal de sincronización como permiso para crear otra identidad.

Los cachés o proyecciones deberán poder reconciliarse con la versión canónica vigente.

---

#### 24. Reglas para hechos históricos

Los hechos ya reconocidos no se reatribuyen por un simple cambio de catálogo.

Por tanto:

- retirar un centro no borra sus referencias históricas;
- renombrar un centro no altera el significado histórico de la identidad;
- cambiar una relación organizacional no migra automáticamente hechos pasados;
- una corrección de centro sobre un hecho económico reconocido deberá quedar como reclasificación o ajuste auditable;
- la fuente operativa original permanece intacta;
- una reestructuración futura conserva equivalencias y vigencias suficientes para reconciliar periodos anteriores.

---

#### 25. Ambigüedad, ausencia o centro inválido

Cuando el contexto no permita resolver un centro válido:

```text
AMBIGUO_O_INVALIDO
-> NO_INFERIR
-> MANTENER_PENDIENTE
-> RESOLVER_MEDIANTE_AUTORIDAD_DEL_CATALOGO
```

No se permitirá:

- usar `ADM-VENTO-GROUP` como fallback universal;
- usar el centro de la sede por coincidencia de nombre;
- usar el centro del usuario por defecto;
- usar el último centro seleccionado como verdad;
- usar cero o `null` y presentar después el agregado como clasificado;
- inventar una identidad durante una integración.

El tratamiento operativo exacto de diferencias se implementará posteriormente.

---

#### 26. Frontera de autorización

Esta tarea define ownership funcional, no códigos concretos de permisos de mutación.

Queda establecido:

- consultar un centro y administrar el catálogo son capacidades diferentes;
- administrar presupuesto por centro y administrar la identidad del centro son capacidades diferentes;
- la familia histórica `*.cost_centers.manage` no se adopta como diseño atómico definitivo por el solo hecho de existir;
- la autorización objetivo deberá separar altas, cambios de vigencia, cambios estructurales, consulta y demás decisiones sensibles según `NUMERA-AUTH-*`;
- toda mutación futura deberá revalidar autoridad en servidor y respetar alcance del recurso.

No se crean permisos en esta tarea.

---

#### 27. Frontera con presupuestos y metas

El catálogo de centros de costo y el presupuesto por centro son objetos distintos.

Se conserva:

```text
CENTRO_DE_COSTO
!= PRESUPUESTO
!= FORECAST
!= ESCENARIO
```

Reglas:

- un presupuesto referencia una identidad canónica;
- desactivar un centro no elimina ni migra presupuestos históricos;
- un centro válido no implica que exista presupuesto;
- cambiar una meta no modifica el catálogo;
- la versión, aprobación, publicación y reapertura de presupuestos quedan en las tareas propietarias de planificación y cierre;
- `numera.cost_centers.manage` observado en el AS-IS de `upsertBudget` no prueba que presupuesto y catálogo compartan ownership o lifecycle.

---

#### 28. Frontera con costos y distribución

`NUMERA-DOM-007` recibirá centros canónicos ya definidos como dimensiones económicas.

Esta tarea no decide:

- costo estándar;
- costo real;
- costo promedio;
- landed cost;
- merma valorizada;
- fórmula de distribución;
- driver;
- pool;
- variación;
- precio interno.

Sí fija que cualquier cálculo posterior deberá referenciar centros canónicos y no crear dimensiones ad hoc para cuadrar resultados.

---

#### 29. Integración y propagación de cambios

Un cambio aprobado del catálogo deberá poder propagarse a consumidores sin doble escritura.

La materialización posterior deberá permitir distinguir:

- alta;
- cambio descriptivo;
- cambio de relación organizacional;
- cambio de vigencia;
- suspensión para nuevos usos;
- retiro;
- sustitución o equivalencia histórica cuando aplique.

Los consumidores deberán reconciliar el cambio mediante identidad y versión o vigencia suficientes, sin alterar hechos operativos existentes.

---

#### 30. Transición desde el AS-IS

La transición objetivo preservará continuidad antes que limpieza destructiva.

Se define:

1. mantener las identidades actualmente referenciadas mientras se clasifica su uso;
2. conservar `CP-CENTRO-PROD` y los centros satélite observados sin renombrado masivo por esta tarea;
3. conservar `ADM-VENTO-GROUP` hasta reconciliar explícitamente su alcance;
4. conservar `ADM-APP-REVIEW` como identidad de prueba, pero excluirla de operación económica real;
5. incorporar una identidad distinta para la responsabilidad de Distribución mediante el lifecycle del catálogo, sin inventar su código en esta definición;
6. migrar posteriormente la autoridad física histórica basada en NEXO o capacidades genéricas hacia el modelo de ownership NUMERA definido aquí;
7. conservar compatibilidad de consumidores durante la transición;
8. no romper claves foráneas ni hechos históricos;
9. no usar la transición para reatribuir gastos, movimientos o presupuestos ya cerrados.

---

#### 31. Excepciones obligatorias

El diseño posterior deberá resolver explícitamente:

1. centro solicitado con mismo propósito que uno vigente;
2. centro con nombre diferente pero responsabilidad equivalente;
3. centro vigente sin relación organizacional suficiente;
4. relación con sede que cambia durante el periodo;
5. centro retirado referenciado por un evento tardío;
6. hecho con fecha histórica que llega después del retiro;
7. centro demo seleccionado por una integración o formulario;
8. centro de Producción usado indebidamente para costo de Distribución;
9. consumidor con caché desactualizada;
10. reorganización de empresa o sede;
11. fusión o división de responsabilidades económicas;
12. cambio de código visible;
13. cambio de jerarquía o agrupación;
14. presupuesto vigente asociado a un centro que deja de aceptar nuevas operaciones;
15. integración que recibe un código pero no una identidad resoluble;
16. ambigüedad entre entidad legal y centro;
17. corrección de atribución después del reconocimiento económico.

Ninguna excepción se resuelve mediante borrado de historia o creación automática de un centro alterno.

---

#### 32. Hallazgos y propietarios de salida

| Hallazgo | Bloquea esta definición | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| la policy AS-IS usa autoridad NEXO/global sobre `cost_centers` | no | `NUMERA-AUTH-*` y paquete de datos/autorización aplicable | mutación física y permisos alineados con ownership NUMERA sin romper consumidores |
| el centro demo puede alcanzar superficies financieras | no | `NUMERA-UX-*` y materialización de catálogo | selectores reales excluyen identidades demo mediante clasificación verificable |
| Distribución no posee código canónico observado | no | materialización posterior de este contrato | identidad económica creada mediante lifecycle gobernado y código publicado sin invención |
| la jerarquía histórica no está formalizada | no | paquete de datos NUMERA | relación de agregación acíclica, vigente y auditable disponible |
| presupuestos actuales usan una acción asociada a `cost_centers.manage` | no | `NUMERA-DOM-011`, `NUMERA-AUTH-*` | presupuesto y administración de catálogo quedan separados por contrato y autorización |
| consumidores pueden depender de reglas AS-IS | no | integraciones y paquetes consumidores | todos consumen la identidad compartida sin catálogo competidor |

---

#### 33. Decisiones congeladas

Quedan congeladas para continuidad:

1. existe un único catálogo canónico compartido de centros de costo;
2. el owner funcional objetivo del catálogo es NUMERA;
3. la persistencia compartida no se traslada a una tabla privada de `vento-numera`;
4. NEXO, ORIGO, FOGO, PULSO, VISO y otros dominios son consumidores cuando corresponda;
5. la policy AS-IS de NEXO/global no define ownership objetivo;
6. entidad legal, marca, sede, área, instalación, canal y centro de costo permanecen identidades distintas;
7. la identidad del centro es estable y no depende del nombre visible;
8. los códigos no se reutilizan silenciosamente para otra responsabilidad;
9. la cantidad de centros no se deriva de la cantidad de instalaciones;
10. Producción y Distribución son responsabilidades económicas distintas;
11. `CP-CENTRO-PROD` se conserva como identidad observada de Producción;
12. Distribución requiere identidad propia, pero esta tarea no inventa su código;
13. `ADM-APP-REVIEW` es demo y no es elegible para operación económica real;
14. `ADM-VENTO-GROUP`, `SAT-MOLKA-PRINCIPAL`, `SAT-SAUDO` y `SAT-VENTO-CAFE` se preservan sin inferir por nombre dimensiones no demostradas;
15. una fila existente o activa no prueba elegibilidad;
16. lifecycle y vigencia gobiernan nuevos usos sin borrar historia;
17. las agrupaciones no reescriben hechos de base;
18. presupuesto y catálogo son objetos distintos;
19. costos y drivers quedan para `NUMERA-DOM-007`;
20. los permisos atómicos quedan para `NUMERA-AUTH-*`;
21. no se crean ni modifican requisitos de prueba;
22. no se realizan cambios físicos.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

---

#### 35. Cobertura de prueba vigente reutilizada

La definición queda cubierta, sin modificar el registro, por:

- `TREQ-NUMERA-001` para reconciliación financiera con hechos, fuentes y dimensiones económicas sin doble registro;
- `TREQ-NUMERA-002` para identidad estable, entidad, sede, centro, fuente, correlación, evidencia y correcciones no destructivas;
- `TREQ-NUMERA-004` para costos, distribuciones, presupuestos y rentabilidad con centro, versión, vigencia, entradas y fuente;
- `TREQ-NUMERA-015` para consulta de centros de costo separada de administración;
- `TREQ-NUMERA-016` para revalidación server-side de la mutación financiera actualmente asociada a la superficie de centros;
- `TREQ-INTEGRATION-006` para una sola fuente de verdad empresarial sin doble digitación o fuentes competidoras;
- `TREQ-AUTH-013` para autorización server-side de mutaciones sensibles.

La enumeración de cobertura es trazabilidad heredada y no una actualización de 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no corresponde ejecutar build de producto durante la preparación documental |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout quedan para la batería documental del usuario |
| REMOTA | PASS | se contrastaron owner, secuencia, auditoría NUMERA, `OPS-CST-001`, catálogo de autorización, contratos de proceso y fuentes de integración vigentes |
| OPERATIVA | NOT_EXECUTED | no se crearon, editaron, retiraron ni reasignaron centros ni hechos económicos |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; esta tarea no autoriza materialización física propia |

---

#### 37. Criterios de aceptación

`NUMERA-DOM-006` queda aceptable cuando:

1. existe una decisión inequívoca de ownership funcional;
2. se conserva un solo catálogo compartido;
3. ownership funcional, persistencia y consumo están separados;
4. centro de costo no se confunde con empresa, marca, sede, área, instalación, canal o aplicación;
5. identidad estable y código visible tienen reglas distintas;
6. vigencia y elegibilidad controlan nuevas operaciones;
7. un centro retirado sigue resolviendo historia;
8. datos demo quedan excluidos de operación real;
9. las seis identidades observadas tienen tratamiento explícito;
10. Producción y Distribución pueden analizarse por responsabilidades distintas sin crear una sede ficticia;
11. no se inventa un código de Distribución;
12. la jerarquía no altera hechos ni permite ciclos;
13. consumidores usan referencias canónicas sin adquirir ownership;
14. cambios del catálogo pueden propagarse sin doble escritura;
15. un centro ambiguo no se sustituye por fallback silencioso;
16. presupuesto y catálogo permanecen objetos diferentes;
17. la sucesora recibe centros canónicos como dimensiones para el modelo de costos;
18. no se crean ni modifican TREQ;
19. no se realizan cambios físicos;
20. `NUMERA-DOM-007` queda como única continuidad inmediata.

---

#### 38. Límites

Esta tarea no:

- crea o modifica filas de `cost_centers`;
- asigna un código nuevo a Distribución;
- cambia nombres o códigos existentes;
- crea relaciones físicas de jerarquía;
- modifica RLS;
- migra permisos;
- cambia `nexo.cost_centers.manage`, `numera.cost_centers.manage` ni permisos canónicos;
- crea pantallas;
- modifica selectores;
- cambia presupuestos o metas;
- define su versionado o aprobación;
- calcula costos;
- define drivers o pools;
- reatribute hechos históricos;
- cambia sedes, áreas, marcas o entidades legales;
- crea una sede de Distribución;
- modifica Supabase;
- modifica 04A;
- desarrolla `NUMERA-DOM-007`.

---

#### 39. Handoff a NUMERA-DOM-007

`NUMERA-DOM-007` recibe estas invariantes:

```text
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
COST_CENTER_FUNCTIONAL_OWNER = NUMERA
COST_CENTER_PRIVATE_APP_CATALOG = FORBIDDEN
COST_CENTER_IDENTITY = STABLE
COST_CENTER_CODE_SILENT_REUSE = FORBIDDEN
LEGAL_ENTITY_BRAND_SITE_AREA_CHANNEL_COST_CENTER = DISTINCT_DIMENSIONS
PHYSICAL_INSTALLATION_COUNT_DOES_NOT_DEFINE_COST_CENTER_COUNT
PRODUCTION_AND_DISTRIBUTION_ECONOMIC_RESPONSIBILITIES = DISTINCT
PRODUCTION_OBSERVED_CENTER = CP-CENTRO-PROD
DISTRIBUTION_REQUIRES_CANONICAL_COST_CENTER_IDENTITY = YES
DISTRIBUTION_CODE_DEFINED_BY_THIS_TASK = NO
DEMO_CENTER_ELIGIBLE_FOR_REAL_ECONOMICS = NO
ACTIVE_ROW_ALONE_PROVES_ELIGIBILITY = NO
HISTORICAL_FACT_REATTRIBUTION_BY_CATALOG_EDIT = FORBIDDEN
BUDGET_AND_COST_CENTER_CATALOG = DISTINCT_OBJECTS
```

La sucesora podrá definir costo estándar, costo real y variaciones usando centros canónicos como dimensiones, sin reabrir ownership.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones`
### ✅ NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo
**Tarea siguiente:** NUMERA-DOM-008 — Definir rentabilidad por empresa, sede, canal, producto y periodo
**Tipo de tarea:** definición documental del modelo económico de costos de NUMERA, sus métodos separados de adquisición, landed, estándar, promedio, último, real, productivo, logístico, merma e interno, sus componentes, fórmulas, vigencias, fuentes, reglas de publicación, conciliación, distribución y análisis de variaciones, preservando las fronteras con ORIGO, FOGO, NEXO, PULSO y el catálogo canónico de centros de costo, sin materializar un motor físico de costos ni modificar datos, contratos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica fórmulas ejecutables, costos persistidos, políticas de inventario, eventos de costo, precios internos, compras, recepciones, recetas, lotes, movimientos, centros de costo, presupuestos, permisos, RLS, Supabase, integraciones, reportes ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato económico con el que NUMERA podrá calcular, comparar, publicar y reconciliar costos sin confundir referencias, hechos reales, precios internos, gastos, movimientos de inventario o resultados productivos.

La tarea cierra las brechas demostradas por `NUMERA-AUD-008`, `OPS-CST-001` y `CAP-SCOPE-012`:

- NUMERA no posee todavía un motor integral de costos;
- existen fuentes técnicas de costo fuera de NUMERA que hoy no son consumidas por ese módulo;
- costo estándar, promedio, último, real, landed e interno requieren identidad y vigencia separadas;
- consumo, producción, merma, stock y costo no tienen todavía una conciliación económica cerrada;
- las transferencias internas valorizadas no pueden convertirse por inferencia en ingreso fiscal o gasto legal;
- los costos compartidos carecen todavía de un contrato material de pool, driver, versión, aprobación y reversión;
- el punto de equilibrio vigente usa un margen objetivo como proxy sin demostrar que corresponda a un margen de contribución trazable.

El resultado es un modelo documental completo para una futura materialización física y para el handoff hacia rentabilidad en `NUMERA-DOM-008`.

---

#### 2. Naturaleza y topología

La topología de `NUMERA-DOM-007` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- esta tarea define el contrato una sola vez;
- no crea una instancia física propia;
- no modifica tablas, vistas, RPC, triggers o policies;
- no recalcula datos históricos;
- no cambia estructuras de costo ya existentes en otros dominios;
- no selecciona ni publica una migración concreta;
- no autoriza valores, porcentajes o drivers empresariales específicos;
- no implementa todavía rentabilidad, punto de equilibrio consolidado ni escenarios.

---

#### 3. Handoff recibido de NUMERA-DOM-006

La predecesora deja congelado:

```text
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
COST_CENTER_FUNCTIONAL_OWNER = NUMERA
COST_CENTER_PRIVATE_APP_CATALOG = FORBIDDEN
COST_CENTER_IDENTITY = STABLE
LEGAL_ENTITY_BRAND_SITE_AREA_CHANNEL_COST_CENTER = DISTINCT_DIMENSIONS
PRODUCTION_AND_DISTRIBUTION_ECONOMIC_RESPONSIBILITIES = DISTINCT
DEMO_CENTER_ELIGIBLE_FOR_REAL_ECONOMICS = NO
ACTIVE_ROW_ALONE_PROVES_ELIGIBILITY = NO
HISTORICAL_FACT_REATTRIBUTION_BY_CATALOG_EDIT = FORBIDDEN
```

Todo costo definido aquí deberá referenciar centros canónicos elegibles y conservar su identidad histórica. Esta tarea no reabre ownership, códigos ni lifecycle del catálogo.

---

#### 4. Handoff recibido de OPS-CST-001

Se conservan las siguientes invariantes económicas:

```text
INVENTORY_MOVEMENT_OWNER = NEXO
PRODUCTIVE_FACT_OWNER = FOGO
ECONOMIC_VALUATION_OWNER = NUMERA
DIRECT_ATTRIBUTION_PRECEDES_SHARED_ALLOCATION = YES
STANDARD_REFERENCE_AND_ACTUAL_COST_MUST_COEXIST = YES
HISTORICAL_REVALUATION_BY_SILENT_OVERWRITE = FORBIDDEN
INTERNAL_PRODUCT_TRANSFER_IS_SALE_BY_DEFAULT = NO
INTERNAL_PRODUCT_TRANSFER_IS_LEGAL_REVENUE_OR_EXPENSE_BY_DEFAULT = NO
```

También se conserva la obligación de mantener separados costo de adquisición, costo productivo, merma, costo logístico, costo directo, costo compartido y valorización interna.

---

#### 5. Handoff recibido de NUMERA-AUD-008

La auditoría AS-IS demuestra:

```text
COST_ENGINE_IMPLEMENTED_IN_VENTO_NUMERA = NO
ACTUAL_MARGIN_CALCULATION_IMPLEMENTED = NO
PROFITABILITY_CALCULATION_IMPLEMENTED = NO
```

Además:

- `actual_expenses` representa únicamente filas capturadas en `numera_expenses` y no sustituye costo completo;
- `target_gross_margin_pct` es una entrada de planificación, no margen realizado;
- el punto de equilibrio actual es válido solo bajo un supuesto no demostrado;
- la suma de puntos de equilibrio por centro no es una consolidación financiera demostrada;
- existen fuentes externas como políticas de costo de inventario, eventos de costo, costos de proveedor, entradas de inventario y listas internas, pero NUMERA no las consume actualmente;
- el snapshot observado utiliza `net` en algunas bases de costo y `manual` en un precio interno, sin que esas decisiones puedan elevarse automáticamente a regla universal objetivo.

---

#### 6. Proceso económico propietario

El ciclo objetivo aplicable es `VPROC-0054 — Gestionar costos, distribución, presupuesto, cierre y rentabilidad con reglas versionadas`, propiedad funcional de NUMERA.

Sus estados económicos gobiernan el uso de resultados:

```text
COSTING_CYCLE_OPENED
-> INPUTS_COLLECTING
-> CALCULATION_IN_PROGRESS
-> VARIANCE_ANALYSIS
-> UNDER_REVIEW
-> PENDING_APPROVAL
-> PUBLISHED
-> CLOSE_RECONCILIATION_PENDING
-> COSTING_CYCLE_CLOSED
```

Reglas:

1. abrir el ciclo no crea costos definitivos;
2. recopilar entradas no convierte una fuente en costo aprobado;
3. calcular no autoriza publicación;
4. las variaciones se explican antes de aprobación;
5. solo una versión aprobada y `PUBLISHED` puede usarse como referencia decisoria publicada;
6. el cierre exige fuentes, asignaciones, cálculos, variaciones y ajustes reconciliados;
7. cerrar un ciclo no reescribe costos históricos ni convierte estimaciones en hechos.

---

#### 7. Propiedad de fuentes y resultado económico

| Dominio | Fuente que conserva | NUMERA recibe | NUMERA no deberá hacer |
| --- | --- | --- | --- |
| ORIGO | compra, orden, proveedor, precio acordado, recepción comercial y documentos relacionados | bases de adquisición y componentes económicos autorizados | reescribir órdenes, recepciones o precios fuente |
| NEXO | movimiento, stock, lote físico, entrada, ubicación, custodia, remisión, devolución y costos unitarios observados en su dominio | movimientos reconciliables, cantidades, lotes y referencias de costo físico aplicables | crear o corregir movimientos para cuadrar costo |
| FOGO | receta/version, orden/lote, consumo, rendimiento, merma, reproceso, salida y disposición productiva | cantidades y resultados productivos aptos para valoración | alterar consumos, rendimiento o genealogía |
| PULSO | venta, precio comercial, descuento, devolución y evidencia comercial | ingreso realizado y referencias comerciales cuando corresponda al análisis posterior | convertir precio de venta en costo |
| NUMERA | método, selección de fuentes, composición, asignación, costo publicado, variación, conciliación y explicación económica | resultado económico reproducible | duplicar hechos físicos o comerciales de origen |

La propiedad económica de NUMERA no transfiere ownership de los hechos fuente.

---

#### 8. Unidad mínima de una determinación de costo

Toda determinación de costo deberá declarar, cuando aplique:

- identificador estable del resultado o corrida;
- método de costo;
- versión del método o política;
- estado del ciclo `VPROC-0054`;
- entidad legal o ámbito económico aplicable;
- centro de costo canónico;
- periodo y fecha de corte;
- moneda;
- producto y presentación;
- unidad de medida de valoración;
- lote o fuente física cuando aplique;
- cantidad valorizada;
- fuentes consumidas;
- componentes incluidos y excluidos;
- driver o regla de distribución cuando exista;
- importe total;
- costo unitario cuando sea definible;
- precisión y regla de redondeo;
- versión publicada de referencia cuando corresponda;
- evidencia de conciliación;
- relación con costo anterior, corrección o reversión cuando aplique.

Un valor sin método, fuente, versión, vigencia y alcance no se considerará costo canónico publicable.

---

#### 9. Taxonomía obligatoria de costos

Los siguientes conceptos permanecen distintos:

| Tipo | Definición objetivo | No equivale a |
| --- | --- | --- |
| adquisición | base económica reconocida de la compra o recepción de un material o bien | costo productivo completo |
| landed | adquisición más componentes adicionales elegibles necesarios para llevar el recurso hasta la condición o punto definido por la política | precio de compra aislado |
| estándar | referencia previa, versionada y publicada para planificación, control y comparación | costo real cerrado |
| promedio | promedio ponderado de unidades y costos elegibles bajo un alcance y corte declarados | promedio simple de precios |
| último | costo del último evento elegible reconocido bajo un alcance y corte declarados | costo promedio o estándar |
| real | costo reconciliado a partir de cantidades y componentes efectivamente observados y elegibles | estimación o presupuesto |
| productivo | costo atribuible al proceso de transformación y sus componentes autorizados | costo logístico |
| logístico | costo atribuible a distribución, transporte, manipulación, custodia u operación logística autorizada | merma productiva |
| merma | efecto económico visible de pérdida, descarte o desperdicio confirmado | consumo bueno oculto |
| interno | valoración gerencial usada para transferencias o análisis internos | venta, ingreso fiscal, gasto legal o precio de transferencia fiscal automático |

La existencia de uno de estos valores nunca autoriza usarlo como fallback silencioso de otro.

---

#### 10. Regla de selección de método

Cada cálculo o consumidor deberá declarar explícitamente qué método necesita.

Jerarquía obligatoria:

```text
METODO_DECLARADO
-> FUENTES_ELEGIBLES_DEL_METODO
-> VERSION_Y_VIGENCIA
-> CALCULO
-> REVISION
-> APROBACION
-> PUBLICACION
```

Queda prohibido:

- usar último costo porque no existe estándar;
- usar promedio porque falta real;
- usar gasto agregado como costo productivo;
- usar precio interno como costo sin política explícita;
- usar cero cuando una fuente esté ausente;
- cambiar de método durante una corrida sin crear una nueva versión o resultado trazable.

Si falta una entrada material, el resultado permanece no publicable o pendiente de reconciliación según el ciclo aplicable.

---

#### 11. Costo de adquisición

El costo de adquisición representa la base económica reconocida del recurso adquirido desde ORIGO y sus documentos o recepciones aplicables.

Contrato conceptual:

```text
COSTO_ADQUISICION
= BASE_COMERCIAL_RECONOCIDA
+/- AJUSTES_COMERCIALES_ELEGIBLES
```

Reglas:

1. precio acordado, recepción y documento deberán correlacionarse cuando el proceso lo exija;
2. una diferencia entre orden, recepción y documento no se absorbe silenciosamente en el costo;
3. impuestos, descuentos, recargos u otros componentes solo entran cuando una política económica o fiscal aprobada declare su tratamiento;
4. una devolución o nota posterior produce corrección correlacionada y no edición destructiva del origen;
5. la base observada `net` en estructuras actuales es evidencia AS-IS y no una regla universal por sí sola.

---

#### 12. Costo landed

El costo landed añade a la adquisición únicamente componentes adicionales elegibles y trazables definidos por una política publicada.

Contrato conceptual:

```text
COSTO_LANDED_TOTAL
= COSTO_ADQUISICION_TOTAL
+ COMPONENTES_LANDED_ELEGIBLES

COSTO_LANDED_UNITARIO
= COSTO_LANDED_TOTAL / CANTIDAD_ELEGIBLE
```

Reglas:

- cada componente adicional conserva fuente, periodo, moneda y evidencia;
- si el componente es directamente atribuible, se asigna directamente;
- si es compartido, utiliza pool y driver versionados;
- una cantidad cero o inválida no produce costo unitario cero: bloquea el cálculo unitario;
- no se incorporan automáticamente impuestos, transporte, seguros, almacenamiento u otros conceptos solo por su nombre; su elegibilidad depende de política aprobada;
- el cálculo no modifica el valor comercial ni la recepción de origen.

---

#### 13. Último costo

El último costo es el costo unitario del evento elegible más reciente dentro del alcance y fecha de corte declarados.

Reglas:

1. la recencia se determina sobre un evento económico elegible y reconocido, no por la última fila técnicamente escrita;
2. reintentos o duplicados no crean un nuevo último costo;
3. una reversión invalida o compensa su evento referenciado conforme al contrato de origen;
4. un evento posterior al corte no altera consultas históricas del corte anterior;
5. el método debe declarar producto, presentación, unidad, sede o ámbito cuando sean relevantes;
6. el último costo no se promedia ni se mezcla con estándar o real.

---

#### 14. Costo promedio

El costo promedio objetivo será ponderado por cantidad elegible, no un promedio aritmético simple de precios.

Para un alcance homogéneo:

```text
COSTO_PROMEDIO_UNITARIO
= SUM(CANTIDAD_ELEGIBLE_i * COSTO_UNITARIO_ELEGIBLE_i)
  / SUM(CANTIDAD_ELEGIBLE_i)
```

Reglas:

- cantidades y costos deberán estar expresados en unidad y moneda compatibles;
- entradas, devoluciones, reversos y ajustes conservan identidad y efecto correlacionado;
- el universo de eventos incluido queda congelado por fecha de corte;
- un denominador igual o menor que cero no produce un valor económico confirmado;
- la implementación posterior deberá declarar si el promedio se recalcula por evento, periodo u otro corte autorizado; no se mezclan esas modalidades silenciosamente;
- el promedio publicado conserva versión y conjunto de fuentes.

---

#### 15. Costo estándar

El costo estándar es una referencia económica previa, versionada y publicada que sirve para planificación, control, valorización gerencial y comparación contra resultados posteriores.

Una versión estándar podrá componerse de:

```text
MATERIALES_ESTANDAR
+ COMPONENTES_DIRECTOS_ESTANDAR_APROBADOS
+ ASIGNACIONES_ESTANDAR_APROBADAS
+ TRATAMIENTO_ESTANDAR_EXPLICITO_DE_MERMA_O_RENDIMIENTO
= COSTO_ESTANDAR_TOTAL
```

Cuando exista una cantidad de salida estándar válida:

```text
COSTO_ESTANDAR_UNITARIO
= COSTO_ESTANDAR_TOTAL / SALIDA_BUENA_ESTANDAR
```

Reglas:

1. cantidades estándar provienen de recetas, versiones, políticas o bases aprobadas;
2. el costo unitario estándar de cada entrada declara su propio método fuente;
3. cada versión tiene vigencia y fecha de publicación;
4. una nueva versión no revaloriza operaciones históricas por sobrescritura;
5. el tratamiento de merma o rendimiento debe evitar doble conteo entre numerador y denominador;
6. una referencia no publicada no se usa como estándar vigente;
7. cambiar un supuesto produce una nueva versión, no una edición retroactiva silenciosa.

---

#### 16. Costo real

El costo real se obtiene desde cantidades y componentes efectivamente observados, reconocidos y conciliados.

Contrato conceptual para producción:

```text
COSTO_REAL_PROCESO
= COSTO_DE_MATERIALES_REALMENTE_CONSUMIDOS
+ COMPONENTES_DIRECTOS_REALES_ELEGIBLES
+ ASIGNACIONES_REALES_APROBADAS
+ TRATAMIENTO_REAL_EXPLICITO_DE_MERMA_Y_REPROCESO
```

El costo unitario del producto bueno solo podrá publicarse cuando exista una salida buena conciliada y una política explícita para el tratamiento de pérdidas y reprocesos.

Reglas:

- consumo esperado no sustituye consumo real;
- reserva o entrega de material no sustituyen consumo definitivo;
- salida producida no sustituye disposición de calidad cuando esta sea necesaria;
- costo real no se inventa si faltan componentes materiales;
- una entrada tardía puede mantener el ciclo en conciliación o requerir ajuste posterior, nunca reescritura silenciosa;
- costo real económico no equivale automáticamente a costo contable oficial mientras `NUMERA-DOM-013` y el sistema externo conserven esa frontera.

---

#### 17. Costo productivo

El costo productivo mide la transformación y deberá conservar separados al menos:

- materiales efectivamente consumidos;
- componentes directos de transformación aprobados;
- asignaciones productivas compartidas aprobadas;
- rendimiento;
- merma y desperdicio;
- reproceso;
- salida buena resultante;
- variaciones contra referencia.

FOGO conserva orden, lote, receta, consumo, rendimiento, merma y reproceso; NUMERA calcula su efecto económico sin escribir esos hechos por duplicado.

Un lote no puede recibir costo productivo cerrado si su consumo, salida o disposición material permanece irreconciliable.

---

#### 18. Costo logístico

El costo logístico permanece separado del costo de transformación.

Podrá incluir componentes atribuibles a operaciones de distribución cuando sus fuentes y políticas estén aprobadas.

Reglas:

- un costo directamente asociado a ruta, movimiento, carga, entrega o destino se atribuye directamente cuando exista evidencia suficiente;
- únicamente el componente verdaderamente compartido se distribuye mediante driver;
- compartir instalación no autoriza cargar todo costo del lugar a Producción;
- una diferencia física de entrega no se reclasifica como costo logístico definitivo antes de investigación;
- el costo logístico podrá incorporarse a una valorización posterior solo si la política declara esa composición y evita doble conteo.

---

#### 19. Merma, desperdicio y reproceso

La pérdida económica deberá permanecer visible.

Contrato:

```text
CANTIDAD_ENTRANTE
= SALIDA_BUENA
+ CONSUMO_NO_RECUPERABLE_JUSTIFICADO
+ MERMA_O_DESPERDICIO
+ REPROCESO_EN_CURSO
+ DEVOLUCION
+ DIFERENCIA_PENDIENTE
```

La ecuación exacta depende del proceso físico propietario, pero ninguna categoría podrá utilizarse para ocultar otra.

Reglas:

1. merma confirmada conserva motivo, cantidad, unidad, etapa, lote y evidencia;
2. pérdida logística no se declara merma productiva sin evidencia;
3. reproceso conserva genealogía y no se considera producción nueva sin origen;
4. la política económica declara si una pérdida se absorbe, asigna, difiere o presenta separadamente para análisis gerencial;
5. el tratamiento legal o contable final no se presume desde esta clasificación económica;
6. una pérdida no desaparece aumentando silenciosamente el costo de salida buena sin una política trazable.

---

#### 20. Costo interno y transferencia interna

El costo interno es una valorización gerencial asociada a una transferencia o análisis intragrupo.

Queda separado de:

```text
PRECIO_INTERNO
PRECIO_DE_VENTA
INGRESO_LEGAL
GASTO_LEGAL
FACTURA
CUENTA_POR_COBRAR
CUENTA_POR_PAGAR
```

Reglas:

- la política de transferencia deberá indicar qué método de costo sirve como base;
- un precio interno manual no redefine el costo económico de origen;
- una lista interna puede servir como referencia gerencial si está vigente y autorizada, pero no se convierte por inferencia en precio fiscal;
- la misma transferencia física no crea un segundo movimiento de inventario en NUMERA;
- una corrección de costo interno conserva la transferencia y versión originalmente utilizadas.

---

#### 21. Costos directos y costos compartidos

La atribución directa tiene prioridad.

```text
SI EXISTE CAUSALIDAD DIRECTA VERIFICABLE
-> ATRIBUCION DIRECTA

SI EL COSTO BENEFICIA REALMENTE A MULTIPLES DESTINOS
-> POOL + DRIVER VERSIONADO

SI NO EXISTE BASE SUFICIENTE
-> PENDIENTE DE ASIGNACION
```

Queda prohibido enviar un costo directo a un pool únicamente para facilitar el reparto.

---

#### 22. Contrato de pool y driver

Todo costo compartido deberá conservar:

- identidad del pool;
- propósito;
- periodo;
- entidad;
- moneda;
- monto distribuible;
- fuente o conjunto de fuentes;
- destinos elegibles;
- driver;
- definición y unidad del driver;
- fuente de la base;
- versión;
- vigencia;
- justificación causal;
- cálculo por destino;
- redondeos y residual;
- revisión;
- aprobación;
- publicación;
- relación con reversión o versión sustituta.

Contrato:

```text
ASIGNACION_DESTINO_i
= MONTO_DISTRIBUIBLE * BASE_DESTINO_i / BASE_TOTAL_ELEGIBLE
```

La fórmula solo aplica cuando el driver sea proporcional y esa forma haya sido aprobada. Otros drivers deberán declarar su propia fórmula reproducible.

La suma de asignaciones deberá reconciliar con el monto distribuible. Cualquier residual de redondeo permanecerá explícito y controlado.

---

#### 23. Moneda y unidad de medida

No se combinarán costos incompatibles por unidad o moneda.

Reglas:

- toda cantidad conserva unidad de origen y unidad de valoración;
- una conversión utiliza la relación canónica vigente o snapshot aplicable;
- todo costo declara moneda;
- si una conversión monetaria es necesaria, conservará fuente, tasa, fecha, versión y política aplicable;
- no se mezclan importes de monedas distintas en una suma sin conversión explícita;
- cambios futuros de unidad o tasa no reescriben resultados históricos;
- pérdida de precisión por conversión deberá ser visible dentro de la regla de redondeo.

Esta tarea no define una fuente concreta de tasa de cambio.

---

#### 24. Precisión y redondeo

El cálculo económico deberá conservar precisión suficiente durante sus pasos internos y aplicar redondeo únicamente en puntos declarados por la política.

Queda prohibido:

- redondear cada componente anticipadamente sin necesidad contractual;
- ocultar residuales de distribución;
- usar diferencias de redondeo para cuadrar una conciliación material;
- cambiar la regla de precisión sin nueva versión.

La presentación visual puede usar una precisión distinta de la precisión de cálculo, siempre que no altere el valor canónico.

---

#### 25. Regla canónica de variación de costo

Toda variación monetaria de costo comparará bases realmente comparables.

Contrato general:

```text
VARIACION_DE_COSTO
= COSTO_ACTUAL_COMPARABLE
- COSTO_REFERENCIA_COMPARABLE
```

Convención de signo para costos:

```text
> 0  = DESFAVORABLE: costo actual superior a referencia
= 0  = NEUTRA
< 0  = FAVORABLE: costo actual inferior a referencia
```

La etiqueta favorable o desfavorable aplica al impacto de costo, no sustituye la explicación operacional del origen.

Si periodo, cantidad, alcance, moneda, unidad, producto o método no son comparables, no se publicará una única variación sin normalizar o separar previamente esos efectos.

---

#### 26. Familias de variación

El modelo deberá poder distinguir al menos:

| Familia | Base explicativa |
| --- | --- |
| adquisición/precio | diferencia entre costo de adquisición reconocido y referencia comparable |
| consumo | diferencia económica derivada de cantidad consumida frente a base comparable |
| rendimiento | efecto económico de salida buena distinta a la esperada para entradas comparables |
| merma/desperdicio | diferencia entre pérdida real y pérdida de referencia aprobada |
| logística | diferencia entre costo logístico real y referencia comparable |
| asignación compartida | diferencia explicada por monto de pool, base, driver o destinos frente a versión comparable |
| transferencia interna | diferencia entre valoración interna aplicada y referencia aprobada, sin convertirla en venta |
| costo total | diferencia residual entre costo actual total y costo de referencia total para el mismo alcance |

Una misma diferencia no deberá contabilizarse simultáneamente en dos familias.

---

#### 27. Reconciliación de variaciones

Las variaciones explicadas deberán reconciliar con la variación total del mismo alcance.

```text
VARIACION_TOTAL
= SUM(VARIACIONES_EXPLICADAS)
+ RESIDUAL_NO_EXPLICADO
```

Reglas:

- el residual no explicado permanece visible;
- un residual material impide declarar el análisis completamente reconciliado;
- redondeos se separan de diferencias empresariales;
- no se compensan variaciones favorables y desfavorables para ocultar causas;
- cada componente conserva fuente y propietario operacional;
- NUMERA explica el efecto económico sin modificar la evidencia de origen.

Esta tarea no fija umbrales monetarios de materialidad.

---

#### 28. Comparación estándar versus real

La comparación estándar-real deberá usar el mismo producto, unidad, moneda, centro o alcance, periodo y cantidad comparable o declarar el ajuste de volumen necesario.

Queda prohibido comparar:

- costo estándar unitario con costo real total;
- periodos diferentes sin declararlo;
- versiones estándar distintas como si fueran una sola;
- costos de unidades incompatibles;
- una referencia de Producción con un costo consolidado que incluya logística sin separar componentes.

La comparación conserva siempre:

```text
STANDARD_VERSION_USED
ACTUAL_SOURCE_SET
COMPARISON_SCOPE
CUT_OFF
VARIANCE_AMOUNT
VARIANCE_EXPLANATION
```

---

#### 29. Variaciones operacionales versus variaciones económicas

FOGO, NEXO y ORIGO conservan las diferencias operacionales de sus dominios.

NUMERA conserva su efecto monetario y relación analítica.

Ejemplos:

- cantidad recibida diferente a orden: ORIGO conserva la diferencia comercial; NUMERA mide efecto económico cuando sea reconocible;
- consumo diferente a receta: FOGO conserva la desviación productiva; NUMERA valora su efecto;
- stock diferente a conteo: NEXO conserva observación, investigación y ajuste; NUMERA no crea costo definitivo antes del movimiento autorizado;
- entrega o retorno diferente: NEXO conserva la diferencia logística; NUMERA valora únicamente hechos reconciliados.

No se crea una segunda fuente operacional dentro de NUMERA.

---

#### 30. Reversiones, correcciones y eventos tardíos

Ningún costo publicado se corrige mediante sobrescritura silenciosa.

Reglas:

1. una corrección conserva el resultado original;
2. la nueva información referencia el origen afectado;
3. una reversión mantiene identidad de aquello que compensa;
4. un evento tardío después de publicación activa revisión o conciliación conforme a `VPROC-0054`;
5. si el periodo ya está cerrado, el tratamiento de ajuste, periodo de reconocimiento o reapertura corresponde además a `NUMERA-DOM-011` y `NUMERA-DOM-014`;
6. una nueva versión estándar no cambia el estándar históricamente utilizado;
7. no se recalcula historia únicamente porque cambió una política vigente.

---

#### 31. Idempotencia y duplicación

Cada fuente económica utilizada deberá conservar una identidad estable suficiente para impedir doble efecto.

Queda prohibido:

- contar dos veces el mismo recibo por reintento;
- valorizar dos veces el mismo movimiento;
- considerar entrada y replay como dos fuentes de costo;
- duplicar una merma por llegar desde FOGO y NEXO sin correlación;
- convertir una reversión en un segundo costo positivo;
- registrar manualmente un costo ya derivado de un hecho canónico sin una excepción explícita y reconciliable.

La conciliación debe detectar fuente sin efecto y efecto sin fuente.

---

#### 32. Ausencia de datos y fallback

La ausencia de costo no equivale a cero.

Si una fuente obligatoria no está disponible:

- el movimiento físico puede continuar cuando su dominio propietario lo permita;
- el costo económico permanece pendiente, no confirmado o no publicable;
- la interfaz futura deberá distinguir ausencia, pendiente, estimación y valor publicado;
- no se sustituye automáticamente por último, promedio, estándar o precio interno;
- no se inventa un valor para cerrar una distribución, margen o reporte.

---

#### 33. Frontera con precio, margen y punto de equilibrio

Precio, costo y margen permanecen conceptos diferentes.

```text
PRECIO != COSTO
MARGEN_OBJETIVO != MARGEN_REALIZADO
MARGEN_BRUTO_OBJETIVO != MARGEN_DE_CONTRIBUCION_POR_DEFECTO
```

Para cualquier cálculo de punto de equilibrio:

- la base de costos fijos y variables deberá provenir de una clasificación económica versionada y trazable;
- un `target_gross_margin_pct` no podrá usarse como ratio de contribución sin demostrar su equivalencia para el alcance calculado;
- el componente variable deberá estar incorporado explícitamente en el método o en el ratio utilizado;
- ausencia de margen aplicable produce ausencia de cálculo, no cero;
- la suma de umbrales por centro no se presentará como punto de equilibrio consolidado sin una fórmula de consolidación aprobada.

La definición final de ingreso realizado, rentabilidad multidimensional y consolidación pertenece a `NUMERA-DOM-008`.

---

#### 34. Relación con presupuesto y escenarios

Costo real, costo estándar, presupuesto, forecast y escenario son objetos diferentes.

Reglas:

- un presupuesto no se usa como costo real;
- un estándar puede alimentar presupuesto, pero conserva su versión independiente;
- cambiar un escenario no altera costos publicados;
- una simulación puede usar copias referenciales de costos, nunca editar los hechos base;
- `NUMERA-DOM-018` conservará el motor de escenarios, versiones de precios, costos y supuestos;
- esta tarea define los contratos de costo que ese motor deberá consumir.

---

#### 35. Tratamiento de fuentes AS-IS existentes

Las estructuras observadas como:

```text
inventory_cost_policies
product_cost_events
procurement_supplier_product_costs
inventory_entry_items.stock_unit_cost
inventory_movements.stock_unit_cost
internal_price_lists
internal_price_list_items
```

son fuentes o artefactos técnicos existentes, no el motor NUMERA objetivo por sí solos.

Reglas de transición:

- no se descartan por existir antes del contrato objetivo;
- no se declaran canónicas para todos los métodos sin reconciliación;
- sus identidades, bases y valores se consumen únicamente cuando un contrato aprobado los haga elegibles;
- `net` y `manual` observados permanecen evidencia AS-IS, no valores universales objetivo;
- una transición física futura deberá demostrar paridad, deduplicación y compatibilidad antes de retirar o reemplazar una fuente histórica.

---

#### 36. Matriz de método, propósito y publicación

| Método / componente | Propósito principal | Fuente dominante | Publicación |
| --- | --- | --- | --- |
| adquisición | base reconocida de compra | ORIGO + recepción/documento aplicable | cuando la fuente económica esté validada |
| landed | costo hasta condición/punto definido | adquisición + componentes elegibles | después de asignaciones y conciliación |
| último | referencia del evento elegible más reciente | eventos de costo válidos | por corte y alcance declarados |
| promedio | referencia ponderada por cantidad | eventos elegibles de inventario/costo | por corte, unidad y moneda compatibles |
| estándar | planificación y control | política versionada + fuentes aprobadas | antes de uso como referencia vigente |
| real | costo observado y reconciliado | hechos físicos + económicos reales | después de revisión y aprobación |
| productivo | transformación | FOGO + fuentes económicas | cuando lote, consumo y salida sean conciliables |
| logístico | distribución/custodia/entrega | NEXO + fuentes económicas | cuando operación y componentes sean conciliables |
| merma | pérdida visible | FOGO/NEXO según etapa + valoración | cuando cantidad, motivo y fuente estén confirmados |
| interno | valorización gerencial intragrupo | costo publicado + política interna | sin crear ingreso/gasto legal por defecto |

---

#### 37. Casos excepcionales obligatorios

El diseño físico posterior deberá tratar explícitamente:

1. compra recibida con costo aún no confirmado;
2. devolución después de valorización;
3. recepción parcial con costos distintos;
4. cambio de presentación o unidad;
5. costo en moneda diferente;
6. consumo sin costo elegible publicado;
7. producción cerrada físicamente con costo pendiente;
8. lote con salida buena igual a cero;
9. merma detectada después del cierre productivo;
10. reproceso que consume producto previamente valorizado;
11. movimiento interno con estándar vigente pero real pendiente;
12. costo real publicado después de una transferencia interna;
13. componente logístico directo y componente logístico compartido en la misma operación;
14. pool con base total igual a cero;
15. driver corregido después de publicación;
16. residual de asignación no explicado;
17. evento fuente duplicado o fuera de orden;
18. reversión de un costo ya consumido por un reporte;
19. cambio de estándar durante el mismo periodo;
20. evento tardío después de cierre de periodo.

Ningún caso se resolverá con valor cero inventado, edición destructiva o doble registro manual.

---

#### 38. Hallazgos y propietarios de salida

| Hallazgo | Bloquea esta definición | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| motor de costos NUMERA aún no está materializado | no | paquete físico NUMERA aplicable | consumidores usan métodos, fuentes y versiones definidas aquí sin doble escritura |
| fuentes AS-IS no están integradas al motor NUMERA | no | integración/DB física aplicable | contratos correlacionados e idempotentes entregan las fuentes elegibles |
| punto de equilibrio vigente usa proxy no demostrado | no | `NUMERA-DOM-008`, UX y materialización aplicable | ingreso y costo compatibles producen método aprobado y trazable |
| rentabilidad material continúa ausente | no | `NUMERA-DOM-008` | ingreso realizado y costos publicados se combinan por dimensiones aprobadas |
| reglas de periodos cerrados y eventos tardíos requieren contrato específico | no | `NUMERA-DOM-011`, `NUMERA-DOM-014` | ajuste, reapertura, diferencia y conciliación quedan gobernados |
| tratamiento contable/fiscal oficial no se decide por costo gerencial | no | `NUMERA-DOM-013`, `NUMERA-DOM-017` | frontera externa o arquitectura contable formal aprobada |
| escenarios requieren aislamiento de hechos reales | no | `NUMERA-DOM-018` | simulaciones versionadas no alteran datos publicados |

---

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba. El contrato vigente ya cubre métodos, fuentes, versiones, tipos de costo, conciliación, idempotencia, producción, inventario, logística, punto de equilibrio y rentabilidad.

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

---

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro Canónico:

- `TREQ-NUMERA-001` para reconciliación de costos, indicadores y reportes con hechos fuente sin doble registro;
- `TREQ-NUMERA-002` para identidad, dimensiones, moneda, fechas, fuente, correlación y correcciones no destructivas;
- `TREQ-NUMERA-004` para método, entradas, versión, vigencia, separación de tipos de costo, distribución, punto de equilibrio y rentabilidad;
- `TREQ-NUMERA-019` para no presentar ausencia de margen o cálculo como un valor económico confirmado;
- `TREQ-NUMERA-020` para mantener separados ingreso esperado, gasto real, presupuesto y variación;
- `TREQ-FOGO-004` para consumo, producción, rendimiento, merma, reproceso, genealogía y cierre productivo;
- `TREQ-NEXO-011` para movimientos físicos, costos unitarios relacionados, idempotencia y ausencia de doble contabilización;
- `TREQ-INTEGRATION-013` para la cadena producción-calidad-inventario-costo correlacionada e idempotente;
- `TREQ-INTEGRATION-016` para logística y costo como eventos correlacionados sin doble efecto;
- `TREQ-INTEGRATION-017` para llegada de hechos a NUMERA mediante contratos versionados, correlacionados e idempotentes.

Esta enumeración es trazabilidad reutilizada y no actualiza 04A.

---

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de repositorio para esta preparación documental anticipada |
| LOCAL | NOT_EXECUTED | no se modificó ni validó el checkout local del usuario durante la redacción del artefacto |
| REMOTA | PASS | se verificaron `main`, continuidad, archivo propietario, 04A NUMERA, `OPS-CST-001`, `NUMERA-AUD-008`, `CAP-SCOPE-012`, `VPROC-0054`, eventos de proceso, ownership funcional y requisitos relacionados mediante lectura remota de solo lectura |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron compras, consumos, producción, movimientos, valorizaciones, distribuciones o cierres reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; la tarea no autoriza materialización física |

---

#### 42. Criterios de aceptación

`NUMERA-DOM-007` queda aceptable cuando:

1. adquisición, landed, estándar, promedio, último, real, productivo, logístico, merma e interno tienen significados separados;
2. ningún método actúa como fallback silencioso de otro;
3. toda determinación de costo declara método, versión, vigencia, alcance y fuentes;
4. adquisición y landed conservan componentes y elegibilidad explícitos;
5. promedio es ponderado por cantidad y no promedio simple de precios;
6. último costo proviene del último evento económico elegible bajo un corte declarado;
7. costo estándar conserva versión publicada y no reescribe historia;
8. costo real usa hechos observados y conciliados sin inventar faltantes;
9. costo productivo y logístico permanecen separados;
10. merma y reproceso permanecen visibles;
11. costo interno no crea venta, ingreso o gasto legal por defecto;
12. atribución directa precede distribución compartida;
13. pools y drivers son versionados, explicables, aprobables y reversibles;
14. moneda, unidad, precisión y redondeo están gobernados;
15. la variación usa bases comparables y convención de signo explícita;
16. las variaciones explicadas reconcilian con la variación total o dejan residual visible;
17. diferencias operacionales siguen en sus dominios propietarios;
18. correcciones y eventos tardíos no sobrescriben resultados publicados;
19. ausencia de datos no produce costo cero ni fallback automático;
20. margen objetivo no se trata como margen de contribución sin demostración;
21. fuentes AS-IS quedan reconocidas sin elevarse automáticamente a motor objetivo;
22. no se crean ni modifican requisitos de prueba;
23. no se realizan cambios físicos;
24. `NUMERA-DOM-008` recibe costos trazables y publicados para definir rentabilidad.

---

#### 43. Límites

Esta tarea no:

- implementa el motor de costos;
- modifica `inventory_cost_policies`;
- modifica `product_cost_events`;
- modifica costos de proveedor;
- cambia `stock_unit_cost`;
- modifica listas o precios internos;
- cambia compras, recepciones o documentos;
- modifica recetas, lotes, consumos, rendimientos, mermas o reprocesos;
- crea movimientos de inventario;
- crea o modifica centros de costo;
- fija porcentajes, valores estándar, tarifas, tasas o drivers empresariales concretos;
- decide tratamiento tributario de componentes de costo;
- implementa asientos contables;
- define rentabilidad final por dimensión;
- define ingresos realizados;
- publica un punto de equilibrio consolidado;
- define workflows de cierre o reapertura;
- crea permisos;
- modifica Supabase;
- modifica 04A;
- desarrolla `NUMERA-DOM-008`.

---

#### 44. Handoff a NUMERA-DOM-008

La siguiente tarea recibe:

```text
COST_ENGINE_OWNER = NUMERA
COST_SOURCE_FACT_OWNERS = PRESERVED
COST_METHOD_FALLBACK_SILENT = FORBIDDEN
ACQUISITION_LANDED_STANDARD_AVERAGE_LAST_REAL_PRODUCTIVE_LOGISTIC_WASTE_INTERNAL = DISTINCT
AVERAGE_COST_METHOD = QUANTITY_WEIGHTED
STANDARD_COST = VERSIONED_PUBLISHED_REFERENCE
REAL_COST = RECONCILED_OBSERVED_COST
MISSING_COST = NOT_ZERO
DIRECT_ATTRIBUTION_PRECEDES_SHARED_ALLOCATION = YES
SHARED_ALLOCATION_REQUIRES_VERSIONED_DRIVER = YES
INTERNAL_COST_IS_LEGAL_REVENUE_OR_EXPENSE_BY_DEFAULT = NO
COST_VARIANCE = ACTUAL_COMPARABLE_MINUS_REFERENCE_COMPARABLE
POSITIVE_COST_VARIANCE = UNFAVORABLE
HISTORICAL_REVALUATION_BY_SILENT_OVERWRITE = FORBIDDEN
TARGET_GROSS_MARGIN_IS_CONTRIBUTION_MARGIN_BY_DEFAULT = NO
COST_RESULTS_REQUIRE_METHOD_VERSION_SCOPE_SOURCE_AND_CUTOFF = YES
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
```

`NUMERA-DOM-008` deberá combinar ingreso realizado y costos trazables sobre dimensiones aprobadas, sin reabrir los métodos de costo definidos aquí.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-008 — Definir rentabilidad por empresa, sede, canal, producto y periodo`
### ✅ NUMERA-DOM-008 — Definir rentabilidad por empresa, sede, canal, producto y periodo

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones
**Tarea siguiente:** NUMERA-DOM-009 — Definir caja, bancos y conciliaciones que pertenezcan al alcance aprobado
**Tipo de tarea:** definición documental del modelo analítico de rentabilidad de NUMERA, sus dimensiones obligatorias de empresa, sede, canal, producto y periodo, sus fuentes de ingreso realizado y costo trazable, fórmulas de margen y resultado gerencial, reglas de consolidación, eliminación de doble conteo intragrupo, publicación, comparabilidad, completitud y conciliación, preservando fronteras con venta, costo, caja, bancos, fiscalidad, contabilidad formal, cierres y escenarios; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_DOMINIO_Y_MODELO_FINANCIERO.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica ventas, costos, centros de costo, caja, bancos, periodos, presupuestos, escenarios, tablas, vistas, RPC, contratos, integraciones, permisos, RLS, Supabase, reportes runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato económico y dimensional con el que NUMERA podrá medir rentabilidad real sin confundir ingreso esperado con ingreso realizado, gasto agregado con costo trazable, transferencia interna con venta externa, caja con resultado económico o una suma de métricas locales con una consolidación válida.

La tarea cierra específicamente estas brechas canónicas:

- la superficie actual de rentabilidad utiliza `expected_revenue` y gasto, no ingreso realizado y costo completo trazable;
- no existe cálculo material de utilidad o margen realizado;
- la vista actual no demuestra consolidación por empresa, sede, canal, producto y periodo;
- empresa, marca, sede, área, canal y centro de costo no pueden mezclarse como si fueran la misma dimensión;
- las transferencias internas pueden producir doble conteo si se presentan como ingreso del origen y costo del destino dentro de una misma consolidación;
- los resultados deben conservar fórmula, método, versión, vigencia, fuentes, corte y evidencia suficientes para ser reproducibles.

El resultado es una definición documental de rentabilidad analítica y gerencial. No constituye contabilidad formal, cálculo fiscal, estado financiero oficial ni implementación física.

---

#### 2. Naturaleza y topología

La topología de `NUMERA-DOM-008` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea define el modelo una sola vez;
- no crea una instancia física propia;
- no modifica datos ni estructuras persistidas;
- no recalcula periodos históricos;
- no publica dashboards ni RPC;
- no define todavía caja, bancos, conciliaciones bancarias, cierre, reapertura, fiscalidad o contabilidad formal;
- no crea escenarios ni simulaciones;
- no autoriza fórmulas alternativas locales por aplicación o reporte.

---

#### 3. Handoff recibido de NUMERA-DOM-007

La predecesora deja congelado:

```text
COST_ENGINE_OWNER = NUMERA
COST_SOURCE_FACT_OWNERS = PRESERVED
COST_METHOD_FALLBACK_SILENT = FORBIDDEN
ACQUISITION_LANDED_STANDARD_AVERAGE_LAST_REAL_PRODUCTIVE_LOGISTIC_WASTE_INTERNAL = DISTINCT
AVERAGE_COST_METHOD = QUANTITY_WEIGHTED
STANDARD_COST = VERSIONED_PUBLISHED_REFERENCE
REAL_COST = RECONCILED_OBSERVED_COST
MISSING_COST = NOT_ZERO
DIRECT_ATTRIBUTION_PRECEDES_SHARED_ALLOCATION = YES
SHARED_ALLOCATION_REQUIRES_VERSIONED_DRIVER = YES
INTERNAL_COST_IS_LEGAL_REVENUE_OR_EXPENSE_BY_DEFAULT = NO
COST_VARIANCE = ACTUAL_COMPARABLE_MINUS_REFERENCE_COMPARABLE
POSITIVE_COST_VARIANCE = UNFAVORABLE
HISTORICAL_REVALUATION_BY_SILENT_OVERWRITE = FORBIDDEN
TARGET_GROSS_MARGIN_IS_CONTRIBUTION_MARGIN_BY_DEFAULT = NO
COST_RESULTS_REQUIRE_METHOD_VERSION_SCOPE_SOURCE_AND_CUTOFF = YES
COST_CENTER_CATALOG = SINGLE_SHARED_CANONICAL_CATALOG
```

Esta tarea usa exclusivamente costos trazables bajo ese contrato y no redefine los métodos de costo.

---

#### 4. Handoff recibido de NUMERA-DOM-002

Para ventas se conserva:

```text
INGRESO_ESPERADO != INGRESO_REALIZADO
VENTA != PAGO
VENTA != CAJA
VENTA != ENTREGA
VENTA != DOCUMENTO_FISCAL
VENTA != HECHO_ECONOMICO
HECHO_ECONOMICO != ASIENTO_CONTABLE
```

El ingreso utilizado para rentabilidad deberá provenir de hechos económicos reconocidos y conciliables, correlacionados con la fuente comercial propietaria. Cotizaciones, pedidos abiertos, preparación, pagos autorizados, cierres de caja, documentos pendientes o expectativas comerciales no sustituyen ingreso realizado.

---

#### 5. Handoff recibido de OPS-CST-001

Se conserva la regla empresarial:

```text
INGRESO EXTERNO REALIZADO
- COSTO TRAZABLE DEL PRODUCTO RECIBIDO
- COSTOS DIRECTOS DE LA SEDE
- COSTOS COMPARTIDOS APROBADOS
= RESULTADO GERENCIAL RECONCILIABLE
```

También permanecen vigentes:

- una transferencia interna no se suma como ingreso del grupo;
- el mismo producto no genera ingreso nuevamente por el solo traslado interno;
- Producción puede medirse por costo, rendimiento, merma, variación y eficiencia sin inventar una venta interna;
- Distribución puede medirse por costo logístico, servicio, diferencia y eficiencia sin inventar margen comercial;
- una vista consolidada elimina doble conteo intragrupo;
- una operación entre entidades legales distintas no se clasifica automáticamente como simple transferencia interna si el tratamiento legal todavía no está definido.

---

#### 6. Proceso económico propietario

La rentabilidad pertenece al ciclo `VPROC-0054 — Gestionar costos, distribución, presupuesto, cierre y rentabilidad con reglas versionadas`, propiedad funcional de NUMERA.

Estados relevantes:

```text
COSTING_CYCLE_OPENED
-> INPUTS_COLLECTING
-> CALCULATION_IN_PROGRESS
-> VARIANCE_ANALYSIS
-> UNDER_REVIEW
-> PENDING_APPROVAL
-> PUBLISHED
-> CLOSE_RECONCILIATION_PENDING
-> COSTING_CYCLE_CLOSED
```

Reglas:

1. recopilar ingresos y costos no equivale a rentabilidad publicada;
2. un cálculo en curso no se usa como resultado oficial o decisorio sin identificar su estado;
3. la revisión verifica fuentes, supuestos, asignaciones, dimensiones y excepciones;
4. solo una versión aprobada y `PUBLISHED` puede presentarse como resultado publicado;
5. `COSTING_CYCLE_CLOSED` exige conciliación del periodo sin convertir estimaciones en hechos ni reescribir historia.

---

#### 7. Definición de rentabilidad en esta tarea

Para esta tarea, rentabilidad es un resultado analítico económico reproducible que compara ingreso externo realizado con costos trazables bajo un alcance dimensional y temporal explícito.

No equivale automáticamente a:

- saldo de caja;
- saldo bancario;
- flujo de efectivo;
- utilidad contable neta;
- utilidad fiscal;
- EBITDA;
- presupuesto;
- forecast;
- escenario;
- margen objetivo;
- precio interno;
- valor de una transferencia interna;
- suma de ingresos esperados.

Las métricas contables o fiscales que requieran reglas adicionales deberán conservar su propio propietario posterior.

---

#### 8. Capas obligatorias del resultado

El modelo deberá mantener separadas al menos estas capas:

| Capa | Fórmula conceptual | Uso |
| --- | --- | --- |
| ingreso realizado analítico | efectos económicos de venta reconocidos y conciliables, netos de efectos comerciales compensatorios aplicables | base de ingresos reales |
| costo trazable del producto | costo publicado aplicable a las unidades o líneas comercializadas bajo método y versión declarados | costo directo del producto |
| margen bruto analítico | ingreso realizado analítico menos costo trazable del producto | análisis de producto, sede y canal antes de otros costos operativos |
| costos directos atribuibles | costos económicos directamente causados por la dimensión analizada | resultado gerencial |
| costos compartidos asignados | porción aprobada de pools compartidos mediante drivers versionados | resultado gerencial cuando corresponda |
| resultado gerencial | ingreso realizado menos costo de producto, costos directos y costos compartidos aplicables | lectura económica no contable formal |
| tasa de margen | resultado seleccionado dividido por ingreso realizado comparable, cuando el denominador sea válido | indicador porcentual explícitamente definido |

No se utilizará la etiqueta genérica `rentabilidad` sin identificar qué capa o fórmula representa.

---

#### 9. Fórmulas canónicas mínimas

Cuando las entradas sean completas y comparables:

```text
MARGEN_BRUTO_ANALITICO
= INGRESO_REALIZADO_ANALITICO
- COSTO_TRAZABLE_PRODUCTO
```

```text
RESULTADO_GERENCIAL
= INGRESO_REALIZADO_ANALITICO
- COSTO_TRAZABLE_PRODUCTO
- COSTOS_DIRECTOS_ATRIBUIBLES
- COSTOS_COMPARTIDOS_ASIGNADOS
```

Para una tasa basada en el resultado gerencial:

```text
TASA_RESULTADO_GERENCIAL
= RESULTADO_GERENCIAL / INGRESO_REALIZADO_ANALITICO
```

solo cuando:

```text
INGRESO_REALIZADO_ANALITICO != 0
```

Si el denominador es cero, ausente o no comparable, la tasa no se convierte en cero ni infinito; permanece no calculable bajo esa fórmula.

---

#### 10. Margen bruto, margen de contribución y resultado gerencial

Los conceptos permanecen separados.

`MARGEN_BRUTO_ANALITICO` usa ingreso realizado y costo trazable del producto bajo la definición publicada.

`MARGEN_DE_CONTRIBUCION` solo podrá existir cuando se haya definido y trazado qué costos variables corresponden al análisis. No se obtiene automáticamente de `target_gross_margin_pct`.

`RESULTADO_GERENCIAL` incorpora los costos directos y compartidos autorizados definidos por el alcance.

Queda prohibido:

- usar el margen objetivo como margen real;
- usar margen bruto como margen de contribución sin demostrar la equivalencia;
- presentar resultado gerencial como utilidad contable neta;
- comparar porcentajes calculados sobre bases distintas como si fueran la misma métrica.

---

#### 11. Ingreso realizado utilizado por rentabilidad

El numerador de ingreso deberá derivarse de hechos económicos reconocidos y conciliables provenientes de ventas externas.

Debe conservar, cuando aplique:

- identidad estable del hecho económico;
- identidad de venta o compromiso fuente;
- entidad o empresa aplicable;
- sede;
- canal;
- producto o presentación;
- cantidad;
- moneda;
- fecha de ocurrencia;
- fecha económica o de reconocimiento;
- periodo;
- importe realizado;
- descuentos, devoluciones, anulaciones o compensaciones correlacionadas;
- referencias de pago, entrega y documento como evidencias separadas;
- fuente y versión del snapshot comercial.

Un total agregado sin lineage suficiente no reemplaza estas fuentes.

---

#### 12. Efectos correctivos sobre ingreso

Cancelación, anulación, devolución, reembolso y compensación conservan sus semánticas separadas.

Para rentabilidad:

- un ingreso reconocido nunca se borra para corregir la historia;
- un efecto inverso o compensatorio autorizado referencia el hecho original;
- una devolución física no determina por sí sola el importe monetario a revertir;
- un reembolso no prueba por sí solo anulación total de la venta;
- las métricas del periodo conservan el criterio temporal aplicable y la trazabilidad de ajustes tardíos;
- el resultado publicado conserva la versión que incorporó cada corrección.

El tratamiento de cierres, periodos bloqueados y reaperturas pertenece a `NUMERA-DOM-011` y `NUMERA-DOM-014` según corresponda.

---

#### 13. Costo trazable utilizado por rentabilidad

Todo costo utilizado deberá cumplir el contrato de `NUMERA-DOM-007`.

Como mínimo deberá declarar:

- método;
- versión;
- vigencia;
- alcance;
- producto/presentación o destino económico;
- unidad;
- cantidad valorizada;
- moneda;
- fuente;
- fecha de corte;
- estado de publicación;
- evidencia de conciliación.

No se aceptan como costo trazable de rentabilidad:

- gasto agregado sin relación causal suficiente;
- precio de venta;
- precio interno sin política aplicable;
- costo cero inventado;
- último costo usado silenciosamente en lugar de otro método;
- costo pendiente presentado como real;
- movimiento físico sin valoración económica aplicable.

---

#### 14. Regla de completitud

Una rentabilidad publicada requiere que sus entradas materiales estén completas para el alcance declarado.

Como mínimo se deberá poder distinguir:

```text
COMPLETE
INCOMPLETE_MISSING_REVENUE
INCOMPLETE_MISSING_COST
INCOMPLETE_PENDING_ALLOCATION
INCOMPLETE_DIMENSION_CONFLICT
INCOMPLETE_RECONCILIATION
```

Estas etiquetas expresan condiciones conceptuales del resultado y no crean por esta tarea nuevos estados de proceso persistidos.

Reglas:

1. falta de costo no equivale a costo cero;
2. falta de ingreso no equivale a ingreso cero;
3. una asignación compartida pendiente no se sustituye por un porcentaje inventado;
4. un conflicto de entidad, sede, canal, producto o periodo no se resuelve por nombre visible;
5. una vista parcial deberá identificarse como parcial y no publicarse como consolidación completa.

---

#### 15. Dimensión empresa

La dimensión empresa deberá usar una identidad canónica organizacional aplicable y no inferirse desde marca, sede, canal o centro de costo.

Reglas:

- empresa o entidad, marca, sede, área, canal y centro de costo permanecen dimensiones distintas;
- una marca visible no demuestra por sí sola la entidad económica propietaria del hecho;
- un cambio de nombre comercial no reatribuye historia;
- una consolidación de varias empresas deberá declarar explícitamente su alcance y reglas de eliminación;
- una operación entre entidades distintas no se reclasifica como interna por pertenecer al mismo grupo empresarial si su tratamiento legal no está resuelto.

La frontera contable y fiscal de operaciones intercompañía permanece reservada a `NUMERA-DOM-013` y `NUMERA-DOM-017`.

---

#### 16. Dimensión sede

La sede de rentabilidad deberá provenir de la identidad canónica vinculada al hecho comercial o económico aplicable.

Reglas:

- sede no equivale a empresa, marca, canal o centro de costo;
- una venta se atribuye a la sede comercial que corresponde al hecho fuente, no a la sede que consulta el reporte;
- costos centrales solo llegan a una sede mediante atribución directa o distribución aprobada;
- compartir instalación física no obliga a mezclar responsabilidades económicas;
- una sede sin ingreso externo puede mostrar costos y eficiencia, pero no se fuerza un margen comercial inexistente.

---

#### 17. Dimensión canal

El canal deberá conservar la identidad normalizada del origen comercial.

Podrán existir canales internos o externos definidos por los dominios comerciales, pero NUMERA no los crea ni renombra.

Reglas:

- una misma venta visible en canal externo, PULSO y una proyección analítica se cuenta una sola vez;
- una comisión o costo del canal se trata como costo separado cuando exista hecho económico y atribución válida;
- cambiar el mapeo futuro de un canal no reescribe ventas históricas;
- un canal desconocido permanece sin clasificar antes que ser asignado por inferencia;
- canal no sustituye modalidad, sede, cliente, marca o empresa.

---

#### 18. Dimensión producto

La rentabilidad por producto requiere conservar la identidad canónica del producto o presentación vinculada a la línea comercial fuente.

Reglas:

- producto se deriva de las líneas reconocidas, no de una descripción libre agregada;
- la cantidad comercial debe poder compararse con la unidad de valoración del costo mediante una conversión gobernada cuando corresponda;
- cambios futuros de catálogo, nombre, receta o presentación no reescriben la línea histórica;
- una venta sin detalle de producto puede contribuir a rentabilidad agregada solo en el nivel que su evidencia permita; no se reparte arbitrariamente entre productos;
- un costo de producto sin venta correlacionable no se asigna a una línea comercial por aproximación silenciosa.

---

#### 19. Dimensión periodo

Todo resultado deberá declarar periodo y fecha de corte.

Reglas:

- la rentabilidad no se calcula sobre "todos los periodos" sin dimensión temporal explícita;
- ocurrencia, reconocimiento económico, cierre y eventual ajuste tardío permanecen conceptos distintos;
- el periodo aplicable deberá derivarse de la regla económica vigente y conservarse en el resultado;
- comparar periodos exige definiciones, moneda, métodos y dimensiones comparables;
- un evento tardío no reescribe silenciosamente un resultado publicado;
- el workflow completo de cierre, bloqueo y reapertura se reserva a `NUMERA-DOM-011`.

---

#### 20. Dimensiones auxiliares permitidas

Además de empresa, sede, canal, producto y periodo, el lineage podrá conservar dimensiones ya canónicas como:

- marca o unidad comercial;
- centro de costo;
- pedido o compromiso;
- cliente o contraparte cuando la finalidad y autorización lo permitan;
- lote, movimiento o fuente de costo para drill-down;
- moneda y unidad;
- versión de cálculo.

Estas dimensiones auxiliares no reemplazan las cinco dimensiones obligatorias del título ni autorizan nuevas fuentes de verdad.

---

#### 21. Grano analítico y agregación

La rentabilidad deberá construirse desde unidades de ingreso y costo con identidad y dimensiones suficientes antes de agregarse.

Regla:

```text
HECHOS FUENTE IDENTIFICABLES
-> NORMALIZACION DIMENSIONAL
-> ATRIBUCION / ASIGNACION TRAZABLE
-> CALCULO AL NIVEL SOPORTADO
-> AGREGACION
-> CONSOLIDACION
-> PUBLICACION VERSIONADA
```

Queda prohibido calcular primero un agregado global y repartirlo después entre empresa, sede, canal o producto sin una regla causal aprobada.

La suma de resultados de subconjuntos solo será una consolidación válida cuando las poblaciones sean disjuntas o exista una eliminación explícita de superposiciones.

---

#### 22. Atribución directa y costos compartidos

Se conserva la jerarquía:

```text
ATRIBUCION_DIRECTA
> DRIVER_OPERATIVO_MEDIBLE
> DRIVER_GERENCIAL_APROBADO
> PENDIENTE_DE_ASIGNACION
```

Para rentabilidad:

- un costo directamente atribuible al producto, sede o canal no se envía a pool por conveniencia;
- un costo realmente compartido conserva pool, base, driver, destinos, versión, aprobación y reversión;
- la suma distribuida reconcilia con el monto distribuible, considerando redondeos explícitos;
- una nueva versión de driver no reescribe resultados ya publicados;
- la rentabilidad puede mostrar resultados antes y después de compartidos solo si cada capa está claramente identificada.

---

#### 23. Rentabilidad por empresa

La vista por empresa deberá poder reconciliar:

```text
INGRESO_EXTERNO_REALIZADO_DE_LA_EMPRESA
- COSTO_TRAZABLE_ATRIBUIDO_A_LA_EMPRESA
- COSTOS_DIRECTOS_DE_LA_EMPRESA
- COSTOS_COMPARTIDOS_ASIGNADOS_A_LA_EMPRESA
= RESULTADO_GERENCIAL_EMPRESA
```

Reglas:

- no se agregan como ingreso los valores internos que representen traslados dentro del alcance consolidado;
- las operaciones entre entidades distintas con tratamiento legal pendiente quedan identificadas y no se fuerzan a ingreso o eliminación;
- la suma de empresas no se presenta como grupo consolidado si no se ejecutaron las eliminaciones correspondientes;
- cada empresa conserva moneda y criterios de conversión aplicables antes de una suma multimoneda.

---

#### 24. Rentabilidad por sede

La vista por sede deberá reconciliar:

```text
INGRESO_REALIZADO_SEDE
- COSTO_PRODUCTO_ATRIBUIDO_SEDE
- COSTOS_DIRECTOS_SEDE
- COSTOS_COMPARTIDOS_ASIGNADOS_SEDE
= RESULTADO_GERENCIAL_SEDE
```

El costo de producto puede provenir de producción o abastecimiento central, pero la transferencia interna que lo transporta no se convierte en ingreso del grupo.

Los costos de Producción y Distribución permanecen visibles en sus responsabilidades de origen y solo llegan a la sede mediante el mecanismo económico definido, sin duplicarse en la consolidación.

---

#### 25. Rentabilidad por canal

La vista por canal deberá usar ventas externas realizadas y costos atribuibles al canal.

Podrá incluir, cuando existan hechos económicos aprobados y trazables:

- comisiones de canal;
- costos directos de entrega o fulfillment atribuibles;
- descuentos comerciales ya incorporados en el ingreso reconocido;
- otros costos directos del canal definidos por su fuente propietaria.

No podrá:

- contar dos veces una venta importada y normalizada;
- convertir un costo compartido en directo sin evidencia;
- mezclar canal con sede;
- usar pedidos abiertos como ingreso;
- inferir rentabilidad del canal únicamente a partir del precio de venta.

---

#### 26. Rentabilidad por producto

La vista por producto deberá reconciliar, al nivel soportado por la evidencia:

```text
INGRESO_REALIZADO_PRODUCTO
- COSTO_TRAZABLE_PRODUCTO
- COSTOS_DIRECTOS_PRODUCTO
- COSTOS_COMPARTIDOS_PRODUCTO_APLICABLES
= RESULTADO_GERENCIAL_PRODUCTO
```

Reglas:

- el costo del producto usa método y versión declarados;
- merma, reproceso y variaciones no se ocultan dentro de una cantidad buena;
- descuentos y devoluciones se conservan en el lineage del ingreso;
- una presentación no se mezcla con otra sin conversión y equivalencia aprobadas;
- un producto sin base de costo completa queda incompleto antes que mostrar margen artificialmente alto.

---

#### 27. Rentabilidad por periodo

La vista temporal deberá permitir como mínimo comparar resultados bajo la misma definición económica entre periodos.

Cada resultado deberá conservar:

- periodo;
- fecha de corte;
- versión de rentabilidad;
- versión de costo utilizada;
- población de ingresos incluida;
- asignaciones compartidas incluidas;
- moneda o moneda de reporte;
- estado de completitud;
- estado de publicación;
- referencia de conciliación.

Una comparación no es válida si cambia silenciosamente la fórmula, el método de costo o el universo de datos.

---

#### 28. Consolidación y eliminación intragrupo

La consolidación deberá impedir que una transferencia interna infle simultáneamente ingreso y costo dentro del mismo alcance consolidado.

Regla conceptual:

```text
RESULTADOS_LOCALES
+ AJUSTES_DE_CONSOLIDACION
- DOBLE_CONTEO_INTERNO
= RESULTADO_CONSOLIDADO
```

Cuando un valor interno exista para gestión:

- puede permanecer visible en la vista local autorizada;
- conserva origen, destino, método y versión;
- no se suma como ingreso externo del alcance consolidado;
- no multiplica el costo económico total por aparecer en más de una unidad;
- cualquier eliminación conserva evidencia y no borra el hecho interno original.

Una consolidación sin evidencia de eliminación se presenta como agregación, no como consolidado oficial.

---

#### 29. Frontera con operaciones entre entidades legales distintas

Si origen y destino pertenecen a entidades legales distintas, NUMERA no decidirá en esta tarea que la operación sea simple traslado interno ni venta intercompañía.

El resultado deberá:

1. conservar ambas identidades;
2. conservar la evidencia económica y física;
3. evitar inventar ingreso externo o eliminación automática;
4. quedar sujeto al tratamiento aprobado por gobierno empresarial y la frontera contable/fiscal;
5. impedir que la misma operación aparezca simultáneamente como traslado neutral y venta legal.

La decisión jurídica, fiscal y contable pertenece a `NUMERA-DOM-013` y `NUMERA-DOM-017` cuando corresponda.

---

#### 30. Moneda y comparabilidad

No se sumarán importes de monedas distintas sin una política explícita de conversión.

Toda consolidación multimoneda deberá conservar, cuando aplique:

- moneda de origen;
- moneda de reporte;
- tipo o referencia de conversión;
- fecha aplicable;
- fuente;
- versión de política;
- precisión y redondeo.

La tasa o política concreta no se fija en esta tarea.

Ausencia de política de conversión produce resultado no comparable, no una suma nominal.

---

#### 31. Precio, costo y margen

El precio comercial pertenece a la venta fuente; el costo pertenece al contrato económico de costos; el margen se deriva de ambos cuando sean comparables.

Queda prohibido:

- tratar precio interno como ingreso externo;
- tratar precio de venta como costo;
- calcular margen con ingreso esperado y presentarlo como realizado;
- sustituir costo faltante con precio de compra, último costo o cero sin declarar el método;
- mezclar margen objetivo y margen realizado;
- comparar margen de dos productos con bases de costo distintas sin identificarlo.

---

#### 32. Presupuesto, forecast y escenarios

Los resultados reales permanecen separados de:

```text
PRESUPUESTO
REVISION_DE_PRESUPUESTO
FORECAST
ESCENARIO
SUPUESTO
OBJETIVO
```

Una vista comparativa puede mostrar real versus presupuesto o escenario, pero:

- cambiar un supuesto no modifica hechos reales;
- un escenario no se incorpora al resultado realizado;
- `expected_revenue` permanece expectativa;
- los escenarios versionados pertenecen a `NUMERA-DOM-018`;
- la gobernanza detallada de presupuesto y periodo continúa en sus tareas propietarias.

---

#### 33. Publicación y versionado

Cada resultado publicable deberá conservar:

- identificador o versión de cálculo;
- fórmula o definición de métrica;
- periodo y corte;
- dimensiones;
- fuentes de ingreso;
- fuentes y métodos de costo;
- distribuciones compartidas incluidas;
- reglas de consolidación;
- moneda y precisión;
- estado de completitud;
- actor o autoridad de revisión/aprobación cuando corresponda;
- momento de publicación;
- relación con una versión anterior si existe corrección o restatement.

Publicar una nueva versión no elimina la versión histórica utilizada para decisiones anteriores.

---

#### 34. Drill-down y reconciliación

Toda cifra publicada deberá poder bajar, según autorización, desde el agregado hasta sus componentes trazables.

La navegación conceptual es:

```text
RENTABILIDAD_PUBLICADA
-> DIMENSION / PERIODO
-> INGRESO_REALIZADO
-> LINEAS O HECHOS FUENTE
-> COSTO PUBLICADO
-> COMPONENTES / METODO / VERSION
-> COSTOS DIRECTOS
-> POOLS Y DRIVERS
-> AJUSTES / ELIMINACIONES
-> EVIDENCIA DE CONCILIACION
```

Un dashboard o exportación no se convierte en fuente editable del resultado.

---

#### 35. Correcciones, restatements y eventos tardíos

Una corrección posterior deberá preservar:

- versión publicada original;
- hecho o regla que cambió;
- motivo;
- actor o autoridad;
- impacto por dimensión;
- periodo afectado;
- versión nueva;
- diferencia entre ambas versiones.

No se sobrescribirá silenciosamente una rentabilidad histórica publicada.

La política completa de restatement y eventos tardíos se coordina con `NUMERA-DOM-011`, `NUMERA-DOM-014` y las tareas de datos propietarias.

---

#### 36. Cero, ausencia y no comparabilidad

Se mantienen separados:

```text
ZERO
MISSING
NOT_APPLICABLE
NOT_COMPARABLE
PENDING
```

Ejemplos:

- cero ingresos confirmados no es lo mismo que ingresos faltantes;
- cero costo válido no es lo mismo que costo desconocido;
- margen no aplicable a una unidad sin ingreso externo no es margen cero;
- una moneda no convertible bajo la política vigente produce no comparabilidad;
- una asignación pendiente no se fuerza a cero para cerrar el resultado.

---

#### 37. Casos excepcionales obligatorios

El diseño posterior deberá tratar explícitamente:

1. venta realizada sin costo trazable todavía disponible;
2. costo disponible sin ingreso comercial correlacionable;
3. devolución o anulación posterior a publicación;
4. costo real cerrado después del periodo de venta;
5. transferencia interna visible en dos unidades;
6. producto sin detalle de línea en la fuente histórica;
7. venta multimoneda;
8. canal externo duplicado con PULSO;
9. costo compartido con driver pendiente;
10. driver corregido después de publicación;
11. sede o centro desactivado con historia vigente;
12. producto renombrado o sustituido;
13. empresa o titular no resuelto;
14. operación entre entidades legales distintas;
15. periodo cerrado con evento tardío;
16. ingreso cero con costos positivos;
17. ingreso negativo por compensaciones mayores al ingreso del corte;
18. costo faltante que impediría un margen confiable;
19. comparación entre periodos con métodos de costo diferentes;
20. consolidación que no dispone todavía de todas las eliminaciones internas.

Ninguno se resuelve mediante borrado destructivo, costo cero inventado, reparto arbitrario o ingreso interno ficticio.

---

#### 38. Frontera con caja, bancos y liquidez

La rentabilidad no prueba liquidez ni disponibilidad de efectivo.

Se conserva:

```text
INGRESO_REALIZADO != COBRO
COBRO != MOVIMIENTO_DE_CAJA
MOVIMIENTO_DE_CAJA != MOVIMIENTO_BANCARIO
RENTABILIDAD != LIQUIDEZ
RENTABILIDAD != SALDO_BANCARIO
```

Una empresa, sede, canal o producto puede ser rentable y tener cobros pendientes; también puede tener caja positiva sin rentabilidad económica suficiente.

`NUMERA-DOM-009` recibe esta separación para definir caja, bancos y conciliaciones sin usar rentabilidad como sustituto de posición financiera.

---

#### 39. Frontera con contabilidad y fiscalidad

Este modelo es analítico y gerencial.

No define:

- plan de cuentas;
- partida doble;
- reconocimiento contable oficial;
- impuesto de renta;
- tratamiento de IVA u otros impuestos;
- utilidad fiscal;
- depreciación contable;
- precios de transferencia fiscales;
- facturación intercompañía;
- estados financieros oficiales.

Las futuras integraciones o capacidades contables deberán mapear los hechos económicos sin reescribir este lineage analítico.

---

#### 40. Hallazgos y propietarios de salida

| Hallazgo | Bloquea esta definición | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| la superficie runtime actual no calcula rentabilidad realizada | no | `NUMERA-UX-022` y materialización posterior | UI consume ingreso realizado y costo trazable bajo esta definición |
| la vista actual consulta periodos sin dimensión temporal suficiente | no | `NUMERA-UX-022`, `NUMERA-DOM-011` | filtro/corte y periodo económico quedan explícitos |
| la tarjeta actual promete más dimensiones que las materializadas | no | `NUMERA-UX-022`, `NUMERA-UX-028` | empresa, sede, canal, producto y periodo son navegables y trazables |
| el tratamiento legal de movimientos entre entidades distintas no está cerrado | no | `NUMERA-DOM-013`, `NUMERA-DOM-017` | clasificación contable/fiscal aprobada |
| periodos cerrados pueden recibir hechos tardíos | no | `NUMERA-DOM-011`, `NUMERA-DOM-014` | reglas de cierre, ajuste y reapertura definidas |
| escenarios y supuestos todavía no poseen motor objetivo | no | `NUMERA-DOM-018` | escenarios versionados separados de hechos reales |
| caja y bancos no están definidos en este modelo | no | `NUMERA-DOM-009` | posición, movimientos y conciliaciones financieras definidos |
| agregación analítica global requiere gobierno de dimensiones y métricas | no | tareas `DATA-DOM-*` propietarias | capa semántica, granularidad, calidad y restatement materializados |

---

#### 41. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea no crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

Justificación: el modelo de rentabilidad, sus dimensiones, fuentes, método, versionado, reconciliación, separación frente a expectativas, costos y transferencias internas ya está protegido por requisitos canónicos vigentes. La tarea concreta esas obligaciones sin introducir una obligación de prueba nueva.

---

#### 42. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el Registro 04A:

- `TREQ-NUMERA-001` para reconciliación de indicadores, costos, gastos y reportes con hechos fuente y ausencia de doble registro;
- `TREQ-NUMERA-002` para identidad, entidad, sede, centro, moneda, fechas, fuente, correlación, estado y correcciones no destructivas;
- `TREQ-NUMERA-004` para método, entradas, versión, vigencia, entidad, centro, periodo, fuente, separación de tipos de costo, distribuciones, transferencias internas y rentabilidad trazable;
- `TREQ-NUMERA-020` para mantener separados ingreso esperado, gasto real, presupuesto y variación en la superficie de rentabilidad;
- `TREQ-PULSO-006` para conservar venta, pago, caja, documento fiscal, devoluciones y cierre como hechos distintos y auditables;
- `TREQ-INTEGRATION-017` para hechos de venta, pago, inventario, producción, merma, logística y otros efectos recibidos por NUMERA mediante contratos versionados, correlacionados e idempotentes;
- `TREQ-INTEGRATION-013` y `TREQ-INTEGRATION-016` para costo productivo/logístico correlacionado sin doble efecto.

Esta enumeración es trazabilidad reutilizada y no actualiza 04A.

---

#### 43. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build del repositorio durante esta preparación documental anticipada |
| LOCAL | NOT_EXECUTED | no se modificó ni validó el checkout local del usuario durante la redacción del artefacto |
| REMOTA | PASS | se verificaron `main`, continuidad, archivo propietario, políticas documentales, Registro 04A NUMERA, `NUMERA-DOM-002`, `NUMERA-DOM-006`, `OPS-CST-001`, `NUMERA-AUD-008`, `CAP-SCOPE-012`, `CAP-SCOPE-017`, `VPROC-0054`, requisitos relacionados y el handoff aprobado de `NUMERA-DOM-007` |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron ventas, costos, distribuciones, consolidaciones, cierres, caja, bancos ni conciliaciones reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; la tarea no autoriza materialización física |

---

#### 44. Criterios de aceptación

`NUMERA-DOM-008` queda aceptable cuando:

1. ingreso esperado e ingreso realizado permanecen separados;
2. rentabilidad usa ingreso externo realizado y costo trazable;
3. margen bruto, margen de contribución y resultado gerencial no se confunden;
4. el resultado gerencial no se presenta como utilidad contable neta;
5. empresa, sede, canal, producto y periodo tienen reglas dimensionales explícitas;
6. marca, área y centro de costo no sustituyen silenciosamente esas dimensiones;
7. una venta se cuenta una sola vez aunque aparezca en canal externo, PULSO y proyecciones;
8. costo faltante no se convierte en cero ni en fallback silencioso;
9. ingreso faltante no se convierte en cero;
10. la tasa de margen no se calcula con denominador cero o no comparable;
11. costos directos preceden distribuciones compartidas;
12. pools y drivers conservan versión, aprobación y reversión;
13. rentabilidad por producto conserva líneas y costo trazable suficiente;
14. rentabilidad por canal conserva identidad normalizada y costos atribuibles;
15. rentabilidad por sede conserva ingreso externo y costos de sede sin doble costo central;
16. rentabilidad por empresa conserva identidad organizacional y reglas de consolidación;
17. cada resultado conserva periodo, corte, versión, moneda, fuentes y estado de completitud;
18. transferencias internas no inflan ingreso consolidado;
19. consolidaciones eliminan o identifican doble conteo intragrupo;
20. operaciones entre entidades distintas no se clasifican legalmente por inferencia;
21. comparaciones entre periodos conservan definiciones y métodos comparables;
22. correcciones y eventos tardíos no sobrescriben historia publicada;
23. presupuesto, forecast y escenarios permanecen separados de resultados reales;
24. rentabilidad permanece separada de caja, bancos y liquidez;
25. no se crean ni modifican requisitos de prueba;
26. no se realizan cambios físicos;
27. `NUMERA-DOM-009` recibe la separación entre resultado económico y posición de caja/bancos.

---

#### 45. Límites

Esta tarea no:

- implementa el motor de rentabilidad;
- crea o modifica vistas, RPC o tablas;
- cambia hechos de venta;
- cambia métodos o valores de costo definidos por `NUMERA-DOM-007`;
- crea centros de costo o dimensiones maestras;
- define catálogo de canales o productos;
- implementa conversiones de moneda;
- fija tipos de cambio;
- define impuestos o utilidad fiscal;
- crea plan de cuentas o asientos;
- define caja o bancos;
- ejecuta conciliaciones bancarias;
- define cierre y reapertura completa de periodos;
- implementa escenarios;
- crea permisos o roles;
- modifica Supabase;
- modifica 04A;
- desarrolla `NUMERA-DOM-009`.

---

#### 46. Handoff a NUMERA-DOM-009

La siguiente tarea recibe:

```text
PROFITABILITY_OWNER = NUMERA
REALIZED_REVENUE_SOURCE = RECOGNIZED_RECONCILABLE_ECONOMIC_FACTS
EXPECTED_REVENUE_IS_REALIZED_REVENUE = NO
TRACEABLE_COST_REQUIRED = YES
MISSING_REVENUE_IS_ZERO = NO
MISSING_COST_IS_ZERO = NO
GROSS_ANALYTIC_MARGIN = REALIZED_REVENUE_MINUS_TRACEABLE_PRODUCT_COST
MANAGERIAL_RESULT = REALIZED_REVENUE_MINUS_TRACEABLE_PRODUCT_COST_MINUS_DIRECT_COSTS_MINUS_APPROVED_SHARED_COSTS
TARGET_GROSS_MARGIN_IS_ACTUAL_MARGIN = NO
TARGET_GROSS_MARGIN_IS_CONTRIBUTION_MARGIN_BY_DEFAULT = NO
COMPANY_SITE_CHANNEL_PRODUCT_PERIOD = REQUIRED_PROFITABILITY_DIMENSIONS
INTERNAL_TRANSFER_IS_CONSOLIDATED_EXTERNAL_REVENUE = NO
CONSOLIDATION_REQUIRES_INTERNAL_DOUBLE_COUNT_ELIMINATION = YES
PROFITABILITY_IS_LIQUIDITY = NO
PROFITABILITY_IS_CASH_BALANCE = NO
REALIZED_REVENUE_IS_CASH_RECEIPT = NO
CASH_RECEIPT_IS_BANK_MOVEMENT = NO
HISTORICAL_PROFITABILITY_SILENT_OVERWRITE = FORBIDDEN
```

`NUMERA-DOM-009` deberá definir caja, bancos y conciliaciones bajo esta separación, sin usar rentabilidad como sustituto de efectivo, liquidez o saldo financiero.

---

#### 47. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones`

**TAREA ACTUAL APROBADA**
`NUMERA-DOM-008 — Definir rentabilidad por empresa, sede, canal, producto y periodo`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-009 — Definir caja, bancos y conciliaciones que pertenezcan al alcance aprobado`
### [ ] NUMERA-DOM-009 — Definir caja, bancos y conciliaciones que pertenezcan al alcance aprobado
### [ ] NUMERA-DOM-010 — Definir cuentas por pagar y obligaciones si pertenecen a NUMERA
### [ ] NUMERA-DOM-011 — Definir cierres, periodos y reapertura controlada
### [ ] NUMERA-DOM-012 — Definir reportes, indicadores y exportaciones oficiales
### [ ] NUMERA-DOM-013 — Definir fronteras frente al sistema contable o fiscal externo
### [ ] NUMERA-DOM-014 — Definir conciliación y tratamiento de diferencias
### [ ] NUMERA-DOM-015 — Aprobar alcance objetivo y capacidades diferidas
### [ ] NUMERA-DOM-016 — Definir cartera, cuentas por cobrar, cobranza y exposición de crédito
### [ ] NUMERA-DOM-017 — Definir arquitectura extensible hacia contabilidad formal, plan de cuentas y comprobantes
### [ ] NUMERA-DOM-018 — Definir motor de escenarios, versiones de precios, costos, supuestos y publicación
