export interface CommonResponse {
    delFlg: string;
    createBy: string;
  }
  export interface CommonSettingArrayModel {

    CAL_ROUND_TYPE?: CommonSettingModel | any;
    COMPANY_ALIAS_NAME?: CommonSettingModel | any;
    INVENTORY_PRODUCT_TYPE?: CommonSettingModel | any;
    NUM_DAY_EDIT_RETURN_PRODUCT?: CommonSettingModel | any;
    TAX_RATE?: CommonSettingModel | any;
    TAX_ROUND_TYPE?: CommonSettingModel | any;
    TOTAL_ROUND_TYPE?: CommonSettingModel | any;
    MAXIMUM_PRINT_QUANTITY?: CommonSettingModel | any;
    REPOSITORY_ALIAS_CODE_DEFAULT?: CommonSettingModel | any;
    MAXIMUM_SEARCH_RECORDS?: CommonSettingModel | any;
  }
  export interface CommonSettingModel {
    code: keyof CommonSettingArrayModel;
    company_id?: number;
    createBy?: number;
    createDate?: string;
    delFlg?: string;
    description?: string;
    idx: number;
    updateBy?: number;
    updateDate?: string;
    value1: string;
    value2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
  }

  export interface Pageable {
    totalPages:number;
    totalElements:number;
    pageSize:number;
    currentPage:number;
    
  }