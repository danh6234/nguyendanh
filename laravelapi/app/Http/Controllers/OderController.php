<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\OderModel;
use Illuminate\Http\Request;

class OderController extends Controller
{
    private $rules=[
        'FullName'=>'required|min:5',
        'Address'=>'required',
        'Tel'=>'required',
        'CreatedDate'=>'required',
        'emp_id'=>'required',
        'member_id'=>'required',
    ];
    private $messages=[
        'FullName.required'=>'FullName is required.',
        'FullName.min'=>'FullName must at least 5 character.',
        'Address.required'=>'Address is required.',
        'Tel.required'=>'Tel is required.',
        'CreatedDate.required'=>'CreatedDate is required.',
        'emp_id.required'=>'emp_id is required.',
        'member_id.required'=>'member_id is required.',
        

    ];
    public function index($id=null){
        if($id==null){
            $data= OderModel::orderBy('ID','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= OderModel::find($id);
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
                $data = new OderModel;
                $data->FullName = $req->input('FullName');
                $data->Address = $req->input('Address');
                $data->Email = $req->input('Email');
                $data->Tel = $req->input('Tel');
                $data->OderID = $req->input('OderID');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->emp_id = $req->input('emp_id');
                $data->member_id = $req->input('member_id');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }
    public function delete($id){
        $data=OderModel::find($id);
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
