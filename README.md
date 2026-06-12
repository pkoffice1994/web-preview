# Kriscent Dashboard

Static dashboard for Vercel with `n8n` webhook integration and Google Sheets sync.

## Deploy On Vercel

1. Import this folder into Vercel.
2. Add environment variable `N8N_WEBHOOK_URL`.
3. Set it to your live `n8n` webhook URL, for example:
   `https://pawankumar1234.app.n8n.cloud/webhook/collect-requirement`
4. Deploy.

## n8n Import

Import [Kriscent_FINAL_STABLE_n8n_append_all.json](/Users/pawankumarjain/Documents/dashboard complete/Kriscent_FINAL_STABLE_n8n_append_all.json) into n8n for the append-all stable workflow used by the dashboard.

- `new_lead` appends a new lead row
- `add_project` appends a new project row
- `update_work` appends a work update row
- `project_completed` appends a completed-project row
- `send_invoice_pdf` appends an invoice row and triggers invoice actions
- `ping` returns a connection check response

## Webhook Mode

- Local dashboard on `localhost` uses `http://127.0.0.1:5678/webhook/collect-requirement`
- Hosted dashboard uses `/api/n8n`
- Direct file open fallback uses the cloud webhook URL

## Notes

- In dashboard settings, keep webhook as `/api/n8n` on Vercel.
- Google Sheet sync requires the sheet to be public or published.
- The `api/n8n.js` function proxies webhook requests to avoid browser CORS issues.
