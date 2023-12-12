const response = await (await fetch('https://api.lanyard.rest/v1/users/608876620417335337')).json();
const spotify_np = response['data']['spotify'];
if (spotify_np !== null) {
  document.getElementById("card-spotify").innerHTML = `
  <div class="card w-96 image-full">
    <figure><img src="${spotify_np['album_art_url']}" alt="Album art" /></figure>
    <div class="card-body">
      <h1 class="card-title text-2xl">Now playing</h1>
      <a class="link-hover text-xl" href="https://open.spotify.com/track/${spotify_np['track_id']}">${spotify_np['song']}</a>
      <p>${spotify_np['artist']}</p>
    </div>
  </div>
  `
}