import { ActivatedRouteSnapshot, RouterStateSnapshot ,Router} from "@angular/router";
import { inject } from '@angular/core';
import { AuthService } from "../core/services/auth.service";

export const aboutGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);    // получаем сервис
   // return authService.isLoggedIn
   const router = inject(Router);

    const isAuth = authService.isAuthenticated(); 
    if (!isAuth) {
      router.navigate(['/login']);
      return false;
    }
  
    return true;
};