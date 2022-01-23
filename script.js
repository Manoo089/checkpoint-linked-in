const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=1";
const linkedInBackgound =
    "https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq";
let profiles = [];
let count = localStorage.getItem("counter");

function renderInvitations(pendingInvitations) {
    pendingInvitations = document.querySelector(".invitations-bar__pending");

    if (count === 0) {
        pendingInvitations.innerText = "No pending invitations";
    }

    if (count === 1) {
        pendingInvitations.innerText = `${count} pending invitation`;
    }

    if (count > 1) {
        pendingInvitations.innerText = `${count} pending invitations`;
    }

    setLocalStorageDefault(document.querySelector("#manage-anchor"));
}

function initialGetProfilesData() {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("!!!!");
            }
        })
        .then((profilesData) => {
            profilesData.forEach((profile) => {
                if (profile.backgroundImage === "") {
                    profile.backgroundImage = linkedInBackgound;
                }
                profile.id = createId(profile.name.first + profile.name.last);
                profiles.push(profile);
                if (profiles.length === 8) {
                    renderAll();
                } else {
                    initialGetProfilesData();
                }
            });
        });
}

function renderAll() {
    profiles.forEach((card) => {
        createAndAddElements(card);
        removeCardListener(removeButton);
        connectButtonListener(cardFooterConnectButton);
    });
}

function getNewProfile() {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("!!!!");
            }
        })
        .then((profilesData) => {
            profilesData.forEach((profile) => {
                if (profile.backgroundImage === "") {
                    profile.backgroundImage = linkedInBackgound;
                }
                profile.id = createId(profile.name.first + profile.name.last);
                profiles.push(profile);
            });
            renderNewUser();
        });
}

function renderNewUser() {
    profiles.slice(7).forEach((card) => {
        let addFade = setTimeout(function() {
            createAndAddElements(card);
            removeCardListener(removeButton);
            connectButtonListener(cardFooterConnectButton);
        }, 400);
    });
}

function removeCardListener(button) {
    button.addEventListener("click", (e) => {
        const button = e.target;
        const element = button.parentElement.parentElement.parentElement;
        removeFading(element);

        profiles = profiles.filter((profile) => profile.id !== button.id);
        getNewProfile();
    });
    return button;
}

function connectButtonListener(button) {
    button.addEventListener("click", (e) => {
        const button = e.target;
        countPendingAndRender(button);
        toggleConnectButton(button);
    });
    return button;
}

function countPendingAndRender(button) {
    const pendingInvitiations = document.querySelector(
        ".invitations-bar__pending"
    );
    if (button.textContent === "Connect") {
        count++;
        localStorage.setItem("counter", count);
    } else {
        count--;
        localStorage.setItem("counter", count);
    }
    renderInvitations(pendingInvitiations);

    return button;
}

function toggleConnectButton(button) {
    if (button.textContent === "Connect") {
        button.textContent = "Pending";
    } else {
        button.textContent = "Connect";
    }
    return button;
}

const createAndAddElements = (card) => {
    // CARD HEADER //
    const cardsContainer = document.querySelector("#cards");
    const profileCard = document.createElement("article");
    profileCard.className = "card";

    const cardHeaderElem = document.createElement("div");
    cardHeaderElem.classList.add("card__header");

    const cardHeaderRemoveElem = document.createElement("aside");
    cardHeaderRemoveElem.classList.add("card__header-remove-card");

    removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.id = card.id;
    removeButton.innerText = "X";

    const cardHeaderBackgroundElem = document.createElement("div");
    cardHeaderBackgroundElem.classList.add("card__header-background");

    const cardHeaderImage = document.createElement("img");
    cardHeaderImage.id = "background-image";
    cardHeaderImage.src = card.backgroundImage;

    const cardProfileElem = document.createElement("div");
    cardProfileElem.classList.add("card__profile");

    const cardProfileImage = document.createElement("img");
    cardProfileImage.src = card.picture;

    // CARD BODY //

    const cardBodyElem = document.createElement("div");
    cardBodyElem.classList.add("card__body");

    const cardProfileNameElem = document.createElement("section");
    cardProfileNameElem.classList.add("card__profile-name");

    const cardProfileNameText = document.createElement("p");
    cardProfileNameText.classList.add("card__profile-name-text");
    cardProfileNameText.innerHTML = `${card.name.title} ${card.name.first} ${card.name.last}`;

    const cardProfileWorkElem = document.createElement("section");
    cardProfileWorkElem.classList.add("card__profile-work");

    const cardProfileWorkText = document.createElement("p");
    cardProfileWorkText.classList.add("card__profile-work-text");
    cardProfileWorkText.innerText = `${card.title}`;

    // CARD FOOTER //

    const cardFooterElem = document.createElement("div");
    cardFooterElem.classList.add("card__footer");

    const cardFooterMutualElem = document.createElement("section");
    cardFooterMutualElem.classList.add("card__footer-mutual-container");

    const cardFooterMutualText = document.createElement("p");
    cardFooterMutualText.classList.add("card__footer-mutual");
    cardFooterMutualText.innerText = `${card.mutualConnections} mutual connections`;

    const cardFooterMutualSpan = document.createElement("span");
    cardFooterMutualSpan.classList.add("infinity-svg");
    cardFooterMutualSpan.innerHTML = `<svg
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
        ></path></svg>`;

    cardFooterConnectButton = document.createElement("button");
    cardFooterConnectButton.classList.add("card__footer-button");
    cardFooterConnectButton.textContent = "Connect";

    // APPEND

    cardsContainer.appendChild(profileCard);
    profileCard.appendChild(cardHeaderElem);

    cardHeaderElem.appendChild(cardHeaderRemoveElem);
    cardHeaderRemoveElem.appendChild(removeButton);

    cardHeaderElem.appendChild(cardHeaderBackgroundElem);
    cardHeaderBackgroundElem.appendChild(cardHeaderImage);

    cardHeaderElem.appendChild(cardProfileElem);
    cardProfileElem.appendChild(cardProfileImage);

    profileCard.appendChild(cardBodyElem);
    cardBodyElem.appendChild(cardProfileNameElem);
    cardProfileNameElem.appendChild(cardProfileNameText);

    cardBodyElem.appendChild(cardProfileWorkElem);
    cardProfileWorkElem.appendChild(cardProfileWorkText);

    profileCard.appendChild(cardFooterElem);
    cardFooterElem.appendChild(cardFooterMutualElem);
    cardFooterMutualElem.appendChild(cardFooterMutualSpan);
    cardFooterMutualSpan.appendChild(cardFooterMutualText);

    cardFooterElem.appendChild(cardFooterConnectButton);
};

function createId(str) {
    return str.trim().replaceAll(" ", "").toLowerCase();
}

function removeFading(el) {
    el.style.animation = "opacity-reverse 405ms linear";

    let deleteFade = setTimeout(fadeIn, 400);

    function fadeIn() {
        el.remove();
    }
    return;
}

function setLocalStorageDefault(button) {
    button.addEventListener("click", () => {
        localStorage.setItem("counter", 0);
        document.querySelector(".invitations-bar__pending").innerText =
            "No pending invitations";
    });
    return button;
}

renderInvitations();
initialGetProfilesData();