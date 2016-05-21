function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            category: '食品',
            subCategory: '碳酸饮料',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            category: '食品',
            subCategory: '碳酸饮料',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '荔枝',
            unit: '斤',
            category: '食品',
            subCategory: '水果',
            price: 15.00
        },
        {
            barcode: 'ITEM000003',
            name: '苹果',
            unit: '斤',
            category: '食品',
            subCategory: '水果',
            price: 5.50
        },
        {
            barcode: 'ITEM000004',
            name: '篮球',
            unit: '个',
            category: '运动器材',
            subCategory: '球类',
            price: 98.00
        },
        {
            barcode: 'ITEM000005',
            name: '羽毛球',
            unit: '个',
            category: '运动器材',
            subCategory: '球类',
            price: 1.00
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'FULL_ONE_HUNDRED_MINUS_TEN',
            barcodes: [
                'ITEM000000',
                'ITEM000004',
                'ITEM000005'
            ]
        }
    ]
}