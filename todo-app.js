class TodoApp extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: 'open' });

		const template = document.createElement('template');
		template.innerHTML = `
          <style>
            :host {
              display: block;
              max-width: 400px;
              margin: 40px auto;
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 12px;
              background: #fafafa;
            }

            h2 {
              font-size: 20px;
              margin-bottom: 10px;
            }

            .input-row {
              display: flex;
              gap: 10px;
            }

            input[type="text"] {
              flex: 1;
              padding: 8px;
              border-radius: 6px;
              border: 1px solid #bbb;
            }

            button {
              padding: 8px 12px;
              border: none;
              border-radius: 6px;
              background: #007bff;
              color: white;
              cursor: pointer;
            }

            ul {
              margin-top: 15px;
              padding: 0;
              list-style: none;
            }

            li {
              background: white;
              padding: 8px;
              margin-bottom: 8px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #ddd;
            }

            li .completed {
              text-decoration: line-through;
              color: #777;
            }

            .delete-btn {
              background: red;
              color: white;
              border: none;
              padding: 4px 10px;
              border-radius: 4px;
              cursor: pointer;
            }
          </style>

          <h2>To-Do List</h2>

          <div class="input-row">
            <input type="text" placeholder="Enter a task..." />
            <button id="addBtn">Add</button>
          </div>

          <ul id="list"></ul>
        `;

		this.shadow.appendChild(template.content.cloneNode(true));

		this.input = this.shadow.querySelector('input');
		this.addBtn = this.shadow.querySelector('#addBtn');
		this.list = this.shadow.querySelector('#list');
	}

	connectedCallback() {
		this.addBtn.addEventListener('click', () => this.addTask());

		this.input.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') this.addTask();
		});
	}

	addTask() {
		const text = this.input.value.trim();
		if (!text) return;

		const li = document.createElement('li');

		const taskSpan = document.createElement('span');
		taskSpan.textContent = text;
		taskSpan.style.cursor = 'pointer';

		taskSpan.addEventListener('click', function () {
			this.classList.toggle('completed');
		});

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'X';
		deleteBtn.className = 'delete-btn';

		deleteBtn.addEventListener('click', () => {
			li.remove();
		});

		li.appendChild(taskSpan);
		li.appendChild(deleteBtn);

		this.list.appendChild(li);

		this.input.value = '';
	}
}

customElements.define('todo-app', TodoApp);
