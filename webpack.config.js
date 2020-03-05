const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // Путь, где будут складироваться сгенерированные скрипты
  .setOutputPath('./var/resources/')
  // Публичный путь на сервере, например /var/resources/ (для локальной работы примера сменил путь)
  // Все пути, используемые в сгенерированный файлах будут указывать на публичный путь,
  // например путь до изображения в css файле после генерации будет указывать на: /var/resources/images/img.png
  .setPublicPath('../../var/resources/')
  // Не нужен, если публичный путь является абсолютным
  .setManifestKeyPrefix('build')

  // Точки входа. Каждая точка объединяет в себе какой-то обособленный функционал,
  // например: хэдер, футер, страница сайта
  .addEntry('main', './src/main.js')
  .addEntry('checkout', './src/checkout.js')
  // Выделяем общий код, используемый в точках входа в отдельные файлы
  .splitEntryChunks()
  // Выставляем минимальный размер файла, при котором будет работать разделение
  .configureSplitChunks(function (splitChunks) {
    splitChunks.minSize = 0;
  })
  // Для работы файлов, генерируемых вебпак необходим специальный runtime код. Обычно он добавляется к каждому файлу,
  // но можно выделить его в отдельный файл.
  .enableSingleRuntimeChunk()
  // Очищаем директорию, в которую будут перемещены файлы
  .cleanupOutputBeforeBuild()
  // Добавляем source maps
  .enableSourceMaps(!Encore.isProduction())
  // Добавляем хэш, зависящий от контента файла для кэширования ресурсов браузером
  .enableVersioning(Encore.isProduction())

  // enables @babel/preset-env polyfills
  // Добавляем обработку функций, не поддерживаемых в старых браузерах
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  });

module.exports = Encore.getWebpackConfig();
