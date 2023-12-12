const response = await (await fetch('https://api.lanyard.rest/v1/users/608876620417335337')).json();
const spotify_np = response['data']['spotify'];
if (spotify_np !== null) {
  document.getElementById("card-spotify").innerHTML = `
  <div class="card w-96 image-full">
    <figure><img src="${spotify_np['album_art_url']}" alt="Album art" /></figure>
    <div class="card-body">
      <h2 class="card-title">${spotify_np['song']}</h2>
      <h3>${spotify_np['artist']}</h3>
    </div>
  </div>
  `
}