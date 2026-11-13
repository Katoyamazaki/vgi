/* vgi.ru — Videogames INSIDE. Хэш-роутинг, без History API. */
(function () {
  'use strict';
  var ART = window.VGI_ART || {}, REV = window.VGI_REV || [], ORIG = window.VGI_ORIG || {};
  var ONLINE = 'https://www.perplexity.ai/computer/a/videogames-inside-4-prototip-EvlBhysRS9Wu_rZW3iEhcA';
  var IA = function (n) { return 'https://archive.org/details/videogames_inside_magazine_' + n; };
  var main = document.getElementById('main');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ext = function (url, label) { return '<a href="' + url + '" target="_blank" rel="noopener">' + label + '</a>'; };

  /* ---------- безопасное хранилище ---------- */
  var mem = {};
  var store = { get: function (k) { return mem.hasOwnProperty(k) ? mem[k] : null; }, set: function (k, v) { mem[k] = v; } };
  function toast(t) { var el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('on'); }, 2600); }

  /* ---------- данные ---------- */
  var SCALE = [
    [1, 'Опасно! Лучше не покупать ни под каким предлогом!!!'], [2, 'Не стоит внимания'], [3, 'Очень плохо, но что-то есть'],
    [4, 'Плохо, возможно оценят только фанаты'], [5, 'Середнячок, на любителя'], [6, 'Неплохо, но продукт ещё сыроват'],
    [7, 'Хорошо, хотя есть несколько минусов'], [8, 'Оригинально! Рекомендуем'], [9, 'Отлично! Но всё ещё не шедевр.'], [10, 'Без слов!!! Произведение искусства']
  ];
  var PF = { ocarina: 'ns2', 'phantom-blade-zero': 'ps5', 'gears-e-day': 'xsx', 'modern-warfare-4': 'ps5 · xsx · ns2', castlevania: 'ps5 · xsx · ns', 'silent-hill-townfall': 'ps5', wolverine: 'ps5' };
  REV.forEach(function (r) { r.pf = PF[r.slug] || ''; r.meta = (r.specs.join(' ').match(/metascore <b>(\d+)/) || [])[1] || '—'; r.img = r.imgs[0]; });
  var rv = function (slug) { return REV.filter(function (r) { return r.slug === slug; })[0]; };

  var ARTS = {
    editorial: ['Слово редактора', 'Четвёртый номер', 'img/retro.jpg'],
    news: ['Новости', 'PS5 — 100 млн, просадка Switch 2, предзагрузка GTA VI', 'img/ps5photo.jpg'],
    charts: ['Чарты', 'Лучшие консольные релизы осени по оценкам критиков', 'img/chips.jpg'],
    gta: ['Тема номера', 'Grand Theft Auto VI', 'img/cover.jpg'],
    tetris: ['История', 'Тетрис: 42 года падения', 'img/tetris_open2.jpg'],
    interview: ['Интервью', 'Алексей Пажитнов: «Я играю в „Тетрис“ дольше всех на свете»', 'img/pajitnov.jpg'],
    retro: ['Ретрообзор', 'Три номера и один несбывшийся', 'img/gameboy2.jpg'],
    opinion: ['Мнения', 'Зачем сегодня консольный журнал', 'img/allps.jpg'],
    sources: ['Источники', 'Все цифры номера — со ссылками', 'img/e60.jpg']
  };

  var ISSUES = [
    { n: 1, date: 'Сентябрь 2004', img: 'img/vgi1.jpg', lead: 'Первый номер сделан в офисе компании JapZap.',
      toc: 'Новости · Чарты · Мобильные игры: новинки · Консоли · Система рейтингов · В ожидании · Обзоры · Платина · На ринге · Special · N-Gage Special · Мобильные игры: обзоры · Подписка · Ретроспект · Ретро галерея · Ракурс · Штучки · Медиа · Lifestyle · Конкурсы, анонсы · В следующем номере',
      games: 'Ace Combat 5: The Unsung War, Aliens Unleashed, Astral X, Biohazard: The Stories, Boulder Dash — M.E, Bujingai: The Forsaken City, Castlevania: Aria of Sorrow, Chronicles of Riddick, Conker Live and Reloaded, Death by Degrees, DRIV3R, Final Fantasy VII: Before Crisis, Fire Emblem, GT 4: Prologue, Gunstar Heroes, Harry Potter and the Prisoner of Azkaban, Katamari Damacy, Kingdom Hearts 2, Metal Gear Solid 3: Snake Eater, Metal Gear Solid: The Twin Snakes, Midnight Club 3: DUB Edition, Monster Hunter, Naruto: Narutimate Hero, Ninja Gaiden, Onimusha 3: Demon Siege, Pandemonium, Prince of Persia: The Sands of Time, Project Gotham Racing 2, Propeller Arena, Rayman 3, Ridge Racer V, Rogue Squadron III: Rebel Strike, Shrek 2, Spider-Man 2, Splinter Cell: Pandora Tomorrow, Street Racing Syndicate, Tomb Raider, Van Helsing' },
    { n: 2, date: 'Октябрь–ноябрь 2004', img: 'img/vgi2.jpg', lead: 'Тема номера — Full Spectrum Warrior. В разделе «События» — BMX-фестиваль «Рубильник» и Videogames-марафон.',
      toc: 'Новости · Весточки из Японии · Чарты · Конкурсы · Игры, в которые играет команда INSIDE · События: BMX-фестиваль «Рубильник», Videogames-марафон, Moscow Fighting Association · Обозреваемые консоли · В ожидании · Тема номера: Full Spectrum Warrior · Обзоры · Платина · Мнения · Special Review · N-Gage Special · Мобильные игры · Ретробзор · Ракурс: EyeToy · Штучки · Anime · Редакционная подписка · В следующем номере',
      games: 'Alien 3, Athens 2004, Baten Kaitos: Eternal Wings, Battle Gear 3, Blood Will Tell, Crimson Sea 2, Devil May Cry 3, Disgaea, Driv3r, Fatal Force: Earth Assault, FIFA Soccer 2004, Full Spectrum Warrior, Golden Sun: The Lost Age, Grand Theft Auto: San Andreas, Juiced, Killer 7, Metroid Prime 2: Echoes, Midnight Club II, Need for Speed Underground 2, Pitfall: The Lost Expedition, Predator: Concrete Jungle, Psi-Ops: The Mindgate Conspiracy, Psyvariar 2, Red Dead Revolver, Second Sight, Silent Hill 4: The Room, Sonic Advance 3, Spider-Man 2, Sudeki, Virtua Quest, Xenosaga Episode II, Ys VI: The Ark of Napishtim' },
    { n: 3, date: 'Декабрь 2004', img: 'img/vgi3.jpg', lead: 'На обложке — Halo 2. Последний номер, вышедший в печать.', toc: '', games: '' },
    { n: 4, date: 'Ноябрь 2026', img: 'img/vgi4.jpg', lead: 'Номер, отменённый в январе 2005 года, — выпущенный заново. GTA VI, платина Ocarina of Time, семь обзоров осени, история «Тетриса».', toc: '', games: 'Grand Theft Auto VI, The Legend of Zelda: Ocarina of Time, Phantom Blade Zero, Gears of War: E-Day, Call of Duty: Modern Warfare 4, Castlevania: Belmont\'s Curse, Silent Hill: Townfall, Marvel\'s Wolverine, Xenoblade Chronicles 3, Monster Hunter Wilds, Attack on Titan 3' }
  ];

  var CONSOLES = [
    { id: 'ps2', key: 'ps2', name: 'PlayStation 2', img: 'img/c_ps2.jpg', file: 'PS2-Fat-Console-Set.jpg' },
    { id: 'xbox', key: 'xbox', name: 'Xbox', img: 'img/c_xbox.jpg', file: 'Xbox-console.jpg' },
    { id: 'gamecube', key: 'gcube', name: 'GameCube', img: 'img/c_gcube.jpg', file: 'GameCube-Set.jpg' },
    { id: 'gba', key: 'gba', name: 'Game Boy Advance', img: 'img/c_gba.jpg', file: 'Nintendo-Game-Boy-Advance-Purple-FL.jpg' },
    { id: 'n-gage', key: 'ngage', name: 'N-Gage', img: 'img/c_ngage.jpg', file: 'Nokia-NGage-LL.jpg' },
    { id: 'psone', key: 'psone', name: 'PSone', img: 'img/c_psone.jpg', file: 'PSone-Console-Set-NoLCD.jpg' },
    { id: 'dreamcast', key: 'dream', name: 'Dreamcast', img: 'img/c_dream.jpg', file: 'Dreamcast-Console-Set.jpg' }
  ];

  var PLATFORMS = {
    ps5: { name: 'PlayStation 5', img: 'img/ps5photo.jpg', lead: 'Продажи PlayStation 5 превысили 100 миллионов консолей — через шесть лет после запуска в ноябре 2020 года.',
      src: ext('https://turbo.gadgets360.com/en/games/ps5-100-million-units-sold-sony-playstation-gta-6-12315733', 'Gadgets 360'),
      re: /ps5/, soon: ['19 ноя — Grand Theft Auto VI', '24 ноя — Gothic 3 Classic', '10 дек — Attack on Titan 3', '11 дек — Path of Exile 2 1.0'] },
    xbox: { name: 'Xbox Series', img: 'img/war.jpg', lead: 'Gears of War: E-Day вернул серии страх и тесные коридоры. GTA VI выходит 19 ноября на Xbox Series X|S, а владельцам Xbox One предложат облачный запуск.',
      src: ext('https://cpscount.com/news/', 'CPS Count') + ', ' + ext('https://www.pcworld.com/article/3276995/gta-6-pre-load-starts-next-week-heres-what-to-do-before-then.html', 'PCWorld'),
      re: /xsx/, soon: ['19 ноя — Grand Theft Auto VI', '24 ноя — Gothic 3 Classic', '11 дек — Path of Exile 2 1.0'] },
    switch2: { name: 'Nintendo Switch 2', img: 'img/hyrule.jpg', lead: 'Общие продажи Switch 2 превысили 26 миллионов, хотя за июль–сентябрь продано 2,67 млн консолей — на 41% меньше, чем годом ранее.',
      src: ext('https://www.animenewsnetwork.com/news/2026-11-05/nintendo-switch-2-sells-over-26-million-units/.243567', 'Anime News Network') + ', ' + ext('https://www.cnbc.com/2026/11/05/nintendo-earnings-switch-2-sales.html', 'CNBC'),
      re: /ns2|ns\b/, soon: ['24 ноя — Gothic 3 Classic', '03 дек — Xenoblade Chronicles 3', '04 дек — Monster Hunter Wilds', '10 дек — Professor Layton and the New World of Steam'] }
  };

  /* ---------- шаблоны ---------- */
  function page(title, crumbs, body) {
    var c = crumbs ? '<span class="crumbs">' + crumbs + '</span>' : '';
    return '<div class="ph"><h1 class="txt_header">' + title + '</h1>' + c + '</div><div class="pg">' + body + '</div>';
  }
  function tile(href, img, kicker, title, sc) {
    var s = sc ? '<span class="sc' + (sc == 10 ? ' p' : '') + '">' + sc + '</span>' : '';
    return '<a class="tile" href="' + href + '"><img src="' + img + '" alt="" loading="lazy"><span class="t">' + s + '<small>' + kicker + '</small><b>' + title + '</b></span></a>';
  }
  function bars(rows, max) {
    return '<div class="bars">' + rows.map(function (r) { return '<div class="bar"><span>' + r[0] + '</span><span><i style="width:' + (r[1] / (max || 100) * 100) + '%"></i></span><b>' + r[1] + '%</b></div>'; }).join('') + '</div>';
  }
  function scoreRows(list) {
    return list.map(function (r) {
      return '<tr class="' + (r.score == 10 ? 'plat' : '') + '"><td class="sc">' + r.score + '</td><td><a href="#/review/' + r.slug + '">' + esc(r.title) + '</a></td><td class="pf">' + r.pf + '</td><td class="mt">' + r.meta + '</td></tr>';
    }).join('');
  }
  function daysTo() { var d = Math.ceil((new Date('2026-11-19T00:00:00+03:00') - new Date()) / 864e5); return d; }
  function plural(n, a, b, c) { n = Math.abs(n) % 100; var m = n % 10; return (n > 10 && n < 20) ? c : m > 1 && m < 5 ? b : m === 1 ? a : c; }

  /* ---------- страницы ---------- */
  var FEAT = [
    { href: '#/retro', img: 'img/c_ps2.jpg', t: 'Консоли: детали и особенности', d: 'PlayStation 2, Xbox, GameCube, GBA, N-Gage, PSone и Dreamcast — характеристики из архива vgi.ru 2004 года.', fit: 'contain' },
    { href: '#/gta', img: 'img/cover.jpg', t: 'Тема номера: Grand Theft Auto VI', d: 'Леонида, Джейсон и Лусия, 212 ГБ предзагрузки и полночный старт 19 ноября.' },
    { href: '#/review/ocarina', img: 'img/hyrule.jpg', t: 'Платина: Ocarina of Time', d: 'Андрей Хандожко о ремейке, который побил рекорды Metacritic. Оценка — 10.' },
    { href: '#/read/tetris', img: 'img/tetris_open2.jpg', t: 'История: Тетрис, 42 года падения', d: 'От «Электроники-60» в ВЦ Академии наук до смешанной реальности.' }
  ];
  var featTimer;
  function home() {
    var d = daysTo();
    var h = '<div class="home-top">' +
      '<div class="cov"><a href="#/last" class="plain"><img src="img/vgi4.jpg" alt="Обложка Videogames INSIDE #4, ноябрь 2026" width="225" height="296"></a>' +
      '<div class="cov-tab"><a href="#/subscribe">Подписаться</a><a href="' + ONLINE + '" target="_blank" rel="noopener">Читать #4</a></div></div>' +
      '<div><div class="redbar"><span id="featTitle">' + FEAT[0].t + '</span><a href="#/last">#4 · ноябрь 2026</a></div>' +
      '<a class="feat" id="feat" href="' + FEAT[0].href + '"><img id="featImg" src="' + FEAT[0].img + '" alt="" style="object-fit:contain;background:#fff"><span class="feat-cap"><b id="featCap">' + FEAT[0].t + '</b></span>' +
      '<span class="feat-dots">' + FEAT.map(function (f, i) { return '<button type="button" data-i="' + i + '" aria-label="' + esc(f.t) + '"' + (i ? '' : ' class="on"') + '></button>'; }).join('') + '</span></a>' +
      '<div class="feat-txt" id="featTxt">' + FEAT[0].d + '</div></div></div>' +
      '<div class="home-mid"><div class="innum"><h3>В номере</h3>' +
      '<a href="#/announce"><b>В ожидании:</b> GTA VI, Gothic 3 Classic, Xenoblade Chronicles 3, Monster Hunter Wilds…</a>' +
      '<a href="#/reviews"><b>Обзоры:</b> Ocarina of Time, Phantom Blade Zero, Gears of War: E-Day, Modern Warfare 4, Castlevania, Silent Hill: Townfall, Wolverine…</a>' +
      '<a href="#/last"><b>а также:</b> Новости, Чарты, История «Тетриса», Интервью с Пажитновым, Ретрообзор, Мнения…</a>' +
      '<h3>До GTA VI</h3><a href="#/gta">' + (d > 0 ? d + ' ' + plural(d, 'день', 'дня', 'дней') + ' — релиз 19 ноября 2026' : 'GTA VI уже вышла — полный обзор в #5') + '</a></div>' +
      '<div class="about"><span class="logo2" aria-hidden="true"><span>videogames</span><span>INSIDE</span></span>' +
      '<p>Videogames INSIDE — российский журнал с английским названием.</p>' +
      '<p>Это название отражает главную идею издания — обзор видеоигр, как если бы мы были внутри них самих. Видеоигры изнутри.</p>' +
      '<p class="pron"><b>Как произносить Videogames INSIDE?</b><br>[видеогеймз инсайд] — [\'vidi u \'geimz \'in\'said]</p></div></div>' +
      '<div class="verd"><div class="redbar"><span>Вердикты номера</span><a href="#/verdicts">Шкала INSIDE</a></div>' +
      '<table><tbody>' + scoreRows(REV) + '</tbody></table></div>';
    main.innerHTML = h;
    var i = 0;
    function show(k) {
      i = k; var f = FEAT[k];
      $('#feat').href = f.href; $('#featImg').src = f.img; $('#featImg').style.objectFit = f.fit || 'cover';
      $('#featImg').style.background = f.fit ? '#fff' : '';
      $('#featTitle').textContent = k ? 'Videogames INSIDE #4' : f.t; $('#featCap').textContent = f.t; $('#featTxt').textContent = f.d;
      [].forEach.call(document.querySelectorAll('.feat-dots button'), function (b, j) { b.classList.toggle('on', j === k); });
    }
    [].forEach.call(document.querySelectorAll('.feat-dots button'), function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); show(+b.dataset.i); restart(); });
    });
    function restart() { clearInterval(featTimer); featTimer = setInterval(function () { if (!$('#feat')) return clearInterval(featTimer); show((i + 1) % FEAT.length); }, 5500); }
    restart();
  }

  function magazine() {
    var b = '<div class="sub-nav"><a href="#/magazine">О журнале</a><a href="#/last">Свежий номер</a><a href="#/archives">Архив</a><a href="#/verdicts">Система рейтингов</a></div>' +
      '<h3 class="sq">Миссия</h3><p>— Удовлетворение потребности людей, которые играют в видеоигры, в получении издания, делающего обзоры игр только для домашних и портативных игровых консолей и мобильных платформ.</p><p>— Предоставление полноценной информации об индустрии видеоигр на страницах журнала, тематических приложений к журналу и на электронных приложениях.</p><p>— Помощь развитию рынка игровых консолей в России и странах ближнего зарубежья.</p>' +
      '<h3 class="sq">Как создаётся</h3><p>Сегодня аудитория влияет не только на содержание и внешний вид журнала, но и определяет его будущее. Мы создаём максимально удобный для чтения журнал и дополняем его печатными и электронными приложениями. Таким образом, мы предугадываем растущие потребности читателей в получении информации о видеоиграх.</p>' +
      '<h3 class="sq">Insiders</h3><p>Videogames INSIDE — коллектив единомышленников. Мы отлично разбираемся в тенденциях развития видеоигр и ориентируемся в игровой индустрии в целом. У нас большая игровая практика и журналистский опыт, которые позволяют создавать развёрнутые рецензии на современные игры и на ретро-классику.</p>' +
      '<h3 class="sq">Ценности</h3><p><b>Мы сами играем!</b> Мы — игроки и поддерживаем игроков. Только игрок может донести до других игроков идею, содержание и переживаемые эмоции во время игры.</p>' +
      '<p><b>Авторитетность.</b> Мы заботимся о своевременности, достоверности и доступности информации. Официальная поддержка мировых издателей видеоигр открывает для нас возможность получать информацию из первых рук.</p>' +
      '<p><b>Новаторство.</b> Videogames INSIDE — единственный в России и ближнем зарубежье журнал, который описывает игры только для игровых консолей. Статьи в нашем издании воплощают инновационный подход к подаче материалов: глубокий анализ с подробным описанием каждой игры, обзор видеоигр вне зависимости от регионов, для которых они издаются.</p>' +
      '<p><b>Вдохновение.</b> Создание журнала о видеоиграх — отличное сочетание двух сторон нашей жизни: работы и развлечений. Мы работаем вдохновенно, поэтому стараемся передать своё настроение коллегам и читателям.</p>' +
      '<p><b>Открытость.</b> Мы открыты для всех. Обратная связь с читателем — неотъемлемый элемент нашей деятельности. Ваши свежие идеи и взгляды дадут возможность совершенствовать журнал.</p>' +
      '<h3 class="sq">Портрет читателя</h3><p>Молодые люди, которые ведут активный образ жизни, с разносторонними интересами и увлечениями, интересуются последними технологическими новинками. Для наших читателей компьютерная, аудио- и видеотехника — непременные составляющие образа жизни.</p>' +
      '<p class="note">Статистика ниже — данные vgi.ru 2004 года.</p>' +
      '<table class="tbl"><thead><tr><th>Возраст</th><th class="num"></th></tr></thead><tbody><tr><td>Общий охват аудитории</td><td class="num">12–35 лет</td></tr><tr><td>Целевая аудитория</td><td class="num">18–25 лет</td></tr><tr><td>Средний возраст читателя</td><td class="num">21 год</td></tr></tbody></table>' +
      '<div class="stat-grid"><div><h3>Социальный статус</h3>' + bars([['Студенты', 32], ['Ученики', 22], ['Служащие', 17], ['Предприниматели', 12], ['Прочие', 10], ['Руководители', 7]], 40) +
      '<h3>Играют на консолях*</h3>' + bars([['PlayStation 2', 26], ['Другие', 19], ['Xbox', 16], ['PS One', 15], ['Dreamcast', 13], ['GameCube', 11]], 40) + '<p class="foot-note">* без учёта портативных консолей и владения двумя или более системами</p></div>' +
      '<div><h3>Откуда получают информацию</h3>' + bars([['Интернет', 48], ['Печатная продукция', 36], ['Друзья', 11], ['Другое', 5]], 60) +
      '<h3>Тратят на игры в месяц</h3>' + bars([['до 50$', 21], ['50–100$', 45], ['100–300$', 16], ['свыше 300$', 8]], 60) + '<p>В среднем покупают игр в месяц — <b>5</b></p></div></div>';
    main.innerHTML = page('Журнал', '<a href="#/">Главная</a> / Журнал', b);
  }

  function last() {
    var b = '<div class="issue"><a class="plain" href="' + ONLINE + '" target="_blank" rel="noopener"><img src="img/vgi4.jpg" alt="Обложка Videogames INSIDE #4"></a><div>' +
      '<h2 style="margin-top:0">Videogames INSIDE #4 · ноябрь 2026</h2><p>36 полос. ' + ISSUES[3].lead + '</p>' +
      '<p><a class="btn" href="' + ONLINE + '" target="_blank" rel="noopener">Читать онлайн</a> <a class="btn g" href="#/subscribe">Подписаться</a></p>' +
      '<h3>Индекс игр в номере</h3><p>' + ISSUES[3].games + '</p></div></div>' +
      '<h3 class="sq">Содержание</h3><div class="tiles">' +
      tile('#/read/editorial', 'img/retro.jpg', '02 · слово редактора', 'Четвёртый номер') +
      tile('#/read/news', 'img/ps5photo.jpg', '04 · новости', 'PS5 — 100 млн, просадка Switch 2') +
      tile('#/read/charts', 'img/chips.jpg', '06 · чарты', 'Осень-2026: консольный топ') +
      tile('#/announce', 'img/gothic.jpg', '07 · в ожидании', 'Что выходит до конца года') +
      tile('#/gta', 'img/cover.jpg', '08 · тема номера', 'Grand Theft Auto VI') +
      tile('#/review/ocarina', 'img/hyrule.jpg', '10 · платина', 'Ocarina of Time', 10) +
      tile('#/reviews', 'img/blade.jpg', '12 · обзоры', 'Шесть игр осени') +
      tile('#/verdicts', 'img/claws.jpg', '24 · вердикты', 'Оценки и команда номера') +
      tile('#/read/tetris', 'img/tetris_open2.jpg', '26 · история', 'Тетрис: 42 года падения') +
      tile('#/read/interview', 'img/pajitnov.jpg', '32 · интервью', 'Алексей Пажитнов') +
      tile('#/read/retro', 'img/gameboy2.jpg', '34 · ретрообзор', 'Три номера и один несбывшийся') +
      tile('#/read/opinion', 'img/allps.jpg', '35 · мнения', 'Зачем сегодня консольный журнал') +
      '</div><p class="foot-note">Все цифры номера — со ссылками в разделе <a href="#/read/sources">«Источники»</a>.</p>';
    main.innerHTML = page('Свежий номер', '<a href="#/magazine">Журнал</a> / #4', b);
  }

  function article(key) {
    var a = ARTS[key];
    if (!a || !ART[key]) return notFound();
    var keys = ['editorial', 'news', 'charts', 'gta', 'tetris', 'interview', 'retro', 'opinion', 'sources'];
    var i = keys.indexOf(key), prev = keys[i - 1], next = keys[i + 1];
    var nav = '<div class="rv-nav">' + (prev ? '<a class="btn g" href="#/' + (prev === 'gta' ? 'gta' : 'read/' + prev) + '">← ' + ARTS[prev][0] + '</a>' : '<span></span>') +
      (next ? '<a class="btn g" href="#/' + (next === 'gta' ? 'gta' : 'read/' + next) + '">' + ARTS[next][0] + ' →</a>' : '') + '</div>';
    main.innerHTML = page(a[0], '<a href="#/last">Свежий номер</a> / ' + a[0], '<div class="art">' + ART[key] + '</div>' + nav);
  }

  function reviews() {
    var b = '<p>Семь игр осени-2026 в стиле авторов Videogames INSIDE 2004 года. Оценки — по <a href="#/verdicts">шкале INSIDE</a>, рядом — средний балл критиков Metacritic.</p><div class="tiles">' +
      REV.map(function (r) { return tile('#/review/' + r.slug, r.img, r.pf + ' · ' + r.author, esc(r.title), r.score); }).join('') + '</div>' +
      '<p class="foot-note">* Подписи авторов — стилизация: тексты написаны в манере команды INSIDE 2004 года, а не самими авторами.</p>';
    main.innerHTML = page('Обзоры номера', '<a href="#/last">Свежий номер</a> / Обзоры', b);
  }

  function review(slug) {
    var r = rv(slug); if (!r) return notFound();
    var i = REV.indexOf(r), prev = REV[i - 1], next = REV[i + 1];
    var imgs = r.imgs.slice(1).map(function (s) { return '<img src="' + s + '" alt="" loading="lazy">'; }).join('');
    var b = '<div class="rv-hero"><img src="' + r.img + '" alt="' + esc(r.title) + '"><div class="rv-score' + (r.score == 10 ? ' p' : '') + '">' + r.score + '<small>INSIDE</small></div></div>' +
      '<div class="art"><span class="kicker">' + (r.score == 10 ? 'Платина · обзор' : 'Обзор') + ' · с. ' + r.page + '</span><h2>' + esc(r.title) + '</h2><p class="dek">' + esc(r.dek) + '</p>' +
      '<div class="byline"><img src="' + r.av + '" alt=""><div><b>Текст: ' + esc(r.author) + '*</b><small>' + esc(r.avc) + '</small></div></div>' +
      '<div class="specs">' + r.specs.join('') + '</div>' + r.body.join('') + imgs +
      '<div class="proscons"><div><h4>Плюсы</h4><ul>' + r.pros.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div><div><h4>Минусы</h4><ul>' + r.cons.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></div>' +
      '<div class="verdict"><div><div class="lab">Вердикт · ' + esc(r.scorelabel) + '</div><p style="margin:4px 0 0">' + esc(r.verdict) + '</p><small style="color:#5F5F5F">' + esc(r.viol) + '</small></div><div class="big">' + r.score + '</div></div>' +
      '<p class="foot-note">' + r.src + '</p><p class="foot-note">* Подпись — стилизация под автора Videogames INSIDE 2004 года.</p></div>' +
      '<div class="rv-nav">' + (prev ? '<a class="btn g" href="#/review/' + prev.slug + '">← ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a class="btn g" href="#/review/' + next.slug + '">' + esc(next.title) + ' →</a>' : '<a class="btn g" href="#/verdicts">Все вердикты →</a>') + '</div>';
    main.innerHTML = page('Обзоры', '<a href="#/reviews">Обзоры</a> / ' + esc(r.title), b);
  }

  function verdicts() {
    var b = '<h3 class="sq">Семь игр — семь вердиктов</h3><table class="tbl"><thead><tr><th>INSIDE</th><th>Игра</th><th>Платформа</th><th>Автор*</th><th class="num">Meta</th></tr></thead><tbody>' +
      REV.map(function (r) { return '<tr><td><b' + (r.score == 10 ? ' style="color:#f00"' : '') + '>' + r.score + '</b></td><td><a href="#/review/' + r.slug + '">' + esc(r.title) + '</a></td><td>' + r.pf + '</td><td>' + esc(r.author) + '</td><td class="num">' + r.meta + '</td></tr>'; }).join('') +
      '</tbody></table><h3 class="sq">Система рейтингов Videogames INSIDE</h3><p>Шкала из номера #1 (2004). Отдельно указывается уровень насилия: 0 — нет, 1 — слабый, 2 — сильный.</p><table class="tbl"><tbody>' +
      SCALE.slice().reverse().map(function (s) { return '<tr><td style="width:40px"><b>' + s[0] + '</b></td><td>' + s[1] + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<h3 class="sq">Команда номера</h3><div class="people">' + REV.map(function (r) { return '<a class="person plain" href="#/review/' + r.slug + '"><img src="' + r.av + '" alt=""><div><small>' + esc(r.avc) + '</small><b>' + esc(r.author) + '*</b>' + esc(r.title) + '</div></a>'; }).join('') + '</div>' +
      '<p class="foot-note">* Подписи — стилизация под авторов 2004 года.</p>';
    main.innerHTML = page('Вердикты номера', '<a href="#/last">Свежий номер</a> / Вердикты', b);
  }

  function nextIssue() {
    var opts = ['Полный обзор GTA VI', 'Итоги года', 'Что купить на Switch 2 к праздникам', 'Monster Hunter Wilds и Xenoblade 3 на Switch 2', 'Ретрообзор: Ocarina of Time 1998', 'Почта INSIDE'];
    var b = '<p class="note"><b>#5 · декабрь 2026.</b> Выход — в середине декабря.</p><h3 class="sq">В следующем номере</h3><ul>' + opts.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul>' +
      '<h3 class="sq">Что ждёте больше всего?</h3><div class="poll" id="poll"></div><p class="foot-note">Голос учитывается до перезагрузки страницы.</p>';
    main.innerHTML = page('В следующем номере', '<a href="#/magazine">Журнал</a> / #5', b);
    var base = [41, 23, 14, 9, 8, 5];
    function draw() {
      var v = store.get('poll'), counts = base.slice(); if (v != null) counts[v] += 1;
      var tot = counts.reduce(function (a, b) { return a + b; }, 0);
      $('#poll').innerHTML = opts.map(function (o, i) { var p = Math.round(counts[i] / tot * 100); return '<button type="button" data-i="' + i + '" aria-pressed="' + (v === i) + '">' + (v != null ? '<i style="width:' + p + '%"></i><em>' + p + '%</em>' : '') + '<span>' + (v === i ? '■ ' : '') + o + '</span></button>'; }).join('');
      [].forEach.call($('#poll').querySelectorAll('button'), function (b) { b.onclick = function () { store.set('poll', +b.dataset.i); draw(); toast('Спасибо, голос учтён'); }; });
    }
    draw();
  }

  function buy() {
    var shops = [
      ['Сеть специализированных магазинов GAMEPARK', 'ст. м. Багратионовская, ул. Барклая, д. 8: ТЦ «Ля-Ля-Парк», ТЦ «Горбушка», ТЦ «Горбушкин Двор»', 'Пн–Вс 10:00–21:00'],
      ['Фирменный магазин Sony', 'ст. м. Лубянка, Театральная, Площадь Революции, ул. Никольская, д. 8', 'Пн–Вс 10:00–18:00'],
      ['«Видеоигры»', 'ст. м. Кузнецкий мост, ул. Рождественка, д. 6/9, стр. 1', 'Пн–Вс 10:00–20:00'],
      ['Game100', 'Ленинградский проспект, ст. м. Динамо, павильон №9', 'Пн–Вс 11:00–00:00'],
      ['Eplay', 'ул. Новый Арбат, универмаг «Новоарбатский», ст. м. Смоленская, Арбатская', ''],
      ['«Попугай Той»', 'ст. м. Курская, ул. Земляной вал, вл. 33, ТК «Атриум», 3 этаж', ''],
      ['«Денди»', 'ст. м. Улица 1905 года, ул. Красная Пресня, д. 34', ''],
      ['«СИМ маркет»', 'ул. Профсоюзная, д. 56, ТЦ «Черёмушки», павильон 1-В-08', ''],
      ['Магазины «СОЮЗ»', 'Ленинский проспект, д. 11; ЦУМ, 5 этаж; ГУМ, 3 этаж; ТЦ «МЕГА» Тёплый Стан и ещё более 30 точек в Москве и Санкт-Петербурге', ''],
      ['Сеть магазинов «Видеоленд»', '16 магазинов в Москве, Зеленограде, Люберцах, Долгопрудном и Волгограде', 'Пн–Вс 10:00–22:00'],
      ['Интернет-центры ВИК@web, NetLand, Cafemax', 'ул. 1-я Останкинская, 57; Центральный Детский Мир, 4 этаж; ул. Пятницкая, д. 25 и др.', 'круглосуточно'],
      ['Сеть книжных магазинов «Букбери»', 'ТК «МЕГА», Никитский бульвар, д. 17/1, Ленинградский проспект, 62А', ''],
      ['Киоски на вокзалах', 'Ярославский, Ленинградский, Павелецкий, Казанский, Курский вокзалы и станции Голицыно, Одинцово, Тушино, Павшино, Фабричная', ''],
      ['Интернет-магазин ОЗОН', 'www.ozon.ru — доставка по всему миру, любая форма оплаты', '']
    ];
    var b = '<h3 class="sq">Номер #4, 2026</h3><p>Свежий номер доступен онлайн целиком: 36 полос, все обзоры и источники.</p><p><a class="btn" href="' + ONLINE + '" target="_blank" rel="noopener">Читать #4 онлайн</a> <a class="btn g" href="#/subscribe">Оформить подписку</a></p>' +
      '<h3 class="sq">Номера 2004 года</h3><p>Сканы #1–#3 хранятся в Internet Archive: ' + ext(IA(1), '#1') + ', ' + ext(IA(2), '#2') + ', ' + ext(IA(3), '#3') + '.</p>' +
      '<p class="note">Ниже — точки продаж из раздела «Где купить» vgi.ru 2004 года. Список сохранён как часть истории журнала: многих магазинов уже нет.</p>' +
      '<table class="tbl"><thead><tr><th>Магазин</th><th>Адрес (Москва, 2004)</th><th>Часы</th></tr></thead><tbody>' + shops.map(function (s) { return '<tr><td><b>' + s[0] + '</b></td><td>' + s[1] + '</td><td>' + s[2] + '</td></tr>'; }).join('') + '</tbody></table>';
    main.innerHTML = page('Где купить', '<a href="#/magazine">Журнал</a> / Где купить', b);
  }

  function subscribe() {
    var saved = store.get('sub');
    var form = '<form class="form" id="subForm" novalidate>' +
      '<label>Имя<input name="name" required autocomplete="name" value="' + esc(saved ? saved.name : '') + '"></label>' +
      '<label>E-mail<input name="email" type="email" required autocomplete="email" value="' + esc(saved ? saved.email : '') + '"></label>' +
      '<label>Период<select name="period"><option value="3">3 месяца</option><option value="6">6 месяцев</option><option value="9">9 месяцев</option><option value="12" selected>12 месяцев</option></select></label>' +
      '<label class="chk"><input type="checkbox" name="pdf" checked> PDF-версия на почту</label>' +
      '<label class="chk"><input type="checkbox" name="news" checked> Информационная рассылка по электронной почте</label>' +
      '<div id="subErr" style="color:#f00;font-size:11px"></div><button class="btn" type="submit">Подписаться</button></form>';
    var done = saved ? '<div class="ok" id="subOk">Заявка на подписку принята: <b>' + esc(saved.name) + '</b>, ' + esc(saved.email) + ', ' + saved.period + ' мес. <button type="button" class="btn g" id="subReset" style="margin-left:8px">Изменить</button></div>' : '';
    var b = '<div class="sub-nav"><a href="#/subscribe" data-jump="ed">Подписка через редакцию</a><a href="#/subscribe" data-jump="post">Подписка на почте</a><a href="#/subscribe" data-jump="spec">Особые условия</a><a href="#/subscribe" data-jump="cont">Контакты</a></div>' +
      '<h3 class="sq">Подписка на 2027 год</h3><p>Оформите заявку — номера будут приходить вам каждый месяц.</p>' +
      '<p class="note">Демонстрационная форма: данные никуда не отправляются и хранятся только до перезагрузки страницы.</p>' + (done || form) +
      '<h3 class="sq" id="ed">Подписка через редакцию</h3><p class="note">Условия ниже приведены по vgi.ru 2004 года.</p>' +
      '<table class="tbl"><tbody><tr><td>Когда можно подписаться</td><td>Подписная кампания — постоянно</td></tr><tr><td>Период действия</td><td>3, 6, 9, 12 месяцев</td></tr><tr><td>Условия доставки</td><td>Журнал доставляется курьером в Москве и заказной почтовой бандеролью в регионах. Стоимость редакционной подписки включает в себя расходы на доставку.</td></tr><tr><td>География</td><td>Подписка через редакцию организована для жителей России</td></tr></tbody></table>' +
      '<p><b>Для физических лиц.</b> Оплатите подписку по квитанции в любом коммерческом банке. Отправьте подписной купон и квитанцию об оплате в редакцию по почте.</p>' +
      '<p><b>Для юридических лиц.</b> Отправьте подписной купон по факсу или по адресу subscribe@vgi.ru, сопроводив вашими полными банковскими реквизитами. Отправьте по факсу копию платёжного поручения.</p>' +
      '<p>Бонусы для подписчиков — скидки от подписной цены: 5% от 5 экземпляров; скидки 5% на мероприятиях, организованных редакцией Videogames INSIDE; специальные предложения для корпоративных подписчиков от 10 экземпляров.</p>' +
      '<h3 class="sq" id="post">Подписка через почту</h3><p>В 2004 году подписная кампания на первое полугодие 2005 года проходила с 1 сентября по 15 ноября в регионах России и до 1 декабря в Москве. Подписаться можно было в любом почтовом отделении связи.</p><table class="tbl"><tbody><tr><td>Подписные каталоги</td><td>Роспечать 2005, Моспочтамт 2005</td></tr><tr><td>Подписной индекс</td><td><b>85100</b></td></tr></tbody></table>' +
      '<h3 class="sq" id="spec">Особые условия для всех подписчиков</h3><ul><li>Ежемесячные конкурсы среди подписчиков</li><li>Регулярная информационная рассылка по электронной почте</li></ul>' +
      '<h3 class="sq" id="cont">Контактная информация по подписке</h3><p>Адрес электронной почты: subscribe@vgi.ru. Ответственность за доставку несёт редакция.</p>';
    main.innerHTML = page('Подписка', '<a href="#/magazine">Журнал</a> / Подписка', b);
    [].forEach.call(main.querySelectorAll('[data-jump]'), function (a) { a.onclick = function (e) { e.preventDefault(); var t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth' }); }; });
    var f = $('#subForm');
    if (f) f.onsubmit = function (e) {
      e.preventDefault();
      var name = f.name.value.trim(), email = f.email.value.trim();
      if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { $('#subErr').textContent = 'Укажите имя и корректный e-mail.'; return; }
      store.set('sub', { name: name, email: email, period: f.period.value, pdf: f.pdf.checked });
      toast('Заявка на подписку принята'); subscribe();
    };
    var r = $('#subReset'); if (r) r.onclick = function () { store.set('sub', null); subscribe(); };
  }

  function archives() {
    var b = '<p>Videogames INSIDE выходил с сентября по декабрь 2004 года: три номера. Четвёртый был отменён в январе 2005-го за две недели до печати и выпущен в ноябре 2026-го.</p><div class="tiles c4">' +
      ISSUES.map(function (i) { return tile('#/archive/' + i.n, i.img, i.date, 'Videogames INSIDE #' + i.n); }).join('') + '</div>';
    main.innerHTML = page('Архив', '<a href="#/magazine">Журнал</a> / Архив', b);
  }
  function issue(n) {
    var i = ISSUES[n - 1]; if (!i) return notFound();
    if (n === 4) return last();
    var b = '<div class="issue"><a class="plain" href="' + IA(n) + '" target="_blank" rel="noopener"><img src="' + i.img + '" alt="Обложка Videogames INSIDE #' + n + '"></a><div><h2 style="margin-top:0">#' + n + ', ' + i.date + '</h2><p>' + i.lead + '</p>' +
      '<p><a class="btn" href="' + IA(n) + '" target="_blank" rel="noopener">Скан в Internet Archive</a></p>' +
      (i.toc ? '<h3>Содержание</h3><p>' + i.toc + '</p>' : '<p>Содержание номера — в скане на Internet Archive.</p>') + '</div></div>' +
      (i.games ? '<h3 class="sq">Индекс игр в номере</h3><p>' + i.games + '</p>' : '') +
      '<div class="rv-nav">' + (n > 1 ? '<a class="btn g" href="#/archive/' + (n - 1) + '">← #' + (n - 1) + '</a>' : '<span></span>') + '<a class="btn g" href="#/archive/' + (n + 1) + '">#' + (n + 1) + ' →</a></div>';
    main.innerHTML = page('Архив', '<a href="#/archives">Архив</a> / #' + n, b);
  }

  function announce() {
    var d = daysTo();
    var b = '<p class="note"><b>' + (d > 0 ? 'До релиза GTA VI — ' + d + ' ' + plural(d, 'день', 'дня', 'дней') : 'GTA VI уже в продаже') + '.</b> Даты и платформы — по ' + ext('https://www.gamesradar.com/video-game-release-dates/', 'календарю GamesRadar+') + '.</p>' +
      '<div class="art">' + ART.calendar + '</div>' +
      '<h3 class="sq">События Videogames INSIDE</h3><p>Мероприятия журнала 2004 года — в разделе <a href="#/history">«История»</a>.</p>';
    main.innerHTML = page('Анонсы', '<a href="#/announce">События</a> / Анонсы', b);
  }

  var EVENTS = {
    bmx: ['Фестиваль «Рубильник»', '11 сентября 2004 г.', 'Фестиваль «Рубильник» стал первым крупномасштабным BMX-проектом. Прошедший 11 сентября при спонсорской поддержке журнала Videogames INSIDE, фестиваль собрал под свои знамёна не только любителей экстремального спорта, но также и простых зрителей, желающих поближе ознакомиться с таким явлением, как Bicycle Moto X-treme.'],
    marafon: ['Videogames-марафон', '18 сентября 2004 г.', 'Прошедший 18 сентября в торговом комплексе «Горбушкин двор» Videogames-марафон стал событием номер один для истинных поклонников видеоигр. Многочасовое действие сделало в тот день всех посетителей участниками захватывающего шоу, организованного сетью магазинов GAMEPARK и журналом Videogames INSIDE.']
  };
  function history(id) {
    if (id) {
      var e = EVENTS[id]; if (!e) return notFound();
      main.innerHTML = page('История', '<a href="#/history">История</a> / ' + e[0], '<h2 class="sq">' + e[0] + '</h2><p class="crumbs">' + e[1] + '</p><p>' + e[2] + '</p><p class="foot-note">Репортаж о событии вышел в Videogames INSIDE ' + ext(IA(2), '#2') + '.</p><p><a class="btn g" href="#/history">← Все события</a></p>');
      return;
    }
    var b = '<table class="tbl"><thead><tr><th>Дата</th><th>Событие</th></tr></thead><tbody>' +
      '<tr><td>11 сентября 2004 г.</td><td><a href="#/history/bmx">Фестиваль «Рубильник»</a></td></tr>' +
      '<tr><td>18 сентября 2004 г.</td><td><a href="#/history/marafon">Videogames-марафон</a></td></tr>' +
      '<tr><td>январь 2005 г.</td><td>Номер #4 отменён за две недели до печати</td></tr>' +
      '<tr><td>ноябрь 2026 г.</td><td><a href="#/last">Выходит Videogames INSIDE #4</a></td></tr></tbody></table>' +
      '<h3 class="sq">О журнале</h3><p>Videogames INSIDE запустила SNB Media Group, идея принадлежала Даниелю Деппу. Источниками вдохновения были EDGE, Amiga Power и Retro Gamer. Средний тираж — 15–20 тысяч экземпляров (' + ext('https://dtf.ru/retro/124908-maloizvestnye-igrovye-zhurnaly-i-gazety-nulevyh', 'DTF') + '). Подробнее — в <a href="#/read/retro">ретрообзоре номера #4</a>.</p>';
    main.innerHTML = page('История', '<a href="#/announce">События</a> / История', b);
  }

  function contacts() {
    var b = '<div class="tiles">' +
      '<a class="tile" href="#/editors"><span class="t"><small>контакты</small><b>Редакция</b></span></a>' +
      '<a class="tile" href="#/com"><span class="t"><small>контакты</small><b>Коммерческие службы</b></span></a>' +
      '<a class="tile" href="#/adm"><span class="t"><small>контакты</small><b>Администрация</b></span></a>' +
      '<a class="tile" href="#/vacancies"><span class="t"><small>контакты</small><b>Вакансии</b></span></a></div>' +
      '<h3 class="sq">Написать в редакцию</h3><form class="form" id="mailForm" novalidate><label>Тема<select name="topic"><option>Почта INSIDE</option><option>Вопрос по подписке</option><option>Реклама</option><option>Идея для номера</option></select></label><label>Сообщение<textarea name="msg" rows="4" required></textarea></label><div id="mailErr" style="color:#f00;font-size:11px"></div><button class="btn" type="submit">Отправить</button></form><p class="foot-note">Демонстрационная форма: письмо никуда не отправляется.</p>';
    main.innerHTML = page('Контакты', 'Контакты', b);
    var f = $('#mailForm');
    f.onsubmit = function (e) { e.preventDefault(); if (!f.msg.value.trim()) { $('#mailErr').textContent = 'Напишите сообщение.'; return; } var l = store.get('mail') || []; l.push({ t: f.topic.value, m: f.msg.value.trim() }); store.set('mail', l); f.reset(); $('#mailErr').textContent = ''; toast('Письмо сохранено. Спасибо'); };
  }

  function editors() {
    var people = REV.map(function (r) { return '<div class="person"><img src="' + r.av + '" alt=""><div><small>автор* · ' + esc(r.avc) + '</small><b>' + esc(r.author) + '</b><a href="#/review/' + r.slug + '">' + esc(r.title) + '</a></div></div>'; }).join('');
    var b = '<h3 class="sq">Редакция номера #4, 2026</h3><div class="role">Главный редактор</div><div>Daniel Depp</div>' +
      '<div class="role" style="margin-bottom:6px">Авторы номера</div><div class="people">' + people + '</div>' +
      '<p class="foot-note">* Тексты написаны в манере авторов 2004 года; подписи — стилизация.</p>' +
      '<h3 class="sq">Редакция 2004 года</h3><p class="note">По данным vgi.ru, 2004.</p><div class="role">Главный редактор</div><div>Гамлет Маркарян</div><div class="role">Шеф-редактор</div><div>Даниил Депп</div>';
    main.innerHTML = page('Редакция', '<a href="#/contacts">Контакты</a> / Редакция', b);
  }
  function com() {
    main.innerHTML = page('Коммерческие службы', '<a href="#/contacts">Контакты</a> / Коммерческие службы',
      '<p class="note">По данным vgi.ru, 2004. Телефоны указаны в старом коде Москвы (095).</p>' +
      '<h3 class="sq">Коммерческий отдел</h3><p>Телефон: (095) 257-1990<br>E-mail: ad@snbmedia.ru</p><div class="role">Коммерческий директор</div><div>Марина Вайнер</div><div class="role">Директор по рекламе</div><div>Татьяна Снегур</div>' +
      '<h3 class="sq">Отдел распространения</h3><p>Телефон: (095) 748-19-78</p><div class="role">Директор отдела</div><div>Екатерина Калинина</div>');
  }
  function adm() {
    main.innerHTML = page('Администрация', '<a href="#/contacts">Контакты</a> / Администрация',
      '<p class="note">По данным vgi.ru, 2004.</p><div class="role">Издатель, генеральный директор</div><div>Сергей Бегляров</div><div class="role">Управляющий директор</div><div>Руслан Бекметов</div><div class="role">Финансовый директор</div><div>Александр Коршунов</div><div class="role">Руководитель юридического отдела</div><div>Мария Плешкова</div>' +
      '<h3 class="sq">Адрес</h3><p>Россия, 119071, Москва-71, А/Я 26<br>Телефон: (095) 748-1978<br>Факс: (095) 748-1977<br>E-mail: info@vgi.ru</p>');
  }
  function vacancies() {
    main.innerHTML = page('Вакансии', '<a href="#/contacts">Контакты</a> / Вакансии',
      '<h3 class="sq">Журналист по тематике видеоигр</h3><div class="role">Обязанности</div><p>Написание статей по заказу редакции в оговорённые сроки, присутствие в офисе не требуется.</p>' +
      '<div class="role">Условия</div><p>Наличие портфолио публикаций, чувство стиля, грамотность и многовековой игровой опыт обязательны.</p><p>Умельцам, делающим компиляции из интернет-материалов на заданную тему, цитируя слово в слово чужие труды, просьба не беспокоиться — все материалы проходят предварительную проверку.</p>' +
      '<div class="role">Контакты</div><p>По всем вопросам обращаться по адресу электронной почты vacancy@vgi.ru.</p>');
  }

  function platform(id) {
    var p = PLATFORMS[id]; if (!p) return notFound();
    var list = REV.filter(function (r) { return p.re.test(r.pf); });
    var b = '<div class="issue"><img src="' + p.img + '" alt="' + p.name + '"><div><h2 style="margin-top:0">' + p.name + '</h2><p>' + p.lead + ' (' + p.src + ').</p>' +
      '<h3>Скоро на ' + p.name + '</h3><ul>' + p.soon.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul></div></div>' +
      '<h3 class="sq">Обзоры номера #4</h3>' + (list.length ? '<div class="tiles">' + list.map(function (r) { return tile('#/review/' + r.slug, r.img, r.pf + ' · ' + r.author, esc(r.title), r.score); }).join('') + '</div>' : '<p>Обзоров для этой платформы в номере нет.</p>') +
      (id === 'ps5' || id === 'xbox' ? '<p><a class="btn" href="#/gta">Тема номера: GTA VI</a></p>' : '');
    main.innerHTML = page(p.name, 'Платформы / ' + p.name, b);
  }

  function retro(id) {
    if (!id) {
      var b = '<p>Страницы консолей с vgi.ru 2004 года — характеристики и описания приведены по оригиналу. Это платформы, о которых писал журнал: все консоли шестого поколения, портативные системы и уже ушедшая Dreamcast.</p><div class="tiles retro-grid">' +
        CONSOLES.map(function (c) { return tile('#/retro/' + c.id, c.img, 'retro', c.name); }).join('') + '</div>' +
        '<p class="foot-note">Фото консолей: Evan-Amos, ' + ext('https://commons.wikimedia.org/wiki/User:Evan-Amos', 'Wikimedia Commons') + ', общественное достояние.</p>';
      main.innerHTML = page('Retro', 'Платформы / Retro', b); return;
    }
    var c = CONSOLES.filter(function (x) { return x.id === id; })[0]; if (!c || !ORIG[c.key]) return notFound();
    var lines = ORIG[c.key].split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    var title = lines.shift(), rows = [], desc = [], site = '';
    lines.forEach(function (l) {
      if (/^Сайт:/.test(l)) { site = l.replace(/^Сайт:\s*/, ''); return; }
      if (l.length > 140) { desc.push(l); return; }
      var m = l.match(/^(.+?)\s+-\s*(.+)$/);
      if (m) rows.push([m[1], m[2]]); else if (desc.length) desc[desc.length - 1] += ' ' + l; else rows.push([l, 'да']);
    });
    var note = c.key === 'dream' ? '<p class="note"><b>Примечание редакции, 2026:</b> SEGA не была поглощена Microsoft — так в 2004 году писали в оригинале. С 2004 года SEGA входит в Sega Sammy Holdings.</p>' : '';
    var i = CONSOLES.indexOf(c), prev = CONSOLES[i - 1], next = CONSOLES[i + 1];
    var b2 = '<div class="console"><div><img src="' + c.img + '" alt="' + c.name + '"><p class="foot-note">Фото: Evan-Amos, ' + ext('https://commons.wikimedia.org/wiki/File:' + c.file, 'Wikimedia Commons') + ', общественное достояние.</p></div><div><h2 style="margin-top:0">' + esc(title) + '</h2>' +
      '<table class="spec"><tbody>' + rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table>' +
      (site ? '<p class="foot-note">Сайт (2004): ' + esc(site) + '</p>' : '') + '</div></div>' +
      desc.map(function (d) { return '<p>' + esc(d) + '</p>'; }).join('') + note +
      '<div class="rv-nav">' + (prev ? '<a class="btn g" href="#/retro/' + prev.id + '">← ' + prev.name + '</a>' : '<a class="btn g" href="#/retro">← Все консоли</a>') + (next ? '<a class="btn g" href="#/retro/' + next.id + '">' + next.name + ' →</a>' : '<a class="btn g" href="#/retro">Все консоли →</a>') + '</div>';
    main.innerHTML = page('Консоли: детали и особенности', '<a href="#/retro">Retro</a> / ' + c.name, b2);
  }

  function notFound() {
    main.innerHTML = page('Страница не найдена', '', '<p>Такой страницы нет. Вернитесь <a href="#/">на главную</a> или откройте <a href="#/last">свежий номер</a>.</p>');
  }

  /* ---------- роутер ---------- */
  var ROUTES = {
    '': home, magazine: magazine, last: last, reviews: reviews, verdicts: verdicts, next: nextIssue, buy: buy, subscribe: subscribe,
    archives: archives, announce: announce, contacts: contacts, editors: editors, com: com, adm: adm, vacancies: vacancies,
    gta: function () { article('gta'); }
  };
  function route() {
    clearInterval(featTimer);
    var h = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
    var parts = h.split('/'), k = parts[0], arg = parts[1];
    if (k === 'top') return;
    if (k === 'review') review(arg);
    else if (k === 'read') article(arg);
    else if (k === 'archive') issue(+arg);
    else if (k === 'history') history(arg);
    else if (k === 'platform') platform(arg);
    else if (k === 'retro') retro(arg);
    else (ROUTES[k] || notFound)();
    // активные пункты
    var cur = '#/' + h;
    [].forEach.call(document.querySelectorAll('.menu2, .platforms a'), function (a) {
      var href = a.getAttribute('href');
      a.classList.toggle('on', href === cur || (href !== '#/' && cur.indexOf(href + '/') === 0) || (href === '#/reviews' && k === 'review') || (href === '#/archives' && k === 'archive'));
    });
    var t = main.querySelector('.txt_header');
    document.title = (t ? t.textContent + ' — ' : '') + 'Videogames INSIDE';
    window.scrollTo(0, 0);
    closeMenu();
  }

  /* ---------- мобильное меню ---------- */
  var btn = $('#menuBtn'), left = $('#leftmenu');
  function closeMenu() { left.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Меню'; }
  btn.addEventListener('click', function () {
    var o = !left.classList.contains('open');
    left.classList.toggle('open', o); if (o) left.scrollIntoView({ behavior: 'smooth', block: 'start' }); btn.setAttribute('aria-expanded', String(o)); btn.textContent = o ? 'Закрыть' : 'Меню';
  });

  /* ---------- баннер GTA ---------- */
  var gc = $('#gtaCount'); var dd = daysTo();
  if (gc) gc.textContent = dd > 0 ? 'через ' + dd + ' ' + plural(dd, 'день', 'дня', 'дней') : 'уже в продаже';

  window.addEventListener('hashchange', route);
  route();
})();
