function sleep(ms) {
  return new Promise((resolve, reject) => {
    setInterval(resolve, ms);
  });
}

function nameFormatter(obj) {
  const firstChar = obj.first_name[0].toUpperCase();
  const lastName = obj.last_name[0].toUpperCase() + obj.last_name.slice(1);
  const formattedFullName = `${firstChar}.${lastName}`;

  return formattedFullName;
}

function randomizerButton(arr) {
  const randomBtn = document.querySelector(".randomizer");

  randomBtn.addEventListener("click", async (e) => {
    let count = 30;
    let userList = [...arr];

    const colorList = [
      "red",
      "blue",
      "green",
      "purple",
      "pink",
      "orange",
      "teal",
    ];
    const nameHeader = document.querySelector(".name-header");

    while (count > 0) {
      const random = Math.floor(Math.random() * userList.length);
      const randomCol = Math.floor(Math.random() * colorList.length);

      let randomColor = colorList[randomCol];
      let randomName = userList[random];

      if (count === 1) {
        await sleep(40);
        const nameText = document.createTextNode(randomName);
        nameHeader.innerHTML = "";
        nameHeader.appendChild(nameText);
        nameHeader.style.color = "#fff";

        break;
      } else {
        await sleep(40);
        const nameText = document.createTextNode(randomName);
        nameHeader.innerHTML = "";
        nameHeader.appendChild(nameText);
        nameHeader.style.color = randomColor;
        count -= 1;
      }
    }
  });
}

function formatName(array) {
  const sidebarEl = document.querySelector(".sidebar-data-wrapper");

  array.forEach((nameObj, idx) => {
    const formattedFullName = nameFormatter(nameObj);
    const dataBtnWrapper = document.createElement("div");
    const nameWeightWrapper = document.createElement("div");
    const btnWrapper = document.createElement("div");
    const nameHeader = document.createElement("h4");
    const weightHeader = document.createElement("h4");
    const addOneBtn = document.createElement("button");
    const subOneBtn = document.createElement("button");
    const weightText = document.createTextNode("1");
    const addOneText = document.createTextNode("+");
    const subOneText = document.createTextNode("-");
    const nameText = document.createTextNode(`${formattedFullName}:`);

    nameHeader.classList.add("name");
    nameHeader.appendChild(nameText);

    weightHeader.classList.add("weight");
    weightHeader.appendChild(weightText);

    nameWeightWrapper.classList.add("name-weight-wrapper");
    nameWeightWrapper.appendChild(nameHeader);
    nameWeightWrapper.appendChild(weightHeader);

    addOneBtn.classList.add("add-one");
    addOneBtn.appendChild(addOneText);
    addOneBtn.addEventListener("click", (e) => handleAddOne(e));

    subOneBtn.classList.add("sub-one");
    subOneBtn.appendChild(subOneText);
    subOneBtn.addEventListener("click", (e) => handleSubOne(e));

    btnWrapper.classList.add("btn-wrapper");
    btnWrapper.appendChild(addOneBtn);
    btnWrapper.appendChild(subOneBtn);

    dataBtnWrapper.classList.add("data-btn-wrapper");
    dataBtnWrapper.appendChild(nameWeightWrapper);
    dataBtnWrapper.appendChild(btnWrapper);

    sidebarEl.appendChild(dataBtnWrapper);
  });
}

const handleAddOne = (e) => {
  const handleWeightChange =
    e.target.parentElement.parentElement.children[0].childNodes[1];

  const weightValue =
    e.target.parentElement.parentElement.children[0].childNodes[1].innerHTML;

  handleWeightChange.innerHTML = `${Number(weightValue) + 1}`;
};

const handleSubOne = (e) => {
  const handleWeightChange =
    e.target.parentElement.parentElement.children[0].childNodes[1];

  const weightValue =
    e.target.parentElement.parentElement.children[0].childNodes[1].innerHTML;

  if (Number(weightValue) === 0) {
    handleWeightChange.innerHTML = "0";
  } else {
    handleWeightChange.innerHTML = `${Number(weightValue) - 1}`;
  }
};

class PersistDataList {
  getApiData() {
    return fetch("https://devpipeline-mock-api.herokuapp.com/api/get-users")
      .then((response) => response.json())
      .then((data) => {
        formatName(data.users);

        return data.users;
      })
      .catch((err) => console.log(err));
  }

  generateNameList(obj) {
    let randomUserArray = [];

    obj.forEach((fullName, idx) => {
      const formattedFullName = nameFormatter(fullName);
      randomUserArray.push(formattedFullName);
    });

    return randomUserArray;
  }
}

const getData = new PersistDataList();
const formatUserData = getData
  .getApiData()
  .then((data) => randomizerButton(getData.generateNameList(data)));
