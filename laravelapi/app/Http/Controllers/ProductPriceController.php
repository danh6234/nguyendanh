<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\ProductPriceModel;
use Illuminate\Http\Request;

class ProductPriceController extends Controller
{
    private $rules=[
        'ProductID'=>'required',
        'PriceSale'=>'required',
        'Price'=>'required',
    ];
    private $messages=[
        'ProductID.required'=>'ProductID is required.',
        'PriceSale.required'=>'PriceSale is required.',
        'Price.required'=>'Price is required.',

    ];
    public function index($id=null){
        if($id==null){
            $data= ProductPriceModel::orderBy('ID','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= ProductPriceModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }
    public function create(Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            try{
                $data = new ProductPriceModel;
                $data->ProductID = $req->input('ProductID');
                $data->Price = $req->input('Price');
                $data->PriceSale = $req->input('PriceSale');
                $data->IsDate = $req->input('IsDate');
                $data->DateIssued = $req->input('DateIssued');
                $data->Status = $req->input('Status');
                $data->save();
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
            $data=ProductPriceModel::find($id);
        if($data){
            try{
                $data->ProductID = $req->input('ProductID');
                $data->Price = $req->input('Price');
                $data->PriceSale = $req->input('PriceSale');
                $data->IsDate = $req->input('IsDate');
                $data->DateIssued = $req->input('DateIssued');
                $data->Status = $req->input('Status');

                $data->save();
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
        $data=ProductPriceModel::find($id);
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
