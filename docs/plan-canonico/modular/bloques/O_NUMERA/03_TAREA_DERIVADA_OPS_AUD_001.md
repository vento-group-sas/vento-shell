### TAREA FINANCIERA DERIVADA DE OPS-AUD-001

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:OPS-CST-001 -->
### Reconciliación topológica de OPS-CST-001

La tarea define el caso empresarial de centros de costo y transferencias internas. No crea catálogo paralelo ni implementación física propia.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ OPS-CST-001 — Definir el caso de centro de costo y transferencias internas de Producción y Distribución

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-012 — Crear matriz capacidad financiera × implementación actual
**Tarea siguiente:** NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA
**Tipo de tarea:** definición documental del caso empresarial de valorización productiva, centros de costo, distribución de costos compartidos y transferencias internas entre Producción, Distribución y sedes, preservando fronteras con inventario, venta externa, facturación y contabilidad formal; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/03_TAREA_DERIVADA_OPS_AUD_001.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea centros de costo, no modifica catálogos, código, Supabase, inventario, remisiones, lotes, precios, fórmulas, datos, permisos, integraciones, documentos fiscales ni movimientos económicos reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el caso empresarial que conecta la operación productiva y logística con el modelo económico de NUMERA sin convertir movimientos internos en ventas ficticias ni duplicar inventario, costo, gasto o ingreso.

La tarea fija cómo deberán interpretarse y relacionarse:

- el Centro de Producción;
- el Centro de Distribución;
- Vento Café, Saudo y Molka como sedes receptoras;
- los centros de costo del catálogo canónico compartido;
- la valorización de producción;
- el costo productivo y el costo logístico;
- los consumos, rendimientos, mermas y desperdicios;
- las transferencias internas de producto;
- la distribución de costos compartidos;
- las variaciones entre valores esperados y realizados;
- la rentabilidad por sede, producto, canal y periodo;
- una futura venta externa originada desde Producción.

El resultado es un contrato empresarial para las tareas de dominio NUMERA posteriores. No implementa el modelo ni reemplaza las decisiones fiscales, tributarias o contables que requieran tratamiento profesional o autoridad externa.

---

#### 2. Handoff recibido de NUMERA-AUD-012

La matriz final de auditoría entrega tres capacidades directamente relacionadas con esta tarea:

```text
CAP-12.09 Calcular costos = PROTOTIPO
CAP-12.10 Distribuir costos compartidos = AUSENTE
CAP-12.11 Gestionar presupuestos = PARCIAL
```

También deja demostradas estas brechas:

```text
COST_ENGINE_IMPLEMENTED_IN_VENTO_NUMERA = NO
ACTUAL_MARGIN_CALCULATION_IMPLEMENTED = NO
PROFITABILITY_CALCULATION_IMPLEMENTED = NO
SOURCE_IDENTITY_UNIQUE_CONSTRAINT = NO
CROSS_DOMAIN_MATCHING_BEFORE_MANUAL_WRITE = NO
BUDGET_APPROVAL_WORKFLOW = NO
BUDGET_VERSIONING = NO
```

Por tanto, esta tarea no parte de un motor financiero ya resuelto. Define el caso empresarial que deberá materializarse posteriormente sin elevar por documentación el estado funcional AS-IS.

---

#### 3. Naturaleza y topología

La topología canónica de esta tarea es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

En consecuencia:

- el marcador se desarrolla una sola vez;
- no existe instancia física propia;
- no se crean migraciones ni datos;
- no se autoriza una distribución de costos real;
- no se autoriza una transferencia real;
- no se publica un precio interno;
- no se modifica el catálogo `cost_centers`;
- las tareas `NUMERA-DOM-*` posteriores consumen este contrato.

---

#### 4. Fuentes canónicas consumidas

La definición reconcilia como mínimo:

- `OPS-GOV-001` para la separación entre marca, titular, sede, canal y centro de costo;
- la auditoría operativa que confirma la instalación física integrada de Producción y Distribución;
- `CAP-SCOPE-008` para producción, consumos, rendimiento, merma, calidad y cierre productivo;
- `CAP-SCOPE-011` para logística, despacho, custodia y entrega;
- `CAP-SCOPE-012` para costos, distribución, presupuesto y rentabilidad;
- `NUMERA-AUD-008` para cálculos, costo, margen, equilibrio y rentabilidad AS-IS;
- `NUMERA-AUD-009` para centros de costo, presupuestos, periodos y aprobaciones AS-IS;
- `NUMERA-AUD-012` para la clasificación final de capacidades financieras;
- el proceso `VPROC-0054` para costos, distribución, presupuesto, cierre y rentabilidad con reglas versionadas;
- el Registro 04A vigente, sin modificación.

---

#### 5. Hechos AS-IS que no se redefinen

Quedan preservados:

1. Centro de Producción y Centro de Distribución funcionan actualmente dentro de una sola instalación física integrada.
2. La instalación física no determina por sí sola si deben existir una o varias responsabilidades económicas lógicas.
3. Centro de Producción abastece principalmente a Vento Café, Saudo y Molka y participa en catering.
4. El Centro de Producción no opera actualmente como vendedor directo general a terceros.
5. Las transferencias internas actuales no funcionan como ventas o cargos formalmente estructurados.
6. NUMERA consume un catálogo compartido `cost_centers`; no posee un catálogo paralelo propio.
7. El snapshot auditado contiene un centro `CP-CENTRO-PROD` y centros satélite para Vento Café, Saudo y Molka.
8. El snapshot auditado contiene además un centro demo activo; esta tarea no lo convierte en centro operativo válido.
9. Los movimientos físicos de inventario pertenecen a NEXO y los resultados productivos pertenecen a FOGO.
10. NUMERA todavía no posee un motor integral de costo o rentabilidad materializado.

---

#### 6. Vocabulario económico obligatorio

Los siguientes conceptos quedan separados:

| Concepto | Significado en este caso | No equivale a |
| --- | --- | --- |
| instalación física | lugar donde hoy coexisten Producción y Distribución | centro de costo único obligatorio |
| unidad operativa lógica | responsabilidad funcional distinguible | entidad legal |
| centro de costo | dimensión económica canónica para atribución y análisis | sede, marca o titular por inferencia |
| movimiento de inventario | cambio físico de cantidad, ubicación o custodia | venta o gasto |
| transferencia interna de producto | proyección económica gerencial de un movimiento interno confirmado | factura, ingreso legal o cuenta por cobrar automática |
| distribución de costo compartido | asignación versionada de un pool mediante driver | movimiento de inventario |
| venta externa | intercambio real con tercero o contraparte externa | transferencia interna |
| costo estándar | referencia versionada previa o publicada | costo real cerrado |
| costo real | costo reconciliado desde fuentes y resultados observados | precio de venta |
| variación | diferencia explicable entre bases comparables | ajuste silencioso de la historia |

---

#### 7. Decisión sobre Producción y Distribución

Aunque compartan hoy una instalación física, **Producción y Distribución deberán permanecer económicamente distinguibles**.

La distinción no obliga en esta tarea a crear dos filas físicas nuevas en `cost_centers`; obliga a que el modelo posterior pueda separar como mínimo:

```text
RESPONSABILIDAD_PRODUCTIVA
RESPONSABILIDAD_LOGISTICA_DE_DISTRIBUCION
```

Motivo:

- Producción transforma insumos y genera producto terminado, rendimiento, merma y variaciones productivas.
- Distribución custodia, consolida, prepara, transporta y entrega producto entre la instalación central y las sedes.
- mezclar ambas responsabilidades impediría distinguir una desviación de producción de una desviación logística;
- compartir inmueble no autoriza mezclar costos ni resultados.

La identidad, código, lifecycle y ownership definitivos del catálogo quedan para `NUMERA-DOM-006`.

---

#### 8. Regla del catálogo de centros de costo

Existe un único catálogo canónico compartido.

Queda prohibido:

- crear un catálogo NUMERA paralelo;
- duplicar un centro por aplicación;
- asumir que marca = centro de costo;
- asumir que sede = centro de costo;
- asumir que entidad legal = centro de costo;
- usar una fila demo como destino de operación real;
- crear un centro nuevo solo para resolver una fórmula o un reporte.

Esta tarea define las responsabilidades económicas requeridas. `NUMERA-DOM-006` decidirá la propiedad del catálogo, sus identidades canónicas, jerarquía, vigencia, elegibilidad y transición desde el AS-IS.

---

#### 9. Estructura económica objetivo del caso

El caso mínimo deberá poder representar:

```text
PRODUCCION
  -> consume materiales y recursos
  -> genera producto terminado
  -> registra rendimiento, merma y variacion
  -> entrega producto valorizable

DISTRIBUCION
  -> recibe/custodia producto terminado
  -> consolida y despacha
  -> incurre en costo logistico identificable
  -> conserva diferencias de entrega y retorno

SEDE SATELITE
  -> recibe producto
  -> asume costo gerencial trazable del producto recibido
  -> incurre en gastos directos propios
  -> realiza ventas externas al cliente
  -> calcula rentabilidad con ingreso realizado y costo trazable
```

Vento Café, Saudo y Molka deberán ser analizables de forma independiente sin convertir el traslado interno en una venta entre áreas por defecto.

---

#### 10. Capas de costo que no se mezclarán

El modelo posterior deberá mantener separadas al menos estas capas conceptuales:

| Capa | Fuente principal | Tratamiento |
| --- | --- | --- |
| adquisición de material | ORIGO y documentos de compra/recepción | base de entrada; no es todavía costo productivo completo |
| costo productivo | materiales realmente consumidos + componentes productivos aprobados | pertenece al resultado de producción |
| merma o desperdicio | FOGO/NEXO con motivo y evidencia | costo visible; no se oculta dentro de una cantidad buena |
| costo logístico | operación de Distribución y fuentes aplicables | separado del costo de transformación |
| costo directo de sede | hecho económico atribuible directamente al centro receptor | imputación directa; no requiere driver compartido |
| costo compartido | pool que beneficia a múltiples destinos | distribución mediante driver versionado y aprobado |
| costo interno transferido | valor gerencial asociado al producto movido internamente | no crea ingreso o gasto legal automáticamente |

La fórmula numérica exacta de cada costo se reserva a `NUMERA-DOM-007`.

---

#### 11. Valorización de la producción

El producto terminado deberá poder conservar simultáneamente:

```text
VALOR_REFERENCIA_PREVIO
VALOR_REAL_RECONCILIADO
VARIACION
```

Reglas:

1. el valor previo deberá provenir de una versión publicada y trazable de costo estándar o referencia económica aprobada;
2. cuando el costo real todavía no pueda cerrarse, no se inventará un costo real ni se usará cero para ocultar la ausencia;
3. el costo real se obtendrá posteriormente desde fuentes observadas y conciliadas;
4. reconciliar el costo real no sobrescribirá la referencia usada al momento de la operación;
5. la variación conservará ambas bases, fecha, periodo, método y versión;
6. cambiar una versión futura no revalorizará silenciosamente transferencias históricas.

Si no existe una referencia de costo publicada aplicable, el movimiento físico podrá continuar conforme a su dominio propietario, pero la valorización económica quedará pendiente y explícita hasta disponer de una base autorizada.

---

#### 12. Transferencia interna de producto

Una transferencia interna de producto representa económicamente el abastecimiento entre unidades internas, pero **no crea por sí misma una venta**.

Deberá referenciar como mínimo:

- movimiento o remisión física de origen;
- producto y presentación canónicos;
- cantidad y unidad;
- lote cuando aplique;
- centro o responsabilidad de origen;
- centro o responsabilidad de destino;
- fecha de ocurrencia y fecha de reconocimiento;
- método y versión de valorización;
- valor unitario y valor total gerencial cuando exista base válida;
- estado de valorización;
- evidencia de despacho y recepción aplicable;
- motivo de reversión o corrección cuando corresponda.

NUMERA no creará un segundo movimiento de inventario para representar esta transferencia.

---

#### 13. Momento de reconocimiento interno

El movimiento físico y su reconocimiento económico tendrán estados correlacionados, no equivalentes.

Regla:

```text
DESPACHADO O EN TRANSITO
-> transferencia economica pendiente de recepcion final

RECEPCION CONFIRMADA / MOVIMIENTO COMPLETADO
-> puede reconocerse la transferencia interna gerencial

RECHAZO / DEVOLUCION / DIFERENCIA
-> no se oculta; genera ajuste o reversión correlacionada
```

La salida física no será suficiente para declarar definitivamente recibido el costo por la sede destino.

Un reintento, corrección o sincronización no podrá reconocer dos veces la misma transferencia.

---

#### 14. Costo logístico de Distribución

El costo de Distribución deberá permanecer visible y separado del costo de transformación productiva.

Podrá incluir componentes económicos derivados de fuentes autorizadas como transporte, manipulación, recursos o servicios logísticos cuando hayan sido definidos por su dominio propietario.

Reglas:

- no se cargará automáticamente todo costo de la instalación a Producción;
- no se incorporará automáticamente todo costo logístico al costo del producto sin una política versionada;
- el costo directo de una ruta, movimiento o destino se atribuirá directamente cuando exista evidencia suficiente;
- solo el componente realmente compartido se distribuirá mediante driver;
- un costo logístico no se presentará como merma productiva.

La selección exacta de componentes y fórmulas pertenece a `NUMERA-DOM-007`.

---

#### 15. Distribución de costos compartidos

Todo costo compartido deberá seguir el contrato:

```text
POOL
-> BASE ELEGIBLE
-> DRIVER
-> DESTINOS
-> CALCULO REPRODUCIBLE
-> REVISION / APROBACION
-> PUBLICACION
-> REVERSIÓN O NUEVA VERSION, SI APLICA
```

Reglas obligatorias:

1. un costo directamente atribuible no se enviará a un pool compartido por conveniencia;
2. cada pool tendrá periodo, entidad, moneda, fuente, propietario y evidencia;
3. cada driver tendrá definición, unidad, fuente, periodo, versión y justificación causal;
4. el driver deberá provenir de una medida verificable o de una política aprobada; no se inventará un porcentaje silencioso;
5. la base excluirá destinos no elegibles;
6. la suma asignada deberá reconciliar con el monto distribuible, considerando redondeos explícitos;
7. una nueva política no reescribirá una distribución ya publicada;
8. una corrección conservará la distribución original y su reversión o reemplazo trazable;
9. aprobación y publicación serán decisiones distinguibles del cálculo;
10. no se usará una distribución gerencial como prueba automática de asiento, factura o obligación fiscal.

---

#### 16. Drivers y evidencia mínima

Esta tarea no fija porcentajes ni fórmulas universales. Fija la jerarquía de decisión:

```text
1. ATRIBUCION DIRECTA, cuando existe causalidad individual verificable
2. DRIVER OPERATIVO MEDIBLE, cuando el costo es realmente compartido
3. DRIVER GERENCIAL APROBADO, solo cuando no exista una medida causal suficiente
4. PENDIENTE DE ASIGNACION, antes que inventar una base sin evidencia
```

Ejemplos de fuentes que podrán evaluarse posteriormente, sin quedar aprobadas automáticamente por esta tarea:

- cantidad producida;
- peso o volumen;
- tiempo de uso;
- horas de trabajo;
- área ocupada;
- movimientos o entregas;
- distancia o recorrido;
- unidades recibidas;
- ingreso realizado;
- otra magnitud causal demostrable.

El driver definitivo de cada pool será responsabilidad del diseño de dominio y de la aprobación empresarial aplicable.

---

#### 17. Consumos, rendimiento, merma y desperdicio

FOGO y NEXO conservan los hechos físicos; NUMERA consume sus referencias para producir efecto económico.

Se deberá distinguir como mínimo:

```text
ESPERADO
RESERVADO
ENTREGADO
CONSUMIDO
DEVUELTO
PRODUCIDO
MERMA / DESPERDICIO
REPROCESO
DIFERENCIA PENDIENTE
```

Reglas:

- merma no se convertirá en consumo bueno para cuadrar cantidades;
- una devolución no se contabilizará como consumo definitivo;
- un reproceso conservará genealogía y no será producción nueva sin origen;
- una diferencia logística no se reclasificará como merma productiva por ausencia de evidencia;
- toda variación material deberá poder rastrearse hasta la fuente física que la explica o permanecer explícitamente pendiente.

---

#### 18. Matriz de variaciones

Las variaciones deberán conservar causa y propietario, sin compensarse entre sí para ocultar desviaciones.

| Variación | Ejemplo de origen | Propietario de la fuente | Destino analítico |
| --- | --- | --- | --- |
| precio/adquisición | diferencia frente a costo de entrada esperado | ORIGO / fuente de compra | NUMERA |
| consumo | uso real distinto a consumo esperado | FOGO + NEXO | NUMERA |
| rendimiento | salida real distinta a rendimiento esperado | FOGO | NUMERA |
| merma/desperdicio | pérdida o descarte identificado | FOGO/NEXO según etapa | NUMERA |
| logística | diferencia de costo o cantidad en distribución | NEXO / fuentes logísticas | NUMERA |
| recepción | cantidad o condición recibida distinta a la despachada | NEXO / sede receptora | NUMERA |
| distribución de compartidos | base o driver diferente a versión anterior | NUMERA | NUMERA |

La fórmula exacta y la materialización de estas variaciones pertenecen a `NUMERA-DOM-007`.

---

#### 19. Rentabilidad y eliminación de ingreso ficticio

La rentabilidad consolidada deberá usar ingreso externo realizado y costos trazables.

Para una sede comercial, el análisis objetivo podrá reconciliar:

```text
INGRESO EXTERNO REALIZADO
- COSTO TRAZABLE DEL PRODUCTO RECIBIDO
- COSTOS DIRECTOS DE LA SEDE
- COSTOS COMPARTIDOS APROBADOS
= RESULTADO GERENCIAL RECONCILIABLE
```

Reglas:

- la transferencia interna no se sumará como ingreso del grupo;
- el mismo producto no generará ingreso en Producción y nuevamente en la sede por el solo traslado;
- Producción podrá medirse por costo, rendimiento, merma, variación y eficiencia sin inventar una venta interna;
- Distribución podrá medirse por costo logístico, servicio, diferencia y eficiencia sin inventar margen comercial;
- los análisis por centro podrán mostrar valores internos de gestión, pero la vista consolidada eliminará cualquier doble conteo intragrupo;
- `NUMERA-DOM-008` definirá las dimensiones y fórmulas finales de rentabilidad.

---

#### 20. Frontera con venta externa futura

Una futura venta B2B o externa desde Producción será un caso diferente.

Solo podrá tratarse como venta externa cuando exista una contraparte externa y el flujo comercial aplicable produzca evidencia suficiente de pedido, entrega, precio, cobro, documento y tratamiento fiscal según los contratos vigentes.

Por tanto:

```text
PRODUCCION -> VENTO CAFE / SAUDO / MOLKA
= TRANSFERENCIA INTERNA GERENCIAL

PRODUCCION -> TERCERO EXTERNO
= POSIBLE VENTA EXTERNA, SUJETA AL PROCESO B2B Y AL TRATAMIENTO FISCAL APLICABLE
```

`OPS-B2B-001` conserva el proceso comercial B2B y `NUMERA-DOM-013` conserva la frontera frente al sistema contable o fiscal externo.

---

#### 21. Frontera con entidad legal, marca y emisor fiscal

La relación económica no podrá inferirse solo por nombre de marca o sede.

Antes de convertir un movimiento en operación legal entre entidades deberá conocerse la entidad legal o titular aplicable y el tratamiento fiscal correspondiente.

Si origen y destino pertenecen a entidades legales distintas, la operación dejará de poder clasificarse automáticamente como simple transferencia intragrupo. Deberá conservarse pendiente del tratamiento definido por gobierno empresarial, NUMERA y la autoridad contable/fiscal aplicable.

Esta tarea no decide impuestos, facturación intercompañía, precios de transferencia fiscales ni asientos contables formales.

---

#### 22. Propiedad de fuentes y responsabilidades

| Dominio / sistema | Responsabilidad en este caso | No deberá hacer |
| --- | --- | --- |
| FOGO | orden/lote, receta/versión, consumo, producción, rendimiento, merma, reproceso y cierre productivo | escribir costos finales o movimientos de stock por duplicado |
| NEXO | stock, lote físico, LOC, remisión, movimiento, custodia, despacho, recepción, devolución y diferencia logística | crear ingreso o rentabilidad financiera |
| ORIGO | compra, proveedor, recepción de compra y bases de adquisición aplicables | inventar costo productivo final |
| PULSO / PASS | venta externa realizada, pedido, pago y evidencia comercial aplicable | registrar transferencias internas como ventas |
| VISO | datos laborales autorizados que puedan servir como fuente cuando una política de costo los requiera | definir por sí solo imputación financiera |
| NUMERA | valorización, costo, distribución, variación, periodo, conciliación y rentabilidad | alterar cantidades físicas o convertirse en fuente paralela de inventario |
| `cost_centers` canónico | identidad económica compartida | duplicarse por aplicación |

---

#### 23. Gobierno de versión, aprobación y corrección

Toda política económica derivada de este caso deberá conservar:

- identificador estable;
- propósito;
- alcance;
- entidad y centros aplicables;
- método;
- entradas;
- fuente de cada entrada;
- versión;
- vigencia;
- redactor o preparador;
- revisor;
- aprobador autorizado;
- fecha de publicación;
- motivo de cambio;
- impacto esperado;
- relación con versión anterior;
- mecanismo de reversión o corrección.

No se fijan aquí montos, umbrales ni nombres definitivos de permisos.

La implementación posterior deberá impedir que editar una regla vigente reescriba silenciosamente resultados históricos ya publicados.

---

#### 24. Excepciones obligatorias

El diseño posterior deberá tratar explícitamente:

1. movimiento despachado y nunca recibido;
2. recepción parcial;
3. rechazo total o parcial;
4. devolución a origen;
5. reasignación de destino durante transporte;
6. producto terminado que cambia de sede por necesidad operativa;
7. transferencia sin costo estándar publicado;
8. costo real cerrado después de la transferencia;
9. diferencia entre cantidad física y cantidad valorizada;
10. merma detectada en Producción versus pérdida detectada en Distribución;
11. costo compartido sin driver verificable;
12. driver corregido después de publicación;
13. centro inactivo o no elegible;
14. dato demo presente en el catálogo;
15. operación entre titulares o entidades legales distintas;
16. futura venta externa desde Producción;
17. corrección de un movimiento ya conciliado;
18. cierre de periodo con transferencias o valorizaciones pendientes.

Ninguna excepción se resolverá mediante borrado destructivo, valor cero inventado o duplicación manual del hecho origen.

---

#### 25. Hallazgos y propietarios de salida

| Hallazgo | Bloquea esta definición | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| Producción y Distribución comparten instalación pero requieren lectura económica distinguible | no | `NUMERA-DOM-006`, `NUMERA-DOM-007` | catálogo y modelo permiten distinguir responsabilidades sin duplicar identidades |
| ownership físico del catálogo `cost_centers` no está resuelto para el modelo objetivo | no | `NUMERA-DOM-006` | owner, lifecycle, jerarquía, vigencia y elegibilidad definidos |
| no existe motor de costo integral en NUMERA | no | `NUMERA-DOM-007` | costo estándar, real, componentes y variaciones definidos y materializables |
| la transferencia interna todavía no existe como hecho económico correlacionado | no | `NUMERA-DOM-004`, `NUMERA-DOM-007` | contrato enlaza fuente física y efecto económico sin duplicación |
| no existe distribución material de costos compartidos | no | `NUMERA-DOM-006`, `NUMERA-DOM-007` | pools, drivers, bases, destinos, aprobación, publicación y reversión definidos |
| rentabilidad actual no usa ingreso realizado y costo integral trazable | no | `NUMERA-DOM-008` | dimensiones, costo e ingreso conciliados soportan cálculo reproducible |
| la frontera fiscal de movimientos entre titulares distintos no está cerrada | no | `NUMERA-DOM-013` | tratamiento frente a autoridad contable/fiscal externa definido |
| venta externa futura de Producción no está implementada | no | `OPS-B2B-001` y dominios comerciales/financieros aplicables | proceso B2B y evidencia económica externa materializados |

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: esta tarea concreta el caso empresarial ya protegido por contratos de prueba vigentes sobre hechos económicos, costos, distribuciones, transferencias internas, fuentes productivas, movimientos, conciliación y rentabilidad. No introduce una obligación de prueba independiente que requiera cambiar el Registro 04A.

---

#### 27. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-NUMERA-001` para conciliación con hechos y fuentes, ausencia de doble registro y trazabilidad por empresa, sede, centro, actor y origen;
- `TREQ-NUMERA-002` para identidad del hecho económico, entidad legal, sede, centro, fechas, fuente, correlación, documento y correcciones no destructivas;
- `TREQ-NUMERA-004` para método, entradas, versión, vigencia, tipos de costo, pools, drivers, origen, destinos, aprobación, reversión, transferencias internas y rentabilidad;
- `TREQ-FOGO-004` para cantidades, materiales, rendimiento, merma, genealogía y cierre productivo conciliado;
- `TREQ-NEXO-011` para movimientos, proyecciones, idempotencia y ausencia de doble contabilización;
- `TREQ-INTEGRATION-013` para la cadena producción–calidad–inventario–costo correlacionada e idempotente;
- `TREQ-INTEGRATION-016` y `TREQ-INTEGRATION-017` para continuidad logística y llegada gobernada de hechos operativos a NUMERA.

Esta sección es trazabilidad de cobertura existente y no constituye una actualización del registro.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | esta tarea no ejecuta build de producto; el último snapshot NUMERA consumido por la auditoría precedente conserva su evidencia técnica separada |
| LOCAL | NOT_EXECUTED | la incorporación, formateo y batería documental sobre el checkout del usuario permanecen pendientes hasta que `NUMERA-AUD-012` cierre y habilite la sucesora |
| REMOTA | PASS | se verificaron en `vento-shell/main` el marcador propietario, continuidad, topología, políticas documentales, `OPS-GOV-001`, auditoría operativa, `CAP-SCOPE-008`, `CAP-SCOPE-011`, `CAP-SCOPE-012`, auditorías NUMERA aplicables, proceso financiero objetivo y Registro 04A vigente |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron transferencias, remisiones, distribuciones, ventas, valorizaciones, cierres ni conciliaciones reales |
| FÍSICA | NOT_APPLICABLE | `OPS-CST-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia |

---

#### 29. Criterios de aceptación

La tarea queda aceptable cuando:

1. Producción y Distribución quedan económicamente distinguibles aunque compartan instalación física;
2. no se crea un catálogo paralelo de centros de costo;
3. marca, sede, entidad legal y centro de costo permanecen conceptos distintos;
4. se distingue movimiento físico de transferencia interna económica;
5. la transferencia interna no se trata automáticamente como venta, ingreso o gasto legal;
6. se define el vínculo mínimo entre movimiento/remisión, producto, cantidad, lote, origen, destino y valorización;
7. despacho y recepción no se tratan como el mismo momento económico;
8. referencia previa, costo real y variación permanecen separados;
9. costo productivo, merma, costo logístico, costo directo, costo compartido y costo interno no se mezclan silenciosamente;
10. los costos compartidos exigen pool, base, driver, destinos, versión, aprobación y reversión;
11. la atribución directa tiene prioridad sobre el reparto arbitrario;
12. una base desconocida queda pendiente antes que usar un porcentaje inventado;
13. la rentabilidad consolidada elimina valores internos para evitar ingreso duplicado;
14. la venta externa futura queda separada de la transferencia interna;
15. las fuentes físicas permanecen en FOGO/NEXO/ORIGO y NUMERA no duplica sus hechos;
16. cada excepción material conserva tratamiento o propietario posterior;
17. no se fijan impuestos, asientos, facturas intercompañía ni precios de transferencia fiscales;
18. no se crean ni modifican requisitos de prueba;
19. no se realizan cambios físicos;
20. la continuidad reserva `NUMERA-DOM-001`.

---

#### 30. Límites

Esta tarea no:

- crea, renombra, activa, desactiva o elimina centros de costo;
- decide los códigos definitivos de Producción o Distribución;
- crea migraciones o modifica Supabase;
- implementa un motor de costos;
- fija fórmulas numéricas definitivas de costo estándar o real;
- fija porcentajes o drivers universales;
- cambia recetas, lotes, consumos, mermas o inventario;
- modifica remisiones o estados logísticos;
- registra transferencias internas reales;
- crea ventas, pedidos, facturas, cuentas por cobrar o cuentas por pagar;
- decide impuestos, contabilidad formal, precios de transferencia fiscales o tratamiento intercompañía;
- aprueba una venta B2B desde Producción;
- crea permisos o roles;
- modifica 04A;
- desarrolla todavía `NUMERA-DOM-001`.

---

#### 31. Handoff a NUMERA-DOM-001

La siguiente tarea recibe un caso empresarial cerrado con estas invariantes:

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

`NUMERA-DOM-001` deberá usar estas invariantes para definir el alcance ejecutivo, analítico y contable general de NUMERA sin convertir esta tarea en diseño físico o fiscal anticipado.

---

#### 32. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-012 — Crear matriz capacidad financiera × implementación actual`

**TAREA ACTUAL APROBADA**
`OPS-CST-001 — Definir el caso de centro de costo y transferencias internas de Producción y Distribución`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-DOM-001 — Definir alcance ejecutivo, analítico y contable de NUMERA`
