const mix = require('laravel-mix');

mix.setPublicPath('dist');

mix.js('src/js/content.js', 'dist/js').react();
mix.js('src/js/background.js', 'dist/js');
mix.sass('src/sass/content.scss', 'css');
mix.copy([
    'src/html/popup.html'
], 'dist/html');
mix.copy([
    'src/vendor/normalize.css',
    'src/vendor/skeleton.css'
], 'dist/vendor');
mix.copy([
    'src/img/icon16.png',
    'src/img/icon32.png',
    'src/img/icon48.png',
    'src/img/icon128.png'
], 'dist/img');
mix.copy([
    'src/manifest.json'
], 'dist');
