const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Accepts international formats: optional +, spaces, dashes, dots, brackets; 7–15 digits.
export const isEmail = (v) => EMAIL.test(v.trim())
export const isPhone = (v) => /^\+?[\d\s\-().]+$/.test(v.trim()) && /^\d{7,15}$/.test(v.replace(/\D/g, ''))

/** fields: [{ name, label, required, type }] → { [name]: message } for every invalid field */
export function validate(fields, values) {
  const errors = {}
  for (const f of fields) {
    const v = (values[f.name] ?? '').trim()
    if (!v) {
      if (f.required) errors[f.name] = `Please ${f.type === 'select' ? 'select' : 'enter'} your ${f.label.toLowerCase()}.`
      continue
    }
    if (f.type === 'email' && !isEmail(v)) errors[f.name] = 'Please enter a valid email address.'
    if (f.type === 'tel' && !isPhone(v)) errors[f.name] = 'Please enter a valid phone number, including country code if outside India.'
  }
  return errors
}
