import {bindable, customElement, inject} from "aurelia-framework";

@customElement("toolbar")
@inject(Element)
export class Toolbar {
   
   constructor(element) {
      this.element = element;
   }

   back() {
      let changeEvent = new CustomEvent("pageBack", {
         bubbles: true
      });
      this.element.dispatchEvent(changeEvent);
   }
   
   forward() {
      let changeEvent = new CustomEvent("pageForward", {
         bubbles: true
      });
      this.element.dispatchEvent(changeEvent);
   }

   @bindable list;
}