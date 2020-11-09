const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // работа с html и шаблонами
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // минификация и запись в файлы css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // чистка выходной директории
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 
const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}
// режим работы: build или dev или comps (process.env.NODE_ENV получить системную переменную ОС NODE_ENV)
const isDev = (process.env.NODE_ENV === 'development'); 
const isProd = !isDev && (process.env.NODE_ENV !== 'components'); 
const isComps = !isDev && !isProd;

console.log('isDev = ', isDev);
console.log('isProd = ', isProd);
console.log('isComps = ', isComps);

/**
 * Оптимизирует сборку в режиме production
 */
const optimization = () => { // правила для оптимизации (минификации) в зависимости от режима сборки
    const config = {
                        splitChunks:{
                            chunks:'all'// какие фрагменты будут выбраны для оптимизации
                        }
                    };
    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
};

/**
 * возвращает точки входа в зависимости от режима сборки
 * isDev || isProd == сборка всех страниц проекта и его дополнительных точек входа
 * isComps == сборка только компонентов
 */
function getEntry(){
    if(isDev || isProd) return {
        'index': PATHS.source + '/views/pages/index/index.js',
        'about': PATHS.source + '/views/pages/about/about.js'
    };
    if (isComps) return {
        'components': PATHS.source + '/views/components/components.js'
    };
}
/**
 * Возвращает набор плагинов в зависимости от режима сборки (isDev,isProd,isComps)
 */
function getPlugin(){
    if(isDev || isProd) return [
        new HtmlWebpackPlugin({ // передача плагину шаблона pug == написать функцию для вставки страниц!!!
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            template: PATHS.source + '/views/pages/index/index.pug'
        }),
        // new HtmlWebpackPlugin({ // передача плагину шаблона pug
        //     filename: 'about.html',
        //     chunks: ['about'],
        //     inject: true,
        //     template: PATHS.source + '/views/pages/about/about.pug'
        // }),
        new CleanWebpackPlugin(), // чистит pruduction директорию перед новой сборкой
        new MiniCssExtractPlugin({ // сохранение css в файлы
            filename: 'css/[name]-bandle.css'
        })
    ];
    if(isComps) return [
        new HtmlWebpackPlugin({ // передача плагину шаблона pug == написать функцию для вставки страниц!!!
            filename: 'components.html',
            chunks: ['components'],
            inject: true,
            template: PATHS.source + '/views/components/components.pug'
        }),
        new CleanWebpackPlugin(), // чистит pruduction директорию перед новой сборкой
        new MiniCssExtractPlugin({ // сохранение css в файлы
            filename: 'css/[name]-bandle.css'
        })
    ];
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: getEntry(),
    // entry: { // точки входя для js файлов
    //     'index': PATHS.source + '/views/pages/index/index.js',
    //     'about': PATHS.source + '/views/pages/about/about.js'
    // },
    output:{ // шаблон имен и местоположение для выходных файлов
        filename: 'app/[name]-bandle.js',
        path: PATHS.build
    },
    devServer:{
        port: 4200,
        hot: isDev
    },
    optimization: optimization(),
    devtool: isDev ? 'source-map': '', // включение source-map в режиме разработки
    plugins: getPlugin(),
    module:{ // loaders
        rules: [
            { // Pug
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            { // SASS, SCSS
                test: /\.s[ac]ss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../', 
                            hmr: isDev, // Hot Module Replacement - разрешает горячую замену (для watch), нужна в режиме разработки
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ] 
            },
            { // Images
                test: /\.(png|jpg|svg|gif)$/,
                // use:['file-loader'],
                loader: 'file-loader',
                options:{
                    outputPath: 'img'
                }
            },
            { // правило для подключения шрифтов
                test: /\.(ttf|woff|woff2|eot)$/,
                // use:['file-loader']
                loader: 'file-loader',
                options:{
                    outputPath: 'fonts',
                    name: '[name].[ext]'
                }
            }

        ]
    }
}