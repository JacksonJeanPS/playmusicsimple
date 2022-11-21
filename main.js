let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "O Rappa Só As Melhores",
    artist: "O RAPPA",
    image: "https://i.discogs.com/YRMwIumQTbSVIcz4JXo7CyKL71MmzT_45MCXRPQrHyQ/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk4MzQ1/NjQtMTQ4NzA4NjA5/Ni04MTA1LmpwZWc.jpeg",
    path: "https://ia801408.us.archive.org/28/items/o-rappa-so-as-melhores/O%20Rappa%20S%C3%B3%20As%20Melhores.mp3"
  },
  {
    name: "AVIÕES DO FORRO ABRIL 2016 PRIVILEGE FORTALEZA",
    artist: "AVIÕES DO FORRÓ", 
    image: "https://i.ytimg.com/vi/bB-XJiAMc1Q/maxresdefault.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/AVI%C3%95ES%20DO%20FORRO%20ABRIL%202016%20PRIVILEGE%20FORTALEZA.mp3"
  },
  {
    name: " Aviões Fantasy 2022 - Só as boas",
    artist: "Xand Avião", 
    image: "https://images.suamusica.com.br/0Ue4v86iCmAwad96_Uq1juNCzZA=/500x500/filters:format(webp)/54009/3773916/cd_cover.png",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/Xand%20Avi%C3%A3o%20-%20Avi%C3%B5es%20Fantasy%202022%20-%20S%C3%B3%20as%20boas%20%28Antigas%29.mp3"
  },
  {
    name: "DESPEDIDA DA SOLANGE  - AS MELHORES",
    artist: "AVIÕES DO FORRÓ",
    image: "https://i.scdn.co/image/ab67616d0000b273f3efd67538f96c7faa97060f",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/DESPEDIDA%20DA%20SOLANGE%20-%20AVI%C3%95ES%20DO%20FORR%C3%93%20-%20S%C3%93%20ANTIGAS%20-%20AS%20MELHORES.mp3",
  },
  {
    name: "AS MELHORES DO ROCK NACIONAL DAS ANTIGAS",
    artist: "ROCK",
    image: "https://i.ytimg.com/vi/OnvwJl27DDw/sddefault.jpg",
    path: "https://ia601401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/POP%20ROCK%20NACIONAL%20-%20AS%20MELHORES%20DO%20ROCK%20NACIONAL%20DAS%20ANTIGAS.mp3",
  },
  {
    name: "CD Sorriso Maroto as melhores",
    artist: "Sorriso Maroto",
    image: "http://2.bp.blogspot.com/-AQiZNJIEBuA/Tx44Is2TgKI/AAAAAAAAL44/tNAqNLDOkCA/s320/Sorriso%2BMaroto%2B-%2BSinais%2B-%2BNo%2BEst%25C3%25BAdio%2B-%2BM%25C3%25BAsicas%2BExtras%2BDo%2BDvd%2B%2528Capa%2BOficial%2Bdo%2BSingle%2529%2B%255Bwww.coverbrasil-leko017.blogspot.com%255D.jpg",
    path: "https://ia801402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/CD%20Sorriso%20Maroto%20as%20melhores.mp3",
  },
  {
    name: "Churrasquinho do Menos é Mais - As mais tocadas",
    artist: "Grupo do Menos é Mais",
    image: "https://i.scdn.co/image/ab67616d0000b2734dfefeed04de5dd5e04e8f8d",
    path: "https://ia801402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/CHURRASQUINHO%20MENOS%20%C3%89%20MAIS%20COMPLETO.mp3",
  },
  {
    name: "As Mais Tocadas do Ferrugem 2021",
    artist: "Ferrugem",
    image: "https://i.ytimg.com/vi/p4IuDmPrQ64/maxresdefault.jpg",
    path: "https://ia801402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/F.e.r.r.u.g.e.m%20Cd%20Completo%202021%20-%20As%20Mais%20Tocadas%20do%20F.e.r.r.u.g.e.m%20%202021.mp3",
  },
  {
    name: "Marília Mendonça - As Melhores",
    artist: "Marília Mendonça",
    image: "https://amusicanova.com/wp-content/uploads/2022/06/Musicas-do-CD-Selecao-As-melhores-Musicas.jpg",
    path: "https://ia601402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/Mar%C3%ADlia%20Mendon%C3%A7a%20-%20As%20Melhores%20%28320%20kbps%29.mp3",
  },
  {
    name: "NATTAN - ROMÂNTICO 2022 ",
    artist: "NATTAN",
    image: "https://e.snmc.io/i/600/s/3a9060a9eaf8062c904cfef90b6d9579/9568263/nattan-carona-no-foguete-cover-art.png",
    path: "https://ia601402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/NATTAN%202022%20-%20ROM%C3%82NTICO%20-%20ATUALIZADO%202022%20%281%29%20%281%29.mp3",
  },
  {
    name: "Thiaguinho 2022",
    artist: "Thiaguinho ",
    image: "https://i.scdn.co/image/ab67706c0000bebba8dd10a620ce6a6806dd6f35",
    path: "https://ia801402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/PAGODE%202022%20-%20Thiaguinho%202022%20-%20S%C3%93%20AS%20MELHORES%202022.mp3",
  },
  {
    name: "WESLEY SAFADÃO - NOVEMBRO 2022 - 10 MÚSICAS NOVAS",
    artist: "WESLEY SAFADÃO",
    image: "https://i.ytimg.com/vi/ro2hwXJq5Tw/maxresdefault.jpg",
    path: "https://ia601402.us.archive.org/2/items/marilia-mendonca-as-melhores-320-kbps/WESLEY%20SAFAD%C3%83O%20-%20NOVEMBRO%202022%20-%2010%20M%C3%9ASICAS%20NOVAS%20%28REPERT%C3%93RIO%20NOVO%29%20FORR%C3%93%20PRA%20PARED%C3%83O%20%28256%20kbps%29.mp3 ",
  },
  {
    name: "Villa Mix Brasília 2018",
    artist: "ALOK Villa",
    image: "https://i.ytimg.com/vi/bi8Q4yNprcM/maxresdefault.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/ALOK%20-%20Villa%20Mix%20Bras%C3%ADlia%202018%20%20%20Melhores%20M%C3%BAsicas%20Eletr%C3%B4nicas%20Mais%20Tocadas%202018%20.mp3",
  },
  {
    name: "Grandes Sucessos de sempre de CHORÃO",
    artist: "CHORÃO",
    image: "https://i.ytimg.com/vi/PstgnZVA_yc/maxresdefault.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/CharlieBrownJr%20Grandes%20Sucessos%20de%20sempre%20de%20CHOR%C3%83O.mp3",
  },
  {
    name: "DVD Acredite - João Gomes",
    artist: "João Gomes",
    image: "https://images.suamusica.com.br/8VkzPHiDxAsuv217yiMNoPhbVeU=/500x500/filters:format(webp)/51092159/3785984/cd_cover.jpg?1",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/DVD%20Acredite%20-%20Jo%C3%A3o%20Gomes%20%28COMPLETO%29%20%28320%20kbps%29.mp3",
  },
  {
    name: "DVD Jorge e Mateus ao vivo 2008",
    artist: "Jorge e Mateus",
    image: "https://www.vagalume.com.br/jorge-e-mateus/discografia/ao-vivo-sem-cortes.jpg",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/DVD%20Jorge%20e%20Mateus%20ao%20vivo%20em%20goi%C3%A2nia%202008.mp3",
  },
  {
    name: "Melhores Músicas de Legião Urbana",
    artist: "Renato Russo ",
    image: "https://i.ytimg.com/vi/RC4MJRGz8Jc/maxresdefault.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Legi%C3%A3o%20Urbana%20%20-%20As%20Melhores%202022.mp3",
  },
  {
    name: "MAGNIFICOS SÓ AS ANTIGAS",
    artist: "MAGNIFICOS",
    image: "https://i.ytimg.com/vi/Na1VekL-13w/maxresdefault.jpg",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/MAGNIFICOS%20S%C3%93%20AS%20ANTIGAS%20%20%20AS%20MELHORES.mp3",
  },
  {
    name: "Magníficos - Pra Beber, Roer e Chorar",
    artist: "Magníficos",
    image: "https://www.vagalume.com.br/banda-magnificos/discografia/acustico-pra-beber-roer-e-chorar.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Magn%C3%ADficos%20-%20Pra%20Beber%2C%20Roer%20e%20Chorar%20%28Ac%C3%BAstico%29.mp3",
  },
  {
    name: "Matheus & Kauan - As melhores",
    artist: "Matheus & Kauan",
    image: "https://i.ytimg.com/vi/IePcLswQFkw/maxresdefault.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Matheus%20e%20Kauan%20-%20Na%20Praia%20%28CD%20COMPLETO%29.mp3",
  },
  {
    name: "POESIA ACÚSTICA 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 e 13",
    artist: "Pineapple StormTV, Choice, Juyè, Jean Tassy, Salve Malak",
    image: "https://i.ytimg.com/vi/XtNqtMauFfo/maxresdefault.jpg",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/POESIA%20AC%C3%9ASTICA%201%2C%202%2C%203%2C%204%2C%205%2C%206%2C%207%2C%208%2C%209%2C%2010%2C%2011%2C%2012%20e%2013%20%28COM%20LETRA%29.mp3",
  },
  {
    name: "Oriente Acústico - Todas Completa #1 #2 #3 #4 #5 #6 #7 ",
    artist: "Oriente, Pablo Martins, Baviera",
    image: "https://i.ytimg.com/vi/e3eu2mpUva0/maxresdefault.jpg",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Oriente%20Ac%C3%BAstico%20-%20Todas%20Completa%201%202%203%204%205%206%207.mp3",
  },
  {
    name: "Fernandinho Uma Nova Historia ",
    artist: "Fernandinho",
    image: "https://i.ytimg.com/vi/PazYWwTk4KI/maxresdefault.jpg ",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Fernandinho%20Uma%20Nova%20Historia%20show%20completo%20Dvd.mp3",
  },
  {
    name: "Stella Laura - As mais ouvidas Outubro 2021 ",
    artist: "Stella Laura",
    image: "https://i.ytimg.com/vi/HkrheF8tsZs/sddefault.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Stella%20Laura%20%20Deus%20Est%C3%A1%20te%20Ensinando%2C%20Eu%20N%C3%A3o%20Desisto%2C%20Existe%20Vida%20A%C3%AD%2Cas%20mais%20ouvidas%20Outubro%202021.mp3",
  },
  {
    name: "Nathália Braga e Jessé Aguiar As Melhores Músicas Gospel ",
    artist: "Nathália Braga e Jessé Aguiar",
    image: "https://i.ytimg.com/vi/ffews_h4m_g/maxresdefault.jpg",
    path: "https://ia601503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Nath%C3%A1lia%20Braga%20e%20Jess%C3%A9%20Aguiar%20As%20Melhores%20M%C3%BAsicas%20Gospel%20Mais%20Tocadas%202022%20%5B%5BNOVA%20LISTA%5D%5D.mp3",
  },
  {
    name: "O príncipe dos teclados",
    artist: "Zezo",
    image: "https://www.vagalume.com.br/zezo/discografia/o-principe-dos-teclados-ao-vivo-vol-8.jpg",
    path: "https://ia801503.us.archive.org/0/items/poesia-acu-stica-1-2-3-4-5-6-7-8-9-10-11-12-e-13-com-letra/Zezo%20%20-%20O%20pr%C3%ADncipe%20dos%20teclados%20-%20Vol.14.mp3",
  },
  {
    name: "LIMÃO COM MEL AS MELHORES",
    artist: "LIMÃO COM MEL ",
    image: "https://i.ytimg.com/vi/YPhQtoCjIKM/maxresdefault.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/DVD%20LIMAO%20COM%20MEL%20COMPLETO.mp3",
  },
  {
    name: " MARI FERNANDEZ - MÚSICAS NOVAS",
    artist: " MARI FERNANDEZ ",
    image: "https://i.ytimg.com/vi/iPUWTXDPWk0/maxresdefault.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/MARI%20FERNANDEZ%20-%20M%C3%9ASICAS%20NOVAS%20%28REPERT%C3%93RIO%20NOVO%20OUTUBRO%202022%29%20MARI%20FERNANDES%202022%20-%20CD%20NOVO%20AO%20VIVO%20%28128%20kbps%29.mp3",
  },
  {
    name: "FORRÓ ROMÂNTICO DAS ANTIGAS",
    artist: "Um moi de gente ",
    image: "https://i.ytimg.com/vi/uLngz5_SaeQ/mqdefault.jpg ",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/_SELE%C3%87%C3%83O%20TOP%20INESQUEC%C3%8DVEL%20-%20FORR%C3%93%20ROM%C3%82NTICO%20DAS%20ANTIGAS%20%28AS%20MELHORES%29.mp3",
  },
  {
    name: "As melhores 2022",
    artist: "Bruno Mars",
    image: "https://i.ytimg.com/vi/DneC8YbqmXA/maxresdefault.jpg",
    path: "https://ia904705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/BrunoMars%20%28%20Best%20Spotify%20Playlist%202022%20%29%20Greatest%20Hits%20-%20Best%20Songs%20Collection%20Full%20Album.mp3",
  },
  {
    name: "Flávio José As 10 Melhores",
    artist: "Flávio José",
    image: "https://i.ytimg.com/vi/_w1w9mcSdl4/maxresdefault.jpg",
    path: "https://ia804705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/Fl%C3%A1vio%20Jos%C3%A9%20As%2010%20Melhores.mp3",
  },
  {
    name: "Álbum O Que Vem Depois",
    artist: "Henrique e Juliano",
    image: "https://www.vagalume.com.br/henrique-e-juliano/discografia/henrique-e-juliano-ao-vivo-em-palmas.jpg",
    path: "https://ia804705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/Henrique%20e%20Juliano%20as%20melhores.mp3",
  },
  {
    name: "Doce 22 - Todas as músicas, playlist",
    artist: "Luísa Sonza",
    image: "https://i.ytimg.com/vi/8x8F8SRiKwg/maxresdefault.jpg",
    path: "https://ia804705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/Lu%C3%ADsa%20Sonza%20%20-%20Doce%2022%20-%20Todas%20as%20m%C3%BAsicas%2C%20playlist..mp3",
  },
  {
    name: "LIVE SERENATA - SÓ MÚSICAS",
    artist: "MARÍLIA MENDONÇA",
    image: "https://i.ytimg.com/vi/JSSqqtWGMiQ/maxresdefault.jpg",
    path: "https://ia904705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/MAR%C3%8DLIA%20MENDON%C3%87A%20-%20LIVE%20SERENATA%20-%20S%C3%93%20M%C3%9ASICAS%20%28128%20kbps%29.mp3",
  },
  {
    name: "Caetano e Maria Gadú | Full Album",
    artist: "Caetano e Maria Gadú",
    image: "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/14/8e/df/148edfe9-895b-8ea9-ad1f-5937bc6bba04/00602527692340.rgb.jpg/1200x1200bf-60.jpg",
    path: "https://ia804705.us.archive.org/2/items/bruno-mars-best-spotify-playlist-2022-greatest-hits-best-songs-collection-full-album/Maria%20Gad%C3%BA%20-%20Maria%20Gad%C3%BA%20%282009%29%20FULL%20ALBUM.mp3",
  },
  {
    name: "Acústico 1Kilo - Deixe-me Ir",
    artist: "Baviera, Knust e Pablo Martins",
    image: "https://i1.sndcdn.com/artworks-000214631455-x06od7-t500x500.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/Ac%C3%BAstico%201Kilo%20-%20Deixe-me%20Ir%20%28Baviera%2C%20Knust%20e%20Pablo%20Martins%29.mp3",
  },
  {
    name: "Me Namora",
    artist: "Natiruts",
    image: "https://i.ytimg.com/vi/j8SU4of8zZY/maxresdefault.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/Natiruts%20-%20%20Me%20Namora%20%28128%20kbps%29.mp3",
  },
  {
    name: "Evidências",
    artist: "chitãozinho & Xororó ",
    image: "https://i.ytimg.com/vi/2H3YQkpde84/hqdefault.jpg",
    path: "https://ia801401.us.archive.org/26/items/pop-rock-nacional-as-melhores-de-rock-nacionais-de-todos-os-tempos-playlist-atualizada-2021/Chit%C3%A3ozinho%20%26%20Xoror%C3%B3%20-%20Evid%C3%AAncias%20%28128%20kbps%29.mp3",
  },
  {
    name: "Resiliência",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia804703.us.archive.org/20/items/05-photoshop/02%20Resili%2B%C2%ACncia.mp3",
  },
  {
    name: "Viver Sem Segredo",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia904703.us.archive.org/20/items/05-photoshop/03%20Viver%20Sem%20Segredo.mp3",
  },
  {
    name: "Algo Íntimo ",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia804703.us.archive.org/20/items/05-photoshop/04%20Algo%20%2B%C3%ACntimo.mp3 ",
  },
  {
    name: "Photoshop ",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://archive.org/download/05-photoshop/05%20Photoshop.mp3 ",
  },
  {
    name: "Nosso Plano ",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://archive.org/download/05-photoshop/06%20Nosso%20Plano.mp3 ",
  },
  {
    name: "Um Grave Romance",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia904703.us.archive.org/20/items/05-photoshop/07%20Um%20Grave%20Romance.mp3",
  },
  {
    name: "Pianista da Rua 6 ",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia804703.us.archive.org/20/items/05-photoshop/08%20Pianista%20da%20Rua%206.mp3",
  },
  {
    name: "Alma de Pipa",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia904703.us.archive.org/20/items/05-photoshop/09%20Alma%20de%20Pipa.mp3 ",
  },
  {
    name: "Conspiração",
    artist: "TRIBO DA PERIFERIA",
    image: "https://images.suamusica.com.br/Fv0lwEd6l5_y37vCFBJufRmyyhY=/500x500/filters:format(webp)/43746484/3082696/cd_cover.png",
    path: "https://ia804703.us.archive.org/20/items/05-photoshop/10%20Conspira%2B%C2%BA%2B%C3%BAo.mp3",
  },
  {
    name: "01 - TAPA NO VENTO",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://ia801407.us.archive.org/2/items/19-piaa-o-de-vida-loka-japaa-ozin/01%20-%20TAPA%20NO%20VENTO%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "02 - BRUNA - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/02%20-%20BRUNA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "03 - PRINCESA - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/03%20-%20PRINCESA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "04 - ACABOU PORQUE - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/04%20-%20ACABOU%20PORQUE%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "05 - AFTER DO SERTÃO - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/05%20-%20AFTER%20DO%20SERTA%C2%A6%C3%A2O%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "06 - SE O BOI VALER - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/06%20-%20SE%20O%20BOI%20VALER%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "07 - MEU BEM - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/07%20-%20MEU%20BEM%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "08 - CACHORRADINHA - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/08%20-%20CACHORRADINHA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "09 - NO BUMBUM DELAS - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/09%20-%20NO%20BUMBUM%20DELAS%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "10 - MALANDRINHA - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/10%20-%20MALANDRINHA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "11 - TOMA CALADINHA - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/11%20-%20TOMA%20CALADINHA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "12 - DIA DO FICO - JAPÃOZIN  ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: " https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/12%20-%20DIA%20DO%20FICO%20-%20JAPA%C2%A6%C3%A2OZIN.mp3",
  },
  {
    name: "13 - LOIRINHA - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/13%20-%20LOIRINHA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "14 - DUDU - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/14%20-%20DUDU%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "15 - PUTARIA NÃO PUTARIA SIM - JAPÃOZIN  ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/15%20-%20PUTARIA%20NA%C2%A6%C3%A2O%20PUTARIA%20SIM%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "16 - FARRA 100 LIMITE - JAPÃOZIN  ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/16%20-%20FARRA%20100%20LIMITE%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "17 - REVOADA NA ROÇA - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/17%20-%20REVOADA%20NA%20ROC%C2%A6%C2%BAA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: " 18 - EX SAFADA - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/18%20-%20EX%20SAFADA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "19 - PIÃO DE VIDA LOKA - JAPÃOZIN ",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/19%20-%20PIA%C2%A6%C3%A2O%20DE%20VIDA%20LOKA%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: "20 - KIKANDO E ME OLHANDO - JAPÃOZIN",
    artist: "Japaozin",
    image: "https://images.suamusica.com.br/blwCSuHaiQPhew3KnPCc-4RXASE=/240x240/filters:format(webp)/1558375/3542861/cd_cover.jpeg",
    path: "https://archive.org/download/19-piaa-o-de-vida-loka-japaa-ozin/20%20-%20KIKANDO%20E%20ME%20OLHANDO%20-%20JAPA%C2%A6%C3%A2OZIN.mp3 ",
  },
  {
    name: " ",
    artist: " ",
    image: " ",
    path: " ",
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


