document.addEventListener("DOMContentLoaded", function () {
  if (!mapToken || !listing?.geometry?.coordinates) {
    console.error("Map token or coordinates missing.");
    return;
  }

  const coords = listing.geometry.coordinates; // [lng, lat]

  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`,
    center: coords,
    zoom: 9
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  const marker = new maplibregl.Marker({ color: "red" })
    .setLngLat(coords)
    .addTo(map);

  const popup = new maplibregl.Popup({ closeButton: false })
    .setText("The precise location will be given after booking");

  marker.getElement().addEventListener("mouseenter", () => {
    popup.setLngLat(coords).addTo(map);
  });

  marker.getElement().addEventListener("mouseleave", () => {
    popup.remove();
  });

  // Only border radius
  const style = document.createElement("style");
  style.innerHTML = `
    .maplibregl-popup,
    .maplibregl-popup-content {
      border-radius: 8px !important;
    }
  `;
  document.head.appendChild(style);
});
