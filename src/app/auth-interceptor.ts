import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next:HttpHandler){
    const authToken = sessionStorage.getItem("token")
    const authRequest = req.clone(
    //   {
    //   headers: req.headers.set('authorization', "Bearer "+authToken)
    // }
    {
      setHeaders: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
    )
    return next.handle(authRequest);
  }
}
