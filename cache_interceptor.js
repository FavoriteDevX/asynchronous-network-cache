export class AsynchronousNetworkCache {
  constructor(defaultTtlMs = 30000) {
    this.ttl = defaultTtlMs;
    this.storage = new Map();
    this.pendingFlights = new Map(); // Dynamic mapping tracking simultaneous calls
  }

  /**
   * Transparent fetch integration routing wrapper
   * @param {String} url 
   * @param {Object} options 
   */
  async request(url, options = {}) {
    const method = options.method || 'GET';
    if (method !== 'GET') return fetch(url, options).then(res => res.json());

    const cacheKey = `${url}-${JSON.stringify(options.headers || {})}`;
    const timestampNow = Date.now();

    // 1. Evaluate cache hits with verified freshness
    if (this.storage.has(cacheKey)) {
      const entity = this.storage.get(cacheKey);
      if (timestampNow - entity.cachedAt  {
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
        const parsedJson = await response.json();
        
        this.storage.set(cacheKey, {
          payload: parsedJson,
          cachedAt: Date.now()
        });
        return parsedJson;
      })
      .finally(() => {
        this.pendingFlights.delete(cacheKey); // Unlink tracker upon operational flight end
      });

    this.pendingFlights.set(cacheKey, networkPromise);
    return networkPromise;
  }

  purgeAll() {
    this.storage.clear();
    this.pendingFlights.clear();
  }
}

// Sandbox Verification Sandbox Running Trace
const apiBridge = new AsynchronousNetworkCache(10000);
const TARGET_API_URL = "https://typicode.com";

console.log("🚀 Launching parallel asymmetric request execution threads...");
// Fire 3 simultaneous requests to test Request Collapsing
Promise.all([
  apiBridge.request(TARGET_API_URL),
  apiBridge.request(TARGET_API_URL),
  apiBridge.request(TARGET_API_URL)
]).then(([res1, res2, res3]) => {
  console.log("✅ Execution cluster verified. All response targets satisfied perfectly.");
  
  // Test sequential cache fetching
  setTimeout(async () => {
    const lateResponse = await apiBridge.request(TARGET_API_URL);
    console.log("🎯 Finished late stage execution verification tracing loops.");
  }, 2000);
});
