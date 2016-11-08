import { AnalyticsEvents } from "/lib/collections/collections";

export function CreateAnalyticsEventsRoute(Api) {
  Api.addCollection(AnalyticsEvents);
}
