### TAREA POS DERIVADA DE OPS-AUD-001

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:OPS-POS-001 -->
### Reconciliación topológica de OPS-POS-001

La tarea define zonas, mesas, puntos de servicio y reglas por sede como contrato de diseño operativo. No materializa por sí misma configuración física o código del POS.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-001 — Inventariar procesos de venta, caja y salón
**Tarea siguiente:** PULSO-AUTH-001 — Inventariar vistas POS
**Tipo de tarea:** definición documental canónica de la configuración física y visual que PULSO deberá consumir por sede para zonas de servicio, mesas, puntos de caja y mostrador, pickup de pedidos externos, estaciones operativas y reglas de configuración, preservando identidad de sede, separación entre zona física y área de autorización, compatibilidad con el modelo AS-IS de salón y continuidad hacia autorización y experiencia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_TAREA_DERIVADA_OPS_AUD_001.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica zonas, mesas, estaciones, terminales, dispositivos, código, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, contratos generados ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato operativo y visual que permitirá representar en PULSO la configuración física vigente de Vento Café, Saudo y Molka sin convertir una zona física en área de autorización, sin duplicar puntos integrados y sin derivar estructura empresarial desde nombres de marca o canales de venta.

La tarea debe dejar resuelto, por sede:

- qué espacios son zonas visibles de servicio;
- cómo se identifican y agrupan las mesas;
- qué puntos físicos cumplen funciones de caja, mostrador, barra, cocina o entrega;
- dónde se entregan actualmente pedidos de Rappi y domicilios;
- qué información pertenece a una estación operativa;
- qué reglas permiten modificar la configuración sin perder identidad ni trazabilidad;
- qué datos quedan expresamente fuera del contrato por no estar confirmados.

---

#### 2. Handoff recibido de PULSO-UX-001

`PULSO-UX-001` entrega un universo funcional PULSO ya separado de las superficies técnicas AS-IS.

El handoff específico es:

```text
PULSO-UX-001
→ universo funcional de venta, caja y salón
→ VPROC-0038 / VSCREEN-0082
→ necesidad de configuración física por sede
→ OPS-POS-001
```

La existencia actual de `pos_zones`, `pos_tables`, `pos_sessions` y `pos_table_service_calls` demuestra que el runtime ya consume zonas y mesas, pero no constituye por sí sola la definición canónica de su significado ni de la configuración física por sede.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la configuración se define documentalmente una sola vez;
- no se crea una instancia física de ejecución;
- no se escriben datos de zonas o mesas;
- no se ejecuta una migración;
- no se modifica la distribución física real de una sede;
- no se asignan dispositivos;
- no se otorgan permisos;
- no se modifica `active-sequence.json` manualmente;
- la materialización posterior queda en los paquetes y tareas propietarias.

---

#### 4. Regla de identidad

El contrato distingue obligatoriamente:

```text
MARCA
!=
SEDE
!=
ÁREA OPERATIVA
!=
ZONA FÍSICA
!=
PUNTO DE SERVICIO
!=
ESTACIÓN
!=
MESA
!=
DISPOSITIVO
!=
ÁREA DE AUTORIZACIÓN
```

Ninguna de estas identidades puede sustituir a otra por inferencia.

---

#### 5. Marca y sede

Vento Café, Saudo y Molka cuentan actualmente con un único local físico activo cada uno.

Ese hecho no autoriza a utilizar el nombre comercial como clave técnica permanente.

Regla canónica:

```text
CONFIGURACIÓN POS
→ siempre se resuelve dentro de un site_id válido

MARCA VISIBLE
→ atributo de contexto y presentación

site_id
→ alcance técnico de sede
```

Si una marca incorpora otra sede en el futuro, la nueva sede requiere configuración propia y no hereda zonas, mesas o estaciones por nombre de marca.

---

#### 6. Área operativa y zona física

Una zona física es una subdivisión espacial usada para ubicación, organización o visualización.

No constituye por sí sola:

- un área operativa;
- un rol;
- un permiso;
- un territorio de autorización;
- una estación;
- una mesa;
- una sesión de atención.

La relación futura con autorización deberá ser explícita y validada por los contratos PULSO-AUTH y de contexto.

---

#### 7. Punto de servicio

Un punto de servicio es un punto físico desde el cual se realiza una o varias funciones comerciales u operativas.

Ejemplos confirmados por el inventario operativo:

- caja;
- mostrador;
- barra;
- cocina;
- entrega de pedidos externos.

Un único punto físico puede integrar varias funciones.

```text
UN PUNTO FÍSICO
+
VARIAS CAPACIDADES
!=
VARIOS PUNTOS FÍSICOS
```

---

#### 8. Estación

Una estación es una identidad operativa asociada a una función concreta dentro de una sede o punto de servicio.

La estación puede servir para:

- caja;
- atención de mostrador;
- preparación de barra;
- preparación de cocina;
- entrega;
- impresión;
- otra función aprobada posteriormente.

La estación no es un dispositivo.

Una estación puede ser atendida por distintos actores y utilizar distintos dispositivos a lo largo del tiempo.

---

#### 9. Dispositivo y estación

Se conserva la separación:

```text
ESTACIÓN
!=
DISPOSITIVO
!=
ACTIVO
!=
ENDPOINT
!=
ACTOR HUMANO
```

La asociación de terminales compartidas, `station_instance_id`, dispositivos y actor efectivo pertenece a los contratos de dispositivos y autorización posteriores.

Esta tarea no deriva permisos desde la ubicación física de un dispositivo.

---

#### 10. Mesa

Una mesa es una entidad física atendible dentro de una sede.

Debe conservar:

- identidad técnica estable;
- `site_id`;
- zona física vigente;
- número visible cuando está activa;
- nombre visible cuando aplique;
- capacidad;
- forma y metadatos de layout cuando correspondan;
- estado activo/inactivo;
- historial independiente de sesiones y pedidos.

Una mesa no es una sesión ni un pedido.

---

#### 11. Identidad de mesa y número visible

La identidad técnica de la mesa no depende del número que ve el operador.

```text
TABLE_ID ESTABLE
!=
TABLE_NUMBER VISIBLE
```

El número puede cambiar mediante configuración gobernada; la identidad histórica no cambia con él.

---

#### 12. Regla de numeración de mesas

La numeración canónica se define así:

1. el número visible es un entero positivo;
2. debe ser único entre las mesas activas de la misma sede;
3. no codifica la zona física;
4. una mudanza entre zonas no renumera automáticamente la mesa;
5. un cambio de número es una operación explícita de configuración;
6. la historia conserva la identidad técnica de la mesa y el contexto aplicable;
7. no se resuelve identidad histórica únicamente por `table_number`.

Por tanto:

```text
MESA 7 EN TERRAZA
→ mover a SALÓN
→ sigue siendo la misma mesa
→ mantiene identidad
→ conserva número salvo decisión explícita
```

---

#### 13. Agrupación primaria de mesas

La agrupación física primaria de las mesas es su zona.

```text
SEDE
→ ZONA
→ MESAS
```

La asignación temporal a mesero, turno, sector operativo o responsable no crea una nueva zona física.

---

#### 14. Agrupaciones operativas temporales

PULSO podrá presentar agrupaciones temporales derivadas de la operación, por ejemplo:

- mesas asignadas a un actor;
- mesas con cuenta abierta;
- mesas con llamado pendiente;
- mesas por estado de servicio.

Estas agrupaciones son vistas operativas.

No modifican la zona física propietaria de cada mesa.

---

#### 15. Estado activo e histórico

Una mesa o zona inactiva no debe recibir nuevas sesiones ordinarias.

La inactivación no elimina:

- pedidos históricos;
- sesiones anteriores;
- eventos;
- evidencia de atención;
- vínculos de auditoría.

La configuración física no puede borrar historia para simplificar el mapa actual.

---

#### 16. Cambios con trabajo abierto

No se debe retirar, renumerar o mover una mesa de forma que oculte trabajo activo.

Antes de aplicar un cambio material deberán considerarse:

- sesión de mesa abierta;
- pedido activo;
- cuenta pendiente;
- llamado de servicio;
- asignación de atención;
- eventos todavía no conciliados.

La tarea de configuración no resuelve esas operaciones; exige que no sean ocultadas.

---

#### 17. Zonas visibles de Vento Café

La sede física activa de Vento Café tiene como espacios de atención presencial confirmados:

- `Terraza`;
- `Salón climatizado`.

Esas dos identidades constituyen las zonas de servicio visibles que deben alimentar el mapa de salón.

No se convierten en zonas POS adicionales por el solo hecho de existir:

- Cocina;
- Barra;
- Caja / mostrador.

Esos elementos se modelan como áreas o puntos/estaciones según su función.

---

#### 18. Áreas operativas de Vento Café

La línea base aprobada distingue tres áreas operativas:

- Servicio / Salón;
- Cocina;
- Barra.

Caja y mostrador constituyen un único punto dentro de Servicio / Salón.

La configuración POS deberá conservar esa distinción.

---

#### 19. Punto de caja y mostrador de Vento Café

Vento Café tiene un único punto físico confirmado de:

```text
CAJA
+
MOSTRADOR
=
UN PUNTO INTEGRADO
```

Ese punto atiende:

- venta de mostrador;
- cobro;
- entrega de pedidos externos según operación vigente.

No se crearán dos puntos distintos de caja y mostrador mientras la realidad física permanezca integrada.

---

#### 20. Pickup externo de Vento Café

Los pedidos de Rappi y domicilios se entregan actualmente desde el mismo punto de caja y mostrador.

Por tanto:

```text
RAPPI
DOMICILIO
MOSTRADOR
→ pueden tener canales distintos
→ comparten punto físico de entrega actual
```

El canal del pedido no crea una zona física.

---

#### 21. Estaciones de Vento Café

La configuración documental reconoce como funciones físicas diferenciadas:

- Caja / Mostrador;
- Barra;
- Cocina.

Su materialización técnica deberá preservar el `site_id` de Vento Café y no convertir la estación en autoridad sobre el actor.

---

#### 22. Zonas visibles de Saudo

Saudo cuenta con un único local físico activo.

Las zonas de atención presencial confirmadas son:

- `Terraza`;
- `Salón interior`.

Saudo funciona como una única área operativa integral, aunque dentro de ella existan puntos con funciones diferentes.

---

#### 23. Punto integrado de Saudo

Saudo posee un punto físico integrado de:

```text
CAJA
+
MOSTRADOR
+
BARRA
=
UN PUNTO INTEGRADO
```

La configuración no debe duplicarlo en tres puntos físicos por sus capacidades funcionales.

---

#### 24. Pickup externo de Saudo

Los pedidos externos se entregan actualmente desde el mismo punto integrado de caja y mostrador.

Rappi, ManyChat u otro canal no genera por sí mismo una zona ni un punto adicional.

---

#### 25. Cocina de Saudo

Saudo cuenta con cocina integrada.

La cocina se reconoce como función/estación de preparación dentro de la operación integral de la sede.

No se convierte en zona de mesas.

---

#### 26. Zonas visibles de Molka

Molka cuenta con un único local físico activo.

Las zonas de atención presencial confirmadas son:

- `Terraza`;
- `Salón interior`.

Molka funciona como una única área operativa integral.

---

#### 27. Punto integrado de Molka

Molka posee un punto físico integrado de:

```text
CAJA
+
MOSTRADOR
+
BARRA
=
UN PUNTO INTEGRADO
```

Ese mismo punto atiende la entrega de pedidos externos según la operación vigente.

---

#### 28. Cocina de Molka

Molka no cuenta con cocina productiva propia confirmada.

Por tanto esta tarea no define una estación de cocina productiva para Molka.

Si una observación futura demuestra un punto de preparación distinto, deberá incorporarse mediante la tarea propietaria correspondiente y no por inferencia.

---

#### 29. Matriz física canónica por sede

| Sede / marca visible | Zonas de servicio visibles | Punto comercial principal | Pickup Rappi / domicilio | Preparación diferenciada confirmada |
| --- | --- | --- | --- | --- |
| Vento Café | Terraza; Salón climatizado | Caja / Mostrador integrados | Mismo punto Caja / Mostrador | Barra; Cocina |
| Saudo | Terraza; Salón interior | Caja / Mostrador / Barra integrados | Mismo punto integrado | Cocina integrada |
| Molka | Terraza; Salón interior | Caja / Mostrador / Barra integrados | Mismo punto integrado | no se define cocina productiva propia |

Esta matriz define la estructura física conocida; no fija todavía cantidades reales de mesas ni coordenadas.

---

#### 30. Conteo real de mesas

Las fuentes canónicas verificadas no contienen un conteo completo y confiable de mesas activas por sede.

Por tanto:

```text
CANTIDAD REAL DE MESAS
→ dato de configuración por site_id
→ no se inventa en OPS-POS-001
```

La materialización deberá cargar únicamente el inventario real validado para cada sede.

---

#### 31. Catálogo mínimo requerido por sede

Antes de materializar una configuración POS, cada sede deberá disponer de un catálogo verificable con:

- `site_id` canónico;
- zonas activas;
- orden visual de zonas;
- mesas activas;
- número visible de cada mesa;
- zona propietaria de cada mesa;
- capacidad;
- layout cuando aplique;
- puntos físicos de servicio;
- funciones disponibles en cada punto;
- estaciones operativas;
- condición activa/inactiva;
- referencia de cambio o evidencia de aprobación.

La presente tarea define el contrato; no llena datos no observados.

---

#### 32. Compatibilidad con `pos_zones`

El runtime AS-IS consulta actualmente `pos_zones` con campos equivalentes a:

- identidad;
- `site_id`;
- nombre;
- color;
- orden de presentación;
- condición activa.

La definición de esta tarea es compatible con esa superficie, pero no convierte su shape actual en contrato de almacenamiento definitivo.

---

#### 33. Compatibilidad con `pos_tables`

El runtime AS-IS consulta actualmente `pos_tables` con información equivalente a:

- identidad;
- `site_id`;
- zona;
- nombre;
- número de mesa;
- forma;
- capacidad;
- posición;
- rotación;
- dimensiones;
- condición activa.

Estos campos demuestran una representación existente del mapa.

No demuestran por sí solos que los datos actuales de las tres sedes estén completos o gobernados.

---

#### 34. Color de zona

El color es presentación.

```text
COLOR
!=
ESTADO
!=
PERMISO
!=
PRIORIDAD
```

Un cambio visual no puede modificar semántica de autorización o servicio.

---

#### 35. Orden de presentación

El orden de zonas es configuración explícita por sede.

No se deriva automáticamente de:

- orden alfabético;
- creación técnica;
- nombre de marca;
- identificador UUID;
- ubicación en otra sede.

El runtime podrá consumir un orden explícito sin que ese orden cambie la identidad de la zona.

---

#### 36. Layout de mesas

Forma, posición, rotación y dimensiones son metadatos de representación del mapa.

No son:

- autorización;
- estado de ocupación;
- sesión;
- pedido;
- cuenta;
- propiedad de actor.

Su ajuste no altera por sí solo el proceso empresarial.

---

#### 37. Capacidad de mesa

La capacidad representa una característica física o de servicio de la mesa.

No equivale al número actual de comensales de una sesión.

```text
CAPACIDAD CONFIGURADA
!=
PAX DE SESIÓN
```

---

#### 38. Sesión de mesa

La mesa puede tener múltiples sesiones a lo largo del tiempo.

```text
MESA
1
→ 0..N SESIONES HISTÓRICAS
```

Una sesión abierta no cambia la identidad física de la mesa.

---

#### 39. Estado visual de mesa

El runtime actual deriva estados visuales a partir de mesa activa, sesión y llamados.

Ese estado es una proyección operativa.

No debe almacenarse como sustituto de los hechos propietarios que lo originan.

---

#### 40. Llamados de servicio

Los llamados se correlacionan con sede, zona, mesa y sesión cuando aplique.

Un llamado no crea una mesa ni modifica su zona.

La configuración física debe permitir relacionarlos sin cruces entre sedes.

---

#### 41. Aislamiento por sede

Toda lectura o mutación futura sobre zonas y mesas deberá respetar el `site_id` autorizado.

No se admite:

- mostrar zonas de otra sede;
- asociar una mesa con una zona de otra sede;
- abrir sesión sobre mesa de otra sede;
- resolver un llamado de otra sede por coincidencia de número;
- trasladar identidad entre sedes por nombre.

---

#### 42. Zona y autorización

La limitación del archivo propietario se convierte en regla explícita:

```text
ZONA FÍSICA
!=
ÁREA DE AUTORIZACIÓN
```

Una zona como `Terraza` o `Salón interior` puede participar en contexto operativo, pero no concede autoridad por sí sola.

La autorización deberá resolver actor, sede, área/contexto y permiso mediante contratos propios.

---

#### 43. Estación y autorización

Una estación tampoco concede autoridad por su nombre.

```text
ESTACIÓN CAJA
!=
PERMISO DE COBRO

ESTACIÓN COCINA
!=
PERMISO DE PRODUCCIÓN
```

La estación aporta contexto físico/operativo; el permiso pertenece al sistema de autorización.

---

#### 44. Canales y puntos físicos

El canal comercial permanece separado del punto físico:

```text
MESA
MOSTRADOR
RAPPI
MANYCHAT
DOMICILIO
OTRO CANAL
!=
ZONA FÍSICA POR DEFINICIÓN
```

El pedido conserva su canal, mientras el punto de preparación o entrega se resuelve por configuración y estado operativo.

---

#### 45. Pickup de pedidos externos

La línea base actual es:

- Vento Café: Caja / Mostrador;
- Saudo: punto integrado Caja / Mostrador;
- Molka: punto integrado Caja / Mostrador.

No existe evidencia canónica que justifique crear hoy una zona separada llamada `Rappi`, `Domicilios` o equivalente.

---

#### 46. Configuración futura de un pickup separado

Si una sede crea físicamente un punto de pickup independiente, el cambio deberá registrar de forma explícita:

- sede;
- punto nuevo;
- función;
- canales atendidos;
- ubicación;
- vigencia;
- relación con estaciones/dispositivos;
- impacto en la experiencia;
- validación operativa.

El sistema no lo inferirá porque aumente el volumen de un canal.

---

#### 47. Configuración administrativa

La gestión futura de zonas, mesas, tipos de pedido y reglas de entrega corresponde a una capacidad administrativa PULSO separada de la operación diaria.

Una pantalla operativa de salón no debe convertirse implícitamente en editor de configuración para cualquier actor.

Los permisos y responsables exactos se desarrollan en las tareas PULSO-AUTH posteriores.

---

#### 48. Reglas de cambio de configuración

Todo cambio material debe ser:

- explícito;
- atribuible;
- acotado a sede;
- validado contra trabajo abierto;
- compatible con historial;
- reversible o corregible sin borrar evidencia;
- visible para consumidores afectados cuando corresponda.

No se admite una edición silenciosa que cambie el significado de una mesa histórica.

---

#### 49. Baja de zona

Una zona solo puede dejar de ofrecerse para nuevas operaciones cuando:

- ninguna mesa activa dependa de ella o las mesas hayan sido reasignadas de forma válida;
- no se oculte una sesión abierta;
- no se pierdan llamados o pedidos vinculados;
- el historial conserve la zona original.

La baja lógica no elimina evidencia.

---

#### 50. Baja de mesa

Una mesa inactiva:

- deja de ofrecerse para nuevas sesiones;
- conserva su identidad;
- conserva historial;
- no transfiere automáticamente su número a otra mesa;
- no borra cuentas ni pedidos anteriores.

La reutilización eventual de un número visible requiere validación de que no produzca ambigüedad operativa o histórica.

---

#### 51. Movimiento entre zonas

Mover una mesa entre zonas implica modificar su agrupación física vigente.

No implica:

- crear una mesa nueva;
- cerrar automáticamente una sesión;
- cancelar pedidos;
- cambiar `site_id`;
- cambiar permisos del actor;
- renumerar automáticamente.

---

#### 52. Cambio entre sedes

Una mesa no se mueve entre sedes como simple cambio de `zone_id`.

La sede forma parte de su alcance físico.

Cualquier traslado físico entre sedes requiere una decisión de configuración que preserve historia y evite reutilizar identidad técnica de forma ambigua.

---

#### 53. Consumo por VSCREEN-0082

`VSCREEN-0082 — Mapa de salón y mesas` debe consumir la configuración física de la sede autorizada.

El mapa presenta:

- zonas activas;
- mesas activas;
- layout configurado;
- estados derivados de operación;
- llamados compatibles.

No inventa zonas ni corrige datos maestros durante render.

---

#### 54. Consumo por inicios de PULSO

La configuración alimenta posteriormente:

- `PULSO-UX-002` — inicio para cajero;
- `PULSO-UX-003` — inicio para servicio de salón;
- `PULSO-UX-004` — inicio para mostrador;
- `PULSO-UX-005` — inicio para operador integral;
- `PULSO-UX-006` — inicio para supervisor.

Cada inicio podrá proyectar solo los puntos y zonas necesarios para su actor y contexto.

---

#### 55. Consumo por experiencia táctil

`PULSO-UX-015` podrá reutilizar:

- agrupación por zona;
- identidad de mesa;
- puntos integrados;
- estaciones;
- layout;
- prioridades de interacción derivadas del contexto.

Esta tarea no diseña componentes táctiles ni navegación.

---

#### 56. Consumo por dispositivos compartidos

La configuración podrá aportar contexto de estación o punto de servicio a dispositivos compartidos.

No define:

- qué dispositivo se instala;
- credenciales;
- principal técnico;
- PIN del trabajador;
- sesión de dispositivo;
- permiso efectivo.

Esos contratos permanecen separados.

---

#### 57. Frontera con FOGO

Cocina y barra pueden aparecer como estaciones o destinos operativos en PULSO, pero PULSO no se convierte en propietario de:

- recetas;
- órdenes productivas FOGO;
- lote;
- calidad productiva;
- producción autoritativa.

La estación de preparación es contexto del pedido, no copia del dominio FOGO.

---

#### 58. Frontera con NEXO

Una zona POS de atención al cliente no es una ubicación de inventario NEXO.

```text
ZONA POS
!=
LOC
!=
UBICACIÓN DE STOCK
```

PULSO no derivará existencias desde la ubicación visual de una mesa o estación.

---

#### 59. Frontera con PASS

Una mesa, zona o punto de servicio no define identidad de cliente ni ledger de fidelización.

PASS conserva su dominio incluso cuando la identificación o redención ocurre desde una estación PULSO.

---

#### 60. Frontera con NUMERA

Un punto de caja representa contexto operativo de cobro.

No es por sí mismo:

- cuenta contable;
- centro de costo;
- obligación;
- hecho económico reconocido;
- conciliación financiera.

NUMERA conserva la autoridad sobre su dominio.

---

#### 61. Frontera con autorización PULSO

La tarea siguiente de ruta es `PULSO-AUTH-001`.

El handoff de OPS-POS-001 hacia autorización contiene:

- universo de sedes comerciales relevantes;
- zonas físicas de servicio;
- puntos integrados;
- estaciones conocidas;
- aislamiento requerido por `site_id`;
- prohibición de convertir zona o estación en permiso.

PULSO-AUTH decidirá quién puede ver o actuar sobre esas superficies.

---

#### 62. Estado AS-IS del runtime de salón

El runtime `vento-pulso` observado ya:

- filtra `pos_zones` por `site_id`;
- filtra `pos_tables` por `site_id`;
- consulta sesiones abiertas por sede;
- consulta llamados por sede;
- ordena zonas mediante configuración de presentación;
- utiliza número, nombre, capacidad y layout de mesa;
- deriva estados visuales desde hechos operativos.

Esto constituye compatibilidad parcial con el contrato definido aquí.

No demuestra que la administración del catálogo físico esté completa ni gobernada.

---

#### 63. Datos no confirmados que no se inventan

Esta tarea no inventa:

- UUID de sedes;
- número real de mesas por sede;
- numeración actual exacta heredada de Makos;
- coordenadas reales del layout;
- dimensiones reales de cada mesa;
- capacidad exacta de cada mesa;
- cantidad de terminales;
- ubicación de impresoras;
- nombres técnicos definitivos de estaciones;
- permisos de configuración;
- hardware instalado.

Esos datos deberán provenir de evidencia real antes de materialización.

---

#### 64. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea concreta una configuración documental cubierta por requisitos ya registrados; no introduce una conducta de prueba nueva que exija modificar el Registro 04A.

---

#### 65. Cobertura de prueba vigente reutilizada

Cobertura vigente relevante, sin modificación:

- `TREQ-PULSO-005` — separa mesa, sesión, cuenta y venta, conserva sede y exige reglas versionadas por sede, área, estación y dispositivo;
- `TREQ-PULSO-018` — obliga a limitar `/salon`, zonas, mesas, sesiones y llamados a la sede autorizada;
- `TREQ-AUTH-001` — impide derivar autoridad final de listas locales o contexto no gobernado;
- `TREQ-AUTH-011` — separa autoridad del dispositivo compartido y actor real;
- `TREQ-AUTH-013` — exige validación server-side de permiso, actor, territorio, estado y columnas en mutaciones;
- `TREQ-AUTH-015` — exige evidencia correlacionable de actor, sede, área, dispositivo, permiso, recurso, decisión y tiempo;
- `TREQ-AUTH-019` — mantiene separadas identidad de dispositivo, endpoint, activo, estación y actor humano.

La mención de estos IDs es trazabilidad histórica y no actualiza el Registro 04A.

---

#### 66. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; la tarea no materializa código |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local canónico durante la redacción |
| REMOTA | PASS | se verificaron `vento-shell` y `vento-pulso`, owner files, ruta, topología, E1, E2, 04A, modelo de salón y runtime vigente |
| OPERATIVA | NOT_EXECUTED | no se realizó conteo físico de mesas ni recorrido de sedes durante esta tarea |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existe instancia física propia |

La evidencia REMOTA valida el contrato documental, no la exactitud de cantidades de mobiliario no observadas.

---

#### 67. Criterios de aceptación

- [ ] Vento Café, Saudo y Molka quedan separados por sede y contexto comercial.
- [ ] Se conserva que cada marca tiene actualmente un local físico activo.
- [ ] Se define `site_id` como alcance técnico de configuración sin inventar UUID.
- [ ] Se distinguen marca, sede, área, zona, punto, estación, mesa, dispositivo y autorización.
- [ ] Vento Café conserva zonas Terraza y Salón climatizado.
- [ ] Vento Café conserva Caja / Mostrador como un único punto integrado.
- [ ] Vento Café entrega Rappi y domicilios en el mismo punto de Caja / Mostrador.
- [ ] Vento Café conserva Barra y Cocina como funciones/estaciones diferenciadas.
- [ ] Saudo conserva Terraza y Salón interior.
- [ ] Saudo conserva Caja / Mostrador / Barra como un único punto integrado.
- [ ] Saudo conserva Cocina integrada como función de preparación.
- [ ] Saudo entrega pedidos externos en su punto integrado.
- [ ] Molka conserva Terraza y Salón interior.
- [ ] Molka conserva Caja / Mostrador / Barra como un único punto integrado.
- [ ] Molka entrega pedidos externos en su punto integrado.
- [ ] No se inventa cocina productiva propia para Molka.
- [ ] Rappi, ManyChat y domicilio permanecen canales, no zonas físicas.
- [ ] El número visible de mesa es único entre mesas activas de una sede.
- [ ] El número no sustituye la identidad técnica de la mesa.
- [ ] El movimiento entre zonas no renumera automáticamente.
- [ ] No se inventa conteo real de mesas.
- [ ] Se conserva compatibilidad conceptual con `pos_zones` y `pos_tables` sin convertir el shape AS-IS en storage contract definitivo.
- [ ] Zona y estación no conceden permisos.
- [ ] Estación y dispositivo permanecen separados.
- [ ] Zona POS y ubicación NEXO permanecen separadas.
- [ ] El cambio de configuración no oculta sesiones, pedidos, cuentas o llamados abiertos.
- [ ] El handoff hacia `PULSO-AUTH-001` queda completo.
- [ ] No se crean ni modifican TREQ.
- [ ] No se ejecutan cambios físicos.

---

#### 68. Límites

Esta tarea no:

- implementa `pos_zones` ni `pos_tables`;
- crea datos de zona o mesa;
- define UUID de sedes;
- inventaría físicamente mobiliario;
- diseña permisos de cajero o supervisor;
- diseña la autorización de `/salon`;
- asigna terminales o dispositivos;
- define credenciales o PIN;
- diseña pantallas de administración completas;
- define hardware;
- diseña el inicio del cajero;
- diseña el inicio de salón;
- diseña el inicio de mostrador;
- diseña el inicio del operador integral;
- diseña el inicio del supervisor;
- diseña la experiencia táctil final;
- cambia FOGO, NEXO, PASS o NUMERA;
- crea tablas, columnas, constraints o índices;
- crea funciones, RPC, triggers, Edge Functions, colas o workers;
- modifica RLS o grants;
- ejecuta migraciones;
- modifica Supabase o datos remotos;
- modifica el Registro 04A;
- ejecuta E5;
- crea una instancia física propia.

**Dependencias:** cierre de E2 y `PULSO-UX-001`.  
**Propósito:** definir para Vento Café, Saudo y Molka las zonas visibles, numeración y agrupación de mesas, puntos de caja, mostrador, entrega de domicilios y Rappi, estaciones y reglas de configuración por sede.  
**Continuidad:** alimenta `PULSO-UX-002` a `PULSO-UX-006`, `PULSO-UX-015`, dispositivos compartidos y contratos de pantallas.  
**Límite:** la zona física no se convierte automáticamente en área de autorización; la relación deberá validarse contra el contexto canónico.

---

#### 69. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-001 — Inventariar procesos de venta, caja y salón`

**TAREA ACTUAL APROBADA**
`OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-001 — Inventariar vistas POS`
