export type URL = {
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
};

export type TrackingMetadata = {
  uid: string;
  ref: string;
  url: URL;
  referrer: URL | null;
  clientTimestamp: string;
  clientTimezoneOffset: number;
  platform: string;
  appCodeName: string;
  userAgent: string;
  language: string;
};

//
// const metadata = {};
// setReferralAndTracking(metadata);
// metadata.url = window.location;
// if (document.referrer) {
//   const referrer_url = new URL(document.referrer);
//   metadata.referrer = {
//     host: referrer_url.host,
//     hostname: referrer_url.hostname,
//     href: referrer_url.href,
//     origin: referrer_url.origin,
//     pathname: referrer_url.pathname,
//     port: referrer_url.port,
//     protocol: referrer_url.protocol,
//     search: referrer_url.search,
//   }
// }
// else {
//   metadata.referrer = null;
// }
// metadata.clientTimestamp = new Date().toISOString();
// metadata.clientTimezoneOffset = new Date().getTimezoneOffset();
//
// const navigatorFields = [
//   'platform',
//   'appCodeName',
//   'userAgent',
//   'language',
// ]
