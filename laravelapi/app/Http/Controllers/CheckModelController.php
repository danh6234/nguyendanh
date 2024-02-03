<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\CheckModel;
use Illuminate\Http\Request;

class CheckModelController extends Controller
{
    private $rules=[
        'FullName'=>'required|min:5',
        'Email'=>'required',
        'Phone'=>'required',
        'Address'=>'required',
    ];
    private $messages=[
        'FullName.required'=>'FullName is required.',
        'FullName.min'=>'FullName must at least 5 character.',
        'Email.required'=>'Email is required.',
        'Phone.required'=>'Phone is required.',
        'Address.required'=>'Address is required.',
    ];
    public function index($id=null){
        if($id==null){
            $data= CheckModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= CheckModel::find($id);
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
                $data = new CheckModel;
                $data->FullName = $req->input('FullName');
                $data->Email = $req->input('Email');
                $data->Phone = $req->input('Phone');
                $data->Address = $req->input('Address');
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
            $data = CheckModel::find($id);
        if($data){
            try{
                $data->FullName = $req->input('FullName');
                $data->Email = $req->input('Email');
                $data->Phone = $req->input('Phone');
                $data->Address = $req->input('Address');
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
        $data = CheckModel::find($id);
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
