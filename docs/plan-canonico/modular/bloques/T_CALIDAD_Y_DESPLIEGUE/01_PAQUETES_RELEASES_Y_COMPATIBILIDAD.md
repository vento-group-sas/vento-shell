### MINI-BLOQUE — PAQUETES RELEASES Y COMPATIBILIDAD

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **paquetes releases y compatibilidad** dentro de **T CALIDAD Y DESPLIEGUE**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `SHELL-CI-001` a `SHELL-CI-006` — 6 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `SHELL-CI-001`: Crear pruebas de paquetes compartidos
- `SHELL-CI-002`: Crear build independiente por paquete
- `SHELL-CI-003`: Crear releases versionados
- `SHELL-CI-004`: Crear changelog automático
- `SHELL-CI-005`: Crear matriz de compatibilidad
- `SHELL-CI-006`: Crear actualización de consumidores mediante PR
<!-- PLAN-SECTION-META:END -->

### ✅ SHELL-CI-001 — Crear pruebas de paquetes compartidos

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-039
**Tarea siguiente:** SHELL-CI-002 — Crear build independiente por paquete
**Tipo de tarea:** Habilitador global único — contrato documental de pruebas de packages compartidos
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que gobernará las **pruebas propias de los packages compartidos de Vento OS** antes de que una versión pueda participar en los gates de release, compatibilidad, actualización de consumidores o habilitación E5.

La regla central queda fijada así:

```text
PACKAGE COMPARTIDO
+ IDENTIDAD EXACTA DEL CANDIDATO
+ SUITE PROPIA APLICABLE
+ CASOS POSITIVOS Y NEGATIVOS
+ RESULTADO REPRODUCIBLE
+ EVIDENCIA VIGENTE
= PACKAGE TESTABLE POR EL GATE COMÚN
```

Y, de forma fail-closed:

```text
AUSENCIA, FALLO, OMISIÓN, STALE, TIMEOUT O PRUEBA DESHABILITADA
≠ PASS
```

Esta tarea no publica packages ni ejecuta todavía la instancia física global. Define el contrato que `SHELL-CI-001::GLOBAL` deberá materializar una sola vez y que todos los packages reutilizarán sin duplicar el habilitador.

#### 2. Resultado canónico

`SHELL-CI-001` establece un único contrato transversal para:

1. identificar el package y el snapshot exactos que se prueban;
2. descubrir y ejecutar la suite propia declarada por cada package elegible;
3. exigir casos positivos, negativos y de regresión aplicables;
4. impedir éxito con cero pruebas requeridas;
5. impedir éxito con pruebas obligatorias omitidas o deshabilitadas;
6. distinguir fallo de prueba, bloqueo de infraestructura, cancelación, timeout y evidencia obsoleta;
7. conservar evidencia atribuible a package, versión o candidato, commit y ejecución;
8. invalidar la evidencia cuando cambia una entrada material;
9. producir una salida consumible por los gates posteriores sin otorgar autoridad de merge, publicación o despliegue;
10. probar el propio gate contra falsos verdes y regresiones de su lógica;
11. reutilizar un único habilitador global para todas las familias de package aprobadas;
12. mantener separadas las responsabilidades de build, release, changelog, compatibilidad y actualización de consumidores.

#### 3. Base vinculante

La definición conserva las decisiones ya aprobadas de distribución y calidad:

- packages npm privados e inmutables producidos desde `vento-shell`;
- autoría e integración local mediante npm workspaces;
- versiones exactas y lockfile en consumidores;
- cuatro familias de package compartido vigentes;
- siete consumidores web vigentes y 28 relaciones package–consumidor gobernadas por el contrato de compatibilidad;
- dieciséis gates canónicos de actualización fail-closed;
- cuatro perfiles especializados de familia;
- evidencia ligada a la combinación exacta evaluada;
- invalidación de evidencia al cambiar commit, manifest, lockfile, versión, configuración, fixtures o expectativas;
- prohibición de convertir ausencia, `SKIPPED`, `NEUTRAL`, fallo, bloqueo, cancelación, timeout o resultado stale en `PASS`;
- separación entre pruebas propias del package y pruebas del consumidor.

#### 4. Topología de trabajo

La topología de `PHASE-03-T-CI-FOUNDATION` es `GLOBAL_ENABLE_ONCE`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-001
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-001::GLOBAL
→ materializa y certifica el habilitador una sola vez

PACKAGES
→ reutilizan el habilitador certificado
→ no crean otra implementación de CI001
```

La instancia física solo será elegible después de la aprobación del contrato global y deberá estar certificada antes de que un package pueda depender de este habilitador para superar una puerta `E5-GATE-008::<package_id>` aplicable.

#### 5. Universo de packages gobernado

El contrato inicial cubre exactamente las cuatro familias compartidas ya aprobadas:

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

La incorporación de otra familia no se deduce de que exista una carpeta, workspace o dependencia. Requiere identidad, ownership y contrato canónico aprobados antes de entrar al habilitador.

#### 6. Línea base física observada

En el corte actual de `vento-shell`:

- el workspace raíz declara `packages/*`;
- `@vento/os-context@0.1.0` es el único package compartido físicamente presente bajo ese workspace;
- `@vento/os-context` permanece `private: true` y exporta directamente su fuente TypeScript;
- su manifest actual no declara una entrada propia de pruebas;
- su directorio físico contiene `README.md`, `package.json` y `src/`, sin una suite de tests materializada junto al package;
- `@vento/contracts`, `@vento/supabase` y `@vento/ui-web` todavía no existen como packages físicos en el workspace observado;
- el `package.json` raíz contiene pruebas documentales del plan, pero no demuestra un habilitador global ya materializado para ejecutar pruebas propias de las cuatro familias de package.

Esta línea base demuestra la necesidad física futura del habilitador, pero no autoriza crear archivos durante el marcador global.

#### 7. Frontera con el resto del mini-bloque

`SHELL-CI-001` no absorbe las tareas siguientes:

| Responsabilidad                                     | Propietario    |
| --------------------------------------------------- | -------------- |
| build independiente del package                     | `SHELL-CI-002` |
| creación de releases versionados                    | `SHELL-CI-003` |
| changelog automático                                | `SHELL-CI-004` |
| matriz de compatibilidad package–consumidor         | `SHELL-CI-005` |
| actualización de consumidores mediante pull request | `SHELL-CI-006` |

Reglas de frontera:

1. CI001 prueba el package; CI002 demuestra que su build independiente es correcto;
2. CI001 no crea tags, releases ni artefactos publicados; CI003 gobierna esa identidad;
3. CI001 no genera changelog; CI004 lo gobierna;
4. CI001 no declara una combinación package–consumidor compatible; CI005 lo decide con su matriz;
5. CI001 no modifica consumidores ni abre PR; CI006 gobierna la adopción;
6. un `PASS` de CI001 es necesario para las pruebas propias, pero nunca suficiente para release, compatibilidad, merge, despliegue o adopción.

#### 8. Unidad de evaluación de pruebas propias

Cada ejecución de pruebas propias se atribuye a una unidad exacta compuesta, como mínimo, por:

```text
package_name
package_candidate_version
source_commit
package_manifest_identity
resolved_internal_dependencies
runtime_identity
test_contract_identity
fixture_identity
run_identity
```

Si una de estas dimensiones cambia de forma material, el resultado anterior deja de certificar la nueva unidad.

La versión puede corresponder todavía a un candidato previo a release. La identidad definitiva de release sigue perteneciendo a `SHELL-CI-003`.

#### 9. Contrato de declaración de pruebas por package

Todo package gobernado deberá declarar de forma verificable:

1. que posee pruebas propias aplicables;
2. cuál es la entrada ejecutable que activa esas pruebas;
3. qué categorías de prueba son obligatorias para su familia;
4. cuáles fixtures o datasets sintéticos utiliza;
5. qué condiciones producen éxito o fallo;
6. qué casos son positivos;
7. qué casos son negativos o adversariales;
8. qué regresiones de seguridad o contrato deben permanecer bloqueadas;
9. qué dependencias internas exactas forman parte del snapshot;
10. qué artefactos de evidencia produce la ejecución.

La declaración deberá ser legible por automatización y no podrá depender de una instrucción manual ambigua para decidir qué ejecutar.

#### 10. Clases mínimas de prueba

Toda familia deberá cubrir, cuando resulte aplicable a su contrato:

- **unitaria:** comportamiento propio aislado;
- **contractual:** formas, exports, schemas, catálogos, tipos o APIs públicas;
- **negativa/adversarial:** inputs inválidos, versiones incompatibles, estados prohibidos o intentos de bypass;
- **regresión:** comportamiento previamente protegido que no puede degradarse;
- **serialización/determinismo:** cuando el package emita artefactos o contratos serializables;
- **integración interna del package:** interacción entre módulos propios sin convertirla en prueba del consumidor;
- **seguridad:** cuando el package participe en autorización, datos privilegiados, contexto, credenciales o fronteras de confianza.

Una categoría solo podrá declararse no aplicable mediante una regla del perfil de familia o del contrato propietario. No podrá omitirse por ausencia de tiempo, configuración o implementación.

#### 11. Condición de suficiencia de la suite

Una suite propia es suficiente únicamente cuando:

```text
required_test_groups > 0
AND executed_required_test_groups = required_test_groups
AND failed_required_test_groups = 0
AND unresolved_required_skips = 0
AND evidence_is_current = true
```

No constituye suite válida:

- un comando que finaliza correctamente sin ejecutar pruebas requeridas;
- una suite con todos los casos filtrados;
- una suite que convierte errores de carga en cero tests;
- un runner configurado para ignorar el exit code de una prueba fallida;
- una suite que marca como opcional una categoría universal para evitar un fallo;
- una ejecución cuyo reporte no puede atribuirse al snapshot evaluado.

#### 12. Casos positivos obligatorios del habilitador

La instancia física deberá demostrar, como mínimo:

1. package elegible con suite completa y resultado correcto → resultado de pruebas propias válido;
2. dos ejecuciones sobre el mismo snapshot lógico → mismo conjunto de tests y misma clasificación de resultados;
3. package con pruebas de varias categorías → agregación completa sin perder la identidad de cada categoría;
4. package que usa fixtures deterministas → mismo oracle para el mismo fixture y contrato;
5. ejecución repetida después de un fallo ya corregido → nuevo resultado atribuible sin borrar la evidencia del intento fallido;
6. package con categoría condicional realmente no aplicable → exclusión justificada sin degradar categorías universales.

#### 13. Casos negativos obligatorios del habilitador

La instancia física deberá bloquear, como mínimo:

1. package sin declaración de pruebas;
2. package con entrada de pruebas inexistente o no ejecutable;
3. ejecución con cero tests requeridos;
4. fallo de una prueba requerida;
5. suite requerida deshabilitada;
6. filtro que excluye todos los casos obligatorios;
7. timeout;
8. cancelación;
9. error del runner o de carga de fixtures;
10. resultado de otro commit;
11. resultado de otra versión o candidato;
12. fixture cambiado sin nueva ejecución;
13. configuración de pruebas cambiada sin nueva ejecución;
14. dependencia interna relevante cambiada sin nueva ejecución;
15. evidencia corrupta o incompleta;
16. intento de marcar manualmente como correcto un resultado no ejecutado;
17. reintentos utilizados para ocultar intermitencia no resuelta;
18. package fuera del universo aprobado intentando usar el habilitador como certificación.

#### 14. Integración con `PKG-GATE-001`

`PKG-GATE-001 — identidad de release` tiene propiedad compartida entre CI001 y CI003.

CI001 deberá garantizar que toda evidencia de pruebas propias conserve identidad suficiente para vincularla después con la release exacta.

CI001 no declara por sí solo que tag, release, tarball e integridad coinciden. Ese cierre pertenece a CI003.

Por tanto:

```text
CI001
→ prueba candidato identificado
→ conserva lineage verificable

CI003
→ fija identidad inmutable de release
→ demuestra correspondencia con el candidato certificado
```

Una release que no pueda demostrar esa correspondencia deberá volver a ejecutar las pruebas aplicables sobre la identidad definitiva.

#### 15. Integración con `PKG-GATE-005`

`PKG-GATE-005 — pruebas propias del package` es el gate universal cuya automatización común pertenece principalmente a CI001 y al propietario del package.

Para obtener `PASS` deberán coexistir:

1. package y snapshot exactos;
2. suite declarada;
3. categorías requeridas ejecutadas;
4. cero fallos requeridos;
5. cero omisiones obligatorias;
6. resultados vigentes;
7. evidencia reproducible;
8. tipos y build aplicables disponibles desde sus tareas propietarias cuando el gate compuesto los requiera.

CI001 no sustituye el build de CI002. Cuando `PKG-GATE-005` exija además tipos o build, consume esas evidencias sin duplicar su implementación.

#### 16. Estados consumidos del gate

El habilitador respetará la semántica canónica de resultados ya aprobada:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` únicamente donde una regla condicional lo permita.

Para pruebas propias requeridas, solo `PASS` satisface el gate.

`SKIPPED`, `NEUTRAL`, ausencia de resultado y éxito parcial no constituyen estados de éxito y deberán normalizarse hacia un estado fail-closed aplicable.

#### 17. Determinismo y reproducibilidad

La ejecución deberá ser reproducible respecto de sus entradas declaradas.

Esto exige:

1. runtime identificado;
2. dependencias resueltas identificadas;
3. fixtures versionados o identificados por contenido;
4. orden o aleatoriedad controlados cuando puedan alterar el resultado;
5. reloj, zona horaria, locale, red y servicios externos controlados cuando afecten el oracle;
6. datos sintéticos deterministas cuando la prueba no requiera un ambiente real;
7. separación entre un test determinista y una validación remota que por naturaleza depende de un servicio externo;
8. conservación del contexto suficiente para reproducir el fallo.

La reproducibilidad del **build independiente del package** permanece en CI002. CI001 únicamente exige que la ejecución de pruebas no produzca un verde diferente por entradas ocultas o no identificadas.

#### 18. Pruebas que requieren servicios o infraestructura

Una prueba propia no dependerá silenciosamente de producción.

Cuando requiera infraestructura:

- el ambiente deberá ser explícito;
- la dependencia deberá estar disponible antes de ejecutar;
- la indisponibilidad produce `BLOCKED`, no `PASS`;
- los datos de prueba no podrán ser datos operativos inventados en producción;
- credenciales y secretos no formarán parte de fixtures ni reportes;
- un mock no sustituirá una prueba de integración real cuando el contrato propietario exija el servicio real;
- una prueba remota no reemplazará las unitarias o contractuales que deban ejecutarse localmente.

#### 19. Política de fixtures

Los fixtures reutilizados por el habilitador deberán ser:

- mínimos para el comportamiento protegido;
- deterministas;
- versionados o identificados por contenido;
- sintéticos cuando contengan identidades o datos sensibles;
- libres de secretos;
- atribuibles al contrato que prueban;
- invalidados cuando cambie el comportamiento esperado;
- capaces de representar casos válidos e inválidos.

Un snapshot visual, JSON, schema o dataset de prueba no podrá actualizarse automáticamente para convertir un fallo en éxito sin revisión del cambio esperado.

#### 20. Intermitencia y reintentos

La intermitencia es un defecto del gate o de la prueba, no una variante de éxito.

Reglas:

1. cada intento conserva identidad propia;
2. un reintento no elimina el intento fallido;
3. una ejecución correcta posterior no convierte automáticamente una prueba intermitente en estable;
4. si resultados equivalentes alternan entre éxito y fallo sin cambio de entrada, la prueba permanece bloqueada hasta resolver la causa;
5. los reintentos podrán usarse para diagnóstico o para confirmar la corrección, no para seleccionar el único verde;
6. el gate deberá distinguir fallo funcional de infraestructura cuando la evidencia permita hacerlo.

#### 21. Evidencia mínima por ejecución

La evidencia de pruebas propias deberá conservar, como mínimo:

| Campo lógico            | Obligación                                       |
| ----------------------- | ------------------------------------------------ |
| package                 | identidad canónica                               |
| candidato o versión     | identidad exacta evaluada                        |
| source commit           | commit que produjo el snapshot                   |
| manifest identity       | identidad del manifest del package               |
| internal dependency set | dependencias internas exactas aplicables         |
| runtime                 | runtime efectivo de ejecución                    |
| test contract           | versión o identidad de la declaración de pruebas |
| fixture identities      | fixtures utilizados                              |
| required groups         | categorías exigidas                              |
| executed groups         | categorías realmente ejecutadas                  |
| test counts             | totales, correctos, fallidos y omitidos          |
| run identity            | identidad única de la ejecución                  |
| start/end               | ventana de ejecución                             |
| outcome                 | resultado final                                  |
| artifacts               | reportes o logs reproducibles permitidos         |
| invalidation reason     | causa cuando el resultado queda stale            |

La evidencia no incluirá secretos, tokens, payloads sensibles ni datos personales innecesarios.

#### 22. Vigencia e invalidación

El resultado de CI001 queda `STALE` y exige nueva ejecución cuando cambia una entrada que pueda alterar la suite o su oracle, incluyendo:

- source commit;
- manifest del package;
- candidato o versión;
- dependencia interna relevante;
- runtime soportado;
- configuración de pruebas;
- fixture;
- snapshot esperado;
- schema o catálogo consumido;
- contrato propietario;
- código del runner global;
- criterio de éxito del gate.

Cambios puramente descriptivos que no alteren el artefacto, suite, oracle ni ambiente podrán conservar la evidencia únicamente si la identidad material evaluada permanece demostrablemente igual.

#### 23. Perfil `@vento/contracts`

Las pruebas propias deberán cubrir, según las superficies materializadas:

- exports públicos;
- schemas;
- catálogos cerrados;
- tipos derivados;
- validadores;
- diagnósticos compartidos;
- serialización determinista cuando aplique;
- aceptación de casos válidos;
- rechazo de casos inválidos y versiones incompatibles;
- prohibición de relajar tipos o usar casts para ocultar incompatibilidad.

Las pruebas del consumidor y la compatibilidad entre versiones permanecen en CI005/CI006 según corresponda.

#### 24. Perfil `@vento/os-context`

Las pruebas propias deberán cubrir, según el contrato materializado:

- validación de contexto y decisiones;
- fronteras server/client;
- inputs confiables frente a valores manipulados;
- casos permitidos y denegados;
- fail-closed ante contrato inválido o backend no disponible;
- separación entre contexto real, simulación y compatibilidad legacy;
- no ampliación de autoridad por fallback, booleanos legacy o contexto incompleto;
- razones y proyecciones seguras conforme a los contratos vigentes;
- frescura, invalidación y cache cuando sus tareas propietarias estén materializadas.

La matriz contra consumidores pertenece a CI005 y la ejecución dentro de cada consumidor a CI006.

#### 25. Perfil `@vento/supabase`

Las pruebas propias deberán cubrir, según las superficies materializadas:

- factories y clientes compartidos;
- tipos generados;
- wrappers RPC;
- parámetros, resultados y errores contractuales;
- ausencia de acceso privilegiado o bypass introducido por el SDK;
- coherencia con el contrato de schema y tipos aplicable;
- separación entre SDK y cambios físicos de base de datos.

Una prueba del package no autoriza ni ejecuta DDL, DML, backfill, RLS, trigger, función, Storage, Realtime, Edge Function, secreto o configuración. Cualquier cambio de Supabase continúa perteneciendo a `vento-shell` y a su tarea física propietaria.

#### 26. Perfil `@vento/ui-web`

Las pruebas propias deberán cubrir, según las superficies materializadas:

- unidades y componentes;
- render esperado;
- estados interactivos;
- contratos de props y eventos;
- accesibilidad automatizable;
- comportamiento de hidratación cuando el package lo requiera;
- contrato CSS y tokens compartidos aplicables;
- regresión visual cuando cambien apariencia, estructura, layout, marca o estados;
- ausencia de imports internos no públicos y dependencias locales no declaradas.

La integración completa en cada aplicación consumidora permanece en CI005/CI006 y no se certifica por una prueba aislada del package.

#### 27. Relación con CI002 — build independiente

CI002 deberá producir la evidencia de build independiente que CI001 puede consumir como parte de `PKG-GATE-005` cuando corresponda.

CI001 no:

- define el formato final del artefacto compilado;
- decide output de build;
- decide declarations;
- certifica que un package es publicable;
- duplica el build como una segunda implementación.

Si las pruebas necesitan código compilado, usarán el artefacto exacto que CI002 certifique para ese snapshot.

#### 28. Relación con CI003 — release versionada

CI003 fija la identidad publicada e inmutable.

CI001 conserva lineage suficiente para responder:

```text
¿las pruebas que se presentan como evidencia corresponden exactamente al contenido que CI003 pretende publicar o publicó?
```

Si la respuesta no puede demostrarse, la evidencia queda inválida.

#### 29. Relación con CI004 — changelog

CI004 gobierna generación y consistencia del changelog.

CI001 podrá producir resultados de prueba que CI004 o el release consuman como evidencia, pero no decide la clasificación del cambio ni redacta el changelog.

#### 30. Relación con CI005 — matriz de compatibilidad

CI005 certifica combinaciones package–consumidor.

El `PASS` de pruebas propias de CI001 es una entrada necesaria para esa matriz, pero no sustituye:

- instalación del consumidor;
- typecheck del consumidor;
- build del consumidor;
- pruebas del consumidor;
- perfil especializado completo;
- bandas soportadas;
- evidencia por relación.

#### 31. Relación con CI006 — actualización de consumidores

CI006 aplica los gates a una propuesta concreta en un consumidor.

CI001 entrega a CI006 únicamente evidencia vigente de las pruebas propias del package. CI006 deberá rechazarla si no corresponde al package, versión/candidato, commit y conjunto exactos que forman parte de la propuesta.

#### 32. Gate del propio habilitador global

`SHELL-CI-001::GLOBAL` no se certificará por existir físicamente.

La implementación deberá probarse a sí misma contra, como mínimo, estas familias de regresión:

1. falso verde con cero tests;
2. falso verde con runner inexistente;
3. falso verde con exit code ignorado;
4. falso verde con test requerido deshabilitado;
5. stale tratado como vigente;
6. resultado de otro commit reutilizado;
7. fixture cambiado sin invalidación;
8. intermitencia ocultada mediante reintento;
9. `NOT_APPLICABLE` aplicado a una obligación universal;
10. package no gobernado aceptado como certificado;
11. evidencia incompleta aceptada;
12. fallo de infraestructura convertido en éxito;
13. pérdida de historial de intentos fallidos;
14. divergencia entre resultado legible por máquina y exit outcome del gate;
15. duplicación de una segunda implementación del habilitador por package.

La ausencia de cualquiera de estas defensas aplicables bloquea la certificación global.

#### 33. Criterios de materialización de `SHELL-CI-001::GLOBAL`

La instancia física podrá declararse materializada únicamente cuando:

1. exista una implementación única en el repositorio propietario;
2. pueda identificar las cuatro familias vigentes sin aceptar familias no aprobadas por inferencia;
3. permita registrar o descubrir la declaración de pruebas de cada package materializado;
4. ejecute y agregue resultados sin ocultar fallos;
5. produzca evidencia atribuible y machine-readable;
6. aplique invalidación de evidencia;
7. distinga los estados fail-closed canónicos;
8. detecte cero tests y omisiones obligatorias;
9. preserve intentos fallidos y reintentos;
10. supere sus casos positivos y negativos;
11. demuestre determinismo para entradas deterministas;
12. no contenga secretos ni datos sensibles en evidencia;
13. no publique packages ni modifique consumidores;
14. no sustituya CI002..CI006;
15. demuestre rollback seguro del habilitador;
16. quede asociado a una versión o identidad de implementación y commit reproducibles.

#### 34. Rollback del habilitador global

El rollback de CI001 nunca elimina la obligación de probar packages.

Reglas:

1. si existe una versión anterior certificada del habilitador, el rollback puede restituirla;
2. la versión restituida deberá seguir comprendiendo el contrato del package evaluado;
3. evidencia producida por una versión incompatible del habilitador no se reutiliza automáticamente;
4. si no existe una versión anterior certificada, el sistema vuelve a estado **bloqueado para habilitación de packages**, no a un modo sin pruebas;
5. rollback no permite ignorar fallos conocidos ni convertir suites incompatibles en correctas;
6. el evento de rollback conserva causa, identidad de origen/destino y evidencia posterior de que el gate volvió a operar.

#### 35. Cierre de la instancia global

El marcador global queda contractualmente definido con esta tarea.

La futura instancia `SHELL-CI-001::GLOBAL` solo podrá cerrarse cuando exista evidencia real y vigente de:

- automatización del habilitador;
- casos positivos;
- casos negativos;
- regresión del propio gate;
- reproducibilidad de la ejecución de pruebas;
- integración con la identidad del package;
- fail-closed ante omisiones y fallos;
- rollback del habilitador;
- ausencia de implementaciones duplicadas por package.

La evidencia de CI002 podrá complementar el build reproducible cuando ese gate se materialice, pero no es sustituida ni anticipada por CI001.

#### 36. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** el registro vigente ya contiene obligaciones suficientes para pruebas propias de packages compartidos, compatibilidad, evidencia, gates de actualización y control de regresiones. Esta tarea materializa el contrato de ejecución correspondiente a su responsabilidad sin crear una obligación nueva ni alterar una fila histórica.

#### 37. Cobertura de prueba vigente reutilizada

La cobertura existente se conserva sin modificación:

- `TREQ-SHELL-005` protege comandos reproducibles y evita falsos verdes de tooling;
- `TREQ-SHELL-006` exige pruebas propias y compatibilidad antes de publicar o adoptar versiones compartidas;
- `TREQ-SHELL-008` exige declaración y evidencia reproducible de requisitos afectados por package y PR;
- `TREQ-SHELL-038` vincula CI001 con la evidencia necesaria para deprecaciones de superficies y líneas estables;
- `TREQ-SHELL-039` vincula CI001 con la certificación previa al retiro y fin de soporte.

Estas referencias son trazabilidad de cobertura vigente y no representan creación, modificación, diferimiento, descarte u obsolescencia del registro.

#### 38. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                      |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| BUILD     | NOT_EXECUTED   | El marcador global no materializa el habilitador ni ejecuta build físico.                                                      |
| LOCAL     | PASS           | El contrato documental define alcance, gates, perfiles, fallos seguros, evidencia, rollback y continuidad sin cambios físicos. |
| REMOTA    | NOT_EXECUTED   | No se ejecutó la futura instancia global contra CI remoto ni packages publicados.                                              |
| OPERATIVA | NOT_APPLICABLE | No existe operación productiva autorizada en este marcador documental.                                                         |
| FÍSICA    | NOT_APPLICABLE | La materialización pertenece a `SHELL-CI-001::GLOBAL` después de la aprobación del contrato.                                   |

#### 39. Criterios de aceptación

`SHELL-CI-001` queda documentalmente completa cuando:

- identifica la topología `GLOBAL_ENABLE_ONCE` y la instancia `SHELL-CI-001::GLOBAL`;
- conserva exactamente las cuatro familias de packages aprobadas;
- define la unidad exacta de evaluación y sus dimensiones de identidad;
- define una declaración automatizable de suite propia por package;
- exige pruebas positivas, negativas y de regresión;
- bloquea cero tests, skips obligatorios, fallos, timeouts, cancelaciones y evidencia stale;
- conserva los nueve estados de gate ya aprobados sin crear un estado permisivo alterno;
- reconcilia CI001 con `PKG-GATE-001` sin absorber release;
- reconcilia CI001 con `PKG-GATE-005` sin absorber el build independiente de CI002;
- define perfiles propios para contracts, os-context, supabase y ui-web conforme a sus fronteras vigentes;
- define evidencia mínima, invalidación, determinismo, fixtures e intermitencia;
- define al menos quince regresiones del habilitador global;
- define dieciséis condiciones de materialización y rollback fail-closed;
- no publica packages ni modifica consumidores, CI, Supabase o datos;
- no crea ni modifica requisitos de prueba;
- entrega a CI002 una frontera clara: pruebas propias definidas, build independiente todavía reservado.

#### 40. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-001::GLOBAL` durante el marcador;
- crea archivos de tests, workflows, runners o configuración de CI;
- crea una ruta o nombre de script no aprobado por el estado físico actual;
- crea packages que todavía no existen;
- transforma `@vento/os-context@0.1.0` en release estable;
- ejecuta pruebas de consumidor;
- ejecuta build independiente por package;
- publica packages, tags o releases;
- genera changelog;
- certifica matrices de compatibilidad;
- abre o modifica pull requests de consumidores;
- habilita auto-merge o auto-deploy;
- ejecuta cambios de Supabase;
- modifica requisitos del registro 04A;
- avanza a CI002 sin instrucción posterior del usuario.

#### 41. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-039`

**TAREA ACTUAL APROBADA**
`SHELL-CI-001 — Crear pruebas de paquetes compartidos`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-002 — Crear build independiente por paquete`


### ✅ SHELL-CI-002 — Crear build independiente por paquete

**Estado:** APROBADA
**Tarea anterior:** SHELL-CI-001 — Crear pruebas de paquetes compartidos
**Tarea siguiente:** SHELL-CI-003 — Crear releases versionados
**Tipo de tarea:** Habilitador global único — contrato documental de build independiente y artefactos publicables de packages compartidos
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que gobernará el **build independiente de cada package compartido de Vento OS**, de modo que cada familia pueda producir desde un snapshot exacto un artefacto npm instalable, verificable y reproducible sin depender del build de una aplicación consumidora ni del build de la aplicación raíz de `vento-shell`.

La regla vinculante queda fijada así:

```text
PACKAGE GOBERNADO
+ SNAPSHOT EXACTO
+ TOOLCHAIN IDENTIFICADO
+ DEPENDENCIAS RESUELTAS
+ BUILD LIMPIO Y ACOTADO AL PACKAGE
+ EXPORTS Y DECLARATIONS RESOLUBLES
+ ARTEFACTO EMPAQUETABLE
+ REPRODUCIBILIDAD DEMOSTRADA
= BUILD DE PACKAGE ELEGIBLE
```

Y, de forma fail-closed:

```text
FUENTE TYPESCRIPT EXPUESTA COMO ARTEFACTO FINAL
O OUTPUT STALE
O EXPORT ROTO
O DECLARATION AUSENTE
O DEPENDENCIA LOCAL NO RESUELTA
O BUILD NO REPRODUCIBLE
≠ PASS
```

Esta tarea no ejecuta todavía la instancia física global. Define el contrato que `SHELL-CI-002::GLOBAL` deberá materializar una sola vez y que todos los packages reutilizarán sin duplicar el habilitador.

#### 2. Resultado canónico

`SHELL-CI-002` establece un único contrato transversal para:

1. identificar el package y el snapshot exactos que se construyen;
2. ejecutar un build limpio y dirigido a un solo package;
3. impedir que el build del package dependa del build de Next.js u otra aplicación consumidora;
4. resolver dependencias internas declaradas sin introducir dependencias implícitas;
5. producir runtime, declarations y assets únicamente cuando formen parte de la superficie pública aprobada;
6. comprobar que `exports`, `main`, `types` y subpaths declarados resuelven dentro del artefacto construido;
7. impedir que una release estable apunte directamente a fuente TypeScript no construida;
8. comprobar que el artefacto puede empaquetarse como package npm sin referencias locales inválidas;
9. capturar identidad, contenido e integridad del candidato de build;
10. demostrar reproducibilidad bajo el mismo snapshot y toolchain;
11. ejecutar contract checks sobre el artefacto construido sin absorber las pruebas funcionales propias de CI001;
12. producir evidencia consumible por CI003 y CI005 sin declarar por sí solo una release ni una combinación compatible;
13. probar el propio habilitador contra falsos verdes de build;
14. conservar rollback seguro del habilitador global;
15. mantener una sola implementación transversal para las cuatro familias aprobadas.

#### 3. Base vinculante

La definición conserva las decisiones aprobadas de distribución, versionado y gates:

- packages npm privados e inmutables producidos desde `vento-shell`;
- npm workspaces como mecanismo de autoría e integración local, no como canal de distribución entre repositorios;
- registry privado compatible con npm como canal ordinario de distribución;
- `.tgz` como artefacto verificable y reproducible, no como mecanismo manual ordinario de instalación;
- versiones independientes por package;
- cuatro familias de package compartido vigentes;
- build, declarations y exports publicables como precondición de distribución;
- snapshots de API antes y después cuando el cambio afecte superficie pública;
- correspondencia posterior entre package, versión, manifest, release, commit y artefacto;
- dieciséis gates canónicos de actualización fail-closed;
- matriz de compatibilidad separada del build propio;
- publicación y adopción separadas del acto de construir.

#### 4. Topología de trabajo

La topología de `PHASE-03-T-CI-FOUNDATION` es `GLOBAL_ENABLE_ONCE`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-002
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-002::GLOBAL
→ materializa y certifica el habilitador una sola vez

PACKAGES
→ declaran su perfil de build
→ reutilizan el habilitador certificado
→ no crean otra implementación de CI002
```

La instancia global deberá quedar certificada antes de que cualquier package pueda depender de este habilitador para superar una puerta `E5-GATE-008` de su paquete de implementación aplicable.

#### 5. Universo de packages gobernado

El contrato inicial cubre exactamente las cuatro familias compartidas aprobadas:

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

La existencia futura de otra carpeta, workspace o package no la incorpora automáticamente. Toda nueva familia deberá contar primero con identidad y ownership canónicos.

#### 6. Línea base física observada

En el corte actual de `vento-shell`:

- la raíz declara `packages/*` como workspace;
- la raíz declara Node `24.19.0` y npm `11.17.0` como toolchain actual del repositorio;
- bajo `packages/` solo existe físicamente `@vento/os-context`;
- `@vento/os-context` permanece en `0.1.0` y `private: true`;
- `@vento/os-context` declara `type: module`;
- `main`, `types` y `exports["."]` de `@vento/os-context` apuntan directamente a `src/index.ts`;
- su manifest no declara un script de build propio;
- su peer `@supabase/supabase-js` permanece como `>=2.90.0`, sin el límite superior `<3` aprobado para la futura línea estable;
- `@vento/contracts`, `@vento/supabase` y `@vento/ui-web` todavía no existen como packages físicos en el workspace observado;
- el `package.json` raíz contiene build de la aplicación y validadores documentales, pero no demuestra un habilitador global de build independiente para packages compartidos.

Por tanto, no existe evidencia física de un build independiente ya materializado para ninguna de las cuatro familias.

#### 7. Definición de build independiente

Un build será **independiente por package** únicamente si cumple simultáneamente:

1. su unidad objetivo es un package canónico específico;
2. parte de un snapshot de fuente y dependencias identificable;
3. no necesita ejecutar el build de la aplicación raíz de `vento-shell`;
4. no necesita ejecutar el build de un consumidor;
5. no necesita construir packages no relacionados;
6. cuando dependa de otro package interno, consume una identidad exacta y respeta el orden del grafo declarado;
7. escribe únicamente outputs pertenecientes al package objetivo;
8. puede repetirse desde un estado limpio sin reutilizar outputs anteriores;
9. produce un artefacto cuya superficie pública puede validarse sin acceder a rutas privadas del repositorio;
10. no necesita credenciales productivas, conexión a Supabase desplegado ni datos operativos para compilar.

Independencia no significa ausencia de dependencias. Significa que las dependencias son explícitas, cerradas y reproducibles y que el build no obtiene éxito accidental por estado compartido no declarado.

#### 8. Unidad exacta de evaluación

Cada ejecución se atribuirá, como mínimo, a esta identidad lógica:

```text
package_name
package_candidate_version
source_commit
package_manifest_hash
lockfile_hash
toolchain_identity
runtime_identity
resolved_internal_dependency_set
public_surface_identity
build_contract_identity
run_identity
```

Cambiar una dimensión material invalida la evidencia anterior para el nuevo candidato.

#### 9. Entradas obligatorias del build

Todo package materializado deberá declarar de forma machine-readable:

1. identidad canónica del package;
2. versión candidata o identidad pre-release evaluada;
3. entrypoints públicos aprobados;
4. formato o formatos de módulo aprobados por el package propietario;
5. outputs runtime aplicables;
6. declarations TypeScript aplicables;
7. assets públicos aplicables;
8. peers externos y sus bandas permitidas;
9. dependencias internas exactas;
10. runtime soportado cuando sea relevante;
11. inputs generados que formen parte del snapshot;
12. exclusiones de contenido del artefacto;
13. contract checks que deben aplicarse al resultado construido.

El build no inferirá silenciosamente entrypoints, peers o assets a partir de archivos encontrados en el árbol.

#### 10. Salidas obligatorias del build

Cuando apliquen al package, el artefacto construido deberá contener:

- JavaScript ejecutable para cada entrypoint runtime público;
- declarations TypeScript resolubles para cada entrypoint público tipado;
- manifests y metadata necesarios para instalación;
- assets públicos explícitamente aprobados;
- mapas u otros artefactos auxiliares solo cuando estén declarados y no filtren rutas o datos sensibles;
- metadata de integridad suficiente para demostrar qué archivos componen el candidato.

Una salida que solo exponga archivos fuente TypeScript como sustituto del build final no satisface esta tarea para una release estable.

#### 11. Contrato de superficie pública construida

Para cada entrypoint público:

1. la ruta declarada deberá existir dentro del artefacto;
2. ningún export público podrá resolver a un archivo ausente;
3. ningún export público podrá escapar hacia una ruta privada del repositorio;
4. ningún export público podrá depender de una ruta absoluta local;
5. las declarations deberán describir la misma superficie pública expuesta por runtime cuando ambas apliquen;
6. subpaths privados no se volverán públicos por inclusión accidental en el artefacto;
7. `main`, `types` y `exports` deberán ser coherentes entre sí cuando coexistan;
8. la superficie construida deberá poder compararse con el snapshot contractual del package.

#### 12. Reglas sobre source y output

El artefacto final deberá separar fuente de distribución:

- source forma parte del repositorio de autoría;
- output forma parte del candidato distribuible;
- un consumidor no deberá necesitar conocer la estructura privada de source;
- imports públicos no deberán apuntar a `src/` por conveniencia;
- outputs anteriores deberán eliminarse o aislarse antes de una nueva ejecución;
- archivos no generados por el snapshot actual no podrán sobrevivir y producir un falso verde.

El package podrá incluir source únicamente cuando su contrato propietario lo declare como contenido distribuible adicional; esa inclusión no sustituirá los outputs runtime y declarations requeridos.

#### 13. Dependencias internas

Cuando un package dependa de otro package compartido:

1. la dependencia deberá estar declarada expresamente;
2. la versión o candidato consumido deberá ser identificable;
3. el build respetará el orden topológico del grafo;
4. un package no leerá archivos privados del source de otro package;
5. no se admitirán dependencias circulares no resueltas;
6. una release estable no podrá quedar ligada a una prerelease interna no autorizada;
7. el conjunto resuelto deberá formar parte de la evidencia del build;
8. cambiar una dependencia interna material invalidará el resultado anterior.

#### 14. Dependencias externas y peers

El build deberá distinguir entre dependencia runtime, dependencia de desarrollo y peer dependency.

Reglas:

1. los peers no se convertirán silenciosamente en código embebido dentro del artefacto si su contrato exige resolución por el consumidor;
2. una banda externa no podrá exceder el soporte canónico aprobado;
3. una dependencia usada en runtime deberá estar declarada en la categoría contractual correcta;
4. una dependencia exclusiva del build no deberá aparecer como requisito runtime del consumidor;
5. dependencias locales por ruta, Git URL o referencias no publicables no podrán escapar al artefacto candidato;
6. el build bloqueará un candidato estable cuando su peer declarado contradiga una banda canónica vinculante.

Para la línea futura estable de `@vento/os-context`, el peer de Supabase JS deberá quedar acotado por debajo de la major `3`; el rango actual abierto no puede considerarse elegible para publicación estable.

#### 15. Perfil de `@vento/contracts`

El build de `@vento/contracts` deberá:

- permanecer libre de dependencias de framework no aprobadas;
- construir y publicar únicamente entrypoints contractuales aprobados;
- conservar declarations completas y resolubles;
- conservar runtime únicamente para schemas, catálogos u otros símbolos que realmente existan en ejecución;
- detectar imports de Next.js, React, React DOM o Supabase cuando no pertenezcan al contrato propietario;
- producir una superficie comparables mediante snapshot de API;
- impedir que tipos privados o archivos internos se vuelvan exports públicos por accidente.

#### 16. Perfil de `@vento/os-context`

El build de `@vento/os-context` deberá:

- conservar la separación entre entrypoints server, client y cualquier subpath aprobado por sus tareas propietarias;
- evitar que el artefacto client arrastre APIs server, secretos o dependencias no permitidas;
- emitir declarations coherentes con los contratos de contexto y autorización vigentes;
- tratar `@supabase/supabase-js` según su condición de peer aprobada;
- impedir que el package estable siga apuntando directamente a `src/index.ts`;
- impedir bundling que mezcle fronteras server/client;
- permitir contract checks sobre cada entrypoint público construido.

#### 17. Perfil de `@vento/supabase`

El build de `@vento/supabase` deberá:

- tratar tipos generados y wrappers aprobados como inputs versionados del snapshot;
- no conectarse a un proyecto Supabase desplegado para completar la compilación;
- no ejecutar migraciones, DDL, RLS, RPC ni cambios de configuración;
- no incluir service-role, secretos, tokens o valores de ambiente en outputs;
- conservar declarations de factories, wrappers y tipos públicos;
- bloquear imports que dependan de archivos generados fuera del snapshot declarado;
- separar claramente el build del SDK de cualquier cambio físico de base de datos.

#### 18. Perfil de `@vento/ui-web`

El build de `@vento/ui-web` deberá:

- conservar React y otros peers aprobados fuera del bundle cuando el contrato los declare peers;
- producir declarations de props y APIs públicas;
- incluir CSS, tokens, fuentes referenciadas o assets solo cuando formen parte de la superficie aprobada;
- evitar imports internos de una aplicación consumidora;
- evitar dependencias implícitas de rutas, variables o configuración de una app concreta;
- conservar entrypoints compatibles con el entorno web aprobado;
- permitir verificación de que no se introducen estilos globales o assets no declarados por accidente.

#### 19. Contract checks del artefacto construido

La decisión histórica que asigna contract tests a CI002 se concreta aquí exclusivamente como **contract checks de la frontera construida**.

CI002 deberá comprobar, como mínimo:

1. resolución de todos los entrypoints públicos;
2. resolución de declarations;
3. coherencia entre exports runtime y tipos;
4. ausencia de imports a source privado desde la superficie distribuible;
5. ausencia de rutas absolutas locales;
6. ausencia de dependencias locales no publicables;
7. coherencia de peers y runtime declarados;
8. instalación o inspección del artefacto empaquetado en un entorno aislado;
9. carga o importación básica de entrypoints aplicables sin recurrir al árbol fuente;
10. comparación de la superficie pública contra el snapshot contractual aplicable.

Estos checks no absorben las pruebas funcionales, negativas o de seguridad del comportamiento propio del package definidas en CI001.

#### 20. Relación con CI001 — pruebas propias

CI001 certifica el comportamiento propio del package. CI002 certifica que el package construido preserva una frontera distribuible válida.

Cuando una prueba de CI001 necesite código compilado:

- consumirá el artefacto exacto certificado por CI002 para el mismo snapshot;
- no mantendrá una segunda implementación de build;
- no reutilizará un build de otro commit o conjunto de dependencias;
- un cambio de output material invalidará la evidencia que dependa de ese output.

El `PASS` de CI001 no sustituye CI002 y el `PASS` de CI002 no demuestra comportamiento funcional completo.

#### 21. Relación con CI003 — releases versionados

CI002 produce la identidad del **candidato de artefacto construido**. CI003 fija posteriormente la identidad publicada e inmutable de la release.

El handoff deberá permitir demostrar:

```text
SOURCE COMMIT
→ BUILD RUN
→ CONTENIDO CONSTRUIDO
→ ARTEFACTO EMPAQUETADO
→ IDENTIDAD CANDIDATA
→ RELEASE PUBLICADA POR CI003
```

CI002 no crea tags, releases ni publica en registry.

Si CI003 no puede demostrar que el release corresponde al mismo artefacto certificado, la evidencia de build no satisface la release.

#### 22. Relación con CI004 — changelog automático

CI002 podrá aportar snapshots de superficie construida y diferencias verificables entre candidatos. CI004 decide cómo esas diferencias alimentan changelog y evidencia de cambio.

CI002 no redacta changelog ni clasifica por sí solo el cambio SemVer definitivo.

#### 23. Relación con CI005 — matriz de compatibilidad

CI002 entrega a CI005 evidencia de que el package puede construirse, empaquetarse y exponer su superficie bajo el runtime y peers declarados.

CI002 no puede declarar una relación package–consumidor como compatible.

La propiedad compartida de los gates de compatibilidad significa:

- CI002 valida la dimensión de build, exports, declarations, runtime y peers del package;
- CI005 cruza esa evidencia con consumidor, framework, runtime, lockfile y conjunto exacto de versiones;
- el resultado de CI002 es entrada necesaria, no veredicto final de compatibilidad.

#### 24. Relación con CI006 — actualización de consumidores

CI006 podrá consumir la identidad del artefacto y el resultado de CI002 para una propuesta concreta.

CI006 deberá rechazar la evidencia cuando no corresponda al package, versión o candidato, commit, manifest, lockfile, dependencias internas y contenido construido de la propuesta actual.

CI002 no modifica manifests ni lockfiles de consumidores y no abre pull requests.

#### 25. Integración con los gates de packages

CI002 contribuye a los gates aprobados sin cambiar su semántica:

- en pruebas propias, aporta el build aplicable cuando la composición del gate lo requiera;
- en identidad de release, aporta identidad e integridad del candidato construido que CI003 deberá fijar;
- en matriz de compatibilidad, aporta la dimensión build/runtime/peers del package que CI005 deberá evaluar contra consumidores;
- en perfil especializado de familia, aporta los checks de artefacto construido correspondientes a cada familia.

Ninguno de esos aportes permite merge, publicación, despliegue o adopción por sí solo.

#### 26. Reproducibilidad

Un build será reproducible cuando dos ejecuciones limpias sobre la misma identidad lógica, con el mismo toolchain y dependencias resueltas, produzcan el mismo contenido distribuible normalizado.

La comparación deberá excluir únicamente metadata no distributiva expresamente declarada por el contrato del empaquetador. No podrá ocultar diferencias en código, declarations, assets, manifest o exports.

La evidencia deberá conservar al menos:

- conjunto ordenado de archivos distribuibles;
- hash de contenido de cada archivo;
- hash agregado del contenido normalizado;
- identidad del manifest empaquetado;
- identidad de declarations;
- identidad de la superficie exportada;
- integridad del artefacto empaquetado cuando exista;
- toolchain y runtime usados.

#### 27. Limpieza y protección contra output stale

Antes de un build certificable:

1. el output anterior del package no será elegible como entrada implícita;
2. la ejecución deberá partir de un estado limpio de outputs distribuibles;
3. un archivo eliminado de source no podrá sobrevivir en el artefacto por residuo de una ejecución anterior;
4. una ejecución incremental podrá utilizarse para desarrollo, pero no sustituirá la evidencia de un build limpio cuando se certifique reproducibilidad;
5. la comparación limpio-versus-repetido deberá detectar residuos y diferencias no explicadas.

#### 28. Empaquetado verificable

El build deberá poder transformarse en un artefacto npm inspeccionable antes de publicación.

La verificación deberá demostrar:

- identidad correcta de package y versión candidata;
- lista cerrada de archivos incluidos;
- ausencia de secretos y archivos operativos no distribuibles;
- resolución de exports y declarations desde el contenido empaquetado;
- ausencia de referencias a rutas locales del workspace;
- integridad capturable del artefacto;
- instalación o importación básica en un entorno aislado cuando aplique.

El empaquetado verificable no equivale a publicación. La publicación continúa reservada a CI003.

#### 29. Evidencia machine-readable

Cada ejecución certificable conservará, como mínimo:

```text
package_name
package_candidate_version
source_commit
package_manifest_hash
lockfile_hash
toolchain_identity
runtime_identity
resolved_internal_dependency_set
public_surface_identity
build_contract_identity
run_identity
build_status
artifact_file_manifest
artifact_content_hash
declarations_identity
exports_identity
pack_integrity
started_at
completed_at
invalidation_reason
```

No se almacenarán secretos, tokens, credenciales ni valores de configuración sensible dentro de esta evidencia.

#### 30. Invalidación

La evidencia deberá pasar a no vigente cuando cambie de forma material cualquiera de estos elementos:

- source commit;
- package manifest;
- lockfile;
- versión candidata;
- toolchain;
- runtime de build;
- dependencia interna;
- banda de peer relevante;
- entrypoint público;
- configuración de compilación;
- declarations;
- assets públicos;
- snapshot de superficie;
- reglas de empaquetado;
- contract checks del artefacto.

La nueva evidencia deberá provenir de otra ejecución atribuible. No se editará manualmente un resultado anterior para hacerlo coincidir con entradas nuevas.

#### 31. Estados y fallo seguro

La instancia física reutilizará la semántica canónica de estados de gate:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` únicamente para comprobaciones condicionales justificadas.

El build propio requerido de una familia gobernada solo se satisface con `PASS`.

Un comando ausente, output vacío, error de compilación, export roto, declaration faltante, package no materializado, dependencia irresoluble, timeout o evidencia stale no podrá normalizarse a `PASS`.

#### 32. Casos positivos obligatorios del habilitador

`SHELL-CI-002::GLOBAL` deberá demostrar, como mínimo:

1. package materializado con build completo → artefacto válido y atribuible;
2. dos builds limpios del mismo snapshot → mismo contenido distribuible normalizado;
3. package con declarations → tipos resolubles desde el artefacto empaquetado;
4. package con varios entrypoints → todos resuelven y ninguno escapa a source privado;
5. package con peer externo válido → peer preservado y no convertido silenciosamente en dependencia embebida incompatible;
6. package con dependencia interna exacta → build respeta el grafo y registra la identidad consumida;
7. artefacto empaquetado → importación o inspección aislada satisfactoria sin acceder al árbol fuente;
8. nuevo build después de cambio legítimo → evidencia nueva sin borrar la ejecución anterior.

#### 33. Casos negativos obligatorios del habilitador

`SHELL-CI-002::GLOBAL` deberá bloquear, como mínimo:

1. package sin declaración de build;
2. package gobernado todavía no materializado;
3. script de build inexistente o no ejecutable;
4. build que en realidad ejecuta únicamente el build de la aplicación raíz;
5. build que finaliza con cero outputs distribuibles requeridos;
6. manifest público que apunta a `src/` como artefacto estable;
7. entrypoint declarado cuyo archivo construido no existe;
8. declaration requerida ausente o irresoluble;
9. export público que depende de archivo privado del repositorio;
10. referencia absoluta local en output;
11. dependencia local, Git URL o referencia workspace no resoluble en el artefacto final;
12. dependencia runtime usada pero no declarada correctamente;
13. peer incompatible con una banda canónica vinculante;
14. build que necesita credenciales productivas o conexión a Supabase desplegado;
15. output contaminado por archivos stale de una ejecución anterior;
16. dos builds limpios del mismo snapshot con diferencias distribuibles no justificadas;
17. build de un package que modifica outputs de otro package;
18. artefacto empaquetado que no puede resolverse fuera del árbol fuente;
19. inclusión de secretos, tokens o configuración sensible;
20. evidencia de otro commit, manifest, lockfile, toolchain o dependencia reutilizada como vigente.

#### 34. Regresiones del propio habilitador global

La implementación única deberá probarse contra, como mínimo:

1. falso verde por script que no compila;
2. falso verde por output heredado;
3. falso verde por `main` existente pero `exports` roto;
4. falso verde por declarations desactualizadas;
5. falso verde por artefacto empaquetado que depende del workspace;
6. falso verde por import que funciona solo desde source;
7. diferencia reproducible ignorada por comparación incompleta;
8. peer incompatible tratado como warning no bloqueante;
9. dependencia interna distinta reutilizando evidencia anterior;
10. package desconocido aceptado como familia gobernada;
11. build cancelado o con timeout presentado como correcto;
12. contract check obligatorio omitido;
13. salida con secreto no detectado;
14. build de una familia escribiendo sobre otra;
15. evidencia humana que contradice el resultado machine-readable;
16. segunda implementación del habilitador creada dentro de un package.

#### 35. Criterios de materialización de `SHELL-CI-002::GLOBAL`

La instancia física podrá declararse materializada únicamente cuando:

1. exista una sola implementación transversal en el repositorio propietario;
2. reconozca exactamente las cuatro familias aprobadas;
3. cada package materializado pueda declarar su perfil de build;
4. el build dirigido no requiera el build de la aplicación raíz ni del consumidor;
5. los outputs se generen desde estado limpio;
6. exports, main, types y subpaths aplicables se validen desde el artefacto construido;
7. las declarations requeridas sean resolubles;
8. el artefacto pueda empaquetarse e inspeccionarse fuera del árbol fuente;
9. dependencias internas exactas y peers queden verificadas;
10. los cuatro perfiles de familia puedan aplicar sus checks propios;
11. la ejecución produzca evidencia machine-readable atribuible;
12. dos builds limpios del mismo snapshot demuestren reproducibilidad;
13. los veinte casos negativos aplicables queden bloqueados;
14. las dieciséis regresiones del propio habilitador queden protegidas;
15. no se publiquen releases ni se modifiquen consumidores;
16. no se requieran credenciales productivas ni cambios de Supabase;
17. exista rollback seguro del habilitador;
18. la implementación quede vinculada a una identidad y commit reproducibles.

#### 36. Rollback del habilitador global

El rollback de CI002 nunca autoriza volver a distribuir source no construido ni omitir el build independiente.

Reglas:

1. podrá restituirse una versión anterior certificada del habilitador;
2. la versión restituida deberá comprender el contrato del package evaluado;
3. evidencia generada por una versión incompatible del habilitador no se reutilizará automáticamente;
4. si no existe versión certificada compatible, los packages quedan bloqueados para build certificable;
5. rollback no revalida artefactos stale ni peers incompatibles;
6. la recuperación conservará identidad de origen, identidad restituida, causa y nueva evidencia de funcionamiento.

#### 37. Estado documental de las cuatro familias

| Package             | Estado físico observado                                            | Build independiente confirmado | Bloqueo actual de salida                                                                                      |
| ------------------- | ------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `@vento/contracts`  | package físico no observado                                        | No                             | materializar package y contrato de build antes de certificarlo                                                |
| `@vento/os-context` | workspace transitorio `0.1.0`, privado y exportando `src/index.ts` | No                             | construir outputs publicables, corregir superficie distribuible y acotar el peer de Supabase antes de estable |
| `@vento/supabase`   | package físico no observado                                        | No                             | materializar package y contrato de build sin acoplarlo a cambios de base de datos                             |
| `@vento/ui-web`     | package físico no observado                                        | No                             | materializar package, outputs UI y contrato de assets/peers antes de certificarlo                             |

**Conciliación:** 4 familias esperadas, 4 evaluadas documentalmente, 0 builds independientes confirmados y 0 familias omitidas.

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** las obligaciones de comandos reproducibles, pruebas y compatibilidad de packages, evidencia por entrega, identidad inmutable de artefactos y validación previa a adopción ya existen en el registro vigente. CI002 concreta el contrato de materialización de esas obligaciones para el build independiente sin introducir un comportamiento empresarial nuevo ni alterar una fila histórica.

#### 39. Cobertura de prueba vigente reutilizada

La cobertura existente se conserva sin modificación:

- `TREQ-SHELL-005` protege comandos reproducibles, build real y bloqueo de falsos verdes;
- `TREQ-SHELL-006` exige pruebas propias y matriz de compatibilidad antes de publicar o adoptar un package compartido;
- `TREQ-SHELL-008` exige trazabilidad reproducible de requisitos y resultados;
- `TREQ-SHELL-036` protege la correspondencia inmutable entre package, versión, manifest, commit y artefacto y asigna responsabilidad a CI002 y CI003;
- `TREQ-SHELL-037` protege cortes coordinados y dependencias internas exactas;
- `TREQ-SHELL-039` exige build y pruebas antes de retiro o fin de soporte.

Estas referencias expresan únicamente trazabilidad de cobertura vigente.

#### 40. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                        |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| BUILD     | NOT_EXECUTED   | El marcador global no materializa `SHELL-CI-002::GLOBAL` ni ejecuta builds de packages.                                                          |
| LOCAL     | PASS           | El artefacto documental fue comprobado estructuralmente contra cabecera, secciones obligatorias, continuidad, TREQ y consistencia interna.       |
| REMOTA    | PASS           | Se verificaron en `main` la continuidad activa, el propietario, CI001 aprobado, el workspace actual y el manifest físico de `@vento/os-context`. |
| OPERATIVA | NOT_EXECUTED   | No existe ejecución operativa del habilitador ni publicación de packages en este marcador.                                                       |
| FÍSICA    | NOT_APPLICABLE | La materialización física corresponde a la futura instancia única `SHELL-CI-002::GLOBAL`.                                                        |

#### 41. Criterios de aceptación

`SHELL-CI-002` queda documentalmente completa cuando:

- identifica la topología `GLOBAL_ENABLE_ONCE` y la instancia `SHELL-CI-002::GLOBAL`;
- conserva exactamente las cuatro familias aprobadas;
- define build independiente sin depender del build de una app raíz o consumidora;
- define la unidad exacta de evaluación y sus entradas;
- define runtime, declarations y assets como outputs contractuales cuando apliquen;
- exige coherencia entre `exports`, `main`, `types` y subpaths;
- impide source TypeScript como sustituto del artefacto estable construido;
- define reglas de dependencias internas, peers y runtime;
- define perfiles específicos para contracts, os-context, supabase y ui-web;
- concilia contract checks de CI002 sin absorber pruebas funcionales de CI001;
- produce handoff de identidad de artefacto hacia CI003 sin publicar;
- aporta a CI005 la dimensión build/runtime/peers sin declarar compatibilidad;
- define reproducibilidad mediante contenido distribuible normalizado;
- define limpieza de outputs y protección contra stale;
- define empaquetado verificable sin confundirlo con publicación;
- define evidencia machine-readable e invalidación;
- define al menos ocho casos positivos, veinte casos negativos y dieciséis regresiones del habilitador;
- define dieciocho criterios de materialización y rollback fail-closed;
- reconcilia 4/4 familias con 0 builds independientes actualmente confirmados;
- no modifica código, CI, consumers, registry, datos o Supabase durante el marcador global;
- no crea ni modifica requisitos de prueba;
- entrega a CI003 un candidato de artefacto identificable sin anticipar la release.

#### 42. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-002::GLOBAL` durante el marcador;
- crea scripts, workflows, runners, configuraciones de compilación o directorios de output;
- decide nombres físicos de comandos o archivos que aún no existen;
- crea packages ausentes;
- modifica `@vento/os-context` ni corrige todavía su manifest;
- cambia la API pública aprobada de ningún package;
- ejecuta las pruebas funcionales propias reservadas a CI001;
- crea tags, releases o publicaciones reservadas a CI003;
- genera changelog reservado a CI004;
- certifica combinaciones package–consumidor reservadas a CI005;
- modifica manifests o lockfiles de consumidores ni abre pull requests reservados a CI006;
- configura registry, credenciales o permisos de publicación;
- habilita auto-merge o auto-deploy;
- ejecuta cambios de Supabase;
- modifica requisitos del registro 04A.

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-CI-001 — Crear pruebas de paquetes compartidos`

**TAREA ACTUAL APROBADA**
`SHELL-CI-002 — Crear build independiente por paquete`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-003 — Crear releases versionados`


### ✅ SHELL-CI-003 — Crear releases versionados

**Estado:** APROBADA
**Tarea anterior:** SHELL-CI-002 — Crear build independiente por paquete
**Tarea siguiente:** SHELL-CI-004 — Crear changelog automático
**Tipo de tarea:** Habilitador global único — contrato documental de releases versionados e identidad inmutable de packages compartidos
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que gobernará la creación de **releases versionados, atribuibles e inmutables** para los packages compartidos de Vento OS, de modo que una versión publicada pueda demostrarse como la misma unidad material que fue probada, construida y empaquetada antes de su publicación.

La regla vinculante queda fijada así:

```text
PACKAGE CANÓNICO
+ VERSIÓN SEMVER EXACTA
+ COMMIT DE ORIGEN EXACTO
+ MANIFEST EXACTO
+ PRUEBAS VIGENTES
+ BUILD CERTIFICADO
+ TARBALL E INTEGRIDAD CERTIFICADOS
+ TAG GIT ANOTADO E INMUTABLE
+ RELEASE INMUTABLE
+ PUBLICACIÓN INMUTABLE EN REGISTRY
+ CANAL COHERENTE
+ EVIDENCIA DE PROCEDENCIA
= RELEASE VERSIONADO ELEGIBLE
```

Y, de forma fail-closed:

```text
VERSIÓN REUTILIZADA CON BYTES DISTINTOS
O TAG MOVIDO
O RELEASE REASOCIADO
O ARTEFACTO RECONSTRUIDO DURANTE PUBLICACIÓN
O CANDIDATO SIN LINEAGE CI001/CI002
O CANAL CONTRADICTORIO
O DEPENDENCIA INTERNA NO ELEGIBLE
≠ PASS
```

Esta tarea no publica todavía un package real. Define el contrato que `SHELL-CI-003::GLOBAL` deberá materializar y certificar una sola vez y que las futuras ejecuciones de release reutilizarán sin crear otra implementación del habilitador.

#### 2. Resultado canónico

`SHELL-CI-003` establece un único contrato transversal para:

1. recibir un candidato de package ya identificado y construido;
2. comprobar que la versión publicada coincide con la versión contenida en el manifest certificado;
3. vincular de forma unívoca package, versión, manifest, commit, artefacto, tag, release, canal, tarball e integridad;
4. impedir reconstrucciones silenciosas entre el build certificado y la publicación;
5. crear una identidad Git anotada y atribuible para cada release;
6. crear una release remota atribuible a la misma identidad;
7. publicar exactamente el artefacto certificado en el registry privado compatible con npm;
8. preservar versiones independientes por package;
9. coordinar cortes multi-package sin versionar familias que no tengan cambio distribuible;
10. respetar el orden de dependencias internas exactas;
11. impedir que una release estable dependa de una prerelease interna no autorizada;
12. mantener coherencia entre SemVer y el canal declarado;
13. bloquear sobrescritura, reasignación o reutilización conflictiva de una identidad ya publicada;
14. registrar evidencia machine-readable suficiente para reproducir y auditar la procedencia de la release;
15. separar release, changelog, compatibilidad y adopción de consumidores;
16. conservar recuperación y rollback sin mutar identidades publicadas.

#### 3. Base vinculante

La definición conserva las decisiones ya aprobadas del mini-bloque y del registro de pruebas:

- packages npm privados e inmutables producidos desde `vento-shell`;
- cuatro familias de package compartido vigentes;
- versiones independientes por package;
- registry privado compatible con npm como canal ordinario de distribución;
- `.tgz` como artefacto verificable y reproducible;
- pruebas propias separadas del acto de publicar;
- build independiente separado del acto de publicar;
- correspondencia inmutable entre package, SemVer, manifest, tag Git anotado, release, commit, canal, tarball e integridad;
- correcciones posteriores mediante una versión nueva, nunca mediante mutación de una versión publicada;
- cortes coordinados que publican únicamente packages con cambio distribuible;
- orden de publicación compatible con dependencias internas exactas;
- prohibición de que una release estable dependa de una prerelease interna no autorizada;
- compatibilidad package–consumidor como gate separado;
- actualización de consumidores como operación posterior y separada.

#### 4. Topología de trabajo

`PHASE-03-T-CI-FOUNDATION` usa `GLOBAL_ENABLE_ONCE` para `SHELL-CI-003`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-003
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-003::GLOBAL
→ materializa y certifica el habilitador una sola vez

RELEASES REALES POSTERIORES
→ reutilizan el habilitador certificado
→ no crean otra implementación de CI003
→ conservan evidencia propia por ejecución de release
```

La instancia global podrá autocertificar el habilitador mediante fixtures, repositorios temporales y destinos de publicación sintéticos o aislados. La existencia del habilitador no autoriza publicar un package real que todavía no haya superado sus gates aplicables.

#### 5. Universo de packages gobernado

El contrato cubre exactamente las cuatro familias compartidas aprobadas:

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

Una carpeta, workspace o package nuevo no entra automáticamente en este universo. Su incorporación exige identidad y ownership canónicos previos.

#### 6. Línea base física observada

En el corte actual verificado de `vento-shell`:

- `SHELL-CI-001::GLOBAL` figura `VERIFIED`;
- `SHELL-CI-002::GLOBAL` figura `VERIFIED` con evidencia de pruebas, build, empaquetado, reproducibilidad y cierre final;
- el archivo propietario conserva `SHELL-CI-003` como marcador documental no iniciado;
- el directorio `.github/workflows/` observado contiene únicamente el workflow de validación del plan canónico;
- no se observó un workflow de release materializado;
- no se observó tooling de publicación de packages que pueda considerarse implementación previa de CI003;
- CI002 entrega a CI003 la identidad del candidato de artefacto construido y prohíbe tratar el empaquetado verificable como publicación.

Por tanto, el contrato de release está documentalmente pendiente y su habilitador físico aún debe materializarse después de la aprobación de este marcador.

#### 7. Frontera con el mini-bloque

| Responsabilidad                                                               | Propietario    |
| ----------------------------------------------------------------------------- | -------------- |
| pruebas propias del package                                                   | `SHELL-CI-001` |
| build, exports, declarations, empaquetado e identidad del artefacto candidato | `SHELL-CI-002` |
| identidad inmutable y publicación de release                                  | `SHELL-CI-003` |
| changelog y narrativa automática del cambio                                   | `SHELL-CI-004` |
| compatibilidad package–consumidor                                             | `SHELL-CI-005` |
| modificación y PR de consumidores                                             | `SHELL-CI-006` |

CI003 no vuelve a implementar pruebas ni build. Consume sus identidades y evidencia y fija la identidad de publicación que los gates posteriores pueden referenciar.

#### 8. Definición de release versionado

Una release es elegible únicamente cuando existe una relación unívoca entre:

```text
package_name
release_version
package_manifest_identity
source_commit
certified_test_identity
certified_build_identity
artifact_content_identity
annotated_git_tag_identity
remote_release_identity
registry_artifact_identity
release_channel
release_run_identity
```

La relación deberá ser demostrable desde evidencia machine-readable. Una coincidencia parcial o basada únicamente en nombres no satisface el contrato.

#### 9. Unidad exacta de release

Cada ejecución de release se atribuirá, como mínimo, a:

```text
package_name
release_version
source_commit
package_manifest_hash
lockfile_hash
resolved_internal_dependency_set
test_evidence_identity
build_evidence_identity
artifact_file_manifest_identity
artifact_content_hash
pack_integrity
release_channel
release_contract_identity
release_run_identity
```

Después de materializar la publicación, se incorporarán además las identidades verificadas del tag Git anotado, la release remota y el artefacto publicado en registry.

Cambiar cualquiera de estas dimensiones materiales invalida la reutilización de la evidencia anterior para una nueva release.

#### 10. Precondiciones de una publicación real

Una publicación real de package deberá permanecer bloqueada hasta demostrar, como mínimo:

1. package perteneciente al universo aprobado;
2. versión SemVer concreta y coherente con el manifest del candidato certificado;
3. commit de origen identificable;
4. evidencia vigente de pruebas propias aplicables;
5. evidencia vigente de CI002 para el mismo candidato;
6. integridad del `.tgz` o artefacto empaquetado certificado;
7. dependencias internas exactas elegibles;
8. canal de release coherente con la identidad SemVer;
9. ausencia de una identidad publicada conflictiva;
10. compatibilidad aplicable demostrada antes de publicación o adopción conforme al gate propietario;
11. material de changelog o release notes exigible cuando el contrato del cambio lo requiera;
12. credenciales de publicación disponibles únicamente en el entorno autorizado y nunca dentro de la evidencia.

La instancia `SHELL-CI-003::GLOBAL` podrá certificar el mecanismo sin cumplir la precondición 10 contra packages reales, usando escenarios sintéticos. Esa autocertificación no constituye publicación ni compatibilidad de una familia real.

#### 11. Versión candidata y manifest

CI003 no cambiará silenciosamente la versión después de certificar el build.

Reglas:

1. `release_version` deberá coincidir con la versión del manifest que participó en la identidad certificada del candidato;
2. si la versión del manifest cambia, el candidato deja de ser el mismo y deberán regenerarse las evidencias que dependan de esa identidad;
3. una versión publicada no podrá reutilizarse para contenido distinto;
4. una corrección posterior exigirá otro SemVer y otra cadena completa de identidad;
5. CI003 valida la versión de entrada; no deriva por sí solo el bump SemVer a partir de un diff de source.

La clasificación semántica del cambio y su representación narrativa permanecen separadas del mecanismo de publicación.

#### 12. Versionado independiente por package

Las cuatro familias conservan versionado independiente.

Por tanto:

- una nueva versión de `@vento/contracts` no fuerza por sí sola una nueva versión de `@vento/ui-web`;
- un package sin cambio distribuible no recibe una versión artificial durante un corte coordinado;
- cada versión conserva su propio tag, release, tarball e integridad;
- el historial de una familia no se deriva de la numeración de otra;
- la coordinación entre packages se expresa mediante dependencias exactas y evidencia de corte, no mediante lockstep de versiones.

#### 13. Identidad Git anotada

Cada release publicada deberá quedar asociada a un **tag Git anotado** que:

1. sea determinista a partir de la identidad de package y versión;
2. no colisione con releases de otras familias del monorepo;
3. apunte al commit exacto de origen;
4. conserve una anotación atribuible a la release;
5. no pueda moverse a otro commit;
6. no pueda reutilizarse para otra versión o package;
7. forme parte de la evidencia del release.

No se fija en este marcador una cadena física de nombre para el tag porque no existe una convención material previa aprobada. `SHELL-CI-003::GLOBAL` será el propietario de materializar una única función determinista de serialización `package + version → tag`, autocertificar ausencia de colisiones y conservar su identidad dentro del contrato de release. Una vez certificada, esa función no podrá cambiar para una release existente.

#### 14. Release remota

La release remota deberá:

- referenciar el tag anotado exacto;
- conservar package y versión verificables;
- conservar el commit de origen;
- registrar o adjuntar la identidad del artefacto empaquetado certificado;
- conservar la integridad verificable del tarball;
- identificar el canal aplicable;
- no sustituir un artefacto después de la publicación;
- no reasociarse a otro tag o commit.

El cuerpo descriptivo extensivo o changelog automático no pertenece a CI003; CI004 gobierna esa narrativa. CI003 solo exige metadata mínima de procedencia suficiente para demostrar identidad.

#### 15. Publicación en registry privado

La publicación en el registry privado compatible con npm deberá cumplir simultáneamente:

1. package y versión iguales al candidato certificado;
2. bytes distribuibles iguales al artefacto certificado por CI002;
3. integridad comprobable antes y después de la publicación;
4. metadata de registry coherente con la identidad del manifest;
5. canal coherente con SemVer;
6. ausencia de rutas locales, dependencias no publicables o secretos;
7. prohibición de sobrescribir una versión existente;
8. prohibición de convertir una respuesta ambigua del registry en `PASS`;
9. lectura posterior suficiente para demostrar que la identidad publicada existe y corresponde al candidato esperado.

CI003 no reconstruirá el package durante la publicación. El artefacto de entrada es el mismo candidato empaquetado certificado por CI002.

#### 16. Inmutabilidad

Una vez publicada una identidad `package + version`:

- el tag anotado no se mueve;
- la release no se reasocia;
- el tarball no se sustituye;
- los bytes publicados no se sobrescriben;
- la integridad histórica no se edita para coincidir con contenido nuevo;
- el commit de origen no cambia;
- el manifest histórico no se reescribe.

Una corrección exige una release nueva con nueva versión e identidades nuevas.

#### 17. Idempotencia y conflictos

El habilitador distinguirá entre repetición idempotente y conflicto.

Una repetición podrá reconocerse como ya satisfecha únicamente cuando todas las identidades inmutables observadas coincidan exactamente con la ejecución esperada.

Será `BLOCKED` cuando exista cualquiera de estos conflictos:

- mismo tag apuntando a otro commit;
- misma versión con otro manifest;
- misma versión con otros bytes;
- release remota asociada a otra identidad;
- integridad diferente;
- package o canal incompatibles;
- evidencia de build o pruebas distinta a la esperada.

Nunca se resolverá un conflicto sobrescribiendo la identidad existente.

#### 18. Canal y prerelease

CI003 tratará el canal como parte explícita de la identidad operativa de publicación.

Reglas:

1. una versión con sufijo prerelease no podrá presentarse como release estable;
2. una versión estable no podrá depender de una prerelease interna no autorizada;
3. el canal declarado deberá ser coherente con la versión SemVer;
4. cambiar únicamente un puntero mutable de canal no cambia la identidad histórica de una versión ya publicada;
5. cualquier cambio de puntero de canal deberá ser auditable y no podrá alterar tag, release, tarball o bytes de una versión existente.

CI003 no inventa en este marcador nombres concretos de canales o dist-tags que no estén aprobados por una fuente propietaria.

#### 19. Cortes coordinados multi-package

Cuando un cambio requiera publicar varias familias:

1. se construirá el conjunto de packages con cambio distribuible real;
2. los packages sin cambio quedan fuera del corte;
3. se resolverá el grafo de dependencias internas exactas;
4. se publicarán primero las dependencias necesarias para que sus dependientes puedan referenciar identidades elegibles;
5. una dependencia interna estable no podrá resolver a una prerelease no autorizada;
6. cada package conservará SemVer, tag, release y evidencia propios;
7. un fallo parcial no permitirá declarar el corte completo como `PASS`;
8. las publicaciones exitosas previas al fallo permanecen inmutables y el recovery continúa mediante nuevas identidades o reanudación idempotente, nunca mediante sobrescritura.

#### 20. Integración con CI001 — pruebas propias

CI003 consume la evidencia de CI001 como lineage de la release.

La evidencia deberá corresponder al mismo package, candidato, commit, manifest y conjunto material aplicable. Si la identidad definitiva de release no puede vincularse con el candidato probado, las pruebas anteriores no certifican esa release.

CI003 no ejecuta una segunda implementación de las pruebas propias.

#### 21. Integración con CI002 — artefacto construido

CI002 entrega a CI003:

```text
SOURCE COMMIT
→ BUILD RUN
→ CONTENIDO CONSTRUIDO
→ ARTEFACTO EMPAQUETADO
→ IDENTIDAD CANDIDATA
```

CI003 agrega:

```text
→ TAG ANOTADO
→ RELEASE REMOTA
→ PUBLICACIÓN EN REGISTRY
→ IDENTIDAD DE RELEASE INMUTABLE
```

Los bytes publicados deberán corresponder al artefacto certificado por CI002. Si CI003 necesita reconstruir para publicar, el resultado constituye un candidato nuevo y debe volver por los gates que dependan del build.

#### 22. Integración con CI004 — changelog automático

CI004 conserva la propiedad sobre:

- generación automática del changelog;
- narrativa del cambio;
- clasificación y presentación de cambios públicos;
- material de migración o deprecación cuando corresponda.

CI003 podrá consumir una identidad o referencia de ese material cuando una release real lo exija, pero no lo genera ni lo reescribe.

La ausencia de changelog exigible deberá bloquear la publicación aplicable; no autoriza a CI003 a inventarlo.

#### 23. Integración con CI005 — matriz de compatibilidad

CI003 no declara compatibilidad package–consumidor.

La publicación o adopción de una versión real deberá respetar la obligación vigente de superar la matriz de compatibilidad aplicable. CI005 produce el veredicto sobre combinaciones package–consumidor; CI003 únicamente consume esa evidencia como precondición de una publicación real cuando corresponda.

La autocertificación global de CI003 puede usar fixtures sintéticos sin afirmar compatibilidad de un package real.

#### 24. Integración con CI006 — consumidores

CI006 consume una release inmutable producida por CI003.

CI003 no:

- modifica manifests de consumidores;
- cambia lockfiles de consumidores;
- abre PR;
- selecciona consumidores;
- ejecuta despliegues de aplicaciones.

El handoff hacia CI006 deberá proporcionar package, versión, registry identity, integridad, commit de origen y evidencia necesaria para que el consumidor adopte una versión exacta.

#### 25. Credenciales y secretos

La publicación real podrá utilizar credenciales únicamente desde el entorno autorizado de release.

Reglas:

- los secretos no forman parte de manifests, tarballs, release notes ni evidencia;
- los valores de tokens no se imprimen ni persisten como artefacto;
- ausencia o rechazo de credenciales produce `BLOCKED` o `FAIL`, nunca `PASS`;
- el habilitador global deberá probar el camino de credenciales mediante sustitutos sintéticos sin requerir secretos productivos;
- una detección de secreto real en source, test, artifact o historia bloquea publicación hasta retirarlo y rotarlo cuando corresponda.

Un fixture sintético diseñado expresamente para probar detección de secretos deberá estar claramente clasificado como dato de prueba y no deberá confundirse con una credencial productiva.

#### 26. Evidencia machine-readable

Cada ejecución certificable conservará, como mínimo:

```text
package_name
release_version
source_commit
package_manifest_hash
lockfile_hash
resolved_internal_dependency_set
test_evidence_identity
build_evidence_identity
artifact_file_manifest_identity
artifact_content_hash
pack_integrity
release_channel
release_contract_identity
release_run_identity
annotated_tag_identity
remote_release_identity
registry_artifact_identity
started_at
completed_at
release_status
invalidation_reason
```

Cuando una fase aún no haya ocurrido, su identidad permanecerá ausente y el estado no podrá declararse `PASS` para una publicación completa.

La evidencia no contendrá secretos, tokens ni credenciales.

#### 27. Invalidation y evidencia stale

La evidencia deja de certificar la release cuando cambia materialmente cualquiera de estos elementos antes de publicar:

- source commit;
- manifest;
- lockfile;
- versión;
- dependencia interna;
- evidencia de pruebas;
- evidencia de build;
- contenido o integridad del artefacto;
- contrato del habilitador;
- canal aplicable;
- tag esperado.

Después de publicar, esas identidades se consideran históricas e inmutables. Un cambio posterior produce una release distinta, no una edición de la evidencia anterior.

#### 28. Estados y fallo seguro

El gate de release reutilizará la semántica común:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` únicamente para comprobaciones condicionales justificadas.

Una publicación completa solo se satisface con `PASS`.

Una operación parcial, cancelada, con timeout, ambigua, stale o con conflicto de identidad no podrá normalizarse a `PASS`.

#### 29. Casos positivos obligatorios del habilitador

`SHELL-CI-003::GLOBAL` deberá demostrar, como mínimo:

1. candidato sintético completo y elegible → identidad de release coherente y atribuible;
2. misma identidad ya publicada de forma exacta → repetición idempotente sin sobrescritura;
3. dos packages distintos con versiones independientes → tags y releases sin colisión;
4. corte coordinado con dos packages cambiados y uno sin cambio → solo los dos cambiados entran al corte;
5. dependencia interna exacta → orden topológico de publicación preservado;
6. prerelease válida → canal coherente y sin presentarse como estable;
7. release estable sin prereleases internas no autorizadas → elegibilidad conservada;
8. lectura posterior del destino → package, versión, commit, tarball e integridad corresponden a la evidencia esperada.

#### 30. Casos negativos obligatorios del habilitador

`SHELL-CI-003::GLOBAL` deberá bloquear, como mínimo:

1. package fuera del universo aprobado;
2. versión ausente o SemVer inválido;
3. versión distinta a la del manifest certificado;
4. evidencia CI001 ausente, incompatible o stale;
5. evidencia CI002 ausente, incompatible o stale;
6. tarball distinto al certificado;
7. integridad distinta;
8. tag existente apuntando a otro commit;
9. tag existente atribuido a otro package o versión;
10. release remota existente con identidad conflictiva;
11. versión de registry existente con bytes distintos;
12. intento de sobrescribir una versión publicada;
13. reconstrucción durante el paso de publicación que cambie el artefacto;
14. package estable dependiendo de una prerelease interna no autorizada;
15. orden de dependencias internas irresoluble;
16. canal contradictorio con SemVer;
17. publicación de package sin cambio durante un corte coordinado;
18. credencial productiva ausente o rechazada;
19. secreto detectado dentro del artefacto;
20. respuesta remota incompleta o no verificable tratada como éxito.

#### 31. Regresiones del habilitador global

La implementación única deberá proteger, como mínimo:

1. tag movido después de una ejecución previa;
2. release reasociada a otro tag;
3. mismo SemVer resolviendo bytes distintos;
4. tarball sustituido manteniendo metadata anterior;
5. integridad calculada sobre un artefacto distinto al publicado;
6. evidencia de otra versión reutilizada por coincidencia de commit;
7. evidencia de otro commit reutilizada por coincidencia de versión;
8. package sin cambios versionado por lockstep accidental;
9. dependencia interna publicada después del dependiente;
10. prerelease presentada como estable;
11. reintento que duplica una publicación correcta;
12. reintento que oculta una publicación parcial conflictiva;
13. fallo remoto convertido en `PASS` por exit code ambiguo;
14. secreto o token incluido en evidencia;
15. segunda implementación del habilitador dentro de un package;
16. cambio de serialización de tag que colisiona con una identidad histórica.

#### 32. Criterios de materialización de `SHELL-CI-003::GLOBAL`

La instancia física podrá declararse materializada únicamente cuando:

1. exista una sola implementación transversal en `vento-shell`;
2. reconozca exactamente las cuatro familias aprobadas;
3. consuma identidades de CI001 y CI002 sin duplicar sus implementaciones;
4. valide SemVer y manifest antes de cualquier publicación;
5. materialice una serialización determinista y no colisionante de tag por package y versión;
6. cree o simule tags anotados con verificación de commit;
7. cree o simule releases remotas con identidad verificable;
8. publique o simule publicación de exactamente el tarball certificado;
9. valide lectura posterior e integridad;
10. preserve versiones independientes por package;
11. soporte cortes coordinados respetando el grafo interno;
12. sea idempotente ante repetición exacta;
13. sea fail-closed ante cualquier conflicto de identidad;
14. produzca evidencia machine-readable atribuible;
15. proteja los casos negativos y regresiones definidos;
16. no requiera secretos productivos para autocertificarse;
17. no genere changelog, compatibilidad ni PR de consumidores;
18. disponga de recuperación sin mutar releases históricas;
19. conserve una única implementación global reutilizable por releases futuras.

#### 33. Recuperación y rollback

El rollback de CI003 no modifica una release histórica para hacerla parecer anterior.

Reglas:

1. una versión, tag, release y tarball publicados permanecen inmutables;
2. una corrección se publica como una nueva versión después de superar los gates aplicables;
3. un consumidor podrá volver a una versión previa soportada mediante su propio flujo de adopción y rollback;
4. un puntero mutable de canal podrá reajustarse únicamente mediante operación auditable y sin alterar identidades históricas;
5. una publicación parcial se reconcilia conservando lo ya publicado e identificando exactamente qué fases faltan o entraron en conflicto;
6. un conflicto irreversible de identidad bloquea esa versión y obliga a otra identidad de release;
7. la recuperación conservará causa, actor, identidad previa, identidad resultante y evidencia.

#### 34. Estado documental de las cuatro familias

| Package             | Release real confirmada por este contrato | Estado actual para CI003                                               | Bloqueo antes de una publicación real                                      |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `@vento/contracts`  | No                                        | familia gobernada, package físico no confirmado en la base heredada    | materializar package, pruebas, build, compatibilidad y candidato exacto    |
| `@vento/os-context` | No                                        | familia gobernada; la base heredada permanece transitoria y no estable | completar candidato distribuible elegible, pruebas, build y compatibilidad |
| `@vento/supabase`   | No                                        | familia gobernada, package físico no confirmado en la base heredada    | materializar package sin acoplar publicación a cambios de base de datos    |
| `@vento/ui-web`     | No                                        | familia gobernada, package físico no confirmado en la base heredada    | materializar package, assets/peers, pruebas, build y compatibilidad        |

**Conciliación:** 4 familias esperadas, 4 gobernadas por el contrato, 0 releases reales confirmadas por CI003 y 0 familias omitidas.

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** el registro vigente ya exige comandos reproducibles, pruebas y compatibilidad antes de publicación, rollback controlado, evidencia trazable y correspondencia inmutable entre package, SemVer, manifest, tag, release, commit, canal, tarball e integridad. CI003 concreta cómo materializar esas obligaciones en el habilitador de release sin introducir una nueva regla empresarial ni modificar filas históricas.

#### 36. Cobertura de prueba vigente reutilizada

La cobertura existente se conserva sin modificación:

- `TREQ-SHELL-005` protege tooling reproducible y bloquea falsos verdes de comandos y build;
- `TREQ-SHELL-006` exige pruebas propias y compatibilidad antes de publicar o adoptar un package compartido;
- `TREQ-SHELL-007` exige rollback independiente sin restaurar bypasses ni perder trazabilidad;
- `TREQ-SHELL-008` exige evidencia reproducible y trazabilidad de requisitos afectados;
- `TREQ-SHELL-036` exige correspondencia unívoca e inmutable entre package, SemVer, manifest, tag Git anotado, release, commit, canal, tarball e integridad;
- `TREQ-SHELL-037` exige versiones independientes, publicación solo de familias cambiadas, orden de dependencias internas y coherencia entre SemVer y canal;
- `TREQ-SHELL-038` reserva para deprecaciones la evidencia adicional de changelog, guía, ventana y consumidores;
- `TREQ-SHELL-039` mantiene el retiro y fin de soporte bloqueados hasta completar compatibilidad, pruebas, rollback y adopción aplicable.

Estas referencias expresan únicamente trazabilidad de cobertura vigente.

#### 37. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                            |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | El marcador documental no materializa `SHELL-CI-003::GLOBAL`, no crea tooling de release y no publica packages.                                                      |
| LOCAL     | NOT_EXECUTED   | El artefacto se entrega para revisión; todavía no ha sido insertado ni validado mediante los scripts del checkout del usuario.                                       |
| REMOTA    | PASS           | Se verificaron en `main` la continuidad activa, el propietario, CI002 `VERIFIED`, la ausencia de un workflow de release materializado y la cobertura TREQ aplicable. |
| OPERATIVA | NOT_EXECUTED   | No se ejecutaron tags, releases ni publicaciones reales o sintéticas en este marcador.                                                                               |
| FÍSICA    | NOT_APPLICABLE | La materialización pertenece a la futura instancia `SHELL-CI-003::GLOBAL` después de aprobación y autorización explícita.                                            |

#### 38. Criterios de aceptación

`SHELL-CI-003` queda documentalmente completa cuando:

- identifica la topología `GLOBAL_ENABLE_ONCE` y la instancia `SHELL-CI-003::GLOBAL`;
- conserva exactamente las cuatro familias aprobadas;
- define una unidad de release atribuible a package, SemVer, manifest, commit, pruebas, build y artefacto;
- exige que el manifest ya contenga la versión certificada antes de publicación;
- exige que los bytes publicados sean los mismos certificados por CI002;
- exige tag Git anotado, release remota y publicación de registry vinculados a la misma identidad;
- mantiene tag, release, tarball, bytes e integridad inmutables;
- obliga a crear otra versión para toda corrección;
- conserva versiones independientes por package;
- define cortes coordinados que excluyen packages sin cambios y respetan el grafo interno;
- impide release estable sobre prerelease interna no autorizada;
- define coherencia entre SemVer y canal sin inventar nombres físicos de canales;
- define idempotencia exacta y bloqueo de conflictos;
- define credenciales y secretos sin persistir valores sensibles;
- define evidencia machine-readable e invalidación;
- separa claramente CI001, CI002, CI004, CI005 y CI006;
- define casos positivos, negativos y regresiones del habilitador;
- define recuperación sin mutar identidades publicadas;
- concilia 4/4 familias sin afirmar releases inexistentes;
- no modifica código, workflows, registry, consumidores, Supabase ni 04A durante el marcador;
- no crea ni modifica requisitos de prueba.

#### 39. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-003::GLOBAL` durante el marcador;
- crea scripts, workflows o configuración de publicación;
- fija un nombre físico de tag, canal o dist-tag no aprobado por una fuente material;
- publica packages reales;
- crea tags Git reales;
- crea releases remotas reales;
- configura credenciales de registry o GitHub;
- reconstruye packages reservados a CI002;
- ejecuta pruebas propias reservadas a CI001;
- genera changelog reservado a CI004;
- certifica compatibilidad reservada a CI005;
- modifica manifests o lockfiles de consumidores ni abre PR reservados a CI006;
- materializa packages ausentes;
- modifica la API pública de una familia;
- ejecuta despliegues de aplicaciones;
- ejecuta cambios de Supabase;
- crea, modifica, difiere, descarta o vuelve obsoletos requisitos del registro 04A.

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-CI-002 — Crear build independiente por paquete`

**TAREA ACTUAL APROBADA**
`SHELL-CI-003 — Crear releases versionados`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-004 — Crear changelog automático`


### ✅ SHELL-CI-004 — Crear changelog automático

**Estado:** APROBADA
**Tarea anterior:** SHELL-CI-003 — Crear releases versionados
**Tarea siguiente:** SHELL-CI-005 — Crear matriz de compatibilidad
**Tipo de tarea:** Habilitador global único — contrato documental de changelog automático, release notes y trazabilidad narrativa de packages compartidos
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que gobernará la generación automática, determinista y trazable del **changelog y las release notes** de los packages compartidos de Vento OS, de modo que cada narrativa publicada corresponda exactamente al package, versión, commit, base de comparación, cambio distribuible y release que pretende describir.

La regla vinculante queda fijada así:

```text
PACKAGE CANÓNICO
+ VERSIÓN SEMVER EXACTA
+ COMMIT DE ORIGEN EXACTO
+ RELEASE BASE EXACTA
+ CAMBIO DISTRIBUIBLE DEMOSTRADO
+ CHANGE SET ESTRUCTURADO Y COMPLETO
+ IMPACTO SEMVER DECLARADO
+ SUPERFICIES PÚBLICAS AFECTADAS
+ DEPRECACIONES Y MIGRACIÓN CUANDO APLIQUEN
+ NARRATIVA DETERMINISTA
+ IDENTIDAD CRIPTOGRÁFICA DEL CHANGELOG
= MATERIAL DE CHANGELOG ELEGIBLE PARA RELEASE
```

Y, de forma fail-closed:

```text
GIT LOG SIN REGISTROS ESTRUCTURADOS
O CAMBIO DISTRIBUIBLE SIN ENTRADA DE CHANGELOG
O ENTRADA DE OTRO PACKAGE, VERSIÓN O COMMIT
O CLASIFICACIÓN SEMVER CONTRADICTORIA
O RUPTURA SIN MIGRACIÓN EXIGIBLE
O DEPRECACIÓN SIN EXPEDIENTE DEP VÁLIDO
O HISTORIAL PUBLICADO REESCRITO
O SALIDA NO DETERMINISTA
O CONTENIDO SENSIBLE EXPUESTO
≠ PASS
```

Esta tarea no modifica todavía packages, changelogs, releases ni workflows. Define el contrato que `SHELL-CI-004::GLOBAL` deberá materializar y certificar una sola vez y que las futuras releases reutilizarán sin crear otra implementación del habilitador.

#### 2. Resultado canónico

`SHELL-CI-004` establece un único contrato transversal para:

1. recibir un candidato de release ya identificado por package, versión y commit;
2. exigir una fuente estructurada de cambios en lugar de inferir el significado únicamente desde commits o títulos de PR;
3. vincular cada cambio narrado con su package, superficie, impacto SemVer y evidencia de origen;
4. distinguir cambio distribuible de cambio que no requiere release;
5. generar una entrada humana de changelog por package y versión;
6. generar release notes desde la misma fuente estructurada, sin una segunda narrativa divergente;
7. producir una identidad criptográfica determinista del material narrativo;
8. entregar esa identidad a CI003 antes de una publicación real cuando el changelog sea exigible;
9. enlazar la narrativa final con la identidad inmutable de release producida por CI003;
10. preservar un historial independiente por package y versión;
11. impedir reescritura de entradas correspondientes a releases ya publicadas;
12. representar deprecaciones, breaking changes, migraciones y seguridad con reglas explícitas;
13. preservar el versionado independiente durante cortes multi-package;
14. impedir que packages sin cambio distribuible reciban entradas artificiales;
15. producir evidencia machine-readable atribuible e invalidable;
16. separar changelog, release, compatibilidad y actualización de consumidores.

#### 3. Base vinculante

La definición conserva las decisiones ya aprobadas del BLOQUE H, del mini-bloque CI y del registro de pruebas:

- packages npm privados e inmutables producidos desde `vento-shell`;
- cuatro familias de package compartido vigentes;
- versionado SemVer independiente por package;
- primera versión estable canónica `1.0.0` por familia cuando el package sea elegible;
- clasificación por impacto sobre API público, no por tamaño, urgencia ni texto del commit;
- prohibición de deducir el incremento únicamente desde Conventional Commits o el texto del PR;
- `NO_RELEASE` cuando el artefacto distribuible no cambia;
- correspondencia inmutable entre package, SemVer, manifest, commit, tag, release, tarball e integridad;
- deprecación estable como cambio al menos `MINOR` cuando conserva la superficie;
- retiro de superficie pública estable como cambio `MAJOR`;
- expedientes `DEP-*` únicos e inmutables;
- ventana ordinaria mínima de deprecación de 90 días y release estable intermedia antes del retiro;
- changelog, release notes, guía y expediente coherentes para deprecaciones;
- versiones, tags, releases y artefactos históricos inmutables;
- cortes coordinados que publican únicamente packages con cambio distribuible;
- compatibilidad package–consumidor como gate separado;
- modificación de consumidores mediante PR como operación posterior y separada.

#### 4. Topología de trabajo

`PHASE-03-T-CI-FOUNDATION` usa `GLOBAL_ENABLE_ONCE` para `SHELL-CI-004`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-004
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-004::GLOBAL
→ materializa y certifica el habilitador una sola vez

RELEASES REALES POSTERIORES
→ reutilizan el habilitador certificado
→ generan material propio por package y versión
→ no crean otra implementación de CI004
```

La instancia global podrá autocertificarse con repositorios, manifests, change sets, historiales y releases sintéticos o aislados. La certificación del habilitador no constituye por sí misma una release real ni autoriza modificar consumidores.

#### 5. Universo de packages gobernado

El contrato cubre exactamente las cuatro familias compartidas aprobadas:

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

Una nueva carpeta, workspace o dependencia no entra automáticamente en el universo. Debe contar con identidad y ownership canónicos antes de participar en CI004.

#### 6. Línea base física observada

En el corte remoto vigente de `vento-shell`:

- `SHELL-CI-001::GLOBAL` figura `VERIFIED`;
- `SHELL-CI-002::GLOBAL` figura `VERIFIED`;
- `SHELL-CI-003::GLOBAL` figura `VERIFIED` con su release gate y autocertificación materializados;
- el release gate de CI003 ya reconoce `changelog_required` y exige `changelog_identity` cuando esa condición es verdadera;
- el workspace raíz sigue declarando `packages/*`;
- `@vento/os-context` continúa siendo el único package físico observado bajo ese workspace;
- la raíz física de `@vento/os-context` contiene `README.md`, `package.json` y `src/`, sin `CHANGELOG.md` observado;
- no se observó tooling materializado de Changesets, semantic-release, release-please o conventional-changelog;
- no se observó otro mecanismo ejecutable que pueda considerarse implementación previa de CI004;
- `@vento/contracts`, `@vento/supabase` y `@vento/ui-web` aún no están materializados como packages físicos observados.

Por tanto, CI004 parte de una necesidad real y no de una convención física preexistente que deba preservarse.

#### 7. Frontera con el mini-bloque

| Responsabilidad                                                               | Propietario    |
| ----------------------------------------------------------------------------- | -------------- |
| pruebas propias del package                                                   | `SHELL-CI-001` |
| build, exports, declarations, empaquetado e identidad del artefacto candidato | `SHELL-CI-002` |
| identidad inmutable y publicación de release                                  | `SHELL-CI-003` |
| changelog, release notes y narrativa automática del cambio                    | `SHELL-CI-004` |
| compatibilidad package–consumidor                                             | `SHELL-CI-005` |
| modificación y PR de consumidores                                             | `SHELL-CI-006` |

CI004 puede consumir identidades y evidencia producidas por CI001, CI002 y CI003, pero no vuelve a ejecutar sus responsabilidades. Tampoco produce un veredicto de compatibilidad ni modifica consumidores.

#### 8. Definición de changelog automático

El habilitador manejará tres proyecciones sincronizadas de una misma fuente:

```text
CHANGE SET ESTRUCTURADO
→ fuente machine-readable y atribuible

ENTRADA DE CHANGELOG POR PACKAGE Y VERSIÓN
→ historia humana legible

RELEASE NOTES DE ESA VERSIÓN
→ narrativa de publicación derivada del mismo contenido
```

La fuente machine-readable es la autoridad de contenido. El changelog y las release notes son proyecciones derivadas y no podrán introducir decisiones, cambios o categorías ausentes en el change set.

#### 9. Fuente estructurada obligatoria

CI004 no usará el texto libre de commits como fuente semántica suficiente.

Los commits, PR, diffs y archivos podrán actuar como evidencia o referencias de origen, pero la narrativa publicable deberá provenir de registros estructurados que declaren de forma explícita:

- qué package cambia;
- qué superficie cambia;
- qué tipo de cambio ocurrió;
- qué impacto SemVer fue aprobado;
- si existe ruptura;
- si existe migración;
- si existe deprecación;
- qué evidencia permite atribuir el cambio.

La automatización podrá detectar discrepancias entre diff, artefacto y registros, pero no inventará por heurística la clasificación contractual ausente.

#### 10. Unidad exacta de changelog de release

Cada candidato de changelog se atribuirá, como mínimo, a:

```text
package_name
release_version
source_commit
package_manifest_identity
base_release_version
base_release_identity
distribution_change
change_set_identity
release_channel_type
changelog_contract_identity
changelog_run_identity
```

Para la primera release estable de una familia, `base_release_version` y `base_release_identity` podrán ser `null` y la evidencia deberá declarar que se trata de la primera estable canónica.

Cambiar cualquiera de estas dimensiones materiales invalida la reutilización del candidato de changelog anterior.

#### 11. Contrato de cada registro de cambio

Cada elemento del change set deberá contener, como mínimo:

| Campo                 | Obligación                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `change_record_id`    | identificador estable y único dentro del candidato                                              |
| `package_name`        | una de las cuatro familias gobernadas                                                           |
| `change_kind`         | categoría canónica del cambio                                                                   |
| `summary`             | descripción humana concreta, sin texto genérico                                                 |
| `semver_impact`       | `PATCH`, `MINOR`, `MAJOR` o `NO_RELEASE`                                                        |
| `public_surfaces`     | identidades públicas afectadas o arreglo vacío justificado si el cambio es interno distribuible |
| `source_refs`         | referencias verificables a origen, diff, decisión o evidencia                                   |
| `breaking_change`     | booleano explícito                                                                              |
| `migration_required`  | booleano explícito                                                                              |
| `migration_reference` | referencia resoluble cuando la migración sea obligatoria                                        |
| `deprecation_ids`     | expedientes `DEP-*` relacionados o arreglo vacío                                                |
| `security_visibility` | `PUBLIC`, `RESTRICTED` o `NOT_APPLICABLE`                                                       |
| `treq_refs`           | requisitos afectados cuando existan                                                             |

No se admitirán registros duplicados que describan el mismo cambio con identidades distintas para inflar o fragmentar artificialmente la narrativa.

#### 12. Categorías canónicas de narrativa

`change_kind` permitirá exactamente estas categorías de publicación:

1. `ADDED`;
2. `CHANGED`;
3. `FIXED`;
4. `DEPRECATED`;
5. `REMOVED`;
6. `SECURITY`.

`BREAKING` no constituye una categoría independiente de origen: es una propiedad contractual que se proyecta en una sección humana prioritaria cuando `breaking_change = true`.

`MIGRATION` tampoco constituye una categoría de origen: se deriva cuando uno o más registros requieren acción explícita del consumidor.

El orden humano canónico será:

```text
Breaking changes
Added
Changed
Fixed
Deprecated
Removed
Security
Migration
```

Las secciones vacías se omiten. El orden de las secciones no depende del orden del filesystem, del commit log ni de la configuración regional del entorno.

#### 13. Relación con SemVer

CI004 registra y valida coherencia; no sustituye la política de versionado aprobada.

Reglas mínimas:

1. un registro `NO_RELEASE` no justifica una versión publicada;
2. una release con cambio distribuible debe usar el mayor impacto SemVer aplicable al conjunto de registros;
3. `breaking_change = true` para una superficie estable exige `MAJOR`;
4. retirar una superficie pública estable exige `MAJOR`;
5. anunciar una deprecación estable manteniendo compatibilidad exige al menos `MINOR`;
6. una corrección compatible podrá ser `PATCH`;
7. una capacidad pública aditiva podrá ser `MINOR`;
8. modificar una dependencia interna exacta de un package distribuido exige al menos `PATCH`, incluso si su API propio no cambia;
9. CI004 no rebajará una clasificación aprobada para hacer coincidir una versión ya escrita en el manifest;
10. una contradicción no resoluble entre registros, versión y política produce bloqueo.

#### 14. Cobertura obligatoria por release

Para toda release real con `distribution_change = true`:

```text
required_change_records > 0
AND represented_distributable_changes = distributable_changes_detected
AND duplicate_change_records = 0
AND unresolved_semver_conflicts = 0
AND unresolved_migration_requirements = 0
AND unresolved_deprecation_requirements = 0
AND changelog_identity_is_current = true
```

No constituye changelog suficiente:

- una sección vacía creada solo para satisfacer el gate;
- una lista de hashes de commit sin explicación del cambio;
- un resumen genérico como “actualizaciones” o “mejoras” sin superficie o evidencia;
- una entrada de otro package reutilizada por coincidencia de commit;
- una release con artefacto distribuible distinto pero sin registros de cambio;
- un conjunto de registros que omite deliberadamente una ruptura conocida;
- una narrativa creada después de publicar para justificar retrospectivamente una release que carecía de material exigible.

#### 15. Selección de base de comparación

La base pertenece al mismo package y nunca se comparte por lockstep entre familias.

Para una release estable:

- la base ordinaria es la release estable inmediatamente anterior de esa familia;
- la primera estable usa base nula declarada;
- el cambio narrado representa el delta distribuible completo contra esa base estable.

Para una prerelease:

- se conserva como referencia la estable objetivo inmediatamente anterior;
- se registra además la prerelease inmediatamente anterior de la misma serie cuando exista;
- las notas incrementales pueden explicar el delta desde la prerelease previa;
- la release estable final vuelve a representar el delta completo desde la estable anterior, no solo desde la última `rc`.

Una base de otro package, otra línea o una identidad mutable invalida el candidato.

#### 16. Preparación y finalización

El flujo de CI004 tendrá dos fases lógicas sin duplicar implementación:

```text
PREPARE
→ valida change set
→ genera narrativa determinista
→ calcula changelog_identity
→ produce release notes candidatas
→ entrega identidad a CI003

CI003
→ verifica lineage y publica o simula la release inmutable

FINALIZE
→ consume la identidad de release resultante
→ vincula exactamente la narrativa ya preparada
→ incorpora la entrada una sola vez al historial del package
→ conserva evidencia final
```

La fase `FINALIZE` no puede cambiar el contenido sustantivo preparado para hacer coincidir una release ya publicada. Si el contenido necesita cambiar, el candidato deja de ser el mismo y debe volver por los gates aplicables antes de publicar.

Si CI003 no completa la release, el material preparado puede conservarse como evidencia de intento, pero no se incorpora como historia publicada.

#### 17. Historial humano por package

Cada package materializado deberá conservar un único historial humano `CHANGELOG.md` junto a su manifest canónico.

El historial tendrá:

```text
# Changelog — nombre exacto del package

## versión SemVer exacta

### secciones aplicables en orden canónico
- entradas deterministas y trazables
```

Reglas:

1. una entrada corresponde a un único `package_name + release_version`;
2. la versión se escribe exactamente como en el manifest y la release;
3. el historial de una familia no contiene entradas de otra;
4. una release publicada no pierde su entrada histórica;
5. una corrección narrativa posterior se documenta mediante una release posterior o nota de corrección trazable, sin reescribir silenciosamente la historia publicada;
6. una regeneración del historial desde la misma evidencia debe producir los mismos bytes normalizados;
7. UTF-8 y LF serán la representación normalizada usada para identidad y autocertificación.

La ubicación física concreta de familias aún no materializadas se resolverá desde el package real y su manifest en la futura instancia; CI004 no crea carpetas ficticias durante este marcador.

#### 18. Release notes

Las release notes se derivan del mismo change set y de la misma entrada normalizada del changelog.

Deberán incluir, según aplique:

- package y versión exactos;
- resumen de cambios distribuibles;
- breaking changes;
- adiciones, cambios y correcciones;
- deprecaciones con `DEP-*`;
- retiros;
- avisos de seguridad publicables;
- acciones de migración;
- referencias de procedencia permitidas.

No se permitirá que las release notes declaren una ruptura, deprecación, migración o alcance que el change set no contenga, ni que el changelog omita una obligación presente en las release notes.

#### 19. Determinismo e identidad criptográfica

La serialización de CI004 deberá ser reproducible.

Como mínimo:

1. objetos machine-readable usan orden canónico de claves;
2. colecciones se ordenan mediante claves contractuales explícitas;
3. los registros se ordenan por sección derivada y `change_record_id`;
4. se normalizan saltos de línea a LF para cálculo de identidad;
5. la codificación es UTF-8;
6. no participan rutas absolutas, usuario local, locale, reloj de pared ni timezone en la identidad narrativa;
7. timestamps operativos pueden existir en evidencia, pero no alteran la identidad del mismo contenido;
8. la misma entrada lógica produce los mismos bytes y el mismo digest.

`changelog_identity` será una identidad `sha256` del payload canónico que vincule, como mínimo:

```text
package_name
release_version
source_commit
base_release_identity
change_set_identity
rendered_changelog_entry_identity
release_notes_identity
```

La identidad del ejecutable que generó el material se conserva por separado como evidencia y no convierte en contenido diferente una narrativa byte-idéntica.

#### 20. Inmutabilidad del historial

Después de que CI003 publique una identidad `package + version` y CI004 la finalice:

- la entrada histórica no se elimina;
- la entrada no se reasocia a otra versión;
- no se cambia su package;
- no se cambia su `source_commit`;
- no se sustituye el change set por otro;
- no se rebaja ni oculta una ruptura;
- no se elimina un `DEP-*` para acortar una ventana;
- no se reescribe el texto para aparentar que la release contenía otra conducta.

Una corrección exige una nueva evidencia y, cuando afecta el package distribuido, otra versión conforme a SemVer.

#### 21. Integración con CI003 — releases versionados

CI004 produce el material que CI003 consume, pero CI003 conserva autoridad sobre publicación e identidad de release.

Para toda publicación real con cambio distribuible, el contrato de release deberá declarar:

```text
changelog_required = true
changelog_identity = identidad vigente producida por CI004
```

La identidad deberá corresponder exactamente al mismo:

- package;
- versión;
- source commit;
- manifest candidato;
- base de release aplicable;
- change set.

CI003 no genera ni corrige el changelog. Un `changelog_identity` ausente, stale o perteneciente a otra unidad bloquea la publicación aplicable.

CI004, a su vez, no crea tags, releases ni publicaciones en registry.

#### 22. Deprecaciones y expedientes `DEP-*`

Una deprecación estable deberá proyectarse obligatoriamente bajo `Deprecated` y conservar al menos:

- `deprecation_id` exacto;
- superficie afectada;
- versión que anuncia la deprecación;
- motivo;
- reemplazo soportado o decisión explícita sin reemplazo;
- versión mínima del reemplazo cuando aplique;
- referencia de migración;
- fecha de elegibilidad documentada por el expediente;
- relación con consumidores y compatibilidad cuando exista evidencia disponible.

La ventana ordinaria de 90 días no inicia por crear un borrador de change set. Inicia cuando una release estable completa publica coherentemente la deprecación, changelog, release notes y señales obligatorias de su expediente.

El retiro posterior deberá conservar el mismo `DEP-*`, aparecer bajo `Removed`, usar la clasificación SemVer correspondiente y enlazar la evidencia de cierre. CI004 no decide por sí solo que una superficie ya es elegible para retiro.

#### 23. Breaking changes y migración

Todo breaking change estable deberá:

1. declarar `breaking_change = true`;
2. usar impacto `MAJOR`;
3. identificar las superficies públicas afectadas;
4. explicar el comportamiento anterior y el nuevo sin ambigüedad;
5. declarar acción de consumidor;
6. incluir `migration_reference` resoluble;
7. aparecer en `Breaking changes`;
8. aparecer también en `Migration` cuando exista una acción concreta;
9. conservar evidencia suficiente para que CI005 evalúe compatibilidad.

La existencia de una guía no convierte un cambio incompatible en compatible.

#### 24. Seguridad y contenido sensible

Los cambios de seguridad deberán narrarse sin exponer secretos ni material que incremente innecesariamente el riesgo.

`security_visibility` controla la proyección:

- `PUBLIC`: el detalle autorizado puede aparecer en changelog y release notes;
- `RESTRICTED`: la narrativa pública se limita al impacto y acción segura permitidos, mientras la evidencia enlaza una referencia protegida;
- `NOT_APPLICABLE`: el cambio no pertenece a seguridad.

Nunca se incluirán tokens, credenciales, cookies, claves privadas, secretos, dumps sensibles ni valores de entorno dentro del changelog, release notes o evidencia de CI004.

La redacción no podrá ocultar una acción obligatoria de actualización, mitigación o migración que un consumidor necesite conocer.

#### 25. Cortes coordinados multi-package

Cuando un corte incluya varias familias:

1. cada package conserva su propio change set;
2. cada package conserva su propio changelog y release notes;
3. cada package conserva su propio SemVer e identidad;
4. un package sin cambio distribuible no recibe una entrada ni versión artificial;
5. una actualización de dependencia interna exacta se registra en el package dependiente cuando modifica su manifest distribuido;
6. el orden de publicación sigue perteneciendo a CI003;
7. el veredicto de compatibilidad sigue perteneciendo a CI005;
8. el fallo de una familia no autoriza declarar completo el changelog de otra release no publicada.

Un mismo commit puede originar varias narrativas independientes, pero nunca una identidad de changelog global que sustituya las identidades por package y versión.

#### 26. Prereleases

Las versiones `alpha`, `beta` y `rc` conservarán narrativa propia e identidad propia.

Reglas:

- una prerelease se identifica explícitamente como no estable;
- no inicia por sí sola la ventana ordinaria de deprecación de una superficie estable;
- una ruptura presente solo en prerelease debe declararse en sus release notes;
- la historia de prereleases no se presenta como garantía de API estable;
- la release estable final resume el delta completo desde la estable anterior;
- una prerelease retirada o reemplazada no se borra de la historia si fue publicada;
- la misma versión prerelease no puede recibir otro change set después de publicarse.

#### 27. Cambios `NO_RELEASE`

Un cambio clasificado `NO_RELEASE` no crea una entrada publicada de changelog ni autoriza una nueva versión.

Ejemplos heredados de la política SemVer incluyen:

- documentación fuera del tarball sin cambio distribuible;
- tests sin cambio del output del package;
- regeneración de tipos con output idéntico.

CI004 podrá conservar evidencia interna de que esos cambios fueron evaluados, pero el resultado de narrativa de release será `NOT_APPLICABLE` mientras no exista cambio distribuible.

Si el manifest, tarball u otro contenido distribuido cambia materialmente, no podrá mantenerse `NO_RELEASE` por conveniencia.

#### 28. Trazabilidad de requisitos y evidencia

Los registros podrán conservar `treq_refs` para enlazar requisitos afectados por el cambio.

La proyección pública no está obligada a mostrar identificadores internos de prueba, pero la evidencia machine-readable deberá preservar la relación cuando exista para permitir:

- reconstruir por qué una release cambió;
- vincular pruebas y gates aplicables;
- demostrar qué requisitos fueron afectados;
- evitar que una narrativa pública sustituya la evidencia técnica.

Una lista de requisitos no sustituye la descripción del cambio y una descripción del cambio no sustituye resultados de prueba.

#### 29. Invalidation y evidencia stale

El material preparado deja de certificar un candidato si cambia de forma material cualquiera de estos elementos antes de publicar:

- package;
- versión;
- source commit;
- manifest;
- release base;
- clasificación SemVer;
- change set;
- superficie pública afectada;
- estado de breaking change;
- obligación de migración;
- expediente de deprecación;
- contenido publicable de seguridad;
- identidad del artefacto distribuible que demuestra si existe cambio.

Después de publicar, el material histórico se conserva como evidencia de esa identidad. Un cambio posterior genera otro candidato y no edita el anterior.

#### 30. Estados y fallo seguro

El habilitador reutilizará la semántica común:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` únicamente cuando se haya demostrado ausencia de release distribuible para la unidad evaluada.

Una narrativa certificable solo se satisface con `PASS`.

Un resultado parcial, ambiguo, stale, cancelado, sin change set o con conflicto de identidad no podrá normalizarse a `PASS`.

#### 31. Casos positivos obligatorios del habilitador

`SHELL-CI-004::GLOBAL` deberá demostrar, como mínimo:

1. release `PATCH` sintética con corrección compatible → changelog y release notes deterministas;
2. release `MINOR` con capacidad aditiva → categoría y SemVer coherentes;
3. release `MAJOR` con breaking change y guía → secciones `Breaking changes` y `Migration` completas;
4. deprecación estable con expediente `DEP-*` completo → sección `Deprecated` y referencias coherentes;
5. prerelease válida → narrativa identificada como no estable sin iniciar ventana ordinaria;
6. corte coordinado con dos packages cambiados y uno sin cambio → dos narrativas independientes y ninguna entrada artificial;
7. repetición exacta del mismo candidato → mismo `changelog_identity` y mismos bytes normalizados;
8. finalización contra evidencia sintética de CI003 exacta → incorporación idempotente al historial sin reescritura.

#### 32. Casos negativos obligatorios del habilitador

`SHELL-CI-004::GLOBAL` deberá bloquear, como mínimo:

1. package fuera del universo aprobado;
2. versión ausente o SemVer inválido;
3. versión distinta a la del manifest candidato;
4. source commit ausente o incompatible;
5. release base perteneciente a otro package;
6. cambio distribuible con change set vacío;
7. artefacto distribuible cambiado sin registro narrativo suficiente;
8. registro de otro package dentro del candidato;
9. `change_record_id` duplicado;
10. categoría no permitida;
11. intento de inferir el impacto exclusivamente desde commits sin clasificación estructurada;
12. breaking change estable declarado como `PATCH` o `MINOR`;
13. retiro de superficie estable sin impacto `MAJOR`;
14. deprecación estable sin expediente `DEP-*` resoluble;
15. migración obligatoria sin referencia de migración;
16. `NO_RELEASE` con contenido distribuible materialmente distinto;
17. changelog de una versión ya publicada regenerado con contenido distinto;
18. release notes que añaden u omiten una obligación respecto del change set;
19. contenido sensible detectado en narrativa o evidencia;
20. identidad CI003 final incompatible con package, versión, commit o changelog preparado.

#### 33. Regresiones del habilitador global

La implementación única deberá proteger, como mínimo:

1. orden distinto de objetos JSON produciendo un digest distinto para el mismo contenido lógico;
2. orden del filesystem alterando la narrativa;
3. locale o timezone alterando los bytes del mismo candidato;
4. CRLF frente a LF alterando la identidad lógica normalizada;
5. secciones vacías apareciendo de forma no determinista;
6. registros duplicados inflando el changelog;
7. entrada histórica eliminada durante regeneración completa;
8. contenido de un package filtrándose al changelog de otro;
9. prerelease presentada como estable;
10. detalle restringido de seguridad apareciendo en salida pública;
11. cambio `NO_RELEASE` recibiendo versión o entrada publicada;
12. `DEP-*` eliminado de una narrativa histórica para acortar una ventana;
13. breaking change degradado por reordenar o editar registros;
14. reintento de finalización duplicando una entrada ya correcta;
15. segunda implementación del habilitador dentro de un package;
16. cambio de algoritmo de render que reescribe silenciosamente releases históricas.

#### 34. Criterios de materialización de `SHELL-CI-004::GLOBAL`

La instancia física podrá declararse materializada únicamente cuando:

1. exista una sola implementación transversal en `vento-shell`;
2. reconozca exactamente las cuatro familias aprobadas;
3. valide una fuente estructurada de cambios;
4. no derive SemVer únicamente desde commits o títulos de PR;
5. diferencie cambio distribuible y `NO_RELEASE`;
6. produzca changelog humano por package y versión;
7. produzca release notes desde la misma fuente;
8. calcule identidades deterministas e independientes por release;
9. entregue `changelog_identity` consumible por CI003;
10. permita enlazar la finalización con evidencia exacta de CI003;
11. preserve historial inmutable después de publicación;
12. represente breaking changes y migraciones sin degradar SemVer;
13. represente deprecaciones con expedientes `DEP-*`;
14. proteja contenido sensible;
15. soporte prereleases sin confundirlas con estable;
16. soporte cortes multi-package sin lockstep artificial;
17. sea idempotente ante repetición exacta;
18. sea fail-closed ante cambio, omisión o conflicto de identidad;
19. produzca evidencia machine-readable atribuible e invalidable;
20. proteja todos los casos positivos, negativos y regresiones definidos;
21. no implemente compatibilidad ni modificación de consumidores;
22. no requiera una publicación productiva para autocertificarse.

#### 35. Recuperación y consistencia del historial

La recuperación de CI004 deberá proteger primero la historia ya publicada.

Reglas:

1. la generación de una nueva entrada no modifica versiones históricas;
2. una escritura parcial del historial no puede considerarse `PASS`;
3. antes de finalizar se verifica que la historia observada coincide con la evidencia esperada;
4. un reintento exacto no duplica la entrada;
5. una divergencia histórica produce `BLOCKED`, no sobrescritura automática;
6. una corrección de contenido se entrega mediante una nueva unidad de cambio trazable;
7. la recuperación conserva causa, candidato, identidades antes y después y resultado;
8. un fallo de CI004 no mueve tags, releases ni artefactos administrados por CI003.

#### 36. Estado documental de las cuatro familias

| Package             | Changelog automático materializado | Estado actual para CI004                                   | Condición antes de una narrativa real de release                        |
| ------------------- | ---------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| `@vento/contracts`  | No                                 | familia gobernada; package físico estable no observado     | materializar candidato y change set atribuible                          |
| `@vento/os-context` | No                                 | workspace físico transitorio; no se observó `CHANGELOG.md` | disponer de candidato distribuible elegible y clasificación aprobada    |
| `@vento/supabase`   | No                                 | familia gobernada; package físico estable no observado     | materializar package sin confundir changelog con migraciones de base    |
| `@vento/ui-web`     | No                                 | familia gobernada; package físico estable no observado     | materializar package y describir también superficie UI pública afectada |

**Conciliación:** 4 familias esperadas, 4 gobernadas, 0 habilitadores duplicados confirmados, 0 changelogs automáticos materializados y 0 familias omitidas.

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** la obligación de trazabilidad de release, changelog, deprecación, migración, compatibilidad y conservación histórica ya está protegida por requisitos vigentes. CI004 materializa el contrato ejecutable de esa cobertura sin introducir una nueva regla empresarial, un nuevo riesgo independiente ni una nueva obligación que requiera otra fila del registro.

#### 38. Cobertura de prueba vigente reutilizada

La cobertura existente se conserva sin modificación:

- `TREQ-SHELL-006` mantiene las pruebas propias y la compatibilidad antes de publicar o adoptar packages compartidos;
- `TREQ-SHELL-008` exige evidencia reproducible y declaración de requisitos afectados por package y PR;
- `TREQ-SHELL-036` protege la correspondencia inmutable entre package, SemVer, manifest, tag, release, commit, canal, tarball e integridad y asigna participación a CI004;
- `TREQ-SHELL-038` exige que una deprecación conserve changelog, guía, SemVer, ventana, consumidores y evidencia atribuible;
- `TREQ-SHELL-039` mantiene retiro y fin de soporte bloqueados hasta resolver consumidores, compatibilidad, pruebas, rollback y conservación histórica.

Estas referencias expresan únicamente trazabilidad de cobertura vigente.

#### 39. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                      |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | El marcador documental no materializa `SHELL-CI-004::GLOBAL`, no crea tooling y no genera changelogs de packages.                                                                                              |
| LOCAL     | NOT_EXECUTED   | El artefacto se entrega para revisión; todavía no ha sido insertado ni validado mediante los scripts del checkout del usuario.                                                                                 |
| REMOTA    | PASS           | Se verificaron continuidad, topología, archivo propietario, CI003 `VERIFIED`, el release gate vigente, la línea base del workspace, ausencia de changelog físico en `@vento/os-context` y cobertura aplicable. |
| OPERATIVA | NOT_EXECUTED   | No se generaron release notes, changelogs ni releases reales o sintéticas durante este marcador.                                                                                                               |
| FÍSICA    | NOT_APPLICABLE | La materialización pertenece a la futura instancia `SHELL-CI-004::GLOBAL` después de aprobación documental y autorización explícita.                                                                           |

#### 40. Criterios de aceptación

`SHELL-CI-004` queda documentalmente completa cuando:

- identifica la topología `GLOBAL_ENABLE_ONCE` y la futura instancia `SHELL-CI-004::GLOBAL`;
- conserva exactamente las cuatro familias aprobadas;
- define el change set estructurado como fuente autoritativa;
- prohíbe inferir SemVer únicamente desde commits o texto de PR;
- define una unidad exacta de changelog por package, versión, commit y base;
- define seis categorías de cambio y el orden de proyección humana;
- distingue breaking changes y migraciones como obligaciones derivadas;
- distingue release distribuible de `NO_RELEASE`;
- define base estable y tratamiento de prereleases;
- define las fases lógicas `PREPARE` y `FINALIZE` sin duplicar implementación;
- exige un historial `CHANGELOG.md` por package materializado;
- deriva release notes desde la misma fuente que el changelog;
- define determinismo, normalización e identidad criptográfica;
- impide reescritura de una entrada correspondiente a una release publicada;
- hace obligatorio un `changelog_identity` vigente para toda publicación real con cambio distribuible;
- integra deprecaciones `DEP-*`, breaking changes, migración y seguridad;
- conserva versiones independientes durante cortes coordinados;
- define 8 casos positivos, 20 negativos y 16 regresiones obligatorias;
- define recuperación idempotente y fail-closed;
- concilia 4/4 familias sin afirmar changelogs inexistentes;
- no modifica código, packages, changelogs, workflows, registry, consumidores, Supabase ni 04A durante el marcador;
- no crea ni modifica requisitos de prueba.

#### 41. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-004::GLOBAL` durante el marcador;
- crea scripts, workflows o configuración de automatización;
- crea físicamente `CHANGELOG.md` en packages;
- materializa packages ausentes;
- modifica manifests o versiones;
- decide una versión SemVer sustituyendo la política propietaria;
- genera una release real;
- crea o mueve tags Git;
- crea o modifica releases remotas;
- publica en registry;
- modifica la implementación de CI003;
- ejecuta pruebas propias reservadas a CI001;
- reconstruye artefactos reservados a CI002;
- certifica compatibilidad reservada a CI005;
- modifica manifests o lockfiles de consumidores;
- abre PR reservados a CI006;
- crea un expediente de deprecación real sin la decisión propietaria correspondiente;
- retira superficies públicas o líneas MAJOR;
- ejecuta despliegues;
- ejecuta cambios de Supabase;
- crea, modifica, difiere, descarta o vuelve obsoletos requisitos del registro 04A.

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-CI-003 — Crear releases versionados`

**TAREA ACTUAL APROBADA**
`SHELL-CI-004 — Crear changelog automático`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-005 — Crear matriz de compatibilidad`


### ✅ SHELL-CI-005 — Crear matriz de compatibilidad

**Estado:** APROBADA
**Tarea anterior:** SHELL-CI-004 — Crear changelog automático
**Tarea siguiente:** SHELL-CI-006 — Crear actualización de consumidores mediante PR
**Tipo de tarea:** Habilitador global único — contrato documental de matriz ejecutable de compatibilidad package–consumidor, targets y evidencia pre-release
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que materializará y certificará la **matriz de compatibilidad package–consumidor** de Vento OS antes de publicar o adoptar una versión compartida, preservando la identidad exacta del package, del artefacto candidato, del consumidor, del lockfile, del toolchain, del target y de la evidencia ejecutada.

La regla vinculante queda fijada así:

```text
PACKAGE CANÓNICO
+ VERSIÓN EXACTA
+ ARTEFACTO CANDIDATO E INTEGRIDAD
+ COMMIT DE ORIGEN
+ CONSUMIDOR EXACTO
+ COMMIT DEL CONSUMIDOR
+ MANIFEST Y LOCKFILE DEL CONSUMIDOR
+ VERSIONES RESUELTAS DEL TOOLCHAIN
+ TARGET / RENDERER APLICABLE
+ EJES OBLIGATORIOS EJECUTADOS
+ EVIDENCIA VIGENTE
= COMBINACIÓN ELEGIBLE PARA DECLARACIÓN DE COMPATIBILIDAD
```

Y, de forma fail-closed:

```text
RANGO DECLARADO SIN EJECUCIÓN
O EVIDENCIA DE OTRO CONSUMIDOR
O LOCKFILE DISTINTO
O TOOLCHAIN NO RESUELTO
O EJE OBLIGATORIO AUSENTE
O RESULTADO STALE
O CONSUMIDOR O TARGET OMITIDO
O RESTRICCIÓN QUE OCULTA UNA RUPTURA
≠ COMPATIBLE
```

Esta tarea no modifica packages, consumidores, workflows ni releases. Define el contrato que `SHELL-CI-005::GLOBAL` deberá materializar y certificar una sola vez y que las releases posteriores reutilizarán sin duplicar el habilitador.

#### 2. Resultado canónico

`SHELL-CI-005` establece un único contrato transversal para:

1. materializar la política aprobada en `SHELL-PKG-004` como matriz ejecutable;
2. conservar las 28 relaciones web base con sus identificadores canónicos;
3. evaluar exactamente las cuatro familias compartidas aprobadas;
4. evaluar los doce ejes de compatibilidad aplicables;
5. diferenciar banda candidata, combinación verificada y banda soportada;
6. conservar los seis estados canónicos de relación;
7. impedir que ausencia de prueba o de adopción se convierta en compatibilidad;
8. consumir evidencia vigente de pruebas propias y build del package;
9. ejecutar perfiles consumer-driven contra commits, manifests y lockfiles exactos;
10. registrar versiones realmente resueltas, no solo rangos declarados;
11. soportar consumidores o targets adicionales únicamente mediante bindings explícitos de contratos propietarios ya aprobados;
12. conservar separada la matriz web base de cualquier extensión nativa o multiplataforma;
13. producir una identidad criptográfica determinista de compatibilidad;
14. entregar esa identidad al contrato de release de CI003 antes de publicación;
15. enlazar posteriormente el resultado preparado con la identidad inmutable de release sin reescribir la matriz;
16. conservar historial de evaluaciones, invalidaciones y restricciones;
17. soportar prereleases con pilotos explícitos sin prometer soporte general;
18. soportar cortes multi-package con matrices independientes;
19. invalidar evidencia cuando cambie cualquier entrada material;
20. preservar la frontera entre compatibilidad, publicación y modificación de consumidores.

#### 3. Base vinculante

La definición conserva las decisiones ya aprobadas de distribución, versionado, release, changelog, compatibilidad, deprecación y fundación compartida:

- packages npm privados e inmutables producidos desde `vento-shell`;
- cuatro familias compartidas: `@vento/contracts`, `@vento/os-context`, `@vento/supabase` y `@vento/ui-web`;
- versionado SemVer independiente por package;
- versiones exactas y lockfile en consumidores;
- siete consumidores web base;
- 28 relaciones package–consumidor aplicables por diseño;
- doce ejes obligatorios de compatibilidad;
- seis estados canónicos;
- evidencia atribuible a una combinación exacta;
- banda candidata distinta de banda soportada;
- adopción independiente por repositorio;
- identidad inmutable de release;
- changelog y release notes derivados de change set estructurado;
- deprecaciones y retiros ligados a inventario de consumidores y matriz vigente;
- ausencia de prueba como `PENDIENTE_DE_EVIDENCIA`, nunca como `COMPATIBLE`;
- prohibición de inferir compatibilidad desde `peerDependencies`, rango SemVer, build aislado o similitud de stack.

#### 4. Topología de trabajo

`PHASE-03-T-CI-FOUNDATION` aplica `GLOBAL_ENABLE_ONCE` a `SHELL-CI-005`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-005
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-005::GLOBAL
→ materializa y autocertifica el habilitador una sola vez

RELEASES Y ADOPCIONES POSTERIORES
→ reutilizan el habilitador certificado
→ producen evidencia propia por combinación
→ no crean otra implementación de CI005
```

La autocertificación global podrá utilizar repositorios, manifests, lockfiles, packages y targets sintéticos o aislados. No necesita publicar una release real ni modificar consumidores reales.

#### 5. Frontera con el mini-bloque

| Responsabilidad                                                               | Propietario    |
| ----------------------------------------------------------------------------- | -------------- |
| pruebas propias del package                                                   | `SHELL-CI-001` |
| build, exports, declarations, empaquetado e identidad del artefacto candidato | `SHELL-CI-002` |
| identidad inmutable y publicación de release                                  | `SHELL-CI-003` |
| changelog, release notes y narrativa automática                               | `SHELL-CI-004` |
| matriz y veredicto de compatibilidad package–consumidor                       | `SHELL-CI-005` |
| modificación del consumidor y PR de adopción                                  | `SHELL-CI-006` |

CI005 consume identidades y evidencia de CI001, CI002 y CI004 y entrega una identidad de compatibilidad consumible por CI003. No reconstruye el package, no crea tags o releases, no modifica el changelog y no cambia manifests o lockfiles reales de consumidores.

#### 6. Universo base gobernado

La matriz web base conserva exactamente:

**Packages**

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

**Consumidores web**

1. `vento-shell`;
2. `vento-viso`;
3. `vento-nexo`;
4. `vento-fogo`;
5. `vento-origo`;
6. `vento-pulso`;
7. `vento-numera`.

Resultado:

```text
4 packages × 7 consumidores web = 28 relaciones base
```

Las 28 relaciones son aplicables por diseño y ninguna puede eliminarse, renumerarse o declararse `NO_APLICA` por ausencia temporal de adopción.

PASS, ANIMA, TALENTO y otras superficies móviles o nativas no se incorporan a estas 28 relaciones por inferencia.

#### 7. Extensiones declaradas de consumidor y target

Las decisiones posteriores a `SHELL-PKG-004` pueden exigir compatibilidad para consumidores o targets fuera de la matriz web base, incluido un target Expo/React Native cuando un contrato aprobado lo declare consumidor de una unidad compartida.

CI005 soportará esas extensiones sin alterar la matriz histórica:

```text
MATRIZ WEB BASE
→ 28 relaciones PKG-COMP-MX-001..028
→ identidad y cardinalidad inmutables

BINDINGS ADICIONALES
→ solo desde contrato propietario aprobado
→ conservan su identidad propietaria
→ no reciben un PKG-COMP-MX inventado
→ pueden declarar repository + target + renderer_class + package/unit
```

Una extensión será elegible únicamente si aporta una identidad resoluble de binding, contrato propietario, package o unidad consumida, repositorio, target, renderer y perfil de pruebas.

La mera existencia de un repositorio, plataforma o dependencia no crea una extensión.

#### 8. Línea base física observada

En el corte remoto vigente:

- `SHELL-CI-001::GLOBAL`, `SHELL-CI-002::GLOBAL`, `SHELL-CI-003::GLOBAL` y `SHELL-CI-004::GLOBAL` están materializados y `VERIFIED`;
- CI003 ya reconoce `compatibility_required` y exige `compatibility_evidence_identity` cuando la compatibilidad es requerida;
- CI004 ya produce material de changelog determinista y enlazable a CI003;
- no se observó un habilitador físico de compatibilidad package–consumidor ya materializado;
- `@vento/os-context@0.1.0` continúa como workspace privado y transitorio, exportando `src/index.ts`;
- su peer `@supabase/supabase-js >=2.90.0` continúa sin límite superior `<3`;
- `vento-shell` declara Node `24.19.0` y npm `11.17.0`;
- `vento-viso`, `vento-nexo`, `vento-fogo`, `vento-origo`, `vento-pulso` y `vento-numera` no declaran todavía `engines.node` en sus manifests observados;
- los siete consumidores web conservan React y React DOM `19.2.3`;
- los siete consumidores web declaran Supabase JS `^2.90.1` y Supabase SSR `^0.8.0`;
- las especificaciones de Next observadas siguen entre `16.1.1` y `^16.2.4`;
- ninguno de los siete manifests web observados declara todavía una dependencia publicada `@vento/*`;
- ANIMA utiliza Expo/React Native y no pertenece a la matriz web base.

Por tanto, las 28 relaciones base permanecen `PENDIENTE_DE_EVIDENCIA`. La similitud de versiones no constituye evidencia ejecutada.

#### 9. Unidad exacta de compatibilidad

Cada evaluación se atribuirá, como mínimo, a:

```text
package_name
package_version
package_source_commit
package_manifest_identity
artifact_content_identity
artifact_integrity
consumer_repository
consumer_commit
consumer_manifest_identity
consumer_lockfile_identity
resolved_versions
environment_identity
target_identity
renderer_class
compatibility_profile_identity
axis_set_identity
run_identity
```

Para relaciones web base, `target_identity` será el target web realmente ejecutado por el consumidor.

Para bindings adicionales, `target_identity` y `renderer_class` provendrán del contrato propietario.

Cambiar cualquiera de estas dimensiones materiales invalida la reutilización del resultado anterior.

#### 10. Perfiles canónicos por package

| ID             | Package             | Banda candidata inicial                                                                                                 | Obligaciones principales                                              | Dependencias o acoplamientos prohibidos                          |
| -------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `COMP-PKG-001` | `@vento/contracts`  | TypeScript `>=5 <6`; ESM y declarations consumibles                                                                     | exports, schemas, tipos, catálogos, códigos y serialización           | Next, React, Supabase, Tailwind o APIs de navegador              |
| `COMP-PKG-002` | `@vento/os-context` | TypeScript `>=5 <6`; Supabase JS `>=2.90.0 <3`                                                                          | contexto efectivo, autorización, browser/server, razones y errores    | React, UI, Tailwind o acoplamiento a una aplicación              |
| `COMP-PKG-003` | `@vento/supabase`   | TypeScript `>=5 <6`; Supabase JS `>=2.90.1 <3`; Supabase SSR `>=0.8.0 <0.9`; adapter Next `>=16.1.1 <17` cuando aplique | tipos `Database`, cliente browser/server, cookies, RPC, errores y SSR | componentes UI o reglas de negocio de aplicación                 |
| `COMP-PKG-004` | `@vento/ui-web`     | TypeScript `>=5 <6`; Next `>=16.1.1 <17`; React y React DOM `>=19.2.3 <20`; Tailwind `>=4 <5`                           | SSR, hydration, props, eventos, DOM, accesibilidad, tokens y CSS      | acceso directo a datos, permisos efectivos o procesos de dominio |

Reglas adicionales:

1. React y React DOM forman una pareja de compatibilidad;
2. una banda de Next no autoriza APIs privadas o experimentales no cubiertas por pruebas;
3. un adapter específico de framework usa un subpath explícito;
4. dependencias internas `@vento/*` permanecen exactas;
5. peers externos tienen límite superior de major, o de minor para dependencias `0.x`;
6. `@vento/os-context` no puede certificar estable con Supabase JS abierto a major `3`;
7. una banda no es soportada mientras no exista evidencia sobre sus extremos y combinaciones efectivas.

#### 11. Doce ejes obligatorios

| ID              | Eje                        | Evidencia mínima                                                                             |
| --------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| `COMP-AXIS-001` | instalación reproducible   | instalación limpia con manifest y lockfile coherentes, sin regeneración silenciosa           |
| `COMP-AXIS-002` | identidad del artefacto    | package, versión, identidad del candidato, integridad, commit y contenido coincidentes       |
| `COMP-AXIS-003` | exports y módulos          | imports públicos, subpaths, ESM, tree-shaking y ausencia de imports internos no soportados   |
| `COMP-AXIS-004` | TypeScript                 | declarations consumibles y typecheck de package y consumidor sin ocultar rupturas            |
| `COMP-AXIS-005` | runtime y Node             | runtime declarado, runtime ejecutado, APIs de plataforma y ambiente compatibles              |
| `COMP-AXIS-006` | Next y SSR                 | build, Server Components, client boundaries, cookies, middleware/proxy y SSR aplicables      |
| `COMP-AXIS-007` | React e hidratación        | render server/client, hydration, hooks, contextos y pareja React/React DOM coherente         |
| `COMP-AXIS-008` | Supabase                   | clientes browser/server, sesión, cookies, tipos generados, RPC y errores normalizados        |
| `COMP-AXIS-009` | contratos y comportamiento | schemas, catálogos, códigos, serialización, errores y semántica observable                   |
| `COMP-AXIS-010` | contexto y autorización    | identidad real, contexto operativo, simulación, dispositivo, razones y denegaciones          |
| `COMP-AXIS-011` | UI, CSS y accesibilidad    | props, eventos, DOM, foco, teclado, lectores, tokens, estilos y composición                  |
| `COMP-AXIS-012` | consumidor                 | lint, typecheck, build, pruebas contractuales, integración, regresión y smoke/E2E aplicables |

Un eje puede quedar `NOT_APPLICABLE` únicamente con justificación machine-readable atribuible a package, consumidor y target. La ausencia de implementación o prueba no constituye no-aplicabilidad.

#### 12. Estados de relación y transiciones

Los estados de compatibilidad permanecen exactamente:

1. `NO_APLICA`;
2. `PENDIENTE_DE_EVIDENCIA`;
3. `COMPATIBLE`;
4. `COMPATIBLE_CON_RESTRICCIONES`;
5. `INCOMPATIBLE`;
6. `BLOQUEADA`.

Para las 28 relaciones base, la aplicabilidad ya está aprobada; por tanto, su estado inicial es `PENDIENTE_DE_EVIDENCIA`.

Transiciones permitidas:

```text
PENDIENTE_DE_EVIDENCIA → COMPATIBLE
PENDIENTE_DE_EVIDENCIA → COMPATIBLE_CON_RESTRICCIONES
PENDIENTE_DE_EVIDENCIA → INCOMPATIBLE
PENDIENTE_DE_EVIDENCIA → BLOQUEADA
BLOQUEADA → PENDIENTE_DE_EVIDENCIA
INCOMPATIBLE → PENDIENTE_DE_EVIDENCIA
COMPATIBLE → PENDIENTE_DE_EVIDENCIA
COMPATIBLE_CON_RESTRICCIONES → PENDIENTE_DE_EVIDENCIA
NO_APLICA → PENDIENTE_DE_EVIDENCIA
```

Un cambio material invalida primero hacia `PENDIENTE_DE_EVIDENCIA`; una ejecución nueva decide el siguiente estado. No se salta directamente de un resultado histórico a otro sin una nueva evaluación atribuible.

#### 13. Matriz web base de 28 relaciones

| ID                | Package             | Consumidor     | Aplicabilidad | Estado inicial           |
| ----------------- | ------------------- | -------------- | ------------- | ------------------------ |
| `PKG-COMP-MX-001` | `@vento/contracts`  | `vento-shell`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-002` | `@vento/contracts`  | `vento-viso`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-003` | `@vento/contracts`  | `vento-nexo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-004` | `@vento/contracts`  | `vento-fogo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-005` | `@vento/contracts`  | `vento-origo`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-006` | `@vento/contracts`  | `vento-pulso`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-007` | `@vento/contracts`  | `vento-numera` | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-008` | `@vento/os-context` | `vento-shell`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-009` | `@vento/os-context` | `vento-viso`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-010` | `@vento/os-context` | `vento-nexo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-011` | `@vento/os-context` | `vento-fogo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-012` | `@vento/os-context` | `vento-origo`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-013` | `@vento/os-context` | `vento-pulso`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-014` | `@vento/os-context` | `vento-numera` | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-015` | `@vento/supabase`   | `vento-shell`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-016` | `@vento/supabase`   | `vento-viso`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-017` | `@vento/supabase`   | `vento-nexo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-018` | `@vento/supabase`   | `vento-fogo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-019` | `@vento/supabase`   | `vento-origo`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-020` | `@vento/supabase`   | `vento-pulso`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-021` | `@vento/supabase`   | `vento-numera` | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-022` | `@vento/ui-web`     | `vento-shell`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-023` | `@vento/ui-web`     | `vento-viso`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-024` | `@vento/ui-web`     | `vento-nexo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-025` | `@vento/ui-web`     | `vento-fogo`   | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-026` | `@vento/ui-web`     | `vento-origo`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-027` | `@vento/ui-web`     | `vento-pulso`  | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |
| `PKG-COMP-MX-028` | `@vento/ui-web`     | `vento-numera` | `APLICA`      | `PENDIENTE_DE_EVIDENCIA` |

**Conciliación:** 28 esperadas, 28 materializadas, 28 aplicables, 28 pendientes de evidencia, 0 compatibles, 0 incompatibles, 0 faltantes y 0 duplicadas.

#### 14. Contrato machine-readable de una relación

Cada evaluación de relación deberá conservar, como mínimo:

| Campo                        | Obligación                                                              |
| ---------------------------- | ----------------------------------------------------------------------- |
| `relation_identity`          | `PKG-COMP-MX-*` para la base o identidad propietaria para una extensión |
| `relation_source`            | `BASE_WEB_MATRIX` o contrato propietario de extensión                   |
| `package_name`               | una familia gobernada                                                   |
| `package_version`            | SemVer exacto                                                           |
| `package_source_commit`      | commit de origen exacto                                                 |
| `package_manifest_identity`  | identidad del manifest candidato                                        |
| `artifact_content_identity`  | identidad del artefacto distribuible                                    |
| `artifact_integrity`         | integridad del tarball candidato                                        |
| `candidate_bands`            | bandas que se pretende soportar                                         |
| `consumer_repository`        | repositorio exacto                                                      |
| `consumer_commit`            | commit probado                                                          |
| `consumer_manifest_identity` | identidad del manifest probado                                          |
| `consumer_lockfile_identity` | identidad del lockfile probado                                          |
| `declared_versions`          | rangos declarados relevantes                                            |
| `resolved_versions`          | versiones realmente resueltas                                           |
| `environment_identity`       | ambiente controlado y reproducible                                      |
| `target_identity`            | target ejecutado                                                        |
| `renderer_class`             | clase de renderer o `NOT_APPLICABLE` cuando no existe renderer          |
| `applicable_axes`            | doce ejes con aplicabilidad y justificación                             |
| `test_results`               | resultados por eje                                                      |
| `compatibility_state`        | uno de los seis estados                                                 |
| `restrictions`               | restricciones explícitas o arreglo vacío                                |
| `evidence_identities`        | identidades de ejecuciones y artefactos                                 |
| `decision_owner`             | owner resoluble                                                         |
| `invalidated_by`             | causa de invalidación o `NONE`                                          |

Los timestamps operativos pueden conservarse fuera de la identidad material. No se usan como sustituto de commit, lockfile o evidencia.

#### 15. Perfil de ejecución por relación

Para evaluar una relación real, CI005 deberá:

1. resolver el package candidato y su artefacto certificado;
2. verificar que el artefacto corresponde al mismo manifest, versión y commit;
3. resolver el checkout exacto del consumidor;
4. verificar manifest y lockfile antes de instalar;
5. preparar una ubicación aislada o efímera para no modificar el repositorio consumidor;
6. instalar el artefacto candidato mediante el mecanismo reproducible aplicable;
7. conservar la versión exacta del package y las versiones efectivamente resueltas de peers y toolchain;
8. ejecutar los ejes requeridos por el perfil del package, consumidor y target;
9. capturar exit codes y evidencia sin ocultar warnings contractuales;
10. clasificar cada eje;
11. derivar el estado de relación;
12. preservar el resultado incluso cuando sea fallo, bloqueo o incompatibilidad;
13. no realizar commit, push, PR ni despliegue en el consumidor.

La ausencia de un perfil ejecutable para un eje obligatorio deja la relación `PENDIENTE_DE_EVIDENCIA`.

#### 16. Estrategia de bandas

Una banda soportada se deriva únicamente de evidencia.

La estrategia deberá cubrir, según aplique:

```text
mínimo declarado de la banda
+ máximo probado dentro de la banda
+ versión efectiva de cada consumidor
+ combinaciones de peers relevantes
+ escenarios server/client/SSR
+ targets adicionales declarados
```

Reglas:

1. probar una sola versión no certifica automáticamente todo el rango;
2. el máximo probado nunca se extrapola a otro major;
3. una dependencia `0.x` no extrapola soporte fuera del minor probado;
4. React y React DOM se prueban como pareja;
5. la versión efectiva del consumidor siempre se registra aunque coincida con un extremo;
6. una ampliación de banda requiere nueva evidencia y SemVer conforme a la política aprobada;
7. una reducción de banda no se oculta como corrección compatible.

#### 17. Reglas de restricciones

`COMPATIBLE_CON_RESTRICCIONES` solo es válido cuando cada restricción conserva:

- identidad estable;
- alcance exacto;
- subpaths permitidos o excluidos;
- ambiente o target permitido;
- configuración o flag necesario;
- riesgo aceptado;
- owner;
- condición de salida;
- tareas o gates propietarios cuando apliquen;
- evidencia ejecutada que sí pasa bajo la restricción;
- bloqueo explícito de usos fuera de la restricción.

Una restricción no puede:

- esconder un eje fallido;
- omitir un consumidor obligatorio;
- convertir una incompatibilidad reproducible en compatibilidad;
- autorizar bypass de tipos, seguridad o autorización;
- eliminar una obligación de migración o deprecación;
- permanecer sin owner ni salida.

#### 18. Fase PREPARE de compatibilidad

CI005 tendrá una fase lógica `PREPARE` previa a publicación:

```text
CANDIDATO CI001/CI002
+ MATERIAL CI004 CUANDO APLIQUE
+ MATRIZ REQUERIDA
+ CHECKOUTS / TARGETS EXACTOS
→ ejecutar perfiles
→ consolidar resultados
→ derivar bandas soportadas
→ calcular compatibility_evidence_identity
→ entregar identidad al contrato de CI003
```

`PREPARE` no publica el package.

Para una release estable, la matriz requerida incluye las 28 relaciones web base de la familia correspondiente y cualquier binding adicional obligatorio declarado por contratos propietarios aplicables.

Para una prerelease, la matriz puede limitarse al conjunto explícito de pilotos aprobado para esa prerelease, pero el resultado no se proyecta como soporte para consumidores no ejecutados.

#### 19. Criterio de suficiencia de matriz

Una matriz estable es suficiente únicamente cuando:

```text
required_relations > 0
AND evaluated_required_relations = required_relations
AND pending_required_relations = 0
AND blocked_required_relations = 0
AND incompatible_required_relations = 0
AND stale_required_relations = 0
AND every_required_axis_is_resolved = true
AND package_test_evidence_is_current = true
AND build_evidence_is_current = true
AND compatibility_identity_is_current = true
```

Una relación `COMPATIBLE_CON_RESTRICCIONES` puede satisfacer la matriz solo si las restricciones están completas, aprobadas, no contradicen el uso previsto del release y no ocultan un eje fallido.

#### 20. Identidad criptográfica de compatibilidad

`compatibility_evidence_identity` será una identidad `sha256` del payload canónico que vincule, como mínimo:

```text
compatibility_contract_identity
package_name
package_version
package_source_commit
package_manifest_identity
artifact_content_identity
artifact_integrity
release_channel_type
candidate_bands
supported_bands
package_test_evidence_identity
build_evidence_identity
required_relation_set_identity
normalized_relation_results
declared_extension_bindings
```

`normalized_relation_results` incorpora, por relación, commit, manifest, lockfile, resolved versions, ambiente, target, renderer, ejes, restricciones, estado y evidence identities.

No participan en esa identidad:

- rutas absolutas;
- usuario local;
- locale;
- timezone;
- timestamps de ejecución;
- orden de descubrimiento del filesystem;
- identificadores aleatorios de una corrida que no cambien el contenido lógico.

La misma matriz lógica produce los mismos bytes canónicos y la misma identidad.

#### 21. Integración con CI003

El release gate vigente de CI003 ya admite:

```text
compatibility_required = true
compatibility_evidence_identity = identidad producida por CI005
```

CI005 define que toda release compartida publicada mediante el flujo gobernado deberá presentar la evidencia de compatibilidad correspondiente a su canal:

- estable: matriz completa aplicable;
- prerelease: matriz de pilotos explícitos aplicable.

La identidad debe pertenecer exactamente al mismo package, versión, source commit, manifest y artefacto candidato.

CI003 conserva la autoridad de publicación. CI005 no crea tags, releases ni publicaciones en registry.

La materialización de CI005 no requiere modificar CI003 para inventar una segunda interfaz.

#### 22. Fase FINALIZE

Después de que CI003 publique o simule de forma verificable la identidad de release:

```text
PREPARED MATRIX
+ RELEASE EVIDENCE CI003
→ verificar package
→ verificar versión
→ verificar source commit
→ verificar artefacto
→ verificar compatibility_evidence_identity
→ enlazar release identity
→ conservar evaluación final
```

`FINALIZE` no puede cambiar una relación, una banda, una restricción ni un resultado para hacerlos coincidir con una release ya publicada.

Si cambia el contenido sustantivo, el candidato deja de ser el mismo y vuelve a los gates previos.

Un reintento exacto de `FINALIZE` es idempotente.

#### 23. Publicación estable

Antes de permitir una release estable deberán coexistir:

1. pruebas propias vigentes del package;
2. build reproducible vigente;
3. identidad exacta del artefacto candidato;
4. changelog exigible cuando corresponda;
5. manifest de compatibilidad completo;
6. banda candidata acotada;
7. matriz requerida completa;
8. cero relaciones requeridas `PENDIENTE_DE_EVIDENCIA`;
9. cero relaciones requeridas `BLOQUEADA`;
10. cero relaciones requeridas `INCOMPATIBLE`;
11. cero evidencia `STALE`;
12. restricciones completas y aprobadas cuando existan;
13. runtime reproducible para cada target requerido;
14. referencia de rollback hacia una combinación soportada cuando aplique;
15. `compatibility_evidence_identity` vigente.

Un rango de peer dependency o un build exitoso en `vento-shell` no satisface este conjunto.

#### 24. Prereleases

Para `alpha.N`, `beta.N` y `rc.N`:

- el conjunto de pilotos debe declararse antes de ejecutar;
- cada piloto conserva consumidor, commit, lockfile, target y evidencia propios;
- no se declara compatibilidad con un consumidor no ejecutado;
- una prerelease no convierte su banda en banda estable soportada;
- una release estable posterior vuelve a ejecutar la matriz estable requerida contra el candidato final;
- una prerelease interna no puede quedar como dependencia de una release estable;
- evidencia de una prerelease no se reutiliza como evidencia de otra versión.

#### 25. Cortes coordinados multi-package

En un corte con varias familias:

1. cada package mantiene su propia matriz e identidad;
2. un package sin cambio distribuible no recibe una nueva matriz de release artificial;
3. una dependencia interna exacta se resuelve antes de evaluar al dependiente;
4. la matriz del dependiente usa la versión interna exacta que pretende consumir;
5. un PASS de una familia no sustituye la matriz de otra;
6. el orden de publicación sigue perteneciendo a CI003;
7. el conjunto de consumidores puede ser el mismo, pero la evidencia nunca se fusiona entre packages;
8. una incompatibilidad de un package no cambia silenciosamente el resultado de otro.

#### 26. Invalidación y evidencia stale

Una evaluación deja de ser vigente cuando cambia de forma material cualquiera de estas entradas:

- versión del package;
- source commit;
- manifest del package;
- artefacto o integridad;
- banda candidata;
- commit del consumidor;
- manifest del consumidor;
- lockfile del consumidor;
- versión resuelta de una dependencia evaluada;
- runtime;
- framework;
- renderer;
- target;
- configuración de build;
- contrato CSS cuando aplique;
- tipos generados;
- catálogo, schema, código o contrato consumido;
- fixture u oracle;
- conjunto de ejes aplicables;
- restricción;
- binding de extensión;
- perfil de compatibilidad.

La evaluación histórica se conserva, pero la combinación vigente vuelve a `PENDIENTE_DE_EVIDENCIA`.

El tiempo por sí solo no vuelve stale una evidencia si ninguna entrada material cambió y no existe defecto reproducible nuevo que invalide la declaración.

#### 27. Runtime y Node

Para la matriz web:

- `vento-shell` conserva el runtime reproducible ya declarado en su configuración vigente;
- los otros seis consumidores web no pueden considerarse listos para primera estable mientras no declaren y prueben su runtime reproducible;
- CI005 registra tanto el runtime declarado como el realmente ejecutado;
- una diferencia entre ambos bloquea la relación;
- ejecutar correctamente bajo el runtime del runner no sustituye una declaración contractual necesaria del consumidor;
- una modificación posterior del runtime invalida la evidencia relacionada.

CI005 no modifica `engines.node` de consumidores; esa corrección pertenece al repositorio y tarea propietaria correspondiente.

#### 28. Targets nativos, Expo y renderer

Un binding nativo o multiplataforma aprobado deberá conservar la clase de renderer y el target.

Reglas:

1. un target Expo/React Native no se normaliza a consumidor `@vento/ui-web`;
2. Expo Web permanece dentro de su stack Expo/React Native cuando así lo fija su contrato propietario;
3. un build Expo Web no sustituye pruebas de un consumidor Next;
4. un build Next no sustituye pruebas del target nativo;
5. un PASS de Android, iOS o Web no sustituye otro target declarado obligatorio;
6. contratos, validadores o tokens neutrales pueden probarse en varios targets sin compartir renderer;
7. no se exige igualdad pixel a pixel entre renderers;
8. se exige paridad del contrato observable donde el contrato propietario la declare;
9. ANIMA solo entra en una ejecución cuando exista un binding propietario que declare exactamente qué unidad compartida consume y qué targets son obligatorios.

#### 29. Deprecación, retiro y rollback

CI005 conserva la relación con las políticas de deprecación y rollback:

- una deprecación utiliza la matriz para identificar consumidores afectados;
- la reducción de una banda soportada no se oculta como simple revalidación;
- el retiro de una superficie no puede declarar resueltas relaciones que siguen activas;
- la ausencia de consumo residual requiere evidencia propietaria, no inferencia por falta de import encontrado en una sola búsqueda;
- el rollback apunta a una combinación previamente soportada y reproducible;
- un rollback no restaura bypasses o versiones declaradas incompatibles;
- una relación histórica de una release publicada no se elimina para aparentar que el consumidor nunca estuvo soportado;
- el fin de soporte conserva lineage hacia la evidencia que justificó el cambio.

#### 30. Seguridad de la matriz

La evidencia de compatibilidad no incluirá:

- tokens;
- cookies de sesión;
- credenciales;
- service role;
- claves privadas;
- secretos de registry;
- dumps sensibles;
- JWT completos;
- payloads empresariales innecesarios.

Los fixtures reales sensibles deberán sustituirse por fixtures sintéticos o referencias protegidas.

Una redacción o redacción automática de secreto no puede convertir una prueba técnicamente incompleta en `PASS`.

El acceso a repositorios o registries privados se trata como infraestructura de ejecución y no forma parte del payload determinista de compatibilidad.

#### 31. Estados de ejecución del habilitador

El runtime del gate reutilizará la semántica común:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` solo para ejecuciones realmente no aplicables.

Estos estados describen la ejecución y no sustituyen los seis estados de relación.

Una relación solo puede derivarse a `COMPATIBLE` o `COMPATIBLE_CON_RESTRICCIONES` desde evidencia requerida con ejecución satisfactoria y vigente.

#### 32. Casos positivos obligatorios del habilitador

`SHELL-CI-005::GLOBAL` deberá demostrar, como mínimo:

1. una relación web con todos los ejes aplicables en PASS → `COMPATIBLE`;
2. una relación con restricción explícita, owner, salida y ejes válidos → `COMPATIBLE_CON_RESTRICCIONES`;
3. matriz estable sintética completa de 28 relaciones de una familia → identidad de compatibilidad determinista y elegible;
4. repetición exacta de la misma matriz → mismos bytes canónicos y mismo `compatibility_evidence_identity`;
5. corte sintético con dos packages → dos matrices e identidades independientes;
6. prerelease con pilotos explícitos → certificación limitada únicamente a esos pilotos;
7. binding adicional propietario de renderer nativo → evaluación separada sin alterar `PKG-COMP-MX-001..028`;
8. `FINALIZE` con evidencia CI003 exacta → vínculo idempotente sin modificar resultados preparados.

#### 33. Casos negativos obligatorios del habilitador

`SHELL-CI-005::GLOBAL` deberá bloquear, como mínimo:

1. package fuera de las familias gobernadas;
2. relación base faltante;
3. relación base duplicada;
4. `PKG-COMP-MX-*` inventado o reasignado a otro consumidor;
5. versión del package distinta a la del candidato;
6. source commit, manifest, artefacto o integridad incompatibles;
7. commit del consumidor distinto al probado;
8. manifest del consumidor distinto al probado;
9. lockfile distinto al probado;
10. versiones resueltas obligatorias ausentes;
11. consumidor web estable sin runtime reproducible exigible;
12. peer o versión resuelta fuera de la banda candidata;
13. eje obligatorio ausente;
14. eje obligatorio fallido, bloqueado, cancelado o con timeout;
15. `NOT_APPLICABLE` sin justificación contractual;
16. evidencia stale reutilizada después de cambiar una entrada;
17. `COMPATIBLE_CON_RESTRICCIONES` con restricción sin owner, alcance o salida;
18. release estable con cualquier relación requerida pendiente, bloqueada o incompatible;
19. evidencia de otro consumidor, target, renderer o package reutilizada;
20. `FINALIZE` con evidencia CI003 de otra versión, commit, artefacto o identidad de compatibilidad.

#### 34. Regresiones obligatorias del habilitador global

La implementación única deberá proteger, como mínimo:

1. orden distinto de claves JSON alterando el digest lógico;
2. CRLF frente a LF alterando la identidad lógica normalizada;
3. locale, timezone o reloj alterando el digest;
4. reintento exacto duplicando una evaluación histórica;
5. cambio de package devolviendo una relación vigente a pendiente;
6. cambio de lockfile consumidor no invalidando evidencia;
7. cambio de versión resuelta del toolchain no invalidando evidencia;
8. pérdida, duplicación o renumeración de una de las 28 relaciones base;
9. ANIMA u otro target adicional insertado como relación 29 de la matriz web;
10. Expo Web clasificado como equivalente automático de `@vento/ui-web`;
11. PASS de un target utilizado para certificar otro target obligatorio;
12. `skipLibCheck`, cast global, mock permisivo o override ocultando una ruptura;
13. una única versión probada ampliando automáticamente toda una banda;
14. deprecación o retiro eliminando historia de compatibilidad previa;
15. revalidación reescribiendo evidencia de una release histórica;
16. el gate modificando un consumidor real, abriendo un PR o publicando una release.

#### 35. Criterios de materialización de `SHELL-CI-005::GLOBAL`

La instancia física podrá declararse materializada únicamente cuando:

1. exista una sola implementación transversal en `vento-shell`;
2. reconozca exactamente las cuatro familias aprobadas;
3. conserve exactamente las 28 relaciones web base;
4. admita extensiones únicamente desde bindings propietarios;
5. implemente los doce ejes;
6. preserve los seis estados y transiciones;
7. capture commit, manifest y lockfile exactos del consumidor;
8. capture versiones declaradas y resueltas;
9. ejecute en ubicaciones aisladas sin modificar consumidores reales;
10. soporte perfiles por package y target;
11. soporte restricciones estructuradas;
12. soporte mínimos, máximos y versiones efectivas de bandas;
13. produzca `compatibility_evidence_identity` determinista;
14. integre esa identidad con CI003 sin publicar por sí misma;
15. implemente `PREPARE` y `FINALIZE`;
16. soporte estable y prerelease sin mezclar garantías;
17. soporte cortes multi-package independientes;
18. invalide evidencia al cambiar una entrada material;
19. preserve historia y sea idempotente;
20. proteja evidencia sensible;
21. autocertifique todos los casos positivos, negativos y regresiones definidos;
22. no modifique consumers, PRs, Supabase, registry, tags o releases reales durante la autocertificación.

#### 36. Recuperación e idempotencia

La recuperación protege primero la evidencia ya producida.

Reglas:

1. una ejecución parcial no puede normalizarse a `COMPATIBLE`;
2. una escritura parcial de evidencia no constituye PASS;
3. un reintento exacto reutiliza la identidad lógica sin duplicar historia;
4. una divergencia de evidencia produce `BLOCKED` o `STALE`, no sobrescritura;
5. un fallo de un consumidor no altera evidencia válida de otro;
6. un fallo de CI005 no mueve tags ni releases;
7. una corrección del gate no reescribe matrices históricas de releases;
8. una nueva versión del gate conserva la identidad de implementación por separado;
9. las evidencias históricas mantienen package, consumer, commit, lockfile, target y digest;
10. la recuperación no modifica repositorios consumidores para “reparar” un resultado.

#### 37. Estado documental conciliado

La situación documental resultante es:

| Métrica                                                     | Resultado |
| ----------------------------------------------------------- | --------: |
| Packages base                                               |     **4** |
| Consumidores web base                                       |     **7** |
| Relaciones web base                                         |    **28** |
| Relaciones base aplicables                                  |    **28** |
| Relaciones base pendientes de evidencia                     |    **28** |
| Relaciones base compatibles declaradas por esta tarea       |     **0** |
| Relaciones base incompatibles declaradas por esta tarea     |     **0** |
| Ejes canónicos                                              |    **12** |
| Estados de relación                                         |     **6** |
| Habilitadores globales CI001..CI004 previamente verificados |     **4** |
| Habilitador físico CI005 materializado por este marcador    |     **0** |
| Requisitos de prueba creados o modificados                  |     **0** |

La existencia de manifests similares y tooling compartido no modifica estos estados.

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** las obligaciones de pruebas propias, compatibilidad por consumidor, identidad de release, cortes coordinados, deprecación, retiro, targets multiplataforma, lineage, rollback y evidencia ya están cubiertas por requisitos vigentes. CI005 define el habilitador ejecutable común y su forma de consolidación sin introducir una obligación empresarial independiente que requiera otra fila.

#### 39. Cobertura de prueba vigente reutilizada

La cobertura existente se conserva sin modificación:

- `TREQ-SHELL-006` protege pruebas propias y matriz por consumidor antes de publicar o adoptar;
- `TREQ-SHELL-007` protege rollback independiente hacia combinaciones soportadas;
- `TREQ-SHELL-008` exige requisitos afectados y evidencia reproducible;
- `TREQ-SHELL-009` exige identidad verificable de repositorio, commit y ambiente;
- `TREQ-SHELL-036` protege la identidad inmutable de release;
- `TREQ-SHELL-037` protege cortes multi-package y dependencias internas exactas;
- `TREQ-SHELL-038` vincula deprecación con consumidores, changelog, migración y evidencia;
- `TREQ-SHELL-039` mantiene retiro y fin de soporte bloqueados hasta resolver consumidores y rollback;
- los requisitos vigentes de fundación nativa y autorización que asignan CI005 conservan sus bindings de consumidor, target, renderer, lineage y paridad sin ampliar la matriz web base por inferencia.

Estas referencias son trazabilidad de cobertura ya existente y no constituyen actualización del registro.

#### 40. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                                                                                                    |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | El marcador documental no materializa el gate de compatibilidad ni ejecuta consumers.                                                                                                                                                                                                        |
| LOCAL     | NOT_EXECUTED   | El artefacto aún no ha sido insertado ni validado por los scripts del checkout del usuario.                                                                                                                                                                                                  |
| REMOTA    | PASS           | Se verificaron continuidad CI004→CI005→CI006, topología `GLOBAL_ENABLE_ONCE`, política `SHELL-PKG-004`, 28 relaciones, 12 ejes, seis estados, manifests web actuales, delta de runtime, CI004 `VERIFIED`, interfaz CI003 de `compatibility_evidence_identity` y cobertura vigente aplicable. |
| OPERATIVA | NOT_EXECUTED   | No se ejecutó una matriz real contra consumidores ni una release real o sintética durante este marcador.                                                                                                                                                                                     |
| FÍSICA    | NOT_APPLICABLE | La materialización pertenece a `SHELL-CI-005::GLOBAL` después de aprobación documental y autorización física explícita.                                                                                                                                                                      |

#### 41. Criterios de aceptación

`SHELL-CI-005` queda documentalmente completa cuando:

- identifica `SHELL-CI-005::GLOBAL` como habilitador único;
- conserva exactamente 4 packages y 7 consumidores web base;
- conserva exactamente `PKG-COMP-MX-001..028`;
- mantiene las 28 relaciones base en `PENDIENTE_DE_EVIDENCIA` mientras no exista ejecución;
- permite extensiones solo desde bindings propietarios y no inventa relación 29;
- conserva los 12 ejes canónicos;
- conserva los seis estados y sus transiciones;
- define la unidad exacta con package, artefacto, consumer, commit, manifest, lockfile, toolchain, ambiente y target;
- distingue versiones declaradas de versiones resueltas;
- define perfiles y bandas candidatas por las cuatro familias;
- define restricciones estructuradas;
- define estrategia de extremos de banda;
- exige runtime reproducible;
- mantiene Expo/React Native separado de la matriz web;
- define `PREPARE`, identidad determinista e integración con CI003;
- define `FINALIZE` idempotente sin mutar resultados;
- bloquea estable con cualquier relación requerida no resuelta;
- limita prerelease a pilotos explícitos;
- conserva matrices independientes por package en cortes coordinados;
- invalida evidencia ante cualquier cambio material;
- protege deprecación, retiro, rollback e historia;
- define 8 casos positivos, 20 negativos y 16 regresiones obligatorias;
- no modifica consumers, manifests, lockfiles, CI, registry, tags, releases, Supabase ni 04A;
- no crea ni modifica requisitos de prueba.

#### 42. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-005::GLOBAL`;
- crea scripts o workflows;
- crea perfiles ejecutables en consumidores;
- modifica `package.json` o lockfiles reales;
- añade `engines.node` a consumidores;
- instala packages en consumidores reales;
- declara bandas soportadas sin ejecución;
- declara compatibles las 28 relaciones;
- crea un `PKG-COMP-MX-029`;
- agrega ANIMA, PASS o TALENTO a la matriz web base;
- modifica CI001, CI002, CI003 o CI004;
- crea tags o releases;
- publica en registry;
- modifica changelog;
- crea PRs de consumidores;
- modifica código de consumidores;
- decide la adopción reservada a CI006;
- ejecuta Supabase, migraciones, RLS, RPC o cambios de datos;
- altera deprecaciones o ventanas ya aprobadas;
- crea, modifica, difiere, descarta o vuelve obsoletos requisitos del registro 04A.

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-CI-004 — Crear changelog automático`

**TAREA ACTUAL APROBADA**
`SHELL-CI-005 — Crear matriz de compatibilidad`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-006 — Crear actualización de consumidores mediante PR`


### ✅ SHELL-CI-006 — Crear actualización de consumidores mediante PR

**Estado:** APROBADA
**Tarea anterior:** SHELL-CI-005 — Crear matriz de compatibilidad
**Tarea siguiente:** SHELL-CI-007 — Probar NEXO antes de actualizar
**Tipo de tarea:** Habilitador global único — contrato documental de actualizador controlado de consumidores mediante pull request
**Bloque:** BLOQUE T — CI, pruebas, despliegue y rollback base
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada el habilitador global que materializará la **preparación, mantenimiento y trazabilidad de actualizaciones de packages compartidos mediante pull requests en repositorios consumidores**, sin convertir la publicación de una release en una actualización automática, sin fusionar cambios, sin desplegar consumidores y sin degradar los gates de adopción ya aprobados.

La regla vinculante queda fijada así:

```text
RELEASE CANÓNICA E INMUTABLE
+ CONSUMIDOR ELEGIBLE
+ RELACIÓN PKG-PR-REL-* EXACTA
+ BASE COMMIT EXACTO
+ MANIFEST Y LOCKFILE COHERENTES
+ VERSIÓN O CONJUNTO OBJETIVO EXACTOS
+ COMPATIBILIDAD CI005 VIGENTE
+ GATES PKG-GATE-* APLICABLES
+ EVIDENCIA LIGADA AL PROPOSAL COMMIT
= PROPUESTA REVISABLE EN EL REPOSITORIO CONSUMIDOR
```

Y, de forma fail-closed:

```text
PUBLICACIÓN DEL PACKAGE
O DESCUBRIMIENTO DE UNA VERSIÓN NUEVA
O APERTURA CORRECTA DEL PR
O APROBACIÓN DEL AUTOR
O RESULTADOS DE OTRO COMMIT / CONSUMIDOR
≠ ADOPCIÓN
≠ MERGE AUTORIZADO
≠ DESPLIEGUE AUTORIZADO
```

Esta tarea no abre pull requests reales ni modifica consumidores durante el marcador global. Define el contrato que `SHELL-CI-006::GLOBAL` deberá materializar y autocertificar una sola vez y que las futuras adopciones reutilizarán sin duplicar el actualizador.

#### 2. Resultado canónico

`SHELL-CI-006` establece un único habilitador transversal para:

1. consumir releases canónicas e inmutables producidas por CI003;
2. consumir evidencia de compatibilidad vigente y finalizada por CI005;
3. resolver una relación `PKG-PR-REL-*` exacta por package y consumidor web base;
4. reconocer las siete clases de actualización aprobadas;
5. conservar los catorce estados canónicos del ciclo de propuesta;
6. materializar manifest y lockfile como una unidad coherente;
7. fijar versiones exactas de packages VENTO y el conjunto mínimo cerrado de dependencias internas;
8. preparar cambios atribuibles únicamente a la actualización declarada;
9. ejecutar o consumir los dieciséis `PKG-GATE-*` conforme a su propietario;
10. mantener la evidencia ligada a `base_commit`, `proposal_commit`, manifest, lockfile, release, compatibilidad y configuración exactos;
11. invalidar evidencia y aprobaciones técnicas cuando cambie una entrada material;
12. abrir o mantener una propuesta sin auto-merge, auto-deploy ni push directo a rama protegida;
13. conservar revisión humana independiente y autoridad propia del consumidor;
14. soportar adopción independiente por repositorio;
15. soportar un conjunto mínimo cerrado multi-package sin lockstep artificial;
16. soportar actualización `MAJOR`, seguridad, deprecación y rollback con controles reforzados;
17. mantener toda modificación de Supabase, datos o configuración remota separada y propietaria de `vento-shell`;
18. preservar cierres, supersesiones, invalidaciones y reintentos sin reescribir historia;
19. producir evidencia machine-readable atribuible al expediente `PKG-PR-*`;
20. autocertificar el propio actualizador sin escribir en repositorios consumidores reales.

#### 3. Base vinculante

La implementación futura conservará sin reinterpretar las decisiones aprobadas de `SHELL-PKG-001..008` y los habilitadores `SHELL-CI-001..005`.

Quedan vinculantes, como mínimo:

- packages npm privados e inmutables publicados desde `vento-shell`;
- versiones exactas y lockfile en consumidores;
- cuatro familias compartidas: `@vento/contracts`, `@vento/os-context`, `@vento/supabase` y `@vento/ui-web`;
- siete consumidores web base: `vento-shell`, `vento-viso`, `vento-nexo`, `vento-fogo`, `vento-origo`, `vento-pulso` y `vento-numera`;
- 28 relaciones de actualización `PKG-PR-REL-001..028`;
- siete clases de actualización;
- catorce estados del ciclo de propuesta;
- dieciséis gates `PKG-GATE-001..016`;
- cuatro perfiles especializados `GATE-PROFILE-*`;
- dieciocho bloqueos `PR-BLK-001..018`;
- pull request como vehículo de adopción y rollback revisable;
- cero auto-merge y cero auto-deploy por parte del actualizador;
- adopción independiente por consumidor;
- invalidación de checks y evidencia ante cambios materiales;
- correspondencia exacta entre release, compatibilidad, propuesta, manifest y lockfile;
- separación de la actualización de `@vento/supabase` respecto de cualquier migración o cambio remoto de Supabase.

#### 4. Topología de trabajo

`PHASE-03-T-CI-FOUNDATION` aplica `GLOBAL_ENABLE_ONCE` a `SHELL-CI-006`.

Por tanto:

```text
MARCADOR CANÓNICO
SHELL-CI-006
→ define el contrato una sola vez

INSTANCIA FÍSICA FUTURA
SHELL-CI-006::GLOBAL
→ materializa y autocertifica el actualizador una sola vez

ADOPCIONES POSTERIORES
→ reutilizan el actualizador certificado
→ generan expedientes y evidencia por consumidor
→ no crean otra implementación de CI006
```

La autocertificación global utilizará repositorios, branches, manifests, lockfiles, releases y pull requests sintéticos o aislados. No necesita escribir en los repositorios consumidores reales.

#### 5. Frontera con el mini-bloque

| Responsabilidad | Propietario |
| --- | --- |
| pruebas propias del package | `SHELL-CI-001` |
| build y artefacto distribuible | `SHELL-CI-002` |
| identidad y publicación de release | `SHELL-CI-003` |
| changelog y release notes | `SHELL-CI-004` |
| matriz y evidencia de compatibilidad | `SHELL-CI-005` |
| preparación y mantenimiento del PR consumidor | `SHELL-CI-006` |
| pruebas específicas de NEXO | `SHELL-CI-007` |
| pruebas específicas de FOGO | `SHELL-CI-008` |
| pruebas específicas de ORIGO | `SHELL-CI-009` |
| pruebas específicas de PULSO | `SHELL-CI-010` |
| pruebas específicas de VISO | `SHELL-CI-011` |
| pruebas específicas de NUMERA | `SHELL-CI-012` |
| pruebas específicas de ANIMA cuando exista binding aplicable | `SHELL-CI-013` |
| rollback por repositorio | `SHELL-CI-014` |
| independencia de despliegue | `SHELL-CI-015` |
| comandos de prueba por repositorio | `SHELL-CI-016` |
| requisitos de prueba y evidencia de PR | `SHELL-CI-017..019` |

CI006 no absorbe las pruebas específicas de cada consumidor ni decide su merge, despliegue o adopción. Su función es materializar el vehículo de cambio y consolidar o consumir evidencia de los propietarios aplicables.

#### 6. Línea base física observada

En el corte vigente:

- `SHELL-CI-001::GLOBAL` a `SHELL-CI-005::GLOBAL` están `VERIFIED`;
- CI005 materializa exactamente 28 relaciones web base y 140 evaluaciones base de cobertura;
- CI005 genera `compatibility_evidence_identity`, soporta `PREPARE` y `FINALIZE` y enlaza la identidad de compatibilidad con CI003;
- CI003 conserva la autoridad de publicación de releases;
- no existe todavía una implementación global certificada de CI006;
- no se confirmó un actualizador ejecutable común para los siete consumidores web;
- no se confirmó configuración dedicada de Dependabot o Renovate que satisfaga el contrato completo de VENTO;
- el contrato aprobado prohíbe que un actualizador fusione, despliegue o escriba directamente en ramas protegidas;
- las relaciones `PKG-PR-REL-001..028` permanecen inicialmente en `NO_APLICA_SIN_RELEASE_ESTABLE` mientras no exista una release estable y una propuesta con insumos completos;
- las futuras tareas CI007..013 conservan la propiedad de pruebas específicas antes de actualizar sus consumidores.

La existencia de GitHub, npm o un bot genérico no constituye por sí sola la materialización de CI006.

#### 7. Universo gobernado

##### 7.1. Packages base

1. `@vento/contracts`;
2. `@vento/os-context`;
3. `@vento/supabase`;
4. `@vento/ui-web`.

##### 7.2. Consumidores web base

1. `vento-shell`;
2. `vento-viso`;
3. `vento-nexo`;
4. `vento-fogo`;
5. `vento-origo`;
6. `vento-pulso`;
7. `vento-numera`.

Resultado:

```text
4 packages × 7 consumidores web = 28 relaciones PKG-PR-REL-* base
```

`vento-shell` conserva una relación de consumo dentro de la matriz aprobada. Sin embargo, el actualizador no asumirá que el repositorio productor y un consumidor externo tienen la misma operación remota: la materialización deberá resolver explícitamente repository, base branch, permisos y alcance para cada relación antes de crear una propuesta.

PASS, ANIMA, TALENTO y clientes móviles no se agregan a las 28 relaciones base por inferencia. Cualquier incorporación posterior requiere contrato propietario y binding explícito, sin renumerar `PKG-PR-REL-001..028`.

#### 8. Unidad canónica de actualización

La unidad ordinaria permanece exactamente:

```text
un repositorio consumidor
+ una rama base exacta
+ un conjunto cerrado de versiones objetivo
+ un manifest
+ un lockfile
+ un commit de propuesta
+ una ejecución de evidencia
+ un pull request
```

Reglas:

1. cada pull request afecta exactamente un repositorio consumidor;
2. una release puede originar propuestas independientes en consumidores distintos;
3. una propuesta puede actualizar un package o el conjunto mínimo cerrado exigido por dependencias exactas;
4. una propuesta no obliga a abrir, fusionar o desplegar las propuestas de otros consumidores;
5. abrir, aprobar o fusionar una propuesta no equivale a adopción;
6. la adopción exige despliegue identificado y validación propietaria;
7. `base_commit`, `proposal_commit`, manifest, lockfile y conjunto objetivo forman parte de la identidad evaluada;
8. cualquier cambio material posterior invalida la evidencia afectada.

#### 9. Expediente `PKG-PR-*`

CI006 materializará el expediente aprobado sin eliminar campos ni rebautizarlos.

| Campo | Obligación |
| --- | --- |
| `update_id` | identificador estable compuesto por `PKG-PR-`, el código canónico del consumidor y una secuencia no reutilizable |
| `consumer_repository` | repositorio consumidor exacto |
| `consumer_owner` | responsable técnico del consumidor |
| `target_branch` | rama destino autorizada |
| `base_commit` | commit exacto usado como base |
| `proposal_commit` | commit exacto evaluado |
| `remote_pr_ref` | número o referencia remota del pull request |
| `update_class` | clase primaria y calificadores |
| `trigger` | release, seguridad, deprecación, incompatibilidad, rollback u otro disparador aprobado |
| `package_set_from` | conjunto exacto instalado antes del cambio |
| `package_set_to` | conjunto exacto objetivo |
| `release_refs` | tags, releases, commits e integridad de packages |
| `manifest_before_hash` | identidad del manifest anterior |
| `manifest_after_hash` | identidad del manifest propuesto |
| `lockfile_before_hash` | identidad del lockfile anterior |
| `lockfile_after_hash` | identidad del lockfile propuesto |
| `compatibility_ref` | manifest y resultados de compatibilidad aplicables |
| `changelog_ref` | cambios relevantes por package |
| `deprecation_refs` | expedientes `DEP-*` aplicables o `NONE` |
| `security_ref` | advisory, evaluación o `NONE` |
| `rollback_ref` | snapshot certificado y expediente aplicable |
| `treq_impact` | requisitos creados, modificados, satisfechos, invalidados o cero cambios |
| `supabase_impact` | `NO_APLICA` justificado o tarea propietaria desde `vento-shell` |
| `data_impact` | evaluación de datos, compatibilidad y migración |
| `configuration_impact` | variables, secretos, flags o configuración afectados |
| `cache_impact` | invalidación, reconstrucción o no aplicabilidad |
| `validation_results` | resultados por package y consumidor ligados al commit |
| `evidence_refs` | ejecuciones y artefactos reproducibles |
| `required_reviewers` | propietarios y revisores obligatorios |
| `approvals` | aprobaciones vigentes ligadas al commit |
| `bot_identity` | identidad automatizada o `MANUAL` |
| `opened_at` | apertura atribuible |
| `updated_at` | última modificación atribuible |
| `merged_at` | momento de merge o `NONE` |
| `deployment_ref` | despliegue de adopción o `PENDING` |
| `outcome` | estado final, impacto residual y seguimiento |
| `supersedes` | expediente anterior sustituido o `NONE` |
| `superseded_by` | expediente posterior o `NONE` |

**Conciliación:** 38 campos obligatorios, 38 conservados, 0 eliminados y 0 renombrados.

#### 10. Identidad del expediente

El identificador aprobado se compone, en este orden, de:

1. el prefijo literal `PKG-PR-`;
2. uno de los códigos canónicos de consumidor definidos a continuación;
3. un guion literal `-`;
4. una secuencia estable que no se reutiliza después de cierre, supersesión, reversión o cancelación.

Ejemplo válido de forma documental: `PKG-PR-NEXO-1`.

Para la matriz web base los códigos permitidos permanecen:

```text
SHELL
VISO
NEXO
FOGO
ORIGO
PULSO
NUMERA
```

Reglas:

1. la secuencia no se reutiliza después de cierre, supersesión, reversión o cancelación;
2. `update_id` no sustituye `remote_pr_ref`;
3. una nueva versión objetivo que sustituya materialmente la propuesta anterior genera una nueva identidad y enlaza `supersedes` / `superseded_by`;
4. un reintento exacto sobre el mismo expediente y commit mantiene la identidad lógica y no duplica historia;
5. una extensión posterior solo podrá usar un código aprobado por su contrato propietario.

#### 11. Clases de actualización

Las clases permanecen exactamente:

| Clase | Definición | Exigencia adicional principal |
| --- | --- | --- |
| `INITIAL_ADOPTION` | primera incorporación certificada de un package al consumidor | paridad contra la implementación anterior y plan de retiro |
| `PATCH_UPDATE` | corrección compatible conforme a SemVer | regresión focal y verificación del defecto corregido |
| `MINOR_UPDATE` | capacidad pública nueva compatible | escenarios nuevos y ausencia de cambio incompatible |
| `MAJOR_UPDATE` | cambio incompatible o reducción de soporte | guía de migración, impacto completo y aprobación reforzada |
| `SECURITY_UPDATE` | actualización motivada por vulnerabilidad o bypass | evaluación de exposición, prioridad, mitigación y no regresión |
| `DEPRECATION_MIGRATION` | migración requerida por superficie o línea de soporte deprecada | expediente `DEP-*`, inventario de uso residual y puerta de retiro |
| `ROLLBACK_UPDATE` | restauración del snapshot certificado anterior | expediente `RBK-*`, causa, objetivo restituible y validación posterior |

Una propuesta puede conservar calificadores secundarios, pero la clase más exigente gobierna revisión, evidencia y bloqueos.

#### 12. Ciclo de vida de la propuesta

Los catorce estados permanecen exactamente:

1. `NOT_REQUESTED`;
2. `ELIGIBLE`;
3. `PR_OPEN`;
4. `VALIDATING`;
5. `CHANGES_REQUESTED`;
6. `BLOCKED`;
7. `READY_FOR_REVIEW`;
8. `APPROVED_FOR_MERGE`;
9. `MERGED`;
10. `ADOPTION_PENDING`;
11. `ADOPTED`;
12. `CLOSED_NO_CHANGE`;
13. `SUPERSEDED`;
14. `REVERTED`.

Transiciones ordinarias:

```text
NOT_REQUESTED → ELIGIBLE
ELIGIBLE → PR_OPEN
PR_OPEN → VALIDATING
VALIDATING → READY_FOR_REVIEW
VALIDATING → BLOCKED
READY_FOR_REVIEW → CHANGES_REQUESTED
CHANGES_REQUESTED → VALIDATING
READY_FOR_REVIEW → APPROVED_FOR_MERGE
APPROVED_FOR_MERGE → VALIDATING
APPROVED_FOR_MERGE → MERGED
MERGED → ADOPTION_PENDING
ADOPTION_PENDING → ADOPTED
PR_OPEN → CLOSED_NO_CHANGE
VALIDATING → CLOSED_NO_CHANGE
BLOCKED → VALIDATING
PR_OPEN → SUPERSEDED
VALIDATING → SUPERSEDED
READY_FOR_REVIEW → SUPERSEDED
MERGED → REVERTED
ADOPTION_PENDING → REVERTED
ADOPTED → REVERTED
```

CI006 podrá crear o mantener estados hasta donde alcance su autoridad técnica, pero nunca inferirá `MERGED`, `ADOPTION_PENDING`, `ADOPTED` o `REVERTED` sin evidencia propietaria del consumidor.

#### 13. Catálogo canónico de gates

CI006 deberá reconocer exactamente los dieciséis gates aprobados:

| ID | Gate | Aplicabilidad | Resultado exigido | Propietario principal |
| --- | --- | --- | --- | --- |
| `PKG-GATE-001` | identidad de release | universal | `PASS` | `SHELL-CI-001`; `SHELL-CI-003` |
| `PKG-GATE-002` | elegibilidad de versión | universal | `PASS` | `SHELL-CI-003`; `SHELL-CI-005` |
| `PKG-GATE-003` | coherencia manifest–lockfile | universal | `PASS` | `SHELL-CI-006` |
| `PKG-GATE-004` | instalación bloqueada reproducible | universal | `PASS` | `SHELL-CI-006`; consumidor |
| `PKG-GATE-005` | pruebas propias del package | universal | `PASS` | `SHELL-CI-001`; propietario package |
| `PKG-GATE-006` | lint o análisis estático del consumidor | universal | `PASS` | consumidor; `SHELL-CI-006` |
| `PKG-GATE-007` | typecheck del consumidor | universal | `PASS` | consumidor; `SHELL-CI-006` |
| `PKG-GATE-008` | build o export del consumidor | universal | `PASS` | consumidor; `SHELL-CI-006` |
| `PKG-GATE-009` | pruebas automatizadas del consumidor | universal | `PASS` | consumidor; `SHELL-CI-006` |
| `PKG-GATE-010` | matriz de compatibilidad | universal | `PASS` | `SHELL-CI-002`; `SHELL-CI-005` |
| `PKG-GATE-011` | perfil especializado de familia | universal | `PASS` | `SHELL-CI-002`; `SHELL-CI-004` |
| `PKG-GATE-012` | requisitos de prueba afectados | universal | `PASS` | `SHELL-CI-006`; registro 04A |
| `PKG-GATE-013` | controles reforzados por riesgo | condicional | `PASS` o `NOT_APPLICABLE` | tareas propietarias aplicables |
| `PKG-GATE-014` | vigencia y coherencia de evidencia | universal | `PASS` | `SHELL-CI-006` |
| `PKG-GATE-015` | revisión y protección de merge | universal | `PASS` | gobierno del repositorio consumidor |
| `PKG-GATE-016` | separación de merge, despliegue y adopción | universal | `PASS` | gobierno de CI; consumidor |

**Conciliación:** 16 gates, 15 universales, 1 condicional, 0 gates omitidos.

#### 14. Semántica fail-closed de resultados

Los estados de gate permanecen:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE` únicamente para el gate condicional cuando exista justificación válida.

Reglas:

1. un gate universal solo se satisface con `PASS`;
2. `NOT_APPLICABLE` nunca satisface un gate universal;
3. `SKIPPED`, `NEUTRAL`, ausencia de resultado o éxito parcial no equivalen a `PASS`;
4. un comentario, etiqueta o aprobación manual no transforma un resultado técnico no satisfactorio en `PASS`;
5. los reintentos preservan intentos anteriores;
6. la decisión usa evidencia vigente del commit actual;
7. intermitencia o resultados contradictorios mantienen la propuesta bloqueada hasta resolver la causa.

#### 15. Perfiles especializados

##### 15.1. `GATE-PROFILE-CONTRACTS`

Para `@vento/contracts`:

- build y pruebas propias;
- schemas, catálogos, tipos derivados y diagnósticos;
- contract tests contra el consumidor;
- typecheck y build consumidor;
- compatibilidad hacia atrás y adelante cuando aplique;
- clasificación de cambios incompatibles;
- bloqueo de casts globales o adaptadores sin propietario usados para ocultar rupturas.

##### 15.2. `GATE-PROFILE-OS-CONTEXT`

Para `@vento/os-context`:

- build y pruebas propias;
- contratos de sesión, contexto, permiso, recurso, territorio y razones;
- typecheck, build e integración del consumidor;
- fronteras servidor–cliente, cookies, redirects y SSR cuando apliquen;
- casos permitidos y denegados fail-closed;
- ausencia de autoridad ampliada por valores cliente, fallback o contexto incompleto;
- compatibilidad con versiones soportadas y dependencias internas exactas.

##### 15.3. `GATE-PROFILE-SUPABASE`

Para `@vento/supabase`:

- build y pruebas propias;
- factories, tipos generados, wrappers RPC y errores;
- typecheck, build e integración consumidor;
- contract tests de clientes, llamadas, parámetros, resultados y errores;
- coherencia con schema y tipos declarados compatibles;
- ausencia de acceso privilegiado o bypass de RLS introducido por el SDK;
- `supabase_impact = NO_APLICA` justificado o referencia a tarea propietaria en `vento-shell`;
- bloqueo si faltan migraciones o cambios remotos propietarios exigidos.

##### 15.4. `GATE-PROFILE-UI-WEB`

Para `@vento/ui-web`:

- build y pruebas del package;
- build e integración del consumidor;
- render, hidratación, navegación y contrato CSS;
- accesibilidad automatizada y revisión controlada cuando aplique;
- regresión visual cuando cambien apariencia, layout, tokens, marca o estados;
- compatibilidad con runtime, framework y peers;
- ausencia de dependencias locales, estilos globales no declarados o imports privados.

#### 16. Matriz base de 28 relaciones de actualización

| ID | Package | Consumidor | Aplicabilidad | Estado inicial |
| --- | --- | --- | --- | --- |
| `PKG-PR-REL-001` | `@vento/contracts` | `vento-shell` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-002` | `@vento/contracts` | `vento-viso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-003` | `@vento/contracts` | `vento-nexo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-004` | `@vento/contracts` | `vento-fogo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-005` | `@vento/contracts` | `vento-origo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-006` | `@vento/contracts` | `vento-pulso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-007` | `@vento/contracts` | `vento-numera` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-008` | `@vento/os-context` | `vento-shell` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-009` | `@vento/os-context` | `vento-viso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-010` | `@vento/os-context` | `vento-nexo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-011` | `@vento/os-context` | `vento-fogo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-012` | `@vento/os-context` | `vento-origo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-013` | `@vento/os-context` | `vento-pulso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-014` | `@vento/os-context` | `vento-numera` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-015` | `@vento/supabase` | `vento-shell` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-016` | `@vento/supabase` | `vento-viso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-017` | `@vento/supabase` | `vento-nexo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-018` | `@vento/supabase` | `vento-fogo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-019` | `@vento/supabase` | `vento-origo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-020` | `@vento/supabase` | `vento-pulso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-021` | `@vento/supabase` | `vento-numera` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-022` | `@vento/ui-web` | `vento-shell` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-023` | `@vento/ui-web` | `vento-viso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-024` | `@vento/ui-web` | `vento-nexo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-025` | `@vento/ui-web` | `vento-fogo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-026` | `@vento/ui-web` | `vento-origo` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-027` | `@vento/ui-web` | `vento-pulso` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |
| `PKG-PR-REL-028` | `@vento/ui-web` | `vento-numera` | `APLICA` | `NO_APLICA_SIN_RELEASE_ESTABLE` |

**Conciliación:** 28 esperadas, 28 materializadas, 28 aplicables, 28 en estado inicial, 0 faltantes y 0 duplicadas.

Estas identidades son distintas de `PKG-COMP-MX-001..028`. Ambas matrices describen las mismas combinaciones package–consumidor base, pero una conserva el veredicto de compatibilidad y la otra gobierna la propuesta de adopción.

#### 17. Elegibilidad para generar una propuesta

Una relación solo podrá pasar de `NOT_REQUESTED` a `ELIGIBLE` cuando existan, según aplicabilidad:

1. release canónica, inmutable y verificable;
2. versión objetivo exacta y canal permitido;
3. evidencia vigente de pruebas propias del package;
4. artefacto de build reproducible;
5. changelog o material de release aplicable;
6. evidencia CI005 perteneciente al mismo package, versión, artefacto y consumidor;
7. `base_commit` exacto del consumidor;
8. manifest y lockfile de base identificados;
9. conjunto objetivo resoluble sin rangos flotantes ni prereleases internas no autorizadas;
10. clase de actualización determinada;
11. evaluación de deprecación, seguridad, datos, Supabase, configuración y caché;
12. snapshot anterior y rollback cuando la clase o política lo requiera;
13. propietario técnico del consumidor resoluble;
14. repositorio y rama destino autorizados;
15. cero bloqueo `PR-BLK-*` abierto que impida crear una propuesta atribuible.

La elegibilidad permite preparar una propuesta; no la aprueba ni la adopta.

#### 18. Materialización del cambio consumidor

El actualizador deberá producir el cambio mínimo atribuible al expediente.

Podrá incluir, cuando corresponda:

1. versión exacta anterior y objetivo por package;
2. modificación coherente del manifest;
3. modificación coherente del lockfile;
4. ajustes mínimos de compatibilidad exigidos por el cambio;
5. pruebas o fixtures nuevos vinculados al comportamiento afectado;
6. documentación del consumidor cuando cambie operación, configuración o soporte;
7. referencias a release, changelog, compatibilidad, deprecación y rollback;
8. declaración de impacto `treq_impact`;
9. declaración de impacto de datos, Supabase, configuración y caché;
10. plan de verificación posterior cuando el merge no complete la adopción.

Queda prohibido:

- introducir rangos flotantes para packages VENTO;
- sustituir el registry por URL Git, fuente local o código copiado;
- editar artefactos instalados;
- regenerar lockfile con cambios no explicados;
- mezclar refactors o funcionalidades ajenas que destruyan atribución;
- usar aliases, overrides permanentes, casts globales o desactivación de validadores para ocultar incompatibilidad;
- modificar secretos, datos productivos o configuración remota;
- ejecutar migraciones Supabase desde un repositorio consumidor;
- convertir una prerelease en dependencia productiva estable sin autorización.

#### 19. Proceso determinista del actualizador

Para una ejecución real futura, el habilitador seguirá este orden lógico:

1. recibir el disparador y la release objetivo;
2. verificar identidad e integridad de la release;
3. resolver package y conjunto mínimo cerrado de dependencias exactas;
4. resolver relación `PKG-PR-REL-*` o binding propietario aplicable;
5. resolver repositorio consumidor, rama base y `base_commit` exactos;
6. comprobar que no existe un bloqueo previo que haga inválida la propuesta;
7. materializar en un checkout aislado únicamente los cambios autorizados;
8. actualizar manifest y lockfile como unidad coherente;
9. calcular el `proposal_commit` del cambio a evaluar;
10. consumir o ejecutar los gates propietarios sobre ese commit;
11. consolidar `validation_results`, `evidence_refs` e impactos;
12. crear o mantener el expediente `PKG-PR-*`;
13. crear o actualizar la propuesta remota solo cuando la identidad y el alcance coincidan;
14. mantener la propuesta en `VALIDATING`, `BLOCKED` o `READY_FOR_REVIEW` según evidencia;
15. invalidar resultados y aprobaciones técnicas cuando cambie una entrada material;
16. finalizar la actuación del automatizador sin fusionar, desplegar ni declarar adopción.

La implementación no deducirá nombres de branch, checks, labels, revisores, credenciales o repositorios remotos que no estén resueltos por configuración propietaria vigente.

#### 20. Idempotencia y supersesión

Reglas:

1. una repetición exacta del mismo expediente, base, objetivo y `proposal_commit` no crea una segunda propuesta equivalente;
2. el actualizador podrá mantener la propuesta existente cuando su identidad remota siga siendo la misma;
3. cambios materiales devuelven la propuesta a `VALIDATING` y marcan evidencia anterior como no vigente;
4. una versión objetivo distinta no sustituye silenciosamente la anterior;
5. una nueva propuesta materialmente distinta conserva un `update_id` propio y enlaza supersesión;
6. una propuesta cerrada no se reabre como si su historia nunca hubiera existido;
7. un resultado correcto posterior no elimina intentos fallidos previos;
8. la historia de adopción, cierre, supersesión y reversión permanece auditable.

#### 21. Facultades del automatizador

El actualizador podrá, cuando exista autorización física y remota aplicable:

- leer metadata de releases y paquetes;
- resolver la relación y expediente aplicables;
- crear un checkout aislado del consumidor;
- modificar únicamente archivos autorizados para la actualización;
- resolver manifest y lockfile;
- ejecutar validaciones autorizadas;
- preparar una rama de propuesta;
- crear o mantener un pull request;
- publicar evidencia técnica no sensible;
- actualizar el estado técnico del expediente.

No podrá:

- fusionar el pull request;
- aprobar su propia propuesta;
- desplegar la aplicación;
- escribir directamente en la rama principal o protegida;
- modificar reglas de protección o checks obligatorios;
- publicar packages con credenciales del consumidor;
- ampliar alcance sin decisión canónica;
- ocultar fallos o reintentar indefinidamente para obtener un verde aparente;
- introducir credenciales en código, manifest, lockfile, logs o comentarios;
- ejecutar cambios de Supabase, datos o ambientes remotos;
- declarar `ADOPTED` sin evidencia propietaria del consumidor.

#### 22. Separación de identidades y privilegios

Se conservará separación efectiva entre:

1. identidad que publica packages;
2. identidad que lee el registry;
3. identidad que prepara actualizaciones;
4. identidad que revisa;
5. identidad que aprueba merge;
6. identidad que fusiona;
7. identidad que despliega.

La capacidad de abrir una propuesta no concede facultad para publicar, aprobar, fusionar o desplegar.

Los secretos, tokens o credenciales no forman parte del payload documental ni de la evidencia determinista del expediente.

#### 23. Evidencia y vigencia

Toda evaluación conservará, como mínimo:

- `update_id`;
- relación `PKG-PR-REL-*` o binding propietario;
- package y versión exactos;
- consumidor y rama destino;
- `base_commit` y `proposal_commit`;
- hashes de manifest y lockfile;
- conjunto de packages resuelto;
- integridad de release;
- referencia de compatibilidad;
- perfil especializado;
- resultados individuales de los dieciséis gates;
- impacto de requisitos;
- calificadores de riesgo;
- identidad de ejecución;
- artefactos de evidencia;
- estado de revisión;
- causa de invalidación;
- resultado global.

La evidencia no certifica otra rama, commit, lockfile, consumidor, package, versión, matriz o configuración.

#### 24. Invalidación obligatoria

Se invalidan los resultados afectados cuando cambia cualquiera de estas entradas:

- `base_commit`;
- `proposal_commit`;
- manifest;
- lockfile;
- package o versión objetivo;
- conjunto multi-package resuelto;
- integridad del artefacto;
- runtime, framework o peers relevantes;
- configuración de build, tipos o pruebas;
- código de compatibilidad del consumidor;
- fixtures, snapshots u oracles;
- matriz de compatibilidad;
- expediente de deprecación, seguridad o rollback;
- impacto `treq_impact`;
- impacto de datos, Supabase, configuración o caché;
- alcance o severidad del cambio.

Un rebase, un commit nuevo o una modificación de lockfile no puede conservar silenciosamente checks o aprobaciones técnicas ligados al estado anterior.

#### 25. Cambios multi-package

Una propuesta multi-package solo será válida cuando el conjunto sea mínimo y cerrado por dependencias exactas o por una migración indivisible del consumidor.

Reglas:

1. no se publica ni actualiza un package sin cambio por lockstep;
2. no se incluyen packages adicionales por comodidad;
3. una release estable no depende de prereleases internas no autorizadas;
4. el conjunto objetivo queda fijo al solicitar revisión;
5. compatibilidad y gates se calculan sobre el conjunto realmente resuelto por el lockfile;
6. una propuesta posterior puede superseder la anterior sin reescribirla;
7. el merge de un consumidor no obliga al de otro;
8. la adopción escalonada debe mantener compatibilidad entre consumidores en versiones distintas.

#### 26. Cambios `MAJOR`, seguridad, deprecación y rollback

##### 26.1. `MAJOR_UPDATE`

Exige guía de migración, inventario de superficies afectadas, compatibilidad objetivo, evaluación de datos/configuración/caché, rollback soportado y aprobación reforzada.

##### 26.2. `SECURITY_UPDATE`

Puede recibir prioridad, pero no elimina compatibilidad, revisión, rollback ni separación de autoridad. No autoriza bypasses, auto-merge ni reducción de controles.

##### 26.3. `DEPRECATION_MIGRATION`

Debe vincular expedientes `DEP-*`, inventario de uso residual y condición de retiro. Abrir o fusionar un PR no cierra por sí mismo la deprecación.

##### 26.4. `ROLLBACK_UPDATE`

Restaura mediante historia revisable manifest y lockfile de un snapshot certificado. No muta una versión publicada ni edita artefactos instalados.

#### 27. Frontera de `@vento/supabase`

Actualizar `@vento/supabase` no equivale a aplicar una migración.

Toda modificación de:

- schema;
- datos;
- funciones o RPC;
- triggers;
- RLS;
- Realtime;
- Storage;
- Edge Functions;
- secretos;
- configuración;

permanece en su tarea propietaria y se ejecuta desde `devVentoGroup/vento-shell`.

Una propuesta consumidor queda bloqueada cuando requiere una modificación de Supabase no materializada o cuando package, tipos generados, schema y ambiente objetivo no demuestran compatibilidad.

#### 28. Integración con CI005

CI006 consumirá compatibilidad, no la recalculará de forma paralela.

Para una combinación de release y consumidor deberá verificar que la evidencia CI005:

1. pertenece al mismo package;
2. pertenece a la misma versión;
3. pertenece al mismo source commit y artefacto;
4. cubre la relación `PKG-COMP-MX-*` correspondiente o binding propietario aplicable;
5. cubre el target y renderer aplicables;
6. conserva ejes y restricciones vigentes;
7. no está `STALE`;
8. está finalizada contra la identidad CI003 exigible cuando corresponda.

La relación `PKG-PR-REL-*` no puede declararse elegible usando evidencia de otro consumidor o de una versión distinta.

#### 29. Integración con CI007..CI013

CI006 materializa el mecanismo común; CI007..CI013 conservan pruebas específicas antes de actualizar consumidores concretos.

Reglas:

1. la autocertificación de `SHELL-CI-006::GLOBAL` puede utilizar evidencia sintética o aislada y no depende de abrir PR reales;
2. una ejecución real para un consumidor deberá consumir las pruebas propietarias aplicables cuando estén exigidas por su contrato;
3. el resultado de NEXO no certifica FOGO, ORIGO, PULSO, VISO, NUMERA o ANIMA;
4. ANIMA permanece fuera de las 28 relaciones web `PKG-PR-REL-*`; solo podrá entrar mediante binding propietario aplicable;
5. un target nativo o Expo no se normaliza a consumidor web por similitud de stack;
6. la ausencia de una prueba específica requerida mantiene el gate correspondiente sin `PASS`.

#### 30. Integración con CI014 y CI015

CI006 deberá preservar:

- snapshot anterior certificado y `rollback_ref` para el tratamiento posterior de CI014;
- independencia entre consumidores para CI015;
- prohibición de exigir despliegue simultáneo como condición ordinaria;
- bloqueo de una propuesta cuando su adopción solo sería segura mediante sincronización simultánea no probada.

CI006 no ejecuta rollback ni coordina despliegues multi-repositorio.

#### 31. Bloqueos `PR-BLK-*`

La materialización deberá reconocer exactamente los dieciocho bloqueos aprobados:

| ID | Bloqueo | Propietario principal |
| --- | --- | --- |
| `PR-BLK-001` | package o versión objetivo no existe como release canónica | CI003 / propietario del package |
| `PR-BLK-002` | tag, release, commit, tarball o integridad no coinciden | CI003 / release |
| `PR-BLK-003` | manifest y lockfile no cambian como unidad coherente | consumidor |
| `PR-BLK-004` | rango flotante, tag, URL Git o fuente local | actualizador / consumidor |
| `PR-BLK-005` | falta compatibilidad para consumidor y conjunto objetivo | CI005 |
| `PR-BLK-006` | comprobación obligatoria falla o carece de evidencia | propietario del gate |
| `PR-BLK-007` | base, propuesta o lockfile cambió después de la evidencia | nueva ejecución |
| `PR-BLK-008` | cambio `MAJOR` sin guía, migración o aprobación reforzada | package / consumidor |
| `PR-BLK-009` | deprecación sin expediente, inventario o uso residual resuelto | política de deprecación / CI004..006 |
| `PR-BLK-010` | actualización de seguridad restaura bypass o deja exposición sin tratar | seguridad / package |
| `PR-BLK-011` | impacto de datos o Supabase sin tarea y rollback propietarios | tareas propietarias en `vento-shell` |
| `PR-BLK-012` | no existe snapshot anterior certificado | política de rollback / CI014 |
| `PR-BLK-013` | faltan revisores o aprobaciones aplicables | package / consumidor |
| `PR-BLK-014` | identidad automatizada excede permisos o intenta merge/deploy/gates | gobierno CI / seguridad |
| `PR-BLK-015` | cambios ajenos impiden atribución de compatibilidad y riesgo | consumidor |
| `PR-BLK-016` | conjunto multi-package no es mínimo, cerrado o resoluble | release / compatibilidad |
| `PR-BLK-017` | versión objetivo sustituida silenciosamente después de revisión | nuevo expediente |
| `PR-BLK-018` | adopción requeriría despliegue simultáneo no probado | CI015 / paquetes E5 |

Un bloqueo conserva causa, evidencia, propietario y condición de salida. No se normaliza como éxito por reintento, comentario, etiqueta o aprobación manual.

#### 32. Autocertificación positiva del habilitador

`SHELL-CI-006::GLOBAL` deberá demostrar, como mínimo, estos ocho escenarios sintéticos o aislados:

1. `INITIAL_ADOPTION` elegible → propuesta atribuible con manifest y lockfile coherentes;
2. `PATCH_UPDATE` compatible → propuesta mantenida de forma idempotente y evidencia vigente;
3. `MINOR_UPDATE` compatible → escenarios adicionales declarados sin cambio incompatible;
4. `MAJOR_UPDATE` completa → migración y revisión reforzada exigidas antes de quedar lista;
5. `SECURITY_UPDATE` → prioridad sin auto-merge, bypass ni pérdida de rollback;
6. `DEPRECATION_MIGRATION` → expediente `DEP-*` preservado y uso residual no cerrado por abrir el PR;
7. `ROLLBACK_UPDATE` → snapshot certificado restaurado mediante historia revisable;
8. conjunto multi-package mínimo cerrado → una sola propuesta del consumidor con versiones exactas y sin lockstep artificial.

#### 33. Autocertificación negativa del habilitador

La suite física deberá demostrar que cada uno de `PR-BLK-001..018` bloquea la propuesta o su avance al estado siguiente.

**Conciliación:** 18 bloqueos contractuales, 18 casos negativos obligatorios, 0 bloqueos sin prueba.

#### 34. Regresiones obligatorias del habilitador

La implementación global deberá proteger, como mínimo, contra:

1. convertir rango flotante en versión aceptable;
2. aceptar lockfile con drift respecto del manifest;
3. conservar evidencia después de cambiar `base_commit`;
4. conservar checks o aprobaciones técnicas después de cambiar `proposal_commit`;
5. sustituir silenciosamente la versión objetivo;
6. crear dos propuestas equivalentes para el mismo expediente lógico;
7. perder la historia de una propuesta supersedida;
8. auto-fusionar una propuesta técnicamente correcta;
9. auto-desplegar después del merge;
10. escribir directamente en una rama protegida;
11. reutilizar credenciales de publicación con privilegios de consumidor o viceversa;
12. reutilizar resultados de otro consumidor;
13. reutilizar compatibilidad de otra versión, artefacto o target;
14. aceptar `NOT_APPLICABLE` para un gate universal;
15. convertir `FAIL`, `BLOCKED`, `CANCELLED`, `TIMED_OUT` o `STALE` en `PASS` mediante reintento o aprobación manual;
16. ejecutar o inferir una migración Supabase desde el repositorio consumidor.

#### 35. Criterios de materialización de `SHELL-CI-006::GLOBAL`

La futura instancia física podrá declararse materializada únicamente cuando:

1. exista una sola implementación transversal en `vento-shell`;
2. reconozca exactamente las cuatro familias base;
3. reconozca exactamente los siete consumidores web base;
4. conserve `PKG-PR-REL-001..028` sin faltantes, duplicados ni renumeración;
5. conserve las siete clases de actualización;
6. conserve los catorce estados y transiciones;
7. conserve los 38 campos del expediente;
8. reconozca los dieciséis gates y sus propietarios;
9. reconozca los cuatro perfiles especializados;
10. reconozca los dieciocho bloqueos;
11. consuma evidencia vigente de CI001..CI005 según responsabilidad;
12. materialice manifest y lockfile como unidad;
13. soporte versiones exactas y conjuntos multi-package mínimos cerrados;
14. invalide evidencia cuando cambien entradas materiales;
15. preserve idempotencia, cierres y supersesiones;
16. aplique privilegio mínimo y separación de identidades;
17. pueda preparar y mantener una propuesta sin auto-merge o auto-deploy;
18. mantenga Supabase y datos fuera de la autoridad del actualizador;
19. soporte bindings adicionales solo desde contratos propietarios;
20. autocertifique los 8 escenarios positivos, 18 bloqueos negativos y 16 regresiones definidos;
21. no escriba en consumidores reales, no cree PR reales y no despliegue durante la autocertificación global.

#### 36. Recuperación e idempotencia

Reglas:

1. una ejecución parcial no declara la propuesta lista;
2. una escritura parcial de expediente no constituye evidencia suficiente;
3. un reintento exacto no duplica el expediente lógico;
4. una discrepancia de base, lockfile, release o evidencia produce bloqueo o invalidación;
5. un fallo de un consumidor no altera expedientes de otro;
6. una corrección del actualizador no reescribe expedientes históricos;
7. una propuesta ya fusionada o cerrada conserva su historia;
8. una versión objetivo nueva usa supersesión explícita;
9. una recuperación nunca fuerza push, merge o deploy para “arreglar” el estado;
10. un fallo del actualizador no modifica packages, releases ni consumidores fuera de su checkout aislado.

#### 37. Estado documental conciliado

| Métrica | Resultado |
| --- | ---: |
| Packages base | **4** |
| Consumidores web base | **7** |
| Relaciones `PKG-PR-REL-*` | **28** |
| Clases de actualización | **7** |
| Estados del ciclo de propuesta | **14** |
| Campos del expediente `PKG-PR-*` | **38** |
| Gates canónicos | **16** |
| Gates universales | **15** |
| Gates condicionales | **1** |
| Perfiles especializados | **4** |
| Bloqueos `PR-BLK-*` | **18** |
| Escenarios positivos de autocertificación | **8** |
| Casos negativos obligatorios | **18** |
| Regresiones obligatorias | **16** |
| Auto-merges autorizados | **0** |
| Auto-deploys autorizados por el actualizador | **0** |
| PR reales creados por este marcador | **0** |
| Requisitos de prueba creados o modificados | **0** |

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** **0**
**Requisitos modificados:** **0**

**Justificación:** CI006 materializa el vehículo y la automatización de obligaciones ya existentes sobre comandos reproducibles, compatibilidad previa, rollback independiente, evidencia por package y pull request, identidad de repositorio y ambiente, identidad inmutable de release, cortes coordinados, deprecación y retiro. La tarea no introduce una nueva obligación empresarial independiente; convierte contratos aprobados en un habilitador global reutilizable y conserva la cobertura vigente sin alterar el registro.

#### 39. Cobertura de prueba vigente reutilizada

La cobertura existente se reutiliza sin modificación:

- `TREQ-SHELL-005` protege comandos reproducibles y bloqueos de merge o despliegue según criticidad;
- `TREQ-SHELL-006` exige pruebas propias y matriz de compatibilidad antes de publicar o adoptar, con adopción independiente por repositorio;
- `TREQ-SHELL-007` exige rollback independiente y probado;
- `TREQ-SHELL-008` exige declaración de requisitos afectados y resultados reproducibles por package y PR;
- `TREQ-SHELL-009` exige identidad verificable de repositorio, commit y ambiente;
- `TREQ-SHELL-036` protege identidad inmutable de release;
- `TREQ-SHELL-037` protege cortes coordinados y dependencias internas exactas;
- `TREQ-SHELL-038` protege deprecación, migración e inventario de consumidores;
- `TREQ-SHELL-039` mantiene retiro y fin de soporte bloqueados hasta resolver consumidores, compatibilidad y rollback.

Estas referencias son trazabilidad de cobertura vigente y no constituyen modificación del registro.

#### 40. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El marcador documental no materializa ni ejecuta el actualizador global. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout del usuario ni validado por sus scripts documentales. |
| REMOTA | PASS | Se verificaron continuidad CI005→CI006→CI007, topología `GLOBAL_ENABLE_ONCE`, `SHELL-PKG-007`, `SHELL-PKG-008`, 28 relaciones, 7 clases, 14 estados, 38 campos, 16 gates, 4 perfiles, 18 bloqueos, CI005 `VERIFIED`, interfaz de compatibilidad vigente y cobertura 04A aplicable. |
| OPERATIVA | NOT_EXECUTED | No se abrió, actualizó, fusionó ni desplegó ningún pull request real durante este marcador. |
| FÍSICA | NOT_APPLICABLE | La materialización pertenece a `SHELL-CI-006::GLOBAL` después de aprobación documental y autorización física explícita. |

#### 41. Criterios de aceptación

`SHELL-CI-006` queda documentalmente completa cuando:

- identifica `SHELL-CI-006::GLOBAL` como habilitador global único;
- conserva exactamente 4 packages y 7 consumidores web base;
- conserva exactamente `PKG-PR-REL-001..028`;
- distingue la matriz de actualización de la matriz de compatibilidad;
- conserva 7 clases de actualización;
- conserva 14 estados y sus transiciones;
- conserva los 38 campos del expediente;
- conserva los 16 `PKG-GATE-*` y sus propietarios;
- conserva 4 perfiles especializados;
- conserva 18 `PR-BLK-*`;
- consume releases CI003 y compatibilidad CI005 sin duplicarlas;
- actualiza manifest y lockfile como una unidad coherente;
- usa versiones exactas y conjuntos mínimos cerrados;
- invalida checks y evidencia cuando cambia una entrada material;
- preserva idempotencia y supersesión;
- impide auto-merge, auto-deploy y push directo a ramas protegidas;
- separa identidades de publicación, actualización, revisión, merge y despliegue;
- mantiene `@vento/supabase` separado de migraciones y datos;
- define integración con CI007..CI015 sin absorber sus responsabilidades;
- define 8 casos positivos, 18 negativos y 16 regresiones para autocertificación;
- no abre PR reales, no modifica consumidores, no publica releases y no ejecuta Supabase durante el marcador documental;
- no crea ni modifica requisitos de prueba.

#### 42. Límites

Esta tarea no:

- implementa físicamente `SHELL-CI-006::GLOBAL`;
- crea workflows, bots, GitHub Apps, tokens o secretos;
- elige Dependabot, Renovate u otro proveedor por inferencia;
- crea ramas o pull requests reales;
- modifica `package.json`, manifests o lockfiles reales de consumidores;
- modifica packages compartidos;
- publica tags, releases o registry;
- fusiona cambios;
- despliega consumidores;
- configura protección de ramas o revisores;
- ejecuta CI007..CI013;
- ejecuta rollback de CI014;
- coordina despliegue simultáneo;
- incorpora ANIMA, PASS, TALENTO o móviles a las 28 relaciones base;
- ejecuta cambios de Supabase, migraciones, RLS, RPC, datos o configuración;
- crea, modifica, difiere, descarta u obsolete requisitos del registro 04A.

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-CI-005 — Crear matriz de compatibilidad`

**TAREA ACTUAL APROBADA**
`SHELL-CI-006 — Crear actualización de consumidores mediante PR`

**SIGUIENTE TAREA RESERVADA**
`SHELL-CI-007 — Probar NEXO antes de actualizar`
