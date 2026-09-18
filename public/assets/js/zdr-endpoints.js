let allEndpoints = [];
let filteredEndpoints = [];
let currentPage = 1;
let currentSort = 'alphabetical';
const itemsPerPage = 20;

function getUrl(endpoint) {
  var match = endpoint.name.match(/\|\s*(.+)$/);
  if (match && match[1]) {
    return 'https://huggingface.co/' + match[1];
  }
  return 'https://openrouter.ai/models/' + endpoint.model_name;
}

function getModelCompany(modelName) {
  if (!modelName) return 'Unknown';
  var match = modelName.match(/^([^:]+)/);
  return match ? match[1].trim() : 'Unknown';
}

function formatPrice(price) {
  var num = parseFloat(price);
  if (!num || num === 0) return 'Free';
  if (num < 0.01) return '$' + (num * 1000000).toFixed(2);
  if (num < 1) return '$' + (num * 1000000).toFixed(2);
  return '$' + (num * 1000000).toFixed(2);
}

function createCard(endpoint) {
  var card = document.createElement('div');
  card.className = 'endpoint-card';

  var url = 'https://openrouter.ai/' + (endpoint.model_name || endpoint.name);
  var providerName = endpoint.provider_name || 'Unknown';
  var modelName = endpoint.model_name || endpoint.name;
  var contextLength = (endpoint.context_length || 0).toLocaleString();
  var quantization = endpoint.quantization || 'Unknown';

  var promptPrice = formatPrice(endpoint.pricing ? endpoint.pricing.prompt : null);
  var completionPrice = formatPrice(endpoint.pricing ? endpoint.pricing.completion : null);

  var cacheClass = '';
  var cacheText = '';
  if (endpoint.supports_implicit_caching === true) {
    cacheClass = 'cached';
    cacheText = '⚠️ In-Memory Caching Active';
  } else if (endpoint.supports_implicit_caching === false) {
    cacheClass = 'not-cached';
    cacheText = '✓ Zero Retention (No Cache)';
  } else {
    cacheClass = 'not-cached';
    cacheText = '✓ Zero Retention (No Cache)';
  }

  card.innerHTML =
    '<div class="card-body">' +
      '<span class="provider-eyebrow">' + providerName + '</span>' +
      '<div class="endpoint-name">' +
        '<a href="' + url + '" target="_blank" title="View on OpenRouter">' + modelName + '</a>' +
      '</div>' +
      '<div class="endpoint-id">' + endpoint.name + '</div>' +
      '<div class="specs-grid">' +
        '<div class="spec-item">📊 ' + quantization + '</div>' +
        '<div class="spec-item">📝 ' + contextLength + ' tokens</div>' +
      '</div>' +
    '</div>' +
    '<div class="cost-strip">' +
      '<div>' +
        '<div class="cost-label">Input</div>' +
        '<div class="cost-value">' + promptPrice + '</div>' +
      '</div>' +
      '<div style="text-align:right;">' +
        '<div class="cost-label">Output</div>' +
        '<div class="cost-value">' + completionPrice + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="status-bar ' + cacheClass + '">' + cacheText + '</div>';

  return card;
}

function updateStatus(status, message) {
  var statusText = document.getElementById('connection-status');
  var statusDot = document.querySelector('.status-dot');
  statusText.textContent = message;
  if (status === 'loading') {
    statusDot.className = 'status-dot loading';
  } else if (status === 'error') {
    statusDot.className = 'status-dot error';
    statusDot.style.background = '#dc3545';
    statusDot.style.animation = 'none';
  } else {
    statusDot.style.background = '#28a745';
    statusDot.style.animation = 'none';
  }
}

function populateProviders() {
  var select = document.getElementById('provider-select');
  var providers = [...new Set(allEndpoints.map(function(e) { return e.provider_name || 'Unknown'; }))].sort();
  select.innerHTML = '<option value="">All Providers</option>';
  providers.forEach(function(provider) {
    var option = document.createElement('option');
    option.value = provider;
    option.textContent = provider;
    select.appendChild(option);
  });
}

function populateCompanies() {
  var select = document.getElementById('company-select');
  var companies = [...new Set(allEndpoints.map(function(e) { return getModelCompany(e.model_name || e.name); }))].sort();
  select.innerHTML = '<option value="">All Companies</option>';
  companies.forEach(function(company) {
    var option = document.createElement('option');
    option.value = company;
    option.textContent = company;
    select.appendChild(option);
  });
}

var costRanges = { input: { min: 0, max: 1 }, output: { min: 0, max: 1 } };

function sliderToCost(sliderValue, type) {
  var range = costRanges[type];
  if (sliderValue === 0) return 0;
  if (sliderValue === 100) return range.max;

  var logMin = range.min > 0 ? Math.log10(range.min) : -10;
  var logMax = Math.log10(range.max);
  var logValue = logMin + (logMax - logMin) * (sliderValue / 100);
  return Math.pow(10, logValue);
}

function costToSlider(cost, type) {
  var range = costRanges[type];
  if (cost <= 0) return 0;
  if (cost >= range.max) return 100;

  var logMin = range.min > 0 ? Math.log10(range.min) : -10;
  var logMax = Math.log10(range.max);
  var logCost = Math.log10(cost);
  var percentage = (logCost - logMin) / (logMax - logMin);
  return Math.max(0, Math.min(100, percentage * 100));
}

function setupCostSliders() {
  var promptCosts = allEndpoints.map(function(e) { return parseFloat(e.pricing ? e.pricing.prompt : 0) || 0; });
  var completionCosts = allEndpoints.map(function(e) { return parseFloat(e.pricing ? e.pricing.completion : 0) || 0; });

  var maxPromptCost = Math.max.apply(Math, promptCosts.filter(function(c) { return c > 0; })) || 0.01;
  var maxCompletionCost = Math.max.apply(Math, completionCosts.filter(function(c) { return c > 0; })) || 0.01;
  var minPromptCost = Math.min.apply(Math, promptCosts.filter(function(c) { return c > 0; })) || maxPromptCost / 100;
  var minCompletionCost = Math.min.apply(Math, completionCosts.filter(function(c) { return c > 0; })) || maxCompletionCost / 100;

  costRanges.input.min = minPromptCost;
  costRanges.input.max = maxPromptCost;
  costRanges.output.min = minCompletionCost;
  costRanges.output.max = maxCompletionCost;

  var inputSlider = document.getElementById('input-cost-slider');
  var outputSlider = document.getElementById('output-cost-slider');

  inputSlider.value = 100;
  outputSlider.value = 100;

  updateSliderValue('input');
  updateSliderValue('output');
}

function updateSliderValue(type) {
  var slider = document.getElementById(type + '-cost-slider');
  var valueDisplay = document.getElementById(type + '-cost-value');
  var sliderValue = parseFloat(slider.value);
  var cost = sliderToCost(sliderValue, type);

  if (cost < 0.01) {
    valueDisplay.textContent = '$' + (cost * 1000000).toFixed(2) + '/1M';
  } else if (cost < 1) {
    valueDisplay.textContent = '$' + (cost * 1000).toFixed(2) + '/1K';
  } else {
    valueDisplay.textContent = '$' + cost.toFixed(2) + '/1M';
  }
}

function render() {
  var container = document.getElementById('endpoints-container');
  var resultsCount = document.getElementById('results-count');
  container.innerHTML = '';
  
  var totalPages = Math.ceil(filteredEndpoints.length / itemsPerPage);
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = Math.min(startIndex + itemsPerPage, filteredEndpoints.length);
  
  var currentItems = filteredEndpoints.slice(startIndex, endIndex);
  
  if (filteredEndpoints.length === 0) {
    container.innerHTML = '<div class="no-results" style="grid-column: 1 / -1;">No endpoints match your filters. Try adjusting your search criteria.</div>';
    resultsCount.textContent = 'Showing 0 of ' + allEndpoints.length + ' endpoints';
  } else {
    resultsCount.textContent = 'Showing ' + (startIndex + 1) + '-' + endIndex + ' of ' + filteredEndpoints.length + ' endpoints (page ' + currentPage + ' of ' + totalPages + ')';
    
    currentItems.forEach(function(endpoint) {
      container.appendChild(createCard(endpoint));
    });
  }
  
  renderPagination(totalPages);
}

function sortEndpoints(endpoints) {
  var sortOption = document.getElementById('sort-select').value;
  currentSort = sortOption;

  return endpoints.sort(function(a, b) {
    if (sortOption === 'alphabetical') {
      var providerA = (a.provider_name || '').toLowerCase();
      var providerB = (b.provider_name || '').toLowerCase();
      if (providerA !== providerB) {
        return providerA.localeCompare(providerB);
      }
      return (a.model_name || '').localeCompare(b.model_name || '');
    } else if (sortOption === 'price-desc') {
      var priceA = parseFloat(a.pricing ? a.pricing.prompt : 0) || 0;
      var priceB = parseFloat(b.pricing ? b.pricing.prompt : 0) || 0;
      return priceB - priceA;
    } else if (sortOption === 'price-asc') {
      var priceA = parseFloat(a.pricing ? a.pricing.prompt : 0) || 0;
      var priceB = parseFloat(b.pricing ? b.pricing.prompt : 0) || 0;
      return priceA - priceB;
    } else if (sortOption === 'context-desc') {
      var contextA = a.context_length || 0;
      var contextB = b.context_length || 0;
      return contextB - contextA;
    }
    return 0;
  });
}

function filter() {
  var searchTerm = document.getElementById('search-input').value.toLowerCase();
  var company = document.getElementById('company-select').value;
  var provider = document.getElementById('provider-select').value;
  var quant = document.getElementById('quant-select').value;
  var inputSliderValue = parseFloat(document.getElementById('input-cost-slider').value) || 100;
  var outputSliderValue = parseFloat(document.getElementById('output-cost-slider').value) || 100;
  var maxInputCost = sliderToCost(inputSliderValue, 'input');
  var maxOutputCost = sliderToCost(outputSliderValue, 'output');
  var cache = document.getElementById('cache-select').value;

  filteredEndpoints = allEndpoints.filter(function(endpoint) {
    var matchesSearch = !searchTerm ||
      (endpoint.model_name || '').toLowerCase().indexOf(searchTerm) !== -1 ||
      (endpoint.name || '').toLowerCase().indexOf(searchTerm) !== -1;
    var matchesCompany = !company || getModelCompany(endpoint.model_name || endpoint.name) === company;
    var matchesProvider = !provider || endpoint.provider_name === provider;
    var matchesQuant = !quant || endpoint.quantization === quant;
    var promptCost = parseFloat(endpoint.pricing ? endpoint.pricing.prompt : 0) || 0;
    var completionCost = parseFloat(endpoint.pricing ? endpoint.pricing.completion : 0) || 0;
    var matchesCost = promptCost <= maxInputCost && completionCost <= maxOutputCost;

    var matchesCache = true;
    if (cache === 'cached') {
      matchesCache = endpoint.supports_implicit_caching === true;
    } else if (cache === 'not-cached') {
      matchesCache = endpoint.supports_implicit_caching === false;
    }

    return matchesSearch && matchesCompany && matchesProvider && matchesQuant && matchesCost && matchesCache;
  });

  filteredEndpoints = sortEndpoints(filteredEndpoints);
  currentPage = 1;
  render();
}

function renderPagination(totalPages) {
  var paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;
  
  paginationContainer.innerHTML = '';
  
  if (totalPages <= 1) return;
  
  var prevBtn = document.createElement('button');
  prevBtn.className = 'pagination-btn';
  prevBtn.textContent = '← Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = function() {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  };
  
  var pageInfo = document.createElement('span');
  pageInfo.className = 'pagination-info';
  pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
  
  var nextBtn = document.createElement('button');
  nextBtn.className = 'pagination-btn';
  nextBtn.textContent = 'Next →';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = function() {
    if (currentPage < totalPages) {
      currentPage++;
      render();
    }
  };
  
  paginationContainer.appendChild(prevBtn);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextBtn);
}

function resetFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('company-select').value = '';
  document.getElementById('provider-select').value = '';
  document.getElementById('quant-select').value = '';
  document.getElementById('cache-select').value = '';
  document.getElementById('sort-select').value = 'alphabetical';

  document.getElementById('input-cost-slider').value = 100;
  document.getElementById('output-cost-slider').value = 100;
  updateSliderValue('input');
  updateSliderValue('output');

  currentSort = 'alphabetical';
  currentPage = 1;
  filter();
}

async function fetchZDREndpoints() {
  try {
    updateStatus('loading', 'Fetching ZDR endpoints...');
    
    var response = await fetch('https://openrouter.ai/api/v1/endpoints/zdr', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + response.statusText);
    }
    
    var data = await response.json();
    
    if (data.data && data.data.length > 0) {
      allEndpoints = sortEndpoints(data.data);
      filteredEndpoints = [...allEndpoints];

      updateStatus('success', '✓ ' + allEndpoints.length + ' ZDR endpoints found');
      populateCompanies();
      populateProviders();
      setupCostSliders();
      render();
    } else {
      updateStatus('error', 'No ZDR endpoints found');
      document.getElementById('endpoints-container').innerHTML = '<div class="error-message">No Zero Data Retention endpoints are currently available.</div>';
    }
  } catch (error) {
    console.error('Error fetching ZDR endpoints:', error);
    updateStatus('error', '✗ Connection failed');
    document.getElementById('endpoints-container').innerHTML = '<div class="error-message" style="grid-column: 1 / -1;"><h3>Unable to Fetch Data</h3><p><strong>Error:</strong> ' + error.message + '</p><p>The OpenRouter API may require authentication or be temporarily unavailable.</p><p>Please visit <a href="https://openrouter.ai/docs/guides/features/zdr" target="_blank" style="color: #28a745;">OpenRouter\'s ZDR documentation</a> for the latest endpoint information.</p></div>';
  }
}

document.addEventListener('DOMContentLoaded', fetchZDREndpoints);
