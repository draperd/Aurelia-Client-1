import {inject} from "aurelia-framework";
import NodeService from "alfresco-js-utils/lib/services/NodeService";

@inject(Element)
export class List {

   constructor(element) {
      this.element = element;

      this.data = {
         skipCount: 0,
         maxItems: 3,
         relativePath: "/",
         list: {
            entries: [],
            pagination: {
               skipCount: 0,
               maxItems: 3
            }
         }
      };
      this.getData();

   }

   attached() {
      this.element.addEventListener("navigate", (event) => {
         this.navigate(event.detail);
      });
      this.element.addEventListener("relativePath", (event) => {
         this.setRelativePath(event.detail);
      });
      this.element.addEventListener("pageBack", () => {
         this.pageBack();
      });
      this.element.addEventListener("pageForward", () => {
         this.pageForward();
      });
   }

   getData() {
      NodeService.getItems({
         skipCount: this.data.skipCount,
         maxItems: this.data.maxItems,
         relativePath: this.data.relativePath
      })
         .then(response => {
            this.data.list = response.data.list;
         });
   }

   pageBack() {
      if (this.data.list.pagination.skipCount)
      {
         this.data.skipCount -= this.data.maxItems;
         this.getData();
      }
   }

   pageForward() {
      if (this.data.list.pagination.hasMoreItems)
      {
         this.data.skipCount += this.data.maxItems;
         this.getData();
      }
   }
   
   navigate(item) {
      this.data.skipCount = 0;
      this.data.relativePath += `${item.entry.name}/`;
      this.getData();
   }

   setRelativePath(relativePath) {
      this.data.skipCount = 0;
      this.data.relativePath = relativePath;
      this.getData();
   }

}