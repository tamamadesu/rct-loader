/*
* @Author: tamamadesu
* @Date:   2018-01-05 15:32:23
 * @Last Modified by: tamamadesu
 * @Last Modified time: 2018-01-08 12:20:36
*/

const loaderUtils = require('loader-utils');
const RctContent  = require('./template');

const parseLoaderPath = 'react-loader/lib/parseLoader';

module.exports = function(content){

    if(this.cacheable){
        this.cacheable();
    };

    const loaderString = (type)=>{

        let str = '!';

        let {lang,scoped} = RctContent(content)[type];

        switch (type){
            case 'template':
                str += 'file-loader!';
                break;
            case 'style':
                str += 'style-loader!css-loader!';
                break;
            case 'script':
                str += 'babel-loader!';
                break;
        }

        str += parseLoaderPath + `?type=${type}&lang=${lang}&isScoped=${scoped}!` + this.resourcePath;

        return `require(${loaderUtils.stringifyRequest(this,str)})`;
    }

    let output = '\n /* style */' + loaderString('style') + '\n __react_exports__ = ' + loaderString('script') + '\n';
    output += 'module.exports = __react_exports__';

    return output;
}