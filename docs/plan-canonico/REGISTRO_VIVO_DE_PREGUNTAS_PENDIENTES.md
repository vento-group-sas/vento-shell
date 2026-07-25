# Registro vivo de preguntas y pendientes

**Archivo independiente:** no forma parte del plan canónico compilado  
**Última actualización:** 2026-07-25  
**Última revisión de respuestas:** 2026-07-25  
**Propósito:** mostrar primero todo lo que todavía requiere respuesta, comprobación o resolución y conservar después el archivo histórico de lo ya cerrado.

> **Regla de lectura:** todo lo ubicado antes de **ARCHIVO HISTÓRICO** requiere seguimiento. Lo archivado no debe volver a preguntarse salvo que aparezca evidencia contradictoria o cambie la operación.

---

# 1. Resumen ejecutivo de pendientes

| Grupo | Cantidad | Tratamiento |
| --- | ---: | --- |
| Preguntas sin respuesta | 3 | Requieren respuesta directa de Gerencia, Operaciones o responsable SST |
| Respuestas incompletas | 1 | Existe una respuesta parcial, pero falta el dato exacto solicitado |
| Datos por comprobar | 0 | No quedan datos aproximados pendientes de validación en este corte |
| Preguntas condicionadas | 0 | `ACT-09` y `ACT-10` quedaron cerradas |
| Dudas diferidas con tarea de resolución | 9 | Se resolverán en diseño, implementación o piloto |
| Comprobaciones técnicas pendientes | 0 | `TEC-01` a `TEC-19` están cerradas |
| Preguntas exclusivas para el usuario | 0 | No hay decisiones nuevas reservadas exclusivamente al usuario |

**Pendientes de atención inmediata:** 4  
**Pendientes diferidos:** 9

## Resultado de la revisión de respuestas

| Resultado | Cantidad | IDs |
| --- | ---: | --- |
| Respuestas aceptadas y archivadas | 15 | `ADM-07`, `ADM-08`, `ADM-09`, `GOV-13` a `GOV-20`, `DAT-02`, `DAT-15`, `ACT-09`, `ACT-10` |
| Respuesta todavía incompleta | 1 | `DAT-22` |
| Preguntas todavía sin respuesta | 3 | `ADM-01`, `ACT-07`, `DAT-16` |

---

# 2. Pendientes activos para responder o completar

## 2.1 Prioridad P1 — información faltante

### `ADM-01` — Dirección física de Oficina 1

**Pregunta:** ¿Cuál es la dirección física completa de Oficina 1?  
**Responsable:** Gerencia  
**Respuesta esperada:** una dirección completa  
**Estado:** `PENDIENTE`  
**Origen:** `OPS-ADM-001`

**Respuesta:**  
> 

**Respondido por:**  
> 

**Fecha:**  
> 

**Evidencia u observación:**  
> 

---

### `ACT-07` — Cantidad de canastas

**Pregunta:** ¿Cuántas canastas de transporte existen actualmente?  
**Responsable:** Bodega u Operaciones  
**Respuesta esperada:** un número exacto  
**Estado:** `PENDIENTE`  
**Origen:** `OPS-ACT-001`, `CAP-MAP-003`

**Respuesta:**  
> 

**Respondido por:**  
> 

**Fecha:**  
> 

**Evidencia u observación:**  
> Realizar conteo físico si no existe inventario confiable.

---

### `DAT-16` — Empresa externa de SST

**Pregunta:** ¿Qué empresa externa conserva las inspecciones de seguridad y salud y dónde quedan disponibles para Vento?  
**Responsable:** responsable SST o Gerencia  
**Respuesta esperada:** nombre de la empresa + medio o ubicación de acceso  
**Estado:** `PENDIENTE`  
**Origen:** `OPS-PLAN-001`, `CAP-MAP-004`

**Respuesta:**  
> 

**Respondido por:**  
> 

**Fecha:**  
> 

**Evidencia u observación:**  
> 

---

## 2.2 Prioridad P2 — respuesta incompleta

### `DAT-22` — Archivo de distribución de propinas

**Pregunta:** ¿Cuál es el nombre y la ubicación exacta del archivo donde se registra cómo se repartieron las propinas?  
**Responsable:** Gerencia o Contabilidad  
**Respuesta esperada:** nombre del archivo + ruta o carpeta exacta de Drive  
**Estado:** `POR_COMPLETAR`  
**Origen:** `CAP-MAP-004`, `CAP-MAP-005`

**Respuesta actual:**  
> Está en Drive; es un Excel con los nombres de los empleados y el valor que les corresponde.

**Dato que falta:**  
> Nombre exacto del archivo y ruta o carpeta de Drive.

**Respondido por:**  
> Carlos Ibarra

**Fecha:**  
> 2026-07-25

**Evidencia u observación:**  
> La respuesta confirma el medio y contenido, pero no permite localizar inequívocamente el archivo.

---

## 2.3 Reglas para diligenciar

1. Escribir la respuesta directamente debajo de **Respuesta**.
2. Identificar a la persona o cargo en **Respondido por**.
3. Registrar la fecha en formato `AAAA-MM-DD`.
4. Usar **Evidencia u observación** para indicar documento, archivo, captura, enlace, ubicación o aclaración.
5. Se admiten `NO EXISTE`, `NO APLICA`, `NO TENGO ACCESO` o `NO SÉ`. `NO SÉ` no cierra la pregunta: la mueve a comprobación o asignación a otra persona.
6. Una respuesta suficiente puede cerrarse mediante declaración directa del responsable cuando no exista evidencia documental; debe indicarse expresamente que la fuente fue una declaración.

---

# 3. Pendientes diferidos con dueño documental

Estas dudas no deben convertirse ahora en cuestionarios. Cada una tiene un momento de resolución definido.

| ID | Duda | Momento o tarea de resolución | Estado |
| --- | --- | --- | --- |
| `DIF-04` | Definir reversión de anulaciones y devoluciones | dominio funcional y catálogo de procesos | `DIFERIDA` |
| `DIF-05` | Definir funcionamiento sin internet | requisitos no funcionales y piloto | `DIFERIDA` |
| `DIF-06` | Definir reintentos e idempotencia | diseño técnico e integración | `DIFERIDA` |
| `DIF-07` | Definir recuperación por caída de energía, red o dispositivo | BLOQUE AC — continuidad operativa y piloto | `DIFERIDA` |
| `DIF-08` | Medir volúmenes y tiempos que todavía no tienen cifras confiables | instrumentación y piloto | `DIFERIDA` |
| `DIF-09` | Resolver variantes menores por sede o turno | prototipo con usuarios reales | `DIFERIDA` |
| `DIF-10` | Definir el propietario objetivo del soporte tecnológico | diseño de capacidades de tecnología | `DIFERIDA` |
| `DIF-14` | Definir reglas de imputación de costos compartidos | `OPS-CST-001` y NUMERA | `DIFERIDA` |
| `DIF-15` | Definir el modelo objetivo de catering y ventas B2B | `OPS-CAN-001`, `OPS-B2B-001` y diseño comercial | `DIFERIDA` |

---

# 4. Reglas de mantenimiento

1. Toda pregunta nueva debe ser atómica y tener responsable, formato de respuesta y origen.
2. Antes de crearla se revisan auditorías, tareas aprobadas, código, configuración, datos y este registro.
3. Una respuesta `NO SÉ` o imprecisa no se archiva como cerrada: pasa a `POR_COMPLETAR` o `POR_COMPROBAR`.
4. Al resolverse, el elemento se elimina de las secciones 2 o 3 y se incorpora al archivo histórico con fecha y evidencia.
5. Toda brecha o decisión diferida debe quedar vinculada a una tarea canónica concreta; no se permiten pendientes narrativos sin dueño.
6. Las comprobaciones que involucren Supabase se ejecutan desde `vento-shell`.
7. Al normalizar una respuesta se debe diferenciar entre titular de una cuenta bancaria, emisor de factura, representante legal, propietario de una empresa y propietario de un inmueble.

---

# ARCHIVO HISTÓRICO — NO REQUIERE ACCIÓN

Las secciones siguientes conservan respuestas, comprobaciones y decisiones ya incorporadas. No deben mezclarse con la lista operativa de pendientes.

## 5. Respuestas operativas archivadas

### 5.1 Oficina 1 y situación administrativa

| ID | Respuesta incorporada |
| --- | --- |
| `ADM-02` | La dirección registral de Vento Group corresponde al Centro de Producción. |
| `ADM-03` | Oficina 1 y Vento Café están dentro del mismo inmueble. |
| `ADM-04` | No existe entrada interna directa desde Vento Café. |
| `ADM-05` | No comparte la entrada pública de Vento Café. |
| `ADM-06` | No comparte servicios públicos con Vento Café. |
| `ADM-07` | El contrato de arrendamiento de Oficina 1 está a nombre de Vento Group S.A.S. La propietaria del inmueble fue identificada operativamente como Marta, dueña de una pescadería ubicada en el mismo edificio; su nombre legal completo no fue comprobado y no se requiere para cerrar la titularidad contractual. |
| `ADM-08` | Los documentos de Oficina 1 están a nombre de Vento Group S.A.S. |
| `ADM-09` | Sí llegan a Oficina 1 cartas o notificaciones dirigidas oficialmente a la empresa. |
| `ADM-10` | Trabajan habitualmente 6 personas. |
| `ADM-11` | Propietario, gerente general, gerente de Vento Café, contador y Marketing. |
| `ADM-12` | Sí se guarda efectivo. |
| `ADM-13` | Sí se guardan documentos empresariales originales. |

### 5.2 Titulares, facturación y cuentas

| ID | Respuesta incorporada |
| --- | --- |
| `GOV-02` | RUT de Vento Café: Vento Group S.A.S. |
| `GOV-03` | RUT de Saudo: Jefersson García — persona natural. |
| `GOV-04` | RUT de Molka: Nathalia Carolina Ibarra Ariza — persona natural. |
| `GOV-05` | Vaila Vainilla no tiene RUT propio actualmente. |
| `GOV-06` | Centro de Producción: Vento Group S.A.S. — establecimiento Vento Producción. |
| `GOV-08` | Facturas de Vento Café: Vento Group S.A.S. |
| `GOV-09` | Facturas de Saudo: Jefersson García. |
| `GOV-10` | Facturas de Molka: Nathalia Ibarra. |
| `GOV-11` | Vaila Vainilla factura principalmente mediante Nathalia Ibarra/Dataico; según el pedido puede usar Jefersson García o Vento Group S.A.S. |
| `GOV-12` | Catering factura a nombre de Vento Group S.A.S. |
| `GOV-13` | La cuenta corriente principal que recibe el dinero de Vento Café está a nombre de Nathalia Ibarra. Vento Café factura a nombre de Vento Group S.A.S.; ambos hechos se conservan separados. |
| `GOV-14` | La cuenta principal que recibe el dinero de Saudo está a nombre de Jefersson García, persona natural. |
| `GOV-15` | La cuenta principal que recibe el dinero de Molka está a nombre de Nathalia Ibarra, persona natural. |
| `GOV-16` | Vaila Vainilla no utiliza una única cuenta principal: la cuenta receptora depende del emisor de la factura y puede corresponder a Nathalia Ibarra, Jefersson García o Vento Group S.A.S. |
| `GOV-17` | La cuenta principal que recibe el dinero de catering está a nombre de Vento Group S.A.S. |
| `GOV-18` | La cuenta comercial de Rappi está a nombre de Vento Group S.A.S. |
| `GOV-19` | La cuenta comercial de Shopify está a nombre de Jefersson García. |
| `GOV-20` | La cuenta comercial de ManyChat está a nombre de Vento Group S.A.S. |

### 5.3 Vaila Vainilla y catering

| ID | Respuesta incorporada |
| --- | --- |
| `COM-01` | El inventario vendido sale de la Oficina de Vento Group. |
| `COM-02` | Los pedidos se empacan en la Oficina de Vento Group. |
| `COM-03` | Chelsea, responsable de ventas en línea, recibe y decide sobre devoluciones. |
| `COM-04` | El gerente general autoriza una venta de catering. |
| `COM-05` | Existe contrato o cotización estándar para catering. |

### 5.4 Activos, vehículo y custodia

| ID | Respuesta incorporada |
| --- | --- |
| `ACT-01` a `ACT-06` | Existe un vehículo principal identificado como VAN, a nombre de Nathalia Ibarra, operativo y con alternativa disponible; las llaves las custodia el celador del apartamento de la gerente general. |
| `ACT-08` | Las canastas permanecen normalmente en la VAN, Centro de Producción y Vento Café. |
| `ACT-09` | No existe equipo pendiente de instalar; el equipo identificado es sobrante. |
| `ACT-10` | `NO APLICA`: no hay equipo pendiente de instalar que deba describirse. |
| `ACT-11` a `ACT-13` | Existe decoración de temporadas guardada externamente. |
| `ACT-14` | Los documentos originales los guarda la gerente general o la contadora. |
| `ACT-15` | El efectivo recibido desde las sedes lo custodia la gerente general. |

### 5.5 Fuentes de información y registros

| ID | Respuesta incorporada |
| --- | --- |
| `DAT-01`, `DAT-03` | Makos permite exportar ventas y muestra productos vendidos por separado. |
| `DAT-02` | La información más antigua disponible en Makos corresponde a febrero de 2026. |
| `DAT-04`, `DAT-05` | No existe una fuente operativa única de inventario por producto y sede. |
| `DAT-06`, `DAT-07` | No existe un repositorio único de compras ni registro histórico completo de cantidades recibidas. |
| `DAT-08` | Sí se conservan solicitudes de remisión. |
| `DAT-09` a `DAT-13` | No se conservan de forma estructurada remisiones despachadas/recibidas, conteos, producción diaria ni hojas manuales. |
| `DAT-14` | El pago laboral se calcula en TNS. |
| `DAT-15` | Los informes de TNS que contienen el resultado final del pago laboral se conservan en la carpeta de Contabilidad de Oficina 1 y en el correo electrónico de la contadora. |
| `DAT-17` | La empresa externa de SST registra hallazgos y entrega informe a la propietaria. |
| `DAT-18`, `DAT-19` | Las instrucciones suelen quedar en WhatsApp y no existe mecanismo formal de corrección. |
| `DAT-20`, `DAT-21` | Vaila Vainilla acompaña el pedido con factura y confirma entrega por WhatsApp. |
| `DAT-23` | Las ventas anuladas se registran en Makos. |
| `DAT-24` a `DAT-26` | No existe registro formal de devoluciones, compensaciones ni correcciones de cantidades. |
| `DAT-27` | Las mermas se registran en el “Formato de mermas”. |

### 5.6 Lugares y operación

| ID | Respuesta incorporada |
| --- | --- |
| `OPE-01` | El frío se almacena en cuarto frío, cuarto de congelación y neveras horizontales. |
| `OPE-02`, `OPE-03` | Vento Café acepta reservas; actualmente ninguna sede realiza eventos. |
| `OPE-04` | No existe autorización definida para cambiar una solicitud de remisión ya enviada. |
| `OPE-05`, `OPE-06` | El gerente general decide rechazo de mercancía y correcciones de inventario. |
| `OPE-07` | No existe autorización definida para corregir un medio de pago. |
| `OPE-08` | El gerente general autoriza cambios de horarios publicados. |
| `OPE-09` | No existe autorización definida para corregir marcaciones de asistencia. |
| `OPE-10`, `OPE-11` | La propietaria decide devoluciones y compensaciones a clientes. |

### 5.7 Validaciones profesionales o externas

| ID | Respuesta incorporada |
| --- | --- |
| `EXT-01` a `EXT-05` | No se requiere actualizar o registrar Oficina 1 ante Cámara de Comercio, RUT, banco, aseguradora ni como establecimiento. |
| `EXT-06` a `EXT-09` | No existe documento vigente identificado para el uso de las marcas Vento Café, Saudo, Molka o Vaila Vainilla. |

### 5.8 Control de respuestas incorporadas en esta revisión

| Fecha | IDs | Fuente | Tratamiento |
| --- | --- | --- | --- |
| 2026-07-25 | `ADM-07`, `ADM-08`, `ADM-09` | declaración directa de Carlos Ibarra en el registro | respuestas normalizadas y archivadas |
| 2026-07-25 | `GOV-13` a `GOV-20` | declaración directa de Carlos Ibarra en el registro | se separaron titular bancario, emisor de factura y persona natural/jurídica |
| 2026-07-25 | `ACT-09`, `ACT-10` | declaración directa de Carlos Ibarra en el registro | se confirmó que no existe equipo pendiente; `ACT-10` quedó como `NO APLICA` |
| 2026-07-25 | `DAT-02`, `DAT-15` | declaración directa de Carlos Ibarra en el registro | respuestas suficientes y archivadas |
| 2026-07-25 | `DAT-22` | declaración directa de Carlos Ibarra en el registro | se mantuvo activa porque falta nombre y ruta exacta del archivo |

## 6. Comprobaciones técnicas cerradas

**Evidencia detallada:** `AUDITORIA_TECNICA_TEC-01_A_TEC-18_2026-07-23.md`.

| ID | Resultado archivado |
| --- | --- |
| `TEC-01` a `TEC-03` | AURA no tiene repositorio, pantallas ni capacidades funcionales; `aura.access` es reserva de catálogo. |
| `TEC-04` | No aparece “Oficina 1” en sistemas; Supabase conserva dirección de sede administrativa. |
| `TEC-05` a `TEC-09` | Se identificaron las fuentes actuales de ventas, inventario, compras, producción y finanzas. |
| `TEC-10` | PULSO importa manualmente Excel de Makos; no existe integración automática. |
| `TEC-11` a `TEC-13` | No se encontraron integraciones automáticas con Shopify, Rappi o ManyChat. |
| `TEC-14` | VISO y ANIMA editan horarios; VISO puede exigir republicación. |
| `TEC-15` | Ningún sistema corrige la hora de asistencia; ANIMA solo modifica la nota de incidencia. |
| `TEC-16` | No existe corrección manual auditable de medios de pago comprobada en PULSO. |
| `TEC-17` | NEXO, VISO, ANIMA, ORIGO y FOGO tienen exportaciones parciales; PULSO y NUMERA presentan brechas. |
| `TEC-18` | Existen estructuras y contratos duplicados entre aplicaciones. |
| `TEC-19` | La exportación temporal de inventario fue eliminada de `vento-os-dev` el 2026-07-23 y verificada. |

## 7. Dudas diferidas ya resueltas

| ID | Resolución archivada |
| --- | --- |
| `DIF-01` | Fuente de verdad funcional resuelta en `CAP-MAP-008`; ubicación física queda para E3. |
| `DIF-02` | Contratos funcionales resueltos en `CAP-MAP-009`; mecanismo técnico queda para BLOQUE X. |
| `DIF-03` | Permisos y segregación resueltos funcionalmente en `CAP-MAP-010`. |
| `DIF-11` | Traslado interno y entrega al cliente quedaron separados en `CAP-MAP-007` a `CAP-MAP-009`. |
| `DIF-12` | Propiedad documental quedó separada por hecho respaldado. |
| `DIF-13` | Hechos operativos y análisis consolidado quedaron separados funcionalmente. |

## 8. Historial de decisiones relacionadas

Las decisiones `DEC-*` y aprobaciones `CODE-AUD-*` permanecen como evidencia histórica en el plan canónico y en su control documental. Este registro no las presenta como pendientes ni las duplica íntegramente.

Decisiones históricas relevantes: `DEC-POS-001`, `DEC-CAP-013-001`, `DEC-CAP-014-001`, `DEC-TALENTO-001`, `DEC-VITAL-001`, `DEC-BRECHAS-001`, `DEC-CAP-015-001`, `DEC-CAP-015-002`, `DEC-CODE-001-001` a `DEC-CODE-006-001`.

---

# Control de incorporación

Cuando aparezca una duda nueva:

1. buscar posibles duplicados en este archivo;
2. revisar auditorías y decisiones aprobadas;
3. asignar responsable y prioridad;
4. formular una sola pregunta;
5. indicar el formato de respuesta;
6. asignar el siguiente código de su categoría;
7. registrar respuesta, fecha y evidencia cuando se resuelva;
8. actualizar la tarea o diseño afectado;
9. mover el elemento al archivo histórico.
