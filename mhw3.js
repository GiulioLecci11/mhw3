function onJson(json){
    console.log("json ricevuto correttamente");
    console.log(json);
    const comics=document.querySelector('#comics');
    comics.innerHTML="";
    const res=json.data.results[0];
    const img_url=res.thumbnail.path;
    const name=res.name;
    const url=res.urls[0].url
    const desc=res.description;
    const div=document.createElement('div');
    div.classList.add('result');
    const img=document.createElement('img');
    img.src=img_url+'.jpg';
    const nome=document.createElement('h3');
    nome.textContent=name;
    const descriz=document.createElement('p');
    descriz.textContent=desc;
    const link=document.createElement('a');
    link.href=url;
    link.textContent="clicca qui per vederne i fumetti";
    div.appendChild(nome);
    div.appendChild(img);
    div.appendChild(link);
    div.appendChild(descriz);
    comics.appendChild(div);
    console.log('inserisco')
}
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
function ricerca(event){
    event.preventDefault();
    const text=document.querySelector("#comic");
    const input=encodeURIComponent(text.value);
    const publicKey='ea9329979f35f0b398e45d21e4548783';
    let ts=Date.now();
    const privateKey='b083c7df2b59365006c8ac13100c9f03be30c090';
    const hash= CryptoJS.MD5(ts + privateKey + publicKey).toString();
    
    rest_url='https://gateway.marvel.com:443/v1/public/characters?name='+input+'&ts='+ts+'&apikey='+publicKey+'&hash='+hash;
    console.log(rest_url);
    fetch(rest_url).then(onResponse).then(onJson);
}
document.querySelector('form').addEventListener('submit',ricerca);


//PARTE DI SPOTIFY
function onSpotiJson(json){
  console.log(json);
  const songs=document.querySelector("#tracks");
  songs.innerHTML="";
  const res=json.tracks.items;
  let nRes=res.length;
  if(nRes>5){
    nRes=5;
  }
  for(let i=0;i<nRes;i++){
    let artist=res[i].album.artists[0].name;
    const len=res[i].album.artists.length;
    for(let j=1;j<len;j++){
       artist+=" & "+res[i].album.artists[j].name;
    }
    const img_url=res[i].album.images[0].url;
    const titolo=res[i].name;
    const song=document.createElement('div');
    song.classList.add('spotiresult');
    const img=document.createElement('img');
    img.src=img_url;
    const creators=document.createElement('p');
    creators.textContent=artist;
    const title=document.createElement('h3');
    const song_link= document.createElement('a');
    song_link.href=res[i].uri;
    const play_button=document.createElement('img');
    play_button.classList.add('play');
    play_button.src="img/Spotify-Play-Button.png"
    song_link.appendChild(play_button);
    title.textContent=titolo;
    song.appendChild(img);
    song.appendChild(title);
    song.appendChild(creators);
    songs.appendChild(song);
    songs.appendChild(song_link);
  }
}
function onSpotiResponse(response) {
  return response.json();
}

function Spotisearch(event){
  event.preventDefault();
  const trackname=encodeURIComponent(document.querySelector('#track').value);

  fetch("https://api.spotify.com/v1/search?type=track&q=" + trackname+" soundtrack",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onSpotiResponse).then(onSpotiJson);
}

function onTokenJson(json)
{
  token = json.access_token;
}
function onTokenResponse(response){
  return response.json();
}
const client_id = 'd9552ed1bd0b4b4f909b8b4c6996eaf5';
const client_secret = '950b4850d3da47c8a8f78297c6a7a459';
let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    'Content-Type': 'application/x-www-form-urlencoded'
   }
  }
).then(onTokenResponse).then(onTokenJson);


const Sform = document.querySelector('#Spotiform');
Sform.addEventListener('submit', Spotisearch)