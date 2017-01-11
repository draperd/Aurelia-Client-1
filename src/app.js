import {Redirect} from "aurelia-router";

class AuthorizeStep {
   run(navigationInstruction, next) {
      if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf("authenticated") !== -1)) {
         var isLoggedIn = !!localStorage.ticket;
         if (!isLoggedIn) {
           return next.cancel(new Redirect("login"));
         }
      }
      return next();
   }
}

export class App {
   configureRouter(config, router) {
      config.title = "Aurelia Test";
      config.addPipelineStep("authorize", AuthorizeStep);
      config.map([
         { route: ["login"], moduleId: "components/login", title: "Login", settings: { roles: [] } },
         { route: ["", "home"], moduleId: "components/home", title: "Home", settings: { roles: ["authenticated"] } }
      ]);
   }
}

