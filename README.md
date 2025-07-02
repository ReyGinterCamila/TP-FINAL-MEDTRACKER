-- MedTracker - Sistema de Gestión Clínica --

MedTracker es una plataforma web desarrollada para optimizar la gestión de turnos médicos y el seguimiento del historial clínico de pacientes. Está diseñada para clínicas, consultorios y profesionales de la salud que requieren una herramienta clara y eficiente para administrar sus actividades diarias.

-- Funcionalidades principales --
El sistema permite el registro e inicio de sesión diferenciados para pacientes y especialistas. Cada tipo de usuario cuenta con funcionalidades específicas y acceso restringido según su rol.

Los pacientes, una vez registrados, pueden solicitar turnos, modificarlos, cancelarlos y visualizar sus turnos próximos. También tienen acceso a su historial clínico, el cual se va actualizando en función de las consultas médicas recibidas.

Los especialistas pueden consultar su agenda diaria o semanal, atender pacientes según los turnos asignados, cancelar o modificar turnos, y cargar observaciones en el historial clínico de cada paciente.

El sistema incorpora validaciones en formularios, control de sesiones y mecanismos básicos de seguridad para proteger los datos sensibles.

-- Tecnologías utilizadas --
El desarrollo del sistema está construida con HTML, CSS y JavaScript. Para persistencia de datos en modo local se emplea LocalStorage, con posibilidad de integración a futuro con un backend basado en Node.js o NestJS y bases de datos como MongoDB o MySQL.

-- Casos de uso --
Un paciente puede registrarse, iniciar sesión, gestionar sus turnos y acceder a su historial clínico. Un especialista puede registrarse, revisar su agenda, gestionar turnos, y registrar información clínica correspondiente a cada paciente atendido.

-- Futuras mejoras --
Se contempla la incorporación de una base de datos externa para almacenamiento persistente, un sistema de notificaciones por correo electrónico, soporte para subir archivos adjuntos (como estudios o recetas), diseño adaptativo para dispositivos móviles y un panel administrativo para supervisión general del sistema.

-- Documentación adicional --
A continuación se pueden consultar los documentos que acompañan al desarrollo del sistema:

Historias de usuario:
https://trello.com/b/boPnQxnI/medtraker

Diagrama de flujo general del sistema:
https://lucid.app/lucidchart/1dbb9176-aee1-4c96-970f-d1932d0cf279/edit?viewport_loc=-748%2C288%2C3260%2C1437%2C0_0&invitationId=inv_2490cee1-2fc2-4e98-b494-17841ddf2246

