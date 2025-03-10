"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const MetaPixel = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.fbq =
        window.fbq ||
        function () {
          (window.fbq as any).callMethod
            ? (window.fbq as any).callMethod.apply(window.fbq, arguments)
            : (window.fbq as any).queue.push(arguments);
        };
      if (!(window as any)._fbq) (window as any)._fbq = window.fbq;
      (window.fbq as any).push = (window.fbq as any).push || [];
      (window.fbq as any).loaded = true;
      (window.fbq as any).version = "2.0";
      (window.fbq as any).queue = [];
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      window.fbq("init", "4085608968426739");
      window.fbq("track", "PageView");
    }
  }, []);

  useEffect(() => {
    window.fbq("track", "PageView"); // Track every route change
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4085608968426739');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* NoScript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4085608968426739&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
};

export default MetaPixel;
