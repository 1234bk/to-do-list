// Initialize the date and update it periodically
function updateDate() {
  const dateContainer = document.getElementById('date-container');
  const currentDate = new Date();

  const options = { 
    weekday: 'long', // 'long' gives full day name like "Monday"
    year: 'numeric', 
    month: 'long',   // 'long' gives full month name like "October"
    day: 'numeric' 
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  dateContainer.textContent = formattedDate;
}







// Initialize the date and update it periodically
function updateDate() {
  const dateContainer = document.getElementById('date-container');
  const currentDate = new Date();

  const options = { 
    weekday: 'long', // 'long' gives full day name like "Monday"
    year: 'numeric', 
    month: 'long',   // 'long' gives full month name like "October"
    day: 'numeric' 
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  dateContainer.textContent = formattedDate;
}
updateDate();
setInterval(updateDate, 6000000); // Update every 100 minutes (6000000ms)

// Track the number of completed tasks
let completedTasks = Number(localStorage.getItem('completedTasks')) || 0; // Load completed tasks count from localStorage

// Initialize totalTasks to 3 by default, if it's not already set in localStorage
let totalTasks = Number(localStorage.getItem('totalTasks')) || 3; // Default value is 3 if not set

// Function to check if all inputs are filled
function checkAllInputsFilled() {
  const allInputs = document.querySelectorAll('.input-box');
  for (let input of allInputs) {
    if (input.value.trim() === '') {
      return false; // Return false if any input is empty
    }
  }
  return true; // Return true if all inputs are filled
}

// Function to update the progress bar and task counters
function updateProgress() {
  const progress = (completedTasks / totalTasks) * 100; // Calculate percentage
  const barbox = document.getElementById('barbox');
  const valueSpan = document.querySelector('#value');
  const valueSpan2 = document.querySelector('#finalvalue');
  barbox.style.width = progress + '%'; // Update progress bar width
  valueSpan.textContent = completedTasks; // Update task counter
  valueSpan2.textContent = totalTasks;

  // Save the progress to localStorage
  localStorage.setItem('completedTasks', completedTasks);
  localStorage.setItem('totalTasks', totalTasks);
}

// Function to handle circle click and task completion
function handleCircleClick(circle) {
  const container = circle.closest('.container');
  const input = container.querySelector('.input-box');
  const alertElement = document.getElementById('alert');
  const alertBox = document.getElementById('alertBox');

  if (checkAllInputsFilled()) {
    alertElement.style.display = 'none'; // Hide alert if all inputs are filled

    if (circle.classList.contains('selected')) {
      // Deselect task
      circle.classList.remove('selected');
      input.classList.remove('completed');
      completedTasks--; // Decrease completed tasks
    } else {
      // Select task
      circle.classList.add('selected');
      input.classList.add('completed');
      completedTasks++; // Increase completed tasks
    }

    updateProgress(); // Update the progress bar

    // Show alert box if all tasks are completed
    if (completedTasks === totalTasks) {
      alertBox.style.visibility = 'visible';
      alertBox.style.opacity = 1;
      alertBox.style.transform = 'scale(1)'; // Animate scale effect

      // Set timer to hide alert box after 7 seconds
      setTimeout(() => {
        alertBox.style.visibility = 'hidden';
        alertBox.style.opacity = 0;
        alertBox.style.transform = 'scale(0.5)';
      }, 1500); // 7 seconds delay
    } else {
      alertBox.style.opacity = 0;
      alertBox.style.transform = 'scale(0.5)'; // Shrink animation
      setTimeout(() => {
        alertBox.style.visibility = 'hidden'; // Delay hiding to allow opacity animation
      }, 2000); // Match transition duration
    }
  } else {
    alertElement.style.display = 'block'; // Show alert if inputs are empty
  }

  // Save selected/completed task state to localStorage
  localStorage.setItem(container.id + '-selected', circle.classList.contains('selected'));
  localStorage.setItem(container.id + '-completed', input.classList.contains('completed'));
}

// Function to save the input values to localStorage
function saveInputValues() {
  const allInputs = document.querySelectorAll('.input-box');
  allInputs.forEach(input => {
    const container = input.closest('.container');
    if (container) {
      localStorage.setItem(container.id + '-value', input.value.trim());
    }
  });
}

// Add Task functionality
document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskContainer = document.getElementById('task-container');
  totalTasks++; // Increment total task count
  updateProgress(); // Update progress bar and counters

  // Create a new container
  const containerCount = totalTasks; // Unique ID based on the total task count
  const newContainer = document.createElement('div');
  newContainer.classList.add('container');
  newContainer.id = `container-${containerCount}`;

  // Create a new circle
  const newCircle = document.createElement('div');
  newCircle.classList.add('circle');
  newCircle.id = `circle-${containerCount}`;
  newCircle.innerHTML = `<span class="checkmark">✔</span>`;

  // Create a new input box
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.classList.add('input-box');
  newInput.placeholder = "Enter today's task here......";

  // Save input value changes to localStorage
  newInput.addEventListener('input', saveInputValues);

  // Append circle and input box to the new container
  newContainer.appendChild(newCircle);
  newContainer.appendChild(newInput);

  // Append the new container to the task container
  taskContainer.appendChild(newContainer);

  // Increase the height of the box by 10%
  const box = document.getElementById('box');
  const currentHeight = parseFloat(window.getComputedStyle(box).height);
  const newHeight = currentHeight * 1.08; // Increase by 10%
  box.style.height = `${newHeight}px`; // Update height of the box

  // Save new task to localStorage
  localStorage.setItem(newContainer.id + '-value', ''); // Empty initial value
  localStorage.setItem(newContainer.id + '-selected', 'false');
  localStorage.setItem(newContainer.id + '-completed', 'false');
  localStorage.setItem('totalTasks', totalTasks); // Update total task count in localStorage
  saveInputValues(); // Save all input values to localStorage
});

// Load saved data from localStorage
function loadSavedData() {
  const taskContainer = document.getElementById('task-container');
  const taskCount = Number(localStorage.getItem('totalTasks')) || 3; // Default to 3 if no data

  // Ensure no duplicate tasks are added on page refresh
  if (taskCount === 0) return;

  // Ensure that existing containers are preserved and no duplicate tasks are created
  for (let i = 1; i <= taskCount; i++) {
    const containerId = `container-${i}`;
    const taskValue = localStorage.getItem(containerId + '-value');
    const isSelected = localStorage.getItem(containerId + '-selected') === 'true';
    const isCompleted = localStorage.getItem(containerId + '-completed') === 'true';

    // Create the container, circle, and input dynamically based on saved data
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = containerId;

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.innerHTML = `<span class="checkmark">✔</span>`;

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input-box');
    input.placeholder = "Enter today's task here......";
    input.value = taskValue; // Populate with saved value

    // Only add classes based on saved state (do not increment completedTasks here)
    if (isSelected) {
      circle.classList.add('selected');
      input.classList.add('completed');
    }

    if (isCompleted) {
      input.classList.add('completed');
    }

    // Append elements
    container.appendChild(circle);
    container.appendChild(input);
    taskContainer.appendChild(container);

    // Add event listener to circle
    circle.addEventListener('click', function () {
      handleCircleClick(circle);
    });
  }

  updateProgress(); // Update progress bar after loading tasks from localStorage
}

// Initialize and load saved data on page load
loadSavedData();

// Delegate click listener for circles inside the task container
document.getElementById('task-container').addEventListener('click', function (event) {
  if (event.target.classList.contains('circle')) {
    handleCircleClick(event.target);
  }
});

// Event listener to save task input values to localStorage on any change
document.querySelectorAll('.input-box').forEach(input => {
  input.addEventListener('input', saveInputValues);
});









// Function to refresh the page
document.getElementById('refresh').addEventListener('click', () => {
  localStorage.clear(); // Clear all data from local storage
  location.reload(); // Refresh the page
});
