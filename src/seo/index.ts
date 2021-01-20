import { postData } from '../api';
import { TrackingMetadata } from '../types/tracking';
import store from '../store';

export function collectMetadata(): TrackingMetadata {
  const state = store.getState();

  const metadata: TrackingMetadata = {
    uid: state.tracking.trackingId,
    ref: state.referral.referralCode,
    url: window.location,
    referrer: null,
    clientTimestamp: new Date().toISOString(),
    clientTimezoneOffset: new Date().getTimezoneOffset(),
    platform: navigator['platform'],
    appCodeName: navigator['appCodeName'],
    userAgent: navigator['userAgent'],
    language: navigator['language'],
  };

  if (document.referrer) {
    const referrer_url = new URL(document.referrer);
    metadata.referrer = {
      host: referrer_url.host,
      hostname: referrer_url.hostname,
      href: referrer_url.href,
      origin: referrer_url.origin,
      pathname: referrer_url.pathname,
      port: referrer_url.port,
      protocol: referrer_url.protocol,
      search: referrer_url.search,
    };
  }

  return metadata;
}

export function pingTracking() {
  postData('/api/v1/ping/', collectMetadata()).catch((error) => null);
  return null;
}

export default {};
