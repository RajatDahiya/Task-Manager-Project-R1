const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);

let globalStore = [];

const generateNewCardData = (taskData) =>
`<div class="col-md-6 col-lg-4">
  <div class="card">
      <div class="card-header text-end">
          <button type="button" class="btn btn-outline-success"><i class="fas fa-pen"></i></button>
          <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
          <i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
      </div>
      <img src=${taskData.imageUrl} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <span class="badge bg-primary">${taskData.taskType}</span>
      </div>
      <div class="card-footer text-muted">
          <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
      </div>
  </div>
</div>`


const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("tasky");

  const {cards} = JSON.parse(getCardData);

  cards.map((cardObject) =>{

    taskContainer.insertAdjacentHTML("beforeend", generateNewCardData(cardObject));

    globalStore.push(cardObject);

  })

};


const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCardData(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

};

const deleteCard = (event) => {
  event = window.event;
  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName; // BUTTON
  // match the id of the element with the id inside the globalStore
  // if match found remove

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); 
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // an object
  // contact parent

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};