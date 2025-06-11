// Gallery data: categories with array of photos
const galleryData = [
  {
    category: "Sunrise",
    preview:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        caption: "Golden Sunrise",
      },
      {
        src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80",
        caption: "Morning Glow",
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
        caption: "Sunrise Clouds",
      },
      {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        caption: "Foggy Sunrise",
      },
    ],
  },
  {
    category: "Temple",
    preview:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
        caption: "Rocky Peaks",
      },
      {
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
        caption: "Snowy Mountains",
      },
      {
        src: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80",
        caption: "Mountain Range",
      },
      {
        src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
        caption: "Sea Cliff",
      },
    ],
  },
  {
    category: "Flower",
    preview:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        caption: "Ocean Waves",
      },
      {
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        caption: "Sunset Lake",
      },
      {
        src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
        caption: "Beach Shore",
      },
      {
        src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80",
        caption: "Coast Line",
      },
    ],
  },
  {
    category: "Nature",
    preview:
      "https://images.unsplash.com/photo-1486915309851-b0cc1f8a008e?auto=format&fit=crop&w=400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a008e?auto=format&fit=crop&w=800&q=80",
        caption: "City Skyline at Night",
      },
      {
        src: "https://images.unsplash.com/photo-1494522333600-f4eaf11cde0a?auto=format&fit=crop&w=800&q=80",
        caption: "Downtown Lights",
      },
      {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        caption: "Urban Roads",
      },
      {
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        caption: "Skyscrapers",
      },
    ],
  },
];

const gallery = document.getElementById("gallery");
const subtitle = document.getElementById("subtitle");
const backButton = document.getElementById("backButton");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalCloseBtn = document.getElementById("modalClose");

let currentCategoryIndex = null; // null means main categories view

// Show main gallery categories
function showCategories() {
  currentCategoryIndex = null;
  subtitle.textContent = "Click a category to view photos";
  backButton.style.display = "none";
  gallery.innerHTML = "";
  galleryData.forEach((cat, index) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", cat.category + ", click to open");

    const img = document.createElement("img");
    img.src = cat.preview;
    img.alt = cat.category + " preview";

    const caption = document.createElement("div");
    caption.classList.add("caption");
    caption.textContent = cat.category;

    item.appendChild(img);
    item.appendChild(caption);

    item.addEventListener("click", () => openCategory(index));
    item.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCategory(index);
      }
    });

    gallery.appendChild(item);
  });
}

// Show photos of a selected category
function openCategory(index) {
  currentCategoryIndex = index;
  subtitle.textContent = "Photos in '" + galleryData[index].category + "'";
  backButton.style.display = "inline-block";
  gallery.innerHTML = "";
  const photos = galleryData[index].photos;

  photos.forEach((photo, i) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", photo.caption + ", click to enlarge");

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;

    const caption = document.createElement("div");
    caption.classList.add("caption");
    caption.textContent = photo.caption;

    item.appendChild(img);
    item.appendChild(caption);

    item.addEventListener("click", () => openModal(i));
    item.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(i);
      }
    });

    gallery.appendChild(item);
  });
}

// Modal open with current image index in current category photos
function openModal(photoIndex) {
  if (currentCategoryIndex === null) return; // shouldn't happen
  const photo = galleryData[currentCategoryIndex].photos[photoIndex];
  modalImage.src = photo.src;
  modalCaption.textContent = photo.caption;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  modalCloseBtn.focus();
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

backButton.addEventListener("click", showCategories);
modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

showCategories();
