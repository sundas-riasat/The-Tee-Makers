import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../user.service';
import { ProductService } from './../../product.service';
import { DesignApiService } from './../design-api.service';
import { TextPopupComponent } from './../text-popup/text-popup.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-do-your-tee',
  templateUrl: './do-your-tee.component.html',
  styleUrls: ['./do-your-tee.component.css']
})
export class DoYourTeeComponent implements OnInit {
  opened = '';
  fontColor = 'black';
  shirtColor = 'white';
  placement = 'center';
  price = 30;
  placements = [
    {
      viewValue: 'Top',
      value: 'TOP'
    },
    {
      viewValue: 'Center',
      value: 'MIDDLE'
    },
    {
      viewValue: 'Bottom',
      value: 'BOTTOM'
    }

  ];
  colors = {
    grey: '#393E46',
    blue: '#00ADB5',
    lavender: '#E6E6FA',
    magenta: '#FF00FF',
    mediumOrchild: '#BA55D3',
    indigo: '#4B0082',
    navy: '#000080',
    deepSkyBlue: '#00BFFF',
    steelBlue: '#4682B4',
    brown: '#A52A2A',
  }
  fontSize = [
    8,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    50,
    52,
    54,
    56,
    58,
    60,
    62,
    64
  ];
  text;
  size = 'medium';
  type = 'TeeShirt';
  file: any;
  fonts = [{
    value: 'Andasia',
    viewValue: 'Andasia'
  },
  {
    value: 'Wabroye',
    viewValue: 'Wabroye'
  },
  {
    value: 'Motengo',
    viewValue: 'Motengo'
  },
  {
    value: 'Vanity',
    viewValue: 'Vanity'
  }];
  font;
  textColor = [
    {
      value: '#000000',
      val: 'black',
      name: 'Black'
    },
    {
      value: '#0000FF',
      val: 'blue',
      name: 'Blue'
    },
    {
      value: '#FFFFFF',
      val: 'white',
      name: 'White'
    },
    {
      value: '#fcca03',
      val: 'yellow',
      name: 'Yellow'
    },
    {
      value: '#FF0000',
      val: 'red',
      name: 'Red'
    },
    {
      value: '#f003fc',
      val: 'cyan',
      name: 'Cyan'
    },
    {
      value: '#317a0f',
      val: 'green',
      name: 'Green'
    }
  ]

  constructor(private http: HttpClient,
    private zone: NgZone,
    public dialog: MatDialog,
    public api: DesignApiService,
    private prodService: ProductService,
    private router: Router,
    private user: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngOnInit() {
    this.api.initialize();
    this.spinner.hide();
  }

  openUp(id) {
    if (this.opened !== id) {
      document.getElementById(id).style.opacity = '1';
      document.getElementById(id).style.display = 'flex';
      if (this.opened) {
        document.getElementById(this.opened).style.opacity = '0';
        document.getElementById(this.opened).style.display = 'none';
      }
      this.opened = id;
    } else {
      document.getElementById(id).style.opacity = '0';
      document.getElementById(id).style.display = 'none';
      this.opened = '';
    }
  }

  color(clr) {
    this.api.color(this.colors[clr.toString()]);
  }

  mask(index) {
    this.api.mask(index);
  }

  setSize(val) {
    this.size = val;
  }

  setType(val) {
    if (val === 'male') {
      this.type = 'TeeShirt'
    }
    else if (val === 'hoodie') {
      this.type = 'Hoodie'
    }
    else if (val === 'polo') {
      this.type = 'Polo';
    }
    else {
      this.type = 'TeeShirt';
    }
    this.api.setType(val);
  }

  setText() {
    this.api.setText(this.text, this.font, 32, this.fontColor, this.placement);
  }

  upload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.api.customUpload(reader.result.toString());
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  saveDesign() {

    if (this.user.getUserId()) {
      let design = {
        size: this.size,
        color: this.shirtColor,
        category: this.type,
        date: new Date().toLocaleString(),
        images: this.api.src,
        price: this.api.getPrice(),
        title: '',
        maker: this.user.getUserId(),
        makerName: this.user.user.displayName,
        desc: ''
      };

      const dialogRef = this.dialog.open(TextPopupComponent, {
        width: '500px',
        data: { price: this.price, title: '', desc: '' }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.spinner.show();
        console.log('The dialog was closed');
        design.title = result.title;
        design.desc = result.desc;
        console.log(design);
        this.prodService.saveDesign(design);
        this.router.navigateByUrl('user/cart').then(x => {
          this.spinner.hide();
        });
      });
    }
    else {
      this.spinner.hide();
      this.toastr.error('You are not logged in. First login then try again.', 'User not authenticated');
    }
  }

  undo() {
    this.api.undo();
  }
}
