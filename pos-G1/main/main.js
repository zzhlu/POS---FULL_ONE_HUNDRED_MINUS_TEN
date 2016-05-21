function printReceipt(tags) {

    var allItems = loadAllItems();
    var cartItems = buildCartItems(tags, allItems);

    var promotions = loadPromotions();
    var receiptItems = buildReceiptItems(cartItems, promotions);
    var receipt = buildReceipt(receiptItems, promotions);
    var receiptText = generateReceiptText(receipt, promotions);
    console.log(receiptText);
}

function findAllItems(barcode, allItems) {

    for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].barcode === barcode)
            return allItems[i];
    }
}

function findExistCartItem(barcode, cartItems) {

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].item.barcode === barcode)
            return cartItems[i];
    }
}

function buildCartItems(tags, allItems) {

    var cartItems = [];

    tags.forEach(function (tag) {
        var tagArray = tag.split('-');
        var item = findAllItems(tagArray[0], allItems);
        var count = parseFloat(tagArray[1] || 1);

        var cartItem = findExistCartItem(tagArray[0], cartItems);
        if (cartItem)
            cartItem.count++;
        else
            cartItems.push({item: item, count: count});
    });

    return cartItems;
}

function isExist(element, collection) {

    for (var i = 0; i < collection.length; i++) {
        if (collection[i] === element)
            return true;
    }

    return false;
}

function getPromotionType(cartItem, promotions) {

    for (var i = 0; i < promotions.length; i++) {
        if (isExist(cartItem.item.barcode, promotions[i].barcodes))
            return promotions[i].type;
    }
}

function buildReceiptItems(cartItems) {

    var receiptItems = [];

    cartItems.forEach(function (cartItem) {
        var subtotal = cartItem.item.price * cartItem.count;
        receiptItems.push({cartItem: cartItem, subtotal: subtotal});
    });

    return receiptItems;
}

function buildReceipt(receiptItems, promotions) {

    var favourableGoodsTotal = 0;
    var actualGoodsTotal = 0;

    receiptItems.forEach(function (receiptItem) {
        var promotionType = getPromotionType(receiptItem.cartItem, promotions);
        if (promotionType === 'FULL_ONE_HUNDRED_MINUS_TEN') {
            favourableGoodsTotal += receiptItem.subtotal;
        } else {
            actualGoodsTotal += receiptItem.subtotal;
        }
    });

    return {receiptItems: receiptItems, favourableGoodsTotal: favourableGoodsTotal, actualGoodsTotal: actualGoodsTotal};
}

function formatPrice(price) {

    return price.toFixed(2);
}

function generateReceiptText(receipt, promotions) {

    var receiptText = '***<没钱赚商店>购物清单***\n' +
        generateReceiptItemsText(receipt.receiptItems) +
        '----------------------\n';

    if (receipt.favourableGoodsTotal >= 100) {
        receiptText += generateFitFavourableText(receipt, promotions);
    } else {
        receiptText += generateNotFitFavourableText(receipt);
    }

    return receiptText + '**********************';
}

function generateReceiptItemsText(receiptItems) {

    var receiptItemsText = '';

    receiptItems.forEach(function (receiptItem) {
        receiptItemsText += '名称：' + receiptItem.cartItem.item.name +
            '，数量：' + receiptItem.cartItem.count + receiptItem.cartItem.item.unit +
            '，单价：' + formatPrice(receiptItem.cartItem.item.price) +
            '(元)，小计：' + formatPrice(receiptItem.subtotal) + '(元)\n';
    });

    return receiptItemsText;
}

function generateFitFavourableText(receipt, promotions) {

    var save = parseInt(receipt.favourableGoodsTotal / 100) * 10;
    receipt.favourableGoodsTotal -= save;

    return generateNotFavourableGoodsText(receipt.receiptItems, promotions) +
        "参与优惠总价：" + formatPrice(receipt.favourableGoodsTotal) +
        "(元)，优惠：" + formatPrice(save) + "(元)" + "\n----------------------\n" +
        "总计：" + formatPrice(receipt.favourableGoodsTotal + receipt.actualGoodsTotal) +
        "(元)\n节省：" + formatPrice(save) + "(元)\n";
}

function generateNotFavourableGoodsText(receiptItems, promotions) {

    var notFavourableGoodsText = '不参与优惠商品：\n';

    receiptItems.forEach(function (receiptItem) {
        var promotionType = getPromotionType(receiptItem.cartItem, promotions);
        if (promotionType !== 'FULL_ONE_HUNDRED_MINUS_TEN') {
            notFavourableGoodsText += '名称：' + receiptItem.cartItem.item.name + '，价格：' + formatPrice(receiptItem.subtotal) + '(元)\n';
        }
    });

    return notFavourableGoodsText;
}

function generateNotFitFavourableText(receipt) {

    return "总计：" + formatPrice(receipt.actualGoodsTotal + receipt.favourableGoodsTotal) + "(元)\n";
}