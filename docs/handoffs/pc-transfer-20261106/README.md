# VENTO: continuar en el segundo PC

Checkpoint del 6 de noviembre de 2026. Se preservaron los 17 archivos pendientes en cuatro commits, todas las puntas de ramas locales y nueve stashes (ocho Shell, uno Nexo). Publicacion verificada por SHA remoto. Es un respaldo de trabajo pendiente; no acredita pruebas funcionales, cierre de tareas ni aprobacion de integracion.

## Preparar el otro PC

1. Instalar Git y autenticar la cuenta de GitHub que tiene acceso a los repositorios privados (`gh auth login` y `gh auth setup-git` si se usa GitHub CLI).
2. Obtener la guia y el script desde GitHub:

```powershell
git clone --depth 1 --branch handoff/pc-20261106/guide https://github.com/vento-group-sas/vento-shell.git Vento-traslado-20261106
& ./Vento-traslado-20261106/docs/handoffs/pc-transfer-20261106/Restore-VentoWorkspace.ps1
```

3. El script usa por defecto `~/devVentoGroup-transfer-20261106`. Para otra carpeta, ejecutar el script con `-Root`:

```powershell
& ./Vento-traslado-20261106/docs/handoffs/pc-transfer-20261106/Restore-VentoWorkspace.ps1 -Root 'D:\Desarrollo\VENTO'
```

El script crea los 12 repositorios y los cinco worktrees, conserva las ramas locales en sus SHAs exactos, restaura los nueve stashes sin aplicarlos y genera el workspace. Si encuentra alguna de las carpetas de destino ya existente, se detiene antes de escribir. Puede ejecutarse con `-PlanOnly` para mostrar el destino sin modificarlo.

4. Abrir `Vento.code-workspace` dentro de la carpeta de destino en VS Code.
5. Instalar dependencias por repositorio segun sus archivos y version de Node. Transferir la configuracion `.env` por un medio privado; no se incluye aqui. Tampoco se transfieren bases locales, Docker volumes, credenciales, instalaciones VS Code, builds ni carpetas ignoradas.

## Ramas activas del checkpoint

| Carpeta | Rama para continuar | Commit |
| --- | --- | --- |
| `vento-anima` | `handoff/pc-20261106` | `9a844cadc179` |
| `vento-fogo` | `chore/next-security-fogo` | `261a3140594c` |
| `vento-nexo` | `main` | `b699dd7d2b49` |
| `vento-origo` | `fix/gap-pkg-004-origo-pdf-token` | `985eee77a982` |
| `vento-pass` | `handoff/pc-20261106` | `bf207d27b286` |
| `vento-pulso` | `handoff/pc-20261106` | `a5865fc4978d` |
| `vento-shell` | `infra/package-gate-gap-pkg-004` | `f9bc22634c23` |
| `vento-talento` | `main` | `adb3d0cd11d9` |
| `vento-viso` | `fix/gap-pkg-004-viso-qa` | `94d3b8fd7230` |
| `vento-numera` | `chore/next-security-numera` | `1cdc7bb9c4fa` |
| `vento-group-web` | `main` | `aa5290cb2336` |
| `vento-shell-correction-auth-db-034-corr-002` | `handoff/pc-20261106/auth-db-034-corr-002` | `a430827b9623` |
| `vento-shell-qa-kernel` | `infra/qa-kernel-f2-per-test-preflight` | `d85b981dda80` |
| `vento-mcp` | `main` | `0667e4fad52d` |
| `vento-shell-os-context` | `work/os-context-1058` | `c3a1723aca88` |
| `vento-shell-qa-kernel-p1` | `infra/qa-kernel-p1-contracts` | `b10799d406d5` |
| `vento-mcp-qa-rootless` | `infra/qa-kernel-rootless-runtime` | `cb67e8c1812e` |

## Stashes e historial

Las copias remotas estan bajo `handoff/pc-20261106/stash-*` en Shell y Nexo. El script los registra como stashes locales en el orden original; no ejecuta `stash pop` ni `stash apply`. Los stashes originales permanecen intactos en el PC principal.

Las ramas antiguas o divergentes con historia exclusiva se preservaron bajo `handoff/pc-20261106/preserve/*`; no se reemplazaron ramas remotas divergentes. El manifiesto relaciona cada rama local con su tracking remoto. MCP conserva su `main` y su rama historica rootless ya existente; no se fusionaron.

## Alternar diariamente entre PCs

- Antes de cambiar de equipo: revisar los archivos, crear commits de trabajo pendiente y hacer `git push` en la rama que se esta usando. Los commits sin push y los nuevos stashes quedan solo en ese PC.
- Al llegar al otro equipo: con Git limpio, ejecutar `git pull --ff-only` en esa misma rama antes de editar.
- Si el pull indica divergencia o hay cambios locales, detener esa actualizacion y reconciliar los cambios. No usar reset, clean ni force push para resolverlo automaticamente.
- La integracion y las pruebas funcionales siguen pendientes en su alcance original. No se modificaron gates ni estados canonicos.

## Validacion del traslado

- 27 referencias enviadas y contrastadas con `git ls-remote` por SHA exacto.
- Todas las puntas de ramas locales inventariadas alcanzables desde las ramas publicadas.
- 17 worktrees del workspace limpios y 17 archivos de checkpoint con los mismos bytes de origen.
- Nueve stashes originales intactos; el script recupera tambien sus padres de indice y archivos no rastreados cuando existen.
- Script de restauracion validado sintacticamente y ejecutado con un repositorio sintetico: commits exactos, worktree vinculado, stash de tres padres y rechazo de un destino existente.
- No se ejecutaron pruebas funcionales de las aplicaciones durante este respaldo.
