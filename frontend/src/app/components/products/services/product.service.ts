import { Injectable } from '@angular/core';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { RequestModel } from '../../../common/models/request.model';
import { PaginationResultModel } from '../../../common/models/pagination-result.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: GenericHttpService) {}


  //Burada FormData kullanmamızın nedeni bir görsel'i yüklüyor olmamızdan kaynaklanabilir
  // Özellikle dosya yükleme işlemlerinde kullanılıyor, strandart js nesneleri dosya yüklemeyi desteklemez
  // Bu sebeple formdata kullanarak dosyaları sunucuya göndermek gerekir
  

  add(model: FormData, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>('products/add', model, (res) =>
      callBack(res)
    );
  }

  update(model: FormData, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>('products/update', model, (res) =>
      callBack(res)
    );
  }

  getAll(
    model: RequestModel,
    callBack: (res: PaginationResultModel<ProductModel[]>) => void
  ) {
    this._http.post<PaginationResultModel<ProductModel[]>>(
      'products/',
      model,
      (res) => callBack(res)
    );
  }

  removeById(model: any, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>('products/removeById', model, (res) =>
      callBack(res)
    );
  }

  changeActiveStatus(
    model: any,
    callBack: (res: MessageResponseModel) => void
  ) {
    this._http.post<MessageResponseModel>(
      'products/changeActiveStatus',
      model,
      (res) => callBack(res)
    );
  }

  getById(model: any, callBack: (res: ProductModel) => void) {
    this._http.post<ProductModel>('products/getById', model, (res) =>
      callBack(res)
    );
  }

  removeImageByIdAndIndex(model: any, callBack: (res: ProductModel) => void) {
    this._http.post<ProductModel>(
      'product/removeImageByIdAndIndex',
      model,
      (res) => callBack(res)
    );
  }
}
