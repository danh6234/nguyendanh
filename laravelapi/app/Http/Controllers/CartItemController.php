<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\CartItemModel;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    private $rules=[
        'NameProduct'=>'required|min:5',
        'IdProduct'=>'required',
        'QualityProduct'=>'required',
        'Phone'=>'required',
        'Address'=>'required',
    ];
    private $messages=[
        'NameProduct.required'=>'NameProduct is required.',
        'NameProduct.min'=>'Name NameProduct at least 5 character.',
        'IdProduct.required'=>'IdProduct is required.',
        'QualityProduct.required'=>'QualityProduct is required.',
        'Phone.required'=>'Phone is required.',
        'Address.required'=>'Address is required.',
    ];
    public function index($id=null){
        if($id==null){
            $data= CartItemModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= CartItemModel::find($id);
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
                $data = new CartItemModel;
                $data->NameProduct = $req->input('NameProduct');
                $data->IdProduct = $req->input('IdProduct');
                $data->QualityProduct = $req->input('QualityProduct');
                $data->Status = $req->input('Status');
                $data->IdMember = $req->input('IdMember');
                $data->NameMember = $req->input('NameMember');
                $data->TotalPrice = $req->input('TotalPrice');
                $data->TransPort = $req->input('TransPort');
                $data->PriceSale = $req->input('PriceSale');
                $data->TotalPay = $req->input('TotalPay');
                $data->Phone = $req->input('Phone');
                $data->Address = $req->input('Address');
                $data->Oderdate = $req->input('Oderdate');
                $data->Expecteddate = $req->input('Expecteddate');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }      
    }
   
}
