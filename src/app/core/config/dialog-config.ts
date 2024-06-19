import { ApiPath } from ".";

export const dialogOptions: any = {
  supplierDialog: {
    title: '仕入先',
    url: ApiPath.SUPPLIER,
    columReturn: 'supplierCode',
    listHeader: [
      { titleHeader: '仕入先コード', nameColum: 'supplierCode', width: 100 },
      { titleHeader: '仕入先名称', nameColum: 'supplierName', width: 150 },
    ],
    listParam: [],
  },
  customerDialog: {
    title: '出荷先',
    url: ApiPath.CUSTOMER,
    columReturn: 'customerCode',
    listHeader: [
      { titleHeader: '出荷先コード', nameColum: 'customerCode', width: 100 },
      { titleHeader: '出荷先名称', nameColum: 'customerName', width: 150 },
    ],
    listParam: [],
  },
  ownerDialog: {
    title: '出荷先',
    url: ApiPath.CUSTOMER,
    columReturn: 'customerCode',
    listHeader: [
      { titleHeader: '出荷先コード', nameColum: 'customerCode', width: 100 },
      { titleHeader: '出荷先名称', nameColum: 'customerName', width: 150 },
    ],
    listParam: [],
  },
  customerDeliveryDest: {
    title: '納品先',
    url: ApiPath.CUSTOMER_DELIVERY_DEST,
    columReturn: 'destinationCode',
    listHeader: [
      { titleHeader: '納品先コード', nameColum: 'destinationCode', width: 100 },
      { titleHeader: '部署名', nameColum: 'departmentName', width: 150 },
      { titleHeader: '電話番号', nameColum: 'phoneNumber', width: 150 },
      { titleHeader: '住所1', nameColum: 'address1', width: 150 },
      { titleHeader: 'リードタイム', nameColum: 'leadTime', width: 150 },
    ],
    listParam: [],
  },
  product: {
    title: '商品',
    url: ApiPath.PRODUCT_MASTER,
    columReturn: 'productCode',
    listHeader: [
      { titleHeader: '商品コード', nameColum: 'productCode', width: 100 },
      { titleHeader: 'UPC 1', nameColum: 'upcCd1', width: 150 },
      { titleHeader: 'UPC 2', nameColum: 'upcCd2', width: 150 },
      { titleHeader: '商品名称1', nameColum: 'name1', width: 150 },
      { titleHeader: '規格', nameColum: 'standardInfo', width: 150 },
      { titleHeader: '商品分類1コード', nameColum: 'categoryCode1', width: 150 },
      { titleHeader: '商品分類2コード', nameColum: 'categoryCode2', width: 150 },
      { titleHeader: '備考', nameColum: 'notes', width: 150 },
      { titleHeader: '荷姿・ピース・単位名称', nameColum: 'pieceUnitCode', width: 150 },
      { titleHeader: 'リードタイム', nameColum: 'leadTime', width: 150 },
    ],
    listParam: [],
  },
  productInventory: {
    title: '商品',
    url: ApiPath.PRODUCT_INVENTORY,
    columReturn: 'inventoryId',
    listHeader: [
      { titleHeader: '商品ID', nameColum: 'productId', width: 100 },
      { titleHeader: '管理日付', nameColum: 'datetimeMng', width: 150 },
      { titleHeader: '管理番号', nameColum: 'numberMng', width: 150 },
      { titleHeader: '数量', nameColum: 'customerCode', width: 150 },
    ],
    listParam: [],
  },

};
export const fieldMappings = {
  supplierCodeFrom: 'supplierCodeFrom',
  supplierCodeTo: 'supplierCodeTo',
  customerCodeFrom: 'customerCodeFrom',
  customerCodeTo: 'customerCodeTo',
  productCodeFrom: 'productCodeFrom',
  productCodeTo: 'productCodeTo',
  destinationCodeFrom: 'destinationCodeFrom',
  destinationCodeTo: 'destinationCodeTo',
  ownerCodeTo:'ownerCodeTo',
  ownerCodeForm:'ownerCodeForm',
  customerDeliveryDest:'planForm.planCustomerDeliveryDestinationId',
  customer: 'planForm.planCustomerId',
  product:'productCode',
  customerCode:'customerCode',
  productInventory:'productInventoryId'
}