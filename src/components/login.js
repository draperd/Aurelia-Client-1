import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import auth from "alfresco-js-utils/lib/Authentication";

@inject(Router)
export class Login {

   constructor(router) {
      this.router = router;
   }

   handleSubmit() {
      const username = this.username.value;
      const pass = this.pass.value;

      auth.login(username, pass).then((loggedIn) => {
         if (!loggedIn)
         {
            
         }
         else
         {
            this.router.navigate("home");
         }
      });
   }
}