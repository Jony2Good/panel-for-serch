(function () {
  //создание названия приложения
  function createTitle(title) {
    let titleName = document.createElement("h1");
    titleName.classList.add("mb-4", "pt-2", "text-center");
    titleName.innerHTML = title;
    return titleName;
  }

  //создание формы для добавления студента
  function addForm() {
    let form = document.createElement("form"),
      formTitle = document.createElement("h2"),
      inputName = document.createElement("input"),
      nameLabel = document.createElement("label"),
      inputFaculty = document.createElement("input"),
      facultyLabel = document.createElement("label"),
      inputDateBirth = document.createElement("input"),
      birthLabel = document.createElement("label"),
      inputStartStudy = document.createElement("input"),
      startStudyLabel = document.createElement("label"),
      buttonWrapper = document.createElement("div"),
      button = document.createElement("button");

    formTitle.textContent = "Добавить в список нового студента";

    nameLabel.textContent = "Введите фамилию имя и отчество";
    facultyLabel.textContent = "Введите название факультета";
    birthLabel.textContent = "Введите дату рождения";
    startStudyLabel.textContent = "Введите год начала обучения";

    form.classList.add("row", "form-control", "g-1", "mb-2");

    inputName.classList.add("form-control", "mb-2", "mr-1", "col-6");
    inputFaculty.classList.add("form-control", "mb-2", "mr-1", "col-6");
    inputDateBirth.classList.add("form-control", "mb-2", "mr-1", "col-6");
    inputStartStudy.classList.add("form-control", "mb-3", "mr-1", "col-6");

    inputName.placeholder = "Ф. И. О.";
    inputFaculty.placeholder = "Факультет";
    inputDateBirth.placeholder = "Дата рождения";
    inputStartStudy.placeholder = "Год начала учебы";

    inputName.setAttribute("reqired", true);
    inputName.setAttribute("minlength", 6);
    inputFaculty.setAttribute("required", true);
    inputFaculty.setAttribute("minlength", 3);
    inputDateBirth.setAttribute("required", true);
    inputStartStudy.setAttribute("required", true);
    inputName.setAttribute("id", "name");
    inputFaculty.setAttribute("id", "faculty");
    inputDateBirth.setAttribute("id", "date-of-birth");
    inputStartStudy.setAttribute("id", "start");

    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate();

    inputName.setAttribute("type", "text");
    inputFaculty.setAttribute("type", "text");
    inputDateBirth.setAttribute("type", "date");
    inputDateBirth.setAttribute("max", `${year - 1}.${month + 1}.${day}`);
    inputStartStudy.setAttribute("type", "number");
    inputStartStudy.setAttribute("min", "2000");
    inputStartStudy.setAttribute("max", `${new Date().getFullYear()}`);

    buttonWrapper.classList.add("input-group");
    button.classList.add("btn", "btn-primary", "btn-add");
    button.textContent = "Добавить";
    buttonWrapper.append(button);

    form.append(formTitle);
    form.append(nameLabel);
    form.append(inputName);
    form.append(facultyLabel);
    form.append(inputFaculty);
    form.append(birthLabel);
    form.append(inputDateBirth);
    form.append(startStudyLabel);
    form.append(inputStartStudy);
    form.append(buttonWrapper);

    button.setAttribute("disabled", "disabled");
    inputName.addEventListener("input", enabledBtn);

    function enabledBtn() {
      if (inputName.value.length > 0) {
        button.removeAttribute("disabled");
      } else {
        button.setAttribute("disabled", "disabled");
      }
    }

    return {
      form,
      formTitle,
      inputName,
      inputFaculty,
      inputDateBirth,
      inputStartStudy,
      button,
    };
  }

  //создаем список студентов
  function createStudentsList(user) {
    let tableBody = document.getElementById("table-body"),
      row = document.createElement("tr"),
      name = document.createElement("td"),
      faculty = document.createElement("td"),
      birthday = document.createElement("td"),
      startStudy = document.createElement("td"),
      buttonGroup = document.createElement("td"),
      deleteButton = document.createElement("button");

    row.setAttribute("id", user.id);
    row.append(name, birthday, startStudy, faculty, buttonGroup);

    name.textContent = user.name;
    faculty.textContent = user.faculty;
    birthday.textContent = `${user.dateOfBirth
      .split("-")
      .reverse()
      .join(".")} (${getAge(user.dateOfBirth)} лет)`;
    startStudy.textContent = getCurrentCourse(user);

    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", deleteStudent);
    deleteButton.textContent = "удалить";

    buttonGroup.append(deleteButton);

    tableBody.append(row);

    return {
      tableBody,
      row,
      name,
      faculty,
      birthday,
      startStudy,
      deleteButton,
      buttonGroup,
    };
  }

  //сортировка
  // сортировка студентов по имени
  function sortingName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  // сортировка по названию факультетф
  function sortingFaculty(a, b) {
    if (a.faculty < b.faculty) {
      return -1;
    }
    if (a.faculty > b.faculty) {
      return 1;
    }
    return 0;
  }
  // сортировка по дате рождения
  function sortingBirth(a, b) {
    if (new Date(a.dateOfBirth) > new Date(b.dateOfBirth)) {
      return -1;
    }
    if (new Date(a.dateOfBirth) < new Date(b.dateOfBirth)) {
      return 1;
    }
    return 0;
  }

  // сортировка по году начала обучения
  function sortingStudyStart(a, b) {
    if (Number(a.startOfStudy) > Number(b.startOfStudy)) {
      return -1;
    }
    if (Number(a.startOfStudy) < Number(b.startOfStudy)) {
      return 1;
    }
    return 0;
  }
  //соритировка столбоцов списка студентов
  function sortBy(sortingType) {
    switch (sortingType) {
      case "name":
        arrLocalStorage.sort(sortingName);
        break;
      case "faculty":
        arrLocalStorage.sort(sortingFaculty);
        break;
      case "age":
        arrLocalStorage.sort(sortingBirth);
        break;
      case "course":
        arrLocalStorage.sort(sortingStudyStart);
        break;
      default:
        break;
    }
    render();
  }

  // по клику на столбец происходит сортировка элементов списка по возрастанию
  document.getElementById("name").addEventListener("click", () => {
    sortBy("name");
  });
  document.getElementById("faculty").addEventListener("click", () => {
    sortBy("faculty");
  });
  document.getElementById("age").addEventListener("click", () => {
    sortBy("age");
  });
  document.getElementById("course").addEventListener("click", () => {
    sortBy("course");
  });

  // получение нужного возраста
  function getAge(data) {
    let today = new Date(),
      birthDate = new Date(data),
      age = today.getFullYear() - birthDate.getFullYear(),
      m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  //вычисление текущего года окончания учебы и нынешнего курса
  function getCurrentCourse(user) {
    const { startOfStudy } = user;
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth();
    const course = actualYear - startOfStudy;

    if (course > 4 || (course === 4 && actualMonth > 8)) {
      return `${startOfStudy} - ${Number(startOfStudy) + 4} (завершил)`;
    } else if (course === 0 && actualMonth < 8) {
      return `${startOfStudy} - ${Number(startOfStudy) + 4} (зачислен)`;
    } else if (actualMonth >= 8 && Number(startOfStudy) === actualYear) {
      return `${startOfStudy} - ${Number(startOfStudy) + 4} (1 курс)`;
    } else {
      return `${startOfStudy} - ${Number(startOfStudy) + 4} (${course} курс)`;
    }
  }
  //кнопка удаления выбранного студента из списка + удаление из хранилища
  function deleteStudent() {
    if (confirm("Вы уверены?")) {
      const studentId = Number(
        this.parentElement.parentElement.getAttribute("id")
      );
      document.getElementById(studentId).remove();
      arrLocalStorage = JSON.parse(localStorage.getItem("students"));
      const newItems = arrLocalStorage.filter(
        (object) => object.id !== studentId
      );
      localStorage.setItem("students", JSON.stringify(newItems));
    }
  }
  // перерисовка списка студентов после его изменения
  function render(users = undefined) {
    const elements = users ? users : arrLocalStorage;
    document.getElementById("table-body").innerHTML = "";
    elements.map((user) => {
      createStudentsList(user);
    });
  }

  // фильтрация списка студентов + проврека на регистр
  function filter(input, value) {
    let newArr = [...arrLocalStorage];
    switch (input) {
      case "name":
        newArr = arrLocalStorage.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case "faculty":
        newArr = arrLocalStorage.filter((user) =>
          user.faculty.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case "start":
        newArr = arrLocalStorage.filter((user) => {
          return user.startOfStudy === value;
        });
        break;
      case "end":
        newArr = arrLocalStorage.filter((user) => {
          return user.finishOfstudy === value;
        });
        break;
      default:
        break;
    }
    if (value === "") {
      newArr = arrLocalStorage;
    }
    render(newArr);
  }

  //навешиваем обработчик на инпуты при вводе для поиска по текущему списку студентов
  document.getElementById("search-name").addEventListener("input", function () {
    filter("name", this.value);
  });
  document
    .getElementById("search-faculty")
    .addEventListener("input", function () {
      filter("faculty", this.value);
    });
  document
    .getElementById("search-start")
    .addEventListener("input", function () {
      filter("start", this.value);
    });
  document.getElementById("search-end").addEventListener("input", function () {
    filter("end", this.value);
  });

  //Работа с докальным хранилищем
  let arrLocalStorage = [];

  let listForLS = [
    {
      name: "Семенов Игорь Александрович",
      dateOfBirth: "2005-01-21",
      faculty: "Юридический",
      startOfStudy: "2018",
      finishOfstudy: "2022",
      id: 1,
    },
    {
      name: "Марков Алесандр Игоревич",
      dateOfBirth: "2000-03-15",
      faculty: "Управление",
      startOfStudy: "2019",
      finishOfstudy: "2023",
      id: 2,
    },
    {
      name: "Равильева Рима Снежановна",
      dateOfBirth: "2001-05-01",
      faculty: "Психология",
      startOfStudy: "2020",
      finishOfstudy: "2024",
      id: 3,
    },
    {
      name: "Зеленова Смеяна Сергеевна",
      dateOfBirth: "2002-01-21",
      faculty: "Педагогический",
      startOfStudy: "2020",
      finishOfstudy: "2024",
      id: 4,
    },
  ];

  //получение данных из локального хранилища
  function getDataFromLS() {
    if (localStorage.getItem("students")) {
      arrLocalStorage = JSON.parse(localStorage.getItem("students"));
      for (let object of arrLocalStorage) {
        createStudentsList(object);
      }
    }
  }
  // создание списка студентов для локального хранилища
  function createListForLS() {
    const storageArr = JSON.parse(localStorage.getItem(key));
    if (localStorage.getItem(key) === null || storageArr.length === 0) {
      arrLocalStorage = listForLS;
      localStorage.setItem("students", JSON.stringify(arrLocalStorage));
      for (let object of arrLocalStorage) {
        createStudentsList(object);
      }
    }
  }

const inputs = document.querySelectorAll('input[type=number]');
Array.from(inputs).forEach(input => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('input', (e) => {
        const value = +input.value;
        if (value > max) { input.value = max }
        else if (value < min) { input.value = min }
    })
});
  // собираем и склеиваем все функции в одну и создаем рабочее приложение
  function createFormApp(container, title = "База данных студентов", key) {
    let studentsAppTitle = createTitle(title),
      addStudentsForm = addForm(),
      studentsTxtTitle = document.getElementById("title");
    console.log("studentsTxtTitle: ", studentsTxtTitle);

    studentsTxtTitle.prepend(studentsAppTitle);
    container.append(addStudentsForm.form);

    //при запуске приложение у нас появляется рабочий список
    getDataFromLS();
    createListForLS();

    addStudentsForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      let LocStorageData = localStorage.getItem(key);
      if (LocStorageData === null) {
        arrLocalStorage = [];
      } else {
        arrLocalStorage = JSON.parse(LocStorageData);
      }
      // при вводе нового студента он попадает в массив для localstorage
      function addNewStudent() {
        const itemObj = {};
        itemObj.name = addStudentsForm.inputName.value;
        itemObj.faculty = addStudentsForm.inputFaculty.value;
        itemObj.dateOfBirth = addStudentsForm.inputDateBirth.value;
        itemObj.startOfStudy = addStudentsForm.inputStartStudy.value;
        itemObj.finishOfstudy = String(
          Number(addStudentsForm.inputStartStudy.value) + 4
        );
        itemObj.id = Math.floor(Math.random() * 15000);
        arrLocalStorage.push(itemObj);
        return itemObj;
      }

      const user = addNewStudent();
      createStudentsList(user);

      const storageArr = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) === null || storageArr.length === 0) {
        localStorage.setItem(key, JSON.stringify(listForLS));
      }

      localStorage.setItem(key, JSON.stringify(arrLocalStorage));

      addStudentsForm.inputName.value = "";
      addStudentsForm.inputFaculty.value = "";
      addStudentsForm.inputDateBirth.value = "";
      addStudentsForm.inputStartStudy.value = "";
    });
  }
  window.createFormApp = createFormApp;
})();
