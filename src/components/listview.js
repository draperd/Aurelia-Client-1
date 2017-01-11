import {bindable, customElement, inject} from "aurelia-framework";

@customElement("listview")
@inject(Element)
export class ListView {
   
   constructor(element) {
      this.element = element;
   }

   navigate(item) {
      if (item.entry.isFolder)
      {
         let changeEvent = new CustomEvent("navigate", {
            detail: item,
            bubbles: true
         });
         this.element.dispatchEvent(changeEvent);
      }
   }

   @bindable list;
}