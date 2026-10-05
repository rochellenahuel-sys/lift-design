# LIFT Design

Skill operativa para producir contenido de Comunidad LIFT: voz, cultura, aplicación a problemas reales, diseño, animación y validación editorial de Nahuel.

**Entrada principal:** [SKILL.md](skills/lift-content-production/SKILL.md). Versión estable inicial: **1.0.0**.

## Usar en el Codex de Leandro

La carpeta de identidad LIFT que ya está en su equipo se conserva. Este repositorio contiene las instrucciones y referencias actualizables; no duplica logos, fuentes, cursos ni carruseles.

1. Clonar o descargar este repositorio con una cuenta que tenga acceso.
2. Incorporar la carpeta `skills/lift-content-production` al directorio de skills del entorno, o indicar a Codex que lea su `SKILL.md` y las referencias enlazadas al ejecutar el encargo. Mantener la carpeta completa, no únicamente el archivo principal.
3. Indicar la carpeta de identidad ya existente. Si hace falta persistirla en este checkout, copiar `lift.local.example.json` como `lift.local.json` y ajustar `identity_root`. Es configuración local ignorada por Git.
4. Pedir el trabajo con la skill, por ejemplo:

```text
Usá $lift-content-production para armar un carrusel de este blog: [URL].
Usá la carpeta de identidad LIFT del proyecto. Producí la versión completa
y entregala para validación de Nahuel.
```

Si el entorno todavía no descubre la skill, se puede indicar la ruta al `SKILL.md` explícitamente. No es necesario reinstalar la identidad.

## Qué ejecuta

- Lee el blog y conserva sus afirmaciones, condiciones y fuentes.
- Conecta la temática con una situación de trabajo y recursos concretos, desde amateur hasta profesional.
- Construye una secuencia que enseña sin repetir ni sobrecargar.
- Aplica voz, tipografía, espaciado y movimiento de LIFT.
- Produce y revisa los entregables pedidos con las herramientas disponibles.
- Deja una versión identificada para Nahuel. No autoaprueba ni publica por defecto.

La skill son instrucciones para el agente. No instala renderizadores, no concede accesos y no constituye por sí sola un bloqueo técnico dentro de una herramienta externa de publicación.

## Actualizaciones compartidas

`main` contiene la versión integrada del trabajo. Las versiones entregables se identifican con etiquetas `vX.Y.Z` y su entrada en [CHANGELOG.md](CHANGELOG.md).

- Conservar el historial: registrar mejoras en una rama, revisar el cambio y luego integrarlo. No reescribir versiones entregadas.
- Para traer cambios a un clon limpio: `git pull --ff-only`. Si hay cambios locales o divergencia, revisarlos antes; no descartarlos automáticamente.
- Si la skill se instaló por copia, actualizar también esa copia con la carpeta completa del checkout revisado. Si el entorno permite un enlace al checkout, comprobar que apunta a la versión deseada.
- Registrar la versión de skill usada en cada nueva pieza. Cambiar la skill no altera retroactivamente los posteos ni aprueba versiones nuevas.
- Cambiar reglas o recursos requeridos: versión menor; aclaraciones compatibles: parche; cambios incompatibles de integración: versión mayor.

Las actualizaciones se distribuyen desde el repo. No hay una sincronización automática instalada en el equipo de Leandro.

## Mantener el repositorio

Editar las instrucciones en `skills/lift-content-production/`, actualizar `VERSION` y `CHANGELOG.md` cuando se entregue una versión, y ejecutar:

```sh
python3 scripts/validate.py
```

El control comprueba estructura, versión, referencias y ausencia de rutas locales accidentales. No certifica la calidad editorial de una pieza.

## Contenido

- [Skill](skills/lift-content-production/SKILL.md)
- [Vincular la identidad existente](skills/lift-content-production/references/identidad-existente.md)
- [Diseño y movimiento](skills/lift-content-production/references/diseno-y-movimiento.md)
- [Aplicación a problemas de trabajo](skills/lift-content-production/references/aplicacion-y-ejemplos.md)
- [Validación de Nahuel](skills/lift-content-production/references/validacion.md)

Repositorio de trabajo del equipo LIFT. No subir registros privados de atletas, credenciales, conversaciones o archivos ajenos a la producción de esta skill.
