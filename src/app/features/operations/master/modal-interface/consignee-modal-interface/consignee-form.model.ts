export interface ConsigneeFormInterface {
  cneId: number;
  cneGstIn: string;
  cneName: string;
  cneCode: string;
  cnePrintAs: string;
  cneAddress: string;
  cneCtyId: number;
  cnePinCode: string;
  cneStaId: number;
  cneCntId: number;
  cneContactPerson: string;
  cnePhoneNo: string;
  cneMobileNo: string;
  cneEmail: string;
  cnePan: string;
  cneWhatsApp: string;
  cneCreateAcm: boolean;
  cneRemarks: string;
  cneStsCode: number;
  cneAddUser: string;
  cneAddDate: string; // ISO date string
  cneModUser: string;
  cneModDate: string; // ISO date string
  cneVMobile: boolean;
  cneVPan: boolean;
  cneVGstin: boolean;
  cneVWno: boolean;
  cneVEmail: boolean;
  cneVPin: boolean;
  cneCtyName: string;
  cneStaName: string;
  cneCntName: string;
  cneNameId: number;
  reason: string;
}

export class ConsigneeFormClass {
  cneId: number = 0;
  cneGstIn: string = '';
  cneName: string = '';
  cneCode: string = '';
  cnePrintAs: string = '';
  cneAddress: string = '';
  cneCtyId: number = 0;
  cnePinCode: string = '';
  cneStaId: number = 0;
  cneCntId: number = 0;
  cneContactPerson: string = '';
  cnePhoneNo: string = '';
  cneMobileNo: string = '';
  cneEmail: string = '';
  cnePan: string = '';
  cneWhatsApp: string = '';
  cneCreateAcm: boolean = true;
  cneRemarks: string = '';
  cneStsCode: number = 0;
  cneAddUser: string = 'SYSTEM';
  cneAddDate: string = new Date().toISOString();
  cneModUser: string = '';
  cneModDate: string = new Date().toISOString();
  cneVMobile: boolean = true;
  cneVPan: boolean = true;
  cneVGstin: boolean = true;
  cneVWno: boolean = true;
  cneVEmail: boolean = true;
  cneVPin: boolean = true;
  cneCtyName: string = '';
  cneStaName: string = '';
  cneCntName: string = '';
  cneNameId: number = 0;
  reason: string = '';

/*   constructor(init?: Partial<ConsigneeFormClass>) {
    Object.assign(this, init);
  } */
}
