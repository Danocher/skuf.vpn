'use client'
import { useEffect } from 'react';
import Script from 'next/script';

const YandexMetrika = () => {
  useEffect(() => {
    // @ts-ignore
    if (window.ym) {
        // @ts-ignore
      window.ym(99653177, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    }
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika"
        src="https://mc.yandex.ru/metrika/tag.js"
        strategy="lazyOnload"
      />
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/99653177"
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};

export default YandexMetrika;
