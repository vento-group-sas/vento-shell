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

### ✅ NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN
**Tarea siguiente:** NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN
**Tipo de tarea:** documental; definición canónica del ciclo de vida de una identidad LPN, sus estados, transiciones, precondiciones, idempotencia, concurrencia, anulación, reetiquetado, trazabilidad y fronteras de responsabilidad bajo topología DEFINE_ONCE
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir un único ciclo de vida canónico para cada LPN, de forma que creación, activación, cierre, anulación y reetiquetado tengan significado determinista, auditable e independiente de contenido, ubicación, contenedor físico, estado de una remisión, movimiento de inventario, custodia, lote o serial, purpose type, etiqueta física, pantalla o ruta técnica.

La regla raíz queda:

```text
IDENTIDAD LPN ESTABLE
+
UN ESTADO DE LIFECYCLE VIGENTE
+
UNA REVISION DE LIFECYCLE
+
TRANSICIONES AUTORIZADAS Y AUDITABLES
+
IDEMPOTENCIA Y CONTROL DE CONCURRENCIA
->
CICLO LPN REPRODUCIBLE
SIN BORRADO DE HISTORIA
```

La existencia de un LPN no implica por sí sola existencia disponible, movimiento, reserva, despacho, recepción, custodia, cierre de remisión ni efecto contable.

---

#### 2. Resultado canónico

La tarea fija documentalmente:

1. exactamente cinco estados canónicos de lifecycle;
2. la separación entre estado, purpose type y representación física;
3. una máquina de estados cerrada;
4. reglas de creación;
5. reglas de activación;
6. reglas de cierre normal;
7. reglas de anulación antes y después de activación;
8. reetiquetado como evento que preserva identidad;
9. invariantes de identidad y código;
10. reglas de cambio de purpose type dentro del lifecycle;
11. idempotencia;
12. concurrencia;
13. comportamiento ante operación offline o respuesta tardía;
14. auditoría mínima;
15. fronteras con contenido, ubicación, custodia, contenedores y movimientos;
16. handoff exacto hacia `NEXO-DOM-004`.

No se materializa esquema, RPC, RLS, Server Action, Route Handler, UI, migración, backfill, etiqueta ni flujo físico.

---

#### 3. Entradas canónicas preservadas

Esta tarea consume sin redefinir:

- la identidad LPN aprobada en `NEXO-DOM-002`;
- exactamente un purpose type vigente por LPN;
- el catálogo cerrado de seis purpose types: `STORAGE`, `RECEIVING`, `TRANSFER`, `FULFILLMENT`, `PRODUCTION_STAGING` y `RETURN`;
- la separación entre LPN y LOC;
- la separación entre LPN y contenedor físico;
- la separación entre LPN y clase primaria de inventario;
- la separación entre LPN y lote, serial, remisión, viaje, bulto y movimiento;
- la propiedad de NEXO sobre estado físico y trazabilidad de inventario;
- la regla de no doble contabilización;
- la obligación de idempotencia y reconciliación de movimientos;
- la autorización server-side como condición para producir efectos reales;
- la conservación de historia como requisito transversal.

La tarea no crea un séptimo purpose type ni reinterpreta los seis existentes.

---

#### 4. Estado y purpose type son dimensiones distintas

Se fija:

```text
LPN_PURPOSE_TYPE != LPN_LIFECYCLE_STATE
```

El purpose type responde para qué existe ahora la agrupación logística. El lifecycle responde en qué estado operativo y contractual está su identidad.

Por tanto:

```text
TRANSFER != ACTIVE
FULFILLMENT != CLOSED
RETURN != VOID
```

Ningún consumidor podrá derivar lifecycle desde purpose type ni purpose type desde lifecycle.

---

#### 5. Identidad estable

Cada LPN conserva una identidad canónica estable durante toda su historia.

```text
LPN_ID_CHANGES = 0
LIFECYCLE_TRANSITION != NEW_LPN_ID
RELABEL != NEW_LPN_ID
PURPOSE_CHANGE != NEW_LPN_ID
```

Cerrar, anular o reetiquetar nunca borra ni recicla el identificador.

---

#### 6. Código visible e identidad

El código visible de un LPN es una representación de su identidad, no la identidad misma. La forma AS-IS conocida `LPN-SEDE-AAMM-SEQ` se conserva como evidencia de implementación parcial, pero esta tarea no la convierte en contrato físico definitivo.

Reglas:

- el `lpn_id` es la identidad estable;
- el código visible debe resolver a una sola identidad;
- el código no podrá reasignarse a otra identidad después de ser emitido;
- un cambio de etiqueta no crea otro LPN;
- una reimpresión no habilita un LPN cerrado, cancelado o anulado;
- una presentación de código obsoleta no concede autoridad.

La sintaxis final, simbología, DPI, tamaño, hardware y protocolo de impresión pertenecen a sus tareas propietarias posteriores.

---

#### 7. Catálogo cerrado de estados

Se fijan exactamente cinco estados canónicos:

```text
DRAFT
ACTIVE
CLOSED
CANCELLED
VOID
```

No forman parte del catálogo:

```text
CREATED
RELABELED
TEMPORARY
PERSISTENT
IN_TRANSIT
RECEIVED
DELIVERED
EMPTY
FULL
DAMAGED
QUARANTINED
```

Esos términos pueden representar eventos, temporalidad, estados de otros objetos, condición o propiedades derivadas, pero no estados adicionales del lifecycle LPN.

---

#### 8. Estado `DRAFT`

`DRAFT` representa una identidad LPN creada pero todavía no habilitada para producir efectos operativos como agrupación logística activa.

En `DRAFT`:

- la identidad ya existe y no puede reutilizarse;
- existe un purpose type vigente;
- puede completarse la información necesaria para activación;
- puede corregirse el purpose type bajo historial versionado;
- puede prepararse contenido conforme al contrato posterior;
- no se considera disponibilidad;
- no ejecuta movimiento;
- no transfiere custodia;
- no confirma despacho ni recepción;
- no sustituye una reserva;
- no prueba ubicación física;
- puede cancelarse antes de activación.

`DRAFT` no es sinónimo de registro incompleto inválido. Es un estado explícito con restricciones propias.

---

#### 9. Estado `ACTIVE`

`ACTIVE` representa una identidad LPN habilitada para participar en operaciones reales que hayan superado sus propios contratos de autorización, contenido, ubicación, compatibilidad, movimiento y custodia.

Estar `ACTIVE` significa únicamente:

```text
LPN LIFECYCLE ALLOWS OPERATIONAL USE
```

No significa automáticamente:

```text
HAS_CONTENT
HAS_STOCK
AVAILABLE
IN_TRANSIT
AUTHORIZED_FOR_EVERY_ACTOR
DELIVERED
RECEIVED
```

Toda operación posterior debe revalidar sus propias precondiciones y permisos.

---

#### 10. Estado `CLOSED`

`CLOSED` representa el fin normal del uso operativo de una identidad LPN.

Un LPN cerrado:

- conserva identidad;
- conserva código e historia;
- conserva purpose history;
- conserva eventos;
- conserva referencias históricas desde movimientos, remisiones, custodias y otros objetos;
- no acepta nuevas operaciones ordinarias;
- no vuelve a `ACTIVE`;
- no puede reutilizarse como identidad de otra agrupación;
- puede conservar evidencia de su contenido final conforme al contrato propietario;
- puede ser reetiquetado únicamente cuando exista una necesidad documental o física legítima que no lo presente como activo.

Cerrar no borra contenido, stock ni movimientos por sí solo.

---

#### 11. Estado `CANCELLED`

`CANCELLED` representa una identidad creada en `DRAFT` que se abandona antes de su primera activación.

Solo aplica cuando:

```text
CURRENT_STATE = DRAFT
AND
HAS_EVER_BEEN_ACTIVE = FALSE
```

La cancelación:

- es terminal;
- conserva la identidad;
- conserva el motivo;
- conserva actor y momento;
- no ejecuta compensación de inventario porque no debió existir efecto operativo previo;
- no habilita reutilización del código;
- no permite activación posterior;
- no se convierte en borrado.

Si existiera un efecto real previo, el caso no puede resolverse fingiendo que nunca fue activado.

---

#### 12. Estado `VOID`

`VOID` representa una anulación excepcional de una identidad que ya fue activa, o de un cierre que debe quedar invalidado sin borrar su historia.

`VOID`:

- es terminal;
- conserva identidad e historia;
- exige razón explícita;
- exige actor autorizado;
- exige reconciliación de efectos dependientes;
- nunca elimina movimientos;
- nunca elimina referencias;
- nunca pone cantidades en cero por sí solo;
- nunca revierte automáticamente remisiones, reservas, custodias o hechos económicos;
- bloquea uso operativo posterior.

La anulación no reescribe el pasado. Registra que la identidad deja de ser válida para uso futuro y que sus efectos previos deben permanecer reconciliables.

---

#### 13. `CREATED` es evento, no estado

Crear un LPN produce:

```text
CREATE
->
NEW LPN IDENTITY
->
INITIAL STATE = DRAFT
```

La fecha de creación es un hecho histórico. El estado inicial es `DRAFT`.

---

#### 14. `RELABELED` es evento, no estado

Reetiquetar produce una nueva emisión de representación física de la misma identidad.

```text
STATE BEFORE RELABEL = STATE AFTER RELABEL
RELABELED != LIFECYCLE STATE
```

Una reetiquetación no abre, cierra, activa ni anula el LPN.

---

#### 15. Máquina de estados

La máquina canónica queda:

```text
CREATE
  |
  v
DRAFT
  | \
  |  \ ANNUL BEFORE FIRST ACTIVATION
  |   \
ACTIVATE v
  |   CANCELLED
  v
ACTIVE
  | \
  |  \ ANNUL
  |   \
CLOSE  v
  |   VOID
  v
CLOSED
  |
  | EXCEPTIONAL ANNULMENT
  v
VOID
```

`CANCELLED` y `VOID` son terminales. `CLOSED` es terminal para operación ordinaria y solo admite anulación excepcional o eventos no operativos expresamente permitidos.

---

#### 16. Matriz de transiciones

| Estado actual | Operación | Estado resultante | Decisión |
| --- | --- | --- | --- |
| inexistente | crear | `DRAFT` | permitida con identidad nueva e idempotencia |
| `DRAFT` | activar | `ACTIVE` | permitida si cumple precondiciones |
| `DRAFT` | cerrar | — | prohibida; nunca estuvo activo |
| `DRAFT` | anular | `CANCELLED` | permitida como cancelación preactivación |
| `DRAFT` | reetiquetar | `DRAFT` | permitida si existe una emisión previa válida |
| `ACTIVE` | activar | — | no crea otra transición |
| `ACTIVE` | cerrar | `CLOSED` | permitida si se reconciliaron operaciones pendientes |
| `ACTIVE` | anular | `VOID` | permitida de forma excepcional con reconciliación |
| `ACTIVE` | reetiquetar | `ACTIVE` | permitida sin cambiar identidad ni estado |
| `CLOSED` | activar | — | prohibida |
| `CLOSED` | cerrar | — | no crea otra transición |
| `CLOSED` | anular | `VOID` | excepcional; requiere justificar invalidez del cierre |
| `CLOSED` | reetiquetar | `CLOSED` | solo para evidencia o necesidad controlada |
| `CANCELLED` | activar | — | prohibida |
| `CANCELLED` | cerrar | — | prohibida |
| `CANCELLED` | reetiquetar | — | prohibida para uso operativo |
| `VOID` | activar | — | prohibida |
| `VOID` | cerrar | — | prohibida |
| `VOID` | reetiquetar | — | prohibida para uso operativo |

Una operación prohibida nunca se convierte silenciosamente en creación de una identidad nueva.

---

#### 17. Contrato de creación

Crear un LPN requiere como mínimo:

- identidad nueva;
- código correlacionable;
- sede o contexto inicial permitido por el contrato aplicable;
- purpose type válido dentro de los seis valores aprobados;
- actor efectivo;
- contexto de autorización;
- instante;
- origen de la solicitud;
- correlación;
- clave o mecanismo de idempotencia;
- revisión inicial.

La creación produce exactamente una identidad y un único evento inicial.

No produce por sí sola stock, movimiento, reserva, contenido, ubicación confirmada, custodia, remisión, transferencia, recepción ni disponibilidad.

---

#### 18. Idempotencia de creación

Una reejecución de la misma intención de creación con la misma identidad de idempotencia debe resolver a la misma creación lógica.

Se prohíbe:

```text
ONE USER INTENT -> TWO LPN IDENTITIES
```

Ante timeout o respuesta perdida, el cliente debe poder consultar o reintentar sin fabricar un segundo LPN. Una nueva intención real requiere una nueva clave de idempotencia y produce una nueva identidad.

---

#### 19. Precondiciones de activación

La transición `DRAFT -> ACTIVE` exige, como mínimo:

1. identidad LPN vigente;
2. estado actual `DRAFT`;
3. revisión esperada vigente;
4. purpose type válido;
5. autorización server-side;
6. contexto territorial y operativo suficiente;
7. ausencia de anulación o cancelación concurrente;
8. satisfacción de las precondiciones de contenido aplicables;
9. satisfacción de las precondiciones de ubicación y compatibilidad aplicables;
10. ausencia de bloqueo de condición aplicable;
11. correlación e idempotencia;
12. registro auditable de la decisión.

Si una precondición pertenece a una tarea posterior todavía no materializada, la implementación física futura debe fallar cerrada; esta definición documental no la considera satisfecha por inferencia.

---

#### 20. Activación no ejecuta otras operaciones

```text
LPN ACTIVE != INVENTORY MOVEMENT COMMITTED
LPN ACTIVE != REMITTANCE DISPATCHED
LPN ACTIVE != CUSTODY ACCEPTED
LPN ACTIVE != CONTENT AVAILABLE
```

La activación habilita el lifecycle; cada efecto empresarial conserva su transición propietaria.

---

#### 21. Precondiciones de cierre

La transición `ACTIVE -> CLOSED` exige demostrar que cerrar no ocultará trabajo operativo pendiente.

Como mínimo debe verificarse:

- estado actual `ACTIVE`;
- revisión esperada vigente;
- actor autorizado;
- purpose type vigente conocido;
- ausencia de movimientos abiertos incompatibles con cierre;
- ausencia de transferencia de custodia pendiente que dependa del LPN;
- ausencia de discrepancia no reconciliada que sería ocultada;
- contenido final reconciliable conforme a su contrato;
- referencias desde remisiones o procesos conservadas;
- motivo o base de cierre;
- correlación;
- auditoría.

El detalle de vaciado, empaque, desempaque, división, unión, anidamiento, ubicación y capacidad pertenece a sus tareas propietarias.

---

#### 22. Cierre normal no es borrado

Cerrar produce `ACTIVE -> CLOSED` y conserva identidad, código, purpose history, lifecycle history, content history, location history, movement references, custody references y audit references.

El estado `CLOSED` bloquea mutaciones operativas ordinarias sin destruir la capacidad de reconstruir lo ocurrido.

---

#### 23. Anulación antes de activación

Cuando la identidad continúa en `DRAFT` y nunca estuvo activa:

```text
ANNUL -> CANCELLED
```

La operación requiere actor autorizado, estado actual `DRAFT`, razón, correlación, revisión vigente y ausencia de efecto real incompatible.

Si se detecta que existieron efectos reales, el sistema no podrá degradar el caso a simple cancelación.

---

#### 24. Anulación de un LPN activo

Cuando el estado actual es `ACTIVE`:

```text
ANNUL -> VOID
```

La anulación debe impedir efectos futuros, pero no puede borrar ni revertir silenciosamente efectos anteriores.

Antes de completar la transición debe existir una salida reconciliable para contenido, ubicación, movimientos, reservas, custodias, remisiones, procesos dependientes y etiquetas vigentes.

Cuando sea necesario compensar un efecto, la compensación pertenece al contrato del efecto original y conserva su propia evidencia.

---

#### 25. Anulación posterior al cierre

`CLOSED -> VOID` se admite únicamente como excepción documentada cuando se demuestre que la identidad cerrada no debe seguir considerándose válida.

No equivale a reabrir.

Debe conservar cierre original, motivo de la anulación posterior, actor, instante, revisión, relaciones afectadas, reconciliaciones o compensaciones requeridas y evidencia suficiente.

Si la corrección puede resolverse sin invalidar la identidad, se conserva `CLOSED` y se registra la corrección en el dominio propietario.

---

#### 26. Prohibición de reapertura

No existe transición `CLOSED -> ACTIVE`, `CANCELLED -> ACTIVE` ni `VOID -> ACTIVE`.

Si una operación posterior requiere una nueva agrupación logística, deberá utilizar una identidad LPN válida según el contrato aplicable, sin reciclar una identidad terminal.

---

#### 27. Reetiquetado

Reetiquetar significa reemplazar o volver a emitir la representación física de la misma identidad.

Casos legítimos incluyen etiqueta dañada, ilegible, perdida, cambio de soporte, reimpresión controlada o sustitución por una emisión corregida.

La operación requiere identidad LPN existente, estado compatible, actor autorizado, motivo, referencia a la emisión anterior cuando exista, nueva revisión de etiqueta, instante, correlación y auditoría.

No modifica automáticamente ninguna otra dimensión.

---

#### 28. Invariantes de reetiquetado

```text
RELABEL -> SAME LPN_ID
RELABEL -> SAME LIFECYCLE STATE
RELABEL -> SAME CONTENT
RELABEL -> SAME INVENTORY BALANCE
RELABEL -> SAME CUSTODY
RELABEL -> SAME LOCATION
```

Un reetiquetado tampoco cambia purpose type por inferencia.

---

#### 29. Emisiones de etiqueta

La implementación física futura deberá poder distinguir `LPN IDENTITY` de `LABEL ISSUANCE`.

Una nueva emisión:

- referencia el mismo LPN;
- posee revisión o identidad de emisión suficiente;
- conserva relación con la emisión reemplazada;
- registra el motivo;
- permite identificar cuál emisión es operativamente vigente;
- evita que dos representaciones incompatibles parezcan identidades diferentes.

La forma de almacenamiento físico de esta relación se reserva a arquitectura y servicios de impresión.

---

#### 30. Etiqueta perdida o comprometida

Si una etiqueta se pierde, duplica o se sospecha comprometida:

- el LPN no cambia de identidad;
- se bloquea el uso de una emisión que deba retirarse;
- se genera una emisión controlada cuando corresponda;
- el estado del LPN solo cambia si una decisión separada lo exige;
- escanear una emisión retirada nunca autoriza una acción;
- toda acción posterior revalida estado y autorización en servidor.

La etiqueta nunca funciona como credencial de autoridad.

---

#### 31. Cambio de purpose type dentro del lifecycle

`NEXO-DOM-002` exige conservar historia si el purpose type cambia.

Se decide:

- en `DRAFT`, el purpose type puede corregirse antes de activación mediante una decisión versionada;
- en `ACTIVE`, puede cambiar únicamente cuando la operación propietaria del propósito anterior está reconciliada y la nueva finalidad cumple sus precondiciones;
- en `CLOSED`, `CANCELLED` y `VOID`, el purpose type histórico no se cambia;
- ningún cambio de purpose type crea una identidad LPN nueva por sí solo;
- ningún cambio de purpose type cambia el lifecycle state por sí solo.

```text
PURPOSE CHANGE != LIFECYCLE TRANSITION
```

---

#### 32. Historia de purpose type

Cada cambio permitido debe conservar valor anterior, valor nuevo, razón, actor, instante, revisión, proceso o contexto que libera el propósito anterior, proceso o contexto que requiere el nuevo y correlación.

Queda prohibido sobrescribir el valor sin historia. En todo instante operativo existe exactamente un purpose type vigente.

---

#### 33. Estado actual y ledger de transiciones

La implementación física futura deberá poder reconstruir el estado vigente a partir de una secuencia auditable o demostrar equivalencia contractual.

```text
CURRENT_STATE_COUNT = 1
TRANSITION_HISTORY_DELETED = 0
STATE_REVISION_MONOTONIC = TRUE
```

El estado actual podrá proyectarse para lectura eficiente, pero una proyección no sustituye la historia necesaria para auditoría y reconciliación.

---

#### 34. Forma conceptual mínima

```ts
type NexoLpnLifecycleState =
  | "DRAFT"
  | "ACTIVE"
  | "CLOSED"
  | "CANCELLED"
  | "VOID";

type NexoLpnLifecycleSnapshot = {
  lpn_id: string;
  lpn_code: string;
  lifecycle_state: NexoLpnLifecycleState;
  lifecycle_revision: number;
  purpose_type:
    | "STORAGE"
    | "RECEIVING"
    | "TRANSFER"
    | "FULFILLMENT"
    | "PRODUCTION_STAGING"
    | "RETURN";
  purpose_revision: number;
};
```

Esta forma es contractual y no obliga a una tabla, enum, columna o API específicos.

---

#### 35. Registro mínimo de una transición

Toda transición real deberá poder atribuirse, como mínimo, a:

- `lpn_id`;
- estado anterior;
- estado resultante;
- revisión anterior;
- revisión resultante;
- purpose type vigente;
- actor efectivo;
- contexto de autorización;
- sede o contexto territorial aplicable;
- sesión o dispositivo cuando sea material;
- instante de servidor;
- razón cuando aplique;
- correlación;
- idempotencia;
- origen del comando;
- evidencia o referencias de reconciliación cuando aplique.

Los nombres físicos finales de campos pertenecen a arquitectura e implementación.

---

#### 36. Control de concurrencia

Toda transición que pueda cambiar estado debe validar la revisión esperada.

```text
EXPECTED_REVISION = CURRENT_REVISION
```

Si dos actores intentan simultáneamente activar, cerrar, anular, cambiar purpose type o reetiquetar con efectos sobre la emisión vigente, solo una decisión podrá establecer la nueva revisión esperada.

La segunda deberá revalidar el estado actualizado y no podrá sobrescribir la primera silenciosamente.

---

#### 37. Idempotencia de transiciones

Una misma intención reintentada por timeout, red inestable o repetición del cliente:

- no crea dos eventos equivalentes;
- no incrementa dos veces la revisión;
- no duplica etiqueta;
- no duplica compensación;
- no duplica movimiento;
- no duplica efectos dependientes.

El mismo identificador de idempotencia debe devolver o reconstruir el resultado de la primera aceptación. Una intención distinta usa una identidad de operación distinta.

---

#### 38. Solicitud sobre un estado ya alcanzado

Una solicitud nueva que pretende repetir una transición ya alcanzada no crea historia falsa.

`ACTIVE + ACTIVATE` y `CLOSED + CLOSE` no generan una segunda activación o un segundo cierre.

Si se trata del replay de la misma operación, se devuelve el resultado idempotente. Si es una intención nueva incompatible con el estado vigente, se rechaza sin efecto.

---

#### 39. Respuestas tardías y orden

Una respuesta tardía no puede retroceder el lifecycle.

Si `CLIENT_REVISION < SERVER_REVISION`, la autoridad permanece en el servidor. La UI deberá refrescar o reconciliar antes de permitir otra transición.

Nunca se acepta `CLOSED -> ACTIVE` porque una respuesta de activación antigua llegó después.

---

#### 40. Operación offline

La captura offline puede conservar una intención pendiente cuando el contrato operativo lo permita, pero no puede declarar una transición como canónica antes de que el servidor la acepte.

```text
OFFLINE INTENT != CANONICAL LPN STATE
```

Al reconectar se recupera el estado vigente, se compara la revisión esperada, se revalida autorización y precondiciones, se aplica idempotencia, se acepta o rechaza la intención y se conserva evidencia del resultado.

Una transición rechazada no se fuerza por antigüedad del registro offline.

---

#### 41. Autorización

Esta tarea define qué transiciones existen, no quién recibe permisos concretos.

Toda transición real requiere actor efectivo, sesión vigente, autorización server-side, alcance territorial aplicable, contexto operativo aplicable, ausencia de bloqueo superior y trazabilidad del actor que produce el efecto.

La visibilidad de un botón, posesión de una etiqueta, acceso directo a una URL, un rol visual o un dato enviado por cliente no sustituyen la autorización.

Los permisos exactos permanecen en la familia `NEXO-AUTH` y contratos transversales correspondientes.

---

#### 42. Separación de lifecycle y contenido

Esta tarea solo establece cuándo el lifecycle permite operar. `NEXO-DOM-004` definirá qué puede contener un LPN, cómo se empaca, cómo se desempaca, cómo se representa contenido y qué invariantes mantiene el contenido.

| Estado | Efecto sobre operaciones de contenido |
| --- | --- |
| `DRAFT` | preparación sin efecto operativo final, según contrato de contenido |
| `ACTIVE` | puede participar en operaciones permitidas por contratos posteriores |
| `CLOSED` | bloquea mutación operativa ordinaria |
| `CANCELLED` | bloquea contenido operativo |
| `VOID` | bloquea contenido operativo nuevo; exige preservar historia |

El lifecycle no inventa contenido ni lo borra.

---

#### 43. Separación de lifecycle y ubicación

```text
ACTIVE != LOCATED
CLOSED != UNLOCATED
VOID != STOCK_REMOVED
```

La relación sede -> LOC -> LPN -> contenido pertenece a `NEXO-DOM-007`.

---

#### 44. Separación de lifecycle y custodia

```text
ACTIVATE != ACCEPT_CUSTODY
CLOSE != RETURN_CUSTODY
VOID != DELETE_CUSTODY_HISTORY
```

Custodia y responsable actual pertenecen a `NEXO-DOM-008`.

---

#### 45. Separación de lifecycle y movimiento

Una transición del lifecycle no genera un movimiento de stock implícito.

Se prohíbe:

```text
ACTIVATE LPN -> AUTO MOVE CONTENT
CLOSE LPN -> AUTO ZERO CONTENT
VOID LPN -> AUTO DELETE MOVEMENTS
```

Los movimientos, sus compensaciones y su atomicidad conservan sus contratos propietarios.

---

#### 46. Separación de lifecycle y contenedor físico

Cerrar o anular un LPN no da de baja automáticamente un contenedor físico. Reetiquetar un LPN no cambia la identidad del contenedor.

```text
LPN LIFECYCLE != PHYSICAL CONTAINER LIFECYCLE
```

La relación avanzada entre ambos permanece reservada a `NEXO-DOM-019` a `NEXO-DOM-024`.

---

#### 47. Separación de lifecycle y remisión

Un LPN `FULFILLMENT` puede participar en una remisión, pero su estado no sustituye el estado de la remisión.

```text
LPN ACTIVE != REMITTANCE IN TRANSIT
LPN CLOSED != REMITTANCE COMPLETED
LPN VOID != REMITTANCE CANCELLED
```

Cualquier correlación entre ambos objetos debe preservar identidades y transiciones independientes.

---

#### 48. Motivos y excepciones

Requieren razón explícita, como mínimo:

- cancelación de `DRAFT`;
- anulación a `VOID`;
- reetiquetado;
- cambio de purpose type en `ACTIVE`;
- corrección excepcional vinculada con un cierre.

La razón no puede sustituir evidencia o autorización cuando estas sean requeridas.

---

#### 49. Manejo de fallos

Una transición falla cerrada cuando no puede demostrar identidad, estado actual, revisión, autorización, precondiciones, idempotencia o integridad de referencias requeridas.

Un fallo técnico no cambia el estado, no incrementa revisión, no crea un segundo LPN, no confirma un cierre, no confirma una anulación y no presenta una etiqueta nueva como vigente sin confirmación.

---

#### 50. Reconciliación del estado AS-IS

La evidencia vigente conserva una implementación LPN parcial:

- existe `inventory_lpns`;
- existe un endpoint de lectura parcial;
- la lectura observada proyecta identidad, código, sede y fecha de creación;
- existe un formulario de creación no confirmado como flujo end-to-end;
- la superficie `/inventory/lpns` no demuestra por sí sola un ciclo LPN funcional completo;
- `inventory_lpns.container_type` mezcla una dimensión física con la identidad logística;
- `inventory_lpn_items` no representa todavía todo el universo de contenido objetivo;
- el ciclo completo no está materializado ni certificado.

Esta tarea no interpreta esas superficies como prueba de lifecycle completo.

---

#### 51. Adopción física futura

La implementación posterior deberá reconciliar el modelo actual contra este contrato sin borrar LPN existentes, reciclar códigos, fabricar estados históricos sin evidencia, inferir activaciones desde `created_at`, inferir cierre desde ausencia de contenido, inferir anulación desde una bandera visual, convertir `container_type` en estado, crear dos estados vigentes, perder referencias desde contenido o movimientos ni ejecutar backfill irreversible sin plan y evidencia.

Toda transición física pertenece a la instancia y package correspondientes, fuera del alcance documental de esta tarea.

---

#### 52. Responsabilidades

| Responsabilidad | Propietario contractual |
| --- | --- |
| identidad LPN y lifecycle | NEXO |
| purpose types | `NEXO-DOM-002` |
| contenido, empaque y desempaque | `NEXO-DOM-004` |
| división, unión y transferencia de contenido | `NEXO-DOM-005` |
| anidamiento y retornables | `NEXO-DOM-006` |
| sede, LOC, LPN y contenido | `NEXO-DOM-007` |
| custodia y responsable actual | `NEXO-DOM-008` |
| impresión y etiquetas integradas | `NEXO-DOM-018` y contratos de impresión |
| contenedor físico y relación avanzada LPN | `NEXO-DOM-019` a `NEXO-DOM-024` |
| autoridad para transiciones | familia `NEXO-AUTH` y autorización transversal |
| materialización de datos y servicios | arquitectura e implementación física propietarias |

Una tarea consumidora no puede absorber la propiedad de otra por conveniencia de implementación.

---

#### 53. Matriz de purpose type y lifecycle

Los seis purpose types pueden coexistir con estados del lifecycle sin crear estados especiales.

| Purpose type | `DRAFT` | `ACTIVE` | `CLOSED` | `CANCELLED` | `VOID` |
| --- | --- | --- | --- | --- | --- |
| `STORAGE` | permitido | permitido | permitido | permitido | permitido |
| `RECEIVING` | permitido | permitido | permitido | permitido | permitido |
| `TRANSFER` | permitido | permitido | permitido | permitido | permitido |
| `FULFILLMENT` | permitido | permitido | permitido | permitido | permitido |
| `PRODUCTION_STAGING` | permitido | permitido | permitido | permitido | permitido |
| `RETURN` | permitido | permitido | permitido | permitido | permitido |

La tabla expresa compatibilidad taxonómica, no autorización de una transición concreta.

---

#### 54. Escenarios negativos obligatorios

El contrato debe impedir, como mínimo:

1. activar un LPN cancelado;
2. activar un LPN anulado;
3. reabrir un LPN cerrado;
4. reutilizar un código de LPN;
5. crear dos LPN por un retry;
6. cerrar dos veces generando dos eventos;
7. anular y activar concurrentemente sin control de revisión;
8. cerrar mientras existe una operación incompatible pendiente;
9. borrar historia al anular;
10. poner stock en cero al cerrar;
11. cambiar purpose type sin historia;
12. usar `RELABELED` como lifecycle state;
13. usar `container_type` como lifecycle state;
14. usar estado de remisión como estado LPN;
15. tratar etiqueta como credencial;
16. emitir una nueva identidad al reetiquetar;
17. considerar una intención offline como transición confirmada;
18. aceptar una transición con revisión obsoleta;
19. permitir mutación operativa en `VOID`;
20. permitir mutación operativa ordinaria en `CLOSED`.

---

#### 55. Integridad histórica

Nunca se elimina de la historia creación, primera activación, cambios de estado, cierre, cancelación, anulación, reetiquetados, cambios de purpose type, actor, razón, revisión ni correlaciones materiales.

Una corrección posterior agrega información o una transición válida; no reescribe silenciosamente el evento original.

---

#### 56. Privacidad y minimización

La auditoría del lifecycle conserva únicamente la información necesaria para atribución, autorización, integridad, reconciliación, investigación, soporte y cumplimiento.

No se copian secretos, tokens, credenciales ni información personal innecesaria dentro de eventos LPN. Cuando una referencia a actor sea suficiente, no se duplica todo su perfil.

---

#### 57. Observabilidad

La implementación futura deberá poder distinguir al menos creación, activación, cierre, anulación y reetiquetado aceptados o rechazados; replay idempotente; conflicto de revisión; rechazo por estado incompatible; rechazo por autorización; rechazo por precondición; intención offline pendiente y reconciliación posterior.

La métrica no reemplaza la evidencia transaccional.

---

#### 58. Handoff hacia `NEXO-DOM-004`

Esta tarea entrega a `NEXO-DOM-004`:

```text
IMMUTABLE LPN IDENTITY
+
ONE CURRENT PURPOSE TYPE
+
ONE CURRENT LIFECYCLE STATE
+
MONOTONIC LIFECYCLE REVISION
+
CLOSED STATE MACHINE
+
NO IMPLICIT INVENTORY EFFECTS
```

`NEXO-DOM-004` deberá definir contenido, empaque y desempaque respetando estas reglas:

- `DRAFT` puede preparar contenido sin presentar el LPN como operativo;
- `ACTIVE` es el único estado ordinario que permite operaciones de contenido;
- `CLOSED`, `CANCELLED` y `VOID` no aceptan contenido operativo nuevo;
- ninguna operación de contenido cambia lifecycle por inferencia;
- ninguna operación de contenido crea otra identidad LPN salvo que una tarea propietaria lo ordene expresamente;
- todo contenido conserva trazabilidad hacia el mismo `lpn_id`.

---

#### 59. Handoffs posteriores

Se conserva explícitamente:

- `NEXO-DOM-005`: división, unión y transferencia de contenido;
- `NEXO-DOM-006`: LPN anidados y contenedores retornables;
- `NEXO-DOM-007`: relación sede -> LOC -> LPN -> contenido;
- `NEXO-DOM-008`: custodia y responsable actual;
- `NEXO-DOM-018`: integración de etiquetas;
- `NEXO-DOM-019`: separación entre contenedor físico y LPN;
- `NEXO-DOM-020`: continuidad o cierre de LPN respecto del contenedor;
- `NEXO-DOM-021`: no doble contabilización;
- `NEXO-DOM-022`: movimiento atómico del LPN y su contenido;
- `NEXO-DOM-023`: trazabilidad interna;
- `NEXO-DOM-024`: capacidad y compatibilidad.

Esta tarea no desarrolla esos contratos.

---

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro canónico vigente ya protege de forma explícita el ciclo LPN y los riesgos de doble contabilización, idempotencia, integración y trazabilidad que esta tarea especifica. La tarea detalla el contrato de dominio del owner ya registrado y no introduce una obligación de prueba independiente.

---

#### 61. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar, la cobertura existente:

- `TREQ-NEXO-004`, propietario directo del ciclo de creación, contenido, ubicación, movimiento, custodia, cierre, anulación y reetiquetado;
- `TREQ-NEXO-011`, que protege fuente canónica de movimientos, no doble contabilización, concurrencia e idempotencia;
- `TREQ-NEXO-016`, que protege la separación entre LPN, remisión, viaje, contenedor, custodia y entrega;
- `TREQ-NEXO-046`, que protege la separación entre LPN y contenedor físico;
- `TREQ-NEXO-047`, que protege comportamiento de movimientos, conteos, reservas, custodias, remisiones y LPN sin duplicar saldo.

Estas referencias son trazabilidad reutilizada y no una actualización del registro.

---

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La incorporación al archivo propietario y el build canónico corresponden al checkout local posterior. |
| LOCAL | NOT_EXECUTED | No se ejecutaron scripts sobre el checkout local del usuario durante la elaboración documental. |
| REMOTA | PASS | Se verificaron continuidad vigente, owner, tarea anterior aprobada, topología, contrato de entrega, políticas documentales, 04A NEXO, implementación LPN parcial y superficies de código observables en los repositorios canónicos. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó un ciclo LPN real en operación; la validación operativa permanece en sus owners físicos y de QA. |
| FÍSICA | NOT_EXECUTED | No se creó, activó, cerró, anuló ni reetiquetó un LPN físico. |

---

#### 63. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

- [x] Existe un catálogo cerrado de cinco estados.
- [x] `DRAFT`, `ACTIVE`, `CLOSED`, `CANCELLED` y `VOID` están definidos.
- [x] `CREATED` se trata como evento y no como estado.
- [x] `RELABELED` se trata como evento y no como estado.
- [x] El `lpn_id` permanece inmutable.
- [x] El código visible no se reutiliza como nueva identidad.
- [x] La creación produce `DRAFT`.
- [x] La activación válida produce `ACTIVE`.
- [x] El cierre normal produce `CLOSED`.
- [x] La anulación preactivación produce `CANCELLED`.
- [x] La anulación posterior a activación produce `VOID`.
- [x] El cierre y la anulación conservan historia.
- [x] El reetiquetado conserva identidad y estado.
- [x] No existe reapertura desde estados terminales.
- [x] El purpose type permanece separado del lifecycle.
- [x] El cambio de purpose type conserva historia.
- [x] Se define control de revisión para concurrencia.
- [x] Se define idempotencia de creación y transiciones.
- [x] La operación offline no se presenta como estado canónico antes del servidor.
- [x] Las respuestas tardías no pueden retroceder el lifecycle.
- [x] Activar, cerrar o anular no produce movimientos implícitos.
- [x] Se preservan fronteras con contenido, ubicación, custodia, remisiones y contenedores.
- [x] Se preserva la cobertura de pruebas existente sin duplicarla.
- [x] No se modifica el registro 04A.
- [x] No se autoriza cambio físico.
- [x] La siguiente tarea recibe un handoff explícito y completo.

---

#### 64. Límites

Esta tarea no:

- define la estructura física final de tablas;
- crea enums, constraints, índices, triggers, vistas, RPC o políticas RLS;
- crea Server Actions ni Route Handlers;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- implementa el formulario de creación;
- monta una pantalla LPN;
- crea etiquetas ni imprime;
- define contenido, empaque o desempaque;
- define división o unión;
- define anidamiento;
- define ubicación;
- define custodia;
- define capacidad, peso o volumen;
- define la relación física completa con contenedores;
- define permisos concretos;
- ejecuta backfill;
- migra estados legacy;
- modifica Supabase;
- modifica código;
- modifica datos;
- despliega;
- crea una instancia física propia;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-DOM-004`.

---

#### 65. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN`

### ✅ NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar
**Tarea siguiente:** NEXO-DOM-005 — Definir división, unión y transferencia de contenido
**Tipo de tarea:** documental; definición canónica del contenido de LPN, su representación, membresía, empaque y desempaque, conservación de identidad y cantidad, idempotencia, concurrencia, trazabilidad y fronteras con lifecycle, ubicación, custodia, contenedores y transferencias bajo topología DEFINE_ONCE
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma única y verificable qué significa que una existencia o identidad física esté contenida en un LPN y cómo se ejecutan las operaciones de empaque y desempaque sin crear saldo duplicado, perder dimensiones de inventario, fusionar identidades ni convertir al LPN en ubicación, contenedor físico, kit, remisión o movimiento.

La regla raíz queda:

```text
LPN ACTIVO
+
CONTENIDO ELEGIBLE E IDENTIFICADO
+
ORIGEN RECONCILIABLE
+
UNA MEMBRESÍA AUTORITATIVA
+
MOVIMIENTO CORRELACIONADO
+
IDEMPOTENCIA Y CONCURRENCIA
→
CONTENIDO LPN RECONSTRUIBLE
SIN DOBLE CONTABILIZACIÓN
```

Esta tarea define el contrato de dominio. No materializa tablas, APIs, Server Actions, RLS, UI, migraciones, datos ni operaciones físicas.

---

#### 2. Resultado canónico

La tarea fija documentalmente:

1. la diferencia entre contenido planificado y contenido empacado autoritativo;
2. las formas canónicas de contenido por cantidad, por identidad serializada y por instancia de kit;
3. las clases primarias elegibles para contenido LPN;
4. las dimensiones que una membresía debe preservar;
5. la regla de una sola contabilización física;
6. el contrato de `PACK`;
7. el contrato de `UNPACK`;
8. las precondiciones de ambas operaciones;
9. conservación exacta de cantidad o identidad;
10. reglas de granularidad por clase primaria;
11. idempotencia;
12. control de concurrencia mediante revisión de contenido;
13. comportamiento ante retry, offline y respuestas tardías;
14. coexistencia de contenido mixto bajo compatibilidad explícita;
15. preservación de lote, vencimiento, condición, presentación y unidad;
16. separación respecto de lifecycle, ubicación, custodia, remisión, kit y contenedor físico;
17. reconciliación del modelo físico parcial existente;
18. handoff exacto hacia `NEXO-DOM-005`.

---

#### 3. Entradas canónicas preservadas

Esta tarea consume sin redefinir:

- la identidad LPN inmutable;
- exactamente un purpose type vigente;
- los seis purpose types aprobados;
- un único lifecycle state vigente;
- los estados `DRAFT`, `ACTIVE`, `CLOSED`, `CANCELLED` y `VOID`;
- la revisión monotónica de lifecycle;
- la regla de que `ACTIVE` es el único estado ordinario que permite operaciones reales de contenido;
- la prohibición de reabrir estados terminales;
- la separación entre LPN y contenedor físico;
- las siete clases primarias de control de inventario;
- la fuente canónica de movimientos y proyecciones reconciliables;
- la prohibición de contabilizar simultáneamente una cantidad como stock suelto y contenido LPN;
- la necesidad de autorización server-side para todo efecto real;
- idempotencia, concurrencia, auditoría y conservación histórica como reglas transversales.

---

#### 4. Definición de contenido LPN

Contenido LPN es una membresía logística explícita entre una identidad LPN y una porción o identidad física de inventario que continúa conservando su identidad de dominio original.

Se fija:

```text
PACKED INTO LPN
!=
NEW PRODUCT
```

```text
PACKED INTO LPN
!=
NEW STOCK
```

```text
PACKED INTO LPN
!=
OWNERSHIP TRANSFER
```

```text
PACKED INTO LPN
!=
NEW PHYSICAL CONTAINER
```

El LPN agrega trazabilidad logística; no sustituye el objeto contenido.

---

#### 5. Dos planos: plan y membresía autoritativa

Se separan exactamente dos conceptos:

```text
CONTENT PLAN
```

```text
AUTHORITATIVE PACKED MEMBERSHIP
```

`CONTENT PLAN` describe intención de preparación y puede existir mientras el LPN está `DRAFT`.

`AUTHORITATIVE PACKED MEMBERSHIP` demuestra que una cantidad o identidad dejó de estar contabilizada como existencia suelta y pasó a estar controlada como contenido del LPN mediante un efecto correlacionado.

Nunca se consideran equivalentes.

---

#### 6. Plan de contenido en `DRAFT`

Mientras el LPN está `DRAFT` puede prepararse una lista de contenido previsto sin presentar el LPN como operativo.

El plan:

- puede incluir sujeto, cantidad prevista y dimensiones conocidas;
- puede ser corregido antes de activación;
- no crea saldo;
- no mueve stock;
- no confirma empaque físico;
- no reserva por sí solo;
- no transfiere custodia;
- no confirma disponibilidad;
- no convierte al LPN en `ACTIVE`;
- no puede consumirse como membresía autoritativa por otro proceso.

Si la preparación necesita una reserva real, esa reserva deberá producirse mediante su contrato propietario y no por la mera existencia del plan.

---

#### 7. Membresía autoritativa

Una membresía autoritativa representa contenido que ya pertenece logísticamente al LPN para efectos de trazabilidad física.

Debe existir únicamente después de una operación real aceptada por servidor y correlacionada con el movimiento o cambio de control necesario para impedir doble contabilización.

Se fija:

```text
AUTHORITATIVE MEMBERSHIP
→
SERVER ACCEPTED
+
RECONCILIABLE INVENTORY EFFECT
```

Un registro local, una selección visual o una intención offline no bastan.

---

#### 8. Estados del lifecycle y contenido

| Lifecycle | Plan de contenido | Empaque autoritativo nuevo | Desempaque ordinario | Lectura histórica |
| --- | --- | --- | --- | --- |
| `DRAFT` | permitido | prohibido | no aplica | permitido |
| `ACTIVE` | permitido como ayuda no autoritativa | permitido | permitido | permitido |
| `CLOSED` | no operativo | prohibido | prohibido ordinariamente | permitido |
| `CANCELLED` | histórico | prohibido | prohibido | permitido |
| `VOID` | histórico | prohibido | prohibido ordinariamente | permitido |

Una operación excepcional de reconciliación sobre un estado terminal pertenece al contrato de compensación o corrección propietario y nunca se presenta como empaque o desempaque ordinario.

---

#### 9. Activación y primer empaque son decisiones separadas

Un flujo de usuario puede orquestar activación y empaque consecutivamente, pero el dominio conserva dos decisiones distintas:

```text
ACTIVATE LPN
!=
PACK CONTENT
```

La activación debe quedar aceptada antes del primer empaque autoritativo. Un fallo del empaque no revierte silenciosamente el lifecycle; cualquier compensación deberá ser explícita e idempotente.

---

#### 10. Formas canónicas de contenido

Se fijan tres formas conceptuales de membresía:

```text
QUANTITY_SLICE
SERIALIZED_IDENTITY
KIT_INSTANCE
```

Estas formas describen granularidad de control dentro del LPN y no crean nuevas clases primarias de inventario.

---

#### 11. `QUANTITY_SLICE`

`QUANTITY_SLICE` representa una porción medible de una existencia controlada por cantidad.

Aplica, según política de la clase, a:

- `CONSUMABLE`;
- `QUANTITY_STOCK`;
- `REUSABLE_QUANTITY`;
- `SPARE_PART` cuando se controla por cantidad.

Debe preservar como mínimo las dimensiones necesarias para identificar sin ambigüedad el saldo de origen.

---

#### 12. `SERIALIZED_IDENTITY`

`SERIALIZED_IDENTITY` representa una identidad física indivisible para efectos de membresía LPN.

Aplica a:

- `SERIALIZED_ASSET` cuando el contrato permite viajar dentro de LPN;
- `SPARE_PART` serializado;
- cualquier otra clase cuya política aprobada exija identidad individual exacta.

Una identidad serializada:

- no admite cantidad fraccionaria;
- no puede estar en dos LPN simultáneamente;
- no pierde serial, identidad ni historia al empacarse;
- no se convierte en línea fungible por entrar al LPN.

---

#### 13. `KIT_INSTANCE`

`KIT_INSTANCE` representa una instancia materializada de kit que puede viajar dentro de un LPN sin convertirse en LPN.

Solo una instancia válida y reconciliable puede ser contenido.

La definición del kit, sus componentes, completitud, sustituciones y ciclo propio permanecen en sus tareas propietarias.

Se fija:

```text
KIT INSTANCE IN LPN
!=
LPN
```

---

#### 14. Clases primarias y forma de contenido

| Clase primaria | Forma ordinaria dentro de LPN | Regla |
| --- | --- | --- |
| `CONSUMABLE` | `QUANTITY_SLICE` | cantidad y dimensiones aplicables |
| `QUANTITY_STOCK` | `QUANTITY_SLICE` | cantidad, lote, condición y demás dimensiones de existencia |
| `REUSABLE_QUANTITY` | `QUANTITY_SLICE` | cantidad equivalente recuperable, sin inventar identidad individual |
| `SERIALIZED_ASSET` | `SERIALIZED_IDENTITY` | identidad exacta cuando el contrato lo permita |
| `SPARE_PART` | `QUANTITY_SLICE` o `SERIALIZED_IDENTITY` | según política de la pieza |
| `KIT` | `KIT_INSTANCE` | instancia materializada, no definición abstracta |
| `PHYSICAL_CONTAINER` | no es contenido ordinario de este contrato | su vínculo con LPN es una relación separada |

---

#### 15. Contenedor físico no es contenido LPN

`PHYSICAL_CONTAINER` no se modela como una línea de contenido ordinaria en esta tarea.

Un contenedor físico puede soportar, transportar o vincularse con un LPN, pero conserva identidad propia.

Se fija:

```text
PHYSICAL CONTAINER
!=
LPN CONTENT LINE
```

La relación avanzada entre ambos pertenece a `NEXO-DOM-019` a `NEXO-DOM-024`.

---

#### 16. LPN anidado no es contenido ordinario de esta tarea

Una identidad LPN no puede introducirse como si fuera una línea normal de producto o activo dentro de otra identidad LPN.

La semántica de LPN anidados pertenece a `NEXO-DOM-006`.

Hasta que dicho contrato sea aplicado por una implementación física, un consumidor no puede fabricar anidamiento interpretando un `lpn_id` como `subject_id` de contenido ordinario.

---

#### 17. Dimensiones obligatorias de una membresía por cantidad

Una membresía `QUANTITY_SLICE` debe conservar las dimensiones que hagan distinta a la existencia de origen, según apliquen:

- identidad maestra de producto o material;
- clase primaria;
- presentación;
- unidad canónica de stock;
- cantidad;
- lote;
- vencimiento;
- condición;
- estado de disponibilidad cuando sea una dimensión independiente;
- referencia de origen suficiente para reconciliar la salida del saldo suelto;
- sede o contexto territorial aplicable;
- revisión del contenido LPN;
- correlación de la operación.

No todas las dimensiones son obligatorias para todas las clases; las aplicables no pueden descartarse al empacar.

---

#### 18. Dimensiones obligatorias por identidad

Una membresía `SERIALIZED_IDENTITY` debe preservar como mínimo:

- identidad física estable;
- clase primaria;
- producto o modelo maestro cuando aplique;
- serial, placa o código individual cuando aplique;
- condición;
- referencia de origen;
- referencias de custodia o ubicación sin apropiarse de sus contratos;
- revisión del contenido LPN;
- correlación.

Cantidad arbitraria no sustituye la identidad exacta.

---

#### 19. Clave conceptual de una línea por cantidad

Dos porciones solo pueden consolidarse en una misma línea lógica cuando todas las dimensiones que afectan identidad de existencia son compatibles.

Como mínimo no se fusionan silenciosamente cantidades con diferencias en:

- producto;
- clase primaria;
- unidad canónica incompatible;
- presentación cuando sea material;
- lote;
- vencimiento;
- condición;
- propietario o estado de control cuando sea una dimensión material.

Se fija:

```text
DIFFERENT INVENTORY DIMENSIONS
→
DIFFERENT LOGICAL CONTENT MEMBERSHIP
```

---

#### 20. Contenido mixto

Un LPN puede contener más de un producto o más de una clase primaria elegible únicamente cuando las reglas de compatibilidad, capacidad, seguridad, condición y proceso aplicables lo permitan.

`MIXED` no es purpose type ni lifecycle state.

Se fija:

```text
MULTIPLE CONTENT LINES
!=
MIXED LPN TYPE
```

La tarea no define todavía algoritmos de compatibilidad física; preserva su gate propietario.

---

#### 21. Fuente de verdad de contenido

La fuente autoritativa de contenido deberá poder reconciliarse con la fuente canónica de movimientos o efectos físicos de inventario.

Una proyección de contenido puede existir para lectura eficiente, pero no puede producir saldo independiente.

Se fija:

```text
CONTENT PROJECTION
!=
SECOND INVENTORY LEDGER
```

Toda divergencia entre membresía LPN y movimientos deberá clasificarse como inconsistencia a reconciliar, no como dos verdades válidas.

---

#### 22. Regla de una sola contabilización

Para una misma cantidad o identidad física, el control autoritativo no puede representarla simultáneamente como:

- stock suelto disponible;
- contenido de uno o más LPN;
- otra identidad independiente creada por el empaque.

Para cantidades:

```text
TOTAL_BEFORE
=
LOOSE_BEFORE + SUM(LPN_CONTENT_BEFORE)
```

Un `PACK` puro conserva:

```text
TOTAL_AFTER = TOTAL_BEFORE
LOOSE_AFTER = LOOSE_BEFORE - Q
TARGET_LPN_AFTER = TARGET_LPN_BEFORE + Q
```

Un `UNPACK` puro conserva:

```text
TOTAL_AFTER = TOTAL_BEFORE
SOURCE_LPN_AFTER = SOURCE_LPN_BEFORE - Q
DESTINATION_LOOSE_AFTER = DESTINATION_LOOSE_BEFORE + Q
```

Producción, consumo, merma o ajuste son hechos distintos y no pueden ocultarse dentro de `PACK` o `UNPACK`.

---

#### 23. Unicidad para identidades serializadas

Para una identidad física individual se fija:

```text
AUTHORITATIVE_LPN_MEMBERSHIP_COUNT <= 1
```

Empacar una identidad ya contenida en otro LPN debe rechazarse o resolverse mediante la transferencia propietaria de `NEXO-DOM-005`; nunca se duplica la membresía.

---

#### 24. Contrato de `PACK`

`PACK` incorpora una cantidad o identidad elegible a la membresía autoritativa de un LPN.

La operación debe ser una única intención de negocio y debe poder demostrar:

```text
VALID SOURCE
+
VALID TARGET LPN
+
VALID CONTENT
+
SERVER AUTHORIZATION
+
ATOMIC INVENTORY RECONCILIATION
+
IDEMPOTENCY
→
PACK ACCEPTED
```

No es un simple `INSERT` de una fila de contenido.

---

#### 25. Precondiciones de `PACK`

Antes de aceptar un empaque real deben verificarse como mínimo:

1. LPN existente;
2. lifecycle `ACTIVE`;
3. revisión de lifecycle vigente cuando sea material;
4. revisión de contenido esperada vigente;
5. actor y autorización válidos;
6. purpose type vigente;
7. sujeto de contenido elegible;
8. clase primaria conocida;
9. cantidad positiva o identidad exacta;
10. existencia de origen suficiente;
11. dimensiones de origen completas;
12. ausencia de membresía incompatible o duplicada;
13. condición apta según política;
14. compatibilidad y capacidad cuando apliquen;
15. correlación;
16. idempotencia;
17. posibilidad de persistir el efecto de inventario y la membresía de forma atómica o con compensación contractualmente equivalente.

---

#### 26. Empaque de cantidad

Empacar una cantidad `Q`:

- exige `Q > 0`;
- exige saldo suficiente en la dimensión exacta de origen;
- reduce el saldo suelto autoritativo en `Q`;
- incrementa la membresía del LPN en `Q` para la misma dimensión;
- conserva la unidad canónica;
- conserva lote, vencimiento y condición cuando apliquen;
- conserva trazabilidad a la fuente;
- no cambia el lifecycle;
- no cambia el purpose type;
- no transfiere custodia por inferencia.

---

#### 27. Empaque de identidad serializada

Empacar una identidad serializada:

- exige que la identidad exista y sea elegible;
- exige que no pertenezca autoritativamente a otro LPN;
- mueve la relación de control hacia el LPN sin crear copia;
- conserva serial e identidad física;
- conserva condición;
- no transforma la identidad en cantidad;
- no crea ni destruye un activo, repuesto o elemento físico.

---

#### 28. Empaque de kit

Empacar un `KIT_INSTANCE` exige una instancia materializada válida.

La membresía del kit no duplica la valoración ni las existencias de sus componentes.

Esta tarea no decide constitución, sustitución, completitud o desarme del kit; únicamente conserva la identidad de la instancia recibida del contrato propietario.

---

#### 29. Empaque de reutilizables y repuestos

`REUSABLE_QUANTITY` se empaca por la granularidad de cantidad aprobada y conserva condición y obligación de retorno cuando correspondan.

`SPARE_PART` se empaca por cantidad o identidad serializada según su política vigente.

El empaque no convierte un reutilizable en activo serializado ni un repuesto en componente instalado.

---

#### 30. Empaque y lifecycle

Se fija:

```text
PACK
!=
ACTIVATE
```

```text
PACK
!=
CLOSE
```

```text
PACK
!=
VOID
```

Una operación de contenido nunca cambia el lifecycle por inferencia.

---

#### 31. Contrato de `UNPACK`

`UNPACK` retira de forma autoritativa una cantidad o identidad de un LPN hacia un destino de inventario declarado y reconciliable.

La operación debe demostrar:

```text
VALID SOURCE LPN MEMBERSHIP
+
VALID DESTINATION CONTEXT
+
SERVER AUTHORIZATION
+
ATOMIC INVENTORY RECONCILIATION
+
IDEMPOTENCY
→
UNPACK ACCEPTED
```

No equivale a borrar una fila.

---

#### 32. Precondiciones de `UNPACK`

Antes de aceptar un desempaque ordinario deben verificarse:

1. LPN existente y `ACTIVE`;
2. revisión vigente;
3. membresía autoritativa existente;
4. cantidad suficiente o identidad exacta;
5. destino permitido;
6. actor autorizado;
7. compatibilidad de destino cuando aplique;
8. conservación de dimensiones;
9. correlación;
10. idempotencia;
11. persistencia atómica o compensable del cambio de control.

Un cliente no puede desempaquetar basándose solo en una proyección desactualizada.

---

#### 33. Desempaque parcial por cantidad

Para contenido fungible o equivalente puede desempaquetarse una porción `Q` siempre que:

```text
0 < Q <= PACKED_QUANTITY
```

La operación disminuye la membresía del LPN y aumenta la existencia del destino declarado por la misma cantidad y dimensiones compatibles.

Esta operación parcial no es la división entre dos LPN definida en `NEXO-DOM-005`.

---

#### 34. Desempaque completo

Un desempaque completo deja en cero la cantidad autoritativa de una línea por cantidad o elimina la membresía activa de una identidad, conservando toda su historia.

Se fija:

```text
ACTIVE MEMBERSHIP REMOVED
!=
HISTORY DELETED
```

La proyección actual puede dejar de mostrar una línea con saldo cero, pero la auditoría debe permitir reconstruirla.

---

#### 35. Desempaque no cierra el LPN

Se fija:

```text
LPN EMPTY
!=
LPN CLOSED
```

Un LPN puede quedar sin contenido y continuar `ACTIVE` mientras el proceso propietario lo requiera.

Cerrar continúa siendo una transición explícita de `NEXO-DOM-003`.

---

#### 36. Cierre con contenido final

Esta tarea no impone que `CLOSED` signifique necesariamente cantidad histórica cero.

Antes del cierre, todo contenido debe quedar reconciliable mediante una de estas condiciones contractuales:

- fue desempaquetado o transferido por una operación válida;
- fue consumido, recibido, entregado o tratado por el proceso propietario correspondiente;
- permanece como manifestación final inmutable cuya interpretación está definida por el proceso propietario.

Después de `CLOSED` no existe membresía mutable ordinaria.

---

#### 37. `VOID` y contenido residual

Anular un LPN no borra ni pone en cero su contenido por sí solo.

Si existe contenido residual al momento de `VOID`, deberá existir una reconciliación o compensación explícita en el dominio propietario.

Se prohíbe:

```text
VOID LPN
→
DELETE CONTENT
```

```text
VOID LPN
→
AUTO RETURN STOCK
```

---

#### 38. Transferencia entre LPN no pertenece a `UNPACK` + `PACK` informal

Mover contenido de un LPN a otro no puede implementarse como dos operaciones independientes sin contrato común.

Se fija:

```text
LPN A
→ CONTENT →
LPN B
```

como responsabilidad de `NEXO-DOM-005`.

Esta tarea solo define empaque desde existencia no contenida y desempaque hacia un destino no contenido declarado. Un consumidor no puede simular una transferencia borrando de un LPN y agregando a otro sin atomicidad.

---

#### 39. División y unión permanecen reservadas

No se define aquí:

- dividir un LPN en dos LPN;
- unir contenidos de dos LPN;
- transferir una fracción directamente entre LPN;
- conservar lineage de origen y destino entre múltiples LPN.

Todo ello pertenece a `NEXO-DOM-005`.

---

#### 40. Revisión de contenido

Cada LPN con capacidad de mutación de contenido debe disponer conceptualmente de una revisión monotónica independiente de la revisión de lifecycle.

Se fija:

```text
CONTENT_REVISION_MONOTONIC = TRUE
```

Una operación de contenido aceptada cambia la revisión de contenido. No cambia por sí sola la revisión de lifecycle.

---

#### 41. Concurrencia

Antes de mutar membresía se compara:

```text
EXPECTED_CONTENT_REVISION
=
CURRENT_CONTENT_REVISION
```

Si dos actores empacan, desempaquetan o modifican la misma membresía concurrentemente, solo la operación que valide el estado esperado puede establecer el siguiente resultado.

La operación restante debe revalidar saldo, membresía, lifecycle, autorización y revisión antes de decidir.

---

#### 42. Concurrencia con lifecycle

Una operación de contenido también debe fallar cerrada cuando el lifecycle cambió de forma incompatible durante la operación.

Ejemplo:

```text
CLIENT SAW ACTIVE
SERVER IS NOW CLOSED
→
PACK/UNPACK REJECTED
```

La revisión de contenido no sustituye la revisión de lifecycle cuando ambas son materiales.

---

#### 43. Idempotencia

Toda mutación de contenido debe aceptar una identidad de operación suficiente para reconocer reintentos de la misma intención.

Un replay de la misma operación:

- no descuenta dos veces del origen;
- no incrementa dos veces la membresía;
- no desempaqueta dos veces;
- no incrementa dos veces la revisión;
- no crea dos movimientos;
- no duplica auditoría como dos decisiones independientes.

---

#### 44. Retry después de timeout

Ante timeout o respuesta perdida:

1. el cliente no asume fallo ni éxito por ausencia de respuesta;
2. consulta o reintenta mediante la misma identidad de idempotencia;
3. el servidor devuelve el resultado ya aceptado o decide una única vez;
4. la reconciliación verifica membresía y movimiento correlacionado.

Se prohíbe crear una segunda mutación para “compensar” un resultado desconocido sin resolver primero el estado autoritativo.

---

#### 45. Operación offline

Una intención offline de empaque o desempaque no es membresía canónica.

Se fija:

```text
OFFLINE PACK INTENT
!=
PACKED CONTENT
```

Al reconectar se debe:

1. recuperar lifecycle vigente;
2. recuperar revisión de contenido;
3. recuperar saldo o identidad vigente;
4. revalidar autorización;
5. revalidar compatibilidad y precondiciones;
6. aplicar idempotencia;
7. aceptar o rechazar la intención;
8. conservar evidencia de la decisión.

---

#### 46. Respuestas tardías

Una respuesta tardía nunca puede sobrescribir una proyección más reciente.

Si:

```text
CLIENT_CONTENT_REVISION < SERVER_CONTENT_REVISION
```

la autoridad permanece en el servidor.

La interfaz debe reconciliar antes de permitir una nueva mutación dependiente de esa vista.

---

#### 47. Unidades y conversiones

El LPN no crea una nueva semántica de medida.

Para contenido por cantidad:

- se conserva la unidad canónica de stock;
- cualquier presentación de captura debe usar factores aprobados;
- la conversión se aplica una sola vez;
- empaque y desempaque deben ser simétricos respecto de la cantidad canónica;
- no se redondea de forma que se cree o destruya cantidad fuera de tolerancia;
- la precisión y tolerancia pertenecen al contrato de unidades vigente.

---

#### 48. Lote y vencimiento

Cuando la existencia de origen está loteada o posee vencimiento material:

- el empaque conserva el lote exacto;
- conserva vencimiento aplicable;
- no fusiona lotes distintos;
- no reemplaza vencimiento real por default de producto;
- el desempaque conserva las mismas dimensiones salvo una transición de dominio explícita ajena a esta operación.

El LPN no se convierte en lote.

---

#### 49. Condición

La condición del contenido permanece separada del lifecycle LPN.

Se fija:

```text
LPN ACTIVE
!=
CONTENT GOOD
```

```text
LPN VOID
!=
CONTENT DAMAGED
```

Contenido con condiciones incompatibles no puede consolidarse silenciosamente en una misma membresía lógica.

---

#### 50. Compatibilidad y capacidad

Empaque y desempaque consumen las decisiones de compatibilidad y capacidad aplicables, pero esta tarea no define su algoritmo final.

Hasta que dichas reglas estén materializadas, una implementación no puede asumir:

- mezcla segura;
- capacidad infinita;
- peso irrelevante;
- volumen irrelevante;
- compatibilidad térmica;
- compatibilidad sanitaria;
- compatibilidad química;
- compatibilidad por condición.

Los contratos avanzados de capacidad y contenedores permanecen en sus owners posteriores.

---

#### 51. Ubicación

La membresía LPN no duplica una ubicación independiente para el contenido cuando la ubicación debe derivarse del LPN.

Se fija:

```text
PACKED CONTENT LOCATION
→
RESOLVED THROUGH CANONICAL LPN LOCATION MODEL
```

La relación exacta sede → LOC → LPN → contenido pertenece a `NEXO-DOM-007`.

Hasta entonces, esta tarea exige únicamente que el origen y destino sean reconciliables y no generen existencia simultáneamente suelta y contenida.

---

#### 52. Custodia

Empacar o desempaquetar no transfiere custodia por inferencia.

Se fija:

```text
PACK
!=
ACCEPT CUSTODY
```

```text
UNPACK
!=
RETURN CUSTODY
```

Custodia y responsable actual pertenecen a `NEXO-DOM-008`.

---

#### 53. Reserva y disponibilidad

Un plan de contenido no reserva stock.

Una membresía empacada tampoco debe considerarse libremente disponible por el solo hecho de existir.

Se fija:

```text
CONTENT PLAN
!=
RESERVATION
```

```text
PACKED
!=
AVAILABLE
```

Las políticas de reserva y disponibilidad conservan sus contratos propietarios.

---

#### 54. Remisiones y despacho

Un LPN `FULFILLMENT` puede contener inventario destinado a una remisión o despacho, pero:

```text
PACKED FOR FULFILLMENT
!=
DISPATCHED
```

```text
UNPACKED
!=
RECEIVED
```

Remisión, viaje, despacho, transporte, recepción y conciliación conservan estados independientes.

---

#### 55. `RECEIVING`

En un LPN con purpose type `RECEIVING`, contenido planificado o empacado puede representar existencia en proceso de recepción, pero el empaque no significa aceptación empresarial ni liberación a stock disponible.

La transición de recepción correspondiente debe permanecer explícita y correlacionable.

---

#### 56. `TRANSFER`

En un LPN `TRANSFER`, empacar contenido prepara o agrupa material para un traslado, pero:

```text
PACK INTO TRANSFER LPN
!=
TRANSFER COMMITTED
```

La salida, tránsito, llegada y conciliación pertenecen a sus procesos y a `NEXO-DOM-005` cuando exista transferencia de contenido entre LPN.

---

#### 57. `FULFILLMENT`

En `FULFILLMENT`, la membresía identifica qué contenido quedó agrupado para satisfacer un caso logístico.

No prueba por sí sola:

- reserva aprobada;
- carga en vehículo;
- salida de sede;
- entrega;
- recepción;
- cierre de remisión.

---

#### 58. `PRODUCTION_STAGING`

En `PRODUCTION_STAGING`, el plan puede expresar materiales previstos y la membresía autoritativa puede representar materiales físicamente agrupados para entrega a producción.

Se fija:

```text
PACKED FOR PRODUCTION
!=
PRODUCTION CONSUMED
```

FOGO conserva la ejecución productiva y el consumo real; NEXO conserva el estado físico y la trazabilidad de inventario.

---

#### 59. `RETURN`

En `RETURN`, empacar contenido representa agrupación física para retorno.

No significa automáticamente:

- devolución comercial aceptada;
- reversión económica;
- devolución a proveedor cerrada;
- recepción de retorno completada;
- restauración de disponibilidad.

Cada efecto permanece en su proceso propietario.

---

#### 60. `STORAGE`

En `STORAGE`, el contenido puede permanecer agrupado mientras el LPN está activo.

El purpose type no elimina la necesidad de:

- ubicación válida;
- condición conocida;
- compatibilidad;
- conteo reconciliable;
- autorización;
- disponibilidad explícita cuando corresponda.

---

#### 61. Material de empaque y empaque logístico

Una caja, bolsa, película, etiqueta u otro material usado físicamente durante el empaque no se convierte automáticamente en LPN ni en contenido por ser utilizado en la operación.

Si ese material es inventariable:

- conserva su clase primaria;
- su consumo, asignación o inclusión física debe registrar el hecho correspondiente;
- el valor del material no se fusiona con el contenido por inferencia.

La forma física permanente o retornable pertenece al contrato de contenedor cuando corresponda.

---

#### 62. Auditoría mínima de `PACK` y `UNPACK`

Toda operación aceptada debe poder atribuirse, como mínimo, a:

- `lpn_id`;
- lifecycle vigente;
- revisión de lifecycle cuando aplique;
- revisión de contenido anterior y resultante;
- forma de contenido;
- identidad o dimensiones de la existencia;
- cantidad y unidad cuando apliquen;
- origen;
- destino;
- actor efectivo;
- contexto de autorización;
- sede o ámbito aplicable;
- instante de servidor;
- correlación;
- idempotencia;
- comando de dominio;
- referencias al movimiento o efecto físico correlacionado;
- resultado aceptado o rechazado.

Los nombres físicos de campos no quedan impuestos por esta definición documental.

---

#### 63. Observabilidad

La implementación futura deberá distinguir, al menos:

- plan creado o modificado;
- empaque aceptado;
- empaque rechazado;
- desempaque aceptado;
- desempaque rechazado;
- replay idempotente;
- conflicto de revisión;
- saldo insuficiente;
- identidad ya contenida;
- lifecycle incompatible;
- autorización denegada;
- incompatibilidad física;
- intento offline pendiente;
- reconciliación posterior;
- divergencia entre membresía y movimiento.

Las métricas no sustituyen la evidencia transaccional.

---

#### 64. Seguridad y autoridad

Esta tarea define semántica de contenido, no permisos concretos.

Todo `PACK` o `UNPACK` real requiere autorización resuelta en servidor.

No son autoridad:

- un botón visible;
- una etiqueta escaneada;
- un payload enviado por cliente;
- un `site_id` del formulario;
- un role name visual;
- una caché local;
- una intención offline.

Los permisos exactos permanecen en la familia `NEXO-AUTH` y contratos transversales.

---

#### 65. Privacidad y minimización

La membresía de contenido y su auditoría no duplican información personal innecesaria.

Cuando una referencia estable de actor, sesión, dispositivo, orden, remisión o proceso sea suficiente, no se incrusta el objeto completo.

No se almacenan secretos, tokens ni credenciales dentro del contenido LPN.

---

#### 66. Reconciliación AS-IS

La evidencia física vigente se clasifica como parcial:

- existe `inventory_lpns`;
- existe `inventory_lpn_items`;
- `inventory_lpn_items` representa producto, cantidad, unidad, lote y vencimiento;
- el modelo observado no representa de forma completa activos serializados, kits ni otras identidades previstas por el dominio;
- el endpoint LPN observado es de lectura parcial;
- existe un formulario de creación sin ciclo end-to-end certificado;
- no existe evidencia suficiente para declarar empaque y desempaque integrales;
- no existe evidencia suficiente para declarar atomicidad completa entre membresía y movimiento;
- la ausencia de LPN y contenidos observados en auditoría no convierte el esquema en implementación validada.

Esta tarea no corrige físicamente ninguna de esas brechas.

---

#### 67. Reglas de transición física futura

La materialización posterior deberá evitar:

- convertir filas legacy en contenido autoritativo sin evidencia;
- duplicar saldo durante backfill;
- perder lote, unidad o vencimiento existentes;
- inventar seriales;
- interpretar `container_type` como contenido;
- usar ausencia de fila como prueba de desempaque histórico;
- fusionar contenidos de dimensiones distintas;
- habilitar LPN anidados sin el contrato de `NEXO-DOM-006`;
- habilitar transferencias entre LPN como dos updates independientes;
- aceptar un contenido legacy sin clase primaria reconciliable.

Cualquier backfill físico deberá tener su package, evidencia, rollback y gate propietarios.

---

#### 68. Matriz de invariantes por forma

| Forma | Identidad | Cantidad | Fraccionable | Membresía simultánea | Dimensiones críticas |
| --- | --- | --- | --- | --- | --- |
| `QUANTITY_SLICE` | sujeto + dimensiones de existencia | obligatoria | según unidad/política | puede distribuirse entre saldos sin duplicarse | unidad, lote, vencimiento, condición, presentación cuando apliquen |
| `SERIALIZED_IDENTITY` | identidad física exacta | no arbitraria | no | máximo un LPN autoritativo | serial/identidad, condición, origen |
| `KIT_INSTANCE` | instancia de kit | identidad de instancia | no como simple cantidad | máximo una membresía autoritativa | instancia, versión/completitud según owner |

---

#### 69. Matriz de operaciones y efectos prohibidos

| Operación | Efecto permitido | Efecto prohibido por inferencia |
| --- | --- | --- |
| planificar | registrar intención no autoritativa | mover o reservar stock |
| `PACK` | transferir control físico hacia el LPN de forma reconciliada | crear stock, activar LPN, transferir custodia |
| `UNPACK` | transferir control físico desde el LPN a destino declarado | cerrar LPN, aceptar recepción, cancelar remisión |
| reintentar | recuperar una única decisión idempotente | repetir descuento o incremento |
| leer contenido | proyectar membresía e historia | convertirse en ledger alterno |

---

#### 70. Escenarios negativos obligatorios

El contrato debe impedir, como mínimo:

1. contenido autoritativo nuevo en `DRAFT`;
2. empaque en `CLOSED`;
3. empaque en `CANCELLED`;
4. empaque en `VOID`;
5. desempaque ordinario en estado terminal;
6. misma identidad serializada en dos LPN;
7. misma cantidad contabilizada como suelta y empacada;
8. retry que duplica empaque;
9. retry que duplica desempaque;
10. cantidad negativa o cero como mutación válida;
11. desempaque superior al contenido disponible;
12. pérdida de lote;
13. pérdida de vencimiento;
14. pérdida de condición;
15. conversión de unidad divergente;
16. fusión silenciosa de lotes distintos;
17. fusión silenciosa de condiciones distintas;
18. `PHYSICAL_CONTAINER` tratado como línea ordinaria de contenido;
19. LPN tratado como contenido LPN antes del contrato de anidamiento;
20. transferencia LPN a LPN implementada como delete + insert independiente;
21. etiqueta tratada como autoridad para mutar contenido;
22. intención offline tratada como empaque confirmado;
23. respuesta tardía sobrescribiendo revisión nueva;
24. `PACK` cerrando o activando lifecycle implícitamente;
25. `UNPACK` cerrando lifecycle implícitamente;
26. borrado de historia cuando la membresía actual llega a cero;
27. propósito `FULFILLMENT` interpretado como despacho ejecutado;
28. propósito `RECEIVING` interpretado como recepción aceptada;
29. propósito `PRODUCTION_STAGING` interpretado como consumo de producción;
30. plan de contenido interpretado como reserva.

---

#### 71. Responsabilidades

| Responsabilidad | Propietario contractual |
| --- | --- |
| identidad, purpose type | `NEXO-DOM-002` |
| lifecycle de LPN | `NEXO-DOM-003` |
| contenido, `PACK`, `UNPACK` | `NEXO-DOM-004` |
| división, unión y transferencia entre LPN | `NEXO-DOM-005` |
| LPN anidados y retornables | `NEXO-DOM-006` |
| sede, LOC, LPN y contenido | `NEXO-DOM-007` |
| custodia y responsable | `NEXO-DOM-008` |
| impresión y etiquetas | `NEXO-DOM-018` y servicios de impresión |
| contenedor físico y vínculos avanzados | `NEXO-DOM-019` a `NEXO-DOM-024` |
| autorización | familia `NEXO-AUTH` y autorización transversal |
| persistencia, RPC, RLS y migraciones | arquitectura e implementación física propietarias |

---

#### 72. Handoff hacia `NEXO-DOM-005`

Esta tarea entrega a `NEXO-DOM-005`:

```text
IMMUTABLE LPN IDENTITY
+
ACTIVE-ONLY AUTHORITATIVE CONTENT MUTATION
+
THREE CONTENT SHAPES
+
EXACT INVENTORY DIMENSIONS
+
SINGLE ACCOUNTING RULE
+
MONOTONIC CONTENT REVISION
+
IDEMPOTENT PACK/UNPACK
```

`NEXO-DOM-005` deberá definir división, unión y transferencia de contenido entre LPN preservando:

- cantidad total;
- identidades serializadas;
- dimensiones de existencia;
- lineage de origen y destino;
- revisiones;
- atomicidad;
- idempotencia;
- lifecycle independiente;
- ausencia de doble contabilización.

No podrá modelar una transferencia como un desempaque confirmado seguido de un empaque independiente sin una decisión atómica común.

---

#### 73. Handoffs posteriores

Se conserva explícitamente:

- `NEXO-DOM-006`: anidamiento de LPN y contenedores retornables;
- `NEXO-DOM-007`: ubicación sede → LOC → LPN → contenido;
- `NEXO-DOM-008`: custodia y responsable actual;
- `NEXO-DOM-018`: etiquetas e impresión;
- `NEXO-DOM-019`: separación de contenedor físico y LPN;
- `NEXO-DOM-020`: continuidad o cierre respecto del contenedor;
- `NEXO-DOM-021`: no doble contabilización;
- `NEXO-DOM-022`: movimiento atómico del LPN y su contenido;
- `NEXO-DOM-023`: trazabilidad interna;
- `NEXO-DOM-024`: capacidad y compatibilidad.

Esta tarea no desarrolla esos contratos.

---

#### 74. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: la cobertura vigente ya protege el ciclo integral de LPN, la fuente canónica de movimientos, la no doble contabilización, idempotencia, separación de identidades logísticas y físicas y comportamiento de contenido. Esta tarea especializa el contrato de dominio sin introducir una obligación de prueba independiente.

---

#### 75. Cobertura de prueba vigente reutilizada

La tarea reutiliza sin modificar:

- `TREQ-NEXO-004`, que exige un ciclo LPN auditable incluyendo contenido;
- `TREQ-NEXO-011`, que protege movimientos reconciliables, no doble contabilización, concurrencia e idempotencia;
- `TREQ-NEXO-016`, que separa LPN de remisión, viaje, contenedor, custodia y entrega;
- `TREQ-NEXO-046`, que separa identidad de contenedor físico e identidad LPN;
- `TREQ-NEXO-047`, que impide duplicación entre saldo, instancia, kit, contenedor y contenido LPN.

Estas referencias son trazabilidad de cobertura existente y no una modificación del registro.

---

#### 76. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La incorporación y build canónico corresponden al checkout local posterior. |
| LOCAL | NOT_EXECUTED | No se ejecutaron scripts sobre el checkout local del usuario durante la elaboración documental. |
| REMOTA | PASS | Se verificaron en `main` continuidad, owner, tarea anterior aprobada, handoff de lifecycle, topología, contrato de entrega, políticas documentales, registro NEXO vigente, brechas LPN y superficies físicas observables. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó empaque o desempaque real en operación. |
| FÍSICA | NOT_EXECUTED | No se modificaron LPN, contenido, stock, movimientos, Supabase, aplicaciones ni datos. |

---

#### 77. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

- [x] Se define contenido LPN como membresía logística y no como identidad nueva.
- [x] Se separa plan de contenido de membresía autoritativa.
- [x] `DRAFT` admite preparación sin efecto real.
- [x] `ACTIVE` es el único estado ordinario para `PACK` y `UNPACK`.
- [x] Se fijan `QUANTITY_SLICE`, `SERIALIZED_IDENTITY` y `KIT_INSTANCE`.
- [x] Se mapean las siete clases primarias a su tratamiento LPN.
- [x] `PHYSICAL_CONTAINER` no se trata como línea ordinaria de contenido.
- [x] LPN anidado permanece reservado a `NEXO-DOM-006`.
- [x] Se preservan producto, presentación, unidad, lote, vencimiento, condición e identidad cuando apliquen.
- [x] Se prohíbe consolidar dimensiones incompatibles.
- [x] Se permite contenido mixto únicamente bajo compatibilidad aplicable.
- [x] Se define una sola contabilización física.
- [x] Se define conservación exacta de cantidad en `PACK` y `UNPACK`.
- [x] Se impide membresía simultánea de una identidad serializada.
- [x] Se define `PACK` con precondiciones completas.
- [x] Se define `UNPACK` con precondiciones completas.
- [x] Se permite desempaque parcial por cantidad sin invadir transferencia LPN a LPN.
- [x] Vacío no equivale a cerrado.
- [x] Cierre no borra historia de contenido.
- [x] `VOID` no borra ni devuelve stock automáticamente.
- [x] Transferencia directa entre LPN queda reservada a `NEXO-DOM-005`.
- [x] Se define revisión monotónica de contenido.
- [x] Se define concurrencia contra revisión de contenido y lifecycle.
- [x] Se define idempotencia para empaque y desempaque.
- [x] Se define retry seguro.
- [x] Una intención offline no se presenta como membresía canónica.
- [x] Respuestas tardías no sobrescriben revisión nueva.
- [x] Se preservan unidades y conversiones.
- [x] Se preservan lote y vencimiento.
- [x] Se separa condición de lifecycle.
- [x] Se preservan gates de capacidad y compatibilidad.
- [x] Se mantienen separados ubicación, custodia, reserva, remisión y producción.
- [x] Se reconcilia el modelo AS-IS como parcial sin declararlo completo.
- [x] Se conserva la cobertura de pruebas vigente sin duplicarla.
- [x] No se modifica 04A.
- [x] No se autoriza ninguna materialización física.
- [x] El handoff a `NEXO-DOM-005` queda completo y no desarrolla la tarea siguiente.

---

#### 78. Límites

Esta tarea no:

- crea tablas, columnas, enums, constraints, índices o triggers;
- crea vistas, RPC, RLS, funciones o políticas;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- implementa `PACK` o `UNPACK`;
- crea Server Actions, Route Handlers o UI;
- define permisos concretos;
- define algoritmos finales de capacidad o compatibilidad;
- define división, unión o transferencia entre LPN;
- define anidamiento LPN;
- define ubicación detallada;
- define custodia;
- define lifecycle del contenedor físico;
- define impresión o hardware;
- ejecuta movimientos de inventario;
- crea o mueve stock;
- modifica remisiones;
- modifica FOGO, ORIGO, PULSO, PASS o NUMERA;
- modifica Supabase;
- modifica datos;
- ejecuta migraciones o backfills;
- despliega;
- crea una instancia física propia;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-DOM-005`.

---

#### 79. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-005 — Definir división, unión y transferencia de contenido`

### ✅ NEXO-DOM-005 — Definir división, unión y transferencia de contenido

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN
**Tarea siguiente:** NEXO-DOM-006 — Definir LPN anidados y contenedores retornables
**Tipo de tarea:** documental; definición canónica de división, unión y transferencia atómica de contenido entre LPN, con conservación de cantidad, identidad, dimensiones de existencia, lineage, revisiones, idempotencia, concurrencia y fronteras con lifecycle, ubicación, custodia y movimiento físico bajo topología DEFINE_ONCE
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo NEXO transforma la membresía autoritativa de contenido de un LPN
sin crear, destruir, duplicar ni perder existencia por efecto de dividir,
unir o transferir contenido.

La regla raíz queda:

```text
CONTENIDO AUTORITATIVO VÁLIDO
+
IDENTIDAD Y DIMENSIONES DE EXISTENCIA CONSERVADAS
+
UNA OPERACIÓN DE CONTENIDO ATÓMICA
+
REVISIONES ESPERADAS VIGENTES
+
IDEMPOTENCIA
+
LINEAGE COMPLETO
→
MISMA EXISTENCIA ECONÓMICA Y FÍSICA
CON UNA NUEVA DISTRIBUCIÓN LOGÍSTICA RECONCILIABLE
```

Estas operaciones modifican la distribución o representación logística del
contenido; no fabrican stock, no borran historia y no sustituyen movimientos,
ubicaciones, custodias, remisiones, ciclos de vida ni contenedores físicos.

---

#### 2. Resultado canónico

La tarea fija documentalmente tres operaciones conceptuales:

```text
SPLIT_CONTENT
MERGE_CONTENT
TRANSFER_CONTENT
```

Los nombres son semántica contractual y no obligan a crear enums, RPC, rutas,
funciones o métodos físicos con esos identificadores.

El resultado cubre:

1. división de una porción controlada por cantidad;
2. unión de porciones compatibles;
3. transferencia directa entre dos LPN distintos;
4. comportamiento de identidad serializada e instancia de kit;
5. conservación exacta de cantidades y dimensiones;
6. lineage de origen y destino;
7. atomicidad de la decisión;
8. revisiones de contenido y lifecycle;
9. idempotencia y concurrencia;
10. fallos, retries y operación offline;
11. prohibición de doble contabilización;
12. fronteras con las tareas posteriores del mini-bloque.

---

#### 3. Handoff recibido de `NEXO-DOM-004`

Esta tarea consume sin redefinir:

```text
IMMUTABLE LPN IDENTITY
+
ONE CURRENT PURPOSE TYPE
+
ONE CURRENT LIFECYCLE STATE
+
THREE CONTENT SHAPES
+
EXACT INVENTORY DIMENSIONS
+
SINGLE ACCOUNTING RULE
+
MONOTONIC CONTENT REVISION
+
IDEMPOTENT PACK/UNPACK
```

También conserva la regla de que una transferencia entre LPN no puede
materializarse como un `UNPACK` ya confirmado seguido de un `PACK` independiente.
Ambos lados pertenecen a una sola decisión de negocio.

---

#### 4. Formas de contenido consumidas

Se reutilizan exactamente las tres formas aprobadas:

```text
QUANTITY_SLICE
SERIALIZED_IDENTITY
KIT_INSTANCE
```

No se crea una cuarta forma.

`PHYSICAL_CONTAINER` continúa fuera del contenido ordinario de LPN y su vínculo
permanece separado.

---

#### 5. Invariante global de conservación

Para toda operación aceptada se exige:

```text
AUTHORITATIVE CONTENT BEFORE
=
AUTHORITATIVE CONTENT AFTER
```

La igualdad se evalúa por identidad exacta o por conjunto completo de
dimensiones de existencia, según la forma de contenido.

En una operación de esta tarea:

```text
CREATED INVENTORY = 0
DESTROYED INVENTORY = 0
DUPLICATED INVENTORY = 0
LOST INVENTORY = 0
```

Cualquier consumo, merma, producción, ajuste, disposición o transformación que
cambie realmente la existencia pertenece a su contrato de movimiento o proceso
propietario y no puede ocultarse como división, unión o transferencia.

---

#### 6. Clave de equivalencia para contenido por cantidad

Dos `QUANTITY_SLICE` solo pueden considerarse equivalentes para unión cuando
coinciden todas las dimensiones que distinguen existencia bajo los contratos
vigentes.

Como mínimo, cuando apliquen:

- identidad maestra del producto o material;
- clase primaria de control;
- unidad canónica de stock;
- presentación cuando sea una dimensión material de existencia;
- lote;
- vencimiento;
- condición;
- estado de liberación;
- propietario o fuente de propiedad cuando diferencie existencia;
- demás dimensiones canónicas que el owner correspondiente declare
  discriminantes.

Se fija:

```text
UNKNOWN DIMENSION
!=
KNOWN DIMENSION
```

```text
NULL OR ABSENT
!=
ARBITRARY MATCH
```

Ante ambigüedad material, la unión falla cerrada.

---

#### 7. Precisión y unidad

Toda división, unión o transferencia por cantidad opera sobre la unidad
canónica de stock y su precisión aprobada.

Reglas:

- cantidad finita;
- cantidad positiva para una porción transferida o creada por división;
- prohibido generar cantidades negativas;
- prohibido exceder la cantidad fuente;
- prohibido usar redondeo que altere el total conservado;
- las conversiones de presentación o unidad no pertenecen implícitamente a
  estas operaciones;
- si una conversión es necesaria, debe resolverse por su contrato propietario
  antes de comparar o consolidar las cantidades.

---

#### 8. `SPLIT_CONTENT`

`SPLIT_CONTENT` divide una `QUANTITY_SLICE` en dos o más porciones hijas sin
cambiar el LPN autoritativo por el solo hecho de dividir.

Forma conceptual:

```text
ONE QUANTITY_SLICE
→
TWO OR MORE QUANTITY_SLICE CHILDREN
```

con:

```text
SUM(CHILD QUANTITIES)
=
SOURCE QUANTITY
```

---

#### 9. Precondiciones de división

Una división ordinaria exige:

1. LPN existente;
2. lifecycle compatible con mutación autoritativa de contenido;
3. membresía fuente autoritativa vigente;
4. forma `QUANTITY_SLICE`;
5. revisión de contenido esperada vigente;
6. revisión de lifecycle vigente cuando sea material;
7. actor autorizado;
8. cantidades hijas válidas;
9. conservación de dimensiones;
10. correlación;
11. idempotencia;
12. ausencia de bloqueo superior aplicable.

El cliente no puede declarar por sí solo que una membresía es elegible.

---

#### 10. División conserva dimensiones

Todas las porciones producidas por una división conservan las mismas
dimensiones de existencia de la fuente.

Se prohíbe utilizar `SPLIT_CONTENT` para:

- cambiar lote;
- cambiar vencimiento;
- cambiar condición;
- cambiar unidad canónica;
- cambiar clase primaria;
- cambiar producto;
- cambiar owner económico;
- convertir cantidad fungible en identidad serializada;
- reclasificar contenido.

Un cambio real de una dimensión exige la transición propietaria correspondiente.

---

#### 11. División y lineage

Cada porción resultante conserva lineage hacia:

- membresía fuente;
- LPN fuente;
- operación de división;
- cantidad fuente anterior;
- cantidad hija;
- dimensiones heredadas;
- revisión anterior y resultante;
- actor;
- instante de servidor;
- correlación e idempotencia.

La implementación física podrá normalizar filas, pero no puede perder la
capacidad de reconstruir la procedencia.

---

#### 12. División no transfiere entre LPN por sí sola

Una división ordinaria ocurre dentro de la membresía del mismo LPN.

Si el objetivo empresarial es enviar una parte hacia otro LPN:

```text
PARTIAL TRANSFER
=
ONE TRANSFER_CONTENT OPERATION
```

No se permite confirmar primero una división independiente y dejar una porción
en estado intermedio para transferirla después como si ambas acciones fueran
una sola intención.

La partición necesaria puede ser parte interna de la misma decisión atómica de
transferencia.

---

#### 13. Formas no divisibles

`SERIALIZED_IDENTITY` no se divide.

`KIT_INSTANCE` no se divide como cantidad genérica.

Se fija:

```text
SPLIT(SERIALIZED_IDENTITY) = DENY
SPLIT(KIT_INSTANCE) = DENY
```

La descomposición de un kit pertenece al dominio de kit. La transformación de
una identidad serializada pertenece al owner de esa identidad y nunca se
modela como fraccionamiento de LPN.

---

#### 14. `MERGE_CONTENT`

`MERGE_CONTENT` une dos o más `QUANTITY_SLICE` compatibles dentro del mismo LPN
para obtener una representación normalizada sin perder origen ni cambiar la
existencia total.

Forma conceptual:

```text
TWO OR MORE COMPATIBLE QUANTITY_SLICE
→
ONE QUANTITY_SLICE
```

con:

```text
TARGET QUANTITY
=
SUM(SOURCE QUANTITIES)
```

---

#### 15. Precondiciones de unión

La unión exige:

1. un mismo LPN autoritativo;
2. lifecycle compatible con mutación de contenido;
3. al menos dos membresías fuente vigentes;
4. forma `QUANTITY_SLICE` en todas;
5. clave de equivalencia completa e idéntica;
6. revisiones vigentes;
7. actor autorizado;
8. suma representable sin pérdida de precisión;
9. correlación;
10. idempotencia;
11. ausencia de bloqueo de trazabilidad.

---

#### 16. Unión incompatible

Nunca se unen por simplificación filas que difieren materialmente en:

- producto;
- clase primaria;
- unidad canónica;
- lote;
- vencimiento;
- condición;
- liberación;
- presentación material;
- propiedad diferenciadora;
- otra dimensión canónica discriminante.

Se fija:

```text
DIFFERENT LOT
→
NO MERGE
```

```text
DIFFERENT CONDITION
→
NO MERGE
```

La comodidad visual no permite destruir trazabilidad.

---

#### 17. Unión conserva todos los orígenes

El resultado de una unión conserva lineage hacia todas las membresías fuente.

No basta con conservar únicamente la primera fila o el último identificador.

Debe poder reconstruirse:

```text
MERGED MEMBERSHIP
→
ALL SOURCE MEMBERSHIPS
→
ORIGINAL CONTENT HISTORY
```

---

#### 18. Identidades exactas no se fusionan

Dos `SERIALIZED_IDENTITY` pueden coexistir dentro de un LPN, pero no se
convierten en una sola identidad.

Dos `KIT_INSTANCE` pueden coexistir dentro de un LPN, pero no se convierten en
una sola instancia.

Por tanto:

```text
MERGE(SERIALIZED_IDENTITY) = DENY
MERGE(KIT_INSTANCE) = DENY
```

Una proyección UI puede agrupar visualmente elementos, pero la fuente
canónica mantiene identidades separadas.

---

#### 19. `TRANSFER_CONTENT`

`TRANSFER_CONTENT` mueve de forma autoritativa contenido seleccionado desde un
LPN fuente hacia un LPN destino distinto.

Se fija:

```text
SOURCE_LPN_ID
!=
TARGET_LPN_ID
```

Si ambos identificadores son iguales, no existe una transferencia entre LPN.
Una normalización interna deberá usar las reglas de división o unión según
corresponda.

---

#### 20. Transferencia es una sola decisión

La transferencia se modela como una única intención de negocio:

```text
VALID SOURCE MEMBERSHIP
+
VALID TARGET LPN
+
AUTHORIZED TRANSFER INTENT
+
ATOMIC SOURCE/TARGET UPDATE
→
TRANSFERRED CONTENT
```

Está prohibido modelarla como:

```text
COMMITTED UNPACK
+
LATER INDEPENDENT PACK
```

porque existiría una ventana en la que el contenido puede perderse, duplicarse
o quedar irreconciliable.

---

#### 21. Lifecycle de LPN fuente y destino

Para una transferencia ordinaria de contenido:

```text
SOURCE_LPN_STATE = ACTIVE
TARGET_LPN_STATE = ACTIVE
```

`DRAFT` conserva únicamente preparación conforme al contrato anterior y no
recibe membresía autoritativa mediante una transferencia real ordinaria.

`CLOSED`, `CANCELLED` y `VOID` bloquean nuevas transferencias operativas.

La transferencia no cambia automáticamente el lifecycle de ninguno de los dos
LPN.

---

#### 22. Transferencia no cierra el LPN fuente

Transferir todo el contenido de un LPN y dejarlo sin membresías no produce:

```text
AUTO CLOSE
```

El cierre conserva las precondiciones de `NEXO-DOM-003`.

Se fija:

```text
SOURCE BECOMES EMPTY
!=
SOURCE BECOMES CLOSED
```

---

#### 23. Transferencia no cambia purpose type

Mover contenido hacia o desde un LPN no modifica por inferencia:

- purpose type del origen;
- purpose type del destino.

Un cambio de purpose conserva su contrato versionado independiente.

---

#### 24. Transferencia parcial de `QUANTITY_SLICE`

Cuando se transfiere una parte de una porción:

```text
0 < TRANSFER QUANTITY <= SOURCE QUANTITY
```

La decisión atómica debe producir:

```text
SOURCE AFTER
=
SOURCE BEFORE - TRANSFER QUANTITY
```

```text
TARGET AFTER
=
TARGET BEFORE + TRANSFER QUANTITY
```

bajo exactamente las mismas dimensiones de existencia.

La suma consolidada entre origen y destino permanece constante.

---

#### 25. Transferencia total de `QUANTITY_SLICE`

Cuando la cantidad transferida equivale a toda la membresía fuente:

- la fuente deja de poseer esa cantidad autoritativa;
- el destino la recibe con las mismas dimensiones;
- la historia de la membresía fuente permanece;
- la representación física futura podrá retirar o cerrar la fila corriente,
  pero no borrar lineage;
- no se crea una nueva existencia económica.

---

#### 26. Consolidación en el destino

Una transferencia por cantidad puede consolidarse con una membresía existente
del LPN destino únicamente si satisface exactamente la clave de equivalencia de
esta tarea.

Si no es compatible:

```text
TARGET GETS SEPARATE MEMBERSHIP
```

No se fuerza una unión para reducir filas.

---

#### 27. Transferencia de `SERIALIZED_IDENTITY`

Una identidad serializada se mueve como una unidad indivisible.

La operación exige:

```text
SOURCE HAS IDENTITY = TRUE
TARGET HAS IDENTITY = FALSE
```

Después de la transferencia:

```text
SOURCE HAS IDENTITY = FALSE
TARGET HAS IDENTITY = TRUE
```

La identidad física exacta permanece igual.

Nunca se clona, fracciona ni renumera por estar en otro LPN.

---

#### 28. Transferencia de `KIT_INSTANCE`

Una instancia de kit se transfiere conservando su identidad de instancia.

La transferencia:

- no desarma el kit;
- no recrea sus componentes;
- no cambia su versión por inferencia;
- no altera su completitud por el solo traslado de membresía;
- no duplica valoración;
- conserva lineage entre LPN origen y destino.

La composición interna pertenece a las tareas propietarias de kit.

---

#### 29. Contenedor físico no es contenido transferible de esta tarea

`PHYSICAL_CONTAINER` no se trata como `SERIALIZED_IDENTITY` ordinaria de
contenido LPN para usar `TRANSFER_CONTENT`.

La relación entre contenedor físico y LPN permanece separada y pertenece a
`NEXO-DOM-019` a `NEXO-DOM-024` según corresponda.

---

#### 30. LPN anidado permanece fuera de esta tarea

Un LPN no se convierte en una línea ordinaria de contenido de otro LPN bajo
`TRANSFER_CONTENT`.

El anidamiento se reserva íntegramente a `NEXO-DOM-006`.

Esta tarea entrega invariantes de cantidad, identidad y lineage que el
anidamiento deberá respetar, pero no define relaciones padre-hijo entre LPN.

---

#### 31. Atomicidad de una transferencia

La actualización de origen y destino es indivisible desde la perspectiva de
negocio.

Se exige:

```text
SOURCE REMOVAL ACCEPTED
IFF
TARGET ADDITION ACCEPTED
```

Si cualquiera de los lados falla:

```text
COMMITTED BUSINESS TRANSFER = FALSE
```

No existe un estado canónico aceptado donde el origen ya perdió contenido y el
destino todavía no lo posee como resultado final de la misma transferencia.

---

#### 32. Transferencia multilínea

Una intención que declara varias membresías dentro de una misma transferencia
se acepta completa o se rechaza completa.

Se fija:

```text
MULTI-LINE TRANSFER
→
ALL OR NOTHING
```

No se permite presentar éxito parcial como transferencia completa.

Si el negocio desea ejecutar subconjuntos independientes, cada subconjunto debe
ser una intención explícita con su propia idempotencia y resultado.

---

#### 33. Revisiones de contenido

Toda mutación aceptada conserva revisiones monotónicas.

Para una división o unión dentro del mismo LPN:

```text
EXPECTED_CONTENT_REVISION
=
CURRENT_CONTENT_REVISION
```

antes de aceptar la operación.

La operación incrementa la revisión de contenido una sola vez como decisión
lógica, aun cuando su implementación requiera varias filas.

---

#### 34. Revisiones en transferencia

`TRANSFER_CONTENT` valida simultáneamente las revisiones esperadas del LPN
fuente y del LPN destino.

Se requiere:

```text
EXPECTED_SOURCE_CONTENT_REVISION
=
CURRENT_SOURCE_CONTENT_REVISION
```

```text
EXPECTED_TARGET_CONTENT_REVISION
=
CURRENT_TARGET_CONTENT_REVISION
```

La aceptación actualiza ambas de forma correlacionada.

No existe last-write-wins silencioso.

---

#### 35. Revalidación de lifecycle

La revisión de contenido no sustituye la revisión de lifecycle.

Antes de confirmar una transferencia se debe comprobar que ambos LPN continúan
en estado permitido.

Ejemplo:

```text
CLIENT SAW TARGET ACTIVE
TARGET IS NOW CLOSED
→
TRANSFER REJECTED
```

Una vista antigua no revive un LPN terminal.

---

#### 36. Idempotencia

Cada intención mutable debe poseer identidad de idempotencia suficiente.

Un retry de la misma intención:

- no resta dos veces del origen;
- no suma dos veces al destino;
- no genera dos splits;
- no genera dos merges;
- no duplica lineage;
- no incrementa revisiones dos veces;
- no duplica efectos dependientes.

El mismo identificador de operación debe recuperar o reproducir el resultado ya
aceptado.

---

#### 37. Concurrencia

Dos operaciones concurrentes sobre una misma membresía o LPN no pueden
sobrescribirse silenciosamente.

Casos a proteger incluyen:

- dos transferencias de la misma cantidad;
- split simultáneo con transfer;
- merge simultáneo con unpack;
- cierre de LPN concurrente con transfer;
- anulación concurrente con transfer;
- cambio de condición concurrente con merge;
- dos destinos intentando tomar la misma identidad serializada.

Solo la operación que satisfaga las revisiones vigentes puede avanzar; las
otras revalidan o fallan sin efecto.

---

#### 38. Identidad serializada única

Para `SERIALIZED_IDENTITY` se mantiene:

```text
AUTHORITATIVE_LPN_MEMBERSHIP_COUNT <= 1
```

Una identidad nunca puede terminar autoritativamente en origen y destino al
mismo tiempo por una transferencia.

La misma regla conceptual aplica a `KIT_INSTANCE`.

---

#### 39. No doble contabilización

Las operaciones de esta tarea respetan la regla de fuente única de existencia.

Se prohíbe que una cantidad o identidad quede simultáneamente:

- como stock suelto y como contenido LPN por la misma existencia;
- en dos LPN como miembro autoritativo completo;
- duplicada por una fila de lineage;
- duplicada por una proyección;
- duplicada por retry;
- duplicada por estado offline.

La transformación de membresía debe correlacionarse con el control de
inventario necesario para que representación y saldo permanezcan conciliables.

---

#### 40. Reserva y obligaciones existentes

Una transferencia de contenido no puede borrar ni reescribir por inferencia una
reserva, asignación, obligación de retorno, orden, remisión o compromiso que
depende del contenido.

Si existe una relación de este tipo:

- el owner de la relación determina si puede mantenerse, migrarse, re-vincularse
  o debe bloquear la transferencia;
- cualquier cambio requerido debe ocurrir dentro de una decisión compatible y
  auditable;
- ante ausencia de una regla aplicable, la transferencia falla cerrada.

Esta tarea no inventa estados de reserva o remisión.

---

#### 41. Custodia

Transferir membresía entre LPN no equivale a aceptar una transferencia de
custodia.

Se fija:

```text
TRANSFER_CONTENT
!=
TRANSFER_CUSTODY
```

La custodia y el responsable actual pertenecen a `NEXO-DOM-008` y sus contratos
de autorización.

Si una operación concreta requiere cambio de custodia, ambas decisiones deben
quedar correlacionadas sin que una se infiera de la otra.

---

#### 42. Ubicación

Cambiar la membresía de LPN no autoriza a teletransportar inventario entre
ubicaciones físicas.

Si origen y destino pertenecen a contextos físicos distintos, la operación debe
satisfacer el contrato de movimiento aplicable antes de considerarse efectiva.

La relación sede → LOC → LPN → contenido pertenece a `NEXO-DOM-007`.

---

#### 43. Transferir contenido no es mover un LPN

Se separan dos operaciones:

```text
TRANSFER_CONTENT
!=
MOVE_LPN
```

`TRANSFER_CONTENT` cambia qué LPN posee una membresía seleccionada.

Mover físicamente un LPN completo y preservar atómicamente todo su contenido
pertenece a `NEXO-DOM-022`.

Esta tarea no redefine esa operación.

---

#### 44. Trazabilidad interna

Toda división, unión o transferencia conserva las dimensiones de trazabilidad
que ya existan sobre el contenido.

No puede perder por efecto de estas operaciones:

- lote;
- serial;
- vencimiento;
- condición;
- origen;
- liberación;
- unidad;
- presentación material;
- identidad de kit;
- demás dimensiones exigidas por el owner.

La especificación integral de trazabilidad interna permanece en
`NEXO-DOM-023`.

---

#### 45. Capacidad y compatibilidad

Esta tarea no define peso, volumen, capacidad máxima ni reglas materiales de
compatibilidad.

Sin embargo, una transferencia hacia un LPN destino no puede ignorar una regla
aplicable de capacidad o compatibilidad.

Si la implementación no puede demostrar elegibilidad del destino:

```text
TRANSFER = DENY
```

El contrato propietario permanece en `NEXO-DOM-024`.

---

#### 46. Operación offline

Una intención capturada offline no equivale a una transferencia canónica.

Se fija:

```text
OFFLINE TRANSFER INTENT
!=
COMMITTED TRANSFER_CONTENT
```

Al reconectar se debe:

1. recuperar lifecycle vigente de ambos LPN;
2. recuperar revisiones de contenido vigentes;
3. recuperar membresías fuente actuales;
4. revalidar autorización;
5. revalidar restricciones aplicables;
6. aplicar idempotencia;
7. aceptar o rechazar la intención completa;
8. conservar evidencia del resultado.

---

#### 47. Timeout y respuesta perdida

Ante timeout, el cliente no puede inferir que la transferencia falló y emitir
otra intención equivalente con un nuevo identificador.

Debe consultar o reintentar con la misma identidad de idempotencia hasta poder
resolver:

```text
ACCEPTED
OR
REJECTED
OR
UNKNOWN REQUIRING RECONCILIATION
```

Un resultado desconocido no autoriza duplicar el contenido.

---

#### 48. Fallo técnico

Cuando no se puede demostrar identidad, revisión, autorización, cantidad,
compatibilidad o integridad:

- no se confirma la operación;
- no se presenta el origen como reducido;
- no se presenta el destino como incrementado;
- no se avanza lifecycle;
- no se genera un éxito parcial;
- no se borra evidencia diagnóstica;
- no se exponen secretos.

La operación falla cerrada.

---

#### 49. Compensación

La mutación nuclear de membresía fuente/destino de una transferencia debe ser
atómica y no se diseña como una saga de dos commits independientes.

Si existen efectos externos adicionales que no pueden compartir la misma
transacción técnica, cada owner conserva su política de confirmación,
reconciliación o compensación.

Una compensación externa no autoriza una ventana permanente de doble
contabilización dentro del ledger de contenido LPN.

---

#### 50. Auditoría mínima

Cada operación aceptada o rechazada deberá poder atribuirse, según aplique, a:

- identificador de operación;
- tipo de operación;
- LPN fuente;
- LPN destino cuando exista;
- membresías fuente;
- membresías resultantes;
- cantidad o identidad exacta;
- dimensiones materiales;
- revisiones antes y después;
- actor efectivo;
- contexto de autorización;
- instante de servidor;
- correlación;
- idempotencia;
- razón de rechazo o excepción;
- referencias de proceso o movimiento cuando sean materiales.

No se almacenan credenciales ni secretos como evidencia operativa.

---

#### 51. Lineage de transferencia

Toda transferencia aceptada debe permitir responder:

```text
WHAT MOVED?
FROM WHICH LPN?
TO WHICH LPN?
HOW MUCH OR WHICH EXACT IDENTITY?
FROM WHICH MEMBERSHIP?
IN WHICH OPERATION?
UNDER WHICH REVISIONS?
BY WHICH AUTHORIZED ACTOR?
```

Para transferencias parciales, la porción destino conserva enlace con la
membresía fuente original y con la operación que la particionó.

---

#### 52. Matriz por forma de contenido

| Forma | Dividir | Unir | Transferir entre LPN | Invariante principal |
| --- | --- | --- | --- | --- |
| `QUANTITY_SLICE` | sí, según precisión y política | sí, solo con dimensiones equivalentes | sí, parcial o total | conservar suma exacta y dimensiones |
| `SERIALIZED_IDENTITY` | no | no | sí, identidad completa | máximo una membresía autoritativa |
| `KIT_INSTANCE` | no como cantidad | no como identidad | sí, instancia completa | preservar instancia y composición propietaria |

La matriz no convierte `PHYSICAL_CONTAINER` ni otro LPN en una cuarta forma.

---

#### 53. Matriz de operaciones prohibidas

| Caso | Resultado |
| --- | --- |
| dividir una identidad serializada | DENY |
| unir dos seriales como una identidad | DENY |
| dividir una instancia de kit como cantidad genérica | DENY |
| unir lotes distintos | DENY |
| unir condiciones distintas | DENY |
| transferir hacia el mismo LPN | DENY como transferencia |
| transferir desde LPN no `ACTIVE` | DENY ordinario |
| transferir hacia LPN no `ACTIVE` | DENY ordinario |
| transferir más cantidad que la fuente | DENY |
| transferir cantidad cero o negativa | DENY |
| confirmar origen y destino en commits de negocio independientes | DENY |
| aceptar una revisión obsoleta | DENY |
| transferir una identidad ya autoritativa en otro LPN | DENY |
| usar un LPN como contenido ordinario de otro | fuera de alcance; `NEXO-DOM-006` |
| mover físicamente un LPN completo mediante `TRANSFER_CONTENT` | fuera de alcance; `NEXO-DOM-022` |
| ignorar capacidad o compatibilidad desconocida | DENY |

---

#### 54. Matriz de conservación por operación

| Dimensión | `SPLIT_CONTENT` | `MERGE_CONTENT` | `TRANSFER_CONTENT` |
| --- | --- | --- | --- |
| cantidad total | conserva | conserva | conserva entre origen y destino |
| identidad serializada | no aplica | no aplica | conserva exactamente |
| identidad de kit | no aplica | no aplica | conserva exactamente |
| producto o sujeto | conserva | exige igualdad | conserva |
| unidad canónica | conserva | exige igualdad | conserva |
| lote | conserva | exige igualdad | conserva |
| vencimiento | conserva | exige igualdad | conserva |
| condición | conserva | exige igualdad | conserva |
| purpose type del LPN | no cambia | no cambia | no cambia por inferencia |
| lifecycle del LPN | no cambia | no cambia | no cambia por inferencia |
| lineage | amplía | agrega todos los orígenes | agrega origen y destino |
| revisión de contenido | monotónica | monotónica | monotónica en ambos LPN |

---

#### 55. Casos de aceptación por cantidad

Se consideran válidos conceptualmente, sujetos a autorización y contratos
posteriores:

1. dividir 10 unidades compatibles en 4 y 6 dentro del mismo LPN;
2. unir 4 y 6 de la misma existencia dimensional en 10;
3. transferir 3 de 10 desde LPN A a LPN B;
4. transferir 10 de 10 desde LPN A a LPN B;
5. consolidar en B la cantidad transferida con una membresía exactamente
   compatible;
6. mantenerla separada cuando existe una dimensión material distinta;
7. reintentar cualquiera de las operaciones con la misma idempotencia sin
   duplicar efecto.

---

#### 56. Casos de identidad exacta

Para una identidad serializada o instancia de kit:

- origen debe poseerla autoritativamente;
- destino no debe poseerla;
- la transferencia es indivisible;
- el origen la pierde y el destino la adquiere dentro de la misma decisión;
- no se crea una identidad nueva;
- no se pierde historia previa;
- una proyección agrupada no sustituye la identidad exacta.

---

#### 57. Operaciones visuales y autoridad

Una UI puede mostrar controles de dividir, unir o transferir, pero:

```text
VISIBLE CONTROL
!=
AUTHORIZED OPERATION
```

La autoridad se resuelve server-side en el momento de la mutación.

Valores enviados por cliente sobre rol, estado, revisión, saldo o pertenencia se
tratan como intención o precondición declarada, nunca como fuente de verdad.

---

#### 58. Propiedad del movimiento físico

Esta tarea define transformación de membresía, no el catálogo integral de
movimientos físicos de inventario.

Cuando una transferencia de membresía implica desplazamiento físico real, debe
existir correlación con el movimiento propietario correspondiente.

No se acepta una membresía de destino que contradiga la ubicación física
canónica.

---

#### 59. Estado AS-IS reconciliado

La evidencia canónica vigente registra una implementación LPN parcial:

- existe `inventory_lpns`;
- existe `inventory_lpn_items` con cobertura limitada a producto, cantidad,
  unidad, lote y vencimiento;
- la representación actual no cubre por identidad todo el universo objetivo de
  activos, kits y contenedores;
- la superficie API inspeccionada de LPN es de lectura y no demuestra una
  mutación end-to-end de división, unión o transferencia;
- el ciclo completo de LPN continúa pendiente de materialización y evidencia
  física en sus owners posteriores.

Estas observaciones no prueban inexistencia absoluta de lógica fuera de las
fuentes inspeccionadas; sí impiden declarar esta capacidad como implementada o
certificada desde esta tarea documental.

---

#### 60. Reconciliación física futura

La futura implementación deberá demostrar, como mínimo:

- conservación exacta de cantidad;
- unicidad de identidades serializadas;
- unicidad de instancias de kit;
- atomicidad origen/destino;
- revisiones monotónicas;
- idempotencia de retries;
- ausencia de saldo duplicado;
- lineage completo;
- enforcement server-side;
- concurrencia fail-closed;
- paridad de lectura después de cada operación;
- conservación de trazabilidad de lote, vencimiento y condición;
- rechazo de lifecycle incompatible;
- rechazo de destino incompatible o no verificable.

La forma física concreta pertenece a las instancias y paquetes autorizados
posteriores.

---

#### 61. Responsabilidades

| Responsabilidad | Owner contractual |
| --- | --- |
| propósito e identidad LPN | `NEXO-DOM-002` |
| lifecycle LPN | `NEXO-DOM-003` |
| contenido, `PACK` y `UNPACK` | `NEXO-DOM-004` |
| split, merge y transferencia entre LPN | `NEXO-DOM-005` |
| LPN anidados y retornables | `NEXO-DOM-006` |
| sede, LOC, LPN y contenido | `NEXO-DOM-007` |
| custodia y responsable | `NEXO-DOM-008` |
| no doble contabilización formal | `NEXO-DOM-021` |
| movimiento atómico de un LPN completo | `NEXO-DOM-022` |
| trazabilidad interna | `NEXO-DOM-023` |
| capacidad y compatibilidad | `NEXO-DOM-024` |
| autorización de mutaciones | familia `NEXO-AUTH` y autorización transversal |
| persistencia, RPC, RLS y migraciones | arquitectura e implementación física propietarias |

---

#### 62. Handoff hacia `NEXO-DOM-006`

Esta tarea entrega a `NEXO-DOM-006`:

```text
THREE STABLE CONTENT SHAPES
+
EXACT QUANTITY CONSERVATION
+
EXACT IDENTITY CONSERVATION
+
ATOMIC CONTENT TRANSFER
+
SOURCE/TARGET LINEAGE
+
MONOTONIC REVISIONS
+
NO LPN-AS-ORDINARY-CONTENT
```

`NEXO-DOM-006` deberá definir anidamiento y contenedores retornables sin
convertir un LPN hijo en `QUANTITY_SLICE`, `SERIALIZED_IDENTITY` o
`KIT_INSTANCE`, y sin debilitar la regla de una única representación
autoritativa del contenido.

---

#### 63. Handoff hacia `NEXO-DOM-007`

La relación física de ubicación posterior deberá poder distinguir:

```text
CONTENT TRANSFER BETWEEN LPN
```

frente a:

```text
PHYSICAL MOVE BETWEEN SITE OR LOC
```

`NEXO-DOM-007` recibe membresías y lineage estables y define cómo sede, LOC, LPN
y contenido se correlacionan sin duplicar ubicación.

---

#### 64. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro canónico vigente ya protege explícitamente
atomicidad, idempotencia, concurrencia, no doble contabilización y conservación
de trazabilidad al mover, dividir, unir o desempaquetar contenido LPN. Esta
tarea especializa el contrato de dominio sin introducir una obligación de
prueba independiente.

---

#### 65. Cobertura de prueba vigente reutilizada

Sin modificar el registro canónico, se reutiliza:

- `TREQ-NEXO-004`, para el ciclo LPN ejecutable y auditable con contenido y sin
  doble contabilización;
- `TREQ-NEXO-011`, para movimientos y proyecciones reconciliables, atomicidad,
  idempotencia, concurrencia y separación entre existencia suelta y contenido
  LPN;
- `TREQ-NEXO-012`, para conservar lote, serial, vencimiento, condición y demás
  trazabilidad al empacar, mover, dividir, unir o desempacar;
- `TREQ-NEXO-016`, para mantener separados LPN, remisión, viaje, bulto,
  contenedor, custodia, entrega y recepción;
- `TREQ-NEXO-047`, para impedir duplicación de saldo, instancia, kit,
  contenedor, contenido LPN o valor.

Estas referencias son trazabilidad reutilizada y no representan cambios del
registro.

---

#### 66. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La incorporación al owner y el build canónico corresponden al checkout local posterior. |
| LOCAL | NOT_EXECUTED | No se ejecutaron scripts sobre el checkout local del usuario durante la elaboración documental. |
| REMOTA | PASS | Se verificaron main vigente, continuidad, topología, owner, handoff de la tarea anterior, registro NEXO, contrato de entrega, políticas documentales, package scripts y superficies LPN remotas relevantes. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron divisiones, uniones ni transferencias sobre inventario operativo. |
| FÍSICA | NOT_EXECUTED | No se modificaron LPN, contenido, datos, Supabase, código ni despliegues. |

---

#### 67. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

- [x] Se definen exactamente `SPLIT_CONTENT`, `MERGE_CONTENT` y `TRANSFER_CONTENT` como operaciones conceptuales.
- [x] Las tres formas de contenido de la tarea anterior permanecen sin cambios.
- [x] La división conserva exactamente la cantidad total.
- [x] La división conserva dimensiones de existencia.
- [x] La división no fracciona identidades serializadas ni instancias de kit.
- [x] La unión solo consolida `QUANTITY_SLICE` compatibles.
- [x] La unión conserva lineage de todos los orígenes.
- [x] La unión no fusiona seriales ni kits.
- [x] La transferencia exige LPN fuente y destino distintos.
- [x] Fuente y destino ordinarios deben estar `ACTIVE`.
- [x] La transferencia es una decisión atómica común.
- [x] Se prohíbe implementar transfer como `UNPACK` confirmado seguido de `PACK` independiente.
- [x] La transferencia parcial conserva la suma origen-destino.
- [x] La transferencia total conserva historia.
- [x] Las identidades exactas se mueven sin clonarse.
- [x] Una transferencia multilínea es all-or-nothing.
- [x] Se validan revisiones de contenido de ambos LPN.
- [x] Se revalida lifecycle antes del commit.
- [x] Se define idempotencia de retries.
- [x] Se define control de concurrencia.
- [x] Se prohíbe doble contabilización.
- [x] Reservas, custodias y remisiones no se reescriben por inferencia.
- [x] Transferir contenido no equivale a mover físicamente un LPN.
- [x] Un LPN no se trata como contenido ordinario de otro.
- [x] Se preserva trazabilidad interna.
- [x] Capacidad y compatibilidad permanecen en su owner.
- [x] Offline no confirma estado canónico antes de servidor.
- [x] Timeout no autoriza una segunda intención duplicada.
- [x] El estado AS-IS se presenta como parcial y no certificado.
- [x] Se preserva la cobertura de pruebas existente sin modificarla.
- [x] No se autoriza ningún cambio físico.
- [x] `NEXO-DOM-006` recibe un handoff explícito.

---

#### 68. Límites

Esta tarea no:

- crea tablas, columnas, enums, constraints, índices, triggers o vistas;
- crea RPC, Server Actions ni Route Handlers;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- migra contenido legacy;
- ejecuta backfills;
- cambia saldos;
- crea movimientos reales;
- cambia ubicaciones;
- transfiere custodia;
- cambia remisiones;
- cambia lifecycle de LPN;
- cambia purpose type;
- define LPN anidados;
- define el ciclo de contenedores retornables;
- define sede, LOC o posiciones;
- define capacidad, peso o volumen;
- define la operación física de mover un LPN completo;
- define el modelo completo de lote, serial, vencimiento y condición;
- crea permisos;
- modifica Supabase;
- modifica código;
- modifica datos;
- despliega;
- crea una instancia física propia;
- crea ni modifica requisitos de prueba;
- modifica el registro canónico de requisitos;
- desarrolla `NEXO-DOM-006`.

---

#### 69. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-005 — Definir división, unión y transferencia de contenido`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-006 — Definir LPN anidados y contenedores retornables`

### ✅ NEXO-DOM-006 — Definir LPN anidados y contenedores retornables

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-005 — Definir división, unión y transferencia de contenido
**Tarea siguiente:** NEXO-DOM-007 — Definir relación sede → LOC → LPN → contenido
**Tipo de tarea:** documental; definición canónica de jerarquía LPN, anidamiento, desanidamiento, reparentado, invariantes de grafo, retorno de contenedores identificados y fronteras con contenido, ubicación, custodia, movimiento y contenedores físicos bajo topología DEFINE_ONCE
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo NEXO representa una agrupación logística compuesta por otros LPN sin convertir un LPN hijo en contenido ordinario, y cómo participa un contenedor físico retornable sin fusionar su identidad con la del LPN.

La regla raíz queda:

```text
LPN IDENTITY
+
ACYCLIC LPN HIERARCHY
+
ONE ACTIVE PARENT AT MOST
+
EXACT CONTENT OWNERSHIP
+
SEPARATE PHYSICAL CONTAINER IDENTITY
+
RETURN OBLIGATION WITHOUT IDENTITY CONFLATION
→
NESTED LOGISTICS WITH TRACEABLE RETURN
```

El anidamiento organiza identidades logísticas. No crea existencia adicional, no duplica contenido y no sustituye ubicación, custodia, movimiento, remisión, contenedor físico ni lifecycle.

---

#### 2. Resultado canónico

La tarea fija documentalmente:

1. la relación estructural LPN padre → LPN hijo;
2. el modelo de jerarquía como bosque dirigido y acíclico;
3. la cardinalidad de padre e hijos;
4. las operaciones `NEST_LPN`, `UNNEST_LPN` y `REPARENT_LPN`;
5. la separación entre plan de anidamiento y relación autoritativa;
6. precondiciones de anidamiento;
7. conservación de identidad, contenido y revisiones;
8. prohibición de ciclos y multiparentalidad;
9. proyección agregada de contenido sin doble contabilización;
10. interacción con lifecycle;
11. idempotencia, concurrencia y operación offline;
12. naturaleza de un contenedor físico retornable;
13. separación entre `PHYSICAL_CONTAINER`, `REUSABLE_QUANTITY` y LPN;
14. obligación de retorno sin confundirla con custodia;
15. fronteras con las tareas de ubicación, condición, contenedor físico, movimiento, trazabilidad y capacidad;
16. handoff exacto hacia `NEXO-DOM-007`.

No se materializan tablas, columnas, constraints, RPC, RLS, Server Actions, Route Handlers, UI, etiquetas, movimientos, relaciones físicas ni migraciones.

---

#### 3. Entradas canónicas preservadas

Esta tarea consume sin redefinir:

- las siete clases primarias de control aprobadas en `NEXO-DOM-001`;
- `PHYSICAL_CONTAINER` como objeto durable o retornable con identidad propia;
- `REUSABLE_QUANTITY` como cantidad de unidades equivalentes recuperables sin identidad individual obligatoria;
- la identidad LPN estable aprobada en `NEXO-DOM-002`;
- los seis purpose types de LPN;
- los estados `DRAFT`, `ACTIVE`, `CLOSED`, `CANCELLED` y `VOID`;
- `CREATED` y `RELABELED` como eventos y no estados;
- las tres formas de contenido: `QUANTITY_SLICE`, `SERIALIZED_IDENTITY` y `KIT_INSTANCE`;
- la separación entre plan de contenido y membresía autoritativa;
- `PACK` y `UNPACK` como operaciones sobre contenido de un LPN;
- `SPLIT_CONTENT`, `MERGE_CONTENT` y `TRANSFER_CONTENT`;
- conservación exacta de cantidad e identidad;
- lineage origen/destino;
- revisiones monotónicas;
- transferencia atómica de contenido;
- la regla de que un LPN no es contenido ordinario de otro LPN.

---

#### 4. Anidamiento no es membresía de contenido

Se fija:

```text
LPN CHILD RELATION
!=
CONTENT MEMBERSHIP
```

Un LPN hijo conserva su `lpn_id`, código, lifecycle, purpose type, revisión, contenido directo, historial y relaciones de trazabilidad.

Anidar un LPN no crea una membresía conceptual `SERIALIZED_IDENTITY`, `KIT_INSTANCE` ni `QUANTITY_SLICE` dentro del padre.

---

#### 5. Anidamiento no es contenedor físico

Se fija:

```text
PARENT LPN
!=
PHYSICAL CONTAINER
```

Un LPN padre es una identidad logística que organiza uno o más LPN hijos. Un contenedor físico es un objeto material con identidad y ciclo propios cuando pertenece a `PHYSICAL_CONTAINER`.

Que un LPN esté físicamente soportado por una canastilla, caja durable, carro, rack móvil u otro contenedor no convierte ese contenedor en nodo de la jerarquía LPN.

---

#### 6. Modelo estructural

La relación autoritativa de anidamiento forma un bosque dirigido:

```text
ROOT LPN
  ├─ CHILD LPN
  │    ├─ CHILD LPN
  │    └─ CHILD LPN
  └─ CHILD LPN
```

Cada componente conectado tiene exactamente una raíz y la estructura no admite ciclos.

---

#### 7. LPN raíz

Un LPN es raíz cuando no tiene un padre LPN autoritativo vigente.

```text
ACTIVE_PARENT_COUNT = 0
→
ROOT LPN
```

Ser raíz no significa estar en una LOC concreta, estar libre, estar disponible, poseer un contenedor físico, estar despachado o estar en tránsito.

---

#### 8. LPN hijo

Un LPN es hijo cuando posee exactamente una relación autoritativa vigente con un LPN padre.

```text
ACTIVE_PARENT_COUNT = 1
→
NESTED LPN
```

El hijo no pierde su identidad ni su contenido directo.

---

#### 9. Cardinalidad

Se fija:

```text
CHILD ACTIVE PARENT COUNT <= 1
```

Un LPN padre puede tener cero, uno o varios hijos directos.

La cardinalidad de hijos no implica capacidad física ilimitada. Capacidad, peso, volumen y compatibilidad pertenecen a `NEXO-DOM-024`.

---

#### 10. Prohibición de autorreferencia

No existe:

```text
PARENT_LPN_ID = CHILD_LPN_ID
```

Un LPN nunca puede anidarse dentro de sí mismo.

---

#### 11. Prohibición de ciclos

Antes de `NEST_LPN` o `REPARENT_LPN` debe demostrarse que el nuevo padre no es descendiente del hijo.

Se prohíbe:

```text
A → B → C → A
```

y cualquier ciclo de longitud mayor.

---

#### 12. Multiparentalidad prohibida

Un LPN hijo no puede pertenecer simultáneamente a dos padres autoritativos.

Cuando un hijo debe pasar de un padre a otro, la operación es `REPARENT_LPN` y se resuelve como una única decisión atómica.

---

#### 13. Profundidad

El contrato de dominio no impone un número fijo de niveles.

Se exige únicamente jerarquía finita en toda proyección materializada, ausencia de ciclos, capacidad de resolver ancestros y descendientes, capacidad de reconstruir lineage y cumplimiento de capacidad y compatibilidad cuando esos contratos apliquen.

Un límite técnico preventivo puede existir en una implementación concreta, pero no podrá alterar silenciosamente la semántica del dominio ni aceptar un árbol parcial como completo.

---

#### 14. Plan de anidamiento

En `DRAFT` puede prepararse un plan de composición logística.

El plan puede indicar padre previsto, hijos previstos, orden o agrupación operativa cuando sea material, contexto de preparación y correlación.

El plan no crea una relación autoritativa, no mueve contenido, no cambia ubicación, no cambia custodia, no cambia lifecycle, no produce disponibilidad y no prueba contención física.

---

#### 15. Relación autoritativa de anidamiento

La relación autoritativa existe únicamente después de una decisión aceptada por servidor.

Para operación ordinaria:

```text
PARENT STATE = ACTIVE
AND
CHILD STATE = ACTIVE
```

La relación debe ser explícita, versionada, auditable y reversible mediante una operación posterior válida.

---

#### 16. Operación `NEST_LPN`

`NEST_LPN` incorpora estructuralmente un LPN hijo a un LPN padre sin trasladar su contenido a la membresía directa del padre.

Resultado:

```text
CHILD ACTIVE PARENT
0 → 1
```

Se conservan ambas identidades y sus contenidos.

---

#### 17. Precondiciones de `NEST_LPN`

La operación exige como mínimo:

1. padre existente;
2. hijo existente;
3. padre distinto del hijo;
4. ambos en estado `ACTIVE`;
5. revisión esperada vigente de padre;
6. revisión esperada vigente de hijo;
7. hijo sin padre autoritativo vigente;
8. ausencia de ciclo;
9. autorización server-side;
10. compatibilidad y capacidad cuando el contrato aplicable lo exija;
11. coherencia de contexto territorial y ubicación cuando esté materializada;
12. ausencia de bloqueo por condición;
13. correlación;
14. idempotencia;
15. evidencia auditable.

Una precondición no materializada no se considera satisfecha por inferencia.

---

#### 18. Efectos de `NEST_LPN`

`NEST_LPN` cambia únicamente la relación estructural autorizada y sus revisiones relacionadas.

No produce por sí sola `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT`, `TRANSFER_CONTENT`, movimiento de inventario, cambio de LOC, cambio de sede, cambio de custodia, cambio de purpose type, cambio de lifecycle, creación de contenedor físico ni cierre de remisión.

---

#### 19. Operación `UNNEST_LPN`

`UNNEST_LPN` elimina la relación autoritativa vigente entre un hijo y su padre.

Resultado:

```text
CHILD ACTIVE PARENT
1 → 0
```

Conserva `lpn_id`, contenido directo del hijo, lifecycle, purpose type e historial de la relación retirada.

---

#### 20. Precondiciones de `UNNEST_LPN`

Como mínimo:

- relación padre-hijo vigente;
- ambos LPN identificables;
- revisiones vigentes;
- actor autorizado;
- ausencia de una operación incompatible concurrente;
- contexto físico coherente cuando aplique;
- correlación;
- idempotencia.

Desanidar no confirma que el hijo haya cambiado de LOC ni que haya sido entregado a otro custodio.

---

#### 21. Operación `REPARENT_LPN`

Cuando un hijo pasa de un padre a otro, la relación cambia atómicamente desde el padre fuente al padre destino.

La operación debe comprobar en una sola decisión relación fuente vigente, destino válido, ausencia de ciclo, revisiones de padre fuente, padre destino e hijo, autorización, compatibilidad aplicable e idempotencia.

No se modela como un `UNNEST_LPN` confirmado y un `NEST_LPN` independiente si eso permite un resultado parcial incompatible con la intención única.

---

#### 22. Identidad durante reparentado

`REPARENT_LPN` nunca crea otro LPN.

```text
LPN_ID BEFORE
=
LPN_ID AFTER
```

El contenido directo del hijo permanece asociado al mismo hijo y el lineage conserva padre anterior, padre nuevo, actor, instante, revisión y correlación.

---

#### 23. Revisión estructural

La jerarquía debe poseer una revisión suficiente para detectar decisiones concurrentes.

```text
EXPECTED NESTING REVISION
=
CURRENT NESTING REVISION
```

La forma física puede usar revisión del LPN, revisión de relación o un mecanismo equivalente, pero debe impedir overwrites silenciosos.

---

#### 24. Concurrencia

Si dos actores intentan simultáneamente anidar el mismo hijo en padres diferentes, desanidar y reparentar, cerrar un LPN y anidarlo, o anular un LPN y reparentarlo, solo una decisión compatible con las revisiones vigentes puede establecer el nuevo estado estructural.

La otra debe revalidar y fallar cerrada o reconstruir el resultado idempotente si representa la misma intención.

---

#### 25. Idempotencia

Una misma intención reintentada no crea dos relaciones activas, no incrementa dos veces la revisión, no duplica eventos, contenido, movimientos ni obligaciones de retorno.

La misma identidad de idempotencia resuelve al resultado de la primera aceptación.

---

#### 26. Operación offline

Una intención offline de anidamiento, desanidamiento o reparentado no es autoridad canónica.

```text
OFFLINE NESTING INTENT
!=
AUTHORITATIVE NESTING
```

Al reconectar deben revalidarse lifecycle, jerarquía vigente, revisiones, autorización, ubicación y compatibilidad cuando apliquen, idempotencia y ausencia de ciclo.

---

#### 27. Respuestas tardías

Una respuesta tardía no puede reconstruir una relación que ya dejó de ser vigente.

La autoridad permanece en la revisión de servidor. Una UI con un árbol antiguo debe refrescar antes de emitir otra mutación estructural.

---

#### 28. Lifecycle del padre

Un LPN padre con relaciones hijas autoritativas activas no puede cerrarse de forma ordinaria dejando descendientes operativos huérfanos.

Antes de `ACTIVE -> CLOSED` debe quedar sin hijos activos o existir una reconciliación atómica explícita que resuelva todas las relaciones afectadas bajo los contratos propietarios.

El cierre nunca borra el historial de anidamiento.

---

#### 29. Lifecycle del hijo

Un LPN hijo con padre autoritativo vigente no se cierra ordinariamente sin resolver primero la relación estructural.

Se prohíbe mantener como relación activa:

```text
ACTIVE PARENT
→
CLOSED CHILD
```

La relación histórica permanece consultable.

---

#### 30. Anulación

Una transición a `VOID` debe reconciliar toda relación activa de anidamiento.

Anular no elimina ancestros o descendientes de la historia, no traslada automáticamente contenido, no anula otros LPN, no cierra contenedores físicos, no borra obligaciones de retorno y no ejecuta compensaciones de inventario por inferencia.

---

#### 31. Contenido directo de un LPN anidado

Cada membresía autoritativa continúa perteneciendo a exactamente un LPN directo.

```text
DIRECT CONTENT OWNER COUNT = 1
```

Anidar el LPN hijo no reasigna sus membresías al padre.

---

#### 32. Proyección agregada del padre

Para lectura logística, un padre puede proyectar:

```text
DIRECT CONTENT OF PARENT
+
DESCENDANT CONTENT
```

pero la parte descendiente es una proyección derivada y no crea nuevas membresías autoritativas en el padre.

---

#### 33. No doble contabilización en jerarquía

Se prohíbe contabilizar simultáneamente una misma existencia como contenido directo del hijo, contenido directo del padre por agregación, stock suelto adicional o contenido de otro LPN.

La proyección agregada debe distinguir contenido directo, contenido descendiente y LPN propietario directo.

---

#### 34. Identidades serializadas

Una `SERIALIZED_IDENTITY` contenida en un LPN hijo sigue perteneciendo directamente al hijo, no crea otra membresía en el padre, mantiene máximo una membresía LPN autoritativa y conserva serial, condición y lineage.

---

#### 35. Cantidades

Un `QUANTITY_SLICE` dentro de un hijo conserva cantidad, unidad, producto o sujeto, presentación, lote, vencimiento, condición y demás dimensiones aplicables.

La agregación por ancestro puede sumar únicamente cantidades compatibles y debe conservar una forma de descomponer el total hasta el LPN propietario directo.

---

#### 36. Instancias de kit

Un `KIT_INSTANCE` anidado indirectamente por pertenecer a un LPN hijo conserva su identidad y completitud.

El padre no adquiere una segunda instancia del kit y el anidamiento LPN no sustituye el contrato de composición del kit.

---

#### 37. División, unión y transferencia

Las operaciones de `NEXO-DOM-005` continúan operando sobre contenido directo.

La jerarquía no autoriza dividir un LPN como si fuera `QUANTITY_SLICE`, fusionar dos LPN en una sola identidad, transferir el contenido de todos los descendientes por inferencia ni convertir un reparentado en transferencia de contenido.

Cuando una intención combine estructura y contenido, la materialización futura debe definir una transacción explícita que preserve ambos contratos.

---

#### 38. Movimiento físico de un LPN completo

Esta tarea no define la transacción que mueve físicamente un LPN. El contrato específico permanece en `NEXO-DOM-022`.

La jerarquía entrega esta invariante:

```text
MOVING A PARENT
MUST NOT LEAVE ITS ACTIVE DESCENDANT STRUCTURE
IN A CONTRADICTORY PHYSICAL STATE
```

La operación física exacta, sus movimientos y atomicidad pertenecen a ese owner posterior.

---

#### 39. Sede y LOC

Anidar no asigna sede ni LOC.

```text
NEST_LPN
!=
PUTAWAY
```

```text
UNNEST_LPN
!=
LOCATION TRANSFER
```

La coherencia sede → LOC → LPN → contenido pertenece a `NEXO-DOM-007`.

---

#### 40. Custodia

La jerarquía no determina custodio.

```text
PARENT LPN CUSTODY
!=
AUTOMATIC CHILD CUSTODY
```

Cualquier propagación o transferencia real de custodia requiere el contrato de `NEXO-DOM-008`.

---

#### 41. Lote, serial, vencimiento y condición

Anidar, desanidar o reparentar no elimina ni reescribe lote, serial, origen, vencimiento, condición, liberación ni trazabilidad interna.

Ese detalle permanece gobernado por `NEXO-DOM-023`.

---

#### 42. Capacidad y compatibilidad

El anidamiento deberá consumir, cuando esté materializado, las reglas de capacidad, peso, volumen, compatibilidad de contenido y restricciones físicas o sanitarias.

Su definición propietaria permanece en `NEXO-DOM-024`. Esta tarea no fija capacidades numéricas ni matrices de compatibilidad.

---

#### 43. Contenedor físico

Un contenedor físico individual controlado pertenece a la clase:

```text
PHYSICAL_CONTAINER
```

y conserva identidad propia.

Su función primaria es contener, proteger o transportar. Un ejemplo canónico es una canastilla durable identificada.

---

#### 44. `RETURNABLE` es rol, no clase

Se fija:

```text
PHYSICAL_CONTAINER
+
RETURNABLE
```

sin crear una octava clase primaria.

`RETURNABLE` describe una obligación o expectativa empresarial de retorno y no sustituye condición, disponibilidad, custodia, propiedad, ubicación ni lifecycle de LPN.

---

#### 45. Reutilizable por cantidad no es contenedor identificado

Una bandeja durable equivalente sin identidad individual permanece en:

```text
REUSABLE_QUANTITY
```

aunque deba retornar.

No se fabrican identidades `PHYSICAL_CONTAINER` individuales únicamente para registrar una devolución por cantidad.

---

#### 46. Contenedor identificado retornable

Un contenedor retornable individual debe conservar al menos conceptualmente identidad del contenedor, clasificación primaria, rol retornable, origen de la obligación, contexto de entrega o salida, contraparte o ámbito de devolución cuando aplique, condición de salida, referencia temporal, estado reconciliable de la obligación de retorno, evidencia de retorno o excepción y correlación.

Los campos físicos definitivos pertenecen a arquitectura e implementación.

---

#### 47. Obligación de retorno

Se separan tres hechos:

```text
CONTAINER ISSUED
```

```text
RETURN EXPECTED
```

```text
RETURN CONFIRMED
```

Ninguno puede inferirse automáticamente de otro cuando el proceso real exija confirmación.

La obligación permanece abierta hasta un hecho de retorno, una excepción autorizada o una resolución propietaria equivalente.

---

#### 48. Retorno confirmado

Confirmar retorno requiere evidencia suficiente para identificar qué identidad retornó cuando el control es individual, qué cantidad retornó cuando el control es por cantidad, desde qué obligación, en qué condición, quién confirmó, cuándo y qué discrepancias quedaron abiertas.

Un comentario o la simple desaparición del contenedor de una pantalla no equivale a retorno.

---

#### 49. Retorno parcial

Para `PHYSICAL_CONTAINER` con identidad individual, cada identidad se reconcilia de forma exacta.

Para `REUSABLE_QUANTITY`, la devolución puede ser parcial por cantidad y debe conservar componentes reconciliables de esperado, retornado, dañado, perdido o faltante y abierto, sin fabricar identidades individuales.

Los estados exactos de condición, daño, pérdida y faltante pertenecen a `NEXO-DOM-010`.

---

#### 50. Daño, pérdida y faltante

Un contenedor no desaparece de la historia por daño, pérdida o faltante.

Esta tarea conserva la obligación de reconciliación. `NEXO-DOM-010` define estado, condición, daño, pérdida y faltante.

La resolución económica permanece fuera de este contrato.

---

#### 51. Retorno y custodia son dimensiones distintas

Se fija:

```text
RETURN OBLIGATION
!=
CUSTODY
```

Puede existir una obligación de retorno con un custodio conocido, desconocido o en transición según la evidencia disponible.

La identidad del responsable actual y sus transiciones pertenecen a `NEXO-DOM-008`.

---

#### 52. LPN y contenedor retornable son identidades distintas

Se fija:

```text
LPN ID
!=
PHYSICAL CONTAINER ID
```

Un LPN puede existir sin contenedor físico. Un contenedor puede existir sin LPN. Un vínculo entre ambos no fusiona identidades.

---

#### 53. Vínculo LPN-contenedor

La relación exacta, temporal o persistente, entre un contenedor físico y un LPN permanece en `NEXO-DOM-019`.

Esta tarea únicamente exige que cualquier consumidor conserve ambas identidades por separado.

---

#### 54. Continuidad del LPN respecto del contenedor

Determinar si un contenedor conserva el mismo LPN, recibe otro LPN, deja de tener LPN o provoca cierre de un LPN pertenece a `NEXO-DOM-020`.

No se decide por la condición `RETURNABLE`.

---

#### 55. Retornar contenedor no cierra LPN por inferencia

Se prohíbe:

```text
CONTAINER RETURNED
→
AUTO CLOSE LPN
```

La devolución del objeto físico y el lifecycle LPN son decisiones separadas.

---

#### 56. Cerrar LPN no confirma retorno

Se prohíbe:

```text
LPN CLOSED
→
AUTO CONFIRM CONTAINER RETURN
```

Una obligación de retorno requiere evidencia propia.

---

#### 57. Anidamiento LPN y vínculo de contenedor no son equivalentes

Se fija `PARENT LPN → CHILD LPN` como relación entre dos identidades LPN y `PHYSICAL CONTAINER ↔ LPN` como relación entre dominios de identidad distintos.

Un contenedor físico no se introduce en el grafo LPN usando un identificador ficticio de LPN.

---

#### 58. Contenedor que transporta una jerarquía LPN

Un contenedor puede soportar físicamente una agrupación que incluya un LPN raíz y descendientes, pero el contenedor conserva su identidad, la raíz conserva su identidad, cada descendiente conserva su identidad, el vínculo físico no crea padres LPN adicionales y la obligación de retorno no cambia la jerarquía por inferencia.

La materialización exacta del vínculo se reserva a las tareas propietarias posteriores.

---

#### 59. Remisiones y transporte

Una remisión, viaje, bulto o envío físico no se convierte en padre LPN.

Un contenedor retornable tampoco sustituye remisión, plan de carga, manifiesto, custodia, entrega ni recepción.

La logística puede correlacionar estas identidades, pero conserva sus ciclos independientes.

---

#### 60. Autorización

Esta tarea define operaciones y restricciones de dominio, no concede permisos.

Toda mutación real deberá revalidar en servidor actor efectivo, sesión vigente, alcance, contexto territorial, contexto operativo, lifecycle, revisiones y restricciones propietarias.

Poseer o escanear una etiqueta LPN o de contenedor no concede autoridad.

---

#### 61. Auditoría

Toda operación autoritativa de jerarquía deberá poder atribuir padre anterior cuando exista, padre nuevo cuando exista, hijo, revisión anterior, revisión resultante, actor, instante de servidor, razón cuando aplique, correlación, idempotencia, origen del comando y resultado.

Toda obligación de retorno deberá conservar referencias suficientes para reconstruir emisión, retorno, excepción y diferencias.

---

#### 62. Privacidad y minimización

La trazabilidad conserva referencias de actor y contraparte suficientes para atribución y reconciliación.

No duplica tokens, secretos, credenciales, perfiles completos ni datos personales innecesarios.

---

#### 63. Observabilidad

La implementación futura debe poder distinguir al menos anidamiento aceptado, anidamiento rechazado, desanidamiento aceptado, reparentado aceptado, rechazo por ciclo, rechazo por multiparentalidad, conflicto de revisión, replay idempotente, lifecycle incompatible, intención offline pendiente, obligación de retorno abierta, retorno confirmado, retorno con diferencia y excepción de contenedor.

Las métricas no sustituyen eventos autoritativos.

---

#### 64. Estado físico AS-IS reconciliado

La evidencia remota vigente demuestra un modelo LPN todavía parcial:

- existe referencia documental a `inventory_lpns`;
- `inventory_lpns.container_type` mezcla identidad logística con forma de contenedor y está registrado como brecha;
- `inventory_lpn_items` no representa el universo objetivo completo de identidades;
- no se observa un contrato canónico materializado de padre-hijo LPN;
- no se observa una identidad física canónica de contenedor vinculada de forma versionada con LPN;
- la superficie LPN existente no constituye por sí sola evidencia de ciclo integral, anidamiento o retorno.

Esta tarea no convierte esas superficies parciales en implementación aprobada.

---

#### 65. Adopción física futura

La materialización posterior deberá evitar:

- reutilizar `container_type` como identidad de contenedor;
- representar al LPN hijo como una línea de contenido ordinaria;
- almacenar dos padres activos para un hijo;
- aceptar ciclos;
- duplicar contenido al proyectar ancestros;
- usar una LOC como padre LPN;
- usar un contenedor físico como padre LPN;
- cerrar un LPN dejando relaciones activas irreconciliadas;
- borrar historia al desanidar;
- convertir retorno de contenedor en cierre LPN;
- inferir retorno desde ausencia visual;
- inventar datos históricos sin evidencia;
- ejecutar backfills irreversibles sin expediente propietario.

La adopción física no pertenece a esta tarea documental.

---

#### 66. Escenarios negativos obligatorios

El contrato debe impedir, como mínimo:

1. un LPN anidado en sí mismo;
2. un ciclo de dos LPN;
3. un ciclo de profundidad mayor;
4. un hijo con dos padres activos;
5. reparentado no atómico;
6. anidamiento de un LPN terminal;
7. cierre ordinario de padre con hijos activos;
8. cierre ordinario de hijo con padre activo;
9. uso de un LPN como `QUANTITY_SLICE`;
10. copia del contenido del hijo al padre;
11. doble contabilización por proyección agregada;
12. pérdida de dimensiones de lote o condición al agregar;
13. duplicación de identidad serializada;
14. conflicto concurrente ignorado;
15. replay que duplica una relación;
16. intención offline presentada como confirmada;
17. canastilla identificada modelada como LPN;
18. LPN modelado como `PHYSICAL_CONTAINER`;
19. bandeja genérica por cantidad convertida en cientos de identidades;
20. retorno de contenedor que cierra LPN automáticamente;
21. cierre LPN que confirma retorno automáticamente;
22. pérdida o daño que borra el contenedor;
23. `container_type` usado como fuente de identidad física;
24. vínculo contenedor-LPN tratado como jerarquía LPN.

---

#### 67. Matriz de responsabilidades

| Responsabilidad | Propietario contractual |
| --- | --- |
| clasificación de objeto físico | `NEXO-DOM-001` |
| propósito LPN | `NEXO-DOM-002` |
| lifecycle LPN | `NEXO-DOM-003` |
| contenido, pack y unpack | `NEXO-DOM-004` |
| división, unión y transferencia de contenido | `NEXO-DOM-005` |
| jerarquía LPN y semántica de retornables | `NEXO-DOM-006` |
| sede, LOC, LPN y contenido | `NEXO-DOM-007` |
| custodia y responsable | `NEXO-DOM-008` |
| condición, daño, pérdida y faltante | `NEXO-DOM-010` |
| integración de etiquetas | `NEXO-DOM-018` |
| identidad contenedor físico frente a LPN | `NEXO-DOM-019` |
| continuidad o cierre LPN respecto de contenedor | `NEXO-DOM-020` |
| no doble contabilización suelto/LPN | `NEXO-DOM-021` |
| movimiento atómico del LPN y contenido | `NEXO-DOM-022` |
| trazabilidad interna | `NEXO-DOM-023` |
| capacidad, peso, volumen y compatibilidad | `NEXO-DOM-024` |
| autorización | familia `NEXO-AUTH` y autorización transversal |
| persistencia, RLS, RPC y migraciones | arquitectura e implementación física propietarias |

---

#### 68. Handoff hacia `NEXO-DOM-007`

Esta tarea entrega:

```text
ACYCLIC LPN FOREST
+
ONE ACTIVE PARENT AT MOST
+
DIRECT CONTENT OWNERSHIP
+
DESCENDANT PROJECTION WITHOUT DUPLICATION
+
SEPARATE PHYSICAL CONTAINER IDENTITY
+
RETURN OBLIGATION WITHOUT LOCATION INFERENCE
```

`NEXO-DOM-007` deberá definir sede → LOC → LPN → contenido respetando que la ubicación de un padre no puede inferirse solo por su jerarquía, la ubicación de un hijo no puede quedar físicamente contradictoria con su relación activa, `NEST_LPN`, `UNNEST_LPN` y `REPARENT_LPN` no sustituyen movimientos de ubicación, contenido directo y descendiente conservan owner LPN, un contenedor físico no sustituye una LOC y retorno esperado no constituye ubicación confirmada.

---

#### 69. Handoffs posteriores

Quedan reservados:

- `NEXO-DOM-008`: custodia y responsable actual;
- `NEXO-DOM-010`: condición, daño, pérdida y faltante;
- `NEXO-DOM-018`: etiquetas;
- `NEXO-DOM-019`: identidad permanente de contenedor e identidad LPN;
- `NEXO-DOM-020`: conservación, cambio o cierre del LPN respecto del contenedor;
- `NEXO-DOM-021`: no doble contabilización;
- `NEXO-DOM-022`: movimiento atómico del LPN y todo su contenido;
- `NEXO-DOM-023`: lote, serial, vencimiento y condición dentro del LPN;
- `NEXO-DOM-024`: capacidad, peso, volumen y compatibilidad.

Esta tarea no desarrolla esos contratos.

---

#### 70. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro vigente ya cubre ciclo LPN, reconciliación y atomicidad, trazabilidad interna, separación de identidades logísticas y físicas, comportamiento de contenedores, logística, concurrencia e idempotencia. Esta tarea especializa esas reglas para jerarquía y retorno sin introducir una obligación independiente.

---

#### 71. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-NEXO-004`, para ciclo LPN integral y auditable;
- `TREQ-NEXO-011`, para movimientos reconciliables, atomicidad, concurrencia, idempotencia y cero doble contabilización;
- `TREQ-NEXO-012`, para conservar lote, serial, vencimiento, condición y trazabilidad al empacar, mover, dividir, unir o desempacar;
- `TREQ-NEXO-016`, para separar LPN, bulto, contenedor, custodia, entrega, recepción y retorno dentro de logística;
- `TREQ-NEXO-046`, para separar identidad de contenedor físico, LPN y contenido y conservar retorno;
- `TREQ-NEXO-047`, que incluye explícitamente el comportamiento de contenedores, LPN, movimientos, conteos, reservas y no duplicación.

Estas referencias son trazabilidad reutilizada y no cambios al registro.

---

#### 72. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build canónico corresponde al checkout local posterior a la incorporación de la tarea. |
| LOCAL | NOT_EXECUTED | No se ejecutaron scripts sobre el checkout local del usuario durante la elaboración documental. |
| REMOTA | PASS | Se verificaron `main`, continuidad, secuencia activa, owner, handoff de la tarea anterior, topología, políticas de formato y desarrollo, contrato de entrega, 04A NEXO, manifest, package scripts y brechas físicas LPN observables. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó anidamiento, retorno ni reconciliación sobre operación real. |
| FÍSICA | NOT_EXECUTED | No se modificaron LPN, contenedores, datos, Supabase, código ni infraestructura. |

---

#### 73. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

- [x] LPN anidado está separado de contenido ordinario.
- [x] LPN padre está separado de contenedor físico.
- [x] La jerarquía se define como bosque acíclico.
- [x] Cada hijo admite máximo un padre activo.
- [x] Un padre admite varios hijos.
- [x] La autorreferencia está prohibida.
- [x] Los ciclos están prohibidos.
- [x] La multiparentalidad está prohibida.
- [x] Se define plan no autoritativo en `DRAFT`.
- [x] La relación ordinaria autoritativa exige LPN `ACTIVE`.
- [x] `NEST_LPN`, `UNNEST_LPN` y `REPARENT_LPN` están definidos.
- [x] Reparentado es atómico y conserva identidad.
- [x] Se definen revisión estructural, concurrencia e idempotencia.
- [x] Offline no equivale a relación autoritativa.
- [x] Respuestas tardías no retroceden jerarquía.
- [x] Lifecycle no deja relaciones activas huérfanas.
- [x] Contenido directo conserva un único owner LPN.
- [x] La proyección agregada no duplica membresías.
- [x] Cantidades e identidades conservan dimensiones.
- [x] División, unión y transferencia no se confunden con reparentado.
- [x] Movimiento físico completo permanece reservado.
- [x] Ubicación, custodia, trazabilidad y capacidad permanecen separadas.
- [x] `RETURNABLE` no crea una nueva clase primaria.
- [x] `PHYSICAL_CONTAINER` conserva identidad individual.
- [x] `REUSABLE_QUANTITY` conserva control por cantidad cuando corresponde.
- [x] Retorno esperado y retorno confirmado quedan separados.
- [x] Retorno y custodia quedan separados.
- [x] LPN y contenedor físico conservan identidades distintas.
- [x] Retornar contenedor no cierra LPN por inferencia.
- [x] Cerrar LPN no confirma retorno.
- [x] El AS-IS parcial no se presenta como implementación completa.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se autoriza materialización física.
- [x] Se entrega handoff exacto a `NEXO-DOM-007`.

---

#### 74. Límites

Esta tarea no:

- crea tablas, columnas, claves foráneas, constraints, enums, índices, triggers, vistas, RPC ni políticas RLS;
- crea Server Actions ni Route Handlers;
- modifica `inventory_lpns` ni `inventory_lpn_items`;
- elimina `container_type`;
- crea `parent_lpn_id`;
- crea identidad física de contenedor;
- modifica datos, crea migraciones o ejecuta backfill;
- modifica Supabase ni `vento-nexo`;
- implementa UI ni imprime etiquetas;
- define tamaño o simbología de etiqueta;
- define ubicación final, custodia final ni estados de condición;
- define capacidad, peso, volumen ni movimiento físico completo;
- define contabilidad;
- ejecuta retorno real;
- crea una instancia física propia;
- crea ni modifica requisitos de prueba;
- desarrolla `NEXO-DOM-007`.

---

#### 75. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-005 — Definir división, unión y transferencia de contenido`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-006 — Definir LPN anidados y contenedores retornables`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-007 — Definir relación sede → LOC → LPN → contenido`

### ✅ NEXO-DOM-007 — Definir relación sede → LOC → LPN → contenido

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-006 — Definir LPN anidados y contenedores retornables
**Tarea siguiente:** NEXO-DOM-008 — Definir custodia y responsable actual
**Tipo de tarea:** documental; definición canónica de la jerarquía física sede → LOC → posición opcional → LPN → contenido, modos de ubicación, herencia espacial, stock no ubicado, tránsito, reconciliación y fronteras con movimientos, custodia, condición, contenedores y trazabilidad bajo topología DEFINE_ONCE
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir una relación física única y reconciliable entre sede, LOC, posición opcional, LPN y contenido, impidiendo que una misma existencia tenga varias ubicaciones autoritativas o cambie de lugar mediante sobrescritura sin movimiento correlacionado.

```text
SITE
→ LOC
→ OPTIONAL POSITION
→ ROOT LPN OR LOOSE CONTENT
→ NESTED LPN
→ DIRECT CONTENT
```

La ubicación conocida, el tránsito y el stock temporalmente no ubicado se representan de forma explícita y mutuamente excluyente.

---

#### 2. Resultado canónico

La tarea fija:

1. jerarquía `SITE → LOC → OPTIONAL POSITION`;
2. diferencia entre ubicación y agrupación logística;
3. ubicación directa frente a ubicación efectiva derivada;
4. colocación de LPN raíz;
5. ubicación efectiva de LPN anidados;
6. ubicación directa de stock suelto;
7. ubicación efectiva del contenido empacado;
8. modos `LOCATED`, `IN_TRANSIT` y `UNLOCATED_TEMPORARY`;
9. tratamiento controlado del stock no ubicado;
10. coherencia territorial;
11. invariantes de pack, unpack, anidamiento y movimiento;
12. no doble ubicación ni doble contabilización;
13. concurrencia, idempotencia y offline;
14. auditoría y reconciliación;
15. handoff a `NEXO-DOM-008`.

No materializa tablas, RPC, RLS, UI, migraciones, movimientos ni datos.

---

#### 3. Entradas canónicas preservadas

Se preservan:

- NEXO como propietario del estado físico y trazabilidad de inventario;
- producto, presentación, existencia, lote, serial, LOC, posición, LPN y contenedor como conceptos distintos;
- sede, LOC y posición opcional como jerarquía física;
- stock no ubicado como excepción temporal controlada;
- LPN como identidad logística de contenido y no como ubicación;
- prohibición de contabilizar contenido LPN también como stock suelto;
- ledger y proyecciones reconciliables;
- mutaciones atómicas o idempotentes y compensables;
- lifecycle LPN de `NEXO-DOM-003`;
- contenido y pack/unpack de `NEXO-DOM-004`;
- división, unión y transferencia de `NEXO-DOM-005`;
- bosque LPN acíclico, máximo un padre activo y propiedad directa del contenido de `NEXO-DOM-006`.

---

#### 4. Sede

La sede es el ámbito territorial físico superior.

Una sede puede contener varios LOC, pero no sustituye un LOC ni constituye por sí sola una ubicación ordinaria completa de stock.

---

#### 5. LOC

Un LOC es una ubicación física direccionable dentro de exactamente una sede.

```text
LOC ACTIVE SITE COUNT = 1
```

Su identidad permanece separada de producto, LPN, posición, contenedor, condición y custodio.

---

#### 6. Posición opcional

Una posición es una subdivisión opcional de un LOC.

```text
POSITION
→ EXACTLY ONE LOC
→ EXACTLY ONE SITE THROUGH LOC
```

Un LOC puede operar sin posiciones. No se crean posiciones ficticias para completar una forma técnica.

---

#### 7. Coherencia territorial

Toda colocación localizada debe satisfacer:

```text
PLACEMENT.SITE = PLACEMENT.LOC.SITE
```

y, cuando exista posición:

```text
PLACEMENT.POSITION.LOC = PLACEMENT.LOC
```

Una discrepancia bloquea la aceptación.

---

#### 8. LPN no es ubicación

Se mantiene:

```text
LPN != LOC
LPN != POSITION
```

El LPN puede estar ubicado, en tránsito o temporalmente no ubicado, pero nunca es el lugar físico.

---

#### 9. Contenedor físico no es ubicación

Se mantiene:

```text
PHYSICAL_CONTAINER != LOC
```

Un contenedor identificado puede tener ubicación propia. Su vínculo con un LPN no lo convierte en LOC.

---

#### 10. Colocación autoritativa

Cada sujeto locatable mantiene como máximo una colocación física autoritativa vigente.

```text
AUTHORITATIVE CURRENT PLACEMENT COUNT <= 1
```

La ausencia de LOC debe estar explicada por tránsito o excepción temporal cuando la existencia física siga pendiente de reconciliación.

---

#### 11. Modos de colocación

Se fijan tres modos conceptuales mutuamente excluyentes:

```text
LOCATED
IN_TRANSIT
UNLOCATED_TEMPORARY
```

No son estados del lifecycle LPN ni sustituyen condición o disponibilidad.

---

#### 12. `LOCATED`

`LOCATED` requiere sede, LOC y, cuando aplique, posición opcional coherente.

La relación es vigente, auditable y reconciliable.

---

#### 13. `IN_TRANSIT`

`IN_TRANSIT` representa existencia retirada autoritativamente del origen y todavía no confirmada en destino.

Durante tránsito:

- origen es referencia histórica;
- destino es esperado;
- ninguno es LOC actual confirmado;
- el movimiento conserva su propia correlación y estado.

---

#### 14. `UNLOCATED_TEMPORARY`

`UNLOCATED_TEMPORARY` representa una excepción en la que existe evidencia de existencia física pero todavía no puede atribuirse un LOC autoritativo y no existe un tránsito normal que explique la ausencia.

No es una LOC.

---

#### 15. Exclusividad de modos

Se prohíbe representar simultáneamente una misma existencia como:

- ubicada y en tránsito;
- ubicada y no ubicada;
- en tránsito y no ubicada por la misma causa física.

---

#### 16. Stock suelto

Contenido fuera de cualquier LPN autoritativo puede poseer ubicación directa con sede, LOC, posición opcional y dimensiones de existencia aplicables.

El stock suelto no necesita un LPN ficticio.

---

#### 17. LPN raíz

Un LPN raíz puede poseer colocación directa.

Cuando está `LOCATED`, esa colocación determina la ubicación efectiva de su estructura LPN anidada.

---

#### 18. LPN hijo

Un LPN con padre autoritativo vigente no mantiene una segunda colocación actual independiente que pueda contradecir al padre.

```text
NESTED CHILD EFFECTIVE PLACEMENT
=
ROOT LPN EFFECTIVE PLACEMENT
```

El hijo conserva historial de colocaciones anteriores, pero estas no vuelven a ser actuales por inferencia.

---

#### 19. Ubicación efectiva

La ubicación efectiva puede provenir de:

- colocación directa para stock suelto o LPN raíz;
- herencia desde la raíz para LPN anidado;
- herencia desde el LPN propietario directo para contenido empacado.

La fuente de la ubicación efectiva debe quedar identificable.

---

#### 20. Contenido empacado

El contenido empacado no conserva simultáneamente una colocación directa de stock suelto.

```text
DIRECT CONTENT EFFECTIVE PLACEMENT
=
OWNER LPN EFFECTIVE PLACEMENT
```

La membresía del contenido y la ubicación efectiva permanecen conceptos distintos.

---

#### 21. Contenido dentro de LPN anidado

Para contenido directo de un LPN hijo:

```text
CONTENT
→ DIRECT OWNER LPN
→ ANCESTOR CHAIN
→ ROOT LPN
→ EFFECTIVE PLACEMENT
```

La proyección conserva siempre el LPN propietario directo.

---

#### 22. No doble ubicación

La misma existencia no puede estar simultáneamente:

- como stock suelto en un LOC;
- como contenido directo de un LPN;
- como contenido directo de otro LPN;
- como contenido agregado del padre tratado como una nueva membresía.

---

#### 23. No doble contabilización

La ubicación no crea saldo.

```text
ONE PHYSICAL EXISTENCE
→ ONE AUTHORITATIVE ACCOUNTING REPRESENTATION
```

Mover, empacar, desempacar, anidar o proyectar nunca crea cantidad adicional.

---

#### 24. `PACK` y ubicación

`PACK` no puede teletransportar contenido.

Para una operación ordinaria, contenido fuente y LPN destino deben estar físicamente compatibles al confirmar.

```text
LOOSE DIRECT PLACEMENT ENDS
+
LPN MEMBERSHIP STARTS
```

como una decisión reconciliable.

---

#### 25. `UNPACK` y ubicación

Al desempacar sin traslado adicional:

```text
LPN MEMBERSHIP ENDS
+
LOOSE DIRECT PLACEMENT STARTS
AT CURRENT LPN EFFECTIVE PLACEMENT
```

Un destino diferente exige además el movimiento propietario correspondiente.

---

#### 26. Transferencia entre LPN

`TRANSFER_CONTENT` no puede ocultar un traslado físico.

Si LPN origen y destino no comparten una situación física compatible, la transferencia debe correlacionarse con el movimiento aplicable o fallar cerrada.

---

#### 27. Anidamiento

`NEST_LPN`, `UNNEST_LPN` y `REPARENT_LPN` no sustituyen movimientos de ubicación.

Al anidar ordinariamente, padre e hijo deben tener situación física compatible.

Al desanidar sin traslado, el hijo adquiere una colocación directa compatible con su ubicación efectiva inmediatamente anterior.

---

#### 28. Jerarquía anidada coherente

No se admite una estructura activa con raíz en una sede, hijo directamente ubicado en otra y contenido del hijo en una tercera.

Todos los descendientes deben resolver a una situación física reconciliable con la raíz.

---

#### 29. Movimiento de LPN completo

El movimiento físico de un LPN y todo su contenido pertenece a `NEXO-DOM-022`.

Esta tarea entrega:

```text
ROOT LPN PLACEMENT CHANGE
→ ALL ACTIVE DESCENDANTS AND THEIR CONTENT
RESOLVE TO THE SAME NEW EFFECTIVE PHYSICAL SITUATION
```

sin duplicar movimientos por proyecciones derivadas.

---

#### 30. Cambio de sede

Cambiar sede es una transición física, no una edición aislada de `site_id`.

```text
UPDATE SITE
WITHOUT CORRELATED PHYSICAL TRANSITION
=
PROHIBITED
```

---

#### 31. Cambio de LOC o posición

Cambiar LOC, o posición cuando esta sea autoritativa, conserva origen, destino, actor, instante, causa, revisión y correlación.

No se sobrescribe destructivamente la ubicación anterior.

---

#### 32. Sede sin LOC

Conocer únicamente la sede no basta para presentar stock como ordinariamente ubicado.

Debe resolverse como excepción temporal, estado transitorio propietario o dato inválido pendiente de reconciliación, según evidencia.

---

#### 33. Contrato de stock no ubicado

Toda excepción temporal conserva como mínimo:

- sujeto afectado;
- sede conocida cuando exista evidencia;
- causa;
- origen del hecho;
- instante de inicio;
- responsable de resolver;
- condición de salida;
- política de antigüedad;
- revisión;
- correlación;
- última evidencia disponible.

No se crea una LOC ficticia denominada `UNLOCATED`.

---

#### 34. Antigüedad y disponibilidad

El stock no ubicado no puede permanecer indefinidamente sin señalización.

Debe poder distinguirse si continúa dentro o fuera de la ventana de resolución propietaria.

Se fija:

```text
UNLOCATED != AVAILABLE
```

y tampoco constituye un punto determinista de picking.

---

#### 35. Tránsito y destino

Mientras una existencia está en tránsito:

```text
SOURCE = HISTORICAL
DESTINATION = EXPECTED
CURRENT LOC = NONE
```

La confirmación del destino produce `LOCATED` solo después de la aceptación física requerida por el contrato propietario.

---

#### 36. Diferencias de recepción

Una diferencia de cantidad, identidad, lote, serial, condición o ubicación no se oculta confirmando el destino esperado.

La parte afectada conserva un estado reconciliable y evidencia propia.

---

#### 37. Activos, reutilizables y contenedores

- `SERIALIZED_ASSET` conserva ubicación por identidad.
- `REUSABLE_QUANTITY` conserva ubicación por cantidad cuando no existe identidad individual.
- `PHYSICAL_CONTAINER` conserva ubicación por identidad cuando es individual.

Ubicación no sustituye custodia, condición, disponibilidad ni mantenimiento.

---

#### 38. Retorno de contenedor

```text
RETURN OBLIGATION != CURRENT PLACEMENT
```

Esperar un retorno no ubica el contenedor.

Un retorno confirmado debe producir o correlacionarse con la situación física resultante mediante el contrato propietario.

---

#### 39. Custodia

Se fija:

```text
PLACEMENT != CUSTODY
```

Conocer sede, LOC o LPN no determina automáticamente quién responde por el objeto.

La custodia y responsable actual pertenecen a `NEXO-DOM-008`.

---

#### 40. Condición

También se mantiene:

```text
LOCATED != USABLE
UNLOCATED != LOST
IN_TRANSIT != DAMAGED
```

Condición, daño, pérdida y faltante pertenecen a `NEXO-DOM-010`.

---

#### 41. Conteo y hallazgo

Un conteo es una observación, no una sobrescritura de ubicación.

Si se encuentra una identidad en una LOC distinta:

```text
EXPECTED PLACEMENT
+
OBSERVED PLACEMENT
+
RECONCILIATION DECISION
```

deben coexistir hasta resolver el caso.

---

#### 42. Ledger y proyección

Los hechos autoritativos explican los cambios físicos.

Las proyecciones sirven para lectura eficiente, pero no son una fuente mutable independiente.

```text
PROJECTION UPDATE
WITHOUT CORRELATED AUTHORITATIVE FACT
=
PROHIBITED
```

---

#### 43. Forma conceptual mínima

Una colocación localizada puede expresarse conceptualmente como:

```ts
type NexoLocatedPlacement = {
  mode: "LOCATED";
  site_id: string;
  loc_id: string;
  position_id: string | null;
  placement_revision: number;
};
```

Una situación de tránsito puede expresar movimiento, origen y destino esperados; una excepción temporal puede expresar sede conocida, causa, inicio y revisión. La forma física final pertenece a arquitectura.

---

#### 44. Concurrencia e idempotencia

Toda mutación de colocación debe verificar revisión esperada o mecanismo equivalente.

```text
EXPECTED PLACEMENT REVISION
=
CURRENT PLACEMENT REVISION
```

Un retry de la misma intención no duplica colocación, movimiento, recepción, excepción ni revisión.

---

#### 45. Operación offline y respuestas tardías

Una intención offline no es ubicación canónica hasta que el servidor la acepte.

Al reconectar se revalidan revisión, autorización, lifecycle, membresía LPN, jerarquía, sede, LOC, posición, movimiento e idempotencia.

Una respuesta tardía nunca devuelve una existencia a una ubicación anterior.

---

#### 46. Autorización

Esta tarea define ubicación, no concede permisos.

Toda mutación real revalida en servidor actor efectivo, sesión, alcance territorial, sede, LOC, operación, lifecycle, revisiones y bloqueos aplicables.

Un código LOC, QR, LPN, URL o valor enviado por cliente no concede autoridad.

---

#### 47. Auditoría mínima

Toda transición de colocación debe poder atribuir:

- sujeto;
- modo anterior y resultante;
- sede, LOC y posición anteriores cuando apliquen;
- sede, LOC y posición resultantes cuando apliquen;
- movimiento o causa;
- revisión anterior y resultante;
- actor;
- instante de servidor;
- correlación;
- idempotencia;
- resultado.

---

#### 48. Estado físico AS-IS reconciliado

La evidencia remota vigente demuestra superficies parciales:

- existen referencias a `inventory_locations` e `inventory_location_positions`;
- existe `inventory_lpns`;
- la lectura LPN observable expone `id`, `code`, `site_id` y `created_at`;
- esa lectura no demuestra LOC actual, posición, tránsito, excepción no ubicada ni herencia espacial;
- `inventory_lpn_items` sigue siendo una superficie parcial;
- el AS-IS no demuestra implementación completa de sede → LOC → LPN → contenido.

Esta tarea no eleva esas superficies a certificación.

---

#### 49. Adopción física futura

La implementación posterior debe impedir:

- usar solo `site_id` del LPN como ubicación completa;
- inventar LOC por defecto;
- crear una LOC de no ubicados;
- mantener ubicación directa contradictoria en LPN hijos;
- duplicar ubicación directa de contenido empacado;
- actualizar sede o LOC sin hecho correlacionado;
- conservar contenido en origen durante tránsito;
- confirmar destino antes de recepción;
- convertir conteo en actualización destructiva;
- perder historia al corregir ubicación;
- crear dos colocaciones actuales;
- usar contenedor o LPN como LOC;
- ejecutar backfills irreversibles sin evidencia.

---

#### 50. Escenarios negativos obligatorios

El contrato debe impedir, como mínimo:

1. LOC perteneciente a dos sedes;
2. posición perteneciente a otro LOC;
3. LPN usado como ubicación;
4. contenedor usado como LOC;
5. sede sola presentada como ubicación ordinaria;
6. LPN hijo con ubicación directa contradictoria;
7. contenido empacado también como stock suelto;
8. contenido descendiente contado como membresía adicional;
9. ubicación y tránsito simultáneos;
10. ubicación y excepción no ubicada simultáneas;
11. cambio de sede sin movimiento;
12. cambio de LOC sin historia;
13. `PACK` que teletransporta;
14. `UNPACK` que crea stock no ubicado sin causa;
15. transferencia LPN que oculta traslado;
16. anidamiento físicamente incompatible;
17. stock no ubicado indefinido;
18. stock no ubicado como pick determinista;
19. tránsito disponible en origen y destino;
20. recepción parcial presentada como total;
21. conteo que sobrescribe ubicación;
22. replay que duplica movimiento;
23. offline presentado como confirmado;
24. respuesta tardía que revierte ubicación;
25. `site_id` parcial presentado como ubicación completa.

---

#### 51. Matriz de responsabilidades

| Responsabilidad | Propietario contractual |
| --- | --- |
| propósito y tipos LPN | `NEXO-DOM-002` |
| lifecycle LPN | `NEXO-DOM-003` |
| contenido, pack y unpack | `NEXO-DOM-004` |
| división, unión y transferencia | `NEXO-DOM-005` |
| jerarquía LPN y retornables | `NEXO-DOM-006` |
| sede, LOC, posición, LPN y contenido | `NEXO-DOM-007` |
| custodia y responsable actual | `NEXO-DOM-008` |
| condición, daño, pérdida y faltante | `NEXO-DOM-010` |
| no doble contabilización | `NEXO-DOM-021` |
| movimiento atómico de LPN y contenido | `NEXO-DOM-022` |
| trazabilidad interna | `NEXO-DOM-023` |
| capacidad y compatibilidad | `NEXO-DOM-024` |
| autorización | familia `NEXO-AUTH` y autorización transversal |
| persistencia, RLS, RPC y migraciones | arquitectura e implementación física propietarias |

---

#### 52. Handoff hacia `NEXO-DOM-008`

Esta tarea entrega:

```text
ONE AUTHORITATIVE PHYSICAL PLACEMENT
+
SITE/LOC/POSITION COHERENCE
+
ROOT-LPN DIRECT PLACEMENT
+
NESTED-LPN DERIVED PLACEMENT
+
LPN-CONTENT DERIVED PLACEMENT
+
TRANSIT WITHOUT DUAL LOCATION
+
CONTROLLED TEMPORARY UNLOCATED STATE
```

`NEXO-DOM-008` deberá definir custodia y responsable actual sin inferirlos desde ubicación: una LOC no es custodio, conocer sede no identifica responsable, contenido dentro de LPN no hereda automáticamente custodia por la misma regla usada para ubicación, tránsito requiere custodia explícita conforme a su contrato y una obligación de retorno no determina responsable actual.

---

#### 53. Handoffs posteriores

Quedan reservados:

- `NEXO-DOM-010`: condición, daño, pérdida y faltante;
- `NEXO-DOM-011`: préstamo, devolución, transferencia y cambio de custodia;
- `NEXO-DOM-017`: auditoría, historial y evidencia;
- `NEXO-DOM-019`: identidad permanente de contenedor e identidad LPN;
- `NEXO-DOM-020`: continuidad o cierre del LPN respecto del contenedor;
- `NEXO-DOM-021`: no doble contabilización;
- `NEXO-DOM-022`: movimiento atómico del LPN y todo su contenido;
- `NEXO-DOM-023`: lote, serial, vencimiento y condición dentro del LPN;
- `NEXO-DOM-024`: capacidad, peso, volumen y compatibilidad.

Esta tarea no desarrolla esos contratos.

---

#### 54. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro vigente ya exige una fuente reconciliable para sede, LOC, posición, LPN y estado, impide doble contabilización, protege ubicación y trazabilidad y exige atomicidad, concurrencia e idempotencia. Esta tarea especializa esas obligaciones sin introducir una obligación independiente.

---

#### 55. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-NEXO-004`, para ciclo LPN con ubicación auditable;
- `TREQ-NEXO-011`, para fuente reconciliable de movimientos y proyecciones por sede, LOC, posición, lote, LPN y estado;
- `TREQ-NEXO-012`, para ubicación, cantidad, condición, lote o serial y trazabilidad;
- `TREQ-NEXO-013`, para ubicación como dimensión separada en identidades físicas;
- `TREQ-NEXO-016`, para separar logística, LPN, custodia, entrega, recepción y retorno;
- `TREQ-NEXO-047`, para tránsito y prohibición de duplicar saldo, instancia, contenedor o contenido LPN.

Estas referencias son trazabilidad reutilizada y no cambios al registro.

---

#### 56. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build canónico corresponde al checkout local posterior a la incorporación de la tarea. |
| LOCAL | NOT_EXECUTED | No se ejecutaron scripts sobre el checkout local del usuario durante la elaboración documental. |
| REMOTA | PASS | Se verificaron `main`, continuidad, ruta, secuencia activa, owner, handoff de `NEXO-DOM-006`, topología, políticas, contrato de entrega, manifest, 04A NEXO, `package.json`, validadores, CAP-SCOPE de inventario y superficie LPN observable. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ubicaciones, reubicaciones, tránsito, pack, unpack ni recepción sobre operación real. |
| FÍSICA | NOT_EXECUTED | No se modificaron LOC, posiciones, LPN, contenido, movimientos, datos, Supabase, código ni infraestructura. |

---

#### 57. Criterios de aceptación

La tarea queda documentalmente satisfecha cuando:

- [x] Sede, LOC, posición, LPN y contenido están separados.
- [x] LOC pertenece a exactamente una sede.
- [x] Posición pertenece a exactamente un LOC y es opcional.
- [x] LPN y contenedor no se convierten en ubicación.
- [x] Existe máximo una colocación autoritativa vigente.
- [x] Se distinguen ubicado, tránsito y no ubicado temporal.
- [x] Stock suelto usa ubicación directa.
- [x] LPN raíz usa colocación directa.
- [x] LPN hijo deriva ubicación desde la raíz.
- [x] Contenido empacado deriva ubicación de su LPN.
- [x] No existe doble ubicación ni doble contabilización.
- [x] Pack, unpack, transferencias y anidamiento no teletransportan existencia.
- [x] Cambio de sede o LOC exige transición correlacionada.
- [x] Stock no ubicado es temporal, controlado y no disponible por inferencia.
- [x] Tránsito no conserva origen ni destino como LOC actual.
- [x] Conteo es observación.
- [x] Ubicación, custodia y condición permanecen separadas.
- [x] Se definen revisión, concurrencia, idempotencia y offline.
- [x] El AS-IS parcial no se presenta como implementación completa.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se autoriza materialización física.
- [x] Se entrega handoff exacto a `NEXO-DOM-008`.

---

#### 58. Límites

Esta tarea no:

- crea o modifica sedes, LOC o posiciones;
- crea tablas, columnas, constraints, índices, triggers, vistas, RPC ni RLS;
- modifica `inventory_locations`, `inventory_location_positions`, `inventory_lpns` ni `inventory_lpn_items`;
- crea movimientos ni mueve stock o LPN;
- ejecuta pack o unpack;
- cambia custodia;
- define daño, pérdida, faltante o condición;
- define capacidad, peso o volumen;
- implementa reservas o FEFO completo;
- crea contenedores;
- modifica datos, Supabase o `vento-nexo`;
- implementa UI o etiquetas;
- ejecuta backfill;
- crea una instancia física propia;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-DOM-008`.

---

#### 59. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-006 — Definir LPN anidados y contenedores retornables`

**TAREA ACTUAL APROBADA**
`NEXO-DOM-007 — Definir relación sede → LOC → LPN → contenido`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-008 — Definir custodia y responsable actual`

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
