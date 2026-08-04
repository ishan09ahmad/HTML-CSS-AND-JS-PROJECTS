const themeEl = document.querySelector("#theme");
const lightEl = document.querySelector("#light");
const darkEl = document.querySelector("#dark");
const filterEl = document.querySelector("#filter");
const angle = document.querySelector("#angle");
const regionsEl = document.querySelector("#regions");
const regionsList = document.querySelector("#regionsList");
const countriesEl = document.querySelector("#countries");
const countryInputEl = document.querySelector("#countryInput");
const backButtonEl = document.querySelector("#backButton");
const countryDetailEl = document.querySelector("#countryDetail");
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];
let countries = [];
const countryCodeMap = new Map();
let country = [];
filterEl?.addEventListener("click", () => {
    angle?.classList.toggle("rotate-180");
    regionsEl?.classList.toggle("opacity-100");
    regionsEl?.classList.toggle("hidden");
});
regions.forEach((region) => {
    const li = document.createElement("li");
    li.className = "cursor-pointer hover:bg-gray-300 p-2";
    li.textContent = region;
    li.addEventListener("click", () => {
        filterByRegion(region);
    });
    regionsList?.appendChild(li);
});
function filterByRegion(region) {
    angle?.classList.toggle("rotate-180");
    regionsEl?.classList.toggle("opacity-0");
    regionsEl?.classList.add("hidden");
    if (region === "All") {
        renderData(countries);
        return;
    }
    let filterCountries = countries.filter((country) => country.region === region);
    renderData(filterCountries);
}
countryInputEl?.addEventListener("input", () => {
    let searchValue = countryInputEl.value.trim().toLowerCase();
    document.querySelector(".loading-card")?.remove();
    if (searchValue === "") {
        renderData(countries);
        return;
    }
    let searchCountry = countries.filter((country) => country.name.toLowerCase().startsWith(searchValue));
    if (searchCountry.length === 0) {
        if (countriesEl) {
            countriesEl.innerHTML = "";
            const div = document.createElement("div");
            div.className =
                "loading-card bg-(--element) mx-auto mt-10 flex h-40 w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-(--primary-text) p-6 text-center shadow-md";
            div.innerHTML = `  <h2 class="text-xl font-semibold tracking-tight text-(--primary-text)">
    No Country Found
  </h2>

  <p class="mt-2 text-sm text-(--secondary-text)">
    Please try searching for a different country.
  </p>`;
            countriesEl.after(div);
        }
    }
    renderData(searchCountry);
});
async function getData(url) {
    try {
        loadingCountries();
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        let data = await response.json();
        countries = data.map((item) => {
            countryCodeMap.set(item.alpha3Code || "", item.name || "");
            return {
                flags: {
                    png: item.flags?.png || "",
                    alt: item.name,
                },
                name: item.name || "",
                capital: item.capital || "No Capital",
                population: item.population || 0,
                region: item.region || "Unknown Region",
                code: item.alpha3Code || "",
            };
        });
        renderData(countries);
    }
    catch (error) {
        errorstateCountries();
    }
}
function renderData(countries) {
    if (countriesEl) {
        countriesEl.innerHTML = "";
        countries.forEach((country) => {
            const card = document.createElement("div");
            card.className =
                "bg-(--element) rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer max-w-80";
            card.innerHTML = `
            <img
              src=${country.flags.png}
              alt=${country.flags.alt}
              class="w-full h-45 shadow-2xl"
            />

            <div class="px-4 py-5">
              <h2 class="text-2xl font-bold text-(--primary-text) mb-4">
              ${country.name}
              </h2>

              <p class="text-(--secondary-text) mb-1.5">
                <span class="font-semibold text-(--primary-text)"
                  >Capital:</span
                >
                ${country.capital}
              </p>

              <p class="text-(--secondary-text) mb-1.5">
                <span class="font-semibold text-(--primary-text)">Region:</span>
               ${country.region}
              </p>

              <p class="text-(--secondary-text) mb-5">
                <span class="font-semibold text-(--primary-text)"
                  >Population:</span
                >
                ${country.population.toLocaleString()}
              </p>
          
          </div>`;
            countriesEl.append(card);
            card.addEventListener("click", () => {
                getCountryDetailPage(country.code);
            });
        });
    }
}
function loadingCountries() {
    if (countriesEl) {
        countriesEl.innerHTML = "";
        new Array(12).fill("").forEach(() => {
            countriesEl.innerHTML += `     <div
            class="bg-(--element) rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer max-w-80 h-80"
          ></div>`;
        });
    }
}
function errorstateCountries() {
    document.querySelector(".error-box1")?.remove();
    if (countriesEl) {
        countriesEl.innerHTML = "";
        const errorDiv = document.createElement("div");
        errorDiv.className =
            "error-box1 mx-auto mt-10 flex h-40 w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-md";
        errorDiv.innerHTML = `
      <div
        class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl"
      >
        ⚠️
      </div>

      <h2 class="text-lg font-semibold text-red-700">
        Something went wrong
      </h2>

      <p class="mt-1 text-sm text-red-500">
        Please try again later.
      </p>
    `;
        countriesEl.after(errorDiv);
    }
}
getData("./data.json");
function getCountryDetailPage(code) {
    window.location.href = `country-details.html?code=${code}`;
}
async function getCountryDetails(code) {
    const url = "./data.json";
    try {
        loadingCountryDetails();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Country not found");
        }
        const data = (await response.json());
        const countryData = data.find((country) => country.alpha3Code === code);
        if (!countryData) {
            throw new Error("Country not found");
        }
        country = [
            {
                flags: {
                    png: countryData.flags?.png ?? "",
                    alt: countryData.name,
                },
                name: countryData.name,
                nativeName: countryData.nativeName || "",
                population: countryData.population || 0,
                region: countryData.region || "",
                subregion: countryData.subregion || "",
                capital: countryData.capital || "No Capital",
                tld: countryData.topLevelDomain?.[0] || "",
                currency: countryData.currencies?.[0]?.name || "",
                languages: countryData.languages
                    ? countryData.languages.map((lang) => lang.name).join(", ")
                    : "",
                borders: countryData.borders?.slice(0, 3) || [],
            },
        ];
        renderCountryData(country);
    }
    catch (error) {
        errorStateCountryDetail();
    }
}
function renderCountryData(country) {
    if (countryDetailEl) {
        countryDetailEl.innerHTML = `
      <div class="w-full max-w-125  mx-auto">
        <img
          src="${country[0]?.flags.png}"
          alt="${country[0]?.flags.alt}"
          class="w-full rounded-lg shadow-lg   "
        />
      </div>

      <div>
        <h2 class="text-4xl font-bold mb-10 text-(--primary-text)">
          ${country[0]?.name}
        </h2>

        <div class="grid sm:grid-cols-2 gap-10">
          <div class="space-y-4">
            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Native Name:
              </span>
              ${country[0]?.nativeName}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Population:
              </span>
              ${country[0]?.population.toLocaleString()}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Region:
              </span>
              ${country[0]?.region}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Sub Region:
              </span>
              ${country[0]?.subregion}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Capital:
              </span>
              ${country[0]?.capital}
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Top Level Domain:
              </span>
              ${country[0]?.tld}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Currency:
              </span>
              ${country[0]?.currency}
            </p>

            <p class="text-(--secondary-text)">
              <span class="font-semibold text-(--primary-text)">
                Languages:
              </span>
              ${country[0]?.languages}
            </p>
          </div>
        </div>

        <div class="mt-14 flex flex-col sm:flex-row sm:items-center gap-5">
          <h3
            class="font-semibold text-lg whitespace-nowrap text-(--primary-text)"
          >
            Border Countries:
          </h3>

          <div class="flex flex-wrap gap-3">
            ${country[0]?.borders && country[0].borders.length > 0
            ? country[0].borders
                .map((border) => `
                  <button
                    class="bg-white px-6 py-2 rounded shadow text-(--secondary-text) cursor-pointer border-btn" 
                    data-code="${border}"
                  >
                    ${countryCodeMap.get(border)}
                  </button>
                `)
                .join("")
            : `<p class="text-(--secondary-text)">
                    No bordering countries
                  </p>`}
          </div>
        </div>
      </div>
    `;
        const borderButtonsEl = document.querySelectorAll(".border-btn");
        borderButtonsEl.forEach((button) => {
            button.addEventListener("click", () => {
                const code = button.dataset.code;
                if (code) {
                    getCountryDetailPage(code);
                }
            });
        });
    }
}
function loadingCountryDetails() {
    if (countryDetailEl) {
        countryDetailEl.innerHTML = "";
        countryDetailEl.innerHTML = `      <div class="w-full max-w-125 mx-auto h-100 rounded-lg shadow-lg">
   
        </div>

        <div>
          <h2 class="text-4xl font-bold mb-10 text-(--primary-text)">
           
          </h2>

          <div class="grid sm:grid-cols-2 gap-10">
            <div class="space-y-4">
              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Native Name:</span
                >
                
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Population:</span
                >
              
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)">Region:</span>
               
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Sub Region:</span
                >
              
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Capital:</span
                >
              
              </p>
            </div>

           
            <div class="space-y-4">
              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Top Level Domain:</span
                >
               
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Currencies:</span
                >
               
              </p>

              <p class="text-(--secondary-text)">
                <span class="font-semibold text-(--primary-text)"
                  >Languages:</span
                >
              
              </p>
            </div>
          </div>

          <div class="mt-14 flex flex-col sm:flex-row sm:items-center gap-5">
            <h3
              class="font-semibold text-lg whitespace-nowrap text-(--primary-text)"
            >
              Border Countries:
            </h3>

            <div class="flex flex-wrap gap-3">
              <button
                class="bg-white px-6 py-2 rounded shadow text-(--secondary-text)"
              >
                
              </button>

              <button
                class="bg-white px-6 py-2 rounded shadow text-(--secondary-text)"
              >
                
              </button>

              <button
                class="bg-white px-6 py-2 rounded shadow text-(--secondary-text)"
              >
                
              </button>
            </div>
          </div>
        </div>`;
    }
}
function errorStateCountryDetail() {
    document.querySelector(".error-box2")?.remove();
    if (countryDetailEl) {
        countryDetailEl.innerHTML = "";
        const errorDiv = document.createElement("div");
        errorDiv.className =
            "error-box2 mx-auto mt-10 flex h-40 w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-md";
        errorDiv.innerHTML = `
  <div
    class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl"
  >
    ⚠️
  </div>

  <h2 class="text-lg font-semibold text-red-700">
    Something went wrong
  </h2>

  <p class="mt-1 text-sm text-red-500">
    Please try again later.
  </p>
`;
        countryDetailEl.after(errorDiv);
    }
}
const params = new URLSearchParams(window.location.search);
const code = params.get("code") || "";
if (code !== "") {
    getCountryDetails(code);
}
backButtonEl?.addEventListener("click", () => {
    window.location.href = `index.html`;
});
themeEl?.addEventListener("click", (e) => {
    const target = e.target;
    const button = target.closest(".dark, .light");
    if (!button)
        return;
    let applyDark = button.classList.contains("dark");
    localStorage.setItem("theme", applyDark ? "dark" : "light");
    lightEl?.classList.toggle("hidden", !applyDark);
    darkEl?.classList.toggle("hidden", applyDark);
    document.body.classList.toggle("dark", applyDark);
});
function setTheme() {
    let applyDark = localStorage.getItem("theme") === "dark";
    lightEl?.classList.toggle("hidden", !applyDark);
    darkEl?.classList.toggle("hidden", applyDark);
    document.body.classList.toggle("dark", applyDark);
}
setTheme();
export {};
//# sourceMappingURL=script.js.map