### MINI-BLOQUE — TRANSICIÓN DEL POS EXTERNO

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **transición del pos externo** dentro de **X INTEGRACIONES**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `INT-POS-001` a `INT-POS-024` — 24 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Auditar documentación, endpoints, webhooks y límites del POS vigente” y concluye con “Definir revocación o reducción de credenciales cuando PULSO asuma la fuente”.
<!-- PLAN-SECTION-META:END -->

> **DECISIÓN VIGENTE 2026-10-22 · GOBIERNO DE ALCANCE POS PROPIO:** VENTO construirá el POS integral **nativo en PULSO**. Se **CANCELA COMO OBJETIVO** la integración con Makos u otro POS externo; no se implementarán credenciales, API, webhooks, polling, XLSX, sincronización de precios del proveedor, mapeos, conciliación ni pilotos como solución intermedia. Las **24 identidades INT-POS-001..024** y sus secciones aprobadas quedan preservadas **como historia documental**, no como cartera física por ejecutar. Esta declaración de supersesión no es ejecución de migración, retiro SQL, aprobación de deploy ni acreditación de POS E2E. La disposición por ID y las proyecciones generadas permanecen sujetas a reconciliación canónica y gates; ver [#1038](https://github.com/vento-group-sas/vento-shell/issues/1038).
>
> **Disposición objetivo por familias (24/24 identidades):** `INT-POS-001..004` = auditoría/integración/credenciales externas descartadas; `INT-POS-005` = **reutilizar solo el contrato canónico de venta nativa**, sin proveedor POS externo; `INT-POS-006..014` = importación, mapping, cuarentena y polling externos descartados; `INT-POS-015..019` = conservar semánticas de **eventos de venta, inventario NEXO, NUMERA, PASS y reversas**, pero **originados directamente por PULSO nativo** bajo contratos gobernados distintos del adaptador externo; `INT-POS-020` = conciliación con proveedor POS externo descartada, mantener conciliación **interna** de caja/venta/pago; `INT-POS-021..024` = pilotos de convivencia, transición y credenciales de proveedor descartados. Mantener evidencia histórica y datos existentes; no reactivar la funcionalidad `/sales-imports`.
>
> **Fronteras preservadas:** el catálogo y las unidades siguen en NEXO; recetas y producción en FOGO; la venta, oferta/precios/comandas, pagos y caja en PULSO; fidelidad en PASS; hechos económicos en NUMERA. Las integraciones con canales externos de pedidos y con proveedores de pagos/fiscalidad **no son integraciones de POS externo**. Se permiten incrementos internos de ingeniería/QA sin despliegue comercial hasta E2E integral.

### ✅ INT-POS-001 — Auditar documentación, endpoints, webhooks y límites del POS vigente

**Estado:** APROBADA  
**Tarea anterior:** `INT-PROD-005 — Definir tratamiento de producción insuficiente para remisiones`  
**Tarea siguiente:** `INT-POS-002 — Confirmar información disponible mediante API`  
**Tipo de tarea:** documental; auditoría AS-IS del POS externo vigente, de la evidencia técnica disponible, del mecanismo actual de importación hacia PULSO y de las capacidades de integración públicamente demostrables, sin implementar adaptadores, credenciales, endpoints, webhooks, polling, efectos internos, migraciones ni cambios remotos  
**Línea base documental:** `vento-shell@df1f08e51c7ce9a12e77f74cf2c49b2a3c899fef`  
**Línea base de implementación PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**Sistemas involucrados:** `Makos`, `PULSO`, `SHELL`; `NEXO`, `NUMERA` y `PASS` únicamente como consumidores futuros del contrato de venta validada  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Auditar el POS externo vigente antes de diseñar su transición hacia el contrato canónico de ventas de Vento, separando rigurosamente:

- lo que está confirmado por la línea base canónica;
- lo que ya existe físicamente en Vento;
- lo que el proveedor publica de forma oficial;
- lo que todavía no está demostrado mediante documentación técnica o acceso del tenant;
- lo que corresponde resolver en las tareas posteriores `INT-POS`.

La tarea evita convertir una suposición sobre el proveedor en un contrato de integración.

Regla raíz:

```text
EVIDENCIA CANÓNICA DEL POS VIGENTE
+
EVIDENCIA DE IMPLEMENTACIÓN EXISTENTE
+
DOCUMENTACIÓN OFICIAL DEL PROVEEDOR
        ↓
CAPACIDAD CONFIRMADA / NO DEMOSTRADA / PENDIENTE DE CONFIRMACIÓN
        ↓
TAREA PROPIETARIA EXACTA PARA CADA BRECHA
        ↓
CERO ENDPOINTS, WEBHOOKS, LÍMITES O CREDENCIALES INVENTADOS
```

---

#### 2. Resultado de la auditoría

El POS externo vigente identificado por la evidencia operacional canónica es **Makos**.

La evidencia disponible permite afirmar simultáneamente:

1. Makos es el sistema registrado como `Makos / POS vigente` en la línea base AS-IS de Vento.
2. El acceso técnico del proveedor fue registrado como `POR_CONFIRMAR_ACCESO`; por tanto, la existencia y el alcance de una API utilizable por el tenant Vento no se dan por hechos.
3. La implementación actual demostrada en Vento no consume una API ni un webhook de Makos: utiliza una importación de archivo Excel identificada como `makos_excel`.
4. La implementación actual conserva lotes de importación por sede y fecha, hash del archivo, filas externas, cantidades y valores, y resuelve mapeos hacia productos de Vento.
5. La documentación pública oficial localizada de Makos demuestra capacidades generales de facturación, inventario, tesorería, informes, múltiples ubicaciones y consulta o exportación de información.
6. En la documentación pública oficial auditada no se encontró un catálogo técnico que permita congelar endpoints, autenticación, scopes, webhooks, paginación, rate limits, ventanas históricas, firmas, reintentos o garantías de entrega.
7. La ausencia de documentación pública localizada **no demuestra que Makos carezca de API o webhooks**. Esas capacidades quedan en estado `PENDIENTE_CONFIRMACION_PROVEEDOR_TENANT` y corresponden a las tareas posteriores.

---

#### 3. Clasificación de evidencia

| Estado de evidencia                       | Significado en este mini-bloque                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `CONFIRMADO_CANONICO`                     | Existe una fuente documental aprobada de Vento que identifica el hecho o sistema.                  |
| `CONFIRMADO_IMPLEMENTACION`               | Existe código, migración o contrato físico vigente que demuestra el comportamiento.                |
| `CONFIRMADO_PUBLICO_PROVEEDOR`            | Existe documentación pública oficial del proveedor que demuestra la capacidad general.             |
| `NO_DEMOSTRADO_PUBLICAMENTE`              | No se localizó documentación pública oficial suficiente para congelar el detalle técnico.          |
| `PENDIENTE_CONFIRMACION_PROVEEDOR_TENANT` | Requiere evidencia del proveedor o del tenant de Vento antes de diseñar o implementar el contrato. |
| `NO_APLICA_A_ESTA_TAREA`                  | La decisión corresponde explícitamente a una tarea posterior y no se adelanta aquí.                |

`NO_DEMOSTRADO_PUBLICAMENTE` no equivale a `NO_EXISTE` ni a `NO_SOPORTADO`.

---

#### 4. Identidad y frontera del POS vigente

| Elemento                                           | Resultado                                              | Evidencia                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| POS externo vigente                                | `Makos`                                                | `CONFIRMADO_CANONICO`                                                                        |
| Rol durante la transición                          | fuente externa temporal candidata para hechos de venta | definido por el mini-bloque `INT-POS`; la propiedad definitiva se congela en `INT-POS-003`   |
| Documento fiscal durante la transición             | permanece bajo responsabilidad del POS vigente         | regla ya congelada en el mini-bloque                                                         |
| Acceso técnico del tenant                          | `POR_CONFIRMAR_ACCESO`                                 | `CONFIRMADO_CANONICO` como estado de descubrimiento; capacidad técnica todavía no demostrada |
| Acceso directo del proveedor a Supabase            | prohibido                                              | regla del mini-bloque `INT-POS`                                                              |
| Escritura directa del proveedor en tablas internas | prohibida                                              | regla del mini-bloque `INT-POS`                                                              |
| Integración API productiva actual                  | no demostrada                                          | no se encontró cliente Makos/API en la implementación auditada                               |
| Integración webhook productiva actual              | no demostrada                                          | no se encontró receptor o contrato webhook Makos en la implementación auditada               |
| Mecanismo actual demostrado                        | importación Excel hacia PULSO                          | `CONFIRMADO_IMPLEMENTACION`                                                                  |

---

#### 5. Implementación física actual demostrada

La implementación vigente observada en Vento utiliza una ruta de importación diaria de ventas con fuente `makos_excel`.

La persistencia actual registra lotes de importación con, entre otros:

- `site_id`;
- `sales_date`;
- `source`;
- `source_file_name`;
- `source_file_hash`;
- estado del lote;
- conteos de filas y coincidencias;
- cantidad total;
- subtotal;
- impuestos;
- descuentos;
- devoluciones;
- venta neta;
- actor y momento de importación.

Las filas importadas conservan, entre otros:

- número de fila de origen;
- identificador externo de producto cuando existe;
- nombre externo de producto;
- categoría externa;
- cantidad;
- subtotal;
- impuestos;
- descuentos;
- devoluciones;
- venta neta y venta bruta;
- referencias internas de catálogo y producto cuando se resuelven;
- estado del mapeo y causa.

La aplicación PULSO observada procesa libros Excel y reconoce encabezados como:

- `ID`;
- `PRODUCTO`;
- `CATEGORÍA`;
- `CANTIDAD`;
- `SUBTOTAL`;
- `IMPUESTOS`;
- `DESCUENTOS`;
- `DEVOLUCIONES`.

La identidad del archivo se protege mediante hash y la base impide repetir el mismo hash para la misma combinación de sede, fecha y fuente.

Este control evita repetir exactamente un archivo ya registrado, pero **no equivale todavía a idempotencia canónica por venta y línea externa**, que pertenece a `INT-POS-013`.

---

#### 6. Límite del Excel actual frente al contrato objetivo

El flujo actual demuestra capacidad útil de conciliación agregada por producto, pero no demuestra por sí mismo un hecho canónico de venta individual.

En el contrato físico auditado no se observaron como campos obligatorios de cada fila importada:

- identificador externo de venta;
- identificador externo de línea de venta;
- timestamp autoritativo de la venta;
- estado transaccional de la venta;
- terminal o caja externa;
- cajero o actor externo;
- cliente cuando aplique;
- documento fiscal y su estado;
- propina;
- uno o varios medios de pago;
- referencias de pago;
- identidad individual de una anulación o reembolso;
- versión o secuencia de actualización de una venta.

Por tanto:

```text
IMPORTACIÓN DIARIA MAKOS_EXCEL
≠
CONTRATO CANÓNICO DE VENTA INDIVIDUAL
```

El flujo Excel vigente se conserva como evidencia y contingencia existente; no se promoverá silenciosamente a integración transaccional completa.

---

#### 7. Auditoría de documentación oficial pública de Makos

La documentación pública oficial localizada confirma capacidades generales del producto Makos relacionadas con:

- facturación;
- inventario;
- tesorería;
- informes;
- operación con múltiples ubicaciones;
- consulta y exportación de información;
- actualización de cumplimiento normativo del producto.

La auditoría pública no encontró evidencia técnica oficial suficiente para congelar los siguientes elementos:

| Elemento técnico                                   | Estado                       |
| -------------------------------------------------- | ---------------------------- |
| URL base de API                                    | `NO_DEMOSTRADO_PUBLICAMENTE` |
| versión de API                                     | `NO_DEMOSTRADO_PUBLICAMENTE` |
| mecanismo de autenticación                         | `NO_DEMOSTRADO_PUBLICAMENTE` |
| scopes o permisos                                  | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de ventas                                 | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de líneas                                 | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de productos                              | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de sedes, cajas o terminales              | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de pagos                                  | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de documentos fiscales                    | `NO_DEMOSTRADO_PUBLICAMENTE` |
| endpoint de anulaciones, devoluciones o reembolsos | `NO_DEMOSTRADO_PUBLICAMENTE` |
| filtros incrementales o cursores                   | `NO_DEMOSTRADO_PUBLICAMENTE` |
| paginación                                         | `NO_DEMOSTRADO_PUBLICAMENTE` |
| rate limits                                        | `NO_DEMOSTRADO_PUBLICAMENTE` |
| ventana o retención histórica                      | `NO_DEMOSTRADO_PUBLICAMENTE` |
| webhooks disponibles                               | `NO_DEMOSTRADO_PUBLICAMENTE` |
| catálogo de eventos webhook                        | `NO_DEMOSTRADO_PUBLICAMENTE` |
| firma o autenticación de webhook                   | `NO_DEMOSTRADO_PUBLICAMENTE` |
| política de reintento webhook                      | `NO_DEMOSTRADO_PUBLICAMENTE` |
| orden o garantía de entrega                        | `NO_DEMOSTRADO_PUBLICAMENTE` |
| mecanismo de replay o recuperación                 | `NO_DEMOSTRADO_PUBLICAMENTE` |

Todos estos elementos pasan a `PENDIENTE_CONFIRMACION_PROVEEDOR_TENANT` cuando sean necesarios para la transición.

---

#### 8. Información que debe confirmar `INT-POS-002`

`INT-POS-002 — Confirmar información disponible mediante API` deberá resolver con evidencia del proveedor o del tenant, sin inferir desde la interfaz de usuario:

1. si Vento dispone de una API habilitable o habilitada;
2. modalidad de acceso y ambiente;
3. versión y estabilidad contractual;
4. objetos consultables;
5. campos reales de venta y línea;
6. identificadores estables de venta, línea, producto, sede, terminal y documento;
7. timestamps disponibles y su semántica;
8. estados y revisiones de ventas;
9. descuentos, impuestos y propinas;
10. medios y estados de pago;
11. anulaciones, devoluciones y reembolsos;
12. documentos fiscales y referencias consultables;
13. filtros, cursores, paginación y ordenamiento;
14. límites de consulta;
15. ventanas históricas o retención;
16. consistencia entre consulta inicial y consulta posterior;
17. cualquier restricción por plan, país, empresa o tenant.

Si la evidencia del proveedor sigue siendo insuficiente, `INT-POS-002` deberá conservar explícitamente el resultado no concluyente y no crear un contrato imaginario.

---

#### 9. Distribución exacta de brechas hacia tareas posteriores

| Brecha o decisión pendiente                                                                                 | Tarea propietaria                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Confirmar existencia, objetos, campos, endpoints y límites reales de API                                    | `INT-POS-002 — Confirmar información disponible mediante API`                                                                |
| Congelar a Makos como fuente temporal del hecho de venta y sus límites de autoridad                         | `INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`                                               |
| Diseñar credencial independiente, revocable y de solo lectura                                               | `INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura` |
| Definir identidad y semántica de venta y línea canónicas                                                    | `INT-POS-005 — Definir contrato canónico de venta y línea de venta`                                                          |
| Encabezados, líneas, estados y timestamps                                                                   | `INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`                                             |
| Descuentos, impuestos, propinas y medios de pago                                                            | `INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`                                      |
| Anulaciones, devoluciones y reembolsos                                                                      | `INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`                                                |
| Payload original, versión, hash y recepción                                                                 | `INT-POS-009 — Definir conservación de payload original, versión, hash y fecha de recepción`                                 |
| Empresa, sede, terminal y caja externas                                                                     | `INT-POS-010 — Definir mapeo de empresa, sede, terminal y caja externa`                                                      |
| Producto, presentación y receta                                                                             | `INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta`                                     |
| Filas sin mapeo                                                                                             | `INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario`                                         |
| Idempotencia de venta y línea externa                                                                       | `INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`                                                      |
| Disponibilidad de webhook, catálogo de eventos, seguridad, reintentos, polling y frecuencia de conciliación | `INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`                                        |
| Evento interno de venta validada                                                                            | `INT-POS-015 — Definir emisión del evento canónico de venta validada`                                                        |
| Movimiento NEXO                                                                                             | `INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`                                                     |
| Efecto económico NUMERA                                                                                     | `INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`                                                     |
| Fidelización PASS                                                                                           | `INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`                                                  |
| Compensación de anulaciones y devoluciones                                                                  | `INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`                                       |
| Conciliación entre fuente externa y efectos Vento                                                           | `INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`                                                     |
| Prueba sin efectos internos                                                                                 | `INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`                                                      |
| Prueba con efectos habilitados                                                                              | `INT-POS-022 — Diseñar piloto controlado con efectos habilitados`                                                            |
| Reemplazo futuro de la fuente externa                                                                       | `INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`                                                      |
| Retiro o reducción de credenciales externas                                                                 | `INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente`                                  |

No queda una brecha técnica de esta auditoría sin tarea propietaria dentro del mini-bloque.

---

#### 10. Reglas de decisión congeladas por la auditoría

1. No se documentará una API Makos como disponible para Vento hasta disponer de evidencia verificable del proveedor o tenant.
2. No se inventarán endpoints, parámetros, scopes, límites, eventos webhook ni garantías de entrega.
3. Una capacidad visible en la aplicación Makos no prueba que exista mediante API.
4. Una capacidad exportable no prueba que sea consultable transaccionalmente ni en tiempo real.
5. El Excel actual es evidencia de una integración por archivo, no de una integración API.
6. El hash actual del archivo protege la repetición del mismo lote importado, pero no sustituye la identidad externa de venta y línea.
7. La importación actual no habilita por sí sola efectos automáticos sobre NEXO, NUMERA o PASS.
8. Una futura integración con Makos deberá atravesar el adaptador y staging definidos por el mini-bloque; Makos no escribirá directamente en tablas de Vento ni recibirá acceso directo a Supabase.
9. Una línea sin mapeo permanecerá sin efecto de inventario.
10. La responsabilidad fiscal externa durante la transición no convierte a Makos en propietaria de inventario, costos, contabilidad interna, catálogo canónico o fidelización de Vento.
11. Webhook y polling no se elegirán por preferencia arquitectónica antes de confirmar qué ofrece realmente el proveedor.
12. El flujo Excel podrá mantenerse como contingencia o fuente auxiliar únicamente si las tareas posteriores definen explícitamente su semántica y conciliación.

---

#### 11. Riesgos identificados

| Riesgo                                                 | Control documental                                                                  |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Diseñar contra endpoints inexistentes o no habilitados | bloquear detalle técnico hasta `INT-POS-002`                                        |
| Confundir exportación agregada con venta individual    | separar expresamente Excel actual del contrato de venta de `INT-POS-005`            |
| Duplicar efectos al volver a importar                  | conservar hash de lote actual y definir idempotencia transaccional en `INT-POS-013` |
| Descontar inventario con producto externo no resuelto  | aplicar cuarentena de `INT-POS-012` antes de `INT-POS-016`                          |
| Perder reversos                                        | materializar semántica en `INT-POS-008` y compensación en `INT-POS-019`             |
| Perder ventas por depender solo de push                | resolver webhook y polling de respaldo en `INT-POS-014`                             |
| Exponer credenciales con alcance excesivo              | aplicar `INT-POS-004`                                                               |
| Considerar la transición como PULSO terminado          | preservar `INT-POS-023` y la regla de transición temporal                           |

---

#### 12. Criterios de aceptación

La auditoría se considera documentalmente completa porque:

1. identifica inequívocamente a Makos como POS vigente observado;
2. preserva `POR_CONFIRMAR_ACCESO` como límite del descubrimiento técnico;
3. diferencia capacidad pública general de capacidad técnica de integración;
4. registra que la implementación física actual demostrada usa `makos_excel`;
5. documenta los campos efectivamente presentes en el importador existente;
6. evidencia que el Excel actual no contiene el contrato individual completo de venta y línea;
7. no afirma la existencia ni ausencia definitiva de API o webhooks sin evidencia del proveedor;
8. no inventa URL base, versión, endpoints, scopes, límites ni eventos;
9. remite la confirmación API a `INT-POS-002`;
10. remite credenciales a `INT-POS-004`;
11. remite webhook y polling a `INT-POS-014`;
12. asigna cada brecha funcional restante a una tarea `INT-POS` exacta;
13. mantiene la frontera obligatoria adaptador → staging → validación → mapeo → contrato canónico;
14. no habilita efectos físicos, económicos o de fidelización;
15. no altera el Registro 04A ni redefine requisitos históricos.

---

#### 13. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

La tarea es una auditoría documental de capacidades y evidencia. No introduce comportamiento objetivo nuevo, no cambia una regla empresarial, no modifica una frontera de autorización y no reemplaza requisitos vigentes. Las decisiones ejecutables quedan reservadas a `INT-POS-002` a `INT-POS-024`.

#### 14. Cobertura de prueba existente preservada

Se conserva sin modificación la cobertura ya vigente, incluyendo:

- `TREQ-PULSO-005`, que protege la separación del ciclo comercial, estados y hechos relacionados;
- `TREQ-PULSO-006`, que protege venta, pago, documento fiscal, descuento, propina, anulación, devolución, reembolso, compensación y conciliación como hechos autorizados y auditables;
- `TREQ-INTEGRATION-014`, ya relacionado canónicamente con la integración y continuidad de los flujos comerciales externos.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 15. Continuidad

**ÚLTIMA TAREA APROBADA**  
`INT-PROD-005 — Definir tratamiento de producción insuficiente para remisiones`

**TAREA ACTUAL APROBADA**  
`INT-POS-001 — Auditar documentación, endpoints, webhooks y límites del POS vigente`

**SIGUIENTE TAREA RESERVADA**  
`INT-POS-002 — Confirmar información disponible mediante API`


### ✅ INT-POS-002 — Confirmar información disponible mediante API

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-001 — Auditar documentación, endpoints, webhooks y límites del POS vigente`  
**Tarea siguiente:** `INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`  
**Tipo de tarea:** documental; confirmación de disponibilidad técnica de la API del POS externo vigente y clasificación de la evidencia realmente disponible, sin solicitar credenciales, iniciar integración, definir endpoints por inferencia, implementar adaptadores, ejecutar webhooks, modificar Supabase ni producir efectos internos  
**Línea base documental:** `vento-shell@ca823d550fa28f9246f2f296683aa70f63f1d6c0`  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**Sistema externo confirmado:** `Makos`  
**Aplicación objetivo futura:** `PULSO`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Confirmar qué puede afirmarse de la integración API de Makos después de incorporar la evidencia directa comunicada por el titular de Vento, sin convertir esa confirmación comercial u operativa en una especificación técnica inexistente.

La tarea resuelve la incertidumbre dejada por `INT-POS-001` sobre la existencia de una API habilitable para Vento y conserva como no demostrados todos los detalles técnicos que todavía no han sido entregados por el proveedor.

Regla raíz:

```text
CONFIRMACIÓN DIRECTA DEL PROVEEDOR TRANSMITIDA AL TITULAR DE VENTO
        ↓
API HABILITABLE BAJO SOLICITUD
        ↓
PROVISIONAMIENTO Y ACOMPAÑAMIENTO DEL DESARROLLADOR DE MAKOS
        ↓
SIN ESPECIFICACIÓN, CREDENCIALES NI CONTRATO TÉCNICO ENTREGADOS TODAVÍA
        ↓
CERO ENDPOINTS, CAMPOS, LÍMITES O WEBHOOKS INVENTADOS
```

---

#### 2. Evidencia incorporada

El titular de Vento confirma que Makos le informó directamente lo siguiente:

1. la API para la integración no se encuentra publicada como un recurso autogestionado del cliente;
2. la habilitación o generación de la API debe solicitarse al desarrollador de Makos;
3. Makos indicó que su desarrollador se comunicaría directamente con Vento para realizar o acompañar la integración;
4. Vento no inició ese proceso y no recibió una especificación técnica, credenciales ni contrato de integración;
5. por tanto, la ausencia actual de credenciales o documentación técnica no significa que la API no exista, sino que todavía no fue provisionada para Vento.

Esta evidencia cambia la clasificación de la capacidad desde `PENDIENTE_CONFIRMACION_PROVEEDOR_TENANT` sobre la existencia de la API a una confirmación de **API habilitable bajo solicitud**, pero no confirma todavía su contrato técnico.

---

#### 3. Clasificación de evidencia utilizada

| Estado                                  | Significado                                                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIRMADO_PROVEEDOR_VIA_TITULAR`      | El titular de Vento recibió directamente del proveedor la confirmación indicada y la incorpora como evidencia operativa del tenant. |
| `CONFIRMADO_HABILITABLE`                | La capacidad existe para Vento bajo un proceso de solicitud o provisionamiento del proveedor.                                       |
| `NO_PROVISIONADO`                       | Vento no dispone todavía de credencial, especificación o acceso técnico emitido para esa integración.                               |
| `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR` | El detalle solo podrá congelarse cuando Makos entregue evidencia técnica verificable para el tenant.                                |
| `NO_APLICA_A_ESTA_TAREA`                | La definición pertenece a otra tarea del mini-bloque y no se adelanta aquí.                                                         |

`CONFIRMADO_HABILITABLE` no equivale a `HABILITADO_EN_PRODUCCION`, y `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR` no equivale a `NO_SOPORTADO`.

---

#### 4. Resultado material de la confirmación

La situación de Makos queda congelada documentalmente así:

| Elemento                                             | Resultado                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Existencia de una API habilitable para Vento         | `CONFIRMADO_HABILITABLE`                                                                        |
| Forma de obtención                                   | solicitud al desarrollador de Makos                                                             |
| Participación del proveedor                          | el desarrollador de Makos ofreció comunicación directa para realizar o acompañar la integración |
| API actualmente provisionada a Vento                 | `NO_PROVISIONADO`                                                                               |
| Credenciales actualmente recibidas                   | `NO_PROVISIONADO`                                                                               |
| Especificación técnica actualmente recibida          | `NO_PROVISIONADO`                                                                               |
| Integración API Makos → Vento actualmente iniciada   | no                                                                                              |
| Integración API Makos → Vento actualmente productiva | no demostrada                                                                                   |
| Cliente API Makos implementado en Vento              | no demostrado                                                                                   |
| Webhook Makos implementado en Vento                  | no demostrado                                                                                   |
| Mecanismo de integración actualmente demostrado      | importación `makos_excel` documentada en `INT-POS-001`                                          |

Conclusión:

```text
MAKOS TIENE UNA VÍA DE INTEGRACIÓN API HABILITABLE PARA VENTO

pero

VENTO TODAVÍA NO TIENE EL CONTRATO TÉCNICO DE ESA API
```

---

#### 5. Confirmación de los diecisiete puntos heredados de INT-POS-001

|   Nº | Información requerida                                                          | Resultado de INT-POS-002                                                       | Tarea propietaria del detalle aún no demostrado            |
| ---: | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
|    1 | API habilitable o habilitada                                                   | `CONFIRMADO_HABILITABLE`; no se demuestra que esté actualmente habilitada      | `INT-POS-004` para provisionamiento y credencial           |
|    2 | modalidad de acceso y ambiente                                                 | se confirma provisionamiento asistido por desarrollador; ambiente no entregado | `INT-POS-004`                                              |
|    3 | versión y estabilidad contractual                                              | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`                                              |
|    4 | objetos consultables                                                           | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`, `INT-POS-007` e `INT-POS-008` según dominio |
|    5 | campos reales de venta y línea                                                 | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`                                              |
|    6 | identificadores estables de venta, línea, producto, sede, terminal y documento | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`, `INT-POS-010` e `INT-POS-011`               |
|    7 | timestamps y semántica temporal                                                | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`                                              |
|    8 | estados y revisiones de ventas                                                 | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006`                                              |
|    9 | descuentos, impuestos y propinas                                               | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-007`                                              |
|   10 | medios y estados de pago                                                       | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-007`                                              |
|   11 | anulaciones, devoluciones y reembolsos                                         | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-008`                                              |
|   12 | documentos fiscales y referencias consultables                                 | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-006` y `INT-POS-007`                              |
|   13 | filtros, cursores, paginación y ordenamiento                                   | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-014`                                              |
|   14 | límites de consulta                                                            | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-014`                                              |
|   15 | ventanas históricas o retención                                                | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-014`                                              |
|   16 | consistencia entre consulta inicial y posterior                                | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-014`                                              |
|   17 | restricciones por plan, país, empresa o tenant                                 | `PENDIENTE_EVIDENCIA_TECNICA_PROVEEDOR`                                        | `INT-POS-004`                                              |

Los puntos pendientes no se transforman en supuestos. Cada uno queda ligado a la tarea que necesita ese dato para definir el contrato correspondiente.

---

#### 6. Frontera entre confirmación y especificación técnica

Esta tarea confirma la **disponibilidad condicionada** de la API, no su diseño.

Por tanto, permanecen prohibidas por inferencia en esta etapa:

- URL base;
- versión;
- protocolo de autenticación;
- nombre o formato de credenciales;
- scopes;
- endpoints;
- métodos HTTP;
- parámetros;
- payloads;
- campos;
- códigos de error;
- rate limits;
- paginación;
- retención;
- webhooks;
- firmas;
- reintentos;
- SLA;
- garantías de consistencia.

Esos elementos solo podrán incorporarse cuando exista evidencia técnica verificable entregada por Makos para el tenant de Vento.

---

#### 7. Relación con la estrategia del POS propio

La disponibilidad de una API de Makos no cambia la arquitectura objetivo de Vento.

El mini-bloque `INT-POS-001` a `INT-POS-024` continúa siendo un bloque de **transición del POS externo**. Makos puede servir como fuente temporal y como puente de integración mientras exista, pero no se convierte por esta confirmación en el POS objetivo de Vento.

La construcción del POS propio permanece en `BLOQUE N — PULSO`, donde:

- `PULSO-AUTH-001` a `PULSO-AUTH-016` gobiernan autorización de venta y caja;
- `PULSO-UX-001` a `PULSO-UX-021` gobiernan experiencia POS y operación comercial;
- `PULSO-UX-021` diseña la arquitectura funcional y técnica del POS integral objetivo.

Dentro del mini-bloque actual, `INT-POS-023` preserva la transición futura desde el POS externo hacia PULSO y `INT-POS-024` preserva la revocación o reducción de credenciales cuando PULSO asuma la fuente.

Por tanto:

```text
INTEGRAR MAKOS, SI RESULTA NECESARIO COMO TRANSICIÓN
≠
CONSTRUIR EL POS DEFINITIVO SOBRE MAKOS
```

---

#### 8. Regla de contacto técnico con Makos

Cuando una tarea posterior requiera activar la integración, el contacto con el desarrollador de Makos se tratará como una interacción técnica entre proveedores y Vento, no como una obligación del titular de Vento de implementar personalmente el código.

La información mínima que deberá obtenerse antes de cualquier implementación será la especificación efectiva del tenant necesaria para la tarea propietaria correspondiente. Ninguna credencial se documentará en texto plano dentro del plan canónico ni se entregará acceso directo a Supabase.

Esta tarea no solicita todavía la activación de la API ni inicia una integración remota.

---

#### 9. Decisiones congeladas

1. Makos dispone para Vento de una vía de API habilitable bajo solicitud al desarrollador del proveedor.
2. La API no se considera actualmente provisionada, habilitada en producción ni técnicamente especificada para Vento.
3. La oferta de acompañamiento directo del desarrollador de Makos confirma un modelo de integración asistida por el proveedor.
4. No se inferirá ningún detalle técnico a partir de la interfaz, el Excel actual o una descripción comercial.
5. La ausencia de especificación técnica actual no bloquea el diseño documental general del mini-bloque, pero sí impide congelar detalles dependientes del contrato real del proveedor.
6. Cada detalle no demostrado queda vinculado a una tarea posterior exacta antes de que sea necesario para diseño o implementación.
7. Makos permanece como sistema externo de transición; PULSO permanece como POS integral objetivo de Vento.
8. Esta confirmación no autoriza solicitar credenciales, compartir secretos, crear endpoints, desplegar adaptadores ni modificar Supabase.

---

#### 10. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea cambia el estado documental de la evidencia sobre disponibilidad de una API externa, pero no introduce ni modifica comportamiento ejecutable de Vento, reglas de negocio, autorización, transformaciones, transiciones, integridad o contratos técnicos verificables. Crear una prueba sobre endpoints, límites o payloads todavía no entregados por Makos fabricaría una especificación inexistente. Los comportamientos de venta, pago, reversión e integración continúan cubiertos por los requisitos canónicos vigentes y los detalles técnicos producirán requisitos únicamente cuando una tarea posterior materialice un contrato verificable.

#### 11. Cobertura de prueba existente preservada

Se conserva sin modificación la cobertura vigente, incluyendo `TREQ-PULSO-005` y `TREQ-PULSO-006` para el ciclo comercial, venta, pago, fiscalidad y reversos. Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 12. Criterios de aceptación

La tarea queda documentalmente completa porque:

1. resuelve la incertidumbre sobre si Makos dispone de una API habilitable para Vento;
2. documenta que el acceso depende de solicitud y provisionamiento por el desarrollador de Makos;
3. registra que el proveedor ofreció acompañamiento directo para la integración;
4. distingue API habilitable de API ya provisionada o productiva;
5. declara que Vento todavía no recibió especificación técnica ni credenciales;
6. materializa los diecisiete puntos heredados de `INT-POS-001` con estado explícito;
7. asigna cada detalle técnico todavía no demostrado a una tarea propietaria exacta;
8. no inventa endpoints, campos, scopes, límites, webhooks ni garantías;
9. no solicita ni expone credenciales;
10. no implementa código, adaptadores, webhooks, migraciones ni efectos internos;
11. confirma que este mini-bloque gobierna la transición desde Makos y no la construcción definitiva del POS propio;
12. preserva a PULSO como POS integral objetivo dentro de `BLOQUE N`;
13. genera cero cambios `TREQ-*`;
14. mantiene reservada exclusivamente `INT-POS-003` como continuidad inmediata.

---

#### 13. Continuidad

**ÚLTIMA TAREA APROBADA**  
`INT-POS-001 — Auditar documentación, endpoints, webhooks y límites del POS vigente`

**TAREA ACTUAL APROBADA**  
`INT-POS-002 — Confirmar información disponible mediante API`

**SIGUIENTE TAREA RESERVADA**  
`INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`


### ✅ INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-002 — Confirmar información disponible mediante API`  
**Tarea siguiente:** `INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura`  
**Tipo de tarea:** documental; definición contractual de la autoridad temporal de Makos como sistema de origen de ventas durante la transición hacia PULSO, con frontera explícita frente a inventario, fidelización, finanzas, documento fiscal, transporte de integración y corte de fuente, sin implementar credenciales, adaptadores, endpoints, webhooks, migraciones ni efectos internos  
**Línea base documental:** `vento-shell@ab8fa7424ecd2740084e6655b4ab75218c2ecdfd`  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente:** `Makos`  
**POS integral objetivo:** `PULSO`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir con precisión qué significa que Makos sea la fuente temporal del hecho de venta mientras Vento completa la transición hacia PULSO, sin convertir al POS externo en propietario de inventario, fidelización, contabilidad interna, catálogo canónico, autorización ni arquitectura objetivo.

La tarea materializa para Makos la decisión ya aprobada en `CAP-SCOPE-009`:

```text
POS EXTERNO VIGENTE
→ FUENTE TEMPORAL DEL HECHO DE VENTA
→ ADAPTADOR Y STAGING
→ CONTRATO CANÓNICO DE VENTA
→ CONSUMIDORES INTERNOS

PULSO
→ FUENTE OBJETIVO DESPUÉS DEL CORTE
→ MISMO CONTRATO CANÓNICO DE VENTA
→ MISMOS CONSUMIDORES INTERNOS
```

La transición deberá conservar una sola fuente de origen para cada venta y evitar que el mecanismo de integración se convierta en una segunda fuente empresarial.

---

#### 2. Decisión principal

Mientras una sede y terminal permanezcan dentro del alcance operativo del POS externo, **Makos será la fuente temporal del hecho de venta originado en ese alcance**.

Cuando el corte aprobado traslade una sede y terminal a PULSO, **PULSO será la fuente de las nuevas ventas originadas desde la fecha efectiva del corte**.

La autoridad temporal se define por origen y vigencia, no por tecnología de transporte.

Por tanto:

```text
MAKOS POR EXCEL
=
MAKOS POR API
=
MAKOS POR OTRO MECANISMO AUTORIZADO

respecto al sistema de origen del hecho
```

pero:

```text
TRANSPORTE
≠
FUENTE DE VERDAD EMPRESARIAL
```

El archivo, endpoint, webhook, polling, adaptador o staging que transporte el dato nunca sustituirá a Makos como sistema de origen ni se convertirá en propietario del hecho de venta.

---

#### 3. Significado de “fuente temporal del hecho de venta”

La definición se limita al hecho comercial originado en Makos durante la transición.

Implica que:

1. la existencia del hecho externo y su procedencia deberán conservar a Makos como sistema de origen;
2. una representación recibida desde Makos deberá conservar trazabilidad suficiente para demostrar de qué fuente provino;
3. la normalización interna no podrá alterar el sistema de origen ni crear una segunda venta equivalente;
4. una corrección, anulación, devolución o revisión asociada a una venta originada en Makos deberá conservar correlación con el hecho original y no crear una venta PULSO independiente para sustituirla;
5. los consumidores internos recibirán el contrato canónico validado y no deberán depender del formato particular con el que Makos haya entregado la información;
6. la autoridad temporal de Makos terminará únicamente mediante el corte controlado definido por sede, terminal y fecha efectiva.

Esta tarea no define todavía los campos físicos, identificadores externos, payloads ni endpoints con los que se demostrará esa procedencia. Esa materialización pertenece a las tareas posteriores del mini-bloque.

---

#### 4. Frontera de autoridad

La autoridad temporal de Makos no se extiende a otros dominios empresariales de Vento.

| Hecho o responsabilidad                            | Autoridad durante la transición                 | Regla                                                                         |
| -------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| Venta originada en el POS externo                  | Makos como sistema de origen temporal           | se adapta y valida antes de producir efectos internos                         |
| Venta originada después del corte en PULSO         | PULSO                                           | no se recrea en Makos como segunda fuente interna                             |
| Contrato canónico consumido dentro de Vento        | Vento mediante el flujo de integración aprobado | el formato externo no gobierna a los consumidores                             |
| Inventario y movimientos físicos                   | NEXO                                            | Makos no descuenta ni corrige inventario interno directamente                 |
| Fidelización                                       | PASS                                            | Makos no modifica saldo, ledger o redenciones de PASS directamente            |
| Hecho económico interno                            | NUMERA                                          | Makos no contabiliza ni modifica el hecho económico interno                   |
| Documento fiscal durante la transición             | POS o proveedor fiscal autorizado               | Vento conserva referencia y estado sin asumir emisión no autorizada           |
| Catálogo, producto, presentación y receta de Vento | dominio canónico interno correspondiente        | los identificadores Makos requieren mapeo; no sustituyen identidades internas |
| Autorización empresarial                           | modelo de autorización Vento                    | una credencial Makos no concede permisos empresariales internos               |

La integración no transferirá propiedad empresarial desde las aplicaciones propietarias hacia Makos.

---

#### 5. Regla de fuente única

Para una misma venta no podrán coexistir Makos y PULSO como fuentes activas.

La transición deberá resolver la fuente mediante:

- sede;
- terminal;
- fecha efectiva de corte.

Dentro de un alcance todavía no cortado:

```text
ORIGEN DE NUEVA VENTA = MAKOS
```

Dentro de un alcance ya cortado:

```text
ORIGEN DE NUEVA VENTA = PULSO
```

Queda prohibido:

- crear en PULSO una segunda venta para representar una venta que ya tiene origen Makos;
- tratar una importación repetida de Makos como una nueva venta;
- permitir que un consumidor interno decida por su cuenta cuál de dos fuentes competidoras es la válida;
- activar simultáneamente ambos orígenes para la misma sede, terminal y periodo efectivo;
- modificar retrospectivamente el sistema de origen de una venta para simplificar conciliaciones.

---

#### 6. Corte y temporalidad

El corte no será una sustitución global instantánea de Makos por PULSO.

La unidad mínima aprobada para gobernar la transición será:

```text
SEDE
+
TERMINAL
+
FECHA EFECTIVA
```

Esto permite que durante una transición controlada existan alcances distintos con fuentes diferentes, sin que una misma venta tenga doble origen.

Una venta cuyo hecho corresponda al periodo anterior al corte conservará origen Makos aunque su recepción, conciliación o recuperación ocurra después. Una venta nueva dentro del alcance posterior al corte deberá originarse en PULSO.

La lógica exacta para conciliación diaria, recuperación y tratamiento de diferencias pertenece a `INT-POS-020`, y el procedimiento de transición hacia PULSO pertenece a `INT-POS-023`.

---

#### 7. Transporte independiente de la autoridad

La decisión de fuente no depende de que la información llegue por Excel, API, webhook o polling.

La implementación actualmente demostrada utiliza `makos_excel`. `INT-POS-002` confirmó además que Makos dispone de una vía de API habilitable bajo solicitud al desarrollador, aunque Vento todavía no tenga especificación ni credenciales provisionadas.

En cualquier caso deberá preservarse:

```text
MAKOS
→ ADAPTADOR DEL PROVEEDOR
→ STAGING Y PAYLOAD ORIGINAL
→ VALIDACIÓN E IDEMPOTENCIA
→ MAPEO DE SEDES Y PRODUCTOS
→ CONTRATO CANÓNICO DE VENTA
→ NEXO / NUMERA / PASS CUANDO CORRESPONDA
```

Cambiar el transporte no cambiará el sistema de origen de la venta.

---

#### 8. Condición para producir efectos internos

Que Makos sea la fuente temporal del hecho externo no autoriza a aplicar automáticamente sus datos en los dominios internos.

Antes de cualquier efecto deberán cumplirse las etapas documentadas por el mini-bloque:

1. recepción mediante el adaptador autorizado;
2. conservación de evidencia de origen;
3. validación del payload o representación recibida;
4. aplicación de idempotencia;
5. resolución de sede, terminal y fuente efectiva;
6. resolución de producto y demás mapeos requeridos;
7. cuarentena de líneas no resolubles;
8. construcción del contrato canónico de venta;
9. emisión del evento interno validado;
10. aplicación exactamente una vez por cada dominio consumidor.

Por tanto:

```text
HECHO EXTERNO RECIBIDO DE MAKOS
≠
EFECTO INTERNO YA AUTORIZADO
```

---

#### 9. Tratamiento del Excel actual

La importación `makos_excel` permanece como el mecanismo físicamente demostrado en Vento, pero su existencia no altera la definición de autoridad.

El Excel demuestra que Makos es la procedencia de información comercial importada, pero la línea base auditada no demuestra todavía el contrato individual completo de venta y línea requerido para automatizar todos los efectos internos.

Por eso:

- el Excel no se promueve por esta tarea a contrato canónico definitivo;
- la ausencia de identidad individual suficiente no se resuelve inventando claves;
- `INT-POS-005` definirá el contrato canónico de venta y línea;
- `INT-POS-006` definirá encabezados, líneas, estados y timestamps;
- `INT-POS-009` definirá payload original, versión, hash y recepción;
- `INT-POS-013` definirá idempotencia por sistema, venta y línea externa.

La fuente de origen puede quedar definida antes de que el mecanismo técnico final de integración esté implementado.

---

#### 10. Tratamiento de la API Makos

La disponibilidad de una API habilitable confirmada en `INT-POS-002` no cambia esta autoridad temporal.

Cuando la API sea provisionada, si el plan vigente decide utilizarla, deberá ser otro transporte de la misma fuente Makos y deberá respetar exactamente las mismas fronteras:

- ninguna escritura directa en tablas internas;
- ningún acceso de Makos a Supabase;
- ningún permiso empresarial derivado de una credencial técnica;
- ningún efecto directo sobre NEXO, PASS o NUMERA;
- ninguna pérdida de payload, procedencia o correlación;
- ninguna doble venta por coexistencia con el mecanismo anterior.

Los requisitos y procedimiento de la credencial se definirán exclusivamente en `INT-POS-004`.

---

#### 11. Relaciones con las tareas posteriores

| Decisión pendiente                                                   | Tarea propietaria |
| -------------------------------------------------------------------- | ----------------- |
| Credencial independiente, revocable y de solo lectura                | `INT-POS-004`     |
| Identidad y semántica del contrato de venta y línea                  | `INT-POS-005`     |
| Encabezados, líneas, estados, timestamps e identificadores recibidos | `INT-POS-006`     |
| Descuentos, impuestos, propinas y medios de pago                     | `INT-POS-007`     |
| Anulaciones, devoluciones y reembolsos                               | `INT-POS-008`     |
| Payload original, versión, hash y fecha de recepción                 | `INT-POS-009`     |
| Empresa, sede, terminal y caja externas                              | `INT-POS-010`     |
| Producto, presentación y receta                                      | `INT-POS-011`     |
| Líneas sin mapeo                                                     | `INT-POS-012`     |
| Idempotencia por sistema, venta y línea externa                      | `INT-POS-013`     |
| Webhook, polling, límites y conciliación de transporte               | `INT-POS-014`     |
| Evento canónico de venta validada                                    | `INT-POS-015`     |
| Efecto exactamente una vez en NEXO                                   | `INT-POS-016`     |
| Efecto económico exactamente una vez en NUMERA                       | `INT-POS-017`     |
| Fidelización en PASS                                                 | `INT-POS-018`     |
| Compensaciones de anulaciones y devoluciones                         | `INT-POS-019`     |
| Conciliación diaria                                                  | `INT-POS-020`     |
| Piloto sin efectos                                                   | `INT-POS-021`     |
| Piloto controlado con efectos                                        | `INT-POS-022`     |
| Corte futuro desde Makos hacia PULSO                                 | `INT-POS-023`     |
| Revocación o reducción de credenciales Makos                         | `INT-POS-024`     |

No queda un pendiente sustantivo de esta definición sin tarea propietaria dentro del mini-bloque.

---

#### 12. Decisiones congeladas

1. Makos es la fuente temporal del hecho de venta originado en el POS externo mientras el alcance correspondiente no haya sido transferido a PULSO.
2. PULSO es la fuente objetivo para las ventas nuevas después del corte efectivo del alcance correspondiente.
3. Una venta tendrá una sola fuente de origen.
4. La fuente se resuelve por sede, terminal y fecha efectiva de corte.
5. El mecanismo de transporte no cambia la fuente de origen.
6. El adaptador, staging o contrato canónico no se convierten en fuentes empresariales competidoras.
7. Makos no adquiere autoridad sobre inventario, fidelización, contabilidad interna, catálogo canónico ni autorización Vento.
8. Un hecho recibido de Makos deberá pasar por validación, mapeo e idempotencia antes de producir efectos internos.
9. Una línea sin mapeo no producirá efecto de inventario.
10. La transición no permitirá doble emisión Makos/PULSO para la misma venta.
11. El documento fiscal seguirá bajo responsabilidad del POS o proveedor fiscal autorizado durante la transición.
12. La integración con Makos es temporal y no sustituye la construcción posterior del POS integral PULSO.
13. Esta tarea no solicita credenciales, no inicia la API y no implementa cambios físicos.

---

#### 13. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta tarea materializa para Makos una decisión contractual ya protegida por la cobertura canónica existente de transición entre el POS externo y PULSO. No amplía el comportamiento protegido ni modifica identidad, estado, texto, relaciones, propietarios o momento de implementación de requisitos vigentes; por tanto, no requiere crear o modificar requisitos de prueba ni actualizar el registro 04A.

#### 14. Cobertura de prueba existente preservada

Se preserva sin modificación:

- `TREQ-INTEGRATION-014` como cobertura primaria de la transición POS externo ↔ PULSO, fuente única, adaptador, staging, idempotencia y corte controlado;
- `TREQ-PULSO-005` para la separación del ciclo comercial y los estados asociados;
- `TREQ-PULSO-006` para venta, pago, caja, documento fiscal, anulación, devolución, reembolso y conciliación como hechos separados y auditables.

Ningún requisito vigente cambia por `INT-POS-003`.

---

#### 15. Criterios de aceptación

La tarea queda documentalmente completa porque:

1. identifica a Makos como fuente temporal del hecho de venta del POS externo;
2. preserva a PULSO como fuente objetivo después del corte;
3. define una sola fuente de origen para cada venta;
4. fija sede, terminal y fecha efectiva como frontera de corte ya aprobada;
5. separa fuente empresarial de mecanismo de transporte;
6. impide que adaptador, staging o consumidores se conviertan en fuentes competidoras;
7. mantiene a NEXO, PASS y NUMERA como propietarios de sus respectivos efectos;
8. mantiene el documento fiscal bajo el POS o proveedor autorizado durante la transición;
9. exige validación, mapeo e idempotencia antes de producir efectos internos;
10. preserva la cuarentena de líneas sin mapeo;
11. mantiene `makos_excel` como mecanismo actual demostrado sin convertirlo en contrato definitivo;
12. incorpora la futura API únicamente como posible transporte de Makos, sin inventar especificación técnica;
13. distribuye todos los detalles pendientes entre `INT-POS-004` a `INT-POS-024` mediante propietarios exactos;
14. no implementa código, Supabase, credenciales, endpoints, webhooks, polling, efectos ni cutover;
15. genera cero cambios `TREQ-*` porque `TREQ-INTEGRATION-014` ya protege el comportamiento contractual definido;
16. mantiene reservada exclusivamente `INT-POS-004` como continuidad inmediata.

---

#### 16. Continuidad

**ÚLTIMA TAREA APROBADA**  
`INT-POS-002 — Confirmar información disponible mediante API`

**TAREA ACTUAL APROBADA**  
`INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`

**SIGUIENTE TAREA RESERVADA**  
`INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura`


### ✅ INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`  
**Tarea siguiente:** `INT-POS-005 — Definir contrato canónico de venta y línea de venta`  
**Tipo de tarea:** documental; definición normativa de requisitos, límites, evidencia y procedimiento de provisionamiento, custodia, uso y revocación de la credencial técnica destinada a la integración temporal con Makos, sin solicitar ni crear credenciales, seleccionar por inferencia un mecanismo de autenticación, contactar al proveedor, implementar el adaptador, modificar Supabase, ejecutar pilotos ni producir efectos internos  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Sistema externo:** `Makos`, preservando la identidad externa `EXT-SYS-013`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir el contrato que deberá cumplir cualquier credencial técnica utilizada para consultar Makos durante la transición hacia PULSO.

La credencial deberá ser simultáneamente:

- independiente de personas, cuentas operativas y otras integraciones;
- revocable sin depender de eliminar una copia local;
- limitada inicialmente a lectura efectiva;
- aislada por ambiente;
- custodiada fuera de clientes, repositorios, tablas empresariales, logs y documentación;
- incapaz de conceder por sí sola autoridad empresarial o acceso a Supabase;
- trazable mediante referencias no sensibles y lifecycle verificable.

La tarea no determina todavía si Makos utilizará API key, bearer token, OAuth, certificado, secreto compartido u otro mecanismo. Esa clasificación solo podrá realizarse cuando exista evidencia técnica del binding provisionado para Vento.

Regla raíz:

```text
MAKOS
+
CREDENCIAL TÉCNICA DEDICADA
+
PRINCIPAL TÉCNICO INDEPENDIENTE
+
AMBIENTE VENTO
+
ALCANCE EFECTIVO DE SOLO LECTURA
+
CUSTODIA SEGURA
+
REVOCACIÓN VERIFICABLE
        ↓
ADAPTADOR VENTO
        ↓
DATOS EXTERNOS RECIBIDOS
        ↓
VALIDACIÓN POSTERIOR SEGÚN EL CONTRATO INT-POS
```

La credencial autentica o identifica una relación técnica. No constituye permiso empresarial, actor humano, fuente interna de verdad ni autorización para mutar dominios Vento.

---

#### 2. Base canónica preservada

Esta tarea consume y conserva las decisiones ya aprobadas de `INT-POS-001`, `INT-POS-002` e `INT-POS-003`:

1. Makos es el POS externo vigente identificado para esta transición.
2. Makos confirmó a Vento una vía de API habilitable bajo solicitud al desarrollador del proveedor.
3. Vento no dispone actualmente de una credencial provisionada ni de una especificación técnica entregada para esa API.
4. El mecanismo real de autenticación, los scopes físicos, la separación de ambientes, la expiración y el procedimiento nativo de revocación permanecen sin evidencia técnica del proveedor.
5. Makos es fuente temporal del hecho de venta mientras corresponda, pero no adquiere autoridad sobre NEXO, PASS, NUMERA, PULSO, SHELL ni Supabase.
6. La existencia de una API habilitable no autoriza iniciar su integración durante esta fase documental.

También se preservan los contratos transversales aprobados en `INT-EXT-002` a `INT-EXT-008`:

- principal técnico independiente;
- procedencia de credencial separada de actor y permiso;
- mecanismo real determinado por evidencia;
- mínimo privilegio;
- separación `DEVELOPMENT` / `STAGING` / `PRODUCTION`;
- custodia segura;
- rotación, expiración, revocación y retiro.

`EXT-SYS-013` conserva su identidad. La identificación posterior de Makos y de una API habilitable refina la evidencia del binding específico sin renombrar la identidad externa ni inventar una familia de credencial.

---

#### 3. Definición de independencia

La credencial de Makos será independiente cuando cumpla simultáneamente:

1. esté destinada exclusivamente a la integración Makos ↔ Vento;
2. esté vinculada a un principal técnico no humano propio de esa integración;
3. no sea la contraseña, sesión, token o cuenta personal del titular de Vento, de un cajero, administrador, trabajador, desarrollador de Makos o desarrollador de Vento;
4. no se reutilice para otra identidad `EXT-SYS-*`, otro proveedor o otra finalidad;
5. no se comparta entre `DEVELOPMENT`, `STAGING` y `PRODUCTION`;
6. pueda sustituirse o revocarse sin invalidar credenciales ajenas a la integración;
7. no se convierta en una `PermissionKey` ni en una identidad empresarial de Vento;
8. no permita que Makos, su desarrollador o un tercero accedan directamente a Supabase.

Una cuenta comercial de Vento en Makos puede ser propietaria administrativa del binding si el proveedor lo exige, pero la credencial técnica consumida por el adaptador deberá permanecer separada de la sesión humana usada para administrar esa cuenta.

---

#### 4. Definición de revocabilidad

La credencial será revocable únicamente si existe un procedimiento real para invalidarla en la autoridad que la acepta.

Por tanto:

```text
BORRAR VARIABLE LOCAL
≠ REVOCAR
```

```text
DESHABILITAR ADAPTADOR
≠ REVOCAR
```

```text
CREAR CREDENCIAL NUEVA
≠ COMPLETAR ROTACIÓN
```

La evidencia que Makos deberá entregar antes de una activación incluirá, cuando aplique:

- quién emite o administra la credencial;
- dónde o mediante quién se solicita la invalidación;
- si la revocación es inmediata o tiene propagación conocida;
- si pueden coexistir credencial predecesora y sucesora;
- si existe expiración nativa;
- si el proveedor permite consultar estado, última utilización o evidencia equivalente;
- qué elemento debe conservar Vento como referencia no sensible para identificar la credencial revocada.

No se inventa una cadencia universal de rotación ni una fecha de expiración. Se conservarán únicamente las reglas y fechas acreditadas por el proveedor o por una política posterior aprobada.

---

#### 5. Definición de solo lectura inicial

El `scope_ceiling` inicial de la integración Makos será de **lectura efectiva**.

Esto implica:

1. la credencial no podrá utilizarse para crear, editar, anular, borrar o corregir ventas en Makos;
2. no podrá modificar productos, precios, impuestos, descuentos, clientes, usuarios, sedes, terminales, cajas, documentos fiscales ni configuración del POS;
3. no podrá administrar cuentas, roles, permisos, otras credenciales o configuración de integración del proveedor mediante el runtime del adaptador;
4. no podrá iniciar cobros, devoluciones, reembolsos, cierres u otras operaciones mutantes;
5. no podrá escribir en Supabase ni en dominios Vento;
6. una lectura válida solo habilitará al adaptador a recibir y validar información; no aplicará automáticamente efectos internos.

Cuando Makos permita expresar el alcance mediante scopes, roles, permisos, APIs habilitadas o restricciones equivalentes, se solicitará la variante mínima compatible con lectura.

Cuando Makos no pueda expresar físicamente el mínimo privilegio, el adaptador Vento deberá imponer una allowlist cerrada de operaciones consultivas. La amplitud física de la credencial no ampliará el contrato documental.

Cualquier futura necesidad de escribir en Makos requeriría una decisión canónica distinta. No podrá habilitarse silenciosamente reutilizando esta credencial.

---

#### 6. Matriz de requisitos de la credencial Makos

| Dimensión                   | Decisión obligatoria                                                                       | Estado actual            | Condición antes de activación                                |
| --------------------------- | ------------------------------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------ |
| Sistema externo             | Makos bajo `EXT-SYS-013`                                                                   | `CONFIRMADO`             | conservar la misma identidad de integración                  |
| Finalidad                   | consulta temporal de información necesaria para la transición del hecho de venta           | `ESPECIFICADO`           | no ampliar finalidad por conveniencia                        |
| Principal técnico           | principal no humano exclusivo del adaptador Makos                                          | `ESPECIFICADO`           | disponer de referencia técnica independiente                 |
| Credencial física           | una credencial dedicada a la integración                                                   | `NO_PROVISIONADO`        | evidencia de emisión o provisionamiento por Makos            |
| Mecanismo de autenticación  | el mecanismo real que Makos entregue; no se selecciona por inferencia                      | `PENDIENTE_DE_EVIDENCIA` | documentación o evidencia técnica del binding                |
| Procedencia                 | material emitido o provisionado mediante el mecanismo autorizado por Makos para Vento      | `PENDIENTE_DE_EVIDENCIA` | identificar emisor y autoridad de revocación                 |
| Alcance                     | lectura efectiva y mínimo privilegio                                                       | `ESPECIFICADO`           | scopes o enforcement Vento acreditan ausencia de mutación    |
| Escritura en Makos          | prohibida bajo esta credencial                                                             | `ESPECIFICADO`           | prueba o evidencia de enforcement antes del uso operativo    |
| Escritura en Vento          | prohibida como facultad de la credencial externa                                           | `ESPECIFICADO`           | todo efecto posterior usa contratos propietarios Vento       |
| Supabase                    | sin acceso directo; sin `service_role`; sin credenciales Vento entregadas al proveedor     | `ESPECIFICADO`           | ninguna excepción                                            |
| Ambientes                   | material independiente por ambiente; producción nunca actúa como fallback de no producción | `ESPECIFICADO`           | evidencia ambiental antes de habilitar cada ambiente         |
| Custodia                    | si el material es secreto, resolución exclusiva server-side desde custodia aprobada        | `ESPECIFICADO`           | referencia no sensible + secret store del ambiente           |
| Cliente / frontend          | valor secreto prohibido en navegador, aplicación cliente o variable publicable             | `ESPECIFICADO`           | ausencia demostrable del material en superficies cliente     |
| Repositorio y documentación | solo referencias y metadata no sensibles                                                   | `ESPECIFICADO`           | ningún valor funcional versionado                            |
| Logs y auditoría            | registrar referencia, actor técnico, ambiente, operación y resultado sin copiar el secreto | `ESPECIFICADO`           | trazabilidad no sensible                                     |
| Expiración                  | se conserva la del proveedor cuando exista; no se inventa                                  | `PENDIENTE_DE_EVIDENCIA` | metadato real o declaración de ausencia de expiración nativa |
| Rotación                    | sucesor independiente, migración, validación, revocación y rechazo del predecesor          | `ESPECIFICADO`           | mecanismo soportado por el emisor acreditado                 |
| Revocación                  | invalidación en la autoridad que acepta la credencial                                      | `ESPECIFICADO`           | procedimiento real y propietario identificados               |
| Retiro final                | revocación o expiración acreditadas y consumidores eliminados                              | `ESPECIFICADO`           | cierre específico bajo `INT-POS-024`                         |

---

#### 7. Información mínima que deberá obtenerse de Makos

Antes de que una fase de implementación solicite o acepte una credencial, Vento deberá obtener del desarrollador de Makos evidencia suficiente para responder:

1. qué mecanismo técnico autentica la integración;
2. qué clase de credencial o material entrega el proveedor;
3. si la credencial pertenece a una empresa, tenant, aplicación, integración o cuenta concreta;
4. si pueden emitirse credenciales independientes para una misma empresa;
5. qué scopes, roles, permisos o restricciones admite;
6. cómo se limita la credencial a lectura;
7. cómo separa el proveedor ambientes o instancias cuando corresponda;
8. cómo se emite o entrega el material sin convertir documentación del proyecto en custodia del secreto;
9. si existe expiración y cómo se conoce;
10. cómo se rota una credencial;
11. cómo se revoca;
12. cómo se demuestra que una credencial anterior dejó de ser aceptada;
13. si el proveedor permite solapamiento controlado durante una rotación;
14. qué referencia no sensible permite identificar la credencial sin exponer su valor;
15. qué evidencia de uso, estado o auditoría ofrece el proveedor para la integración.

Esta lista no supone que Makos implemente una tecnología concreta.

---

#### 8. Procedimiento documental de provisionamiento y activación

##### 8.1. Preparar la solicitud

Antes del provisionamiento se deberán haber materializado las necesidades de datos y contratos que determinan el alcance real de consulta:

- `INT-POS-005` para venta y línea;
- `INT-POS-006` para encabezados, líneas, estados y timestamps;
- `INT-POS-007` para descuentos, impuestos, propinas y medios de pago;
- `INT-POS-008` para anulaciones, devoluciones y reembolsos;
- `INT-POS-010` para empresa, sede, terminal y caja externa;
- `INT-POS-011` para producto externo, producto Vento, presentación y receta;
- `INT-POS-014` para la modalidad de recepción, webhook cuando exista y polling de conciliación.

Estas tareas definen qué información necesita Vento. No podrán ampliar la credencial hacia mutaciones en Makos.

##### 8.2. Solicitar una credencial dedicada

La solicitud al desarrollador de Makos deberá exigir expresamente:

- identidad exclusiva para la integración Vento;
- alcance de lectura mínimo;
- separación de ambientes cuando el proveedor la soporte;
- mecanismo y procedimiento de revocación;
- metadata de expiración o ausencia acreditada de expiración;
- procedimiento de rotación;
- documentación técnica necesaria para configurar el binding sin compartir secretos internos de Vento.

No se solicitará acceso administrativo general si la consulta de datos puede resolverse con una credencial de alcance menor.

##### 8.3. Recibir y clasificar

Al recibir el material se deberá:

1. confirmar sistema, tenant o cuenta a la que pertenece;
2. confirmar ambiente;
3. confirmar mecanismo real;
4. clasificar si el valor es secreto, credencial publicable restringida u otra clase prevista por `INT-EXT-007`;
5. confirmar el `minimum_scope` y el `scope_ceiling`;
6. registrar emisor o autoridad de revocación;
7. registrar expiración únicamente cuando exista evidencia;
8. crear o resolver una referencia no sensible sin copiar el valor al registro empresarial.

##### 8.4. Custodiar

Si el material debe permanecer confidencial:

- se cargará únicamente en la custodia server-side aprobada para el ambiente;
- el runtime autorizado resolverá el valor en ejecución;
- ningún proveedor recibirá credenciales internas de Vento como contraparte;
- ninguna copia funcional quedará en repositorio, documentación, tabla empresarial, log, respuesta o cliente.

##### 8.5. Verificar independencia

Antes de habilitar consumo se comprobará que:

- no depende de una cuenta personal para ejecutar cada llamada;
- no comparte valor con otra integración;
- no comparte material entre ambientes;
- puede revocarse sin revocar otra integración;
- el principal técnico queda distinguible del actor humano que administró la configuración.

##### 8.6. Verificar lectura efectiva

Antes de cualquier piloto se deberá demostrar uno de estos dos controles:

```text
RESTRICCIÓN DE SOLO LECTURA IMPUESTA POR MAKOS
```

o, cuando el proveedor no pueda expresarla físicamente:

```text
CREDENCIAL TÉCNICAMENTE MÁS AMPLIA
+
ALLOWLIST VENTO DE OPERACIONES CONSULTIVAS
+
AUSENCIA DE RUTA MUTANTE EN EL ADAPTADOR
```

En ambos casos, cualquier operación fuera del alcance deberá fallar cerrada.

La verificación operativa sin efectos internos solo podrá ejecutarse bajo el diseño aprobado en `INT-POS-021`. La habilitación posterior de efectos internos bajo `INT-POS-022` no ampliará la credencial de Makos: los efectos ocurrirán dentro de los dominios propietarios de Vento después de validar el hecho externo.

##### 8.7. Activar

La integración solo podrá considerarse habilitable cuando estén acreditados simultáneamente:

```text
CREDENCIAL REAL
+
PRINCIPAL TÉCNICO INDEPENDIENTE
+
AMBIENTE CORRECTO
+
CUSTODIA CORRECTA
+
MECANISMO REAL
+
LECTURA EFECTIVA
+
REVOCACIÓN DISPONIBLE
+
CONTRATO DE DATOS VIGENTE
+
VALIDACIÓN DEL PILOTO APLICABLE
```

La definición documental de esta tarea no ejecuta esa activación.

---

#### 9. Procedimiento de rotación y revocación

La rotación planificada deberá seguir:

```text
PREDECESOR ACTIVO
→ SUCESOR EMITIDO Y ACREDITADO
→ SUCESOR EN CUSTODIA CORRECTA
→ CONSUMIDOR MIGRADO
→ SUCESOR VERIFICADO
→ PREDECESOR REVOCADO
→ RECHAZO DEL PREDECESOR ACREDITADO
→ RETIRO DE COPIAS Y REFERENCIAS OBSOLETAS
```

La revocación deberá iniciarse cuando ocurra cualquiera de estas condiciones aplicables:

- exposición confirmada o sospecha razonable de compromiso;
- material copiado fuera de la custodia aprobada;
- acceso no autorizado;
- principal técnico, ambiente, binding o consumidor retirado;
- cambio de alcance que requiera reemisión;
- credencial sin propietario o consumidor válido;
- incidente que rompa la confianza en el material;
- instrucción del proveedor de retirar la credencial;
- retiro de Makos como fuente conforme al cutover definido por `INT-POS-024`.

Una credencial comprometida no permanecerá activa para preservar continuidad. Una credencial de otro ambiente tampoco se utilizará como sustituto temporal.

---

#### 10. Bloqueos de activación

La integración API de Makos permanecerá bloqueada para activación cuando exista cualquiera de estas condiciones:

| Bloqueo                                                                                      | Resultado obligatorio                | Propietario de resolución                                           |
| -------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| Makos no ha provisionado una credencial real                                                 | no activar API                       | puerta de evidencia de `INT-POS-021` antes del piloto sin efectos   |
| mecanismo de autenticación no acreditado                                                     | no inferir; no activar               | `INT-POS-021`, consumiendo la evidencia obtenida bajo este contrato |
| no existe identidad técnica independiente                                                    | no usar cuenta personal o compartida | `INT-POS-021`                                                       |
| no puede acreditarse lectura efectiva                                                        | no activar la integración            | `INT-POS-021`                                                       |
| una credencial productiva sería usada en desarrollo o staging                                | bloquear ese ambiente                | `INT-POS-021`                                                       |
| el secreto solo puede almacenarse en cliente, repositorio, documentación o tabla empresarial | no aceptar esa custodia              | `INT-POS-021`                                                       |
| la integración exige entregar `service_role` o acceso directo a Supabase a Makos             | rechazar esa arquitectura            | `INT-POS-021`                                                       |
| no existe procedimiento real de revocación                                                   | no activar credencial persistente    | `INT-POS-021`                                                       |
| el alcance solicitado excede las necesidades documentadas                                    | reducir alcance antes de activar     | tarea `INT-POS-005` a `INT-POS-014` que origine la necesidad        |
| PULSO asume la fuente para el alcance correspondiente                                        | iniciar reducción o revocación       | `INT-POS-024`                                                       |

`INT-POS-021` no cambia los contratos de esta tarea: utiliza estas puertas para diseñar el piloto sin efectos y exigir evidencia antes de cualquier ejecución posterior autorizada.

---

#### 11. Fronteras con las tareas posteriores

- `INT-POS-005` definirá la semántica de venta y línea; no redefine la credencial.
- `INT-POS-006`, `INT-POS-007` e `INT-POS-008` determinarán información importable; no conceden escritura en Makos.
- `INT-POS-009` gobernará conservación del payload recibido; no almacena la credencial dentro del payload.
- `INT-POS-010` e `INT-POS-011` gobernarán mappings; no convierten identificadores externos en credenciales.
- `INT-POS-012` gobernará cuarentena; una línea en cuarentena no amplía el scope de lectura.
- `INT-POS-013` gobernará idempotencia; una clave idempotente no es una credencial de Makos.
- `INT-POS-014` gobernará webhook y polling; cada dirección conservará autenticación independiente cuando corresponda.
- `INT-POS-015` a `INT-POS-020` gobernarán efectos y conciliación internos; la credencial Makos no adquiere capacidad de mutarlos.
- `INT-POS-021` diseñará el piloto sin efectos y deberá incluir las puertas de credencial aquí definidas.
- `INT-POS-022` diseñará el piloto con efectos internos habilitados sin ampliar el alcance externo de Makos.
- `INT-POS-023` gobernará la transición hacia PULSO sin reutilizar la credencial Makos como credencial de PULSO.
- `INT-POS-024` gobernará la reducción o revocación cuando PULSO asuma la fuente.

---

#### 12. Decisiones congeladas

1. La integración temporal con Makos utilizará una credencial técnica dedicada cuando la API sea provisionada.
2. Esa credencial no será una cuenta personal, una sesión humana ni una credencial compartida con otra integración.
3. El mecanismo exacto no se inventa y permanece sujeto a evidencia técnica de Makos.
4. El alcance inicial será de lectura efectiva y mínimo privilegio.
5. Una capacidad física adicional de la credencial no autoriza utilizarla.
6. Si Makos no puede imponer el límite de lectura, Vento deberá imponer una allowlist cerrada en el adaptador antes de activar.
7. Ninguna credencial Makos concede acceso a Supabase, `service_role`, NEXO, PASS, NUMERA, PULSO o SHELL.
8. Producción no compartirá material con desarrollo o staging.
9. Todo material secreto se resolverá únicamente server-side desde custodia aprobada.
10. El registro documental conservará referencias no sensibles, nunca el valor secreto.
11. Revocar significa invalidar el material en la autoridad que lo acepta; eliminar una copia local no basta.
12. La expiración se registra únicamente si existe evidencia real.
13. La rotación conserva ambiente, principal y scope; no autoriza ampliaciones.
14. La integración no se activa durante esta tarea.
15. El retiro final de la credencial Makos queda vinculado a `INT-POS-024`.

---

#### 13. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-004` instancia para Makos controles de credenciales ya materializados y protegidos por los contratos transversales `INT-EXT-002` a `INT-EXT-008` y por requisitos canónicos vigentes de integración y seguridad. No crea una nueva clase de autenticación, una nueva autoridad, una nueva capacidad ejecutable ni una excepción a los controles existentes. El mecanismo físico de Makos todavía no está provisionado y generar un requisito nuevo sobre una tecnología no acreditada duplicaría cobertura o fabricaría especificación.

#### 14. Cobertura de prueba existente preservada

Se conserva sin modificación la cobertura vigente aplicable a:

- separación del POS externo y PULSO durante la transición;
- autenticidad y procedencia de intercambios externos;
- prohibición de exposición de secretos;
- auditoría de adaptadores externos sin copiar credenciales;
- prohibición de escrituras directas y autoridad cruzada entre dominios;
- obligación de que el adaptador externo solicite los efectos a las aplicaciones propietarias.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 15. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. Makos permanece identificado como sistema externo de la transición bajo `EXT-SYS-013`.
2. La API continúa clasificada como habilitable pero no provisionada.
3. No se inventa el mecanismo de autenticación.
4. Se define una credencial exclusiva de la integración y separada de actores humanos.
5. Se prohíbe compartir la credencial con otras integraciones.
6. Se define lectura efectiva como techo inicial de alcance.
7. Se prohíben mutaciones en Makos bajo esta credencial.
8. Se prohíbe acceso directo de Makos a Supabase.
9. Se prohíbe entregar `service_role` o secretos internos de Vento.
10. Se define separación de ambientes sin asumir que Makos ya la soporta.
11. Se define custodia server-side para material confidencial.
12. Se prohíben secretos en repositorio, documentación, tablas empresariales, logs y superficies cliente.
13. Se define registro mediante referencia no sensible.
14. Se define evidencia mínima que debe obtenerse del desarrollador de Makos.
15. Se define procedimiento de solicitud, clasificación, custodia y verificación.
16. Se define revocación como invalidación en la autoridad aceptante.
17. Se define rotación completa sin validez dual indefinida.
18. Se prohíben fechas de expiración inventadas.
19. Se definen bloqueos de activación con propietario y condición de salida.
20. `INT-POS-021` recibe las puertas para el piloto sin efectos.
21. `INT-POS-024` recibe el retiro final al asumir PULSO la fuente.
22. Se generan cero cambios `TREQ-*`.
23. No se crea, solicita, rota, revoca ni almacena físicamente ninguna credencial.
24. No se modifica código, Supabase, configuración remota ni datos.
25. `INT-POS-005` permanece exclusivamente reservada.

---

#### 16. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-003 — Definir al POS vigente como fuente temporal del hecho de venta`

TAREA ACTUAL APROBADA

`INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura`

SIGUIENTE TAREA RESERVADA

`INT-POS-005 — Definir contrato canónico de venta y línea de venta`


### ✅ INT-POS-005 — Definir contrato canónico de venta y línea de venta

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura`  
**Tarea siguiente:** `INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`  
**Tipo de tarea:** documental; definición semántica y normativa del contrato canónico de venta y línea de venta que deberá ser producido por el adaptador del POS externo durante la transición y por PULSO después del corte, preservando identidad, procedencia, versionado, separación de hechos, mapeo y elegibilidad para efectos posteriores, sin definir endpoints, payloads físicos, tablas, tipos de código, idempotencia completa, mappings físicos, migraciones, Supabase ni efectos internos  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**POS externo vigente:** `Makos`  
**POS integral objetivo:** `PULSO`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir una representación canónica única de **venta** y **línea de venta** que desacople a los consumidores internos del formato particular de Makos y permanezca vigente cuando PULSO sustituya al POS externo como fuente de nuevas ventas.

La tarea materializa la decisión aprobada en `CAP-SCOPE-009`: el POS externo temporal y PULSO deberán converger en el mismo contrato canónico, sin doble emisión ni reinterpretación por consumidor.

Regla raíz:

```text
MAKOS DURANTE LA TRANSICIÓN
        ↓
ADAPTADOR + VALIDACIÓN + MAPEO
        ↓
CONTRATO CANÓNICO DE VENTA Y LÍNEA
        ↓
CONSUMIDORES INTERNOS

PULSO DESPUÉS DEL CORTE
        ↓
MISMO CONTRATO CANÓNICO DE VENTA Y LÍNEA
        ↓
MISMOS CONSUMIDORES INTERNOS
```

El contrato normaliza el hecho comercial. No convierte el transporte, el staging, el documento fiscal, el pago, el pedido, el inventario, la fidelización ni el hecho económico en sinónimos de venta.

---

#### 2. Decisión principal

Quedan definidos dos objetos semánticos inseparables pero distintos:

1. **Venta canónica:** representa el hecho comercial de una venta originada en una única fuente y conserva su identidad, procedencia, alcance de origen, estado comercial propio, temporalidad, referencias y colección de líneas.
2. **Línea de venta canónica:** representa una unidad comercial identificable dentro de una venta, con identidad estable, cantidad, referencia de producto de origen, resultado de mapeo y componentes comerciales propios.

Una venta canónica deberá contener o referenciar al menos una línea válida para ser elegible como venta individual con efectos posteriores. Un agregado diario, subtotal por producto, archivo consolidado o métrica de ventas no se eleva por sí solo a venta canónica individual.

La representación física, tipos compartidos y contratos consumibles posteriores deberán materializar esta semántica mediante `SHELL-CON-020` y `SHELL-CON-021` sin cambiarla silenciosamente.

---

#### 3. Separaciones semánticas obligatorias

El contrato preserva las siguientes desigualdades:

```text
VENTA ≠ PEDIDO
VENTA ≠ PAGO
VENTA ≠ SESIÓN DE CAJA
VENTA ≠ DOCUMENTO FISCAL
VENTA ≠ MOVIMIENTO DE INVENTARIO
VENTA ≠ MOVIMIENTO DE FIDELIZACIÓN
VENTA ≠ HECHO ECONÓMICO
VENTA ≠ ENTREGA
```

```text
LÍNEA DE VENTA ≠ PRODUCTO CANÓNICO
LÍNEA DE VENTA ≠ MOVIMIENTO DE INVENTARIO
LÍNEA DE VENTA ≠ RECETA
LÍNEA DE VENTA ≠ LÍNEA DE PEDIDO POR INFERENCIA
```

Una referencia puede relacionar estos hechos, pero ninguna relación permite fusionarlos ni asumir que compartir identificador, importe, timestamp o estado los vuelve equivalentes.

---

#### 4. Contrato semántico de venta

La venta canónica deberá poder representar como mínimo las siguientes dimensiones lógicas. Los nombres físicos finales de campos, tipos y estructuras pertenecen a la materialización técnica posterior; las semánticas aquí definidas son obligatorias.

| Dimensión lógica                | Obligación canónica                                                                              | Regla                                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Identidad canónica de venta     | requerida                                                                                        | identidad Vento estable y opaca para referenciar la misma venta a través de revisiones, reintentos y consumidores                           |
| Sistema de origen               | requerido                                                                                        | identifica inequívocamente a Makos durante su alcance temporal o a PULSO después del corte                                                  |
| Instancia o contexto de origen  | requerido cuando el sistema pueda reutilizar identificadores entre tenants, empresas o ambientes | evita colisión de identidades de fuente                                                                                                     |
| Identidad de venta en la fuente | requerida para una venta individual                                                              | se conserva sin reinterpretar ni reemplazar por un ID interno                                                                               |
| Revisión o versión de fuente    | condicional                                                                                      | se conserva cuando la fuente la entregue; su ausencia no autoriza inventar una versión del proveedor                                        |
| Versión del contrato canónico   | requerida                                                                                        | permite evolucionar el contrato sin reinterpretar historia                                                                                  |
| Alcance de origen               | requerido antes de producir efectos                                                              | referencia empresa, sede, terminal y demás contexto que corresponda después del mapeo de `INT-POS-010`                                      |
| Momento del hecho comercial     | requerido antes de producir efectos                                                              | conserva el timestamp canónico cuya fuente y semántica se resolverán en `INT-POS-006`                                                       |
| Estado comercial de la venta    | requerido                                                                                        | pertenece únicamente a la venta; el vocabulario y mapeo se materializan en `INT-POS-006`                                                    |
| Cliente                         | opcional                                                                                         | una venta a consumidor final puede existir sin crear cliente artificial; cuando exista identificación se conserva una referencia autorizada |
| Referencia a pedido             | opcional                                                                                         | vincula un pedido cuando exista, sin convertir pedido y venta en el mismo objeto                                                            |
| Referencia fiscal               | condicional                                                                                      | vincula el documento fiscal o soporte cuando exista, sin trasladar a Vento la autoridad del proveedor fiscal                                |
| Componentes monetarios          | requeridos según aplicabilidad                                                                   | la estructura deberá admitir precio, subtotal, descuentos, impuestos, propina y total conforme a `INT-POS-007` sin mezclar pagos con venta  |
| Referencias de pago             | condicionales                                                                                    | relacionan pagos confirmados o intentos cuando correspondan; los pagos permanecen hechos independientes                                     |
| Líneas de venta                 | requeridas para una venta individual elegible                                                    | cada línea se vincula exactamente a esta venta y conserva identidad propia                                                                  |
| Procedencia del payload         | requerida como referencia                                                                        | enlaza el material original conservado por `INT-POS-009` sin copiarlo dentro del contrato normalizado                                       |
| Correlación de integración      | requerida para trazabilidad                                                                      | permite seguir recepción, validación, mapeo, evento y efectos sin sustituir la identidad de venta                                           |

La ausencia de un campo que dependa de una capacidad todavía no acreditada de Makos deberá producir un estado explícito de no disponibilidad, cuarentena o bloqueo en la tarea propietaria correspondiente; no se completará con valores inventados.

---

#### 5. Contrato semántico de línea de venta

Toda línea canónica deberá poder representar como mínimo:

| Dimensión lógica                | Obligación canónica                                    | Regla                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identidad canónica de línea     | requerida                                              | estable dentro del ciclo de vida de la venta y distinta de la identidad del producto                                                                   |
| Identidad canónica de venta     | requerida                                              | toda línea pertenece a exactamente una venta canónica                                                                                                  |
| Identidad de línea en la fuente | requerida cuando la fuente la provea                   | se conserva sin reinterpretación; si la fuente no la entrega, `INT-POS-013` deberá resolver identidad estable sin inventar una capacidad del proveedor |
| Secuencia de origen             | condicional                                            | puede conservar orden o posición, pero no sustituye una identidad estable cuando el proveedor dispone de una                                           |
| Revisión o versión de línea     | condicional                                            | conserva revisión de fuente cuando exista y no reescribe historia                                                                                      |
| Producto de origen              | requerido                                              | referencia el identificador o descripción con que la fuente expresó el ítem vendido                                                                    |
| Producto Vento                  | requerido antes de efectos dependientes de producto    | se resuelve mediante `INT-POS-011`; la identidad externa nunca sustituye al producto canónico                                                          |
| Presentación                    | condicional según mapeo                                | se resuelve mediante `INT-POS-011` y conserva la presentación realmente vendida                                                                        |
| Receta                          | condicional según producto y efecto                    | puede quedar referenciada cuando corresponda; la línea no se convierte en receta                                                                       |
| Cantidad                        | requerida                                              | expresa la cantidad comercial de la línea con unidad o convención inequívoca                                                                           |
| Unidad                          | requerida cuando la cantidad no sea autosuficiente     | evita interpretar cantidades con unidades incompatibles                                                                                                |
| Snapshot comercial de precio    | requerido según aplicabilidad                          | conserva el valor aplicado a la línea; las reglas monetarias detalladas se materializan en `INT-POS-007`                                               |
| Descuento e impuesto de línea   | condicionales                                          | permanecen componentes diferenciados, materializados en `INT-POS-007`                                                                                  |
| Estado de línea                 | condicional cuando la fuente o el proceso lo requieran | su vocabulario y mapeo pertenecen a `INT-POS-006`                                                                                                      |
| Resultado de mapeo              | requerido antes de efectos dependientes de producto    | distingue línea resuelta de línea pendiente o no resoluble; `INT-POS-012` gobierna la cuarentena                                                       |
| Procedencia de payload          | requerida como referencia                              | permite reconstruir qué fragmento o evidencia externa originó la línea sin duplicar el payload original                                                |

Una línea sin mapeo de producto/presentación requerido podrá existir como evidencia externa recibida, pero **no será elegible para producir descuento de inventario, costo o fidelización** hasta resolver la condición aplicable.

---

#### 6. Identidad y estabilidad

La identidad canónica deberá cumplir estas invariantes:

1. una venta originada en Makos conserva Makos como sistema de origen aun cuando sea recibida, corregida o conciliada después del corte;
2. una venta originada en PULSO después del corte no se recrea como venta Makos;
3. la identidad canónica de una venta no se deriva de totales, nombre de producto, fecha redondeada, posición de archivo ni otro atributo empresarial mutable;
4. la identidad canónica de una línea no se deriva únicamente de su importe, producto o posición cuando exista una identidad de fuente más fuerte;
5. cambiar un mapping de producto no cambia la identidad de la línea de venta;
6. cambiar un estado, timestamp recibido tardíamente o componente monetario no crea una venta nueva;
7. un reintento o segunda recepción de la misma venta no crea otra identidad canónica;
8. una revisión posterior se vincula a la misma venta y conserva la historia de versiones;
9. la regla técnica exacta para detectar duplicados y resolver claves de fuente pertenece a `INT-POS-013`;
10. el contrato no permite que un consumidor genere una identidad alternativa para aplicar su propio efecto.

---

#### 7. Procedencia y fuente única

Toda venta canónica deberá conservar una procedencia suficiente para demostrar:

```text
QUIÉN ORIGINÓ LA VENTA
+
EN QUÉ INSTANCIA O ALCANCE
+
QUÉ IDENTIDAD TUVO EN LA FUENTE
+
QUÉ REVISIÓN O EVIDENCIA SE RECIBIÓ
+
QUÉ CONTRATO CANÓNICO RESULTÓ
```

Durante la transición:

- Makos es el sistema de origen de las ventas correspondientes a sedes, terminales y periodos todavía no cortados;
- PULSO es el sistema de origen de las nuevas ventas posteriores al corte aprobado;
- el adaptador, staging, archivo, API, webhook, polling o proceso de importación son mecanismos de transporte y procesamiento, no sistemas de origen empresarial;
- una misma venta no puede declarar simultáneamente Makos y PULSO como fuentes activas.

La frontera temporal exacta continúa gobernada por `INT-POS-003` y el procedimiento de corte por `INT-POS-023`.

---

#### 8. Versionado y correcciones

El contrato será versionable y no permitirá corrección destructiva.

Reglas:

1. la versión del contrato canónico y la versión/revisión del dato de origen son conceptos distintos;
2. una revisión del proveedor no cambia retroactivamente el payload original ya conservado;
3. una revisión válida de la venta conserva la misma identidad canónica y crea una nueva representación o estado auditable según el diseño físico posterior;
4. una corrección no borra la versión anterior;
5. una anulación, devolución o reembolso no se representa sobrescribiendo la venta original como si nunca hubiera existido;
6. cantidades o importes negativos no se utilizarán como sustituto silencioso de la semántica de devolución o compensación cuando el hecho pueda clasificarse explícitamente;
7. `INT-POS-008` definirá cómo se importan anulaciones, devoluciones y reembolsos;
8. `INT-POS-019` definirá sus compensaciones internas sin borrar historia.

---

#### 9. Regla de granularidad y tratamiento del Excel actual

La integración actual demostrada mediante `makos_excel` trabaja con lotes y filas agregadas por producto y no demuestra por sí sola identidad individual completa de venta y línea.

Por tanto:

```text
FILA AGREGADA DE EXCEL MAKOS
≠
VENTA CANÓNICA INDIVIDUAL
```

```text
HASH DEL ARCHIVO
≠
IDENTIDAD DE VENTA
```

```text
POSICIÓN DE FILA
≠
IDENTIDAD DE LÍNEA POR DEFECTO
```

El flujo Excel puede mantenerse como evidencia, contingencia o fuente auxiliar bajo las tareas que correspondan, pero no podrá producir una venta canónica individual ficticia ni efectos automáticos basados en una granularidad que la fuente no demuestre.

Si una futura exportación o API aporta identidad y granularidad suficientes, el adaptador deberá mapearlas al mismo contrato definido aquí.

---

#### 10. Integridad estructural

Una instancia de venta canónica será estructuralmente válida únicamente cuando:

1. tenga identidad canónica resuelta;
2. tenga sistema de origen inequívoco;
3. tenga identidad de venta en la fuente o una regla de identidad formalmente materializada por `INT-POS-013`;
4. tenga versión de contrato;
5. tenga el contexto mínimo requerido para resolver su alcance de origen;
6. tenga un momento comercial canónico resoluble;
7. tenga estado comercial resoluble;
8. contenga o referencie líneas con identidad canónica propia;
9. cada línea pertenezca a una sola venta;
10. las cantidades y unidades requeridas sean interpretables;
11. la procedencia del payload sea recuperable por referencia;
12. no mezcle como estado de venta los estados de pago, fiscalidad, inventario, fidelización o economía.

La validez estructural no implica todavía elegibilidad para efectos internos.

---

#### 11. Elegibilidad para efectos posteriores

Una venta canónica solo podrá avanzar hacia `INT-POS-015` y los efectos posteriores cuando, además de ser estructuralmente válida:

- la fuente corresponda al alcance temporal autorizado;
- la recepción haya pasado las validaciones aplicables;
- la identidad e idempotencia hayan sido resueltas;
- empresa, sede, terminal y caja requeridas estén mapeadas;
- cada línea que produzca un efecto dependiente de producto tenga el mapping exigido;
- estados y timestamps necesarios estén normalizados;
- los componentes comerciales necesarios para el efecto estén disponibles;
- no exista una cuarentena o inconsistencia que bloquee el efecto;
- la venta no sea una segunda emisión de una venta ya reconocida;
- la versión recibida no intente retroceder silenciosamente una versión posterior.

Que una venta sea canónica no autoriza por sí solo un movimiento de inventario, un asiento, un movimiento de puntos, un reembolso ni un documento fiscal.

---

#### 12. Separación de estados

El contrato deberá transportar referencias o estados suficientes para mantener ortogonales, cuando apliquen:

- estado comercial de venta;
- estado de pago;
- estado fiscal;
- estado de inventario;
- estado de fidelización;
- estado económico.

`INT-POS-005` solo define la obligación de separación. Los vocabularios, mappings y reglas de importación de estados y timestamps pertenecen a `INT-POS-006`, `INT-POS-007`, `INT-POS-008` y a las tareas propietarias de cada efecto.

Un cambio en uno de estos ejes no podrá cambiar implícitamente los demás.

---

#### 13. Reconciliación monetaria sin corrección silenciosa

El contrato deberá admitir los componentes necesarios para que `INT-POS-007` y `INT-POS-020` puedan demostrar la relación entre encabezado, líneas, descuentos, impuestos, propinas y total.

Reglas:

1. los valores de origen se conservan con su procedencia;
2. una normalización no podrá alterar importes para forzar una igualdad;
3. una diferencia entre total de encabezado y componentes de línea se conserva como diferencia a investigar;
4. pago y total de venta no se asumen equivalentes;
5. el documento fiscal no se usa como copia maestra para sobrescribir la venta;
6. la fórmula y precisión física aplicables se definirán con los contratos monetarios y de importación correspondientes, sin inventar una precisión del proveedor en esta tarea.

---

#### 14. Relación con cliente y venta a consumidor final

Se conserva `DEC-POS-001`: una venta a consumidor final puede existir sin registrar cliente.

Por tanto:

- la identidad de cliente no es requisito universal para crear una venta canónica;
- no se creará un cliente ficticio para satisfacer el contrato;
- cuando exista cliente identificado, la venta conservará una referencia autorizada y no una copia innecesaria de datos personales;
- PASS no adquiere propiedad de la venta por existir una relación de cliente o fidelización;
- ausencia de cliente no elimina requisitos de trazabilidad comercial, fiscal o económica aplicables.

---

#### 15. Fronteras con mapeo de productos

La línea conserva separadas:

```text
IDENTIDAD DEL ÍTEM EN LA FUENTE
≠
PRODUCTO VENTO
≠
PRESENTACIÓN VENTO
≠
RECETA
```

`INT-POS-011` resolverá los mappings aplicables y `INT-POS-012` gobernará las líneas no resueltas.

Cambiar el mapping no reescribe la identidad ni el payload histórico de la línea. La nueva decisión de mapping deberá ser auditable y aplicarse conforme a las reglas de reproceso que posteriormente se definan.

---

#### 16. Frontera con pagos y documento fiscal

El contrato de venta puede referenciar pagos y documento fiscal, pero no los absorbe.

- `INT-POS-007` definirá importación de medios de pago y componentes monetarios;
- el documento fiscal continúa bajo responsabilidad del POS o proveedor fiscal autorizado;
- una factura emitida no demuestra por sí sola que el pago esté conciliado;
- un pago aprobado no demuestra por sí solo que la venta esté fiscalmente emitida;
- una venta válida no autoriza recrear una factura desde Vento cuando esa autoridad permanezca en el proveedor externo.

---

#### 17. Fronteras con efectos internos

El contrato canónico es la entrada empresarial normalizada de los efectos posteriores, no el ejecutor de esos efectos.

| Consumidor o efecto            | Autoridad preservada                 | Condición                                                                       |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------- |
| NEXO                           | movimiento físico e inventario       | `INT-POS-016` aplica exactamente una vez sobre líneas elegibles                 |
| NUMERA                         | hecho económico y conciliación       | `INT-POS-017` consume el hecho de venta sin reinterpretar su origen             |
| PASS                           | fidelización                         | `INT-POS-018` aplica únicamente cuando corresponda y sin apropiarse de la venta |
| PULSO                          | operación comercial interna objetivo | produce el mismo contrato después del corte, sin duplicar ventas Makos          |
| Proveedor fiscal / POS vigente | documento fiscal                     | conserva autoridad externa mientras corresponda                                 |

Ningún consumidor podrá modificar el contrato recibido para convertir su efecto local en una nueva versión de la venta fuente.

---

#### 18. Handoffs obligatorios

| Tarea                         | Resultado que recibe de `INT-POS-005`                        | Límite                                                                     |
| ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `INT-POS-006`                 | slots semánticos de encabezado, línea, estado y temporalidad | define mappings y vocabularios sin cambiar identidad ni propiedad          |
| `INT-POS-007`                 | slots monetarios y referencias de pago                       | define descuentos, impuestos, propinas y pagos sin fusionarlos con venta   |
| `INT-POS-008`                 | identidad estable de venta/línea e historia versionada       | define reversos externos sin borrar el hecho original                      |
| `INT-POS-009`                 | referencia obligatoria de procedencia                        | conserva payload, versión, hash y recepción fuera del contrato normalizado |
| `INT-POS-010`                 | alcance de origen requerido                                  | materializa mappings de empresa, sede, terminal y caja                     |
| `INT-POS-011`                 | producto de origen y referencias canónicas separadas         | materializa mapping de producto, presentación y receta                     |
| `INT-POS-012`                 | línea canónica que puede permanecer sin mapping              | define cuarentena y bloqueo de efectos                                     |
| `INT-POS-013`                 | identidades y estabilidad exigidas                           | define idempotencia por sistema, venta y línea de fuente                   |
| `INT-POS-014`                 | contrato agnóstico al transporte                             | define webhook/polling sin alterar la semántica de venta                   |
| `INT-POS-015`                 | venta canónica elegible                                      | define el evento interno de venta validada                                 |
| `INT-POS-016` a `INT-POS-018` | venta/líneas validadas y referencias estables                | cada propietaria aplica únicamente su efecto                               |
| `INT-POS-019`                 | historia y referencias al hecho original                     | define compensación sin borrar historia                                    |
| `INT-POS-020`                 | componentes y procedencia reconciliables                     | define conciliación diaria y diferencias                                   |
| `INT-POS-023`                 | contrato independiente de Makos                              | cambia la fuente hacia PULSO sin cambiar consumidores                      |
| `SHELL-CON-020`               | semántica completa de venta                                  | materializa el contrato técnico compartido de venta                        |
| `SHELL-CON-021`               | semántica completa de línea                                  | materializa el contrato técnico compartido de línea                        |

Ningún handoff autoriza adelantar la tarea receptora.

---

#### 19. Decisiones congeladas

1. Makos y PULSO deberán producir el mismo contrato canónico de venta y línea durante sus respectivos periodos de autoridad.
2. Una venta tiene una sola fuente empresarial de origen.
3. Venta, pedido, pago, caja, documento fiscal, inventario, fidelización y hecho económico permanecen separados.
4. Una línea pertenece exactamente a una venta canónica.
5. La identidad de venta y línea es estable y no depende de valores empresariales mutables.
6. La identidad de fuente se conserva junto a la identidad canónica; una no sustituye a la otra.
7. Una revisión no crea otra venta ni borra versiones anteriores.
8. El contrato conserva procedencia mediante referencia al payload original.
9. El Excel agregado actual no se considera contrato individual completo de venta y línea.
10. Una línea sin mapping requerido puede conservarse como evidencia, pero no produce efectos dependientes de producto.
11. Cliente identificado es opcional cuando la operación lo permita.
12. Componentes monetarios y pagos se relacionan con la venta sin fusionarse con ella.
13. Una diferencia monetaria no se corrige silenciosamente.
14. Los estados de venta, pago, fiscalidad, inventario, fidelización y economía son ortogonales.
15. La validez estructural del contrato no equivale a autorización para efectos internos.
16. El contrato es independiente de Excel, API, webhook, polling o cualquier otro transporte autorizado.
17. La materialización física compartida corresponde posteriormente a `SHELL-CON-020` y `SHELL-CON-021`.
18. Esta tarea no modifica código, Supabase, datos, endpoints, credenciales, payloads físicos ni consumidores.
19. `INT-POS-006` permanece exclusivamente reservada.

---

#### 20. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: `INT-POS-005` materializa para la transición Makos → PULSO el comportamiento ya protegido de forma explícita por la cobertura canónica vigente: convergencia en contratos canónicos de pedido, venta y línea sin doble emisión; fuente única durante el corte; adaptación, staging, mapeo, cuarentena e idempotencia; efectos exactamente una vez en dominios propietarios; separación de venta, pago, documento fiscal e inventario; y preservación de historia frente a anulaciones o correcciones. La tarea no añade una capacidad ejecutable ni una excepción nueva fuera de esas reglas protegidas y, por tanto, no modifica el registro 04A.

#### 21. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-INTEGRATION-014`, cobertura primaria de contratos canónicos de pedido, venta y línea entre POS externo y PULSO, doble emisión, corte, mapeo, cuarentena, idempotencia y efectos posteriores;
- `TREQ-PULSO-005`, cobertura de separación del ciclo comercial, identidad estable, líneas, snapshots y estados independientes;
- `TREQ-PULSO-006`, cobertura de venta, pago, caja, documento fiscal, descuento, propina, anulación, devolución, reembolso y conciliación como hechos separados y auditables;
- `TREQ-INTEGRATION-006`, cobertura de fuente empresarial única y propagación mediante contratos aprobados;
- `TREQ-INTEGRATION-011`, cobertura de efectos de inventario correlacionados y exactamente una vez.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 22. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. define una venta canónica y una línea de venta canónica como objetos semánticos distintos;
2. conserva el mismo contrato para Makos durante la transición y PULSO después del corte;
3. separa venta de pedido, pago, caja, documento fiscal, inventario, fidelización, economía y entrega;
4. exige identidad canónica estable para venta y línea;
5. conserva identidad y procedencia de la fuente sin sustituirlas por IDs internos;
6. admite revisión/versionado sin corrección destructiva;
7. define que una línea pertenece exactamente a una venta;
8. conserva producto de origen separado de producto, presentación y receta Vento;
9. impide efectos dependientes de producto cuando el mapping requerido no está resuelto;
10. conserva cliente como referencia opcional cuando la operación permite consumidor final no identificado;
11. define slots semánticos suficientes para estados, timestamps, componentes monetarios, pagos y fiscalidad sin adelantar sus mappings físicos;
12. preserva payload original mediante referencia y no lo duplica como contrato normalizado;
13. prohíbe elevar agregados diarios o filas consolidadas a ventas individuales ficticias;
14. establece que el hash de archivo no sustituye identidad de venta ni línea;
15. establece validez estructural diferenciada de elegibilidad para efectos;
16. exige fuente autorizada, mappings e idempotencia antes de efectos posteriores;
17. prohíbe corrección monetaria silenciosa;
18. mantiene estados de venta, pago, fiscalidad, inventario, fidelización y economía separados;
19. conserva a NEXO, NUMERA, PASS y proveedor fiscal como propietarios de sus propios efectos;
20. deja handoffs exactos a `INT-POS-006` a `INT-POS-020`, `INT-POS-023`, `SHELL-CON-020` y `SHELL-CON-021` sin iniciarlos;
21. genera cero cambios `TREQ-*` por existir cobertura canónica exacta;
22. no crea ni modifica una copia del registro 04A;
23. no modifica código, Supabase, migraciones, credenciales, endpoints, webhooks, datos ni configuración remota;
24. no declara operacional una integración Makos ni PULSO por aprobar este contrato;
25. mantiene reservada exclusivamente `INT-POS-006` como continuidad inmediata.

---

#### 23. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-004 — Definir requisitos y procedimiento de una credencial independiente, revocable e inicialmente de solo lectura`

TAREA ACTUAL APROBADA

`INT-POS-005 — Definir contrato canónico de venta y línea de venta`

SIGUIENTE TAREA RESERVADA

`INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`


### ✅ INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-005 — Definir contrato canónico de venta y línea de venta`  
**Tarea siguiente:** `INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`  
**Tipo de tarea:** documental; definición normativa de la importación semántica de encabezados y líneas de venta, del vocabulario canónico mínimo de estado comercial y estado de línea, y de la clasificación, normalización y precedencia de timestamps necesarios para producir el contrato canónico definido en `INT-POS-005`, sin inventar campos de Makos, definir endpoints, incorporar componentes monetarios detallados, modelar anulaciones o reembolsos, conservar físicamente payloads, resolver mappings de sede o producto, implementar idempotencia, modificar código, crear migraciones, modificar Supabase ni producir efectos internos  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente:** `Makos`  
**POS integral objetivo:** `PULSO`  
**Línea base documental:** `vento-shell@c0ed9cac938ce54bdb87f59d29899f64a41fd4f3`  
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo deberá transformarse una representación de venta proveniente del POS externo, y posteriormente una venta originada en PULSO cuando corresponda, en los slots semánticos de encabezado, líneas, estados y tiempo exigidos por el contrato canónico aprobado en `INT-POS-005`.

La tarea fija la semántica que deberá cumplir la importación sin afirmar que Makos ya exponga esos campos mediante su API y sin elevar la importación agregada actual por Excel a una granularidad transaccional que no demuestra.

Regla raíz:

```text
AFIRMACIÓN REAL DE LA FUENTE
        ↓
VALOR ORIGINAL + SEMÁNTICA ACREDITADA
        ↓
NORMALIZACIÓN DE ENCABEZADO / LÍNEA / ESTADO / TIEMPO
        ↓
CONTRATO CANÓNICO DE VENTA Y LÍNEA
        ↓
ELEGIBILIDAD POSTERIOR SEGÚN LAS DEMÁS TAREAS INT-POS
```

Queda prohibido completar un campo obligatorio mediante inferencia débil cuando la fuente no entregue información suficiente.

---

#### 2. Base canónica preservada

`INT-POS-006` consume sin reabrir las siguientes decisiones aprobadas:

1. Makos es la fuente temporal de las ventas originadas dentro de su alcance mientras no ocurra el corte correspondiente.
2. PULSO será la fuente de las nuevas ventas posteriores al corte aprobado.
3. Makos y PULSO deberán converger en el mismo contrato canónico de venta y línea.
4. Una venta tiene una sola fuente empresarial de origen.
5. Venta, pedido, pago, caja, documento fiscal, inventario, fidelización y hecho económico permanecen separados.
6. Una línea pertenece exactamente a una venta canónica.
7. Las identidades de venta y línea deben ser estables y no dependen de importes, fechas redondeadas, nombres de producto, hash de archivo o posición física de fila.
8. Una revisión posterior no crea otra venta ni borra historia.
9. El Excel agregado actual de Makos no constituye por sí solo una venta individual completa.
10. Una línea sin mapping requerido puede conservarse como evidencia recibida, pero no producir efectos dependientes de producto.
11. La validez estructural del contrato no autoriza efectos en NEXO, NUMERA o PASS.
12. La materialización técnica compartida del contrato permanece reservada para `SHELL-CON-020` y `SHELL-CON-021`.

Esta tarea define únicamente cómo poblar los slots semánticos que `INT-POS-005` reservó para encabezado, línea, estado y temporalidad.

---

#### 3. Capas obligatorias de la importación

La integración deberá distinguir tres capas conceptuales y no fusionarlas:

| Capa                                      | Contenido                                                                                        | Autoridad         | Regla                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------- | ---------------------------------------------------------------------------------------- |
| Representación de fuente                  | campos y valores tal como fueron entregados por Makos o por la fuente autorizada                 | sistema de origen | no se corrige ni renombra retrospectivamente para hacer coincidir el contrato Vento      |
| Representación normalizada de importación | identidades, estados, timestamps y demás slots interpretados con una regla de mapping acreditada | adaptador Vento   | conserva referencia a la afirmación original y registra si la semántica pudo resolverse  |
| Contrato canónico de venta y línea        | estructura empresarial definida en `INT-POS-005`                                                 | Vento             | desacopla consumidores del formato particular de la fuente sin alterar el hecho original |

Por tanto:

```text
VALOR EXTERNO
≠
VALOR CANÓNICO POR SIMPLE SEMEJANZA DE NOMBRE
```

```text
CAMPO AUSENTE
≠
VALOR POR DEFECTO INVENTADO
```

```text
TIMESTAMP TÉCNICO DE RECEPCIÓN
≠
MOMENTO COMERCIAL DE LA VENTA
```

---

#### 4. Definición de encabezado de venta importable

Para una venta individual, la importación deberá poder resolver las siguientes dimensiones lógicas del encabezado.

| Dimensión                                          | Obligatoriedad para venta individual                                                                           | Regla de importación                                                                                                                   | Propietario de detalle posterior         |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Sistema de origen                                  | requerida                                                                                                      | conserva `Makos` durante su alcance temporal o `PULSO` después del corte; nunca se deriva del transporte                               | `INT-POS-003`; `INT-POS-023`             |
| Instancia o contexto de origen                     | requerida cuando la fuente pueda reutilizar identificadores entre empresas, tenants o ambientes                | se conserva el contexto real; no se inventa un tenant                                                                                  | binding del proveedor y `INT-POS-010`    |
| Identidad externa de venta                         | requerida para una venta individual, salvo resolución formal posterior cuando la fuente realmente no la provea | debe proceder de la fuente o del mecanismo estable definido por `INT-POS-013`; no se sustituye por hash, fecha, total o número de fila | `INT-POS-013`                            |
| Revisión o versión de fuente                       | condicional                                                                                                    | se importa cuando la fuente la entregue; ausencia explícita no autoriza inventar versión del proveedor                                 | `INT-POS-013`                            |
| Estado de venta en la fuente                       | requerido cuando la fuente lo entregue                                                                         | se conserva el valor original y se intenta mapear al vocabulario canónico de esta tarea                                                | esta tarea                               |
| Estado comercial canónico                          | requerido antes de que una venta pueda considerarse elegible para efectos                                      | solo se materializa con equivalencia semántica acreditada                                                                              | esta tarea                               |
| Resultado del mapping de estado                    | requerido                                                                                                      | distingue mapping resuelto, ausencia real de estado y semántica no resoluble                                                           | esta tarea                               |
| Momento comercial de la venta                      | requerido antes de efectos                                                                                     | debe representar el instante del hecho según semántica acreditada; no se sustituye por hora de recepción o persistencia                | esta tarea                               |
| Fecha comercial o de negocio                       | condicional                                                                                                    | puede conservarse cuando la fuente la defina; no reemplaza el instante del hecho                                                       | esta tarea                               |
| Timestamp de creación en la fuente                 | condicional                                                                                                    | solo se importa como creación del registro si esa semántica está documentada                                                           | esta tarea                               |
| Timestamp de última modificación en la fuente      | condicional                                                                                                    | describe modificación de la representación de fuente y no cambia por sí solo el momento comercial                                      | esta tarea                               |
| Timestamp de cierre en la fuente                   | condicional                                                                                                    | solo significa cierre cuando el proveedor lo defina así; no implica pago, factura, inventario ni conciliación                          | esta tarea                               |
| Zona horaria, offset o contexto temporal de fuente | requerido cuando sea necesario para convertir un tiempo local en un instante inequívoco                        | se conserva la evidencia temporal usada para normalizar                                                                                | esta tarea                               |
| Empresa, sede, terminal y caja de origen           | requeridas según disponibilidad y necesidad del contrato                                                       | se importan como referencias de origen sin convertirlas todavía en identidades internas                                                | `INT-POS-010`                            |
| Cliente                                            | opcional                                                                                                       | no se crea cliente artificial cuando la venta sea a consumidor final no identificado                                                   | contrato aprobado en `INT-POS-005`       |
| Referencia a pedido                                | opcional                                                                                                       | se conserva cuando exista equivalencia demostrable; venta y pedido siguen siendo hechos distintos                                      | contratos comerciales posteriores        |
| Referencia fiscal                                  | condicional                                                                                                    | puede conservar referencia, nunca autoridad fiscal interna por inferencia                                                              | `INT-POS-007` y frontera fiscal aprobada |
| Colección o referencias de líneas                  | requerida para una venta individual elegible                                                                   | cada línea pertenece a una sola venta                                                                                                  | esta tarea e `INT-POS-005`               |
| Referencia de procedencia                          | requerida                                                                                                      | enlaza la representación original sin duplicarla dentro del contrato normalizado                                                       | `INT-POS-009`                            |

Una entrada que no permita resolver identidad individual, estado comercial necesario o momento comercial requerido no podrá presentarse como venta individual plenamente normalizada.

---

#### 5. Definición de línea de venta importable

Cada línea individual deberá conservar los siguientes slots cuando correspondan:

| Dimensión                                     | Obligatoriedad                                      | Regla de importación                                                                                                    | Propietario de detalle posterior             |
| --------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Venta padre                                   | requerida                                           | la línea se relaciona con exactamente una venta canónica                                                                | `INT-POS-005`                                |
| Identidad externa de línea                    | requerida cuando la fuente la entregue              | se conserva sin reinterpretación; si la fuente no ofrece una identidad estable, la resolución pertenece a `INT-POS-013` | `INT-POS-013`                                |
| Secuencia o posición externa                  | condicional                                         | puede conservar orden de origen, pero no sustituye por sí sola una identidad estable                                    | `INT-POS-013`                                |
| Revisión de línea                             | condicional                                         | se conserva cuando la fuente la entregue; no se inventa                                                                 | `INT-POS-013`                                |
| Producto o ítem de origen                     | requerida                                           | conserva identificador, descripción u otra referencia real del ítem externo                                             | `INT-POS-011`                                |
| Cantidad                                      | requerida                                           | conserva la cantidad comercial informada por la fuente sin cambiar signo o magnitud para forzar otra semántica          | `INT-POS-007` y `INT-POS-008` cuando aplique |
| Unidad                                        | requerida cuando la cantidad no sea autosuficiente  | debe permitir interpretar la cantidad de forma inequívoca                                                               | `INT-POS-011`                                |
| Estado de línea en la fuente                  | condicional                                         | se conserva cuando exista                                                                                               | esta tarea                                   |
| Estado canónico de línea                      | condicional                                         | solo se materializa cuando exista equivalencia semántica acreditada                                                     | esta tarea                                   |
| Resultado del mapping de estado de línea      | requerido cuando se intente mapear estado           | distingue equivalencia, ausencia y semántica no resoluble                                                               | esta tarea                                   |
| Momento propio de línea                       | condicional                                         | solo se usa si la fuente distingue un hecho temporal de línea con semántica verificable                                 | esta tarea                                   |
| Timestamp de creación o modificación de línea | condicional                                         | no sustituye el momento comercial de la venta ni el de la línea                                                         | esta tarea                                   |
| Resultado de mapping de producto              | requerido antes de efectos dependientes de producto | no convierte el ítem externo en producto Vento por coincidencia débil                                                   | `INT-POS-011`; `INT-POS-012`                 |
| Referencia de procedencia                     | requerida                                           | enlaza el fragmento o evidencia que originó la línea                                                                    | `INT-POS-009`                                |

La posición física de una fila de archivo podrá preservarse como evidencia de origen, pero no será identidad empresarial de línea por defecto.

---

#### 6. Vocabulario canónico mínimo de estado comercial de venta

El estado comercial importado de una venta utilizará únicamente el siguiente vocabulario mínimo en esta frontera:

| Estado canónico | Significado exacto                                                                                                               | No implica                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `OPEN`          | la fuente acredita que la venta existe y permanece abierta, editable o todavía no finalizada dentro de su propio ciclo comercial | pago pendiente o aprobado, preparación, entrega, documento fiscal, inventario, fidelización o hecho económico                        |
| `FINALIZED`     | la fuente acredita que el hecho de venta fue finalizado o cerrado comercialmente dentro de su contrato                           | pago conciliado, documento fiscal emitido, inventario aplicado, puntos aplicados, entrega completada, caja cerrada o contabilización |
| `CANCELLED`     | la fuente acredita que la venta fue cancelada como hecho comercial                                                               | que exista ya una anulación fiscal, devolución, reembolso, compensación de inventario o compensación económica                       |

Este vocabulario representa únicamente el eje **comercial de la venta**.

No se utilizarán como estado comercial de venta:

- estado de pedido;
- estado de preparación;
- estado de cumplimiento o entrega;
- estado de pago;
- estado fiscal;
- estado de inventario;
- estado de fidelización;
- estado económico;
- estado del lote de importación;
- estado técnico de una fila importada;
- resultado del mapping de producto.

`CANCELLED` no define todavía la naturaleza de una anulación, devolución o reembolso ni autoriza una compensación. Esos hechos permanecen reservados para `INT-POS-008` y `INT-POS-019`.

---

#### 7. Vocabulario canónico mínimo de estado de línea

Cuando la fuente tenga un lifecycle verificable de línea, el mapping podrá utilizar:

| Estado canónico de línea | Significado                                                                              | Límite                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `ACTIVE`                 | la fuente acredita que la línea forma parte vigente de la venta en la revisión observada | no prueba preparación, entrega, inventario ni pago                 |
| `CANCELLED`              | la fuente acredita que la línea fue cancelada dentro de la venta                         | no ejecuta devolución, reembolso, anulación fiscal ni compensación |

Si la fuente no expone estado de línea, el contrato no fabricará `ACTIVE` por ausencia de información.

Una cantidad igual a cero, una cantidad negativa, una devolución, una diferencia monetaria, la ausencia de una línea en otra exportación o un `row_status` técnico no podrán utilizarse por sí solos para inferir `CANCELLED`.

---

#### 8. Resultado del mapping de estados

Toda interpretación de estado deberá quedar clasificada mediante uno de estos resultados:

| Resultado      | Significado                                                                                                       | Tratamiento                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `MAPPED`       | existe evidencia suficiente para afirmar equivalencia entre el valor o garantía de la fuente y el estado canónico | puede poblar el estado canónico correspondiente                                                               |
| `NOT_PROVIDED` | la fuente acreditada no entrega ese estado o no lo entrega para ese objeto                                        | se conserva la ausencia; si el estado es obligatorio para elegibilidad, el flujo queda bloqueado para efectos |
| `UNRESOLVED`   | existe un valor o señal, pero su semántica no permite una equivalencia segura                                     | conservar valor original y bloquear cualquier decisión que dependa de ese estado                              |

La ausencia de un estado no se convierte automáticamente en `OPEN`, `FINALIZED`, `ACTIVE` o `CANCELLED`.

---

#### 9. Reglas obligatorias de mapping de estados

1. El valor original de la fuente deberá conservarse por referencia junto con la regla o versión de mapping aplicada.
2. Un mapping solo será válido cuando exista equivalencia semántica demostrable; igualdad de etiqueta o semejanza lingüística no basta.
3. Si el proveedor documenta que un recurso o endpoint devuelve exclusivamente ventas finalizadas, esa garantía contractual podrá servir como evidencia de `FINALIZED` aunque no exista un campo de estado separado.
4. Una garantía implícita observada en la interfaz no bastará para mapear estado.
5. Un estado de pago no se convertirá en estado de venta.
6. Un estado fiscal no se convertirá en estado de venta.
7. Un estado de pedido, preparación o entrega no se convertirá en estado de venta.
8. Un estado técnico del adaptador o del lote de importación no se convertirá en estado de venta o línea.
9. Un cambio de mapping deberá versionarse; las interpretaciones históricas no se reescribirán silenciosamente.
10. Un valor externo nuevo o desconocido quedará `UNRESOLVED` hasta disponer de una equivalencia aprobada.
11. Una versión tardía no podrá degradar silenciosamente una revisión de venta ya reconocida como posterior.
12. La relación exacta entre cancelación, anulación, devolución y reembolso se resolverá en `INT-POS-008`; esta tarea no los fusiona.

---

#### 10. Taxonomía temporal obligatoria

La importación distinguirá como conceptos separados:

| Concepto temporal                     | Semántica                                                                        | Obligatoriedad                                                                   | Regla                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `sale_occurred_at`                    | instante del hecho comercial de venta según la semántica acreditada de la fuente | requerido antes de efectos para una venta individual                             | no se sustituye por recepción, importación, persistencia o fecha agregada |
| `business_date`                       | fecha comercial, jornada o agrupación de negocio definida por la fuente          | condicional                                                                      | puede diferir del día UTC del instante y no sustituye `sale_occurred_at`  |
| `source_created_at`                   | instante en que la fuente creó su registro                                       | condicional                                                                      | no se asume igual al hecho comercial salvo contrato explícito             |
| `source_updated_at`                   | instante de última modificación reportada por la fuente                          | condicional                                                                      | no reescribe el momento original del hecho                                |
| `source_closed_at`                    | instante en que la fuente declara cierre comercial de la venta                   | condicional                                                                      | no implica cierre de pago, caja, fiscalidad o conciliación                |
| `line_occurred_at`                    | instante propio de un hecho de línea cuando la fuente lo distingue               | condicional                                                                      | no se inventa a partir del encabezado                                     |
| `line_created_at` / `line_updated_at` | creación o modificación de la representación de línea en la fuente               | condicional                                                                      | permanecen separadas del momento comercial                                |
| `received_at`                         | instante en que Vento recibe la representación externa                           | requerido por la capa de procedencia, pero físicamente definido en `INT-POS-009` | no sustituye ningún timestamp de negocio                                  |
| `imported_at`                         | instante técnico en que una importación local fue persistida                     | técnico                                                                          | no se eleva a timestamp de venta                                          |

El contrato técnico futuro podrá utilizar otros nombres físicos, pero deberá preservar estas separaciones semánticas.

---

#### 11. Normalización de timestamps

La normalización temporal deberá cumplir simultáneamente:

1. conservar el valor original o su referencia de procedencia;
2. identificar el significado del campo antes de convertirlo;
3. conservar offset o zona horaria cuando la fuente los entregue;
4. cuando la fuente entregue hora local sin offset, utilizar únicamente una zona horaria acreditada para ese binding;
5. cuando una hora local sea ambigua y no exista evidencia suficiente para resolver el instante, clasificarla como no resoluble en vez de escoger una interpretación;
6. representar el instante normalizado de forma inequívoca para los consumidores, sin perder la evidencia temporal de fuente;
7. conservar la precisión realmente entregada por la fuente;
8. no fabricar segundos, milisegundos, offset o zona horaria no recibidos ni acreditados;
9. no convertir una fecha sin hora en medianoche para simular un instante transaccional;
10. no usar el timezone de visualización de una interfaz como prueba de la zona temporal del proveedor;
11. una recepción tardía conservará el `sale_occurred_at` original;
12. una actualización posterior conservará el momento original del hecho y su timestamp de actualización como dimensiones distintas;
13. el orden entre revisiones se apoyará en la revisión o causalidad acreditada cuando exista; un timestamp por sí solo no autoriza sobrescribir una revisión posterior;
14. un backfill o replay conservará el momento histórico del hecho y no convertirá el tiempo del reproceso en momento comercial.

---

#### 12. Precedencia temporal para el contrato de venta

Cuando existan varios tiempos en la fuente, la selección de `sale_occurred_at` seguirá esta regla:

1. se utiliza el campo que la documentación o evidencia técnica del binding defina explícitamente como instante de la venta o hecho comercial equivalente;
2. si no existe un campo con esa semántica, se podrá utilizar otro campo únicamente cuando exista equivalencia contractual demostrable para ese recurso;
3. `source_created_at`, `source_updated_at` y `source_closed_at` no sustituyen automáticamente al instante comercial;
4. `business_date` no sustituye un instante;
5. `received_at`, `imported_at`, `created_at` de persistencia interna y timestamps de procesamiento jamás se utilizarán como fallback silencioso;
6. si no puede resolverse un instante comercial inequívoco, la venta podrá conservarse como evidencia recibida pero no será elegible para los efectos que exijan temporalidad transaccional.

---

#### 13. Tratamiento del flujo `makos_excel` existente

La implementación física vigente conserva utilidad para análisis agregado y contingencia, pero no cumple la granularidad individual definida por `INT-POS-005` y esta tarea.

La evidencia actual se clasifica así:

| Elemento actual                                                           | Evidencia disponible                           | Clasificación para `INT-POS-006`  | Consecuencia                                                |
| ------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| `sales_date` del lote                                                     | fecha seleccionada para la importación diaria  | `DISPONIBLE_COMO_FECHA_AGREGADA`  | puede conservar contexto diario; no es `sale_occurred_at`   |
| `imported_at` del lote                                                    | timestamp generado al persistir la importación | `TIEMPO_TECNICO_LOCAL`            | no es momento de venta                                      |
| `created_at` / `updated_at` de lote o fila                                | timestamps de persistencia local               | `TIEMPO_TECNICO_LOCAL`            | no son timestamps de Makos                                  |
| `status` del lote con valores `draft`, `validated`, `posted`, `cancelled` | estado del workflow local de importación       | `NO_APLICA_COMO_ESTADO_DE_VENTA`  | no se mapea a `OPEN`, `FINALIZED` o `CANCELLED`             |
| `row_status` con valores `draft`, `validated`, `posted`, `cancelled`      | estado técnico de la fila importada            | `NO_APLICA_COMO_ESTADO_DE_LINEA`  | no se mapea a `ACTIVE` o `CANCELLED`                        |
| `match_status`                                                            | resultado local de matching de producto        | `NO_APLICA_COMO_ESTADO_COMERCIAL` | pertenece al mapping, no al lifecycle de la venta           |
| `source_row_number`                                                       | posición física dentro del archivo             | `LOCALIZADOR_TECNICO`             | no es identidad externa de línea                            |
| `external_item_id` / nombre / categoría                                   | referencia agregada de ítem                    | `DISPONIBLE_A_NIVEL_AGREGADO`     | no demuestra una línea perteneciente a una venta individual |
| identidad externa de venta                                                | no observada en el flujo actual                | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | no permite construir venta individual por inferencia        |
| identidad externa de línea                                                | no observada en el flujo actual                | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | no permite construir línea individual por inferencia        |
| estado de venta en Makos                                                  | no observado en el flujo actual                | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | no existe mapping comercial acreditado                      |
| estado de línea en Makos                                                  | no observado en el flujo actual                | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | no existe mapping de línea acreditado                       |
| timestamp transaccional de venta                                          | no observado en el flujo actual                | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | no puede fabricarse desde `sales_date`                      |
| timestamps de creación, actualización o cierre de Makos                   | no observados en el flujo actual               | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`   | permanecen sujetos a evidencia del binding futuro           |

Por tanto:

```text
SALES_DATE DEL ARCHIVO
≠
SALE_OCCURRED_AT
```

```text
IMPORTED_AT
≠
SALE_OCCURRED_AT
```

```text
DRAFT / VALIDATED / POSTED / CANCELLED DEL LOTE
≠
ESTADO COMERCIAL DE LA VENTA
```

```text
SOURCE_ROW_NUMBER
≠
IDENTIDAD DE LÍNEA
```

El flujo Excel no se elimina ni se redefine por esta tarea. Permanece como integración agregada existente hasta que una tarea autorizada decida su evolución física.

---

#### 14. Binding futuro de Makos

La API de Makos está confirmada como habilitable bajo solicitud, pero Vento todavía no dispone en esta línea base de la especificación técnica del binding ni de una credencial provisionada.

Antes de permitir que una integración transaccional Makos produzca ventas individuales, la evidencia técnica deberá permitir completar una matriz equivalente a la siguiente:

| Slot requerido                                 | Evidencia que debe existir                                   | Resultado permitido                              |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| identidad externa de venta                     | campo o garantía estable documentada                         | mapping directo o regla estable de `INT-POS-013` |
| identidad externa de línea                     | campo estable o evidencia formal de ausencia                 | mapping directo o resolución de `INT-POS-013`    |
| estado de venta                                | campo, recurso o garantía contractual con semántica conocida | `MAPPED`, `NOT_PROVIDED` o `UNRESOLVED`          |
| estado de línea                                | campo o declaración verificable de no disponibilidad         | `MAPPED`, `NOT_PROVIDED` o `UNRESOLVED`          |
| timestamp de venta                             | campo y semántica temporal acreditados                       | `sale_occurred_at` resoluble                     |
| zona horaria u offset                          | valor por registro o regla verificable del binding           | instante inequívoco                              |
| timestamps de creación, actualización y cierre | documentación de cada campo cuando exista                    | slots diferenciados sin inferencia               |
| empresa, sede, terminal y caja                 | referencias reales disponibles en la fuente                  | handoff a `INT-POS-010`                          |
| producto o ítem de línea                       | referencia externa suficiente                                | handoff a `INT-POS-011`                          |

No se registran aquí nombres de endpoints, propiedades JSON, scopes, formatos ni valores específicos de Makos porque esa evidencia técnica aún no forma parte de la línea base disponible.

---

#### 15. Puertas de elegibilidad derivadas de esta tarea

Una venta individual importada no podrá avanzar hacia la emisión de venta validada de `INT-POS-015` cuando ocurra cualquiera de estas condiciones:

| Condición                                                            | Tratamiento                                                                         | Tarea propietaria de salida                                 |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| no existe identidad externa de venta ni regla estable autorizada     | conservar sin producir una identidad alternativa por intento                        | `INT-POS-013`                                               |
| la venta no tiene líneas individualizables                           | conservar como agregado o evidencia, sin presentarla como venta individual completa | `INT-POS-013`; reevaluación en `INT-POS-021`                |
| el estado comercial requerido está `NOT_PROVIDED` o `UNRESOLVED`     | bloquear efectos que dependan de estado                                             | `INT-POS-021` deberá demostrar suficiencia antes del piloto |
| `sale_occurred_at` no puede resolverse                               | bloquear efectos que exijan temporalidad transaccional                              | `INT-POS-021`                                               |
| la zona horaria de un timestamp local no puede demostrarse           | no escoger zona por defecto                                                         | `INT-POS-021`                                               |
| llega una revisión aparentemente anterior a una ya reconocida        | no sobrescribir la versión posterior                                                | `INT-POS-013`; conciliación en `INT-POS-020`                |
| empresa, sede, terminal o caja requeridas no se pueden mapear        | no habilitar efectos dependientes de alcance                                        | `INT-POS-010`                                               |
| una línea no puede mapearse al producto requerido                    | conservar línea sin efecto de inventario                                            | `INT-POS-011`; `INT-POS-012`                                |
| se requiere información monetaria o de pago todavía no materializada | no inferirla desde estado o total                                                   | `INT-POS-007`                                               |
| la fuente comunica anulación, devolución o reembolso                 | no reducirlo a un simple cambio de estado con efectos implícitos                    | `INT-POS-008`                                               |
| falta procedencia completa, versión, hash o recepción                | no presentar la transformación como reproducible                                    | `INT-POS-009`                                               |
| el transporte o recuperación incremental todavía no está definido    | no asumir webhook, polling o frecuencia                                             | `INT-POS-014`                                               |

`INT-POS-021` deberá diseñar el piloto sin efectos de manera que compruebe estas puertas con evidencia del binding real. `INT-POS-022` no podrá diseñar un piloto con efectos habilitados sobre una semántica que permanezca no resuelta.

---

#### 16. Reglas de revisión y eventos fuera de orden

1. Una actualización de una venta conserva la misma identidad canónica cuando corresponde al mismo hecho de origen.
2. La revisión de fuente, cuando exista, se conserva separada de los timestamps.
3. Un `source_updated_at` posterior no prueba por sí solo que la versión de negocio sea superior cuando el proveedor disponga de un mecanismo explícito de versión o secuencia.
4. Una representación tardía no podrá sobrescribir silenciosamente una revisión reconocida como posterior.
5. Un valor de estado desconocido no se fuerza al estado canónico más cercano.
6. Una transición aparentemente regresiva se envía a conciliación o queda bloqueada hasta demostrar la semántica del proveedor.
7. Un replay conserva el instante histórico del hecho; solo el intento técnico de procesamiento ocurre después.
8. Una corrección autorizada conserva antes, después, motivo o correlación mediante los contratos transversales aplicables; no reescribe el hecho original.
9. `INT-POS-013` materializará la idempotencia por sistema, venta y línea externa.
10. `INT-POS-020` materializará la conciliación diaria y el tratamiento de diferencias persistentes.

---

#### 17. Separación entre estados externos, estados canónicos y estados de proceso

Los estados definidos por esta tarea no sustituyen los estados de los procesos empresariales `VPROC-*`.

Por ejemplo, un proceso PULSO puede encontrarse en un estado de preparación, pago, entrega o conciliación mientras el estado comercial de la venta tenga otra semántica.

Por tanto:

```text
ESTADO EXTERNO DE MAKOS
→ se interpreta mediante mapping acreditado

ESTADO COMERCIAL CANÓNICO DE VENTA
→ describe únicamente lifecycle comercial de la venta

ESTADO VPROC DE PULSO
→ describe el avance del proceso empresarial propietario
```

Ninguno se deriva automáticamente de otro.

La misma separación aplica a estados de pago, fiscalidad, inventario, fidelización y economía.

---

#### 18. Fronteras con tareas posteriores

- `INT-POS-007` incorporará descuentos, impuestos, propinas y medios de pago sin redefinir identidad, estado comercial ni `sale_occurred_at`.
- `INT-POS-008` definirá anulaciones, devoluciones y reembolsos como hechos diferenciados; `CANCELLED` no ejecuta esos efectos por sí solo.
- `INT-POS-009` conservará físicamente payload original, versión, hash y fecha de recepción; `received_at` no sustituirá el momento comercial.
- `INT-POS-010` materializará el mapping de empresa, sede, terminal y caja externa.
- `INT-POS-011` materializará mapping de producto, presentación y receta.
- `INT-POS-012` gobernará cuarentena de líneas sin mapping.
- `INT-POS-013` definirá identidad e idempotencia por sistema, venta y línea, incluida la ausencia real de identificadores externos fuertes.
- `INT-POS-014` definirá webhook y polling sin cambiar la semántica temporal o de estados.
- `INT-POS-015` emitirá el evento canónico únicamente cuando la venta satisfaga las puertas aplicables.
- `INT-POS-020` conciliará diferencias de estado, temporalidad y efectos sin reescribir historia.
- `INT-POS-021` deberá probar el binding real sin efectos sobre inventario ni finanzas.
- `INT-POS-022` solo podrá habilitar efectos después de demostrar que las puertas críticas quedaron resueltas.
- `SHELL-CON-020` y `SHELL-CON-021` materializarán posteriormente tipos y estructuras físicas compartidas sin alterar estas semánticas.

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 19. Decisiones congeladas

1. La importación distingue representación de fuente, representación normalizada y contrato canónico.
2. Una venta individual requiere identidad de fuente o resolución formal posterior, líneas individualizables, estado comercial resoluble cuando sea necesario y un momento comercial inequívoco antes de efectos.
3. El encabezado y las líneas conservan valores de origen sin completarlos con defaults inventados.
4. El vocabulario comercial mínimo de venta es `OPEN`, `FINALIZED` y `CANCELLED`.
5. `FINALIZED` no significa pagado, facturado, entregado, conciliado, descontado de inventario, acumulado en fidelización ni contabilizado.
6. `CANCELLED` no ejecuta anulación, devolución, reembolso o compensación.
7. El vocabulario de línea, cuando la fuente tenga lifecycle verificable, es `ACTIVE` y `CANCELLED`.
8. El resultado de mapping de estado distingue `MAPPED`, `NOT_PROVIDED` y `UNRESOLVED`.
9. Ningún estado técnico del importador es estado comercial de venta o línea.
10. `sale_occurred_at`, `business_date`, creación, actualización, cierre, recepción e importación son conceptos temporales distintos.
11. Un timestamp de fuente solo se normaliza cuando su semántica y contexto temporal son verificables.
12. No se fabrica medianoche para convertir una fecha en instante.
13. No se inventa zona horaria, offset ni precisión.
14. Un evento tardío conserva su momento histórico y no retrocede silenciosamente una revisión posterior.
15. El `sales_date` del flujo Excel vigente no es `sale_occurred_at`.
16. `imported_at`, `created_at` y `updated_at` locales no son timestamps de venta Makos.
17. Los estados `draft`, `validated`, `posted` y `cancelled` del lote o fila vigente pertenecen al workflow local de importación y no al lifecycle comercial de Makos.
18. `source_row_number` no es identidad de línea.
19. La integración Excel vigente continúa siendo agregada y no puede generar ventas individuales ficticias.
20. Los nombres físicos y valores reales del futuro binding Makos solo se incorporarán con evidencia técnica del proveedor.
21. Esta tarea no modifica código, migraciones, Supabase, datos, credenciales, endpoints, webhooks, polling ni efectos internos.
22. `INT-POS-007` permanece exclusivamente reservada.

---

#### 20. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-006` instancia para la transición Makos → PULSO reglas ya protegidas por la cobertura canónica vigente: convergencia de POS externo y PULSO en contratos de venta y línea, separación de estados comerciales respecto de pago, fiscalidad e inventario, rechazo de estados incompatibles, preservación de versiones frente a eventos fuera de orden, conservación del momento histórico del hecho en replay o backfill, exigencia de equivalencia semántica para mappings legacy y separación entre momento del hecho, registro técnico y cierre. No introduce una capacidad ejecutable nueva ni una excepción fuera de esas reglas ya protegidas. Por tanto, el registro 04A permanece sin cambios.

#### 21. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-INTEGRATION-014`, como cobertura primaria de convergencia en contratos canónicos de venta y línea, estados incompatibles, parcialidad, eventos fuera de orden y conciliación durante la transición POS externo ↔ PULSO;
- `TREQ-INTEGRATION-043`, que impide que una versión tardía sobrescriba una revisión posterior;
- `TREQ-INTEGRATION-044`, que exige tratamiento explícito de eventos fuera de orden, desconocidos o incompatibles;
- `TREQ-INTEGRATION-045`, que conserva el `occurred_at` histórico en replay o backfill;
- `TREQ-INTEGRATION-046`, que exige equivalencia demostrable de hecho, momento, agregado, versión y efectos antes de mapear una representación legacy;
- `TREQ-INTEGRATION-049`, que protege procedencia, identificador externo, recepción y correlación de hechos externos;
- `TREQ-INTEGRATION-222`, que separa `occurred_at`, `recorded_at` y `completed_at`, conserva contexto temporal y prohíbe reescribir el momento del hecho por una captura tardía;
- `TREQ-PULSO-005`, que protege la separación de los estados del ciclo comercial;
- `TREQ-PULSO-006`, que protege la separación entre venta, pago, caja, fiscalidad, devolución y conciliación.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 22. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `INT-POS-005` como contrato semántico base sin cambiar identidad ni propiedad de venta y línea;
2. distingue representación de fuente, normalización y contrato canónico;
3. define el contenido semántico mínimo del encabezado de venta individual;
4. define el contenido semántico mínimo de la línea de venta individual;
5. mantiene una línea vinculada a exactamente una venta;
6. define un vocabulario comercial mínimo de venta sin mezclar pago, fiscalidad, inventario, fidelización, economía, preparación o entrega;
7. define el vocabulario condicional de estado de línea sin inferir lifecycle cuando la fuente no lo exponga;
8. define resultados explícitos de mapping `MAPPED`, `NOT_PROVIDED` y `UNRESOLVED`;
9. prohíbe mappings por semejanza de nombre sin equivalencia semántica;
10. permite garantías contractuales de recurso como evidencia únicamente cuando estén documentadas por la fuente;
11. impide tratar estados técnicos del importador como estados de negocio;
12. distingue `sale_occurred_at`, fecha comercial, creación, actualización, cierre, recepción e importación;
13. prohíbe sustituir el momento comercial por un timestamp técnico;
14. prohíbe fabricar hora, offset, zona o precisión;
15. define tratamiento de timestamps locales ambiguos o sin contexto temporal suficiente;
16. conserva el momento histórico frente a recepción tardía, replay o backfill;
17. impide que una revisión tardía degrade silenciosamente una posterior;
18. clasifica uno por uno los campos temporales y de estado de la importación `makos_excel` existente;
19. documenta que el Excel actual no contiene identidad individual de venta, identidad individual de línea, estado comercial Makos ni timestamp transaccional de venta;
20. impide convertir `sales_date` en `sale_occurred_at`;
21. impide convertir `source_row_number` en identidad de línea por defecto;
22. define la evidencia mínima que deberá aportar el binding futuro de Makos antes de un piloto transaccional;
23. asigna cada bloqueo o dato faltante a una tarea `INT-POS` exacta con condición de salida;
24. mantiene `INT-POS-007` como única siguiente tarea reservada;
25. genera cero cambios `TREQ-*` por existir cobertura canónica específica;
26. no crea una copia del registro 04A;
27. no implementa código, DDL, DML, migraciones, Supabase, credenciales, endpoints, webhooks, polling, importaciones remotas ni efectos empresariales;
28. no presenta como disponible ningún campo o estado de Makos que no esté respaldado por evidencia actual.

---

#### 23. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-005 — Definir contrato canónico de venta y línea de venta`

TAREA ACTUAL APROBADA

`INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`

SIGUIENTE TAREA RESERVADA

`INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`


### ✅ INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`
**Tarea siguiente:** `INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`
**Tipo de tarea:** documental; definición normativa de la importación de componentes monetarios de venta y línea, propinas y hechos de pago asociados a una venta canónica, preservando valor de fuente, alcance, moneda, precisión, estado y referencias sin fusionar venta, pago, caja, documento fiscal, devolución ni hecho económico, sin inventar campos de Makos, ejecutar cobros, definir reversos, implementar código, crear migraciones, modificar Supabase ni producir efectos internos
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**POS externo vigente:** `Makos`
**POS integral objetivo:** `PULSO`
**Línea base documental:** `vento-shell@32db942792eeeb16bd9c338f975740a49f1e023b`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo deberán importarse y normalizarse los componentes monetarios y los hechos de pago asociados a una venta canónica durante la transición desde Makos y, posteriormente, cuando PULSO produzca el mismo contrato.

La tarea cubre cuatro familias de información:

1. descuentos;
2. impuestos;
3. propinas;
4. medios y hechos de pago.

La importación deberá conservar la afirmación real de la fuente y distinguirla de cualquier representación normalizada de Vento.

Regla raíz:

```text
VALOR MONETARIO O HECHO DE PAGO DE LA FUENTE
        ↓
PROCEDENCIA + ALCANCE + MONEDA + SEMÁNTICA ACREDITADA
        ↓
NORMALIZACIÓN SIN INVENTAR NI CORREGIR SILENCIOSAMENTE
        ↓
VENTA / LÍNEA + COMPONENTES MONETARIOS
        +
HECHOS DE PAGO RELACIONADOS, PERO INDEPENDIENTES
        ↓
CONCILIACIÓN Y EFECTOS POSTERIORES EN SUS TAREAS PROPIETARIAS
```

---

#### 2. Base canónica preservada

`INT-POS-007` consume sin reabrir las siguientes decisiones aprobadas:

1. Makos es la fuente temporal de las ventas originadas dentro de su alcance mientras no ocurra el corte correspondiente.
2. PULSO será la fuente de las nuevas ventas posteriores al corte aprobado.
3. Makos y PULSO deberán converger en el mismo contrato canónico de venta y línea.
4. Venta, pedido, pago, sesión de caja, documento fiscal, inventario, fidelización y hecho económico son hechos distintos.
5. El contrato canónico conserva componentes monetarios y referencias de pago sin convertirlos en identidad de venta.
6. Una línea pertenece exactamente a una venta y conserva su snapshot comercial.
7. Una diferencia monetaria no se corrige para forzar coincidencia.
8. El documento fiscal permanece bajo autoridad del POS o proveedor fiscal autorizado mientras corresponda.
9. Los estados comerciales de venta definidos en `INT-POS-006` no se derivan de estados de pago.
10. Una anulación, devolución o reembolso no se representa mediante un importe negativo ambiguo y pertenece a `INT-POS-008`.
11. Los efectos económicos corresponden a NUMERA mediante `INT-POS-017`, no a la importación externa.
12. La conciliación de diferencias corresponde a `INT-POS-020`.
13. La API de Makos está confirmada como habilitable bajo solicitud, pero la especificación técnica, credenciales y campos reales del tenant Vento permanecen no provisionados.

Esta tarea no presupone nombres de propiedades, códigos de medio de pago, tasas tributarias, fórmulas, escalas decimales ni catálogos específicos de Makos.

---

#### 3. Separaciones semánticas obligatorias

La importación conservará como desigualdades:

```text
VENTA ≠ PAGO
PAGO ≠ MEDIO DE PAGO
PAGO ≠ SESIÓN DE CAJA
PAGO ≠ DOCUMENTO FISCAL
PAGO ≠ HECHO ECONÓMICO
DESCUENTO ≠ DEVOLUCIÓN
DESCUENTO ≠ REEMBOLSO
IMPUESTO ≠ DOCUMENTO FISCAL
PROPINA ≠ INGRESO DE PRODUCTO
PROPINA ≠ PAGO
TOTAL DE VENTA ≠ TOTAL PAGADO POR DEFINICIÓN
```

Una relación o coincidencia de importe no fusiona los objetos.

---

#### 4. Capas de información monetaria

Toda importación monetaria distinguirá tres capas:

| Capa                       | Contenido                                                                                                | Regla                                             |
| -------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| representación de fuente   | valor, código, etiqueta, moneda, tasa, base, alcance, referencia y estado tal como la fuente los exprese | se conserva sin alterar para aparentar coherencia |
| representación normalizada | interpretación de alcance, componente, importe, moneda, estado y relación con venta o línea              | solo se materializa con semántica acreditada      |
| contrato canónico          | componentes comerciales de venta/línea y referencias a hechos de pago                                    | desacopla consumidores del formato del proveedor  |

Por tanto:

```text
CAMPO AUSENTE
≠
CERO CONFIRMADO
```

```text
VALOR CERO POR DEFAULT TÉCNICO
≠
AFIRMACIÓN CERO DE LA FUENTE
```

```text
ETIQUETA PARECIDA
≠
EQUIVALENCIA SEMÁNTICA
```

---

#### 5. Contrato monetario mínimo

Todo componente monetario importado deberá poder conservar, cuando aplique:

| Dimensión                        | Obligación                                                                                              | Regla                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| tipo de componente               | requerida                                                                                               | identifica precio, subtotal, descuento, impuesto, propina, total u otro componente explícitamente soportado |
| alcance                          | requerido cuando sea necesario para interpretar el valor                                                | distingue encabezado de venta, línea o hecho de pago sin repartir valores por inferencia                    |
| importe                          | requerido cuando la fuente entregue el componente                                                       | conserva signo y magnitud de origen; no se modifica para cuadrar                                            |
| moneda                           | requerida antes de conciliación o efecto económico cuando el binding no garantice una moneda inequívoca | no se asume desde la interfaz ni desde defaults de otra integración                                         |
| precisión o escala de fuente     | condicional                                                                                             | se conserva cuando pueda demostrarse; no se fabrican decimales                                              |
| código o identidad de fuente     | condicional                                                                                             | se conserva cuando exista                                                                                   |
| etiqueta o descripción de fuente | condicional                                                                                             | sirve como evidencia, no como mapping suficiente                                                            |
| base de cálculo                  | condicional                                                                                             | solo se importa si la fuente la entrega o documenta inequívocamente                                         |
| tasa o porcentaje                | condicional                                                                                             | no se deduce como verdad oficial a partir de importe/base                                                   |
| semántica de inclusión           | condicional                                                                                             | distingue, cuando esté documentado, valor incluido o adicional; ausencia queda no resuelta                  |
| referencia de línea              | condicional                                                                                             | obligatoria cuando el componente pertenece específicamente a una línea                                      |
| referencia de procedencia        | requerida                                                                                               | enlaza la afirmación original gobernada posteriormente por `INT-POS-009`                                    |

La ausencia de una dimensión condicional se conserva como ausencia y no se completa con un valor artificial.

---

#### 6. Moneda, signo, precisión y cero

Reglas obligatorias:

1. cada importe conservará la moneda declarada por la fuente cuando exista;
2. si el binding documenta una única moneda invariable para el recurso, esa garantía podrá utilizarse como evidencia;
3. el default `COP` de una integración interna existente no demuestra la moneda de Makos;
4. no se realizará conversión de moneda sin un contrato explícito de tipo de cambio y una tarea autorizada;
5. importes de monedas distintas no se sumarán como si fueran homogéneos;
6. el signo de origen se conserva;
7. un signo inesperado no se convierte automáticamente a valor absoluto;
8. una cantidad o importe negativo que pueda representar devolución, reverso o reembolso se deriva a `INT-POS-008` antes de producir efectos;
9. un campo ausente no se transforma en cero por conveniencia;
10. un cero explícito de fuente puede conservarse como cero;
11. un cero producido por parser, default de base de datos o inicialización local no demuestra que la fuente haya informado cero;
12. no se redondearán componentes para forzar igualdad;
13. la representación física futura deberá permitir cálculos monetarios deterministas sin depender de aritmética binaria imprecisa; los tipos concretos deberán materializarse en `SHELL-CON-020` y `SHELL-CON-021` sin cambiar esta semántica.

---

#### 7. Importación de descuentos

Un descuento importado representa una reducción comercial declarada por la fuente y deberá conservarse separado de devolución, reembolso, compensación o cambio de cantidad.

Por cada descuento se conservará, cuando exista:

- importe;
- moneda;
- alcance de venta o línea;
- referencia a la línea cuando corresponda;
- código, identificador o etiqueta del descuento en la fuente;
- base y tasa cuando la fuente las entregue;
- referencia de promoción, cupón o autorización únicamente cuando la fuente la provea;
- referencia de procedencia.

Reglas:

1. un descuento de encabezado no se reparte entre líneas por prorrateo inventado;
2. un descuento de línea no se eleva a descuento global sin conservar su línea;
3. varios descuentos se conservan separados cuando la fuente los individualice;
4. un agregado único permanece agregado cuando la fuente no entregue desglose;
5. una etiqueta no crea por sí sola identidad de promoción o cupón;
6. descuento cero solo significa cero cuando la fuente lo afirme o su contrato lo garantice;
7. un descuento no modifica cantidad de producto;
8. un descuento no implica devolución ni reembolso;
9. una revisión posterior conserva historia y no reescribe destructivamente el valor anterior;
10. cualquier discrepancia frente al total se conserva para `INT-POS-020`.

---

#### 8. Importación de impuestos

El impuesto importado conserva la afirmación tributaria del POS o proveedor autorizado sin convertir a Vento en autoridad fiscal.

Por cada componente tributario se conservará, cuando exista:

- importe;
- moneda;
- alcance de venta o línea;
- referencia a línea;
- código, nombre o categoría tributaria de fuente;
- base gravable informada;
- tasa informada;
- indicación de inclusión o adición al precio cuando esté documentada;
- referencia fiscal relacionada cuando la fuente la entregue;
- referencia de procedencia.

Reglas:

1. un importe tributario no se recalcula para sustituir el valor de fuente;
2. una tasa no se infiere como verdad oficial únicamente dividiendo impuesto entre base;
3. impuesto cero no demuestra exención, exclusión ni tarifa cero por sí solo;
4. un impuesto agregado no se distribuye a líneas sin evidencia de asignación;
5. una suma de impuestos de línea no sobrescribe el impuesto de encabezado cuando exista diferencia;
6. una diferencia queda conciliable, no corregida;
7. el documento fiscal no se convierte en copia maestra de la venta;
8. la importación no emite, modifica ni anula documentos fiscales;
9. la autoridad fiscal externa se preserva durante la transición;
10. `INT-POS-017` recibirá posteriormente el hecho económico normalizado sin convertir la importación en contabilidad.

---

#### 9. Importación de propinas

La propina se tratará como componente monetario separado.

Cuando la fuente la exponga, se conservará:

- importe;
- moneda;
- alcance o asociación con la venta;
- asociación con un pago cuando la fuente la entregue explícitamente;
- código o etiqueta de fuente cuando exista;
- referencia de procedencia.

Reglas:

1. una propina no se incorpora al precio de producto por inferencia;
2. una propina no se trata como impuesto;
3. una propina no se trata como descuento;
4. una propina no se asume incluida en el total de venta o en el importe pagado salvo que la fuente documente esa semántica;
5. una propina no ejecuta distribución, liquidación laboral ni movimiento de caja por el solo hecho de importarse;
6. una propina agregada no se reparte entre líneas, productos, trabajadores o pagos sin evidencia;
7. ausencia de campo de propina no se transforma en cero confirmado;
8. la conciliación de propina con venta, pagos y cierre corresponde a `INT-POS-020`;
9. su efecto económico posterior corresponde a `INT-POS-017` cuando resulte aplicable.

---

#### 10. Hecho de pago importado

Un pago importado será un hecho relacionado con una venta, no una propiedad que absorba la venta.

La representación deberá admitir cero, uno o varios hechos de pago asociados a una misma venta.

Cada hecho de pago deberá poder conservar:

| Dimensión                             | Obligatoriedad                                                                   | Regla                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| venta relacionada                     | requerida                                                                        | el pago se vincula a una venta sin convertirse en ella |
| identidad externa de pago             | requerida cuando la fuente la entregue                                           | se conserva sin sustituirla por identidad de venta     |
| proveedor, adquirente o procesador    | condicional                                                                      | se conserva cuando la fuente lo identifique            |
| código de medio de pago de fuente     | condicional                                                                      | no se renombra por similitud                           |
| etiqueta de medio de pago de fuente   | condicional                                                                      | se conserva como evidencia                             |
| importe                               | requerido para un pago cuantificable                                             | no se deriva del total de venta por defecto            |
| moneda                                | requerida antes de conciliación cuando no exista garantía inequívoca del binding | se conserva por pago                                   |
| estado de pago de fuente              | requerido cuando la fuente lo entregue                                           | se conserva sin fusionarlo con estado de venta         |
| estado de pago normalizado            | condicional                                                                      | solo se materializa con equivalencia demostrable       |
| referencia o comprobante de proveedor | condicional                                                                      | se conserva cuando exista                              |
| timestamp del pago o confirmación     | condicional                                                                      | solo se usa con semántica acreditada                   |
| referencia de procedencia             | requerida                                                                        | enlaza la afirmación original                          |

La existencia de un pago relacionado no cambia por sí sola el estado comercial `OPEN`, `FINALIZED` o `CANCELLED` de la venta.

---

#### 11. Tratamiento de medios de pago

`INT-POS-007` no inventa un catálogo cerrado de marcas, adquirentes o medios de Makos.

La importación deberá preservar:

```text
CÓDIGO / IDENTIDAD DE MEDIO EN LA FUENTE
+
ETIQUETA DE FUENTE, CUANDO EXISTA
+
PROVEEDOR O PROCESADOR, CUANDO EXISTA
+
RESULTADO DE INTERPRETACIÓN
```

El resultado de interpretación utilizará:

| Resultado      | Significado                                                                                  | Tratamiento                                                                            |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `MAPPED`       | existe equivalencia aprobada con una referencia de medio aceptada por el contrato consumidor | se conserva fuente y referencia normalizada                                            |
| `NOT_PROVIDED` | la fuente acreditada no entrega el medio o no lo entrega para ese hecho                      | se conserva ausencia                                                                   |
| `UNRESOLVED`   | existe código, etiqueta o señal, pero no hay equivalencia segura                             | se conserva valor original y se bloquean decisiones que requieran el medio normalizado |

Reglas:

1. no se infiere `efectivo`, `tarjeta`, `transferencia`, billetera u otra categoría por nombre parcial sin regla acreditada;
2. marca de tarjeta, procesador, adquirente, banco y medio de pago no se consideran sinónimos;
3. el método informado por una integración interna de Wompi no define el catálogo de Makos;
4. un cambio futuro de mapping no reescribe la afirmación histórica de fuente;
5. un medio no resuelto puede conservarse para conciliación, pero no autoriza una clasificación financiera inventada.

---

#### 12. Vocabulario mínimo de estado de pago normalizado

Cuando exista evidencia suficiente, la frontera de importación podrá normalizar el estado del hecho de pago a:

| Estado       | Significado                                                                                             | No implica                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PENDING`    | el pago o intento existe pero la fuente no acredita todavía confirmación definitiva                     | fallo, venta cancelada o deuda vencida                                  |
| `AUTHORIZED` | la fuente acredita autorización del medio, sin afirmar necesariamente captura, recepción o conciliación | dinero conciliado, documento fiscal o venta finalizada                  |
| `CONFIRMED`  | la fuente acredita recepción, captura o confirmación del pago según el contrato del proveedor           | conciliación bancaria, caja cerrada, factura emitida o venta finalizada |
| `FAILED`     | la fuente acredita rechazo o fallo definitivo del intento                                               | cancelación de la venta                                                 |
| `CANCELLED`  | la fuente acredita cancelación del intento de pago antes de su confirmación final                       | devolución, reembolso o compensación                                    |
| `UNRESOLVED` | existe una señal o estado cuya semántica no permite mapping seguro                                      | ningún resultado financiero                                             |

Reglas:

1. un timeout o resultado desconocido no se convierte en `FAILED`;
2. un estado de venta no se convierte en estado de pago;
3. un estado fiscal no se convierte en estado de pago;
4. un estado técnico del adaptador no se convierte en estado de pago;
5. señales de `refund`, devolución, reversión u otra compensación quedan preservadas y se derivan a `INT-POS-008` para su semántica completa;
6. `CONFIRMED` no equivale a conciliación bancaria o de caja;
7. `CANCELLED` no equivale a reembolso;
8. un valor externo nuevo o ambiguo queda `UNRESOLVED`.

---

#### 13. Pagos parciales y medios combinados

La estructura deberá admitir:

```text
UNA VENTA
        ↓
0..N HECHOS DE PAGO
        ↓
CADA PAGO CONSERVA
IMPORTE + MONEDA + MEDIO + PROVEEDOR + REFERENCIA + ESTADO
```

Reglas:

1. una venta puede permanecer sin pagos mientras su ciclo lo permita;
2. un pago parcial no se eleva artificialmente al total de la venta;
3. varios pagos de una misma venta no se consolidan en un único pago ficticio;
4. medios combinados conservan un hecho separado por componente cuando la fuente los individualice;
5. si la fuente entrega únicamente un total pagado agregado, se conserva como agregado y no se inventan pagos individuales;
6. un exceso o faltante entre pagos confirmados y total exigible se registra como diferencia;
7. importes de monedas distintas no se suman sin conversión autorizada;
8. propina incluida en un pago solo se separa cuando la fuente permita demostrarlo;
9. pago confirmado no demuestra entrega, documento fiscal, inventario, puntos ni hecho económico aplicado;
10. `INT-POS-020` conciliará diferencias persistentes y `INT-POS-017` recibirá los hechos económicos correspondientes.

---

#### 14. Reconciliación monetaria sin corrección silenciosa

La importación conservará simultáneamente:

- subtotal de encabezado cuando la fuente lo entregue;
- componentes monetarios de línea;
- descuentos de venta y línea;
- impuestos de venta y línea;
- propinas;
- total de venta cuando la fuente lo entregue;
- pagos relacionados;
- valores agregados del flujo histórico cuando solo exista esa granularidad.

Una fórmula de recomposición solo podrá evaluarse cuando la semántica del binding permita determinar qué componentes están incluidos o excluidos.

Quedan prohibidas estas correcciones:

```text
DIFERENCIA
→ REDONDEAR HASTA QUE CUADRE
```

```text
DESCUENTO AGREGADO
→ REPARTIR ENTRE LÍNEAS SIN EVIDENCIA
```

```text
IMPUESTO DE ENCABEZADO
→ SOBRESCRIBIR CON SUMA DE LÍNEAS
```

```text
TOTAL DE VENTA
→ CREAR UN PAGO FICTICIO POR EL MISMO IMPORTE
```

```text
TOTAL PAGADO
→ MODIFICAR LA VENTA PARA FORZAR COINCIDENCIA
```

Toda diferencia conservará origen, valores comparados y condición pendiente para `INT-POS-020`.

---

#### 15. Tratamiento del flujo `makos_excel` existente

La implementación vigente demuestra únicamente información agregada por ítem y día.

| Elemento actual                | Evidencia física                    | Clasificación para `INT-POS-007`       | Consecuencia                                                     |
| ------------------------------ | ----------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `subtotal_amount`              | disponible por fila agregada y lote | `AGREGADO_DISPONIBLE`                  | no demuestra subtotal de una venta individual                    |
| `tax_amount`                   | disponible por fila agregada y lote | `AGREGADO_DISPONIBLE`                  | no demuestra código, tasa, base ni inclusión tributaria          |
| `discount_amount`              | disponible por fila agregada y lote | `AGREGADO_DISPONIBLE`                  | no demuestra identidad, alcance ni causa de descuento individual |
| `return_amount`                | disponible por fila agregada y lote | `FUERA_DE_ALCANCE_MONETARIO_ORDINARIO` | su semántica completa pertenece a `INT-POS-008`                  |
| `net_sales_amount`             | calculado localmente                | `DERIVADO_LEGACY_AGREGADO`             | no se eleva a total canónico de venta individual                 |
| `gross_sales_amount`           | calculado localmente por fila       | `DERIVADO_LEGACY_AGREGADO`             | no define semántica tributaria del proveedor                     |
| propina                        | no observada                        | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`        | no se inventa cero                                               |
| identidad individual de pago   | no observada                        | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`        | no permite hechos de pago individuales                           |
| medio de pago                  | no observado                        | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`        | no se infiere desde total o archivo                              |
| estado de pago                 | no observado                        | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`        | no se infiere desde estado del lote                              |
| proveedor o referencia de pago | no observado                        | `NO_DISPONIBLE_EN_FLUJO_ACTUAL`        | permanece sujeto al binding futuro                               |

El parser vigente convierte campos tributarios o de descuento ausentes en `0` para su cálculo local. Ese comportamiento técnico no constituye evidencia de que Makos haya afirmado un valor cero.

Las fórmulas actuales:

```text
net_sales_amount = subtotal - discounts - returns
gross_sales_amount = subtotal + tax
```

se clasifican como cálculos de la importación agregada existente. No definen por sí solos la fórmula canónica de una venta individual ni prueban si el impuesto está incluido, excluido o calculado con otra semántica en Makos.

---

#### 16. Tratamiento de la fundación de pagos Wompi existente

La línea base técnica contiene `payments.transactions` para checkout de pedidos con datos como proveedor, referencia, importe en unidad menor, moneda, estado y `payment_method`.

Esa estructura demuestra que Vento ya distingue un pago como objeto técnico separado del pedido, pero no se eleva por sí sola al contrato definitivo de importación del POS externo.

Reglas:

1. `provider = wompi` es específico de esa integración y no se aplica a Makos;
2. el default `COP` de esa tabla no demuestra la moneda de una venta Makos;
3. los estados físicos `pending`, `requires_action`, `approved`, `rejected`, `cancelled`, `refunded` y `error` no se convierten en vocabulario Makos por existencia;
4. el modelo actual no demuestra soporte integral de pagos parciales o medios combinados provenientes del POS externo;
5. `refunded` continúa sujeto a la semántica de `INT-POS-008`;
6. esta tarea no modifica esa estructura física.

---

#### 17. Evidencia requerida del binding futuro de Makos

Antes de que un piloto transaccional use información monetaria o de pagos de Makos, deberá existir evidencia suficiente para completar esta matriz:

| Área                       | Evidencia requerida                                                                | Resultado permitido                                      |
| -------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| subtotal y total           | campos y semántica exacta                                                          | importación sin recomposición inventada                  |
| descuentos                 | alcance, importe, moneda y desglose disponible                                     | venta/línea/agregado según evidencia                     |
| impuestos                  | importe, alcance, código o etiqueta, base/tasa cuando existan, inclusión/exclusión | componente tributario reproducible                       |
| propina                    | disponibilidad, importe, moneda y relación con total/pago                          | componente separado cuando exista                        |
| pagos por venta            | existencia y cardinalidad                                                          | cero, uno, varios o agregado según evidencia             |
| identidad de pago          | campo estable cuando exista                                                        | referencia externa conservada                            |
| medio de pago              | código/etiqueta y semántica                                                        | mapping o clasificación explícita de no resolución       |
| importe de pago            | valor y moneda                                                                     | hecho cuantificable                                      |
| estado de pago             | catálogo y significado del proveedor                                               | mapping al vocabulario mínimo cuando exista equivalencia |
| proveedor/referencia       | campos disponibles                                                                 | trazabilidad del hecho                                   |
| timestamps de pago         | semántica de cada campo                                                            | tiempos importables sin inferencia                       |
| pagos parciales/combinados | garantía del recurso o desglose por pago                                           | preservación de cada componente                          |
| moneda                     | valor por registro o garantía contractual                                          | conciliación homogénea                                   |
| precisión                  | formato y escala efectiva                                                          | conservación sin redondeo inventado                      |

No se registran nombres de endpoints, propiedades JSON, códigos, tasas ni catálogos específicos porque la especificación técnica del tenant Vento no está provisionada.

---

#### 18. Puertas de elegibilidad derivadas

Una venta importada no podrá avanzar con efectos que dependan de información monetaria o de pago cuando ocurra alguna de estas condiciones:

| Condición                                            | Tratamiento                                                         | Tarea propietaria de salida                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| moneda no resoluble                                  | conservar importes sin sumarlos ni convertirlos                     | `INT-POS-021` deberá demostrar suficiencia antes del piloto; conciliación en `INT-POS-020` |
| descuento con alcance ambiguo                        | conservar componente sin reparto artificial                         | `INT-POS-021`; conciliación en `INT-POS-020`                                               |
| impuesto sin semántica suficiente para recomposición | conservar valor de fuente y evitar cálculo fiscal inventado         | `INT-POS-021`; conciliación en `INT-POS-020`                                               |
| propina sin relación demostrable con total o pago    | conservar componente separado                                       | `INT-POS-021`; conciliación en `INT-POS-020`                                               |
| medio de pago desconocido                            | conservar valor de fuente como `UNRESOLVED`                         | `INT-POS-021` deberá demostrar tratamiento seguro                                          |
| estado de pago desconocido                           | no inferir confirmación o fallo                                     | `INT-POS-021`                                                                              |
| timeout o resultado incierto                         | mantener condición no resuelta                                      | `INT-POS-021`; conciliación en `INT-POS-020`                                               |
| pagos parciales sin identidad o desglose suficiente  | no sintetizar componentes individuales                              | `INT-POS-021`; conciliación en `INT-POS-020`                                               |
| señal de devolución, reversión o reembolso           | preservar y no aplicarla como descuento ordinario                   | `INT-POS-008`                                                                              |
| falta de procedencia, payload, hash o recepción      | no presentar la transformación como reproducible                    | `INT-POS-009`                                                                              |
| diferencia monetaria persistente                     | no corregir la venta ni el pago                                     | `INT-POS-020`                                                                              |
| efecto económico requerido                           | no escribir contabilidad desde el adaptador                         | `INT-POS-017`                                                                              |
| binding todavía no demostrado                        | operar únicamente en el alcance permitido por el piloto sin efectos | `INT-POS-021`                                                                              |

`INT-POS-022` no podrá habilitar efectos sobre componentes críticos que continúen no resueltos.

---

#### 19. Fronteras con tareas posteriores

- `INT-POS-008` define anulaciones, devoluciones y reembolsos; un importe negativo, estado `refunded` o señal equivalente no se ejecuta desde esta tarea.
- `INT-POS-009` conserva físicamente payload original, versión, hash y recepción.
- `INT-POS-010` resuelve empresa, sede, terminal y caja externas cuando sean necesarias para contextualizar venta o pago.
- `INT-POS-011` resuelve producto, presentación y receta sin alterar snapshots monetarios de fuente.
- `INT-POS-012` gobierna líneas no mapeadas sin permitir efectos automáticos de inventario.
- `INT-POS-013` define idempotencia por sistema, venta y línea externa y no autoriza duplicar pagos por reintento.
- `INT-POS-014` define transporte mediante webhook o polling sin cambiar componentes monetarios.
- `INT-POS-015` emite el evento canónico de venta validada solo cuando las puertas aplicables estén satisfechas.
- `INT-POS-017` define el evento económico para NUMERA exactamente una vez.
- `INT-POS-018` define fidelización sin utilizar descuento o propina como sustituto de reglas de puntos.
- `INT-POS-019` define compensaciones internas asociadas a anulaciones y devoluciones.
- `INT-POS-020` reconcilia ventas, componentes monetarios, pagos y efectos sin reescribir historia.
- `INT-POS-021` prueba el binding real sin efectos sobre inventario ni finanzas.
- `INT-POS-022` solo habilita efectos después de demostrar suficiencia.
- `INT-POS-023` cambia la fuente futura hacia PULSO sin cambiar el significado de los componentes ya normalizados.
- `SHELL-CON-020` y `SHELL-CON-021` materializarán posteriormente los tipos y estructuras físicas compartidas de venta y línea.
- `SHELL-CON-023` materializará el contrato técnico transversal de idempotencia y conciliación aplicable a reintentos y hechos correlacionados, sin convertir el intento técnico en un pago nuevo.

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 20. Decisiones congeladas

1. descuentos, impuestos y propinas permanecen componentes diferenciados;
2. venta y pago permanecen hechos distintos;
3. una venta admite cero, uno o varios hechos de pago;
4. pagos parciales y medios combinados se conservan sin consolidación ficticia;
5. un pago conserva importe, moneda, medio, proveedor, referencia y estado cuando la fuente los entregue;
6. el medio de pago conserva su código o etiqueta de fuente y solo se normaliza con equivalencia acreditada;
7. el vocabulario mínimo de pago es `PENDING`, `AUTHORIZED`, `CONFIRMED`, `FAILED`, `CANCELLED` y `UNRESOLVED`;
8. un timeout o resultado desconocido no se considera fallo;
9. pago confirmado no equivale a venta finalizada, conciliación bancaria, caja cerrada ni documento fiscal;
10. cancelación de intento de pago no equivale a devolución o reembolso;
11. señales de devolución, reversión o reembolso pertenecen a `INT-POS-008`;
12. una propina no se fusiona con precio, impuesto, descuento o pago;
13. ausencia de campo no equivale a cero confirmado;
14. un default técnico cero no se eleva a afirmación de la fuente;
15. moneda no se asume desde Wompi, interfaz, sede o configuración no acreditada del binding;
16. no se suman monedas distintas ni se aplica conversión inventada;
17. signo y precisión de fuente se conservan;
18. no se redondean importes para forzar igualdad;
19. un descuento agregado no se reparte entre líneas sin evidencia;
20. un impuesto agregado no se reparte entre líneas sin evidencia;
21. impuesto cero no demuestra exención o tarifa cero;
22. el documento fiscal mantiene autoridad externa mientras corresponda;
23. el flujo `makos_excel` vigente es agregado y no demuestra propinas ni pagos individuales;
24. los ceros generados por el parser actual para campos ausentes no son evidencia de cero informado por Makos;
25. las fórmulas actuales de neto y bruto son cálculos legacy agregados, no fórmula canónica de venta individual;
26. la fundación Wompi existente no define el contrato del POS externo;
27. la especificación técnica de Makos sigue no provisionada y no se inventan sus campos;
28. esta tarea no modifica código, migraciones, Supabase, datos, credenciales, endpoints, webhooks, pagos reales ni efectos financieros;
29. `INT-POS-008` permanece exclusivamente reservada.

---

#### 21. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-007` materializa para la transición Makos → PULSO comportamientos ya protegidos por la cobertura canónica vigente: separación de venta, pago, caja y documento fiscal; pagos parciales y medios combinados con importe, moneda, proveedor, referencia y estado; conservación de propinas y descuentos; prohibición de asumir timeout como fallo; convergencia del POS externo y PULSO en el mismo contrato; conciliación de pagos incongruentes y montos o monedas divergentes; preservación de fuente y diferencias sin sobrescribir historia. No incorpora una capacidad ejecutable nueva ni una excepción fuera de esas reglas ya protegidas, por lo que el registro 04A permanece sin cambios.

#### 22. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-PULSO-005`, cobertura de snapshots de precio, impuestos, descuentos y separación de estados del ciclo comercial;
- `TREQ-PULSO-006`, cobertura primaria de venta, pago, caja, documento fiscal, propina, descuento, pagos parciales y medios combinados, importe, moneda, proveedor, referencia, estado, timeout y conciliación;
- `TREQ-INTEGRATION-006`, cobertura de fuente empresarial única y conservación de diferencias sin sobrescribir historia;
- `TREQ-INTEGRATION-014`, cobertura de convergencia POS externo/PULSO, parcialidad, pagos incongruentes, idempotencia y conciliación;
- `TREQ-INTEGRATION-017`, cobertura de venta y pago hacia NUMERA mediante contratos correlacionados, montos y monedas divergentes, pagos sin aplicación y reversos;
- `TREQ-NUMERA-001`, cobertura de reconciliación financiera contra hechos y documentos fuente;
- `TREQ-NUMERA-002`, cobertura de monto, moneda, impuesto, fuente, correlación y correcciones compensatorias;
- `TREQ-NUMERA-003`, cobertura de pagos parciales, aplicación de pagos, saldos y conciliación.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 23. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva el contrato de venta y línea de `INT-POS-005` sin fusionar venta y pago;
2. conserva los estados y timestamps de `INT-POS-006` sin derivarlos de valores monetarios;
3. define slots mínimos comunes para componentes monetarios;
4. distingue valor ausente de cero explícito;
5. conserva moneda, signo y precisión sin defaults no acreditados;
6. define importación de descuentos de encabezado y línea sin reparto artificial;
7. diferencia descuento de devolución, reembolso y compensación;
8. define importación de impuestos sin asumir tasa, base, exención o inclusión cuando no exista evidencia;
9. conserva autoridad fiscal externa;
10. define propina como componente separado;
11. impide usar propina como ingreso de producto, impuesto, descuento o pago;
12. define un hecho de pago separado de la venta;
13. admite cero, uno o varios pagos por venta;
14. admite pagos parciales y medios combinados;
15. conserva identidad, medio, proveedor, importe, moneda, estado y referencias de pago cuando existan;
16. define `MAPPED`, `NOT_PROVIDED` y `UNRESOLVED` para interpretación de medios;
17. define vocabulario mínimo de estado de pago sin importar los estados físicos de Wompi ni inventar los de Makos;
18. impide tratar timeout o resultado desconocido como fallo;
19. impide tratar `CANCELLED` como reembolso;
20. conserva señales de reversión para `INT-POS-008`;
21. prohíbe sumar monedas distintas sin conversión autorizada;
22. prohíbe redondear o reasignar componentes para cuadrar;
23. define diferencias monetarias como conciliables en `INT-POS-020`;
24. clasifica uno por uno los componentes monetarios disponibles y ausentes del flujo `makos_excel`;
25. documenta que el parser actual puede producir ceros técnicos para campos ausentes sin elevarlos a verdad de fuente;
26. clasifica la fundación Wompi como implementación existente que no define el binding Makos;
27. define evidencia mínima requerida del futuro binding de Makos;
28. asigna cada bloqueo a una tarea exacta con condición de salida;
29. genera cero cambios `TREQ-*` por existir cobertura canónica suficiente;
30. no crea una copia del registro 04A;
31. no modifica código, DDL, DML, migraciones, Supabase, datos, credenciales, pagos, endpoints o configuración remota;
32. mantiene `INT-POS-008` como única siguiente tarea reservada.

---

#### 24. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-006 — Definir importación de encabezados, líneas, estados y timestamps`

TAREA ACTUAL APROBADA

`INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`

SIGUIENTE TAREA RESERVADA

`INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`


### ✅ INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`
**Tarea siguiente:** `INT-POS-009 — Definir conservación de payload original, versión, hash y fecha de recepción`
**Tipo de tarea:** documental; definición normativa de la importación y normalización de anulaciones, devoluciones y reembolsos vinculados a ventas, líneas y pagos de origen, preservando identidad, procedencia, temporalidad, alcance, cantidades, importes, moneda y relación con el hecho original sin borrado destructivo, sin convertir estados comerciales o de pago en reversos por inferencia, sin ejecutar compensaciones internas, modificar código, crear migraciones, modificar Supabase ni producir efectos en NEXO, NUMERA o PASS
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**POS externo vigente:** `Makos`
**POS integral objetivo:** `PULSO`
**Línea base documental:** `vento-shell@eda6beb97db95f3c123e7f811b9158450c1e3848`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo deberá importarse una afirmación externa que represente una anulación, devolución o reembolso relacionado con una venta originada en Makos durante la transición y, posteriormente, con una venta originada en PULSO cuando corresponda, sin destruir ni reinterpretar el hecho original.

La tarea fija la semántica común que deberá conservar el adaptador antes de cualquier compensación interna.

Regla raíz:

```text
HECHO ORIGINAL DE VENTA / LÍNEA / PAGO
        +
AFIRMACIÓN POSTERIOR DE LA FUENTE
        ↓
IDENTIDAD + TIPO SEMÁNTICO + OBJETO AFECTADO
+ CANTIDAD / IMPORTE + MOMENTO + PROCEDENCIA
        ↓
HECHO DE REVERSO NORMALIZADO Y CORRELACIONADO
        ↓
CERO BORRADO DEL ORIGINAL
        ↓
COMPENSACIÓN INTERNA POSTERIOR SOLO EN SU TAREA PROPIETARIA
```

Una señal negativa, una etiqueta parecida, un estado técnico o una diferencia agregada no bastan para fabricar un reverso canónico.

---

#### 2. Base canónica preservada

`INT-POS-008` consume sin reabrir las siguientes decisiones aprobadas:

1. Makos es la fuente temporal de las ventas originadas dentro de su alcance mientras no ocurra el corte correspondiente.
2. PULSO será la fuente de las nuevas ventas posteriores al corte aprobado.
3. Makos y PULSO deberán converger en el mismo contrato canónico de venta y línea.
4. Una venta y cada una de sus líneas conservan identidad estable a través de revisiones y recepciones posteriores.
5. Una corrección, anulación, devolución o reembolso no borra la venta, línea, pago, documento o payload que existieron previamente.
6. Venta, pago, caja, documento fiscal, inventario, fidelización y hecho económico permanecen separados.
7. El estado comercial `CANCELLED` de una venta no demuestra por sí solo anulación fiscal, devolución de producto, reembolso de dinero ni compensación interna.
8. El estado `CANCELLED` de una línea no ejecuta devolución, reembolso ni compensación.
9. El estado `CANCELLED` de un intento de pago no equivale a reembolso.
10. Un timeout o resultado desconocido de pago no equivale a fallo ni a reverso.
11. Cantidades o importes negativos no sustituyen silenciosamente la semántica de una devolución, anulación o reembolso.
12. `INT-POS-007` conserva descuentos, impuestos, propinas y pagos sin absorber los reversos.
13. El documento fiscal permanece bajo autoridad del POS o proveedor fiscal autorizado mientras corresponda.
14. La aplicación de compensaciones en dominios internos pertenece a `INT-POS-019`.
15. La conciliación entre venta, reversos y efectos pertenece a `INT-POS-020`.
16. La API de Makos está confirmada como habilitable bajo solicitud, pero su especificación técnica, credenciales y campos efectivos para Vento permanecen no provisionados.

Esta tarea no presupone endpoints, nombres de propiedades, códigos, catálogos de causas, identificadores, estados ni garantías de Makos que no estén demostrados.

---

#### 3. Separaciones semánticas obligatorias

La frontera de importación preservará las siguientes desigualdades:

```text
ESTADO DE VENTA CANCELLED ≠ ANULACIÓN
ESTADO DE LÍNEA CANCELLED ≠ DEVOLUCIÓN
ESTADO DE PAGO CANCELLED ≠ REEMBOLSO
ANULACIÓN ≠ DEVOLUCIÓN
ANULACIÓN ≠ REEMBOLSO
DEVOLUCIÓN ≠ REEMBOLSO
DEVOLUCIÓN ≠ DESCUENTO
REEMBOLSO ≠ DESCUENTO
REEMBOLSO ≠ PAGO FALLIDO
REEMBOLSO ≠ COMPENSACIÓN DE INVENTARIO
REEMBOLSO ≠ COMPENSACIÓN ECONÓMICA INTERNA
ANULACIÓN FISCAL ≠ CANCELACIÓN COMERCIAL POR INFERENCIA
```

Que dos hechos compartan venta, importe, timestamp o referencia no los vuelve equivalentes.

---

#### 4. Tipos semánticos normalizados de reverso

Cuando exista evidencia suficiente, la importación podrá clasificar una afirmación externa mediante uno de estos tipos semánticos:

| Tipo semántico | Significado                                                                                                              | Límite obligatorio                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `VOID`         | la fuente acredita la anulación o invalidación de una operación previamente existente y permite identificar qué se anuló | no significa devolución física, reembolso monetario, anulación fiscal ni compensación interna salvo afirmación expresa de la fuente |
| `RETURN`       | la fuente acredita una devolución de mercancía, cantidad o valor comercial contra una venta o línea original             | no significa que el dinero ya haya sido reembolsado ni que el inventario interno ya haya sido compensado                            |
| `REFUND`       | la fuente acredita devolución monetaria contra un pago, una venta o una referencia financiera original                   | no significa devolución física, cancelación comercial, anulación fiscal ni conciliación bancaria final                              |

El estado comercial `CANCELLED` definido en `INT-POS-006` permanece fuera de esta tabla: describe lifecycle comercial y no constituye por sí mismo un hecho `VOID`, `RETURN` o `REFUND`.

Una palabra externa como `void`, `reversed`, `return`, `refund`, `cancelled` o equivalente solo podrá mapearse cuando su significado para el objeto y recurso concretos esté acreditado.

---

#### 5. Resultado de interpretación del reverso

Toda señal de reverso deberá clasificarse mediante:

| Resultado      | Significado                                                                                                   | Tratamiento                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `MAPPED`       | existe evidencia suficiente para afirmar que la señal corresponde a `VOID`, `RETURN` o `REFUND`               | se materializa el tipo semántico conservando la afirmación original y sus referencias                                     |
| `NOT_PROVIDED` | el binding acreditado no entrega ese tipo de información para el recurso                                      | se conserva la ausencia; no se fabrica reverso                                                                            |
| `UNRESOLVED`   | existe una señal, estado, importe, cantidad o etiqueta, pero no hay equivalencia suficiente para clasificarla | se conserva la señal original y se bloquean decisiones o efectos que dependan de conocer la naturaleza exacta del reverso |

La ausencia de información no se interpreta como ausencia de reversos históricos fuera del alcance realmente demostrado por la fuente.

---

#### 6. Contrato semántico mínimo de un reverso importado

Todo reverso individual normalizado deberá poder conservar, según aplicabilidad y disponibilidad acreditada:

| Dimensión lógica                          | Obligatoriedad                                                                                       | Regla                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| sistema de origen                         | requerida                                                                                            | conserva el sistema que afirmó el reverso; el adaptador no se vuelve fuente empresarial                                              |
| instancia o contexto de origen            | requerida cuando sea necesaria para evitar colisiones                                                | conserva tenant, empresa o ambiente real cuando exista                                                                               |
| identidad externa del reverso             | requerida cuando la fuente la entregue                                                               | se conserva sin sustituirla por la identidad de la venta; la ausencia fuerte se resuelve posteriormente en `INT-POS-013`             |
| tipo semántico                            | requerido para un reverso normalizado                                                                | solo `VOID`, `RETURN` o `REFUND` después de mapping acreditado                                                                       |
| tipo de objeto afectado                   | requerido antes de efectos                                                                           | identifica si la fuente afecta venta, línea, pago u otra referencia explícita; no se infiere por el nombre del endpoint              |
| venta original relacionada                | requerida antes de cualquier efecto sobre la transición POS                                          | debe vincular el reverso con la venta original; si no puede resolverse, se conserva el reverso sin efecto                            |
| línea original relacionada                | requerida cuando el reverso sea de línea o cantidad                                                  | no se sustituye por producto, posición de archivo o coincidencia de importe                                                          |
| pago original relacionado                 | requerida cuando el reembolso se refiera a un pago identificable                                     | un reembolso no crea un pago original ficticio                                                                                       |
| referencia fiscal relacionada             | condicional                                                                                          | se conserva cuando la fuente la entregue, sin transferir autoridad fiscal a Vento                                                    |
| revisión o versión de fuente              | condicional                                                                                          | permite ordenar afirmaciones cuando el proveedor la entregue                                                                         |
| alcance parcial o total                   | condicional                                                                                          | solo se materializa cuando la fuente lo declare o exista equivalencia contractual; no se deduce comparando totales                   |
| cantidad                                  | requerida para una devolución cuantitativa cuando la fuente la entregue                              | conserva magnitud y signo de origen; no se fuerza para cuadrar                                                                       |
| unidad                                    | requerida cuando la cantidad no sea autosuficiente                                                   | debe hacer interpretable la devolución                                                                                               |
| importe                                   | requerido para un reembolso cuantificable cuando la fuente lo entregue                               | conserva magnitud y signo informados; no se deriva automáticamente del total de venta                                                |
| moneda                                    | requerida antes de conciliación o efecto financiero cuando no exista garantía inequívoca del binding | no se hereda desde defaults de Wompi, interfaz o configuración no acreditada                                                         |
| código, causa o etiqueta de fuente        | condicional                                                                                          | se conserva como evidencia; no se convierte automáticamente en taxonomía interna                                                     |
| estado del reverso en la fuente           | condicional                                                                                          | se conserva en bruto; un estado normalizado adicional requerirá equivalencia demostrable                                             |
| momento del reverso                       | requerido antes de efectos que dependan de temporalidad                                              | debe representar el momento empresarial del reverso según semántica acreditada; no se sustituye por recepción o persistencia técnica |
| timestamps técnicos o de actualización    | condicional                                                                                          | permanecen separados del momento empresarial                                                                                         |
| referencia de procedencia                 | requerida                                                                                            | enlaza la afirmación original cuya conservación física corresponde a `INT-POS-009`                                                   |
| correlación con recepción y procesamiento | requerida para trazabilidad                                                                          | no sustituye identidades empresariales                                                                                               |

Un reverso que no pueda vincularse de forma suficiente con su hecho original no será presentado como compensación ejecutable.

---

#### 7. Importación de anulaciones `VOID`

`VOID` representa una anulación explícita de una operación previamente existente.

Reglas:

1. la anulación deberá identificar el objeto afectado con semántica demostrable;
2. una anulación de venta no se inferirá desde un pago rechazado o cancelado;
3. una anulación de pago no se inferirá desde una venta `CANCELLED`;
4. una anulación fiscal solo se conservará como tal cuando el proveedor fiscal o POS autorizado la exponga con esa semántica;
5. la anulación no borra la venta, línea, pago ni documento original;
6. una anulación conserva vínculo al hecho original y a la afirmación de fuente que la produjo;
7. si la fuente distingue anulación total y parcial, se conserva esa distinción; si no la distingue, no se inventa;
8. si un término externo puede significar rechazo, expiración, cancelación de intento, reversión financiera o anulación comercial, quedará `UNRESOLVED` hasta acreditar el significado;
9. una anulación importada no ejecuta por sí misma inventario, fidelización, contabilidad, caja ni documento fiscal interno;
10. la aplicación de compensaciones posteriores corresponde a `INT-POS-019`.

---

#### 8. Importación de devoluciones `RETURN`

`RETURN` representa una devolución material o comercial contra una venta o línea original cuando la fuente permite afirmar esa semántica.

Reglas:

1. la devolución deberá conservar la venta original relacionada;
2. cuando afecte productos o líneas concretas, deberá conservar las referencias de línea disponibles y la cantidad/unidad realmente informadas;
3. una devolución parcial no convierte la línea original en una nueva línea neta ni reduce destructivamente su cantidad histórica;
4. una devolución total tampoco elimina la línea original;
5. producto, presentación o receta Vento no se infieren desde la devolución; el mapping aplicable permanece en `INT-POS-011`;
6. una línea devuelta sin mapping suficiente puede conservarse como evidencia, pero no producirá una compensación física automática;
7. una cantidad negativa no se clasifica automáticamente como devolución;
8. un `return_amount` monetario no demuestra por sí solo devolución física ni cantidad devuelta;
9. devolución y reembolso pueden coexistir, pero una no prueba la otra;
10. cualquier efecto de inventario inverso deberá ser definido y aplicado posteriormente por la tarea propietaria correspondiente, sin duplicación.

---

#### 9. Importación de reembolsos `REFUND`

`REFUND` representa una devolución monetaria acreditada por la fuente.

Reglas:

1. el reembolso deberá conservar su relación con la venta y, cuando la fuente lo permita, con el pago original;
2. un reembolso parcial conserva su importe propio y no convierte el pago original en otro importe histórico;
3. un reembolso total no borra el pago confirmado original;
4. varios reembolsos legítimos sobre una misma venta o pago se conservan como hechos distintos cuando la fuente los individualice;
5. si la fuente solo expone un importe agregado de reembolsos, se conserva como agregado y no se fabrican hechos individuales;
6. `CANCELLED` de pago no equivale a `REFUND`;
7. `FAILED` de pago no equivale a `REFUND`;
8. una etiqueta `reversed` solo se normaliza a `REFUND` cuando la fuente demuestre retorno monetario equivalente; en caso contrario queda `UNRESOLVED`;
9. importe y moneda se conservan según la fuente y no se sustituyen por el total de venta;
10. un reembolso no acredita por sí solo devolución física, anulación fiscal, cierre de caja ni conciliación bancaria;
11. cualquier efecto económico posterior deberá producirse mediante el contrato propietario y exactamente una vez.

---

#### 10. Parcialidad y cardinalidad

La estructura deberá admitir, sin consolidación ficticia:

```text
UNA VENTA ORIGINAL
        ↓
0..N ANULACIONES / DEVOLUCIONES / REEMBOLSOS DE FUENTE
        ↓
CADA HECHO CONSERVA IDENTIDAD, TIPO, OBJETO, ALCANCE Y PROCEDENCIA
```

Reglas:

1. una venta puede recibir más de un reverso legítimo a lo largo de su historia;
2. dos reversos con igual importe no se consideran automáticamente duplicados;
3. un mismo reverso recibido varias veces no deberá producir más de un efecto cuando la idempotencia sea materializada por `INT-POS-013`;
4. parcial o total no se deduce únicamente comparando el importe del reverso contra el total de la venta;
5. parcial o total no se deduce únicamente comparando cantidad devuelta contra cantidad original cuando existan revisiones o unidades no resueltas;
6. la suma de devoluciones o reembolsos no modifica retroactivamente los snapshots originales;
7. un exceso aparente sobre cantidad o importe original se conserva como inconsistencia para `INT-POS-020`, no se recorta silenciosamente;
8. los reversos de monedas distintas no se agregan sin conversión autorizada.

---

#### 11. Relación con estado comercial de venta y línea

La importación podrá conservar simultáneamente:

- estado comercial de venta de `INT-POS-006`;
- estado de línea de `INT-POS-006`;
- hechos `VOID`, `RETURN` y `REFUND` de esta tarea.

No existe transición automática universal entre ellos.

Por tanto:

```text
SALE = CANCELLED
NO IMPLICA
VOID + RETURN + REFUND
```

```text
LINE = CANCELLED
NO IMPLICA
RETURN
```

Un proveedor puede representar una cancelación comercial y un reembolso como eventos separados, como una revisión de recurso, como registros diferentes o mediante otra estructura. El adaptador deberá respetar la semántica acreditada del binding en vez de imponer un patrón ficticio.

---

#### 12. Relación con pagos

Los hechos de pago definidos en `INT-POS-007` y los reembolsos definidos aquí permanecen separados.

1. un pago original conserva identidad, importe, moneda, proveedor, referencia y estado;
2. un reembolso conserva su propia identidad cuando la fuente la entregue y referencia el pago original cuando exista esa relación;
3. un pago no cambia de identidad porque exista un reembolso;
4. un estado físico `refunded` puede conservarse como señal de fuente, pero no sustituye la identidad ni los datos del hecho de reembolso cuando el proveedor los exponga por separado;
5. si el proveedor únicamente ofrece estado acumulado y no un recurso o evento individual de reembolso, esa limitación se conserva y el adaptador no inventa identidad ni timestamps individuales;
6. una respuesta perdida o repetida no autoriza un segundo reembolso ni una segunda compensación.

---

#### 13. Relación con documento fiscal

El documento fiscal conserva autoridad externa durante la transición.

Reglas:

1. una venta `CANCELLED` no demuestra anulación fiscal;
2. un `VOID` comercial no se eleva a anulación fiscal salvo evidencia expresa del proveedor autorizado;
3. una devolución o reembolso no demuestra por sí solo nota, anulación, ajuste o documento fiscal específico;
4. si Makos o el proveedor fiscal expone una referencia de documento de ajuste, se conserva como referencia de fuente;
5. Vento no genera numeración, documento fiscal ni estado fiscal inventado durante esta importación;
6. cualquier divergencia entre reverso comercial, monetario y fiscal permanece visible para conciliación en `INT-POS-020`.

---

#### 14. Temporalidad, versiones y eventos fuera de orden

Cada reverso conservará el momento empresarial acreditado de la fuente cuando pueda resolverse.

Reglas:

1. el momento de recepción no sustituye el momento del reverso;
2. el momento de importación no sustituye el momento del reverso;
3. una revisión tardía no sobrescribe una revisión posterior ya reconocida;
4. una anulación, devolución o reembolso recibido tarde conserva su momento histórico;
5. replay o backfill no convierte el momento del reproceso en momento empresarial;
6. una señal fuera de orden o incompatible se difiere, rechaza o lleva a conciliación según los contratos transversales; no se aplica silenciosamente;
7. cuando el proveedor entregue versión o secuencia, se conserva separada de los timestamps;
8. el orden cronológico de timestamps no sustituye una causalidad o versión explícita cuando exista;
9. la procedencia física de payload, versión, hash y `received_at` pertenece a `INT-POS-009`.

---

#### 15. Importes, cantidades y signos

1. signo y magnitud de fuente se conservan;
2. un importe negativo no se vuelve positivo automáticamente;
3. un importe positivo en una columna llamada devolución no demuestra por sí solo un `RETURN` o `REFUND` individual;
4. una cantidad negativa no demuestra devolución sin semántica acreditada;
5. un cero técnico no demuestra ausencia de devolución o reembolso;
6. ausencia de campo no se convierte en cero confirmado;
7. un reembolso conserva moneda propia; no hereda moneda desde una tabla interna o integración distinta;
8. una devolución cuantitativa conserva unidad cuando sea necesaria para interpretar la cantidad;
9. redondeos o ajustes no se aplican para hacer coincidir reverso y venta;
10. cualquier diferencia de importe, moneda, cantidad o alcance se conserva para `INT-POS-020`.

---

#### 16. Tratamiento del flujo `makos_excel` existente

La implementación vigente reconoce una columna `DEVOLUCIONES` y persiste `return_amount` tanto en filas como en lotes agregados.

La evidencia física actual permite clasificar:

| Elemento actual                                     | Clasificación para `INT-POS-008` | Consecuencia                                                                                       |
| --------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| columna `DEVOLUCIONES`                              | señal agregada disponible        | demuestra un valor agregado exportable, no un reverso individual                                   |
| `return_amount` por fila agregada                   | agregado monetario por ítem/día  | no identifica venta original, línea original, pago, causa, timestamp ni hecho individual           |
| `return_amount` por lote                            | agregado diario                  | sirve como dato de conciliación, no como identidad de devolución o reembolso                       |
| default técnico `0` cuando no existe la columna     | valor producido por parser       | no demuestra que Makos haya informado cero devoluciones                                            |
| restricción `return_amount >= 0`                    | regla física legacy              | no define signo, identidad ni semántica del contrato futuro                                        |
| `net_sales_amount = subtotal - discounts - returns` | cálculo legacy agregado          | no demuestra que `return_amount` sea devolución física, reembolso monetario o anulación individual |
| identidad individual del reverso                    | no observada                     | no permite crear un `VOID`, `RETURN` o `REFUND` individual                                         |
| vínculo a venta o pago original                     | no observado                     | bloquea efectos individuales                                                                       |
| timestamp empresarial del reverso                   | no observado                     | no puede fabricarse desde `sales_date`, `imported_at` o timestamps internos                        |

Por tanto:

```text
RETURN_AMOUNT AGREGADO
≠
RETURN INDIVIDUAL
```

```text
RETURN_AMOUNT AGREGADO
≠
REFUND INDIVIDUAL
```

El valor agregado puede conservarse para conciliación histórica, pero no habilita por sí solo compensaciones de inventario, fidelización o economía.

---

#### 17. Tratamiento de la fundación Wompi existente

La línea base técnica de pagos contiene un estado físico `refunded` y el webhook vigente mapea señales de proveedor `refunded` y `reversed` al mismo estado técnico `refunded`. La función vigente de actualización de pago también sincroniza ese estado con `payment_status = refunded` y, salvo estados ya preservados, con cancelación de la orden.

Estas decisiones físicas se clasifican como implementación legacy existente y no como semántica universal de esta tarea.

Reglas:

1. `refunded` de Wompi no define el vocabulario de Makos;
2. `reversed` no se tratará universalmente como `REFUND` sin acreditar que hubo devolución monetaria;
3. el acoplamiento actual entre reembolso de pago y cancelación de orden no se convierte en regla del contrato canónico;
4. una futura reutilización técnica deberá respetar las separaciones aprobadas entre venta, pedido, pago, anulación, devolución y reembolso;
5. esta tarea no modifica la fundación Wompi ni sus migraciones, funciones o webhook.

---

#### 18. Evidencia requerida del binding futuro de Makos

Antes de que una integración transaccional utilice reversos de Makos, deberá existir evidencia suficiente para resolver:

| Área                       | Evidencia requerida                                                                | Resultado permitido                                   |
| -------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| disponibilidad de reversos | recursos, campos o garantías que los representen                                   | `MAPPED`, `NOT_PROVIDED` o `UNRESOLVED`               |
| identidad del reverso      | identificador estable cuando exista                                                | referencia externa conservada                         |
| tipo de reverso            | semántica que distinga anulación, devolución y reembolso                           | `VOID`, `RETURN` o `REFUND`                           |
| objeto afectado            | referencia explícita a venta, línea, pago o documento cuando corresponda           | target resoluble sin inferencia                       |
| venta original             | identidad o relación demostrable                                                   | correlación con venta canónica                        |
| línea original             | identidad o relación cuando la devolución sea de línea                             | devolución individualizable                           |
| pago original              | referencia cuando el reembolso se aplique a un pago                                | correlación financiera                                |
| parcialidad                | campo, relación o garantía que distinga parcial y total                            | alcance preservado cuando exista                      |
| cantidades y unidades      | valores y semántica                                                                | devolución cuantitativa reproducible                  |
| importes y moneda          | valores y semántica                                                                | reembolso cuantificable sin defaults inventados       |
| causa o código             | catálogo o significado cuando exista                                               | preservación de fuente; mapping solo con equivalencia |
| estado                     | significado del lifecycle del reverso cuando exista                                | conservación o mapping seguro                         |
| timestamps                 | semántica de creación, ocurrencia, actualización o confirmación                    | momento empresarial resoluble                         |
| versiones o secuencias     | mecanismo cuando exista                                                            | orden y no regresión de historia                      |
| relación fiscal            | referencias de documento o ajuste cuando el proveedor las exponga                  | trazabilidad sin apropiación de autoridad fiscal      |
| granularidad histórica     | ventana y capacidad real de consultar reversos individuales o únicamente agregados | tratamiento acorde a evidencia                        |

No se registran nombres de endpoints, propiedades JSON ni códigos específicos mientras la especificación del tenant Vento no esté provisionada.

---

#### 19. Puertas de elegibilidad y destinos exactos

Una afirmación de reverso podrá conservarse como evidencia aun cuando no sea elegible para efectos. Los bloqueos se resuelven así:

| Condición                                                          | Tratamiento                                          | Tarea propietaria de salida                                             |
| ------------------------------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| no existe identidad estable del reverso cuando sea necesaria       | no generar una identidad nueva por cada intento      | `INT-POS-013`                                                           |
| no puede correlacionarse con la venta original                     | conservar sin compensar                              | `INT-POS-013`; conciliación en `INT-POS-020`                            |
| no puede correlacionarse con línea requerida                       | conservar sin efecto dependiente de producto         | `INT-POS-011`; `INT-POS-012`; conciliación en `INT-POS-020`             |
| tipo `VOID` / `RETURN` / `REFUND` no puede resolverse              | conservar como `UNRESOLVED`                          | `INT-POS-021` deberá demostrar suficiencia antes del piloto con efectos |
| parcialidad no puede demostrarse                                   | no inferir total o parcial                           | `INT-POS-021`; conciliación en `INT-POS-020`                            |
| cantidad o unidad requerida no es interpretable                    | bloquear efecto físico                               | `INT-POS-011`; `INT-POS-021`                                            |
| importe o moneda de reembolso no son resolubles                    | bloquear efecto financiero                           | `INT-POS-021`; conciliación en `INT-POS-020`                            |
| estado o timestamp crítico del reverso es ambiguo                  | conservar señal sin aplicar transición               | `INT-POS-021`; conciliación en `INT-POS-020`                            |
| falta procedencia completa, versión, hash o recepción              | no presentar la transformación como reproducible     | `INT-POS-009`                                                           |
| el mismo reverso puede recibirse más de una vez                    | no producir efectos hasta materializar deduplicación | `INT-POS-013`                                                           |
| se requiere transporte incremental o recuperación                  | no asumir webhook, polling ni frecuencia             | `INT-POS-014`                                                           |
| corresponde aplicar compensación interna por efectos ya producidos | no ejecutarla desde el adaptador                     | `INT-POS-019`                                                           |
| existe divergencia entre venta, reverso y efectos                  | no corregir historia                                 | `INT-POS-020`                                                           |
| binding Makos sigue sin evidencia suficiente                       | conservar la puerta sin efectos                      | `INT-POS-021`                                                           |
| se pretende habilitar efectos reales                               | exigir resolución previa de las puertas críticas     | `INT-POS-022`                                                           |

`INT-POS-022` no podrá habilitar efectos sobre un reverso cuyo tipo, correlación, cantidad, importe, moneda o procedencia críticos permanezcan no resueltos.

---

#### 20. Fronteras con efectos internos

`INT-POS-008` normaliza hechos externos; no ejecuta compensaciones.

| Dominio o responsabilidad | Tratamiento posterior                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| NEXO                      | cualquier movimiento físico compensatorio deberá conservar relación con el hecho original y aplicarse exactamente una vez |
| NUMERA                    | cualquier reverso económico deberá conservar origen y correlación, sin borrar el hecho económico original                 |
| PASS                      | cualquier reverso de fidelización deberá conservar la venta y el movimiento original, sin recalcular historia por borrado |
| proveedor fiscal          | mantiene autoridad sobre documentos y ajustes fiscales mientras corresponda                                               |
| PULSO                     | cuando sea POS fuente, deberá producir la misma semántica de reversos sin acoplarla a estados genéricos                   |

La definición concreta de las compensaciones internas corresponde a `INT-POS-019`; la conciliación de su resultado corresponde a `INT-POS-020`.

---

#### 21. Fronteras con tareas posteriores

- `INT-POS-009` conservará físicamente payload original, versión, hash y momento de recepción de cada afirmación externa.
- `INT-POS-010` resolverá empresa, sede, terminal y caja cuando sean necesarias para contextualizar el reverso.
- `INT-POS-011` resolverá producto, presentación y receta para líneas devueltas sin alterar el hecho original.
- `INT-POS-012` mantendrá en cuarentena líneas no mapeadas e impedirá efectos de inventario.
- `INT-POS-013` definirá identidad e idempotencia por sistema, venta, línea y recepción externa suficiente para impedir reversos repetidos.
- `INT-POS-014` definirá webhook y polling sin alterar la semántica de reverso.
- `INT-POS-015` emitirá la venta validada bajo sus propias puertas; esta tarea no convierte un reverso en una nueva venta.
- `INT-POS-016` a `INT-POS-018` aplicarán únicamente los efectos directos de ventas elegibles en sus dominios propietarios.
- `INT-POS-019` definirá las compensaciones derivadas de anulaciones y devoluciones sin borrar historia.
- `INT-POS-020` conciliará venta, reversos y efectos internos, incluyendo agregados históricos.
- `INT-POS-021` comprobará con el binding real si las señales de Makos permiten distinguir y correlacionar reversos sin efectos.
- `INT-POS-022` solo podrá habilitar efectos cuando las puertas críticas estén demostradas.
- `INT-POS-023` trasladará la fuente futura hacia PULSO preservando el mismo contrato semántico.

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 22. Decisiones congeladas

1. `VOID`, `RETURN` y `REFUND` son hechos semánticos distintos.
2. El estado comercial `CANCELLED` de venta o línea no constituye por sí mismo un reverso de esta tarea.
3. El estado de pago `CANCELLED` no constituye un reembolso.
4. Una anulación identifica qué operación fue anulada; no se interpreta por similitud de etiqueta.
5. Una devolución conserva venta y línea originales cuando sean identificables.
6. Un reembolso conserva venta y pago originales cuando la fuente permita esa correlación.
7. El original nunca se elimina ni se sobrescribe para simular que el hecho no ocurrió.
8. Parcialidad y totalidad no se infieren únicamente desde igualdad de importes o cantidades.
9. Un reverso puede llegar después del hecho original y conserva su momento histórico.
10. Una versión tardía no sobrescribe una revisión posterior.
11. Un reintento o segunda recepción no autoriza un segundo efecto.
12. Una cantidad o importe negativo no reemplaza la clasificación semántica del reverso.
13. Un `return_amount` agregado no es una devolución individual ni un reembolso individual.
14. El flujo `makos_excel` actual solo aporta un agregado de devoluciones por ítem/día y no demuestra identidad, correlación ni timestamps individuales de reverso.
15. El default técnico cero del parser no demuestra que Makos haya informado cero devoluciones.
16. La fundación Wompi actual es evidencia de implementación legacy y no define el contrato Makos ni el POS objetivo.
17. La señal Wompi `reversed` no se eleva universalmente a `REFUND`.
18. El acoplamiento físico actual entre `refunded` y cancelación de orden no se convierte en regla canónica.
19. El documento fiscal conserva autoridad externa y ningún reverso comercial inventa una anulación fiscal.
20. La importación de un reverso no ejecuta compensación en inventario, economía, fidelización, caja o fiscalidad.
21. Las compensaciones internas pertenecen a `INT-POS-019` y deben conservar vínculo con el original.
22. Las diferencias y excesos aparentes permanecen conciliables en `INT-POS-020`.
23. La especificación técnica de Makos sigue no provisionada; no se inventan sus campos ni catálogos.
24. Esta tarea no modifica código, DDL, DML, migraciones, Supabase, datos, pagos, inventario, puntos, documentos fiscales, endpoints, credenciales ni configuración remota.
25. `INT-POS-009` permanece exclusivamente reservada.

---

#### 23. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-008` materializa para la transición Makos → PULSO comportamientos que ya están protegidos de forma explícita por la cobertura canónica vigente: separación entre cancelación, anulación, devolución, reembolso y compensación; preservación del hecho original; correlación de reversos con su origen; efectos exactamente una vez; tratamiento de eventos repetidos, tardíos o incompatibles; prohibición de mapear representaciones legacy sin equivalencia demostrable; conservación de procedencia externa; correcciones append-only; y compensaciones financieras sin borrado destructivo. La tarea no introduce una capacidad ejecutable nueva ni una excepción fuera de esas reglas ya protegidas. El registro canónico de requisitos permanece sin cambios.

#### 24. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-PULSO-005`, que exige conservar versiones originales y efectos emitidos frente a modificación o cancelación y mantener estados empresariales separados;
- `TREQ-PULSO-006`, cobertura primaria de anulación, devolución, reembolso y compensación como semánticas separadas, autorizadas, auditables y no destructivas;
- `TREQ-INTEGRATION-011`, que exige compensaciones físicas correlacionadas con el evento original y exactamente una vez;
- `TREQ-INTEGRATION-014`, que exige que venta, anulación o devolución produzcan exactamente una vez los efectos aplicables durante la transición POS externo ↔ PULSO;
- `TREQ-INTEGRATION-017`, que protege reversos económicos versionados, correlacionados e idempotentes hacia NUMERA;
- `TREQ-INTEGRATION-043`, que impide que una versión tardía sobrescriba una posterior;
- `TREQ-INTEGRATION-044`, que obliga a diferir, rechazar o conciliar explícitamente eventos fuera de orden, desconocidos o incompatibles;
- `TREQ-INTEGRATION-045`, que evita efectos sensibles accidentales durante replay o backfill y conserva el momento histórico;
- `TREQ-INTEGRATION-046`, que exige equivalencia demostrable antes de mapear una representación legacy;
- `TREQ-INTEGRATION-048`, que exige que cancelaciones, anulaciones, reversos y compensaciones referencien autoridad, razón, hecho original y efecto sin funcionar como borrado genérico;
- `TREQ-INTEGRATION-049`, que protege afirmación externa, autenticidad, identificador, payload, recepción y correlación antes de producir un hecho interno;
- `TREQ-INTEGRATION-217`, que exige historia append-only y correcciones mediante nuevas entradas vinculadas;
- `TREQ-INTEGRATION-222`, que separa momento del hecho, registro y terminación sin reescritura por captura tardía;
- `TREQ-NUMERA-001`, que exige reconciliación financiera contra hechos y documentos fuente conservando historia;
- `TREQ-NUMERA-002`, que exige que correcciones y reversos económicos conserven el original y utilicen acciones compensatorias.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 25. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `INT-POS-005`, `INT-POS-006` e `INT-POS-007` sin reabrir identidad, estado comercial, temporalidad ni contrato monetario;
2. define `VOID`, `RETURN` y `REFUND` como hechos diferenciados;
3. mantiene `CANCELLED` de venta y línea separado de esos reversos;
4. mantiene `CANCELLED` de pago separado de `REFUND`;
5. define `MAPPED`, `NOT_PROVIDED` y `UNRESOLVED` para interpretar señales externas;
6. define el contenido semántico mínimo de un reverso individual;
7. exige correlación con la venta original antes de efectos;
8. exige relación con línea cuando la devolución sea de línea;
9. exige relación con pago cuando el reembolso disponga de esa referencia;
10. conserva el objeto exacto afectado por una anulación y prohíbe inferirlo;
11. conserva cantidades y unidades de devolución sin modificar la línea original;
12. conserva importe y moneda de reembolso sin modificar el pago original;
13. admite reversos parciales, totales y múltiples sin consolidación ficticia;
14. prohíbe deducir parcialidad únicamente por igualdad de cantidades o importes;
15. conserva una inconsistencia por exceso en lugar de recortarla;
16. impide usar importes o cantidades negativas como sustituto de semántica;
17. separa reversos comerciales, físicos, monetarios y fiscales;
18. preserva autoridad fiscal externa;
19. conserva momento empresarial, revisiones y eventos tardíos sin reescribir historia;
20. clasifica el `return_amount` del flujo `makos_excel` como agregado no individualizable;
21. documenta que el Excel actual no contiene identidad, correlación ni timestamp individual suficiente para ejecutar reversos;
22. documenta que el parser puede producir ceros técnicos que no prueban ausencia de devoluciones;
23. clasifica la semántica Wompi vigente como implementación legacy no normativa para Makos ni para el POS objetivo;
24. impide elevar `reversed` a reembolso sin equivalencia monetaria demostrable;
25. define la evidencia mínima requerida del futuro binding de Makos;
26. asigna cada bloqueo material a una tarea exacta con condición de salida;
27. reserva toda compensación interna para `INT-POS-019`;
28. reserva conciliación de diferencias para `INT-POS-020`;
29. genera cero cambios `TREQ-*` por existir cobertura canónica específica;
30. no crea una copia del registro canónico de requisitos de prueba;
31. no modifica código, DDL, DML, migraciones, Supabase, datos, credenciales, endpoints, webhooks, pagos, inventario, fidelización ni documentos fiscales;
32. mantiene `INT-POS-009` como única siguiente tarea reservada.

---

#### 26. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-007 — Definir importación de descuentos, impuestos, propinas y medios de pago`

TAREA ACTUAL APROBADA

`INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`

SIGUIENTE TAREA RESERVADA

`INT-POS-009 — Definir conservación de payload original, versión, hash y fecha de recepción`


### ✅ INT-POS-009 — Definir conservación de payload original, versión, hash y fecha de recepción

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`
**Tarea siguiente:** `INT-POS-010 — Definir mapeo de empresa, sede, terminal y caja externa`
**Tipo de tarea:** documental; definición normativa del contrato de procedencia para conservar la representación externa recibida, sus versiones acreditadas, la huella de integridad y el instante técnico de recepción antes de transformar ventas, líneas, pagos o reversos al contrato canónico, sin inventar campos de Makos, implementar almacenamiento, definir transporte, resolver idempotencia completa, modificar código, crear migraciones, modificar Supabase ni producir efectos internos
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**POS externo vigente:** `Makos`
**POS integral objetivo:** `PULSO`
**Línea base documental:** `vento-shell@4aa8fcb0a027fb37dd4b1f6928e3970e0316642d`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir el contrato de procedencia que deberá permitir reconstruir qué representación externa fue recibida, en qué contexto y versión, con qué huella de integridad y en qué instante técnico ingresó a Vento antes de cualquier parsing, mapping, normalización, enriquecimiento o efecto empresarial.

La procedencia deberá permanecer separada del contrato canónico de venta y línea definido en `INT-POS-005` y de los hechos de pago y reversión definidos en `INT-POS-007` e `INT-POS-008`.

Regla raíz:

```text
REPRESENTACIÓN EXTERNA RECIBIDA
        ↓
IDENTIDAD DE RECEPCIÓN + REPRESENTACIÓN ORIGINAL PROTEGIDA
        ↓
VERSIONES ACREDITADAS + HASH + RECEIVED_AT
        ↓
PARSER / ADAPTADOR / MAPPING VERSIONADOS
        ↓
CONTRATO CANÓNICO
        ↓
EFECTOS POSTERIORES SOLO CUANDO LAS PUERTAS APLICABLES ESTÉN SATISFECHAS
```

Una transformación normalizada deberá ser trazable hasta su entrada de procedencia sin convertir la evidencia técnica en identidad empresarial de venta, línea, pago o reverso.

---

#### 2. Base canónica preservada

`INT-POS-009` consume sin reabrir las siguientes decisiones aprobadas:

1. Makos es la fuente temporal de las ventas que se originen dentro de su alcance mientras no ocurra el corte correspondiente.
2. PULSO será la fuente de las nuevas ventas posteriores al corte aprobado.
3. Makos y PULSO deberán converger en el mismo contrato canónico de venta y línea.
4. El adaptador y el transporte no son fuentes empresariales de la venta.
5. El contrato canónico de venta y línea conserva una referencia de procedencia, no una copia del material externo completo dentro del objeto normalizado.
6. Una revisión posterior no borra el material previamente recibido ni cambia retroactivamente la identidad de la venta.
7. `received_at` pertenece a la capa de procedencia y no es el momento comercial de la venta.
8. `sale_occurred_at`, fecha comercial, creación, actualización, cierre, recepción e importación son conceptos temporales diferentes.
9. Un hash de contenido no es identidad de venta ni identidad de línea.
10. Estados, importes, timestamps o identidades no se completan con valores inventados cuando la fuente no los entregue o su semántica no esté acreditada.
11. Una anulación, devolución o reembolso conserva correlación con el hecho original y no lo reemplaza destructivamente.
12. Credenciales, secretos, tokens y material de autenticación permanecen separados de permisos, payload empresarial, documentación y logs.
13. La idempotencia completa por sistema, venta y línea externa permanece reservada para `INT-POS-013`.
14. El transporte por webhook o polling permanece reservado para `INT-POS-014`.
15. La conciliación de diferencias permanece reservada para `INT-POS-020`.

---

#### 3. Definición de representación original

Para esta integración, **representación original** significa la unidad de información externa tal como Vento la recibe antes de aplicar interpretación empresarial, mapping, enriquecimiento o normalización.

La unidad de conservación dependerá del transporte acreditado:

| Forma de entrada                       | Representación que puede considerarse original                | Condición                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| archivo                                | secuencia exacta de bytes recibidos del archivo               | solo cuando esos bytes sean capturados y preservados antes del parsing                                                         |
| cuerpo HTTP o webhook                  | secuencia exacta de bytes del body                            | solo cuando se capture antes de decodificar o parsear                                                                          |
| JSON ya parseado por una capa anterior | representación estructurada recibida por esa capa             | no se declarará byte a byte equivalente al body HTTP si los bytes originales no fueron preservados                             |
| recurso consultado por API             | representación devuelta por la fuente en una lectura concreta | deberá conservar identidad de recepción, versión o revisión disponible y material suficiente para reproducir la transformación |
| agregado legacy                        | archivo, fila o representación agregada realmente recibida    | no se elevará a una venta individual ni a una granularidad que la fuente no demuestre                                          |

Reglas obligatorias:

1. la representación original se conserva antes de cualquier corrección empresarial;
2. normalizar nombres, tipos, importes, estados o timestamps no modifica la evidencia de origen;
3. una representación decodificada no se describirá como bytes originales cuando estos no se hayan preservado;
4. serializar nuevamente un objeto parseado no reconstruye necesariamente la secuencia de bytes recibida;
5. un fragmento normalizado podrá referenciar una porción reproducible del material original mediante un localizador técnico;
6. la evidencia original no se utiliza como sustituto del contrato canónico consumido por NEXO, NUMERA, PASS o PULSO;
7. el material confidencial de autenticación no forma parte del payload empresarial que esta tarea exige conservar.

---

#### 4. Sobre lógico mínimo de recepción

Toda recepción futura que pretenda alimentar el contrato canónico deberá poder conservar, cuando aplique, las siguientes dimensiones lógicas. Los nombres físicos, tablas, tipos, Storage, políticas y mecanismos concretos pertenecen a la materialización posterior.

| Dimensión lógica                                            | Obligatoriedad                                                                            | Regla                                                                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| sistema de origen                                           | requerida                                                                                 | identifica la fuente empresarial o técnica acreditada sin inferirla desde la aplicación consumidora                 |
| instancia o contexto de origen                              | requerida cuando los identificadores puedan repetirse entre tenants, empresas o ambientes | evita colisiones y atribución incorrecta                                                                            |
| tipo de entrada                                             | requerida                                                                                 | distingue archivo, respuesta API, webhook, consulta u otra modalidad acreditada                                     |
| identificador externo de mensaje, evento, recurso o archivo | condicional                                                                               | se conserva cuando la fuente entregue una identidad estable                                                         |
| identidad estable de recepción                              | requerida                                                                                 | utiliza identidad externa confiable o una identidad de recepción asignada de forma estable cuando aquella no exista |
| instante de recepción                                       | requerida                                                                                 | registra `received_at` conforme a la semántica definida en esta tarea                                               |
| referencia a representación original protegida              | requerida                                                                                 | permite recuperar la evidencia sin incrustarla en el contrato normalizado                                           |
| tipo de contenido                                           | condicional                                                                               | se conserva cuando sea material para interpretar o reproducir la entrada                                            |
| codificación                                                | condicional                                                                               | se conserva cuando afecte reproducción o cálculo de hash                                                            |
| algoritmo de hash                                           | requerida cuando se utilice huella de integridad                                          | identifica inequívocamente el algoritmo aplicado                                                                    |
| base del hash                                               | requerida cuando exista hash                                                              | declara exactamente sobre qué bytes o representación se calculó                                                     |
| digest del hash                                             | requerida cuando exista hash                                                              | conserva la huella sin convertirla en identidad empresarial                                                         |
| versión o revisión de dato en la fuente                     | condicional                                                                               | se conserva solo cuando la fuente la entregue o documente                                                           |
| versión de API, esquema o contrato del proveedor            | condicional                                                                               | se conserva solo con evidencia del proveedor                                                                        |
| versión del parser, adaptador o transformación de Vento     | requerida cuando una transformación dependa de ella                                       | permite reproducir cómo se interpretó la entrada                                                                    |
| versión de mapping                                          | requerida cuando exista mapping versionado aplicable                                      | permite conocer qué equivalencias se utilizaron                                                                     |
| versión del contrato canónico resultante                    | requerida                                                                                 | separa evolución interna de Vento de las versiones del proveedor                                                    |
| localizador de fragmento                                    | condicional                                                                               | identifica fila, elemento, ruta u otra porción reproducible de una recepción compuesta                              |
| correlación de integración                                  | requerida                                                                                 | relaciona recepción, transformación, contrato canónico y efectos sin sustituir sus identidades propias              |
| evidencia de autenticidad                                   | condicional                                                                               | conserva referencia o resultado verificable cuando el transporte proporcione firma, checksum u otro mecanismo       |

La ausencia real de una versión opcional o de un identificador externo no se completará con un valor ficticio.

---

#### 5. Taxonomía obligatoria de versiones

La integración distinguirá al menos cuatro conceptos de versión que no se fusionarán:

| Concepto                                                | Significado                                                                            | Regla                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| revisión del dato de fuente                             | revisión o versión de una venta, recurso, archivo o mensaje expresada por el proveedor | no se inventa si Makos no la entrega                                       |
| versión de API, esquema o contrato del proveedor        | versión técnica de la interfaz externa                                                 | no se deriva del parser de Vento ni de la fecha de recepción               |
| versión del parser, adaptador o transformación de Vento | versión de la lógica que interpreta la entrada                                         | pertenece a Vento y debe poder identificarse cuando determine el resultado |
| versión del contrato canónico de Vento                  | versión de la representación empresarial producida                                     | no sustituye versiones de la fuente ni del adaptador                       |

Reglas:

1. una revisión de dato y una versión de API no son equivalentes;
2. cambiar el parser de Vento no cambia retroactivamente la versión que Makos haya declarado;
3. cambiar el contrato canónico no reescribe la representación externa histórica;
4. una transformación reproducible deberá poder identificar las versiones de Vento que influyeron en su resultado;
5. una versión desconocida del proveedor permanece desconocida hasta obtener evidencia;
6. un nombre interno de parser no se elevará a versión de Makos.

En el flujo Excel vigente, `makos_sales_by_item_v1` se clasifica exclusivamente como **identificador de parser de Vento**. No demuestra versión de API, esquema, recurso ni dato de Makos.

---

#### 6. Regla canónica del hash de integridad

El hash se utilizará como huella de integridad y guardia de equivalencia o conflicto, nunca como identidad empresarial única.

Reglas obligatorias:

1. cada hash deberá declarar el algoritmo utilizado;
2. deberá declararse la base exacta sobre la cual se calculó;
3. cuando se busque integridad byte a byte de un archivo o body, el hash se calculará sobre los bytes capturados antes de transformar el contenido;
4. reserializar JSON, cambiar codificación, normalizar saltos de línea o modificar metadatos puede cambiar los bytes y, por tanto, no deberá presentarse como la misma base sin demostración;
5. el hash no sustituye `source_system`, identificador externo, identidad de recepción, identidad de venta, identidad de línea, identidad de pago o identidad de reverso;
6. el hash no será por sí solo la clave completa de idempotencia de `INT-POS-013`;
7. dos recepciones con el mismo hash y distintas identidades externas confiables no se considerarán automáticamente el mismo hecho;
8. la reutilización de una misma identidad externa con contenido materialmente incompatible deberá conservar ambos indicios, producir conflicto y pasar a conciliación sin sobrescribir la evidencia previa;
9. una huella no demuestra autenticidad del proveedor por sí sola; firma, checksum autenticado u otra garantía de origen son conceptos distintos;
10. la transformación normalizada podrá guardar o referenciar el hash de procedencia sin utilizarlo como ID de negocio.

---

#### 7. Semántica de `received_at`

`received_at` representa el instante técnico en que Vento registra por primera vez de forma durable la recepción de una representación externa identificable.

Debe cumplir:

1. pertenecer a la recepción, no a la venta;
2. permanecer estable para esa recepción;
3. no cambiar por parsing, mapping, validación, reintento, replay, conciliación o reproceso;
4. no sustituir `sale_occurred_at`;
5. no sustituir `business_date`;
6. no sustituir `source_created_at`, `source_updated_at` o `source_closed_at`;
7. no sustituir el timestamp empresarial de un pago o reverso;
8. no confundirse con el instante técnico de un intento posterior;
9. conservar una representación temporal inequívoca;
10. permitir ordenar la recepción técnica sin afirmar por ello orden causal o de versión del hecho empresarial.

Se preserva la desigualdad:

```text
RECEIVED_AT
≠
SALE_OCCURRED_AT
≠
SOURCE_CREATED_AT
≠
SOURCE_UPDATED_AT
≠
SOURCE_CLOSED_AT
≠
IMPORTED_AT LEGACY
≠
PROCESSED_AT
```

Una captura tardía conservará el momento empresarial que la fuente acredite y no lo reescribirá con `received_at`.

---

#### 8. Identidad de recepción

La recepción deberá tener identidad estable antes de que reintentos o reprocesos puedan producir una nueva interpretación.

Reglas:

1. cuando la fuente proporcione un identificador externo estable y confiable, se conservará junto con `source_system` y el contexto necesario para hacerlo inequívoco;
2. cuando el proveedor no entregue un identificador estable, el adaptador deberá asignar una identidad de recepción persistente antes del primer procesamiento que pueda repetirse;
3. la identidad de recepción no cambia por retry;
4. `attempt_id`, número de intento, trace, worker, conexión o timestamp técnico no son identidad de recepción;
5. una recepción puede originar cero, uno o varios hechos canónicos, según la granularidad demostrada;
6. una venta, línea, pago o reverso conserva su propia identidad y solo referencia la recepción que aportó evidencia;
7. una segunda representación válida del mismo hecho empresarial puede ser una nueva recepción y conservar correlación con el mismo agregado sin borrar la anterior;
8. la regla completa de idempotencia y resolución de duplicados pertenece a `INT-POS-013`.

---

#### 9. Procedencia de fragmentos

Cuando una recepción contenga múltiples ventas, líneas, pagos, devoluciones u otros elementos, la transformación deberá conservar un vínculo reproducible entre cada hecho normalizado y el fragmento de la entrada que lo sustentó.

Un localizador de fragmento podrá representar, cuando corresponda y sea reproducible:

- número de fila;
- índice de elemento;
- ruta estructural;
- identificador interno del elemento de fuente;
- página, sección u otra posición inequívoca dentro del artefacto preservado.

Reglas:

1. el localizador técnico no sustituye la identidad empresarial del elemento;
2. el localizador se interpreta dentro de una recepción concreta;
3. cambiar el mapping no cambia el fragmento original;
4. una transformación posterior deberá poder identificar qué recepción y fragmento utilizó;
5. cuando la fuente no permita granularidad individual, el localizador no podrá fabricarla.

En el flujo Excel vigente, `source_row_number` se clasifica como **localizador técnico de fila dentro del archivo importado**, no como identidad de línea de venta.

---

#### 10. Protección, minimización y separación de secretos

La conservación de procedencia deberá equilibrar reproducibilidad con seguridad, privacidad y minimización.

Reglas obligatorias:

1. la representación original se clasificará según su sensibilidad antes de exponerla a interfaces o consumidores;
2. el contrato canónico consumido por dominios internos no cargará innecesariamente el payload bruto;
3. auditoría y observabilidad preferirán referencias, hashes y metadatos seguros cuando no necesiten el contenido completo;
4. no se registrarán como contenido empresarial credenciales, tokens, secretos, claves privadas, `service_role`, encabezados de autorización completos ni material equivalente;
5. una integración externa no recibirá acceso directo a Supabase para depositar su payload en tablas internas;
6. la autorización de lectura de evidencia será independiente de la autorización para consumir el hecho normalizado;
7. la retención física y la disposición del material original deberán respetar las reglas de gobierno de información que se materialicen para esa clase de evidencia;
8. eliminar o archivar una representación no podrá romper silenciosamente la correlación, el hash o la trazabilidad exigida mientras la evidencia deba conservarse.

La materialización física posterior deberá coordinarse, según corresponda, con `EVID-ARC-003`, `EVID-ARC-005`, `EVID-ARC-006`, `EVID-ARC-008` y `EVID-ARC-010`, sin considerar esas tareas ejecutadas por esta definición.

---

#### 11. Clasificación del flujo `makos_excel` vigente

La implementación actual permite establecer únicamente la siguiente evidencia:

| Elemento                                                 | Estado actual verificable                               | Consecuencia canónica                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| archivo XLSX seleccionado por el usuario                 | disponible en memoria durante el import                 | existe una representación de archivo antes del parsing                                              |
| cálculo SHA-256                                          | IMPLEMENTADO sobre los bytes del `ArrayBuffer` recibido | la huella actual puede describirse como SHA-256 del archivo leído por el importador                 |
| persistencia de `source_file_hash`                       | IMPLEMENTADO                                            | se conserva la huella del archivo asociada al lote                                                  |
| persistencia de `source_file_name`                       | IMPLEMENTADO                                            | conserva nombre técnico de archivo, no identidad empresarial                                        |
| `source = makos_excel`                                   | IMPLEMENTADO                                            | identifica el mecanismo legacy de importación, no una versión de API Makos                          |
| metadata `parser = makos_sales_by_item_v1`               | IMPLEMENTADO                                            | identifica parser Vento; no demuestra versión del proveedor                                         |
| `source_row_number`                                      | IMPLEMENTADO                                            | funciona como localizador técnico de fila; no es identidad de línea                                 |
| bytes originales del XLSX persistidos después del import | no observados en la línea base revisada                 | no se declarará conservación física del archivo original                                            |
| celdas o filas brutas completas persistidas              | no observadas                                           | las filas actuales contienen valores parseados y normalizados, no una copia byte a byte del archivo |
| versión de API o esquema Makos                           | PENDIENTE_DE_EVIDENCIA                                  | deberá obtenerse del binding real si existe y la fuente la expone                                   |
| revisión individual de venta Makos                       | PENDIENTE_DE_EVIDENCIA                                  | no se inventará desde fecha, fila o hash                                                            |
| `imported_at` del lote                                   | IMPLEMENTADO como tiempo técnico legacy                 | no se renombra retroactivamente a `received_at` canónico                                            |
| identidad individual de recepción API/webhook Makos      | PENDIENTE_DE_EVIDENCIA                                  | depende del binding y de `INT-POS-014`                                                              |

La unicidad actual por sede, fecha, fuente y `source_file_hash` pertenece al flujo agregado existente. No se eleva por sí sola a la regla definitiva de idempotencia de ventas individuales.

---

#### 12. Precedente técnico de pagos existente

La fundación actual de pagos de Vento conserva `raw_request`, `raw_response` y payloads JSON de eventos webhook junto con proveedor, identificador de evento y estado de procesamiento.

Esta evidencia demuestra que Vento ya utiliza almacenamiento de representaciones externas o solicitudes como apoyo de trazabilidad, pero no define por sí sola el contrato Makos.

Reglas:

1. un objeto JSON parseado no prueba conservación de los bytes HTTP originales;
2. los campos y estados Wompi no se trasladan a Makos;
3. el identificador de evento Wompi no define la identidad que Makos pueda exponer;
4. los timestamps físicos existentes no se renombran por inferencia a `received_at` del contrato aquí definido;
5. la existencia de `raw_request` o `raw_response` no autoriza incluir secretos o datos innecesarios;
6. esta tarea no modifica la fundación de pagos existente.

---

#### 13. Evidencia requerida del binding futuro de Makos

Antes de que una integración transaccional Makos pueda declarar completa su procedencia, deberá existir evidencia del proveedor o del tenant suficiente para resolver esta matriz:

| Área                             | Evidencia requerida                                                                 | Resultado permitido                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| unidad de entrega                | archivo, recurso, respuesta, evento o mensaje real                                  | determina la unidad de recepción                                           |
| identidad externa                | campo o garantía de identificador estable cuando exista                             | identidad externa preservada o activación de identidad de recepción propia |
| revisión del recurso o dato      | campo, versión, secuencia, ETag u otra garantía documentada cuando exista           | revisión de fuente sin inferencia                                          |
| versión de API o esquema         | documentación o metadata técnica del proveedor cuando exista                        | versión externa diferenciada de la versión Vento                           |
| tipo de contenido y codificación | contrato o headers verificables cuando sean materiales                              | reproducción correcta de bytes o representación                            |
| autenticidad                     | firma, checksum autenticado, credencial de transporte u otra garantía cuando exista | evidencia de origen separada del hash de integridad                        |
| semántica de body o payload      | especificación de qué representa la respuesta o evento                              | preservación de la unidad correcta                                         |
| timestamps de fuente             | campo y significado                                                                 | separación frente a `received_at`                                          |
| paginación o fragmentación       | garantía de cómo se divide o identifica el conjunto                                 | localizadores reproducibles sin pérdida                                    |
| restricciones de retención       | obligación contractual aplicable cuando exista                                      | handoff a gobierno de evidencia sin inventar periodos                      |

No se registran nombres de endpoints, propiedades JSON, ETags, headers, versiones, formatos ni valores específicos de Makos porque esa evidencia técnica no forma parte de la línea base disponible.

---

#### 14. Puertas de elegibilidad derivadas

Una transformación proveniente del POS externo no podrá presentarse como completamente reproducible cuando ocurra alguna de estas condiciones:

| Condición                                                               | Tratamiento                                                             | Tarea propietaria de salida                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| no existe identidad estable de recepción                                | no generar una identidad nueva por cada intento                         | `INT-POS-013`; verificación de binding en `INT-POS-021`                          |
| no existe referencia recuperable a la representación original requerida | conservar el resultado como insuficiente para reproducibilidad completa | `INT-POS-021`; materialización de evidencia según tareas `EVID-ARC-*` aplicables |
| existe hash sin base identificada                                       | no utilizarlo como prueba reproducible de integridad                    | `INT-POS-021`; detalle físico en `EVID-ARC-006`                                  |
| una identidad externa conocida llega con contenido incompatible         | conservar conflicto; no sobrescribir la entrada anterior                | `INT-POS-013`; conciliación en `INT-POS-020`                                     |
| versión de proveedor desconocida                                        | conservar desconocimiento; no fabricar versión                          | `INT-POS-021` cuando esa versión sea necesaria para demostrar el binding         |
| parser o mapping aplicado no puede identificarse                        | no presentar la transformación como reproducible                        | `INT-POS-021`; contratos compartidos posteriores                                 |
| `received_at` no puede distinguirse de tiempos de negocio               | bloquear cualquier uso que dependa de la semántica temporal correcta    | `INT-POS-021`                                                                    |
| empresa, sede, terminal o caja necesarias no están mapeadas             | conservar procedencia sin habilitar efecto dependiente del alcance      | `INT-POS-010`                                                                    |
| producto, presentación o receta requeridos no están resueltos           | conservar procedencia de la línea sin efecto de producto                | `INT-POS-011`; `INT-POS-012`                                                     |
| transporte incremental todavía no está definido                         | no asumir webhook, polling, cursor ni frecuencia                        | `INT-POS-014`                                                                    |
| venta todavía no satisface las puertas del contrato canónico            | no emitir venta validada                                                | `INT-POS-015`                                                                    |

Una entrada podrá conservarse como evidencia aunque todavía no sea elegible para generar efectos empresariales.

---

#### 15. Fronteras con tareas posteriores

- `INT-POS-010` resolverá empresa, sede, terminal y caja externa sin cambiar la representación original.
- `INT-POS-011` resolverá producto, presentación y receta conservando procedencia y localizador de cada línea.
- `INT-POS-012` gobernará cuarentena de líneas sin mapping y deberá conservar la evidencia recibida sin autorizar inventario.
- `INT-POS-013` definirá idempotencia por sistema, venta y línea externa; consumirá identidad de recepción y hash sin convertir la huella en identidad empresarial.
- `INT-POS-014` definirá webhook cuando exista y polling de respaldo; el transporte deberá producir el mismo contrato de procedencia.
- `INT-POS-015` emitirá venta validada únicamente después de satisfacer las puertas aplicables.
- `INT-POS-020` conciliará recepciones, versiones, contratos y efectos incompatibles sin borrar historia.
- `INT-POS-021` comprobará con el binding real de Makos la disponibilidad y suficiencia de identidad, versiones, timestamps, contenido y procedencia sin efectos sobre inventario o finanzas.
- `EVID-ARC-003` definirá clasificación de sensibilidad y acceso para evidencia física.
- `EVID-ARC-005` definirá vinculación física entre evidencia y recursos empresariales.
- `EVID-ARC-006` definirá hash, firma, timestamp y validación de integridad de evidencia.
- `EVID-ARC-008` definirá retención, archivo, eliminación y legal hold.
- `EVID-ARC-010` definirá auditoría de lectura, modificación y retiro de evidencia.
- `SHELL-CON-020` y `SHELL-CON-021` materializarán posteriormente los contratos compartidos de venta y línea sin incrustar innecesariamente la representación externa.
- `SHELL-CON-023` materializará el contrato transversal de idempotencia y conciliación sin redefinir la identidad empresarial desde el hash.

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 16. Decisiones congeladas

1. toda normalización deberá conservar una referencia reproducible a su procedencia;
2. la representación original se define antes del parsing, mapping, enriquecimiento o normalización empresarial;
3. un objeto JSON parseado no se declarará equivalente a los bytes HTTP originales cuando estos no se hayan capturado;
4. la evidencia original permanece separada del contrato canónico consumido por los dominios;
5. la recepción conserva identidad estable antes de reintentos o reprocesos;
6. una identidad externa confiable se conserva junto con sistema y contexto de origen;
7. ausencia de identidad externa estable requiere identidad de recepción propia, no un ID nuevo por intento;
8. identidad de recepción no sustituye identidad de venta, línea, pago o reverso;
9. revisión del dato, versión de API, versión del parser y versión del contrato canónico son conceptos distintos;
10. no se inventará ninguna versión de Makos;
11. `makos_sales_by_item_v1` es identificador de parser Vento, no versión Makos;
12. todo hash deberá conservar algoritmo, base y digest;
13. el hash es guardia de integridad, equivalencia o conflicto, no identidad empresarial;
14. el hash por sí solo no define idempotencia;
15. misma identidad externa con contenido incompatible no sobrescribe la evidencia anterior;
16. mismo hash con identidades externas distintas no demuestra duplicidad por sí solo;
17. `received_at` es tiempo técnico de primera recepción durable, no tiempo comercial;
18. retry, replay o reproceso no cambian `received_at` de la recepción original;
19. `imported_at` del flujo Excel vigente permanece tiempo técnico legacy y no se renombra a `received_at`;
20. `source_row_number` es localizador técnico y no identidad de línea;
21. el Excel actual sí calcula y persiste SHA-256 del archivo leído;
22. la línea base revisada no demuestra persistencia posterior de los bytes originales del XLSX;
23. la fundación Wompi constituye precedente técnico, no contrato Makos;
24. credenciales y secretos no forman parte del payload empresarial conservado;
25. la definición física de almacenamiento, retención, acceso e integridad se materializará en sus tareas propietarias sin adelantarlas;
26. esta tarea no modifica código, DDL, DML, migraciones, Supabase, Storage, datos, credenciales, endpoints, webhooks ni configuración remota;
27. `INT-POS-010` permanece exclusivamente reservada.

---

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-009` materializa para la transición Makos → PULSO reglas de procedencia que ya están protegidas explícitamente por la cobertura canónica vigente: conservación de payload original protegido y momento de recepción para hechos externos; identidad estable de recepción cuando el proveedor entrega o no entrega identificador; separación del hash respecto de la identidad empresarial; preservación de versiones y conflictos sin sobrescribir historia; exclusión de secretos; y separación entre tiempos del hecho y tiempos técnicos. La tarea no crea una excepción ejecutable nueva fuera de esas reglas ni modifica su alcance, por lo que el registro 04A permanece sin cambios.

#### 18. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-INTEGRATION-014`, cobertura de la transición del POS externo mediante adaptador, staging, payload original, hash, mapping, cuarentena, idempotencia y efectos exactamente una vez;
- `TREQ-INTEGRATION-049`, cobertura de afirmación externa, autenticidad, proveedor, identificador externo, payload original protegido, momento de recepción y correlación antes del hecho interno;
- `TREQ-INTEGRATION-051`, cobertura de exclusión de secretos, tokens, credenciales y material sensible de contratos y ejemplos de integración;
- `TREQ-INTEGRATION-052`, cobertura de versionado semántico sin reinterpretar historia;
- `TREQ-INTEGRATION-125`, cobertura de identidad externa confiable, procedencia, payload protegido, recepción y huella antes del hecho interno;
- `TREQ-INTEGRATION-126`, cobertura de identidad estable de recepción cuando el proveedor no entregue identificador estable;
- `TREQ-INTEGRATION-127`, cobertura del hash como guardia y prohibición de utilizarlo como identidad empresarial única;
- `TREQ-INTEGRATION-217`, cobertura de historia append-only y correcciones vinculadas sin eliminación destructiva;
- `TREQ-INTEGRATION-218`, cobertura de minimización de datos sensibles mediante referencias, hashes o diferencias cuando corresponda;
- `TREQ-INTEGRATION-222`, cobertura de separación temporal entre ocurrencia, registro y finalización, preservando el momento histórico frente a captura tardía.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 19. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. define representación original como la entrada anterior a interpretación empresarial;
2. distingue bytes originales de representaciones parseadas o reserializadas;
3. define un sobre lógico mínimo de recepción sin escoger nombres físicos de tabla o tipo;
4. exige identidad estable de recepción;
5. conserva identidad externa cuando la fuente la entregue;
6. define tratamiento cuando la fuente no entregue identificador estable;
7. mantiene identidad de recepción separada de venta, línea, pago y reverso;
8. separa revisión del dato, versión de API o esquema, versión del parser o adaptador y versión del contrato canónico;
9. prohíbe inventar versiones de Makos;
10. clasifica `makos_sales_by_item_v1` exclusivamente como identificador de parser Vento;
11. define algoritmo, base y digest como dimensiones necesarias para interpretar una huella;
12. prohíbe utilizar el hash como identidad empresarial única;
13. prohíbe usar el hash como única regla definitiva de idempotencia;
14. define conflicto para una identidad externa reutilizada con contenido incompatible sin sobrescritura destructiva;
15. define `received_at` como tiempo técnico de primera recepción durable;
16. separa `received_at` de tiempos comerciales, de fuente y de procesamiento;
17. impide cambiar `received_at` por retry, replay o reproceso;
18. define localizador técnico para fragmentos de una recepción compuesta;
19. prohíbe convertir el localizador en identidad empresarial;
20. clasifica la evidencia actual del flujo `makos_excel` campo por campo;
21. reconoce el SHA-256 actual del archivo leído sin inferir persistencia de sus bytes originales;
22. clasifica `imported_at` como tiempo técnico legacy y no como `received_at` canónico;
23. clasifica `source_row_number` como localizador técnico;
24. clasifica la fundación Wompi como precedente que no define Makos ni prueba conservación de bytes HTTP originales;
25. define la evidencia mínima que deberá aportar el binding real de Makos;
26. asigna cada bloqueo a una tarea propietaria exacta con condición de salida;
27. mantiene separadas procedencia, auditoría, observabilidad y contrato empresarial normalizado;
28. preserva las tareas `EVID-ARC-*` aplicables como propietarias de materialización física posterior;
29. genera cero cambios `TREQ-*` por existir cobertura canónica suficiente;
30. no crea una copia del registro 04A;
31. no modifica código, Supabase, Storage, migraciones, datos, credenciales, endpoints, webhooks, polling ni configuración remota;
32. mantiene `INT-POS-010` como única siguiente tarea reservada.

---

#### 20. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-008 — Definir importación de anulaciones, devoluciones y reembolsos`

TAREA ACTUAL APROBADA

`INT-POS-009 — Definir conservación de payload original, versión, hash y fecha de recepción`

SIGUIENTE TAREA RESERVADA

`INT-POS-010 — Definir mapeo de empresa, sede, terminal y caja externa`


### ✅ INT-POS-010 — Definir mapeo de empresa, sede, terminal y caja externa

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-009`
**Tarea siguiente:** `INT-POS-011`
**Tipo de tarea:** documental — contrato de mapeo contextual del POS externo; no implementa tablas, migraciones, credenciales ni efectos operativos
**Bloque:** X — Integraciones
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Fuente POS temporal:** Makos
**Aplicación objetivo:** PULSO
**Línea base técnica verificada:** `vento-shell@4aa8fcb0a027fb37dd4b1f6928e3970e0316642d`; `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos:** ninguno

---

#### 1. Propósito

Definir de forma completa y reproducible cómo una venta procedente del POS externo conservará y resolverá su contexto de:

- empresa externa;
- sede externa;
- terminal externa;
- caja externa;

desde la identidad declarada por la fuente hasta la referencia canónica que Vento necesite para contextualizar la venta, aplicar el corte de transición y habilitar posteriormente efectos internos.

Esta tarea no inventa identificadores de Makos que no estén demostrados, no convierte el contexto seleccionado manualmente por un operador en una identidad externa y no diseña todavía el mapeo de producto, presentación o receta.

---

#### 2. Decisión principal

Toda venta externa deberá resolver su contexto mediante un **crosswalk versionado y auditable**, separado del payload original y separado del contrato canónico de venta.

El crosswalk deberá permitir responder, para el instante comercial aplicable:

```text
¿QUÉ IDENTIDAD EXTERNA DECLARÓ LA FUENTE?
→ ¿QUÉ DIMENSIÓN REPRESENTA?
→ ¿CON QUÉ REFERENCIA CANÓNICA VENTO SE CORRESPONDE?
→ ¿CON QUÉ EVIDENCIA SE DEMOSTRÓ?
→ ¿DESDE CUÁNDO Y HASTA CUÁNDO ES VÁLIDA ESA RELACIÓN?
```

Ninguna coincidencia por nombre, texto visible, nombre de archivo, usuario importador, IP, posición de una fila, medio de pago o proximidad temporal constituirá por sí sola un mapping válido.

---

#### 3. Cuatro dimensiones independientes

Las cuatro dimensiones se mantienen separadas. Resolver una no autoriza a inferir las demás.

| Dimensión | Semántica externa                                                                              | Referencia interna objetivo                                          | Regla                                                                                |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Empresa   | tenant, compañía, negocio o entidad empresarial bajo la cual la fuente identifica la operación | referencia canónica de empresa o alcance empresarial Vento aplicable | no se infiere desde sede, credencial, nombre comercial ni dominio                    |
| Sede      | establecimiento, local, punto de venta o ubicación empresarial donde se originó la venta       | referencia canónica de sede Vento                                    | debe quedar resuelta antes de cualquier efecto dependiente de territorio o ubicación |
| Terminal  | terminal, estación o punto lógico/físico del POS que originó la transacción                    | referencia canónica de terminal o estación de venta Vento aplicable  | no se confunde con usuario, dispositivo genérico, sesión, caja ni sede               |
| Caja      | caja, registro o unidad operativa externa a la que la fuente atribuye la operación             | referencia canónica de caja aplicable                                | no se confunde con terminal, método de pago, cajero, turno ni sesión de caja         |

La ausencia de una dimensión en una fuente no autoriza a copiar el valor de otra dimensión para completar el contexto.

---

#### 4. Contrato conceptual del mapping

Cada relación de mapping deberá conservar como mínimo:

| Campo conceptual        | Obligación                                  | Semántica                                                                                    |
| ----------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `mapping_id`            | requerida                                   | identidad estable de la relación de mapping                                                  |
| `source_system`         | requerida                                   | sistema externo de origen; para el alcance actual identifica Makos                           |
| `source_instance_ref`   | condicional                                 | instancia, tenant, ambiente o contexto de fuente cuando sea necesario para evitar colisiones |
| `source_entity_type`    | requerida                                   | `COMPANY`, `SITE`, `TERMINAL` o `CASH_REGISTER`                                              |
| `external_entity_id`    | preferida                                   | identificador estable entregado por la fuente cuando exista                                  |
| `external_entity_code`  | condicional                                 | código externo conservado como dato de origen, no como identidad canónica automática         |
| `external_entity_label` | condicional                                 | etiqueta o nombre observado para soporte humano y evidencia                                  |
| `canonical_entity_type` | requerida para mapping resuelto             | tipo de referencia interna compatible con la dimensión externa                               |
| `canonical_entity_ref`  | requerida para mapping resuelto             | referencia canónica Vento seleccionada                                                       |
| `resolution_basis`      | requerida                                   | evidencia que demuestra la relación                                                          |
| `mapping_status`        | requerida                                   | estado cerrado de resolución definido por esta tarea                                         |
| `mapping_version`       | requerida                                   | versión estable de la decisión de mapping                                                    |
| `effective_from`        | requerida para mapping activo               | inicio de vigencia empresarial de la relación                                                |
| `effective_to`          | condicional                                 | fin de vigencia; abierto únicamente mientras la relación siga vigente                        |
| `evidence_ref`          | requerida para mapping resuelto             | referencia auditable a la evidencia usada para resolver la relación                          |
| `verified_at`           | requerida para mapping resuelto             | instante de verificación de la relación                                                      |
| `verified_by_ref`       | requerida cuando exista verificación humana | referencia al actor o principal que validó la decisión                                       |
| `supersedes_mapping_id` | condicional                                 | relación anterior sustituida sin reescribir historia                                         |

Los nombres anteriores son semántica documental. Esta tarea no fija tabla, columna, RPC, endpoint ni formato físico.

---

#### 5. Identidad externa fuerte y binding por alcance

El mapping podrá quedar resuelto mediante una de dos bases válidas:

1. **Identidad explícita de fuente:** la fuente entrega un identificador estable de empresa, sede, terminal o caja y existe evidencia suficiente para vincularlo con una referencia canónica Vento.
2. **Binding de alcance demostrado:** el contrato, credencial, endpoint, exportación o configuración de proveedor está demostrado como restringido inequívocamente a una única entidad de esa dimensión, y esa restricción forma parte de la evidencia del mapping.

Queda prohibido tratar como binding demostrado:

- una selección manual sin evidencia de correspondencia con la fuente;
- un valor escrito en el nombre del archivo;
- el nombre visible de una sede;
- la identidad del usuario que realiza la importación;
- la red desde la que se cargó el archivo;
- un valor por defecto de la aplicación;
- una relación asumida porque actualmente Vento opere una sola empresa, sede, terminal o caja en un contexto determinado.

---

#### 6. Estados cerrados del mapping

Cada dimensión deberá resolver exactamente uno de los siguientes estados para una revisión determinada:

| Estado             | Significado                                                                                                | Elegibilidad                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `RESOLVED`         | identidad externa o binding de alcance demostrados y referencia interna única                              | puede participar en validaciones posteriores                                                |
| `PENDING_EVIDENCE` | existe necesidad de mapping, pero la evidencia disponible no permite demostrar la relación                 | bloquea los efectos que dependan de esa dimensión                                           |
| `NOT_PROVIDED`     | existe evidencia suficiente de que la fuente o modalidad no entrega esa dimensión                          | no se inventa valor; la elegibilidad depende de si la dimensión es obligatoria para el caso |
| `AMBIGUOUS`        | más de una referencia interna resulta plausible o la identidad externa no es suficientemente discriminante | bloquea efectos dependientes y exige resolución explícita                                   |
| `CONFLICT`         | la evidencia recibida contradice un mapping activo o una misma identidad reclama destinos incompatibles    | bloquea efectos dependientes y exige conciliación                                           |
| `INACTIVE`         | relación histórica fuera de su intervalo de vigencia                                                       | solo puede usarse para reconstruir hechos pertenecientes a su vigencia histórica            |

`NOT_PROVIDED` solo podrá utilizarse cuando la ausencia esté demostrada por la fuente o por el contrato del canal. No equivale a “no lo vimos todavía”.

---

#### 7. Reglas de unicidad y consistencia

1. Una identidad externa de una dimensión tendrá como máximo un destino canónico activo dentro del mismo `source_system`, `source_instance_ref` y periodo efectivo.
2. Un cambio de destino no editará retroactivamente la relación anterior: crea una nueva versión y cierra la vigencia previa.
3. Varias identidades o aliases externos podrán converger en una referencia canónica únicamente cuando cada relación esté demostrada individualmente y no cree ambigüedad histórica.
4. Empresa, sede, terminal y caja no compartirán una identidad universal ni reutilizarán el mismo mapping como sustituto de otra dimensión.
5. Una terminal externa no podrá quedar vinculada a un contexto canónico incompatible con la sede resuelta de la misma venta.
6. Una caja externa no podrá usarse para inferir automáticamente sede o terminal.
7. Si la fuente modela una relación distinta a uno-a-uno entre terminal y caja, Vento conservará esa realidad; esta tarea no impone cardinalidad uno-a-uno.
8. La jerarquía externa observada se conserva como procedencia, pero la jerarquía canónica solo se afirma mediante referencias internas válidas.

---

#### 8. Semántica temporal del mapping

El mapping aplicable a una venta se resuelve con respecto al **momento comercial del hecho**, no por el instante en que Vento recibió, importó, reprocesó o concilió el dato.

Reglas:

1. `sale_occurred_at` y la semántica temporal definida para la venta determinan qué revisión efectiva del mapping corresponde.
2. `received_at` conserva el instante técnico de recepción y no reemplaza la vigencia empresarial del mapping.
3. una venta tardía perteneciente a un periodo anterior conservará el mapping válido para ese periodo;
4. corregir un mapping no cambia silenciosamente el contexto histórico de ventas ya atribuidas;
5. un cambio retroactivo excepcional deberá materializarse como corrección trazable y no como edición destructiva;
6. cuando no pueda determinarse con seguridad qué revisión era aplicable, la venta queda bloqueada para efectos dependientes y pasa a conciliación.

---

#### 9. Empresa externa

La dimensión empresa responde qué entidad empresarial o tenant de la fuente originó la transacción.

Reglas:

- se conserva el identificador externo cuando exista;
- si la fuente reutiliza IDs entre tenants, `source_instance_ref` deberá participar en la desambiguación;
- la credencial o conexión por sí sola no se convierte en empresa, salvo que exista evidencia explícita de binding único y estable;
- el nombre comercial no sustituye una identidad estable;
- una venta no puede cambiar de empresa por una actualización posterior del catálogo de sedes;
- la referencia empresarial resuelta sirve para validar coherencia de las dimensiones subordinadas, no para fabricarlas.

La implementación física exacta de la referencia empresarial interna no queda fijada por esta tarea.

---

#### 10. Sede externa

La sede determina el establecimiento o ubicación empresarial a la que pertenece la venta.

Reglas:

1. la sede externa deberá mapearse explícitamente hacia la referencia canónica de sede Vento cuando la fuente la entregue;
2. la implementación actual demuestra que `site_id` referencia `public.sites(id)` para la importación diaria;
3. ese `site_id` actual es seleccionado por el operador antes de cargar el XLSX y, por tanto, representa **contexto interno declarado**, no prueba de que el archivo Makos haya declarado esa sede;
4. una coincidencia de nombre entre Makos y Vento no basta para declarar `RESOLVED`;
5. una venta con sede `AMBIGUOUS`, `CONFLICT` o `PENDING_EVIDENCE` no podrá producir efectos que dependan de sede;
6. si un canal externo queda demostrado como restringido a una única sede, el binding de alcance podrá resolver la dimensión conservando su evidencia y vigencia.

---

#### 11. Terminal externa

La terminal identifica la estación o endpoint de POS que originó la transacción cuando la fuente maneje esta dimensión.

Reglas:

- no se sustituye por `site_id`;
- no se sustituye por cajero, usuario, caja o método de pago;
- no se infiere desde navegador, dispositivo utilizado para importar o nombre del archivo;
- una terminal debe conservar su identidad externa incluso si posteriormente se reasigna físicamente;
- una reasignación de terminal a otra sede o contexto crea una nueva revisión efectiva del mapping;
- la transición Makos → PULSO no podrá declarar un corte por terminal si la terminal de origen sigue sin evidencia suficiente.

---

#### 12. Caja externa

La caja externa identifica la unidad operativa de caja o registro que la fuente atribuya a la venta o al cobro.

Reglas:

1. caja externa y terminal externa son dimensiones distintas;
2. caja externa y sesión de caja son conceptos distintos;
3. caja externa y medio de pago son conceptos distintos;
4. caja externa y cajero son conceptos distintos;
5. si la fuente expone únicamente una sesión, turno o cierre pero no una identidad estable de caja, no se fabricará un `external_cash_register_id`;
6. un cambio de caja asociada a una terminal no altera retrospectivamente ventas anteriores;
7. la semántica de apertura, arqueo, cierre y sesión de caja permanece fuera de esta tarea.

---

#### 13. Matriz materializada de la línea base actual

La línea base demostrada de `makos_excel` queda clasificada así:

| Dimensión        | Evidencia visible en la modalidad actual                                                                         | Estado documental actual                                                                            | Decisión                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Empresa externa  | el parser verificado no extrae identidad de empresa Makos                                                        | `PENDING_EVIDENCE`                                                                                  | no declarar mapping de empresa hasta contar con identidad o binding de alcance demostrado |
| Sede externa     | el parser verificado no extrae una identidad de sede Makos; el usuario selecciona previamente un `site_id` Vento | `PENDING_EVIDENCE` para la identidad externa; contexto interno seleccionado preservado por separado | no presentar el `site_id` seleccionado como dato emitido por Makos                        |
| Terminal externa | el parser verificado no extrae terminal                                                                          | `PENDING_EVIDENCE`                                                                                  | no declarar corte por terminal ni inferir terminal desde sede, archivo o usuario          |
| Caja externa     | el parser verificado no extrae caja                                                                              | `PENDING_EVIDENCE`                                                                                  | no inventar caja ni derivarla desde método de pago, terminal o actor                      |

**Total de dimensiones evaluadas:** 4.
**Dimensiones con mapping externo real demostrado en la modalidad actual:** 0.
**Dimensiones pendientes de evidencia de fuente:** 4.
**Dimensiones omitidas del análisis:** 0.

Esto no invalida la importación documental actual como mecanismo de observación. Sí impide presentarla como evidencia suficiente de un crosswalk externo completo.

---

#### 14. Relación con la importación manual vigente

La implementación actual de ventas diarias:

- exige seleccionar `site_id` y fecha antes de importar;
- calcula SHA-256 del XLSX;
- parsea ID de producto, producto, categoría, cantidad, subtotal, impuestos, descuentos y devoluciones;
- guarda el lote bajo `source = makos_excel`;
- mantiene `site_id` en lote y filas;
- mapea productos por sede y fuente.

No se observa en ese parser extracción de empresa, sede Makos, terminal ni caja.

Por tanto:

1. `site_id` actual se conserva como declaración de contexto hecha dentro de Vento;
2. no se reetiqueta como `external_site_id`;
3. el hash del archivo no prueba la sede ni terminal de origen;
4. el usuario importador no se convierte en cajero externo;
5. el mapping de producto existente no resuelve empresa, terminal o caja;
6. una futura API podrá aportar identidades adicionales sin cambiar estas reglas.

---

#### 15. Puerta de elegibilidad por contexto

Antes de que una venta externa pueda producir un efecto que dependa del contexto territorial u operativo, cada dimensión requerida para ese efecto deberá estar en `RESOLVED`.

La evaluación se realiza por dimensión y por efecto:

| Condición                                                                    | Resultado                                                                           |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| dimensión requerida = `RESOLVED`                                             | puede continuar a las siguientes puertas                                            |
| dimensión requerida = `PENDING_EVIDENCE`                                     | efecto bloqueado                                                                    |
| dimensión requerida = `AMBIGUOUS`                                            | efecto bloqueado y caso de resolución                                               |
| dimensión requerida = `CONFLICT`                                             | efecto bloqueado y conciliación                                                     |
| dimensión requerida = `NOT_PROVIDED`                                         | solo continúa si el contrato del efecto demuestra que esa dimensión no es necesaria |
| mapping histórico = `INACTIVE` pero vigente al momento comercial de la venta | puede usarse únicamente para reconstrucción histórica correspondiente               |

Una dimensión no requerida por un efecto específico no debe fabricarse solo para completar un esquema.

---

#### 16. Separación entre mapping contextual y mapping de producto

`INT-POS-010` gobierna únicamente contexto de origen.

No resuelve:

- producto externo;
- producto Vento;
- presentación;
- receta;
- sustituciones de producto;
- descuento de inventario de una línea no mapeada.

Esas decisiones pertenecen a `INT-POS-011` y `INT-POS-012`.

Una venta puede tener contexto resuelto y líneas sin mapping; también puede tener productos mapeados y contexto externo no resuelto. Ninguna dimensión compensa la ausencia de la otra.

---

#### 17. Separación entre mapping y autoridad

Resolver un mapping no concede:

- permiso de lectura o escritura;
- capacidad de mutar Makos;
- capacidad de escribir tablas internas;
- autoridad para crear una venta;
- autoridad para emitir inventario, puntos o hechos económicos;
- autorización para cambiar el origen histórico de una venta;
- capacidad para adelantar el corte hacia PULSO.

El mapping solo demuestra correspondencia contextual. La autoridad de fuente continúa gobernada por el alcance temporal definido para Makos y PULSO.

---

#### 18. Uso en el corte Makos → PULSO

La regla canónica de transición exige corte por sede, terminal y fecha efectiva.

Por tanto:

1. la sede usada en el corte deberá corresponder a una referencia canónica resuelta;
2. la terminal usada en el corte deberá estar resuelta cuando el corte se declare a ese nivel;
3. una terminal `PENDING_EVIDENCE`, `AMBIGUOUS` o `CONFLICT` no puede usarse como clave de corte;
4. `received_at` no determina de qué lado del corte pertenece una venta;
5. una venta anterior al corte conserva origen Makos aunque llegue después;
6. una venta nueva posterior al corte dentro del alcance transferido deberá originarse en PULSO;
7. un cambio de mapping no podrá utilizarse para mover retroactivamente una venta de un lado del corte al otro.

La ejecución y procedimiento completo de transición permanecen en `INT-POS-023`.

---

#### 19. Conflictos y conciliación

Se considera conflicto de mapping, como mínimo:

- una identidad externa vinculada simultáneamente con dos destinos canónicos incompatibles;
- una terminal externa cuya sede inferida por la evidencia contradice la sede canónica resuelta;
- una caja externa atribuida a un contexto incompatible con la venta;
- una venta histórica reprocesada bajo una revisión de mapping que no estaba vigente en su momento comercial;
- una identidad externa reutilizada entre tenants o ambientes sin `source_instance_ref` suficiente;
- un binding por alcance que deja de ser único o verificable.

Los conflictos se conservan sin corrección silenciosa. `INT-POS-020` deberá definir la conciliación diaria y el tratamiento de diferencias persistentes sin reescribir historia.

---

#### 20. Evidencia operativa pendiente y responsables exactos

Esta tarea define completamente el contrato de mapping, pero no fabrica datos que las fuentes vigentes no demuestran.

| Evidencia pendiente                               | Estado                   | Responsable canónico | Condición de salida                                                                                                 |
| ------------------------------------------------- | ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| identificador o binding real de empresa Makos     | `PENDIENTE_DE_EVIDENCIA` | `INT-POS-021`        | piloto sin efectos demuestra la identidad o el alcance único con evidencia reproducible                             |
| identificador o binding real de sede Makos        | `PENDIENTE_DE_EVIDENCIA` | `INT-POS-021`        | piloto sin efectos demuestra correspondencia inequívoca con sede Vento                                              |
| identificador real de terminal Makos              | `PENDIENTE_DE_EVIDENCIA` | `INT-POS-021`        | piloto sin efectos demuestra identidad estable y correspondencia contextual                                         |
| identificador real de caja Makos, cuando exista   | `PENDIENTE_DE_EVIDENCIA` | `INT-POS-021`        | piloto sin efectos demuestra identidad y semántica, o evidencia suficiente confirma que la dimensión no es provista |
| diferencias persistentes de mapping               | `ESPECIFICADO`           | `INT-POS-020`        | conciliación clasifica diferencia, autoridad, decisión y residual                                                   |
| habilitación de efectos con mappings demostrados  | `ESPECIFICADO`           | `INT-POS-022`        | piloto controlado verifica puertas críticas antes de habilitar efectos                                              |
| consumo de sede/terminal para el corte definitivo | `ESPECIFICADO`           | `INT-POS-023`        | transición documenta alcance, fecha efectiva, contingencia y ausencia de doble fuente                               |

No quedan pendientes narrativos sin tarea responsable.

---

#### 21. Handoffs exactos

| Tarea         | Entrega recibida desde `INT-POS-010`                                                                      | Alcance que conserva                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `INT-POS-011` | contexto de origen separado y referencias de sede aplicables                                              | mapping de producto externo, producto Vento, presentación y receta    |
| `INT-POS-012` | contexto de venta sin usar producto como sustituto                                                        | cuarentena de líneas sin mapping y bloqueo de descuento de inventario |
| `INT-POS-013` | `source_system`, instancia y referencias contextuales sin convertirlas en identidad idempotente universal | idempotencia por sistema, venta y línea externa                       |
| `INT-POS-015` | puerta de contexto resuelta por dimensión requerida                                                       | emisión del evento canónico de venta validada                         |
| `INT-POS-016` | sede y contexto necesarios para el efecto físico                                                          | salida de inventario en NEXO exactamente una vez                      |
| `INT-POS-017` | contexto empresarial y comercial requerido                                                                | efecto económico NUMERA exactamente una vez                           |
| `INT-POS-018` | contexto de venta aplicable                                                                               | fidelización PASS cuando corresponda                                  |
| `INT-POS-020` | mappings versionados, conflictos y evidencia                                                              | conciliación diaria entre POS y efectos internos                      |
| `INT-POS-021` | contrato de crosswalk y cuatro dimensiones pendientes de evidencia real                                   | piloto sin efectos que prueba bindings reales                         |
| `INT-POS-022` | mappings demostrados y puertas de elegibilidad                                                            | piloto controlado con efectos habilitados                             |
| `INT-POS-023` | sede/terminal resueltas y vigencia histórica                                                              | transición futura desde POS externo hacia PULSO                       |

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 22. Decisiones congeladas

1. Empresa, sede, terminal y caja son dimensiones independientes.
2. Toda relación externa → interna deberá ser explícita, versionada, temporal y auditable.
3. Un mapping podrá basarse en identidad explícita o binding de alcance demostrado, nunca en suposición.
4. Nombre, archivo, usuario importador, IP, medio de pago y proximidad temporal no son pruebas suficientes de mapping.
5. `site_id` seleccionado en la importación manual vigente es contexto interno declarado y no una identidad de sede emitida por Makos.
6. La línea base `makos_excel` demuestra cero mappings externos reales de empresa, sede, terminal o caja.
7. Las cuatro dimensiones quedan `PENDING_EVIDENCE` respecto de la fuente actual hasta evidencia operativa reproducible.
8. Una dimensión requerida que no esté `RESOLVED` bloquea los efectos que dependan de ella.
9. `NOT_PROVIDED` exige evidencia de ausencia y no puede usarse por simple falta de observación.
10. La versión aplicable se resuelve por el momento comercial del hecho, no por `received_at`.
11. Un remapping crea una nueva revisión efectiva y no reescribe historia.
12. Terminal no equivale a caja; caja no equivale a sesión; caja no equivale a medio de pago.
13. No se impone cardinalidad uno-a-uno entre terminal y caja sin evidencia de la fuente.
14. El corte por sede y terminal no puede declararse sobre una terminal no resuelta.
15. El mapping contextual no concede autorización, propiedad empresarial ni capacidad de producir efectos.
16. El mapping de producto permanece separado y continúa en `INT-POS-011`.
17. La evidencia real de los cuatro bindings se demostrará sin efectos en `INT-POS-021`.
18. Esta tarea no crea tablas, migraciones, RPC, endpoints, credenciales, datos, backfills ni cambios en Supabase.

---

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** el comportamiento materializado aquí ya está protegido por requisitos canónicos vigentes que cubren el mapping durante la transición del POS externo, el corte por sede y terminal, la procedencia y auditoría de mappings externos y el gobierno de referencias compartidas. La tarea especializa esas obligaciones para las cuatro dimensiones de contexto Makos sin crear una conducta verificable adicional ni modificar texto, estado, relación, propietario o momento de implementación de requisitos existentes.

---

#### Cobertura de prueba existente preservada

- `TREQ-INTEGRATION-006` — evita fuentes competidoras y exige resolver diferencias preservando procedencia y evidencia.
- `TREQ-INTEGRATION-014` — protege el ingreso del POS externo mediante mapping y el corte por sede, terminal y fecha efectiva sin doble emisión.
- `TREQ-INTEGRATION-049` — conserva afirmación y procedencia originales antes de producir un hecho interno.
- `TREQ-INTEGRATION-213` — exige trazabilidad de transformación y mapping en todo intercambio externo.
- `TREQ-INTEGRATION-300` — exige propietaria y versión canónica para referencias compartidas sin catálogos competidores.

---

#### 23. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

1. empresa, sede, terminal y caja quedan definidas como cuatro dimensiones independientes;
2. existe un contrato conceptual completo y versionado para cada relación externa → interna;
3. existe un vocabulario cerrado de estados de mapping;
4. se distinguen identidad externa explícita y binding de alcance demostrado;
5. quedan prohibidas inferencias por nombre, archivo, usuario, IP, pago o valores por defecto;
6. se define unicidad, consistencia, vigencia y supersesión sin reescritura histórica;
7. se define que el momento comercial selecciona la revisión aplicable y `received_at` no la sustituye;
8. se separan terminal, caja, sesión de caja, cajero y medio de pago;
9. la línea base actual materializa cuatro dimensiones evaluadas, cero mappings externos demostrados y cuatro pendientes de evidencia;
10. `site_id` actual queda reconocido como contexto interno seleccionado y no como evidencia de sede emitida por Makos;
11. una dimensión requerida no resuelta bloquea los efectos que dependan de ella;
12. se impide declarar corte por terminal sin terminal resuelta;
13. los conflictos quedan dirigidos a conciliación sin corrección silenciosa;
14. cada evidencia faltante queda asignada a una tarea responsable concreta y con condición de salida;
15. se preserva la separación con mapping de producto, idempotencia, eventos, efectos y transición;
16. se generan cero cambios de requisitos de prueba por existir cobertura canónica suficiente;
17. no se crea ni modifica una copia del registro 04A;
18. no se realizan cambios físicos ni operativos.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA:** `INT-POS-009`
**TAREA ACTUAL APROBADA:** `INT-POS-010`
**SIGUIENTE TAREA RESERVADA:** `INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta`


### ✅ INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta

**Estado:** APROBADA
**Bloque:** X — Integraciones y contratos
**Tarea anterior:** `INT-POS-010`
**Tarea siguiente:** `INT-POS-012`
**Tipo de tarea:** documental — contrato de mapeo y resolución de identidades de producto
**Sistema externo temporal:** Makos / `EXT-SYS-013`
**Fuente demostrada actualmente:** `makos_excel`
**Implementación técnica:** no autorizada en esta tarea
**Cambios de datos o esquema:** no autorizados en esta tarea

---

#### 1. Propósito

Definir el contrato canónico mediante el cual cada ítem vendido por el POS externo podrá resolverse de forma explícita, verificable y versionada hacia las identidades internas que correspondan en Vento:

- producto maestro Vento;
- presentación operativa del producto cuando la unidad o equivalencia vendida lo requiera;
- receta cuando el tratamiento canónico de la venta dependa de una preparación por receta.

El objetivo es impedir que semejanzas de nombre, categoría, código, posición en un archivo o conveniencia técnica conviertan una línea externa en un producto interno equivocado o produzcan efectos automáticos sin un mapping suficiente.

---

#### 2. Base canónica heredada

Esta tarea conserva sin reinterpretar las siguientes decisiones ya aprobadas:

1. Makos es la fuente temporal de las ventas originadas dentro de su alcance hasta el corte controlado hacia PULSO.
2. El adaptador y el staging no adquieren autoridad sobre catálogo, inventario, fidelización ni finanzas.
3. La venta y la línea canónicas mantienen separadas la identidad del ítem en la fuente y las referencias internas de Vento.
4. Una línea puede conservarse como evidencia aunque todavía no sea elegible para producir efectos internos.
5. La empresa, sede, terminal y caja externas se resuelven mediante el contrato de contexto de `INT-POS-010`; ese mapping no sustituye el mapping de producto.
6. La procedencia, payload original, versión, hash y recepción permanecen gobernados por `INT-POS-009`.
7. Una línea sin mapping suficiente no puede producir automáticamente inventario, costo ni fidelización.
8. La implementación futura debe permitir que el POS externo y PULSO converjan en el mismo contrato canónico sin crear un catálogo paralelo.

---

#### 3. Resultado material

Queda definido el contrato lógico `EXTERNAL-SALE-ITEM-MAPPING-001`.

Cada instancia de este contrato resuelve una identidad externa dentro de un alcance de origen hacia tres decisiones internas independientes:

| Plano        | Pregunta canónica                                                                      | Resultado posible                                       |
| ------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Producto     | ¿Qué producto maestro Vento representa el ítem externo?                                | producto resuelto o bloqueo explícito                   |
| Presentación | ¿La cantidad vendida corresponde a una presentación operativa específica del producto? | presentación resuelta, no aplicable o bloqueo explícito |
| Receta       | ¿La venta requiere una receta concreta para interpretar el efecto posterior?           | receta resuelta, no aplicable o bloqueo explícito       |

Una instancia no se considera completamente resuelta mientras cualquier plano obligatorio para esa línea permanezca ambiguo, conflictivo o pendiente de evidencia.

---

#### 4. Identidades que permanecen separadas

Quedan prohibidas las siguientes equivalencias:

```text
external_item_id = catalog_item_id
```

```text
catalog_item_id = product_id
```

```text
product_id = presentation_id
```

```text
product_id = recipe_card_id
```

```text
presentation_id = configuración visual de PASS
```

Las identidades se interpretan así:

- `external_item_id`: identidad declarada por el sistema externo cuando exista;
- `catalog_item_id`: ítem comercial de Vento que puede enlazar una oferta vendible con un producto maestro;
- `product_id`: identidad del producto maestro en Vento;
- `presentation_id`: identidad de la presentación operativa basada en el perfil de unidad del producto;
- `recipe_card_id`: identidad de la ficha de receta cuando una receta concreta sea aplicable a la línea.

La tabla visual `pass.catalog_item_presentation` no representa una presentación física ni una equivalencia de unidades; por tanto, queda fuera del significado de `presentation_id` utilizado por este contrato.

---

#### 5. Alcance de la identidad externa

El mapping se evaluará dentro de un alcance suficientemente específico para impedir colisiones entre empresas, sedes, tenants o contextos de origen.

El alcance lógico mínimo conserva:

| Campo lógico          | Obligación  | Regla                                                                                                                     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `source_system`       | requerido   | identifica el sistema externo; Makos durante el alcance actual                                                            |
| `source_instance_ref` | condicional | requerido cuando el proveedor pueda reutilizar identificadores entre cuentas, empresas, tenants o ambientes               |
| `source_context_ref`  | condicional | referencia el contexto resuelto por `INT-POS-010` cuando la identidad del ítem dependa de sede u otro alcance territorial |
| `external_item_id`    | preferido   | identificador estable de ítem entregado por la fuente                                                                     |
| `external_item_name`  | evidencia   | descripción original; no es autoridad de mapping por sí sola                                                              |
| `external_category`   | evidencia   | clasificación original; no es autoridad de mapping por sí sola                                                            |

Un nombre normalizado, un código parecido o una categoría coincidente podrán servir para proponer un candidato, pero no para convertir automáticamente el candidato en mapping canónico. Si la fuente no entrega una identidad estable suficiente, el estado permanece `NOT_PROVIDED` o `PENDING_EVIDENCE`; esta tarea no fabrica una identidad sustitutiva.

---

#### 6. Contrato lógico de una instancia de mapping

Cada mapping canónico deberá poder conservar como mínimo:

| Grupo        | Campo lógico                  | Regla                                                       |
| ------------ | ----------------------------- | ----------------------------------------------------------- |
| Identidad    | `mapping_id`                  | identidad estable del mapping                               |
| Origen       | `source_system`               | sistema que declara el ítem                                 |
| Origen       | `source_instance_ref`         | instancia externa cuando aplique                            |
| Contexto     | `source_context_ref`          | contexto externo resuelto cuando aplique                    |
| Contexto     | `canonical_site_ref`          | sede Vento aplicable cuando el mapping sea territorial      |
| Ítem externo | `external_item_id`            | identificador exacto cuando exista                          |
| Ítem externo | `external_item_name`          | valor original preservado como evidencia                    |
| Ítem externo | `external_category`           | valor original preservado como evidencia                    |
| Producto     | `canonical_product_ref`       | referencia al producto maestro Vento cuando esté resuelto   |
| Producto     | `product_mapping_status`      | estado independiente de resolución de producto              |
| Presentación | `canonical_presentation_ref`  | perfil operativo de unidad cuando sea obligatorio           |
| Presentación | `presentation_mapping_status` | estado independiente de resolución de presentación          |
| Receta       | `canonical_recipe_ref`        | ficha de receta cuando sea obligatoria                      |
| Receta       | `recipe_mapping_status`       | estado independiente de resolución de receta                |
| Decisión     | `resolution_basis`            | evidencia o criterio explícito que justificó el mapping     |
| Decisión     | `mapping_version`             | versión inmutable de la decisión                            |
| Vigencia     | `effective_from`              | inicio de vigencia empresarial cuando se conozca            |
| Vigencia     | `effective_to`                | fin de vigencia cuando el mapping sea sustituido o retirado |
| Auditoría    | `resolved_by_ref`             | actor o principal autorizado que resolvió el mapping        |
| Auditoría    | `resolved_at`                 | instante de resolución                                      |
| Historia     | `supersedes_mapping_ref`      | mapping anterior cuando exista sucesión                     |

Los nombres físicos finales de campos, tipos compartidos y almacenamiento pertenecen a su fase de implementación. Esta tarea fija semántica y obligaciones, no DDL.

---

#### 7. Estados de resolución

Cada plano de producto, presentación y receta utilizará uno de los siguientes estados conceptuales:

| Estado             | Significado                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `RESOLVED`         | existe exactamente una identidad interna válida y la evidencia acredita el vínculo                   |
| `NOT_APPLICABLE`   | el plano no es necesario para la semántica de esa línea y la decisión está explícitamente acreditada |
| `PENDING_EVIDENCE` | falta evidencia suficiente para decidir                                                              |
| `NOT_PROVIDED`     | la fuente no entregó la identidad o atributo necesario                                               |
| `AMBIGUOUS`        | más de un destino plausible permanece sin criterio suficiente para escoger uno                       |
| `CONFLICT`         | las fuentes o reglas vigentes producen destinos incompatibles                                        |
| `INACTIVE`         | el mapping dejó de admitir nuevas líneas, conservando su historia                                    |

`NULL`, cadena vacía, coincidencia aproximada o ausencia silenciosa no equivalen a `NOT_APPLICABLE` ni a `RESOLVED`.

---

#### 8. Mapping hacia producto Vento

El producto es el primer destino obligatorio para cualquier línea que pueda producir efectos dependientes de producto.

Un producto solo queda `RESOLVED` cuando:

1. la identidad externa y su alcance están suficientemente acreditados;
2. existe exactamente un `product_id` interno compatible;
3. el producto pertenece al catálogo maestro vigente de Vento;
4. cuando la venta sea territorial, el producto es compatible con la sede canónica aplicable;
5. no existe otro mapping vigente para la misma identidad externa y el mismo alcance que apunte a un producto distinto;
6. la resolución conserva evidencia y versión.

La coincidencia con un `catalog_item_id` puede participar en la resolución, pero el ítem comercial no sustituye el `product_id`. El destino maestro continúa siendo el producto Vento.

---

#### 9. Relación con el catálogo comercial

El catálogo comercial y el producto maestro cumplen responsabilidades diferentes:

- `pass.catalog_items` representa un ítem comercial vendible por sede;
- su `product_id` referencia el producto maestro cuando existe el vínculo;
- un mapping externo puede utilizar un ítem comercial como evidencia o enlace intermedio;
- la existencia de un ítem comercial no autoriza asumir una presentación operativa ni una receta;
- un cambio de nombre, orden, imagen, categoría comercial o presentación visual no cambia por sí solo la identidad del producto maestro.

Cuando un ítem comercial sea utilizado como parte del mapping, deberá pertenecer a la sede aplicable y resolver a un único producto maestro compatible.

---

#### 10. Mapping hacia presentación operativa

Para este contrato, una presentación operativa corresponde a una identidad de `product_uom_profiles` o al contrato que canónicamente lo sustituya en el futuro. Conserva una forma concreta de expresar y convertir una cantidad del producto hacia su unidad de stock.

La presentación es `REQUIRED` cuando la unidad vendida, empaque, porción o equivalencia del ítem externo modifica la cantidad física que representa una unidad de venta.

Solo queda `RESOLVED` cuando:

1. pertenece al mismo producto ya resuelto;
2. existe una única presentación aplicable a la unidad vendida;
3. su equivalencia entre unidad de entrada y unidad de stock está definida;
4. la presentación es válida para el contexto de uso correspondiente;
5. ninguna heurística de nombre o valor predeterminado sustituye la decisión explícita.

Puede quedar `NOT_APPLICABLE` únicamente cuando la línea ya expresa de manera inequívoca la cantidad en la unidad canónica que necesita el efecto posterior y no existe una presentación diferenciada que deba preservarse.

El indicador `is_default` de una presentación no autoriza por sí solo a escogerla para un ítem externo.

---

#### 11. Mapping hacia receta

La receta es condicional. No todo producto vendido requiere descontar componentes de receta.

Cuando una línea dependa de preparación por receta, el mapping deberá resolver una ficha de receta canónica compatible con:

- el producto resuelto;
- la sede canónica aplicable;
- el uso de receta aprobado para esa sede;
- la vigencia y estado de la receta;
- la semántica de cantidad y rendimiento necesaria para el efecto posterior.

La referencia canónica será la identidad estable de la ficha de receta, actualmente representada por `recipe_cards.id`; sus componentes permanecen en el conjunto de receta asociado al producto y su uso territorial se gobierna por `recipe_site_uses`.

Un `product_id` con componentes de receta no basta por sí solo para declarar `RESOLVED` una receta si existen múltiples usos, contextos o decisiones posibles.

Cuando la venta corresponda a producto terminado almacenado, ingrediente directo o una línea sin efecto de inventario, la receta podrá quedar `NOT_APPLICABLE` de manera explícita. La ejecución concreta de inventario permanece fuera de esta tarea.

---

#### 12. Matriz de suficiencia del mapping

| Producto               | Presentación requerida  | Receta requerida        | Resultado de mapping | Elegibilidad para efectos dependientes de mapping |
| ---------------------- | ----------------------- | ----------------------- | -------------------- | ------------------------------------------------- |
| `RESOLVED`             | no                      | no                      | `COMPLETE`           | elegible para continuar a las puertas posteriores |
| `RESOLVED`             | sí y `RESOLVED`         | no                      | `COMPLETE`           | elegible para continuar a las puertas posteriores |
| `RESOLVED`             | no                      | sí y `RESOLVED`         | `COMPLETE`           | elegible para continuar a las puertas posteriores |
| `RESOLVED`             | sí y `RESOLVED`         | sí y `RESOLVED`         | `COMPLETE`           | elegible para continuar a las puertas posteriores |
| distinto de `RESOLVED` | cualquiera              | cualquiera              | `INCOMPLETE`         | bloqueada                                         |
| `RESOLVED`             | requerida y no resuelta | cualquiera              | `INCOMPLETE`         | bloqueada                                         |
| `RESOLVED`             | cualquiera              | requerida y no resuelta | `INCOMPLETE`         | bloqueada                                         |

Una línea `INCOMPLETE` se conserva con su procedencia y pasa al tratamiento de `INT-POS-012`; no se corrige mediante sustitución silenciosa ni fallback a un producto parecido.

---

#### 13. Coincidencias automáticas y sugerencias

La implementación existente distingue coincidencia por mapping explícito, código y nombre. Esta tarea fija el siguiente tratamiento canónico:

| Evidencia encontrada                                      | Tratamiento canónico                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| mapping explícito vigente por identidad externa y alcance | candidato a `RESOLVED`, sujeto a consistencia de producto, presentación y receta |
| coincidencia exacta de código con catálogo comercial      | `CANDIDATE_ONLY`; requiere resolución explícita antes de producir efectos        |
| coincidencia de nombre normalizado                        | `CANDIDATE_ONLY`; requiere resolución explícita antes de producir efectos        |
| coincidencia de categoría                                 | `CANDIDATE_ONLY`; nunca resuelve producto por sí sola                            |
| ninguna coincidencia                                      | `PENDING_EVIDENCE`                                                               |
| dos o más destinos plausibles                             | `AMBIGUOUS`                                                                      |
| evidencia incompatible con un mapping vigente             | `CONFLICT`                                                                       |

`matched_code` y `matched_name` de la implementación legacy no se interpretarán como prueba canónica suficiente de mapping solo por ese estado técnico.

---

#### 14. Línea base física vigente

La implementación existente proporciona una base parcial:

1. `pulso_external_sales_item_mappings` relaciona `site_id + source + external_item_id` con `catalog_item_id` y deriva `product_id` desde el ítem comercial de la misma sede.
2. La unicidad actual evita dos mappings simultáneos para el mismo `site_id + source + external_item_id` y evita reutilizar el mismo ítem comercial dentro del mismo `site_id + source`.
3. `pulso_daily_sales_import_rows` conserva `external_item_id`, nombre, categoría, cantidad, `catalog_item_id`, `product_id` y un estado técnico de coincidencia.
4. La interfaz actual intenta primero un mapping explícito por identificador externo y después puede sugerir coincidencias por código o nombre.
5. El mapping físico actual no conserva una referencia de presentación operativa.
6. El mapping físico actual no conserva una referencia de ficha de receta.
7. Las reglas actuales de consumo de ventas separan modos de producto terminado, preparación por receta, ingrediente directo y ausencia de inventario, pero esas reglas no sustituyen el contrato de mapping aquí definido.

Esta base es reutilizable como evidencia de implementación existente, pero no se declara equivalente al contrato objetivo completo.

---

#### 15. Inventario real de mappings disponible para esta tarea

La evidencia remota disponible al cierre documental contiene:

| Conjunto                                | Instancias observables | Decisión de esta tarea                                                                                                    |
| --------------------------------------- | ---------------------: | ------------------------------------------------------------------------------------------------------------------------- |
| mappings externos almacenados           |                      0 | no existen identidades externas materializadas que puedan declararse `RESOLVED`                                           |
| líneas de importación almacenadas       |                      0 | no existe un conjunto de ítems Makos persistidos que permita construir una matriz individual sin inventar datos           |
| reglas de consumo de ventas almacenadas |                      0 | no existe una regla operativa remota que acredite receta, presentación o tratamiento físico para una línea Makos concreta |

Por tanto:

- total de identidades externas observables que exigen decisión individual en esta tarea: **0**;
- total de mappings individuales declarados `RESOLVED`: **0**;
- faltantes respecto del conjunto observable: **0**;
- duplicados dentro del conjunto observable: **0**.

No se crean mappings ficticios para completar una matriz vacía. Las primeras identidades reales deberán resolverse con este contrato durante `INT-POS-021`, antes de habilitar efectos internos.

---

#### 16. Vigencia, cambios y conservación histórica

1. Un mapping nuevo no modifica el payload original de una venta ya recibida.
2. Un cambio de destino crea una nueva versión o sucesión; no edita destructivamente la decisión histórica.
3. La vigencia se evalúa contra el momento empresarial de la venta cuando ese momento esté acreditado, no contra la hora en que un operador revisó el mapping.
4. Un mapping inactivo no acepta nuevas líneas, pero continúa disponible para reconstruir historia.
5. Una reactivación no puede reutilizar silenciosamente una identidad para un destino semánticamente distinto.
6. Una venta histórica recibida después podrá usar un mapping aplicable a su periodo únicamente si la vigencia y la evidencia lo permiten.
7. Las diferencias detectadas entre mapping histórico, mapping actual y efectos ya aplicados se tratan mediante `INT-POS-020`; no se corrigen reescribiendo la línea original.

---

#### 17. Reglas de bloqueo

Una línea permanece no elegible para efectos automáticos dependientes de mapping cuando ocurra al menos una de estas condiciones:

- no existe identidad externa suficiente;
- el contexto requerido por `INT-POS-010` no está resuelto;
- el producto está `PENDING_EVIDENCE`, `NOT_PROVIDED`, `AMBIGUOUS`, `CONFLICT` o `INACTIVE` para nuevas líneas;
- la presentación es obligatoria y no está `RESOLVED`;
- la receta es obligatoria y no está `RESOLVED`;
- el destino interno no pertenece al producto o sede aplicables;
- la equivalencia de cantidad requerida por la presentación no está acreditada;
- el uso territorial de una receta no está acreditado;
- el mapping aplicable por vigencia no puede determinarse sin inferencia;
- una coincidencia legacy por código o nombre no ha sido convertida en una decisión explícita.

El bloqueo conserva la línea y su evidencia. `INT-POS-012` define su cuarentena y salida segura.

---

#### 18. Propiedad y fronteras

- Makos declara sus identidades y datos; no crea productos, presentaciones ni recetas en Vento.
- El adaptador transforma y relaciona; no adquiere propiedad del catálogo maestro.
- PULSO consume el mapping para construir la venta canónica; no redefine unilateralmente productos maestros.
- NEXO conserva autoridad sobre el efecto físico de inventario que corresponda.
- FOGO conserva los contratos de receta y producción que correspondan.
- PASS conserva su experiencia comercial y fidelización sin convertir un ítem comercial en producto maestro por inferencia.
- NUMERA conserva sus efectos económicos propios.
- Una credencial del POS externo no concede capacidad de modificar ninguno de esos dominios.

---

#### 19. Handoffs exactos

| Materia restante                                                                | Tarea propietaria |
| ------------------------------------------------------------------------------- | ----------------- |
| cuarentena y liberación de líneas con mapping incompleto                        | `INT-POS-012`     |
| idempotencia por sistema, venta y línea                                         | `INT-POS-013`     |
| transporte por webhook o polling                                                | `INT-POS-014`     |
| emisión de la venta validada                                                    | `INT-POS-015`     |
| efecto físico exactamente una vez                                               | `INT-POS-016`     |
| efecto económico                                                                | `INT-POS-017`     |
| fidelización                                                                    | `INT-POS-018`     |
| compensación                                                                    | `INT-POS-019`     |
| conciliación de diferencias                                                     | `INT-POS-020`     |
| primeras identidades reales, comprobación del mapping y suficiencia sin efectos | `INT-POS-021`     |
| piloto con efectos habilitados                                                  | `INT-POS-022`     |
| transición de fuente hacia PULSO                                                | `INT-POS-023`     |
| retiro o reducción de credenciales externas                                     | `INT-POS-024`     |

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 20. Decisiones congeladas

1. El mapping canónico separa ítem externo, ítem comercial, producto maestro, presentación operativa y receta.
2. El producto maestro es obligatorio para cualquier efecto dependiente de producto.
3. La presentación es condicional y usa la identidad operativa de unidad del producto, no la configuración visual de PASS.
4. La receta es condicional y, cuando aplica, referencia una ficha de receta compatible con producto y sede.
5. Producto, presentación y receta tienen estados de resolución independientes.
6. `NOT_APPLICABLE` es una decisión explícita y no un valor ausente.
7. Coincidencias por código, nombre o categoría son candidatos y no autoridad suficiente para efectos automáticos.
8. Un mapping explícito conserva alcance, versión, evidencia, vigencia y sucesión.
9. Los cambios de mapping no reescriben líneas históricas ni payload original.
10. Un mapping incompleto conserva la línea pero bloquea efectos automáticos dependientes de mapping.
11. El contexto territorial se hereda del mapping aprobado en `INT-POS-010` y no se reconstruye desde el producto.
12. El mapping del POS externo no crea ni modifica productos, presentaciones o recetas maestras.
13. La implementación legacy actual es una base parcial y no demuestra por sí sola el contrato objetivo completo.
14. La evidencia remota actual contiene cero mappings externos y cero líneas importadas; por tanto no existe una matriz individual real que pueda completarse sin inventar datos.
15. Las primeras identidades reales se validarán bajo este contrato en `INT-POS-021` antes de habilitar efectos.
16. La cuarentena de mappings incompletos pertenece exclusivamente a `INT-POS-012`.
17. Esta tarea no modifica código, datos, esquema, migraciones, configuración ni credenciales.
18. La continuidad inmediata queda reservada exclusivamente para `INT-POS-012`.

---

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el comportamiento verificable de esta tarea ya está protegido por la cobertura canónica vigente que exige mapping explícito del identificador externo hacia producto, presentación y receta cuando corresponda, bloqueo de líneas sin mapping, trazabilidad de transformaciones externas y transición del POS mediante mapping y cuarentena. Esta tarea especializa ese comportamiento para Makos sin introducir una obligación de prueba nueva ni modificar una existente.

---

#### Cobertura de prueba existente preservada

Se preserva la cobertura vigente para:

- mapping explícito de identificadores externos hacia producto, presentación y receta cuando corresponda;
- prohibición de efectos automáticos para líneas sin mapping suficiente;
- correlación e idempotencia de efectos físicos posteriores;
- transición del POS externo mediante staging, mapping, cuarentena e idempotencia;
- auditoría de transformaciones y mappings en intercambios externos.

---

#### Criterios de aceptación

1. Se define un contrato único de mapping de ítem externo.
2. Se separan explícitamente ítem externo, ítem comercial, producto maestro, presentación operativa y receta.
3. Se identifica `public.products.id` como destino maestro de producto de la implementación actual.
4. Se identifica `product_uom_profiles` como identidad operativa actual de presentación física o unidad.
5. Se excluye explícitamente `pass.catalog_item_presentation` del significado de presentación física.
6. Se identifica la ficha de receta como identidad canónica de receta cuando corresponda.
7. El mapping queda contextualizado por sistema, instancia y alcance territorial cuando sean necesarios.
8. Nombre, código y categoría quedan limitados a evidencia o sugerencia, no a resolución automática suficiente.
9. Producto, presentación y receta tienen estados de resolución independientes.
10. `NOT_APPLICABLE` requiere decisión explícita.
11. Se define cuándo la presentación es obligatoria.
12. Se define cuándo la receta es obligatoria.
13. Se prohíbe escoger una presentación únicamente por ser predeterminada.
14. Se exige compatibilidad entre presentación y producto.
15. Se exige compatibilidad entre receta, producto y sede cuando aplique.
16. Se define la suficiencia completa del mapping antes de efectos dependientes.
17. Se preserva una línea incompleta sin convertirla en producto por fallback.
18. Se clasifica la coincidencia legacy por código o nombre como candidato no suficiente por sí solo.
19. Se conserva historia y vigencia de cambios de mapping.
20. Se prohíbe que una nueva versión reescriba una línea histórica o el payload original.
21. Se reconcilia la implementación física actual con el contrato objetivo sin declararla completa.
22. Se materializa el inventario real disponible: cero identidades externas observables y cero mappings individuales resolubles sin inventar datos.
23. Todo bloqueo queda asignado a una tarea posterior exacta y a una condición de salida verificable.
24. Se generan cero cambios de requisitos de prueba por existir cobertura canónica exacta.
25. No se modifica código, datos, esquema, migraciones, configuración, credenciales ni estado remoto.
26. La continuidad queda definida exclusivamente como `INT-POS-010 → INT-POS-011 → INT-POS-012`.

---

#### Continuidad

**ÚLTIMA TAREA APROBADA:** `INT-POS-010 — Definir mapeo de empresa, sede, terminal y caja externa`

**TAREA ACTUAL APROBADA:** `INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta`

**SIGUIENTE TAREA RESERVADA:** `INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario`


### ✅ INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta`
**Tarea siguiente:** `INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`
**Tipo de tarea:** documental — contrato de cuarentena, bloqueo de efectos físicos y liberación segura de líneas de venta con mapping incompleto
**Bloque:** X — Integraciones y contratos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Sistema externo temporal:** Makos / `EXT-SYS-013`
**Fuente demostrada actualmente:** `makos_excel`
**Fase:** exclusivamente documental
**Implementación técnica:** no autorizada en esta tarea
**Cambios de datos o esquema:** no autorizados en esta tarea

---

#### 1. Propósito

Definir el tratamiento canónico de una línea procedente del POS externo cuando el mapping exigido por `INT-POS-011` no sea suficiente para identificar de forma segura el producto Vento y, cuando correspondan, su presentación operativa y su receta.

La línea deberá conservarse como hecho recibido y quedar aislada de cualquier efecto físico dependiente de producto hasta que exista una resolución explícita, versionada y auditable.

Regla raíz:

```text
LÍNEA EXTERNA RECIBIDA
        ↓
PROCEDENCIA PRESERVADA
        ↓
EVALUACIÓN DE MAPPING
        ├── COMPLETE → continúa a las puertas posteriores
        └── INCOMPLETE → CUARENTENA DE LÍNEA
                              ↓
                     CERO EFECTO DE INVENTARIO
                              ↓
               RESOLUCIÓN EXPLÍCITA DEL MAPPING
                              ↓
                 LIBERACIÓN AUDITADA DE LA LÍNEA
                              ↓
               EFECTO FÍSICO SOLO EN INT-POS-016
```

La cuarentena no corrige la línea, no crea un producto sustituto, no convierte una coincidencia aproximada en mapping y no representa por sí sola una cancelación comercial.

---

#### 2. Base canónica heredada

Esta tarea conserva sin reinterpretar las siguientes decisiones aprobadas:

1. Makos es la fuente temporal de las ventas originadas dentro de su alcance hasta el corte controlado hacia PULSO.
2. Venta, línea, pago, reverso, documento fiscal, efecto físico, fidelización y efecto económico permanecen como hechos separados.
3. La venta y cada línea conservan su procedencia y su representación histórica aunque todavía no sean elegibles para producir efectos internos.
4. `INT-POS-009` gobierna payload original, versión, hash, recepción y localizador de procedencia.
5. `INT-POS-010` gobierna el contexto externo de empresa, sede, terminal y caja y no puede reconstruirse desde el producto.
6. `INT-POS-011` gobierna el mapping entre ítem externo, producto Vento, presentación y receta mediante decisiones explícitas y versionadas.
7. Un resultado `INCOMPLETE` de `INT-POS-011` bloquea cualquier efecto automático dependiente de ese mapping.
8. Coincidencias legacy por código o nombre son `CANDIDATE_ONLY` y no equivalen a mapping canónico suficiente.
9. Una línea sin mapping suficiente no puede descontar inventario, costo ni fidelización automáticamente.
10. NEXO conserva autoridad sobre el efecto físico de inventario; el adaptador, el staging y PULSO no adquieren esa propiedad por recibir la venta.
11. La idempotencia transversal se define en `INT-POS-013` y el efecto físico exactamente una vez se define en `INT-POS-016`.
12. Las diferencias entre hechos, mappings y efectos se concilian en `INT-POS-020` sin reescribir historia.

---

#### 3. Resultado material

Queda definido el contrato lógico `EXTERNAL-SALE-LINE-QUARANTINE-001`.

Su unidad de decisión es **una línea canónica de venta**, no el archivo, el lote, la venta completa, el producto, la sede ni una regla de consumo.

El contrato cumple simultáneamente cuatro funciones:

| Función      | Decisión canónica                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Preservación | la línea y su procedencia permanecen disponibles aunque el mapping sea incompleto                                        |
| Aislamiento  | la línea no puede producir efectos físicos dependientes de producto mientras la cuarentena esté activa                   |
| Resolución   | el bloqueo conserva razones concretas vinculadas a los planos de mapping que faltan o presentan conflicto                |
| Liberación   | la línea solo sale de cuarentena mediante una decisión reproducible que demuestre mapping suficiente y conserve historia |

La cuarentena es una **puerta de seguridad**. No es un catálogo paralelo, un estado comercial de la venta ni una forma de borrar filas problemáticas.

---

#### 4. Alcance de la cuarentena

La cuarentena se aplica por línea.

Una línea entra en cuarentena cuando su evaluación vigente bajo `EXTERNAL-SALE-ITEM-MAPPING-001` produce `INCOMPLETE` o cuando no puede demostrarse qué mapping era aplicable sin inferencia.

La existencia de una línea en cuarentena:

- no elimina la venta;
- no elimina la línea;
- no modifica el payload original;
- no obliga por sí sola a marcar la venta como `CANCELLED`;
- no convierte el lote completo en un nuevo hecho empresarial;
- no autoriza descartar importes, impuestos, descuentos, pagos o referencias de la línea;
- no autoriza producir un efecto físico parcial sobre esa misma línea;
- no declara automáticamente inválidas las líneas hermanas que sí tengan mapping suficiente.

La elegibilidad de la venta o de otras líneas para eventos y efectos posteriores continúa bajo sus tareas propietarias. Esta tarea solo fija que **la línea cuarentenada queda cerrada para cualquier efecto dependiente de su producto hasta su liberación**.

---

#### 5. Condiciones de entrada obligatoria

Una línea deberá entrar o permanecer en cuarentena cuando ocurra al menos una de estas condiciones:

| Condición                                               | Evidencia heredada                                                                           | Resultado  |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------- |
| identidad externa insuficiente para resolver el ítem    | `external_item_id` ausente o alcance insuficiente cuando sea necesario                       | cuarentena |
| producto no resuelto                                    | `product_mapping_status` distinto de `RESOLVED`                                              | cuarentena |
| presentación obligatoria no resuelta                    | presentación requerida y `presentation_mapping_status` distinto de `RESOLVED`                | cuarentena |
| receta obligatoria no resuelta                          | receta requerida y `recipe_mapping_status` distinto de `RESOLVED`                            | cuarentena |
| contexto requerido para resolver el mapping no resuelto | dependencia de `INT-POS-010` no satisfecha                                                   | cuarentena |
| más de un destino plausible                             | estado `AMBIGUOUS`                                                                           | cuarentena |
| evidencia incompatible                                  | estado `CONFLICT`                                                                            | cuarentena |
| mapping no aplicable al momento comercial de la línea   | vigencia no demostrable o mapping `INACTIVE` para nuevas líneas fuera de su periodo          | cuarentena |
| coincidencia legacy sin decisión explícita              | `matched_code`, `matched_name` u otra coincidencia equivalente sin mapping aprobado          | cuarentena |
| candidato de catálogo sin suficiencia integral          | `catalog_item_id` sugerido pero falta producto, presentación, receta o evidencia obligatoria | cuarentena |

`NULL`, cadena vacía, valor predeterminado, coincidencia aproximada, categoría o selección automática no sustituyen ninguna de estas decisiones.

---

#### 6. Razones canónicas de cuarentena

Cada decisión de cuarentena conservará una o varias razones cerradas de negocio para explicar qué impide la liberación:

| Razón                             | Significado                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `EXTERNAL_IDENTITY_INSUFFICIENT`  | la identidad externa o su alcance no permiten resolver inequívocamente el ítem                                    |
| `SOURCE_CONTEXT_UNRESOLVED`       | falta el contexto requerido para seleccionar el mapping correcto                                                  |
| `PRODUCT_MAPPING_UNRESOLVED`      | el producto maestro no está `RESOLVED`                                                                            |
| `PRESENTATION_MAPPING_UNRESOLVED` | una presentación obligatoria no está `RESOLVED`                                                                   |
| `RECIPE_MAPPING_UNRESOLVED`       | una receta obligatoria no está `RESOLVED`                                                                         |
| `MAPPING_AMBIGUOUS`               | existen dos o más destinos plausibles sin criterio suficiente                                                     |
| `MAPPING_CONFLICT`                | las evidencias o decisiones vigentes resultan incompatibles                                                       |
| `MAPPING_NOT_EFFECTIVE`           | no puede demostrarse una revisión aplicable al momento comercial del hecho                                        |
| `LEGACY_CANDIDATE_ONLY`           | existe coincidencia técnica por código, nombre, categoría u otra heurística, pero no decisión canónica suficiente |

Las razones anteriores describen la insuficiencia del mapping. No deben reutilizarse para representar stock insuficiente, fallo de transporte, timeout, duplicidad, devolución, error contable o cualquier otra condición con propietaria distinta.

---

#### 7. Estado lógico de la cuarentena

Cada instancia de cuarentena utilizará uno de estos estados conceptuales:

| Estado     | Significado                                                                              | Efecto permitido                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ACTIVE`   | la línea continúa sin mapping suficiente o existe un conflicto que impide liberarla      | ningún efecto dependiente de producto                                                |
| `RELEASED` | una decisión posterior demostró mapping `COMPLETE` y se registró la salida de cuarentena | solo queda elegible para las puertas posteriores; no ejecuta inventario por sí misma |

No existe un estado implícito de liberación por desaparición del error, edición de una celda, creación de una regla legacy o cambio de nombre.

Una cuarentena histórica liberada permanece visible como parte de la trazabilidad de la línea.

---

#### 8. Contrato lógico mínimo de una instancia

Cada instancia de `EXTERNAL-SALE-LINE-QUARANTINE-001` deberá poder conservar como mínimo:

| Grupo        | Campo lógico                | Regla                                                                                                  |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| Identidad    | `quarantine_id`             | identidad estable de la decisión de cuarentena                                                         |
| Línea        | `canonical_sale_ref`        | venta canónica a la que pertenece la línea                                                             |
| Línea        | `canonical_sale_line_ref`   | línea exacta afectada                                                                                  |
| Origen       | `source_system`             | sistema que declaró la línea                                                                           |
| Origen       | `source_instance_ref`       | instancia externa cuando sea necesaria para evitar colisiones                                          |
| Procedencia  | `source_receipt_ref`        | recepción preservada por `INT-POS-009`                                                                 |
| Procedencia  | `source_fragment_ref`       | fragmento, fila o elemento que sustenta la línea cuando exista                                         |
| Ítem externo | `external_item_id`          | identidad exacta cuando la fuente la haya entregado                                                    |
| Contexto     | `source_context_ref`        | referencia de contexto usada para evaluar el mapping cuando aplique                                    |
| Contexto     | `canonical_site_ref`        | sede Vento aplicable cuando esté resuelta                                                              |
| Mapping      | `mapping_ref`               | mapping evaluado cuando exista una instancia identificable                                             |
| Mapping      | `mapping_version`           | versión del mapping usada para la decisión                                                             |
| Mapping      | `mapping_result`            | snapshot `COMPLETE` o `INCOMPLETE` correspondiente a la evaluación                                     |
| Mapping      | `mapping_status_snapshot`   | estados de producto, presentación y receta que sustentan el resultado                                  |
| Bloqueo      | `quarantine_reasons`        | una o varias razones canónicas de la sección anterior                                                  |
| Bloqueo      | `quarantine_status`         | `ACTIVE` o `RELEASED`                                                                                  |
| Tiempo       | `quarantined_at`            | instante técnico en que Vento materializa la decisión de cuarentena; no sustituye el momento comercial |
| Auditoría    | `quarantined_by_ref`        | principal técnico o actor autorizado responsable de la decisión cuando aplique                         |
| Historia     | `quarantine_version`        | versión inmutable de la decisión                                                                       |
| Historia     | `supersedes_quarantine_ref` | revisión anterior cuando una nueva evaluación requiera sucesión                                        |
| Liberación   | `release_mapping_ref`       | mapping que demostró suficiencia cuando se libera                                                      |
| Liberación   | `release_mapping_version`   | versión exacta usada para liberar                                                                      |
| Liberación   | `release_basis`             | evidencia reproducible de que el bloqueo dejó de aplicar                                               |
| Liberación   | `released_at`               | instante de liberación, separado del momento de venta y del eventual efecto físico                     |
| Liberación   | `released_by_ref`           | principal o proceso autorizado que materializó la liberación                                           |

Los nombres físicos, tablas, índices, RLS, RPC, tipos compartidos y almacenamiento quedan para su fase de implementación. Esta tarea fija la semántica, no DDL.

---

#### 9. Puerta absoluta de inventario

Mientras una cuarentena esté `ACTIVE`, la línea tiene una puerta física cerrada.

Queda prohibido que esa línea:

1. genere un movimiento `sale_out` o equivalente;
2. reste `inventory_stock_by_site` o cualquier proyección equivalente;
3. reste `inventory_stock_by_location` o cualquier proyección equivalente;
4. descuente producto terminado almacenado;
5. consuma ingredientes por receta;
6. descuente un ingrediente directo;
7. use una presentación por defecto para calcular cantidad;
8. use una receta por defecto para calcular componentes;
9. utilice una categoría como sustituto del producto resuelto;
10. utilice una coincidencia por código o nombre como autorización suficiente;
11. produzca un posting físico parcial sobre la misma línea;
12. se marque como físicamente aplicada por el solo hecho de haber sido importada, validada o revisada.

La ausencia de mapping tampoco puede transformarse en `no_inventory` como fallback. `no_inventory` solo es válido cuando la semántica empresarial correspondiente esté resuelta de forma explícita y no sea un mecanismo para evitar el bloqueo.

---

#### 10. Separación entre cuarentena e ingestión

La cuarentena ocurre después de preservar la línea recibida y no impide conservar evidencia.

Por tanto:

```text
LÍNEA RECIBIDA
≠
LÍNEA ELEGIBLE PARA INVENTARIO
```

```text
LÍNEA IMPORTADA
≠
LÍNEA LIBERADA
```

```text
LÍNEA VALIDADA TÉCNICAMENTE
≠
MAPPING COMPLETE
```

Una línea podrá existir en staging o en la representación canónica preservada mientras su cuarentena permanezca `ACTIVE`.

Los importes y hechos no dependientes de producto se conservan bajo los contratos de `INT-POS-005` a `INT-POS-009`; esta tarea no los descarta ni les concede efectos que pertenezcan a `INT-POS-015`, `INT-POS-017` o `INT-POS-018`.

---

#### 11. Condiciones de liberación

Una cuarentena solo podrá pasar de `ACTIVE` a `RELEASED` cuando se demuestren simultáneamente estas condiciones:

1. la venta y la línea originales continúan identificables y su procedencia sigue correlacionada;
2. el contexto requerido para escoger el mapping correcto está resuelto;
3. el mapping aplicable a la línea produce `COMPLETE` bajo `INT-POS-011`;
4. `product_mapping_status = RESOLVED`;
5. toda presentación obligatoria está `RESOLVED`;
6. toda receta obligatoria está `RESOLVED`;
7. los planos que no apliquen están acreditados como `NOT_APPLICABLE` y no simplemente ausentes;
8. no permanece un estado `AMBIGUOUS`, `CONFLICT`, `PENDING_EVIDENCE`, `NOT_PROVIDED` o una coincidencia `CANDIDATE_ONLY` en un plano obligatorio;
9. se identifica la versión exacta del mapping y su vigencia aplicable al momento comercial de la venta;
10. la liberación conserva `release_basis`, versión, responsable y momento;
11. no existe evidencia de que la misma línea ya haya producido un efecto físico incompatible o bajo otra resolución; si existe, la salida pasa a conciliación en `INT-POS-020`;
12. cualquier efecto posterior deberá atravesar la idempotencia de `INT-POS-013` y la puerta física de `INT-POS-016`.

La liberación **no descuenta inventario**. Únicamente cambia la elegibilidad de la línea para las puertas posteriores.

---

#### 12. Liberación automática y resolución humana

La salida de cuarentena podrá ser materializada automáticamente únicamente cuando una reevaluación determinista encuentre un mapping explícito, vigente y `COMPLETE` cuya evidencia ya esté aprobada y no exista conflicto.

Cuando la resolución exija criterio humano:

- el actor deberá estar autorizado por el contrato propietario que se materialice para administrar mappings;
- la decisión deberá quedar vinculada al mapping creado o corregido;
- la evidencia y la razón deberán quedar auditadas;
- la línea no se editará para simular que siempre estuvo resuelta;
- una acción manual no podrá crear un movimiento de inventario directamente desde la cuarentena.

El contrato de cuarentena no crea un permiso nuevo ni define todavía el nombre de una acción administrativa o superficie de interfaz.

---

#### 13. Mapping histórico y vigencia

La línea se libera con el mapping que sea demostrablemente aplicable a su momento empresarial.

Reglas:

1. un mapping creado hoy no se aplica retroactivamente por defecto a todas las líneas históricas;
2. una relación con `effective_from` y `effective_to` debe evaluarse contra el momento comercial acreditado de la línea;
3. una decisión retroactiva requiere evidencia explícita de que la relación también era válida para ese periodo;
4. una nueva versión del mapping no reescribe la cuarentena histórica;
5. una línea recibida tarde puede liberarse con un mapping histórico válido si su vigencia está demostrada;
6. si no puede determinarse la revisión aplicable, la cuarentena continúa `ACTIVE`;
7. si la línea ya produjo un efecto y un remapping posterior cambia su interpretación, no se libera ni compensa automáticamente: se deriva a `INT-POS-020` y, cuando corresponda, a `INT-POS-019`.

---

#### 14. Concurrencia con anulaciones, devoluciones y reembolsos

Una línea en cuarentena puede coexistir con señales de reverso definidas en `INT-POS-008`.

Reglas:

- una devolución no resuelve el mapping pendiente de la línea original;
- un reembolso no convierte la línea en `no_inventory`;
- una cancelación comercial no borra la cuarentena histórica;
- si un efecto físico nunca ocurrió por la cuarentena, no se fabricará una compensación de inventario;
- si existe duda sobre si un efecto físico ocurrió, la línea no se compensa por inferencia y pasa a `INT-POS-020`;
- cualquier compensación real deberá conservar referencia al efecto original y pertenecer a `INT-POS-019`.

---

#### 15. Tratamiento de la implementación legacy vigente

La línea base física existente constituye una base parcial, pero no equivale al contrato objetivo.

| Componente vigente                            | Comportamiento observado                                                                                          | Clasificación canónica                                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `pulso_daily_sales_import_rows.match_status`  | admite `matched_mid`, `matched_code`, `matched_name` y `unmatched`                                                | estado técnico legacy; código y nombre no son mapping suficiente                                   |
| `pulso_daily_sales_import_rows.row_status`    | admite `draft`, `validated`, `posted`, `cancelled`                                                                | no contiene un estado canónico de cuarentena                                                       |
| importador `makos_excel`                      | contabiliza `matched_code` y `matched_name` como filas coincidentes                                               | no debe interpretarse como autorización canónica de efectos                                        |
| `pulso_sales_import_rows_pending_consumption` | expone `missing_catalog_item` o `missing_consumption_rule`                                                        | vista de diagnóstico; no conserva una instancia histórica de cuarentena ni una liberación auditada |
| `pulso_post_daily_sales_import`               | omite dentro del recorrido líneas con catálogo o regla faltante y finalmente rechaza el lote si quedan errores    | guardia física legacy más estricta por lote; no equivale a cuarentena persistente por línea        |
| reglas por categoría                          | pueden participar en selección de consumo después de existir un ítem comercial                                    | no sustituyen mapping explícito de producto, presentación o receta                                 |
| posting legacy                                | puede producir `sale_out` y actualizar stock por sede y ubicación cuando las guardias técnicas permiten continuar | deberá respetar la puerta canónica antes de un piloto con efectos                                  |

Consecuencia crítica:

`matched_code` y `matched_name` no pueden seguir tratándose como autorización suficiente para inventario bajo el contrato objetivo. Una línea que solo posea esa evidencia debe quedar `ACTIVE` en cuarentena hasta que exista mapping explícito suficiente.

Esta tarea no modifica la implementación legacy.

---

#### 16. Estado remoto observable al cierre documental

La evidencia remota verificada para `vento-os-dev` contiene:

| Conjunto                                    | Instancias observables |
| ------------------------------------------- | ---------------------: |
| mappings externos almacenados               |                      0 |
| líneas de importación almacenadas           |                      0 |
| reglas de consumo almacenadas               |                      0 |
| postings de inventario de ventas importadas |                      0 |
| líneas expuestas como pendientes de consumo |                      0 |

Por tanto:

- líneas reales que actualmente requieren una decisión individual de cuarentena: **0**;
- cuarentenas reales materializables sin inventar datos: **0**;
- liberaciones históricas observables: **0**;
- postings reales que deban conciliarse por esta tarea: **0**.

No se crean filas ficticias ni ejemplos operativos para completar una matriz inexistente. Las primeras líneas reales deberán demostrar este contrato durante `INT-POS-021` antes de habilitar efectos en `INT-POS-022`.

---

#### 17. Matriz de decisión por línea

| Mapping de producto                                                | Presentación requerida  | Receta requerida        | Estado de cuarentena | Efecto físico de la línea                             |
| ------------------------------------------------------------------ | ----------------------- | ----------------------- | -------------------- | ----------------------------------------------------- |
| `RESOLVED`                                                         | no                      | no                      | no requerida         | sujeto a puertas posteriores                          |
| `RESOLVED`                                                         | sí y `RESOLVED`         | no                      | no requerida         | sujeto a puertas posteriores                          |
| `RESOLVED`                                                         | no                      | sí y `RESOLVED`         | no requerida         | sujeto a puertas posteriores                          |
| `RESOLVED`                                                         | sí y `RESOLVED`         | sí y `RESOLVED`         | no requerida         | sujeto a puertas posteriores                          |
| distinto de `RESOLVED`                                             | cualquiera              | cualquiera              | `ACTIVE`             | prohibido                                             |
| `RESOLVED`                                                         | requerida y no resuelta | cualquiera              | `ACTIVE`             | prohibido                                             |
| `RESOLVED`                                                         | cualquiera              | requerida y no resuelta | `ACTIVE`             | prohibido                                             |
| candidato legacy sin mapping explícito                             | cualquiera              | cualquiera              | `ACTIVE`             | prohibido                                             |
| mapping `COMPLETE` después de reevaluación y liberación registrada | satisfecho              | satisfecho              | `RELEASED`           | sujeto a `INT-POS-013`, `INT-POS-015` e `INT-POS-016` |

La tabla expresa elegibilidad. No ejecuta movimientos.

---

#### 18. Reglas de no pérdida y no corrección silenciosa

1. una línea no se elimina por no tener mapping;
2. el payload original no se edita cuando se resuelve el mapping;
3. la identidad externa original no se sustituye por un `product_id` interno;
4. la cuarentena conserva qué estados de mapping provocaron el bloqueo;
5. una reevaluación crea una nueva decisión o sucesión y no borra la anterior;
6. la liberación conserva el mapping exacto que la justificó;
7. un cambio posterior de producto, presentación o receta no reescribe el mapping histórico usado;
8. una diferencia entre mapping actual, mapping histórico y efecto existente se conserva para conciliación;
9. ninguna regla de consumo, categoría o valor predeterminado puede ocultar una ausencia de mapping;
10. una línea sin mapping nunca se contabiliza como físicamente procesada solo para cerrar un lote.

---

#### 19. Fronteras de responsabilidad

| Dominio o componente | Responsabilidad frente a la cuarentena                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| POS externo / Makos  | declara la línea y sus identidades; no decide el producto maestro Vento                               |
| Adaptador            | preserva, transforma y evalúa puertas; no crea productos ni descuenta inventario                      |
| PULSO                | conserva la venta y la línea y consume el estado de mapping; no redefine NEXO                         |
| NEXO                 | único propietario del movimiento físico cuando una línea liberada llegue por el contrato aprobado     |
| FOGO                 | conserva receta y producción cuando una preparación sea aplicable; no libera una línea por inferencia |
| PASS                 | no recibe efectos de producto o fidelización dependientes de un mapping incompleto                    |
| NUMERA               | conserva sus hechos económicos bajo su contrato; no usa el inventario como sustituto de mapping       |
| Conciliación         | identifica líneas, mappings y efectos incompatibles sin corregirlos silenciosamente                   |

La cuarentena no concede permisos de escritura cruzada ni acceso directo del proveedor a Supabase.

---

#### 20. Handoffs exactos y condiciones de salida

| Materia                                                    | Estado en esta tarea                               | Tarea propietaria | Condición de salida                                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| identidad e idempotencia de venta y línea                  | `ESPECIFICADO` como dependencia                    | `INT-POS-013`     | existe clave estable que impide procesar la misma línea como un hecho nuevo por reintento                                  |
| transporte webhook o polling                               | `FUERA_DE_ALCANCE`                                 | `INT-POS-014`     | ambos transportes, cuando existan, producen la misma evaluación de cuarentena                                              |
| emisión de venta validada                                  | `FUERA_DE_ALCANCE`                                 | `INT-POS-015`     | el contrato define cómo representa o excluye líneas `ACTIVE` sin atribuirles efecto                                        |
| salida física                                              | `BLOQUEADO` para líneas `ACTIVE`                   | `INT-POS-016`     | solo líneas liberadas atraviesan el contrato hacia NEXO exactamente una vez                                                |
| efecto económico                                           | `FUERA_DE_ALCANCE`                                 | `INT-POS-017`     | NUMERA consume únicamente la información autorizada por sus propias puertas sin inventar producto                          |
| fidelización                                               | `BLOQUEADO` cuando dependa del mapping de producto | `INT-POS-018`     | PASS recibe efectos solo con mapping suficiente cuando el producto sea necesario                                           |
| compensaciones                                             | `FUERA_DE_ALCANCE`                                 | `INT-POS-019`     | cualquier reverso físico referencia un efecto original realmente producido                                                 |
| conflictos o efecto ya existente bajo mapping incompatible | `BLOQUEADO`                                        | `INT-POS-020`     | conciliación determina diferencia, autoridad, acción y residual sin reescribir historia                                    |
| primeras líneas Makos reales y liberación sin efectos      | `PENDIENTE_DE_EVIDENCIA`                           | `INT-POS-021`     | se observa una línea real, se reproduce su entrada en cuarentena y su eventual resolución sin mover inventario ni finanzas |
| piloto con efectos                                         | `BLOQUEADO`                                        | `INT-POS-022`     | se demuestra que una línea `ACTIVE` no produce efecto y una `RELEASED` solo lo produce por las puertas aprobadas           |

Ningún handoff inicia ni aprueba la tarea receptora.

---

#### 21. Decisiones congeladas

1. La cuarentena es por línea de venta.
2. Una línea se conserva aunque su mapping esté incompleto.
3. `INCOMPLETE` bajo `INT-POS-011` obliga a cuarentena.
4. Una cuarentena `ACTIVE` prohíbe cualquier descuento de inventario dependiente de esa línea.
5. `matched_code` y `matched_name` son evidencia legacy `CANDIDATE_ONLY`, no autorización suficiente.
6. Una categoría nunca sustituye un mapping explícito de producto.
7. La ausencia de mapping no puede convertirse automáticamente en `no_inventory`.
8. El estado técnico `validated` no significa que el mapping sea `COMPLETE`.
9. El estado técnico `posted` no podrá utilizarse en el contrato objetivo para ocultar una línea que nunca produjo un efecto físico verificable.
10. La cuarentena no equivale a cancelación de venta, devolución, reembolso ni error de pago.
11. La cuarentena no elimina, edita ni reemplaza el payload o la línea originales.
12. Cada instancia conserva razones concretas de bloqueo y snapshot del mapping que la originó.
13. La liberación requiere un mapping explícito, vigente y `COMPLETE`.
14. La liberación conserva mapping, versión, evidencia, responsable y momento.
15. La liberación no produce inventario; solo habilita las puertas posteriores.
16. Una línea ya afectada físicamente bajo información incompatible no se corrige por liberación automática y pasa a conciliación.
17. El mapping aplicable se determina por el momento comercial de la línea, no por la fecha de revisión.
18. La implementación legacy de vista de pendientes y fallo completo del lote es una base técnica parcial, no una cuarentena canónica persistente.
19. La línea base remota actual contiene cero mappings, cero líneas importadas, cero reglas de consumo, cero postings y cero pendientes observables.
20. Las primeras líneas reales se probarán sin efectos en `INT-POS-021`.
21. Los efectos reales permanecen bloqueados hasta `INT-POS-022` y deberán ejecutarse por `INT-POS-016`.
22. Esta tarea no modifica código, DDL, DML, migraciones, Supabase, datos, RLS, funciones, vistas, RPC, credenciales ni configuración.
23. La continuidad inmediata queda reservada exclusivamente para `INT-POS-013`.

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el comportamiento verificable de esta tarea ya está protegido de forma explícita por la cobertura canónica vigente. `TREQ-INTEGRATION-014` exige que el POS externo ingrese mediante adaptador, staging, payload original, hash, mapeo, **cuarentena** e idempotencia, exige detectar líneas sin mapeo y exige que los efectos aplicables no se dupliquen. `TREQ-INTEGRATION-011` exige que todo hecho externo con efecto de inventario atraviese un contrato correlacionado e idempotente hacia NEXO y produzca el movimiento físico exactamente una vez. `TREQ-INTEGRATION-213` exige conservar transformación, mapping, procedencia y correlación de todo intercambio externo. `TREQ-INTEGRATION-217` exige historia append-only y correcciones mediante nuevas entradas vinculadas. `INT-POS-012` especializa esas obligaciones para la puerta por línea sin introducir una conducta verificable nueva fuera de esa cobertura.

---

#### 23. Cobertura de prueba existente preservada

Se preservan sin modificación:

- `TREQ-INTEGRATION-011` — efecto físico externo hacia NEXO correlacionado e idempotente, exactamente una vez;
- `TREQ-INTEGRATION-014` — transición POS externo → PULSO mediante staging, mapping, cuarentena e idempotencia, con detección de líneas sin mapping y conciliación;
- `TREQ-INTEGRATION-213` — trazabilidad de transformación, mapping, payload, huella, respuesta y correlación externa;
- `TREQ-INTEGRATION-217` — historia append-only y correcciones no destructivas.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea. El registro canónico 04A permanece sin cambios.

---

#### 24. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. define una cuarentena por línea y no por archivo, producto o sede;
2. conserva la línea y su procedencia aunque el mapping sea incompleto;
3. enlaza la entrada a cuarentena con el resultado `INCOMPLETE` de `INT-POS-011`;
4. enumera las condiciones de entrada sin utilizar inferencias de nombre, código o categoría;
5. define razones canónicas explícitas de cuarentena;
6. define `ACTIVE` y `RELEASED` sin convertirlos en estados comerciales de venta;
7. define el contenido lógico mínimo de una instancia de cuarentena;
8. prohíbe que una línea `ACTIVE` genere movimientos de inventario;
9. prohíbe restar stock por sede o ubicación desde una línea `ACTIVE`;
10. prohíbe consumo de receta, ingrediente directo o producto terminado mientras el mapping sea incompleto;
11. prohíbe usar `no_inventory` como fallback por falta de mapping;
12. separa ingestión, validación técnica, mapping y elegibilidad física;
13. mantiene importes y hechos no dependientes de producto sin inventar efectos;
14. define condiciones completas de liberación;
15. establece que liberar no equivale a descontar inventario;
16. exige idempotencia posterior antes de cualquier efecto;
17. conserva vigencia histórica del mapping y prohíbe aplicar automáticamente el mapping actual a toda línea histórica;
18. conserva la cuarentena frente a anulaciones y reversos sin fabricar compensaciones;
19. reconcilia la implementación legacy actual con el contrato objetivo;
20. clasifica `matched_code` y `matched_name` como insuficientes para autorización de inventario;
21. clasifica la vista de pendientes como diagnóstico y no como cuarentena histórica persistente;
22. clasifica el fallo del lote legacy como una guardia física que no sustituye la cuarentena por línea;
23. materializa el inventario real observable con cero mappings, cero líneas, cero reglas, cero postings y cero pendientes;
24. asigna cada bloqueo restante a una tarea exacta y una condición de salida;
25. genera cero cambios `TREQ-*` porque existe cobertura canónica exacta;
26. no crea una copia innecesaria del registro 04A;
27. no modifica código, datos, esquema, migraciones, Supabase, credenciales ni estado remoto;
28. mantiene `INT-POS-013` como única siguiente tarea reservada.

---

#### 25. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-011 — Definir mapeo de producto externo, producto Vento, presentación y receta`

TAREA ACTUAL APROBADA

`INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario`

SIGUIENTE TAREA RESERVADA

`INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`


### ✅ INT-POS-013 — Definir idempotencia por sistema, venta y línea externa

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario`  
**Tarea siguiente:** `INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`  
**Tipo de tarea:** documental; definición normativa de identidad e idempotencia para hechos de venta y línea recibidos desde un POS externo, separando identidad de sistema, venta, línea, recepción, revisión, payload, transporte y efectos internos; sin implementar adaptadores, endpoints, webhooks, polling, tablas, índices, migraciones, Supabase, movimientos de inventario, efectos financieros, fidelización ni cambios remotos  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente:** `Makos`  
**POS integral objetivo:** `PULSO`  
**Línea base documental:** `vento-shell@96872fa200540fcae99a4b242696dcbdac82da0c`  
**Contrato transversal consumido:** `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo Vento reconocerá que dos recepciones externas representan la misma venta o la misma línea lógica, cómo distinguirá un duplicado legítimo de una revisión o de un conflicto y cómo impedirá que reintentos, polling, webhooks, archivos repetidos, respuestas perdidas o reprocesamientos creen una segunda venta, una segunda línea o efectos internos adicionales.

La tarea especializa para la transición POS externo → PULSO el contrato transversal `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001` sin crear una excepción local.

Regla raíz:

```text
MISMO SISTEMA FUENTE
+ MISMA IDENTIDAD EXTERNA DE VENTA O LÍNEA
+ MISMA HUELLA LÓGICA MATERIAL
        ↓
MISMO HECHO LÓGICO
        ↓
RESULTADO RECUPERABLE
        ↓
CERO SEGUNDA VENTA
CERO SEGUNDA LÍNEA
CERO EFECTO ADICIONAL

MISMA IDENTIDAD EXTERNA
+ HUELLA MATERIAL INCOMPATIBLE
        ↓
CONFLICTO EXPLÍCITO
        ↓
CERO SOBRESCRITURA
CERO EFECTO NUEVO HASTA CONCILIACIÓN
```

La idempotencia se aplica a la identidad empresarial del hecho. No depende de que el transporte entregue exactamente una vez.

---

#### 2. Base canónica preservada

`INT-POS-013` consume sin reabrir las siguientes decisiones aprobadas:

1. `INT-POS-005` define venta y línea como identidades estables que sobreviven a recepciones y revisiones posteriores.
2. `INT-POS-006` separa identidad, estado, timestamps y revisión de la venta.
3. `INT-POS-008` conserva anulaciones, devoluciones y reembolsos como hechos vinculados al original, no como borrado del original.
4. `INT-POS-009` separa identidad de recepción, identidad externa, payload original, hash, versión de fuente, versión de adaptador, versión de mapping y correlación.
5. El hash de payload es una guardia de integridad, equivalencia y conflicto; no es identidad empresarial por sí mismo.
6. `source_row_number` es un localizador técnico y no una identidad de línea.
7. `INT-POS-011` define mapping de producto sin convertir código, nombre, categoría, producto Vento, presentación o receta en identidad de venta o línea.
8. `INT-POS-012` bloquea cualquier efecto físico dependiente de producto mientras una línea permanezca en cuarentena.
9. La liberación de cuarentena no crea una nueva venta ni una nueva línea y no ejecuta inventario.
10. `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001` establece transporte `AT_LEAST_ONCE` y efecto empresarial `AT_MOST_ONCE_PER_SCOPE_WITH_RESULT_REPLAY`.
11. El registro transversal separa solicitud, comando propietario, evento, entrega, efecto consumidor, correlación y orden.
12. Una clave idempotente solo es comparable dentro de su alcance y propietario.
13. La misma clave y la misma huella lógica devuelven el resultado previo sin repetir el efecto.
14. La misma clave con huella material distinta produce `CONFLICTING_REUSE`.
15. Los efectos posteriores en NEXO, NUMERA y PASS tendrán sus propios alcances de idempotencia y no quedan sustituidos por esta tarea.

---

#### 3. Frontera exacta de idempotencia POS

La idempotencia de la transición se separa en tres planos obligatorios:

| Plano                      | Identidad protegida                     | Propósito                                                                           | No sustituye                                           |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `SOURCE_SYSTEM_SCOPE`      | sistema e instancia lógica de origen    | evita colisiones entre proveedores, tenants o contextos externos distintos          | identidad de venta o línea                             |
| `EXTERNAL_SALE_SCOPE`      | venta externa dentro del sistema fuente | reconoce la misma venta a través de reintentos, recepciones y transportes distintos | identidad de línea, revisión o efecto consumidor       |
| `EXTERNAL_SALE_LINE_SCOPE` | línea externa subordinada a su venta    | reconoce la misma línea dentro de la misma venta                                    | identidad de producto, mapping, receta o efecto físico |

No se autoriza una única clave global que mezcle todos los sistemas, ventas y líneas.

---

#### 4. Identidad del sistema fuente

Toda clave de venta o línea deberá quedar contextualizada por el sistema fuente acreditado.

El contexto lógico mínimo será:

```text
source_system
+
source_instance_ref, cuando sea necesario para evitar colisiones entre tenants,
empresas, cuentas, ambientes o espacios de numeración distintos
```

Reglas:

1. `source_system` identifica la familia o sistema de origen, no una venta.
2. Si el proveedor reutiliza numeración entre empresas, tenants, sedes, ambientes o cuentas, el contexto acreditado correspondiente deberá formar parte del alcance.
3. `site_id` interno de Vento no sustituye una separación externa de namespaces que el proveedor realmente utilice.
4. Un identificador de venta igual recibido desde dos sistemas fuente distintos no constituye automáticamente la misma venta.
5. Un cambio de nombre comercial del proveedor no autoriza cambiar la identidad lógica del sistema sin una migración explícita.
6. La identidad del adaptador, parser o canal de transporte no sustituye `source_system`.

---

#### 5. Clave canónica de venta externa

Cuando la fuente provea un identificador estable de venta, la clave lógica de venta será conceptualmente:

```text
EXTERNAL_SALE_KEY
=
source_system
+ source_instance_ref cuando aplique
+ external_sale_id
```

`external_sale_id` deberá representar una venta individual estable en la semántica demostrada de la fuente.

No podrán utilizarse por sí solos como `external_sale_id`:

- hash del archivo;
- hash del payload;
- nombre del archivo;
- fecha del archivo;
- `sales_date`;
- sede interna;
- caja interna;
- total de venta;
- subtotal;
- impuesto;
- descuento;
- cantidad total;
- timestamp de recepción;
- timestamp generado por Vento;
- posición de fila;
- nombre de producto;
- código de producto;
- categoría;
- `catalog_item_id`;
- `product_id`;
- identificador interno de una fila importada;
- identificador interno del lote de importación.

---

#### 6. Clave canónica de línea externa

Cuando la fuente provea un identificador estable de línea, la clave lógica será conceptualmente:

```text
EXTERNAL_SALE_LINE_KEY
=
EXTERNAL_SALE_KEY
+ external_line_id
```

Reglas:

1. la línea queda subordinada a la venta salvo evidencia explícita de que el proveedor garantiza identidad global de línea;
2. el mismo `external_line_id` utilizado en dos ventas diferentes puede ser legítimo;
3. `source_row_number` nunca se eleva a identidad empresarial de línea;
4. el código, nombre, categoría o producto mapeado no identifican la línea;
5. cambiar el mapping no cambia la identidad de la línea;
6. cambiar la presentación o receta resuelta no cambia la identidad de la línea;
7. una línea recibida nuevamente por otro transporte conserva su identidad cuando la fuente demuestra que representa el mismo hecho.

---

#### 7. Fuentes que no entregan identificador estable de venta o línea

La ausencia de un identificador externo estable no autoriza a inventar una capacidad del proveedor.

Cuando la fuente no demuestre `external_sale_id` o `external_line_id`:

1. Vento conservará la identidad estable de recepción definida en `INT-POS-009` para poder reprocesar la misma evidencia de forma segura.
2. Esa identidad de recepción no se presentará como identificador externo de venta ni de línea.
3. Solo podrá definirse una identidad empresarial determinística alternativa si existe una composición de campos **definida por la fuente**, estable, no ambigua y demostrablemente única para el hecho correspondiente.
4. Una composición heurística creada por Vento a partir de fecha, valor, sede, producto, posición, nombre o cantidades no podrá declararse identidad canónica.
5. Si no existe evidencia suficiente para una venta individual, el flujo permanecerá como evidencia agregada o de conciliación y no se promoverá a venta individual canónica.
6. Si no existe evidencia suficiente para una línea individual, no se fabricará una identidad de línea con base en orden de filas.
7. La carencia de identidad necesaria deberá permanecer visible para conciliación y para el binding futuro del proveedor.

---

#### 8. Clasificación del flujo `makos_excel` vigente

La implementación `makos_excel` observada conserva lote, sede, fecha, hash de archivo, filas y datos agregados por producto, pero no demuestra actualmente un identificador individual estable de venta ni un identificador individual estable de línea de venta.

Por tanto:

```text
UNIQUE(source, site, date, file_hash)
≠
IDEMPOTENCIA POR VENTA

source_row_number
≠
IDENTIDAD DE LÍNEA

ID DE FILA INTERNA
≠
IDENTIDAD EXTERNA DE LÍNEA
```

Consecuencias:

1. la unicidad actual del archivo es una guardia técnica de ingestión por lote;
2. esa guardia puede impedir repetir exactamente un archivo, pero no demuestra deduplicación de ventas individuales;
3. dos archivos distintos pueden contener el mismo hecho externo y no deberán considerarse ventas diferentes solo por tener hashes distintos;
4. un mismo archivo recibido bajo otro nombre sigue siendo evaluado por su evidencia y no por el nombre;
5. el flujo agregado actual no podrá declarar cumplimiento de la idempotencia canónica individual hasta que exista binding suficiente.

---

#### 9. Huella lógica de venta

La identidad determina **qué hecho** se está comparando. La huella lógica determina **si el contenido material de ese hecho es compatible**.

Para una venta individual, la huella versionada incluirá únicamente los campos materiales acreditados que puedan cambiar el significado empresarial, por ejemplo:

- identidad del sistema fuente y contexto aplicable;
- identidad de venta;
- versión o secuencia de fuente cuando exista;
- timestamp comercial autoritativo cuando exista;
- estado comercial normalizado cuando sea material;
- referencias de sede, terminal o caja externas cuando pertenezcan al hecho;
- moneda;
- importes materiales de encabezado;
- referencias de documento fiscal cuando formen parte de la afirmación;
- conjunto lógico de líneas o referencias verificables cuando corresponda al contrato de revisión.

La huella excluirá metadatos volátiles de recepción o transporte.

---

#### 10. Huella lógica de línea

Para una línea individual, la huella versionada incluirá los campos materiales acreditados, por ejemplo:

- `EXTERNAL_SALE_KEY`;
- `external_line_id` cuando exista;
- versión o secuencia aplicable;
- identidad externa del ítem cuando exista;
- cantidad y unidad declaradas;
- importes materiales de línea;
- descuentos e impuestos declarados cuando correspondan;
- estado de línea cuando sea material;
- referencias externas que formen parte del hecho.

Quedan fuera de la identidad y no deberán producir una nueva línea por sí solos:

- `catalog_item_id` resuelto posteriormente;
- `product_id` de Vento;
- presentación resuelta;
- receta resuelta;
- versión de mapping;
- estado de cuarentena;
- actor que revisó el mapping;
- timestamp técnico de recepción;
- `attempt_id`, `delivery_id`, `trace_id` o equivalente;
- orden físico de propiedades en el payload.

---

#### 11. Resultados idempotentes aplicables

`INT-POS-013` reutiliza los resultados cerrados del contrato transversal y los aplica a venta y línea:

| Resultado                   | Aplicación en POS                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `APPLIED`                   | la venta o línea se reconoce por primera vez dentro de su alcance y queda disponible su resultado durable         |
| `DUPLICATE_RESULT_RETURNED` | la misma identidad y la misma huella ya fueron reconocidas; se recupera el resultado sin crear otra venta o línea |
| `CONFLICTING_REUSE`         | la misma identidad aparece con contenido incompatible que no puede explicarse como una revisión válida            |
| `IN_PROGRESS_RECOVERABLE`   | otra ejecución posee el procesamiento del mismo alcance y el resultado deberá recuperarse                         |
| `STALE_VERSION`             | una revisión anterior llega después de una versión más reciente y no puede hacer retroceder el estado             |
| `OUT_OF_ORDER_DEFERRED`     | existe una secuencia o dependencia previa necesaria antes de aplicar la revisión                                  |
| `RECONCILIATION_REQUIRED`   | la evidencia no permite determinar de forma segura si el hecho ya fue aplicado o si representa un conflicto       |
| `REJECTED`                  | el contrato, autenticidad, contexto o contenido no permiten aceptar la afirmación                                 |

No se crean estados idempotentes paralelos específicos de Makos.

---

#### 12. Duplicado verdadero

Una recepción se clasifica como duplicado verdadero cuando concurren las siguientes condiciones:

1. mismo alcance de sistema fuente;
2. misma clave de venta o línea;
3. misma versión lógica cuando exista o ausencia compatible de versión;
4. misma huella material versionada;
5. no existe evidencia de que la fuente esté expresando una nueva revisión, anulación, devolución, reembolso u otro hecho distinto.

Resultado:

```text
DUPLICATE_RESULT_RETURNED
```

El sistema deberá recuperar el resultado previamente reconocido y no volverá a crear el hecho.

---

#### 13. Reutilización conflictiva de identidad

La misma clave externa con contenido material incompatible no se tratará silenciosamente como duplicado ni se sobrescribirá.

Ejemplos de conflicto:

- misma venta externa con moneda incompatible sin semántica de revisión;
- misma línea externa con producto externo incompatible sin versión que explique el cambio;
- misma identidad con importes incompatibles que la fuente no identifica como revisión;
- misma identidad utilizada bajo un contexto externo diferente que no estaba incluido correctamente en el alcance;
- misma línea reutilizada para dos hechos que la fuente presenta como simultáneos.

Resultado:

```text
CONFLICTING_REUSE
```

El contenido original y el nuevo deberán permanecer trazables y cualquier efecto dependiente quedará bloqueado hasta conciliación.

---

#### 14. Revisiones de una misma venta

Una revisión legítima no crea una segunda identidad de venta.

Cuando la fuente provea versión, secuencia, fecha efectiva o mecanismo equivalente suficientemente acreditado:

1. la venta conserva `EXTERNAL_SALE_KEY`;
2. la nueva recepción conserva su propia evidencia y payload;
3. la revisión se ordena mediante la semántica de versión demostrada de la fuente;
4. una versión más nueva puede actualizar la proyección vigente sin borrar historia;
5. una versión anterior recibida tardíamente produce `STALE_VERSION` o `OUT_OF_ORDER_DEFERRED` según corresponda;
6. una versión incompatible o imposible produce `CONFLICTING_REUSE` o `RECONCILIATION_REQUIRED`;
7. una revisión no reinicia la identidad idempotente ni habilita automáticamente efectos consumidores ya realizados.

No se derivará orden de revisión usando únicamente `received_at`.

---

#### 15. Revisiones de línea

Una línea conserva su identidad a través de revisiones legítimas cuando la fuente demuestra que se trata del mismo hecho lógico.

La revisión de línea:

- no cambia por un remapeo interno;
- no cambia porque una receta sea asignada posteriormente;
- no cambia por liberarse la cuarentena;
- no cambia porque el payload se reciba por polling en vez de webhook;
- no cambia por un nuevo intento técnico;
- sí debe preservar cualquier versión o secuencia externa acreditada;
- no podrá transformar una reutilización conflictiva en una revisión por simple conveniencia operativa.

---

#### 16. Concurrencia

Dos procesos que reciban simultáneamente la misma venta o línea deberán converger en un único resultado empresarial.

Contrato obligatorio:

```text
MISMA CLAVE + MISMA HUELLA + CONCURRENCIA
        ↓
UN SOLO GANADOR EMPRESARIAL
        ↓
APPLIED
        +
DUPLICATE_RESULT_RETURNED / IN_PROGRESS_RECOVERABLE
```

No será suficiente una secuencia insegura de “buscar y luego insertar” sin protección transaccional o mecanismo equivalente.

La implementación física de claims, unicidad, locks, leases, transacciones o índices queda reservada para los bloques de arquitectura e implementación correspondientes.

---

#### 17. Respuesta perdida y resultado desconocido

Una pérdida de respuesta después de reconocer una venta o línea no autoriza crearla de nuevo.

Ante resultado técnico desconocido:

1. se consultará el resultado por la clave idempotente o identidad externa disponible;
2. si el resultado confirmado existe, se devolverá el resultado previo;
3. si existe procesamiento en curso, se conservará `IN_PROGRESS_RECOVERABLE`;
4. si la evidencia no permite determinar si el hecho fue aplicado, se usará `RECONCILIATION_REQUIRED`;
5. un timeout no equivale a ausencia de venta;
6. un retry no obtiene una identidad nueva.

---

#### 18. Múltiples canales de recepción

Webhook, polling, API, archivo, replay o reenvío son mecanismos de transporte y no crean identidades empresariales distintas.

```text
MISMA VENTA EXTERNA
RECIBIDA POR WEBHOOK
+
MISMA VENTA EXTERNA
RECUPERADA POR POLLING
        ↓
UNA SOLA EXTERNAL_SALE_KEY
```

Reglas:

1. `INT-POS-014` deberá preservar las claves definidas aquí.
2. El cambio de canal no puede producir una nueva venta o línea.
3. Un `delivery_id`, cursor, página, archivo o request técnico no sustituye la identidad externa.
4. Polling de conciliación puede descubrir un hecho omitido por webhook sin cambiar su identidad.
5. Una redelivery debe converger en el mismo resultado idempotente.

---

#### 19. Relación con mapping y cuarentena

La idempotencia de venta y línea es independiente del mapping de producto.

Consecuencias:

1. una línea puede ser idempotentemente la misma aunque su mapping esté `INCOMPLETE`;
2. una línea duplicada en cuarentena continúa siendo una sola línea lógica;
3. una recepción duplicada no libera la cuarentena;
4. una corrección de mapping no crea una nueva línea;
5. una nueva versión de mapping no cambia `EXTERNAL_SALE_LINE_KEY`;
6. liberar la cuarentena no genera una nueva identidad ni un nuevo derecho automático a producir efectos;
7. una línea `ACTIVE` en cuarentena mantiene bloqueados los efectos físicos aunque sea un duplicado reconocido correctamente;
8. un conflicto de identidad no podrá resolverse mediante mapping de producto.

---

#### 20. Relación con anulaciones, devoluciones y reembolsos

Los reversos no se deduplicarán usando únicamente la identidad de la venta original.

Reglas:

1. la venta original conserva su identidad;
2. una anulación, devolución o reembolso conserva identidad propia cuando la fuente la provea;
3. dos devoluciones legítimas contra una misma venta no deberán colapsarse por compartir venta, importe o producto;
4. repetir el mismo reverso sí deberá converger en un único hecho cuando su identidad y huella lo demuestren;
5. si la fuente no provee identidad estable del reverso, se conservará evidencia y se aplicarán las reglas de recepción y conciliación sin inventar identificadores del proveedor;
6. la compensación interna se define en `INT-POS-019` y utilizará su propio alcance idempotente;
7. esta tarea no ejecuta compensaciones.

---

#### 21. Frontera con efectos internos

Reconocer idempotentemente una venta o línea **no significa** haber aplicado sus efectos internos.

Las siguientes garantías permanecen separadas:

| Hecho o efecto                     | Tarea propietaria inmediata |
| ---------------------------------- | --------------------------- |
| identidad de venta y línea externa | `INT-POS-013`               |
| recepción por webhook y polling    | `INT-POS-014`               |
| emisión de venta validada          | `INT-POS-015`               |
| salida física en NEXO              | `INT-POS-016`               |
| efecto económico en NUMERA         | `INT-POS-017`               |
| fidelización en PASS               | `INT-POS-018`               |
| compensación de reversos           | `INT-POS-019`               |
| conciliación diaria y conflictos   | `INT-POS-020`               |

Una venta deduplicada no podrá usarse como evidencia de que NEXO, NUMERA o PASS ya aplicaron su efecto.

---

#### 22. Evidencia lógica mínima

Toda decisión idempotente de venta o línea deberá poder reconstruirse lógicamente a partir de:

- alcance idempotente;
- `source_system`;
- `source_instance_ref` cuando aplique;
- identidad externa de venta cuando exista;
- identidad externa de línea cuando exista;
- identidad estable de recepción;
- versión o secuencia de fuente cuando exista;
- versión de la canonicalización de huella;
- huella lógica;
- resultado idempotente;
- referencia al resultado durable previamente reconocido cuando aplique;
- referencia al payload o fragmento original;
- correlación de integración;
- momento técnico de reconocimiento;
- evidencia de conflicto o conciliación cuando corresponda.

La persistencia física exacta se definirá en las tareas de arquitectura e implementación.

---

#### 23. Prohibiciones explícitas

Queda prohibido:

1. declarar exactly-once de transporte;
2. deduplicar ventas únicamente por hash de payload o archivo;
3. deduplicar ventas únicamente por fecha, sede, caja, total o timestamp;
4. deduplicar líneas por `source_row_number`;
5. deduplicar líneas por producto Vento, nombre, código, categoría, presentación o receta;
6. usar el identificador interno del lote como identidad externa de venta;
7. usar el identificador interno de la fila como identidad externa de línea;
8. crear un nuevo identificador empresarial por cada retry;
9. cambiar la identidad porque cambie el canal de transporte;
10. tratar una revisión como nueva venta sin evidencia de que la fuente creó una nueva venta;
11. tratar una reutilización conflictiva como revisión válida sin semántica acreditada;
12. sobrescribir silenciosamente el contenido anterior de la misma identidad;
13. permitir que un duplicado salte una cuarentena `ACTIVE`;
14. asumir que una venta deduplicada ya produjo inventario, efecto económico o puntos;
15. colapsar múltiples devoluciones o reembolsos legítimos por compartir la venta original;
16. inventar identificadores que Makos no haya demostrado;
17. elevar el flujo agregado `makos_excel` a idempotencia individual de venta o línea sin evidencia suficiente;
18. modificar código, DDL, DML, Supabase, credenciales o configuración desde esta tarea.

---

#### 24. Carryover obligatorio

| Brecha o decisión pendiente                            | Tarea propietaria | Condición de salida                                                           |
| ------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------- |
| transporte webhook/polling y recuperación de omisiones | `INT-POS-014`     | ambos canales preservan las mismas claves y convergen en el mismo resultado   |
| emisión de evento canónico de venta validada           | `INT-POS-015`     | `event_id` estable y emisión separada del reconocimiento de venta             |
| efecto de inventario exactamente una vez               | `INT-POS-016`     | clave de efecto NEXO independiente y reconciliable                            |
| efecto económico exactamente una vez                   | `INT-POS-017`     | clave de efecto NUMERA independiente y reconciliable                          |
| efecto de fidelización exactamente una vez             | `INT-POS-018`     | clave de efecto PASS independiente y condicionada a elegibilidad              |
| reversos y compensaciones                              | `INT-POS-019`     | cada compensación conserva identidad propia y relación con el original        |
| conflictos, `UNKNOWN_OUTCOME`, faltantes y diferencias | `INT-POS-020`     | conciliación identifica origen, resultado, conflicto y acción pendiente       |
| primera prueba con datos reales sin efectos            | `INT-POS-021`     | claves y resultados idempotentes observables sin mutación física o financiera |
| piloto con efectos                                     | `INT-POS-022`     | puertas de mapping, cuarentena, idempotencia y efectos downstream demostradas |
| transición futura a PULSO                              | `INT-POS-023`     | el cambio de fuente impide doble emisión de la misma venta                    |

Ninguna de estas brechas queda sin dueño documental.

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la conducta verificable definida aquí ya está cubierta por el registro canónico vigente. `TREQ-INTEGRATION-014` exige que la transición del POS externo opere mediante adaptador, staging, payload original, hash, mapping, cuarentena e idempotencia, impida doble emisión y produzca los efectos aplicables exactamente una vez. `TREQ-INTEGRATION-108` a `TREQ-INTEGRATION-123` ya definen el registro transversal, transporte al menos una vez, separación de identidades, resultado recuperable, conflicto por reutilización incompatible, huella lógica versionada, identidad estable de evento, inbox, efecto consumidor, concurrencia, recuperación posterior al commit y orden por agregado. Las reglas posteriores de idempotencia, recuperación, claim y auditoría mantienen la misma protección para reintentos y resultados inciertos. `INT-POS-013` especializa esas obligaciones para sistema, venta y línea externa sin introducir una capacidad verificable nueva fuera de la cobertura existente.

---

#### 26. Cobertura de prueba existente preservada

Se preservan sin modificación, entre otros:

- `TREQ-INTEGRATION-011` — hecho externo con efecto físico correlacionado e idempotente hacia NEXO;
- `TREQ-INTEGRATION-014` — transición POS externo/PULSO sin doble emisión, con staging, mapping, cuarentena, idempotencia y conciliación;
- `TREQ-INTEGRATION-108` — cobertura transversal del registro de idempotencia;
- `TREQ-INTEGRATION-109` — transporte al menos una vez y efecto como máximo una vez por alcance;
- `TREQ-INTEGRATION-110` — separación de identidades idempotentes;
- `TREQ-INTEGRATION-112` — recuperación del resultado ante misma clave y huella;
- `TREQ-INTEGRATION-113` — conflicto determinista ante reutilización incompatible;
- `TREQ-INTEGRATION-114` — huella lógica versionada y sin metadatos volátiles;
- `TREQ-INTEGRATION-116` — identidad estable de emisión a través de redelivery y replay;
- `TREQ-INTEGRATION-117` — prohibición de claves demasiado amplias;
- `TREQ-INTEGRATION-120` — un solo ganador empresarial bajo concurrencia;
- `TREQ-INTEGRATION-121` — recuperación del resultado después de respuesta perdida;
- `TREQ-INTEGRATION-213` — trazabilidad integral de intercambio externo, payload, huella, versión, transformación, mapping y correlación.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea. El registro canónico 04A permanece sin cambios.

---

#### 27. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. separa identidad de sistema, venta, línea, recepción, revisión, payload, transporte y efecto consumidor;
2. define el alcance de sistema fuente y el uso condicional de `source_instance_ref`;
3. define `EXTERNAL_SALE_KEY` sin depender de hash, fecha, sede, total o timestamp;
4. define `EXTERNAL_SALE_LINE_KEY` subordinada a la venta salvo evidencia de identidad global de línea;
5. prohíbe `source_row_number` como identidad de línea;
6. prohíbe mapping de producto como identidad de línea;
7. define el tratamiento cuando la fuente no provee identificadores estables;
8. conserva la identidad estable de recepción sin presentarla como identidad externa;
9. impide fabricar claves heurísticas a partir de fecha, valor, sede, producto o posición;
10. clasifica `makos_excel` como guardia técnica agregada y no como idempotencia individual demostrada;
11. separa identidad y huella lógica;
12. define huella material de venta y línea sin campos volátiles de transporte;
13. reutiliza los ocho resultados idempotentes del contrato transversal sin crear vocabulario local incompatible;
14. define duplicado verdadero como misma clave y misma huella compatible;
15. define `CONFLICTING_REUSE` para misma identidad con contenido incompatible;
16. conserva revisiones legítimas bajo la misma identidad de venta;
17. impide ordenar revisiones únicamente por `received_at`;
18. conserva revisiones de línea sin cambiar identidad por mapping, receta, cuarentena o transporte;
19. exige un solo ganador empresarial bajo concurrencia;
20. define recuperación ante respuesta perdida y resultado incierto;
21. establece que webhook, polling, API, archivo y replay no crean identidades empresariales nuevas;
22. integra la idempotencia con la cuarentena sin permitir bypass;
23. separa reversos legítimos y evita colapsarlos por compartir venta o importe;
24. separa reconocimiento idempotente de venta de los efectos en NEXO, NUMERA y PASS;
25. define evidencia lógica mínima reconstruible;
26. asigna todas las brechas posteriores a tareas concretas;
27. genera cero cambios `TREQ-*` por existir cobertura canónica suficiente;
28. no requiere una nueva copia del registro 04A;
29. no modifica código, datos, schema, migraciones, Supabase, credenciales ni estado operativo;
30. mantiene `INT-POS-014` como única siguiente tarea reservada.

---

#### 28. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-012 — Definir cuarentena de líneas sin mapeo y sin descuento de inventario`

TAREA ACTUAL APROBADA

`INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`

SIGUIENTE TAREA RESERVADA

`INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`


### ✅ INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`  
**Tarea siguiente:** `INT-POS-015 — Definir emisión del evento canónico de venta validada`  
**Tipo de tarea:** documental; definición normativa del transporte incremental y de recuperación para ventas del POS externo, usando webhook únicamente cuando la capacidad esté demostrada y polling de conciliación de ingreso como respaldo o mecanismo primario cuando corresponda, preservando procedencia, autenticidad, idempotencia, revisiones y continuidad sin implementar endpoints, workers, cron, colas, credenciales, migraciones, Supabase ni efectos internos  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente:** `Makos`  
**POS integral objetivo:** `PULSO`  
**Línea base documental:** `vento-shell@2dc97c4d59e0ba3833778bf9c0f58123295edf2d`  
**Contratos transversales consumidos:** `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0`; `ENTERPRISE-EVENT-RETRY-POLICY-001@1.0.0`  
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo Vento deberá recibir de forma incremental y recuperar hechos de venta provenientes del POS externo sin depender de que un único canal entregue todo una sola vez.

La tarea establece dos mecanismos complementarios, condicionados por las capacidades realmente acreditadas del proveedor:

```text
WEBHOOK, CUANDO EXISTA Y ESTÉ DEMOSTRADO
        ↓
RECEPCIÓN TEMPRANA DEL HECHO
        ↓
MISMO ADAPTADOR + MISMA PROCEDENCIA + MISMA IDEMPOTENCIA

POLLING DE CONCILIACIÓN DE INGRESO
        ↓
RECUPERACIÓN DE OMISIONES, TARDÍOS Y REVISIONES
        ↓
MISMO ADAPTADOR + MISMA PROCEDENCIA + MISMA IDEMPOTENCIA
```

Webhook y polling son transportes. Ninguno cambia el sistema de origen, crea una segunda identidad de venta o línea, reemplaza el contrato canónico ni autoriza efectos en NEXO, NUMERA o PASS.

---

#### 2. Base canónica preservada

`INT-POS-014` consume sin reabrir las siguientes decisiones aprobadas:

1. Makos es la fuente temporal del hecho de venta dentro del alcance todavía no transferido a PULSO.
2. PULSO será la fuente de nuevas ventas después del corte aplicable; el transporte nunca sustituye la fuente empresarial.
3. La API de Makos está confirmada únicamente como vía habilitable mediante solicitud al desarrollador del proveedor; Vento no dispone todavía de especificación técnica ni credenciales provisionadas que permitan congelar endpoints, campos, límites o semántica de consulta.
4. La existencia, catálogo, firma, autenticación, política de reentrega y garantías de un webhook de Makos no están demostrados para el tenant de Vento.
5. `INT-POS-009` exige conservar identidad de recepción, representación original protegida, versiones acreditadas, hash, `received_at`, localizador de fragmento y correlación antes de normalizar.
6. `INT-POS-010` y `INT-POS-011` gobiernan el mapping de contexto y producto; el transporte no puede fabricarlos.
7. `INT-POS-012` mantiene en cuarentena toda línea con mapping insuficiente y bloquea efectos dependientes de producto.
8. `INT-POS-013` establece que webhook, polling, API, archivo, replay y reenvío deben converger en las mismas identidades de sistema, venta y línea.
9. La entrega de transporte es `AT_LEAST_ONCE`; la protección empresarial se obtiene mediante idempotencia y recuperación de resultado.
10. Una misma clave con la misma huella devuelve el resultado previo; una reutilización incompatible produce `CONFLICTING_REUSE`.
11. `UNKNOWN_OUTCOME` exige indagación o conciliación antes de reejecutar.
12. `INT-POS-015` es la única tarea inmediata que podrá definir la emisión de la venta validada; recibir el dato no equivale a emitirla.
13. `INT-POS-020` conserva la conciliación diaria entre ventas y efectos internos; esta tarea limita el polling a completitud y recuperación del ingreso externo.

---

#### 3. Estado técnico actual verificable

La línea base actual demuestra un flujo manual `makos_excel`, no una integración incremental.

| Elemento                                             | Estado verificable actual                                    | Consecuencia                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| importación XLSX de ventas                           | implementada                                                 | continúa como flujo legacy y contingencia existente                               |
| SHA-256 del archivo                                  | implementado                                                 | protege la identidad técnica del lote, no la venta individual                     |
| unicidad por sede, fecha, fuente y hash              | implementada                                                 | guardia agregada; no sustituye idempotencia de venta y línea                      |
| `source_row_number`                                  | implementado                                                 | localizador técnico, no identidad empresarial                                     |
| API Makos para Vento                                 | habilitable bajo solicitud, sin binding técnico provisionado | no pueden congelarse consultas, cursores, límites ni campos                       |
| webhook Makos para Vento                             | no demostrado                                                | no se diseña un endpoint ficticio ni se declara disponible                        |
| polling Makos operativo                              | no implementado ni especificado                              | solo puede materializarse después de acreditar una interfaz de lectura suficiente |
| venta individual y línea individual en `makos_excel` | no demostradas                                               | el flujo agregado no se eleva a transporte transaccional individual               |

La migración legacy `pulso_daily_sales_imports` materializa lotes y filas de importación, pero no demuestra un registro de webhook, cursor de polling, checkpoint incremental ni identidad individual de venta o línea.

---

#### 4. Decisión de arquitectura de transporte

La transición utilizará la siguiente jerarquía lógica:

| Situación acreditada                                                         | Canal de entrada incremental                         | Mecanismo de recuperación                                          | Resultado contractual                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| el proveedor ofrece webhook utilizable y una interfaz de lectura conciliable | webhook                                              | polling                                                            | webhook acelera recepción; polling detecta omisiones, tardíos y revisiones              |
| no existe webhook utilizable, pero existe interfaz de lectura conciliable    | polling                                              | polling sobre ventanas o checkpoints anteriores cuando corresponda | polling actúa como canal primario y como recuperación                                   |
| existe webhook utilizable, pero no existe lectura conciliable suficiente     | webhook condicionado                                 | sin afirmación de completitud automática                           | el binding no podrá presentarse como recuperable integralmente hasta resolver la brecha |
| no existe evidencia suficiente de webhook ni de lectura incremental          | `makos_excel` u otra contingencia realmente aprobada | conciliación manual vigente                                        | no se declara automatización inexistente                                                |

La preferencia por webhook no convierte el webhook en fuente de verdad. La ausencia de webhook tampoco invalida una integración basada en polling si la interfaz de lectura puede demostrar completitud suficiente.

---

#### 5. Regla de convergencia entre canales

Todos los canales autorizados deberán converger antes de cualquier efecto interno:

```text
WEBHOOK
POLLING
ARCHIVO AUTORIZADO
REPLAY CONTROLADO
        ↓
ADAPTADOR DEL PROVEEDOR
        ↓
PROCEDENCIA DE INT-POS-009
        ↓
IDEMPOTENCIA DE INT-POS-013
        ↓
MAPPING + CUARENTENA
        ↓
VENTA ELEGIBLE PARA INT-POS-015
```

Invariantes:

1. cambiar de webhook a polling no cambia `source_system`;
2. una venta recuperada por polling conserva la misma `EXTERNAL_SALE_KEY` que habría utilizado por webhook;
3. una línea recuperada por otro canal conserva la misma `EXTERNAL_SALE_LINE_KEY`;
4. `delivery_id`, request de polling, página, cursor, checkpoint, archivo o intento técnico nunca sustituyen esas identidades;
5. dos canales que observan el mismo hecho no producen dos ventas;
6. una diferencia material bajo la misma identidad no se resuelve escogiendo el canal preferido: produce conflicto o conciliación;
7. mapping, cuarentena y efectos posteriores se evalúan sobre el hecho normalizado, no sobre la prioridad del canal.

---

#### 6. Condición de uso del webhook

Un webhook solo podrá activarse cuando exista evidencia técnica del proveedor o del tenant que permita demostrar, como mínimo:

- que el webhook está disponible para Vento;
- qué hechos o recursos puede notificar;
- cuál es la semántica de cada notificación;
- cómo se autentica o verifica el origen cuando aplique;
- qué identificador externo estable entrega, si alguno;
- qué timestamps y versiones aporta;
- qué representación debe preservarse como entrada original;
- qué comportamiento de redelivery o retry declara el proveedor, cuando exista;
- qué respuesta técnica espera del receptor;
- qué límites, ventanas o restricciones contractuales aplican;
- cómo se recuperan hechos omitidos o fallidos.

Mientras esa evidencia no exista, la capacidad de webhook permanece `PENDIENTE_CONFIRMACION_PROVEEDOR_TENANT` y no se inventarán URL, método HTTP, firma, headers, códigos de respuesta, eventos, payloads ni SLA.

---

#### 7. Recepción lógica de webhook

Cuando exista un webhook acreditado, cada entrega deberá producir una recepción externa trazable antes de interpretar el hecho empresarial.

La recepción conservará, cuando el binding los entregue o los requiera:

- `source_system` y `source_instance_ref` aplicables;
- identidad externa de evento, mensaje o recurso;
- identidad estable de recepción;
- `received_at`;
- referencia a la representación original protegida;
- tipo de contenido y codificación cuando sean materiales;
- hash con algoritmo, base y digest cuando se utilice;
- versión o secuencia de fuente cuando exista;
- evidencia de autenticidad o su resultado de validación cuando aplique;
- versión del adaptador y del contrato interpretativo de Vento;
- correlación de integración;
- resultado de recepción y procesamiento inicial.

Una respuesta técnica al proveedor solo representa el estado definido por el binding de transporte. No constituye confirmación de que la venta ya produjo inventario, efecto económico, fidelización, documento fiscal o cualquier otro efecto interno.

---

#### 8. Autenticidad y seguridad del webhook

El receptor deberá fallar de forma cerrada frente a una entrega que no pueda demostrar las condiciones de autenticidad exigidas por el binding.

Reglas:

1. firma inválida, autenticación inválida, contrato revocado o payload incompatible no se convierten en error transitorio por conveniencia;
2. secretos, tokens y credenciales no forman parte del payload empresarial ni de logs ordinarios;
3. el proveedor nunca recibe acceso directo a Supabase ni credenciales privilegiadas de Vento;
4. la autenticación técnica del webhook no concede autorización empresarial para producir efectos internos;
5. una entrega rechazada conserva la evidencia segura necesaria para auditoría cuando la política de seguridad permita conservarla;
6. ningún rechazo de autenticidad podrá saltarse mediante polling y presentar el mismo contenido no confiable como hecho válido sin nueva evidencia legítima de fuente.

La selección física de mecanismo criptográfico, secreto, certificado o infraestructura permanece condicionada a la especificación real del proveedor y a las tareas de implementación correspondientes.

---

#### 9. Redelivery y duplicados de webhook

La redelivery de un webhook es un comportamiento esperado de una integración `AT_LEAST_ONCE` y no una nueva operación empresarial.

Cuando la fuente entregue un identificador externo estable y confiable, se preservará dentro del alcance externo definido por `INT-POS-013`. Cuando no exista, Vento asignará una identidad de recepción durable antes del primer procesamiento repetible, sin inventar una identidad Makos de venta o línea.

Resultado esperado:

| Entrada                                          | Resultado                         |
| ------------------------------------------------ | --------------------------------- |
| misma identidad + misma huella                   | `DUPLICATE_RESULT_RETURNED`       |
| misma identidad + procesamiento en curso         | `IN_PROGRESS_RECOVERABLE`         |
| misma identidad + contenido incompatible         | `CONFLICTING_REUSE`               |
| respuesta previa perdida y resultado recuperable | recuperación del resultado previo |
| resultado imposible de determinar                | `RECONCILIATION_REQUIRED`         |

Una redelivery nunca libera por sí sola una línea en cuarentena ni reejecuta efectos ya confirmados.

---

#### 10. Propósito exacto del polling

El polling definido aquí cumple una función de **completitud del ingreso externo**.

Debe poder detectar, cuando la interfaz de lectura acreditada lo permita:

- hechos que no llegaron por webhook;
- hechos que llegaron tarde;
- revisiones posteriores de una venta o línea;
- ventas o líneas visibles en la fuente que no tengan una recepción equivalente en Vento;
- gaps de paginación, ventana o checkpoint que impidan afirmar completitud;
- divergencias de identidad o versión que requieran `INT-POS-020`.

El polling de esta tarea no verifica si NEXO descontó inventario, NUMERA registró el efecto económico o PASS registró fidelización. Esa conciliación empresarial permanece en `INT-POS-020`.

---

#### 11. Estrategia de lectura del polling

El binding real deberá escoger la estrategia de lectura más fuerte que la fuente pueda demostrar, en este orden conceptual:

1. cursor o token incremental estable documentado por el proveedor;
2. versión o secuencia monotónica del recurso;
3. ventana temporal sobre un timestamp de actualización con semántica y orden demostrados;
4. snapshot completo o acotado reproducible cuando no exista mecanismo incremental suficiente.

Reglas:

- no se fabricará un cursor desde `received_at`;
- no se asumirá que un ID crece de forma monotónica sin documentación;
- no se utilizará el timestamp local de consulta como prueba de que la fuente no contiene hechos anteriores;
- no se declarará una ventana completa si la fuente puede actualizar retrospectivamente elementos fuera de ella sin mecanismo de detección;
- cuando la fuente no permita demostrar orden o completitud suficiente, el binding deberá conservar esa limitación y no presentar el polling como captura exacta de todos los cambios.

---

#### 12. Checkpoint y avance seguro

El polling deberá conservar un checkpoint durable únicamente como control técnico de recuperación. El checkpoint no es identidad de venta ni de línea.

Cada checkpoint lógico deberá poder reconstruir:

- sistema e instancia consultados;
- alcance territorial o recurso consultado;
- versión del binding de consulta;
- frontera inicial de la lectura;
- cursor, secuencia, versión, timestamp o snapshot utilizado solo cuando la fuente lo soporte;
- páginas o fragmentos esperados y recibidos cuando exista paginación;
- momento de inicio y cierre de la lectura;
- última frontera completamente preservada;
- siguiente frontera candidata;
- resultado del ciclo;
- referencia a error, retry o conciliación cuando exista;
- correlación con las recepciones generadas.

El checkpoint solo podrá avanzar sobre una frontera cuya recepción haya quedado durablemente preservada sin gaps conocidos. Un fallo parcial no podrá adelantar el checkpoint más allá de información no verificada.

---

#### 13. Ventanas solapadas y hechos tardíos

Cuando la fuente utilice timestamps o ventanas que permitan cambios tardíos, el polling deberá usar una estrategia de recuperación capaz de volver a observar un tramo ya consultado sin duplicar efectos.

La amplitud del solapamiento no se fija en esta tarea porque depende de:

- semántica de timestamps del proveedor;
- retención;
- consistencia de lectura;
- latencia de actualización;
- límites de consulta;
- rate limits;
- volumen;
- garantías de orden.

La repetición deliberada de una ventana es segura únicamente porque `INT-POS-013` obliga a deduplicar el hecho por identidad y huella. El solapamiento no podrá utilizarse para crear IDs nuevos ni para sobrescribir una revisión posterior.

---

#### 14. Paginación y completitud

Cuando una consulta sea paginada:

1. cada página o fragmento pertenece a un único ciclo de polling identificable;
2. el orden y mecanismo de continuación deberán provenir del contrato del proveedor;
3. una página fallida no permite declarar completo el rango;
4. reiniciar un ciclo conserva la frontera ya confirmada y vuelve a procesar de forma idempotente lo necesario;
5. un elemento repetido entre páginas se deduplica por identidad empresarial, no por posición;
6. cambios concurrentes del conjunto deberán tratarse de acuerdo con la garantía real de snapshot o consistencia del proveedor;
7. si la fuente no garantiza una lectura estable, la limitación deberá quedar explícita y la completitud dependerá de ciclos posteriores de recuperación.

No se inventa un tamaño de página ni una forma de paginación para Makos.

---

#### 15. Cadencia de polling y retry son conceptos distintos

La **cadencia de polling** decide cuándo iniciar un nuevo ciclo ordinario de consulta. El **retry** decide cuándo reintentar un ciclo o request que falló dentro de la política transversal.

Por tanto:

```text
SIGUIENTE CICLO ORDINARIO DE POLLING
≠
SIGUIENTE INTENTO DE UNA CONSULTA FALLIDA
```

No se fija una frecuencia numérica de polling en esta tarea porque todavía no existe evidencia de:

- rate limits Makos;
- volumen por tenant;
- retención;
- SLA;
- semántica incremental;
- ventana máxima o mínima de consulta;
- costo o restricción de peticiones.

La frecuencia operativa deberá quedar versionada en el binding real y ser demostrada antes del piloto de `INT-POS-021`. No podrá configurarse de modo que viole límites del proveedor ni que cree una garantía de frescura que la fuente no pueda cumplir.

---

#### 16. Política de retry aplicable

`INT-POS-014` no crea una política local de reintentos. Reutiliza `ENTERPRISE-EVENT-RETRY-POLICY-001`.

Para intercambios con el proveedor:

- `EXTERNAL_RECEIPT` utiliza ordinariamente `RETRY_PROVIDER_RATE_LIMITED`;
- `RETRY_EVENT_STANDARD` solo podrá utilizarse cuando el binding demuestre que no aplican cuotas y el perfil resulte compatible;
- `RATE_LIMITED` respeta `Retry-After` o equivalente válido;
- `TRANSIENT_CONNECTIVITY` y `TRANSIENT_DEPENDENCY` admiten retry dentro del presupuesto;
- `AUTH_REFRESH_REQUIRED` exige refrescar y reevaluar antes de intentar nuevamente;
- `UNKNOWN_OUTCOME` exige consultar o conciliar primero;
- `PERMANENT_CONTRACT`, `PERMANENT_BUSINESS`, `SECURITY_DENIED`, `CONFLICTING_REUSE` y `CANCELLED_OR_EXPIRED` no admiten retry automático.

Un código HTTP aislado, excepción de SDK o texto de error no reemplaza la clasificación contractual.

---

#### 17. Convergencia webhook–polling

La siguiente matriz gobierna la combinación de canales:

| Observación                                                                          | Tratamiento                                                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| webhook recibe un hecho y polling encuentra el mismo hecho con misma huella          | recuperar el resultado idempotente; cero segunda venta                                     |
| polling encuentra un hecho y luego llega el mismo webhook                            | recuperar el resultado idempotente; cero segunda venta                                     |
| webhook y polling entregan la misma identidad con contenido incompatible             | `CONFLICTING_REUSE` o `RECONCILIATION_REQUIRED`; no escoger silenciosamente un canal       |
| polling encuentra un hecho que nunca tuvo recepción webhook                          | crear la recepción correspondiente y procesar por la misma cadena idempotente              |
| existe recepción webhook pero la consulta posterior no encuentra el recurso esperado | conservar la recepción y abrir divergencia; no borrar el hecho por ausencia posterior      |
| una revisión aparece solo en polling                                                 | conservar la misma identidad de venta o línea y aplicar la semántica de versión acreditada |
| el webhook llega tarde después de una revisión más nueva recuperada por polling      | clasificar por versión; no hacer retroceder el estado                                      |
| un ciclo de polling repite hechos ya vistos                                          | deduplicar individualmente; no considerar el ciclo completo una operación nueva de venta   |

La existencia de un canal preferente nunca decide cuál contenido es verdadero cuando las evidencias son incompatibles.

---

#### 18. Eventos tardíos, fuera de orden y revisiones

Webhook y polling pueden observar hechos en órdenes distintos.

Reglas:

1. el orden de llegada no sustituye el orden de fuente;
2. `received_at` no define qué revisión es más nueva;
3. cuando la fuente provea versión o secuencia acreditada, esa semántica gobierna la comparación;
4. una revisión anterior tardía produce `STALE_VERSION` o `OUT_OF_ORDER_DEFERRED` según el contrato aplicable;
5. una versión imposible o contradictoria produce conflicto o conciliación;
6. ausencia de versión suficiente no autoriza aplicar last-write-wins por hora de recepción;
7. el polling podrá recuperar una revisión omitida sin reescribir payloads ni recepciones anteriores.

---

#### 19. Separación entre transporte, recepción y venta

Se preservan las siguientes desigualdades:

```text
WEBHOOK DELIVERY ≠ VENTA
POLL REQUEST ≠ VENTA
POLL RESPONSE ≠ VENTA
CHECKPOINT ≠ VENTA
CURSOR ≠ VENTA
RECEIPT_ID ≠ EXTERNAL_SALE_ID
ACK TÉCNICO ≠ EFECTO EMPRESARIAL
RECEPCIÓN DURABLE ≠ VENTA VALIDADA
VENTA VALIDADA ≠ EFECTOS DOWNSTREAM CONFIRMADOS
```

Una recepción puede contener cero, una o varias ventas. Una venta puede quedar respaldada por varias recepciones legítimas sin convertirse en varias ventas.

---

#### 20. Relación con mapping y cuarentena

El transporte no altera las puertas de mapping de `INT-POS-010` y `INT-POS-011` ni la cuarentena de `INT-POS-012`.

- una venta recuperada por polling no obtiene mapping por haber sido recuperada;
- una línea recibida por webhook no tiene prioridad sobre una línea equivalente recibida por archivo o polling;
- una redelivery no libera una línea `ACTIVE`;
- una revisión de mapping no modifica el checkpoint de la fuente;
- el checkpoint no prueba que una línea sea elegible para inventario;
- las líneas sin mapping suficiente continúan bloqueadas aunque la recepción sea auténtica y completa.

---

#### 21. Relación con reversos

Anulaciones, devoluciones y reembolsos podrán llegar por los mismos canales cuando el binding del proveedor los exponga.

El transporte deberá:

1. conservar la identidad y semántica de reverso acreditadas;
2. deduplicar la redelivery del mismo reverso;
3. no colapsar reversos distintos por compartir venta, importe o timestamp;
4. permitir que polling recupere un reverso omitido por webhook;
5. conservar revisiones tardías sin borrar el original;
6. no ejecutar compensaciones desde el adaptador.

La aplicación de compensaciones permanece en `INT-POS-019`.

---

#### 22. Frontera con la conciliación diaria

El término “polling de conciliación” en esta tarea significa **conciliación de entrada contra la fuente externa**.

Su alcance termina al poder responder:

- qué hechos externos fueron observados;
- por qué canal;
- cuáles se recuperaron por polling;
- cuáles son duplicados;
- cuáles son revisiones;
- cuáles presentan conflicto;
- qué rango o checkpoint de lectura quedó completo o incompleto.

`INT-POS-020` será responsable de conciliar esos hechos con la venta canónica y con los efectos esperados o confirmados en NEXO, NUMERA y PASS. Esta tarea no adelanta esa matriz empresarial.

---

#### 23. Puertas para el binding real de Makos

Antes de activar webhook o polling deberá existir evidencia suficiente para resolver, según corresponda:

| Decisión                             | Evidencia requerida                               | Tarea de demostración |
| ------------------------------------ | ------------------------------------------------- | --------------------- |
| disponibilidad real de webhook       | capacidad del tenant y documentación efectiva     | `INT-POS-021`         |
| autenticidad del webhook             | firma, credencial o mecanismo real y su semántica | `INT-POS-021`         |
| identidad de evento o recepción      | campo estable o ausencia demostrada               | `INT-POS-021`         |
| recursos consultables                | contrato real de API o mecanismo de lectura       | `INT-POS-021`         |
| cursor, secuencia o versión          | semántica documentada por proveedor               | `INT-POS-021`         |
| timestamps utilizables para ventanas | campo y significado acreditados                   | `INT-POS-021`         |
| paginación y consistencia            | reglas reales de lectura                          | `INT-POS-021`         |
| rate limits y `Retry-After`          | límites efectivos del binding                     | `INT-POS-021`         |
| retención y ventana histórica        | garantía efectiva del proveedor                   | `INT-POS-021`         |
| frecuencia operativa de polling      | límites anteriores + frescura requerida           | `INT-POS-021`         |

`INT-POS-021` deberá demostrar estas capacidades sin efectos sobre inventario ni finanzas. Si alguna no existe, deberá conservar la limitación y aplicar el modo de transporte compatible en vez de fabricar la capacidad.

---

#### 24. Carryover obligatorio

| Brecha o decisión pendiente                         | Tarea propietaria                 | Condición de salida                                                                                            |
| --------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| emisión del evento canónico de venta validada       | `INT-POS-015`                     | una venta elegible produce una emisión estable sin confundir recepción con evento                              |
| salida física exactamente una vez                   | `INT-POS-016`                     | NEXO aplica su propio alcance idempotente                                                                      |
| efecto económico exactamente una vez                | `INT-POS-017`                     | NUMERA aplica su propio alcance idempotente                                                                    |
| fidelización exactamente una vez                    | `INT-POS-018`                     | PASS aplica su propio alcance idempotente cuando corresponda                                                   |
| compensación de reversos                            | `INT-POS-019`                     | efectos inversos conservan original e identidad propia                                                         |
| conciliación entre venta y efectos internos         | `INT-POS-020`                     | diferencias de origen, venta y efectos quedan clasificadas y accionables                                       |
| comprobación del binding Makos real                 | `INT-POS-021`                     | capacidades, autenticidad, consulta, paginación, límites, ventanas y frecuencia quedan demostradas sin efectos |
| piloto con efectos                                  | `INT-POS-022`                     | transporte, mapping, cuarentena, idempotencia y efectos downstream están demostrados                           |
| cambio futuro de fuente hacia PULSO                 | `INT-POS-023`                     | el transporte preserva fuente única y evita doble emisión durante el corte                                     |
| infraestructura transversal de colas y recuperación | `QUEUE-ARC-001` a `QUEUE-ARC-010` | arquitectura física aprobada para scheduling, colas, workers, retry y recuperación                             |

Ninguna brecha detectada queda sin una tarea propietaria y una condición de salida.

---

#### 25. Decisiones congeladas

1. Webhook se utilizará únicamente si la capacidad existe y está demostrada para Vento.
2. Actualmente no se declara que Makos tenga webhook habilitado para el tenant de Vento.
3. No se inventan endpoints, payloads, firmas, headers, eventos, códigos, cursores, límites, SLA ni garantías del proveedor.
4. Polling será el mecanismo de recuperación de ingreso cuando exista una interfaz de lectura suficiente.
5. Si no existe webhook utilizable, polling podrá ser el canal incremental primario sin cambiar la autoridad de Makos.
6. Si no existe interfaz de lectura suficiente, no se presentará el flujo como automáticamente recuperable.
7. Webhook, polling, archivo y replay convergen en el mismo adaptador, procedencia e idempotencia.
8. Cambiar de canal no cambia identidad de sistema, venta o línea.
9. Una redelivery no crea una nueva venta.
10. Polling puede descubrir un hecho omitido sin crear una segunda identidad.
11. Misma identidad y misma huella recuperan el resultado previo.
12. Misma identidad y contenido incompatible producen conflicto o conciliación.
13. El orden de recepción no sustituye una versión de fuente.
14. `received_at` no se usa como last-write-wins.
15. Cursor, página, checkpoint y request son identidades técnicas, no empresariales.
16. Un checkpoint solo avanza sobre una frontera durable y sin gaps conocidos.
17. Polling ordinario y retry de una consulta fallida son ciclos distintos.
18. La frecuencia de polling no se fija sin rate limits, retención, volumen y semántica de fuente demostrados.
19. Los retries usan la política transversal y no una configuración local inventada.
20. Un `UNKNOWN_OUTCOME` no se resuelve enviando ciegamente otra operación.
21. Autenticidad técnica del webhook no equivale a autorización empresarial ni a validación de la venta.
22. Un ACK técnico no demuestra efectos downstream.
23. Polling de esta tarea concilia ingreso; `INT-POS-020` concilia venta y efectos internos.
24. Una línea en cuarentena permanece bloqueada sin importar el canal por el que llegó.
25. Reversos recibidos por cualquiera de los canales conservan identidad propia y no ejecutan compensaciones desde el adaptador.
26. `makos_excel` permanece como implementación legacy agregada y no se presenta como webhook o polling.
27. Esta tarea no implementa endpoint, worker, scheduler, cron, cola, tabla, índice, función, Edge Function, secreto, credencial, migración ni cambio de Supabase.
28. Esta tarea no habilita inventario, finanzas, fidelización ni documentos fiscales.
29. La siguiente responsabilidad inmediata permanece exclusivamente en `INT-POS-015`.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `INT-POS-014` especializa para la transición del POS externo comportamientos ya protegidos por la cobertura canónica vigente: recepción externa autenticable, deduplicación previa a efectos, webhooks y operaciones reintentables con identidad estable, recuperación de resultados, tratamiento de respuestas inciertas, límites de retry, rate limits, trazabilidad, conciliación y prohibición de efectos duplicados. La tarea no introduce una excepción verificable fuera de esas reglas ni modifica un comportamiento protegido existente; por tanto, el registro canónico de requisitos permanece sin cambios.

---

#### 27. Cobertura de prueba existente preservada

Se preservan sin modificación, entre otros:

- `TREQ-INTEGRATION-003` — idempotencia, retry y recuperación para operaciones asíncronas y webhooks;
- `TREQ-INTEGRATION-004` — trazabilidad de trigger, job, webhook, intento y efecto final;
- `TREQ-INTEGRATION-014` — transición POS externo → PULSO con adaptador, staging, idempotencia y conciliación;
- `TREQ-INTEGRATION-049` — autenticidad, payload original, identificador, recepción y correlación de afirmaciones externas;
- `TREQ-INTEGRATION-061` — validación de la afirmación externa antes de producir un hecho interno;
- `TREQ-INTEGRATION-125` — deduplicación de afirmaciones externas mediante identidad confiable de fuente;
- `TREQ-INTEGRATION-126` — `receipt_id` durable cuando el proveedor no entregue identidad estable;
- `TREQ-INTEGRATION-127` — hash como guardia y no como identidad empresarial;
- `TREQ-INTEGRATION-139` a `TREQ-INTEGRATION-163` — preservación de identidad, taxonomía de errores, `UNKNOWN_OUTCOME`, full jitter, `Retry-After`, presupuestos, perfiles, claims, aislamiento, agotamiento y observabilidad;
- `TREQ-INTEGRATION-306` — frontera del adaptador externo sin escritura transversal directa.

Ningún requisito existente cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 28. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. preserva a Makos como fuente temporal independientemente del transporte;
2. confirma que la existencia de webhook para el tenant sigue sin demostrarse;
3. impide inventar detalles técnicos de webhook o API;
4. define webhook como canal condicional y no requisito supuesto;
5. define polling como recuperación de ingreso y, cuando no exista webhook, como posible canal primario;
6. define el comportamiento cuando tampoco exista una interfaz de lectura suficiente;
7. obliga a webhook y polling a converger en el mismo adaptador y contratos de procedencia;
8. obliga a preservar las identidades definidas en `INT-POS-013` entre canales;
9. diferencia identidad externa, recepción, delivery, cursor, página y checkpoint;
10. define evidencia lógica mínima de una recepción webhook;
11. exige autenticidad según el binding real y falla cerrado ante evidencia inválida;
12. prohíbe acceso directo del proveedor a Supabase;
13. define tratamiento de redelivery y duplicados mediante los outcomes idempotentes existentes;
14. define el propósito de completitud del polling sin invadir `INT-POS-020`;
15. define orden preferente de estrategias incrementales según evidencia de fuente;
16. prohíbe fabricar cursores, secuencias o monotonicidad;
17. define checkpoint durable y avance solo sobre fronteras completas;
18. define recuperación de ventanas repetidas o solapadas sin fijar una amplitud inventada;
19. define reglas de paginación sin inventar tamaño o mecanismo Makos;
20. separa cadencia ordinaria de polling de retry de una consulta fallida;
21. evita fijar una frecuencia sin evidencia de límites, retención y volumen;
22. reutiliza `ENTERPRISE-EVENT-RETRY-POLICY-001` sin política local divergente;
23. define convergencia webhook–polling para duplicados, revisiones, omisiones y conflictos;
24. trata eventos tardíos y fuera de orden sin usar `received_at` como versión;
25. separa recepción durable de venta validada y de efectos downstream;
26. mantiene mapping y cuarentena independientes del canal;
27. permite recuperar reversos omitidos sin ejecutar compensaciones;
28. define explícitamente la frontera con la conciliación diaria de `INT-POS-020`;
29. asigna la demostración del binding real y la frecuencia operativa a `INT-POS-021`;
30. asigna cada brecha restante a una tarea exacta con condición de salida;
31. genera cero cambios `TREQ-*` por existir cobertura canónica suficiente;
32. no crea una copia innecesaria del registro 04A;
33. no modifica código, datos, esquema, migraciones, Supabase, credenciales ni configuración remota;
34. mantiene `INT-POS-015` como única siguiente tarea reservada.

---

#### 29. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-013 — Definir idempotencia por sistema, venta y línea externa`

TAREA ACTUAL APROBADA

`INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`

SIGUIENTE TAREA RESERVADA

`INT-POS-015 — Definir emisión del evento canónico de venta validada`


### ✅ INT-POS-015 — Definir emisión del evento canónico de venta validada

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`
**Tarea siguiente:** `INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`
**Tipo de tarea:** documental; definición normativa de la puerta de elegibilidad y de la emisión empresarial que convierte una venta externa ya normalizada, contextualizada e idempotentemente reconocida en una emisión canónica de PULSO usando exclusivamente una definición de evento ya aprobada para el proceso y hecho realmente demostrados, sin crear definiciones de evento paralelas, implementar outbox, colas, endpoints, tablas, migraciones, Supabase ni efectos en NEXO, NUMERA o PASS
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**POS externo vigente:** `Makos`
**POS integral objetivo:** `PULSO`
**Aplicación propietaria de la emisión interna:** `PULSO`
**Línea base documental:** `vento-shell@13648e778ad646acfff4ad5f6c0fe566c43b63ab`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Contratos transversales consumidos:** `ENTERPRISE-EVENT-CATALOG-001`, `ENTERPRISE-EVENT-PRODUCER-REGISTRY-001`, `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001`, `EVENT-ENVELOPE-001`, `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0` y `ENTERPRISE-EVENT-RETRY-POLICY-001@1.0.0`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir el punto exacto en el que una venta originada en el POS externo deja de ser únicamente una afirmación recibida y pasa a poder producir una emisión empresarial interna de PULSO, conservando la identidad de la venta, su procedencia Makos, la revisión aplicable, el proceso empresarial real, la definición canónica del evento y la separación de los efectos posteriores.

Regla raíz:

```text
AFIRMACIÓN EXTERNA RECIBIDA
        ↓
PROCEDENCIA PRESERVADA
        ↓
CONTRATO CANÓNICO DE VENTA Y LÍNEAS
        ↓
CONTEXTO + MAPPING + CUARENTENA
        ↓
IDEMPOTENCIA Y REVISIÓN RESUELTAS
        ↓
HECHO EMPRESARIAL REAL DEMOSTRADO
        ↓
DEFINICIÓN VPROC-*.EVT-* APLICABLE
        ↓
PULSO PERSISTE EL HECHO INTERNO Y SU EMISIÓN
        ↓
EVENT_ID ESTABLE
        ↓
CONSUMIDORAS SEGÚN REGISTRO CANÓNICO
        ↓
EFECTOS PROPIOS EN TAREAS POSTERIORES
```

La emisión no convierte el ACK de un webhook, la lectura por polling, la importación de un archivo, el estado técnico de un lote o la coincidencia de un producto en un evento empresarial.

---

#### 2. Resultado sustantivo

`INT-POS-015` deja definida una única puerta documental de emisión para ventas provenientes del POS externo.

El resultado material es:

1. la expresión **venta validada** queda definida como una condición de elegibilidad de integración y no como un nuevo `event_definition_id`;
2. una emisión solo puede utilizar una definición normal ya existente en `ENTERPRISE-EVENT-CATALOG-001`;
3. `PULSO` es la aplicación emisora empresarial de los procesos comerciales que le pertenecen, aunque `source_system` continúe siendo Makos durante la transición;
4. Makos, el adaptador, un webhook, un poller, Supabase, una tabla, un trigger, una Edge Function o un worker no adquieren condición de emisora empresarial;
5. la selección del evento se hace por `process_id` y por el hecho durable realmente demostrado, no por una etiqueta local de integración;
6. la emisión conserva `event_id` estable y el alcance `EVENT_EMISSION`;
7. la redelivery o retry de la misma emisión conserva el mismo `event_id`;
8. la audiencia se deriva del registro transversal de consumidoras y no de una lista inventada por el adaptador;
9. los efectos en NEXO, NUMERA y PASS continúan separados de la emisión y tienen sus propias identidades idempotentes;
10. la ruta legacy `makos_excel` queda reconocida como implementación agregada que no demuestra por sí sola una venta individual emitible;
11. se crean **cero** definiciones normales de evento;
12. se modifican **cero** definiciones normales de evento;
13. se crean **cero** relaciones productora-consumidora;
14. se modifican **cero** relaciones productora-consumidora;
15. se crean o modifican **cero** requisitos de prueba;
16. no se modifica código, DDL, DML, Supabase, configuración, credenciales ni estado remoto.

---

#### 3. Base canónica preservada

Esta tarea consume sin reabrir las siguientes decisiones aprobadas:

1. `INT-POS-003` conserva a Makos como fuente temporal del hecho de venta dentro de su alcance hasta el corte controlado.
2. `INT-POS-005` define una venta canónica y una línea canónica con identidades estables y separadas de pedido, pago, caja, documento fiscal, inventario, fidelización, economía y entrega.
3. `INT-POS-006` gobierna encabezados, líneas, estados y timestamps.
4. `INT-POS-007` gobierna descuentos, impuestos, propinas y medios de pago.
5. `INT-POS-008` conserva anulaciones, devoluciones y reembolsos como hechos vinculados y no destructivos.
6. `INT-POS-009` conserva recepción, payload original, versiones, hash, `received_at`, parser, mapping y correlación.
7. `INT-POS-010` gobierna empresa, sede, terminal y caja externa.
8. `INT-POS-011` gobierna producto, presentación y receta.
9. `INT-POS-012` gobierna cuarentena por línea y prohíbe efectos dependientes de producto mientras permanezca `ACTIVE`.
10. `INT-POS-013` gobierna identidad e idempotencia por sistema, venta y línea y separa el reconocimiento de la venta de sus efectos posteriores.
11. `INT-POS-014` establece que webhook, polling, archivo y replay son canales de recepción y deben converger en las mismas identidades.
12. `INT-APP-001` define el catálogo transversal de eventos y prohíbe convertir un ACK técnico o una fila interna en hecho empresarial.
13. `INT-APP-002` asigna una única aplicación emisora a cada definición según la propietaria del proceso.
14. `INT-APP-003` gobierna consumidoras, finalidad, proyecciones y audiencia.
15. `INT-APP-004` separa `EVENT_EMISSION`, `CONSUMER_INBOX` y `CONSUMER_EFFECT`.
16. `INT-APP-005` gobierna retry, resultado desconocido, backoff y presupuestos.
17. `INT-APP-010` prohíbe escrituras cruzadas y exige que un evento describa un hecho ya confirmado por su propietaria.
18. `PROC-CAT-017` continúa siendo la fuente normativa de las definiciones normales `VPROC-####.EVT-###`.

---

#### 4. La “venta validada” no crea una definición de evento nueva

El catálogo vigente no contiene una definición normal denominada `SALE_VALIDATED`, `VALIDATED_SALE` ni una definición equivalente creada específicamente para esta transición.

Por tanto, la expresión **evento canónico de venta validada** se interpreta así:

```text
VENTA VALIDADA
=
VENTA QUE SUPERÓ LA PUERTA DE INTEGRACIÓN
Y CUYO HECHO EMPRESARIAL PUEDE MAPEARSE
A UNA DEFINICIÓN VPROC-*.EVT-* YA APROBADA
```

No así:

```text
VENTA VALIDADA
=
NUEVO EVENT_TYPE GLOBAL INVENTADO POR EL ADAPTADOR
```

La validación de integración demuestra que la afirmación externa puede participar en el modelo interno. El evento empresarial continúa describiendo el hecho durable definido por el proceso propietario.

Crear un nombre técnico cómodo para la integración no autoriza a añadirlo al catálogo de 395 definiciones normales ni a tratarlo como una verdad empresarial nueva.

---

#### 5. Propietaria empresarial frente a sistema de origen

La transición conserva dos identidades distintas:

| Dimensión                                            | Valor durante la transición                                    | Regla                                                            |
| ---------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| sistema de origen de la venta                        | Makos dentro del alcance todavía no cortado                    | permanece en procedencia y contrato de venta                     |
| aplicación propietaria del proceso comercial interno | `PULSO`                                                        | valida y persiste el hecho interno que le pertenece              |
| aplicación emisora empresarial                       | `PULSO` para los procesos PULSO                                | deriva del registro canónico de emisoras                         |
| adaptador                                            | componente técnico de integración                              | valida, transforma y entrega; no se vuelve propietaria           |
| transporte                                           | webhook, polling, archivo u otro canal acreditado              | no cambia origen ni emisora                                      |
| infraestructura                                      | Supabase, trigger, outbox, worker, cola o servicio equivalente | puede materializar transporte; no adquiere autoridad empresarial |

Por tanto:

```text
source_system = MAKOS
producer_application = PULSO
```

pueden coexistir durante la transición sin contradicción.

Después del corte, una venta nueva originada en PULSO podrá tener:

```text
source_system = PULSO
producer_application = PULSO
```

sin cambiar el contrato transversal de eventos ni las fronteras de las consumidoras.

---

#### 6. Puerta mínima antes de una emisión

Una venta externa solo podrá llegar a la decisión de emisión cuando se haya demostrado, como mínimo:

| Puerta              | Condición obligatoria                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| fuente              | `source_system` y alcance temporal compatibles con la fuente autorizada                                                                  |
| procedencia         | recepción identificable, referencia a evidencia original y correlación reproducible                                                      |
| identidad de venta  | identidad canónica y externa resueltas conforme a `INT-POS-013`                                                                          |
| revisión            | versión o secuencia tratada conforme a la semántica acreditada; sin regresión silenciosa                                                 |
| idempotencia        | no existe conflicto de reutilización ni resultado desconocido sin resolver                                                               |
| contrato            | venta y líneas materializan la semántica de `INT-POS-005` a `INT-POS-008`                                                                |
| contexto            | dimensiones requeridas de `INT-POS-010` resueltas para el hecho o efecto correspondiente                                                 |
| producto            | cada línea conserva el resultado de mapping de `INT-POS-011`                                                                             |
| cuarentena          | cada línea conserva explícitamente su estado bajo `INT-POS-012`; ninguna línea `ACTIVE` puede producir un efecto dependiente de producto |
| proceso             | puede demostrarse a qué `VPROC-*` pertenece el hecho empresarial                                                                         |
| hito                | puede demostrarse qué definición `VPROC-*.EVT-*` describe realmente el hecho confirmado                                                  |
| productora          | `producer_application` coincide con la propietaria de esa definición                                                                     |
| versión contractual | contrato de venta y sobre de evento son identificables y compatibles                                                                     |

Una falla en una puerta no se convierte en una emisión de éxito. La afirmación se conserva y sigue el tratamiento de bloqueo, conciliación o verificación asignado a su tarea propietaria.

---

#### 7. Resolución obligatoria de proceso y definición de evento

La integración no podrá escoger un `process_id` por conveniencia técnica.

Para cada venta emitible deberá demostrarse:

```text
HECHO EXTERNO
        ↓
SEMÁNTICA CANÓNICA DE VENTA
        ↓
PROCESO EMPRESARIAL REAL
        ↓
HITO DURABLE REAL
        ↓
event_definition_id EXISTENTE
        ↓
event_type EXISTENTE
```

No se permite:

```text
source = makos
→ process_id fijo por defecto
```

ni:

```text
venta recibida
→ VPROC-0040 por ser “externa”
```

`VPROC-0040` gobierna el proceso de pedido proveniente de canal externo. Una venta originada en Makos no se clasifica automáticamente como pedido de canal externo solo porque provenga de un sistema tercero.

---

#### 8. Definiciones vigentes especialmente relevantes

Para los procesos comerciales ordinarios actualmente definidos, se preservan entre otras las siguientes definiciones:

| Proceso      | Definición                                                                | Tipo                      | Hecho confirmado                                                                                      |
| ------------ | ------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `VPROC-0038` | `VPROC-0038.EVT-005` / `vento.process.vproc-0038.table-service-closed.v1` | `PROCESS_COMPLETED`       | la sesión de servicio de mesa quedó cerrada sin borrar reversos, propinas, reclamos o evidencia       |
| `VPROC-0039` | `VPROC-0039.EVT-005` / `vento.process.vproc-0039.counter-sale-closed.v1`  | `PROCESS_COMPLETED`       | la venta de mostrador quedó cerrada sin sustituir caja, fidelización, reclamos o entrega por terceros |
| `VPROC-0040` | `VPROC-0040.EVT-001` a `VPROC-0040.EVT-006`                               | proceso de pedido externo | cada definición conserva su hito propio desde recepción hasta conciliación del pedido externo         |

Reglas:

1. una venta de servicio de mesa solo puede usar una definición de `VPROC-0038` cuando la evidencia permita clasificarla como ese proceso y demostrar el hito;
2. una venta de mostrador o para llevar solo puede usar una definición de `VPROC-0039` cuando la evidencia permita esa clasificación;
3. `VPROC-0040` no es fallback para cualquier venta de Makos;
4. una venta perteneciente a otro proceso PULSO utiliza exclusivamente la definición ya aprobada para ese proceso y hito;
5. no poder distinguir el proceso o el hito impide inventar una definición genérica;
6. la prueba inicial del binding real y de la suficiencia de estos datos corresponde a `INT-POS-021`.

---

#### 9. Qué significa “validada” en esta tarea

La palabra **validada** expresa que la venta superó las comprobaciones de integración necesarias para ser tratada como hecho interno atribuible a PULSO.

No significa por sí sola:

- venta pagada;
- pedido completamente entregado;
- documento fiscal emitido;
- caja conciliada;
- inventario descontado;
- costo calculado;
- puntos acumulados;
- puntos redimidos;
- reversos aplicados;
- todas las líneas libres de cualquier restricción para cualquier consumidora;
- todos los efectos posteriores confirmados;
- proceso empresarial cerrado.

La definición de evento elegida deberá afirmar únicamente lo que su `confirmed_fact` permite.

---

#### 10. Emisión propietaria

La secuencia contractual es:

```text
ADAPTADOR ENTREGA AFIRMACIÓN VALIDABLE
        ↓
PULSO REVALIDA CONTRATO, PROCEDENCIA, CONTEXTO E IDENTIDAD
        ↓
PULSO PERSISTE O RECONOCE SU HECHO EMPRESARIAL
        ↓
PULSO RESUELVE DEFINICIÓN DE EVENTO EXISTENTE
        ↓
PULSO ASIGNA Y PERSISTE EVENT_ID
        ↓
REGISTRO DE EMISIÓN DURABLE
        ↓
PUBLICACIÓN / ENTREGA POSTERIOR
```

La emisión no puede anteceder al hecho propietario.

Un éxito técnico del transporte externo no autoriza a construir un evento empresarial si PULSO todavía no ha confirmado el hecho interno correspondiente.

---

#### 11. Sobre canónico de la emisión

Toda emisión deberá utilizar `EVENT-ENVELOPE-001` y conservar, cuando aplique, como mínimo:

| Campo                   | Regla para esta transición                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `event_id`              | identidad única de la emisión concreta; permanece estable en redelivery, retry y replay                               |
| `event_definition_id`   | definición existente del proceso y hito demostrados                                                                   |
| `event_type`            | tipo versionado exacto asociado a la definición                                                                       |
| `event_version`         | versión contractual del evento                                                                                        |
| `process_id`            | proceso PULSO realmente aplicable                                                                                     |
| `process_instance_id`   | referencia a la instancia empresarial cuando exista de forma canónica                                                 |
| `producer_application`  | `pulso` para definiciones de procesos PULSO                                                                           |
| `aggregate_type`        | tipo empresarial compatible con la definición y el contrato                                                           |
| `aggregate_id`          | referencia estable al agregado propietario; para una emisión de venta deberá permitir correlacionar la venta canónica |
| `aggregate_version`     | revisión propietaria aplicable, sin sustituir la versión de fuente                                                    |
| `occurred_at`           | momento del hecho empresarial descrito por la definición                                                              |
| `recorded_at`           | momento técnico de persistencia del evento; no sustituye `occurred_at`                                                |
| `site_id`               | sede canónica cuando sea parte del contexto exigido                                                                   |
| `correlation_id`        | une recepción, venta, emisión y efectos derivados sin actuar como clave universal                                     |
| `causation_id`          | referencia causal cuando exista un hecho canónico previo que la justifique                                            |
| `request_id`            | condicional; no se fabrica para una recepción que no tenga solicitud aplicable                                        |
| `idempotency_key`       | referencia al alcance idempotente de la emisión                                                                       |
| `source_command_id`     | condicional; solo existe cuando hubo un comando propietario real                                                      |
| `result_reference`      | referencia recuperable al resultado de la persistencia/emisión                                                        |
| `output_references[]`   | referencias a venta, líneas u otros resultados empresariales necesarios                                               |
| `evidence_references[]` | referencias protegidas a procedencia y evidencia; no copia indiscriminada del payload                                 |
| `audit_reference`       | vínculo con auditoría transversal                                                                                     |
| `sensitivity_class`     | hereda la definición aprobada; no se rebaja por conveniencia                                                          |
| `schema_version`        | versión del sobre o proyección aplicable                                                                              |
| `trace_context`         | contexto técnico sin convertirse en identidad empresarial                                                             |

Los campos opcionales no se rellenan con identificadores sintéticos si el hecho real no los genera.

---

#### 12. Contenido empresarial de venta y líneas

La emisión no crea un segundo contrato de venta.

La representación empresarial se obtiene del contrato canónico aprobado y debe permitir correlacionar, según la finalidad de la consumidora:

- identidad canónica de venta;
- sistema e identidad externa de origen;
- revisión de venta;
- estado y momento comercial acreditados;
- sede y contexto aplicables;
- moneda e importes necesarios;
- referencias de pago o fiscalidad cuando sean materialmente necesarias y estén autorizadas;
- identidades canónicas de línea;
- identidad externa de línea cuando exista;
- producto de origen;
- producto, presentación y receta resueltos cuando correspondan;
- cantidad y unidad;
- componentes comerciales de línea;
- resultado de mapping;
- estado de cuarentena;
- procedencia y correlación.

El payload bruto de Makos no se copia dentro de cada proyección de evento. Se preserva mediante referencias de evidencia y procedencia.

---

#### 13. Líneas en cuarentena y elegibilidad parcial

La existencia de una línea `ACTIVE` en `EXTERNAL-SALE-LINE-QUARANTINE-001` no autoriza a eliminarla de la venta ni a fingir que la venta nunca ocurrió.

Reglas:

1. la emisión conserva la existencia de la venta y la composición canónica de sus líneas;
2. una línea `ACTIVE` continúa bloqueada para cualquier efecto dependiente de su producto;
3. una línea correctamente reconocida e idempotente no deja de ser la misma línea por estar en cuarentena;
4. las consumidoras no podrán interpretar la ausencia de producto mapeado como `no_inventory`;
5. las líneas hermanas no se convierten automáticamente en inválidas por la cuarentena de otra línea;
6. la elegibilidad concreta del efecto físico se define en `INT-POS-016`;
7. la elegibilidad del efecto económico se define en `INT-POS-017`;
8. la elegibilidad de fidelización se define en `INT-POS-018`;
9. liberar una línea de cuarentena no crea una segunda venta ni una nueva identidad de línea;
10. una liberación posterior tampoco crea por sí sola una nueva definición de evento empresarial;
11. los efectos que hayan quedado pendientes por una restricción anterior deberán quedar detectables y recuperables mediante la conciliación de `INT-POS-020`.

---

#### 14. Identidad de la emisión

El alcance idempotente aplicable es:

```text
EVENT_EMISSION
```

Su identidad es:

```text
event_id
```

Invariantes:

1. `event_id` identifica una emisión concreta y no se reutiliza para otro hecho;
2. el mismo evento redelivered, reintentado o replayed conserva el mismo `event_id`;
3. una respuesta perdida no crea otro `event_id`;
4. una segunda recepción externa de la misma venta no crea otra emisión equivalente;
5. `sale_id` no se usa por sí solo como clave universal porque una misma venta puede producir varios eventos legítimos;
6. `event_definition_id` no se usa por sí solo como clave de deduplicación;
7. `correlation_id`, `causation_id`, `aggregate_id` y `process_instance_id` tampoco son claves suficientes por sí solas;
8. el registro durable de la emisión debe permitir recuperar el `event_id` previamente asignado.

---

#### 15. Relación entre venta, revisión y evento

Una venta puede recibir más de una revisión legítima sin convertirse en múltiples ventas.

Eso no implica que cada revisión de fuente deba producir un nuevo evento.

Reglas:

1. la revisión externa conserva la misma identidad de venta cuando `INT-POS-013` así lo determina;
2. una nueva revisión solo produce una nueva emisión normal cuando esa revisión demuestra un nuevo hecho durable contemplado por una definición aprobada;
3. un cambio de mapping interno no constituye por sí solo un nuevo hecho empresarial;
4. una corrección de procedencia no constituye por sí sola un nuevo evento de venta;
5. una versión tardía no hace retroceder la proyección ni recrea una emisión anterior;
6. una revisión incompatible queda en conflicto o conciliación;
7. anulaciones, devoluciones, reembolsos y correcciones utilizan sus hechos y familias condicionales aplicables; no se expresan reenviando el evento normal original con otro contenido.

---

#### 16. Unicidad lógica de una emisión equivalente

Para esta transición deberá cumplirse:

```text
MISMA VENTA CANÓNICA
+
MISMA REVISIÓN EMPRESARIAL APLICABLE
+
MISMO HECHO DURABLE
+
MISMA DEFINICIÓN CANÓNICA
        ↓
UNA SOLA EMISIÓN EMPRESARIAL
        ↓
UN EVENT_ID RECUPERABLE
```

Si dos procesos concurrentes intentan materializar la misma emisión equivalente, existirá un único ganador empresarial y las demás ejecuciones recuperarán el resultado o conservarán un estado recuperable.

La implementación física de constraint, claim, lock, lease, transacción u outbox se define en los bloques de arquitectura e implementación. Esta tarea fija la invariante, no la tecnología.

---

#### 17. Atomicidad entre hecho propietario y emisión

La arquitectura física posterior deberá garantizar que no sea posible confirmar silenciosamente:

```text
VENTA INTERNA SIN REGISTRO RECUPERABLE DE SU EMISIÓN OBLIGATORIA
```

ni:

```text
EVENTO EMPRESARIAL SIN HECHO PROPIETARIO CONFIRMADO
```

El límite propietario deberá vincular de forma atómica o equivalentemente durable:

- hecho empresarial;
- versión aplicable;
- clave y huella idempotentes;
- `event_id`;
- resultado recuperable;
- registro de publicación pendiente o mecanismo equivalente.

No se selecciona en esta tarea una tabla outbox, broker, cola, trigger, función, job, librería o servicio.

---

#### 18. Publicación no equivale a efecto

Se preserva la cadena:

```text
HECHO PERSISTIDO
≠
EVENTO PERSISTIDO
≠
PUBLICACIÓN CONFIRMADA
≠
ENTREGA A CONSUMIDORA
≠
CLAIM DE CONSUMIDORA
≠
EFECTO DE CONSUMIDORA
```

Por tanto:

- un ACK del transporte no demuestra inventario descontado;
- una entrega a NEXO no demuestra un movimiento físico;
- una entrega a NUMERA no demuestra un hecho económico aplicado;
- una entrega a PASS no demuestra puntos acumulados o redimidos;
- el fallo de una consumidora no borra el hecho de PULSO;
- el éxito de una consumidora no confirma a las demás.

---

#### 19. Audiencia y consumidoras

La audiencia de la emisión se resuelve mediante `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001` según:

- `event_definition_id`;
- proceso;
- relación directa o condicional;
- finalidad;
- perfil de proyección;
- sensibilidad;
- versión;
- condición aplicable.

`INT-POS-015` no crea una lista paralela de suscriptores.

Las relaciones existentes de los procesos comerciales PULSO se conservan. La presencia de NEXO, NUMERA, PASS, FOGO u otra aplicación depende del proceso y de la definición aprobada; esta tarea no añade ni retira consumidoras.

El mini-bloque POS reserva específicamente los efectos posteriores de NEXO, NUMERA y PASS a `INT-POS-016`, `INT-POS-017` e `INT-POS-018` respectivamente.

---

#### 20. Idempotencia de consumidoras y efectos

Después de la emisión:

```text
CONSUMER_INBOX
=
consumer_application + event_id
```

Cuando una misma consumidora pueda producir varios efectos legítimos:

```text
CONSUMER_EFFECT
=
consumer_application + event_id + effect_code
```

Consecuencias:

1. redelivery no produce un segundo claim efectivo del mismo evento en una misma consumidora;
2. NEXO, NUMERA y PASS no comparten una clave universal;
3. una consumidora no acredita el efecto de otra;
4. un efecto ya confirmado devuelve su resultado previo o no-op autorizado;
5. la emisión de PULSO no se regenera porque una consumidora necesite retry;
6. el perfil de retry del efecto se decide en la frontera propietaria correspondiente.

---

#### 21. Relación con webhook, polling, archivo y replay

Los mecanismos definidos o preservados por `INT-POS-014` alimentan la misma puerta de esta tarea:

```text
WEBHOOK
POLLING
ARCHIVO
REPLAY
        ↓
MISMA IDENTIDAD DE VENTA
        ↓
MISMA DECISIÓN DE PROCESO Y HECHO
        ↓
MISMA EMISIÓN EQUIVALENTE
```

Un canal distinto no produce un `event_id` nuevo para el mismo evento ya persistido.

Polling puede descubrir una venta omitida por webhook y provocar su primera emisión legítima. Polling no produce una segunda emisión si la venta y el hecho ya habían sido reconocidos y emitidos.

---

#### 22. Resultado desconocido y conflicto

No habrá emisión de éxito cuando:

- la misma identidad externa tenga contenido material incompatible sin revisión acreditada;
- la versión aplicable sea incierta;
- el proceso empresarial no pueda resolverse;
- el hito durable no pueda resolverse;
- la productora resultante no coincida con la propietaria canónica;
- la venta sea stale para el hecho que se intenta emitir;
- exista `RECONCILIATION_REQUIRED`;
- la evidencia no permita demostrar si la emisión ya fue persistida.

Ante una respuesta perdida después de una posible persistencia de evento, primero se recuperará el resultado por la identidad idempotente. Solo cuando pueda demostrarse que no existe una emisión aplicada podrá materializarse la primera emisión.

---

#### 23. Anulaciones, devoluciones, reembolsos y correcciones

Una emisión normal de venta no se muta para representar un hecho inverso.

Reglas:

1. el evento original permanece inmutable;
2. el reverso conserva relación con la venta y con el hecho original;
3. una anulación, devolución o reembolso utiliza la semántica aprobada correspondiente;
4. las familias condicionales conservan su propietaria de proceso;
5. una consumidora no emite una corrección del proceso PULSO como si fuera PULSO;
6. `INT-POS-019` define las compensaciones internas;
7. la relación causal entre original y compensación deberá permanecer auditable;
8. una segunda recepción del mismo reverso no produce una segunda compensación.

---

#### 24. Línea base física observada

La ruta legacy revisada en `vento-pulso`:

1. recibe un XLSX de ventas agregadas por artículo;
2. calcula SHA-256 del archivo;
3. crea `pulso_daily_sales_import_batches`;
4. crea `pulso_daily_sales_import_rows`;
5. utiliza estados técnicos `draft`, `validated`, `posted` y `cancelled`;
6. permite ejecutar `pulso_post_daily_sales_import`;
7. la migración asociada puede crear movimientos `sale_out` y registros de posting de inventario.

Esta línea base no demuestra por sí sola el contrato objetivo de `INT-POS-015`.

En particular:

```text
BATCH status = validated
≠
EVENTO EMPRESARIAL DE VENTA VALIDADA
```

y:

```text
FILA AGREGADA POR PRODUCTO
≠
VENTA INDIVIDUAL CON event_id
```

El texto de interfaz que informa ventas “importadas y validadas” describe la operación legacy observada; no constituye evidencia de que exista una emisión normal `VPROC-*.EVT-*` por venta individual.

Esta tarea no modifica esa implementación.

---

#### 25. Estado material de Makos para esta puerta

Con la evidencia actualmente documentada:

- Makos dispone de una vía de API habilitable bajo solicitud, pero el contrato técnico del tenant aún no está provisionado en el plan;
- el flujo `makos_excel` no demuestra identidad individual completa de venta y línea;
- el flujo agregado no demuestra clasificación individual entre servicio de mesa, mostrador u otro proceso PULSO;
- no se puede asignar de forma segura una definición `VPROC-*.EVT-*` por cada venta individual del Excel sin fabricar granularidad o semántica.

Por tanto, la puerta definida queda **ESPECIFICADA**, pero la primera materialización con datos individuales reales permanece condicionada a la evidencia que deberá comprobar `INT-POS-021`.

Esto no difiere la definición de esta tarea: la regla de emisión queda completa y el binding real tiene propietaria documental y condición de salida exactas.

---

#### 26. Transición futura hacia PULSO

La sustitución de Makos como fuente no altera la identidad de las consumidoras ni obliga a crear otro contrato de evento.

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO COMO PROPIETARIA INTERNA
→ EVENTO CANÓNICO
```

Después del corte:

```text
PULSO
→ HECHO PROPIO
→ EVENTO CANÓNICO
```

`INT-POS-023` gobierna el cambio de fuente por sede, terminal y fecha efectiva.

`INT-SALES-001` y `INT-SALES-002` preservan el contrato permanente para que PULSO registre la venta y emita el mismo contrato canónico sin obligar a las consumidoras a conocer si la venta se originó antes en Makos o directamente en PULSO.

---

#### 27. Auditoría y evidencia mínima

Cada decisión de emisión deberá permitir reconstruir, como mínimo:

- venta canónica;
- identidad externa de venta;
- sistema e instancia de origen;
- revisión de fuente;
- recepción o recepciones que aportaron evidencia;
- versión del contrato canónico;
- proceso resuelto;
- definición de evento resuelta;
- fundamento de la resolución;
- `event_id`;
- versión del agregado;
- momento empresarial y momento de registro;
- productora empresarial;
- correlación;
- mappings aplicables;
- estado de cuarentena relevante;
- resultado idempotente;
- referencia al registro durable de emisión;
- intentos de publicación y resultado cuando existan;
- consumidoras y resultados posteriores mediante sus propias referencias;
- conflicto o conciliación cuando corresponda.

La auditoría utiliza referencias protegidas y no exige copiar secretos ni el payload bruto en logs.

---

#### 28. Prohibiciones explícitas

Queda prohibido:

1. crear `SALE_VALIDATED` como definición normal sin pasar por la fuente funcional propietaria y el gobierno del catálogo;
2. inventar un `event_type` específico de Makos;
3. usar `validated` del lote legacy como hecho empresarial equivalente;
4. emitir desde el adaptador como `producer_application`;
5. tratar Makos como productora interna;
6. utilizar webhook, polling, archivo, batch, fila, request o delivery como sustituto del `event_id`;
7. regenerar `event_id` en retry;
8. usar `sale_id` como clave única para todos los eventos legítimos de una venta;
9. seleccionar `VPROC-0040` únicamente porque la venta provenga de un sistema externo;
10. inferir mesa, mostrador, canal o modalidad desde ausencia de datos;
11. emitir un hito de cierre cuando la fuente solo demuestra recepción o estado intermedio;
12. convertir una revisión de mapping en un nuevo evento de venta;
13. omitir del contrato una línea problemática para aparentar elegibilidad;
14. permitir que una línea `ACTIVE` produzca efecto dependiente de producto;
15. interpretar publicación como efecto en NEXO, NUMERA o PASS;
16. reemitir el evento original para representar una devolución o reembolso;
17. fan-out hacia consumidoras no registradas;
18. incluir secretos, tokens o credenciales en el evento;
19. aplicar escrituras directas en fuentes privadas de NEXO, NUMERA o PASS desde el adaptador;
20. modificar código, tablas, funciones, migraciones, Supabase, datos o configuración durante esta tarea.

---

#### 29. Carryover obligatorio

| Pendiente material                                                       | Tarea propietaria | Condición de salida                                                                                        |
| ------------------------------------------------------------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| efecto físico de venta en NEXO                                           | `INT-POS-016`     | cada efecto físico usa alcance propio, línea elegible y resultado exactamente una vez                      |
| efecto económico en NUMERA                                               | `INT-POS-017`     | NUMERA consume el hecho aplicable mediante identidad propia y resultado reconciliable                      |
| efecto de fidelización                                                   | `INT-POS-018`     | PASS procesa únicamente cuando la venta y el cliente cumplen elegibilidad                                  |
| compensación de anulaciones y devoluciones                               | `INT-POS-019`     | cada efecto inverso conserva original, causa, identidad y resultado                                        |
| ventas emitidas sin efectos, efectos faltantes o divergencias            | `INT-POS-020`     | conciliación identifica venta, evento, consumidora, efecto, conflicto y acción pendiente                   |
| evidencia real de identidad, proceso, hito y capacidad del binding Makos | `INT-POS-021`     | una muestra real demuestra clasificación y emisión potencial sin producir efectos                          |
| piloto con efectos                                                       | `INT-POS-022`     | se demuestran previamente las puertas de procedencia, mapping, cuarentena, idempotencia, emisión y efectos |
| cambio de fuente a PULSO                                                 | `INT-POS-023`     | fuente resuelta por sede, terminal y fecha efectiva sin doble emisión                                      |
| registro permanente de venta PULSO                                       | `INT-SALES-001`   | PULSO materializa la venta bajo el contrato canónico definitivo                                            |
| emisión permanente desde PULSO                                           | `INT-SALES-002`   | PULSO emite el mismo contrato sin dependencia del adaptador externo                                        |

Ningún pendiente queda sin tarea propietaria ni condición de salida.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea especializa para la transición POS externo → PULSO comportamientos verificables que ya están protegidos por el registro canónico vigente: fuente única, catálogo cerrado de eventos, emisora propietaria, consumidoras registradas, afirmación externa validada antes del hecho interno, separación entre evento y ACK técnico, identidad estable de emisión, redelivery idempotente, atomicidad del hecho y su registro de publicación, separación de inbox y efecto consumidor, no duplicación de ventas o efectos, prohibición de escrituras cruzadas y convergencia del POS externo con PULSO. No se introduce una definición normal nueva, una relación productora-consumidora nueva ni una excepción ejecutable nueva.

---

#### 31. Cobertura de prueba existente preservada

Se preserva sin modificación la cobertura vigente, en especial:

- `TREQ-INTEGRATION-014`, que exige convergencia de POS externo y PULSO en contratos canónicos sin doble emisión y con efectos exactamente una vez;
- `TREQ-INTEGRATION-049`, sobre procedencia, autenticidad, identificador externo, payload protegido, recepción y correlación antes de producir un hecho interno;
- `TREQ-INTEGRATION-054` a `TREQ-INTEGRATION-068`, sobre catálogo de emisoras, propiedad, exclusión de terceros como emisores internos y PULSO como emisora de sus procesos comerciales;
- `TREQ-INTEGRATION-080` a `TREQ-INTEGRATION-107`, sobre consumidoras, finalidad, audiencia, proyecciones y trazabilidad;
- `TREQ-INTEGRATION-108` a `TREQ-INTEGRATION-122`, sobre alcances idempotentes, `event_id`, redelivery, inbox, efectos, concurrencia, respuesta perdida y atomicidad;
- `TREQ-INTEGRATION-139` a `TREQ-INTEGRATION-163`, sobre retry conservando identidad, perfiles, resultado desconocido, claims y observabilidad;
- `TREQ-INTEGRATION-298`, que exige que un evento represente un hecho ya confirmado y no una instrucción para editar otra fuente;
- `TREQ-INTEGRATION-306`, que limita al adaptador a su frontera y exige contratos propietarios para efectos internos;
- `TREQ-PULSO-005`, sobre separación de pedido, venta, línea, preparación, cumplimiento y estados derivados;
- `TREQ-PULSO-006`, sobre separación de venta, pago, caja, fiscalidad, reversos y cierre.

Ninguna fila del registro cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia por esta tarea.

---

#### 32. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `INT-POS-014` como tarea anterior aprobada;
2. mantiene `INT-POS-016` como única siguiente tarea reservada;
3. define “venta validada” como puerta de integración y no como nuevo `event_definition_id`;
4. crea cero definiciones normales de evento;
5. modifica cero definiciones normales de evento;
6. mantiene `PROC-CAT-017` como fuente normativa de `VPROC-*.EVT-*`;
7. mantiene `PULSO` como emisora empresarial de sus procesos aun cuando Makos sea `source_system`;
8. impide que Makos, el adaptador o la infraestructura sean emisores empresariales internos;
9. exige resolver proceso empresarial real antes de emitir;
10. exige resolver hito durable real antes de emitir;
11. prohíbe seleccionar `VPROC-0040` como fallback para toda venta externa;
12. preserva las definiciones existentes de `VPROC-0038` y `VPROC-0039`;
13. exige `EVENT-ENVELOPE-001`;
14. exige `event_id` estable;
15. mantiene `EVENT_EMISSION` separado de `CONSUMER_INBOX` y `CONSUMER_EFFECT`;
16. impide regenerar evento ante redelivery, retry o polling redundante;
17. permite que polling produzca la primera emisión cuando descubre una venta realmente omitida;
18. conserva venta y líneas completas sin ocultar cuarentenas;
19. bloquea cualquier efecto dependiente de producto para líneas `ACTIVE`;
20. separa publicación, entrega y efecto;
21. deriva audiencia exclusivamente del registro transversal de consumidoras;
22. no añade ni retira consumidoras;
23. no presenta el éxito de una consumidora como éxito de otra;
24. exige atomicidad o durabilidad equivalente entre hecho propietario, idempotencia, resultado y registro de emisión;
25. impide crear evento normal por una simple revisión de mapping;
26. trata versiones tardías, conflictos y resultados desconocidos sin fabricar éxito;
27. conserva reversos como hechos separados del evento normal;
28. documenta que el flujo `makos_excel` agregado no demuestra emisión individual;
29. asigna la demostración del binding real a `INT-POS-021`;
30. asigna cada efecto posterior a su tarea exacta;
31. preserva la transición futura a PULSO y las tareas `INT-SALES-001` e `INT-SALES-002`;
32. genera cero cambios `TREQ-*`;
33. no requiere una nueva copia del registro canónico de requisitos;
34. no modifica código, DDL, DML, Supabase, datos, credenciales, endpoints, colas ni configuración remota.

---

#### 33. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-014 — Definir webhook cuando exista y polling de conciliación como respaldo`

TAREA ACTUAL APROBADA

`INT-POS-015 — Definir emisión del evento canónico de venta validada`

SIGUIENTE TAREA RESERVADA

`INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`


### ✅ INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-015 — Definir emisión del evento canónico de venta validada`
**Tarea siguiente:** `INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`
**Tipo de tarea:** documental; definición normativa del efecto físico de inventario que NEXO debe producir a partir de una venta canónica emitida por PULSO durante la transición desde el POS externo, incluyendo elegibilidad por línea, propiedad, identidad del efecto, progresión `VPROC-0025`, cantidad, UOM, selección autoritativa de existencia, cuarentena, partialidad, receipt, idempotencia, resultado desconocido, compensación y conciliación, sin implementar tablas, RPC, funciones, triggers, colas, migraciones, Supabase ni cambios de código
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Aplicación propietaria de la venta:** `PULSO`
**Aplicación propietaria del inventario:** `NEXO`
**Proceso NEXO reutilizado:** `VPROC-0025 — Retirar, consumir o trasladar existencias conservando unidad, conversión, origen y destino`
**Línea base documental:** `vento-shell@3d810b1a2feadddd0f80f080b2733c6718407c80`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Línea base NEXO observada:** `vento-nexo@142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir de forma inequívoca cómo una venta canónica elegible, emitida por PULSO conforme a `INT-POS-015`, produce en NEXO el efecto físico de salida o consumo que le corresponde **exactamente una vez**, sin permitir que PULSO, Makos, el adaptador o una función de importación escriban directamente la verdad de inventario.

Regla raíz:

```text
VENTA CANÓNICA EMITIDA POR PULSO
        ↓
EVENTO EMPRESARIAL + EVENT_ID ESTABLE
        ↓
NEXO RECIBE COMO CONSUMIDORA
        ↓
DEDUPE DE INBOX
        ↓
ELEGIBILIDAD POR LÍNEA
        ↓
SOLICITUD / INTENCIÓN NEXO CORRELACIONADA
        ↓
NEXO REVALIDA IDENTIDAD, UOM, FUENTE, EXISTENCIA Y CONDICIÓN
        ↓
VPROC-0025
        ↓
EFECTO FÍSICO + RECEIPT PROPIETARIO
        ↓
GROUP / LEGS / PROYECCIONES NEXO
        ↓
RESULTADO RECUPERABLE
        ↓
CONCILIACIÓN SIN DOBLE STOCK
```

No:

```text
VENTA VALIDADA
        ↓
UPDATE DIRECTO DE STOCK DESDE PULSO
```

No:

```text
RETRY
        ↓
NUEVO MOVIMIENTO
```

---

#### 2. Resultado sustantivo

`INT-POS-016` deja definido el contrato documental completo del efecto físico de venta sobre NEXO con las siguientes decisiones:

1. NEXO es la única propietaria del movimiento, saldo, ubicación, lote, condición, custodia, posting y receipt de inventario.
2. PULSO conserva la venta y emite el hecho comercial; no registra por autoridad propia un movimiento NEXO.
3. Makos y el adaptador nunca escriben inventario Vento.
4. La unidad primaria de elegibilidad es una **línea canónica de venta**.
5. Cada línea elegible produce como máximo un efecto físico lógico de venta en NEXO para el mismo `event_id` y la misma finalidad, aunque ese efecto pueda requerir varios componentes, asignaciones o legs.
6. La identidad transversal del efecto usa el alcance `CONSUMER_EFFECT`.
7. NEXO deduplica primero su inbox por `consumer_application + event_id`.
8. El efecto se identifica por la combinación transversal `consumer_application + event_id + effect_code`.
9. Un `effect_code` estable distingue el efecto físico de la línea sin sustituir la identidad de venta, línea, producto, movimiento o receipt.
10. Una línea `ACTIVE` en cuarentena produce cero efecto físico.
11. Una liberación de cuarentena no crea otra venta, línea ni evento; únicamente permite intentar el efecto pendiente con las identidades originales.
12. Una línea explícitamente resuelta como sin efecto de inventario produce cero legs y cero mutación de stock; esa disposición no puede usarse como fallback por falta de mapping.
13. NEXO resuelve autoritativamente la existencia física, origen, LOC, posición, lote, condición y disponibilidad aplicables.
14. PULSO puede transportar contexto o referencias acreditadas, pero no fijar el saldo disponible ni imponer una existencia física como verdad NEXO.
15. Cantidad comercial, presentación, UOM, factor y cantidad base permanecen trazables y versionados.
16. Una línea que requiera varios componentes físicos se registra como un solo efecto lógico con componentes o legs subordinados, no como varias ventas ni varios efectos equivalentes.
17. Los splits entre varias fuentes físicas permanecen dentro de la misma causalidad del efecto.
18. Partialidad, bloqueo y remanente deben permanecer explícitos; ningún fragmento confirmado puede repetirse.
19. Un resultado desconocido se consulta por la identidad del efecto antes de cualquier nuevo intento.
20. Un efecto confirmado se corrige mediante compensación o reversa NEXO, nunca editando o borrando el movimiento original.
21. La transición de Makos a PULSO no cambia el contrato de NEXO ni obliga a las consumidoras a conocer el mecanismo de origen.
22. Se crean cero requisitos `TREQ-*`.
23. Se modifican cero requisitos `TREQ-*`.
24. Se crean cero objetos físicos.
25. Se modifican cero objetos físicos.

---

#### 3. Base canónica preservada

La tarea consume sin reinterpretación las decisiones ya aprobadas en:

- `INT-POS-005`, para identidad y contrato canónico de venta y línea;
- `INT-POS-006`, para encabezados, líneas, estados y timestamps;
- `INT-POS-007`, para componentes monetarios y separación de medios de pago;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos no destructivos;
- `INT-POS-009`, para recepción, payload, hash, versiones y correlación;
- `INT-POS-010`, para empresa, sede, terminal y caja;
- `INT-POS-011`, para producto, presentación y receta;
- `INT-POS-012`, para cuarentena por línea;
- `INT-POS-013`, para identidad e idempotencia de sistema, venta y línea;
- `INT-POS-014`, para convergencia de webhook, polling, archivo y replay;
- `INT-POS-015`, para emisión canónica, `event_id`, audiencia y separación entre emisión y efectos;
- `INT-PROD-001` y `INT-PROD-002`, como precedente de frontera FOGO–NEXO sobre `VPROC-0025`;
- `INT-APP-001` a `INT-APP-010`, para catálogo de eventos, productoras, consumidoras, idempotencia, retry, auditoría, parcialidad y prohibición de escrituras cruzadas;
- `VPROC-0025`, como proceso propietario del retiro, consumo o traslado de existencias;
- los contratos documentales de NEXO que gobiernan movimientos, retiros, receipt, groups, legs, proyecciones y compensaciones.

Ninguna de esas decisiones se reabre.

---

#### 4. Propiedad empresarial

| Elemento                                  | Propietaria                        | Regla                                                                              |
| ----------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| venta canónica                            | `PULSO`                            | conserva el hecho comercial, sus líneas, estado y revisión                         |
| evento comercial                          | `PULSO`                            | emite el hecho ya confirmado conforme al catálogo transversal                      |
| producto maestro físico                   | `NEXO`                             | conserva identidad física y equivalencias maestras                                 |
| receta                                    | `FOGO`                             | conserva definición y versión de receta; NEXO no la reinterpreta                   |
| mapping externo                           | contrato de integración aprobado   | relaciona la afirmación externa con identidades canónicas sin transferir propiedad |
| stock físico                              | `NEXO`                             | única verdad de cantidad física                                                    |
| LOC, posición, lote, condición y custodia | `NEXO`                             | se resuelven dentro de la frontera NEXO                                            |
| movimiento de inventario                  | `NEXO`                             | solo NEXO lo confirma                                                              |
| efecto económico                          | `NUMERA`                           | se reserva a `INT-POS-017`                                                         |
| fidelización                              | `PASS`                             | se reserva a `INT-POS-018`                                                         |
| compensaciones cruzadas                   | cada propietaria                   | se coordinan en `INT-POS-019` sin escrituras directas ajenas                       |
| conciliación                              | proceso asignado por `INT-POS-020` | compara venta, evento, efectos y residual sin fabricar hechos                      |

Regla cardinal:

```text
PULSO AFIRMA LA VENTA
NEXO AFIRMA EL MOVIMIENTO
NUMERA AFIRMA EL EFECTO ECONÓMICO
PASS AFIRMA EL EFECTO DE FIDELIZACIÓN
```

Compartir base de datos, función, esquema o infraestructura no fusiona esas propiedades.

---

#### 5. Frontera entre evento de venta y efecto NEXO

La cadena se separa obligatoriamente:

```text
EVENT_EMISSION
        ↓
DELIVERY A NEXO
        ↓
CONSUMER_INBOX
        ↓
CONSUMER_EFFECT
        ↓
OWNER TRANSACTION NEXO
        ↓
RECEIPT + EVENTOS NEXO
```

Por tanto:

- `PUBLISHED` no equivale a movimiento aplicado;
- `DELIVERED` no equivale a movimiento aplicado;
- `CLAIMED` no equivale a movimiento aplicado;
- `DUPLICATE_RESULT_RETURNED` puede cerrar correctamente un retry sin crear otro movimiento;
- solo un resultado NEXO durable puede demostrar el efecto físico;
- el éxito o fallo de NUMERA o PASS no modifica el resultado NEXO.

---

#### 6. Unidad de elegibilidad

La elegibilidad se decide por **línea canónica de venta**.

Una línea es candidata al efecto físico únicamente cuando:

1. la venta está reconocida bajo el contrato canónico;
2. la identidad de venta está resuelta;
3. la identidad de línea está resuelta;
4. la versión o revisión aplicable está determinada;
5. el evento de PULSO es válido y conserva `event_id`;
6. la línea pertenece a la venta indicada;
7. el contexto de sede requerido está resuelto;
8. el mapping de producto está `COMPLETE` para el efecto;
9. presentación y receta están resueltas o acreditadas como no aplicables según corresponda;
10. la versión exacta del mapping está identificada;
11. la línea no está en cuarentena `ACTIVE`;
12. no existe evidencia de un efecto físico incompatible ya aplicado;
13. la cantidad y UOM necesarias pueden interpretarse de forma inequívoca;
14. la línea no representa un hecho que deba tratarse como anulación, devolución, reembolso o compensación;
15. la finalidad física aplicable está resuelta.

Una venta puede contener simultáneamente líneas elegibles, líneas sin efecto físico explícito y líneas bloqueadas. No se elimina ninguna de la venta para aparentar completitud.

---

#### 7. Línea en cuarentena

Para `EXTERNAL-SALE-LINE-QUARANTINE-001` se preserva:

```text
ACTIVE
→ CERO EFECTO NEXO DEPENDIENTE DEL PRODUCTO
```

Mientras la línea permanezca `ACTIVE`:

- no se crea operación física `VPROC-0025` derivada de esa línea;
- no se crea movimiento;
- no se reduce stock por sede;
- no se reduce stock por ubicación;
- no se consume receta;
- no se consume ingrediente;
- no se marca la línea como físicamente aplicada;
- un retry no cambia esta condición;
- una segunda recepción no libera la cuarentena;
- la ausencia de mapping no se transforma en una disposición sin inventario.

Cuando la línea pasa a `RELEASED`:

- conserva venta, línea y procedencia originales;
- conserva el `event_id` del hecho que originó el efecto pendiente cuando siga siendo semánticamente aplicable;
- usa la versión de mapping que sustenta la liberación;
- no descuenta inventario por el acto de liberar;
- queda habilitada para que NEXO procese el efecto todavía faltante;
- si existe duda sobre un posting anterior, pasa primero a conciliación y no se ejecuta por inferencia.

---

#### 8. Disposición explícita sin efecto de inventario

Una línea puede concluir con cero efecto físico únicamente cuando exista una decisión empresarial explícita y verificable que determine que esa línea no genera inventario real.

En ese caso:

```text
EFECTO FÍSICO
=
NO_OP AUTORITATIVO
```

y se exige:

- identidad de venta y línea;
- fundamento de la disposición;
- versión de la regla o mapping aplicable;
- actor o autoridad cuando corresponda;
- resultado durable recuperable;
- cero group cuantitativo;
- cero legs de inventario;
- cero mutación de proyecciones de stock.

No se permite:

```text
MAPPING AUSENTE
→ NO INVENTARIO
```

ni:

```text
STOCK INSUFICIENTE
→ NO INVENTARIO
```

ni:

```text
ERROR DE RECETA
→ NO INVENTARIO
```

---

#### 9. Unidad lógica del efecto

Para una línea elegible se define una única intención lógica de salida de inventario vinculada a:

```text
VENTA CANÓNICA
+
LÍNEA CANÓNICA
+
EVENT_ID
+
FINALIDAD FÍSICA
```

La línea puede requerir:

- un producto terminado almacenado;
- un componente directo;
- varios componentes derivados de una receta aprobada;
- una misma cantidad distribuida entre varias existencias físicas;
- cero movimiento cuando exista disposición explícita sin inventario.

Los componentes físicos y asignaciones son subordinados a la misma causalidad de la línea. No crean ventas nuevas.

Cuando existan varios efectos NEXO legítimos derivados del mismo evento, cada efecto conserva un `effect_code` estable y diferente. Para esta tarea, el efecto físico de una línea no se multiplica por retry, ubicación, lote, posición, fragmentación técnica o número de intentos.

---

#### 10. Idempotencia transversal del efecto

La identidad transversal aplicable es:

```text
CONSUMER_EFFECT
=
consumer_application + event_id + effect_code
```

Para esta tarea:

```text
consumer_application = NEXO
```

Reglas:

1. la misma clave y la misma huella lógica recuperan el resultado previo;
2. la misma clave con contenido material distinto produce `CONFLICTING_REUSE`;
3. dos intentos concurrentes producen un solo ganador empresarial;
4. el segundo intento no ejecuta un check-then-act inseguro;
5. un timeout posterior al commit exige consultar el resultado antes de repetir;
6. redelivery conserva `event_id`;
7. replay del mismo evento conserva `event_id`;
8. un `delivery_id`, `attempt_id`, `trace_id`, batch o row id no sustituye la identidad del efecto;
9. `sale_id` por sí solo no es clave suficiente;
10. `line_id` por sí solo no es clave suficiente;
11. `event_definition_id` por sí solo no es clave suficiente;
12. el hash del payload es guardia de equivalencia o conflicto, no identidad del movimiento;
13. cambiar de LOC o producto después de haber confirmado el mismo efecto no es un retry compatible: exige conflicto, corrección o compensación según el caso.

---

#### 11. Huella lógica del efecto

La huella del efecto NEXO deberá incluir únicamente campos empresariales materiales y versionados suficientes para detectar repetición frente a conflicto.

Debe considerar, cuando corresponda:

- venta canónica;
- línea canónica;
- revisión de venta y línea aplicable;
- definición del evento fuente;
- producto físico;
- presentación;
- receta y versión;
- componentes físicos;
- cantidad comercial;
- UOM de entrada;
- factor aplicado;
- cantidad base;
- sede;
- finalidad de consumo;
- mapping y versión;
- disposición sin inventario cuando aplique.

No debe variar por:

- retry count;
- intento técnico;
- delivery id;
- trace id;
- hora técnica de reenvío;
- worker;
- webhook frente a polling;
- nombre de archivo;
- posición física de una fila agregada.

Una diferencia material en la huella no se corrige sobrescribiendo el efecto previo.

---

#### 12. Contrato mínimo de entrada hacia NEXO

El handoff deberá permitir resolver, como mínimo:

| Grupo       | Información                                                             |
| ----------- | ----------------------------------------------------------------------- |
| evento      | `event_id`, definición, versión, `occurred_at`, productora              |
| venta       | identidad canónica, identidad externa, sistema de origen, revisión      |
| línea       | identidad canónica, identidad externa cuando exista, revisión, cantidad |
| contexto    | empresa, sede y demás contexto territorial requerido                    |
| mapping     | producto, presentación, receta, versión, vigencia y resultado           |
| cantidad    | cantidad comercial, UOM, conversión aplicable y precisión               |
| procedencia | referencias a recepción y evidencia original                            |
| correlación | `correlation_id`, `causation_id` cuando aplique                         |
| efecto      | `effect_code`, clave idempotente, huella y versión contractual          |
| estado      | cuarentena, disposición física y cualquier bloqueo conocido             |

PULSO no transporta como autoridad:

- saldo NEXO definitivo;
- cantidad disponible definitiva;
- LOC definitivo no revalidado;
- posición definitiva no revalidada;
- lote definitivo no revalidado;
- condición definitiva no revalidada;
- movimiento ya aplicado;
- posting receipt;
- estado final de `VPROC-0025`.

---

#### 13. Creación o recuperación de la operación NEXO

Una línea elegible origina o recupera una operación propietaria NEXO.

Antes de que NEXO persista una instancia válida debe resolver:

- `source_stock_ref` real;
- `destination_or_consumption_ref` real;
- producto y alcance compatibles;
- cantidad y unidad compatibles;
- fuente física elegible;
- autoridad o contrato técnico aplicable;
- versión esperada;
- ausencia de un resultado previo incompatible.

La referencia de consumo se vincula al efecto físico de la venta y su línea, no a una fila técnica de importación.

Si NEXO no puede resolver una fuente física elegible, no crea una operación ficticia ni presume que el efecto ocurrió.

---

#### 14. Progresión canónica de `VPROC-0025`

La salida de venta reutiliza la progresión existente:

```text
VPROC-0025.STOCK_OPERATION_REQUESTED
        ↓
VPROC-0025.VALIDATION_IN_PROGRESS
        ↓
VPROC-0025.RESERVED
        ↓
VPROC-0025.READY_FOR_EXECUTION
        ↓
VPROC-0025.IN_EXECUTION
        ↓
VPROC-0025.DESTINATION_CONFIRMATION_PENDING
        ↓
VPROC-0025.POSTING_PENDING
        ↓
VPROC-0025.STOCK_OPERATION_RECONCILED
```

Interpretación para venta:

- `STOCK_OPERATION_REQUESTED`: NEXO aceptó una solicitud válida; todavía no hay descuento;
- `VALIDATION_IN_PROGRESS`: NEXO valida fuente, identidad, cantidad, unidad, disponibilidad, condición y versiones;
- `RESERVED`: la cantidad aplicable queda protegida frente a una operación competidora durante la ejecución;
- `READY_FOR_EXECUTION`: la operación física está preparada con origen y alcance resueltos;
- `IN_EXECUTION`: NEXO materializa la salida o consumo;
- `DESTINATION_CONFIRMATION_PENDING`: el vínculo de consumo con la venta y la línea debe quedar confirmado de forma durable;
- `POSTING_PENDING`: el efecto validado espera su registro canónico en el ledger;
- `STOCK_OPERATION_RECONCILED`: cantidad, UOM, origen, consumo, group, legs, receipt y proyecciones quedaron conciliados.

Una implementación futura puede atravesar estados de manera inmediata cuando las precondiciones ya estén resueltas, pero no puede fusionar sus significados ni presentar un estado temprano como posting confirmado.

---

#### 15. Eventos NEXO preservados

No se crea una definición de evento nueva para “salida por venta”.

`VPROC-0025` conserva sus seis definiciones normales:

- `VPROC-0025.EVT-001` — operación de stock solicitada;
- `VPROC-0025.EVT-002` — validación en curso;
- `VPROC-0025.EVT-003` — cantidad reservada;
- `VPROC-0025.EVT-004` — confirmación de destino o consumidor pendiente;
- `VPROC-0025.EVT-005` — posting pendiente;
- `VPROC-0025.EVT-006` — operación de existencias reconciliada.

El movimiento o posting receipt demuestra el efecto físico; los eventos NEXO describen los hitos durables del proceso NEXO y no se sustituyen por el evento comercial PULSO.

---

#### 16. Selección autoritativa de existencia

NEXO resuelve la existencia física desde su propia fuente de verdad.

La selección debe considerar, cuando aplique:

- sede;
- LOC;
- posición;
- producto;
- presentación;
- lote o batch;
- vencimiento;
- condición;
- LPN;
- reservas;
- bloqueos;
- cuarentena;
- asignaciones;
- cantidad utilizable;
- política física versionada;
- versiones de los recursos.

La cantidad utilizable no equivale al `current_qty` visible.

PULSO puede aportar contexto o un candidato de origen cuando el contrato lo permita, pero NEXO debe revalidarlo.

Una regla almacenada por la integración no puede transferir a PULSO la autoridad para escoger el origen físico definitivo.

---

#### 17. Stock insuficiente o existencia no elegible

Si NEXO no dispone de cantidad utilizable suficiente para completar el efecto solicitado:

- no aplica `Math.max(0, ...)`;
- no recorta silenciosamente la cantidad;
- no marca la línea como aplicada;
- no crea una disposición sin inventario;
- no cambia el producto para hacer coincidir el saldo;
- no consume una reserva ajena;
- no selecciona un lote vencido, bloqueado o en cuarentena;
- conserva el faltante o residual;
- devuelve un resultado no concluyente o bloqueado conforme al contrato NEXO;
- crea o vincula el caso correspondiente cuando la arquitectura propietaria lo exija;
- deja el efecto detectable por `INT-POS-020`.

La venta comercial ya ocurrida no convierte una proyección de stock insuficiente en permiso para alterar la historia física sin control.

---

#### 18. Cantidad, UOM y conversión

Cada efecto debe conservar:

```text
cantidad de venta
+
UOM comercial
+
presentación aplicable
+
factor versionado
+
cantidad base NEXO
+
precisión y redondeo aplicados
```

Reglas:

1. cantidad de venta y cantidad de stock son conceptos distintos;
2. la conversión se reproduce desde una regla versionada;
3. una presentación no se infiere por ser `default`;
4. cambios futuros de UOM no reescriben el efecto histórico;
5. el receipt conserva el snapshot necesario para reconstruir el cálculo;
6. una cantidad cero no se interpreta como una salida;
7. una cantidad negativa no sustituye la semántica de devolución;
8. el efecto de devolución pertenece al flujo inverso y a `INT-POS-019` cuando genere compensación.

---

#### 19. Producto terminado, ingrediente directo y receta

La resolución física depende del mapping aprobado, no de una heurística de la implementación.

Cuando la línea representa una existencia almacenada:

- NEXO consume la identidad física mapeada;
- presentación y UOM aplicables se conservan.

Cuando la línea representa un consumo directo:

- el producto físico debe estar resuelto;
- la cantidad derivada debe ser reproducible.

Cuando la línea requiere receta:

- la referencia de receta proviene de la decisión aprobada de mapping;
- la versión o snapshot aplicable debe corresponder al momento y contexto definidos;
- FOGO continúa siendo propietaria de la receta;
- NEXO no selecciona arbitrariamente la receta activa del momento de posting;
- los componentes físicos se derivan de una versión acreditada;
- todos los componentes conservan causalidad con la misma línea de venta;
- un cambio posterior de receta no reescribe consumos históricos.

Una categoría, nombre, coincidencia aproximada o regla legacy no puede determinar por sí sola qué existencia descontar.

---

#### 20. Componentes y legs

Una línea puede producir uno o varios componentes físicos.

La representación NEXO conserva un **grupo causal** para el efecto y uno o más legs subordinados.

Cada leg deberá conservar, cuando aplique:

- source;
- receipt;
- producto;
- actor o principal técnico aplicable;
- scope;
- signo;
- cantidad;
- UOM;
- origen;
- destino o consumo;
- counterpart;
- correlación;
- causación;
- secuencia;
- `occurred_at`;
- `recorded_at`;
- identidad física y condición aplicables.

El número de legs no multiplica la identidad empresarial del efecto de venta.

Después del posting, group, legs, secuencias y receipts son inmutables.

---

#### 21. Splits y partialidad

Un mismo efecto puede requerir varias fuentes físicas.

Se permite:

```text
MISMA LÍNEA DE VENTA
→ MISMO EFECTO NEXO
→ VARIAS ASIGNACIONES / LEGS
```

cuando NEXO demuestra la conservación de cantidad y la causalidad común.

Para partialidad:

```text
SOLICITADO
=
CONFIRMADO
+
CANCELADO
+
BLOQUEADO
+
REMANENTE
```

Reglas:

1. cada fracción confirmada conserva receipt y secuencia;
2. repetir una fracción ya confirmada devuelve el resultado previo;
3. una fracción posterior no reabre ni reescribe la anterior;
4. el efecto no se presenta como completo mientras exista remanente exigible;
5. un split no permite superar la cantidad total;
6. el saldo remanente no desaparece porque otra línea de la venta haya terminado;
7. un bloqueo de una fracción queda visible para conciliación;
8. la partialidad no crea otro `event_id`;
9. la partialidad no crea otra línea canónica de venta;
10. una misma asignación no se contabiliza dos veces.

---

#### 22. Atomicidad del posting

La materialización futura deberá vincular dentro de una única frontera lógica NEXO:

- intención;
- clave idempotente;
- huella;
- versiones esperadas;
- fuente;
- línea y efecto;
- group;
- legs;
- secuencia;
- posting receipt;
- resultado recuperable;
- outbox o mecanismo equivalente.

No deberá existir un estado válido en el que:

```text
RECEIPT CONFIRMADO
SIN LEGS CORRESPONDIENTES
```

ni:

```text
LEGS APLICADOS
SIN RESULTADO IDEMPOTENTE RECUPERABLE
```

ni:

```text
PROYECCIÓN DE STOCK ACTUALIZADA
SIN CAUSALIDAD DE LEDGER
```

Las proyecciones de sede, LOC, posición, presentación, disponibilidad o costo se consumen desde el hecho NEXO y no constituyen writers paralelos.

---

#### 23. Resultado del efecto NEXO

El resultado debe ser durable y recuperable.

Como mínimo debe permitir distinguir:

- efecto aplicado por primera vez;
- resultado previo recuperado;
- ejecución en curso recuperable;
- reutilización conflictiva;
- versión obsoleta;
- dependencia fuera de orden;
- conciliación requerida;
- efecto explícitamente no aplicable;
- bloqueo o rechazo conocido.

Un resultado exitoso debe permitir correlacionar:

- venta;
- línea;
- `event_id`;
- `effect_code`;
- operación `VPROC-0025`;
- posting receipt;
- group;
- legs;
- cantidad solicitada;
- cantidad confirmada;
- remanente;
- UOM;
- producto;
- origen físico;
- momento del efecto;
- resultado de proyección cuando corresponda.

PULSO consume el resultado como referencia. No se convierte en escritora de NEXO al recibirlo.

---

#### 24. Retry y resultado desconocido

El efecto de inventario es crítico y adopta el perfil transversal aplicable a `CONSUMER_EFFECT`.

Reglas:

1. retry conserva clave, huella, operación, `event_id`, audiencia, finalidad y sensibilidad;
2. solo cambian datos técnicos del intento;
3. un timeout no se presume fallo;
4. antes de repetir se consulta receipt, intención o resultado por la identidad original;
5. un claim o lease vencido no demuestra que el efecto anterior no ocurrió;
6. al agotar el presupuesto el efecto pasa a conciliación;
7. reiniciar worker, aplicación o proceso no reinicia la identidad ni el presupuesto;
8. una redelivery posterior no genera otro movimiento;
9. un replay histórico no activa stock si el efecto ya existe;
10. un backfill no puede activar stock sensible sin autorización explícita.

---

#### 25. Orden, versiones y eventos tardíos

NEXO debe impedir que una versión tardía corrompa un efecto posterior.

Reglas:

- una revisión inferior no sobrescribe una revisión superior;
- dos eventos distintos que reclamen una versión incompatible producen conflicto o conciliación;
- una corrección de mapping no transforma retroactivamente un posting confirmado;
- una venta corregida que no cambia el hecho físico no crea otra salida;
- una revisión que sí exige otro efecto debe expresarse mediante el hecho correctivo o compensatorio correspondiente;
- la secuencia de servidor NEXO debe permitir detectar gaps;
- un gap impide declarar reconciliado el balance afectado.

---

#### 26. Corrección, anulación, devolución y compensación

Después del posting:

```text
NO UPDATE
NO DELETE
```

sobre el hecho físico confirmado.

Una corrección cuantitativa requiere:

- referencia al efecto original;
- cantidad original;
- cantidad a compensar;
- motivo;
- evidencia;
- autoridad;
- identidad idempotente propia;
- group compensatorio;
- legs opuestos o efecto correctivo autorizado;
- saldo restante;
- receipt de compensación.

Una anulación o devolución comercial no revierte stock por inferencia.

`INT-POS-019` gobierna la compensación coordinada.

Si la línea original nunca produjo efecto físico por cuarentena o bloqueo, no se fabrica una reversa NEXO.

Si no puede saberse si el efecto original ocurrió, primero se resuelve en `INT-POS-020`.

---

#### 27. Conciliación del efecto físico

`INT-POS-020` deberá poder detectar al menos:

- evento de venta elegible sin efecto NEXO;
- efecto NEXO sin evento de venta correlacionado;
- dos efectos incompatibles para la misma identidad;
- línea `ACTIVE` con movimiento físico;
- línea `RELEASED` con efecto todavía pendiente;
- disposición sin inventario usada sin fundamento;
- producto del posting distinto del mapping aplicable;
- cantidad o UOM divergentes;
- efecto parcial con remanente oculto;
- receipt sin group o legs;
- group o legs sin receipt;
- proyección divergente del ledger;
- respuesta desconocida;
- compensación sin original;
- original que requería compensación y no la tiene.

La conciliación no crea automáticamente el movimiento faltante. Primero determina el estado y luego la propietaria ejecuta la acción autorizada.

---

#### 28. Línea base física observada en PULSO

La implementación vigente observada conserva una vía legacy de importación agregada que:

- trabaja con `pulso_daily_sales_import_batches`;
- trabaja con `pulso_daily_sales_import_rows`;
- utiliza reglas `pulso_sales_consumption_rules`;
- permite modos físicos legacy;
- utiliza una ubicación de origen incluida en la regla;
- expone `pulso_post_daily_sales_import`;
- puede insertar `inventory_movements`;
- puede modificar proyecciones de stock por sede y ubicación;
- registra `pulso_sales_inventory_postings`;
- deduplica mediante una unicidad ligada a fila, producto, ubicación y modalidad de posting;
- trata una disposición legacy sin inventario marcando la fila como procesada;
- puede derivar componentes desde una receta activa al momento de ejecución.

Esta implementación no se adopta como contrato objetivo.

Brechas respecto de esta tarea:

1. la identidad está ligada a batch y row legacy, no al `event_id` y efecto canónico;
2. PULSO ejecuta escrituras físicas que pertenecen a NEXO;
3. la ubicación configurada por la integración puede actuar como decisión física;
4. la deduplicación local no representa el alcance transversal `CONSUMER_EFFECT`;
5. la fila agregada no demuestra una línea individual canónica de venta;
6. el modelo actual no materializa la progresión completa `VPROC-0025`;
7. group, legs, posting receipt y outbox canónicos no quedan demostrados por esta vía;
8. una receta activa actual no sustituye la versión histórica acreditada por el mapping;
9. el contrato de cuarentena aprobado es más estricto que `matched_code`, `matched_name` o estado técnico `validated`.

La tarea no modifica ni retira esta compatibilidad física.

---

#### 29. Línea base física observada en NEXO

La superficie de retiro vigente observada en NEXO todavía contiene una secuencia directa que puede:

- consultar stock por ubicación;
- ejecutar consumo de posiciones;
- insertar `inventory_movements`;
- actualizar stock por ubicación;
- leer y actualizar stock por sede;
- limitar el saldo de sede mediante un clamp a cero;
- registrar un movimiento operativo separado cuando una ubicación no mantiene inventario real.

Estas piezas son evidencia de implementación parcial, no demostración del contrato objetivo.

El diseño objetivo aprobado por NEXO exige convergencia posterior hacia:

- intención estable;
- fuente tipada;
- work item y contexto cuando apliquen;
- group y legs;
- receipt;
- writer único;
- proyecciones derivadas;
- idempotencia;
- conciliación;
- compensación append-only.

`INT-POS-016` no corrige esa implementación porque la fase actual es documental.

---

#### 30. Transición futura hacia PULSO

La fuente comercial puede cambiar sin cambiar la frontera de inventario.

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO
→ EVENTO CANÓNICO
→ NEXO
→ EFECTO FÍSICO
```

Después del corte:

```text
PULSO
→ EVENTO CANÓNICO
→ NEXO
→ MISMO EFECTO FÍSICO
```

NEXO no debe necesitar una implementación separada por proveedor externo.

La procedencia Makos continúa disponible para auditoría, pero la autoridad de la operación física sigue siendo NEXO.

---

#### 31. Carryover obligatorio

| Pendiente material                                              | Tarea propietaria                                 | Condición de salida                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| efecto económico derivado de venta                              | `INT-POS-017`                                     | NUMERA consume el hecho aplicable con identidad y resultado propios exactamente una vez                                     |
| fidelización                                                    | `INT-POS-018`                                     | PASS procesa acumulación o redención únicamente bajo elegibilidad y deduplicación propias                                   |
| anulaciones, devoluciones y reembolsos con efectos ya aplicados | `INT-POS-019`                                     | cada compensación conserva original, causa, identidad, pasos propietarios y verificación                                    |
| ventas y efectos divergentes                                    | `INT-POS-020`                                     | cada venta, línea, evento, efecto NEXO, residual y acción quedan reconciliados                                              |
| prueba con datos reales sin efectos                             | `INT-POS-021`                                     | se demuestra binding, mapping, cuarentena, identidad y cálculo esperado sin mutación física                                 |
| piloto con efectos                                              | `INT-POS-022`                                     | se demuestran receipts, no duplicidad, partialidad, resultado desconocido y conciliación bajo operación controlada          |
| corte de fuente                                                 | `INT-POS-023`                                     | Makos y PULSO no emiten la misma venta por sede, terminal y fecha efectiva                                                  |
| contrato permanente de salida desde PULSO                       | `INT-SALES-003`                                   | NEXO registra la salida bajo la misma frontera propietaria después del retiro del adaptador                                 |
| convergencia técnica NEXO                                       | tareas propietarias `NEXO-UX-016` y `NEXO-UX-017` | writer, groups, legs, receipts, proyecciones, autorización, UOM, partialidad y compensación quedan implementados y probados |

Ningún pendiente queda sin propietario documental.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** `INT-POS-016` especializa para una venta externa ya canónica comportamientos que el registro vigente protege de forma explícita: movimiento físico exactamente una vez hacia NEXO, fuente única de stock, cuarentena sin efecto, idempotencia por efecto consumidor, retry y resultado desconocido, groups y legs inmutables, receipt, partialidad, UOM, fuente física elegible, proyecciones derivadas, prohibición de writers cruzados y compensación append-only. No introduce una obligación material nueva, una excepción nueva ni una capacidad ejecutable adicional.

---

#### 33. Cobertura de prueba existente preservada

Se preservan sin modificación, en especial:

- `TREQ-INTEGRATION-003`, sobre identidad estable, huella, resultado durable, retry, concurrencia y resultado desconocido;
- `TREQ-INTEGRATION-006`, sobre fuente única y propagación mediante contratos;
- `TREQ-INTEGRATION-009`, sobre mapping explícito y cuarentena sin efectos automáticos;
- `TREQ-INTEGRATION-011`, sobre venta, anulación o devolución que produce el movimiento físico exactamente una vez en NEXO;
- `TREQ-INTEGRATION-014`, sobre POS externo y PULSO sin doble emisión ni doble stock;
- `TREQ-INTEGRATION-118`, sobre deduplicación independiente del inbox consumidor;
- `TREQ-INTEGRATION-119`, sobre `consumer_application + event_id + effect_code`;
- `TREQ-INTEGRATION-120` a `TREQ-INTEGRATION-122`, sobre concurrencia, respuesta perdida y atomicidad;
- `TREQ-INTEGRATION-139`, sobre conservación de identidad entre retries;
- `TREQ-INTEGRATION-151`, sobre retry crítico para inventario;
- `TREQ-NEXO-011`, sobre movimientos y proyecciones como fuente canónica, atomicidad o idempotencia compensable y prevención de doble movimiento;
- `TREQ-NEXO-177`, sobre fuente tipada, owner, versión, línea, receipt y posting previo;
- `TREQ-NEXO-178`, sobre group y legs inmutables;
- `TREQ-NEXO-179`, sobre conservación cuantitativa entre alcances;
- `TREQ-NEXO-183`, sobre intención, huella, clave, receipt, secuencia y outbox;
- `TREQ-NEXO-184`, sobre proyecciones idempotentes y reconstruibles;
- `TREQ-NEXO-186`, sobre corrección y reversa mediante groups compensatorios;
- `TREQ-NEXO-191`, sobre clasificación de ventas como fuente automática y prohibición de efecto elegido libremente;
- `TREQ-NEXO-194` y `TREQ-NEXO-195`, sobre cantidad utilizable, identidad física y UOM;
- `TREQ-NEXO-197`, sobre partialidad y remanentes;
- `TREQ-NEXO-198`, sobre idempotencia, outbound receipt y posting;
- `TREQ-NEXO-199`, sobre cero legs cuando no existe inventario real;
- `TREQ-NEXO-200`, sobre cancelación previa y compensación posterior;
- `TREQ-PULSO-001`, sobre ciclo end-to-end con inventario;
- `TREQ-PULSO-005`, sobre estados separados de venta e inventario;
- `TREQ-PULSO-006`, sobre separación de venta, pago, caja, fiscalidad y reversos.

Ninguna fila cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia.

---

#### 34. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-015` como tarea anterior;
2. mantiene `INT-POS-017` como única tarea siguiente;
3. confirma a PULSO como propietaria de la venta;
4. confirma a NEXO como única propietaria del efecto físico;
5. prohíbe escrituras de inventario desde Makos o el adaptador;
6. prohíbe que PULSO sea writer del ledger NEXO;
7. define la línea canónica como unidad primaria de elegibilidad;
8. preserva líneas bloqueadas sin eliminarlas de la venta;
9. bloquea todo efecto dependiente de producto para cuarentena `ACTIVE`;
10. establece que `RELEASED` habilita, pero no ejecuta, el efecto;
11. exige disposición explícita para cero inventario;
12. prohíbe usar cero inventario como fallback;
13. adopta `CONSUMER_INBOX` antes del efecto;
14. adopta `CONSUMER_EFFECT` para la mutación NEXO;
15. usa `consumer_application + event_id + effect_code` como identidad transversal del efecto;
16. prohíbe deduplicar únicamente por `sale_id`, `line_id`, hash, batch o row;
17. exige huella lógica versionada;
18. exige recuperación del resultado frente a retry;
19. trata reutilización incompatible como conflicto;
20. trata timeout como resultado desconocido hasta consultar la identidad original;
21. reutiliza `VPROC-0025`;
22. conserva la progresión completa de `VPROC-0025`;
23. crea cero definiciones normales de evento;
24. conserva las seis definiciones `VPROC-0025.EVT-001` a `EVT-006`;
25. exige `source_stock_ref` y `destination_or_consumption_ref` resueltos por NEXO;
26. hace a NEXO responsable de la existencia física elegible;
27. prohíbe confiar en `current_qty` visible como autoridad suficiente;
28. prohíbe clamp silencioso a cero;
29. conserva cantidad, UOM, factor y cantidad base;
30. conserva versión de receta aplicable y propiedad FOGO;
31. permite múltiples componentes dentro de una causalidad única de línea;
32. permite splits sin multiplicar la identidad del efecto;
33. conserva partialidad y remanente de forma explícita;
34. impide repetir una fracción ya confirmada;
35. exige group, legs, receipt y resultado durable;
36. exige proyecciones derivadas del ledger;
37. prohíbe UPDATE o DELETE destructivo después de posting;
38. asigna compensaciones a `INT-POS-019`;
39. asigna divergencias a `INT-POS-020`;
40. diagnostica la vía legacy de PULSO sin canonizarla;
41. diagnostica la vía de retiro actual de NEXO sin canonizarla;
42. mantiene la implementación física fuera del alcance de esta fase;
43. mantiene la transición Makos → PULSO sin cambiar el contrato NEXO;
44. genera cero cambios `TREQ-*`;
45. no genera una copia del registro 04A;
46. no modifica código, SQL, migraciones, datos, Supabase, credenciales ni configuración remota.

---

#### 35. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-015 — Definir emisión del evento canónico de venta validada`

TAREA ACTUAL APROBADA

`INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`

SIGUIENTE TAREA RESERVADA

`INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`


### ✅ INT-POS-017 — Definir evento económico para NUMERA exactamente una vez

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`
**Tarea siguiente:** `INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`
**Tipo de tarea:** documental; definición normativa del efecto económico que NUMERA debe materializar exactamente una vez a partir de una venta canónica emitida por PULSO durante la transición desde el POS externo, separando evento empresarial, hecho económico, venta, pago, caja, documento fiscal, cartera, costo y contabilidad, con identidad idempotente, huella lógica, dimensiones económicas obligatorias, componentes monetarios, cuarentena, periodos, retry, reversos y conciliación; sin implementar tablas, RPC, funciones, triggers, colas, migraciones, Supabase ni cambios de código
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Aplicación propietaria de la venta:** `PULSO`
**Aplicación propietaria del hecho económico:** `NUMERA`
**Autoridad fiscal durante la transición:** proveedor o sistema fiscal autorizado vigente
**Autoridad contable oficial durante la transición:** sistema contable o proveedor autorizado mientras no se apruebe contabilidad formal interna
**Línea base documental:** `vento-shell@c78b29b288564fa8b428cd0537b102611aeea74b`
**Línea base NUMERA observada:** `vento-numera@1b48a5da425d92e19ed89cf175b1dccc4cd960e1`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir de forma inequívoca cómo una venta canónica económicamente elegible, emitida por PULSO conforme a `INT-POS-015`, produce en NUMERA un único hecho económico durable y recuperable, sin convertir el evento de PULSO en un asiento contable, sin tratar el pago como sinónimo de ingreso y sin permitir que Makos, el adaptador, PULSO u otra aplicación escriban directamente la verdad económico-operativa de NUMERA.

La regla raíz es:

```text
HECHO COMERCIAL CONFIRMADO EN PULSO
        ↓
EVENTO EMPRESARIAL EXISTENTE + EVENT_ID ESTABLE
        ↓
ENTREGA A NUMERA
        ↓
CONSUMER_INBOX DE NUMERA
        ↓
PUERTA DE MATERIALIDAD ECONÓMICA
        ↓
CONSUMER_EFFECT DE NUMERA
        ↓
HECHO ECONÓMICO DE VENTA DURABLE
        ↓
RESULTADO RECUPERABLE
        ↓
CONCILIACIÓN CON PAGO, CAJA, FISCALIDAD, INVENTARIO Y COSTO
```

No:

```text
VENTA = PAGO = RECAUDO = DEPÓSITO = INGRESO CONTABLE
```

No:

```text
EVENTO PULSO
        ↓
INSERT DIRECTO EN LIBROS CONTABLES
```

---

#### 2. Resultado sustantivo

`INT-POS-017` deja definidas las siguientes decisiones:

1. PULSO conserva la venta; NUMERA conserva el hecho económico derivado.
2. El hecho económico de venta es un efecto de consumidora y no una nueva definición normal del catálogo empresarial.
3. No se crea un `event_definition_id` denominado `SALE_ECONOMIC_EVENT`, `ECONOMIC_SALE` ni equivalente.
4. NUMERA recibe los eventos PULSO que le correspondan según `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001`.
5. La entrega de un evento a NUMERA no demuestra por sí sola que exista un hecho económico.
6. Solo un hito cuyo `confirmed_fact` demuestre materialidad económica suficiente puede activar el efecto de venta.
7. Para el reconocimiento económico de una venta cerrada se fija el `effect_code` lógico estable `SALE_ECONOMIC_FACT`.
8. `SALE_ECONOMIC_FACT` no es un asiento, una factura, un pago, una aplicación de pago, una cuenta por cobrar ni un movimiento de caja.
9. El alcance idempotente es `CONSUMER_EFFECT`.
10. La clave lógica transversal es `consumer_application + event_id + effect_code`.
11. Para esta tarea `consumer_application = numera`.
12. La misma clave y la misma huella recuperan el resultado anterior sin repetir el hecho económico.
13. La misma clave con una huella material incompatible produce conflicto sin crear un segundo hecho.
14. Dos ejecuciones concurrentes producen un único ganador empresarial.
15. Una respuesta perdida después del commit se resuelve recuperando el resultado original.
16. El hecho económico conserva dimensiones obligatorias de entidad, sede, centro, contraparte, moneda, fechas, fuente, documento, monto, impuestos, estado y evidencia.
17. No se infiere entidad legal desde marca, sede, caja, terminal, nombre comercial o proveedor.
18. No se infiere centro de costo desde una sede si no existe una resolución canónica aplicable.
19. No se inventa moneda a partir de la interfaz o de una configuración técnica por defecto.
20. Una venta a consumidor final puede existir sin crear un cliente artificial.
21. Cliente, tercero económico, deudor y cuenta PASS permanecen separados.
22. Subtotal, impuestos, descuentos, propinas, devoluciones, pagos y referencias se preservan según su semántica de fuente; no se fusionan.
23. Las fórmulas agregadas del Excel actual no se convierten en fórmulas canónicas de una venta individual.
24. Una línea en cuarentena no impide automáticamente un hecho económico de venta a nivel de venta cuando sus importes y dimensiones obligatorias son demostrables sin utilizar el producto pendiente.
25. La cuarentena sí bloquea cualquier atribución económica que dependa del producto, presentación, receta, costo o clasificación no resuelta.
26. Una línea en cuarentena nunca se elimina del hecho económico para hacer cuadrar el total.
27. NEXO, PASS y NUMERA aplican efectos independientes; el fallo de una consumidora no revierte el hecho confirmado de otra.
28. El éxito de NEXO no acredita NUMERA y el éxito de NUMERA no acredita NEXO ni PASS.
29. El costo de inventario o producción no se fabrica desde el importe de venta; se correlaciona posteriormente con fuentes propietarias.
30. Pago recibido, aplicación, caja, banco, depósito y liquidación permanecen efectos u objetos separados.
31. El documento fiscal permanece bajo la autoridad del proveedor autorizado; NUMERA conserva referencias y componentes sin emitirlo por inferencia.
32. El hecho económico no escribe libros oficiales ni produce por sí solo débito o crédito contable.
33. Un periodo cerrado no permite descartar, sobrescribir ni backdatear silenciosamente un hecho tardío.
34. Anulaciones, devoluciones y reembolsos no mutan destructivamente el hecho original.
35. Las compensaciones se coordinan en `INT-POS-019`.
36. Las diferencias entre venta, hecho económico y demás efectos se resuelven en `INT-POS-020`.
37. La granularidad individual real de Makos continúa condicionada a `INT-POS-021`.
38. El contrato permanente posterior corresponde a `INT-SALES-004 — Definir recepción del evento de venta en NUMERA`.
39. Se crean cero requisitos `TREQ-*`.
40. Se modifican cero requisitos `TREQ-*`.
41. Se crean cero objetos físicos.
42. Se modifican cero objetos físicos.

---

#### 3. Base canónica preservada

La tarea consume sin reinterpretación:

- `INT-POS-003`, para la autoridad temporal de Makos como fuente externa dentro de su ventana;
- `INT-POS-005`, para identidad de venta y línea;
- `INT-POS-006`, para estados, revisiones y tiempos;
- `INT-POS-007`, para descuentos, impuestos, propinas y hechos de pago;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos no destructivos;
- `INT-POS-009`, para payload, hash, recepción, procedencia y versiones;
- `INT-POS-010`, para empresa, sede, terminal y caja externas;
- `INT-POS-011`, para mapping de producto, presentación y receta;
- `INT-POS-012`, para cuarentena por línea;
- `INT-POS-013`, para identidad e idempotencia de sistema, venta y línea;
- `INT-POS-014`, para convergencia de webhook, polling, archivo y replay;
- `INT-POS-015`, para selección de un evento empresarial ya existente y `event_id` estable;
- `INT-POS-016`, para el efecto físico independiente de NEXO;
- `INT-APP-001` a `INT-APP-010`, para catálogo de eventos, productoras, consumidoras, idempotencia, retry, auditoría, parcialidad y prohibición de escrituras cruzadas;
- `CAP-SCOPE-009`, para separación entre venta, pago, caja, documento fiscal, inventario, fidelización y hecho económico;
- `CAP-SCOPE-012`, para NUMERA como capa económico-operativa y para la separación entre hecho económico y contabilidad formal;
- `TREQ-NUMERA-001` a `TREQ-NUMERA-004`;
- `TREQ-INTEGRATION-003`, `006`, `014`, `017` y la cobertura transversal de idempotencia y retry ya aprobada.

Ninguna de esas decisiones se reabre.

---

#### 4. Propiedad y autoridad

| Elemento                         | Propietaria o autoridad                              | Regla                                                          |
| -------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| venta, líneas y estado comercial | `PULSO`                                              | PULSO conserva el hecho comercial interno                      |
| procedencia externa              | `Makos` durante la transición                        | se conserva como fuente externa sin adquirir propiedad interna |
| evento empresarial PULSO         | `PULSO`                                              | utiliza una definición ya existente                            |
| hecho económico derivado         | `NUMERA`                                             | NUMERA decide y persiste su efecto económico                   |
| pago operativo y caja            | `PULSO`                                              | no se sustituyen con el hecho económico                        |
| inventario físico                | `NEXO`                                               | no se reconstruye desde NUMERA                                 |
| receta y ejecución productiva    | `FOGO`                                               | NUMERA no reinterpreta receta para fabricar costo              |
| fidelización                     | `PASS`                                               | efecto separado                                                |
| documento fiscal oficial         | proveedor o sistema autorizado                       | NUMERA conserva referencia y estado                            |
| contabilidad oficial             | sistema o proveedor autorizado mientras siga externa | NUMERA no declara libros internos por este contrato            |
| cartera y tesorería              | `NUMERA` según su dominio                            | no se fusionan con la venta                                    |
| conciliación transversal         | tareas propietarias aprobadas                        | compara hechos sin reescribir fuentes                          |

Invariante:

```text
PULSO AFIRMA LA VENTA
NUMERA AFIRMA EL HECHO ECONÓMICO
NEXO AFIRMA EL EFECTO FÍSICO
PASS AFIRMA LA FIDELIZACIÓN
EL PROVEEDOR FISCAL AFIRMA EL DOCUMENTO OFICIAL
```

---

#### 5. Qué significa “evento económico” en esta tarea

La expresión del título no crea otro evento empresarial global.

La secuencia correcta es:

```text
EVENTO EMPRESARIAL DE PULSO
        ↓
EFECTO PROPIO DE NUMERA
        ↓
HECHO ECONÓMICO DE VENTA
```

El hecho económico:

- puede ser referenciado por eventos posteriores de NUMERA;
- puede alimentar cartera, conciliación, costos, rentabilidad y reporting;
- podrá mapearse en el futuro a un asiento candidato o contable;
- no es por sí mismo un asiento;
- no vuelve a emitir el evento PULSO cambiando la productora;
- no crea un catálogo de eventos específico de Makos.

---

#### 6. Puerta de materialidad económica

NUMERA no crea `SALE_ECONOMIC_FACT` por cada evento PULSO recibido.

Debe comprobar que el evento fuente:

1. pertenece a un proceso PULSO cuya relación con NUMERA está aprobada;
2. conserva `event_id` estable;
3. describe un hecho comercial durable;
4. demuestra una venta económicamente reconocible y no solo apertura, selección, preparación, handoff o validación intermedia;
5. permite correlacionar la venta canónica;
6. conserva las dimensiones obligatorias para el hecho económico o referencias autoritativas para resolverlas;
7. conserva importes y moneda con semántica suficiente;
8. no representa una anulación, devolución, reembolso o corrección que requiera una semántica compensatoria diferente;
9. no presenta una versión obsoleta, reutilización conflictiva o resultado incierto no resuelto;
10. no depende de una inferencia prohibida para completar entidad, centro, moneda, tercero, documento o importe.

Un evento válido para consumo puede producir cero efectos `SALE_ECONOMIC_FACT` si todavía no demuestra una venta económicamente reconocible.

---

#### 7. Hitos comerciales especialmente relevantes

El catálogo vigente demuestra, entre otros:

| Definición           | Hecho confirmado                                                                                     | Tratamiento para `SALE_ECONOMIC_FACT`                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `VPROC-0038.EVT-001` | servicio de mesa abierto                                                                             | no demuestra venta cerrada                                                                |
| `VPROC-0038.EVT-004` | cierre de mesa pendiente; se verifican pedido, entrega, pago, descuentos, devoluciones y diferencias | no demuestra todavía cierre económico                                                     |
| `VPROC-0038.EVT-005` | servicio de mesa cerrado                                                                             | puede activar la puerta si el contrato económico obligatorio está completo                |
| `VPROC-0039.EVT-001` | venta de mostrador abierta                                                                           | no demuestra venta cerrada                                                                |
| `VPROC-0039.EVT-004` | conciliación de venta pendiente                                                                      | no demuestra todavía el efecto económico final de venta                                   |
| `VPROC-0039.EVT-005` | venta de mostrador cerrada                                                                           | puede activar la puerta si el contrato económico obligatorio está completo                |
| `VPROC-0040.EVT-006` | pedido externo conciliado                                                                            | no demuestra por sí solo que exista una venta económica distinta; no se usa como fallback |

Otra definición solo podrá activar el efecto cuando su `confirmed_fact` aprobado demuestre materialidad equivalente y la relación consumidora vigente permita a NUMERA procesarla.

No se crea una tabla paralela de procesos económicamente válidos en esta tarea.

---

#### 8. Inbox de NUMERA

Antes de evaluar el efecto:

```text
CONSUMER_INBOX
=
numera + event_id
```

Reglas:

1. cada redelivery del mismo evento conserva `event_id`;
2. NUMERA deduplica su recepción independientemente de NEXO y PASS;
3. el inbox no acredita que el hecho económico haya sido aplicado;
4. una entrega repetida recupera la recepción previa;
5. una entrega con `event_id` reutilizado y contenido incompatible se trata como conflicto;
6. un `delivery_id`, `attempt_id`, batch, fila, webhook, ciclo de polling o archivo no sustituye `event_id`.

---

#### 9. Identidad del efecto económico

Para el efecto definido por esta tarea:

```text
effect_code = SALE_ECONOMIC_FACT
```

y:

```text
CONSUMER_EFFECT
=
numera + event_id + SALE_ECONOMIC_FACT
```

El `effect_code`:

- identifica el efecto de reconocimiento económico de la venta;
- no identifica la venta;
- no identifica el evento;
- no identifica el pago;
- no identifica el documento fiscal;
- no identifica un asiento contable;
- no identifica una cuenta por cobrar;
- no sustituye el identificador durable que NUMERA asigne al hecho económico.

Si el mismo evento produce en NUMERA otros efectos legítimos en el futuro, deberán usar códigos distintos y no reutilizar `SALE_ECONOMIC_FACT`.

---

#### 10. Resultados idempotentes

Se reutilizan los resultados transversales vigentes:

| Resultado                   | Interpretación en esta tarea                                                  |
| --------------------------- | ----------------------------------------------------------------------------- |
| `APPLIED`                   | el hecho económico de venta se materializó una vez y existe resultado durable |
| `DUPLICATE_RESULT_RETURNED` | ya existía el mismo efecto y se recuperó sin repetirlo                        |
| `CONFLICTING_REUSE`         | la misma clave pretende un contenido económico materialmente incompatible     |
| `IN_PROGRESS_RECOVERABLE`   | otra ejecución conserva el claim y el resultado deberá recuperarse            |
| `STALE_VERSION`             | el evento o agregado parte de una versión anterior incompatible               |
| `OUT_OF_ORDER_DEFERRED`     | falta una versión o dependencia previa que impide aplicar con seguridad       |
| `RECONCILIATION_REQUIRED`   | no puede determinarse el resultado correcto mediante retry automático         |
| `REJECTED`                  | la entrada no satisface el contrato o la autoridad aplicable                  |

No se crea un vocabulario local de resultados Makos–NUMERA.

---

#### 11. Huella lógica económica

La huella de `SALE_ECONOMIC_FACT` debe cubrir los campos materiales que cambiarían el hecho pretendido.

Debe considerar, cuando corresponda:

- `event_id` y definición fuente;
- venta canónica y revisión aplicable;
- sistema e instancia de origen;
- entidad legal;
- marca o unidad;
- sede;
- centro de costo;
- tercero económico o disposición autorizada aplicable;
- moneda;
- fecha de ocurrencia;
- fecha de reconocimiento;
- documento y referencia fiscal cuando existan;
- monto y componentes monetarios;
- impuestos;
- líneas económicas y sus referencias;
- estado económico pretendido;
- contrato y versión;
- referencias de evidencia material.

No debe variar únicamente por:

- retry;
- redelivery;
- intento técnico;
- `delivery_id`;
- `trace_id`;
- worker;
- tiempo técnico de reenvío;
- webhook frente a polling;
- nombre del archivo;
- posición física de una fila;
- lectura repetida del mismo payload.

Una diferencia material en la huella no se resuelve sobrescribiendo el hecho anterior.

---

#### 12. Contrato económico mínimo

Antes de `APPLIED`, NUMERA deberá poder conservar o resolver autoritativamente, como mínimo:

| Dimensión       | Regla                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------- |
| identidad       | referencia estable al hecho económico resultante                                         |
| tipo            | naturaleza económica de venta, sin convertirla en asiento                                |
| venta           | referencia a venta canónica y revisión                                                   |
| evento          | `event_id`, definición, versión y productora                                             |
| origen          | `source_system` y referencias de procedencia                                             |
| entidad legal   | identidad jurídica aplicable, no inferida desde marca                                    |
| marca o unidad  | identidad comercial cuando aplique                                                       |
| sede            | sede canónica aplicable                                                                  |
| centro de costo | centro canónico resuelto por regla vigente                                               |
| tercero         | contraparte económica conforme al contrato NUMERA, sin exigir una cuenta PASS            |
| moneda          | moneda explícita o resuelta desde fuente autoritativa versionada                         |
| ocurrencia      | momento del hecho comercial                                                              |
| reconocimiento  | fecha económica aplicable, separada de recepción técnica                                 |
| correlación     | referencias que unen venta, evento, documentos y efectos                                 |
| documento       | referencia fiscal o soporte cuando exista; ausencia tratada explícitamente               |
| monto           | importe económico con precisión y semántica demostrables                                 |
| impuestos       | componentes tributarios observados o resueltos sin afirmar cálculo oficial no demostrado |
| estado          | resultado económico propio de NUMERA                                                     |
| evidencia       | referencias protegidas a venta, origen y soportes                                        |
| líneas          | referencias a líneas comerciales necesarias para reconstrucción y conciliación           |

Los nombres físicos de tablas, columnas, tipos, RPC, schemas y contratos quedan reservados a la fase de diseño e implementación NUMERA.

---

#### 13. Entidad legal, marca, sede y centro de costo

Se preservan las desigualdades:

```text
ENTIDAD LEGAL
≠
MARCA
≠
SEDE
≠
CENTRO DE COSTO
≠
EMISOR FISCAL
```

Reglas:

1. `INT-POS-010` aporta el contexto externo e interno que ya haya sido resuelto.
2. Una sede no autoriza a inventar entidad legal.
3. Una marca no autoriza a inventar entidad legal.
4. Una terminal o caja no define centro de costo.
5. Un producto no define automáticamente centro de costo.
6. Un mapping organizacional debe tener fuente, versión y vigencia.
7. Si la dimensión obligatoria no puede resolverse sin inferencia, `SALE_ECONOMIC_FACT` no se marca `APPLIED`.
8. La definición detallada de las resoluciones financieras pertenece a `NUMERA-DOM-002`.
9. La ausencia de una resolución actual queda como `RECONCILIATION_REQUIRED`, no como valor predeterminado.

---

#### 14. Tercero económico y consumidor final no identificado

Se conserva `DEC-POS-001`: una venta a consumidor final puede realizarse sin registrar cliente.

Por tanto:

```text
CLIENTE IDENTIFICADO
≠
TERCERO ECONÓMICO
≠
DEUDOR
≠
CUENTA PASS
```

Reglas:

1. NUMERA no obliga a crear un cliente artificial para registrar una venta permitida a consumidor final.
2. Cuando exista cliente identificado, su referencia se conserva sin convertirla automáticamente en deudor.
3. Cuando no exista cliente identificado, el tratamiento del tercero económico debe provenir del contrato financiero aprobado y no de un UUID ficticio.
4. La representación física exacta del tercero para consumidor final pertenece a `NUMERA-DOM-002`.
5. Una cuenta por cobrar solo nace cuando la regla de cartera aplicable lo determine; no por ausencia de pago en el payload.
6. La tarea no crea cuentas PASS, clientes, deudores ni terceros productivos.

---

#### 15. Moneda

La moneda es obligatoria para el hecho económico.

No se permite:

```text
MONEDA AUSENTE
→ COP POR DEFAULT DE INTERFAZ
```

Una moneda podrá resolverse sin venir como campo explícito del evento únicamente cuando exista una fuente autoritativa y versionada que demuestre de forma inequívoca la moneda aplicable al hecho.

Si no puede demostrarse:

```text
SALE_ECONOMIC_FACT
→ RECONCILIATION_REQUIRED
```

El formato visual de una aplicación, un `Intl.NumberFormat`, un default de una tabla legacy o la sede no constituyen por sí solos prueba de moneda.

---

#### 16. Componentes monetarios

Se preservan como conceptos separados:

- subtotal o base comercial cuando su semántica esté demostrada;
- descuentos;
- impuestos;
- propinas;
- venta bruta cuando exista una definición fuente suficiente;
- venta neta cuando exista una definición fuente suficiente;
- devoluciones;
- reembolsos;
- medios de pago;
- importes pagados;
- comisiones o cargos de canal cuando el proceso aplicable los produzca.

Reglas:

1. NUMERA no recalcula una semántica tributaria que la fuente no haya demostrado.
2. Un impuesto observado no equivale a impuesto oficialmente liquidado o declarado.
3. Un descuento no se convierte automáticamente en gasto.
4. Una propina no se convierte automáticamente en ingreso de Vento.
5. Una devolución no se resta destructivamente del hecho original.
6. Un reembolso no sustituye una devolución.
7. Un medio de pago no modifica el monto de la venta por sí solo.
8. Un importe pagado no demuestra depósito ni conciliación bancaria.
9. Los valores se conservan con moneda, precisión, signo, fuente y alcance cuando apliquen.
10. Si un componente es desconocido, no se inventa cero.

---

#### 17. Fórmulas legacy de Makos

La implementación agregada actual contiene fórmulas locales equivalentes a:

```text
net_sales_amount = subtotal - discounts - returns
gross_sales_amount = subtotal + tax
```

Estas fórmulas:

- son cálculos del importador agregado actual;
- no demuestran si el impuesto está incluido o excluido en una venta individual;
- no prueban la semántica individual de devoluciones;
- no prueban propina;
- no prueban medios de pago;
- no prueban moneda;
- no constituyen el contrato económico de NUMERA.

`INT-POS-017` prohíbe elevarlas automáticamente a fórmula financiera canónica.

---

#### 18. Granularidad del hecho económico

La unidad de esta tarea es **una venta canónica económicamente reconocible**, no el archivo, lote de importación ni fila agregada por producto.

Un `SALE_ECONOMIC_FACT` puede conservar detalle de líneas para reconstrucción, distribución y conciliación, pero sus componentes no crean ventas adicionales.

Por tanto:

```text
UNA VENTA ECONÓMICA
→ UN SALE_ECONOMIC_FACT POR EVENT_ID Y EFFECT_CODE
→ CERO O MÁS COMPONENTES / LÍNEAS ECONÓMICAS
```

No:

```text
UNA FILA XLSX POR PRODUCTO
→ UNA VENTA ECONÓMICA INVENTADA
```

---

#### 19. Cuarentena y elegibilidad económica

La cuarentena de `INT-POS-012` protege los efectos que dependan del mapping del producto.

Para NUMERA se decide:

1. una línea `ACTIVE` permanece visible y correlacionada;
2. no se elimina de la venta;
3. no se inventa producto, presentación, receta, costo, familia, categoría económica ni centro dependiente de producto;
4. la línea `ACTIVE` no bloquea automáticamente el reconocimiento del importe global de una venta si ese importe, entidad, sede, centro, moneda, impuesto y demás dimensiones obligatorias pueden demostrarse sin usar el mapping pendiente;
5. una línea hermana elegible no hereda el bloqueo físico de otra línea;
6. cualquier atribución económica dependiente de producto permanece pendiente;
7. cualquier cálculo de costo o rentabilidad dependiente de producto permanece pendiente;
8. si la cuarentena impide reconciliar el monto, impuestos o una dimensión económica obligatoria, el efecto completo pasa a `RECONCILIATION_REQUIRED`;
9. liberar una línea no crea otra venta ni otro evento PULSO;
10. liberar una línea después de `SALE_ECONOMIC_FACT.APPLIED` no vuelve a reconocer el ingreso;
11. cualquier enriquecimiento, reclasificación o distribución posterior debe preservar el hecho original y usar el contrato NUMERA correspondiente;
12. la definición detallada de esa reclasificación pertenece a `NUMERA-DOM-002` y `NUMERA-DOM-014`.

La independencia de puertas se expresa así:

```text
MAPPING DE PRODUCTO PENDIENTE
NO IMPLICA
VENTA ECONÓMICA INEXISTENTE
```

pero:

```text
MAPPING DE PRODUCTO PENDIENTE
IMPLICA
CERO ATRIBUCIÓN PRODUCTO/COSTO INVENTADA
```

---

#### 20. Independencia frente a NEXO y PASS

Los efectos derivados de una misma venta son independientes.

```text
PULSO EVENT
        ├── NEXO CONSUMER_EFFECT
        ├── NUMERA CONSUMER_EFFECT
        └── PASS CONSUMER_EFFECT
```

Reglas:

1. `INT-POS-016.APPLIED` no es precondición universal para `SALE_ECONOMIC_FACT.APPLIED`.
2. Un fallo NEXO no borra el ingreso comercial demostrado.
3. Un hecho económico aplicado no prueba que el inventario haya salido.
4. Un hecho económico aplicado no prueba fidelización.
5. Un fallo NUMERA no revierte la venta PULSO.
6. Un fallo PASS no revierte NUMERA.
7. Las diferencias permanecen detectables en `INT-POS-020`.
8. La rentabilidad puede permanecer incompleta aunque el ingreso realizado ya exista si todavía falta costo trazable.

---

#### 21. Pago, aplicación, caja y bancos

Se preserva:

```text
VENTA
≠
PAGO
≠
APLICACIÓN DE PAGO
≠
MOVIMIENTO DE CAJA
≠
DEPÓSITO
≠
MOVIMIENTO BANCARIO
≠
LIQUIDACIÓN DE PROVEEDOR
```

`SALE_ECONOMIC_FACT`:

- puede referenciar hechos de pago ya conocidos;
- no los recrea;
- no afirma que el dinero esté conciliado;
- no aplica un recaudo a una cuenta por cobrar;
- no cierra cartera por inferencia;
- no crea un depósito;
- no crea un movimiento bancario;
- no transforma un timeout de pago en éxito o fallo económico.

Los objetos de cartera y aplicación pertenecen al dominio NUMERA aprobado y a sus tareas detalladas.

---

#### 22. Documento fiscal e impuestos

El documento fiscal continúa separado del hecho económico.

```text
VENTA
≠
HECHO ECONÓMICO
≠
DOCUMENTO FISCAL
≠
ASIENTO CONTABLE
```

NUMERA podrá conservar, cuando exista evidencia:

- proveedor o emisor;
- tipo de documento;
- número o referencia;
- estado;
- fecha;
- moneda;
- componentes de impuestos;
- hash o evidencia;
- vínculo con venta;
- errores o pendientes.

No podrá:

- fabricar una numeración fiscal;
- declarar emitido un documento no confirmado;
- sustituir el proveedor autorizado;
- recalcular como oficial una obligación tributaria no demostrada;
- interpretar una impresión como factura válida;
- usar la ausencia de documento como prueba de que la venta no ocurrió.

Una diferencia fiscal queda para conciliación.

---

#### 23. Ingreso realizado y costo

`SALE_ECONOMIC_FACT` aporta el lado económico de la venta que NUMERA necesita para ingreso realizado.

No determina automáticamente:

- costo de adquisición;
- costo promedio;
- costo último;
- costo estándar;
- costo real;
- costo de producción;
- landed cost;
- merma;
- costo logístico;
- costo interno;
- margen definitivo.

Los costos se obtienen de sus fuentes propietarias y métodos versionados.

Por tanto:

```text
INGRESO REALIZADO DISPONIBLE
+
COSTO TODAVÍA PENDIENTE
=
HECHO ECONÓMICO DE VENTA VÁLIDO
+
RENTABILIDAD TODAVÍA INCOMPLETA
```

No se fabricará costo desde precio, descuento, receta no resuelta o una proyección legacy.

---

#### 24. Fecha de ocurrencia y reconocimiento

Se distinguen obligatoriamente:

```text
occurred_at
≠
received_at
≠
recorded_at
≠
recognized_at
```

- `occurred_at`: momento empresarial del hecho descrito por PULSO;
- `received_at`: momento de recepción técnica de la fuente o integración;
- `recorded_at`: momento técnico de persistencia;
- `recognized_at`: fecha económica definida por la política NUMERA aplicable.

Reglas:

1. `received_at` no decide el periodo económico.
2. un archivo cargado tarde no cambia la fecha real de la venta.
3. una redelivery no cambia `recognized_at`.
4. una corrección no edita silenciosamente la fecha original.
5. si la política de reconocimiento necesaria todavía no permite resolver una fecha sin inferencia, el efecto se difiere o concilia.
6. el detalle de política y periodos pertenece a `NUMERA-DOM-002` y `NUMERA-DOM-011`.

---

#### 25. Periodos cerrados y hechos tardíos

Un evento válido puede llegar después del cierre de un periodo NUMERA.

Queda prohibido:

- descartarlo;
- insertarlo como si hubiera llegado a tiempo sin política;
- cambiar su `occurred_at`;
- reabrir el periodo por una acción técnica implícita;
- reconocerlo en otro periodo solo para evitar el bloqueo;
- sobrescribir un cierre existente.

El tratamiento deberá conservar:

- evento original;
- fecha empresarial;
- fecha de recepción;
- estado del periodo;
- decisión de ajuste o reapertura;
- autoridad;
- periodo de reconocimiento resultante;
- correlación y evidencia.

Las políticas de cierre y reapertura pertenecen a `NUMERA-DOM-011`; las diferencias a `NUMERA-DOM-014`.

---

#### 26. Atomicidad del efecto NUMERA

La implementación posterior deberá vincular dentro de una frontera lógica NUMERA:

- recepción de inbox;
- claim del efecto;
- clave idempotente;
- huella;
- versiones esperadas;
- creación o recuperación del hecho económico;
- resultado durable;
- referencia de auditoría;
- outbox o mecanismo equivalente cuando NUMERA deba emitir un hecho posterior.

No deberá existir un estado válido en el que:

```text
HECHO ECONÓMICO CREADO
SIN RESULTADO IDEMPOTENTE RECUPERABLE
```

ni:

```text
RESULTADO APPLIED
SIN HECHO ECONÓMICO CORRELACIONADO
```

ni:

```text
HECHO ECONÓMICO DUPLICADO
POR RESPUESTA PERDIDA
```

---

#### 27. Retry y resultado desconocido

El efecto financiero es sensible y reutiliza la política transversal de retry aplicable a efectos críticos.

Reglas:

1. retry conserva `event_id`, `effect_code`, clave, huella, operación, audiencia, finalidad y sensibilidad;
2. solo cambian datos técnicos del intento;
3. un timeout no prueba que el hecho económico no se creó;
4. antes de repetir se consulta el resultado original;
5. un claim o lease vencido no prueba ausencia de commit anterior;
6. reiniciar cliente, worker o proceso no reinicia la identidad;
7. una redelivery no crea otro hecho;
8. un replay conserva `event_id`;
9. un backfill no activa efectos financieros sensibles sin autorización explícita;
10. al agotar el presupuesto se pasa a conciliación y no se fabrica éxito.

---

#### 28. Versiones y eventos tardíos

NUMERA deberá impedir:

- que una revisión vieja reemplace un hecho nuevo;
- que dos eventos incompatibles reclamen el mismo efecto;
- que una corrección de mapping reescriba un monto ya reconocido;
- que `received_at` se use como last-write-wins;
- que una segunda versión del evento se trate como duplicado si representa un hecho económico distinto autorizado;
- que una corrección legítima reutilice la clave del original con otro contenido.

Una corrección material requiere su propia identidad causal y tratamiento no destructivo.

---

#### 29. Anulaciones, devoluciones y reembolsos

El hecho original permanece inmutable.

No se permite:

```text
VENTA ORIGINAL
→ UPDATE monto = monto - devolución
```

ni:

```text
VENTA ORIGINAL
→ DELETE por anulación
```

Una anulación, devolución o reembolso que deba alterar el efecto económico:

1. conserva referencia a la venta original;
2. conserva referencia al `SALE_ECONOMIC_FACT` original;
3. usa el hecho inverso o compensatorio aprobado;
4. conserva su propia identidad;
5. conserva monto, moneda, impuestos, documento y motivo aplicables;
6. se ejecuta exactamente una vez;
7. no supone que el efecto NEXO o PASS ya haya sido compensado;
8. se coordina bajo `INT-POS-019`.

Si no puede determinarse si el efecto original fue aplicado, primero se resuelve mediante conciliación.

---

#### 30. Conciliación de venta y efecto económico

`INT-POS-020` deberá poder detectar al menos:

- evento económicamente elegible sin `SALE_ECONOMIC_FACT`;
- `SALE_ECONOMIC_FACT` sin evento PULSO correlacionado;
- dos hechos económicos incompatibles para la misma clave;
- monto divergente;
- moneda divergente;
- entidad legal divergente;
- sede o centro de costo divergentes;
- impuesto divergente;
- documento fiscal faltante, duplicado o incompatible;
- venta aplicada sin líneas de soporte cuando el contrato las requiere;
- línea en cuarentena omitida del expediente;
- atribución de producto o costo fabricada desde línea `ACTIVE`;
- pago sin aplicación;
- aplicación sin pago;
- venta sin pago cuando el estado comercial exige investigarlo;
- pago sin venta;
- caja o depósito sin correlación;
- ingreso realizado sin costo trazable cuando se calcule rentabilidad;
- hecho tardío contra periodo cerrado;
- reverso sin original;
- original que requiere compensación y no la tiene;
- resultado desconocido agotado.

La conciliación no modifica automáticamente el hecho fuente. Cada propietaria ejecuta su corrección autorizada.

---

#### 31. Línea base física observada de NUMERA

La migración fundacional vigente declara expresamente que la capa actual:

```text
NO ES CONTABILIDAD FORMAL
```

y materializa principalmente:

- `numera_periods`;
- categorías de gasto;
- `numera_expenses`;
- presupuestos por centro de costo;
- ingreso esperado;
- margen objetivo;
- vista mensual por centro;
- punto de equilibrio;
- resumen del periodo.

La superficie actual de rentabilidad consume:

- `expected_revenue`;
- `actual_expenses`;
- `budget_amount`;
- `budget_variance`.

No se observó en esa fundación un ledger de hechos económicos de venta que implemente `SALE_ECONOMIC_FACT`.

La interfaz actual describe una lectura inicial de **ingreso esperado**, no ingreso realizado derivado de ventas canónicas.

Por tanto, la línea base física es una fundación válida pero insuficiente para declarar implementado este contrato.

---

#### 32. Línea base física observada de PULSO y Makos

La ruta legacy de importación Makos:

- procesa XLSX agregado por artículo;
- conserva `sales_date`;
- conserva filas de producto y cantidades;
- conserva subtotal, impuestos, descuentos y devoluciones agregados;
- calcula totales legacy;
- no demuestra venta individual;
- no demuestra línea individual de venta;
- no demuestra timestamp autoritativo individual;
- no demuestra propina;
- no demuestra identidad individual de pago;
- no demuestra medio o estado de pago individual;
- no demuestra documento fiscal individual completo;
- no demuestra moneda individual desde el contrato observado;
- no demuestra un `event_id` por venta individual.

Además, en el código PULSO revisado no se demostró una integración propietaria con NUMERA para materializar hechos económicos de venta.

Consecuencia:

```text
LOTE MAKOS AGREGADO
≠
SALE_ECONOMIC_FACT INDIVIDUAL
```

La ausencia de granularidad suficiente no se corrige generando ventas artificiales a partir de filas por producto.

---

#### 33. Condición para el binding real

`INT-POS-021` deberá demostrar, sin efectos financieros reales, que la fuente y el binding permiten resolver como mínimo:

- identidad individual de venta;
- evento PULSO aplicable;
- `event_id`;
- monto individual;
- componentes monetarios necesarios;
- moneda;
- entidad y contexto organizacional;
- fecha empresarial;
- documento o estado fiscal cuando corresponda;
- revisiones;
- anulaciones y devoluciones;
- evidencia de procedencia.

Si un dato obligatorio no existe en Makos, la prueba deberá demostrar qué fuente canónica Vento lo resuelve o conservar el bloqueo.

No se fabricará el campo faltante para aprobar el piloto.

---

#### 34. Transición futura hacia PULSO

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO
→ EVENTO EMPRESARIAL
→ NUMERA
→ SALE_ECONOMIC_FACT
```

Después del corte:

```text
PULSO
→ MISMO CONTRATO DE EVENTO
→ NUMERA
→ MISMO SALE_ECONOMIC_FACT
```

NUMERA no debe distinguir la semántica del efecto según si la venta se originó históricamente en Makos o nació directamente en PULSO.

La procedencia externa sigue disponible para auditoría, pero no cambia la propiedad económica.

`INT-SALES-004 — Definir recepción del evento de venta en NUMERA` es la tarea permanente que deberá conservar esta frontera después de la transición.

---

#### 35. Carryover obligatorio

| Pendiente material                                   | Tarea propietaria | Condición de salida                                                                       |
| ---------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| fidelización derivada de venta                       | `INT-POS-018`     | PASS aplica su efecto únicamente cuando corresponda y con identidad propia                |
| compensaciones por anulación, devolución o reembolso | `INT-POS-019`     | cada propietaria compensa su efecto con referencia al original                            |
| conciliación de venta y efectos internos             | `INT-POS-020`     | venta, evento, NUMERA, NEXO, PASS y pendientes quedan reconciliados                       |
| demostración del binding Makos individual            | `INT-POS-021`     | identidad, monto, moneda, documentos y granularidad se prueban sin efectos                |
| piloto controlado con efectos                        | `INT-POS-022`     | se demuestra una sola aplicación, retry, resultado desconocido y conciliación             |
| corte de fuente                                      | `INT-POS-023`     | una sola fuente emite por sede, terminal y fecha efectiva                                 |
| recepción permanente PULSO → NUMERA                  | `INT-SALES-004`   | NUMERA consume el mismo contrato sin conocer el adaptador retirado                        |
| modelo detallado de hechos de venta                  | `NUMERA-DOM-002`  | se materializan tipos, campos, contraparte, resoluciones y contratos internos             |
| política de periodos y reapertura                    | `NUMERA-DOM-011`  | eventos tardíos tienen tratamiento financiero versionado                                  |
| conciliación financiera detallada                    | `NUMERA-DOM-014`  | diferencias económicas tienen expediente, decisión y resolución                           |
| contabilidad formal extensible                       | `NUMERA-DOM-017`  | el hecho económico puede mapearse a contabilidad sin convertir apps operativas en writers |

Ningún pendiente material queda sin propietario documental.

---

#### 36. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** la tarea especializa para la transición POS → PULSO → NUMERA obligaciones ya protegidas por requisitos vigentes: propiedad única del hecho económico, separación entre venta, pago, caja y contabilidad, dimensiones obligatorias del hecho, idempotencia por efecto consumidor, recuperación tras respuesta perdida, no duplicación financiera, fiscalidad externa, trazabilidad, correcciones compensatorias, periodos, conciliación y rentabilidad basada en ingreso realizado y costo trazable. No se introduce una obligación material nueva ni se altera una fila histórica del registro canónico.

---

#### 37. Cobertura de prueba existente preservada

Se preservan, en especial:

- `TREQ-NUMERA-001`, sobre conciliación de indicadores y resultados con hechos económicos y fuentes operativas sin doble registro;
- `TREQ-NUMERA-002`, sobre identidad, entidad legal, marca o unidad, sede, centro, tercero, moneda, fechas, fuente, correlación, documento, monto, impuestos, estado, evidencia y extensión futura a contabilidad;
- `TREQ-NUMERA-003`, sobre separación entre cuenta, cuota, vencimiento, saldo, pago recibido y aplicación;
- `TREQ-NUMERA-004`, sobre ingreso realizado, costo trazable, métodos y rentabilidad;
- `TREQ-INTEGRATION-003`, sobre idempotencia, resultado recuperable, retry y resultado desconocido;
- `TREQ-INTEGRATION-006`, sobre fuente única y ausencia de doble digitación;
- `TREQ-INTEGRATION-014`, sobre efectos en NUMERA, NEXO y PASS exactamente una vez durante la transición;
- `TREQ-INTEGRATION-017`, sobre llegada de ventas, pagos, caja y demás hechos a NUMERA mediante contratos versionados, correlacionados e idempotentes, sin escritura cruzada ni doble registro;
- la cobertura vigente de `INT-APP-004` para `CONSUMER_INBOX`, `CONSUMER_EFFECT`, huella, concurrencia, respuesta perdida y atomicidad;
- la cobertura vigente de `INT-APP-005` para retry de efectos críticos.

No se crea, modifica, difiere, descarta ni vuelve obsoleto ningún requisito de prueba.

---

#### 38. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-016` como tarea anterior;
2. mantiene `INT-POS-018` como única tarea siguiente;
3. confirma PULSO como propietaria de venta y evento;
4. confirma NUMERA como propietaria del hecho económico;
5. mantiene al proveedor fiscal como autoridad oficial durante la transición;
6. mantiene la contabilidad oficial externa mientras no exista decisión distinta;
7. prohíbe escrituras financieras directas desde Makos o el adaptador;
8. prohíbe que PULSO escriba libros o el hecho NUMERA por autoridad cruzada;
9. declara que “evento económico” no crea una nueva definición normal de evento;
10. utiliza el evento PULSO ya existente;
11. exige una puerta de materialidad económica;
12. impide crear ingreso realizado desde eventos de apertura o preparación;
13. reconoce que `VPROC-0038.EVT-005` puede habilitar el efecto cuando el contrato esté completo;
14. reconoce que `VPROC-0039.EVT-005` puede habilitar el efecto cuando el contrato esté completo;
15. impide usar `VPROC-0040.EVT-006` como fallback de venta económica;
16. define `CONSUMER_INBOX = numera + event_id`;
17. define `effect_code = SALE_ECONOMIC_FACT`;
18. define `CONSUMER_EFFECT = numera + event_id + SALE_ECONOMIC_FACT`;
19. exige huella lógica versionada;
20. reutiliza los ocho resultados idempotentes transversales;
21. garantiza un único ganador concurrente;
22. recupera resultado ante retry o respuesta perdida;
23. trata contenido incompatible como conflicto;
24. conserva entidad legal sin inferirla desde marca o sede;
25. conserva marca o unidad separada;
26. conserva sede separada;
27. conserva centro de costo mediante resolución canónica;
28. conserva tercero sin convertirlo automáticamente en cliente o cuenta PASS;
29. preserva consumidor final no identificado sin crear cliente artificial;
30. exige moneda demostrable y prohíbe defaults silenciosos;
31. separa ocurrencia, recepción, registro y reconocimiento;
32. conserva documento y fiscalidad como objetos separados;
33. conserva subtotal, descuento, impuesto y propina sin clasificaciones contables inventadas;
34. impide promover las fórmulas del importador Makos a fórmula financiera canónica;
35. impide usar filas agregadas como ventas individuales;
36. mantiene cuarentena visible;
37. permite ingreso a nivel de venta cuando el mapping de producto no sea necesario para demostrar sus dimensiones obligatorias;
38. bloquea producto, costo y atribuciones dependientes de mapping mientras la línea esté `ACTIVE`;
39. evita un segundo ingreso al liberar una línea;
40. mantiene NEXO, NUMERA y PASS como efectos independientes;
41. separa venta de pago, aplicación, caja, depósito, banco y liquidación;
42. separa ingreso realizado de costo;
43. admite ingreso realizado con costo todavía pendiente sin declarar rentabilidad completa;
44. impide usar `received_at` como fecha económica;
45. trata periodos cerrados sin descartar ni sobrescribir hechos;
46. conserva el hecho original ante anulaciones, devoluciones y reembolsos;
47. asigna compensaciones a `INT-POS-019`;
48. asigna conciliación a `INT-POS-020`;
49. asigna prueba de granularidad real a `INT-POS-021`;
50. asigna el contrato permanente a `INT-SALES-004`;
51. asigna el modelo detallado de ventas a `NUMERA-DOM-002`;
52. reconoce la fundación NUMERA actual como no contabilidad formal;
53. reconoce que la rentabilidad actual usa ingreso esperado y no demuestra ingreso realizado;
54. genera cero cambios `TREQ-*`;
55. no modifica código, SQL, migraciones, datos, Supabase, credenciales ni configuración remota.

---

#### 39. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-016 — Definir salida de inventario en NEXO exactamente una vez`

TAREA ACTUAL APROBADA

`INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`

SIGUIENTE TAREA RESERVADA

`INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`


### ✅ INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`
**Tarea siguiente:** `INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`
**Tipo de tarea:** documental; definición normativa de la evaluación y del efecto de fidelización que PASS puede aplicar a una venta canónica emitida por PULSO durante la transición desde el POS externo, incluyendo identidad de cliente y cuenta, regla versionada, elegibilidad, base de acumulación, identidad idempotente, ledger inmutable, balance derivado, cuarentena, retry, redención explícita, reversos y conciliación, sin crear definiciones normales de evento, implementar tablas, RPC, funciones, triggers, colas, migraciones, Supabase ni cambios de código
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Aplicación propietaria de la venta:** `PULSO`
**Aplicación propietaria de fidelización:** `PASS`
**Proceso PASS reutilizado:** `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados`
**Línea base documental:** `vento-shell@be65ee02d8d9f2e3790ecdada7761769e3dbf39e`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Línea base PASS observada:** `vento-pass@b5a4aec908ef12226f798078577ab089a29ccda2`
**Contratos transversales consumidos:** `ENTERPRISE-EVENT-CATALOG-001`, `ENTERPRISE-EVENT-PRODUCER-REGISTRY-001`, `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001`, `EVENT-ENVELOPE-001`, `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0` y `ENTERPRISE-EVENT-RETRY-POLICY-001@1.0.0`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir de forma inequívoca cuándo una venta canónica emitida por PULSO puede producir un efecto de fidelización en PASS y cómo ese efecto debe quedar aplicado exactamente una vez, sin convertir cada venta en puntos por defecto, sin confiar en un saldo enviado por otra aplicación y sin inferir redenciones desde descuentos, propinas, pagos o importes negativos.

Regla raíz:

```text
VENTA CANÓNICA + EVENTO PULSO
        ↓
PASS RECIBE COMO CONSUMIDORA CUANDO LA RELACIÓN APLICA
        ↓
DEDUPE DE INBOX
        ↓
RESOLUCIÓN DE CLIENTE Y CUENTA PASS
        ↓
REGLA DE FIDELIZACIÓN VERSIONADA APLICABLE
        ↓
BASE ELEGIBLE DEMOSTRABLE
        ↓
DECISIÓN PASS
        ├── NO_APLICA
        ├── BLOQUEADO / CONCILIACIÓN
        └── ACUMULACIÓN ELEGIBLE
                    ↓
            EFECTO IDEMPOTENTE
                    ↓
            LEDGER PASS INMUTABLE
                    ↓
            BALANCE COMO PROYECCIÓN
                    ↓
            RESULTADO RECUPERABLE
```

No:

```text
VENTA = PUNTOS
```

No:

```text
DESCUENTO O PROPINA = REDENCIÓN
```

No:

```text
PULSO O MAKOS → UPDATE DIRECTO DEL SALDO PASS
```

---

#### 2. Resultado sustantivo

`INT-POS-018` deja definidas las siguientes decisiones:

1. PASS es la única propietaria del cliente de fidelización, la cuenta de puntos, el ledger, las reglas, las recompensas, las redenciones y la proyección de saldo.
2. PULSO conserva la venta y emite el hecho comercial; no calcula ni fija el saldo PASS.
3. Makos y el adaptador no escriben en el ledger PASS.
4. Una relación de consumidora entre un evento PULSO y PASS autoriza recepción y evaluación; no autoriza puntos automáticos.
5. La acumulación solo ocurre cuando la venta, la cuenta y una regla versionada satisfacen las puertas de elegibilidad.
6. Una venta a consumidor final sin cuenta PASS identificable continúa siendo una venta válida y produce cero puntos automáticos.
7. Correo, teléfono, nombre, documento parcial, QR no validado o coincidencia aproximada no se usan para fusionar clientes ni elegir una cuenta por inferencia.
8. La regla aplicable se resuelve por vigencia y contexto del hecho comercial, no por la regla actualmente activa al momento de un retry tardío.
9. La regla define base elegible, exclusiones, alcance, fórmula, redondeo, prioridad, stacking, mínimo, máximo, caps y tratamiento de reversos.
10. Subtotal, descuentos, impuestos, propinas, pagos y devoluciones no sustituyen la regla de puntos.
11. La ausencia de un componente no se convierte en cero confirmado cuando la regla necesita conocerlo.
12. La línea `ACTIVE` en cuarentena bloquea cualquier cálculo que dependa de producto, presentación, categoría, receta u otro mapping todavía no resuelto.
13. La cuarentena no bloquea automáticamente una regla que pueda evaluarse íntegramente con datos de venta independientes del producto, siempre que no se omitan líneas ni importes.
14. La acumulación normal de una venta utiliza el alcance transversal `CONSUMER_EFFECT`.
15. El `effect_code` de esta especialización es `LOYALTY_POINTS_ACCRUAL`.
16. La identidad transversal es `pass + event_id + LOYALTY_POINTS_ACCRUAL`.
17. PASS añade además una guarda de dominio por cuenta y venta para impedir que dos eventos diferentes del mismo ciclo comercial acrediten dos veces la misma compra.
18. Dentro del alcance actual de una sola cuenta de puntos PASS, esa guarda de dominio se expresa como `loyalty_account_id + canonical_sale_id + ACCUMULATION`.
19. La versión de regla pertenece a la huella lógica y no a la identidad de acumulación; reevaluar la misma venta con otra regla no crea una segunda acumulación silenciosa.
20. Una acumulación aplicada conserva evento origen, venta, cuenta, regla y versión, delta, saldo anterior, saldo posterior, sede, canal, tiempo, correlación y resultado.
21. El saldo nunca es la fuente del movimiento: se deriva del ledger.
22. Un retry o redelivery recupera el resultado anterior.
23. Una respuesta perdida se consulta por la identidad original antes de repetir.
24. Una venta corregida después de haber acumulado no reescribe el movimiento original; cualquier ajuste posterior será compensatorio.
25. La redención permanece una operación distinta de la acumulación.
26. Una venta no crea una redención PASS a partir de un descuento, propina, medio de pago, importe negativo o texto externo.
27. Si existe una redención PASS explícitamente autorizada, la venta puede correlacionarla, pero no volver a ejecutarla.
28. `VPROC-0045` se reutiliza como proceso propietario de la interacción de fidelización.
29. No se crea una definición normal de evento nueva.
30. PASS conserva sus seis definiciones `VPROC-0045.EVT-001` a `VPROC-0045.EVT-006`.
31. La última definición solo puede afirmar que la interacción quedó aplicada una vez cuando PASS realmente haya conciliado su resultado.
32. NEXO, NUMERA y PASS mantienen efectos independientes.
33. Las anulaciones, devoluciones y reembolsos se compensan posteriormente sin borrar el ledger original.
34. La conciliación diaria debe detectar venta con puntos faltantes, puntos sin venta, acumulación duplicada, cuenta incorrecta, regla incorrecta y reverso faltante.
35. El flujo agregado `makos_excel` no demuestra identidad individual suficiente de venta, cliente o cuenta para acreditar puntos por fila.
36. La primera demostración con binding real permanece asignada a `INT-POS-021`.
37. El piloto con efectos permanece asignado a `INT-POS-022`.
38. La acumulación permanente posterior corresponde a `INT-SALES-005`.
39. La redención permanente posterior corresponde a `INT-SALES-006`.
40. Se crean cero requisitos `TREQ-*`.
41. Se modifican cero requisitos `TREQ-*`.
42. Se crean cero objetos físicos.
43. Se modifican cero objetos físicos.

---

#### 3. Base canónica preservada

La tarea consume sin reabrir:

- `INT-POS-003`, para la autoridad temporal de Makos dentro de su ventana;
- `INT-POS-005`, para identidad de venta y línea;
- `INT-POS-006`, para estados, revisiones y timestamps;
- `INT-POS-007`, para descuentos, impuestos, propinas y medios de pago sin convertirlos en reglas de puntos;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos no destructivos;
- `INT-POS-009`, para procedencia, payload, hash, versiones y correlación;
- `INT-POS-010`, para empresa, sede, terminal y caja externas;
- `INT-POS-011`, para mapping de producto, presentación y receta;
- `INT-POS-012`, para cuarentena por línea;
- `INT-POS-013`, para identidad e idempotencia de sistema, venta y línea;
- `INT-POS-014`, para convergencia de webhook, polling, archivo y replay;
- `INT-POS-015`, para evento empresarial PULSO, `event_id` estable y audiencia;
- `INT-POS-016`, para el efecto físico independiente de NEXO;
- `INT-POS-017`, para el efecto económico independiente de NUMERA;
- `CAP-SCOPE-010`, para PASS como propietaria del ledger de fidelización, reglas, recompensas y redenciones;
- `PROC-CAT-003` a `PROC-CAT-017`, para identidad, propiedad, consumidoras, proceso, estados y eventos;
- `INT-APP-001` a `INT-APP-010`, para catálogo, productoras, consumidoras, idempotencia, retry, auditoría, replay, compensación y prohibición de escrituras cruzadas.

Ninguna de esas decisiones se modifica.

---

#### 4. Propiedad y fronteras

| Elemento                                     | Propietaria                             | Regla                                              |
| -------------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| venta y líneas                               | `PULSO`                                 | conserva el hecho comercial interno                |
| evento de venta                              | `PULSO`                                 | describe un hecho durable ya confirmado            |
| cliente ocasional o identificado en la venta | `PULSO` dentro de su contexto comercial | no equivale automáticamente a cuenta PASS          |
| identidad de fidelización                    | `PASS`                                  | resuelve cliente, cuenta y vínculos autorizados    |
| ledger de puntos                             | `PASS`                                  | única fuente de movimientos                        |
| balance de puntos                            | `PASS`                                  | proyección derivada y reconciliable                |
| regla de puntos                              | `PASS`                                  | versionada, vigente y reproducible                 |
| recompensa y redención                       | `PASS`                                  | autorización y estado propios                      |
| inventario                                   | `NEXO`                                  | no se deduce desde puntos                          |
| hecho económico                              | `NUMERA`                                | no se deduce desde puntos                          |
| venta externa                                | Makos durante la transición             | aporta afirmación externa sin autoridad sobre PASS |

Invariante:

```text
PULSO AFIRMA LA VENTA
PASS DECIDE LA FIDELIZACIÓN
PASS REGISTRA EL MOVIMIENTO
PASS DERIVA EL SALDO
```

---

#### 5. El “evento de fidelización” no crea otro evento empresarial PULSO

El evento comercial de PULSO definido por `INT-POS-015` continúa siendo el hecho fuente.

La secuencia correcta es:

```text
EVENTO PULSO
        ↓
PASS COMO CONSUMIDORA
        ↓
EFECTO PROPIO PASS
        ↓
PROCESO VPROC-0045 CUANDO CORRESPONDA
        ↓
EVENTOS PASS DEL PROCESO PROPIETARIO
```

Por tanto:

1. no se crea un `event_definition_id` nuevo denominado `LOYALTY_EVENT`, `SALE_LOYALTY_EVENT` o equivalente;
2. el `event_id` de PULSO se conserva como evento causal;
3. cualquier evento posterior emitido por PASS tiene su propio `event_id`, porque representa otro hecho;
4. `causation_id` y correlación enlazan la interacción PASS con el evento fuente;
5. PASS no reemite el evento PULSO cambiando `producer_application`.

---

#### 6. Relaciones PULSO → PASS ya existentes

El registro transversal vigente contiene a PASS como consumidora directa de procesos PULSO como:

- `VPROC-0038`;
- `VPROC-0039`;
- `VPROC-0042`;
- `VPROC-0043`;
- `VPROC-0046`;
- `VPROC-0047`;
- `VPROC-0050`.

También la contempla condicionalmente en `VPROC-0040`.

Estas relaciones significan:

```text
PASS PUEDE RECIBIR LA PROYECCIÓN AUTORIZADA
```

No:

```text
CADA EVENTO RECIBIDO GENERA PUNTOS
```

Cada definición conserva su `confirmed_fact`, finalidad, proyección, sensibilidad y condición. La decisión de acumulación solo se ejecuta cuando el hecho recibido satisface las puertas específicas de fidelización.

---

#### 7. Hitos primarios para acumulación derivada de una venta

Para las ventas ordinarias ya identificadas en la transición, los hitos de cierre son los candidatos primarios para evaluar acumulación:

| Definición           | Hecho confirmado           | Decisión                                                                              |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| `VPROC-0038.EVT-005` | servicio de mesa cerrado   | puede iniciar evaluación PASS si la política aplicable considera este hito suficiente |
| `VPROC-0039.EVT-005` | venta de mostrador cerrada | puede iniciar evaluación PASS si la política aplicable considera este hito suficiente |

Reglas:

1. `VPROC-0038.EVT-001` a `EVT-004` no acreditan puntos por defecto;
2. `VPROC-0039.EVT-001` a `EVT-004` no acreditan puntos por defecto;
3. eventos de pago de `VPROC-0043` pueden aportar evidencia cuando una regla la requiera, pero no constituyen una segunda acumulación de la misma venta;
4. eventos de cambio comercial de `VPROC-0042` pueden exigir reevaluación o conciliación, pero no permiten volver a acreditar la compra;
5. un pedido externo de `VPROC-0040` no acredita puntos por el solo hecho de provenir de un canal externo;
6. cualquier otro proceso PULSO solo podrá producir el efecto cuando su hecho confirmado y la regla PASS lo permitan de forma explícita;
7. una misma venta no acumula nuevamente porque un proceso relacionado emita otro evento posterior.

---

#### 8. Matriz de decisión “cuando corresponda”

| Condición                                                               | Estado de la evaluación                              | Efecto                                           |
| ----------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| venta válida + cuenta PASS inequívoca + regla aplicable + base completa | `ESPECIFICADO` para acumulación                      | puede materializar `LOYALTY_POINTS_ACCRUAL`      |
| venta válida sin cliente o cuenta PASS aplicable                        | `NO_APLICA`                                          | cero movimiento y cero puntos                    |
| cliente declarado pero vínculo con cuenta PASS ambiguo                  | `BLOQUEADO`                                          | cero movimiento hasta resolver identidad         |
| cuenta PASS no elegible o inactiva                                      | `NO_APLICA` o `BLOQUEADO` según la causa propietaria | cero movimiento                                  |
| no existe regla aplicable para el hecho y contexto                      | `NO_APLICA`                                          | cero movimiento                                  |
| regla aplicable pero falta un dato obligatorio para evaluarla           | `BLOQUEADO`                                          | cero movimiento y conciliación                   |
| regla depende de producto y existe línea `ACTIVE` sin mapping           | `BLOQUEADO` para la parte o efecto dependiente       | cero puntos derivados del dato desconocido       |
| regla es independiente del producto y la base completa es demostrable   | `ESPECIFICADO`                                       | la cuarentena de producto no bloquea por sí sola |
| acumulación ya aplicada para cuenta + venta                             | resultado previo                                     | cero movimiento adicional                        |
| misma identidad con contenido material incompatible                     | conflicto                                            | cero movimiento adicional                        |
| venta anulada o devuelta después de acumular                            | compensación pendiente                               | no se edita el movimiento original               |
| descuento, propina o pago sin una regla de fidelización aplicable       | `NO_APLICA`                                          | no se convierte en puntos                        |
| referencia de redención PASS explícita y ya autorizada                  | correlación                                          | no se crea otra redención desde la venta         |

---

#### 9. Identidad de cliente y cuenta PASS

Antes de cualquier acumulación, PASS debe resolver una única identidad de cuenta elegible.

Reglas:

1. `customer_id` comercial y `loyalty_account_id` son conceptos separados;
2. una venta a consumidor final puede no tener cliente identificado;
3. una venta sin cuenta PASS no crea un cliente artificial;
4. correo, teléfono, nombre o documento coincidentes no autorizan fusión automática;
5. una cuenta autenticada no se infiere desde un contacto;
6. un QR solo sirve como identidad cuando el contrato PASS lo valida;
7. la cuenta debe pertenecer al cliente o vínculo autorizado correcto;
8. una relación ambigua bloquea la acumulación;
9. el evento transporta la referencia mínima necesaria y PASS resuelve atributos protegidos desde su fuente;
10. el balance nunca se acepta como autoridad desde PULSO, Makos o el cliente.

---

#### 10. Vinculación posterior de una venta anónima

La vinculación posterior de historia comercial con un cliente no equivale automáticamente a un derecho retroactivo de puntos.

Se preserva:

```text
VINCULAR HISTORIA
≠
ACREDITAR PUNTOS RETROACTIVOS
```

Reglas:

1. la venta conserva su identidad original;
2. el vínculo posterior no duplica la venta;
3. no se crea automáticamente `LOYALTY_POINTS_ACCRUAL` por haber creado o vinculado una cuenta después;
4. cualquier acumulación retroactiva deberá estar expresamente permitida por una política PASS versionada;
5. si esa capacidad se habilita, `PASS-INT-001` deberá definir la operación, evidencia y límites antes de implementación;
6. un ajuste manual no sustituye esa política.

---

#### 11. Regla de fidelización versionada

La regla aplicada deberá poder reconstruirse históricamente.

Como mínimo deberá conservar:

- identificador de regla;
- versión;
- vigencia;
- tipo de cálculo;
- valor o fórmula;
- elegibilidad;
- alcance;
- sedes aplicables;
- canales aplicables;
- productos, categorías o segmentos cuando correspondan;
- ventanas temporales;
- prioridad;
- stacking;
- exclusiones;
- mínimo;
- máximo;
- caps;
- redondeo;
- tratamiento de devoluciones o reversos;
- política offline cuando corresponda.

Invariante:

```text
MISMAS ENTRADAS
+
MISMA VERSIÓN DE REGLA
=
MISMO RESULTADO
```

No se utiliza la regla actualmente activa para recalcular silenciosamente una venta histórica.

---

#### 12. Momento de selección de la regla

La selección se realiza contra el momento empresarial aplicable al hecho fuente y la política PASS.

No se permite:

```text
RETRY TARDÍO
→ REGLA ACTIVA HOY
```

cuando la venta original pertenecía a otra versión de política.

Se preservan por separado:

- `occurred_at` del hecho comercial;
- `received_at` técnico;
- `recorded_at`;
- vigencia de la regla;
- momento de evaluación PASS.

Una diferencia temporal no se corrige con last-write-wins.

---

#### 13. Base elegible de acumulación

La base de puntos proviene de la regla PASS y del contrato comercial, no de una fórmula fija de esta integración.

La regla puede distinguir, según su definición vigente:

- subtotal;
- descuentos reconocidos;
- impuestos;
- propinas;
- devoluciones;
- líneas excluidas;
- categorías;
- productos;
- sede;
- canal;
- segmento;
- beneficios ya utilizados.

Queda prohibido asumir universalmente:

```text
PUNTOS = TOTAL DE VENTA
```

o:

```text
PUNTOS = net_sales_amount LEGACY
```

o:

```text
PUNTOS = MONTO PAGADO
```

Si la fuente no permite distinguir un componente que la regla necesita, la evaluación no inventa el valor.

---

#### 14. Descuento, propina, pago y redención

Se preservan las desigualdades:

```text
DESCUENTO ≠ PUNTOS
PROPINA ≠ PUNTOS
PAGO ≠ PUNTOS
PUNTOS ACUMULADOS ≠ PUNTOS REDIMIDOS
```

Reglas:

1. un descuento comercial no prueba uso de puntos;
2. una propina no prueba puntos acumulables ni redimidos;
3. un medio de pago no prueba fidelización;
4. un importe negativo no prueba redención;
5. una línea promocional no prueba regla PASS;
6. una referencia explícita de redención debe resolver una operación PASS real;
7. si la fuente solo informa un descuento sin identidad de redención, no se crea una redención;
8. una redención autorizada y la acumulación de la misma venta conservan identidades independientes.

---

#### 15. Cuarentena y reglas dependientes de producto

La línea `ACTIVE` de `EXTERNAL-SALE-LINE-QUARANTINE-001` permanece visible en la venta.

Si la regla necesita:

- producto;
- presentación;
- categoría;
- receta;
- familia;
- otra dimensión que dependa del mapping;

la parte afectada no puede evaluarse mediante sustitución, nombre aproximado o categoría inferida.

Reglas:

1. una línea `ACTIVE` no se omite de la base;
2. una línea `ACTIVE` no se clasifica como excluida por conveniencia;
3. no se inventa producto para generar puntos;
4. si la regla requiere evaluación por línea y una línea material permanece desconocida, el efecto queda bloqueado salvo que la regla defina de forma reproducible una partialidad independiente;
5. si la regla depende solo de un total de venta cuya semántica está demostrada y no necesita clasificación de producto, la cuarentena física no bloquea por sí sola la acumulación;
6. liberar una línea no acredita automáticamente puntos;
7. si el efecto ya fue aplicado con una base legítimamente independiente del producto, la liberación no crea una segunda acumulación;
8. si el efecto estaba bloqueado, la liberación permite reevaluarlo con la misma identidad de venta.

---

#### 16. Partialidad de la base

Una regla solo podrá producir acumulación parcial cuando su propio contrato permita separar de forma determinista componentes elegibles e inelegibles.

Debe cumplirse:

```text
BASE TOTAL CONSIDERADA
=
BASE ELEGIBLE
+
BASE EXCLUIDA
+
BASE BLOQUEADA
```

Reglas:

1. la base bloqueada no desaparece;
2. una parte elegible no se cuenta dos veces al resolver el remanente;
3. cada componente conserva relación con la venta y la regla;
4. el resultado indica si existe residual pendiente;
5. la acumulación no se declara completamente conciliada mientras un residual material pueda cambiar el derecho total;
6. una partialidad posterior usa el contrato compensatorio o incremental autorizado por PASS y no repite el componente ya aplicado;
7. la representación física de componentes del ledger se cierra en `PASS-INT-001`.

---

#### 17. Identidad transversal del efecto

La recepción utiliza:

```text
CONSUMER_INBOX
=
pass + event_id
```

La acumulación utiliza:

```text
CONSUMER_EFFECT
=
pass + event_id + LOYALTY_POINTS_ACCRUAL
```

Reglas:

1. redelivery conserva `event_id`;
2. retry conserva `event_id`;
3. replay conserva `event_id`;
4. un `delivery_id`, `attempt_id`, batch, fila o archivo no sustituye la identidad;
5. la misma clave y la misma huella recuperan el resultado anterior;
6. la misma clave con huella incompatible produce conflicto;
7. dos ejecuciones concurrentes tienen un solo ganador;
8. el efecto no se acredita porque otra consumidora haya tenido éxito;
9. el fallo de PASS no cambia el hecho PULSO.

---

#### 18. Guarda de dominio contra dos eventos de la misma venta

La clave transversal protege duplicados del mismo evento, pero una venta puede producir varios eventos legítimos.

Para impedir que dos eventos diferentes acrediten dos veces la misma compra, PASS debe conservar además una identidad de acumulación de dominio:

```text
loyalty_account_id
+
canonical_sale_id
+
ACCUMULATION
```

Dentro del alcance actual esta identidad representa una sola acumulación ordinaria por cuenta y venta.

Consecuencias:

1. el evento de cierre puede crear la primera acumulación;
2. un evento posterior de pago no crea otra;
3. un evento de conciliación no crea otra;
4. un cambio comercial posterior no crea otra por simple reevaluación;
5. una venta recibida primero por webhook y luego por polling sigue siendo la misma;
6. si otra cuenta intenta reclamar la misma acumulación ya aplicada, el caso es conflicto o conciliación;
7. la versión de regla no forma parte de esta identidad;
8. cambiar la regla después de aplicar no habilita otra acumulación;
9. cualquier modelo futuro de programas de puntos independientes deberá versionar esta identidad en `PASS-INT-001` antes de implementación.

---

#### 19. Huella lógica

La huella de la acumulación deberá incluir, cuando corresponda:

- venta canónica;
- revisión aplicable;
- evento causal;
- cliente y cuenta PASS;
- regla y versión;
- contexto de sede;
- canal;
- momento del hecho;
- moneda cuando la fórmula la requiera;
- base total considerada;
- componentes elegibles;
- componentes excluidos;
- residual bloqueado;
- productos o categorías cuando la regla dependa de ellos;
- fórmula;
- redondeo;
- caps;
- puntos calculados;
- referencias de evidencia material.

No debe cambiar únicamente por:

- retry count;
- redelivery;
- worker;
- `attempt_id`;
- `delivery_id`;
- `trace_id`;
- hora técnica de reenvío;
- webhook frente a polling;
- nombre de archivo;
- número de fila.

---

#### 20. Resultado propietario y ledger PASS

Cuando la acumulación se aplica, PASS debe producir un resultado durable que permita reconstruir:

- `loyalty_account_id`;
- `canonical_sale_id`;
- `event_id` causal;
- operación de acumulación;
- identificador o identificadores de movimiento;
- regla y versión;
- delta de puntos;
- balance anterior;
- balance posterior;
- sede;
- canal;
- momento;
- actor o principal técnico;
- correlación;
- estado de conciliación;
- referencias de evidencia.

El ledger es inmutable.

Por tanto:

```text
MOVIMIENTO
→ FUENTE DE VERDAD

SALDO
→ PROYECCIÓN DEL LEDGER
```

No:

```text
UPDATE SALDO
→ INVENTAR MOVIMIENTO DESPUÉS
```

---

#### 21. Delta, saldo y conservación

Para una acumulación ordinaria:

1. el delta aplicado debe ser positivo y distinto de cero;
2. cero puntos calculados no generan un movimiento de acumulación ficticio;
3. el balance anterior se obtiene desde PASS dentro de la transacción propietaria;
4. el balance posterior se deriva del resultado;
5. otra aplicación no envía ambos saldos como autoridad;
6. el ledger conserva el movimiento incluso cuando una corrección posterior lo compense;
7. el saldo no puede convertirse en fuente primaria durante retry o conciliación.

Ajustes negativos, reversos y expiraciones conservan su propia semántica y no se presentan como acumulación normal.

---

#### 22. Proceso propietario `VPROC-0045`

PASS conserva las definiciones normales vigentes:

| Definición           | Hecho                                     |
| -------------------- | ----------------------------------------- |
| `VPROC-0045.EVT-001` | interacción de fidelización abierta       |
| `VPROC-0045.EVT-002` | identidad en validación                   |
| `VPROC-0045.EVT-003` | autorización de acción pendiente          |
| `VPROC-0045.EVT-004` | actualización de consentimiento pendiente |
| `VPROC-0045.EVT-005` | conciliación pendiente                    |
| `VPROC-0045.EVT-006` | interacción de fidelización conciliada    |

Reglas para esta transición:

1. la sola recepción de una venta no implica emitir todas las definiciones;
2. `EVT-001` no modifica saldo;
3. `EVT-002` confirma validación en curso, no una cuenta elegible;
4. `EVT-003` puede representar una acumulación o redención esperando autorización, pero no el efecto final;
5. `EVT-004` solo aplica cuando existe un cambio real de consentimiento;
6. `EVT-005` mantiene explícita una divergencia entre venta, movimiento, saldo o beneficio;
7. `EVT-006` solo puede emitirse cuando la interacción quedó aplicada una vez y conciliada;
8. los eventos PASS tienen `producer_application = pass`;
9. el `event_id` fuente de PULSO se conserva como causación o correlación, no se reutiliza como `event_id` PASS.

---

#### 23. No-op de fidelización

Una venta puede ser válida y producir cero movimiento PASS.

Ejemplos:

- consumidor final sin cuenta PASS;
- cuenta no elegible;
- regla inexistente;
- regla cuya fórmula legítimamente produce cero;
- proceso o canal fuera del alcance de la política.

El no-op debe ser durable cuando sea necesario para impedir reevaluaciones ambiguas, pero:

- no crea una transacción de puntos con delta cero;
- no modifica saldo;
- no inventa cliente;
- no se presenta como acumulación;
- conserva razón, venta, evento, regla consultada cuando aplique y momento de evaluación.

---

#### 24. Bloqueo no equivale a no-op

Queda prohibido transformar un problema de evidencia en `NO_APLICA`.

Son bloqueos, entre otros:

- cliente ambiguo;
- dos cuentas candidatas;
- falta de regla que debería existir pero no puede resolverse por versión;
- base monetaria ambigua;
- moneda requerida y desconocida;
- línea en cuarentena cuando la regla depende del producto;
- revisión de venta incompatible;
- resultado anterior incierto;
- misma venta asociada a otra cuenta con efecto ya aplicado.

Un bloqueo se conserva para conciliación y no concede puntos.

---

#### 25. Redención

La redención es una operación PASS distinta.

```text
ACUMULACIÓN
≠
REDENCIÓN
```

Para esta transición:

1. una venta puede referenciar una redención PASS ya autorizada;
2. la referencia debe resolver una identidad de redención real;
3. la venta no reduce saldo por sí misma;
4. un descuento no se convierte en redención;
5. una propina no se convierte en redención;
6. un código promocional no se convierte en redención PASS salvo contrato explícito;
7. la redención revalida saldo no expirado, recompensa, vigencia, sede, regla y límites en la frontera PASS;
8. la redención debe ser atómica e idempotente;
9. el procesamiento detallado PULSO → PASS de redención corresponde a `PASS-INT-002`;
10. el contrato permanente de redención posterior a la transición corresponde a `INT-SALES-006`.

Esta tarea no crea una redención desde datos legacy de Makos que no la demuestren.

---

#### 26. Retry, concurrencia y resultado desconocido

El efecto de fidelización utiliza el perfil transversal de efecto crítico.

Reglas:

1. retry conserva claves y huellas;
2. un timeout no se presume fallo;
3. antes de repetir se consulta la operación original;
4. un claim vencido no demuestra ausencia de commit;
5. un restart no reinicia la identidad;
6. una redelivery no duplica puntos;
7. un replay histórico no duplica puntos;
8. una reevaluación por otro evento de la misma venta consulta primero la guarda de dominio;
9. una incompatibilidad produce conflicto, no una segunda acumulación;
10. agotamiento del presupuesto abre conciliación y no acredita por inferencia.

---

#### 27. Revisiones de venta

Una venta puede recibir revisiones legítimas.

Antes de la primera acumulación:

- PASS usa la revisión válida que satisface la puerta;
- una revisión vieja no desplaza a una nueva;
- eventos fuera de orden pueden diferirse.

Después de una acumulación:

- cambiar importe, líneas, cliente o regla material no reescribe el ledger;
- un cambio que altere el derecho de puntos requiere ajuste o compensación;
- el original permanece;
- `INT-POS-019` gobierna compensaciones derivadas de anulaciones y devoluciones;
- `PASS-INT-001` gobierna dentro de la integración de acumulación el diseño detallado de ajuste, corrección, reversión y compensación del efecto PASS originado por una venta, conservando el movimiento original.

---

#### 28. Anulaciones, devoluciones y reembolsos

Una anulación o devolución no elimina el movimiento de acumulación.

Si el efecto original existió:

```text
MOVIMIENTO ORIGINAL
        ↓
HECHO INVERSO O CORRECTIVO
        ↓
MOVIMIENTO COMPENSATORIO PASS
        ↓
SALDO DERIVADO ACTUALIZADO
```

Reglas:

1. el compensatorio referencia el movimiento original;
2. conserva venta, evento, motivo y autoridad;
3. tiene identidad idempotente propia;
4. no se ejecuta dos veces;
5. no presume que NEXO o NUMERA ya compensaron;
6. una devolución parcial solo afecta la porción demostrable según la política vigente del hecho original;
7. una venta que nunca acumuló no genera un reverso ficticio;
8. la coordinación transversal pertenece a `INT-POS-019`.

---

#### 29. Conciliación

`INT-POS-020` deberá poder detectar al menos:

- venta elegible sin acumulación;
- puntos sin venta;
- misma venta acreditada dos veces;
- mismo evento aplicado dos veces;
- acumulación en cuenta incorrecta;
- cliente ambiguo resuelto incorrectamente;
- regla o versión incorrecta;
- base elegible divergente;
- puntos calculados divergentes;
- línea `ACTIVE` usada por una regla dependiente de producto;
- línea liberada con efecto todavía pendiente;
- no-op usado para ocultar un bloqueo;
- redención inferida desde descuento;
- saldo divergente del ledger;
- movimiento sin reflejo en saldo;
- saldo sin movimientos suficientes;
- reverso sin original;
- original que requiere reverso y no lo tiene;
- respuesta desconocida;
- evento tardío que intentó otra acumulación.

La conciliación no corrige puntos mediante edición del saldo. PASS ejecuta el ajuste o compensación autorizado.

---

#### 30. Privacidad y minimización

El evento comercial no debe convertir PASS en copia de toda la venta ni exponer PII innecesaria.

La proyección hacia PASS conserva únicamente lo necesario para:

- resolver cliente o cuenta;
- evaluar la regla;
- calcular la base;
- aplicar el movimiento;
- auditar y conciliar.

Reglas:

1. credenciales no viajan en eventos;
2. PII no necesaria se conserva por referencia protegida;
3. marketing consent no se infiere por acumular puntos;
4. fidelización no concede consentimiento publicitario;
5. una cuenta PASS no convierte a una persona en trabajador ni eleva autorización laboral;
6. la sensibilidad del proceso `VPROC-0045` permanece `RESTRICTED_PERSONAL`.

---

#### 31. Estado físico observado en PASS

La implementación PASS observada ya contiene superficies y contratos parciales de fidelización.

En los hooks inspeccionados:

- `useLoyaltyTransactions` lee y crea registros de `pass.loyalty_transactions`;
- la creación observada envía desde cliente campos como cliente, tipo, delta, descripción, aplicación de origen, correlación, sede y actor;
- `useLoyaltyRedemptions` lee y crea registros de `pass.points_redemptions`;
- la redención observada conserva cliente, recompensa, puntos gastados, snapshot, acción, estado, canal, sede y actor;
- la utilidad de loyalty distingue tipos como compra, redención, ajuste, promoción, expiración, refund y bonus;
- la utilidad de redemption distingue estados y canales.

Estas rutas demuestran que existen piezas funcionales de ledger y redención, pero **no demuestran por sí mismas** el contrato objetivo de esta tarea.

En particular, los inserts desde cliente inspeccionados no satisfacen por sí solos:

- operación propietaria de servidor;
- claim de inbox;
- `CONSUMER_EFFECT`;
- guarda de dominio cuenta + venta;
- atomicidad entre ledger y saldo;
- recuperación por resultado;
- selección histórica de regla;
- procesamiento exactamente una vez desde un evento PULSO.

La tarea no modifica estas piezas.

---

#### 32. Evidencia canónica de la implementación legacy

El registro vigente identifica como riesgo crítico que acumulación, gasto, ajuste, reversión y redención se ejecuten fuera de contratos de servidor autorizados, atómicos e idempotentes.

También registra como evidencia actual:

- políticas de `pass.loyalty_transactions`;
- `loyalty_redemptions`;
- trigger o proyección de saldo;
- flujo cliente de redención.

Por tanto, la existencia física actual se conserva como línea base de transición, no como diseño objetivo ya certificado.

Toda modificación futura de Supabase deberá materializarse desde `vento-shell`.

---

#### 33. Límite del flujo `makos_excel`

El importador agregado actual de Makos no demuestra, por fila:

- identidad individual estable de venta;
- identidad individual estable de cliente;
- identidad de cuenta PASS;
- regla de fidelización;
- versión de regla;
- base de puntos individual;
- redención PASS;
- saldo;
- movimiento de puntos;
- evento individual de venta;
- reverso de puntos individual.

Por tanto:

```text
FILA MAKOS_EXCEL
≠
ACUMULACIÓN PASS
```

y:

```text
VENTA AGREGADA SIN CUENTA
≠
CLIENTE PASS
```

No se acreditan puntos agregados para luego repartirlos entre cuentas.

---

#### 34. Condición para el binding real

`INT-POS-021` deberá demostrar, sin efectos reales, que una muestra de venta permite resolver cuando corresponda:

- venta individual;
- evento PULSO aplicable;
- cliente o ausencia legítima;
- cuenta PASS inequívoca;
- sede;
- canal;
- regla;
- versión de regla;
- base elegible;
- productos o categorías requeridos;
- puntos esperados;
- identidad de acumulación;
- no-op o bloqueo esperado;
- evidencia de procedencia.

Cuando un dato obligatorio no exista en Makos, la prueba debe demostrar qué fuente canónica lo resuelve o conservar el bloqueo.

No se fabricará una cuenta, regla o base para superar el piloto.

---

#### 35. Piloto con efectos

`INT-POS-022` solo podrá habilitar fidelización cuando previamente se demuestre:

1. una venta elegible produce una sola acumulación;
2. la redelivery devuelve el resultado previo;
3. dos eventos de la misma venta no producen dos acumulaciones;
4. una venta sin cuenta produce cero movimiento;
5. una identidad ambigua produce cero movimiento;
6. una regla inexistente produce cero movimiento;
7. una línea bloqueada no se usa en una regla dependiente de producto;
8. un retry con respuesta perdida recupera el movimiento original;
9. el saldo coincide con el ledger;
10. la conciliación detecta cualquier diferencia.

El piloto no cambia la definición de la tarea actual.

---

#### 36. Transición futura hacia PULSO

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO
→ EVENTO CANÓNICO
→ PASS
→ MISMA PUERTA DE FIDELIZACIÓN
```

Después del corte:

```text
PULSO
→ EVENTO CANÓNICO
→ PASS
→ MISMA PUERTA DE FIDELIZACIÓN
```

PASS no deberá distinguir el algoritmo de puntos por el proveedor que originó históricamente la venta.

La procedencia Makos permanece para auditoría, pero no cambia la propiedad del ledger.

---

#### 37. Carryover obligatorio

| Pendiente material                                     | Tarea propietaria | Condición de salida                                                                                          |
| ------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| compensación de puntos ante anulaciones y devoluciones | `INT-POS-019`     | el efecto inverso referencia venta y movimiento original sin borrar historia                                 |
| conciliación de ventas, ledger y saldo                 | `INT-POS-020`     | se identifican faltantes, duplicados, cuenta, regla, base, reversos y residual                               |
| evidencia real del binding                             | `INT-POS-021`     | una muestra resuelve cuenta, regla, base y puntos esperados sin efectos                                      |
| piloto con fidelización habilitada                     | `INT-POS-022`     | se demuestran exactamente una vez, retry, no-op, bloqueo y conciliación                                      |
| corte de fuente                                        | `INT-POS-023`     | Makos deja de originar ventas nuevas sin cambiar el consumidor PASS                                          |
| acumulación permanente desde PULSO                     | `INT-SALES-005`   | PULSO y PASS conservan el mismo contrato una vez retirado el adaptador                                       |
| redención permanente desde PULSO                       | `INT-SALES-006`   | una redención explícita usa identidad PASS y resultado idempotente                                           |
| integración detallada de acumulación                   | `PASS-INT-001`    | se fija la operación propietaria, cardinalidad de movimientos y contrato físico sin client-side ledger write |
| integración detallada de redención                     | `PASS-INT-002`    | se fija la operación propietaria, atomicidad y resultado de redención                                        |
| correlación evento-cuenta-movimiento de acumulación    | `PASS-INT-001`    | cada acumulación puede reconstruirse desde evento fuente hasta cuenta y movimiento del ledger                |
| idempotencia detallada de acumulación                  | `PASS-INT-001`    | la identidad de dominio y la huella quedan materializadas en el contrato de acumulación PASS                 |
| reversión o compensación de acumulación PASS           | `PASS-INT-001`    | ajustes y reversos son append-only, referencian original y no duplican saldo                                 |
| conciliación de acumulación PASS                       | `PASS-INT-001`; `PASS-QA-001` | el contrato propietario reconcilia ledger, saldo y venta sin editar historia, y QA verifica el flujo completo |

Ningún pendiente material queda sin tarea propietaria ni condición de salida.

---

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea especializa para la transición POS externo → PULSO → PASS comportamientos ya protegidos por el registro vigente: mutaciones de puntos únicamente mediante contratos de servidor autorizados, atómicos e idempotentes; ledger inmutable y saldo derivado; evento origen y regla versionada; no duplicación por reintentos; efecto PASS exactamente una vez durante la transición; separación entre descuento, devolución, compensación y puntos; y conciliación de puntos con venta. No introduce una obligación verificable nueva fuera de esas reglas.

---

#### 39. Cobertura de prueba existente preservada

Se preserva sin modificación, en especial:

- `TREQ-PASS-008`, que exige acumulación, gasto, ajuste, reversión y redención mediante contratos de servidor autorizados, atómicos e idempotentes, sin insert del ledger ni fijación de saldo por el cliente;
- `TREQ-PASS-010`, que exige separar identidad y cuenta, conservar un ledger inmutable, evento origen, regla y versión, balance derivado y no duplicación por retry;
- `TREQ-PASS-011`, que separa devolución, reembolso, compensación, cortesía, cupón y puntos como resultados diferentes;
- `TREQ-INTEGRATION-003`, sobre clave estable, huella, resultado recuperable, concurrencia, retry y resultado desconocido;
- `TREQ-INTEGRATION-014`, que exige que ventas, anulaciones y devoluciones produzcan exactamente una vez los efectos aplicables en PASS, NEXO y NUMERA y que los reintentos no dupliquen puntos;
- `TREQ-INTEGRATION-015`, sobre contratos canónicos de cliente, caso, compensación y fidelización, no duplicación de puntos y conciliación de puntos sin venta.

Ninguna fila cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia.

---

#### 40. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-017` como tarea anterior;
2. mantiene `INT-POS-019` como única tarea siguiente;
3. confirma PULSO como propietaria de la venta;
4. confirma PASS como propietaria del ledger y saldo;
5. impide escrituras de fidelización desde Makos y el adaptador;
6. impide que PULSO fije saldo PASS;
7. declara que la relación de consumidora no implica puntos automáticos;
8. crea cero definiciones normales de evento;
9. reutiliza `VPROC-0045`;
10. conserva sus seis definiciones normales;
11. identifica `VPROC-0038.EVT-005` y `VPROC-0039.EVT-005` como candidatos primarios de evaluación, no como acumulaciones automáticas;
12. impide que un evento de pago produzca otra acumulación de la misma venta;
13. exige una cuenta PASS inequívoca;
14. permite venta a consumidor final sin cliente artificial;
15. prohíbe fusionar cuenta por correo, teléfono o nombre;
16. exige regla versionada y vigente para el hecho;
17. exige reproducibilidad con mismas entradas y versión;
18. prohíbe usar la regla actual para un retry histórico;
19. delega base, exclusiones, fórmula, redondeo y caps a la regla PASS;
20. prohíbe asumir total, neto legacy o monto pagado como base universal;
21. separa descuento, propina, pago, acumulación y redención;
22. impide inferir redención desde datos comerciales ambiguos;
23. mantiene cuarentena visible;
24. bloquea reglas dependientes de producto ante mapping insuficiente;
25. permite evaluar reglas independientes del producto solo con base íntegramente demostrable;
26. define `CONSUMER_INBOX = pass + event_id`;
27. define `effect_code = LOYALTY_POINTS_ACCRUAL`;
28. define `CONSUMER_EFFECT = pass + event_id + LOYALTY_POINTS_ACCRUAL`;
29. añade la guarda `loyalty_account_id + canonical_sale_id + ACCUMULATION`;
30. mantiene la versión de regla fuera de la identidad y dentro de la huella;
31. impide que dos eventos de la misma venta dupliquen puntos;
32. exige resultado durable;
33. exige ledger inmutable;
34. mantiene el saldo como proyección;
35. impide movimiento de acumulación con delta cero;
36. trata no-op y bloqueo como decisiones diferentes;
37. conserva conflictos en vez de crear otra acumulación;
38. recupera resultado tras respuesta perdida;
39. mantiene redención como operación separada;
40. asigna procesamiento detallado de redención a `PASS-INT-002` e `INT-SALES-006`;
41. prohíbe modificar destructivamente una acumulación aplicada;
42. asigna compensación a `INT-POS-019`;
43. asigna conciliación a `INT-POS-020`;
44. asigna prueba del binding a `INT-POS-021`;
45. asigna piloto con efectos a `INT-POS-022`;
46. asigna acumulación permanente a `INT-SALES-005`;
47. diagnostica los inserts cliente observados sin canonizarlos;
48. reconoce que `makos_excel` agregado no demuestra acumulación individual;
49. genera cero cambios `TREQ-*`;
50. no genera una copia del registro canónico de requisitos;
51. no modifica código, SQL, migraciones, datos, Supabase, credenciales ni configuración remota.

---

#### 41. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-017 — Definir evento económico para NUMERA exactamente una vez`

TAREA ACTUAL APROBADA

`INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`

SIGUIENTE TAREA RESERVADA

`INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`


### ✅ INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`
**Tarea siguiente:** `INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`
**Tipo de tarea:** documental; especialización normativa del contrato transversal de compensación para anulaciones, devoluciones y efectos posteriores de una venta canónica durante la transición desde el POS externo, separando cancelación, void, devolución física, reembolso, compensación económica, reversión de fidelización y corrección; preservando la venta, los pagos, movimientos, hechos económicos, puntos, documentos, eventos y receipts originales; sin implementar tablas, RPC, funciones, triggers, colas, migraciones, Supabase ni cambios de código
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Aplicación propietaria del hecho comercial:** `PULSO`
**Política transversal reutilizada:** `ENTERPRISE-EVENT-COMPENSATION-POLICY-001@1.0.0`
**Proceso comercial de cambio reutilizado:** `VPROC-0042 — Gestionar modificación, sustitución, cancelación, anulación y devolución sin confundir sus efectos`
**Acciones CCR principales reutilizadas:** `VPROC-0038.CCR-003`, `VPROC-0039.CCR-003`, `VPROC-0042.CCR-003`, `VPROC-0043.CCR-003`, `VPROC-0045.CCR-003`
**Línea base documental:** `vento-shell@8cdc21910ca8f9019f51b923cd2ff6a5da6c2169`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Línea base NEXO observada:** `vento-nexo@142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`
**Línea base NUMERA observada:** `vento-numera@1b48a5da425d92e19ed89cf175b1dccc4cd960e1`
**Línea base PASS observada:** `vento-pass@b5a4aec908ef12226f798078577ab089a29ccda2`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir cómo una anulación, devolución o corrección posterior de una venta canónica debe coordinar los efectos inversos o compensatorios ya confirmados sin borrar la historia original, sin convertir un solo hecho comercial en una mutación transversal y sin asumir que devolver dinero, devolver producto, revertir puntos o corregir un hecho económico son la misma operación.

Regla raíz:

```text
VENTA / EFECTOS ORIGINALES CONFIRMADOS
        ↓
HECHO POSTERIOR VÁLIDO DE CANCELACIÓN, ANULACIÓN O DEVOLUCIÓN
        ↓
PULSO CLASIFICA LA ACCIÓN COMERCIAL
        ↓
PLAN TRANSVERSAL DE COMPENSACIÓN
        ↓
DESCUBRIR EFECTOS ORIGINALES POR RECEIPT
        ↓
CADA PROPIETARIA DECIDE Y EJECUTA SU PASO
        ├── PULSO / PAGO
        ├── NEXO
        ├── NUMERA
        ├── PASS
        └── PROVEEDOR FISCAL CUANDO APLIQUE
        ↓
RESULTADOS IDEMPOTENTES + RESIDUALES EXPLÍCITOS
        ↓
CONCILIACIÓN
```

Nunca:

```text
DEVOLUCIÓN = BORRAR VENTA
```

Nunca:

```text
REEMBOLSO = ENTRADA AUTOMÁTICA DE INVENTARIO
```

Nunca:

```text
ANULACIÓN = RESTAR PUNTOS A CIEGAS
```

Nunca:

```text
COMPENSACIÓN = UPDATE DIRECTO EN DOMINIOS AJENOS
```

---

#### 2. Resultado sustantivo

`INT-POS-019` deja definidas las siguientes decisiones:

1. La venta, sus líneas y su historia permanecen identificables después de cualquier anulación, devolución, refund, corrección o compensación.
2. Una acción posterior no borra eventos, receipts, movimientos, pagos, hechos económicos, ledger de fidelización ni documentos ya confirmados.
3. `CANCEL`, `VOID`, `COMPENSATE`, `RETURN`, `REFUND`, `REVERSE`, `ADJUST` y `CORRECT` conservan significados separados.
4. `CANCEL` detiene únicamente trabajo futuro o pendiente.
5. `VOID` neutraliza una instancia inválida o duplicada cuando no produjo un efecto legítimo que deba invertirse.
6. `COMPENSATE` coordina efectos ya confirmados que requieren restitución, mitigación o efecto inverso.
7. `RETURN` representa retorno físico y no prueba por sí mismo un refund.
8. `REFUND` representa una transacción financiera nueva y no prueba por sí mismo retorno físico.
9. `REVERSE` representa el efecto inverso autorizado de un dominio propietario, por ejemplo puntos en PASS.
10. `CORRECT` produce una corrección versionada; no sustituye una compensación cuando ya existe efecto confirmado.
11. Solo se compensa un efecto cuya existencia esté confirmada.
12. Un efecto cuya existencia sea incierta se reconcilia antes de ejecutar el paso inverso.
13. Un efecto demostrado como inexistente produce `NOT_REQUIRED` y no un movimiento inverso ficticio.
14. PULSO coordina el hecho comercial y el expediente de cambio; no escribe directamente las fuentes propietarias de NEXO, NUMERA o PASS.
15. Cada propietaria ejecuta su paso compensatorio dentro de su propio contrato.
16. Cada paso conserva identidad, huella, autorización, efecto original, resultado y evidencia propios.
17. Reintentar el mismo paso no reaplica el efecto; recupera el resultado anterior.
18. La misma identidad compensatoria con contenido material incompatible produce conflicto.
19. El plan puede quedar `PARTIALLY_APPLIED`; no se presenta como completo mientras existan pasos obligatorios pendientes, fallidos o residuales no aceptados.
20. No se impone un orden universal NEXO → NUMERA → PASS ni otro orden fijo; las dependencias reales del plan determinan qué pasos pueden ejecutarse en paralelo o deben esperar.
21. La compensación física de NEXO solo existe cuando hubo un efecto físico original confirmado y existe una devolución física aceptada o una causa autorizada de compensación de inventario.
22. Un refund sin devolución física no crea stock.
23. Una devolución física no vuelve automáticamente el producto a stock vendible.
24. NEXO determina cantidad realmente aceptada, ubicación, condición, lote, presentación, cuarentena y disposición aplicables.
25. NEXO conserva el grupo y legs originales y crea un grupo compensatorio enlazado con legs inversos o compensatorios.
26. NUMERA conserva el hecho económico original y registra un hecho compensatorio o correctivo propio cuando corresponda.
27. Un periodo cerrado no se reabre ni se refecha silenciosamente para ocultar la compensación.
28. El tratamiento temporal o contable de NUMERA se resuelve por su política propietaria vigente.
29. PASS conserva la acumulación original y, cuando corresponda, genera un movimiento compensatorio de puntos.
30. Si la venta nunca produjo acumulación PASS, no se crea un reverso de puntos.
31. La redención PASS sigue siendo una operación distinta y no se infiere desde un refund o descuento.
32. Un pago confirmado que debe reembolsarse utiliza el tratamiento de `VPROC-0043.CCR-003`; el pago original permanece.
33. Un pago nunca confirmado no genera un refund ficticio.
34. El proveedor o sistema fiscal autorizado conserva autoridad sobre el documento fiscal; la historia fiscal original no se reescribe desde PULSO.
35. Una devolución parcial compensa únicamente el alcance demostrado y todavía compensable.
36. El plan conserva el efecto original, lo compensado acumulado y el residual todavía expuesto.
37. No se permite sobrecompensar cantidad, dinero, puntos ni otro efecto por encima del original confirmado y no compensado.
38. Dos solicitudes relacionadas con la misma porción original no producen dos efectos inversos.
39. Una corrección de metadata no amplía el alcance compensable.
40. Una nueva revisión comercial no reinicia la identidad de los pasos ya confirmados.
41. Los eventos posteriores tienen identidad propia y se enlazan por causalidad y correlación; no reutilizan el `event_id` original como si fueran el mismo hecho.
42. No se crea una nueva definición normal de evento empresarial.
43. Se reutilizan las familias condicionales de CCR y la política transversal de compensación ya aprobadas.
44. La importación agregada `makos_excel` no demuestra por sí sola una devolución individual compensable.
45. El importe agregado de `DEVOLUCIONES` no autoriza por sí mismo refund, movimiento NEXO, reversión NUMERA o reversión PASS.
46. `INT-POS-020` queda como propietaria de la conciliación diaria de venta, efectos, compensaciones y residuales.
47. `INT-POS-021` queda como propietaria de demostrar el binding real sin efectos.
48. `INT-POS-022` queda como propietaria del piloto con efectos.
49. Se crean cero requisitos `TREQ-*`.
50. Se modifican cero requisitos `TREQ-*`.
51. Se crean cero objetos físicos.
52. Se modifican cero objetos físicos.

---

#### 3. Dependencias consumidas y preservadas

La tarea consume sin reabrir:

- `INT-POS-003`, para autoridad temporal y límites de Makos;
- `INT-POS-005`, para identidad de venta y línea;
- `INT-POS-006`, para estados, revisiones y timestamps;
- `INT-POS-007`, para descuentos, impuestos, propinas y pagos;
- `INT-POS-008`, para captura de anulaciones, devoluciones y reembolsos sin confundirlos;
- `INT-POS-009`, para payload original, hash, versión, recepción y procedencia;
- `INT-POS-010`, para sede, terminal y caja;
- `INT-POS-011`, para mappings de producto;
- `INT-POS-012`, para cuarentena por línea;
- `INT-POS-013`, para identidad e idempotencia de fuente externa;
- `INT-POS-014`, para convergencia de transportes y replay;
- `INT-POS-015`, para evento empresarial PULSO;
- `INT-POS-016`, para efecto físico exactamente una vez en NEXO;
- `INT-POS-017`, para efecto económico exactamente una vez en NUMERA;
- `INT-POS-018`, para fidelización PASS cuando corresponda;
- `PROC-CAT-014`, para las acciones CCR ya aprobadas;
- `INT-APP-004`, para scopes de idempotencia y recuperación de resultados;
- `INT-APP-005`, para retry y resultado desconocido;
- `INT-APP-006`, para la política transversal de compensación;
- `INT-APP-007`, para auditoría;
- `INT-APP-008` y `INT-APP-009`, para pendientes, parcialidad y conciliación;
- `INT-APP-010`, para prohibición de escrituras cruzadas.

Ninguna decisión de esas tareas se modifica.

---

#### 4. Política transversal reutilizada

Esta tarea especializa:

```text
ENTERPRISE-EVENT-COMPENSATION-POLICY-001@1.0.0
```

No crea una política paralela.

Se preservan los tratamientos transversales:

| Clase CCR    | Tratamiento                     | Aplicación en esta tarea                                   |
| ------------ | ------------------------------- | ---------------------------------------------------------- |
| `CANCEL`     | `FUTURE_STOP_WITH_RESIDUALS`    | detiene trabajo futuro sin deshacer efectos ya confirmados |
| `VOID`       | `INVALID_RECORD_NEUTRALIZATION` | neutraliza registro inválido sin borrar evidencia          |
| `COMPENSATE` | `LINKED_COMPENSATION`           | coordina efectos compensatorios en dominios propietarios   |
| `REVERSE`    | `LINKED_REVERSAL`               | aplica operación inversa autorizada                        |
| `RETURN`     | `PHYSICAL_RETURN`               | representa retorno físico con custodia y aceptación        |
| `REFUND`     | `FINANCIAL_REFUND`              | crea transacción financiera inversa                        |
| `ADJUST`     | `LINKED_ADJUSTMENT`             | registra diferencia y ajuste separado                      |
| `CORRECT`    | corrección versionada           | preserva antes, después, motivo y autoridad                |

La semántica de una clase no se sustituye por otra para simplificar implementación.

---

#### 5. Acciones CCR de venta consumidas

Las rutas canónicas principales son:

| Acción               | Uso en esta tarea                                         |
| -------------------- | --------------------------------------------------------- |
| `VPROC-0038.CCR-003` | compensar efectos ya confirmados de servicio en mesa      |
| `VPROC-0039.CCR-003` | compensar efectos ya confirmados de venta de mostrador    |
| `VPROC-0042.CCR-001` | cancelar una solicitud de cambio antes de aplicar efectos |
| `VPROC-0042.CCR-002` | anular una solicitud duplicada o inválida                 |
| `VPROC-0042.CCR-003` | compensar un ajuste comercial que ya produjo efectos      |
| `VPROC-0042.CCR-004` | corregir el expediente sin reescribir efectos confirmados |
| `VPROC-0043.CCR-003` | reembolsar o revertir un pago confirmado                  |
| `VPROC-0045.CCR-003` | revertir puntos mediante movimiento compensatorio         |

El hecho de que una solicitud se denomine “devolución” no selecciona por sí solo todos estos CCR. La selección depende de qué ocurrió realmente.

---

#### 6. Separación obligatoria de conceptos

| Concepto               | Qué hace                                                     | Qué no hace                                     |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| cancelación            | detiene parte futura todavía no ejecutada                    | no revierte efectos confirmados                 |
| anulación / void       | neutraliza registro inválido o duplicado sin efecto legítimo | no sustituye un refund ni una devolución física |
| devolución comercial   | documenta la decisión y alcance comercial                    | no mueve stock ni dinero por sí sola            |
| devolución física      | devuelve custodia o existencia aceptada                      | no reembolsa automáticamente                    |
| refund                 | devuelve valor por contrato de pago                          | no crea entrada de inventario                   |
| compensación económica | crea efecto económico sucesor                                | no edita el hecho económico original            |
| reversión de puntos    | crea movimiento compensatorio PASS                           | no edita la acumulación original                |
| corrección             | rectifica datos o clasificación de forma versionada          | no borra hechos ni disfraza una reversa         |

---

#### 7. Puerta de elegibilidad

Antes de crear o ejecutar un paso compensatorio se resuelve:

```text
¿EXISTE EFECTO ORIGINAL CONFIRMADO?
├── NO
│   └── NOT_REQUIRED
├── NO SE SABE
│   └── RECONCILIACIÓN ANTES DE COMPENSAR
└── SÍ
    ↓
¿LA ACCIÓN CCR Y LA AUTORIDAD SON VÁLIDAS?
├── NO
│   └── ELIGIBILITY_REJECTED
└── SÍ
    ↓
¿EXISTE ALCANCE COMPENSABLE RESTANTE?
├── NO
│   └── RESULTADO PREVIO / NOT_REQUIRED
└── SÍ
    ↓
PLANIFICAR O EJECUTAR PASO PROPIETARIO
```

Reglas:

1. la mera posibilidad de que un efecto haya ocurrido no autoriza invertirlo;
2. una respuesta perdida obliga a resolver el resultado original;
3. un `lease` vencido no demuestra que el efecto no ocurrió;
4. un efecto original confirmado y ya totalmente compensado no admite otra compensación equivalente;
5. un efecto bloqueado antes de existir no requiere movimiento inverso.

---

#### 8. Plan de compensación

Toda compensación coordinada utiliza la identidad y el contrato ya definidos por `INT-APP-006`.

El plan conserva como mínimo:

- `compensation_plan_id`;
- `compensation_plan_version`;
- proceso;
- acción CCR;
- referencia al efecto original;
- evento original o comando fuente cuando aplique;
- alcance;
- cantidades o importes;
- dependencias;
- autoridad;
- estado;
- residuales;
- timestamps y evidencia.

Reglas específicas:

1. `compensation_plan_id` es estable entre retries;
2. una revisión del plan incrementa versión sin reemplazar versiones anteriores;
3. cambiar materialmente efecto original, alcance, cantidad, importe, destinatario o dependencia no se acepta como retry del mismo contenido;
4. el plan no es una transacción distribuida que permita escritura cruzada;
5. el plan coordina pasos y recibe resultados propietarios;
6. el plan puede contener pasos `NOT_REQUIRED`;
7. el plan puede cerrar con residual únicamente cuando el contrato transversal lo permite y existe propietario y autoridad que lo acepta;
8. un plan sucesor se enlaza al anterior en lugar de editarlo.

---

#### 9. Contrato de cada paso

Cada efecto inverso o mitigador usa el contrato de paso de `INT-APP-006`, con:

- `compensation_step_id`;
- `compensation_plan_id`;
- aplicación propietaria;
- proceso propietario;
- `effect_code` correspondiente al dominio;
- `original_effect_ref`;
- scope y referencia de idempotencia;
- huella lógica;
- autorización;
- resultado;
- verificación;
- evidencia.

No se inventa un `effect_code` transversal único para todos los dominios.

Invariantes:

```text
UN PASO
→ UNA PROPIETARIA
→ UN EFECTO ORIGINAL
→ UNA IDENTIDAD IDEMPOTENTE
→ UN RESULTADO RECUPERABLE
```

y:

```text
MISMO PASO + MISMA HUELLA
→ MISMO RESULTADO

MISMO PASO + HUELLA INCOMPATIBLE
→ CONFLICTO
```

---

#### 10. Descubrimiento de efectos originales

Antes de planificar pasos, el caso comercial reconstruye qué efectos ocurrieron realmente.

Se consultan las referencias y receipts disponibles de:

- venta y líneas;
- pago;
- salida física NEXO;
- hecho económico NUMERA;
- acumulación o redención PASS;
- documento fiscal;
- otros efectos explícitamente correlacionados.

Cada efecto se clasifica como:

- confirmado;
- demostrado como no aplicado;
- resultado desconocido;
- parcialmente aplicado;
- ya compensado;
- residual pendiente.

No se infiere un efecto desde otro.

Ejemplos:

```text
PAGO CONFIRMADO
≠
SALIDA NEXO CONFIRMADA
```

```text
SALIDA NEXO CONFIRMADA
≠
PUNTOS PASS CONFIRMADOS
```

```text
REFUND CONFIRMADO
≠
RETORNO FÍSICO CONFIRMADO
```

---

#### 11. Propiedad de cada efecto compensatorio

| Dominio         | Fuente original                       | Paso compensatorio                                          | Prohibición                                  |
| --------------- | ------------------------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| PULSO comercial | venta, línea, cambio comercial        | revisión/expediente sucesor y acción CCR                    | borrar la venta o fingir que nunca existió   |
| pago            | pago confirmado                       | refund/reverso mediante contrato propietario                | editar monto/estado histórico como sustituto |
| NEXO            | movimiento físico confirmado          | grupo compensatorio vinculado                               | insertar stock desde PULSO o el adaptador    |
| NUMERA          | hecho económico confirmado            | hecho económico compensatorio/correctivo                    | editar destructivamente el hecho original    |
| PASS            | movimiento de fidelización confirmado | movimiento compensatorio                                    | actualizar saldo o borrar la acumulación     |
| fiscal          | documento confirmado                  | acción o documento permitido por proveedor/autoridad fiscal | editar desde PULSO el documento histórico    |

---

#### 12. PULSO y el expediente comercial

PULSO conserva:

- venta original;
- líneas originales;
- revisiones;
- motivo de anulación o devolución;
- actor y autoridad;
- alcance solicitado;
- alcance autorizado;
- cantidades;
- importes comerciales;
- referencias de pago;
- referencias de efectos;
- evidencia;
- estado del expediente de cambio.

Reglas:

1. una venta cerrada puede tener un cambio o devolución posterior sin perder su cierre histórico;
2. la proyección vigente puede reflejar un estado posterior, pero la secuencia histórica permanece;
3. una devolución no vuelve a crear la venta;
4. una corrección no reemplaza el expediente original;
5. la misma solicitud externa recibida por webhook, polling o replay converge al mismo caso.

---

#### 13. Cancelación antes de efectos

Cuando la operación todavía no produjo el efecto que se pretende evitar:

```text
CANCEL
→ DETENER TRABAJO FUTURO
→ CONSERVAR RESIDUALES
→ CERO INVERSIÓN FICTICIA
```

Ejemplos:

- línea no preparada;
- pago no confirmado;
- salida NEXO no aplicada;
- acumulación PASS no aplicada;
- hecho NUMERA no aplicado.

Una cancelación no genera por defecto:

- refund;
- entrada de stock;
- reversión de puntos;
- hecho económico negativo.

---

#### 14. Void de registro inválido

`VOID` aplica cuando una instancia o instrumento es inválido, duplicado o nunca produjo un efecto legítimo.

Reglas:

1. el registro original permanece visible;
2. conserva causa y autoridad;
3. se enlaza el registro válido cuando exista;
4. no se usa `VOID` para ocultar una venta legítima que ya produjo efectos;
5. si existen efectos confirmados, esos efectos requieren su tratamiento propietario;
6. anular una solicitud duplicada no duplica la compensación ya abierta por la solicitud válida.

---

#### 15. Compensación comercial después de efectos

Cuando la venta o cambio ya produjo uno o más efectos confirmados:

```text
VPROC-0038.CCR-003
o
VPROC-0039.CCR-003
o
VPROC-0042.CCR-003
        ↓
PLAN DE COMPENSACIÓN
        ↓
PASOS POR PROPIETARIA
```

PULSO no declara el plan `COMPLETED` por haber registrado únicamente la solicitud comercial.

El cierre requiere los pasos obligatorios o residuales aceptados conforme a `INT-APP-006`.

---

#### 16. Devolución física en NEXO

El paso NEXO solo aplica cuando existe un efecto físico original confirmado y una restitución física realmente aceptada o una causa autorizada equivalente.

Debe preservar:

- movimiento/grupo original;
- receipt original;
- venta y línea;
- producto;
- cantidad;
- UOM;
- presentación;
- lote;
- condición;
- origen y destino;
- custodia;
- cantidad compensada;
- cantidad restante;
- grupo compensatorio;
- nuevo posting receipt.

Reglas:

1. no se hace `UPDATE` ni `DELETE` del movimiento original;
2. el grupo compensatorio referencia el original;
3. los legs compensatorios expresan el efecto físico real;
4. la cantidad devuelta comercialmente no se confunde con la cantidad físicamente recibida;
5. un producto recibido puede quedar en cuarentena, daño, merma u otra condición en lugar de disponibilidad vendible;
6. NEXO decide la ubicación y condición física con sus contratos;
7. el cliente o PULSO no fijan saldo final;
8. un refund sin producto recibido produce `NOT_REQUIRED` para el retorno físico cuando la política comercial no exige otro efecto de inventario;
9. una devolución física sin refund puede existir cuando la decisión comercial así lo determine;
10. reparar una proyección no crea otro movimiento.

---

#### 17. Límite contra doble entrada de inventario

Antes de cualquier paso físico se verifica:

- efecto original NEXO confirmado;
- porción original todavía compensable;
- devoluciones físicas ya confirmadas;
- receipts previos;
- estado de conciliación.

Debe cumplirse conceptualmente:

```text
COMPENSACIÓN FÍSICA ACUMULADA
<=
EFECTO FÍSICO ORIGINAL CONFIRMADO
```

Una solicitud repetida, reintento, recepción duplicada o replay no puede superar la cantidad original pendiente de compensar.

---

#### 18. Refund de pago

Cuando existe pago confirmado y la decisión exige devolución monetaria:

```text
VPROC-0043.CCR-003
→ FINANCIAL_REFUND
→ TRANSACCIÓN NUEVA VINCULADA
```

Reglas:

1. el pago original permanece;
2. el refund conserva proveedor, medio, moneda, importe, referencia y estado;
3. un timeout de refund no se interpreta como refund inexistente;
4. antes de repetir se consulta el resultado original;
5. dos refunds no pueden reclamar la misma porción de pago;
6. un pago parcialmente reembolsado conserva el residual todavía reembolsable;
7. un pago nunca confirmado produce `NOT_REQUIRED`, no un refund ficticio;
8. un refund no altera directamente inventario, puntos o hecho económico;
9. contracargo, refund y void de autorización conservan semánticas del contrato de pago y no se fusionan por etiqueta.

---

#### 19. Límite contra sobre-reembolso

El dominio de pago conserva el valor original confirmado, refunds previos y residual.

Debe impedir:

```text
REFUNDS CONFIRMADOS ACUMULADOS
>
VALOR CONFIRMADO COMPENSABLE DEL PAGO
```

Si una solicitud excede el residual:

- no se trunca silenciosamente;
- no se ejecuta una segunda transacción parcial por inferencia;
- produce conflicto, rechazo o revisión conforme al contrato propietario.

---

#### 20. Compensación económica en NUMERA

Si el hecho original de venta fue aplicado en NUMERA y la devolución o anulación modifica su realidad económica, NUMERA crea un efecto sucesor enlazado.

Debe preservar:

- hecho económico original;
- identidad y versión;
- venta y líneas aplicables;
- entidad legal;
- sede;
- centro;
- moneda;
- fecha del hecho;
- fecha de reconocimiento;
- importe original;
- importe compensatorio;
- impuestos aplicables;
- documento y evidencia;
- referencia al plan y al hecho causal;
- periodo;
- resultado.

Reglas:

1. el hecho original no se borra;
2. la compensación no se calcula desde un agregado mutable;
3. un refund y una compensación económica son correlacionados, no idénticos;
4. una devolución física y una compensación económica son correlacionadas, no idénticas;
5. si el hecho original nunca existió en NUMERA, no se genera el inverso;
6. una respuesta desconocida se reconcilia antes de repetir;
7. un periodo cerrado no se modifica silenciosamente;
8. la política NUMERA decide el tratamiento permitido para hechos tardíos o periodos cerrados;
9. PULSO no escribe libros, saldos o asientos de NUMERA.

---

#### 21. Reversión de fidelización en PASS

Cuando una venta produjo una acumulación confirmada y la política aplicable exige revertir total o parcialmente el beneficio:

```text
VPROC-0045.CCR-003
→ MOVIMIENTO COMPENSATORIO PASS
→ LEDGER INMUTABLE
→ SALDO DERIVADO
```

Reglas:

1. la acumulación original permanece;
2. el movimiento inverso referencia la acumulación y la venta;
3. la regla y versión originales permanecen identificables;
4. la cantidad de puntos compensada no supera el residual del movimiento original;
5. reintentos recuperan el resultado anterior;
6. si la venta nunca acumuló puntos, el paso es `NOT_REQUIRED`;
7. una cuenta diferente no puede recibir la reversión;
8. una redención posterior no se borra para resolver una devolución;
9. si la reversión enfrenta saldo insuficiente o un beneficio ya consumido, PASS conserva el conflicto o residual según su política; no inventa saldo;
10. el saldo se recalcula desde ledger; no se fija desde PULSO.

---

#### 22. Fiscalidad y documentos

Documento fiscal, venta, pago y compensación permanecen separados.

Reglas:

1. el documento original conserva identidad, estado y evidencia;
2. una devolución comercial no implica que PULSO pueda editar el documento;
3. la acción fiscal necesaria se ejecuta únicamente mediante el proveedor o autoridad propietaria vigente;
4. una nota, void o documento sucesor se correlaciona con el original;
5. el plan conserva el estado fiscal como un paso o residual cuando sea obligatorio;
6. un fallo fiscal no justifica reaplicar stock, puntos o refund ya confirmados.

---

#### 23. Partialidad

Una devolución puede afectar solo una parte de la venta.

Por cada dominio deben preservarse:

- alcance original confirmado;
- alcance solicitado;
- alcance autorizado;
- alcance compensado en este paso;
- compensación acumulada previa;
- residual compensable;
- residual bloqueado o no aplicable.

Reglas:

1. una línea puede estar totalmente compensada mientras otra permanece intacta;
2. el residual no desaparece al cerrar un intento;
3. un paso parcial no reabre porciones ya compensadas;
4. un cambio de cantidad requiere nueva versión o plan sucesor cuando altera el contenido lógico;
5. el mismo fragmento no se ejecuta dos veces;
6. la partialidad de un dominio no obliga a que los otros tengan la misma cantidad o importe;
7. cada propietaria explica su propio residual.

---

#### 24. Venta y línea como anclas

Cuando la compensación es atribuible a una línea, la referencia de la línea original permanece obligatoria.

No se permite:

- repartir una devolución agregada entre líneas por conveniencia;
- seleccionar una línea por nombre aproximado;
- trasladar un refund de una venta a otra;
- usar una línea nueva para esconder una línea original errónea;
- compensar una línea NEXO que nunca produjo movimiento.

Una corrección del mapping puede permitir resolver el caso, pero no crea retrospectivamente un efecto original inexistente.

---

#### 25. Cuarentena de líneas

Una línea `ACTIVE` en cuarentena conserva su identidad.

Si la línea no produjo el efecto original:

- no se genera una reversa ficticia de ese efecto.

Si existe evidencia incompatible sobre si el efecto ocurrió:

- el paso queda pendiente de conciliación.

Si el efecto fue confirmado antes de descubrir el problema de mapping:

- se conserva el original;
- no se reescribe con el mapping nuevo;
- la compensación referencia el efecto realmente aplicado;
- cualquier corrección de identidad o mapping se registra separadamente.

---

#### 26. Identidad, retry y concurrencia

El plan y cada paso heredan `INT-APP-004`, `INT-APP-005` e `INT-APP-006`.

Reglas:

1. retry conserva identidad y huella;
2. replay conserva procedencia;
3. workers concurrentes no ejecutan dos veces el mismo paso;
4. la expiración de claim o lease permite recuperación controlada, no prueba inexistencia de efecto;
5. una respuesta perdida devuelve el resultado previo cuando el efecto ya fue confirmado;
6. una huella diferente bajo la misma identidad produce conflicto;
7. un cambio verdadero de alcance exige revisión o sucesor explícito;
8. reiniciar cliente, worker o servicio no reinicia el presupuesto;
9. agotamiento de retry abre conciliación;
10. un plan incompleto no dispara por inferencia una segunda cadena inversa.

---

#### 27. Eventos y causalidad

Esta tarea no crea una definición normal de evento nueva.

Los hechos posteriores utilizan:

- definiciones normales vigentes cuando un proceso alcanza un hito existente;
- familias condicionales de CCR para cancelación, void, refund, reversión, compensación o corrección;
- `event_id` propio por emisión concreta;
- `correlation_id` para el caso;
- `causation_id` hacia el hecho inmediato;
- referencias al evento, efecto y receipt originales.

No se reutiliza el `event_id` de la venta para representar el refund, retorno o reversión.

---

#### 28. Estados del plan

Se preservan los outcomes de `INT-APP-006` aplicables:

| Outcome                  | Uso                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `NOT_REQUIRED`           | se demostró que no existe efecto que tratar                                                              |
| `ELIGIBILITY_REJECTED`   | acción, autoridad, ventana o clasificación no permiten compensar                                         |
| `PLANNED`                | plan autorizado sin pasos confirmados                                                                    |
| `IN_PROGRESS`            | al menos un paso inició                                                                                  |
| `PARTIALLY_APPLIED`      | existen pasos confirmados y otros obligatorios pendientes o fallidos                                     |
| `COMPLETED`              | pasos obligatorios y verificaciones terminaron y los residuales aceptados tienen propietario y autoridad |
| `SUPERSEDED_BY_NEW_PLAN` | otra versión o plan sucesor asumió el tratamiento                                                        |
| `BLOCKED_IRREVERSIBLE`   | un efecto no admite reversión literal y requiere residual, mitigación o tratamiento autorizado           |

`COMPLETED` no equivale a “se recibió la devolución”.

---

#### 29. Residuales obligatorios

Cuando un plan no puede restituir literalmente todos los efectos, conserva:

- pasos confirmados;
- pasos pendientes;
- pasos fallidos;
- pasos imposibles o irreversibles;
- cantidades o importes expuestos;
- recursos afectados;
- propietario;
- fecha;
- riesgo;
- control;
- condición de conciliación;
- autoridad que acepta el residual.

Un residual sin propietario impide cerrar el plan.

---

#### 30. Dependencias entre pasos

No existe un orden técnico universal.

El plan declara dependencias cuando una propietaria necesita un hecho previo.

Ejemplos de relación permitida:

- un refund puede requerir que la decisión comercial esté autorizada;
- un retorno NEXO puede requerir recepción física y condición comprobada;
- un ajuste NUMERA puede requerir monto y documento comercial suficientes;
- una reversión PASS puede requerir identificar la acumulación original;
- una acción fiscal puede requerir documento original y causal válida.

Una dependencia no convierte a PULSO en propietaria del efecto dependiente.

---

#### 31. Fallo parcial

Si un refund queda confirmado pero NEXO o PASS fallan después:

```text
REFUND CONFIRMADO
+ PASO NEXO PENDIENTE
+ PASO PASS PENDIENTE
=
PARTIALLY_APPLIED
```

No:

```text
REPETIR REFUND PARA REINTENTAR TODO
```

Cada paso conserva su resultado y retry independiente.

---

#### 32. Efectos irreversibles

Si un hecho no puede deshacerse literalmente:

- no se marca como inexistente;
- no se elimina de auditoría;
- no se modifica su timestamp original;
- no se falsifica un inverso técnico;
- se registra mitigación, corrección, obligación compensatoria o residual;
- la autoridad propietaria define el cierre permitido.

La venta original y su evidencia permanecen como hechos históricos.

---

#### 33. Auditoría mínima

La trazabilidad debe permitir reconstruir:

```text
VENTA ORIGINAL
→ EVENTO ORIGINAL
→ EFECTOS ORIGINALES
→ SOLICITUD DE CAMBIO
→ ACCIÓN CCR
→ PLAN Y VERSIÓN
→ PASOS POR PROPIETARIA
→ INTENTOS
→ RESULTADOS
→ RESIDUALES
→ CIERRE / CONCILIACIÓN
```

Debe conservarse, cuando aplique:

- `compensation_plan_id`;
- versión;
- acción CCR;
- `original_effect_ref`;
- clasificación de reversibilidad;
- `compensation_step_id`;
- propietaria;
- autorización;
- referencia de idempotencia;
- intentos;
- verificación;
- evidencia;
- actor;
- timestamps;
- error y residual.

---

#### 34. Implementación física observada en la transición

La implementación PULSO observada continúa utilizando `makos_excel`.

El parser actual reconoce una columna `DEVOLUCIONES` y conserva `return_amount` por fila agregada de producto junto con cantidad, subtotal, impuestos y descuentos.

Esa evidencia permite afirmar:

```text
EXISTE IMPORTE AGREGADO DE DEVOLUCIONES
```

No permite afirmar:

```text
EXISTE UNA DEVOLUCIÓN CANÓNICA INDIVIDUAL
```

porque la fila agregada no demuestra por sí sola:

- venta externa individual;
- línea externa individual;
- cliente;
- pago original;
- refund;
- movimiento NEXO original;
- acumulación PASS original;
- hecho NUMERA original;
- documento fiscal afectado;
- identidad de una devolución;
- parcialidad por venta;
- receipts de efectos.

Por tanto, el campo agregado se conserva como señal o evidencia de conciliación y no como comando automático de compensación.

---

#### 35. Límite del posting legacy de inventario

La migración física vigente de PULSO contiene un flujo de posting diario hacia inventario basado en filas agregadas y una tabla de postings por fila, producto, ubicación y tipo.

Ese flujo no materializa el contrato compensatorio objetivo de esta tarea porque el contrato objetivo requiere:

- venta y línea originales;
- efecto NEXO original confirmado;
- receipt;
- acción CCR;
- plan y paso;
- cantidad compensable;
- resultado idempotente;
- grupo compensatorio append-only.

La existencia del flujo legacy no autoriza a crear un retorno físico con `return_amount`.

Esta tarea no modifica la migración.

---

#### 36. Binding real de Makos

`INT-POS-021` deberá demostrar, sin efectos internos, si la evidencia real del POS permite resolver para una muestra de anulación o devolución:

- venta original;
- línea original;
- identificador del hecho posterior;
- tipo real de acción;
- timestamp;
- versión;
- cantidad;
- importe;
- pago y referencia;
- documento fiscal;
- producto;
- cliente cuando aplique;
- relación con el evento PULSO;
- efectos originales esperados;
- partialidad.

Si Makos no expone una identidad suficiente, el adaptador no fabricará una compensación individual a partir de agregados.

---

#### 37. Piloto con efectos

`INT-POS-022` solo podrá habilitar compensaciones cuando demuestre, como mínimo:

1. una devolución individual no borra la venta;
2. un efecto inexistente produce `NOT_REQUIRED`;
3. un efecto incierto se reconcilia antes de compensar;
4. un refund repetido no devuelve dinero dos veces;
5. un retorno físico repetido no ingresa stock dos veces;
6. una reversión PASS repetida no resta puntos dos veces;
7. un ajuste NUMERA repetido no crea dos efectos;
8. un refund sin retorno físico no crea stock;
9. un retorno físico no se vuelve automáticamente vendible;
10. una devolución parcial conserva residual;
11. el plan puede quedar `PARTIALLY_APPLIED`;
12. cada paso recupera su propio receipt;
13. no hay escrituras cruzadas;
14. la conciliación detecta el residual.

---

#### 38. Transición futura hacia PULSO

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO
→ HECHO COMERCIAL
→ PLAN DE COMPENSACIÓN
→ PROPIETARIAS
```

Después del corte:

```text
PULSO
→ HECHO COMERCIAL
→ MISMO PLAN DE COMPENSACIÓN
→ PROPIETARIAS
```

Cambiar la fuente de la venta no cambia:

- las acciones CCR;
- la política de compensación;
- la propiedad de NEXO;
- la propiedad de NUMERA;
- la propiedad de PASS;
- el contrato de refund;
- la regla de no borrar historia.

---

#### 39. Carryover obligatorio

| Pendiente material                                     | Tarea propietaria | Condición de salida                                                                      |
| ------------------------------------------------------ | ----------------- | ---------------------------------------------------------------------------------------- |
| conciliación diaria de venta, efectos y compensaciones | `INT-POS-020`     | detecta efecto faltante, exceso, residual, duplicado y diferencia por propietaria        |
| demostración del binding Makos                         | `INT-POS-021`     | identifica venta, línea, acción y alcance reales sin efectos internos                    |
| piloto de compensación                                 | `INT-POS-022`     | demuestra idempotencia, partialidad, resultado desconocido y no sobrecompensación        |
| corte de fuente                                        | `INT-POS-023`     | Makos deja de originar ventas nuevas sin cambiar la semántica de compensación            |
| efecto físico permanente                               | `INT-SALES-003`   | NEXO materializa el contrato de salida y sus compensaciones bajo su frontera propietaria |
| efecto económico permanente                            | `INT-SALES-004`   | NUMERA consume la venta y conserva tratamiento correlacionado de efectos sucesores       |
| acumulación PASS permanente                            | `INT-SALES-005`   | PASS conserva ledger, acumulación y reversión correlacionables                           |
| redención PASS permanente                              | `INT-SALES-006`   | redención usa su propia identidad y no se deduce de una devolución                       |
| control transversal contra duplicados                  | `INT-SALES-007`   | retries de ventas y efectos no generan duplicados                                        |
| conciliación de convivencia                            | `INT-SALES-008`   | efectos de POS externo y PULSO convergen sin doble tratamiento                           |

Ningún pendiente material queda sin tarea propietaria y condición de salida.

---

#### 40. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea especializa para la transición POS externo → PULSO los comportamientos ya protegidos por el registro vigente: separación de cancelación, anulación, devolución, refund y compensación; conservación de la historia; efectos propietarios exactamente una vez; compensaciones correlacionadas al original; ledger físico append-only; hechos económicos no destructivos; reversión de fidelización mediante ledger; idempotencia, retry, resultado desconocido, partialidad y conciliación. No introduce una obligación verificable nueva fuera de esos contratos aprobados.

---

#### 41. Cobertura de prueba existente preservada

Se preserva sin modificación, en especial:

- `TREQ-INTEGRATION-003`, para identidad estable, huella, resultado recuperable, concurrencia y resultado desconocido;
- `TREQ-INTEGRATION-011`, para movimientos NEXO de venta, anulación o devolución exactamente una vez y compensación vinculada al original;
- `TREQ-INTEGRATION-014`, para efectos aplicables de venta, anulación o devolución exactamente una vez en NEXO, PASS y NUMERA;
- `TREQ-INTEGRATION-015`, para compensaciones exactamente una vez y conciliación de efectos;
- `TREQ-INTEGRATION-017`, para hechos económicos, reversos, periodos y conciliación NUMERA;
- `TREQ-INTEGRATION-151`, para retry crítico de inventario, pago y puntos;
- `TREQ-INTEGRATION-155`, para replay sin reactivar efectos sensibles;
- `TREQ-INTEGRATION-156`, para claim concurrente y lease sin asumir inexistencia de efecto;
- `TREQ-PULSO-001`, para ciclo E2E con anulación o reversión;
- `TREQ-PULSO-005`, para modificación o cancelación preservando original y efectos emitidos;
- `TREQ-PULSO-006`, para semánticas separadas de cancelación, anulación, devolución, reembolso y compensación;
- `TREQ-NEXO-011`, para movimientos y proyecciones reconciliables con compensación verificable;
- `TREQ-NEXO-186`, para grupo compensatorio append-only enlazado al original;
- `TREQ-NEXO-200`, para frontera antes/después del posting y reversa sin update/delete;
- `TREQ-NEXO-228`, para saldo compensable y grupo compensatorio de ajustes;
- `TREQ-NUMERA-001`, para correcciones con historia;
- `TREQ-NUMERA-002`, para hechos económicos y acciones compensatorias no destructivas;
- `TREQ-PASS-008`, para reversión de puntos mediante contrato de servidor atómico e idempotente;
- `TREQ-PASS-010`, para ledger inmutable, evento origen, regla, versión y saldo derivado;
- `TREQ-PASS-011`, para mantener devolución, refund, compensación, cortesía, cupón y puntos como resultados distintos.

Ninguna fila cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia.

---

#### 42. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-018` como tarea anterior;
2. mantiene `INT-POS-020` como única tarea siguiente;
3. reutiliza `ENTERPRISE-EVENT-COMPENSATION-POLICY-001@1.0.0`;
4. crea cero definiciones normales de evento;
5. reutiliza `VPROC-0038.CCR-003`;
6. reutiliza `VPROC-0039.CCR-003`;
7. reutiliza `VPROC-0042.CCR-003`;
8. reutiliza `VPROC-0043.CCR-003`;
9. reutiliza `VPROC-0045.CCR-003`;
10. separa `CANCEL`, `VOID`, `COMPENSATE`, `RETURN`, `REFUND`, `REVERSE` y `CORRECT`;
11. impide borrar venta o línea originales;
12. impide borrar pago original;
13. impide borrar movimiento NEXO original;
14. impide borrar hecho NUMERA original;
15. impide borrar acumulación PASS original;
16. exige confirmar un efecto antes de compensarlo;
17. envía un resultado incierto a conciliación;
18. produce `NOT_REQUIRED` cuando el efecto no existió;
19. impide escrituras cruzadas;
20. asigna cada paso a su propietaria;
21. conserva identidad y huella por paso;
22. hace retry recuperable;
23. convierte reuse incompatible en conflicto;
24. soporta `PARTIALLY_APPLIED`;
25. conserva residuales con propietario;
26. impide cierre completo con residual huérfano;
27. no impone orden universal entre dominios;
28. impide que refund cree stock;
29. impide que retorno físico cree refund automáticamente;
30. exige aceptación física para el retorno NEXO;
31. conserva condición y cuarentena física;
32. crea grupo compensatorio NEXO en vez de editar el original;
33. limita compensación física al residual original;
34. crea refund como transacción nueva;
35. limita refund al residual confirmado;
36. conserva periodos y hechos NUMERA;
37. impide reapertura silenciosa de periodos;
38. crea reversión PASS como movimiento de ledger;
39. limita reversión PASS al residual original;
40. no revierte puntos cuando nunca hubo acumulación;
41. mantiene redención separada;
42. conserva fiscalidad bajo su autoridad propietaria;
43. soporta devolución parcial;
44. impide ejecutar dos veces el mismo fragmento;
45. conserva venta y línea como anclas;
46. no reparte `return_amount` agregado entre ventas por inferencia;
47. no usa una línea en cuarentena para inventar una reversa;
48. conserva causalidad de eventos;
49. diagnostica `makos_excel` como evidencia agregada insuficiente para compensación individual;
50. diagnostica el posting legacy sin canonizarlo como retorno;
51. asigna conciliación diaria a `INT-POS-020`;
52. asigna binding real a `INT-POS-021`;
53. asigna piloto con efectos a `INT-POS-022`;
54. mantiene `INT-SALES-003` a `INT-SALES-008` como handoff permanente aplicable;
55. genera cero cambios `TREQ-*`;
56. no genera una copia del registro canónico de requisitos;
57. no modifica código, SQL, migraciones, datos, Supabase, credenciales ni configuración remota.

---

#### 43. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-018 — Definir evento de fidelización para PASS cuando corresponda`

TAREA ACTUAL APROBADA

`INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`

SIGUIENTE TAREA RESERVADA

`INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`


### ✅ INT-POS-020 — Definir conciliación diaria entre POS y efectos internos

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`
**Tarea siguiente:** `INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`
**Tipo de tarea:** documental; definición normativa de la conciliación diaria entre la evidencia del POS externo, la venta canónica en PULSO, su evento empresarial, los efectos aplicables en NEXO, NUMERA y PASS y las compensaciones o residuales posteriores, con comparación por identidad y recibos, clasificación de diferencias, recuperación idempotente y cierre auditable, sin crear eventos normales nuevos ni implementar tablas, vistas, RPC, funciones, triggers, jobs, colas, migraciones, Supabase o cambios de código
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**Aplicación propietaria de la venta:** `PULSO`
**Fuente externa transitoria:** `Makos`
**Fronteras consumidoras:** `NEXO`, `NUMERA`, `PASS`
**Contratos transversales reutilizados:** `INT-APP-004` a `INT-APP-010`
**Línea base documental:** `vento-shell@fa99683eefdf68a26b044afb71ab81d70ef05a1a`
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos autorizados:** ninguno

---

#### 1. Propósito

Definir el control diario que demuestre si las ventas observadas durante la transición desde el POS externo convergen con los hechos y efectos internos que Vento OS debía producir, sin confundir igualdad de totales con correspondencia individual y sin crear, corregir o compensar efectos desde la propia conciliación.

La cadena controlada es:

```text
EVIDENCIA DEL POS EXTERNO
        ↓
RECEPCIÓN Y NORMALIZACIÓN
        ↓
VENTA / LÍNEAS CANÓNICAS EN PULSO
        ↓
EVENTO EMPRESARIAL PULSO
        ↓
EXPECTATIVA DE EFECTOS SEGÚN ELEGIBILIDAD
        ├── NEXO
        ├── NUMERA
        └── PASS
        ↓
EFECTOS OBSERVADOS Y RECEIPTS
        ↓
ANULACIONES / DEVOLUCIONES / COMPENSACIONES
        ↓
DIFERENCIAS + RESIDUALES + PROPIETARIOS
        ↓
RESULTADO DE CONCILIACIÓN
```

La conciliación observa, compara, clasifica y transfiere acciones a las propietarias. No inventa hechos para que las cifras coincidan.

---

#### 2. Resultado sustantivo

`INT-POS-020` deja definidas las siguientes decisiones:

1. Existirá una conciliación diaria de la transición POS externo → PULSO → efectos internos.
2. La conciliación se ejecuta conceptualmente por fecha empresarial y alcance real de fuente, no por una hora fija inventada.
3. Un mismo día puede requerir nuevas revisiones de conciliación cuando llegan eventos tardíos, revisiones o resultados previamente desconocidos.
4. Cada revisión conserva el resultado anterior; no lo sobrescribe.
5. La conciliación diaria es un control de completitud y convergencia, no el mecanismo primario de retry.
6. No sustituye la conciliación de recepción de webhook/polling definida en `INT-POS-014`.
7. No sustituye el proceso de cierre de caja `VPROC-0044`.
8. No sustituye la conciliación propietaria de NEXO, NUMERA o PASS.
9. PULSO coordina la comparación de la venta y sus efectos, pero no escribe fuentes de verdad ajenas.
10. La unidad canónica de cierre objetivo es la venta y, cuando aplica, la línea y el efecto individual.
11. Los totales diarios o por producto son controles de cobertura, no prueba de correspondencia uno a uno.
12. Un total agregado coincidente no autoriza a cerrar diferencias individuales.
13. Una diferencia agregada no autoriza a repartir importes, cantidades, puntos o efectos entre ventas por inferencia.
14. La evidencia actual `makos_excel` permite conciliación agregada de recepción y posting legacy, pero no demuestra por sí sola ventas individuales completas.
15. La demostración del binding real de Makos permanece en `INT-POS-021`.
16. Cada venta o evento determina qué efectos son aplicables según los contratos ya aprobados.
17. La ausencia de un efecto no es discrepancia cuando el contrato demuestra que el efecto no era aplicable.
18. PASS puede producir cero efecto de fidelización sin constituir error cuando no existe identidad, cuenta o regla elegible.
19. NEXO puede producir cero movimiento cuando la disposición canónica demuestra que la venta no tiene efecto de inventario.
20. NUMERA solo debe materializar el efecto económico cuando la puerta de materialidad aprobada queda satisfecha.
21. Publicar un evento no prueba entrega.
22. Entregar un evento no prueba aplicación del efecto.
23. Un HTTP 2xx, ACK, fila de outbox o intento registrado no equivale a efecto confirmado.
24. `EFFECT_CONFIRMED` y `PRIOR_RESULT_REPLAYED` son evidencia de resultado confirmado de la unidad correspondiente.
25. `RESULT_UNKNOWN`, `CONFLICT`, `PARTIALLY_APPLIED` y `RECONCILIATION_REQUIRED` permanecen abiertos.
26. Una falla técnica no se clasifica automáticamente como efecto ausente.
27. Antes de repetir una operación con resultado desconocido se consulta el estado propietario o el receipt aplicable.
28. La misma identidad y huella devuelve el resultado previo.
29. La misma identidad con huella incompatible produce conflicto.
30. Un consumidor fallido no invalida un efecto confirmado de otro consumidor.
31. Los presupuestos de retry son independientes por consumidora y efecto.
32. El agotamiento de retry no ejecuta automáticamente compensación.
33. La conciliación identifica si la acción correcta es retry seguro, consulta, corrección, compensación, intervención o espera.
34. La conciliación nunca ejecuta una escritura cruzada para reparar una diferencia.
35. Toda diferencia queda ligada a una propietaria y una condición de salida.
36. Toda diferencia sin evidencia suficiente permanece abierta; no se fuerza a cero.
37. Un evento tardío se atribuye al hecho que realmente ocurrió y no se mueve a otro día solo por su fecha de recepción.
38. Un replay no crea una segunda venta ni un segundo efecto.
39. Una línea `ACTIVE` en cuarentena no se trata como resuelta por coincidir un total agregado.
40. Una línea `RELEASED` conserva la obligación de verificar los efectos que quedaron pendientes.
41. Las compensaciones se comparan contra el efecto original confirmado y su residual.
42. Una compensación sin original es discrepancia.
43. Un original que exige compensación y no la tiene es discrepancia.
44. Una compensación superior al residual original es discrepancia.
45. La conciliación preserva partialidad; no convierte un resultado parcial en éxito total.
46. El cierre diario no borra diferencias pendientes.
47. Un cierre con residuales conserva propietario, acción siguiente y evidencia.
48. No se crea una nueva definición normal de evento empresarial.
49. Se crean cero requisitos `TREQ-*`.
50. Se modifican cero requisitos `TREQ-*`.
51. Se crean cero objetos físicos.
52. Se modifican cero objetos físicos.

---

#### 3. Dependencias consumidas y preservadas

La tarea consume sin reabrir:

- `INT-POS-003`, para autoridad transitoria de Makos;
- `INT-POS-004`, para credencial y perímetro del acceso externo;
- `INT-POS-005`, para identidad canónica de venta y línea;
- `INT-POS-006`, para estados, revisiones y tiempos;
- `INT-POS-007`, para componentes monetarios y pago;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos;
- `INT-POS-009`, para payload original, procedencia y hash;
- `INT-POS-010`, para sede, terminal y caja;
- `INT-POS-011`, para mapping de producto;
- `INT-POS-012`, para cuarentena por línea;
- `INT-POS-013`, para idempotencia de recepción;
- `INT-POS-014`, para webhook y polling de recepción;
- `INT-POS-015`, para emisión del evento canónico;
- `INT-POS-016`, para efecto NEXO;
- `INT-POS-017`, para efecto NUMERA;
- `INT-POS-018`, para efecto PASS;
- `INT-POS-019`, para compensaciones;
- `INT-APP-004`, para idempotencia;
- `INT-APP-005`, para retry;
- `INT-APP-006`, para compensación;
- `INT-APP-007`, para auditoría;
- `INT-APP-008`, para estados pendientes;
- `INT-APP-009`, para fallos parciales y conciliación;
- `INT-APP-010`, para prohibición de escrituras cruzadas.

Ninguna decisión aprobada en esas tareas se modifica.

---

#### 4. Frontera con `VPROC-0044`

`VPROC-0044` continúa siendo el proceso PULSO que demuestra el resultado de una jornada de caja conciliando ventas, pagos, efectivo, diferencias y responsabilidades.

`INT-POS-020` tiene otra frontera:

```text
VPROC-0044
→ CONCILIA LA JORNADA DE CAJA

INT-POS-020
→ CONCILIA LA CADENA DE INTEGRACIÓN
  POS EXTERNO / PULSO / EVENTO / NEXO / NUMERA / PASS / COMPENSACIONES
```

Por tanto:

1. `INT-POS-020` puede detectar una diferencia que impida o cuestione un cierre de caja;
2. no declara por sí misma caja cerrada;
3. una caja conciliada no demuestra por sí sola NEXO, NUMERA o PASS correctos;
4. NEXO, NUMERA y PASS correctos no demuestran por sí solos efectivo o caja conciliados;
5. los dos controles deben permanecer correlacionables y no fusionarse.

---

#### 5. Significado de “diaria”

La palabra diaria fija una cadencia mínima de control empresarial, no una hora técnica específica.

Reglas:

1. debe existir una revisión por cada fecha empresarial cubierta por la fuente;
2. la zona horaria y regla de fecha provienen del contrato temporal aprobado, no del reloj del worker;
3. `occurred_at`, fecha de venta y timestamps de fuente se conservan separados de `received_at`;
4. llegada tardía no cambia el momento real del hecho;
5. si aparece evidencia nueva, se genera una revisión de la conciliación del periodo afectado;
6. el resultado anterior se conserva para explicar qué cambió;
7. la tarea no fija cron, scheduler, hora de corte, lookback ni infraestructura.

La programación física queda para la fase de implementación correspondiente.

---

#### 6. Alcance mínimo de una revisión

Cada revisión de conciliación debe poder explicar:

- fuente externa y alcance consultado;
- fecha empresarial;
- sede;
- terminal o caja cuando el contrato real la exponga;
- cobertura de recepción;
- ventas y líneas identificables;
- mappings y cuarentenas;
- eventos PULSO emitidos;
- efectos esperados por consumidora;
- efectos observados;
- receipts;
- retries pendientes;
- resultados desconocidos;
- compensaciones;
- residuales;
- diferencias;
- propietario de cada diferencia;
- acción o condición necesaria para resolverla.

Los identificadores físicos concretos que Makos realmente permita usar se demostrarán en `INT-POS-021`; esta tarea no los inventa.

---

#### 7. Niveles de comparación

La conciliación trabaja en cinco niveles simultáneos:

| Nivel         | Finalidad                                                  | Límite                                                                 |
| ------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| fuente        | demostrar que la evidencia externa esperada fue recibida   | no prueba venta interna individual si la fuente solo entrega agregados |
| venta / línea | comparar identidad, revisión, estado y contenido comercial | no prueba efectos consumidores                                         |
| evento        | demostrar emisión y correlación PULSO                      | publicación no equivale a efecto                                       |
| efecto        | comparar expectativa contra receipt propietario            | cada consumidora conserva autoridad                                    |
| agregado      | detectar faltantes globales y anomalías de cobertura       | nunca sustituye correspondencia individual                             |

Un nivel superior no corrige automáticamente uno inferior.

---

#### 8. Cadena de comparación por venta

Cuando la fuente permita identidad individual suficiente, cada venta se compara mediante:

```text
FUENTE EXTERNA
↔ VENTA PULSO
↔ LÍNEAS
↔ EVENTO PULSO
↔ EFECTO NEXO APLICABLE
↔ EFECTO NUMERA APLICABLE
↔ EFECTO PASS APLICABLE
↔ COMPENSACIONES APLICABLES
```

La comparación conserva:

- identidad y revisión;
- estado;
- fecha y tiempos;
- sede y contexto;
- importes y moneda cuando existen;
- líneas y producto cuando existen;
- cantidades y UOM cuando aplican;
- cliente o cuenta solo cuando existen de forma autorizada;
- evento;
- receipts;
- resultado de cada consumidora.

No se completa un dato faltante con una inferencia de otra aplicación.

---

#### 9. Determinación de efectos esperados

La conciliación no exige ciegamente tres efectos por cada venta.

Para cada evento se resuelve:

```text
¿NEXO ES APLICABLE?
¿NUMERA ES APLICABLE?
¿PASS ES APLICABLE?
```

La respuesta se deriva del contrato aprobado de cada consumidora.

##### 9.1. NEXO

El efecto se espera cuando la venta o línea tiene disposición física que exige salida de inventario.

No se espera movimiento cuando una disposición aprobada demuestra que no existe efecto de inventario.

##### 9.2. NUMERA

El efecto se espera cuando el evento satisface la puerta de materialidad del hecho económico de venta.

No se crea un hecho económico desde un hito que no demuestre materialidad suficiente.

##### 9.3. PASS

El efecto se espera únicamente cuando existe identidad de fidelización resoluble y una regla aplicable.

Una venta anónima o no elegible puede producir cero acumulación legítimamente.

---

#### 10. Resultado de una unidad

Se reutilizan las clasificaciones transversales ya aprobadas.

La evidencia positiva admisible incluye:

- `EFFECT_CONFIRMED`;
- `PRIOR_RESULT_REPLAYED`, cuando representa recuperación del resultado confirmado original.

Permanecen abiertos:

- `ACCEPTED_PENDING`;
- `CONFLICT`;
- `RESULT_UNKNOWN`;
- `PARTIALLY_APPLIED`;
- `RECONCILIATION_REQUIRED`.

Reglas:

1. `REJECTED_TERMINAL` solo puede tratarse como ausencia segura si el contrato demuestra que la unidad no produjo efecto;
2. un timeout no es resultado negativo;
3. un ACK no es resultado empresarial;
4. una fila técnica no es receipt suficiente por sí sola;
5. la conciliación debe preferir evidencia propietaria del efecto.

---

#### 11. Diferencias de fuente y venta

La conciliación detecta, cuando la evidencia disponible lo permite:

- registro de fuente sin venta PULSO correlacionable;
- venta PULSO atribuida a la fuente sin registro de fuente demostrable;
- misma venta externa materializada más de una vez;
- dos fuentes intentando originar la misma venta;
- revisión externa posterior no incorporada;
- estado comercial incompatible;
- sede divergente;
- terminal o caja divergentes cuando están disponibles;
- fecha empresarial divergente;
- importes divergentes;
- moneda divergente;
- líneas faltantes o sobrantes;
- línea externa sin mapping;
- mapping incompatible con la evidencia;
- línea `ACTIVE` usada como si estuviera resuelta;
- línea `RELEASED` con integración pendiente.

Una coincidencia de importe global no neutraliza estas diferencias.

---

#### 12. Diferencias de evento PULSO

Se detecta:

- venta elegible sin evento;
- evento sin venta correlacionada;
- evento asociado a proceso o hecho incorrecto;
- emisión duplicada incompatible;
- mismo `event_id` con contenido incompatible;
- revisión vieja intentando sobrescribir una posterior;
- evento tardío que intenta repetir un efecto ya confirmado;
- evento con audiencia o elegibilidad incompatible con el contrato vigente;
- venta cerrada con publicación o entrega pendiente que todavía afecta integraciones.

Un evento publicado pero sin resultado consumidor permanece abierto.

---

#### 13. Conciliación NEXO

Se conserva completa la cobertura definida en `INT-POS-016`.

`INT-POS-020` debe poder detectar:

- evento de venta elegible sin efecto NEXO;
- efecto NEXO sin evento de venta correlacionado;
- dos efectos incompatibles para la misma identidad;
- línea `ACTIVE` con movimiento físico;
- línea `RELEASED` con efecto todavía pendiente;
- disposición sin inventario usada sin fundamento;
- producto del posting distinto del mapping aplicable;
- cantidad o UOM divergentes;
- efecto parcial con remanente oculto;
- receipt sin group o legs;
- group o legs sin receipt;
- proyección divergente del ledger;
- respuesta desconocida;
- compensación sin original;
- original que requería compensación y no la tiene.

Además:

1. una proyección de stock no sustituye el ledger;
2. reparar proyección no crea un segundo movimiento;
3. el conciliador no inserta `inventory_movements`;
4. una diferencia física se transfiere a la frontera propietaria NEXO;
5. un agregado diario de unidades no prueba que cada línea produjo exactamente un efecto.

---

#### 14. Conciliación NUMERA

Se conserva completa la cobertura definida en `INT-POS-017`.

`INT-POS-020` debe poder detectar:

- evento económicamente elegible sin `SALE_ECONOMIC_FACT`;
- `SALE_ECONOMIC_FACT` sin evento PULSO correlacionado;
- dos hechos económicos incompatibles para la misma clave;
- monto divergente;
- moneda divergente;
- entidad legal divergente;
- sede o centro de costo divergentes;
- impuesto divergente;
- documento fiscal faltante, duplicado o incompatible;
- venta aplicada sin líneas de soporte cuando el contrato las requiere;
- línea en cuarentena omitida del expediente;
- atribución de producto o costo fabricada desde línea `ACTIVE`;
- pago sin aplicación;
- aplicación sin pago;
- venta sin pago cuando el estado comercial exige investigarlo;
- pago sin venta;
- caja o depósito sin correlación;
- ingreso realizado sin costo trazable cuando se calcule rentabilidad;
- hecho tardío contra periodo cerrado;
- reverso sin original;
- original que requiere compensación y no la tiene;
- resultado desconocido agotado.

La ausencia de costo trazable puede dejar rentabilidad incompleta sin invalidar automáticamente la existencia del ingreso realizado.

---

#### 15. Conciliación PASS

Se conserva completa la cobertura definida en `INT-POS-018`.

`INT-POS-020` debe poder detectar:

- venta elegible sin acumulación;
- puntos sin venta;
- misma venta acreditada dos veces;
- mismo evento aplicado dos veces;
- acumulación en cuenta incorrecta;
- cliente ambiguo resuelto incorrectamente;
- regla o versión incorrecta;
- base elegible divergente;
- puntos calculados divergentes;
- línea `ACTIVE` usada por una regla dependiente de producto;
- línea liberada con efecto todavía pendiente;
- no-op usado para ocultar un bloqueo;
- redención inferida desde descuento;
- saldo divergente del ledger;
- movimiento sin reflejo en saldo;
- saldo sin movimientos suficientes;
- reverso sin original;
- original que requiere reverso y no lo tiene;
- respuesta desconocida;
- evento tardío que intentó otra acumulación.

La proyección de saldo no sustituye el ledger de fidelización.

---

#### 16. Conciliación de compensaciones

La cobertura de `INT-POS-019` se incorpora al control diario.

Se detecta:

- efecto original confirmado que requería compensación y continúa sin plan o paso aplicable;
- paso compensatorio sin efecto original;
- compensación duplicada;
- compensación superior al residual original;
- refund confirmado sin correlación suficiente;
- devolución física sin original físico;
- reversión PASS sin acumulación original;
- efecto NUMERA compensatorio sin hecho económico original;
- plan marcado completo con pasos obligatorios pendientes;
- `PARTIALLY_APPLIED` sin residual explícito;
- residual sin propietaria;
- resultado desconocido tratado como no aplicado;
- compensación repetida por replay;
- compensación correcta de un dominio con otro dominio todavía pendiente.

Una compensación correcta no borra la diferencia histórica que la originó; la resuelve mediante evidencia enlazada.

---

#### 17. Partialidad

Cada unidad conserva por separado:

- esperado;
- confirmado;
- no aplicable;
- pendiente;
- desconocido;
- compensado;
- residual.

Reglas:

1. una venta de múltiples líneas no cierra todas sus líneas porque una quedó confirmada;
2. un consumidor confirmado no cierra consumidores pendientes;
3. una compensación parcial no cierra el residual;
4. un agregado no es prueba de distribución;
5. no se redondean o ajustan diferencias para forzar igualdad;
6. el residual queda explícito hasta resolución o aceptación autorizada.

---

#### 18. Mapping y cuarentena

La conciliación consume `INT-POS-011` e `INT-POS-012`.

Debe distinguir:

```text
LÍNEA SIN MAPPING
LÍNEA CON MAPPING
LÍNEA ACTIVE EN CUARENTENA
LÍNEA RELEASED
```

Reglas:

1. `ACTIVE` impide usar la línea en efectos que dependan del mapping no resuelto;
2. `RELEASED` no significa que los efectos pendientes ya ocurrieron;
3. liberar una línea obliga a volver a evaluar efectos pendientes sin duplicar los ya confirmados;
4. una corrección del mapping no reescribe efectos históricos;
5. la conciliación conserva mapping/versiones usados por los efectos observados;
6. un producto agregado parecido no autoriza equivalencia individual.

---

#### 19. Retry, replay y resultado desconocido

La conciliación reutiliza `INT-APP-004`, `INT-APP-005`, `INT-APP-008` e `INT-APP-009`.

##### 19.1. Retry seguro

Solo procede cuando se demuestra que:

- la operación original no produjo el efecto; o
- el contrato permite repetir la misma identidad y recuperar el resultado sin duplicar.

##### 19.2. Resultado desconocido

Debe consultarse:

- propietaria;
- receipt;
- intención;
- `event_id`;
- identificador externo autorizado;

según el contrato correspondiente.

No se vuelve a enviar por intuición.

##### 19.3. Replay

Conserva:

- `event_id`;
- audiencia histórica;
- procedencia;
- identidad;
- presupuesto por elemento.

No incorpora consumidoras nuevas ni reactiva efectos sensibles por inferencia.

---

#### 20. Gestión de diferencias

La conciliación no corrige directamente.

Cada diferencia sigue una de estas rutas ya aprobadas:

| Situación demostrada                          | Tratamiento                                            |
| --------------------------------------------- | ------------------------------------------------------ |
| efecto confirmado                             | conservar resultado                                    |
| mismo resultado reentregado                   | recuperar resultado previo                             |
| efecto demostrado como ausente y retry seguro | reenviar misma operación por su frontera propietaria   |
| resultado desconocido                         | consultar y conciliar antes de repetir                 |
| conflicto de identidad o contenido            | intervención / corrección autorizada                   |
| efecto confirmado incorrecto                  | compensación o corrección propietaria                  |
| mapping insuficiente                          | cuarentena / resolución de mapping                     |
| evidencia externa insuficiente                | mantener pendiente hasta obtener evidencia             |
| consumidor pendiente                          | continuar únicamente ese consumidor                    |
| residual aceptable                            | conservar propietario, autoridad y condición de cierre |

No existe tratamiento “editar hasta que cuadre”.

---

#### 21. Propiedad de resolución

| Diferencia                                                | Propietaria principal                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| identidad o estado de la venta                            | `PULSO`                                                             |
| recepción o mapping de fuente externa                     | adaptador/PULSO bajo los contratos `INT-POS` aplicables             |
| salida, retorno o saldo físico                            | `NEXO`                                                              |
| hecho económico, periodo, aplicación o residual económico | `NUMERA`                                                            |
| acumulación, reversión, ledger o saldo de puntos          | `PASS`                                                              |
| pago o refund                                             | proceso propietario de pago en `PULSO` y proveedor aplicable        |
| documento fiscal                                          | proveedor o autoridad fiscal autorizada                             |
| compensación transversal                                  | cada propietaria ejecuta su paso bajo coordinación de `INT-POS-019` |

La conciliación registra el destino; no toma la autoridad de la propietaria.

---

#### 22. Cierre de una revisión diaria

Una revisión puede considerarse cerrada únicamente cuando:

1. su alcance de fuente queda declarado;
2. la cobertura recibida es explicable;
3. cada unidad identificable tiene correlación o diferencia explícita;
4. cada efecto esperado está confirmado, demostrado no aplicable o conserva un pendiente explícito;
5. todo resultado desconocido permanece reconocido como tal o fue resuelto;
6. todas las diferencias tienen propietaria;
7. todos los residuales tienen condición de salida;
8. los resultados parciales no se presentan como completos;
9. el cierre conserva evidencia de qué se comparó;
10. una revisión posterior puede explicar cualquier cambio.

Cerrar la revisión no significa eliminar todos los pendientes; significa que los pendientes están identificados y gobernados.

---

#### 23. Reapertura y revisión posterior

Una fecha ya revisada puede requerir nueva revisión por:

- evento tardío;
- retry confirmado después del corte;
- resolución de mapping;
- liberación de cuarentena;
- respuesta externa tardía;
- compensación;
- corrección;
- replay autorizado;
- descubrimiento de duplicidad;
- nueva evidencia.

La nueva revisión:

1. conserva la revisión anterior;
2. explica qué cambió;
3. no vuelve a aplicar efectos confirmados;
4. no borra diferencias históricas;
5. recalcula únicamente la representación de conciliación desde las fuentes vigentes y su historia.

---

#### 24. Controles agregados

Los agregados permitidos como control incluyen, cuando la fuente realmente los expone:

- número de registros o filas;
- cantidad;
- subtotal;
- impuestos;
- descuentos;
- devoluciones;
- venta neta;
- resultados por sede, fecha o producto.

Reglas:

1. se usan para detectar cobertura incompleta o diferencia global;
2. no crean identidad de venta;
3. no prueban pago individual;
4. no prueban evento individual;
5. no prueban movimiento NEXO individual;
6. no prueban hecho NUMERA individual;
7. no prueban puntos PASS individuales;
8. no se distribuyen diferencias automáticamente.

---

#### 25. Implementación física observada — PULSO / Makos

La implementación vigente observada en PULSO mantiene `makos_excel` como importación diaria agregada.

El parser actual conserva por fila:

- identificador y nombre externo de producto;
- categoría;
- cantidad;
- subtotal;
- impuestos;
- descuentos;
- devoluciones.

El lote conserva totales, hash de archivo, sede, fecha y conteos de mapping.

La pantalla actual consulta lotes recientes, mappings y filas pendientes de regla de consumo.

Esto demuestra una base útil para:

- cobertura de importación;
- control de hash;
- mapping agregado;
- totales diarios;
- pendientes de consumo.

No demuestra todavía:

- venta individual completa;
- línea individual de una venta;
- pago individual;
- `event_id` PULSO por venta;
- receipt consumidor por venta;
- efecto económico por venta;
- acumulación PASS por venta;
- compensación individual.

Por tanto, el estado físico actual no permite declarar implementada la conciliación canónica objetivo.

---

#### 26. Implementación física observada — posting legacy de inventario

La migración vigente de PULSO:

- define `sale_out`;
- mantiene reglas de consumo;
- crea `pulso_sales_inventory_postings`;
- detecta `missing_catalog_item` y `missing_consumption_rule`;
- publica filas validadas;
- inserta movimientos de inventario;
- actualiza proyecciones de stock;
- enlaza posting con fila, producto, ubicación y movimiento.

Esta evidencia sirve al diagnóstico de transición, pero no sustituye el contrato objetivo porque el flujo actual:

- parte de filas agregadas;
- no demuestra `event_id` individual de venta;
- no demuestra la frontera `CONSUMER_INBOX`;
- no demuestra la clave `CONSUMER_EFFECT`;
- no demuestra un receipt canónico completo por efecto de venta;
- realiza writes físicos legacy que deberán converger posteriormente con la frontera NEXO aprobada.

`INT-POS-020` no modifica ese flujo.

---

#### 27. Implementación física observada — NUMERA

La fundación NUMERA vigente declara expresamente que es una capa económico-operativa y no contabilidad formal.

Actualmente materializa principalmente:

- periodos;
- categorías de gasto;
- gastos;
- presupuestos;
- ingreso esperado;
- resumen mensual de centros de costo.

La fundación observada no demuestra un ledger de `SALE_ECONOMIC_FACT` de ventas PULSO.

Por tanto, la conciliación diaria puede definir la expectativa NUMERA, pero no puede declarar hoy confirmados efectos económicos individuales que la implementación no evidencia.

---

#### 28. Implementación física observada — PASS

La implementación PASS observada posee lectura de `loyalty_transactions` y una experiencia de historial.

La lectura actual:

- consulta por usuario;
- ordena por `created_at`;
- limita la vista a las últimas cien transacciones;
- modela `earn`, `spend` y `adjust`.

Esa vista de cliente no constituye por sí misma evidencia de conciliación completa porque:

- el límite de cien filas puede omitir historia;
- la UI no sustituye el ledger completo;
- una fila visible no demuestra la correlación canónica venta/evento/regla/efecto requerida por `INT-POS-018`.

La conciliación deberá usar la fuente propietaria completa y receipts, no una ventana de interfaz.

---

#### 29. Evidencia insuficiente de fuente

Cuando Makos no permita resolver una venta o línea individual:

```text
NO SE FABRICA IDENTIDAD
NO SE REPARTE EL AGREGADO
NO SE DECLARA PARIDAD INDIVIDUAL
```

La revisión conserva:

- el control agregado demostrable;
- el alcance no demostrable;
- la brecha de binding;
- la dependencia de `INT-POS-021`.

Esta limitación no autoriza a saltar directamente al piloto con efectos.

---

#### 30. Relación con `INT-POS-021`

`INT-POS-021` deberá demostrar sin efectos internos, sobre evidencia real:

- identidad recuperable de venta;
- identidad de línea;
- cobertura y paginación o mecanismo equivalente de la fuente;
- timestamps y fecha empresarial;
- estado;
- revisión;
- sede;
- terminal o caja cuando existan;
- importes y moneda cuando existan;
- anulaciones/devoluciones;
- correlación de registros;
- ausencia de duplicados;
- capacidad de repetir la consulta sin crear efectos.

Su resultado determinará qué comparaciones individuales de `INT-POS-020` pueden materializarse con Makos.

---

#### 31. Relación con `INT-POS-022`

El piloto controlado con efectos deberá ejecutar materialmente el contrato de conciliación aquí definido y demostrar:

1. venta sin efecto detectada;
2. efecto sin venta detectado;
3. duplicado detectado;
4. resultado desconocido no repetido ciegamente;
5. consumidor fallido reintentado sin repetir los confirmados;
6. línea en cuarentena gobernada;
7. línea liberada reactivada sin duplicación;
8. NEXO reconciliado por receipt;
9. NUMERA reconciliado por receipt;
10. PASS reconciliado por ledger y receipt;
11. compensación y residual visibles;
12. cierre diario con pendientes explícitos;
13. nueva revisión por llegada tardía sin borrar la anterior;
14. cero escrituras cruzadas desde la conciliación.

---

#### 32. Transición futura y convivencia

Durante la transición:

```text
MAKOS
→ ADAPTADOR
→ PULSO
→ EVENTO
→ CONSUMIDORAS
→ CONCILIACIÓN DIARIA
```

Después del corte:

```text
PULSO
→ EVENTO
→ MISMAS CONSUMIDORAS
→ MISMA SEMÁNTICA DE CONCILIACIÓN
```

`INT-SALES-008` será la propietaria permanente de la conciliación de convivencia entre POS externo y PULSO.

`INT-SALES-009` y `INT-SALES-010` gobernarán el corte y la prohibición de doble fuente.

La conciliación diaria debe ser capaz de detectar una venta originada por dos fuentes, pero no adelanta la configuración de corte.

---

#### 33. Carryover obligatorio

| Pendiente material                                       | Tarea propietaria | Condición de salida                                                               |
| -------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| demostrar binding y cobertura real de Makos              | `INT-POS-021`     | una muestra y el mecanismo de lectura permiten correlación repetible sin efectos  |
| demostrar la conciliación con efectos reales controlados | `INT-POS-022`     | se prueban faltantes, duplicados, partialidad, resultado desconocido y residuales |
| definir corte efectivo de la fuente externa              | `INT-POS-023`     | una sola fuente puede originar ventas nuevas por sede, terminal y vigencia        |
| reducir o revocar credenciales externas                  | `INT-POS-024`     | el acceso restante corresponde al rol transitorio autorizado                      |
| salida física permanente de venta                        | `INT-SALES-003`   | NEXO produce y expone efecto/receipt reconciliable                                |
| recepción económica permanente                           | `INT-SALES-004`   | NUMERA produce y expone hecho/receipt reconciliable                               |
| acumulación permanente de puntos                         | `INT-SALES-005`   | PASS produce ledger/receipt reconciliable                                         |
| redención permanente                                     | `INT-SALES-006`   | redención conserva identidad y resultado separado                                 |
| control permanente contra efectos duplicados             | `INT-SALES-007`   | retries y replay convergen en resultados previos                                  |
| conciliación permanente de convivencia                   | `INT-SALES-008`   | fuente externa y PULSO se comparan sin doble emisión                              |
| corte permanente por sede, terminal y fecha              | `INT-SALES-009`   | autoridad de fuente queda determinista                                            |
| impedimento de doble fuente                              | `INT-SALES-010`   | la misma venta no puede ser emitida por ambas fuentes                             |

Ningún pendiente material queda sin propietaria y condición de salida.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea materializa para la transición POS externo → PULSO el control de conciliación que ya está protegido por requisitos vigentes de idempotencia, fuente única, inventario, venta y efectos, fidelización, NUMERA, fallos parciales, retry, replay, resultado desconocido, compensación y conciliación. Las listas de diferencias de NEXO, NUMERA y PASS ya fueron creadas por `INT-POS-016`, `INT-POS-017` e `INT-POS-018` bajo esa cobertura. `INT-POS-020` las reúne en un control diario coherente sin introducir una nueva obligación verificable independiente.

---

#### 35. Cobertura de prueba existente preservada

Se preserva sin modificación, en especial:

- `TREQ-INTEGRATION-003`, para identidad, huella, resultado recuperable y conciliación;
- `TREQ-INTEGRATION-006`, para fuente propietaria única y resolución de diferencias sin sobrescribir historia;
- `TREQ-INTEGRATION-011`, para efectos NEXO exactamente una vez y diferencias de evento, cantidad y estado;
- `TREQ-INTEGRATION-014`, para venta/anulación/devolución y efectos NEXO/PASS/NUMERA exactamente una vez;
- `TREQ-INTEGRATION-015`, para compensaciones y fidelización reconciliables;
- `TREQ-INTEGRATION-017`, para efectos NUMERA, reversos, periodos y diferencias económicas;
- `TREQ-INTEGRATION-023`, para recuperación y conciliación bajo degradación;
- `TREQ-INTEGRATION-151`, para retry crítico con conciliación al agotarse;
- `TREQ-INTEGRATION-154`, para eventos fuera de orden;
- `TREQ-INTEGRATION-155`, para replay y backfill;
- `TREQ-INTEGRATION-156`, para claim y lease sin inferir ausencia del efecto;
- `TREQ-INTEGRATION-159`, para independencia entre consumidoras;
- `TREQ-INTEGRATION-160`, para destinos explícitos después del agotamiento;
- `TREQ-INTEGRATION-161`, para prohibir compensación automática al agotar retry;
- `TREQ-PULSO-001`, para ciclo E2E de venta, efectos, reversión y cierre;
- `TREQ-PULSO-005`, para estados independientes y conservación de efectos emitidos;
- `TREQ-PULSO-006`, para conciliación de venta, pago, caja, fiscalidad, reversos y pendientes;
- `TREQ-NEXO-011`, para ledger y proyecciones reconciliables;
- `TREQ-NEXO-186`, para reversas y compensaciones append-only;
- `TREQ-NEXO-200`, para frontera antes/después del posting;
- `TREQ-NEXO-228`, para saldo compensable y reversa sin destrucción;
- `TREQ-NUMERA-001`, para reconciliación con hechos fuente;
- `TREQ-NUMERA-002`, para identidad, correlación y correcciones no destructivas;
- `TREQ-PASS-008`, para ledger atómico e idempotente;
- `TREQ-PASS-010`, para ledger reconciliable y saldo derivado;
- `TREQ-PASS-011`, para resultados de devolución y compensación separados.

Ninguna fila cambia de identidad, texto, estado, relación, propietaria, evidencia o secuencia.

---

#### 36. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-019` como tarea anterior;
2. mantiene `INT-POS-021` como única tarea siguiente;
3. define una conciliación diaria sin inventar una hora técnica;
4. distingue la conciliación de recepción de `INT-POS-014`;
5. distingue la conciliación de caja `VPROC-0044`;
6. compara fuente, venta, línea, evento, efectos y compensaciones;
7. define la venta individual como unidad objetivo cuando la fuente la permite;
8. conserva agregados solo como controles;
9. impide cerrar por igualdad de totales;
10. impide repartir diferencias agregadas por inferencia;
11. determina efectos esperados por elegibilidad;
12. permite cero efecto PASS legítimo;
13. permite cero efecto NEXO cuando la disposición lo determina;
14. exige materialidad NUMERA;
15. distingue publicación, entrega y efecto;
16. acepta únicamente evidencia propietaria suficiente;
17. conserva abiertos `RESULT_UNKNOWN`, `CONFLICT`, `PARTIALLY_APPLIED` y `RECONCILIATION_REQUIRED`;
18. impide repetir ciegamente un resultado desconocido;
19. conserva independencia entre consumidoras;
20. conserva independencia de retry;
21. impide compensación automática al agotar retry;
22. asigna cada diferencia a una propietaria;
23. prohíbe escrituras cruzadas desde la conciliación;
24. conserva revisiones históricas del mismo día;
25. atribuye eventos tardíos al hecho real;
26. cubre diferencias de fuente y venta;
27. cubre diferencias de evento;
28. incorpora completa la lista NEXO de `INT-POS-016`;
29. incorpora completa la lista NUMERA de `INT-POS-017`;
30. incorpora completa la lista PASS de `INT-POS-018`;
31. incorpora compensaciones de `INT-POS-019`;
32. conserva partialidad y residuales;
33. gobierna líneas `ACTIVE` y `RELEASED`;
34. mantiene mapping y versión observables;
35. conserva retry con misma identidad;
36. conserva replay sin nueva audiencia;
37. no convierte ACK en efecto confirmado;
38. no convierte una falla técnica en ausencia demostrada;
39. define condiciones de cierre de revisión;
40. permite revisión posterior por evidencia tardía;
41. diagnostica `makos_excel` como fuente agregada actual;
42. diagnostica el posting legacy como evidencia insuficiente del contrato NEXO objetivo;
43. diagnostica la fundación NUMERA actual como insuficiente para hechos de venta individuales;
44. diagnostica la vista PASS limitada como insuficiente para conciliación completa;
45. asigna binding real a `INT-POS-021`;
46. asigna piloto con efectos a `INT-POS-022`;
47. asigna corte a `INT-POS-023`;
48. asigna retiro de acceso a `INT-POS-024`;
49. mantiene `INT-SALES-007` a `INT-SALES-010` como continuidad permanente aplicable;
50. crea cero definiciones normales de evento;
51. genera cero cambios `TREQ-*`;
52. no genera una copia del registro canónico de requisitos;
53. no modifica código, SQL, migraciones, datos, Supabase, credenciales ni configuración remota.

---

#### 37. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-019 — Definir compensación de anulaciones y devoluciones sin borrar historia`

TAREA ACTUAL APROBADA

`INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`

SIGUIENTE TAREA RESERVADA

`INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`


### ✅ INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas

**Estado:** APROBADA
**Tarea anterior:** `INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`
**Tarea siguiente:** `INT-POS-022 — Diseñar piloto controlado con efectos habilitados`
**Tipo de tarea:** documental; diseño materializado del piloto de transición Makos → PULSO en modo controlado de lectura, staging y sombra, destinado a demostrar cobertura, binding, normalización, mapping, cuarentena, idempotencia y conciliación antes de habilitar efectos empresariales, sin publicar eventos a consumidoras ni producir movimientos de inventario, hechos económicos, puntos, pagos, caja, fiscalidad, compensaciones o cambios de autoridad de fuente
**Fase:** exclusivamente documental
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`
**POS externo vigente:** `Makos`
**Aplicación propietaria de la venta objetivo:** `PULSO`
**Fronteras consumidoras mantenidas inactivas durante el piloto:** `NEXO`, `NUMERA`, `PASS`
**Línea base documental:** `vento-shell@9ddaaca54f791deaef1dcd6d0b55e5a6dc380104`
**Línea base técnica observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`
**Cambios físicos autorizados:** ninguno
**Estado del gate de evidencia real:** `BLOQUEADO`
**Bloqueo verificado:** el proyecto remoto `vento-os-dev` contiene las tablas de staging de importación de ventas, pero `pulso_daily_sales_import_batches` no contiene lotes; no existe en el estado remoto observado una muestra Makos disponible para demostrar binding repetible sin efectos

---

#### 1. Propósito

Diseñar el piloto obligatorio que precede a cualquier activación real de efectos de la transición desde Makos hacia PULSO.

El piloto debe demostrar, con evidencia real de la fuente y sin modificar hechos empresariales, si Vento puede recorrer de forma repetible la cadena:

```text
MAKOS
→ LECTURA AUTORIZADA / EVIDENCIA ORIGINAL
→ STAGING
→ NORMALIZACIÓN
→ IDENTIDAD PROPUESTA DE VENTA Y LÍNEA
→ MAPPING / CUARENTENA
→ EVENTO PULSO PROPUESTO
→ EFECTOS ESPERADOS EN SOMBRA
→ CONCILIACIÓN
```

Durante este piloto la cadena termina antes de cualquier publicación o aplicación real de efectos.

---

#### 2. Resultado sustantivo

`INT-POS-021` deja definido un piloto con las siguientes decisiones obligatorias:

1. Makos permanece como fuente temporal del hecho de venta durante el alcance aprobado de transición.
2. La adquisición inicial utiliza únicamente acceso de lectura efectiva o una exportación real autorizada que preserve la evidencia fuente.
3. El piloto no altera Makos.
4. El piloto puede preservar evidencia y staging de prueba en un ambiente controlado cuando la implementación correspondiente lo autorice, pero no puede convertir ese staging en hechos empresariales definitivos.
5. No se publica ningún evento empresarial hacia consumidoras.
6. NEXO recibe cero movimientos de inventario originados por el piloto.
7. NUMERA recibe cero hechos económicos originados por el piloto.
8. PASS recibe cero acumulaciones, redenciones, reversos o ajustes originados por el piloto.
9. PULSO no inicia cobros, pagos, caja, cierres, documentos fiscales, reembolsos ni compensaciones desde el piloto.
10. La autoridad de fuente, el corte y las credenciales no cambian por ejecutar el piloto.
11. El piloto calcula únicamente representaciones y efectos esperados en sombra.
12. Una representación en sombra nunca se presenta como efecto aplicado.
13. La evidencia original y su hash permanecen correlacionables con toda normalización posterior.
14. La repetición deliberada del mismo insumo debe producir el mismo resultado lógico sin crear identidades nuevas.
15. Un solapamiento de ventana no puede duplicar candidatos.
16. Una revisión posterior no puede ser sobrescrita por una versión anterior.
17. La ausencia de información se registra como ausencia; no se completa con inferencias.
18. Una fila agregada de producto no se convierte en venta individual por suposición.
19. Un total diario coincidente no demuestra binding individual.
20. Un mapping no resuelto produce cuarentena y no un producto inventado.
21. Una línea en cuarentena no habilita efectos dependientes de producto.
22. Una venta anónima no recibe una identidad PASS fabricada.
23. Un efecto NEXO esperado se representa solamente como preview.
24. Un `SALE_ECONOMIC_FACT` esperado se representa solamente como preview.
25. Una acumulación PASS esperada se representa solamente como preview.
26. Anulación, devolución y reembolso se preservan como hechos separados cuando la fuente los demuestre.
27. Una compensación potencial se identifica sin ejecutarla.
28. Toda diferencia se envía a la conciliación definida en `INT-POS-020`.
29. El piloto falla cerrado cuando no puede demostrar la granularidad o identidad requerida.
30. el diseño de `INT-POS-022` no puede considerar habilitable un alcance mientras exista un bloqueo crítico de binding, completitud, idempotencia o no-efecto.
31. Se crean cero requisitos `TREQ-*`.
32. Se modifican cero requisitos `TREQ-*`.
33. Se crean cero objetos físicos.
34. Se modifican cero objetos físicos.

---

#### 3. Modo canónico del piloto

El modo del piloto se describe documentalmente como:

```text
LECTURA AUTORIZADA
+
STAGING CONTROLADO
+
SHADOW / PREVIEW
+
NO DISPATCH
+
NO BUSINESS EFFECT
```

Estos términos describen comportamiento y no crean enums, tablas, flags o contratos físicos.

El piloto queda prohibido de:

- escribir en Makos;
- publicar eventos hacia consumidoras reales;
- llamar fronteras que apliquen inventario;
- llamar fronteras que apliquen hechos económicos;
- llamar fronteras que apliquen fidelización;
- iniciar o alterar pagos;
- alterar caja;
- generar o alterar documentos fiscales;
- ejecutar compensaciones;
- activar un corte de fuente;
- revocar o ampliar credenciales;
- modificar mappings de producción para hacer pasar una muestra;
- crear datos operativos ficticios presentados como evidencia real.

---

#### 4. Fuentes y dependencias consumidas

El piloto consume sin reabrir:

- `INT-POS-002`, para información realmente confirmada de la interfaz externa;
- `INT-POS-003`, para autoridad temporal de Makos;
- `INT-POS-004`, para credencial independiente, revocable y de lectura efectiva;
- `INT-POS-005`, para identidad de venta y línea;
- `INT-POS-006`, para encabezados, líneas, estados, revisiones y tiempos;
- `INT-POS-007`, para descuentos, impuestos, propinas y medios de pago;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos;
- `INT-POS-009`, para payload original, versión, hash y recepción;
- `INT-POS-010`, para sede, terminal y caja;
- `INT-POS-011`, para mapping de producto;
- `INT-POS-012`, para cuarentena;
- `INT-POS-013`, para idempotencia de recepción;
- `INT-POS-014`, para adquisición por webhook o polling cuando exista soporte real;
- `INT-POS-015`, para evento empresarial que solo se proyectará en sombra;
- `INT-POS-016`, para efecto NEXO que solo se proyectará en sombra;
- `INT-POS-017`, para efecto NUMERA que solo se proyectará en sombra;
- `INT-POS-018`, para efecto PASS que solo se proyectará en sombra;
- `INT-POS-019`, para compensaciones que solo se proyectarán en sombra;
- `INT-POS-020`, para conciliación y clasificación de diferencias;
- `INT-APP-004` a `INT-APP-010`, para idempotencia, retry, compensación, auditoría, pendientes, fallos parciales y prohibición de escrituras cruzadas.

Ninguna de estas decisiones se modifica.

---

#### 5. Frontera de lectura de Makos

La credencial de integración conserva el `scope_ceiling` de lectura efectiva definido en `INT-POS-004`.

Durante el piloto:

1. solo pueden consultarse objetos, campos, ventanas y endpoints realmente acreditados por el proveedor;
2. si el mecanismo disponible es una exportación autorizada, se conserva el archivo original como evidencia de fuente;
3. no se inventan endpoints para obtener mayor granularidad;
4. no se usa una cuenta humana compartida como credencial técnica por conveniencia;
5. no se elevan permisos para completar el piloto;
6. el piloto registra cualquier límite real de paginación, orden, volumen o rate limit que afecte completitud;
7. una ventana repetida debe ser segura por identidad y huella, no porque se asuma que la fuente nunca cambia.

Si el acceso real no permite demostrar una dimensión obligatoria, la dimensión queda `PENDIENTE_DE_EVIDENCIA` o `BLOQUEADO`, según su impacto.

---

#### 6. Selección de la muestra real

La ejecución posterior del diseño debe utilizar una muestra real autorizada de Makos.

La muestra debe declararse por:

- ambiente real consultado;
- sede o alcance de sede;
- fecha o ventana temporal;
- mecanismo de lectura;
- versión o formato de la fuente cuando exista;
- evidencia original;
- hash de la evidencia;
- paginación o cobertura aplicada;
- cantidad observada de registros fuente;
- criterio de inclusión y exclusión.

No se fija en esta tarea un número arbitrario de ventas, días o sedes.

La suficiencia de la muestra depende de poder demostrar los comportamientos requeridos, no de alcanzar un conteo decorativo.

---

#### 7. Separación entre evidencia real y casos simulados

El piloto distingue estrictamente:

```text
EVIDENCIA REAL DE MAKOS
≠
CASO SIMULADO PARA PROBAR UN ERROR
```

La evidencia real se utiliza para demostrar binding, granularidad, completitud y repetibilidad.

Los casos simulados pueden utilizarse posteriormente para comprobar ramas de error que no aparezcan naturalmente en la muestra, pero deben quedar identificados como simulados y nunca mezclarse con resultados reales de Makos.

No se fabrican ventas reales, clientes, pagos, cantidades, puntos, documentos o identificadores externos.

---

#### 8. Evidencia mínima por lectura

Cada lectura real debe poder conservar, cuando la fuente lo exponga:

- `source_system`;
- identidad externa estable;
- identidad de revisión o versión;
- timestamp del hecho;
- timestamp de recepción;
- sede;
- terminal;
- caja;
- encabezado de venta;
- líneas;
- producto externo;
- cantidad;
- UOM cuando exista;
- moneda;
- subtotal;
- impuestos;
- descuentos;
- propina;
- pago o referencia de pago;
- estado;
- anulación;
- devolución;
- reembolso;
- payload o documento original;
- hash.

Una dimensión no expuesta se conserva explícitamente como no disponible; no se deriva de nombre, posición, monto, hora o similitud.

---

#### 9. Matriz materializada de binding

Por cada identidad observable de la muestra se deberá producir una decisión con las siguientes dimensiones lógicas:

| Dimensión                | Decisión obligatoria                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| granularidad fuente      | venta individual / línea individual / agregado / no demostrable       |
| identidad externa        | presente / ausente / ambigua                                          |
| revisión                 | presente / ausente / no aplica                                        |
| tiempo                   | acreditado / incompleto / ambiguo                                     |
| sede                     | resuelta / bloqueada / ausente                                        |
| terminal o caja          | resuelta / no expuesta / ambigua                                      |
| montos                   | completos / parciales / no demostrables                               |
| líneas                   | correlacionables / agregadas / ausentes                               |
| producto                 | mapped / quarantined / no aplica                                      |
| venta canónica candidata | determinista / bloqueada                                              |
| línea canónica candidata | determinista / bloqueada                                              |
| evento candidato         | determinista / bloqueado                                              |
| NEXO esperado            | aplica / no aplica / bloqueado                                        |
| NUMERA esperado          | aplica / no aplica / bloqueado                                        |
| PASS esperado            | aplica / no aplica / bloqueado                                        |
| resultado                | `ESPECIFICADO` / `PENDIENTE_DE_EVIDENCIA` / `BLOQUEADO` / `NO_APLICA` |

La ejecución futura debe reportar el total esperado y materializado de decisiones, faltantes, duplicados y bloqueos.

---

#### 10. Regla de granularidad

La granularidad es una puerta crítica.

##### 10.1. Venta individual demostrable

Puede proponerse una identidad canónica cuando la fuente permite demostrar una identidad estable y la evidencia requerida por los contratos anteriores.

##### 10.2. Línea individual demostrable

Puede proponerse una línea canónica solo cuando la fuente permite relacionarla con una venta concreta y conservar su identidad o posición estable conforme al contrato aprobado.

##### 10.3. Agregado por producto o día

Un agregado puede utilizarse para:

- cobertura;
- control de totales;
- mapping de productos;
- diagnóstico de diferencias;
- comparación agregada.

No puede utilizarse para fabricar:

- `sale_id`;
- `sale_line_id`;
- pago individual;
- cliente individual;
- evento individual;
- movimiento individual;
- hecho económico individual;
- acumulación individual de puntos.

##### 10.4. Granularidad insuficiente

Si la fuente disponible no permite pasar de agregado a venta individual, el resultado del binding individual es `BLOQUEADO`.

Este bloqueo impide considerar habilitable el alcance individual en el diseño posterior de `INT-POS-022`.

---

#### 11. Staging y evidencia original

El diseño admite staging únicamente como capa de evidencia y trabajo previo al hecho empresarial.

El staging debe preservar:

- procedencia;
- evidencia original;
- hash;
- recepción;
- versión del parser o normalizador cuando exista;
- identidad externa observada;
- resultado de normalización;
- mapping aplicado;
- estado de cuarentena;
- huella idempotente;
- relación con el resultado en sombra.

El staging no es una venta confirmada, un movimiento de inventario, un hecho económico ni un movimiento de fidelización.

---

#### 12. Normalización

La normalización del piloto debe ser determinista y reproducible.

Reglas:

1. mismo insumo y misma versión de contrato producen la misma representación normalizada;
2. el valor original se conserva;
3. una normalización no cambia el significado empresarial;
4. no se rellena información faltante con defaults que parezcan hechos reales;
5. moneda, cantidades y fechas se interpretan conforme a evidencia acreditada;
6. una diferencia de formato no crea otra venta;
7. un cambio de contrato o parser queda versionado y no reescribe la evidencia original.

---

#### 13. Binding de sede, terminal y caja

El piloto aplica `INT-POS-010`.

Cada registro debe clasificar:

- sede resuelta de forma determinista;
- sede bloqueada;
- terminal resuelta;
- terminal no expuesta;
- caja resuelta;
- caja no expuesta;
- conflicto de contexto.

La sede seleccionada manualmente para cargar una exportación no prueba por sí sola que cada venta del contenido pertenezca a esa sede cuando la fuente no lo demuestra.

Terminal y caja no se inventan a partir del dispositivo que ejecuta el piloto.

---

#### 14. Mapping de producto

El piloto usa el contrato de `INT-POS-011` sin cambiar mappings productivos para hacer coincidir la muestra.

Por línea o agregado de producto se determina:

- mapping directo acreditado;
- mapping por regla canónica vigente;
- conflicto;
- ausencia;
- cuarentena.

No se permite:

- tomar coincidencia por nombre como verdad cuando el contrato exige identidad más fuerte;
- usar precio parecido como mapping;
- escoger el primer producto coincidente;
- ignorar una colisión;
- crear producto nuevo automáticamente.

---

#### 15. Cuarentena

`INT-POS-012` permanece activa durante todo el piloto.

Una línea queda bloqueada cuando exista, entre otros:

- producto sin mapping;
- mapping ambiguo;
- UOM incompatible;
- identidad insuficiente;
- estado incompatible;
- versión desconocida necesaria para interpretar el hecho.

La cuarentena:

1. conserva la evidencia original;
2. no elimina el registro de cobertura;
3. no autoriza efectos dependientes de la línea;
4. permite medir la brecha real;
5. debe quedar con propietaria y condición de salida.

---

#### 16. Idempotencia y repetición deliberada

El piloto debe demostrar conceptualmente el contrato de `INT-POS-013`.

La ejecución futura incluye al menos una repetición deliberada del mismo insumo o ventana.

Resultado esperado:

```text
MISMA IDENTIDAD + MISMA HUELLA
→ MISMO RESULTADO LÓGICO
→ CERO IDENTIDADES NUEVAS
→ CERO EFECTOS

MISMA IDENTIDAD + HUELLA DIFERENTE
→ CONFLICTO O REVISIÓN SEGÚN CONTRATO
→ CERO SOBRESCRITURA SILENCIOSA
→ CERO EFECTOS
```

La repetición no prueba idempotencia si únicamente se compara un total agregado.

---

#### 17. Completitud de lectura

El piloto debe poder responder, con evidencia:

- qué ventana se pidió;
- cuántas páginas, archivos o unidades de lectura fueron necesarias;
- qué orden garantiza la fuente, si alguno;
- qué cursor, watermark o límite real se utilizó, si existe;
- qué registros quedaron fuera y por qué;
- si una lectura repetida produce el mismo conjunto o una revisión explicable;
- si existen eventos tardíos;
- si el proveedor limita la ventana o volumen.

Una respuesta parcial de la fuente no se declara completa por ausencia de error técnico.

---

#### 18. Evento PULSO en sombra

Cuando el binding sea suficiente, el piloto construye la representación del evento que PULSO debería emitir bajo `INT-POS-015`.

La representación debe permitir verificar:

- identidad;
- procedencia;
- revisión;
- timestamps;
- correlación con venta y líneas;
- elegibilidad de consumidoras;
- contenido canónico requerido.

El evento permanece en sombra:

```text
CANDIDATO DE EVENTO
→ VALIDACIÓN
→ CONCILIACIÓN
→ NO PUBLICACIÓN
```

No se crea una entrega real, inbox real, retry real ni efecto real.

---

#### 19. Preview NEXO

Para cada venta o línea cuyo contrato físico sea determinable, el piloto calcula qué efecto NEXO sería esperado.

El preview puede indicar:

- aplica;
- no aplica;
- bloqueado por mapping;
- bloqueado por cantidad/UOM;
- bloqueado por estado;
- bloqueado por evidencia.

Cuando aplica, la representación debe conservar producto, cantidad, UOM, causalidad y correlación necesarias para comparar con `INT-POS-016`.

El preview produce:

```text
0 INSERTS DE MOVIMIENTO
0 CAMBIOS DE STOCK
0 CAMBIOS DE PROYECCIONES
0 POSTING RECEIPTS REALES
```

---

#### 20. Preview NUMERA

El piloto evalúa la puerta de materialidad definida en `INT-POS-017`.

Puede clasificar:

- `SALE_ECONOMIC_FACT` esperado;
- no material todavía;
- bloqueado por venta incompleta;
- bloqueado por monto o moneda;
- bloqueado por entidad, sede o contexto;
- bloqueado por evidencia.

Cuando el hecho sería aplicable, se calcula únicamente su representación esperada.

El preview produce:

```text
0 HECHOS ECONÓMICOS REALES
0 ASIENTOS
0 CARTERA
0 CAJA
0 COSTOS APLICADOS
0 CAMBIOS DE PERIODO
```

---

#### 21. Preview PASS

El piloto evalúa `INT-POS-018` sin escribir fidelización.

Puede clasificar:

- acumulación aplicable;
- no aplica por venta anónima o no elegible;
- bloqueado por identidad;
- bloqueado por cuenta;
- bloqueado por regla;
- bloqueado por línea en cuarentena;
- bloqueado por evidencia.

Cuando aplica, se calcula la expectativa de cuenta, regla, base y puntos sin aplicarla.

El preview produce:

```text
0 LOYALTY TRANSACTIONS
0 CAMBIOS DE SALDO
0 REDENCIONES
0 AJUSTES
0 REVERSOS
```

Una venta anónima legítima no se transforma en error por producir cero puntos.

---

#### 22. Anulaciones, devoluciones y compensaciones en sombra

Cuando la muestra real contenga anulaciones, devoluciones o reembolsos, el piloto debe conservar su relación con el original según `INT-POS-008`.

`INT-POS-019` se utiliza únicamente para proyectar:

- qué efecto original necesitaría compensación;
- qué consumidora sería responsable;
- qué residual quedaría;
- qué evidencia faltaría.

No se ejecuta ninguna compensación.

Si la muestra no contiene estos casos, su ausencia se declara y los casos de prueba adicionales permanecen claramente simulados.

---

#### 23. Conciliación del piloto

Cada ejecución futura de este diseño se evalúa mediante `INT-POS-020`.

La conciliación compara:

```text
FUENTE REAL
↔ STAGING
↔ NORMALIZACIÓN
↔ BINDING
↔ EVENTO EN SOMBRA
↔ NEXO ESPERADO
↔ NUMERA ESPERADO
↔ PASS ESPERADO
```

Como no existen efectos reales, la conciliación debe demostrar adicionalmente:

- cero movimientos NEXO originados por el piloto;
- cero hechos NUMERA originados por el piloto;
- cero movimientos PASS originados por el piloto;
- cero pagos, caja o fiscalidad originados por el piloto;
- cero publicación accidental de eventos;
- cero compensaciones reales.

Una diferencia se conserva con propietaria y condición de salida; no se corrige escribiendo sobre otro dominio.

---

#### 24. Casos obligatorios del piloto

El diseño exige cubrir, con evidencia real cuando el caso exista y con simulación identificada cuando sea necesario probar una rama de error:

| Caso                                       | Resultado esperado                                         |
| ------------------------------------------ | ---------------------------------------------------------- |
| lectura autorizada                         | evidencia original preservada y cero mutación de Makos     |
| repetición del mismo insumo                | mismo resultado lógico y cero duplicados                   |
| ventana solapada                           | mismos hechos deduplicados                                 |
| producto mapped                            | candidato estable                                          |
| producto sin mapping                       | cuarentena, no inferencia                                  |
| identidad de venta suficiente              | candidato canónico determinista                            |
| identidad insuficiente                     | binding bloqueado                                          |
| fila agregada                              | control agregado, no venta inventada                       |
| evento candidato                           | representación válida sin publicación                      |
| NEXO aplicable                             | preview sin movimiento                                     |
| NUMERA aplicable                           | preview sin hecho económico                                |
| PASS aplicable                             | preview sin puntos                                         |
| PASS no aplicable                          | no-op legítimo en sombra                                   |
| anulación o devolución                     | relación original preservada, compensación solo proyectada |
| conflicto de huella                        | conflicto visible, cero sobrescritura                      |
| dato tardío o revisión                     | historia preservada                                        |
| diferencia de conciliación                 | propietaria y condición de salida explícitas               |
| intento de habilitar efecto antes del gate | bloqueo                                                    |

---

#### 25. Gate de no-efecto

Antes de cualquier ejecución futura, deben existir controles que hagan verificable que el modo no-efecto está activo.

La evidencia debe demostrar que el recorrido del piloto no puede alcanzar por accidente:

- el writer NEXO;
- el writer NUMERA;
- el writer PASS;
- cobros o refunds;
- caja;
- fiscalidad;
- compensaciones;
- el corte de fuente.

No basta con una instrucción operativa de “no presionar el botón”.

Si el runtime disponible solo puede llegar a la fuente mediante una ruta que también permite publicar efectos sin una separación verificable, la ejecución permanece `BLOQUEADO` hasta contar con una frontera segura.

---

#### 26. Diagnóstico de la implementación actual de PULSO

La implementación observada de `vento-pulso` dispone de `/sales-imports` y parsea un XLSX de ventas por artículo.

El parser actual reconoce, por fila:

- ID externo;
- producto;
- categoría;
- cantidad;
- subtotal;
- impuestos;
- descuentos;
- devoluciones.

La importación actual calcula hash SHA-256 del archivo y guarda lote y filas de staging con mapping hacia catálogo.

Sin embargo, la granularidad observada es de venta agregada por artículo y no acredita por sí misma:

- encabezado individual de venta;
- identidad individual de venta;
- línea ligada a una venta individual;
- cliente individual;
- pago individual;
- terminal o caja individual;
- `event_id` empresarial por venta.

Por tanto, el código actual sirve como evidencia de que existe una ruta de importación agregada, pero no resuelve por sí mismo el binding individual exigido por los contratos `INT-POS-005` a `INT-POS-010`.

El estado remoto verificado del proyecto VENTO de desarrollo contiene `pulso_daily_sales_import_batches`, `pulso_daily_sales_import_rows` y `pulso_external_sales_item_mappings`, pero la consulta de los lotes de importación devuelve cero registros. En consecuencia:

- existe el mecanismo técnico de staging en código y esquema;
- no existe una muestra Makos remota actualmente disponible para demostrar correlación repetible;
- el binding real permanece `PENDIENTE_DE_EVIDENCIA`;
- el gate de evidencia real queda `BLOQUEADO`;
- no se autoriza inferir una muestra desde el código ni fabricar filas para declarar superado el gate.

---

#### 27. Frontera segura frente al posting actual

La implementación observada también expone una acción de publicación que llama `pulso_post_daily_sales_import` y presenta el resultado como ventas publicadas e inventario descontado.

Esa acción queda fuera del piloto diseñado aquí.

Durante el piloto sin efectos:

```text
IMPORTACIÓN / STAGING CONTROLADO
→ PERMITIDO EN LA EJECUCIÓN AUTORIZADA

PUBLICACIÓN / POSTING DE INVENTARIO
→ PROHIBIDO
```

No se invoca `pulso_post_daily_sales_import`.

La existencia actual de esa acción obliga a que el diseño posterior de `INT-POS-022` preserve una separación técnica verificable como condición previa a cualquier futura ejecución con efectos.

---

#### 28. Estados de resultado

Cada dimensión material del piloto utiliza únicamente estados explícitos:

- `ESPECIFICADO`: el contrato de la dimensión está definido y la evidencia suficiente permite una decisión determinista;
- `PENDIENTE_DE_EVIDENCIA`: falta evidencia que puede obtenerse sin cambiar la decisión canónica;
- `BLOQUEADO`: la ausencia o contradicción impide avanzar de forma segura;
- `NO_APLICA`: el contrato demuestra que la dimensión no corresponde al caso.

No se utiliza una categoría genérica que oculte la causa.

Todo `PENDIENTE_DE_EVIDENCIA` o `BLOQUEADO` conserva:

- insumo faltante;
- propietaria;
- tarea de resolución;
- condición de salida.

---

#### 29. Gate previo al diseño de `INT-POS-022`

El alcance posterior de `INT-POS-022` solo puede declararse habilitable cuando una ejecución autorizada del modo de sombra diseñado aquí demuestre, como mínimo:

1. fuente y ambiente acreditados;
2. lectura no mutante;
3. muestra real preservada con hash;
4. cobertura de consulta explicable;
5. granularidad explícita;
6. binding determinista para las unidades que se pretenden activar;
7. cero identidades inventadas;
8. cero duplicados al repetir el insumo;
9. mapping determinista o cuarentena explícita;
10. sede y contexto suficientes para el alcance a activar;
11. evento PULSO en sombra reproducible;
12. efecto NEXO esperado reproducible cuando aplica;
13. efecto NUMERA esperado reproducible cuando aplica;
14. efecto PASS esperado reproducible cuando aplica;
15. compensaciones únicamente proyectadas;
16. conciliación completa de la muestra;
17. cero efectos empresariales reales producidos por el piloto;
18. cero bloqueos críticos abiertos para el alcance que vaya a activarse.

Si la fuente disponible continúa siendo únicamente el agregado por artículo observado en el XLSX actual, el binding individual permanece `BLOQUEADO` y el diseño posterior de `INT-POS-022` debe conservar ese alcance como no habilitable.

---

#### 30. Evidencia que deberá conservar la ejecución futura

La ejecución del diseño deberá dejar evidencia suficiente para reproducir:

- origen y ambiente;
- alcance temporal y territorial;
- evidencia original y hash;
- mecanismo de lectura;
- cobertura/paginación;
- conteos de fuente;
- decisiones de granularidad;
- matriz de binding;
- mappings utilizados;
- cuarentenas;
- huellas idempotentes;
- repetición deliberada;
- candidatos de evento;
- previews por consumidora;
- diferencias de conciliación;
- prueba de cero efectos;
- bloqueos;
- resultado del gate previo a `INT-POS-022`.

No se considera evidencia una captura aislada que no permita correlacionar fuente, identidad, decisión y resultado.

---

#### 31. Propiedad de bloqueos y handoffs

| Bloqueo o pendiente                                       | Propietaria                  | Tarea de resolución                                               | Condición de salida                                                                                |
| --------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| muestra Makos real ausente en el staging remoto observado | integración Makos / PULSO    | gate de `INT-POS-021`                                             | una muestra real autorizada queda preservada con hash y permite repetir la correlación sin efectos |
| acceso real de solo lectura no disponible                 | integración Makos / PULSO    | `INT-POS-021` como gate de ejecución previo a efectos             | acceso autorizado probado sin mutación                                                             |
| granularidad real de Makos insuficiente                   | integración Makos / PULSO    | `INT-POS-021` como gate de ejecución previo a efectos             | evidencia real permite binding del alcance que se quiera activar                                   |
| mapping de sede o producto insuficiente                   | PULSO / catálogo propietario | contratos `INT-POS-010` a `INT-POS-012` aplicados durante el gate | mapping determinista o cuarentena explícita                                                        |
| idempotencia no demostrada                                | PULSO / adaptador            | `INT-POS-021` como gate de ejecución previo a efectos             | repetición deliberada converge sin duplicados                                                      |
| separación técnica de no-efecto no demostrada             | PULSO / integración          | gate de `INT-POS-021` antes de `INT-POS-022`                      | una ejecución autorizada demuestra que el recorrido no alcanza writers empresariales               |
| preview NEXO bloqueado                                    | NEXO / mapping físico        | gate de `INT-POS-021` antes de `INT-POS-022`                      | precondiciones físicas del alcance quedan demostradas en sombra                                    |
| preview NUMERA bloqueado                                  | NUMERA                       | gate de `INT-POS-021` antes de `INT-POS-022`                      | materialidad y contexto económico quedan demostrados en sombra                                     |
| preview PASS bloqueado                                    | PASS                         | gate de `INT-POS-021` antes de `INT-POS-022`                      | identidad, cuenta y regla quedan demostradas en sombra cuando aplique                              |
| corte de fuente                                           | PULSO / integración          | `INT-POS-023`                                                     | autoridad de fuente queda determinada por sede, terminal y fecha efectiva                          |
| retiro de acceso externo                                  | integración / seguridad      | `INT-POS-024`                                                     | credencial queda reducida o revocada conforme al corte aprobado                                    |

La tarea de diseño queda documentalmente completa, pero el gate de evidencia real permanece `BLOQUEADO` hasta que exista una muestra autorizada; ningún bloqueo de ejecución se presenta como evidencia superada y la continuidad no autoriza saltar ese gate.

---

#### 32. Relación con la conciliación diaria

La salida del piloto debe poder alimentar exactamente la conciliación de `INT-POS-020` sin crear una variante paralela.

La misma lógica de comparación se conserva para:

- fuente;
- venta;
- línea;
- mapping;
- evento;
- NEXO;
- NUMERA;
- PASS;
- compensaciones;
- residuales.

La diferencia es que en `INT-POS-021` los efectos observados deben ser cero por diseño y los efectos esperados son previews.

---

#### 33. Relación con la convivencia y el corte permanente

Este piloto no cambia la fuente autorizada.

La continuidad permanente permanece en:

- `INT-SALES-007`, para control contra efectos duplicados por reintento;
- `INT-SALES-008`, para conciliación de convivencia entre POS externo y PULSO;
- `INT-SALES-009`, para corte por sede, terminal y fecha efectiva;
- `INT-SALES-010`, para impedir doble fuente;
- `INT-SALES-011`, para retirar el adaptador sin modificar consumidoras.

El éxito del piloto no autoriza por sí mismo el corte.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el comportamiento que este piloto debe demostrar ya está protegido por la cobertura vigente de la transición POS externo → PULSO, cuya responsabilidad canónica abarca `INT-POS-001` a `INT-POS-024` y exige adaptador, staging, payload original, hash, mapping, cuarentena, idempotencia, ausencia de doble emisión, efectos exactamente una vez y conciliación. La tarea actual concreta el diseño del gate de sombra previo a efectos sin introducir una obligación independiente nueva ni modificar una fila histórica.

---

#### 35. Cobertura de prueba existente preservada

Se preserva sin modificación, en especial:

- `TREQ-INTEGRATION-003`, para identidad, huella, resultado recuperable y conciliación;
- `TREQ-INTEGRATION-006`, para fuente propietaria única y resolución sin mutación destructiva;
- `TREQ-INTEGRATION-011`, para efectos NEXO exactamente una vez cuando se habiliten;
- `TREQ-INTEGRATION-014`, para la transición Makos/POS externo → PULSO y sus gates de integración;
- `TREQ-INTEGRATION-015`, para fidelización y compensaciones;
- `TREQ-INTEGRATION-017`, para NUMERA y efectos económicos;
- `TREQ-INTEGRATION-023`, para recuperación y conciliación en degradación;
- `TREQ-INTEGRATION-151`, para retry crítico y conciliación al agotarse;
- `TREQ-INTEGRATION-154`, para eventos fuera de orden;
- `TREQ-INTEGRATION-155`, para replay sin fan-out a nuevas consumidoras;
- `TREQ-INTEGRATION-156`, para claim/lease sin inferir que el efecto anterior no ocurrió;
- `TREQ-INTEGRATION-159`, para independencia entre consumidoras;
- `TREQ-INTEGRATION-160`, para destino explícito tras agotamiento;
- `TREQ-INTEGRATION-161`, para prohibir compensación automática por agotamiento;
- `TREQ-PULSO-001`, `TREQ-PULSO-005` y `TREQ-PULSO-006`, para venta, estados, efectos y conciliación;
- `TREQ-NEXO-011`, para ledger y proyecciones físicas reconciliables;
- `TREQ-NUMERA-001` y `TREQ-NUMERA-002`, para hechos económicos correlacionados y reconciliables;
- `TREQ-PASS-008` y `TREQ-PASS-010`, para ledger de fidelización atómico, idempotente y reconciliable.

Ninguna identidad, texto, estado, relación, secuencia o evidencia del registro cambia.

---

#### 36. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-020` como tarea anterior;
2. mantiene `INT-POS-022` como única tarea siguiente;
3. define el piloto como lectura, staging controlado, sombra y no-efecto;
4. preserva Makos como fuente temporal;
5. conserva la credencial con lectura efectiva;
6. prohíbe mutaciones de Makos;
7. exige muestra real autorizada en la ejecución;
8. separa evidencia real de casos simulados;
9. define evidencia mínima por lectura;
10. materializa la matriz de binding;
11. trata granularidad como puerta crítica;
12. prohíbe convertir agregados en ventas individuales;
13. preserva payload o documento original y hash;
14. exige normalización determinista;
15. gobierna sede, terminal y caja sin inferencias;
16. gobierna mapping sin coincidencias arbitrarias;
17. conserva cuarentena;
18. exige repetición deliberada para idempotencia;
19. exige evidencia de completitud de lectura;
20. proyecta evento PULSO sin publicarlo;
21. proyecta NEXO con cero movimiento;
22. proyecta NUMERA con cero hecho económico;
23. proyecta PASS con cero movimiento de fidelización;
24. proyecta compensaciones sin ejecutarlas;
25. reutiliza `INT-POS-020` para conciliación;
26. cubre los casos obligatorios declarados;
27. establece un gate verificable de no-efecto;
28. reconoce la granularidad agregada de la importación XLSX observada;
29. declara que esa granularidad no demuestra binding individual;
30. excluye explícitamente `pulso_post_daily_sales_import` del piloto;
31. utiliza estados explícitos para evidencia y bloqueos;
32. fija el gate previo a `INT-POS-022`;
33. exige cero efectos reales antes de habilitar efectos controlados;
34. mantiene los bloqueos con propietaria y condición de salida;
35. preserva continuidad con `INT-SALES-007` a `INT-SALES-011`;
36. crea cero requisitos `TREQ-*`;
37. modifica cero requisitos `TREQ-*`;
38. no genera una copia del registro canónico de requisitos;
39. no modifica código, SQL, migraciones, Supabase, datos, credenciales, configuración ni estado remoto.

---

#### 37. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-020 — Definir conciliación diaria entre POS y efectos internos`

TAREA ACTUAL APROBADA

`INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`

SIGUIENTE TAREA RESERVADA

`INT-POS-022 — Diseñar piloto controlado con efectos habilitados`


### ✅ INT-POS-022 — Diseñar piloto controlado con efectos habilitados

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`  
**Tarea siguiente:** `INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`  
**Tipo de tarea:** documental; diseño materializado del piloto controlado que, después de superar íntegramente el gate de sombra de `INT-POS-021`, permitirá publicar un conjunto acotado de eventos canónicos de venta y demostrar efectos reales, independientes, idempotentes y reconciliables en NEXO, NUMERA y PASS cuando correspondan, preservando receipts, resultados recuperables, partialidad, resultado desconocido y compensación sin habilitar el corte de fuente ni modificar código, migraciones, Supabase, credenciales, datos o configuración remota durante esta tarea  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente durante el piloto:** `Makos`  
**Aplicación propietaria de la venta canónica:** `PULSO`  
**Consumidoras potenciales del piloto:** `NEXO`, `NUMERA`, `PASS` cuando corresponda  
**Línea base documental:** `vento-shell@86e03074af57229f3b99afaf5fa17b544091e762`  
**Línea base PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`  
**Línea base NEXO observada:** `vento-nexo@142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`  
**Línea base NUMERA observada:** `vento-numera@1b48a5da425d92e19ed89cf175b1dccc4cd960e1`  
**Línea base PASS observada:** `vento-pass@b5a4aec908ef12226f798078577ab089a29ccda2`  
**Cambios físicos autorizados por esta tarea:** ninguno  
**Estado actual de habilitación operativa del piloto:** `BLOQUEADO`  
**Bloqueo vigente:** el gate de evidencia real de `INT-POS-021` no está superado; el staging remoto observado contiene cero lotes Makos y, por tanto, no existe todavía una muestra real preservada que demuestre binding individual, repetibilidad y cero efectos antes de activar este piloto

---

#### 1. Propósito

Diseñar el primer piloto de la transición Makos → PULSO que pueda producir efectos empresariales reales, pero únicamente dentro de un alcance previamente congelado, autorizado, reproducible y conciliable.

El piloto no prueba simplemente que una función puede ejecutarse. Debe demostrar que una venta externa ya validada puede atravesar la frontera canónica completa sin duplicar efectos ni permitir escrituras cruzadas:

```text
GATE DE SOMBRA INT-POS-021 SUPERADO
        ↓
ALCANCE PILOTO CONGELADO
        ↓
VENTA CANÓNICA PULSO
        ↓
EVENTO EMPRESARIAL PULSO
        ├── NEXO  → EFECTO FÍSICO PROPIETARIO
        ├── NUMERA → EFECTO ECONÓMICO PROPIETARIO
        └── PASS   → EFECTO DE FIDELIZACIÓN, CUANDO CORRESPONDA
        ↓
RESULTADOS / RECEIPTS DURABLES
        ↓
RECONCILIACIÓN
        ↓
COMPENSACIÓN PROPIETARIA CUANDO SEA NECESARIA
        ↓
CIERRE DEL PILOTO SIN CAMBIO DE FUENTE
```

El éxito del piloto no autoriza por sí solo el corte de Makos ni convierte la integración temporal en la implementación definitiva de PULSO.

---

#### 2. Resultado sustantivo

`INT-POS-022` deja definidas las siguientes decisiones:

1. El piloto con efectos solo puede ejecutarse después de superar íntegramente el gate aplicable de `INT-POS-021`.
2. La aprobación documental de esta tarea no equivale a gate operativo superado.
3. El estado operativo inicial del piloto es `BLOQUEADO` mientras el gate de evidencia real permanezca abierto.
4. El alcance se congela antes del primer dispatch real.
5. Makos conserva autoridad temporal como fuente de las ventas incluidas mientras no ocurra el corte de `INT-POS-023`.
6. PULSO conserva la venta canónica y es la única productora del evento empresarial normalizado que consume el piloto.
7. NEXO, NUMERA y PASS no reciben comandos directos desde Makos.
8. El adaptador no escribe ledgers ni proyecciones de las consumidoras.
9. Cada consumidora decide su propia elegibilidad y conserva su propia identidad de efecto.
10. La falla de una consumidora no revierte la venta PULSO ni completa, cancela o consume el presupuesto de otra consumidora.
11. Un efecto real se considera demostrado únicamente mediante resultado durable y evidencia propietaria suficiente.
12. Un ACK de transporte no equivale a efecto confirmado.
13. Una respuesta perdida después de un posible commit se trata como resultado desconocido hasta consultar la identidad original.
14. Un retry conserva identidad y huella; no crea una segunda venta ni un segundo efecto.
15. Una huella incompatible bajo la misma identidad produce conflicto y no sobrescritura.
16. La partialidad conserva remanente y no se presenta como éxito total.
17. Un evento fuera de orden se difiere cuando falte una dependencia; no retrocede una versión posterior.
18. Una línea en cuarentena no puede producir el efecto dependiente de su mapping.
19. Una consumidora puede producir `NO_APLICA` legítimo sin que la venta se considere fallida.
20. PASS no acredita puntos si no existe cuenta inequívoca, regla aplicable y base completa.
21. NUMERA no materializa el hecho económico si faltan dimensiones obligatorias que no puedan resolverse autoritativamente.
22. NEXO no materializa salida física si no puede resolver existencia, cantidad, UOM y contexto físico elegibles.
23. Las anulaciones, devoluciones y reembolsos no se modelan mediante borrado ni cantidades negativas genéricas.
24. Cualquier compensación real conserva el efecto original y crea un sucesor propietario correlacionado.
25. Agotar retries no ejecuta compensación automática.
26. El piloto debe demostrar al menos una redelivery deliberada de un evento ya procesado dentro del alcance controlado.
27. El piloto debe demostrar recuperación de un resultado cuando la respuesta original sea desconocida o simuladamente perdida, sin repetir ciegamente la mutación.
28. El piloto debe demostrar conciliación entre fuente, venta, evento y cada efecto aplicable.
29. Ningún efecto fuera del alcance congelado puede aparecer como consecuencia del piloto.
30. El piloto no cambia la autoridad de fuente, credenciales, fiscalidad, reglas de mapping ni configuración productiva para facilitar el resultado.
31. El procedimiento legacy `pulso_post_daily_sales_import` no constituye la frontera canónica del piloto.
32. Un posting legacy existente no se acepta como prueba de que NEXO, NUMERA y PASS hayan procesado el mismo evento canónico de forma independiente.
33. No se fija un número decorativo de ventas, días o sedes; la muestra debe ser limitada y suficiente para demostrar las ramas obligatorias del alcance activado.
34. El piloto puede cerrar una consumidora como `NO_APLICA` para una venta concreta, pero no puede declarar validada una clase de efecto que se pretenda habilitar después sin haber demostrado al menos un caso legítimamente aplicable de esa clase.
35. Antes de pasar a `INT-POS-023`, todo bloqueo crítico del alcance que vaya a convivir con el corte debe estar resuelto o quedar expresamente fuera del alcance que se pretenda cortar.
36. Se crean cero requisitos `TREQ-*`.
37. Se modifican cero requisitos `TREQ-*`.
38. Se crean cero objetos físicos por esta tarea.
39. Se modifican cero objetos físicos por esta tarea.

---

#### 3. Dependencias consumidas y preservadas

La tarea consume sin reabrir:

- `INT-POS-003`, para autoridad temporal de Makos;
- `INT-POS-004`, para acceso independiente, revocable y de lectura efectiva hacia el proveedor;
- `INT-POS-005`, para identidad de venta y línea;
- `INT-POS-006`, para estados, revisiones y timestamps;
- `INT-POS-007`, para componentes monetarios y separación de pago;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos;
- `INT-POS-009`, para payload original, versión, hash, recepción y procedencia;
- `INT-POS-010`, para sede, terminal y caja;
- `INT-POS-011`, para mapping de producto;
- `INT-POS-012`, para cuarentena;
- `INT-POS-013`, para idempotencia de recepción;
- `INT-POS-014`, para transporte, replay y convergencia;
- `INT-POS-015`, para evento empresarial PULSO;
- `INT-POS-016`, para efecto físico exactamente una vez en NEXO;
- `INT-POS-017`, para efecto económico exactamente una vez en NUMERA;
- `INT-POS-018`, para fidelización PASS cuando corresponda;
- `INT-POS-019`, para compensación append-only;
- `INT-POS-020`, para conciliación;
- `INT-POS-021`, para el gate de evidencia real sin efectos;
- `INT-APP-004`, para identidad de idempotencia y resultado recuperable;
- `INT-APP-005`, para retry y resultado desconocido;
- `INT-APP-006`, para compensación coordinada sin escritura cruzada;
- `INT-APP-007`, para auditoría;
- `INT-APP-008` y `INT-APP-009`, para pendientes, partialidad, recuperación y conciliación;
- `INT-APP-010`, para propiedad estricta de las escrituras.

Ninguna de esas decisiones se modifica.

---

#### 4. Gate de entrada obligatorio

El piloto no puede pasar de diseño a ejecución mientras el alcance que se pretende activar no demuestre todos los controles de entrada aplicables heredados de `INT-POS-021`:

1. fuente y ambiente acreditados;
2. lectura no mutante de Makos;
3. muestra real preservada con hash;
4. cobertura de consulta explicable;
5. granularidad explícita;
6. binding determinista para cada unidad que vaya a producir efectos;
7. cero identidades inventadas;
8. repetición del mismo insumo sin duplicados;
9. mapping determinista o cuarentena explícita;
10. sede y contexto suficientes;
11. evento PULSO en sombra reproducible;
12. preview NEXO reproducible cuando aplique;
13. preview NUMERA reproducible cuando aplique;
14. preview PASS reproducible cuando aplique;
15. compensaciones únicamente proyectadas durante el gate;
16. conciliación completa de la muestra;
17. cero efectos empresariales reales producidos por el gate de sombra;
18. cero bloqueos críticos abiertos para el alcance que se pretende activar.

Reglas:

- un total diario coincidente no supera este gate;
- una fila agregada por artículo no demuestra una venta individual;
- un mapping por nombre no se promueve por conveniencia a mapping canónico;
- la existencia de una función legacy que descuenta inventario no supera el gate;
- no se amplía el alcance del piloto para compensar información faltante;
- el gate se evalúa para el alcance exacto que se pretenda activar, no de forma genérica para todo Makos.

Estado actual:

```text
GATE INT-POS-021 = BLOQUEADO
PILOTO INT-POS-022 = NO HABILITABLE TODAVÍA
```

La causa material vigente es la ausencia de una muestra Makos real disponible en el staging remoto observado para demostrar binding repetible antes de efectos.

---

#### 5. Congelamiento del alcance del piloto

Antes del primer dispatch real deberá existir una definición inmutable de alcance para esa ejecución del piloto.

La definición conserva, como mínimo:

- sistema fuente e instancia o ambiente acreditado;
- sede o conjunto explícito de sedes;
- terminal o caja cuando formen parte del binding real;
- ventana temporal exacta;
- conjunto identificable de ventas canónicas incluidas;
- revisiones aplicables;
- evidencia original y hashes relacionados;
- versión de contrato de venta;
- versión del evento empresarial;
- mappings y versiones utilizados;
- reglas y versiones relevantes por consumidora;
- consumidoras habilitadas para cada evento;
- efectos esperados por consumidora;
- exclusiones explícitas;
- criterio de cierre y criterio de abortar expansión.

La definición no necesita fijar un número universal de ventas. Debe ser suficientemente pequeña para permitir trazabilidad individual y suficientemente completa para cubrir los escenarios obligatorios del alcance habilitado.

Una venta o revisión no incluida no puede entrar al piloto por una ventana solapada, replay, reintento o descubrimiento tardío sin una nueva decisión explícita de alcance.

---

#### 6. Estados documentales del alcance

Cada alcance de piloto se clasifica mediante:

| Estado                   | Significado                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `BLOQUEADO`              | falta una precondición crítica y no puede producir efectos                                         |
| `PENDIENTE_DE_EVIDENCIA` | falta evidencia que puede completarse sin cambiar la decisión canónica                             |
| `ESPECIFICADO`           | alcance, contratos y resultados esperados están definidos, pero todavía no se han aplicado efectos |
| `IMPLEMENTADO`           | el paquete físico correspondiente materializó las fronteras necesarias para ejecutar el piloto     |
| `VALIDADO`               | la ejecución controlada produjo evidencia reproducible y cerró la conciliación del alcance         |
| `NO_APLICA`              | la consumidora o efecto no corresponde al hecho conforme a su contrato                             |

`APROBADA` es el estado documental de esta tarea y no sustituye ninguno de estos estados operativos.

---

#### 7. Preflight previo al primer efecto real

Una ejecución futura deberá producir un preflight reproducible antes de liberar cualquier evento al circuito real.

El preflight verifica para cada venta incluida:

1. identidad canónica de venta y líneas;
2. revisión vigente para el hecho observado;
3. `event_id` previsto y definición empresarial aplicable;
4. audiencia de consumidoras congelada;
5. huella lógica del evento;
6. mapping y cuarentena por línea;
7. contexto de sede y demás dimensiones requeridas;
8. efecto NEXO esperado o `NO_APLICA`;
9. efecto NUMERA esperado o estado bloqueado/`NO_APLICA` conforme al contrato;
10. efecto PASS esperado, `NO_APLICA` o bloqueo conforme a identidad y regla;
11. efectos originales que una reversa posterior tendría que referenciar;
12. evidencia que deberá existir después de cada efecto;
13. claves de conciliación entre fuente, venta, evento y consumidoras.

Si el preflight y el resultado en sombra de `INT-POS-021` no coinciden materialmente, el piloto vuelve a `BLOQUEADO` y no aplica el evento real.

---

#### 8. Publicación del evento PULSO

El único hecho que inicia el fan-out del piloto es el evento empresarial PULSO definido en `INT-POS-015`.

Invariantes:

```text
UNA VENTA / REVISIÓN ELEGIBLE
→ UN EVENTO EMPRESARIAL PULSO
→ UNA AUDIENCIA CONGELADA
→ EFECTOS PROPIETARIOS INDEPENDIENTES
```

Reglas:

1. `event_id` se asigna una sola vez antes de la primera entrega;
2. redelivery conserva `event_id`;
3. replay conserva `event_id` y audiencia histórica;
4. una nueva `delivery_id` o `attempt_id` no crea otro evento empresarial;
5. PULSO no reemite el evento cambiando de productora para cada consumidora;
6. una consumidora tardíamente habilitada no se agrega a un replay histórico sin autorización contractual explícita;
7. el evento no afirma que un efecto consumidor ya ocurrió;
8. un evento publicado no se borra porque una consumidora falle;
9. una revisión materialmente distinta sigue el contrato de revisión y no se disfraza como retry de la versión previa.

---

#### 9. Activación por consumidora

La audiencia del evento y la aplicabilidad del efecto son conceptos distintos.

Para cada evento:

```text
EVENTO RECIBIDO
        ↓
INBOX DE LA CONSUMIDORA
        ↓
ELEGIBILIDAD PROPIETARIA
        ├── NO_APLICA → CERO MUTACIÓN + RESULTADO DURABLE
        ├── BLOQUEADO / DIFERIDO → CERO MUTACIÓN + PENDIENTE EXPLÍCITO
        └── APLICA → CONSUMER_EFFECT
```

La consumidora no puede asumir que debe aplicar un efecto únicamente porque recibió el evento.

---

#### 10. Piloto NEXO

Cuando una línea sea físicamente elegible, NEXO ejecutará su efecto bajo la frontera de `INT-POS-016`.

El piloto debe demostrar:

- recepción idempotente independiente;
- identidad `CONSUMER_EFFECT` propia;
- resolución autoritativa de existencia por NEXO;
- producto, presentación, cantidad y UOM reproducibles;
- versión aplicable del mapping o receta cuando corresponda;
- ausencia de escritura de stock desde PULSO o el adaptador;
- group y legs cuando el contrato físico los requiera;
- posting o movimiento propietario;
- receipt durable correlacionado;
- proyección derivada coherente;
- resultado recuperable por la misma identidad;
- cero duplicación frente a redelivery;
- partialidad y residual explícitos cuando ocurran;
- conflicto ante reutilización materialmente incompatible;
- compensación enlazada al original cuando deba revertirse un efecto confirmado.

No se considera demostración suficiente:

- que disminuya una cantidad visible sin receipt correlacionable;
- que PULSO inserte directamente un movimiento;
- que el importador legacy marque una fila como procesada;
- que un agregado coincida con la diferencia total de stock.

---

#### 11. Piloto NUMERA

NUMERA solo aplica `SALE_ECONOMIC_FACT` cuando la venta sea económicamente material y las dimensiones obligatorias puedan resolverse sin inferencias prohibidas.

El piloto debe demostrar:

- inbox independiente por evento;
- identidad de efecto `SALE_ECONOMIC_FACT` estable;
- hecho económico durable asociado a venta, revisión y evento;
- entidad legal resuelta autoritativamente;
- sede y centro de costo conforme a regla vigente;
- moneda demostrable;
- monto y componentes monetarios con semántica reproducible;
- evidencia y referencias de origen;
- resultado idempotente recuperable;
- cero segundo hecho económico ante redelivery;
- conflicto frente a huella material incompatible;
- `RECONCILIATION_REQUIRED` cuando una dimensión obligatoria no pueda determinarse;
- independencia frente al resultado NEXO o PASS;
- corrección o compensación posterior sin editar destructivamente el hecho original.

`SALE_ECONOMIC_FACT` no prueba por sí solo:

- pago;
- aplicación de pago;
- cierre de caja;
- depósito;
- movimiento bancario;
- documento fiscal final;
- asiento contable.

---

#### 12. Piloto PASS

PASS aplica fidelización únicamente cuando `INT-POS-018` determine que corresponde.

Para una acumulación aplicable, el piloto debe demostrar:

- cuenta PASS inequívoca;
- regla y versión aplicables al hecho;
- base completa conforme a la regla;
- efecto `LOYALTY_POINTS_ACCRUAL` con identidad estable;
- guarda de dominio por cuenta y venta para acumulación;
- ledger inmutable;
- saldo como proyección y no como fuente del movimiento;
- evento origen y venta correlacionados;
- delta y resultado durable;
- cero segundo movimiento ante redelivery o retry;
- recuperación del resultado previo;
- conflicto ante reutilización incompatible;
- reversa o ajuste mediante movimiento compensatorio cuando corresponda.

También debe conservar como resultado válido:

```text
VENTA VÁLIDA
+
SIN CUENTA PASS APLICABLE O SIN REGLA APLICABLE
→ NO_APLICA
→ CERO PUNTOS
```

Un caso `NO_APLICA` no demuestra la rama de acumulación. Si PASS va a formar parte del alcance operativo posterior, deberá existir al menos un caso legítimamente elegible que demuestre el efecto real antes de declarar validada esa capacidad.

---

#### 13. Redelivery e idempotencia obligatoria

El piloto debe repetir deliberadamente al menos un evento ya procesado dentro del alcance congelado.

Resultado exigido para cada consumidora aplicable:

```text
MISMO EVENT_ID
+
MISMO EFFECT_CODE
+
MISMA HUELLA
→ RESULTADO ORIGINAL RECUPERADO
→ CERO EFECTO ADICIONAL
```

Para PASS se conserva además la guarda de acumulación por cuenta y venta.

La validación de redelivery no puede limitarse a comparar totales; debe demostrar identidad y resultado de cada efecto.

---

#### 14. Resultado desconocido y respuesta perdida

El piloto debe demostrar la rama de resultado desconocido sin asumir que un timeout equivale a fallo.

La prueba controlada debe reproducir una condición equivalente a:

```text
SOLICITUD DE EFECTO
→ POSIBLE COMMIT PROPIETARIO
→ RESPUESTA NO DISPONIBLE
```

La recuperación obligatoria es:

1. conservar la misma identidad;
2. consultar el resultado durable por esa identidad;
3. si existe, recuperar ese resultado sin repetir la mutación;
4. si está en progreso, mantener estado recuperable;
5. si no puede resolverse de forma segura, pasar a conciliación;
6. no crear una identidad nueva para “intentar de nuevo”.

La forma física de inyección de fallo pertenece al paquete que implemente la frontera correspondiente. La regla de retry permanente se consolida en `INT-SALES-007`.

---

#### 15. Partialidad y residuales

Un efecto parcial no se oculta detrás de un estado global de éxito.

El piloto debe poder conservar, cuando aplique:

- alcance solicitado;
- fracción o componente confirmado;
- fracción pendiente;
- causa;
- intentos;
- receipt parcial o referencias equivalentes propietarias;
- condición para continuar;
- condición para compensar;
- estado de conciliación.

Reglas:

1. una parte confirmada no se repite;
2. una parte pendiente no se presenta como aplicada;
3. la partialidad de NEXO no se convierte automáticamente en rollback NUMERA o PASS;
4. la partialidad de otra consumidora no altera el hecho PULSO;
5. el residual permanece abierto en `INT-POS-020` hasta resolución.

---

#### 16. Eventos fuera de orden

Cuando una consumidora reciba una revisión o efecto cuya dependencia no esté disponible:

- no inventa el estado previo;
- no aplica una versión tardía sobre una posterior;
- conserva evento y procedencia;
- difiere de acuerdo con el contrato transversal;
- permite que la llegada de la dependencia reactive el trabajo sin cambiar identidad;
- mantiene el caso visible para conciliación si se agota la recuperación automática.

No se utiliza orden de llegada como sustituto de la versión empresarial.

---

#### 17. Cuarentena durante el piloto con efectos

La cuarentena de `INT-POS-012` permanece activa aun cuando otras líneas o consumidoras sí puedan producir efectos.

Reglas:

1. una línea `ACTIVE` nunca se elimina para cuadrar el piloto;
2. un efecto dependiente de producto queda bloqueado para esa línea;
3. una consumidora no dependiente del mapping puede continuar únicamente si su contrato demuestra todas sus dimensiones sin usar el dato desconocido;
4. liberar una línea después no crea otra venta ni duplica el evento;
5. cualquier efecto incremental posterior conserva causalidad y contrato propios;
6. una línea bloqueada no se sustituye por un producto parecido para completar la muestra.

---

#### 18. Compensación controlada

Si el piloto produce un efecto que deba revertirse por diseño, error controlado o cierre operativo, la limpieza no puede realizarse borrando o editando historia.

Se aplica `INT-POS-019`:

```text
EFECTO ORIGINAL CONFIRMADO
        ↓
PLAN / PASO COMPENSATORIO AUTORIZADO
        ↓
EFECTO PROPIETARIO INVERSO O MITIGADOR
        ↓
RESULTADO DURABLE
        ↓
ORIGINAL + COMPENSACIÓN PRESERVADOS
```

Invariantes:

1. solo se compensa un efecto original demostrado;
2. resultado original desconocido exige conciliación antes de compensar;
3. cada dominio ejecuta su propio paso;
4. un refund no mueve inventario;
5. una devolución física no acredita automáticamente refund;
6. una reversión PASS no modifica el movimiento original;
7. NUMERA no edita destructivamente el hecho económico;
8. NEXO usa el contrato físico compensatorio correspondiente;
9. el mismo paso compensatorio es idempotente;
10. agotar retries no dispara compensación por sí solo.

La compensación del piloto, cuando corresponda, forma parte de su evidencia y no se oculta como mantenimiento técnico.

---

#### 19. Independencia de consumidoras

El piloto conserva explícitamente:

```text
PULSO EVENT
        ├── NEXO  → estado / retry / resultado propios
        ├── NUMERA → estado / retry / resultado propios
        └── PASS  → estado / retry / resultado propios
```

Por tanto:

- NEXO `APPLIED` no confirma NUMERA;
- NUMERA `APPLIED` no confirma PASS;
- PASS `NO_APLICA` no invalida la venta;
- un fallo PASS no revierte NEXO;
- un fallo NEXO no borra el hecho económico si NUMERA puede demostrarlo legítimamente;
- un fallo NUMERA no devuelve stock;
- ningún consumidor escribe directamente el ledger de otro.

La conciliación reúne resultados; no los fusiona.

---

#### 20. Conciliación obligatoria del piloto

La ejecución se cierra mediante la misma lógica de `INT-POS-020`.

Para cada venta incluida debe poder reconstruirse:

```text
EVIDENCIA MAKOS
↔ STAGING / NORMALIZACIÓN
↔ VENTA Y LÍNEAS PULSO
↔ EVENTO PULSO
↔ NEXO ESPERADO / REAL / RECEIPT
↔ NUMERA ESPERADO / REAL / RESULTADO
↔ PASS ESPERADO / REAL / RESULTADO
↔ COMPENSACIONES, SI EXISTEN
```

La conciliación identifica como mínimo:

- venta sin evento;
- evento sin venta correlacionada;
- efecto aplicable faltante;
- efecto no aplicable ejecutado;
- efecto sin evento;
- duplicado;
- huella conflictiva;
- mapping o versión divergente;
- cantidad o UOM divergentes;
- monto o moneda divergentes;
- cuenta o regla PASS incorrectas;
- respuesta desconocida;
- partialidad;
- residual;
- compensación faltante;
- efecto fuera del alcance congelado.

La conciliación no repara escribiendo directamente en la consumidora. La acción correctiva retorna a la frontera propietaria.

---

#### 21. Escenarios obligatorios

El diseño exige evidencia individual para las siguientes ramas cuando formen parte del alcance habilitado:

| Escenario                                 | Resultado exigido                                           |
| ----------------------------------------- | ----------------------------------------------------------- |
| venta con binding individual válido       | evento PULSO único y correlacionable                        |
| efecto NEXO aplicable                     | un efecto físico propietario con receipt y cero duplicación |
| efecto NUMERA aplicable                   | un `SALE_ECONOMIC_FACT` durable y único                     |
| efecto PASS aplicable                     | una acumulación única con ledger y regla reproducibles      |
| PASS legítimamente no aplicable           | `NO_APLICA` y cero puntos                                   |
| línea en cuarentena                       | cero efecto dependiente de mapping                          |
| redelivery del mismo evento               | resultado previo y cero efecto adicional                    |
| misma identidad con huella incompatible   | conflicto visible y cero sobrescritura                      |
| respuesta perdida o resultado desconocido | consulta de resultado antes de cualquier nuevo envío        |
| partialidad                               | fracción confirmada y residual explícitos                   |
| evento fuera de orden                     | diferido sin regresión de versión                           |
| fallo de una consumidora                  | otras consumidoras conservan estados independientes         |
| reversa posterior a efecto confirmado     | compensación propietaria enlazada, sin borrado              |
| divergencia de conciliación               | pendiente explícito con propietaria y condición de salida   |
| intento de efecto fuera del alcance       | rechazo o bloqueo sin mutación                              |

Si una clase de efecto está prevista para el alcance posterior pero no existe un caso real elegible en el piloto, esa clase permanece `PENDIENTE_DE_EVIDENCIA` y no se declara validada por inferencia.

---

#### 22. Criterio de abortar expansión

El piloto no es una progresión automática de “si una venta funcionó, habilitar más”.

Se detiene cualquier ampliación del alcance cuando aparezca al menos una de estas condiciones:

- identidad o binding ambiguos;
- efecto duplicado;
- efecto fuera del alcance;
- respuesta desconocida que no pueda recuperarse;
- conflicto de huella no resuelto;
- partialidad sin residual explícito;
- mapping o versión no reproducibles;
- cantidad/UOM no reconciliables;
- monto/moneda no reconciliables;
- cuenta/regla PASS no reproducibles;
- escritura cruzada;
- compensación destructiva;
- divergencia de fuente no explicada;
- evento sin evidencia original suficiente;
- incapacidad de demostrar qué versión produjo el efecto.

El alcance permanece congelado hasta resolver la causa mediante su tarea propietaria.

---

#### 23. Evidencia mínima de ejecución futura

La ejecución controlada deberá conservar, por alcance y por venta:

- identificación de la fuente y ambiente;
- ventana y alcance territorial;
- evidencia original y hash;
- venta y revisión canónicas;
- líneas y mappings aplicables;
- cuarentenas;
- `event_id` y definición;
- audiencia;
- huella lógica;
- entregas e intentos correlacionados;
- inbox de cada consumidora;
- identidad de cada `CONSUMER_EFFECT`;
- resultado durable por consumidora;
- receipt o referencia propietaria de efecto;
- timestamps relevantes;
- retries y resultado recuperado;
- partialidad y residuales;
- conflictos;
- compensaciones;
- comparación esperada versus real;
- resultado de conciliación;
- decisión final del gate del piloto.

No se considera evidencia suficiente un total agregado, una captura aislada, un mensaje de éxito del frontend o la mera ausencia de error técnico.

---

#### 24. Frontera frente al flujo legacy actual

La implementación PULSO observada conserva una ruta de importación agregada que puede guardar lotes y filas y luego invocar `pulso_post_daily_sales_import`.

El estado remoto observado también demuestra que ese RPC y las estructuras legacy de posting de inventario existen.

Para este piloto:

```text
PULSO_POST_DAILY_SALES_IMPORT LEGACY
≠
PILOTO CANÓNICO CON EFECTOS
```

Razones:

1. la ruta legacy parte de filas agregadas por artículo;
2. no demuestra por sí sola venta individual y línea canónicas;
3. su posting de inventario no demuestra publicación del evento empresarial PULSO;
4. no demuestra inbox y efectos independientes en NEXO, NUMERA y PASS;
5. no demuestra receipts y resultados recuperables bajo las identidades de `INT-POS-016` a `INT-POS-018`;
6. no puede utilizarse para saltar el gate de `INT-POS-021`.

La tarea no retira ni modifica físicamente este flujo. Simplemente impide usarlo como evidencia de cumplimiento del piloto canónico.

---

#### 25. Readiness técnico antes de ejecutar

La ejecución física del diseño requiere que el paquete autorizado correspondiente demuestre, sin inferencia, que existen y están protegidas las fronteras necesarias para:

- producir el evento PULSO con identidad estable;
- entregar el evento con audiencia congelada;
- reclamar inbox por consumidora;
- aplicar o recuperar `CONSUMER_EFFECT` en NEXO;
- aplicar o recuperar `SALE_ECONOMIC_FACT` en NUMERA;
- aplicar o recuperar `LOYALTY_POINTS_ACCRUAL` en PASS cuando corresponda;
- obtener resultados durables y referencias de efecto;
- reintentar con misma identidad;
- diferir fuera de orden;
- conciliar resultado desconocido;
- ejecutar compensaciones propietarias cuando sean necesarias;
- demostrar cero writes cruzados.

La ausencia de nombres físicos congelados en estas tareas documentales no autoriza a inventarlos.

La responsabilidad documental permanente se conserva en:

- `INT-SALES-003`, para registro de salida de inventario en NEXO;
- `INT-SALES-004`, para recepción del evento de venta en NUMERA;
- `INT-SALES-005`, para acumulación de puntos en PASS;
- `INT-SALES-006`, para redención PASS cuando exista una operación de redención real;
- `INT-SALES-007`, para control de duplicados por reintento;
- `INT-SALES-008`, para conciliación de convivencia;
- `INT-SALES-009`, para corte por sede, terminal y fecha efectiva;
- `INT-SALES-010`, para impedir doble fuente;
- `INT-SALES-011`, para retiro posterior del adaptador.

---

#### 26. Puerta de salida del piloto

Un alcance del piloto solo puede quedar `VALIDADO` cuando:

1. el gate de entrada fue superado con evidencia real;
2. el alcance ejecutado coincide exactamente con el alcance congelado;
3. cada venta incluida conserva evidencia fuente y binding individual suficiente;
4. cada venta elegible produjo un solo evento PULSO;
5. cada consumidora aplicable conserva una recepción idempotente;
6. cada efecto aplicable tiene identidad, huella y resultado durable;
7. NEXO demuestra receipt físico cuando corresponde;
8. NUMERA demuestra el resultado de `SALE_ECONOMIC_FACT` cuando corresponde;
9. PASS demuestra movimiento de ledger cuando corresponde;
10. cada `NO_APLICA` está justificado por contrato y no por ausencia silenciosa;
11. la redelivery deliberada produjo cero efectos adicionales;
12. la rama de resultado desconocido recuperó o llevó correctamente el caso a conciliación sin duplicar;
13. toda partialidad conserva residual explícito;
14. no existieron efectos fuera del alcance;
15. no existieron escrituras cruzadas;
16. toda compensación requerida quedó enlazada y reconciliada;
17. no quedan `RESULT_UNKNOWN`, conflictos o residuales críticos sin resolución para el alcance cerrado;
18. la conciliación puede reconstruir fuente → venta → evento → efecto por consumidora;
19. Makos conserva la autoridad temporal de fuente;
20. no se ejecutó ningún corte ni revocación de credenciales como consecuencia implícita del piloto.

Una rama no demostrada no se marca validada por éxito de otra consumidora.

---

#### 27. Bloqueos y handoffs

| Bloqueo o pendiente                                                      | Propietaria               | Tarea responsable | Condición de salida                                                                    |
| ------------------------------------------------------------------------ | ------------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| muestra real Makos todavía ausente en staging remoto                     | integración Makos / PULSO | `INT-POS-021`     | muestra autorizada preservada, binding repetible y gate de sombra superado             |
| binding individual insuficiente                                          | integración Makos / PULSO | `INT-POS-021`     | cada unidad que vaya a mutar dominios tiene identidad y granularidad demostrables      |
| efecto NEXO permanente no materializado o no demostrado por paquete      | NEXO                      | `INT-SALES-003`   | frontera propietaria implementada y probada con receipt recuperable                    |
| efecto NUMERA permanente no materializado o no demostrado por paquete    | NUMERA                    | `INT-SALES-004`   | recepción y efecto económico propietarios implementados y probados                     |
| acumulación PASS permanente no materializada o no demostrada por paquete | PASS                      | `INT-SALES-005`   | acumulación propietaria implementada y probada bajo cuenta y regla reales              |
| redención PASS cuando corresponda                                        | PASS                      | `INT-SALES-006`   | operación de redención explícita implementada y probada sin inferencia desde venta     |
| duplicación o resultado desconocido por retry                            | integración transversal   | `INT-SALES-007`   | reintento conserva identidad, recupera resultado y no duplica efectos                  |
| convivencia y diferencias entre fuentes                                  | PULSO / integración       | `INT-SALES-008`   | conciliación de convivencia demuestra convergencia sin doble emisión                   |
| corte de fuente                                                          | PULSO / integración       | `INT-POS-023`     | se define la transición futura sin permitir doble fuente por sede, terminal y vigencia |
| reducción o revocación del acceso Makos                                  | integración / seguridad   | `INT-POS-024`     | credencial externa queda ajustada solo después del corte aprobado                      |

Ningún bloqueo de ejecución se presenta como resuelto por la sola aprobación documental de esta tarea.

---

#### 28. Relación con `INT-POS-023`

`INT-POS-022` prueba una cadena controlada; `INT-POS-023` define el cambio futuro de autoridad de fuente.

Se preserva:

```text
PILOTO VALIDADO
≠
CUTOVER EJECUTADO
```

El piloto no modifica:

- sede fuente autorizada;
- terminal fuente autorizada;
- fecha efectiva de corte;
- credencial Makos;
- obligación fiscal del POS vigente;
- consumidores permanentes.

`INT-POS-023` permanece reservada hasta aprobación explícita de esta tarea y solicitud expresa de continuación.

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el piloto controlado especializa comportamientos ya protegidos por el registro vigente para toda la transición del POS externo: evento y efectos exactamente una vez, independencia de consumidoras, idempotencia, retry, resultado desconocido, partialidad, fuera de orden, cuarentena, compensación, reconciliación y prevención de doble emisión. La tarea no introduce una obligación de comportamiento adicional fuera de esa cobertura ni modifica una obligación histórica existente.

---

#### 30. Cobertura de prueba existente preservada

Se preservan sin modificación, en especial:

- `TREQ-INTEGRATION-003`, para identidad estable, huella, resultado recuperable, retry y conciliación;
- `TREQ-INTEGRATION-011`, para efecto físico exactamente una vez en NEXO;
- `TREQ-INTEGRATION-014`, para la transición POS externo → PULSO, incluyendo `INT-POS-001` a `INT-POS-024`, staging, mapping, cuarentena, efectos exactamente una vez y conciliación;
- `TREQ-INTEGRATION-015`, para fidelización y compensaciones correlacionadas;
- `TREQ-INTEGRATION-017`, para efectos económicos hacia NUMERA;
- `TREQ-INTEGRATION-151`, para retry crítico con conciliación al agotarse;
- `TREQ-INTEGRATION-154`, para eventos fuera de orden;
- `TREQ-INTEGRATION-155`, para replay sin nueva audiencia ni reactivación no autorizada de efectos sensibles;
- `TREQ-INTEGRATION-156`, para claim o lease sin asumir que el efecto anterior no ocurrió;
- `TREQ-INTEGRATION-159`, para independencia de fallos y presupuestos entre consumidoras;
- `TREQ-INTEGRATION-160`, para salida explícita al agotar retry;
- `TREQ-INTEGRATION-161`, para prohibición de compensación automática por agotamiento;
- `TREQ-PULSO-001`, para el ciclo POS end-to-end con inventario, fidelización, hecho económico y reversión;
- `TREQ-PULSO-005`, para separación de estados comerciales y efectos;
- `TREQ-PULSO-006`, para separación entre venta, pago, caja, documento fiscal y reversos;
- `TREQ-NEXO-011`, para ledger físico, proyecciones, idempotencia y compensación reconciliables;
- `TREQ-NUMERA-001` y `TREQ-NUMERA-002`, para reconciliación, identidad, procedencia y correcciones económicas no destructivas;
- `TREQ-PASS-008`, `TREQ-PASS-010` y `TREQ-PASS-011`, para servidor autorizado, ledger inmutable, idempotencia, identidad y compensaciones PASS.

Ninguna fila cambia de identidad, texto, estado, relación, propietario, evidencia ni secuencia.

---

#### 31. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-021` como tarea anterior;
2. mantiene `INT-POS-023` como única tarea siguiente;
3. conserva el estado operativo actual del piloto como `BLOQUEADO`;
4. exige superar el gate completo de `INT-POS-021` antes de cualquier efecto real;
5. congela un alcance individualmente trazable antes del dispatch;
6. preserva Makos como fuente temporal durante el piloto;
7. mantiene PULSO como productora del evento canónico;
8. prohíbe que Makos o el adaptador escriban dominios internos;
9. define audiencia congelada y replay sin fan-out silencioso;
10. mantiene inbox y efecto separados por consumidora;
11. define la puerta de elegibilidad por consumidora;
12. admite `NO_APLICA` legítimo;
13. exige efecto NEXO propietario con receipt cuando corresponda;
14. exige `SALE_ECONOMIC_FACT` durable cuando corresponda;
15. exige acumulación PASS real únicamente bajo cuenta y regla válidas;
16. exige al menos un caso aplicable antes de declarar validada una clase de efecto que se pretenda habilitar posteriormente;
17. exige redelivery deliberada con cero efecto adicional;
18. exige recuperación de resultado desconocido sin nueva identidad;
19. conserva conflicto ante huella incompatible;
20. conserva partialidad y residual;
21. conserva fuera de orden sin regresión;
22. mantiene cuarentena durante el piloto real;
23. define compensación append-only y propietaria;
24. prohíbe compensación automática por agotamiento de retry;
25. preserva independencia entre NEXO, NUMERA y PASS;
26. reutiliza `INT-POS-020` para conciliación;
27. materializa escenarios obligatorios del piloto;
28. define condiciones que detienen expansión;
29. define evidencia mínima por venta, evento y efecto;
30. excluye el RPC legacy `pulso_post_daily_sales_import` como prueba del piloto canónico;
31. no afirma readiness físico de una frontera sin evidencia del paquete que la implemente;
32. asigna los contratos permanentes a `INT-SALES-003` a `INT-SALES-011` según responsabilidad;
33. define una puerta de salida verificable;
34. impide que el piloto ejecute o implique el corte de fuente;
35. genera cero cambios `TREQ-*`;
36. no genera una copia del registro canónico de requisitos;
37. no modifica código, SQL, migraciones, Supabase, datos, credenciales, configuración ni estado remoto;
38. mantiene `INT-POS-023` exclusivamente reservada.

---

#### 32. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-021 — Diseñar piloto sin efectos sobre inventario ni finanzas`

TAREA ACTUAL APROBADA

`INT-POS-022 — Diseñar piloto controlado con efectos habilitados`

SIGUIENTE TAREA RESERVADA

`INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`


### ✅ INT-POS-023 — Definir transición futura desde POS externo hacia PULSO

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-022 — Diseñar piloto controlado con efectos habilitados`  
**Tarea siguiente:** `INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente`  
**Tipo de tarea:** documental; definición normativa y materializada de la transición futura de autoridad del hecho de venta desde el POS externo vigente hacia PULSO, mediante un corte exclusivo por sede, terminal y fecha efectiva, preservando identidad, procedencia, historia, idempotencia, efectos ya aplicados, eventos tardíos, compensaciones y conciliación, sin ejecutar el corte, modificar código, crear migraciones, modificar Supabase, alterar credenciales, publicar ventas adicionales ni producir efectos empresariales durante esta tarea  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente durante la transición:** `Makos`  
**Fuente empresarial objetivo de nuevas ventas después del corte:** `PULSO`  
**Línea base documental:** `vento-shell@4120682252750babd6f36ceb402537512513a779`  
**Línea base técnica PULSO observada:** `vento-pulso@71e0184486b5fe11e0a42435baf4024807a80efd`  
**Cambios físicos autorizados:** ninguno  
**Estado de habilitación operativa del corte:** `BLOQUEADO`  
**Bloqueo heredado:** el corte no puede activarse mientras el alcance correspondiente no haya superado con evidencia los gates de binding sin efectos de `INT-POS-021` y de piloto controlado con efectos de `INT-POS-022`

---

#### 1. Propósito

Definir exactamente cómo cambia la autoridad de origen de las nuevas ventas desde Makos hacia PULSO sin cambiar el contrato canónico que reciben NEXO, NUMERA y PASS y sin permitir un intervalo en el que ambos sistemas puedan afirmar como propia la misma venta.

La transición se gobierna como un cambio de **autoridad de fuente**, no como una copia de datos ni como una sustitución destructiva de historia.

Regla raíz:

```text
ANTES DEL CORTE
MAKOS ES FUENTE TEMPORAL AUTORIZADA
        ↓
ADAPTADOR + STAGING + CONTRATO CANÓNICO
        ↓
PULSO CONSERVA EL HECHO COMERCIAL INTERNO
        ↓
EVENTO CANÓNICO
        ↓
NEXO / NUMERA / PASS SEGÚN CORRESPONDA

DESPUÉS DEL CORTE DEL ALCANCE
PULSO ES FUENTE DE LAS NUEVAS VENTAS
        ↓
MISMO CONTRATO CANÓNICO
        ↓
MISMAS FRONTERAS CONSUMIDORAS
```

El cambio de fuente no crea otra semántica de venta, otra identidad de línea, otro contrato de inventario, otro contrato económico ni otra regla de fidelización.

---

#### 2. Resultado sustantivo

`INT-POS-023` deja definidas las siguientes decisiones obligatorias:

1. El corte se realiza por alcance explícito de sede, terminal y fecha efectiva; no existe un cambio global implícito para toda Vento.
2. Makos conserva autoridad sobre las ventas cuyo origen empresarial corresponde al intervalo anterior al corte de su sede y terminal.
3. PULSO adquiere autoridad sobre las nuevas ventas originadas dentro del alcance a partir del límite efectivo aprobado.
4. La hora de recepción, importación, sincronización, reintento o replay no cambia por sí sola la fuente empresarial de una venta.
5. Una venta anterior al corte recibida después del corte conserva procedencia Makos.
6. Una revisión, anulación, devolución o reembolso posterior al corte conserva relación con la venta original y con su fuente original.
7. Una venta PULSO posterior al corte no puede degradarse a venta Makos porque haya sido creada offline o sincronizada tarde.
8. Una venta Makos posterior al corte dentro de un alcance ya transferido a PULSO se considera conflicto de autoridad hasta conciliación; no produce silenciosamente una segunda venta ni efectos adicionales.
9. La misma identidad comercial no puede ser emitida como venta nueva por Makos y por PULSO.
10. La deduplicación de consumidoras no sustituye el control de doble fuente, porque dos emisiones incompatibles podrían portar identificadores de evento distintos.
11. La identidad canónica de venta y línea permanece estable durante toda la transición.
12. `source_system` y la procedencia histórica permanecen auditables después del corte.
13. Una venta histórica Makos materializada en PULSO no se reclasifica como venta nativa PULSO.
14. Un replay o backfill conserva la identidad y audiencia históricas; no crea nueva audiencia por haber ocurrido después del corte.
15. NEXO continúa consumiendo el mismo contrato de efecto físico y conserva la autoridad sobre inventario.
16. NUMERA continúa consumiendo el mismo contrato económico y conserva la autoridad sobre sus hechos económicos.
17. PASS continúa evaluando el mismo contrato de fidelización y conserva la autoridad sobre cuenta, regla, ledger y saldo.
18. El corte de venta no implica por sí solo corte de pagos, caja, fiscalidad, contabilidad externa, credenciales ni otros proveedores.
19. El documento fiscal mantiene la autoridad que corresponda al contrato fiscal vigente; no cambia de propietaria por inferencia.
20. El adaptador Makos puede conservar una función residual de lectura, evidencia y conciliación para historia anterior al corte mientras exista necesidad aprobada.
21. Esa función residual no conserva autoridad para originar nuevas ventas dentro del alcance ya transferido a PULSO.
22. La reducción o revocación de la credencial Makos pertenece exclusivamente a `INT-POS-024`.
23. La convivencia permanente, el corte permanente y el retiro del adaptador quedan preservados en `INT-SALES-008` a `INT-SALES-011`.
24. La política permanente contra efectos duplicados por reintento permanece en `INT-SALES-007`.
25. El corte no se habilita por aprobación documental de esta tarea.
26. El corte requiere evidencia operativa satisfactoria de `INT-POS-021` y `INT-POS-022` para el mismo alcance o uno demostrablemente compatible.
27. Si no puede determinarse de forma inequívoca a qué lado del corte pertenece una venta, el registro queda bloqueado para emisión de efectos hasta reconciliación.
28. Si terminal, tiempo de ocurrencia, identidad o fuente no pueden resolverse con evidencia suficiente, no se inventan valores para completar el corte.
29. Una reversión de un corte ya iniciado no reactiva Makos como fuente concurrente mediante un cambio silencioso; requiere una nueva decisión explícita de autoridad y un nuevo límite efectivo, preservando los intervalos anteriores.
30. Se crean cero requisitos `TREQ-*` y se modifican cero requisitos `TREQ-*` porque la regla completa del corte ya está protegida por la cobertura vigente de integración.
31. Se crean cero objetos físicos y se modifican cero objetos físicos.

---

#### 3. Dependencias consumidas y preservadas

La tarea consume sin reabrir:

- `INT-POS-002`, para capacidades externas realmente acreditadas;
- `INT-POS-003`, para la autoridad temporal de Makos;
- `INT-POS-004`, para credencial independiente, revocable y limitada;
- `INT-POS-005`, para identidad canónica de venta y línea;
- `INT-POS-006`, para estados, revisiones y timestamps;
- `INT-POS-007`, para separación de descuentos, impuestos, propinas y pagos;
- `INT-POS-008`, para anulaciones, devoluciones y reembolsos no destructivos;
- `INT-POS-009`, para payload original, versión, hash, recepción y procedencia;
- `INT-POS-010`, para sede, terminal y caja;
- `INT-POS-011`, para mapping de producto;
- `INT-POS-012`, para cuarentena;
- `INT-POS-013`, para identidad e idempotencia de fuente externa;
- `INT-POS-014`, para convergencia de transportes y replay;
- `INT-POS-015`, para el evento empresarial PULSO;
- `INT-POS-016`, para el efecto físico NEXO exactamente una vez;
- `INT-POS-017`, para el efecto económico NUMERA exactamente una vez;
- `INT-POS-018`, para fidelización PASS cuando corresponda;
- `INT-POS-019`, para compensaciones append-only;
- `INT-POS-020`, para conciliación diaria;
- `INT-POS-021`, para el gate de binding real sin efectos;
- `INT-POS-022`, para el gate controlado con efectos habilitados;
- `INT-APP-004` a `INT-APP-010`, para idempotencia, retry, resultado desconocido, compensación, auditoría, pendientes, parcialidad y prohibición de escrituras cruzadas.

Ninguna decisión aprobada por esas tareas cambia de identidad, significado o propietaria.

---

#### 4. Qué cambia y qué no cambia

El corte modifica una sola responsabilidad sustantiva:

```text
QUIÉN PUEDE ORIGINAR UNA NUEVA VENTA
PARA UNA SEDE + TERMINAL + LÍMITE EFECTIVO
```

No modifica:

- la identidad de una venta ya existente;
- la identidad de una línea ya existente;
- el payload histórico recibido de Makos;
- el hash de evidencia histórica;
- la productora empresarial del evento PULSO definida por el contrato vigente;
- el contrato de entrega hacia consumidoras;
- la identidad de un efecto NEXO ya aplicado;
- la identidad de un hecho NUMERA ya aplicado;
- la identidad de un movimiento PASS ya aplicado;
- una compensación ya registrada;
- un documento fiscal histórico;
- una referencia de pago histórica;
- la audiencia histórica de un evento;
- la autoridad de NEXO sobre inventario;
- la autoridad de NUMERA sobre hechos económicos;
- la autoridad de PASS sobre fidelización.

Por tanto:

```text
CAMBIO DE FUENTE DE NUEVAS VENTAS
≠
MIGRACIÓN DE IDENTIDAD HISTÓRICA
≠
REEMISIÓN DE VENTAS HISTÓRICAS
≠
REAPLICACIÓN DE EFECTOS
```

---

#### 5. Unidad canónica del corte

La unidad mínima de decisión es:

```text
SEDE
+
TERMINAL
+
FECHA EFECTIVA
+
PRECISIÓN TEMPORAL ACREDITADA PARA SEPARAR LOS DOS INTERVALOS
```

La fecha efectiva es obligatoria. Cuando el contrato técnico disponga de un timestamp o precisión mayor, esa precisión se conserva para evitar ambigüedad dentro de la misma fecha.

El corte debe poder reconstruir documentalmente, como mínimo:

| Dimensión           | Decisión obligatoria                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| sede                | identidad canónica inequívoca                                                                                                    |
| terminal            | identidad canónica o binding inequívoco de la terminal transferida                                                               |
| fuente anterior     | Makos dentro del alcance temporal previo                                                                                         |
| fuente posterior    | PULSO para las nuevas ventas del alcance transferido                                                                             |
| fecha efectiva      | límite aprobado de transferencia                                                                                                 |
| precisión temporal  | resolución suficiente para clasificar cada venta en uno de los dos intervalos                                                    |
| autoridad           | actor o decisión autorizada que habilita el corte cuando corresponda                                                             |
| evidencia de gates  | referencias que demuestran que el alcance superó `INT-POS-021` y `INT-POS-022`                                                   |
| conciliación        | estado de diferencias y residuales previo al corte                                                                               |
| versión contractual | versión de las reglas de identidad, binding y efectos utilizadas                                                                 |
| estado              | preparado, bloqueado, efectivo o cerrado únicamente como estado documental/operativo acreditado; no como enum físico creado aquí |

No se crea un identificador físico ni un enum mediante esta tarea. La implementación futura deberá materializar la identidad del corte conforme a la arquitectura aprobada en sus tareas propietarias.

---

#### 6. Exclusividad de intervalos de autoridad

Para una misma sede y terminal, los intervalos de autoridad no pueden solaparse.

```text
INTERVALO MAKOS
        ↓
LÍMITE EFECTIVO
        ↓
INTERVALO PULSO
```

Invariantes:

1. una venta pertenece a una sola fuente empresarial de origen;
2. no existe una franja en la que ambas fuentes tengan autoridad simultánea para nuevas ventas de la misma terminal;
3. no existe una franja sin autoridad definida para ventas que la operación permita crear;
4. el inicio de PULSO no reescribe el intervalo Makos anterior;
5. un ajuste futuro de la autoridad crea una nueva decisión temporal; no edita destructivamente los intervalos históricos;
6. el orden de recepción técnica no determina el intervalo de origen;
7. la fecha de importación de un archivo no determina el intervalo de origen;
8. la fecha de sincronización offline no determina el intervalo de origen;
9. un replay posterior no transforma una venta histórica en venta nueva.

---

#### 7. Gate obligatorio antes de activar un alcance

Un alcance solo puede pasar de diseñado a habilitable cuando existan evidencias suficientes de todas las siguientes condiciones:

1. Makos y el ambiente consultado están acreditados para el alcance de transición.
2. El mecanismo de lectura de la fuente anterior conserva evidencia original.
3. Existe muestra real suficiente para demostrar la granularidad que se pretende cortar.
4. El binding de venta y línea es determinista para el alcance activable.
5. Sede y terminal pueden resolverse sin inferencia.
6. La semántica temporal permite clasificar la venta respecto del límite efectivo.
7. La repetición deliberada de la misma evidencia converge sin ventas duplicadas.
8. El mapping de productos es determinista o las líneas quedan en cuarentena explícita.
9. El evento PULSO puede construirse con identidad estable y procedencia preservada.
10. El piloto sin efectos de `INT-POS-021` ha cerrado sin bloqueos críticos para ese alcance.
11. El piloto con efectos de `INT-POS-022` ha demostrado efectos reales controlados y reconciliables para ese alcance.
12. NEXO recupera o aplica su resultado exactamente una vez cuando corresponde.
13. NUMERA recupera o aplica su resultado exactamente una vez cuando corresponde.
14. PASS recupera o aplica su resultado exactamente una vez cuando corresponde.
15. Los casos `NO_APLICA` de cada consumidora permanecen distinguibles de efectos faltantes.
16. Un resultado desconocido puede resolverse por identidad antes de repetir.
17. La partialidad conserva residual explícito.
18. Una compensación conserva vínculo con su original.
19. La conciliación de `INT-POS-020` no presenta diferencias críticas abiertas para el alcance.
20. La operación puede determinar qué ventas históricas deberán seguir llegando desde Makos después del corte por razones de latencia, revisión o compensación.
21. Existe autoridad operativa para declarar la fecha efectiva.
22. Existe un criterio verificable para detener el corte antes de su entrada en vigor si una precondición deja de cumplirse.

La aprobación documental de `INT-POS-023` no satisface estos gates por sí sola.

---

#### 8. Estado actual del gate

El estado documental del diseño es `ESPECIFICADO`.

El estado de habilitación operativa es `BLOQUEADO`.

La causa es concreta:

- `INT-POS-021` documentó que el estado remoto observado no contenía una muestra Makos disponible para demostrar binding individual repetible;
- `INT-POS-022` es un diseño documental del piloto con efectos y no constituye evidencia de que dicho piloto haya sido ejecutado y conciliado para un alcance real;
- el flujo XLSX observado en PULSO trabaja con agregados por artículo y no demuestra por sí mismo venta individual, línea individual, terminal individual ni evento empresarial individual;
- por tanto no existe base para declarar hoy una sede y terminal listas para transferir autoridad de nuevas ventas.

Condición de salida:

```text
GATE INT-POS-021 SUPERADO
+
GATE INT-POS-022 SUPERADO
+
ALCANCE SEDE/TERMINAL RECONCILIADO
+
LÍMITE EFECTIVO APROBADO
=
ALCANCE HABILITABLE PARA CORTE
```

La ejecución física del corte corresponde a las fases y paquetes de implementación autorizados posteriores, no a esta tarea documental.

---

#### 9. Clasificación obligatoria de cada venta respecto del corte

Toda venta observada durante la convivencia debe poder clasificarse en una sola de las siguientes situaciones:

| Situación                                                                  | Fuente de origen                                  | Tratamiento                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| venta Makos ocurrida antes del límite y recibida antes del corte           | Makos                                             | se procesa conforme al contrato de transición                                              |
| venta Makos ocurrida antes del límite y recibida después                   | Makos                                             | se acepta como llegada tardía histórica; conserva origen y no se vuelve PULSO nativa       |
| revisión Makos posterior de una venta anterior al límite                   | Makos                                             | se vincula a la identidad y revisión históricas; no crea otra venta                        |
| anulación, devolución o reembolso posterior de una venta Makos anterior    | Makos como origen del hecho comercial relacionado | conserva relación con el original y usa compensación cuando corresponda                    |
| nueva venta PULSO originada después del límite en terminal transferida     | PULSO                                             | usa el mismo contrato canónico y puede emitir el evento aplicable una vez                  |
| venta PULSO creada offline después del límite y sincronizada tarde         | PULSO                                             | conserva origen PULSO; el retraso de sincronización no cambia la fuente                    |
| venta atribuida a Makos después del límite en terminal ya transferida      | conflicto de autoridad                            | se conserva evidencia, se bloquea la emisión adicional y se concilia                       |
| misma identidad comercial observada en Makos y PULSO                       | conflicto o duplicado candidato                   | ningún segundo origen se aplica automáticamente; se determina autoridad y resultado previo |
| terminal no resoluble                                                      | indeterminada                                     | `BLOQUEADO`; no se inventa terminal ni se aplica el corte                                  |
| tiempo de ocurrencia insuficiente para ubicar la venta respecto del límite | indeterminada                                     | `BLOQUEADO`; se conserva evidencia y se concilia                                           |
| identidad de venta insuficiente                                            | indeterminada                                     | cuarentena o reconciliación; no se fabrica una venta canónica                              |
| replay o backfill de una venta histórica                                   | conserva la fuente histórica                      | mantiene identidad, procedencia y audiencia; no crea venta nueva                           |

Un total diario o un monto coincidente no resuelve una clasificación ambigua.

---

#### 10. Tiempo de ocurrencia frente a tiempo de recepción

Se preservan como conceptos distintos:

```text
TIEMPO DEL HECHO COMERCIAL
≠
TIEMPO DE RECEPCIÓN
≠
TIEMPO DE IMPORTACIÓN
≠
TIEMPO DE SINCRONIZACIÓN
≠
TIEMPO DE REINTENTO
```

Reglas:

1. el límite efectivo clasifica la autoridad de nuevas ventas con base en la semántica temporal aprobada del hecho, no en el orden accidental de llegada;
2. una recepción tardía no mueve una venta al intervalo posterior;
3. un archivo cargado al día siguiente no cambia el origen de sus hechos;
4. una venta PULSO offline no se vuelve Makos por sincronizarse después;
5. si la fuente no aporta precisión temporal suficiente para separar el alcance, el corte permanece bloqueado para esa terminal hasta contar con una regla acreditada;
6. no se asignan segundos, minutos u horas artificiales para hacer coincidir el límite.

---

#### 11. Identidad histórica durante y después del corte

La transición conserva:

- `canonical_sale_id` o la identidad canónica equivalente definida por el contrato vigente;
- identidad de línea;
- identidad externa cuando exista;
- `source_system`;
- instancia o tenant de origen cuando corresponda;
- revisión;
- timestamps del hecho y de recepción;
- payload original o referencia a evidencia original;
- hash de la evidencia;
- mapping y versión;
- sede y terminal resueltas;
- correlación con evento empresarial;
- efectos y receipts existentes.

Reglas:

1. una venta Makos no recibe una segunda identidad por ser visible después en PULSO;
2. una venta PULSO nativa posterior al corte no recibe una identidad Makos para mantener compatibilidad;
3. el cambio de fuente no renumera líneas históricas;
4. una revisión posterior usa la identidad estable ya aprobada;
5. la procedencia nunca se sobrescribe para simplificar reportes;
6. una migración o backfill posterior no elimina la evidencia externa original.

---

#### 12. Control de doble fuente antes de las consumidoras

La barrera principal se aplica antes de producir un segundo hecho empresarial.

No es suficiente confiar solo en:

```text
consumer_application + event_id + effect_code
```

porque una emisión indebida desde otra fuente podría crear un `event_id` diferente y atravesar una deduplicación puramente consumidora.

La transición debe verificar conjuntamente:

- identidad canónica de la venta;
- sede;
- terminal;
- intervalo de autoridad;
- fuente de origen;
- revisión;
- huella lógica;
- resultado previo;
- evento previamente emitido cuando exista.

Resultado esperado:

```text
MISMA VENTA + MISMO ORIGEN AUTORIZADO + MISMA HUELLA
→ RECUPERAR RESULTADO

MISMA VENTA + FUENTE COMPETIDORA
→ CONFLICTO DE AUTORIDAD
→ CERO SEGUNDA EMISIÓN

MISMA IDENTIDAD + CONTENIDO MATERIAL INCOMPATIBLE
→ CONFLICTO / REVISIÓN SEGÚN CONTRATO
→ CERO SOBRESCRITURA SILENCIOSA
```

---

#### 13. Evento PULSO y procedencia externa

La transición no crea un segundo tipo de evento para ventas PULSO posteriores al corte.

Antes del corte:

```text
MAKOS
→ ADAPTADOR
→ VENTA CANÓNICA EN PULSO
→ EVENTO PULSO
```

Después del corte:

```text
VENTA NATIVA PULSO
→ MISMO CONTRATO CANÓNICO
→ EVENTO PULSO
```

Reglas:

1. PULSO conserva la propiedad del hecho comercial interno y del evento empresarial según el contrato aprobado;
2. una venta originada externamente conserva `source_system = Makos` o su procedencia equivalente;
3. una venta nativa posterior conserva `source_system = PULSO` o la procedencia equivalente aprobada;
4. el consumidor no recibe dos esquemas distintos por el cambio de fuente;
5. un evento histórico no cambia de `event_id` por ocurrir el corte;
6. replay y redelivery conservan `event_id`;
7. una revisión no se representa como otra venta independiente cuando el contrato vigente la trata como revisión del mismo hecho.

---

#### 14. Invariante NEXO

El cambio de fuente no cambia la frontera de inventario.

```text
ANTES
MAKOS → PULSO EVENT → NEXO

DESPUÉS
PULSO → PULSO EVENT → NEXO
```

NEXO continúa decidiendo:

- existencia física elegible;
- producto físico;
- presentación;
- UOM y conversión;
- origen físico;
- partialidad;
- group y legs;
- posting y receipt;
- proyecciones derivadas;
- compensación física.

Reglas:

1. no se crea un `effect_code` diferente por ser venta PULSO nativa;
2. el corte no autoriza a PULSO a escribir stock;
3. el corte no valida el posting legacy del importador como writer canónico;
4. un efecto NEXO de una venta Makos histórica sigue siendo el mismo efecto después del corte;
5. una devolución posterior al corte referencia el efecto físico original cuando exista;
6. una venta duplicada por doble fuente no puede originar un segundo movimiento físico.

---

#### 15. Invariante NUMERA

El cambio de fuente no cambia la frontera económica.

NUMERA continúa recibiendo el hecho económico aplicable desde el evento canónico y conserva su propia identidad de efecto, resultado, materialidad, moneda, entidad, sede, centro, periodo y evidencia.

Reglas:

1. una venta PULSO nativa no utiliza una variante económica distinta por haber cambiado el origen comercial;
2. una venta Makos histórica no se reclasifica económicamente como venta PULSO nueva;
3. el corte no crea otro hecho económico para un evento ya aplicado;
4. una fuente duplicada no autoriza una segunda materialización económica;
5. pagos, caja, bancos y fiscalidad permanecen hechos separados;
6. una devolución o reembolso conserva compensación o reversión según su contrato y no edita destructivamente el hecho original.

---

#### 16. Invariante PASS

El cambio de fuente no crea automáticamente puntos ni altera las reglas de fidelización.

PASS continúa resolviendo:

- cliente y cuenta elegible;
- regla y versión;
- base de cálculo;
- exclusiones;
- aplicación o no aplicación;
- ledger;
- balance derivado;
- redención;
- compensación.

Reglas:

1. la misma venta no acumula de nuevo porque cambie la fuente autorizada de ventas futuras;
2. una venta Makos histórica conserva su referencia de origen;
3. una venta PULSO nativa utiliza la misma evaluación PASS cuando corresponda;
4. una venta sin cuenta PASS continúa siendo válida y puede producir cero puntos;
5. el corte no fusiona clientes por correo, teléfono o nombre;
6. una revisión o devolución posterior usa movimiento compensatorio cuando corresponda, no edición del ledger original;
7. un duplicado de fuente no puede acreditar otra acumulación.

---

#### 17. Pagos, caja y fiscalidad no se transfieren por inferencia

Se preserva:

```text
FUENTE DE VENTA
≠
PROVEEDOR DE PAGO
≠
CAJA
≠
DOCUMENTO FISCAL
≠
CONTABILIDAD OFICIAL
```

Por tanto:

1. hacer a PULSO fuente de nuevas ventas no autoriza automáticamente un cambio de proveedor de pagos;
2. no convierte un intento de pago en movimiento de caja;
3. no convierte una venta en documento fiscal emitido;
4. no transfiere autoridad fiscal desde el proveedor vigente sin una decisión propia aprobada;
5. no convierte NUMERA en contabilidad oficial por el solo corte del POS externo;
6. referencias de pagos y documentos históricos permanecen vinculadas a sus hechos reales;
7. cualquier dependencia de esos sistemas que impida operar PULSO de forma segura debe estar satisfecha por sus tareas propietarias antes del corte operativo.

---

#### 18. Comportamiento del adaptador Makos antes del corte

Mientras Makos conserva autoridad para un alcance:

- el adaptador puede leer la fuente autorizada;
- conserva payload o evidencia original;
- aplica staging, normalización, mapping, cuarentena e idempotencia;
- produce la representación canónica únicamente cuando el binding es suficiente;
- PULSO recibe el hecho comercial sin permitir escritura directa del proveedor;
- las consumidoras reciben únicamente el evento canónico aprobado.

No se amplía la credencial para facilitar el corte.

---

#### 19. Comportamiento del adaptador Makos después del corte

Después del límite efectivo de una sede y terminal, el adaptador puede conservar acceso residual únicamente para finalidades aprobadas como:

- recibir una venta realmente ocurrida antes del límite y entregada tarde;
- recuperar evidencia de una venta histórica;
- recibir una revisión histórica permitida por el contrato;
- correlacionar una anulación, devolución o reembolso con su original;
- apoyar la conciliación de `INT-POS-020`;
- resolver un resultado desconocido o un residual histórico;
- verificar que no existan hechos pendientes antes de retirar el acceso.

Queda prohibido utilizar ese acceso residual para:

- originar nuevas ventas post-corte de una terminal transferida;
- reconstruir en Makos una venta PULSO para que vuelva a ingresar;
- generar una segunda identidad empresarial;
- reemitir efectos ya aplicados;
- mantener dos fuentes activas por conveniencia;
- ampliar scopes o privilegios.

`INT-POS-024` definirá la reducción o revocación de la credencial una vez que la necesidad residual quede resuelta.

---

#### 20. Eventos tardíos y revisiones después del corte

El corte no cierra artificialmente la historia anterior.

Una llegada tardía válida conserva:

- identidad original;
- fuente original;
- tiempo original;
- revisión original o nueva revisión acreditada;
- correlación con la venta;
- correlación con efectos existentes;
- resultado previo cuando exista.

Reglas:

1. `received_at` posterior al corte no convierte el hecho en venta PULSO nativa;
2. una revisión más antigua no sobrescribe una revisión posterior;
3. una revisión nueva no duplica los efectos que no cambian;
4. cualquier diferencia material se trata mediante revisión, conciliación o compensación conforme al contrato;
5. el corte no elimina la capacidad de explicar por qué un hecho anterior llegó después.

---

#### 21. Replay y backfill

Replay y backfill son mecanismos de recuperación, no mecanismos para cambiar la fuente histórica.

Deben conservar:

- identidad del hecho;
- `event_id` cuando el evento ya existía;
- audiencia histórica;
- procedencia;
- versión;
- presupuesto de retry aplicable;
- resultado previo;
- referencias a receipts existentes.

Queda prohibido:

- crear un evento nuevo porque la fecha de replay sea posterior al corte;
- agregar consumidoras nuevas a un evento histórico por defecto;
- volver a aplicar un efecto sensible ya confirmado;
- cambiar `source_system` de Makos a PULSO para simplificar el backfill;
- usar el batch como identidad empresarial de la venta.

---

#### 22. Offline y degradación de PULSO después del corte

Una falla de conectividad o sincronización no devuelve automáticamente la autoridad a Makos.

Para una terminal ya transferida:

1. una venta PULSO creada bajo el mecanismo offline autorizado conserva origen PULSO;
2. su sincronización posterior mantiene la misma identidad empresarial;
3. reintentos no crean otra venta;
4. Makos no se usa como fallback para reemitir esa misma venta;
5. si PULSO no puede aceptar nuevas ventas de forma segura, la contingencia operativa aplicable debe provenir del proceso y paquete autorizado correspondiente;
6. reactivar una fuente externa para nuevas ventas exige una nueva decisión explícita de autoridad y un límite efectivo no solapado;
7. ninguna contingencia puede alterar los intervalos históricos ya materializados.

Esta tarea no inventa una modalidad offline, terminal alterna ni procedimiento operativo que no esté aprobado en sus tareas propietarias.

---

#### 23. Anulaciones, devoluciones, reembolsos y compensaciones cruzando el corte

El corte de fuente no corta la causalidad.

Ejemplo normativo:

```text
VENTA MAKOS PRE-CORTE
        ↓
EFECTOS APLICADOS
        ↓
CORTE A PULSO
        ↓
DEVOLUCIÓN POST-CORTE DE ESA VENTA
        ↓
REFERENCIA A LA VENTA MAKOS ORIGINAL
        ↓
COMPENSACIONES PROPIETARIAS
```

No:

```text
DEVOLUCIÓN POST-CORTE
→ NUEVA VENTA PULSO NEGATIVA
```

Reglas:

1. la acción posterior conserva el original al que responde;
2. cada propietaria compensa únicamente su propio efecto confirmado;
3. si el efecto original nunca ocurrió, no se fabrica una reversa;
4. si el resultado original es desconocido, se resuelve antes de compensar;
5. partialidad conserva alcance compensado y residual;
6. una compensación no reabre autoridad de fuente para ventas nuevas;
7. el adaptador puede seguir aportando evidencia histórica sin convertirse en writer de NEXO, NUMERA o PASS.

---

#### 24. Conciliación de convivencia durante el corte

La conciliación de `INT-POS-020` permanece obligatoria durante la transición y debe poder comparar al menos:

```text
INTERVALO DE AUTORIDAD
↔ FUENTE OBSERVADA
↔ VENTA CANÓNICA
↔ LÍNEAS
↔ EVENTO PULSO
↔ NEXO
↔ NUMERA
↔ PASS
↔ COMPENSACIONES
```

Debe detectar, como mínimo:

- venta Makos pre-corte que no llegó a PULSO cuando debía;
- venta Makos post-corte en terminal ya transferida;
- venta PULSO pre-corte en un alcance todavía externo sin autorización;
- la misma venta observada en ambas fuentes;
- dos eventos para la misma venta;
- venta sin evento cuando el evento era obligatorio;
- efecto sin venta;
- dos efectos incompatibles;
- venta con fuente o terminal no resolubles;
- evento tardío correctamente atribuible al intervalo anterior;
- revisión histórica no aplicada o aplicada dos veces;
- compensación sin original;
- original que requería compensación y conserva residual;
- resultado desconocido sin resolución;
- diferencia de totals sin identidad individual suficiente.

La igualdad de totales diarios no cierra por sí sola la conciliación.

---

#### 25. Condiciones para declarar efectivo un corte

Un alcance puede declararse efectivamente transferido solo cuando:

1. la sede está identificada inequívocamente;
2. la terminal está identificada inequívocamente;
3. la fecha efectiva y su precisión aplicable están acreditadas;
4. el intervalo Makos anterior y el intervalo PULSO posterior no se solapan;
5. los gates 021 y 022 están superados para el alcance;
6. no existen bloqueos críticos de binding;
7. la identidad de venta y línea es estable;
8. el mecanismo PULSO produce el contrato canónico sin pasar por una semántica paralela;
9. la publicación produce una única audiencia aprobada;
10. NEXO, NUMERA y PASS mantienen contratos independientes;
11. un retry recupera el resultado sin duplicar;
12. un resultado desconocido puede investigarse por identidad;
13. partialidad y residuales quedan observables;
14. las compensaciones conservan original;
15. la conciliación previa al corte no tiene diferencias críticas incompatibles con la transferencia;
16. la operación conoce cómo tratar llegadas Makos históricas posteriores al corte;
17. la credencial externa conserva únicamente el acceso residual que todavía sea necesario y permitido hasta `INT-POS-024`;
18. no se presenta el corte como transferencia automática de pagos, fiscalidad o contabilidad.

---

#### 26. Fallo o cancelación antes del límite efectivo

Mientras el límite todavía no haya entrado en vigor, una decisión autorizada puede impedir que el corte se active si un gate deja de cumplirse.

Resultado:

- Makos conserva autoridad del alcance anterior;
- PULSO no comienza a originar nuevas ventas para ese alcance por esta transición;
- no se altera historia;
- no se aplican compensaciones porque el corte no produjo efectos por sí mismo;
- se conserva la evidencia del intento y la causa del bloqueo;
- una futura programación de corte deberá volver a demostrar las precondiciones aplicables.

No se considera rollback de datos porque el cambio de autoridad todavía no había entrado en vigor.

---

#### 27. Reasignación posterior a un corte ya efectivo

Después de que PULSO haya originado ventas legítimas bajo un intervalo efectivo, volver a Makos no puede implementarse como simple retorno al estado anterior.

Debe tratarse como una nueva decisión temporal de autoridad porque ya existe historia PULSO válida.

Invariantes:

1. el intervalo Makos original no se extiende retroactivamente;
2. el intervalo PULSO ya ejecutado no se borra;
3. las ventas PULSO ya creadas permanecen PULSO;
4. una nueva fuente futura solo puede iniciar en otro límite efectivo explícito;
5. los intervalos no pueden solaparse;
6. las consumidoras no reejecutan efectos por el cambio;
7. la conciliación debe demostrar que no existen ventas en doble fuente alrededor del nuevo límite;
8. cualquier contingencia que requiera esta reasignación deberá estar autorizada por las tareas operativas y de implementación correspondientes.

`INT-POS-023` define la invariancia documental; no ejecuta una reasignación física.

---

#### 28. Diagnóstico de la implementación PULSO observada

La línea base técnica observada conserva un importador `makos_excel` que:

- procesa un XLSX por artículo;
- calcula un hash del archivo;
- registra lotes y filas de staging;
- resuelve coincidencias de catálogo;
- puede dejar filas no resueltas;
- conserva una acción posterior de posting legacy.

La granularidad observable del parser continúa siendo agregada por producto y no demuestra por sí misma:

- identidad de venta individual;
- identidad de línea dentro de una venta individual;
- terminal individual de origen;
- cliente individual;
- pago individual;
- evento PULSO individual.

Además, la coincidencia técnica actual puede recurrir a código o nombre cuando no existe mapping MID explícito. Ese comportamiento existente no modifica la regla canónica de mapping y no puede utilizarse como prueba suficiente del binding requerido para el corte.

Consecuencia:

```text
IMPORTADOR MAKOS_EXCEL ACTUAL
≠
MECANISMO SUFICIENTE PARA ACTIVAR EL CORTE
```

La implementación futura deberá ajustarse a los contratos aprobados antes de que una sede y terminal puedan declararse transferidas.

---

#### 29. Evidencia mínima del futuro corte

La ejecución posterior deberá conservar evidencia reproducible de:

- sede incluida;
- terminal incluida;
- fecha efectiva;
- precisión temporal utilizada;
- fuente anterior;
- fuente posterior;
- versión del contrato;
- evidencia de `INT-POS-021` para el alcance;
- evidencia de `INT-POS-022` para el alcance;
- muestra y binding usados para decidir readiness;
- reglas de mapping aplicables;
- pendientes o cuarentenas aceptadas;
- conciliación inmediatamente anterior al corte;
- primera venta PULSO válida del intervalo posterior;
- última venta Makos válida del intervalo anterior cuando sea determinable;
- llegadas tardías posteriores;
- duplicados o conflictos detectados;
- eventos emitidos;
- receipts de consumidoras cuando correspondan;
- resultados desconocidos y su resolución;
- compensaciones y residuales;
- decisión de mantener, reducir o retirar acceso Makos para la etapa siguiente.

No se considera evidencia suficiente un total agregado sin correlación individual cuando el alcance activado requiere identidad individual.

---

#### 30. Handoff exacto hacia `INT-POS-024`

`INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente` recibe de esta tarea, por cada alcance efectivamente cortado en una ejecución futura:

1. sede transferida;
2. terminal transferida;
3. fecha efectiva y precisión utilizada;
4. confirmación de que PULSO es autoridad de nuevas ventas del intervalo posterior;
5. listado o estado de residuales históricos que todavía requieren lectura Makos;
6. ventanas o referencias históricas pendientes de conciliación;
7. eventos tardíos todavía posibles según el contrato acreditado;
8. casos de resultado desconocido aún abiertos;
9. compensaciones históricas pendientes de evidencia externa;
10. alcance mínimo de lectura que, si todavía es necesario, debe conservarse temporalmente;
11. condición objetiva para reducir ese acceso;
12. condición objetiva para revocarlo por completo.

`INT-POS-024` no recibe permiso para borrar historia ni para retirar acceso antes de que los residuales que lo necesiten tengan destino y evidencia suficientes.

---

#### 31. Continuidad permanente hacia `INT-SALES-*`

La transición temporal deja preservadas las siguientes responsabilidades permanentes:

| Tarea           | Responsabilidad preservada                                                                    |
| --------------- | --------------------------------------------------------------------------------------------- |
| `INT-SALES-007` | control permanente contra efectos duplicados por reintento                                    |
| `INT-SALES-008` | conciliación permanente de convivencia entre POS externo y PULSO mientras exista coexistencia |
| `INT-SALES-009` | contrato permanente de corte por sede, terminal y fecha efectiva                              |
| `INT-SALES-010` | control permanente que impide que ambas fuentes emitan la misma venta                         |
| `INT-SALES-011` | retiro del adaptador externo sin modificar consumidoras internas                              |

La aprobación de `INT-POS-023` no inicia ni aprueba ninguna de esas tareas.

---

#### 32. Matriz de propiedad de pendientes y bloqueos

| Materia                           | Estado al cerrar esta tarea documental       | Propietaria exacta                                                          | Condición de salida                                                           |
| --------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| evidencia real de binding Makos   | `BLOQUEADO` para ejecución                   | `INT-POS-021`                                                               | muestra real autorizada y binding reproducible sin efectos                    |
| piloto real con efectos           | `BLOQUEADO` para ejecución                   | `INT-POS-022`                                                               | alcance controlado demuestra efectos, idempotencia, receipts y conciliación   |
| definición de autoridad de fuente | `ESPECIFICADO`                               | `INT-POS-023`                                                               | sede, terminal e intervalo quedan definidos por este contrato                 |
| activación física del corte       | `FUERA_DE_ALCANCE` de esta fase              | paquetes de implementación que materialicen `INT-POS-023` y `INT-SALES-009` | implementación autorizada y gates satisfechos                                 |
| doble fuente permanente           | `ESPECIFICADO` como invariante temporal      | `INT-SALES-010`                                                             | control permanente implementado y probado                                     |
| convivencia y diferencias         | `ESPECIFICADO` mediante conciliación vigente | `INT-SALES-008`                                                             | conciliación permanente implementada para coexistencia                        |
| reducción de acceso Makos         | `RESERVADO`                                  | `INT-POS-024`                                                               | alcance cortado y necesidades residuales clasificadas                         |
| retiro definitivo del adaptador   | `RESERVADO`                                  | `INT-SALES-011`                                                             | no existen consumidoras dependientes ni residuales que requieran el adaptador |
| fiscalidad                        | `FUERA_DE_ALCANCE` del cambio de fuente      | contrato y tareas fiscales propietarias                                     | proveedor y autoridad fiscal aprobados explícitamente                         |
| pagos                             | `FUERA_DE_ALCANCE` del cambio de fuente      | contrato y tareas de pago propietarias                                      | integración de pagos aprobada y validada por su propia frontera               |

No queda un pendiente narrativo sin tarea propietaria o condición de salida.

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea materializa el corte de autoridad de fuente que ya está protegido expresamente por el registro canónico vigente: transición del POS externo mediante adaptador, staging, evidencia, mapping, cuarentena e idempotencia; corte por sede, terminal y fecha efectiva; prohibición de doble emisión; efectos exactamente una vez; replay y reintentos sin duplicación; separación de consumidoras; compensación no destructiva y conciliación de ventas, efectos y pendientes. No introduce una obligación ejecutable independiente fuera de esa cobertura ni modifica el comportamiento protegido por una fila histórica.

---

#### 34. Cobertura de prueba existente preservada

Se preservan sin modificación, en especial:

- `TREQ-INTEGRATION-003`, sobre clave estable, huella, resultado recuperable, conflictos, retry, resultado desconocido, inbox/outbox y conciliación;
- `TREQ-INTEGRATION-006`, sobre fuente empresarial única, fuentes competidoras, diferencias y conservación de historia;
- `TREQ-INTEGRATION-011`, sobre efectos físicos exactamente una vez y compensación correlacionada;
- `TREQ-INTEGRATION-014`, que cubre explícitamente `INT-POS-001` a `INT-POS-024`, define el corte por sede, terminal y fecha efectiva e impide doble emisión entre POS externo y PULSO;
- `TREQ-INTEGRATION-015`, sobre compensaciones y fidelización correlacionadas;
- `TREQ-INTEGRATION-017`, sobre hechos NUMERA versionados, correlacionados e idempotentes;
- `TREQ-INTEGRATION-151`, sobre retry crítico con conciliación;
- `TREQ-INTEGRATION-154`, sobre eventos fuera de orden;
- `TREQ-INTEGRATION-155`, sobre replay y backfill preservando identidad y audiencia;
- `TREQ-INTEGRATION-159`, sobre independencia de consumidoras;
- `TREQ-INTEGRATION-160`, sobre salidas explícitas al agotar retry;
- `TREQ-INTEGRATION-161`, sobre prohibición de compensación automática por agotamiento;
- `TREQ-PULSO-001`, sobre demostración end-to-end antes de declarar operativo el POS interno;
- `TREQ-PULSO-005`, sobre separación del ciclo comercial y estados derivados;
- `TREQ-PULSO-006`, sobre venta, pago, caja, fiscalidad y reversos separados;
- `TREQ-NEXO-011`, sobre ledger físico, proyecciones reconciliables e idempotencia;
- `TREQ-NUMERA-001` y `TREQ-NUMERA-002`, sobre reconciliación, identidad económica e historia no destructiva;
- `TREQ-PASS-008` y `TREQ-PASS-010`, sobre ledger de fidelización autorizado, atómico, idempotente y reconciliable.

Ningún requisito cambia de identidad, texto, estado, relación, secuencia, propietaria ni evidencia por esta tarea.

---

#### 35. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-022` como tarea anterior;
2. mantiene `INT-POS-024` como única tarea siguiente;
3. define la transición como cambio de autoridad de fuente y no como copia destructiva;
4. conserva Makos como fuente temporal de sus ventas anteriores al corte;
5. define PULSO como fuente de nuevas ventas posteriores al corte del alcance;
6. define la unidad del corte mediante sede, terminal y fecha efectiva;
7. exige precisión temporal suficiente para evitar ambigüedad;
8. prohíbe intervalos solapados de autoridad;
9. prohíbe intervalos implícitos sin fuente para ventas autorizadas;
10. conserva identidad de venta y línea a través del corte;
11. conserva procedencia Makos para ventas históricas;
12. impide reclasificar un backfill como venta PULSO nativa;
13. separa tiempo de ocurrencia, recepción, importación, sincronización y retry;
14. clasifica ventas pre-corte recibidas después como hechos históricos de la fuente anterior;
15. clasifica ventas PULSO offline post-corte como PULSO;
16. trata una venta Makos post-corte en terminal transferida como conflicto;
17. trata una venta observada en ambas fuentes como conflicto o duplicado candidato;
18. bloquea cuando terminal o tiempo no pueden resolverse;
19. prohíbe inferir identidad desde totales agregados;
20. aplica el control de doble fuente antes de un segundo evento empresarial;
21. conserva idempotencia de consumidoras además del control de fuente;
22. conserva un único contrato de evento PULSO;
23. mantiene el mismo contrato NEXO antes y después del corte;
24. mantiene el mismo contrato NUMERA antes y después del corte;
25. mantiene el mismo contrato PASS antes y después del corte;
26. impide que el corte transfiera pagos por inferencia;
27. impide que el corte transfiera fiscalidad por inferencia;
28. define el uso residual permitido del adaptador Makos después del corte;
29. prohíbe que el acceso residual origine nuevas ventas post-corte;
30. preserva eventos tardíos y revisiones históricas;
31. preserva replay y backfill sin nueva audiencia ni nueva identidad;
32. impide fallback automático de PULSO hacia Makos después del corte;
33. exige nueva decisión temporal para una reasignación posterior de autoridad;
34. preserva anulaciones, devoluciones, reembolsos y compensaciones a través del corte;
35. reutiliza `INT-POS-020` para la conciliación de convivencia;
36. impide cerrar conciliación por igualdad de totales solamente;
37. define gates suficientes para declarar efectivo un corte;
38. documenta que el estado actual del corte permanece `BLOQUEADO`;
39. diagnostica el importador `makos_excel` actual como insuficiente para activar el corte individual;
40. define evidencia mínima para una futura ejecución;
41. entrega a `INT-POS-024` el estado exacto de autoridad y residuales requerido para decidir credenciales;
42. conserva `INT-SALES-007` a `INT-SALES-011` como responsabilidades permanentes;
43. asigna cada bloqueo o pendiente a tarea propietaria y condición de salida;
44. genera cero requisitos nuevos de prueba;
45. modifica cero requisitos de prueba;
46. no genera una copia del registro canónico de requisitos;
47. no modifica código, SQL, migraciones, Supabase, datos, credenciales, endpoints, webhooks ni configuración remota;
48. no activa físicamente ninguna sede o terminal;
49. no publica ventas, eventos ni efectos adicionales;
50. mantiene `INT-POS-024` como única siguiente tarea reservada.

---

#### 36. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-022 — Diseñar piloto controlado con efectos habilitados`

TAREA ACTUAL APROBADA

`INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`

SIGUIENTE TAREA RESERVADA

`INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente`


### ✅ INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente

**Estado:** APROBADA  
**Tarea anterior:** `INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`  
**Tarea siguiente:** `INT-SALES-001 — Definir contrato para que PULSO registre la venta`  
**Tipo de tarea:** documental; definición normativa y materializada del tratamiento de las credenciales y accesos del POS externo cuando PULSO asuma la autoridad de nuevas ventas para un alcance cortado, distinguiendo mantenimiento residual mínimo, reducción, revocación, retiro local, no aplicabilidad y bloqueo por evidencia, sin ejecutar revocaciones, crear credenciales, modificar cuentas externas, retirar físicamente el adaptador, modificar código, SQL, migraciones, Supabase, datos, endpoints, webhooks o configuración remota durante esta tarea  
**Fase:** exclusivamente documental  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md`  
**POS externo vigente durante la transición:** `Makos`  
**Fuente empresarial objetivo de nuevas ventas después del corte:** `PULSO`  
**Identidad externa de inventario relacionada:** `EXT-SYS-013 — POS externo vigente`  
**Cambios físicos autorizados:** ninguno  
**Estado operativo actual del retiro de credencial:** `BLOQUEADO_POR_EVIDENCIA`  
**Fundamento del bloqueo:** Makos está identificado como POS externo vigente, pero el binding técnico del tenant, la credencial real, su autoridad de revocación y sus capacidades de reducción siguen sin acreditación suficiente; además, el corte de fuente definido en `INT-POS-023` no ha sido ejecutado por esta fase documental

---

#### 1. Propósito

Definir cómo debe reducirse o revocarse el acceso técnico del POS externo cuando PULSO haya asumido de forma efectiva la autoridad sobre las nuevas ventas de un alcance, sin borrar historia, perder evidencia necesaria, afectar superficies externas que no pertenezcan al corte de ventas ni conservar privilegios innecesarios por conveniencia.

La tarea especializa para la transición Makos → PULSO los contratos ya aprobados de lifecycle y retiro de integraciones externas.

Regla raíz:

```text
PULSO ASUME AUTORIDAD DE NUEVAS VENTAS
        ↓
CLASIFICAR NECESIDAD RESIDUAL REAL DE MAKOS
        ├── EXISTE Y ESTÁ ACREDITADA
        │       ↓
        │   CONSERVAR O REDUCIR AL MÍNIMO NECESARIO
        │       ↓
        │   CERRAR RESIDUALES
        │       ↓
        │   REVOCAR CUANDO YA NO SEA NECESARIO
        │
        ├── NO EXISTE
        │       ↓
        │   REVOCAR CREDENCIAL APLICABLE
        │       ↓
        │   ACREDITAR INVALIDEZ
        │       ↓
        │   RETIRAR REFERENCIAS LOCALES OBSOLETAS
        │
        └── NO PUEDE ACREDITARSE EL BINDING O LA CREDENCIAL
                ↓
            BLOQUEADO_POR_EVIDENCIA
```

El objetivo no es “apagar Makos” de manera global. El objetivo es que ninguna capacidad técnica vinculada a la fuente anterior conserve más autoridad o alcance del estrictamente necesario después del corte.

---

#### 2. Resultado sustantivo

`INT-POS-024` deja materializadas las siguientes decisiones obligatorias:

1. La autoridad de fuente definida por `INT-POS-023` y el lifecycle de credenciales son controles distintos pero coordinados.
2. PULSO puede ser autoridad de nuevas ventas de un alcance aunque todavía exista acceso Makos exclusivamente para historia, evidencia o conciliación acreditadas.
3. Un acceso Makos residual no puede originar nuevas ventas dentro de un alcance ya transferido a PULSO.
4. No se conserva una credencial externa por conveniencia, fallback implícito o posibilidad futura no aprobada.
5. No se revoca una credencial a ciegas cuando todavía existan residuales históricos que requieran legítimamente esa superficie y no exista otra evidencia suficiente.
6. La necesidad residual debe estar identificada por alcance, finalidad, propietario y condición de salida.
7. Cuando el proveedor permita reducir privilegios, la credencial residual queda limitada al mínimo técnicamente suficiente para la necesidad acreditada.
8. La reducción nunca amplía scope, ambiente, cuenta, tenant, principal técnico ni autoridad empresarial.
9. Si el proveedor no soporta la granularidad necesaria, no se inventa una reducción inexistente.
10. Si la credencial cubre un alcance mayor que el corte de una sede o terminal, la revocación parcial solo puede ejecutarse cuando el mecanismo real permita separar el material sin afectar alcances todavía legítimos.
11. Cuando no exista dependencia residual legítima, la credencial aplicable debe revocarse en la autoridad que realmente puede aceptarla.
12. Eliminar una variable, archivo, referencia local o configuración no demuestra revocación.
13. Una credencial revocada no se reactiva; cualquier futura habilitación usa material válido bajo una nueva decisión autorizada.
14. Si existe compromiso o sospecha razonable de compromiso, la seguridad prevalece: se bloquea nuevo uso y se revoca conforme al lifecycle aplicable sin mantener el material comprometido para completar un drenaje ordinario.
15. El retiro de la credencial no borra ventas, receipts, mappings, payloads gobernados, auditoría, conciliaciones, compensaciones ni referencias históricas necesarias.
16. Los eventos Makos históricos recibidos tarde conservan su fuente original aunque la credencial ya haya sido reducida o retirada.
17. Replay y backfill históricos no reabren autoridad de fuente ni justifican una credencial más amplia.
18. El retiro de la credencial de ventas no implica retirar credenciales o cuentas pertenecientes a pagos, fiscalidad, administración u otra superficie que conserve contrato propio.
19. Una cuenta humana, una cuenta administrativa del proveedor y una credencial técnica de integración no se tratan como el mismo objeto.
20. Si el acceso existente resulta ser humano, compartido o no segregado, no se lo revoca por inferencia como si fuera una credencial exclusiva de integración; se clasifica el hallazgo y se resuelve su ownership antes de una acción física.
21. El secreto o valor material nunca forma parte de la evidencia documental de reducción o revocación.
22. La evidencia conserva referencias no sensibles, alcance, ambiente, principal, consumidores, motivo, decisión, autoridad de revocación, momento efectivo y resultado verificable cuando exista.
23. NEXO, NUMERA y PASS no cambian contratos ni credenciales por esta transición.
24. La revocación de Makos no autoriza escrituras directas, compensaciones, correcciones ni cierres sobre dominios internos.
25. El retiro físico definitivo del adaptador externo permanece en `INT-SALES-011`; esta tarea solo gobierna el acceso del POS externo dentro de la transición temporal.
26. Se crean cero requisitos `TREQ-*` y se modifican cero requisitos `TREQ-*` porque la transición POS externo → PULSO, el lifecycle de credenciales y el retiro de integraciones ya disponen de cobertura canónica vigente.
27. Se crean cero objetos físicos y se modifican cero objetos físicos.

---

#### 3. Dependencias consumidas y preservadas

La tarea consume sin reabrir:

- `INT-POS-001`, que identifica a Makos como POS externo vigente y mantiene sin demostrar el binding API/webhook y sus credenciales técnicas;
- `INT-POS-002`, para cualquier capacidad real que deba acreditarse con evidencia del proveedor o tenant;
- `INT-POS-003`, para la autoridad temporal del POS externo sobre el hecho de venta;
- `INT-POS-004`, para credencial independiente, revocable, separada de actores humanos, con lectura efectiva como techo inicial y sin acceso directo a Supabase;
- `INT-POS-009`, para conservación gobernada de payload, versión, hash, recepción y procedencia;
- `INT-POS-013`, para identidad e idempotencia de la fuente externa;
- `INT-POS-014`, para transports externos sin alterar la semántica del hecho;
- `INT-POS-019`, para compensaciones sin borrar historia;
- `INT-POS-020`, para conciliación diaria de ventas y efectos;
- `INT-POS-021`, para binding real sin efectos;
- `INT-POS-022`, para piloto controlado con efectos;
- `INT-POS-023`, para el corte de autoridad por sede, terminal y fecha efectiva y para el handoff de residuales históricos;
- `INT-EXT-005`, para mínimo privilegio;
- `INT-EXT-006`, para separación por ambiente;
- `INT-EXT-007`, para custodia segura y clasificación del material;
- `INT-EXT-008`, para rotación, expiración, revocación y retiro local;
- `INT-EXT-019`, para retiro controlado de una integración y preservación histórica;
- `INT-EXT-020`, para la prohibición de credenciales compartidas entre integraciones, sin redefinirla aquí;
- `INT-SALES-008` a `INT-SALES-011`, como responsabilidades permanentes de convivencia, corte, doble fuente y retiro del adaptador.

Ninguna dependencia se interpreta como evidencia de que una credencial Makos concreta exista, esté activa, sea de un tipo específico o soporte un scope determinado.

---

#### 4. Unidad de decisión

La decisión de credencial no se toma globalmente por nombre de proveedor.

La unidad mínima deberá poder distinguir, cuando exista evidencia real:

```text
SISTEMA / PROVEEDOR
+
CUENTA O INSTANCIA
+
AMBIENTE
+
INTEGRATION PRINCIPAL
+
SUPERFICIE DE CREDENCIAL
+
CREDENTIAL REF NO SENSIBLE
+
CONSUMIDORES AUTORIZADOS
+
ALCANCE TÉCNICO REAL
+
ALCANCE DE CORTE RELACIONADO
+
NECESIDAD RESIDUAL
→ DECISIÓN DE ACCESO
```

La sede, terminal y fecha efectiva gobiernan la autoridad de ventas. No se presume que el proveedor permita expresar esos mismos límites como scopes de credencial.

---

#### 5. Vocabulario de decisión

Para cada superficie aplicable se utiliza una de estas decisiones:

| Decisión                   | Semántica                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MANTENER_RESIDUAL_MINIMO` | todavía existe una necesidad histórica o de conciliación acreditada y el material vigente ya está limitado al mínimo disponible sin autoridad para nuevas ventas |
| `REDUCIR`                  | existe necesidad residual, pero el mecanismo real permite disminuir scopes, superficies, consumidores o privilegios sin perder la evidencia necesaria            |
| `REVOCAR`                  | ya no existe consumidor o residual legítimo que requiera el material, o la seguridad exige invalidarlo de inmediato                                              |
| `NO_APLICA_CREDENCIAL`     | el mecanismo material no utiliza una credencial externa revocable para esa superficie o no existe material aplicable que retirar                                 |
| `BLOQUEADO_POR_EVIDENCIA`  | no puede identificarse con seguridad la credencial, autoridad de revocación, consumidor, alcance, dependencia o capacidad real de reducción                      |

Estas decisiones son documentales. No equivalen a una mutación remota ya ejecutada.

---

#### 6. Matriz de decisión por estado del corte

| Estado del alcance | Necesidad Makos posterior                                      | Decisión documental                  | Regla                                                                                            |
| ------------------ | -------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| corte no efectivo  | operación temporal todavía autorizada                          | `NO_EJECUTAR_RETIRO`                 | Makos conserva la autoridad definida para el intervalo anterior; esta tarea no adelanta el corte |
| corte efectivo     | residuales históricos acreditados y acceso ya mínimo           | `MANTENER_RESIDUAL_MINIMO`           | solo lectura/evidencia/conciliación; cero autoridad para nuevas ventas                           |
| corte efectivo     | residuales históricos acreditados y scope reducible            | `REDUCIR`                            | limitar al mínimo que el proveedor realmente soporte                                             |
| corte efectivo     | cero residuales dependientes                                   | `REVOCAR`                            | invalidar en la autoridad aceptante y luego retirar referencias obsoletas                        |
| cualquier estado   | material comprometido o confianza rota                         | `REVOCAR` con prioridad de seguridad | no conservar material comprometido para drenaje ordinario                                        |
| cualquier estado   | no existe credencial externa aplicable                         | `NO_APLICA_CREDENCIAL`               | no fabricar una operación de revocación                                                          |
| cualquier estado   | binding, consumidores o autoridad de revocación no acreditados | `BLOQUEADO_POR_EVIDENCIA`            | no ejecutar ni afirmar reducción o revocación                                                    |

`NO_EJECUTAR_RETIRO` es una condición de la decisión de transición y no un estado nuevo del lifecycle de credenciales.

---

#### 7. Necesidad residual válida después del corte

Una credencial Makos solo puede mantenerse temporalmente después del corte cuando exista una necesidad concreta y acreditada, por ejemplo:

- consultar una venta Makos pre-corte todavía pendiente de binding;
- resolver un resultado desconocido de una operación histórica;
- obtener evidencia necesaria para una conciliación abierta;
- verificar una revisión tardía del hecho original;
- soportar una compensación histórica que requiera evidencia externa;
- cerrar un residual expresamente entregado por `INT-POS-023`.

Cada residual deberá conservar:

- identidad o referencia del caso;
- alcance de origen;
- finalidad de la consulta;
- propietario;
- superficie de Makos necesaria;
- acceso mínimo requerido;
- evidencia faltante;
- siguiente acción;
- condición objetiva de cierre.

No son necesidades residuales válidas:

- “por si acaso”;
- fallback automático de PULSO;
- posibilidad de volver a Makos sin una nueva decisión de autoridad;
- generar nuevas ventas en la terminal transferida;
- mantener una segunda fuente activa;
- ampliar el periodo histórico sin motivo;
- conservar escritura porque el proveedor la incluya por defecto cuando exista una alternativa de menor privilegio acreditada.

---

#### 8. Regla de reducción de alcance

`REDUCIR` solo puede materializarse cuando el mecanismo real del proveedor permita demostrar qué privilegio se retira y cuál permanece.

La reducción puede afectar, según capacidades realmente acreditadas:

- operaciones permitidas;
- superficies o recursos consultables;
- consumidores técnicos;
- cuenta o instancia;
- ambiente;
- ventanas o permisos históricos si el proveedor los modela;
- otros scopes nativos realmente documentados.

Queda prohibido afirmar que existe scope por sede, terminal, fecha, endpoint o acción si el proveedor no lo acredita.

Resultado esperado de una reducción válida:

```text
CAPACIDAD ANTERIOR
-
CAPACIDAD YA INNECESARIA
=
CAPACIDAD RESIDUAL MÍNIMA ACREDITADA
```

La capacidad residual nunca incluye autoridad empresarial para nuevas ventas post-corte.

---

#### 9. Credencial de granularidad más amplia que el corte

Puede ocurrir que una sola credencial real cubra varias sedes, terminales o superficies mientras `INT-POS-023` corta la autoridad de ventas con mayor granularidad.

Reglas:

1. no se representa una revocación parcial si la autoridad externa no la soporta;
2. no se revoca material que todavía sea indispensable para un alcance externo legítimo no transferido;
3. no se usa el alcance amplio de la credencial como argumento para mantener a Makos como segunda fuente de un alcance ya cortado;
4. el adaptador debe bloquear semánticamente nuevas ventas post-corte aunque la credencial técnica siga siendo capaz de leerlas;
5. cuando el proveedor permita separar material, una implementación posterior podrá crear o adoptar referencias segregadas conforme al lifecycle aprobado;
6. cualquier solapamiento técnico debe tener propietario y condición de cierre; no puede convertirse en validez dual indefinida.

Si la separación es necesaria para revocar de forma segura y no existe mecanismo acreditado, el resultado permanece `BLOQUEADO_POR_EVIDENCIA` o `MANTENER_RESIDUAL_MINIMO` según exista una dependencia legítima demostrada.

---

#### 10. Revocación completa

`REVOCAR` exige distinguir cuatro hechos:

```text
DEJAR DE USAR
≠
DESACTIVAR BINDING
≠
REVOCAR EN AUTORIDAD EXTERNA
≠
RETIRAR REFERENCIA LOCAL
```

Una revocación completa futura deberá demostrar, cuando aplique:

1. alcance y credencial identificados por referencia no sensible;
2. ausencia de nuevos consumidores legítimos;
3. residuales cerrados o con ruta que no dependa del material;
4. binding desactivado para nuevas operaciones del alcance;
5. invalidación en la autoridad que acepta la credencial;
6. rechazo del material anterior cuando exista una prueba segura soportada;
7. ausencia de fallback hacia el material retirado;
8. referencias activas retiradas de consumidores;
9. copias obsoletas tratadas conforme a la custodia aprobada;
10. historia y evidencia preservadas sin conservar el valor secreto.

Si una de las puertas aplicables no puede demostrarse, no se declara revocación completa.

---

#### 11. Revocación de emergencia

Ante exposición confirmada o sospecha razonable de compromiso:

```text
BLOQUEAR NUEVO USO
→ REVOCAR EN LA AUTORIDAD
→ ACREDITAR INVALIDEZ CUANDO SEA POSIBLE
→ CLASIFICAR IMPACTO
→ CONCILIAR RESULTADOS Y RESIDUALES
```

La credencial comprometida no se conserva activa para consultar pendientes por comodidad.

La recuperación de evidencia deberá usar otra superficie autorizada, una credencial sucesora correctamente gobernada o una ruta manual/controlada que la tarea de implementación aplicable haya autorizado.

---

#### 12. Accesos humanos, administrativos y técnicos

La transición distingue:

```text
USUARIO HUMANO MAKOS
≠
CUENTA ADMINISTRATIVA MAKOS
≠
INTEGRATION PRINCIPAL VENTO
≠
CREDENCIAL TÉCNICA DEL BINDING
```

Reglas:

1. una credencial técnica no se reemplaza por la contraseña de un empleado;
2. una cuenta humana no se elimina solo porque PULSO asuma las ventas si conserva otra finalidad empresarial autorizada;
3. una cuenta humana que solo exista para sostener la integración deberá tratarse por su contrato de identidad y offboarding correspondiente, no como si fuera automáticamente una API key;
4. una cuenta administrativa del proveedor no se revoca por inferencia si administra otras superficies válidas;
5. una futura reducción debe operar sobre el material y la autoridad exactos que correspondan.

---

#### 13. Separación de superficies ajenas al corte de ventas

El cambio de fuente de ventas no autoriza a retirar por inferencia:

- facturación o documento fiscal;
- pagos;
- tesorería;
- informes que sigan teniendo finalidad autorizada;
- administración contractual de la cuenta;
- soporte del proveedor;
- evidencia histórica sujeta a retención;
- cualquier otra superficie con propietario y contrato independientes.

Si una misma credencial material cubre ventas y otra superficie todavía necesaria, la tarea futura de implementación debe resolver segregación o alcance antes de una revocación total.

La ausencia de segregación no restaura autoridad de Makos sobre las nuevas ventas post-corte.

---

#### 14. Relación con eventos tardíos, replay y backfill

Revocar la credencial no reescribe la historia.

Reglas:

1. una venta Makos pre-corte conserva `source_system = Makos` aunque se procese después;
2. una revisión histórica conserva relación con la venta original;
3. replay conserva identidad, audiencia y resultados previos;
4. backfill no transforma datos Makos en ventas PULSO nativas;
5. un evento pendiente no autoriza a volver a habilitar una credencial retirada sin nueva autorización;
6. si la evidencia necesaria quedó preservada antes del retiro, se utiliza esa evidencia gobernada en lugar de mantener acceso externo indefinido;
7. un resultado desconocido conserva conciliación y propietario; no se declara fracaso por perder el acceso externo.

---

#### 15. Relación con NEXO, NUMERA y PASS

La reducción o revocación del acceso Makos no modifica:

- el ledger físico de NEXO;
- hechos económicos de NUMERA;
- ledger o saldo de PASS;
- receipts de consumidoras;
- idempotencia de efectos ya confirmados;
- compensaciones pendientes;
- autoridad de cada aplicación propietaria.

Ninguna credencial Makos se utiliza como medio para escribir directamente NEXO, NUMERA, PASS o Supabase.

Un consumidor interno que ya recibió un evento conserva su tratamiento aunque el proveedor externo sea retirado posteriormente.

---

#### 16. Relación con el adaptador

Credencial y adaptador tienen lifecycles distintos.

```text
CREDENCIAL REVOCADA
NO IMPLICA
CÓDIGO DEL ADAPTADOR BORRADO
```

```text
ADAPTADOR CONSERVADO PARA HISTORIA / EVIDENCIA
NO IMPLICA
CREDENCIAL ACTIVA PARA NUEVAS VENTAS
```

`INT-SALES-011` mantiene la responsabilidad permanente de retirar el adaptador externo sin modificar consumidoras internas.

Esta tarea no borra código, rutas, staging, contratos ni archivos históricos.

---

#### 17. Estados lógicos heredados de lifecycle

Cuando exista una credencial real, se preservan los estados de `INT-EXT-008`:

```text
ACTIVA
ROTACION_EN_CURSO
SOLAPAMIENTO_CONTROLADO
REVOCADA
EXPIRADA
RETIRADA
```

La decisión `MANTENER_RESIDUAL_MINIMO` o `REDUCIR` describe el tratamiento del alcance; no crea un estado alternativo que permita saltar el lifecycle.

Una credencial `REVOCADA`, `EXPIRADA` o `RETIRADA` no vuelve a `ACTIVA`.

---

#### 18. Evidencia mínima de una futura reducción o revocación

Sin copiar material secreto, la evidencia deberá poder relacionar:

- referencia no sensible del sistema y binding;
- cuenta o instancia cuando exista;
- ambiente;
- `IntegrationPrincipal`;
- superficie de credencial;
- credential ref no sensible;
- clase del material;
- alcance anterior conocido;
- alcance residual permitido, si existe;
- sede, terminal y fecha efectiva del corte relacionado cuando corresponda;
- consumidores identificados;
- residuales históricos;
- decisión `MANTENER_RESIDUAL_MINIMO`, `REDUCIR`, `REVOCAR`, `NO_APLICA_CREDENCIAL` o `BLOQUEADO_POR_EVIDENCIA`;
- motivo;
- autoridad o mecanismo de revocación cuando esté acreditado;
- actor o principal autorizado que ejecutó la acción futura;
- instante efectivo;
- resultado de la operación;
- evidencia de invalidez o rechazo cuando sea verificable;
- referencias locales retiradas;
- pendientes y propietario cuando el cierre no sea terminal.

El valor de la credencial, private key, password, token reutilizable o secreto equivalente queda fuera de esta evidencia.

---

#### 19. Estado técnico-documental actual de Makos

La evidencia canónica vigente permite afirmar:

- Makos está identificado como POS externo vigente;
- el flujo físico demostrado en Vento utiliza importación `makos_excel`;
- la existencia de una API o webhook utilizable por el tenant no está acreditada suficientemente para congelar un binding técnico;
- no están acreditados el mecanismo real de autenticación, scopes, autoridad de revocación ni lifecycle físico de una credencial Makos;
- `EXT-SYS-013` permanece sin una credencial externa instanciable dentro de la matriz transversal de retiro;
- por tanto, esta tarea no puede afirmar que exista hoy una credencial técnica concreta que deba reducirse o revocarse.

Resultado actual:

```text
DECISIÓN NORMATIVA = ESPECIFICADA
EJECUCIÓN DE REDUCCIÓN / REVOCACIÓN = BLOQUEADA_POR_EVIDENCIA
REVOCACIONES REALES EJECUTADAS = 0
```

Este bloqueo no invalida el contrato. Impide únicamente fingir una operación sobre material no acreditado.

---

#### 20. Matriz de pendientes y condiciones de salida

| Materia                                           | Estado                                      | Propietaria                                                                  | Condición de salida                                                                                |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| binding real Makos                                | `BLOQUEADO_POR_EVIDENCIA`                   | integración Makos / PULSO bajo contratos `INT-POS-001` a `INT-POS-004`       | proveedor/tenant acredita cuenta, mecanismo, material o ausencia de material y autoridad aplicable |
| corte real de una sede/terminal                   | `FUERA_DE_ALCANCE` de esta fase             | implementación de `INT-POS-023` / responsabilidad permanente `INT-SALES-009` | alcance se transfiere con gates satisfechos y evidencia operativa                                  |
| residuales históricos                             | `PENDIENTE_DE_EVIDENCIA` hasta ejecución    | `INT-POS-020` + alcance de corte                                             | cada residual queda resuelto o con ruta que no requiera acceso más amplio                          |
| alcance mínimo residual                           | `ESPECIFICADO` como regla                   | `INT-POS-024` + lifecycle `INT-EXT-005` a `INT-EXT-008`                      | mecanismo real acredita el mínimo que puede mantenerse                                             |
| reducción técnica                                 | `BLOQUEADO_POR_EVIDENCIA`                   | implementación futura del binding                                            | proveedor soporta y acredita una reducción concreta sin ampliar privilegios                        |
| revocación técnica                                | `BLOQUEADO_POR_EVIDENCIA`                   | implementación futura del binding                                            | material identificable, consumidores resueltos y autoridad real de revocación acreditada           |
| retiro local de referencias                       | `FUERA_DE_ALCANCE` físico                   | implementación propietaria del binding                                       | credencial inválida/no aplicable y cero consumidores autorizados dependientes                      |
| credencial compartida o consumidores no resueltos | `BLOQUEADO` para revocación ciega           | `INT-EXT-020` y propietarias afectadas                                       | ownership y segregación quedan resueltos antes de retirar material                                 |
| retiro definitivo del adaptador                   | `RESERVADO` para responsabilidad permanente | `INT-SALES-011`                                                              | no existen consumidoras dependientes ni residuales que requieran el adaptador                      |

Ningún pendiente queda sin propietario y condición de salida.

---

#### 21. Prohibiciones

Queda prohibido:

1. revocar material antes de que exista evidencia suficiente de qué material es y qué consumidores dependen de él, salvo emergencia de seguridad acreditada;
2. declarar revocación porque se eliminó una variable local;
3. declarar reducción porque el adaptador dejó de usar una operación;
4. inventar scopes nativos de Makos;
5. inventar una fecha de expiración;
6. inventar una API key, token, usuario técnico o cuenta de servicio;
7. conservar credencial de escritura cuando solo se necesite lectura y exista un mecanismo menor acreditado;
8. mantener credenciales válidas indefinidamente por fallback;
9. usar una credencial Makos para PULSO;
10. reutilizar una credencial revocada;
11. usar material de otro ambiente;
12. compartir material con otra integración para evitar su retiro;
13. revocar una credencial compartida o de consumidores no resueltos como si fuera exclusiva;
14. eliminar una cuenta completa del proveedor por inferencia desde el corte de ventas;
15. retirar pagos, fiscalidad, tesorería u otra superficie ajena al corte sin contrato propietario;
16. borrar historia, receipts, mappings o auditoría;
17. borrar cuarentena, dead-letter, conciliaciones o residuales por retirar acceso;
18. declarar que un resultado desconocido no ocurrió porque la credencial ya no existe;
19. reactivar Makos como fuente de nuevas ventas para resolver un residual histórico;
20. crear una venta PULSO nueva para sustituir un hecho Makos pre-corte;
21. modificar NEXO, NUMERA o PASS durante la revocación de Makos;
22. registrar secretos en evidencia, logs, métricas, tickets o documentación;
23. ejecutar revocaciones reales durante esta tarea documental;
24. crear credenciales sucesoras durante esta tarea documental;
25. modificar código, SQL, migraciones, Supabase, datos, endpoints, webhooks, cuentas, secretos o configuración remota durante esta tarea;
26. adelantar el retiro físico del adaptador de `INT-SALES-011`;
27. iniciar o desarrollar `INT-SALES-001`.

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea especializa para el cierre de la transición Makos → PULSO comportamientos ya protegidos por el registro vigente: fuente empresarial única y corte sin doble emisión; lifecycle de credenciales con mínimo privilegio, separación de ambientes, revocación y retiro; retiro de integraciones sin pérdida de historia; preservación de idempotencia, replay, resultados desconocidos, conciliación y residuales; y separación entre la fuente externa y los efectos propietarios. No introduce una capacidad ejecutable, permiso, credencial, endpoint, algoritmo o efecto empresarial nuevo.

Balance:

- creados: **0**;
- modificados: **0**;
- diferidos: **0**;
- descartados: **0**;
- obsoletos: **0**.

---

#### 23. Cobertura de prueba existente preservada

Se preserva sin modificación, en especial:

- `TREQ-INTEGRATION-003`, para identidad estable, resultado recuperable, retry y conciliación;
- `TREQ-INTEGRATION-006`, para fuente empresarial única, fuentes competidoras y resolución sin sobrescribir historia;
- `TREQ-INTEGRATION-014`, que cubre expresamente `INT-POS-001` a `INT-POS-024`, el corte por sede, terminal y fecha efectiva y la prevención de doble emisión entre POS externo y PULSO;
- `TREQ-INTEGRATION-155`, para replay y backfill preservando identidad, procedencia y audiencia;
- `TREQ-AUTH-015`, para evidencia correlacionable de decisiones y acciones protegidas sin perder trazabilidad;
- los requisitos vigentes consumidos por `INT-EXT-008` e `INT-EXT-019` para lifecycle, revocación, retiro, preservación histórica, resultado desconocido y conciliación.

Ninguna fila cambia de identidad, texto, estado, relación, secuencia, propietaria ni evidencia por esta tarea.

---

#### 24. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. mantiene `INT-POS-023` como tarea anterior;
2. mantiene `INT-SALES-001` como única tarea siguiente;
3. preserva Makos como fuente histórica de sus ventas pre-corte;
4. preserva PULSO como autoridad de nuevas ventas post-corte para alcances efectivamente transferidos;
5. separa autoridad de fuente y lifecycle de credencial;
6. define `MANTENER_RESIDUAL_MINIMO`, `REDUCIR`, `REVOCAR`, `NO_APLICA_CREDENCIAL` y `BLOQUEADO_POR_EVIDENCIA`;
7. impide conservar acceso por conveniencia;
8. permite acceso residual solo para necesidad acreditada;
9. exige propietario y condición de salida para todo residual;
10. define reducción solo sobre capacidades reales del proveedor;
11. prohíbe inventar scopes por sede, terminal o fecha;
12. trata credenciales más amplias que el corte sin fingir revocación parcial;
13. impide revocar material necesario para un alcance legítimo no transferido;
14. impide que una credencial amplia restaure doble autoridad de ventas;
15. define revocación en la autoridad que acepta el material;
16. separa dejar de usar, desactivar binding, revocar y retirar referencia local;
17. exige evidencia de invalidez cuando sea verificable;
18. impide fallback al material retirado;
19. define revocación de emergencia por compromiso;
20. impide conservar material comprometido para drenaje ordinario;
21. separa usuario humano, cuenta administrativa, IntegrationPrincipal y credencial técnica;
22. impide retirar por inferencia superficies de pagos, fiscalidad u otras ajenas al corte;
23. preserva eventos tardíos, replay y backfill históricos;
24. preserva NEXO, NUMERA y PASS sin cambios de contrato;
25. separa lifecycle de credencial y lifecycle del adaptador;
26. preserva `INT-SALES-011` como retiro permanente posterior del adaptador;
27. define evidencia futura sin material secreto;
28. mantiene el estado actual de ejecución `BLOQUEADO_POR_EVIDENCIA` mientras no exista binding y credencial Makos acreditados;
29. no afirma una revocación física inexistente;
30. asigna todos los bloqueos a propietario y condición de salida;
31. genera cero requisitos nuevos de prueba;
32. modifica cero requisitos de prueba;
33. no genera una copia del registro canónico de requisitos;
34. no modifica código, SQL, migraciones, Supabase, datos, credenciales, cuentas, endpoints, webhooks ni configuración remota;
35. no ejecuta revocaciones, reducciones ni rotaciones reales;
36. no retira físicamente el adaptador;
37. no inicia ni desarrolla `INT-SALES-001`.

---

#### 25. Continuidad

ÚLTIMA TAREA APROBADA

`INT-POS-023 — Definir transición futura desde POS externo hacia PULSO`

TAREA ACTUAL APROBADA

`INT-POS-024 — Definir revocación o reducción de credenciales cuando PULSO asuma la fuente`

SIGUIENTE TAREA RESERVADA

`INT-SALES-001 — Definir contrato para que PULSO registre la venta`


Flujo obligatorio:

```text
POS EXTERNO
        ↓
ADAPTADOR DEL PROVEEDOR
        ↓
STAGING Y PAYLOAD ORIGINAL
        ↓
VALIDACIÓN E IDEMPOTENCIA
        ↓
MAPEO DE SEDES Y PRODUCTOS
        ↓
CONTRATO CANÓNICO DE VENTA
        ├── NEXO
        ├── NUMERA
        └── PASS, cuando corresponda
```

Reglas:

- el proveedor no escribirá directamente en tablas internas;
- el proveedor no recibirá acceso a Supabase;
- una línea sin mapeo no descontará inventario;
- una venta duplicada no producirá efectos adicionales;
- una devolución generará una compensación auditable;
- el documento fiscal seguirá siendo responsabilidad del POS vigente;
- la integración temporal no se considerará implementación completa de PULSO.
