import { useEffect } from 'react';
import { seoService } from '../../modules/admin/settings/services/seoService';

export const SeoHead = ({ pageKey = 'home', title: customTitle, description: customDescription, ogImage: customOgImage }) => {
  useEffect(() => {
    let isMounted = true;

    const applySeo = (data) => {
      if (!isMounted) return;

      const pageOverride = data?.pages?.[pageKey] || {};
      const finalTitle =
        customTitle ||
        pageOverride.title ||
        data?.siteTitle ||
        'Stackline Studio — Creative Brands, Powerful Websites';

      const finalDescription =
        customDescription ||
        pageOverride.description ||
        data?.defaultDescription ||
        'Stackline Studio is an award-winning creative agency specializing in brand identity, high-performance web development, and digital experiences.';

      const finalOgImage =
        customOgImage ||
        pageOverride.ogImage ||
        data?.defaultOgImage ||
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop';

      // 1. Update Document Title
      document.title = finalTitle;

      // Helper to set or create meta tag
      const setMetaTag = (selector, attrName, attrValue, content) => {
        let element = document.querySelector(selector);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attrName, attrValue);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      // 2. Standard Meta Description & Keywords
      setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
      if (pageOverride.keywords) {
        setMetaTag('meta[name="keywords"]', 'name', 'keywords', pageOverride.keywords);
      }

      // 3. OpenGraph Social Share Meta Tags
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
      setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');

      // 4. Twitter Card Meta Tags
      setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
      setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
      setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalOgImage);
    };

    // Fetch live SEO config from backend
    seoService
      .getSettings()
      .then((res) => {
        if (res.data) applySeo(res.data);
      })
      .catch((err) => {
        console.warn('SeoHead using fallback defaults:', err);
        applySeo(null);
      });

    return () => {
      isMounted = false;
    };
  }, [pageKey, customTitle, customDescription, customOgImage]);

  return null;
};

export default SeoHead;
