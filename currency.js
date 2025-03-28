const currencySelector = document.getElementById('currencySelector');
const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
currencySelector.value = savedCurrency;

async function updatePrice(currency) {
  localStorage.setItem('preferredCurrency', currency);

  const priceElements = document.querySelectorAll('[data-usd]');

  if (!priceElements.length) return;

  try {
    let rates = { USD: 1 };

    if (currency !== 'USD') {
      const response = await fetch('https://exchange-rate-proxy.buyyourwatchxdmj.workers.dev');
      const data = await response.json();
      rates = data.rates;
    }

    priceElements.forEach((priceElement) => {
      const rawUsd = priceElement.dataset.usd;
      const basePriceUSD = parseFloat(rawUsd.replace(/[^0-9.]/g, ''));

      const gstPlaceholder = priceElement.closest('.watch-card')?.querySelector('.gst-placeholder');

      if (currency === 'USD') {
        priceElement.innerHTML = `$${basePriceUSD.toFixed(2)} <span class="text-span">USD</span>`;
        if (gstPlaceholder) gstPlaceholder.textContent = '';
        return;
      }

      const converted = basePriceUSD * rates[currency];
      priceElement.innerHTML = `${converted.toFixed(2)} <span class="text-span">${currency}</span>`;

      if (currency === 'AUD' && gstPlaceholder) {
        const gst = converted * 0.10;
        gstPlaceholder.textContent = `10% GST ($${gst.toFixed(2)} AUD) has been added for Australian orders.`;
      } else if (gstPlaceholder) {
        gstPlaceholder.textContent = '';
      }
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    priceElements.forEach((el) => (el.textContent = 'Error'));
  }
}

currencySelector.addEventListener('change', (e) => {
  updatePrice(e.target.value);
});

updatePrice(savedCurrency);
