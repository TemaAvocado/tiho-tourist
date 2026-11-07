const header = document.querySelector('.header'); const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30); if (!document.querySelector('.hero,.tour-hero')) header.classList.add('header--inner'); window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader(); const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav'); menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)) });
const tours = { baikal: { name: 'Байкал', season: 'ЗИМА', duration: '7 дней', price: 'от 89 000 ₽', tag: 'Лёд, в котором отражается небо', image: 0 }, altai: { name: 'Алтай', season: 'ЛЕТО', duration: '8 дней', price: 'от 96 000 ₽', tag: 'Там, где горы становятся ближе', image: 1 }, karelia: { name: 'Карелия', season: 'ЛЕТО', duration: '5 дней', price: 'от 54 000 ₽', tag: 'Тишина северных озёр', image: 2 }, kamchatka: { name: 'Камчатка', season: 'ОСЕНЬ', duration: '9 дней', price: 'от 149 000 ₽', tag: 'На краю земли и океана', image: 3 } }; const params = new URLSearchParams(location.search), key = tours[params.get('tour')] ? params.get('tour') : 'baikal', tour = tours[key]; if (document.querySelector('#tour-video')) {
  document.querySelectorAll('[data-tour-name]').forEach(el => el.textContent = tour.name);
  document.title = tour.name + ' — ТИХО';
  const video = document.querySelector('#tour-video');
  video.poster = `assets/img/${tour.image}.jpg`;
  video.src = `assets/video/${key}.mp4`;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
  document.querySelector('#tour-season').textContent = tour.season + ' / ' + tour.duration.toUpperCase();
  document.querySelector('#tour-tagline').textContent = tour.tag;
  document.querySelector('#tour-duration').textContent = tour.duration;
  document.querySelector('#tour-price').textContent = tour.price;
  document.querySelector('#tour-order').href = 'contacts.html?tour=' + key + '#order-form';
}
const region = document.querySelector('#region'), season = document.querySelector('#season'), budget = document.querySelector('#budget'); if (region) { const cards = [...document.querySelectorAll('.catalog .tour-card')]; function filter() { let count = 0; cards.forEach(card => { const visible = (!region.value || card.dataset.region === region.value) && (!season.value || card.dataset.season === season.value) && (!budget.value || Number(card.dataset.price) <= Number(budget.value)); card.hidden = !visible; if (visible) count++ }); document.querySelector('#count').textContent = count; document.querySelector('.empty').hidden = count > 0 } [region, season, budget].forEach(el => el.addEventListener('change', filter)); document.querySelector('.filter-reset').addEventListener('click', () => { [region, season, budget].forEach(el => el.value = ''); filter() }) } const order = document.querySelector('#order-form'); if (order) { if (params.has('tour') && tours[params.get('tour')]) document.querySelector('#order-tour').value = params.get('tour'); order.addEventListener('submit', event => { event.preventDefault(); if (order.reportValidity()) document.querySelector('.form-message').hidden = false }) }
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.classList.add('js-reveal'); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)) } const dialog = document.querySelector('.confirmation'); if (dialog) { order.addEventListener('submit', () => { if (order.checkValidity() && typeof dialog.showModal === 'function') dialog.showModal() }); dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close()) }

// Карта загружается в iframe и не требует ключа API. Кнопки оставляют доступ к странице маршрута и при недоступной карте.
const mapLocations = {
  baikal: {name:'Байкал', caption:'Озеро Байкал, Иркутская область', coords:'107.5,53.5', zoom:6},
  altai: {name:'Алтай', caption:'Горно-Алтайск и Горный Алтай', coords:'85.958,51.958', zoom:7},
  karelia: {name:'Карелия', caption:'Ладожское озеро и Южная Карелия', coords:'30.7,61.6', zoom:7},
  kamchatka: {name:'Камчатка', caption:'Петропавловск-Камчатский и окрестности', coords:'158.65,53.04', zoom:7}
};
const mapFrame=document.querySelector('#yandex-map');
if(mapFrame){
  const buttons=[...document.querySelectorAll('[data-map]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const id=button.dataset.map, place=mapLocations[id], coords=encodeURIComponent(place.coords);
    buttons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});
    mapFrame.src=`https://yandex.ru/map-widget/v1/?ll=${coords}&z=${place.zoom}&pt=${coords}%2Cpm2rdm`;
    mapFrame.title=`Яндекс Карта: ${place.name}`;
    document.querySelector('#map-caption').textContent=place.caption;
    document.querySelector('#map-tour').href=`tour.html?tour=${id}`;
    document.querySelector('#map-external').href=`https://yandex.ru/maps/?ll=${coords}&z=${place.zoom}`;
  }));
}
if(region && params.has('season')){const requested=params.get('season');if([...season.options].some(option=>option.value===requested)){season.value=requested;season.dispatchEvent(new Event('change'))}}

const journeyDetails={
 baikal:{description:'Зимний Байкал — это прозрачный лёд, заснеженные берега и бесконечный горизонт. Пример маршрута ведёт от Иркутска к острову Ольхон и помогает увидеть озеро с разных сторон.',weather:'Зимой на озере холодно и ветрено. Понадобятся тёплые слои, непродуваемая куртка и обувь с нескользящей подошвой.',days:[['01','Иркутск и знакомство','Встреча в Иркутске, знакомство с группой и прогулка по городу перед дорогой к Байкалу.'],['02','Дорога к Ольхону','Переезд к Малому Морю и первые остановки у заснеженных берегов.'],['03','Лёд Малого Моря','Знакомство с ледовыми пейзажами, гротами и трещинами. Маршрут зависит от состояния льда.'],['04','Север острова','Поездка по Ольхону к смотровым точкам и просторам северной части острова.'],['05','Время у озера','Неспешная прогулка и свободное время для фотографий и отдыха.'],['06','Возвращение в Иркутск','Обратная дорога с остановками в живописных местах.'],['07','До новых встреч','Завершение путешествия в Иркутске и дорога домой.']]},
 altai:{description:'Алтай раскрывается в изгибах горных дорог, долинах рек и широких перевалах. Пример поездки сочетает движение по Чуйскому тракту с остановками у природных достопримечательностей.',weather:'Даже летом в горах бывают прохладные вечера и дожди. Возьмите тёплый слой, дождевик и удобную обувь для прогулок.',days:[['01','Встреча на Алтае','Знакомство с группой и первая прогулка в окрестностях Горно-Алтайска.'],['02','Вдоль Катуни','Дорога вдоль реки, остановки у видовых точек и знакомство с горными долинами.'],['03','Перевалы Чуйского тракта','Переезд через Семинский перевал и Чике-Таман с остановками в пути.'],['04','Слияние Чуи и Катуни','Прогулка к смотровым площадкам и знакомство с пейзажами долины.'],['05','Курайская степь','Дорога через степные просторы с видом на Северо-Чуйский хребет.'],['06','День среди гор','Неспешные прогулки и время для фотографий, программа зависит от погоды.'],['07','Обратная дорога','Возвращение по Чуйскому тракту с остановками у памятных мест.'],['08','Завершение маршрута','Возвращение в Горно-Алтайск и прощание с группой.']]},
 karelia:{description:'Карелия — это сосновые леса, скалистые берега и озёра, в которых отражается северное небо. В примере маршрута собраны прогулки у Ладоги и знакомство с историей региона.',weather:'У воды и в лесу погода переменчива даже летом. Пригодятся непромокаемая куртка, удобная обувь и средство от насекомых.',days:[['01','Знакомство с севером','Встреча с группой и дорога к Ладожскому озеру.'],['02','Ладожские берега','Прогулки у озера, скалистые виды и время для фотографий.'],['03','Горный парк Рускеала','Знакомство с мраморным каньоном и прогулка по тропам парка.'],['04','Леса и водопады','День среди северной природы и остановки у водопадов.'],['05','Возвращение','Последние виды Карелии и завершение путешествия.']]},
 kamchatka:{description:'Камчатка соединяет вулканические сопки, тихоокеанское побережье и ощущение края земли. Пример программы начинается в Петропавловске-Камчатском и знакомит с природой полуострова.',weather:'Погода на полуострове меняется быстро. Возьмите непромокаемые вещи, тёплые слои и обувь с хорошим сцеплением.',days:[['01','Встреча на полуострове','Прилёт в Петропавловск-Камчатский, отдых после дороги и знакомство с группой.'],['02','Знакомство с городом','Прогулка и видовые точки с панорамой Авачинской бухты.'],['03','Тихоокеанское побережье','Поездка к Халактырскому пляжу и прогулка вдоль океана.'],['04','У подножия вулканов','Дорога к вулканическим пейзажам и прогулки по доступным тропам.'],['05','День на природе','Продолжение знакомства с природой полуострова; план зависит от погоды.'],['06','Морские пейзажи','Знакомство с побережьем и видами Авачинской бухты.'],['07','Свободный день','Время для отдыха и дополнительных впечатлений по желанию.'],['08','Последние открытия','Завершающие прогулки и возвращение в город.'],['09','До новых встреч','Завершение путешествия и вылет домой.']]}
};
if(document.querySelector('#itinerary')){const details=journeyDetails[key];document.querySelector('#tour-description').textContent=details.description;document.querySelector('#tour-weather').textContent=details.weather;document.querySelector('#itinerary').innerHTML=details.days.map(([day,title,description],index)=>`<details${index===0?' open':''}><summary><span>ДЕНЬ ${day}</span> ${title} <b>+</b></summary><p>${description}</p></details>`).join('')}
/* Навигация с клавиатуры и корректный переход к якорю под фиксированной шапкой. */
nav.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});

/* Кнопка доступна после прокрутки и учитывает системную настройку анимации. */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 400; };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
  updateBackToTop();
}
