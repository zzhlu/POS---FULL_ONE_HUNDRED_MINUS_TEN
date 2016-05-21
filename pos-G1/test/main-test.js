describe('When buying goods in line with preferential conditions, and there does not participate in this offer goods', function () {
    var allItems;
    var promotions;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        promotions = loadPromotions();
        inputs = [
            'ITEM000004',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000003-2'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printReceipt(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：篮球，数量：1个，单价：98.00(元)，小计：98.00(元)\n' +
            '名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
            '名称：羽毛球，数量：5个，单价：1.00(元)，小计：5.00(元)\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '不参与优惠商品：\n' +
            '名称：苹果，价格：11.00(元)\n' +
            '参与优惠总价：102.00(元)，优惠：10.00(元)\n' +
            '----------------------\n' +
            '总计：113.00(元)\n' +
            '节省：10.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});

describe('When buying goods does not meet the conditions for preferential trade', function () {
    var allItems;
    var promotions;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        promotions = loadPromotions();
        inputs = [
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005',
            'ITEM000003-2'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printReceipt(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
            '名称：羽毛球，数量：5个，单价：1.00(元)，小计：5.00(元)\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '总计：25.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});