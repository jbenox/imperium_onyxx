import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  ChevronDown,
  Menu,
  MessageCircle,
  Music2,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  stockQuantity: number
  digital: boolean
  active: boolean
}

const videoBaseUrl = 'https://imperium-onyxx.netlify.app/videos/web'
const whatsappUrl = 'https://wa.me/22870010327'
const editorialImages = [
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=900&q=85',
]

async function fetchActiveProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch('/api/catalog/products', { signal })
  if (!response.ok) throw new Error(`Réponse API ${response.status}`)
  const data: Product[] = await response.json()
  return data.filter((product) => product.active)
}

const projects = Array.from({ length: 5 }, (_, index) => {
  const number = index + 1
  return {
    number: String(number).padStart(2, '0'),
    video: `${videoBaseUrl}/realisation-${number}.mp4`,
    poster: `${videoBaseUrl}/poster-${number}.jpg`,
  }
})

const partners = [
  { name: 'Yannick Studios', image: 'https://imperium-onyxx.netlify.app/images/partner-yannick-studios.jpeg' },
  { name: 'Coco Beauty House', image: 'https://imperium-onyxx.netlify.app/images/partner-coco-beauty-house.jpeg' },
  { name: 'Jah Gard', image: 'https://imperium-onyxx.netlify.app/images/partner-jah-gard.jpeg' },
]

const reasons = [
  {
    title: 'Une stratégie sur mesure',
    description: 'Des recommandations pensées selon votre marque, votre audience et vos objectifs.',
  },
  {
    title: 'Social media & image',
    description: 'Une présence cohérente sur les réseaux, portée par une image de marque claire.',
  },
  {
    title: 'Production & management',
    description: 'Un accompagnement professionnel des modèles et artistes, de la production à la carrière.',
  },
  {
    title: 'Un suivi engagé',
    description: 'Des campagnes et des parcours suivis avec exigence, créativité et transparence.',
  },
]

function AgencyHome() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      '.trust-strip, .services-section, .projects-section, .why-section, .studio-section, .contact-section',
    )

    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    sections.forEach((section) => {
      section.classList.add('reveal-on-scroll')
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <div className="announcement">
        <span>IMPERIUM ONYX</span>
        <p>Social media · Publicité · Production & management de talents</p>
        <a href="#contact">Nous écrire <ArrowUpRight size={14} /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Imperium Onyx, accueil">IMPERIUM<span>ONYX</span></a>
        <button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">
          <a href="#about" onClick={closeMenu}>À propos</a>
          <a href="#services" onClick={closeMenu}>Services <ChevronDown size={14} /></a>
          <a href="#why" onClick={closeMenu}>Pourquoi nous</a>
          <a href="#projects" onClick={closeMenu}>Réalisations</a>
          <a href="#partners" onClick={closeMenu}>Partenaires</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="/boutique">Boutique <ShoppingBag size={16} /></a>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> Agence social media & gestion de carrière · Lomé, Togo</p>
            <h1>Les marques<br /><span>en mouvement.</span></h1>
            <p className="hero-description">Nous accompagnons les entreprises dans leur stratégie social media et leur image, et nous produisons et manageons la carrière des modèles et des artistes.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#services">Découvrir nos services <ArrowRight size={17} /></a>
              <a className="text-link" href="/boutique">Explorer la boutique <ShoppingBag size={15} /></a>
            </div>
            <div className="hero-note"><Sparkles size={15} /><span>Des stratégies de marque aux carrières de talents.</span></div>
          </div>
          <div className="hero-visual">
            <video className="hero-video" autoPlay muted loop playsInline poster={`${videoBaseUrl}/poster-1.jpg`} aria-hidden="true" tabIndex={-1}>
              <source src={`${videoBaseUrl}/realisation-1.mp4`} type="video/mp4" />
            </video>
            <div className="visual-stamp"><span>LOMÉ<br />TO<br />AFRICA</span><ArrowUpRight size={18} /></div>
            <div className="visual-caption"><span>IMPERIUM ONYX</span><span>Stratégie · Image · Talents</span></div>
          </div>
          <div className="hero-index" aria-hidden="true">01 — 05</div>
        </section>

        <section className="trust-strip" id="partners" aria-label="Nos partenaires">
          <p>Ils nous font<br /><strong>confiance.</strong></p>
          {partners.map((partner) => (
            <div className="partner-logo" key={partner.name}>
              <img src={partner.image} alt={partner.name} loading="lazy" />
            </div>
          ))}
          <span className="partner-coming">D’autres partenaires bientôt</span>
        </section>

        <section className="services-section section-shell" id="services">
          <div className="section-heading">
            <div><p className="eyebrow">Nos expertises</p><h2>Stratégie, image<br /><span>et carrière.</span></h2></div>
            <p className="section-intro">Nous aidons les marques à mieux communiquer et les talents à construire une carrière professionnelle.</p>
          </div>
          <div className="service-list">
            <a href="#contact" className="service-row"><span className="service-number">01</span><h3>Stratégie social media</h3><span className="service-detail">Analyse, stratégie & gestion des réseaux sociaux</span><ArrowUpRight /></a>
            <a href="#contact" className="service-row"><span className="service-number">02</span><h3>Image de marque</h3><span className="service-detail">Conseil en image et communication de marque</span><ArrowUpRight /></a>
            <a href="#contact" className="service-row"><span className="service-number">03</span><h3>Marketing & campagnes publicitaires</h3><span className="service-detail">Stratégie marketing et campagnes pour les marques</span><ArrowUpRight /></a>
            <a href="#contact" className="service-row"><span className="service-number">04</span><h3>Production & management de talents</h3><span className="service-detail">Gestion de carrière pour modèles et artistes</span><ArrowUpRight /></a>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-shell">
            <div className="section-heading projects-heading">
              <div><p className="eyebrow">Nos réalisations</p><h2>Voir le travail<br /><span>en action.</span></h2></div>
              <p className="section-intro">Découvrez en vidéo un aperçu de nos productions et de nos réalisations.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className="project-image">
                    <video
                      src={project.video}
                      poster={project.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={`Extrait vidéo de la réalisation ${project.number}`}
                      onPlay={(event) => {
                        const activeVideo = event.currentTarget
                        document.querySelectorAll<HTMLVideoElement>('.project-image video').forEach((video) => {
                          if (video !== activeVideo) video.pause()
                        })
                      }}
                    />
                    <span className="project-index">{project.number}</span>
                  </div>
                  <div className="project-meta"><div><h3>Réalisation {project.number}</h3><p>Extrait vidéo</p></div><span>Imperium Onyx</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section shop-section section-shell" id="why">
          <div className="shop-topline"><p className="eyebrow">Pourquoi nous choisir</p><span className="shop-live"><i /> Une agence à vos côtés</span></div>
          <div className="shop-heading"><div><h2>Une stratégie claire,<br /><span>des talents accompagnés.</span></h2></div></div>
          <div className="why-grid">
            {reasons.map((reason, index) => (
              <article className="why-card" key={reason.title}>
                <span className="why-number">0{index + 1}</span>
                <span className="why-mark" aria-hidden="true">◆</span>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="studio-section" id="about">
          <div className="studio-image">
            <img src={`${videoBaseUrl}/poster-2.jpg`} alt="Extrait d’une réalisation Imperium Onyx" loading="lazy" />
            <span className="image-label">À Lomé et au-delà</span>
          </div>
          <div className="studio-copy">
            <p className="eyebrow">À propos</p>
            <h2>Social media<br />et gestion <span>de carrière.</span></h2>
            <p>Imperium Onyx est une agence social media et de gestion de carrière. Nous conseillons les entreprises et les marques sur leur présence en ligne, leur image et leurs campagnes, tout en produisant et en manageant des modèles et des artistes.</p>
            <div className="about-details">
              <div><h3>Pour les marques · Développer leur présence</h3><p>Analyser les réseaux sociaux et l’image de marque, puis définir des stratégies marketing et des campagnes publicitaires adaptées.</p></div>
              <div><h3>Pour les talents · Faire grandir leur carrière</h3><p>Produire et accompagner les modèles et les artistes dans leur parcours professionnel.</p></div>
              <div><h3>Notre approche · Stratégie et accompagnement</h3><p>Relier la réflexion à l’action avec un suivi adapté aux objectifs de chaque marque et de chaque talent.</p></div>
            </div>
            <div className="studio-signature"><span>Exigence</span><span>Intégrité</span><span>Excellence</span><span>Confidentialité</span></div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div><p className="eyebrow">Contact</p><h2>Parlons de<br />votre <span>projet.</span></h2></div>
          <div className="contact-action">
            <p>Vous êtes talent, marque ou partenaire ? Échangeons sur vos objectifs.</p>
            <a className="button button-dark" href="https://wa.me/22870010327" target="_blank" rel="noreferrer"><MessageCircle size={17} /> +228 70 01 03 27 — WhatsApp</a>
            <a className="contact-email" href="mailto:imperiumonyxagency@gmail.com">imperiumonyxagency@gmail.com <ArrowUpRight size={15} /></a>
            <span>Suivez-nous</span>
            <div className="social-links">
              <a href="https://www.tiktok.com/@imperium.onyx" target="_blank" rel="noreferrer" aria-label="Imperium Onyx sur TikTok"><Music2 size={18} /> TikTok</a>
              <a href="https://www.instagram.com/imperium_onyx" target="_blank" rel="noreferrer" aria-label="Imperium Onyx sur Instagram"><AtSign size={18} /> Instagram</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-mark" href="#home">IMPERIUM<span>ONYX</span></a>
        <span>Agence social media & gestion de carrière · Lomé, Togo</span>
        <div><a href="/boutique">Boutique</a><a href="#contact">Contact</a><a href="#home">Mentions légales</a><a href="#home">© IMPERIUM ONYX 2026</a></div>
      </footer>
    </>
  )
}

function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'digital' | 'physical'>('all')

  async function loadProducts(signal?: AbortSignal) {
    setLoading(true)
    setLoadError('')

    try {
      setProducts(await fetchActiveProducts(signal))
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setLoadError('Le catalogue est momentanément indisponible. Réessayez dans quelques instants.')
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchActiveProducts(controller.signal)
      .then(setProducts)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return
        setLoadError('Le catalogue est momentanément indisponible. Réessayez dans quelques instants.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description ?? ''}`
      .toLocaleLowerCase('fr')
      .includes(search.toLocaleLowerCase('fr'))
    const matchesType = filter === 'all' || product.digital === (filter === 'digital')
    return matchesSearch && matchesType
  })

  function orderProduct(product: Product) {
    const message = encodeURIComponent(
      `Bonjour Imperium Onyx, je souhaite commander « ${product.name} » au prix de ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(product.price)}.`,
    )
    window.open(`${whatsappUrl}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div className="announcement">
        <span>IMPERIUM ONYX</span>
        <p>La boutique · Des ressources et sélections pour vos projets</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">Commander sur WhatsApp <ArrowUpRight size={14} /></a>
      </div>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Imperium Onyx, accueil">IMPERIUM<span>ONYX</span></a>
        <nav className="main-nav" aria-label="Navigation principale">
          <a href="/">L’agence</a>
          <a href="/#services">Nos expertises</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Nous contacter <ArrowUpRight size={16} /></a>
      </header>

      <main className="store-page">
        <section className="store-intro section-shell">
          <a className="store-back" href="/"><ArrowDown size={14} /> Retour au site</a>
          <p className="eyebrow"><span className="eyebrow-mark" /> La sélection Imperium Onyx</p>
          <h1>La boutique<br /><span>Onyx.</span></h1>
          <p className="store-description">Découvrez les ressources et les sélections proposées par Imperium Onyx. Une question sur un article ? Écrivez-nous directement sur WhatsApp.</p>
          <div className="store-tools">
            <label className="search-field">
              <Search size={17} />
              <span className="sr-only">Rechercher un article</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un article" />
            </label>
            <div className="filter-tabs" role="group" aria-label="Filtrer les articles">
              <button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')} type="button">Tout</button>
              <button className={filter === 'digital' ? 'is-active' : ''} onClick={() => setFilter('digital')} type="button">Digital</button>
              <button className={filter === 'physical' ? 'is-active' : ''} onClick={() => setFilter('physical')} type="button">Physique</button>
            </div>
          </div>
        </section>

        <section className="store-catalog section-shell" aria-label="Catalogue des articles">
          {loading ? <div className="catalog-message" role="status"><span className="loading-dot" /> Chargement du catalogue…</div> : null}
          {loadError ? (
            <div className="catalog-message catalog-error" role="alert">
              <p>{loadError}</p>
              <button className="text-link" type="button" onClick={() => void loadProducts()}>Réessayer <ArrowRight size={15} /></button>
            </div>
          ) : null}
          {!loading && !loadError && filteredProducts.length === 0 ? (
            <div className="catalog-empty">
              <span className="empty-icon"><ShoppingBag size={22} /></span>
              <div>
                <h2>{products.length ? 'Aucun article ne correspond à votre recherche.' : 'La sélection arrive bientôt.'}</h2>
                <p>{products.length ? 'Essayez un autre mot-clé ou choisissez un autre format.' : 'Nous préparons des ressources et sélections. Revenez nous voir bientôt.'}</p>
              </div>
            </div>
          ) : null}
          <div className="store-product-grid">
            {filteredProducts.map((product, index) => {
              const unavailable = product.stockQuantity < 1 && !product.digital
              return (
                <article className="store-product-card" key={product.id}>
                  <div className={`product-visual product-visual-${index % 3}`}>
                    <img src={editorialImages[index % editorialImages.length]} alt="" loading="lazy" />
                    <span className="product-type">{product.digital ? 'Ressource digitale' : 'Objet & édition'}</span>
                    <span className="product-code">IO / {String(product.id).padStart(3, '0')}</span>
                  </div>
                  <div className="product-info">
                    <div>
                      <h2>{product.name}</h2>
                      <p>{product.description || (product.digital ? 'Une ressource pratique, pensée pour votre quotidien.' : 'Une pièce choisie avec soin par le studio.')}</p>
                    </div>
                    <span className="product-price">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(product.price)}</span>
                  </div>
                  <button className="add-button" type="button" onClick={() => orderProduct(product)} disabled={unavailable}>
                    {unavailable ? 'Indisponible' : <>Commander sur WhatsApp <ArrowUpRight size={16} /></>}
                  </button>
                </article>
              )
            })}
          </div>
          <div className="catalog-footnote"><span>{products.length.toString().padStart(2, '0')} article{products.length > 1 ? 's' : ''}</span><span>Pour commander, contactez-nous sur WhatsApp</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-mark" href="/">IMPERIUM<span>ONYX</span></a>
        <span>Agence social media & gestion de carrière · Lomé, Togo</span>
        <div><a href="/">L’agence</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><a href="/">© IMPERIUM ONYX 2026</a></div>
      </footer>
    </>
  )
}

function App() {
  return window.location.pathname.replace(/\/+$/, '') === '/boutique' ? <StorePage /> : <AgencyHome />
}

export default App
