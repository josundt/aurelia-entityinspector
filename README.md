# aurelia-entityinspector
An Aurelia ui component for viewing JavaScript values (plugin)

## Enabling the plugin:
*In your Aurelia bootstrapper module:*

```javascript
export function configure(aurelia) {
    aurelia.use
        .plugin("aurelia-entityinspector")
}
```

*When using webpack with current Aurelia version, you need to use this syntax:*

```javascript
import { PLATFORM } from "aurelia-framework";

export function configure(aurelia) {
    aurelia.use
        .plugin(PLATFORM.moduleName("aurelia-entityinspector"))
}
```

### Using the entityinspector ui component (custom element):

```html
<jux-entityinspector value.bind="data"
                     accordionmode.bind="isAccordionMode"
                     theme="dark">
```

#### Bindable properties:
* ***value***  (any type: Object, Array, string, boolean, number, Date etc.)  
-the entity to inspect

* **accordionmode** (boolean)  
-when **true**, only one array or object can be expanded at the same level in the inspector.

* **theme** ("dark" | "light")  
-the entityinspector theme 

