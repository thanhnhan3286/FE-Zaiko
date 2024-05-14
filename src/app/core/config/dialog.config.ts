import { ApiPath } from './api-path';

export const DialogConfig : any= {
  customer: {
    title: 'Search Customer Dialog',
    url: `${ApiPath.CUSTOMER}/get-all`,
    columReturn: 'customerId, customerName',
    width: 300,
    height: 550,
    listHeader: [
      {
        titleHeader: 'CustomerCode',
        nameColum: 'customerCode',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
      {
        titleHeader: 'CustomerName',
        nameColum: 'customerName',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
    ],
    listParam: []
  },
  destination: {
    title: 'Search Destination Dialog',
    url: `${ApiPath.CUSTOMER_DELIVERY_DEST}/get-all`,
    columReturn: 'destinationCode, departmentName',
    width: 300,
    height: 550,
    listHeader: [
      {
        titleHeader: 'DestCode',
        nameColum: 'destinationCode',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
      {
        titleHeader: 'DestName',
        nameColum: 'departmentName',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
    ],
    listParam: []
  },

  suppplier: {
    title: 'Search Supplier Dialog',
    url: `${ApiPath.SUPPLIER}/get-all`,
    columReturn: 'supplierId, supplierName',
    width: 300,
    height: 550,
    listHeader: [
      {
        titleHeader: 'SupplierCode',
        nameColum: 'supplierCode',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
      {
        titleHeader: 'SupplierName',
        nameColum: 'supplierName',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
    ],
    listParam: []
  },

  product: {
    title: 'Search Product Dialog',
    url: `${ApiPath.PRODUCT_MASTER}/get-all`,
    columReturn: 'productId, productName',
    width: 300,
    height: 550,
    listHeader: [
      {
        titleHeader: 'ProductCode',
        nameColum: 'productCode',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
      {
        titleHeader: 'ProductName',
        nameColum: 'productName',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
    ],
    listParam: []
  },

  owner: {
    title: 'Search Owner Dialog',
    url: `${ApiPath.CUSTOMER}/get-all`,
    columReturn: 'customerId, customerName',
    width: 300,
    height: 550,
    listHeader: [
      {
        titleHeader: 'OwnerCode',
        nameColum: 'customerCode',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
      {
        titleHeader: 'OwnerName',
        nameColum: 'customerName',
        width: 100,
        align: 'left',
        sticky: false,
        isHidden: false,
      },
    ],
    listParam: []
  },
};
