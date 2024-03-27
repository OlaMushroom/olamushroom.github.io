const user_id = '608876620417335337';
const response = await (await fetch(`https://api.lanyard.rest/v1/users/${user_id}`)).json();
const activities = response['data']['activities'];
if (activities.length > 0) {
  if (activities.length > 1 || activities[0]['name'] !== 'Spotify') {
    document.getElementById("lanyard-profile-readme").innerHTML = `
      <a href="https://github.com/cnrad/lanyard-profile-readme">
        <img alt="lanyard-profile-readme" src="https://lanyard.cnrad.dev/api/${user_id}?theme=dark&bg=1a1b27&hideProfile=true">
      </a>
    ` //* &idleMessage=Whacha%20lookin'%20at%20(ﾉ*ФωФ)ﾉ
  }
  const now_playing = response['data']['spotify'];
  if (now_playing !== null) {
    document.getElementById("card-spotify").innerHTML = `
      <div class="card w-96 image-full">
        <figure><img src="${now_playing['album_art_url']}" alt="Album art"></figure>
        <div class="card-body">
          <h1 class="card-title text-2xl">Now playing</h1>
          <a class="link-hover text-xl" href="https://open.spotify.com/track/${now_playing['track_id']}">${now_playing['song']}</a>
          <p>${now_playing['artist']}</p>
        </div>
      </div>
    `
  }
}