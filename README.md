# Django-React-ECommerce


<ul>
<li>Front-End: React + Bootstrap 
<ul>
<li>https://bootswatch.com/
<li>https://react-bootstrap.github.io/
<li>https://cdnjs.com/libraries/font-awesome
</ul>
<li>Back-end: Python-Django</li>
<li>State management: Redux</li>
</ul>


To create virtual envrionnement:<br>
```python3 -m venv ./py_ecommerce```
<br>
To start the env:<br>
```source py_ecommerce/bin/activate```


NPM-like command to initiate Django project:<br>
```django-admin startproject backend```


To run the server (while in ``` root ```):<br>
```python manage.py runserver```


Everytime a change is made to the DB model:<br>
``` python manage.py makemigrations ```<br>
``` python manage.py migrate ```
<br>

Do not forget to have a migrations folder with a ```__init__.py``` in it

<img src="https://github.com/alexnesov/Django-React-ECommerce/blob/main/arch.png">


<img src="https://github.com/alexnesov/Django-React-ECommerce/blob/main/db_model_diagram.png">

## Questions and answers

<b>How is the front-end service "aware" of the user and of the fact that he is logged in?</b>
<br>
JWT takes care of that
