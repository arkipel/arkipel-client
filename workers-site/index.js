import {
  getAssetFromKV,
  mapRequestToAsset,
} from '@cloudflare/kv-asset-handler';

const DEBUG = true;

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  // Very naive attempt at finding out whether an asset is requested
  // or not. If not, the SPA (index.html) must be returned.
  //
  // TODO This should probably be improved.
  let options = {};
  options.mapRequestToAsset = req => {
    let defaultReq = mapRequestToAsset(req);

    let url = new URL(defaultReq.url);
    let useIndex = true;
    if (url.pathname.endsWith('.ico')) {
      useIndex = false;
    } else if (url.pathname.endsWith('.png')) {
      useIndex = false;
    } else if (url.pathname.endsWith('.js')) {
      useIndex = false;
    }
    if (useIndex) {
      url.pathname = '/index.html';
    }

    return new Request(url.toString(), defaultReq);
  };

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      };
    }
    return await getAssetFromKV(event, options);
  } catch (e) {
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        });
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}
