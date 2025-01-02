import { Helmet } from 'react-helmet-async'

function SEOHead({ title, description, keywords, image }) {
  const siteUrl = 'https://pcbtasarim.com' // Sitenizin gerçek URL'si
  
  return (
    <Helmet>
      <title>{title ? `${title} | PCB Tasarım` : 'PCB Tasarım ve Sipariş Platformu'}</title>
      <meta name="description" content={description || 'Profesyonel PCB tasarım ve üretim hizmetleri. Hızlı teslimat ve uygun fiyatlarla PCB siparişi verin.'} />
      <meta name="keywords" content={keywords || 'PCB tasarım, PCB üretim, elektronik devre, baskılı devre'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || `${siteUrl}/pcb-hero.png`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || `${siteUrl}/pcb-hero.png`} />
    </Helmet>
  )
}

export default SEOHead 