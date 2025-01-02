import { Helmet } from 'react-helmet-async'

const SEOHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} | PCB Tasarım ve Üretim</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={`${title} | PCB Tasarım ve Üretim`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="PCB Tasarım" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} | PCB Tasarım ve Üretim`} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEOHelmet 