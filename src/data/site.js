// Single source for brand + contact details. Values in [brackets] are placeholders
// from the company profile — replace them when the official details are confirmed.
export const company = {
  name: 'PORCEKA SURFACES LLP',
  tagline: 'Surfaces That Define Spaces.',
  statement: 'One Destination. Every Surface Possibility.',
  signature: 'Elegance, crafted to endure',
  location: 'Mumbai, Maharashtra, India',
  email: '[Official Email]',
  phone: '[Official Number]',
  instagramName: 'Porceka Surfaces',
  instagramUrl: null, // e.g. 'https://www.instagram.com/<handle>/'
}

export const isPlaceholder = (value) => !value || value.startsWith('[')

export const instagramHref =
  company.instagramUrl ?? `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(company.instagramName)}`

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Collections', to: '/collections' },
  { label: 'Contact Us', to: '/contact' },
]

export const applications = [
  {
    title: 'Residential',
    image: 'residential',
    alt: 'Contemporary living room with a stone-clad feature wall',
    items: ['Luxury Residential Interiors', 'Living Rooms & Bedrooms', 'Kitchens & Bathrooms'],
  },
  {
    title: 'Hospitality',
    image: 'hotel-suite',
    alt: 'Hotel suite with natural stone and open views',
    items: ['Hotels & Hospitality', 'Suites, lobbies & leisure spaces'],
  },
  {
    title: 'Commercial',
    image: 'commercial',
    alt: 'Open-plan commercial interior',
    items: ['Commercial Developments', 'Offices & Retail Spaces'],
  },
  {
    title: 'Architectural Spaces',
    image: 'architecture',
    alt: 'Angular contemporary architecture against the sky',
    items: ['Architectural Feature Walls', 'Decorative & Specialised Installations'],
  },
]

export const reasons = [
  { title: 'Comprehensive Collections', text: 'From large-format slabs to mosaics and customised tiles.' },
  { title: 'Design Versatility', text: 'An extensive spectrum of formats, designs, colours and finishes.' },
  { title: 'Customised Possibilities', text: 'Solutions that explore unique project requirements.' },
  { title: 'Multiple Applications', text: 'Surface possibilities for residential, commercial and hospitality environments.' },
  { title: 'Global Outlook', text: 'Serving design aspirations across India and international markets.' },
]

export const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Architectural / Feature Wall', 'Other']

export const enquiryTypes = [
  'Product Enquiry',
  'Bulk Order',
  'Project Partnership',
  'Customised Surfaces',
  'International Business',
]
