const charsSection = document.getElementById('charsSection');
  back = document.getElementById('back'),
  dataOfChar = document.getElementById('dataOfChar'),
  imgActor = document.getElementById('imgActor'),
  disName = document.getElementById('disName'),
  disNickName = document.getElementById('disNickName'),
  disBirthday = document.getElementById('disBirthday'),
  disStatus = document.getElementById('disStatus'),
  disAppearance = document.getElementById('disAppearance'),
  occupationList = document.getElementById('occupationList'),
  list = document.createElement('ul'),
  api = "https://www.breakingbadapi.com/api/characters";
let data;

(async function getData() {
  try {
    const response = await fetch(api)
    data = await response.json()
    createChar(data);

  } catch (e) {
    console.log("error", e.message)
  }
})()

function createChar(data) {
  data.forEach(actor => {

    let linkImg = actor.img;
    let textName = actor.name;
    let textNickName = actor.nickname;

    const el = document.createElement('li'),
      figure = document.createElement('figure'),
      img = document.createElement('img'),
      figcaption = document.createElement('figcaption'),
      name = document.createElement('span'),
      br = document.createElement('br'),
      nickname = document.createElement('span');

    figcaption.appendChild(name)
    figcaption.appendChild(br)
    figcaption.appendChild(nickname)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    el.appendChild(figure)
    list.appendChild(el)
    charsSection.appendChild(list)

    list.setAttribute("class", "chars")
    el.setAttribute("class", "char")
    el.setAttribute("data-index", `${actor.char_id}`)
    el.setAttribute("onclick", "openInfo(this)")
    img.setAttribute('src', `${linkImg}`)
    name.setAttribute('class', 'name')
    nickname.setAttribute('class', 'nickname')

    name.innerText = `${textName}`
    nickname.innerText = `${textNickName}`

  });
}

back.addEventListener('click', close)

function close() {
  dataOfChar.style.display = 'none';
  let leg = occupationList.children.length;
  for (let index = leg; index == occupationList.children.length; index--) {
    if (index == 0) {
      break;
    }
    occupationList.removeChild(occupationList.children[index - 1])
  }
}

function openInfo(elem) {
  dataOfChar.style.display = 'block'
  let dIndex = elem.getAttribute('data-index')
  let obj = data.filter(actor => actor.char_id == dIndex)[0]

  imgActor.setAttribute('src', `${obj.img}`)
  disName.innerText = `${obj.name}`
  disNickName.innerText = `${obj.nickname}`
  disBirthday.innerText = `${obj.birthday}`
  disStatus.innerText = `${obj.status}`
  disAppearance.innerText = `${obj.appearance}`

  let occupationArr = obj.occupation
  occupationArr.forEach(el => {
    let occ = document.createElement('li')
    occ.setAttribute('class', 'text')
    occ.innerText = `${el}`
    occupationList.appendChild(occ)
  })
}