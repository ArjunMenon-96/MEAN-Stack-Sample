import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { TasteService } from '../../taste.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private tasteService: TasteService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      food: ['', Validators.required],
      type: '',
      rating: '',
      review:'',
     
    });
  }

  addemp(food,type,rating,review) {
    this.tasteService.addemp(food,type,rating,review).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
