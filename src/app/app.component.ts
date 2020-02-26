import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      address: new FormGroup({
        country: new FormControl("ru"),
        city: new FormControl("", Validators.required)
      }),
      skills: new FormArray([])
    });
  }

  submit() {
    console.log("Form submitted", this.form);
  }

  setCapital() {
    const cityMap = {
      ru: "Москва",
      ua: "Киев",
      by: "Минск"
    };

    const city = cityMap[this.form.get("address").get("country").value];

    this.form.patchValue({ address: { city } });
  }

  addSkill() {
    const control = new FormControl("", Validators.required);
    (this.form.get("skills") as FormArray).push(control);
  }
}
