import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderVisitReportPage } from '../provider-visit-report/provider-visit-report';
import { MemberServicedPage } from '../member-serviced/member-serviced';
import { MoneyearnedPage } from '../moneyearned/moneyearned';
import { DistanceReportPage } from '../distance-report/distance-report';
import { ExpensesReportPage } from '../expenses-report/expenses-report';
import { AverageRatingPage } from '../average-rating/average-rating';
import { MonitoringReportPage } from '../monitoring-report/monitoring-report';
import { BreakdownVisitReportPage } from '../breakdown-visit-report/breakdown-visit-report';

/**
* Generated class for the ProviderReportPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
selector: 'page-provider-report',
templateUrl: 'provider-report.html',
})
export class ProviderReportPage {

items: any;
constructor(public navCtrl: NavController, public navParams: NavParams) {
this.items = [
{
id: 1,
title: 'Visits',
imageUrl: 'assets/imgs/master_Latestvisits.png'
},
{
id: 2,
title: 'Members Serviced',
imageUrl: 'assets/imgs/memberserviced.png'
},
{
id: 3,
title: 'Money Earned',
imageUrl: 'assets/imgs/earned.png'
},
{
id: 4,
title: 'Distance Travelled',
imageUrl: 'assets/imgs/distancetravel.png'
},
{
id: 5,
title: 'Expenses',
imageUrl: 'assets/imgs/expenses.png'
},
{
id: 6,
title: 'Average Rating',
imageUrl: 'assets/imgs/stargreen.png'
},
/* {
id: 7,
title: 'Monitoring Report',
imageUrl: 'assets/imgs/monitor.png'
},*/
{
id: 8,
title: 'Services Summary Report',
imageUrl: 'assets/imgs/breakdown.png'
},
];
}

/**
* Report item clicked 
* @param report item
*/
viewReport(item: any) {
switch (item.id) {
case 1:
this.navCtrl.push('ProviderVisitReportPage');
break;
case 2:
this.navCtrl.push('MemberServicedPage');
break;
case 3:
this.navCtrl.push('MoneyearnedPage');
break;
case 4:
this.navCtrl.push('DistanceReportPage');
break;
case 5:
this.navCtrl.push('ExpensesReportPage');
break;
case 6:
this.navCtrl.push('AverageRatingPage');
break;
case 7:
// this.navCtrl.push(MonitoringReportPage);
break;
case 8:
this.navCtrl.push('BreakdownVisitReportPage');
break;
}
}
}