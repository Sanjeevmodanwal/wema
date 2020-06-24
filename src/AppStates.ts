import { Events } from "ionic-angular";

export class AppState{
    public static Country:string;
    public static CountryCode:string;
    public static IsMember:boolean;
    public static IsWemaLife:boolean;
    public static UserCred:any;
    public static IsMultipleCompay:boolean;
    public static DeviceToken:any;
    public static Location:{latitude:any,longitude:any};
    public static CartCount:number=0;
    public static UniqueId:string;
    public static BookMore:boolean;
    public static CurrentCompany:any; 
    public static Second:number=0;
    public static CartTimer:string="00:00";
    public static CheckinTimer:string="00:00";
    public static PaymentGatewayId:string='4';
    public static Height:number=0;
    public static IsAvailabilityEdit:boolean=true;
    public static ManagerVerified:any;
    public static EmailVerified:boolean;
    public static MenuEnabled:boolean;
    public static IsDashboard:boolean=true;
    public static GlobalBookingServiceId:number=0;
    public static GlobalBookingProviderId:number=0;
    public static GlobalBookingCompanyId:number=0;
}