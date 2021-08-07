import {
    riceIcon,
    noodleIcon,
    hotpotIcon,
    friedfoodsIcon
} from './contants'

const getImage = (categoryName) => {
    resultIcon = null;
    if(categoryName === 'Mì') {
        resultIcon = noodleIcon;
    } else if (categoryName === 'Cơm') {
        resultIcon = riceIcon;
    } else if(categoryName === 'Lẫu') {
        resultIcon = hotpotIcon;
    } else if(categoryName === 'Đồ xào') {
        resultIcon = friedfoodsIcon;
    }
    return resultIcon;
}

export default getImage;