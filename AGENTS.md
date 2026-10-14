# Reglas de trabajo en vento-shell

## Lectura obligatoria antes de trabajar

- **Primera lectura sustantiva:** antes de investigar, consultar fuentes del repositorio, modificar código, diseñar cambios, ejecutar validaciones o continuar una implementación de VENTO OS, abrir y leer íntegramente `docs/VENTO_OS_PLAN_OPERATIVO_IMPLEMENTACION_GLOBAL.md` en su revisión vigente. Este documento es el punto de entrada operativo para `vento-shell` y para el trabajo multi-repositorio coordinado desde aquí. Mencionar el archivo sin leerlo no satisface esta regla.
- Si el plan no está disponible o no puede leerse por completo, **no continuar con decisiones ni cambios** basados en su supuesto contenido: registrar el bloqueo y conservar el estado del trabajo.
- Tras la lectura inicial, contrastar `docs/plan-canonico/modular/01_PROTOCOLO.md`, `90_ORDEN_DE_IMPLEMENTACION.md`, las políticas, la tarea propietaria, la frontera de paquetes y la evidencia física vigente. Verificar repositorios, autorizaciones y requisitos reales antes de operar.
- Esta es una **prioridad de consulta**, no una transferencia de autoridad. El plan operativo no reemplaza tareas, registro 04A, gates, autorizaciones físicas ni el lifecycle, y no habilita cambios por sí solo.
- No sustituir el plan ni el estado observado por memoria, resúmenes de conversación o iniciadores históricos. Los estados y snapshots del documento son cortes fechados, no pruebas vigentes.

- Todo trabajo de Supabase para VENTO se crea, versiona y ejecuta desde este repositorio.
- Antes de preparar un commit, inspeccionar `git status --short` y separar cambios ajenos al alcance activo.
- No usar `git add -A`, `git add .` ni staging global cuando existan cambios concurrentes.
- Para una tarea canónica, añadir únicamente su fragmento propietario y los derivados sincronizados que le correspondan.
- Los cambios transversales de `scripts/docs`, políticas, plantillas, CI o configuración deben quedar en un commit distinto del desarrollo de una tarea canónica.
- No aprobar tareas, cambiar marcadores ni avanzar continuidad sin `APROBADO` explícito del usuario.
- El formato automático, el build, una prueba local o un commit no constituyen aprobación.
- Ejecutar `npm run docs:commit-scope:check -- --staged` antes de confirmar cambios del plan.
