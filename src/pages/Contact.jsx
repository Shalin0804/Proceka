import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import MagneticButton from '../components/MagneticButton'
import { InstagramIcon } from '../components/Icons'
import { company, enquiryTypes, instagramHref, isPlaceholder } from '../data/site'
import { useScrollAnimations } from '../animations/gsap'
import { scrollToTarget } from '../hooks/useLenis'

const FIELDS = [
  { name: 'name', label: 'Full Name', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company Name', autoComplete: 'organization' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'enquiryType', label: 'Enquiry Type', type: 'select', options: enquiryTypes, required: true, full: true },
  { name: 'details', label: 'Project Details', type: 'textarea', required: true },
]

const AUDIENCES = [
  { title: 'Architects & Interior Designers', text: 'Explore formats, textures and finishes for your next specification — or a customised surface for a signature space.', type: 'Product Enquiry' },
  { title: 'Builders & Developers', text: 'From a single villa to large real-estate developments, talk to us about surface requirements for your project.', type: 'Project Partnership' },
  { title: 'Dealers & Showrooms', text: 'Interested in volume requirements or adding Porceka surfaces to your offering? Start a bulk enquiry.', type: 'Bulk Order' },
  { title: 'International Buyers & Importers', text: 'Serving design aspirations across India and international markets — connect with us about export enquiries.', type: 'International Business' },
]

const INSTAGRAM_TILES = ['marble-bath', 'mosaic-backsplash', 'hotel-room', 'marble-black', 'kitchen', 'custom-check']

function ContactValue({ value, href }) {
  return isPlaceholder(value) ? <span className="placeholder-value">{value}</span> : <a href={href}>{value}</a>
}

export default function Contact() {
  const [preset, setPreset] = useState(null)
  const ref = useScrollAnimations()

  const startEnquiry = (type) => {
    setPreset({ enquiryType: type })
    scrollToTarget('#enquiry')
  }

  return (
    <div ref={ref}>
      <Seo
        title="Contact Us"
        description="Let's bring your vision to life. Contact PORCEKA SURFACES LLP, Mumbai, for product enquiries, bulk orders, project partnerships, customised surfaces and international business."
      />
      <PageHero
        label="Contact Us"
        title="Let's Bring Your Vision to Life."
        text="Looking for the perfect surface for your next project? Connect with Porceka to explore our collections, discuss customised requirements and discover new possibilities for your spaces."
        image="hotel-dark"
        alt="Warmly lit hotel bedroom with dark timber panelling"
      >
        <div className="btn-row" data-reveal="fade">
          <MagneticButton variant="light" onClick={() => scrollToTarget('#enquiry')}>Send an Enquiry</MagneticButton>
        </div>
      </PageHero>

      {/* 2 — Contact information */}
      <section className="section contact-info" aria-label="Contact information">
        <div className="container contact-info__grid" data-reveal="fade" data-stagger>
          <div className="contact-card">
            <MapPin size={20} strokeWidth={1.3} />
            <h2>Studio</h2>
            <p>{company.name}<br />{company.location}</p>
          </div>
          <div className="contact-card">
            <Mail size={20} strokeWidth={1.3} />
            <h2>Email</h2>
            <p><ContactValue value={company.email} href={`mailto:${company.email}`} /></p>
          </div>
          <div className="contact-card">
            <Phone size={20} strokeWidth={1.3} />
            <h2>Phone / WhatsApp</h2>
            <p><ContactValue value={company.phone} href={`tel:${company.phone.replace(/\s/g, '')}`} /></p>
          </div>
          <div className="contact-card">
            <InstagramIcon size={20} />
            <h2>Instagram</h2>
            <p><a href={instagramHref} target="_blank" rel="noopener noreferrer">{company.instagramName}</a></p>
          </div>
        </div>
      </section>

      {/* 3 — Business enquiry form */}
      <section id="enquiry" className="section enquiry" aria-labelledby="enquiry-title">
        <div className="container enquiry__grid">
          <div className="enquiry__copy">
            <p className="label" data-reveal="fade">Business Enquiry</p>
            <h2 id="enquiry-title" className="display" data-reveal="lines">Tell us about your space.</h2>
            <p data-reveal="fade">Share a few details and the Porceka team will get back to you to explore collections, formats and customised possibilities.</p>
            <div className="enquiry__img" data-reveal="image">
              <Img name="stone-wall" alt="Living space anchored by a textured stone wall" sizes="(max-width: 900px) 100vw, 35vw" />
            </div>
          </div>
          <EnquiryForm formName="business-enquiry" fields={FIELDS} submitLabel="Send Enquiry" preset={preset} />
        </div>
      </section>

      {/* 4 — Project enquiries by audience */}
      <section className="section audiences" aria-labelledby="audiences-title">
        <div className="container">
          <header className="section-head">
            <p className="label label--light" data-reveal="fade">Project Enquiries</p>
            <h2 id="audiences-title" className="display" data-reveal="lines">Whoever you build for, start here.</h2>
          </header>
          <div className="audiences__grid" data-reveal="fade" data-stagger>
            {AUDIENCES.map((a, i) => (
              <article key={a.title} className="audience">
                <span className="audience__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <button type="button" className="link-arrow link-arrow--light" onClick={() => startEnquiry(a.type)}>
                  {a.type} <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Location */}
      <section className="section location" aria-labelledby="location-title">
        <div className="container location__grid">
          <div>
            <p className="label" data-reveal="fade">Location</p>
            <h2 id="location-title" className="display" data-reveal="lines">Based in Mumbai.</h2>
            <p data-reveal="fade">{company.location}. Serving design aspirations across India and international markets. Please get in touch to arrange a visit.</p>
            <a className="link-arrow" href="https://www.google.com/maps/search/?api=1&query=Mumbai%2C%20Maharashtra%2C%20India" target="_blank" rel="noopener noreferrer" data-reveal="fade">
              Open in Google Maps <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
          </div>
          <div className="location__map" data-reveal="image">
            <iframe
              title="Map of Mumbai, Maharashtra, India"
              src="https://www.google.com/maps?q=Mumbai,+Maharashtra,+India&z=11&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 6 — Instagram */}
      <section className="section insta" aria-labelledby="insta-title">
        <div className="container">
          <header className="section-head section-head--split">
            <div>
              <p className="label" data-reveal="fade">Follow the journey on Instagram</p>
              <h2 id="insta-title" className="display" data-reveal="lines">{company.instagramName}</h2>
            </div>
            <a className="btn btn--outline-dark" href={instagramHref} target="_blank" rel="noopener noreferrer" data-reveal="fade">
              <span className="btn__label"><InstagramIcon size={16} /> Follow on Instagram</span>
            </a>
          </header>
          <div className="insta__grid" data-reveal="fade" data-stagger>
            {INSTAGRAM_TILES.map((img) => (
              <a key={img} href={instagramHref} target="_blank" rel="noopener noreferrer" className="insta__tile" aria-label={`${company.instagramName} on Instagram`}>
                <Img name={img} alt="" sizes="(max-width: 700px) 50vw, 17vw" />
                <span aria-hidden="true"><InstagramIcon size={22} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
