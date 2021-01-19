// @ts-nocheck
import { postData } from '../api';
import { TrackingMetadata } from '../types/tracking';
import { selectReferralCode } from '../selectors/referrals';
import store from '../store';

export function collectMetadata() {
  const state = store.getState();
  console.log('state', state);

  const metadata: any = {};
  // setReferralAndTracking(metadata);
  metadata.uid = state.tracking.trackingId;
  metadata.ref = state.referral.referralCode;

  metadata.url = window.location;
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
  } else {
    metadata.referrer = null;
  }
  metadata.clientTimestamp = new Date().toISOString();
  metadata.clientTimezoneOffset = new Date().getTimezoneOffset();

  const navigatorFields = ['platform', 'appCodeName', 'userAgent', 'language'];

  navigatorFields.map((field) => {
    metadata[field] = navigator[field];
  });

  return metadata;
}

export function pingTracking() {
  postData('/api/v1/ping/', collectMetadata()).catch((error) => null);
  return null;
}

export default {};
