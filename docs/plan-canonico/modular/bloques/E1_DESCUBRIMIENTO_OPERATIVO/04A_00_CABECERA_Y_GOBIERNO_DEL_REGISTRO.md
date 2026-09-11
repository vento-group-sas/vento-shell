## REGISTRO CANÓNICO DE REQUISITOS DE PRUEBA

### Propósito

Este registro conserva todos los comportamientos que deberán quedar protegidos
mediante pruebas automatizadas o validaciones manuales controladas.

Un requisito de prueba no equivale por sí mismo a una tarea del roadmap.

Cada requisito deberá vincularse con:

- la tarea que lo originó;
- la regla o comportamiento protegido;
- el riesgo que evita;
- el tipo de prueba;
- la tarea o paquete que deberá implementarlo;
- la etapa en la que deberá implementarse;
- la evidencia de su ejecución.

### Convención de identificadores

Los requisitos utilizarán:

`TREQ-<DOMINIO>-<SECUENCIA>`

La secuencia utiliza un minimo de tres digitos (`001` a `999`) y continúa sin truncamiento cuando supera ese rango (`1000`, `1001`, ...).

Dominios iniciales:

- `AUTH`;
- `GAP`;
- `PROC`;
- `SHELL`;
- `SUPABASE`;
- `ANIMA`;
- `AURA`;
- `VISO`;
- `NEXO`;
- `FOGO`;
- `ORIGO`;
- `PULSO`;
- `NUMERA`;
- `DATA`;
- `CONT`;
- `PASS`;
- `TALENTO`;
- `INTEGRATION`;
- `UX`.

### Estados permitidos

| Estado         | Significado                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `IDENTIFICADO` | necesidad detectada con identificador, origen, regla, riesgo y tarea responsable |
| `ESPECIFICADO` | escenario, entradas, contexto y resultado esperado definidos                     |
| `PLANIFICADO`  | vinculado con un paquete, repositorio, ambiente y criterio de aceptación         |
| `IMPLEMENTADO` | prueba automatizada o procedimiento manual controlado disponible                 |
| `VERIFICADO`   | ejecución aprobada con evidencia reproducible                                    |
| `DIFERIDO`     | aplazado con justificación, riesgo aceptado, tarea y puerta de resolución        |
| `DESCARTADO`   | no aplica o estaba duplicado, con justificación aprobada                         |
| `OBSOLETO`     | el comportamiento fue retirado o reemplazado, conservando su historial           |

### Tipos permitidos

- unitaria;
- contractual;
- integración;
- base de datos;
- migración;
- RLS;
- RPC;
- seguridad;
- concurrencia;
- idempotencia;
- E2E;
- regresión;
- interfaz;
- manual operativa;
- experiencia;
- hardware.

### Resumen vigente

| Métrica                           |        Resultado |
| --------------------------------- | ---------------: |
| Requisitos vigentes               |         **7066** |
| Dominios con requisitos           |           **19** |
| Filas con catorce columnas        | **7066 de 7066** |
| Identificadores duplicados        |            **0** |
| Relaciones `TREQ-*` no resolubles |            **0** |
| Última tarea incorporada          | `NEXO-DOM-001` |
| Fecha de normalización            |     `2026-08-17` |

Distribución vigente:

| Dominio       | Rango                                           | Cantidad |
| ------------- | ----------------------------------------------- | -------: |
| `AUTH`        | `TREQ-AUTH-001` a `TREQ-AUTH-331`               |      331 |
| `GAP`         | `TREQ-GAP-001`                                  |        1 |
| `PROC`        | `TREQ-PROC-001` a `TREQ-PROC-1560`              |     1560 |
| `SHELL`       | `TREQ-SHELL-001` a `TREQ-SHELL-098`             |       98 |
| `SUPABASE`    | `TREQ-SUPABASE-001` a `TREQ-SUPABASE-1770`      |     1770 |
| `ANIMA`       | `TREQ-ANIMA-001` a `TREQ-ANIMA-025`             |       25 |
| `AURA`        | `TREQ-AURA-001` a `TREQ-AURA-027`               |       27 |
| `VISO`        | `TREQ-VISO-001` a `TREQ-VISO-048`               |       48 |
| `NEXO`        | `TREQ-NEXO-001` a `TREQ-NEXO-314`               |      314 |
| `FOGO`        | `TREQ-FOGO-001` a `TREQ-FOGO-024`               |       24 |
| `ORIGO`       | `TREQ-ORIGO-001` a `TREQ-ORIGO-025`             |       25 |
| `PULSO`       | `TREQ-PULSO-001` a `TREQ-PULSO-027`             |       27 |
| `NUMERA`      | `TREQ-NUMERA-001` a `TREQ-NUMERA-024`           |       24 |
| `DATA`        | `TREQ-DATA-001` a `TREQ-DATA-240`               |      240 |
| `CONT`        | `TREQ-CONT-001` a `TREQ-CONT-006`               |        6 |
| `PASS`        | `TREQ-PASS-001` a `TREQ-PASS-042`               |       42 |
| `TALENTO`     | `TREQ-TALENTO-001` a `TREQ-TALENTO-097`         |       97 |
| `INTEGRATION` | `TREQ-INTEGRATION-001` a `TREQ-INTEGRATION-317` |      317 |
| `UX`          | `TREQ-UX-001` a `TREQ-UX-2090`                  |     2090 |

### Procedimiento obligatorio de actualización

1. Los requisitos nuevos **no se entregarán ni incorporarán como filas sueltas**.
2. Cuando una tarea genere, modifique, difiera, descarte u obsolete un `TREQ-*`, se regenerará el registro lógico completo desde su última versión canónica.
3. La fuente física canónica es la familia `04A_00_*` a `04A_20_*`, ordenada exclusivamente por `manifest.json`; cada dominio permanece en un único fragmento.
4. El registro lógico regenerado deberá ordenar los requisitos por el orden de dominios declarado en este documento y, dentro de cada dominio, por número ascendente.
5. La escritura automatizada distribuirá el registro lógico entre sus fragmentos; no se localizarán puntos de inserción ni se combinarán tablas manualmente.
6. La entrega externa podrá seguir usando un único archivo completo para transporte y validación, pero su incorporación al repositorio deberá persistirse en la familia modular.
7. La entrega deberá incluir validación de identificadores únicos, dominio coherente, secuencia, catorce columnas, estados permitidos y relaciones resolubles.
8. El documento de la tarea solo enumerará los identificadores creados o modificados y remitirá a este registro como única fuente de detalle.
9. Quedan prohibidos los archivos paralelos `TREQ_NUEVOS_*` como mecanismo de actualización canónica.
10. Las celdas `ID` y `Dominio` de cada fila deberán escribirse entre backticks. Los validadores deberán normalizar backticks opcionales antes de interpretar identificadores y nunca inferir pérdida histórica únicamente por diferencias de presentación Markdown.
11. Cualquier generación o modificación que se haga al registro se hará en su debido fragmento y no sobre el 04A compilado

### Registro
