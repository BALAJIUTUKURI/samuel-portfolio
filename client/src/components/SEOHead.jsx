import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "Samuel Paul - Graphic Designer Portfolio",
  description = "Professional Graphic Designer specializing in branding, digital campaigns, social media design, print design, photography, and video editing. Based in Hyderabad, India.",
  keywords = "graphic design, branding, digital campaigns, social media design, print design, photography, video editing, Samuel Paul, Hyderabad, portfolio",
  image = "/logo192.png",
  url = "https://samuelpaul.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Samuel Paul" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Samuel Paul",
          "jobTitle": "Graphic Designer",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": [
            "https://www.instagram.com/samuel_paul555/"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-99122-26742",
            "contactType": "customer service",
            "email": "kandulachandrapal@gmail.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressCountry": "India"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;