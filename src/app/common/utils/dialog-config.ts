import { ApiPath } from '@core/config';

export const DialogConfig = {
    customer: {
        title: '顧客との対話',
          url: ApiPath.CUSTOMER,
          columReturn: 'customerId',
          listHeader: [
            { titleHeader: 'コード', nameColum: 'customerCode', width: 150 },
            { titleHeader: '名前', nameColum: 'customerName', width: 150 }
          ],
          listParam: [],
          width: 450,
          height: 550
    },
    deliveryDestination: {
      title: '配信ダイアログ',
          url: ApiPath.CUSTOMER_DELIVERY_DEST,
          columReturn: 'deliveryDestinationId',
          listHeader: [
            { titleHeader: 'コード', nameColum: 'destinationCode', width: 150 },
            { titleHeader: '名前', nameColum: 'departmentName', width: 150 }
          ],
          listParam: [],
          width: 450,
          height: 550
    },
    supplier: {
      title: '仕入先コ',
          url: ApiPath.SUPPLIER,
          columReturn: 'supplierId',
          listHeader: [
            { titleHeader: 'コード', nameColum: 'supplierCode', width: 150 },
            { titleHeader: '名前', nameColum: 'supplierName', width: 150 }
          ],
          listParam: [],
          width: 450,
          height: 550
    },
    owner: {
      title: 'オーナーとの対話',
          url: ApiPath.CUSTOMER,
          columReturn: 'customerId',
          listHeader: [
            { titleHeader: 'コード', nameColum: 'customerCode', width: 150 },
            { titleHeader: '名前', nameColum: 'customerName', width: 150 }
          ],
          listParam: [],
          width: 450,
          height: 550
    },
    product: {
      title: '製品との対話',
          url: ApiPath.PRODUCT_MASTER,
          columReturn: 'productId',
          listHeader: [
            { titleHeader: 'コード', nameColum: 'productCode', width: 110 },
            { titleHeader: '名前-1', nameColum: 'name1', width: 140 },
            { titleHeader: '名前-2', nameColum: 'name2', width: 140 },
            { titleHeader: '名前-3', nameColum: 'name3', width: 140 },
            { titleHeader: '名前-4', nameColum: 'name4', width: 140 },
            { titleHeader: '名前-5', nameColum: 'name5', width: 140 }
          ],
          listParam: [],
          width: 450,
          height: 550
    }
};