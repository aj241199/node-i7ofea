import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  response: any;
  decryprtionForm: FormGroup;
  _sodium = require('libsodium-wrappers');
  secretKey: any;
  resonses: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.decryprtionForm = this.fb.group({
      encryption: [''],
      skey: ['']
    })
  }
  decryptResponse() {
    this.response = this.decryprtionForm.value.encryption;
    this.secretKey = this.decryprtionForm.value.skey;
    let nounce = new Uint8Array(24);
    const decryptMsg = this._sodium.crypto_box_open_easy_afternm(this._sodium.from_hex(this.response), nounce, this._sodium.from_hex(this.secretKey));
    // return this._sodium.to_string(decryptMsg);
    // console.log("resp",this._sodium.to_string(decryptMsg))
    this.resonses = ("Response==>" + (atob(this._sodium.to_string(decryptMsg))));
  }
  payload() {
    this.response = this.decryprtionForm.value.encryption;
    this.secretKey = this.decryprtionForm.value.skey;
    let nounce = new Uint8Array(24);
    const decryptMsg = this._sodium.crypto_box_open_easy_afternm(this._sodium.from_hex(this.response), nounce, this._sodium.from_hex(this.secretKey));
    // return this._sodium.to_string(decryptMsg);
    // console.log("resp",this._sodium.to_string(decryptMsg))
    this.resonses = ("Payload==>" + this._sodium.to_string(decryptMsg));
  }
}
