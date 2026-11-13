// INTEGRATION POINT — the only place form data leaves the site.
// Set VITE_FORM_ENDPOINT (see .env.example) to any service that accepts a JSON POST:
// Formspree (https://formspree.io/f/<id>), Web3Forms, Getform, or your own API/CRM.
// Until it is set, submissions fail loudly with a clear message — nothing is faked.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export class NotConfiguredError extends Error {}

export async function submitEnquiry(form, data) {
  if (!ENDPOINT) throw new NotConfiguredError('Form endpoint not configured')
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form, ...data }),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}
