import { LitElement, html, css } from 'lit-element';

class Tree extends LitElement {
  static get styles() {
    return [
      css`
        details details {
          margin-left: 10pt;
        }
        .treeview {
          margin: 20px 0px;
          padding: 5pt;
          width: 240pt;
          border: 1px solid black;
          font: 10pt Arial;
          display: inline-block;
        }
        summary[selected="true"] {
          background-color: yellow;
        }

        summary {
          cursor: pointer;
        }
        summary:hover {
          background-color: #c0e0ff;
        }
        summary .icon {
          width: 16px;
          height: 16px;
        }

        summary:only-child::-webkit-details-marker {
          color: transparent;
        }
        details details {
          margin-left: 10pt;
          display: block;
        }
        #display {
          display: inline-block;
          vertical-align: top;
        }
        #display {
          font-family: Arial;
        }
        .label {
          font-size: 14pt;
          font-weight: bold;
        }
        .descr {
          font-size: 10pt;
        }
      `,
    ];
  }

  static get properties() {
    return {
      imageBase: { type: String },
      treeviewId: { type: String },
      data: { type: Object },
      value: { type: String },
      key: { type: String },
    };
  }

  constructor() {
    super();
    this.treeviewId = ".treeview";
    this.imageBase = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/620300/";
    this.data = {};
    this.key = "id";
    this.value = this.data[this.key];
  }

  on(eventName, fn) {
    var me = this;
    switch (eventName) {
      case "select": {
        this.shadowRoot
          .querySelector(this.treeviewId)
          .addEventListener("click", (event) => {
            if (event.target.nodeName == "SUMMARY") {
              if (me.selected != null) {
                this.shadowRoot
                  .getElementById(me.selected)
                  .removeAttribute("selected");
              }
              this.shadowRoot
                .getElementById(event.target.id)
                .setAttribute("selected", "true");
              me.selected = event.target.id;
              event.target.setAttribute(
                "open",
                !event.target.parentNode.hasAttribute("open")
              );
              fn(event);
            }
          });
        break;
      }
    }
  }
  appendData(data, targetId) {
    this.shadowRoot.getElementById(
      targetId
    ).parentNode.innerHTML += this.walkData(data);
  }
  replaceData(data, targetId) {
    if (targetId != null) {
      var target = this.shadowRoot.getElementById(targetId);
      target.outerHTML = this.walkData(data);
    } else {
      var target = this.shadowRoot.querySelector(this.treeviewId);
      target.innerHTML = this.walkData(data);
    }
  }
  walkData(data) {
    var me = this;
    var buf = Object.keys(data).map(
      (key) => `<details><summary   id="${data[key][this.key]}"  ${Object.keys(
        data[key]
      )
        .map((subkey) => {
          return subkey != "children"
            ? `data-${subkey}="${data[key][subkey]}"`
            : " ";
        })
        .join(" ")}><img class="icon" src="${me.imageBase}${
        data[key].icon
          ? data[key].icon
          : data[key].children
          ? "Folder.png"
          : "Item.png"
      }"> </img>${data[key].label}</summary>
     ${data[key].children ? me.walkData(data[key].children) : ""}</details>`
    );
    return buf.join("\n");
  }
  open(id) {
    var node = this.shadowRoot.getElementById(id);
    while (node.parentNode.nodeName == "DETAILS") {
      node = node.parentNode;
      node.setAttribute("open", "true");
    }
  }
  close(id) {
    var node = this.shadowRoot.getElementById(id).parentNode;
    node.removeAttribute("open");
    var detailNodes = node.querySelectorAll("DETAILS");
    detailNodes.forEach((node) => node.removeAttribute("open"));
  }
  firstUpdated() {
    this.on("select", (e) => {
      return this.selectedItem(e.target.id);
    });
  }
  select(id) {
    var check = this.shadowRoot.getElementById(id);
    if (check) {
      this.open(id);
      this.shadowRoot.getElementById(id).focus();
      this.shadowRoot.getElementById(id).click();
      this.selectedItem(id);
    } else {
      console.log("id bwny nia", id);
    }
  }

  selectedItem(id) {
    let myEvent = new CustomEvent("item-selected", {
      detail: { param: id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  updated() {
    this.replaceData(this.data);
    if (this.value != "") {
      this.select(this.value);
    }
    // this.appendData(this.physicians, "categories");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "value") this.value = new String(newValue);
    if (name == "key") this.key = newValue;
  }

  render() {
    return html` <div class="treeview"></div> `;
  }
}

customElements.define('tree-view', Tree);
