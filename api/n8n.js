const DEFAULT_WEBHOOK_URL = 'https://pawankumar1234.app.n8n.cloud/webhook/collect-requirement';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const payload = typeof req.body === 'string'
    ? (() => {
        try {
          return JSON.parse(req.body);
        } catch {
          return { raw: req.body };
        }
      })()
    : (req.body || {});

  const targetUrl = process.env.N8N_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  if (!targetUrl) {
    return res.status(500).json({ ok: false, error: 'Missing N8N_WEBHOOK_URL' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const raw = await response.text();
    let data = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { raw };
      }
    }

    return res.status(response.ok ? 200 : response.status).json({
      ok: response.ok,
      proxiedTo: targetUrl,
      data
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Proxy request failed'
    });
  }
};
