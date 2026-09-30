### MINI-BLOQUE — AUTORIZACIÓN DE MARKETING Y CANALES

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización de marketing y canales** dentro de **W AURA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AURA-AUTH-001` a `AURA-AUTH-004` — 4 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AURA-AUTH-001`: Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función
- `AURA-AUTH-002`: Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública
- `AURA-AUTH-003`: Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas
- `AURA-AUTH-004`: Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AURA-AUTH -->
### Reconciliación topológica de AURA-AUTH-001 a AURA-AUTH-004

Las cuatro tareas protegen físicamente marcas, campañas, datos, promociones, credenciales y proveedores. Solo pueden materializarse después de E5 y después de la decisión de continuidad exigida por AURA.

| modalidad | `PER_IMPLEMENTATION_UNIT` |
| gate temporal | `POST_E5_PACKAGE` |

### ✅ AURA-AUTH-001 — Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-010 — Definir radar de oportunidades y recomendaciones comerciales explicables
**Tarea siguiente:** AURA-AUTH-002 — Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública
**Tipo de tarea:** documental; contrato canónico de autorización de AURA por empresa, marca, función, capacidad y recurso, con materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE W — AURA — autorización de marketing y canales
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/03_AUTORIZACION_DE_MARKETING_Y_CANALES.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`; contrato de autorización definido y futura materialización reservada a `AURA-AUTH-001::<implementation_unit_id>` únicamente después de `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea; no se crean permisos, grants, asignaciones, RLS, políticas, tablas, funciones, RPC, rutas, cuentas, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá proteger su universo funcional por empresa, marca, función empresarial, capacidad y recurso, de forma que una persona o principal solo pueda leer, investigar, comparar o actuar sobre aquello para lo cual posee autoridad explícita y vigente.

La tarea toma el handoff de `AURA-DOM-010` y protege, como mínimo:

- marcas;
- campañas;
- activos;
- audiencias;
- canales;
- resultados;
- métricas consumidas;
- señales;
- oportunidades;
- recomendaciones;
- diagnósticos;
- evidencia;
- explicaciones;
- restricciones;
- guardas;
- decisiones;
- exportaciones o vistas posteriores.

La decisión raíz es:

```text
ACCESO A AURA
!=
AUTORIZACION SOBRE TODOS LOS RECURSOS DE AURA
```

Y además:

```text
ROL O FUNCION EMPRESARIAL
!=
PERMISO FINAL
```

```text
EMPRESA AUTORIZADA
!=
TODAS SUS MARCAS POR INFERENCIA
```

```text
MARCA AUTORIZADA
!=
TODOS LOS CANALES, CAMPANAS, ACTIVOS, AUDIENCIAS Y RESULTADOS RELACIONADOS
```

La autorización final deberá resultar de la intersección explícita de identidad confiable, capacidad, alcance, recurso, contexto, estado y restricciones aplicables.

---

#### 2. Naturaleza y topología

La topología canónica aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto:

- esta tarea define una sola vez el contrato documental que toda materialización futura deberá respetar;
- no crea una instancia física desde el carril documental;
- cada materialización futura deberá usar la identidad `AURA-AUTH-001::<implementation_unit_id>`;
- una misma `implementation_unit_id` no podrá materializarse más de una vez para esta tarea;
- ninguna instancia podrá abrirse antes de que el paquete y la unidad correspondientes satisfagan `POST_E5_PACKAGE`;
- la existencia del contrato documental no demuestra que AURA tenga repositorio, runtime, rutas o controles físicos implementados;
- la decisión de continuidad de AURA y la admisión física permanecen fuera de esta tarea documental.

La documentación no cruza el gate temporal ni simula una implementación inexistente.

---

#### 3. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, para marcas, identidad, mensajes, claims, restricciones y vigencia;
- `AURA-DOM-002`, para objetivos, audiencias, briefs, calendarios, presupuesto y dependencias;
- `AURA-DOM-003`, para activos, derechos, versiones, reutilización y usos permitidos;
- `AURA-DOM-004`, para grounding, asistencia de IA, memoria, proveedores y revisión humana;
- `AURA-DOM-005`, para cuentas, medios, publicación, programación, retiro y reconciliación por canal;
- `AURA-DOM-006`, para campañas, experimentos, promociones, cupones y guardas;
- `AURA-DOM-007`, para oportunidades, leads, pipeline B2B y transferencia a operación;
- `AURA-DOM-008`, para métricas, atribución, confianza, incrementalidad y aprendizaje;
- `AURA-DOM-009`, para reputación, respuesta pública y escalamiento a servicio;
- `AURA-DOM-010`, para señales, diagnósticos, oportunidades, recomendaciones, evidencia, explicaciones, restricciones, guardas y decisiones;
- el modelo transversal vigente de identidad, permisos, recursos, alcance, contexto y autorización final de Vento OS;
- el catálogo vigente, en el que `aura.access` representa únicamente acceso general a la superficie de AURA y no autorización total;
- `VPROC-0056`, como proceso canónico de contenido y promociones;
- `VPROC-0057`, como proceso canónico de oportunidades digitales;
- el registro 04A vigente de AURA y los requisitos transversales de autorización, servidor, Supabase e integración relacionados.

Ninguna de esas fuentes se modifica desde esta tarea.

---

#### 4. Resultado canónico

AURA deberá poder decidir una solicitud de acceso o acción material a partir de un contrato que responda, como mínimo:

1. quién es el principal autenticado;
2. cuál es el actor efectivo cuando corresponda;
3. qué capacidad exacta se solicita;
4. sobre qué recurso exacto se solicita;
5. a qué empresa u organización pertenece o se vincula el recurso;
6. a qué marca o conjunto explícito de marcas pertenece o se vincula;
7. qué función empresarial está actuando y con qué autoridad demostrable;
8. qué canal, cuenta, campaña, activo, audiencia u otra dimensión contextual aplica;
9. cuál es el estado vigente del recurso;
10. qué restricciones de derechos, finalidad, privacidad, vigencia o negocio aplican;
11. qué concesiones y denegaciones vigentes afectan la decisión;
12. qué versión de catálogo, alcance y política produjo la decisión;
13. cuál es el resultado final;
14. qué evidencia mínima permite auditarlo sin exponer secretos ni datos innecesarios.

Si una dimensión obligatoria no puede resolverse de forma confiable, la operación protegida deberá bloquearse de forma segura.

---

#### 5. Ecuación de autorización AURA

El contrato conceptual queda:

```text
AUTORIZACION_AURA
=
PRINCIPAL_CONFIABLE
+ ACTOR_EFECTIVO_CUANDO_APLIQUE
+ CAPACIDAD_EXACTA
+ EMPRESA_AUTORIZADA
+ MARCA_AUTORIZADA_CUANDO_APLIQUE
+ FUNCION_EMPRESARIAL_COMPATIBLE
+ RECURSO_RESUELTO
+ CONTEXTO_COMPATIBLE
+ ESTADO_COMPATIBLE
+ RESTRICCIONES_SATISFECHAS
- DENEGACIONES
```

La fórmula es semántica y no crea una API ni una estructura física.

No será suficiente por sí solo ninguno de estos elementos:

- el nombre del rol;
- el cargo;
- la visibilidad de una opción en UI;
- conocer una URL;
- conocer un ID o slug;
- pertenecer a una empresa;
- pertenecer a una marca;
- haber creado el recurso;
- haber participado en la campaña;
- haber tenido acceso anteriormente;
- poseer `aura.access`;
- usar una cuenta técnica;
- usar `service role`;
- recibir una referencia desde otro dominio.

---

#### 6. `aura.access` permanece como acceso base, no como autoridad material

Se preserva la semántica transversal vigente:

```text
aura.access
=
ENTRAR A LA SUPERFICIE GENERAL DE AURA
```

pero:

```text
aura.access
!=
LEER TODAS LAS MARCAS
!=
LEER TODAS LAS CAMPANAS
!=
LEER TODAS LAS AUDIENCIAS
!=
LEER TODOS LOS RESULTADOS
!=
MUTAR RECURSOS
!=
PUBLICAR
!=
EXPORTAR
!=
ADMINISTRAR CREDENCIALES
```

Mientras AURA continúe funcionalmente diferida, una concesión histórica o reservada de `aura.access` no habilita uso productivo ni invalida los bloqueos vigentes de continuidad.

---

#### 7. Capacidades exactas y prohibición de autorización por nombre de rol

Toda lectura o acción material deberá resolverse mediante una capacidad canónica exacta.

Se prohíbe usar como autorización final:

- `if role === "marketing"` o equivalentes conceptuales;
- listas locales de nombres de rol;
- nombres de cargo;
- etiquetas como `RESPONSABLE_DE_MARCA` o `RESPONSABLE_COMERCIAL` sin evaluación de capacidad y alcance;
- pertenencia genérica a Marketing;
- propiedad presumida por haber creado el recurso;
- una bandera visual o un menú visible.

Los actores funcionales de los procesos expresan responsabilidad empresarial y elegibilidad para participar; no sustituyen el evaluador canónico de autorización.

Los ejemplos históricos o conceptuales de permisos AURA no se convierten por esta tarea en catálogo definitivo. Toda clave futura deberá existir en el catálogo canónico vigente antes de ser consumida por código.

---

#### 8. Alcance por empresa u organización

Todo recurso AURA que pertenezca o se vincule materialmente a una empresa u organización deberá resolver esa relación desde una fuente canónica y no desde texto libre.

Reglas:

1. una autorización para una empresa no se extiende a otra por pertenecer ambas a Vento Group;
2. una selección de empresa en interfaz no amplía el alcance efectivo;
3. el nombre visible de una empresa no sustituye su identidad canónica;
4. una relación de consumo o integración entre empresas no concede lectura cruzada;
5. un recurso corporativo realmente transversal deberá declarar esa naturaleza de forma explícita;
6. la ausencia de empresa en un recurso que la requiere no significa alcance global;
7. una empresa deshabilitada, retirada o fuera de vigencia no permanece operable por caché o selección previa.

El cruce de empresas deberá ser una decisión explícita del alcance autorizado, nunca una consecuencia implícita de una vista agregada.

---

#### 9. Alcance por marca

La marca es una dimensión de autorización independiente cuando el recurso la declare o su semántica dependa de ella.

Se preserva:

```text
EMPRESA
!=
MARCA
```

Y:

```text
ACCESO A MARCA A
!=
ACCESO A MARCA B
```

aunque ambas pertenezcan a la misma organización.

Reglas:

1. un actor con autoridad sobre una marca no adquiere marcas hermanas por inferencia;
2. un recurso multimarcas deberá declarar las marcas relacionadas de forma verificable;
3. para una acción que afecte varias marcas, la autoridad deberá cubrir el conjunto requerido o existir una autorización transversal explícita;
4. la marca seleccionada en filtros o navegación no es autoridad;
5. una campaña, activo o resultado no heredará otra marca solo por compartir producto, canal, audiencia o creador;
6. cambiar de marca un recurso es un cambio material que exige reevaluación de autoridad;
7. una marca ausente donde es obligatoria produce bloqueo, no wildcard.

---

#### 10. Función empresarial

La dimensión de función responde a para qué responsabilidad empresarial actúa la persona o principal, no simplemente a qué rol nominal tiene.

AURA deberá poder distinguir, cuando aplique, funciones como:

- responsabilidad de marca;
- responsabilidad comercial;
- gerencia;
- análisis;
- servicio;
- operación de canal;
- revisión o control especializado.

La lista anterior describe responsabilidades existentes en el modelo empresarial y no crea roles ni permisos nuevos.

Una misma persona puede ejercer varias funciones. La autorización deberá usar únicamente la función compatible con la capacidad, recurso y contexto solicitados.

No se permite usar una función válida en un proceso para ampliar autoridad sobre otro proceso no relacionado.

---

#### 11. Intersección de empresa, marca y función

La autorización no se resuelve como unión automática de dimensiones.

Se conserva:

```text
EMPRESA AUTORIZADA
+
MARCA AUTORIZADA
+
FUNCION COMPATIBLE
+
CAPACIDAD EXACTA
+
RECURSO COMPATIBLE
=
AUTORIZACION POSIBLE
```

No significa autorización garantizada, porque todavía pueden aplicar:

- denegaciones;
- estado del recurso;
- derechos de activo;
- consentimiento;
- finalidad;
- segregación de funciones;
- restricciones de canal;
- vigencia;
- bloqueo de continuidad;
- fallos estructurales o técnicos.

La autorización deberá evaluarse con la intersección efectiva de todas las restricciones aplicables.

---

#### 12. Inventario de familias de recurso protegidas

El contrato de AURA-AUTH-001 cubre el siguiente universo mínimo:

| Familia | Identidad que debe preservarse | Dimensiones mínimas de autorización | Frontera principal |
| --- | --- | --- | --- |
| marca | identidad canónica de marca | empresa + marca + función | definición de marca permanece en `AURA-DOM-001` |
| campaña | campaña y versión | empresa + marca + función + campaña | lifecycle comercial permanece en `AURA-DOM-006` |
| activo | activo, original, derivado y versión | empresa + marca + función + derechos | derechos permanecen en `AURA-DOM-003` |
| audiencia | identidad lógica de audiencia | empresa + marca + función + finalidad | datos personales, segmentos y exportaciones sensibles en `AURA-AUTH-003` |
| canal | canal, cuenta o endpoint referenciado | empresa + marca + función + canal | publicación en `AURA-AUTH-002`; credenciales en `AURA-AUTH-004` |
| resultado | métrica o resultado y su corte | empresa + marca + función + recurso origen | semántica analítica en `AURA-DOM-008` |
| señal | señal y fuente | empresa + marca cuando aplique + función + fuente | diagnóstico en `AURA-DOM-010` |
| oportunidad | oportunidad y origen | empresa + marca cuando aplique + función + oportunidad | lead/cliente/datos sensibles en `AURA-AUTH-003` |
| recomendación | recomendación y versión | empresa + marca cuando aplique + función + evidencia | aceptación no equivale a ejecución |
| diagnóstico | diagnóstico y evidencia | empresa + marca cuando aplique + función + fuentes | no promueve inferencias a hechos |
| guardas y restricciones | regla, fuente y vigencia | alcance del recurso protegido | owner material permanece en su dominio |
| decisión | decisión y versión | alcance exacto del objeto decidido | no sustituye autorización de ejecución |

Toda familia nueva que se incorpore posteriormente deberá declarar propietario, identidad, alcance y relación con autorización antes de uso productivo.

---

#### 13. Marcas

La lectura o modificación de información de marca deberá estar limitada al conjunto explícitamente autorizado.

El acceso a una marca puede permitir consultar, según la capacidad concedida, su identidad, memoria, restricciones, claims y relaciones aprobadas, pero no concede por sí solo:

- editar la marca;
- aprobar claims;
- modificar activos;
- publicar contenido;
- modificar campañas;
- administrar canales;
- leer resultados de otras marcas;
- acceder a datos de clientes;
- administrar credenciales.

La autoridad sobre la marca deberá revalidarse cuando cambie su empresa propietaria, vigencia o relación empresarial material.

---

#### 14. Campañas

Una campaña conserva su identidad y versión de `AURA-DOM-006`.

La autorización deberá separar como mínimo:

- poder conocer que la campaña existe;
- poder ver su detalle;
- poder investigar su desempeño;
- poder compararla con otras campañas autorizadas;
- poder proponer cambios;
- poder ejecutar una acción material.

Las acciones concretas de creación, revisión, aprobación, programación, publicación y retiro pertenecen a `AURA-AUTH-002` y no se resuelven por esta tarea.

Una campaña multimarcas no podrá verse ni operarse íntegramente desde una autorización parcial si eso expone información de marcas fuera de alcance.

---

#### 15. Activos y derechos

El acceso a un activo deberá combinar autorización de AURA con las restricciones de derechos fijadas por `AURA-DOM-003`.

Se conserva:

```text
PUEDO VER EL ACTIVO
!=
PUEDO USARLO
!=
PUEDO TRANSFORMARLO
!=
PUEDO PUBLICARLO
```

Un activo autorizado para una marca no se reutiliza en otra por inferencia.

Cuando un activo sea compartido entre marcas, empresas, campañas o canales, su relación deberá ser explícita y su uso deberá respetar derechos, vigencia, territorio, persona autorizada, finalidad y cualquier otra restricción aplicable.

La existencia de una URL, archivo, media ID o referencia técnica no concede acceso.

---

#### 16. Audiencias

AURA-AUTH-001 protege la existencia, definición y alcance lógico de una audiencia dentro del dominio autorizado.

Separa:

```text
DEFINICION DE AUDIENCIA
!=
LISTA DE PERSONAS
!=
DATOS DE CLIENTES
!=
CONSENTIMIENTO
!=
EXPORTACION
!=
ACCION MASIVA
```

La protección detallada de segmentos, leads, datos personales, exportaciones y acciones masivas pertenece a `AURA-AUTH-003`.

Por tanto, poder consultar la definición o tamaño agregado de una audiencia no concede acceso a sus miembros, datos identificables ni capacidad de contacto.

---

#### 17. Canales, cuentas y endpoints

AURA deberá proteger por empresa, marca y función la visibilidad de canales, cuentas y endpoints relacionados.

Se conserva:

```text
VER CANAL
!=
VER CREDENCIAL
!=
PUBLICAR
!=
RESPONDER
!=
RETIRAR
```

`AURA-AUTH-002` gobierna las acciones editoriales y públicas.

`AURA-AUTH-004` gobierna credenciales, tokens y secretos.

La existencia pública de una cuenta o página no concede acceso a su configuración interna, borradores, programación, métricas privadas, tokens ni operaciones administrativas.

---

#### 18. Resultados, métricas y comparaciones

Los resultados de AURA deberán conservar el alcance de los recursos que los originaron.

Reglas:

1. ver una campaña no concede automáticamente detalle de todas sus métricas si la métrica tiene una restricción adicional;
2. ver un agregado no concede drill-down a filas o entidades fuera de alcance;
3. una comparación entre marcas exige autoridad sobre todas las marcas incluidas o una proyección agregada expresamente autorizada;
4. una comparación entre empresas exige alcance transversal explícito;
5. el resultado no debe permitir reconstruir datos restringidos mediante filtros, dimensiones pequeñas o combinaciones sucesivas;
6. el acceso histórico conserva la política aplicable al dato y no se amplía por haber tenido acceso en el pasado;
7. el acceso a resultados no autoriza modificar la fuente de verdad económica, comercial u operativa.

AURA-DOM-008 conserva definición, atribución, confianza e incrementalidad.

---

#### 19. Señales, diagnósticos y recomendaciones

Los objetos entregados por `AURA-DOM-010` deberán heredar de forma segura el alcance de sus fuentes.

Una recomendación que combine evidencia de varias empresas o marcas no podrá revelar detalles de una fuente fuera del alcance del actor.

La política deberá poder optar entre:

- entregar una proyección agregada autorizada;
- ocultar la dimensión restringida;
- exigir autoridad adicional;
- bloquear la apertura del detalle.

No se permite usar una recomendación como canal lateral para acceder a evidencia, métricas, campañas o marcas que el actor no podría consultar directamente.

---

#### 20. Oportunidades y handoffs

Las oportunidades conservan el contrato de `AURA-DOM-007`.

La autorización para ver o investigar una oportunidad deberá respetar:

- empresa;
- marca cuando aplique;
- origen;
- responsable;
- función empresarial;
- finalidad;
- referencias comerciales autorizadas.

La protección de leads, datos identificables, segmentos, exportaciones y acciones masivas pertenece a `AURA-AUTH-003`.

Una referencia a un pedido, cliente, cotización o caso comercial no concede acceso automático al dominio propietario de ese objeto.

---

#### 21. Recursos relacionados no transfieren autoridad

Se fija:

```text
RECURSO A REFERENCIA RECURSO B
!=
AUTORIZACION SOBRE RECURSO B
```

Ejemplos:

- una campaña puede referenciar un activo sin conceder autoridad para editarlo;
- una publicación puede referenciar una campaña sin conceder acceso a su presupuesto;
- una oportunidad puede referenciar una venta sin conceder acceso a PULSO;
- una recomendación puede referenciar margen sin conceder acceso financiero NUMERA;
- un canal puede referenciar una cuenta externa sin exponer credenciales;
- un resultado puede referenciar una audiencia sin exponer personas.

Cada salto de recurso deberá volver a pasar por la autorización aplicable al recurso destino.

---

#### 22. Acceso directo, IDs y prevención de IDOR

Conocer o manipular:

- un ID;
- un slug;
- una URL;
- un query parameter;
- una ruta;
- una clave externa;
- un identificador de campaña;
- un identificador de activo;
- un identificador de canal;

no concede autoridad.

El servidor deberá resolver el recurso solicitado y comprobar su empresa, marca, contexto, estado y demás dimensiones contra la autorización efectiva antes de revelar o mutar información.

Una interfaz que oculte un enlace no sustituye esta comprobación.

---

#### 23. Lectura y mutación permanecen separadas

Toda capacidad de lectura deberá permanecer separada de capacidades de mutación.

Se preserva:

```text
VIEW
!=
CREATE
!=
UPDATE
!=
APPROVE
!=
PUBLISH
!=
UNPUBLISH
!=
DELETE
!=
IMPORT
!=
UPLOAD
!=
EXPORT
```

La lista expresa acciones canónicas ya reconocidas por el modelo transversal y no crea claves de permiso AURA definitivas.

La separación detallada entre creación, revisión, aprobación, programación, publicación, retiro y respuesta pública queda reservada a `AURA-AUTH-002`.

---

#### 24. Estado del recurso

La capacidad y el alcance no bastan si el estado del recurso impide la operación.

La autorización deberá considerar, cuando aplique:

- borrador;
- en revisión;
- pendiente de aprobación;
- aprobado;
- programado;
- publicado;
- retirado;
- archivado;
- vencido;
- bloqueado;
- conciliación pendiente.

Estos nombres representan estados o conceptos ya definidos por los contratos propietarios cuando existan; esta tarea no crea una máquina paralela.

Un recurso vencido o retirado no recupera operabilidad porque el actor conserve una capacidad histórica.

---

#### 25. Visibilidad parcial y proyecciones seguras

Cuando un actor pueda conocer la existencia de un recurso pero no su detalle completo, AURA deberá poder devolver una proyección mínima segura sin filtrar información restringida.

La proyección podrá limitarse, según contrato posterior, a datos como:

- identidad no sensible;
- tipo de recurso;
- estado general visible;
- referencia necesaria para workflow;
- razón pública de indisponibilidad.

No deberá incluir por conveniencia:

- datos personales;
- secretos;
- credenciales;
- evidencia interna completa;
- presupuesto o margen no autorizado;
- miembros de audiencia;
- prompts;
- archivos privados;
- reglas internas de autorización.

Una proyección visible nunca funciona como token de autoridad para una mutación posterior.

---

#### 26. Denegación segura

La falta de autoridad deberá producir denegación segura y no una degradación permisiva.

Se deberá bloquear cuando ocurra cualquiera de estas condiciones materiales:

- principal no confiable;
- actor efectivo no resoluble;
- capacidad desconocida o inexistente;
- recurso inexistente o no resoluble;
- empresa fuera de alcance;
- marca fuera de alcance;
- función incompatible;
- estado incompatible;
- denegación explícita;
- conflicto estructural de contexto;
- política, catálogo o asignación inválidos;
- autorización revocada;
- dependencia de autorización no disponible;
- evidencia insuficiente para demostrar el alcance requerido.

Un fallo técnico no se convierte en `ALLOW` ni se presenta como si fuera una decisión empresarial afirmativa.

---

#### 27. Revocación y frescura de autorización

La autorización material no deberá mantenerse indefinidamente a partir de una decisión antigua.

Deberá reevaluarse cuando cambien, según corresponda:

- permisos;
- asignaciones;
- empresa;
- marca;
- función;
- recurso;
- estado;
- derechos;
- vigencia;
- consentimiento;
- finalidad;
- sesión;
- actor efectivo;
- política;
- catálogo;
- contexto de la solicitud.

Una mutación sensible deberá revalidar autoridad en servidor en el momento de ejecutarse.

La UI puede usar información de presentación, pero no almacenar una decisión histórica como permiso reutilizable.

---

#### 28. Service role, clientes administrativos y RLS

Una credencial técnica elevada no sustituye autorización empresarial.

Toda operación futura que utilice `service role`, `createAdminClient` o mecanismo equivalente deberá:

1. identificar un principal técnico autorizado;
2. conservar el actor empresarial cuando la acción sea humana;
3. resolver la capacidad exacta;
4. resolver el recurso en servidor;
5. aplicar empresa, marca, función y demás alcance;
6. comprobar estado y restricciones;
7. limitar la consulta o mutación al conjunto autorizado;
8. registrar evidencia auditable.

Se prohíbe usar elevación técnica para:

- omitir RLS sin control equivalente;
- consultar todas las filas y filtrar después en cliente;
- aceptar un ID enviado por cliente como autoridad;
- ampliar alcance por conveniencia;
- ocultar la identidad del actor real.

La materialización de cualquier cambio Supabase seguirá perteneciendo exclusivamente a `vento-shell` y a su lifecycle físico autorizado.

---

#### 29. Frontera con el CMS transitorio de VISO

Mientras el CMS actual continúe bajo VISO y no exista transferencia aprobada de ownership:

- las rutas actuales conservan su propietario vigente;
- conocer `/website-cms` no concede lectura;
- el acceso general a VISO no concede acceso a borradores ni contenido oculto;
- la lectura requiere la capacidad específica vigente del dominio propietario;
- AURA-AUTH-001 no duplica ni reclama esas rutas por inferencia;
- cualquier transferencia futura deberá preservar autorización, historia, consumidores y evidencia.

La futura existencia de AURA no convierte automáticamente a AURA en propietaria física del CMS vigente.

---

#### 30. Frontera con AURA-AUTH-002

`AURA-AUTH-001` define quién puede alcanzar qué universo de recursos y bajo qué empresa, marca, función, capacidad y contexto.

`AURA-AUTH-002` deberá definir la segregación concreta entre:

- creación;
- revisión;
- aprobación;
- programación;
- publicación;
- retiro;
- respuesta pública.

Por tanto:

```text
ESTAR EN ALCANCE DEL RECURSO
!=
PODER EJECUTAR CUALQUIER TRANSICION DEL RECURSO
```

Esta tarea no decide quién puede aprobar su propio trabajo ni quién puede publicar después de aprobar.

---

#### 31. Frontera con AURA-AUTH-003

`AURA-AUTH-003` conservará la protección reforzada de:

- promociones;
- segmentos;
- leads;
- datos de clientes;
- exportaciones;
- acciones masivas.

`AURA-AUTH-001` únicamente fija la frontera general de empresa, marca, función, capacidad y recurso para esos objetos cuando aparezcan como referencias dentro del universo AURA.

No autoriza extracción de miembros, PII, contacto, exportación ni activación masiva.

---

#### 32. Frontera con AURA-AUTH-004

`AURA-AUTH-004` conservará la protección de:

- credenciales;
- tokens;
- secretos;
- proveedores de IA;
- prompts gobernados;
- archivos;
- datos enviados a terceros.

Poder administrar un canal, campaña o activo no concede acceso automático a sus secretos, tokens, credenciales o payloads de integración.

---

#### 33. Frontera con experiencia e integración

Las tareas `AURA-UX-*` podrán presentar únicamente acciones y datos que el contrato de autorización permita mostrar, pero la UI no será autoridad final.

Las tareas `AURA-INT-*` deberán conservar:

- identidad de recurso;
- correlación;
- alcance;
- actor;
- idempotencia;
- reconciliación;
- resultado externo;
- límites del proveedor.

Un adapter, webhook o proveedor externo no podrá ampliar la autoridad interna.

---

#### 34. Auditoría mínima de autorización

Toda decisión material de autorización futura deberá poder reconstruir, sin almacenar secretos innecesarios:

- principal autenticado;
- actor efectivo cuando aplique;
- aplicación;
- capacidad solicitada;
- tipo e identidad del recurso;
- empresa solicitada y empresa resuelta cuando aplique;
- marca solicitada y marca resuelta cuando aplique;
- función relevante;
- contexto material;
- estado del recurso;
- resultado de autorización;
- razón o categoría de decisión segura;
- versión de política y catálogo aplicables;
- correlación de la solicitud;
- timestamp;
- acción posterior cuando exista.

La auditoría deberá permitir distinguir denegación empresarial, contrato inválido y fallo técnico sin filtrar reglas internas sensibles al cliente.

---

#### 35. Matriz obligatoria de denegaciones futuras

Cada instancia física de `AURA-AUTH-001::<implementation_unit_id>` deberá probar, cuando las superficies existan, al menos los siguientes escenarios:

| Escenario | Resultado exigido |
| --- | --- |
| actor autorizado para empresa A intenta recurso de empresa B | denegado |
| actor autorizado para marca A intenta recurso exclusivo de marca B | denegado |
| actor con `aura.access` pero sin capacidad específica intenta leer recurso protegido | denegado |
| actor con capacidad de lectura intenta mutar | denegado |
| actor conoce ID o URL de recurso fuera de alcance | denegado |
| recurso multimarcas exige cobertura superior a la del actor | denegado o proyección segura según contrato |
| función empresarial incompatible intenta operar | denegado |
| autorización revocada se reutiliza desde UI o caché | denegado |
| service role intenta ampliar filas fuera de alcance empresarial | denegado |
| fallo del backend de autorización ocurre durante acción protegida | fail-closed |
| actor autorizado y recurso dentro de todos los alcances aplicables | elegible para continuar hacia las guardas de la acción específica |

La última fila no autoriza automáticamente la transición de negocio: `AURA-AUTH-002`, `AURA-AUTH-003`, `AURA-AUTH-004` y los contratos propietarios podrán imponer condiciones adicionales.

---

#### 36. Recuperación y rollback

La futura materialización deberá disponer de recuperación sin ampliar autoridad.

Un rollback válido podrá restaurar una combinación anterior soportada de catálogo, políticas, adapters o asignaciones, pero no podrá:

- reactivar un bypass amplio;
- sustituir autorización por listas de roles;
- omitir empresa o marca;
- convertir `aura.access` en permiso total;
- habilitar por defecto recursos antes denegados;
- desactivar auditoría para recuperar disponibilidad.

Si no puede demostrarse que el rollback conserva el contrato de alcance, la operación deberá permanecer bloqueada.

---

#### 37. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. `aura.access` solo concede entrada general y nunca autorización total;
2. rol, cargo y función no son autorización final;
3. toda operación material exige capacidad canónica exacta;
4. empresa y marca son dimensiones distintas;
5. una empresa no concede automáticamente todas sus marcas;
6. una marca no concede automáticamente todos sus recursos relacionados;
7. empresa, marca, función, capacidad y recurso se intersectan; no se unen como privilegios acumulativos ilimitados;
8. la ausencia de una dimensión obligatoria no crea wildcard;
9. recursos corporativos o multimarcas deberán declarar alcance transversal explícito;
10. relaciones entre recursos no transfieren autoridad;
11. conocer ID, slug, URL o ruta no concede acceso;
12. lectura y mutación permanecen separadas;
13. el estado del recurso puede restringir una capacidad válida;
14. visibilidad de UI no es autoridad final;
15. resultados y comparaciones preservan el alcance de sus fuentes;
16. agregados no conceden drill-down fuera de alcance;
17. recomendaciones, diagnósticos y señales no sirven como canal lateral hacia evidencia restringida;
18. definición de audiencia no equivale a datos de personas;
19. ver un canal no concede credenciales ni publicación;
20. service role no sustituye autorización ni RLS equivalente;
21. la autorización sensible se revalida en servidor;
22. revocación, cambio de contexto o cambio de recurso invalidan decisiones históricas cuando corresponda;
23. el CMS transitorio de VISO conserva ownership hasta transferencia aprobada;
24. `AURA-AUTH-002` conserva segregación de acciones editoriales y públicas;
25. `AURA-AUTH-003` conserva segmentos, leads, PII, exportaciones y acciones masivas;
26. `AURA-AUTH-004` conserva credenciales, tokens, IA, prompts, archivos y datos a terceros;
27. una implementación futura deberá incluir pruebas positivas, negativas, adversariales, de revocación y fail-closed por unidad;
28. rollback no puede ampliar autoridad;
29. se crean y modifican cero requisitos de prueba;
30. la tarea documental no crea ninguna instancia física;
31. la continuidad queda reservada exclusivamente a `AURA-AUTH-002`.

---

#### 38. Handoff obligatorio a AURA-AUTH-002

`AURA-AUTH-002` deberá recibir de esta tarea:

- la separación entre acceso general y capacidad material;
- la intersección de empresa, marca, función, capacidad y recurso;
- el universo de recursos AURA protegido;
- la prohibición de autorización por rol nominal;
- la separación entre lectura y mutación;
- la obligación de revalidación server-side;
- la frontera de `aura.access`;
- la protección de recursos relacionados sin transferencia implícita de autoridad;
- la auditoría mínima de decisiones;
- la matriz de denegaciones y fail-closed;
- la regla de que estar en alcance no autoriza cualquier transición.

Con esa base, `AURA-AUTH-002` deberá separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública sin redefinir empresa, marca, función ni ownership de recursos.

---

#### 39. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la protección de recursos AURA, la necesidad de capacidades específicas, la separación entre lectura y mutación, el control server-side, la prohibición de bypass mediante elevación técnica, los alcances canónicos y el bloqueo de accesos fuera de contexto ya están protegidos por requisitos vigentes. Esta tarea desarrolla el contrato documental que les corresponde sin cambiar texto, estado, relaciones, paquete, ambiente ni evidencia del registro 04A.

---

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-001`, para identidad, versión, propietarios, estados, marcas, audiencias, campañas, activos y publicaciones gobernados;
- `TREQ-AURA-003`, para campañas, oportunidades, reputación, resultados, guardas, atribución y recomendaciones con fronteras empresariales explícitas;
- `TREQ-AURA-008`, para impedir lectura administrativa del CMS por acceso general o navegación directa;
- `TREQ-AURA-009`, para exigir capacidades atómicas distintas entre lectura y mutaciones y revalidación server-side;
- `TREQ-AURA-010`, para impedir que `createAdminClient`, service role o elevación técnica sustituyan actor, capacidad, recurso, alcance, estado o RLS equivalente;
- `TREQ-AUTH-001`, para exigir permisos, contexto y alcance canónicos y prohibir autorización final por listas locales de roles;
- `TREQ-AUTH-005`, `TREQ-AUTH-010` y `TREQ-AUTH-013`, como cobertura transversal vigente relacionada desde los requisitos AURA de lectura, acción y autorización por recurso/alcance;
- `TREQ-SUPABASE-012`, para la frontera de autorización y acceso elevado en Supabase;
- `TREQ-VISO-001`, para preservar la frontera del CMS vigente mientras continúe bajo VISO;
- `TREQ-INTEGRATION-019`, para correlación, idempotencia y reconciliación de recursos y canales integrados.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación del registro.

---

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la incorporación, normalización y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | `NOT_EXECUTED` | el artefacto aún no se ha insertado en el checkout del usuario ni se han ejecutado allí formateador, quality, delivery check o batería global |
| REMOTA | `PASS` | se verificaron en `vento-shell/main` la continuidad vigente con `AURA-DOM-010` aprobada y `AURA-AUTH-001` actual, protocolo, contrato de entrega, manifest, políticas de formato/desarrollo, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, archivo propietario, handoff completo de `AURA-DOM-010`, catálogo y contratos transversales de autorización, responsabilidades de proceso, 04A AURA vigente y scripts documentales declarados en `package.json` |
| OPERATIVA | `NOT_APPLICABLE` | esta tarea no consulta ni modifica campañas, marcas, audiencias, canales, resultados, credenciales, clientes o acciones productivas reales |
| FÍSICA | `NOT_APPLICABLE` | no se crea una instancia `AURA-AUTH-001::<implementation_unit_id>`; la materialización permanece reservada al gate `POST_E5_PACKAGE` |

---

#### 42. Criterios de aceptación

La tarea queda sustantivamente completa cuando simultáneamente:

1. `aura.access` permanece limitado a acceso general;
2. toda operación material requiere capacidad canónica exacta;
3. rol, cargo, función y visibilidad de UI no se aceptan como autorización final;
4. empresa y marca quedan separadas;
5. el acceso de una empresa no se propaga a otra;
6. el acceso de una marca no se propaga a otra;
7. recursos multimarcas o transversales requieren alcance explícito;
8. empresa, marca, función, capacidad, recurso, contexto y estado se intersectan;
9. una dimensión obligatoria ausente produce bloqueo y no wildcard;
10. el universo entregado por `AURA-DOM-010` queda cubierto por el contrato de autorización;
11. cada familia de recurso conserva identidad y ownership;
12. relaciones entre recursos no transfieren autoridad;
13. conocer ID, slug, ruta o URL no concede acceso;
14. lectura y mutación permanecen separadas;
15. acciones editoriales específicas permanecen en `AURA-AUTH-002`;
16. PII, leads, segmentos, exportaciones y acciones masivas permanecen en `AURA-AUTH-003`;
17. credenciales, tokens, IA, prompts, archivos y datos a terceros permanecen en `AURA-AUTH-004`;
18. activos conservan derechos y usos permitidos;
19. audiencias lógicas no exponen miembros por defecto;
20. canales no exponen credenciales por su mera visibilidad;
21. resultados y comparaciones no filtran recursos fuera de alcance;
22. agregados no habilitan drill-down no autorizado;
23. señales y recomendaciones no sirven como canal lateral hacia evidencia restringida;
24. server-side vuelve a resolver recurso y alcance;
25. service role no amplía autoridad;
26. revocación y cambios materiales invalidan decisiones antiguas cuando corresponde;
27. fallos de autorización permanecen fail-closed;
28. auditoría permite reconstruir actor, capacidad, recurso, alcance, resultado y versión aplicable;
29. la futura instancia física deberá demostrar escenarios positivos y negativos por `implementation_unit_id`;
30. rollback no amplía autoridad;
31. CMS VISO conserva su ownership vigente hasta transferencia aprobada;
32. se crean y modifican cero requisitos de prueba;
33. no se crea ninguna instancia física desde esta tarea documental;
34. la siguiente tarea reservada es exactamente `AURA-AUTH-002`.

---

#### 43. Límites

Esta tarea no autoriza ni ejecuta:

- crear o modificar claves de permiso en producción;
- asignar permisos a usuarios reales;
- definir una matriz definitiva de roles AURA;
- habilitar `aura.access` productivamente;
- crear repositorio o runtime AURA;
- crear rutas o pantallas;
- crear tablas, vistas, funciones, RPC, triggers o migraciones;
- modificar Supabase, RLS, grants, Storage, Realtime o Edge Functions;
- usar service role contra datos reales;
- crear o modificar campañas;
- crear, editar, aprobar, programar, publicar o retirar contenido;
- responder comentarios públicos;
- crear o exportar audiencias;
- leer PII de clientes;
- crear leads reales;
- ejecutar acciones masivas;
- crear promociones o cupones;
- modificar ventas, pedidos, beneficios, inventario, capacidad, margen o presupuesto;
- administrar credenciales o tokens;
- enviar prompts, archivos o datos a terceros;
- seleccionar proveedores de IA;
- transferir ownership físico del CMS de VISO;
- crear una instancia `AURA-AUTH-001::<implementation_unit_id>`;
- cruzar `POST_E5_PACKAGE` por inferencia documental;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-AUTH-002`.

---

#### 44. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-010 — Definir radar de oportunidades y recomendaciones comerciales explicables`

**TAREA ACTUAL APROBADA**
`AURA-AUTH-001 — Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUTH-002 — Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública`

### [ ] AURA-AUTH-002 — Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública

### [ ] AURA-AUTH-003 — Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas

### [ ] AURA-AUTH-004 — Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros
