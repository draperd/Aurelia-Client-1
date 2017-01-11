import {bindable, customElement, inject} from "aurelia-framework";
import BreadcrumbUtil from "alfresco-js-utils/lib/utils/navigation/Breadcrumbs";

@customElement("breadcrumb")
@inject(Element)
export class Breadcrumb {
   
   constructor(element) {
      this.element = element;
      this.breadcrumbs = [{
         label: "Home",
         relativePath: "/"
      }];
   }

   navigate(breadcrumb) {
      let changeEvent = new CustomEvent("relativePath", {
         detail: breadcrumb.relativePath,
         bubbles: true
      });
      this.element.dispatchEvent(changeEvent);
   }

   relativePathChanged(newPath, oldPath) {
      let breadcrumbData = BreadcrumbUtil.createBreadcrumbs({
         relativePath: newPath
      });
      this.breadcrumbs = breadcrumbData.breadcrumbs;
   }

   @bindable relativePath = "/";
}