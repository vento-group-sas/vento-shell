### MINI-BLOQUE — DOMINIO DE MARKETING Y CREACION

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **dominio de marketing y creacion** dentro de **W AURA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AURA-DOM-001` a `AURA-DOM-010` — 10 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia” y concluye con “Definir radar de oportunidades y recomendaciones comerciales explicables”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AURA-DOM -->
### Reconciliación topológica de AURA-DOM-001 a AURA-DOM-010

Estas tareas definen el dominio objetivo de marketing y creación. No generan implementación física autónoma y continúan condicionadas por la decisión de continuidad de AURA.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia

**Estado:** APROBADA
**Tarea anterior:** WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz
**Tarea siguiente:** AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña
**Tipo de tarea:** definición técnico-documental del contrato canónico de memoria de marca de AURA; fija la separación entre ecosistema, sujeto legal, marca, establecimiento, sede y canal, el perfil versionado de identidad y tono, el gobierno de mensajes y claims, las restricciones, la vigencia y la precedencia de fuentes sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `CONTRATO_DE_MEMORIA_DE_MARCA_DEFINIDO`; arquitectura documental completa y reutilizable, sin runtime AURA ni instancia física creada
**Cambios físicos autorizados:** ninguno; no se crean repositorios, rutas, tablas, migraciones, perfiles físicos, campañas, publicaciones, activos, credenciales, prompts, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir la arquitectura canónica con la que AURA deberá gobernar identidad, tono, mensajes, claims, restricciones y vigencia de las marcas del ecosistema sin confundir marca con empresa, sujeto legal, establecimiento, sede, canal, producto, campaña o publicación.

La tarea materializa la memoria de marca exigida por `CAP-SCOPE-014` como un contrato versionado y verificable. No redacta por inferencia una identidad creativa nueva para cada marca ni convierte copies observados en producción en reglas aprobadas.

La decisión raíz es:

```text
MEMORIA DE MARCA
=
IDENTIDAD GOBERNADA
+ TONO VERSIONADO
+ MENSAJES APROBADOS
+ CLAIMS CON EVIDENCIA
+ RESTRICCIONES EXPLICITAS
+ VIGENCIA
+ RESPONSABILIDAD
+ TRAZABILIDAD
```

pero:

```text
COPY OBSERVADO
!=
MENSAJE CANONICO APROBADO
```

```text
MARCA
!=
EMPRESA
!=
SUJETO LEGAL
!=
ESTABLECIMIENTO
!=
SEDE
!=
CANAL
```

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `CAP-SCOPE-001`, para la taxonomía organizacional que distingue `ORGANIZATION_SCOPE`, `LEGAL_SUBJECT`, `BRAND`, `COMMERCIAL_ESTABLISHMENT`, `BUSINESS_LINE`, `PHYSICAL_FACILITY`, `OPERATIONAL_SITE` y `COMMERCIAL_CHANNEL`;
- `CAP-SCOPE-014`, para el producto objetivo AURA, la memoria de marca versionada y la separación entre marca, empresa, sede, canal y audiencia;
- `AURA-AUD-001` a `AURA-AUD-012`, para la decisión aprobada de continuidad diferida de AURA y sus fronteras con las superficies actuales;
- `INT-MKT-001`, para la regla que permite desarrollar el dominio objetivo sin declarar campañas operativas ni ampliar superficies transitorias;
- `VPROC-0056`, para el proceso de contenido y promociones desde solicitud y aprobación hasta publicación y retiro;
- `VPROC-0057`, para mantener separadas las oportunidades comerciales de la memoria de marca;
- el registro canónico de requisitos de prueba vigente;
- la evidencia remota actual de `Vento-Group`, usada únicamente para reconocer superficies y copy observados, no para promoverlos automáticamente a reglas canónicas.

Ninguna fuente empresarial ajena se sustituye desde esta tarea.

---

#### 3. Resultado canónico

Se define una memoria de marca gobernada por perfiles versionados.

Cada perfil deberá permitir resolver, como mínimo:

1. qué identidad comercial gobierna;
2. a qué `ORGANIZATION_SCOPE` pertenece;
3. qué relación documentada mantiene con sujetos legales, establecimientos y sedes;
4. cuál es su propósito de comunicación aprobado;
5. qué tono y reglas de expresión están vigentes;
6. qué mensajes pueden reutilizarse;
7. qué afirmaciones constituyen claims y qué evidencia las soporta;
8. qué restricciones legales, reputacionales, operativas o de canal aplican;
9. para qué audiencia, canal, sede, idioma o contexto existe una variante explícita;
10. desde cuándo y hasta cuándo es válida;
11. quién responde por su aprobación y revisión;
12. qué versión reemplaza o es reemplazada por otra;
13. qué fuente autorizada sustenta datos empresariales variables;
14. qué contenido observado continúa siendo solo evidencia y no regla aprobada.

La memoria no será un prompt libre, una colección de archivos sin relación, una tabla de copies sin vigencia ni una carpeta de logos sin propietario.

---

#### 4. Universo identitario canónico

La arquitectura inicial conserva exactamente las identidades que ya están sustentadas por la taxonomía organizacional aprobada.

| Identidad | Tipo conceptual canónico | Tratamiento en AURA-DOM-001 | Regla |
| --- | --- | --- | --- |
| `Vento Group — Ecosistema` | `ORGANIZATION_SCOPE` | paraguas organizacional y contexto de pertenencia | no se convierte en `BRAND` ni en `LEGAL_SUBJECT` por inferencia |
| `Vento Group S.A.S.` | `LEGAL_SUBJECT` | identidad jurídica referenciable cuando corresponda | no se usa como sustituto automático de una marca comercial |
| `Vento Café` | `BRAND` | marca gobernable por memoria de marca | sus relaciones con establecimiento, sede, operador y titular se mantienen separadas |
| `Saudo` | `BRAND` | marca gobernable por memoria de marca | sus relaciones jurídicas y operativas no se deducen del nombre comercial |
| `Molka` | `BRAND` | marca gobernable por memoria de marca | sus relaciones jurídicas y operativas no se deducen del nombre comercial |
| `Vaila Vainilla` | `BRAND` | marca gobernable por memoria de marca | su operación distribuida no la convierte en sede ni en sujeto legal |

No se promueven automáticamente a marca:

- `Centro de Producción`;
- `Centro de Distribución`;
- `Vento Producción` por su sola condición de establecimiento;
- oficinas;
- instalaciones;
- áreas;
- catering por su sola condición de `BUSINESS_LINE`;
- Rappi, ManyChat, WhatsApp, web u otros canales;
- aplicaciones de Vento OS.

Una identidad adicional solo podrá entrar al universo de marcas cuando la fuente organizacional canónica la clasifique como `BRAND` o una decisión posterior modifique explícitamente esa clasificación.

---

#### 5. Frontera entre ecosistema, marca y operación

AURA deberá conservar relaciones tipadas en vez de asumir equivalencias por nombre, dirección, persona, inmueble o aplicación.

Como mínimo:

```text
BRAND
-> BELONGS_TO_ORGANIZATION_SCOPE
```

cuando la relación exista canónicamente.

La relación jurídica se mantiene aparte:

```text
BRAND
-> relacion documentada con LEGAL_SUBJECT
```

La relación comercial u operativa también se mantiene aparte:

```text
BRAND
-> puede ser usada por uno o varios establecimientos o sedes
```

Por tanto:

- una marca puede operar en más de una sede;
- una sede puede usar una marca sin convertirse en esa marca;
- un titular jurídico puede ser distinto del operador;
- compartir nombre no prueba titularidad;
- compartir dirección no prueba pertenencia de marca;
- una aplicación no adquiere propiedad de marca por mostrarla;
- un canal externo no se vuelve propietario de identidad, mensajes ni claims.

---

#### 6. Contrato del perfil de marca

Cada perfil versionado de marca deberá contener, sin prescribir todavía nombres físicos de tablas:

| Grupo | Contenido obligatorio | Regla |
| --- | --- | --- |
| identidad | marca exacta, clasificación, relación organizacional y referencias documentadas | no inferir sujeto legal, establecimiento o sede |
| propósito | función de la marca en comunicación y razón aprobada de expresión | no confundir con objetivo de una campaña |
| tono | reglas de voz, expresión permitida, expresión prohibida y adaptación contextual | una variante no puede surgir localmente sin quedar explícita |
| mensajes | mensajes aprobados reutilizables con alcance y vigencia | copy observado no se vuelve aprobado por repetición |
| claims | afirmaciones que requieren fuente, evidencia y frescura | sin evidencia suficiente no se publica como hecho |
| restricciones | límites legales, reputacionales, operativos, de audiencia y canal | una restricción prevalece sobre una preferencia creativa |
| identidad visual | referencias a reglas y activos aprobados | la gestión detallada de activos pertenece a `AURA-DOM-003` |
| ámbito | marca, sede, canal, audiencia, idioma y contexto aplicables | los ámbitos se declaran, no se deducen |
| vigencia | inicio, fin o condición de reemplazo | una regla vencida no alimenta contenido nuevo |
| responsabilidad | propietario funcional, aprobador y revisión requerida | la autoría no equivale a aprobación |
| evidencia | fuente autorizada y fecha de verificación cuando exista claim material | la evidencia debe poder reconstruirse |
| versión | identidad de versión y relación con la versión anterior | nunca se sobreescribe historia aprobada |

La implementación futura podrá normalizar físicamente este contrato, pero deberá preservar su semántica.

---

#### 7. Propósito e identidad de marca

El propósito de marca define para qué existe esa identidad dentro de la comunicación comercial. No define por sí mismo:

- una audiencia concreta de campaña;
- un presupuesto;
- una promoción;
- un calendario;
- un canal;
- una pieza;
- una publicación;
- una oferta transaccional.

Esos elementos pertenecen a tareas posteriores.

El propósito deberá expresarse de forma suficientemente estable para guiar contenido entre campañas y suficientemente específica para impedir que dos marcas compartan por defecto la misma voz o promesa.

Cuando la evidencia disponible no permita completar un propósito creativo sin inferencia, el perfil conservará esa dimensión como no aprobada para uso generativo y no inventará una definición para cerrar el campo.

---

#### 8. Tono y reglas de expresión

El tono será una política versionada, no una descripción decorativa.

Deberá poder declarar:

- rasgos expresivos aprobados;
- términos preferidos;
- términos prohibidos;
- tratamientos o fórmulas que deben evitarse;
- uso o restricción de emojis y recursos gráficos cuando aplique;
- nivel de adaptación permitido por canal;
- adaptación por audiencia únicamente cuando exista una variante aprobada;
- excepciones y quién puede aprobarlas;
- contextos sensibles que exigen revisión humana reforzada.

Regla raíz:

```text
ADAPTAR TONO
!=
CAMBIAR IDENTIDAD
```

Una adaptación de longitud, formato o canal no podrá alterar la promesa, el significado material, la condición comercial ni la evidencia de un claim.

---

#### 9. Mensajes

Un mensaje de marca será una formulación aprobada o una regla semántica reutilizable asociada a una marca y a un ámbito explícito.

Cada mensaje deberá distinguir:

```text
mensaje institucional
mensaje de posicionamiento
mensaje de producto u oferta
mensaje de campaña
mensaje de servicio o reputacion
```

sin asumir que todos pertenecen al mismo owner ni tienen la misma vigencia.

Los mensajes institucionales o de posicionamiento pueden ser duraderos. Los mensajes de producto, precio, disponibilidad, fecha, promoción o capacidad deberán consumir información vigente de sus fuentes propietarias y no quedar congelados dentro de la memoria como maestros competidores.

---

#### 10. Claims

Un claim es toda afirmación que un receptor razonable pueda interpretar como un hecho, atributo, beneficio, condición, comparación, disponibilidad, precio, desempeño, origen, resultado o promesa verificable.

Antes de aprobar un claim deberá existir:

1. marca a la que pertenece;
2. texto o significado controlado;
3. fuente autorizada;
4. evidencia suficiente;
5. fecha de verificación;
6. alcance donde puede utilizarse;
7. restricciones o condiciones;
8. vigencia;
9. responsable de aprobación;
10. regla de retiro cuando la evidencia deje de ser válida.

Queda prohibido transformar en claim aprobado únicamente porque aparezca:

- en un sitio actual;
- en una red social;
- en un documento histórico;
- en una pieza antigua;
- en un mensaje de una persona;
- en una salida de IA;
- en un copy repetido durante mucho tiempo.

---

#### 11. Precedencia de fuentes para afirmaciones variables

La memoria de marca no será fuente maestra de hechos que pertenecen a otros dominios.

| Dato o afirmación | Fuente propietaria o frontera que debe respetarse | Tratamiento en AURA |
| --- | --- | --- |
| identidad organizacional, marca, establecimiento y sede | catálogo organizacional canónico | referenciar; no duplicar maestros |
| producto, presentación y atributos maestros aprobados | NEXO y contratos propietarios aplicables | consumir para comunicación; no editar desde memoria de marca |
| receta, producción o capacidad productiva | FOGO y contratos operativos aplicables | consumir solo cuando el mensaje lo requiera y exista autoridad |
| precio, venta y ejecución transaccional | PULSO y contratos comerciales aplicables | nunca fijar como verdad permanente en un claim sin vigencia |
| beneficios y relación personal con cliente | PASS dentro de su autoridad | respetar consentimiento, finalidad y canal permitido |
| margen, presupuesto, costo y resultado económico | NUMERA | usar solo métricas autorizadas y con contexto |
| disponibilidad operativa | fuentes propietarias de inventario, producción y operación | no prometer disponibilidad desde memoria estática |
| casos, reclamos y resolución administrativa | VISO o servicio propietario aplicable | no cerrar un caso mediante copy público |
| métricas nativas de publicación | canal externo | registrar como señal; no convertirlas por sí solas en resultado empresarial |

Si dos fuentes materiales discrepan, AURA no elegirá silenciosamente la que favorezca el mensaje. El contenido afectado deberá bloquearse o quedar explícitamente sujeto a revisión.

---

#### 12. Copy público observado y estado documental

La evidencia remota disponible permite reconocer copy histórico o actualmente observado en superficies de Vento Group, pero no demuestra por sí sola aprobación canónica de memoria de marca.

Se conserva la siguiente clasificación documental:

| Identidad | Evidencia observada | Tratamiento en esta tarea |
| --- | --- | --- |
| `Vento Group — Ecosistema` | el sitio presenta un portafolio de conceptos gastronómicos con identidad propia | evidencia de comunicación corporativa; no se crea un claim canónico nuevo |
| `Vento Café` | aparece copy público asociado a la experiencia del restaurante | evidencia observada; requiere aprobación y vigencia antes de reutilización como regla de marca |
| `Saudo` | aparece copy público que describe pizzas napolitanas de masa madre | afirmación material observada; requiere fuente y evidencia antes de convertirse en claim canónico |
| `Molka` | aparece copy público que describe panadería y pastelería colombiana | afirmación de categoría observada; requiere aprobación antes de convertirse en claim canónico |
| `Vaila Vainilla` | no se verificó en la superficie pública de Vento Group consumida por esta tarea un perfil equivalente | no se inventa propósito, tono, mensaje ni claim para completar la matriz |

Esta tabla es una línea base de observación, no una aprobación creativa.

---

#### 13. Restricciones globales de memoria de marca

Toda marca deberá heredar las siguientes restricciones mínimas:

1. no inventar productos, ingredientes, propiedades, beneficios, precios, descuentos, fechas, disponibilidad, capacidad, resultados, testimonios o condiciones legales;
2. no copiar como maestros datos que pertenecen a NEXO, FOGO, PULSO, PASS, NUMERA, VISO u otra fuente autorizada;
3. no publicar una versión vencida porque siga visible en una superficie antigua;
4. no mezclar reglas de dos marcas por compartir sede, personal, titular, producto o canal;
5. no atribuir a `Vento Group S.A.S.` un mensaje comercial solo porque sea sujeto legal;
6. no atribuir a `Vento Group — Ecosistema` la voz de una marca específica;
7. no convertir establecimientos, sedes, áreas o canales en marcas por inferencia;
8. no usar un claim cuando su evidencia haya expirado, sido retirada o contradicha;
9. no alterar una condición material al adaptar tono, formato o longitud;
10. no tratar una salida de IA como contenido aprobado;
11. no usar información personal o sensible para personalizar tono sin finalidad, base y autorización;
12. no convertir una promoción en una regla transaccional desde AURA;
13. no usar métricas de interacción como prueba automática de efectividad o rentabilidad;
14. no presentar una opinión, estimación o propuesta como hecho verificado.

---

#### 14. Variantes y precedencia de perfil

`CAP-SCOPE-014` exige perfiles versionados por marca, sede, canal y audiencia. La especialización solo será válida cuando exista explícitamente.

La precedencia será:

```text
PERFIL BASE DE MARCA
-> VARIANTE EXPLICITA DE SEDE, SI EXISTE
-> VARIANTE EXPLICITA DE CANAL, SI EXISTE
-> VARIANTE EXPLICITA DE AUDIENCIA O CONTEXTO, SI EXISTE
```

Una capa más específica solo podrá cambiar las dimensiones declaradas por esa variante. Todo lo demás seguirá heredado desde el perfil base vigente.

Quedan prohibidas variantes implícitas creadas únicamente porque:

- una sede usa palabras distintas;
- una cuenta social publica con otro estilo;
- una persona acostumbra cierto copy;
- un proveedor externo genera textos distintos;
- una campaña antigua contiene una excepción;
- un canal impone límites de longitud.

Las restricciones globales y los claims con evidencia no pueden relajarse por herencia local sin una nueva aprobación explícita.

---

#### 15. Vigencia y versionado

La memoria deberá conservar historial completo.

El ciclo documental mínimo será:

```text
borrador
-> revision
-> aprobado
-> vigente
-> sustituido o vencido
-> archivado
```

La implementación física podrá usar nombres técnicos equivalentes, pero deberá conservar estas semánticas y no colapsarlas en un booleano genérico.

Reglas:

- aprobar no equivale a volver vigente inmediatamente si existe fecha futura;
- finalizar vigencia no elimina historia;
- sustituir una regla debe identificar qué versión la reemplaza;
- dos reglas contradictorias no pueden permanecer vigentes para el mismo ámbito sin una prioridad explícita;
- una regla sin vigencia demostrable no puede usarse para publicación automática;
- un claim pierde utilizabilidad cuando su evidencia deja de satisfacer su condición de frescura;
- una campaña puede referenciar una versión histórica, pero no convertirla nuevamente en vigente.

---

#### 16. Cambios de identidad y nombres

Un cambio de nombre, posicionamiento o identidad principal no será una edición silenciosa del perfil vigente.

Deberá:

1. conservar la identidad histórica;
2. declarar fecha efectiva;
3. identificar el cambio de versión;
4. revisar mensajes y claims afectados;
5. revisar activos y plantillas afectados sin absorber el trabajo de `AURA-DOM-003`;
6. revisar campañas programadas y publicaciones futuras;
7. revisar referencias públicas, SEO, enlaces y canales cuando corresponda;
8. registrar responsable y aprobación;
9. preservar evidencia de la versión anterior.

Una marca retirada podrá permanecer consultable históricamente, pero no deberá seguir disponible para crear contenido nuevo salvo excepción aprobada.

---

#### 17. Responsabilidad y aprobación

La arquitectura distingue:

```text
autor
!=
revisor
!=
aprobador
!=
publicador
```

`AURA-DOM-001` define la necesidad de estas responsabilidades, pero no asigna permisos técnicos ni matrices de autorización. Esa responsabilidad corresponde a `AURA-AUTH-001` y `AURA-AUTH-002`.

El perfil deberá conservar quién:

- propuso la regla;
- la revisó;
- la aprobó;
- cambió su vigencia;
- la sustituyó o retiró;
- aprobó una excepción.

Ninguna acción editorial adquiere autoridad técnica por quedar mencionada en esta tarea.

---

#### 18. Relación con campañas y contenido

La memoria de marca es entrada obligatoria para tareas posteriores, pero no absorbe sus objetos.

```text
MEMORIA DE MARCA
-> condiciona BRIEF
-> condiciona CONTENIDO
-> condiciona CAMPANA
-> condiciona PUBLICACION
```

pero:

```text
MEMORIA DE MARCA
!=
BRIEF
!=
CONTENIDO
!=
CAMPANA
!=
PUBLICACION
```

`AURA-DOM-002` definirá objetivos, audiencias, briefs, calendario, presupuesto, dependencias y ciclo de campaña.

`AURA-DOM-003` definirá activos, derechos, versiones y reutilización.

`AURA-DOM-004` definirá grounding y asistencia de IA.

`AURA-DOM-005` definirá cuentas, canales, programación, publicación, retiro y reconciliación.

---

#### 19. Handoff obligatorio a `AURA-DOM-002`

La siguiente tarea deberá recibir como entrada:

- el universo de marcas sin reinterpretarlo;
- la distinción entre `ORGANIZATION_SCOPE`, `LEGAL_SUBJECT`, `BRAND`, establecimiento, sede y canal;
- el perfil base de marca como fuente de reglas de identidad y tono;
- claims únicamente cuando estén aprobados y vigentes;
- restricciones globales y específicas;
- variantes explícitas por sede, canal, audiencia o contexto;
- la regla de no copiar productos, precios, disponibilidad, clientes o ventas como maestros;
- la vigencia de las reglas utilizadas por cada brief o campaña.

Una campaña futura deberá registrar qué versión de memoria de marca consumió. La modificación posterior de la memoria no reescribe retrospectivamente el expediente de una campaña cerrada.

---

#### 20. Requisitos de prueba derivados

`NO GENERA REQUISITOS DE PRUEBA`.

Justificación:

- el riesgo de gobernar marcas, mensajes, claims, vigencia, aprobación y fronteras ya está cubierto por requisitos existentes del dominio AURA;
- esta tarea desarrolla el contrato responsable sin introducir una regla protegida nueva que requiera un identificador adicional;
- no cambia estado, texto, relación, paquete, ambiente, evidencia ni ownership de una fila del registro 04A.

Requisitos creados: 0.

Requisitos modificados: 0.

Requisitos diferidos: 0.

Requisitos obsoletos: 0.

---

#### 21. Cobertura de prueba vigente reutilizada

La tarea queda trazada, sin modificar el registro, contra:

- `TREQ-AURA-001`, para marcas, mensajes, campañas, contenido, activos, versiones, vigencias y estados diferenciados;
- `TREQ-AURA-011` y `TREQ-AURA-012`, para creación y actualización de contenido sin publicación accidental, pérdida de identidad ni rotura de referencias;
- `TREQ-AURA-019`, para historial editorial y recuperación sin pérdida de trazabilidad;
- `TREQ-AURA-026`, para auditoría y observabilidad de las mutaciones editoriales;
- los requisitos transversales de integración que impiden duplicar fuentes propietarias de otros dominios.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación de requisitos.

---

#### 22. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra un checkout local desde esta entrega |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local ni se ejecutaron validadores del repositorio desde esta entrega |
| REMOTA | PASS | se verificaron el archivo propietario, la topología `DEFINE_ONCE` + `NO_PHYSICAL_INSTANCE`, `CAP-SCOPE-001`, `CAP-SCOPE-014`, la continuidad AURA, el registro 04A de AURA y superficies remotas relevantes de Vento Group |
| OPERATIVA | NOT_APPLICABLE | esta tarea define arquitectura documental; no ejecuta campañas, contenido, atención, ventas ni operación real |
| FÍSICA | NOT_APPLICABLE | la topología canónica no crea instancia física propia y la tarea no autoriza runtime, Supabase, repositorios, datos ni despliegues |

La validación remota demuestra consistencia documental de la propuesta. La validación real del repositorio permanece pendiente hasta incorporar el artefacto en la rama documental correspondiente y ejecutar los validadores canónicos.

---

#### 23. Criterios de aceptación

`AURA-DOM-001` queda satisfecha cuando simultáneamente:

1. `Vento Group — Ecosistema` permanece separado de `Vento Group S.A.S.` y de las marcas comerciales;
2. `Vento Café`, `Saudo`, `Molka` y `Vaila Vainilla` permanecen reconocidas como `BRAND` sin inferir titularidad o sede por nombre;
3. establecimientos, sedes, instalaciones, líneas de negocio y canales no se convierten en marcas por inferencia;
4. existe un contrato de perfil versionado para identidad, propósito, tono, mensajes, claims, restricciones, vigencia, responsabilidad y evidencia;
5. copy observado queda separado de mensaje aprobado;
6. claim queda separado de opinión, propuesta o copy histórico;
7. toda afirmación material exige fuente y vigencia;
8. productos, precios, disponibilidad, clientes, ventas y resultados conservan sus fuentes propietarias;
9. las variantes por sede, canal, audiencia o contexto son explícitas y no implícitas;
10. las restricciones prevalecen sobre preferencias creativas locales;
11. el versionado conserva historia y evita sobrescritura silenciosa;
12. un cambio de identidad no reescribe retrospectivamente campañas o contenido histórico;
13. la tarea no crea permisos ni absorbe `AURA-AUTH-*`;
14. la tarea no define campañas ni absorbe `AURA-DOM-002`;
15. la tarea no define la biblioteca completa de activos ni absorbe `AURA-DOM-003`;
16. se crean y modifican cero requisitos de prueba;
17. no se crea ninguna instancia física;
18. la continuidad queda reservada exclusivamente a `AURA-DOM-002`.

---

#### 24. Límites

Esta tarea no autoriza ni ejecuta:

- crear un repositorio o runtime de AURA;
- modificar VISO, Vento-Group u otra aplicación;
- crear tablas, migraciones, RPC, RLS, funciones, triggers, jobs o Storage;
- migrar CMS desde VISO hacia AURA;
- crear campañas, audiencias, briefs o presupuestos;
- generar o publicar contenido real;
- aprobar como canónicos los copies observados en superficies actuales;
- inventar propósito, personalidad, tono o claim faltante para una marca;
- crear identidades comerciales nuevas;
- cambiar titularidad legal, operación, establecimiento o sede;
- cambiar productos, precios, stock, disponibilidad, pedidos, ventas, puntos, costos o margen;
- conectar Meta, Instagram, TikTok, Google, WhatsApp, correo, IA u otros proveedores;
- asignar permisos o aprobadores técnicos;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-DOM-002`.

---

#### 25. Continuidad

**ÚLTIMA TAREA APROBADA**
`WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz`

**TAREA ACTUAL APROBADA**
`AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña`

### ✅ AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia
**Tarea siguiente:** AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido
**Tipo de tarea:** definición técnico-documental del contrato canónico de planificación de comunicación y campañas de AURA; fija objetivos, audiencias, brief, calendario, presupuesto, dependencias, guardas documentales y ciclo de campaña sin crear una instancia física propia ni ejecutar campañas reales
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean repositorios, rutas, tablas, migraciones, campañas operativas, audiencias reales, presupuestos ejecutables, promociones, publicaciones, credenciales, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá convertir una necesidad de comunicación o desarrollo comercial en una iniciativa planificada, verificable y aprobable antes de crear piezas, publicar, activar promociones o comprometer presupuesto.

La tarea resuelve la brecha identificada por `CAP-SCOPE-014`: actualmente no existe un ciclo AURA canónico que una de forma trazable objetivo, audiencia, brief, presupuesto, capacidad, aprobación, dependencias y calendario.

La regla raíz es:

```text
CAMPANA PLANIFICADA
=
OBJETIVO EMPRESARIAL
+ HIPOTESIS
+ AUDIENCIA Y EXCLUSIONES
+ BRIEF VERSIONADO
+ CALENDARIO
+ PRESUPUESTO REFERENCIADO
+ DEPENDENCIAS
+ RESTRICCIONES
+ RESPONSABLES
+ CRITERIOS DE INICIO, PAUSA Y CIERRE
+ TRAZABILIDAD
```

pero:

```text
TITULO + FECHAS
!=
CAMPANA DEFINIDA
```

```text
IDEA
!=
CAMPANA
!=
CONTENIDO
!=
PUBLICACION
!=
PROMOCION
```

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, que entrega el universo de marcas, la memoria de marca versionada, claims aprobados, restricciones y reglas de vigencia que todo brief deberá referenciar;
- `CAP-SCOPE-014`, para `CAP-14.02 — Planear comunicación y promociones`, el brief guiado, la necesidad de objetivo, audiencia, oferta o mensaje, restricciones, canal, tiempo, presupuesto, capacidad y dependencias;
- `H-CAP-SCOPE-014-006`, que identifica la ausencia del ciclo canónico de objetivo, audiencia, brief, presupuesto, capacidad, aprobación y calendario;
- `H-CAP-SCOPE-014-007`, que exige mantener separadas idea, campaña, pieza, publicación y promoción;
- `VPROC-0056`, como proceso canónico de contenido y promociones desde solicitud y brief hasta publicación, revisión de rendimiento y cierre del ciclo de contenido;
- `INT-MKT-001`, que permite desarrollar el dominio objetivo sin declarar una campaña operativa ni ampliar superficies transitorias;
- las fronteras propietarias de NEXO, FOGO, PULSO, PASS, NUMERA y VISO ya aprobadas;
- el registro canónico de requisitos de prueba vigente.

Esta tarea no modifica esas fuentes ni crea una fuente maestra competidora.

---

#### 3. Resultado canónico

AURA deberá manejar la planificación como un expediente versionado que permita responder, antes de aprobar una iniciativa:

1. qué resultado empresarial se busca;
2. qué hipótesis justifica la iniciativa;
3. qué marca y versión de memoria de marca gobiernan el trabajo;
4. a qué audiencia se dirige y a quién se excluye;
5. qué mensaje, oferta o acción se propone;
6. qué hechos variables deben consultarse desde fuentes autorizadas;
7. qué restricciones aplican;
8. qué piezas o entregables serán necesarios;
9. qué canales se contemplan sin asumir que ya están conectados;
10. en qué periodo se pretende ejecutar;
11. qué presupuesto o límite económico debe respetarse;
12. qué dependencias empresariales, operativas, creativas, legales o técnicas existen;
13. qué aprobaciones son necesarias;
14. qué condición permite iniciar;
15. qué condición obliga a pausar, revisar o cancelar;
16. qué evidencia permitirá cerrar el ciclo y registrar aprendizaje.

El expediente deberá conservar historia y no podrá reducirse a una descripción libre sin estructura, fechas ni responsables.

---

#### 4. Frontera del objeto de planificación

La planificación distingue explícitamente:

```text
SOLICITUD O IDEA
-> puede originar una iniciativa
```

```text
INICIATIVA PLANIFICADA
-> puede convertirse en campaña aprobada
```

```text
CAMPANA
-> puede requerir contenido, publicaciones, promociones o experimentos
```

pero ninguna relación es automática.

Una idea no adquiere presupuesto, audiencia ni autoridad por ser registrada.

Una campaña no se vuelve publicable porque exista un brief.

Una pieza aprobada no activa por sí sola una promoción.

Una promoción aprobada no cambia precios ni descuentos directamente desde AURA.

---

#### 5. Contrato del objetivo empresarial

Toda iniciativa deberá declarar el resultado empresarial buscado antes de definir contenido.

Como mínimo deberá conservar:

- resultado deseado;
- problema u oportunidad que lo origina;
- hipótesis que conecta la acción propuesta con el resultado;
- alcance de marca, sede, producto, servicio o frente comercial cuando corresponda;
- periodo al que aplica;
- responsable del objetivo;
- criterios de éxito o decisión que puedan evaluarse posteriormente;
- fuentes que alimentarán la evaluación;
- limitaciones conocidas.

El objetivo no podrá expresarse únicamente como:

- publicar cierta cantidad de piezas;
- aumentar likes;
- obtener impresiones;
- completar un calendario;
- usar un canal;
- crear un cupón.

Esas son actividades o señales. El resultado empresarial deberá quedar separado de la actividad ejecutada.

La definición detallada de atribución, confianza, incrementalidad y aprendizaje corresponde a `AURA-DOM-008`.

---

#### 6. Hipótesis

La planificación deberá conservar la hipótesis que justifica una campaña cuando exista una relación causal propuesta.

La hipótesis deberá poder expresar:

```text
SI se ejecuta una accion aprobada
PARA una audiencia definida
BAJO determinadas condiciones
ENTONCES se espera un resultado empresarial observable
```

La hipótesis:

- no se presentará como hecho;
- no sustituirá evidencia;
- deberá diferenciar resultado esperado de resultado observado;
- deberá registrar supuestos materiales;
- deberá poder invalidarse o quedar no concluyente;
- no autorizará por sí sola gasto, contacto, promoción ni publicación.

---

#### 7. Contrato de audiencia

Una audiencia será una definición gobernada de destinatarios elegibles o relevantes para una iniciativa, no una copia libre de una base de clientes.

Cada definición de audiencia deberá conservar, cuando corresponda:

- propósito de uso;
- marca o iniciativa aplicable;
- criterios de inclusión;
- criterios de exclusión;
- canal o contexto previsto;
- alcance geográfico u operativo cuando sea material;
- fuente de los atributos utilizados;
- fecha o condición de vigencia;
- requisitos de consentimiento o finalidad aplicables;
- responsable de revisión;
- restricciones de sensibilidad o uso.

AURA no se convertirá en fuente maestra de identidad de cliente.

```text
AURA
-> define la audiencia de trabajo

PASS / fuente propietaria aplicable
-> conserva identidad, consentimiento y atributos bajo su autoridad
```

Una definición de audiencia no autoriza todavía la extracción, exportación o carga de personas a un canal externo.

Ese acceso dependerá de autorización e integración posteriores.

---

#### 8. Exclusiones de audiencia

Toda audiencia deberá poder registrar exclusiones explícitas.

Como mínimo se deberán considerar:

- personas sin consentimiento aplicable cuando el canal lo requiera;
- personas con exclusión o baja vigente;
- segmentos incompatibles con la oferta o finalidad;
- territorios o sedes fuera de alcance;
- condiciones legales, reputacionales o contractuales;
- grupos cuya inclusión pueda causar daño operativo o experiencia engañosa;
- clientes o contactos que no deban recibir una comunicación por frecuencia, contexto o estado del caso cuando exista esa regla aprobada.

Una exclusión prevalece sobre la conveniencia comercial de ampliar alcance.

---

#### 9. Contrato del brief

Cada iniciativa deberá partir de un brief versionado.

El brief mínimo deberá responder:

1. qué resultado empresarial busca;
2. a quién se dirige;
3. qué oferta, mensaje o acción propone;
4. qué restricciones existen;
5. dónde y cuándo pretende comunicarse.

Además deberá referenciar:

- marca y versión de memoria de marca de `AURA-DOM-001`;
- objetivo e hipótesis;
- audiencia y exclusiones;
- fuentes de hechos variables;
- productos, servicios o categorías involucrados sin duplicar sus maestros;
- piezas o resultados creativos esperados;
- canales candidatos;
- periodo y calendario;
- presupuesto o límite económico aplicable;
- dependencias;
- riesgos y guardas conocidos;
- responsables de preparación, revisión y aprobación;
- criterios que impiden avanzar si falta información material.

El brief podrá evolucionar, pero cada revisión deberá conservar versión, autoría, motivo y relación con la revisión anterior.

---

#### 10. Condiciones de completitud del brief

AURA deberá marcar como incompleto un brief cuando falte información material para la iniciativa.

Como mínimo deberá advertir cuando falte una fuente válida para:

- precio;
- disponibilidad;
- margen o presupuesto;
- capacidad productiva u operativa;
- consentimiento o finalidad;
- aprobación necesaria;
- material o derechos requeridos;
- claim material;
- fecha o condición comercial;
- canal realmente habilitado.

Regla:

```text
DATO FALTANTE
-> NO SE INVENTA
-> NO SE RELLENA CON COPY
-> NO SE TRATA COMO APROBADO
```

Una recomendación o salida de IA podrá proponer cómo completar el brief, pero no podrá crear hechos empresariales inexistentes.

---

#### 11. Calendario

El calendario de AURA será una vista temporal de iniciativas, dependencias y compromisos, no la fuente de verdad de publicación externa.

Cada iniciativa deberá poder conservar:

- periodo previsto;
- hitos de brief, revisión y aprobación;
- ventanas de creación;
- fechas objetivo para piezas y entregables;
- ventanas de publicación previstas cuando corresponda;
- fechas comerciales relevantes;
- dependencias de otras iniciativas;
- bloqueos y riesgos temporales;
- fecha de revisión de resultados;
- fecha o condición de cierre.

El calendario no podrá asumir que un canal externo ejecutará una acción hasta que exista integración y confirmación en las tareas propietarias posteriores.

```text
CALENDARIO AURA
!=
COLA DE PUBLICACION DEL CANAL
```

La publicación, reintento, retiro y reconciliación por canal pertenecen a `AURA-DOM-005`.

---

#### 12. Presupuesto

AURA gobernará la intención y referencia presupuestal de una iniciativa, pero no sustituirá a NUMERA como fuente económica.

La planificación deberá poder conservar:

- presupuesto previsto;
- límite o restricción económica aplicable;
- responsable de la solicitud;
- referencia a la aprobación económica cuando exista;
- periodo de consumo;
- distribución prevista por canal o actividad cuando sea necesaria;
- compromisos o gastos observables cuando la fuente propietaria los exponga;
- condición que obliga a revisión por desviación.

```text
PRESUPUESTO EN AURA
-> referencia y gobierna la iniciativa

NUMERA
-> conserva fuente económica, margen, presupuesto y resultado financiero autorizado
```

AURA no podrá inventar disponibilidad presupuestal ni aprobar gasto por sí sola.

---

#### 13. Dependencias

Cada iniciativa deberá registrar dependencias explícitas antes de su aprobación.

Las dependencias podrán incluir, sin convertir esta tarea en propietaria de ellas:

| Dependencia | Fuente o propietario a respetar | Regla de planificación |
| --- | --- | --- |
| memoria de marca, mensajes y claims | `AURA-DOM-001` | referenciar la versión vigente o una versión histórica autorizada |
| activos, derechos y material creativo | `AURA-DOM-003` | no declarar listo un entregable sin material y derechos suficientes |
| IA y grounding | `AURA-DOM-004` | no tratar propuesta de IA como dato aprobado |
| cuentas, canales y publicación | `AURA-DOM-005` | un canal previsto no equivale a canal integrado |
| experimentos, promociones y cupones | `AURA-DOM-006` | la planificación no materializa reglas promocionales |
| producto y atributos maestros | NEXO y contratos propietarios | consumir referencias; no duplicar maestros |
| capacidad productiva | FOGO y contratos aplicables | una campaña no puede prometer capacidad inexistente |
| disponibilidad e inventario | fuentes operativas propietarias | no convertir una lectura puntual en promesa permanente |
| venta y ejecución transaccional | PULSO | la campaña no crea una venta ni una regla de caja |
| cliente y consentimiento | PASS o fuente propietaria | la audiencia no sustituye identidad ni consentimiento |
| margen y presupuesto | NUMERA | la campaña no decide por sí sola viabilidad económica |
| casos y servicio | VISO o propietario aplicable | marketing no cierra reclamos ni casos |

Toda dependencia material deberá poder quedar en estado no satisfecho sin que AURA la convierta silenciosamente en cumplida.

---

#### 14. Guardas previas a aprobación

Antes de aprobar una iniciativa, el expediente deberá permitir verificar como mínimo:

- objetivo definido;
- audiencia definida;
- exclusiones aplicables;
- marca y versión de memoria identificadas;
- claims materiales con evidencia suficiente;
- brief completo;
- periodo y calendario coherentes;
- presupuesto referenciado cuando aplique;
- dependencias identificadas;
- capacidad y disponibilidad comprobables cuando la promesa lo requiera;
- consentimiento y finalidad cuando exista contacto personal;
- piezas, activos o entregables requeridos identificados;
- responsables y aprobaciones necesarias conocidos;
- riesgos económicos, operativos, reputacionales y legales relevantes documentados.

La ausencia de una guarda material impide tratar la iniciativa como lista para ejecución.

---

#### 15. Ciclo documental de campaña

`AURA-DOM-002` define el ciclo de planificación y gobierno sin crear un nuevo namespace de estados técnicos.

El ciclo conceptual es:

```text
solicitud o idea
-> brief en preparación o revisión
-> plan completo para aprobación
-> plan aprobado
-> ventana de ejecución coordinada
-> revisión de resultados
-> cierre y aprendizaje
```

Los estados físicos que una implementación futura use deberán respetar estas diferencias y no colapsarlas en un único booleano.

Para el contenido asociado, se conserva el proceso canónico `VPROC-0056`:

```text
CONTENT_REQUESTED
-> BRIEF_UNDER_REVIEW
-> IN_CREATION
-> UNDER_REVIEW
-> PENDING_APPROVAL
-> APPROVED
-> SCHEDULED
-> PUBLISHED
-> PERFORMANCE_REVIEW
-> CONTENT_CYCLE_REVIEWED
```

La campaña y el ciclo de contenido permanecen relacionados pero no son el mismo objeto.

---

#### 16. Relación entre campaña y `VPROC-0056`

Una campaña podrá originar una o varias solicitudes de contenido bajo `VPROC-0056`.

Por tanto:

```text
CAMPANA
-> puede agrupar solicitudes de contenido
```

pero:

```text
CAMPANA
!=
INSTANCIA DE VPROC-0056
```

Una campaña puede existir en planificación antes de que se cree una pieza.

Una pieza puede existir por una necesidad institucional sin pertenecer a una campaña.

El cierre de una pieza no cierra automáticamente la campaña.

El cierre de una campaña no elimina el historial de sus piezas.

---

#### 17. Separación de campaña, promoción y experimento

`AURA-DOM-002` define el sobre de planificación de campaña, pero no absorbe el contrato detallado de experimentos, promociones, cupones ni guardas de ejecución.

La frontera queda:

```text
AURA-DOM-002
-> objetivo, audiencia, brief, calendario, presupuesto, dependencias y ciclo documental
```

```text
AURA-DOM-006
-> campañas como mecanismo ejecutable, experimentos, promociones, cupones y guardas economicas y operativas
```

Por tanto, esta tarea puede registrar que una iniciativa prevé una promoción o experimento, pero no define elegibilidad transaccional, redención, reversión, grupos de control, condiciones de cupón ni mecanismos de ejecución.

---

#### 18. Aprobación y responsabilidades

La planificación deberá distinguir:

```text
solicitante
!=
responsable de campana
!=
autor de brief
!=
revisor
!=
aprobador
!=
publicador
```

`AURA-DOM-002` exige registrar esas responsabilidades, pero no crea permisos ni capacidades técnicas.

La separación de funciones y autorización corresponde a `AURA-AUTH-001` y `AURA-AUTH-002`.

Una aprobación deberá quedar asociada a una versión concreta del plan. Una modificación material posterior deberá requerir nueva revisión proporcional a lo que cambió.

---

#### 19. Cambios materiales de planificación

Se consideran cambios materiales, cuando afecten la decisión aprobada:

- objetivo;
- hipótesis;
- marca;
- audiencia o exclusiones;
- oferta o mensaje principal;
- presupuesto o límite económico;
- periodo;
- canal principal;
- claim material;
- dependencia crítica;
- restricción legal, operativa o reputacional;
- condición de inicio, pausa o cierre.

Un cambio material no deberá sobreescribir silenciosamente la versión aprobada.

La versión anterior permanecerá reconstruible para explicar qué fue aprobado y qué se ejecutó realmente.

---

#### 20. Pausa, cancelación y cierre

El expediente deberá permitir registrar por qué una iniciativa se pausa, cancela o cierra.

Razones válidas podrán incluir, entre otras:

- daño económico;
- inviabilidad operativa;
- falta de capacidad;
- falta de inventario o disponibilidad;
- pérdida de vigencia de una oferta o claim;
- riesgo reputacional;
- problema legal o de consentimiento;
- indisponibilidad de canal;
- dependencia no satisfecha;
- resultado suficiente para cerrar;
- aprendizaje que invalida la hipótesis;
- decisión humana autorizada.

Pausar o cancelar no elimina historia.

Cerrar exige conservar resultado y aprendizaje, aunque el resultado sea no concluyente.

La definición detallada de métricas y atribución se mantiene en `AURA-DOM-008`.

---

#### 21. Trazabilidad temporal

Cada versión del expediente deberá permitir reconstruir:

- cuándo se creó;
- qué versión de memoria de marca utilizó;
- qué objetivo e hipótesis estaban vigentes;
- qué audiencia se definió;
- qué brief se aprobó;
- qué presupuesto se referenció;
- qué calendario se aprobó;
- qué dependencias estaban satisfechas o pendientes;
- qué cambio material ocurrió;
- quién lo propuso, revisó y aprobó;
- qué versión sustituyó a cuál;
- cuál fue la condición de cierre.

La modificación posterior de marca, productos, precios, capacidad, presupuesto o consentimiento no reescribe retrospectivamente el expediente histórico.

---

#### 22. Handoff obligatorio a `AURA-DOM-003`

La siguiente tarea deberá recibir como entrada:

- campaña, iniciativa o brief como contexto identificable y versionado;
- marca y versión de memoria de marca aplicables;
- piezas o entregables requeridos por el brief;
- canales candidatos y formatos previstos;
- fechas objetivo del calendario;
- restricciones y claims que afecten la producción creativa;
- responsables y aprobaciones requeridos;
- necesidad de material existente o nuevo;
- regla de no marcar una pieza como utilizable sin comprobar derechos, versión y vigencia.

`AURA-DOM-003` definirá la biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido. No deberá redefinir objetivo, audiencia, presupuesto o calendario de campaña.

---

#### 23. Requisitos de prueba derivados

`NO GENERA REQUISITOS DE PRUEBA`.

Justificación:

- la planificación de marca, audiencias, campañas, contenido, aprobaciones, promociones y fronteras empresariales ya está cubierta por requisitos vigentes del dominio AURA e integración;
- esta tarea desarrolla el contrato documental responsable de `CAP-14.02` sin introducir una obligación protegida que requiera un identificador nuevo;
- no cambia texto, estado, relación, owner, paquete, ambiente ni evidencia de ninguna fila del registro 04A.

Requisitos creados: 0.

Requisitos modificados: 0.

Requisitos diferidos: 0.

Requisitos obsoletos: 0.

---

#### 24. Cobertura de prueba vigente reutilizada

La tarea queda trazada, sin modificar el registro, contra:

- `TREQ-AURA-001`, para marcas, planificación, campañas, contenido, activos, versiones, vigencias y estados diferenciados;
- `TREQ-AURA-002`, para asistencia de IA, grounding, privacidad y revisión humana cuando el plan sea asistido;
- `TREQ-AURA-003`, para campañas, promociones, oportunidades, presupuestos, guardas, atribución y fronteras PULSO/PASS/NUMERA;
- `TREQ-AURA-026`, para auditoría correlacionable de lecturas y mutaciones editoriales;
- `TREQ-INTEGRATION-019`, para contratos de marketing, canales, idempotencia, conciliación y fuentes de verdad.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación de requisitos.

---

#### 25. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra un checkout local desde esta entrega |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local ni se ejecutaron validadores del repositorio desde esta entrega |
| REMOTA | PASS | se verificaron el archivo propietario, la topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, `CAP-SCOPE-014`, `H-CAP-SCOPE-014-006`, `H-CAP-SCOPE-014-007`, `VPROC-0056`, `INT-MKT-001`, el registro 04A de AURA y el `package.json` vigente |
| OPERATIVA | NOT_APPLICABLE | esta tarea define el contrato documental de planificación y no ejecuta campañas, contactos, promociones, publicaciones, gastos ni operación real |
| FÍSICA | NOT_APPLICABLE | la topología canónica no crea instancia física propia y la tarea no autoriza runtime, Supabase, repositorios, datos, integraciones ni despliegues |

La validación remota demuestra consistencia documental de la propuesta. La validación real del repositorio permanece pendiente hasta incorporar el artefacto en la rama documental correspondiente y ejecutar los validadores canónicos.

---

#### 26. Criterios de aceptación

`AURA-DOM-002` queda satisfecha cuando simultáneamente:

1. toda iniciativa requiere un objetivo empresarial explícito y no solo una actividad de marketing;
2. la hipótesis se separa de hechos y resultados observados;
3. la audiencia conserva criterios de inclusión, exclusión, finalidad, fuente y vigencia;
4. AURA no se convierte en fuente maestra de identidad ni consentimiento de cliente;
5. cada brief responde qué se busca, para quién, qué se propone, qué restricciones existen y dónde y cuándo se pretende comunicar;
6. el brief referencia la versión de memoria de marca entregada por `AURA-DOM-001`;
7. la falta de precio, disponibilidad, margen, capacidad, consentimiento, aprobación, material o claim válido bloquea la completitud correspondiente en vez de ser inventada;
8. el calendario se separa de la cola de publicación real de un canal;
9. el presupuesto se referencia sin convertir a AURA en fuente económica ni aprobador de gasto;
10. las dependencias con NEXO, FOGO, PULSO, PASS, NUMERA, VISO y tareas AURA posteriores quedan explícitas;
11. idea, campaña, contenido, publicación y promoción permanecen objetos distintos;
12. el ciclo documental conserva solicitud, brief, aprobación, ventana de ejecución, revisión y cierre sin crear un namespace de estados técnicos nuevo;
13. `VPROC-0056` permanece intacto como ciclo canónico del contenido asociado;
14. la campaña no se confunde con una instancia de `VPROC-0056`;
15. `AURA-DOM-006` conserva ownership de experimentos, promociones, cupones y guardas de ejecución;
16. cambios materiales conservan versión e historia;
17. pausa, cancelación y cierre conservan motivo y aprendizaje;
18. se crean y modifican cero requisitos de prueba;
19. no se crea ninguna instancia física;
20. la continuidad queda reservada exclusivamente a `AURA-DOM-003`.

---

#### 27. Límites

Esta tarea no autoriza ni ejecuta:

- crear un repositorio o runtime de AURA;
- crear tablas, migraciones, RPC, RLS, funciones, triggers, jobs o Storage;
- modificar VISO, Vento-Group, PASS, PULSO, NUMERA, NEXO, FOGO u otra aplicación;
- crear campañas operativas o importar campañas existentes;
- extraer, exportar o contactar audiencias reales;
- cargar listas de clientes a canales externos;
- comprometer, aprobar o ejecutar presupuesto;
- crear descuentos, promociones, cupones o reglas transaccionales;
- definir experimentos o grupos de control en detalle;
- publicar, programar, responder o retirar contenido real;
- crear piezas, logos, fotos, videos, plantillas o activos;
- conectar Meta, Instagram, TikTok, Google, WhatsApp, correo, IA u otros proveedores;
- cambiar producto, precio, stock, disponibilidad, pedido, venta, puntos, cartera, costos o margen;
- crear permisos ni matrices de autorización;
- redefinir métricas, atribución o incrementalidad de `AURA-DOM-008`;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-DOM-003`.

---

#### 28. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia`

**TAREA ACTUAL APROBADA**
`AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido`

### ✅ AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña
**Tarea siguiente:** AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana
**Tipo de tarea:** definición técnico-documental del contrato canónico de biblioteca de activos y contenido de AURA; fija identidad, propiedad, derechos, licencias, autorizaciones, original y derivados, versiones, vigencia, reutilización, revisión, aprobación, retiro y trazabilidad sin crear una instancia física propia ni migrar medios actuales
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean repositorios, tablas, migraciones, buckets, archivos, activos reales, cargas, transformaciones, canales, credenciales, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá gobernar fotografías, videos, diseños, audios, logos, plantillas, documentos y demás representaciones creativas que participen en comunicación y marketing, preservando de forma verificable identidad, propiedad, derechos, autorizaciones, original, derivados, versiones, vigencia, reutilización, revisión, aprobación y retiro.

La tarea resuelve principalmente las brechas identificadas por `CAP-SCOPE-014`:

- `H-CAP-SCOPE-014-007`, que exige impedir la confusión entre idea, campaña, pieza, publicación y promoción;
- `H-CAP-SCOPE-014-008`, que identifica la ausencia de una biblioteca empresarial gobernada de fotografías, videos, diseños, plantillas, licencias y derechos de uso;
- `H-CAP-SCOPE-014-009`, que identifica el riesgo de publicar contenido contra una versión vencida de marca, producto u oferta.

La regla raíz es:

```text
ACTIVO CREATIVO
!=
PIEZA DE CONTENIDO
!=
PUBLICACION
!=
CAMPANA
!=
PROMOCION
```

Y además:

```text
ARCHIVO O URL
!=
ACTIVO GOBERNADO
```

Un archivo almacenado, una URL pública o un medio visible en una aplicación no se considerará por sí solo un activo reutilizable, aprobado ni vigente.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, para la memoria de marca, claims, restricciones, versiones y vigencias que deben gobernar cualquier uso creativo;
- `AURA-DOM-002`, para objetivo, audiencia, brief, calendario, presupuesto y dependencias que pueden requerir activos o piezas;
- `CAP-SCOPE-014`, especialmente `CAP-14.03 — Crear y aprobar contenido`, la biblioteca de activos y la fábrica de contenido;
- `CAP-SCOPE-016`, para clasificación, propiedad funcional, custodia, versión, vigencia, conservación, evidencia y disposición de información y archivos;
- `VPROC-0056`, como ciclo canónico del contenido desde solicitud y brief hasta creación, revisión, aprobación, publicación, revisión de rendimiento y cierre;
- la auditoría AURA vigente, que confirma la existencia transitoria de superficies CMS y carga de media en VISO sin demostrar una biblioteca AURA completa;
- `INT-MKT-001`, que conserva la separación entre diseño objetivo y capacidad operativa materializada;
- el registro canónico de requisitos de prueba vigente.

Esta tarea no transfiere ownership del CMS actual, no migra el bucket `website-media`, no convierte VISO en AURA y no crea una fuente maestra competidora.

---

#### 3. Resultado canónico

AURA deberá gobernar cada activo o pieza de contenido como una identidad estable y trazable, capaz de responder como mínimo:

1. qué es;
2. quién lo creó, aportó o entregó;
3. quién es su propietario funcional;
4. a qué marca o marcas puede asociarse;
5. qué original lo origina;
6. qué derivados existen;
7. qué versión está vigente;
8. qué derechos, licencia o autorización permiten usarlo;
9. qué personas identificables aparecen y qué autorización aplica cuando corresponda;
10. para qué finalidades puede utilizarse;
11. en qué canales, formatos, territorios o contextos puede utilizarse cuando existan restricciones;
12. desde cuándo y hasta cuándo puede utilizarse;
13. con qué campaña, producto, sede o brief se relaciona cuando corresponda;
14. qué estado de revisión y aprobación conserva;
15. qué transformaciones se han realizado;
16. qué reemplazo, retiro o vencimiento afecta su uso;
17. qué evidencia respalda derechos, aprobación y trazabilidad;
18. qué uso posterior depende todavía de validaciones de campaña, publicación o canal.

La biblioteca deberá permitir localizar y reutilizar evidencia aprobada sin perder procedencia ni convertir la copia de un archivo en un nuevo original.

---

#### 4. Universo mínimo de activos

El universo funcional mínimo reconocido por `CAP-SCOPE-014` incluye:

- fotografías;
- videos;
- diseños;
- audios;
- logos;
- plantillas;
- documentos.

La arquitectura deberá admitir otros tipos únicamente cuando el proceso propietario los registre de forma explícita; la existencia de una extensión de archivo no crea por inferencia una categoría empresarial nueva.

Una pieza puede referenciar uno o varios activos. Un mismo activo puede participar en varias piezas únicamente cuando sus derechos, vigencia, marca, finalidad y usos permitidos lo permitan.

---

#### 5. Fronteras conceptuales obligatorias

Se preserva:

```text
ACTIVO
!=
ARCHIVO / BLOB / URL
```

```text
ACTIVO
!=
PIEZA
```

```text
PIEZA
!=
PUBLICACION
```

```text
ORIGINAL
!=
DERIVADO
!=
VARIANTE
!=
NUEVA VERSION MATERIAL
```

```text
APROBACION DEL ACTIVO
!=
APROBACION DE LA PIEZA
!=
APROBACION DE PUBLICACION
```

```text
DERECHO DE ALMACENAR
!=
DERECHO DE EDITAR
!=
DERECHO DE PUBLICAR
!=
DERECHO DE REUTILIZAR
```

```text
VIGENTE EN BIBLIOTECA
!=
VALIDO PARA CUALQUIER CAMPANA O CANAL
```

```text
RETIRADO
!=
BORRADO SIN TRAZABILIDAD
```

Estas diferencias deberán mantenerse en dominio, autorización, experiencia e integración.

---

#### 6. Identidad estable y procedencia

Cada activo gobernado deberá conservar una identidad estable independiente de:

- nombre de archivo;
- ruta física;
- URL pública o firmada;
- nombre de carpeta;
- slug de una página;
- posición en una galería;
- campaña en la que se use;
- aplicación desde la cual se consulte.

La procedencia deberá permitir distinguir como mínimo:

- creación interna;
- entrega por tercero;
- material recibido de proveedor;
- material importado desde una superficie transitoria;
- derivado producido desde un original existente.

La procedencia no concede derechos. Todo activo importado deberá conservar su origen real y permanecer no reutilizable cuando la evidencia necesaria para usarlo no sea suficiente.

---

#### 7. Propiedad funcional y custodia

La biblioteca deberá distinguir:

```text
PROPIETARIO FUNCIONAL
!=
AUTOR O CREADOR
!=
TITULAR DE DERECHOS
!=
CUSTODIO TECNICO
!=
PERSONA QUE CARGA EL ARCHIVO
```

El propietario funcional responde por la finalidad y vigencia empresarial del activo.

El custodio técnico conserva la representación física bajo los controles aprobados, pero no adquiere por ello derecho a autorizar usos comerciales.

La persona que carga un archivo no se convierte automáticamente en autora, titular de derechos ni aprobadora.

---

#### 8. Derechos, licencia y evidencia de uso

Un activo deberá conservar la evidencia aplicable que permita decidir si puede usarse.

Cuando corresponda, deberá poder conocerse:

- titular o fuente del derecho;
- instrumento, licencia, autorización o evidencia que habilita el uso;
- alcance del uso permitido;
- marcas o entidades beneficiarias cuando exista limitación;
- canales, formatos, territorios o contextos permitidos cuando existan restricciones;
- posibilidad o restricción de modificación;
- posibilidad o restricción de reutilización;
- vigencia;
- condición de revocación o terminación cuando aplique;
- evidencia de aprobación empresarial del uso.

AURA no interpretará automáticamente una licencia ni resolverá controversias jurídicas. Cuando el derecho no pueda demostrarse con suficiente evidencia, el activo deberá permanecer bloqueado para el uso afectado hasta que el propietario competente resuelva la condición.

---

#### 9. Autorización de personas y material identificable

Cuando una fotografía, video, audio u otro activo permita identificar personas y el uso requiera autorización, la biblioteca deberá conservar la relación con la evidencia aplicable y su vigencia.

La existencia de una persona en un activo no implica automáticamente:

- autorización para marketing;
- autorización para cualquier canal;
- autorización indefinida;
- autorización para IA o transformación;
- autorización para una campaña distinta;
- autorización para transferir el material a un tercero.

Las reglas transversales de privacidad y evidencia continúan bajo `CAP-SCOPE-016` y el BLOQUE AA; esta tarea únicamente exige que AURA respete su resultado.

---

#### 10. Originales y derivados

Todo derivado deberá mantener relación explícita con el original o con el derivado inmediatamente anterior que lo produce.

Como mínimo deberán poder reconstruirse:

```text
ORIGINAL
-> DERIVADO
-> VARIANTE
-> USO EN PIEZA
```

La cadena podrá incluir operaciones como:

- recorte;
- redimensionamiento;
- cambio de relación de aspecto;
- subtitulado;
- compresión;
- ajuste de formato;
- adaptación permitida a canal.

Una transformación no podrá destruir la procedencia del original.

Si una transformación cambia materialmente una afirmación, una oferta, el significado, la representación de una persona, la identidad de marca o una condición relevante, dejará de tratarse como adaptación puramente mecánica y requerirá nueva revisión antes de uso.

---

#### 11. Versionado

La biblioteca deberá conservar versión y vigencia sin sobrescritura silenciosa de una versión aprobada.

Reglas:

1. un cambio material produce una nueva versión o derivado relacionado;
2. una corrección de metadatos deberá diferenciarse de una modificación material del contenido;
3. la versión aplicable a una fecha deberá poder reconstruirse;
4. una versión reemplazada no desaparece de la historia;
5. un activo vigente puede dejar de ser utilizable para un contexto específico sin eliminarse del expediente;
6. el archivo físico y sus metadatos deberán permanecer correlacionables;
7. la relación con marca, claim, producto, oferta, campaña y permisos deberá poder reconstruirse para el momento del uso.

No se define desde esta tarea una estructura de tabla ni un algoritmo físico de versionado.

---

#### 12. Vigencia

La vigencia deberá evaluarse antes de reutilizar un activo o pieza.

Como mínimo deberán considerarse cuando correspondan:

- derechos o licencia;
- autorización de personas;
- memoria de marca y claim aplicable;
- producto o servicio representado;
- oferta o condición comercial mostrada;
- sede o local representado;
- campaña asociada;
- restricción territorial o de canal;
- reemplazo explícito;
- retiro por decisión empresarial;
- obligación de conservación que impida eliminación física.

Un activo puede conservarse por evidencia histórica y simultáneamente estar prohibido para nuevos usos.

```text
CONSERVAR
!=
AUTORIZAR REUTILIZACION
```

---

#### 13. Relación con marca, producto, sede y campaña

La biblioteca podrá relacionar activos con:

- marca;
- producto o categoría;
- sede;
- campaña;
- brief;
- pieza;
- canal previsto;
- publicación ejecutada cuando exista posteriormente.

Estas relaciones no convierten a AURA en fuente maestra de producto, precio, disponibilidad, sede ni venta.

La información material de producto, precio, disponibilidad o condición comercial deberá consumirse desde su fuente autorizada. Si el activo contiene texto o representación de un hecho variable, el uso deberá comprobar la vigencia de ese hecho antes de aprobar una nueva pieza o reutilización.

---

#### 14. Biblioteca y contenido

La biblioteca deberá separar al menos dos niveles conceptuales:

```text
ACTIVO
-> material reutilizable gobernado
```

```text
PIEZA DE CONTENIDO
-> composición o resultado editorial destinado a una finalidad concreta
```

Una pieza podrá usar múltiples activos y conservar:

- brief o iniciativa de origen;
- marca y versión de memoria de marca;
- mensaje o claim relevante;
- activos y versiones consumidas;
- autoría y ediciones;
- revisores;
- aprobación;
- contexto y finalidad;
- canales o formatos previstos;
- vigencia;
- relación con versiones posteriores o reemplazos.

La pieza no adquiere estado de publicación por quedar aprobada.

---

#### 15. Ciclo de contenido

`VPROC-0056` conserva la autoridad sobre el ciclo canónico de contenido:

```text
CONTENT_REQUESTED
-> BRIEF_UNDER_REVIEW
-> IN_CREATION
-> UNDER_REVIEW
-> PENDING_APPROVAL
-> APPROVED
-> SCHEDULED
-> PUBLISHED
-> PERFORMANCE_REVIEW
-> CONTENT_CYCLE_REVIEWED
```

`AURA-DOM-003` desarrolla principalmente los tramos de creación, revisión y aprobación, además de la procedencia de los activos utilizados.

No crea un segundo namespace de estados para competir con `VPROC-0056`.

La programación, envío a canal, publicación efectiva, fallo, retiro y reconciliación externa corresponden a `AURA-DOM-005` y las integraciones posteriores.

---

#### 16. Revisión de contenido

Antes de aprobar una pieza deberá poder comprobarse, según corresponda:

- brief y objetivo aplicables;
- marca y versión de memoria de marca;
- claims y mensajes permitidos;
- activos y versiones exactas consumidas;
- derechos y vigencias;
- autorizaciones de personas;
- productos, datos o condiciones materiales contra fuentes autorizadas;
- restricciones legales, reputacionales y de canal conocidas;
- consistencia entre texto, imagen, audio y CTA;
- destino de enlaces cuando existan;
- responsables de revisión requeridos.

Una revisión no debe convertir automáticamente una propuesta en publicación ni activar promociones.

---

#### 17. Aprobación

La aprobación deberá ser una decisión trazable sobre una versión exacta.

Deberá conservar como mínimo:

- versión aprobada;
- actor o autoridad que aprueba;
- momento;
- alcance de la aprobación;
- observaciones o condiciones cuando existan;
- evidencia consumida;
- relación con el brief, marca y restricciones vigentes.

Cambiar materialmente una pieza después de su aprobación invalida la aprobación de esa versión modificada y exige nueva revisión.

La aprobación no equivale a:

- programación;
- publicación;
- gasto;
- descuento;
- envío a audiencia;
- respuesta pública;
- aceptación de una campaña completa.

---

#### 18. Reutilización

AURA podrá proponer reutilización de un activo o una pieza únicamente si puede demostrar que la reutilización respeta:

- derechos;
- autorizaciones;
- marca;
- versión;
- vigencia;
- finalidad;
- canal o uso permitido;
- contexto de campaña;
- hechos materiales actuales;
- restricciones aplicables.

La reutilización se clasifica conceptualmente como:

```text
REUSO SIN CAMBIO MATERIAL
-> puede consumir aprobación vigente cuando el alcance aprobado lo cubra
```

```text
ADAPTACION MECANICA PERMITIDA
-> conserva procedencia y requiere verificación de alcance
```

```text
CAMBIO MATERIAL
-> requiere nueva revisión y aprobación
```

No se crea desde esta tarea un motor automático que decida jurídicamente si una transformación es material.

---

#### 19. Transformaciones automáticas permitidas

El contrato objetivo admite que AURA pueda, después de una aprobación válida y cuando el alcance lo permita:

- redimensionar;
- recortar;
- subtitular;
- comprimir;
- adaptar formato;
- producir variantes técnicas equivalentes.

Estas transformaciones deberán:

- conservar el original;
- registrar el derivado;
- conservar trazabilidad de la operación;
- respetar derechos y restricciones;
- no modificar silenciosamente una oferta o afirmación material;
- no cambiar significado o contexto de forma engañosa;
- no ampliar un uso no autorizado.

La generación o edición asistida por modelos de IA, el envío de activos a proveedores externos y sus restricciones corresponden a `AURA-DOM-004` y `AURA-AUTH-004`.

---

#### 20. Retiro, reemplazo y archivo

Retirar un activo o pieza de nuevos usos no significa destruir su evidencia.

El ciclo deberá permitir distinguir:

```text
VIGENTE
-> puede ser evaluado para uso
```

```text
REEMPLAZADO
-> conserva historia pero no es la versión preferente
```

```text
RETIRADO
-> no debe utilizarse en nuevos trabajos salvo decisión excepcional autorizada
```

```text
ARCHIVADO / CONSERVADO
-> persiste por historia, evidencia o retención
```

La eliminación física y los periodos de retención pertenecen al gobierno transversal de información y no se fijan desde esta tarea.

---

#### 21. Relaciones públicas, enlaces y consumidores

Una pieza que incluya CTA, URL, canonical, ruta pública o referencia a consumidor deberá comprobar la existencia y vigencia del destino antes de ser considerada utilizable.

AURA no podrá tratar como publicación válida una pieza que apunte a:

- `#` como sustituto de destino real;
- rutas retiradas;
- destinos que contradicen la acción anunciada;
- rutas inexistentes;
- URLs inseguras o no autorizadas.

La integridad detallada de publicación, rutas, canales y reconciliación permanece en `AURA-DOM-005` y `AURA-INT-001`.

---

#### 22. Línea base transitoria actual

La auditoría vigente demuestra superficies transitorias en VISO relacionadas con contenido y media, incluida una superficie de carga de imagen o video y el uso del bucket `website-media`.

Estas evidencias:

- demuestran capacidad parcial actual;
- no demuestran una biblioteca AURA completa;
- no demuestran gobierno de derechos, autorizaciones, originales, derivados, reutilización y vigencia;
- no transfieren ownership hacia AURA;
- no autorizan migrar medios;
- no convierten una URL pública en el identificador canónico del activo;
- no autorizan ampliar el CMS actual para ocupar anticipadamente el dominio AURA.

La transferencia futura del CMS o de medios solo podrá ocurrir mediante las decisiones de continuidad, integración y cutover ya gobernadas por tareas propietarias.

---

#### 23. Auditoría y trazabilidad

Toda acción material sobre un activo o pieza deberá poder reconstruir:

- actor;
- capacidad o autoridad aplicable;
- recurso;
- versión anterior y nueva cuando exista cambio;
- origen;
- operación;
- motivo;
- resultado;
- timestamp o momento correlacionable;
- evidencia consumida;
- relación con publicación afectada cuando exista.

La observabilidad deberá permitir detectar, al menos conceptualmente:

- medios faltantes;
- activos sin evidencia suficiente de uso;
- referencias rotas;
- contenido publicado vencido;
- versiones sustituidas todavía referenciadas;
- derivados sin original reconstruible;
- divergencias entre metadatos y representación física.

La instrumentación técnica concreta se define en los carriles de implementación e integración correspondientes.

---

#### 24. Handoff a `AURA-DOM-004`

`AURA-DOM-003` entrega a `AURA-DOM-004` un contexto creativo gobernado que permite saber:

- qué activos existen conceptualmente;
- qué versión es aplicable;
- cuál es su procedencia;
- qué derechos y restricciones deben respetarse;
- qué piezas y activos pueden reutilizarse;
- qué evidencia debe acompañar una transformación;
- qué cambio material exige nueva revisión;
- qué información no debe enviarse a un proveedor de IA por inferencia.

`AURA-DOM-004` deberá definir copiloto creativo, grounding, memoria, proveedores de IA y revisión humana sin redefinir la propiedad, los derechos, el versionado ni el ciclo de aprobación establecidos aquí.

---

#### 25. Requisitos de prueba derivados

`NO GENERA REQUISITOS DE PRUEBA`.

Justificación:

- el gobierno de activos, derechos, versiones, original y derivados, vigencia, aprobación, publicación y auditoría ya está protegido por requisitos vigentes del dominio AURA, Supabase, integración y gobierno de información;
- esta tarea desarrolla el contrato documental responsable de `CAP-14.03` y de las brechas asignadas sin introducir una obligación protegida que requiera un identificador nuevo;
- no cambia texto, estado, relación, owner, paquete, ambiente ni evidencia de ninguna fila del registro 04A.

Requisitos creados: 0.

Requisitos modificados: 0.

Requisitos diferidos: 0.

Requisitos obsoletos: 0.

---

#### 26. Cobertura de prueba vigente reutilizada

La tarea queda trazada, sin modificar el registro, contra:

- `TREQ-AURA-001`, para identidades estables, versiones, vigencias, activos, derechos, original, derivados, usos permitidos y separación entre pieza, publicación y promoción;
- `TREQ-AURA-009`, para separar capacidades de carga y mutación de media de otros permisos administrativos;
- `TREQ-AURA-011`, `TREQ-AURA-012` y `TREQ-AURA-013`, para creación, actualización, versionado, referencias, retiro y recuperación de contenido;
- `TREQ-AURA-014` y `TREQ-AURA-015`, para contratos versionados de bloques y compatibilidad con consumidores;
- `TREQ-AURA-025`, para integridad de enlaces, CTA, preview y destinos públicos;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación editorial;
- `TREQ-SUPABASE-004`, para almacenamiento y acceso de archivos conforme a clasificación y contrato;
- `TREQ-INTEGRATION-019`, para fronteras e integraciones de marketing.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación de requisitos.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra un checkout local desde esta entrega |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local ni se ejecutaron validadores del repositorio desde esta entrega |
| REMOTA | PASS | se verificaron el archivo propietario, la topología `DEFINE_ONCE`, `CAP-SCOPE-014`, `CAP-SCOPE-016`, `H-CAP-SCOPE-014-007`, `H-CAP-SCOPE-014-008`, `H-CAP-SCOPE-014-009`, `VPROC-0056`, la auditoría AURA vigente, el registro 04A de AURA, `package.json` y los validadores documentales actuales |
| OPERATIVA | NOT_APPLICABLE | esta tarea define el contrato documental de activos y contenido y no carga, transforma, aprueba, publica, retira ni reutiliza medios reales |
| FÍSICA | NOT_APPLICABLE | la topología canónica no crea instancia física propia y la tarea no autoriza runtime, Supabase, Storage, repositorios, datos, integraciones ni despliegues |

La validación remota demuestra consistencia documental de la propuesta. La validación real del repositorio permanece pendiente hasta incorporar el artefacto en la rama documental correspondiente y ejecutar los validadores canónicos.

---

#### 28. Criterios de aceptación

`AURA-DOM-003` queda satisfecha cuando simultáneamente:

1. fotografía, video, diseño, audio, logo, plantilla y documento quedan cubiertos por una biblioteca gobernada;
2. archivo, URL, activo, pieza, publicación, campaña y promoción permanecen conceptos distintos;
3. cada activo conserva identidad estable independiente de nombre de archivo, ruta o URL;
4. procedencia y propiedad funcional se separan de autoría, titularidad de derechos, custodia y actor que carga;
5. derechos, licencia, autorización de personas y vigencia pueden bloquear un uso sin borrar el activo;
6. originales y derivados conservan una cadena reconstruible;
7. una versión aprobada no se sobrescribe silenciosamente;
8. reutilización verifica derechos, marca, versión, vigencia, finalidad, canal, contexto y hechos materiales actuales;
9. una adaptación mecánica permitida no altera una oferta o afirmación material;
10. un cambio material exige nueva revisión y aprobación;
11. la aprobación queda vinculada a una versión exacta;
12. aprobación de pieza no equivale a programación ni publicación;
13. retiro no equivale a borrado irreversible;
14. obligaciones de conservación permanecen bajo `CAP-SCOPE-016` y sus tareas propietarias;
15. `VPROC-0056` permanece como ciclo canónico del contenido y no se crea un namespace competidor;
16. `AURA-DOM-004` conserva ownership de IA, grounding, proveedores externos y revisión humana asistida;
17. `AURA-DOM-005` conserva ownership de canales, programación, publicación, reintentos, retiro y reconciliación externa;
18. la línea base transitoria de VISO y `website-media` no se reclasifica como biblioteca AURA terminada;
19. se crean y modifican cero requisitos de prueba;
20. no se crea ninguna instancia física;
21. la continuidad queda reservada exclusivamente a `AURA-DOM-004`.

---

#### 29. Límites

Esta tarea no autoriza ni ejecuta:

- crear un repositorio o runtime de AURA;
- crear tablas, migraciones, RPC, RLS, funciones, triggers, jobs o Storage;
- crear, renombrar, privatizar, publicar o migrar buckets;
- transferir `website-media` a AURA;
- cargar, copiar, mover, transformar o eliminar archivos reales;
- importar una biblioteca real desde VISO, Vento-Group, PASS u otra fuente;
- redefinir retención legal o periodos documentales;
- interpretar jurídicamente licencias o derechos;
- conectar proveedores de IA ni enviarles archivos;
- generar contenido real mediante IA;
- publicar, programar, responder o retirar contenido en canales reales;
- crear campañas, promociones, cupones o descuentos;
- cambiar productos, precios, disponibilidad, sedes, ventas o datos maestros;
- crear permisos o capacidades técnicas;
- crear una fuente de verdad paralela a NEXO, PASS, PULSO, NUMERA, VISO, FOGO o el gobierno transversal de información;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-DOM-004`.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña`

**TAREA ACTUAL APROBADA**
`AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana`

### ✅ AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido
**Tarea siguiente:** AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal
**Tipo de tarea:** definición técnico-documental del contrato canónico del copiloto creativo de AURA; fija grounding, memoria gobernada, clasificación de salidas, restricciones, trazabilidad de modelo y proveedor, minimización de datos y revisión humana sin seleccionar proveedor concreto ni crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean repositorios, proveedores, cuentas, contratos externos, credenciales, secretos, tablas, migraciones, funciones, buckets, modelos, embeddings, índices, memoria persistente, agentes, automatizaciones, datos, integraciones ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir el contrato canónico con el que AURA podrá asistir al equipo de marketing en ideación, redacción, adaptación, comparación y preparación creativa mediante inteligencia artificial, preservando al mismo tiempo fuentes autorizadas, frescura, contexto versionado, memoria gobernada, restricciones empresariales, privacidad, trazabilidad y revisión humana.

La tarea resuelve principalmente:

- `H-CAP-SCOPE-014-010`, que identifica el riesgo de que la IA invente ingredientes, beneficios, precios, disponibilidad, fechas o resultados cuando no usa fuentes controladas;
- la parte de `H-CAP-SCOPE-014-011` que exige que el dominio no presuponga que prompts, archivos o datos pueden enviarse libremente a un proveedor externo; la autorización detallada de esos envíos permanece en `AURA-AUTH-003`, `AURA-AUTH-004`, `CAP-SCOPE-010` y `CAP-SCOPE-016`;
- la frontera de `H-CAP-SCOPE-014-012`, que exige mantener separados borrador asistido, contenido aprobado y publicación efectiva; la segregación de funciones y experiencia propietaria permanece en `AURA-AUTH-002`, `AURA-UX-003` y `AURA-UX-004`;
- la contribución de `AURA-DOM-004` a `H-CAP-SCOPE-014-028`, evitando que una asistencia o recomendación automatizada adquiera autoridad para optimizar volumen o interacción sacrificando margen, capacidad, reputación o consentimiento.

La regla raíz es:

```text
SALIDA DE IA
!=
HECHO EMPRESARIAL
!=
CONTENIDO APROBADO
!=
PUBLICACION
!=
ACCION AUTORIZADA
```

Y además:

```text
MEMORIA DE AURA
!=
FUENTE DE VERDAD EMPRESARIAL
```

El copiloto deberá ayudar a crear y razonar sobre contenido sin convertirse en una autoridad autónoma sobre datos, marca, producto, clientes, promociones, publicación o decisiones operativas.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, para marca, identidad, tono, mensajes, claims, restricciones, vigencias y fuentes aprobadas;
- `AURA-DOM-002`, para objetivo, audiencia, brief, calendario, presupuesto, dependencias y contexto de campaña;
- `AURA-DOM-003`, para activos, derechos, licencias, autorizaciones, original, derivados, versiones, vigencia, reutilización y aprobación de contenido;
- `CAP-SCOPE-014`, especialmente el estudio creativo asistido y los límites de grounding de inteligencia artificial;
- `CAP-SCOPE-016`, para finalidad, minimización, clasificación, acceso, conservación, evidencia y tratamiento de información y archivos;
- `CAP-SCOPE-017`, para calidad, frescura, cobertura, linaje y separación entre señal, hipótesis, recomendación y acción;
- `VPROC-0056`, como ciclo canónico del contenido desde solicitud y brief hasta creación, revisión, aprobación, publicación, revisión de rendimiento y cierre;
- la auditoría AURA vigente, que mantiene AURA sin runtime propio y conserva las capacidades actuales de VISO como superficies transitorias;
- `INT-MKT-001`, que separa la arquitectura objetivo de marketing de cualquier capacidad física todavía no materializada;
- el registro canónico de requisitos de prueba vigente.

Esta tarea no copia producto, precio, disponibilidad, cliente, venta, campaña ni activos como maestros nuevos. El copiloto consume referencias autorizadas y versionadas a sus propietarios.

---

#### 3. Resultado canónico

AURA deberá ofrecer un copiloto creativo capaz de:

- proponer conceptos, nombres, hooks, copies, guiones y llamadas a la acción;
- crear variantes por canal, formato, audiencia y longitud;
- preparar kits derivados de material aprobado sin duplicar innecesariamente activos;
- generar shot lists, briefs de diseño y planes de grabación;
- comparar variantes contra reglas vigentes de marca;
- detectar datos no comprobados, fuentes ausentes, vigencia vencida y promesas riesgosas;
- preparar propuestas para post, historia, reel, WhatsApp, correo y PASS sin publicar por sí mismo;
- explicar qué fuentes, restricciones y decisiones influyeron en la salida;
- conservar la trazabilidad de proveedor, modelo, instrucción relevante, contexto utilizado, datos enviados, versión de salida, actor, revisores y aprobación.

Toda capacidad anterior será asistiva. Ninguna salida del copiloto podrá autoaprobarse, autopublicarse ni adquirir autoridad empresarial por el solo hecho de haber sido generada.

---

#### 4. Fronteras conceptuales obligatorias

Se preserva:

```text
HECHO
!=
INFERENCIA
!=
PROPUESTA
```

```text
FUENTE
!=
MEMORIA
!=
CONTEXTO DE SESION
!=
SALIDA GENERADA
```

```text
CONTEXTO RECUPERADO
!=
DATO VIGENTE
```

```text
SALIDA GENERADA
!=
BORRADOR HUMANO APROBADO
```

```text
REVISION HUMANA
!=
APROBACION
!=
PROGRAMACION
!=
PUBLICACION
```

```text
PROVEEDOR DE IA
!=
PROPIETARIO DEL DOMINIO
```

```text
CAMBIO DE MODELO
!=
CAMBIO INVISIBLE DE COMPORTAMIENTO
```

```text
CAPACIDAD TECNICA DEL MODELO
!=
AUTORIDAD EMPRESARIAL
```

Estas fronteras deberán sobrevivir en dominio, autorización, experiencia, integración, auditoría y pruebas.

---

#### 5. Contrato de contexto versionado

Cada ejecución asistida deberá partir de un contexto explícito y reconstruible. El contexto podrá referenciar únicamente fuentes que el actor y la finalidad tengan derecho a utilizar.

Cada referencia de contexto deberá poder identificar como mínimo:

- fuente propietaria;
- identidad estable del recurso;
- versión o corte utilizado cuando aplique;
- vigencia o fecha efectiva cuando aplique;
- momento de recuperación;
- finalidad dentro de la tarea creativa;
- alcance empresarial, de marca, sede, campaña o audiencia pertinente;
- restricciones de uso conocidas;
- estado de disponibilidad o calidad cuando sea material.

Un contexto recuperado no se considerará automáticamente vigente. Cuando una fuente indique versión vencida, retiro, ausencia, degradación o conflicto, el copiloto deberá reflejar esa condición y no reutilizar el valor como hecho confirmado.

---

#### 6. Fuentes autorizadas y grounding

Toda afirmación material deberá cumplir una de estas condiciones:

1. estar respaldada por una fuente autorizada, identificable y suficientemente fresca para la finalidad;
2. estar marcada inequívocamente como inferencia;
3. estar marcada inequívocamente como propuesta pendiente de comprobación.

El copiloto no deberá ocultar la ausencia de grounding mediante redacción segura o convincente.

El grounding deberá conservar el vínculo entre la afirmación y las referencias relevantes. No es suficiente registrar una lista genérica de fuentes al final cuando no sea posible reconstruir qué afirmación dependió de cuál fuente.

La ausencia de evidencia deberá degradar la certeza de la salida, no elevar la autonomía del modelo.

---

#### 7. Clasificación de hechos, inferencias y propuestas

AURA deberá distinguir de forma persistente y visible:

- **hecho:** valor derivado de una fuente autorizada y vigente dentro de su alcance;
- **inferencia:** conclusión producida a partir de uno o más hechos, cuya interpretación no existe como hecho maestro;
- **propuesta:** contenido creativo, hipótesis, opción o recomendación que aún requiere decisión o comprobación humana.

Reglas:

1. una inferencia no podrá almacenarse como si fuera el dato maestro que la originó;
2. una propuesta no podrá promocionarse a hecho por repetirse en varias generaciones;
3. una corrección humana deberá quedar distinguida de la salida original del modelo;
4. una aprobación editorial no convierte una afirmación falsa en hecho válido;
5. una fuente posterior que contradiga el contexto anterior obliga a revalidar cualquier salida material afectada.

---

#### 8. Afirmaciones que la IA no puede inventar

Se conserva de forma explícita la prohibición de inventar:

- ingredientes;
- propiedades o beneficios;
- precios;
- descuentos;
- fechas;
- disponibilidad;
- capacidad;
- resultados de campaña;
- testimonios;
- reseñas;
- cifras;
- condiciones legales;
- condiciones promocionales.

Además, cualquier claim material gobernado por `AURA-DOM-001` deberá referenciar la versión de marca y la evidencia que lo autoriza.

Cuando falte evidencia suficiente, el copiloto podrá sugerir una redacción hipotética únicamente si queda marcada como propuesta y no puede confundirse con una condición vigente.

---

#### 9. Relación con marca, producto y oferta

El copiloto deberá resolver contexto sin crear maestros competidores:

```text
MARCA, TONO Y CLAIMS
-> AURA-DOM-001

BRIEF Y CAMPANA PLANIFICADA
-> AURA-DOM-002

ACTIVOS Y DERECHOS
-> AURA-DOM-003

PRODUCTO Y ATRIBUTOS
-> fuente propietaria autorizada

PRECIO, MARGEN Y PRESUPUESTO
-> fuente económica autorizada

DISPONIBILIDAD Y CAPACIDAD
-> fuente operativa autorizada

CLIENTE Y CONSENTIMIENTO
-> fuente cliente autorizada
```

El copiloto podrá utilizar esas referencias para redactar o comparar opciones, pero no podrá editar sus fuentes maestras como efecto lateral de una generación.

---

#### 10. Modelo canónico de memoria

La memoria del copiloto será una capa gobernada de contexto reutilizable, no una base maestra paralela.

Conceptualmente se distinguirán:

1. **contexto temporal de trabajo**, utilizado durante una solicitud, brief o sesión creativa y descartable cuando deja de ser necesario;
2. **referencias canónicas reutilizables**, que conservan punteros a fuentes propietarias y sus versiones en lugar de copiar silenciosamente el maestro;
3. **memoria creativa aprobada**, formada por decisiones, ejemplos, preferencias o aprendizajes explícitamente admitidos para reutilización y con alcance definido;
4. **historial de generación y revisión**, que conserva qué produjo el modelo, qué cambió el humano y cuál fue el resultado, como evidencia y no como verdad automática;
5. **estado técnico del proveedor**, cuando exista, que nunca se considerará memoria canónica por sí mismo.

Esta clasificación es conceptual y no crea enums, tablas ni almacenamiento físico en esta tarea.

---

#### 11. Admisión de memoria reutilizable

Una salida generada no podrá incorporarse a memoria reutilizable solo porque fue aceptada visualmente o porque no recibió correcciones.

Para admitir memoria creativa reutilizable deberá poder demostrarse:

- finalidad;
- propietario;
- alcance de marca, campaña, audiencia o tipo de trabajo;
- fuente o decisión humana que la respalda;
- versión;
- fecha de vigencia o condición de revisión cuando corresponda;
- actor que la admite;
- restricciones de reutilización;
- relación con activos y derechos cuando exista material creativo asociado.

La memoria no podrá convertir automáticamente un resultado exitoso de campaña en una regla universal; el aprendizaje cuantitativo y la atribución pertenecen a `AURA-DOM-008`, y las recomendaciones comerciales explicables pertenecen a `AURA-DOM-010`.

---

#### 12. Actualización, invalidación y olvido operativo

La memoria reutilizable deberá ser versionada y susceptible de quedar inválida sin destruir la evidencia histórica.

Condiciones de revalidación o invalidación incluyen:

- nueva versión de marca;
- claim retirado o reemplazado;
- brief o campaña cerrados;
- activo retirado o con derechos vencidos;
- cambio de producto, oferta, precio, disponibilidad o capacidad;
- cambio de finalidad o consentimiento;
- fuente desactualizada o degradada;
- decisión humana que reemplace una regla creativa anterior.

Invalidar para uso futuro no equivale a borrar evidencia histórica. Conservación, disposición y eliminación real permanecen gobernadas por `CAP-SCOPE-016` y sus propietarios.

---

#### 13. Proveedor de IA como dependencia sustituible

El dominio no se acoplará a un proveedor concreto como parte de esta definición.

Toda integración futura deberá registrar como mínimo:

- identidad del proveedor;
- identidad o versión del modelo cuando sea verificable;
- capacidades habilitadas;
- finalidad autorizada;
- clases de información permitidas;
- restricciones contractuales y de tratamiento relevantes;
- política aplicable de retención cuando corresponda;
- límites, fallos y degradaciones observables;
- configuración o versión de integración que pueda afectar el resultado.

La selección de proveedor deberá permanecer separada de las decisiones empresariales y de aprobación de contenido.

---

#### 14. Cambio de proveedor o modelo

Cambiar proveedor, modelo o configuración relevante no podrá tratarse como una implementación invisible cuando pueda alterar:

- calidad factual;
- capacidad de grounding;
- comportamiento creativo;
- política de datos;
- retención;
- tratamiento de archivos;
- límites de contexto;
- disponibilidad;
- costos;
- trazabilidad;
- capacidades de herramientas o acciones.

Una sustitución futura deberá permitir comparar el comportamiento relevante antes de adoptarla para trabajo aprobado. Un fallback técnico no podrá ampliar datos enviados, finalidad o autoridad.

Si no existe un proveedor compatible con las restricciones del trabajo solicitado, la salida correcta será degradar o bloquear la asistencia correspondiente, no relajar silenciosamente las restricciones.

---

#### 15. Minimización antes de proveedores externos

Antes de que información salga a un proveedor externo, el diseño deberá aplicar minimización proporcional a la finalidad.

No deberá enviarse por defecto:

- datos personales no necesarios;
- secretos o credenciales;
- identificadores internos innecesarios;
- expedientes completos cuando basta un fragmento autorizado;
- archivos completos cuando basta una referencia o representación reducida;
- propiedad intelectual fuera del alcance necesario;
- información de otras marcas, sedes, campañas o clientes que no participa en la tarea.

Que un dato sea visible para el actor dentro de Vento OS no significa automáticamente que pueda enviarse a un tercero.

La autorización detallada de datos, acciones masivas, exportaciones y proveedores permanece en las tareas `AURA-AUTH-*` y en el gobierno transversal aplicable.

---

#### 16. Estado técnico del proveedor no canónico

Threads, conversaciones, cachés, historiales, archivos temporales o memorias administradas por un proveedor externo serán estado técnico del proveedor salvo que exista un contrato canónico posterior que los incorpore expresamente.

Por tanto:

- no serán fuente maestra;
- no podrán resolver identidad empresarial;
- no podrán sustituir una versión de marca o brief;
- no podrán considerarse consentimiento;
- no podrán sustituir evidencia de aprobación;
- no podrán utilizarse para publicar o actuar si Vento OS perdió la correlación local necesaria.

La pérdida del estado de proveedor no deberá destruir el expediente canónico de generación, revisión y aprobación que Vento OS deba conservar.

---

#### 17. Instrucciones y trazabilidad de generación

Cada salida material asistida deberá conservar suficiente evidencia para reconstruir:

- solicitud o propósito;
- actor que inicia;
- brief o recurso relacionado;
- fuentes y versiones utilizadas;
- proveedor y modelo;
- instrucción relevante o su versión gobernada;
- restricciones aplicadas;
- datos o activos enviados cuando corresponda;
- resultado recibido;
- versión de la salida;
- revisiones humanas;
- decisión posterior.

No se exige convertir todo razonamiento interno del modelo en evidencia. Se exige conservar las entradas, referencias, decisiones y resultados necesarios para auditar el uso empresarial de la asistencia.

---

#### 18. Grounding de activos y derechos

Cuando el copiloto utilice un activo gobernado por `AURA-DOM-003`, deberá respetar:

- identidad del activo;
- original y derivados;
- versión;
- propietario funcional;
- derechos y licencia;
- autorización de personas cuando corresponda;
- vigencia;
- finalidades y usos permitidos;
- restricciones por canal, territorio o contexto cuando existan.

Que un proveedor técnicamente pueda leer, transformar o generar a partir de un archivo no significa que Vento OS tenga derecho a enviarlo o reutilizarlo de esa forma.

Una transformación asistida que cambie materialmente una oferta, claim, condición o significado requiere el ciclo de revisión correspondiente y no hereda aprobación de la pieza original.

---

#### 19. Integración con `VPROC-0056`

La asistencia de IA se inserta dentro del proceso canónico existente sin crear un workflow competidor:

```text
CONTENT_REQUESTED
-> BRIEF_UNDER_REVIEW
-> IN_CREATION
-> UNDER_REVIEW
-> PENDING_APPROVAL
-> APPROVED
-> SCHEDULED
-> PUBLISHED
-> PERFORMANCE_REVIEW
-> CONTENT_CYCLE_REVIEWED
```

El copiloto participa principalmente en `IN_CREATION` y puede aportar evidencia para `UNDER_REVIEW`.

No podrá saltar automáticamente:

- `UNDER_REVIEW`;
- `PENDING_APPROVAL`;
- `APPROVED`;
- las condiciones de programación y publicación.

La existencia de IA no cambia el significado de una transición del proceso.

---

#### 20. Revisión humana obligatoria

Toda salida creativa asistida permanecerá sujeta a revisión humana antes de adquirir cualquier aprobación empresarial.

La revisión deberá permitir identificar al menos:

- qué parte proviene del modelo;
- qué fuentes respaldan afirmaciones materiales;
- qué hechos permanecen pendientes de comprobar;
- qué restricciones de marca aplicaron;
- qué cambios introdujo el revisor;
- qué versión exacta se somete a aprobación.

Un revisor podrá corregir, rechazar o devolver la propuesta. La ausencia de cambios no equivale por sí sola a una aprobación formal.

La definición de quién puede revisar, aprobar, programar o publicar pertenece a `AURA-AUTH-002` y tareas de autorización posteriores.

---

#### 21. Acciones que la IA no puede ejecutar por autonomía propia

La asistencia de IA no podrá, por inferencia o capacidad técnica del proveedor:

- publicar contenido;
- programar publicaciones;
- retirar contenido;
- crear o activar promociones;
- modificar precios o descuentos;
- cambiar disponibilidad o capacidad;
- contactar clientes;
- crear audiencias masivas;
- exportar datos de clientes;
- responder una crisis públicamente;
- aceptar una propuesta comercial;
- cerrar una oportunidad;
- registrar una venta;
- aprobar gasto;
- mutar maestros de producto, marca, cliente o finanzas.

Una futura acción asistida deberá pasar por la autoridad y el contrato propietario de esa acción. La generación de una propuesta nunca constituye la autorización para ejecutarla.

---

#### 22. Manejo de ausencia, contradicción y baja confianza

Cuando falte una fuente necesaria o existan fuentes incompatibles, el copiloto deberá distinguir al menos:

- dato no disponible;
- dato desactualizado;
- conflicto entre fuentes;
- dato fuera del alcance autorizado;
- inferencia posible pero no verificable;
- fallo técnico de recuperación.

No deberá convertir ninguna de esas condiciones en un valor inventado.

Cuando la salida dependa de una afirmación material no comprobada, deberá quedar bloqueada para tratamiento como hecho y permanecer como propuesta hasta resolver la evidencia.

---

#### 23. Fallo y degradación del proveedor

Un timeout, rechazo, límite, indisponibilidad o respuesta inválida del proveedor deberá conservar estado observable.

Reglas:

1. un fallo técnico no se presentará como rechazo editorial;
2. una respuesta parcial no se presentará como salida completa;
3. un fallback no podrá cambiar silenciosamente finalidad, proveedor o tratamiento de datos;
4. un reintento deberá poder correlacionarse con la solicitud original;
5. una salida de un reintento no sobrescribirá evidencia previa sin versión;
6. si no puede demostrarse la procedencia del resultado, no se promoverá al flujo editorial normal.

La implementación técnica de reintentos e idempotencia pertenece a las tareas de integración posteriores cuando corresponda.

---

#### 24. Memoria y recomendaciones no ejecutables

La memoria podrá ayudar a sugerir patrones, ejemplos, formatos o decisiones previamente aprobadas, pero no podrá ejecutar una recomendación ni convertir un patrón histórico en regla obligatoria.

Especialmente:

- interacción alta no equivale a rentabilidad;
- repetición de una práctica no equivale a autorización;
- correlación no equivale a causalidad;
- contenido exitoso no equivale a contenido adecuado para otra marca, audiencia o fecha;
- preferencia creativa histórica no invalida una nueva restricción de marca o negocio.

El radar de oportunidades y recomendaciones comerciales explicables permanece en `AURA-DOM-010`.

---

#### 25. Simplicidad de experiencia y divulgación progresiva

La trazabilidad completa no obliga a saturar la experiencia principal con configuración técnica.

El contrato permite una interfaz progresiva en la que el usuario pueda ver primero:

- propuesta;
- hechos relevantes;
- advertencias;
- fuentes esenciales;
- acciones de revisión.

Y abrir bajo demanda:

- detalle completo de fuentes;
- versión de modelo y proveedor;
- instrucciones relevantes;
- datos enviados;
- auditoría;
- diagnóstico técnico.

La definición de la experiencia concreta pertenece a `AURA-UX-*`. Esta tarea únicamente exige que la simplificación visual no elimine la trazabilidad necesaria.

---

#### 26. Auditoría y observabilidad

El uso del copiloto deberá poder auditarse sin registrar indiscriminadamente información sensible.

La evidencia deberá permitir correlacionar, cuando corresponda:

- actor;
- finalidad;
- recurso o brief;
- proveedor y modelo;
- fuentes;
- versión de contexto;
- resultado;
- clasificación de hecho, inferencia o propuesta;
- revisión;
- aprobación posterior;
- error o degradación;
- momento de ejecución.

Las métricas operativas futuras deberán distinguir calidad del servicio de IA, calidad factual, tasa de revisión, rechazo y corrección sin convertir rapidez o volumen de generación en un objetivo empresarial por sí mismos.

---

#### 27. Handoff a `AURA-DOM-005`

Esta tarea entrega a `AURA-DOM-005` únicamente contenido o propuestas que ya tienen:

- identidad y versión;
- relación con brief o campaña cuando corresponda;
- fuentes y frescura relevantes;
- trazabilidad de generación;
- estado editorial distinguible;
- revisión y aprobación cuando corresponda;
- activos y derechos gobernados;
- restricciones de marca y negocio identificadas.

`AURA-DOM-005` deberá definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal sin redefinir grounding, memoria, proveedor o autoridad del copiloto.

Una salida generada o revisada que todavía no alcance el estado editorial requerido no podrá entrar a la cola de publicación como si estuviera aprobada.

---

#### 28. Requisitos de prueba derivados

`NO GENERA REQUISITOS DE PRUEBA`.

Justificación:

- el registro vigente ya protege de forma directa el grounding, la clasificación de hechos e inferencias, la trazabilidad de proveedor y modelo, la minimización de datos, los límites de autonomía y la revisión humana de la asistencia de IA;
- esta tarea desarrolla el contrato documental propietario de esas obligaciones sin introducir una regla protegida nueva que exija otro identificador;
- no cambia texto, estado, relación, owner, paquete, ambiente ni evidencia de ninguna fila del registro 04A.

Requisitos creados: 0.

Requisitos modificados: 0.

Requisitos diferidos: 0.

Requisitos obsoletos: 0.

---

#### 29. Cobertura de prueba vigente reutilizada

La tarea queda trazada, sin modificar el registro, contra:

- `TREQ-AURA-002`, como cobertura principal de contexto versionado, fuentes autorizadas, hecho/inferencia/propuesta, referencias, frescura, trazabilidad de modelo/proveedor, límites de autonomía y minimización de datos;
- `TREQ-AURA-001`, para marca, mensajes, contenido, activos, versiones, vigencias y separación entre contenido aprobado y publicación;
- `TREQ-AURA-018`, para la frontera segura de carga y tratamiento de media cuando activos participen en flujos asistidos;
- `TREQ-AURA-019`, para mantener borrador, revisión, aprobación, programación, publicación, retiro y archivo como estados y transiciones distintos;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación de mutaciones editoriales;
- `TREQ-INTEGRATION-019`, para contratos de integración de marketing y proveedores externos;
- las obligaciones transversales vigentes de autorización, privacidad, datos y Supabase relacionadas desde esos requisitos.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación de requisitos.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra un checkout local desde esta entrega |
| LOCAL | NOT_EXECUTED | no se modificó un checkout local ni se ejecutaron validadores del repositorio desde esta entrega |
| REMOTA | PASS | se verificaron el archivo propietario, topología `DEFINE_ONCE`, gate `NO_PHYSICAL_INSTANCE`, `CAP-SCOPE-014`, `H-CAP-SCOPE-014-010` a `H-CAP-SCOPE-014-012`, `H-CAP-SCOPE-014-028` a `H-CAP-SCOPE-014-030`, `CAP-SCOPE-016`, `CAP-SCOPE-017`, `VPROC-0056`, la auditoría AURA, el registro 04A de AURA, `package.json` y los validadores documentales actuales |
| OPERATIVA | NOT_APPLICABLE | esta tarea define el contrato documental del copiloto y no ejecuta generación empresarial real, proveedores externos, memoria persistente, publicación ni acciones comerciales |
| FÍSICA | NOT_APPLICABLE | la topología canónica `DEFINE_ONCE` resuelve `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, secretos, proveedores, datos, integraciones ni despliegues |

La validación remota demuestra consistencia documental de la propuesta. La validación real del repositorio corresponde a la incorporación del artefacto en su rama documental y a la batería canónica local.

---

#### 31. Criterios de aceptación

`AURA-DOM-004` queda satisfecha cuando simultáneamente:

1. el copiloto queda definido como asistencia creativa y no como autoridad autónoma;
2. hecho, inferencia y propuesta permanecen distintos;
3. cada afirmación material usa fuente autorizada o queda marcada como no comprobada;
4. se bloquea la invención de ingredientes, beneficios, precios, descuentos, fechas, disponibilidad, capacidad, resultados, testimonios, reseñas, cifras, condiciones legales y promociones;
5. el contexto utilizado conserva fuente, versión, vigencia o corte, recuperación y alcance relevante;
6. memoria de AURA no sustituye fuentes maestras;
7. se distinguen contexto temporal, referencias canónicas, memoria creativa aprobada, historial de generación y estado del proveedor;
8. una salida generada no se auto-promueve a memoria reutilizable;
9. la memoria puede invalidarse por cambios de marca, claim, brief, derechos, producto, oferta, finalidad o fuente;
10. proveedor y modelo quedan trazables sin escoger un proveedor concreto en esta tarea;
11. cambiar proveedor o modelo no puede alterar silenciosamente tratamiento de datos o comportamiento material;
12. los datos enviados a terceros se minimizan por finalidad;
13. visibilidad interna no equivale a autorización para transferencia externa;
14. estado técnico del proveedor no se convierte en memoria canónica;
15. cada salida material conserva solicitud, fuentes, modelo/proveedor, instrucción relevante, resultado, versión, revisión y decisión suficientes para auditoría;
16. activos y derechos de `AURA-DOM-003` se respetan antes de cualquier transformación asistida;
17. `VPROC-0056` permanece como proceso canónico y la IA no salta revisión ni aprobación;
18. la revisión humana sigue siendo obligatoria antes de aprobación empresarial;
19. la IA no publica, promociona, contacta clientes, responde crisis, acepta propuestas ni muta maestros por autonomía propia;
20. ausencia, conflicto, dato vencido y fallo técnico no se convierten en valores inventados;
21. un fallback de proveedor no amplía finalidad, datos ni autoridad;
22. aprendizaje cuantitativo y atribución permanecen en `AURA-DOM-008`;
23. recomendaciones comerciales permanecen en `AURA-DOM-010`;
24. experiencia concreta permanece en `AURA-UX-*` sin perder trazabilidad;
25. `AURA-DOM-005` recibe únicamente el handoff editorial necesario para publicación y no absorbe el contrato del copiloto;
26. se crean y modifican cero requisitos de prueba;
27. no se crea ninguna instancia física;
28. la continuidad queda reservada exclusivamente a `AURA-DOM-005`.

---

#### 32. Límites

Esta tarea no autoriza ni ejecuta:

- crear un repositorio o runtime de AURA;
- contratar o seleccionar un proveedor real de IA;
- crear cuentas, API keys, secretos o credenciales;
- enviar prompts, datos o archivos reales a terceros;
- crear tablas, migraciones, embeddings, índices vectoriales, funciones, RPC, RLS, jobs o Storage;
- crear memoria persistente, base vectorial o catálogo físico de prompts;
- activar herramientas, agentes o acciones autónomas;
- modificar producto, precio, disponibilidad, cliente, venta, margen o presupuesto;
- cargar, transformar o publicar activos reales;
- entrenar, ajustar o evaluar modelos con datos reales de Vento;
- configurar retención de un proveedor real;
- aprobar contenido automáticamente;
- programar o publicar contenido;
- crear promociones, cupones, descuentos o campañas ejecutables;
- contactar clientes o audiencias;
- responder comentarios, reseñas o crisis reales;
- redefinir permisos o roles;
- resolver jurídicamente condiciones de proveedores o tratamiento de datos;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-DOM-005`.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido`

**TAREA ACTUAL APROBADA**
`AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal`

### ✅ AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana
**Tarea siguiente:** AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas
**Tipo de tarea:** definición técnico-documental del contrato canónico de cuentas, endpoints, objetivos de publicación, programación, intentos, confirmación externa, reintentos, retiro y reconciliación multicanal de AURA; separa cuenta, credencial, contenido, publicación, intento y estado externo sin crear integraciones ni instancias físicas
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean cuentas reales, credenciales, tokens, webhooks, adaptadores, colas, jobs, tablas, migraciones, publicaciones, mensajes, campañas, promociones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá identificar cuentas y endpoints de canal, preparar y programar una publicación aprobada, registrar cada intento técnico, distinguir confirmación de incertidumbre, retirar contenido y reconciliar el estado esperado con el estado observado en cada medio externo o propio.

La decisión raíz es:

```text
CONTENIDO APROBADO
!=
PUBLICACION PROGRAMADA
!=
INTENTO DE ENVIO
!=
PUBLICACION EXTERNA CONFIRMADA
```

Y además:

```text
CANAL
!=
CUENTA
!=
ENDPOINT
!=
CREDENCIAL
!=
PUBLICACION
```

AURA gobierna la intención y el ciclo editorial de publicación. El canal externo conserva únicamente la realidad técnica observada en su plataforma; no se convierte en maestro de contenido, campaña, producto, cliente, consentimiento, precio, venta ni resultado económico.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, para marca, identidad, mensajes, claims, restricciones y vigencia;
- `AURA-DOM-002`, para objetivo, audiencia, brief, calendario, presupuesto y dependencias;
- `AURA-DOM-003`, para activos, derechos, versiones, reutilización y aprobación de contenido;
- `AURA-DOM-004`, para grounding, memoria, asistencia de IA y revisión humana;
- `CAP-SCOPE-014`, para publicación multicanal, hallazgos de cuentas y plataformas, idempotencia y conciliación;
- `H-CAP-SCOPE-014-009`, para impedir que una versión vencida continúe publicándose;
- `H-CAP-SCOPE-014-013`, para eliminar dependencia estructural de credenciales personales en cuentas empresariales;
- `H-CAP-SCOPE-014-014`, para representar límites, permisos, revisiones y cambios de plataforma sin estados ambiguos;
- `H-CAP-SCOPE-014-015`, para impedir efectos duplicados por reintentos o webhooks repetidos;
- `AURA-CURRENT-FINDING-005`, `AURA-CURRENT-FINDING-006` y `AURA-CURRENT-FINDING-009`, como evidencia transitoria de publicación por defecto, consumidor público incoherente y eliminación física sin ciclo editorial suficiente;
- `OPS-CAN-001`, para familias de canal, endpoints, propiedad, seguridad, continuidad y la regla de que un canal no es propietario del hecho empresarial;
- `VPROC-0056`, para el proceso canónico de contenido y promociones desde solicitud hasta publicación, retiro y evaluación;
- `INT-MKT-001`, para preservar la diferencia entre dominio objetivo documentado y capacidad operativa materializada;
- `AURA-AUD-001` a `AURA-AUD-012`, para las fronteras de continuidad y de las superficies transitorias actuales;
- el registro canónico de requisitos de prueba vigente;
- las tareas posteriores `AURA-AUTH-*`, `AURA-UX-*` y `AURA-INT-*` como propietarias de autorización, experiencia e integración física futura.

Ninguna de estas fuentes se modifica por esta tarea.

---

#### 3. Resultado canónico

Se define un contrato de publicación multicanal gobernado por identidades estables y estados separados.

La unidad mínima deberá poder responder:

1. qué versión de contenido fue aprobada;
2. para qué marca, audiencia, finalidad y vigencia;
3. en qué familia de canal y endpoint se pretende publicar;
4. mediante qué cuenta empresarial gobernada;
5. cuál es la zona horaria y ventana válida;
6. qué formato o variante exacta se envía;
7. qué aprobación habilita esa versión y ese objetivo;
8. qué intento técnico produjo cada resultado;
9. qué identificador externo fue devuelto;
10. si la plataforma confirmó, rechazó o dejó el resultado ambiguo;
11. qué reintentos ocurrieron y con qué identidad idempotente;
12. si la versión continúa vigente;
13. si existe una orden de retiro;
14. si el estado externo coincide con el estado esperado;
15. qué evidencia permite reconstruir la secuencia completa.

La existencia de una cuenta o endpoint no implica que esté autorizado, disponible, conectado o listo para publicar.

---

#### 4. Fronteras conceptuales obligatorias

Se fijan las siguientes diferencias:

```text
FAMILIA DE CANAL
!=
ENDPOINT DE CANAL
```

```text
CUENTA EXTERNA
!=
CREDENCIAL
!=
PRINCIPAL TECNICO
```

```text
PIEZA APROBADA
!=
OBJETIVO DE PUBLICACION
!=
PUBLICACION EXTERNA
```

```text
PROGRAMADO
!=
ENVIADO
!=
PUBLICADO
!=
CONFIRMADO
```

```text
TIMEOUT
!=
FALLO CONFIRMADO
!=
EXITO CONFIRMADO
```

```text
REINTENTO
!=
NUEVA PUBLICACION
```

```text
RETIRO SOLICITADO
!=
RETIRO EXTERNO CONFIRMADO
```

```text
ESTADO EXTERNO OBSERVADO
!=
FUENTE DE VERDAD EMPRESARIAL
```

Estas separaciones son obligatorias incluso cuando un proveedor exponga una sola API, un único booleano de publicación o un panel que mezcle contenido, campaña y analítica.

---

#### 5. Universo de familias de canal consumido

`AURA-DOM-005` reutiliza las familias aprobadas por `OPS-CAN-001` sin convertirlas automáticamente en cuentas reales ni declarar que todas admiten publicación automatizada.

| Código | Familia | Tratamiento desde AURA-DOM-005 |
| --- | --- | --- |
| `CAN-WEB-CORP` | web corporativa | objetivo publicable cuando exista consumidor y contrato vigente |
| `CAN-WEB-BRAND` | páginas, menús y landings de marca | objetivo publicable con versión, vigencia y fuente empresarial autorizada |
| `CAN-SOCIAL` | redes y perfiles sociales | objetivo publicable sujeto a cuenta gobernada, permisos y reconciliación |
| `CAN-EMAIL` | correo corporativo, buzones y alias | medio de salida condicionado por finalidad, audiencia y consentimiento aplicable |
| `CAN-MSG` | WhatsApp, ManyChat y mensajería equivalente | medio de salida condicionado por finalidad, consentimiento y límites de automatización |
| `CAN-VOICE` | llamadas | no se convierte en objetivo de publicación editorial por defecto; conserva su proceso de comunicación |
| `CAN-MARKETPLACE` | Rappi y marketplaces equivalentes | solo admite proyecciones gobernadas por contrato; no adquiere maestros de producto, stock, precio o venta |
| `CAN-ECOM` | Shopify u otro comercio electrónico | solo admite proyecciones gobernadas por contrato y reconciliación con fuentes propietarias |
| `CAN-PRESENCIAL` | salón, mostrador, caja y POS | no se convierte en publicación remota por inferencia; materiales físicos o POS conservan sus contratos propietarios |
| `CAN-PASS` | Vento Pass y superficies propias de cliente | objetivo de comunicación cuando PASS y el consentimiento lo permitan; PASS conserva identidad y preferencias |
| `CAN-B2B` | captación y relación B2B/catering | canal de caso comercial; no se convierte en difusión masiva por inferencia |
| `CAN-FEEDBACK` | encuestas, QR y retroalimentación | conserva finalidad de medición y caso; no se convierte en medio promocional por inferencia |

Una familia solo se materializa como objetivo de publicación cuando existe un `channel_endpoint_id` gobernado y la capacidad concreta está soportada.

---

#### 6. Cuenta, endpoint y credencial

La arquitectura conserva objetos distintos.

##### 6.1. Cuenta empresarial de canal

Representa la identidad externa o tenant utilizado para operar en un proveedor.

Como mínimo conserva:

- identificador interno estable;
- proveedor o plataforma;
- referencia externa no secreta;
- empresa o titular empresarial documentado;
- marca o ámbito permitido;
- propietario empresarial;
- responsable operativo;
- suplente;
- custodio técnico;
- estado de la cuenta;
- método de recuperación institucional;
- fecha de última verificación de titularidad;
- referencia a política de acceso;
- referencia a credencial o principal técnico, sin secreto embebido.

##### 6.2. Endpoint de canal

Representa el destino o punto operativo concreto: perfil, página, dominio, buzón, número, tienda, superficie propia o equivalente.

Debe conservar:

- `channel_endpoint_id`;
- familia de canal;
- cuenta asociada cuando corresponda;
- marca, empresa, sede, país, idioma y zona horaria aplicables;
- capacidades soportadas;
- finalidades autorizadas;
- estado operativo;
- rutas o identificadores públicos verificables;
- contrato/adaptador esperado;
- responsable y suplente;
- política de contingencia;
- fecha de última revisión.

##### 6.3. Credencial

La credencial permite operar técnicamente y pertenece al contrato de seguridad.

AURA-DOM-005 solo conserva una referencia opaca y el estado operativo necesario. Contraseñas, tokens, códigos de recuperación, secretos, client secrets, API keys y refresh tokens no forman parte del contenido documental ni del dominio editorial.

---

#### 7. Gobierno de cuentas empresariales

Toda cuenta utilizada por AURA deberá cumplir estas reglas antes de considerarse apta:

1. tiene titularidad empresarial verificable;
2. tiene propietario funcional;
3. tiene custodio técnico;
4. tiene responsable operativo y suplente;
5. dispone de recuperación institucional;
6. una cuenta personal no es el único mecanismo de acceso;
7. cuando el proveedor lo permita, se prefieren usuarios nominativos, MFA y roles delegados;
8. una agencia o tercero no puede ser el único propietario del dominio, cuenta, píxel, catálogo, número o historial;
9. el acceso se revisa cuando cambia cargo, proveedor, agencia o relación laboral;
10. la cuenta puede suspender publicación sin perder evidencia histórica;
11. la cuenta puede declararse `NO_APTA` sin borrar publicaciones previas ni la correlación histórica;
12. la pérdida de credenciales no se representa como inexistencia de la cuenta;
13. la falta de autorización impide operar aunque la credencial continúe técnicamente válida.

La implementación concreta de permisos, vault, rotación, MFA y secretos corresponde a `AURA-AUTH-004` y `AURA-INT-001`.

---

#### 8. Capacidades de un endpoint

Cada endpoint publicable declarará explícitamente sus capacidades.

Ejemplos de capacidad conceptual:

```text
CREATE_PUBLICATION
UPDATE_PUBLICATION
SCHEDULE_PUBLICATION
CANCEL_SCHEDULE
HIDE_PUBLICATION
DELETE_EXTERNAL_PUBLICATION
READ_PUBLICATION_STATUS
READ_PROVIDER_METRICS
RECEIVE_WEBHOOK
```

La presencia de una capacidad en el contrato objetivo no afirma que el proveedor real la soporte.

Si una capacidad no existe o no está certificada:

- AURA no la simula silenciosamente;
- la interfaz deberá bloquearla o mostrar una alternativa controlada;
- el retiro podrá requerir intervención humana documentada;
- la conciliación conservará el estado hasta verificar el resultado.

---

#### 9. Objeto canónico de publicación

Una publicación en AURA no es el contenido original ni el registro remoto del proveedor.

Se define:

```text
PUBLICACION
=
VERSION DE CONTENIDO APROBADA
+ OBJETIVO DE CANAL
+ CUENTA/ENDPOINT
+ AUDIENCIA O CONTEXTO
+ VENTANA DE VIGENCIA
+ CONFIGURACION DE ENTREGA
+ ESTADO
+ TRAZABILIDAD
```

Campos conceptuales mínimos:

```text
publication_id
content_version_id
brand_id
channel_endpoint_id
channel_account_id cuando aplique
purpose
audience_reference cuando aplique
locale
timezone
scheduled_for
valid_from
valid_until
approval_reference
payload_version
idempotency_scope
publication_state
external_publication_id cuando exista
last_reconciled_at
created_by
created_at
```

La publicación referencia la versión aprobada; no la copia como un nuevo maestro independiente.

---

#### 10. Objetivo de publicación por endpoint

Una misma versión de contenido puede tener varios objetivos independientes.

Ejemplo conceptual:

```text
VERSION APROBADA
  ├─ TARGET WEB CORPORATIVA
  ├─ TARGET INSTAGRAM MARCA A
  ├─ TARGET PASS
  └─ TARGET EMAIL AUTORIZADO
```

Cada target conserva su propio:

- endpoint;
- formato;
- variante;
- calendario;
- estado;
- payload;
- identificador externo;
- intentos;
- error;
- retiro;
- reconciliación.

El éxito en un target no convierte en exitosos los demás.

---

#### 11. Relación con VPROC-0056

`AURA-DOM-005` no redefine el proceso canónico.

Se preservan sus estados:

```text
CONTENT_REQUESTED
→ BRIEF_UNDER_REVIEW
→ IN_CREATION
→ UNDER_REVIEW
→ PENDING_APPROVAL
→ APPROVED
→ SCHEDULED
→ PUBLISHED
→ PERFORMANCE_REVIEW
→ CONTENT_CYCLE_REVIEWED
```

Reglas obligatorias:

1. `APPROVED` significa versión autorizada, no publicada;
2. `SCHEDULED` exige canal, fecha, audiencia y versión de publicación;
3. `PUBLISHED` exige evidencia suficiente de que la pieza está activa en el canal controlado;
4. un target ambiguo no debe elevar el proceso a verdad de publicación por inferencia;
5. la evaluación final no prueba impacto financiero;
6. el retiro y su evidencia forman parte del cierre del ciclo aunque el proveedor no ofrezca una transición homónima;
7. los estados técnicos de cada target complementan al proceso, no lo sustituyen.

---

#### 12. Estados técnicos por target

Para evitar que un único estado de proceso o un booleano externo oculte fallos parciales, cada objetivo de publicación tendrá un estado técnico independiente.

Estados conceptuales mínimos:

| Estado | Significado |
| --- | --- |
| `PLANNED` | target definido pero sin envío autorizado |
| `SCHEDULED` | target programado con versión y ventana válidas |
| `QUEUED` | operación aceptada por el mecanismo de ejecución interno |
| `DISPATCHING` | intento en curso hacia el proveedor |
| `PUBLISHED_CONFIRMED` | proveedor o consumidor confirmado y correlacionado |
| `PUBLISHED_UNCONFIRMED` | existe evidencia parcial o ambigua; requiere reconciliación |
| `FAILED_RETRYABLE` | fallo transitorio clasificado y todavía elegible para reintento |
| `FAILED_FINAL` | fallo no reintentable o ventana agotada |
| `CANCELLED_BEFORE_DISPATCH` | programación cancelada antes de producir efecto externo |
| `RETIREMENT_PENDING` | existe una orden de retiro aún no confirmada |
| `RETIRED_CONFIRMED` | retiro externo verificado |
| `RECONCILIATION_REQUIRED` | estado interno y externo no pueden declararse equivalentes |

Estos nombres constituyen contrato conceptual de dominio. La representación técnica futura deberá conservar sus significados aunque use otra estructura física aprobada.

---

#### 13. Programación

Programar una publicación exige como mínimo:

- versión aprobada e inmutable para ese target;
- cuenta y endpoint aptos;
- canal y formato compatibles;
- zona horaria explícita;
- fecha y hora objetivo;
- ventana de vigencia;
- derechos vigentes;
- mensaje, claim, precio, oferta o enlace todavía válidos cuando apliquen;
- audiencia autorizada cuando corresponda;
- CTA y destino activos;
- referencia a aprobación;
- política de contingencia.

No se programa contenido cuyo `valid_until` preceda el momento de publicación.

No se programa una variante que dependa de una ruta pública inexistente o retirada.

La programación no congela indefinidamente hechos dinámicos. Si un dato material debe verificarse al momento de publicar, el target conserva esa dependencia y puede bloquearse antes del envío.

---

#### 14. Zona horaria y calendario

Toda fecha de publicación conservará:

- instante absoluto;
- zona horaria empresarial del target;
- zona horaria del operador cuando sea material;
- calendario aplicable;
- cambios de programación;
- actor y motivo del cambio.

Una fecha textual sin zona horaria no constituye programación ejecutable.

Los cambios de horario no podrán alterar silenciosamente la versión de contenido aprobada.

---

#### 15. Congelación de versión para envío

Al programar o despachar un target se fija la versión exacta que se pretende publicar.

```text
EDICION POSTERIOR DEL CONTENIDO
!=
MUTACION SILENCIOSA DEL TARGET YA PROGRAMADO
```

Si cambia materialmente:

- copy;
- claim;
- precio u oferta proyectada;
- activo;
- CTA;
- audiencia;
- marca;
- derechos;
- condición legal;
- destino;

el target deberá volver al punto de revisión o aprobación que corresponda antes de despachar la nueva versión.

Un cambio puramente operativo de horario podrá conservar aprobación solo cuando la política lo permita y las vigencias sigan siendo válidas.

---

#### 16. Intento de publicación

Cada llamada o acción técnica que pueda producir un efecto externo genera un intento independiente.

Como mínimo conserva:

```text
publication_attempt_id
publication_id
channel_endpoint_id
operation
idempotency_key
attempt_number
requested_at
provider_request_reference
payload_hash
contract_version
provider_response_reference
http_or_provider_status
classified_outcome
started_at
finished_at
```

Los secretos no se guardan en el intento.

El historial de intentos es inmutable; un reintento agrega un intento nuevo y conserva la misma intención idempotente cuando representa la misma operación empresarial.

---

#### 17. Clave de idempotencia

Una operación de publicación deberá tener una identidad estable que permita distinguir reintento de nueva intención.

Conceptualmente:

```text
IDEMPOTENCY KEY
=
OPERACION EMPRESARIAL
+ PUBLICATION_ID
+ TARGET
+ VERSION
+ ACTION GENERATION
```

La misma clave no se reutiliza para una versión o acción materialmente nueva.

Publicar, actualizar y retirar son acciones distintas aunque afecten el mismo `publication_id`.

Un webhook repetido, reenvío del proveedor, retry interno o respuesta duplicada no crea una segunda publicación por sí mismo.

---

#### 18. Resultado ambiguo y fail-closed

La ausencia de respuesta no equivale a fallo.

La regla obligatoria es:

```text
REQUEST ENVIADO
+
TIMEOUT O RESPUESTA AMBIGUA
→
PUBLISHED_UNCONFIRMED O RECONCILIATION_REQUIRED
→
CONSULTAR / RECONCILIAR
→
SOLO DESPUES DECIDIR REINTENTO
```

Queda prohibido:

```text
TIMEOUT
→ RETRY CIEGO
→ POSIBLE DUPLICADO
```

Cuando el proveedor no permita consultar el estado, el caso permanece explícitamente incierto y sigue la contingencia definida para ese canal.

---

#### 19. Clasificación de fallos

Los fallos deberán clasificarse antes de decidir reintento.

Familias mínimas:

| Familia | Ejemplo conceptual | Tratamiento |
| --- | --- | --- |
| autenticación/autorización | token revocado, permiso removido | bloquear cola del alcance afectado y escalar a custodia |
| rate limit | límite temporal del proveedor | reintento gobernado dentro de la ventana válida |
| transitorio técnico | red, timeout conocido sin efecto, 5xx clasificable | retry según política y reconciliación previa cuando exista ambigüedad |
| validación | formato, tamaño, campo inválido | corregir antes de reintentar; no repetir ciegamente |
| política/plataforma | rechazo de contenido o revisión externa | revisión humana y decisión; no evadir controles |
| destino inexistente | endpoint, ruta o publicación no encontrada | reconciliar identidad y estado antes de actuar |
| incompatibilidad contractual | versión o capacidad no soportada | bloquear hasta resolver contrato/adaptador |
| incierto | no existe evidencia suficiente de éxito o fallo | reconciliación obligatoria |

La política concreta de backoff, límites, circuit breaker, cola y compensación pertenece a `AURA-INT-001` y a la infraestructura transversal aplicable.

---

#### 20. Reintentos

Un reintento solo es admisible cuando:

1. la acción original sigue siendo válida;
2. la versión continúa aprobada;
3. la vigencia no expiró;
4. la cuenta y endpoint siguen aptos;
5. no existe confirmación previa del mismo efecto;
6. la clase de fallo permite retry;
7. la clave idempotente se conserva cuando se trata de la misma acción;
8. la política de canal permite un nuevo intento;
9. el reintento no reintroduce contenido retirado;
10. no viola límites de frecuencia, consentimiento o plataforma.

Un reintento tardío después de `valid_until`, retiro o cancelación queda bloqueado.

---

#### 21. Publicación parcial multicanal

Una operación multicanal puede terminar parcialmente.

Ejemplo:

```text
WEB = PUBLISHED_CONFIRMED
SOCIAL_A = FAILED_RETRYABLE
PASS = PUBLISHED_CONFIRMED
EMAIL = RECONCILIATION_REQUIRED
```

La regla es:

```text
FALLO PARCIAL
!=
RECREAR TODOS LOS TARGETS
```

Cada target se recupera de forma independiente.

Una decisión de retirar targets exitosos debido al fallo de otro target debe ser explícita; no se ejecuta como compensación universal por inferencia.

---

#### 22. Confirmación externa

Un target pasa a `PUBLISHED_CONFIRMED` cuando existe evidencia suficiente y correlacionable.

Según el canal podrá incluir:

- identificador externo;
- URL o permalink;
- timestamp del proveedor;
- estado consultado;
- respuesta firmada o autenticada;
- snapshot de campos relevantes;
- webhook correlacionado;
- consumidor público verificable.

Una respuesta HTTP exitosa sin prueba de efecto no obliga a declarar publicación confirmada si el contrato del proveedor es asíncrono.

---

#### 23. Edición después de publicar

Una modificación de una publicación externa debe conservar:

- versión interna anterior;
- versión nueva;
- publicación externa afectada;
- payload anterior y nuevo por referencia o hash;
- aprobación aplicable;
- intento de actualización;
- resultado;
- evidencia de reconciliación.

No se sobrescribe la historia para fingir que la versión nueva fue la publicada originalmente.

Si el proveedor no soporta actualización, la operación deberá convertirse en retiro y nueva publicación únicamente mediante una decisión explícita y trazable.

---

#### 24. Retiro

El retiro se trata como una acción propia y auditable.

Puede significar, según el canal:

- cancelar una programación todavía no enviada;
- ocultar;
- despublicar;
- archivar;
- eliminar externamente cuando la política lo permita;
- cambiar vigencia en una superficie propia;
- sustituir por contenido de contingencia aprobado.

No todas estas acciones son equivalentes.

AURA deberá registrar cuál se solicitó, cuál se ejecutó y cuál confirmó el proveedor.

---

#### 25. Regla de retiro seguro

Una publicación retirada no podrá reaparecer por:

- caché controlable;
- job pendiente;
- automatización antigua;
- programación previa;
- reintento tardío;
- webhook repetido;
- fallback editorial no gobernado;
- réplica o target no reconciliado.

El retiro interno no se considera completo mientras existan targets activos que debían ser retirados o mientras el estado externo permanezca desconocido sin tratamiento explícito.

La evidencia histórica interna no se elimina por retirar el contenido externo.

---

#### 26. Reconciliación

La reconciliación compara intención y estado esperado contra estado externo observado.

Por target deberá poder resolver:

```text
EXPECTED_VERSION
EXPECTED_STATE
EXPECTED_EXTERNAL_ID
EXPECTED_VISIBILITY
EXPECTED_VALIDITY
```

contra:

```text
OBSERVED_VERSION O FINGERPRINT
OBSERVED_STATE
OBSERVED_EXTERNAL_ID
OBSERVED_VISIBILITY
OBSERVED_TIMESTAMP
```

La salida mínima distingue:

- `MATCHED`;
- `MISSING_REMOTE`;
- `UNEXPECTED_REMOTE`;
- `VERSION_DRIFT`;
- `STATUS_DRIFT`;
- `IDENTITY_DRIFT`;
- `RECONCILIATION_BLOCKED`.

La implementación futura podrá ampliar esta taxonomía sin colapsar diferencias entre ausencia, divergencia y bloqueo técnico.

---

#### 27. Cambios hechos fuera de AURA

Una edición, publicación, retiro o eliminación hecha directamente en el proveedor externo constituye estado observado externo.

No se promueve automáticamente a verdad canónica.

La reconciliación deberá:

1. detectar el cambio;
2. identificar el endpoint y objeto externo;
3. conservar evidencia;
4. comparar contra la versión esperada;
5. marcar drift;
6. determinar si puede importarse como observación, requiere revisión o debe corregirse externamente;
7. no destruir el historial interno.

El acceso directo al proveedor no se asume prohibido por este contrato, pero nunca queda fuera de trazabilidad cuando afecta una superficie gobernada.

---

#### 28. Contenido de contingencia y fallback

Un fallback no puede actuar como una publicación invisible y sin gobierno.

Debe conservar:

- identidad;
- versión;
- finalidad de contingencia;
- canales donde aplica;
- marca;
- vigencia;
- responsable;
- aprobación;
- condición que lo activa;
- condición que lo desactiva;
- evidencia de retorno a operación normal.

Una falla de credenciales, tabla o API no autoriza mostrar placeholders, promociones retiradas, eventos inexistentes o contenido histórico como vigente.

---

#### 29. Integridad de enlaces y consumidores

Antes de publicar contenido que dependa de una ruta o consumidor público debe existir un destino válido y activo.

Se preserva la regla de que:

```text
CONTENIDO CREADO
+
DESTINO INEXISTENTE
!=
CONTENIDO PUBLICABLE
```

En particular, mientras una ruta redirija a un destino que no representa la acción anunciada, la publicación deberá bloquearse, advertirse o dirigirse a un destino explícitamente aprobado.

URLs, CTAs, canonicals, previews y redirecciones deberán conservar su validación propietaria posterior; esta tarea no redefine `AURA-INT-001` ni las políticas de seguridad de enlaces.

---

#### 30. Fuente de verdad y proyecciones dinámicas

Precio, producto, disponibilidad, stock, capacidad, horario, beneficio, consentimiento, cliente, venta, costo y margen permanecen en sus dominios propietarios.

AURA solo puede publicar su proyección autorizada y vigente.

Si un target depende de un hecho dinámico cuya frescura ya no puede demostrarse, AURA deberá:

- bloquear el envío;
- degradar el claim según una regla aprobada; o
- exigir revisión.

Nunca convierte una copia antigua en maestro porque el canal todavía la muestre.

---

#### 31. Métricas del proveedor

El proveedor puede aportar impresiones, alcance, clics, vistas, entregas, errores u otros hechos técnicos.

`AURA-DOM-005` solo exige que esas métricas mantengan:

- endpoint;
- publicación externa;
- periodo;
- zona horaria;
- versión o definición cuando aplique;
- fuente;
- fecha de obtención;
- estado de conciliación.

La interpretación de rendimiento, atribución, incrementalidad y aprendizaje permanece reservada a `AURA-DOM-008`.

---

#### 32. Auditoría mínima

Toda transición material de publicación deberá poder correlacionar:

- actor humano cuando exista;
- principal técnico;
- capacidad o acción;
- cuenta y endpoint;
- `publication_id`;
- versión de contenido;
- estado anterior;
- estado nuevo;
- intento;
- identificador externo;
- resultado;
- motivo;
- timestamps;
- evidencia.

Una tarea automática no elimina la responsabilidad de reconstruir quién aprobó la versión que originó el efecto.

---

#### 33. Observabilidad mínima

La futura operación deberá poder detectar, como mínimo:

- publicaciones internas sin confirmación externa;
- publicaciones externas no correlacionadas;
- targets vencidos todavía visibles;
- retiros pendientes;
- jobs tardíos;
- reintentos repetidos;
- webhooks duplicados;
- credenciales inválidas;
- cuentas sin responsable o suplente;
- límites de proveedor activos;
- discrepancias de versión;
- URLs rotas;
- medios faltantes;
- consumidores públicos incompatibles;
- fallbacks activos fuera de su condición.

La métrica de salud técnica no sustituye la evaluación comercial.

---

#### 34. Operación degradada

Cuando un canal no pueda operar normalmente:

1. se identifica el endpoint afectado;
2. se pausa únicamente el alcance afectado cuando sea posible;
3. se preservan publicaciones ya confirmadas;
4. se bloquean envíos cuya seguridad o resultado no pueda demostrarse;
5. se conserva la cola pendiente sin perder vigencia;
6. se usa canal alterno solo si está autorizado;
7. la captura manual conserva correlación;
8. al recuperar servicio se reconcilia antes de liberar reintentos ambiguos;
9. se verifican publicaciones y retiros pendientes;
10. se cierra la contingencia con evidencia.

Una cuenta personal no se convierte en contingencia automática.

---

#### 35. Superficies transitorias actuales

Las superficies actuales observadas en VISO y Vento-Group siguen siendo evidencia de transición.

Esta tarea no:

- transfiere el CMS de VISO a AURA;
- declara AURA desplegada;
- convierte `website_items` o `website_blocks` en el modelo físico objetivo;
- convierte `is_published` en ciclo editorial suficiente;
- crea un registro de cuentas en VISO;
- migra `website-media`;
- cambia RLS;
- cambia consumidores públicos;
- corrige rutas existentes;
- publica eventos;
- habilita `/eventos`;
- modifica fallbacks;
- cambia service role, anon o identidad de lectura pública.

La futura materialización deberá conservar compatibilidad o ejecutar la migración formal gobernada por las tareas propietarias correspondientes.

---

#### 36. Frontera con AURA-AUTH-002

`AURA-DOM-005` define qué estados y acciones existen.

`AURA-AUTH-002` definirá quién puede:

- crear;
- revisar;
- aprobar;
- programar;
- publicar;
- retirar;
- responder públicamente.

Por tanto, esta tarea no asigna permisos concretos a roles ni permite autoaprobación.

---

#### 37. Frontera con AURA-AUTH-004

`AURA-DOM-005` exige cuenta gobernada, custodia y recuperación.

`AURA-AUTH-004` gobernará:

- credenciales;
- tokens;
- secretos;
- acceso de terceros;
- proveedores;
- prompts y archivos cuando corresponda;
- datos enviados fuera de Vento.

Esta tarea no almacena ni selecciona secretos reales.

---

#### 38. Frontera con AURA-UX-004

El dominio define estados y decisiones; `AURA-UX-004` diseñará la experiencia de aprobación y publicación multicanal.

La interfaz deberá poder mostrar sin ambigüedad:

- qué versión está aprobada;
- qué targets existen;
- qué está programado;
- qué fue confirmado;
- qué falló;
- qué está incierto;
- qué requiere reconciliación;
- qué retiro sigue pendiente.

La experiencia no puede representar todos estos estados como un único check de “publicado”.

---

#### 39. Frontera con AURA-INT-001

`AURA-DOM-005` define semántica y resultados esperados.

`AURA-INT-001` definirá la integración concreta de:

- adaptadores;
- APIs;
- OAuth;
- credenciales;
- webhooks;
- firmas;
- rate limits;
- backoff;
- colas;
- payloads;
- errores de proveedor;
- consultas de estado;
- reconciliación externa.

No se selecciona un proveedor ni una implementación desde esta tarea.

---

#### 40. Frontera con AURA-DOM-006

`AURA-DOM-005` publica contenido aprobado hacia targets.

`AURA-DOM-006` definirá:

- campañas;
- experimentos;
- variantes experimentales;
- promociones;
- cupones;
- guardas económicas;
- guardas de stock;
- guardas de capacidad;
- detención por daño.

Por tanto:

```text
PUBLICACION
!=
CAMPANA
!=
PROMOCION
!=
CUPON
```

Una publicación puede existir fuera de una campaña, y una campaña no autoriza por sí sola publicar una versión no aprobada.

---

#### 41. Frontera con AURA-DOM-009

Publicar contenido editorial y responder a una interacción pública son responsabilidades distintas.

`AURA-DOM-009` gobernará comentarios, reseñas, respuestas y escalamiento a servicio.

El hecho de que una cuenta permita publicar no autoriza al mismo actor o proceso a responder reclamos, crisis o comentarios sin el contrato correspondiente.

---

#### 42. Frontera con AURA-DOM-008

`AURA-DOM-005` conserva hechos técnicos y métricas de publicación.

`AURA-DOM-008` decidirá cómo convertir esos hechos en:

- métricas gobernadas;
- atribución;
- nivel de confianza;
- incrementalidad;
- aprendizaje;
- cierre de campaña.

Una publicación confirmada no prueba conversión, venta, margen ni causalidad.

---

#### 43. Handoff contractual hacia integración

La futura integración de un proveedor solo podrá considerarse compatible si puede demostrar, para cada efecto externo:

```text
INTENCION INTERNA
→ TARGET
→ INTENTO
→ RESPUESTA O AMBIGUEDAD
→ IDENTIDAD EXTERNA
→ ESTADO OBSERVADO
→ RECONCILIACION
→ CIERRE
```

Si una plataforma no ofrece todos los mecanismos, la integración deberá documentar la limitación y una compensación gobernada; no podrá inventar confirmación.

---

#### 44. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. canal, cuenta, endpoint, credencial, contenido y publicación son objetos distintos;
2. se reutiliza el universo de familias de `OPS-CAN-001` sin declarar endpoints físicos por inferencia;
3. una cuenta empresarial debe tener titularidad, propietario, custodio, responsable y suplente;
4. una cuenta personal no puede ser el único acceso empresarial ordinario;
5. una credencial no equivale a autorización;
6. una versión aprobada no equivale a publicación;
7. cada target multicanal tiene estado independiente;
8. `VPROC-0056` conserva su ciclo de proceso y no se reemplaza por estados técnicos del proveedor;
9. la programación exige zona horaria, versión, vigencia, endpoint apto y aprobación;
10. un cambio material de contenido invalida el target programado hasta nueva revisión o aprobación aplicable;
11. cada intento de efecto externo conserva identidad y trazabilidad;
12. el reintento de la misma intención conserva idempotencia;
13. timeout o respuesta ambigua obligan a reconciliar antes de reintentar;
14. un fallo parcial no recrea targets ya confirmados;
15. retirar es una acción propia y no equivale a borrar evidencia;
16. retiro solicitado y retiro confirmado son estados distintos;
17. el retiro debe impedir reaparición por jobs, cache, reintentos o fallbacks gobernables;
18. el estado externo se observa pero no se convierte en fuente de verdad empresarial;
19. ediciones directas en un proveedor generan drift y reconciliación;
20. fallbacks deben ser contenido gobernado y versionado;
21. no se publica hacia consumidores o destinos inexistentes;
22. datos dinámicos continúan perteneciendo a sus fuentes propietarias;
23. métricas del proveedor se conservan como hechos técnicos, no como impacto empresarial demostrado;
24. la autorización detallada permanece en `AURA-AUTH-*`;
25. experiencia permanece en `AURA-UX-004`;
26. adaptadores, APIs, webhooks y credenciales físicas permanecen en `AURA-INT-001`;
27. campañas, experimentos, promociones, cupones y guardas permanecen en `AURA-DOM-006`;
28. reputación y respuesta pública permanecen en `AURA-DOM-009`;
29. atribución y aprendizaje permanecen en `AURA-DOM-008`;
30. las superficies actuales de VISO/Vento-Group no se transfieren ni modifican;
31. se crean y modifican cero requisitos de prueba;
32. no se crea ninguna instancia física;
33. la continuidad queda reservada exclusivamente a `AURA-DOM-006`.

---

#### 45. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea materializa y organiza reglas ya protegidas por requisitos vigentes sobre ciclo editorial, cuentas, autorización, idempotencia, publicación, consumidores, fallbacks, links, observabilidad e integración. No introduce una obligación de prueba nueva ni cambia el alcance de una fila existente.

---

#### 46. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-001`, para separación de contenido, publicación y estados editoriales;
- `TREQ-AURA-009`, para capacidades atómicas de mutación y publicación;
- `TREQ-AURA-011` a `TREQ-AURA-013`, para creación, actualización, referencias y retiro lógico del contenido actual;
- `TREQ-AURA-019`, para estados distintos de borrador, revisión, aprobación, programación, publicación, ocultamiento, retiro y archivo;
- `TREQ-AURA-020`, para consumo público con identidad técnica explícita y fallos observables;
- `TREQ-AURA-021`, para fallbacks gobernados y retiro efectivo;
- `TREQ-AURA-022`, para impedir publicar hacia consumidores inexistentes;
- `TREQ-AURA-023`, para contrato versionado entre editor y consumidor;
- `TREQ-AURA-024`, para compatibilidad entre esquema, políticas y consumidores;
- `TREQ-AURA-025`, para integridad de URLs, CTAs, canonicals, previews y redirecciones;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación editorial;
- `TREQ-INTEGRATION-019`, para adaptadores, identificadores internos/externos, idempotencia, webhooks, reintentos y conciliación de marketing.

Esta enumeración es trazabilidad de cobertura existente y no constituye creación, modificación ni actualización del registro.

---

#### 47. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | `NOT_EXECUTED` | el artefacto todavía no se ha insertado ni validado en el checkout del usuario |
| REMOTA | `PASS` | fuentes canónicas vigentes, topología, CAP-SCOPE-014, OPS-CAN-001, VPROC-0056, 04A y contratos de integración fueron inspeccionados antes de redactar |
| OPERATIVA | `NOT_EXECUTED` | no se conectaron ni consultaron cuentas o proveedores reales y no se ejecutaron publicaciones |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; la tarea se agota en su contrato documental |

---

#### 48. Criterios de aceptación

La tarea queda sustantivamente completa cuando se cumple todo lo siguiente:

- cuenta, endpoint, credencial y principal técnico quedan separados;
- el universo de familias de canal reutiliza `OPS-CAN-001` sin inventar cuentas reales;
- cada publicación referencia una versión aprobada;
- cada target conserva estado independiente;
- programación conserva zona horaria, vigencia y aprobación;
- `VPROC-0056` permanece intacto como proceso propietario;
- los estados técnicos no sustituyen estados de proceso;
- los intentos son auditables;
- la idempotencia distingue retry de nueva intención;
- los resultados ambiguos pasan por reconciliación;
- un fallo parcial no duplica publicaciones ya confirmadas;
- retiro, borrado externo y evidencia interna permanecen distintos;
- los fallbacks están gobernados;
- los consumidores inexistentes bloquean publicación;
- las métricas externas no se presentan como impacto empresarial probado;
- las superficies transitorias actuales no cambian de ownership;
- `AURA-DOM-006`, `AURA-DOM-008`, `AURA-DOM-009`, `AURA-AUTH-*`, `AURA-UX-004` y `AURA-INT-001` conservan sus responsabilidades;
- no se crean ni modifican requisitos de prueba;
- no se autoriza ninguna implementación física;
- la siguiente tarea reservada es exactamente `AURA-DOM-006`.

---

#### 49. Límites

Esta tarea no autoriza ni ejecuta:

- crear o recuperar cuentas reales;
- tomar propiedad de perfiles, dominios, números, buzones o tiendas;
- almacenar contraseñas, tokens, secretos o códigos de recuperación;
- configurar MFA, OAuth o service accounts;
- crear adaptadores, APIs, webhooks o firmas;
- crear colas, jobs, cron, workers, circuit breakers o políticas de backoff;
- crear tablas, migraciones, RLS, funciones, RPC o Storage;
- modificar VISO o Vento-Group;
- migrar el CMS;
- publicar contenido real;
- programar publicaciones reales;
- enviar mensajes reales;
- editar o retirar publicaciones reales;
- consumir métricas reales;
- responder comentarios o reseñas;
- crear campañas, experimentos, promociones o cupones;
- alterar precios, descuentos, beneficios, stock o capacidad;
- definir permisos concretos por rol;
- desplegar proveedores o credenciales;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-DOM-006`.

---

#### 50. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana`

**TAREA ACTUAL APROBADA**
`AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas`

### ✅ AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas

**Estado:** APROBADA
**Tarea anterior:** AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal
**Tarea siguiente:** AURA-DOM-007 — Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación
**Tipo de tarea:** definición técnico-documental del contrato canónico de campañas ejecutables, experimentos, promociones, cupones y guardas económicas y operativas de AURA; fija separación de intención, regla, elegibilidad, redención, efecto comercial, presupuesto, margen, disponibilidad y capacidad sin crear reglas transaccionales ni instancias físicas
**Bloque:** `BLOQUE W — AURA — dominio de marketing y creación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/02_DOMINIO_DE_MARKETING_Y_CREACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean campañas reales, experimentos activos, audiencias operativas, promociones, cupones, reglas transaccionales, beneficios, descuentos, presupuestos ejecutables, reservas de inventario, bloqueos de capacidad, tablas, migraciones, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-29

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá convertir una campaña planificada en un mecanismo gobernado de ejecución comercial y experimental sin asumir autoridad sobre precio, venta, fidelización, presupuesto, margen, inventario, capacidad, redención ni resultado económico.

La decisión raíz es:

```text
CAMPANA AURA
=
INTENCION DE MARKETING GOBERNADA
+ HIPOTESIS
+ AUDIENCIA
+ OFERTA O PROPUESTA
+ PIEZAS Y CANALES
+ PRESUPUESTO REFERENCIADO
+ EXPERIMENTO CUANDO APLIQUE
+ GUARDAS
+ TRAZABILIDAD
```

pero:

```text
CAMPANA
!=
PROMOCION
!=
CUPON
!=
BENEFICIO
!=
REGLA TRANSACCIONAL
!=
REDENCION
!=
DESCUENTO APLICADO
!=
VENTA
```

AURA gobierna la intención promocional, el diseño de campaña, la hipótesis y la correlación necesaria para aprender. PULSO, PASS, NUMERA, NEXO y FOGO conservan las decisiones y hechos de sus dominios.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-001`, para marca, identidad, mensajes, claims, restricciones y vigencia;
- `AURA-DOM-002`, para objetivo, hipótesis, audiencia, brief, calendario, presupuesto, dependencias, guardas previas y ciclo documental de campaña;
- `AURA-DOM-003`, para activos, derechos, versiones, reutilización y aprobación de contenido;
- `AURA-DOM-004`, para grounding, memoria, asistencia de IA, límites de autonomía y revisión humana;
- `AURA-DOM-005`, para cuentas, endpoints, publicación, programación, idempotencia, retiro y reconciliación por canal;
- `CAP-SCOPE-014`, especialmente `CAP-14.05` y `CAP-14.06`, para campañas, experimentos, promociones, cupones y fronteras entre AURA, PULSO, PASS y NUMERA;
- `H-CAP-SCOPE-014-007`, para impedir que idea, campaña, pieza, publicación y promoción se confundan;
- `H-CAP-SCOPE-014-016`, para impedir que AURA ejecute descuentos y compita con PULSO o PASS;
- `H-CAP-SCOPE-014-017`, para bloquear promociones inviables por margen, stock, capacidad o condiciones operativas;
- `INT-MKT-001`, para separar campaña operativa de mera documentación de dominio;
- `INT-MKT-002`, para preservar PASS como propietaria de beneficios, reglas y fidelización;
- `INT-MKT-003`, para preservar PULSO como propietaria de la validación y aplicación del efecto comercial;
- `OPS-CAN-001`, para canales gobernados y separación entre canal y hecho empresarial;
- `VPROC-0056`, para el ciclo canónico del contenido y promociones asociado a una campaña;
- `CAP-SCOPE-006`, para disponibilidad e inventario;
- `CAP-SCOPE-008`, para capacidad productiva;
- `CAP-SCOPE-009`, para pedido, venta, promoción y ejecución comercial;
- `CAP-SCOPE-010`, para cliente, consentimiento, fidelización, beneficios y redención;
- `CAP-SCOPE-012`, para presupuesto, costo, margen y rentabilidad;
- `CAP-SCOPE-017`, para calidad de datos, métricas y aprendizaje;
- el registro canónico de requisitos de prueba vigente;
- las tareas posteriores de AURA para autorización, experiencia, integración, atribución y oportunidades.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Resultado canónico

Se define una campaña ejecutable como un expediente gobernado que conserva, como mínimo:

1. identidad estable;
2. objetivo empresarial;
3. hipótesis;
4. audiencia y exclusiones;
5. marca y versión de memoria de marca;
6. oferta o propuesta comunicada;
7. piezas y variantes aprobadas;
8. canales y targets previstos;
9. periodo y calendario;
10. presupuesto o límite económico referenciado;
11. experimento y grupos cuando aplique;
12. promoción o beneficio relacionado cuando aplique;
13. reglas y versiones externas que deben materializar el efecto;
14. guardas económicas;
15. guardas de disponibilidad, stock y capacidad;
16. condiciones legales, reputacionales, de consentimiento y canal;
17. responsables y aprobaciones;
18. criterios de inicio, pausa, cancelación y cierre;
19. correlaciones con publicaciones, reglas, redenciones, ventas y resultados;
20. evidencia suficiente para reconstruir qué se autorizó y bajo qué condiciones.

La campaña no copia maestros de otros dominios. Conserva referencias versionadas y resultados de evaluación.

---

#### 4. Fronteras conceptuales obligatorias

Se preservan las siguientes diferencias:

```text
IDEA
!=
CAMPANA
!=
EXPERIMENTO
!=
PIEZA
!=
PUBLICACION
```

```text
PROMOCION
!=
CUPON
!=
BENEFICIO PASS
!=
REGLA TRANSACCIONAL
```

```text
VISIBLE
!=
ELEGIBLE
!=
APLICABLE
!=
APLICADO
```

```text
HIPOTESIS
!=
RESULTADO OBSERVADO
!=
CAUSALIDAD DEMOSTRADA
```

```text
PRESUPUESTO REFERENCIADO
!=
GASTO AUTORIZADO
!=
GASTO REAL
```

```text
STOCK OBSERVADO
!=
STOCK RESERVADO
!=
DISPONIBILIDAD GARANTIZADA
```

```text
CAPACIDAD OBSERVADA
!=
CAPACIDAD COMPROMETIDA
```

```text
PAUSAR CAMPANA
!=
REVERTIR VENTAS O REDENCIONES YA OCURRIDAS
```

Estas separaciones permanecen obligatorias aunque una herramienta externa las presente juntas.

---

#### 5. Propiedad empresarial

La propiedad queda distribuida así:

| Materia | Propietaria o autoridad | Frontera obligatoria |
| --- | --- | --- |
| intención, campaña, hipótesis, experimento y correlación de marketing | `AURA` | no aplica descuentos, no redime beneficios y no modifica maestros económicos u operativos |
| beneficio, recompensa, reglas de fidelización, elegibilidad y ledger | `PASS` | AURA puede referenciar; no crea ni muta la fidelización |
| pedido, venta, condiciones comerciales, validación y efecto aplicado | `PULSO` | la campaña no sustituye validación transaccional |
| presupuesto, costo, margen, rentabilidad y resultado económico | `NUMERA` | AURA referencia decisiones y resultados; no los fabrica |
| producto y atributos maestros | `NEXO` | AURA no duplica producto ni presentación |
| existencia, disponibilidad y hechos de inventario | `NEXO` | una lectura no equivale a reserva ni garantía futura |
| capacidad productiva y restricciones de producción | `FOGO` | AURA no compromete producción por inferencia |
| publicación externa y estado técnico del canal | canal y contrato de `AURA-DOM-005` | publicar no ejecuta una promoción transaccional |
| consentimiento y preferencias de cliente | `PASS` o fuente propietaria aplicable | la audiencia no fabrica consentimiento |
| atribución, confianza, incrementalidad y aprendizaje cuantitativo | `AURA-DOM-008` | esta tarea conserva diseño experimental y correlaciones, no declara causalidad final |

Ninguna fila autoriza escritura cruzada.

---

#### 6. Relación con AURA-DOM-002

`AURA-DOM-002` define el sobre de planificación.

`AURA-DOM-006` consume ese sobre y agrega el contrato de ejecución gobernada.

Se conserva:

```text
AURA-DOM-002
-> objetivo
-> hipotesis
-> audiencia
-> brief
-> calendario
-> presupuesto referenciado
-> dependencias
-> ciclo documental
```

```text
AURA-DOM-006
-> experimento
-> variantes y control
-> promocion
-> cupon
-> guardas economicas
-> guardas operativas
-> reglas de activacion y pausa
-> correlacion con ejecucion transaccional
```

Una campaña no podrá entrar a ejecución si su versión de planificación ya no coincide con la versión que fue aprobada.

---

#### 7. Identidad de campaña

Cada campaña deberá conservar identidad estable y versión.

Como mínimo deberá poder reconstruirse:

- campaña de origen;
- versión vigente;
- iniciativa o brief aprobado del que proviene;
- marca;
- objetivo;
- hipótesis;
- audiencia;
- oferta o propuesta;
- responsables;
- periodo;
- presupuesto referenciado;
- experimentos relacionados;
- promociones relacionadas;
- publicaciones relacionadas;
- estado de sus guardas;
- decisión de inicio, pausa, cancelación o cierre.

Una nueva versión material no sobrescribe la anterior.

---

#### 8. Campaña y mecanismo ejecutable

La campaña se considera preparada para ejecución únicamente cuando pueda demostrarse que las dependencias materiales de la versión aprobada están satisfechas.

La preparación deberá distinguir al menos:

```text
PLAN APROBADO
+
CONTENIDO APROBADO
+
TARGETS PUBLICABLES
+
REGLAS PROMOCIONALES MATERIALIZABLES CUANDO APLIQUEN
+
GUARDAS ECONOMICAS RESUELTAS
+
GUARDAS OPERATIVAS RESUELTAS
+
AUTORIZACION APLICABLE
=
CAMPANA ELEGIBLE PARA INICIAR
```

La igualdad anterior es conceptual. No crea un estado físico ni un namespace técnico nuevo.

---

#### 9. Hipótesis experimental

Cuando una campaña incluya experimento deberá conservar una hipótesis explícita.

La hipótesis deberá expresar:

```text
SI se aplica una variante o tratamiento aprobado
A una unidad de asignacion definida
Bajo condiciones y guardas conocidas
ENTONCES se espera un cambio observable
```

La hipótesis:

- no se trata como hecho;
- no se convierte en causalidad por mera correlación;
- conserva supuestos materiales;
- distingue resultado esperado de observado;
- puede quedar invalidada o no concluyente;
- no autoriza por sí sola contacto, gasto, descuento, redención ni publicación.

La evaluación estadística, confianza e incrementalidad pertenecen a `AURA-DOM-008`.

---

#### 10. Identidad de experimento

Un experimento es un objeto distinto de la campaña.

Una campaña puede:

- no tener experimento;
- tener un experimento;
- tener varios experimentos secuenciales o separados cuando no se contaminen entre sí.

Cada experimento deberá conservar, cuando aplique:

- identidad estable;
- campaña y versión de origen;
- hipótesis;
- unidad de asignación;
- población o universo elegible;
- exclusiones;
- tratamiento o variantes;
- control o comparación;
- ventana temporal;
- condiciones de entrada;
- guardas de seguridad;
- criterio de pausa o detención;
- referencias de medición que después resolverá `AURA-DOM-008`;
- responsable y aprobaciones.

---

#### 11. Unidad de asignación

Todo experimento deberá declarar la unidad sobre la que se asigna una variante.

La unidad podrá corresponder, según el contrato futuro y la finalidad autorizada, a una referencia de:

- persona o cuenta;
- pedido o transacción;
- sede;
- canal;
- publicación;
- periodo o ventana temporal;
- otra unidad explícitamente aprobada.

AURA no crea la identidad maestra de esa unidad.

Si la unidad depende de cliente o consentimiento, la fuente propietaria deberá resolverlos. Si depende de pedido o venta, PULSO conserva la autoridad del hecho transaccional.

---

#### 12. Tratamiento, variante y control

Se conserva:

```text
VARIANTE CREATIVA
!=
PROMOCION
!=
REGLA DE PRECIO
```

El tratamiento puede variar, cuando esté autorizado:

- contenido;
- creatividad;
- mensaje;
- canal;
- horario;
- oferta comunicada;
- incentivo o promoción referenciada;
- secuencia de exposición.

El grupo de control o comparación deberá tener definición explícita.

No se considerará control válido simplemente a quienes no recibieron una publicación por error técnico, falta de permiso, dato ausente o fallo del proveedor.

---

#### 13. Exclusiones y contaminación experimental

El diseño deberá prevenir que una misma unidad quede sometida a variantes incompatibles cuando eso impida interpretar el resultado o produzca un efecto comercial incorrecto.

Deberán quedar explícitos, cuando apliquen:

- exclusiones entre experimentos simultáneos;
- incompatibilidades entre promociones;
- reglas de solapamiento;
- exposición previa relevante;
- campañas que comparten audiencia;
- restricciones por marca, sede o canal;
- condiciones que obligan a sacar una unidad del experimento.

No se inventa una política universal de exclusión; cada experimento deberá declarar la que corresponda.

---

#### 14. Experimentos y comunicaciones obligatorias

Un experimento no podrá usar como control la omisión de una comunicación que sea obligatoria por operación, seguridad, cumplimiento, servicio o compromiso contractual.

Por tanto:

```text
EXPERIMENTO DE MARKETING
!=
AUTORIZACION PARA RETENER COMUNICACION OBLIGATORIA
```

Las comunicaciones transaccionales u operativas conservan sus procesos y finalidades propias.

---

#### 15. Detención experimental

Una prueba podrá pausarse o detenerse ante evidencia suficiente de riesgo o inviabilidad.

Las condiciones de detención deberán poder incluir, según el caso:

- daño económico;
- agotamiento o indisponibilidad material;
- saturación de capacidad;
- error de precio o regla;
- afectación reputacional;
- incumplimiento de consentimiento o finalidad;
- falla de canal;
- conflicto de reglas;
- señal de fraude o abuso;
- decisión humana autorizada;
- imposibilidad de medir de forma confiable el experimento.

Pausar no borra asignaciones ni evidencia histórica.

---

#### 16. Promoción

Una promoción es una intención comercial gobernada que propone condiciones bajo las cuales podría existir un efecto sobre una operación o un beneficio.

Una promoción deberá conservar, cuando aplique:

- identidad estable;
- campaña de origen cuando exista;
- versión;
- objetivo;
- oferta;
- producto, categoría o beneficio referenciados;
- público o alcance;
- sede, canal o modalidad aplicables;
- vigencia;
- límites;
- exclusiones;
- compatibilidades o reglas de acumulación;
- referencia de presupuesto y guarda económica;
- referencias de disponibilidad y capacidad;
- regla propietaria que deberá materializar el efecto;
- autoridad de aprobación;
- correlación con publicaciones;
- criterio de retiro o pausa.

La promoción no contiene por sí sola autoridad transaccional.

---

#### 17. Intención promocional y regla transaccional

La separación obligatoria es:

```text
AURA
-> INTENCION PROMOCIONAL
```

```text
PULSO / PASS
-> REGLA EJECUTABLE SEGUN EL DOMINIO
```

```text
PULSO
-> VALIDACION Y EFECTO EN PEDIDO O VENTA
```

```text
NUMERA
-> GUARDA Y RESULTADO ECONOMICO
```

AURA no transforma una pieza, un copy, un código visible ni una campaña en una regla aplicable en caja.

---

#### 18. Cupón

Un cupón es un instrumento o referencia que permite identificar una regla o beneficio potencialmente aplicable bajo condiciones explícitas.

Se conserva:

```text
CODIGO DE CUPON
!=
AUTORIZACION DE DESCUENTO
```

```text
CUPON EMITIDO
!=
CUPON ELEGIBLE
!=
CUPON REDIMIDO
!=
EFECTO COMERCIAL APLICADO
```

El contrato de cupón deberá poder resolver, cuando aplique:

- promoción o beneficio de origen;
- regla y versión propietarias;
- vigencia;
- alcance de marca, sede, canal o modalidad;
- límites globales o por sujeto cuando existan;
- exclusiones;
- compatibilidad con otras reglas;
- si es reutilizable o de uso limitado;
- si requiere identidad o consentimiento;
- autoridad que valida la redención;
- correlación con el efecto comercial.

AURA no genera aquí códigos reales ni define su almacenamiento físico.

---

#### 19. Cupón público e individualizado

El dominio deberá distinguir entre un instrumento de difusión general y uno asociado a una identidad o elegibilidad particular.

Un cupón individualizado no autoriza a AURA a mantener un maestro paralelo de cliente.

Cuando requiera identidad, la correlación deberá resolverse con la fuente propietaria correspondiente y conservar finalidad y consentimiento aplicables.

Una captura de pantalla, texto copiado o código compartido no amplía la elegibilidad definida por la regla.

---

#### 20. Frontera con PASS

PASS conserva:

- identidad del cliente;
- consentimiento y preferencias;
- beneficio;
- recompensa;
- regla de fidelización;
- elegibilidad propia del programa;
- redención;
- ledger;
- reversión de fidelización.

AURA conserva únicamente la intención de marketing y la correlación de campaña.

Se preserva:

```text
CAMPAÑA AURA
!=
BENEFICIO PASS
```

Un beneficio puede existir sin campaña. Un beneficio por campaña continúa siendo un beneficio gobernado por PASS.

---

#### 21. Frontera con PULSO

PULSO conserva:

- pedido;
- venta;
- línea;
- precio aplicado;
- condición comercial;
- validación de aplicabilidad;
- descuento o efecto efectivamente aplicado;
- snapshot de la transacción;
- reversas comerciales correspondientes.

La secuencia conceptual permanece:

```text
AURA
-> INTENCION Y CORRELACION

PASS / FUENTE PROPIETARIA
-> BENEFICIO O REGLA CUANDO APLIQUE

PULSO
-> VALIDACION EN CONTEXTO
-> EFECTO APLICADO
```

Una promoción válida documentalmente puede resultar no aplicable a una transacción concreta.

---

#### 22. Frontera con NUMERA

NUMERA conserva la verdad económica.

Las guardas económicas de una campaña o promoción deberán consumir una decisión, regla, escenario o parámetro autorizado proveniente de NUMERA o de la autoridad económica que el contrato canónico designe.

AURA podrá conservar:

- referencia a presupuesto;
- referencia a método o escenario;
- límite autorizado;
- resultado de la evaluación;
- versión y vigencia;
- fecha de lectura;
- causa de bloqueo cuando corresponda.

AURA no recalcula silenciosamente el margen con fórmulas propias para otorgarse autorización.

---

#### 23. Guardas económicas

Una campaña o promoción deberá poder bloquear inicio, continuidad o ampliación cuando una guarda económica material no esté satisfecha.

Las guardas podrán cubrir, según corresponda:

- presupuesto disponible;
- límite de gasto;
- margen mínimo autorizado;
- exposición máxima a descuento o beneficio;
- costo esperado;
- pérdida máxima tolerada;
- rentabilidad o umbral económico;
- condición de financiación o subsidio;
- tope de redenciones o unidades financiadas.

Los valores concretos no se inventan en AURA-DOM-006. Deben provenir de una decisión económica autorizada y versionada.

---

#### 24. Evaluación económica

Toda evaluación económica material deberá poder reconstruir:

- fuente;
- método o regla aplicable;
- versión;
- fecha de evaluación;
- vigencia o frescura;
- campaña o promoción evaluada;
- resultado;
- responsable o autoridad;
- motivo cuando bloquea.

Un dato económico ausente, vencido, conflictivo o técnicamente inaccesible no se convierte en `PASS` por defecto.

---

#### 25. Guardas de disponibilidad e inventario

Cuando una campaña prometa producto, cantidad, disponibilidad o condición ligada a inventario, deberá consumir hechos autorizados de NEXO.

Se conserva:

```text
LECTURA DE INVENTARIO
!=
RESERVA
!=
PROMESA FUTURA
```

La campaña deberá poder detenerse o limitarse cuando:

- el producto deje de ser elegible;
- la disponibilidad caiga por debajo del umbral autorizado;
- exista inconsistencia de inventario relevante;
- la fuente esté desactualizada;
- la sede o canal ya no pueda cumplir la promesa.

AURA no ajusta inventario ni reserva stock por sí sola.

---

#### 26. Guardas de capacidad productiva

Cuando una campaña pueda aumentar demanda sobre producción, preparación o servicio, deberá consumir hechos o decisiones de capacidad desde FOGO y las fuentes operativas aplicables.

Se conserva:

```text
CAPACIDAD OBSERVADA
!=
CAPACIDAD COMPROMETIDA
```

La campaña no podrá asumir capacidad ilimitada porque una pieza esté aprobada o porque exista presupuesto disponible.

---

#### 27. Guardas de sede, canal y modalidad

La viabilidad deberá respetar las condiciones particulares del contexto.

Una promoción válida para:

- una sede;
- un canal;
- una modalidad;
- una ventana horaria;
- un producto;
- un tipo de cliente;

no se extiende automáticamente al resto.

Una campaña multicanal no elimina restricciones particulares de cada regla, beneficio o endpoint.

---

#### 28. Frescura de guardas

Toda guarda cuyo hecho pueda cambiar con el tiempo deberá declarar una política de frescura o condición de revalidación.

La lectura deberá poder distinguir:

```text
DATO VIGENTE
DATO VENCIDO
DATO AUSENTE
DATO CONFLICTIVO
FALLO TECNICO
```

Ninguno de los cuatro últimos estados se interpreta silenciosamente como guarda satisfecha.

Los nombres anteriores son categorías conceptuales y no crean estados físicos obligatorios.

---

#### 29. Inicio de campaña

Antes de iniciar una campaña deberán estar resueltas las dependencias materiales aplicables.

Como mínimo, cuando correspondan:

- versión de campaña aprobada;
- marca y claims vigentes;
- audiencia y exclusiones válidas;
- contenido aprobado;
- derechos y activos vigentes;
- targets publicables;
- consentimiento o finalidad aplicables;
- regla promocional materializable;
- beneficio PASS referenciado correctamente;
- validación económica disponible;
- disponibilidad suficiente;
- capacidad suficiente;
- autorizaciones requeridas;
- ausencia de bloqueo legal, reputacional u operativo conocido.

La falta de una condición material bloquea el inicio de esa versión.

---

#### 30. Cambios materiales durante ejecución

Se consideran materiales, cuando afecten la decisión aprobada:

- objetivo;
- hipótesis;
- audiencia;
- oferta;
- producto o beneficio;
- promoción o cupón;
- regla o versión transaccional;
- presupuesto;
- margen o guarda económica;
- periodo;
- canal;
- sede;
- tratamiento experimental;
- asignación o grupo de control;
- límite de redención;
- restricción de disponibilidad o capacidad.

Un cambio material obliga a revalidar las guardas y las aprobaciones afectadas antes de continuar.

---

#### 31. Pausa de campaña

Pausar una campaña significa detener nuevos efectos de marketing bajo su control hasta que exista una decisión de reanudación o cierre.

La pausa deberá conservar:

- motivo;
- actor o decisión que la origina;
- momento efectivo;
- componentes afectados;
- publicaciones que requieren retiro o suspensión;
- promociones o reglas que deben quedar no utilizables prospectivamente cuando corresponda;
- experimentos afectados;
- guardas que fallaron;
- condición necesaria para reanudar.

Pausa no borra historia ni revierte automáticamente efectos ya consumados.

---

#### 32. Cancelación y cierre

La cancelación interrumpe una iniciativa antes de completar su objetivo previsto.

El cierre termina el ciclo gobernado de una campaña y conserva su resultado.

En ambos casos deberán preservarse:

- motivo;
- versión final;
- publicaciones relacionadas;
- reglas o beneficios relacionados;
- efectos ya ocurridos;
- pendientes de retiro o reconciliación;
- aprendizajes y resultado, incluso cuando sean no concluyentes;
- referencias necesarias para `AURA-DOM-008`.

Cerrar una campaña no elimina piezas, publicaciones, ventas, redenciones ni evidencia histórica.

---

#### 33. Retiro de promoción y cupón

Retirar una promoción o cupón significa impedir nuevos usos conforme al contrato de la regla propietaria.

Se conserva:

```text
RETIRO PROSPECTIVO
!=
REVERSA DE EFECTO HISTORICO
```

Los efectos ya aplicados solo podrán revertirse mediante los procesos propietarios correspondientes.

AURA puede solicitar o correlacionar el retiro; no edita retrospectivamente ventas ni ledgers.

---

#### 34. Reversas y compensaciones

Las reversas permanecen distribuidas por dominio.

- PULSO gobierna reversas comerciales de pedido o venta conforme a sus contratos;
- PASS gobierna reversas de fidelización;
- NUMERA conserva el efecto económico resultante;
- AURA conserva la correlación con campaña y promoción.

Una cancelación de campaña no constituye por sí sola una orden de devolución, reembolso, compensación o reversión de puntos.

---

#### 35. Solapamiento de promociones

Dos promociones simultáneas no se acumulan por defecto.

Cada regla deberá declarar o referenciar la política aplicable de compatibilidad.

La evaluación deberá poder distinguir:

- compatibles;
- mutuamente excluyentes;
- priorizadas;
- condicionadas;
- no evaluables por falta de información.

AURA no resuelve un conflicto transaccional inventando una prioridad. PULSO y PASS aplican las reglas autorizadas de sus dominios.

---

#### 36. Límites de uso y exposición

Las promociones y cupones deberán poder conservar límites cuando estos formen parte de la regla autorizada.

Entre otros:

- límite total;
- límite por cliente o cuenta;
- límite por transacción;
- límite por sede;
- límite por canal;
- límite por periodo;
- límite presupuestal;
- límite de unidades o redenciones.

AURA conserva la intención y el límite referenciado. La aplicación y conteo efectivo pertenecen al sistema propietario de la regla o transacción.

---

#### 37. Audiencia, consentimiento y contacto

Definir una audiencia o un grupo experimental no autoriza todavía contacto real.

Se conserva:

```text
AUDIENCIA AURA
!=
IDENTIDAD PASS
!=
CONSENTIMIENTO
!=
CONTACTO AUTORIZADO
```

Antes de cualquier acción masiva o personalizada deberán satisfacerse las autorizaciones y finalidades del dominio propietario.

La protección de segmentos, clientes, exportaciones y acciones masivas permanece en `AURA-AUTH-003`.

---

#### 38. Relación con AURA-DOM-005

`AURA-DOM-005` gobierna cómo una versión aprobada se publica y reconcilia por canal.

`AURA-DOM-006` gobierna por qué, bajo qué experimento, promoción, cupón y guardas esa publicación forma parte de una campaña.

Se conserva:

```text
PUBLICACION CONFIRMADA
!=
PROMOCION APLICADA
```

```text
PROMOCION APLICADA
!=
VENTA ATRIBUIDA
```

Un fallo de publicación se resuelve por el contrato de `AURA-DOM-005`; no autoriza modificar una regla promocional.

---

#### 39. Relación con VPROC-0056

`VPROC-0056` permanece como proceso canónico del contenido y promociones asociado a AURA.

Se conservan sus estados canónicos de solicitud, revisión, creación, aprobación, programación, publicación y evaluación.

`AURA-DOM-006` no crea un proceso paralelo de contenido.

Una campaña puede coordinar múltiples instancias de contenido, pero no sustituye ninguna de ellas.

---

#### 40. Frontera con autorización

La definición de esta tarea no concede permisos.

`AURA-AUTH-001` y `AURA-AUTH-002` conservarán segregación de funciones sobre campañas, contenido y publicación.

`AURA-AUTH-003` conservará protección sobre:

- promociones;
- segmentos;
- datos de clientes;
- exportaciones;
- acciones masivas;
- leads cuando corresponda.

La existencia de una campaña aprobada no concede automáticamente autoridad para crear reglas, ejecutar descuentos o contactar audiencias.

---

#### 41. Frontera con integración

`AURA-INT-002` deberá materializar los contratos autorizados de lectura o eventos entre AURA y NEXO, PULSO, PASS, NUMERA, VISO y FOGO.

Esta tarea define qué necesita consumir, no la forma técnica del contrato.

No se definen aquí:

- nombres de tablas;
- RPC;
- endpoints;
- eventos físicos;
- topics;
- colas;
- payloads definitivos;
- webhooks;
- credenciales;
- políticas de retry.

---

#### 42. Frontera con AURA-DOM-008

`AURA-DOM-006` define:

- hipótesis;
- diseño experimental;
- variantes;
- control cuando aplique;
- asignación;
- guardas;
- correlaciones necesarias.

`AURA-DOM-008` definirá:

- métricas gobernadas;
- atribución;
- confianza;
- incrementalidad;
- comparación contra objetivo;
- aprendizaje cuantitativo;
- cierre analítico de campaña.

Por tanto:

```text
EXPERIMENTO EJECUTADO
!=
INCREMENTALIDAD DEMOSTRADA
```

---

#### 43. Frontera con AURA-DOM-007

`AURA-DOM-006` no convierte respuestas, formularios, mensajes o interacciones en leads, oportunidades, propuestas ni pedidos.

`AURA-DOM-007` conservará:

- oportunidad;
- lead;
- pipeline B2B;
- catering;
- eventos comerciales;
- transferencia explícita a operación.

Una campaña puede originar una interacción correlacionable, pero no crea un pedido ni un cliente por inferencia.

---

#### 44. Evidencia y auditoría

Cada decisión material deberá conservar evidencia suficiente para reconstruir:

- campaña y versión;
- experimento y variante cuando aplique;
- promoción o cupón;
- reglas propietarias referenciadas;
- evaluaciones económicas;
- evaluaciones de disponibilidad y capacidad;
- fuentes y frescura;
- aprobaciones;
- cambios materiales;
- decisión de inicio, pausa o cierre;
- publicaciones relacionadas;
- efectos comerciales y redenciones correlacionados cuando existan;
- divergencias o fallos detectados.

La evidencia no convierte a AURA en propietaria de los hechos correlacionados.

---

#### 45. Falla de una guarda

Cuando una guarda material falle, la respuesta deberá ser proporcional al alcance de la guarda.

Podrá implicar:

- bloquear inicio;
- pausar una promoción;
- retirar un target de publicación;
- limitar una sede o canal;
- detener un experimento;
- solicitar nueva aprobación;
- cerrar la campaña.

La acción concreta dependerá de la regla y autoridad aplicables.

No se permite continuar silenciosamente con el último valor conocido si dejó de ser válido.

---

#### 46. Guarda no verificable

Una guarda no verificable no equivale a una guarda satisfecha.

Se conserva:

```text
NO VERIFICABLE
!=
CUMPLE
```

La campaña podrá conservar estado documental y evidencia mientras espera resolución, pero no deberá materializar un efecto cuya seguridad o viabilidad dependa de una condición no demostrada.

---

#### 47. Modo degradado

Un modo degradado solo podrá conservar acciones que no dependan de la guarda perdida.

Ejemplo conceptual:

```text
NO HAY FUENTE CONFIABLE DE STOCK
-> PUEDE CONTINUAR CONTENIDO INSTITUCIONAL NO LIGADO A DISPONIBILIDAD
-> SE BLOQUEA PROMESA DE DISPONIBILIDAD O PROMOCION DEPENDIENTE DE STOCK
```

La degradación nunca amplía autoridad.

---

#### 48. Coherencia histórica

Cambios posteriores no reescriben la campaña histórica.

Debe preservarse la versión de:

- campaña;
- contenido;
- promoción;
- cupón;
- regla;
- beneficio;
- guarda económica;
- disponibilidad o capacidad observadas;
- aprobación;
- resultado aplicado.

La trazabilidad deberá permitir explicar una venta o redención histórica aun cuando la campaña actual ya haya cambiado o cerrado.

---

#### 49. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. campaña, experimento, promoción, cupón, beneficio, regla, redención y venta son objetos distintos;
2. AURA gobierna intención, campaña, hipótesis, experimento y correlación;
3. PASS conserva beneficio, fidelización, elegibilidad propia, redención y ledger;
4. PULSO conserva validación y efecto comercial en pedido o venta;
5. NUMERA conserva presupuesto, margen, costo, rentabilidad y resultado económico;
6. NEXO conserva producto, inventario y disponibilidad física;
7. FOGO conserva capacidad productiva;
8. `AURA-DOM-002` conserva planificación y `AURA-DOM-006` agrega ejecución gobernada;
9. una campaña no es una instancia de `VPROC-0056`;
10. un experimento es distinto de la campaña;
11. la unidad de asignación debe quedar explícita;
12. control no significa ausencia accidental de exposición;
13. experimentos no omiten comunicaciones obligatorias;
14. las pruebas pueden detenerse por daño económico, operacional, reputacional o de cumplimiento;
15. una promoción no ejecuta por sí sola un descuento;
16. un código de cupón no concede autoridad comercial;
17. un beneficio por campaña continúa bajo PASS;
18. PULSO debe validar aplicabilidad en la transacción;
19. las guardas económicas consumen autoridad de NUMERA;
20. las guardas de disponibilidad consumen hechos de NEXO;
21. las guardas de capacidad consumen hechos de FOGO;
22. dato ausente, vencido, conflictivo o fallo técnico no equivalen a guarda satisfecha;
23. una campaña no inicia con una dependencia material no resuelta;
24. cambios materiales obligan a revalidación proporcional;
25. pausa no borra evidencia ni revierte efectos históricos;
26. retiro prospectivo no equivale a reversa histórica;
27. promociones simultáneas no se acumulan por defecto;
28. audiencia no equivale a consentimiento ni contacto autorizado;
29. `AURA-DOM-005` conserva publicación por canal;
30. `AURA-DOM-008` conserva atribución, confianza e incrementalidad;
31. `AURA-DOM-007` conserva oportunidades y transferencia comercial;
32. autorización detallada permanece en `AURA-AUTH-*`;
33. integración física permanece en `AURA-INT-002` y tareas propietarias;
34. se crean y modifican cero requisitos de prueba;
35. no se crea ninguna instancia física;
36. la continuidad queda reservada exclusivamente a `AURA-DOM-007`.

---

#### 50. Handoff obligatorio a AURA-DOM-007

La siguiente tarea deberá recibir como entrada, cuando exista relación comercial:

- campaña y versión de origen;
- canal o publicación que originó la interacción;
- promoción o cupón relacionado cuando exista;
- audiencia o contexto comercial aplicable sin copiar identidades maestras;
- referencia de consentimiento o finalidad cuando sea necesaria;
- origen trazable;
- información suficiente para correlación comercial;
- regla explícita de que interacción, lead, cliente, oportunidad, propuesta y pedido permanecen objetos distintos.

`AURA-DOM-007` definirá oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación. No deberá redefinir campaña, promoción, cupón ni guardas de ejecución ya fijados aquí.

---

#### 51. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: las obligaciones de campaña, promoción, guardas económicas y operativas, ejecución transaccional, fidelización e integración ya están cubiertas por requisitos vigentes. Esta tarea materializa el contrato documental previsto por esas filas sin ampliar su alcance.

---

#### 52. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-003`, para campañas, promociones, presupuestos, guardas, fronteras PULSO/PASS/NUMERA y resultado;
- `TREQ-AURA-001`, para separación entre campaña, contenido, publicación, promoción y estados gobernados;
- `TREQ-PULSO-005` y `TREQ-PULSO-006`, para pedido, venta, descuentos, acciones sensibles, idempotencia, conciliación y preservación histórica;
- `TREQ-PASS-010` y `TREQ-PASS-011`, para identidad, consentimiento, fidelización, beneficios, redenciones y resultados distintos;
- `TREQ-NUMERA-004`, para presupuesto, margen, escenarios y rentabilidad con fuente y versión;
- `TREQ-INTEGRATION-019`, para contratos AURA con NEXO, PULSO, PASS, NUMERA, VISO y FOGO, cupones, idempotencia y conciliación.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación del registro.

---

#### 53. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó `docs:plan:build` contra el checkout del usuario desde esta entrega |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado con los scripts del checkout del usuario |
| REMOTA | PASS | se verificaron protocolo, contrato de entrega, manifest, continuidad, topología, archivo propietario, `CAP-SCOPE-014`, `H-CAP-SCOPE-014-016/017`, `INT-MKT-002`, `INT-MKT-003`, 04A aplicable, `package.json` y validadores vigentes |
| OPERATIVA | NOT_APPLICABLE | esta tarea define contratos; no crea campañas, promociones, cupones, contactos, ventas, redenciones, presupuestos ni reservas reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no existe instancia física propia ni autorización de implementación |

---

#### 54. Criterios de aceptación

La tarea queda sustantivamente completa cuando se cumple simultáneamente:

1. campaña, experimento, promoción, cupón, beneficio, regla, redención y venta permanecen separados;
2. la campaña consume sin redefinir el sobre de planificación de `AURA-DOM-002`;
3. cada campaña conserva versión y trazabilidad de sus dependencias;
4. una campaña no se declara ejecutable por tener únicamente título, fechas y piezas;
5. el experimento conserva hipótesis, unidad de asignación, variantes, control cuando aplique y guardas;
6. control no se confunde con falta accidental de exposición;
7. experimentos no retienen comunicaciones obligatorias;
8. promociones conservan condiciones, vigencia, límites, exclusiones y regla propietaria;
9. un cupón visible o conocido no equivale a descuento autorizado;
10. PASS conserva beneficios, reglas de fidelización, elegibilidad y ledger;
11. PULSO conserva validación y efecto aplicado en la transacción;
12. NUMERA conserva presupuesto, margen, costo y resultado económico;
13. NEXO conserva disponibilidad e inventario;
14. FOGO conserva capacidad productiva;
15. una guarda material ausente, vencida, conflictiva o no verificable no se considera satisfecha;
16. inicio, pausa, cancelación y cierre conservan decisión y evidencia;
17. cambios materiales revalidan las guardas afectadas;
18. pausa o cierre no reescriben ventas, redenciones ni evidencia histórica;
19. retiro prospectivo no se confunde con reversa;
20. promociones concurrentes requieren política de compatibilidad y no se acumulan por defecto;
21. audiencia no equivale a consentimiento ni contacto autorizado;
22. publicación permanece gobernada por `AURA-DOM-005`;
23. métricas, atribución, confianza e incrementalidad permanecen en `AURA-DOM-008`;
24. oportunidades, leads y transferencia a operación permanecen en `AURA-DOM-007`;
25. autorización e integración permanecen en sus tareas propietarias;
26. se crean y modifican cero requisitos de prueba;
27. no se crea ninguna instancia física;
28. la siguiente tarea reservada es exactamente `AURA-DOM-007`.

---

#### 55. Límites

Esta tarea no autoriza ni ejecuta:

- crear campañas reales;
- activar experimentos reales;
- asignar clientes reales a grupos;
- contactar audiencias;
- exportar segmentos;
- crear promociones reales;
- generar cupones reales;
- crear o modificar beneficios PASS;
- crear o modificar reglas de fidelización;
- aplicar descuentos;
- cambiar precios;
- crear pedidos o ventas;
- redimir beneficios;
- mover puntos;
- reservar inventario;
- bloquear stock;
- comprometer capacidad de producción;
- comprometer presupuesto;
- recalcular o publicar márgenes;
- crear tablas, migraciones, RLS, funciones, RPC, Storage, cron, colas o jobs;
- crear contratos físicos de integración;
- publicar contenido real;
- cambiar cuentas o credenciales;
- responder comentarios o reseñas;
- definir métricas finales, atribución, confianza o incrementalidad de `AURA-DOM-008`;
- definir oportunidades, pipeline B2B, catering o transferencia a operación de `AURA-DOM-007`;
- crear permisos ni matrices de autorización;
- modificar requisitos del registro 04A;
- adelantar `AURA-DOM-007`.

---

#### 56. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal`

**TAREA ACTUAL APROBADA**
`AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-007 — Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación`

### [ ] AURA-DOM-007 — Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación

### [ ] AURA-DOM-008 — Definir métricas, atribución, confianza, incrementalidad, aprendizaje y cierre de campaña

### [ ] AURA-DOM-009 — Definir reputación, comentarios públicos, clasificación, respuesta y escalamiento a servicio

### [ ] AURA-DOM-010 — Definir radar de oportunidades y recomendaciones comerciales explicables
