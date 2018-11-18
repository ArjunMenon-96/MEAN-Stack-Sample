import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { TasteService } from '../../taste.service';
import { taste } from '../../taste.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  taste: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private tasteService: TasteService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      food: ['', Validators.required],
      type: '',
      rating: '',
      review:''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.tasteService.getempById(this.id).subscribe(res => {
        this.taste = res;
        this.updateForm.get('food').setValue(this.taste.food);
        this.updateForm.get('type').setValue(this.taste.type);
        this.updateForm.get('rating').setValue(this.taste.rating);
        this.updateForm.get('review').setValue(this.taste.review);
     });
    });
  }

  updateemp(food,type,rating,review) {
    this.tasteService.updateemp(this.id, food,type,rating,review).subscribe(() => {
      this.snackBar.open('Taste updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
