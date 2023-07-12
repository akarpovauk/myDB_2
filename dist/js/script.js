/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			'Логан',
			'Лига справедливости',
			'Ла-ла лэнд',
			'Одержимость',
			'Скотт Пилигрим против...'
		]
	};
	
	const adv = document.querySelectorAll('.promo__adv img'),
		bg = document.querySelector('.promo__bg'),
		genre = bg.querySelector('.promo__genre'),
		movieList = document.querySelector('.promo__interactive-list'),
		form = document.querySelector('form.add'),
		input = form.querySelector('.adding__input'),
		checkbox = form.querySelector('input[type = checkbox]');
	
	const deleteAdv = (arr) => {
		arr.forEach(item => {
			item.remove();
		});
	};

	const makeChanges = () => {
		genre.textContent = 'драма';
		bg.style.background = 'url(img/bg.jpg) center top/cover  no-repeat';
	};

	const sortArr = (arr) => {
		arr.sort();
	};
	
	function createMovieList(filmsDB, parent) {
		parent.innerHTML = '';
		sortArr(filmsDB);

		filmsDB.forEach((film, i) => {
			parent.innerHTML += `<li class="promo__interactive-item">${i+1}. ${ film}
			<div class="delete"></div></li>`;
		});
	
		document.querySelectorAll('.delete').forEach((delBtn, i) => {
			delBtn.addEventListener('click', () => {
				delBtn.parentElement.remove();
				movieDB.movies.splice(i, 1);

				createMovieList(filmsDB, parent);
			});
		});
	}
	
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let newFilm = input.value.trim();
		if (newFilm) {
			if (newFilm.length > 15) {
				newFilm = `${newFilm.slice(0, 15)}...`;
			}
			if (checkbox.checked) {
				console.log('Добавляем любимый фильм');
			}
			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);
			createMovieList(movieDB.movies, movieList);

		} 
		e.target.reset();
	});

	deleteAdv(adv);
	makeChanges();
	createMovieList(movieDB.movies, movieList);

});






