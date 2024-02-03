<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    private $rules=[
        'Name'=>'required|min:5',
        'ProductCode'=>'required',
        'Price'=>'required',
        'ProductCategoryID'=>'required',
    ];
    private $messages=[
        'Name.required'=>'Name is required.',
        'Name.min'=>'Name must at least 5 character.',
        'ProductCode.required'=>'ProductCode is required.',
        'Price.required'=>'Price is required.',
        'ProductCategoryID.required'=>'Price is required.',
    ];
    public function index($id=null){
    if($id==null) {
        $data= ProductModel::orderBy('ID', 'asc')->get();
        $data = $data->map(function ($item) {
            if($item->ImageUrl) {
                $item->ImageUrl = "http://localhost:2000/laravelapi/public/". $item->ImageUrl;
            }
            return $item;
        });
        return BaseResponse::whidthdata($data);
    } else {
        $data= ProductModel::find($id);
        if($data) {
            if($data->ImageUrl) {
                $data->ImageUrl = "http://localhost:2000/laravelapi/public/". $data->ImageUrl;
            }
            return BaseResponse::whidthdata($data);
        } else {
            return BaseResponse::error(404, 'Data not found!');
        }
    }
}
    public function create(Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            try{
                $data = new ProductModel();
                $data->Name = $req->input('Name');
                $data->ProductCode = $req->input('ProductCode');
                $data->Description = $req->input('Description');
                $data->ProductType = $req->input('ProductType');
                $data->Price = $req->input('Price');
                $data->PriceSale = $req->input('PriceSale');
                $data->Color = $req->input('Color');
                $data->Manufacture = $req->input('Manufacture');
                $data->Madeln = $req->input('Madeln');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->Status = $req->input('Status');
                $data->ProductCategoryID = $req->input('ProductCategoryID');
                $data->save();

                if ($req->hasFile('image')) {
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $data->ID . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/product'), $imageName);
                    // update DB
                    $data->ImageUrl = $imageName;
                    $data->save();
                }
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
    }
    public function update($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            $data=ProductModel::find($id);
        if($data){
            try{
                $data->Name = $req->input('Name');
                $data->ProductCode = $req->input('ProductCode');
                $data->Description = $req->input('Description');
                $data->ProductType = $req->input('ProductType');
                $data->Price = $req->input('Price');
                $data->PriceSale = $req->input('PriceSale');
                $data->Color = $req->input('Color');
                $data->Manufacture = $req->input('Manufacture');
                $data->Madeln = $req->input('Madeln');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->Status = $req->input('Status');
                $data->ProductCategoryID = $req->input('ProductCategoryID');
                $data->save();
                
                if ($req->hasFile('image')) {
                    // check old image
                    if (!empty($data->ImageUrl)) {
                        if (File::exists(public_path('data/product/').$data->ImageUrl))
                            File::delete(public_path('data/product/').$data->ImageUrl);
                    }
                    
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $data->ID . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/product'), $imageName);
                    // update DB
                    $data->ImageUrl = $imageName;
                    $data->save();
                }
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
        }
    }
    public function delete($id){
        $data=ProductModel::find($id);
        if($data){
            try{
                $data->delete();                
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
       
    }
}
