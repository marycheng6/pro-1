/*
 * @Author: wangliang
 * @Date: 2022-01-14 15:55:31
 * @LastEditors: wangliang
 * @LastEditTime: 2022-01-14 22:28:58
 * @FilePath: \魔方c:\Users\nicowang\Documents\WeChat Files\jay707591844\FileStorage\File\2022-01\pro-1\src\mian.js
 */ const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last'); //获取新增按钮dom
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
];
const simplifyUrl = (url)=>{
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, ''); //删除 /开头的内容
};
const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
        <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg>
        </div>
        </div>
        </li>`);
        $li.insertBefore($lastLi);
        $li.on("click", ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation(); //阻止冒泡
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你的网址是啥？');
    console.log(url);
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const { key  } = e;
    for(let i = 0; i < hashMap.length; i++){
        console.log(hashMap[i]);
        if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
    }
});

//# sourceMappingURL=index.037cb995.js.map
