<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\SaveInforModel;
use Illuminate\Http\Request;

class SaveInforController extends Controller
{
    private $rules=[
        'Name'=>'required|min:5',
        'Price'=>'required',
        'Quality'=>'required',
    ];
    private $messages=[
        'Name.required'=>'Name is required.',
        'Name.min'=>'Name must at least 5 character.',
        'Price.required'=>'Price is required.',
        'Quality.required'=>'Quality is required.',
    ];
    // lọc dữ liêu
    public function index($idMember = null){
        $query = SaveInforModel::query();
        if ($idMember) {
            $query->where('IDMember', $idMember);
        }
        $data = $query->orderBy('id','asc')->get();
        return BaseResponse::whidthdata($data);
    }

    public function create(Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            try{
                $data = new SaveInforModel;
                $data->IdProduct = $req->input('IdProduct');
                $data->Name = $req->input('Name');
                $data->IDMember = $req->input('IDMember');
                $data->Price = $req->input('Price');
                $data->Quality = $req->input('Quality');
                $data->ImageUrl = $req->input('ImageUrl');
                $data->ProductCode = $req->input('ProductCode');
                $data->PriceSale = $req->input('PriceSale');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }
    public function delete($id){
        $data = SaveInforModel::find($id);
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
    
    //clear
    public function clear($idMember){
        try{
            $data = SaveInforModel::where('IDMember', $idMember)->delete();
            if($data){
                return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }catch(Throwable $e){
            return BaseResponse::error(500,$e->getMessage());
        }
    }
}
