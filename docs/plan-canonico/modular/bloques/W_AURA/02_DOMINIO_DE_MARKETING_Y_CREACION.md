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

### [ ] AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana

### [ ] AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal

### [ ] AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas

### [ ] AURA-DOM-007 — Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación

### [ ] AURA-DOM-008 — Definir métricas, atribución, confianza, incrementalidad, aprendizaje y cierre de campaña

### [ ] AURA-DOM-009 — Definir reputación, comentarios públicos, clasificación, respuesta y escalamiento a servicio

### [ ] AURA-DOM-010 — Definir radar de oportunidades y recomendaciones comerciales explicables
