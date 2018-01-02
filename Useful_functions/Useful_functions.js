/**
 * @desc 判断一个对象的属性是否属于原型，是则 true，不是或属性未定义则 false
 * @param object 对象
 * @param name 属性名
 * @returns {Boolean}
 */
export const hasPrototypeProperty = (object, name) => {
    return !object.hasOwnProperty(name) && (name in object);
}

/**
 * @desc mix函数是Mixin模式的实现，它可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
        Mixin模式指的是将多个类的接口“混入”（mix in）另一个类的编程模式。
 * @returns {Class}
 */
export const mix = (...mixins) => {
    class Mix {}

    for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }

    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if ( key !== "constructor" && key !== "prototype" && key !== "name" ) {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }

    return Mix;
}

/**
 * @desc 对上传的图片进行压缩
 * @param imageData 图片base64数据
 * @param obj 用户自定义的图片数据，可定义width（按原图比例绘制canvas）和压缩的图像质量quality
 * @returns {callback}
 */
export const compressImage = (imageData, obj, callback) => {
    let img = new Image();
    img.src = imageData;
    img.onload = function () {
        // 默认按比例压缩
        let w = this.width,
            h = this.height,
            scale = w / h,
            // 默认图片质量为0.7
            quality = 0.7;
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        w = obj.width || w * quality;
        h = w / scale;
        // 生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute('width');
        anw.nodeValue = w;
        let anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(this, 0, 0, w, h);
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64, obj);
    };
};

/**
 * @desc 将base64数据转成Blob对象
 * @param dataURI
 * @returns {Blob}
 */
export const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
};

export default {
    hasPrototypeProperty,
    mix,
    compressImage,
    dataURItoBlob
};

