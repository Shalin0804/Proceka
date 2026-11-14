import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import MagneticButton from '../components/MagneticButton'
import { InstagramIcon } from '../components/Icons'
import { company, enquiryTypes, instagramHref, emailHref, telHref, whatsappHref, mapsHref, mapsEmbed } from '../data/site'
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
        description="Let's bring your vision to life. Contact PORCEKA SURFACES LLP, Borivali West, Mumbai, for product enquiries, bulk orders, project partnerships, customised surfaces and international business."
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
          <MagneticButton variant="ghost" href={telHref(company.phones[0])}>Call Now</MagneticButton>
        </div>
      </PageHero>

      {/* 2 — Contact information */}
      <section className="section contact-info" aria-label="Contact information">
        <div className="container contact-info__grid" data-reveal="fade" data-stagger>
          <div className="contact-card">
            <MapPin size={20} strokeWidth={1.3} />
            <h2>Registered Office</h2>
            <address className="contact-card__address">
              <strong>{company.name}</strong>
              {company.address.map((line) => <span key={line}>{line}</span>)}
            </address>
          </div>
          <div className="contact-card">
            <Phone size={20} strokeWidth={1.3} />
            <h2>Phone / WhatsApp</h2>
            {company.phones.map((p) => (
              <p key={p.tel}>
                <a href={telHref(p)}>{p.display}</a>
                <a className="contact-card__wa" href={whatsappHref(p)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.display}`}>
                  <MessageCircle size={16} strokeWidth={1.4} />
                </a>
              </p>
            ))}
          </div>
          <div className="contact-card">
            <Mail size={20} strokeWidth={1.3} />
            <h2>Email</h2>
            <p><a href={emailHref}>{company.email}</a></p>
          </div>
          <div className="contact-card">
            <InstagramIcon size={20} />
            <h2>Instagram</h2>
            <p><a href={instagramHref} target="_blank" rel="noopener noreferrer">Official Instagram Profile</a></p>
          </div>
        </div>
        <div className="container btn-row contact-actions" data-reveal="fade">
          <a className="btn btn--outline-dark" href={telHref(company.phones[0])}><span className="btn__label"><Phone size={16} strokeWidth={1.4} /> Call Now</span></a>
          <a className="btn btn--outline-dark" href={whatsappHref(company.phones[0])} target="_blank" rel="noopener noreferrer"><span className="btn__label"><MessageCircle size={16} strokeWidth={1.4} /> WhatsApp Us</span></a>
          <a className="btn btn--outline-dark" href={emailHref}><span className="btn__label"><Mail size={16} strokeWidth={1.4} /> Send Email</span></a>
          <a className="btn btn--outline-dark" href={instagramHref} target="_blank" rel="noopener noreferrer"><span className="btn__label"><InstagramIcon size={16} /> Instagram</span></a>
          <a className="btn btn--outline-dark" href={mapsHref} target="_blank" rel="noopener noreferrer"><span className="btn__label"><MapPin size={16} strokeWidth={1.4} /> Get Directions</span></a>
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
            <address className="location__address" data-reveal="fade">
              {company.name}<br />
              {company.address.map((line) => <span key={line}>{line}<br /></span>)}
            </address>
            <p data-reveal="fade">Serving design aspirations across India and international markets. Please get in touch to arrange a visit.</p>
            <a className="link-arrow" href={mapsHref} target="_blank" rel="noopener noreferrer" data-reveal="fade">
              Get Directions <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
          </div>
          <div className="location__map" data-reveal="image">
            <iframe
              title="Map of Patel Shopping Centre, Borivali West, Mumbai"
              src={mapsEmbed}
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
