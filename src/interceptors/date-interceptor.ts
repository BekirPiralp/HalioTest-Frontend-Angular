import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const dateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(map(event=>{
    if(event instanceof HttpResponse){
      return event.clone(dateConverter(event.body));
    }
    return event;
  }));
};

function isDateIsoString(val:any):boolean{
  return typeof val === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(val);
}

function dateConverter(body:any):any{
  if(body === null || body === undefined)
    return body;

  if( typeof body === "string" && isDateIsoString(body)){
    return new Date(body);
  }

  if( Array.isArray(body))
    return body.map(item=>dateConverter(item))

  if( typeof body === "object"){
    const newBody:any = {};

    for(const key of Object.keys(body)){
      newBody[key] = dateConverter(body[key]);
    }

    return newBody;
  }

  return body; // hiç biryere girmez ise...
}