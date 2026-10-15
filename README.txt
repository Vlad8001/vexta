VEXTA — сайт для GitHub Pages
=============================

Структура:
  index.html        — головна (англійська, основна мова) → відкриється на vexta.site
  ua/index.html     — українська версія → vexta.site/ua/
  CNAME             — домен vexta.site (не видаляйте)
  .nojekyll         — технічний файл (не видаляйте)

Як залити на GitHub Pages:
  1. Створіть репозиторій і завантажте ВСІ ці файли в корінь (разом з папкою ua/).
  2. Settings → Pages → Source: гілка main, папка / (root). Збережіть.
  3. Settings → Pages → Custom domain: vexta.site (CNAME вже у файлах).
  4. У реєстратора домену додайте DNS-записи на GitHub Pages:
     A    @   185.199.108.153
     A    @   185.199.109.153
     A    @   185.199.110.153
     A    @   185.199.111.153
     (або CNAME для www → ВАШ_ЮЗЕР.github.io)
  5. Увімкніть "Enforce HTTPS" після активації домену.

ВАЖЛИВО — Calendly:
  Зараз стоїть тимчасове посилання. Замініть його на ваше:
  у index.html і в ua/index.html знайдіть рядок
      var CALENDLY_URL='https://calendly.com/vexta-b2b/30min';
  і вставте ваш справжній лінк Calendly (напр. https://calendly.com/ваш-акаунт/30min).
  Після цього всі кнопки "Book a call / Забронювати дзвінок" і календар у блоці
  контактів почнуть відкривати ваш Calendly.

Пошта hello@vexta.site — переконайтесь, що вона справді існує/налаштована.
