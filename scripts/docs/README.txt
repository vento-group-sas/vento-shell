PLAN CANÓNICO MODULAR

Comandos desde la raíz de vento-shell:

1. Regenerar continuidad, reconciliar reemplazos completos y compilar:

   npm run docs:plan:build

2. Verificar que las fuentes y los derivados están sincronizados:

   node scripts/docs/build-plan-canonico.mjs --check

3. Ejecutar las pruebas de continuidad y del registro TREQ:

   npm run docs:plan:test
   npm run docs:treq:test

4. Validar directamente el registro canónico TREQ:

   npm run docs:treq:check

5. Validar catálogo, aplicaciones y cobertura semántica de pantallas:

   npm run docs:screens:check

6. Validar propietarias y consumidoras de todos los procesos:

   npm run docs:process-apps:check

7. Validar cada vínculo pantalla-proceso y su cobertura:

   npm run docs:screen-processes:check

8. Preparar la tarea actual sin modificar archivos:

   npm run docs:task:preflight

   Para consultar otra tarea o producir salida estructurada:

   npm run docs:task:preflight -- --task-id <TASK-ID> --json

   No es necesario ejecutar este comando durante el trabajo normal. VS Code
   inicia el watcher al abrir vento-shell y el build ejecuta automáticamente el
   preflight y el formateo seguro de la tarea actual y la última aprobada.

9. Comprobar o aplicar el formato de una tarea concreta:

   npm run docs:task:format -- --file <fragmento.md> --task-id <TASK-ID> --check
   npm run docs:task:format -- --file <fragmento.md> --task-id <TASK-ID> --write

   Para preparar una tarea NO INICIADA que todavía solo tiene encabezado:

   npm run docs:task:format -- --file <fragmento.md> --task-id <TASK-ID> --scaffold --write

   --all existe para mantenimiento explícito, pero nunca se ejecuta desde CI ni
   desde el preflight. El formateador no cambia IDs, títulos, estados, prosa,
   tablas ni bloques de código; ante una transformación no estructural falla.

   task-format-policy.json fija una frontera prospectiva desde SHELL-UI-009.
   Las tareas anteriores conservan su presentación histórica. En la frontera y
   las tareas posteriores, el build exige cabecera compacta tipo SHELL-UI-005 y
   una sección Continuidad con etiquetas apiladas y valores en código inline.
   Los borradores vacíos siguen sin iniciarse ni recibir scaffold automático.
   task-delivery-template.md se valida contra esa política en cada preparación,
   por lo que una plantilla antigua o divergente bloquea el build antes de
   propagarse a una tarea.

   El título estructural de cada tarea pendiente se toma del snapshot previo de
   REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md. El formateador corrige la
   cabecera y Continuidad cuando un desarrollo cambia accidentalmente un título
   sin cambiar el ID; nunca reescribe el texto narrativo de la tarea.

   Desde SHELL-UI-012, task-development-policy.json añade un gate semántico:
   bloquea en aprobaciones únicamente contradicciones e infracciones de
   integridad configuradas. La cabecera enriquecida, secciones nuevas y
   cardinalidad de evidencia son recomendaciones y no detienen el compilador.
   El watcher genera current-task-brief.md, current-task-semantic-diff.md,
   canonical-task-semantic-warnings.md, baselines y evidencia tipada bajo
   .delivery/ sin convertirlos en fuentes canónicas. La consola presenta una
   sola línea de resumen y el archivo conserva cada advertencia por tarea.

   Para una inspección explícita, aunque no es necesaria durante el flujo normal:

   npm run docs:task:quality

10. Inventariar deriva multi-repositorio sin escribir:

    npm run docs:repos:drift

    La primera baseline local se crea únicamente de forma explícita y queda
    bajo .delivery/, fuera del plan canónico:

    npm run docs:repos:drift -- --write-baseline

    Una baseline es evidencia de corte. No aprueba tareas, no reemplaza la
    consulta remota y no constituye prueba operativa ni de Supabase.

Automatización cotidiana:

- al abrir vento-shell, la tarea "Plan canónico: compilar automáticamente" se
  inicia mediante runOn=folderOpen;
- cada guardado estable ejecuta preparación, formateo seguro, build y checks;
- una tarea [ ] vacía se conserva intacta: el watcher no crea su scaffold ni la
  inicia por inferencia;
- al aprobar una tarea, el build revisa esa última aprobada y la nueva tarea
  actual, pero solo formatea la que ya tenga desarrollo;
- la deriva de los doce repositorios se revisa al abrir el workspace y, como
  máximo, una vez cada treinta minutos;
- si una instalación nueva todavía no tiene baseline local, el watcher crea el
  primer corte automáticamente al abrir el workspace;
- la baseline nunca se sobrescribe automáticamente, para que una deriva real no
  desaparezca por el solo hecho de ejecutar el watcher.

Organización:

- manifest.json controla únicamente el orden físico de compilación.
- active-sequence.json controla el orden documental de ejecución.
- validate-screen-catalog.mjs impide aceptar un catálogo de pantallas con IDs,
  distribución, aplicaciones, cobertura VPROC o excepciones contradictorias.
- validate-process-application-integrity.mjs exige que las 69 propietarias y
  todas las consumidoras resuelvan contra BLOQUE C, sin autoconsumo ni códigos
  futuros tratados como aplicaciones.
- validate-screen-process-bindings.mjs exige un proceso primario por pantalla,
  referencias válidas, modalidades coherentes, cobertura de los 67 procesos
  activos y conservación explícita de los dos procesos diferidos de AURA.
- active-sequence.json puede declarar varios segmentos y prefijos; el script
  encuentra la primera tarea no aprobada y avanza automáticamente entre ellos.
- si toda la secuencia queda aprobada, el script informa
  SECUENCIA DOCUMENTAL COMPLETA en vez de fallar.
- 00_CABECERA_Y_ESTADO.md y los archivos bajo .generated/ no deben ajustarse
  manualmente para corregir continuidad.
- 04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md es la única fuente del
  registro TREQ y se reemplaza completo cuando cambia; no se mantienen filas
  sueltas ni registros paralelos.
- cada build correcto conserva localmente el último 04A válido bajo
  .generated/.state/. Si un reemplazo completo trae filas históricas de una
  base anterior, el build restaura únicamente las filas que el validador marca
  como erróneas, conserva los cambios históricos válidos y los TREQ nuevos, y
  guarda una copia íntegra del archivo entrante bajo
  .generated/.recovery/.
- la reconciliación automática solo se aplica cuando no falta ninguna fila
  histórica y el candidato resultante supera el validador completo. Ante una
  eliminación o una ambigüedad, no reescribe la fuente.
- el watcher agrupa durante dos segundos los guardados relacionados antes de
  ejecutar el build canónico completo, incluida la regeneración de la guía de
  tareas pendientes, evitando validar como definitivo el estado intermedio
  entre la tarea específica, active-sequence.json, 04A y los derivados.
- el watcher valida después de cada build el compilado, la guía pendiente y
  los destinos de implementación; queda prohibido invocar directamente el
  build parcial porque podría adelantar active-sequence.json sin actualizar
  REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md.
- execution-route.json es la autoridad única de latest_treq_task_id;
  continuity-route.json define el orden integral sin duplicar ese puntero y
  active-sequence.json lo recibe del selector durante cada regeneración.
- el build ejecuta el validador TREQ antes de compilar y bloquea dominios,
  secuencias, columnas, estados, tipos, propietarios, relaciones, cifras o
  evidencia obsoleta.
- la última tarea incorporada y las cifras del resumen se contrastan con las
  fuentes canónicas y active-sequence.json; el validador no fija 781, 19 ni
  UX-BASE-015 como constantes.
- CI ejecuta las pruebas de continuidad, las diez regresiones del validador,
  la validación del registro y el check del compilado.
- docs:plan:check valida también el contrato modular de entrega. Los artefactos
  concretos se validan con docs:delivery:check -- --task <archivo> y los
  fragmentos 04A afectados cuando corresponda.
- docs:delivery:check -- --task-id AUTH-UI-044 extrae un único bloque del
  propietario a .delivery/task-deliveries y valida ese artefacto UTF-8.
  No usar baselines, diffs ni el archivo propietario completo como entrega.
- docs:task:quality -- --task-id AUTH-UI-044 revisa la tarea indicada y genera
  su brief y diff. Sin ID usa la rama task/<id>; fuera de ella usa continuidad.
  Un marcador preformateado no constituye aprobación canónica.
- docs:task:preflight deriva la tarea vigente desde execution-route.json y las
  fuentes reales, comprueba contrato, formato, continuidad y estado Git local,
  y enumera validadores proporcionales sin modificar archivos.
- safe-build-plan-canonico ejecuta auto-prepare-canonical-task antes de compilar.
  Solo normaliza estructura de las tareas cubiertas por la frontera prospectiva;
  preserva las anteriores, no cambia estados, no crea scaffolds y no inicia
  continuidad.
- watch-plan-canonico mantiene un único proceso mediante
  .delivery/plan-watch.lock.json, recupera locks obsoletos y publica en
  .delivery/plan-status.md un resumen legible de salud, continuidad y última
  compilación. Ambos archivos son locales y no son fuentes canónicas.
- commit-scope impide mezclar en un mismo commit una tarea canónica y cambios de
  infraestructura transversal. El ratchet de lint acepta la deuda histórica
  registrada, impide aumentos y exige archivos tocados limpios. Ambos controles
  se ejecutan automáticamente en CI.
- docs:repos:drift inventaría branch/upstream, estado local, manifiestos,
  rutas, componentes, contratos, migraciones y consumidores Supabase de los
  doce repositorios VENTO. No ejecuta Supabase ni escribe salvo
  --write-baseline.

Al agregar una tarea futura:

- crear su marcador en el fragmento modular propietario;
- incluir su ID una sola vez en active-sequence.json si forma parte de la
  continuidad vigente;
- regenerar 04A completo cuando la tarea cree o modifique requisitos TREQ;
- ejecutar el build y después el check.
