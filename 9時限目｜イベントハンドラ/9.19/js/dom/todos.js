var todo = todo || {};
todo.dom = todo.dom || {};
todo.dom.todos = todo.dom.todos || {};

(function(_) {
	_.element = document.querySelector('.todos');

	_.add = function(todo) {
		// <li> 要素を作る
		var li = document.createElement('LI');
		li.id = 'todo-' + todo.id;
		li.classList.add('todo');
		if (todo.done) { // 完了した Todo 項目のグレーアウトに必要
			li.classList.add('todo-done');
		}

		var input = document.createElement('INPUT');
		input.id = 'todo-' + todo.id + '-checkbox';
		input.type = 'checkbox';
		input.checked = todo.done;
		var label = document.createElement('LABEL');
		label.htmlFor = input.id;
		label.textContent = todo.title;

		var div = document.createElement('DIV');
		div.classList.add('todo-operation');
		var editButton = document.createElement('BUTTON');
		editButton.value = 'edit';
		editButton.classList.add('todo-operation-edit');
		editButton.textContent = '✎';
		var deleteButton = document.createElement('BUTTON');
		deleteButton.value = 'delete';
		deleteButton.classList.add('todo-operation-delete');
		deleteButton.textContent = '×';

		div.appendChild(editButton);
		div.appendChild(deleteButton);

		li.appendChild(input);
		li.appendChild(label);
		li.appendChild(div);

		// `<ul class="todos">` 要素の子要素に追加
		_.element.appendChild(li);
	};

	_.isDeleteButton = function(element) {
		return element.classList.contains('todo-operation-delete');
	};

	_.remove = function(element) {
		var todoElement = findTodoElement(element);
		todoElement.remove();
	};

	function findTodoElement(element) {
		var e = element;
		while (!!e && !e.classList.contains('todo')) {
			e = e.parentNode;
		}
		return e;
	}

	//// ここから ////
	_.isEditButton = function(element) {
		return element.classList.contains('todo-operation-edit');
	};

	_.setEditing = function(element, editing) {
		var editorElement = findTodoElement(element).querySelector('label');
		editorElement.contentEditable = editing ? 'true' : 'inherit';
		if (editing) {
			editorElement.setAttribute('data-backup', editorElement.textContent);
		}
	};

	_.focusToEditor = function(element) {
		var editorElement = findTodoElement(element).querySelector('label');
		editorElement.focus();
	};
	//// ここまで ////
})(todo.dom.todos);
