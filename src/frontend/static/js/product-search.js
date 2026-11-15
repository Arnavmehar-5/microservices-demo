/*
 Copyright 2020 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

(function () {
  "use strict";

  function initializeProductSearch() {
    const input = document.getElementById("product-search-input");
    const clearButton = document.getElementById("product-search-clear");
    const status = document.getElementById("product-search-status");
    const emptyState = document.getElementById("product-search-empty");
    const cards = Array.from(document.querySelectorAll(".hot-product-card"));

    if (!input || !clearButton || !status || !emptyState) {
      return;
    }

    function updateResults() {
      const query = Array.from(input.value.trim()).slice(0, 100).join("");
      const normalizedQuery = query.toLowerCase();
      let visibleCount = 0;

      cards.forEach(function (card) {
        const name = card.querySelector(".hot-product-card-name");
        const matches = name && name.textContent.toLowerCase().includes(normalizedQuery);
        card.hidden = !matches;
        if (matches) {
          visibleCount += 1;
        }
      });

      const totalCount = cards.length;
      if (visibleCount === 0) {
        status.textContent = "No products found";
        emptyState.hidden = false;
      } else if (normalizedQuery === "") {
        status.textContent = "Showing all " + totalCount + " products";
        emptyState.hidden = true;
      } else {
        status.textContent = "Showing " + visibleCount + " of " + totalCount + " products";
        emptyState.hidden = true;
      }

      clearButton.hidden = query.length === 0;
    }

    function clearSearch() {
      input.value = "";
      updateResults();
      input.focus();
    }

    input.addEventListener("input", updateResults);
    clearButton.addEventListener("click", clearSearch);
    const emptyClearButton = emptyState.querySelector(".product-search-empty-clear");
    if (emptyClearButton) {
      emptyClearButton.addEventListener("click", clearSearch);
    }

    updateResults();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeProductSearch, { once: true });
  } else {
    initializeProductSearch();
  }
})();
