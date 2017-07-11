document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');//variable to hold the reference to form element in DOM
  const input = form.querySelector('input');//select the forms input element
  
  const maindDiv = document.querySelector('.main');//refernce to the main section in html.doc
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');//places the filter box in the html
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  maindDiv.insertBefore(div, ul);//inserting before ul in html
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    }else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });
  
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);//for the confirmed checkbox
    appendToLI('label', 'textContent', 'Confirmed').appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');//for the edit button  
    appendToLI('button', 'textContent', 'remove');//for the remove button
    return li;
  }
  
  
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();//cancels the browsers default submit behavior to server
    const text = input.value;
    input.value = '';//resets the text input box to empty string after submission has been made
    const li = createLI(text);  
    ul.appendChild(li);
  });
  
  ul.addEventListener('change', (e) => {  //this is the checkbox change handler
    const checkbox = event.target;//reference to the checkbox itself
    const checked = checkbox.checked;//the value of the checkbox either true or false
    const listItem = checkbox.parentNode.parentNode;//reference to the list item which is the checkbox's grandparent - label is a child of the list item and the checkbox is a child of the label
    
    if (checked) {
      listItem.className = 'responded';//have a css class that will change the shade of the box if checked
    } else {
      listItem.className = '';
    }
  });
  
  ul.addEventListener('click', (e) => {//click event for the remove option
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = e.target.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';//The text field for the edit button
          input.value = span.textContent;//The text that was already entered in the field for edit
          li.insertBefore(input, span);//insert a span before the input
          li.removeChild(span);//the previous text content
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;//The text that was newly entered in the field for edit
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
    //select and run action in button's name
      nameActions[action]();
    }
  });
});
