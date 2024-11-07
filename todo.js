
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

  // Call the function once to set the date initially.
  updateDate();

  // If you want the date to update live (e.g., after midnight), set an interval.
  setInterval(updateDate, 60000); // Updates every 60 seconds (60000ms)








  function checkAllInputsFilled() {
    const allInputs = document.querySelectorAll('.input-box');
    
    // Loop through each input and check if any is empty
    for (let input of allInputs) {
        if (input.value.trim() === '') {
            return false;  // If any input is empty, return false
        }
    }
    return true;  // If all inputs are filled, return true
}


let completedTasks = 0; // Track the number of completed tasks
const totalTasks = 3; 
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    circle.addEventListener('click', function() {






     
      const container = circle.closest('.container');
      const input = container.querySelector('.input-box');
      const valueSpan = document.querySelector('#value');
      const alertElement = document.getElementById('alert');
      const alertBox = document.getElementById('alertBox');
      const barbox = document.getElementById('barbox');
       
      function updateProgress() {
        const progress = (completedTasks / totalTasks) * 100; // Calculate the width percentage
        barbox.style.width = progress + '%'; // Update the width of the barbox
        valueSpan.textContent = completedTasks; // Update the completed task number
    }





    
      if (checkAllInputsFilled()) {
        alertElement.style.display = 'none'; 
          // Check if the circle is already selected
        if (circle.classList.contains('selected')) {
          // If selected, remove the "selected" class and reverse the changes
          circle.classList.remove('selected');
          input.classList.remove('completed');


         
          completedTasks--;
          updateProgress(); 
          valueSpan.textContent = completedTasks;
        
      } else {
          
          circle.classList.add('selected');
          input.classList.add('completed');


          completedTasks++;
          updateProgress(); 
          valueSpan.textContent = completedTasks;
          if (completedTasks === totalTasks) {
            alertBox.style.visibility = 'visible';
            alertBox.style.opacity = 1;
        } else {
            alertBox.style.visibility = 'hidden';
            alertBox.style.opacity = 0;
        }

        }
      } 
      
      
      else {
         
          alertElement.style.display = 'block';  
      }  
    });
});



// Function to refresh the page when the "Okay" button is clicked
function refreshPage() {
  location.reload(); // This will reload the current page
}





  










