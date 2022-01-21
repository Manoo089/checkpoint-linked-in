function renderCard(card) {
    return `<div class="card__header">
    <aside class="card__header-remove-card">
                            <button class="remove-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                    />
                  </svg>
                </button>
                        </aside>
        <div class="card__header-background">
            <img id="background-image" src=${card.backgroundImage} />
        </div>
        <div class="card__profile">
            <img src=${card.picture} />
        </div>
    </div>

    <div class="card__body">
        <section class="card__profile-name">
            <p class="card__profile-name-text">${
              card.name.title + " " + card.name.first + " " + card.name.last
            }</p>
        </section>
        <section class="card__profile-work">
            <p class="card__profile-work-text">${card.title}</p>
        </section>
    </div>

    <div class="card__footer">
        <section class="card__footer-mutual-container">
            <p class="card__footer-mutual">
                <span class="infinity-svg"><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      data-supported-dps="16x16"
      fill="currentColor"
      class="mercado-match"
      width="16"
      height="16"
      focusable="false"
    >
      <path
        d="M11 3a5 5 0 00-3 1 5 5 0 100 8 5 5 0 103-9zM2 8a3 3 0 014.68-2.48 4.87 4.87 0 000 5A3 3 0 015 11a3 3 0 01-3-3zm9 3a3 3 0 01-1.68-.52 4.87 4.87 0 000-5A3 3 0 1111 11z"
      ></path></svg></span
  >${card.mutualConnections + " " + "mutual connections"}
</p>
</section>
<button class="card__footer-button">Connect</button>
</div>`;
}
const linkedInBackgound =
    "https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq";
const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=8";

function loadAndRender() {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Oops! Da ist was schiefgelaufen");
            }
        })
        .then((cards) => {
            cards.forEach((card) => {
                const cardsContainer = document.querySelector("#cards");
                const profileCard = document.createElement("article");
                profileCard.className = "card";
                profileCard.innerHTML = renderCard(card);
                cardsContainer.appendChild(profileCard);

                if (card.backgroundImage === "") {
                    const backgroundImgTag =
                        document.querySelectorAll("#background-image");
                    backgroundImgTag.forEach((bgImg) => {
                        bgImg.src = linkedInBackgound;
                    });
                }
            });
            const readyCards = [];
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                readyCards.push(card);
            }

            Promise.all(readyCards).then(() => {
                const deleteCardButton = document.querySelectorAll(".remove-button");
                const buttons = document.querySelectorAll(".remove-button");
                buttons.forEach((button) => {
                    button.addEventListener("click", (e) => {
                        const element = e.target.parentElement.parentElement.parentElement;

                        if (e.target) {
                            element.remove();
                        }
                    });
                });

                const connectButton = document.querySelectorAll(".card__footer-button");
                connectButton.forEach((button) => {
                    button.addEventListener("click", () => {
                        if (button.textContent === "Connect") {
                            button.textContent = "Pending";
                        } else {
                            button.textContent = "Connect";
                        }
                    });
                });
            });
        });
}

function deleteCard() {
    console.log("geklickt");
}

loadAndRender();