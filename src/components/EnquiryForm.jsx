import { useEffect, useId, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { validate } from '../lib/validate'
import { submitEnquiry, NotConfiguredError } from '../lib/submitEnquiry'
import { company, isPlaceholder } from '../data/site'

/**
 * Generic enquiry form. `fields`: [{ name, label, type?, required?, options?, full?, autoComplete? }]
 * type: text | email | tel | select | textarea. `preset` lets a page pre-fill fields
 * (e.g. the surface a visitor clicked "Enquire" on).
 */
export default function EnquiryForm({ formName, fields, submitLabel, preset, tone = 'light' }) {
  const id = useId()
  const empty = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (preset) setValues((v) => ({ ...v, ...preset }))
  }, [preset])

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(fields, values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitEnquiry(formName, values)
      setStatus('success')
      setValues(empty)
    } catch (err) {
      const fallback = [company.email, company.phone].filter((v) => !isPlaceholder(v)).join(' or ')
      setErrorMsg(
        err instanceof NotConfiguredError
          ? `Online enquiries are being set up. ${fallback ? `Please reach us at ${fallback}.` : 'Please contact us directly in the meantime.'}`
          : 'Something went wrong sending your enquiry. Please check your connection and try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`form form--${tone} form__success`} role="status">
        <span className="form__success-icon"><Check size={26} strokeWidth={1.4} /></span>
        <h3>Thank you.</h3>
        <p>Your enquiry has been received. The Porceka team will be in touch shortly.</p>
        <button type="button" className="link-arrow" onClick={() => setStatus('idle')}>Send another enquiry <span aria-hidden="true">→</span></button>
      </div>
    )
  }

  return (
    <form className={`form form--${tone}`} onSubmit={onSubmit} noValidate aria-busy={status === 'sending'}>
      <div className="form__grid">
        {fields.map((f) => {
          const fid = `${id}-${f.name}`
          const err = errors[f.name]
          const common = {
            id: fid,
            name: f.name,
            value: values[f.name],
            onChange: update,
            required: f.required,
            'aria-invalid': err ? true : undefined,
            'aria-describedby': err ? `${fid}-err` : undefined,
          }
          return (
            <div key={f.name} className={`field ${f.full || f.type === 'textarea' ? 'field--full' : ''} ${err ? 'has-error' : ''}`}>
              <label htmlFor={fid}>
                {f.label}
                {f.required && <span aria-hidden="true"> *</span>}
              </label>
              {f.type === 'select' ? (
                <select {...common}>
                  <option value="">Select…</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea rows={4} {...common} />
              ) : (
                <input
                  type={f.type || 'text'}
                  autoComplete={f.autoComplete}
                  inputMode={f.type === 'tel' ? 'tel' : undefined}
                  {...common}
                />
              )}
              {err && <p className="field__error" id={`${fid}-err`}>{err}</p>}
            </div>
          )
        })}
      </div>
      <div className="form__footer">
        <p className="form__note">Fields marked * are required.</p>
        <button type="submit" className="btn btn--solid form__submit" disabled={status === 'sending'}>
          <span className="btn__label">
            {status === 'sending' ? <><Loader2 size={16} className="spin" /> Sending…</> : submitLabel}
          </span>
          {status !== 'sending' && <span className="btn__arrow" aria-hidden="true">→</span>}
        </button>
      </div>
      {status === 'error' && <p className="form__error" role="alert">{errorMsg}</p>}
    </form>
  )
}
