// Single source for brand + contact details.
// Address is the Principal Place of Business on the GST registration certificate.
export const company = {
  name: 'PORCEKA SURFACES LLP',
  tagline: 'Surfaces That Define Spaces.',
  statement: 'One Destination. Every Surface Possibility.',
  signature: 'Elegance, crafted to endure',
  location: 'Borivali West, Mumbai',
  email: 'info@porceka.com',
  phones: [
    { display: '+91 98193 34489', tel: '+919819334489' },
    { display: '+91 98926 07714', tel: '+919892607714' },
  ],
  address: [
    '4th Floor, Office No. 401,',
    'Patel Shopping Centre,',
    'Chandavarkar Lane,',
    'Near Borivali Police Station,',
    'Borivali West, Mumbai,',
    'Maharashtra – 400092, India.',
  ],
  instagramName: 'Porceka Surfaces',
  instagramUrl: 'https://www.instagram.com/porcekasurfaces?utm_source=qr',
}

export const instagramHref = company.instagramUrl
export const emailHref = `mailto:${company.email}`
export const telHref = (phone) => `tel:${phone.tel}`
export const whatsappHref = (phone) => `https://wa.me/${phone.tel.slice(1)}`
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Patel Shopping Centre, Chandavarkar Lane, Borivali West, Mumbai, Maharashtra 400092',
)}`
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  'Patel Shopping Centre, Chandavarkar Lane, Borivali West, Mumbai, Maharashtra 400092',
)}&z=16&output=embed`

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
