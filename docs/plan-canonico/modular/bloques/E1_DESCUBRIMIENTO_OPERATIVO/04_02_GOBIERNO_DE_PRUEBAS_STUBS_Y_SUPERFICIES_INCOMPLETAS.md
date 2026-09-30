### MINI-BLOQUE — GOBIERNO DE PRUEBAS STUBS Y SUPERFICIES INCOMPLETAS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **gobierno de pruebas stubs y superficies incompletas** dentro de **E1 DESCUBRIMIENTO OPERATIVO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `QA-GOV-001` a `WEB-FRM-011` — 5 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `QA-GOV-001`: Definir gobierno, registro y ciclo de vida de requisitos de prueba
- `CODE-AUD-008`: Detectar `TODO`, `FIXME`, stubs y funciones no terminadas
- `CODE-AUD-009`: Detectar valores hardcodeados y decisiones técnicas temporales
- `CODE-AUD-010`: Detectar pantallas con interfaz pero sin lógica completa
- `WEB-FRM-011`: Implementar suscripción de newsletter o retirar la interfaz
<!-- PLAN-SECTION-META:END -->

### ✅ QA-GOV-001 — Definir gobierno, registro y ciclo de vida de requisitos de prueba

**Estado:** APROBADA
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Tipo:** gobierno técnico y documental transversal de calidad  
**Dependencia anterior:** `CODE-AUD-007`  
**Continuidad reservada:** `CODE-AUD-008`  
**Fecha de corte:** 2026-07-24  
**Cambios en código, CI o Supabase:** no autorizados ni realizados durante esta tarea  

---

#### 1. Resultado de esta tarea

Esta tarea establece el sistema canónico mediante el cual Vento OS deberá:

1. detectar que un comportamiento necesita protección mediante pruebas;
2. crear un requisito identificable `TREQ-*`;
3. registrarlo sin depender de la memoria;
4. especificarlo progresivamente;
5. asignarlo a una tarea y posteriormente a un paquete de implementación;
6. implementar la prueba junto con el comportamiento protegido;
7. ejecutarla en el ambiente correspondiente;
8. conservar evidencia;
9. impedir que una regresión reaparezca silenciosamente;
10. certificar la cobertura integral antes del cierre de una aplicación o dominio.

El sistema no obliga a escribir pruebas automatizadas durante la fase documental actual. Sí obliga a registrar inmediatamente la necesidad de prueba y a darle un destino documental exacto.

La cadena canónica será:

```text
regla, riesgo, defecto o contrato detectado
        ↓
requisito de prueba `TREQ-*`
        ↓
Registro Canónico de Requisitos de Prueba
        ↓
especificación funcional y técnica
        ↓
paquete de implementación
        ↓
prueba implementada junto con el código
        ↓
ejecución automática o validación manual controlada
        ↓
evidencia
        ↓
regresión integral y certificación
```

---

#### 2. Problema que resuelve

Hasta `CODE-AUD-007`, Vento OS no dispone de una suite automatizada transversal identificable.

La validación se ha realizado principalmente mediante uso directo de las aplicaciones durante el desarrollo. Ese método seguirá siendo necesario para experiencia, hardware y operación real, pero no garantiza por sí solo que:

- una corrección continúe funcionando después de otro cambio;
- las reglas críticas se vuelvan a probar;
- los casos denegados de autorización se ejecuten;
- una migración preserve datos;
- un reintento no duplique efectos;
- un error corregido no reaparezca;
- todas las aplicaciones consumidoras sigan siendo compatibles;
- exista evidencia reproducible antes de desplegar.

La solución no consiste en crear pruebas genéricas de manera masiva. Consiste en convertir cada necesidad verificable en un requisito trazable y asignado.

---

#### 3. Conceptos canónicos

##### 3.1. Requisito de prueba

Un requisito de prueba es una obligación documental identificada mediante `TREQ-*` que describe un comportamiento, regla, contrato o riesgo que deberá ser verificado.

Ejemplo:

```text
TREQ-NEXO-001
Un retiro parcial debe descontar unidades y no paquetes completos.
```

El requisito define **qué debe quedar protegido**. No es todavía el archivo de prueba.

##### 3.2. Implementación de prueba

Es el código, script, consulta o procedimiento que ejecuta la verificación.

Ejemplos:

- archivo Vitest;
- prueba Node;
- prueba Playwright;
- script SQL de validación;
- prueba de contrato;
- prueba negativa de RLS;
- checklist manual de una impresora física.

##### 3.3. Tarea de pruebas

Una tarea `AUTH-QA-*`, `UX-QA-*`, `SHELL-CI-*` u otra tarea de calidad organiza una actividad de implementación, ejecución o certificación.

Una tarea de pruebas no sustituye el requisito `TREQ-*`.

##### 3.4. Evidencia

Es la demostración verificable de que la prueba fue ejecutada y cuál fue su resultado.

Puede ser:

- ejecución de CI;
- reporte de pruebas;
- ruta del archivo;
- commit;
- artefacto;
- log controlado;
- acta de prueba manual;
- registro de piloto;
- evidencia fotográfica de hardware sin datos sensibles.

##### 3.5. Datos de prueba

Son datos aislados utilizados para ejecutar una prueba sin alterar la operación real.

No equivalen automáticamente a un seed global ni a datos demo persistentes.

---

#### 4. Diferencia entre requisito, tarea, prueba y evidencia

| Elemento            | Pregunta que responde                                    | Ejemplo                   |
| ------------------- | -------------------------------------------------------- | ------------------------- |
| requisito `TREQ-*`  | ¿qué comportamiento debe protegerse?                     | no duplicar una recepción |
| tarea               | ¿qué trabajo organiza su implementación o certificación? | paquete ORIGO o tarea QA  |
| prueba implementada | ¿qué mecanismo lo verifica?                              | archivo de integración    |
| ejecución           | ¿cuándo y dónde se comprobó?                             | CI de un PR               |
| evidencia           | ¿cómo se demuestra el resultado?                         | reporte y commit          |
| incidente           | ¿qué falla real originó o reabrió el requisito?          | recepción duplicada       |

La relación no será necesariamente uno a uno:

- un requisito puede necesitar varias pruebas;
- una prueba parametrizada puede cubrir varios escenarios del mismo requisito;
- una tarea puede implementar varios requisitos;
- una tarea de certificación puede ejecutar requisitos ya implementados.

---

#### 5. Fuente de verdad y prevención de deriva

Se aprueba un modelo de dos niveles:

##### 5.1. Declaración de origen dentro de la tarea

La sección `#### Requisitos de prueba derivados` conserva el momento y la razón por la cual una tarea creó o reutilizó un requisito.

Esa declaración forma parte del historial aprobado de la tarea y no deberá reescribirse para actualizar estados posteriores.

##### 5.2. Registro central de ciclo de vida

`04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md` será la fuente de verdad del estado vigente de cada requisito.

El registro central podrá actualizar:

- estado;
- tarea responsable;
- paquete;
- repositorio;
- ambiente;
- artefacto de prueba;
- último resultado;
- evidencia;
- relación de sustitución.

La tarea de origen y el registro central no compiten:

```text
tarea de origen
→ explica por qué nació

registro central
→ controla qué ocurrió después
```

---

#### 6. Convención de identificadores

Los requisitos utilizarán:

```text
TREQ-<DOMINIO>-<NNN>
```

Ejemplos:

```text
TREQ-AUTH-001
TREQ-SUPABASE-001
TREQ-NEXO-001
TREQ-PASS-001
TREQ-INTEGRATION-001
TREQ-UX-001
```

Dominios iniciales permitidos:

- `AUTH`;
- `SHELL`;
- `SUPABASE`;
- `ANIMA`;
- `VISO`;
- `NEXO`;
- `FOGO`;
- `ORIGO`;
- `PULSO`;
- `NUMERA`;
- `PASS`;
- `TALENTO`;
- `INTEGRATION`;
- `UX`.

Reglas:

1. La secuencia será global por dominio, no por repositorio.
2. El identificador será inmutable.
3. Un identificador descartado u obsoleto no se reutilizará.
4. Si un requisito cambia de repositorio, conservará su identificador.
5. Si cambia sustancialmente la regla protegida, deberá crearse otro requisito.
6. Un dominio nuevo requerirá decisión documental explícita.
7. Antes de crear un identificador deberá comprobarse que no exista otro requisito equivalente.

---

#### 7. Cuándo debe generarse un requisito

Deberá generarse un `TREQ-*` cuando una tarea detecte o defina al menos uno de estos elementos:

##### 7.1. Reglas de negocio

- cálculos;
- conversiones;
- redondeos;
- límites;
- estados;
- transiciones;
- prerequisitos;
- prohibiciones;
- idempotencia;
- compensaciones.

##### 7.2. Autorización y seguridad

- acceso permitido;
- acceso denegado;
- alcance por empresa, sede o área;
- check-in;
- turno;
- dispositivo compartido;
- simulación;
- datos sensibles;
- RLS;
- grants;
- funciones `SECURITY DEFINER`;
- exposición de Storage;
- secretos.

##### 7.3. Datos y Supabase

- restricciones;
- integridad referencial;
- migraciones;
- backfills;
- normalización;
- conservación de datos;
- rollback;
- RPC;
- triggers;
- Realtime;
- Storage;
- concurrencia;
- transacciones.

##### 7.4. Integraciones

- contrato de entrada;
- contrato de salida;
- autenticación;
- mapeo;
- deduplicación;
- reintentos;
- timeouts;
- fallos parciales;
- webhooks;
- colas;
- impresión;
- notificaciones;
- pagos.

##### 7.5. Incidentes y regresiones

Todo defecto reproducible corregido deberá generar o reutilizar un requisito de regresión.

La corrección no podrá cerrarse únicamente porque funcione una vez de forma manual.

##### 7.6. Procesos completos

Se generarán requisitos E2E cuando sea necesario comprobar una cadena entre:

- aplicaciones;
- dominios;
- actores;
- dispositivos;
- estados;
- documentos;
- inventario;
- ventas;
- producción;
- compras;
- contabilidad;
- fidelización.

---

#### 8. Cuándo no debe generarse un requisito nuevo

No deberá crearse un `TREQ-*` nuevo cuando:

1. ya exista un requisito equivalente;
2. la tarea sea exclusivamente editorial y no altere comportamiento;
3. el cambio sea de formato documental sin efecto ejecutable;
4. la observación describa una preferencia visual sin criterio verificable;
5. el mismo requisito pueda ampliarse mediante casos parametrizados sin cambiar la regla;
6. la necesidad corresponda únicamente a ejecutar nuevamente una prueba ya registrada.

En esos casos deberá:

- reutilizarse el identificador existente; o
- declararse `NO GENERA REQUISITOS DE PRUEBA` con justificación.

---

#### 9. Granularidad y deduplicación

Un requisito deberá proteger una regla o riesgo coherente, no cada archivo ni cada botón.

Ejemplo correcto:

```text
TREQ-NEXO-001
Un retiro parcial descuenta exactamente la cantidad solicitada en la unidad canónica.
```

Ejemplos excesivamente fragmentados:

```text
probar botón retirar
probar campo cantidad
probar función convertUnits
probar componente WithdrawModal
```

Esos elementos pueden convertirse en casos de prueba del mismo requisito.

Deberá crearse otro requisito cuando cambie alguno de estos elementos:

- regla empresarial;
- actor autorizado;
- límite territorial;
- efecto persistente;
- riesgo protegido;
- contrato externo;
- mecanismo de seguridad;
- comportamiento ante error.

---

#### 10. Formato obligatorio dentro de cada tarea

Toda tarea deberá incluir, antes de sus criterios de aceptación:

```text
#### Requisitos de prueba derivados
```

##### 10.1. Cuando genera requisitos

Formato mínimo:

| ID  | Regla protegida | Riesgo | Tipo | Modalidad | Prioridad | Tarea responsable |
| --- | --------------- | ------ | ---- | --------- | --------- | ----------------- |

La tarea deberá indicar si cada requisito:

- se crea;
- reutiliza uno existente;
- amplía casos de un requisito existente;
- sustituye otro requisito.

##### 10.2. Cuando no genera requisitos

Deberá utilizar:

```text
**Resultado:** NO GENERA REQUISITOS DE PRUEBA
```

y explicar por qué no existe comportamiento ejecutable nuevo o modificado.

##### 10.3. Prohibiciones

No serán válidas expresiones como:

- probar después;
- revisar en QA;
- validar en implementación;
- probar cuando exista tiempo;
- agregar tests al final;
- verificar en el piloto;
- corresponde al BLOQUE U.

Toda necesidad deberá tener identificador y tarea responsable exacta.

---

#### 11. Esquema del Registro Canónico

Cada requisito deberá conservar, como mínimo:

| Campo                           | Obligatorio desde | Regla                              |
| ------------------------------- | ----------------- | ---------------------------------- |
| `id`                            | identificación    | único e inmutable                  |
| `dominio`                       | identificación    | dominio estable                    |
| `regla_protegida`               | identificación    | resultado observable               |
| `origen`                        | identificación    | tarea, hallazgo o incidente exacto |
| `riesgo`                        | identificación    | consecuencia que se evita          |
| `prioridad`                     | identificación    | crítica, alta, media o baja        |
| `tipo`                          | identificación    | clase de prueba                    |
| `modalidad`                     | identificación    | automatizada, manual o híbrida     |
| `tarea_responsable`             | identificación    | siguiente dueño documental exacto  |
| `paquete`                       | planificación E5  | paquete exacto                     |
| `repositorio`                   | planificación E5  | propietario técnico                |
| `ambiente`                      | especificación    | lugar de ejecución                 |
| `estado`                        | siempre           | estado vigente                     |
| `artefacto`                     | implementación    | ruta o mecanismo de prueba         |
| `ultimo_resultado`              | ejecución         | pendiente, aprobada o fallida      |
| `evidencia`                     | verificación      | referencia reproducible            |
| `sustituye_o_es_sustituido_por` | cuando aplique    | relación histórica                 |

La tabla canónica del registro deberá contener:

| ID  | Dominio | Regla protegida | Origen | Riesgo / prioridad | Tipo / modalidad | Tarea responsable | Paquete | Repositorio / ambiente | Estado | Artefacto | Último resultado | Evidencia | Relación |
| --- | ------- | --------------- | ------ | ------------------ | ---------------- | ----------------- | ------- | ---------------------- | ------ | --------- | ---------------- | --------- | -------- |

No deberán almacenarse secretos, tokens, contraseñas, datos personales completos ni payloads sensibles dentro del registro.

---

#### 12. Estados del ciclo de vida

##### `IDENTIFICADO`

La necesidad existe, tiene ID, origen, regla, riesgo, prioridad y tarea responsable.

No exige todavía archivo de prueba.

##### `ESPECIFICADO`

Están definidos:

- estado inicial;
- actor o contexto;
- acción;
- resultado esperado;
- datos requeridos;
- ambiente;
- modalidad;
- casos positivos y negativos aplicables.

##### `PLANIFICADO`

Está vinculado con:

- paquete exacto;
- repositorio;
- archivos previstos;
- comando previsto;
- criterio de aceptación;
- puerta de despliegue.

##### `IMPLEMENTADO`

La prueba existe como código o procedimiento controlado.

Este estado no significa que la última ejecución haya aprobado.

##### `VERIFICADO`

La ejecución requerida fue aprobada y existe evidencia reproducible.

Si una ejecución obligatoria posterior falla, el requisito deberá volver a `IMPLEMENTADO` hasta recuperar el resultado.

##### `DIFERIDO`

La prueba fue aplazada mediante decisión explícita.

Exige:

- razón;
- riesgo aceptado;
- tarea exacta de reanudación;
- puerta antes de la cual deberá resolverse;
- responsable.

Un requisito crítico no podrá diferirse para permitir producción ordinaria.

##### `DESCARTADO`

La regla no requiere prueba o el requisito era duplicado.

Exige justificación aprobada y referencia al requisito conservado cuando exista duplicidad.

##### `OBSOLETO`

El comportamiento protegido fue retirado o reemplazado.

Debe conservarse el historial y señalar su sucesor cuando aplique.

---

#### 13. Transiciones permitidas

```text
IDENTIFICADO
        ↓
ESPECIFICADO
        ↓
PLANIFICADO
        ↓
IMPLEMENTADO
        ↓
VERIFICADO
```

Transiciones controladas:

```text
IDENTIFICADO / ESPECIFICADO / PLANIFICADO
        → DIFERIDO

IDENTIFICADO / ESPECIFICADO
        → DESCARTADO

cualquier estado vigente
        → OBSOLETO
```

Reglas adicionales:

1. `VERIFICADO` no es una aprobación permanente.
2. Una falla posterior reabre el requisito.
3. Una modificación sustantiva de la regla puede crear un nuevo requisito.
4. Los estados históricos no se eliminan para ocultar fallas.
5. La fecha y resultado de la última ejecución deberán actualizarse cuando exista automatización.

---

#### 14. Prioridades y efecto sobre las puertas

##### Crítica

Incluye riesgos de:

- acceso no autorizado;
- pérdida o exposición de datos;
- dinero;
- inventario;
- identidad;
- efectos irreversibles;
- cumplimiento legal;
- duplicación de movimientos;
- corrupción de migraciones;
- imposibilidad de rollback.

Regla:

- debe bloquear paquete, merge, despliegue o piloto según corresponda;
- deberá automatizarse cuando el comportamiento sea determinista;
- no podrá quedar diferida para producción ordinaria.

##### Alta

Incluye:

- interrupción de un proceso principal;
- resultado empresarial incorrecto;
- incompatibilidad entre aplicaciones;
- fallo de integración recuperable con impacto operativo alto.

Regla:

- debe resolverse antes de cerrar el paquete o iniciar piloto, salvo puerta explícita más estricta.

##### Media

Incluye:

- errores recuperables;
- rutas secundarias;
- degradación controlada;
- comportamiento no crítico.

Regla:

- podrá planificarse dentro del paquete o antes del cierre integral con destino exacto.

##### Baja

Incluye:

- validaciones no críticas;
- comportamientos cosméticos verificables;
- mejoras de conveniencia.

Regla:

- podrá utilizar validación manual o diferimiento formal sin bloquear producción, si no afecta otro requisito.

---

#### 15. Tipos de prueba

Tipos permitidos:

- `unitaria`;
- `contractual`;
- `componente`;
- `integración`;
- `base_de_datos`;
- `migración`;
- `RLS`;
- `RPC`;
- `seguridad`;
- `concurrencia`;
- `idempotencia`;
- `E2E`;
- `regresión`;
- `interfaz`;
- `experiencia`;
- `manual_operativa`;
- `hardware`.

Un requisito podrá tener un tipo principal y tipos complementarios.

Ejemplo:

```text
tipo principal: integración
complementarios: idempotencia, regresión
```

---

#### 16. Modalidades

##### Automatizada

Se utilizará por defecto cuando el resultado sea determinista y ejecutable sin interpretación humana.

Ejemplos:

- cálculos;
- permisos;
- RLS;
- RPC;
- estados;
- migraciones;
- contratos;
- validaciones;
- reintentos;
- idempotencia;
- integridad.

##### Manual

Se utilizará cuando la comprobación dependa principalmente de:

- comprensión humana;
- ergonomía;
- experiencia;
- operación física;
- impresión real;
- sonido;
- cámara;
- periféricos;
- conectividad del sitio;
- capacitación.

##### Híbrida

Combina una verificación automatizada del contrato con una comprobación física u operativa.

Ejemplo:

```text
automatizada:
el ZPL generado contiene dimensiones y datos correctos

manual:
la Zebra imprime centrada y el código es legible
```

Una prueba manual no será una categoría inferior. Deberá tener pasos, ambiente, responsable, resultado y evidencia.

---

#### 17. Momento de creación, especificación e implementación

| Etapa                        | Obligación                                                           |
| ---------------------------- | -------------------------------------------------------------------- |
| E1 — descubrimiento          | crear o reutilizar `TREQ-*` y registrar riesgo                       |
| E2 — procesos y experiencia  | definir actor, escenario, resultado y casos operativos               |
| E3 — Supabase                | definir datos, integridad, migración, RLS, RPC y rollback            |
| E4 — servicios transversales | definir contratos, colas, impresión, notificaciones y evidencia      |
| E5 — planificación           | asignar paquete, repositorio, ambiente, archivos, comando y puerta   |
| T / R0 — infraestructura     | habilitar runner, CI, staging, harness y datos aislados              |
| implementación por paquete   | escribir la prueba junto con el código o migración                   |
| integración                  | ejecutar contratos entre consumidores                                |
| piloto e hypercare           | convertir cada defecto en regresión                                  |
| U — cierre integral          | ejecutar regresión completa, seguridad, E2E, experiencia y operación |

El BLOQUE U no será el lugar inicial para escribir las pruebas unitarias, contractuales, de seguridad o integración que debieron acompañar el paquete.

---

#### 18. Regla para defectos y regresiones

Cuando se detecte un defecto:

1. deberá reproducirse de forma controlada;
2. deberá buscarse si ya existe un `TREQ-*`;
3. si no existe, deberá crearse;
4. deberá registrarse el caso que falló;
5. la corrección deberá incluir la prueba automatizada cuando sea viable;
6. si solo es verificable manualmente, deberá documentarse el procedimiento;
7. la prueba deberá fallar antes de la corrección cuando sea técnicamente posible;
8. deberá aprobar después de la corrección;
9. quedará incorporada a la regresión futura;
10. el incidente se cerrará con evidencia.

No se admitirá corregir un error crítico y confiar únicamente en recordar volver a probarlo.

---

#### 19. Estrategia de datos de prueba

`QA-GOV-001` no crea ni ordena restaurar un seed global.

Se conservan las decisiones de `CODE-AUD-007`:

- el seeding local permanece deshabilitado;
- no se cargará un catálogo demo completo durante `supabase db reset`;
- las migraciones productivas no se tratarán como fixtures;
- no se reutilizarán datos históricos de sandbox retirados.

La estrategia preferida será:

1. factories o constructores mínimos;
2. fixtures específicos por contrato;
3. datos efímeros;
4. transacciones revertibles;
5. proyectos o ambientes aislados;
6. identificadores explícitos de prueba;
7. limpieza determinista.

Producción:

- no deberá recibir datasets sintéticos por defecto;
- no deberá utilizarse para pruebas destructivas;
- solo admitirá verificaciones controladas y no mutantes, salvo piloto o procedimiento aprobado;
- no deberán copiarse datos personales reales a ambientes de prueba sin anonimización y autorización.

---

#### 20. Ambientes de ejecución

Valores permitidos:

- `local_aislado`;
- `CI`;
- `staging`;
- `preview`;
- `piloto_controlado`;
- `hardware_fisico`;
- `produccion_no_mutante`;
- `produccion_controlada`, únicamente cuando exista autorización expresa.

Cada requisito deberá indicar el ambiente mínimo requerido antes de pasar a `PLANIFICADO`.

---

#### 21. Relación con paquetes de implementación

`DELIV-PKG-016` deberá convertir los requisitos asignados en una matriz ejecutable.

Cada paquete deberá declarar:

- requisitos incluidos;
- requisitos excluidos;
- requisitos diferidos;
- archivos de prueba;
- datos de prueba;
- comandos;
- ambiente;
- criterios de aprobación;
- pruebas existentes que no pueden romperse;
- evidencia esperada;
- efecto de una falla sobre merge, despliegue, piloto y rollback.

Una capacidad no podrá entrar a implementación si sus requisitos críticos no están al menos `PLANIFICADOS`.

---

#### 22. Relación con tareas `AUTH-QA-*` y `UX-QA-*`

Las tareas existentes del BLOQUE U se conservan.

Su función será:

- certificar escenarios integrales;
- ejecutar pruebas de seguridad;
- validar comportamiento por rol;
- validar procesos entre aplicaciones;
- comprobar experiencia y operación real;
- ejecutar regresión transversal.

No deberán utilizarse para aplazar la implementación de pruebas que pertenecen al paquete.

Ejemplo:

```text
TREQ-AUTH-001
→ se implementa mediante pruebas RLS, RPC y servidor dentro del paquete
→ se vuelve a certificar mediante AUTH-QA-023 en BLOQUE U
```

---

#### 23. Relación con el Registro Canónico de Brechas

Un `TREQ-*` no es automáticamente una brecha.

Puede representar:

- una regla nueva;
- una protección preventiva;
- una regresión;
- un criterio de aceptación;
- una obligación de seguridad.

Cuando la ausencia de una prueba implique cobertura insuficiente, podrá vincularse también con un `GAP-*`.

Relación:

```text
GAP
→ describe qué falta o está mal

TREQ
→ describe qué deberá comprobarse para demostrar la corrección

DELIV-PKG
→ implementa la solución y la prueba
```

---

#### 24. Responsabilidades

Las responsabilidades pueden recaer en la misma persona, pero no podrán omitirse.

##### Autor de la tarea de origen

- detecta la necesidad;
- busca duplicados;
- crea o reutiliza el ID;
- registra regla, riesgo, prioridad y tarea responsable.

##### Propietario funcional

- confirma que el resultado esperado representa la operación real;
- define casos permitidos, denegados y excepciones.

##### Propietario técnico

- define tipo, modalidad, ambiente y estrategia de datos;
- evita pruebas acopladas a detalles irrelevantes.

##### Propietario del paquete

- implementa;
- integra con CI;
- conserva pruebas anteriores;
- entrega evidencia.

##### Responsable de verificación

- ejecuta o revisa la evidencia;
- registra el resultado;
- reabre el requisito si falla.

---

#### 25. Puertas obligatorias

##### Aprobación de una tarea documental

Una tarea podrá aprobarse sin implementar la prueba cuando:

- el requisito está creado o reutilizado;
- la fila está registrada;
- la tarea responsable es exacta;
- la etapa de implementación está definida;
- no queda una mención narrativa sin dueño.

##### Aprobación de un paquete E5

Exige:

- requisitos críticos y altos identificados;
- escenarios especificados;
- paquete, repositorio y ambiente asignados;
- modalidad definida;
- diferimientos justificados;
- criterio de evidencia.

##### Cierre de implementación

Exige:

- pruebas implementadas;
- comandos ejecutables;
- resultado aprobado;
- no ruptura de regresión;
- evidencia;
- actualización del registro.

##### Entrada a piloto

Exige:

- cero requisitos críticos fallidos;
- requisitos altos aplicables verificados;
- validaciones manuales de hardware programadas;
- rollback probado cuando corresponda.

##### Cierre del BLOQUE U

Exige:

- regresión integral;
- E2E;
- seguridad;
- pruebas por aplicación;
- validaciones operativas;
- estado final de todos los requisitos críticos y altos.

---

#### 26. Evidencia mínima

##### Automatizada

Deberá incluir:

- ID `TREQ-*`;
- archivo o suite;
- comando;
- ambiente;
- fecha o ejecución;
- resultado;
- commit o versión;
- enlace o ruta de reporte cuando exista.

##### Manual

Deberá incluir:

- ID `TREQ-*`;
- procedimiento;
- actor;
- sede o ambiente;
- dispositivo;
- datos usados;
- fecha;
- resultado;
- observaciones;
- evidencia adjunta cuando corresponda.

No será evidencia suficiente escribir solamente:

```text
probado manualmente
```

---

#### 27. Control temporal antes de automatizar el registro

Hasta implementar `SHELL-CI-017`, la verificación será manual y deberá comprobar:

1. que el ID no esté duplicado;
2. que el dominio esté permitido;
3. que el origen exista;
4. que la tarea responsable exista;
5. que `VERIFICADO` tenga evidencia;
6. que `DIFERIDO` tenga tarea de reanudación;
7. que `DESCARTADO` tenga justificación;
8. que un requisito crítico no llegue a E5 sin paquete;
9. que todo requisito usado en un paquete exista en el registro;
10. que no haya requisitos eliminados silenciosamente.

Después, `SHELL-CI-017` deberá convertir estas reglas en un verificador automático.

---

#### 28. Política para cambios y pull requests futuros

Cuando exista infraestructura de CI, todo cambio que implemente o modifique una regla protegida deberá:

- mencionar los IDs `TREQ-*`;
- añadir o actualizar las pruebas;
- ejecutar la suite correspondiente;
- impedir merge si falla una prueba bloqueante;
- publicar evidencia;
- actualizar el registro cuando cambie el estado.

Esta política no se implementa durante `QA-GOV-001`. Su implementación pertenece al BLOQUE T y a los paquetes correspondientes.

---

#### 29. Cobertura desde este punto

Desde `CODE-AUD-008`, toda tarea nueva deberá aplicar inmediatamente este gobierno.

Las tareas anteriores a `QA-GOV-001` no se modificarán una por una durante la continuidad inmediata.

Se crea la siguiente tarea derivada:

```text
QA-REG-001
— Consolidar retrospectivamente requisitos de prueba de decisiones,
  hallazgos e incidentes anteriores a QA-GOV-001
```

Definición de `QA-REG-001`:

- **Bloque:** E1;
- **archivo lógico propietario:** `04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md`;
- **dependencia:** `CODE-AUD-020`;
- **momento de ejecución:** después de `CODE-AUD-020` y antes de `CAP-SCOPE-001`;
- **propósito:** revisar decisiones aprobadas, hallazgos, `AUTH-QA-*`, `UX-QA-*`, brechas y reglas críticas anteriores; crear requisitos faltantes; deduplicarlos; asignar tareas de maduración;
- **restricción:** no implementar pruebas ni modificar código;
- **salida:** registro retrospectivo inicial completo y trazable.

`QA-REG-001` no interrumpe la continuidad inmediata hacia `CODE-AUD-008`, pero deberá quedar físicamente materializada antes de avanzar desde `QA-GOV-001`.

---

#### 30. Estado inicial del registro

El archivo `04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md` ya existe con una estructura inicial, pero su tabla permanece vacía.

Decisión:

- no se inventarán requisitos para llenar el registro;
- los requisitos nuevos comenzarán a registrarse desde `CODE-AUD-008`;
- la cobertura retrospectiva se realizará mediante `QA-REG-001`;
- los IDs se asignarán únicamente después de identificar una regla concreta;
- las pruebas existentes de VITAL permanecerán fuera de Vento OS.

---

#### 31. Correcciones documentales asociadas a la consolidación

Al consolidar la aprobación de `QA-GOV-001` deberán ejecutarse estas acciones documentales:

1. reemplazar el marcador de `QA-GOV-001` por su contenido aprobado;
2. conservar `CODE-AUD-008` como continuidad inmediata;
3. materializar el marcador de `QA-REG-001` dentro de `04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md`;
4. insertar `QA-REG-001` en `90_ORDEN_DE_IMPLEMENTACION.md` después de `CODE-AUD-020` y antes de `CAP-SCOPE-001`;
5. alinear `00_CABECERA_Y_ESTADO.md` con la continuidad vigente;
6. regenerar el compilado y el registro global;
7. comprobar que cada identificador de tarea aparezca exactamente una vez;
8. normalizar en `01_PROTOCOLO.md` la duplicación del párrafo sobre pendientes sin destino;
9. conservar las reglas de prueba como bloque normativo identificable sin dejar una numeración incoherente.

Estas acciones son de consolidación documental. No constituyen implementación de pruebas.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `QA-GOV-001` define el gobierno documental y el ciclo de vida de requisitos de prueba, pero no crea ni modifica un comportamiento ejecutable de Vento OS.

La tarea sí genera la tarea documental derivada `QA-REG-001`, responsable de la consolidación retrospectiva.

---

#### 33. Decisiones propuestas

1. Se adopta `TREQ-*` como identificador canónico de requisitos de prueba.
2. Un requisito no equivale a una tarea, archivo o evidencia.
3. La tarea de origen conserva la razón histórica del requisito.
4. El registro central conserva su estado vigente.
5. Los IDs serán inmutables y no reutilizables.
6. Toda regla determinista crítica deberá automatizarse cuando sea técnicamente viable.
7. Las pruebas manuales se conservarán para experiencia, operación y hardware.
8. Una prueba manual deberá producir evidencia estructurada.
9. E1 identifica requisitos.
10. E2, E3 y E4 los especifican.
11. E5 los asigna a paquetes.
12. T y R0 crean infraestructura de ejecución.
13. Cada paquete implementa sus pruebas junto con el código.
14. Piloto e hypercare convierten defectos en regresiones.
15. U ejecuta certificación integral, no la primera implementación de todas las pruebas.
16. No se crea un seed global.
17. Los datos de prueba deberán ser mínimos, aislados y limpiables.
18. Producción no se utilizará para pruebas destructivas.
19. Los requisitos críticos bloquearán las puertas correspondientes.
20. `VERIFICADO` podrá reabrirse si una ejecución posterior falla.
21. Los requisitos descartados u obsoletos permanecerán como historial.
22. `AUTH-QA-*` y `UX-QA-*` se conservarán como tareas de certificación.
23. Un requisito podrá vincularse con una brecha, pero no será automáticamente una brecha.
24. `SHELL-CI-017` automatizará posteriormente la validación del registro.
25. Desde `CODE-AUD-008`, todas las tareas deberán registrar o descartar expresamente requisitos.
26. `QA-REG-001` consolidará retrospectivamente lo aprobado antes de este gobierno.
27. `QA-REG-001` se ejecutará después de `CODE-AUD-020`.
28. `CODE-AUD-008` permanecerá como única continuidad inmediata después de aprobar esta tarea.

---

#### 34. Límites de esta tarea

`QA-GOV-001` no:

- selecciona todavía Jest, Vitest, Playwright u otra herramienta;
- crea suites;
- crea fixtures;
- crea seeds;
- modifica GitHub Actions;
- crea un ambiente staging;
- ejecuta pruebas;
- modifica Supabase;
- corrige defectos;
- asigna requisitos retrospectivos concretos;
- declara cubierta una regla solo porque exista una tarea `QA`;
- convierte VITAL en parte de Vento OS.

Las herramientas y arquitectura física se definirán en T, R0 y los paquetes de implementación.

---

#### 35. Criterios de aceptación

`QA-GOV-001` podrá aprobarse cuando:

- requisito, tarea, prueba, ejecución y evidencia estén diferenciados;
- la fuente de verdad del ciclo de vida esté definida;
- la convención `TREQ-*` esté definida;
- los dominios iniciales estén definidos;
- los disparadores de creación estén definidos;
- los casos de no creación estén definidos;
- la deduplicación esté definida;
- el formato obligatorio por tarea esté definido;
- los campos del registro estén definidos;
- los estados y transiciones estén definidos;
- las prioridades y bloqueos estén definidos;
- los tipos y modalidades estén definidos;
- el momento de implementación por etapa esté definido;
- el tratamiento de defectos y regresiones esté definido;
- la estrategia de datos no contradiga `CODE-AUD-007`;
- los ambientes estén definidos;
- la relación con E5, T, R0 y U esté definida;
- la relación con `AUTH-QA-*`, `UX-QA-*` y brechas esté definida;
- las responsabilidades estén definidas;
- la evidencia mínima esté definida;
- el control manual previo a `SHELL-CI-017` esté definido;
- `QA-REG-001` tenga identificador, propósito, dependencia, archivo propietario y momento;
- `QA-REG-001` quede obligado a materializarse antes de avanzar;
- `CODE-AUD-008` permanezca como continuidad inmediata;
- no se haya implementado código, CI ni Supabase.

---

#### 36. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
necesidad verificable
        ↓
TREQ identificado y registrado
        ↓
especificación progresiva
        ↓
paquete y repositorio
        ↓
prueba implementada con el cambio
        ↓
ejecución y evidencia
        ↓
regresión y certificación integral
```

La continuidad inmediata será:

```text
CODE-AUD-008
— Detectar TODO, FIXME, stubs y funciones no terminadas
```


### ✅ CODE-AUD-008 — Detectar `TODO`, `FIXME`, stubs y funciones no terminadas

**Estado:** APROBADA 
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Tipo:** auditoría estática transversal de marcadores de deuda, implementaciones provisionales y funciones sin efecto completo  
**Dependencia anterior:** `QA-GOV-001`  
**Continuidad reservada:** `CODE-AUD-009`  
**Fecha de corte:** 2026-07-24  
**Cambios en código, CI o Supabase:** no autorizados ni realizados durante esta tarea  

---

#### 1. Resultado de esta tarea

Esta tarea inspecciona señales explícitas y semánticas de implementación incompleta en los repositorios inventariados para Vento OS.

La revisión diferencia:

1. comentarios `TODO`;
2. comentarios `FIXME`;
3. marcadores `HACK`, `WIP`, `Not implemented` o equivalentes;
4. funciones que solo muestran un mensaje de “Próximamente”;
5. handlers vacíos;
6. funciones que retornan un valor neutro sin ejecutar la capacidad prometida;
7. lógica declarada temporalmente;
8. scripts o workflows creados para aplicar un parche provisional;
9. artefactos de error dejados por una implementación incompleta;
10. textos de interfaz, placeholders y estados vacíos que no constituyen deuda técnica.

Resultado general:

- no se localizaron marcadores `FIXME`, `Not implemented` o `stub` confirmados dentro del código de ejecución de Vento OS;
- las búsquedas genéricas de `TODO` producen numerosos falsos positivos porque coinciden con las palabras españolas `todo` y `todos`;
- se localizaron dos funciones de navegación de PASS que son stubs reales;
- se localizó una regla temporal en el historial de Saudo que puede ocultar transacciones legítimas;
- se localizaron en NEXO un script, un workflow temporal con permisos de escritura y un artefacto de error que demuestran una automatización de parche incompleta;
- se localizó una coincidencia `TODO:` dentro de la migración baseline histórica de `vento-shell`, pero el contexto exacto no quedó establecido mediante la búsqueda indexada y no se clasifica como defecto activo;
- no se eliminará ni modificará nada durante descubrimiento.

---

#### 2. Definiciones utilizadas

| Categoría             | Definición                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `TODO`                | nota explícita de trabajo pendiente dentro del código                                                 |
| `FIXME`               | nota explícita de comportamiento defectuoso que requiere corrección                                   |
| stub                  | función, componente o endpoint que conserva la firma esperada, pero no ejecuta la capacidad prometida |
| handler vacío         | evento registrado que no produce efecto intencional                                                   |
| placeholder funcional | superficie visible que simula una capacidad aún inexistente                                           |
| fallback válido       | respuesta defensiva utilizada cuando una dependencia o dato no está disponible                        |
| estado vacío          | interfaz que comunica correctamente que no existen registros                                          |
| lógica temporal       | comportamiento explícitamente provisional que afecta resultados                                       |
| parche temporal       | script o workflow creado para modificar código mediante sustituciones transitorias                    |
| artefacto de error    | log o archivo persistido para registrar el fallo de una automatización                                |
| función parcial       | ejecuta una parte del proceso, pero omite casos que el propio código reconoce                         |

Una coincidencia textual no basta para clasificar un archivo como incompleto.

---

#### 3. Alcance revisado

La auditoría mantiene la clasificación de doce repositorios:

| Repositorio     | Tratamiento                                   |
| --------------- | --------------------------------------------- |
| `vento-shell`   | infraestructura y fuente canónica de Supabase |
| `vento-viso`    | VISO                                          |
| `vento-nexo`    | NEXO                                          |
| `vento-fogo`    | FOGO                                          |
| `vento-origo`   | ORIGO                                         |
| `vento-pulso`   | PULSO                                         |
| `vento-numera`  | NUMERA                                        |
| `Vento-Group`   | web pública                                   |
| `vento-anima`   | ANIMA                                         |
| `vento-pass`    | PASS                                          |
| `vento-talento` | base técnica futura                           |
| `vento-vital`   | proyecto separado, no computado como Vento OS |

Se excluyeron como evidencia concluyente:

- `node_modules`;
- archivos generados por dependencias;
- `package-lock.json`;
- documentación que solamente describe tareas futuras;
- el documento canónico que contiene los nombres `TODO` y `FIXME`;
- coincidencias dentro de palabras españolas;
- placeholders de formularios;
- estados vacíos de interfaz;
- retornos `null` o `[]` que representan resultados válidos;
- excepciones usadas como guardas de configuración o validación.

---

#### 4. Método de detección

Se buscaron señales como:

```text
TODO
TODO:
FIXME
HACK
WIP
stub
Not implemented
no implementado
en desarrollo
Próximamente
temporary
placeholder
return null
return []
handlers vacíos
```

Después de la búsqueda textual se realizó clasificación manual de los resultados relevantes.

La revisión no considera automáticamente incompleto un archivo por contener:

```text
placeholder="Nombre"
return null
return []
throw new Error(...)
```

Esas construcciones pueden ser correctas según su contrato.

---

#### 5. Resultado de marcadores explícitos

##### 5.1. `FIXME`

No se localizaron usos confirmados de `FIXME` dentro del código de ejecución de las aplicaciones Vento OS.

Las coincidencias encontradas pertenecen principalmente al documento canónico y al nombre de esta tarea.

##### 5.2. `Not implemented` y `stub`

No se localizaron marcadores confirmados `Not implemented`, `not implemented` o `stub` dentro del código de ejecución de Vento OS.

La ausencia de la palabra no demuestra que todas las funciones estén completas. Por eso esta tarea también inspecciona comportamiento semántico.

##### 5.3. `TODO`

La búsqueda genérica de `TODO` no puede utilizarse directamente en repositorios escritos en español porque produce coincidencias como:

```text
todo
todos
obtener todo el stock
todos los trabajadores
```

Esas coincidencias no representan marcadores técnicos.

La búsqueda más estricta `TODO:` localizó una coincidencia en:

```text
vento-shell/supabase/migrations/00000000000000_baseline.sql
```

La migración es una baseline histórica extensa. La búsqueda indexada no permitió establecer de forma confiable:

- la línea exacta;
- el objeto SQL afectado;
- si el comentario sigue vigente;
- si una migración posterior ya resolvió el asunto.

Por tanto:

- no se declara una función SQL incompleta;
- no se modifica la baseline;
- el marcador deberá localizarse y clasificarse durante la consolidación técnica de `CODE-AUD-020` y la auditoría de E3;
- no genera todavía un requisito `TREQ-*` porque no existe una regla protegida concreta identificada.

---

#### 6. PASS — funciones de navegación que son stubs reales

Archivo:

```text
vento-pass/src/utils/navigation.ts
```

El propio archivo se presenta como:

```text
Funciones de navegación (placeholders y enlaces externos)
```

##### 6.1. `goToMovements`

La función actual solo ejecuta:

```text
Alert.alert("Próximamente", "Pantalla de historial en desarrollo.")
```

No:

- navega;
- consulta movimientos;
- abre una pantalla;
- informa que la capacidad está deshabilitada por configuración;
- recibe un error técnico que justifique el fallback.

**Clasificación:** stub funcional confirmado.

La existencia de otras pantallas de historial en PASS no permite concluir automáticamente cuál debería consumir esta función. Primero deberá identificarse:

- dónde se importa;
- qué botón la invoca;
- qué historial promete;
- si debe conectarse a una ruta existente;
- si debe retirarse por duplicación.

##### 6.2. `onScanTable`

La función actual solo ejecuta:

```text
Alert.alert("Próximamente", "Escaneo de mesa en desarrollo.")
```

No:

- solicita permiso de cámara;
- abre un escáner;
- valida un QR;
- identifica mesa o sede;
- inicia un proceso;
- declara una feature flag.

**Clasificación:** stub funcional confirmado.

No se asume que el escaneo de mesa deba implementarse necesariamente. La decisión podrá ser:

1. implementar la capacidad;
2. reemplazarla por otro flujo;
3. retirarla;
4. ocultarla hasta que exista contrato funcional.

##### 6.3. Fallbacks de menú

`goToMenuVento` y `goToMenuSaudo` sí navegan cuando reciben un objeto de navegación válido o cuando existe `navigationRef`.

Solo muestran “Próximamente” si no existe mecanismo de navegación.

**Clasificación:** fallback defensivo, no stub confirmado.

---

#### 7. PASS — historial de Saudo con lógica explícitamente parcial

Archivo:

```text
vento-pass/src/components/Saudo.tsx
```

El historial filtra transacciones mediante:

```text
metadata.site_id
```

El propio código declara:

```text
Por ahora, filtramos solo las que tienen metadata con site_id
```

y excluye toda transacción que no tenga ese campo.

Consecuencia estática:

- una transacción legítima sin `metadata.site_id` no aparece en el historial de Saudo;
- el usuario no recibe indicación de que existen registros sin atribución;
- la ausencia en pantalla puede confundirse con inexistencia;
- no se verificó si todos los productores actuales escriben `site_id`.

**Clasificación:** función parcial y decisión temporal explícita.

Esta tarea no declara que actualmente existan transacciones omitidas. Declara que el código admite silenciosamente esa posibilidad.

Destinos:

- `CODE-AUD-009`: registrar la decisión temporal;
- `CODE-AUD-012`: revisar el proceso de historial parcialmente implementado;
- `CODE-AUD-019`: vincular la capacidad con productores y contratos;
- `CODE-AUD-020`: definir corrección o migración.

El texto:

```text
Próximamente habrá productos para canjear
```

usado cuando no existen recompensas es un estado vacío de interfaz y no se clasifica como stub.

---

#### 8. NEXO — automatización temporal de parche no finalizada

Se localizaron estos artefactos:

```text
vento-nexo/scripts/tmp-apply-privileged-request-area.mjs
vento-nexo/.github/workflows/tmp-apply-privileged-request-area.yml
vento-nexo/scripts/tmp-privileged-area-patch-error.txt
```

##### 8.1. Script temporal

El script declara que fue activado después de que un workflow temporal estuviera disponible en `preview`.

Su mecanismo consiste en:

- abrir archivos de remisiones;
- buscar fragmentos literales;
- reemplazar cadenas de código;
- fallar si no encuentra el texto esperado;
- escribir directamente los archivos modificados.

No constituye una migración estructurada ni una implementación estable.

##### 8.2. Workflow temporal

El workflow:

- se ejecuta manualmente y al abrir o actualizar PR hacia `preview`;
- solicita permiso `contents: write`;
- hace checkout directo de `preview`;
- modifica dinámicamente el propio script antes de ejecutarlo;
- aplica el parche;
- escribe un archivo de error y lo hace commit en `preview` si falla;
- intenta compilar;
- en caso de éxito elimina el script, el workflow y los logs temporales;
- hace commit y push automático a `preview`.

La lógica de autolimpieza solo ocurre si toda la secuencia termina correctamente.

##### 8.3. Error persistente

El archivo:

```text
scripts/tmp-privileged-area-patch-error.txt
```

registra:

```text
Error: createRemission inventory block missing
```

Esto demuestra que:

- el workflow sí intentó ejecutar el parche;
- una sustitución esperada no encontró el bloque;
- la fase de limpieza no se completó;
- el script, workflow y log permanecieron versionados.

**Clasificación:** implementación temporal fallida y artefactos de transición todavía presentes.

No se concluye automáticamente que la selección privilegiada de área esté ausente del código actual. Puede haber sido implementada de otra forma. Debe comprobarse:

- si el comportamiento objetivo ya existe;
- si el workflow sigue activable;
- si puede volver a modificar `preview`;
- si los permisos de escritura siguen siendo necesarios;
- si los tres artefactos pueden retirarse;
- si el error dejó una implementación parcial.

Destinos:

- `CODE-AUD-013`: clasificar como mecanismo legacy todavía activo o activable;
- `CODE-AUD-015`: confirmar consumidores y necesidad;
- `CODE-AUD-016`: revisar su relación con build y CI;
- `CODE-AUD-017`: revisar permisos y mutación automática de ramas;
- `CODE-AUD-020`: decidir retiro y registrar el backlog.

---

#### 9. Matriz por repositorio

| Repositorio     | Marcador o función incompleta confirmada                               | Estado                                         |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------------------- |
| `vento-shell`   | una coincidencia `TODO:` en baseline histórica sin contexto suficiente | por clasificar en `CODE-AUD-020` / E3          |
| `vento-viso`    | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-nexo`    | workflow, script y log de parche temporal fallido                      | confirmado                                     |
| `vento-fogo`    | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-origo`   | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-pulso`   | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-numera`  | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `Vento-Group`   | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-anima`   | no se localizó marcador o stub confirmado                              | sin hallazgo explícito al corte                |
| `vento-pass`    | dos funciones de navegación stub y un filtro temporal parcial          | confirmado                                     |
| `vento-talento` | no se localizó marcador o stub confirmado                              | producto futuro; no equivale a código completo |
| `vento-vital`   | fuera de Vento OS                                                      | no incorporado al backlog Vento OS             |

“Sin hallazgo explícito” no significa que todo el repositorio esté completo. Las tareas `CODE-AUD-009` a `CODE-AUD-012` continuarán la detección semántica.

---

#### 10. Falsos positivos excluidos

##### 10.1. Palabra española `todo`

Expresiones como:

```text
obtener todo el stock
todos los registros
todos los trabajadores
```

no son comentarios `TODO`.

##### 10.2. Placeholders de formularios

Ejemplos:

```text
placeholder="Nombre"
placeholder="Buscar"
```

son ayudas de interfaz, no funciones incompletas.

##### 10.3. Estados vacíos

Mensajes como:

```text
Sin novedades por ahora
No hay productos disponibles
Tus transacciones aparecerán aquí
```

pueden ser estados correctos cuando no existen datos.

##### 10.4. Retornos neutros

`return null` y `return []` pueden representar:

- registro inexistente;
- configuración ausente;
- lista vacía;
- fallo controlado;
- componente que no debe renderizar.

Solo serán stubs cuando el contrato prometa una acción y el retorno la suprima sin justificación.

##### 10.5. Excepciones

`throw new Error(...)` no implica función sin terminar. Muchas ocurrencias son guardas válidas de:

- configuración;
- autenticación;
- parámetros;
- dependencias;
- integridad.

##### 10.6. Fallbacks defensivos

Mostrar un mensaje de indisponibilidad cuando falta una dependencia no es igual a exponer una capacidad que nunca fue implementada.

---

#### 11. Hallazgos y destino obligatorio

| ID               | Hallazgo                                                                                   | Clasificación                                 | Destino                                    |
| ---------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------ |
| `H-CODE-008-001` | no se localizaron `FIXME`, `Not implemented` o `stub` explícitos en runtime Vento OS       | resultado de inventario                       | cerrado; continuar auditoría semántica     |
| `H-CODE-008-002` | la búsqueda genérica de `TODO` se contamina con `todo` y `todos`                           | limitación metodológica                       | cerrado                                    |
| `H-CODE-008-003` | existe una coincidencia `TODO:` en la baseline SQL sin contexto confirmado                 | marcador histórico por clasificar             | `CODE-AUD-020`, E3                         |
| `H-CODE-008-004` | `goToMovements` de PASS solo muestra “Próximamente”                                        | stub funcional                                | `CODE-AUD-010`, `012`, `015`, `019`, `020` |
| `H-CODE-008-005` | `onScanTable` de PASS solo muestra “Próximamente”                                          | stub funcional                                | `CODE-AUD-010`, `012`, `015`, `019`, `020` |
| `H-CODE-008-006` | los fallbacks de menú PASS sí intentan navegar                                             | fallback válido                               | cerrado                                    |
| `H-CODE-008-007` | historial Saudo excluye transacciones sin `metadata.site_id`                               | función parcial temporal                      | `CODE-AUD-009`, `012`, `019`, `020`        |
| `H-CODE-008-008` | NEXO conserva workflow temporal con `contents: write` y mutación automática de `preview`   | automatización provisional activa o activable | `CODE-AUD-013`, `015`, `016`, `017`, `020` |
| `H-CODE-008-009` | el parche NEXO falló y dejó script, workflow y log versionados                             | transición incompleta                         | `CODE-AUD-013`, `015`, `020`               |
| `H-CODE-008-010` | no se localizaron handlers literalmente vacíos mediante las búsquedas realizadas           | resultado de inventario                       | cerrado                                    |
| `H-CODE-008-011` | placeholders, estados vacíos y retornos neutros no pueden tratarse como deuda sin contexto | regla de clasificación                        | cerrado                                    |
| `H-CODE-008-012` | VITAL permanece separado del backlog Vento OS                                              | límite de alcance                             | cerrado                                    |

Todos los hallazgos quedan cerrados o vinculados con tareas existentes.

---

#### 12. Requisitos de prueba derivados

**Resultado:** GENERA REQUISITOS DE PRUEBA

##### 12.1. Requisitos nuevos

| ID              | Regla protegida                                                                                                                                                                            | Origen                             | Riesgo                                                               | Tipo / modalidad                                   | Prioridad | Tarea responsable inmediata | Estado         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------- | --------- | --------------------------- | -------------- |
| `TREQ-PASS-001` | Toda acción visible de “movimientos” deberá abrir una capacidad real y autorizada, o no deberá exponerse como acción disponible                                                            | `H-CODE-008-004`                   | acción engañosa y navegación muerta                                  | interfaz + E2E / automatizada                      | alta      | `CODE-AUD-010`              | `IDENTIFICADO` |
| `TREQ-PASS-002` | Toda acción visible de escaneo de mesa deberá ejecutar el flujo aprobado con validación de dispositivo y servidor, o permanecer retirada de la navegación                                  | `H-CODE-008-005`                   | capacidad operativa ficticia o uso incorrecto de QR                  | interfaz + hardware + E2E / híbrida                | alta      | `CODE-AUD-010`              | `IDENTIFICADO` |
| `TREQ-PASS-003` | El historial de Saudo deberá atribuir cada transacción a una sede de forma determinista o mostrar explícitamente su estado sin atribución, sin omitir silenciosamente registros legítimos  | `H-CODE-008-007`                   | historial incompleto y pérdida de trazabilidad visible               | integración + regresión / automatizada             | alta      | `CODE-AUD-012`              | `IDENTIFICADO` |
| `TREQ-NEXO-001` | La selección privilegiada de área solicitante deberá funcionar desde el código canónico y superar build y validación sin depender de workflows o scripts temporales que reescriban la rama | `H-CODE-008-008`, `H-CODE-008-009` | deriva de código, mutación insegura de rama e implementación parcial | integración + seguridad + regresión / automatizada | alta      | `CODE-AUD-016`              | `IDENTIFICADO` |

##### 12.2. Materialización obligatoria

Al aprobar `CODE-AUD-008`, estas cuatro filas deberán agregarse al:

```text
docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md
```

No deberán marcarse como `IMPLEMENTADO` ni `VERIFICADO`.

##### 12.3. Maduración posterior

- `TREQ-PASS-001` y `TREQ-PASS-002` deberán precisar consumidores y alcance en `CODE-AUD-010`, `012`, `015` y `019`.
- `TREQ-PASS-003` deberá identificar productores de transacciones, contrato de `site_id`, datos existentes y migración necesaria.
- `TREQ-NEXO-001` deberá determinar si el comportamiento ya está integrado y si los artefactos temporales pueden retirarse.
- La asignación a paquetes E5 ocurrirá después de `CODE-AUD-020`, la matriz de cobertura y el diseño funcional correspondiente.

---

#### 13. Decisiones propuestas

1. No se tratarán coincidencias textuales como defectos sin inspección semántica.
2. `FIXME`, `Not implemented` y `stub` no tienen ocurrencias confirmadas en runtime Vento OS al corte.
3. Una búsqueda de `TODO` deberá distinguir mayúsculas, delimitadores y comentarios para evitar falsos positivos en español.
4. La coincidencia de baseline se conserva como marcador histórico pendiente de clasificación.
5. No se editará una migración baseline aplicada para eliminar un comentario.
6. `goToMovements` se clasifica como stub.
7. `onScanTable` se clasifica como stub.
8. Los fallbacks de menú PASS no se clasifican como stubs.
9. El filtro temporal del historial Saudo se clasifica como implementación parcial.
10. No se presume que ya existan datos históricos omitidos.
11. El script de parche NEXO se clasifica como temporal.
12. El workflow NEXO se clasifica como automatización provisional con capacidad de escritura.
13. El log persistente confirma que la automatización falló.
14. No se eliminarán los artefactos hasta confirmar el estado real del comportamiento y sus consumidores.
15. Los textos de estados vacíos no se clasificarán como funciones incompletas.
16. Los placeholders de campos no se clasificarán como deuda.
17. `return null` y `return []` requerirán análisis contractual antes de clasificarse.
18. TALENTO no se considera completo solo porque no tenga marcadores explícitos.
19. VITAL permanece fuera de Vento OS.
20. Se crean cuatro requisitos `TREQ-*`.
21. Los cuatro requisitos quedan inicialmente `IDENTIFICADO`.
22. `CODE-AUD-009` será la única continuidad inmediata.

---

#### 14. Límites de certeza

Esta tarea no confirma:

- que todos los comentarios pendientes estén indexados por GitHub;
- que nunca existan marcadores en ramas diferentes a las inspeccionadas;
- que una función sin comentario esté completa;
- que una alerta “Próximamente” sea alcanzable actualmente;
- que los stubs de PASS tengan consumidores activos;
- que existan transacciones Saudo omitidas en producción;
- que la selección privilegiada de área NEXO esté ausente;
- que el workflow temporal continúe ejecutándose;
- que el `TODO:` de baseline represente una brecha vigente;
- que todos los retornos neutros sean correctos;
- que ausencia de marcador implique calidad funcional.

Las tareas siguientes inspeccionarán decisiones temporales, interfaces sin lógica y procesos parciales.

---

#### 15. Criterios de aceptación

`CODE-AUD-008` podrá aprobarse cuando:

- `TODO`, `FIXME`, stub, fallback y estado vacío estén diferenciados;
- se documente la contaminación de búsqueda por palabras españolas;
- la coincidencia de baseline tenga destino sin editar la migración;
- los dos stubs de PASS estén identificados;
- los fallbacks de menú no se clasifiquen erróneamente;
- el filtro parcial de Saudo tenga destino;
- el script temporal de NEXO esté inventariado;
- el workflow temporal y sus permisos estén inventariados;
- el error persistente del parche esté registrado;
- cada repositorio tenga clasificación;
- los falsos positivos estén excluidos;
- cada hallazgo tenga destino exacto;
- se creen `TREQ-PASS-001` a `TREQ-PASS-003`;
- se cree `TREQ-NEXO-001`;
- los requisitos permanezcan en estado `IDENTIFICADO`;
- no se elimine ni modifique código;
- no se modifique Supabase;
- `CODE-AUD-009` permanezca como única continuidad.

---

#### 16. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
marcador o comportamiento sospechoso
        ↓
clasificación semántica
        ↓
stub, parcial, temporal, fallback o falso positivo
        ↓
hallazgo con tarea responsable
        ↓
TREQ cuando existe comportamiento que proteger
        ↓
decisiones técnicas temporales por auditar
```

La continuidad será:

```text
CODE-AUD-009
— Detectar valores hardcodeados y decisiones técnicas temporales
```


### ✅ CODE-AUD-009 — Detectar valores hardcodeados y decisiones técnicas temporales

**Estado:** APROBADA 
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Tipo:** auditoría estática transversal de configuración incrustada, reglas duplicadas y decisiones provisionales  
**Dependencia anterior:** `CODE-AUD-008`  
**Continuidad reservada:** `CODE-AUD-010`  
**Fecha de corte:** 2026-07-24  
**Cambios en código, CI o Supabase:** no autorizados ni realizados durante esta tarea  

---

#### 1. Resultado de esta tarea

Esta tarea identifica valores escritos directamente dentro del código y determina cuáles son:

1. identificadores canónicos válidos;
2. constantes técnicas legítimas;
3. valores de presentación;
4. fallbacks controlados;
5. reglas empresariales duplicadas;
6. decisiones temporales;
7. configuraciones que deberían provenir de catálogo, base de datos o ambiente;
8. límites técnicos que pueden truncar información;
9. mecanismos provisionales todavía activos o activables;
10. riesgos que requieren requisitos de prueba.

Resultado general:

- se confirma una dispersión importante de listas de roles privilegiados dentro de páginas, acciones y rutas;
- se confirma el uso repetido de identificadores de permisos escritos manualmente en archivos consumidores;
- se confirma que PASS mezcla datos dinámicos de sedes con identidad, ubicación y enlaces de marca todavía incrustados en código;
- se confirman políticas de reintento, espera y refresco escritas como números locales sin gobierno transversal;
- se confirma al menos un límite fijo de 500 productos en un proceso operativo de NEXO;
- se mantienen como decisiones temporales ya detectadas el filtro parcial del historial de Saudo y la automatización provisional de parche de NEXO;
- no todo valor literal constituye una brecha;
- no se ordena reemplazar masivamente constantes por variables de ambiente;
- no se modifica código durante esta tarea.

---

#### 2. Definiciones utilizadas

##### 2.1. Hardcode crítico

Valor escrito directamente en el código que controla:

- autorización;
- alcance territorial;
- empresa, sede o área;
- dinero;
- inventario;
- identidad;
- seguridad;
- estado empresarial;
- integración externa;
- retención;
- límite funcional;
- comportamiento de producción.

##### 2.2. Hardcode de configuración

Valor que puede ser correcto hoy, pero debería administrarse desde:

- catálogo canónico;
- configuración de aplicación;
- registro de sede;
- variable de ambiente;
- tabla de configuración;
- servicio transversal;
- paquete compartido.

##### 2.3. Constante legítima

Valor deliberadamente estable y versionado junto con el código.

Ejemplos:

- identificador canónico de aplicación;
- nombre de estado de una máquina de estados;
- código de permiso importado desde catálogo generado;
- tamaño de un protocolo físico;
- nombre de una ruta interna;
- clave de caché;
- sentinel estrictamente interno no persistido.

##### 2.4. Número mágico

Número cuyo efecto no es evidente y no tiene:

- nombre;
- unidad;
- justificación;
- documentación;
- configuración;
- prueba asociada.

##### 2.5. Decisión técnica temporal

Solución reconocida como provisional mediante expresiones como:

- por ahora;
- temporal;
- fallback;
- compatibilidad legacy;
- parche;
- preview;
- mientras;
- hasta que;
- hardcoded;
- mock;
- workaround.

---

#### 3. Criterio canónico de clasificación

Un literal no será problemático solo por estar escrito en el código.

Se evalúan estas preguntas:

1. ¿Representa una regla empresarial?
2. ¿Puede cambiar sin desplegar código?
3. ¿Existe ya una fuente canónica?
4. ¿Está duplicado en varios repositorios?
5. ¿Afecta autorización o seguridad?
6. ¿Puede producir divergencia entre aplicaciones?
7. ¿Puede truncar u ocultar datos?
8. ¿Depende del ambiente?
9. ¿El propio código lo declara provisional?
10. ¿Existe prueba que detecte su desactualización?

Clasificación:

| Resultado                          | Tratamiento                            |
| ---------------------------------- | -------------------------------------- |
| constante legítima                 | conservar                              |
| constante legítima, pero duplicada | centralizar cuando corresponda         |
| configuración operativa            | mover a fuente administrable           |
| regla empresarial                  | modelar canónicamente                  |
| decisión temporal                  | registrar destino y retiro             |
| límite riesgoso                    | definir paginación, cobertura y prueba |
| valor de ambiente                  | separar por ambiente                   |
| dato visual                        | conservar salvo divergencia real       |

---

#### 4. Autorización basada en listas locales de roles

Se localizaron comprobaciones directas como:

```ts
["propietario", "gerente_general"].includes(role)
```

y:

```ts
["propietario", "gerente_general", "contador"].includes(role)
```

en superficies de:

- NEXO;
- VISO;
- FOGO;
- ORIGO;
- scripts temporales asociados a NEXO.

Ejemplos revisados:

```text
vento-nexo/src/app/inventory/adjust/page.tsx
vento-nexo/src/app/inventory/catalog/actions.ts
vento-nexo/src/app/inventory/catalog/new/actions.ts
vento-nexo/src/app/inventory/settings/request-policies/actions.ts
vento-viso/src/app/api/viso/upload-logo/route.ts
vento-viso/src/app/api/viso/upload-website-media/route.ts
vento-fogo/src/app/recipe-book/page.tsx
vento-origo/src/app/purchase-orders/[id]/page.tsx
```

Caso confirmado en NEXO:

```ts
const canUseAllSites =
  ["propietario", "gerente_general", "contador"].includes(role);
```

Problemas:

- la capacidad queda asociada al nombre del rol en lugar del permiso canónico;
- una modificación del catálogo puede no propagarse;
- cada repositorio puede mantener una lista diferente;
- un rol puede conservar acceso después de perder la capacidad;
- un rol nuevo puede quedar bloqueado aunque reciba el permiso;
- se mezclan autorización, alcance y conveniencia de interfaz;
- la interfaz y el servidor pueden aplicar criterios distintos.

No toda comprobación de rol debe eliminarse. Puede ser válida para:

- presentación de una etiqueta;
- simulación controlada;
- compatibilidad temporal;
- selección de experiencia;
- transición documentada.

No será válida como fuente final de autorización cuando ya exista un permiso canónico y un contexto resoluble.

**Clasificación:** hardcode crítico transversal.

Destinos:

- `CODE-AUD-017` — revisar autorización, permisos, RLS y seguridad;
- `CODE-AUD-019` — mapear consumidores y contratos;
- `CODE-AUD-020` — materializar correcciones y paquetes;
- implementación posterior del catálogo y resolutor canónico de autorización.

---

#### 5. Códigos de permisos escritos manualmente

Se localizaron patrones como:

```ts
const APP_ID = "nexo";
const PERMISSION = "inventory.adjustments";
```

y otras variantes en NEXO, FOGO, ORIGO y PULSO.

Un literal de permiso no es incorrecto si:

- coincide con el catálogo aprobado;
- tiene propietario;
- es validado durante build;
- no está duplicado con nombres diferentes;
- el consumidor utiliza el resolutor canónico;
- existe trazabilidad de versión.

El riesgo aparece cuando el string:

- se escribe manualmente en cada archivo;
- no se deriva del catálogo;
- puede contener errores tipográficos;
- puede quedar obsoleto;
- no se verifica contra una versión;
- se combina con una lista local de roles;
- se utiliza con convenciones distintas entre aplicaciones.

Esta brecha ya está conceptualmente relacionada con la decisión aprobada de evitar cadenas de permisos escritas manualmente.

**Clasificación:** hardcode contractual de autorización.

Destinos:

- `CODE-AUD-017`;
- `CODE-AUD-019`;
- `CODE-AUD-020`;
- paquete posterior de tipos y constantes derivados del catálogo.

---

#### 6. PASS — identidad operativa y datos de sede mezclados con código de marca

PASS ya contiene capacidades para resolver sedes y experiencias desde datos dinámicos. Sin embargo, permanecen valores específicos de Vento Café y Saudo dentro de componentes y constantes.

Superficies revisadas:

```text
vento-pass/src/utils/site.ts
vento-pass/src/hooks/useVentoSite.ts
vento-pass/src/components/VentoCafe.tsx
vento-pass/src/components/Saudo.tsx
vento-pass/src/constants/business.ts
vento-pass/src/constants/google.ts
vento-pass/src/components/vento/LocationMap.tsx
```

Ejemplos:

```ts
getSiteIdByBusinessType("saudo")
```

y equivalentes para Vento Café.

También permanecen:

- coordenadas de Vento Café y Saudo;
- enlaces de Google Maps;
- enlaces de reseña;
- nombres de marca;
- dirección física escrita dentro del componente;
- nombre de sede dentro de notificaciones;
- selección de `BrandProvider` por literal;
- lógica diferenciada por componentes específicos.

Ejemplo confirmado dentro de Saudo:

```text
Av. 7 Este #2 - 48 Local 4, Cúcuta, Norte de Santander
```

Estos valores pueden ser correctos. El problema es su convivencia con un modelo dinámico de satélites y sedes.

Riesgos:

- cambiar la dirección en Supabase no cambia la mostrada por el componente;
- una coordenada puede divergir de la sede canónica;
- el enlace de reseña puede quedar obsoleto;
- una nueva sede obliga a modificar código;
- el mismo dato puede aparecer distinto en PASS, VISO y la web;
- una marca dinámica puede seguir dependiendo de un componente especial.

La identidad visual puede permanecer versionada en código cuando sea un activo de producto. La identidad operativa deberá provenir de una fuente canónica.

Separación propuesta:

| Dato                     | Fuente recomendada                       |
| ------------------------ | ---------------------------------------- |
| `site_id`, código y tipo | registro canónico de sede                |
| nombre comercial vigente | registro de sede o experiencia           |
| dirección                | registro canónico de sede                |
| coordenadas              | registro canónico de sede                |
| horarios                 | configuración operativa                  |
| enlace Maps              | derivado o configurado                   |
| enlace de reseña         | configuración comercial                  |
| logo y paleta base       | configuración de marca versionada        |
| componente excepcional   | solo cuando exista necesidad UX aprobada |

**Clasificación:** hardcode operativo y comercial con riesgo de deriva.

Destinos:

- `CODE-AUD-015` — confirmar consumidores reales;
- `CODE-AUD-019` — mapear contrato entre PASS, sedes y experiencias;
- `CODE-AUD-020` — definir migración y paquete;
- E2/E3/E4 para contrato definitivo.

---

#### 7. PASS — URLs, esquemas y destinos externos

Se localizaron destinos escritos directamente en código:

```text
vento-pass://
vento-pass-dev://
https://pass.ventogroup.co
https://vailavainilla.com
```

Superficies:

```text
vento-pass/App.js
vento-pass/src/utils/navigation.ts
vento-pass/src/constants/google.ts
```

Clasificación individual:

##### 7.1. Esquemas móviles

Los esquemas:

```text
vento-pass://
vento-pass-dev://
```

pueden ser constantes legítimas de protocolo.

Deben permanecer coordinados con:

- configuración Expo;
- enlaces universales;
- intent filters;
- dominios verificados;
- retorno de pagos;
- notificaciones.

##### 7.2. Dominio de PASS

```text
https://pass.ventogroup.co
```

es un contrato de integración y no un simple texto visual.

Debe:

- estar centralizado;
- diferenciar ambientes cuando aplique;
- validarse contra configuración móvil y web;
- evitar rutas distintas entre builds.

##### 7.3. Vaila

```ts
const url = "https://vailavainilla.com";
```

es un destino externo comercial. No constituye un defecto inmediato, pero está incrustado en una función de navegación.

Debe definirse si:

- es un destino fijo de producto;
- depende del país o ambiente;
- puede cambiar desde configuración;
- debe abrir una experiencia interna;
- requiere analítica o allowlist.

**Clasificación:** contrato externo centralizable, no secreto.

Destinos:

- `CODE-AUD-019`;
- `CODE-AUD-020`;
- BLOQUE X de integraciones.

---

#### 8. PASS y ANIMA — tiempos, reintentos y refresco

Se localizaron valores técnicos como:

```text
10 000 ms de timeout
2 reintentos
1 000 ms de espera base
15 000 ms de refresco
24 horas para considerar una validación reciente
500 ms y 1 500 ms de espera visual
```

Ejemplos en PASS:

```text
vento-pass/App.js
vento-pass/src/components/Saudo.tsx
vento-pass/src/components/VentoCafe.tsx
vento-pass/src/components/OrderPlacedScreenLive.tsx
```

Ejemplos con intervalos similares en ANIMA:

```text
vento-anima/src/components/home/use-home-today-team.ts
vento-anima/src/components/home/use-home-screen-lifecycle.ts
vento-anima/src/hooks/attendance/shared.ts
```

No se concluye que esos valores sean incorrectos.

El hallazgo es que representan políticas técnicas y de experiencia que actualmente pueden estar:

- duplicadas;
- sin nombre;
- sin unidad visible;
- sin justificación;
- sin control por ambiente;
- sin coordinación con modo en segundo plano;
- sin presupuesto transversal de red;
- sin pruebas de solapamiento o cancelación.

Clasificación:

| Valor                   | Clasificación inicial         |
| ----------------------- | ----------------------------- |
| duración de animación   | constante UX local válida     |
| espera para abrir modal | constante UX local, nombrable |
| timeout de red          | política técnica transversal  |
| número de reintentos    | política técnica transversal  |
| intervalo de polling    | política de sincronización    |
| ventana de 24 horas     | regla funcional o comercial   |

Destinos:

- `CODE-AUD-014` — revisar servicios, sincronización y dependencias;
- `CODE-AUD-019`;
- `CODE-AUD-020`;
- E2/E4 para definir política.

No se genera todavía un requisito de prueba exclusivo para los valores temporales porque aún no existe una política canónica con valores esperados. Los requisitos se crearán cuando E2/E4 definan:

- timeout;
- backoff;
- frecuencia;
- foreground/background;
- cancelación;
- límite de solicitudes;
- degradación offline.

---

#### 9. NEXO — límite fijo de 500 productos

En:

```text
vento-nexo/src/app/inventory/adjust/page.tsx
```

la consulta inicial de productos incluye:

```ts
.limit(500)
```

El mismo flujo intenta recuperar posteriormente productos faltantes que tengan stock positivo visible. Esa compensación reduce el riesgo, pero no demuestra cobertura completa.

Un producto activo podría quedar fuera cuando:

- esté después de los primeros 500;
- tenga stock cero;
- deba seleccionarse para crear un ajuste positivo;
- no aparezca todavía en stock por sede, ubicación o posición;
- el orden alfabético lo deje fuera del corte.

Consecuencia:

- el usuario puede no encontrar un producto válido;
- el sistema puede mostrar una cantidad de productos menor al catálogo real;
- el límite técnico se convierte en límite funcional silencioso;
- el crecimiento del catálogo puede activar el defecto sin modificar código.

No se afirma que Vento Group tenga actualmente más de 500 productos aplicables en esa consulta. Se registra el riesgo de escalabilidad.

Soluciones que deberán evaluarse:

1. paginación;
2. búsqueda remota;
3. carga por demanda;
4. consulta completa controlada;
5. filtro obligatorio por sede/categoría;
6. RPC específica;
7. límite administrado con indicador de truncamiento.

**Clasificación:** límite funcional hardcodeado con riesgo de omisión silenciosa.

Destinos:

- `CODE-AUD-010` — revisar la experiencia cuando falta el producto;
- `CODE-AUD-012` — revisar el proceso de ajuste;
- `CODE-AUD-020` — materializar solución;
- paquete NEXO correspondiente.

---

#### 10. Decisiones temporales heredadas de CODE-AUD-008

##### 10.1. Historial de Saudo

El comentario:

```text
Por ahora, filtramos solo las que tienen metadata con site_id
```

confirma una decisión temporal.

Se mantiene:

```text
TREQ-PASS-003
```

No se crea un requisito duplicado.

##### 10.2. Parche temporal de NEXO

Persisten:

```text
scripts/tmp-apply-privileged-request-area.mjs
.github/workflows/tmp-apply-privileged-request-area.yml
scripts/tmp-privileged-area-patch-error.txt
```

Se mantiene:

```text
TREQ-NEXO-001
```

No se crea un requisito duplicado.

---

#### 11. Valores que no se clasifican automáticamente como brecha

##### 11.1. Identificadores canónicos de aplicación

Ejemplos:

```ts
const APP_ID = "nexo";
```

Pueden permanecer en código cuando:

- son estables;
- están versionados;
- se importan o verifican;
- no sustituyen una consulta dinámica.

##### 11.2. Estados y códigos de dominio

Valores como:

```text
requested
in_production
ready_for_transport
in_transit
completed
```

son contratos empresariales válidos si provienen de una máquina de estados canónica.

##### 11.3. Claves internas

Ejemplos:

- claves de caché;
- claves de almacenamiento;
- nombres de eventos;
- sentinels no persistidos;
- rutas internas.

##### 11.4. Diseño visual

No se clasifican como brecha por sí solos:

- colores;
- tamaños;
- espacios;
- tiempos de animación;
- textos estáticos;
- iconos.

##### 11.5. Límites defensivos

Un límite puede ser legítimo si:

- existe paginación;
- se informa truncamiento;
- el proceso no requiere cobertura completa;
- existe búsqueda adicional;
- está documentado y probado.

---

#### 12. Matriz por repositorio

| Repositorio     | Hallazgo principal                                                                                   | Clasificación                        |
| --------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `vento-shell`   | valores de migraciones y catálogos requieren análisis de E3; no se tratan masivamente como hardcodes | reservado para auditoría de Supabase |
| `vento-viso`    | listas locales de roles en rutas administrativas y permisos escritos por consumidor                  | crítico de autorización              |
| `vento-nexo`    | listas de roles, permisos manuales, límite de 500 y parche temporal                                  | crítico y técnico                    |
| `vento-fogo`    | comprobaciones locales de rol y permisos por superficie                                              | crítico de autorización              |
| `vento-origo`   | comprobaciones locales de rol y permisos por superficie                                              | crítico de autorización              |
| `vento-pulso`   | identificadores de aplicación y permisos distribuidos; requiere contraste con catálogo               | contractual                          |
| `vento-numera`  | no se confirma un hardcode crítico específico mediante esta revisión                                 | sin cierre de integridad             |
| `Vento-Group`   | contenido público y diseño estáticos son esperables; configuración operativa deberá separarse        | principalmente legítimo              |
| `vento-anima`   | tiempos de sincronización y refresco locales; posible lógica de capacidad por rol a consolidar       | técnico y de autorización            |
| `vento-pass`    | identidad de sedes, ubicación, enlaces, tiempos y decisiones temporales                              | operativo, comercial y técnico       |
| `vento-talento` | no se confirma hardcode crítico específico; producto futuro                                          | sin cierre de integridad             |
| `vento-vital`   | proyecto separado                                                                                    | fuera de Vento OS                    |

“Sin hardcode crítico específico confirmado” no significa ausencia total. Significa que esta tarea no obtuvo evidencia suficiente para formular una brecha concreta.

---

#### 13. Hallazgos y destino obligatorio

| ID               | Hallazgo                                                                                   | Clasificación                     | Destino                         |
| ---------------- | ------------------------------------------------------------------------------------------ | --------------------------------- | ------------------------------- |
| `H-CODE-009-001` | capacidades privilegiadas dependen de listas locales de roles en varias aplicaciones       | hardcode crítico                  | `CODE-AUD-017`, `019`, `020`    |
| `H-CODE-009-002` | códigos de permisos se escriben manualmente en múltiples consumidores                      | hardcode contractual              | `CODE-AUD-017`, `019`, `020`    |
| `H-CODE-009-003` | PASS mezcla resolución dinámica de sedes con identidad operativa incrustada                | riesgo de deriva                  | `CODE-AUD-015`, `019`, `020`    |
| `H-CODE-009-004` | dirección, coordenadas y enlaces comerciales de sedes permanecen en código PASS            | configuración operativa/comercial | `CODE-AUD-015`, `019`, `020`    |
| `H-CODE-009-005` | esquemas y dominios de PASS son contratos distribuidos en código                           | integración centralizable         | `CODE-AUD-019`, `020`, BLOQUE X |
| `H-CODE-009-006` | URL de Vaila está escrita directamente en la navegación                                    | integración centralizable         | `CODE-AUD-019`, `020`, BLOQUE X |
| `H-CODE-009-007` | timeout, reintentos, polling y ventanas temporales carecen de gobierno transversal visible | decisión técnica dispersa         | `CODE-AUD-014`, `019`, `020`    |
| `H-CODE-009-008` | NEXO aplica un límite inicial fijo de 500 productos en ajustes                             | riesgo de omisión silenciosa      | `CODE-AUD-010`, `012`, `020`    |
| `H-CODE-009-009` | filtro temporal de Saudo permanece vigente                                                 | decisión temporal                 | mantiene `TREQ-PASS-003`        |
| `H-CODE-009-010` | workflow y script temporal de NEXO permanecen versionados                                  | decisión temporal                 | mantiene `TREQ-NEXO-001`        |
| `H-CODE-009-011` | identificadores, estados, diseño y sentinels no son automáticamente brechas                | regla de clasificación            | cerrado                         |
| `H-CODE-009-012` | no se confirma hardcode crítico específico en NUMERA o TALENTO                             | límite de evidencia               | continuar auditoría             |

Todos los hallazgos quedan cerrados o vinculados con tareas existentes. No se crea una tarea nueva del roadmap.

---

#### 14. Requisitos de prueba derivados

**Resultado:** GENERA REQUISITOS DE PRUEBA

##### 14.1. Requisitos nuevos completos

| ID                     | Regla protegida                                                                                                                                                                                                           | Origen                                               | Riesgo                                                                                              | Tipo / modalidad                                                                       | Prioridad | Tarea responsable inmediata | Estado         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- | --------------------------- | -------------- |
| `TREQ-AUTH-001`        | Toda capacidad protegida deberá resolverse mediante permisos, contexto y alcance canónicos; una lista local de nombres de rol no podrá conceder por sí sola autorización final.                                           | `CODE-AUD-009` / `H-CODE-009-001`                    | acceso indebido, denegación incorrecta y divergencia entre aplicaciones                             | seguridad + autorización + regresión / automatizada                                    | crítica   | `CODE-AUD-017`              | `IDENTIFICADO` |
| `TREQ-AUTH-002`        | Todo identificador de permiso consumido por código deberá existir en la versión vigente del catálogo, utilizar la convención aprobada y quedar libre de strings huérfanos, duplicados o mal escritos.                     | `CODE-AUD-009` / `H-CODE-009-002`                    | controles inoperantes, permisos obsoletos y fallos silenciosos de autorización                      | contractual + estática + integración / automatizada                                    | crítica   | `CODE-AUD-017`              | `IDENTIFICADO` |
| `TREQ-PASS-004`        | El nombre operativo, dirección, coordenadas, enlaces y demás datos administrables de una sede mostrados por PASS deberán corresponder a la fuente canónica vigente y no divergir por literales duplicados en componentes. | `CODE-AUD-009` / `H-CODE-009-003` y `H-CODE-009-004` | información comercial incorrecta, navegación errónea y divergencia entre sedes                      | contractual + integración + interfaz / automatizada con validación manual de ubicación | alta      | `CODE-AUD-019`              | `IDENTIFICADO` |
| `TREQ-INTEGRATION-001` | Los esquemas, dominios y URLs externas utilizados por una aplicación deberán corresponder al ambiente y contrato aprobados, y no podrán divergir entre configuración móvil, web, pagos, notificaciones o navegación.      | `CODE-AUD-009` / `H-CODE-009-005` y `H-CODE-009-006` | deep links rotos, retorno incorrecto, navegación a destinos obsoletos y diferencias entre ambientes | contractual + integración + E2E / automatizada                                         | alta      | `CODE-AUD-019`              | `IDENTIFICADO` |
| `TREQ-NEXO-002`        | Todo producto activo y elegible para un ajuste deberá poder localizarse y seleccionarse sin quedar omitido silenciosamente por límites fijos de consulta.                                                                 | `CODE-AUD-009` / `H-CODE-009-008`                    | imposibilidad de ajustar productos válidos y cobertura incompleta del catálogo                      | integración + paginación + E2E / automatizada                                          | alta      | `CODE-AUD-012`              | `IDENTIFICADO` |

##### 14.2. Requisitos reutilizados

| ID              | Motivo                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| `TREQ-PASS-003` | ya protege la atribución completa del historial de Saudo                   |
| `TREQ-NEXO-001` | ya protege la eliminación de dependencia de scripts y workflows temporales |

##### 14.3. Filas completas para el Registro Canónico

Al aprobar `CODE-AUD-009`, agregar debajo de las filas existentes de `04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md`:

```md
| `TREQ-AUTH-001` | `AUTH` | Toda capacidad protegida deberá resolverse mediante permisos, contexto y alcance canónicos; una lista local de nombres de rol no podrá conceder por sí sola autorización final. | `CODE-AUD-009` / `H-CODE-009-001` | Acceso indebido, denegación incorrecta y divergencia entre aplicaciones / crítica | seguridad + autorización + regresión / automatizada | `CODE-AUD-017 — Revisar autorización, permisos, RLS y seguridad` | Pendiente de asignación en E5 | transversal / CI, staging y ambientes pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-AUTH-002` | `AUTH` | Todo identificador de permiso consumido por código deberá existir en la versión vigente del catálogo, utilizar la convención aprobada y quedar libre de strings huérfanos, duplicados o mal escritos. | `CODE-AUD-009` / `H-CODE-009-002` | Controles inoperantes, permisos obsoletos y fallos silenciosos de autorización / crítica | contractual + estática + integración / automatizada | `CODE-AUD-017 — Revisar autorización, permisos, RLS y seguridad` | Pendiente de asignación en E5 | transversal / CI pendiente | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-PASS-004` | `PASS` | El nombre operativo, dirección, coordenadas, enlaces y demás datos administrables de una sede mostrados por PASS deberán corresponder a la fuente canónica vigente y no divergir por literales duplicados en componentes. | `CODE-AUD-009` / `H-CODE-009-003` y `H-CODE-009-004` | Información comercial incorrecta, navegación errónea y divergencia entre sedes / alta | contractual + integración + interfaz / automatizada con validación manual de ubicación | `CODE-AUD-019 — Mapear dependencias, contratos y consumidores` | Pendiente de asignación en E5 | `vento-pass` / local, CI, staging y dispositivo físico pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-INTEGRATION-001` | `INTEGRATION` | Los esquemas, dominios y URLs externas utilizados por una aplicación deberán corresponder al ambiente y contrato aprobados, y no podrán divergir entre configuración móvil, web, pagos, notificaciones o navegación. | `CODE-AUD-009` / `H-CODE-009-005` y `H-CODE-009-006` | Deep links rotos, retorno incorrecto, navegación a destinos obsoletos y diferencias entre ambientes / alta | contractual + integración + E2E / automatizada | `CODE-AUD-019 — Mapear dependencias, contratos y consumidores` | Pendiente de asignación en E5 | transversal / CI, staging y builds móviles pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-NEXO-002` | `NEXO` | Todo producto activo y elegible para un ajuste deberá poder localizarse y seleccionarse sin quedar omitido silenciosamente por límites fijos de consulta. | `CODE-AUD-009` / `H-CODE-009-008` | Imposibilidad de ajustar productos válidos y cobertura incompleta del catálogo / alta | integración + paginación + E2E / automatizada | `CODE-AUD-012 — Detectar procesos parcialmente implementados` | Pendiente de asignación en E5 | `vento-nexo` / local, CI y staging pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
```

Estas son las líneas completas. No deberán reemplazarse por una lista de identificadores.

---

#### 15. Decisiones propuestas

1. No se realizará una sustitución indiscriminada de literales.
2. Los valores se clasificarán por efecto, no por apariencia.
3. Las listas locales de roles no serán fuente final de autorización.
4. Los permisos deberán derivarse o validarse contra el catálogo versionado.
5. Los datos operativos de sede deberán tener fuente canónica.
6. La identidad visual podrá permanecer versionada en código cuando corresponda.
7. Los enlaces comerciales y dominios deberán tratarse como contratos.
8. Los esquemas móviles estables podrán conservarse como constantes verificadas.
9. Los tiempos de red y sincronización deberán convertirse en políticas nombradas.
10. No se fijan todavía valores canónicos de timeout o polling.
11. El límite de 500 productos se considera riesgo funcional.
12. No se afirma que el catálogo actual ya supere dicho límite.
13. `TREQ-PASS-003` se reutiliza y no se duplica.
14. `TREQ-NEXO-001` se reutiliza y no se duplica.
15. Se crean `TREQ-AUTH-001` y `TREQ-AUTH-002`.
16. Se crea `TREQ-PASS-004`.
17. Se crea `TREQ-INTEGRATION-001`.
18. Se crea `TREQ-NEXO-002`.
19. Los cinco requisitos nuevos quedan `IDENTIFICADO`.
20. No se crea una tarea nueva del roadmap.
21. `CODE-AUD-010` será la única continuidad inmediata.

---

#### 16. Límites de certeza

Esta tarea no confirma:

- que todas las listas de roles hayan sido localizadas;
- que cada literal de permiso esté incorrecto;
- que todas las sedes de PASS tengan datos divergentes;
- que los enlaces actuales estén rotos;
- que el catálogo de NEXO ya exceda 500 productos;
- que todo intervalo de 15 segundos produzca carga excesiva;
- que NUMERA o TALENTO no contengan hardcodes;
- que una constante estable deba migrarse a Supabase;
- que las migraciones con datos canónicos sean datos hardcodeados incorrectos;
- que todas las decisiones temporales estén todavía activas en producción.

Las tareas siguientes deberán revisar consumidores, procesos completos, seguridad, dependencias y estado de ejecución.

---

#### 17. Criterios de aceptación

`CODE-AUD-009` podrá aprobarse cuando:

- hardcode crítico, configuración, constante y número mágico estén diferenciados;
- las listas locales de roles estén inventariadas;
- los códigos manuales de permisos tengan destino;
- PASS tenga documentada la mezcla entre sede dinámica y datos incrustados;
- URLs y esquemas estén clasificados como contratos;
- timeout, polling y reintentos estén registrados sin inventar valores nuevos;
- el límite de 500 productos esté documentado;
- las decisiones temporales anteriores reutilicen sus requisitos;
- cada hallazgo tenga destino;
- las cinco filas nuevas `TREQ-*` estén completas;
- no se creen requisitos duplicados;
- no se cree una tarea nueva sin necesidad;
- no se modifique código;
- no se modifique Supabase;
- `CODE-AUD-010` permanezca como continuidad inmediata.

---

#### 18. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
valor literal o decisión provisional
        ↓
clasificación por impacto
        ↓
constante legítima, configuración, regla o riesgo
        ↓
fuente canónica y propietario
        ↓
requisito de prueba cuando existe comportamiento protegible
        ↓
consumidores e interfaces por revisar
```

La continuidad será:

```text
CODE-AUD-010
— Detectar interfaces sin lógica real detrás
```


### ✅ CODE-AUD-010 — Detectar pantallas con interfaz pero sin lógica completa

**Estado:** APROBADA
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Tipo:** auditoría transversal de superficies visibles, acciones disponibles y cobertura funcional real  
**Dependencia anterior:** `CODE-AUD-009`  
**Continuidad reservada:** `CODE-AUD-011`  
**Fecha de corte:** 2026-07-24  
**Cambios en código, CI o Supabase:** no autorizados ni realizados durante esta tarea  

---

#### 1. Resultado de esta tarea

Esta tarea contrasta pantallas, formularios, botones, tarjetas, vistas previas y controles visibles con la lógica que realmente ejecutan.

El objetivo no es declarar incompleta una pantalla por ser sencilla. El objetivo es detectar superficies que:

1. ofrecen una acción que no ejecuta el proceso prometido;
2. muestran datos cuya cobertura es parcial sin informarlo;
3. presentan controles de mutación en un modo donde no pueden funcionar;
4. aparentan persistir una configuración que solo se usa de manera transitoria;
5. permiten confirmar una operación basándose en una simulación no equivalente al resultado real;
6. comunican éxito sin persistencia verificable;
7. contienen módulos visibles pero todavía no tienen contrato funcional completo;
8. ocultan dependencias ausentes mediante fallbacks silenciosos;
9. poseen lógica local, pero no lógica de servidor o persistencia;
10. ya tienen una brecha reconocida por otro plan canónico y deben quedar trazadas sin duplicar tareas.

Resultado general:

- se confirma una brecha funcional en la selección de audiencia de novedades de ANIMA;
- se confirma que el modo fallback de novedades de ANIMA sigue exponiendo controles de creación, edición y eliminación que no funcionan de forma coherente;
- se confirma que la vista previa de impresión de NEXO es una representación local y no una reproducción del resultado físico de la impresora;
- se incorpora la brecha ya reconocida por el plan web para la interfaz de newsletter;
- se reutilizan los requisitos existentes de PASS y NEXO relacionados con interfaces o datos parciales;
- no se confirma que los stubs `goToMovements` y `onScanTable` estén expuestos actualmente en una pantalla activa;
- se comprobaron varias pantallas de TALENTO, NUMERA, PULSO y NEXO que sí tienen lectura, mutación o navegación real;
- no se crea una tarea nueva del roadmap;
- no se modifica código durante esta tarea.

---

#### 2. Definiciones utilizadas

##### 2.1. Interfaz completa

Una interfaz es funcionalmente completa cuando:

- la acción visible tiene un contrato definido;
- el evento llega a una implementación real;
- el servidor valida autorización y datos cuando corresponde;
- el resultado se persiste o consulta desde la fuente correcta;
- los errores se comunican;
- los estados de carga y éxito representan el resultado real;
- la pantalla no oculta exclusiones relevantes;
- la experiencia coincide con la capacidad anunciada.

##### 2.2. Interfaz parcial

La pantalla ejecuta una parte del proceso, pero omite:

- alcance;
- persistencia;
- validación;
- casos de error;
- edición;
- auditoría;
- consumidores;
- cobertura total de datos;
- equivalencia con el resultado físico.

##### 2.3. Interfaz ficticia

La pantalla o control parece ofrecer una capacidad, pero:

- solo muestra una alerta;
- no tiene handler real;
- modifica únicamente estado local;
- no llama a ningún contrato;
- comunica éxito sin persistencia;
- utiliza datos estáticos como si fueran operativos.

##### 2.4. Interfaz degradada

La pantalla funciona con una fuente alternativa o modo de contingencia, pero debe:

- declarar el modo;
- limitar acciones imposibles;
- evitar confirmaciones falsas;
- preservar seguridad;
- permitir recuperación.

##### 2.5. Estado vacío válido

Un mensaje como:

```text
No hay registros
Sin novedades
Aún no existen movimientos
```

no es una interfaz incompleta cuando representa correctamente el resultado de una consulta real.

##### 2.6. Feature flag válida

Ocultar una capacidad mediante una bandera de entorno no implica falta de lógica si:

- la bandera es intencional;
- la ruta también queda protegida;
- el backend no depende solo del ocultamiento visual;
- la capacidad se habilita únicamente cuando su contrato está listo.

---

#### 3. Método de revisión

Para cada superficie relevante se contrastó:

```text
elemento visible
        ↓
handler o navegación
        ↓
servicio, acción, API, RPC o Edge Function
        ↓
persistencia o lectura real
        ↓
autorización y alcance
        ↓
resultado visible
```

Se buscaron especialmente:

- textos `Próximamente`;
- funciones placeholder;
- controles visibles en modos fallback;
- formularios sin persistencia;
- botones sin efecto;
- `href="#"`;
- acciones que solo cambian estado local;
- pantallas con datos simulados;
- vistas previas no equivalentes al resultado real;
- filtros que omiten datos silenciosamente;
- tareas funcionales ya reconocidas en planes especializados.

La búsqueda textual fue complementada con inspección de componentes y servicios. No se clasificó una pantalla solo por su nombre, apariencia o cantidad de código.

---

#### 4. ANIMA — selección de audiencia que no controla la visibilidad persistente

Archivos revisados:

```text
vento-anima/app/(app)/announcements.tsx
vento-anima/src/components/announcements/use-announcements-screen.ts
```

La pantalla de creación de novedades ofrece:

```text
Seleccionar sede o trabajador
Opcional. Sin marcar = se envía a todos.
```

Sin embargo, las opciones realmente disponibles son:

- sedes;
- roles.

No existe un selector de trabajador individual en esa interfaz.

Además, la selección solo aparece al crear. Cuando se edita una novedad:

- no se carga una audiencia persistida;
- no se muestra la audiencia original;
- no se permite modificarla;
- no se informa que solo se editará el contenido.

La consulta de novedades lee únicamente:

```text
id
title
body
tag
published_at
created_at
```

y obtiene todas las novedades activas. No se localizaron en ese flujo:

- columnas de audiencia;
- filtro por sede del trabajador;
- filtro por rol;
- filtro por empleado;
- relación persistida entre anuncio y audiencia.

Durante la creación, los valores seleccionados se envían a:

```text
announcement-notify
```

después de insertar el anuncio.

Por tanto, el comportamiento actual es:

```text
selección en la interfaz
        ↓
destinatarios de una notificación puntual
        ≠
alcance persistente de visibilidad del anuncio
```

La interfaz no distingue expresamente esas dos funciones.

Consecuencias:

- un gerente puede creer que restringió quién verá la novedad;
- la novedad puede seguir siendo leída por usuarios fuera de la audiencia notificada;
- editar la novedad no conserva ni muestra el criterio usado al notificar;
- no existe trazabilidad visible de a quién se dirigió;
- la etiqueta “trabajador” no corresponde con los controles disponibles.

**Clasificación:** interfaz con contrato funcional ambiguo y proceso parcialmente implementado.

Destino:

- `CODE-AUD-012 — Detectar procesos implementados solo parcialmente`;
- `CODE-AUD-017 — Auditar autorización, validación de servidor y exposición de datos`;
- `CODE-AUD-019 — Vincular cada capacidad con su implementación actual verificable`;
- `CODE-AUD-020 — Crear backlog técnico y funcional trazable por repositorio`.

Decisión pendiente de diseño:

1. la audiencia solo controla notificaciones; o
2. la audiencia controla también la visibilidad persistente.

La interfaz deberá nombrar y ejecutar exactamente la opción aprobada.

---

#### 5. ANIMA — modo fallback con controles de mutación todavía visibles

El hook de novedades inicia con una colección local:

```text
ANNOUNCEMENTS
```

y utiliza esa colección como fallback cuando la tabla remota no existe.

En ese caso la pantalla indica:

```text
Comunicados y anuncios internos (modo local).
```

No obstante, para un usuario considerado gestor, la pantalla sigue mostrando:

- `Nueva novedad`;
- `Editar`;
- `Eliminar`.

Comportamiento real:

##### Crear o editar

`handleSave` detecta el modo fallback y detiene la acción con:

```text
Activa la tabla announcements en Supabase antes de crear novedades.
```

##### Eliminar

`handleDelete` no aplica la misma guarda de modo fallback. Intenta eliminar en Supabase y termina en error si la infraestructura no está disponible.

Esto genera una pantalla visualmente editable que en realidad opera como solo lectura.

Consecuencias:

- se ofrece una acción que no puede completarse;
- un gerente puede llenar un formulario para descubrir el bloqueo al final;
- editar una novedad fallback tampoco puede persistirse;
- eliminar sigue intentando una operación remota inválida;
- el modo degradado no tiene contrato uniforme.

**Clasificación:** interfaz degradada con mutaciones incoherentes.

Regla propuesta:

```text
modo remoto disponible
→ lectura y mutaciones según permisos

modo fallback
→ lectura explícitamente local y controles de mutación ocultos o deshabilitados
```

Destinos:

- `CODE-AUD-012`;
- `CODE-AUD-017`;
- `CODE-AUD-020`.

---

#### 6. NEXO — vista previa de impresión local no equivalente a una impresión física

Archivo revisado:

```text
vento-nexo/src/app/printing/jobs/_components/PreviewPanel.tsx
```

La pantalla muestra:

```text
3. Vista previa
Confirma rápido y manda a imprimir.
Preview local
```

La representación puede provenir de:

1. `LayoutPreview`, construido con elementos HTML posicionados en milímetros; o
2. `MockMiniLabel`, utilizado como representación local de la etiqueta.

La pantalla también permite visualizar el ZPL generado.

No se localizó en el componente actual:

- render remoto del ZPL mediante motor equivalente a Zebra;
- imagen generada por la impresora;
- validación de fuentes soportadas;
- comprobación física de márgenes;
- verificación de contraste y densidad;
- prueba de legibilidad del código;
- equivalencia demostrada entre la simulación HTML y el ZPL;
- advertencia de que la simulación no sustituye una prueba física.

El chip `Preview local` evita presentarlo como una vista remota real. Sin embargo, el texto “Confirma rápido y manda a imprimir” todavía le atribuye función de aprobación operativa.

No se afirma que el ZPL sea incorrecto. Se establece que:

```text
representación local
        ≠
resultado físico verificado
```

Riesgos:

- posiciones diferentes entre HTML, ZPL e impresora;
- recorte por dimensiones o márgenes;
- código QR, DataMatrix o Code128 ilegible;
- diferencia entre DPI configurado y dispositivo real;
- operador que aprueba una simulación pensando que valida la salida física.

**Clasificación:** interfaz parcialmente completa; tiene lógica de previsualización, pero no equivalencia física demostrada.

Destinos:

- `CODE-AUD-012`;
- `CODE-AUD-018 — Auditar operación offline, reintentos, concurrencia e idempotencia`;
- `CODE-AUD-019`;
- `CODE-AUD-020`;
- BLOQUE X para integración con impresión;
- paquete NEXO de impresión.

---

#### 7. Web pública — formulario de newsletter reconocido como interfaz sin implementación final

El plan especializado de VISO Web Studio y Vento Group Web ya materializó:

```text
WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz
```

Ese marcador confirma que la superficie pública presenta o contempla una interfaz de suscripción cuyo contrato todavía debe resolverse.

Esta tarea no duplica `WEB-FRM-011`.

El cierre aceptable será uno de estos:

##### Opción A — Implementar

- validar formato;
- registrar consentimiento;
- persistir o enviar al proveedor aprobado;
- evitar duplicados;
- comunicar éxito real;
- comunicar error real;
- aplicar privacidad y retención;
- permitir baja cuando corresponda;
- producir evidencia.

##### Opción B — Retirar

- eliminar el formulario y cualquier promesa de suscripción;
- no conservar un botón inerte;
- no simular confirmación.

**Clasificación:** interfaz pública con destino funcional existente.

Destino exacto:

```text
WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz
```

No se crea una tarea nueva.

---

#### 8. PASS — stubs confirmados, pero sin pantalla consumidora vigente comprobada

`CODE-AUD-008` confirmó:

```text
goToMovements
onScanTable
```

como funciones placeholder.

La revisión actual del Home de PASS no las importa. El Home consume:

```text
goToMenuVento
goToMenuSaudo
goToVailaWebView
```

y las tarjetas dinámicas navegan hacia `SatellitePass`.

Por tanto, esta tarea no afirma que hoy exista una pantalla activa mostrando los botones de movimientos o escaneo de mesa.

Clasificación actual:

| Elemento             | Estado                |
| -------------------- | --------------------- |
| función incompleta   | confirmado            |
| consumidor actual    | no confirmado         |
| botón visible actual | no confirmado         |
| capacidad aprobada   | pendiente de decisión |

Se mantienen:

- `TREQ-PASS-001`;
- `TREQ-PASS-002`.

Destino:

- `CODE-AUD-015 — Detectar rutas, componentes, funciones y tablas sin consumidores`;
- `CODE-AUD-019`;
- `CODE-AUD-020`.

Si no tienen consumidores ni capacidad aprobada, podrán retirarse en lugar de implementarse.

---

#### 9. Hallazgos visibles anteriores que se reutilizan

##### 9.1. Historial de Saudo

El historial puede omitir transacciones sin `metadata.site_id`.

Esto afecta una pantalla real y visible, pero ya está cubierto por:

```text
TREQ-PASS-003
```

No se crea un requisito duplicado.

##### 9.2. Ajustes de NEXO

La lista inicial limitada a 500 productos puede impedir localizar productos válidos.

Esto afecta una interfaz real, pero ya está cubierto por:

```text
TREQ-NEXO-002
```

No se crea un requisito duplicado.

##### 9.3. Parche de selección privilegiada de área

La dependencia de un parche temporal ya está cubierta por:

```text
TREQ-NEXO-001
```

No se crea un requisito duplicado.

---

#### 10. Pantallas revisadas que sí tienen lógica real

Estas superficies se excluyen como falsos positivos de esta tarea.

##### 10.1. TALENTO — Inicio

La pantalla:

- obtiene `getHomeDashboardSummary`;
- carga postulación principal;
- calcula requisitos pendientes;
- navega al siguiente paso;
- refresca desde la fuente remota.

**Clasificación:** interfaz conectada.

##### 10.2. TALENTO — Documentos

La pantalla:

- consulta requisitos y archivos;
- selecciona archivos;
- sube documentos;
- obtiene URL firmada;
- abre el archivo;
- refresca después de guardar.

**Clasificación:** interfaz conectada.

##### 10.3. TALENTO — Perfil

La pantalla:

- consulta el perfil del candidato;
- convierte datos al formulario;
- guarda mediante `updateMyCandidateProfile`;
- controla cambios;
- maneja error y cierre de sesión.

**Clasificación:** interfaz conectada.

##### 10.4. NUMERA — Panel principal

La pantalla ejecuta:

```text
numera_current_period_summary
```

y muestra métricas obtenidas del resultado.

**Clasificación:** interfaz de lectura conectada.

##### 10.5. NUMERA — Rentabilidad

La pantalla consulta:

```text
numera_cost_center_monthly_summary
```

y muestra datos por centro de costo.

**Clasificación:** interfaz de lectura conectada.

##### 10.6. PULSO — Importaciones de ventas

La pantalla incluye:

- carga de archivo;
- parseo XLSX;
- mapeo;
- validación;
- persistencia de lotes;
- condiciones para contabilizar.

**Clasificación:** interfaz conectada.

##### 10.7. PULSO — Escáner POS

El componente utiliza acciones reales para:

- identificar cliente;
- validar redención;
- procesar resultados;
- mostrar saldo.

**Clasificación:** interfaz conectada.

##### 10.8. PULSO — Salón

La pantalla consume datos reales de:

- zonas;
- mesas;
- sesiones;
- llamados;
- actualizaciones Realtime.

**Clasificación:** interfaz conectada.

##### 10.9. NEXO — Diseñador de plantillas

El módulo:

- carga plantillas;
- guarda por API;
- elimina por API;
- persiste en `printing_label_templates`.

**Clasificación:** interfaz conectada.

La brecha está en la fidelidad de la vista previa física, no en la persistencia del diseñador.

##### 10.10. PASS — Club

La pantalla utiliza:

- membresía;
- wallet;
- ledger;
- RevenueCat;
- compra;
- restauración.

Además, la entrada al Club está gobernada por una feature flag.

**Clasificación:** interfaz conectada y controlada por bandera.

---

#### 11. Criterio sobre pantallas futuras o inactivas

Una ruta o componente puede existir sin estar habilitado.

No se clasificará como brecha visible cuando:

- no tenga navegación activa;
- esté detrás de una feature flag desactivada;
- sea un borrador aislado;
- no tenga consumidor;
- el usuario no pueda alcanzarlo.

En esos casos corresponde:

- `CODE-AUD-015` para confirmar consumidores;
- retiro del código si quedó huérfano;
- activación posterior solo al cumplir sus contratos.

La mera existencia de JSX no demuestra exposición operativa.

---

#### 12. Matriz por repositorio

| Repositorio     | Resultado de CODE-AUD-010                                                                                                      | Clasificación                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `vento-shell`   | no es aplicación funcional de negocio; la página auxiliar de apertura ANIMA sí construye y abre el deep link                   | sin interfaz ficticia confirmada    |
| `vento-viso`    | las superficies administrativas muestreadas tienen consultas o acciones; la cobertura total continúa en auditorías posteriores | sin hallazgo concluyente nuevo      |
| `vento-nexo`    | vista previa de impresión local sin equivalencia física demostrada; ajuste puede omitir productos por límite ya registrado     | parcial                             |
| `vento-fogo`    | no se confirma pantalla visible sin lógica mediante esta revisión                                                              | sin hallazgo concluyente nuevo      |
| `vento-origo`   | no se confirma pantalla visible sin lógica mediante esta revisión                                                              | sin hallazgo concluyente nuevo      |
| `vento-pulso`   | importaciones, salón y escáner muestreados poseen lógica real                                                                  | conectado                           |
| `vento-numera`  | dashboard y rentabilidad consultan fuentes reales                                                                              | conectado                           |
| `Vento-Group`   | newsletter tiene brecha reconocida por el plan web                                                                             | incompleta con destino existente    |
| `vento-anima`   | audiencia de novedades ambigua y fallback con mutaciones incoherentes                                                          | incompleta                          |
| `vento-pass`    | stubs sin consumidor visible confirmado; historial parcial ya registrado                                                       | pendiente de consumidores / parcial |
| `vento-talento` | inicio, documentos y perfil están conectados a servicios reales                                                                | conectado, producto futuro          |
| `vento-vital`   | proyecto separado                                                                                                              | fuera de Vento OS                   |

“Sin hallazgo concluyente nuevo” no equivale a aprobación integral del repositorio.

---

#### 13. Hallazgos y destino obligatorio

| ID               | Hallazgo                                                                                                                               | Clasificación                           | Destino                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------- |
| `H-CODE-010-001` | ANIMA presenta selección de audiencia, pero la lectura no aplica alcance persistente y la creación solo usa los valores para notificar | interfaz y contrato parcial             | `CODE-AUD-012`, `017`, `019`, `020` |
| `H-CODE-010-002` | ANIMA mantiene crear, editar y eliminar visibles durante fallback local                                                                | interfaz degradada incoherente          | `CODE-AUD-012`, `017`, `020`        |
| `H-CODE-010-003` | NEXO utiliza preview local o mock como apoyo para confirmar impresión sin equivalencia física demostrada                               | interfaz parcial                        | `CODE-AUD-012`, `018`, `019`, `020` |
| `H-CODE-010-004` | newsletter pública debe implementarse o retirarse                                                                                      | interfaz sin contrato final             | `WEB-FRM-011`                       |
| `H-CODE-010-005` | `goToMovements` y `onScanTable` son stubs, pero no se confirma consumidor visible actual                                               | código incompleto posiblemente huérfano | `CODE-AUD-015`, `019`, `020`        |
| `H-CODE-010-006` | historial Saudo tiene cobertura parcial                                                                                                | hallazgo reutilizado                    | mantiene `TREQ-PASS-003`            |
| `H-CODE-010-007` | selección de producto en ajuste NEXO puede truncarse                                                                                   | hallazgo reutilizado                    | mantiene `TREQ-NEXO-002`            |
| `H-CODE-010-008` | varias pantallas TALENTO, NUMERA, PULSO y NEXO sí poseen contratos reales                                                              | falsos positivos descartados            | cerrado                             |
| `H-CODE-010-009` | una pantalla oculta por feature flag no se considera superficie operativa disponible                                                   | regla de clasificación                  | cerrado                             |
| `H-CODE-010-010` | no se confirma una pantalla incompleta nueva en VISO, FOGO u ORIGO                                                                     | límite de evidencia                     | continuar `CODE-AUD-011` a `020`    |

Todos los hallazgos quedan cerrados o vinculados a tareas existentes.

**No se crea ninguna tarea nueva del roadmap.**

---

#### 14. Requisitos de prueba derivados

**Resultado:** GENERA REQUISITOS DE PRUEBA

##### 14.1. Requisitos nuevos completos

| ID                     | Regla protegida                                                                                                                                                                                                                            | Origen                            | Riesgo                                                                                          | Tipo / modalidad                                              | Prioridad | Tarea responsable inmediata                                                 | Estado         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- | --------------------------------------------------------------------------- | -------------- |
| `TREQ-ANIMA-001`       | Cuando la interfaz de novedades permita seleccionar audiencia, deberá distinguir si controla notificaciones o visibilidad persistente; el modelo aprobado deberá conservarse, editarse, auditarse y aplicarse al leer.                     | `CODE-AUD-010` / `H-CODE-010-001` | exposición fuera de alcance, usuarios objetivo no informados y falsa percepción de segmentación | contractual + autorización + integración + E2E / automatizada | alta      | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente`          | `IDENTIFICADO` |
| `TREQ-ANIMA-002`       | Cuando novedades opere con datos fallback o en modo solo lectura, no deberá mostrar controles de crear, editar o eliminar que no puedan completarse; el modo deberá ser explícito y coherente.                                             | `CODE-AUD-010` / `H-CODE-010-002` | trabajo perdido, errores previsibles y experiencia administrativa engañosa                      | interfaz + regresión / automatizada                           | alta      | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente`          | `IDENTIFICADO` |
| `TREQ-NEXO-003`        | Toda vista previa usada para aprobar una impresión deberá identificar si es simulación y demostrar correspondencia suficiente entre plantilla, ZPL, DPI, dimensiones, códigos y muestra física antes de considerarse validación de salida. | `CODE-AUD-010` / `H-CODE-010-003` | etiquetas recortadas, códigos ilegibles y diferencia entre vista previa e impresión física      | contractual + interfaz + hardware + regresión / híbrida       | alta      | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente`          | `IDENTIFICADO` |
| `TREQ-INTEGRATION-002` | Toda interfaz pública de newsletter deberá registrar una suscripción y consentimiento reales mediante el contrato aprobado, comunicar el resultado verdadero y permitir el tratamiento definido; de lo contrario no deberá publicarse.     | `CODE-AUD-010` / `H-CODE-010-004` | falsa confirmación, pérdida de contactos y tratamiento de datos sin contrato verificable        | integración + privacidad + E2E / automatizada                 | alta      | `WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz` | `IDENTIFICADO` |

##### 14.2. Requisitos reutilizados

| ID              | Uso en esta tarea                                              |
| --------------- | -------------------------------------------------------------- |
| `TREQ-PASS-001` | conservar hasta confirmar consumidor o retirar `goToMovements` |
| `TREQ-PASS-002` | conservar hasta confirmar consumidor o retirar `onScanTable`   |
| `TREQ-PASS-003` | protege la cobertura completa del historial de Saudo           |
| `TREQ-NEXO-001` | protege la implementación canónica sin parche temporal         |
| `TREQ-NEXO-002` | protege la selección completa de productos en ajustes          |

No se cambia el estado de esos requisitos durante `CODE-AUD-010`.

##### 14.3. Filas completas para el Registro Canónico

Al aprobar `CODE-AUD-010`, agregar debajo de las filas existentes de:

```text
docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md
```

las siguientes líneas completas:

```md
| `TREQ-ANIMA-001` | `ANIMA` | Cuando la interfaz de novedades permita seleccionar audiencia, deberá distinguir si controla notificaciones o visibilidad persistente; el modelo aprobado deberá conservarse, editarse, auditarse y aplicarse al leer. | `CODE-AUD-010` / `H-CODE-010-001` | Exposición fuera de alcance, usuarios objetivo no informados y falsa percepción de segmentación / alta | contractual + autorización + integración + E2E / automatizada | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente` | Pendiente de asignación en E5 | `vento-anima` / local, CI, staging y dispositivo móvil pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-ANIMA-002` | `ANIMA` | Cuando novedades opere con datos fallback o en modo solo lectura, no deberá mostrar controles de crear, editar o eliminar que no puedan completarse; el modo deberá ser explícito y coherente. | `CODE-AUD-010` / `H-CODE-010-002` | Trabajo perdido, errores previsibles y experiencia administrativa engañosa / alta | interfaz + regresión / automatizada | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente` | Pendiente de asignación en E5 | `vento-anima` / local, CI, staging y dispositivo móvil pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-NEXO-003` | `NEXO` | Toda vista previa usada para aprobar una impresión deberá identificar si es simulación y demostrar correspondencia suficiente entre plantilla, ZPL, DPI, dimensiones, códigos y muestra física antes de considerarse validación de salida. | `CODE-AUD-010` / `H-CODE-010-003` | Etiquetas recortadas, códigos ilegibles y diferencia entre vista previa e impresión física / alta | contractual + interfaz + hardware + regresión / híbrida | `CODE-AUD-012 — Detectar procesos implementados solo parcialmente` | Pendiente de asignación en E5 | `vento-nexo` / local, CI, staging e impresora física pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
| `TREQ-INTEGRATION-002` | `INTEGRATION` | Toda interfaz pública de newsletter deberá registrar una suscripción y consentimiento reales mediante el contrato aprobado, comunicar el resultado verdadero y permitir el tratamiento definido; de lo contrario no deberá publicarse. | `CODE-AUD-010` / `H-CODE-010-004` | Falsa confirmación, pérdida de contactos y tratamiento de datos sin contrato verificable / alta | integración + privacidad + E2E / automatizada | `WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz` | Pendiente de asignación en el plan web y E5 cuando corresponda | `Vento-Group` y `vento-viso` / CI, preview y producción pública pendientes | `IDENTIFICADO` | Pendiente | Pendiente | Pendiente | — |
```

Estas filas no deberán resumirse como una lista de identificadores.

---

#### 15. Decisiones propuestas

1. Una pantalla visualmente completa no se considerará funcional sin contrato ejecutable.
2. La existencia de un handler no demuestra persistencia correcta.
3. Una selección de audiencia deberá declarar si controla notificación, visibilidad o ambas.
4. La audiencia de novedades ANIMA no se considerará persistida con la implementación actual.
5. El texto “trabajador” deberá corregirse si solo existen filtros por sede y rol.
6. El modo fallback de novedades deberá ser coherentemente de solo lectura.
7. Los controles imposibles deberán ocultarse o deshabilitarse antes de que el usuario llene el formulario.
8. La vista previa local de NEXO no se considerará equivalente a una impresión física.
9. La simulación podrá conservarse como ayuda visual.
10. La aprobación física requerirá prueba sobre impresora real cuando corresponda.
11. `WEB-FRM-011` se conserva como destino exacto de newsletter.
12. No se crea una tarea web duplicada.
13. Los stubs de PASS no se consideran botones activos sin consumidor confirmado.
14. `CODE-AUD-015` decidirá si esos stubs están huérfanos.
15. `TREQ-PASS-001`, `002` y `003` se reutilizan.
16. `TREQ-NEXO-001` y `002` se reutilizan.
17. Se crean `TREQ-ANIMA-001` y `TREQ-ANIMA-002`.
18. Se crea `TREQ-NEXO-003`.
19. Se crea `TREQ-INTEGRATION-002`.
20. Los cuatro requisitos nuevos quedan en estado `IDENTIFICADO`.
21. No se crea una tarea nueva del roadmap.
22. `CODE-AUD-011` será la única continuidad inmediata.

---

#### 16. Límites de certeza

Esta tarea no confirma:

- que todas las rutas sean alcanzables en producción;
- que todos los roles vean los mismos controles;
- que cada botón de todas las aplicaciones haya sido ejecutado;
- que el Edge Function de notificaciones no conserve auditoría por otra vía;
- que las novedades actuales contengan datos sensibles;
- que la vista previa NEXO produzca hoy una impresión incorrecta;
- que el formulario público de newsletter esté publicado en todas las rutas;
- que los stubs PASS carezcan de consumidores en ramas distintas;
- que ausencia de hallazgo en VISO, FOGO u ORIGO implique integridad completa;
- que las pantallas conectadas estén libres de errores de negocio;
- que una consulta real garantice autorización correcta.

Las tareas siguientes revisarán infraestructura, procesos parciales, legacy, duplicidad, consumidores, build, seguridad, concurrencia y trazabilidad funcional.

---

#### 17. Criterios de aceptación

`CODE-AUD-010` podrá aprobarse cuando:

- interfaz completa, parcial, ficticia y degradada estén diferenciadas;
- estados vacíos y feature flags no se clasifiquen erróneamente;
- la audiencia de novedades ANIMA esté contrastada con su persistencia real;
- el modo fallback de novedades esté documentado;
- la edición y eliminación durante fallback tengan destino;
- la vista previa local de NEXO esté diferenciada de la salida física;
- newsletter tenga `WEB-FRM-011` como destino exacto;
- los stubs PASS no se declaren visibles sin evidencia;
- los requisitos anteriores se reutilicen sin duplicarse;
- las pantallas conectadas revisadas queden excluidas como falsos positivos;
- cada hallazgo tenga destino;
- las cuatro filas nuevas `TREQ-*` estén completas;
- no se cree una tarea nueva;
- no se modifique código;
- no se modifique Supabase;
- `CODE-AUD-011` permanezca como continuidad inmediata.

---

#### 18. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
pantalla o control visible
        ↓
handler y navegación
        ↓
contrato real
        ↓
persistencia, alcance y resultado
        ↓
interfaz completa, parcial, degradada o ficticia
        ↓
TREQ y tarea responsable
```

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:WEB-FRM-011 -->
### Reconciliación topológica de WEB-FRM-011

La tarea exige resolver físicamente la superficie existente: implementar la suscripción de newsletter o retirar la interfaz incompleta.

| modalidad | `PER_IMPLEMENTATION_UNIT` |
| gate temporal | `POST_E5_PACKAGE` |

### ✅ WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión
**Tarea siguiente:** AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia
**Tipo de tarea:** definición técnico-documental de resolución de la interfaz pública de newsletter; cierra el hallazgo existente seleccionando la retirada fail-closed de la superficie sin contrato operativo y define la materialización física posterior por `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`
**Bloque:** `BLOQUE E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04_02_GOBIERNO_DE_PRUEBAS_STUBS_Y_SUPERFICIES_INCOMPLETAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Resolver de forma determinista el hallazgo de newsletter pública identificado previamente, evitando que Vento Group publique un control que solicita correo electrónico sin disponer de un contrato operativo verificable que registre suscripción, consentimiento y resultado real.

La tarea define una sola vez qué debe ocurrir con la superficie existente y separa esa decisión documental de su futura materialización física.

```text
INTERFAZ PUBLICA EXISTENTE
+
SIN CONTRATO OPERATIVO APROBADO
+
SIN PERSISTENCIA VERIFICABLE
+
SIN CONSENTIMIENTO VERIFICABLE
=
RETIRADA FAIL-CLOSED DE LA INTERFAZ
```

Esta resolución no implementa un servicio de newsletter, no crea persistencia y no autoriza tratamiento de datos personales.

---

#### 2. Decisión canónica

Se aprueba la siguiente resolución:

```text
NEWSLETTER_CURRENT_SURFACE = PUBLIC_FAKE_CONTROL
NEWSLETTER_BACKEND_CONTRACT = NOT_FOUND
NEWSLETTER_PERSISTENCE = NOT_FOUND
NEWSLETTER_CONSENT_CONTRACT = NOT_FOUND
WEB_FRM_011_RESOLUTION = RETIRE_PUBLIC_INTERFACE
PHYSICAL_EXECUTION = DEFERRED_TO_IMPLEMENTATION_UNIT
EXECUTION_GATE = POST_E5_PACKAGE
SUPABASE_CHANGE = NO
VENTO_VISO_CHANGE = NO_BY_SELECTED_BRANCH
```

La opción de implementar una suscripción real no queda rechazada permanentemente como capacidad futura. Queda fuera de esta resolución porque no existe actualmente un contrato aprobado que permita afirmar qué sistema será propietario de la suscripción, cómo se registrará el consentimiento, cuál será su ciclo de vida, cómo se gestionarán duplicados o bajas, ni qué tratamiento posterior estará autorizado.

Mientras esas condiciones no existan, la única salida compatible con la regla fail-closed vigente es retirar el control público que promete una suscripción inexistente.

---

#### 3. Evidencia actual verificada

La superficie pública vigente se encuentra en el componente compartido de footer de `Vento-Group` y contiene:

- un campo de tipo correo electrónico;
- una etiqueta accesible de correo;
- un botón `Suscribirse`;
- ausencia de `form` con envío;
- ausencia de handler de submit;
- ausencia de Server Action asociada;
- ausencia de llamada API asociada;
- ausencia de persistencia observable desde el componente.

La búsqueda remota vigente tampoco identifica en `vento-viso` una implementación de newsletter, suscripción o consentimiento que pueda reclamarse como backend aprobado de esta superficie.

En `vento-shell` no se encontró una tabla, endpoint o contrato de persistencia denominado como suscripción de newsletter que permita promover la interfaz actual a funcional sin introducir una decisión nueva.

Por tanto, la existencia visual del control no constituye una capacidad implementada.

---

#### 4. Hallazgo y riesgo cerrado documentalmente

El hallazgo propietario permanece:

```text
H-CODE-010-004
newsletter publica debe implementarse o retirarse
```

La condición observada es `interfaz sin contrato final`.

Los riesgos materiales son:

1. presentar al visitante una acción que no produce el efecto anunciado;
2. capturar o aparentar capturar un correo sin tratamiento definido;
3. generar falsa confirmación de suscripción;
4. perder contactos que el usuario cree haber registrado;
5. introducir posteriormente persistencia ad hoc sin contrato de consentimiento;
6. distribuir una interfaz engañosa en todas las páginas que reutilizan el footer;
7. confundir la presencia del SDK de Supabase con autorización para almacenar datos.

La resolución elimina la promesa pública hasta que exista una capacidad real gobernada.

---

#### 5. Alternativas evaluadas

| Alternativa | Estado | Motivo |
| --- | --- | --- |
| Implementar inmediatamente la newsletter sobre una tabla nueva | `RECHAZADA_EN_ESTA_TAREA` | no existe contrato aprobado de propiedad, consentimiento, lifecycle ni tratamiento; además implicaría materialización física y potencial cambio Supabase fuera del marcador documental |
| Conectar el control directamente a `vento-viso` | `RECHAZADA_EN_ESTA_TAREA` | no se encontró un contrato newsletter vigente en VISO y la presencia de CMS no concede propiedad por inferencia |
| Conectar un proveedor externo | `RECHAZADA_EN_ESTA_TAREA` | no existe proveedor, credencial, DPA, política de consentimiento ni integración aprobados para esta capacidad |
| Mantener el control sin efecto hasta una fase posterior | `RECHAZADA` | perpetúa exactamente el hallazgo y contradice la regla que prohíbe publicar una newsletter sin resultado real |
| Retirar la interfaz pública y conservar el resto del footer | `APROBADA` | elimina la promesa ficticia sin introducir datos, credenciales, backend, migraciones ni ownership nuevos |

---

#### 6. Resolución de producto para la superficie actual

La resolución aprobada es retirar únicamente la superficie de suscripción de newsletter actualmente expuesta.

La retirada comprende conceptualmente:

- el campo de correo dedicado a newsletter;
- su etiqueta asociada;
- el botón `Suscribirse`;
- el contenedor cuya única responsabilidad sea esa suscripción;
- estilos dedicados que queden sin consumidor después de la retirada;
- expectativas de accesibilidad, navegación por teclado o pruebas que sigan esperando esa superficie.

No se retiran ni modifican por esta decisión:

- enlaces de navegación del footer;
- enlaces sociales;
- contacto por correo existente;
- branding;
- sedes o categorías mostradas;
- CMS público;
- contenidos publicados;
- otros formularios que tengan un contrato funcional distinto.

---

#### 7. Contrato de materialización posterior

La topología canónica aplicable es:

```text
MODE = PER_IMPLEMENTATION_UNIT
EXECUTION_GATE = POST_E5_PACKAGE
```

Por tanto, esta tarea define el contrato una vez y la ejecución física posterior deberá:

1. derivar una unidad de implementación canónica;
2. identificar su paquete propietario;
3. demostrar `E5-GATE-008` en `PASS` para ese paquete antes de tocar código;
4. recibir la autorización física correspondiente;
5. ejecutar una sola materialización para la unidad;
6. conservar lineage hacia los paquetes consumidores cuando corresponda;
7. validar la ausencia de la superficie engañosa después del cambio;
8. conservar rollback del cambio físico hasta cerrar la evidencia.

La aprobación documental de `WEB-FRM-011` no equivale a autorización de implementación física.

---

#### 8. Alcance físico futuro exacto

Cuando exista una instancia física admisible, la resolución seleccionada limita el cambio a la superficie web pública que actualmente expone la newsletter ficticia.

El alcance esperado de esa futura unidad es:

- repositorio físico objetivo: `carlosibarraariza/Vento-Group`;
- retirar el bloque de suscripción del componente `src/components/site-footer.tsx`;
- retirar reglas CSS exclusivas de newsletter que queden sin uso en `src/app/globals.css`;
- actualizar pruebas, snapshots o evidencia de accesibilidad únicamente cuando dependan de la existencia del campo o botón retirados;
- verificar que las páginas públicas que reutilizan el footer ya no expongan input o botón de newsletter;
- preservar el resto del footer sin cambios funcionales no relacionados.

No se autoriza desde esta definición:

- crear una API de newsletter;
- crear Server Actions de newsletter;
- crear tablas o columnas;
- crear Edge Functions;
- crear triggers;
- crear RLS o grants nuevos;
- agregar proveedores externos;
- almacenar correos;
- importar contactos;
- enviar campañas;
- modificar VISO para asumir propiedad de la capacidad.

---

#### 9. Frontera de datos y privacidad

La rama seleccionada produce cero captura nueva de datos.

Mientras no exista una newsletter real aprobada:

```text
VISITANTE
→ NO ENTREGA CORREO A NEWSLETTER
→ NO EXISTE SUSCRIPCION
→ NO EXISTE CONSENTIMIENTO DE NEWSLETTER REGISTRADO
→ NO EXISTE TRATAMIENTO POSTERIOR DERIVADO DE ESTA SUPERFICIE
```

Ningún repositorio podrá interpretar la retirada como permiso para comenzar una lista de contactos por otra vía.

Una futura reintroducción deberá demostrar, antes de publicar el control:

- propietaria del dato;
- finalidad;
- base y texto de consentimiento aplicables;
- alta;
- duplicado;
- baja;
- error;
- auditoría;
- retención;
- acceso autorizado;
- integración de envío si llegara a existir;
- resultado verdadero comunicado al usuario.

---

#### 10. Supabase y VISO

La decisión no crea ni modifica Supabase.

```text
SUPABASE_MIGRATION = NONE
SUPABASE_TABLE_CHANGE = NONE
SUPABASE_RLS_CHANGE = NONE
SUPABASE_FUNCTION_CHANGE = NONE
SUPABASE_EDGE_FUNCTION_CHANGE = NONE
```

La existencia de `@supabase/supabase-js` en el proyecto público no constituye un contrato de newsletter.

Tampoco se modifica `vento-viso`. La ausencia de implementación newsletter en VISO impide asignarle esa propiedad por inferencia, y la rama de retirada no necesita un backend editorial para cerrarse.

---

#### 11. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la obligación verificable para esta brecha ya existe y cubre explícitamente ambas salidas admitidas: suscripción real con consentimiento y resultado verdadero, o ausencia de publicación de la interfaz. Esta tarea selecciona la segunda salida sin alterar la regla protegida.

---

#### 12. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar:

- `TREQ-INTEGRATION-002`, que exige que toda interfaz pública de newsletter registre suscripción y consentimiento reales mediante contrato aprobado y comunique un resultado verdadero; cuando esa condición no pueda satisfacerse, la interfaz no debe publicarse.

El requisito conserva su identidad, dominio, origen, riesgo y ciclo de vida vigentes. Esta tarea no actualiza el registro 04A.

---

#### 13. Matriz de aceptación de la futura unidad física

| Caso | Precondición | Resultado requerido |
| --- | --- | --- |
| footer público | unidad física autorizada | no existe campo de correo destinado a newsletter |
| footer público | unidad física autorizada | no existe botón `Suscribirse` de la newsletter retirada |
| páginas consumidoras del footer | build de la unidad | no renderizan la superficie retirada |
| navegación por teclado | superficie retirada | no aparece foco sobre controles inexistentes de newsletter |
| accesibilidad | superficie retirada | no se conserva una etiqueta huérfana ni control inaccesible asociado a newsletter |
| CSS | superficie retirada | no quedan reglas exclusivas sin consumidor cuando su eliminación sea segura |
| regresión de footer | superficie retirada | navegación, contacto, enlaces sociales y branding continúan disponibles |
| datos | superficie retirada | no se envía ni persiste correo por esta capacidad |
| Supabase | superficie retirada | cero cambios derivados de esta decisión |
| VISO | superficie retirada | cero cambios derivados de esta decisión |

La salida física satisface el contrato cuando la newsletter ficticia deja de existir públicamente y el resto del footer conserva su comportamiento esperado.

---

#### 14. Rollback y comportamiento fail-closed

La materialización futura deberá conservar rollback simple del cambio de UI hasta completar su verificación.

Si la retirada rompe el footer o elimina contenido ajeno a la newsletter:

```text
VALIDACION FAIL
→ NO CERRAR UNIDAD
→ REVERTIR SOLO EL CAMBIO DE LA UNIDAD
→ CONSERVAR EVIDENCIA
→ CORREGIR SIN INTRODUCIR BACKEND IMPROVISADO
```

Si durante la materialización aparece un backend newsletter previamente no identificado, la unidad no deberá conectarlo automáticamente. Ese hallazgo exige reconciliar propiedad, consentimiento, lifecycle y contrato antes de cambiar la resolución.

La ausencia de backend continúa siendo fail-closed: nunca se sustituye la retirada por una confirmación ficticia.

---

#### 15. Dependencias y gates

La definición documental consume:

- el hallazgo `H-CODE-010-004`;
- la brecha de backlog `BKL-WEB-001`;
- el estado real del componente público de footer;
- la ausencia verificable de un contrato newsletter en las superficies consultadas;
- la topología `PER_IMPLEMENTATION_UNIT`;
- el gate `POST_E5_PACKAGE`.

La materialización posterior permanece condicionada por:

1. asignación de unidad de implementación;
2. paquete propietario aplicable;
3. `E5-GATE-008` del paquete en `PASS`;
4. autorización física explícita;
5. disponibilidad del repositorio físico objetivo;
6. batería técnica del paquete y del repositorio consumidor.

Ninguna de estas dependencias se satisface por el simple cierre documental de esta tarea.

---

#### 16. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea documental no ejecuta build del repositorio físico consumidor. |
| LOCAL | NOT_EXECUTED | No se ejecutó modificación en checkout local ni se materializó la retirada. |
| REMOTA | PASS | Se contrastaron remotamente el marcador canónico, el hallazgo propietario, la topología, el requisito vigente, el backlog y la superficie pública actual; no se identificó contrato operativo newsletter que permita afirmar una suscripción real. |
| OPERATIVA | NOT_EXECUTED | No se probó una newsletter real porque la resolución seleccionada es retirar la interfaz y su materialización permanece diferida. |
| FÍSICA | NOT_APPLICABLE | El marcador documental define el contrato; la ejecución física corresponde a una futura unidad autorizada después de `POST_E5_PACKAGE`. |

---

#### 17. Criterios de aceptación

`WEB-FRM-011` queda documentalmente cerrada cuando se cumplan simultáneamente estas condiciones:

1. el hallazgo de newsletter queda asociado a una resolución inequívoca;
2. la resolución es `RETIRE_PUBLIC_INTERFACE`;
3. no se inventa un backend, proveedor, tabla, endpoint o propietaria;
4. se conserva la separación entre decisión documental y ejecución física;
5. la topología permanece `PER_IMPLEMENTATION_UNIT`;
6. el gate permanece `POST_E5_PACKAGE`;
7. la futura unidad física tiene alcance acotado al control ficticio y sus residuos técnicos directos;
8. no se autoriza Supabase;
9. no se autoriza modificación de VISO;
10. la obligación de prueba existente se reutiliza sin modificación;
11. no se crean requisitos de prueba nuevos;
12. la continuidad documental avanza hacia `AURA-DOM-001` sin reabrir tareas históricas ya aprobadas.

---

#### 18. Límites

Esta tarea no:

- implementa código;
- elimina todavía el control público;
- crea una instancia física;
- asigna un `implementation_unit_id`;
- selecciona un package por inferencia;
- ejecuta E5;
- modifica Supabase;
- modifica VISO;
- crea listas de contactos;
- define campañas;
- selecciona plataforma de email marketing;
- define double opt-in;
- autoriza tratamiento futuro de correos;
- reabre `CODE-AUD-010`;
- reabre `CODE-AUD-011`;
- modifica el requisito de integración vigente;
- declara cerrada evidencia E2E que aún no fue ejecutada físicamente.

Una futura decisión de reintroducir newsletter deberá usar un contrato nuevo o vigente que demuestre todas las obligaciones de datos, consentimiento, operación, seguridad y prueba aplicables antes de publicar nuevamente una interfaz de suscripción.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión`

**TAREA ACTUAL APROBADA**
`WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz`

**SIGUIENTE TAREA RESERVADA**
`AURA-DOM-001 — Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia`
