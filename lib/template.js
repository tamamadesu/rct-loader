/*
* @Author: tamamadesu
* @Date:   2018-01-05 17:18:57
* @Last Modified by:   tamamadesu
* @Last Modified time: 2018-01-06 16:24:20
* @Description  按类型分离组件内容
*/

module.exports = function(content){

    const getLangType = cont => {
        let matchCont = cont.match(/lang=[\'\"]?([^\'\"]*)[\'\"]?/i);
        return matchCont instanceof Array ? matchCont[1] : null;
    };

    const getContByType = (lang,matchContArr)=>{

        if(!matchContArr || !matchContArr[0]){
            return {};
        }

        let content   = '';
        let scoped    = false;
        let matchCont = matchContArr[0];

        switch(lang){
            case 'template':

                let templateHeader = matchCont.match(/\<template[^>]*\>/)[0].replace('');
                lang    = getLangType(templateHeader) || 'html';
                content = matchCont.replace(/\<\/?template[^>]*\>/g,'');

                break;
            case 'style':

                let styleHeader = matchCont.match(/\<style[^>]*\>/)[0];
                lang    = getLangType(styleHeader) || 'css';
                scoped  = styleHeader.search('scoped') !== -1;
                content = matchCont.replace(/\<\/?style[^>]*\>/g,'');

                break;
            case 'script':
                content = matchCont.replace(/\<\/?script\>/g,'');

                break;
        }
        return { lang, content, scoped };
    }

    let templateCont = content.match(/\<template[^]*\>[^]+\<\/template\>/);
    let scriptCont   = content.match(/\<script[^]*\>[^]+\<\/script\>/);
    let styleCont    = content.match(/\<style[^]*\>[^]+\<\/style\>/)

    return {
        template : getContByType('template',templateCont),
        style    : getContByType('style',styleCont),
        script   : getContByType('script',scriptCont),
    }
};