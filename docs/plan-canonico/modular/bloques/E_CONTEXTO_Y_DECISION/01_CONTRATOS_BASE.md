## CONTRATOS BASE

### ✅ AUTH-CTX-001 — Diseñar AccessContext canónico

**Estado:** APROBADA  
**Bloque:** BLOQUE E — Contexto y decisión de autorización unificados  
**Naturaleza:** Diseño documental de contrato canónico  
**Implementación física:** No incluida  
**Bloque anterior vigente:** BLOQUE D — CERRADO DOCUMENTALMENTE  
**Tarea anterior vigente:** AUTH-RBAC-028 — APROBADA  
**Tarea posterior reservada:** AUTH-CTX-002 — Diseñar AuthorizationDecision canónica  
**Contrato diseñado:** `AccessContext`  
**Versión contractual:** Pendiente de AUTH-CTX-004  
**Fuentes contractuales vigentes:** catálogo y datasets canónicos de autorización `1.0.0`

Esta tarea diseña la forma, responsabilidad, límites e invariantes del
`AccessContext` canónico de Vento OS.

No implementa tipos TypeScript, funciones SQL, RPC, migraciones, RLS,
triggers, caché, compatibilidad legacy ni cambios físicos en Supabase.

---

#### 1. Objetivo

Definir un contrato único que permita resolver, de forma explícita y
auditable:

1. qué principal presentó la credencial;
2. quién es el actor efectivo;
3. qué identidad de dominio se está utilizando;
4. si existe una identidad laboral válida;
5. cuál es el rol base vigente;
6. cuál es la cobertura administrativa asignada;
7. si existe un turno operativo válido;
8. si existe una sesión de check-in válida;
9. cuál es el rol operativo efectivo;
10. cuáles son la sede y el área operativas;
11. si interviene un dispositivo compartido;
12. qué problemas estructurales impiden o limitan la evaluación.

El contrato deberá evitar que cada aplicación reconstruya su propia versión
de identidad, rol, sede, área, turno o check-in.

Flujo conceptual:

```text
PRINCIPAL AUTENTICADO
        ↓
RESOLUCIÓN DE IDENTIDAD DE DOMINIO
        ↓
RESOLUCIÓN DEL ACTOR EFECTIVO
        ↓
RESOLUCIÓN DE IDENTIDAD LABORAL
        ↓
RESOLUCIÓN DEL CARRIL BASE
        +
RESOLUCIÓN DEL CONTEXTO OPERATIVO
        +
RESOLUCIÓN DEL DISPOSITIVO
        ↓
ACCESS CONTEXT
```

---

#### 2. Decisión principal

`AccessContext` será un snapshot inmutable, resuelto en servidor y
referenciado por una evaluación de autorización.

Regla:

```text
AccessContext
=
hechos de identidad
+
hechos laborales
+
hechos territoriales
+
hechos operativos
+
hechos de dispositivo
+
problemas estructurales
```

No contiene la decisión final de autorización.

```text
AccessContext
≠ AuthorizationDecision
```

El contexto describe quién actúa y bajo qué condiciones.

La decisión posterior determina si una capacidad exacta puede ejecutarse
sobre un recurso exacto.

---

#### 3. Responsabilidad del contrato

`AccessContext` responde:

```text
¿Quién presentó la credencial?
¿A quién se atribuye la acción?
¿Qué identidad de dominio está activa?
¿Existe un empleado válido?
¿Qué rol base tiene?
¿Qué cobertura administrativa posee?
¿Existe un turno válido?
¿Existe check-in válido?
¿Qué rol operativo está activo?
¿En qué sede y área opera?
¿Qué dispositivo interviene?
¿Qué hechos estructurales son inválidos?
```

No responde:

```text
¿Puede ejecutar el permiso X?
¿El recurso Y está dentro del alcance?
¿Qué grant coincidió?
¿Qué deny coincidió?
¿Cuál fue la decisión final?
```

Esas respuestas pertenecen a `AuthorizationDecision`.

---

#### 4. Principios obligatorios

##### 4.1 Resolución exclusiva en servidor

Ningún campo autoritativo podrá aceptarse como verdad desde:

- query string;
- body de una mutación;
- parámetros de ruta;
- local storage;
- estado de React;
- cookie no firmada;
- selector visual;
- nombre de rol enviado por el cliente;
- sede o área seleccionada en el frontend.

El cliente podrá solicitar un contexto administrativo o enviar referencias
de navegación, pero el servidor deberá validarlas contra fuentes canónicas.

##### 4.2 Snapshot inmutable

Una vez resuelto:

- no se modifica internamente;
- no cambia de actor;
- no cambia de sede;
- no cambia de rol;
- no mezcla datos obtenidos en momentos distintos;
- no se reutiliza después de quedar obsoleto.

Una nueva realidad requiere un nuevo contexto.

##### 4.3 Sin autoridad implícita

Ningún elemento aislado concede permisos:

```text
principal
rol
sede asignada
turno
check-in
dispositivo
navegación
```

Todos son hechos de entrada para la evaluación posterior.

##### 4.4 Separación de carriles

El contrato separará de forma inequívoca:

```text
CARRIL BASE
→ rol base
→ cobertura administrativa

CARRIL OPERATIVO
→ turno
→ check-in
→ rol operativo
→ sede y área operativas
```

La ausencia de contexto operativo no invalida automáticamente el carril
base.

##### 4.5 Fail closed

Una contradicción, ambigüedad o fuente ausente que sea obligatoria deberá
producir un problema estructural.

No se aplicarán fallbacks silenciosos para convertir estados incompletos en
autoridad.

---

#### 5. Forma canónica de alto nivel

```ts
type AccessContext = {
  contract_name: "AccessContext";
  contract_version: string;
  context_id: string;
  resolved_at: string;

  principal: PrincipalContext;
  actor_effective: EffectiveActorContext;
  domain_identity: DomainIdentityContext | null;
  employee: EmployeeContext | null;

  base_role: BaseRoleContext | null;
  assigned_sites: AssignedSiteContext[];
  assigned_areas: AssignedAreaContext[];
  administrative_coverage: AdministrativeCoverageContext;

  active_shift: ActiveShiftContext | null;
  active_checkin_session: ActiveCheckinContext | null;
  operational_role: OperationalRoleContext | null;
  operational_site: OperationalSiteContext | null;
  operational_area: OperationalAreaContext | null;

  device_context: DeviceContext | null;

  lane_readiness: {
    base: LaneReadiness;
    operational: LaneReadiness;
  };

  structural_issues: StructuralIssue[];
  resolution_metadata: ResolutionMetadata;
};
```

La sintaxis anterior es documental.

No constituye todavía un tipo físico ni obliga a una tecnología de
implementación.

---

#### 6. Campos raíz

| Campo                     | Obligatorio | Regla                                                                      |
| ------------------------- | ----------: | -------------------------------------------------------------------------- |
| `contract_name`           |          Sí | Siempre `AccessContext`.                                                   |
| `contract_version`        |          Sí | Se congelará en AUTH-CTX-004.                                              |
| `context_id`              |          Sí | Identificador único de la resolución. No representa una sesión permanente. |
| `resolved_at`             |          Sí | Timestamp de servidor usado para evaluar vigencias.                        |
| `principal`               |          Sí | Principal autenticado o principal anónimo explícito.                       |
| `actor_effective`         |          Sí | Actor al que se atribuye la acción o estado no resuelto.                   |
| `domain_identity`         | Condicional | Identidad empresarial relevante para la aplicación o proceso.              |
| `employee`                | Condicional | Solo cuando la identidad laboral existe y es resoluble.                    |
| `base_role`               | Condicional | Rol base vigente del empleado.                                             |
| `assigned_sites`          |          Sí | Lista explícita; vacía cuando no existen asignaciones.                     |
| `assigned_areas`          |          Sí | Lista explícita; vacía cuando no existen asignaciones.                     |
| `administrative_coverage` |          Sí | Cobertura base resuelta, incluso cuando sea `NONE`.                        |
| `active_shift`            | Condicional | Turno publicado y vigente, o `null`.                                       |
| `active_checkin_session`  | Condicional | Check-in activo y compatible, o `null`.                                    |
| `operational_role`        | Condicional | Rol derivado del turno válido, nunca del rol base.                         |
| `operational_site`        | Condicional | Sede derivada del turno válido.                                            |
| `operational_area`        | Condicional | Área operativa válida cuando corresponda.                                  |
| `device_context`          | Condicional | Dispositivo compartido o contexto técnico involucrado.                     |
| `lane_readiness`          |          Sí | Disponibilidad estructural de cada carril; no es una decisión de permiso.  |
| `structural_issues`       |          Sí | Lista explícita, aunque esté vacía.                                        |
| `resolution_metadata`     |          Sí | Procedencia, versiones y evidencia técnica de resolución.                  |

---

#### 7. `principal`

El principal representa quién presentó la credencial técnica.

Tipos iniciales:

```text
HUMAN_USER
SHARED_DEVICE
SYSTEM_SERVICE
ANONYMOUS
```

Forma conceptual:

```ts
type PrincipalContext = {
  principal_type:
    | "HUMAN_USER"
    | "SHARED_DEVICE"
    | "SYSTEM_SERVICE"
    | "ANONYMOUS";

  auth_user_id: string | null;
  session_id: string | null;
  authenticated: boolean;
  authentication_method: string | null;
  authenticated_at: string | null;
  session_expires_at: string | null;
  principal_status: "VALID" | "INVALID" | "ANONYMOUS";
};
```

Reglas:

1. `auth_user_id` no equivale a empleado.
2. El principal no hereda permisos por existir.
3. Un dispositivo no se transforma en empleado.
4. Un servicio no se transforma en administrador.
5. Un principal anónimo queda representado explícitamente.
6. Una sesión expirada produce problema estructural.
7. Los claims del JWT se validan, pero no sustituyen relaciones
   empresariales vigentes.

---

#### 8. `actor_effective`

El actor efectivo representa a quién se atribuirá la acción.

Tipos iniciales:

```text
EMPLOYEE
CUSTOMER
SYSTEM
UNRESOLVED
```

Forma conceptual:

```ts
type EffectiveActorContext = {
  actor_type:
    | "EMPLOYEE"
    | "CUSTOMER"
    | "SYSTEM"
    | "UNRESOLVED";

  actor_id: string | null;
  attribution_source:
    | "PERSONAL_SESSION"
    | "DEVICE_ACTOR_SESSION"
    | "SYSTEM_PROCESS"
    | "DOMAIN_IDENTITY"
    | "NONE";

  delegation_id: string | null;
  resolved: boolean;
};
```

Reglas:

- una sesión humana personal atribuye al actor humano vinculado;
- un dispositivo compartido requiere una sesión de actor válida;
- un servicio actúa como sistema o mediante delegación explícita;
- no existe delegación implícita;
- el rol no es actor;
- la simulación no reemplaza al actor real;
- una mutación empresarial no podrá ejecutarse con actor `UNRESOLVED`.

---

#### 9. `domain_identity`

Una misma credencial puede vincularse con más de una identidad empresarial.

El contexto deberá declarar qué identidad se está usando para el dominio
solicitante.

Tipos iniciales:

```text
EMPLOYEE
CUSTOMER
DEVICE
SYSTEM
```

Forma conceptual:

```ts
type DomainIdentityContext = {
  identity_type: "EMPLOYEE" | "CUSTOMER" | "DEVICE" | "SYSTEM";
  identity_id: string;
  status: "ACTIVE" | "INACTIVE" | "INVALID";
  source: string;
};
```

Reglas:

1. identidad de cliente no concede acceso laboral;
2. identidad laboral no concede automáticamente capacidades de cliente;
3. identidad de dispositivo no concede capacidades empresariales humanas;
4. la aplicación debe declarar qué identidad acepta;
5. una identidad inactiva produce un problema estructural aplicable;
6. no se selecciona identidad únicamente por un claim de rol.

---

#### 10. `employee`

Forma conceptual:

```ts
type EmployeeContext = {
  employee_id: string;
  auth_user_id: string | null;
  is_active: boolean;
  employment_status: string;
  base_role_code: string | null;
};
```

Reglas:

```text
auth user válido
+
employee existente
+
employee activo
=
identidad laboral válida
```

Un empleado inactivo bloquea todas las capacidades laborales aunque
persistan:

- sedes;
- áreas;
- permisos;
- turnos;
- check-ins;
- sesiones de dispositivo;
- excepciones individuales.

El contexto no necesita exponer datos personales que no participen en la
autorización.

---

#### 11. Carril base

##### 11.1 `base_role`

Forma conceptual:

```ts
type BaseRoleContext = {
  role_code: string;
  role_status: "ACTIVE" | "INACTIVE" | "INVALID";
  assignment_source: string;
};
```

Reglas:

- exactamente un rol base vigente por empleado activo;
- no es identidad;
- no es rol operativo;
- no se obtiene del turno;
- no se obtiene del dispositivo;
- no se obtiene de `navigation_role`;
- no produce bypass por nombre;
- su ausencia no se reemplaza silenciosamente.

##### 11.2 `assigned_sites`

Cada asignación deberá representar una relación laboral real:

```ts
type AssignedSiteContext = {
  site_id: string;
  site_code: string;
  is_primary: boolean;
  assignment_active: boolean;
  site_active: boolean;
  assignable: boolean;
};
```

Reglas:

- una lista vacía no significa todas las sedes;
- varias sedes asignadas no significan alcance global;
- una sede primaria es referencia, no autorización;
- una sede seleccionada es preferencia, no autoridad;
- las asignaciones no conceden permisos.

##### 11.3 `assigned_areas`

Forma conceptual:

```ts
type AssignedAreaContext = {
  area_id: string;
  site_id: string;
  area_kind: string;
  is_primary_for_site: boolean;
  assignment_active: boolean;
  area_active: boolean;
};
```

Reglas:

- cada área pertenece a una sede exacta;
- área concreta y tipo de área son conceptos diferentes;
- una lista vacía no significa todas las áreas;
- una asignación de área no concede permisos;
- no se admite un área incompatible con la sede.

##### 11.4 `administrative_coverage`

Forma conceptual:

```ts
type AdministrativeCoverageContext = {
  mode:
    | "NONE"
    | "ASSIGNED_SITES"
    | "SPECIFIC_SITE"
    | "ASSIGNED_AREAS"
    | "SPECIFIC_AREA"
    | "ORGANIZATION";

  site_ids: string[];
  area_ids: string[];
  source: string;
  valid: boolean;
};
```

Reglas:

1. `ORGANIZATION` solo se produce mediante autoridad explícita;
2. `null` no significa organización;
3. el selector visual no amplía cobertura;
4. la cobertura administrativa no depende del turno;
5. la cobertura administrativa no desaparece con check-out;
6. el recurso deberá validarse posteriormente contra esta cobertura;
7. la cobertura no equivale a un allow de permiso.

---

#### 12. Carril operativo

##### 12.1 `active_shift`

Forma conceptual:

```ts
type ActiveShiftContext = {
  shift_id: string;
  employee_id: string;
  site_id: string;
  area_id: string | null;
  operational_role_code: string;
  starts_at: string;
  ends_at: string;
  shift_status: string;
  published: boolean;
  currently_valid: boolean;
};
```

Reglas:

- el turno debe estar publicado;
- debe pertenecer al actor efectivo;
- debe estar vigente en `resolved_at`;
- la sede debe ser válida;
- el rol operativo debe ser permitido en la sede;
- el área debe ser compatible cuando se declare;
- el último turno no sirve como fallback;
- el perfil operativo predeterminado no sirve como fallback;
- el rol base no sirve como fallback.

##### 12.2 `active_checkin_session`

Forma conceptual:

```ts
type ActiveCheckinContext = {
  checkin_session_id: string;
  employee_id: string;
  shift_id: string;
  site_id: string;
  area_id: string | null;
  checked_in_at: string;
  expires_at: string | null;
  checked_out_at: string | null;
  status: "ACTIVE" | "EXPIRED" | "CLOSED" | "INVALID";
};
```

Reglas:

- check-in es evidencia de presencia;
- no reemplaza el turno;
- no cambia la sede del turno;
- no concede permisos;
- no crea rol operativo;
- no concede autoridad administrativa;
- un check-in de otro actor es inválido;
- un check-in incompatible produce problema estructural;
- la ausencia de check-in solo afecta permisos que lo exigen.

##### 12.3 `operational_role`

Forma conceptual:

```ts
type OperationalRoleContext = {
  role_code: string;
  shift_id: string;
  site_id: string;
  area_id: string | null;
  valid_for_site: boolean;
  valid_for_area: boolean;
};
```

Fuente:

```text
turno válido
→ operational_role_code
→ rol operativo efectivo
```

No procede de:

- rol base;
- último turno;
- perfil predeterminado;
- `navigation_role`;
- selección del frontend;
- nombre del dispositivo.

##### 12.4 `operational_site`

Forma conceptual:

```ts
type OperationalSiteContext = {
  site_id: string;
  source_shift_id: string;
  site_active: boolean;
  assignment_valid: boolean;
};
```

Reglas:

- deriva del turno;
- check-in solo confirma;
- no es la sede seleccionada;
- no es la sede primaria;
- no implica autoridad sobre otros recursos de la sede;
- sin turno válido no existe sede operativa.

##### 12.5 `operational_area`

Forma conceptual:

```ts
type OperationalAreaContext = {
  area_id: string;
  site_id: string;
  area_kind: string;
  source: "SHIFT" | "CHECKIN_CONFIRMED_SHIFT";
  area_active: boolean;
  compatible_with_role: boolean;
};
```

Reglas:

- el área debe pertenecer a la sede operativa;
- el área no se obtiene únicamente del cliente;
- una selección visual no cambia el área efectiva;
- un área ambigua produce contexto operativo inválido;
- algunos permisos podrán no exigir área activa;
- esa condición pertenece al catálogo del permiso, no al contexto por sí
  solo.

---

#### 13. `device_context`

Forma conceptual:

```ts
type DeviceContext = {
  device_id: string;
  device_code: string;
  device_type: string;
  device_status: "ACTIVE" | "INACTIVE" | "INVALID";
  authenticated_as_device: boolean;
  actor_session_id: string | null;
  actor_session_expires_at: string | null;
  allowed_application_codes: string[];
  capability_package_code: string | null;
};
```

Reglas:

```text
autoridad del actor
∩
capacidades admitidas por dispositivo
=
capacidad evaluable
```

Nunca:

```text
autoridad del actor
∪
capacidades del dispositivo
```

El dispositivo:

- no tiene rol base;
- no tiene rol operativo propio;
- no tiene permisos empresariales propios;
- no sustituye al actor;
- no conserva autoridad después de cerrar la sesión del actor;
- no convierte `navigation_role` en permiso;
- puede impedir una operación;
- no puede ampliarla.

Sin sesión humana válida, un dispositivo compartido queda limitado a
operaciones técnicas expresamente autorizadas.

---

#### 14. `lane_readiness`

`lane_readiness` describe si existen hechos estructurales suficientes para
evaluar cada carril.

No describe si el permiso solicitado está concedido.

Valores:

```text
READY
UNAVAILABLE
INVALID
NOT_APPLICABLE
```

Forma conceptual:

```ts
type LaneReadiness = {
  status: "READY" | "UNAVAILABLE" | "INVALID" | "NOT_APPLICABLE";
  reason_codes: string[];
};
```

##### 14.1 Carril base

Puede estar `READY` cuando existen:

- actor laboral válido;
- empleado activo;
- rol base válido;
- configuración territorial suficiente para el tipo de evaluación.

No necesita:

- turno;
- check-in;
- rol operativo;
- sede operativa;
- área operativa.

##### 14.2 Carril operativo

Puede estar `READY` cuando existen, según corresponda:

- actor laboral válido;
- empleado activo;
- turno publicado y vigente;
- rol operativo válido;
- sede operativa válida;
- área operativa compatible;
- check-in válido cuando sea requerido por el contrato evaluado.

Como `AccessContext` todavía no recibe un permiso exacto, podrá distinguir:

```text
operational_core_ready
checkin_available
area_available
```

La decisión posterior determinará qué prerrequisitos exige el permiso.

---

#### 15. `structural_issues`

Una inconsistencia estructural se registra, no se oculta.

Forma conceptual:

```ts
type StructuralIssue = {
  issue_code: string;
  severity:
    | "BLOCKING_ALL"
    | "BLOCKING_BASE"
    | "BLOCKING_OPERATIONAL"
    | "WARNING"
    | "INFO";

  subject_type: string;
  subject_id: string | null;
  source: string;
  safe_message: string;
};
```

Categorías iniciales:

```text
AUTHENTICATION
PRINCIPAL
DOMAIN_IDENTITY
ACTOR_RESOLUTION
EMPLOYMENT
BASE_ROLE
SITE_ASSIGNMENT
AREA_ASSIGNMENT
ADMINISTRATIVE_COVERAGE
SHIFT
CHECKIN
OPERATIONAL_ROLE
OPERATIONAL_SITE
OPERATIONAL_AREA
DEVICE
CONFIGURATION
FRESHNESS
```

Ejemplos no congelados:

```text
unauthenticated
principal_inactive
employee_missing
employee_inactive
base_role_missing
site_configuration_ambiguous
area_configuration_ambiguous
active_shift_missing
active_shift_invalid
checkin_missing
checkin_expired
shift_checkin_mismatch
operational_role_invalid
operational_site_mismatch
operational_area_mismatch
device_inactive
device_actor_session_missing
context_stale
```

El catálogo definitivo de razones se detallará en AUTH-CTX-015.

---

#### 16. `resolution_metadata`

Forma conceptual:

```ts
type ResolutionMetadata = {
  resolver: string;
  resolver_version: string;
  authorization_contract_version: string;
  catalog_version: string;
  source_versions: Record<string, string>;
  source_fingerprints: Record<string, string>;
  cache_status: "MISS" | "HIT" | "BYPASS" | "NOT_IMPLEMENTED";
};
```

Reglas:

- no incluir secretos;
- no exponer internamente detalles sensibles al cliente;
- conservar evidencia suficiente para auditoría;
- permitir identificar con qué versiones se produjo el contexto;
- permitir invalidación posterior;
- no fijar aún TTL ni estrategia de caché.

La estrategia definitiva de caché corresponde a AUTH-CTX-029.

---

#### 17. Semántica de `null`, listas vacías y ausencia

Regla general:

```text
null
≠ global
```

##### `null`

Solo podrá significar:

- no aplicable;
- no resuelto;
- ausente;
- inválido.

La causa deberá ser deducible del estado o de `structural_issues`.

##### Lista vacía

```text
assigned_sites = []
→ ninguna sede asignada

assigned_areas = []
→ ninguna área asignada
```

Nunca significa todas.

##### Campo omitido

Los campos canónicos no deberán omitirse arbitrariamente.

Se utilizarán valores explícitos:

- `null`;
- lista vacía;
- estado;
- problema estructural.

Esto permite distinguir ausencia legítima de errores de serialización.

---

#### 18. Separación de conceptos territoriales

El contrato no utilizará propiedades ambiguas como:

```text
current_site
current_area
current_role
```

Deberá mantener separados:

```text
assigned_sites
administrative_coverage
operational_site
resource_site
```

Y:

```text
assigned_areas
administrative_coverage
operational_area
resource_area
```

`resource_site` y `resource_area` no pertenecen al `AccessContext` general.

Se resolverán en `AuthorizationDecision` para el recurso solicitado.

---

#### 19. Contexto administrativo solicitado

Una aplicación podrá solicitar trabajar visualmente sobre una sede o área
administrativa.

Ese dato:

- no se incorpora como hecho autoritativo sin validación;
- no cambia asignaciones;
- no cambia cobertura;
- no cambia el rol base;
- no cambia el recurso;
- no cambia la sede operativa;
- no cambia el área operativa.

La representación del selector administrativo podrá diseñarse en tareas
posteriores, pero la autorización siempre deberá usar cobertura y recurso
resueltos.

---

#### 20. Simulación

El `AccessContext` real no contiene:

- rol simulado;
- empleado simulado;
- sede simulada;
- área simulada;
- turno hipotético;
- resultado hipotético.

La simulación se diseñará como contrato separado en AUTH-CTX-003.

Regla:

```text
AccessContext real
≠ SimulationContext
```

Una simulación no modifica:

- actor real;
- JWT;
- RLS;
- contexto efectivo;
- auditoría de mutaciones.

---

#### 21. Relación con `AuthorizationDecision`

`AuthorizationDecision` recibirá o referenciará:

```text
AccessContext
+
app_code
+
permission_key
+
resource
+
catálogo
+
matrices
+
overrides
+
denegaciones
```

Y producirá:

```text
base_decision
operational_decision
matched_allows
matched_denies
blocked_reasons
final_decision
```

`AccessContext` no deberá almacenar:

- lista completa de permisos efectivos;
- decisión final;
- matched grants;
- matched denies;
- recursos consultados;
- resultados de una acción anterior.

Esto evita reutilizar una decisión sobre un recurso diferente.

---

#### 22. Casos canónicos

##### 22.1 Sesión personal administrativa sin turno

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee = ACTIVE
base_role = válido
active_shift = null
active_checkin_session = null
base readiness = READY
operational readiness = UNAVAILABLE
```

Resultado:

- el contexto es válido para evaluar carril base;
- la ausencia de turno no es un error global;
- no existe carril operativo disponible.

##### 22.2 Sesión personal con turno y check-in

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
base readiness = READY
active_shift = válido
active_checkin_session = válido
operational_role = válido
operational_site = válida
operational_area = válida o no aplicable
operational readiness = READY
```

Ambos carriles pueden evaluarse de forma independiente.

##### 22.3 Dispositivo compartido con actor

```text
principal = SHARED_DEVICE
device_context = ACTIVE
actor_session = ACTIVE
actor_effective = EMPLOYEE
employee = ACTIVE
shift = válido
```

Toda acción registra:

- principal dispositivo;
- actor empleado;
- sesión del actor;
- contexto operativo.

##### 22.4 Dispositivo compartido sin actor

```text
principal = SHARED_DEVICE
device_context = ACTIVE
actor_effective = UNRESOLVED
operational readiness = UNAVAILABLE
```

Solo se permiten operaciones técnicas explícitas.

##### 22.5 Empleado inactivo

```text
principal = HUMAN_USER
employee = INACTIVE
base readiness = INVALID
operational readiness = INVALID
structural issue = employee_inactive
```

Las asignaciones históricas no reactivan al empleado.

##### 22.6 Cliente sin identidad laboral

```text
domain_identity = CUSTOMER
employee = null
base readiness = NOT_APPLICABLE
operational readiness = NOT_APPLICABLE
```

Puede evaluarse en el dominio de cliente, pero no en aplicaciones laborales.

##### 22.7 Servicio del sistema

```text
principal = SYSTEM_SERVICE
actor_effective = SYSTEM
employee = null
```

Debe existir un proceso autorizado.

No se obtiene autoridad administrativa por usar `service_role`.

---

#### 23. Invariantes

1. Un principal autenticado no equivale a actor efectivo.
2. Un actor efectivo no equivale a rol.
3. Un empleado inactivo bloquea toda autoridad laboral.
4. Un dispositivo no es empleado.
5. Un servicio no es administrador.
6. El rol base no se deriva del turno.
7. El rol operativo no se deriva del rol base.
8. La sede seleccionada no concede autoridad.
9. La sede primaria no concede autoridad.
10. La sede asignada no concede permisos.
11. Varias sedes asignadas no equivalen a organización.
12. El check-in no reemplaza el turno.
13. El check-in no concede permisos.
14. El turno no concede permisos por sí solo.
15. La sede operativa deriva del turno.
16. El área operativa debe pertenecer a la sede operativa.
17. `null` no significa global.
18. Una lista vacía significa ninguna asignación.
19. La ausencia de turno no invalida el carril base.
20. El check-out no revoca autoridad base.
21. Los problemas estructurales no se corrigen mediante fallback visual.
22. El contexto no contiene la decisión final.
23. El contexto no contiene simulación.
24. El contexto no acepta hechos autoritativos del cliente.
25. El contexto debe poder ser auditado y versionado.

---

#### 24. Antipatrones prohibidos

```ts
const role = request.body.role;
const site = request.body.siteId;
const area = localStorage.getItem("activeArea");
const actor = auth.uid();
const canOperate = Boolean(checkin);
const canAdmin = employee.role === "propietario";
```

También queda prohibido:

```text
navigation_role → rol efectivo
employees.site_id → sede autorizada universal
selected_site_id → sede del recurso
último turno → turno activo
default_operational_role → rol operativo activo
dispositivo activo → actor humano
check-in activo → permiso
service_role → bypass empresarial
```

---

#### 25. Límites de tamaño y exposición

El contrato debe ser suficiente para decidir, pero no convertirse en un
volcado de la base.

No incluirá por defecto:

- datos personales no necesarios;
- documentos de identidad;
- teléfonos;
- direcciones;
- salarios;
- listas completas de permisos;
- historial de turnos;
- historial de check-ins;
- historial de asignaciones;
- sesiones ajenas;
- secretos del dispositivo;
- detalles internos de seguridad.

Las aplicaciones recibirán una proyección segura del contexto.

La versión completa para servidor y la proyección pública podrán ser
contratos relacionados, pero no se diseñan físicamente en esta tarea.

---

#### 26. Estrategia de resolución conceptual

```text
1. Validar sesión técnica.
2. Clasificar principal.
3. Resolver identidad de dominio.
4. Resolver actor efectivo.
5. Resolver empleado cuando corresponda.
6. Validar estado laboral.
7. Resolver rol base.
8. Resolver sedes asignadas.
9. Resolver áreas asignadas.
10. Resolver cobertura administrativa.
11. Resolver turno vigente.
12. Resolver check-in.
13. Resolver rol operativo.
14. Resolver sede operativa.
15. Resolver área operativa.
16. Resolver dispositivo.
17. Detectar contradicciones.
18. Calcular readiness por carril.
19. Registrar metadatos.
20. Emitir snapshot inmutable.
```

Este orden es conceptual.

El contrato SQL se definirá en AUTH-CTX-025.

---

#### 27. Vigencia y obsolescencia

Un contexto queda potencialmente obsoleto cuando cambia:

- sesión autenticada;
- actor de dispositivo;
- estado del empleado;
- rol base;
- asignación de sede;
- asignación de área;
- turno;
- check-in;
- rol operativo;
- sede o área operativas;
- estado del dispositivo;
- catálogo;
- matrices;
- override;
- denegación.

Esta tarea no define aún:

- TTL;
- claves de caché;
- canales de invalidación;
- estrategia Realtime;
- eventos;
- consistencia eventual.

Esos elementos corresponden a AUTH-CTX-029.

---

#### 28. Errores estructurales y decisión posterior

Un problema estructural podrá:

```text
bloquear todo
bloquear solo carril base
bloquear solo carril operativo
advertir sin bloquear
```

Ejemplos:

```text
employee_inactive
→ BLOCKING_ALL para aplicaciones laborales

base_role_missing
→ BLOCKING_BASE

active_shift_missing
→ no bloquea base
→ operational UNAVAILABLE

shift_checkin_mismatch
→ BLOCKING_OPERATIONAL

selected_site_invalid
→ WARNING
→ no cambia autorización
```

La severidad definitiva de cada código se consolidará en AUTH-CTX-015.

---

#### 29. Pruebas contractuales mínimas futuras

El contrato deberá permitir probar:

1. usuario humano con empleado activo;
2. usuario humano sin empleado;
3. empleado inactivo;
4. cliente también empleado;
5. dispositivo activo con actor;
6. dispositivo activo sin actor;
7. dispositivo inactivo;
8. servicio autorizado;
9. servicio sin proceso permitido;
10. empleado base sin turno;
11. empleado con turno sin check-in;
12. empleado con turno y check-in;
13. check-in de otro actor;
14. check-in de otra sede;
15. área fuera de la sede;
16. rol operativo no permitido en la sede;
17. múltiples sedes asignadas;
18. sede primaria ambigua;
19. ausencia de asignaciones;
20. cambio de contexto que invalida snapshot anterior.

El plan completo de pruebas se definirá en AUTH-CTX-030.

---

#### 30. Relación con tareas posteriores

##### AUTH-CTX-002

Diseñará `AuthorizationDecision`.

No modificará la responsabilidad del `AccessContext`.

##### AUTH-CTX-003

Diseñará `SimulationContext` separado.

##### AUTH-CTX-004

Congelará:

- versión;
- compatibilidad;
- política de evolución;
- serialización.

##### AUTH-CTX-005 a AUTH-CTX-015

Desarrollarán en detalle cada nodo aprobado:

```text
principal
actor_effective
domain_identity
employee
base_role
assigned_sites
assigned_areas
active_shift
active_checkin_session
operational_role
operational_site
operational_area
device_context
structural_issues
```

Estas tareas podrán precisar campos y catálogos, pero no deberán romper las
invariantes aprobadas en AUTH-CTX-001.

##### AUTH-CTX-025

Diseñará el contrato SQL futuro de `get_access_context`.

##### AUTH-CTX-028

Definirá compatibilidad temporal con `get_operational_context`.

##### AUTH-CTX-029

Definirá caché e invalidación.

##### BLOQUE E3

Aprobará fuentes físicas, esquemas, tablas y relaciones objetivo.

##### BLOQUE R

Implementará físicamente el contrato mediante migraciones versionadas.

---

#### 31. Fuera del alcance

AUTH-CTX-001 no:

- define `AuthorizationDecision`;
- define simulación;
- congela versión final;
- crea TypeScript;
- crea Zod;
- crea JSON Schema;
- crea funciones SQL;
- crea RPC;
- modifica `get_operational_context`;
- crea tablas;
- modifica Supabase;
- modifica RLS;
- modifica grants;
- crea caché;
- implementa invalidación;
- adapta aplicaciones;
- crea UI;
- migra consumidores;
- publica paquetes.

---

#### 32. Riesgos controlados

##### Riesgo 1 — Contexto único ambiguo

Control:

```text
base_role
≠ operational_role

administrative_coverage
≠ operational_site
```

##### Riesgo 2 — Check-in como autorización

Control:

```text
check-in
→ evidencia contextual
→ no grant
```

##### Riesgo 3 — Dispositivo como empleado

Control:

```text
principal dispositivo
+
actor humano separado
```

##### Riesgo 4 — Selección visual como autoridad

Control:

```text
requested/selected
→ validar
→ nunca ampliar
```

##### Riesgo 5 — Falta de turno bloquea administración

Control:

```text
base readiness
≠ operational readiness
```

##### Riesgo 6 — Contexto reutilizado sobre recursos diferentes

Control:

```text
AccessContext
→ hechos del actor

AuthorizationDecision
→ permiso y recurso exactos
```

##### Riesgo 7 — `null` como alcance global

Control:

```text
null
≠ organization
```

##### Riesgo 8 — Simulación mezclada con autorización real

Control:

```text
SimulationContext separado
```

##### Riesgo 9 — Exceso de información

Control:

- minimización;
- proyecciones seguras;
- sin historiales;
- sin listas completas de permisos.

---

#### 33. Criterios de aprobación

AUTH-CTX-001 podrá aprobarse cuando se acepte que:

1. `AccessContext` es un snapshot inmutable resuelto en servidor;
2. separa principal y actor efectivo;
3. separa identidad de dominio e identidad laboral;
4. separa rol base y rol operativo;
5. separa cobertura administrativa y contexto operativo;
6. incluye turno y check-in como hechos distintos;
7. la sede operativa deriva del turno;
8. el check-in no reemplaza el turno;
9. el check-in no concede permisos;
10. el dispositivo no concede autoridad;
11. la ausencia de turno no invalida el carril base;
12. `null` no significa global;
13. listas vacías significan ausencia de asignaciones;
14. el contrato no contiene decisiones de permiso;
15. el contrato no contiene recursos solicitados;
16. el contrato no contiene simulación;
17. los problemas estructurales quedan explícitos;
18. la disponibilidad de carriles no equivale a allow;
19. el cliente no suministra hechos autoritativos;
20. la versión se reserva para AUTH-CTX-004;
21. los detalles de nodos se desarrollarán en AUTH-CTX-005 a AUTH-CTX-015;
22. el contrato SQL se reserva para AUTH-CTX-025;
23. la compatibilidad legacy se reserva para AUTH-CTX-028;
24. caché e invalidación se reservan para AUTH-CTX-029;
25. la implementación física se reserva para BLOQUE R.

---

#### 34. Estado final de la propuesta

| Tarea         | Estado      |
| ------------- | ----------- |
| AUTH-RBAC-028 | APROBADA    |
| AUTH-CTX-001  | APROBADA    |
| AUTH-CTX-002  | NO INICIADA |

No se avanza a AUTH-CTX-002 hasta recibir aprobación explícita de
AUTH-CTX-001.

### ✅ AUTH-CTX-002 — Diseñar AuthorizationDecision canónica

**Estado:** APROBADA
**Bloque:** BLOQUE E — Contexto y decisión de autorización unificados  
**Naturaleza:** Diseño documental de contrato canónico  
**Implementación física:** No incluida  
**Tarea anterior vigente:** AUTH-CTX-001 — APROBADA  
**Tarea posterior reservada:** AUTH-CTX-003 — Diseñar SimulationContext separado  
**Contrato diseñado:** `AuthorizationDecision`  
**Contrato de entrada:** `AccessContext` aprobado en AUTH-CTX-001  
**Versión contractual:** Pendiente de AUTH-CTX-004  
**Catálogo de autorización:** `vento.authorization@1.0.0`  
**Datasets contractuales:** base, operativo y overrides `1.0.0`

Esta tarea diseña la forma, responsabilidad, secuencia, precedencia,
composición por carriles, evidencia y límites de la decisión canónica de
autorización de Vento OS.

No implementa tipos TypeScript, funciones SQL, RPC, RLS, migraciones,
triggers, caché, UI, guards, consumidores ni cambios físicos en Supabase.

---

#### 1. Objetivo

Definir un contrato único que permita responder, de manera determinista,
cerrada, explicable y auditable:

```text
¿EL ACTOR EFECTIVO
PUEDE EJECUTAR
EL PERMISO EXACTO
DE LA APLICACIÓN EXACTA
SOBRE EL RECURSO EXACTO
EN ESTE CONTEXTO
EN ESTE MOMENTO?
```

La respuesta real tendrá únicamente dos resultados finales:

```text
ALLOW
DENY
```

No existirán resultados reales ambiguos como:

```text
MAYBE
PROBABLY
UNKNOWN_ALLOW
ALLOW_WITHOUT_RESOURCE
ALLOW_BY_FRONTEND
```

Cuando la información obligatoria sea insuficiente, contradictoria,
obsoleta o no resoluble, la decisión real será `DENY`.

La simulación podrá diferenciar `indeterminate`, pero se diseñará como
contrato separado en AUTH-CTX-003.

---

#### 2. Decisión principal

`AuthorizationDecision` será un snapshot inmutable, producido en servidor
para una solicitud concreta.

Regla:

```text
AuthorizationDecision
=
AccessContext exacto
+
aplicación exacta
+
permiso exacto
+
contrato versionado del permiso
+
recurso o borrador exacto
+
territorio resuelto
+
estado y restricciones del recurso
+
grants y denials aplicables
+
precedencia canónica
+
composición por modalidad
```

No será:

- una lista general de permisos;
- un perfil de navegación;
- un resultado reutilizable para cualquier recurso;
- una sesión de autorización;
- un token de capacidad;
- una prueba suficiente para ejecutar una mutación futura sin revalidar;
- una interpretación local de cada aplicación.

---

#### 3. Responsabilidad del contrato

`AuthorizationDecision` responde:

1. qué aplicación fue solicitada;
2. qué permiso canónico fue solicitado;
3. qué versión contractual se utilizó;
4. qué modalidad de autorización aplica;
5. qué recurso se resolvió;
6. qué territorio y lados del recurso se resolvieron;
7. qué carriles debían evaluarse;
8. qué resultado produjo el carril base;
9. qué resultado produjo el carril operativo;
10. qué allows coincidieron;
11. qué denegaciones coincidieron;
12. qué prerrequisitos y restricciones se cumplieron o fallaron;
13. qué regla de combinación produjo el resultado;
14. por qué se autorizó o denegó;
15. qué evidencia debe conservarse para auditoría.

No responde por sí solo:

- cómo se autentica el usuario;
- cómo se resuelve físicamente `AccessContext`;
- cómo se persisten grants o denegaciones;
- cómo se ejecuta la mutación;
- cómo se presenta la explicación al usuario;
- cómo se simula otro actor;
- cuánto tiempo se almacena en caché.

---

#### 4. Principios obligatorios

##### 4.1 Decisión por capacidad exacta

```text
permission_key exacto
→ una decisión exacta
```

No se autoriza mediante:

- prefijos;
- wildcards;
- nombres parciales;
- nombres de módulos;
- nombres de rutas;
- botones visibles;
- nombres de roles;
- semejanza semántica;
- jerarquías no declaradas.

##### 4.2 Decisión por recurso exacto

```text
NO SE AUTORIZA CONTRA site_id O area_id AISLADOS
```

Se autoriza contra:

```text
recurso resuelto
→ relaciones canónicas
→ territorio real
→ estado real
→ lados requeridos
```

El contexto del actor limita el recurso.

Nunca crea ni reemplaza el territorio del recurso.

##### 4.3 Resolución exclusiva en servidor

El cliente podrá aportar únicamente localizadores o borradores admitidos
por el contrato.

No podrá afirmar autoritativamente:

- sede;
- área;
- propietario;
- custodio;
- estado;
- rol;
- alcance;
- actor;
- ruta;
- origen;
- destino;
- campos sensibles;
- lados autorizados.

##### 4.4 Fail closed

Cualquier ausencia, contradicción, versión incompatible, error de
resolución o estado inválido produce `DENY`.

##### 4.5 Explicabilidad sin filtrar secretos

La decisión debe ser explicable y auditable.

La proyección enviada al cliente no debe revelar:

- grants ajenos;
- denegaciones disciplinarias sensibles;
- reglas internas de seguridad;
- identificadores internos innecesarios;
- estructura completa de matrices;
- datos protegidos del recurso.

##### 4.6 Inmutabilidad

Una decisión emitida no se modifica.

Una nueva realidad produce una nueva decisión.

---

#### 5. Forma canónica de alto nivel

```ts
type AuthorizationDecision = {
  contract_name: "AuthorizationDecision";
  contract_version: string;

  decision_id: string;
  decided_at: string;
  correlation_id: string | null;

  access_context_ref: AccessContextReference;
  request: AuthorizationRequestContext;
  permission_contract: PermissionContractSnapshot;
  resource: ResolvedResourceContext;

  required_lanes: AuthorizationLane[];
  base_decision: LaneDecision;
  operational_decision: LaneDecision;

  prerequisite_decisions: PrerequisiteDecision[];
  device_decision: ConstraintDecision;
  sensitivity_decision: ConstraintDecision;
  field_policy_decision: FieldPolicyDecision;

  matched_allows: MatchedGrant[];
  matched_denies: MatchedDeny[];

  structural_denies: DecisionReason[];
  actor_wide_denies: DecisionReason[];
  lane_denies: DecisionReason[];
  blocked_reasons: DecisionReason[];

  combination: DecisionCombination;
  final_decision: FinalDecision;
  audit: AuthorizationAuditContext;
};
```

La sintaxis es documental.

No constituye todavía un tipo físico ni obliga a una tecnología concreta.

---

#### 6. Identidad y vigencia de la decisión

| Campo                | Obligatorio | Regla                                                           |
| -------------------- | ----------: | --------------------------------------------------------------- |
| `contract_name`      |          Sí | Siempre `AuthorizationDecision`.                                |
| `contract_version`   |          Sí | Se congelará en AUTH-CTX-004.                                   |
| `decision_id`        |          Sí | Identificador único de la evaluación. No es un token de acceso. |
| `decided_at`         |          Sí | Timestamp de servidor utilizado en la evaluación.               |
| `correlation_id`     | Condicional | Vincula decisión, solicitud, ejecución y auditoría.             |
| `access_context_ref` |          Sí | Referencia exacta al contexto evaluado.                         |

Reglas:

1. `decision_id` no puede reutilizarse como bearer token.
2. Una decisión no concede autoridad fuera de su solicitud.
3. Una decisión no es válida para otro permiso.
4. Una decisión no es válida para otro recurso.
5. Una decisión no es válida para otro actor.
6. Una decisión no es válida para otra versión contractual.
7. Una mutación tardía deberá revalidarse cuando el recurso o el contexto
   puedan haber cambiado.
8. El periodo de caché y expiración se definirá en AUTH-CTX-029.

---

#### 7. Referencia a `AccessContext`

Forma conceptual:

```ts
type AccessContextReference = {
  context_id: string;
  context_contract_version: string;
  resolved_at: string;
  actor_type: string;
  actor_id: string | null;
  principal_type: string;
  principal_id: string | null;
  context_fingerprint: string;
};
```

La decisión podrá conservar una referencia y una proyección mínima del
contexto, pero no deberá duplicar indiscriminadamente todos sus datos.

La huella deberá permitir demostrar que la evaluación utilizó un snapshot
concreto.

Regla:

```text
MISMO decision_id
→ MISMO AccessContext
```

---

#### 8. Solicitud de autorización

Forma conceptual:

```ts
type AuthorizationRequestContext = {
  app_code: string;
  permission_key: string;

  operation_kind:
    | "READ"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "EXECUTE"
    | "TRANSITION"
    | "EXPORT"
    | "APP_ACCESS";

  resource_request:
    | ExistingResourceRequest
    | ResourceDraftRequest
    | CollectionRequest
    | AggregateRequest
    | BulkRequest
    | NonResourceRequest;

  requested_fields: string[];
  request_source: "SERVER_ACTION" | "RPC" | "RLS" | "API" | "UI_GUARD" | "JOB";
};
```

##### 8.1. Formas físicas de `resource_request` — AUTH-CTX-026

**Candidato de formalización física sujeto a revisión en PR DRAFT; no es una
publicación ni modifica el contrato versionado actualmente distribuido.** Esta
propuesta precisa las seis formas citadas en `AuthorizationRequestContext`,
usando las identidades físicas `mode` existentes en las pruebas SQL de
`AUTH-DB-034`. Su semántica deriva de `AUTH-CTX-018`, secciones 6–22:
el cliente solo aporta referencias, filtros, borradores o condiciones no
autoritativas; el servidor elige el contrato `resource_contract_id`, resolver
privado, fuente de verdad, versión y alcance efectivo.

```ts
type ResourceRequestJsonValue =
  | null | string | number | boolean
  | ResourceRequestJsonValue[]
  | { [key: string]: ResourceRequestJsonValue };
type ResourceRequestJsonObject = Record<string, ResourceRequestJsonValue>;

// La forma física de un localizador concreto depende del contrato del recurso.
type ResourceRequestLocator = ResourceRequestJsonObject;

type ExistingResourceRequest = {
  mode: "EXISTING_RESOURCE";
  locator: ResourceRequestLocator;
  expected_version?: string;
};
type ResourceDraftRequest = {
  mode: "RESOURCE_DRAFT";
  draft: ResourceRequestJsonObject;
  idempotency_key?: string;
};
type CollectionRequest = {
  mode: "COLLECTION";
  server_filter: ResourceRequestJsonObject;
};
type AggregateRequest = {
  mode: "AGGREGATE";
  server_filter: ResourceRequestJsonObject;
};
type BulkRequest = {
  mode: "BULK";
  items: ResourceRequestLocator[];
  idempotency_key?: string;
};
type NonResourceRequest = {
  mode: "NON_RESOURCE";
};

type ResourceRequestV1 =
  | ExistingResourceRequest
  | ResourceDraftRequest
  | CollectionRequest
  | AggregateRequest
  | BulkRequest
  | NonResourceRequest;
```

| `mode` físico de entrada | `request_shape` de salida | Dato mínimo aportado | Resolución exclusiva |
| --- | --- | --- | --- |
| `EXISTING_RESOURCE` | `EXISTING` | `locator` no vacío | Existencia, relaciones, territorio, estado y snapshot desde fuente de verdad |
| `RESOURCE_DRAFT` | `DRAFT` | `draft` JSON (puede estar vacío si el contrato admite defaults) | Normalización, padres, territorio y estado inicial antes de crear |
| `COLLECTION` | `COLLECTION` | `server_filter` JSON | Conjunto acotado por predicado **construido en servidor**; `{}` nunca implica todos |
| `AGGREGATE` | `AGGREGATE` | `server_filter` JSON | Todos los contribuyentes y dimensiones filtradas por alcance, sin inferencias |
| `BULK` | `BULK` | `items` no vacío de localizadores | Cada miembro exacto; permiso masivo o evaluación individual y política del contrato |
| `NON_RESOURCE` | `NON_RESOURCE` | Solo `mode` | Exclusivamente cuando el contrato permite ausencia de recurso; no es fallback |

Las claves de la raíz son **cerradas** por variante. Los únicos campos
adicionales de este candidato son `expected_version` para
`EXISTING_RESOURCE` e `idempotency_key` para `RESOURCE_DRAFT` y
`BULK`: cuando aparezcan, deben ser strings no vacíos. No conceden
autoridad; el servidor contrasta la versión e idempotencia. La selección de
`ALL_OR_NOTHING` o `PARTIAL_WITH_RESULTS` **no** procede del caller ni
se añade como `atomicity` al request: debe declararse y comprobarse en el
contrato de recurso del backend, sin valor implícito.

Todo valor de entrada deberá ser JSON finito, sin getters, prototipos especiales,
símbolos, ciclos, funciones ni arreglos irregulares. `locator` y cada miembro de
`items` deben ser objetos JSON no vacíos; `items` requiere al menos un miembro.
Los nombres y tipos de los localizadores, las expresiones permitidas por
`server_filter`, los campos mutables del `draft` y la deduplicación semántica
de miembros son **propiedad del resolver privado asociado a
`resource_contract_id`**. Un `id`, `site_id`, `owner_id`, `employee_id`
o `role` dentro de datos de dominio **no se convierte en hecho
autoritativo**: debe resolverse independientemente. `resource_type`, contrato
de recurso, grants, actor, territorio efectivo, autorización y resultado no
se eligen en el request.

`mode` es el discriminador de entrada ya usado por
`AUTH-DB-034`; `kind` no es alias. `request_shape` pertenece solo al
resultado `ResolvedResourceContext` y debe coincidir con el mapeo indicado.
Una forma ausente, extraña, incompleta o no admitida por el contrato se deniega
como `RESOURCE_REQUEST_SHAPE_INVALID`, nunca se degrada a
`NON_RESOURCE`. El inspector estructural puede rechazar la forma, pero **no
verifica** permiso masivo, alcance, existencia, aislamiento, concurrencia,
proveniencia, snapshot ni autenticidad del evaluador backend.

Este detalle **no añade requisitos ni modifica filas de 04A**: desarrolla la
unión de seis tipos ya aprobada, con `AUTH-CTX-026` como dueño del contrato,
`AUTH-CTX-018` como semántica de recursos y `AUTH-CTX-030` como dueño
de la certificación adversarial. La aprobación y publicación de una identidad
contractual física requieren su revisión, pruebas y gates propios.

Reglas:

- `app_code` debe coincidir con la aplicación propietaria del permiso;
- `permission_key` debe existir exactamente en la versión activa;
- `operation_kind` no amplía la acción declarada por el permiso;
- `requested_fields` solo reduce o precisa la evaluación;
- `request_source` no cambia las reglas;
- una UI guard no sustituye protección de servidor;
- un permiso `<app>.access` no autoriza capacidades internas;
- una operación masiva requiere contrato masivo explícito o decisiones por
  miembro.

---

#### 9. Snapshot del contrato del permiso

Forma conceptual:

```ts
type PermissionContractSnapshot = {
  catalog_id: string;
  catalog_version: string;
  catalog_hash: string;

  app_code: string;
  permission_key: string;
  permission_status: "ACTIVE" | "INACTIVE" | "MISSING";

  authorization_requirement:
    | "BASE_ONLY"
    | "OPERATIONAL_ONLY"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  base_prerequisite: "N" | "NOT_APPLICABLE";
  operational_prerequisite: "T" | "T+C" | "NOT_APPLICABLE";

  requires_active_area: boolean;
  device_policy_code: string | null;
  sensitivity_class: string;
  simulation_policy: string;

  resource_contract_id: string;
  dependency_permission_keys: string[];
};
```

Reglas:

1. la modalidad se obtiene del catálogo, no de la matriz;
2. la tabla donde aparezca una asignación no redefine la modalidad;
3. un permiso sin modalidad produce denegación estructural;
4. un permiso inactivo produce denegación estructural;
5. la aplicación no puede reinterpretar el contrato;
6. la nueva versión del catálogo no modifica decisiones históricas;
7. un permiso nuevo no se concede automáticamente;
8. las dependencias deben ser explícitas, nunca inferidas por prefijo.

---

#### 10. Recurso resuelto

Forma conceptual:

```ts
type ResolvedResourceContext = {
  resource_type: string;
  request_shape:
    | "EXISTING"
    | "DRAFT"
    | "COLLECTION"
    | "AGGREGATE"
    | "BULK"
    | "NON_RESOURCE";

  resolution_status:
    | "RESOLVED"
    | "MULTI_RESOLVED"
    | "NOT_APPLICABLE"
    | "UNRESOLVED"
    | "CONFLICT"
    | "ISOLATED";

  resource_ids: string[];
  resource_version: string | null;

  subject: ResolvedSubjectContext | null;
  territory: ResolvedTerritoryContext;
  ownership: OwnershipContext;
  required_sides: ResolvedSideContext[];

  state_snapshot: Record<string, unknown>;
  field_classification: Record<string, string>;
  concurrency: ConcurrencyContext | null;
};
```

Reglas:

```text
RESOLVED
MULTI_RESOLVED
NOT_APPLICABLE
→ evaluación puede continuar
```

```text
UNRESOLVED
CONFLICT
ISOLATED
→ DENY
```

`NOT_APPLICABLE` solo se utiliza cuando el contrato declara legítimamente
un recurso no territorial u organizacional.

Nunca significa que la resolución fue omitida.

---

#### 11. Territorio resuelto

Forma conceptual:

```ts
type ResolvedTerritoryContext = {
  organization_id: string | null;
  business_unit_ids: string[];
  site_ids: string[];
  area_ids: string[];
  area_kinds: string[];
  origin: TerritorySide | null;
  destination: TerritorySide | null;
  route_ids: string[];
  vehicle_ids: string[];
  isolated_environment: boolean;
  source: string;
  coherent: boolean;
};
```

Reglas:

- `null` no significa organización completa;
- una lista vacía no significa todos;
- el área debe pertenecer a la sede correspondiente;
- el origen y destino se evalúan cuando el contrato lo exige;
- el permiso global sigue limitado al recurso exacto;
- global no atraviesa entornos aislados;
- un filtro del cliente puede reducir, nunca ampliar;
- la sede seleccionada no reemplaza el territorio;
- la sede primaria no reemplaza el territorio;
- el territorio del dispositivo solo restringe.

---

#### 12. Recursos de creación

Una creación se evalúa contra un `ResourceDraft` normalizado antes de
persistir.

Debe resolver:

- tipo de recurso;
- padres y relaciones;
- sede;
- área;
- origen;
- destino;
- sujeto objetivo;
- campos protegidos;
- estado inicial;
- idempotencia;
- lados requeridos.

Regla:

```text
payload del cliente
→ borrador no confiable
→ normalización
→ resolución de relaciones
→ decisión
→ escritura
```

No se permite:

```text
payload.site_id
→ territorio autorizado por declaración
```

---

#### 13. Colecciones, agregados y operaciones masivas

##### 13.1 Colecciones

La decisión debe construir en servidor el conjunto autorizado.

No se recuperará un conjunto amplio para filtrarlo únicamente en el
frontend.

##### 13.2 Agregados

Cada miembro territorial que alimente el resultado debe estar autorizado.

Un agregado no puede revelar información excluida mediante:

- totales;
- conteos;
- diferencias;
- mensajes de error;
- agrupaciones;
- metadatos.

##### 13.3 Operaciones masivas

Regla:

```text
permiso ordinario sobre un recurso
≠ permiso masivo
```

Una operación masiva deberá:

- usar un permiso masivo canónico explícito; o
- descomponerse en decisiones por recurso.

La política de atomicidad debe declararse:

```text
ALL_OR_NOTHING
PARTIAL_WITH_RESULTS
```

Nunca se elige silenciosamente.

---

#### 14. Carriles requeridos

Tipo conceptual:

```ts
type AuthorizationLane = "BASE" | "OPERATIONAL";
```

La modalidad determina:

| Modalidad              | Carriles requeridos                     |
| ---------------------- | --------------------------------------- |
| `BASE_ONLY`            | `BASE`                                  |
| `OPERATIONAL_ONLY`     | `OPERATIONAL`                           |
| `BASE_OR_OPERATIONAL`  | `BASE`, `OPERATIONAL` como alternativas |
| `BASE_AND_OPERATIONAL` | `BASE`, `OPERATIONAL` obligatorios      |

`required_lanes` no significa que todos deban autorizar.

La regla de combinación queda expresada por `combination`.

---

#### 15. Resultado de un carril

Forma conceptual:

```ts
type LaneDecision = {
  lane: "BASE" | "OPERATIONAL";

  outcome:
    | "ALLOW"
    | "DENY"
    | "NOT_APPLICABLE";

  readiness:
    | "READY"
    | "UNAVAILABLE"
    | "INVALID"
    | "NOT_APPLICABLE";

  evaluated: boolean;
  matched_allow_ids: string[];
  matched_deny_ids: string[];
  reason_codes: string[];
};
```

Reglas:

1. `NOT_APPLICABLE` solo se utiliza cuando la modalidad no admite el carril.
2. Un carril admitido sin allow produce `DENY`.
3. Un carril con deny aplicable produce `DENY`.
4. Un carril operativo sin contexto obligatorio produce `DENY`.
5. Un carril base no se deniega por ausencia de turno.
6. El outcome final no se infiere solo desde un carril.
7. El carril conserva sus propias restricciones y evidencia.

---

#### 16. Evaluación del carril base

Orden obligatorio:

```text
1. Confirmar que la modalidad admite BASE.
2. Validar hechos estructurales aplicables al carril base.
3. Validar actor laboral y empleado activo.
4. Validar rol base y cobertura cuando correspondan.
5. Evaluar bloqueo individual transversal.
6. Buscar denegaciones base aplicables.
7. Buscar allows base aplicables.
8. Comparar alcance con recurso y territorio.
9. Aplicar dependencias, sensibilidad y restricciones.
10. ALLOW o DENY por defecto.
```

Fuentes posibles:

```text
BASE ROLE GRANT
INDIVIDUAL BASE GRANT
BASE ROLE DENY
INDIVIDUAL BASE DENY
ACTOR-WIDE DENY
```

El carril base no toma prestado:

- turno;
- check-in;
- rol operativo;
- sede operativa;
- área operativa;
- alcance operativo.

---

#### 17. Evaluación del carril operativo

Orden obligatorio:

```text
1. Confirmar que la modalidad admite OPERATIONAL.
2. Validar hechos estructurales aplicables.
3. Validar actor laboral y empleado activo.
4. Validar turno publicado y vigente.
5. Validar check-in cuando el permiso exige T+C.
6. Validar conflictos de check-in aunque el permiso sea T.
7. Validar rol operativo.
8. Validar sede y área operativas.
9. Validar dispositivo cuando aplique.
10. Evaluar bloqueo individual transversal.
11. Buscar denegaciones operativas aplicables.
12. Buscar allows operativos aplicables.
13. Comparar contexto con recurso, territorio y lados.
14. Aplicar dependencias, sensibilidad y restricciones.
15. ALLOW o DENY por defecto.
```

Fuentes posibles:

```text
OPERATIONAL ROLE GRANT
INDIVIDUAL OPERATIONAL GRANT
OPERATIONAL ROLE DENY
INDIVIDUAL OPERATIONAL DENY
ACTOR-WIDE DENY
```

Una concesión operativa nunca crea:

- turno;
- check-in;
- rol operativo;
- sede;
- área;
- sesión de actor;
- relación con el recurso.

---

#### 18. Prerrequisitos

Forma conceptual:

```ts
type PrerequisiteDecision = {
  prerequisite_type:
    | "PERMISSION_DEPENDENCY"
    | "SHIFT"
    | "CHECKIN"
    | "ACTIVE_AREA"
    | "DEVICE"
    | "REAUTHENTICATION"
    | "RESOURCE_STATE"
    | "OWNERSHIP"
    | "REQUIRED_SIDE"
    | "CONCURRENCY"
    | "IDEMPOTENCY";

  applies_to_lane: "BASE" | "OPERATIONAL" | "BOTH" | "REQUEST";
  status: "PASS" | "FAIL" | "NOT_APPLICABLE";
  reason_code: string | null;
};
```

Reglas:

- `N` no elimina permiso, alcance, recurso ni denegaciones;
- `T` exige turno vigente y no exige check-in;
- `T+C` exige turno y check-in;
- la combinación sin turno pero con check-in queda prohibida;
- un check-in incompatible bloquea el carril operativo;
- un área requerida debe estar resuelta y coincidir;
- una dependencia de permiso se evalúa explícitamente;
- aprobar una dependencia no autoriza el permiso principal;
- fallar una dependencia obligatoria produce `DENY`.

---

#### 19. Decisión de dispositivo

Forma conceptual:

```ts
type ConstraintDecision = {
  status: "PASS" | "FAIL" | "NOT_APPLICABLE";
  policy_code: string | null;
  reason_codes: string[];
};
```

La regla de dispositivo será:

```text
autoridad del actor
∩
capacidad admitida por dispositivo
```

Nunca unión.

El dispositivo puede producir `FAIL`.

No puede producir un allow empresarial por sí solo.

Un dispositivo compatible sin permiso humano produce `DENY`.

Un actor autorizado en un dispositivo incompatible produce `DENY` para esa
solicitud.

---

#### 20. Sensibilidad y reautenticación

La autorización de una capacidad sensible podrá exigir controles
adicionales, por ejemplo:

- reautenticación reciente;
- segundo factor;
- confirmación reforzada;
- separación de funciones;
- evidencia de motivo;
- aprobación adicional;
- dispositivo compatible.

Estos controles:

- no sustituyen el permiso;
- no amplían el alcance;
- no eliminan denegaciones;
- no convierten un carril inválido en válido;
- se registran como decisiones de restricción.

El catálogo detallado se desarrollará en las tareas posteriores del BLOQUE
E y en los bloques de implementación.

---

#### 21. Campos protegidos

Forma conceptual:

```ts
type FieldPolicyDecision = {
  status: "PASS" | "PARTIAL" | "FAIL";
  visible_fields: string[];
  masked_fields: string[];
  mutable_fields: string[];
  blocked_fields: string[];
  reason_codes: string[];
};
```

Reglas:

1. autorizar el recurso no autoriza todos sus campos;
2. una lectura parcial puede producir `ALLOW` con proyección limitada;
3. una mutación que incluye un campo no autorizado produce `DENY` o exige
   separar la operación;
4. los errores no deben revelar campos o recursos ocultos;
5. el cliente recibe únicamente la proyección segura;
6. `PARTIAL` no cambia el resultado final de autorización sobre la
   proyección aprobada.

---

#### 22. Grants coincidentes

Forma conceptual:

```ts
type MatchedGrant = {
  grant_id: string;
  lane: "BASE" | "OPERATIONAL";
  source_kind:
    | "BASE_ROLE"
    | "OPERATIONAL_ROLE"
    | "INDIVIDUAL_BASE"
    | "INDIVIDUAL_OPERATIONAL";

  source_subject_id: string;
  permission_key: string;
  effect: "ALLOW";
  scope_code: string;
  matched_territory: boolean;
  matched_resource: boolean;
  validity_status: "ACTIVE";
  source_dataset_id: string;
  source_dataset_version: string;
};
```

Reglas:

- solo se registran grants realmente evaluados;
- una asignación incompatible con la modalidad no es grant coincidente;
- un grant sin coincidencia territorial no autoriza;
- un grant individual no corrige un deny;
- un grant global sigue limitado al permiso y recurso exactos;
- no se exponen todos los grants al cliente.

---

#### 23. Denegaciones coincidentes

Forma conceptual:

```ts
type MatchedDeny = {
  deny_id: string;
  deny_class:
    | "STRUCTURAL"
    | "ACTOR_WIDE"
    | "BASE_LANE"
    | "OPERATIONAL_LANE"
    | "DEFAULT";

  lane: "BASE" | "OPERATIONAL" | "ALL" | null;
  permission_key: string;
  source_kind: string;
  matched_actor: boolean;
  matched_resource: boolean;
  matched_territory: boolean;
  matched_validity: boolean;
  reason_code: string;
};
```

Precedencia:

```text
STRUCTURAL DENY
>
ACTOR-WIDE DENY
>
LANE DENY
>
ALLOW
>
DEFAULT DENY
```

Una concesión adicional no supera un deny aplicable.

---

#### 24. Denegación estructural

Una denegación estructural procede de una condición obligatoria inválida.

Ejemplos:

- principal inválido;
- actor efectivo no resuelto;
- empleado inactivo;
- aplicación inexistente o inactiva;
- permiso inexistente o inactivo;
- modalidad ausente;
- contrato de recurso ausente;
- recurso no resoluble;
- territorio contradictorio;
- entorno aislado no autorizado;
- turno inválido cuando se requiere;
- check-in requerido ausente;
- check-in incompatible;
- rol operativo inválido;
- dispositivo o sesión de actor inválidos;
- contrato o dataset incompatible;
- decisión basada en contexto obsoleto.

Regla:

```text
STRUCTURAL DENY
→ final = DENY
```

No puede ser anulado mediante:

- rol;
- grant individual;
- alcance global;
- nombre de cargo;
- service role;
- dispositivo;
- simulación.

---

#### 25. Bloqueo individual transversal

Un `ACTOR_WIDE_DENY` aplicable:

```text
employee_id exacto
+
permission_key exacto
+
recurso y alcance coincidentes
+
vigencia activa
```

bloquea todos los carriles compatibles.

Resultado:

```text
base_decision = DENY
operational_decision = DENY
final_decision = DENY
```

No bloquea permisos distintos por prefijo.

No desactiva automáticamente al trabajador.

---

#### 26. Denegación de carril

Una denegación base bloquea únicamente el carril base.

Una denegación operativa bloquea únicamente el carril operativo.

En `BASE_OR_OPERATIONAL`:

```text
BASE DENY
+
OPERATIONAL ALLOW
→ ALLOW por OPERATIONAL
```

```text
BASE ALLOW
+
OPERATIONAL DENY
→ ALLOW por BASE
```

Siempre que no exista:

- denegación estructural;
- bloqueo transversal;
- dependencia común fallida;
- restricción de solicitud fallida.

En `BASE_AND_OPERATIONAL`, cualquier carril denegado produce `DENY`.

---

#### 27. Composición por modalidad

##### 27.1 `BASE_ONLY`

```text
base = ALLOW
→ final = ALLOW
```

Todo otro caso:

```text
final = DENY
```

El carril operativo queda `NOT_APPLICABLE`.

##### 27.2 `OPERATIONAL_ONLY`

```text
operational = ALLOW
→ final = ALLOW
```

Todo otro caso:

```text
final = DENY
```

El carril base queda `NOT_APPLICABLE`.

##### 27.3 `BASE_OR_OPERATIONAL`

```text
base = ALLOW
OR
operational = ALLOW
→ final = ALLOW
```

Ambos denegados:

```text
final = DENY
```

Los carriles no prestan partes incompletas entre sí.

##### 27.4 `BASE_AND_OPERATIONAL`

```text
base = ALLOW
AND
operational = ALLOW
→ final = ALLOW
```

Cualquier otro resultado:

```text
final = DENY
```

Ambos componentes deben pertenecer:

- al mismo actor efectivo;
- al mismo permiso;
- al mismo recurso;
- a la misma solicitud;
- a la misma versión contractual.

---

#### 28. Decisión de combinación

Forma conceptual:

```ts
type DecisionCombination = {
  authorization_requirement:
    | "BASE_ONLY"
    | "OPERATIONAL_ONLY"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  base_outcome: "ALLOW" | "DENY" | "NOT_APPLICABLE";
  operational_outcome: "ALLOW" | "DENY" | "NOT_APPLICABLE";

  authorizing_lanes: AuthorizationLane[];
  blocked_lanes: AuthorizationLane[];

  combination_rule:
    | "BASE"
    | "OPERATIONAL"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  combination_result: "ALLOW" | "DENY";
};
```

`authorizing_lanes` deberá declarar el carril real que satisfizo la
decisión.

En `BASE_OR_OPERATIONAL`, si ambos carriles permiten, podrá registrar ambos,
pero la implementación no deberá duplicar efectos.

---

#### 29. Decisión final

Forma conceptual:

```ts
type FinalDecision = {
  outcome: "ALLOW" | "DENY";

  reason_category:
    | "AUTHORIZED"
    | "STRUCTURAL_DENY"
    | "ACTOR_WIDE_DENY"
    | "LANE_DENY"
    | "PREREQUISITE_DENY"
    | "RESOURCE_DENY"
    | "DEVICE_DENY"
    | "SENSITIVITY_DENY"
    | "FIELD_POLICY_DENY"
    | "DEFAULT_DENY"
    | "CONTRACT_INVALID";

  primary_reason_code: string;
  authorizing_lanes: AuthorizationLane[];
  safe_message_code: string;
};
```

Reglas:

1. `ALLOW` exige evidencia positiva completa.
2. La ausencia de evidencia positiva produce `DENY`.
3. La decisión no usa `null` como resultado.
4. La razón primaria no elimina razones adicionales.
5. El mensaje seguro para UI no sustituye la razón técnica auditable.
6. Un error interno de evaluación produce `DENY`.
7. La finalización de la decisión no ejecuta por sí sola la acción.

---

#### 30. Razones bloqueantes

Forma conceptual:

```ts
type DecisionReason = {
  reason_code: string;
  category: string;
  severity: "BLOCKING" | "INFORMATIONAL";
  lane: "BASE" | "OPERATIONAL" | "ALL" | null;
  source: string;
  safe_to_expose: boolean;
};
```

Categorías iniciales:

```text
AUTHENTICATION
ACTOR
EMPLOYMENT
APPLICATION
PERMISSION
CONTRACT
RESOURCE
TERRITORY
OWNERSHIP
STATE
BASE_LANE
OPERATIONAL_LANE
SHIFT
CHECKIN
AREA
DEVICE
SENSITIVITY
FIELD_POLICY
DEPENDENCY
DENIAL
DEFAULT_DENY
STALE_CONTEXT
CONCURRENCY
IDEMPOTENCY
```

El catálogo definitivo de razones y mensajes se precisará en
AUTH-CTX-023 y en BLOQUE S.

---

#### 31. Dependencias entre permisos

Una dependencia se declara en el catálogo.

Ejemplo conceptual:

```text
nexo.inventory.remissions.prepare
requiere
nexo.access
```

La dependencia:

- se evalúa con el mismo actor;
- utiliza el mismo contexto;
- usa su propio contrato;
- conserva su modalidad;
- puede tener recurso distinto solo cuando el contrato lo declare;
- no se infiere desde el prefijo;
- no hereda automáticamente la decisión principal.

Una denegación aplicable sobre el permiso prerrequisito puede bloquear la
acción dependiente.

Se deberá evitar recursión circular.

Un ciclo contractual produce `CONTRACT_INVALID` y `DENY`.

---

#### 32. Estado y transición del recurso

Toda mutación debe validar:

- estado actual;
- transición solicitada;
- versión esperada;
- actor;
- territorio actual;
- territorio propuesto cuando cambie;
- lados obligatorios;
- idempotencia cuando corresponda.

Ejemplo:

```text
autoridad sobre remisión
+
estado incompatible
→ DENY
```

El permiso no sustituye el predicado de estado.

Una decisión positiva sobre una versión del recurso no autoriza una
mutación después de que el recurso cambie sin revalidación.

---

#### 33. Concurrencia e idempotencia

Forma conceptual:

```ts
type ConcurrencyContext = {
  policy:
    | "NONE"
    | "EXPECTED_VERSION"
    | "UPDATED_AT"
    | "LOCK"
    | "SNAPSHOT"
    | "IDEMPOTENCY_KEY";

  expected_version: string | null;
  idempotency_key: string | null;
  validated: boolean;
};
```

Reglas:

- la decisión y la escritura deben compartir frontera transaccional o
  revalidación;
- una decisión no reserva el recurso por sí sola;
- los movimientos de inventario requieren atomicidad;
- transiciones terminales y creaciones repetibles requieren idempotencia;
- una clave de idempotencia no concede permiso;
- un conflicto de versión produce `DENY` para la ejecución solicitada y
  exige reevaluar.

---

#### 34. Ejecución vinculada

Para mutaciones:

```text
resolver recurso
→ autorizar
→ validar estado/concurrencia
→ ejecutar
```

debe ocurrir:

- en la misma operación segura; o
- con revalidación inmediatamente antes de escribir.

No se admite:

```text
autorizar en UI
→ esperar
→ ejecutar sin validar servidor
```

`decision_id` se registra para auditoría.

No se utiliza para saltar la evaluación.

---

#### 35. Proyecciones de salida

Podrán existir al menos dos proyecciones:

##### 35.1 Proyección interna

Incluye:

- grants coincidentes;
- denegaciones;
- fuentes;
- hashes;
- contexto;
- territorio;
- evidencia completa permitida;
- detalles de auditoría.

##### 35.2 Proyección segura para cliente

Incluye como máximo:

- outcome;
- permiso;
- recurso lógico seguro;
- código de mensaje;
- razones seguras;
- acciones de recuperación permitidas;
- identificador de soporte o correlación.

No expone:

- decisiones disciplinarias;
- grants de otros actores;
- reglas sensibles;
- estructuras internas;
- existencia de recursos que el actor no puede conocer.

---

#### 36. Navegación, UI y servidor

##### Navegación

Puede usar una decisión para:

- mostrar;
- ocultar;
- deshabilitar;
- explicar.

##### URL

Debe volver a evaluar el permiso exacto.

##### Acción

Debe volver a evaluar en servidor.

##### RLS y RPC

Deben consumir o reproducir el mismo contrato canónico.

Regla:

```text
UI ALLOW
≠ SERVER ALLOW PERSISTENTE
```

```text
ENLACE OCULTO
≠ SEGURIDAD
```

---

#### 37. Listas de permisos efectivos

`AuthorizationDecision` no devolverá por defecto una lista materializada de
todos los permisos efectivos del actor.

Razones:

- el resultado depende del recurso;
- el territorio depende del recurso;
- el estado depende del recurso;
- el carril operativo cambia;
- el dispositivo puede restringir;
- las denegaciones pueden ser específicas;
- la sensibilidad puede exigir controles;
- una lista plana puede aparentar más autoridad de la real.

Las aplicaciones podrán obtener capacidades de navegación mediante
contratos específicos, pero cada operación conserva decisión exacta.

---

#### 38. Servicios del sistema

`SYSTEM_SERVICE` no implica allow.

La decisión deberá validar:

- identidad técnica del proceso;
- proceso autorizado;
- aplicación y permiso exactos;
- recurso;
- alcance;
- delegación cuando actúe por una persona;
- auditoría;
- ausencia de bypass general.

El uso de `service_role` para conectividad no equivale a autoridad
empresarial.

---

#### 39. Dispositivos compartidos

La decisión conserva simultáneamente:

```text
principal autenticado = dispositivo
actor efectivo = empleado
```

Debe validar:

- dispositivo activo;
- sesión de actor;
- actor activo;
- turno;
- check-in cuando aplique;
- paquete de capacidades;
- sede y área;
- recurso;
- permiso exacto.

La decisión y la auditoría deberán atribuir la acción al empleado sin
ocultar el dispositivo utilizado.

---

#### 40. Simulación

La decisión real no contiene:

- actor simulado;
- rol simulado;
- grants hipotéticos;
- territorio hipotético;
- `would_allow`;
- `indeterminate`.

La simulación utilizará un contrato distinto.

Una decisión simulada nunca podrá:

- ejecutar una mutación;
- servir como token;
- modificar RLS;
- reemplazar `auth.uid()`;
- reutilizarse como decisión real.

---

#### 41. Ejemplos canónicos

##### 41.1 `BASE_ONLY`

```text
permiso = viso.staff.roles.manage
modalidad = BASE_ONLY
base = ALLOW
operational = NOT_APPLICABLE
final = ALLOW
authorizing_lanes = [BASE]
```

##### 41.2 `OPERATIONAL_ONLY` sin check-in requerido

```text
modalidad = OPERATIONAL_ONLY
prerrequisito = T
turno = válido
check-in = ausente
operational = ALLOW
final = ALLOW
```

##### 41.3 `OPERATIONAL_ONLY` con T+C

```text
turno = válido
check-in = ausente
operational = DENY
reason = active_checkin_required
final = DENY
```

##### 41.4 `BASE_OR_OPERATIONAL`

```text
base = DENY
operational = ALLOW
final = ALLOW
authorizing_lanes = [OPERATIONAL]
```

##### 41.5 `BASE_AND_OPERATIONAL`

```text
base = ALLOW
operational = DENY
final = DENY
```

##### 41.6 Denegación transversal

```text
actor-wide deny aplicable
base = DENY
operational = DENY
final = DENY
```

##### 41.7 Recurso no resuelto

```text
resource.resolution_status = UNRESOLVED
structural deny
final = DENY
```

##### 41.8 Permiso global sobre recurso aislado

```text
grant = global
resource = APP-REVIEW
autorización aislada específica = ausente
final = DENY
```

##### 41.9 Dispositivo permitido sin grant humano

```text
device = PASS
matched allows = []
final = DENY por defecto
```

##### 41.10 `app.access`

```text
nexo.access = ALLOW
nexo.inventory.movements.create = no evaluado
```

El primer allow no concede el segundo.

---

#### 42. Orden conceptual de evaluación

```text
1. Recibir AccessContext exacto.
2. Normalizar la solicitud.
3. Resolver aplicación.
4. Resolver permiso exacto.
5. Cargar snapshot contractual.
6. Validar versiones y hashes.
7. Resolver recurso o borrador.
8. Resolver territorio, lados, sujeto y estado.
9. Detectar denegaciones estructurales.
10. Evaluar bloqueos actor-wide.
11. Determinar carriles según modalidad.
12. Evaluar prerrequisitos comunes.
13. Evaluar carril base cuando aplique.
14. Evaluar carril operativo cuando aplique.
15. Evaluar dispositivo.
16. Evaluar sensibilidad y reautenticación.
17. Evaluar campos.
18. Evaluar dependencias.
19. Aplicar precedencia deny > allow.
20. Combinar carriles según modalidad.
21. Aplicar denegación por defecto.
22. Construir razón primaria y razones adicionales.
23. Registrar evidencia y hashes.
24. Emitir decisión inmutable.
25. Ejecutar o revalidar dentro de frontera segura.
```

La implementación física y el orden SQL definitivo se diseñarán en
AUTH-CTX-026 y se implementarán en BLOQUE R.

---

#### 43. Invariantes

1. Toda decisión corresponde a un permiso exacto.
2. Toda decisión corresponde a una aplicación exacta.
3. Toda decisión corresponde a un actor efectivo exacto.
4. Toda decisión corresponde a un recurso o contrato no territorial exacto.
5. El cliente no suministra territorio autoritativo.
6. La modalidad procede del catálogo.
7. El recurso no procede del contexto del actor.
8. El contexto limita; no crea territorio.
9. `null` no significa global.
10. Wildcards están prohibidos.
11. Un permiso global no es universal.
12. `<app>.access` no concede permisos internos.
13. Un deny estructural prevalece sobre todo allow.
14. Un bloqueo actor-wide bloquea todos los carriles compatibles.
15. Un deny de carril solo bloquea su carril.
16. Dentro de un carril, deny prevalece sobre allow.
17. Sin allow aplicable existe denegación por defecto.
18. `BASE_ONLY` solo admite base.
19. `OPERATIONAL_ONLY` solo admite operativo.
20. `BASE_OR_OPERATIONAL` exige un carril completo.
21. `BASE_AND_OPERATIONAL` exige ambos carriles completos.
22. Los componentes híbridos pertenecen al mismo actor y recurso.
23. El turno no crea permiso.
24. El check-in no crea permiso.
25. El dispositivo no crea permiso.
26. El service role no crea autoridad empresarial.
27. Autorizar el recurso no autoriza todos los campos.
28. Autorizar una lectura no autoriza una mutación.
29. Autorizar un recurso no autoriza una operación masiva.
30. Una decisión no es token de capacidad.
31. Una decisión obsoleta no puede ejecutar una mutación.
32. La UI no sustituye evaluación de servidor.
33. La simulación no participa en la decisión real.
34. Toda decisión real termina en `ALLOW` o `DENY`.
35. Todo error de resolución falla cerrado.

---

#### 44. Antipatrones prohibidos

```ts
if (employee.role === "propietario") return true;
if (permission.startsWith("nexo.")) return true;
if (activeCheckin) return true;
if (device.apps.includes("nexo")) return true;
if (selectedSiteId === resource.site_id) return true;
if (baseAllow || operationalAllow) return true; // sin mirar modalidad
```

También queda prohibido:

```text
allow individual > deny
site_id del request → territorio confiable
decisión de navegación → autorización de mutación
permiso global → todos los recursos
permiso access → todas las funciones
decisión positiva antigua → escritura nueva
recurso no resuelto → fallback a sede primaria
error interno → allow
```

---

#### 45. Auditoría

Forma conceptual:

```ts
type AuthorizationAuditContext = {
  decision_id: string;
  correlation_id: string | null;

  actor_id: string | null;
  principal_id: string | null;
  device_id: string | null;

  app_code: string;
  permission_key: string;
  resource_type: string;
  resource_ids: string[];

  outcome: "ALLOW" | "DENY";
  authorizing_lanes: AuthorizationLane[];

  context_fingerprint: string;
  resource_fingerprint: string;
  catalog_hash: string;
  dataset_hashes: Record<string, string>;

  evaluator_name: string;
  evaluator_version: string;
};
```

La auditoría completa podrá conservar:

- grants y denials coincidentes;
- razones;
- versión;
- timestamps;
- recurso;
- estado;
- dispositivo;
- actor;
- origen de solicitud;
- ejecución resultante.

La retención y estructura física se definirán en E3 y BLOQUE R.

---

#### 46. Relación con tareas posteriores

##### AUTH-CTX-003

Diseñará `SimulationContext` separado.

##### AUTH-CTX-004

Congelará versiones, compatibilidad y serialización.

##### AUTH-CTX-016

Precisará aplicación y permiso solicitado.

##### AUTH-CTX-017

Precisará `authorization_requirement`.

##### AUTH-CTX-018

Precisará recurso y territorio resueltos.

##### AUTH-CTX-019

Precisará la decisión del carril base.

##### AUTH-CTX-020

Precisará la decisión del carril operativo.

##### AUTH-CTX-021

Precisará los allows coincidentes.

##### AUTH-CTX-022

Precisará las denegaciones coincidentes.

##### AUTH-CTX-023

Precisará la decisión final y razones.

##### AUTH-CTX-024

Precisará datos de auditoría.

##### AUTH-CTX-026

Diseñará el contrato canónico futuro de `evaluate_authorization`.

##### AUTH-CTX-030

Definirá pruebas contractuales completas.

##### BLOQUE E3

Aprobará las fuentes físicas, esquemas y relaciones objetivo.

##### BLOQUE R

Implementará el contrato mediante migraciones y consumidores versionados.

---

#### 47. Fuera del alcance

AUTH-CTX-002 no:

- modifica AUTH-CTX-001;
- diseña simulación;
- congela versión;
- crea TypeScript;
- crea Zod;
- crea JSON Schema;
- crea SQL;
- crea RPC;
- crea RLS;
- crea tablas;
- crea migraciones;
- persiste decisiones;
- define TTL;
- implementa caché;
- adapta aplicaciones;
- crea guards;
- crea UI;
- crea mensajes finales;
- implementa auditoría física;
- ejecuta permisos;
- modifica Supabase.

---

#### 48. Riesgos controlados

##### Riesgo 1 — Decisión sin recurso

Control:

```text
resource resolution obligatoria
```

##### Riesgo 2 — Modalidad reinterpretada

Control:

```text
snapshot contractual versionado
```

##### Riesgo 3 — Deny superado por más allows

Control:

```text
deny > allow
```

##### Riesgo 4 — Mezcla parcial de carriles

Control:

```text
carriles completos
+
composición explícita
```

##### Riesgo 5 — Check-in como grant

Control:

```text
check-in = prerrequisito
≠ allow
```

##### Riesgo 6 — Dispositivo como grant

Control:

```text
device = restricción
≠ allow
```

##### Riesgo 7 — Global como universal

Control:

```text
global
→ territorio organizacional ordinario
→ permiso y recurso exactos
```

##### Riesgo 8 — Decisión UI reutilizada para mutar

Control:

```text
servidor reevalúa
```

##### Riesgo 9 — Filtración de razones sensibles

Control:

```text
proyección interna
≠ proyección segura
```

##### Riesgo 10 — TOCTOU

Control:

```text
decisión + validación + escritura
→ misma frontera o revalidación
```

---

#### 49. Criterios de aprobación

AUTH-CTX-002 podrá aprobarse cuando se acepte que:

1. `AuthorizationDecision` evalúa una solicitud exacta;
2. toda decisión real termina en `ALLOW` o `DENY`;
3. la decisión referencia un `AccessContext` exacto;
4. aplicación y permiso son exactos;
5. la modalidad procede del catálogo;
6. el recurso se resuelve en servidor;
7. el contexto limita y no crea el territorio;
8. `UNRESOLVED`, `CONFLICT` e `ISOLATED` producen `DENY`;
9. base y operativo se evalúan por separado;
10. `BASE_ONLY` solo admite base;
11. `OPERATIONAL_ONLY` solo admite operativo;
12. `BASE_OR_OPERATIONAL` admite cualquier carril completo;
13. `BASE_AND_OPERATIONAL` exige ambos carriles;
14. deny estructural prevalece sobre todo allow;
15. bloqueo actor-wide bloquea todos los carriles compatibles;
16. deny de carril solo bloquea su carril;
17. dentro del carril, deny prevalece sobre allow;
18. sin allow aplicable existe denegación por defecto;
19. turno, check-in y dispositivo no conceden permisos;
20. los grants y denials coincidentes quedan trazables;
21. los campos protegidos se evalúan por separado;
22. dependencias entre permisos son explícitas;
23. las operaciones masivas no se infieren;
24. la decisión no es un token de capacidad;
25. una mutación debe revalidarse frente a cambios;
26. existen proyecciones interna y segura;
27. la simulación queda separada;
28. el catálogo de razones se reserva para tareas posteriores;
29. el contrato SQL se reserva para AUTH-CTX-026;
30. la implementación física se reserva para BLOQUE R.

---

#### 50. Estado final de la propuesta

| Tarea        | Estado      |
| ------------ | ----------- |
| AUTH-CTX-001 | APROBADA    |
| AUTH-CTX-002 | APROBADA    |
| AUTH-CTX-003 | NO INICIADA |

No se avanza a AUTH-CTX-003 hasta recibir aprobación explícita de
AUTH-CTX-002.

### ✅ AUTH-CTX-003 — Diseñar SimulationContext separado

**Estado:** APROBADA  
**Tarea anterior:** `AUTH-CTX-002 — Diseñar AuthorizationDecision canónica` — APROBADA  
**Tarea siguiente:** `AUTH-CTX-004 — Versionar los contratos de respuesta` — RESERVADA  
**Tipo de tarea:** Diseño documental de contrato canónico  
**Bloque:** BLOQUE E — Contexto y decisión de autorización unificados  
**Implementación física:** No incluida  
**Contrato diseñado:** `SimulationContext`  
**Contratos relacionados:** `AccessContext` y `AuthorizationDecision`  
**Versión contractual:** Pendiente de AUTH-CTX-004  
**Resultado real permitido:** Ninguna mutación ni autorización reutilizable

Esta tarea diseña un contrato independiente para simular identidades,
roles, cobertura, contexto operativo, dispositivos y decisiones de
autorización sin modificar la identidad real, la sesión técnica, RLS, los
datos empresariales ni las decisiones reales.

No implementa cookies de override, impersonación, funciones SQL, RPC,
migraciones, RLS, triggers, caché, UI, almacenamiento de sesiones ni cambios
físicos en Supabase.

---

#### 1. Objetivo

Permitir que un actor real expresamente autorizado pueda responder
preguntas hipotéticas como:

```text
¿Qué vería este rol?
¿Qué permisos tendría este trabajador en esta sede?
¿Qué ocurriría si estuviera en este turno?
¿Qué capacidades admitiría este dispositivo?
¿Por qué una operación sería permitida o denegada?
¿Qué cambiaría si una asignación o permiso se modificara?
```

sin convertir la simulación en:

- una sesión real;
- una identidad real;
- un rol real;
- un permiso real;
- un turno real;
- un check-in real;
- un bypass de RLS;
- una vía para ejecutar mutaciones;
- una forma de consultar datos que el actor real no puede conocer.

---

#### 2. Decisión principal

`SimulationContext` será un contrato distinto de `AccessContext` y
`AuthorizationDecision`.

Regla:

```text
AccessContext
→ describe al actor real y su contexto efectivo

AuthorizationDecision
→ autoriza o deniega una solicitud real

SimulationContext
→ describe un escenario hipotético
→ produce would_allow, would_deny o indeterminate
→ nunca produce autoridad ejecutable
```

Separación obligatoria:

```text
SimulationContext
≠ AccessContext

SimulatedAuthorizationDecision
≠ AuthorizationDecision
```

Ningún consumidor podrá aceptar un `SimulationContext` donde espera un
`AccessContext` real.

Ningún consumidor podrá aceptar un resultado `WOULD_ALLOW` donde espera un
`ALLOW` real.

---

#### 3. Principio de doble identidad

Toda simulación conserva dos planos:

```text
PLANO REAL
→ quién inició y controla la simulación

PLANO HIPOTÉTICO
→ qué sujeto y contexto se están evaluando
```

Forma conceptual:

```text
real_actor
≠ simulated_subject
```

El actor real:

- permanece autenticado;
- conserva su `auth.uid()` real;
- conserva su identidad laboral real;
- conserva su auditoría real;
- determina si puede iniciar, consultar o finalizar la simulación.

El sujeto simulado:

- no inicia sesión;
- no reemplaza al actor real;
- no recibe tokens;
- no modifica RLS;
- no firma mutaciones;
- no se atribuye acciones empresariales;
- no puede elevar los permisos del actor real.

---

#### 4. Forma canónica de alto nivel

```ts
type SimulationContext = {
  contract_name: "SimulationContext";
  contract_version: string;

  simulation_id: string;
  status: SimulationStatus;
  purpose: SimulationPurpose;

  created_at: string;
  activated_at: string | null;
  expires_at: string;
  completed_at: string | null;
  revoked_at: string | null;

  real_actor: RealSimulationActor;
  real_access_context_ref: AccessContextReference;
  simulation_authorization: SimulationAuthorization;

  simulated_subject: SimulatedSubject;
  hypothetical_context: HypotheticalAccessContext;
  resource_scenario: SimulationResourceScenario | null;

  evaluations: SimulatedAuthorizationDecision[];
  would_allow: SimulationResultReference[];
  would_deny: SimulationResultReference[];
  indeterminate: SimulationResultReference[];

  structural_issues: SimulationIssue[];
  audit: SimulationAuditContext;
};
```

La sintaxis anterior es documental.

No constituye todavía un tipo TypeScript, JSON Schema, tabla o respuesta
RPC física.

---

#### 5. Estados de la simulación

```ts
type SimulationStatus =
  | "DRAFT"
  | "ACTIVE"
  | "COMPLETED"
  | "EXPIRED"
  | "REVOKED"
  | "INVALID";
```

| Estado      | Significado                                                   |
| ----------- | ------------------------------------------------------------- |
| `DRAFT`     | Escenario todavía no activado ni evaluable.                   |
| `ACTIVE`    | Escenario vigente y autorizado para evaluación hipotética.    |
| `COMPLETED` | Escenario cerrado normalmente.                                |
| `EXPIRED`   | Superó `expires_at`; no puede seguir evaluándose.             |
| `REVOKED`   | El actor real o el sistema lo cerró anticipadamente.          |
| `INVALID`   | El contrato, el actor real o el escenario son inconsistentes. |

Reglas:

1. solo `ACTIVE` puede producir nuevas evaluaciones;
2. un escenario expirado no se reactiva silenciosamente;
3. una nueva simulación requiere un nuevo `simulation_id`;
4. cambiar el sujeto o el contexto produce una nueva revisión o simulación;
5. un resultado anterior conserva el snapshot con el que fue calculado;
6. la expiración no modifica datos reales.

---

#### 6. Propósito de simulación

```ts
type SimulationPurpose =
  | "NAVIGATION_PREVIEW"
  | "AUTHORIZATION_EXPLANATION"
  | "ROLE_MATRIX_REVIEW"
  | "TERRITORIAL_SCENARIO"
  | "OPERATIONAL_CONTEXT_SCENARIO"
  | "DEVICE_SCENARIO"
  | "CHANGE_IMPACT_REVIEW"
  | "SUPPORT_DIAGNOSTIC";
```

##### `NAVIGATION_PREVIEW`

Permite observar una proyección hipotética de navegación.

No autoriza abrir rutas o ejecutar acciones reales.

##### `AUTHORIZATION_EXPLANATION`

Explica por qué una solicitud hipotética produciría:

- `WOULD_ALLOW`;
- `WOULD_DENY`;
- `INDETERMINATE`.

##### `ROLE_MATRIX_REVIEW`

Evalúa un rol o combinación de roles contra permisos y alcances
contractuales.

##### `TERRITORIAL_SCENARIO`

Evalúa cobertura hipotética por organización, sede, área o tipo
territorial.

##### `OPERATIONAL_CONTEXT_SCENARIO`

Evalúa turno, check-in, rol operativo, sede y área hipotéticos.

##### `DEVICE_SCENARIO`

Evalúa la intersección entre autoridad hipotética del actor y capacidades
admitidas por un dispositivo.

##### `CHANGE_IMPACT_REVIEW`

Permite comparar el estado contractual vigente con un cambio propuesto que
todavía no ha sido publicado.

##### `SUPPORT_DIAGNOSTIC`

Permite reproducir de forma segura un problema de acceso sin asumir la
identidad del trabajador afectado.

El propósito deberá registrarse y limitar los datos disponibles.

---

#### 7. Actor real

Forma conceptual:

```ts
type RealSimulationActor = {
  actor_type: "EMPLOYEE" | "SYSTEM";
  actor_id: string;
  principal_id: string;
  employee_id: string | null;

  authenticated: boolean;
  active: boolean;

  simulation_permission_key: string;
  authorization_decision_id: string;
};
```

Reglas:

1. la simulación solo puede iniciarse desde una identidad real válida;
2. el actor real debe superar una `AuthorizationDecision` real;
3. la autorización para simular no se infiere por nombre de rol;
4. ser propietario o gerente general no crea bypass;
5. un dispositivo compartido no inicia una simulación por sí solo;
6. un servicio solo puede simular mediante proceso técnico explícito;
7. un actor inactivo no puede crear ni continuar simulaciones;
8. revocar la autoridad real invalida nuevas evaluaciones del escenario.

La clave concreta de permiso se toma del catálogo canónico vigente.

Esta tarea no inventa ni publica una nueva clave.

---

#### 8. Autorización para simular

Forma conceptual:

```ts
type SimulationAuthorization = {
  decision_id: string;
  outcome: "ALLOW" | "DENY";

  permitted_purposes: SimulationPurpose[];
  permitted_subject_types: SimulatedSubjectType[];
  permitted_app_codes: string[];

  may_reference_real_subjects: boolean;
  may_reference_real_resources: boolean;
  may_view_sensitive_explanations: boolean;

  expires_at: string;
};
```

Reglas:

- `outcome = DENY` impide crear o continuar la simulación;
- la autorización real no se reutiliza después de expirar;
- poder simular navegación no implica poder simular datos sensibles;
- poder simular un rol no implica poder consultar trabajadores reales;
- poder simular una aplicación no implica acceso a todas las aplicaciones;
- la simulación no puede ampliar el alcance real de consulta del actor;
- las restricciones del permiso real prevalecen sobre el escenario
  hipotético.

---

#### 9. Sujeto simulado

Tipos iniciales:

```ts
type SimulatedSubjectType =
  | "EXISTING_EMPLOYEE_REFERENCE"
  | "BASE_ROLE_TEMPLATE"
  | "OPERATIONAL_ROLE_TEMPLATE"
  | "HYPOTHETICAL_EMPLOYEE"
  | "COMPOSITE_SCENARIO";
```

Forma conceptual:

```ts
type SimulatedSubject = {
  subject_type: SimulatedSubjectType;
  simulated_subject_id: string;

  real_employee_id: string | null;
  display_reference: string | null;

  base_role_code: string | null;
  operational_role_code: string | null;

  source:
    | "MASKED_REAL_REFERENCE"
    | "CANONICAL_ROLE_TEMPLATE"
    | "SYNTHETIC"
    | "PROPOSED_CHANGESET";

  contains_real_personal_data: boolean;
};
```

##### `EXISTING_EMPLOYEE_REFERENCE`

Utiliza una referencia real únicamente cuando el actor real está
autorizado a consultar a ese trabajador.

La referencia deberá minimizarse o enmascararse.

##### `BASE_ROLE_TEMPLATE`

Simula un rol base canónico sin representar a una persona real.

##### `OPERATIONAL_ROLE_TEMPLATE`

Simula una función operativa canónica dentro de un escenario territorial y
temporal explícito.

##### `HYPOTHETICAL_EMPLOYEE`

Representa una identidad sintética sin registro laboral real.

##### `COMPOSITE_SCENARIO`

Permite construir una combinación hipotética controlada de:

- rol base;
- asignaciones;
- turno;
- check-in;
- rol operativo;
- dispositivo;
- overrides propuestos.

Reglas:

1. un rol no es una identidad;
2. una plantilla no se presenta como trabajador real;
3. un sujeto sintético no recibe UUID real de empleado;
4. una referencia real no expone datos personales innecesarios;
5. un empleado inactivo puede analizarse históricamente, pero no se
   presenta como contexto laboral real válido;
6. el sujeto simulado nunca sustituye al actor real en auditoría.

---

#### 10. Contexto hipotético

`HypotheticalAccessContext` reutiliza la semántica de `AccessContext`, pero
no su identidad contractual.

Forma conceptual:

```ts
type HypotheticalAccessContext = {
  hypothetical_context_id: string;
  access_context_contract_version: string;

  domain_identity: HypotheticalValue | null;
  employee: HypotheticalValue | null;

  base_role: HypotheticalValue | null;
  assigned_sites: HypotheticalValue[];
  assigned_areas: HypotheticalValue[];
  administrative_coverage: HypotheticalValue;

  active_shift: HypotheticalValue | null;
  active_checkin_session: HypotheticalValue | null;
  operational_role: HypotheticalValue | null;
  operational_site: HypotheticalValue | null;
  operational_area: HypotheticalValue | null;

  device_context: HypotheticalValue | null;
  structural_issues: SimulationIssue[];
};
```

Regla:

```text
HypotheticalAccessContext
→ forma compatible para razonamiento

HypotheticalAccessContext
≠ AccessContext real
```

No podrá enviarse directamente a `evaluate_authorization` real.

---

#### 11. Procedencia de valores hipotéticos

Cada valor deberá declarar procedencia.

```ts
type HypotheticalValue<T = unknown> = {
  value: T;
  provenance:
    | "CANONICAL_REAL_SNAPSHOT"
    | "MASKED_REAL_SNAPSHOT"
    | "SYNTHETIC"
    | "ROLE_TEMPLATE"
    | "PROPOSED_OVERRIDE"
    | "PROPOSED_ASSIGNMENT"
    | "PROPOSED_DENIAL"
    | "USER_SELECTED_SCENARIO";

  source_id: string | null;
  verified: boolean;
};
```

Reglas:

1. ningún valor seleccionado por UI se transforma en dato real;
2. un valor sintético se identifica siempre como sintético;
3. un valor propuesto no modifica el catálogo o dataset vigente;
4. los snapshots reales se limitan al alcance real del actor;
5. no se mezclan valores de versiones contractuales incompatibles;
6. la procedencia participa en auditoría;
7. un valor no verificable puede producir `INDETERMINATE`.

---

#### 12. Simulación de identidad laboral

El escenario podrá evaluar:

- empleado activo;
- empleado inactivo;
- identidad laboral ausente;
- rol base ausente;
- múltiples asignaciones;
- cobertura organizacional;
- cobertura por sede;
- cobertura por área;
- asignaciones ambiguas;
- overrides propuestos;
- denegaciones propuestas.

La simulación de empleado activo no activa ningún registro real.

La simulación de un empleado inactivo no modifica su estado.

La simulación de una asignación no crea `employee_sites` o relaciones
equivalentes.

---

#### 13. Simulación de contexto operativo

El escenario podrá declarar hipotéticamente:

- turno publicado;
- ventana temporal;
- check-in presente o ausente;
- rol operativo;
- sede operativa;
- área operativa;
- sesión de dispositivo;
- recurso relacionado.

Reglas:

1. el turno simulado no aparece en ANIMA;
2. el check-in simulado no registra presencia;
3. el rol operativo simulado no cambia el perfil del empleado;
4. la sede y área simuladas no cambian preferencias;
5. no se generan eventos;
6. no se crean sesiones de actor;
7. no se altera el contexto real;
8. un escenario contradictorio produce `INDETERMINATE` o `WOULD_DENY`,
   nunca `WOULD_ALLOW`.

---

#### 14. Escenario de recurso

Forma conceptual:

```ts
type SimulationResourceScenario = {
  mode:
    | "SYNTHETIC_RESOURCE"
    | "MASKED_REAL_RESOURCE"
    | "AUTHORIZED_REAL_REFERENCE"
    | "RESOURCE_DRAFT"
    | "UNRESOLVED";

  resource_type: string;
  resource_reference_id: string | null;
  synthetic_resource_id: string | null;

  territory: HypotheticalValue;
  state: HypotheticalValue;
  ownership: HypotheticalValue;
  required_sides: HypotheticalValue[];

  sensitive_fields_present: boolean;
};
```

##### `SYNTHETIC_RESOURCE`

Recurso completamente ficticio.

##### `MASKED_REAL_RESOURCE`

Snapshot real con identificadores y campos sensibles enmascarados.

##### `AUTHORIZED_REAL_REFERENCE`

Referencia real permitida únicamente cuando el actor real posee autoridad
independiente para conocerla.

##### `RESOURCE_DRAFT`

Borrador hipotético normalizado.

##### `UNRESOLVED`

No existe información suficiente.

Resultado esperado:

```text
UNRESOLVED
→ INDETERMINATE
```

No se utiliza sede seleccionada o primaria como fallback.

---

#### 15. Límite de acceso a datos reales

La autoridad hipotética del sujeto simulado nunca amplía la visibilidad
real del actor que ejecuta la simulación.

Regla:

```text
DATOS REALES VISIBLES EN SIMULACIÓN
=
datos que el actor real puede consultar
∩
datos necesarios para el propósito
∩
proyección segura
```

Nunca:

```text
permisos hipotéticos del sujeto
→ acceso real a datos ocultos
```

Ejemplo:

```text
actor real no puede consultar salarios
+
sujeto simulado tendría permiso salarial
=
no mostrar salarios reales
```

La simulación podrá indicar conceptualmente que el permiso existiría sin
revelar valores reales.

---

#### 16. Evaluación simulada

Las dos formas auxiliares consumidas por la decisión simulada quedan
definidas explícitamente como parte de este contrato documental.

##### 16.1 `SimulatedLaneResult`

```ts
type SimulatedLaneResult =
  | {
      required: false;
      result: null;
    }
  | {
      required: true;
      result:
        | "WOULD_ALLOW"
        | "WOULD_DENY"
        | "INDETERMINATE";
    };
```

Reglas:

1. `base_result` representa exclusivamente el carril `BASE`;
2. `operational_result` representa exclusivamente el carril `OPERATIONAL`;
3. `required = false` solo puede coexistir con `result = null` y significa
   que ese carril no participa en la combinación de la modalidad evaluada;
4. `required = true` solo puede coexistir con exactamente uno de
   `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE`;
5. el tipo no admite materializar `required = false` con un resultado ni
   `required = true` con `null`;
6. `null` nunca equivale a `WOULD_ALLOW`, `WOULD_DENY` ni
   `INDETERMINATE`;
7. la ausencia de participación de un carril no crea una cuarta decisión
   simulada;
8. la modalidad canónica determina qué carriles tienen `required = true`.

Relación con modalidades:

```text
BASE_ONLY
→ base_result.required = true
→ operational_result.required = false

OPERATIONAL_ONLY
→ base_result.required = false
→ operational_result.required = true

BASE_OR_OPERATIONAL
→ base_result.required = true
→ operational_result.required = true

BASE_AND_OPERATIONAL
→ base_result.required = true
→ operational_result.required = true
```

##### 16.2 `SimulationMatch`

```ts
type SimulationMatch =
  | {
      effect: "ALLOW";
      lane: "BASE" | "OPERATIONAL";
      provenance: "VIGENTE" | "PROPUESTA" | "SINTÉTICA";
      source_id: string | null;
    }
  | {
      effect: "DENY";
      lane: "BASE" | "OPERATIONAL" | "ALL";
      provenance: "VIGENTE" | "PROPUESTA" | "SINTÉTICA";
      source_id: string | null;
    };
```

Reglas:

1. `effect = ALLOW` solo admite `lane = BASE` o `lane = OPERATIONAL`;
2. `effect = DENY` admite `lane = BASE`, `lane = OPERATIONAL` o
   `lane = ALL`;
3. `lane = ALL` queda reservado a una denegación transversal que bloquee
   los carriles compatibles; nunca representa un allow transversal;
4. `provenance` reutiliza exactamente la clasificación de procedencia
   establecida para allows y denegaciones hipotéticos:
   `VIGENTE`, `PROPUESTA` o `SINTÉTICA`;
5. `source_id` conserva la referencia de la fuente cuando existe una
   identidad canónica o propuesta identificable;
6. `source_id = null` solo es válido cuando la fuente no posee identidad
   persistida, como un elemento estrictamente sintético;
7. todo elemento de `matched_hypothetical_allows` debe declarar
   `effect = ALLOW`;
8. todo elemento de `matched_hypothetical_denies` debe declarar
   `effect = DENY`;
9. una misma evidencia no se duplica entre ambos arrays para representar
   efectos contradictorios;
10. los problemas estructurales permanecen en `blocked_reasons` y no se
    convierten en `SimulationMatch` sin una fila hipotética concreta.

Forma conceptual de la decisión:

```ts
type SimulatedAuthorizationDecision = {
  simulated_decision_id: string;
  evaluated_at: string;

  simulation_id: string;
  hypothetical_context_id: string;

  app_code: string;
  permission_key: string;
  resource_scenario_id: string | null;

  authorization_requirement: string | null;

  base_result: SimulatedLaneResult;
  operational_result: SimulatedLaneResult;

  matched_hypothetical_allows: SimulationMatch[];
  matched_hypothetical_denies: SimulationMatch[];

  blocked_reasons: SimulationIssue[];

  final_result:
    | "WOULD_ALLOW"
    | "WOULD_DENY"
    | "INDETERMINATE";

  confidence:
    | "CONTRACT_COMPLETE"
    | "PARTIAL_INPUT"
    | "MASKED_INPUT"
    | "VERSION_MISMATCH";
};
```

La evaluación simulada:

- puede reutilizar las reglas conceptuales reales;
- no reutiliza el tipo de respuesta real;
- no produce un `decision_id` ejecutable;
- no se almacena como grant;
- no se consume en RLS;
- no autoriza RPC;
- no ejecuta operaciones.

---

#### 17. Resultados simulados

##### 17.1 `WOULD_ALLOW`

Solo procede cuando:

- el escenario está completo;
- las versiones son compatibles;
- el permiso existe;
- el recurso está suficientemente resuelto;
- los carriles aplicables se satisfacen;
- no existe deny hipotético aplicable;
- no existe contradicción estructural;
- el permiso admite simulación.

Significa:

```text
BAJO ESTOS HECHOS HIPOTÉTICOS
LA REGLA CONTRACTUAL PRODUCIRÍA ALLOW
```

No significa:

```text
EL ACTOR REAL PUEDE EJECUTAR
```

##### 17.2 `WOULD_DENY`

Procede cuando el escenario completo demuestra una causa de denegación.

Ejemplos:

- permiso ausente;
- modalidad incompatible;
- turno requerido ausente;
- check-in requerido ausente;
- territorio fuera de alcance;
- deny hipotético aplicable;
- dispositivo incompatible;
- estado de recurso inválido.

##### 17.3 `INDETERMINATE`

Procede cuando falta información necesaria o no puede evaluarse con
seguridad.

Ejemplos:

- recurso no resuelto;
- campo enmascarado indispensable;
- versión contractual incompatible;
- ambigüedad territorial;
- escenario contradictorio;
- permiso no simulable;
- dependencia sin información;
- estado empresarial no disponible.

Regla:

```text
INDETERMINATE
≠ WOULD_ALLOW
```

---

#### 18. Resultados raíz

Los campos esperados se conservan:

```ts
would_allow: SimulationResultReference[];
would_deny: SimulationResultReference[];
indeterminate: SimulationResultReference[];
```

Forma conceptual:

```ts
type SimulationResultReference = {
  simulated_decision_id: string;
  app_code: string;
  permission_key: string;
  resource_scenario_id: string | null;
  primary_reason_code: string;
};
```

Cada evaluación debe aparecer en exactamente una colección.

Invariante:

```text
evaluations
=
would_allow
+
would_deny
+
indeterminate
```

sin duplicados.

---

#### 19. Compatibilidad con modalidades

La simulación conserva las modalidades reales:

##### `BASE_ONLY`

Solo evalúa el escenario base.

##### `OPERATIONAL_ONLY`

Solo evalúa el escenario operativo.

##### `BASE_OR_OPERATIONAL`

Puede producir `WOULD_ALLOW` cuando cualquiera de los carriles completos
autorizaría.

##### `BASE_AND_OPERATIONAL`

Solo produce `WOULD_ALLOW` cuando ambos carriles completos autorizarían para:

- el mismo sujeto simulado;
- el mismo permiso;
- el mismo recurso;
- la misma solicitud;
- la misma versión contractual.

No se mezclan componentes de sujetos simulados distintos.

---

#### 20. Allows y denegaciones hipotéticos

La simulación podrá evaluar:

- matrices vigentes;
- grants individuales vigentes permitidos para análisis;
- overrides propuestos;
- denegaciones vigentes permitidas para análisis;
- denegaciones propuestas;
- cambios de matriz todavía no publicados.

Toda fila deberá declarar:

```text
VIGENTE
PROPUESTA
SINTÉTICA
```

Una propuesta no modifica el dataset real.

La precedencia hipotética conserva:

```text
STRUCTURAL DENY
>
ACTOR-WIDE DENY
>
LANE DENY
>
ALLOW
>
DEFAULT DENY
```

Una propuesta de allow no supera un deny hipotético aplicable.

---

#### 21. Dispositivo simulado

Un escenario de dispositivo puede definir:

- tipo de terminal;
- sede fija;
- área fija;
- paquete de capacidades;
- aplicaciones admitidas;
- sesión de actor presente o ausente;
- estado activo o inactivo.

Regla:

```text
autoridad hipotética del sujeto
∩
capacidades hipotéticas del dispositivo
=
capacidad simulable
```

El dispositivo no crea grants hipotéticos.

Un dispositivo activo sin actor hipotético puede producir únicamente
capacidades técnicas simuladas.

---

#### 22. Navegación simulada

La UI podrá mostrar una vista hipotética de:

- aplicaciones;
- módulos;
- pantallas;
- acciones visibles;
- razones de ocultamiento;
- requisitos pendientes.

Debe mostrar de forma persistente y visible:

```text
MODO SIMULACIÓN
SIN EFECTOS REALES
ACTOR REAL: <referencia segura>
SUJETO SIMULADO: <referencia segura>
EXPIRA: <timestamp>
```

En modo simulación:

- las acciones mutadoras estarán deshabilitadas;
- las URLs reales no adquieren permisos;
- abrir una ruta obliga a mantener la frontera simulada;
- salir de la simulación restaura el contexto real;
- una pestaña antigua no puede ejecutar usando el escenario expirado.

---

#### 23. Mutaciones prohibidas

Una simulación no podrá:

- crear;
- editar;
- eliminar;
- aprobar;
- cancelar;
- reversar;
- despachar;
- recibir;
- mover inventario;
- producir;
- registrar check-in;
- publicar turnos;
- modificar permisos;
- asignar roles;
- cambiar estados empresariales;
- emitir eventos;
- imprimir documentos operativos reales;
- disparar automatizaciones;
- reservar recursos;
- consumir stock;
- escribir auditoría empresarial como si fuera el sujeto simulado.

Regla:

```text
simulation_context presente
+
solicitud mutadora
→ DENY
```

Razón conceptual:

```text
simulation_mutation_prohibited
```

El actor real deberá cerrar la simulación y realizar una evaluación real
independiente para ejecutar una acción permitida.

---

#### 24. RLS y base de datos

La simulación no modifica:

- `auth.uid()`;
- JWT;
- claims;
- `SET ROLE`;
- RLS;
- grants;
- políticas;
- sesión de Supabase;
- tenant;
- identidad laboral;
- actor efectivo real.

No se permitirá implementar simulación mediante:

```text
cookie role_override
→ rol real

query string simulated_role
→ bypass

claim temporal
→ autoridad

service_role
→ leer todo y filtrar en cliente
```

La simulación deberá resolverse en una frontera explícita separada.

---

#### 25. Cookies y estado del cliente

Una cookie podrá, en una implementación futura, transportar únicamente una
referencia opaca y firmada a una sesión de simulación.

No podrá transportar autoritativamente:

- rol;
- empleado;
- sede;
- área;
- permisos;
- grants;
- turno;
- check-in;
- resultado.

Regla:

```text
simulation_session_reference
→ localizar y validar sesión

simulation_role_cookie
→ prohibido como autoridad
```

Toda referencia deberá:

- expirar;
- ser revocable;
- estar vinculada al actor real;
- ser validada en servidor;
- no reutilizarse como sesión laboral.

---

#### 26. Expiración y revocación

`expires_at` es obligatorio.

La duración concreta se definirá en AUTH-CTX-004 o AUTH-CTX-029.

Una simulación se invalida cuando:

- expira;
- el actor real cierra sesión;
- el actor real queda inactivo;
- se revoca el permiso de simulación;
- cambia la versión contractual incompatible;
- se revoca manualmente;
- se detecta manipulación;
- se cambia el sujeto sin crear nueva revisión;
- se intenta mutar.

La expiración de una simulación no afecta el `AccessContext` real.

---

#### 27. Auditoría

Forma conceptual:

```ts
type SimulationAuditContext = {
  simulation_id: string;

  real_actor_id: string;
  real_principal_id: string;
  real_employee_id: string | null;

  purpose: SimulationPurpose;
  reason: string;

  simulated_subject_type: SimulatedSubjectType;
  simulated_subject_reference: string;

  app_codes: string[];
  permission_keys: string[];

  created_at: string;
  expires_at: string;
  completed_at: string | null;

  evaluation_count: number;
  would_allow_count: number;
  would_deny_count: number;
  indeterminate_count: number;

  access_context_fingerprint: string;
  catalog_version: string;
  dataset_versions: Record<string, string>;
  simulator_version: string;
};
```

La auditoría registra al actor real.

No atribuye acciones al sujeto simulado.

Los motivos disciplinarios o sensibles deberán protegerse mediante
proyecciones internas.

---

#### 28. Problemas estructurales

Forma conceptual:

```ts
type SimulationIssue = {
  issue_code: string;

  severity:
    | "BLOCKING_SIMULATION"
    | "BLOCKING_EVALUATION"
    | "INDETERMINATE"
    | "WARNING"
    | "INFO";

  source: string;
  safe_message: string;
};
```

Ejemplos iniciales:

```text
real_actor_unauthenticated
real_actor_inactive
simulation_not_authorized
simulation_expired
simulation_revoked
simulated_subject_invalid
hypothetical_context_incomplete
resource_unresolved
masked_field_required
contract_version_mismatch
scenario_conflict
device_scenario_invalid
simulation_mutation_prohibited
real_data_scope_exceeded
```

El catálogo definitivo de razones se consolidará en tareas posteriores del
BLOQUE E y en BLOQUE S.

---

#### 29. Datos sensibles

La simulación no se convierte en una herramienta para explorar:

- salarios;
- documentos personales;
- secretos;
- credenciales;
- tokens;
- datos financieros restringidos;
- auditoría disciplinaria;
- información de clientes;
- datos de otros trabajadores;
- recursos aislados;
- APP-REVIEW;
- entornos de prueba no autorizados.

Puede simular la existencia de una capacidad sin revelar el contenido
protegido.

Ejemplo:

```text
WOULD_ALLOW campo sensible
+
actor real sin lectura del dato real
→ mostrar únicamente explicación contractual
→ no mostrar valor
```

---

#### 30. Comparación de escenarios

Un `CHANGE_IMPACT_REVIEW` podrá comparar:

```text
ESCENARIO A
→ contrato vigente

ESCENARIO B
→ cambio propuesto
```

La comparación deberá declarar:

- versión base;
- cambios hipotéticos;
- permisos afectados;
- sujetos afectados;
- resultados modificados;
- casos que pasan de allow a deny;
- casos que pasan de deny a allow;
- casos indeterminados.

No publica el cambio.

No reescribe matrices.

No crea una nueva versión contractual.

---

#### 31. Escenarios canónicos

##### 31.1 Rol base sin turno

```text
simulated_subject = BASE_ROLE_TEMPLATE
base_role = gerente
active_shift = null
permission = BASE_ONLY
```

Resultado posible:

```text
WOULD_ALLOW por BASE
```

si matriz, alcance y recurso coinciden.

##### 31.2 Rol operativo sin turno

```text
operational_role = bodeguero
active_shift = null
permission = OPERATIONAL_ONLY
```

Resultado:

```text
WOULD_DENY
reason = active_shift_required
```

##### 31.3 Turno válido sin check-in para permiso T

```text
shift = válido
check-in = ausente
prerequisite = T
```

Resultado posible:

```text
WOULD_ALLOW
```

##### 31.4 Turno válido sin check-in para permiso T+C

Resultado:

```text
WOULD_DENY
reason = active_checkin_required
```

##### 31.5 Recurso sin territorio resoluble

Resultado:

```text
INDETERMINATE
reason = resource_unresolved
```

##### 31.6 Dispositivo incompatible

```text
actor hipotético = autorizado
device package = no admite permiso
```

Resultado:

```text
WOULD_DENY
```

##### 31.7 Datos reales fuera del alcance del actor real

Resultado:

```text
INDETERMINATE o explicación enmascarada
```

Nunca se devuelven los datos reales restringidos.

##### 31.8 Intento de mutación

Resultado real:

```text
DENY
reason = simulation_mutation_prohibited
```

No se devuelve `WOULD_ALLOW` como permiso ejecutable.

---

#### 32. Flujo conceptual de creación

```text
1. Validar AccessContext real.
2. Evaluar permiso real para iniciar simulación.
3. Registrar propósito y motivo.
4. Definir tipo de sujeto simulado.
5. Resolver o construir sujeto seguro.
6. Construir contexto hipotético con procedencia.
7. Definir recurso sintético, enmascarado o autorizado.
8. Validar versiones contractuales.
9. Definir expiración.
10. Crear simulation_id.
11. Activar escenario.
12. Evaluar solicitudes hipotéticas.
13. Clasificar resultados.
14. Registrar auditoría.
15. Completar, expirar o revocar.
```

---

#### 33. Flujo conceptual de evaluación

```text
1. Validar que la simulación esté ACTIVE.
2. Validar al actor real.
3. Validar autorización real de simulación.
4. Validar propósito.
5. Validar sujeto simulado.
6. Validar procedencia de cada valor.
7. Validar recurso y límites de datos reales.
8. Cargar catálogo y datasets exactos.
9. Ejecutar evaluador simulado separado.
10. Aplicar modalidades y precedencia.
11. Producir WOULD_ALLOW, WOULD_DENY o INDETERMINATE.
12. Aplicar enmascaramiento.
13. Registrar evidencia.
14. No ejecutar la acción.
```

---

#### 34. Relación con `AccessContext`

El `AccessContext` real participa únicamente para:

- identificar al actor real;
- comprobar su estado;
- evaluar su permiso de simulación;
- limitar datos reales visibles;
- registrar auditoría;
- invalidar la sesión cuando cambie.

No se modifica.

El contexto hipotético:

- puede tomar una proyección controlada;
- puede reemplazar valores únicamente dentro del escenario;
- conserva procedencia;
- nunca se promueve a contexto real.

---

#### 35. Relación con `AuthorizationDecision`

Para iniciar o administrar la simulación se requiere una
`AuthorizationDecision` real.

Para evaluar el escenario se produce un tipo distinto:

```text
SimulatedAuthorizationDecision
```

No se permite:

```text
AuthorizationDecision.final_decision = ALLOW
por sujeto simulado
```

Ni:

```text
SimulatedAuthorizationDecision.final_result = WOULD_ALLOW
→ ejecutar
```

---

#### 36. Relación con navegación

La navegación simulada podrá consumir resultados hipotéticos para:

- mostrar pantallas;
- ocultar pantallas;
- marcar capacidades;
- explicar requisitos;
- comparar roles;
- validar diseño UX.

No podrá:

- abrir datos reales fuera del alcance real;
- enviar formularios;
- ejecutar Server Actions mutadoras;
- generar documentos reales;
- disparar jobs;
- registrar eventos de dominio.

---

#### 37. Relación con dispositivos compartidos

Una simulación ejecutada desde un dispositivo compartido requerirá:

- dispositivo activo;
- sesión real de actor;
- actor real autorizado para simular;
- paquete de dispositivo compatible con la herramienta de simulación.

El sujeto simulado no reemplaza al actor de la sesión del dispositivo.

Cerrar la sesión del actor real revoca la simulación.

---

#### 38. Servicios y automatizaciones

Un servicio podrá ejecutar simulaciones técnicas únicamente para:

- pruebas contractuales;
- análisis de impacto;
- validación de matrices;
- regresión;
- soporte controlado.

Deberá existir:

- identidad técnica;
- proceso permitido;
- alcance;
- propósito;
- dataset;
- versión;
- auditoría.

No podrá utilizar `service_role` como bypass general para consultar datos
reales.

---

#### 39. Pruebas contractuales mínimas futuras

El contrato deberá permitir probar:

1. actor real autorizado;
2. actor real sin permiso de simulación;
3. actor real inactivo;
4. simulación expirada;
5. simulación revocada;
6. rol base sintético;
7. rol operativo sintético;
8. empleado real enmascarado;
9. empleado hipotético;
10. contexto con turno;
11. contexto sin turno;
12. contexto con check-in;
13. contexto con check-in incompatible;
14. dispositivo compatible;
15. dispositivo incompatible;
16. recurso sintético;
17. recurso real autorizado;
18. recurso real fuera del alcance del actor;
19. recurso no resuelto;
20. permiso no simulable;
21. `BASE_ONLY`;
22. `OPERATIONAL_ONLY`;
23. `BASE_OR_OPERATIONAL`;
24. `BASE_AND_OPERATIONAL`;
25. deny estructural;
26. actor-wide deny;
27. lane deny;
28. denegación por defecto;
29. cambio propuesto de grant;
30. cambio propuesto de deny;
31. intento de mutación;
32. intento de usar `WOULD_ALLOW` como `ALLOW`;
33. comparación entre dos escenarios;
34. incompatibilidad de versiones;
35. minimización de datos sensibles;
36. `BASE_ONLY` materializado con `base_result.required = true` y
    `operational_result.required = false`;
37. `OPERATIONAL_ONLY` materializado con `base_result.required = false` y
    `operational_result.required = true`;
38. carril no requerido con `result = null`;
39. rechazo de carril requerido con `result = null`;
40. match base vigente;
41. match operativo propuesto;
42. deny transversal sintético con `lane = ALL` y sin `source_id`
    persistido;
43. rechazo de `effect = ALLOW` con `lane = ALL`;
44. rechazo de procedencia fuera de `VIGENTE`, `PROPUESTA` o `SINTÉTICA`;
45. prohibición de convertir un problema estructural sin fila concreta en
    `SimulationMatch`.

El plan completo de pruebas se definirá en AUTH-CTX-030.

---

#### 40. Invariantes

1. El actor real siempre se conserva.
2. El sujeto simulado nunca reemplaza al actor real.
3. `auth.uid()` nunca cambia por simulación.
4. RLS nunca cambia por simulación.
5. La simulación no crea permisos.
6. La simulación no crea roles.
7. La simulación no crea turnos.
8. La simulación no crea check-ins.
9. La simulación no crea sesiones de actor.
10. La simulación no modifica asignaciones.
11. La simulación no modifica datasets.
12. La simulación no ejecuta mutaciones.
13. `WOULD_ALLOW` no equivale a `ALLOW`.
14. `WOULD_DENY` no desactiva permisos reales.
15. `INDETERMINATE` no equivale a allow.
16. El actor real debe estar autorizado para simular.
17. La autorización de simulación es específica.
18. El propósito limita el escenario.
19. Los datos reales se limitan por la autoridad real.
20. Los permisos hipotéticos no amplían visibilidad real.
21. Toda información hipotética declara procedencia.
22. Los valores sintéticos se identifican como sintéticos.
23. Los valores propuestos no se publican.
24. Un recurso no resuelto produce `INDETERMINATE`.
25. Un escenario contradictorio no produce `WOULD_ALLOW`.
26. La expiración es obligatoria.
27. La revocación impide nuevas evaluaciones.
28. La auditoría atribuye la simulación al actor real.
29. El sujeto simulado no recibe tokens.
30. Las cookies no contienen autoridad simulada.
31. Una navegación simulada no protege rutas reales.
32. La simulación conserva modalidades y precedencia.
33. La simulación real y la evaluación real usan contratos distintos.
34. APP-REVIEW y entornos aislados requieren autorización específica real.
35. Un error interno falla cerrado.
36. `SimulatedLaneResult` no admite resultados fuera de los tres resultados
    simulados ni `null` para un carril requerido.
37. `SimulationMatch` no admite procedencia libre ni un carril distinto de
    `BASE`, `OPERATIONAL` o `ALL`.
38. `SimulationMatch` impide `effect = ALLOW` con `lane = ALL`; el carril
    transversal queda reservado a denegaciones.
39. `matched_hypothetical_allows` y `matched_hypothetical_denies` conservan
    efectos explícitos y coherentes con la colección que los contiene.

---

#### 41. Antipatrones prohibidos

```ts
cookies().set("role_override", "propietario");
request.body.employee_id = simulatedEmployeeId;
supabase.auth.admin.generateLink({ user: simulatedUser });
set_config("request.jwt.claim.role", simulatedRole);
return evaluateAuthorization(simulatedContext);
```

También queda prohibido:

```text
rol simulado → rol real
sujeto simulado → auth.uid()
WOULD_ALLOW → ejecutar
cookie de rol → autoridad
service_role → ver todos los datos
simulación → cambiar RLS
simulación → registrar eventos
simulación → actuar como empleado
simulación → leer recursos no autorizados al actor real
```

---

#### 42. Límites de exposición

La proyección para UI podrá incluir:

- modo de simulación;
- propósito;
- sujeto seguro;
- valores hipotéticos visibles;
- permiso evaluado;
- `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE`;
- razones seguras;
- expiración;
- identificador de soporte.

No incluirá por defecto:

- documentos de identidad;
- salarios;
- secretos;
- tokens;
- grants completos de otros trabajadores;
- denegaciones disciplinarias;
- datos reales no autorizados;
- identificadores internos innecesarios;
- explicaciones que revelen recursos ocultos.

---

#### 43. Relación con tareas posteriores

##### AUTH-CTX-004

Congelará:

- versión del contrato;
- compatibilidad;
- serialización;
- política de evolución;
- relación entre versiones reales y simuladas.

##### AUTH-CTX-015

Precisará razones estructuradas que también puedan proyectarse en
simulación.

##### AUTH-CTX-016 a AUTH-CTX-024

Desarrollarán la decisión real.

No deberán convertir `SimulationContext` en una variante permisiva de la
decisión real.

##### AUTH-CTX-026

Diseñará `evaluate_authorization` real.

La evaluación simulada deberá conservar una frontera y nombre distintos.

##### AUTH-CTX-027

Definirá consumo centralizado por aplicaciones y separación UI real /
simulada.

##### AUTH-CTX-029

Definirá expiración, invalidación y caché.

##### AUTH-CTX-030

Definirá pruebas de contexto, decisión y simulación.

##### BLOQUE E3

Definirá la arquitectura física objetivo de sesiones, auditoría y datos
necesarios.

##### BLOQUE R

Implementará contratos y migraciones después de las aprobaciones
arquitectónicas.

---

#### 44. Fuera del alcance

AUTH-CTX-003 no:

- modifica `AccessContext`;
- modifica `AuthorizationDecision`;
- congela versiones;
- crea TypeScript;
- crea Zod;
- crea JSON Schema;
- crea tablas;
- crea funciones SQL;
- crea RPC;
- crea RLS;
- crea migraciones;
- implementa cookies;
- crea sesiones físicas;
- implementa UI;
- adapta aplicaciones;
- crea permisos nuevos;
- ejecuta simulaciones reales;
- persiste escenarios;
- define TTL definitivo;
- define mensajes finales;
- modifica Supabase.

---

#### 45. Riesgos controlados

##### Riesgo 1 — Impersonación real

Control:

```text
real_actor
≠ simulated_subject
```

##### Riesgo 2 — `WOULD_ALLOW` usado para ejecutar

Control:

```text
tipo contractual distinto
+
sin token ejecutable
```

##### Riesgo 3 — Role override por cookie

Control:

```text
cookie opaca firmada
→ referencia de sesión
→ nunca autoridad
```

##### Riesgo 4 — Filtración de datos

Control:

```text
autoridad real
∩
propósito
∩
proyección segura
```

##### Riesgo 5 — Mutación accidental

Control:

```text
simulation_context + mutation
→ DENY
```

##### Riesgo 6 — Mezcla con RLS

Control:

```text
auth.uid real e inmutable
```

##### Riesgo 7 — Escenario incompleto tratado como allow

Control:

```text
INDETERMINATE
```

##### Riesgo 8 — Cambios propuestos publicados por accidente

Control:

```text
provenance = PROPOSED
→ solo evaluación
```

##### Riesgo 9 — Simulación persistente después de revocación

Control:

```text
expires_at
+
validación del actor real
+
revocación
```

##### Riesgo 10 — Simulación de dispositivo que concede permisos

Control:

```text
dispositivo solo restringe
```

---

#### 46. Criterios de aprobación

AUTH-CTX-003 queda aprobada bajo los siguientes criterios:

1. `SimulationContext` es un contrato separado;
2. conserva al actor real;
3. separa al sujeto simulado;
4. no modifica `auth.uid()`;
5. no modifica RLS;
6. no modifica `AccessContext` real;
7. no produce `AuthorizationDecision` real;
8. usa `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE`;
9. `WOULD_ALLOW` nunca es ejecutable;
10. el actor real requiere autorización explícita para simular;
11. el propósito limita la simulación;
12. el sujeto puede ser real enmascarado, plantilla o sintético;
13. cada valor hipotético declara procedencia;
14. los permisos hipotéticos no amplían datos reales visibles;
15. los recursos reales requieren autoridad real independiente;
16. un recurso no resuelto produce `INDETERMINATE`;
17. un escenario contradictorio no produce `WOULD_ALLOW`;
18. se conservan modalidades y precedencia;
19. el dispositivo no concede autoridad;
20. la simulación no crea turno ni check-in;
21. la simulación no crea grants ni denegaciones reales;
22. las propuestas no modifican datasets;
23. toda mutación en simulación se deniega;
24. las cookies no almacenan autoridad simulada;
25. `expires_at` es obligatorio;
26. la revocación impide nuevas evaluaciones;
27. la auditoría atribuye la acción al actor real;
28. la UI deberá identificar el modo simulación;
29. los datos sensibles se minimizan;
30. la implementación física queda reservada para BLOQUE R;
31. `SimulatedLaneResult` queda definido explícitamente y no requiere
    `unknown`, `Record<string, unknown>` ni un catch-all para materializarse;
32. `SimulationMatch` queda definido explícitamente y no requiere
    `unknown`, `Record<string, unknown>` ni un catch-all para materializarse;
33. un carril no requerido se representa con `required = false` y
    `result = null`, sin crear un cuarto resultado simulado;
34. los matches hipotéticos conservan efecto, carril, procedencia y
    referencia de fuente sin redefinir silenciosamente la decisión simulada;
35. `lane = ALL` solo puede materializarse con `effect = DENY`, preservando
    la semántica de denegación transversal vigente.

---

#### 47. Continuidad

**ÚLTIMA TAREA APROBADA**

`AUTH-CTX-002 — Diseñar AuthorizationDecision canónica`

**TAREA ACTUAL APROBADA**

`AUTH-CTX-003 — Diseñar SimulationContext separado`

**SIGUIENTE TAREA RESERVADA**

`AUTH-CTX-004 — Versionar los contratos de respuesta`


### ✅ AUTH-CTX-004 — Versionar los contratos de respuesta

**Estado:** APROBADA  
**Bloque:** BLOQUE E — Contexto y decisión de autorización unificados  
**Naturaleza:** Publicación y congelación documental de contratos  
**Implementación física:** No incluida  
**Tarea anterior vigente:** AUTH-CTX-003 — APROBADA  
**Tarea posterior reservada:** AUTH-CTX-005 — Incluir principal autenticado  
**Familia contractual:** `vento.authorization.response-contracts@1.0.0`  
**Perfil de serialización:** `vento.canonical-json@1.0.0`  
**Huella contractual de publicación:** `sha256:782a216c4bbfdc3b3cec1bbd7239c05d93edd7fa34b4ce62cad48c1e6b9941cd`  
**Cambios físicos permitidos:** No

Esta tarea publica y congela la primera versión contractual de las
respuestas diseñadas en:

- AUTH-CTX-001 — `AccessContext`;
- AUTH-CTX-002 — `AuthorizationDecision`;
- AUTH-CTX-003 — `SimulationContext`;
- el resultado subordinado `SimulatedAuthorizationDecision`.

No crea tipos TypeScript, JSON Schema, Zod, funciones SQL, RPC, tablas,
migraciones, RLS, adaptadores, paquetes ni cambios físicos en Supabase.

---

#### 1. Objetivo

Establecer un sistema de versionado que permita:

1. identificar inequívocamente cada contrato;
2. distinguir semántica, forma serializada e implementación;
3. evolucionar respuestas sin romper consumidores silenciosamente;
4. detectar productores y consumidores incompatibles;
5. impedir downgrades o upgrades implícitos;
6. conservar decisiones históricas con su versión exacta;
7. permitir convivencia temporal mediante adaptadores explícitos;
8. separar versiones de contratos, catálogo, datasets y evaluadores;
9. registrar huellas reproducibles;
10. reservar la implementación física para tareas posteriores.

---

#### 2. Decisión principal

Se publica la familia:

```text
vento.authorization.response-contracts@1.0.0
```

con cuatro contratos identificables:

```text
AccessContext@1.0.0
AuthorizationDecision@1.0.0
SimulationContext@1.0.0
SimulatedAuthorizationDecision@1.0.0
```

Cada contrato tendrá dos versiones independientes:

```text
contract_version
→ semántica empresarial y reglas normativas

schema_version
→ forma serializada y estructura de campos
```

En la primera publicación:

```text
contract_version = 1.0.0
schema_version = 1.0.0
```

La coincidencia inicial no obliga a que ambas versiones evolucionen juntas.

---

#### 3. Identificadores congelados

| Elemento               | Identificador                            | Versión |
| ---------------------- | ---------------------------------------- | ------- |
| Familia                | `vento.authorization.response-contracts` | `1.0.0` |
| Contexto real          | `AccessContext`                          | `1.0.0` |
| Decisión real          | `AuthorizationDecision`                  | `1.0.0` |
| Contexto simulado      | `SimulationContext`                      | `1.0.0` |
| Decisión simulada      | `SimulatedAuthorizationDecision`         | `1.0.0` |
| Serialización canónica | `vento.canonical-json`                   | `1.0.0` |

No se utilizarán como identificadores contractuales:

- nombre de función SQL;
- ruta HTTP;
- nombre de paquete npm;
- nombre de tabla;
- nombre de repositorio;
- nombre de aplicación consumidora;
- fecha de despliegue;
- commit de una implementación concreta.

---

#### 4. Metadatos obligatorios comunes

Todos los contratos deberán declarar en su raíz:

```ts
type ContractMetadata = {
  contract_family: "vento.authorization.response-contracts";
  contract_family_version: "1.0.0";

  contract_name:
    | "AccessContext"
    | "AuthorizationDecision"
    | "SimulationContext"
    | "SimulatedAuthorizationDecision";

  contract_version: string;
  schema_version: string;
};
```

Los campos previamente diseñados se conservan.

Por tanto, las raíces publicadas quedan conceptualmente así:

```ts
type AccessContextV1 = ContractMetadata & {
  contract_name: "AccessContext";
  contract_version: "1.0.0";
  schema_version: "1.0.0";
  context_id: string;
  resolved_at: string;
  // demás campos aprobados en AUTH-CTX-001
};
```

```ts
type AuthorizationDecisionV1 = ContractMetadata & {
  contract_name: "AuthorizationDecision";
  contract_version: "1.0.0";
  schema_version: "1.0.0";
  decision_id: string;
  decided_at: string;
  // demás campos aprobados en AUTH-CTX-002
};
```

```ts
type SimulationContextV1 = ContractMetadata & {
  contract_name: "SimulationContext";
  contract_version: "1.0.0";
  schema_version: "1.0.0";
  simulation_id: string;
  created_at: string;
  expires_at: string;
  // demás campos aprobados en AUTH-CTX-003
};
```

```ts
type SimulatedAuthorizationDecisionV1 = ContractMetadata & {
  contract_name: "SimulatedAuthorizationDecision";
  contract_version: "1.0.0";
  schema_version: "1.0.0";
  simulated_decision_id: string;
  evaluated_at: string;
  // demás campos aprobados en AUTH-CTX-003
};
```

---

#### 5. Versiones que deben permanecer separadas

La respuesta podrá referenciar varias versiones simultáneamente.

| Versión                         | Qué identifica                                      |
| ------------------------------- | --------------------------------------------------- |
| `contract_family_version`       | Publicación coordinada de la familia de respuestas. |
| `contract_version`              | Semántica normativa del contrato específico.        |
| `schema_version`                | Estructura serializada del contrato específico.     |
| `catalog_version`               | Catálogo de aplicaciones y permisos utilizado.      |
| `catalog_hash`                  | Archivos físicos exactos del catálogo publicado.    |
| `contract_release_hash`         | Snapshot documental del catálogo de autorización.   |
| `dataset_version`               | Versión de una matriz o dataset de autorización.    |
| `dataset_hash`                  | Contenido exacto del dataset utilizado.             |
| `resolver_version`              | Implementación que produjo `AccessContext`.         |
| `evaluator_version`             | Implementación que produjo una decisión.            |
| `serialization_profile_version` | Reglas de serialización canónica.                   |

Regla:

```text
contract_version
≠ catalog_version
≠ dataset_version
≠ evaluator_version
```

Actualizar una implementación no cambia automáticamente el contrato.

Publicar un nuevo catálogo no cambia automáticamente el esquema de la
respuesta.

---

#### 6. Semántica de versiones

Se adopta versionado semántico:

```text
MAJOR.MINOR.PATCH
```

Ejemplo:

```text
1.4.2
│ │ └── PATCH
│ └──── MINOR
└────── MAJOR
```

##### 6.1 `MAJOR`

Se incrementa cuando existe incompatibilidad normativa o estructural.

Ejemplos:

- eliminar un campo obligatorio;
- renombrar un campo;
- cambiar el tipo de un campo;
- cambiar el significado de un campo existente;
- cambiar `ALLOW`/`DENY` por otra semántica;
- mezclar actor real y sujeto simulado;
- cambiar la precedencia de denegaciones;
- cambiar la composición de modalidades;
- convertir `null` en alcance global;
- permitir mutaciones mediante simulación;
- cambiar un campo opcional a obligatorio;
- eliminar un valor de enum vigente;
- cambiar el identificador del contrato;
- modificar la interpretación de un resultado histórico.

##### 6.2 `MINOR`

Se incrementa por extensiones compatibles y explícitas.

Ejemplos:

- agregar un campo opcional;
- agregar una razón estructurada nueva;
- agregar metadatos de auditoría opcionales;
- agregar una proyección segura nueva;
- agregar una categoría de procedencia;
- agregar un propósito de simulación;
- agregar un tipo de recurso sin cambiar los existentes;
- agregar una capacidad de explicación no obligatoria.

Un cambio `MINOR` solo será compatible si el consumidor cumple la política
de campos y enums desconocidos definida en esta tarea.

##### 6.3 `PATCH`

Se incrementa por correcciones compatibles que no cambian la semántica
normativa.

Ejemplos:

- corregir documentación;
- corregir ejemplos;
- aclarar una descripción sin cambiar el significado;
- agregar mensajes seguros equivalentes;
- corregir metadatos no autoritativos;
- corregir serialización sin alterar valores contractuales.

---

#### 7. Versión del contrato frente a versión del esquema

##### Cambio semántico sin cambio de forma

Ejemplo:

```text
mismo campo
+
significado normativo distinto
```

Resultado:

```text
contract_version cambia
schema_version puede permanecer
```

Si el cambio rompe la interpretación anterior:

```text
contract_version → MAJOR
```

##### Cambio de forma compatible sin cambio semántico

Ejemplo:

```text
nuevo campo opcional de diagnóstico
```

Resultado:

```text
schema_version → MINOR
contract_version puede permanecer
```

##### Cambio de forma incompatible

Ejemplo:

```text
campo obligatorio renombrado
```

Resultado:

```text
schema_version → MAJOR
contract_version → MAJOR
```

cuando el campo participa en la semántica contractual.

---

#### 8. Política de compatibilidad del productor

Todo productor deberá:

1. emitir `contract_family`;
2. emitir `contract_family_version`;
3. emitir `contract_name`;
4. emitir `contract_version`;
5. emitir `schema_version`;
6. respetar el perfil de serialización;
7. completar todos los campos obligatorios;
8. emitir valores explícitos `null` o listas vacías cuando corresponda;
9. no omitir silenciosamente campos obligatorios;
10. no emitir una versión distinta a la declarada;
11. registrar su `resolver_version` o `evaluator_version`;
12. registrar catálogo y datasets utilizados cuando participen;
13. fallar cerrado ante una publicación incompleta;
14. no adaptar la respuesta según heurísticas del cliente.

---

#### 9. Política de compatibilidad del consumidor

Todo consumidor deberá declarar:

```text
accepted_contract_name
accepted_contract_major_versions
accepted_schema_major_versions
```

Ejemplo conceptual:

```text
contract_name = AuthorizationDecision
accepted_contract_major_versions = [1]
accepted_schema_major_versions = [1]
```

El consumidor deberá:

- aceptar campos opcionales desconocidos;
- no asumir orden de propiedades JSON;
- no inferir autoridad por ausencia de campos desconocidos;
- tratar un campo obligatorio ausente como contrato inválido;
- tratar un enum crítico desconocido como incompatibilidad;
- no convertir un valor desconocido en `ALLOW`;
- no ignorar `contract_version`;
- no aceptar otro `contract_name`;
- no deserializar `SimulationContext` como `AccessContext`;
- no deserializar `WOULD_ALLOW` como `ALLOW`.

---

#### 10. Campos desconocidos

##### Campo opcional desconocido

Regla:

```text
campo opcional desconocido
→ conservar o ignorar de forma segura
→ no alterar decisión
```

##### Campo obligatorio desconocido

Un consumidor antiguo no puede saber por sí solo que un campo nuevo es
obligatorio.

Por tanto:

```text
agregar campo obligatorio
→ cambio MAJOR
```

##### Campo obligatorio ausente

```text
missing_required_field
→ CONTRACT_INVALID
→ fail closed
```

No se aplicará un valor predeterminado permisivo.

---

#### 11. Enums desconocidos

Se distinguen enums críticos y extensibles.

##### 11.1 Enums críticos

Incluyen como mínimo:

- `contract_name`;
- `authorization_requirement`;
- `final_decision.outcome`;
- `LaneDecision.outcome`;
- `SimulationStatus`;
- `SimulatedAuthorizationDecision.final_result`;
- estados de resolución de recurso;
- clases de denegación;
- severidades bloqueantes.

Regla:

```text
enum crítico desconocido
→ CONTRACT_INCOMPATIBLE
→ fail closed
```

##### 11.2 Enums extensibles

Podrán incluir:

- categorías informativas;
- mensajes seguros;
- propósitos adicionales;
- metadatos no autoritativos;
- clases de diagnóstico no bloqueantes.

Regla:

```text
enum extensible desconocido
→ preservar código
→ usar fallback seguro
→ no transformar en allow
```

Cada campo deberá clasificarse explícitamente como crítico o extensible en
el schema físico futuro.

---

#### 12. Resultados congelados

##### Decisión real

```text
ALLOW
DENY
```

No se agregará un tercer resultado real compatible dentro de la versión
mayor `1`.

Agregar un resultado real nuevo exige:

```text
AuthorizationDecision contract_version → 2.0.0
schema_version → 2.0.0
```

##### Decisión simulada

```text
WOULD_ALLOW
WOULD_DENY
INDETERMINATE
```

Estos valores no son intercambiables con resultados reales.

Eliminar, fusionar o reinterpretar cualquiera exige versión mayor.

---

#### 13. Compatibilidad de `AccessContext`

Dentro de `AccessContext@1.x` permanecen invariantes:

- principal separado de actor efectivo;
- identidad de dominio separada de empleado;
- rol base separado de rol operativo;
- cobertura administrativa separada del contexto operativo;
- turno separado de check-in;
- dispositivo separado del actor;
- problemas estructurales explícitos;
- `null` no significa global;
- listas vacías significan ausencia;
- la ausencia de turno no invalida automáticamente el carril base;
- el contrato no contiene la decisión final;
- el contrato no contiene simulación.

Romper cualquiera exige `AccessContext@2.0.0`.

---

#### 14. Compatibilidad de `AuthorizationDecision`

Dentro de `AuthorizationDecision@1.x` permanecen invariantes:

- decisión por aplicación exacta;
- decisión por permiso exacto;
- decisión por recurso exacto;
- resolución de territorio en servidor;
- modalidad obtenida del catálogo;
- carriles base y operativo separados;
- deny estructural por encima de todo allow;
- actor-wide deny por encima de allows;
- lane deny por encima de allow del mismo carril;
- denegación por defecto;
- composición exacta de las cuatro modalidades;
- resultado real exclusivamente `ALLOW` o `DENY`;
- la decisión no es token de capacidad;
- la UI no sustituye evaluación de servidor.

Romper cualquiera exige `AuthorizationDecision@2.0.0`.

---

#### 15. Compatibilidad de `SimulationContext`

Dentro de `SimulationContext@1.x` permanecen invariantes:

- actor real separado de sujeto simulado;
- `auth.uid()` real e inmutable;
- sin cambios de RLS;
- sin mutaciones;
- `WOULD_ALLOW` no ejecutable;
- datos reales limitados por autoridad real;
- procedencia explícita de valores hipotéticos;
- expiración obligatoria;
- auditoría atribuida al actor real;
- resultado separado mediante `SimulatedAuthorizationDecision`;
- escenarios incompletos no producen `WOULD_ALLOW`.

Romper cualquiera exige `SimulationContext@2.0.0`.

---

#### 16. Compatibilidad entre contratos

Matriz inicial:

| Productor                            | Consumidor esperado                             |  Compatible |
| ------------------------------------ | ----------------------------------------------- | ----------: |
| `AccessContext@1.x`                  | Evaluador real que acepta major 1               |          Sí |
| `AccessContext@1.x`                  | Evaluador simulado mediante adaptador explícito | Condicional |
| `SimulationContext@1.x`              | Evaluador real                                  |          No |
| `AuthorizationDecision@1.x`          | UI real compatible con major 1                  |          Sí |
| `SimulatedAuthorizationDecision@1.x` | UI real de ejecución                            |          No |
| `SimulatedAuthorizationDecision@1.x` | UI de simulación compatible                     |          Sí |
| `AuthorizationDecision@1.x`          | Consumidor que solo acepta major 2              |          No |
| Contrato sin versión                 | Cualquier consumidor canónico                   |          No |

---

#### 17. Downgrade y upgrade

Queda prohibido:

```text
respuesta 2.x
→ consumidor 1.x
→ borrar campos hasta que parezca 1.x
```

También:

```text
respuesta 1.x
→ consumidor 2.x
→ asumir campos o semántica 2.x
```

Regla:

```text
silent_downgrade = false
silent_upgrade = false
```

Toda conversión requiere:

- adaptador identificado;
- versión origen;
- versión destino;
- reglas deterministas;
- pruebas contractuales;
- auditoría;
- límites de información;
- periodo de retiro;
- rollback.

---

#### 18. Adaptadores

Forma conceptual:

```ts
type ContractAdapterMetadata = {
  adapter_id: string;
  adapter_version: string;

  source_contract_name: string;
  source_contract_version_range: string;
  source_schema_version_range: string;

  target_contract_name: string;
  target_contract_version: string;
  target_schema_version: string;

  lossless: boolean;
  dropped_fields: string[];
  synthesized_fields: string[];
};
```

Reglas:

1. un adaptador no inventa autoridad;
2. un campo autoritativo faltante no se sintetiza mediante fallback
   permisivo;
3. una conversión con pérdida deberá declararse;
4. un resultado simulado nunca se adapta a decisión real;
5. un adaptador legacy no puede omitir denegaciones;
6. los adaptadores se implementarán y probarán en BLOQUE R;
7. la compatibilidad con `get_operational_context` se diseñará en
   AUTH-CTX-028.

---

#### 19. Deprecación

Estados contractuales:

```text
ACTIVE
DEPRECATED
SUNSET
RETIRED
```

##### `ACTIVE`

Versión soportada para nuevos consumidores.

##### `DEPRECATED`

Sigue funcionando, pero no debe adoptarse en consumidores nuevos.

##### `SUNSET`

Tiene retiro aprobado y consumidores migrándose.

##### `RETIRED`

No se produce ni se acepta en caminos canónicos.

Una versión no podrá pasar a `RETIRED` sin:

- inventario de consumidores;
- telemetría suficiente;
- adaptador o migración aprobada;
- pruebas;
- rollback;
- decisión documental;
- ausencia de consumidores críticos sin migrar.

No se fija todavía una duración temporal universal.

---

#### 20. Reglas para cambios correctivos de implementación

Una implementación puede contener un bug respecto al contrato vigente.

Ejemplo:

```text
contrato 1.0.0
→ deny debe prevalecer

implementación
→ allow prevalece por error
```

La corrección:

- incrementa `evaluator_version`;
- no cambia necesariamente `contract_version`;
- no reescribe decisiones históricas;
- debe registrar el despliegue;
- debe ejecutar pruebas de regresión;
- puede cambiar resultados futuros porque corrige incumplimiento.

Si para justificar la conducta se cambia la norma, entonces sí corresponde
una nueva versión contractual.

---

#### 21. Decisiones históricas

Una decisión persistida deberá conservar como mínimo:

```text
contract_family_version
contract_name
contract_version
schema_version
catalog_version
catalog_hash
contract_release_hash
dataset_versions
dataset_hashes
resolver_version o evaluator_version
serialization_profile_version
```

Reglas:

- una decisión histórica se interpreta con su versión original;
- no se reinterpreta automáticamente con el contrato actual;
- no se recalcula silenciosamente;
- una vista histórica podrá aplicar adaptadores de lectura explícitos;
- la evidencia original permanece inmutable.

---

#### 22. Perfil de serialización

Se publica:

```text
vento.canonical-json@1.0.0
```

Reglas:

1. codificación UTF-8;
2. nombres de campos en `snake_case`;
3. timestamps RFC 3339 en UTC;
4. identificadores como strings;
5. booleanos JSON reales;
6. `null` explícito cuando el campo admite ausencia;
7. listas vacías explícitas;
8. objetos sin claves duplicadas;
9. números sin representación ambigua;
10. sin `NaN`, `Infinity` o valores no JSON;
11. sin dependencia del orden de propiedades;
12. enums mediante códigos canónicos;
13. sin datos secretos;
14. sin HTML dentro de campos estructurados;
15. sin campos autoritativos calculados por el cliente.

---

#### 23. Serialización para hashing

Cuando se requiera una huella de payload:

- UTF-8 sin BOM;
- saltos LF;
- claves ordenadas lexicográficamente;
- objetos normalizados recursivamente;
- arrays conservan orden cuando sea semántico;
- arrays se ordenan cuando el contrato declare que son conjuntos;
- timestamps normalizados a UTC;
- sin espacios insignificantes;
- sin campos volátiles excluidos por el perfil;
- SHA-256 sobre bytes canónicos.

Los timestamps de ejecución no forman parte de la huella contractual de
publicación de esta tarea.

---

#### 24. Huellas diferenciadas

```text
response_contract_release_hash
→ identifica esta publicación documental

response_schema_hash
→ identificará archivos físicos de schemas

response_payload_hash
→ podrá identificar una respuesta concreta

catalog_hash
→ identifica catálogo físico

dataset_hash
→ identifica dataset físico

evaluator_build_hash
→ identifica implementación desplegada
```

Ninguna huella sustituye a las demás.

---

#### 25. Huella de esta publicación

Campo publicado:

```text
response_contract_release_hash =
sha256:782a216c4bbfdc3b3cec1bbd7239c05d93edd7fa34b4ce62cad48c1e6b9941cd
```

Payload canónico:

```text
contract_family_id=vento.authorization.response-contracts
contract_family_version=1.0.0
release_kind=contractual_snapshot
access_context.contract_name=AccessContext
access_context.contract_version=1.0.0
access_context.schema_version=1.0.0
authorization_decision.contract_name=AuthorizationDecision
authorization_decision.contract_version=1.0.0
authorization_decision.schema_version=1.0.0
simulation_context.contract_name=SimulationContext
simulation_context.contract_version=1.0.0
simulation_context.schema_version=1.0.0
simulated_authorization_decision.contract_name=SimulatedAuthorizationDecision
simulated_authorization_decision.contract_version=1.0.0
simulated_authorization_decision.schema_version=1.0.0
serialization_profile=vento.canonical-json
serialization_profile_version=1.0.0
compatibility_policy=semantic_versioning_strict_major
unknown_optional_fields=ignore
unknown_critical_enum=fail_closed
missing_required_field=contract_invalid
silent_downgrade=false
silent_upgrade=false
real_decision_outcomes=ALLOW,DENY
simulated_decision_outcomes=WOULD_ALLOW,WOULD_DENY,INDETERMINATE
physical_changes_allowed=false
next_task=AUTH-CTX-005
source_task=AUTH-CTX-001
source_task=AUTH-CTX-002
source_task=AUTH-CTX-003
```

Algoritmo:

- UTF-8 sin BOM;
- saltos LF;
- una asignación por línea;
- campos en el orden publicado;
- sin espacios finales;
- un único LF final;
- SHA-256 sobre todos los bytes.

Resultado:

```text
782a216c4bbfdc3b3cec1bbd7239c05d93edd7fa34b4ce62cad48c1e6b9941cd
```

Esta huella identifica la decisión documental congelada.

No es el futuro hash de archivos TypeScript, JSON Schema o SQL.

---

#### 26. Negociación de versión

La implementación futura deberá preferir negociación explícita.

Ejemplo conceptual:

```text
consumer_accepts:
  AccessContext:
    contract_major: [1]
    schema_major: [1]
```

El productor deberá responder con una versión compatible o fallar.

No se permite:

- entregar la versión más reciente sin revisar compatibilidad;
- interpretar ausencia de versión como `latest`;
- usar user-agent para inferir contrato;
- entregar contratos distintos con el mismo identificador;
- negociar una decisión simulada como real.

La forma física de negociación se definirá en AUTH-CTX-025 a
AUTH-CTX-028.

---

#### 27. Errores de versión

Códigos conceptuales:

```text
contract_name_missing
contract_version_missing
schema_version_missing
contract_family_mismatch
unsupported_contract_major
unsupported_schema_major
contract_schema_incompatible
contract_hash_mismatch
catalog_version_incompatible
dataset_version_incompatible
serialization_profile_unsupported
adapter_required
adapter_not_available
```

Regla para autorización real:

```text
error de versión crítico
→ CONTRACT_INVALID
→ DENY
```

Regla para simulación:

```text
error de versión crítico
→ INDETERMINATE o INVALID
→ nunca WOULD_ALLOW
```

---

#### 28. Nuevos campos y consumidores exhaustivos

Todo consumidor deberá evitar lógica exhaustiva frágil sobre campos
extensibles.

Ejemplo prohibido:

```ts
switch (reason.category) {
  case "SHIFT":
  case "CHECKIN":
    return render();
  default:
    throw new Error();
}
```

Para enums extensibles deberá existir un fallback seguro.

Para enums críticos, el fallback será incompatibilidad y fail closed.

Agregar un valor a un enum crítico dentro de la misma major solo será
posible cuando el contrato del campo ya lo haya declarado extensible.

---

#### 29. Reglas por tipo de consumidor

##### UI

- puede ignorar metadatos opcionales;
- no puede ignorar `outcome`;
- no convierte error de versión en acceso;
- muestra mensaje seguro de incompatibilidad;
- no reconstruye decisiones.

##### Server Action o API

- valida versiones antes de actuar;
- no confía en respuestas entregadas por el cliente;
- reevalúa cuando corresponde;
- falla cerrado.

##### RPC y RLS

- deben implementar la misma major contractual;
- no usan respuestas antiguas sin adaptador;
- no interpretan simulación como autorización real.

##### Auditoría

- conserva versiones y hashes exactos;
- permite lectura histórica;
- no reescribe payloads.

##### Jobs y automatizaciones

- declaran versión aceptada;
- detienen o aíslan procesamiento incompatible;
- no continúan con defaults permisivos.

---

#### 30. Relación con el catálogo `vento.authorization@1.0.0`

La primera familia de respuestas se diseña para consumir:

```text
catalog_version = 1.0.0
```

y la publicación contractual:

```text
contract_release_hash =
sha256:687e1bc19c0cf7332e76ed940cf5a23b829492ebbee399af718fd326cf473cbe
```

Esto no significa que los contratos de respuesta deban cambiar de versión
cada vez que cambia el catálogo.

Ejemplo:

```text
AccessContext@1.0.0
AuthorizationDecision@1.0.0
+
catalog_version=1.1.0
```

puede ser válido si:

- la semántica de las respuestas no cambia;
- los nuevos valores son compatibles;
- el consumidor acepta la versión del catálogo;
- no se agregan enums críticos incompatibles.

---

#### 31. Relación con datasets

Una respuesta deberá declarar los datasets realmente utilizados.

Ejemplo conceptual:

```ts
dataset_references: [
  {
    dataset_id: "vento.authorization.base-role-grants",
    dataset_version: "1.0.0",
    dataset_hash: "sha256:..."
  },
  {
    dataset_id: "vento.authorization.operational-role-grants",
    dataset_version: "1.0.0",
    dataset_hash: "sha256:..."
  },
  {
    dataset_id: "vento.authorization.individual-overrides",
    dataset_version: "1.0.0",
    dataset_hash: "sha256:..."
  }
]
```

La ausencia de un dataset obligatorio o una incompatibilidad produce fail
closed.

---

#### 32. Compatibilidad con consumidores legacy

Los consumidores actuales que dependan de:

- `get_operational_context`;
- cookies de role override;
- respuestas booleanas;
- permisos sin recurso;
- campos legacy;
- roles hardcodeados;

no se consideran automáticamente compatibles con la familia `1.0.0`.

Deberán:

```text
inventariarse
→ clasificarse
→ adaptar explícitamente
→ probarse
→ migrarse
→ retirarse
```

La estrategia concreta se definirá en AUTH-CTX-028.

---

#### 33. Publicación física futura

La publicación física deberá generar como mínimo:

- tipos TypeScript;
- schemas de validación;
- fixtures;
- ejemplos válidos;
- ejemplos inválidos;
- pruebas de compatibilidad;
- hashes físicos;
- changelog;
- matriz productor–consumidor;
- adaptadores aprobados;
- reglas de deprecación.

No se crean en AUTH-CTX-004.

---

#### 34. Pruebas contractuales mínimas futuras

Se deberá probar:

1. contrato sin versión;
2. nombre de contrato incorrecto;
3. major compatible;
4. major incompatible;
5. minor superior compatible;
6. campo opcional desconocido;
7. campo obligatorio ausente;
8. enum crítico desconocido;
9. enum extensible desconocido;
10. schema incompatible;
11. hash incorrecto;
12. catálogo incompatible;
13. dataset incompatible;
14. downgrade silencioso;
15. upgrade silencioso;
16. adaptador lossless;
17. adaptador con pérdida declarada;
18. `WOULD_ALLOW` entregado a consumidor real;
19. decisión histórica interpretada con su versión;
20. corrección de evaluador sin cambio contractual;
21. cambio semántico que exige major;
22. cambio opcional que exige minor;
23. aclaración documental que exige patch;
24. consumidor legacy sin adaptador;
25. serialización canónica reproducible.

El plan completo de pruebas corresponde a AUTH-CTX-030.

---

#### 35. Invariantes

1. Todo contrato declara nombre y versión.
2. Todo contrato declara schema version.
3. La familia se identifica explícitamente.
4. La semántica y el esquema se versionan por separado.
5. El catálogo se versiona por separado.
6. Los datasets se versionan por separado.
7. El evaluador se versiona por separado.
8. La primera versión de cada contrato es `1.0.0`.
9. Un cambio incompatible incrementa major.
10. Un campo obligatorio nuevo incrementa major.
11. Un campo opcional compatible incrementa minor.
12. Una aclaración no semántica incrementa patch.
13. Campos opcionales desconocidos no conceden autoridad.
14. Enums críticos desconocidos fallan cerrado.
15. Campos obligatorios ausentes fallan cerrado.
16. No existe downgrade silencioso.
17. No existe upgrade silencioso.
18. Todo adaptador es explícito y versionado.
19. Una decisión simulada nunca se adapta a decisión real.
20. `ALLOW` y `DENY` permanecen congelados en major 1.
21. `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE` permanecen congelados en
    major 1.
22. Una decisión histórica conserva sus versiones originales.
23. El orden JSON no participa en semántica.
24. `null` no se reinterpreta durante adaptación.
25. La incompatibilidad real produce `DENY`.
26. La incompatibilidad simulada no produce `WOULD_ALLOW`.
27. Las versiones no se infieren por ruta o nombre de función.
28. El hash documental no sustituye hashes físicos.
29. Los consumidores deben declarar majors aceptadas.
30. La implementación física queda reservada para BLOQUE R.

---

#### 36. Antipatrones prohibidos

```ts
const version = response.contract_version ?? "latest";
const allowed = response.final_decision !== "DENY";
const role = legacy.role ?? response.base_role;
const result = simulated.final_result.replace("WOULD_", "");
```

También queda prohibido:

```text
sin versión → asumir 1.0.0
major desconocida → intentar de todos modos
enum desconocido → ALLOW
campo obligatorio ausente → usar null permisivo
respuesta 2.x → borrar campos hasta parecer 1.x
SimulationContext → AccessContext
WOULD_ALLOW → ALLOW
hash documental → hash de archivos
versión de catálogo → versión de respuesta
```

---

#### 37. Estado de publicación

| Contrato                         | Estado   | Contract version | Schema version |
| -------------------------------- | -------- | ---------------- | -------------- |
| `AccessContext`                  | `ACTIVE` | `1.0.0`          | `1.0.0`        |
| `AuthorizationDecision`          | `ACTIVE` | `1.0.0`          | `1.0.0`        |
| `SimulationContext`              | `ACTIVE` | `1.0.0`          | `1.0.0`        |
| `SimulatedAuthorizationDecision` | `ACTIVE` | `1.0.0`          | `1.0.0`        |

Estado de la familia:

```text
vento.authorization.response-contracts@1.0.0
→ CONTRACTUAL_SNAPSHOT
→ NO PHYSICAL PUBLICATION
```

---

#### 38. Relación con tareas posteriores

##### AUTH-CTX-005 a AUTH-CTX-015

Precisarán nodos internos de `AccessContext`.

Podrán agregar detalle compatible, pero no romper invariantes de
`AccessContext@1.x`.

##### AUTH-CTX-016 a AUTH-CTX-024

Precisarán nodos internos de `AuthorizationDecision`.

Podrán agregar detalle compatible, pero no romper invariantes de
`AuthorizationDecision@1.x`.

##### AUTH-CTX-025 y AUTH-CTX-026

Diseñarán contratos SQL futuros y deberán declarar las versiones que
producen.

##### AUTH-CTX-027

Definirá consumidores centralizados y versiones aceptadas.

##### AUTH-CTX-028

Definirá adaptadores y compatibilidad temporal con
`get_operational_context`.

##### AUTH-CTX-029

Definirá invalidación, caché y vigencia de respuestas.

##### AUTH-CTX-030

Definirá pruebas de contrato y compatibilidad.

##### BLOQUE H

Materializará tipos y contratos compartidos después de las aprobaciones
correspondientes.

##### BLOQUE E3

Definirá ubicación, persistencia y gobierno físico de schemas, auditoría y
versiones.

##### BLOQUE R

Implementará productores, adaptadores y migración de consumidores.

---

#### 39. Fuera del alcance

AUTH-CTX-004 no:

- cambia la semántica de AUTH-CTX-001 a AUTH-CTX-003;
- implementa schemas;
- crea paquetes;
- crea tipos;
- crea SQL;
- crea RPC;
- crea RLS;
- crea migraciones;
- crea adaptadores;
- migra consumidores;
- retira contratos legacy;
- define TTL;
- define caché;
- publica archivos físicos;
- modifica Supabase;
- cambia el catálogo;
- cambia datasets.

---

#### 40. Criterios de aprobación

AUTH-CTX-004 podrá aprobarse cuando se acepte que:

1. la familia se publica como
   `vento.authorization.response-contracts@1.0.0`;
2. `AccessContext` se publica como `1.0.0`;
3. `AuthorizationDecision` se publica como `1.0.0`;
4. `SimulationContext` se publica como `1.0.0`;
5. `SimulatedAuthorizationDecision` se publica como `1.0.0`;
6. `contract_version` y `schema_version` son independientes;
7. se adopta versionado semántico;
8. cambios incompatibles incrementan major;
9. campos opcionales compatibles incrementan minor;
10. aclaraciones compatibles incrementan patch;
11. campos obligatorios nuevos requieren major;
12. enums críticos desconocidos fallan cerrado;
13. campos obligatorios ausentes fallan cerrado;
14. campos opcionales desconocidos se ignoran de forma segura;
15. no existe downgrade silencioso;
16. no existe upgrade silencioso;
17. adaptadores son explícitos y versionados;
18. una decisión simulada no puede adaptarse a real;
19. las versiones de catálogo y datasets permanecen separadas;
20. resolver y evaluador tienen versiones independientes;
21. decisiones históricas conservan sus versiones originales;
22. se publica `vento.canonical-json@1.0.0`;
23. se publica la huella
    `sha256:782a216c4bbfdc3b3cec1bbd7239c05d93edd7fa34b4ce62cad48c1e6b9941cd`;
24. la huella documental no sustituye hashes físicos;
25. consumidores declaran majors aceptadas;
26. incompatibilidad real produce `DENY`;
27. incompatibilidad simulada no produce `WOULD_ALLOW`;
28. la compatibilidad legacy se reserva para AUTH-CTX-028;
29. las pruebas se reservan para AUTH-CTX-030;
30. no se implementa ningún cambio físico.

---

#### 41. Estado final de la propuesta

| Tarea        | Estado      |
| ------------ | ----------- |
| AUTH-CTX-003 | APROBADA    |
| AUTH-CTX-004 | APROBADA    |
| AUTH-CTX-005 | NO INICIADA |

No se avanza a AUTH-CTX-005 hasta recibir aprobación explícita de
AUTH-CTX-004.
