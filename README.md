![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Javascript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)

Documentacion en progreso

# DOCENTE APP

## Introducción

Esta documentación describe el diseño, desarrollo y funcionamiento de una aplicación de sistema de gestión de notas para maestros. La aplicación está diseñada para permitir a los maestros almacenar y visualizar las notas de sus alumnos, así como generar tablas de calificaciones. A lo largo de este documento, se detallarán los aspectos clave de la aplicación.

## Tabla de Contenidos

1. **Visión General**

   - Objetivo de la aplicación
   - Funcionalidades principales
   - Tecnologías utilizadas

2. **Instalación y Configuración**

   - Configuración de la base de datos

3. **Registro e Inicio de Sesión**

   - Creación de cuentas de maestros
   - Autenticación segura
   - Recuperación de contraseñas

4. **Gestión de Alumnos**

   - Agregar, editar y eliminar alumnos
   - Asociar alumnos con maestros
   - Vista de detalles del alumno

5. **Registro de Notas**

   - Ingreso de calificaciones por asignatura
   - Asociación de notas con alumnos
   - Validación de datos de calificación

6. **Generación de Tablas de Calificaciones**

   - Creación de tablas de calificaciones por clase
   - Visualización de promedios y estadísticas
   - Exportación de tablas en formatos comunes

7. **Interfaz de Usuario**

   - Diseño intuitivo y amigable
   - Navegación entre secciones
   - Experiencia responsive para dispositivos móviles

8. **Seguridad y Privacidad**

   - Protección de datos sensibles
   - Control de acceso basado en roles
   - Encriptación de datos

9. **Pruebas y Depuración**

   - Pruebas unitarias y de integración
   - Identificación y solución de errores
   - Optimización de rendimiento

10. **Despliegue y Mantenimiento**

    - Elección del entorno de despliegue (servidor web, nube, etc.)
    - Implementación de actualizaciones
    - Copias de seguridad y restauración

11. **Soporte y Documentación Adicional**
    - Guía del usuario para maestros
    - Resolución de problemas comunes
    - Contacto para asistencia técnica

## Vision general

### Objetivo principal

El objetivo principal de la aplicación es facilitar a los maestros el seguiminento académico de sus estudiantes mediante el registro de notas y el cálculo automático del promedio de cada alumno tanto por trimestre como anual.

### Funciones principales

- **Registros de alumnos**: Para empezar con los registros de notas es necesario registrar a los alumnos. Solo se pide el nombre y el apellido.
- **Registros de materias**: Puedes agregar las materias que dictas.
- **Registro de notas**: Introduce las notas de tus alumnos rellenando un formulario para especificar al alumno, materia y trimestre.

Cabe recalcar que para empezar a usar la aplicacion es necesario crear un usuario para una mejorar la relacion de los datos introducidos con el mismo. Solo hace falta un nombre de usuario, contraseña y un email.

### Tecnologias utilizadas

Se ha utilizado React como principal herramienta para el front end, Redux-Toolkit para el contro de estados, Bootstrap y css para los estilos.

## Instalacion y configuracion

### Instalacion de dependencias

Para esta parte es necesario ir al repositorio de la <a href="https://github.com/adrian411997/api-system-students">API</a> de la aplicación. Se tiene pensado desplegar esta parte en un servidor para hacerlo accesible a mas usuario.

Para esta parte es necesario:

- Clonar este repositorio
- Dirigirnos al directorio del proyecto
- Ejecutar:

  ```
  npm start
  ```

  La aplicación se desplegará en su navegador web en la direccion **https/localhost:3000/**

## Conclusión

Este proyecto ha resultado en una aplicación de sistema de gestión de notas para maestros que facilita la tarea de almacenar, visualizar y analizar las calificaciones de los alumnos. Al proporcionar una interfaz intuitiva y robusta, la aplicación contribuye a la eficiencia de los maestros y al seguimiento de los progresos de los alumnos. Esta documentación sirve como guía integral para la comprensión y uso efectivo de la aplicación.
Puedes guardar este contenido en un archivo con extensión .md para visualizarlo en plataformas que admitan Markdown, como GitHub, GitLab, y lectores de Markdown en general.
Cabe recalcar que esta es una version temprana del proyecto, tanto el diseño como el funcionamiento y la disposicion de los elementos pueden sufrir cambios en el futuro.

