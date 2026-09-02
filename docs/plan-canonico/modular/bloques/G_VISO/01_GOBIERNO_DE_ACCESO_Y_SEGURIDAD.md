### MINI-BLOQUE — GOBIERNO DE ACCESO Y SEGURIDAD

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **gobierno de acceso y seguridad** dentro de **G VISO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `VISO-AUTH-001` a `VISO-AUTH-020` — 20 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Crear catálogo administrativo de roles base” y concluye con “Crear exporte de matriz de acceso”.
<!-- PLAN-SECTION-META:END -->

### ✅ VISO-AUTH-001 — Crear catálogo administrativo de roles base

**Estado:** APROBADA
**Tarea anterior:** ANIMA-UX-017 — Diseñar ciclo completo de novedades internas: audiencia, publicación, edición, archivo, notificación y visibilidad
**Tarea siguiente:** VISO-AUTH-002 — Crear catálogo administrativo de roles operativos
**Tipo de tarea:** documental; definición del catálogo administrativo canónico de roles base que VISO deberá presentar y consumir sin crear una segunda fuente de verdad ni conceder autoridad por el nombre del rol
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a la topología `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el catálogo administrativo de roles base que VISO deberá utilizar para representar responsabilidades laborales permanentes sin mezclar identidad, rol operativo, sede, área, turno, permisos ni autoridad efectiva.

El catálogo administrativo no crea un universo nuevo. Su función es proyectar de forma comprensible y administrable el catálogo canónico versionado ya aprobado para autorización, manteniendo una correspondencia exacta con la fuente compartida y evitando que VISO, una pantalla o un repositorio consumidor introduzcan roles locales, aliases o interpretaciones incompatibles.

La regla raíz queda:

```text
CATÁLOGO BASE VERSIONADO
+
OCHO CÓDIGOS CANÓNICOS
+
SEMÁNTICA FUNCIONAL APROBADA
+
SEPARACIÓN ENTRE ROL Y PERMISO
+
SEPARACIÓN ENTRE BASE Y OPERACIÓN
→
CATÁLOGO ADMINISTRATIVO VISO
```

Y nunca:

```text
NOMBRE DEL ROL
→
AUTORIZACIÓN
```

---

#### 2. Base normativa y fuentes de autoridad

Esta tarea consume y conserva las decisiones aprobadas de identidad, autorización, contexto y matrices sin redefinirlas.

Fuentes vinculantes:

- `ADR-AUTH-001`;
- `AUTH-MOD-001` — identidad laboral y actor efectivo;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-003` — roles administrativos globales;
- `AUTH-MOD-004` — roles administrativos por sede;
- `AUTH-MOD-005` — catálogo operativo separado;
- `AUTH-MOD-006` — casos híbridos sin crear roles híbridos;
- `AUTH-MOD-021` — rol base mínimo no privilegiado `trabajador_operativo`;
- `PROC-ACTOR-001` — aplicabilidad de los ocho roles base sobre los procesos canónicos;
- `SHELL-CON-004` — contrato compartido versionado de roles base y grants base;
- el catálogo versionado `packages/contracts/authorization/catalog/base-roles/versions/1.1.0/base-roles.json`.

La autoridad para la identidad de un rol base es el código canónico versionado. VISO no será una fuente paralela capaz de crear una identidad de rol que el contrato compartido no reconozca.

La relación conceptual continúa siendo:

```text
empleado activo
→ exactamente un rol base vigente
→ permisos base explícitos
→ cobertura administrativa aplicable
→ evaluación de autorización
```

El rol base no es una identidad separada del empleado y no constituye por sí solo una decisión de autorización.

---

#### 3. Resultado canónico

VISO deberá exponer un catálogo administrativo con exactamente las ocho identidades vigentes de `BaseRoleCode@1.1.0`:

1. `propietario`;
2. `gerente_general`;
3. `gerente`;
4. `supervisor`;
5. `auxiliar_administrativa`;
6. `contador`;
7. `marketing`;
8. `trabajador_operativo`.

La cardinalidad contractual es:

```text
roles base canónicos = 8
duplicados = 0
roles operativos dentro del catálogo base = 0
oficios legacy dentro del catálogo base = 0
aliases locales = 0
fallbacks por nombre = 0
```

La proyección administrativa deberá conservar el mismo conjunto de códigos que la fuente compartida. Una lista local divergente, una copia manual no versionada o un valor admitido únicamente por una interfaz no serán equivalentes al catálogo canónico.

---

#### 4. Catálogo administrativo materializado documentalmente

| Rol base | Naturaleza funcional permanente | Procesos canónicos vinculados | Interpretación administrativa obligatoria |
| --- | --- | ---: | --- |
| `propietario` | Gobierno organizacional global | 69 | Puede ser elegible para capacidades reservadas y de gobierno solo mediante permisos explícitos; nunca equivale a wildcard ni a bypass universal. |
| `gerente_general` | Dirección ejecutiva global | 69 | Puede recibir capacidades globales explícitas, pero no hereda automáticamente capacidades reservadas del propietario. |
| `gerente` | Administración integral de sedes asignadas | 68 | Su autoridad administrativa natural permanece limitada por sedes asignadas, recurso, finalidad y permiso exacto; no es administrador global por nombre. |
| `supervisor` | Supervisión administrativa local | 60 | Su participación se limita a supervisión y administración local autorizada sobre sedes asignadas; no adquiere gobierno organizacional. |
| `auxiliar_administrativa` | Apoyo administrativo funcional | 54 | Puede recibir capacidades permanentes de captura, coordinación o consulta limitada; no implica aprobación, gobierno ni acceso global. |
| `contador` | Función financiera permanente | 32 | Su aplicabilidad se limita a hechos, conciliación, análisis y documentación financiera autorizados; el nombre del rol no concede aprobación ni alcance territorial general. |
| `marketing` | Marketing, contenido y análisis comercial limitado | 22 | Su aplicabilidad se limita a contenido, campañas, canales, oportunidades y análisis autorizados; no concede control sobre operaciones, pagos, inventario o identidad completa. |
| `trabajador_operativo` | Rol base mínimo no privilegiado | 13 | Conserva autoservicio personal esencial y cero autoridad operativa derivada del rol base; la operación exige contexto operativo independiente. |

La distribución suma **387 vínculos proceso–rol aplicables** sobre **552 pares posibles** entre 69 procesos y 8 roles base.

La aplicabilidad de un rol a un proceso significa únicamente que puede existir una capacidad permanente explícita relacionada con ese proceso. No significa que el rol posea el permiso, que pueda aprobar la acción o que quede autorizado en cualquier contexto.

---

#### 5. Semántica de cobertura administrativa heredada

El catálogo deberá preservar, como contexto explicativo y no como concesión, la clasificación administrativa vigente que ya existe para los roles cuya cobertura predeterminada está definida:

| Rol base | Cobertura administrativa predeterminada | Regla |
| --- | --- | --- |
| `propietario` | `ORGANIZATION` | La cobertura organizacional delimita territorio administrativo posible; no concede todos los permisos. |
| `gerente_general` | `ORGANIZATION` | La cobertura organizacional no incorpora capacidades reservadas del propietario. |
| `gerente` | `ASSIGNED_SITES` | Solo participan sedes asignadas y utilizables; varias sedes no equivalen a organización completa. |
| `supervisor` | `ASSIGNED_SITES` | Solo participan sedes asignadas y utilizables dentro del permiso exacto. |
| `auxiliar_administrativa` | `ASSIGNED_SITES` | La cobertura territorial no convierte el rol en aprobador ni administrador global. |
| `contador` | `NONE` | Los permisos explícitos no territoriales o globales permitidos se resuelven por grant, no por el nombre del rol. |
| `marketing` | `NONE` | Los permisos explícitos no territoriales o globales permitidos se resuelven por grant, no por el nombre del rol. |

Para `trabajador_operativo`, esta tarea no inventa una cobertura administrativa general por nombre de rol. Se conserva la decisión de `AUTH-MOD-021`: es un rol base mínimo no privilegiado, con su matriz base exacta gobernada por el contrato compartido y administrada posteriormente por `VISO-AUTH-003`; no se proyecta como rol operativo ni adquiere territorio operativo por pertenecer al catálogo.

La cobertura administrativa es un insumo de contexto. Nunca es un `ALLOW`.

---

#### 6. Información mínima de cada entrada del catálogo

Cada entrada administrativa deberá permitir distinguir, como mínimo:

- código canónico estable del rol;
- naturaleza funcional permanente;
- pertenencia a la versión canónica vigente;
- cantidad de procesos canónicos en los que el rol resulta aplicable;
- clasificación de cobertura administrativa cuando esté definida por el contrato vigente;
- frontera explícita de lo que el rol no autoriza por sí mismo;
- separación respecto de roles operativos;
- referencia a que la matriz de permisos se administra fuera de esta tarea.

La representación visible puede utilizar texto humano explicativo, pero el código canónico no podrá derivarse de una etiqueta traducida, nombre informal, cargo observado o texto editable.

La identidad administrativa deberá seguir:

```text
role_code canónico
→ identidad estable

descripción visible
→ explicación

nombre informal
→ no identidad
```

---

#### 7. Gobierno de identidad y versionado

El catálogo administrativo de VISO no podrá ampliar silenciosamente el universo canónico.

Reglas obligatorias:

1. `role_code` es la identidad estable de la entrada;
2. VISO no podrá reconocer como válido un código ausente del contrato compartido vigente;
3. una etiqueta visible no podrá sustituir el código;
4. una renombrada visual no podrá cambiar la identidad contractual;
5. un nuevo código de rol base requerirá primero una versión canónica aprobada del contrato compartido;
6. un retiro o sustitución deberá respetar el gobierno de compatibilidad y transición aplicable;
7. VISO no podrá mantener un rol retirado como identidad autorizable mediante fallback local;
8. una versión desconocida o incompatible deberá impedir que la proyección administrativa se presente como canónicamente vigente;
9. el orden visual no establecerá jerarquía ni precedencia de autorización;
10. ningún rol podrá adquirir permisos por el solo hecho de aparecer en el catálogo.

La versión vigente consumida por esta tarea es `1.1.0`.

---

#### 8. Exclusiones obligatorias

No forman parte del catálogo administrativo de roles base:

- roles operativos como `cajero_satelite`, `barista_satelite`, `cocinero_satelite`, `servicio_salon`, `mostrador_satelite`, `operador_integral_satelite`, `produccion_cocina`, `produccion_panaderia`, `produccion_reposteria`, `bodeguero`, `conductor_logistica` y `gerencia_operativa`;
- oficios legacy como `cajero`, `cocinero`, `mesero`, `barista`, `panadero`, `pastelero`, `repostero` o `conductor`;
- códigos documentales obsoletos tratados anteriormente como base, incluidos `logistica` y `talento_humano`;
- `propietario_admin`;
- usuarios técnicos de dispositivo;
- `service_role`;
- aplicaciones;
- sedes;
- áreas;
- tipos de sede o de área;
- perfiles operativos;
- turnos;
- permisos;
- grupos de navegación.

Una coincidencia de nombre no convierte ninguna de esas identidades en rol base.

---

#### 9. Separación de responsabilidades dentro de VISO

`VISO-AUTH-001` fija únicamente el catálogo administrativo de identidades base y su semántica mínima de presentación.

| Tarea | Responsabilidad reservada |
| --- | --- |
| `VISO-AUTH-002` | Catálogo administrativo de roles operativos. |
| `VISO-AUTH-003` | Permisos y matriz por rol base. |
| `VISO-AUTH-004` | Permisos y matriz por rol operativo. |
| `VISO-AUTH-005` | Roles permitidos por sede. |
| `VISO-AUTH-006` | Roles permitidos por área. |
| `VISO-AUTH-007` | Perfiles operativos por trabajador. |
| `VISO-AUTH-008` | Sedes asignadas al trabajador. |
| `VISO-AUTH-009` | Áreas asignadas al trabajador. |
| `VISO-AUTH-010` | Rol operativo efectivo del turno. |
| `VISO-AUTH-011` | Validación de turnos sin rol operativo. |
| `VISO-AUTH-012` | Validación de incompatibilidad de área. |
| `VISO-AUTH-013` | Vista previa trabajador × sede × área × turno. |
| `VISO-AUTH-014` | Simulación de permisos efectivos. |
| `VISO-AUTH-015` | Origen de cada permiso. |
| `VISO-AUTH-016` | Conflictos de configuración. |
| `VISO-AUTH-017` | Excepciones individuales. |
| `VISO-AUTH-018` | Auditoría de cambios de seguridad. |
| `VISO-AUTH-019` | Restricción de quién administra seguridad. |
| `VISO-AUTH-020` | Exporte de matriz de acceso. |

Por tanto, esta tarea no administra grants, asignaciones, perfiles, turnos, excepciones ni decisiones efectivas de autorización.

---

#### 10. Reglas de consistencia y fallo cerrado

La proyección administrativa deberá considerarse inconsistente cuando ocurra cualquiera de estos casos:

| Caso | Resultado documental exigido |
| --- | --- |
| Falta uno de los ocho códigos vigentes | catálogo no conforme; no declarar paridad canónica |
| Aparece un noveno código no aprobado | catálogo no conforme; no incorporarlo por compatibilidad local |
| Existe un código duplicado | catálogo no conforme |
| Un rol operativo aparece como rol base | catálogo no conforme |
| Un oficio legacy aparece como rol base | catálogo no conforme |
| La descripción visible contradice la naturaleza aprobada | catálogo no conforme |
| La cobertura visible amplía la cobertura canónica | catálogo no conforme |
| La interfaz interpreta la posición del rol como jerarquía | interpretación inválida |
| El catálogo asigna permisos implícitos | responsabilidad invadida; corresponde a la matriz explícita |
| La fuente canónica no puede resolverse | no presentar una lista local como sustituto autoritativo |

No existirá fallback hacia una lista embebida, hacia `employees.role` sin reconciliación contractual o hacia un conjunto observado en una sola aplicación para declarar que el catálogo está vigente.

---

#### 11. Handoff contractual

El resultado de esta tarea entrega a `VISO-AUTH-002` y `VISO-AUTH-003` un universo base cerrado y no ambiguo:

```text
8 roles base canónicos
+
códigos estables
+
naturaleza funcional
+
aplicabilidad de procesos
+
cobertura administrativa conocida
+
fronteras de autoridad
```

`VISO-AUTH-002` deberá construir el catálogo operativo como universo separado.

`VISO-AUTH-003` deberá consumir exactamente estas ocho identidades para administrar la matriz base, preservando el contrato de grants vigente y sin transformar la pertenencia al catálogo en una concesión.

Las tareas posteriores podrán mostrar asignaciones, simulaciones, conflictos y auditoría, pero ninguna podrá redefinir silenciosamente qué códigos pertenecen al catálogo base.

---

#### 12. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa en VISO decisiones de catálogo, separación de carriles, identidad de rol y límites de autoridad que ya están protegidas por el registro vigente. No introduce una nueva identidad de rol, modalidad de autorización, regla territorial, concesión, transición física ni comportamiento operativo que requiera ampliar el registro.

---

#### 13. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar, la cobertura vigente:

- `TREQ-SHELL-040` protege el conjunto exacto de ocho `BaseRoleCode`, la incorporación de `trabajador_operativo`, la exclusión de aliases y oficios legacy y la integridad del contrato compartido;
- `TREQ-AUTH-001` protege que una lista local o nombre de rol no conceda autorización final;
- `TREQ-AUTH-008` protege la separación entre capacidades base permanentes y capacidades operativas dependientes de turno, check-in y contexto;
- `TREQ-VISO-001` protege la coherencia posterior entre administración de seguridad, efecto visible, conflictos, alcance, origen y resultado consumido por las aplicaciones.

Esta trazabilidad no cambia estado, contenido, paquete, evidencia ni secuencia de esos requisitos.

---

#### 14. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | Esta definición documental no ejecutó build del repositorio; la batería del checkout propietario permanece separada de la decisión canónica. |
| LOCAL | NOT_EXECUTED | No se registró una ejecución local del artefacto dentro de esta definición documental. |
| REMOTA | PASS | La rama canónica vigente de `vento-shell` fue contrastada en solo lectura: continuidad actual, archivo propietario, topología, políticas documentales, catálogo `BaseRoleCode@1.1.0`, contrato generador, modelo AUTH y matriz `PROC-ACTOR-001` resultaron coherentes con las decisiones materializadas aquí. |
| OPERATIVA | NOT_APPLICABLE | La tarea no cambia procesos operativos, turnos, permisos efectivos ni acciones de trabajadores y no requiere observación operacional para cerrar su definición documental. |
| FÍSICA | NOT_EXECUTED | No se materializaron UI, Server Actions, contratos distribuidos, migraciones, datos ni cambios Supabase; la ejecución física permanece detrás de `POST_E5_PACKAGE`. |

---

#### 15. Criterios de aceptación

- [ ] El catálogo contiene exactamente los ocho códigos de rol base vigentes.
- [ ] `trabajador_operativo` aparece como rol base mínimo no privilegiado.
- [ ] `logistica`, `talento_humano`, oficios legacy, roles operativos y `propietario_admin` no aparecen como roles base canónicos.
- [ ] Cada rol conserva la naturaleza funcional aprobada y su cantidad vigente de procesos aplicables.
- [ ] La suma de vínculos aplicables permanece en 387 sobre 552 pares posibles.
- [ ] La cobertura administrativa conocida se presenta como contexto y nunca como permiso.
- [ ] `propietario` y `gerente_general` no se convierten en wildcard.
- [ ] `gerente`, `supervisor` y `auxiliar_administrativa` no amplían `ASSIGNED_SITES` a cobertura organizacional.
- [ ] `contador` y `marketing` no reciben cobertura territorial general por el nombre del rol.
- [ ] `trabajador_operativo` no adquiere autoridad operativa por pertenecer al catálogo base.
- [ ] Ninguna entrada del catálogo concede permisos implícitos.
- [ ] El código canónico, y no una etiqueta visible, identifica la entrada.
- [ ] VISO no crea una segunda lista autoritativa independiente del contrato compartido versionado.
- [ ] La tarea no invade las responsabilidades reservadas a `VISO-AUTH-002` a `VISO-AUTH-020`.
- [ ] Los cambios físicos permanecen fuera del cierre documental y detrás de la topología y gate vigentes.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 16. Límites

Esta tarea no:

- crea ni modifica código de VISO;
- crea rutas, pantallas, componentes o Server Actions;
- declara un archivo físico de VISO como implementation unit;
- modifica el paquete compartido de contratos;
- modifica `base-roles.json`;
- modifica datasets de grants;
- modifica `public.roles`, `employees.role` ni otra relación Supabase;
- crea migraciones;
- crea RLS, RPC, triggers o grants;
- asigna roles a empleados;
- crea o administra roles operativos;
- administra permisos por rol base;
- administra permisos por rol operativo;
- define disponibilidad de roles por sede o área;
- administra perfiles, turnos o asignaciones territoriales;
- crea excepciones individuales;
- ejecuta simulaciones;
- modifica precedencia, denegaciones o autorización efectiva;
- crea aliases para compatibilidad legacy;
- retira físicamente roles legacy;
- selecciona package ni autoriza implementación.

La existencia AS-IS de superficies administrativas no las convierte automáticamente en el destino físico de esta tarea. La identidad de la unidad de implementación y los archivos exactos se resolverán únicamente dentro del package y gate físico correspondiente.

---

#### 17. Continuidad

**ÚLTIMA TAREA APROBADA**
`ANIMA-UX-017 — Diseñar ciclo completo de novedades internas: audiencia, publicación, edición, archivo, notificación y visibilidad`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-001 — Crear catálogo administrativo de roles base`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-002 — Crear catálogo administrativo de roles operativos`


### ✅ VISO-AUTH-002 — Crear catálogo administrativo de roles operativos

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-001 — Crear catálogo administrativo de roles base
**Tarea siguiente:** VISO-AUTH-003 — Administrar permisos por rol base
**Tipo de tarea:** documental; definición del catálogo administrativo canónico de roles operativos que VISO deberá presentar y consumir como universo temporal separado de roles base, permisos, sedes, áreas, perfiles y turnos efectivos
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a la topología `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el catálogo administrativo de roles operativos que VISO deberá utilizar para representar las funciones temporales que un empleado puede ejecutar durante un turno, sin convertir el catálogo en fuente de identidad laboral, permiso, asignación territorial o rol efectivo.

El catálogo administrativo no crea un universo nuevo. Su función es proyectar de forma comprensible y administrable el catálogo operativo canónico versionado, conservando una correspondencia exacta con la fuente compartida y evitando que VISO, una sede, una aplicación, una pantalla o un perfil creen códigos operativos locales.

La regla raíz queda:

```text
CATÁLOGO OPERATIVO VERSIONADO
+
DOCE CÓDIGOS CANÓNICOS
+
SEMÁNTICA FUNCIONAL APROBADA
+
SEPARACIÓN ENTRE CATÁLOGO Y TURNO EFECTIVO
+
SEPARACIÓN ENTRE ROL Y PERMISO
→
CATÁLOGO ADMINISTRATIVO VISO
```

Y nunca:

```text
APARECER EN EL CATÁLOGO
→
ROL OPERATIVO EFECTIVO
```

ni:

```text
NOMBRE DEL ROL
→
AUTORIZACIÓN
```

---

#### 2. Base normativa y fuentes de autoridad

Esta tarea consume y conserva las decisiones aprobadas de identidad, autorización, contexto, matrices y procesos sin redefinirlas.

Fuentes vinculantes:

- `ADR-AUTH-001`;
- `AUTH-MOD-001` — identidad laboral y actor efectivo;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-005` — catálogo operativo canónico;
- `AUTH-MOD-006` — casos híbridos sin crear roles híbridos;
- `AUTH-MOD-009` y `AUTH-MOD-010` — turno, check-in y rol operativo efectivo;
- `PROC-ACTOR-002` — aplicabilidad de los doce roles operativos sobre los procesos canónicos;
- `SHELL-CON-005` — contrato compartido versionado de roles operativos y grants operativos;
- el catálogo versionado `packages/contracts/authorization/catalog/operational-roles/versions/1.0.0/operational-roles.json`.

La autoridad para la identidad de un rol operativo es el código canónico versionado. VISO no será una fuente paralela capaz de crear una identidad operativa que el contrato compartido no reconozca.

La relación conceptual continúa siendo:

```text
empleado activo
→ turno publicado y válido
→ rol operativo asignado
→ rol activo
→ sede habilitada
→ área compatible
→ check-in cuando la política lo exige
→ rol operativo efectivo
→ permisos operativos explícitos
→ evaluación de autorización
```

El catálogo contiene identidades posibles. No demuestra que una de ellas sea efectiva para un actor en este instante.

---

#### 3. Resultado canónico

VISO deberá exponer un catálogo administrativo con exactamente las doce identidades vigentes de `OperationalRoleCode@1.0.0`:

1. `cajero_satelite`;
2. `barista_satelite`;
3. `cocinero_satelite`;
4. `servicio_salon`;
5. `mostrador_satelite`;
6. `operador_integral_satelite`;
7. `produccion_cocina`;
8. `produccion_panaderia`;
9. `produccion_reposteria`;
10. `bodeguero`;
11. `conductor_logistica`;
12. `gerencia_operativa`.

La cardinalidad contractual es:

```text
roles operativos canónicos = 12
familias funcionales = 4
duplicados = 0
roles base dentro del catálogo operativo = 0
oficios legacy dentro del catálogo operativo = 0
propietario_admin = 0
aliases locales = 0
fallbacks entre catálogos = 0
```

La proyección administrativa deberá conservar el mismo conjunto y orden contractual de códigos que la fuente compartida. Una lista local divergente, una copia manual no versionada o un valor aceptado únicamente por una interfaz no serán equivalentes al catálogo canónico.

---

#### 4. Catálogo administrativo materializado documentalmente

| Rol operativo | Familia | Función principal | Área normalmente requerida | Procesos aplicables |
| --- | --- | --- | --- | ---: |
| `cajero_satelite` | Operación satélite | Caja, cobro y operación POS en sede y área habilitadas. | Sí | 39 |
| `barista_satelite` | Operación satélite | Preparación y control de bebidas y barra. | Sí | 38 |
| `cocinero_satelite` | Operación satélite | Preparación y producción de cocina en punto de venta. | Sí | 38 |
| `servicio_salon` | Operación satélite | Atención, servicio, entrega y seguimiento de salón y mesa. | Sí | 33 |
| `mostrador_satelite` | Operación satélite | Atención, alistamiento, entrega y operación de mostrador. | Sí | 40 |
| `operador_integral_satelite` | Operación satélite | Ejecución integrada únicamente en sedes que habiliten esa variante. | Depende de la sede | 45 |
| `produccion_cocina` | Producción | Cocina caliente central dentro del área asignada. | Sí | 33 |
| `produccion_panaderia` | Producción | Panadería y galletería dentro del área asignada. | Sí | 33 |
| `produccion_reposteria` | Producción | Repostería y pastelería dentro del área asignada. | Sí | 33 |
| `bodeguero` | Logística | Bodega, inventario, custodia y preparación logística. | Sí | 36 |
| `conductor_logistica` | Logística | Transporte y custodia durante rutas y entregas asignadas. | Puede usar área general | 25 |
| `gerencia_operativa` | Coordinación | Coordinación directa de la operación durante el turno. | Depende de la sede | 51 |

La distribución suma **444 vínculos proceso–rol aplicables**.

La familia funcional organiza la presentación del catálogo, pero no crea herencia de permisos entre roles de la misma familia.

---

#### 5. Aplicabilidad sobre procesos canónicos

`PROC-ACTOR-002` evalúa los doce roles operativos contra los 69 procesos canónicos.

Resultado vigente:

```text
procesos evaluados = 69
roles operativos = 12
pares proceso-rol posibles = 828
vínculos aplicables = 444
procesos con al menos un rol operativo aplicable = 51
procesos sin rol operativo directo = 18
roles desconocidos, legacy o base usados como operativos = 0
```

La aplicabilidad de un rol a un proceso significa únicamente que ese rol puede participar operativamente en alguna variante o tramo del proceso bajo contexto válido.

No significa:

- que posea todos los permisos del proceso;
- que pueda ejecutar cualquier transición;
- que pueda aprobar o cerrar el proceso;
- que pueda actuar en cualquier sede o área;
- que pueda acceder a cualquier recurso del proceso;
- que el proceso deba ejecutarse durante un turno;
- que un rol base pueda sustituirse por el rol operativo;
- que un proceso marcado `NO_APLICA` pueda habilitarse por tener turno.

Por tanto:

```text
ROL OPERATIVO APLICABLE
≠
PERMISO CONCEDIDO
≠
ROL EFECTIVO
≠
AUTORIZACIÓN FINAL
```

Los 18 procesos sin rol operativo directo permanecen deliberadamente fuera de la autoridad derivada del turno.

---

#### 6. Rol catalogado, asignado y efectivo

VISO deberá mantener separados tres estados conceptuales:

| Concepto | Significado | Concede autoridad por sí mismo |
| --- | --- | ---: |
| Rol catalogado | Código operativo existente dentro del universo canónico. | No |
| Rol asignado | Rol programado en un turno concreto. | No |
| Rol operativo efectivo | Rol asignado cuyo turno, sede, área, actividad y precondiciones operativas son válidos en el contexto evaluado. | No; habilita únicamente el carril operativo para evaluar permisos explícitos |

La resolución efectiva conserva:

```text
rol asignado
+
turno válido
+
sede válida
+
área válida
+
política de check-in aplicable
=
rol operativo efectivo posible
```

Incluso con rol operativo efectivo:

```text
ROL EFECTIVO
+
PERMISO OPERATIVO EXPLÍCITO
+
ALCANCE COMPATIBLE
+
RECURSO COMPATIBLE
+
SIN DENEGACIÓN PREVALENTE
=
AUTORIZACIÓN OPERATIVA POSIBLE
```

Un perfil operativo predeterminado solo puede proponer un valor al planificar un turno. No constituye evidencia de rol efectivo.

Un dispositivo compartido no asigna roles operativos y su `navigation_role` no puede sustituir el contexto real del actor.

---

#### 7. Reglas funcionales obligatorias por familia

##### 7.1 Operación satélite

Los seis roles de operación satélite representan funciones concretas del punto de venta.

`cajero_satelite` no concede configuración general de PULSO ni administración comercial.

`barista_satelite` y `cocinero_satelite` conservan especialidades distintas aunque una sede pueda compartir físicamente un área.

`servicio_salon` no se convierte en caja por participar en cobro, entrega o cierre de una mesa.

`mostrador_satelite` no equivale automáticamente a `cajero_satelite`.

`operador_integral_satelite` representa una variante operativa aprobada para formatos pequeños o integrados. No es la unión automática de los demás cinco roles y no funciona como superusuario.

##### 7.2 Producción

`produccion_cocina`, `produccion_panaderia` y `produccion_reposteria` son identidades operativas distintas.

Compartir procesos productivos no permite intercambiar las tres identidades ni ampliar automáticamente un área de producción hacia otra.

La participación productiva no concede ajuste global de inventario, administración de catálogos o liberación de decisiones reservadas si el permiso exacto no lo permite.

##### 7.3 Logística

`bodeguero` permanece como rol operativo. No forma parte del catálogo base.

Su ámbito natural es bodega, inventario, custodia y preparación logística, sin adquirir producción por la sola manipulación de materiales.

`conductor_logistica` representa transporte y custodia en tránsito. No adquiere facultades productivas, de inventario global, recepción general ni cierre administrativo por el nombre del rol.

##### 7.4 Coordinación

`gerencia_operativa` representa coordinación directa durante un turno.

No es:

- rol base;
- administrador global;
- sustituto de `gerente` o `gerente_general`;
- bypass;
- wildcard;
- permiso para actuar fuera de la sede, área, recurso o proceso autorizado.

Un actor puede combinar un rol base administrativo con `gerencia_operativa`, pero ambos carriles permanecen independientes.

---

#### 8. Integridad con el contrato de grants operativos

El catálogo administrativo de VISO deberá permanecer compatible con el contrato operativo compartido vigente sin administrar todavía su matriz.

La versión `vento.authorization.operational-role-grants@1.0.0` conserva:

```text
registros = 240
pares rol-permiso únicos = 240
DIRECT_OPERATIONAL = 218
OPERATIONAL_COMPONENT = 22
BASE_OR_OPERATIONAL = 174
OPERATIONAL_ONLY = 44
BASE_AND_OPERATIONAL = 22
BASE_ONLY = 0
```

La huella contractual vigente es:

```text
sha256:3e28cb780c346fbc5cf583fe9cf20d1a88333c4fd459fc233380d9e627c6f94f
```

Estos valores funcionan como frontera de integridad entre el catálogo y la futura administración de permisos operativos.

`VISO-AUTH-002` no modifica, agrega, elimina ni reinterpreta ninguno de esos grants.

La administración de la matriz operativa pertenece a `VISO-AUTH-004`.

---

#### 9. Gobierno de identidad y versionado

Reglas obligatorias:

1. `operational_role_code` es la identidad estable de la entrada;
2. la versión vigente consumida por esta tarea es `1.0.0`;
3. VISO no podrá reconocer como canónico un código ausente del contrato compartido vigente;
4. una etiqueta visible no podrá sustituir el código;
5. una renombrada visual no podrá cambiar la identidad contractual;
6. un nuevo código exigirá primero una versión canónica aprobada del catálogo compartido;
7. un retiro o sustitución deberá respetar el gobierno de compatibilidad y transición aplicable;
8. un código operativo no podrá convertirse en rol base por coincidencia de nombre, uso histórico o conveniencia de interfaz;
9. un código base no podrá aceptarse como operativo;
10. no se crearán roles por aplicación;
11. no se crearán roles por sede;
12. no se crearán roles por área;
13. no se crearán roles desde un perfil individual;
14. no se crearán roles desde una estación o dispositivo;
15. una versión desconocida o incompatible deberá impedir que la proyección se presente como canónicamente vigente;
16. el orden visual no establece jerarquía ni precedencia de autorización;
17. pertenecer al catálogo no concede permisos.

---

#### 10. Exclusiones obligatorias

No forman parte del catálogo administrativo de roles operativos:

- los ocho roles base canónicos;
- cargos administrativos;
- oficios legacy usados históricamente como roles base;
- `propietario_admin`;
- usuarios técnicos de dispositivo;
- `service_role`;
- perfiles operativos de trabajador;
- turnos;
- check-ins;
- sedes;
- áreas;
- tipos de sede o área;
- permisos;
- excepciones individuales;
- grupos de navegación;
- nombres de estaciones;
- códigos generados localmente por una aplicación.

Una coincidencia semántica de nombre no convierte ninguna de esas entidades en `OperationalRoleCode`.

---

#### 11. Separación de responsabilidades dentro de VISO

`VISO-AUTH-002` fija únicamente el catálogo administrativo de identidades operativas y su semántica mínima de presentación.

| Tarea | Responsabilidad reservada |
| --- | --- |
| `VISO-AUTH-003` | Administración de permisos y matriz por rol base. |
| `VISO-AUTH-004` | Administración de permisos y matriz por rol operativo. |
| `VISO-AUTH-005` | Roles operativos permitidos por sede. |
| `VISO-AUTH-006` | Roles operativos permitidos por área. |
| `VISO-AUTH-007` | Perfiles operativos por trabajador. |
| `VISO-AUTH-008` | Sedes asignadas al trabajador. |
| `VISO-AUTH-009` | Áreas asignadas al trabajador. |
| `VISO-AUTH-010` | Rol operativo asignado y efectivo dentro del turno. |
| `VISO-AUTH-011` | Validación de turnos sin rol operativo. |
| `VISO-AUTH-012` | Validación de incompatibilidad entre rol, sede y área. |
| `VISO-AUTH-013` | Vista previa trabajador × sede × área × turno. |
| `VISO-AUTH-014` | Simulación de permisos efectivos. |
| `VISO-AUTH-015` | Origen de cada permiso. |
| `VISO-AUTH-016` | Conflictos de configuración. |
| `VISO-AUTH-017` | Excepciones individuales. |
| `VISO-AUTH-018` | Auditoría de cambios de seguridad. |
| `VISO-AUTH-019` | Restricción de quién administra seguridad. |
| `VISO-AUTH-020` | Exporte de matriz de acceso. |

La secuencia canónica continúa por `VISO-AUTH-003`, aunque la matriz que consume directamente las doce identidades operativas se desarrolle después en `VISO-AUTH-004`.

Esta tarea no adelanta ninguna de esas responsabilidades.

---

#### 12. Reconciliación con superficies físicas observadas

El código actual de VISO ya contiene una superficie de matriz operativa que consume un catálogo denominado `vento_operational_roles_v1` y una matriz territorial denominada `vento_site_operational_role_matrix_v1`.

Esa superficie ya expresa dos fronteras compatibles con esta tarea:

- los roles se seleccionan desde un catálogo aprobado;
- la habilitación por sede o área se administra como relación separada del catálogo.

También existe una superficie distinta de permisos por rol que actualmente consulta el catálogo base `roles` y su matriz `role_permissions`.

Estas observaciones no convierten ninguna de las dos superficies en la unidad física propietaria de esta tarea.

La existencia AS-IS de una pantalla, vista, RPC o tabla no autoriza:

- modificarla durante el cierre documental;
- declarar que `VISO-AUTH-002` ya está implementada;
- fusionar catálogo operativo con matriz territorial;
- fusionar catálogo operativo con permisos;
- omitir el package y gate físicos;
- reutilizar un comportamiento legacy como fuente contractual.

La identidad exacta de la futura unidad de implementación se resolverá exclusivamente dentro del package y gate físico correspondiente.

---

#### 13. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa en VISO decisiones de catálogo operativo, separación de carriles, temporalidad del rol, aplicabilidad por proceso y límites de autoridad que ya están protegidas por el registro vigente. No introduce un nuevo código operativo, una nueva modalidad de autorización, un grant, una regla territorial, una transición física ni un comportamiento operativo adicional que requiera ampliar el registro.

---

#### 14. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar, la cobertura vigente:

- `TREQ-SHELL-041` protege el conjunto exacto de doce `OperationalRoleCode`, la integridad del dataset operativo, la exclusión de roles base y `propietario_admin`, y la ausencia de aliases o fallbacks;
- `TREQ-AUTH-001` protege que una lista local o nombre de rol no conceda autorización final;
- `TREQ-AUTH-007` protege que la administración de roles operativos y su disponibilidad territorial requiera capacidad administrativa explícita;
- `TREQ-AUTH-008` protege que las capacidades operativas dependan de turno, check-in, rol operativo efectivo y compatibilidad territorial;
- `TREQ-AUTH-010` protege segregación de funciones entre caja, producción, bodega, logística y otras responsabilidades operativas;
- `TREQ-VISO-001` protege la coherencia posterior entre configuración administrativa de VISO y el resultado consumido por las aplicaciones operativas.

Esta trazabilidad no cambia estado, contenido, paquete, evidencia ni secuencia de esos requisitos.

---

#### 15. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | Esta definición documental no ejecutó el build del checkout propietario. |
| LOCAL | NOT_EXECUTED | No se registró una ejecución local de los validadores documentales sobre el artefacto insertado en el checkout. |
| REMOTA | PASS | La rama canónica vigente fue contrastada en solo lectura contra continuidad, topología, políticas documentales, `OperationalRoleCode@1.0.0`, `AUTH-MOD-005`, `PROC-ACTOR-002`, el validador del dataset operativo, el Registro 04A y las superficies VISO relacionadas. |
| OPERATIVA | NOT_APPLICABLE | La tarea define el contrato administrativo del catálogo y no cambia turnos, asignaciones, permisos efectivos ni acciones reales de trabajadores. |
| FÍSICA | NOT_EXECUTED | No se modificaron UI, Server Actions, contratos distribuidos, migraciones, datos ni Supabase; la materialización permanece detrás de `POST_E5_PACKAGE`. |

---

#### 16. Criterios de aceptación

- [ ] El catálogo contiene exactamente los doce códigos operativos vigentes.
- [ ] Los doce códigos pertenecen exactamente a cuatro familias funcionales.
- [ ] No existe solapamiento con los ocho roles base canónicos.
- [ ] `propietario_admin` no aparece como rol operativo.
- [ ] No aparecen oficios legacy, aliases o códigos creados por aplicación, sede, área, perfil o dispositivo.
- [ ] Cada rol conserva su familia, función principal, requerimiento de área y cantidad vigente de procesos aplicables.
- [ ] La suma de vínculos aplicables permanece en 444 sobre 828 pares posibles.
- [ ] Se conservan 51 procesos con rol operativo aplicable y 18 sin rol operativo directo.
- [ ] La aplicabilidad de proceso no se interpreta como grant ni autorización.
- [ ] El catálogo distingue rol catalogado, rol asignado y rol efectivo.
- [ ] Un perfil predeterminado no autoriza.
- [ ] Un dispositivo no asigna roles.
- [ ] `operador_integral_satelite` no se convierte en superusuario ni unión automática de permisos.
- [ ] `gerencia_operativa` no se convierte en administrador global ni bypass.
- [ ] `bodeguero` permanece como rol operativo y no como rol base.
- [ ] `conductor_logistica` no adquiere producción, inventario global o recepción general por nombre.
- [ ] Los roles productivos permanecen separados por especialidad.
- [ ] El catálogo no administra grants ni invade `VISO-AUTH-004`.
- [ ] La matriz territorial no se absorbe en esta tarea y permanece reservada a `VISO-AUTH-005` y `VISO-AUTH-006`.
- [ ] La asignación y efectividad del turno permanecen reservadas a `VISO-AUTH-010` a `VISO-AUTH-012`.
- [ ] La versión operativa compartida permanece `1.0.0`.
- [ ] La frontera contractual de 240 grants y su huella vigente no se modifica.
- [ ] Los cambios físicos permanecen fuera del cierre documental y detrás de la topología y gate vigentes.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 17. Límites

Esta tarea no:

- crea ni modifica código de VISO;
- crea rutas, pantallas, componentes o Server Actions;
- declara un archivo físico de VISO como implementation unit;
- modifica el paquete compartido de contratos;
- modifica `operational-roles.json`;
- modifica el dataset `operational-role-grants@1.0.0`;
- modifica `public.operational_roles`;
- modifica matrices de sede o área;
- modifica turnos;
- modifica perfiles operativos;
- modifica check-ins;
- crea migraciones;
- crea o modifica RLS, RPC, triggers o grants;
- administra permisos por rol base;
- administra permisos por rol operativo;
- habilita roles en sedes;
- habilita roles en áreas;
- asigna roles a trabajadores;
- asigna roles a turnos;
- crea excepciones individuales;
- ejecuta simulaciones;
- modifica precedencia, denegaciones o autorización efectiva;
- crea aliases para compatibilidad legacy;
- retira físicamente roles legacy;
- selecciona package;
- autoriza implementación física.

---

#### 18. Handoff contractual

El resultado de esta tarea entrega un universo operativo cerrado y no ambiguo:

```text
12 roles operativos canónicos
+
4 familias
+
función principal por rol
+
requerimiento territorial de referencia
+
444 vínculos de aplicabilidad
+
fronteras de autoridad
+
separación entre catálogo, asignación y efectividad
```

`VISO-AUTH-003` continuará con la administración de permisos por rol base y deberá conservar intacto el universo operativo definido aquí.

`VISO-AUTH-004` deberá consumir exactamente estas doce identidades al administrar la matriz operativa, sin incorporar roles base, aliases, `propietario_admin` ni códigos locales.

Las tareas territoriales y de turno posteriores podrán vincular estos códigos a sedes, áreas, perfiles y turnos, pero ninguna podrá redefinir silenciosamente qué identidades pertenecen al catálogo operativo.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-001 — Crear catálogo administrativo de roles base`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-002 — Crear catálogo administrativo de roles operativos`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-003 — Administrar permisos por rol base`


### ✅ VISO-AUTH-003 — Administrar permisos por rol base

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-002 — Crear catálogo administrativo de roles operativos
**Tarea siguiente:** VISO-AUTH-004 — Administrar permisos por rol operativo
**Tipo de tarea:** documental; definición del contrato administrativo para gobernar concesiones de permisos por rol base sin crear una fuente paralela de catálogo, autorización o denegaciones
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá consultar y gobernar las concesiones del carril base para los ocho roles base canónicos, manteniendo separados catálogo, grant, alcance, modalidad, condición, denegación, contexto operativo y decisión efectiva.

La regla raíz es:

```text
ROL BASE CANÓNICO
+ PERMISO CANÓNICO
+ MODALIDAD COMPATIBLE CON BASE
+ ALCANCE Y RECURSO VÁLIDOS
+ CONCESIÓN BASE VIGENTE
+ SIN DENEGACIÓN PREVALENTE
→ BASE ALLOW POSIBLE
```

Nunca:

```text
NOMBRE DEL ROL → AUTORIZACIÓN
CAMBIO EN UI → AUTORIZACIÓN INMEDIATA
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva sin reescribir:

- `ADR-AUTH-001`;
- `AUTH-MOD-002`, `AUTH-MOD-003`, `AUTH-MOD-004`, `AUTH-MOD-018`, `AUTH-MOD-019` y `AUTH-MOD-021`;
- `AUTH-CAT-001` a `AUTH-CAT-024`;
- `AUTH-RBAC-001` a `AUTH-RBAC-007`, `AUTH-RBAC-024`, `AUTH-RBAC-027` y `AUTH-RBAC-028`;
- `SHELL-CON-003`, `SHELL-CON-004` y `SHELL-CON-006`;
- `VISO-AUTH-001` y `VISO-AUTH-002`.

Contratos compartidos vigentes:

```text
vento.authorization@1.0.0
vento.authorization.base-role-grants@1.1.0
BaseRoleCode@1.1.0
PermissionScopeCode@1.0.0
```

VISO administra configuración efectiva gobernada por estos contratos. La interfaz no modifica los archivos versionados de `@vento/contracts` ni crea códigos contractuales nuevos.

---

#### 3. Universo administrativo cerrado

La administración opera exclusivamente sobre:

```text
BaseRoleCode = 8
PermissionKey activas = 140
base-role-grants de referencia = 504
```

Roles admitidos:

1. `propietario`;
2. `gerente_general`;
3. `gerente`;
4. `supervisor`;
5. `auxiliar_administrativa`;
6. `contador`;
7. `marketing`;
8. `trabajador_operativo`.

No se admiten roles operativos, oficios legacy, `propietario_admin`, dispositivos, usuarios técnicos, aplicaciones como sujetos, aliases locales ni claves de permiso desconocidas o retiradas.

---

#### 4. Matriz base vigente

`base-role-grants@1.1.0` contiene:

| Rol base | Concesiones |
| --- | ---: |
| `propietario` | 121 |
| `gerente_general` | 119 |
| `gerente` | 93 |
| `supervisor` | 58 |
| `auxiliar_administrativa` | 47 |
| `contador` | 45 |
| `marketing` | 16 |
| `trabajador_operativo` | 5 |
| **Total** | **504** |

Cada concesión referencia `role_code`, `permission_key`, `authorization_mode`, `lane`, `grant_type`, `effect`, `scope_expression`, `condition_expression` y `source_task`.

Las 504 filas usan:

```text
lane = BASE
effect = ALLOW
```

La matriz administra concesiones positivas. Ausencia de concesión significa ausencia de `BASE_ALLOW`; no crea por sí misma una denegación explícita.

Distribuciones de integridad:

```text
DIRECT_BASE = 468
BASE_COMPONENT = 36

BASE_ONLY = 256
BASE_OR_OPERATIONAL = 212
BASE_AND_OPERATIONAL = 36
OPERATIONAL_ONLY = 0
```

Por aplicación:

```text
shell=8, anima=52, aura=3, fogo=19, nexo=251,
numera=27, origo=31, pass=2, pulso=18, viso=93
```

---

#### 5. Modalidades y límites del carril base

| Modalidad | Regla administrativa |
| --- | --- |
| `BASE_ONLY` | Puede satisfacerse por carril base sin turno ni check-in, sujeto a actor, alcance, recurso y denegaciones. |
| `BASE_OR_OPERATIONAL` | El carril base puede autorizar completamente; el carril operativo sigue siendo alternativa independiente. |
| `BASE_AND_OPERATIONAL` | El grant base es solo `BASE_COMPONENT`; la acción final exige componente operativo compatible del mismo actor. |
| `OPERATIONAL_ONLY` | No admite grant base y debe bloquearse en esta tarea. |

La modalidad proviene del contrato del permiso. No se infiere desde rol, ruta, pantalla ni tabla.

---

#### 6. Alcance

VISO deberá consumir la taxonomía canónica:

```text
NT, ORG, G, AS, SS, AST, TST, AA, SA, AAT, ATW, CTX, OWN
```

Solo podrá presentar scopes admitidos por el permiso y respetará `AllowedScopeSet`, `MaximumScope`, recurso y modalidad.

Reglas:

- `G` no es wildcard;
- `ORG` no significa todas las sedes por inferencia;
- `TST` no se infiere desde `AST`;
- `CTX` no sustituye turno, check-in ni área;
- `OWN` no amplía territorio;
- un territorio o recurso obligatorio irresoluble bloquea el cambio;
- no existe fallback hacia un scope más amplio para permitir guardar.

---

#### 7. Operaciones administrativas canónicas

El catálogo vigente separa exactamente:

```text
viso.authorization.base_grants.view
viso.authorization.base_grants.create
viso.authorization.base_grants.approve
viso.authorization.base_grants.suspend
viso.authorization.base_grants.revoke
```

| Acción | Semántica |
| --- | --- |
| `view` | Consultar matriz, modalidad, alcance, condición y procedencia. |
| `create` | Registrar una propuesta de concesión válida; no equivale a aprobación. |
| `approve` | Aprobar una propuesta después de revalidar seguridad, scope, recurso y segregación. |
| `suspend` | Interrumpir temporalmente la eficacia de un allow conservando historia. |
| `revoke` | Retirar la eficacia futura del allow conservando evidencia histórica. |

No existe un permiso canónico genérico equivalente a `manage all permissions`.

Cada acción se autoriza por separado en servidor.

---

#### 8. Autoridad para administrar grants base

El snapshot vigente concede las cinco capacidades anteriores únicamente a:

- `propietario`;
- `gerente_general`.

No están concedidas a los otros seis roles base.

Para ambos roles son `BASE_ONLY`, `DIRECT_BASE`, con alcance `ORG`, y exigen:

- reautenticación fuerte;
- actor activo;
- recurso objetivo válido;
- segregación de funciones;
- auditoría;
- no autoaprobación;
- no autoafectación.

Por tanto:

```text
CREATE ≠ APPROVE
PROPONER ≠ APROBAR EL PROPIO CAMBIO
ADMINISTRAR ≠ AMPLIAR LA PROPIA AUTORIDAD
```

Una restricción de segregación no puede existir solo en frontend.

---

#### 9. Reglas de mutación

Una propuesta de grant base solo es válida cuando:

1. el rol pertenece a los ocho `BaseRoleCode`;
2. el permiso pertenece a las 140 identidades activas;
3. la modalidad admite carril base;
4. el scope pertenece al conjunto admitido por el permiso;
5. territorio y recurso son resolubles;
6. no existe duplicado ambiguo;
7. no se usa clave legacy, alias o inferencia por prefijo;
8. el actor posee la capacidad administrativa exacta;
9. no existe autoafectación prohibida;
10. quedan registrados motivo, actor y trazabilidad;
11. `create` permanece separado de `approve`.

`approve` debe revalidar todo el cambio. No podrá confiar en una validación antigua si cambió rol, permiso, scope, recurso, versión contractual o propuesta.

Suspender o revocar un allow no crea un deny.

La matriz base no podrá usar:

```text
is_allowed = false
```

como atajo para crear una denegación contractual nueva. Las denegaciones pertenecen al modelo separado de deny y precedencia.

---

#### 10. `trabajador_operativo`

Su snapshot vigente conserva exactamente cinco grants:

```text
shell.access
anima.access
anima.workforce.employee_documents.view
anima.workforce.employee_documents.upload
anima.workforce.employee_photos.upload
```

Los cinco son `BASE_ONLY` y `DIRECT_BASE`.

La administración no podrá convertir este rol mínimo en sustituto de roles operativos ni eludir turno, sede, área, check-in o matriz operativa.

---

#### 11. Experiencia administrativa mínima

Para cada combinación relevante VISO deberá distinguir:

- rol base;
- aplicación;
- permiso y etiqueta humana;
- modalidad;
- grant type;
- scope;
- condición;
- procedencia;
- existencia o ausencia de `BASE_ALLOW`;
- condición de `BASE_COMPONENT`;
- operación administrativa pendiente.

Está prohibido:

- conceder por prefijo;
- conceder una aplicación completa mediante `<app>.access`;
- conceder una familia mediante un switch masivo;
- convertir “todos” en wildcard;
- ocultar la doble condición de `BASE_AND_OPERATIONAL`;
- presentar una propuesta como grant efectivo;
- confundir ausencia con deny explícito.

Las vistas completas de simulación, origen, conflictos y auditoría permanecen reservadas a tareas posteriores.

---

#### 12. Reconciliación AS-IS de VISO

La superficie actual `/roles-permissions`:

- consulta roles activos y permisos;
- modifica `role_permissions`;
- usa scopes genéricos `global`, `site`, `site_type`, `area`, `area_kind`;
- usa `permissionCode: "staff.permissions.manage"` dentro del guard de VISO;
- guarda mediante delete + insert;
- admite `is_allowed`.

Es evidencia AS-IS, no contrato TO-BE.

La futura materialización deberá reconciliar:

| AS-IS | TO-BE |
| --- | --- |
| guard genérico | `base_grants.view/create/approve/suspend/revoke` separados |
| delete + insert | ciclo gobernado de creación, aprobación, suspensión y revocación |
| `is_allowed=false` | deny explícito separado de la matriz positiva |
| scopes genéricos | scopes derivados del contrato canónico |
| roles de tabla local | membresía validada contra ocho `BaseRoleCode` |
| permiso local existente | identidad validada contra catálogo versionado |
| control principalmente de UI | autorización, reauth y segregación en servidor |

Esta tarea no modifica esa ruta ni Supabase.

---

#### 13. Fallo cerrado

Se rechaza la operación ante:

- rol base desconocido;
- permiso desconocido, legacy o retirado;
- permiso `OPERATIONAL_ONLY`;
- scope no admitido;
- territorio o recurso obligatorio irresoluble;
- actor sin permiso administrativo exacto;
- reautenticación requerida ausente;
- autoaprobación;
- autoafectación;
- duplicado ambiguo;
- cambio concurrente no revalidado;
- auditoría no persistible;
- versión contractual incompatible;
- intento de convertir `is_allowed=false` en deny nuevo;
- discrepancia entre UI y servidor.

Prevalece siempre la decisión de servidor.

---

#### 14. Separación de responsabilidades

`VISO-AUTH-003` no absorbe:

- `VISO-AUTH-004`: permisos por rol operativo;
- `VISO-AUTH-005` y `006`: disponibilidad por sede y área;
- `VISO-AUTH-007` a `012`: perfiles, asignaciones y rol operativo efectivo;
- `VISO-AUTH-013`: vista previa trabajador × sede × área × turno;
- `VISO-AUTH-014`: simulación;
- `VISO-AUTH-015`: origen de permisos;
- `VISO-AUTH-016`: conflictos;
- `VISO-AUTH-017`: excepciones individuales;
- `VISO-AUTH-018`: auditoría administrativa;
- `VISO-AUTH-019`: restricción de quién administra seguridad;
- `VISO-AUTH-020`: exporte de matriz.

La futura implementación física de esta tarea continúa detrás de `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`.

---

#### 15. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

Las reglas materializadas ya están protegidas por requisitos vigentes de catálogo, autorización, administración territorial, separación de carriles, integridad de la matriz base y coherencia de VISO. No se introduce una nueva identidad, modalidad, scope o regla empresarial que exija ampliar el registro.

---

#### 16. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza la cobertura que protege:

- exactitud de los ocho roles base y de `base-role-grants@1.1.0`;
- prohibición de autorización por listas locales de roles;
- validez de claves de permiso;
- administración de seguridad mediante capacidad explícita;
- independencia entre administración y turno/check-in;
- segregación de funciones;
- coherencia entre configuración VISO y resultado consumido por las aplicaciones.

Esta trazabilidad no cambia estado, contenido, paquete ni evidencia de ningún requisito.

---

#### 17. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada en el checkout local de su rama documental. |
| REMOTA | PASS | Se contrastaron continuidad, topología, políticas, archivo propietario, catálogo de 140 permisos, ocho roles, dataset base 1.1.0, validador de 504 grants, scopes y superficie VISO AS-IS. |
| OPERATIVA | NOT_APPLICABLE | No se cambian permisos efectivos ni acciones reales de trabajadores durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Server Actions, `role_permissions`, Supabase, migraciones ni contratos distribuidos. |

---

#### 18. Criterios de aceptación

- [ ] Se administran exclusivamente ocho `BaseRoleCode`.
- [ ] El universo de capacidades conserva 140 `PermissionKey` activas.
- [ ] El snapshot conserva 504 grants: 468 `DIRECT_BASE` y 36 `BASE_COMPONENT`.
- [ ] Los conteos por rol son 121, 119, 93, 58, 47, 45, 16 y 5.
- [ ] La matriz sigue siendo `ALLOW_ONLY`.
- [ ] `OPERATIONAL_ONLY` no puede agregarse al carril base.
- [ ] `BASE_COMPONENT` no se presenta como autorización completa.
- [ ] Ausencia, suspensión, revocación y deny explícito no se confunden.
- [ ] Los scopes provienen del contrato y no de una lista genérica local.
- [ ] Las cinco acciones `base_grants.*` se autorizan por separado.
- [ ] Solo `propietario` y `gerente_general` poseen actualmente las cinco capacidades administrativas del snapshot.
- [ ] Toda mutación sensible exige reautenticación fuerte, segregación y auditoría.
- [ ] No existe autoaprobación ni autoafectación unilateral.
- [ ] `trabajador_operativo` conserva sus cinco grants mínimos en el snapshot vigente.
- [ ] `/roles-permissions` no se declara canónica por su sola existencia.
- [ ] El guard legacy observado no se conserva como autoridad TO-BE.
- [ ] No se invade la matriz operativa de `VISO-AUTH-004`.
- [ ] No se modifican contratos, datos ni Supabase durante el cierre documental.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 19. Límites

Esta tarea no modifica código de VISO, rutas, componentes, Server Actions, `@vento/contracts`, catálogos, datasets, `role_permissions`, `employee_permissions`, `operational_role_permissions`, denegaciones, migraciones, SQL, RLS, RPC, triggers ni datos Supabase.

Tampoco crea roles, permisos, scopes, aliases, excepciones, perfiles operativos, asignaciones de sede/área, roles de turno, simulaciones, packages ni autorizaciones físicas.

La identidad exacta de la unidad física se resolverá únicamente mediante el package y gate aplicables.

---

#### 20. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-002 — Crear catálogo administrativo de roles operativos`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-003 — Administrar permisos por rol base`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-004 — Administrar permisos por rol operativo`


### ✅ VISO-AUTH-004 — Administrar permisos por rol operativo

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-003 — Administrar permisos por rol base
**Tarea siguiente:** VISO-AUTH-005 — Administrar roles permitidos por sede
**Tipo de tarea:** documental; definición del contrato administrativo para consultar y gobernar concesiones de permisos por rol operativo sin convertir VISO, una tabla legacy o una matriz territorial en fuente paralela de autorización
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá consultar y gobernar las concesiones del carril operativo para los doce roles operativos canónicos, conservando separados:

- catálogo de roles operativos;
- catálogo de permisos;
- concesión positiva por rol operativo;
- modalidad de autorización;
- contexto laboral y territorial;
- alcance contractual;
- disponibilidad del rol por sede o área;
- asignación del rol al turno;
- check-in cuando corresponda;
- denegaciones;
- excepciones individuales;
- decisión efectiva.

La regla raíz queda:

```text
ROL OPERATIVO CANÓNICO
+
PERMISO CANÓNICO
+
MODALIDAD COMPATIBLE CON CARRIL OPERATIVO
+
GRANT OPERATIVO VIGENTE
+
ROL OPERATIVO EFECTIVO
+
CONTEXTO, RECURSO Y TERRITORIO COMPATIBLES
+
SIN DENEGACIÓN PREVALENTE
→
OPERATIONAL_ALLOW POSIBLE
```

Y nunca:

```text
ROL OPERATIVO EN CATÁLOGO
→ AUTORIZACIÓN
```

ni:

```text
GRANT OPERATIVO
→ OPERACIÓN FUERA DE TURNO O CONTEXTO
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva sin reescribir:

- `ADR-AUTH-001`;
- `AUTH-MOD-002`, `AUTH-MOD-005`, `AUTH-MOD-006`, `AUTH-MOD-009`, `AUTH-MOD-010`, `AUTH-MOD-018` y `AUTH-MOD-019`;
- `AUTH-CAT-001` a `AUTH-CAT-024`;
- `AUTH-RBAC-009` a `AUTH-RBAC-019`;
- `AUTH-RBAC-025`, `AUTH-RBAC-027` y `AUTH-RBAC-028`;
- `SHELL-CON-003`, `SHELL-CON-005` y `SHELL-CON-006`;
- `VISO-AUTH-002` — catálogo de doce roles operativos;
- `VISO-AUTH-003` — gobierno administrativo de grants base.

Contratos compartidos vigentes:

```text
vento.authorization@1.0.0
vento.authorization.operational-role-grants@1.0.0
OperationalRoleCode@1.0.0
PermissionScopeCode@1.0.0
```

VISO administra configuración efectiva gobernada por estos contratos. La interfaz no edita los archivos versionados de `@vento/contracts`, no crea nuevos códigos de rol y no transforma strings legacy en identidades canónicas.

---

#### 3. Universo administrativo cerrado

La administración opera exclusivamente sobre:

```text
OperationalRoleCode = 12
PermissionKey activas = 140
operational-role-grants de referencia = 240
```

Roles admitidos:

1. `cajero_satelite`;
2. `barista_satelite`;
3. `cocinero_satelite`;
4. `servicio_salon`;
5. `mostrador_satelite`;
6. `operador_integral_satelite`;
7. `produccion_cocina`;
8. `produccion_panaderia`;
9. `produccion_reposteria`;
10. `bodeguero`;
11. `conductor_logistica`;
12. `gerencia_operativa`.

No se admiten:

- roles base;
- `propietario_admin`;
- oficios legacy;
- roles creados por aplicación;
- roles creados por sede o área;
- aliases locales;
- usuarios o empleados concretos como sustitutos del rol;
- dispositivos como sujetos de grant;
- claves de permiso desconocidas, retiradas o legacy bloqueadas.

La identidad del sujeto de esta matriz es siempre `OperationalRoleCode`.

---

#### 4. Matriz operativa vigente

`operational-role-grants@1.0.0` contiene exactamente:

| Rol operativo | Grants | Directos | Componentes |
| --- | ---: | ---: | ---: |
| `cajero_satelite` | 20 | 15 | 5 |
| `barista_satelite` | 11 | 11 | 0 |
| `cocinero_satelite` | 11 | 11 | 0 |
| `servicio_salon` | 11 | 11 | 0 |
| `mostrador_satelite` | 11 | 11 | 0 |
| `operador_integral_satelite` | 21 | 16 | 5 |
| `produccion_cocina` | 16 | 16 | 0 |
| `produccion_panaderia` | 16 | 16 | 0 |
| `produccion_reposteria` | 16 | 16 | 0 |
| `bodeguero` | 36 | 36 | 0 |
| `conductor_logistica` | 16 | 16 | 0 |
| `gerencia_operativa` | 55 | 43 | 12 |
| **Total** | **240** | **218** | **22** |

Cada concesión de referencia relaciona, como mínimo:

```text
operational_role_code
permission_key
authorization_mode
lane
grant_type
effect
scope_expression
condition_expression
source_task
```

Las 240 filas usan:

```text
lane = OPERATIONAL
effect = ALLOW
```

La matriz operativa es `ALLOW_ONLY`.

---

#### 5. Distribuciones contractuales

##### 5.1 Modalidad de autorización

```text
BASE_OR_OPERATIONAL = 174
OPERATIONAL_ONLY = 44
BASE_AND_OPERATIONAL = 22
BASE_ONLY = 0
TOTAL = 240
```

##### 5.2 Tipo de grant

```text
DIRECT_OPERATIONAL = 218
OPERATIONAL_COMPONENT = 22
TOTAL = 240
```

##### 5.3 Aplicación del permiso

```text
FOGO = 19
NEXO = 181
ORIGO = 9
PULSO = 31
TOTAL = 240
```

##### 5.4 Integridad

```text
pares rol-permiso únicos = 240
roles base dentro del dataset = 0
propietario_admin = 0
BASE_ONLY = 0
wildcards = 0
legacy dispatch = 0
```

Huella contractual:

```text
sha256:3e28cb780c346fbc5cf583fe9cf20d1a88333c4fd459fc233380d9e627c6f94f
```

Estas cifras son controles de integridad del snapshot contractual y no cuotas configurables.

---

#### 6. Significado de las modalidades operativas

| Modalidad | Regla del carril operativo |
| --- | --- |
| `BASE_OR_OPERATIONAL` | Un grant operativo directo puede satisfacer el carril operativo cuando existe contexto operativo válido; el carril base sigue siendo una alternativa independiente. |
| `OPERATIONAL_ONLY` | La capacidad solo puede satisfacerse por carril operativo válido. No puede crearse un grant base equivalente. |
| `BASE_AND_OPERATIONAL` | La fila operativa es exclusivamente `OPERATIONAL_COMPONENT`; la acción final exige además el componente base compatible del mismo actor. |
| `BASE_ONLY` | Está prohibida en la matriz operativa. |

Reglas:

```text
OPERATIONAL_COMPONENT
→ nunca autorización completa
```

```text
BASE_ONLY
→ nunca operational grant
```

```text
BASE_AND_OPERATIONAL
→ mismo actor
→ componente base válido
→ componente operativo válido
→ misma decisión final
```

No se permite combinar el componente base de una persona con el componente operativo de otra.

---

#### 7. Contexto operativo obligatorio

Un operational grant no se vuelve efectivo por existir en la matriz.

La evaluación deberá resolver, según el contrato exacto del permiso:

- actor humano efectivo;
- turno publicado y vigente;
- rol operativo asignado;
- rol operativo efectivo;
- sede activa;
- área activa cuando corresponda;
- compatibilidad rol × sede;
- compatibilidad rol × área;
- check-in cuando la condición contractual lo requiera;
- recurso objetivo;
- relación del recurso con actor, sede, área, ruta, caja, bodega, orden o proceso aplicables;
- modalidad;
- denegaciones prevalentes.

La regla general es:

```text
GRANT OPERATIVO
+
CONTEXTO OPERATIVO VÁLIDO
→ CANDIDATO A ALLOW
```

pero no todas las capacidades tienen idéntico prerrequisito de presencia.

Por ejemplo, una capacidad de entrada a una aplicación puede permitir mostrar el contexto y sus bloqueos sin exigir todavía check-in si su contrato así lo declara, mientras una mutación física puede exigir turno + check-in + recurso compatible.

Por tanto, VISO no podrá aplicar una regla simplificada de:

```text
TODO PERMISO OPERATIVO
→ SIEMPRE MISMO CHECK-IN
```

La condición se obtiene del contrato exacto de la concesión y del permiso.

---

#### 8. Alcance operativo y prohibición de globalidad accidental

La matriz operativa canónica no contiene alcance operacional global.

Las 240 concesiones utilizan expresiones contextuales `CTX-*` y no perfiles base o globales.

VISO deberá representar esa semántica sin convertirla en un selector libre de:

```text
global
cualquier sede
cualquier área
```

La taxonomía compartida de scopes continúa siendo:

```text
NT, ORG, G, AS, SS, AST, TST, AA, SA, AAT, ATW, CTX, OWN
```

pero esta tarea no puede usarla para fabricar autoridad territorial.

Reglas obligatorias:

1. `CTX` no sustituye turno, check-in o área;
2. un grant operativo no habilita el rol en una sede por sí mismo;
3. un grant operativo no habilita el rol en un área por sí mismo;
4. la disponibilidad del rol por sede pertenece a `VISO-AUTH-005`;
5. la disponibilidad del rol por área pertenece a `VISO-AUTH-006`;
6. la asignación del rol al turno pertenece a `VISO-AUTH-010`;
7. la validez del turno y del área pertenece a `VISO-AUTH-011` y `VISO-AUTH-012`;
8. una dimensión territorial obligatoria irresoluble falla cerrada;
9. no existe fallback hacia un territorio más amplio.

---

#### 9. Operaciones administrativas canónicas

El catálogo vigente separa exactamente cinco capacidades para gobernar grants operativos:

```text
viso.authorization.operational_grants.view
viso.authorization.operational_grants.create
viso.authorization.operational_grants.approve
viso.authorization.operational_grants.suspend
viso.authorization.operational_grants.revoke
```

| Acción | Semántica |
| --- | --- |
| `view` | Consultar matriz operativa, modalidad, grant type, condición, contexto y procedencia. |
| `create` | Registrar una propuesta válida de operational grant; no la vuelve efectiva por sí sola. |
| `approve` | Aprobar una propuesta después de revalidar rol, permiso, modalidad, seguridad, contexto contractual y segregación. |
| `suspend` | Interrumpir temporalmente la eficacia administrativa del allow conservando historia. |
| `revoke` | Retirar su eficacia futura conservando evidencia histórica. |

No existe una capacidad canónica genérica equivalente a:

```text
manage operational permissions
```

Cada operación administrativa debe autorizarse independientemente en servidor.

---

#### 10. Autoridad para administrar grants operativos

El snapshot base vigente concede las cinco capacidades `operational_grants.*` únicamente a:

- `propietario`;
- `gerente_general`.

No están concedidas a los otros seis roles base.

Para ambos roles las cinco capacidades son:

```text
authorization_mode = BASE_ONLY
grant_type = DIRECT_BASE
scope = ORG
```

y sus condiciones exigen:

- reautenticación fuerte;
- actor activo;
- recurso objetivo válido;
- segregación de funciones;
- auditoría;
- no autoaprobación;
- no autoafectación.

Administrar una matriz operativa es una capacidad administrativa base. No requiere que el administrador haga check-in para adquirir la autoridad administrativa cuando el contrato base la concede.

---

#### 11. Segregación y lifecycle de cambios

La administración deberá separar:

```text
PROPUESTA
→ APROBACIÓN
→ GRANT OPERATIVO VIGENTE
→ SUSPENSIÓN O REVOCACIÓN
```

Reglas:

```text
CREATE ≠ APPROVE
```

```text
PROPONER ≠ APROBAR EL PROPIO CAMBIO
```

```text
ADMINISTRADOR ≠ PODER AMPLIAR SU PROPIA AUTORIDAD
```

Antes de crear o aprobar un cambio deberán resolverse:

- actor administrador;
- permiso administrativo exacto;
- rol operativo objetivo;
- permiso objetivo;
- modalidad;
- tipo de grant;
- expresión contextual;
- condiciones;
- procedencia;
- posible autoafectación;
- actor que propuso;
- actor que aprueba;
- motivo y evidencia requeridos.

La segregación no puede depender únicamente de esconder controles en frontend.

---

#### 12. Reglas de creación y aprobación

Una propuesta de operational grant solo es válida cuando:

1. el rol pertenece a los doce `OperationalRoleCode`;
2. el permiso pertenece al catálogo activo;
3. la modalidad es `BASE_OR_OPERATIONAL`, `OPERATIONAL_ONLY` o `BASE_AND_OPERATIONAL`;
4. `BASE_ONLY` queda rechazado;
5. `BASE_AND_OPERATIONAL` usa `OPERATIONAL_COMPONENT`;
6. `OPERATIONAL_COMPONENT` solo se usa para `BASE_AND_OPERATIONAL`;
7. el par rol-permiso no es un duplicado ambiguo;
8. no se usa wildcard;
9. no se usa `propietario_admin`;
10. no se usa un rol base;
11. no se usa una clave legacy bloqueada;
12. no se infiere un permiso por prefijo;
13. existe condición contextual no vacía;
14. existe expresión de scope no vacía;
15. existe `source_task`;
16. el actor posee `operational_grants.create`;
17. no existe autoafectación prohibida;
18. se registra trazabilidad.

`approve` debe revalidar todo el contrato de la propuesta.

Si cambió el rol, permiso, modalidad, contexto, versión contractual, procedencia o evidencia desde la revisión, la propuesta deberá volver a evaluarse antes de adquirir eficacia.

---

#### 13. Ausencia, suspensión, revocación y deny

VISO deberá distinguir:

| Estado conceptual | Efecto |
| --- | --- |
| Sin operational grant | No existe `OPERATIONAL_ALLOW` para ese par. |
| Grant vigente | Puede aportar allow únicamente con contexto operativo válido. |
| Grant suspendido | No aporta allow mientras la suspensión aplique. |
| Grant revocado | No aporta allow hacia futuro; conserva evidencia histórica. |
| Denegación explícita | Es una regla de deny separada con su propia clase y precedencia. |

La matriz operativa continúa siendo `ALLOW_ONLY`.

Por tanto:

```text
is_allowed = false
```

no se utilizará como atajo para inventar una denegación contractual.

La ausencia de operational grant tampoco se interpreta como un deny explícito contra el carril base de un permiso `BASE_OR_OPERATIONAL`.

---

#### 14. Experiencia administrativa mínima

La vista deberá permitir entender, para cada combinación:

- rol operativo;
- familia funcional;
- aplicación;
- permiso;
- etiqueta humana;
- modalidad;
- `DIRECT_OPERATIONAL` u `OPERATIONAL_COMPONENT`;
- expresión contextual;
- condición;
- procedencia;
- existencia o ausencia del grant;
- si exige componente base adicional;
- estado administrativo de la propuesta o grant.

La UI podrá agrupar por aplicación o familia funcional, pero la decisión permanece atómica por permiso.

Está prohibido:

- activar permisos por prefijo;
- convertir `<app>.access` en acceso a todas las capacidades internas;
- conceder una familia completa mediante un único switch;
- presentar un `OPERATIONAL_COMPONENT` como permiso final;
- mostrar un rol catalogado como si fuera efectivo;
- convertir “todas las sedes” en alcance operativo global;
- presentar una propuesta pendiente como grant vigente.

---

#### 15. Reconciliación AS-IS del runtime y VISO

El corte remoto read-only observado para `public.operational_role_permissions` conserva:

```text
filas = 32
roles con filas = 7
permission_code distintos = 11
is_allowed = false = 0
filas sin site_id, area_id y area_kind = 32
```

Distribución AS-IS:

| Rol observado | Filas |
| --- | ---: |
| `barista_satelite` | 3 |
| `bodeguero` | 5 |
| `cajero_satelite` | 5 |
| `cocinero_satelite` | 3 |
| `conductor_logistica` | 3 |
| `gerencia_operativa` | 7 |
| `operador_integral_satelite` | 6 |
| **Total** | **32** |

Los cinco roles canónicos sin filas en esa tabla son:

- `servicio_salon`;
- `mostrador_satelite`;
- `produccion_cocina`;
- `produccion_panaderia`;
- `produccion_reposteria`.

Además, el catálogo físico `public.operational_roles` observado todavía contiene trece códigos activos porque conserva `propietario_admin`.

Esa fila física legacy:

```text
propietario_admin
```

no pertenece al `OperationalRoleCode` canónico y no puede adquirir grants por compatibilidad.

El dataset contractual objetivo conserva 240 grants sobre 12 roles y cuatro aplicaciones. Las 32 filas físicas actuales no sustituyen ese contrato.

En el repositorio VISO observado, `/operations/preview` lee `operational_role_permissions` para mostrar permisos junto con la matriz de sede/área. La búsqueda estática no identificó una superficie VISO que materialice el lifecycle TO-BE de `operational_grants.create/approve/suspend/revoke`.

Por tanto:

```text
RUNTIME AS-IS OBSERVADO
≠
CONTRATO ADMINISTRATIVO APROBADO
```

La reconciliación física queda diferida a la instancia propietaria autorizada.

---

#### 16. Frontera con la matriz territorial

`VISO-AUTH-004` administra qué capacidades puede aportar un rol operativo bajo contexto válido.

No administra dónde puede existir ese rol.

La separación obligatoria es:

```text
VISO-AUTH-004
rol operativo × permiso
```

```text
VISO-AUTH-005
rol operativo × sede
```

```text
VISO-AUTH-006
rol operativo × área
```

y posteriormente:

```text
VISO-AUTH-010
trabajador × turno × rol operativo
```

Por tanto, los campos legacy `site_id`, `area_id` o `area_kind` presentes en una tabla física no autorizan a absorber dentro de esta tarea las responsabilidades territoriales reservadas.

La futura implementación deberá reconciliar la persistencia física sin crear dos fuentes contradictorias de territorio.

---

#### 17. Fallo cerrado

La operación se rechaza ante:

| Caso | Resultado |
| --- | --- |
| Rol no perteneciente a los doce códigos canónicos | Rechazar |
| `propietario_admin` | Rechazar |
| Rol base usado como operativo | Rechazar |
| PermissionKey inexistente, retirada o legacy bloqueada | Rechazar |
| `BASE_ONLY` | Rechazar operational grant |
| `BASE_AND_OPERATIONAL` sin `OPERATIONAL_COMPONENT` | Rechazar |
| `OPERATIONAL_COMPONENT` sobre otra modalidad | Rechazar |
| Wildcard | Rechazar |
| Duplicado ambiguo | Rechazar |
| Expresión contextual vacía | Rechazar |
| Condición vacía | Rechazar |
| Actor sin permiso administrativo exacto | Rechazar |
| Reautenticación requerida ausente | Rechazar |
| Autoaprobación | Rechazar |
| Autoafectación prohibida | Rechazar |
| Contexto obligatorio irresoluble | Rechazar |
| Auditoría no persistible | Rechazar |
| Versión contractual incompatible | Rechazar |
| Intento de crear deny con `is_allowed=false` | Rechazar dentro de esta matriz |
| Discrepancia UI-servidor | Prevalece servidor; no guardar |

---

#### 18. Handoff contractual

La tarea entrega una matriz administrativa cerrada y verificable:

```text
12 roles operativos
+
140 permisos activos como universo de identidad
+
240 grants de referencia
+
218 DIRECT_OPERATIONAL
+
22 OPERATIONAL_COMPONENT
+
174 BASE_OR_OPERATIONAL
+
44 OPERATIONAL_ONLY
+
22 BASE_AND_OPERATIONAL
+
0 BASE_ONLY
+
5 operaciones administrativas separadas
+
contexto operativo obligatorio
+
sin globalidad operativa
+
deny separado
+
fallo cerrado
```

`VISO-AUTH-005` consumirá exactamente los doce roles definidos aquí para administrar su disponibilidad por sede.

No podrá modificar la matriz de permisos al administrar territorio.

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa en VISO obligaciones ya aprobadas de catálogo operativo, matriz operativa, administración de seguridad, contexto laboral, segregación, territorialidad y coherencia. No introduce nuevos códigos, modalidades, scopes ni reglas empresariales que exijan ampliar el Registro Canónico de Requisitos de Prueba.

---

#### 20. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza la cobertura vigente que protege:

- el conjunto exacto de doce roles operativos y la huella de `operational-role-grants@1.0.0`;
- el conjunto permitido de scopes y el fallo cerrado ante territorios irresolubles;
- la prohibición de autorización por listas locales de roles;
- la validez de `PermissionKey`;
- la administración de roles y permisos mediante capacidad explícita;
- la exigencia de contexto operativo para capacidades operativas;
- la resolución determinista de sede y área;
- la segregación de funciones;
- la coherencia entre configuración VISO y resultado consumido por las aplicaciones.

Esta trazabilidad no cambia estado, contenido, paquete, evidencia ni secuencia de ningún requisito existente.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de la rama documental local. |
| REMOTA | PASS | Se contrastaron `main`, continuidad, topología, políticas, archivo propietario, catálogo de 140 permisos, doce roles operativos, dataset 1.0.0, validador de 240 grants, permisos administrativos `operational_grants.*`, código VISO y estado read-only de `public.operational_role_permissions` y `public.operational_roles`. |
| OPERATIVA | NOT_APPLICABLE | No se cambian turnos, grants efectivos, asignaciones, check-ins ni acciones de trabajadores durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, `operational_role_permissions`, `operational_roles`, migraciones, RLS, RPC ni contratos distribuidos. |

---

#### 22. Criterios de aceptación

- [ ] Se administran exclusivamente los doce `OperationalRoleCode`.
- [ ] `propietario_admin` queda excluido.
- [ ] No existe solapamiento entre roles base y operativos.
- [ ] El universo de identidad conserva 140 `PermissionKey` activas.
- [ ] El snapshot conserva exactamente 240 grants y 240 pares únicos.
- [ ] Los conteos por rol son 20, 11, 11, 11, 11, 21, 16, 16, 16, 36, 16 y 55.
- [ ] Se conservan 218 `DIRECT_OPERATIONAL` y 22 `OPERATIONAL_COMPONENT`.
- [ ] Se conservan 174 `BASE_OR_OPERATIONAL`, 44 `OPERATIONAL_ONLY`, 22 `BASE_AND_OPERATIONAL` y 0 `BASE_ONLY`.
- [ ] Se conservan 19 grants FOGO, 181 NEXO, 9 ORIGO y 31 PULSO.
- [ ] La huella contractual permanece `sha256:3e28cb780c346fbc5cf583fe9cf20d1a88333c4fd459fc233380d9e627c6f94f`.
- [ ] La matriz continúa siendo `ALLOW_ONLY`.
- [ ] `BASE_ONLY` no puede agregarse al carril operativo.
- [ ] `OPERATIONAL_COMPONENT` solo puede representar `BASE_AND_OPERATIONAL`.
- [ ] Un grant operativo nunca reemplaza turno, rol efectivo, sede, área o recurso.
- [ ] No se introduce alcance operativo global.
- [ ] El check-in se exige conforme al contrato exacto y no mediante una regla simplificada global.
- [ ] Las cinco acciones `operational_grants.*` se autorizan independientemente.
- [ ] Solo `propietario` y `gerente_general` poseen actualmente las cinco capacidades administrativas del snapshot base.
- [ ] Toda mutación sensible aplica reautenticación, segregación y auditoría.
- [ ] No existe autoaprobación ni autoafectación unilateral.
- [ ] Ausencia, suspensión, revocación y deny explícito permanecen separados.
- [ ] La tabla AS-IS de 32 filas no se declara equivalente al dataset canónico de 240.
- [ ] `public.operational_roles` AS-IS no convierte `propietario_admin` en rol canónico.
- [ ] No se absorben responsabilidades de `VISO-AUTH-005`, `VISO-AUTH-006` ni `VISO-AUTH-010` a `VISO-AUTH-012`.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 23. Límites

Esta tarea no:

- modifica código de VISO;
- crea una pantalla física de administración;
- modifica `/operations/preview`;
- modifica `/operations/site-roles`;
- modifica `@vento/contracts`;
- modifica `operational-roles.json`;
- modifica `operational-role-grants.jsonl`;
- modifica `public.operational_roles`;
- modifica `public.operational_role_permissions`;
- elimina `propietario_admin`;
- crea migraciones;
- ejecuta SQL de escritura;
- modifica RLS;
- modifica RPC;
- modifica triggers;
- modifica grants PostgreSQL;
- crea nuevos roles;
- crea nuevos permisos;
- crea nuevos scopes;
- administra la matriz base;
- administra disponibilidad de roles por sede;
- administra disponibilidad de roles por área;
- administra perfiles operativos;
- asigna roles a trabajadores o turnos;
- cambia check-ins;
- crea excepciones individuales;
- crea denegaciones;
- ejecuta simulaciones;
- selecciona package;
- prepara package gate;
- aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la unidad física se resolverá únicamente mediante el package y gate aplicables.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-003 — Administrar permisos por rol base`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-004 — Administrar permisos por rol operativo`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-005 — Administrar roles permitidos por sede`


### ✅ VISO-AUTH-005 — Administrar roles permitidos por sede

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-004 — Administrar permisos por rol operativo
**Tarea siguiente:** VISO-AUTH-006 — Administrar roles permitidos por área
**Tipo de tarea:** documental; definición del contrato administrativo de elegibilidad rol operativo × sede, separado de permisos, áreas, perfiles de trabajador, turnos y autorización efectiva
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá administrar la disponibilidad de los doce roles operativos canónicos por sede operativa elegible, sin convertir esa relación territorial en permiso, perfil de trabajador, rol de turno ni autorización final.

La unidad lógica de esta tarea es:

```text
site_id
+
operational_role_code
→
RELACIÓN EXPLÍCITA DE ELEGIBILIDAD POR SEDE
```

La regla raíz queda:

```text
SEDE OPERATIVA ELEGIBLE
+
OperationalRoleCode CANÓNICO
+
RELACIÓN ACTIVA ROL × SEDE
→
ROL DISPONIBLE PARA SER EVALUADO EN ESA SEDE
```

Y nunca:

```text
ROL PERMITIDO EN SEDE
→ PERMISO CONCEDIDO
```

ni:

```text
ROL PERMITIDO EN SEDE
→ ROL EFECTIVO DEL TRABAJADOR
```

ni:

```text
ROL PERMITIDO EN SEDE
→ AUTORIZACIÓN FINAL
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin reescribir:

- `ADR-AUTH-001`;
- `AUTH-MOD-005` — catálogo operativo separado;
- `AUTH-MOD-007` — sede asignada, sede activa y elegibilidad operativa;
- `AUTH-MOD-008` — área asignada, área activa y relación sede–área;
- `AUTH-MOD-009` y `AUTH-MOD-010` — turno publicado y contexto operativo;
- `AUTH-RBAC-008` a `AUTH-RBAC-019` — matrices de los doce roles operativos;
- `AUTH-RBAC-025` — dataset operativo canónico;
- `AUTH-RBAC-027` y `AUTH-RBAC-028` — separación entre carril base y operativo y compatibilidad contextual;
- `VISO-AUTH-002` — catálogo administrativo de doce roles operativos;
- `VISO-AUTH-004` — permisos por rol operativo y frontera con la matriz territorial;
- `SHELL-CON-005` — contrato compartido de roles operativos.

La fuente de identidad del rol continúa siendo `OperationalRoleCode@1.0.0`.

La fuente del catálogo de sedes continúa siendo `public.sites`, pero no todo registro de ese catálogo es una sede operativa elegible.

La administración de VISO no crea nuevos códigos de rol ni nuevos códigos de sede.

---

#### 3. Identidad de la relación por sede

La identidad lógica de una regla de esta tarea es:

```text
(site_id, operational_role_code)
```

donde:

- `site_id` identifica una sede operativa elegible;
- `operational_role_code` pertenece exactamente al catálogo canónico de doce roles;
- la relación declara elegibilidad territorial a nivel de sede;
- una misma pareja no puede existir de forma ambigua o duplicada.

No forman parte de la identidad site-level:

- `area_id`;
- `area_kind`;
- `employee_id`;
- `shift_id`;
- `permission_key`;
- `is_default`;
- nombre visible de la sede;
- etiqueta visible del rol;
- familia funcional;
- punto físico de check-in o checkout.

Una etiqueta o nombre visible no sustituye ninguno de los dos identificadores estables.

---

#### 4. Universo de sedes operativas elegibles

Una sede solo puede participar en esta matriz cuando:

1. existe en el catálogo canónico de sedes;
2. está activa;
3. es utilizable como sede operativa o laboral;
4. no es un punto físico usado únicamente para marcación;
5. no es un entorno aislado de revisión;
6. no está oculta de la operación;
7. su identidad es resoluble de forma inequívoca.

El corte remoto vigente contiene exactamente cinco sedes que satisfacen la proyección operativa actualmente utilizada por VISO:

| Código de sede | Sede | Tipo contractual observado |
| --- | --- | --- |
| `CENTRO_PROD` | Centro de Producción | `production_center` |
| `MOLKA_PRINCIPAL` | Molka | `satellite` |
| `SAUDO` | Saudo | `satellite` |
| `VENTO_CAFE` | Vento Café | `satellite` |
| `VENTO_GROUP` | Vento Group | `admin` |

El baseline actual excluye expresamente:

| Código | Motivo de exclusión |
| --- | --- |
| `APP-REVIEW` | Entorno aislado de revisión; no es sede laboral operativa ordinaria. |
| `pickup_camioneta_principal` | Punto físico de marcación; no define la sede operativa ni concede territorio. |

La proyección física `viso_operational_sites` filtra actualmente por sede activa y `operational_visibility = operational`. Esa vista es evidencia AS-IS compatible con este corte, no una autorización para que una futura clasificación desconocida se convierta automáticamente en sede elegible.

Una nueva sede futura deberá primero ser una sede operativa válida según el catálogo y su gobierno antes de poder recibir relaciones rol × sede.

---

#### 5. Matriz inicial de roles permitidos por sede

El baseline documental adopta exclusivamente las dieciséis relaciones activas y únicas observadas en el corte remoto porque:

- todas pertenecen a las cinco sedes operativas elegibles;
- todas utilizan uno de los doce `OperationalRoleCode`;
- cubren los doce roles canónicos;
- no contienen duplicados site-level;
- son coherentes con las familias y funciones operativas ya aprobadas;
- no requieren inferir nuevas relaciones.

La matriz queda:

| Sede | Roles operativos permitidos | Cantidad |
| --- | --- | ---: |
| `CENTRO_PROD` — Centro de Producción | `bodeguero`; `conductor_logistica`; `produccion_cocina`; `produccion_panaderia`; `produccion_reposteria` | 5 |
| `MOLKA_PRINCIPAL` — Molka | `operador_integral_satelite` | 1 |
| `SAUDO` — Saudo | `barista_satelite`; `cajero_satelite`; `cocinero_satelite`; `servicio_salon` | 4 |
| `VENTO_CAFE` — Vento Café | `barista_satelite`; `cajero_satelite`; `cocinero_satelite`; `mostrador_satelite`; `servicio_salon` | 5 |
| `VENTO_GROUP` — Vento Group | `gerencia_operativa` | 1 |
| **Total** | **12 roles canónicos cubiertos** | **16** |

No se agrega ninguna relación adicional por semejanza de nombre, tipo de sede, familia funcional, uso histórico o conveniencia de interfaz.

---

#### 6. Invariantes cuantitativos del baseline

La proyección site-level inicial queda cerrada con:

```text
sedes operativas elegibles = 5
relaciones activas rol × sede = 16
relaciones únicas rol × sede = 16
roles operativos cubiertos = 12 de 12
duplicados rol × sede = 0
sedes operativas sin rol permitido = 0
relaciones fuera del universo de sedes elegibles = 0
```

Estos conteos representan el baseline documental de esta tarea.

No son una regla que obligue a conservar para siempre cinco sedes o dieciséis relaciones. Una evolución futura deberá modificar explícitamente la configuración canónica aplicable y conservar trazabilidad; nunca se inferirá automáticamente desde `site_type`, familia de rol o una nueva fila física.

---

#### 7. Reglas por familia y sede

##### 7.1 Operación satélite

Los roles de familia satélite no se habilitan automáticamente en todas las sedes `satellite`.

Cada relación debe existir explícitamente.

Por tanto:

```text
site_type = satellite
≠
todos los roles satélite permitidos
```

El baseline distingue:

- Molka mediante `operador_integral_satelite`;
- Saudo mediante cuatro roles explícitos;
- Vento Café mediante cinco roles explícitos.

`operador_integral_satelite` no es la unión automática de los demás roles y no convierte una sede pequeña en una superficie de privilegio amplio.

##### 7.2 Producción

Los roles `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria` están permitidos por sede únicamente en `CENTRO_PROD` dentro del baseline.

La especialidad de área permanece separada y será gobernada por `VISO-AUTH-006`.

##### 7.3 Logística

`bodeguero` y `conductor_logistica` están permitidos por sede en `CENTRO_PROD` dentro del baseline.

La relación de `conductor_logistica` con Centro de Producción no convierte sus puntos físicos de entrada o salida en sedes operativas, ni le concede operación organizacional global.

##### 7.4 Coordinación

`gerencia_operativa` está permitida por sede en `VENTO_GROUP` dentro del baseline.

Ese rol continúa sin ser:

- rol base;
- administrador global;
- bypass;
- wildcard;
- sustituto de `gerente` o `gerente_general`.

Una relación futura con otra sede requeriría una configuración explícita; no se hereda por la familia `gerencia`.

---

#### 8. Relación entre sede y área

Esta tarea define únicamente el nivel de sede.

La dependencia hacia `VISO-AUTH-006` queda:

```text
ROL PERMITIDO EN ÁREA
→ requiere
ROL PERMITIDO EN LA SEDE PADRE
```

Por tanto:

```text
area_id válido
+
rol permitido en área
+
rol NO permitido en sede
→ configuración inválida
```

Una relación site-level no demuestra, por sí sola, que el rol pueda operar en cualquier área de la sede.

Para roles que normalmente requieren área, la relación por sede es solo el dominio padre sobre el cual `VISO-AUTH-006` podrá definir compatibilidad más específica.

Para roles que pueden operar site-wide, la ausencia de `area_id` no significa organización completa ni todas las sedes.

---

#### 9. `is_default` no es autoridad site-level

La elegibilidad rol × sede no define un rol predeterminado para todos los trabajadores de la sede.

El estado físico actual contiene `is_default`, pero su unicidad vigente está asociada a sede + área y no a la pareja lógica site-level de esta tarea.

Por tanto:

```text
rol permitido en sede
≠ rol default de la sede
≠ rol default del trabajador
≠ rol del turno
```

`VISO-AUTH-005` no asigna semántica contractual nueva a `is_default`.

La selección predeterminada y la asignación efectiva deberán permanecer en las tareas de área, perfil y turno que correspondan, sin convertir un default de interfaz en autorización.

---

#### 10. Efecto de una relación activa o inactiva

Una relación activa rol × sede significa únicamente que el rol es elegible para ser usado en esa sede dentro de una configuración operativa válida.

Una relación inactiva no podrá utilizarse para crear una nueva asignación operativa que dependa de esa elegibilidad.

Cambiar la disponibilidad no autoriza a reescribir silenciosamente:

- turnos históricos;
- asistencia histórica;
- eventos auditados;
- decisiones de autorización históricas.

Los turnos abiertos, futuros o todavía no ejecutados que queden incompatibles deberán ser revalidados por las tareas de turno y compatibilidad correspondientes; esta tarea no define cancelación automática ni mutación retroactiva.

---

#### 11. Validación de una mutación administrativa

Una modificación de la matriz site-level solo puede considerarse válida cuando:

1. el `site_id` existe;
2. la sede está activa y es operativamente elegible;
3. la sede no es APP-REVIEW, punto exclusivo de marcación, superficie técnica aislada ni registro oculto para operación;
4. el rol pertenece a los doce `OperationalRoleCode`;
5. el rol está vigente;
6. no se usa `propietario_admin`;
7. no se usa un rol base ni oficio legacy;
8. no existe una relación duplicada para la misma pareja rol × sede;
9. el cambio no modifica permisos del rol;
10. el cambio no crea una relación de área;
11. el actor administrativo tiene autoridad explícita y territorio suficiente;
12. el servidor revalida la sede y el rol, sin confiar en valores del cliente;
13. la mutación puede conservar trazabilidad;
14. cualquier contradicción con el catálogo o el territorio falla cerrada.

No se habilitan roles por prefijo, familia, tipo de sede o coincidencia de etiquetas.

---

#### 12. Autoridad administrativa y territorio del administrador

La relación rol × sede es configuración de seguridad operacional.

Su administración debe cumplir simultáneamente:

```text
CAPACIDAD ADMINISTRATIVA EXPLÍCITA
+
ACTOR ADMINISTRATIVO VÁLIDO
+
SEDE OBJETIVO DENTRO DE SU COBERTURA
+
VALIDACIÓN EN SERVIDOR
→ MUTACIÓN POSIBLE
```

El rol base `gerente` no concede administración global por su nombre.

La cobertura del administrador y la sede objetivo deberán resolverse antes de escribir.

El catálogo vigente no contiene una clave específica dedicada a “administrar roles permitidos por sede”. Esta tarea no inventa una.

La vinculación definitiva de estas mutaciones a una capacidad administrativa canónica y a su segregación pertenece a `VISO-AUTH-019 — Restringir quién administra seguridad`.

Condición exacta de salida de ese carryover:

```text
la implementación física no podrá habilitar mutaciones site-role
hasta que cada escritura tenga
capacidad administrativa explícita
+
territorio del actor validado
+
autorización de servidor
+
auditoría
```

La ausencia de esa vinculación no bloquea la definición documental de la matriz, pero sí bloquea declarar conforme una futura superficie física de escritura.

---

#### 13. Consumo por planificación y turnos

La matriz por sede es un prerrequisito de elegibilidad para la programación operativa.

`VISO-AUTH-010` solo podrá asignar un rol operativo a un turno cuando:

1. la sede del turno sea operativa y válida;
2. exista una relación activa rol × sede;
3. si el rol requiere área, exista además compatibilidad de área definida por `VISO-AUTH-006`;
4. el trabajador sea elegible para la sede;
5. se satisfagan las demás condiciones de planificación.

La relación rol × sede no asigna el rol al trabajador.

`VISO-AUTH-011` y `VISO-AUTH-012` deberán detectar turnos sin rol o incompatibles con la configuración territorial vigente, sin reinterpretar esta matriz como permiso.

---

#### 14. Reconciliación AS-IS de Supabase

El corte remoto read-only observado contiene:

```text
public.site_operational_roles
filas activas = 16
filas inactivas = 0
pares site_id + role_code únicos = 16
roles cubiertos = 12
sedes operativas cubiertas = 5 de 5
filas fuera de sedes operativas = 0
```

La tabla física combina actualmente:

```text
site_id
area_id opcional
role_code
is_default
is_active
```

y posee índices de unicidad tanto para sede + área + rol como para sede + rol.

Esta tarea canonicaliza únicamente la relación site-level:

```text
site_id + operational_role_code
```

No convierte el shape físico actual, el índice site + role, el campo `area_id` ni la semántica de `is_default` en contrato de esta tarea.

La materialización de `VISO-AUTH-006` deberá reconciliar el nivel área sin depender de una restricción física accidental que impida representar el contrato aprobado.

---

#### 15. Reconciliación AS-IS de catálogo y RPC

El runtime observado todavía presenta una diferencia entre catálogo físico y catálogo canónico:

```text
vento_operational_roles_v1 = 13 roles activos
OperationalRoleCode canónico = 12 roles
diferencia legacy = propietario_admin
```

`propietario_admin` permanece excluido de esta tarea aunque la vista física lo muestre.

La RPC observada:

```text
upsert_site_operational_role(uuid, uuid, text, boolean, boolean)
```

valida que:

- exista `site_id`;
- el rol físico exista y esté activo;
- un `area_id` indicado pertenezca a la sede;
- el default sea único en la combinación física correspondiente.

Sin embargo, el corte observado no demuestra dentro de esa función:

- pertenencia al catálogo canónico de doce roles;
- elegibilidad operacional de la sede;
- exclusión de APP-REVIEW o puntos de marcación;
- capacidad administrativa exacta del actor;
- límite territorial del administrador.

Además, la función es `SECURITY DEFINER` y el rol `authenticated` conserva permiso de ejecución en el corte observado.

Por tanto, esa RPC es evidencia AS-IS y no autoridad TO-BE para esta tarea.

---

#### 16. Reconciliación AS-IS de seguridad y VISO

La política RLS observada para administrar `site_operational_roles` permite actualmente la operación a condiciones nominales de owner, global manager o manager.

Eso no demuestra todavía el requisito canónico de:

```text
capacidad administrativa explícita
+
territorio autorizado del actor
```

La superficie actual de VISO `/operations/site-roles`:

- carga `viso_operational_sites`;
- carga `vento_operational_roles_v1`;
- carga `vento_site_operational_role_matrix_v1`;
- crea mediante `upsert_site_operational_role`;
- actualiza y elimina directamente sobre `site_operational_roles`;
- usa `requireAppAccess` para acceso general a VISO.

La superficie es evidencia funcional existente.

No se declara conforme a este contrato por su sola existencia porque todavía deberá demostrar:

- exclusión contractual de `propietario_admin`;
- validación explícita de autoridad administrativa;
- límite territorial por escritura;
- separación entre nivel sede y nivel área;
- coherencia de create, update y delete;
- fallo cerrado equivalente entre UI, Server Action, RPC y RLS.

Los propietarios documentales de la restricción administrativa permanecen en `VISO-AUTH-019`; las protecciones de escritura y territorio permanecen además en las tareas canónicas de servidor y base de datos ya existentes.

---

#### 17. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Sede inexistente | Rechazar |
| Sede inactiva | Rechazar |
| APP-REVIEW | Rechazar como sede operativa ordinaria |
| Punto exclusivo de check-in o checkout | Rechazar como sede operativa |
| Sede oculta o no operativa | Rechazar |
| Rol desconocido o inactivo | Rechazar |
| `propietario_admin` | Rechazar |
| Rol base u oficio legacy | Rechazar |
| Par rol × sede duplicado o ambiguo | Rechazar |
| Inferencia automática por familia o `site_type` | Rechazar |
| Área que intenta introducir un rol no permitido en la sede | Rechazar |
| Actor sin capacidad administrativa explícita | Rechazar |
| Sede objetivo fuera de la cobertura del administrador | Rechazar |
| Cliente que envía una sede o rol no revalidado | Rechazar |
| Auditoría o trazabilidad requerida no persistible | No guardar |
| Discrepancia entre UI y servidor | Prevalece servidor; no guardar |
| Versión contractual incompatible | Rechazar |

---

#### 18. Handoff contractual hacia VISO-AUTH-006

`VISO-AUTH-006` recibe un dominio padre cerrado:

```text
5 sedes operativas elegibles en el baseline
+
16 relaciones site-level activas y únicas
+
12 OperationalRoleCode cubiertos
+
0 pares inferidos
+
0 relaciones fuera del universo operativo
```

La tarea siguiente deberá administrar compatibilidad por área sin alterar la matriz site-level definida aquí.

Reglas de handoff:

1. toda relación de área debe tener una relación site-level padre válida;
2. un área no puede habilitar un rol que la sede no permite;
3. `area_id = null` no significa todas las áreas ni todas las sedes;
4. la existencia de un rol site-wide debe conservar una semántica explícita y no global;
5. los defaults físicos actuales no se interpretan como autorización;
6. la identidad de los doce roles permanece intacta;
7. los 240 grants de `VISO-AUTH-004` permanecen intactos.

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea concreta en VISO reglas de elegibilidad territorial, administración explícita, compatibilidad de sede, catálogo operativo y fallo cerrado que ya están protegidas por requisitos vigentes. No introduce una nueva identidad de rol, una nueva identidad de sede, una modalidad de autorización, un scope contractual ni una regla empresarial adicional que requiera ampliar el registro.

---

#### 20. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza la cobertura vigente:

- `TREQ-AUTH-001` — un nombre o lista de roles no concede autorización final;
- `TREQ-AUTH-004` — todos los evaluadores deben producir decisiones coherentes para el mismo contexto;
- `TREQ-AUTH-007` — administración de roles operativos y disponibilidad por sede o área exige capacidad administrativa explícita y territorio autorizado;
- `TREQ-AUTH-008` — operación exige contexto válido y compatibilidad de sede y área;
- `TREQ-AUTH-009` — la sede y el área efectivas deben resolverse determinísticamente y los cruces territoriales se deniegan;
- `TREQ-AUTH-010` — las matrices operativas preservan segregación de funciones;
- `TREQ-SHELL-041` — el catálogo operativo conserva exactamente doce roles y excluye `propietario_admin`;
- `TREQ-VISO-001` — la configuración administrativa de VISO debe producir el mismo resultado consumido por las aplicaciones operativas.

Esta trazabilidad no cambia estado, contenido, paquete, evidencia ni secuencia de ningún requisito.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de la rama documental local. |
| REMOTA | PASS | Se contrastaron `main`, continuidad, topología, políticas, VISO-AUTH-002/004, modelo territorial, catálogo de roles, catálogo de permisos, VISO `/operations/site-roles` y el corte read-only de sedes, matriz site-role, RPC, RLS y catálogo operativo en Supabase. |
| OPERATIVA | NOT_APPLICABLE | No se modifican relaciones site-role, trabajadores, turnos, permisos efectivos ni operación real durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, `site_operational_roles`, RPC, RLS, contratos, migraciones ni datos. |

---

#### 22. Criterios de aceptación

- [ ] La relación site-level se identifica por `site_id + operational_role_code`.
- [ ] Se administran exclusivamente los doce `OperationalRoleCode` canónicos.
- [ ] `propietario_admin`, roles base y oficios legacy quedan excluidos.
- [ ] El baseline contiene exactamente cinco sedes operativas elegibles.
- [ ] APP-REVIEW y el punto de marcación observado quedan fuera del universo de sedes operativas ordinarias.
- [ ] El baseline contiene exactamente dieciséis pares activos y únicos rol × sede.
- [ ] Los dieciséis pares cubren los doce roles canónicos.
- [ ] Las cinco sedes operativas del baseline tienen al menos un rol permitido.
- [ ] No existe ninguna relación del baseline fuera del universo de sedes operativas.
- [ ] `CENTRO_PROD` conserva cinco roles; `MOLKA_PRINCIPAL` uno; `SAUDO` cuatro; `VENTO_CAFE` cinco; `VENTO_GROUP` uno.
- [ ] Ningún rol se habilita automáticamente por familia o `site_type`.
- [ ] `operador_integral_satelite` no se convierte en unión automática de roles.
- [ ] `gerencia_operativa` no se convierte en administrador global ni bypass.
- [ ] La relación de `conductor_logistica` no convierte un punto de check-in en sede operativa.
- [ ] Una relación site-level no concede permisos.
- [ ] Una relación site-level no asigna trabajadores.
- [ ] Una relación site-level no asigna el rol efectivo de un turno.
- [ ] Una relación de área futura exige una relación site-level padre válida.
- [ ] `is_default` no adquiere autoridad site-level en esta tarea.
- [ ] La mutación exige autoridad administrativa explícita y territorio suficiente.
- [ ] La ausencia actual de una clave dedicada a esta administración no produce una clave inventada.
- [ ] `VISO-AUTH-019` conserva la propiedad de vincular las mutaciones a la autoridad administrativa canónica antes de habilitar escritura conforme.
- [ ] La RPC y RLS AS-IS no se declaran conformes por su sola existencia.
- [ ] La pantalla `/operations/site-roles` no se declara implementación canónica completa por su sola existencia.
- [ ] `VISO-AUTH-006` recibe exactamente el dominio site-level y no puede ampliarlo por inferencia.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 23. Límites

Esta tarea no:

- modifica código de VISO;
- modifica `/operations/site-roles`;
- modifica `/operations/preview`;
- modifica `@vento/contracts`;
- modifica `operational-roles.json`;
- modifica `operational-role-grants@1.0.0`;
- modifica `public.sites`;
- modifica `public.operational_roles`;
- modifica `public.site_operational_roles`;
- modifica `public.vento_operational_roles_v1`;
- modifica `public.vento_site_operational_role_matrix_v1`;
- modifica `public.upsert_site_operational_role`;
- modifica RLS, RPC, triggers o grants PostgreSQL;
- crea migraciones;
- ejecuta SQL de escritura;
- crea roles operativos;
- crea sedes;
- crea permisos;
- crea scopes;
- administra grants operativos;
- administra roles permitidos por área;
- administra perfiles operativos por trabajador;
- asigna sedes o áreas a trabajadores;
- asigna roles a turnos;
- crea excepciones individuales;
- crea denegaciones;
- ejecuta simulaciones;
- define quién administra seguridad fuera del carryover reservado a `VISO-AUTH-019`;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá únicamente mediante el package y gate aplicables.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-004 — Administrar permisos por rol operativo`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-005 — Administrar roles permitidos por sede`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-006 — Administrar roles permitidos por área`


### ✅ VISO-AUTH-006 — Administrar roles permitidos por área

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-005 — Administrar roles permitidos por sede
**Tarea siguiente:** VISO-AUTH-007 — Administrar perfiles operativos por trabajador
**Tipo de tarea:** documental; definición del contrato administrativo de elegibilidad rol operativo × área, subordinado a la matriz rol × sede y separado de permisos, perfiles de trabajador, turnos y autorización efectiva
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá administrar la compatibilidad entre roles operativos canónicos y áreas concretas dentro de una sede previamente habilitada, sin convertir esa compatibilidad en permiso, perfil individual, selección automática, rol efectivo del turno ni autorización final.

La unidad lógica de una habilitación exacta queda:

```text
site_id
+
area_id
+
operational_role_code
→
EXACT_BINDING
```

con la invariante:

```text
areas.site_id
=
site_id de la relación padre rol × sede
```

La regla raíz es:

```text
ROL PERMITIDO EN SEDE
+
ÁREA ACTIVA DE ESA SEDE
+
ROL OPERATIVO CANÓNICO
+
BINDING DE ÁREA EXPLÍCITO Y ACTIVO
→
ROL ELEGIBLE EN ESA ÁREA
```

Y nunca:

```text
area_id = null
→ todas las áreas
```

ni:

```text
una sola área visible
→ área inferida
```

ni:

```text
rol permitido en área
→ permiso concedido
```

ni:

```text
rol permitido en área
→ rol efectivo del turno
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin reescribir:

- `ADR-AUTH-001`;
- `AUTH-MOD-005` — catálogo operativo separado;
- `AUTH-MOD-007` — sede asignada y sede activa;
- `AUTH-MOD-008` — área asignada, área activa, pertenencia área–sede y áreas site-wide;
- `AUTH-MOD-009` y `AUTH-MOD-010` — turno publicado y contexto operativo;
- `AUTH-RBAC-008` a `AUTH-RBAC-019` — matrices de los doce roles operativos;
- `AUTH-RBAC-025`, `AUTH-RBAC-027` y `AUTH-RBAC-028`;
- `AUTH-SIM-003` — sede simulada;
- `AUTH-SIM-004` — semántica aprobada de binding de área;
- `AUTH-SIM-005` — turno simulado y compatibilidad contextual;
- `VISO-AUTH-002` — catálogo administrativo de roles operativos;
- `VISO-AUTH-004` — permisos por rol operativo;
- `VISO-AUTH-005` — dominio padre rol operativo × sede;
- `SHELL-CON-005` — contrato compartido de roles operativos.

La identidad de rol continúa gobernada por `OperationalRoleCode@1.0.0`.

La identidad del área procede de `public.areas`. El nombre visible y `area_kind` son atributos de clasificación o presentación y no sustituyen `area_id`.

---

#### 3. Dependencia obligatoria del dominio padre

`VISO-AUTH-006` no puede crear territorio operativo nuevo por debajo de una sede que no permita el rol.

La relación obligatoria es:

```text
VISO-AUTH-005
(site_id, operational_role_code)
        ↓
VISO-AUTH-006
(site_id, area_id, operational_role_code)
```

Por tanto:

```text
binding de área activo
AND
binding de sede ausente o inactivo
→
CONFIGURACIÓN INVÁLIDA
```

Toda habilitación de área deberá comprobar que:

1. la sede existe y es operativamente elegible;
2. el área existe y está activa;
3. el área pertenece exactamente a esa sede;
4. el rol pertenece a los doce `OperationalRoleCode`;
5. existe una relación padre activa rol × sede;
6. no existe una duplicación ambigua del mismo binding exacto.

`area_id` no puede trasladar un rol hacia otra sede ni ampliar la matriz de `VISO-AUTH-005`.

---

#### 4. Estados contractuales del binding de área

La administración deberá distinguir explícitamente tres estados semánticos:

| Estado | Significado | Efecto |
| --- | --- | --- |
| `EXACT_BINDING` | Existe una relación explícita entre sede, área concreta y rol operativo. | El rol puede ser evaluado para esa área, sujeto al resto del contexto. |
| `AREA_BINDING_UNRESOLVED` | La sede permite el rol, pero no existe un área exacta ni una decisión canónica que permita omitirla. | No se infiere área; una operación que requiera área queda indeterminada o denegada. |
| `NO_AREA_NOT_REQUIRED` | Un contrato canónico explícito determina que esa variante no exige área. | `area_id` permanece nulo sin significar wildcard; solo aplica dentro de la sede y variante autorizadas. |

Regla crítica:

```text
area_id = null
≠
NO_AREA_NOT_REQUIRED
```

`NO_AREA_NOT_REQUIRED` debe provenir de una decisión contractual explícita. Nunca se obtiene automáticamente por ausencia de área, por existir una sola área, por un default, por el nombre del rol o por el tipo de sede.

En el baseline aprobado consumido por esta tarea:

```text
EXACT_BINDING = 13
AREA_BINDING_UNRESOLVED = 3
NO_AREA_NOT_REQUIRED = 0
TOTAL relaciones rol × sede evaluadas = 16
```

---

#### 5. Baseline exacto de vínculos rol–sede–área

Los trece vínculos exactos ya materializados documentalmente por el contrato aprobado de simulación se convierten en baseline de administración para VISO:

| Sede | Área canónica | Rol operativo | Estado |
| --- | --- | --- | --- |
| `CENTRO_PROD` | `BODEGA` | `bodeguero` | `EXACT_BINDING` |
| `CENTRO_PROD` | `COC-CAL` | `produccion_cocina` | `EXACT_BINDING` |
| `CENTRO_PROD` | `PAN-GALL` | `produccion_panaderia` | `EXACT_BINDING` |
| `CENTRO_PROD` | `REPOSTERIA` | `produccion_reposteria` | `EXACT_BINDING` |
| `SAUDO` | `COCINA_BARRA` | `barista_satelite` | `EXACT_BINDING` |
| `SAUDO` | `CAJA` | `cajero_satelite` | `EXACT_BINDING` |
| `SAUDO` | `COCINA_BARRA` | `cocinero_satelite` | `EXACT_BINDING` |
| `SAUDO` | `SALON` | `servicio_salon` | `EXACT_BINDING` |
| `VENTO_CAFE` | `BARRA` | `barista_satelite` | `EXACT_BINDING` |
| `VENTO_CAFE` | `CAJA` | `cajero_satelite` | `EXACT_BINDING` |
| `VENTO_CAFE` | `COCINA` | `cocinero_satelite` | `EXACT_BINDING` |
| `VENTO_CAFE` | `MOSTRADOR` | `mostrador_satelite` | `EXACT_BINDING` |
| `VENTO_CAFE` | `SALON` | `servicio_salon` | `EXACT_BINDING` |

Este baseline contiene:

```text
bindings exactos = 13
sedes con al menos un binding exacto = 3
áreas con al menos un binding exacto = 12
roles distintos con binding exacto = 9
bindings duplicados = 0
bindings sin relación padre de sede = 0
```

Compartir una misma área no fusiona roles. En `SAUDO / COCINA_BARRA`, `barista_satelite` y `cocinero_satelite` conservan identidades, permisos y responsabilidades independientes.

---

#### 6. Vínculos de área no resueltos

Las tres relaciones restantes del baseline de sede se conservan exactamente como no resueltas:

| Sede | Rol operativo | Área | Estado | Regla |
| --- | --- | --- | --- | --- |
| `CENTRO_PROD` | `conductor_logistica` | — | `AREA_BINDING_UNRESOLVED` | No se infiere Bodega, Ruta, General ni otra área. |
| `MOLKA_PRINCIPAL` | `operador_integral_satelite` | — | `AREA_BINDING_UNRESOLVED` | No se infiere Mostrador, General ni todas las áreas. |
| `VENTO_GROUP` | `gerencia_operativa` | — | `AREA_BINDING_UNRESOLVED` | No se infiere Dirección, Gerencia General ni otra área administrativa. |

Estos tres casos no pueden presentarse como:

```text
General
Todos
Cualquier área
Site-wide
Sin restricción
```

mientras no exista una decisión canónica explícita que cambie su estado.

Condición exacta de salida:

```text
AREA_BINDING_UNRESOLVED
→ EXACT_BINDING
```

solo cuando se configure un `area_id` válido y explícito dentro de la sede padre;

o:

```text
AREA_BINDING_UNRESOLVED
→ NO_AREA_NOT_REQUIRED
```

solo cuando una decisión contractual explícita autorice esa variante sin área.

La simple persistencia de `NULL` no satisface ninguna de las dos condiciones.

---

#### 7. Cardinalidad y unicidad

Una sede puede contener múltiples áreas y una misma área puede permitir múltiples roles operativos.

También puede ser válido que el mismo rol operativo sea habilitado en más de un área de la misma sede si cada relación es explícita y compatible con el contrato.

Por tanto, la cardinalidad conceptual es muchos-a-muchos:

```text
área
↔
OperationalRoleCode
```

dentro del dominio padre de una sede.

La unicidad exigida es:

```text
(site_id, area_id, operational_role_code)
→ máximo una relación lógica activa equivalente
```

No se autoriza la regla más restrictiva:

```text
(site_id, operational_role_code)
→ máximo un área
```

como definición contractual general de `VISO-AUTH-006`.

`site_id` permanece en el tuple de validación para demostrar el dominio padre, pero no es un valor libre: debe coincidir con `areas.site_id`.

---

#### 8. Área exacta y `area_kind`

`area_id` representa el territorio concreto de esta tarea.

`area_kind` puede utilizarse para:

- explicación;
- filtros;
- compatibilidad de permisos que expresamente utilicen tipo de área;
- agrupación administrativa;
- validaciones adicionales de contrato.

No puede utilizarse para inventar un binding exacto.

Regla:

```text
area_kind = cocina
≠
area_id de una cocina concreta
```

Dos sedes pueden poseer áreas de igual tipo o nombre y seguir siendo territorios distintos.

Una relación por `area_kind` en otro contrato de autorización no sustituye el binding exacto rol × área administrado aquí.

---

#### 9. Roles normalmente ligados a área

Los roles ya documentados como normalmente ligados a un área deben conservar una relación exacta antes de utilizarse en un contexto que exija área.

El baseline demuestra bindings exactos para:

- `cajero_satelite`;
- `barista_satelite`;
- `cocinero_satelite`;
- `servicio_salon`;
- `mostrador_satelite`;
- `produccion_cocina`;
- `produccion_panaderia`;
- `produccion_reposteria`;
- `bodeguero`.

La existencia de una relación de sede para cualquiera de ellos no permite omitir el binding de área.

Para `conductor_logistica`, `operador_integral_satelite` y `gerencia_operativa`, esta tarea conserva el estado no resuelto observado; no crea una excepción de área por el nombre o la familia del rol.

---

#### 10. `is_default` como preferencia, no autoridad

Una relación exacta puede coexistir con información física de `is_default`, pero ese flag no crea compatibilidad.

Reglas:

```text
is_default = true
→ puede sugerir una relación ya válida
```

```text
is_default = true
≠ crea binding
≠ autoriza
≠ asigna trabajador
≠ asigna turno
```

Un default solo puede apuntar a una relación que ya sea válida en sede y área.

Cuando un área admite varios roles, como `SAUDO / COCINA_BARRA`, la existencia o ausencia de un default no fusiona roles ni elimina la obligación de conservar una selección operativa inequívoca.

---

#### 11. Alta, cambio, desactivación y retiro

Una operación administrativa sobre la matriz de área deberá conservar identidad y trazabilidad.

##### Alta

Solo puede crear un `EXACT_BINDING` cuando sede, área, rol y relación padre son válidos.

##### Cambio de área

No se interpreta como edición cosmética. Cambia territorio y debe revalidar:

- pertenencia del área a la sede;
- relación padre rol × sede;
- compatibilidad del rol;
- turnos futuros o abiertos afectados;
- perfiles que lo utilicen como sugerencia;
- defaults relacionados.

##### Desactivación

Impide utilizar el binding para nuevas asignaciones o nuevas decisiones efectivas después de la vigencia de la desactivación.

##### Retiro

No elimina ni reescribe historia de:

- turnos ejecutados;
- asistencia;
- auditoría;
- decisiones ya registradas;
- evidencia de configuración.

Una desactivación o retiro puede generar incompatibilidad prospectiva, pero no autoriza una mutación retroactiva silenciosa.

---

#### 12. Validación administrativa de una mutación

Toda mutación de `VISO-AUTH-006` deberá verificar, como mínimo:

1. `site_id` válido y operativamente elegible;
2. `area_id` válido, activo y perteneciente a esa sede;
3. `operational_role_code` dentro de los doce códigos canónicos;
4. rol vigente;
5. relación padre rol × sede activa;
6. ausencia de `propietario_admin`, roles base u oficios legacy;
7. ausencia de duplicado exacto;
8. estado de binding explícito;
9. prohibición de convertir `NULL` en wildcard;
10. prohibición de inferir área desde nombre, `area_kind`, sede, default, perfil o unicidad visual;
11. autoridad administrativa explícita del actor;
12. territorio suficiente del actor administrador;
13. revalidación en servidor;
14. trazabilidad persistible;
15. fallo cerrado ante ambigüedad o versión incompatible.

Los valores enviados desde la interfaz son intención y deben volver a resolverse contra fuentes canónicas antes de escribir.

---

#### 13. Autoridad para administrar seguridad territorial

Administrar compatibilidad rol × área es una operación de seguridad.

Debe satisfacerse:

```text
CAPACIDAD ADMINISTRATIVA EXPLÍCITA
+
ACTOR ADMINISTRATIVO VÁLIDO
+
SEDE OBJETIVO AUTORIZADA
+
ÁREA OBJETIVO AUTORIZADA
+
VALIDACIÓN DE SERVIDOR
+
AUDITORÍA
→
MUTACIÓN POSIBLE
```

El rol base `gerente` no concede administración global por nombre.

El catálogo vigente no contiene una `PermissionKey` dedicada específicamente a “administrar roles permitidos por área”. Esta tarea no inventa una.

La vinculación final de estas escrituras con la capacidad administrativa canónica y su segregación permanece reservada a:

`VISO-AUTH-019 — Restringir quién administra seguridad`.

Condición exacta de salida del carryover:

```text
ninguna implementación de escritura rol × área
se declara conforme
hasta demostrar
capacidad administrativa explícita
+
territorio sede/área del administrador
+
autorización en servidor
+
auditoría
```

---

#### 14. Consumo por perfiles y turnos

Esta tarea define elegibilidad territorial; no define asignación individual.

El encadenamiento posterior queda:

```text
VISO-AUTH-005
rol × sede
+
VISO-AUTH-006
rol × área
        ↓
VISO-AUTH-007
perfil operativo del trabajador
        ↓
VISO-AUTH-010
rol operativo del turno
        ↓
VISO-AUTH-012
validación de incompatibilidad de área
```

Un perfil de trabajador podrá sugerir un rol, pero no crear un binding inexistente.

Un turno solo podrá usar un `area_id` exacto cuando exista compatibilidad válida entre:

```text
sede del turno
+
área del turno
+
rol operativo del turno
```

Si el binding permanece `AREA_BINDING_UNRESOLVED`, una acción o turno que contractualmente requiera área no puede completar el contexto mediante inferencia.

---

#### 15. Prohibición de inferencias para planificación

La planificación no podrá resolver un área mediante:

- única área disponible;
- único rol visible;
- único registro físico;
- `is_default`;
- área primaria del trabajador;
- área seleccionada en interfaz;
- `employees.area_id`;
- nombre del rol;
- `role_family`;
- `area_kind`;
- sede primaria;
- valor histórico de otro turno.

Regla:

```text
ÁREA EFECTIVA
→ área exacta del turno o decisión contractual explícita de no requerir área
```

y nunca:

```text
fallback conveniente
→ área efectiva
```

`VISO-AUTH-010` y `VISO-AUTH-012` deberán consumir esta regla sin ampliar el territorio.

---

#### 16. Reconciliación AS-IS de la superficie VISO

La superficie física actual `/operations/site-roles` combina administración por sede y por área en una sola vista.

El código observado:

- consulta `areas`;
- filtra las áreas visibles por la sede seleccionada;
- permite `area_id` opcional;
- envía `area_id || null`;
- presenta la opción vacía como `General de la sede`;
- renderiza filas sin área como `General`;
- permite `is_default`.

Ese comportamiento es evidencia AS-IS y no contrato TO-BE.

La representación:

```text
area_id = null
→ "General"
```

es insuficiente para el contrato aprobado porque oculta la diferencia entre:

```text
AREA_BINDING_UNRESOLVED
```

y:

```text
NO_AREA_NOT_REQUIRED
```

La futura materialización deberá mostrar esa diferencia explícitamente y no permitirá que una etiqueta visual transforme un estado no resuelto en autorización territorial.

---

#### 17. Reconciliación AS-IS de planificación VISO

El código actual de programación consulta `vento_site_operational_role_matrix_v1` y, al resolver el rol/área, puede seleccionar una fila mediante una cadena que incluye:

1. coincidencia con `area_id` solicitado;
2. fila marcada `is_default`;
3. única fila disponible para el rol;
4. único `area_id` disponible.

Ese comportamiento se clasifica como drift AS-IS frente al contrato aprobado de área cuando una de esas ramas produce un área que no fue seleccionada o resuelta contractualmente de forma explícita.

La regla TO-BE es:

```text
exact match explícito
→ válido
```

mientras:

```text
default
o fila única
o área única
→ no sustituyen binding ni selección exacta
```

La corrección física del flujo de asignación y validación de turnos permanece además dentro de las responsabilidades de `VISO-AUTH-010` y `VISO-AUTH-012`; esta tarea no modifica esos consumidores.

---

#### 18. Reconciliación AS-IS de persistencia

La persistencia observada para `public.site_operational_roles` combina:

```text
site_id
area_id nullable
role_code
is_default
is_active
```

y el estado físico conocido contiene dos restricciones relevantes:

```text
unicidad por site_id + area_id + role_code
```

y:

```text
unicidad por site_id + role_code
```

La primera es compatible con la identidad de un `EXACT_BINDING`.

La segunda no constituye una regla canónica de `VISO-AUTH-006`, porque impediría representar dos bindings explícitos del mismo rol en dos áreas distintas de una misma sede.

El baseline actual no exige todavía esa cardinalidad, pero la implementación física futura deberá reconciliar la restricción antes de declarar soporte completo del contrato muchos-a-muchos.

No se modifica ninguna restricción durante el cierre documental.

---

#### 19. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Sede inexistente, inactiva o no operativa | Rechazar |
| Área inexistente o inactiva | Rechazar |
| Área perteneciente a otra sede | Rechazar |
| Rol fuera de los doce códigos canónicos | Rechazar |
| `propietario_admin`, rol base u oficio legacy | Rechazar |
| Relación padre rol × sede ausente o inactiva | Rechazar |
| Binding exacto duplicado | Rechazar |
| `area_id = null` interpretado como todas las áreas | Rechazar |
| `area_id = null` interpretado automáticamente como `NO_AREA_NOT_REQUIRED` | Rechazar |
| Área inferida por default | Rechazar |
| Área inferida por existir una sola opción | Rechazar |
| Área inferida por nombre, tipo o familia | Rechazar |
| Actor sin capacidad administrativa explícita | Rechazar |
| Área fuera de la cobertura del administrador | Rechazar |
| Auditoría requerida no persistible | No guardar |
| Discrepancia entre UI y servidor | Prevalece servidor; no guardar |
| Versión contractual incompatible | Rechazar |

---

#### 20. Handoff contractual

`VISO-AUTH-007` recibe una matriz territorial que distingue:

```text
16 relaciones padre rol × sede
=
13 EXACT_BINDING
+
3 AREA_BINDING_UNRESOLVED
+
0 NO_AREA_NOT_REQUIRED
```

y conserva:

```text
12 OperationalRoleCode
+
12 áreas con al menos un binding exacto
+
9 roles distintos con binding exacto
+
3 roles con binding de área no resuelto
```

El perfil operativo por trabajador no podrá ampliar esta matriz.

En particular:

1. un perfil no crea una sede permitida;
2. un perfil no crea un área permitida;
3. un perfil no convierte un binding no resuelto en exacto;
4. un perfil no convierte un default en autorización;
5. un perfil no concede permisos;
6. la asignación efectiva continúa reservada al turno;
7. la validación de incompatibilidad continúa reservada a `VISO-AUTH-012`.

---

#### 21. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa en VISO una semántica de área ya protegida por contratos y requisitos vigentes: compatibilidad determinista sede–área–rol, administración territorial explícita, prohibición de inferencias, separación entre configuración y autorización, y coherencia entre VISO y consumidores.

No introduce una nueva identidad de rol, una nueva identidad de área, una modalidad de autorización, un scope, una transición empresarial o una regla de seguridad no cubierta que exija ampliar el Registro Canónico de Requisitos de Prueba.

---

#### 22. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza la cobertura vigente:

- `TREQ-AUTH-001` — una lista o nombre de rol no concede autorización final;
- `TREQ-AUTH-004` — evaluadores distintos deben producir la misma decisión para el mismo actor, sede, área, permiso y contexto;
- `TREQ-AUTH-007` — la administración de disponibilidad por sede o área exige capacidad administrativa explícita y territorio autorizado;
- `TREQ-AUTH-008` — la operación exige rol operativo efectivo y compatibilidad de sede y área;
- `TREQ-AUTH-009` — sede y área deben resolverse determinísticamente y los cruces territoriales se deniegan;
- `TREQ-AUTH-010` — las matrices operativas conservan segregación de funciones;
- `TREQ-SHELL-041` — el catálogo operativo conserva exactamente doce roles y excluye `propietario_admin`;
- `TREQ-VISO-001` — la configuración administrativa de VISO debe producir el mismo resultado que consumen las aplicaciones operativas.

Esta trazabilidad no cambia estado, contenido, paquete, evidencia ni secuencia de ningún requisito.

---

#### 23. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, VISO-AUTH-005, `OperationalRoleCode@1.0.0`, AUTH-SIM-004/005, 04A aplicable y el código VISO de matriz y programación. El refresco read-only de Supabase fue intentado pero el conector devolvió error de red, por lo que no se incorporaron hechos nuevos de runtime y se conservaron exclusivamente los snapshots canónicos ya aprobados. |
| OPERATIVA | NOT_APPLICABLE | No se modifican bindings, perfiles, turnos, permisos efectivos ni operación real durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, tablas, índices, RPC, RLS, contratos, migraciones ni datos. |

---

#### 24. Criterios de aceptación

- [ ] Se administran exclusivamente los doce `OperationalRoleCode` canónicos.
- [ ] Toda relación de área exige una relación padre rol × sede activa de `VISO-AUTH-005`.
- [ ] `area_id` pertenece exactamente a la sede indicada.
- [ ] El baseline conserva 16 relaciones rol × sede evaluadas.
- [ ] El baseline conserva exactamente 13 `EXACT_BINDING`.
- [ ] El baseline conserva exactamente 3 `AREA_BINDING_UNRESOLVED`.
- [ ] El baseline conserva 0 `NO_AREA_NOT_REQUIRED`.
- [ ] Los trece bindings exactos se distribuyen en Centro de Producción, Saudo y Vento Café sin omisiones.
- [ ] Existen doce áreas distintas con al menos un binding exacto.
- [ ] Existen nueve roles distintos con al menos un binding exacto.
- [ ] `conductor_logistica`, `operador_integral_satelite` y `gerencia_operativa` permanecen no resueltos a nivel de área.
- [ ] Ninguno de los tres casos no resueltos se presenta como General, Todos, site-wide o sin restricción.
- [ ] `NULL` no significa wildcard.
- [ ] `NO_AREA_NOT_REQUIRED` solo puede provenir de una decisión contractual explícita.
- [ ] `area_kind` no sustituye `area_id`.
- [ ] Una misma área puede contener varios roles explícitos sin fusionar autoridad.
- [ ] La identidad lógica exacta conserva `site_id + area_id + operational_role_code`.
- [ ] La cardinalidad contractual no limita un rol a una sola área por sede.
- [ ] `is_default` no crea binding ni autorización.
- [ ] Una desactivación no reescribe historia.
- [ ] Ningún perfil de trabajador amplía la matriz territorial.
- [ ] Ningún turno obtiene área mediante default, fila única, área única, primaria o preferencia visual.
- [ ] La superficie AS-IS que rotula `NULL` como General no se declara conforme por su sola existencia.
- [ ] El fallback AS-IS de planificación se reconoce como drift frente a la resolución explícita.
- [ ] La restricción física `site_id + role_code` no se eleva a regla canónica de área.
- [ ] Toda futura escritura exige capacidad administrativa explícita, territorio y auditoría.
- [ ] `VISO-AUTH-019` conserva la propiedad de cerrar la autoridad administrativa de escritura.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 25. Límites

Esta tarea no:

- modifica código de VISO;
- modifica `/operations/site-roles`;
- modifica programación semanal o mensual;
- modifica `@vento/contracts`;
- modifica `operational-roles.json`;
- modifica `operational-role-grants@1.0.0`;
- modifica `public.sites`;
- modifica `public.areas`;
- modifica `public.operational_roles`;
- modifica `public.site_operational_roles`;
- modifica vistas de la matriz;
- modifica índices o constraints;
- modifica RPC, RLS, triggers o grants PostgreSQL;
- crea migraciones;
- ejecuta SQL de escritura;
- resuelve arbitrariamente los tres `AREA_BINDING_UNRESOLVED`;
- crea un `NO_AREA_NOT_REQUIRED` para el baseline actual;
- crea roles, sedes, áreas, permisos o scopes;
- administra permisos por rol;
- administra perfiles operativos por trabajador;
- asigna sedes o áreas al trabajador;
- asigna el rol operativo al turno;
- valida o corrige físicamente turnos incompatibles;
- crea excepciones individuales;
- crea denegaciones;
- ejecuta simulaciones;
- define quién administra seguridad fuera del carryover de `VISO-AUTH-019`;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 26. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-005 — Administrar roles permitidos por sede`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-006 — Administrar roles permitidos por área`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-007 — Administrar perfiles operativos por trabajador`

### ✅ VISO-AUTH-007 — Administrar perfiles operativos por trabajador

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-006 — Administrar roles permitidos por área
**Tarea siguiente:** VISO-AUTH-008 — Administrar sedes asignadas
**Tipo de tarea:** documental; definición del contrato administrativo de perfiles operativos predeterminados por trabajador y sede, exclusivamente como configuración de planificación y sin convertir el perfil en asignación territorial, rol efectivo, permiso ni autorización
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá administrar la configuración operativa habitual de un trabajador en una sede, conservando el perfil como una ayuda de planificación y nunca como fuente de autoridad.

La unidad lógica de perfil queda:

```text
employee_id
+
site_id
→
máximo un perfil operativo
```

Cuando el perfil está activo y posee un rol predeterminado utilizable:

```text
EMPLEADO ACTIVO
+
ASIGNACIÓN ACTIVA DEL EMPLEADO A LA SEDE
+
SEDE OPERATIVA VÁLIDA
+
ROL OPERATIVO CANÓNICO ACTIVO
+
ROL PERMITIDO EN ESA SEDE
+
PUNTOS DE MARCACIÓN COMPATIBLES CUANDO CORRESPONDAN
→
PERFIL OPERATIVO UTILIZABLE PARA PLANIFICACIÓN
```

Su efecto termina en:

```text
configuración habitual
→ valor sugerido al crear o preparar un turno
```

y nunca continúa automáticamente hacia:

```text
perfil
→ rol operativo efectivo
→ permiso
→ autorización
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin reescribir:

- `ADR-AUTH-001`;
- `AUTH-AUD-008` — asignaciones laborales de sede y área;
- `AUTH-AUD-009` — inventario de perfiles operativos por trabajador y sede;
- `AUTH-MOD-001` — identidad laboral y actor efectivo;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-005` — rol operativo y perfil predeterminado;
- `AUTH-MOD-007` — sede asignada y sede activa;
- `AUTH-MOD-008` — área asignada y área activa;
- `AUTH-MOD-009` y `AUTH-MOD-010` — turno publicado y contexto operativo;
- `AUTH-CTX-009` a `AUTH-CTX-013` — contexto territorial y laboral;
- `AUTH-SRV-004` a `AUTH-SRV-009` — frontera de confianza, permiso, sede, área, turno y rol operativo en servidor;
- `VISO-AUTH-002` — catálogo administrativo de doce roles operativos;
- `VISO-AUTH-005` — matriz padre rol operativo × sede;
- `VISO-AUTH-006` — compatibilidad rol operativo × área;
- `SHELL-CON-005` — contrato compartido de roles operativos.

La identidad del rol continúa gobernada por `OperationalRoleCode@1.0.0`.

El perfil no redefine `employee_sites`, `employee_areas`, `site_operational_roles`, el turno ni el catálogo de roles.

---

#### 3. Semántica canónica del perfil

La fuente aprobada ya establece:

```text
default_operational_role
→ valor predeterminado de planificación

active_shift.operational_role
→ rol operativo efectivo
```

y la precedencia:

```text
turno válido
>
perfil operativo predeterminado
```

Por tanto, un perfil:

- puede sugerir el rol al preparar un turno;
- puede sugerir puntos físicos de entrada o salida cuando correspondan;
- puede conservar una configuración habitual por sede;
- no crea `active_shift`;
- no completa silenciosamente un turno sin rol;
- no reemplaza el rol publicado;
- no elige la sede efectiva;
- no elige el área efectiva;
- no resuelve ambigüedad territorial;
- no concede permisos;
- no autoriza acciones empresariales.

En ausencia de turno válido:

```text
active_operational_role = null
```

aunque exista un perfil activo.

---

#### 4. Identidad y cardinalidad

La identidad lógica del perfil es:

```text
(employee_id, site_id)
```

Reglas:

1. cada trabajador puede tener como máximo un perfil por sede;
2. un trabajador puede tener perfiles distintos en varias sedes únicamente cuando tenga asignación laboral válida en cada una;
3. el perfil no se identifica por `default_operational_role`;
4. cambiar el rol predeterminado no crea un segundo perfil;
5. cambiar puntos de marcación no crea un segundo perfil;
6. la desactivación conserva la misma identidad histórica;
7. no se permiten duplicados activos o inactivos para la misma pareja trabajador–sede como mecanismo de versionado paralelo.

La restricción física actual `UNIQUE (employee_id, site_id)` es compatible con esta cardinalidad.

---

#### 5. Forma lógica administrada

El shape físico observado contiene:

```text
id
employee_id
site_id
default_operational_role
default_checkin_site_id
default_checkout_site_id
is_active
notes
created_at
updated_at
created_by
updated_by
```

La semántica administrativa de esta tarea queda:

| Campo | Regla |
| --- | --- |
| `employee_id` | Trabajador objetivo; debe existir y estar laboralmente activo para que un perfil pueda activarse o utilizarse prospectivamente. |
| `site_id` | Sede de la configuración habitual; debe existir, estar activa, ser operativamente elegible y estar asignada al trabajador. |
| `default_operational_role` | Preferencia de planificación; para un perfil activo utilizable debe ser un `OperationalRoleCode` canónico, activo y permitido en `site_id`. |
| `default_checkin_site_id` | Punto físico sugerido de entrada cuando el contrato del rol o del turno lo requiera; no es sede laboral ni territorio. |
| `default_checkout_site_id` | Punto físico sugerido de salida cuando el contrato del rol o del turno lo requiera; no es sede laboral ni territorio. |
| `is_active` | Determina si el perfil puede participar como configuración prospectiva de planificación. |
| `notes` | Contexto administrativo no autoritativo; nunca reemplaza códigos, relaciones o reglas. |
| `created_at`, `updated_at` | Evidencia temporal de configuración. |
| `created_by`, `updated_by` | Actor administrativo atribuible mediante identidad laboral canónica; no deben derivarse de una identidad incompatible. |

Los campos físicos son evidencia AS-IS. Esta tarea define su semántica, no obliga a conservar exactamente el mismo shape durante una futura materialización si el contrato físico requiere una representación más segura o versionada.

---

#### 6. Estado activo, inactivo e incompleto

Un perfil activo solo puede considerarse utilizable para planificación cuando todas las referencias necesarias son válidas.

Para un perfil activo:

```text
employee_id válido y activo
+
site_id válido y asignado
+
default_operational_role válido y permitido
+
requisitos de marcación satisfechos
→ perfil utilizable
```

Un perfil con `default_operational_role = null` no adquiere un rol por fallback.

Si una fila histórica o física conserva:

```text
default_operational_role = null
```

su significado es exclusivamente:

```text
sin rol operativo predeterminado
```

No significa:

- rol base del trabajador;
- último rol usado;
- único rol disponible;
- rol default de la sede;
- rol inferido del área;
- rol de navegación.

Una fila activa sin rol predeterminado no puede utilizarse para completar un turno. Antes de presentarla como perfil de planificación utilizable deberá quedar configurado un rol canónico explícito o permanecer como configuración incompleta sin sugerencia de rol.

Un perfil inactivo permanece como evidencia histórica y no participa en nuevas sugerencias.

---

#### 7. Dependencia obligatoria de la asignación trabajador × sede

El perfil no asigna una sede al trabajador.

La relación obligatoria es:

```text
ASIGNACIÓN LABORAL ACTIVA
employee_sites
        ↓
PERFIL
employee_site_operational_profiles
```

Por tanto:

```text
perfil activo
+
trabajador sin asignación activa a site_id
→ configuración inválida
```

Crear un perfil no puede crear, reactivar ni inferir una fila de `employee_sites`.

La administración de las sedes asignadas permanece reservada a `VISO-AUTH-008`.

Si una asignación trabajador–sede se desactiva posteriormente, el perfil deja de ser utilizable prospectivamente hasta su reconciliación. La historia no se reescribe y la relación laboral no se restaura desde el perfil.

---

#### 8. Dependencia obligatoria del rol permitido por sede

Cuando existe `default_operational_role`, deberá cumplirse:

```text
OperationalRoleCode canónico
+
rol activo
+
relación padre rol × sede activa de VISO-AUTH-005
→ rol elegible como preferencia del perfil
```

No son válidos:

- roles base;
- `propietario_admin`;
- oficios legacy;
- aliases;
- coincidencias parciales;
- nombres visibles;
- roles creados localmente por VISO;
- roles admitidos solamente por una fila física legacy.

El perfil no amplía la matriz de `VISO-AUTH-005`.

---

#### 9. Relación con la matriz de área

El perfil actual es por trabajador y sede. No contiene `default_area_id` ni `default_area_kind`.

Por tanto:

```text
perfil trabajador × sede
≠ asignación trabajador × área
≠ área predeterminada
≠ área efectiva del turno
```

El perfil tampoco puede convertir:

```text
AREA_BINDING_UNRESOLVED
→ EXACT_BINDING
```

El handoff recibido de `VISO-AUTH-006` se conserva:

```text
16 relaciones rol × sede
=
13 EXACT_BINDING
+
3 AREA_BINDING_UNRESOLVED
+
0 NO_AREA_NOT_REQUIRED
```

Un rol puede ser una preferencia de perfil a nivel de sede aun cuando su área siga no resuelta, pero cualquier turno o acción que requiera un área exacta deberá resolverla por su contrato propio.

La administración de áreas asignadas al trabajador permanece reservada a `VISO-AUTH-009`.

---

#### 10. Prohibición de multiplicar perfiles por bindings de área

La matriz territorial puede contener varias filas de área para una misma pareja:

```text
site_id
+
operational_role_code
```

Eso no crea varios perfiles del trabajador para la misma sede.

Una superficie de administración de perfiles deberá deduplicar el dominio padre y presentar la identidad lógica:

```text
site_id + operational_role_code
```

como candidato de preferencia, sin convertir cada binding de área en un perfil distinto.

La unicidad del perfil continúa siendo:

```text
employee_id + site_id
```

---

#### 11. Puntos físicos de entrada y salida

`default_checkin_site_id` y `default_checkout_site_id` son preferencias de punto físico de marcación.

No son:

- sede laboral;
- sede asignada;
- sede operativa;
- área;
- alcance;
- permiso;
- recurso empresarial;
- cobertura administrativa.

Cuando el rol operativo exige marcación externa, el perfil utilizable deberá aportar el punto correspondiente:

```text
requires_external_checkin = true
→ default_checkin_site_id requerido

requires_external_checkout = true
→ default_checkout_site_id requerido
```

Cada punto indicado deberá:

1. existir;
2. estar activo;
3. ser una entidad válida para marcación según el catálogo aplicable;
4. no convertirse en sede asignada del trabajador;
5. no ampliar el territorio del rol;
6. ser revalidado al construir el turno.

Cuando el contrato del rol no exige punto externo, la ausencia del default correspondiente es válida y no debe impedir crear un perfil.

La presencia opcional de un punto no convierte por sí sola una marcación externa en obligatoria; la obligación proviene del contrato del rol o del turno.

---

#### 12. Baseline físico read-only

El corte remoto verificado contiene:

```text
perfiles totales = 1
perfiles activos = 1
trabajadores distintos con perfil = 1
sedes distintas con perfil = 1
trabajadores activos = 40
trabajadores activos con perfil activo = 1
trabajadores activos sin perfil activo = 39
cobertura descriptiva = 2,5 %
```

El único perfil activo observado conserva, sin identificar a la persona:

```text
site_code = CENTRO_PROD
default_operational_role = conductor_logistica
default_checkin_site = pickup_camioneta_principal
default_checkout_site = pickup_camioneta_principal
employee_site_active = true
role_allowed_at_site = true
```

`conductor_logistica` es el único `OperationalRoleCode` canónico que actualmente exige simultáneamente marcación externa de entrada y salida.

El corte físico de `operational_roles` conserva trece filas activas porque todavía incluye el legacy `propietario_admin`; esta tarea administra exclusivamente los doce códigos canónicos y excluye esa fila.

---

#### 13. La cobertura de perfiles no es una cuota

El baseline:

```text
1 de 40 trabajadores activos con perfil
```

no crea una meta de:

```text
40 de 40
```

El perfil es configuración habitual opcional y debe existir solo cuando haya una preferencia operativa administrada que aportar a planificación.

Quedan prohibidos:

- crear perfiles masivamente desde `employees.role`;
- copiar el último turno;
- inferir perfil desde la sede primaria;
- inferir rol desde un único rol permitido en sede;
- crear perfiles por cada trabajador únicamente para completar cobertura;
- convertir ausencia de perfil en error de autorización.

La ausencia de perfil significa:

```text
sin configuración operativa predeterminada para esa sede
```

y no:

```text
sin permiso
```

ni:

```text
trabajador inválido
```

---

#### 14. Consumo por planificación de turnos

El perfil solo puede participar en la fase de propuesta o preparación.

Flujo permitido:

```text
trabajador
+
sede elegida y válida
+
perfil activo compatible
→ sugerir rol y puntos
→ usuario o proceso autorizado construye el turno
→ validar explícitamente el turno
→ persistir rol/contexto del turno
```

Flujo prohibido:

```text
turno persistido sin rol
+
perfil
→ completar silenciosamente el rol después
```

La regla aprobada es que el perfil no puede completar un turno sin rol ni reemplazar un rol publicado.

La asignación y persistencia del rol operativo del turno permanece reservada a `VISO-AUTH-010`.

La detección de un turno sin rol permanece reservada a `VISO-AUTH-011`.

---

#### 15. Cambios del perfil y turnos existentes

Modificar o desactivar un perfil no reescribe silenciosamente:

- turnos publicados;
- turnos históricos;
- asistencia;
- check-ins;
- check-outs;
- sesiones de actor;
- auditoría;
- decisiones de autorización ya registradas.

Un cambio de perfil afecta únicamente propuestas futuras desde su vigencia.

Si existen turnos futuros, abiertos o todavía no ejecutados que queden incompatibles con la nueva configuración, deberán ser revalidados por las tareas propietarias de turno y conflicto.

El perfil no es una herramienta de migración masiva de turnos.

---

#### 16. Ciclo de vida administrativo

El perfil deberá admitir, como mínimo, estas transiciones conceptuales:

| Operación | Regla |
| --- | --- |
| Crear | Requiere empleado activo, sede asignada válida, rol canónico permitido cuando se configure y puntos compatibles cuando correspondan. |
| Actualizar | Revalida todas las referencias; cambiar rol o punto no altera turnos existentes por sí solo. |
| Activar | Revalida trabajador, asignación de sede, sede, rol y requisitos de marcación antes de volverlo utilizable. |
| Desactivar | Retira el perfil de nuevas sugerencias sin eliminar historia. |
| Reconciliar | Resuelve referencias que quedaron incompatibles después de cambios en trabajador, sede, rol, matriz o puntos de marcación. |

No se usa eliminación destructiva como mecanismo normal para representar inactividad.

La baja o terminación laboral debe impedir uso futuro del perfil y conservar la evidencia exigida por el contrato de retiro.

---

#### 17. Validación administrativa de una mutación

Toda mutación deberá comprobar, como mínimo:

1. `employee_id` existe;
2. el trabajador está activo para activar o utilizar prospectivamente el perfil;
3. `site_id` existe;
4. la sede está activa y es operativamente elegible;
5. existe asignación activa trabajador × sede;
6. no existe otro perfil para la misma pareja trabajador × sede;
7. el rol predeterminado, cuando se configure, pertenece a los doce `OperationalRoleCode`;
8. el rol está activo;
9. existe relación activa rol × sede;
10. no se utiliza `propietario_admin`, rol base u oficio legacy;
11. los puntos indicados existen y están activos;
12. los puntos indicados son válidos para marcación;
13. si el rol exige punto externo de entrada, existe `default_checkin_site_id`;
14. si exige punto externo de salida, existe `default_checkout_site_id`;
15. un punto de marcación no crea una sede laboral;
16. no se infiere área;
17. el actor administrador posee capacidad explícita;
18. el actor administrador posee territorio suficiente sobre la sede objetivo;
19. el servidor revalida el payload;
20. la mutación conserva atribución y auditoría;
21. cualquier ambigüedad concluyente falla cerrada.

---

#### 18. Autoridad administrativa

Administrar perfiles operativos es una mutación de configuración de seguridad y planificación.

La condición TO-BE es:

```text
CAPACIDAD ADMINISTRATIVA EXPLÍCITA
+
ACTOR ADMINISTRATIVO VÁLIDO
+
TRABAJADOR OBJETIVO VÁLIDO
+
SEDE OBJETIVO DENTRO DE COBERTURA
+
VALIDACIÓN EN SERVIDOR
+
AUDITORÍA
→
MUTACIÓN POSIBLE
```

El rol base `gerente` no concede administración global por nombre.

El catálogo vigente no contiene una clave dedicada exclusivamente a “administrar perfiles operativos por trabajador”. Esta tarea no inventa una.

La vinculación definitiva de estas mutaciones con la capacidad administrativa canónica y su segregación permanece reservada a:

`VISO-AUTH-019 — Restringir quién administra seguridad`.

Condición exacta de salida:

```text
ninguna escritura de perfiles se declara conforme
hasta demostrar
capacidad administrativa explícita
+
territorio del actor
+
validación server-side
+
auditoría
```

---

#### 19. Reconciliación AS-IS de `/operations/employee-profiles`

La superficie física actual existe en:

```text
/operations/employee-profiles
```

y actualmente:

- carga trabajadores;
- carga sedes;
- carga la matriz rol × sede;
- carga puntos de marcación;
- carga perfiles;
- crea o actualiza perfiles;
- permite activar y desactivar.

La superficie es evidencia AS-IS y no se declara conforme por su sola existencia.

Se observan estas diferencias frente al contrato TO-BE:

1. la lista de trabajadores no demuestra filtrado por actividad antes de ofrecer una alta;
2. el acceso general a VISO no demuestra la capacidad administrativa explícita requerida;
3. la interfaz afirma que el perfil “define dónde trabaja la persona”, aunque la sede laboral pertenece a la asignación administrada por `VISO-AUTH-008`;
4. exige punto físico de entrada y salida para todos los perfiles, aunque el contrato del rol determina cuándo son obligatorios;
5. consume una vista que puede contener varias filas de área para la misma pareja sede–rol y debe evitar duplicar candidatos de perfil;
6. no demuestra en la propia superficie que el trabajador esté asignado a la sede elegida;
7. ante una firma RPC ausente conserva un fallback de `upsert` directo, que no constituye una segunda autoridad TO-BE válida para una mutación sensible.

La futura materialización de esta tarea deberá eliminar esas divergencias sin invadir las responsabilidades de asignaciones, turnos ni autoridad administrativa.

---

#### 20. Reconciliación AS-IS de persistencia y trigger

El trigger físico `validate_employee_site_operational_profile` actualmente valida:

- sede activa;
- `operational_visibility = operational`;
- punto de entrada activo cuando se informa;
- punto de salida activo cuando se informa.

No demuestra todavía:

- asignación activa del trabajador a la sede;
- rol predeterminado activo;
- rol predeterminado permitido en la sede;
- pertenencia al catálogo canónico de doce roles;
- exclusión de `propietario_admin`;
- que el punto informado sea realmente un punto de marcación;
- autoridad administrativa explícita;
- límite territorial del administrador.

Por tanto, la existencia del trigger no certifica cumplimiento TO-BE.

La materialización futura deberá cerrar esas validaciones en la frontera autoritativa aplicable y no depender únicamente de filtros de interfaz.

---

#### 21. Reconciliación AS-IS de RPC y RLS

La RPC física `upsert_employee_site_operational_profile` y la política RLS de administración observadas permiten actualmente mutación mediante condiciones nominales equivalentes a owner, global manager o manager.

Eso no demuestra:

```text
capacidad administrativa explícita
+
territorio autorizado
```

La RPC es `SECURITY DEFINER` y conserva ejecución para `authenticated`, por lo que su validación interna debe considerarse parte de la frontera crítica.

Además, `created_by` y `updated_by` están vinculados físicamente a `employees(id)`, mientras la función observada obtiene el actor mediante `auth.uid()`. La futura materialización deberá demostrar una atribución compatible con la identidad laboral canónica antes de declarar auditoría correcta.

Propietarios del cierre:

- `VISO-AUTH-018` — auditoría de cambios de seguridad;
- `VISO-AUTH-019` — autoridad para administrar seguridad;
- tareas de servidor y base de datos aplicables — enforcement físico.

Esta tarea no modifica RPC, RLS ni columnas.

---

#### 22. Drift AS-IS en aplicación del perfil al turno

La función física `apply_operational_profile_to_shift` observada:

1. obtiene un turno;
2. busca un perfil activo por trabajador y sede;
3. cuando el turno tiene valores nulos, completa `operational_role`, `checkin_site_id` y `checkout_site_id` mediante `coalesce` desde el perfil.

Eso contradice la regla canónica cuando el mecanismo se utiliza para completar un turno persistido sin rol:

```text
perfil predeterminado
≠ completar un turno sin rol
```

El perfil puede proponer valores antes de la persistencia del turno, pero no convertirse en fuente posterior de rol efectivo.

Propietarios del cierre:

- `VISO-AUTH-010` — asignación explícita del rol operativo al turno;
- `VISO-AUTH-011` — validación de turnos sin rol operativo;
- `VISO-AUTH-012` — validación de incompatibilidad de área;
- tareas de servidor y base de datos aplicables — enforcement físico.

Condición exacta de salida:

```text
ningún turno persistido obtiene autoridad o contexto efectivo
desde el perfil por fallback;
todo valor operativo queda explícitamente resuelto
y validado en el contrato del turno
```

---

#### 23. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Trabajador inexistente | Rechazar |
| Trabajador inactivo al activar o usar prospectivamente el perfil | Rechazar |
| Sede inexistente, inactiva o no operativa | Rechazar |
| Trabajador sin asignación activa a la sede | Rechazar |
| Duplicado trabajador × sede | Rechazar |
| Rol no canónico, inactivo o legacy | Rechazar |
| `propietario_admin` | Rechazar |
| Rol no permitido en la sede | Rechazar |
| Punto físico inexistente o inactivo | Rechazar |
| Punto informado que no es válido para marcación | Rechazar |
| Rol que exige entrada externa sin punto de entrada | Rechazar |
| Rol que exige salida externa sin punto de salida | Rechazar |
| Perfil usado para inferir área | Rechazar inferencia |
| Perfil usado como permiso | Rechazar |
| Perfil usado como rol efectivo sin turno válido | Rechazar |
| Perfil usado para completar silenciosamente un turno persistido sin rol | Rechazar |
| Actor sin capacidad administrativa explícita | Rechazar |
| Sede fuera del territorio administrativo del actor | Rechazar |
| Fallback directo que elude la frontera autoritativa | Rechazar |
| Auditoría no atribuible | No guardar |
| Fuente contractual incompatible o ambigua | Rechazar |

---

#### 24. Handoff a sedes asignadas

`VISO-AUTH-008` recibe de esta tarea la regla:

```text
PERFIL OPERATIVO
→ consume una asignación trabajador × sede
→ nunca la crea
```

La administración de sedes asignadas deberá conservar:

1. la pareja `employee_id + site_id` como dependencia territorial del perfil;
2. la posibilidad de un trabajador con perfiles en varias sedes solo cuando tenga asignaciones válidas;
3. la desactivación de una sede como evento que vuelve inutilizable prospectivamente el perfil asociado;
4. la prohibición de restaurar asignaciones desde perfiles residuales;
5. la historia de perfiles sin convertirla en autoridad;
6. la separación entre sede laboral y punto físico de marcación.

La tarea siguiente no deberá reinterpretar un perfil como fuente de verdad de `employee_sites`.

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La administración de perfiles operativos, su territorio, su separación respecto del rol efectivo, la invalidación ante cambios, la protección de mutaciones y la auditoría ya están cubiertas por requisitos canónicos vigentes.

Esta tarea concreta su aplicación administrativa en VISO sin introducir una nueva identidad, modalidad de autorización, scope, transición de negocio o riesgo no registrado que exija ampliar el Registro Canónico de Requisitos de Prueba.

---

#### 26. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AUTH-001` — un rol o lista local no concede autorización;
- `TREQ-AUTH-004` — los evaluadores deben producir decisiones coherentes para el mismo actor y contexto;
- `TREQ-AUTH-007` — administrar perfiles exige capacidad administrativa explícita y territorio autorizado;
- `TREQ-AUTH-008` — la operación exige turno, rol efectivo y compatibilidad territorial;
- `TREQ-AUTH-009` — sede y área deben resolverse determinísticamente;
- `TREQ-AUTH-013` — formularios, API, RPC y llamadas directas no pueden eludir la autorización de servidor;
- `TREQ-AUTH-014` — cambios de turno, área, trabajador, rol o asignación invalidan contexto y decisiones derivadas;
- `TREQ-AUTH-015` — decisiones y acciones protegidas conservan evidencia atribuible;
- `TREQ-AUTH-016` — retiro o terminación revoca configuraciones operativas aplicables sin borrar la historia y un reingreso no restaura privilegios automáticamente;
- `TREQ-SHELL-041` — el catálogo operativo conserva exactamente doce `OperationalRoleCode` y excluye `propietario_admin`;
- `TREQ-VISO-001` — la configuración de perfiles en VISO debe ser coherente con el resultado consumido por aplicaciones operativas y conservar auditoría.

Esta trazabilidad no altera contenido, estado, paquete, secuencia ni evidencia de ningún requisito.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de la rama documental local. |
| REMOTA | PASS | Se contrastaron `main`, continuidad, topología, políticas, VISO-AUTH-006, contratos de perfil y turno, 04A vigente, `/operations/employee-profiles`, y el corte read-only de Supabase para perfiles, empleados, catálogo operativo, constraints, trigger, RPC, RLS y puntos de marcación. |
| OPERATIVA | NOT_APPLICABLE | No se crean, modifican ni desactivan perfiles, trabajadores, asignaciones, turnos o marcaciones reales durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, tablas, funciones, triggers, RLS, contratos, migraciones ni datos. |

---

#### 28. Criterios de aceptación

- [ ] La identidad del perfil es `employee_id + site_id`.
- [ ] Existe como máximo un perfil por trabajador y sede.
- [ ] Un trabajador puede tener varios perfiles únicamente sobre sedes laboralmente asignadas.
- [ ] El perfil no crea ni reactiva `employee_sites`.
- [ ] El perfil no crea ni administra áreas.
- [ ] Un perfil activo utilizable exige trabajador activo y sede operativa válida.
- [ ] Un rol predeterminado configurado pertenece exclusivamente a los doce `OperationalRoleCode` canónicos.
- [ ] `propietario_admin`, roles base, oficios legacy y aliases quedan excluidos.
- [ ] El rol predeterminado debe estar activo y permitido en la sede.
- [ ] Un rol con `AREA_BINDING_UNRESOLVED` no obtiene área desde el perfil.
- [ ] La matriz de área no multiplica perfiles ni candidatos equivalentes de sede–rol.
- [ ] `default_operational_role` es preferencia de planificación y no rol efectivo.
- [ ] Un perfil sin rol explícito no obtiene fallback.
- [ ] El turno válido prevalece sobre el perfil.
- [ ] El perfil no completa silenciosamente un turno persistido sin rol.
- [ ] El perfil no concede permisos ni autorización.
- [ ] Los puntos físicos de marcación no crean territorio laboral.
- [ ] Un rol que exige marcación externa requiere el default correspondiente antes de utilizar el perfil para planificación.
- [ ] Los roles que no exigen marcación externa no requieren obligatoriamente puntos separados para que exista un perfil.
- [ ] El baseline remoto conserva 1 perfil activo sobre 40 trabajadores activos.
- [ ] Los 39 trabajadores sin perfil no generan una obligación de creación masiva.
- [ ] La ausencia de perfil significa ausencia de configuración predeterminada, no falta de permiso.
- [ ] Cambiar o desactivar un perfil no reescribe turnos ni asistencia históricos.
- [ ] La superficie `/operations/employee-profiles` no se declara conforme por su sola existencia.
- [ ] El trigger AS-IS no se declara suficiente hasta validar asignación trabajador–sede, rol y puntos de marcación.
- [ ] El fallback de `upsert` directo no constituye una autoridad TO-BE alternativa.
- [ ] La RPC y RLS AS-IS basadas en nombres administrativos no sustituyen capacidad explícita y territorio.
- [ ] `apply_operational_profile_to_shift` no puede conservar un fallback que convierta el perfil en rol efectivo de un turno persistido.
- [ ] `VISO-AUTH-018` y `VISO-AUTH-019` conservan sus responsabilidades de auditoría y autoridad administrativa.
- [ ] `VISO-AUTH-008` recibe la dependencia de sede sin reinterpretar el perfil como asignación.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.

---

#### 29. Límites

Esta tarea no:

- modifica código de VISO;
- modifica `/operations/employee-profiles`;
- modifica programación semanal o mensual;
- modifica `@vento/contracts`;
- modifica `OperationalRoleCode`;
- modifica `public.employees`;
- modifica `public.employee_sites`;
- modifica `public.employee_areas`;
- modifica `public.employee_site_operational_profiles`;
- modifica `public.site_operational_roles`;
- modifica `public.operational_roles`;
- modifica `public.employee_shifts`;
- modifica puntos de marcación;
- modifica `apply_operational_profile_to_shift`;
- modifica `upsert_employee_site_operational_profile`;
- modifica triggers, índices, constraints, RPC, RLS o grants PostgreSQL;
- crea migraciones;
- ejecuta SQL de escritura;
- crea perfiles reales;
- completa perfiles faltantes por inferencia;
- asigna sedes o áreas a trabajadores;
- asigna rol operativo efectivo al turno;
- corrige turnos sin rol;
- corrige incompatibilidad de área;
- crea permisos o scopes;
- crea excepciones individuales;
- ejecuta simulaciones;
- define quién administra seguridad fuera de `VISO-AUTH-019`;
- ejecuta auditoría física fuera de `VISO-AUTH-018`;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-006 — Administrar roles permitidos por área`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-007 — Administrar perfiles operativos por trabajador`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-008 — Administrar sedes asignadas`


### ✅ VISO-AUTH-008 — Administrar sedes asignadas

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-007 — Administrar perfiles operativos por trabajador
**Tarea siguiente:** VISO-AUTH-009 — Administrar áreas asignadas
**Tipo de tarea:** documental; definición del contrato administrativo canónico de asignaciones laborales trabajador × sede, sede primaria y ciclo de vida de la relación, sin convertir asignación, primaria, selección, turno, perfil o legado en permiso ni autoridad
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá administrar las sedes laboralmente asignadas a cada trabajador y la referencia de sede primaria sin mezclar esa relación con navegación, turno, perfil operativo, punto de marcación, alcance de permisos ni autorización final.

La regla raíz queda:

```text
EMPLEADO LABORALMENTE VÁLIDO
+
SEDE LABORAL ASIGNABLE
+
RELACIÓN EXPLÍCITA TRABAJADOR × SEDE
+
ESTADO DE ASIGNACIÓN
→
SEDE ASIGNADA
```

y nunca:

```text
employees.site_id
o sede seleccionada
o turno
o check-in
o perfil operativo
o rol
→
crear una asignación laboral por inferencia
```

La asignación habilita elegibilidad territorial. No concede permisos.

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-AUD-008` — inventario de `employee_sites` y `employee_areas`;
- `AUTH-MOD-007` — sede asignada, primaria, seleccionada, administrativa, operativa y del recurso;
- `AUTH-MOD-008` — área asignada y área activa;
- `AUTH-MOD-014` — alcance por sedes asignadas;
- `AUTH-CTX-009` — `assigned_sites`, `assigned_areas` y `administrative_coverage`;
- `AUTH-CTX-013` — sede y área operativas;
- `AUTH-CTX-028` — compatibilidad temporal con `employees.site_id` y fuentes legacy;
- `AUTH-CTX-029` — invalidación y frescura;
- `AUTH-SRV-006` y `AUTH-SRV-012` — validación territorial en escrituras;
- `VISO-AUTH-007` — perfiles operativos por trabajador;
- `TREQ-TALENTO-063` — VISO o el dominio laboral autorizado como propietario de la materialización de `employee_sites`;
- el catálogo canónico de permisos vigente, incluido `viso.staff.manage`.

La fuente normativa de la relación laboral trabajador–sede continúa siendo:

```text
public.employee_sites
```

---

#### 3. Separación conceptual obligatoria

VISO deberá mantener separados los siguientes conceptos:

| Concepto | Fuente conceptual | Función | Concede permisos |
| --- | --- | --- | ---: |
| Sede organizacional | `public.sites` | Identidad territorial | No |
| Sede asignada | `public.employee_sites` | Relación laboral explícita | No |
| Sede primaria | `employee_sites.is_primary` | Referencia laboral principal | No |
| Sede seleccionada | `employee_settings.selected_site_id` | Preferencia de interfaz | No |
| Sede administrativa activa | `AdministrativeSiteContext` | Contexto administrativo resuelto | No |
| Sede operativa activa | turno válido | Territorio operativo vigente | No |
| Sede del recurso | recurso objetivo | Territorio real de la acción | No |
| Punto físico de marcación | catálogo de `sites` con función de check-in/check-out | Evidencia física | No |
| Permiso efectivo | evaluador canónico | Capacidad concreta | Sí, únicamente si la decisión final es `ALLOW` |

Reglas obligatorias:

```text
SEDE ASIGNADA
≠ SEDE PRIMARIA
≠ SEDE SELECCIONADA
≠ SEDE OPERATIVA
≠ SEDE DEL RECURSO
```

y:

```text
ASIGNACIÓN DE SEDE
≠ PERMISO
```

---

#### 4. Fuente de verdad y dirección de sincronización

La relación canónica se resuelve desde:

```text
employee_sites.employee_id
+
employee_sites.site_id
+
employee_sites.is_active
+
employee_sites.is_primary
```

`employees.site_id` permanece como campo legacy y no podrá actuar como fuente autoritativa para crear, reactivar o ampliar `employee_sites`.

La dirección conceptual admitida durante transición es:

```text
employee_sites canónico
→ proyección legacy compatible cuando todavía sea necesaria
```

y no:

```text
employees.site_id
→ crear o reactivar autoridad territorial
```

La compatibilidad física temporal con el campo legacy permanece bajo `AUTH-CTX-028`.

Una sincronización transitoria no cambia la propiedad de la verdad.

---

#### 5. Identidad y cardinalidad de la asignación

La identidad lógica de una asignación es:

```text
(employee_id, site_id)
```

Reglas:

1. una pareja trabajador–sede aparece como máximo una vez;
2. un trabajador puede tener cero, una o varias sedes asignadas;
3. varias sedes asignadas representan una lista finita y explícita;
4. varias sedes asignadas no equivalen a cobertura organizacional;
5. `is_active` expresa vigencia de la relación;
6. `is_primary` expresa referencia laboral principal;
7. ni el rol base ni el rol operativo forman parte de la identidad de la asignación;
8. un cambio de rol no crea otra fila trabajador–sede;
9. un perfil operativo no crea otra fila trabajador–sede;
10. un área no modifica la identidad de la relación padre trabajador–sede.

La clave física actual `(employee_id, site_id)` es compatible con esta identidad.

---

#### 6. Sede laboral asignable

`public.sites` es un catálogo mixto. No toda fila es una sede laboral asignable.

Una sede candidata ordinaria deberá:

```text
existir
+
estar activa
+
ser laboralmente utilizable
+
tener visibilidad operativa compatible
+
no ser punto técnico u oculto
+
no ser entorno aislado o demo
```

No se ofrecerán como asignaciones ordinarias:

- puntos de check-in o check-out;
- sitios con `operational_visibility = hidden`;
- espacios técnicos;
- ubicaciones físicas que solo sirven de evidencia;
- entornos aislados;
- `APP-REVIEW` como si fuera una sede laboral ordinaria.

Un entorno demo aislado solo podrá participar mediante su contrato específico y nunca será precedente para ampliar el catálogo laboral.

La implementación física actual ya bloquea nuevas filas de `employee_sites` para sedes cuya `operational_visibility` no sea `operational`. La interfaz futura deberá aplicar la misma clasificación antes de ofrecer candidatos, sin depender del error de base de datos como filtro visual.

---

#### 7. Validez y utilizabilidad de una asignación

Una asignación solo es utilizable cuando:

```text
employee.is_active = true
AND
employee_site.is_active = true
AND
site.is_active = true
AND
site es laboralmente asignable
```

La presencia física de una fila no basta.

Estados:

| Estado observado | Interpretación |
| --- | --- |
| empleado activo + relación activa + sede utilizable | asignación utilizable |
| empleado inactivo + relación físicamente activa | relación residual; no utilizable |
| relación inactiva | historia o asignación retirada; no utilizable |
| sede inactiva | relación observada; no utilizable |
| sede no laboral o aislada | no utilizable como asignación ordinaria |
| referencia inexistente o contradictoria | configuración inválida; fallo cerrado |

Una fila residual jamás reactiva a un empleado.

---

#### 8. Cobertura multisede

Un trabajador puede pertenecer laboralmente a varias sedes.

Ejemplo conceptual:

```text
empleado
├── VENTO_CAFE
├── SAUDO
└── CENTRO_PROD
```

Esto significa únicamente:

```text
assigned_sites = conjunto explícito de esas sedes
```

No significa:

- organización completa;
- todas las sedes del mismo tipo;
- todas las sedes futuras;
- permiso global;
- rol operativo válido en todas ellas;
- área válida en todas ellas;
- turno activo en todas ellas.

Una sede nueva nunca entra automáticamente en `assigned_sites`.

---

#### 9. Sede primaria

La sede primaria es una referencia laboral principal dentro de las asignaciones del trabajador.

Reglas:

1. una primaria debe corresponder a una asignación existente;
2. una primaria utilizable debe corresponder a una asignación activa y una sede utilizable;
3. cuando existen asignaciones activas y la configuración está completa, existe exactamente una primaria;
4. más de una primaria constituye inconsistencia estructural;
5. cero primarias con asignaciones activas es un estado representable para diagnóstico, pero constituye configuración incompleta y no debe declararse como cierre normal exitoso de una mutación administrativa;
6. cero asignaciones activas puede coexistir con cero primaria;
7. la primaria no concede permisos;
8. la primaria no limita por sí sola una cobertura multisede;
9. la primaria no sustituye el territorio del recurso;
10. la primaria no sustituye la sede del turno;
11. la primaria no es fallback autoritativo ante contexto incompleto.

La representación contextual podrá conservar una primaria inactiva como evidencia observada, pero esa fila no será utilizable.

---

#### 10. Cambio de sede primaria

Cambiar la primaria es una operación explícita distinta de agregar una sede.

La operación deberá:

```text
validar asignación objetivo
+
validar que esté activa y sea utilizable
+
desmarcar primaria anterior cuando corresponda
+
marcar primaria objetivo
+
preservar el resto de asignaciones
+
registrar efecto y auditoría
```

Agregar una segunda sede no cambia automáticamente la primaria.

Si la primera asignación activa de un trabajador deja una configuración que exige primaria, VISO podrá preseleccionar visualmente esa única sede, pero el efecto que se guardará deberá ser explícito y la transacción deberá terminar en un estado coherente.

Queda prohibido elegir una nueva primaria por:

- orden físico de filas;
- UUID menor;
- primera fila de una consulta;
- sede seleccionada;
- último turno;
- último check-in;
- perfil operativo;
- nombre del rol;
- `employees.site_id` como autoridad.

---

#### 11. Sede seleccionada

`employee_settings.selected_site_id` es una preferencia de interfaz.

Regla:

```text
selected_site_id
≠ is_primary
≠ autorización
```

Cambiar la primaria no deberá persistir automáticamente una nueva sede seleccionada.

Si una sede seleccionada queda inválida o deja de ser navegable:

- podrá limpiarse mediante el contrato correspondiente;
- podrá mostrarse visualmente la primaria como fallback inicial;
- deberá conservarse la independencia conceptual;
- nunca se utilizará ese fallback para ampliar autoridad.

Una mutación sobre `employee_sites` no convierte la preferencia visual en fuente de verdad laboral.

---

#### 12. Alta de una asignación

Para crear o reactivar una asignación deberán verificarse, como mínimo:

1. empleado existente;
2. estado laboral compatible;
3. sede existente;
4. sede activa;
5. sede laboralmente asignable;
6. ausencia de una relación activa equivalente ya existente;
7. autoridad administrativa efectiva;
8. territorio suficiente del actor sobre la sede objetivo;
9. estado de primaria resultante;
10. efectos sobre perfiles, turnos, áreas y contexto;
11. revalidación server-side;
12. auditoría persistible.

La operación no podrá crear automáticamente:

- un perfil operativo;
- un área asignada;
- un rol operativo;
- un turno;
- un permiso;
- una excepción individual;
- una sede seleccionada persistente.

---

#### 13. Reactivación

Si la pareja trabajador–sede ya existe inactiva, la operación ordinaria será una reactivación de la relación existente, no la creación de un duplicado.

La reactivación deberá volver a comprobar:

- vigencia del vínculo laboral;
- sede;
- elegibilidad territorial;
- primaria resultante;
- perfiles dependientes;
- áreas dependientes;
- permisos y contexto derivados.

Dentro del mismo episodio laboral, una configuración dependiente podrá volver a ser utilizable únicamente después de su propia revalidación.

En un reingreso posterior a la terminación del vínculo laboral:

```text
asignación histórica
≠ asignación restaurada automáticamente
```

El nuevo episodio deberá aprobar sus asignaciones de forma nueva y trazable.

---

#### 14. Desactivación y retiro

El mecanismo normal de retiro de una sede asignada es:

```text
employee_sites.is_active = false
```

y no la eliminación destructiva de la fila.

La desactivación:

- preserva historia;
- retira elegibilidad prospectiva;
- invalida el uso del perfil asociado a esa sede;
- obliga a revalidar áreas dependientes;
- obliga a revalidar turnos presentes o futuros afectados;
- invalida contexto y decisiones derivadas;
- no borra asistencia ni turnos históricos;
- no modifica permisos históricos ya auditados.

Si la sede retirada es primaria y permanecen otras asignaciones activas, la operación deberá resolver explícitamente la nueva primaria dentro del workflow autorizado.

Si no queda ninguna asignación activa:

```text
assigned_sites = []
```

y el trabajador no obtiene territorio por fallback.

---

#### 15. Eliminación destructiva

`DELETE` no forma parte del ciclo normal de administración de sedes asignadas.

La acción administrativa visible equivalente a “Quitar” deberá materializar retiro o desactivación preservando historia.

Una eliminación física solo podrá existir dentro de una corrección de datos explícita, auditada y autorizada que demuestre que preservar la fila como historia sería incorrecto.

Nunca se utilizará `DELETE` para:

- ocultar una asignación histórica;
- resolver una primaria incorrecta;
- limpiar un vínculo al terminar el empleo;
- preparar un reingreso;
- evitar conflictos de perfil, área o turno.

---

#### 16. Empleado inactivo

La actividad del empleado es un prerrequisito de utilizabilidad de la asignación.

```text
employee.is_active = false
→ cero sedes asignadas utilizables
```

aunque existan filas físicas `employee_sites.is_active = true`.

El retiro o terminación laboral deberá revocar coordinadamente las asignaciones activas según el contrato de offboarding vigente.

Una fila residual activa perteneciente a un empleado inactivo:

- no concede autoridad;
- no habilita turnos;
- no habilita perfiles;
- no integra cobertura administrativa;
- debe tratarse como pendiente de reconciliación física.

Un reingreso no restaura esas relaciones por inferencia.

---

#### 17. Relación con perfiles operativos

Se conserva íntegramente el handoff de `VISO-AUTH-007`:

```text
PERFIL OPERATIVO
→ consume una asignación trabajador × sede
→ nunca la crea
```

Por tanto:

1. un perfil activo exige una asignación trabajador–sede utilizable;
2. desactivar la asignación vuelve inutilizable prospectivamente el perfil;
3. una fila de perfil residual no puede reactivar la sede;
4. reactivar la sede no convierte automáticamente el perfil en rol efectivo;
5. el punto de check-in del perfil no es una sede laboral asignada;
6. el perfil no modifica primaria ni sede seleccionada.

El estado remoto observado contiene un único perfil y actualmente su pareja trabajador–sede posee asignación activa; no existen perfiles huérfanos observados en ese corte.

---

#### 18. Relación con áreas asignadas

La asignación de sede es la relación territorial padre de las áreas del trabajador.

El encadenamiento queda:

```text
VISO-AUTH-008
trabajador × sede
        ↓
VISO-AUTH-009
trabajador × área
```

`VISO-AUTH-008` no crea ni modifica `employee_areas` ni otras asignaciones funcionales de área.

Una futura asignación de área solo podrá ser utilizable cuando su sede padre sea una asignación trabajador–sede utilizable.

Desactivar la sede no borra silenciosamente la historia del área, pero la vuelve no utilizable hasta su reconciliación.

---

#### 19. Relación con turno y operación

Una sede asignada habilita elegibilidad para planificación y contexto. No crea una sede operativa activa.

```text
asignación activa
≠ turno activo
```

La sede operativa continúa proviniendo del turno válido.

Un turno no podrá crear retrospectivamente una asignación laboral.

Cuando una asignación se desactive:

- cualquier turno que dependa de esa sede deberá revalidarse;
- un turno futuro incompatible no convierte de nuevo la sede en asignada;
- una sesión o caché previa deberá invalidarse;
- la autorización operativa deberá fallar cerrada hasta recuperar coherencia.

La corrección de turnos corresponde a sus tareas propietarias; esta tarea define únicamente la dependencia territorial.

---

#### 20. Autoridad administrativa

La capacidad canónica existente para administración general de trabajadores es:

```text
viso.staff.manage
```

Su presencia es necesaria para las mutaciones de esta tarea, pero no es suficiente por sí sola.

La decisión debe resolver:

```text
ACTOR EFECTIVO
+
PERMISO EFECTIVO
+
COBERTURA ADMINISTRATIVA
+
SEDE OBJETIVO
+
TRABAJADOR OBJETIVO
+
ESTADO ACTUAL
+
EFECTO RESULTANTE
+
AUSENCIA DE DENEGACIONES
→
MUTACIÓN POSIBLE
```

La sede objetivo debe evaluarse como recurso territorial de la mutación.

El rol base `gerente` no concede administración global por nombre.

Un cliente privilegiado de base de datos no sustituye esta evaluación.

La segregación final de quién puede administrar seguridad y los controles administrativos transversales permanece bajo `VISO-AUTH-019`.

---

#### 21. Efecto previo y conflictos

Antes de guardar una mutación, VISO deberá poder mostrar el efecto resultante sobre el trabajador.

Como mínimo deberá advertir:

- si cambia la primaria;
- si queda sin sedes activas;
- si se invalida un perfil operativo;
- si existen áreas dependientes;
- si existen turnos presentes o futuros afectados;
- si la sede seleccionada queda inválida;
- si el empleado está inactivo;
- si la sede no es laboralmente asignable;
- si existe conflicto de territorio del administrador;
- si la operación requiere reconciliación adicional.

Un conflicto no se resuelve eligiendo silenciosamente otra sede.

---

#### 22. Auditoría

Toda alta, reactivación, cambio de primaria, desactivación o corrección deberá conservar evidencia correlacionable de:

- actor real;
- empleado objetivo;
- sede objetivo;
- operación;
- estado anterior;
- estado resultante;
- primaria anterior y resultante cuando aplique;
- permiso y cobertura utilizados;
- motivo cuando corresponda;
- conflictos detectados;
- correlación;
- timestamp;
- versión contractual.

La tabla física `employee_sites` actualmente conserva `created_at`, pero no materializa por sí sola todo ese historial de mutaciones.

La auditoría transversal de cambios de seguridad permanece bajo `VISO-AUTH-018`.

---

#### 23. Reconciliación AS-IS de VISO

La superficie física actual de administración está integrada en:

```text
/staff/[id]
```

La vista permite:

- agregar una sede;
- solicitar que sea principal;
- activar o desactivar una relación;
- marcar otra sede como principal;
- “Quitar” una sede.

El código actual presenta varias divergencias frente al contrato TO-BE:

1. carga el catálogo completo de `sites` sin filtrar previamente sedes laborales asignables;
2. puede mostrar como opciones un punto físico oculto y el entorno `APP-REVIEW`, aunque la base rechaza nuevas asignaciones no operativas;
3. `addEmployeeSite` crea la relación y después actualiza `employees.site_id`, manteniendo al campo legacy dentro del camino de escritura;
4. `setPrimarySite` escribe `employees.site_id` como entrada de la operación, en lugar de expresar primero la primaria sobre la fuente canónica;
5. `removeEmployeeSite` ejecuta `DELETE` físico;
6. no muestra antes de guardar el impacto completo sobre perfil, áreas, turnos y contexto;
7. las acciones utilizan un cliente administrativo después del guard, por lo que la autorización server-side sobre la sede objetivo es una frontera crítica.

La existencia de la interfaz no demuestra conformidad contractual.

---

#### 24. Reconciliación AS-IS de autorización territorial

Las mutaciones observadas exigen `viso.staff.manage`, pero el guard se invoca sin suministrar la `site_id` objetivo de la asignación.

Después del guard, la escritura utiliza un cliente administrativo.

Por tanto, el flujo actual no demuestra que:

```text
target_site_id
⊆ territorio efectivo del actor
```

para cada alta, cambio, activación, desactivación o retiro.

Las políticas RLS físicas de escritura sobre `employee_sites` están limitadas a condiciones administrativas amplias, pero no constituyen protección para una escritura ejecutada mediante un cliente que las bypassa.

La materialización futura deberá evaluar explícitamente el recurso territorial objetivo antes de cualquier escritura privilegiada.

---

#### 25. Reconciliación AS-IS de sincronización primaria y selección

El estado físico actual contiene sincronización bidireccional legacy:

```text
employee_sites
→ employees.site_id
```

y:

```text
employees.site_id
→ employee_sites
```

Además, los triggers observados actualizan `employee_settings.selected_site_id` como efecto lateral de cambios de primaria.

Eso no es contrato TO-BE.

La regla aprobada permanece:

```text
employee_sites
→ fuente canónica de asignación y primaria
```

```text
employees.site_id
→ proyección legacy temporal
```

```text
selected_site_id
→ preferencia independiente
```

La función física actual también puede elegir una siguiente sede activa mediante orden técnico cuando cambia la relación. Una decisión de ese tipo no sustituye una elección administrativa explícita de primaria.

La compatibilidad y retiro del flujo legacy permanecen vinculados a `AUTH-CTX-028` y a la materialización física aplicable.

---

#### 26. Baseline físico read-only

El corte remoto verificado contiene:

```text
employees totales = 62
employees activos = 40
employees inactivos = 22

employee_sites totales = 93
employee_sites activas = 93
primarias registradas = 62
trabajadores con filas employee_sites = 62

activos con al menos una sede activa = 40
activos sin sede activa = 0
trabajadores con múltiples primarias activas = 0
activos sin primaria activa = 0

trabajadores inactivos con relación activa = 22
filas activas pertenecientes a inactivos = 27
```

Distribución de sedes activas entre los 40 trabajadores activos:

| Cantidad de sedes activas | Trabajadores |
| ---: | ---: |
| 1 | 26 |
| 2 | 9 |
| 3 | 1 |
| 4 | 1 |
| 5 | 3 |

Por tanto:

```text
trabajadores activos multisede = 14
```

La proyección legacy actual conserva:

```text
62 de 62 employees.site_id
=
primaria de employee_sites
```

sin divergencias observadas en el corte.

Esto demuestra sincronía física actual; no cambia la fuente normativa.

---

#### 27. Baseline territorial por sede

Las 93 relaciones actuales se distribuyen así:

| Sede | Filas | Primarias | Filas de empleados activos | Filas de empleados inactivos |
| --- | ---: | ---: | ---: | ---: |
| `APP-REVIEW` | 1 | 1 | 1 | 0 |
| `CENTRO_PROD` | 35 | 23 | 20 | 15 |
| `MOLKA_PRINCIPAL` | 7 | 3 | 7 | 0 |
| `SAUDO` | 9 | 2 | 7 | 2 |
| `VENTO_CAFE` | 30 | 24 | 21 | 9 |
| `VENTO_GROUP` | 11 | 9 | 10 | 1 |

El total de la última columna es 27 filas, correspondientes a 22 empleados inactivos.

La fila existente de `APP-REVIEW` se clasifica como estado legacy/aislado observado y no como precedente para nuevas asignaciones ordinarias.

---

#### 28. Reconciliación AS-IS de ciclo de vida

Todas las 93 filas actuales de `employee_sites` están físicamente activas.

Por tanto, el estado remoto no demuestra uso real del ciclo:

```text
activa
→ inactiva
```

para preservar historia.

El hecho de que existan 27 filas activas asociadas a empleados inactivos confirma que la desactivación del trabajador y la revocación de sus asignaciones todavía no están materializadas como una transición coordinada en el baseline observado.

La autoridad sigue fallando cerrada por actividad del empleado según el contrato, pero la reconciliación física del vínculo permanece pendiente.

---

#### 29. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Empleado inexistente | Rechazar |
| Alta ordinaria para empleado inactivo | Rechazar |
| Sede inexistente | Rechazar |
| Sede inactiva | Rechazar |
| Punto de marcación u otro site técnico usado como sede laboral | Rechazar |
| `APP-REVIEW` usado como sede laboral ordinaria | Rechazar |
| Duplicado trabajador × sede | Rechazar |
| Nueva primaria que no es una asignación activa utilizable | Rechazar |
| Más de una primaria | Rechazar |
| Mutación normal que deja asignaciones activas pero ninguna primaria sin declararlo como conflicto | No guardar como configuración completa |
| Primaria elegida por primera fila, UUID, selección visual o legado | Rechazar inferencia |
| Sede seleccionada usada como autorización | Rechazar |
| `employees.site_id` usado como única prueba de asignación | Rechazar |
| Perfil utilizado para crear la asignación | Rechazar |
| Turno utilizado para crear la asignación | Rechazar |
| Actor sin `viso.staff.manage` efectivo | Rechazar |
| Sede objetivo fuera de la cobertura del actor | Rechazar |
| Escritura privilegiada sin validación territorial de servidor | Rechazar |
| Retiro normal mediante borrado destructivo | Rechazar |
| Auditoría requerida no persistible | No guardar |
| Referencia o versión incompatible | Rechazar |

---

#### 30. Handoff a VISO-AUTH-009

`VISO-AUTH-009` recibe una relación padre trabajador–sede con estas reglas:

```text
employee_id + site_id
→ identidad de asignación laboral de sede
```

y:

```text
área asignada utilizable
→ requiere sede padre asignada utilizable
```

La tarea siguiente deberá conservar:

1. una asignación de área no crea una asignación de sede;
2. el área debe pertenecer exactamente a una sede ya asignada al trabajador;
3. desactivar la sede vuelve no utilizable el área dependiente;
4. la primaria no implica todas las áreas de esa sede;
5. la sede seleccionada no implica un área;
6. el turno no materializa una asignación laboral permanente;
7. `employee_areas` y cualquier modelo posterior de propósito deberán reconciliarse sin redefinir `employee_sites`.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

Esta tarea materializa administrativamente decisiones ya protegidas sobre asignaciones territoriales, administración autorizada, invalidación, revocación, auditoría, propiedad laboral de VISO y coherencia entre configuración y consumidores.

No introduce una nueva identidad territorial, modalidad de autorización, alcance, transición empresarial o riesgo no registrado que exija ampliar el Registro Canónico de Requisitos de Prueba.

---

#### 32. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-AUTH-004` — paridad de decisión entre evaluadores;
- `TREQ-AUTH-007` — administración territorial con capacidad explícita y límite por territorio del actor;
- `TREQ-AUTH-008` — separación entre carril administrativo y operativo;
- `TREQ-AUTH-009` — resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-013` — protección de mutaciones frente a formularios, API o RPC manipuladas;
- `TREQ-AUTH-014` — invalidación por cambio de asignación, turno, área, rol o actor;
- `TREQ-AUTH-015` — evidencia correlacionable y auditoría;
- `TREQ-AUTH-016` — revocación coordinada de asignaciones al terminar o suspender el vínculo;
- `TREQ-VISO-001` — efecto previo, conflictos, territorio, auditoría y coherencia de configuración VISO;
- `TREQ-TALENTO-063` — propiedad de VISO o dominio laboral autorizado sobre materialización de `employee_sites`.

Esta trazabilidad no cambia contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 33. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de su rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, VISO-AUTH-007, AUTH-MOD-007, AUTH-CTX-009, 04A aplicable, `vento-viso` `/staff/[id]` y su guard, y el estado read-only de Supabase para `employee_sites`, `sites`, primarias, perfiles, triggers y RLS. |
| OPERATIVA | NOT_APPLICABLE | No se crearon, activaron, desactivaron, retiraron ni cambiaron asignaciones reales durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, tablas, funciones, triggers, RLS, contratos, migraciones ni datos. |

---

#### 34. Criterios de aceptación

- [ ] `employee_sites` permanece como fuente canónica de asignaciones laborales de sede.
- [ ] La identidad lógica es exactamente `employee_id + site_id`.
- [ ] Un trabajador puede tener cero, una o varias sedes asignadas.
- [ ] Multisede no equivale a global.
- [ ] Una asignación no concede permisos.
- [ ] Una fila solo es utilizable con empleado activo, relación activa, sede activa y sede asignable.
- [ ] Los sitios técnicos, ocultos y puntos de marcación quedan fuera de las asignaciones ordinarias.
- [ ] `APP-REVIEW` no se presenta como sede laboral ordinaria.
- [ ] La sede primaria pertenece a una asignación válida.
- [ ] Una configuración completa con asignaciones activas conserva exactamente una primaria.
- [ ] Más de una primaria falla cerrado.
- [ ] Cero primarias con asignaciones activas se representa como configuración incompleta, no como autorización.
- [ ] La primaria no limita ni amplía permisos.
- [ ] Agregar una sede secundaria no cambia silenciosamente la primaria.
- [ ] La nueva primaria no se elige por orden técnico, sede seleccionada, perfil, turno ni campo legacy.
- [ ] `selected_site_id` permanece independiente de la primaria.
- [ ] `employees.site_id` permanece como proyección legacy y no fuente autoritativa.
- [ ] La compatibilidad inversa legacy no se eleva a contrato definitivo.
- [ ] El alta no crea automáticamente perfil, área, rol, turno, permiso ni excepción.
- [ ] Una reactivación reutiliza la identidad trabajador–sede sin duplicarla.
- [ ] Un reingreso no restaura automáticamente asignaciones históricas.
- [ ] El retiro normal usa desactivación y preserva historia.
- [ ] El borrado destructivo queda fuera del ciclo normal.
- [ ] Un empleado inactivo tiene cero sedes utilizables aunque existan filas residuales.
- [ ] Las filas residuales de empleados inactivos no reactivan autoridad.
- [ ] Un perfil consume la asignación y nunca la crea.
- [ ] La tarea no crea áreas; `VISO-AUTH-009` recibe la dependencia padre.
- [ ] La sede operativa continúa proviniendo del turno válido.
- [ ] Cambiar una asignación invalida contexto y decisiones derivadas.
- [ ] Toda mutación exige `viso.staff.manage` efectivo y cobertura suficiente sobre la sede objetivo.
- [ ] Un cliente administrativo no sustituye autorización server-side.
- [ ] VISO muestra el efecto y los conflictos antes de guardar.
- [ ] La superficie AS-IS `/staff/[id]` no se declara conforme por su sola existencia.
- [ ] El selector AS-IS no debe seguir ofreciendo sites no asignables.
- [ ] `removeEmployeeSite` no conserva su semántica de `DELETE` como ciclo normal TO-BE.
- [ ] La escritura de primaria no utiliza `employees.site_id` como fuente TO-BE.
- [ ] Los triggers no pueden sincronizar primaria y selección como una sola verdad.
- [ ] El baseline remoto se conserva como evidencia, no como regla normativa.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 35. Límites

Esta tarea no:

- modifica código de VISO;
- modifica `/staff/[id]`;
- modifica `public.employee_sites`;
- modifica `public.employees`;
- modifica `public.employee_settings`;
- modifica `public.sites`;
- modifica `public.employee_areas`;
- modifica perfiles operativos;
- modifica turnos;
- modifica asistencia;
- modifica puntos de marcación;
- modifica áreas;
- modifica permisos;
- modifica matrices RBAC;
- modifica `createAdminClient`;
- modifica guards;
- modifica triggers de sincronización;
- modifica índices, constraints, RLS, grants o RPC;
- crea migraciones;
- ejecuta SQL de escritura;
- corrige las 27 filas activas observadas sobre empleados inactivos;
- elimina la fila legacy observada de `APP-REVIEW`;
- cambia la primaria de ningún trabajador;
- cambia la sede seleccionada de ningún trabajador;
- crea, activa, desactiva o elimina asignaciones reales;
- administra áreas asignadas, responsabilidad de `VISO-AUTH-009`;
- asigna rol operativo al turno;
- define excepciones individuales;
- implementa auditoría física, responsabilidad posterior de `VISO-AUTH-018`;
- redefine la restricción administrativa transversal de `VISO-AUTH-019`;
- retira físicamente `employees.site_id`, responsabilidad de la transición legacy aplicable;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-007 — Administrar perfiles operativos por trabajador`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-008 — Administrar sedes asignadas`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-009 — Administrar áreas asignadas`


### ✅ VISO-AUTH-009 — Administrar áreas asignadas

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-008 — Administrar sedes asignadas
**Tarea siguiente:** VISO-AUTH-010 — Asignar rol operativo al turno
**Tipo de tarea:** documental; definición del contrato administrativo canónico de asignaciones laborales trabajador × área, área primaria por sede y reconciliación con configuraciones funcionales existentes, sin convertir afiliación habitual, propósito, selección, turno, rol o legado en autorización
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO deberá administrar las áreas laboralmente asignadas a un trabajador sin confundir esa afiliación habitual con el área de un turno, un binding rol × área, un propósito funcional, una preferencia de navegación o la autorización efectiva.

La regla raíz queda:

```text
EMPLEADO LABORALMENTE VÁLIDO
+
SEDE PADRE ASIGNADA Y UTILIZABLE
+
ÁREA ACTIVA PERTENECIENTE A ESA SEDE
+
RELACIÓN EXPLÍCITA TRABAJADOR × ÁREA
→
ÁREA ASIGNADA
```

y nunca:

```text
rol
o área seleccionada
o área primaria
o turno
o propósito operativo/remisión
o area_kind
o nombre humano
o employees.area_id
→
crear una asignación laboral de área por inferencia
```

La asignación de área expresa afiliación permanente o habitual. No concede permisos y no es requisito universal para operar.

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-AUD-008` — inventario de `employee_sites` y `employee_areas`;
- `AUTH-MOD-007` — sede asignada, primaria, seleccionada, administrativa, operativa y del recurso;
- `AUTH-MOD-008` — área asignada, primaria, seleccionada, administrativa, operativa y del recurso;
- `AUTH-MOD-015` a `AUTH-MOD-017` — alcance territorial por área y tipo;
- `AUTH-CTX-009` — `assigned_sites`, `assigned_areas` y `administrative_coverage`;
- `AUTH-CTX-013` — sede y área operativas;
- `AUTH-CTX-028` — compatibilidad temporal con fuentes legacy;
- `AUTH-CTX-029` — invalidación y frescura;
- `VISO-AUTH-006` — roles permitidos por área;
- `VISO-AUTH-008` — sedes asignadas al trabajador;
- las obligaciones vigentes de autorización de servidor, territorialidad, auditoría y propiedad laboral de VISO.

La fuente normativa de la afiliación laboral trabajador–área continúa siendo:

```text
public.employee_areas
```

`public.areas` continúa siendo la fuente de identidad y pertenencia territorial del área.

---

#### 3. Separación conceptual obligatoria

VISO deberá mantener separados los siguientes conceptos:

| Concepto | Fuente conceptual | Función | Concede permisos |
| --- | --- | --- | ---: |
| Área organizacional | `public.areas` | Identidad funcional dentro de una sede | No |
| Área asignada | `public.employee_areas` | Afiliación laboral permanente o habitual | No |
| Área primaria por sede | `employee_areas.is_primary` | Referencia habitual dentro de una sede | No |
| Área seleccionada | `employee_settings.selected_area_id` | Preferencia de interfaz | No |
| Área administrativa activa | `AdministrativeAreaContext` | Filtro administrativo resuelto | No |
| Área operativa activa | `employee_shifts.area_id` | Territorio del turno vigente | No |
| Área del recurso | recurso objetivo | Territorio real de la acción | No |
| Binding rol × área | matriz territorial de `VISO-AUTH-006` | Compatibilidad del rol en un área | No por sí solo |
| Área por propósito | configuración funcional específica | Preferencia o destino para un propósito concreto | No |
| Permiso efectivo | evaluador canónico | Capacidad concreta | Sí, únicamente si la decisión final es `ALLOW` |

Reglas obligatorias:

```text
ÁREA ASIGNADA
≠ ÁREA PRIMARIA
≠ ÁREA SELECCIONADA
≠ ÁREA OPERATIVA
≠ ÁREA DEL RECURSO
≠ BINDING ROL × ÁREA
≠ ÁREA POR PROPÓSITO
```

y:

```text
ASIGNACIÓN DE ÁREA
≠ PERMISO
```

---

#### 4. Identidad territorial del área

Cada `area_id` pertenece a exactamente una sede:

```text
areas.id
→ areas.site_id
→ sites.id
```

La identidad de una asignación laboral de área es:

```text
(employee_id, area_id)
```

El `site_id` se deriva del área y no crea una segunda identidad para la misma relación.

Reglas:

1. un mismo `area_id` no puede pertenecer a dos sedes;
2. dos áreas con el mismo nombre en sedes diferentes son identidades distintas;
3. `area_kind` clasifica el área, pero no sustituye `area_id`;
4. nombre, etiqueta, tipo o posición visual no identifican una asignación;
5. una pareja trabajador–área aparece como máximo una vez;
6. un trabajador puede tener cero, una o varias áreas asignadas;
7. un trabajador multisede puede tener áreas asignadas en varias sedes, siempre mediante relaciones explícitas.

---

#### 5. Dependencia obligatoria de la sede padre

`VISO-AUTH-009` recibe de `VISO-AUTH-008` esta relación padre:

```text
employee_id + site_id
→ asignación laboral de sede
```

Una asignación de área es utilizable únicamente si el trabajador tiene una asignación activa y utilizable a la sede propietaria del área.

Por tanto:

```text
employee_area activa
+
employee_site padre ausente o no utilizable
→ área asignada no utilizable
```

Crear o reactivar una asignación de área no puede:

- crear una fila de `employee_sites`;
- reactivar una sede retirada;
- convertir una sede seleccionada en sede asignada;
- sustituir la validación de la sede padre;
- ampliar cobertura administrativa.

Si la sede padre se desactiva, la asignación de área conserva historia pero deja de ser utilizable prospectivamente.

---

#### 6. Validez y utilizabilidad

Una asignación de área es utilizable cuando:

```text
employee.is_active = true
AND
employee_area.is_active = true
AND
area.is_active = true
AND
site.is_active = true
AND
area.site_id = sede padre
AND
employee_site padre es activo y utilizable
```

La presencia física de una fila no basta.

| Estado observado | Interpretación |
| --- | --- |
| empleado activo + relación activa + área activa + sede padre utilizable | asignación utilizable |
| empleado inactivo | relación observada, no utilizable |
| `employee_area.is_active = false` | relación histórica o retirada, no utilizable |
| área inactiva | relación observada, no utilizable |
| sede padre inactiva o retirada | relación observada, no utilizable |
| área vinculada a sede distinta de la esperada | inconsistencia territorial |
| sede padre no asignada al trabajador | configuración inválida |
| referencia inexistente o ambigua | fallo cerrado |

---

#### 7. Cobertura y ausencia de asignaciones

`employee_areas` representa afiliación habitual. Su cobertura no tiene que ser completa para que el trabajador pueda operar.

```text
assigned_areas = []
```

significa:

```text
no se resolvieron afiliaciones laborales de área representables
```

No significa:

- trabajador inválido;
- sin permisos;
- sin sede;
- todas las áreas de la sede;
- área del último turno;
- área seleccionada;
- área primaria inferida;
- área única disponible;
- área del rol;
- denegación operativa automática.

La ausencia de `employee_areas` es válida cuando el trabajo rota, el rol es transversal, la operación se define íntegramente en el turno o no existe afiliación fija.

---

#### 8. Área primaria por sede

El área primaria es una referencia habitual opcional dentro de una sede.

La cardinalidad canónica es:

```text
employee_id + site_id
→ máximo una área primaria activa
```

Un trabajador multisede puede tener una primaria distinta en cada sede.

Reglas:

1. la primaria debe pertenecer a una asignación de área existente;
2. una primaria utilizable debe estar activa y pertenecer a una sede padre utilizable;
3. cero primarias es un estado válido;
4. más de una primaria activa para el mismo trabajador y sede es inconsistencia;
5. la primaria no concede permisos;
6. no limita otras áreas asignadas de la misma sede;
7. no se convierte automáticamente en área administrativa activa;
8. no se convierte automáticamente en área de turno;
9. no sirve como fallback de autorización cuando el recurso o contexto no son resolubles.

---

#### 9. Cambio de área primaria

Cambiar la primaria es una operación explícita distinta de crear una asignación.

La operación deberá:

```text
validar trabajador
+
validar sede padre
+
validar área objetivo
+
validar asignación trabajador × área
+
validar que la asignación sea utilizable
+
desmarcar la primaria anterior de esa misma sede cuando corresponda
+
marcar la primaria objetivo
+
preservar asignaciones de otras áreas y sedes
+
registrar efecto y auditoría
```

Queda prohibido elegir primaria por:

- primera fila de una consulta;
- UUID;
- área seleccionada;
- último turno;
- `area_kind`;
- único binding rol × área;
- único propósito;
- `employees.area_id`;
- nombre humano;
- sede primaria del trabajador.

---

#### 10. Alta y reactivación

Para crear o reactivar una asignación de área deberán verificarse, como mínimo:

1. empleado existente;
2. estado laboral compatible;
3. área existente y activa;
4. sede propietaria existente y activa;
5. asignación trabajador–sede padre activa y utilizable;
6. coincidencia exacta `area.site_id = site_id` derivado;
7. ausencia de una relación activa equivalente;
8. autoridad administrativa efectiva;
9. territorio suficiente del actor sobre sede y área objetivo;
10. estado de primaria resultante cuando aplique;
11. efectos sobre preferencias, propósitos, turnos futuros y contexto;
12. revalidación server-side;
13. auditoría persistible.

Si la pareja trabajador–área ya existe inactiva, la operación ordinaria es una reactivación de la misma relación, no la creación de un duplicado.

La reactivación de la sede padre no reactiva automáticamente una asignación de área que permanezca inactiva.

---

#### 11. Desactivación y retiro

El ciclo normal de retiro de una afiliación de área es:

```text
employee_areas.is_active = false
```

La desactivación:

- preserva historia;
- retira la afiliación prospectiva;
- obliga a revalidar una primaria que apunte a esa relación;
- obliga a revalidar preferencias y configuraciones funcionales dependientes;
- invalida contexto y decisiones derivadas cuando participaban de esa afiliación;
- no borra turnos históricos;
- no borra asistencia;
- no borra auditoría;
- no reescribe el área de turnos ya ejecutados.

`DELETE` no forma parte del ciclo normal de administración de `employee_areas`.

Una eliminación destructiva solo podrá existir en una corrección de datos explícita, auditada y autorizada que demuestre que conservar la fila como historia sería incorrecto.

---

#### 12. Reingreso laboral

Una afiliación histórica de un episodio laboral terminado no se restaura automáticamente durante un reingreso.

```text
employee_area histórica
≠ afiliación vigente del nuevo episodio
```

El nuevo vínculo deberá aprobar de nuevo sus asignaciones aplicables mediante el workflow laboral autorizado.

No se utilizarán como restauración automática:

- último turno;
- última primaria;
- última sede;
- configuración por propósito;
- último rol;
- último `area_kind`.

---

#### 13. Cambio del catálogo de áreas

Una asignación depende de la identidad estable del área y de su sede propietaria.

Si un área se desactiva:

```text
area_active = false
→ asignación no utilizable
```

Si una modificación estructural trasladara conceptualmente un área a otra sede, no se permitirá retargetear silenciosamente las afiliaciones existentes.

Un cambio territorial de esa naturaleza deberá:

- preservar evidencia del estado anterior;
- validar la nueva sede;
- exigir asignación laboral del trabajador a la nueva sede;
- materializar una relación explícita cuando corresponda;
- revalidar permisos, perfiles, propósitos y turnos afectados;
- evitar mutaciones retroactivas.

---

#### 14. Campo legacy y selección administrativa

`employees.area_id` permanece como campo legacy y no es fuente de verdad de `assigned_areas`.

`employee_settings.selected_area_id` es una preferencia de interfaz.

Reglas:

```text
employees.area_id
≠ asignación laboral canónica
```

```text
selected_area_id
≠ asignación laboral
≠ autorización
```

Cambiar una primaria no obliga a persistir una nueva área seleccionada.

Cambiar un área seleccionada no crea, activa, desactiva ni convierte una fila de `employee_areas`.

Una selección visual podrá servir para filtrar una vista administrativa después de ser validada, pero nunca para ampliar autoridad ni completar contexto operativo.

---

#### 15. Relación con `VISO-AUTH-006`

`VISO-AUTH-006` administra compatibilidad:

```text
rol operativo × sede × área
```

`VISO-AUTH-009` administra afiliación:

```text
trabajador × área
```

Ninguna relación crea la otra.

Por tanto:

```text
rol permitido en área
≠ trabajador asignado al área
```

y:

```text
trabajador asignado al área
≠ rol permitido en esa área
```

Una afiliación habitual puede existir aunque el trabajador utilice distintos roles según turnos válidos.

La asignación individual no modifica `site_operational_roles`, bindings exactos, estados no resueltos ni defaults de `VISO-AUTH-006`.

---

#### 16. Relación con el área operativa del turno

`employee_areas` no es requisito operativo universal.

El área operativa efectiva continúa siendo:

```text
employee_shifts.area_id
```

Cuando el rol o la acción exige área, el turno deberá contener o resolver contractualmente un área válida conforme a sus propias reglas.

Un trabajador puede operar temporalmente en un área que no sea su afiliación habitual cuando:

- pertenece a la sede;
- el rol está permitido en esa área;
- el turno está válidamente construido y publicado;
- no existe restricción aplicable;
- el resultado queda auditado.

Por tanto:

```text
assigned_area
→ puede sugerir planificación
```

pero nunca:

```text
assigned_area
→ completar silenciosamente shift.area_id
```

La persistencia del rol y contexto del turno permanece bajo `VISO-AUTH-010`. La incompatibilidad área–rol permanece bajo `VISO-AUTH-012`.

---

#### 17. Relación con check-in y dispositivo

Ni el check-in ni el dispositivo son fuentes de afiliación de área.

```text
check-in
≠ employee_area
```

```text
device.area_id
≠ employee_area
```

Un punto de marcación, dispositivo fijo o sesión compartida no crea ni cambia una relación laboral trabajador–área.

La operación deberá seguir evaluando el área del turno, el área del recurso y los límites del dispositivo por sus contratos propios.

---

#### 18. Configuraciones por propósito

La tabla física observada:

```text
employee_area_purpose_assignments
```

representa una capa distinta de configuración funcional.

Sus propósitos actuales son:

```text
operational
remission
```

Esa tabla no sustituye `employee_areas`.

Reglas:

```text
área por propósito
≠ área laboral asignada
```

```text
área laboral asignada
≠ área obligatoria para cada propósito
```

Una configuración por propósito no puede crear, reactivar ni retirar una afiliación canónica.

La existencia de una configuración por propósito sin `employee_areas` no se convierte por inferencia en una asignación laboral, porque el contrato aprobado no exige `employee_areas` como prerrequisito universal de operación.

Sin embargo, una configuración por propósito solo puede considerarse utilizable cuando:

- el empleado está activo;
- su sede padre está asignada y utilizable;
- el área existe, está activa y pertenece a esa sede;
- el propósito es válido;
- cualquier restricción adicional del proceso se satisface.

---

#### 19. Reconciliación AS-IS de `employee_areas`

El corte remoto read-only verificado conserva:

```text
employee_areas totales = 1
employee_areas activas = 1
primarias = 1
trabajadores distintos = 1

trabajadores activos = 40
activos con employee_area activa = 1
activos sin employee_area activa = 39
cobertura descriptiva = 2,5 %
```

La única relación observada es internamente coherente:

- empleado activo;
- área activa;
- sede padre asignada y activa;
- relación activa;
- primaria activa.

El baseline confirma que `employee_areas` continúa prácticamente sin materializarse para la plantilla general.

Ese vacío no puede interpretarse como ausencia de área operativa autorizable.

---

#### 20. Drift físico de la primaria

La estructura física actual contiene:

```text
PRIMARY KEY (employee_id, area_id)
```

compatible con la identidad de afiliación.

Sin embargo, contiene además un índice único parcial equivalente a:

```text
UNIQUE (employee_id)
WHERE is_primary = true
```

Ese índice permite como máximo una primaria global por trabajador.

El contrato canónico exige:

```text
máximo una primaria por trabajador y sede
```

y permite primarias diferentes para un mismo trabajador multisede.

Por tanto:

```text
índice físico actual
≠ cardinalidad canónica completa
```

La futura materialización deberá reconciliar esta restricción mediante una solución equivalente a la cardinalidad trabajador + sede, sin modificarla durante el cierre documental.

---

#### 21. Reconciliación AS-IS de legado y selección

El estado remoto observado conserva:

```text
employees.area_id no nulo = 0
employee_settings.selected_area_id no nulo = 0
```

Por tanto, en el baseline actual:

- el campo legacy no aporta afiliaciones;
- la preferencia de área no aporta afiliaciones;
- no existe una proyección física equivalente a la sincronización observada para sedes.

Esto no elimina la obligación de mantener ambos conceptos separados si aparecen en una futura transición.

---

#### 22. Reconciliación AS-IS de áreas por propósito

El corte remoto read-only observado para `employee_area_purpose_assignments` contiene:

```text
filas totales = 45
filas activas = 45
trabajadores distintos = 16
áreas distintas = 7
sedes distintas = 3

purpose = operational → 23
purpose = remission   → 22

filas de empleados activos = 25
filas de empleados inactivos = 20
filas sin sede padre activa = 2
filas con area.site_id distinto de site_id = 0
filas con employee_area activa equivalente = 0
```

Conclusiones:

1. las 45 filas por propósito no son evidencia de 45 afiliaciones laborales;
2. ninguna de ellas puede copiarse automáticamente a `employee_areas`;
3. las 20 filas de empleados inactivos no son utilizables prospectivamente;
4. las 2 filas sin sede padre activa son configuraciones no utilizables hasta reconciliación;
5. la ausencia de una `employee_area` equivalente no invalida por sí sola el propósito, porque ambas capas tienen responsabilidades distintas;
6. la integridad mínima de empleado, sede y área debe comprobarse independientemente en servidor.

---

#### 23. Reconciliación AS-IS de VISO

La búsqueda estática del repositorio VISO observado no identificó consumo directo de:

```text
public.employee_areas
```

La superficie actual `/staff/[id]` administra:

```text
employee_area_purpose_assignments
```

mediante el panel:

```text
Áreas por propósito
```

No existe evidencia de que esa superficie materialice el lifecycle canónico de `employee_areas`.

La acción observada:

- recibe trabajador, sede, propósito y área;
- verifica que el área exista;
- verifica que `area.site_id` coincida con la sede enviada;
- escribe mediante cliente administrativo;
- elimina físicamente la fila por propósito cuando se selecciona `Sin definir`.

Ese comportamiento es evidencia AS-IS de una configuración funcional y no debe reutilizarse como lifecycle de afiliación laboral.

---

#### 24. Reconciliación AS-IS de autorización

La acción actual de áreas por propósito exige:

```text
viso.staff.manage
```

pero el guard observado no recibe como contexto autoritativo la sede y el área objetivo de la mutación.

Después del guard, la escritura utiliza un cliente administrativo.

Por tanto, el flujo actual no demuestra que:

```text
target_site_id
+
target_area_id
⊆ territorio efectivo del actor
```

Las políticas RLS observadas para `employee_areas` y para configuraciones por propósito restringen escritura a condiciones administrativas amplias, pero no sustituyen la autorización territorial cuando un cliente privilegiado ejecuta la mutación.

La futura materialización deberá revalidar explícitamente:

- actor;
- permiso administrativo;
- trabajador objetivo;
- sede objetivo;
- área objetivo;
- pertenencia área–sede;
- cobertura administrativa;
- estado actual;
- efecto resultante.

---

#### 25. Autoridad administrativa

La capacidad canónica existente para administración general de trabajadores es:

```text
viso.staff.manage
```

Su presencia es necesaria para las mutaciones de esta tarea, pero no es suficiente por sí sola.

La decisión deberá resolver:

```text
ACTOR EFECTIVO
+
PERMISO EFECTIVO
+
COBERTURA ADMINISTRATIVA
+
TRABAJADOR OBJETIVO
+
SEDE PADRE
+
ÁREA OBJETIVO
+
ESTADO ACTUAL
+
EFECTO RESULTANTE
+
AUSENCIA DE DENEGACIONES
→
MUTACIÓN POSIBLE
```

El rol base `gerente` no concede administración global por nombre.

Un `service_role`, un admin client o una política amplia de base de datos no constituyen autoridad empresarial.

La segregación final de quién administra seguridad permanece bajo `VISO-AUTH-019`.

---

#### 26. Efecto previo y conflictos

Antes de guardar una mutación, VISO deberá poder mostrar el efecto resultante sobre el trabajador.

Como mínimo deberá advertir:

- si la afiliación queda activa o inactiva;
- si cambia una primaria de esa sede;
- si la sede padre no es utilizable;
- si el área pertenece a otra sede;
- si el área está inactiva;
- si existen configuraciones por propósito relacionadas;
- si existen turnos futuros afectados;
- si la selección administrativa queda inválida;
- si el empleado está inactivo;
- si existe conflicto de territorio del administrador;
- si la operación requiere reconciliación adicional.

Un conflicto no se resuelve seleccionando silenciosamente otra área.

---

#### 27. Auditoría

Toda alta, reactivación, cambio de primaria, desactivación o corrección deberá conservar evidencia correlacionable de:

- actor real;
- empleado objetivo;
- sede padre;
- área objetivo;
- operación;
- estado anterior;
- estado resultante;
- primaria anterior y resultante cuando aplique;
- permiso y cobertura utilizados;
- motivo cuando corresponda;
- configuraciones dependientes detectadas;
- correlación;
- timestamp;
- versión contractual.

La tabla física `employee_areas` observada contiene `created_at`, pero no materializa por sí sola el historial completo de mutaciones.

La auditoría transversal de cambios de seguridad permanece bajo `VISO-AUTH-018`.

---

#### 28. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Empleado inexistente | Rechazar |
| Alta o reactivación prospectiva para empleado inactivo | Rechazar |
| Área inexistente | Rechazar |
| Área inactiva | Rechazar |
| Sede propietaria inexistente o inactiva | Rechazar |
| Trabajador sin sede padre activa y utilizable | Rechazar |
| Área asociada a otra sede | Rechazar |
| Duplicado trabajador × área | Rechazar |
| Más de una primaria activa del trabajador dentro de la misma sede | Rechazar |
| Primaria que no pertenece a una asignación utilizable | Rechazar |
| Área primaria inferida por selección, turno, propósito, rol, nombre o unicidad | Rechazar inferencia |
| `employees.area_id` usado como autoridad | Rechazar |
| `selected_area_id` usado como autoridad | Rechazar |
| Turno usado para crear afiliación permanente | Rechazar |
| Binding rol × área usado para crear afiliación individual | Rechazar |
| Configuración por propósito usada para crear afiliación laboral | Rechazar |
| Ausencia de `employee_areas` interpretada como denegación operativa universal | Rechazar interpretación |
| Actor sin `viso.staff.manage` efectivo | Rechazar |
| Sede o área objetivo fuera de cobertura del actor | Rechazar |
| Escritura privilegiada sin revalidación territorial de servidor | Rechazar |
| Retiro normal mediante borrado destructivo de `employee_areas` | Rechazar |
| Auditoría requerida no persistible | No guardar |
| Referencia o versión incompatible | Rechazar |

---

#### 29. Handoff a VISO-AUTH-010

`VISO-AUTH-010` recibe `employee_areas` exclusivamente como configuración habitual opcional.

Deberá conservar:

```text
employee_area
→ sugerencia posible de planificación
```

y nunca:

```text
employee_area
→ área operativa efectiva automática
```

La tarea siguiente deberá:

1. mantener `employee_shifts.area_id` como área operativa del turno;
2. no rechazar un turno únicamente porque el trabajador carezca de `employee_areas`;
3. no usar la primaria como fallback silencioso;
4. no usar una configuración por propósito como área efectiva automática;
5. validar la sede del trabajador y la compatibilidad rol × sede × área;
6. conservar `area_id = null` únicamente cuando el contrato del rol y del turno permitan ausencia de área;
7. dejar a `VISO-AUTH-012` la validación específica de incompatibilidad territorial del turno.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa administrativamente decisiones ya protegidas sobre afiliación de áreas, territorialidad, separación entre configuración y operación, autorización de servidor, invalidación, auditoría y coherencia entre VISO y consumidores.

No introduce una identidad territorial nueva, una modalidad de autorización, un scope, una transición empresarial o un riesgo no registrado que exija ampliar el Registro Canónico de Requisitos de Prueba.

---

#### 31. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-AUTH-004` — paridad de decisión entre evaluadores;
- `TREQ-AUTH-007` — administración territorial con capacidad explícita y límite por territorio del actor;
- `TREQ-AUTH-008` — separación entre carril administrativo y operativo;
- `TREQ-AUTH-009` — resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-013` — protección de mutaciones frente a formularios, API o RPC manipuladas;
- `TREQ-AUTH-014` — invalidación por cambio de área o asignación;
- `TREQ-AUTH-015` — evidencia correlacionable y auditoría;
- `TREQ-AUTH-016` — revocación coordinada y no restauración automática de asignaciones;
- `TREQ-VISO-001` — efecto previo, conflictos, territorio, auditoría y coherencia de configuración VISO;
- `TREQ-TALENTO-063` — propiedad de VISO o dominio laboral autorizado sobre la materialización de asignaciones;
- `TREQ-TALENTO-064` — sede, área y roles son solicitudes validadas y no permisos concedidos.

Esta trazabilidad no cambia contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea aún no fue insertada ni validada dentro de su rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, VISO-AUTH-006, VISO-AUTH-008, AUTH-MOD-008, AUTH-CTX-009, 04A aplicable, código VISO y estado read-only de Supabase para `employee_areas`, `employee_area_purpose_assignments`, áreas, sedes, primarias, índices y RLS. |
| OPERATIVA | NOT_APPLICABLE | No se crearon, activaron, desactivaron, retiraron ni cambiaron afiliaciones reales de área durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, tablas, índices, constraints, RLS, contratos, migraciones ni datos. |

---

#### 33. Criterios de aceptación

- [ ] `employee_areas` permanece como fuente canónica de afiliaciones laborales de área.
- [ ] La identidad lógica es exactamente `employee_id + area_id`.
- [ ] `areas.site_id` determina la sede propietaria del área.
- [ ] Un área no puede pertenecer simultáneamente a dos sedes.
- [ ] `area_kind` no sustituye `area_id`.
- [ ] Un trabajador puede tener cero o varias áreas asignadas.
- [ ] La ausencia de `employee_areas` no invalida automáticamente la operación.
- [ ] Toda asignación utilizable exige empleado activo, relación activa, área activa y sede padre utilizable.
- [ ] Una asignación de área no crea ni reactiva `employee_sites`.
- [ ] Desactivar la sede padre vuelve no utilizable la afiliación de área sin borrar historia.
- [ ] La primaria es opcional.
- [ ] Existe como máximo una primaria activa por trabajador y sede.
- [ ] Un trabajador multisede puede tener primarias distintas por sede.
- [ ] La primaria no concede permisos.
- [ ] La primaria no se convierte automáticamente en área administrativa ni operativa.
- [ ] La primaria no se infiere por selección, turno, propósito, rol, nombre ni orden técnico.
- [ ] El alta no crea automáticamente turno, rol, binding, propósito, permiso ni excepción.
- [ ] La reactivación reutiliza la identidad trabajador–área sin duplicarla.
- [ ] Un reingreso no restaura automáticamente afiliaciones históricas.
- [ ] El retiro normal usa desactivación y preserva historia.
- [ ] El borrado destructivo queda fuera del ciclo normal de `employee_areas`.
- [ ] `employees.area_id` permanece legacy y no fuente autoritativa.
- [ ] `selected_area_id` permanece como preferencia y no autorización.
- [ ] `VISO-AUTH-006` y `VISO-AUTH-009` conservan responsabilidades separadas.
- [ ] El binding rol × área no crea afiliación trabajador × área.
- [ ] La afiliación trabajador × área no crea compatibilidad de rol.
- [ ] `employee_shifts.area_id` continúa siendo el área operativa del turno.
- [ ] Una afiliación habitual puede sugerirse, pero no completar silenciosamente el turno.
- [ ] `employee_area_purpose_assignments` permanece como capa funcional distinta.
- [ ] Una configuración por propósito no crea ni retira `employee_areas`.
- [ ] Las 45 filas por propósito no se migran por inferencia a afiliaciones laborales.
- [ ] El baseline de `employee_areas` conserva 1 relación activa sobre 40 empleados activos y 39 sin afiliación.
- [ ] El índice físico de primaria global se reconoce como drift frente a la cardinalidad por sede.
- [ ] La corrección de ese índice queda diferida a la futura instancia física.
- [ ] El baseline conserva cero `employees.area_id` y cero `selected_area_id` no nulos.
- [ ] Las 20 filas por propósito de empleados inactivos no se consideran utilizables.
- [ ] Las 2 filas por propósito sin sede padre activa no se consideran utilizables.
- [ ] Toda mutación exige `viso.staff.manage` efectivo y cobertura suficiente sobre sede y área objetivo.
- [ ] Un cliente administrativo no sustituye autorización server-side.
- [ ] VISO muestra efecto y conflictos antes de guardar.
- [ ] La superficie actual de “Áreas por propósito” no se declara equivalente a administración de `employee_areas`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 34. Límites

Esta tarea no:

- modifica código de VISO;
- crea una nueva pantalla;
- modifica `/staff/[id]`;
- modifica `public.employee_areas`;
- modifica `public.employee_sites`;
- modifica `public.areas`;
- modifica `public.employees`;
- modifica `public.employee_settings`;
- modifica `employee_area_purpose_assignments`;
- copia filas por propósito hacia `employee_areas`;
- backfillea los 39 trabajadores activos sin afiliación;
- corrige las 20 filas por propósito de empleados inactivos;
- corrige las 2 filas por propósito sin sede padre activa;
- modifica el índice `employee_areas_one_primary`;
- modifica índices, constraints, triggers, grants o RLS;
- modifica bindings rol × área;
- modifica perfiles operativos;
- modifica turnos;
- modifica asistencia;
- modifica check-ins o dispositivos;
- modifica permisos o matrices RBAC;
- modifica guards ni `createAdminClient`;
- crea migraciones;
- ejecuta SQL de escritura;
- define el rol operativo efectivo del turno;
- valida definitivamente incompatibilidades del turno, responsabilidad de `VISO-AUTH-012`;
- implementa auditoría física, responsabilidad posterior de `VISO-AUTH-018`;
- redefine la restricción administrativa transversal de `VISO-AUTH-019`;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-008 — Administrar sedes asignadas`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-009 — Administrar áreas asignadas`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-010 — Asignar rol operativo al turno`


### ✅ VISO-AUTH-010 — Asignar rol operativo al turno

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-009 — Administrar áreas asignadas
**Tarea siguiente:** VISO-AUTH-011 — Validar turnos sin rol operativo
**Tipo de tarea:** documental; definición del contrato canónico mediante el cual VISO asigna un `OperationalRoleCode` explícito a cada turno laboral, separa rol planificado de rol operativo efectivo y prohíbe completar la autoridad del turno mediante rol base, perfil, default, unicidad visual, área habitual o cualquier otra inferencia
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo VISO debe asignar el rol operativo de un turno sin convertir una preferencia de planificación, el rol base del trabajador, una fila única de matriz, un área predeterminada o una selección de interfaz en autoridad implícita.

La regla raíz queda:

```text
TRABAJADOR VÁLIDO
+
SEDE DEL TURNO VÁLIDA
+
ROL OPERATIVO CANÓNICO EXPLÍCITO
+
ROL HABILITADO PARA LA SEDE
+
ÁREA DEL TURNO COMPATIBLE CUANDO CORRESPONDA
+
PERSISTENCIA DEL ROL EN EL TURNO
→
ROL OPERATIVO ASIGNADO AL TURNO
```

La efectividad operativa se mantiene separada:

```text
ROL ASIGNADO AL TURNO
+
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO CUANDO EL CARRIL LO EXIJA
+
CONTEXTO TERRITORIAL VÁLIDO
→
ROL OPERATIVO EFECTIVO
```

Y nunca:

```text
ROL BASE
o PERFIL
o DEFAULT
o ÚNICA OPCIÓN
o ÚLTIMO TURNO
o ÁREA HABITUAL
o CLIENTE
→
ROL OPERATIVO EFECTIVO
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-005` — catálogo y semántica del rol operativo;
- `AUTH-MOD-007` — sede operativa procedente del turno válido;
- `AUTH-MOD-008` — área operativa procedente del turno y `employee_areas` como afiliación opcional;
- `AUTH-MOD-009` — turno publicado separado de turno activo;
- `AUTH-MOD-010` — check-in activo;
- `AUTH-CTX-009` — asignaciones territoriales;
- `AUTH-CTX-010` a `AUTH-CTX-013` — turno, check-in y contexto operativo;
- `VISO-AUTH-002` — catálogo administrativo de roles operativos;
- `VISO-AUTH-005` — disponibilidad del rol por sede;
- `VISO-AUTH-006` — disponibilidad del rol por área;
- `VISO-AUTH-007` — perfil operativo como configuración habitual de planificación;
- `VISO-AUTH-008` — sedes asignadas al trabajador;
- `VISO-AUTH-009` — áreas asignadas como configuración habitual opcional;
- `ANIMA-AUTH-001` a `ANIMA-AUTH-006` — consumo del turno publicado y confirmación posterior de sede, área y rol antes del contexto operativo;
- el catálogo compartido `OperationalRoleCode@1.0.0`.

La tarea no crea un nuevo catálogo, un nuevo estado de turno ni una segunda fuente de rol operativo.

---

#### 3. Resultado canónico

La unidad canónica de esta tarea es:

```text
shift_id
+
employee_id
+
site_id
+
area_id cuando corresponda
+
operational_role
```

donde:

```text
employee_shifts.operational_role
→ rol operativo asignado al turno
```

El campo persistido es un hecho del turno. No es una preferencia del trabajador.

Para un turno laboral creado o corregido conforme al contrato:

```text
operational_role
→ exactamente un OperationalRoleCode canónico
```

Para un turno de descanso:

```text
shift_kind = descanso
→ operational_role = null
```

La ausencia de rol en descanso no es una inconsistencia de rol operativo.

---

#### 4. Rol asignado y rol efectivo

Esta tarea distingue tres estados conceptuales:

| Estado | Significado | Autoridad operativa |
| --- | --- | --- |
| Candidato de planificación | Valor sugerido antes de guardar el turno | Ninguna |
| Rol asignado al turno | Código persistido en `employee_shifts.operational_role` | Ninguna por sí solo |
| Rol operativo efectivo | Rol del turno válido dentro del contexto operativo efectivo | Puede participar en autorización junto con permiso, sede, área, turno, check-in y recurso |

Por tanto:

```text
rol asignado
≠ rol efectivo automáticamente
```

y:

```text
turno borrador con rol
≠ contexto operativo
```

El rol del turno solo adquiere efectividad cuando el resto del contrato operativo lo vuelve aplicable.

---

#### 5. Universo exacto de roles permitidos

VISO solo podrá asignar estos doce códigos de `OperationalRoleCode@1.0.0`:

1. `cajero_satelite`;
2. `barista_satelite`;
3. `cocinero_satelite`;
4. `servicio_salon`;
5. `mostrador_satelite`;
6. `operador_integral_satelite`;
7. `produccion_cocina`;
8. `produccion_panaderia`;
9. `produccion_reposteria`;
10. `bodeguero`;
11. `conductor_logistica`;
12. `gerencia_operativa`.

Quedan excluidos roles base, oficios legacy, aliases, valores visibles de interfaz, `propietario_admin`, roles retirados o inactivos, códigos locales y strings no registrados.

La identidad se valida por código canónico exacto, no por etiqueta, familia o semejanza textual.

---

#### 6. Validación del catálogo

Antes de persistir un rol en un turno laboral, el servidor deberá demostrar:

```text
role_code existe
AND
role_code pertenece a OperationalRoleCode vigente
AND
rol está activo
AND
rol no es legacy
```

Un valor desconocido no se corrige por aproximación.

Un rol inactivo no se transforma en el siguiente rol disponible.

`propietario_admin` no puede convertirse en rol operativo del turno aunque todavía exista físicamente en el catálogo desplegado.

La ausencia de una restricción física de clave foránea sobre `employee_shifts.operational_role` no relaja este contrato.

---

#### 7. Dependencia del trabajador y de la sede

La asignación del rol pertenece a un turno de un trabajador concreto y una sede concreta.

Para una mutación prospectiva de turno laboral deberán resolverse:

```text
employee_id existente y activo
+
site_id existente, activo y programable
+
trabajador asignado a site_id
→
trabajador elegible para recibir un rol en ese turno
```

La sede primaria legacy no sustituye `employee_sites`.

Una sede seleccionada en la interfaz no crea la asignación laboral.

Un turno no puede crear retrospectivamente una sede asignada al trabajador.

Si la relación trabajador–sede deja de ser utilizable, el turno afectado requiere revalidación; no conserva elegibilidad por tener ya un rol escrito.

---

#### 8. Dependencia de la matriz rol × sede

Todo rol asignado a un turno laboral debe estar habilitado en la sede del turno conforme a `VISO-AUTH-005`.

La regla es:

```text
operational_role
+
shift.site_id
→ relación rol × sede activa y válida
```

No basta con que el rol exista en el catálogo.

Queda prohibido asignar un rol porque exista en otra sede, tenga la misma familia, sea el rol base equivalente, sea el único rol conocido del trabajador, haya aparecido en un turno anterior o sea el único rol visible después de un filtro cliente.

La validación de la relación se repite en servidor antes de guardar.

---

#### 9. Relación con la matriz rol × área

El área del turno permanece separada del área habitual del trabajador.

Cuando la configuración territorial exige un área exacta:

```text
shift.site_id
+
shift.area_id
+
shift.operational_role
→ binding exacto válido
```

Cuando el contrato permita operar sin área, la ausencia deberá ser una condición explícitamente válida del rol y de la matriz.

Nunca se interpretará:

```text
area_id = null
→ todas las áreas
```

La asignación de `operational_role` no puede completar silenciosamente `area_id`.

`employee_areas`, el área primaria, el área seleccionada y `employee_area_purpose_assignments` pueden aportar contexto de planificación, pero no sustituyen el área exacta del turno.

La validación específica y el diagnóstico de incompatibilidad del turno permanecen reservados a `VISO-AUTH-012`.

---

#### 10. Perfil operativo como sugerencia

`employee_site_operational_profiles.default_operational_role` conserva exactamente su semántica aprobada:

```text
default_operational_role
→ preferencia de planificación
```

Puede utilizarse para preseleccionar o proponer un candidato cuando el perfil está activo, corresponde al trabajador y a la misma sede, el rol pertenece al catálogo canónico, está activo, está permitido en la sede y cualquier requisito adicional se revalida.

Después de guardar:

```text
employee_shifts.operational_role
→ hecho del turno
```

Modificar o desactivar posteriormente el perfil no reescribe el rol de turnos existentes.

Un perfil sin rol no obtiene fallback.

Un turno persistido sin rol no se completa silenciosamente desde el perfil.

---

#### 11. Prohibición de fallback desde rol base

El rol base describe responsabilidad laboral permanente. No define la función temporal ejecutada en un turno.

Por tanto:

```text
employees.role
≠ employee_shifts.operational_role
```

Queda prohibido materializar el rol del turno mediante un mapping autoritativo de rol base.

Un mapping base → operativo puede existir únicamente como ayuda de migración, análisis o propuesta no autoritativa, siempre que el resultado final sea revalidado y se convierta en una asignación explícita del turno.

No puede utilizarse para completar un turno guardado sin rol, autorizar una acción, publicar silenciosamente un turno, corregir un histórico, seleccionar `propietario_admin` ni evitar el catálogo operativo vigente.

---

#### 12. Defaults, unicidad y orden visual

La matriz puede contener `is_default`, una única fila visible o una única combinación posible en un contexto concreto.

Esas condiciones son aptas para experiencia de planificación, no para autoridad implícita.

Reglas:

```text
is_default = true
→ puede sugerir
```

```text
única fila
→ puede simplificar la selección
```

pero:

```text
default
o única fila
o única área
→ no sustituyen el rol persistido del turno
```

El servidor no deberá recibir `operational_role = null` y decidir que la ausencia quedó resuelta únicamente porque encontró una opción disponible.

La operación de guardar debe terminar con un código exacto validado dentro del turno laboral.

---

#### 13. Turno laboral y turno de descanso

La semántica de rol depende de `shift_kind`.

Para turno laboral:

```text
shift_kind = laboral
operational_role = OperationalRoleCode válido
```

Para descanso:

```text
shift_kind = descanso
operational_role = null
```

No se debe inventar un rol para que un descanso satisfaga validadores operativos.

`VISO-AUTH-011` deberá excluir los descansos del diagnóstico de turno laboral sin rol.

---

#### 14. Borrador, publicación y efectividad

Esta tarea define el rol del turno, pero no redefine el workflow completo de programación.

Un rol puede quedar asignado desde el borrador para que el turno pueda ser revisado antes de publicación.

La publicación no cambia por sí sola el código:

```text
draft.operational_role
→ published_shift.operational_role
```

siempre que la revisión publicada corresponda a ese contenido validado.

La publicación tampoco convierte inmediatamente el rol en efectivo:

```text
turno publicado
≠ turno activo
```

La efectividad continúa dependiendo del contrato operativo y de presencia cuando aplique.

La definición de borrador, revisión, publicación, corrección y versionado pertenece a `VISO-SCH-005`; esta tarea no inventa ese workflow antes de su desarrollo.

---

#### 15. Cambio del rol de un turno

Cambiar `operational_role` es una mutación funcional del turno, no una edición cosmética.

Antes de guardar un cambio deberán revalidarse trabajador, sede, rol canónico y activo, habilitación rol × sede, área y binding cuando corresponda, requisitos de marcación asociados, estado actual del turno, publicación existente, asistencia o contexto activo relacionado, conflictos prospectivos, autoridad administrativa y auditoría.

Un cambio de rol no modifica el rol base del trabajador.

Tampoco modifica automáticamente el perfil operativo, la sede asignada, el área asignada, permisos base, grants operativos, turnos históricos distintos ni sesiones ya finalizadas.

El mecanismo preciso de corrección de un turno publicado permanece bajo `VISO-SCH-005` y su control de concurrencia bajo `VISO-SCH-006`.

---

#### 16. Frescura e invalidación

El rol asignado no puede permanecer como autoridad si el contexto del turno cambió de forma material.

Deben invalidar o exigir revalidación, según el contrato propietario:

- desactivación del trabajador;
- retiro de la sede asignada;
- desactivación del rol;
- retiro de la relación rol × sede;
- cambio de área;
- retiro del binding rol × área;
- corrección o sustitución de la revisión publicada;
- cancelación del turno;
- cambio del actor o contexto operativo.

Una caché, una vista previa o un valor cargado previamente no puede autorizar con información obsoleta.

---

#### 17. Requisitos de marcación externa

Asignar el rol no crea puntos de marcación.

Cuando el rol elegido requiera punto externo, la planificación puede consumir defaults válidos del perfil, manteniendo:

```text
operational_role
≠ checkin_site_id
≠ checkout_site_id
```

Los puntos deben existir, ser válidos para marcación, no son sedes laborales, no amplían territorio, no sustituyen el rol y no sustituyen el turno.

La ausencia de un punto obligatorio bloquea la configuración aplicable, pero nunca se corrige cambiando silenciosamente de rol.

---

#### 18. Planificación masiva y sugerencias automáticas

Un generador, algoritmo o herramienta de planificación puede producir un rol candidato.

La salida se clasifica como:

```text
PROPUESTA DE TURNO
```

y no como autoridad.

Antes de persistir cada fila debe ejecutarse la misma validación que en captura manual.

No existe excepción para creación masiva, copia de semana, copia de mes, sugerencias por histórico, inteligencia artificial, presets, repetición de patrón o importaciones.

Un histórico sin rol no puede completarse automáticamente desde `employees.role`.

Un patrón histórico con rol puede aportar una sugerencia, pero el rol resultante deberá continuar siendo válido en la sede y área del nuevo turno.

---

#### 19. Autoridad administrativa y frontera de servidor

La mutación del turno deberá protegerse en servidor.

La decisión administrativa debe resolver, como mínimo:

```text
ACTOR EFECTIVO
+
CAPACIDAD ADMINISTRATIVA
+
TRABAJADOR OBJETIVO
+
SEDE OBJETIVO
+
ROL OBJETIVO
+
ÁREA OBJETIVO CUANDO APLIQUE
+
ESTADO ACTUAL DEL TURNO
+
EFECTO RESULTANTE
+
AUDITORÍA
→
MUTACIÓN POSIBLE
```

El acceso a la pantalla de horarios no equivale a permiso de cada escritura.

Un cliente administrativo o `service_role` puede ejecutar técnicamente una operación, pero no constituye autorización empresarial.

La división definitiva entre consultar, crear, modificar, eliminar, revisar y publicar la programación permanece en `VISO-SCH-007` y en las tareas transversales de acciones de servidor.

---

#### 20. Reconciliación AS-IS de programación semanal

La superficie VISO observada en `src/app/staff/schedule/actions.ts` ya persiste `employee_shifts.operational_role` y consulta `vento_site_operational_role_matrix_v1`.

Sin embargo, el camino actual contiene inferencias que no constituyen autoridad TO-BE:

1. si no llega `operational_role` y existe un único código de rol en la matriz, puede utilizar ese código;
2. para otra sede del mismo bloque, si el rol enviado no existe y la sede posee un único rol, puede sustituirlo por ese rol;
3. la resolución de fila puede usar `is_default`;
4. puede elegir la única fila de un rol;
5. puede elegir la única área disponible para ese rol.

Esos mecanismos pueden conservarse únicamente como ayudas visibles de propuesta o preselección.

No deben resolver server-side la ausencia de un rol autoritativo del turno.

La escritura final de un turno laboral debe contener un código exacto validado.

---

#### 21. Reconciliación AS-IS de programación mensual

La superficie mensual observada separa un `roleContext` compuesto por rol y área y busca primero coincidencia exacta.

Cuando no la encuentra, el resolver actual puede usar:

```text
is_default
o única fila del rol
```

La primera coincidencia exacta es compatible con el contrato.

Los fallbacks posteriores no constituyen una asignación canónica por sí mismos.

La futura materialización deberá distinguir candidato sugerido de rol y área efectivamente elegidos para persistir, sin ampliar la responsabilidad de `VISO-AUTH-012` ni redefinir el workflow mensual de `VISO-SCH-*`.

---

#### 22. Reconciliación AS-IS de ayudas basadas en rol base

El helper de programación observado contiene un mapping local desde oficios o roles base hacia códigos operativos.

Entre otros, puede producir candidatos como:

```text
cajero → cajero_satelite
barista → barista_satelite
cocinero → cocinero_satelite
mesero → servicio_salon
gerente → gerencia_operativa
gerente_general → gerencia_operativa
propietario → propietario_admin
```

Ese mapping es evidencia AS-IS y no contrato de autoridad.

`propietario_admin` no pertenece a los doce `OperationalRoleCode` canónicos.

La futura implementación no podrá usar el mapping para persistir un rol sin pasar por el catálogo canónico y las matrices territoriales.

---

#### 23. Baseline físico de `employee_shifts`

El corte read-only verificado contiene:

```text
turnos totales = 3634
turnos laborales = 3063
descansos = 571

publicados = 3507
no publicados = 127

laborales con operational_role = 1522
laborales sin operational_role = 1541

descansos con operational_role = 0
roles desconocidos entre valores no nulos = 0
roles no canónicos entre valores no nulos = 0
roles inactivos entre valores no nulos = 0
cruces area_id → site_id incompatibles = 0
```

La columna física `employee_shifts.operational_role` es `text`, nullable y no posee una foreign key hacia `public.operational_roles`.

Existen índice y consumo operativo del campo, pero la integridad de identidad del rol no queda garantizada por FK.

Esta tarea no modifica la estructura física durante el cierre documental.

---

#### 24. Separación entre histórico y operación vigente

Los turnos laborales sin rol observados están concentrados en histórico:

```text
laborales sin rol = 1541
fecha mínima = 2026-03-16
fecha máxima = 2026-06-28
```

Los turnos laborales con rol observados abarcan:

```text
fecha mínima = 2026-06-24
fecha máxima = 2026-09-06
```

El corte actual muestra además:

```text
desde 2026-09-02
turnos laborales no cancelados = 119
con rol = 119
sin rol = 0

últimos 30 días anteriores al corte
turnos laborales no cancelados = 696
con rol = 696
sin rol = 0
```

Por tanto, esta tarea no declara que la operación vigente esté creando turnos laborales sin rol.

Las 1541 filas históricas permanecen como evidencia legacy y se entregan a `VISO-AUTH-011` para su clasificación y tratamiento contractual.

No se autoriza backfill en esta tarea.

---

#### 25. Estado físico del catálogo operativo

El corte read-only de `public.operational_roles` contiene:

```text
filas activas = 13
roles canónicos activos = 12
filas activas no canónicas = 1
```

La fila no canónica observada es `propietario_admin`.

Los doce códigos canónicos están activos.

Entre los turnos con `operational_role` no nulo observados:

```text
uso de código no canónico = 0
```

La existencia física de la fila legacy no autoriza su uso en nuevos turnos.

---

#### 26. Fallo cerrado

La administración deberá rechazar o bloquear:

| Caso | Resultado |
| --- | --- |
| Empleado inexistente o inactivo para una asignación prospectiva | Rechazar |
| Sede inexistente, inactiva o no programable | Rechazar |
| Trabajador sin asignación utilizable a la sede | Rechazar |
| Turno laboral sin rol en la mutación normal de VISO | No guardar como turno laboral completo |
| Rol inexistente | Rechazar |
| Rol inactivo | Rechazar |
| Rol fuera de los doce códigos canónicos | Rechazar |
| `propietario_admin` | Rechazar |
| Rol base u oficio legacy usado como `operational_role` | Rechazar |
| Rol no habilitado en la sede | Rechazar |
| Área perteneciente a otra sede | Rechazar |
| Binding de área obligatorio ausente o incompatible | Rechazar; diagnóstico específico reservado a `VISO-AUTH-012` |
| Perfil usado como autoridad después de guardar | Rechazar interpretación |
| Mapping de rol base usado como autoridad | Rechazar |
| Default o única fila usados para completar silenciosamente el rol | Rechazar inferencia |
| Área primaria o asignada usada para completar silenciosamente el turno | Rechazar inferencia |
| Descanso tratado como turno laboral sin rol | Rechazar clasificación |
| Cliente o payload manipulado amplía rol, sede o área | Rechazar |
| Cambio concurrente vuelve obsoleta la validación | Revalidar o rechazar |
| Actor sin autoridad administrativa suficiente | Rechazar |
| Auditoría requerida no persistible | No guardar |
| Fuente crítica no verificable | Fallar cerrado como indisponibilidad, no inventar rol |

---

#### 27. Handoff a VISO-AUTH-011

`VISO-AUTH-011` recibe una semántica cerrada:

```text
shift_kind = laboral
+
operational_role ausente
→ turno laboral sin rol operativo
```

y:

```text
shift_kind = descanso
+
operational_role = null
→ configuración válida de descanso
```

La tarea siguiente deberá distinguir histórico legacy sin rol, borrador laboral incompleto, turno laboral publicado sin rol, turno cancelado, descanso, fuente no verificable y rol desconocido o inactivo, que no equivale a ausencia limpia.

También deberá conservar:

```text
sin rol
→ NO completar desde perfil
→ NO completar desde rol base
→ NO completar desde default
→ NO completar desde último turno
```

El baseline entregado es:

```text
1541 turnos laborales históricos sin rol
0 turnos laborales no cancelados desde 2026-09-02 sin rol
```

`VISO-AUTH-011` no podrá reinterpretar esas cifras como una autorización de backfill automático.

---

#### 28. Frontera con VISO-AUTH-012 y VISO-SCH

Esta tarea no absorbe responsabilidades posteriores.

`VISO-AUTH-012` conserva la validación específica de incompatibilidad entre rol, sede y área del turno.

`VISO-SCH-001` a `VISO-SCH-008` conservan el contrato funcional completo de programación: unidad y periodo, bloques y duración, límites, borrador, revisión, publicación y corrección, conflictos y concurrencia, autorización por acción, eventos, notificaciones y cierre antes de E5.

Por tanto, `VISO-AUTH-010` fija únicamente la semántica de asignar y conservar un rol operativo explícito dentro del turno.

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea materializa documentalmente obligaciones ya registradas sobre rol operativo efectivo, separación entre carril administrativo y operativo, resolución territorial, protección server-side, invalidación y auditoría.

No introduce un nuevo código de rol, una nueva modalidad de autorización, un nuevo estado de programación, una transición empresarial nueva ni una regla de seguridad sin cobertura vigente.

Las futuras tareas `VISO-SCH-*` mantienen su propio mandato de materializar requisitos de programación cuando se desarrollen; esta tarea no los adelanta.

---

#### 30. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza la cobertura vigente que protege:

- `TREQ-AUTH-001` — una lista o nombre de rol no concede autorización final;
- `TREQ-AUTH-004` — los evaluadores deben producir decisiones equivalentes para el mismo actor y contexto;
- `TREQ-AUTH-008` — el carril operativo exige turno aplicable, rol operativo efectivo y contexto territorial conforme al permiso;
- `TREQ-AUTH-009` — sede y área se resuelven determinísticamente y los cruces territoriales se deniegan;
- `TREQ-AUTH-013` — formularios, API o RPC manipulados no pueden ampliar la mutación;
- `TREQ-AUTH-014` — cambios de turno, área, rol o asignación invalidan contexto derivado;
- `TREQ-AUTH-015` — decisiones y acciones protegidas conservan evidencia correlacionable;
- `TREQ-VISO-001` — la configuración administrativa de VISO debe ser coherente con lo consumido por las aplicaciones.

Estas referencias son trazabilidad heredada. No cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito existente.

---

#### 31. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, VISO-AUTH-009, AUTH-MOD-005 y AUTH-MOD-007 a 010, ANIMA-AUTH-001 a 006, catálogo `OperationalRoleCode@1.0.0`, 04A aplicable, código VISO semanal y mensual, helpers de planificación y estado read-only de Supabase para `employee_shifts` y `operational_roles`. |
| OPERATIVA | NOT_APPLICABLE | No se crearon, modificaron, publicaron, cancelaron ni corrigieron turnos reales durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, `employee_shifts`, catálogos, matrices, funciones, RLS, migraciones, datos ni despliegues. |

---

#### 32. Criterios de aceptación

- [ ] `employee_shifts.operational_role` representa el rol asignado al turno y no una preferencia del trabajador.
- [ ] Rol asignado y rol efectivo permanecen separados.
- [ ] Un turno borrador con rol no constituye contexto operativo.
- [ ] Se aceptan exclusivamente los doce `OperationalRoleCode` canónicos.
- [ ] `propietario_admin` queda excluido de nuevos turnos.
- [ ] Un código desconocido, inactivo o legacy falla cerrado.
- [ ] La ausencia de FK física sobre `operational_role` no relaja la validación canónica.
- [ ] Toda asignación prospectiva exige trabajador activo.
- [ ] Toda asignación prospectiva exige una sede válida y asignada al trabajador.
- [ ] El rol debe estar habilitado en la sede.
- [ ] El área del turno se valida separadamente y no se infiere desde `employee_areas`.
- [ ] `area_id = null` nunca significa todas las áreas.
- [ ] `default_operational_role` puede sugerir planificación pero no sustituye el rol del turno.
- [ ] Un perfil sin rol no recibe fallback.
- [ ] Un turno persistido sin rol no se completa silenciosamente desde el perfil.
- [ ] `employees.role` no se utiliza como autoridad para `operational_role`.
- [ ] El mapping base → operativo observado no puede persistir autoridad por sí solo.
- [ ] `is_default`, una única fila y una única área pueden ayudar a la UI, pero no completar silenciosamente la autoridad del turno.
- [ ] Todo turno laboral creado por el camino normal termina con rol operativo explícito y válido.
- [ ] Todo descanso conserva `operational_role = null`.
- [ ] Un descanso no se clasifica como turno laboral incompleto.
- [ ] La publicación no cambia automáticamente el rol asignado ni lo vuelve efectivo antes del contexto aplicable.
- [ ] Un cambio de rol revalida trabajador, sede, rol, área, estado, autoridad y efectos.
- [ ] El cambio de perfil no reescribe turnos existentes.
- [ ] El cambio de rol del turno no reescribe el rol base.
- [ ] Los requisitos de marcación externa permanecen separados del rol.
- [ ] Planificación masiva, copia, histórico e IA pasan por las mismas validaciones.
- [ ] La superficie semanal AS-IS no conserva fallbacks silenciosos como autoridad TO-BE.
- [ ] La superficie mensual AS-IS distingue coincidencia exacta de sus fallbacks de default o fila única.
- [ ] El baseline conserva 3634 turnos, 3063 laborales y 571 descansos.
- [ ] El baseline conserva 1522 turnos laborales con rol y 1541 históricos sin rol.
- [ ] Los 1541 laborales sin rol terminan el 2026-06-28 en el corte observado.
- [ ] Desde 2026-09-02 existen 119 turnos laborales no cancelados y los 119 tienen rol.
- [ ] En los 30 días anteriores al corte existen 696 turnos laborales no cancelados y los 696 tienen rol.
- [ ] Los valores no nulos observados contienen cero roles desconocidos, no canónicos o inactivos.
- [ ] Los descansos observados contienen cero roles operativos.
- [ ] `public.operational_roles` conserva 12 códigos canónicos activos más una fila legacy `propietario_admin` que no se utiliza como autoridad.
- [ ] No se realiza backfill histórico en esta tarea.
- [ ] `VISO-AUTH-011` recibe la detección y clasificación de turnos laborales sin rol.
- [ ] `VISO-AUTH-012` conserva el diagnóstico específico de incompatibilidad de área.
- [ ] `VISO-SCH-*` conserva el workflow integral de programación.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 33. Límites

Esta tarea no modifica código de VISO, `public.employee_shifts`, `public.operational_roles`, `public.site_operational_roles`, `public.employee_sites`, `public.employee_areas`, perfiles operativos, asistencia, check-ins, check-outs ni dispositivos compartidos.

Tampoco crea una foreign key para `operational_role`, elimina `propietario_admin`, corrige RLS legacy, cambia helpers de planificación, cambia fallbacks semanales o mensuales, redefine el workflow de borrador o publicación, define límites de horas o conflictos de calendario, cambia o publica turnos reales, hace backfill de las 1541 filas históricas, asigna roles retroactivamente, completa turnos desde rol base/perfiles/defaults, implementa `VISO-AUTH-011` o `VISO-AUTH-012`, desarrolla `VISO-SCH-001` a `VISO-SCH-008`, modifica permisos o matrices RBAC, modifica guards/RPC/RLS/triggers/grants, crea migraciones, ejecuta SQL de escritura, selecciona package, prepara o aprueba package gate ni autoriza o ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 34. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-009 — Administrar áreas asignadas`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-010 — Asignar rol operativo al turno`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-011 — Validar turnos sin rol operativo`


### ✅ VISO-AUTH-011 — Validar turnos sin rol operativo

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-010 — Asignar rol operativo al turno
**Tarea siguiente:** VISO-AUTH-012 — Validar turnos con área incompatible
**Tipo de tarea:** documental; definición del contrato canónico de detección, clasificación y bloqueo de turnos laborales sin rol operativo, incluido el gate previo a publicación y la reconciliación del histórico legacy, sin inferir ni completar el rol desde perfiles, rol base, defaults, histórico, área o cliente
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma única qué significa que un turno carezca de rol operativo, cuándo esa ausencia es válida, cuándo representa un turno laboral incompleto o inválido, qué debe bloquear VISO antes de publicar y cómo se conserva el histórico legacy sin inventar autoridad retroactiva.

La regla raíz queda:

```text
shift_kind = laboral
+
operational_role ausente
→
turno laboral sin rol operativo
```

y:

```text
shift_kind = descanso
+
operational_role = null
→
ausencia válida de rol
```

Un turno laboral sin rol no puede convertirse en contexto operativo mediante fallback.

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-005` — identidad del rol operativo;
- `AUTH-MOD-007` y `AUTH-MOD-008` — sede y área del turno;
- `AUTH-MOD-009` — turno publicado;
- `AUTH-MOD-010` — check-in activo;
- `AUTH-CTX-010` a `AUTH-CTX-013` — resolución del turno y contexto operativo;
- `AUTH-CTX-029` — frescura e invalidación;
- `VISO-AUTH-007` — perfil operativo como configuración de planificación;
- `VISO-AUTH-010` — asignación explícita del rol operativo al turno;
- el catálogo compartido `OperationalRoleCode@1.0.0`;
- los reason codes públicos vigentes, incluido `AUTH_OPERATIONAL_ROLE_REQUIRED`;
- el reason code de disponibilidad `OPERATIONAL_ROLE_NOT_AVAILABLE`, reservado a ausencia de rol porque no existe turno aplicable.

La tarea no crea un nuevo reason code público ni un segundo concepto de rol operativo.

---

#### 3. Definición exacta de ausencia

Para esta validación, el rol está ausente cuando el valor de entrada normalizado no contiene un código:

```text
operational_role = null
OR
trim(operational_role) = ""
```

La base física observada utiliza una columna `text` nullable. La validación de frontera deberá tratar un string vacío o compuesto solo por espacios como ausencia, aunque el baseline actual se materialice principalmente mediante `null`.

La ausencia se evalúa sobre el dato autoritativo del turno. No se evalúa sobre una etiqueta visible, una opción seleccionada únicamente en cliente, un perfil, un rol base, un default o una matriz que contenga una sola opción.

---

#### 4. Matriz canónica de clasificación

| Turno observado | Rol | Clasificación | ¿Bloquea publicación? | ¿Puede participar en contexto operativo? |
| --- | --- | --- | ---: | ---: |
| `descanso` | ausente | ausencia válida | No por esta causa | No aplica |
| `descanso` | presente | no es rol faltante; contradice la representación aprobada del descanso | Según contrato propietario | No por ser descanso |
| `laboral` borrador | presente y válido | completo respecto del rol | No por esta causa | No mientras siga siendo borrador |
| `laboral` borrador | ausente | borrador laboral incompleto | Sí | No |
| `laboral` publicado y vigente | presente y válido | candidato a turno operativo | No por esta causa | Solo si satisface el resto del contrato |
| `laboral` publicado | ausente | configuración publicada inválida para carril operativo | Ya no debió publicarse; debe fallar cerrado al consumir | No |
| `laboral` cancelado | ausente | deuda histórica no ejecutable | No aplica mientras permanezca cancelado | No |
| `laboral` con rol desconocido, inactivo o no canónico | presente pero inválido | rol inválido, no rol ausente | Sí por su contrato propietario | No |
| fuente crítica no verificable | indeterminado | validación inconclusa | Sí hasta resolver fuente | No |

El orden de evaluación queda:

```text
TIPO DE TURNO
→ PRESENCIA DEL ROL
→ IDENTIDAD Y VIGENCIA DEL ROL
→ COMPATIBILIDAD CON SEDE
→ COMPATIBILIDAD CON ÁREA
→ RESTO DEL CONTEXTO OPERATIVO
```

`VISO-AUTH-011` cierra el segundo paso. `VISO-AUTH-012` recibe únicamente el paso territorial posterior.

---

#### 5. Descansos

Los descansos están excluidos del defecto “turno sin rol operativo”.

La representación aprobada es:

```text
shift_kind = descanso
operational_role = null
```

Por tanto:

- un descanso no exige un `OperationalRoleCode`;
- un descanso publicado no se vuelve inválido por tener rol nulo;
- un descanso no debe contarse en métricas de turnos laborales sin rol;
- un validador que marque descansos como missing-role produce un falso positivo;
- agregar un rol a un descanso para satisfacer un validador sería una corrección incorrecta.

La ausencia de rol en descanso es `NOT_APPLICABLE` para la función operativa.

---

#### 6. Borrador laboral incompleto

Un turno laboral en borrador puede encontrarse físicamente sin rol por deuda histórica, importación, copia legacy o estado previo a la aplicación completa del contrato.

Ese estado es representable para diagnóstico, pero no es un resultado completo de la mutación normal de VISO.

Reglas:

1. debe mostrarse explícitamente como incompleto;
2. no puede publicarse;
3. no puede usarse como fuente de autoridad;
4. no puede repararse automáticamente;
5. una edición que lo deje listo para publicación debe exigir selección explícita y validada del rol;
6. un nuevo flujo normal no debe producir voluntariamente esta forma como resultado exitoso.

La existencia de un borrador incompleto no autoriza un fallback.

---

#### 7. Gate obligatorio antes de publicación

Toda operación que publique uno o más turnos deberá ejecutar, inmediatamente antes de escribir `published_at` o su equivalente, una validación server-side sobre el conjunto exacto que pretende publicar.

Para cada fila:

```text
shift_kind = laboral
→ operational_role debe estar presente
```

```text
shift_kind = descanso
→ operational_role nulo es válido
```

Si existe al menos un turno laboral sin rol:

```text
PUBLICACIÓN COMPLETA
→ BLOQUEADA
```

y el efecto debe ser:

```text
published_at sin cambios
published_by sin cambios
cero publicación parcial silenciosa
cero notificaciones de publicación exitosa
cero autoridad nueva
```

La validación debe ocurrir sobre datos releídos o bloqueados de forma suficiente para que una modificación concurrente no invalide la decisión entre el check y la escritura.

---

#### 8. Atomicidad del bloqueo de publicación

Una publicación semanal, mensual o masiva es una intención administrativa única para el alcance seleccionado.

Si dentro de ese alcance existen filas laborales sin rol:

- no se publican solo las filas válidas dejando las inválidas atrás sin declaración;
- no se elimina la fila inválida;
- no se cambia automáticamente a descanso;
- no se sustituye el rol;
- no se altera el trabajador o la sede;
- no se recorta silenciosamente el periodo.

VISO deberá devolver un conflicto accionable que permita localizar las filas afectadas dentro del ámbito que el actor está autorizado a administrar.

La corrección y un nuevo intento son operaciones posteriores.

---

#### 9. Información mínima del conflicto

La superficie administrativa deberá poder explicar, con alcance autorizado, al menos:

- cantidad de turnos laborales bloqueantes;
- trabajador objetivo o referencia administrativa equivalente;
- fecha;
- intervalo horario;
- sede;
- identidad del turno;
- estado de publicación;
- acción requerida: asignar un rol operativo válido antes de publicar.

El mensaje no debe sugerir cambiar el rol base, crear un perfil para desbloquear autoridad, utilizar el último turno, aceptar un default como autorización o ignorar el conflicto.

La interfaz podrá agrupar los conflictos, pero no ocultar su cardinalidad.

---

#### 10. Reason code operativo

Cuando una solicitud protegida encuentra un turno laboral aplicable pero el turno carece de rol operativo, la ausencia corresponde al reason code público existente:

```text
AUTH_OPERATIONAL_ROLE_REQUIRED
```

No corresponde utilizar:

```text
OPERATIONAL_ROLE_NOT_AVAILABLE
```

porque ese código de disponibilidad representa el caso donde no existe rol operativo al no existir turno aplicable.

La distinción queda:

```text
NO HAY TURNO APLICABLE
→ OPERATIONAL_ROLE_NOT_AVAILABLE
```

```text
HAY TURNO LABORAL APLICABLE
+
EL TURNO NO TIENE ROL
→ AUTH_OPERATIONAL_ROLE_REQUIRED
```

Una ausencia ordinaria no se convierte por sí sola en `AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT` cuando existe un reason code más específico.

---

#### 11. Fallo cerrado en el carril operativo

Un turno laboral sin rol nunca produce un rol operativo efectivo.

Si un consumidor encuentra ese turno dentro de una evaluación operativa:

```text
operational_role_effective = null
operational_lane = no ejecutable
```

La aplicación debe preservar la sesión cuando el contrato lo permita, pero la acción que requiera el carril operativo no puede continuar.

Ninguno de estos datos puede reparar el turno durante la evaluación:

- `employees.role`;
- `employee_site_operational_profiles.default_operational_role`;
- rol de navegación;
- área;
- sede primaria;
- último turno;
- primer rol de la matriz;
- fila `is_default`;
- única opción disponible;
- caché cliente.

---

#### 12. Rol presente pero inválido

Un valor presente que no pertenezca al catálogo canónico, esté inactivo o no sea admisible para el turno no se clasifica como “rol ausente”.

```text
operational_role = "valor"
+
valor desconocido/inactivo/no canónico
→
ROL PRESENTE PERO INVÁLIDO
```

No deberá normalizarse a `null` para reutilizar el error de ausencia.

`VISO-AUTH-010` conserva la identidad y vigencia del rol; `VISO-AUTH-012` conserva la incompatibilidad territorial posterior.

---

#### 13. Fuente no verificable

Si la lectura del turno o de un dato crítico falla, no existe evidencia suficiente para afirmar que el rol está ausente.

La salida es una validación inconclusa o indisponibilidad técnica conforme al contrato transversal aplicable.

Queda prohibido:

```text
ERROR DE LECTURA
→ asumir operational_role = null
```

y también:

```text
ERROR DE LECTURA
→ usar un default
```

El sistema falla cerrado sin fabricar la causa.

---

#### 14. Copia de turnos y propagación de deuda

Copiar una fila es crear una nueva configuración prospectiva.

Por tanto, una operación de copia, asignación masiva, duplicación de día o copia de semana no puede propagar automáticamente:

```text
shift_kind = laboral
+
operational_role ausente
```

desde una fuente legacy hacia un nuevo borrador.

Si la fuente contiene un turno laboral sin rol:

- la operación debe identificar el conflicto;
- no debe inventar el rol;
- no debe reutilizar el rol base;
- no debe rellenarlo desde un perfil;
- no debe copiar silenciosamente la fila defectuosa.

El actor deberá resolver explícitamente el rol antes de materializar el nuevo turno laboral conforme al contrato.

---

#### 15. Generadores, IA e importaciones

La misma regla aplica a sugerencias automáticas, generación de horarios, IA, importaciones, presets, plantillas y repetición de patrones.

Una propuesta puede contener una necesidad aún sin resolver en memoria o en una vista previa, pero una mutación que materialice un turno laboral nuevo no puede declarar éxito dejando `operational_role` ausente.

La automatización no adquiere permiso para inferir autoridad.

---

#### 16. Corrección explícita

Resolver un borrador laboral sin rol exige una mutación explícita del turno:

```text
shift_id conocido
+
rol canónico seleccionado
+
rol activo
+
compatibilidad con sede
+
área válida cuando corresponda
+
autoridad administrativa
+
revalidación server-side
→
turno corregido respecto del rol
```

La corrección no modifica el rol base, no modifica automáticamente el perfil, no reescribe otros turnos, no cambia permisos y no publica por sí sola salvo que el workflow propietario combine ambas operaciones de manera explícita y atómica.

---

#### 17. Histórico legacy

El histórico con rol ausente se conserva como evidencia.

Reglas:

1. no se hace backfill automático;
2. no se deduce el rol desde el trabajador;
3. no se deduce desde turnos adyacentes;
4. no se deduce desde el área;
5. no se deduce desde el perfil actual;
6. no se deduce desde una matriz actual para explicar una configuración histórica;
7. una fila cancelada permanece no ejecutable;
8. una fila histórica publicada no obtiene autoridad actual por haber sido publicada;
9. una corrección histórica, si alguna vez es necesaria, deberá tener alcance, evidencia y autorización propios.

La deuda histórica no bloquea por existencia todo el sistema si queda fuera del contexto temporal aplicable.

---

#### 18. Baseline físico read-only

El corte remoto verificado contiene:

```text
turnos totales = 3634
turnos laborales = 3063
descansos = 571

turnos laborales con rol = 1522
turnos laborales sin rol = 1541
```

Los `1541` turnos laborales sin rol se descomponen exactamente así:

| Estado | Publicación | Sin rol | Rango del defecto |
| --- | --- | ---: | --- |
| `scheduled` | publicado | 1534 | 2026-03-16 a 2026-06-28 |
| `scheduled` | borrador | 4 | 2026-04-20 a 2026-05-20 |
| `cancelled` | publicado | 2 | 2026-03-31 a 2026-06-24 |
| `confirmed` | publicado | 1 | 2026-04-14 |

La suma es:

```text
1534 + 4 + 2 + 1 = 1541
```

Los `571` descansos observados también tienen rol nulo:

```text
31 borradores
540 publicados
```

y son válidos respecto de esta regla.

---

#### 19. Separación entre deuda histórica y operación reciente

El último turno laboral sin rol observado termina el:

```text
2026-06-28
```

El corte heredado de `VISO-AUTH-010` conserva:

```text
desde 2026-09-02
turnos laborales no cancelados = 119
con rol = 119
sin rol = 0
```

y para los treinta días anteriores al corte:

```text
turnos laborales no cancelados = 696
con rol = 696
sin rol = 0
```

Por tanto, la evidencia no demuestra que la operación reciente esté creando turnos laborales sin rol en el camino habitual.

La deuda histórica sigue siendo relevante para auditoría, consultas históricas, copias, duplicaciones, reportes y consumidores que no acoten correctamente el contexto.

---

#### 20. Reconciliación AS-IS del guardado semanal

La superficie semanal actual intenta producir turnos laborales con rol y descansos con rol nulo.

Sin embargo, antes de guardar puede resolver automáticamente el rol mediante único rol disponible, default, única fila o única área.

Esos fallbacks ya fueron clasificados por `VISO-AUTH-010` como ayudas de planificación y no como autoridad.

`VISO-AUTH-011` no reabre esa decisión. Su responsabilidad es asegurar que, si pese a cualquier camino existe una fila laboral con rol ausente, la ausencia sea detectada y no atraviese los gates posteriores.

---

#### 21. Reconciliación AS-IS de copias y asignaciones masivas

La implementación semanal observada contiene caminos que copian literalmente:

```text
operational_role: source.operational_role ?? null
```

hacia nuevos borradores.

Eso ocurre en superficies de asignación masiva, copia de semana anterior y copia de un día hacia otros días.

Si una fuente legacy carece de rol, esos caminos pueden propagar la deuda hacia una fecha nueva sin seleccionar un rol canónico.

Ese comportamiento no cumple el contrato TO-BE. La futura materialización deberá validar las filas fuente antes de crear cualquier turno laboral nuevo.

---

#### 22. Reconciliación AS-IS de publicación semanal

La publicación semanal observada consulta actualmente:

```text
id
employee_id
shift_date
start_time
end_time
published_at
```

y después marca como publicados todos los borradores del periodo.

No consulta ni valida en ese gate:

```text
shift_kind
operational_role
```

Por tanto, el camino actual no demuestra:

```text
TODOS LOS TURNOS LABORALES A PUBLICAR TIENEN ROL
```

antes de escribir `published_at`.

Esta es una brecha física específica de `VISO-AUTH-011`.

---

#### 23. Reconciliación AS-IS de publicación mensual

La publicación mensual observada sí carga `shift_kind` y `operational_role`, pero el gate actual valida límites mensuales y después publica todos los borradores del alcance.

No se observó un rechazo previo equivalente a:

```text
laboral + operational_role ausente
→ bloquear publicación
```

Por tanto, tener el dato cargado no equivale a validarlo.

La futura materialización deberá aplicar el mismo precondition contract que en publicación semanal.

---

#### 24. Reconciliación AS-IS del API rápido

El route handler rápido observado separa correctamente:

```text
action = labor
→ resuelve un rol antes de insertar
```

y:

```text
action = rest
→ operational_role = null
```

Si no puede resolver un rol laboral, devuelve error y no guarda el turno laboral.

Este camino reduce la creación directa del defecto, pero no sustituye el gate de publicación ni protege otros caminos de copia o importación.

---

#### 25. Reconciliación AS-IS de la vista operativa mensual

La vista mensual observada ya puede representar una fila laboral sin rol mediante el texto humano:

```text
Sin rol operativo
```

y representa descansos como:

```text
Descanso
```

Esa capacidad de visualización es compatible como diagnóstico. No constituye reparación, autorización, publicación válida, fallback ni evidencia de que el turno pueda operar.

---

#### 26. Consumidores posteriores

ANIMA consume turnos publicados y lee `operational_role` desde `employee_shifts`.

Por tanto, VISO no puede suponer que un consumidor posterior corregirá un turno publicado incompleto.

La obligación es:

```text
VISO PUBLICA CONFIGURACIÓN VÁLIDA
→ consumidores reciben rol explícito
```

y no:

```text
VISO PUBLICA SIN ROL
→ consumidor deduce rol
```

Cualquier fallback de diagnóstico o presentación en un consumidor no se eleva a contrato de autorización.

---

#### 27. Autoridad administrativa

Detectar el defecto es una operación de lectura; corregirlo o publicar continúa siendo una mutación protegida.

La mutación deberá validar en servidor:

```text
ACTOR EFECTIVO
+
CAPACIDAD ADMINISTRATIVA
+
TERRITORIO
+
TURNO OBJETIVO
+
ROL OBJETIVO CUANDO SE CORRIGE
+
ESTADO ACTUAL
+
EFECTO RESULTANTE
+
AUDITORÍA
→
MUTACIÓN POSIBLE
```

Un cliente administrativo o `service_role` no sustituye la autorización empresarial. El acceso a la pantalla tampoco equivale a autorización para modificar o publicar.

---

#### 28. Handoff a VISO-AUTH-012

`VISO-AUTH-012` recibe únicamente turnos laborales cuyo rol ya está presente.

El orden de evaluación queda:

```text
1. shift_kind
2. presencia de operational_role
3. identidad/vigencia del rol
4. compatibilidad rol × sede
5. compatibilidad rol × área
```

Si el rol está ausente:

```text
VISO-AUTH-011 BLOQUEA
→
VISO-AUTH-012 NO DEBE INVENTARLO
```

Si el rol existe pero el área es incompatible:

```text
VISO-AUTH-011 NO LO CLASIFICA COMO AUSENTE
→
VISO-AUTH-012 RESUELVE LA INCOMPATIBILIDAD
```

La tarea siguiente no podrá utilizar el área para inferir el rol.

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La detección de un turno laboral sin rol, el fallo cerrado del carril operativo, la protección server-side de mutaciones, la invalidación del contexto, la trazabilidad y la coherencia entre VISO y consumidores ya están cubiertos por requisitos vigentes.

La tarea no introduce un nuevo reason code, un nuevo estado de turno, una nueva modalidad de autorización, una nueva identidad territorial ni una nueva transición empresarial que exija ampliar el registro.

---

#### 30. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-AUTH-001` — un nombre o lista de roles no concede autorización final;
- `TREQ-AUTH-008` — el carril operativo exige turno publicado y vigente, check-in activo, rol operativo efectivo y compatibilidad territorial;
- `TREQ-AUTH-009` — sede y área se resuelven de forma determinista y los cruces territoriales se deniegan;
- `TREQ-AUTH-013` — formularios, API, RPC y mutaciones manipuladas no pueden eludir la revalidación de servidor;
- `TREQ-AUTH-014` — cambios de turno, área, trabajador, rol o asignación invalidan contexto derivado;
- `TREQ-AUTH-015` — las decisiones y acciones protegidas conservan evidencia correlacionable;
- `TREQ-VISO-001` — la configuración administrada por VISO debe ser coherente con el resultado consumido por las aplicaciones operativas.

Estas referencias son trazabilidad heredada y no cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 31. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó el build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, `VISO-AUTH-010`, contratos de autorización, reason codes vigentes, 04A aplicable, código VISO semanal/mensual/API/vista operativa, consumidores ANIMA y el baseline read-only de `employee_shifts`. |
| OPERATIVA | NOT_APPLICABLE | No se publicaron, corrigieron, copiaron, cancelaron ni modificaron turnos reales durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, ANIMA, Supabase, turnos, funciones, RLS, migraciones, datos ni despliegues. |

---

#### 32. Criterios de aceptación

- [ ] `laboral + operational_role ausente` se clasifica como turno laboral sin rol.
- [ ] `descanso + operational_role = null` se clasifica como ausencia válida y no como defecto.
- [ ] `null`, string vacío y whitespace se normalizan como ausencia en la frontera de validación.
- [ ] Un borrador laboral sin rol se representa como incompleto y no puede publicarse.
- [ ] Un turno laboral publicado sin rol no puede producir rol operativo efectivo.
- [ ] Un turno cancelado sin rol permanece no ejecutable y no exige backfill automático.
- [ ] Un rol presente pero desconocido, inactivo o no canónico no se confunde con rol ausente.
- [ ] Una fuente no verificable no se convierte en ausencia inferida.
- [ ] El reason code operativo para turno aplicable sin rol reutiliza `AUTH_OPERATIONAL_ROLE_REQUIRED`.
- [ ] `OPERATIONAL_ROLE_NOT_AVAILABLE` permanece reservado al caso sin turno aplicable.
- [ ] Ningún perfil, rol base, default, último turno o área completa silenciosamente el rol.
- [ ] Toda publicación revalida server-side cada fila del alcance.
- [ ] Si existe al menos un laboral sin rol, la publicación completa se bloquea.
- [ ] El bloqueo conserva `published_at` y `published_by` sin cambios y no notifica éxito.
- [ ] No existe publicación parcial silenciosa.
- [ ] Copias y asignaciones masivas no propagan turnos laborales legacy sin rol.
- [ ] Generadores, IA e importaciones no adquieren permiso para inferir el rol.
- [ ] No se realiza backfill automático sobre las 1541 filas laborales históricas sin rol.
- [ ] El baseline conserva 1534 `scheduled` publicados sin rol, 4 `scheduled` borrador, 2 `cancelled` publicados y 1 `confirmed` publicado.
- [ ] Los 571 descansos con rol nulo quedan excluidos del defecto.
- [ ] El último laboral sin rol observado permanece en 2026-06-28.
- [ ] La evidencia reciente conserva cero laborales no cancelados sin rol desde 2026-09-02.
- [ ] La publicación semanal AS-IS se reconoce como brecha porque no consulta `shift_kind` ni `operational_role`.
- [ ] La publicación mensual AS-IS se reconoce como brecha porque carga esos campos pero no bloquea la ausencia.
- [ ] La vista “Sin rol operativo” se conserva como diagnóstico y no autoridad.
- [ ] ANIMA recibe el rol publicado sin tener que inferirlo.
- [ ] `VISO-AUTH-012` recibe únicamente la incompatibilidad posterior, sin inventar roles.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 33. Límites

Esta tarea no:

- modifica código de VISO;
- modifica código de ANIMA;
- modifica `public.employee_shifts`;
- agrega constraints o foreign keys;
- modifica funciones, triggers, RLS o grants;
- crea migraciones;
- ejecuta SQL de escritura;
- publica, despublica, cancela o corrige turnos reales;
- hace backfill de las 1541 filas sin rol;
- asigna roles retroactivamente;
- cambia estados de turno;
- modifica `published_at` ni `published_by`;
- modifica perfiles operativos ni roles base;
- modifica matrices rol × sede o rol × área;
- redefine `OperationalRoleCode`;
- crea reason codes;
- implementa mensajes de interfaz;
- implementa el gate semanal o mensual;
- cambia las funciones de copia;
- cambia generadores o IA;
- resuelve incompatibilidades de área, responsabilidad de `VISO-AUTH-012`;
- redefine el workflow integral de programación, responsabilidad de `VISO-SCH-*`;
- implementa auditoría física transversal;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 34. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-010 — Asignar rol operativo al turno`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-011 — Validar turnos sin rol operativo`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-012 — Validar turnos con área incompatible`


### ✅ VISO-AUTH-012 — Validar turnos con área incompatible

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-011 — Validar turnos sin rol operativo
**Tarea siguiente:** VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno
**Tipo de tarea:** documental; definición del contrato canónico de validación de compatibilidad territorial entre el rol operativo presente del turno, su sede y su área, incluido el gate previo a publicación, los estados `EXACT_BINDING`, `AREA_BINDING_UNRESOLVED` y `NO_AREA_NOT_REQUIRED`, y la reconciliación read-only del histórico sin inferir área desde defaults, perfiles, afiliaciones, selección, dispositivo, nombres o unicidad física
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma única cuándo el área de un turno laboral es compatible con el rol operativo y la sede ya resueltos, cuándo el área está ausente, es inválida, pertenece a otra sede, carece de binding exacto o permanece contractualmente no resuelta, y qué debe bloquear VISO antes de publicar o reutilizar ese turno.

La regla raíz queda:

```text
TURNO LABORAL
+
ROL OPERATIVO PRESENTE Y VÁLIDO
+
SEDE DEL TURNO RESUELTA
+
ÁREA DEL TURNO
+
CONTRATO ROL × SEDE × ÁREA
→
VALIDACIÓN DE COMPATIBILIDAD TERRITORIAL
```

La validación nunca puede transformar una ausencia o incompatibilidad en una selección automática.

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-MOD-007` — sede asignada y sede activa;
- `AUTH-MOD-008` — área asignada, área activa, área operativa del turno y pertenencia área–sede;
- `AUTH-MOD-009` — turno publicado;
- `AUTH-MOD-010` — check-in activo;
- `AUTH-CTX-010` a `AUTH-CTX-013` — resolución del turno y contexto operativo;
- `AUTH-CTX-029` — frescura e invalidación;
- `AUTH-SIM-004` — identidad exacta de área y compatibilidad rol–sede–área;
- `AUTH-SIM-005` — elegibilidad del turno y ausencia explícita de área;
- `VISO-AUTH-005` — relación padre rol operativo × sede;
- `VISO-AUTH-006` — matriz rol operativo × sede × área;
- `VISO-AUTH-007` — perfiles como configuración de planificación, no autoridad;
- `VISO-AUTH-008` — sedes asignadas al trabajador;
- `VISO-AUTH-009` — áreas asignadas como afiliación habitual, no área operativa efectiva;
- `VISO-AUTH-010` — rol operativo explícito del turno;
- `VISO-AUTH-011` — tratamiento de turno laboral sin rol operativo;
- los reason codes vigentes `AUTH_ACTIVE_AREA_REQUIRED`, `AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE` y `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`.

La identidad del área continúa gobernada por `public.areas`. El área operativa del turno continúa siendo `employee_shifts.area_id`.

---

#### 3. Handoff recibido de VISO-AUTH-011

Esta tarea comienza únicamente después de resolver la presencia del rol.

```text
operational_role ausente
→ VISO-AUTH-011
→ VISO-AUTH-012 no inventa rol
```

```text
operational_role presente
→ continuar con identidad y territorio
```

Por tanto, un turno sin rol no se reclasifica como incompatibilidad de área.

El orden contractual queda:

```text
1. shift_kind
2. presencia de operational_role
3. identidad y vigencia del rol
4. compatibilidad rol × sede
5. identidad y vigencia del área
6. compatibilidad rol × sede × área
```

`VISO-AUTH-012` es propietaria de los pasos 5 y 6 dentro del turno ya provisto de rol y sede.

---

#### 4. Unidad exacta de validación

La unidad de compatibilidad es:

```text
shift.site_id
+
shift.area_id
+
shift.operational_role
```

y se contrasta contra:

```text
site_id
+
area_id
+
operational_role_code
→ EXACT_BINDING
```

La coincidencia se realiza por identidades estables, no por etiquetas.

Quedan fuera de la identidad:

- `area_name`;
- `area_kind`;
- posición visual;
- orden de filas;
- `is_default`;
- área primaria;
- área seleccionada;
- perfil del trabajador;
- último turno;
- dispositivo;
- geocerca;
- texto de interfaz.

---

#### 5. Estados contractuales de compatibilidad

Se conservan exactamente los tres estados aprobados por `VISO-AUTH-006`:

| Estado | Significado | Resultado para un turno |
| --- | --- | --- |
| `EXACT_BINDING` | Existe relación activa y explícita rol × sede × área. | Puede ser compatible si el turno usa exactamente esa área y las demás condiciones son válidas. |
| `AREA_BINDING_UNRESOLVED` | La sede permite el rol, pero no existe área exacta ni decisión contractual que permita omitirla. | No produce compatibilidad; no se infiere área. |
| `NO_AREA_NOT_REQUIRED` | Una decisión contractual explícita determina que esa variante puede operar sin área. | Solo permite `area_id = null` dentro del contrato exacto que lo autoriza. |

El baseline vigente conserva:

```text
EXACT_BINDING = 13
AREA_BINDING_UNRESOLVED = 3
NO_AREA_NOT_REQUIRED = 0
TOTAL relaciones rol × sede = 16
```

---

#### 6. Orden determinista de evaluación

Para un turno laboral con rol presente, la validación debe seguir este orden:

```text
SEDE EXISTE Y ES VÁLIDA
→ ROL VÁLIDO PARA LA SEDE
→ ÁREA PRESENTE O AUSENCIA CONTRACTUAL
→ ÁREA EXISTE
→ ÁREA ACTIVA
→ ÁREA PERTENECE A LA SEDE
→ BINDING EXACTO ROL × SEDE × ÁREA
→ CONTEXTO OPERATIVO POSTERIOR
```

No se evalúa un binding exacto contra un `area_id` que ya es inexistente, inactivo o territorialmente contradictorio.

Una causa específica anterior conserva prioridad sobre una causa genérica posterior.

---

#### 7. Compatibilidad exacta

Un turno es compatible respecto de esta tarea cuando:

```text
shift_kind = laboral
+
operational_role canónico y vigente
+
site_id válido
+
area_id válido y activo
+
areas.site_id = shift.site_id
+
EXACT_BINDING activo para
  shift.site_id
  + shift.area_id
  + shift.operational_role
→
AREA_COMPATIBLE
```

La compatibilidad de área no concede por sí misma:

- permiso;
- check-in;
- acceso a aplicación;
- acceso al recurso;
- autoridad administrativa;
- asignación laboral permanente;
- aprobación del turno;
- autorización final.

Es un prerrequisito territorial del carril operativo.

---

#### 8. Área obligatoria ausente

Cuando el rol y la configuración exigen un área exacta:

```text
EXACT_BINDING esperado
+
shift.area_id = null
→
ÁREA ACTIVA REQUERIDA Y AUSENTE
```

Ese estado:

- no puede completarse desde el binding conocido;
- no puede completarse desde un default;
- no puede completarse desde `employee_areas`;
- no puede completarse desde área primaria;
- no puede completarse desde selección administrativa;
- no puede completarse desde el área del último turno.

Para una evaluación operativa que requiere área, el reason code público existente es:

```text
AUTH_ACTIVE_AREA_REQUIRED
```

La posibilidad de conocer cuál área sería compatible no autoriza a escribirla retroactivamente en el turno.

---

#### 9. Área presente sin binding exacto

Cuando el área existe, está activa y pertenece a la sede, pero no existe la relación exacta para el rol:

```text
ROL VÁLIDO EN SEDE
+
ÁREA VÁLIDA DE ESA SEDE
+
NO EXISTE EXACT_BINDING
→
ROL INVÁLIDO PARA ESA ÁREA
```

El reason code público existente es:

```text
AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA
```

La presencia de otro binding del mismo rol en la misma sede no amplía la compatibilidad.

La presencia de otro rol en esa área tampoco amplía la compatibilidad.

---

#### 10. AREA_BINDING_UNRESOLVED

Los tres vínculos contractualmente no resueltos permanecen:

| Sede | Rol operativo | Estado |
| --- | --- | --- |
| `CENTRO_PROD` | `conductor_logistica` | `AREA_BINDING_UNRESOLVED` |
| `MOLKA_PRINCIPAL` | `operador_integral_satelite` | `AREA_BINDING_UNRESOLVED` |
| `VENTO_GROUP` | `gerencia_operativa` | `AREA_BINDING_UNRESOLVED` |

Para ellos:

```text
area_id = null
≠ compatible
≠ site-wide
≠ todas las áreas
≠ General
≠ NO_AREA_NOT_REQUIRED
```

Si una acción exige área y el turno no la posee, la evaluación falla cerrada.

Si el turno trae un área que no tiene un binding exacto autoritativo, esa área tampoco se acepta por conveniencia.

La salida contractual solo puede ocurrir mediante:

```text
AREA_BINDING_UNRESOLVED
→ EXACT_BINDING
```

con un área explícita y válida;

o:

```text
AREA_BINDING_UNRESOLVED
→ NO_AREA_NOT_REQUIRED
```

mediante una decisión contractual explícita que realmente permita operar sin área.

---

#### 11. NO_AREA_NOT_REQUIRED

`NO_AREA_NOT_REQUIRED` no se deriva de `null`.

Solo puede aplicarse cuando el contrato exacto demuestre simultáneamente que:

- el rol puede operar sin área en esa variante;
- el permiso evaluado no exige área;
- la acción no exige área;
- el recurso no exige área;
- la sede y el resto del contexto son válidos.

Regla:

```text
NO_AREA_NOT_REQUIRED explícito
+
acción no territorial a nivel área
+
recurso no territorial a nivel área
→
area_id puede permanecer null
```

El baseline vigente tiene:

```text
NO_AREA_NOT_REQUIRED = 0
```

Por tanto, esta tarea no inventa ninguna excepción site-wide para los tres vínculos no resueltos.

---

#### 12. Área inexistente, inactiva o de otra sede

Un `area_id` no se considera simplemente “incompatible con el rol” si su propia identidad territorial ya es inválida.

La clasificación previa debe distinguir:

| Caso | Resultado |
| --- | --- |
| `area_id` inexistente | área inválida; fallo cerrado |
| área inactiva | área no utilizable; fallo cerrado |
| `areas.site_id != shift.site_id` | cruce territorial; fallo cerrado |
| referencia ambigua o no reproducible | validación inconclusa; fallo cerrado |
| área válida pero sin binding del rol | `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA` |

El sistema no debe ocultar un cruce de sede presentándolo únicamente como “rol no permitido en área”.

---

#### 13. Rol no válido para la sede

La incompatibilidad rol × sede es anterior a la incompatibilidad rol × área.

```text
rol no habilitado en shift.site_id
→ AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE
```

`VISO-AUTH-012` no puede convertir ese caso en un falso error de área.

Solo después de confirmar que el rol es elegible en la sede se evalúa el área.

---

#### 14. Área asignada al trabajador no es área del turno

`employee_areas` representa afiliación laboral habitual y no constituye un prerrequisito universal de operación.

Por tanto:

```text
trabajador sin employee_area
≠ turno incompatible
```

y:

```text
employee_area distinta de shift.area_id
≠ incompatibilidad automática
```

Un trabajador puede operar temporalmente en un área distinta de su afiliación habitual cuando:

- pertenece a la sede;
- el rol del turno es compatible con el área exacta;
- el turno es válido;
- las restricciones aplicables se satisfacen;
- el resultado queda auditado.

Nunca:

```text
employee_area
→ completar silenciosamente shift.area_id
```

---

#### 15. Área primaria y área seleccionada

Las preferencias administrativas permanecen fuera de la autoridad operativa.

```text
employee_areas.is_primary
≠ shift.area_id
```

```text
employee_settings.selected_area_id
≠ shift.area_id
```

Una primaria o selección puede orientar la interfaz de planificación, pero el valor persistido en el turno debe ser explícito y validado.

Una mutación server-side no puede usar esas preferencias para reparar una ausencia.

---

#### 16. Área de dispositivo, check-in y recurso

Se mantienen separados:

```text
área del turno
área del rol
área del recurso
área del dispositivo
área seleccionada
```

El check-in tampoco define el área del turno.

La compatibilidad de `VISO-AUTH-012` valida el área operacional persistida en el turno contra la matriz del rol.

Las restricciones adicionales del recurso o dispositivo se evalúan por sus contratos propietarios y pueden reducir autoridad, nunca ampliar el área del turno.

---

#### 17. Descansos

Un descanso no participa en la matriz rol × área porque:

```text
shift_kind = descanso
operational_role = null
area_id operacional = no aplicable
```

Por tanto, un descanso con área nula no es un “turno con área incompatible”.

Si una fila de descanso contiene rol o área operativos, esa contradicción pertenece al contrato de forma del turno y no debe transformarse en un falso binding operacional válido.

`VISO-AUTH-012` no asigna área a descansos.

---

#### 18. Borradores laborales

Un borrador laboral debe quedar territorialmente resoluble antes de publicación.

Estados posibles:

```text
rol + sede + área + EXACT_BINDING
→ borrador compatible respecto del área
```

```text
rol + sede + área ausente cuando se requiere
→ borrador incompleto
```

```text
rol + sede + área sin binding exacto
→ borrador incompatible
```

```text
rol + sede + AREA_BINDING_UNRESOLVED
→ borrador territorialmente no resuelto
```

Los últimos tres estados no pueden atravesar el gate de publicación.

---

#### 19. Gate obligatorio antes de publicación

Toda publicación semanal, mensual o masiva deberá releer y validar server-side el conjunto exacto de borradores que pretende publicar.

Por cada turno laboral:

1. el rol debe estar presente y válido;
2. la sede debe ser válida;
3. el binding rol × sede debe seguir activo;
4. el área debe satisfacer la semántica de esta tarea;
5. si existe área, debe ser activa y pertenecer a la sede;
6. debe existir `EXACT_BINDING`, salvo un futuro `NO_AREA_NOT_REQUIRED` explícito y aplicable;
7. la decisión debe ser fresca respecto del momento de escritura.

Si cualquier fila falla:

```text
PUBLICACIÓN DEL ALCANCE
→ BLOQUEADA
```

---

#### 20. Atomicidad del bloqueo de publicación

El bloqueo conserva:

```text
published_at sin cambios
published_by sin cambios
cero publicación parcial silenciosa
cero notificación de publicación exitosa
cero autoridad nueva
```

VISO no puede:

- publicar solo los turnos compatibles sin advertirlo;
- cambiar automáticamente el área;
- descartar las filas incompatibles;
- cambiar el rol;
- convertir el turno en descanso;
- reducir el rango solicitado;
- marcar el conflicto como warning no bloqueante.

La corrección y el nuevo intento son operaciones posteriores.

---

#### 21. Información mínima del conflicto

La superficie administrativa deberá poder mostrar, dentro del territorio autorizado del actor:

- cantidad total de filas bloqueantes;
- identidad del turno;
- trabajador;
- fecha;
- horario;
- sede;
- rol operativo;
- área persistida o ausencia;
- estado del binding;
- causa concreta;
- acción requerida.

Las causas deben distinguir como mínimo:

```text
AREA_REQUIRED_MISSING
AREA_NOT_FOUND
AREA_INACTIVE
AREA_WRONG_SITE
AREA_BINDING_UNRESOLVED
ROLE_INVALID_FOR_AREA
```

Estos nombres son clasificaciones administrativas internas de esta tarea y no crean nuevos reason codes públicos de autorización.

---

#### 22. Reason codes públicos reutilizados

Esta tarea no crea reason codes.

La distribución pública existente permanece:

```text
turno laboral aplicable sin rol
→ AUTH_OPERATIONAL_ROLE_REQUIRED
```

```text
rol presente pero no válido para la sede
→ AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE
```

```text
área activa requerida pero ausente
→ AUTH_ACTIVE_AREA_REQUIRED
```

```text
área válida de la sede pero rol no compatible con esa área
→ AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA
```

Una causa de área inexistente, inactiva, contradictoria o una fuente no verificable conserva la razón específica propietaria que corresponda; no se fuerza dentro de `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA` si el fallo ocurrió antes de evaluar compatibilidad del rol.

---

#### 23. Fallo cerrado del carril operativo

Un turno territorialmente no resuelto o incompatible no produce área operativa autorizable.

```text
area_compatible = false
→ carril operativo no ejecutable para la acción que exige ese contexto
```

Ninguno de estos valores puede reparar la evaluación:

- `employee_areas`;
- área primaria;
- área seleccionada;
- `employees.area_id`;
- perfil operativo;
- `is_default`;
- única fila del rol;
- única área de la sede;
- `area_kind`;
- nombre del rol;
- último turno;
- dispositivo;
- estado React;
- payload cliente.

La sesión podrá preservarse conforme al contrato de bloqueo, pero la acción protegida no continúa.

---

#### 24. Copias y asignaciones masivas

Copiar un turno crea una nueva configuración prospectiva.

Antes de materializar cada fila destino deberá revalidarse:

```text
target site
+
target role
+
target area
+
matriz vigente
+
estado vigente de área
```

Una fila histórica compatible en su fecha de origen no garantiza compatibilidad futura.

Una fila legacy con `area_id = null` no puede propagarse a una nueva fecha para un rol que exige binding exacto.

Una fila perteneciente a `AREA_BINDING_UNRESOLVED` tampoco puede transformarse automáticamente en site-wide durante la copia.

---

#### 25. Generadores, IA, presets e importaciones

La misma validación aplica a:

- generadores de horarios;
- sugerencias automáticas;
- IA;
- plantillas;
- presets;
- importaciones;
- repetición de patrones;
- creación mensual;
- creación semanal;
- edición masiva.

Una propuesta en memoria puede estar incompleta.

Una mutación que declare éxito no puede persistir un área inferida como autoridad.

La automatización debe entregar una intención que después se valida contra las mismas fuentes canónicas que una captura manual.

---

#### 26. Cambios posteriores e invalidación

La compatibilidad no es permanente.

Deben invalidar o exigir revalidación, según el contrato propietario:

- desactivación del área;
- cambio de sede del área;
- retiro del binding exacto;
- desactivación del rol;
- retiro del rol de la sede;
- cambio de `shift.area_id`;
- cambio de `shift.site_id`;
- cambio de `shift.operational_role`;
- sustitución de la revisión publicada;
- cancelación del turno;
- cambios contractuales que afecten `NO_AREA_NOT_REQUIRED`.

Una decisión en caché no puede continuar autorizando después de un cambio material.

---

#### 27. Histórico y política de no backfill

El histórico observado se conserva como evidencia.

Reglas:

1. no se reescribe por inferencia;
2. no se rellena `area_id` desde la matriz actual;
3. no se asume que la matriz actual era idéntica al contrato histórico;
4. no se usa el área del turno anterior o posterior;
5. no se usa la afiliación actual del trabajador;
6. no se convierte `null` histórico en site-wide;
7. no se corrigen filas publicadas sin una operación de corrección histórica explícita y auditada;
8. un turno histórico incompatible no obtiene autoridad actual por haber sido publicado.

La deuda histórica no autoriza degradar las reglas prospectivas.

---

#### 28. Baseline físico read-only de turnos con rol

El corte remoto verificado contiene:

```text
turnos laborales con operational_role = 1522
con area_id presente = 1368
con area_id nulo = 154
```

Para los `1368` turnos con área presente:

```text
área inexistente = 0
área inactiva = 0
área perteneciente a otra sede = 0
sin EXACT_BINDING activo = 0
EXACT_BINDING coincidente = 1368
```

Por tanto:

```text
1368 / 1368
```

de los turnos laborales con rol y área presente coinciden con el binding físico activo observado.

---

#### 29. Descomposición de los 154 turnos laborales con área nula

El corte se descompone exactamente así:

| Sede | Rol | Estado canónico del binding | Turnos | Publicados | Borradores | Rango |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `VENTO_GROUP` | `gerencia_operativa` | `AREA_BINDING_UNRESOLVED` | 81 | 81 | 0 | 2026-07-03 a 2026-07-25 |
| `MOLKA_PRINCIPAL` | `operador_integral_satelite` | `AREA_BINDING_UNRESOLVED` | 62 | 54 | 8 | 2026-06-29 a 2026-08-30 |
| `CENTRO_PROD` | `conductor_logistica` | `AREA_BINDING_UNRESOLVED` | 9 | 9 | 0 | 2026-06-24 a 2026-07-18 |
| `SAUDO` | `cocinero_satelite` | binding exacto `COCINA_BARRA` | 2 | 2 | 0 | 2026-06-26 a 2026-06-27 |
| **Total** |  |  | **154** | **146** | **8** |  |

La aritmética queda:

```text
81 + 62 + 9 = 152 AREA_BINDING_UNRESOLVED
152 + 2 = 154 area_id nulo
```

Los `152` casos de roles no resueltos no se reinterpretan como válidos ni reciben un área inferida.

---

#### 30. Dos defectos históricos claros de área requerida ausente

Existen exactamente dos filas observadas que combinan:

```text
site = SAUDO
role = cocinero_satelite
shift.area_id = null
binding exacto vigente = SAUDO / COCINA_BARRA / cocinero_satelite
published_at != null
```

Fechas:

```text
2026-06-26
2026-06-27
```

Ambas están publicadas y con estado `scheduled`.

El binding actual permite identificar que el rol tiene una relación exacta vigente, pero no autoriza un backfill histórico automático de `COCINA_BARRA`.

Se conservan como evidencia de deuda legacy.

---

#### 31. Operación reciente

Desde `2026-09-02`, el corte read-only contiene:

```text
turnos laborales no cancelados con rol = 119
missing required area = 0
area present without exact binding = 0
```

Por tanto, la evidencia actual no demuestra que el flujo reciente esté generando turnos incompatibles respecto de los bindings exactos vigentes.

La tarea se mantiene necesaria para impedir regresiones, proteger publicación y reconciliar caminos alternos de creación o copia.

---

#### 32. Reconciliación AS-IS del guardado semanal

El flujo semanal observado consulta `vento_site_operational_role_matrix_v1`.

Su resolución actual puede elegir una fila mediante:

1. coincidencia con el `area_id` enviado;
2. `is_default`;
3. única fila del rol;
4. único `area_id` disponible.

También puede sustituir el rol si la sede posee un único rol visible.

La primera coincidencia exacta es compatible con esta tarea.

Los fallbacks restantes son ayudas AS-IS de planificación y no autoridad TO-BE.

La futura materialización deberá impedir que una selección server-side por default o unicidad se convierta silenciosamente en `shift.area_id` autoritativo.

---

#### 33. Reconciliación AS-IS de creación mensual

El flujo mensual observado recibe un `roleContext` compuesto por rol y área.

Primero busca coincidencia exacta, pero si no la encuentra puede usar:

```text
is_default
o única fila del rol
```

Ese fallback no demuestra compatibilidad explícitamente seleccionada.

La futura materialización deberá distinguir:

```text
candidato sugerido
≠ área autoritativa persistida
```

y exigir una resolución exacta conforme a esta tarea.

---

#### 34. Reconciliación AS-IS del API rápido

El route handler rápido observado resuelve rol y área desde la matriz.

Puede seleccionar:

- rol explícito;
- rol default;
- único rol;
- fila `is_default`;
- única fila;
- único `area_id`.

Ese comportamiento es evidencia funcional AS-IS.

No constituye la semántica TO-BE de compatibilidad porque una fila inferida por default o unicidad no sustituye una selección exacta cuando el contrato exige área.

El API rápido deberá someter su resultado final al mismo contrato territorial que los planners completos.

---

#### 35. Reconciliación AS-IS de publicación semanal

La publicación semanal observada lee únicamente:

```text
id
employee_id
shift_date
start_time
end_time
published_at
```

antes de marcar los borradores como publicados.

No relee en ese gate:

```text
shift_kind
operational_role
site_id de cada fila como dato validado
area_id
binding rol × sede × área
```

Por tanto, la implementación actual no demuestra el precondition contract de `VISO-AUTH-012`.

La publicación semanal deberá incorporar validación territorial server-side antes del update de `published_at`.

---

#### 36. Reconciliación AS-IS de publicación mensual

La publicación mensual observada sí carga:

```text
shift_kind
operational_role
site_id
area_id
```

pero el gate actual se concentra en el límite mensual de horas antes de marcar todos los borradores del alcance como publicados.

No se observa una validación previa equivalente a:

```text
cada turno laboral
→ área compatible con rol + sede
```

Por tanto:

```text
dato cargado
≠ dato validado
```

La publicación mensual deberá aplicar el mismo gate territorial que la publicación semanal.

---

#### 37. Consumidores posteriores

ANIMA consume desde el turno publicado:

```text
shift.area_id
shift.operational_role
```

para construir contexto operacional.

Por tanto:

```text
VISO publica área válida
→ consumidor usa área explícita
```

y nunca:

```text
VISO publica área nula o incompatible
→ ANIMA repara desde perfil, selección o dispositivo
```

La corrección pertenece al productor administrativo antes de publicar o a un workflow explícito de corrección posterior.

---

#### 38. Autoridad administrativa

Detectar incompatibilidades puede ser una operación de lectura.

Corregir el turno o publicarlo es una mutación protegida.

La decisión debe resolver server-side:

```text
ACTOR EFECTIVO
+
CAPACIDAD ADMINISTRATIVA
+
TERRITORIO DEL ACTOR
+
TRABAJADOR OBJETIVO
+
TURNO OBJETIVO
+
SEDE OBJETIVO
+
ROL OBJETIVO
+
ÁREA OBJETIVO
+
ESTADO ACTUAL
+
EFECTO RESULTANTE
+
AUDITORÍA
→
MUTACIÓN POSIBLE
```

El acceso a la pantalla no equivale a autorización de escritura.

Un cliente administrativo o `service_role` tampoco sustituye la autorización empresarial.

---

#### 39. Handoff a VISO-AUTH-013

`VISO-AUTH-013` recibe únicamente contextos que preservan la causa real.

Cuando el turno es territorialmente compatible:

```text
trabajador
+
turno
+
sede
+
área exacta o ausencia explícitamente permitida
+
rol
→
candidato para vista previa efectiva
```

Cuando existe conflicto:

```text
VISO-AUTH-012
→ conserva causa y evidencia
→ VISO-AUTH-013 puede mostrarla
→ VISO-AUTH-013 no la repara
```

La vista previa no podrá:

- inferir área;
- escoger un default;
- usar área primaria como autoridad;
- transformar `AREA_BINDING_UNRESOLVED`;
- tratar `null` como wildcard;
- ocultar un binding inválido.

---

#### 40. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La compatibilidad de área exacta, pertenencia área–sede, estados no resueltos, prohibición de inferencias, fallo cerrado, coherencia entre fuentes territoriales, protección server-side, invalidación y consistencia de VISO ya están cubiertos por requisitos vigentes.

La tarea no introduce un nuevo `OperationalRoleCode`, una nueva identidad de área, un nuevo reason code, una nueva modalidad de autorización, un nuevo estado empresarial ni una nueva semántica de scope.

---

#### 41. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-AUTH-008` — el carril operativo exige turno publicado y vigente, rol operativo efectivo y compatibilidad territorial;
- `TREQ-AUTH-009` — sede y área se resuelven de forma determinista y los cruces territoriales se deniegan;
- `TREQ-AUTH-013` — ninguna mutación puede eludir validación server-side;
- `TREQ-AUTH-014` — cambios de turno, área, trabajador, rol o asignación invalidan contexto derivado;
- `TREQ-AUTH-015` — decisiones y acciones protegidas conservan evidencia correlacionable;
- `TREQ-AUTH-101` — un área exacta debe pertenecer a la sede aceptada y estar activa;
- `TREQ-AUTH-102` — se conservan los 13 bindings exactos y los tres `AREA_BINDING_UNRESOLVED` no se resuelven por inferencia;
- `TREQ-AUTH-103` — agregados `todos` o `GENERAL` no actúan como áreas exactas ni wildcard;
- `TREQ-AUTH-105` — `NO_AREA_NOT_REQUIRED` solo aplica cuando rol, permiso, acción y recurso no exigen área;
- `TREQ-AUTH-106` — área de rol, turno, recurso, dispositivo y selección permanecen separadas;
- `TREQ-VISO-001` — la configuración de VISO debe producir el mismo resultado consumido por las aplicaciones operativas.

Estas referencias son trazabilidad heredada y no cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas, `VISO-AUTH-006`, `VISO-AUTH-009`, `VISO-AUTH-010`, `VISO-AUTH-011`, contratos de área, reason codes vigentes, 04A aplicable, código VISO semanal/mensual/API, consumidor ANIMA y el baseline read-only actual de `employee_shifts`, `areas` y `site_operational_roles`. |
| OPERATIVA | NOT_APPLICABLE | No se modificaron, publicaron, corrigieron, copiaron ni cancelaron turnos reales durante este cierre documental. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, ANIMA, Supabase, tablas, bindings, índices, RPC, RLS, funciones, migraciones, datos ni despliegues. |

---

#### 43. Criterios de aceptación

- [ ] `VISO-AUTH-012` solo evalúa turnos cuyo rol ya está presente.
- [ ] La unidad de compatibilidad es `site_id + area_id + operational_role`.
- [ ] `area_id` y `area_kind` permanecen separados.
- [ ] El área operativa proviene del turno.
- [ ] Un área presente debe existir, estar activa y pertenecer a la sede del turno.
- [ ] Un turno con área presente necesita un `EXACT_BINDING` para ese rol y sede.
- [ ] Los 13 `EXACT_BINDING` del baseline permanecen intactos.
- [ ] Los 3 `AREA_BINDING_UNRESOLVED` permanecen no resueltos.
- [ ] `NO_AREA_NOT_REQUIRED` permanece en 0 mientras no exista decisión contractual explícita.
- [ ] `area_id = null` nunca significa todas las áreas.
- [ ] `AREA_BINDING_UNRESOLVED` nunca significa site-wide.
- [ ] Área ausente cuando es requerida reutiliza `AUTH_ACTIVE_AREA_REQUIRED`.
- [ ] Área válida pero incompatible con el rol reutiliza `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`.
- [ ] Rol inválido para la sede permanece bajo `AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE`.
- [ ] Turno sin rol permanece bajo `VISO-AUTH-011`.
- [ ] Área inexistente, inactiva o de otra sede no se oculta como simple role-area mismatch.
- [ ] `employee_areas` no se convierte en requisito operativo universal.
- [ ] Área primaria no completa el turno.
- [ ] Área seleccionada no completa el turno.
- [ ] Área del dispositivo o check-in no completa el turno.
- [ ] `is_default` no crea compatibilidad.
- [ ] Única fila o única área no crean compatibilidad.
- [ ] Descansos no se clasifican como turnos laborales con área incompatible.
- [ ] Borradores territoriales incompletos no pueden publicarse.
- [ ] Toda publicación revalida el área de cada turno laboral server-side.
- [ ] Una fila bloqueante impide publicación parcial silenciosa.
- [ ] El bloqueo conserva `published_at` y `published_by`.
- [ ] El bloqueo no emite notificación de publicación exitosa.
- [ ] Copias y asignaciones masivas revalidan el binding vigente.
- [ ] IA, presets e importaciones no adquieren permiso para inferir área.
- [ ] Cambios de área, rol, sede o binding invalidan decisiones derivadas.
- [ ] El baseline conserva 1522 turnos laborales con rol.
- [ ] El baseline conserva 1368 turnos con área presente y binding exacto coincidente.
- [ ] El baseline conserva 154 turnos laborales con rol y área nula.
- [ ] Los 154 se dividen en 152 sobre bindings no resueltos y 2 defectos históricos de área requerida ausente.
- [ ] Los 2 defectos históricos corresponden a `SAUDO / cocinero_satelite`, 2026-06-26 y 2026-06-27.
- [ ] No se ejecuta backfill automático sobre esas dos filas.
- [ ] No se ejecuta backfill automático sobre los 152 casos no resueltos.
- [ ] Desde 2026-09-02 se conservan 119 turnos laborales no cancelados con rol y cero incompatibilidades exactas observadas.
- [ ] El fallback semanal AS-IS por default/unicidad se reconoce como drift.
- [ ] El fallback mensual AS-IS por default/única fila se reconoce como drift.
- [ ] El API rápido AS-IS no se declara contrato TO-BE por resolver mediante defaults.
- [ ] La publicación semanal AS-IS se reconoce como brecha por no releer área ni binding.
- [ ] La publicación mensual AS-IS se reconoce como brecha por cargar área pero no ejecutar el gate territorial.
- [ ] ANIMA consume el área del turno sin repararla.
- [ ] `VISO-AUTH-013` recibe el resultado y no repara incompatibilidades.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 44. Límites

Esta tarea no:

- modifica código de VISO;
- modifica código de ANIMA;
- modifica `public.employee_shifts`;
- modifica `public.areas`;
- modifica `public.site_operational_roles`;
- modifica `public.employee_areas`;
- modifica `vento_site_operational_role_matrix_v1`;
- modifica RPC, RLS, grants, triggers, índices ni funciones;
- crea migraciones;
- ejecuta SQL de escritura;
- crea, publica, despublica, corrige, copia o cancela turnos;
- realiza backfill histórico;
- decide nuevos bindings rol × área;
- convierte `AREA_BINDING_UNRESOLVED` en `EXACT_BINDING`;
- convierte `AREA_BINDING_UNRESOLVED` en `NO_AREA_NOT_REQUIRED`;
- crea áreas;
- crea roles;
- modifica la matriz rol × sede;
- modifica la matriz rol × área;
- modifica perfiles;
- modifica sedes o áreas asignadas al trabajador;
- modifica roles base;
- crea reason codes;
- modifica mensajes públicos;
- redefine el workflow integral de programación de `VISO-SCH-*`;
- implementa el gate semanal o mensual;
- cambia funciones de copia;
- cambia generadores o IA;
- implementa la vista previa de `VISO-AUTH-013`;
- implementa simulación de `VISO-AUTH-014`;
- implementa auditoría física transversal;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-011 — Validar turnos sin rol operativo`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-012 — Validar turnos con área incompatible`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno`


### ✅ VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-012 — Validar turnos con área incompatible
**Tarea siguiente:** VISO-AUTH-014 — Crear simulador de permisos efectivos
**Tipo de tarea:** documental; definición de la vista previa administrativa canónica que proyecta, sin mutar, el contexto actual y propuesto de un trabajador sobre sede, área y turno, preservando las validaciones de asignación, rol y binding ya aprobadas y separando estrictamente contexto previo de simulación de permisos, origen de permisos y gestión de conflictos
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la vista previa administrativa que VISO deberá construir para que un administrador autorizado pueda observar, antes de guardar una configuración o al inspeccionar el estado vigente, cómo queda compuesto el contexto laboral de un trabajador respecto de:

```text
TRABAJADOR
×
SEDE
×
ÁREA
×
TURNO
```

La vista previa es una proyección explicativa y verificable del contexto. No es una decisión de autorización, no modifica datos y no sustituye la revalidación de servidor de la operación que finalmente guarde un cambio.

La regla raíz queda:

```text
FUENTES CANÓNICAS VIGENTES
+
CAMBIO PROPUESTO CUANDO EXISTA
+
REGLAS VISO-AUTH-007..012
→
VISTA PREVIA DE CONTEXTO
```

y nunca:

```text
VISTA PREVIA
→
PERMISO EFECTIVO
```

---

#### 2. Fuentes vinculantes

Esta tarea conserva y consume, sin redefinirlas:

- `ADR-AUTH-001`;
- `AUTH-MOD-002` — separación entre rol base y rol operativo;
- `AUTH-MOD-007` y `AUTH-MOD-008` — sede y área asignadas, administrativas y operativas;
- `AUTH-MOD-009` y `AUTH-MOD-010` — turno publicado y check-in;
- `AUTH-CTX-009` a `AUTH-CTX-013` — resolución territorial y laboral;
- `AUTH-CTX-029` — frescura e invalidación;
- `VISO-AUTH-001` a `VISO-AUTH-006` — catálogos y matrices;
- `VISO-AUTH-007` — perfil operativo por trabajador como preferencia de planificación;
- `VISO-AUTH-008` — sedes asignadas;
- `VISO-AUTH-009` — áreas asignadas como afiliación habitual opcional;
- `VISO-AUTH-010` — rol operativo explícito del turno;
- `VISO-AUTH-011` — turno laboral sin rol operativo;
- `VISO-AUTH-012` — compatibilidad rol × sede × área;
- el contrato `AccessContextV1` vigente como referencia de separación entre asignaciones y contexto operativo;
- el contrato `SimulationContextV1` vigente únicamente como frontera con la tarea siguiente.

La vista previa no crea un tercer modelo de identidad, territorio, rol o turno.

---

#### 3. Alcance exacto del símbolo ×

El símbolo `×` del título representa dimensiones que deben conservarse juntas para explicar el contexto de una fila, no un producto cartesiano.

Queda prohibido materializar automáticamente:

```text
todos los trabajadores
×
todas las sedes
×
todas las áreas
×
todos los turnos
```

La unidad de vista previa es una combinación concreta y justificable.

Para un turno persistido:

```text
employee_id
+
shift_id
+
site_id
+
area_id cuando corresponda
+
operational_role cuando corresponda
```

Para una propuesta todavía no persistida, la fila deberá conservar una correlación inequívoca con la fila exacta de la solicitud administrativa sin inventar un `shift_id` canónico.

---

#### 4. Dos proyecciones obligatorias

La vista previa deberá poder representar dos perspectivas independientes:

##### Estado actual

Se construye exclusivamente desde fuentes persistidas y vigentes.

##### Estado propuesto

Se construye aplicando en memoria el cambio solicitado sobre un snapshot fresco del estado actual.

La relación es:

```text
ESTADO ACTUAL
+
PATCH ADMINISTRATIVO EXPLÍCITO
→
ESTADO PROPUESTO
→
DELTA VISIBLE
```

El estado propuesto no se persiste por generar la vista previa.

La ausencia de un campo en la propuesta significa “sin cambio sobre ese campo”. Un `null` explícito, cuando el contrato del campo lo admita, representa una propuesta de ausencia y no puede confundirse con “sin cambio”.

---

#### 5. Separación entre vista previa y guardado

La vista previa no constituye autorización para guardar.

Después de presentar el resultado, la mutación real deberá:

1. releer las fuentes canónicas aplicables;
2. revalidar al actor;
3. revalidar el trabajador objetivo;
4. revalidar el territorio;
5. revalidar rol, sede, área y turno;
6. detectar cambios ocurridos desde la vista previa;
7. ejecutar únicamente la mutación explícitamente autorizada;
8. conservar auditoría.

Por tanto:

```text
PREVIEW PASS
≠
SAVE ALLOW
```

Un resultado visual antiguo no puede enviarse de vuelta al servidor como prueba de autoridad.

---

#### 6. Trabajador

La dimensión trabajador deberá conservar, como mínimo:

- `employee_id`;
- estado activo o inactivo;
- rol base vigente cuando exista;
- sedes asignadas activas;
- áreas asignadas activas como afiliaciones habituales;
- perfiles operativos activos como preferencias de planificación.

El trabajador objetivo se identifica por `employee_id`.

El nombre visible, alias, cargo u oficio no sustituyen la identidad.

Un trabajador inactivo puede aparecer en una consulta histórica autorizada, pero no se presenta como elegible para una nueva configuración operativa.

---

#### 7. Sede asignada

La fuente laboral de sedes asignadas continúa siendo `employee_sites`.

Para una configuración operativa prospectiva:

```text
employee_id
+
site_id
+
employee_sites activo
+
site activo y programable
→
asignación de sede utilizable
```

Una sede primaria es una clasificación de la asignación, no la única sede permitida.

Un trabajador con varias sedes asignadas deberá conservar cada relación por separado.

La vista previa no deberá sustituir la sede del turno por la sede primaria.

---

#### 8. Área asignada

`employee_areas` conserva la semántica aprobada en `VISO-AUTH-009`:

```text
employee_areas
→ afiliación habitual
```

y no:

```text
employee_areas
→ área operativa obligatoria
```

La vista previa puede mostrar la afiliación habitual como contexto explicativo, pero no puede usarla para rellenar `shift.area_id`.

La ausencia de `employee_areas` no convierte por sí sola un turno en inválido.

---

#### 9. Perfil operativo

`employee_site_operational_profiles` conserva su función de planificación.

La vista previa podrá mostrar:

- sede del perfil;
- rol operativo predeterminado;
- defaults de marcación cuando existan;
- vigencia del perfil.

Pero:

```text
perfil
≠ turno
≠ rol operativo efectivo
≠ área operativa
```

Un perfil puede explicar qué valor fue sugerido durante la planificación, pero no sustituye el valor explícito del turno ni repara una ausencia.

---

#### 10. Turno

La fuente autoritativa de un turno persistido continúa siendo `employee_shifts`.

La vista previa deberá conservar, cuando existan:

- identidad del turno;
- fecha;
- hora inicial;
- hora final;
- `shift_kind`;
- estado;
- estado de publicación;
- `site_id`;
- `area_id`;
- `operational_role`;
- puntos de marcación cuando formen parte de la configuración aplicable.

Una fila de turno nunca se colapsa con otra fila del mismo trabajador.

Dos bloques horarios del mismo día son dos contextos de turno distintos.

---

#### 11. Descanso

Un descanso conserva:

```text
shift_kind = descanso
operational_role = null
```

y el contexto operativo de rol y área es no aplicable.

La vista previa deberá mostrar el descanso como descanso, no como:

- turno laboral sin rol;
- área faltante;
- rol inválido;
- contexto operativo concedido.

No se añade un rol ni un área para hacer que la fila parezca completa.

---

#### 12. Rol operativo del turno

Para un turno laboral, la vista previa consume exactamente `employee_shifts.operational_role` o el valor explícitamente propuesto para esa fila.

No se obtiene autoridad desde:

- `employees.role`;
- `default_operational_role`;
- último turno;
- primera fila de matriz;
- `is_default`;
- única opción visible.

La vista previa deberá reutilizar la clasificación de `VISO-AUTH-011` cuando el rol esté ausente.

Un valor presente pero inválido se muestra como rol presente inválido y no como ausencia limpia.

---

#### 13. Área operativa del turno

Para un turno laboral, el área operativa se obtiene de:

```text
employee_shifts.area_id
```

o del `area_id` explícitamente propuesto para esa fila.

La vista previa no deberá inferirla desde:

- `employee_areas`;
- área primaria;
- área seleccionada;
- perfil;
- dispositivo;
- check-in;
- nombre de rol;
- `area_kind`;
- única área de la sede;
- `is_default`.

`area_id = null` nunca significa wildcard.

---

#### 14. Binding rol × sede × área

La vista previa deberá reutilizar exactamente los estados aprobados por `VISO-AUTH-006` y consumidos por `VISO-AUTH-012`:

```text
EXACT_BINDING
AREA_BINDING_UNRESOLVED
NO_AREA_NOT_REQUIRED
```

El baseline contractual permanece:

```text
EXACT_BINDING = 13
AREA_BINDING_UNRESOLVED = 3
NO_AREA_NOT_REQUIRED = 0
```

La vista previa no modifica esos estados.

Un `AREA_BINDING_UNRESOLVED` debe mostrarse como contexto no resuelto, nunca como “General”, site-wide o todas las áreas.

---

#### 15. Validaciones contextuales que debe proyectar

Sin crear un motor nuevo de conflictos, la vista previa deberá exponer el resultado de las validaciones ya propietarias de las tareas anteriores:

| Dimensión | Pregunta proyectada | Propietario de la regla |
| --- | --- | --- |
| Trabajador | ¿Existe y está activo para una configuración prospectiva? | Contrato laboral vigente |
| Sede | ¿Está asignada y utilizable para el trabajador? | `VISO-AUTH-008` |
| Rol del turno | ¿Está presente cuando el turno es laboral? | `VISO-AUTH-011` |
| Rol × sede | ¿El rol está habilitado en la sede? | `VISO-AUTH-005` / `VISO-AUTH-010` |
| Área | ¿Existe, está activa y pertenece a la sede? | `VISO-AUTH-012` |
| Rol × sede × área | ¿Existe binding exacto o una ausencia explícitamente permitida? | `VISO-AUTH-006` / `VISO-AUTH-012` |
| Descanso | ¿La ausencia de rol y área es no aplicable? | `VISO-AUTH-010` / `VISO-AUTH-011` |

La vista previa muestra esas conclusiones; no cambia sus criterios.

---

#### 16. Estado incompleto y causa preservada

Una fila no válida para el handoff posterior debe conservar la causa exacta.

Ejemplos:

```text
laboral + rol ausente
→ conservar causa de VISO-AUTH-011
```

```text
rol válido + área requerida ausente
→ conservar causa de VISO-AUTH-012
```

```text
rol + sede + área sin binding exacto
→ conservar incompatibilidad territorial
```

```text
AREA_BINDING_UNRESOLVED
→ conservar estado no resuelto
```

La vista previa no transforma causas distintas en un único “Error”.

La interfaz específica de conflictos y su experiencia completa permanecen reservadas a `VISO-AUTH-016` y `VISO-UX-015`.

---

#### 17. Contenido mínimo de una fila de vista previa

Cada fila deberá permitir reconstruir, como mínimo:

| Grupo | Información mínima |
| --- | --- |
| Trabajador | `employee_id`, vigencia, rol base factual |
| Asignación territorial | sede objetivo, relación trabajador–sede, áreas habituales informativas |
| Perfil | existencia y defaults únicamente como planificación |
| Turno | referencia exacta de fila, fecha/hora, kind, estado y publicación |
| Operación | `operational_role`, `site_id`, `area_id` |
| Compatibilidad | validez rol × sede, validez de área, estado del binding |
| Comparación | valor actual, valor propuesto y qué dimensión cambia |
| Frescura | momento de resolución y referencias suficientes para revalidar las fuentes |
| Resultado contextual | si la fila está completa para continuar a evaluación posterior o qué regla previa la bloquea |

La vista previa no necesita contener una lista de permisos efectivos.

---

#### 18. Comparación actual contra propuesto

Cuando existe una modificación pendiente, VISO deberá mostrar solo cambios reales.

Ejemplo conceptual:

```text
ACTUAL:
trabajador A
sede S1
área A1
rol R1
turno T1

PROPUESTO:
trabajador A
sede S1
área A2
rol R1
turno T1
```

El delta relevante es:

```text
area_id: A1 → A2
```

No se presenta como cambio el resto de dimensiones que permanecen iguales.

Si la propuesta deja un campo obligatorio ausente, la vista previa debe mostrar la ausencia; no debe completar el dato para producir una salida aparentemente válida.

---

#### 19. Vista previa de múltiples sedes

Un trabajador puede tener varias sedes activas.

La vista previa deberá distinguir:

```text
sede primaria
≠ única sede asignada
```

y:

```text
turno en sede secundaria asignada
≠ conflicto por sí solo
```

Cada turno se valida contra la sede exacta persistida o propuesta.

No se fusionan todas las sedes del trabajador en un territorio único.

---

#### 20. Vista previa sin turno aplicable

La consulta administrativa de un trabajador puede no encontrar un turno aplicable al periodo inspeccionado.

En ese caso la vista previa conserva:

- identidad del trabajador;
- sedes asignadas;
- áreas habituales informativas;
- perfiles de planificación;
- ausencia explícita de turno.

No inventa:

- turno;
- rol operativo;
- sede operativa;
- área operativa;
- check-in.

La ausencia de turno no impide mostrar la configuración administrativa factual, pero no produce contexto operativo.

---

#### 21. Estado actual, histórico y futuro

La vista previa deberá distinguir el tiempo de la configuración.

Un turno histórico:

- se muestra como histórico;
- no se reinterpreta con defaults actuales;
- no se corrige por inferencia;
- no obtiene autoridad presente.

Un turno futuro:

- utiliza las relaciones vigentes necesarias para validar la configuración prospectiva;
- deberá revalidarse si la matriz cambia antes de guardar o publicar.

Un turno vigente:

- todavía necesita el resto del contrato operativo para participar en autorización real.

---

#### 22. Frescura y concurrencia

La vista previa se construye desde un snapshot server-side suficientemente consistente.

Si entre la vista previa y el guardado cambia cualquiera de estas fuentes:

- trabajador;
- `employee_sites`;
- `employee_areas`;
- perfil;
- turno;
- rol;
- sede;
- área;
- binding rol × sede;
- binding rol × sede × área;

la operación de guardado deberá revalidar el estado nuevo.

Cuando el cambio invalide materialmente la propuesta, el usuario deberá recibir una vista previa actualizada antes de confirmar una operación distinta.

No se usa una respuesta cliente antigua para saltar la revalidación.

---

#### 23. Privacidad y territorio del administrador

La vista previa solo podrá incluir trabajadores y territorios que el actor real esté autorizado a consultar.

El acceso a una sede no concede lectura de todas las personas de la organización.

La vista previa deberá minimizar datos personales: para explicar el contexto laboral no necesita exponer documentos, teléfonos, correos, credenciales, datos sensibles ni información ajena al propósito.

La consulta del trabajador y del horario reutiliza los permisos canónicos vigentes de lectura y el alcance territorial correspondiente.

Una vista previa de un cambio no concede la capacidad de ejecutar ese cambio.

La restricción definitiva de quién administra seguridad permanece en `VISO-AUTH-019`.

---

#### 24. Separación frente a AccessContextV1

`AccessContextV1` representa un contexto de acceso resuelto para un principal y actor reales.

La vista previa de VISO puede representar:

- un estado actual;
- un cambio todavía no guardado;
- un turno futuro;
- una fila incompleta;
- una configuración bloqueada.

Por tanto:

```text
VISTA PREVIA ADMINISTRATIVA
≠ AccessContextV1 AUTORITATIVO
```

La vista previa podrá reutilizar las mismas identidades y separaciones conceptuales, pero no podrá presentarse como un `AccessContextV1` real cuando sus fuentes sean propuestas o hipotéticas.

---

#### 25. Separación frente a SimulationContextV1

`SimulationContextV1` es el contrato hipotético para evaluar permisos.

`VISO-AUTH-013` termina antes de esa evaluación.

Queda prohibido producir en esta tarea:

```text
ALLOW
DENY
WOULD_ALLOW
WOULD_DENY
INDETERMINATE de permiso
```

como resultado de autorización.

La vista previa solo proyecta el contexto que podría alimentar una simulación posterior.

`VISO-AUTH-014` es el propietario de la simulación de permisos efectivos.

---

#### 26. Separación frente al origen de permisos

Esta tarea no calcula ni presenta la procedencia final de cada permiso.

No atribuye un permiso a:

- rol base;
- rol operativo;
- grant individual;
- deny;
- excepción;
- dispositivo;
- scope.

Esa responsabilidad permanece en:

```text
VISO-AUTH-015 — Mostrar origen de cada permiso
```

La referencia a la fuente de un dato contextual, como `employee_shifts` o `employee_sites`, no equivale al origen de un permiso.

---

#### 27. Separación frente a conflictos

La vista previa debe conservar y mostrar los bloqueos contextuales ya conocidos porque forman parte del resultado de las reglas 008–012.

No desarrolla el inventario transversal de conflictos entre:

- permisos;
- grants;
- denies;
- excepciones;
- legacy;
- matrices completas;
- ownership.

Esa responsabilidad permanece en:

```text
VISO-AUTH-016 — Mostrar conflictos de configuración
```

---

#### 28. Reconciliación AS-IS de VISO

La superficie actual más cercana observada es la vista operacional mensual de programación.

Actualmente:

- lee `employee_shifts`;
- lee `vento_site_operational_role_matrix_v1`;
- expone etiquetas de rol y área;
- intenta primero una fila exacta;
- si no existe, puede tomar otra fila del mismo rol;
- puede derivar una etiqueta de área desde señales del rol o de la fila física.

Eso es una vista de planificación existente, no la vista previa canónica de esta tarea.

La futura implementación deberá dejar de tratar una etiqueta inferida como sustituto de `site_id`, `area_id`, `operational_role` y estado del binding.

---

#### 29. Reconciliación AS-IS de las fuentes administrativas

VISO ya consume por separado:

- `employee_sites` en personal y programación;
- `employee_site_operational_profiles` en programación y administración de perfiles;
- `employee_shifts` en semana, mes y vista global;
- `site_operational_roles` o su proyección para la matriz de rol;
- `employee_area_purpose_assignments` en la ficha de trabajador.

La existencia de esas lecturas separadas no constituye una vista previa canónica.

En particular:

```text
employee_area_purpose_assignments
≠ employee_areas
≠ shift.area_id
```

y ninguna de esas fuentes puede sustituirse silenciosamente por otra.

---

#### 30. Baseline read-only del estado laboral vigente

El corte read-only verificado sobre trabajadores activos contiene:

```text
trabajadores activos = 40
relaciones employee_sites activas = 66
trabajadores activos con sede asignada = 40
relaciones de sede primaria activas = 40
trabajadores con más de una sede activa = 14

relaciones employee_areas activas = 1
trabajadores activos con employee_area = 1

perfiles operativos activos = 1
trabajadores activos con perfil = 1
```

Este baseline demuestra que una vista previa no puede exigir universalmente un `employee_area` o un perfil para representar correctamente a un trabajador.

---

#### 31. Baseline read-only de turnos futuros

Desde `2026-09-02`, para trabajadores activos y turnos laborales no cancelados:

```text
turnos = 119
trabajadores distintos = 27

con operational_role = 119
sin operational_role = 0

con area_id = 119
sin area_id = 0

employee_site válido = 119
rol válido para sede = 119
área válida para sede = 119
EXACT_BINDING válido = 119
```

Distribución territorial:

```text
turnos en sede primaria = 111
turnos en otra sede asignada activa = 8
```

La sede primaria no puede, por tanto, sustituir la sede exacta del turno.

---

#### 32. Independencia de afiliación habitual y perfil

Sobre esos mismos `119` turnos laborales futuros:

```text
turnos cuyo trabajador tiene employee_area activa = 0
turnos cuyo trabajador tiene employee_area igual al área del turno = 0

turnos cuyo trabajador tiene perfil operativo activo = 0
turnos cuyo perfil coincide con sede + rol del turno = 0
```

Y aun así los `119` turnos tienen sede asignada válida, rol válido, área válida y binding exacto.

Por tanto queda demostrado en el corte actual:

```text
employee_area
≠ prerrequisito universal del turno
```

y:

```text
perfil operativo
≠ prerrequisito universal del turno
```

---

#### 33. Estado de materialización de AccessContext

El repositorio conserva `AUTH-DB-033::GLOBAL` como `VERIFIED` y materializa localmente el resolver canónico de `AccessContext`.

Sin embargo, la consulta read-only al proyecto hospedado inspeccionado no encontró funciones con nombre `access_context` en los schemas `public`, `api` o `app_private`.

La vista previa documental de esta tarea no puede asumir que el resolver canónico ya está desplegado en ese ambiente hospedado.

La futura unidad física deberá comprobar sus dependencias reales del ambiente propietario antes de reutilizar un resolver remoto.

Esta diferencia no bloquea la definición documental.

---

#### 34. Handoff a VISO-AUTH-014

`VISO-AUTH-014` recibe una proyección contextual, no una decisión de permiso.

El handoff mínimo conserva:

```text
trabajador exacto
+
rol base factual
+
sedes asignadas relevantes
+
áreas habituales solo como dato administrativo
+
turno exacto o propuesta exacta
+
rol operativo explícito
+
sede operativa explícita
+
área operativa explícita o ausencia contractualmente clasificada
+
estado del binding
+
causas de incompletitud de VISO-AUTH-011/012
+
snapshot temporal
```

La tarea siguiente podrá convertir una selección autorizada de esos datos en un escenario hipotético conforme a `SimulationContextV1`.

No podrá asumir que una fila incompleta está resuelta solo porque la vista previa la mostró.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La obligación de mostrar el efecto antes de guardar, respetar territorio, mantener coherencia con aplicaciones operativas, fallar cerrado, proteger mutaciones, invalidar contexto obsoleto y conservar separación entre fuentes ya cuenta con cobertura vigente.

La tarea no crea una nueva modalidad de autorización, permiso, reason code, estado empresarial, identidad territorial ni transición de datos.

---

#### 36. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-VISO-001` — VISO debe mostrar antes de guardar el efecto resultante sobre cada trabajador y producir el mismo resultado consumido por las aplicaciones operativas;
- `TREQ-AUTH-004` — evaluadores equivalentes deben producir decisiones coherentes para el mismo contexto;
- `TREQ-AUTH-007` — administración de roles, perfiles y territorio requiere capacidad administrativa explícita y alcance del actor;
- `TREQ-AUTH-008` — el carril operativo exige turno, rol y contexto territorial válidos;
- `TREQ-AUTH-009` — sede y área se resuelven de forma determinista;
- `TREQ-AUTH-013` — las mutaciones se revalidan en servidor;
- `TREQ-AUTH-014` — cambios de turno, rol, sede, área o asignación invalidan contexto derivado;
- `TREQ-AUTH-015` — las decisiones y acciones protegidas conservan evidencia correlacionable;
- `TREQ-AUTH-101`, `TREQ-AUTH-102`, `TREQ-AUTH-103`, `TREQ-AUTH-105` y `TREQ-AUTH-106` — identidad exacta de área, bindings, ausencia no wildcard y separación de fuentes territoriales.

Estas referencias son trazabilidad heredada. No cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, protocolo, contrato de entrega, topología, políticas, VISO-AUTH-012, contratos de contexto y simulación, 04A aplicable, código VISO actual y consultas read-only sobre trabajadores, sedes, áreas, perfiles, turnos y bindings. |
| OPERATIVA | NOT_APPLICABLE | No se modificaron trabajadores, asignaciones, perfiles, turnos, roles, áreas, permisos ni configuraciones reales. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, migraciones, RPC, RLS, funciones, datos, packages ni despliegues. |

---

#### 38. Criterios de aceptación

- [ ] La vista previa representa una combinación concreta y no un producto cartesiano.
- [ ] Puede representar estado actual y estado propuesto sin persistir la propuesta.
- [ ] Distingue campo omitido de ausencia explícitamente propuesta.
- [ ] `PREVIEW PASS` no equivale a autorización de guardado.
- [ ] La mutación real revalida fuentes y autoridad después de la vista previa.
- [ ] El trabajador se identifica por `employee_id`.
- [ ] Las sedes asignadas proceden de `employee_sites`.
- [ ] La sede primaria no sustituye la sede exacta del turno.
- [ ] `employee_areas` se muestra como afiliación habitual y no como área operativa obligatoria.
- [ ] El perfil operativo se muestra como planificación y no como autoridad.
- [ ] Cada turno conserva su identidad y no se colapsa con otros bloques.
- [ ] Un descanso no se clasifica como turno laboral incompleto.
- [ ] El rol operativo laboral procede del turno o de la propuesta explícita.
- [ ] El área operativa laboral procede del turno o de la propuesta explícita.
- [ ] Ningún default, perfil, última fila, área primaria o selección completa silenciosamente el turno.
- [ ] Se conservan `EXACT_BINDING`, `AREA_BINDING_UNRESOLVED` y `NO_AREA_NOT_REQUIRED`.
- [ ] Los tres bindings no resueltos no se convierten en site-wide.
- [ ] La vista previa conserva las causas de VISO-AUTH-011 y VISO-AUTH-012.
- [ ] La vista previa no crea un motor transversal de conflictos.
- [ ] Cada fila expone trabajador, sede, área, turno, rol y estado de compatibilidad de forma reconstruible.
- [ ] El delta actual → propuesto muestra solo dimensiones realmente modificadas.
- [ ] Varias sedes asignadas permanecen separadas.
- [ ] Un turno en sede secundaria asignada no es conflicto por sí solo.
- [ ] La ausencia de turno se muestra sin inventar rol, sede o área operativos.
- [ ] Histórico, vigente y futuro no se mezclan.
- [ ] Un preview obsoleto no puede autorizar un save.
- [ ] La lectura queda limitada por permiso y territorio del actor.
- [ ] La vista previa minimiza datos personales.
- [ ] La vista previa no se presenta falsamente como `AccessContextV1` autoritativo.
- [ ] La vista previa no produce resultados de permiso reservados a `VISO-AUTH-014`.
- [ ] No muestra origen de permisos reservado a `VISO-AUTH-015`.
- [ ] No absorbe la gestión transversal de conflictos reservada a `VISO-AUTH-016`.
- [ ] La vista operacional mensual AS-IS no se declara equivalente a esta vista previa.
- [ ] `employee_area_purpose_assignments`, `employee_areas` y `shift.area_id` permanecen separados.
- [ ] El baseline conserva 40 trabajadores activos y 66 relaciones activas de sede sobre ellos.
- [ ] Los 40 trabajadores activos tienen al menos una sede asignada.
- [ ] Existen 14 trabajadores activos con múltiples sedes.
- [ ] Solo 1 trabajador activo tiene `employee_area` activa.
- [ ] Solo 1 trabajador activo tiene perfil operativo activo.
- [ ] Los 119 turnos laborales futuros observados tienen rol, área y binding exacto válidos.
- [ ] Ocho de esos turnos operan sobre una sede asignada no primaria.
- [ ] Ninguno de esos 119 turnos depende de `employee_area` o perfil operativo activo.
- [ ] La diferencia entre materialización local de AccessContext y ambiente hospedado se conserva como dependencia física a verificar, no como hecho resuelto.
- [ ] `VISO-AUTH-014` recibe contexto y no una autorización precomputada.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 39. Límites

Esta tarea no:

- modifica código de VISO;
- modifica Supabase;
- modifica trabajadores;
- modifica `employee_sites`;
- modifica `employee_areas`;
- modifica `employee_area_purpose_assignments`;
- modifica perfiles operativos;
- modifica turnos;
- publica o corrige horarios;
- modifica roles base u operativos;
- modifica matrices rol × sede o rol × área;
- modifica áreas o sedes;
- crea una vista SQL;
- crea RPC;
- crea RLS;
- crea migraciones;
- ejecuta SQL de escritura;
- crea un nuevo contrato público de `@vento/contracts`;
- modifica `AccessContextV1`;
- modifica `SimulationContextV1`;
- simula permisos efectivos;
- produce `ALLOW`, `DENY`, `WOULD_ALLOW` o `WOULD_DENY`;
- muestra el origen final de permisos;
- administra conflictos transversales;
- administra excepciones individuales;
- modifica auditoría;
- implementa la experiencia de `VISO-UX-016`;
- despliega el resolver de AccessContext;
- hace backfill histórico;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-012 — Validar turnos con área incompatible`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-014 — Crear simulador de permisos efectivos`


### ✅ VISO-AUTH-014 — Crear simulador de permisos efectivos

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno
**Tarea siguiente:** VISO-AUTH-015 — Mostrar origen de cada permiso
**Tipo de tarea:** documental; definición del simulador administrativo canónico de permisos efectivos que convierte una proyección contextual autorizada en un escenario hipotético separado, evalúa permisos exactos con los contratos de simulación vigentes y muestra el impacto esperado sin mutar autoridad, sesión, configuración ni datos reales
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura queda sujeta a la topología `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el simulador administrativo con el que VISO deberá responder, antes de persistir un cambio de seguridad o de contexto, qué permisos efectivos tendría un sujeto bajo un escenario hipotético concreto.

El simulador no crea una segunda política de autorización. Consume el mismo catálogo, contratos, reglas de alcance, precedencia de denegaciones y semántica de carriles que gobiernan la autorización real, pero encapsulados en `SimulationContextV1` y `SimulatedAuthorizationDecisionV1` para impedir que un resultado hipotético se convierta en autoridad operativa.

La regla raíz queda:

```text
ACTOR REAL AUTORIZADO PARA SIMULAR
+
PROYECCIÓN CONTEXTUAL DE VISO-AUTH-013
+
ESCENARIO HIPOTÉTICO EXPLÍCITO
+
CATÁLOGOS Y VERSIONES CANÓNICAS
+
EVALUADOR DE SIMULACIÓN
→
RESULTADO HIPOTÉTICO POR PERMISO
```

Y nunca:

```text
RESULTADO SIMULADO
→
AUTORIDAD REAL
```

---

#### 2. Base normativa y fuentes de autoridad

Esta tarea consume, sin redefinir, las decisiones ya aprobadas que gobiernan contexto, autorización y simulación.

Fuentes vinculantes:

- `ADR-AUTH-001`;
- `AUTH-CTX-001` — `AccessContext` canónico;
- `AUTH-CTX-002` — `AuthorizationDecision` canónica;
- `AUTH-CTX-003` — `SimulationContext` separado;
- `AUTH-CTX-004` — versionado de contratos de respuesta;
- `AUTH-CTX-027` — consumo centralizado por aplicaciones y separación entre interfaz real y simulada;
- `AUTH-SIM-001` — elegibilidad del solicitante real;
- `AUTH-SIM-002` — identidades de rol simulables;
- `AUTH-SIM-003` — sede simulada;
- `AUTH-SIM-004` — área simulada;
- `AUTH-SIM-005` — turno simulado;
- `AUTH-SIM-006` — prohibición de mezclar permisos reales y simulados;
- `SHELL-CON-007` — contratos compartidos de contexto y simulación;
- `VISO-AUTH-003` y `VISO-AUTH-004` — matrices administrativas de permisos por rol base y operativo;
- `VISO-AUTH-005` y `VISO-AUTH-006` — disponibilidad de roles por sede y área;
- `VISO-AUTH-007` a `VISO-AUTH-012` — perfiles, asignaciones y validaciones de contexto;
- `VISO-AUTH-013` — proyección contextual previa que constituye el handoff inmediato.

La familia contractual vigente consumida por esta tarea es `vento.authorization.response-contracts@1.0.0`.

---

#### 3. Resultado canónico

VISO deberá disponer de un simulador que produzca una evaluación reconstruible por escenario y por permiso exacto.

Cada simulación deberá mantener separadas, como mínimo, estas identidades:

```text
actor real que solicita
sujeto simulado
contexto real de referencia
contexto hipotético
aplicación objetivo
permiso exacto
recurso o escenario de recurso
resultado simulado
snapshot de versiones
```

La simulación deberá poder representar:

- un sujeto real autorizado como referencia enmascarada o controlada;
- una plantilla de rol base;
- una plantilla de rol operativo;
- un sujeto hipotético;
- un escenario compuesto;
- valores vigentes;
- valores propuestos;
- valores sintéticos cuando el contrato lo permita;
- territorio y recurso hipotéticos cuando sean necesarios para evaluar el permiso.

No existe una modalidad válida en la que la pantalla invente un permiso, rol, sede, área, turno, recurso o alcance que el contrato canónico no pueda representar.

---

#### 4. Frontera entre vista previa y simulación

`VISO-AUTH-013` entrega contexto. `VISO-AUTH-014` evalúa el efecto hipotético sobre permisos.

La frontera obligatoria es:

```text
VISO-AUTH-013
→ describe trabajador + sede + área + turno + rol + binding

VISO-AUTH-014
→ transforma una selección autorizada en SimulationContextV1
→ evalúa permisos exactos
→ devuelve resultados hipotéticos
```

La vista previa no podrá producir resultados de autorización y el simulador no podrá reparar silenciosamente un contexto incompleto heredado.

Si `VISO-AUTH-013` conserva una causa de incompletitud de `VISO-AUTH-011` o `VISO-AUTH-012`, el simulador deberá conservar esa causa y clasificar el resultado afectado como bloqueado o indeterminado según el contrato, nunca completar el dato mediante un fallback local.

---

#### 5. Handoff consumido desde VISO-AUTH-013

El simulador acepta como base contextual únicamente una proyección reconstruible que conserve:

```text
trabajador exacto
+
rol base factual
+
sedes asignadas relevantes
+
áreas habituales únicamente como dato administrativo
+
turno exacto o propuesta exacta
+
rol operativo explícito
+
sede operativa explícita
+
área operativa explícita o ausencia contractualmente clasificada
+
estado del binding
+
causas de incompletitud
+
snapshot temporal
```

Ninguna de esas dimensiones concede un permiso por sí sola.

La simulación deberá distinguir entre:

- hecho real vigente;
- referencia real enmascarada;
- dato sintético;
- plantilla canónica;
- override propuesto;
- asignación propuesta;
- denegación propuesta;
- selección explícita del escenario.

La procedencia nunca podrá deducirse por el valor visible del campo.

---

#### 6. Autorización del simulador real

La capacidad de simular se resuelve sobre el actor real y nunca sobre el sujeto o rol hipotético.

El solicitante interactivo deberá satisfacer el contrato de `AUTH-SIM-001`, incluido como mínimo:

```text
actor humano efectivo
+
sesión personal real válida
+
viso.access efectivo
+
viso.authorization.context_simulations.view efectivo
+
carril base real válido
+
alcance suficiente
+
justificación válida
+
reautenticación fuerte cuando aplique
+
ausencia de denegaciones
```

El rol objetivo, el permiso hipotético, el dispositivo, la pantalla visible o el resultado de otra simulación no pueden aportar autoridad al solicitante.

Una simulación iniciada desde un contexto simulado deberá denegarse.

---

#### 7. Contrato de sesión de simulación

Cada sesión de simulación deberá representarse mediante `SimulationContextV1` y conservar:

- `simulation_id` único;
- estado de ciclo de vida;
- propósito;
- timestamps de creación, activación, expiración, finalización y revocación según apliquen;
- actor real;
- referencia al `AccessContext` real;
- autorización real de simulación;
- sujeto simulado;
- contexto hipotético;
- escenario de recurso cuando aplique;
- evaluaciones realizadas;
- referencias separadas de resultados favorables, denegados e indeterminados;
- problemas estructurales;
- contexto de auditoría.

Los estados contractuales admitidos son:

```text
DRAFT
ACTIVE
COMPLETED
EXPIRED
REVOKED
INVALID
```

VISO no podrá crear estados locales equivalentes con otra semántica.

---

#### 8. Propósito de la simulación

El propósito deberá ser explícito y pertenecer al contrato vigente.

Los propósitos reconocidos son:

```text
NAVIGATION_PREVIEW
AUTHORIZATION_EXPLANATION
ROLE_MATRIX_REVIEW
TERRITORIAL_SCENARIO
OPERATIONAL_CONTEXT_SCENARIO
DEVICE_SCENARIO
CHANGE_IMPACT_REVIEW
SUPPORT_DIAGNOSTIC
```

Para el uso administrativo previo a guardar cambios, `CHANGE_IMPACT_REVIEW` es el propósito natural cuando corresponda al caso, pero la tarea no cambia la taxonomía contractual ni fuerza ese valor para escenarios cuyo propósito canónico sea otro.

La justificación empresarial sigue siendo obligatoria cuando el contrato de elegibilidad la exige y nunca amplía autoridad.

---

#### 9. Sujeto simulado

El sujeto deberá clasificarse con una identidad tipada del contrato vigente:

```text
EXISTING_EMPLOYEE_REFERENCE
BASE_ROLE_TEMPLATE
OPERATIONAL_ROLE_TEMPLATE
HYPOTHETICAL_EMPLOYEE
COMPOSITE_SCENARIO
```

Reglas:

1. una referencia de empleado real no equivale al actor real que solicita;
2. una plantilla de rol no representa una persona existente;
3. un escenario compuesto no puede ocultar contradicciones entre sus dimensiones;
4. `real_employee_id` solo se usa cuando el permiso real del solicitante y la finalidad autorizan la referencia;
5. la simulación no crea ni modifica empleados;
6. la etiqueta visible del sujeto no sustituye sus identificadores contractuales;
7. un sujeto retirado, inválido o no resoluble falla cerrado.

---

#### 10. Dimensiones hipotéticas administrables

El simulador podrá representar únicamente dimensiones contempladas por `HypotheticalAccessContext`:

- identidad de dominio;
- empleado;
- rol base;
- sedes asignadas;
- áreas asignadas;
- cobertura administrativa;
- turno activo hipotético;
- check-in hipotético cuando el escenario lo requiera;
- rol operativo;
- sede operativa;
- área operativa;
- contexto de dispositivo;
- problemas estructurales del escenario.

La presencia de una dimensión no autoriza a VISO a administrarla desde esta tarea.

Por tanto:

```text
SIMULAR VALOR
≠
CREAR VALOR
≠
ASIGNAR VALOR
≠
PERSISTIR VALOR
```

---

#### 11. Roles simulables

La selección de rol deberá respetar íntegramente `AUTH-SIM-002` y los catálogos canónicos vigentes.

VISO no podrá:

- tratar cualquier string como rol;
- convertir un rol legacy en identidad vigente;
- confundir rol base con rol operativo;
- asumir que un rol privilegiado es simulable para todo solicitante;
- usar un nombre de cargo como código contractual;
- inventar un rol temporal para completar el escenario;
- usar el rol simulado para elevar la autoridad del actor real.

Un rol válido como identidad contractual todavía puede quedar fuera del alcance autorizado del solicitante o requerir controles adicionales por sensibilidad.

---

#### 12. Sede y área simuladas

La sede y el área hipotéticas deberán conservar las restricciones de `AUTH-SIM-003`, `AUTH-SIM-004`, `VISO-AUTH-005`, `VISO-AUTH-006` y las validaciones territoriales previas.

Reglas mínimas:

1. una sede simulada debe ser una identidad exacta y resoluble;
2. un área simulada debe pertenecer a una sede exacta compatible;
3. `null`, ausencia o desconocimiento no significan todas las sedes o áreas;
4. sede primaria no sustituye sede operativa;
5. tipo de área no sustituye identidad de área;
6. múltiples sedes asignadas no equivalen a organización completa;
7. el alcance solicitado por la simulación permanece dentro del alcance real autorizado del simulador;
8. una combinación territorial inválida no se normaliza automáticamente.

---

#### 13. Turno y contexto operativo simulados

El turno hipotético deberá respetar `AUTH-SIM-005` y las reglas de `VISO-AUTH-010` a `VISO-AUTH-013`.

Un escenario operativo deberá distinguir:

- existencia o ausencia de turno;
- identidad exacta del turno cuando sea una referencia real autorizada;
- rol operativo explícito;
- sede operativa explícita;
- área operativa explícita o ausencia permitida;
- vigencia temporal;
- estado del binding territorial;
- check-in cuando sea un prerrequisito de la capacidad evaluada.

No se podrá fabricar un turno válido a partir de:

- perfil operativo;
- área habitual;
- sede primaria;
- último turno;
- primer rol permitido;
- defaults de interfaz;
- una combinación enviada por el cliente sin validación.

---

#### 14. Universo exacto de permisos evaluados

Cada evaluación deberá identificar un `app_code` y un `permission_key` canónicos exactos.

La interfaz podrá permitir revisar una colección de permisos, pero el servidor deberá expandirla a identidades concretas antes de evaluar.

Reglas:

```text
permiso solicitado
→ identidad exacta del catálogo
→ modalidad y prerrequisitos vigentes
→ evaluación simulada individual
```

No son válidos como sustituto:

- wildcards implícitos;
- prefijos de permiso tratados como autoridad;
- labels visibles;
- grupos de navegación;
- nombres de pantalla;
- roles;
- arrays enviados por el cliente sin validación contra el catálogo.

Para un conjunto seleccionado:

```text
permisos objetivo esperados
=
filas de evaluación materializadas

duplicados
=
0

faltantes silenciosos
=
0
```

Un permiso desconocido deberá bloquear esa evaluación y no desaparecer de la comparación.

---

#### 15. Escenario de recurso

Cuando la capacidad dependa de un recurso, el simulador deberá proporcionar un `SimulationResourceScenario` compatible.

El contrato distingue:

```text
SYNTHETIC_RESOURCE
MASKED_REAL_RESOURCE
AUTHORIZED_REAL_REFERENCE
RESOURCE_DRAFT
UNRESOLVED
```

El escenario deberá conservar, cuando aplique:

- tipo de recurso;
- referencia real autorizada o identificador sintético;
- territorio;
- estado;
- ownership;
- lados requeridos por el contrato;
- indicador de presencia de campos sensibles.

Un recurso no resoluble no se convierte en recurso global ni en recurso propio.

La simulación tampoco concede al solicitante derecho a leer el contenido completo de un recurso real por el solo hecho de evaluarlo.

---

#### 16. Evaluación por carriles

Cada `SimulatedAuthorizationDecisionV1` conserva de forma independiente el carril base y el carril operativo.

La salida por carril distingue:

```text
required = false
→ result = null
```

frente a:

```text
required = true
→ WOULD_ALLOW | WOULD_DENY | INDETERMINATE
```

La ausencia de un carril no requerido no podrá interpretarse como `WOULD_ALLOW` ni como `WOULD_DENY`.

Cuando ambos carriles participen, la decisión final deberá seguir la misma semántica contractual de autorización aplicable al permiso y nunca una regla simplificada creada por VISO.

---

#### 17. Resultado final por permiso

La simulación solo puede producir estos resultados hipotéticos finales:

```text
WOULD_ALLOW
WOULD_DENY
INDETERMINATE
```

Nunca devolverá `ALLOW` o `DENY` como decisión real del escenario hipotético.

Semántica:

| Resultado | Interpretación |
| --- | --- |
| `WOULD_ALLOW` | Con el snapshot, versiones y escenario aportados, la evaluación hipotética satisface el contrato aplicable. |
| `WOULD_DENY` | Con el snapshot, versiones y escenario aportados, existe una causa contractual suficiente para denegar hipotéticamente. |
| `INDETERMINATE` | La evaluación no puede producir una conclusión contractual completa por entrada parcial, enmascarada, incompatible o no resoluble. |

`INDETERMINATE` nunca se convertirá en `WOULD_ALLOW` por conveniencia de interfaz.

---

#### 18. Confianza del resultado

La confianza deberá conservar los estados definidos por el contrato:

```text
CONTRACT_COMPLETE
PARTIAL_INPUT
MASKED_INPUT
VERSION_MISMATCH
```

La interfaz deberá mostrar claramente cuándo un resultado no se apoya en una entrada contractual completa.

`VERSION_MISMATCH` obliga a evitar que la simulación se presente como equivalente a la política vigente hasta reconciliar versiones.

`MASKED_INPUT` no autoriza revelar datos ocultos únicamente para mejorar la confianza.

---

#### 19. Comparación entre estado real y estado propuesto

Cuando VISO utilice el simulador para revisar un cambio antes de guardar, deberá mantener dos planos separados:

```text
PLANO REAL
→ contexto y decisiones reales vigentes, obtenidos por contratos reales

PLANO HIPOTÉTICO
→ SimulationContextV1
→ SimulatedAuthorizationDecisionV1
```

La interfaz podrá comparar visualmente ambos planos, pero no podrá normalizarlos como si fueran el mismo objeto o la misma autoridad.

La comparación deberá permitir identificar, por permiso exacto:

- sin cambio observable;
- cambio desde resultado real permitido hacia `WOULD_DENY`;
- cambio desde resultado real denegado hacia `WOULD_ALLOW`;
- cambio hacia `INDETERMINATE`;
- permiso nuevo dentro del conjunto objetivo;
- permiso que deja de pertenecer al conjunto evaluable por cambio de contrato o versión.

La representación visual no crea un nuevo enum contractual persistido.

---

#### 20. Precedencia y fallo cerrado

La simulación reutiliza la precedencia canónica de autorización y las reglas especiales de `AUTH-SIM-*`.

Como mínimo, deberá fallar cerrado ante:

- actor real no elegible;
- sesión real expirada, revocada o ambigua;
- ausencia de `viso.access`;
- ausencia de `viso.authorization.context_simulations.view`;
- simulación anidada;
- alcance solicitado superior al alcance real autorizado;
- rol objetivo inválido o ambiguo;
- sede o área no resolubles;
- turno hipotético inconsistente;
- permiso desconocido;
- recurso obligatorio no resoluble;
- versión incompatible;
- dato requerido ausente;
- denegación explícita aplicable;
- reautenticación fuerte faltante cuando sea obligatoria.

No existen fallbacks silenciosos desde UI, última selección, caché obsoleta, primera fila, nombre visible o valor único encontrado.

---

#### 21. Resultado agregado de la simulación

El simulador podrá resumir una sesión mediante las colecciones contractuales:

- `would_allow`;
- `would_deny`;
- `indeterminate`.

Cada referencia deberá mantener la identidad de su decisión simulada, aplicación, permiso y recurso cuando corresponda.

La suma de las tres colecciones deberá corresponder a las evaluaciones materializadas que formen parte del resultado reportado.

Un resumen visual nunca podrá ocultar filas `INDETERMINATE` ni excluir silenciosamente denegaciones.

---

#### 22. Presentación administrativa mínima

La superficie de VISO deberá hacer visible, como mínimo:

```text
SIMULACIÓN

Sujeto: identidad simulada
Propósito: propósito contractual
Contexto: resumen de rol + sede + área + turno
Snapshot: timestamp + versiones

Permiso                         Real            Simulado
----------------------------------------------------------------
permiso exacto A                decisión real   WOULD_ALLOW
permiso exacto B                decisión real   WOULD_DENY
permiso exacto C                decisión real   INDETERMINATE
```

La columna real solo podrá mostrarse cuando exista una decisión real autorizada y comparable. Su ausencia no se rellena mediante el resultado hipotético.

El estado simulado deberá llevar una señal visual inequívoca de que no es ejecutable ni persistido como autoridad.

---

#### 23. Origen de cada permiso reservado a VISO-AUTH-015

`VISO-AUTH-014` determina el efecto hipotético, pero no desarrolla la experiencia completa de procedencia de cada permiso.

El motor podrá conservar las referencias y matches exigidos por `SimulatedAuthorizationDecisionV1`, pero esta tarea no convierte esa evidencia en una explicación administrativa detallada del tipo:

```text
este permiso viene de rol base X
este deny viene de fuente Y
esta excepción viene de registro Z
```

La presentación canónica de origen pertenece a:

```text
VISO-AUTH-015 — Mostrar origen de cada permiso
```

Por tanto, esta tarea puede mostrar el resultado y razones seguras mínimas necesarias para comprender un bloqueo o un estado indeterminado, pero no absorbe la trazabilidad completa de procedencia.

---

#### 24. Conflictos reservados a VISO-AUTH-016

La simulación debe conservar `structural_issues` y `blocked_reasons` porque forman parte del contrato evaluado.

Eso no convierte esta tarea en el inventario transversal de conflictos de configuración.

`VISO-AUTH-014` puede indicar que una evaluación está bloqueada o es indeterminada por una inconsistencia concreta del escenario.

`VISO-AUTH-016` conserva la responsabilidad de identificar, agrupar, explicar y administrar la visibilidad transversal de conflictos entre configuraciones.

---

#### 25. Excepciones individuales reservadas a VISO-AUTH-017

La simulación puede evaluar el efecto de un cambio hipotético que represente un override, asignación o denegación propuesta cuando esa procedencia sea válida dentro del contrato.

No puede:

- crear la excepción;
- aprobarla;
- persistirla;
- revocarla;
- cambiar su vigencia;
- asignar un aprobador;
- convertir un resultado favorable en una excepción real.

La administración de excepciones individuales permanece en `VISO-AUTH-017`.

---

#### 26. Auditoría y reconstrucción

Toda simulación deberá conservar contexto suficiente para demostrar posteriormente:

- quién solicitó la simulación desde autoridad real;
- qué propósito declaró;
- qué sujeto simuló;
- qué contexto real sirvió de referencia;
- qué valores eran reales, enmascarados, sintéticos o propuestos;
- qué permisos se evaluaron;
- qué recurso o territorio participó;
- qué resultados se obtuvieron;
- qué problemas estructurales aparecieron;
- qué versión de catálogo, datasets y simulador se usó;
- cuándo se creó, expiró, completó o revocó la simulación.

La auditoría deberá minimizar secretos y datos personales.

La existencia de una simulación no sustituye la auditoría de la mutación real posterior.

---

#### 27. Frescura, expiración e invalidación

Una simulación está ligada a su snapshot real y a sus versiones.

Debe considerarse obsoleta para una decisión administrativa cuando cambie materialmente alguno de estos elementos antes del guardado real:

- actor real o sesión;
- permiso para simular;
- sujeto de referencia;
- rol base;
- rol operativo;
- asignación de sede;
- área;
- turno;
- check-in relevante;
- matriz o grant;
- deny;
- excepción;
- catálogo de permisos;
- reglas de alcance;
- contrato de respuesta;
- recurso evaluado;
- versiones consumidas.

Una simulación expirada, revocada, inválida o basada en fingerprint diferente no puede autorizar ni validar un guardado.

---

#### 28. Regla de guardado posterior

La simulación es un control previo, no un token de autorización.

La mutación real deberá ejecutar nuevamente en servidor:

```text
identidad real
+
contexto real fresco
+
autoridad de administración
+
validaciones de la mutación
+
reglas de segregación
+
versión vigente
→
decisión real de guardar
```

No podrá aceptarse como sustituto:

- `simulation_id`;
- un `WOULD_ALLOW` anterior;
- una captura de pantalla;
- un resultado enviado por el cliente;
- un hash sin revalidación de las fuentes reales;
- la autorización del actor simulado.

El guardado podrá exigir una nueva simulación si la política de la mutación así lo determina, pero esa exigencia no cambia la naturaleza no autoritativa del resultado.

---

#### 29. Privacidad y minimización

El simulador deberá limitar la información visible al propósito y alcance autorizados del actor real.

Reglas:

1. una simulación de tercero no habilita acceso general a su expediente;
2. un recurso sensible puede representarse de forma enmascarada;
3. `contains_real_personal_data` deberá conservarse cuando corresponda;
4. datos no necesarios para la decisión se omiten;
5. la razón visible no deberá revelar grants, denies, controles, secretos o metadatos que el actor no puede consultar;
6. la auditoría utiliza referencias cuando no sea necesario persistir payloads completos;
7. una entrada enmascarada puede reducir la confianza sin obligar a revelar el dato.

---

#### 30. Reconciliación con la implementación compartida existente

El repositorio compartido ya materializa la familia `vento.authorization.response-contracts@1.0.0`, incluidos `SimulationContextV1` y `SimulatedAuthorizationDecisionV1`.

Esta tarea no crea un contrato TypeScript paralelo ni cambia esa versión.

La futura unidad física de VISO deberá consumir el contrato compartido vigente y comprobar las dependencias reales de runtime antes de declarar paridad con la simulación canónica.

Una interfaz local con objetos parecidos, un shape legacy o un estado de React no serán fuente de verdad contractual.

---

#### 31. Topología y materialización futura

La tarea documental se define una sola vez dentro del plan, pero su materialización física se rige por:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto:

- este cierre documental no crea una instancia física;
- no selecciona package;
- no crea `implementation_unit_id`;
- no autoriza código de VISO;
- no autoriza cambios en Supabase;
- no autoriza nuevas tablas, RPC, funciones, RLS, migraciones ni despliegues;
- la identidad física solo podrá resolverse desde el package y gate aplicables.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La obligación de separar simulación de autoridad real, controlar al solicitante, respetar alcance, tipar roles y territorio, no mutar datos, auditar, invalidar contexto obsoleto y mostrar en VISO el efecto antes de guardar ya cuenta con cobertura vigente.

Esta tarea no crea una nueva modalidad de autorización, un nuevo resultado de simulación, un nuevo purpose, un nuevo rol, una nueva identidad territorial ni una nueva transición empresarial.

---

#### 33. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-VISO-001` — VISO muestra antes de guardar el efecto resultante y mantiene coherencia con el resultado consumido por las aplicaciones;
- `TREQ-AUTH-004` — evaluadores equivalentes producen decisiones coherentes para el mismo contexto;
- `TREQ-AUTH-007` — la administración requiere capacidad explícita y alcance del actor;
- `TREQ-AUTH-012` — la simulación permanece separada de autoridad real y no ejecuta mutaciones reales;
- `TREQ-AUTH-013` — toda mutación protegida se revalida en servidor;
- `TREQ-AUTH-014` — cambios relevantes invalidan contexto derivado;
- `TREQ-AUTH-015` — la decisión conserva evidencia correlacionable;
- `TREQ-AUTH-069` a `TREQ-AUTH-078` — elegibilidad del solicitante, grants, actor humano, alcance, reautenticación, sesión, no mutación y auditoría;
- `TREQ-AUTH-079` a `TREQ-AUTH-087` — identidad tipada de roles simulables, colisiones, invalidez, completitud y sensibilidad;
- `TREQ-AUTH-089` a `TREQ-AUTH-108` — sede y área simuladas, alcance, compatibilidad, aislamiento y auditoría.

Estas referencias son trazabilidad heredada. No cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, protocolo, contrato de entrega, topología, políticas de tarea, `VISO-AUTH-013`, contratos `AUTH-CTX-*`, contratos `AUTH-SIM-*`, familia `vento.authorization.response-contracts@1.0.0`, `SimulationContextV1`, `SimulatedAuthorizationDecisionV1`, registro 04A aplicable y estado remoto de los repositorios propietarios consultados. |
| OPERATIVA | NOT_APPLICABLE | No se ejecutaron simulaciones reales ni se modificaron trabajadores, roles, permisos, sedes, áreas, turnos, grants, denies, excepciones o recursos. |
| FÍSICA | NOT_EXECUTED | No se modificaron VISO, Supabase, contratos compartidos, migraciones, RPC, RLS, funciones, datos, packages ni despliegues. |

---

#### 35. Criterios de aceptación

- [ ] El simulador consume el handoff contextual de `VISO-AUTH-013` sin convertirlo en autorización precomputada.
- [ ] El actor real se autoriza antes de construir el escenario hipotético.
- [ ] La autoridad para simular nunca procede del sujeto o rol simulado.
- [ ] Se exigen `viso.access` y `viso.authorization.context_simulations.view` cuando corresponde al solicitante interactivo.
- [ ] Se prohíbe simulación anidada.
- [ ] El contexto hipotético usa `SimulationContextV1` y no un contrato paralelo de VISO.
- [ ] Las decisiones hipotéticas usan `SimulatedAuthorizationDecisionV1`.
- [ ] Los estados de sesión permanecen dentro de `DRAFT`, `ACTIVE`, `COMPLETED`, `EXPIRED`, `REVOKED` e `INVALID`.
- [ ] El propósito pertenece a la taxonomía contractual vigente.
- [ ] El sujeto simulado utiliza una identidad tipada.
- [ ] Rol base y rol operativo permanecen separados.
- [ ] Sede y área simuladas son identidades exactas y compatibles.
- [ ] La sede primaria no sustituye la sede operativa.
- [ ] Tipo de área no sustituye identidad de área.
- [ ] Un turno hipotético no se completa desde defaults, perfiles o últimas selecciones.
- [ ] Cada evaluación identifica `app_code` y `permission_key` exactos.
- [ ] Una selección de permisos se expande a identidades concretas antes de evaluar.
- [ ] No existen wildcards implícitos ni permisos omitidos silenciosamente.
- [ ] Cuando el permiso depende de recurso, se conserva un escenario de recurso compatible.
- [ ] Recurso no resoluble no significa recurso global ni propio.
- [ ] Los carriles base y operativo se evalúan por separado.
- [ ] Un carril no requerido conserva `result = null` y no se interpreta como permiso.
- [ ] El resultado final solo usa `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE`.
- [ ] `INDETERMINATE` nunca se promociona a resultado favorable.
- [ ] Se conserva la confianza `CONTRACT_COMPLETE`, `PARTIAL_INPUT`, `MASKED_INPUT` o `VERSION_MISMATCH`.
- [ ] La comparación entre plano real y plano hipotético no mezcla sus contratos.
- [ ] Un `WOULD_ALLOW` no se presenta como autorización para ejecutar ni guardar.
- [ ] Las denegaciones aplicables prevalecen.
- [ ] Los problemas estructurales se conservan y no se reparan desde la interfaz.
- [ ] Las colecciones `would_allow`, `would_deny` e `indeterminate` permanecen reconciliadas con las evaluaciones reportadas.
- [ ] La interfaz marca inequívocamente el plano simulado.
- [ ] El origen detallado de permisos permanece reservado a `VISO-AUTH-015`.
- [ ] Los conflictos transversales permanecen reservados a `VISO-AUTH-016`.
- [ ] La administración de excepciones permanece reservada a `VISO-AUTH-017`.
- [ ] La auditoría conserva actor real, propósito, sujeto, escenario, permisos, resultados, versiones y tiempos con minimización.
- [ ] Una simulación expirada, revocada, inválida u obsoleta no valida una mutación posterior.
- [ ] El guardado real revalida en servidor identidad, contexto, autoridad y versión vigentes.
- [ ] El simulador no modifica sesión, trabajador, roles, asignaciones, turnos, check-in, permisos, grants, denies, excepciones ni datos empresariales.
- [ ] No se crea un contrato TypeScript paralelo a la familia compartida vigente.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`.

---

#### 36. Límites

Esta tarea no:

- modifica código de VISO;
- modifica Supabase;
- crea migraciones;
- crea tablas de simulación;
- crea RPC;
- crea funciones SQL;
- crea RLS;
- cambia grants de base de datos;
- modifica `SimulationContextV1`;
- modifica `SimulatedAuthorizationDecisionV1`;
- cambia la versión de `vento.authorization.response-contracts`;
- crea un catálogo nuevo de permisos;
- crea roles;
- modifica matrices de rol;
- crea o modifica asignaciones de sede o área;
- crea o modifica perfiles operativos;
- crea o modifica turnos o check-ins;
- crea grants individuales;
- crea denies;
- crea excepciones;
- ejecuta acciones empresariales simuladas;
- persiste `WOULD_ALLOW` como autoridad;
- expone el origen detallado reservado a `VISO-AUTH-015`;
- desarrolla el inventario transversal de conflictos de `VISO-AUTH-016`;
- administra excepciones de `VISO-AUTH-017`;
- implementa auditoría física de `VISO-AUTH-018`;
- cambia quién administra seguridad de `VISO-AUTH-019`;
- crea el exporte de `VISO-AUTH-020`;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-013 — Crear vista previa trabajador × sede × área × turno`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-014 — Crear simulador de permisos efectivos`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-015 — Mostrar origen de cada permiso`


### ✅ VISO-AUTH-015 — Mostrar origen de cada permiso

**Estado:** APROBADA
**Tarea anterior:** VISO-AUTH-014 — Crear simulador de permisos efectivos
**Tarea siguiente:** VISO-AUTH-016 — Mostrar conflictos de configuración
**Tipo de tarea:** documental; definición del contrato administrativo de procedencia de permisos que permite reconstruir, para cada permiso y decisión real o simulada, qué concesiones, denegaciones, carriles, alcances, restricciones y versiones participaron sin convertir la explicación en una segunda fuente de autorización
**Bloque:** `G_VISO — GOBIERNO DE ACCESO Y SEGURIDAD`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md`
**Estado físico resultante:** contrato documental definido; materialización física diferida por unidad de implementación
**Cambios físicos autorizados:** ninguno durante el cierre documental; la materialización futura permanece sujeta a `PER_IMPLEMENTATION_UNIT` y al gate `POST_E5_PACKAGE`
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué significa y cómo debe reconstruirse el **origen de cada permiso** dentro de la administración de seguridad de VISO.

La tarea no crea permisos ni decide autorización. Su responsabilidad es proyectar de forma trazable la explicación de una decisión ya evaluada o de una evaluación simulada ya producida, conservando las fuentes que participaron y evitando respuestas simplificadas como:

```text
"Tiene permiso por su rol"
```

cuando la decisión real puede depender simultáneamente de:

```text
rol base
+
rol operativo
+
grant individual
+
scope
+
territorio
+
recurso
+
deny
+
estado del carril
+
restricción de dispositivo
+
versión contractual
```

La regla raíz queda:

```text
ORIGEN DE PERMISO
=
EVIDENCIA DE POR QUÉ UNA EVALUACIÓN PRODUJO SU RESULTADO
```

y nunca:

```text
ORIGEN DE PERMISO
=
NUEVA AUTORIDAD
```

---

#### 2. Base normativa y fuentes de autoridad

Esta tarea consume decisiones ya aprobadas y no redefine sus contratos.

Fuentes vinculantes:

- `ADR-AUTH-001`;
- `AUTH-CTX-002` — `AuthorizationDecision` canónica;
- `AUTH-CTX-003` — `SimulationContext` separado;
- `AUTH-CTX-004` — versionado de contratos de respuesta;
- `AUTH-CTX-024` y `AUTH-CTX-030` — correlación y trazabilidad de decisiones;
- `AUTH-MOD-012` — separación entre simulación y autoridad real;
- `AUTH-RBAC-020` a `AUTH-RBAC-023` — concesiones, denegaciones, excepciones y dispositivos;
- `AUTH-SIM-001` a `AUTH-SIM-014` — reglas canónicas de simulación;
- `VISO-AUTH-003` — permisos por rol base;
- `VISO-AUTH-004` — permisos por rol operativo;
- `VISO-AUTH-005` y `VISO-AUTH-006` — disponibilidad territorial;
- `VISO-AUTH-007` a `VISO-AUTH-012` — perfiles, asignaciones y contexto operativo;
- `VISO-AUTH-013` — vista previa contextual;
- `VISO-AUTH-014` — simulación de permisos efectivos;
- la familia contractual `vento.authorization.response-contracts@1.0.0`;
- los catálogos y datasets versionados de autorización consumidos por la decisión evaluada.

La fuente de verdad continúa siendo la decisión autoritativa y sus datasets de autorización. VISO únicamente proyecta su procedencia.

---

#### 3. Resultado canónico

VISO deberá poder reconstruir para cada permiso evaluado una explicación que preserve, cuando aplique:

1. identidad exacta de la aplicación;
2. `permission_key` exacta;
3. plano `REAL` o `SIMULADO`;
4. identidad de la decisión;
5. resultado final;
6. modalidad de combinación entre carriles;
7. resultado del carril base;
8. resultado del carril operativo;
9. concesiones coincidentes;
10. denegaciones coincidentes;
11. bloqueos estructurales;
12. restricciones territoriales y de recurso;
13. restricción de dispositivo cuando participe;
14. versión contractual;
15. versiones y fingerprints de las fuentes;
16. momento de evaluación;
17. frescura de la explicación respecto de la decisión original.

El origen debe ser reconstruible sin volver a evaluar el permiso desde la interfaz.

---

#### 4. Definición contractual de “origen”

El término **origen** se usa en esta tarea para describir la procedencia de una decisión de permiso.

No significa únicamente “de qué tabla salió”.

Deben distinguirse tres capas:

| Capa | Responde | Ejemplos |
| --- | --- | --- |
| Identidad del permiso | ¿Qué capacidad exacta se evaluó? | aplicación, `permission_key`, versión del catálogo |
| Procedencia de autoridad | ¿Qué fuentes aportaron `ALLOW` o `DENY`? | rol base, rol operativo, grant individual, deny aplicable |
| Condiciones de evaluación | ¿Qué restricciones hicieron aplicable o inaplicable la fuente? | carril, scope, territorio, recurso, dispositivo, vigencia |

La tabla física, vista o función que almacenó una fila es evidencia técnica de procedencia, pero no sustituye la semántica contractual de la fuente.

---

#### 5. Separación entre procedencia y decisión

La explicación deberá conservar simultáneamente:

```text
FUENTES QUE COINCIDIERON
+
FUENTES QUE BLOQUEARON
+
CONDICIONES EVALUADAS
+
RESULTADO FINAL
```

Un `ALLOW` no autoriza a esconder las denegaciones evaluadas como no aplicables.

Un `DENY` no autoriza a borrar las concesiones candidatas que fueron superadas por precedencia.

Un estado indeterminado no podrá inventar un grant, deny o rol como causa definitiva.

---

#### 6. Entrada real: AuthorizationDecision

Para decisiones reales, la proyección de origen se alimenta de la `AuthorizationDecision` canónica.

Las colecciones contractuales relevantes son:

```text
matched_allows
matched_denies
structural_denies
actor_wide_denies
lane_denies
blocked_reasons
combination
final_decision
audit
```

La interfaz administrativa no reconstruirá esas colecciones consultando por separado tablas de roles, perfiles o excepciones.

Cuando no exista una decisión canónica con evidencia suficiente, la procedencia no podrá presentarse como autoritativa.

---

#### 7. Fuentes positivas canónicas

`MatchedGrant` define cuatro clases cerradas de procedencia positiva:

| `source_kind` | Significado administrativo |
| --- | --- |
| `BASE_ROLE` | la concesión proviene de la matriz del rol base real |
| `OPERATIONAL_ROLE` | la concesión proviene de la matriz del rol operativo efectivo |
| `INDIVIDUAL_BASE` | existe una concesión individual aplicable al carril base |
| `INDIVIDUAL_OPERATIONAL` | existe una concesión individual aplicable al carril operativo |

No se crearán aliases visuales que cambien estas identidades.

Una etiqueta humana podrá explicar la clase, pero deberá conservar detrás el valor contractual exacto.

---

#### 8. Evidencia mínima de una concesión coincidente

Cuando una concesión coincida, VISO deberá conservar como mínimo los atributos que ya forman parte de `MatchedGrant`:

```text
grant_id
lane
source_kind
source_subject_id
permission_key
effect = ALLOW
scope_code
matched_territory
matched_resource
validity_status
source_dataset_id
source_dataset_version
```

La explicación no podrá reducir una coincidencia a `role_name`.

`source_subject_id` identifica el sujeto contractual de la fuente; su representación humana no podrá cambiar su identidad.

---

#### 9. Carril de la concesión

Toda concesión positiva pertenece exactamente a:

```text
BASE
```

o:

```text
OPERATIONAL
```

El carril forma parte del origen.

Por tanto:

```text
BASE_ROLE
```

no equivale a:

```text
OPERATIONAL_ROLE
```

aunque ambos produzcan un `ALLOW` sobre la misma `permission_key`.

Tampoco se fusionarán concesiones individuales base y operativas bajo una etiqueta genérica “excepción”.

---

#### 10. Fuentes negativas canónicas

`MatchedDeny` clasifica la precedencia negativa mediante:

```text
STRUCTURAL
ACTOR_WIDE
BASE_LANE
OPERATIONAL_LANE
DEFAULT
```

La explicación deberá conservar el `deny_class` exacto.

`source_kind` de un deny se tratará como dato contractual de la decisión evaluada y no se cerrará localmente en VISO con una enumeración inventada.

---

#### 11. Evidencia mínima de una denegación coincidente

Para un deny coincidente deberán preservarse, como mínimo:

```text
deny_id
deny_class
lane
permission_key
source_kind
matched_actor
matched_resource
matched_territory
matched_validity
reason_code
```

Una denegación no se explicará únicamente con texto libre.

El `reason_code` y la clase permiten distinguir una prohibición real de una ausencia de concesión.

---

#### 12. Default deny

`DEFAULT` es una causa de resultado, no una concesión negativa inventada.

Cuando no exista una concesión suficiente y la política produzca denegación por defecto, VISO deberá mostrar que:

```text
no existe ALLOW suficiente
+
la política canónica es fail closed
→
DENY por defecto
```

No deberá mostrarse:

```text
"denegado por el rol"
```

si no existe un deny explícito proveniente del rol.

Ausencia de grant y deny explícito son hechos diferentes.

---

#### 13. Concesión candidata superada por deny

La procedencia no se reduce al último elemento que “ganó”.

Caso conceptual:

```text
grant coincidente
+
deny aplicable de mayor precedencia
→
DENY
```

La explicación deberá conservar:

- la concesión candidata;
- su carril;
- su scope;
- la denegación que prevaleció;
- el `reason_code`;
- el resultado final.

Esto permite distinguir “nunca tuvo una concesión” de “existía una concesión pero una prohibición aplicable prevaleció”.

---

#### 14. Modalidad de autorización

La procedencia deberá conservar la modalidad contractual evaluada:

```text
BASE_ONLY
OPERATIONAL_ONLY
BASE_OR_OPERATIONAL
BASE_AND_OPERATIONAL
```

La modalidad determina qué carriles participan.

No se podrá presentar un permiso como originado únicamente en el carril que produjo `ALLOW` si la modalidad exigía además un segundo carril que terminó en `DENY` o estado no resoluble.

---

#### 15. Resultado por carril

Para cada permiso deberá distinguirse:

```text
resultado del carril BASE
resultado del carril OPERATIONAL
resultado final combinado
```

Un carril no requerido no se interpreta como denegado.

Un carril requerido pero no resoluble no se interpreta como ausente.

La explicación deberá conservar la diferencia entre:

```text
NO REQUERIDO
DENEGADO
NO RESOLUBLE
PERMITIDO
```

sin convertir esos estados en nuevos códigos de autorización.

---

#### 16. Scope no equivale a origen

El `scope_code` delimita la concesión; no constituye por sí solo su procedencia.

La explicación debe poder responder por separado:

```text
¿quién o qué aportó la concesión?
```

y:

```text
¿hasta dónde aplica?
```

Ejemplo conceptual:

```text
source_kind = BASE_ROLE
scope_code = alcance territorial concreto
```

El origen sigue siendo el rol base; el scope define su límite.

---

#### 17. Territorio y recurso

`matched_territory` y `matched_resource` forman parte de la evidencia de aplicabilidad.

Una concesión existente cuyo territorio no coincide no debe mostrarse como permiso efectivo.

Una concesión existente cuyo recurso no coincide no debe mostrarse como permiso efectivo.

La interfaz podrá mostrarla como fuente evaluada solo cuando la decisión canónica la conserve como tal; no deberá inferir coincidencias consultando matrices por su cuenta.

---

#### 18. Vigencia

Una fuente histórica, vencida, retirada o incompatible no podrá presentarse como origen vigente de autoridad.

La explicación deberá conservar la vigencia reportada por la decisión y las versiones de dataset utilizadas.

Cuando el estado actual haya cambiado después del `decided_at`, la explicación se presentará como evidencia histórica de esa decisión y no como garantía del permiso actual.

---

#### 19. Grants individuales

Las concesiones individuales solo podrán mostrarse como origen cuando la evaluación canónica las haya reconocido mediante:

```text
INDIVIDUAL_BASE
```

o:

```text
INDIVIDUAL_OPERATIONAL
```

La existencia de una fila individual no implica que haya sido efectiva.

VISO no convertirá una concesión individual vencida, fuera de alcance o derrotada por una denegación en “permiso directo”.

---

#### 20. Frontera frente a VISO-AUTH-017

`VISO-AUTH-015` puede **mostrar** que una concesión individual participó en el resultado.

No puede:

- crearla;
- editarla;
- aprobarla;
- extenderla;
- revocarla;
- cambiar su vigencia;
- cambiar su scope;
- cambiar su motivo;
- eliminar una denegación que la bloquea.

La administración de excepciones individuales permanece reservada a `VISO-AUTH-017`.

---

#### 21. Bloqueos estructurales

`structural_denies` y `blocked_reasons` no se transformarán en permisos ni grants ficticios.

Cuando una evaluación falle por identidad, contexto, versión, recurso u otra condición estructural, VISO deberá mostrar la causa como bloqueo de evaluación.

Regla:

```text
PROBLEMA ESTRUCTURAL
≠
ORIGEN POSITIVO
≠
DENY INVENTADO POR LA UI
```

---

#### 22. Dispositivo

El dispositivo puede limitar una decisión, pero su mera presencia no constituye una concesión humana.

La explicación deberá separar:

```text
fuente de autoridad del actor
```

de:

```text
restricción o techo del dispositivo
```

Un dispositivo compartido no se presentará como “rol que dio el permiso”.

Si la decisión fue restringida por el dispositivo, esa restricción deberá conservarse como condición de evaluación.

---

#### 23. Identidad del permiso

Toda explicación se vinculará a una `permission_key` canónica exacta y a la aplicación evaluada.

Una descripción humana, etiqueta de módulo, nombre de pantalla o texto traducido no sustituye la identidad contractual.

La explicación podrá mostrar un nombre legible, pero deberá ser posible reconstruir:

```text
app_code + permission_key
```

sin ambigüedad.

---

#### 24. Una explicación por permiso evaluado

No se permite construir una sola etiqueta de origen para todo un trabajador, rol, aplicación o módulo.

Cada `permission_key` conserva su propia explicación.

Dos permisos visibles en la misma pantalla pueden tener:

- fuentes distintas;
- carriles distintos;
- scopes distintos;
- denies distintos;
- recursos distintos;
- resultados distintos.

---

#### 25. Múltiples fuentes positivas

Un permiso puede contener más de una concesión coincidente.

VISO deberá conservar todas las coincidencias entregadas por la decisión autoritativa.

No se elegirá silenciosamente una “fuente principal” por:

- orden de consulta;
- orden visual;
- rol con mayor jerarquía;
- primera fila;
- mayor scope;
- coincidencia de nombre.

Si la experiencia posterior necesita destacar una fuente, deberá hacerlo sin ocultar las demás.

---

#### 26. Múltiples fuentes negativas

Una decisión puede contener más de una denegación relevante.

Todas las coincidencias conservadas por la decisión deberán permanecer reconstruibles.

La explicación no podrá borrar una denegación estructural porque exista además un deny de carril ni reemplazar varios `reason_code` por una frase genérica.

La precedencia pertenece al evaluador canónico, no a la UI.

---

#### 27. Plano simulado

Para evaluaciones de `VISO-AUTH-014`, el origen se deriva del resultado simulado y nunca se mezcla con autoridad real.

`SimulationMatch` conserva:

```text
effect
lane
provenance
source_id
```

`provenance` admite exactamente:

```text
VIGENTE
PROPUESTA
SINTÉTICA
```

La explicación deberá hacer inequívoca esa procedencia.

---

#### 28. Procedencia simulada

En un escenario simulado:

```text
VIGENTE
```

significa que la fuente hipotética parte de una condición real vigente incorporada al escenario.

```text
PROPUESTA
```

significa que la fuente proviene del cambio que se está evaluando.

```text
SINTÉTICA
```

significa que la fuente pertenece exclusivamente al escenario hipotético.

Ninguna de las tres etiquetas convierte el resultado en autoridad real.

---

#### 29. source_id nulo en simulación

`SimulationMatch.source_id` puede ser `null`.

La ausencia de `source_id` no autoriza a VISO a inventar una fila física.

Cuando el contrato permite una fuente sintética o derivada sin identificador persistido, deberá mostrarse como tal.

Regla:

```text
source_id = null
≠
fuente desconocida reparable por la UI
```

---

#### 30. Resultado simulado

El plano simulado conserva únicamente:

```text
WOULD_ALLOW
WOULD_DENY
INDETERMINATE
```

La explicación de origen deberá utilizar esos resultados.

Queda prohibido renombrarlos visual o contractualmente como:

```text
ALLOW
DENY
AUTORIZADO
BLOQUEADO REAL
```

sin una marca inequívoca de simulación.

---

#### 31. Separación real / simulada

Una misma pantalla futura podrá comparar estado vigente y escenario propuesto, pero las procedencias deben permanecer físicamente distinguibles en los datos consumidos.

No se mezclarán en una sola colección:

- grants reales;
- matches hipotéticos;
- denies reales;
- denies hipotéticos;
- identificadores de decisión real;
- identificadores de decisión simulada.

Una fuente propuesta nunca aparecerá como grant vigente.

---

#### 32. Frescura y snapshot

Toda explicación está ligada al snapshot de la decisión que la produjo.

Como mínimo deberán conservarse:

```text
decision_id o simulated_decision_id
decided_at o evaluated_at
contract_version
catalog_version cuando aplique
source_dataset_id
source_dataset_version
fingerprints disponibles
```

Un cambio posterior en rol, turno, área, perfil, grant, deny, recurso, dispositivo o versión puede volver obsoleta la explicación.

VISO deberá volver a evaluar cuando necesite representar autoridad actual.

---

#### 33. Explicación histórica versus autoridad actual

Una decisión antigua puede seguir siendo válida como evidencia histórica.

No necesariamente sigue siendo válida como descripción del permiso actual.

La interfaz futura deberá distinguir conceptualmente:

```text
"por qué esta decisión fue tomada"
```

de:

```text
"qué permiso tiene ahora"
```

La primera puede usar el snapshot histórico.

La segunda exige una evaluación vigente.

---

#### 34. Minimización de información

Mostrar origen no autoriza a revelar datos que el actor administrador no puede consultar.

La explicación deberá minimizar:

- identificadores personales innecesarios;
- motivos disciplinarios sensibles;
- datos médicos;
- secretos;
- tokens;
- payloads completos;
- datos de otro trabajador fuera de alcance;
- detalles internos de controles que faciliten evasión.

La minimización no puede falsificar el resultado.

Cuando un detalle no pueda exponerse, debe conservarse una explicación segura suficiente para distinguir:

```text
fuente visible
fuente restringida
resultado final
```

sin revelar el contenido protegido.

---

#### 35. Autorización para consultar procedencia

La capacidad de administrar permisos y la capacidad de ver información sensible de procedencia no se asumirán equivalentes por nombre de pantalla.

La futura implementación deberá validar en servidor:

- acceso a VISO;
- permiso exacto de consulta aplicable;
- territorio del actor;
- relación con el sujeto consultado;
- sensibilidad del detalle;
- contexto real del solicitante.

Un selector de trabajador, query string o dato enviado por cliente no ampliará el alcance.

---

#### 36. Reconciliación AS-IS de VISO

El VISO actual ya posee una superficie `roles-permissions` que:

- lista roles activos;
- lista permisos configurables;
- lee filas de `role_permissions`;
- permite registrar `is_allowed`;
- permite scopes `global`, `site`, `site_type`, `area` y `area_kind`;
- utiliza una acción administrativa de servidor para escribir y retirar filas.

Esa superficie administra configuración por rol.

No constituye todavía una proyección del **origen efectivo por trabajador y permiso** porque no parte de una `AuthorizationDecision` completa ni materializa simultáneamente:

- `matched_allows`;
- `matched_denies`;
- combinación entre carriles;
- bloqueos estructurales;
- procedencia simulada;
- snapshot de decisión.

Por tanto:

```text
fila de role_permissions
≠
origen efectivo completo
```

---

#### 37. Reconciliación con contratos físicos compartidos

La familia compartida `vento.authorization.response-contracts@1.0.0` ya materializa contratos físicos para `AccessContextV1`, `SimulationContextV1` y `SimulatedAuthorizationDecisionV1`.

La instancia física aprobada de `SHELL-CON-007` excluyó expresamente la materialización del `AuthorizationDecisionV1` completo.

Consecuencia:

- la definición documental de origen real puede cerrarse ahora;
- la futura unidad física de VISO no podrá asumir que el contrato real completo ya está publicado y consumible;
- antes de materializar esta tarea deberá comprobarse la dependencia física propietaria de la decisión real;
- no se crea aquí un contrato paralelo para compensar esa dependencia.

Esta diferencia no bloquea el cierre documental.

---

#### 38. Proyección administrativa conceptual

La futura materialización podrá utilizar una proyección equivalente a:

```ts
type PermissionOriginProjection = {
  plane: "REAL" | "SIMULATED";
  app_code: string;
  permission_key: string;

  decision_reference: string;
  evaluated_at: string;
  result: string;
  authorization_requirement: string | null;

  base_result: string | null;
  operational_result: string | null;

  allow_sources: unknown[];
  deny_sources: unknown[];
  blocked_reasons: unknown[];

  contract_version: string;
  source_versions: Record<string, string>;
};
```

Esta forma es únicamente documental y no crea un nuevo contrato público.

Los elementos internos de `allow_sources`, `deny_sources` y `blocked_reasons` deberán conservar las estructuras canónicas del evaluador aplicable; no se reemplazarán por tipos locales incompatibles.

---

#### 39. Separación frente a VISO-UX-014

Esta tarea define **semántica, procedencia, identidad y límites de los datos**.

No define la experiencia visual final de explicación.

`VISO-UX-014 — Mostrar origen de permisos de forma comprensible` es responsable posteriormente de decidir, entre otros:

- jerarquía visual;
- lenguaje humano;
- niveles de detalle;
- expansión o colapso;
- iconografía;
- microcopy;
- accesibilidad;
- comparación visual entre fuentes.

La UX no podrá cambiar la semántica fijada aquí.

---

#### 40. Separación frente a VISO-AUTH-016

`VISO-AUTH-015` explica el origen de una decisión o permiso evaluado.

No construye el inventario transversal de configuraciones incompatibles.

Ejemplos reservados a `VISO-AUTH-016`:

- grants contradictorios entre fuentes;
- configuración imposible;
- duplicados incompatibles;
- matrices que producen conflicto sistémico;
- combinaciones administrativas que deben impedir un guardado.

Esta tarea puede mostrar denies o bloqueos que ya participaron en una decisión sin convertirlos en un motor de detección global de conflictos.

---

#### 41. Separación frente a VISO-AUTH-018

La procedencia usa evidencia de auditoría para ser reconstruible.

No administra el sistema de auditoría.

`VISO-AUTH-018` permanece responsable de la experiencia administrativa y cobertura de cambios de seguridad.

Esta tarea no crea logs, retención, exportes ni políticas de almacenamiento.

---

#### 42. Separación frente a VISO-AUTH-019 y VISO-AUTH-020

`VISO-AUTH-019` determina quién puede administrar seguridad.

`VISO-AUTH-020` define el exporte de la matriz de acceso.

La procedencia definida aquí no:

- concede privilegios administrativos;
- convierte una explicación en capacidad de edición;
- crea un exporte;
- sustituye el control de lectura del exporte;
- autoriza acceso masivo a fuentes sensibles.

---

#### 43. Handoff recibido de VISO-AUTH-014

`VISO-AUTH-014` entrega evaluaciones simuladas separadas del plano real.

Esta tarea recibe, cuando aplique:

```text
simulation_id
simulated_decision_id
permission_key
base_result
operational_result
matched_hypothetical_allows
matched_hypothetical_denies
blocked_reasons
final_result
provenance
versiones
```

La tarea no vuelve a ejecutar la simulación para explicar el resultado.

---

#### 44. Handoff a VISO-AUTH-016

`VISO-AUTH-016` recibirá una procedencia ya tipada y separada.

Podrá utilizar como evidencia:

- fuentes positivas;
- fuentes negativas;
- carriles;
- scopes;
- resultados;
- bloqueos;
- versiones;
- plano real o simulado.

No podrá reinterpretar una fuente como conflicto únicamente por existir más de una coincidencia.

La existencia de múltiples grants o denies es evidencia; la clasificación de conflicto pertenece a la tarea siguiente.

---

#### 45. Casos mínimos que la procedencia deberá distinguir

| Caso | Explicación exigida |
| --- | --- |
| Un único grant base válido | identifica `BASE_ROLE`, sujeto fuente, scope, dataset y resultado |
| Un único grant operativo válido | identifica `OPERATIONAL_ROLE`, carril, contexto y resultado |
| Grant individual base | identifica `INDIVIDUAL_BASE` sin ocultarlo como rol |
| Grant individual operativo | identifica `INDIVIDUAL_OPERATIONAL` sin ocultarlo como rol |
| Grant válido + deny superior | conserva ambos y muestra que el deny prevalece |
| Sin grant suficiente | explica default deny sin inventar una fuente |
| Scope no coincidente | separa existencia de grant de aplicabilidad territorial |
| Recurso no coincidente | separa existencia de grant de aplicabilidad sobre recurso |
| Contexto estructural inválido | muestra bloqueo sin inventar grant o deny |
| Dos grants coincidentes | conserva ambos |
| Dos denies coincidentes | conserva ambos |
| Simulación vigente | conserva `VIGENTE` |
| Cambio propuesto | conserva `PROPUESTA` |
| Escenario sintético | conserva `SINTÉTICA` |
| Simulación indeterminada | no declara origen efectivo real |
| Snapshot histórico | no lo presenta como autoridad actual |

---

#### 46. Reglas de consistencia y fallo cerrado

La procedencia será no conforme cuando:

1. el permiso no tenga identidad exacta;
2. una decisión real no pueda correlacionarse con su `decision_id`;
3. una simulación no pueda correlacionarse con su decisión simulada;
4. una fuente positiva pierda `source_kind`;
5. una fuente positiva pierda su carril;
6. un deny pierda `deny_class`;
7. un `reason_code` sea sustituido únicamente por texto libre;
8. se fusione BASE con OPERATIONAL;
9. se convierta ausencia de grant en deny explícito;
10. se convierta un scope en fuente de autoridad;
11. se convierta un dispositivo en rol;
12. se convierta una propuesta simulada en grant real;
13. se descarte una fuente coincidente para simplificar la UI;
14. se use el estado actual para reescribir una explicación histórica;
15. una versión incompatible se presente como explicación vigente;
16. la UI reconstruya autoridad desde tablas parciales cuando falta una decisión canónica.

Ante esos casos:

```text
EXPLICACIÓN NO AUTORITATIVA
```

y nunca una procedencia inventada.

---

#### 47. Invariantes

1. El origen explica una decisión; no la concede.
2. Cada permiso conserva identidad exacta.
3. La procedencia positiva usa las cuatro clases canónicas de `MatchedGrant`.
4. La procedencia negativa conserva las cinco clases de `MatchedDeny`.
5. `source_kind` de deny no se restringe mediante una enumeración local inventada.
6. BASE y OPERATIONAL permanecen separados.
7. `BASE_AND_OPERATIONAL` conserva ambos carriles.
8. Scope y origen son dimensiones distintas.
9. Territorio y recurso condicionan aplicabilidad.
10. Ausencia de grant no equivale a deny explícito.
11. Un grant vencido no se presenta como origen vigente.
12. Un grant individual no se disfraza como permiso del rol.
13. Una excepción individual puede mostrarse, pero no administrarse aquí.
14. Los denies prevalecen conforme al evaluador canónico.
15. VISO no calcula precedencia propia.
16. Las fuentes múltiples no se reducen silenciosamente.
17. Los bloqueos estructurales no se convierten en grants o denies ficticios.
18. El dispositivo limita; no crea autoridad humana.
19. La explicación real consume una decisión real.
20. La explicación simulada consume una decisión simulada.
21. `VIGENTE`, `PROPUESTA` y `SINTÉTICA` permanecen diferenciadas.
22. `WOULD_ALLOW` nunca se presenta como `ALLOW`.
23. El snapshot histórico no se presenta como autoridad actual.
24. Versiones y tiempos permanecen correlacionables.
25. La minimización no falsifica el resultado.
26. La lectura de procedencia se autoriza en servidor.
27. La superficie AS-IS de `role_permissions` no se declara equivalente al origen efectivo.
28. No se crea un nuevo contrato público.
29. `VISO-UX-014` conserva la propiedad de la presentación comprensible.
30. `VISO-AUTH-016` conserva la propiedad de los conflictos.
31. `VISO-AUTH-017` conserva la administración de excepciones.
32. `VISO-AUTH-018` conserva la administración de auditoría.
33. La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 48. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La obligación de indicar el origen de cada permiso, conservar resultados coherentes entre evaluadores, respetar alcance y preservar evidencia correlacionable ya está registrada en el catálogo vigente.

Esta tarea desarrolla la semántica administrativa de esa cobertura existente sin introducir una nueva capacidad, resultado de autorización, clase de grant, clase de deny, estado de negocio ni transición.

---

#### 49. Cobertura de prueba vigente reutilizada

Sin modificar el registro, se reutiliza:

- `TREQ-VISO-001` — la administración de seguridad debe indicar el origen de cada permiso y producir el mismo resultado consumido por las aplicaciones operativas;
- `TREQ-AUTH-001` — una lista local de nombres de rol no puede conceder autorización final;
- `TREQ-AUTH-004` — evaluadores equivalentes deben producir la misma decisión y razones equivalentes;
- `TREQ-AUTH-007` — la administración de permisos debe validar capacidad administrativa y territorio;
- `TREQ-AUTH-008` — las capacidades base y operativas conservan sus requisitos de contexto y carril;
- `TREQ-AUTH-009` — sede y área se resuelven determinísticamente;
- `TREQ-AUTH-012` — simulación y autoridad real permanecen separadas;
- `TREQ-AUTH-014` — cambios de contexto invalidan decisiones derivadas;
- `TREQ-AUTH-015` — toda decisión y acción protegida conserva evidencia correlacionable de contexto, permiso, recurso, resultado, razones, versión y tiempo.

Estas referencias son trazabilidad heredada. No cambian contenido, estado, paquete, evidencia ni secuencia de ningún requisito.

---

#### 50. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La definición documental no ejecutó build del checkout local propietario. |
| LOCAL | NOT_EXECUTED | La tarea todavía no fue insertada, normalizada ni validada en la rama documental local. |
| REMOTA | PASS | Se verificaron `main`, continuidad, protocolo, contrato de entrega, topología, políticas de tarea, VISO-AUTH-014, 04A aplicable, contratos de `AuthorizationDecision` y simulación, materialización de response-contracts y la superficie AS-IS de `roles-permissions` en VISO. |
| OPERATIVA | NOT_APPLICABLE | No se modificaron trabajadores, roles, permisos, grants, denies, scopes, perfiles, turnos, simulaciones ni configuraciones reales. |
| FÍSICA | NOT_EXECUTED | No se modificaron código de VISO, Supabase, contratos físicos, migraciones, RPC, RLS, datos, packages ni despliegues. |

---

#### 51. Criterios de aceptación

- [ ] Cada explicación corresponde a una `permission_key` exacta.
- [ ] El plano real y el plano simulado permanecen separados.
- [ ] Una decisión real conserva su referencia de decisión.
- [ ] Una decisión simulada conserva su referencia de decisión simulada.
- [ ] Las fuentes positivas conservan `grant_id`.
- [ ] Las fuentes positivas conservan carril.
- [ ] Las fuentes positivas conservan `source_kind`.
- [ ] Se preservan `BASE_ROLE`, `OPERATIONAL_ROLE`, `INDIVIDUAL_BASE` e `INDIVIDUAL_OPERATIONAL`.
- [ ] Las fuentes positivas conservan `source_subject_id`.
- [ ] Las fuentes positivas conservan `scope_code`.
- [ ] Las fuentes positivas conservan coincidencia de territorio y recurso.
- [ ] Las fuentes positivas conservan dataset y versión.
- [ ] Las fuentes negativas conservan `deny_id`.
- [ ] Las fuentes negativas conservan `deny_class`.
- [ ] Se preservan `STRUCTURAL`, `ACTOR_WIDE`, `BASE_LANE`, `OPERATIONAL_LANE` y `DEFAULT`.
- [ ] `source_kind` de deny no se restringe mediante una enumeración local inventada.
- [ ] Los denies conservan actor, recurso, territorio, vigencia y `reason_code`.
- [ ] Default deny se distingue de deny explícito.
- [ ] La ausencia de grant no se presenta como deny de rol.
- [ ] Un grant candidato superado por deny permanece visible en la explicación.
- [ ] La modalidad `BASE_ONLY` conserva solo el carril requerido.
- [ ] La modalidad `OPERATIONAL_ONLY` conserva solo el carril requerido.
- [ ] `BASE_OR_OPERATIONAL` conserva el resultado de ambos carriles participantes.
- [ ] `BASE_AND_OPERATIONAL` conserva la doble condición.
- [ ] Un carril no requerido no se presenta como denegado.
- [ ] Scope se mantiene separado del origen.
- [ ] Territorio se mantiene separado del origen.
- [ ] Recurso se mantiene separado del origen.
- [ ] Un grant fuera de scope no se presenta como permiso efectivo.
- [ ] Un grant sobre recurso no coincidente no se presenta como permiso efectivo.
- [ ] Un grant individual no se disfraza como concesión de rol.
- [ ] Esta tarea no administra excepciones individuales.
- [ ] Los bloqueos estructurales permanecen separados de grants y denies.
- [ ] El dispositivo no se presenta como rol ni fuente humana de autoridad.
- [ ] Cada permiso puede conservar múltiples fuentes positivas.
- [ ] Cada permiso puede conservar múltiples fuentes negativas.
- [ ] No se selecciona una fuente principal por jerarquía ni orden de consulta.
- [ ] `VIGENTE`, `PROPUESTA` y `SINTÉTICA` permanecen diferenciadas.
- [ ] `source_id = null` en simulación no produce una fuente persistida inventada.
- [ ] `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE` permanecen como resultados simulados.
- [ ] Una fuente propuesta no aparece como grant real.
- [ ] La explicación conserva versiones y timestamp.
- [ ] Una explicación histórica no se presenta como autoridad actual.
- [ ] Cambios posteriores fuerzan nueva evaluación para representar autoridad vigente.
- [ ] La información sensible se minimiza sin falsificar el resultado.
- [ ] La consulta de procedencia se protege en servidor.
- [ ] La superficie AS-IS de `roles-permissions` se reconoce como configuración por rol y no como origen efectivo completo.
- [ ] La materialización parcial de response-contracts no se interpreta como disponibilidad del `AuthorizationDecisionV1` físico completo.
- [ ] No se crea un contrato público paralelo.
- [ ] La semántica queda separada de la presentación reservada a `VISO-UX-014`.
- [ ] Los conflictos transversales permanecen reservados a `VISO-AUTH-016`.
- [ ] Las excepciones individuales permanecen reservadas a `VISO-AUTH-017`.
- [ ] La auditoría administrativa permanece reservada a `VISO-AUTH-018`.
- [ ] Se conservan cero cambios al Registro Canónico de Requisitos de Prueba.
- [ ] La materialización física permanece detrás de `POST_E5_PACKAGE`.

---

#### 52. Límites

Esta tarea no:

- modifica código de VISO;
- modifica Supabase;
- modifica `role_permissions`;
- modifica roles base;
- modifica roles operativos;
- modifica grants individuales;
- modifica denies;
- modifica scopes;
- modifica sedes;
- modifica áreas;
- modifica perfiles operativos;
- modifica turnos;
- modifica check-ins;
- crea excepciones;
- administra excepciones;
- ejecuta simulaciones;
- cambia resultados de simulación;
- crea `AuthorizationDecisionV1` físico;
- modifica `AccessContextV1`;
- modifica `SimulationContextV1`;
- modifica `SimulatedAuthorizationDecisionV1`;
- crea un nuevo contrato público;
- crea RPC;
- crea RLS;
- crea vistas SQL;
- crea migraciones;
- ejecuta SQL de escritura;
- crea un motor de conflictos;
- define la UX final de explicación;
- implementa auditoría física;
- cambia quién administra seguridad;
- crea exportes;
- selecciona package;
- prepara o aprueba package gate;
- autoriza ni ejecuta implementación física.

La identidad exacta de la futura unidad física se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 53. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-AUTH-014 — Crear simulador de permisos efectivos`

**TAREA ACTUAL APROBADA**
`VISO-AUTH-015 — Mostrar origen de cada permiso`

**SIGUIENTE TAREA RESERVADA**
`VISO-AUTH-016 — Mostrar conflictos de configuración`


### [ ] VISO-AUTH-016 — Mostrar conflictos de configuración
### [ ] VISO-AUTH-017 — Administrar excepciones individuales
### [ ] VISO-AUTH-018 — Auditar cambios de seguridad
### [ ] VISO-AUTH-019 — Restringir quién administra seguridad
### [ ] VISO-AUTH-020 — Crear exporte de matriz de acceso

SUBBLOQUE G2 — VISO Core

VISO Core deberá implementarse antes o en paralelo con las aplicaciones
operativas porque administra el modelo que estas consumen.

VISO Core no crea un segundo catálogo de funciones administrativas.

Su alcance funcional está compuesto por las tareas:

VISO-AUTH-001 a VISO-AUTH-020

Estas tareas cubren:

trabajadores;
roles base;
roles operativos;
sedes;
áreas;
perfiles operativos;
turnos;
permisos;
excepciones;
simulación;
conflictos;
auditoría.

Las tareas VISO-CORE controlan únicamente el corte mínimo,
la priorización y la aprobación del habilitador.
