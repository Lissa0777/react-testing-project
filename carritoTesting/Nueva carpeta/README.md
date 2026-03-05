# Carrito de Compras (JS) + Pruebas Unitarias + Coverage (Jest)

Proyecto del taller: aplicación web simple (HTML/CSS/JS) con **carrito de compras**, persistencia en **LocalStorage** y **pruebas unitarias** con **reporte de cobertura**.

## Objetivos del taller

- Mostrar un **catálogo de productos** con opción **Agregar al carrito**.
- Permitir:
  - **Ver carrito**
  - **Incrementar / decrementar cantidades**
  - **Eliminar productos**
  - **Vaciar carrito**
  - **Calcular subtotal**
- Persistir el carrito en **LocalStorage** para conservar datos al recargar.
- Implementar **pruebas unitarias** enfocadas en **lógica de negocio** y generar **coverage**.
- Cumplir con el mínimo de **60% de cobertura global** (ideal: 90% líneas/funciones/statements y 80% branches).

## Comandos de ejecución de las pruebas

Comando para ejecutar pruebas:
- npm run test

Comando para ejecutar la cobertura y reporte:
- npm run coverage

Para saber cuales funciones o lineas se ejecutaron o no, se debe abrir **carritoTesting/coverage/icov-report/index.html** Y en este documento se mostrarán de color verde las lineas probadas y de color rojo las lineas que no se pudieron probar por medio del testing

## Requisitos previos o irregularidades

En caso tal de abrir el archivo html y no poder visualizar todo el contenido, se deberá ejecutar en el IDE Visual Studio Code, instalar la extensión **Live Server** para que así se pueda seguir el siguiente paso a paso:

- Ubicar el archivo html en la estructura del proyecto
- Presionar click derecho encima de este
- Darle click en **Open with Live Server**

Tras esto, se podrá visualizar correctamente el contenido de los dos archivos html importantes:
- carritoTesting/index.html
- carritoTesting/coverage/icov-report/index.html

## Stack / Tecnologías

- HTML + CSS + JavaScript (ES Modules)
- Node.js (solo para ejecutar pruebas)
- Jest (Unit Testing + Coverage)

---

## Estructura del proyecto

```txt
carritoTesting/
  index.html
  css/
    styles.css
  js/
    products.js
    cart.logic.js        # lógica pura (100% testeable)
    storage.js           # wrapper localStorage (mockeable)
    app.js               # DOM (mínimo de lógica)
  __tests__/
    cart.logic.test.js   # pruebas de lógica + storage
  jest.config.cjs
  package.json
  README.md