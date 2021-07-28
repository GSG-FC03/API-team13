const charsSection = document.getElementById('charsSection');
const list = document.createElement('ul');
const api = "https://www.breakingbadapi.com/api/characters";

(async function getData() {
  try {
    const response = await fetch(api)
    const data = await response.json()
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
    img.setAttribute('src', `${linkImg}`)
    name.setAttribute('class', 'name')
    nickname.setAttribute('class', 'nickname')

    name.innerText = `${textName}`
    nickname.innerText = `${textNickName}`

  });
}