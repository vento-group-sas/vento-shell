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

### ✅ AURA-AUTH-002 — Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública

**Estado:** APROBADA
**Tarea anterior:** AURA-AUTH-001 — Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función
**Tarea siguiente:** AURA-AUTH-003 — Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas
**Tipo de tarea:** documental; contrato canónico de segregación de funciones y transiciones editoriales y públicas de AURA, con materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE W — AURA — autorización de marketing y canales
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/03_AUTORIZACION_DE_MARKETING_Y_CANALES.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`; contrato de segregación definido y futura materialización reservada a `AURA-AUTH-002::<implementation_unit_id>` únicamente después de `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea; no se crean capacidades, permisos, grants, asignaciones, RLS, políticas, estados técnicos, tablas, funciones, RPC, cuentas, integraciones, publicaciones, respuestas, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá mantener separadas las autoridades de creación, revisión, aprobación, programación, publicación, retiro y respuesta pública, de modo que poseer alcance sobre un recurso no permita ejecutar cualquier transición sobre él y que una persona, principal técnico o automatización no pueda convertir por sí sola preparación, revisión o capacidad técnica en aprobación final.

La decisión raíz es:

```text
ESTAR EN ALCANCE DEL RECURSO
!=
PODER EJECUTAR CUALQUIER TRANSICION DEL RECURSO
```

Y además:

```text
CREAR
!=
REVISAR
!=
APROBAR
!=
PROGRAMAR
!=
PUBLICAR
!=
RETIRAR
!=
RESPONDER PUBLICAMENTE
```

```text
APROBADO
!=
PROGRAMADO
!=
PUBLICADO
```

```text
RESPUESTA PUBLICA PUBLICADA
!=
RECLAMO RESUELTO
```

La tarea concreta el handoff obligatorio de `AURA-AUTH-001` sin redefinir empresa, marca, función, recurso, identidad ni alcance.

---

#### 2. Naturaleza y topología

La topología canónica aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto:

- esta tarea define una sola vez el contrato documental reusable;
- no crea una instancia física desde el carril documental;
- cada materialización futura deberá usar la identidad `AURA-AUTH-002::<implementation_unit_id>`;
- ninguna instancia podrá materializarse antes de satisfacer `POST_E5_PACKAGE`;
- la aprobación documental no crea estados runtime, permisos, políticas, integraciones ni automatizaciones;
- cada implementación futura deberá demostrar segregación, denegación segura, auditoría y recuperación sobre la unidad concreta que materialice;
- la tarea no convierte la arquitectura objetivo de AURA en una aplicación ya disponible.

---

#### 3. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-AUTH-001`, para empresa, marca, función, capacidad, recurso, contexto, denegaciones, revalidación server-side y auditoría mínima;
- `AURA-DOM-003`, para activos, versiones, revisión, aprobación, retiro y derechos de uso;
- `AURA-DOM-004`, para grounding, asistencia de IA, revisión humana y prohibición de autoaprobación o autopublicación;
- `AURA-DOM-005`, para cuentas, endpoints, programación, publicación, intentos, confirmación externa, retiro y reconciliación por canal;
- `AURA-DOM-009`, para reputación, propuesta de respuesta, revisión humana, aprobación, publicación y escalamiento a servicio;
- `VPROC-0056`, como proceso canónico de contenido y promociones desde solicitud y aprobación hasta publicación y retiro;
- la matriz canónica de roles y responsabilidades de `VPROC-0056`, que exige aprobación separada de la decisión crítica;
- `TREQ-AURA-001`, para estados y transiciones editoriales diferenciadas;
- `TREQ-AURA-002`, para impedir autonomía de IA sobre publicación y respuesta sensible;
- `TREQ-AURA-003`, para impedir que una respuesta pública cierre un reclamo formal;
- `TREQ-AURA-011`, para impedir publicación por defecto durante creación;
- `TREQ-AURA-018`, para carga de medios gobernada y no equivalente a publicación;
- `TREQ-AURA-019`, como requisito propietario de segregación del ciclo editorial;
- el modelo transversal de autorización y evidencia vigente.

Ninguna de esas fuentes se modifica por esta tarea.

---

#### 4. Resultado canónico

AURA deberá poder decidir cada transición material mediante un contrato que responda, como mínimo:

1. qué recurso y versión exacta se intenta transformar;
2. en qué empresa y marca se encuentra el recurso;
3. qué función empresarial actúa;
4. qué capacidad exacta se solicita;
5. qué estado editorial o reputacional existe antes de la acción;
6. qué estado o efecto pretende producir la acción;
7. qué actor preparó o creó la versión;
8. qué actor la revisó cuando aplique;
9. qué actor emitió la aprobación final cuando aplique;
10. qué actor o principal técnico intenta programar, publicar o retirar;
11. qué restricciones de vigencia, derechos, canal, privacidad, oferta y negocio aplican;
12. si existe conflicto de segregación para esa decisión concreta;
13. si una aprobación previa continúa vigente para la versión y objetivo actuales;
14. si el canal y cuenta objetivo siguen siendo compatibles;
15. qué evidencia sostiene la transición;
16. cuál fue el resultado de autorización y de negocio;
17. qué correlación permite reconstruir la secuencia completa.

Una dimensión obligatoria ausente, ambigua, vencida o incompatible deberá bloquear la transición protegida de forma segura.

---

#### 5. Principio de segregación

La segregación se aplica a autoridades y decisiones, no únicamente a pantallas o botones.

Se preserva:

```text
CAPACIDAD DE CREAR
!=
CAPACIDAD DE APROBAR
```

```text
CAPACIDAD DE APROBAR
!=
CAPACIDAD DE PUBLICAR
```

```text
CAPACIDAD TECNICA DE ENVIAR A UN CANAL
!=
AUTORIDAD EMPRESARIAL PARA APROBAR
```

```text
CAPACIDAD DE RETIRAR
!=
CAPACIDAD DE ELIMINAR EVIDENCIA
```

Una misma persona podrá poseer más de una capacidad no incompatible únicamente cuando el modelo canónico lo permita; poseer varias capacidades no elimina los conflictos específicos de una decisión crítica.

---

#### 6. Relación obligatoria con AURA-AUTH-001

`AURA-AUTH-001` decide si el actor puede alcanzar el recurso dentro de empresa, marca, función y contexto.

`AURA-AUTH-002` decide si, estando ya dentro de ese universo autorizado, puede ejecutar la transición exacta solicitada.

Por tanto:

```text
AUTORIZADO_SOBRE_RECURSO
+
TRANSICION_ESPECIFICA_AUTORIZADA
+
PRECONDICIONES_DEL_ESTADO
+
SEGREGACION_SATISFECHA
=
ELEGIBLE_PARA_EJECUTAR
```

La elegibilidad todavía podrá quedar bloqueada por guardas de privacidad, promoción, credenciales, proveedor, integración o reglas propietarias posteriores.

---

#### 7. Ciclo canónico consumido de VPROC-0056

Esta tarea no crea un namespace alterno de estados.

Preserva los estados canónicos vigentes de `VPROC-0056`:

```text
CONTENT_REQUESTED
BRIEF_UNDER_REVIEW
IN_CREATION
UNDER_REVIEW
PENDING_APPROVAL
APPROVED
SCHEDULED
PUBLISHED
PERFORMANCE_REVIEW
CONTENT_CYCLE_REVIEWED
```

Sus límites permanecen:

- `CONTENT_REQUESTED` no constituye pieza aprobada, programación, publicación ni promoción vigente;
- `PENDING_APPROVAL` espera autoridad para continuar;
- `APPROVED` significa versión autorizada pero todavía no publicada;
- `SCHEDULED` exige canal, fecha, audiencia y versión de publicación;
- `PUBLISHED` representa contenido activo en el canal controlado;
- el cierre normal exige que vigencia, retiro y rendimiento hayan sido controlados.

El retiro, ocultamiento, archivo y reconciliación podrán requerir representación física propia posteriormente, pero esta tarea no inventa nuevos códigos de estado para `VPROC-0056`.

---

#### 8. Familias de acción protegida

Quedan separadas semánticamente las siguientes familias:

| Familia | Resultado permitido | No concede por sí sola |
| --- | --- | --- |
| creación | crear o modificar una versión no aprobada dentro del alcance permitido | revisar, aprobar, programar, publicar o retirar |
| revisión | evaluar una versión, registrar observaciones y devolver o recomendar | aprobación final ni publicación |
| aprobación | autorizar una versión y su objetivo dentro de condiciones explícitas | programación, envío técnico o confirmación externa |
| programación | preparar fecha, ventana, canal, cuenta y versión aprobada | cambiar contenido, autoaprobar o publicar fuera de ventana |
| publicación | ejecutar la salida autorizada hacia el canal correspondiente | alterar la aprobación, ampliar alcance o declarar impacto |
| retiro | ordenar o ejecutar retiro conforme a autoridad y estado | borrar historia, evidencia o reemplazar aprobación previa |
| respuesta pública | preparar o emitir comunicación reputacional gobernada | cerrar reclamos, aprobar compensaciones ni alterar hechos propietarios |

Los nombres anteriores son familias semánticas. Esta tarea no inventa claves definitivas de permisos; toda implementación deberá usar capacidades existentes en el catálogo canónico vigente o introducirlas mediante su proceso propietario antes de consumirlas.

---

#### 9. Creación

Crear o editar una versión deberá exigir:

- recurso y contexto dentro del alcance de `AURA-AUTH-001`;
- identidad estable del objeto;
- versión identificable;
- brief, marca, campaña o contexto requerido cuando aplique;
- fuentes y derechos suficientes;
- actor productor trazable;
- estado que admita edición;
- ausencia de una transición incompatible en curso.

La creación no deberá:

- publicar por defecto;
- marcar aprobación implícita;
- reutilizar una aprobación de otra versión;
- convertir un borrador asistido por IA en decisión empresarial;
- sobrescribir silenciosamente una versión ya aprobada o publicada.

---

#### 10. Revisión

La revisión es una evaluación diferenciada de la creación y de la aprobación final.

Deberá permitir registrar, según corresponda:

- exactitud;
- marca y tono;
- derechos;
- privacidad;
- precio y disponibilidad consumidos desde sus fuentes;
- vigencia;
- claims;
- formato de canal;
- restricciones comerciales o legales;
- observaciones;
- cambios requeridos;
- recomendación de aprobar o rechazar.

Una revisión favorable no constituye aprobación final.

Un actor que tenga capacidad tanto de revisar como de aprobar solo podrá ejecutar ambas acciones cuando no exista una incompatibilidad de segregación para la decisión concreta y ambas capacidades estén autorizadas de forma independiente.

---

#### 11. Aprobación

La aprobación deberá quedar vinculada al objeto exacto que autoriza.

Como mínimo deberá identificar:

- recurso;
- versión;
- marca;
- objetivo o finalidad;
- canal o familia de canal cuando sea material;
- audiencia o alcance lógico cuando corresponda;
- vigencia;
- restricciones;
- actor aprobador;
- autoridad utilizada;
- timestamp;
- evidencia y correlación.

Se preserva:

```text
APROBACION DE VERSION A
!=
APROBACION DE VERSION B
```

```text
APROBACION PARA CANAL A
!=
APROBACION UNIVERSAL PARA TODOS LOS CANALES
```

Una aprobación no produce por sí sola programación, publicación, retiro ni respuesta externa.

---

#### 12. Aprobación obligatoria de VPROC-0056

La matriz canónica vigente de `VPROC-0056` establece:

- iniciador primario funcional: `RESPONSABLE_DE_MARCA`;
- iniciadores alternos: `RESPONSABLE_COMERCIAL`, `GERENCIA_GENERAL` y `EVENTO_CANONICO_DE_PROCESO`;
- ejecutor principal funcional: `RESPONSABLE_DE_MARCA`;
- apoyos: `RESPONSABLE_COMERCIAL`, `RESPONSABLE_DE_CATALOGO` y `RESPONSABLE_DE_CLIENTE_Y_SERVICIO`;
- aprobador funcional: `GERENCIA_GENERAL`;
- aprobación: `OBLIGATORIA` para contenido, promoción, condiciones, publicación o retiro.

La misma matriz fija:

```text
INICIADOR_O_PREPARADOR_O_EJECUTOR
!=
APROBADOR_FINAL_DE_LA_MISMA_DECISION_CRITICA
```

Y además:

```text
CREADOR
O
PUBLICADOR_TECNICO
!=
APROBACION_COMERCIAL_O_LEGAL
```

Estos nombres expresan responsabilidad funcional del proceso. No sustituyen la evaluación de capacidad, empresa, marca, función, recurso y contexto exigida por `AURA-AUTH-001`.

---

#### 13. Programación

Programar deberá requerir una versión aprobada y todavía vigente.

La programación deberá fijar, cuando aplique:

- versión exacta;
- canal y endpoint objetivo;
- cuenta empresarial gobernada;
- fecha y hora;
- zona horaria;
- ventana válida;
- audiencia o destino;
- formato o variante;
- aprobación de la que depende;
- política de reintento aplicable;
- correlación.

Programar no podrá:

- modificar silenciosamente el contenido aprobado;
- ampliar marca, audiencia o canal respecto de la aprobación;
- convertir una aprobación vencida en vigente;
- saltar restricciones de derechos o disponibilidad;
- publicar inmediatamente como efecto secundario no declarado.

---

#### 14. Publicación

La publicación deberá revalidar autorización y estado en el momento de ejecución.

No bastará con que:

- el usuario haya visto antes el botón;
- exista una aprobación histórica;
- el job haya sido creado cuando la autorización era válida;
- el principal técnico tenga credenciales del canal;
- la pieza haya estado publicada anteriormente;
- el recurso permanezca en caché.

Antes del efecto externo deberán seguir siendo compatibles:

- versión;
- aprobación;
- vigencia;
- empresa;
- marca;
- función;
- capacidad;
- canal;
- cuenta;
- audiencia o destino;
- derechos;
- restricciones materiales.

Un cambio relevante posterior a la aprobación deberá impedir reutilizarla como autoridad automática.

---

#### 15. Publicación interna y confirmación externa

Se conserva la frontera de `AURA-DOM-005`:

```text
AUTORIZADO_PARA_PUBLICAR
!=
INTENTO_TECNICO
!=
CONFIRMACION_EXTERNA
```

Por tanto:

- una transición interna a ejecución no prueba que el proveedor haya publicado;
- un timeout no podrá asumirse como fallo seguro si el proveedor pudo procesar la solicitud;
- un identificador externo no sustituye la decisión interna de autorización;
- reconciliación e idempotencia deberán impedir efectos duplicados;
- la autorización no se ampliará durante reintentos.

---

#### 16. Retiro

El retiro deberá mantenerse separado de creación, aprobación y eliminación física.

Se conserva:

```text
RETIRAR DE USO O CANAL
!=
BORRAR HISTORIA
!=
BORRAR EVIDENCIA
```

Una orden o ejecución de retiro deberá conservar, según corresponda:

- objeto y versión;
- canal o publicación afectada;
- motivo;
- autoridad;
- actor decisor;
- actor o principal técnico ejecutor;
- timestamp;
- confirmación externa o estado ambiguo;
- reintentos;
- reconciliación;
- evidencia posterior.

Para `VPROC-0056`, la decisión crítica de retiro permanece dentro del objeto de aprobación obligatoria definido por la matriz canónica del proceso.

---

#### 17. Respuesta pública

La respuesta pública se trata como una acción gobernada y trazable, no como texto libre enviado desde una cuenta disponible.

Se deberán mantener separadas, cuando apliquen:

```text
CLASIFICAR
!=
PROPONER_RESPUESTA
!=
REVISAR_RESPUESTA
!=
APROBAR_RESPUESTA
!=
PUBLICAR_RESPUESTA
!=
ESCALAR_A_SERVICIO
```

La respuesta deberá conservar como mínimo:

- elemento público exacto al que responde;
- marca y cuenta aplicables;
- versión del texto;
- fuentes para afirmaciones materiales;
- actor proponente;
- actor revisor cuando aplique;
- actor aprobador cuando aplique;
- actor o principal técnico publicador;
- timestamp;
- identificador externo cuando exista;
- estado de confirmación y reconciliación.

---

#### 18. Revisión humana reforzada para respuesta pública

Se preserva la revisión humana obligatoria definida por `AURA-DOM-009` cuando exista, entre otros, impacto material relacionado con:

- riesgo legal;
- seguridad;
- privacidad;
- acusación grave;
- crisis o difusión significativa;
- posible compensación;
- reclamo formal o potencial;
- ambigüedad con impacto material;
- admisión de hechos o responsabilidades;
- cuenta sensible;
- fuente cuya frescura o autoridad no esté clara.

Una IA podrá sugerir o resumir, pero no podrá por sí sola aprobar ni publicar respuestas sensibles.

---

#### 19. Respuesta pública y frontera con servicio

Se conserva permanentemente:

```text
RESPUESTA PUBLICA
!=
RESOLUCION DE SERVICIO
```

Una respuesta pública no podrá por sí sola:

- cerrar un reclamo;
- aprobar devolución;
- aprobar reembolso;
- aprobar compensación;
- declarar concluida una investigación abierta;
- modificar el estado propietario del pedido;
- modificar verdad de venta o pago;
- identificar definitivamente una persona cliente desde un alias público.

Cuando corresponda, AURA deberá escalar al proceso propietario manteniendo correlación sin adquirir su autoridad.

---

#### 20. Vinculación de aprobación a versión y objetivo

Toda aprobación material deberá ser específica.

Una aprobación quedará inválida para ejecución posterior cuando cambie de forma material cualquiera de los elementos que la sustentaban, incluyendo cuando corresponda:

- contenido;
- activo o derivado utilizado;
- claim;
- precio u oferta referenciada;
- vigencia;
- marca;
- audiencia;
- canal;
- cuenta;
- finalidad;
- condición promocional;
- derecho de uso;
- dato material consumido desde otra fuente;
- restricción aplicable.

La corrección exclusivamente técnica que no altere el objeto aprobado solo podrá conservar aprobación si el contrato propietario la clasifica expresamente como no material y queda evidencia suficiente.

---

#### 21. Reaprobación

Si una modificación invalida la aprobación vigente, el recurso deberá volver al punto del ciclo que corresponda antes de poder programarse o publicarse de nuevo.

No se admitirá:

- copiar el identificador de una aprobación anterior a una nueva versión;
- conservar `APPROVED` por simple edición de un campo;
- mantener un job programado cuando la versión subyacente dejó de estar aprobada;
- reintentar una publicación cambiando payload material sin nueva decisión;
- reutilizar una aprobación de otra marca o audiencia.

---

#### 22. Segregación por decisión, no por identidad nominal

La segregación deberá evaluarse sobre la decisión concreta.

No será suficiente comparar nombres visibles de usuario.

La implementación futura deberá poder resolver, cuando aplique:

- principal autenticado;
- actor efectivo;
- identidad del iniciador;
- identidad del preparador o creador;
- identidad del revisor;
- identidad del aprobador;
- identidad del ejecutor técnico;
- relación entre esos actores;
- versión y objeto sobre los que actuaron.

Un mismo principal técnico actuando por varios usuarios no deberá borrar la atribución del actor efectivo.

---

#### 23. Conflicto obligatorio en la decisión crítica de VPROC-0056

Para la aprobación final obligatoria de `VPROC-0056`, un actor que haya actuado como iniciador, preparador o ejecutor de la misma decisión crítica no podrá convertirse en aprobador final únicamente porque también posea o herede una capacidad de aprobación.

La regla se aplica a la decisión, no a toda relación laboral permanente.

No implica que todas las tareas editoriales requieran personas diferentes para cada paso; exige que la aprobación final de la decisión crítica permanezca separada conforme a la matriz canónica del proceso.

---

#### 24. Rol, función y capacidad

La función empresarial participa en el contrato, pero no reemplaza la autorización.

Se conserva:

```text
GERENCIA_GENERAL
!=
PERMISO_AUTOMATICO
```

```text
RESPONSABLE_DE_MARCA
!=
PERMISO_AUTOMATICO
```

Un actor funcionalmente elegible deberá además satisfacer:

- identidad confiable;
- capacidad exacta;
- empresa;
- marca cuando aplique;
- recurso;
- contexto;
- estado;
- restricciones;
- segregación.

La UI no podrá deducir autoridad final únicamente por nombre de rol.

---

#### 25. Principales técnicos y automatización

Jobs, service roles, integraciones, webhooks y otros principales técnicos no adquieren aprobación empresarial por ejecutar técnicamente una acción.

Una automatización podrá ejecutar una transición ya autorizada únicamente si:

- la decisión empresarial necesaria existe y sigue vigente;
- el principal técnico está autorizado para la operación técnica concreta;
- el recurso y versión continúan siendo los aprobados;
- el alcance no se amplía;
- la ejecución es idempotente cuando corresponde;
- la correlación preserva quién autorizó y qué principal ejecutó.

Un evento canónico podrá iniciar `VPROC-0056` cuando el proceso lo admite; no podrá emitir por sí solo la aprobación final obligatoria salvo que una fuente canónica posterior redefina expresamente esa autoridad.

---

#### 26. Revalidación server-side

Toda transición material deberá revalidarse en servidor o en la frontera autoritativa equivalente inmediatamente antes del efecto protegido.

La decisión no podrá confiar únicamente en:

- controles visuales;
- estado del cliente;
- claims no verificados del frontend;
- un ID suministrado por cliente;
- una aprobación almacenada en memoria sin validar vigencia;
- un job antiguo;
- un rol enviado por el cliente;
- una cuenta o marca seleccionada en interfaz.

El uso de service role o credenciales privilegiadas no podrá omitir la autorización del actor ni la segregación.

---

#### 27. Precondiciones de estado

Cada familia de acción deberá comprobar que el estado actual admite la transición.

Como mínimo:

| Acción | Precondición mínima conceptual |
| --- | --- |
| crear o editar | estado editable y versión identificable |
| revisar | versión disponible para revisión y evidencia suficiente |
| aprobar | versión revisable, restricciones resueltas y segregación válida |
| programar | aprobación vigente y objetivo de publicación válido |
| publicar | aprobación vigente, estado publicable, autorización actual y canal compatible |
| retirar | publicación o uso retirable, autoridad vigente y objetivo exacto |
| responder públicamente | elemento reputacional válido, autoridad de respuesta y guardas de revisión aplicables |

Una transición inválida por estado deberá denegarse aunque el actor posea la capacidad nominal.

---

#### 28. Denegación segura

La futura implementación deberá fallar de forma segura al menos ante:

- capacidad ausente;
- recurso fuera de empresa o marca;
- versión no aprobada;
- aprobación vencida o invalidada;
- conflicto de segregación;
- cuenta o canal no autorizado;
- estado incompatible;
- derechos vencidos;
- restricción material no satisfecha;
- servicio de autorización no disponible;
- correlación insuficiente para reconstruir la decisión;
- intento de usar una respuesta pública para cerrar un caso de servicio;
- principal técnico que intenta convertir credencial en autoridad empresarial.

La denegación no deberá producir efectos externos parciales silenciosos.

---

#### 29. Concurrencia, idempotencia y carreras

La segregación deberá conservarse bajo concurrencia.

La futura materialización deberá impedir, según corresponda:

- aprobar una versión mientras otra edición material se confirma en paralelo;
- programar una versión que cambió después de ser seleccionada;
- publicar dos veces por reintento no idempotente;
- retirar y volver a publicar por carreras sin reconciliación;
- aceptar una aprobación sobre una versión obsoleta;
- responder dos veces al mismo elemento por eventos duplicados;
- perder la identidad del actor por procesamiento asíncrono.

Los locks, versiones, claves idempotentes o mecanismos técnicos concretos pertenecen a la implementación; la obligación semántica queda fijada aquí.

---

#### 30. Auditoría de transición

Toda transición material futura deberá poder reconstruir:

- principal autenticado;
- actor efectivo;
- capacidad solicitada;
- recurso;
- versión;
- empresa;
- marca;
- función;
- estado anterior;
- acción solicitada;
- estado o efecto esperado;
- actor creador o preparador cuando sea material;
- actor revisor cuando sea material;
- actor aprobador cuando aplique;
- principal técnico ejecutor cuando aplique;
- decisión de segregación;
- versión de política y catálogo;
- correlación;
- timestamp;
- resultado de autorización;
- resultado técnico;
- referencia externa cuando exista.

La auditoría deberá distinguir decisión empresarial, ejecución técnica y confirmación externa.

---

#### 31. Evidencia mínima de aprobación

Una aprobación futura deberá conservar evidencia suficiente para demostrar:

- quién aprobó;
- qué versión aprobó;
- con qué autoridad;
- sobre qué empresa y marca;
- para qué objetivo;
- qué restricciones existían;
- qué revisión previa era aplicable;
- cuándo se produjo;
- hasta cuándo era utilizable cuando exista vigencia;
- qué decisión de segregación permitió emitirla.

La ausencia de evidencia mínima no deberá interpretarse como aprobación implícita.

---

#### 32. CMS transitorio de VISO

El CMS actual de VISO conserva su ownership transitorio hasta una transferencia formal aprobada.

Esta tarea no:

- migra el CMS;
- cambia sus capacidades actuales;
- convierte sus booleanos o acciones observadas en modelo canónico completo;
- declara AURA implementada;
- autoriza publicación por existir una superficie administrativa actual.

Cualquier materialización futura que proteja superficies transitorias deberá respetar este contrato sin simular que la transferencia a AURA ya ocurrió.

---

#### 33. Frontera con AURA-AUTH-003

`AURA-AUTH-003` conserva la protección reforzada de:

- promociones;
- segmentos;
- leads;
- datos de clientes;
- exportaciones;
- acciones masivas.

Esta tarea únicamente separa las autoridades editoriales y públicas.

No autoriza:

- extraer miembros de audiencia;
- contactar personas;
- exportar PII;
- activar campañas masivas;
- aplicar descuentos;
- redimir beneficios;
- decidir reglas promocionales transaccionales.

La siguiente tarea deberá recibir las transiciones aquí definidas sin convertir una aprobación editorial en autorización para usar datos o ejecutar promociones.

---

#### 34. Frontera con AURA-AUTH-004

`AURA-AUTH-004` conserva la protección de:

- credenciales;
- tokens;
- secretos;
- proveedores de IA;
- prompts gobernados;
- archivos;
- datos enviados a terceros.

Poder programar, publicar, retirar o responder no concede acceso directo a secretos ni autoriza el envío de información a un tercero.

La integración futura deberá usar intermediación gobernada sin exponer credenciales a quien solo necesita ejecutar una acción empresarial.

---

#### 35. Frontera con experiencia e integración

Las tareas `AURA-UX-*` podrán presentar flujos de creación, revisión, aprobación y publicación, pero no serán autoridad final.

En especial, `AURA-UX-004` deberá diseñar aprobación y publicación multicanal respetando los estados, denegaciones y recuperación de este contrato.

Las tareas `AURA-INT-*` deberán conservar:

- versión;
- correlación;
- actor;
- aprobación;
- idempotencia;
- intento;
- resultado externo;
- reconciliación;
- límites del proveedor.

Un adaptador no podrá aprobar por el usuario ni ampliar una transición autorizada.

---

#### 36. Matriz obligatoria de pruebas futuras

Cada instancia física `AURA-AUTH-002::<implementation_unit_id>` deberá demostrar, cuando la unidad materialice las superficies correspondientes, al menos:

| Escenario | Resultado exigido |
| --- | --- |
| creador intenta aprobar su misma decisión crítica de VPROC-0056 | denegado |
| ejecutor técnico intenta sustituir aprobación final | denegado |
| revisor favorable intenta publicar sin capacidad de publicación | denegado |
| aprobador intenta publicar solo por haber aprobado | denegado salvo capacidad independiente y demás guardas satisfechas |
| programador intenta usar versión no aprobada | denegado |
| publicación programada pierde aprobación antes de ejecutarse | bloqueada |
| versión cambia materialmente después de aprobación | exige nueva decisión antes de publicación |
| actor con publicación intenta recurso fuera de marca | denegado por AURA-AUTH-001 |
| job conserva autorización histórica después de revocación | denegado |
| publicación se reintenta tras timeout ambiguo | reconciliada e idempotente antes de repetir efecto |
| actor intenta retirar sin autoridad aplicable | denegado |
| retiro autorizado intenta borrar evidencia histórica | denegado |
| IA intenta autoaprobar o autopublicar | denegado |
| respuesta sensible intenta publicarse sin revisión humana requerida | denegado |
| respuesta pública intenta cerrar reclamo formal | denegado en esa frontera |
| flujo válido con aprobación separada y capacidades correctas | elegible para ejecutar la transición correspondiente |

La última fila no exime las guardas de `AURA-AUTH-003`, `AURA-AUTH-004`, privacidad, integración ni reglas propietarias.

---

#### 37. Recuperación y rollback

La futura materialización deberá poder recuperarse sin colapsar la segregación.

Un rollback válido no podrá:

- convertir aprobación en publicación automática;
- reactivar una aprobación invalidada;
- borrar quién aprobó o ejecutó;
- eliminar el historial de versiones;
- restaurar un bypass por rol nominal;
- permitir que un creador se autoapruebe;
- reutilizar jobs programados contra versiones obsoletas;
- perder la correlación con publicaciones o respuestas externas.

Si no puede demostrarse que el rollback conserva autoridad, versión y evidencia, la acción deberá permanecer bloqueada.

---

#### 38. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. estar en alcance de un recurso no concede todas sus transiciones;
2. creación, revisión, aprobación, programación, publicación, retiro y respuesta pública son autoridades diferenciadas;
3. las familias semánticas no inventan por sí mismas claves definitivas de permiso;
4. `AURA-AUTH-001` continúa gobernando empresa, marca, función, capacidad, recurso y contexto;
5. revisión favorable no equivale a aprobación final;
6. aprobación no equivale a programación;
7. programación no equivale a publicación;
8. autorización para publicar no equivale a confirmación externa;
9. retiro no equivale a eliminación de evidencia;
10. respuesta pública no equivale a resolución de servicio;
11. `VPROC-0056` conserva su namespace canónico de estados;
12. `VPROC-0056` exige aprobación final obligatoria para su decisión crítica;
13. el aprobador funcional vigente de `VPROC-0056` es `GERENCIA_GENERAL`;
14. la función `GERENCIA_GENERAL` no constituye permiso automático;
15. iniciador, preparador o ejecutor no puede emitir la aprobación final de la misma decisión crítica de `VPROC-0056`;
16. creador y publicador técnico no sustituyen aprobación comercial o legal;
17. un actor puede poseer varias capacidades no incompatibles si cada una está autorizada independientemente;
18. los conflictos se evalúan sobre la decisión concreta;
19. aprobación se vincula a versión, objetivo y restricciones materiales;
20. cambios materiales invalidan la reutilización automática de aprobación;
21. publicación revalida autorización inmediatamente antes del efecto;
22. jobs y principales técnicos no adquieren autoridad empresarial por poseer credenciales;
23. reintentos no amplían autoridad;
24. concurrencia no puede permitir publicación de versión obsoleta;
25. IA no puede autoaprobar ni autopublicar;
26. respuestas públicas sensibles conservan revisión humana reforzada;
27. una respuesta pública no cierra reclamos ni aprueba compensaciones;
28. auditoría distingue decisión empresarial, ejecución técnica y resultado externo;
29. el CMS transitorio de VISO no se reclasifica como AURA implementada;
30. `AURA-AUTH-003` conserva promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas;
31. `AURA-AUTH-004` conserva credenciales, tokens, proveedores de IA, prompts, archivos y datos a terceros;
32. rollback no puede ampliar autoridad ni destruir trazabilidad;
33. se crean y modifican cero requisitos de prueba;
34. la tarea documental no crea ninguna instancia física;
35. la continuidad queda reservada exclusivamente a `AURA-AUTH-003`.

---

#### 39. Handoff obligatorio a AURA-AUTH-003

`AURA-AUTH-003` deberá recibir de esta tarea:

- la separación entre creación, revisión, aprobación, programación, publicación, retiro y respuesta pública;
- la regla de aprobación final separada de la decisión crítica de `VPROC-0056`;
- la vinculación de aprobación a versión y objetivo;
- la revalidación antes del efecto;
- la separación entre decisión empresarial y principal técnico;
- la denegación de autoaprobación;
- la obligación de auditoría por transición;
- la regla de que una transición editorial autorizada no concede uso de datos, promociones o acciones masivas.

Con esa base, `AURA-AUTH-003` deberá proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas sin reabrir la segregación editorial aquí fijada.

---

#### 40. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0

Justificación: la separación de estados y transiciones editoriales, la segregación de funciones, la autorización por acción, la protección de publicación y media, y la trazabilidad del ciclo ya cuentan con cobertura vigente suficiente. Esta tarea desarrolla el contrato documental previsto por esa cobertura sin crear ni modificar requisitos del registro.

No se modifica el registro 04A desde esta tarea.

---

#### 41. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-001`, para identidad, versión, estados diferenciados y separación entre aprobación y publicación;
- `TREQ-AURA-002`, para impedir autonomía de IA sobre publicación, promoción, contacto o respuesta pública sin autoridad explícita;
- `TREQ-AURA-003`, para campañas, promociones, oportunidades, reputación y fronteras comerciales;
- `TREQ-AURA-011`, para impedir publicación accidental al crear contenido;
- `TREQ-AURA-018`, para proteger carga de media mediante capacidad, validación y alcance;
- `TREQ-AURA-019`, para estados y transiciones distintas entre borrador, revisión, aprobación, programación, publicación, ocultamiento, retiro y archivo.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación del registro 04A.

---

#### 42. Cobertura de prueba futura

La materialización física posterior deberá cubrir, según la unidad concreta:

- contrato de estados y transiciones;
- autorización positiva y negativa;
- segregación de funciones;
- cambio de versión después de aprobación;
- revocación;
- concurrencia;
- idempotencia;
- denegación fail-closed;
- reintentos y reconciliación;
- publicación y retiro;
- respuesta pública y escalamiento;
- auditoría y recuperación;
- regresión contra `VPROC-0056` y los requisitos AURA vigentes.

La evidencia física pertenece a cada `implementation_unit_id`; la aprobación documental no la sustituye.

---

#### 43. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra un checkout local desde esta entrega |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local ni se ejecutaron validadores del repositorio desde esta entrega |
| REMOTA | PASS | se verificaron en `main` la continuidad AURA-AUTH-001 → AURA-AUTH-002 → AURA-AUTH-003, el archivo propietario, la reconciliación `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`, el handoff de AURA-AUTH-001, AURA-DOM-003, AURA-DOM-005, AURA-DOM-009, los estados generados de VPROC-0056, su matriz de roles y responsabilidades, y `TREQ-AURA-001`, `002`, `003`, `011`, `018` y `019` del registro 04A de AURA |
| OPERATIVA | NOT_APPLICABLE | esta tarea define segregación documental y no crea, revisa, aprueba, programa, publica, retira ni responde contenido real |
| FÍSICA | NOT_APPLICABLE | esta aprobación documental no crea permisos, políticas, código, Supabase, integraciones, cuentas, publicaciones, respuestas, datos ni despliegues |

---

#### 44. Criterios de aceptación

La tarea queda documentalmente aceptable únicamente si se conserva todo lo siguiente:

1. creación, revisión, aprobación, programación, publicación, retiro y respuesta pública permanecen acciones diferenciadas;
2. `AURA-AUTH-001` sigue siendo autoridad sobre empresa, marca, función, capacidad, recurso y contexto;
3. se preservan los estados canónicos vigentes de `VPROC-0056` sin crear un namespace competidor;
4. la aprobación de `VPROC-0056` sigue siendo obligatoria para la decisión crítica definida por su matriz;
5. iniciador, preparador o ejecutor no puede emitir la aprobación final de esa misma decisión crítica;
6. `GERENCIA_GENERAL` permanece como aprobador funcional vigente de `VPROC-0056`, sin convertirse en bypass de autorización;
7. revisión favorable no equivale a aprobación;
8. aprobación no equivale a publicación;
9. aprobación queda vinculada a versión y objetivo;
10. un cambio material exige nueva decisión antes de ejecutar;
11. programación exige aprobación vigente;
12. publicación revalida autoridad y estado al ejecutar;
13. principal técnico y credencial no sustituyen autoridad empresarial;
14. reintentos son idempotentes y no amplían autoridad;
15. retiro conserva evidencia;
16. respuesta pública conserva separación entre propuesta, revisión, aprobación, publicación y escalamiento cuando aplique;
17. respuesta pública no cierra reclamo formal;
18. IA no autoaprueba ni autopublica;
19. respuestas sensibles conservan revisión humana reforzada;
20. la auditoría conserva actor, versión, decisión, ejecutor y resultado;
21. la matriz negativa de pruebas futuras queda definida;
22. rollback no puede ampliar autoridad;
23. el CMS transitorio de VISO no se declara transferido;
24. `AURA-AUTH-003` y `AURA-AUTH-004` conservan sus fronteras;
25. se crean y modifican cero TREQ;
26. no se crea ninguna instancia física desde el carril documental;
27. la siguiente tarea reservada es exactamente `AURA-AUTH-003`.

---

#### 45. Límites

Esta tarea no autoriza:

- crear un repositorio o runtime de AURA;
- crear capacidades definitivas fuera del catálogo canónico;
- asignar roles o permisos;
- crear o modificar RLS;
- crear tablas, migraciones, RPC, funciones, triggers, jobs o colas;
- conectar canales externos;
- crear o rotar credenciales;
- publicar contenido real;
- programar contenido real;
- retirar contenido real;
- responder comentarios, reseñas o menciones reales;
- aprobar promociones reales;
- extraer segmentos o datos de clientes;
- exportar información;
- ejecutar acciones masivas;
- transferir el CMS actual de VISO a AURA;
- modificar los estados canónicos de `VPROC-0056`;
- cambiar la matriz de roles y responsabilidades de `VPROC-0056`;
- adelantar `AURA-AUTH-003`;
- crear evidencia física inexistente.

---

#### 46. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUTH-001 — Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función`

**TAREA ACTUAL APROBADA**
`AURA-AUTH-002 — Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUTH-003 — Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas`

### [ ] AURA-AUTH-003 — Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas

### [ ] AURA-AUTH-004 — Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros
