### SECCIÓN — VERSIONADO Y CONSUMO

<!-- PLAN-SECTION-META:START -->
Esta sección reúne contenido canónico con una responsabilidad documental única dentro del plan. Debe conservarse cohesionada y actualizarse junto con sus referencias y validaciones dependientes.

**Cobertura canónica:** `AUTH-CAT-017` a `AUTH-CAT-019` — 3 tareas.
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-CAT-017 — Crear catálogo versionado en `vento-shell`

#### 1. Identificación de la tarea

| Campo                     | Valor                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Bloque                    | BLOQUE C — Catálogo canónico de aplicaciones y permisos                             |
| Tarea                     | AUTH-CAT-017 — Crear catálogo versionado en `vento-shell`                           |
| Estado                    | **APROBADA**                                                                        |
| Naturaleza                | Definición contractual y diseño de implementación                                   |
| Implementación física     | No incluida en esta fase documental                                                 |
| Tarea anterior vigente    | AUTH-CAT-016 — Definir contrato de recurso y resolución territorial de cada permiso |
| Tarea posterior reservada | AUTH-CAT-018 — Crear tipos TypeScript derivados del catálogo                        |

Esta tarea define la forma exacta que deberá tener el catálogo versionado en el repositorio `vento-shell`.

#### Reconciliación documental aprobada — 2026-10-15

El conjunto de **112 permisos** de AUTH-CAT-001..016 se conserva como **snapshot histórico aprobado**; no constituye la membresía vigente. La fuente física de identidad `SHELL-CON-003::GLOBAL` (`VERIFIED`) contiene **140 PermissionKey activas y únicas**, en `packages/contracts/authorization/catalog/versions/1.0.0/permissions.json`. La comparación clave a clave con la matriz original de AUTH-CAT-016 demuestra **112 históricas + 29 incorporadas − 1 retirada = 140 vigentes**.

| Aplicación | Snapshot histórico | Incorporadas | Retiradas | Identidades vigentes |
|---|---:|---:|---:|---:|
| SHELL | 1 | 0 | 0 | 1 |
| ANIMA | 10 | 0 | 0 | 10 |
| AURA | 1 | 0 | 0 | 1 |
| FOGO | 6 | 0 | 0 | 6 |
| NEXO | 63 | 5 | 1 | 67 |
| NUMERA | 6 | 0 | 0 | 6 |
| ORIGO | 5 | 1 | 0 | 6 |
| PASS | 1 | 0 | 0 | 1 |
| PULSO | 2 | 9 | 0 | 11 |
| VISO | 17 | 14 | 0 | 31 |
| **Total** | **112** | **29** | **1** | **140** |

La clave retirada es `nexo.inventory.remissions.dispatch` y no puede reactivarse ni convertirse en alias que conceda otras acciones. `nexo.inventory.remissions.accept_custody`, `nexo.inventory.remissions.start_transit` y `nexo.inventory.remissions.deliver` son permisos independientes. Las 29 incorporaciones se identifican inequívocamente mediante la diferencia entre las dos fuentes versionadas citadas; no se modifican aquí sus identidades.

**Límite de aprobación y precedencia:** `SHELL-CON-003::GLOBAL` certificó solamente `permission_key`, `app_code` y `lifecycle_status`, **no** modalidades, alcances, contratos de recurso, metadatos completos ni grants. `AUTH-CAT-024` congeló documentalmente `vento.authorization@1.0.0` con 140 identidades activas; esta corrección no modifica en sitio el contenido semántico congelado. `AUTH-CAT-025` aprobó posteriormente el sucesor documental `vento.authorization@1.1.0` con los contratos completos de las 29 claves añadidas. Para la futura publicación física debe respetarse esa sucesión, comprobar propiedades, compatibilidades, aliases y hashes, y existir manifiesto `published` y `catalog/current.json`. La revisión 112 → 140 de los conteos prospectivos de AUTH-CAT-017..019 **no** publica ninguna versión ni habilita migraciones, grants, Supabase o despliegues.

No realiza todavía:

- creación de archivos en el repositorio;
- publicación de paquetes;
- cambios en Supabase;
- migraciones;
- generación de tipos TypeScript;
- reemplazo de cadenas escritas manualmente;
- modificación de matrices de roles o excepciones;
- cambios en aplicaciones consumidoras.

La implementación posterior deberá respetar íntegramente este contrato.

#### 2. Problema que se resuelve

Las decisiones aprobadas en AUTH-CAT-001 a AUTH-CAT-016 definen para el snapshot histórico de 112 permisos las propiedades siguientes. La membresía de identidad de 140 claves fue acreditada por SHELL-CON-003 y su ampliación de contratos completos quedó aprobada documentalmente en AUTH-CAT-025@1.1.0; ninguna de esas aprobaciones equivale a release física:

- identidad técnica;
- aplicación, módulo, recurso y acción;
- etiqueta y descripción humanas;
- modalidad de autorización;
- participación del carril operativo;
- solo lectura;
- configuración;
- sensibilidad;
- alcances admitidos y alcance máximo;
- requisitos de turno y check-in;
- requisito de área activa;
- compatibilidad con dispositivo compartido;
- compatibilidad con simulación;
- contrato de recurso y resolución territorial.

Sin un artefacto técnico central y versionado, cada repositorio podría:

- copiar una versión diferente del catálogo;
- omitir propiedades;
- interpretar una clasificación de forma distinta;
- mantener permisos retirados como capacidades activas;
- escribir etiquetas y descripciones divergentes;
- resolver recursos con reglas incompatibles;
- modificar silenciosamente una capacidad existente;
- desplegar código que utiliza una versión distinta a la registrada en auditoría;
- reconstruir manualmente permisos mediante cadenas de texto.

Estas prácticas quedan prohibidas.

#### 3. Decisión principal

El catálogo canónico de autorización deberá existir como un artefacto inmutable, validado y versionado dentro de:

```text
vento-shell
└── packages
    └── contracts
        └── authorization
```

El nombre lógico del paquete será:

```text
@vento/contracts
```

El subpath público reservado será:

```text
@vento/contracts/authorization
```

Regla principal:

> **VENTO-SHELL ES LA FUENTE TÉCNICA CANÓNICA DE LOS CONTRATOS DE AUTORIZACIÓN. LAS APLICACIONES CONSUMEN EL CATÁLOGO; NO LO REDEFINEN.**

La base de datos podrá conservar una proyección, snapshot o versión aplicada, pero no podrá modificar por sí sola el significado contractual del permiso.

#### 4. Separación de fuentes de verdad

| Fuente                               | Responsabilidad                                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Documento canónico aprobado          | Fuente normativa de decisiones y justificación empresarial.                                     |
| Catálogo versionado en `vento-shell` | Fuente técnica canónica consumible por código, validadores, generadores y migraciones.          |
| Supabase                             | Fuente de verdad de datos operativos, asignaciones, contexto, estados y evidencia en ejecución. |
| Repositorios de aplicaciones         | Implementan superficies y procesos utilizando el contrato importado.                            |

No se permite:

```text
SUPABASE
→ redefinir modalidad, sensibilidad o recurso

APLICACIÓN
→ mantener una copia local modificada

ROL
→ determinar propiedades del permiso

RUTA
→ convertirse automáticamente en permiso
```

#### 5. Identidad del catálogo inicial

La primera publicación técnica derivada de AUTH-CAT-001 a AUTH-CAT-016 tendrá:

| Propiedad                 | Valor inicial                                      |
| ------------------------- | -------------------------------------------------- |
| `catalog_id`              | `vento.authorization`                              |
| `catalog_version`         | `1.0.0`                                            |
| `schema_version`          | `1.0.0`                                            |
| `status`                  | `published` después de validación e implementación |
| `source_range`            | `AUTH-CAT-001..AUTH-CAT-024`                       |
| Permisos activos          | 140                                                |
| Aplicaciones              | 10                                                 |
| Idioma humano principal   | `es-CO`                                            |
| Formato técnico principal | JSON validado mediante JSON Schema                 |
| Integridad                | Hash SHA-256 del contenido normalizado             |

La aprobación documental de AUTH-CAT-017 no equivale a afirmar que la versión física `1.0.0` ya fue publicada.

La publicación ocurrirá únicamente durante la implementación correspondiente.

#### 6. Dos versiones independientes

El catálogo utilizará dos versiones distintas.

##### 6.1 `schema_version`

Indica la forma estructural del archivo:

- campos obligatorios;
- tipos de datos;
- enums;
- relaciones internas;
- reglas de serialización.

Cambiar la forma del catálogo puede modificar `schema_version` sin cambiar el significado de los permisos.

##### 6.2 `catalog_version`

Indica el contenido contractual:

- permisos incluidos;
- propiedades de cada permiso;
- aliases;
- estados de ciclo de vida;
- contratos de recurso;
- compatibilidad.

Regla:

```text
MISMO SCHEMA
+
CONTENIDO CONTRACTUAL DIFERENTE
=
NUEVA CATALOG_VERSION
```

#### 7. Estructura física objetivo

La estructura de implementación deberá ser equivalente a:

```text
packages/contracts/
├── package.json
├── README.md
├── authorization/
│   ├── catalog/
│   │   ├── current.json
│   │   └── versions/
│   │       └── 1.0.0/
│   │           ├── manifest.json
│   │           ├── applications.json
│   │           ├── permissions.json
│   │           ├── aliases.json
│   │           ├── legacy-permissions.json
│   │           ├── retired-permissions.json
│   │           ├── resource-contracts.json
│   │           └── checksums.json
│   ├── schemas/
│   │   ├── catalog-manifest.schema.json
│   │   ├── application.schema.json
│   │   ├── permission.schema.json
│   │   ├── alias.schema.json
│   │   └── resource-contract.schema.json
│   ├── changelog/
│   │   └── 1.0.0.md
│   └── README.md
└── scripts/
    └── validate-authorization-catalog.mjs
```

La implementación podrá ajustar nombres internos menores cuando exista una limitación técnica real, pero deberá conservar:

- una versión inmutable;
- un manifiesto;
- datos activos separados de aliases y retirados;
- esquemas de validación;
- checksums;
- changelog;
- un puntero explícito a la versión vigente;
- validación automatizada.

#### 8. Regla del puntero `current`

`current.json` no contendrá una copia del catálogo.

Contendrá únicamente una referencia explícita:

```json
{
  "catalog_id": "vento.authorization",
  "catalog_version": "1.0.0",
  "schema_version": "1.0.0",
  "manifest_path": "./versions/1.0.0/manifest.json"
}
```

Actualizar `current.json` activa una nueva versión para consumidores que sigan la versión vigente.

Una versión publicada dentro de `versions/<catalog_version>/` nunca se edita en sitio.

Correcciones posteriores producen otra versión.

#### 9. Manifiesto obligatorio

`manifest.json` deberá contener como mínimo:

| Campo               | Regla                                                          |
| ------------------- | -------------------------------------------------------------- |
| `catalog_id`        | Identidad estable del catálogo.                                |
| `catalog_version`   | Versión semántica del contenido.                               |
| `schema_version`    | Versión de la estructura.                                      |
| `status`            | `draft`, `candidate`, `published`, `superseded` o `withdrawn`. |
| `published_at`      | Fecha efectiva de publicación; nula mientras sea borrador.     |
| `effective_at`      | Momento a partir del cual puede activarse.                     |
| `supersedes`        | Versión anterior reemplazada, cuando exista.                   |
| `source_tasks`      | Tareas documentales que respaldan la publicación.              |
| `permission_count`  | Cantidad esperada de permisos activos.                         |
| `application_count` | Cantidad esperada de aplicaciones.                             |
| `files`             | Archivos integrantes y hash de cada uno.                       |
| `catalog_hash`      | Hash del catálogo completo normalizado.                        |
| `compatibility`     | Versiones de esquema y consumidores admitidas.                 |
| `release_notes`     | Ruta al changelog de la versión.                               |

Ejemplo conceptual:

```json
{
  "catalog_id": "vento.authorization",
  "catalog_version": "1.0.0",
  "schema_version": "1.0.0",
  "status": "published",
  "published_at": "2026-07-18T00:00:00Z",
  "effective_at": "2026-07-18T00:00:00Z",
  "supersedes": null,
  "source_tasks": ["AUTH-CAT-001", "AUTH-CAT-016", "AUTH-CAT-022", "AUTH-CAT-024"],
  "permission_count": 140,
  "application_count": 10,
  "catalog_hash": "sha256:<HASH>",
  "compatibility": {
    "schema_major": 1,
    "minimum_consumer_major": 1
  }
}
```

Las fechas del ejemplo no constituyen por sí mismas una publicación real.

#### 10. Registro de aplicaciones

`applications.json` incluirá exactamente las diez aplicaciones canónicas:

| Código   | Dominio | Alcance del roadmap |
| -------- | ------- | ------------------- |
| `shell`  | laboral | core                |
| `anima`  | laboral | core                |
| `viso`   | laboral | core                |
| `nexo`   | laboral | core                |
| `fogo`   | laboral | core                |
| `origo`  | laboral | core                |
| `pulso`  | laboral | core                |
| `numera` | laboral | core                |
| `aura`   | laboral | deferred            |
| `pass`   | cliente | adjacent            |

Cada aplicación declarará como mínimo:

- `app_code`;
- `display_name`;
- `domain`;
- `app_kind`;
- `roadmap_scope`;
- `lifecycle_status`;
- `repository_owner` cuando esté confirmado;
- `permission_namespace`;
- `is_authorization_catalog_member`.

La aplicación `shell` no representa al repositorio `vento-shell`.

La aplicación `pass` no transforma la identidad cliente en identidad laboral.

#### 11. Registro activo de permisos

`permissions.json` contendrá exactamente un objeto por permiso canónico activo.

Cada objeto deberá incluir como mínimo:

##### 11.1 Identidad

- `permission_key`;
- `app_code`;
- `module_code`;
- `resource_code`;
- `action_code`;
- `lifecycle_status`;
- `introduced_in`;
- `deprecated_in`;
- `retired_in`.

##### 11.2 Presentación humana

- `human_label`;
- `human_description`;
- `human_group`;
- `human_sort_order`;
- `human_locale`.

##### 11.3 Clasificación

- `authorization_requirement`;
- `is_operational`;
- `is_read_only`;
- `is_configuration`;
- `is_sensitive`;
- `sensitivity_reason` cuando corresponda.

##### 11.4 Alcance

- `allowed_scopes`;
- `maximum_scope`;
- `allows_own_resource`;
- `allows_third_party_resource`;
- `allows_cross_site_relation`;
- `allows_organizational_non_territorial`.

##### 11.5 Prerrequisitos por carril

- `base_lane.requires_shift`;
- `base_lane.requires_checkin`;
- `operational_lane.requires_shift`;
- `operational_lane.requires_checkin`;
- `operational_lane.area_requirement`.

##### 11.6 Canales y representación

- `shared_device_mode`;
- `simulation_mode`;
- `requires_strong_reauthentication`;

##### 11.7 Recurso

- `resource_contract_id`;
- `resource_type`;
- `resolution_mode`;
- `required_sides`;
- `field_policy_id`;
- `audit_policy_id`.

##### 11.8 Compatibilidad

- `aliases`;
- `replaces`;
- `replaced_by`;
- `consumer_notes`;
- `contract_hash`.

No se permite omitir una propiedad aprobada alegando que puede deducirse en tiempo de ejecución, excepto cuando el esquema la declare expresamente derivada y el validador verifique la derivación.

#### 12. Propiedades derivadas

`is_operational` es una propiedad derivada de `authorization_requirement`.

Regla obligatoria:

| `authorization_requirement` | `is_operational` |
| --------------------------- | ---------------- |
| `BASE_ONLY`                 | `false`          |
| `OPERATIONAL_ONLY`          | `true`           |
| `BASE_OR_OPERATIONAL`       | `true`           |
| `BASE_AND_OPERATIONAL`      | `true`           |

La implementación podrá almacenar el valor derivado para facilitar consultas, pero el validador deberá rechazar cualquier contradicción.

Otras propiedades podrán declararse derivadas únicamente si:

- la regla está publicada en el esquema;
- la derivación es determinista;
- no depende del rol, actor, recurso o estado de ejecución;
- el valor derivado se valida en CI.

#### 13. Ejemplo de registro completo

El siguiente ejemplo muestra la forma del registro. No sustituye la matriz aprobada ni modifica sus valores.

```json
{
  "permission_key": "nexo.inventory.remissions.prepare",
  "app_code": "nexo",
  "module_code": "inventory",
  "resource_code": "remissions",
  "action_code": "prepare",
  "lifecycle_status": "active",
  "introduced_in": "1.0.0",
  "human_label": "Preparar remisiones",
  "human_description": "Permite alistar físicamente una remisión autorizada desde su origen.",
  "human_group": "Remisiones",
  "human_sort_order": 40,
  "human_locale": "es-CO",
  "authorization_requirement": "OPERATIONAL_ONLY",
  "is_operational": true,
  "is_read_only": false,
  "is_configuration": false,
  "is_sensitive": true,
  "sensitivity_reason": "Modifica la custodia y preparación física de inventario.",
  "allowed_scopes": ["SITE", "AREA", "AREA_KIND"],
  "maximum_scope": "SITE",
  "allows_own_resource": false,
  "allows_third_party_resource": false,
  "allows_cross_site_relation": false,
  "base_lane": null,
  "operational_lane": {
    "requires_shift": true,
    "requires_checkin": true,
    "area_requirement": "REQUIRED"
  },
  "shared_device_mode": "STANDARD_ACTOR_SESSION",
  "simulation_mode": "FULL_PREVIEW",
  "requires_strong_reauthentication": false,
  "resource_contract_id": "remission.prepare.v1",
  "resource_type": "REMISSION",
  "resolution_mode": "ORIGIN_SIDE",
  "required_sides": ["ORIGIN"],
  "field_policy_id": "remission.prepare.fields.v1",
  "audit_policy_id": "remission.prepare.audit.v1",
  "aliases": [],
  "contract_hash": "sha256:<HASH>"
}
```

Los valores concretos deberán copiarse de las tareas aprobadas, no reconstruirse desde este ejemplo.

#### 14. Contratos de recurso separados

`resource-contracts.json` contendrá contratos reutilizables identificados mediante claves estables.

Cada contrato deberá incluir:

- `resource_contract_id`;
- `contract_version`;
- `resource_type`;
- `resource_locator`;
- `subject_resolver`;
- `territory_resolver`;
- `ownership_resolver`;
- `required_sides`;
- `state_predicate`;
- `concurrency_policy`;
- `field_policy`;
- `audit_policy`;
- `resolution_outcomes`;
- `blocked_reason_codes`.

Separar el contrato reutilizable evita copiar la misma resolución en múltiples permisos.

Sin embargo, un permiso podrá sobreescribir únicamente las propiedades que el esquema declare extensibles.

No se permite que dos permisos compartan un contrato cuando sus acciones exigen lados, estados o campos diferentes.

#### 15. Resultados de resolución admitidos

El esquema deberá representar como mínimo:

```text
RESOLVED
MULTI_RESOLVED
NOT_APPLICABLE
UNRESOLVED
CONFLICT
ISOLATED
```

Ningún consumidor podrá reemplazar estos resultados por un booleano prematuro antes de completar la evaluación contractual.

#### 16. Aliases

`aliases.json` contendrá equivalencias de compatibilidad.

Cada alias deberá incluir:

- `alias_key`;
- `canonical_permission_key`;
- `introduced_in`;
- `deprecated_in`;
- `removal_target_version`;
- `reason`;
- `telemetry_required`;
- `consumer_migration_note`.

Reglas:

- un alias no es un permiso activo independiente;
- no recibe modalidad, alcance ni contrato propios;
- hereda íntegramente el permiso canónico;
- no puede ampliar capacidad;
- no puede apuntar a otro alias;
- no puede formar ciclos;
- su uso debe registrarse para migración;
- no puede mantenerse indefinidamente sin fecha o criterio de retiro.

#### 17. Permisos legacy amplios

`legacy-permissions.json` registrará los permisos amplios pendientes de descomposición.

Un permiso legacy:

- no entra dentro de los 140 permisos canónicos activos;
- no recibe contrato completo como si fuera una capacidad vigente;
- no puede utilizarse para crear nuevas asignaciones;
- no puede aparecer en editores normales de roles;
- puede conservarse temporalmente para diagnóstico y migración;
- debe declarar sus reemplazos canónicos esperados;
- debe tener estado y fecha objetivo de retiro.

La presencia en este archivo no autoriza su uso futuro.

#### 18. Permisos retirados y técnicos

`retired-permissions.json` registrará:

- permisos técnicos derivados de rutas;
- permisos eliminados;
- permisos reemplazados;
- claves reservadas que no deben reutilizarse.

Cada registro incluirá:

- clave histórica;
- categoría de retiro;
- versión de retiro;
- motivo;
- reemplazo, cuando exista;
- política ante solicitudes posteriores.

Regla:

```text
PERMISO RETIRADO SOLICITADO
→ DENEGAR
→ REGISTRAR DIAGNÓSTICO
→ NO REACTIVAR POR FALLBACK
```

Una clave retirada no podrá reutilizarse para una capacidad diferente.

#### 19. Versionado semántico

El catálogo utilizará Semantic Versioning.

##### 19.1 Cambio mayor — `MAJOR`

Requiere incrementar la versión mayor cuando exista cualquier cambio incompatible, por ejemplo:

- retirar una clave canónica activa;
- reutilizar o cambiar el significado de una clave;
- cambiar `authorization_requirement` de forma incompatible;
- ampliar o reducir sustancialmente alcance;
- modificar requisitos de turno, check-in o área de forma incompatible;
- cambiar compatibilidad con dispositivo o simulación de manera que rompa consumidores;
- cambiar el tipo de recurso o la resolución territorial;
- modificar campos o lados obligatorios;
- alterar la precedencia contractual;
- cambiar el schema de forma incompatible.

##### 19.2 Cambio menor — `MINOR`

Admite cambios compatibles y aditivos:

- agregar un nuevo permiso canónico;
- agregar una aplicación confirmada;
- agregar un alias de migración;
- agregar metadatos opcionales sin cambiar significado;
- agregar un contrato de recurso no utilizado por versiones anteriores;
- ampliar validaciones sin invalidar datos válidos anteriores.

La adición de un permiso no lo concede automáticamente a ningún rol.

##### 19.3 Parche — `PATCH`

Se permite para correcciones que no alteran la capacidad:

- ortografía;
- etiqueta humana equivalente;
- descripción aclaratoria sin cambio semántico;
- orden visual;
- documentación;
- corrección de un hash o manifiesto antes de activación, mediante nueva versión.

Un cambio que afecte autorización real nunca se clasificará como parche por conveniencia.

#### 20. Estados de publicación

| Estado       | Uso permitido                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| `draft`      | Edición y validación local; no consumible en producción.                          |
| `candidate`  | Congelado para revisión, pruebas contractuales y diff.                            |
| `published`  | Inmutable y apto para consumo.                                                    |
| `superseded` | Sustituido por otra versión, pero conservado para reproducibilidad.               |
| `withdrawn`  | Publicación retirada por defecto crítico; nunca se elimina el registro histórico. |

Una versión `candidate` no se convierte automáticamente en `published` por aprobar un pull request sin validaciones.

#### 21. Flujo de publicación

El flujo obligatorio será:

```text
DECISIÓN DOCUMENTAL APROBADA
        ↓
CREAR VERSIÓN DRAFT
        ↓
VALIDAR SCHEMA E INVARIANTES
        ↓
GENERAR DIFF CONTRACTUAL
        ↓
REVISAR COMPATIBILIDAD
        ↓
GENERAR TIPOS Y ARTEFACTOS
        ↓
EJECUTAR PRUEBAS CONTRACTUALES
        ↓
MARCAR CANDIDATE
        ↓
APROBAR PUBLICACIÓN
        ↓
MARCAR PUBLISHED
        ↓
ACTUALIZAR current.json
        ↓
DESPLEGAR CONSUMIDORES Y MIGRACIONES COMPATIBLES
```

No se permite modificar primero Supabase y reconstruir después el catálogo desde los datos resultantes.

#### 22. Diff contractual obligatorio

Toda versión candidata deberá producir un informe que clasifique cambios en:

- permisos agregados;
- permisos deprecados;
- permisos retirados;
- aliases agregados o retirados;
- cambios humanos;
- cambios de modalidad;
- cambios de clasificación;
- cambios de alcance;
- cambios de prerrequisitos;
- cambios de dispositivo;
- cambios de simulación;
- cambios de recurso;
- cambios de lados;
- cambios de campos;
- cambios de auditoría;
- cambios de compatibilidad.

El informe deberá marcar cada cambio como:

```text
NON_BREAKING
REVIEW_REQUIRED
BREAKING
INVALID
```

Un cambio `INVALID` bloquea la publicación.

#### 23. Validaciones obligatorias

La versión `1.0.0` deberá superar como mínimo:

##### 23.1 Identidad y cobertura

- exactamente 140 permisos activos;
- exactamente 140 claves únicas;
- exactamente 10 aplicaciones;
- toda clave pertenece a una aplicación registrada;
- toda clave cumple la convención aprobada;
- ningún permiso técnico retirado aparece como activo;
- ningún permiso legacy amplio aparece como activo.

##### 23.2 Integridad de propiedades

- todo permiso tiene etiqueta y descripción;
- todo permiso declara modalidad;
- `is_operational` coincide con la modalidad;
- todo permiso declara `is_read_only`;
- todo permiso declara `is_configuration`;
- todo permiso declara `is_sensitive`;
- un permiso sensible contiene razón;
- todo permiso declara alcances admitidos y máximo;
- todo carril aplicable declara turno y check-in;
- todo carril operativo declara requisito de área;
- todo permiso declara compatibilidad con dispositivo;
- todo permiso declara compatibilidad con simulación;
- todo permiso referencia un contrato de recurso válido.

##### 23.3 Relaciones

- todos los aliases apuntan a permisos canónicos activos;
- ningún alias apunta a otro alias;
- no existen ciclos;
- toda clave retirada conserva motivo;
- todo permiso reemplazado tiene trazabilidad;
- todos los contratos referenciados existen;
- todos los lados exigidos existen en el contrato;
- toda política de campos y auditoría referenciada existe.

##### 23.4 Compatibilidad

- la versión semántica corresponde al diff;
- el schema declarado valida todos los archivos;
- los hashes coinciden;
- `current.json` apunta a una versión publicada;
- una versión publicada no cambió respecto a su hash histórico;
- las aplicaciones consumidoras declaran una versión compatible.

#### 24. Hash e inmutabilidad

Todos los archivos deberán normalizarse antes de calcular hashes.

La normalización deberá fijar:

- codificación UTF-8;
- saltos de línea LF;
- orden estable de propiedades;
- orden estable de registros por clave;
- ausencia de timestamps generados dentro de los archivos de contenido;
- serialización determinista.

`checksums.json` incluirá un SHA-256 por archivo y un hash compuesto del catálogo.

Toda decisión de autorización auditable deberá poder registrar:

- `catalog_version`;
- `schema_version`;
- `permission_key`;
- `contract_hash`;
- opcionalmente `catalog_hash`.

Esto permite reproducir con qué contrato se tomó una decisión histórica.

#### 25. Consumo por aplicaciones

Las aplicaciones deberán consumir el catálogo mediante el paquete compartido.

No podrán:

- copiar `permissions.json` a su repositorio;
- editar una propiedad localmente;
- crear un enum paralelo;
- inventar permisos no publicados;
- deducir modalidad desde tablas de asignación;
- deducir alcance desde el nombre del rol;
- mantener etiquetas humanas independientes;
- construir contratos de recurso sin referencia canónica.

Cada consumidor deberá declarar como mínimo:

```text
supported_catalog_major
supported_schema_major
resolved_catalog_version
```

En producción deberá conocerse la versión exacta resuelta, no solamente un rango semántico.

#### 26. Estrategia de compatibilidad de consumidores

| Escenario                                 | Resultado                                                             |
| ----------------------------------------- | --------------------------------------------------------------------- |
| Misma versión mayor y cambio compatible   | Puede continuar después de validación.                                |
| Versión mayor no soportada                | Bloquear build o despliegue.                                          |
| Permiso desconocido en consumidor antiguo | Denegar y registrar incompatibilidad.                                 |
| Contrato desconocido                      | Denegar; no usar fallback genérico.                                   |
| Catálogo no cargado                       | Denegar capacidades; permitir únicamente recuperación técnica segura. |
| Hash diferente para la misma versión      | Error crítico de integridad.                                          |

No existe modo permisivo por indisponibilidad del catálogo.

#### 27. Proyección hacia Supabase

La futura proyección en Supabase podrá utilizar:

- tablas de catálogo;
- columnas adicionales;
- vistas materializadas;
- funciones de sincronización;
- snapshots JSONB;
- migraciones de seed versionadas.

Sin embargo, deberá conservar estas reglas:

- la migración se genera desde una versión publicada;
- cada fila proyectada registra `catalog_version`;
- la proyección no inventa valores ausentes;
- un dato incompatible bloquea la migración;
- las asignaciones de roles se validan contra el catálogo;
- la base no cambia el significado del permiso mediante edición manual;
- toda divergencia se detecta mediante verificación o checksum.

La estrategia física se definirá en tareas de implementación y migración posteriores.

#### 28. Relación con matrices

El catálogo define qué puede significar y admitir cada permiso.

Las matrices definen quién recibe una concesión o denegación compatible.

```text
CATÁLOGO
→ CAPACIDAD Y CONTRATO

MATRIZ
→ ASIGNACIÓN

CONTEXTO
→ CONDICIONES ACTUALES

RECURSO
→ OBJETO Y TERRITORIO

DECISIÓN
→ RESULTADO FINAL
```

Una matriz no puede:

- asignar un alcance no admitido;
- cambiar modalidad;
- eliminar turno o check-in;
- cambiar requisito de área;
- habilitar dispositivo prohibido;
- habilitar simulación prohibida;
- sustituir contrato de recurso.

#### 29. Relación con AUTH-CAT-018

AUTH-CAT-018 deberá generar tipos TypeScript desde los JSON Schema y el catálogo publicado.

No deberá escribir manualmente:

```ts
export type PermissionKey = "..." | "..."
```

como fuente independiente.

Los tipos son derivados.

El catálogo es la fuente.

#### 30. Relación con AUTH-CAT-019

AUTH-CAT-019 deberá reemplazar cadenas manuales mediante constantes, helpers o claves generadas a partir del catálogo.

Ejemplo objetivo:

```ts
PERMISSIONS.NEXO.INVENTORY.REMISSIONS.PREPARE
```

En lugar de:

```ts
"nexo.inventory.remissions.prepare"
```

La constante deberá resolver exactamente a la clave publicada y no crear otra identidad.

#### 31. CI obligatorio

`vento-shell` deberá bloquear integración cuando falle cualquiera de estas comprobaciones:

- schema inválido;
- permiso duplicado;
- permiso omitido;
- conteo inesperado;
- alias cíclico;
- contrato faltante;
- propiedad obligatoria nula;
- contradicción derivada;
- cambio incompatible con versión incorrecta;
- hash inválido;
- modificación de versión publicada;
- `current.json` apuntando a una versión no publicada;
- tipo derivado desactualizado;
- documentación generada desactualizada.

La validación deberá poder ejecutarse localmente y en CI.

#### 32. Seguridad de la cadena de suministro contractual

El catálogo deberá tratarse como código de seguridad.

Requiere:

- revisión obligatoria;
- historial Git;
- protección de rama;
- diff legible;
- validación automática;
- no descargar definiciones remotas en tiempo de ejecución;
- no ejecutar código contenido en el catálogo;
- no permitir expresiones arbitrarias en resolutores;
- utilizar identificadores de resolutor conocidos y registrados;
- no almacenar secretos;
- no incluir datos personales ni operativos.

Los resolutores se referencian mediante identificadores declarativos.

No se serializa código ejecutable dentro del JSON.

#### 33. Catálogo declarativo, no ejecutable

Propiedades como:

```text
territory_resolver
state_predicate
ownership_resolver
```

serán identificadores de estrategias registradas, no fragmentos SQL o JavaScript arbitrarios.

Ejemplo válido:

```json
{
  "territory_resolver": "REMISSION_ORIGIN_V1",
  "state_predicate": "REMISSION_PREPARABLE_V1"
}
```

Ejemplo prohibido:

```json
{
  "territory_resolver": "eval(resource.site_id || actor.site_id)"
}
```

La implementación de cada estrategia deberá ser tipada, revisada y probada por separado.

#### 34. Diagnósticos contractuales

La validación y consumo del catálogo deberá utilizar razones estructuradas, entre ellas:

| Código                                 | Significado                                     |
| -------------------------------------- | ----------------------------------------------- |
| `catalog_unavailable`                  | No se pudo cargar el catálogo.                  |
| `catalog_version_unsupported`          | El consumidor no soporta la versión mayor.      |
| `catalog_schema_unsupported`           | El consumidor no soporta el schema.             |
| `catalog_hash_mismatch`                | El contenido no coincide con el hash publicado. |
| `catalog_manifest_invalid`             | El manifiesto incumple el schema.               |
| `permission_not_in_catalog`            | La clave solicitada no es canónica activa.      |
| `permission_contract_missing`          | Falta contrato de recurso.                      |
| `permission_property_missing`          | Falta una propiedad obligatoria.                |
| `permission_derived_property_conflict` | Una propiedad derivada contradice su fuente.    |
| `permission_retired`                   | La clave fue retirada.                          |
| `permission_legacy_not_assignable`     | La clave legacy no admite nuevas asignaciones.  |
| `permission_alias_used`                | Se utilizó un alias y debe migrarse.            |
| `permission_alias_cycle`               | Existe una relación inválida de aliases.        |
| `catalog_breaking_change_unversioned`  | El diff es incompatible sin incremento mayor.   |
| `published_catalog_mutation_detected`  | Se modificó una versión publicada.              |

Estos diagnósticos no reemplazan las razones de autorización del recurso; describen integridad del catálogo.

#### 35. Cobertura de la versión inicial

| Aplicación | Permisos activos esperados |
| ---------- | -------------------------: |
| SHELL      |                          1 |
| ANIMA      |                         10 |
| AURA       |                          1 |
| FOGO       |                          6 |
| NEXO       |                         67 |
| NUMERA     |                          6 |
| ORIGO      |                          6 |
| PASS       |                          1 |
| PULSO      |                         11 |
| VISO       |                         31 |
| **Total**  |                    **140** |

La publicación inicial también registrará por separado:

- aliases legacy existentes;
- 21 permisos legacy amplios pendientes de descomposición;
- 14 permisos técnicos retirados como capacidades;
- contratos de recurso aprobados;
- políticas de compatibilidad.

Los conteos legacy y técnicos deberán verificarse de nuevo contra la fuente vigente antes de la publicación física.

#### 36. Invariantes

- Existe una única fuente técnica canónica del catálogo.
- El catálogo vive en `vento-shell`.
- El catálogo se distribuye mediante `@vento/contracts/authorization`.
- Cada versión publicada es inmutable.
- `current.json` referencia una versión; no la duplica.
- `schema_version` y `catalog_version` son conceptos separados.
- Toda versión tiene manifiesto y checksums.
- Toda versión tiene changelog.
- Los 140 permisos activos están presentes exactamente una vez.
- Las diez aplicaciones están registradas exactamente una vez.
- Todo permiso activo contiene todas las propiedades aprobadas.
- Las propiedades derivadas se validan.
- Los contratos de recurso son declarativos.
- El catálogo no contiene SQL o JavaScript ejecutable.
- Los aliases no son permisos independientes.
- Los aliases no forman cadenas ni ciclos.
- Los permisos legacy no admiten asignaciones nuevas.
- Los permisos retirados no se reutilizan.
- Las aplicaciones no mantienen copias modificadas.
- Supabase puede proyectar el catálogo, pero no redefinirlo.
- Las matrices no amplían contratos.
- La indisponibilidad del catálogo produce denegación segura.
- Una versión mayor incompatible bloquea consumidores no compatibles.
- Todo cambio real de capacidad produce una nueva versión.
- Todo cambio incompatible incrementa la versión mayor.
- Toda decisión auditable puede identificar la versión contractual utilizada.
- Los tipos TypeScript se derivan posteriormente.
- Las constantes de permisos se derivan posteriormente.
- La aprobación documental no publica ni despliega archivos por sí sola.

#### 37. Criterios de aprobación

AUTH-CAT-017 podrá aprobarse cuando se acepte expresamente que:

- `vento-shell` es la fuente técnica canónica del catálogo;
- el catálogo se ubicará bajo el workspace `packages/*` mediante `packages/contracts`;
- el paquete lógico será `@vento/contracts`;
- el subpath público será `@vento/contracts/authorization`;
- el formato fuente será declarativo y validado mediante JSON Schema;
- la primera versión contractual será `1.0.0` cuando sea publicada;
- `schema_version` y `catalog_version` se versionan por separado;
- las versiones publicadas son inmutables;
- los 140 permisos activos se serializan sin omisiones;
- las diez aplicaciones forman parte del manifiesto inicial;
- aliases, legacy y retirados se almacenan por separado;
- cada permiso conserva todas las propiedades aprobadas en AUTH-CAT-001 a AUTH-CAT-016;
- los contratos de recurso se referencian mediante identificadores declarativos;
- el catálogo no contiene código ejecutable;
- toda versión incluye hashes, changelog y diff contractual;
- Semantic Versioning clasifica cambios compatibles e incompatibles;
- CI bloquea divergencias, omisiones y modificaciones de versiones publicadas;
- Supabase será una proyección versionada y no una fuente semántica alternativa;
- las aplicaciones consumirán el paquete compartido y no copias locales;
- AUTH-CAT-018 derivará tipos TypeScript;
- AUTH-CAT-019 eliminará cadenas manuales;
- esta tarea no implementa todavía archivos, migraciones ni cambios de repositorio.

#### 38. Impacto sobre tareas posteriores

##### AUTH-CAT-018

Deberá crear tipos derivados para:

- claves de permisos;
- aplicaciones;
- modalidades;
- alcances;
- prerrequisitos;
- modos de dispositivo;
- modos de simulación;
- contratos de recurso;
- resultados de resolución;
- manifiestos y versiones.

##### AUTH-CAT-019

Deberá sustituir cadenas manuales y agregar validaciones estáticas en todos los consumidores.

##### BLOQUE D

Las matrices deberán validar cada asignación contra la versión vigente del catálogo.

##### BLOQUE E

`AccessContext` y `AuthorizationDecision` deberán registrar la versión y el hash contractual utilizados.

##### Implementación y migraciones

Toda publicación, seed o sincronización deberá originarse desde una versión `published` y documentarse en `vento-shell`.

#### 39. Estado final de la propuesta

| Tarea        | Estado      |
| ------------ | ----------- |
| AUTH-CAT-016 | APROBADA    |
| AUTH-CAT-017 | APROBADA    |
| AUTH-CAT-018 | NO INICIADA |

No se avanza a AUTH-CAT-018 hasta recibir aprobación explícita.


### ✅ AUTH-CAT-018 — Crear tipos TypeScript derivados del catálogo

#### 1. Identificación de la tarea

| Campo                     | Valor                                                          |
| ------------------------- | -------------------------------------------------------------- |
| Bloque                    | BLOQUE C — Catálogo canónico de aplicaciones y permisos        |
| Tarea                     | AUTH-CAT-018 — Crear tipos TypeScript derivados del catálogo   |
| Estado                    | **APROBADA**                                                   |
| Naturaleza                | Definición contractual y diseño de generación                  |
| Implementación física     | No incluida en esta fase documental                            |
| Tarea anterior vigente    | AUTH-CAT-017 — Crear catálogo versionado en `vento-shell`      |
| Tarea posterior reservada | AUTH-CAT-019 — Evitar cadenas de permisos escritas manualmente |

Esta tarea define el contrato que deberá utilizar `vento-shell` para generar y publicar tipos TypeScript a partir del catálogo canónico de autorización.

**Reconciliación vinculante:** las 112 claves de AUTH-CAT-001..016 son el snapshot histórico. La membresía prospectiva publicada debe derivar exactamente 140 PermissionKey activas del catálogo interno de `SHELL-CON-003::GLOBAL`, sin rehabilitar `nexo.inventory.remissions.dispatch`. Los tipos internos existentes no son por sí mismos una publicación; las propiedades completas y su validez requieren certificación antes de exponer exports públicos.

No realiza todavía:

- creación o modificación de archivos en repositorios;
- ejecución de generadores;
- publicación de paquetes;
- migraciones de Supabase;
- cambios en tablas, RLS, RPC o funciones;
- reemplazo de cadenas de permisos en aplicaciones;
- modificación de matrices de roles o excepciones;
- implementación de `AccessContext` o `AuthorizationDecision`;
- adopción de los tipos por los repositorios consumidores.

Toda futura migración de Supabase derivada de estas decisiones deberá crearse y documentarse en `vento-shell`.

#### 2. Problema que se resuelve

AUTH-CAT-017 establece que el catálogo publicado en `vento-shell` es la fuente técnica canónica de autorización y que sus archivos se validan mediante JSON Schema.

Sin una capa TypeScript derivada, cada aplicación podría:

- declarar manualmente su propia unión de permisos;
- aceptar cualquier `string` como clave válida;
- mantener enums divergentes;
- confundir claves canónicas con aliases o permisos legacy;
- representar de forma incompleta modalidades, alcances o carriles;
- reducir resultados territoriales complejos a booleanos;
- omitir propiedades obligatorias del contrato;
- utilizar una versión distinta del catálogo sin detectarlo;
- compilar aunque el catálogo publicado y el código consumidor hayan divergido;
- convertir los tipos en una segunda fuente de verdad independiente.

Estas prácticas quedan prohibidas.

#### 3. Decisión principal

Los tipos TypeScript de autorización deberán ser artefactos generados de forma determinista desde:

```text
JSON SCHEMA VERSIONADO
+
CATÁLOGO PUBLICADO VERSIONADO
=
TIPOS TYPESCRIPT DERIVADOS
```

Regla principal:

> **EL CATÁLOGO ES LA FUENTE. LOS TIPOS SON UNA PROYECCIÓN GENERADA, NO UNA DEFINICIÓN PARALELA.**

Ningún tipo que represente valores contractuales podrá mantenerse manualmente cuando esos valores ya existan en el catálogo o en su JSON Schema.

#### 4. Dos fuentes derivativas complementarias

La generación tendrá dos entradas distintas y obligatorias.

##### 4.1 Tipos estructurales derivados del JSON Schema

Representan la forma válida de los documentos:

- manifiesto;
- aplicaciones;
- permisos;
- aliases;
- permisos legacy;
- permisos retirados;
- contratos de recurso;
- checksums;
- compatibilidad;
- versiones.

Ejemplos conceptuales:

```text
CatalogManifest
ApplicationDefinition
PermissionDefinition
AliasDefinition
LegacyPermissionDefinition
RetiredPermissionDefinition
ResourceContractDefinition
CatalogChecksums
```

Estos tipos cambian cuando cambia `schema_version`.

##### 4.2 Tipos literales derivados del catálogo publicado

Representan los valores concretos presentes en una versión contractual:

- las diez aplicaciones publicadas;
- las 140 claves canónicas activas;
- aliases existentes;
- identificadores de contratos;
- tipos de recurso;
- resolutores registrados;
- políticas de campos;
- políticas de auditoría;
- lados territoriales;
- versión y hash publicados.

Ejemplos conceptuales:

```text
AppCode
PermissionKey
PermissionAliasKey
ResourceContractId
ResourceType
TerritoryResolverId
FieldPolicyId
AuditPolicyId
PublishedCatalogVersion
PublishedCatalogHash
```

Estos tipos cambian cuando cambia `catalog_version`.

#### 5. La generación no invierte la fuente de verdad

Queda prohibido utilizar un archivo TypeScript manual para producir después el catálogo JSON.

Flujo obligatorio:

```text
DECISIÓN DOCUMENTAL APROBADA
→ CATÁLOGO JSON CANDIDATO
→ VALIDACIÓN POR JSON SCHEMA
→ VALIDACIÓN CONTRACTUAL ENTRE ARCHIVOS
→ PUBLICACIÓN VERSIONADA
→ GENERACIÓN TYPESCRIPT
→ VERIFICACIÓN DE PARIDAD
→ CONSUMO POR APLICACIONES
```

El generador no puede:

- inventar propiedades ausentes;
- completar valores mediante heurísticas;
- inferir modalidad desde el rol;
- inferir alcance desde el nombre del permiso;
- corregir silenciosamente datos inválidos;
- publicar una versión que no supera las validaciones;
- sustituir una clave desconocida por una aproximación.

#### 6. Ubicación técnica objetivo

La futura implementación deberá extender el paquete aprobado en AUTH-CAT-017 de forma equivalente a:

```text
packages/contracts/authorization/
├── catalog/
├── schemas/
├── changelog/
├── generated/
│   ├── schemas/
│   │   └── 1.0.0/
│   │       └── authorization-schema.types.ts
│   ├── versions/
│   │   └── 1.0.0/
│   │       ├── catalog.types.ts
│   │       ├── catalog.values.ts
│   │       ├── catalog.metadata.ts
│   │       └── index.ts
│   ├── current.ts
│   └── index.ts
├── scripts/
│   ├── validate-authorization-catalog.mjs
│   ├── generate-authorization-types.mjs
│   └── verify-authorization-generated.mjs
└── README.md
```

Los nombres internos podrán ajustarse durante implementación cuando exista una limitación técnica real, pero deberán conservar:

- tipos estructurales versionados por `schema_version`;
- tipos literales versionados por `catalog_version`;
- salida específica por versión publicada;
- un reexport explícito de la versión vigente;
- generación determinista;
- verificación automática contra las fuentes.

#### 7. Subpaths públicos

El paquete deberá reservar subpaths equivalentes a:

```text
@vento/contracts/authorization
@vento/contracts/authorization/current
@vento/contracts/authorization/versions/1.0.0
@vento/contracts/authorization/schemas/1.0.0
```

Reglas:

- `authorization/current` sigue la versión indicada por `current.json`;
- `authorization/versions/<versión>` permite fijar una versión contractual exacta;
- `authorization/schemas/<versión>` permite consumir la forma estructural exacta;
- una versión publicada no cambia en sitio;
- un consumidor que necesite reproducción histórica deberá importar una versión fijada, no `current`.

#### 8. Categorías de tipos públicos

La API TypeScript deberá separar como mínimo:

1. identidad del catálogo;
2. aplicaciones;
3. permisos canónicos;
4. compatibilidad legacy;
5. clasificación de autorización;
6. alcances;
7. prerrequisitos de carril;
8. dispositivo compartido;
9. simulación;
10. contratos de recurso;
11. resolución territorial;
12. manifiestos, hashes y versiones;
13. diagnósticos contractuales;
14. utilidades derivadas de consulta estática.

#### 9. Tipos de identidad del catálogo

Deberán existir tipos derivados equivalentes a:

```text
CatalogId
CatalogVersion
SchemaVersion
CatalogStatus
CatalogHash
ContractHash
CatalogFileHash
```

La versión publicada concreta deberá conservarse también como literal:

```text
PublishedCatalogVersion
→ "1.0.0"

PublishedSchemaVersion
→ "1.0.0"
```

`CatalogVersion` y `SchemaVersion` no son intercambiables.

Un campo que espera `CatalogVersion` no deberá aceptar accidentalmente un `SchemaVersion`, aunque ambos tengan forma SemVer.

La implementación podrá utilizar tipos nominales o marcas internas para impedir esa sustitución accidental, siempre que la creación de valores se mantenga controlada por validadores y artefactos generados.

#### 10. Tipos de aplicaciones

La versión inicial deberá derivar exactamente:

```text
AppCode
→ "shell"
| "anima"
| "viso"
| "nexo"
| "fogo"
| "origo"
| "pulso"
| "numera"
| "aura"
| "pass"
```

La unión no se escribirá manualmente como fuente independiente.

También deberán derivarse o generarse desde el schema y el catálogo:

```text
AppDomain
AppKind
RoadmapScope
ApplicationLifecycleStatus
ApplicationDefinition
ApplicationByCode
```

La aplicación `shell` no representa el repositorio `vento-shell`.

La aplicación `pass` conserva su dominio cliente y no convierte `public.users` en identidad laboral.

#### 11. Tipo canónico `PermissionKey`

`PermissionKey` deberá contener exclusivamente las claves activas de `permissions.json` de la versión publicada.

Para la versión inicial:

```text
PermissionKey
→ unión literal exacta de 140 claves canónicas activas
```

Queda prohibido definirlo como:

```text
string
`${string}.${string}`
`${AppCode}.${string}`
string & { brand: "PermissionKey" }
```

cuando esas formas permitan introducir una clave no publicada mediante asignación ordinaria.

La forma aceptada será equivalente a una unión literal generada desde los datos publicados.

Regla:

```text
CLAVE CON FORMA VÁLIDA
≠
PERMISO CANÓNICO PUBLICADO
```

#### 12. Separación entre permiso, alias, legacy y retirado

Deberán existir categorías incompatibles:

```text
PermissionKey
PermissionAliasKey
LegacyPermissionKey
RetiredPermissionKey
```

Reglas:

- `PermissionKey` representa únicamente capacidades canónicas activas;
- `PermissionAliasKey` existe solo en fronteras de compatibilidad y migración;
- `LegacyPermissionKey` no admite asignaciones nuevas;
- `RetiredPermissionKey` no puede utilizarse para autorización;
- un alias no es asignable automáticamente donde se exige `PermissionKey`;
- una función nueva de autorización no debe aceptar `PermissionAliasKey`;
- resolver un alias produce una clave canónica y evidencia de compatibilidad;
- no se permite unir todas las categorías bajo `string` en APIs internas.

Podrá existir un tipo de frontera explícito:

```text
PermissionReferenceInput
```

pero solo para importaciones, migraciones, telemetría o compatibilidad controlada.

#### 13. Tipos de clasificación de autorización

Deberán derivarse los valores aprobados:

```text
AuthorizationRequirement
→ BASE_ONLY
| OPERATIONAL_ONLY
| BASE_OR_OPERATIONAL
| BASE_AND_OPERATIONAL
```

También deberán representarse:

```text
IsOperational
IsReadOnly
IsConfiguration
IsSensitive
SensitivityReason
StrongReauthenticationRequirement
```

Las propiedades booleanas no sustituyen el enum principal.

`is_operational` seguirá siendo derivada de `authorization_requirement` y la generación deberá rechazar contradicciones.

#### 14. Tipos de carril y prerrequisitos laborales

Deberán existir tipos explícitos para:

```text
AuthorizationLane
→ BASE
| OPERATIONAL

WorkPrerequisiteCode
→ N
| T
| T_PLUS_CHECKIN
```

La representación serializada podrá conservar los campos aprobados:

```text
requires_shift: boolean
requires_checkin: boolean
```

pero el tipo deberá impedir la combinación inválida:

```text
requires_shift = false
requires_checkin = true
```

La estructura deberá distinguir:

```text
BaseLaneRequirements
OperationalLaneRequirements
NotApplicableLane
```

Reglas por modalidad:

| Modalidad              | Carril base  | Carril operativo |
| ---------------------- | ------------ | ---------------- |
| `BASE_ONLY`            | obligatorio  | no aplicable     |
| `OPERATIONAL_ONLY`     | no aplicable | obligatorio      |
| `BASE_OR_OPERATIONAL`  | obligatorio  | obligatorio      |
| `BASE_AND_OPERATIONAL` | obligatorio  | obligatorio      |

El tipo debe impedir que un permiso `BASE_ONLY` contenga un carril operativo utilizable o que un permiso `OPERATIONAL_ONLY` omita el carril operativo.

#### 15. Unión discriminada de `PermissionDefinition`

`PermissionDefinition` no deberá reducirse a una interfaz permisiva con numerosos campos opcionales.

Deberá generarse o componerse como una unión discriminada por `authorization_requirement`.

Forma conceptual:

```text
BaseOnlyPermissionDefinition
OperationalOnlyPermissionDefinition
BaseOrOperationalPermissionDefinition
BaseAndOperationalPermissionDefinition
```

Consecuencias:

- `BASE_ONLY` exige `base_lane` y prohíbe `operational_lane` aplicable;
- `OPERATIONAL_ONLY` exige `operational_lane` y prohíbe `base_lane` aplicable;
- `BASE_OR_OPERATIONAL` exige ambos carriles y conserva evaluación alternativa;
- `BASE_AND_OPERATIONAL` exige ambos carriles y conserva evaluación conjunta;
- el narrowing de TypeScript deberá reflejar estas diferencias sin cast manual.

#### 16. Tipos de área operativa

Deberá derivarse:

```text
OperationalAreaRequirement
→ REQUIRED
| SITE_SUFFICIENT
| NOT_APPLICABLE
```

Reglas tipadas:

- un permiso sin carril operativo utiliza `NOT_APPLICABLE`;
- un permiso con carril operativo utiliza `REQUIRED` o `SITE_SUFFICIENT`;
- `NOT_APPLICABLE` no puede aparecer como requisito real de un carril operativo;
- `SITE_SUFFICIENT` no significa acceso a todas las áreas;
- `REQUIRED` exige un área activa proveniente del turno, no del dispositivo ni del cliente.

#### 17. Tipos de alcance

Los tipos deberán representar todas las dimensiones aprobadas en AUTH-CAT-011 sin reducirlas a `global | site | area`.

Como mínimo deberán conservar equivalentes tipados de:

```text
NT
ORG
G
AS
SS
AST
TST
AA
SA
AAT
ATW
CTX
OWN
```

La implementación podrá utilizar nombres serializados más descriptivos, siempre que exista una correspondencia única, documentada y sin pérdida entre cada valor del catálogo y el tipo TypeScript.

Deberán existir tipos equivalentes a:

```text
PermissionScopeCode
AllowedScopeSet
MaximumScope
TerritorialScope
NonTerritorialScope
OwnershipScope
OperationalContextScope
```

Reglas:

- `OWN` puede combinarse con territorio, pero no ampliarlo;
- `ATW` exige un límite superior de sedes;
- `TST` no se presume desde `AST`;
- `CTX` no sustituye turno, check-in ni área;
- los recursos organizacionales no territoriales no reciben una sede ficticia;
- un alcance no publicado no puede representarse mediante cast ordinario.

#### 18. Tipos de dispositivo compartido

Deberá derivarse:

```text
SharedDeviceRequirement
→ STANDARD_ACTOR_SESSION
| STRONG_REAUTH_REQUIRED
| NOT_ALLOWED
```

La nomenclatura pública deberá utilizar el nombre normativo `shared_device_requirement`.

Cuando se exponga una propiedad de conveniencia como `shared_device_mode`, deberá ser una proyección explícita del mismo valor y no una segunda clasificación editable.

También deberán existir estructuras tipadas equivalentes a:

```text
SharedDeviceContext
SharedActorSessionReference
StrongReauthenticationEvidence
SharedDeviceCompatibilityResult
```

Esta tarea solo define sus contratos de tipo. No implementa sesiones, PIN, MFA ni autorización de dispositivo.

#### 19. Tipos de simulación

Deberá derivarse:

```text
SimulationRequirement
→ FULL_PREVIEW
| DECISION_ONLY
| NOT_ALLOWED

SimulationDecision
→ would_allow
| would_deny
| indeterminate

SimulationDataMode
→ SYNTHETIC
| MASKED
| REAL_AUTHORIZED
| NONE
```

La simulación no podrá utilizar el tipo de decisión ejecutable real.

Deberán mantenerse separados:

```text
AuthorizationDecisionResult
SimulationDecision
```

Un valor `would_allow` nunca será aceptado donde se requiere una autorización real ejecutable.

#### 20. Tipos de contrato de recurso

Deberán derivarse del schema y de `resource-contracts.json`:

```text
ResourceContractId
ResourceContractVersion
ResourceType
ResourceLocator
SubjectResolverId
TerritoryResolverId
OwnershipResolverId
StatePredicateId
ConcurrencyPolicyId
FieldPolicyId
AuditPolicyId
ResourceSide
ResolutionMode
ResourceContractDefinition
```

Los identificadores de resolutores serán uniones literales generadas desde el registro aprobado.

Queda prohibido representarlos como código ejecutable o expresiones arbitrarias.

Ejemplo permitido conceptualmente:

```text
TerritoryResolverId
→ REMISSION_ORIGIN_V1
| REMISSION_DESTINATION_V1
| ...
```

Ejemplo prohibido:

```text
string que contiene JavaScript, SQL o eval
```

#### 21. Resultados tipados de resolución territorial

La resolución deberá modelarse como unión discriminada y conservar exactamente los resultados aprobados:

```text
RESOLVED
MULTI_RESOLVED
NOT_APPLICABLE
UNRESOLVED
CONFLICT
ISOLATED
```

Deberán existir variantes equivalentes a:

```text
ResolvedResourceTerritory
MultiResolvedResourceTerritory
NotApplicableResourceTerritory
UnresolvedResourceTerritory
ConflictingResourceTerritory
IsolatedResourceTerritory
```

Cada variante deberá exigir datos coherentes con su resultado.

Ejemplo conceptual:

```text
RESOLVED
→ territorio único normalizado

MULTI_RESOLVED
→ uno o más lados o miembros resueltos

NOT_APPLICABLE
→ recurso sin dimensión territorial aplicable

UNRESOLVED
→ faltan datos obligatorios o el recurso no puede localizarse

CONFLICT
→ existen relaciones territoriales incompatibles

ISOLATED
→ el recurso pertenece a un dominio excluido del alcance ordinario
```

Queda prohibido sustituir esta unión por:

```text
boolean
siteId?: string
areaId?: string
```

antes de completar la evaluación contractual.

#### 22. Tipos para lados y relaciones multilado

Los recursos multilado deberán conservar tipos explícitos para:

- origen;
- destino;
- solicitante;
- responsable por estado;
- participantes financieros;
- conjunto de relaciones;
- lados actuales y propuestos;
- miembros de una operación masiva.

Deberán existir estructuras equivalentes a:

```text
ResourceSideCode
ResolvedResourceSide
RequiredResourceSideSet
ResourceRelationResolution
CurrentAndProposedTerritory
BulkMemberResolution
```

El tipo no puede asumir que autorizar un lado autoriza automáticamente los demás.

#### 23. Tipos de propiedades, estado y concurrencia

Los contratos deberán representar de forma tipada:

```text
OwnershipResolution
ResourceStatePredicate
ResourceStateEvaluation
ExpectedResourceVersion
IdempotencyKey
ConcurrencyPolicy
FieldAccessPolicy
AuditPolicy
```

Las marcas nominales podrán utilizarse para impedir sustituciones accidentales entre identificadores técnicamente similares, por ejemplo:

```text
ResourceId
SiteId
AreaId
EmployeeId
DeviceId
ActorSessionId
```

Estas marcas no autorizan por sí mismas y no sustituyen validación de runtime.

#### 24. Tipos de manifiesto y compatibilidad

Deberán existir tipos estructurales para:

```text
CatalogManifest
CatalogCurrentPointer
CatalogCompatibility
CatalogFileEntry
CatalogChecksums
CatalogReleaseNotesReference
CatalogLifecycleStatus
ConsumerCatalogCompatibility
ResolvedCatalogMetadata
```

`ResolvedCatalogMetadata` deberá permitir registrar como mínimo:

```text
catalog_id
catalog_version
schema_version
catalog_hash
resolved_at
source_manifest
```

La versión exacta resuelta deberá ser conocida en producción.

#### 25. Tipos de diagnósticos contractuales

Los códigos de diagnóstico definidos por AUTH-CAT-017 deberán derivarse como unión literal, entre ellos:

```text
catalog_unavailable
catalog_version_unsupported
catalog_schema_unsupported
catalog_hash_mismatch
catalog_manifest_invalid
permission_not_in_catalog
permission_contract_missing
permission_property_missing
permission_derived_property_conflict
permission_retired
permission_legacy_not_assignable
permission_alias_used
permission_alias_cycle
catalog_breaking_change_unversioned
published_catalog_mutation_detected
```

La estructura deberá ser equivalente a una unión discriminada:

```text
CatalogDiagnostic
```

con:

- `code` tipado;
- severidad;
- versión;
- archivo o clave afectada cuando corresponda;
- detalles serializables;
- causa humana opcional;
- ausencia de secretos o datos personales.

Estos diagnósticos no sustituyen las razones de autorización del recurso.

#### 26. Tipos derivados de consulta estática

El paquete podrá exponer utilidades de tipos generadas o calculadas sin crear nuevas fuentes de verdad:

```text
PermissionKeyForApp<App>
PermissionDefinitionFor<Key>
PermissionApp<Key>
PermissionKeysByAuthorizationRequirement<Requirement>
OperationalPermissionKey
BaseOnlyPermissionKey
ReadOnlyPermissionKey
ConfigurationPermissionKey
SensitivePermissionKey
SharedDeviceAllowedPermissionKey
SimulationAllowedPermissionKey
ResourceTypeForPermission<Key>
ResourceContractForPermission<Key>
```

Reglas:

- se calculan desde el catálogo generado;
- no se mantienen como listas manuales;
- no autorizan por sí mismas;
- no sustituyen runtime validation;
- una clasificación nueva o modificada debe reflejarse automáticamente al regenerar.

#### 27. Valores generados y tipos literales

Para obtener uniones literales exactas, el generador podrá producir estructuras inmutables equivalentes a:

```text
APP_CODES
PERMISSION_KEYS
RESOURCE_CONTRACT_IDS
RESOURCE_TYPES
TERRITORY_RESOLVER_IDS
```

Estas estructuras:

- se generan automáticamente;
- no se editan manualmente;
- conservan orden determinista;
- usan `readonly`;
- pueden sustentar los tipos mediante indexación literal;
- no constituyen todavía la API ergonómica `PERMISSIONS.NEXO...` reservada para AUTH-CAT-019.

Esta tarea no migra consumidores ni reemplaza cadenas existentes.

#### 28. Prohibición de `enum` manual

No se utilizarán `enum` TypeScript mantenidos manualmente para representar valores que ya pertenecen al catálogo.

Se preferirán:

- uniones de literales;
- tuplas `readonly` generadas;
- objetos `as const` generados;
- tipos derivados mediante `typeof`;
- `satisfies` para verificar forma sin ampliar literales.

Razones:

- alineación exacta con JSON;
- ausencia de valores implícitos;
- menor código emitido;
- tree-shaking predecible;
- serialización directa;
- diff legible;
- regeneración determinista.

Un enum generado solo podrá utilizarse si una limitación técnica demostrable lo exige y conserva una correspondencia uno a uno con el catálogo.

#### 29. Fronteras de runtime

TypeScript no valida datos externos en tiempo de ejecución.

Toda entrada procedente de:

- Supabase;
- RPC;
- variables de entorno;
- almacenamiento local;
- eventos;
- formularios;
- mensajes entre aplicaciones;
- archivos JSON;
- datos históricos;

deberá validarse antes de tratarse como tipo canónico.

La futura implementación deberá generar o mantener helpers equivalentes a:

```text
isAppCode
parseAppCode
isPermissionKey
parsePermissionKey
isPermissionAliasKey
resolvePermissionReference
isCatalogVersionSupported
assertCatalogIntegrity
```

Reglas:

- un cast `as PermissionKey` no valida;
- una cadena desconocida se rechaza de forma cerrada;
- un alias se resuelve explícitamente y produce telemetría;
- una clave retirada se rechaza;
- una clave legacy no se convierte automáticamente en permiso activo;
- una versión incompatible bloquea el consumidor.

AUTH-CAT-018 define la necesidad y el contrato de estos límites. AUTH-CAT-019 definirá su uso sistemático en consumidores.

#### 30. Tipos crudos y tipos validados

Deberá distinguirse entre:

```text
UnknownCatalogInput
SchemaValidatedCatalog
ContractValidatedCatalog
PublishedAuthorizationCatalog
```

Flujo:

```text
unknown
→ validación JSON Schema
→ validación de relaciones e invariantes
→ verificación de hash y estado
→ catálogo publicado tipado
```

No se permite marcar un objeto como `PublishedAuthorizationCatalog` solo porque cumple parcialmente una interfaz.

Debe comprobarse además:

- estado `published`;
- hash;
- conteos;
- relaciones;
- versión soportada;
- correspondencia con `current.json` cuando se consuma la versión vigente.

#### 31. Generación por versión

Cada `catalog_version` publicada producirá una salida TypeScript inmutable propia.

Ejemplo:

```text
catalog/versions/1.0.0/
→ generated/versions/1.0.0/
```

Una nueva versión:

```text
1.1.0
```

produce:

```text
generated/versions/1.1.0/
```

No sobrescribe:

```text
generated/versions/1.0.0/
```

`generated/current.ts` se actualizará únicamente cuando `current.json` cambie a una versión publicada válida.

#### 32. Compatibilidad semántica y tipos

##### 32.1 Cambio patch

Puede regenerar tipos sin cambiar las uniones públicas cuando corrige metadatos compatibles.

Ejemplos:

- texto humano;
- orden de presentación;
- documentación;
- hash de una nueva versión corregida.

##### 32.2 Cambio minor

Puede ampliar uniones públicas de forma compatible.

Ejemplos:

- nueva clave canónica;
- nueva aplicación compatible;
- nuevo contrato o resolutor sin retirar los anteriores.

Los consumidores que utilicen comprobaciones exhaustivas deberán actualizarse conscientemente.

##### 32.3 Cambio major

Puede retirar o cambiar tipos de forma incompatible.

Ejemplos:

- retirar una clave activa;
- cambiar modalidad de forma incompatible;
- alterar contrato territorial;
- modificar un discriminante;
- eliminar un valor de enum contractual;
- cambiar una propiedad obligatoria.

Un consumidor que no soporte la versión mayor deberá bloquear el uso del catálogo.

#### 33. Exhausitividad obligatoria

Los consumidores que evalúen discriminantes contractuales deberán utilizar comprobación exhaustiva.

Aplica como mínimo a:

```text
AuthorizationRequirement
OperationalAreaRequirement
SharedDeviceRequirement
SimulationRequirement
SimulationDecision
ResourceResolutionOutcome
CatalogStatus
```

Una variante desconocida no podrá caer silenciosamente en una rama permisiva.

Resultado obligatorio:

```text
VARIANTE DESCONOCIDA
→ ERROR DE COMPATIBILIDAD
→ DENEGACIÓN SEGURA
```

#### 34. Configuración TypeScript mínima

El paquete de contratos y sus pruebas deberán compilar con reglas estrictas equivalentes a:

```text
strict
noUncheckedIndexedAccess
exactOptionalPropertyTypes
noImplicitReturns
noFallthroughCasesInSwitch
useUnknownInCatchVariables
```

No se permitirá resolver errores mediante:

- `any` generalizado;
- casts dobles `as unknown as`;
- índices abiertos `[key: string]: any` en contratos canónicos;
- campos opcionales para evitar modelar variantes;
- `skipLibCheck` como sustituto de corregir los tipos del paquete.

Una excepción técnica deberá quedar localizada, justificada y probada.

#### 35. Propiedades opcionales y nulas

La generación deberá respetar la diferencia entre:

```text
propiedad ausente
propiedad presente con null
propiedad presente con valor
```

No se utilizará opcionalidad indiscriminada.

Ejemplos:

- `deprecated_in` puede ser nulo mientras el permiso esté activo;
- `base_lane` no es simplemente opcional: depende de la modalidad;
- `operational_lane` no es simplemente opcional: depende de la modalidad;
- `sensitivity_reason` es obligatoria cuando `is_sensitive = true`;
- `published_at` es obligatoria para una versión `published`;
- `supersedes` puede ser nulo en la primera versión.

Estas relaciones deberán expresarse mediante uniones discriminadas o validación contractual, no solo mediante comentarios.

#### 36. Tipos de identificadores y UUID

Los campos que actualmente sean UUID podrán serializarse como `string`, pero las APIs internas podrán utilizar tipos nominales distintos:

```text
EmployeeId
SiteId
AreaId
ShiftId
CheckinId
DeviceId
ActorSessionId
ResourceId
```

Reglas:

- una marca nominal no confirma que el registro exista;
- una marca nominal no confirma autorización;
- los datos externos deben validarse como UUID antes de marcarse;
- `SiteId` y `AreaId` no son intercambiables;
- el contexto del actor y el territorio del recurso permanecen separados.

#### 37. Tipos de fecha, hora y SemVer

Los valores de fecha y hora permanecerán serializados como cadenas normalizadas validadas.

Podrán existir tipos nominales equivalentes a:

```text
IsoDateTime
IsoDate
SemVer
Sha256Digest
```

No se utilizará `Date` dentro de archivos JSON del catálogo.

La conversión a `Date` pertenece a los consumidores y no modifica el valor contractual serializado.

#### 38. Paridad entre datos y tipos

La generación deberá verificar al menos:

- 140 claves canónicas en `permissions.json`;
- 140 miembros únicos en `PermissionKey`;
- diez aplicaciones en `applications.json`;
- diez miembros únicos en `AppCode`;
- todos los aliases en `PermissionAliasKey`;
- todos los contratos en `ResourceContractId`;
- todos los valores discriminantes reflejados en los tipos;
- ninguna clave retirada dentro de `PermissionKey`;
- ninguna clave legacy dentro de `PermissionKey`;
- ningún archivo generado desactualizado;
- versión, schema y hash coincidentes.

La paridad se comprobará mediante generación reproducible y pruebas automáticas, no mediante conteo manual aislado.

#### 39. Artefactos generados no editables

Todo archivo generado deberá incluir un encabezado equivalente a:

```text
GENERATED FILE — DO NOT EDIT
Source catalog: vento.authorization@1.0.0
Schema: 1.0.0
Catalog hash: sha256:...
Generator version: ...
```

El encabezado no sustituye el hash ni la validación.

Los cambios manuales en archivos generados deberán detectarse y bloquear CI.

La corrección se realiza modificando:

- la decisión documental cuando corresponda;
- el catálogo candidato;
- el JSON Schema;
- el generador;

nunca editando únicamente la salida.

#### 40. Generación determinista

Con las mismas entradas, versión del generador y configuración, la salida deberá ser byte a byte idéntica.

La generación fijará:

- UTF-8;
- LF;
- orden de claves;
- orden de uniones;
- orden de exports;
- formato estable;
- ausencia de timestamps variables en el cuerpo generado;
- versión explícita del generador;
- dependencias bloqueadas.

Queda prohibido que la salida dependa de:

- orden del sistema de archivos;
- locale de la máquina;
- zona horaria;
- fecha actual;
- red;
- servicios remotos;
- datos de Supabase en tiempo de generación.

#### 41. Validaciones del generador

Antes de emitir tipos, el generador deberá confirmar:

1. JSON válido;
2. schema válido;
3. manifiesto válido;
4. versión existente;
5. estado permitido para la operación;
6. hash correcto;
7. archivos completos;
8. conteos esperados;
9. claves únicas;
10. relaciones válidas;
11. aliases sin ciclos;
12. contratos existentes;
13. propiedades derivadas coherentes;
14. discriminantes conocidos;
15. ausencia de código ejecutable en resolutores.

Una entrada inválida no produce tipos parciales.

Resultado:

```text
VALIDACIÓN FALLIDA
→ GENERACIÓN CANCELADA
→ SIN ACTUALIZACIÓN DE ARTEFACTOS
```

#### 42. Publicación de tipos

Solo una versión de catálogo en estado `published` podrá exportarse como versión pública estable.

Una versión `draft` o `candidate` podrá generar tipos temporales para validación interna, pero:

- no se exportará desde `current`;
- no se publicará como contrato estable;
- no se consumirá en producción;
- deberá quedar claramente marcada como no publicada;
- no podrá reemplazar una versión histórica.

#### 43. CI obligatorio

`vento-shell` deberá bloquear integración cuando ocurra cualquiera de estos casos:

- falla el JSON Schema;
- falla una validación contractual;
- falla la generación;
- la salida no es determinista;
- los archivos generados tienen cambios no confirmados;
- los archivos generados fueron modificados manualmente;
- `PermissionKey` no coincide con las 140 claves activas;
- `AppCode` no coincide con las diez aplicaciones;
- un alias aparece como permiso canónico;
- un permiso retirado aparece como activo;
- un contrato referenciado no existe;
- una unión discriminada queda incoherente;
- una variante no tiene tratamiento exhaustivo en las pruebas del paquete;
- versión o hash no coinciden;
- `current.ts` no corresponde a `current.json`;
- una versión publicada fue alterada;
- la documentación de exports quedó desactualizada.

Comando conceptual obligatorio:

```text
validate catalog
+
generate types
+
verify clean diff
+
typecheck
+
test
```

#### 44. Pruebas contractuales mínimas

La implementación deberá incluir pruebas para:

##### 44.1 Claves

- una clave activa es `PermissionKey`;
- una cadena inventada no es `PermissionKey`;
- un alias no es `PermissionKey`;
- una clave legacy no es `PermissionKey`;
- una clave retirada no es `PermissionKey`.

##### 44.2 Modalidad

- cada modalidad produce la forma correcta de carriles;
- la combinación check-in sin turno es imposible;
- `is_operational` coincide con modalidad;
- `NOT_APPLICABLE` de área no aparece en carril operativo válido.

##### 44.3 Dispositivo y simulación

- los tres valores de dispositivo son exhaustivos;
- los tres valores de simulación son exhaustivos;
- `would_allow` no puede utilizarse como decisión real.

##### 44.4 Recurso

- los seis resultados territoriales son exhaustivos;
- `RESOLVED` contiene territorio válido;
- `MULTI_RESOLVED` no acepta conjunto vacío;
- `CONFLICT` contiene razones estructuradas;
- `ISOLATED` no se interpreta como `UNRESOLVED`.

##### 44.5 Versiones

- la versión generada coincide con el manifiesto;
- el hash generado coincide con `checksums.json`;
- `current` reexporta la versión indicada;
- una versión histórica conserva sus tipos.

##### 44.6 Compilación negativa

Deberán existir pruebas que confirmen que TypeScript rechaza:

- cadenas arbitrarias;
- categorías incompatibles;
- carriles inválidos;
- variantes incompletas;
- identificadores intercambiados;
- accesos no exhaustivos.

#### 45. Uso por consumidores

Las aplicaciones deberán importar tipos desde el paquete compartido.

Ejemplo conceptual:

```text
import type {
  PermissionKey,
  PermissionDefinition,
  ResourceResolution,
  PublishedCatalogVersion
} from "@vento/contracts/authorization/current"
```

Queda prohibido:

- copiar los tipos al repositorio consumidor;
- recrear una unión local;
- declarar `type Permission = string`;
- añadir localmente permisos no publicados;
- modificar la semántica mediante declaration merging;
- mantener una versión local divergente del catálogo.

#### 46. Compatibilidad con Supabase

Los tipos generados no sustituyen los tipos de base de datos.

Separación:

```text
TIPOS DE CATÁLOGO
→ significado contractual

TIPOS DE SUPABASE
→ forma física de tablas y RPC
```

Cuando una tabla o RPC transporte una clave de permiso:

- el valor de runtime se valida contra el catálogo;
- el tipo de base puede continuar siendo `string` si la generación de Supabase así lo produce;
- una capa de adaptación convierte de `string` validada a `PermissionKey`;
- no se editarán manualmente tipos generados por Supabase para aparentar una restricción que la base todavía no aplica;
- la futura migración deberá alinear integridad física y contrato desde `vento-shell`.

#### 47. Compatibilidad con RLS y RPC

TypeScript no protege por sí solo RLS, RPC o SQL.

Los tipos:

- reducen errores del consumidor;
- impiden claves desconocidas en código tipado;
- permiten APIs exhaustivas;
- documentan el contrato;

pero no reemplazan:

- validación server-side;
- autorización dentro de RPC `SECURITY DEFINER`;
- RLS;
- constraints;
- resolución territorial;
- precedencia de denegaciones;
- auditoría.

Toda entrada SQL continúa siendo no confiable hasta validarse en servidor.

#### 48. Relación con AUTH-CAT-019

AUTH-CAT-018 entrega el sistema de tipos y artefactos generados.

AUTH-CAT-019 deberá:

- definir la API ergonómica de constantes canónicas;
- reemplazar cadenas escritas manualmente;
- migrar guards, RPC clients, Server Actions y componentes;
- prohibir nuevas cadenas mediante lint o validación estática;
- resolver aliases solo en fronteras de compatibilidad;
- eliminar enums locales y listas duplicadas;
- verificar todos los consumidores.

Esta tarea no crea todavía como API final:

```text
PERMISSIONS.NEXO.INVENTORY.REMISSIONS.PREPARE
```

pero deja tipada y versionada la fuente desde la cual AUTH-CAT-019 deberá generarla.

#### 49. Relación con BLOQUE D

Las matrices canónicas deberán utilizar:

```text
PermissionKey
AppCode
AuthorizationRequirement
PermissionScopeCode
```

Una asignación no podrá utilizar:

- alias;
- permiso legacy;
- permiso retirado;
- cadena desconocida;
- alcance incompatible con `PermissionDefinition`.

Los tipos ayudarán a construir y validar las matrices, pero la asignación real seguirá requiriendo validación contractual y de runtime.

#### 50. Relación con BLOQUE E

BLOQUE E deberá reutilizar los tipos derivados para definir, sin duplicarlos:

```text
AccessContext
AuthorizationRequest
AuthorizationDecision
AuthorizationBlockedReason
ResolvedResourceContext
```

`AuthorizationDecision` deberá poder registrar como mínimo:

- `permission_key`;
- `catalog_version`;
- `schema_version`;
- `contract_hash`;
- modalidad evaluada;
- carriles evaluados;
- alcance;
- resolución territorial;
- lados requeridos;
- estado y propiedad;
- dispositivo y sesión cuando correspondan;
- resultado;
- razones estructuradas.

AUTH-CAT-018 no define todavía la estructura completa de la decisión ejecutable.

#### 51. Relación con auditoría y reproducción histórica

Una decisión histórica deberá poder vincularse con los tipos y metadatos de la versión exacta utilizada.

Por ello:

- las versiones generadas se conservan;
- los imports fijados pueden reproducir contratos históricos;
- `current` no se utiliza para reinterpretar decisiones antiguas;
- el hash forma parte de la evidencia;
- una versión retirada no se borra del historial;
- el código de reproducción deberá fallar si la versión requerida no está disponible.

#### 52. Seguridad de tipos

Queda prohibido utilizar los tipos para crear una falsa sensación de autorización.

Ejemplos:

```text
PermissionKey válido
≠ actor autorizado

ResourceId válido
≠ recurso visible

SiteId válido
≠ sede concedida

AuthorizationRequirement conocido
≠ carril satisfecho

RESOLVED
≠ alcance permitido
```

Los tipos describen valores y estados contractuales. La decisión final depende de actor, concesiones, denegaciones, contexto y recurso.

#### 53. Riesgos controlados

##### Riesgo 1 — Unión manual desactualizada

Control:

```text
catálogo publicado
→ generación automática
→ verificación de paridad
```

##### Riesgo 2 — Alias tratado como permiso activo

Control:

```text
PermissionAliasKey
≠ PermissionKey
```

##### Riesgo 3 — Todo se convierte en `string`

Control:

```text
uniones literales
+
fronteras de validación
+
tipos nominales donde corresponda
```

##### Riesgo 4 — Tipos estructurales demasiado permisivos

Control:

```text
uniones discriminadas
+
exactOptionalPropertyTypes
+
validación contractual
```

##### Riesgo 5 — Tipos reemplazan runtime security

Control:

```text
tipos
≠ RLS
≠ RPC authorization
≠ resource resolution
```

##### Riesgo 6 — `current` reinterpreta historia

Control:

```text
imports versionados
+
metadatos exactos
+
versiones inmutables
```

##### Riesgo 7 — Generación no reproducible

Control:

```text
entrada local versionada
+
orden determinista
+
CI clean diff
```

##### Riesgo 8 — Casts silencian errores

Control:

```text
validadores de frontera
+
pruebas negativas
+
prohibición de casts generalizados
```

##### Riesgo 9 — Tipos duplican constantes de AUTH-CAT-019

Control:

```text
018 genera valores base y tipos
019 define API ergonómica y migra consumidores
```

##### Riesgo 10 — Cambio incompatible sin versión mayor

Control:

```text
diff contractual
+
SemVer
+
bloqueo de consumidores incompatibles
```

#### 54. Fuera del alcance

AUTH-CAT-018 no define ni implementa:

- matrices de roles;
- asignaciones individuales;
- denegaciones concretas;
- `AccessContext` definitivo;
- `AuthorizationDecision` definitivo;
- motor de autorización;
- resolutores server-side;
- guards de rutas;
- RLS;
- RPC;
- migraciones;
- sincronización física con Supabase;
- API final de constantes anidadas;
- reemplazo de cadenas existentes;
- ESLint definitivo para prohibir cadenas;
- publicación efectiva de `@vento/contracts`;
- adopción en aplicaciones;
- versionado de cada repositorio consumidor.

Estos temas corresponden a AUTH-CAT-019, BLOQUE D, BLOQUE E y las fases de implementación.

#### 55. Invariantes

- El catálogo es la fuente técnica canónica.
- Los tipos son derivados.
- El JSON Schema define estructura.
- El catálogo publicado define valores literales.
- `schema_version` y `catalog_version` permanecen separados.
- Cada versión publicada produce tipos inmutables propios.
- `current` reexporta únicamente una versión publicada.
- `PermissionKey` contiene solo permisos canónicos activos.
- Las 140 claves aparecen exactamente una vez.
- `AppCode` contiene exactamente las diez aplicaciones publicadas.
- Alias, legacy y retirados son categorías incompatibles con `PermissionKey`.
- No se acepta una clave solo porque cumple el patrón textual.
- La modalidad se representa mediante unión discriminada.
- La combinación check-in sin turno es imposible.
- El requisito de área distingue `REQUIRED`, `SITE_SUFFICIENT` y `NOT_APPLICABLE`.
- Los alcances aprobados no se reducen a tres valores genéricos.
- Los dispositivos compartidos conservan sus tres modalidades.
- La simulación conserva sus resultados hipotéticos separados de una decisión real.
- La resolución territorial conserva seis resultados discriminados.
- Los resolutores son identificadores declarativos, no código ejecutable.
- TypeScript no sustituye validación de runtime.
- Supabase no redefine el contrato mediante sus tipos físicos.
- RLS y RPC no dependen exclusivamente de tipos cliente.
- Los archivos generados no se editan manualmente.
- La generación es determinista.
- CI detecta divergencia entre catálogo y tipos.
- Las comprobaciones exhaustivas fallan ante variantes desconocidas.
- Una versión mayor incompatible bloquea consumidores no compatibles.
- Las decisiones históricas pueden fijar la versión exacta.
- AUTH-CAT-019 utilizará estos artefactos sin crear otra fuente.
- La aprobación documental no implementa ni publica archivos por sí sola.

#### 56. Criterios de aprobación

AUTH-CAT-018 podrá aprobarse cuando se acepte expresamente que:

- los tipos se derivan del JSON Schema y del catálogo publicado;
- no existirá una unión manual independiente de permisos;
- `PermissionKey` contendrá exactamente las 140 claves activas cuando la versión inicial sea publicada;
- `AppCode` contendrá exactamente las diez aplicaciones;
- alias, legacy y retirados tendrán tipos separados;
- las modalidades se representarán mediante uniones discriminadas;
- los carriles impedirán estados inválidos;
- los alcances conservarán toda la semántica aprobada;
- dispositivo compartido y simulación conservarán sus valores canónicos;
- los contratos de recurso expondrán identificadores literales derivados;
- la resolución territorial conservará los seis resultados aprobados;
- existirán salidas versionadas y un reexport `current`;
- los tipos históricos no se sobrescribirán;
- se preferirán uniones literales y valores `readonly` generados sobre enums manuales;
- las fronteras externas validarán runtime antes de producir tipos canónicos;
- la generación será determinista y verificable en CI;
- una divergencia entre catálogo y tipos bloqueará integración;
- TypeScript no sustituirá RLS, RPC ni validación server-side;
- AUTH-CAT-019 será responsable de reemplazar cadenas y migrar consumidores;
- esta tarea permanece exclusivamente documental.

#### 57. Resultado aprobado esperado

```text
DOCUMENTO CANÓNICO
→ DECISIONES NORMATIVAS

CATÁLOGO JSON PUBLICADO
→ FUENTE TÉCNICA DE CONTENIDO

JSON SCHEMA VERSIONADO
→ FUENTE TÉCNICA DE ESTRUCTURA

GENERADOR
→ PROYECCIÓN DETERMINISTA

TYPESCRIPT GENERADO
→ TIPOS ESTRICTOS Y VERSIONADOS

APLICACIONES
→ CONSUMIDORES
```

Resultado central:

```text
PERMISSION KEY
≠ string libre

ALIAS
≠ permiso canónico

TIPO GENERADO
≠ fuente de verdad paralela

COMPILACIÓN CORRECTA
≠ autorización concedida
```

#### 58. Impacto sobre tareas posteriores

##### AUTH-CAT-019

Deberá utilizar estos tipos y valores derivados para eliminar cadenas manuales, generar constantes canónicas y validar todos los consumidores.

##### BLOQUE D

Las matrices deberán construirse con claves, aplicaciones y alcances tipados, y validarse contra la versión vigente del catálogo.

##### BLOQUE E

El contexto y la decisión de autorización reutilizarán los tipos de permiso, versión, carriles, alcance, dispositivo, simulación y resolución de recurso.

##### Implementación

La futura implementación deberá realizarse en `vento-shell`, incluir generación reproducible, pruebas, CI, documentación, mecanismo de rollback y verificación de consumidores.

Toda migración de Supabase asociada deberá crearse y documentarse en `vento-shell`.

#### 59. Estado final de la propuesta

| Tarea        | Estado      |
| ------------ | ----------- |
| AUTH-CAT-017 | APROBADA    |
| AUTH-CAT-018 | APROBADA    |
| AUTH-CAT-019 | NO INICIADA |

No se avanza a AUTH-CAT-019 hasta recibir aprobación explícita.


**APROBADA**

### ✅ AUTH-CAT-019 — Evitar cadenas de permisos escritas manualmente

#### 1. Identificación de la tarea

| Campo                     | Valor                                                          |
| ------------------------- | -------------------------------------------------------------- |
| Bloque                    | BLOQUE C — Catálogo canónico de aplicaciones y permisos        |
| Tarea                     | AUTH-CAT-019 — Evitar cadenas de permisos escritas manualmente |
| Estado                    | **APROBADA**                                                   |
| Naturaleza                | Definición contractual y diseño de adopción                    |
| Implementación física     | No incluida en esta fase documental                            |
| Tarea anterior vigente    | AUTH-CAT-018 — Crear tipos TypeScript derivados del catálogo   |
| Tarea posterior reservada | AUTH-RBAC-001 — Crear matriz de propietario                    |

Esta tarea define cómo deberán referenciarse las claves canónicas de permisos
en aplicaciones, paquetes, configuraciones, pruebas, migraciones, SQL,
eventos e integraciones.

No realiza todavía:

- creación o modificación de archivos en repositorios;
- ejecución de generadores o codemods;
- publicación de paquetes;
- cambios en aplicaciones consumidoras;
- migraciones de Supabase;
- cambios en tablas, RLS, RPC, funciones o políticas;
- reemplazo físico de cadenas existentes;
- modificación de matrices;
- retiro de aliases o claves legacy;
- implementación de lint, escáneres o CI.

Toda implementación futura deberá respetar este contrato y quedar versionada
en `vento-shell`.

#### 2. Problema que se resuelve

Aunque el snapshot histórico define 112 permisos y el conjunto vigente tiene 140 identidades activas, AUTH-CAT-018
establece tipos derivados, los consumidores todavía podrían escribir:

```text
"nexo.inventory.remissions.request"
"viso.workforce.employees.update"
"fogo.production.batches.create"
```

en componentes, rutas, guards, server actions, handlers, hooks, servicios,
RPC, matrices, pruebas, fixtures, configuraciones, scripts, migraciones,
funciones SQL, políticas RLS, eventos o integraciones.

Esto permite:

1. errores tipográficos detectados únicamente en runtime;
2. uso accidental de claves legacy o retiradas;
3. diferencias entre frontend, servidor, Supabase y pruebas;
4. construcción dinámica de claves inexistentes;
5. casts que aparentan seguridad sin validar;
6. copias locales del catálogo;
7. dificultad para identificar consumidores;
8. cambios contractuales que CI no puede bloquear.

Regla principal:

> UNA CLAVE DE PERMISO NO SE ESCRIBE NI SE CONSTRUYE EN UN CONSUMIDOR.
>
> SE IMPORTA DESDE EL CONTRATO GENERADO O SE VALIDA EN UN LÍMITE EXTERNO.

#### 3. Objetivo

Todo consumidor deberá utilizar:

- constantes generadas;
- tipos literales derivados;
- helpers tipados;
- validación runtime en fronteras externas;
- aliases únicamente en la capa de compatibilidad;
- artefactos declarativos o SQL generados cuando TypeScript no pueda
  importarse directamente;
- controles automáticos que impidan nueva deuda.

Flujo:

```text
CATÁLOGO PUBLICADO
        ↓
GENERADOR
        ↓
PERMISSIONS + PermissionKey + PARSERS
        ↓
CONSUMIDORES TIPADOS
        ↓
VALIDACIÓN ESTÁTICA Y RUNTIME
```

#### 4. Base normativa

Esta propuesta conserva las decisiones históricas y aplica la reconciliación vinculante de AUTH-CAT-017: el snapshot de 112 claves se preserva como antecedente, mientras que los consumidores futuros deben utilizar el conjunto vigente de 140 identidades activas. Esta corrección no concede permisos ni publica contratos por sí misma.

Esta propuesta conserva sin cambios:

- ADR-AUTH-001;
- AUTH-CAT-001 a AUTH-CAT-016;
- AUTH-CAT-017 — Catálogo versionado en `vento-shell`;
- AUTH-CAT-018 — Tipos TypeScript derivados.

Reglas heredadas:

> Una capacidad empresarial tiene una única clave canónica.

> Un alias legacy no es una capacidad adicional.

> Las aplicaciones consumen el paquete compartido y no copias locales.

> TypeScript no valida datos externos en tiempo de ejecución.

> Un cast `as PermissionKey` no convierte una cadena desconocida en válida.

#### 5. Fuente única de referencias

La única fuente semántica autorizada será el catálogo publicado definido en
AUTH-CAT-017.

La API generada será una proyección reproducible del catálogo.

No serán fuentes de verdad alternativas:

- objetos o enums locales;
- arrays manuales;
- constantes duplicadas;
- tablas copiadas desde Supabase;
- rutas o nombres de componentes;
- pruebas;
- documentación;
- políticas SQL antiguas;
- archivos históricos.

Jerarquía:

```text
CATÁLOGO DECLARATIVO PUBLICADO
        ↓ genera
API DE CONSTANTES Y TIPOS
        ↓ consumen
APLICACIONES, SQL, CONFIGURACIONES Y PRUEBAS
```

#### 6. API ergonómica canónica

La futura implementación deberá publicar un objeto generado:

```text
PERMISSIONS
```

Ejemplos:

```text
PERMISSIONS.SHELL.ACCESS

PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST

PERMISSIONS.VISO.WORKFORCE.EMPLOYEES.UPDATE

PERMISSIONS.FOGO.PRODUCTION.BATCHES.CREATE
```

Cada hoja terminal contendrá exactamente la clave canónica:

```text
PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST
→ "nexo.inventory.remissions.request"
```

Propiedades obligatorias:

- generado automáticamente;
- inmutable;
- tipado con literales exactos;
- basado en una versión publicada;
- orden determinista;
- sin claves legacy activas;
- sin claves retiradas;
- sin permisos técnicos;
- sin valores construidos en runtime.

#### 7. Conversión determinista de identificadores

La conversión será mecánica.

```text
nexo.inventory.stock_counts.perform
```

se proyectará como:

```text
PERMISSIONS.NEXO.INVENTORY.STOCK_COUNTS.PERFORM
```

Reglas:

- cada segmento separado por punto crea un nivel;
- los identificadores usan `UPPER_SNAKE_CASE`;
- no se crean abreviaciones;
- no se traducen nombres;
- no se omiten niveles;
- una colisión bloquea la generación;
- la clave original permanece como valor terminal.

La forma `<app>.access` se proyectará como:

```text
PERMISSIONS.<APP>.ACCESS
```

#### 8. Prohibición de cadenas manuales

Quedará prohibido escribir claves canónicas o legacy dentro del código
ejecutable de un consumidor.

Prohibido:

```text
hasPermission("nexo.inventory.remissions.request")

requiredPermission:
  "viso.workforce.employees.update"
```

Requerido:

```text
hasPermission(
  PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST
)

requiredPermission:
  PERMISSIONS.VISO.WORKFORCE.EMPLOYEES.UPDATE
```

La regla aplica a TypeScript, TSX, JavaScript, JSX, servidor, cliente,
aplicaciones web, aplicaciones nativas, paquetes, scripts, workers,
Edge Functions, pruebas y fixtures ordinarios.

#### 9. Prohibición de construcción dinámica

Quedará prohibido construir claves mediante:

- interpolación;
- concatenación;
- `Array.join`;
- nombres de ruta;
- nombres de archivo o componente;
- combinación de app, módulo, recurso y acción;
- etiquetas humanas.

Ejemplos prohibidos:

```text
`${app}.${module}.${resource}.${action}`

[app, module, resource, action].join(".")
```

Regla:

```text
SEGMENTOS VÁLIDOS
+
FORMA VÁLIDA
≠
PERMISO CANÓNICO EXISTENTE
```

#### 10. Prohibición de casts como validación

Quedarán prohibidas expresiones equivalentes a:

```text
value as PermissionKey
unknownValue as PermissionKey
permissionString as keyof typeof PERMISSIONS
```

salvo dentro de código generado o de un parser cubierto por pruebas.

Reglas:

- `PermissionKey` no equivale a `string`;
- valores externos pasan por `parsePermissionKey`;
- claves desconocidas fallan de forma cerrada;
- no existe fallback permisivo;
- `as const` y `satisfies` no sustituyen validación runtime.

#### 11. Firmas tipadas obligatorias

Toda API interna que reciba una clave activa deberá usar `PermissionKey` o
un subtipo más restrictivo.

```text
hasPermission(
  permission: PermissionKey,
  context?: AuthorizationContextInput
)

requirePermission(
  permission: PermissionKey,
  context?: AuthorizationContextInput
)

evaluateAuthorization(
  permission: PermissionKey,
  context: AccessContext,
  resource?: ResourceReference
)
```

Cuando corresponda se usarán:

```text
OperationalPermissionKey
SensitivePermissionKey
PermissionKeyForApp<"nexo">
PermissionKeysByAuthorizationRequirement<"BASE_ONLY">
```

No se ampliarán estas firmas a `string`.

#### 12. Rutas y navegación

Las rutas consumen permisos; no los crean.

```text
{
  route: "/remisiones",
  requiredPermission:
    PERMISSIONS.NEXO.INVENTORY.REMISSIONS.VIEW
}
```

Una superficie podrá declarar:

```text
mode: "ALL" | "ANY"
permissions: readonly PermissionKey[]
```

No podrá:

- derivar permisos desde la URL;
- convertir segmentos dinámicos en claves;
- registrar capacidades desde páginas;
- mezclar permiso y alcance en una cadena.

#### 13. Componentes, frontend y servidor

Los componentes podrán usar permisos para visibilidad, habilitación y
explicación de bloqueo:

```text
<PermissionGate
  permission={PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST}
>
```

La acción del servidor verificará la misma clave:

```text
requirePermission(
  PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST
)
```

Invariante:

```text
MISMA CAPACIDAD
→ MISMA CLAVE
→ FRONTEND Y SERVIDOR
```

El frontend no será la autoridad final.

#### 14. Server actions, API y RPC

Cuando una acción tenga una capacidad fija, el servidor declarará la
constante y no aceptará como autoridad la clave enviada por el cliente.

```text
const REQUIRED_PERMISSION =
  PERMISSIONS.NEXO.INVENTORY.REMISSIONS.PREPARE
```

Regla:

```text
CLIENTE
→ solicita operación

SERVIDOR
→ conoce permiso requerido

EVALUADOR
→ decide
```

Cuando una API administrativa reciba una referencia como dato deberá
aplicar `parsePermissionKey`.

#### 15. Matrices y configuración TypeScript

Las matrices de BLOQUE D usarán constantes y tipos derivados.

```text
const OWNER_PERMISSIONS = [
  PERMISSIONS.SHELL.ACCESS,
  PERMISSIONS.VISO.WORKFORCE.EMPLOYEES.VIEW
] satisfies readonly PermissionKey[]
```

Reglas:

- cada entrada se valida contra la versión vigente;
- no se permiten claves desconocidas, legacy o retiradas;
- allow y deny usan la misma clave canónica;
- los aliases se resuelven antes de consolidar;
- no se construyen claves desde nombres de rol;
- las listas deberán generarse desde datasets canónicos cuando sea posible.

#### 16. JSON, YAML y formatos declarativos

Los formatos que no pueden importar TypeScript conservarán representación
textual, pero no texto libre.

Cada referencia deberá cumplir al menos una condición:

1. el archivo fue generado;
2. fue validado contra JSON Schema generado;
3. la herramienta de autoría ofrece solo valores canónicos;
4. CI ejecuta validación equivalente a `parsePermissionKey`;
5. pertenece al catálogo o al registro de compatibilidad.

Regla:

```text
SERIALIZACIÓN TEXTUAL VALIDADA
≠
CADENA MANUAL SIN CONTROL
```

#### 17. SQL, RLS, funciones y migraciones

PostgreSQL no puede importar una constante TypeScript.

Una clave textual dentro de SQL solo será admisible si procede de:

- fragmentos SQL generados;
- seeds generados;
- plantillas validadas contra el catálogo;
- referencias con integridad referencial;
- validación CI de cada literal;
- una migración histórica ya publicada e inmutable.

Todo SQL generado deberá registrar:

```text
catalog_version
catalog_hash
generator_version
```

No se reescribirán migraciones aplicadas.

Toda corrección se hará mediante una migración nueva creada y documentada en
`vento-shell`.

#### 18. Fronteras externas

La representación textual seguirá existiendo en:

- catálogo;
- artefactos generados;
- Supabase;
- RPC;
- eventos;
- JSON;
- persistencia;
- logs;
- auditoría;
- datos históricos;
- compatibilidad legacy;
- documentación.

Todo valor externo seguirá este flujo:

```text
unknown
    ↓
parsePermissionKey o resolvePermissionReference
    ↓
PermissionKey validada
```

Una cadena externa no podrá llegar directamente al evaluador.

#### 19. Aliases y claves legacy

Las claves legacy no se exportarán dentro de `PERMISSIONS`.

La compatibilidad utilizará por separado:

```text
PERMISSION_ALIASES
isPermissionAliasKey
resolvePermissionReference
```

Reglas:

- código nuevo no referencia aliases;
- un alias se acepta solo en fronteras de compatibilidad;
- se resuelve una sola vez;
- produce telemetría;
- no existen aliases encadenados o circulares;
- `DECOMPOSE_REQUIRED` no se resuelve automáticamente;
- `RETIRE_TECHNICAL` se rechaza;
- el alias no modifica alcance, modalidad, contexto ni recurso;
- una denegación legacy se consolida sobre la clave canónica.

#### 20. Claves retiradas y técnicas

No tendrán constantes públicas ni pertenecerán a `PermissionKey`.

Solo podrán existir en:

- datos históricos;
- manifiestos de retiro;
- mapas de migración;
- pruebas específicas;
- documentación;
- telemetría;
- migraciones históricas.

Su uso nuevo deberá fallar en generación, compilación cuando sea detectable,
runtime y CI.

#### 21. Paquete e importación

La API se publicará desde:

```text
@vento/contracts/authorization
```

Importación conceptual:

```text
import {
  PERMISSIONS,
  type PermissionKey,
  parsePermissionKey
} from "@vento/contracts/authorization"
```

Quedarán prohibidos:

- imports profundos;
- copias de archivos generados;
- catálogos locales;
- constantes locales duplicadas;
- lectura directa de JSON interno;
- rutas relativas hacia otro repositorio.

Los wrappers funcionales estarán permitidos, pero no redefinirán claves.

#### 22. Pruebas

Las pruebas ordinarias usarán las mismas constantes que producción.

```text
expectAllowed(
  PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST
)
```

Excepciones controladas:

- pruebas de parser;
- pruebas de aliases;
- pruebas de retirados;
- compatibilidad;
- snapshots generados;
- fixtures históricos.

Los valores inválidos se tratarán como `unknown`, no como `PermissionKey`.

#### 23. Validación estática

La futura implementación incorporará una regla equivalente a:

```text
@vento/no-manual-permission-strings
```

Deberá detectar:

- literales de permisos;
- claves legacy en código nuevo;
- concatenaciones y templates;
- arrays de strings usados como permisos;
- propiedades `permission`, `permissions`, `requiredPermission` o
  `permissionCode` con texto libre;
- helpers que reciben `string`;
- casts hacia `PermissionKey`;
- catálogos locales.

La regla no decide autorización; impide referencias no canónicas.

#### 24. Escáner transversal

Además de ESLint existirá un escáner para:

- `.ts`, `.tsx`, `.js`, `.jsx`;
- `.sql`;
- `.json`;
- `.yaml`, `.yml`;
- Edge Functions;
- scripts;
- configuraciones;
- migraciones nuevas.

Clasificación:

```text
ACTIVE_MANUAL_REFERENCE
LEGACY_REFERENCE
RETIRED_REFERENCE
DYNAMIC_CONSTRUCTION
UNVALIDATED_SERIALIZED_REFERENCE
GENERATED_REFERENCE
DOCUMENTATION_REFERENCE
FALSE_POSITIVE
```

#### 25. Allowlist limitada

Toda excepción registrará:

- archivo;
- regla o rango;
- motivo;
- propietario;
- clasificación;
- condición de retiro;
- versión del catálogo;
- tarea de migración cuando corresponda.

Excepciones admisibles:

- catálogo fuente;
- archivos generados;
- aliases;
- retirados;
- pruebas de parser;
- documentación;
- migraciones históricas;
- fixtures históricos explícitos.

No serán motivos válidos la rapidez, el uso único o que la cadena sea
correcta.

#### 26. Política de CI

CI bloqueará:

- nuevas cadenas manuales;
- construcción dinámica;
- casts no autorizados;
- claves desconocidas;
- claves legacy en código nuevo;
- claves retiradas;
- catálogos locales;
- artefactos generados desactualizados;
- allowlists incompletas;
- reducción de cobertura.

Responsabilidades mínimas:

```text
validate:authorization-catalog
generate:authorization-contracts
check:generated-clean
lint:permission-references
scan:permission-references
typecheck
test:authorization-contracts
```

#### 27. Adopción progresiva

##### Fase 0 — Baseline

- inventariar referencias;
- clasificar coincidencias;
- identificar consumidores;
- separar documentación, pruebas, SQL y código;
- detectar construcción dinámica;
- congelar baseline.

##### Fase 1 — Bloquear deuda nueva

- publicar paquete;
- exigir constantes en código nuevo;
- mantener allowlist temporal para deuda existente;
- impedir ampliar baseline.

##### Fase 2 — Migrar referencias activas

- reemplazar cadenas por `PERMISSIONS`;
- tipar firmas;
- eliminar arrays y catálogos locales;
- adaptar rutas, guards, acciones y pruebas.

##### Fase 3 — Migrar límites externos

- incorporar parsers;
- resolver aliases;
- validar JSON y eventos;
- adaptar RPC;
- generar SQL y seeds;
- registrar telemetría legacy.

##### Fase 4 — Retirar compatibilidad

- confirmar ausencia de consumidores legacy;
- reducir allowlist;
- retirar aliases aprobados;
- certificar baseline cero fuera de fronteras permitidas.

No se realizará reemplazo masivo sin clasificación previa.

#### 28. Codemods

Los codemods solo reemplazarán coincidencias inequívocas:

```text
clave canónica activa
→ constante generada exacta
```

No decidirán:

- descomposición de permisos amplios;
- sustitución de permisos técnicos;
- fusiones;
- cambios de alcance;
- cambios de modalidad;
- cambios de recurso;
- equivalencias entre aplicaciones.

Los casos ambiguos exigirán revisión humana.

#### 29. Inventario de consumidores

La implementación futura inventariará:

- `vento-shell`;
- `vento-anima`;
- `vento-viso`;
- `vento-nexo`;
- `vento-fogo`;
- `vento-origo`;
- `vento-pulso`;
- `vento-numera`;
- `vento-pass`;
- AURA cuando corresponda;
- Supabase;
- migraciones;
- Edge Functions;
- automatizaciones;
- pruebas;
- integraciones.

Cada referencia registrará repositorio, objeto, capa, clave, estado,
operación protegida, estrategia, resultado y evidencia.

#### 30. Consumidores no TypeScript

Un consumidor no TypeScript utilizará:

- JSON generado;
- esquema generado;
- SDK generado;
- constantes generadas en su lenguaje;
- endpoint contractual versionado;
- tabla proyectada con integridad referencial.

No podrá mantener un catálogo paralelo.

#### 31. Telemetría legacy

Toda resolución de alias registrará cuando corresponda:

- clave recibida;
- clave canónica;
- consumidor;
- versión;
- timestamp;
- contexto técnico;
- resultado.

Flujo:

```text
USO LEGACY
→ CONSUMIDOR IDENTIFICADO
→ MIGRACIÓN
→ RETIRO
```

Un alias no se retirará sin comprobar ausencia de consumidores.

#### 32. Relación con Supabase

Supabase almacenará claves canónicas o referencias con integridad
referencial según la arquitectura posterior.

Reglas:

- las aplicaciones no reconstruyen constantes desde Supabase;
- las claves almacenadas se validan contra el catálogo;
- las migraciones se generan o validan desde `vento-shell`;
- las RPC validan claves antes de autorizar;
- RLS y funciones no crean variantes;
- texto no vacío no equivale a permiso válido;
- aliases se resuelven explícitamente;
- retirados fallan de forma cerrada.

Toda migración futura deberá crearse y documentarse en `vento-shell`.

#### 33. Relación con BLOQUE D

AUTH-RBAC-001 en adelante deberán:

- referenciar permisos activos;
- usar claves canónicas;
- validar cada entrada;
- impedir legacy y retirados;
- usar tipos derivados en TypeScript;
- usar esquemas generados en formatos declarativos;
- conservar versión y hash;
- fallar ante cambios incompatibles.

BLOQUE D no podrá crear claves por conveniencia de una matriz.

#### 34. Relación con BLOQUE E y BLOQUE H

`AccessContext` y `AuthorizationDecision` usarán `PermissionKey` validada y
registrarán:

- clave canónica;
- referencia original cuando exista alias;
- versión;
- hash;
- consumidor;
- resultado;
- razones de bloqueo.

`@vento/contracts` será propietario de catálogo, tipos, constantes, parsers,
aliases, manifests, esquemas y metadatos de versión.

`@vento/auth` consumirá esos contratos para guards, evaluación, hooks,
componentes y wrappers, sin redefinir claves.

#### 35. Fuera del alcance

Esta tarea no determina:

- asignaciones por rol;
- excepciones individuales;
- permisos de dispositivos concretos;
- estructura final de tablas;
- esquemas definitivos de Supabase;
- RLS y RPC definitivas;
- implementación de contexto y decisión;
- framework exacto del generador, lint o codemod;
- orden final de migración de repositorios;
- fechas de retiro de aliases;
- publicación física del paquete.

Corresponde a BLOQUE D, BLOQUE E, BLOQUE H, BLOQUE J, BLOQUE R y las fases
de implementación por aplicación.

#### 36. Invariantes

1. Una capacidad tiene una única clave canónica.
2. Los consumidores no escriben claves manualmente.
3. Los consumidores no construyen claves dinámicamente.
4. `PERMISSIONS` se genera desde el catálogo publicado.
5. `PermissionKey` se deriva y no equivale a `string`.
6. Toda cadena externa se valida.
7. Un cast no sustituye validación.
8. Legacy no aparece en `PERMISSIONS`.
9. Los aliases se resuelven explícitamente.
10. Las claves retiradas fallan de forma cerrada.
11. Las rutas consumen permisos; no los crean.
12. Frontend y servidor usan la misma clave.
13. El cliente no decide el permiso de una acción fija.
14. SQL nuevo no introduce claves libres.
15. Las migraciones publicadas permanecen inmutables.
16. Toda corrección de Supabase se versiona en `vento-shell`.
17. Las matrices solo aceptan claves activas.
18. Las pruebas ordinarias usan constantes.
19. Las excepciones del escáner son limitadas y versionadas.
20. CI bloquea nueva deuda.
21. Un codemod no resuelve ambigüedades.
22. Ningún repositorio mantiene catálogo paralelo.
23. Catálogo y API generada conservan versión y hash.
24. El evaluador recibe una `PermissionKey` validada.

#### 37. Criterios de aprobación

AUTH-CAT-019 podrá aprobarse cuando se acepte que:

- la API pública utilizará `PERMISSIONS`;
- la proyección será determinista;
- las hojas contendrán claves literales canónicas;
- se prohibirán cadenas manuales y construcción dinámica;
- se prohibirán casts como validación;
- las firmas internas recibirán `PermissionKey`;
- rutas, componentes y acciones usarán constantes;
- el servidor fijará permisos de operaciones conocidas;
- JSON y YAML usarán validación generada;
- SQL nuevo se generará o validará contra el catálogo;
- aliases estarán separados de `PERMISSIONS`;
- retirados no serán exportados;
- pruebas ordinarias usarán constantes;
- existirán lint, escáner y CI;
- el baseline no podrá crecer;
- la migración será progresiva;
- codemods solo resolverán casos inequívocos;
- cada consumidor quedará inventariado;
- Supabase será una proyección contractual;
- BLOQUE D usará referencias canónicas validadas.

#### 38. Decisión final propuesta

```text
PROHIBIDO
├── "nexo.inventory.remissions.request"
├── `${app}.${module}.${resource}.${action}`
├── value as PermissionKey
├── catálogos locales
└── claves legacy en código nuevo

REQUERIDO
├── PERMISSIONS.NEXO.INVENTORY.REMISSIONS.REQUEST
├── PermissionKey
├── parsePermissionKey
├── resolvePermissionReference
├── validación estática
├── validación runtime
└── CI sin divergencias
```

Regla final:

> LOS PERMISOS SE DEFINEN UNA VEZ EN EL CATÁLOGO.
>
> LOS CONSUMIDORES IMPORTAN REFERENCIAS GENERADAS.
>
> LOS LÍMITES EXTERNOS VALIDAN TEXTO.
>
> NINGUNA APLICACIÓN INVENTA, CONSTRUYE O DUPLICA CLAVES.

#### 39. Estado final de la propuesta

| Tarea         | Estado      |
| ------------- | ----------- |
| AUTH-CAT-018  | APROBADA    |
| AUTH-CAT-019  | APROBADA    |
| AUTH-RBAC-001 | NO INICIADA |

AUTH-CAT-019 queda aprobada como cierre del BLOQUE C.

La continuidad documental pasa a:

AUTH-RBAC-001 — Crear matriz de propietario.
