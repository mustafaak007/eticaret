import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../../categories/models/category.model';
import { CategoryService } from '../../../categories/services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
})
export class ProductUpdateComponent {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  productId: string = '';
  product: ProductModel = new ProductModel();

  // RESİM YA DA DOSYA ALINACAKSA MUTLAKA FORMDATA KULLANILMALI

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _product: ProductService,
    private _router: Router,
    private _actived: ActivatedRoute
  ) {
    this._actived.params.subscribe((res) => {
      this.productId = res['value'];
      this.getById();
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  getById() {
    let model = { _id: this.productId };
    this._product.getById(model, (res) => {
      this.product = res;
    });
  }

  getCategories() {
    this._category.getAll((res) => (this.categories = res));
  }

  getImages(event: any) {
    // array.from metodu dizi-benzeri veya gezinilebilir bir nesneden yeni bir dizi örneği oluşturur

    for (let i = 0; i < event.target.files.length; i++) {
      let elName = event.target.files[i].name;
      let indExt: number = elName.lastIndexOf('.') + 1;
      let ext: string = elName.slice(indExt).toLowerCase();
      if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
        const file: File[] = Array.from(event.target.files);
        this.images.push(...file);
        for (let i = 0; i < event.target.files.length; i++) {
          const element = event.target.files[i];
          // reader kullanmamızın nedeni görsellerin ön izlemesini yapabilmeyi sağlamak
          const reader = new FileReader();
          reader.readAsDataURL(element);

          reader.onload = () => {
            const imageUrl = reader.result as string;
            this.addImage(imageUrl, file);
            this.getById();
          };
        }
      } else {
        this._toastr.error(
          `Sadece jpeg, jpg ve png türleri kabul ediliyor. ${elName}`
        );
        event.target.value = null;
      }
    }
  }
  addImage(imageUrl: string, file: any) {
    this.imageUrls.push({
      imageUrl: imageUrl,
      name: file.name,
      size: file.size,
    });
  }

  update(form: NgForm) {
    let catForm = form.value['categoriesSelect'];
    if (catForm[0].isActive == undefined) {
      this._toastr.error('Kategori seçimi yapmadınız!');
      return;
    } else {
      console.log(form.value['categoriesSelect']);
      if (form.valid) {
        let product = form.value;
        let categories: any[] = product['categoriesSelect'];
        let price = product['price'];
        price = price.toString().replace(',', '.');

        let formData = new FormData();
        formData.append('_id', this.product._id);
        formData.append('name', this.product.name);
        formData.append('price', price);
        formData.append('stock', product['stock']);

        for (const option of this.categories) {
          let isActive: boolean = false;
          this._category.changeActiveStatus(option._id, isActive, (res) => {});
        }

        for (const category of categories) {
          formData.append('categories', category._id);
          let isActive: boolean = true;
          this._category.changeActiveStatus(
            category._id,
            isActive,
            (res) => {}
          );
        }
        if (this.images != undefined) {
          for (const image of this.images) {
            formData.append('images', image, image.name);
          }
        }

        this._product.update(formData, (res) => {
          this._toastr.info(res.message);
          this._router.navigateByUrl('/products');
        });
      }
    }
  }

  deleteImage(_id: string, index: number) {
    let model = {
      _id: _id,
      index: index,
    };
    this._product.removeImageByIdAndIndex(model, (res) => {
      this._toastr.warning(res.message);
      this.getById();
    });
  }

  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex((p) => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
}
