export interface ConsigneeListInterface {
  StatusCode?: number | null;       
  SearchValue?: string | null;
  CmpId?: number;                   
  BrnId?: number;                   
  FyrId?: number;                   
  EmpId?: number | null;          
  FilterType?: string | undefined;  
  LogId?: number;
  NavId?: number;
  MaxRecord?: number;
  SearchColumn?: string | null;
  MultiSearchColumns?: string | null;
  FromDate?: string | null;         
  ToDate?: string | null;           
  DateType?: string;
  PeriodType?: string;
  AllRecord?: string | undefined;
}

export class consigneeListClass implements ConsigneeListInterface {
  StatusCode: number | null = null;
  SearchValue: string | null = null;
  CmpId: number = 1;
  BrnId: number = 4;
  FyrId: number = 23;
  EmpId: number | null = null;
  FilterType: string | undefined = undefined;
  LogId: number = 37835;
  NavId: number = 31080;
  MaxRecord: number = 100;
  SearchColumn: string | null = null;
  MultiSearchColumns: string | null = null;
  FromDate: string | null = null;
  ToDate: string | null = null;
  DateType: string = 'VDATE';
  PeriodType: string = 'This Year';
  AllRecord: string | undefined = undefined;

/*   constructor(data?: Partial<IApiQuery>) {
    if (data) {
      Object.assign(this, data);
    }
  } */
}



export interface ConsigneeApiResponse {
  Id: number;
  Type: string | null;
  Code: string;
  Name: string;
  Rate: number;
  Section: string | null;
  Remarks: string;
  Stscode: number;
  Adduser: string;
  Adddate: string;      // ISO datetime string
  Moduser: string;
  Moddate: string;      // ISO datetime string
  Date: string | null;
  Group: string | null;
  Acm: string;
  Acm2: string | null;
  Gstin: string;
  GstType: string | null;
  City: string;
  State: string;
  Country: string;
  Emp: string | null;
  Category: string | null;
  Branch: string | null;
  ShortCode: string | null;
  Under: string | null;
  Role: string | null;
  Contact: string;
  Email: string;
  Phone: string;
  CLevel: string | null;
  CBranch: string | null;
  DBranch: string | null;
  Image: string | null;
  Value: number;
  Unit: string | null;
  ColorCode: string | null;
  Voucher: string | null;
  Mkey: string | null;
  PrintName: string | null;
  Price: number | null;
  DialCode: string | null;
  GstCode: string | null;
  Desg: string | null;
  Reporting: string | null;
  GstInclusive: string | null;
  PrinterType: string | null;
  Method: string | null;
  Label: number;
  Url: string | null;
  SenderId: string | null;
  OutGoingServer: string | null;
  Port: number;
  Connection: string | null;
  Default: string | null;
  Store: string | null;
  Row: string | null;
  Level: string | null;
  Bin: string | null;
  Warehouse: string | null;
  Item: string | null;
  Major: string | null;
  Minor: string | null;
  PAN: string;
  TAN: string | null;
  CIN: string | null;
  DateFrom: string | null;
  DateTo: string | null;
  MobileNo: string;
  Seq: string | null;
  Wise: string | null;
  Template: string | null;
  Subject: string | null;
  Pincode: string;
  Desc: string | null;
  EarnBase: string | null;
  EarnPoint: number;
  NeverExpire: boolean;
  ExpPeriod: string | null;
  LpcId: number;
  BillValue: number;
  CouponNo: number;
  CouponValue: number;
  DiscType: string | null;
  DiscValue: number;
  ApplyValue: number;
  Validity: number;
  RedmFrom: string | null;
  RedmTo: string | null;
  Frequency: string | null;
  OccersEvery: number;
  EndTime: string | null;
  SerialNo: string | null;
  Valid: string | null;
  Parentid: number | null;
  ParentName: string | null;
  CategoryName: string | null;
  GroupName: string | null;
  NegativeName: string | null;
  NegativeId: number | null;
  Proc: string | null;
  Layout: string | null;
  StartDate: string | null;
  DgtName: string | null;
  Day: number;
  CalCon: string | null;
  VehicleNo: string | null;
  Ownership: string | null;
  OwnerName: string | null;
  FuelType: string | null;
  Model: string | null;
  Reason: string | null;
  Capacity: string | null;
  MaxWeight: string | null;
  MinWeight: string | null;
  Length: string | null;
  Width: string | null;
  Height: string | null;
  DateOfBirth: string | null;
  MfgDate: string | null;
  Whatsapp: string;
  Address: string;
  Volume: string | null;
  Factor: string | null;
  UseIn: string | null;
  Added: string | null;
  ApplyIn: string | null;
  System: boolean;
  Hsn: string | null;
}

export interface consigneeListApiInterface {
  consignee: ConsigneeApiResponse[];
}

export interface consigneeDeleteInterface {
 Id: number;
 User:string;
 Reason:string;
}

export class consigneeDeleteClass implements consigneeDeleteInterface {
  Id: number = 0;
  User: string = 'SYSTEM';
  Reason: string = '';
}


export interface Branch {
  Id: string;
  Text: string;
  Value: string;
  Value1: string | null;
  Value2: string | null;
}

export interface Master {
  Id: string;
  Text: string;
  Value: string;
  Value1: string | null;
  Value2: string | null;
}

export interface consigneeCancelInterface {
Id: number;
StatusCode: number;
User: string;
Reason: string;
}

export class consigneeCancelClass implements consigneeCancelInterface {
  Id: number = 0;
  StatusCode: number = 0;
  User: string = 'SYSTEM';
  Reason: string = '';
}