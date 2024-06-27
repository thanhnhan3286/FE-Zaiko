import { ApiPath } from '@core/config';

export const DialogOptionApiConfig = {
    customerCode: {
        title: '出荷先コード',
        url: ApiPath.CUSTOMER,
        width: 400,
        height: 0,
        columReturn: 'customerCode',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'customerCode', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'customerName', width: 200, align: 'center'
            }
        ],
        listParam: []
    },
    destinationCode: {
        title: '納品先コード',
        url: ApiPath.CUSTOMER_DELIVERY_DEST,
        width: 500,
        height: 0,
        columReturn: 'destinationCode',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'destinationCode', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'departmentName', width: 200, align: 'center'
            }
        ],
        listParam: []
    },
    supplierCode: {
        title: '仕入先コード',
        url: ApiPath.SUPPLIER,
        width: 500,
        height: 0,
        columReturn: 'supplierCode',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'supplierCode', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'supplierName', width: 200, align: 'center'
            }
        ],
        listParam: []
    },
    ownerCode: {
        title: '所有者コード',
        url: ApiPath.CUSTOMER,
        width: 400,
        height: 0,
        columReturn: 'customerCode',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'customerCode', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'customerName', width: 200, align: 'center'
            }
        ],
        listParam: []
    },
    productCode: {
        title: '商品コード',
        url: ApiPath.PRODUCT_CODE,
        width: 400,
        height: 0,
        columReturn: 'productCode',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'productCode', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'name1', width: 200, align: 'center'
            }
        ],
        listParam: []
    },
    productInventory: {
        title: 'ヘルプアイコン',
        url: ApiPath.PRODUCT_INVENTORY,
        width: 400,
        height: 0,
        columReturn: 'inventoryId',
        listHeader: [
            {
                titleHeader: 'コード', nameColum: 'inventoryId', width: 100, align: 'left'
            },
            {
                titleHeader: '名前', nameColum: 'productId', width: 200, align: 'center'
            }
        ],
        listParam: [{}]
    },
}