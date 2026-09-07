# Corrección física de una implementación VERIFIED pendiente de merge

Este flujo resuelve el caso en que una instancia está VERIFIED en un PR de implementación y main todavía conserva su registro sin verificar. El registro histórico, su candidato y su evidencia permanecen intactos. Una corrección física tiene autorización, candidato y evidencia propios.

## Preparación y autorización

Primero publicar la infraestructura del lifecycle por su carril transversal. No incorporar sus scripts al alcance físico de la instancia.

Desde un checkout limpio, preparar el registro pendiente indicando el PR de implementación:

```powershell
fnm exec --using=.node-version npm.cmd run docs:correction:prepare -- --task-id SHELL-CI-020 --type PHYSICAL --reason-code IMPLEMENTATION_DEFECT --target-instance-id SHELL-CI-020::GAP-PKG-001 --implementation-pr 364 --block-target SHELL-CI-021::GAP-PKG-001
```

El comando consulta GitHub, sincroniza main y fija el SHA exacto del PR abierto del mismo repositorio. Devuelve el CORRECTION_ID realmente disponible; no se debe adivinar el ordinal. El registro incluye `integration` con PR, rama, SHA verificado, commit de main y hash del registro previo de main. `baseline` conserva el hash del contrato y del registro VERIFIED anclado.

Registrar con `docs:correction:register -- --correction-id <CORRECTION_ID>`. Este paso publica un PR documental de registro y lo integra a main mediante los gates existentes. Después, autorizar explícitamente el alcance correctivo en ese registro, con los TREQ afectados y comandos de validación, y pasar a AUTHORIZED. La autorización no permite cambiar la procedencia registrada.

## Trabajo correctivo

Ejecutar `docs:correction:start -- --correction-id <CORRECTION_ID>` desde main. El lifecycle crea `correction/<task>/corr-<nnn>` y combina main con el commit de implementación anclado; conserva la autorización local. Si Git detecta un conflicto, el comando se detiene y mantiene el estado para resolverlo. No hacer force-push ni modificar el PR original.

Aplicar únicamente el alcance autorizado de la corrección, ejecutar su reparación y batería contractual, y generar un candidato nuevo. La evidencia original no certifica el nuevo source. Si la instancia exige STAGING u otros ambientes, validar el nuevo candidato en esos mismos destinos antes de VERIFIED.

Para SHELL-CI-020 con superficies Supabase, después de commitear el candidato y antes del despliegue, ejecutar `docs:correction:candidate -- --correction-id <CORRECTION_ID>`. Este comando comprueba lint y prerrequisitos, genera MRP015-050 con el SHA y source nuevos y guarda la evidencia únicamente en la corrección. No ejecutar el productor que escribe evidencia en la instancia histórica. El cierre comprueba el nuevo MRP015-050 contra el candidato declarado en PRE_MERGE_VALIDATION, aunque después exista un commit de consolidación del ledger.

Antes de sellar, añadir a `evidence` exactamente un objeto con esta estructura; los valores deben proceder de las ejecuciones reales:

```json
{
  "type": "PRE_MERGE_VALIDATION",
  "candidate_commit": "<SHA completo del nuevo candidato publicado y validado>",
  "validation_commands": ["<comandos exactos del registro, en orden>"],
  "results": [{ "command": "<comando exacto>", "status": "PASS" }],
  "target_environments": ["<objetos exactos de target_environments de la instancia original>"],
  "remote_evidence": ["<evidencia atribuible al nuevo candidato y despliegue>"]
}
```

El validador exige un commit nuevo descendiente del snapshot original, correspondencia entre sus blobs y los archivos correctivos actuales, PASS por cada comando y evidencia remota cuando corresponda. `target_environments` y `remote_evidence` solo son obligatorios si la instancia original exige destinos remotos. El ejemplo es un esquema explicativo, no evidencia ejecutada.

## Cierre conjunto

`docs:correction:finish -- --correction-id <CORRECTION_ID>` valida por separado el alcance de la implementación original y el delta correctivo. Rechaza cambios al registro VERIFIED, archivos fuera del alcance, migraciones históricas, cambios de procedencia y un PR original cuyo HEAD ya no coincida. Conserva los prerrequisitos físicos de SHELL-CI-020 y ejecuta lint sobre todo el candidato.

El PR de corrección integra ambos historiales a main. Espera los checks remotos y solo mergea el HEAD validado. Sus bloqueos permanecen activos hasta VERIFIED en main. El resultado identifica `SUPERSEDED_IMPLEMENTATION_PR`; el PR original queda reemplazado por esta integración y puede cerrarse sin merge tras comprobar el resultado. No volver a ejecutar `implementation:finish` sobre el candidato original.

## Prevención en nuevas implementaciones

Estando IMPLEMENTED y antes de consolidar VERIFIED:

```powershell
fnm exec --using=.node-version npm.cmd run docs:implementation:preverify -- --instance-id <INSTANCE_ID>
```

El comando sincroniza la referencia de main y comprueba alcance y lint desde el merge-base hasta el worktree, incluyendo commits, cambios locales y archivos nuevos. No cambia el estado ni sustituye la batería contractual o la evidencia remota. `implementation:finish` repite el ratchet con el mismo alcance completo para detectar diferencias posteriores.
