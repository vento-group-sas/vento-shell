### MINI-BLOQUE — DOMINIO DE INVENTARIO LOGISTICA Y ACTIVOS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **dominio de inventario logistica y activos** dentro de **K NEXO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `NEXO-DOM-001` a `NEXO-DOM-038` — 38 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Clasificar consumibles, stock por cantidad, reutilizables, activos serializados, repuestos, kits y contenedores” y concluye con “Definir novedades locativas, severidad, contención, escalamiento, resolución y cierre”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:NEXO-DOM-001-038 -->
### Reconciliación topológica de NEXO-DOM-001 a NEXO-DOM-038

Las treinta y ocho tareas de dominio NEXO definen taxonomía, identidad, estados, relaciones, reglas, trazabilidad, eventos y fronteras del modelo objetivo. Son contratos de dominio consumidos por paquetes posteriores; no son unidades físicas autónomas.

| Propiedad | Valor |
| --- | --- |
| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |
| identidad | `<task_id>` |

La materialización de tablas, RPC, RLS, Server Actions, UI, integraciones, backfills y migraciones pertenece a BLOQUE R, tareas de autorización/implementación y package_id aprobados.

### ✅ NEXO-DOM-001 — Clasificar consumibles, stock por cantidad, reutilizables, activos serializados, repuestos, kits y contenedores

**Estado:** APROBADA
**Tarea anterior:** `AUTH-ERR-020 — Compartir mensajes desde vento-shell` — APROBADA
**Tarea siguiente:** `NEXO-UX-001 — Inventariar procesos reales de inventario y logística` — RESERVADA
**Tipo de tarea:** documental; definición contractual, taxonómica, funcional, de comportamiento, transición y reconciliación física de las clases canónicas de control para inventario, activos, reutilizables, repuestos, kits y contenedores de NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Artefactos producidos:** `NEXO-INVENTORY-CLASSIFICATION-CONTRACT-001`, `NEXO-INVENTORY-CLASS-DECISION-MATRIX-001`, `NEXO-INVENTORY-CLASS-BEHAVIOR-MATRIX-001`, `NEXO-INVENTORY-CLASS-LEGACY-CROSSWALK-001`, `NEXO-INVENTORY-IDENTITY-DECISION-MATRIX-001` y `NEXO-INVENTORY-CLASS-PHYSICAL-RECONCILIATION-001`
**Decisiones consumidas:** `CAP-SCOPE-004`; `CAP-SCOPE-006`; `CAP-SCOPE-007`; `CODE-AUD-011`; `TREQ-NEXO-011` a `TREQ-NEXO-016`; extensión canónica de NEXO; contratos vigentes de producto, presentación, unidad, existencia, lote, serial, LOC, LPN, activos, mantenimiento, remisiones, autorización y transición; estado remoto y desplegado inspeccionado; contrato documental vigente
**Cambios físicos autorizados:** ninguno; no modifica productos, perfiles, categorías, stock, activos, grupos, LPN, movimientos, remisiones, Supabase, tablas, constraints, funciones, RLS, datos, migraciones, código, paquetes, aplicaciones ni despliegues

---

#### 1. Propósito

Definir una clasificación única, completa y verificable para que NEXO no trate
como equivalentes objetos físicos con ciclos de vida incompatibles.

La regla raíz queda:

```text
OBJETO FÍSICO O IDENTIDAD MAESTRA
+
HECHOS OPERATIVOS CONCLUYENTES
+
UNA CLASE PRIMARIA DE CONTROL
+
DIMENSIONES SECUNDARIAS EXPLÍCITAS
→
COMPORTAMIENTO DETERMINISTA
PARA SALDO, IDENTIDAD, MOVIMIENTO, CONTEO, CUSTODIA,
MANTENIMIENTO, REMISIÓN, LPN Y CONCILIACIÓN
```

La tarea impide que una sola etiqueta como `ingredient`, `finished`, `resale`
o `asset` decida simultáneamente:

- si existe saldo;
- si una unidad se consume o debe retornar;
- si requiere identidad individual;
- si admite serial, lote o vencimiento;
- si necesita custodia o mantenimiento;
- si puede instalarse como repuesto;
- si representa una composición;
- si contiene otros objetos;
- si puede vincularse con un LPN;
- cómo participa en remisiones y conteos.

---

#### 2. Resultado material

Se aprueban seis artefactos documentales completos:

1. `NEXO-INVENTORY-CLASSIFICATION-CONTRACT-001`, que congela siete clases
   primarias, sus invariantes, estados y dimensiones independientes;
2. `NEXO-INVENTORY-CLASS-DECISION-MATRIX-001`, que decide veintiocho escenarios
   y elimina solapamientos entre consumo, cantidad, reutilización, identidad,
   instalación, composición y contención;
3. `NEXO-INVENTORY-CLASS-BEHAVIOR-MATRIX-001`, que materializa explícitamente
   por clase saldo o identidad, movimiento, conteo, reserva, custodia,
   mantenimiento, remisión, LPN y costo o valoración;
4. `NEXO-INVENTORY-CLASS-LEGACY-CROSSWALK-001`, que reconcilia las seis cohortes
   heredadas sin convertir heurísticas en aprobación;
5. `NEXO-INVENTORY-IDENTITY-DECISION-MATRIX-001`, que conserva los 963 UUID
   estables y asigna a cada identidad un resultado, estado y bloqueo explícitos;
6. `NEXO-INVENTORY-CLASS-PHYSICAL-RECONCILIATION-001`, que registra veinte
   brechas físicas y su destino canónico.

Cobertura materializada:

| Elemento                                              | Cantidad |
| ----------------------------------------------------- | -------: |
| Clases primarias canónicas                            |        7 |
| Dimensiones secundarias obligatorias                  |       12 |
| Escenarios con decisión explícita                     |       28 |
| Cohortes legacy reconciliadas                         |        6 |
| Decisiones individualizadas por `product_id`          |      963 |
| Identificadores `product_id` únicos                   |      963 |
| Identidades faltantes en la matriz                    |        0 |
| Identidades duplicadas en la matriz                   |        0 |
| Decisiones pendientes de clasificación o confirmación |      904 |
| Decisiones bloqueadas                                 |       59 |
| Clasificaciones objetivo aprobadas automáticamente    |        0 |
| Productos físicos observados                          |      963 |
| Productos activos observados                          |      950 |
| Perfiles de inventario observados                     |      963 |
| Productos sin perfil observados                       |        0 |
| Perfiles legacy `unclassified` observados             |        0 |
| Productos legacy `asset` observados                   |      169 |
| Filas de activo individual observadas                 |       38 |
| Grupos reutilizables observados                       |       90 |
| LPN observados                                        |        0 |
| Contenidos de LPN observados                          |        0 |
| Perfiles de presentación observados                   |    1.190 |
| Brechas físicas registradas                           |       20 |
| Requisitos de prueba derivados                        |       10 |

La matriz individual no adopta una clase objetivo por heurística. Conserva la
identidad, materializa la decisión provisional aplicable y bloquea cualquier
operación dependiente hasta cumplir la condición de salida correspondiente.

---

#### 3. Decisión taxonómica principal

Se congelan exactamente siete clases primarias:

```text
CONSUMABLE
QUANTITY_STOCK
REUSABLE_QUANTITY
SERIALIZED_ASSET
SPARE_PART
KIT
PHYSICAL_CONTAINER
```

Cada identidad física gestionada por NEXO deberá poseer exactamente una clase
primaria activa para un mismo período de vigencia.

```text
ACTIVE_PRIMARY_CLASS_COUNT = 1
```

No se admite:

- cero clases para una identidad habilitada operativamente;
- dos clases primarias simultáneas;
- una clase inferida únicamente desde nombre o categoría;
- una clase local diferente por aplicación;
- utilizar `product_type` como sustituto;
- utilizar `inventory_kind` legacy como contrato final;
- usar presentación, unidad, lote, serial, LOC, LPN o estado como clase.

Un servicio o elemento no físico queda fuera de estas siete clases y utiliza
su contrato no inventariable; no se le fabrica una existencia.

---

#### 4. Clase primaria y dimensiones secundarias

La clase primaria define el modelo de control físico. No absorbe otras
propiedades.

Se mantienen separadas doce dimensiones:

1. identidad maestra;
2. rol empresarial;
3. presentación;
4. unidad y familia de medida;
5. granularidad de identidad física;
6. lote y vencimiento;
7. serial, placa o código individual;
8. ubicación;
9. custodia y responsable;
10. condición y disponibilidad;
11. propiedad y tratamiento económico;
12. pertenencia a LPN, kit o contenedor.

Ejemplos de separaciones obligatorias:

```text
CLASE PRIMARIA ≠ CATEGORÍA
CLASE PRIMARIA ≠ PRODUCT_TYPE
CLASE PRIMARIA ≠ PRESENTACIÓN
CLASE PRIMARIA ≠ UNIDAD
CLASE PRIMARIA ≠ LOTE
CLASE PRIMARIA ≠ LPN
CLASE PRIMARIA ≠ ESTADO CONTABLE
```

Una identidad puede ser comprable, almacenable, vendible, ingrediente o
suministrable sin cambiar automáticamente de clase primaria.

---

#### 5. Ámbito de clasificación

La clasificación se aplica a:

- identidades maestras que producen saldo por cantidad;
- consumibles operativos;
- productos comprados, producidos o revendidos;
- empaques consumibles;
- vajilla, cubiertos, herramientas y decoración reutilizable;
- equipos, mobiliario y herramientas individualizables;
- repuestos de mantenimiento;
- definiciones e instancias de kit;
- contenedores físicos permanentes o retornables;
- objetos transportados o vinculados a remisiones;
- contenido representado dentro de LPN.

No clasifica como objeto físico:

- servicios;
- permisos;
- rutas de aplicación;
- recetas;
- órdenes o documentos;
- LOC;
- posiciones;
- LPN como identidad logística;
- lotes;
- movimientos;
- custodios;
- proveedores;
- centros de costo.

---

#### 6. Fuente de verdad y gobierno

NEXO es propietario de la clase primaria y del comportamiento físico derivado.

Las fronteras quedan:

| Dominio | Propiedad                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NEXO    | clase primaria, existencia, identidad física, ubicación, condición, custodia, movimientos y conciliación |
| ORIGO   | necesidad, compra, proveedor, presentación de compra, recepción empresarial y condiciones comerciales    |
| FOGO    | receta, ejecución productiva, consumo y salida productiva                                                |
| PULSO   | oferta, venta, devolución y hecho comercial                                                              |
| NUMERA  | valoración, gasto, activo contable, depreciación y efecto económico aprobado                             |
| VISO    | administración y supervisión autorizadas; no fuente independiente de clasificación                       |
| SHELL   | contratos compartidos, tipos, transición, integridad, migraciones y evidencia técnica                    |

Ningún consumidor podrá crear una clase local o reinterpretar la clase mediante
una categoría visual.

---

#### 7. `NEXO-INVENTORY-CLASSIFICATION-CONTRACT-001`

Forma conceptual:

```ts
type NexoPrimaryControlClass =
  | "CONSUMABLE"
  | "QUANTITY_STOCK"
  | "REUSABLE_QUANTITY"
  | "SERIALIZED_ASSET"
  | "SPARE_PART"
  | "KIT"
  | "PHYSICAL_CONTAINER";

type NexoClassificationStatus =
  | "PROPOSED"
  | "APPROVED"
  | "RETIRED";

type NexoInventoryClassification = {
  subject_type: "PRODUCT_MASTER" | "KIT_DEFINITION" | "PHYSICAL_MODEL";
  subject_id: string;
  primary_class: NexoPrimaryControlClass;
  status: NexoClassificationStatus;
  version: number;
  effective_from: string;
  effective_to: string | null;
  decision_basis_code: string;
  approved_by: string;
  approved_at: string;
  supersedes_version: number | null;
};
```

La forma física futura podrá variar, pero deberá conservar los mismos
invariantes, historial y capacidad de reproducción.

---

#### 8. `CONSUMABLE`

Definición:

```text
SUMINISTRO FÍSICO
+
USO OPERATIVO IRREVERSIBLE
+
NO SE ESPERA DEVOLUCIÓN
+
NO SE TRANSFORMA EN PRODUCTO VENDIBLE O PREPARACIÓN
→ CONSUMABLE
```

Ejemplos típicos:

- químicos y elementos de aseo;
- bolsas de basura;
- elementos de protección desechables;
- papelería o suministros operativos agotables;
- textiles o implementos expresamente desechables;
- consumibles de equipo que no son repuesto instalado.

Reglas:

- se controla por cantidad cuando la política lo exige;
- el uso emite consumo y reduce saldo;
- no genera obligación de devolución;
- puede usar lote, vencimiento o condición cuando sea necesario;
- no se convierte en activo por tener valor unitario alto;
- no se convierte en repuesto por utilizarse durante mantenimiento;
- un empaque desechable puede pertenecer aquí cuando su uso sea operativo y no
  requiera el tratamiento de componente de producto.

---

#### 9. `QUANTITY_STOCK`

Definición:

```text
EXISTENCIA FUNGIBLE O EQUIVALENTE
+
SALDO EXPRESADO EN UNIDAD CANÓNICA
+
ENTRADA, TRANSFORMACIÓN, VENTA, CONSUMO O TRASLADO
→ QUANTITY_STOCK
```

Incluye, según sus roles secundarios:

- ingredientes;
- empaques que forman parte de un producto o despacho;
- preparaciones intermedias almacenables;
- productos terminados;
- mercancía de reventa;
- materiales generales que no pertenecen a otra clase específica.

Reglas:

- la identidad autoritativa es producto más dimensiones de existencia;
- admite cantidad discreta, masa o volumen;
- presentación y unidad permanecen separadas;
- puede exigir lote, vencimiento, condición o FEFO;
- puede reservarse, dividirse y participar en LPN;
- no posee custodia individual;
- una unidad física no adquiere historia individual solo por ser contada.

---

#### 10. `REUSABLE_QUANTITY`

Definición:

```text
UNIDADES EQUIVALENTES
+
USO REPETIDO
+
SE ESPERA RETORNO O PERMANENCIA
+
EL CONTEO POR CANTIDAD ES SUFICIENTE
+
NO SE JUSTIFICA HISTORIA INDIVIDUAL
→ REUSABLE_QUANTITY
```

Ejemplos típicos:

- vajilla repetida;
- cubiertos;
- bandejas de servicio equivalentes;
- decoración repetida;
- herramientas simples equivalentes;
- elementos retornables cuyo control individual no aporta valor razonable.

Reglas:

- conserva saldo por cantidad y condición;
- entrega, préstamo, traslado y devolución no son consumo;
- daño, pérdida y retiro reducen cantidad utilizable mediante eventos;
- puede conservar cantidad esperada y observada;
- no usa serial ni placa por unidad;
- no se mezcla simultáneamente con `asset_items` para la misma existencia;
- si una unidad requiere historia individual, la identidad correspondiente se
  reclasifica mediante transición controlada a `SERIALIZED_ASSET`.

---

#### 11. `SERIALIZED_ASSET`

Definición:

```text
UNIDAD FÍSICA INDIVIDUAL
+
HISTORIA, CUSTODIA O RIESGO PROPIOS
+
IDENTIFICADOR ESTABLE POR INSTANCIA
→ SERIALIZED_ASSET
```

Se utiliza cuando una o más de estas condiciones son verdaderas:

- serial, placa, QR o código individual requerido;
- mantenimiento por unidad;
- garantía o seguro individual;
- valor o criticidad relevante;
- calibración, inspección o certificación por unidad;
- custodia o préstamo individual;
- condición o disponibilidad independiente;
- trazabilidad de pérdida, baja o disposición por unidad.

Reglas:

- el modelo o producto no es el activo físico;
- cada instancia tiene identidad inmutable;
- ubicación, custodia, condición, disponibilidad y mantenimiento son
  independientes;
- el QR puede reemitirse sin crear un activo nuevo;
- no se representa como cantidad fungible en stock ordinario;
- un traslado identifica exactamente las instancias afectadas.

---

#### 12. `SPARE_PART`

Definición:

```text
EXISTENCIA DESTINADA A MANTENIMIENTO O REPARACIÓN
+
PERMANECE EN STOCK HASTA RESERVA, CONSUMO O INSTALACIÓN
→ SPARE_PART
```

Reglas:

- posee saldo, ubicación, presentación y unidad;
- puede exigir lote, serial o compatibilidad técnica;
- se reserva para una orden de trabajo o activo cuando corresponda;
- instalarlo consume o transfiere la existencia mediante evento correlacionado;
- el texto libre de “pieza reemplazada” no sustituye el movimiento;
- no se convierte automáticamente en activo instalado;
- un componente instalado adquiere identidad individual solo si la política de
  trazabilidad lo exige;
- una pieza retirada conserva disposición, retorno, reparación o descarte
  separados.

---

#### 13. `KIT`

Definición:

```text
COMPOSICIÓN APROBADA
+
REGLAS DE COMPLETITUD
+
COMPONENTES IDENTIFICABLES
→ KIT
```

Se distinguen:

```text
KIT_DEFINITION
→ composición, cantidades, sustituciones y reglas

KIT_INSTANCE
→ conjunto real, estado, ubicación, responsable y completitud
```

Reglas:

- un kit no es un LPN;
- un kit puede transportarse dentro de un LPN;
- sus componentes conservan sus clases e identidades;
- la instancia no duplica el saldo de los componentes;
- ensamblar, completar, sustituir, desarmar o cerrar son eventos;
- un kit incompleto no se presenta como disponible;
- un componente puede pertenecer temporalmente a una sola instancia cuando la
  definición lo exija;
- un “combo” comercial no es kit físico por inferencia.

---

#### 14. `PHYSICAL_CONTAINER`

Definición:

```text
OBJETO DURABLE O RETORNABLE
+
FUNCIÓN PRIMARIA DE CONTENER, PROTEGER O TRANSPORTAR
+
IDENTIDAD Y CICLO DE VIDA PROPIOS
→ PHYSICAL_CONTAINER
```

Ejemplos típicos:

- canastillas retornables;
- cajas plásticas durables;
- bins y totes;
- carros, racks o casetes de transporte;
- recipientes permanentes controlados por capacidad y condición.

Reglas:

- cada instancia controlada posee identidad estable;
- capacidad, condición, ubicación, custodia y disponibilidad son propias;
- puede vincularse temporal o persistentemente con un LPN;
- el vínculo no fusiona identidades;
- un empaque desechable no pertenece aquí;
- un recipiente genérico sin necesidad de identidad individual se clasifica
  como `REUSABLE_QUANTITY`;
- el contenido no forma parte del valor de existencia del contenedor;
- mover el contenedor solo mueve contenido cuando un contrato de vínculo válido
  lo determina.

---

#### 15. Árbol de decisión obligatorio

El orden de clasificación es:

```text
1. ¿ES UN OBJETO FÍSICO INVENTARIABLE O CONTROLABLE?
   NO → fuera de estas siete clases

2. ¿SU FUNCIÓN PRIMARIA ES CONTENER Y TIENE IDENTIDAD DURABLE PROPIA?
   SÍ → PHYSICAL_CONTAINER

3. ¿REPRESENTA UNA COMPOSICIÓN CON REGLAS DE COMPLETITUD?
   SÍ → KIT

4. ¿SE ADQUIERE O CONSERVA PARA INSTALARSE EN MANTENIMIENTO?
   SÍ → SPARE_PART

5. ¿SE ESPERA REUTILIZACIÓN O DEVOLUCIÓN DESPUÉS DEL USO?
   SÍ →
      ¿REQUIERE HISTORIA INDIVIDUAL?
      SÍ → SERIALIZED_ASSET
      NO → REUSABLE_QUANTITY

6. ¿SE AGOTA IRREVERSIBLEMENTE EN APOYO A LA OPERACIÓN,
   SIN CONVERTIRSE EN PRODUCTO, PREPARACIÓN O MERCANCÍA?
   SÍ → CONSUMABLE

7. ¿SE CONTROLA COMO EXISTENCIA FUNGIBLE PARA COMPRA, PRODUCCIÓN,
   VENTA, CONSUMO O TRASLADO?
   SÍ → QUANTITY_STOCK

8. NINGUNA RESPUESTA CONCLUYENTE
   → PROPOSED o revisión requerida; no habilitar comportamiento dependiente
```

La primera coincidencia deberá validarse contra exclusiones y evidencia; no se
clasifica por orden de consulta física de filas.

---

#### 16. `NEXO-INVENTORY-CLASS-DECISION-MATRIX-001`

|    # | Escenario                                                             | Resultado                                                                  |
| ---: | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
|    1 | servicio o derecho sin existencia física                              | fuera de las siete clases                                                  |
|    2 | ingrediente medible consumido por receta                              | `QUANTITY_STOCK`                                                           |
|    3 | preparación intermedia almacenada                                     | `QUANTITY_STOCK`                                                           |
|    4 | producto terminado inventariable                                      | `QUANTITY_STOCK`                                                           |
|    5 | mercancía de reventa                                                  | `QUANTITY_STOCK`                                                           |
|    6 | empaque incorporado al producto o despacho                            | `QUANTITY_STOCK`                                                           |
|    7 | químico de limpieza agotable                                          | `CONSUMABLE`                                                               |
|    8 | bolsa de basura o EPP desechable                                      | `CONSUMABLE`                                                               |
|    9 | vajilla equivalente controlada por conteo                             | `REUSABLE_QUANTITY`                                                        |
|   10 | decoración repetida sin historia individual                           | `REUSABLE_QUANTITY`                                                        |
|   11 | herramienta simple equivalente con devolución por cantidad            | `REUSABLE_QUANTITY`                                                        |
|   12 | equipo con mantenimiento y serial                                     | `SERIALIZED_ASSET`                                                         |
|   13 | mueble con custodia e historia individual                             | `SERIALIZED_ASSET`                                                         |
|   14 | instrumento sujeto a calibración                                      | `SERIALIZED_ASSET`                                                         |
|   15 | pieza almacenada para reparación                                      | `SPARE_PART`                                                               |
|   16 | pieza instalada sin trazabilidad individual adicional                 | consumo de `SPARE_PART` más relación de instalación                        |
|   17 | pieza instalada que requiere serial e historia                        | consumo de `SPARE_PART` más nueva identidad o relación individual aprobada |
|   18 | conjunto de herramientas con lista de componentes                     | `KIT`                                                                      |
|   19 | combo comercial sin conjunto físico estable                           | no `KIT`; contrato comercial propietario                                   |
|   20 | canastilla durable identificada                                       | `PHYSICAL_CONTAINER`                                                       |
|   21 | caja o bolsa desechable                                               | `CONSUMABLE` o `QUANTITY_STOCK` según su rol, nunca contenedor permanente  |
|   22 | bandeja durable equivalente sin identidad individual                  | `REUSABLE_QUANTITY`                                                        |
|   23 | LPN sin contenedor físico asociado                                    | LPN válido; no crea `PHYSICAL_CONTAINER`                                   |
|   24 | LPN vinculado con canastilla identificada                             | dos identidades relacionadas, no fusionadas                                |
|   25 | producto legacy `asset` con item y grupo simultáneos                  | conflicto; clasificación no aprobable hasta reconciliación                 |
|   26 | producto legacy `asset` sin item ni grupo                             | modelo incompleto; revisión obligatoria                                    |
|   27 | nombre o categoría sugiere una clase, pero no hay evidencia operativa | no clasificar automáticamente                                              |
|   28 | cambio de política exige otra clase                                   | nueva versión y transición reconciliada; no sobrescritura                  |

Los veintiocho escenarios tienen resultado explícito y no permiten fallback a
la etiqueta legacy.

---

#### 17. Granularidad de identidad

La granularidad queda:

| Clase                | Granularidad primaria                                        |
| -------------------- | ------------------------------------------------------------ |
| `CONSUMABLE`         | cantidad fungible o equivalente                              |
| `QUANTITY_STOCK`     | cantidad fungible, con dimensiones de existencia             |
| `REUSABLE_QUANTITY`  | cantidad de unidades equivalentes recuperables               |
| `SERIALIZED_ASSET`   | una identidad por unidad física                              |
| `SPARE_PART`         | cantidad o serial según política de la pieza                 |
| `KIT`                | definición y, cuando se materializa, identidad por instancia |
| `PHYSICAL_CONTAINER` | una identidad por contenedor controlado                      |

La clasificación no impide cantidades fraccionarias cuando la unidad y la clase
lo admitan. La granularidad individual no implica que el objeto posea un serial
de fabricante; puede utilizar un código interno estable.

---

#### 18. Roles secundarios

La clase primaria no reemplaza roles como:

```text
PURCHASABLE
PRODUCIBLE
INGREDIENT
PACKAGING_COMPONENT
SELLABLE
TRANSFERABLE
RETURNABLE
MAINTENANCE_INPUT
COLD_CHAIN_CONTROLLED
LOT_CONTROLLED
EXPIRY_CONTROLLED
QUALITY_CONTROLLED
```

Una identidad puede tener varios roles compatibles.

Ejemplos:

- un ingrediente es `QUANTITY_STOCK` y `INGREDIENT`;
- una bebida comprada para reventa es `QUANTITY_STOCK` y `SELLABLE`;
- una canastilla es `PHYSICAL_CONTAINER` y `RETURNABLE`;
- una pieza es `SPARE_PART` y `MAINTENANCE_INPUT`;
- una vajilla por cantidad es `REUSABLE_QUANTITY` y `RETURNABLE`.

Los roles no permiten dos clases primarias simultáneas.

---

#### 19. Presentación, unidad, lote y serial

Reglas obligatorias:

1. la presentación describe cómo se compra, solicita, recibe, almacena o
   transporta;
2. la unidad expresa la magnitud de saldo;
3. el lote identifica procedencia o fabricación compartida;
4. el vencimiento pertenece a una existencia o lote;
5. el serial identifica una instancia, no el producto maestro;
6. un pack no crea una clase;
7. una caja de unidades no se convierte en contenedor permanente por su forma;
8. un producto con varias presentaciones conserva una clase primaria salvo que
   existan identidades físicas con ciclos incompatibles;
9. una conversión no cambia consumo, retorno, custodia o mantenimiento;
10. una presentación abierta no crea una nueva identidad maestra.

Si el mismo nombre comercial cubre ciclos incompatibles, se separan identidades
maestras o variantes físicas gobernadas; no se fuerza una clase múltiple.

---

#### 20. Ubicación, custodia, condición y disponibilidad

Cada dimensión se resuelve independientemente:

```text
UBICACIÓN
→ dónde está

CUSTODIA
→ quién responde por su tenencia

CONDICIÓN
→ estado físico observado

DISPONIBILIDAD
→ si puede utilizarse para el propósito actual
```

Reglas:

- cantidad en LOC no prueba disponibilidad;
- custodio no prueba propiedad;
- condición buena no prueba que esté libre;
- ubicación no crea custodia;
- `REUSABLE_QUANTITY`, `SERIALIZED_ASSET`, `KIT` y `PHYSICAL_CONTAINER`
  requieren condición y disponibilidad explícitas según política;
- `CONSUMABLE`, `QUANTITY_STOCK` y `SPARE_PART` utilizan condición por saldo,
  lote o existencia cuando aplique;
- traslado, préstamo y tránsito mantienen estados diferenciados.

---

#### 21. `NEXO-INVENTORY-CLASS-BEHAVIOR-MATRIX-001`

| Clase                | Saldo o identidad                                        | Movimiento                                                                                                           | Conteo                                                                     | Reserva                                                        | Custodia                                         | Mantenimiento                                               | Remisión                                                         | LPN                                                       | Costo o valoración                                                                             |
| -------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `CONSUMABLE`         | saldo por cantidad y dimensiones aplicables              | recepción, traslado, consumo irreversible y ajuste autorizado                                                        | cantidad, unidad, lote, condición y ubicación cuando apliquen              | cantidad disponible                                            | no individual                                    | no pertenece al insumo; solo al equipo consumidor           | línea de cantidad; sin obligación natural de retorno             | contenido por cantidad cuando aplique                     | costo de la cantidad recibida y consumida; efecto contable gobernado por NUMERA                |
| `QUANTITY_STOCK`     | saldo por cantidad y dimensiones de existencia           | recepción, transformación, venta, consumo, devolución empresarial, traslado y ajuste autorizado                      | cantidad, unidad, lote, vencimiento, condición y ubicación cuando apliquen | cantidad disponible por dimensiones                            | no individual                                    | no                                                          | línea de cantidad y dimensiones                                  | contenido por cantidad, lote y condición                  | valoración según método aprobado; NUMERA conserva la fuente contable                           |
| `REUSABLE_QUANTITY`  | cantidad esperada, observada, utilizable y por condición | entrega, préstamo, uso, retorno, traslado, daño, pérdida y retiro                                                    | total, utilizable, dañada, prestada, faltante y ubicación                  | cantidad utilizable y obligación de retorno cuando corresponda | por grupo o expediente                           | inspección y cuidado por grupo                              | línea reutilizable con obligación, condición y conciliación      | cantidad con estado retornable                            | costo del grupo o de la unidad equivalente, separado del valor de un activo individual         |
| `SERIALIZED_ASSET`   | identidad estable por unidad física                      | alta autorizada, asignación, préstamo, traslado, retorno, mantenimiento, baja y disposición                          | conjunto exacto de identidades, condición, ubicación y custodia            | identidades exactas                                            | individual                                       | por unidad                                                  | transferencia de activos exactos                                 | por identidad cuando el contrato lo permita               | valor por activo o componente individual; tratamiento contable gobernado por NUMERA            |
| `SPARE_PART`         | saldo por cantidad o identidad serial según política     | recepción, reserva, retiro, instalación, devolución, reparación, descarte y ajuste autorizado                        | cantidad o serial, reservas e instalaciones pendientes                     | cantidad o serial contra orden de trabajo o activo             | no antes de instalación, salvo pieza serializada | se consume o vincula dentro del expediente de mantenimiento | línea de repuesto por cantidad o serial                          | contenido por cantidad o serial                           | costo acompaña reserva, retiro e instalación sin duplicar stock y componente instalado         |
| `KIT`                | definición versionada e instancia cuando se materializa  | constitución, completitud, sustitución, asignación, traslado, retorno, desarme y cierre                              | identidad de instancia y completitud exacta de componentes                 | instancia completa o componentes necesarios para constituirla  | por instancia                                    | sobre la instancia o sus componentes                        | línea de kit con validación de componentes                       | puede viajar dentro de LPN sin convertirse en LPN         | no duplica valoración de componentes; cualquier valor propio requiere regla contable explícita |
| `PHYSICAL_CONTAINER` | identidad estable por contenedor controlado              | alta autorizada, asignación, carga, traslado, retorno, inspección, reparación, retiro y vínculo o desvínculo con LPN | identidades exactas, condición, ubicación, custodia y vínculo LPN          | instancia y capacidad, nunca contenido por inferencia          | individual o por expediente                      | inspección y reparación por instancia                       | línea de contenedor o vínculo de custodia separado del contenido | puede soportar físicamente un LPN sin compartir identidad | costo propio del contenedor separado del costo y valor de su contenido                         |

Las nueve dimensiones son obligatorias y no podrán sustituirse por una columna
genérica de uso. Ningún movimiento, conteo, reserva, remisión, vínculo LPN o
tratamiento económico podrá incrementar simultáneamente el saldo o valor del
objeto y el de una representación duplicada.

---

#### 22. Conteos y diferencias

El método de conteo depende de la clase:

| Clase                | Observación mínima                                                 |
| -------------------- | ------------------------------------------------------------------ |
| `CONSUMABLE`         | cantidad observada y unidad                                        |
| `QUANTITY_STOCK`     | cantidad, unidad, lote, condición y ubicación cuando apliquen      |
| `REUSABLE_QUANTITY`  | cantidad total, utilizable, dañada, prestada, faltante y ubicación |
| `SERIALIZED_ASSET`   | conjunto de identidades observadas, no solo total                  |
| `SPARE_PART`         | cantidad o serial, reserva e instalación pendientes                |
| `KIT`                | instancia y completitud de componentes                             |
| `PHYSICAL_CONTAINER` | identidades, condición, custodia y vínculo LPN                     |

El conteo es observación. La diferencia se investiga y la corrección requiere
un evento autorizado. Queda prohibido convertir un recuento de grupo en altas o
bajas automáticas de activos individuales.

---

#### 23. Reservas, disponibilidad y tránsito

Reglas por clase:

- `CONSUMABLE` y `QUANTITY_STOCK` reservan cantidad;
- `REUSABLE_QUANTITY` reserva cantidad utilizable y define retorno cuando
  corresponda;
- `SERIALIZED_ASSET` reserva identidades exactas;
- `SPARE_PART` reserva cantidad o serial contra una necesidad de mantenimiento;
- `KIT` reserva una instancia completa o los componentes necesarios para
  constituirla;
- `PHYSICAL_CONTAINER` reserva la instancia y capacidad, no su contenido por
  inferencia.

Durante tránsito:

- el objeto deja de estar disponible en origen;
- no se confirma en destino hasta recepción;
- custodia y condición se conservan;
- la clase no cambia;
- un contenedor y su LPN se concilian como identidades separadas.

---

#### 24. Frontera con LPN

Un LPN es una identidad logística de contenido y estado operacional.

```text
LPN ≠ PHYSICAL_CONTAINER
LPN ≠ KIT
LPN ≠ LOC
LPN ≠ PRODUCTO
```

Un LPN podrá:

- existir sin contenedor físico dedicado;
- vincularse con un contenedor;
- contener cantidades, identidades o instancias admitidas;
- anidarse solo mediante contrato posterior aprobado;
- moverse atómicamente con su contenido;
- cerrarse o anularse sin dar de baja el contenedor físico.

La unión o separación entre LPN y contenedor conserva historial, actor,
instante y estado. La tarea no define todavía el ciclo completo de LPN, que
permanece en `NEXO-DOM-002` a `NEXO-DOM-008` y `NEXO-DOM-019` a
`NEXO-DOM-024`.

---

#### 25. Frontera con kits

Un kit representa completitud y composición; un LPN representa logística.

```text
KIT INSTANCE
→ qué conjunto funcional existe

LPN
→ qué contenido se agrupa y mueve logísticamente
```

Una instancia de kit puede:

- existir sin LPN;
- estar dentro de un LPN;
- cambiar de LPN sin perder identidad;
- contener componentes serializados, reutilizables o por cantidad;
- quedar incompleta por préstamo, daño o pérdida;
- reemplazar un componente mediante evento aprobado.

No se suma el kit como stock adicional a sus componentes.

---

#### 26. Frontera con repuestos instalados

La secuencia mínima es:

```text
SPARE_PART DISPONIBLE
→ RESERVA
→ ORDEN DE TRABAJO
→ RETIRO FÍSICO
→ INSTALACIÓN O CONSUMO
→ MOVIMIENTO DE STOCK
→ RELACIÓN CON ACTIVO
→ TRATAMIENTO DE PIEZA RETIRADA
```

La instalación:

- no sobrescribe la historia del repuesto;
- no se registra solo en notas;
- no crea saldo negativo;
- no duplica la pieza como stock y componente instalado;
- puede crear una identidad de componente cuando la trazabilidad lo exija;
- conserva compatibilidad, cantidad, serial, actor, activo y orden.

---

#### 27. Reglas de cambio de clase

La clase puede cambiar únicamente por decisión versionada y transición
reconciliada.

Casos permitidos:

- un grupo reutilizable pasa a control individual por criticidad;
- un objeto tratado como stock se identifica como repuesto;
- una caja durable se formaliza como contenedor físico;
- una identidad incorrecta se divide en dos ciclos físicos incompatibles;
- una clase se retira porque el objeto deja de gestionarse físicamente.

Controles:

1. conservar versión anterior;
2. definir fecha efectiva;
3. impedir nuevas operaciones con la clase retirada;
4. reconciliar saldos e instancias;
5. no cambiar historia de movimientos;
6. resolver reservas, LPN, kits, custodias y remisiones abiertas;
7. mantener equivalencia de costo y cantidad;
8. exigir aprobación y evidencia;
9. ejecutar transición idempotente;
10. poder revertir antes de la activación irreversible.

---

#### 28. `NEXO-INVENTORY-CLASS-LEGACY-CROSSWALK-001`

El corte físico de 963 productos queda materializado por cohortes:

| Cohorte física                       | Productos | Estado de adopción            | Decisión                                                                                                                |
| ------------------------------------ | --------: | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `ingredient`                         |       385 | `REVIEW_REQUIRED`             | contiene alimentos, empaques, aseo, herramientas, textiles y recipientes; no admite mapeo único                         |
| `finished` más `resale`              |       409 | `CANDIDATE_QUANTITY_STOCK`    | candidato fuerte, pero cada identidad debe confirmar que existe stock físico y no es oferta o servicio no inventariable |
| `asset` con solo `asset_items`       |        25 | `CANDIDATE_SERIALIZED_ASSET`  | 34 instancias observadas; requiere validar clase y consolidar identidad individual                                      |
| `asset` con solo `asset_groups`      |        85 | `CANDIDATE_REUSABLE_QUANTITY` | 86 grupos observados; requiere validar cantidad, retorno, condición y ausencia de identidad individual necesaria        |
| `asset` con item y grupo simultáneos |         4 | `CONFLICTING_REPRESENTATION`  | no aprobar hasta resolver doble representación y existencia                                                             |
| `asset` sin item ni grupo            |        55 | `INCOMPLETE_INSTANCE_MODEL`   | requiere decidir si es tipo, activo futuro, contenedor, kit, repuesto o registro sin instancia                          |

Reconciliación:

```text
385 + 409 + 25 + 85 + 4 + 55 = 963
faltantes = 0
duplicados entre cohortes = 0
clasificaciones objetivo aprobadas automáticamente = 0
```

La tabla no autoriza cambios masivos. Reconcilia las cohortes y remite la
decisión individual, su estado y su bloqueo a
`NEXO-INVENTORY-IDENTITY-DECISION-MATRIX-001`.

---

#### 28A. `NEXO-INVENTORY-IDENTITY-DECISION-MATRIX-001`

La matriz conserva el `product_id` UUID como identificador estable. Cada fila
usa el formato `product_id|decision_code`. El código forma parte de la fila y
resuelve simultáneamente el resultado, el candidato permitido, el estado, el
bloqueo y la condición de salida.

| Código | Cohorte fuente                  | Cantidad | Resultado por identidad       | Candidato           | Estado                       | Bloqueo y condición de salida                                                                                                                    |
| ------ | ------------------------------- | -------: | ----------------------------- | ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `D1`   | `ingredient`                    |      385 | `REVIEW_REQUIRED`             | `UNRESOLVED`        | `PENDIENTE_DE_CLASIFICACION` | `B1_FACTS_REQUIRED`: documentar función física, consumo o retorno, granularidad e identidad antes de decidir clase                               |
| `D2`   | `finished` o `resale`           |      409 | `CANDIDATE_QUANTITY_STOCK`    | `QUANTITY_STOCK`    | `PENDIENTE_DE_CLASIFICACION` | `B2_PHYSICAL_STOCK_CONFIRMATION`: confirmar existencia física inventariable y descartar oferta o servicio no inventariable                       |
| `D3`   | `asset` con solo `asset_items`  |       25 | `CANDIDATE_SERIALIZED_ASSET`  | `SERIALIZED_ASSET`  | `PENDIENTE_DE_CLASIFICACION` | `B3_INSTANCE_HISTORY_CONFIRMATION`: validar historia individual y consolidar identidad de instancia                                              |
| `D4`   | `asset` con solo `asset_groups` |       85 | `CANDIDATE_REUSABLE_QUANTITY` | `REUSABLE_QUANTITY` | `PENDIENTE_DE_CLASIFICACION` | `B4_RETURNABILITY_CONFIRMATION`: validar retorno, condición y ausencia de necesidad de historia individual                                       |
| `D5`   | `asset` con item y grupo        |        4 | `CONFLICTING_REPRESENTATION`  | `UNRESOLVED`        | `BLOQUEADO`                  | `B5_DOUBLE_REPRESENTATION`: reconciliar item, grupo, existencia y evitar doble contabilización                                                   |
| `D6`   | `asset` sin item ni grupo       |       55 | `INCOMPLETE_INSTANCE_MODEL`   | `UNRESOLVED`        | `BLOQUEADO`                  | `B6_INSTANCE_MODEL_MISSING`: decidir si corresponde a modelo, activo futuro, reutilizable, contenedor, kit, repuesto o registro no inventariable |

```text
005b3df2-cca8-4a48-942d-ed142f8ef812|D1
008d61d5-18a1-41db-8ff4-e6afd342b615|D2
00e55734-4a8c-44a3-b9cb-9144dbd15329|D6
010f0a37-0f33-4487-b703-11902de58295|D4
01c84672-ac54-49ae-926b-c3fcc8615d68|D2
02575aea-4699-4414-a199-6deb1543aad0|D4
02f60f26-37c0-4fc6-a170-51c2b7fce8c6|D4
02f6fd39-a6ac-481a-a788-cb080e7e8e9e|D2
0338517f-56d9-4dd3-bfa9-119c180e0f10|D1
03411cad-2708-4f35-88d5-06c672105191|D2
034fa85f-c355-44eb-8ce8-b7d76d5a968d|D4
03ad15ab-5abf-4fc4-b14c-dc6a2cce4f38|D1
03d31f01-6293-49ed-9c7c-18a082df02df|D1
03f08229-33eb-411f-93d5-4591b7ced037|D1
0469cca9-088c-44ba-a485-39dcaae4353c|D1
05124cca-e5e0-4bfe-9f21-1b186ff2d91f|D2
0515038c-0444-4dc1-92bf-4871f1ca2852|D1
052715bc-4c33-43af-8035-1d4df8445925|D4
058bd9c8-1ceb-42ac-98ae-832f5f89eee0|D1
05cf4d7c-7120-446d-bff9-528040f1ba63|D2
06114605-0ba9-4ad4-824d-7839de6afc24|D1
064cce03-c815-4cfb-9e6b-1567ee1167f5|D1
0659e3fc-682d-4908-8150-a3a081d3b622|D2
0698a179-2caf-43d7-adc8-de98e7441f22|D1
06b1a146-c8ae-423d-9c1a-fe50949ad13a|D4
06b4b086-53de-4bf0-9d1c-e5aa2b40146c|D1
07347e4e-0efd-4f46-828c-767ea7f190cb|D2
086c2349-43cd-43b9-bf2f-6f6eea719b42|D2
089cc123-93e3-43a3-b0f6-9cfbf9730e5b|D1
08c44196-46f3-4b6a-9ed6-d96bb3d6e26e|D1
08cff9c1-c2f4-4d95-9170-736a2e1b01c3|D1
08e349a2-d85d-4466-a67c-e3f7d508dffa|D2
09019992-e1bd-4463-9aea-cdbfa5624137|D2
0906092d-ad2f-4f52-a091-3bbfafc3c736|D1
090ea58e-c2fc-4a50-a91b-a18c64af580f|D6
0946cf84-70fa-4385-a6c0-97954751d9bc|D1
0972d7f5-f0a6-43ce-9d6a-beaeab815a5a|D4
099abb5f-bc8c-428b-b6f6-64739c364bb2|D2
099dd646-8b04-4290-b2db-95587f81fc8f|D2
09beb68c-a683-47bc-989a-063079ddb261|D1
09f17bf2-3aff-4771-9164-45ae6b976202|D1
0a47d4df-2107-47a3-9981-9f203d947b20|D2
0a82cfca-00b9-47b7-9ccd-f3104d0eeea8|D2
0ab74a32-a4e0-436a-8cd1-bf990df0bdf0|D2
0ac6b2e6-3dc8-484c-9627-e04d270e66cb|D2
0b7c43ec-4955-427f-9203-9b8188d8c299|D1
0bc2baac-db50-455d-bc8c-2ffda730137c|D1
0bca043c-223c-44a6-99f3-fed8105fb15f|D2
0bee6c8a-c1ed-4e77-94a2-532865652c40|D2
0c6a482b-d8f0-47fa-8d63-b21cd8d3cc8d|D6
0c741a2e-36e4-4709-be81-85d0c65903f4|D1
0c88bbea-4717-46a5-abe3-632521007012|D2
0cba0b8a-793d-4d98-86f9-85e500b07ab0|D2
0d18fcec-df74-447f-8df0-7cad8abf021c|D1
0d40e3bb-ccc5-44fb-a447-b31387000fe7|D1
0dd0c93f-6c86-4043-8396-2f0d39b37d9a|D1
0dd8cd7b-6ccb-4d6d-93af-80a0bd21bfea|D1
0e0ab677-9826-42c0-987d-1b4fbfd8153b|D2
0e2796a6-0ac6-4723-b994-0f6a2fd505f2|D2
0e391fd2-21f1-4123-be0a-39de90508301|D2
0e41a8fa-6d4f-474c-b3ef-948dc4deb4fe|D1
0e868d22-98c6-4d14-91d0-b6f3e7e5b105|D2
0f16cc3f-560e-44d0-a56e-e9c9c83816a2|D4
0f839b07-be3a-46b3-bee2-582fb52a59b1|D2
0f9e4a4f-aa26-4267-9127-7c8d22997eb2|D2
0fb5b034-dec0-4600-a584-2e835cd2400b|D1
102cacca-9bcb-4269-a6ae-6f969baac458|D1
105069e8-cced-4752-9c07-51a9d40ca682|D2
10bef515-b2dd-42d6-bff0-42570ea06581|D4
10f56d50-1339-4aac-8710-7ff4bf2b9af9|D2
1108c10d-fbb4-43eb-9d01-68da556d45bf|D2
112bcbab-7127-4ab4-8824-d57afaa581e0|D2
11492427-1367-47eb-b8bc-51119a7df3e7|D1
114e26e0-fda3-45d5-9640-6b65a2035011|D2
11606540-a1b1-4ff0-8b23-3c69269f9bb6|D1
11d98320-8faf-41d8-b006-29f46b61d978|D4
11ed3d77-a8e9-4d0a-a0e0-23738cfc423f|D2
11f198c2-2829-49e2-b32f-93df3e5038e7|D1
12744d44-31a9-4f23-b877-6b308b5871ae|D2
12ad9952-0853-4dda-b78a-37ef16940c34|D4
12b6c743-d87b-481d-8bf3-0031481fb691|D2
12ff4fd7-2c39-422a-b9bf-e89289fcdead|D4
131906ab-095b-4c49-b249-278f7a357bd7|D1
13525b36-8f35-4a09-8c21-c5a21c9d154e|D1
1397fa90-180a-4c8a-8e41-3ab1ed9a4fb3|D1
13b7b0ea-9cd6-45ae-a8fd-1035a89d6eea|D1
13d47350-ec1c-477a-afba-4146d0d0e9e0|D1
13ee6f98-2997-43e2-aab3-a7a46d8ca398|D1
14915a17-e3c9-4e71-b3ec-29bb20639ddf|D4
14ac55aa-9aba-47d4-b1a3-62ce3fcb5a90|D2
14b2145c-7b22-4be6-8e51-72e6713a4568|D2
154c46df-323a-453b-8441-d3754284fa71|D2
157eec37-e602-4c96-a6db-9e50264c1611|D2
15c02490-5f52-42d2-a8fa-d4ecc8277a13|D3
15d0144e-0eed-4ae4-899f-652990084a37|D1
15d4a6f8-67fc-41ad-9c5e-2622e0a0cbbb|D1
166c289a-edda-452e-8f47-e779c7153fbc|D4
16819c28-c86c-4037-851b-2f54160b98f0|D1
16b6185d-371f-4f54-94bc-51bf1770f70c|D4
16b7d54c-be1d-405f-9573-c51b7e27cce6|D2
16e6c092-2544-4fd2-9c62-df8f05ac8295|D2
16eca68b-4ca3-4f0f-8631-31b140b15f50|D1
170dc865-f23d-417f-8ec5-3f8b02696b39|D1
17b83553-2f8c-44fc-92a0-44eede2799d9|D1
17b89c99-fa06-46df-9b7a-4b12bdf7aab5|D1
1830f7b5-fbcb-42f5-9eb9-1fccfd5d8e8a|D1
18530d1d-0fc5-41c9-b1a7-7caaea298ed8|D1
1865aab5-e12a-4220-a1d6-0cc0d12c62ec|D2
187c0c23-dc8e-4bd8-9d24-37793d2e8ee9|D6
187cc540-f0c9-41ca-9af8-9c79b9c449dc|D2
18a3b1d6-7743-47b9-83f7-ad24c5c47ae6|D1
18d0f107-d869-4d68-ac39-47dee3d24163|D2
18eac218-16c8-494a-ba09-144cb10a61b3|D4
19233bf4-305b-469d-bbd7-27e37dc1fee3|D2
19863780-c68c-4412-a12f-df3a54b2939e|D2
19e52cb5-ac8c-4b7c-b784-ea0ebb8a7985|D1
19ef7b56-03fe-4218-8fc0-a7c51f2ba7c6|D1
1a23b767-3561-4f75-8b30-c2dca2949fda|D1
1a2e70d4-4c5b-455c-ad9e-952d0a6dea16|D6
1a8ea804-1bbd-46ce-9f00-38d6b05feab1|D1
1b23d7b7-b3df-4ed7-8779-4d71fdab5dc8|D6
1b25d88c-aa7a-4327-aa15-5141e5a9260b|D2
1b5a5814-ddc2-4bd1-8cf7-0e9437732568|D1
1b6cdc36-9b8c-4ea1-af1a-7349d0b138c1|D2
1ba7438a-8975-4a6a-a3db-a5d5c120f2be|D6
1be61e39-b381-406c-b497-73b2dbb62297|D1
1c7e6df1-8fc9-419d-8281-aff4c2814c83|D4
1cc8f9c3-8d97-4b7d-b9a5-54dabb91bdb9|D4
1cfcad4f-a857-48b9-b8b7-f3f17a18e7ac|D2
1e3ad478-929e-4cd8-a991-9d02f1402796|D2
1e99a2f0-2612-40f1-bb87-c721363dcd4e|D2
1f686d80-dfd4-41ce-8473-d4b689d2baaf|D1
20199019-b09c-4c35-be72-ca4030d36b12|D1
20404142-4dfd-4581-a719-4b150f194bc2|D2
207126a1-bdda-420a-b407-764be708f216|D2
209443bd-1d3f-4c92-82e4-833dfbae26d0|D2
2116a787-4307-4371-acd6-0d53b37cb26a|D1
211f9b54-4220-4b9e-8ffc-950c356aa04f|D2
21380507-f4f5-48fb-8ecf-2107584641d1|D1
21e41f3d-85a7-4704-b9d9-370458cd5b37|D1
224f1f65-81ae-4b07-b0fb-42dc123eafc7|D2
2415f66a-330e-4dae-bf93-ebe941d8892a|D2
24eaaa36-8501-45a4-839e-cea5e1ac21aa|D1
253772e9-562f-4160-b394-787ed72b729c|D5
25bc99ea-4f17-4d9c-b7b2-45410bf3782f|D2
26062d9e-78d2-475e-85dc-3f7e25ef2e3f|D2
26470f91-2e38-470d-9211-f6bca357e7ba|D2
26d3c6f4-7658-4319-8b97-d302f6765892|D1
26e3a67f-1b50-4913-b361-65601de6a166|D2
273f8b83-6b45-4046-8101-a99a2730e86f|D2
27890c97-a0a2-4389-ac2d-f2b2a169415c|D1
27bb69ef-cf73-4548-b928-cb723ac43db4|D2
28239478-300e-4f09-9585-f19e89bdaffe|D2
2832b193-af6e-46f5-8d73-1b7051e6c105|D1
287e4d1c-fa44-474f-bc18-91af6420ad42|D2
28cd5694-b9d5-4c84-9d6c-9befd57b5846|D1
28e6268f-565f-47fa-b26e-66c7b951680b|D2
292d8839-be37-4160-a5c2-b2abbbec0889|D1
2989283d-8d40-430c-ad57-09aef0cceb92|D1
298ca969-6d4b-4d7d-9045-a59ad4ef0e62|D4
29e965f6-0751-4554-8f1f-ba8745c57701|D1
2ab2c04f-2277-468b-8fce-bcb2df96f691|D2
2ac1c1aa-09b5-4a84-800a-864a62f3a808|D2
2ae46f62-60bf-459f-8115-a9358f36763c|D2
2b072cb8-0d30-4410-bcb7-f2a6d655994f|D1
2b0c45ee-0e66-4640-ba33-1c843f1b661a|D2
2c11cacb-df21-439e-a813-d8d15e3fad94|D2
2c3f28b8-f9eb-4b08-bd78-3eda0b4e6dc1|D1
2ceefadf-a67e-4149-8443-a57d7ada1c58|D1
2d1750ae-e575-4fb5-895c-b73a24f8c3f9|D1
2d18dcce-e90f-4ab3-8879-59f66ab0ca70|D2
2d61356c-df67-4cb9-8ed3-801185b0f2d0|D1
2d845158-e2cc-4326-abd6-93e175e899ce|D3
2e08594c-6d0e-4ca0-ac81-06044d2723ea|D2
2e40d6d1-faf2-4c77-912b-47ab58d004eb|D4
2e6ed1d5-eff7-478e-818a-e3a77f87614f|D2
2eae204a-685d-4257-ab7a-1826d72c0ee2|D1
2f1b6d3e-e161-493b-b3a8-944a30bb87cc|D1
2f2317fe-9452-465e-9bfd-22bc1681b6ed|D1
2fd062af-e75b-40ee-8fc1-351cc01342ee|D1
2fe2ef20-871b-43c0-a302-b4ab71681174|D1
30895ad2-71a6-4286-956e-24d01214e086|D2
313688ed-3a06-433f-8aa8-860c5ce12669|D2
313ee628-ada6-4108-80b0-de7682676400|D1
31693af7-ab13-4c39-9920-8093c09ef3de|D1
318df1ec-d831-4fe7-ba6c-554ca0c78a5c|D1
323f0f6a-b63f-465a-b4f1-0c11465788d1|D1
329bf8ac-3392-4193-8bf6-a67542105fe7|D4
334198ae-c394-48f2-83f5-af515905200b|D1
33433a0f-63e2-4946-a4e0-d2d078e8586d|D2
334ecca9-df55-4144-8f0f-a6f614763b0b|D2
3383ff31-34cd-40b0-8717-eb8dd464b8d5|D4
33a3dd5e-1bc8-48e9-bf15-f82d2a0ead03|D2
349a0494-247a-4194-b3e8-6c604452fe8b|D1
35330eca-7576-4e2c-b4a3-b43d28975fbc|D1
35c6107e-8e9b-4ebb-a4e9-91f551cd1a3a|D2
36f54474-01e8-4d4e-ae52-8918aeebb212|D2
37313d68-3e52-4509-80ef-a7fd3647f6da|D1
376eeb3e-8b99-4d67-accd-c5fbfd260259|D1
382b35f2-e12c-4ba7-afc0-bb944fb65e5b|D2
384ee9b6-5482-4a28-83fc-a43dacf05d74|D2
38697d2e-5714-4a76-8b59-062288d810de|D1
38b538e9-0dba-46f5-982b-794f569f725b|D2
38ecbbb7-252a-41c7-9919-6bf75232ea27|D2
398f89db-5386-4b0d-a1d9-bf8a8175bb1e|D2
39b77cba-f965-4af4-a303-36bf13ab7027|D4
39ccb809-d61e-4855-a4d8-72ffea68887b|D4
3a0e52d3-2270-46b8-b44b-658951f13f02|D2
3a3671c4-b09f-4f5f-a721-23e2b9f527f2|D1
3a454caa-f772-4540-9489-335fd180a71b|D2
3bd71743-430d-4d72-829e-585bf4de923c|D1
3bdcebd4-8fd7-462a-b295-b4aa39f1ab54|D4
3be5bc70-889a-439e-83b3-cc0130dc42fb|D2
3beb5fbf-4da6-4d1d-b888-d5ce90564e6d|D1
3c03b74a-9b5e-47de-b2f9-8dfe0cf39251|D2
3c0ab052-beee-43bb-abb0-cb6f75c4c4e2|D2
3c16e3e2-626a-446c-910f-327e6aa82510|D1
3c269594-8362-4ffa-bbd1-062570c9846f|D3
3c45f7ca-712e-4287-b2f6-30af6d2011db|D1
3c47c22a-bb19-47a1-b7dc-bacf2522c797|D6
3c60c7ee-5ab3-447c-99ea-0cfaa28a4622|D3
3c68e20e-0031-4722-9aa0-1ea2733d4c52|D6
3c6dab52-eddb-42a6-a1d4-d901b18a9a05|D1
3c8f37bd-9c49-48e8-8f3a-e36f625d37e2|D1
3cc5946c-d512-41a1-bc47-084bf288df8d|D1
3cfbd9f2-d0f5-4e64-9519-f87c68047813|D6
3d0c0d40-48a4-43ca-9dbc-b5f00ea0086c|D1
3d39e5ee-7eeb-4846-a208-170b96b6bc4c|D1
3da2bf52-8ab3-42ab-a299-aa1f7ad927f1|D6
3df01931-4806-4c99-9903-407ace277ab1|D2
3e4dd48c-9fec-429d-9e57-9799824ee5a9|D2
3e5ab6a2-e2c3-4477-a73c-d16787500800|D1
3eb9a2b8-4f62-4013-935e-ecd29f3f8618|D2
3efd2636-9f68-4aa0-9780-cff84b9f1ebc|D2
3f4939ba-1afe-476d-9e61-039a7f6ffad4|D2
3f5d2bd0-4ac7-42bf-a05c-88c9a27d056f|D2
3f77a02b-c87b-487f-ae11-abee25ed3a58|D2
3f7c5b37-beb2-4f97-bb1a-0ffab03d9d17|D1
3fb2aa66-6bf8-445f-ad20-8e72c0bd4918|D2
4036709d-cf3b-4c7e-bc26-019c91917060|D2
4042f395-e77d-4ca9-b06d-d111282076c9|D1
40570b9f-5987-47b2-b3c6-ef3ce233448d|D2
40640c25-ceec-475b-831a-18c092d462bb|D2
40937b36-d3ca-4cb5-bb89-c17488bb05a4|D6
40d7b6e5-65e1-4a86-9582-79dcf3d95a6a|D1
411a13fa-3d82-4f99-9c25-25e8ff1fe544|D2
419442e7-1a90-41db-82ca-a8eca2825eb7|D2
41aba5ca-5b82-48d7-b19f-c614e7d9192f|D2
42ad4143-2469-4ae0-8510-14507b614b6f|D2
42d7d1a8-379f-4ce8-b17c-6c86f79a59c3|D1
43141356-bba9-4be1-bb90-f1b159df62eb|D4
43433dee-f492-4c97-8aae-00ca93eae017|D4
43470a4e-1aa5-4752-9e47-014ba878b110|D2
43d53991-a87d-47ab-a5d0-4c97f99f8f54|D2
4437740c-2f53-43c7-ae41-0e8e82983f64|D1
444db9bc-4fb6-440b-9c96-773b5e765acb|D1
4459dce4-7898-45df-83a6-b8b9ba774f87|D1
4465297f-65c1-41af-ab68-db52c08ad627|D1
449a2b73-0c98-4e48-8269-c298519bf429|D1
4589a955-2f36-4c18-9415-0987466b185b|D1
45ce1c01-5c65-4f9c-846f-0caa5aa7ae76|D1
45e30a21-9fa0-4a41-a458-4e9179a4f86d|D2
45e5621a-6dc5-41c1-aba6-242562fdb9f3|D1
463273fc-26b1-4c73-8701-c5ba1bc57095|D1
469744f0-e5f0-43cf-a9b0-3725e2278796|D2
4722879f-bedd-4369-9504-0ec90410a577|D1
47247cf8-9c13-44e3-8d12-2a96ecfc2e2c|D1
473f76b2-3002-412c-92b2-e244c9641358|D1
47641fc1-3ffb-4d9f-9b9b-849aa65964b2|D1
47b00115-54fe-403b-9724-a0f07f82016e|D1
47dca876-72fc-477c-bd7a-79a1e2801f57|D1
481d2083-fc7d-4be5-b1b8-cda597e8ec09|D2
48377bfd-4cfb-4706-b47c-e4e7ea75760f|D2
485f1953-7644-4eeb-ad5c-595de849b3c5|D1
48b8aaca-aa35-4a3f-8fba-299c26dc9524|D2
48d0c038-0229-44c2-8ad8-92087d89687f|D1
48f7c975-7582-4f6f-8ea9-c45c70a60c12|D1
48ff95ee-de87-43cd-9517-07968bc876af|D2
495c8fb1-e018-40a6-871c-4fc0c745635b|D2
498149bb-84cc-4d39-90e2-39ee6eff0e8f|D1
498caa80-7e37-4bef-aae1-6572a8a0a7fb|D4
49951ce4-52d3-445e-b3d8-855ccb737f47|D2
49b68281-b5fc-43d7-97cb-8e5c2e07c028|D4
49b7231e-903c-47af-9695-3870342a99a6|D1
49c14368-911f-453c-abb4-b3084052e89b|D1
49db7f00-56c6-48e5-b420-0cafef1786b1|D2
4a063d3b-1c61-423d-be40-86b0ab8a1d65|D1
4a818a8e-6ccc-4d0b-b595-ce4410fe269f|D2
4a8426e1-7a26-4403-9649-3dc460da096c|D1
4a86ef71-736b-4d07-bc4a-81ca1db408ac|D1
4aa46fb2-3dbf-4820-8d48-f97f889bcc85|D2
4aa56072-0444-4980-a71b-345257b44fdd|D3
4aa705b1-54e0-4f6e-ad4f-4ff989ed1580|D1
4ab46277-5648-472b-9442-f7050555f74b|D3
4b35a4bf-ff04-4e25-a15a-2ba2bfa19e2a|D1
4b4c22b9-02b9-48be-9ef9-c4f392276d93|D2
4b6157f5-6aa1-4f71-bce0-40faa0c88171|D2
4b933fda-70ba-4a60-8cd4-7d8087392918|D1
4b990726-0c1e-4b4a-996d-3544017ea6ed|D2
4c629c79-ce71-40a1-8c60-45252ccecdfc|D2
4c699128-0658-4ee0-83b6-a187a4730e2b|D6
4c72ef9c-aba0-4d1b-9680-ab0c779d5d2f|D2
4c7bd2a0-d776-42f5-9425-74ffdd79d19e|D2
4cf80e8a-32fa-4845-b491-553479317897|D6
4d220fb6-0cf9-4c9a-9dce-9b4632166464|D1
4d2d43da-fa88-4b95-ab10-90b4e55a0852|D2
4d524c45-3f93-445c-bf59-85bfb33f90f3|D6
4d561053-6b11-437c-b321-423bb59c3cb9|D2
4d56a0c4-10d4-4e14-bd46-b6d835540eca|D1
4d7d3427-77b9-4361-9a37-75b8c229ab6f|D4
4dd989e7-fdd9-454f-bbb8-6a0fabee0e32|D1
4ddce8f8-eaa6-436d-9f63-45558f0bd750|D1
4e63223c-8133-4d8e-aab2-5dfe6d80a67c|D2
4e6aeb69-e923-407e-924e-33f2c1cc9f11|D2
4eab2507-e458-489b-bdf0-6dce644f67ff|D2
4f45a711-ae30-4188-be07-a0a94373fe64|D1
4f718536-a297-4495-b625-8a71cdf0f831|D6
4faf9084-b306-4d8b-9d3b-0eb26e9b9d0f|D2
5041c022-36c1-4ccc-baf6-bbe3d3dd2ebe|D4
5066913b-c86a-413d-ab5c-e772e94f9b07|D1
506c2640-5819-4694-98d2-1002339a7019|D2
50839a70-30d6-4c5e-b03e-d1cba6620f3a|D2
50e2f662-b570-4688-b221-5a10b52ef50d|D6
50f9a30f-a98c-404a-8cb4-12dfb5802bc9|D1
51655c42-0dae-4c1b-a763-9c6f2f07c93b|D1
520b9e6a-0b15-4102-bebe-7ed4c33e5fea|D1
5216780e-57d3-486e-a299-b6888236d04e|D2
523393df-f98a-4932-87e6-7b93b0ebd17e|D2
52561980-57e4-4048-8b76-585a0ba79fe1|D2
52cb8eec-7ab4-4314-890d-18f0cbb6ef00|D1
52ccfd8f-e4ea-4cea-8731-308341c1ea48|D2
53f4f0bd-72d3-48fd-8bcf-e232e6812a15|D1
541aa171-1c10-4fa6-99e7-fbb277fd6d16|D4
542402ff-afb8-4a7c-95b7-57986b2dffea|D1
54910231-e9b6-4a84-9739-9831bcc5f4a8|D1
54d73843-0403-4029-b4b0-b279b5f1d798|D1
5541f2be-b0c4-4512-a924-b944a720cc03|D2
5597e2af-b261-4220-8e9e-fe4e69f17c5f|D1
56917b61-7093-4652-8277-29d643791063|D2
56bd7148-9151-4c0f-a702-0ef47e8a63dd|D1
56e01a80-269e-4dc5-8c25-91b00fbaab8a|D6
570e147b-9077-4b3e-b1e8-dac8d248006e|D6
573438c9-78bf-44cb-af63-7dd2964ef2e3|D4
57431650-56d2-4caa-acd8-e3eae91f3cb7|D2
575ced55-ca85-4c27-b3a9-abe2bac272cd|D1
57808baa-cb8d-47af-9256-05d90f568633|D2
57929aff-2404-4517-9b46-2f1ff4cfe4e1|D1
579956da-58f4-41fe-bfcc-da0327b79e1e|D1
57ba4d45-3099-4bef-8239-6b3743986450|D2
5801b6bb-240e-4f07-a6fd-c1408cd42fc5|D1
5816489e-96d9-4f08-9479-74b88a6018cc|D2
584104a8-5790-412c-a562-72726d7cb04d|D1
5853a505-123d-46e9-939e-229268bbe751|D4
58d044b0-2f49-42cc-952f-d10e6c26b20a|D2
58d57dd4-ae8b-4763-adfe-3cc3e8759277|D2
58dde552-fd5a-4202-a7a2-b1165ae3ea84|D2
592298f7-3014-49bc-b216-efbc95105bbd|D6
59446a22-befc-4688-a0ad-c9d36b5d9d19|D1
59bf5bb8-b918-4135-8eb1-2989dd8bbdb3|D4
5a79b260-2e87-4af0-89ca-16f48d13274d|D2
5ab51665-1187-4800-92dd-b27f74b666ca|D2
5aec34d7-f5b0-43ad-9055-d924f9a3f03c|D6
5b755dfb-ef2e-4e95-94c2-77eaf3ecf46a|D2
5b7675be-44f5-45cf-9b79-2e7b45b4cce0|D2
5b9441d2-f964-424c-99d9-a13890cfe608|D4
5bb1be67-3a4a-440d-9bd0-14a64796c385|D2
5bb29848-644d-4f37-b346-6585aeb12364|D4
5bf34c41-b1fa-47a1-b358-b399085bbdad|D1
5bf72eab-09b1-43f6-aa65-11d888d92f9e|D1
5c066f28-9d46-4886-a616-c7befaf3933d|D6
5c213cdd-724b-4000-98d4-32b0a67b80d6|D6
5c28775c-7de0-469b-8855-97815aac40f5|D1
5c6ce7b3-e275-43f9-80ff-71eff7347c86|D1
5c959efc-34aa-4f0b-9aee-b32a6fce973a|D1
5c9a4e60-30bc-404c-b70b-6f94e955bee6|D2
5ca5ba8f-215a-4788-a8c2-0f566ba22441|D1
5ca6e162-9331-4246-bcff-87328ce87121|D3
5cc0d070-c4ec-4552-b35c-c7d03492a39f|D1
5d5083e4-b0ec-4a67-8329-4a3ed02841bc|D1
5dae0dde-c0ff-4973-a6e2-7fb09cb980bb|D1
5db9eeab-548f-4989-80b0-9611ff918dad|D1
5deac98d-cec0-47ee-9152-fdd104d8fd36|D1
5e0729da-20dd-423c-b07b-4cd55ddd2838|D2
5ed328e9-9304-47e6-8fb2-e61dee3b1c23|D2
5f0cf0a6-a639-4b4a-8da1-2783d52cd732|D1
5f43a498-0269-4e2d-aa6d-60f24d528509|D2
5f4c0e64-f802-407a-8c59-d30623a1284b|D4
5f77cba5-7336-4d6a-9638-013df3e66976|D4
5fa8673c-feaf-4dee-99f3-f07c7b8dbdb6|D2
5fcc5a93-b107-45b1-b853-24664eb2e6d8|D4
6020f9ef-9bc0-4a65-87f6-c4d84f601f4b|D1
6086d0fe-1319-4532-9ece-1cc2c468a31c|D2
608c46a5-3449-456f-bca2-0ae7c21f2f3b|D1
60de0762-6de5-46b7-b9c4-48871c4e8b8c|D1
60e780f4-5354-47d7-86ca-64eac835a8fe|D1
614569cc-8eab-4a0b-a117-de69ab082086|D6
6178a7af-36db-4b0b-94a7-cabb733b9138|D1
61808611-eced-41cf-b6cc-a8b8cb6c0b6d|D3
61b022af-291c-4b09-b8da-cc43baa279f3|D1
61b33cd1-9d53-42a8-a879-daf3f03461f4|D1
61e96452-5f36-4af0-a78f-ca0e8a1ad083|D6
6244e86d-22b2-4d52-83fc-882899ddb943|D1
62e435a4-e0cc-4c2e-aa55-71b73deb63c3|D2
62ec0c70-679d-49b5-9e3e-b9e058b5c184|D1
6330b583-aa60-44e0-82a0-adb1d6c3d6ab|D1
636fe437-372a-4283-85ba-10e6f69bc424|D2
6379d97e-9362-4e1d-8016-94ad8ec44d5b|D4
64273d7e-6692-4769-975b-392f9eee5edb|D1
645a435b-b29f-45be-a45e-b6958b158b8e|D4
646ec95f-55a2-4b1e-a6e4-8ed19b45caa4|D4
6473a91c-250f-4dd3-809b-5a34d5a209b3|D1
64c59bc7-4213-466a-84bc-26a000b00333|D1
654001b7-8d3c-4ed3-9e35-e80415caf4a5|D1
66380d91-884a-415f-8beb-d61a7e67bcec|D2
66506751-37bc-49d1-9c81-0a09c01317ca|D1
6663a610-16a1-49a4-91bf-edd1bf8debc1|D3
66869edb-f059-4b51-ab2e-27e67c844776|D1
66908ec9-1fb3-45fd-ad27-e2f92a963aab|D2
66a1ee94-ec4a-4530-bddf-d3824f85fd08|D1
66a2c08c-d354-4cea-b7d1-d08f03ed9333|D1
66b98180-a89f-41f8-b2d9-7b0c4144b0e3|D2
66c7a285-6df1-449f-9572-17f53adab185|D1
66d54c27-834e-4ab4-9100-7b128dbb62ae|D1
66e3cccf-4391-433f-ba79-d507d8d1dcbf|D1
66ea6ecb-04e5-454b-904c-ff1297c80fa9|D2
67898159-f0cb-4916-8fa1-2dde06b3d182|D2
67e563ef-893e-4ad1-b53e-72fb562608ce|D1
67ebf927-9d6e-484d-9822-b693068b0d88|D1
680defe4-b1b4-4012-be98-0e71c08ac623|D1
6852d575-3cd5-47df-9807-449f4bd02472|D2
68bda8c4-b408-4308-bc52-e9c83b6446ad|D1
692109f1-5387-4b55-a7a5-d3ee5184f5e0|D2
6930bf36-b180-4692-a85b-d32ecea4eb50|D2
6964e91a-9922-4e75-81e3-22a64ac2f32b|D1
697b325b-ae6e-47af-917a-7dc34c891dac|D2
69925a0e-562f-4b2c-a4e7-f092abcd68a3|D6
6a5607a3-09b2-423f-a946-301a52381324|D2
6a7e84cf-0d3d-471a-a3b7-ae1e03841d07|D2
6ac2d447-81d5-4230-ae49-d378002adbef|D2
6af8682b-adc0-443a-9c3b-2d1c18119e2e|D4
6afb41b7-b716-4c03-8615-1a0942c643c5|D2
6b0467af-80b6-4340-afff-f118f641d2ee|D2
6b3aaf2a-bb0b-4ad2-94c9-2f4be7464ec7|D4
6b9434c4-38b1-4270-87fc-41f449aec25f|D2
6b9bea3e-1716-4c2e-81d2-27d374c23d5f|D1
6c211a67-2db1-4beb-b27c-c62ab91fde64|D2
6c80a1af-a4e2-458e-87c9-ad0660d8abf1|D2
6c81f20a-23fb-424b-a53c-ba5511a609bf|D2
6ca54b37-43d5-49b3-9044-80678e785f3e|D2
6cb8fff4-52c3-4631-a716-5223b1af5885|D2
6dc2ed04-6bde-4b63-9bbb-ce3e9ca01baa|D2
6e4f1992-240a-4eb8-8e90-399bc85d46b6|D1
6e7dbe51-784e-427c-9874-4237c9e52816|D1
6eb04ac5-c779-4467-a349-3fe9a6513f15|D1
6eb3ad36-c85a-4e5e-8f30-6e92814d043e|D1
6f207515-d676-4fbd-95b2-2c8431f61b4d|D2
6f26a059-3ae2-44e4-8eba-fe738f2b9183|D6
6f91a0a5-8690-45d1-8daf-57100ae9e4ae|D2
6fe2a298-aa65-4fcd-9aad-bbab99f286a5|D1
7071c159-799a-4b19-a547-d46d8f72b7d6|D1
70a35510-d158-4f6b-a6c2-82dd7fa5f792|D1
70bc7be2-8ed6-44d2-9bf5-ac7308f21e53|D1
713140cd-197e-40fb-9c96-306983807fa0|D1
71882507-863e-4d3d-b684-9b76ecb5ec31|D2
71b12956-0fdf-4656-82de-a1c76778e1d0|D1
722839e3-47b4-414f-b260-b62a39dda683|D2
729318c5-0bce-4e82-b4cc-4e402f1b1ac2|D1
72983973-8f49-4a0c-9cbf-c518eb3554f3|D2
72faf05b-c811-4991-9459-68735cc0b47a|D2
73110168-6dfa-4281-acbb-ee02729d7270|D2
7346b967-957f-42ba-b49a-b55a7782279f|D1
737702f3-552a-4fd9-9a6c-8b97bb0f53b7|D2
737b4c06-13d4-4abc-9a6d-621423865ac7|D3
739a202e-363d-4914-80eb-f7f405ae3481|D1
73a559dd-9f56-4952-bea2-67bde75767c5|D2
743a7513-4507-411a-9bb8-327526e8323a|D1
74784215-209a-4f58-ab63-dcfb8275e6a0|D1
7480f974-6363-43fb-a04d-30ccdb727fa9|D4
74f02588-7999-45d6-9d27-8154ac7389d0|D1
74ff902d-bfdf-4496-8ea6-f559c70b3da9|D1
75037dbe-e5ed-4bb5-9ff7-1b2f1024cd5c|D2
750df0db-f2fb-4956-bdb7-2ebba19d7428|D1
7562c7c9-aa47-4f78-a403-12a0a3a2fb2f|D6
756a3ef8-0b17-4f90-8dad-1c9a122510ab|D1
759f2fd6-e54c-476e-96dd-75701723cad3|D4
75dd96af-c777-4b69-bc55-9bfca5fdf726|D1
7663a994-fb8b-40fb-8468-50bf442f39a5|D4
76768332-cb66-4593-9e46-add910018576|D6
767cea9b-3eb7-4319-9fd3-ee23debfbafb|D2
767ecc80-9b62-4261-958f-824df5a7e656|D1
76c6a812-7d87-4b12-b98b-e8434e2831d0|D2
76f107fe-2fdd-472e-81bb-c16d28fd8f42|D2
7703535d-f449-49c3-93d0-e8bb59071885|D2
770e5027-e2aa-4da2-a175-412820bf3b8e|D2
7762c54d-24ee-481d-88a8-2e6739d41f13|D6
77b6390b-b264-4d19-b79f-c7fde71ad1b1|D4
77e2e677-ed6c-48b5-b092-59a78a315fcb|D2
7839ab85-cf4c-4304-bb61-17427530673f|D6
786c4d51-fa92-4a99-ba68-9bc5b1b01bf1|D1
791c64fd-7d69-4e46-ae99-03be1d6fd2aa|D2
79234aa6-720b-4a09-9075-65d6b3a68f00|D2
7954c32e-5b3b-4a91-b5c3-51893fcf65fc|D2
79f60437-28f7-4938-a539-1ae4f6768931|D1
7a0452f2-3817-4290-b444-ff33ec27b2d2|D2
7a36c9de-fe60-42c7-b409-5892223bf95e|D2
7a88f4c9-69c9-46d3-9439-d347d487944f|D4
7ac13035-ce32-43b4-b9a5-6f88808ea508|D2
7adcd1b5-7109-4aa0-9510-583584af68da|D2
7c757e78-68ab-47a8-aff7-be53ccc89c77|D2
7ce1592c-f22a-433a-bd37-1c6a2ddf35e9|D3
7d5dfdeb-9bfa-4caf-9138-9b32f54ee043|D1
7da9dacb-42e4-4fca-a808-bc32a19acf88|D1
7e4795bb-e129-48d1-83ae-82a0a7cffd24|D1
7f28b4fa-5510-4e0d-8426-b62c3b0a2cd7|D2
7f30ee61-0343-41fb-8d30-518fcaf18bae|D2
7f579239-ba9e-4c78-90a9-635e2b2a33be|D2
7f7b8e49-e5a8-49e9-aeb7-317ca3cac050|D2
7f7d8173-ad62-45ab-ae9d-648050608375|D1
8098883f-6d00-4065-be38-d5206bd6111a|D2
80d86886-cd23-4b32-acbf-e3d64f78246a|D2
81599088-9b30-48cf-a571-b95d52e1b5cd|D6
816defcd-0a02-4433-b948-27d931357558|D4
81ceac83-7a58-4a09-906f-e95dfe6b474b|D1
82353e2d-e875-4e07-adff-99393df41ee7|D2
825eda73-92c7-4835-8b95-577a146358f2|D2
82d73038-6f2e-4338-b9a8-848c96450903|D2
82e0a009-29a9-4c95-a7a8-819e0dbaf449|D1
82f25679-7f0a-41f7-ba26-41a1526a05fb|D1
82fd8419-adc3-4c93-beb7-42cd38d1798e|D1
832a62a1-b0ce-4d74-807e-6d6dddcb039e|D2
834b8afd-8699-400d-b797-56dd9a601577|D4
836bd981-ab1e-4b57-ab02-7e2016ad67fe|D1
83815b30-8a7e-49d7-8bcd-2912ff119351|D1
83a07027-cada-4dab-8f02-9a66acb26aaf|D1
83c11ca2-1da2-4749-950e-e2db642d7a2d|D1
84049a84-fb60-4bfc-83df-0a21688e8762|D1
843ae2a2-d573-4997-ab6d-0e26b318576e|D1
84b9ef4a-acd7-4c9c-97fc-ed7b609dd28f|D2
84d3ecb7-958b-42da-8a4e-740373685d04|D2
84e0b57d-5343-4cab-83ed-19b5bc256d82|D2
850257c1-4be0-446a-bbd3-6ab14fc69818|D1
851346a1-37f5-49a2-addc-f5dd034a4af4|D2
85a5be22-d1b3-474b-bb21-3b2a67a97397|D2
8628a15e-ded0-45cf-8ec1-871e2ff71bd6|D2
86cab387-69da-4e37-ac67-f6f2ba06bbe5|D1
8732aa9e-51eb-4a58-bfa5-62874ad4e08d|D6
876e68ea-2a5a-48b6-a94f-af29315bd7b7|D2
88c3c3ce-6e13-4b9e-b96d-af4c07d88a78|D2
88cd625b-40a0-4ba9-aaf0-37751d187dd9|D2
88d22b10-64cf-42fa-8e87-dd906d73cdfa|D1
899683c2-6c23-4799-ad7d-019d5a0a9c14|D2
8a1082a0-0040-4113-bcea-b53e50f7c7a4|D2
8a38e8a4-cc27-4060-aa4f-a82f378c5e95|D1
8a4ae3e3-8631-4d72-bbba-c52125dbbfa4|D2
8a8fb3d4-870d-474d-9cab-0fa2ce5fb610|D1
8af934fc-363b-4a8b-812e-ac4643291d65|D2
8b35cee2-5a09-4266-8461-018bb7bfb4ff|D1
8b47f020-b3db-4119-a985-38ce64ceeb4a|D2
8b6840ab-f5d6-47a1-abc7-121fe5afee3c|D4
8b8962d6-7133-4dfe-a22e-ad57c9a3f01a|D2
8bfd4882-3175-4d03-93da-d3042d1c3d9b|D2
8c050a43-51b3-43f4-93f9-6a96f43ea24d|D2
8c1f16cd-ea7f-47cf-bd8e-7782e00546df|D2
8c477c17-2d61-45e6-a76c-efd49ff10120|D3
8c884f3a-1f3a-464a-aa41-cab218484661|D2
8c91c9de-82c0-475f-a01b-98746b473806|D1
8caf560e-8666-4adb-bdda-2bc1326cd863|D2
8dd6ab00-ccfc-47aa-ab09-eac0e543c835|D2
8dda0a9e-824e-4a2c-888c-3d1c363d64ad|D1
8ead2271-c4d4-414f-a25b-c7edfe33b2ef|D1
8ef62af2-c488-4e60-8279-2e68682eea38|D2
8f14e7ba-0763-4b45-9dd5-f15749ebd6fc|D2
8f2cd216-3310-4053-b7dd-9c3bbdeb7454|D2
8fdde401-b30c-499a-811a-8fffdf192b72|D2
903e08a5-7fc3-4e1a-85cd-b1e8b8e13f94|D6
909dac7e-53e7-4016-bc94-de5a2d8395a2|D2
912f5964-0274-4401-9a23-9b0ce3fa5768|D1
914a9973-d465-4060-9edd-62e62212b4c5|D1
91a8e147-b294-44ef-9028-308efe6cc278|D2
92145d9e-e79c-44f2-a2be-4ab98f3e8f60|D4
923e7c10-6673-422c-8b75-9715f67094c8|D3
926ee65f-d0fb-4f6a-9544-09fee3677ad1|D2
92708031-37ba-4d0f-bbb5-0e5f3c3ac8b5|D1
92b649a2-bac1-42b3-88e8-bd15b85e21a6|D1
92fe470e-bd50-4539-8588-3403ce9949e4|D1
93733fdf-0728-4afe-bf19-0512887184bd|D2
93a22bf1-3646-44ef-b240-81c769fe92ea|D1
93a416a4-c961-4dcc-9133-996ebae7f032|D1
94122215-9080-45e1-b617-2c5c1263f693|D1
952009af-06d9-4fc7-9ede-3858dfa7e28b|D1
95281265-8039-4ceb-81a4-e0c35d49367f|D3
9673c1ec-edb2-43a1-b67a-da018310b803|D2
96b79cd7-6848-49dc-bf3e-82f9d9f074cd|D1
970b1376-beeb-4bf9-92df-e091c31d6310|D4
9711eaf6-daa6-461d-80b4-f9a9fe511176|D2
971f8746-8376-4575-b7bf-5aba3618dc56|D2
978ecbd5-f4c8-415a-9477-899dd71e1bef|D4
97990b59-6153-4643-86c8-263919b3428f|D1
97c043c4-39a3-4558-99af-274cd40bc066|D1
97dcd8e4-b3a2-4f77-8688-5060caccf6a8|D2
97fad903-4e61-41fd-801c-5ab112c6fef3|D2
980953c0-3d62-4909-a416-88da1b513c2e|D1
98996db2-1d52-42f7-a4e1-c1c20abf9a61|D2
98db3d83-bcc2-4540-9b87-2d3817e6adec|D1
99801779-b9e6-4e8f-ae1c-f7bc85091c7c|D1
99e22280-b613-478c-afb0-15b1914305cf|D2
9a5cd47c-64a6-4720-81ac-d5ba1823fb5c|D3
9a681410-b509-4f7e-b0a1-7ba88d801d04|D1
9a96f2d6-ec63-4f23-bac5-a5e839249a20|D2
9af29f54-bf2e-4394-9f50-a3988651f186|D2
9b2f713b-39e5-4086-9741-25444a5b2a26|D1
9bc1944a-0a54-4e76-a9db-5f2a3b169ea1|D2
9be5971b-ef8b-4e6c-b338-98121e8d2289|D6
9c168e0e-e049-4711-84ab-6ada2eb79907|D1
9c1e4cd6-59b4-4c1a-8550-c546ae169e24|D1
9c5e2a0a-eb80-4e7e-9e3d-72c171503b39|D1
9c6d2d91-ed62-4930-a234-77fb8f40f1c9|D6
9c8fd5d7-f5f4-4535-a3bc-6a0c09d49a60|D2
9cf23eca-5366-4311-8b0b-1c67728507be|D4
9cfba9a7-90bd-4a18-b4ec-ad897a981808|D2
9d65a7f7-c517-4ccd-a7fc-90a7e2a0c973|D6
9db6bcda-53a6-4735-86bc-e336ba8a6622|D3
9dcd3328-4c7d-48ce-966a-5109d6045bfb|D1
9e03ae2e-cd56-4978-9a8c-f9da2d0732e1|D2
9e131b71-76c0-4846-82cb-572917aac3d0|D6
9eac4ffc-87d9-4ef1-8b18-78d394a8c743|D3
9eb22e31-6a1d-4fca-b336-b9a1a0f648d9|D2
9f3b685a-b3cb-420b-a40d-cb7720512e38|D1
9f6297ee-2841-471e-954c-4e79b5470867|D1
a05f17d4-6e0c-4607-b74d-6d0200ba7a82|D1
a09868a4-dcf6-4a4b-a775-85ff0b505d58|D2
a0c40b80-ab43-44e5-8bf5-dc4177805443|D2
a10fb984-4a5c-459d-893c-1ba5c663a26f|D2
a138a7c6-1727-4e0b-a0e1-40b7b778e6a1|D1
a1f4c67c-410a-4527-a34f-fc5a3a4f81f8|D1
a2029212-ad3a-4d02-8c8c-4e6e2ce96208|D2
a2229f28-ee2c-48ca-a19b-b4c010dffa16|D2
a29343f8-2515-48db-bfeb-54d96671a9a8|D1
a2bef857-8696-4585-a33a-0a0d7e3d587c|D5
a2efc649-2146-4b61-89bf-a96eb066e62e|D2
a301a0ee-e260-40b8-9ac2-ba15472662cb|D2
a3e9d09b-3027-455b-bf56-3eb2ebaf259e|D3
a3fd38d6-4891-4664-9e5b-4a4a63fe3a9f|D3
a417ada2-278c-4c4d-9d4e-3899e939f86c|D1
a420c821-edee-44b7-9276-37fb195f8252|D1
a4ae5368-a48c-4816-8e4d-b1e794753c40|D1
a4af2d39-f349-4c52-b06b-43b3cc5900f7|D2
a4cc387a-3085-404e-beb8-54b033f0ac74|D3
a4f5cf72-ac28-4c7c-bdc2-e773a3f2a1be|D1
a523d4f2-acb5-4677-be7d-57e70aa39cad|D1
a55f9e90-e40d-4556-bd19-8378da458754|D4
a5fe9438-4675-4965-a328-743fa5611e47|D1
a608a5fd-3b1c-463c-96ef-4edbbbe4a52e|D2
a6d158a6-46fa-457f-8fcc-1edf85991edb|D1
a6df1af3-5c6a-411a-8441-d65f7f563051|D2
a7f8f7e4-5553-42b9-96f3-53ffe4cdcedd|D6
a829674c-bdcb-4337-ba86-c2dc63fdbe5e|D4
a885404e-cafa-4eef-872a-5016311767a1|D1
a8d5f019-81ba-4192-9dc2-498f4c2f7ef4|D2
a8db44df-45d8-4348-8e83-5ac8997efcfe|D2
a915a16a-ea92-474b-b11e-5eb84b490988|D4
a9a41fae-927d-49fc-ade5-9163c7ffee18|D1
a9c06416-bc74-44e0-935b-b882863186bb|D2
a9dad08d-500f-4f6c-9f3b-f110a2a79fe9|D6
a9ed8ee3-dde6-4433-bebd-f79191462163|D2
aa3d1c65-e7cb-4c55-9027-531bab7db95e|D1
aa4fe56a-b3b4-403f-af98-99103fb7b7ea|D2
aa9fa40c-84d7-404c-bb44-793af8173080|D2
aaa126df-af05-4fe2-9e7c-ea2f1ca04ffa|D1
aabaf8c8-f757-4094-a568-81a030fd94bb|D2
ab4f5165-ca6d-4650-944c-dff5f33c338d|D2
ab52bb0c-0dd0-4e87-9cf2-7621ecbc9466|D2
ab849e38-ec56-4555-9462-ac0f397a759c|D2
ab9cc7cf-7c99-4c65-9d21-6667ca0649f9|D2
abbcd9bf-8f9d-4d08-ba67-4b7e0bc2cd16|D6
abd73c80-2f64-4425-91fa-d39a375d2162|D1
abd93287-bd75-4b92-9bda-8f520c8e3ad2|D1
acd24ce9-d4ae-4208-88f7-0bbc1d05bf23|D1
acddd25d-4946-4dcf-b88f-2861181f68f3|D2
ad349259-f003-4ea6-8e6c-8c674d7475a1|D2
ae28894f-672f-4c49-9725-38917f851083|D1
ae75c0f7-ece7-46d5-ab70-0f7c44c7c4e2|D1
ae9fc095-8f27-474f-b197-b436908f9c3d|D2
aee16304-af23-4e44-ac50-af66b049a574|D2
aee9a115-ca96-4eb4-9353-bd596d7d95d7|D1
af413d72-d255-47a3-ace8-d23ddf46f12c|D6
af8c43df-e750-423d-876e-a9047ccc28b8|D2
afa831a1-417a-4696-b04b-386182777d4c|D1
afb4f611-cd68-43dd-9def-9ba11797a33a|D2
afbcac6a-650e-4fd4-9e85-f92b55a199dc|D1
b03c23ad-7543-456c-a99c-0e30f06eeee5|D2
b06f4c26-b552-43c3-95ff-3aaed509a30f|D1
b15089c1-06a0-4fc5-9ad4-85600942386c|D1
b182d4de-96e8-48e1-9b70-54a02860da97|D1
b193ee54-2701-4731-a996-eed140820d24|D4
b25e3597-de0e-4265-9981-4b0bcddef24d|D1
b322762d-9cc1-43d8-832e-66659eb63e74|D2
b3575318-3c20-4924-8b93-83186de765fa|D1
b3cda0cd-3df5-4bac-a12d-366c1decb0eb|D1
b3fb12c1-d9e6-4281-bda4-08a65b20141d|D1
b41b4d6b-0965-417b-baac-755e1f0cb22b|D2
b4d56187-0be9-4956-b4aa-0259f939c388|D1
b4de4752-e6ef-413e-bf41-e39e775faf48|D1
b4f48220-f218-44e0-8ca3-4745a1765178|D4
b5533761-6555-40b8-9605-d7aae6372d8d|D2
b591f230-81ec-4f6a-93ec-7fa7baa90588|D2
b5a90996-1f6f-4452-86ca-5c5efef2f092|D2
b5bd54be-e6ae-40a9-aeea-e89bd0f28bbf|D1
b5bdd3ba-cd34-41af-876a-a089a83ea56d|D1
b6032bf0-4624-4d83-af7b-0fa043bc5f99|D1
b6212d56-325c-47c2-9b5a-0af2796930ac|D1
b6a1a340-1f13-4cdf-9902-65fdf186fe1b|D1
b6e9c59a-d03b-44bb-8a6d-1f868a187ae3|D2
b70b4d16-06e1-4f4b-a29e-d89a0e499ae6|D2
b730b55a-36ff-4fa9-a241-3b4339fd41fd|D2
b74bc247-3b6a-4f69-8be1-ae997ff95eec|D1
b76141d2-6a6a-42db-9251-cfd137b10d3c|D2
b80abfff-3b79-4fc0-a31f-692835ce5852|D2
b80ce000-566f-4ea8-b8f0-df3125a04fa3|D1
b917ad34-9668-4d90-89d3-3d865f7b1e36|D2
b9658e63-64e8-4c37-99de-5ef181910cb8|D6
b98f0b5b-aa88-4275-8173-9052390d3f68|D6
b9becd41-e66e-4615-92f7-5b24a7fbb15d|D4
ba0bbdc7-681d-437c-bbbb-0f0a329747b6|D1
ba5c20fd-be7b-43a6-b8bb-41d8cf75cea6|D2
ba858854-ed29-4cff-966f-25374876e6c1|D4
ba8cf3d6-d7d4-4aa8-a29d-c3fec461318c|D1
bbde2bf6-0777-4bd3-acfc-25652b7aedba|D4
bc4f7715-92a2-432e-a838-0a7560278510|D2
bc749d13-196f-40af-ae3d-82b1ade1d609|D1
bcefa6db-9e0e-4d9f-b27b-26d0d2d6f2c9|D2
bd2d25a7-3174-4085-b8a3-2798fb00a70c|D4
bd4584cb-3d60-4304-8909-18422bd8aa7e|D1
bd8e9e2a-c6e4-4f61-9f82-685e3e9ac4e8|D4
bdbe7250-d3ad-4937-94a1-e5c11f55d34a|D2
be2f9650-175e-4470-83ca-cbd951579215|D2
be464ba2-1484-4bc7-8087-75bd027814d4|D3
be5f445b-28bd-421d-a881-c74cac0513bb|D2
be7edafa-8141-4a5c-9293-50b50666f268|D1
bf36c39f-25fe-40c1-b258-8c53a6dac7d5|D2
bf5e52a9-6066-45db-a453-5a6fbf3b6d34|D2
bf762747-858e-403e-9c9b-ab44681f1dd8|D2
c0eaa116-fae4-492b-a8a1-162ed9e547bf|D2
c101e7d5-253f-424a-b67b-eddc7231413a|D2
c187125e-6bee-44f2-a8db-93140d2bebd9|D2
c1fe29cf-64ca-4c00-ab49-7af40e70eeb0|D2
c24b7e5b-f12d-4f42-9804-b2a7f49bcb61|D2
c28e6fe9-5826-44f4-ba6f-7efdc05861f8|D2
c29cd6ec-3bdb-4495-aebc-6ed5d6051ad4|D2
c350f3bd-ee60-486b-8a0a-c73fb36110f2|D1
c39242cc-7cd0-47cd-94b0-eca90aaa641a|D4
c426a3ec-ed72-4db3-a5aa-96d9409115ba|D2
c4cd00f6-b0fe-4180-b8b1-53464bc9b9d3|D2
c5139fe2-b04d-403c-91ca-c47f855bafed|D1
c52c568e-8cba-4e4e-b3b8-1b4f0a1ca813|D1
c58eabc4-5ad7-4872-9b4b-6c76268e3409|D2
c59b5e3a-8cda-47a4-abb4-9e9280605e9e|D6
c5b1961c-0ae8-4ce0-b6f8-9e16f544b151|D6
c5d4f677-0274-4f9b-9533-050c1794e9d4|D2
c618236a-5864-466d-bf8c-699d6c146e25|D2
c67a7fa9-f537-4e59-a612-9f32b9280314|D4
c6d212ed-9edd-4715-992c-219b37c3ca4e|D1
c7111ef2-7a39-4531-bc6b-df04d9fb9c1f|D1
c79a79bb-93ec-4787-9ca4-99ba0f778e69|D2
c7d85bbd-3d65-4338-9e16-3fbac0a92868|D4
c7e21fdf-0f38-429d-b9ce-eeab361051b0|D2
c80ed0d2-010f-4643-aed1-45ba8cf0e911|D1
c8aa8046-ca46-44f8-9144-84b54a7f61be|D2
c8ca93f1-2e9a-4e73-a22c-d6256281aa61|D1
c9356466-9179-4b20-9a66-50dc817919ca|D1
c9955703-5ab1-4005-8644-28dec1d582d3|D3
cac8116e-3274-4a63-9fbd-bb30e1c2dd74|D1
caddbb71-abc3-459c-afcd-25c4174875d1|D2
cb2829be-6494-45e9-bf2c-29436cf5c587|D2
cb7423d3-eb7f-4785-9d85-418d25884bd0|D2
cb798da0-ad73-49ee-8a7b-836c788866b5|D2
cc44a954-a3c4-4900-afe8-e53cf39212b6|D2
cc470af9-12c0-46ee-ad5b-35e2ca962b11|D2
cc5ae544-8255-4c02-a38d-a829fb36e8da|D1
cc8ab41d-4310-4995-b377-a56e7b25eba5|D2
cd0a666a-6045-4719-a148-0f6709e1b94a|D1
cd167bf8-6266-4073-bee6-a3aa424f4aa0|D1
cd5670fa-cae4-43af-a6e3-64b65f4eee20|D2
cd6bb24a-efed-4784-9664-5c06731421a3|D2
cd7563c7-bc4d-4737-8fac-2301121c2d7c|D1
cd759a5c-f6f8-4e10-b907-6cc0624cbfd3|D2
cd7f29db-0765-4822-a1e0-12f973936452|D2
cd7ff907-81b4-4890-a084-779188433ee3|D1
ce0e5301-6d13-46d6-984b-7446639809e5|D2
ce6a0e8b-53fc-4c96-bd06-2b1b344d8a86|D2
ce7063ef-c60d-48ad-b253-346d9a99368a|D1
cf03a681-adf5-4237-86d9-e4f6079a695c|D2
cf3c5e31-17c4-4aaf-b456-b69efc6e8f1a|D1
cfadeb54-decf-42c1-9f0b-efa78ba205e1|D2
cff5ec9e-3ba6-4b7c-8125-1c4d347fb062|D1
cff7d285-a632-4010-993a-17ea6c9360fb|D2
d03ba8c8-661d-4e20-8211-6105a0a87032|D1
d064c496-2979-4433-a103-52d25723333c|D1
d0709a88-fdc9-46cd-9a7d-670816f10501|D2
d0db8b4e-f761-4610-beab-8b47ef28d040|D2
d112410c-8323-4975-a227-4cb3b7f88624|D1
d14976bf-280d-4415-947d-05f86dbf843a|D1
d15cbb62-046b-48b9-b010-e78d7d750990|D2
d1ba6fe4-1c0b-4306-a30e-5bef771498fe|D2
d1f197d3-217a-4e54-8dd4-8be7ef0716d8|D2
d2322e22-044e-4c3c-ba1c-47cf3880705b|D1
d35151da-b2e0-4903-90f5-bb9af31890a1|D2
d36f44cc-3d31-47c7-a3a7-416e06fb6dcd|D2
d3972ed1-27f3-4659-a05f-6cb6c91b16eb|D1
d3b3acf2-aa48-4115-a56e-ede925ced84a|D1
d44117f7-f836-4eb5-b43c-53e949ae4cee|D2
d5254786-a400-4ad4-94ba-497aafe8bdc8|D2
d598a79f-2b82-4b2f-9f96-8281a9ff3199|D2
d5cb9503-4321-4a27-be83-0f38d0a32880|D1
d5ecd6d4-affb-43ab-8b44-326168f71e2d|D1
d63eff15-bc81-4047-897d-58d1b7abb4ce|D2
d668c0b8-5d53-4cc3-9334-cafd655d3954|D1
d6828e0d-f1b2-4fa5-93c6-71bd4d15deb8|D4
d775850c-3a0f-4d3f-917d-37121d45717c|D1
d7809b42-af4e-41a2-9ee3-844374106e11|D4
d789639f-7da1-434a-9426-a91cc7bf99dc|D1
d79d4a3d-2db2-4d67-95c2-259ea0245283|D6
d79d4bbe-bf38-4819-86ac-cf82c613351c|D1
d7e5718d-76b2-469c-afa0-969f467e9126|D1
d80789c8-7dba-4138-88c7-3d3c36bf1f83|D2
d894b11c-5434-4d4d-aaec-78610bddc2b9|D2
d8a23407-56e8-4768-9442-fa1b5a7bb514|D1
d8f832f5-c01f-48ea-9fe6-13cb1994864a|D4
d8f89235-55c7-4c43-a826-8b4713781146|D1
d9d03e48-fa7d-42da-bd64-e7ef02c6adc1|D2
d9e3d3e0-7eb7-4835-8b73-726389b85b93|D2
da6bd18a-a581-455d-8edb-4784c00bcdd8|D2
db5890f4-69d9-4d02-8484-811772185b7e|D1
db599e31-59ab-4ac3-9ea0-994ced46dc46|D2
db59b2ab-5dad-40c5-809b-271d8aa38d3f|D2
db59f493-f735-42f4-86ea-685c9d27eea6|D1
dbb32692-f1c6-46b2-9f74-a275c8de48de|D3
dbf324bf-bda5-44f3-9166-77ae58614784|D2
dc3352a5-a480-44da-a169-c258271acc67|D2
dc7f893c-d6eb-4ecc-aad0-5a8a8cdacbf8|D4
dcb21880-f353-4f29-9c9e-8a44009eaa02|D2
dcb4ce05-1978-4ec1-ae8d-f4ed13bc67a6|D2
dcecf9ad-845f-4406-ba3f-d2ff8cab3144|D4
dd019c32-84b3-460f-9090-c62e9f4f17ce|D1
dd6f44cd-ee54-4906-9b7f-fe88afaaf800|D2
dd755eed-546a-42fc-9ec0-2cf553812279|D1
dd7cb62e-acd1-4b6c-a1e9-c75563cab732|D6
dd80c310-0091-414c-a942-702c12710d7b|D1
dda537ff-1f02-445d-88a6-2f725ba32e48|D6
de1f6176-3449-44f0-9bb4-010fcf9c93c8|D2
de43f5f5-53aa-4999-a0f6-587ef067073b|D2
de7df240-f977-4670-bce7-6c791528192f|D2
dedc5b97-c820-4642-ac2e-515d85032e60|D6
deef4ce7-c1d7-427f-914a-077c88340dea|D4
df0b7460-1c81-4511-9c00-34e556e1da06|D1
df577b0e-a93a-411f-919a-d7227fd4059c|D1
dfc16f52-794b-4a0c-8251-944622322616|D2
e189d7f0-939a-439f-a145-13631ca19f8a|D4
e18a0219-c29a-48aa-9a1f-65eb6d322a17|D1
e1f63ed4-7bf5-452f-bfe0-6d2d8058856e|D6
e2be67a0-e7f0-4b16-bce5-cf6e6ddebcc1|D1
e3053956-fbe2-4cdb-af87-737b89c74f84|D1
e30a6b42-d826-4901-ae46-82b31ff6834c|D1
e31f7038-6d76-4e70-b3e2-c184ac00efa2|D2
e365bf9f-5b7b-4b1e-af42-5fadfdb909cb|D1
e39b2a09-d7f0-4612-8675-aa150e120a2a|D1
e3a79547-fcf7-4e6f-93e6-259a9fa3352c|D2
e3d51650-27f6-4116-8f01-39469ff41add|D1
e3fd6cba-7b72-43ba-a58f-89e8e6d88174|D2
e48dc98f-e2f2-4856-a8f9-161f30d7cebd|D4
e4bf3ee1-018c-43ae-a595-7887930b9d3e|D2
e4ef76e3-5330-4c35-834e-8bcbbff95a12|D1
e509e5dd-d52e-4eae-afd2-f9b01c50e712|D1
e516d3fb-06e6-4899-9f59-ab4c58010491|D1
e5551867-4329-48c1-8b6e-6e72c17f0b0a|D2
e569f30f-b3e5-482e-98fa-be4324ec5f6f|D2
e57e0a5a-4e1a-4372-9971-9791e94e6942|D2
e5d0fa9e-e6df-4867-a75d-40bef09b1a2b|D2
e62a36a2-b0d8-413b-b9fc-89aea36d49d5|D1
e678b2d9-61cd-4eff-82d3-ddf14f81383d|D2
e6863b92-2953-4ecf-bda5-50ddafe62e94|D1
e6a21042-1df7-457b-a6fe-568bfe9457e2|D1
e72f9470-889e-42ce-a0d5-77175d039ae3|D2
e752d48c-24e8-41fc-a183-116047814a43|D1
e773da3f-e019-4099-8305-8f783c437908|D1
e7fb3a22-2cf2-4746-840c-59c42e52504d|D4
e8677dc3-2412-4ee6-a72f-3cac382d8f85|D1
e89d0afd-20c4-45b2-81fa-04e2ac500824|D2
e8e642a0-265c-40a1-bc4c-714eaa3d676b|D6
e8f2d0e2-4906-4ce8-8b5a-254f7902a43b|D2
e951e25c-4da1-4464-8de1-d82320737b99|D1
e994efc4-bcbd-41a8-b116-3ae5dd721e8d|D6
e9f83880-2b15-4a23-a171-b5b376ee0429|D2
ea45d1b3-4b3c-4c82-8cb6-dd12a5b4de73|D1
eb37e847-9d19-4d54-92b4-a38c69a11e98|D1
eb81971f-1aab-4e14-b41d-8fd02df0c461|D1
eb910e88-c185-42a8-8250-566eea6f83bc|D1
eb9487eb-1c12-450c-9037-c6dc446405bf|D1
ebe62d81-f211-4b4d-9418-3c0d81ba4a3c|D2
ebf26263-57f5-47f0-a6c6-d158c3cb9cb4|D3
ec100501-ff5d-4e27-a5cc-8985510ab8ce|D4
ec448eb0-739a-446e-948b-655a939317de|D2
ec4765bc-296d-4148-8cee-9b3ad2d3b055|D2
edb369a7-b937-42b9-9e3d-4e0ae6466070|D1
edba4b2c-a5ec-49d6-8c7a-ee1eaba942d9|D1
edf11207-e643-496d-9edb-fb78366fc095|D4
ee0c502c-339f-47bf-a13d-ca401e173242|D2
ee13f87a-2718-4508-be6e-255cad3c10ef|D1
ee4b5f1b-170d-4cfe-8a7c-0d48f2195ca5|D1
ee7b1680-cf10-45f7-8b30-4709e9767b6b|D2
eece0e53-893c-4621-afa6-740c40afad77|D1
ef0d8c87-ce73-4584-bb9b-eadfaeadcb1e|D2
ef356138-8513-45d6-a0b9-253ceceb5b8a|D6
ef55719d-69c9-45ba-9cb5-7f51c28310c7|D2
efb4f0b9-9fae-4116-a7b6-2a392611c2fb|D2
efc05933-9a88-4259-b6ce-a7ee459c575e|D2
f0063be7-51ef-4bdc-ac8e-50cfbfbba91d|D2
f052d54e-2ff6-4ec0-9323-81a3cd924ae8|D2
f0956e68-0094-4682-87b3-c12822dd1328|D1
f0fdd33a-b03d-4ea3-9bb9-c499f19d7f44|D2
f110b03a-fdb3-4b8d-8cf0-24de9eea98bb|D1
f169410b-fe0e-42d4-815c-e588daa5c2a8|D1
f18e96a9-f524-4f51-b6b6-62a2fa86c816|D2
f1b05cc9-8d52-480f-8e60-a27df5625788|D2
f1f0f500-027d-4432-bc2b-28abc14fe693|D6
f24fcf33-16db-49b0-9a19-afc31a453cbf|D1
f27a18b9-4b81-4846-96e5-e21538f49183|D2
f2828fab-00f9-4847-98df-7bc63329e632|D4
f2918cbc-283f-4e04-81a6-736b93ce5d82|D2
f2a703e3-eba7-4e67-950e-754deee854ac|D2
f2c0bc54-d9d2-4c0e-9192-99bdd5cd86e6|D1
f2f46cdd-497b-46e1-9085-a268fa56a43b|D2
f3c8752c-8347-49b7-b3c3-1891f6583614|D5
f3f59ee0-b81e-4ca3-b2b5-675f47468174|D1
f40aa33a-784c-4f58-a444-b221c6d3f201|D4
f43256f1-10dc-453c-a1f0-13e8180ada54|D2
f451e8e2-96f0-42d1-877f-409dd1ab0be8|D3
f4aa3520-f584-4485-963f-3dbfccb8a63e|D2
f5231dc4-4ca5-40bf-b69f-9b14aafe993b|D2
f5631d14-78df-4cd0-b7ff-2a6c0811578b|D1
f5f35543-9667-4936-87bd-e732a88952ac|D1
f6d23dc7-ec12-40f6-aec8-d87410274447|D2
f701de70-78cc-4319-a452-473525fa3590|D2
f72994ee-1f5e-4fda-9097-95c823e4aa1a|D2
f7561546-f631-45a6-9b9c-a3bc89b28010|D4
f7aff496-6687-4575-b342-30f8fdaeb4f6|D1
f80f232e-46e1-4e5a-a404-4579a1b72c44|D1
f87b45ff-dce7-4b8b-a25c-97d290a02267|D2
f89621bb-04e5-40b9-b338-5a61a9ec2d2a|D5
f8e0ca07-b4bc-4dd5-a8f2-06b73daf0252|D1
f904247f-bc96-4923-ae67-2e65beaee0ba|D4
f96fb6fd-7122-4048-b7d8-584bedbe124d|D1
f997a1ba-76d5-47c8-b97f-0395d893f651|D2
f9fdd102-1a36-45ea-8482-e4a1cdf2436a|D2
fa74b543-e07e-43e3-84a6-ea987ffeeb06|D1
fa7c5f99-d2dc-4cab-9fca-adcffdd1be87|D2
fb6ee78d-6129-409d-aeca-4a0d52849b7d|D2
fbd2dd92-0517-483d-b004-25fcad40d002|D1
fc3dc21e-eca6-418c-b42e-3b4797910989|D2
fd3be1e3-6319-45b6-9591-f041db3fe9ce|D2
ff332de2-c287-42ad-96c5-4fe2bf125134|D1
ff6bd1db-8e5d-494e-8e14-859034acfb1d|D2
fff65edd-b05a-4d5b-9061-8576b9708670|D2
```

Reconciliación individual:

```text
identidades esperadas = 963
filas materializadas = 963
product_id únicos = 963
faltantes = 0
duplicados = 0
D1 = 385
D2 = 409
D3 = 25
D4 = 85
D5 = 4
D6 = 55
pendientes de clasificación = 904
bloqueadas = 59
clasificaciones objetivo aprobadas automáticamente = 0
```

La matriz materializa una decisión explícita para cada identidad sin declarar
migración ni aprobación final. Toda clasificación definitiva exige evidencia,
aprobación versionada y transición reconciliada.

---

#### 29. Snapshot físico ampliado

El estado desplegado observado presenta:

| Métrica                                            |    Resultado |
| -------------------------------------------------- | -----------: |
| Productos                                          |          963 |
| Productos activos                                  |          950 |
| Perfiles de inventario                             |          963 |
| Perfiles sin producto                              | 0 observados |
| Productos sin perfil                               | 0 observados |
| `ingredient`                                       |          385 |
| `finished`                                         |          382 |
| `resale`                                           |           27 |
| `asset`                                            |          169 |
| Perfiles con `track_inventory=true`                |          792 |
| Perfiles con `track_inventory=false`               |          171 |
| Perfiles de activo                                 |          169 |
| Productos de activo solo individuales              |           25 |
| Productos de activo solo por grupo                 |           85 |
| Productos con ambas representaciones               |            4 |
| Productos de activo sin instancia                  |           55 |
| Filas `asset_items`                                |           38 |
| Filas `asset_groups`                               |           90 |
| Perfiles UOM                                       |        1.190 |
| LPN                                                |            0 |
| Contenidos LPN                                     |            0 |
| Funciones inspeccionadas que leen `inventory_kind` |            2 |

La ausencia de LPN no prueba que el contrato sea innecesario. Confirma que no
existe evidencia operativa para certificar su comportamiento actual.

---

#### 30. Comportamiento físico observado

La base física conserva:

- `products.product_type` limitado a `venta`, `insumo` y `preparacion`;
- `product_inventory_profiles.inventory_kind` limitado a `ingredient`,
  `finished`, `resale`, `packaging`, `asset` y `unclassified`;
- `asset_items` para identidad individual;
- `asset_groups` para grupos por cantidad;
- `product_asset_profiles` a nivel de producto;
- `inventory_lpns` con `container_type` embebido;
- `inventory_lpn_items` limitado a producto, cantidad, unidad, lote y
  vencimiento;
- dos funciones que ramifican por `inventory_kind`;
- filtros de stock y activos en NEXO que interpretan `asset` como una clase
  única;
- políticas RLS de activos basadas en permisos generales de stock, ubicaciones
  o conteos;
- políticas LPN con modelos legacy de sede y permiso.

La implementación útil se conserva como evidencia, no como contrato final.

---

#### 31. `NEXO-INVENTORY-CLASS-PHYSICAL-RECONCILIATION-001`

|    # | Brecha física                                                                                              | Estado                        | Destino canónico                                                  |
| ---: | ---------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------- |
|    1 | no existe campo físico para las siete clases objetivo                                                      | `BLOQUEADO`                   | `SUPA-ARC-003`; `SUPA-TRANS-005`; `SHELL-CON-001`                 |
|    2 | el constraint de `inventory_kind` conserva taxonomía legacy                                                | `BLOQUEADO`                   | `SUPA-AUD-019`; `SUPA-ARC-003`; `SUPA-TRANS-005`                  |
|    3 | `product_type` mezcla propósito comercial con identidad física                                             | `PENDIENTE_DE_RECONCILIACION` | `CAP-SCOPE-004`; `DATA-NORM-AUD-004`; `SUPA-AUD-019`              |
|    4 | `inventory_kind` mezcla rol productivo, comercial y control físico                                         | `BLOQUEADO`                   | `NEXO-DOM-001`; `SHELL-CON-009`; `SUPA-ARC-005`                   |
|    5 | los 385 `ingredient` incluyen familias físicamente incompatibles                                           | `PENDIENTE_DE_CLASIFICACION`  | `DATA-NORM-AUD-004`; `NEXO-UX-001`; `NEXO-UX-014` a `NEXO-UX-019` |
|    6 | 409 productos `finished` o `resale` solo son candidatos, no adopciones aprobadas                           | `PENDIENTE_DE_CLASIFICACION`  | `NEXO-UX-001`; `SUPA-AUD-019`; `SHELL-CI-016`                     |
|    7 | `asset` agrupa control individual, por cantidad y tipos sin instancia                                      | `BLOQUEADO`                   | `NEXO-DOM-009`; `SUPA-AUD-019`; `SUPA-ARC-005`                    |
|    8 | cuatro productos poseen item y grupo simultáneos                                                           | `PENDIENTE_DE_RECONCILIACION` | `NEXO-DOM-009`; `DATA-NORM-AUD-004`; `SHELL-CI-016`               |
|    9 | cincuenta y cinco productos de activo no poseen instancia                                                  | `PENDIENTE_DE_CLASIFICACION`  | `NEXO-DOM-009`; `NEXO-UX-030`; `SUPA-AUD-019`                     |
|   10 | `product_asset_profiles.serial_number` está en perfil de producto y puede confluir con serial de instancia | `BLOQUEADO`                   | `NEXO-DOM-009`; `SUPA-ARC-005`; `SUPA-TRANS-005`                  |
|   11 | `asset_groups` conserva cantidad esperada, pero no un ledger canónico propio de reutilizables              | `BLOQUEADO`                   | `NEXO-DOM-011`; `TREQ-NEXO-011`; `SUPA-ARC-006`                   |
|   12 | no existe relación física canónica repuesto, orden de trabajo, instalación y pieza retirada                | `PENDIENTE_DE_IMPLEMENTACION` | `NEXO-DOM-016`; `NEXO-DOM-025`; `TREQ-NEXO-014`                   |
|   13 | no existen definición, instancia y miembros canónicos de kit                                               | `PENDIENTE_DE_IMPLEMENTACION` | `NEXO-DOM-014`; `NEXO-DOM-015`; `TREQ-NEXO-013`                   |
|   14 | `inventory_lpns.container_type` mezcla la identidad logística con la forma del contenedor                  | `BLOQUEADO`                   | `NEXO-DOM-019`; `NEXO-DOM-020`; `SUPA-ARC-005`                    |
|   15 | `inventory_lpn_items` no representa activos, kits ni contenedores por identidad                            | `BLOQUEADO`                   | `NEXO-DOM-004`; `NEXO-DOM-006`; `NEXO-DOM-024`                    |
|   16 | no existe identidad física canónica de contenedor ni vínculo versionado con LPN                            | `PENDIENTE_DE_IMPLEMENTACION` | `NEXO-DOM-019`; `NEXO-DOM-020`; `NEXO-DOM-022`                    |
|   17 | no existe historial efectivo de clasificación                                                              | `PENDIENTE_DE_IMPLEMENTACION` | `SHELL-CON-001`; `SUPA-ARC-003`; `SUPA-TRANS-005`                 |
|   18 | filtros, SKU y pantallas ramifican directamente por `inventory_kind` legacy                                | `BLOQUEADO`                   | `SHELL-CON-009`; `SHELL-AUTH-005`; `NEXO-UX-001`                  |
|   19 | permisos y RLS no distinguen gobierno de clasificación, operación de stock y gestión de activos            | `PENDIENTE_DE_RECONCILIACION` | `NEXO-AUTH-021` a `NEXO-AUTH-030`; `SHELL-CI-018`                 |
|   20 | no existe suite que demuestre paridad de 963 identidades y cero doble contabilización durante transición   | `PENDIENTE_DE_EVIDENCIA`      | `SHELL-CI-016`; `SHELL-CI-018`; `SHELL-CI-019`                    |

No se crean tareas nuevas. Cada brecha conserva un propietario existente y una
puerta verificable.

---

#### 32. Estado de adopción

La clasificación queda:

| Capa                                              | Estado                                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| contrato de siete clases                          | `ESPECIFICADO`                                                                                         |
| árbol y matriz de decisión                        | `ESPECIFICADO`                                                                                         |
| comportamiento por clase                          | `ESPECIFICADO`                                                                                         |
| crosswalk agregado de 963 productos               | `VALIDADO` contra snapshot de solo lectura                                                             |
| matriz individual de 963 decisiones provisionales | `VALIDADO` contra snapshot de solo lectura; 904 pendientes, 59 bloqueadas y 0 aprobaciones automáticas |
| clasificación final individual de 963 productos   | `PENDIENTE_DE_CLASIFICACION`                                                                           |
| campos, constraints y tipos físicos               | `PENDIENTE_DE_IMPLEMENTACION`                                                                          |
| transición de datos                               | `PENDIENTE_DE_IMPLEMENTACION`                                                                          |
| adopción por NEXO y consumidoras                  | `PENDIENTE_DE_IMPLEMENTACION`                                                                          |
| evidencia de remisiones, LPN, kits y repuestos    | `PENDIENTE_DE_EVIDENCIA`                                                                               |

Ningún producto queda declarado migrado por esta tarea.

---

#### 33. Handoff funcional inmediato

La clasificación habilita el inventario de procesos de `NEXO-UX-001`.

Ese handoff deberá utilizar las siete clases para identificar, por proceso:

- actor y necesidad;
- entrada física;
- saldo o identidad;
- ubicación y custodia;
- movimiento y estado;
- conteo y diferencia;
- excepción y recuperación;
- datos y evidencia;
- remisión o transferencia;
- interacción con LPN, kit o contenedor.

`NEXO-UX-001` no podrá redefinir clases ni clasificar por nombre de pantalla.

---

#### 34. Continuidad normal preservada

La secuencia de dominio `NEXO-DOM-002` a `NEXO-DOM-038` permanece intacta y no
se inicia en esta tarea.

La ruta prioritaria activa realiza el handoff inmediato a `NEXO-UX-001`. Las
tareas de dominio posteriores consumen esta clasificación cuando el flujo
canónico vuelva a ellas.

Especialmente:

- `NEXO-DOM-002` a `NEXO-DOM-008`: LPN;
- `NEXO-DOM-009`: individual versus cantidad;
- `NEXO-DOM-014` y `NEXO-DOM-015`: kits;
- `NEXO-DOM-016`: repuestos;
- `NEXO-DOM-019` a `NEXO-DOM-024`: contenedor, LPN y contenido.

---

#### 35. Seguridad y autorización

La clase influye en la operación, pero no concede autoridad.

Se separarán como mínimo:

- consultar clasificación;
- proponer clasificación;
- aprobar o retirar clasificación;
- crear saldo;
- mover cantidad;
- mover activo individual;
- entregar o devolver reutilizables;
- reservar o instalar repuestos;
- constituir o desarmar kits;
- vincular o desvincular contenedor y LPN;
- contar;
- investigar diferencias;
- aprobar correcciones;
- ver costo o propiedad.

Quien captura no aprueba automáticamente. Un dispositivo, aplicación visible,
categoría o clase no reemplaza sede, área, rol, permiso, scope ni recurso.

---

#### 36. Transición de datos

La transición futura deberá:

1. crear el contrato físico versionado;
2. congelar el snapshot fuente;
3. generar candidatos sin aprobarlos automáticamente;
4. detectar incompatibilidades y dobles representaciones;
5. permitir revisión por lotes con evidencia;
6. conservar producto, presentaciones y movimientos históricos;
7. crear instancias faltantes solo mediante proceso autorizado;
8. reconciliar cantidad, costo, ubicación, condición y custodia;
9. mantener adapters de lectura durante compatibilidad;
10. impedir escritura simultánea en modelo legacy y objetivo sin estrategia;
11. validar conteos antes y después;
12. soportar rollback antes de activar la nueva fuente;
13. retirar el adapter legacy después de paridad certificada;
14. no usar nombres, categorías o coincidencias parciales como única evidencia.

Toda migración Supabase pertenecerá a `vento-shell` y deberá pasar por las
tareas de arquitectura y transición aprobadas.

---

#### 37. Requisitos de prueba derivados

**Resultado:** GENERA REQUISITOS DE PRUEBA

Se incorporan al registro canónico:

- `TREQ-NEXO-040`;
- `TREQ-NEXO-041`;
- `TREQ-NEXO-042`;
- `TREQ-NEXO-043`;
- `TREQ-NEXO-044`;
- `TREQ-NEXO-045`;
- `TREQ-NEXO-046`;
- `TREQ-NEXO-047`;
- `TREQ-NEXO-048`;
- `TREQ-NEXO-049`.

| Rango | Cobertura                                                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `040` | unicidad y vigencia de las siete clases                                                                                                              |
| `041` | separación de clase, rol, presentación, unidad, lote, serial y estado                                                                                |
| `042` | consumible y stock por cantidad                                                                                                                      |
| `043` | reutilizable por cantidad y activo serializado                                                                                                       |
| `044` | repuesto e instalación                                                                                                                               |
| `045` | definición, instancia y completitud de kit                                                                                                           |
| `046` | contenedor físico y vínculo con LPN                                                                                                                  |
| `047` | comportamiento explícito por clase para movimientos, conteos, reservas, custodia, mantenimiento, remisiones, LPN, costo y cero doble contabilización |
| `048` | transición versionada del modelo legacy                                                                                                              |
| `049` | matriz individual de 963 UUID, decisiones por fila, reconciliación completa y cierre de veinte brechas                                               |

Los requisitos permanecen `IDENTIFICADO` hasta disponer de implementación y
evidencia reproducibles.

---

#### 38. Validaciones documentales definidas

La implementación deberá comprobar como mínimo:

1. siete clases exactas y sin duplicados;
2. una clase activa por identidad y período;
3. servicios fuera de clasificación física;
4. roles secundarios sin alterar clase;
5. presentación y unidad independientes;
6. lote y serial en la granularidad correcta;
7. consumible con consumo irreversible;
8. quantity stock con saldo reconciliable;
9. reutilizable con retorno y cantidad por condición;
10. activo con identidad individual;
11. repuesto con reserva, instalación y movimiento;
12. kit sin duplicar componentes;
13. contenedor separado de LPN;
14. LPN separado de LOC y kit;
15. nueve dimensiones de comportamiento explícitas para las siete clases;
16. conteo específico por clase;
17. reserva específica por clase;
18. remisión específica por clase;
19. costo o valoración separados de la clase y sin doble contabilización;
20. reclassificación versionada;
21. matriz individual con exactamente 963 filas;
22. 963 UUID únicos, cero faltantes y cero duplicados;
23. cada fila con código resoluble a resultado, candidato, estado y bloqueo;
24. distribución exacta D1=385, D2=409, D3=25, D4=85, D5=4 y D6=55;
25. cuatro dobles representaciones bloqueadas;
26. cincuenta y cinco modelos incompletos bloqueados;
27. cero clasificaciones automáticas por nombre;
28. transición idempotente y reversible;
29. veinte brechas con propietario y salida;
30. diez requisitos únicos y resolubles.

---

#### 39. Evidencia y límites

Evidencia disponible:

- fuentes canónicas de catálogo, inventario y activos;
- owner file y secuencia prioritaria;
- esquema y constraints desplegados;
- conteos agregados del catálogo;
- 963 UUID de producto únicos reconciliados individualmente;
- decisión provisional, estado y bloqueo por cada identidad;
- distribución exacta de seis cohortes y cero faltantes o duplicados;
- tablas y consumidores físicos inspeccionados;
- cero filas LPN observadas.

Evidencia no disponible todavía:

- aprobación final de clase primaria para cada producto;
- pruebas operativas de las siete clases;
- migración de datos;
- paridad entre legacy y objetivo;
- recorrido completo de kit, repuesto y contenedor;
- evidencia de LPN con contenido real;
- certificación de remisiones por clase.

La ausencia de evidencia no se presenta como cumplimiento. Una decisión
provisional individual no equivale a clasificación aprobada ni migrada.

---

#### 40. Fuera del alcance

NEXO-DOM-001 no:

- modifica los 963 productos;
- aprueba clasificaciones individuales;
- crea, divide, fusiona o retira productos;
- cambia categorías o nombres;
- crea activos, grupos, kits, repuestos, contenedores o LPN;
- corrige las cuatro dobles representaciones;
- crea instancias para los cincuenta y cinco modelos incompletos;
- cambia saldos, ubicaciones, costos o custodias;
- ejecuta remisiones, movimientos, conteos o ajustes;
- crea schemas, tablas, columnas, constraints, funciones, RLS o migraciones;
- modifica código o UI;
- publica tipos compartidos;
- ejecuta DDL, DML, backfills o despliegues;
- inicia `NEXO-UX-001`;
- inicia `NEXO-DOM-002`;
- declara implementado el modelo objetivo.

---

#### 41. Criterios de aceptación

1. se congelan exactamente siete clases primarias;
2. cada identidad posee una sola clase activa por período;
3. servicios quedan fuera del modelo físico;
4. la clase se separa de doce dimensiones;
5. consumible y stock por cantidad tienen fronteras inequívocas;
6. reutilizable por cantidad y activo serializado no se mezclan;
7. repuesto permanece stock hasta instalación;
8. kit definición e instancia están separados;
9. kit y LPN no son equivalentes;
10. contenedor físico y LPN no son equivalentes;
11. presentación y unidad no crean clase;
12. serial pertenece a la instancia;
13. roles secundarios pueden coexistir sin clase múltiple;
14. la matriz de comportamiento explicita saldo o identidad, movimiento,
    conteo, reserva, custodia, mantenimiento, remisión, LPN y costo para las
    siete clases;
15. se prohíbe doble contabilización física y económica;
16. reclassificación conserva historia y reconciliación;
17. los veintiocho escenarios tienen resultado;
18. los 963 productos quedan cubiertos por seis cohortes exhaustivas;
19. las cohortes suman 963 sin faltantes ni duplicados;
20. se materializan exactamente 963 filas individuales con UUID estable;
21. cada fila resuelve resultado, candidato, estado y bloqueo mediante D1 a D6;
22. existen 963 `product_id` únicos, cero faltantes y cero duplicados;
23. D1=385, D2=409, D3=25, D4=85, D5=4 y D6=55;
24. ninguna identidad se declara migrada o aprobada automáticamente;
25. se registran 38 activos individuales y 90 grupos;
26. se bloquean cuatro dobles representaciones;
27. se bloquean cincuenta y cinco productos de activo sin instancia;
28. se registra que existen cero LPN y cero contenidos observados;
29. se registran veinte brechas físicas;
30. cada brecha tiene propietario existente;
31. se generan y conservan `TREQ-NEXO-040` a `TREQ-NEXO-049`;
32. no se modifica código, Supabase ni datos;
33. el handoff prioritario queda en `NEXO-UX-001`;
34. `NEXO-DOM-002` permanece no iniciada dentro de la continuidad normal.

---

#### 42. Cierre de tarea y continuidad

**ÚLTIMA TAREA APROBADA**

`AUTH-ERR-020 — Compartir mensajes desde vento-shell`

**TAREA ACTUAL APROBADA**

`NEXO-DOM-001 — Clasificar consumibles, stock por cantidad, reutilizables, activos serializados, repuestos, kits y contenedores`

**SIGUIENTE TAREA RESERVADA**

`NEXO-UX-001 — Inventariar procesos reales de inventario y logística`

La continuidad normal de `NEXO-DOM-002` a `NEXO-DOM-038` permanece preservada
y no se inicia en esta tarea.


### ✅ NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-001 — Clasificar consumibles, stock por cantidad, reutilizables, activos serializados, repuestos, kits y contenedores
**Tarea siguiente:** NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar
**Tipo de tarea:** documental; definición canónica de propósito, identidad y tipos de propósito de LPN, bajo topología DEFINE_ONCE y sin instancia física propia
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no modifica código, aplicaciones, contratos compilados, Supabase, migraciones, tablas, vistas, funciones, RLS, RPC, datos, permisos, rutas, componentes, dispositivos, impresión, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué representa un LPN dentro de VENTO OS, qué problema resuelve y qué tipos canónicos de propósito logístico puede asumir, evitando que la identidad logística sea confundida con una ubicación, un producto, una clase de inventario, un lote, un documento, un envío o un contenedor físico.

La regla raíz queda:

```text
LPN
=
IDENTIDAD LOGISTICA ESTABLE
+
AGRUPACION TRAZABLE DE CONTENIDO
+
PROPOSITO LOGISTICO EXPLICITO
```

Y siempre:

```text
LPN
!=
LOC
!=
CONTENEDOR FISICO
!=
PRODUCTO
!=
LOTE
!=
REMISION
!=
MOVIMIENTO
```

Un LPN permite identificar una unidad logística de contenido como una sola referencia operativa sin borrar la identidad, cantidad, lote, serial, condición o clase de cada existencia contenida.

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
QUE ES UN LPN EN VENTO OS?
```

```text
PARA QUE EXISTE?
```

```text
QUE TIPOS DE PROPOSITO LOGISTICO SON CANONICOS?
```

```text
QUE DIMENSIONES NO DEBEN CONFUNDIRSE CON EL TIPO DEL LPN?
```

No define todavía el lifecycle completo, las operaciones de empaque y desempaque, la división y unión, el anidamiento, la jerarquía sede-LOC-LPN-contenido, la custodia ni las reglas avanzadas de contenedor físico.

#### 3. Handoff recibido de NEXO-DOM-001

`NEXO-DOM-001` fija que la clase primaria de control físico y el LPN son dimensiones distintas.

Las siete clases primarias ya aprobadas son:

```text
CONSUMABLE
QUANTITY_STOCK
REUSABLE_QUANTITY
SERIALIZED_ASSET
SPARE_PART
KIT
PHYSICAL_CONTAINER
```

Ninguna de ellas equivale a LPN.

Por tanto:

```text
INVENTORY CLASS
!=
LPN PURPOSE TYPE
```

Una misma clase primaria puede participar en un LPN cuando las tareas propietarias de contenido y compatibilidad lo permitan, sin cambiar de clase por haber sido agrupada logísticamente.

#### 4. Fuentes y decisiones consumidas

La tarea consume sin reabrir:

- la propiedad de NEXO sobre inventario, ubicaciones, LPN, contenedores, movimientos, custodia y logística;
- la definición previa de LPN como identidad logística de contenido que puede moverse como conjunto;
- la separación entre producto, presentación, unidad, lote, serial, LOC, posición, LPN y contenedor;
- la clasificación física aprobada por `NEXO-DOM-001`;
- la regla de no doble contabilización entre existencia suelta y contenido de LPN;
- la trazabilidad de lote, serial, condición y vencimiento;
- la separación entre remisión, viaje, manifiesto, bulto, contenedor, LPN y movimiento;
- el inventario AS-IS que demuestra tablas y endpoint LPN parciales sin lifecycle funcional completo;
- la topología `DEFINE_ONCE` aplicable a `NEXO-DOM-002`.

#### 5. Resultado material

Se definen cuatro artefactos documentales vinculantes:

1. `NEXO-LPN-IDENTITY-CONTRACT-001`, que fija el significado y las fronteras de identidad del LPN;
2. `NEXO-LPN-PURPOSE-TYPE-CATALOG-001`, que cierra el catálogo de tipos de propósito;
3. `NEXO-LPN-PURPOSE-DECISION-MATRIX-001`, que determina cuándo corresponde cada tipo y qué no puede inferirse de él;
4. `NEXO-LPN-PHYSICAL-RECONCILIATION-001`, que registra el estado físico conocido sin declarar adopción inexistente.

Cobertura:

| Resultado | Total esperado | Total materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| definición raíz de LPN | 1 | 1 | 0 | 0 |
| tipos canónicos de propósito | 6 | 6 | 0 | 0 |
| tipos físicos de contenedor convertidos en LPN | 0 | 0 | 0 | 0 |
| clasificaciones primarias de inventario redefinidas | 0 | 0 | 0 | 0 |
| tareas posteriores absorbidas | 0 | 0 | 0 | 0 |
| requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

#### 6. Topología contractual

La tarea se define una sola vez:

```text
mode = DEFINE_ONCE
physical_instance = NONE
execution_gate = NO_PHYSICAL_INSTANCE
```

Su resultado es un contrato documental reutilizable por las tareas posteriores de dominio, autorización, experiencia, arquitectura y materialización.

No existe una instancia física `NEXO-DOM-002` por package, aplicación, repositorio, sede, LOC o implementation unit.

#### 7. Definición canónica de LPN

Un LPN es una identidad logística estable asignada a una agrupación controlada de contenido para poder referenciarla, localizarla, moverla, custodiarla, reconciliarla y auditarla como unidad logística sin perder el detalle de sus componentes.

Su función es reducir ambigüedad operativa:

```text
MUCHAS EXISTENCIAS FISICAS O CANTIDADES
+
UNA AGRUPACION LOGISTICA CONTROLADA
=
UN LPN IDENTIFICABLE
```

El LPN no reemplaza el ledger de inventario ni crea existencia adicional.

#### 8. Identidad logística y contenido son objetos distintos

El LPN identifica la agrupación logística.

El contenido identifica lo que está dentro de esa agrupación.

Por tanto:

```text
LPN_IDENTITY
!=
LPN_CONTENT
```

Cerrar, anular, reetiquetar o cambiar la relación del LPN no autoriza por sí solo a eliminar, crear o alterar existencias.

Las reglas completas de contenido pertenecen a `NEXO-DOM-004` y tareas posteriores.

#### 9. LPN no es ubicación

Un LPN puede encontrarse en una ubicación, pero no es una ubicación.

Se conserva:

```text
SITE
-> LOC
-> OPTIONAL POSITION
```

como jerarquía física de ubicación.

El LPN se relaciona con esa jerarquía sin sustituirla.

No se permite tratar el código LPN como:

- sede;
- LOC;
- posición;
- estante;
- zona;
- dirección física permanente.

#### 10. LPN no es contenedor físico

El LPN puede estar asociado a una caja, bandeja, canasta, pallet, carro, recipiente, huacal, tote u otro contenedor físico cuando el dominio lo permita, pero la forma física no define la identidad LPN.

Se conserva:

```text
LPN
!=
PHYSICAL_CONTAINER
```

El contenedor físico puede tener identidad, capacidad, condición, custodia, disponibilidad y ciclo de retorno propios.

La relación avanzada entre ambas identidades pertenece a `NEXO-DOM-019` y `NEXO-DOM-020`.

#### 11. LPN no es bulto

`Bulto` describe una unidad física o documental de carga según el proceso logístico aplicable.

No se adopta como sinónimo universal de LPN.

Una operación puede relacionar bulto y LPN, pero debe conservar sus identidades cuando ambas existan.

#### 12. LPN no es remisión

Una remisión coordina una necesidad y sus cantidades por etapas.

Un LPN agrupa contenido físico/logístico.

Por tanto:

```text
REMISION
!=
LPN
```

Una remisión puede relacionarse con uno o varios LPN según el proceso posterior, sin que el LPN herede la identidad documental de la remisión.

Esta tarea no fija cardinalidades de remisión-LPN.

#### 13. LPN no es viaje ni manifiesto

El viaje representa ejecución de transporte.

El manifiesto representa la composición publicada o aceptada de una carga conforme al proceso propietario.

El LPN representa una agrupación logística de contenido.

Ninguno sustituye al otro.

#### 14. LPN no es movimiento de inventario

Mover, empacar, desempacar, dividir o unir contenido puede requerir movimientos canónicos.

El LPN no es el movimiento.

Se conserva:

```text
LPN = OBJECT OF LOGISTIC TRACEABILITY
MOVEMENT = BUSINESS FACT THAT CHANGES PHYSICAL PROJECTION
```

La existencia de un LPN no permite modificar saldos sin el hecho propietario correspondiente.

#### 15. LPN no es producto, presentación ni unidad

El LPN puede contener referencias a productos, presentaciones o cantidades, pero no adquiere su identidad.

No son tipos LPN:

- `ingredient`;
- `finished`;
- `resale`;
- producto terminado;
- insumo;
- caja de doce unidades;
- kilogramo;
- litro;
- unidad.

Esas clasificaciones pertenecen a catálogo, inventario o presentación.

#### 16. LPN no es lote, serial ni vencimiento

Lote, serial y vencimiento son dimensiones de trazabilidad del contenido.

No son categorías del LPN.

Un LPN puede contener contenido sujeto a esas dimensiones conforme a las reglas posteriores sin convertirse en `LOT_LPN`, `SERIAL_LPN` o equivalente.

#### 17. LPN no es condición

No son tipos canónicos de LPN:

```text
QUARANTINE
DAMAGED
EXPIRED
LOST
BLOCKED
RELEASED
```

Esos valores expresan condición, disponibilidad o estado de contenido/operación según el owner correspondiente.

La condición no se codifica en la identidad de propósito del LPN.

#### 18. LPN no es clase primaria de inventario

Empacar una existencia dentro de un LPN no cambia su clase primaria.

Ejemplos:

```text
QUANTITY_STOCK dentro de LPN
continua siendo QUANTITY_STOCK
```

```text
SERIALIZED_ASSET dentro de LPN
continua siendo SERIALIZED_ASSET
```

```text
PHYSICAL_CONTAINER vinculado a LPN
continua siendo PHYSICAL_CONTAINER
```

No se crea una octava clase denominada `LPN`.

#### 19. LPN no es kit

Un kit tiene definición, instancia, miembros y regla de completitud propias.

Un LPN puede transportar o agrupar un kit cuando el contrato posterior lo permita, pero no sustituye esa identidad.

Se conserva:

```text
KIT INSTANCE
!=
LPN
```

#### 20. Dimensión propietaria de esta tarea

El único tipo que esta tarea fija es:

```text
LPN_PURPOSE_TYPE
```

Este tipo responde:

```text
PARA QUE EXISTE ESTA AGRUPACION LOGISTICA EN ESTE CONTEXTO?
```

No responde:

- qué forma física tiene;
- cuánto dura;
- cuál es su estado de lifecycle;
- qué condición tiene su contenido;
- si contiene uno o varios productos;
- si contiene otros LPN;
- quién tiene custodia;
- dónde está ubicado;
- qué documento lo originó;
- qué capacidad física soporta.

#### 21. Catálogo cerrado de tipos de propósito

`NEXO-LPN-PURPOSE-TYPE-CATALOG-001` contiene exactamente:

```text
STORAGE
RECEIVING
TRANSFER
FULFILLMENT
PRODUCTION_STAGING
RETURN
```

Reconciliación:

```text
EXPECTED_PURPOSE_TYPES = 6
MATERIALIZED_PURPOSE_TYPES = 6
MISSING_PURPOSE_TYPES = 0
DUPLICATE_PURPOSE_TYPES = 0
```

Ningún consumidor puede fabricar un séptimo tipo local sin una decisión canónica posterior.

#### 22. Tipo STORAGE

`STORAGE` identifica una agrupación cuyo propósito principal es mantener contenido físicamente agrupado y trazable mientras permanece almacenado o disponible dentro del dominio de inventario.

No significa:

- LOC permanente;
- contenedor físico permanente;
- stock disponible por definición;
- ausencia de lote o condición;
- permiso para mezclar contenido incompatible.

Un LPN `STORAGE` continúa requiriendo ubicación, contenido, condición y elegibilidad conforme a sus contratos propietarios.

#### 23. Tipo RECEIVING

`RECEIVING` identifica una agrupación cuyo propósito principal es contener y reconciliar existencia durante una entrada física pendiente de ubicación, aceptación, clasificación o cierre del proceso de recepción aplicable.

Puede participar en entradas provenientes de compra, transferencia, devolución u otro origen autorizado sin convertirse en la orden, remisión o recepción documental.

`RECEIVING` no implica que el contenido ya esté liberado, disponible o definitivamente almacenado.

#### 24. Tipo TRANSFER

`TRANSFER` identifica una agrupación creada para trasladar existencia entre ubicaciones, posiciones, áreas o sedes mediante un movimiento o proceso de transferencia propietario.

Su existencia no ejecuta el movimiento.

Se conserva:

```text
TRANSFER LPN CREATED
!=
INVENTORY TRANSFER COMMITTED
```

Origen, destino, contenido, tránsito, aceptación y reconciliación pertenecen a los contratos posteriores aplicables.

#### 25. Tipo FULFILLMENT

`FULFILLMENT` identifica una agrupación preparada para satisfacer una necesidad logística concreta de abastecimiento, despacho, remisión, entrega o carga.

No es sinónimo de remisión, manifiesto, viaje, pedido o envío.

El LPN conserva identidad propia y se relaciona con el caso logístico propietario.

Una relación documental no convierte el contenido en entregado, despachado o recibido por inferencia.

#### 26. Tipo PRODUCTION_STAGING

`PRODUCTION_STAGING` identifica una agrupación logística de materiales o resultados físicos que se prepara para entregar a producción, recibir desde producción o mantener en una zona de staging controlada entre NEXO y el proceso productivo propietario.

No crea ni sustituye:

- orden de producción;
- receta;
- lote de producción;
- consumo de ingredientes;
- rendimiento;
- liberación de calidad.

FOGO conserva los hechos productivos; NEXO conserva la agrupación, ubicación y movimiento físico que le corresponden.

#### 27. Tipo RETURN

`RETURN` identifica una agrupación cuyo propósito principal es soportar un flujo de retorno físico hacia un origen, sede, bodega, proveedor, área o proceso de disposición/reconciliación autorizado.

No implica automáticamente:

- devolución aceptada;
- reingreso a stock disponible;
- nota crédito;
- reversión contable;
- liberación;
- descarte;
- cierre de custodia.

Cada efecto pertenece a su proceso propietario.

#### 28. Matriz de propósito y exclusiones

`NEXO-LPN-PURPOSE-DECISION-MATRIX-001`:

| Tipo | Pregunta que responde | Ejemplo de uso permitido | No significa |
| --- | --- | --- | --- |
| `STORAGE` | ¿la agrupación existe para almacenamiento controlado? | existencia agrupada dentro de bodega | LOC, disponibilidad o contenedor |
| `RECEIVING` | ¿la agrupación existe para entrada y reconciliación física? | contenido recibido pendiente de put-away o aceptación | recepción cerrada o stock liberado |
| `TRANSFER` | ¿la agrupación existe para un traslado de inventario? | contenido preparado para mover entre ubicaciones | movimiento ya ejecutado |
| `FULFILLMENT` | ¿la agrupación existe para satisfacer un caso logístico? | contenido alistado para remisión o despacho | remisión, viaje o entrega |
| `PRODUCTION_STAGING` | ¿la agrupación existe para staging físico con producción? | materiales alistados para entrega a FOGO | lote u orden productiva |
| `RETURN` | ¿la agrupación existe para un flujo de retorno? | retorno desde sede o tercero | devolución aceptada o reversión económica |

#### 29. Regla de selección del tipo

El tipo se selecciona por el propósito logístico dominante y autorizado del LPN, no por:

- nombre visible;
- forma del empaque;
- color de etiqueta;
- ruta de UI;
- categoría de producto;
- `inventory_kind` legacy;
- estado del contenido;
- actor que lo creó;
- ubicación actual;
- documento disponible;
- tabla existente.

Si el propósito no puede determinarse de forma inequívoca, el sistema no debe inventar un tipo por fallback silencioso.

#### 30. Un único propósito primario vigente

Un LPN no conserva simultáneamente varios valores activos de `LPN_PURPOSE_TYPE`.

Se exige:

```text
ONE LPN
-> ONE CURRENT PRIMARY PURPOSE TYPE
```

Las relaciones con procesos, documentos y movimientos pueden ser múltiples a lo largo de la historia sin convertir el tipo en un arreglo de etiquetas acumulativas.

#### 31. Cambio de propósito

Esta tarea no define las transiciones de lifecycle que permiten o impiden cambiar el propósito.

Sí fija una frontera:

```text
PURPOSE CHANGE
!=
SILENT FIELD OVERWRITE
```

Cualquier cambio material deberá conservar historia y respetar `NEXO-DOM-003` y los contratos posteriores que resulten aplicables.

#### 32. Tipo no equivale a temporalidad

`TEMPORARY` y `PERSISTENT` no son tipos de propósito.

La duración o persistencia de la identidad LPN es una dimensión separada.

Se conserva:

```text
PURPOSE TYPE
!=
IDENTITY DURATION
```

La relación entre identidad permanente de contenedor e identidad temporal o persistente de LPN pertenece a `NEXO-DOM-019` y `NEXO-DOM-020`.

#### 33. Tipo no equivale a composición

No son tipos de propósito:

```text
SINGLE_SKU
MIXED_SKU
SINGLE_LOT
MIXED_LOT
EMPTY
FULL
PARTIAL
```

Esas propiedades pertenecen al contenido, compatibilidad, ocupación o estado.

`NEXO-DOM-004`, `NEXO-DOM-005`, `NEXO-DOM-006`, `NEXO-DOM-023` y `NEXO-DOM-024` conservan sus decisiones.

#### 34. Tipo no equivale a jerarquía

No son tipos de propósito:

```text
PARENT
CHILD
NESTED
LEAF
```

El anidamiento es una relación estructural entre LPN y pertenece a `NEXO-DOM-006`.

Un LPN de cualquiera de los seis propósitos puede participar únicamente en las relaciones que esa tarea posterior autorice.

#### 35. Tipo no equivale a forma de contenedor

Queda prohibido usar como `LPN_PURPOSE_TYPE` valores como:

```text
PALLET
BOX
BAG
TOTE
CRATE
TRAY
CART
BIN
BASKET
```

Si una forma física necesita clasificación, pertenece al modelo de contenedor, empaque o presentación correspondiente.

Esto corrige conceptualmente la mezcla observada de `inventory_lpns.container_type` sin modificar todavía el esquema físico.

#### 36. Tipo no equivale a estado del lifecycle

No son tipos de propósito:

```text
DRAFT
ACTIVE
CLOSED
CANCELLED
VOID
RELABELED
```

Los estados y transiciones exactos pertenecen a `NEXO-DOM-003`.

El purpose type describe para qué existe el LPN; el lifecycle describe en qué estado se encuentra.

#### 37. Tipo no equivale a custodia

No son tipos de propósito:

```text
WAREHOUSE_OWNED
DRIVER_OWNED
STORE_OWNED
THIRD_PARTY
```

La custodia y el responsable actual pertenecen a `NEXO-DOM-008` y a los procesos de transferencia de custodia.

#### 38. Tipo no equivale a dirección

`INBOUND` y `OUTBOUND` pueden describir dirección relativa dentro de un proceso, pero no se adoptan como tipos canónicos independientes.

La dirección se deriva del contexto de origen/destino y del proceso propietario.

Esto evita duplicar combinaciones como `INBOUND_TRANSFER`, `OUTBOUND_TRANSFER`, `INBOUND_RETURN` y equivalentes.

#### 39. Tipo no equivale a motivo de excepción

Un LPN con contenido dañado, faltante, bloqueado, vencido o en investigación conserva su propósito logístico salvo que una transición propietaria establezca otra cosa.

No se crea un tipo `EXCEPTION` como contenedor genérico de estados heterogéneos.

#### 40. Código e identidad humana

Todo LPN deberá poder conservar una identidad estable distinta de su texto visible o etiqueta impresa.

La representación futura podrá incluir:

- identificador técnico estable;
- código humano/escaneable estable o versionado conforme al lifecycle;
- etiqueta legible;
- purpose type;
- referencias de trazabilidad necesarias.

Esta tarea no fija el formato físico del código, el algoritmo de numeración ni la etiqueta de impresión; esa responsabilidad permanece en las tareas de lifecycle, experiencia e integración de impresión.

#### 41. El tipo no otorga autorización

Conocer o seleccionar un purpose type no concede permiso para:

- crear LPN;
- cambiar contenido;
- moverlo;
- cerrar;
- anular;
- reetiquetar;
- transferir custodia;
- imprimir;
- vincular contenedor;
- despachar o recibir.

La autorización continúa bajo los contratos NEXO-AUTH y transversales correspondientes.

#### 42. El tipo no ejecuta inventario

Asignar `STORAGE`, `RECEIVING`, `TRANSFER`, `FULFILLMENT`, `PRODUCTION_STAGING` o `RETURN` no crea por sí solo:

- movimiento;
- reserva;
- saldo;
- disponibilidad;
- tránsito;
- recepción;
- consumo;
- transferencia;
- ajuste.

Todo efecto necesita el hecho de negocio propietario y su autorización.

#### 43. No doble contabilización

El LPN es una agrupación logística, no una existencia adicional.

Debe mantenerse:

```text
CONTENT ACCOUNTED INSIDE LPN
+
SAME CONTENT ACCOUNTED AS LOOSE STOCK
=
INVALID DOUBLE REPRESENTATION
```

El purpose type nunca justifica duplicar saldo, cantidad, activo, kit, contenedor o valor.

La materialización completa de esta regla permanece en `NEXO-DOM-021` y contratos de inventario relacionados.

#### 44. Movimiento atómico como handoff

Esta tarea conserva la expectativa ya aprobada de que mover un LPN debe preservar la coherencia de su contenido.

No implementa esa operación ni define su transacción.

El contrato operativo detallado permanece en `NEXO-DOM-022`.

#### 45. Lote, serial y condición como handoff

El purpose type no elimina trazabilidad individual o por cantidad.

Un LPN debe poder conservar relaciones suficientes para que cada contenido mantenga lote, serial, vencimiento, condición y demás dimensiones aplicables.

La definición detallada permanece en `NEXO-DOM-023`.

#### 46. Capacidad y compatibilidad como handoff

El purpose type tampoco decide si físicamente una combinación de contenido cabe o es compatible.

Peso, volumen, capacidad, compatibilidad, restricciones físicas y reglas equivalentes pertenecen a `NEXO-DOM-024` y al modelo de contenedor aplicable.

#### 47. Estado físico conocido

La línea base física conocida contiene infraestructura LPN parcial:

- tabla `inventory_lpns`;
- tabla `inventory_lpn_items`;
- endpoint de lectura de LPN en NEXO;
- un componente de creación sin consumidor confirmado en la auditoría previa;
- una ruta histórica `/inventory/lpns` que no constituye una superficie funcional completa;
- permisos y estructuras parciales sin lifecycle completo certificado.

La existencia de estas piezas no se interpreta como adopción del contrato definido aquí.

#### 48. Brecha física: container_type embebido

El modelo físico observado conserva `inventory_lpns.container_type`.

Ese campo mezcla una identidad logística con una característica de forma física.

La decisión de esta tarea es únicamente contractual:

```text
container_type
MUST NOT DEFINE
LPN_PURPOSE_TYPE
```

Su corrección física pertenece a `NEXO-DOM-019`, `NEXO-DOM-020`, `SUPA-ARC-005` y los owners de transición aplicables.

#### 49. Brecha física: contenido limitado

La estructura `inventory_lpn_items` observada está limitada a producto, cantidad, unidad, lote y vencimiento.

Eso no demuestra soporte suficiente para todas las clases de contenido que el modelo canónico puede requerir.

La ampliación o sustitución física pertenece a `NEXO-DOM-004`, `NEXO-DOM-006`, `NEXO-DOM-024` y arquitectura propietaria.

Esta tarea no modifica el esquema.

#### 50. Brecha física: endpoint parcial

El endpoint actual de NEXO consulta `inventory_lpns` y expone una proyección reducida de identidad, código, sede y fecha de creación.

Ese endpoint no demuestra:

- purpose type canónico;
- lifecycle completo;
- contenido completo;
- ubicación efectiva;
- custodia;
- contenedor;
- trazabilidad;
- mutaciones;
- adopción de las seis categorías.

No se adapta ni se declara conforme en esta tarea.

#### 51. Brecha física: cero adopción demostrada

La auditoría previa registró infraestructura LPN fragmentada y ausencia de un ciclo funcional alcanzable de principio a fin.

Por tanto, esta tarea no declara:

```text
LPN_CANONICAL_IMPLEMENTED = TRUE
```

La salida es definición documental, no certificación física.

#### 52. Reconciliación del legacy

`NEXO-LPN-PHYSICAL-RECONCILIATION-001`:

| Evidencia física | Estado frente al contrato | Owner de salida | Condición de salida |
| --- | --- | --- | --- |
| `inventory_lpns` existe | `FOUNDATION_PARTIAL` | arquitectura y dominio LPN posterior | schema compatible y adopción demostrada |
| `inventory_lpns.container_type` embebido | `CONCEPTUAL_MIXING` | `NEXO-DOM-019`; `NEXO-DOM-020`; `SUPA-ARC-005` | separar forma física de purpose type e identidad |
| `inventory_lpn_items` limitado | `CONTENT_MODEL_INCOMPLETE` | `NEXO-DOM-004`; `NEXO-DOM-006`; `NEXO-DOM-024` | representar contenido canónico sin pérdida de identidad |
| endpoint GET LPN parcial | `READ_PROJECTION_PARTIAL` | experiencia/servicio propietario | contrato y autorización completos, con pruebas |
| formulario de creación sin consumidor confirmado | `ORPHAN_OR_UNCONFIRMED_CONSUMER` | experiencia LPN propietaria | consumidor real y flujo end-to-end demostrados |
| lifecycle completo no alcanzable | `NOT_IMPLEMENTED_END_TO_END` | `NEXO-DOM-003..008`; `NEXO-DOM-019..024` y owners físicos | ciclo y relaciones materializados y certificados |

Ninguna brecha bloquea la aprobación documental de la definición; todas bloquean declarar implementación física completa.

#### 53. Matriz de casos de clasificación

| Caso | Tipo canónico | Decisión |
| --- | --- | --- |
| existencia agrupada para permanecer almacenada | `STORAGE` | permitido |
| mercancía o existencia agrupada durante entrada física | `RECEIVING` | permitido |
| existencias agrupadas para traslado interno | `TRANSFER` | permitido |
| contenido preparado para remisión/despacho/entrega | `FULFILLMENT` | permitido |
| materiales agrupados para staging con producción | `PRODUCTION_STAGING` | permitido |
| contenido agrupado para retorno físico | `RETURN` | permitido |
| pallet como forma física | ninguno | no es purpose type |
| caja como forma física | ninguno | no es purpose type |
| contenido en cuarentena | conserva purpose type aplicable | cuarentena es condición |
| LPN temporal | conserva purpose type aplicable | temporalidad es dimensión separada |
| LPN persistente | conserva purpose type aplicable | temporalidad es dimensión separada |
| un solo SKU | conserva purpose type aplicable | composición es dimensión separada |
| contenido mixto | conserva purpose type aplicable | composición es dimensión separada |
| LPN padre | conserva purpose type aplicable | jerarquía es dimensión separada |
| LPN en tránsito | conserva purpose type aplicable | tránsito es estado/proyección de movimiento |
| LPN dentro de una remisión | normalmente `FULFILLMENT` si ese es su propósito dominante | remisión no es tipo |
| LPN retornado desde sede | `RETURN` si el propósito dominante es el retorno | la recepción posterior no se infiere como completada |
| LPN de ingredientes alistados para producción | `PRODUCTION_STAGING` | no crea consumo ni lote productivo |
| purpose indeterminado | ninguno | fail-closed para creación canónica |
| valor legacy `container_type` | ninguno por sí solo | no se convierte automáticamente |

#### 54. Reglas de normalización

Los consumidores futuros deben utilizar los códigos canónicos exactos para la dimensión de propósito.

Las etiquetas humanas pueden traducirse o adaptarse visualmente sin crear nuevos valores persistidos.

Ejemplos de presentación aceptable:

| Código | Etiqueta humana base |
| --- | --- |
| `STORAGE` | Almacenamiento |
| `RECEIVING` | Recepción |
| `TRANSFER` | Traslado |
| `FULFILLMENT` | Alistamiento / despacho |
| `PRODUCTION_STAGING` | Staging de producción |
| `RETURN` | Retorno |

La etiqueta no es la identidad contractual.

#### 55. Unknown values

Un valor fuera del catálogo no se aproxima por nombre ni se mapea heurísticamente.

Se conserva:

```text
UNKNOWN LPN PURPOSE
-> NO SILENT FALLBACK
-> REQUIRE RECONCILIATION
```

Un consumidor legacy puede seguir mostrando datos históricos durante transición controlada, pero no puede fabricar semántica canónica inexistente.

#### 56. Migración futura

La transición de valores legacy hacia `LPN_PURPOSE_TYPE` deberá ser:

- explícita;
- versionada;
- determinista;
- auditable;
- idempotente;
- reversible antes de activación cuando el plan físico lo exija;
- bloqueante ante ambigüedad.

Esta tarea no asigna purpose types a filas reales ni ejecuta backfill.

No se permite derivar automáticamente el tipo solo desde `container_type`, nombre, código, ruta o ubicación.

#### 57. Creación futura

Una futura creación canónica de LPN deberá disponer de un purpose type válido antes de quedar operativamente utilizable.

Esta tarea no define:

- el estado inicial;
- el commit point;
- la activación;
- la anulación;
- la reetiquetación;
- la idempotencia de creación.

Esos puntos pertenecen a `NEXO-DOM-003` y arquitectura física posterior.

#### 58. Etiquetas y escaneo

La etiqueta o código escaneable representa la identidad del LPN, no el purpose type como sustituto de identidad.

Cambiar una etiqueta visible no debe convertir un `STORAGE` en `TRANSFER` ni crear otra identidad por inferencia.

La política de impresión, tamaño, simbología, reimpresión y hardware pertenece a `NEXO-DOM-018`, experiencia e infraestructura de impresión.

#### 59. Dispositivos compartidos

Escanear o seleccionar un LPN desde tablet, kiosco o estación compartida no concede custodia ni autoridad.

El dispositivo, principal técnico, actor humano, contexto operativo, LPN y purpose type permanecen separados.

La autorización del actor se resuelve por sus contratos propietarios.

#### 60. Offline y cache

Un purpose type cacheado puede servir como proyección de lectura cuando el contrato posterior lo permita, pero no como autoridad para ejecutar una transición de inventario.

Offline no puede:

- inventar un purpose type;
- cambiarlo silenciosamente;
- resolver ambigüedad de legacy;
- convertir una etiqueta física en fuente final;
- duplicar un LPN al reconectar.

La política completa de operación offline pertenece a las tareas propietarias posteriores.

#### 61. Concurrencia

Dos operaciones concurrentes no pueden dejar un LPN con dos purpose types primarios vigentes.

Esta tarea fija la invariante, no el mecanismo transaccional.

La arquitectura física deberá usar versión, serialización, compare-and-set, evento, constraint o mecanismo equivalente aprobado para conservarla.

#### 62. Auditoría

La historia futura debe permitir responder:

```text
QUE LPN ERA?
QUE PROPOSITO TENIA?
BAJO QUE VERSION?
CUANDO CAMBIO?
QUIEN O QUE PROCESO AUTORIZO EL CAMBIO?
```

El purpose type no se reconstruye únicamente desde el estado actual o desde logs libres.

La implementación exacta de auditoría pertenece a `NEXO-DOM-017` y arquitectura transversal.

#### 63. Privacidad y minimización

La identidad LPN y su purpose type no deben transportar datos personales innecesarios.

No se codifican en la etiqueta o código:

- nombre del trabajador;
- email;
- documento personal;
- credenciales;
- permisos;
- secretos;
- tokens;
- información sensible ajena a la identificación logística.

#### 64. Integración con ORIGO

ORIGO puede originar hechos de compra o recepción que den contexto a un LPN `RECEIVING`, pero no se convierte en propietario de la identidad logística NEXO.

NEXO no reescribe la orden de compra para representar el LPN.

Ambos hechos se correlacionan mediante contratos de integración posteriores.

#### 65. Integración con FOGO

FOGO puede originar demanda productiva, consumo o producto resultante.

NEXO puede agrupar físicamente materiales o resultados mediante `PRODUCTION_STAGING` cuando corresponda.

El LPN no sustituye:

- receta;
- orden;
- batch;
- lote de producción;
- rendimiento;
- liberación productiva.

#### 66. Integración con PULSO y PASS

PULSO y PASS no son propietarios de LPN.

Si una operación comercial requiere conocer agrupaciones logísticas, consume una proyección autorizada de NEXO.

Pedido, cliente, pago, beneficio y LPN permanecen identidades distintas.

#### 67. Integración con NUMERA

NUMERA puede consumir movimientos o hechos económicos correlacionados, pero el purpose type no representa:

- costo;
- centro de costo;
- asiento;
- valoración;
- reconocimiento contable.

Cambiar purpose type no genera por sí solo un hecho contable.

#### 68. Integración con SHELL y VISO

SHELL y VISO pueden consumir catálogos, permisos, configuración o proyecciones administrativas conforme a sus contratos.

Ninguno redefine localmente los seis purpose types.

La administración del catálogo no equivale a propiedad del contenido o movimiento de un LPN.

#### 69. Handoff hacia NEXO-DOM-003

`NEXO-DOM-002` entrega a `NEXO-DOM-003`:

```text
LPN IDENTITY
+
ONE CURRENT PURPOSE TYPE
+
PURPOSE CATALOG OF 6 VALUES
```

`NEXO-DOM-003` deberá definir cómo una identidad LPN se crea, activa, cierra, anula y reetiqueta sin convertir esos estados o eventos en nuevos purpose types.

Además deberá determinar cómo se preserva la historia si un purpose type puede cambiar dentro del lifecycle.

#### 70. Handoff hacia NEXO-DOM-004

`NEXO-DOM-004` recibe una identidad LPN ya separada de su contenido.

Debe definir:

- qué puede entrar;
- cómo se representa;
- cómo se empaca;
- cómo se desempaca;
- cómo se conservan cantidades e identidades.

No puede usar el purpose type como sustituto de la composición real.

#### 71. Handoff hacia NEXO-DOM-005

`NEXO-DOM-005` recibe la regla de identidad estable y purpose type vigente.

Dividir, unir o transferir contenido deberá decidir qué ocurre con las identidades resultantes sin duplicar existencia ni inferir purpose types incompatibles.

#### 72. Handoff hacia NEXO-DOM-006

`NEXO-DOM-006` recibe la separación:

```text
PURPOSE TYPE
!=
NESTING RELATION
```

Deberá definir LPN anidados y contenedores retornables sin convertir `PARENT`, `CHILD` o forma física en tipos de propósito.

#### 73. Handoff hacia NEXO-DOM-007

`NEXO-DOM-007` recibe la separación:

```text
LPN
!=
LOC
```

Deberá cerrar la relación sede, LOC, LPN y contenido sin convertir ubicación en identidad logística ni permitir doble ubicación incompatible.

#### 74. Handoff hacia NEXO-DOM-008

`NEXO-DOM-008` recibe la separación:

```text
LPN PURPOSE
!=
CUSTODY
```

Deberá definir responsable y custodio actual sin codificar esa relación dentro del purpose type.

#### 75. Handoff hacia NEXO-DOM-019 a NEXO-DOM-024

Las tareas avanzadas reciben estas fronteras obligatorias:

- `NEXO-DOM-019`: contenedor físico e identidad LPN permanecen separadas;
- `NEXO-DOM-020`: persistencia o cambio de LPN no se deriva de la forma física;
- `NEXO-DOM-021`: el LPN no crea saldo adicional;
- `NEXO-DOM-022`: mover un LPN debe preservar atomicidad del contenido;
- `NEXO-DOM-023`: lote, serial, vencimiento y condición pertenecen al contenido;
- `NEXO-DOM-024`: capacidad, peso, volumen y compatibilidad no son purpose types.

#### 76. Handoff hacia autorización y experiencia

Las tareas `NEXO-AUTH-*` y `NEXO-UX-*` posteriores deberán consumir los seis purpose types sin convertirlos en roles o permisos.

La experiencia podrá mostrar etiquetas humanas, filtros y agrupaciones, pero la autorización se resolverá desde permisos, actor y contexto reales.

Una opción de UI no puede crear un purpose type fuera del catálogo.

#### 77. Contrato para materialización posterior

Aunque `NEXO-DOM-002` no tiene instancia física propia, toda materialización posterior que represente LPN deberá preservar:

1. identidad LPN separada;
2. uno de los seis purpose types;
3. ausencia de fallback silencioso;
4. separación respecto de contenedor físico;
5. separación respecto de lifecycle;
6. separación respecto de condición;
7. separación respecto de composición;
8. separación respecto de ubicación;
9. separación respecto de custodia;
10. separación respecto de clase primaria;
11. no doble contabilización;
12. migración legacy explícita y trazable.

#### 78. Invariantes

1. LPN es identidad logística de contenido.
2. LPN no es LOC.
3. LPN no es posición.
4. LPN no es contenedor físico.
5. LPN no es bulto por definición.
6. LPN no es producto.
7. LPN no es presentación.
8. LPN no es unidad de medida.
9. LPN no es lote.
10. LPN no es serial.
11. LPN no es remisión.
12. LPN no es viaje.
13. LPN no es manifiesto.
14. LPN no es movimiento.
15. LPN no es clase primaria de inventario.
16. LPN no es kit.
17. El tipo propietario de esta tarea es `LPN_PURPOSE_TYPE`.
18. Existen exactamente seis purpose types canónicos.
19. `STORAGE` representa almacenamiento controlado.
20. `RECEIVING` representa agrupación durante entrada física.
21. `TRANSFER` representa agrupación para traslado.
22. `FULFILLMENT` representa agrupación para satisfacer un caso logístico.
23. `PRODUCTION_STAGING` representa staging físico con producción.
24. `RETURN` representa flujo de retorno.
25. Solo existe un purpose type primario vigente por LPN.
26. Purpose type no equivale a lifecycle.
27. Purpose type no equivale a temporalidad.
28. Purpose type no equivale a composición.
29. Purpose type no equivale a nesting.
30. Purpose type no equivale a condición.
31. Purpose type no equivale a custodia.
32. Purpose type no equivale a dirección.
33. Purpose type no equivale a forma física.
34. `container_type` no define purpose type.
35. Valores desconocidos no usan fallback silencioso.
36. El purpose type no concede autorización.
37. El purpose type no ejecuta movimientos.
38. El purpose type no cambia saldo.
39. El LPN no crea existencia adicional.
40. No se permite doble contabilización suelto/LPN.
41. La identidad del contenido se preserva.
42. El tipo no reemplaza lote, serial o condición.
43. El tipo no reemplaza documentos logísticos.
44. Los códigos humanos pueden traducirse en UI, no en persistencia canónica.
45. Una etiqueta no es autoridad.
46. Offline no fabrica tipos.
47. Concurrencia no deja dos purpose types primarios vigentes.
48. Cambiar propósito no es overwrite silencioso.
49. Las brechas físicas actuales no se presentan como implementación completa.
50. `NEXO-DOM-003` conserva el lifecycle.
51. `NEXO-DOM-004` conserva contenido, empaque y desempaque.
52. `NEXO-DOM-005` conserva división, unión y transferencia de contenido.
53. `NEXO-DOM-006` conserva anidamiento y retornables.
54. `NEXO-DOM-007` conserva sede-LOC-LPN-contenido.
55. `NEXO-DOM-008` conserva custodia.
56. `NEXO-DOM-019..024` conservan relación avanzada con contenedor y contenido.
57. No se modifica código ni Supabase.
58. No se crea instancia física propia.
59. No se modifica 04A.
60. No se inicia `NEXO-DOM-003`.

#### 79. Resultado documental

La tarea deja cerrado documentalmente:

1. significado de LPN;
2. propósito empresarial de la identidad;
3. separación de identidad y contenido;
4. separación de ubicación;
5. separación de contenedor físico;
6. separación de bulto;
7. separación de remisión, viaje y manifiesto;
8. separación de movimiento;
9. separación de producto, presentación y unidad;
10. separación de lote, serial y vencimiento;
11. separación de condición;
12. separación de clase primaria;
13. separación de kit;
14. dimensión `LPN_PURPOSE_TYPE`;
15. catálogo cerrado de seis valores;
16. `STORAGE`;
17. `RECEIVING`;
18. `TRANSFER`;
19. `FULFILLMENT`;
20. `PRODUCTION_STAGING`;
21. `RETURN`;
22. regla de selección por propósito dominante;
23. propósito único vigente;
24. separación de temporalidad;
25. separación de composición;
26. separación de jerarquía;
27. separación de lifecycle;
28. separación de custodia;
29. ausencia de fallback silencioso;
30. estado físico parcial conocido;
31. brecha `container_type`;
32. brecha de contenido limitado;
33. endpoint parcial;
34. reconciliación legacy;
35. handoffs exactos a las tareas posteriores.

#### 80. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la separación entre LPN, contenido, ubicación, contenedor, clase primaria, stock y proceso logístico; el ciclo LPN; la trazabilidad dentro de LPN; la no doble contabilización; la separación de contenedores; los movimientos y la reconciliación del modelo físico ya disponen de cobertura canónica vigente. Esta tarea especializa y cierra el propósito y la taxonomía documental sin cambiar prioridad, modalidad, owner, paquete, estado o relación de requisitos existentes.

#### 81. Cobertura de prueba vigente reutilizada

Sin modificar el registro 04A, se reutiliza la cobertura vigente de:

- `TREQ-NEXO-004`, para ciclo LPN ejecutable y auditable sin doble contabilización;
- `TREQ-NEXO-011`, para movimientos/proyecciones conciliables y separación de existencia suelta frente a contenido LPN;
- `TREQ-NEXO-012`, para lote, serial, condición y trazabilidad dentro de LPN;
- `TREQ-NEXO-013`, para separar activo, contenedor, LPN y stock;
- `TREQ-NEXO-016`, para separar LPN, bulto, contenedor, remisión, viaje y custodia en logística;
- `TREQ-NEXO-040` y `TREQ-NEXO-041`, para preservar la clase primaria y mantenerla separada de LPN;
- `TREQ-NEXO-046`, para separar identidad de contenedor físico e identidad LPN;
- `TREQ-NEXO-047`, para impedir duplicación entre saldo, instancia, kit, contenedor y contenido LPN;
- `TREQ-NEXO-048` y `TREQ-NEXO-049`, para reconciliación legacy, paridad y transición sin clasificación destructiva.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `NEXO-DOM-002`.

#### 82. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto aún no ha sido insertado ni normalizado mediante el build documental del checkout de la tarea |
| LOCAL | `NOT_EXECUTED` | no se han ejecutado formateador, quality, delivery, topología, TREQ, batería global ni diff contra la rama local de `NEXO-DOM-002` |
| REMOTA | `PASS` | se verificaron en solo lectura `main`, continuidad vigente, topología, políticas de formato y desarrollo, contrato de entrega, owner, `NEXO-DOM-001`, cobertura 04A NEXO, definición previa de LPN, proceso/logística AS-IS, endpoint LPN actual y brechas físicas conocidas |
| OPERATIVA | `NOT_EXECUTED` | no se creó, escaneó, movió, empacó, recibió, despachó, retornó ni reconcilió un LPN real durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron tablas, filas, endpoints, componentes, aplicaciones, etiquetas, dispositivos, migraciones, RLS, RPC, Supabase ni entornos desplegados |

La validación remota es auditoría estática de fuentes vigentes y no equivale a certificación de runtime.

#### 83. Criterios de aceptación

- [x] Se define LPN como identidad logística de contenido.
- [x] Se define el propósito de agrupar contenido sin crear existencia adicional.
- [x] Se separa identidad LPN de contenido.
- [x] Se separa LPN de sede, LOC y posición.
- [x] Se separa LPN de contenedor físico.
- [x] Se separa LPN de bulto.
- [x] Se separa LPN de remisión.
- [x] Se separa LPN de viaje y manifiesto.
- [x] Se separa LPN de movimiento.
- [x] Se separa LPN de producto, presentación y unidad.
- [x] Se separa LPN de lote, serial y vencimiento.
- [x] Se separa LPN de condición.
- [x] Se separa LPN de las siete clases primarias de inventario.
- [x] Se separa LPN de kit.
- [x] Se define `LPN_PURPOSE_TYPE` como dimensión propietaria.
- [x] Se cierra el catálogo en exactamente seis valores.
- [x] Se define `STORAGE`.
- [x] Se define `RECEIVING`.
- [x] Se define `TRANSFER`.
- [x] Se define `FULFILLMENT`.
- [x] Se define `PRODUCTION_STAGING`.
- [x] Se define `RETURN`.
- [x] Se define una matriz de decisión por propósito.
- [x] Se exige un solo propósito primario vigente.
- [x] Se prohíbe selección por nombre, pantalla, categoría o `inventory_kind`.
- [x] Se prohíbe fallback silencioso para tipos desconocidos.
- [x] Se separa purpose type de temporalidad.
- [x] Se separa purpose type de composición.
- [x] Se separa purpose type de anidamiento.
- [x] Se separa purpose type de lifecycle.
- [x] Se separa purpose type de custodia.
- [x] Se separa purpose type de dirección inbound/outbound.
- [x] Se excluyen formas físicas como tipos de propósito.
- [x] Se excluyen estados y condiciones como tipos de propósito.
- [x] Se establece que cambiar propósito no puede ser overwrite silencioso.
- [x] Se preserva no doble contabilización.
- [x] Se preserva atomicidad futura de movimiento de contenido.
- [x] Se preserva trazabilidad de lote, serial y condición.
- [x] Se preserva capacidad y compatibilidad para su owner posterior.
- [x] Se registra el estado físico LPN como parcial.
- [x] Se registra la mezcla legacy de `container_type` sin corregirla físicamente.
- [x] Se registra el límite de `inventory_lpn_items`.
- [x] Se registra el endpoint GET como proyección parcial, no implementación completa.
- [x] Se conservan handoffs exactos hacia `NEXO-DOM-003..008`.
- [x] Se conservan handoffs exactos hacia `NEXO-DOM-019..024`.
- [x] Se preservan autorización, offline, concurrencia, auditoría y minimización como fronteras.
- [x] Se conserva `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecuta ningún cambio físico.
- [x] `NEXO-DOM-003` permanece reservada.

#### 84. Límites

Esta tarea no:

- crea un LPN real;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- elimina o transforma `container_type`;
- crea un enum físico;
- crea tipos TypeScript;
- crea migraciones;
- modifica Supabase;
- cambia RLS;
- cambia grants;
- cambia RPC;
- cambia endpoints;
- modifica `vento-nexo`;
- modifica componentes;
- modifica rutas;
- implementa formularios;
- imprime etiquetas;
- define tamaño o simbología de etiquetas;
- ejecuta escaneo;
- asigna purpose type a filas existentes;
- ejecuta backfill;
- define el lifecycle completo;
- define idempotencia de creación;
- define cierre, anulación o reetiquetación;
- define empaque o desempaque detallado;
- define división o unión de contenido;
- define LPN anidados;
- define relación completa sede-LOC-LPN-contenido;
- define custodia completa;
- define cuándo un contenedor conserva o cambia LPN;
- implementa no doble contabilización;
- implementa movimiento atómico;
- implementa trazabilidad interna de lotes/seriales;
- implementa capacidad o compatibilidad física;
- cambia autorización;
- cambia procesos FOGO, ORIGO, PULSO, PASS o NUMERA;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- crea una instancia física propia;
- desarrolla `NEXO-DOM-003`.

#### 85. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-001 — Clasificar consumibles, stock por cantidad, reutilizables, activos serializados, repuestos, kits y contenedores`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar`

### [ ] NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar
### [ ] NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN
### [ ] NEXO-DOM-005 — Definir división, unión y transferencia de contenido
### [ ] NEXO-DOM-006 — Definir LPN anidados y contenedores retornables
### [ ] NEXO-DOM-007 — Definir relación sede → LOC → LPN → contenido
### [ ] NEXO-DOM-008 — Definir custodia y responsable actual
### [ ] NEXO-DOM-009 — Separar activo individual y reutilizable controlado por cantidad
### [ ] NEXO-DOM-010 — Definir estado, condición, daño, pérdida y faltante
### [ ] NEXO-DOM-011 — Definir préstamo, devolución, transferencia y cambio de custodia
### [ ] NEXO-DOM-012 — Definir mantenimiento, reparación y disponibilidad
### [ ] NEXO-DOM-013 — Definir baja, descarte, venta o reemplazo
### [ ] NEXO-DOM-014 — Definir kits, conjuntos y validación de completitud
### [ ] NEXO-DOM-015 — Definir conteos de activos, reutilizables y contenedores
### [ ] NEXO-DOM-016 — Definir repuestos, compatibilidad y stock mínimo
### [ ] NEXO-DOM-017 — Definir auditoría, historial y evidencia
### [ ] NEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4

### [ ] NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN
### [ ] NEXO-DOM-020 — Definir cuándo un contenedor conserva, cambia o cierra su LPN
### [ ] NEXO-DOM-021 — Prohibir doble contabilización entre existencia suelta en LOC y existencia contenida en LPN
### [ ] NEXO-DOM-022 — Definir que mover un LPN mueve atómicamente todo su contenido
### [ ] NEXO-DOM-023 — Definir trazabilidad de lote, serial, vencimiento y condición dentro del LPN
### [ ] NEXO-DOM-024 — Definir capacidad, peso, volumen y compatibilidad de contenido
### [ ] NEXO-DOM-025 — Vincular repuestos consumidos con mantenimiento y costo del activo
### [ ] NEXO-DOM-026 — Definir inspecciones, mantenimiento preventivo, garantía y calibración
### [ ] NEXO-DOM-027 — Resolver propiedad de vehículos, checklist, kilometraje, combustible y mantenimiento de flota
### [ ] NEXO-DOM-028 — Emitir eventos financieros por adquisición, reparación, pérdida y baja cuando corresponda
### [ ] NEXO-DOM-029 — Definir jerarquía canónica de instalaciones, espacios, componentes fijos, puntos de servicio y condición
### [ ] NEXO-DOM-030 — Definir planes de mantenimiento, solicitudes, órdenes de trabajo, reparación, prueba y liberación
### [ ] NEXO-DOM-031 — Definir limpieza, saneamiento, procedimientos, frecuencias, químicos, verificación y liberación
### [ ] NEXO-DOM-032 — Definir control de plagas, mapa, dispositivos, visitas, hallazgos, acciones y certificados
### [ ] NEXO-DOM-033 — Definir servicios, medidores, lecturas, consumos, interrupciones, alertas y contingencias
### [ ] NEXO-DOM-034 — Definir inspecciones físicas, plantillas versionadas, hallazgos y acciones correctivas
### [ ] NEXO-DOM-035 — Definir control metrológico, calibración, verificación, tolerancias, certificados e impacto
### [ ] NEXO-DOM-036 — Definir llaves, credenciales físicas, zonas, custodia, entrega, devolución e incidencias
### [ ] NEXO-DOM-037 — Definir obras, adecuaciones, contratistas, permisos, afectación operativa, recepción y garantía
### [ ] NEXO-DOM-038 — Definir novedades locativas, severidad, contención, escalamiento, resolución y cierre
