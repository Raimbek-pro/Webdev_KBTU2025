import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { AuthService } from "../core/services/auth.service";

export const aboutGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);    // получаем сервис
    return authService.isLoggedIn
    // console.log(route.routeConfig?.path);    // можно получить различную информацию о маршрутах, параметрах и ит.д.
    // return confirm("Вы уверены, что хотите перейти?");
};