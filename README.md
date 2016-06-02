# Continuum
Visualization engine for enterprise components and systems integration.

The intent of Continuum is to provide visual representations of integrated systems to help comprehend complexity and cost of change to a system.

## Visualization types

This visualization tools includes 4 types of system visualizations:

#### 1. Dependency Matrix:
  * Description of point to point integrations and consumers of those integrations

#### 2. Dependency Diagram:
  *  A chord diagram that displays the integrations between components to show the coupling of a system

#### 3. Logical Diagram:
  * A logical view of an integrated system generated from data entered into the dependency matrix. Integrations are described through color types and size of systems in this view

#### 4. Coocurrence Matrix
  * A derivation of a design matrix which can be used to visualize coupling, transient integrations and calculate the cost of change to a system



## License

Continuum is licensed under MIT (see LICENSE).    

Continuum depends on the following open source software:
* D3.js https://d3js.org/
* Bootstrap http://getbootstrap.com/
* jQuery https://jquery.com/
* Gulp http://gulpjs.com/
