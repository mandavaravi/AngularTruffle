import { ContractService } from "./../../services/contract/contract.service";
import { Component } from "@angular/core";
import { ThreeBox } from "../../services/3box.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Identicon } from "../../services/identicon";
import { Md5 } from "ts-md5/dist/md5";
import { EmartService } from "src/app/services/instacart/emart.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  direction: string;
  balance: string;
  profile;
  url;
  data;

  constructor(
    private contract: ContractService,
    private sanitizer: DomSanitizer,
    private threebox: ThreeBox,
    protected emartService: EmartService
  ) {
    alert(this.emartService.getDirection() != undefined);
    if (this.emartService.getDirection() == undefined) {
      this.contract
        .connectAccount()
        .then((value: any) => {
          this.direction = value[0];
          this.getDetails(this.direction);
          this.emartService.setDirection(this.direction);
          console.log(this.direction);
          // this.profile = this.threebox.getProfile(this.direction).then((response) => {
          //     console.log(response);
          //     this.profile = response;
          //     this.url = this.profile.image[0].contentUrl["/"];
          //     alert("img url in acc :: "+this.url);
          //   });
          this.getImage(this.direction);
        })
        .catch((error: any) => {
          this.contract.failure(
            "Could't get the account data, please check if metamask is running correctly and refresh the page"
          );
        });
    }
  }

  getImage(account) {
    this.data = this.sanitizer.bypassSecurityTrustResourceUrl(
      "data:image/svg+xml; utf8," +
      encodeURI(
        new Identicon(Md5.hashStr(account + "Instacart"), {
          size: 32,
          format: "svg",
        }).toString(true)
      )
    );
  }

  navigateTo() {
    window.open("https://metamask.io/");
  }

  connectAccount() {
    this.contract
      .connectAccount()
      .then((value: any) => {
        this.direction = value;
        this.emartService.setDirection(this.direction);
        this.getDetails(this.direction);
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  getDetails(account) {
    this.contract
      .accountInfo(account)
      .then((value: any) => {
        this.balance = value;
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }
}
