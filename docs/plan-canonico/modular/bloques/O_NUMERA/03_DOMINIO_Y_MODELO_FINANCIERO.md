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
### [ ] NUMERA-DOM-002 — Definir hechos económicos recibidos desde ventas
### [ ] NUMERA-DOM-003 — Definir hechos económicos recibidos desde compras y recepción
### [ ] NUMERA-DOM-004 — Definir hechos económicos recibidos desde producción e inventario
### [ ] NUMERA-DOM-005 — Definir gastos, soportes, aprobación, corrección y anulación
### [ ] NUMERA-DOM-006 — Definir centros de costo y propiedad de su catálogo
### [ ] NUMERA-DOM-007 — Definir costos, costo estándar, costo real y variaciones
### [ ] NUMERA-DOM-008 — Definir rentabilidad por empresa, sede, canal, producto y periodo
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
