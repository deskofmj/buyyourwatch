const priceElement = document.getElementById('price');
const gstPlaceholder = document.getElementById('gst-placeholder');
const rawUsd = priceElement.dataset.usd;
const basePriceUSD = parseFloat(rawUsd.replace(/[^0-9.]/g, ''));

const currencySelector = document.getElementById('currencySelector');
const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
currencySelector.value = savedCurrency;

async function updatePrice(currency) {
  localStorage.setItem('preferredCurrency', currency);

  if (currency === 'USD') {
    priceElement.innerHTML = `$${basePriceUSD.toFixed(2)} <span class="text-span">USD</span>`;
    gstPlaceholder.textContent = '';
    return;
  }

  try {
    const response = await fetch('https://exchange-rate-proxy.buyyourwatchxdmj.workers.dev');
    const data = await response.json();
    const rate = data.rates[currency];
    const converted = basePriceUSD * rate;

    priceElement.innerHTML = `${converted.toFixed(2)} <span class="text-span">${currency}</span>`;

    if (currency === 'AUD') {
      const gst = converted * 0.10;
      gstPlaceholder.textContent = `10% GST ($${gst.toFixed(2)} AUD) has been added for Australian orders.`;
    } else {
      gstPlaceholder.textContent = '';
    }
  } catch (error) {
    console.error('Currency conversion error:', error);
    priceElement.textContent = 'Error';
    gstPlaceholder.textContent = '';
  }
}

currencySelector.addEventListener('change', (e) => {
  updatePrice(e.target.value);
});

updatePrice(savedCurrency);
