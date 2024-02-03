<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\CodeforAllModel;
use Illuminate\Http\Request;

class CodeforAllController extends Controller
{
    private $rules=[
        'Code'=>'required|min:5',
        'PriceSale'=>'required',
    ];
    private $messages=[
        'Code.required'=>'Code is required.',
        'Code.min'=>'Code must at least 5 character.',
        'PriceSale.required'=>'PriceSale is required.',
    ];

    public function index($id=null){
        if($id==null){
            $data= CodeforAllModel::orderBy('IdCode','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= CodeforAllModel::find($id);
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
                $data = new CodeforAllModel;
                $data->Code = $req->input('Code');
                $data->PriceSale = $req->input('PriceSale');
                $data->IdCode = $req->input('IdCode');
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
            $data = CodeforAllModel::find($id);
        if($data){
            try{
                $data->Code = $req->input('Code');
                $data->PriceSale = $req->input('PriceSale');
                $data->IdCode = $req->input('IdCode');
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
        $data = CodeforAllModel::find($id);
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
