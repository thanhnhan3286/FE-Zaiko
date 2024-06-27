import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from './../../common/utils/utils';
import { disableDebugTools } from '@angular/platform-browser';

export function createFormGroup(formType: string = ''): FormGroup {
    const curentdate: Date = new Date();
    switch (formType) {
        case 'formSearchOutput':
            return new FormGroup({
                orderDateFrom: new FormControl(null, [Utils.checkFromDate('orderDateTo')]),
                orderDateTo: new FormControl(null, [Utils.checkToDate('orderDateFrom')]),
                planOutputDateFrom: new FormControl(null, [Utils.checkFromDate('planOutputDateTo')]),
                planOutputDateTo: new FormControl(null, [Utils.checkToDate('planOutputDateFrom')]),
                planWorkingDateFrom: new FormControl(null, [Utils.checkFromDate('planWorkingDateTo')]),
                planWorkingDateTo: new FormControl(null, [Utils.checkToDate('planWorkingDateFrom')]),
                planDeliveryDateFrom: new FormControl(null, [Utils.checkFromDate('planDeliveryDateTo')]),
                planDeliveryDateTo: new FormControl(null, [Utils.checkToDate('planDeliveryDateFrom')]),
                slipNoFrom: new FormControl(null, [Utils.checkNumber, Utils.checkFromValueNumber('slipNoTo')]),
                slipNoTo: new FormControl(null, [Utils.checkNumber, Utils.checkToValueNumber('slipNoFrom')]),
                customerCodeFrom: new FormControl(null, [Utils.checkFromValue('customerCodeTo')]),
                customerCodeTo: new FormControl(null, [Utils.checkToValue('customerCodeFrom')]),
                customerName: new FormControl(null, [Utils.checkSpace]),
                deliveryCodeFrom: new FormControl(null, [Utils.checkFromValue('deliveryCodeTo')]),
                deliveryCodeTo: new FormControl(null, [Utils.checkToValue('deliveryCodeFrom')]),
                deliveryName: new FormControl(null, [Utils.checkSpace]),
                supplierCodeFrom: new FormControl(null, [Utils.checkFromValue('supplierCodeTo')]),
                supplierCodeTo: new FormControl(null, [Utils.checkToValue('supplierCodeFrom')]),
                supplierName: new FormControl(null, [Utils.checkSpace]),
                ownerCodeFrom: new FormControl(null, [Utils.checkFromValue('ownerCodeTo')]),
                ownerCodeTo: new FormControl(null, [Utils.checkToValue('ownerCodeFrom')]),
                ownerName: new FormControl(null, [Utils.checkSpace]),
                productCodeFrom: new FormControl(null, [Utils.checkFromValue('productCodeTo')]),
                productCodeTo: new FormControl(null, [Utils.checkToValue('productCodeFrom')]),
                productName: new FormControl(null, [Utils.checkSpace]),
                repoFrom: new FormControl(null, [Utils.checkFromValueNumber('repoTo')]),
                repoTo: new FormControl(null, [Utils.checkToValueNumber('repoFrom')]),
                batchNo: new FormControl(null, [Utils.checkNumber]),
                deliveryType: new FormControl("0"),
                deliveryStatus: new FormControl(""),
                isClose: new FormControl(""),
                page: new FormControl(0),
            });
        case 'infoFormOutputDetail':
            return new FormGroup({
                inventoryOutputId: new FormControl(null),
                isClosed: new FormControl(null),
                outputStatus: new FormControl(null),
                orderDate: new FormControl(curentdate.toISOString().substring(0, 10)),
                planOutputDate: new FormControl(null, [Validators.required]),
                planWorkingDate: new FormControl(null),
                planDeliveryDate: new FormControl(null),
                actualOutputDate: new FormControl(null),
                actualDeliverDate: new FormControl(null),
                createSlipType: new FormControl('0'),
                slipNo: new FormControl(null, [Utils.checkSpace, Utils.checkCode]),
                planSupplierSlipNo: new FormControl(null),
                actualSupplierSlipNo: new FormControl(null),
                planCustomerDeliveryDestinationId: new FormControl(null),
                actualCustomerDeliveryDestinationId: new FormControl(null),
                planCustomerId: new FormControl(null),
                actualCustomerId: new FormControl(null),
                planRepositoryId: new FormControl(1),
                actualRepositoryId: new FormControl(null),
                checked: new FormControl('0'),
                destinationCode: new FormControl(null, [Validators.required, Utils.checkSpace, Utils.checkCode, Validators.minLength(6), Validators.maxLength(6)]),
                departmentName: new FormControl(null),
                phoneNumber: new FormControl(null, [Utils.validateFaxPhonePostCode, Validators.maxLength(12), Validators.minLength(10)]),
                faxNumber: new FormControl(null, [Utils.validateFaxPhonePostCode, Validators.maxLength(12), Validators.minLength(10)]),
                postCode: new FormControl(null, [Utils.validateFaxPhonePostCode, Validators.maxLength(8), Validators.minLength(8)]),
                address1: new FormControl(null, [Validators.required]),
                address2: new FormControl(null),
                address3: new FormControl(null),
                address4: new FormControl(null),
                customerCode: new FormControl(null, [Validators.required, Utils.checkSpace, Utils.checkCode, Validators.minLength(6), Validators.maxLength(6)]),
                customerName: new FormControl(null),
                routeCode: new FormControl(null, [Utils.checkSpace, Utils.checkCode]),
                routeName: new FormControl(null),
                courseCode: new FormControl(null, [Utils.checkSpace, Utils.checkCode]),
                courseName: new FormControl(null),
                repositoryCode: new FormControl(null, [Utils.checkSpace, Utils.checkCode]),
                repositoryName: new FormControl(null),
                slipNote: new FormControl(null),
            });
        case 'detailFormPlanDetail':
            return new FormGroup({
                companyId: new FormControl(null),
                planDetailId: new FormControl(null),
                inventoryOutputId: new FormControl(null),
                batchStatus: new FormControl(null),
                batchNo: new FormControl(null),
                productId: new FormControl(null),
                datetimeMngType: new FormControl(null),
                datetimeMngFrom: new FormControl({ value: null, disabled: true }, [Utils.checkFromDate('datetimeMngTo')]),
                datetimeMngTo: new FormControl({ value: null, disabled: true }, [Utils.checkToDate('datetimeMngFrom')]),
                isNumberMng: new FormControl(null),
                numberMngFrom: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Utils.checkFromValueNumber('numberMngTo')]),
                numberMngTo: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Utils.checkToValueNumber('numberMngFrom')]),
                productOwnerId: new FormControl(null),
                repositoryId: new FormControl(1),
                locationId: new FormControl(null),
                inventoryProductType: new FormControl('0'),
                billingPackType: new FormControl({ value: null, disabled: true }, [Validators.required]),
                csPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                blPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                psPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                packCsAmount: new FormControl(null),
                packBlAmount: new FormControl(null),
                totalPlanQuantity: new FormControl(0),
                totalActualQuantity: new FormControl(0),
                planCsPrice: new FormControl(null),
                planBlPrice: new FormControl(null),
                planPiecePrice: new FormControl(null),
                amountTotal: new FormControl(0),
                productCode: new FormControl(null, [Validators.required, Utils.checkSpace]),
                productName: new FormControl(null),
                standardInfo: new FormControl(null),
                customerCode: new FormControl(null, [Validators.required, Utils.checkSpace]),
                customerName: new FormControl(null),
                departmentName: new FormControl(null),
                saleCategory: new FormControl(null),
                delFlg: new FormControl('0'),
            });
        case 'detailFormActualDetail':
            return new FormGroup({
                companyId: new FormControl(null),
                planDetailId: new FormControl(null),
                inventoryOutputId: new FormControl(null),
                batchStatus: new FormControl(null),
                batchNo: new FormControl(null),
                productId: new FormControl(null),
                datetimeMngType: new FormControl(null),
                datetimeMngFrom: new FormControl({ value: null, disabled: true }, [Utils.checkFromDate('datetimeMngTo')]),
                datetimeMngTo: new FormControl({ value: null, disabled: true }, [Utils.checkToDate('datetimeMngFrom')]),
                isNumberMng: new FormControl(null),
                numberMngFrom: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Utils.checkFromValueNumber('numberMngTo')]),
                numberMngTo: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Utils.checkToValueNumber('numberMngFrom')]),
                productOwnerId: new FormControl(null),
                repositoryId: new FormControl(1),
                locationId: new FormControl(null),
                inventoryProductType: new FormControl('0'),
                billingPackType: new FormControl({ value: null, disabled: true }, [Validators.required]),
                csPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                blPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                psPlanQuantity: new FormControl({ value: null, disabled: true }, [Utils.checkNumber, Validators.min(1)]),
                packCsAmount: new FormControl(null),
                packBlAmount: new FormControl(null),
                totalPlanQuantity: new FormControl(0),
                totalActualQuantity: new FormControl(0),
                planCsPrice: new FormControl(null),
                planBlPrice: new FormControl(null),
                planPiecePrice: new FormControl(null),
                amountTotal: new FormControl(0),
                productCode: new FormControl(null, [Validators.required, Utils.checkSpace]),
                productName: new FormControl(null),
                standardInfo: new FormControl(null),
                customerCode: new FormControl(null, [Validators.required, Utils.checkSpace]),
                customerName: new FormControl(null),
                departmentName: new FormControl(null),
                saleCategory: new FormControl(null),
                delFlg: new FormControl('0'),
            });
        default:
            return new FormGroup({});
    }

}
