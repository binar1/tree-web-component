# tree-view



Web component for TreeView implemented with LitElement.


## Installation

```shell
npm i @binar/tree-view-component
```

Then, import tree-view into your element:

```javascript
import 'tree-view/tree-view.js';
```

or in an html file:

```html
<script type="module" src="/path/to/tree-view.js"></script>
```

## Usage

In your LitElement class:

```javascript
static get styles() {
  return css`
    :host {
      display: block;
    }
  `;
}
static get properties() {
  return {};
}

constructor() {
  super();
}

render() {
  return html`
    <tree-component id="chart" key="id" value="1" ></tree-component>
  `;
}

_showToast() {
  this.shadowRoot.querySelector('lit-toast').show("I'm a toast");
}
```

## Styling

```js
  var TreeData={
      categories: {
        label: "Categories",
        id:"1",
        children: {
          "patient": {
            label: "Patients",
            id:"2",
            children: {
              "patient:janeDoe": {
                label: "Jane Doe",
                icon: "Woman.png",
                id:"3",
                children: {
                  "jd:plans": {
                    label: "Plans",
                    id:"4",
                    children: {
                      "plan:JDHI1": {
                        label: "Health Insurance JDHI1",
                        icon: "Plan.png",
                        id:"5"
                      },
                      "plan:JDDI1": {
                        label: "Dental Insurance JDDI1",
                        icon: "Plan.png",
                        id:"6"
                      },
                      "plan:JDVI1": {
                        label: "Vision Insurance JDVI1",
                        icon: "Plan.png",
                        id:"7"
                      },
                    },
                  },
                },
              },
              "person:briannen": {
                label: "Briannen Storm",
                icon: "Woman.png",
                id:"8",
                children: {
                  "bs:plans": {
                    label: "Plans",
                    id:"9",
                    children: {
                      "plan:BSHI1": {
                        label: "Health Insurance BSHI1",
                        id:"10",
                        icon: "Plan.png",
                      },
                      "plan:BSDI1": {
                        label: "Dental Insurance BSDI1",
                        id:"11",
                        icon: "Plan.png",
                      },
                      "plan:BSVI1": {
                        label: "Vision Insurance BSVI1",
                        icon: "Plan.png",
                        id:"12",
                      },
                      "plan:BSVI1": {
                        label: "Vision Insurance BSVI1",
                        icon: "Plan.png",
                        id:"13",
                      },
                      "plan:BSVI1": {
                        label: "Vision Insurance BSVI1",
                        icon: "Plan.png",
                        id:"14",
                      },
                    },
                  },
                },
              },
              "person": {
                label: "Thomas Key",
                icon: "Man.png",
                id:"15",
                children: {
                  "group:KTplans": {
                    label: "Plans",
                    id:"16",
                    children: {
                      "plan:TKHI1": {
                        label: "Health Insurance HI2",
                        icon: "Plan.png",
                        id:"17",
                      },
                      "plan:TKDI1": {
                        label: "Dental Insurance DI2",
                        icon: "Plan.png",
                        id:"18",
                      },
                      "plan:TKVI1": {
                        label: "Vision Insurance VI2",
                        icon: "Plan.png",
                        id:"19",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }
  }
  window.onload = function (e) {
  let temp= document.getElementById('chart');
    temp.setAttribute('data',JSON.stringify(TreeData))
    console.log(temp);
  };

```

| properties           | Default value |
| --------------------- | ------------- |
| data                  | []
| key                   | ""          |
| value                 | ""           |


#Events
| Events                | Default value |
| --------------------- | ------------- |
| item-selected         | (param)=>{}
