import { RouteLocationNormalized } from 'vue-router'

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    icon?: string;
    internationalization?: string;
  };
}
