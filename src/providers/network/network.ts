import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Events } from "ionic-angular";

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {

  previousStatus;
  constructor( public network:Network,public events:Events) {
    this.previousStatus = ConnectionStatus.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatus.Online) {
            this.events.publish('network:offline');
        }
        this.previousStatus = ConnectionStatus.Offline;
    });
    this.network.onConnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatus.Offline) {
            this.events.publish('network:online');
        }
        this.previousStatus = ConnectionStatus.Online;
    });
}

}
