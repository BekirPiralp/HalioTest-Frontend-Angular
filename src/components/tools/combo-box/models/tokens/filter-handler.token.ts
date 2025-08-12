import { InjectionToken } from "@angular/core";
import { IFilterHandler } from "../abstract/ifilter-handler";

export const FILTER_HANDLER = new InjectionToken<IFilterHandler>('FILTER_HANDLER');