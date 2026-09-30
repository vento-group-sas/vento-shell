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

### [ ] AURA-DOM-002 — Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña

### [ ] AURA-DOM-003 — Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido

### [ ] AURA-DOM-004 — Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana

### [ ] AURA-DOM-005 — Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal

### [ ] AURA-DOM-006 — Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas

### [ ] AURA-DOM-007 — Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación

### [ ] AURA-DOM-008 — Definir métricas, atribución, confianza, incrementalidad, aprendizaje y cierre de campaña

### [ ] AURA-DOM-009 — Definir reputación, comentarios públicos, clasificación, respuesta y escalamiento a servicio

### [ ] AURA-DOM-010 — Definir radar de oportunidades y recomendaciones comerciales explicables
