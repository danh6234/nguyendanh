<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\OderDetailModel;
use Illuminate\Http\Request;

class OderDetailController extends Controller
{
    private $rules=[
        'OderID'=>'required',
        'Quantity'=>'required',
        'Price'=>'required',
    ];
    private $messages=[
        'OderID.required'=>'OderID is required.',
        'Quantity.required'=>'Quantity is required.',
        'Price.required'=>'Price is required.',
    ];

    public function index($id=null){
        if($id==null){
            $data= OderDetailModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= OderDetailModel::find($id);
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
                $data = new OderDetailModel;
                $data->OderID = $req->input('OderID');
                $data->ProductID = $req->input('ProductID');
                $data->Quantity = $req->input('Quantity');
                $data->Price = $req->input('Price');
                $data->TransPort = $req->input('TransPort');
                $data->Sale = $req->input('Sale');
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
            $data=OderDetailModel::find($id);
        if($data){
            try{
                $data->OderID = $req->input('OderID');
                $data->ProductID = $req->input('ProductID');
                $data->Quantity = $req->input('Quantity');
                $data->Price = $req->input('Price');
                $data->Note = $req->input('Note');

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
        $data=OderDetailModel::find($id);
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
